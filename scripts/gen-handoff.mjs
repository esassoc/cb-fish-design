#!/usr/bin/env node
// Generate a handoff bundle for every prototype route, driven by the registry.
//
// One source of truth: src/data/prototypes.ts lists each prototype's slug + route.
// For each route with a spec (src/data/handoff/<slug>.mjs) we run a CURATED capture
// — authored sections and design guidance — producing the smart
// manifest the runtime inspector reads. Routes without a spec fall back to the
// hub's whole-page capture (the @esa/handoff CLI).
//
//   npm run handoff:all
//
// Capture runs against `preview` (production output) per the handoff README.
import { readFileSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import { captureCurated } from './lib/capture-curated.mjs';

const PORT = Number(process.env.HANDOFF_PORT ?? 4321);
const BASE = '/cb-fish-design/'; // production base — must match astro.config.mjs
const ORIGIN = `http://localhost:${PORT}`;
const root = (p) => fileURLToPath(new URL('../' + p, import.meta.url));

// Reuse the hub's token-tier machinery (deep path import bypasses the exports map).
const HUB_SRC = new URL('../node_modules/@esa/handoff/src/', import.meta.url);
const { buildTierIndex, classifyTokens } = await import(new URL('tokens.mjs', HUB_SRC).href);
const tierIndex = await buildTierIndex(root('node_modules/@esa/tokens'));

// --- routes from the registry (parse, not import — keeps this dep-free) -------
const registry = readFileSync(root('src/data/prototypes.ts'), 'utf8');
const slugs = [...registry.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const routes = [...registry.matchAll(/route:\s*'([^']+)'/g)].map((m) => m[1]);
const targets = slugs.map((slug, i) => ({ slug, route: routes[i] }));
if (!targets.length) {
  console.error('handoff:all — no prototypes found in src/data/prototypes.ts');
  process.exit(1);
}

const run = (cmd, args, extraEnv = {}) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', env: { ...process.env, ...extraEnv } });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} → exit ${r.status}`);
};
async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(200);
  }
  throw new Error(`preview never became ready at ${url}`);
}
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Pull the design guidance keys off a spec section into a compact object.
function guideOf(spec) {
  const g = {};
  for (const k of ['intent', 'decisions', 'gotchas', 'acceptance']) if (spec[k]) g[k] = spec[k];
  return Object.keys(g).length ? g : undefined;
}


// A self-contained, fetchable spec for "Copy for Claude".
function specMarkdown(s) {
  const lines = [`# ${s.label}`, ''];
  if (s.guide?.intent) lines.push(s.guide.intent, '');
  const bullets = (title, arr) => {
    if (!arr?.length) return;
    lines.push(`## ${title}`, ...arr.map((x) => `- ${x}`), '');
  };
  bullets('Key decisions', s.guide?.decisions);
  bullets('Gotchas', s.guide?.gotchas);
  bullets('Done when', s.guide?.acceptance);
  lines.push('## Markup', '```html', s.html, '```', '');
  if (s.css) lines.push('## Styles', '```css', s.css, '```', '');
  if (s.tokens?.length)
    lines.push('## Tokens', ...s.tokens.map((t) => `- \`${t.name}\`: ${t.value} _(${t.tier})_`), '');
  return lines.join('\n');
}

function writeCuratedBundle(slug, url, theme, sections) {
  const outDir = root(`public/handoff/${slug}`);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(`${outDir}/claude`, { recursive: true });
  const manifestSections = sections.map((s) => {
    const fileSlug = slugify(s.label);
    writeFileSync(`${outDir}/claude/${fileSlug}.md`, specMarkdown(s));
    return {
      label: s.label,
      tag: s.tag,
      selector: s.selector,
      apply: s.apply,
      html: s.html,
      css: s.css,
      guide: s.guide,
      tokens: s.tokens,
      claudePath: `claude/${fileSlug}.md`,
      repoPath: `public/handoff/${slug}/claude/${fileSlug}.md`,
    };
  });
  const manifest = { name: slug, url, theme, generatedFrom: 'spec', sections: manifestSections };
  writeFileSync(`${outDir}/manifest.json`, JSON.stringify(manifest, null, 2));
  console.log(`  wrote ${manifestSections.length} curated section(s) → public/handoff/${slug}/`);
}

// ------------------------------------------------------------------------------
console.log(`handoff:all — ${targets.length} route(s): ${targets.map((t) => t.slug).join(', ')}`);
run('npx', ['astro', 'build'], { NODE_ENV: 'production' });

const preview = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: 'ignore',
});

try {
  await waitForServer(`${ORIGIN}${BASE}`);
  for (const { slug, route } of targets) {
    const url = `${ORIGIN}${BASE}${route.replace(/^\/+|\/+$/g, '')}/`;
    const specPath = root(`src/data/handoff/${slug}.mjs`);

    if (existsSync(specPath)) {
      console.log(`\nhandoff:all — capturing ${slug} (curated)  →  ${url}`);
      const spec = (await import(specPath)).default;
      const { theme, sections } = await captureCurated(url, spec.sections, tierIndex, classifyTokens);
      // Merge authored guidance onto each captured section by label.
      const byLabel = new Map(spec.sections.map((s) => [s.label, s]));
      for (const s of sections) {
        const spc = byLabel.get(s.label) || {};
        s.selector = spc.selector; // so the inspector can highlight the live region
        s.apply = spc.apply; // recipe the inspector replays to drive the live app
        s.guide = guideOf(spc);
      }
      writeCuratedBundle(slug, url, theme, sections);
    } else {
      console.log(`\nhandoff:all — capturing ${slug} (whole-page fallback)  →  ${url}`);
      run('node', ['node_modules/@esa/handoff/bin/handoff.mjs', url, '--name', slug, '--out', 'public/handoff']);
    }
  }
} finally {
  preview.kill();
}

console.log('\nhandoff:all — done. Bundles in public/handoff/. Run `npm run deploy` to publish.');
