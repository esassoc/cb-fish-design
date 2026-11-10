// Handoff spec for the /contract-nav prototype — the contract record's header
// navigation (brief: cbfish-nav-header). Consumed only by the hub handoff CLI
// (npx handoff). Page bodies are gray placeholders: only the header is in scope.

/** @type {{ sections: import('./search.mjs').HandoffSection[] }} */
export default {
  sections: [
    {
      label: 'Portfolio return',
      selector: '.cbf-portfolio-return',
      intent:
        'A temporary way back to the portfolio the contract was opened from. It sits inside the record card, under the breadcrumbs and above the contract eyebrow, outside the navigation itself.',
      decisions: [
        'Shown only when the record was opened from a portfolio ([data-only-arrival="portfolio"]); a direct arrival never sees it.',
        'An info esa-alert-box, dismissable. Dismissal lasts for the browser session (sessionStorage).',
      ],
      gotchas: [
        'The hub esa-alert-box dismiss throws (FOCUSABLE_SELECTOR is not defined); the component hides itself on the dismiss click instead.',
      ],
      js: ['src/components/contract-nav/cbf-portfolio-return.astro'],
    },
    {
      label: 'Record header',
      selector: '.cbf-record-header',
      intent:
        'The contract identity: number as eyebrow, title as the page H1 in brand navy, the status badge inline after the title, and Overview and Files menus at the end of the title row. The lifecycle track sits underneath.',
      decisions: [
        'Overview and Files are always available, whatever the phase; they are not phases.',
        'Status badge per stage: Draft (neutral), In review (info), Issued (success), Change request pending (info), Closed (neutral).',
        'The menu holding the page you are on gets a filled brand trigger.',
        'Labels are Title Case, matching prod (Andy\'s call for this prototype; it overrides docs/copy-style.md here).',
      ],
      js: ['src/components/contract-nav/cbf-record-header.astro', 'src/components/contract-nav/cbf-record-ends.astro'],
    },
    {
      label: 'Lifecycle track',
      selector: '[data-record-nav]',
      intent:
        'The contract\'s phases in order (Setup, Review and Approve, Report and Invoice, Closeout), each with its date range, a meter for how far its period has run, and a status icon. Each phase opens a menu of its pages; a phase with one page links straight to it.',
      decisions: [
        'The phase holding the current page is a filled brand-navy block with white text, icon and meter (approved: "I like the use of blue").',
        'States: done (green check, gray meter), current (half circle, brand meter at percent elapsed), next (dashed circle, empty meter).',
        'A change request on an issued contract sends the track back: Review and Approve is current again and Report and Invoice returns to upcoming until the revision is approved.',
        'Pages a role cannot see are hidden (data-hide-for); a phase with no pages for the role shows its name as plain text with its status icon (contractors and Closeout).',
        'One menu open at a time; menus close on outside click, focus leaving and Esc, and stay inside the viewport.',
        'Four columns; two under 64rem, one under 30rem.',
      ],
      gotchas: [
        'Every lens state is server-rendered; the role, stage and arrival lenses only toggle attributes on <html> and the CSS in cbf-role-gate hides what they rule out. Switching to a lens that cannot see the current page redirects to Contract Summary.',
        'Phase dates and percentages are mock, chosen so today (2026-11-10) falls in the current phase. The real date fields are still to be confirmed.',
      ],
      acceptance: [
        'You can tell which phase you are in, and which page within it, without opening a menu.',
        'Every contract page is reachable in two clicks or fewer from any other.',
      ],
      js: [
        'src/components/contract-nav/cbf-record-lifecycle.astro',
        'src/components/contract-nav/cbf-lifecycle-track.astro',
        'src/components/contract-nav/cbf-role-gate.astro',
        'src/data/contract-nav.mjs',
      ],
    },
    {
      label: 'Page title',
      selector: '.cbf-record-page-title',
      intent:
        'The page being viewed: its phase or menu on a quiet line ("Setup"), directly over the page name as an H2 in brand navy ("Work Element Budgets").',
      decisions: [
        'No slash, no page count. Tight line height with a 2px gap so the two lines read as one unit.',
        'Phase line body-sm medium in secondary text; page name in the title composite at semibold.',
        'Where page and phase share a name (Closeout), the name shows once.',
      ],
      js: ['src/components/contract-nav/cbf-record-page-title.astro'],
    },
  ],
};
