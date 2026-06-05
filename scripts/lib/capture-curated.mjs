// Curated, selector-driven capture — the "smart" half of the handoff pipeline.
//
// The hub's capture.mjs derives sections from document.body.children (top-level
// DOM, in DOM order, guessed labels). That can't reach Sidebar/Results inside
// <main>, can't separate them, and includes a useless full page. This captures a
// SPEC's declared selectors instead — any depth, authored labels — while reusing
// the hub's proven techniques (Chrome rule-usage coverage for used CSS, de-scope,
// per-element token resolution, CSS-partition-by-class) so output matches the hub.
//
// The two hub helpers we need are trivial and stable, so they're inlined rather
// than deep-imported past the package's exports map. Token tier classification is
// non-trivial (reads the tokens package), so that's imported from the hub.
import { createRequire } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { realpathSync } from 'node:fs';

// playwright + prettier are @esa/handoff's deps — they live in the hub's module
// tree (ecology/node_modules), not the spoke's. Anchor resolution at the hub's
// REAL path (following the file:-dep symlink) so the lookup walks up into it.
const hubPkg = realpathSync(fileURLToPath(new URL('../../node_modules/@esa/handoff/package.json', import.meta.url)));
const hubRequire = createRequire(hubPkg);
const pw = await import(pathToFileURL(hubRequire.resolve('playwright')).href);
const chromium = pw.chromium ?? pw.default?.chromium; // playwright is CJS → .default
const prettierMod = await import(pathToFileURL(hubRequire.resolve('prettier')).href);
const format = prettierMod.format ?? prettierMod.default?.format;

// --- inlined from @esa/handoff/src (descope.mjs, capture.mjs) -----------------
const descopeCss = (css) =>
  css
    .replace(/:where\(\[data-astro-cid-[\w-]+\]\)/g, '')
    .replace(/\[data-astro-cid-[\w-]+\]/g, '');

function splitRules(css) {
  const rules = [];
  const re = /([^{}]+)\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const selector = m[1].trim();
    if (selector.startsWith('@')) continue;
    rules.push({ selector, body: m[2].trim(), text: m[0].trim() });
  }
  return rules;
}

const isTokenDefSelector = (selector) =>
  selector.split(',').every((p) => /^\s*(:root|\[data-theme[^\]]*\]|html)\s*$/.test(p));

const fmt = async (src, parser) => {
  try {
    return (await format(src, { parser, printWidth: 90 })).trim();
  } catch {
    return src; // never let a formatting hiccup drop the capture
  }
};

// Reconstruct the used CSS rules from a coverage pass: de-scoped, de-duped, with
// token-definition (:root) blocks dropped so tree-shaking isn't defeated.
async function usedRules(client, ruleUsage) {
  const sheetText = new Map();
  for (const r of ruleUsage) {
    if (!r.used || sheetText.has(r.styleSheetId)) continue;
    sheetText.set(
      r.styleSheetId,
      (await client.send('CSS.getStyleSheetText', { styleSheetId: r.styleSheetId })).text
    );
  }
  const seen = new Set();
  const rules = [];
  for (const r of ruleUsage) {
    if (!r.used) continue;
    const key = `${r.styleSheetId}:${r.startOffset}:${r.endOffset}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const raw = descopeCss(sheetText.get(r.styleSheetId).slice(r.startOffset, r.endOffset));
    for (const rule of splitRules(raw)) if (!isTokenDefSelector(rule.selector)) rules.push(rule);
  }
  return rules;
}

// Replay a state recipe via Playwright. The SAME op shapes run client-side in the
// inspector (runApplyDom), so a state is authored once and drives both.
async function runApply(page, ops) {
  for (const op of ops || []) {
    if (op.click) await page.click(op.click);
    else if (op.fill) await page.fill(op.fill[0], op.fill[1]);
    else if (op.clear) await page.fill(op.clear, '');
    else if (op.clickText)
      await page.locator(op.clickText[0]).getByRole('button', { name: op.clickText[1] }).first().click();
    else if (op.key) await page.keyboard.press(op.key);
    await page.waitForTimeout(80);
  }
}

// Read one selector's clean outerHTML + every custom property resolving on it.
// (Strips Astro scoping first; client-rendered state has no scoping to strip.)
const READ_SECTION = ({ sel }) => {
  for (const el of document.querySelectorAll('*'))
    for (const a of [...el.attributes])
      if (a.name.startsWith('data-astro-cid')) el.removeAttribute(a.name);
  const node = document.querySelector(sel);
  if (!node) return null;
  const root = getComputedStyle(document.documentElement);
  const cs = getComputedStyle(node);
  const values = {};
  for (const prop of root) if (prop.startsWith('--')) values[prop] = root.getPropertyValue(prop).trim();
  for (const prop of cs) if (prop.startsWith('--')) values[prop] = cs.getPropertyValue(prop).trim();
  return { html: node.outerHTML, tag: node.tagName.toLowerCase(), values };
};

/**
 * Capture each spec section in its OWN page state — so variations (palette open,
 * empty / people / projects results) are real, distinct captures, not one snapshot.
 *
 * A section reaches its state via `apply` — a serializable op recipe (click / fill
 * / clear / clickText / key) replayed after a fresh load. Each state gets its own
 * CSS-coverage pass, so the captured styles match that state exactly. The same
 * recipe ships in the manifest and drives the live app from the inspector.
 *
 * @param {string} baseUrl
 * @param {{label:string, selector:string, apply?:object[]}[]} specSections
 * @param {{semantic:Set,primitive:Set,component:Set}} tierIndex
 * @param {(names:string[],values:object,index:object)=>{contract:any[]}} classifyTokens
 * @returns {Promise<{theme:string|null, sections:any[]}>}
 */
export async function captureCurated(baseUrl, specSections, tierIndex, classifyTokens) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const client = await page.context().newCDPSession(page);
  await client.send('DOM.enable');
  await client.send('CSS.enable');

  const sections = [];
  for (const spec of specSections) {
    // Fresh load per section, then replay its recipe — each state is independent,
    // with its own coverage pass so the captured CSS matches that exact state.
    await client.send('CSS.startRuleUsageTracking');
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await runApply(page, spec.apply);
    await page.waitForTimeout(200); // let the post-recipe render settle
    const { ruleUsage } = await client.send('CSS.stopRuleUsageTracking');
    const rules = await usedRules(client, ruleUsage);

    const cap = await page.evaluate(READ_SECTION, { sel: spec.selector });
    if (!cap) {
      console.warn(`  ! selector not found, skipping "${spec.label}" (${spec.selector})`);
      continue;
    }

    // Partition CSS + tokens to this section by class membership (the hub's rule).
    const classes = new Set([...cap.html.matchAll(/class="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/)));
    const css = rules
      .filter((r) => [...classes].some((c) => c && r.selector.includes('.' + c)))
      .map((r) => r.text)
      .join('\n');
    const tokenNames = [...new Set([...css.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]))].sort();
    const tokens = classifyTokens(tokenNames, cap.values, tierIndex).contract;

    console.log(`  · ${spec.label}: ${cap.html.length}b html, ${tokens.length} tokens`);
    sections.push({
      label: spec.label,
      tag: cap.tag,
      html: await fmt(cap.html, 'html'),
      css: css ? await fmt(css, 'css') : '',
      tokens,
    });
  }

  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  await browser.close();
  return { theme, sections };
}
