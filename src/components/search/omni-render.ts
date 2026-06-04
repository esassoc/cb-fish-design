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
