# Results — empty

The default, no-query state — a first-class prompt, not a blank container. What the user sees on arrival.

## Key decisions
- Empty state is an intentional view (keyword prompt), deliberately distinct from "no matches".

## Gotchas
- Never render a bare empty div here — the empty state must read as guidance.

## Markup
```html
<div class="cbf-search-results" data-search-results="">
  <p class="cbf-result-empty">
    Enter a keyword to search projects, contracts, people, publications, and funds.
  </p>
</div>
```

## Styles
```css
.cbf-search-results {
  margin-top: var(--spacing-400);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.cbf-search-surface .cbf-result-empty {
  padding: var(--spacing-600) var(--spacing-500);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 15px;
}
```

## Tokens
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_

## Behavior
```ts
// ── src/components/search/icons.ts ──
// Inline Lucide glyphs the search feature needs. The hub's esa-icon ships a fixed
// set that lacks several of these (history, folder, book, wallet, venetian-mask,
// rotate-ccw), and the hub is a file: dependency we don't edit — so the spoke
// carries its own small set. One source feeds both build-time (.astro via svg())
// and runtime (the client script builds result rows as HTML strings).
//
// Paths copied from lucide.dev: 24×24, stroke-based, stroke-width 2.

export type IconName =
  | 'search' | 'x' | 'chevron-right' | 'chevron-down'
  | 'folder' | 'file-text' | 'users' | 'book' | 'wallet'
  | 'history' | 'hat-glasses' | 'rotate-ccw'
  | 'circle-user' | 'layout-dashboard';

const ICONS: Record<IconName, string> = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 1-1 1v-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  'hat-glasses': '<path d="M14 18a2 2 0 0 0-4 0"/><path d="m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 11 4H8.5"/><path d="m4 11 2.71-6.715a2 2 0 0 1 2.836-1.187L11 4"/><path d="M4.5 11h15a1 1 0 0 1 1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5a2.5 2.5 0 0 1-2.5-2.5v-.5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5A2.5 2.5 0 0 1 3.5 12.5V12a1 1 0 0 1 1-1Z"/>',
  'rotate-ccw': '<path d="M3 2v6h6"/><path d="M3 8a9 9 0 1 0 2.83-2.83L3 8"/>',
  'circle-user': '<circle cx="12" cy="12" r="10"/><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/>',
  'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
};

/** Full <svg> string for inline use (set:html in .astro, or innerHTML in JS). */
export function svg(name: IconName, px = 16): string {
  return `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] ?? ''}</svg>`;
}

// ── src/components/search/omni-data.ts ──
// Mock data for the search palette prototype (CBF-8117). Real impl would query
// the API with permission scoping; here it's static, CBFish-flavored content so a
// demo reads as credible. People are the ESA dev/QA team (impersonation targets).
import type { IconName } from './icons';

export type EntityType = 'project' | 'contract' | 'person' | 'publication' | 'fund';
export type ScopeId = 'all' | EntityType;

export interface Scope {
  id: ScopeId;
  label: string;
  icon: IconName;
}
export interface Entity {
  type: EntityType;
  title: string;
  sub: string;
}

export const SCOPES: Scope[] = [
  { id: 'all', label: 'All', icon: 'search' },
  { id: 'project', label: 'Projects', icon: 'folder' },
  { id: 'contract', label: 'Contracts', icon: 'file-text' },
  { id: 'person', label: 'People', icon: 'users' },
  { id: 'publication', label: 'Publications', icon: 'book' },
  { id: 'fund', label: 'Funds', icon: 'wallet' },
];

export const SCOPE_BY_ID: Record<ScopeId, Scope> = Object.fromEntries(
  SCOPES.map((s) => [s.id, s]),
) as Record<ScopeId, Scope>;

/** Group render order for results. */
export const GROUP_ORDER: EntityType[] = ['project', 'contract', 'person', 'publication', 'fund'];

/** Per-group cap when browsing a scope with no query. */
export const BROWSE_CAP = 6;

export const DATA: Entity[] = [
  { type: 'project', title: '2001-006-00 Salmon/Steelhead Days', sub: 'Project · FY2001 · Active' },
  { type: 'project', title: '2002-051-00 Salmon Subbasin Planning', sub: 'Project · FY2002 · Active' },
  { type: 'project', title: '2002-032-00 Passage of ESA-Listed Juvenile Salmon', sub: 'Project · FY2002' },
  { type: 'project', title: '2002-033-00 John Day Salmonid Monitoring Program', sub: 'Project · FY2002 · Active' },
  { type: 'project', title: '2001-025-00 Salmonid Production in Restored Rattlesnake Creek', sub: 'Project · FY2001' },
  { type: 'project', title: '1996-019-00 Hood River Production Program', sub: 'Project · FY1996 · Active' },

  { type: 'contract', title: '[10046] 2001-006-01 Salmon/Steelhead Days', sub: 'Contract · Project 2001-006-00' },
  { type: 'contract', title: '[10205] 2001-006-02 Trout/Salmon Watch', sub: 'Contract · Project 2001-006-00' },
  { type: 'contract', title: '[10217] 2001-025-00 Salmonid Production, Rattlesnake Creek', sub: 'Contract · Project 2001-025-00' },
  { type: 'contract', title: '[10253 REL 32] Shoshone-Bannock Tribe — Salmon Subbasin', sub: 'Contract · Project 2002-051-00' },
  { type: 'contract', title: '[10253 REL 33] Nez Perce Tribe — Salmon Subbasin', sub: 'Contract · Project 2002-051-00' },
  { type: 'contract', title: '[10255 REL 18] Idaho Dept of Fish & Game — Salmon Subbasin', sub: 'Contract · Project 2002-051-00' },
  { type: 'contract', title: '[10952] 2002-033-00 John Day Salmonid Monitoring', sub: 'Contract · Project 2002-033-00' },

  { type: 'person', title: 'Andrew Lovseth', sub: 'Bonneville Power Administration · Project lead' },
  { type: 'person', title: 'Angela Zhao', sub: 'NW Power & Conservation Council · Program analyst' },
  { type: 'person', title: 'David Roberts', sub: 'Nez Perce Tribe · Fisheries biologist' },
  { type: 'person', title: 'Maria Gonzales', sub: 'Idaho Dept of Fish & Game · Salmon program' },
  { type: 'person', title: 'Gloria Scott', sub: 'Environmental Technologist IV · DT-Technology Services, Portland' },
  { type: 'person', title: 'Dan Squires', sub: 'Environmental Technologist II · Portland' },
  { type: 'person', title: 'John Vivio', sub: 'Software Developer/Architect IV · Portland' },
  { type: 'person', title: 'Adrian Mickel', sub: 'Software Developer II · Portland' },
  { type: 'person', title: 'Hunter Kennedy', sub: 'Software Developer II · Sacramento' },
  { type: 'person', title: 'Rex Ounekeo', sub: 'Software Developer III · Portland' },
  { type: 'person', title: 'Tom Kamin', sub: 'Software Developer III · Portland' },
  { type: 'person', title: 'Michael Ferrante', sub: 'Software Developer/Architect IV · Portland' },

  { type: 'publication', title: '2023 Annual Progress Report — Salmon Recovery', sub: 'Publication · Report Center' },
  { type: 'publication', title: 'Subbasin Plan: Salmon River', sub: 'Publication · Planning document' },
  { type: 'publication', title: 'Smolt Monitoring Protocol (rev. 4)', sub: 'Publication · Methods' },

  { type: 'fund', title: 'Salmon Mitigation Fund (FY26)', sub: 'Fund · $24.7M committed' },
  { type: 'fund', title: 'Anadromous Fish Screening Fund', sub: 'Fund · $8.1M committed' },
];

/** Recently-viewed entities shown in the default (no-query) empty state. */
export const RECENT: Entity[] = [
  { type: 'project', title: '2002-051-00 Salmon Subbasin Planning', sub: 'Project · viewed 2h ago' },
  { type: 'contract', title: '[10046] 2001-006-01 Salmon/Steelhead Days', sub: 'Contract · viewed yesterday' },
  { type: 'person', title: 'David Roberts', sub: 'Nez Perce Tribe · viewed yesterday' },
  { type: 'publication', title: '2023 Annual Progress Report — Salmon Recovery', sub: 'Publication · viewed 3d ago' },
];

// ── src/components/search/omni-render.ts ──
// Shared render core for the search surfaces — used by BOTH the command palette
// (cbf-omni-search) and the full results page (/search). Pure builders + the
// impersonation helper, so the two surfaces stay pixel-identical and never drift.
// Styling for what these build lives under .cbf-search-surface (cbf-omni-search).
import { svg, type IconName } from './icons';
import {
  SCOPES,
  SCOPE_BY_ID,
  DATA,
  RECENT,
  GROUP_ORDER,
  type Entity,
  type EntityType,
  type ScopeId,
} from './omni-data';

export const esc = (s: string): string =>
  s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string);

export function highlight(text: string, q: string): string {
  if (!q) return esc(text);
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}

export function filterData(query: string, scope: ScopeId): Entity[] {
  const q = query.trim().toLowerCase();
  return DATA.filter((d) => {
    if (scope !== 'all' && d.type !== scope) return false;
    if (!q) return true;
    return d.title.toLowerCase().includes(q) || d.sub.toLowerCase().includes(q);
  });
}

export interface RowHandlers {
  onSelect: (item: Entity) => void;
  onImpersonate: (item: Entity) => void;
}

function icon(name: IconName, px: number): string {
  return `<span class="cbf-icon">${svg(name, px)}</span>`;
}

export function makeRow(item: Entity, query: string, lead: boolean, h: RowHandlers): HTMLElement {
  const row = document.createElement('div');
  row.className = 'cbf-result';
  const leadHtml = lead ? `<span class="cbf-result__lead">${icon(SCOPE_BY_ID[item.type].icon, 16)}</span>` : '';
  const impHtml =
    item.type === 'person'
      ? `<button class="cbf-impersonate" type="button" data-impersonate>${icon('hat-glasses', 15)}Impersonate</button>`
      : '';
  row.innerHTML = `${leadHtml}
    <div class="cbf-result__body">
      <div class="cbf-result__title">${highlight(item.title, query)}</div>
      <div class="cbf-result__sub">${esc(item.sub)}</div>
    </div>
    ${impHtml}
    <span class="cbf-result__chevron cbf-icon">${svg('chevron-right', 17)}</span>`;
  row.addEventListener('click', () => h.onSelect(item));
  const imp = row.querySelector<HTMLElement>('[data-impersonate]');
  if (imp) imp.addEventListener('click', (e) => { e.stopPropagation(); h.onImpersonate(item); });
  return row;
}

function groupEl(headIcon: IconName, label: string, count: string): HTMLElement {
  const g = document.createElement('div');
  g.className = 'cbf-result-group';
  g.innerHTML = `<div class="cbf-result-group__head">
      <span class="cbf-result-group__title">${icon(headIcon, 14)}${esc(label)}</span>
      ${count ? `<span class="cbf-result-group__count">${esc(count)}</span>` : ''}
    </div>`;
  return g;
}

/** Scope filter pills. Counts are shown ONLY when there's a query. */
export function renderScopePills(
  container: HTMLElement,
  opts: { scope: ScopeId; query: string; onSelect: (id: ScopeId) => void },
): void {
  container.innerHTML = '';
  const hasQuery = !!opts.query.trim();
  const matchingAll = filterData(opts.query, 'all');
  SCOPES.forEach((s) => {
    const n = s.id === 'all' ? matchingAll.length : matchingAll.filter((d) => d.type === s.id).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cbf-scope-pill' + (s.id === opts.scope ? ' is-active' : '');
    btn.innerHTML = icon(s.icon, 14) + esc(s.label) + (hasQuery ? ` <span class="cbf-scope-pill__count">${n}</span>` : '');
    btn.addEventListener('click', () => opts.onSelect(s.id));
    container.appendChild(btn);
  });
}

/** Vertical scope facets for the results-page sidebar. Counts only with a query. */
export function renderScopeFacets(
  container: HTMLElement,
  opts: { scope: ScopeId; query: string; onSelect: (id: ScopeId) => void },
): void {
  container.innerHTML = '';
  const hasQuery = !!opts.query.trim();
  const matchingAll = filterData(opts.query, 'all');
  SCOPES.forEach((s) => {
    const n = s.id === 'all' ? matchingAll.length : matchingAll.filter((d) => d.type === s.id).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cbf-facet' + (s.id === opts.scope ? ' is-active' : '');
    btn.innerHTML =
      `${icon(s.icon, 16)}<span class="cbf-facet__label">${esc(s.label)}</span>` +
      (hasQuery ? `<span class="cbf-facet__count">${n}</span>` : '');
    btn.addEventListener('click', () => opts.onSelect(s.id));
    container.appendChild(btn);
  });
}

/** Grouped results for a query. Returns the flat row list (for keyboard nav). */
export function renderResults(
  container: HTMLElement,
  opts: { query: string; scope: ScopeId } & RowHandlers,
): HTMLElement[] {
  const q = opts.query.trim();
  const matches = filterData(opts.query, opts.scope);
  container.innerHTML = '';
  const out: HTMLElement[] = [];
  if (matches.length === 0) {
    container.innerHTML = `<p class="cbf-result-empty">No matches for &ldquo;${esc(q)}&rdquo;. Try a different keyword or scope.</p>`;
    return out;
  }
  const order: EntityType[] = GROUP_ORDER;
  order.forEach((type) => {
    const items = matches.filter((m) => m.type === type);
    if (items.length === 0) return;
    const s = SCOPE_BY_ID[type];
    const g = groupEl(s.icon, s.label, String(items.length));
    items.forEach((item) => {
      const row = makeRow(item, q, false, opts);
      out.push(row);
      g.appendChild(row);
    });
    container.appendChild(g);
  });
  return out;
}

/** Recently-viewed list for the default (no-query) view. */
export function renderRecent(container: HTMLElement, h: RowHandlers): HTMLElement[] {
  container.innerHTML = '';
  const out: HTMLElement[] = [];
  const g = groupEl('history', 'Recent', '');
  RECENT.forEach((item) => {
    const row = makeRow(item, '', true, h);
    out.push(row);
    g.appendChild(row);
  });
  container.appendChild(g);
  return out;
}

// ---- impersonation (shared so palette + page behave identically) ----
let userDefaultHtml: string | null = null;

export function impersonateUser(person: Entity): void {
  const el = document.querySelector<HTMLElement>('[data-omni-user]');
  if (!el) return;
  if (userDefaultHtml === null) userDefaultHtml = el.innerHTML;
  el.classList.add('is-impersonating');
  el.innerHTML =
    `<span class="cbf-imp-badge">${icon('hat-glasses', 13)} Impersonating</span>` +
    `${icon('circle-user', 16)} ${esc(person.title)} ${icon('rotate-ccw', 12)}`;
}

/** Wire the header user menu to revert impersonation on click. Call once. */
export function initImpersonationRevert(): void {
  const el = document.querySelector<HTMLElement>('[data-omni-user]');
  if (!el) return;
  el.addEventListener('click', () => {
    if (!el.classList.contains('is-impersonating')) return;
    el.classList.remove('is-impersonating');
    if (userDefaultHtml !== null) el.innerHTML = userDefaultHtml;
  });
}

// ── src/components/search/search-page.client.ts ──
// Full search results page (/search). App-page chrome (breadcrumb, page header,
// sidebar + content) with the scope facets in the sidebar. Reuses the shared
// render core so result rows + Impersonate match the palette exactly. Reads/syncs
// the q / scope URL params and filters live as you type.
import { renderScopeFacets, renderResults, filterData, esc, impersonateUser, initImpersonationRevert } from './omni-render';
import { type Entity, type ScopeId } from './omni-data';

export function initSearchPage(): void {
  const root = document.querySelector<HTMLElement>('[data-search-page]');
  if (!root) return;
  const input = root.querySelector<HTMLInputElement>('[data-search-input]')!;
  const facetsEl = root.querySelector<HTMLElement>('[data-search-facets]')!;
  const resultsEl = root.querySelector<HTMLElement>('[data-search-results]')!;
  const titleEl = root.querySelector<HTMLElement>('[data-search-title]')!;

  const params = new URLSearchParams(window.location.search);
  let scope: ScopeId = (params.get('scope') as ScopeId) || 'all';
  input.value = params.get('q') ?? '';

  const handlers = {
    onSelect: (item: Entity) => console.log('[CBF-8117] open:', item.type, '—', item.title),
    onImpersonate: (item: Entity) => impersonateUser(item),
  };

  function syncUrl(): void {
    const p = new URLSearchParams();
    if (input.value.trim()) p.set('q', input.value.trim());
    if (scope !== 'all') p.set('scope', scope);
    const qs = p.toString();
    window.history.replaceState(null, '', window.location.pathname + (qs ? `?${qs}` : ''));
  }

  function update(): void {
    renderScopeFacets(facetsEl, { scope, query: input.value, onSelect: (id) => { scope = id; syncUrl(); update(); } });
    const q = input.value.trim();
    if (!q) {
      titleEl.textContent = 'Search';
      resultsEl.innerHTML =
        '<p class="cbf-result-empty">Enter a keyword to search projects, contracts, people, publications, and funds.</p>';
      return;
    }
    renderResults(resultsEl, { query: input.value, scope, ...handlers });
    const n = filterData(input.value, scope).length;
    titleEl.innerHTML = `Search results for: &ldquo;${esc(q)}&rdquo; <span class="cbf-title-count">${n}</span>`;
  }

  input.addEventListener('input', () => { syncUrl(); update(); });
  initImpersonationRevert();
  update();
  input.focus();
}
```
