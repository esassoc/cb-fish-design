// Handoff spec for the /search prototype — the authored counterpart to the dumb,
// auto-derived manifest. It declares EXACTLY which regions are inspectable
// sections (by selector, at any depth), plus the design guidance and behavior
// refs a dev/Claude needs to re-implement each one faithfully.
//
// Consumed only by the build-time generator (scripts/gen-handoff.mjs), never by
// the browser — so it's .mjs (native node import, and `drive` states in v2 can be
// real async functions instead of serialized strings).
//
// v1: static, curated sections + guidance + JS. v2 will add `states` (drive the
// page into empty/people/projects and capture the results region per state).

/**
 * @typedef {Object} HandoffSection
 * @property {string} label     Chip label in the inspector.
 * @property {string} selector  What to slice out as this section (first match).
 * @property {string} [intent]  What this is and why it exists.
 * @property {string[]} [decisions] Key design/implementation decisions.
 * @property {string[]} [gotchas]   Traps to avoid when re-implementing.
 * @property {string[]} [acceptance] "Done when…" checks.
 */

/** @type {{ sections: HandoffSection[] }} */
export default {
  // Nav + Header are app chrome (reused hub app-bars), not build targets — omitted
  // on purpose. The spec captures only the regions worth handing off.
  sections: [
    {
      // The admin bar IS a build target here (not just chrome): CBF-8117 relocated
      // global search into it, so the new search trigger lives here.
      label: 'Admin bar',
      selector: 'nav.cbf-app-bar--admin',
      intent:
        'The dark system tray. New in CBF-8117: global search moved OUT of the blue header and UP here as a compact trigger — click it or press "/" to open the command palette. The tray also hosts the impersonation entry point.',
      decisions: [
        'Search lives in the admin tray (not the brand header) so it is one consistent target on every app page.',
        'The trigger is a button, not an input — it opens the palette rather than accepting inline text.',
      ],
      gotchas: [
        'Chrome-on-dark: the trigger uses translucent white over the navy tray, not theme tokens — it must read on dark, not a light surface.',
        'Keep the trigger compact — it shares the tray with system utilities and should not dominate the bar.',
      ],
    },
    {
      // Two real palette states (the user asked) — the zero-state and mid-query.
      // Same selector, different apply recipe; the recipe drives capture AND live.
      label: 'Omni — recents',
      selector: '[data-omni]',
      apply: [{ click: '[data-omni-open]' }],
      intent:
        'The palette on open with no query — the Recent list (last-viewed records) as the zero-state, so the fast path is useful before you type a thing.',
      decisions: [
        'Empty query shows Recents, never a blank list.',
        'Keyboard-first: ↑/↓ move the active row, ⏎ opens it, Esc closes, ⌘K/"/" toggle.',
      ],
      gotchas: ['Recents are a distinct view from results — do not collapse them into an empty results list.'],
    },
    {
      label: 'Omni — results',
      selector: '[data-omni]',
      apply: [{ click: '[data-omni-open]' }, { fill: ['[data-omni-input]', 'salmon'] }],
      intent:
        'The palette mid-query — grouped results across types with scope pills, matched-text highlighting, and "view all" handing off to the /search page.',
      decisions: [
        'Rendering is shared with the /search page via omni-render.ts — one render path, two shells (palette overlay vs. full page).',
        'Active-row state is index-based and resets on every query change.',
      ],
      gotchas: ['"View all results" must carry the current query + scope to /search as ?q=&scope=.'],
      acceptance: ['Typing filters within ~1 frame; ↑/↓/⏎/Esc all work.'],
    },
    {
      label: 'Sidebar',
      selector: '.cbf-app-sidebar',
      intent:
        'The /search facet rail — "Filter by type" (All, Projects, Contracts, People, Publications, Funds). Scopes the result set to one entity type.',
      decisions: [
        'Facet counts and active state are driven from the same data/render layer as the results, so they never disagree.',
        'Selecting a facet updates the scope in place (no full navigation).',
      ],
      gotchas: ['Keep the facet list and the omni scope pills in sync — they represent the same scopes.'],
    },

    // --- Search results, captured as three real states (the page reads ?q & ?scope
    // on load, so each variation is just a query string — no synthetic typing). ---
    {
      label: 'Results — empty',
      selector: '[data-search-results]',
      apply: [{ clear: '[data-search-input]' }],
      intent:
        'The default, no-query state — a first-class prompt, not a blank container. What the user sees on arrival.',
      decisions: ['Empty state is an intentional view (keyword prompt), deliberately distinct from "no matches".'],
      gotchas: ['Never render a bare empty div here — the empty state must read as guidance.'],
    },
    {
      label: 'Results — people',
      selector: '[data-search-results]',
      apply: [
        { fill: ['[data-search-input]', 'Portland'] },
        { clickText: ['[data-search-facets]', 'People'] },
      ],
      intent:
        'People-scoped results — each row resolves to a person with an Impersonate affordance (the dev/QA team are the impersonation targets in this prototype).',
      decisions: [
        'Rows reuse the palette\'s `.cbf-search-surface` styles, so a person looks identical in the palette and on the page.',
        'Matched query text is highlighted within the row title/subtitle.',
      ],
      gotchas: ['Results are permission-filtered server-side — show the "limited to records you can view" notice.'],
    },
    {
      label: 'Results — projects',
      selector: '[data-search-results]',
      apply: [
        { fill: ['[data-search-input]', 'salmon'] },
        { clickText: ['[data-search-facets]', 'Projects'] },
      ],
      intent:
        'Project-scoped results — the same row component carrying a different entity type (project number + fiscal year + status), proving the row generalizes across types.',
      decisions: ['One row component renders every entity type; type only changes the leading icon and subtitle shape.'],
      gotchas: ['Keep the row layout identical across types — only icon + subtitle content should vary.'],
    },
  ],
};
