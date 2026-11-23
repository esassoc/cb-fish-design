// Handoff spec for /soy/walkthrough (registry slug soy): the entry point of the
// start-of-year (SOY) future-state prototype — eight screens under /soy built
// for client sign-off before any change to CBFish (Gemini). Consumed only by
// the hub handoff CLI at build time.
//
// Every SOY screen is client-rendered from a localStorage-backed store seeded
// from src/data/soy/seed.ts, so capture (fresh storage) sees step 1 of the
// walkthrough: the FY2028 cycle as an automatic Draft on Jan 15, 2027.

/** @type {{ data: object, sections: import('./search.mjs').HandoffSection[] }} */
export default {
  data: {
    fixture: 'src/data/soy/seed.ts',
    store: 'src/lib/soy/store.ts',
    fields: {
      item: 'project number + fund + account type (Expense) within one fiscal year’s SOY — the Gemini identity',
      amounts: 'whole dollars, recorded per stage (ewb, pm, final), each with who, when and a rationale',
      transfers: 'per item, tied to a Budget Decision (one per round); variance = final − transferred',
      today: 'the demo date moves with the walkthrough (Jan 15 → Jun 15, 2027)',
    },
    enums: {
      stage: ['EWB proposed', 'PM proposed', 'Final budget', 'Complete'],
      cycleStatus: ['Draft', 'Open', 'Closed'],
      transferStatus: ['No final amount', 'Not transferred', 'Transferred', 'Changed after transfer', 'Partially transferred'],
      role: ['Budget administrator (EWB)', 'Project manager'],
    },
    notes: [
      'Screens: /soy (overview), /soy/cycles, /soy/setup, /soy/items (+ item side panel on every screen), /soy/finals, /soy/transfers, /soy/close-out, /soy/activity.',
      'State changes are plain functions in src/lib/soy/actions.ts; the store wraps each in persist + notify (event cbf-soy:change). Bulk actions return a report of written and skipped items.',
      'Walkthrough presets (?step=1…7, plus 4.5 for the PM landing) compose the same actions; src/lib/soy/soy.test.ts pins their numbers (npm test).',
      'Every behavior change is tagged UI / BE / DEC in src/lib/soy/changes.ts and annotated in place by the “Show what’s changing” layer (cbf-soy-changes).',
      'All people and comment text are invented; project numbers and titles are illustrative.',
    ],
  },
  sections: [
    {
      label: 'How to use it',
      selector: '.cbf-soy-wt > section:first-child',
      intent: 'Orients a client reviewer: what the prototype is, that it changes nothing in CBFish, and the four prototype devices — step links, the role lens, the “Show what’s changing” layer and reset/jump.',
      decisions: ['Prototype devices live in cbf-prototype-strip on every SOY screen so they never read as product.'],
      acceptance: ['Every device named here exists in the prototype strip on /soy.'],
    },
    {
      label: 'Step cards',
      selector: '[aria-labelledby="wt-story"]',
      intent: 'The FY2028 cycle as seven steps, each linking to the screen and loading the demo state for that moment (?step=N&role=…), so a reviewer can start anywhere.',
      decisions: [
        'Presets are built by running the same actions a presenter would click, so jumping and clicking always agree.',
        'Step 4 has a second link (?step=4.5&role=pm) to the PM’s landing just after PM proposed opens.',
      ],
      acceptance: [
        'Step 2 → setup carries 230 of 237 items (7 unchecked with reasons) and adds 4 new projects.',
        'Step 5 → the overview shows 4 PMs with 12 items outstanding and the automatic reminder sent.',
        'Step 7 → the close-out checklist is all green with two transfer rounds.',
      ],
      js: ['src/lib/soy/actions.ts', 'src/lib/soy/store.ts'],
    },
    {
      label: 'Decisions table',
      selector: '[aria-labelledby="wt-dec"]',
      intent: 'The eight decisions BPA needs to make, with the option the prototype shows and the alternative, each linked to where it can be seen.',
      decisions: ['Built at build time from DECISIONS in src/lib/soy/changes.ts, the same registry the changes layer reads.'],
      acceptance: ['8 rows, DEC 1–8, each linking to a SOY screen.'],
    },
    {
      label: 'Problem map',
      selector: '[aria-labelledby="wt-prob"]',
      intent: 'Each of today’s ten problems (P1–P10) with the screens and changes that answer it, plus counts of UI, BE and DEC changes so engineering can see the weight.',
      acceptance: ['Every problem P1–P10 lists at least one change.'],
    },
  ],
};
