// Runtime Handoff inspector — a deployable port of @esa/handoff's dev-toolbar app.
// The dev tool is bound to Astro's dev-only toolbar (defineToolbarApp/canvas) and
// is stripped from production builds; this version brings its own shadow host and
// its own toggle, so it works on the deployed site AND in `astro dev`.
//
// It is route-aware: the manifest is resolved from location.pathname
// (/handoff/<slug>/manifest.json, slug derived exactly like the handoff CLI's
// --name), so each prototype shows ITS sections, not the homepage's. If no bundle
// exists for the current route, the inspector stays dormant — no launcher, no UI.
//
// The rendering logic (tree, HTML/CSS/token tabs, page-pick highlight, copy +
// copy-for-Claude) is a faithful port of toolbar-app.js; the export engine remains
// the source of truth and this only reads the manifest it produced.

interface Token { name: string; value: string; tier: string }
interface Section {
  index?: number; label: string; tag?: string; html: string; css: string;
  tokens: Token[]; claudePath?: string; repoPath?: string;
}
interface Manifest {
  name: string; sections: Section[];
  full?: { label: string; html: string; css: string; tokens: Token[]; claudePath?: string; repoPath?: string };
}

const esc = (s: unknown) =>
  String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));
const isColor = (v: unknown) =>
  /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s%/]+\)|hsla?\([\d.,\s%/]+\))$/i.test(String(v).trim());

// --- syntax highlighters (operate on prettier-formatted, then-escaped code) ---
function hlVal(v: string) {
  return v
    .replace(/("[^"]*"|'[^']*')/g, '<span class="s">$1</span>')
    .replace(/(var\()(--[\w-]+)/g, '$1<span class="t">$2</span>')
    .replace(/(#[0-9a-fA-F]{3,8})\b/g, '<span class="n">$1</span>');
}
function hlCss(src: string) {
  return esc(src)
    .split('\n')
    .map((line) => {
      if (/\{\s*$/.test(line))
        return line.replace(/^(\s*)(.+?)(\s*\{)\s*$/, '$1<span class="sel">$2</span>$3');
      const m = line.match(/^(\s*)([\w-]+)(\s*:\s*)(.+?)(;?)\s*$/);
      if (m) return `${m[1]}<span class="p">${m[2]}</span>${m[3]}${hlVal(m[4])}${m[5]}`;
      return line;
    })
    .join('\n');
}
function hlHtml(src: string) {
  return esc(src)
    .replace(/("[^"]*")/g, '<span class="s">$1</span>')
    .replace(/(&lt;\/?)([a-zA-Z][\w-]*)/g, '$1<span class="tag">$2</span>');
}

function renderTokens(tokens: Token[]) {
  if (!tokens || !tokens.length) return '<p class="hint">No design tokens in this section.</p>';
  const groups: Record<string, Token[]> = {};
  for (const t of tokens) (groups[t.tier] = groups[t.tier] || []).push(t);
  const order = ['brand', 'semantic', 'component', 'primitive'];
  return order
    .filter((k) => groups[k])
    .map(
      (tier) => `
      <div class="tgroup">
        <div class="tgroup__h">${tier} <span>${groups[tier].length}</span></div>
        ${groups[tier]
          .map(
            (t) => `<div class="tok">
              <span class="tok__name">${isColor(t.value) ? `<i style="background:${esc(t.value)}"></i>` : ''}<code>${esc(t.name)}</code></span>
              <span class="tok__val">${esc(t.value)}</span>
            </div>`
          )
          .join('')}
      </div>`
    )
    .join('');
}

const STYLE = `
  :host { all: initial; }
  /* The hidden attribute must win over the explicit display on .launch/.panel,
     otherwise the toggle is defeated by specificity. */
  [hidden] { display: none !important; }
  .host-root { position: fixed; inset: 0; pointer-events: none; z-index: 2147483000;
    font-family: system-ui, sans-serif; }
  .host-root > * { pointer-events: auto; }
  .launch { position: fixed; bottom: 16px; right: 16px; display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 13px; border-radius: 999px; background: #0d1117; color: #e6edf3; border: 1px solid #30363d;
    box-shadow: 0 8px 24px -8px rgba(0,0,0,.5); font-size: 13px; cursor: pointer; }
  .launch:hover { border-color: #4493f8; }
  .launch svg { color: #4493f8; flex: none; }
  .panel { position: fixed; top: 12px; right: 12px; width: min(460px, 94vw);
    max-height: calc(100vh - 24px); display: flex; flex-direction: column;
    background: #0d1117; color: #e6edf3; border: 1px solid #30363d; border-radius: 12px;
    box-shadow: 0 16px 50px -12px rgba(0,0,0,.6); font-size: 12.5px; overflow: hidden; }
  .head { display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-bottom: 1px solid #21262d; }
  .head strong { font-size: 14px; }
  .head .sub { flex: 1; color: #7d8590; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .picker { padding: 10px 14px; border-bottom: 1px solid #21262d; }
  .picker__label { color: #7d8590; font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase;
    margin-bottom: 6px; }
  .tree { position: relative; }
  .node { position: relative; display: block; width: 100%; text-align: left; padding: 4px 0 4px 26px;
    border: 0; background: none; color: #adbac7; font: inherit; font-size: 12.5px; cursor: pointer;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tree .node::before { content: ''; position: absolute; left: 8px; top: 0; height: 100%; border-left: 1px solid #30363d; }
  .tree .node:last-child::before { height: 50%; }
  .tree .node::after { content: ''; position: absolute; left: 8px; top: 50%; width: 12px; border-top: 1px solid #30363d; }
  .node:hover { color: #fff; }
  .node.on { color: #fff; font-weight: 600; }
  .tree .node.on::after { border-color: #4493f8; }
  .node--full { margin-top: 8px; padding-top: 9px; border-top: 1px solid #21262d; }
  .node--full::before { content: '⤓'; position: absolute; left: 7px; top: 9px; color: #7d8590; }
  .node--full.on::before { color: #4493f8; }
  .tabs { display: flex; gap: 4px; padding: 8px 12px; border-bottom: 1px solid #21262d; }
  .tabs button { padding: 5px 12px; border: 0; border-radius: 6px; background: none; color: #7d8590;
    font: inherit; font-size: 12.5px; cursor: pointer; }
  .tabs button.on { background: #21262d; color: #fff; }
  .tabs .actions { margin-left: auto; display: flex; align-items: center; gap: 6px; }
  .tabs .copy { color: #adbac7; border: 1px solid #30363d; }
  .tabs .copy:hover { border-color: #4493f8; color: #fff; }
  .tabs .copy.done { color: #7ee787; border-color: #238636; }
  .claude { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px;
    border: 1px solid #d97757; border-radius: 6px; background: #d977571a; color: #e9a589;
    font-size: 12.5px; cursor: pointer; white-space: nowrap; }
  .claude svg { color: #d97757; flex: none; }
  .claude:hover { background: #d9775733; color: #f0b89e; }
  .claude.done { border-color: #238636; color: #7ee787; }
  .claude.done svg { color: #7ee787; }
  .body { overflow: auto; padding: 12px 14px; }
  .hint { margin: 0; color: #7d8590; line-height: 1.6; }
  pre.code { margin: 0; white-space: pre-wrap; word-break: break-word; line-height: 1.55; tab-size: 2; color: #adbac7;
    font-family: ui-monospace, "SF Mono", Menlo, monospace; }
  pre.code .tag { color: #7ee787; }
  pre.code .s   { color: #a5d6ff; }
  pre.code .sel { color: #d2a8ff; }
  pre.code .p   { color: #79c0ff; }
  pre.code .t   { color: #ffa657; }
  pre.code .n   { color: #f0883e; }
  .tgroup { margin-bottom: 14px; }
  .tgroup__h { text-transform: capitalize; color: #7d8590; font-size: 11px; letter-spacing: .04em; margin-bottom: 6px; }
  .tgroup__h span { color: #4d5560; }
  .tok { display: flex; flex-direction: column; gap: 2px; padding: 6px 0; border-bottom: 1px solid #161b22; }
  .tok__name { display: flex; align-items: center; gap: 8px; }
  .tok__name i { width: 14px; height: 14px; border-radius: 3px; border: 1px solid #ffffff22; flex: none; }
  .tok__name code { color: #e6edf3; font-family: ui-monospace, monospace; }
  .tok__val { color: #7d8590; padding-left: 22px; word-break: break-all; font-family: ui-monospace, monospace; }
  .x { border: 0; background: none; color: #7d8590; font-size: 20px; line-height: 1; cursor: pointer; }
  .x:hover { color: #fff; }
`;

const HOST_ID = 'handoff-inspector';
const IGNORE = /^(SCRIPT|STYLE|LINK|ASTRO-DEV-TOOLBAR|ASTRO-ISLAND)$/;

/** Derive the bundle slug from the path, exactly like the handoff CLI's --name. */
function routeSlug(): string {
  const base = import.meta.env.BASE_URL;
  let p = location.pathname;
  if (p.startsWith(base)) p = p.slice(base.length);
  p = p.replace(/^\/|\/$/g, '');
  return p.replace(/\//g, '-') || 'index';
}
const manifestUrl = (slug: string) => `${import.meta.env.BASE_URL}handoff/${slug}/manifest.json`;

export function initInspector(): void {
  if (document.getElementById(HOST_ID)) return; // idempotent
  const url = manifestUrl(routeSlug());
  fetch(url)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((manifest: Manifest) => mount(manifest, url))
    .catch(() => {
      /* No bundle for this route — stay dormant. */
    });
}

function mount(manifest: Manifest, manifestUrl: string): void {
  const host = document.createElement('div');
  host.id = HOST_ID;
  const root = host.attachShadow({ mode: 'open' });
  // Mount on <html>, not <body>: the handoff capture engine treats body children
  // as page sections, so keeping our host out of <body> means re-capturing a route
  // never picks up the inspector itself as a junk section. Fixed positioning inside
  // the shadow root anchors to the viewport regardless.
  document.documentElement.appendChild(host);

  // Page-level outline for the on-hover / selected section (the page is outside
  // this app's shadow root, so these rules must live in document.head).
  const pageStyle = document.createElement('style');
  pageStyle.textContent = `
    [data-handoff-pick]:hover { outline: 2px dashed #1f6feb; outline-offset: -2px; cursor: pointer; }
    [data-handoff-on] { outline: 2px solid #4493f8 !important; outline-offset: -2px; }`;

  const base = manifestUrl.replace(/manifest\.json.*$/, '');

  const style = document.createElement('style');
  style.textContent = STYLE;
  const wrap = document.createElement('div');
  wrap.className = 'host-root';
  wrap.innerHTML = `
    <button class="launch" title="Inspect this prototype (⌥⇧I)">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 9 3 3-3 3"/><path d="M14 15h3"/><rect width="18" height="16" x="3" y="4" rx="2"/></svg>
      Inspect
    </button>
    <div class="panel" hidden>
      <div class="head"><strong>Dev Handoff</strong><span class="sub"></span><button class="x" title="Close">×</button></div>
      <div class="picker"></div>
      <div class="tabs">
        <button data-tab="html" class="on">HTML</button>
        <button data-tab="css">CSS</button>
        <button data-tab="tokens">Tokens</button>
        <span class="actions">
          <button class="copy" title="Copy this tab's raw content">Copy</button>
          <button class="claude" title="Copy a fetchable spec link for Claude">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg>
            for Claude
          </button>
        </span>
      </div>
      <div class="body"></div>
    </div>`;
  root.append(style, wrap);

  const launch = wrap.querySelector<HTMLButtonElement>('.launch')!;
  const panel = wrap.querySelector<HTMLElement>('.panel')!;
  const sub = wrap.querySelector<HTMLElement>('.sub')!;
  const picker = wrap.querySelector<HTMLElement>('.picker')!;
  const body = wrap.querySelector<HTMLElement>('.body')!;
  const tabBtns = [...wrap.querySelectorAll<HTMLButtonElement>('.tabs button[data-tab]')];
  const copyBtn = wrap.querySelector<HTMLButtonElement>('.copy')!;
  const claudeBtn = wrap.querySelector<HTMLButtonElement>('.claude')!;

  // Real page sections, in capture order — excluding our own host + dev chrome.
  const liveSections = () =>
    [...document.body.children].filter(
      (el) => el.id !== HOST_ID && !IGNORE.test(el.tagName)
    ) as HTMLElement[];

  let current: (Section & { tag?: string }) | null = null;
  let tab: 'html' | 'css' | 'tokens' = 'html';
  let open = false;

  function render() {
    if (!current) {
      sub.textContent = `${manifest.name} · ${manifest.sections.length} sections`;
      body.innerHTML = `<p class="hint">Pick a section above, or click any region of the page.</p>`;
      return;
    }
    sub.textContent =
      current.tag && current.tag !== 'page' ? `${current.label} · <${current.tag}>` : current.label;
    if (tab === 'html') body.innerHTML = `<pre class="code">${hlHtml(current.html)}</pre>`;
    else if (tab === 'css')
      body.innerHTML = current.css
        ? `<pre class="code">${hlCss(current.css)}</pre>`
        : `<p class="hint">No section-local CSS (inherited utilities only).</p>`;
    else body.innerHTML = renderTokens(current.tokens);
  }

  const treeNodes = () => [...picker.querySelectorAll<HTMLElement>('.tree .node')];

  function select(i: number) {
    current = manifest.sections[i] || null;
    treeNodes().forEach((c, j) => c.classList.toggle('on', j === i));
    picker.querySelector('.node--full')?.classList.remove('on');
    liveSections().forEach((el, j) => el.toggleAttribute('data-handoff-on', j === i));
    render();
  }

  function selectFull() {
    if (!manifest.full) return;
    current = { tag: 'page', ...manifest.full };
    treeNodes().forEach((c) => c.classList.remove('on'));
    picker.querySelector('.node--full')?.classList.add('on');
    liveSections().forEach((el) => el.removeAttribute('data-handoff-on'));
    render();
  }

  function buildTree() {
    picker.innerHTML = '<div class="picker__label">Sections</div><div class="tree"></div>';
    const tree = picker.querySelector('.tree')!;
    manifest.sections.forEach((s, i) => {
      const b = document.createElement('button');
      b.className = 'node';
      b.title = s.label;
      b.textContent = s.label;
      b.onclick = () => select(i);
      tree.appendChild(b);
    });
    if (manifest.full) {
      const f = document.createElement('button');
      f.className = 'node node--full';
      f.textContent = manifest.full.label || 'Full page';
      f.onclick = selectFull;
      picker.appendChild(f);
    }
  }

  const onPageClick = (e: MouseEvent) => {
    if (!open) return;
    const top = liveSections().find((el) => el.contains(e.target as Node));
    if (!top) return;
    e.preventDefault();
    e.stopPropagation();
    select(liveSections().indexOf(top));
  };

  function setOpen(on: boolean) {
    open = on;
    panel.hidden = !on;
    launch.hidden = on;
    if (on) {
      document.head.append(pageStyle);
      liveSections().forEach((el) => el.setAttribute('data-handoff-pick', ''));
      document.addEventListener('click', onPageClick, true);
    } else {
      pageStyle.remove();
      liveSections().forEach((el) => {
        el.removeAttribute('data-handoff-pick');
        el.removeAttribute('data-handoff-on');
      });
      document.removeEventListener('click', onPageClick, true);
    }
  }

  // Copy the active tab's raw content: HTML / CSS verbatim, tokens as CSS
  // custom-property declarations ready to paste into a :root block.
  function copyText() {
    if (!current) return '';
    if (tab === 'html') return current.html || '';
    if (tab === 'css') return current.css || '';
    return (current.tokens || []).map((t) => `${t.name}: ${t.value};`).join('\n');
  }
  const flash = (btn: HTMLButtonElement, restore: string, ok = true) => {
    const orig = btn.innerHTML;
    btn.classList.toggle('done', ok);
    btn.textContent = restore;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.classList.remove('done');
    }, 1300);
  };

  copyBtn.onclick = async () => {
    const text = copyText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      flash(copyBtn, 'Copied');
    } catch {
      flash(copyBtn, 'Failed', false);
    }
  };

  // "Copy for Claude": a fetchable link to this section's self-contained spec,
  // plus a one-line instruction — paste into Claude, which web-fetches it.
  claudeBtn.onclick = async () => {
    if (!current?.claudePath) return;
    const url = new URL(base + current.claudePath, location.origin).href;
    const lines = [
      'Re-implement this UI section on my stack, faithfully, keeping the CSS custom-property names.',
      'Spec (markup + styles + tokens) — use whichever you can reach:',
      `• hosted URL: ${url}`,
    ];
    if (current.repoPath) lines.push(`• in this repo: ${current.repoPath}`);
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      flash(claudeBtn, 'Copied link');
    } catch {
      flash(claudeBtn, 'Failed', false);
    }
  };

  launch.onclick = () => setOpen(true);
  wrap.querySelector<HTMLButtonElement>('.x')!.onclick = () => setOpen(false);
  tabBtns.forEach(
    (b) =>
      (b.onclick = () => {
        tab = b.dataset.tab as typeof tab;
        tabBtns.forEach((x) => x.classList.toggle('on', x === b));
        render();
      })
  );

  // Hotkey: ⌥⇧I toggles the inspector anywhere.
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      setOpen(!open);
    }
  });

  buildTree();
  render();
  // ?inspect in the URL opens immediately — shareable inspect links.
  if (new URLSearchParams(location.search).has('inspect')) setOpen(true);
}
