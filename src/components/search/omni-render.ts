// Shared render core for the search surfaces — used by BOTH the command palette
// (cbf-omni-search) and the full results page (/search). Pure builders + the
// impersonation helper, so the two surfaces stay pixel-identical and never drift.
// Styling for what these build lives under .cbf-search-surface (cbf-omni-search).
import { svg, type IconName } from './icons';
import {
  SCOPES,
  SCOPE_BY_ID,
  DATA,
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
  if (item.type === 'person') row.classList.add('cbf-result--person');
  const leadHtml = lead ? `<span class="cbf-result__lead">${icon(SCOPE_BY_ID[item.type].icon, 16)}</span>` : '';
  row.innerHTML = `${leadHtml}
    <div class="cbf-result__body">
      <div class="cbf-result__title">${highlight(item.title, query)}</div>
      <div class="cbf-result__sub">${esc(item.sub)}</div>
    </div>
    <span class="cbf-result__chevron cbf-icon">${svg('chevron-right', 17)}</span>`;
  // People don't navigate — they reveal a contact card anchored to the row.
  if (item.type === 'person' && item.contact) {
    row.addEventListener('click', () => openPersonCard(row, item, h));
  } else {
    row.addEventListener('click', () => h.onSelect(item));
  }
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
  opts: { query: string; scope: ScopeId } & RowHandlers & {
    /** When set, the Publications group collapses to a single CTA that forks to
        the document-search page instead of listing rows (used on /search). */
    onPublicationsAll?: (count: number) => void;
  },
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
    if (type === 'publication' && opts.onPublicationsAll) {
      // Publications fork to their own search — show one CTA, no listings.
      const n = items.length;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cbf-result cbf-result--allbtn';
      btn.innerHTML = `
        <div class="cbf-result__body">
          <div class="cbf-result__title">${n} Publication result${n === 1 ? '' : 's'}</div>
          <div class="cbf-result__sub">Open in Publications Search</div>
        </div>
        <span class="cbf-result__chevron cbf-icon">${svg('chevron-right', 18)}</span>`;
      btn.addEventListener('click', () => opts.onPublicationsAll!(n));
      out.push(btn);
      g.appendChild(btn);
      container.appendChild(g);
      return;
    }
    items.forEach((item) => {
      const row = makeRow(item, q, false, opts);
      out.push(row);
      g.appendChild(row);
    });
    container.appendChild(g);
  });
  return out;
}

// ---- person contact card (popover, shared so palette + page behave identically) ----
// Anchored to the clicked row; mirrors prod's "Find Person" modal without stacking a
// second modal over the palette. One card open at a time; dismiss on outside-click/Esc.
let openCard: HTMLElement | null = null;
let cardCleanup: (() => void) | null = null;

export function closePersonCard(): void {
  if (cardCleanup) cardCleanup();
  openCard?.remove();
  openCard = null;
  cardCleanup = null;
}

/** vCard data URL so the download is a real .vcf (no backend needed). */
function vcardHref(p: Entity): string {
  const c = p.contact!;
  const [first, ...rest] = p.title.split(' ');
  const lines = [
    'BEGIN:VCARD', 'VERSION:3.0',
    `N:${rest.join(' ')};${first};;;`,
    `FN:${p.title}`,
    `ORG:${c.org}`,
    `EMAIL;TYPE=WORK:${c.email}`,
  ];
  if (c.businessPhone) lines.push(`TEL;TYPE=WORK,VOICE:${c.businessPhone}`);
  if (c.mobilePhone) lines.push(`TEL;TYPE=CELL:${c.mobilePhone}`);
  if (c.address) lines.push(`ADR;TYPE=WORK:;;${c.address.join(', ')};;;`);
  lines.push('END:VCARD');
  return 'data:text/vcard;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'));
}

function detailRow(iconName: IconName, label: string, valueHtml: string): string {
  return `<div class="cbf-person-card__row">
      <dt class="cbf-person-card__label">${icon(iconName, 15)}${esc(label)}</dt>
      <dd class="cbf-person-card__value">${valueHtml}</dd>
    </div>`;
}

/** Position the card beside its anchor, preferring the right side, clamped to the viewport. */
function positionCard(card: HTMLElement, anchor: HTMLElement): void {
  const a = anchor.getBoundingClientRect();
  const cw = card.offsetWidth;
  const ch = card.offsetHeight;
  const gap = 8;
  const margin = 12;
  let left = a.right + gap;
  if (left + cw > window.innerWidth - margin) left = a.left - gap - cw; // flip to the left
  if (left < margin) left = Math.max(margin, window.innerWidth - margin - cw); // last resort
  let top = a.top;
  if (top + ch > window.innerHeight - margin) top = window.innerHeight - margin - ch;
  if (top < margin) top = margin;
  card.style.left = `${Math.round(left)}px`;
  card.style.top = `${Math.round(top)}px`;
}

export function openPersonCard(anchor: HTMLElement, person: Entity, h: RowHandlers): void {
  closePersonCard();
  const c = person.contact!;
  const card = document.createElement('div');
  card.className = 'cbf-person-card';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-label', `Contact: ${person.title}`);

  const rows = [
    detailRow('building-2', 'Organization', esc(c.org)),
    detailRow('mail', 'Email', `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`),
    c.businessPhone ? detailRow('phone', 'Business phone', esc(c.businessPhone)) : '',
    c.mobilePhone ? detailRow('smartphone', 'Mobile phone', esc(c.mobilePhone)) : '',
    c.address ? detailRow('map-pin', 'Address', c.address.map(esc).join('<br>')) : '',
  ].join('');

  card.innerHTML = `
    <div class="cbf-person-card__head">
      <span class="cbf-person-card__head-title">${icon('circle-user', 16)} Find Person</span>
      <button class="cbf-person-card__close" type="button" data-card-close aria-label="Close">${svg('x', 15)}</button>
    </div>
    <div class="cbf-person-card__body">
      <p class="cbf-person-card__name">${esc(person.title)}</p>
      <dl class="cbf-person-card__list">${rows}</dl>
    </div>
    <div class="cbf-person-card__foot">
      <a class="cbf-person-card__vcard" href="${vcardHref(person)}" download="${esc(person.title)}.vcf">${icon('download', 15)} Download vCard</a>
      <button class="cbf-impersonate" type="button" data-impersonate>${icon('hat-glasses', 15)} Impersonate</button>
    </div>`;

  document.body.appendChild(card);
  openCard = card; // tracked so closePersonCard() can remove it (one card at a time)
  positionCard(card, anchor);
  anchor.classList.add('is-cardopen');

  card.querySelector('[data-card-close]')!.addEventListener('click', closePersonCard);
  card.querySelector('[data-impersonate]')!.addEventListener('click', () => {
    impersonateUser(person);
    closePersonCard();
  });

  const onDown = (e: MouseEvent) => { if (!card.contains(e.target as Node)) closePersonCard(); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.stopPropagation(); closePersonCard(); }
  };
  const onScroll = () => positionCard(card, anchor);
  // defer so the originating click doesn't immediately dismiss the card
  setTimeout(() => document.addEventListener('mousedown', onDown), 0);
  document.addEventListener('keydown', onKey, true);
  window.addEventListener('resize', onScroll);
  // capture-phase: reposition when ANY scroll container (palette body, page) moves
  document.addEventListener('scroll', onScroll, true);

  cardCleanup = () => {
    anchor.classList.remove('is-cardopen');
    document.removeEventListener('mousedown', onDown);
    document.removeEventListener('keydown', onKey, true);
    window.removeEventListener('resize', onScroll);
    document.removeEventListener('scroll', onScroll, true);
  };
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
