#!/usr/bin/env node
// Generate a handoff bundle for every prototype route, driven by the registry.
//
// One source of truth: src/data/prototypes.ts lists each prototype's slug + route.
// This script builds the site, serves dist with the production base, then runs the
// @esa/handoff capture against each route — writing public/handoff/<slug>/ (the
// per-route manifest the runtime inspector resolves from location.pathname).
//
//   npm run handoff:all      # regenerate all bundles
//
// Capture runs against `preview` (production output), per the handoff README — the
// dev server injects chrome and unminified CSS that would pollute the bundle.
import { readFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4321;
const BASE = '/cb-fish-design/'; // production base — must match astro.config.mjs
const ORIGIN = `http://localhost:${PORT}`;

// --- routes from the registry (parse, not import — keeps this a dep-free .mjs) ---
const registry = readFileSync(new URL('../src/data/prototypes.ts', import.meta.url), 'utf8');
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

console.log(`handoff:all — ${targets.length} route(s): ${targets.map((t) => t.slug).join(', ')}`);

// Build, then serve the built output with the production base (NODE_ENV=production
// so astro.config resolves base to /cb-fish-design/, matching the deployed paths).
run('npx', ['astro', 'build'], { NODE_ENV: 'production' });

const preview = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: 'ignore',
});

try {
  await waitForServer(`${ORIGIN}${BASE}`);
  for (const { slug, route } of targets) {
    const url = `${ORIGIN}${BASE}${route.replace(/^\/+|\/+$/g, '')}/`;
    console.log(`\nhandoff:all — capturing ${slug}  →  ${url}`);
    run('node', [
      'node_modules/@esa/handoff/bin/handoff.mjs',
      url,
      '--name',
      slug,
      '--out',
      'public/handoff',
    ]);
  }
} finally {
  preview.kill();
}

console.log('\nhandoff:all — done. Bundles in public/handoff/. Run `npm run deploy` to publish.');
