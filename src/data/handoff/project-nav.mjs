// Handoff spec for the /project-nav prototype, the project record's header
// navigation (brief: cbfish-nav-header), built on the contract header's "Areas"
// pattern. Consumed only by the hub handoff CLI (npx handoff). Page bodies are gray
// placeholders: only the header is in scope.

/** @type {{ sections: import('./search.mjs').HandoffSection[] }} */
export default {
  sections: [
    {
      label: 'Portfolio return',
      selector: '.cbf-portfolio-return',
      intent:
        'A temporary way back to the portfolio the project was opened from. It sits inside the record card, under the breadcrumbs and above the project eyebrow, outside the navigation itself. It replaces the Back To Portfolio(s) item of today\'s Go to menu.',
      decisions: [
        'Shown only when the record was opened from a portfolio ([data-only-arrival="portfolio"]); a direct arrival never sees it.',
        'An info esa-alert-box, dismissable. Dismissal lasts for the browser session (sessionStorage).',
        'The same component as the contract header; both records share it.',
      ],
      js: ['src/components/contract-nav/cbf-portfolio-return.astro'],
    },
    {
      label: 'Record header',
      selector: '.cbf-record-header',
      intent:
        'The project identity: number as eyebrow, title as the page H1 in brand navy, the project status badge inline after the title, a line naming the current fiscal year and linking that year\'s contract, and the row of area menus underneath.',
      decisions: [
        'No lifecycle track. A project spans many years and runs a new contract each fiscal year, so its pages do not move through phases the way a contract\'s do.',
        'The fiscal year is the project\'s date. The year line links that year\'s contract with the contract\'s own status badge, since the contract is the hop people make most from a project.',
        'Labels are Title Case, matching prod and the contract header (Andy\'s call for this prototype; it overrides docs/copy-style.md here).',
      ],
      gotchas: ['Project status, fiscal year and the linked contract are mock.'],
      js: [
        'src/components/contract-nav/cbf-project-frame.astro',
        'src/components/contract-nav/cbf-record-header.astro',
        'src/components/contract-nav/cbf-project-year.astro',
        'src/data/project-nav.mjs',
      ],
    },
    {
      label: 'Area menus',
      selector: '[data-record-nav]',
      intent:
        'Every page of today\'s project Go to menu, grouped into the areas agreed on 2026-11-10 at equal weight in one row: Overview, Proposals and Reviews, Budget, Contracts and Work, Spending, Results and Files. Each area opens a menu of its pages.',
      decisions: [
        'Today\'s page labels, with no merges, renames or removals. The nav holds 44 of the 45 Go to links; Back To Portfolio(s) moved to the portfolio return above the header.',
        'The menu holding the page you are on gets a filled brand trigger, the header\'s one "you are here" mark.',
        'Pages a role cannot see are hidden (data-hide-for). Admin sees everything; the COR loses system-admin and budgeter pages; a contractor also loses BPA-only and editor-only pages. An area with no pages for a role is hidden for that role.',
        'One menu open at a time; menus close on outside click, focus leaving and Esc, and stay inside the viewport. The row is ruled off from the page below.',
      ],
      gotchas: [
        'Every role state is server-rendered; the role and arrival lenses only toggle attributes on <html> and the CSS in cbf-role-gate hides what they rule out. Switching to a role that cannot see the current page redirects to Project Summary.',
        'Page visibility per role is reduced from every-link-and-tab.md to the contract nav\'s three roles (Admin, COR, Contractor).',
      ],
      acceptance: [
        'Every page of today\'s Go to menu, except Back To Portfolio(s), is reachable from the row in two clicks.',
        'You can tell which area you are in without opening a menu.',
      ],
      js: [
        'src/components/contract-nav/cbf-record-ends.astro',
        'src/components/contract-nav/cbf-page-menu.astro',
        'src/components/contract-nav/cbf-role-gate.astro',
        'src/data/project-nav.mjs',
      ],
    },
    {
      label: 'Page title',
      selector: '.cbf-record-page-title',
      intent:
        'The page being viewed: its area on a quiet line ("Overview"), directly over the page name as an H2 in brand navy ("Project Summary").',
      decisions: [
        'No slash, no page count. Tight line height with a 2px gap so the two lines read as one unit.',
        'The same component as the contract header.',
      ],
      js: ['src/components/contract-nav/cbf-record-page-title.astro'],
    },
  ],
};
