// Command-palette behavior (CBF-8117). The rendering is shared with the /search
// page via omni-render; this file owns palette-only concerns: open/close, the
// empty↔results toggle, keyboard navigation, and "view all results" → /search.
import {
  renderScopePills,
  renderResults,
  renderRecent,
  filterData,
  impersonateUser,
  initImpersonationRevert,
} from './omni-render';
import { SCOPES, type Entity, type ScopeId } from './omni-data';

export function initOmniSearch(): void {
  const omni = document.querySelector<HTMLElement>('[data-omni]');
  if (!omni) return;

  const input = omni.querySelector<HTMLInputElement>('[data-omni-input]')!;
  const scopesEl = omni.querySelector<HTMLElement>('[data-omni-scopes]')!;
  const resultsEl = omni.querySelector<HTMLElement>('[data-omni-results]')!;
  const emptyEl = omni.querySelector<HTMLElement>('[data-omni-empty]')!;
  const recentEl = omni.querySelector<HTMLElement>('[data-omni-recent]')!;
  const showall = omni.querySelector<HTMLElement>('[data-omni-showall]')!;
  const showallLabel = omni.querySelector<HTMLElement>('[data-omni-showall-label]')!;
  const trigger = document.querySelector<HTMLElement>('[data-omni-open]');

  let scope: ScopeId = 'all';
  let rows: HTMLElement[] = [];
  let active = 0;

  function setActive(idx: number): void {
    active = idx;
    rows.forEach((r, i) => r.classList.toggle('is-active', i === idx));
    rows[idx]?.scrollIntoView({ block: 'nearest' });
  }

  const handlers = {
    onSelect: (item: Entity) => {
      console.log('[CBF-8117] selected:', item.type, '—', item.title);
      closePalette();
    },
    onImpersonate: (item: Entity) => {
      impersonateUser(item);
      closePalette();
    },
  };

  function bindActiveOnHover(): void {
    rows.forEach((row, i) => row.addEventListener('mousemove', () => setActive(i)));
  }

  function refresh(): void {
    renderScopePills(scopesEl, { scope, query: input.value, onSelect: (id) => { scope = id; refresh(); } });
    // no query → no counts, no results: show the Recent + illustration empty state
    const isDefault = !input.value.trim();
    if (isDefault) {
      emptyEl.hidden = false;
      resultsEl.hidden = true;
      showall.hidden = true;
      rows = renderRecent(recentEl, handlers);
    } else {
      emptyEl.hidden = true;
      resultsEl.hidden = false;
      rows = renderResults(resultsEl, { query: input.value, scope, ...handlers });
      const total = filterData(input.value, scope).length;
      showall.hidden = total === 0;
      showallLabel.textContent = `Show all ${total} result${total === 1 ? '' : 's'}`;
    }
    bindActiveOnHover();
    active = 0;
    if (rows.length) setActive(0);
  }

  function goToResults(): void {
    const params = new URLSearchParams();
    if (input.value.trim()) params.set('q', input.value.trim());
    if (scope !== 'all') params.set('scope', scope);
    const qs = params.toString();
    window.location.href = '/search' + (qs ? `?${qs}` : '');
  }

  function openPalette(): void {
    omni!.hidden = false;
    input.value = '';
    scope = 'all';
    refresh();
    setTimeout(() => input.focus(), 0);
  }
  function closePalette(): void {
    omni!.hidden = true;
  }

  // ---- wiring ----
  input.addEventListener('input', refresh);
  omni.querySelector('[data-omni-clear]')!.addEventListener('click', () => { input.value = ''; refresh(); input.focus(); });
  omni.querySelector('[data-omni-close]')!.addEventListener('click', closePalette);
  showall.addEventListener('click', goToResults);
  trigger?.addEventListener('click', openPalette);
  initImpersonationRevert();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); goToResults(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(active + 1, rows.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(active - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); rows[active]?.click(); }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const i = SCOPES.findIndex((s) => s.id === scope);
      scope = SCOPES[(i + (e.shiftKey ? SCOPES.length - 1 : 1)) % SCOPES.length].id;
      refresh();
    }
  });

  document.addEventListener('keydown', (e) => {
    const el = document.activeElement;
    const typing = el instanceof HTMLElement && /^(INPUT|TEXTAREA)$/.test(el.tagName);
    if (e.key === '/' && !typing) { e.preventDefault(); openPalette(); }
    else if (e.key === 'Escape') { closePalette(); }
  });
}
