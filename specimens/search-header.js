/* ==========================================================================
   CB Fish — Search header (CBF-8117)
   Live-filtered command palette. Mock data only.
   ========================================================================== */

/* ---- scopes (CBFish entity types, mirrors prod "Any ▾" options) ---- */
const SCOPES = [
  { id: 'all',         label: 'All',          icon: 'search' },
  { id: 'project',     label: 'Projects',     icon: 'folder' },
  { id: 'contract',    label: 'Contracts',    icon: 'file-text' },
  { id: 'person',      label: 'People',       icon: 'users' },
  { id: 'publication', label: 'Publications', icon: 'book' },
  { id: 'fund',        label: 'Funds',        icon: 'wallet' },
];
const SCOPE_BY_ID = Object.fromEntries(SCOPES.map((s) => [s.id, s]));

/* ---- mock dataset (real CBFish-flavored content; "salmon" matches widely) ---- */
const DATA = [
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

const GROUP_ORDER = ['project', 'contract', 'person', 'publication', 'fund'];
const EMPTY_CAP = 6; // per-group cap when browsing a scope with no query

/* ---- empty state: recently viewed + quick destinations (shown on open) ---- */
const RECENT = [
  { type: 'project',     title: '2002-051-00 Salmon Subbasin Planning', sub: 'Project · viewed 2h ago' },
  { type: 'contract',    title: '[10046] 2001-006-01 Salmon/Steelhead Days', sub: 'Contract · viewed yesterday' },
  { type: 'person',      title: 'David Roberts', sub: 'Nez Perce Tribe · viewed yesterday' },
  { type: 'publication', title: '2023 Annual Progress Report — Salmon Recovery', sub: 'Publication · viewed 3d ago' },
];

/* ---- helpers ---- */
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function highlight(text, q) {
  if (!q) return esc(text);
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}

function filterData(query, scope) {
  const q = query.trim().toLowerCase();
  return DATA.filter((d) => {
    if (scope !== 'all' && d.type !== scope) return false;
    if (!q) return true;
    return d.title.toLowerCase().includes(q) || d.sub.toLowerCase().includes(q);
  });
}

/* One result row. Person rows get a QA/admin "Impersonate" action. Pushes the
   row onto `rows` (for keyboard nav) and returns it. */
function makeResultRow(item, rows, { query = '', lead = false } = {}) {
  const row = document.createElement('div');
  row.className = 'cbf-result';
  const leadHtml = lead
    ? `<span class="cbf-result__lead"><i data-lucide="${SCOPE_BY_ID[item.type] ? SCOPE_BY_ID[item.type].icon : 'circle'}"></i></span>`
    : '';
  const impHtml = item.type === 'person'
    ? `<button class="cbf-impersonate" type="button" data-impersonate><i data-lucide="venetian-mask"></i>Impersonate</button>`
    : '';
  row.innerHTML = `${leadHtml}
    <div class="cbf-result__body">
      <div class="cbf-result__title">${highlight(item.title, query)}</div>
      <div class="cbf-result__sub">${esc(item.sub)}</div>
    </div>
    ${impHtml}
    <i data-lucide="chevron-right" class="cbf-result__chevron"></i>`;
  row.addEventListener('mousemove', () => setActive(rows.indexOf(row)));
  row.addEventListener('click', () => selectRow(item));
  const imp = row.querySelector('[data-impersonate]');
  if (imp) imp.addEventListener('click', (e) => { e.stopPropagation(); impersonate(item); });
  rows.push(row);
  return row;
}

/* Build grouped result DOM into `container`. Returns flat array of row els. */
function renderResults(container, query, scope) {
  const q = query.trim();
  const matches = filterData(query, scope);
  container.innerHTML = '';

  if (matches.length === 0) {
    container.innerHTML = `<p class="cbf-result-empty">No matches for &ldquo;${esc(q)}&rdquo;. Try a different keyword or scope.</p>`;
    return [];
  }

  const rows = [];
  GROUP_ORDER.forEach((type) => {
    let items = matches.filter((m) => m.type === type);
    if (items.length === 0) return;
    const total = items.length;
    if (!q) items = items.slice(0, EMPTY_CAP);

    const s = SCOPE_BY_ID[type];
    const group = document.createElement('div');
    group.className = 'cbf-result-group';
    group.innerHTML = `
      <div class="cbf-result-group__head">
        <span class="cbf-result-group__title"><i data-lucide="${s.icon}"></i>${esc(s.label)}</span>
        <span class="cbf-result-group__count">${q ? total : (total > EMPTY_CAP ? EMPTY_CAP + ' of ' + total : total)}</span>
      </div>`;

    items.forEach((item) => group.appendChild(makeResultRow(item, rows, { query: q })));
    container.appendChild(group);
  });

  if (window.lucide) lucide.createIcons();
  return rows;
}

/* Default view (no query): Recent list + brand illustration / search note.
   Returns flat array of navigable row els (the Recent items). */
function renderEmptyState(container) {
  container.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'cbf-empty';
  const rows = [];

  // Recent (top — the navigable rows)
  const g = document.createElement('div');
  g.className = 'cbf-result-group';
  g.innerHTML = `<div class="cbf-result-group__head">
      <span class="cbf-result-group__title"><i data-lucide="history"></i>Recent</span>
    </div>`;
  RECENT.forEach((it) => g.appendChild(makeResultRow(it, rows, { lead: true })));
  wrap.appendChild(g);

  // Illustration + search note (fills the remaining height, centered)
  const hero = document.createElement('div');
  hero.className = 'cbf-empty__hero';
  hero.innerHTML = `
    <img class="cbf-empty__art" src="assets/dam-illustration.jpg" alt="" />
    <p class="cbf-empty__title">Search the Program</p>
    <p class="cbf-empty__note">Find projects, contracts, people, publications, and funds across the
      Columbia Basin. Start typing, or press <kbd>Tab</kbd> to choose a scope.</p>`;
  wrap.appendChild(hero);

  container.appendChild(wrap);
  if (window.lucide) lucide.createIcons();
  return rows;
}

/* ==========================================================================
   PALETTE
   ========================================================================== */
const palette = document.querySelector('[data-palette]');
const pInput = palette.querySelector('[data-palette-input]');
const pResults = palette.querySelector('[data-palette-results]');
const pScopes = palette.querySelector('[data-scopes]');
let pScope = 'all';
let pRows = [];
let pActive = 0;

function buildScopePills() {
  pScopes.innerHTML = '';
  // counts reflect the current query (ignoring the active scope), so they agree
  // with the group headers and preview what each scope would yield.
  const matchingAll = filterData(pInput.value, 'all');
  SCOPES.forEach((s) => {
    const count = s.id === 'all' ? matchingAll.length : matchingAll.filter((d) => d.type === s.id).length;
    const btn = document.createElement('button');
    btn.className = 'cbf-scope-pill' + (s.id === pScope ? ' is-active' : '');
    btn.type = 'button';
    btn.dataset.scope = s.id;
    btn.innerHTML = `<i data-lucide="${s.icon}"></i>${esc(s.label)} <span class="cbf-scope-pill__count">${count}</span>`;
    btn.addEventListener('click', () => { pScope = s.id; refreshPalette(); });
    pScopes.appendChild(btn);
  });
  if (window.lucide) lucide.createIcons();
}

function refreshPalette() {
  buildScopePills();
  // default view (no query, no scope filter) is the Recent / Jump-to empty state
  const isDefault = !pInput.value.trim() && pScope === 'all';
  palette.querySelector('[data-viewall]').style.visibility = isDefault ? 'hidden' : 'visible';
  pRows = isDefault ? renderEmptyState(pResults) : renderResults(pResults, pInput.value, pScope);
  pActive = 0;
  if (pRows.length) setActive(0);
}

function setActive(idx) {
  pActive = idx;
  pRows.forEach((r, i) => r.classList.toggle('is-active', i === idx));
  if (pRows[idx]) pRows[idx].scrollIntoView({ block: 'nearest' });
}

function selectRow(item) {
  // prototype: surface the choice; real impl would navigate to the entity
  console.log('[CBF-8117] selected:', item.type || 'link', '—', item.title);
  closePalette();
}

/* Impersonation — QA/ESA-admin shortcut to view the app as another user.
   Prototype: reflect the state in the header; click the header to revert. */
const userBtn = document.querySelector('.cbf-header__nav-link--user');
const userDefaultHtml = userBtn.innerHTML;
function impersonate(person) {
  console.log('[CBF-8117] impersonate:', person.title);
  userBtn.classList.add('is-impersonating');
  userBtn.innerHTML = `<span class="cbf-imp-badge"><i data-lucide="venetian-mask"></i> Impersonating</span>
    <i data-lucide="circle-user"></i> ${esc(person.title)} <i data-lucide="rotate-ccw" class="cbf-chevron"></i>`;
  if (window.lucide) lucide.createIcons();
  closePalette();
}
userBtn.addEventListener('click', () => {
  if (!userBtn.classList.contains('is-impersonating')) return;
  userBtn.classList.remove('is-impersonating');
  userBtn.innerHTML = userDefaultHtml;
  if (window.lucide) lucide.createIcons();
});

function openPalette() {
  palette.hidden = false;
  pInput.value = '';
  pScope = 'all';
  refreshPalette();
  setTimeout(() => pInput.focus(), 0);
}
function closePalette() { palette.hidden = true; }

pInput.addEventListener('input', refreshPalette);
palette.querySelector('[data-clear-palette]').addEventListener('click', () => { pInput.value = ''; refreshPalette(); pInput.focus(); });
palette.querySelector('[data-close-palette]').addEventListener('click', closePalette);
document.querySelector('[data-open-palette]').addEventListener('click', openPalette);

pInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(pActive + 1, pRows.length - 1)); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(pActive - 1, 0)); }
  else if (e.key === 'Enter') { e.preventDefault(); if (pRows[pActive]) pRows[pActive].click(); }
  else if (e.key === 'Tab') {
    e.preventDefault();
    const i = SCOPES.findIndex((s) => s.id === pScope);
    pScope = SCOPES[(i + (e.shiftKey ? SCOPES.length - 1 : 1)) % SCOPES.length].id;
    refreshPalette();
  }
});

/* global: "/" opens, "Esc" closes */
document.addEventListener('keydown', (e) => {
  const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
  if (e.key === '/' && !typing) { e.preventDefault(); openPalette(); }
  else if (e.key === 'Escape') { closePalette(); }
});

/* boot */
if (window.lucide) lucide.createIcons();
