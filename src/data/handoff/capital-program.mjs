// Handoff spec for /capital-program (registry slug capital-program): the
// Portfolio screen of the Capital program module — the home of six screens
// built from docs/capital-program-prd.md. Consumed only by the hub handoff CLI
// at build time.
//
// Everything on the page is client-rendered from a localStorage-backed store
// seeded from src/data/capital-program/seed.ts, so capture (fresh storage) sees
// the seed: FY27, Asset Plan Expected, Current, Program manager.

/** @type {{ data: object, sections: import('./search.mjs').HandoffSection[] }} */
export default {
  data: {
    fixture: 'src/data/capital-program/seed.ts',
    store: 'src/lib/capital/store.ts',
    fields: {
      amounts: '$000s everywhere except the actuals CSV, which is whole dollars and is divided by 1,000 on import',
      plans: 'per project, per line type: 28 quarter slots, slot 0 = FY24 Q1 … slot 27 = FY30 Q4',
      actuals: 'per project, per FY: 12 months, Oct first',
      dataAsOf: 'a quarter whose last day is on or before this date is closed and shows actuals',
    },
    enums: {
      recordType: ['Request', 'Placeholder', 'Active', 'Complete', 'Cancelled', 'Deferred'],
      envelopeSource: ['apExpected (default)', 'apOptimal (Expected ÷ 0.8 unless entered)', 'ipr (information only)'],
      gateStatus: ['Not started', 'In progress', 'Green', 'Red', 'Not applicable'],
    },
    notes: [
      'All money math lives in src/lib/capital/finance.ts and is unit-tested (npm test) against the PRD\'s "tests that must pass".',
      'State changes are pure functions in src/lib/capital/actions.ts; the store wraps each in persist + notify (event cbf-cap:change).',
    ],
  },
  sections: [
    {
      label: 'Header bar',
      selector: '[data-cap-toolbar]',
      intent:
        'The lens every capital program screen reads: Current FY, envelope source (Asset Plan Expected, Asset Plan Optimal, or IPR as information only) and snapshot (Current or any frozen snapshot), plus the data-as-of and rate-period line. Selecting a past snapshot shows a read-only banner and disables every edit on every screen.',
      decisions: [
        'Asset Plan Expected (SOY) is the default envelope because the agency budgets capital to the Asset Plan, not the IPR (Oct 5 meeting).',
        'The lens lives in the store, not the URL, so it carries across the six screens.',
        'Snapshots are read-only views of frozen data, never editable copies.',
      ],
      acceptance: [
        'Changing Current FY shifts every FY column and the headroom panel.',
        'Choosing a snapshot shows "Viewing snapshot … (as of …)" and hides edit actions; "Back to current" restores them.',
      ],
      js: ['src/lib/capital/store.ts'],
    },
    {
      label: 'Headroom panel',
      selector: '[data-cap-headroom]',
      intent:
        'Answers "can we say yes?" for the selected FY: one tile per category plus total, each showing envelope, Active forecast, Placeholder forecast, open requests and headroom = envelope − (Active + Placeholder), with the Optimal ceiling and room to it. The Passage tile shows the placeholder being drawn down by named projects and the competing asks. A "What if we say yes?" checklist counts chosen requests against headroom; a "freed this year" line lists current-FY reductions since the last snapshot.',
      decisions: [
        'Open requests are shown beside headroom, never subtracted from it unless ticked in what-if.',
        'Optimal = Expected ÷ 0.8 unless an Optimal figure is entered ("Finance can approve up to Optimal").',
        'Requests with category TBD count in the total tile only.',
        'Clicking a tile filters the grid below to that category (event cbf-cap:filter-category).',
      ],
      gotchas: [
        'Headroom can be negative; show it in parentheses and red with "Short by n".',
        'FY29+ has no envelope in the seed — tiles read "No envelope", not zero.',
      ],
      acceptance: [
        'FY27 vs Asset Plan Expected: headroom 0 against 48,415; 12,104 room to the 60,519 Optimal ceiling; open requests 30,900.',
        'FY27 vs IPR: 18,573, tagged information only.',
        'Ticking every FY27 request: total headroom (30,900).',
      ],
      js: ['src/lib/capital/finance.ts'],
    },
    {
      label: 'Portfolio grid',
      selector: '[data-cap-grid]',
      intent:
        'The capital budget spreadsheet with more columns: every project grouped Hatchery Expand, Hatchery Sustain, Land, Passage with a subtotal per group and a pinned grand total. Columns follow the Current FY (prior FY actuals, current FY forecast and YTD actuals, FY+1 to FY+3), plus record type, stage, OMB and NPCC status, design status, modified budget, remaining and last note; account type, in current Asset Plan and a pathway-dot strip are optional columns.',
      decisions: [
        'No esa data-grid lego exists, so the table is AG Grid Community on the shared token theme; filters are esa-chip-group, esa-select and esa-switch-toggle; the column picker is esa-popover + esa-checkbox-group.',
        'Sorting happens within groups: postSortRows keeps each group header, its rows and its subtotal together.',
        'Placeholders read muted with a dashed left edge, and one switch drops them from the totals.',
        'A red "OMB not approved" pill marks construction-contract spend in an open quarter without appropriations language (R7); "Flagged only" lists them.',
        'Filters live in sessionStorage so the browser back button from Project detail returns to the same view.',
      ],
      gotchas: [
        'Row ids are stable across rebuilds, so the grid forces a cell refresh after each rebuild or group counts go stale.',
        'Negative values display in parentheses, matching the source reports.',
      ],
      acceptance: [
        'FY27 grand total 48,415 (16,183 / 21,495 / 10,737 by category); FY28 total 63,846.',
        'Flagged only shows Chief Joseph Hatchery water temperature and Sherman Creek Intake.',
        'Clicking a row opens /capital-program/project?id=<id>.',
      ],
    },
  ],
};
