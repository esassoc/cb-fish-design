// Full search results page (/search). App-page chrome (breadcrumb, page header,
// sidebar + content) with the scope facets in the sidebar. Reuses the shared
// render core so result rows + Impersonate match the palette exactly. Reads/syncs
// the q / scope URL params and filters live as you type.
import { renderScopeFacets, renderResults, filterData, esc, impersonateUser, initImpersonationRevert } from './omni-render';
import { type Entity, type ScopeId } from './omni-data';
import { withBase } from '../../lib/base';

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

  function goToPublications(): void {
    const q = input.value.trim();
    window.location.href = withBase('/publications') + (q ? `?q=${encodeURIComponent(q)}` : '');
  }

  const handlers = {
    // Publications fork to their own document-search page (mirrors prod).
    onSelect: (item: Entity) => {
      if (item.type === 'publication') { goToPublications(); return; }
      console.log('[CBF-8117] open:', item.type, '—', item.title);
    },
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
    renderScopeFacets(facetsEl, {
      scope,
      query: input.value,
      onSelect: (id) => {
        if (id === 'publication') { goToPublications(); return; }
        scope = id; syncUrl(); update();
      },
    });
    const q = input.value.trim();
    if (!q) {
      titleEl.textContent = 'Search';
      resultsEl.innerHTML =
        '<p class="cbf-result-empty">Enter a keyword to search projects, contracts, people, and publications.</p>';
      return;
    }
    renderResults(resultsEl, { query: input.value, scope, ...handlers, onPublicationsAll: goToPublications });
    const n = filterData(input.value, scope).length;
    titleEl.innerHTML = `Search results for: &ldquo;${esc(q)}&rdquo; <span class="cbf-title-count">${n}</span>`;
  }

  input.addEventListener('input', () => { syncUrl(); update(); });
  initImpersonationRevert();
  update();
  input.focus();
}
