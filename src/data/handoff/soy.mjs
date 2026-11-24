// Handoff spec for /soy (registry slug soy): the cycle overview, home of the
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
      transfers: 'per project, tied to a Budget Decision (one per round); variance = final − transferred',
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
      'State changes are plain functions in src/lib/soy/actions.ts; the store wraps each in persist + notify (event cbf-soy:change). Bulk actions return a report of written and skipped projects.',
      'Demo presets (?step=1…7, plus 4.5 for the PM landing; linked from the separate walkthrough guide, not from the prototype) compose the same actions; src/lib/soy/soy.test.ts pins their numbers (npm test).',
      'Every behavior change is tagged UI / BE / DEC in src/lib/soy/changes.ts and annotated in place by the “Show what’s changing” layer (cbf-soy-changes).',
      'All people and comment text are invented; project numbers and titles are illustrative.',
    ],
  },
  sections: [
    {
      label: 'Draft notice',
      selector: '[data-ov-draft]',
      intent: 'On Jan 15 the next cycle drafts itself with the standard dates; the overview says so and points the budget administrator to setup. PMs see when their input opens.',
      decisions: ['DEC 6: auto-draft each year on January 15; the admin reviews and opens it.'],
      acceptance: ['With fresh storage the overview shows FY2028 as Draft with a Start setup link (admin).'],
    },
    {
      label: 'Stage tracker',
      selector: '[data-ov-tracker]',
      intent: 'The four stages with open and due dates, the active stage and days left. A stage is due the day before the next one opens. "Open <next stage>" (admin) previews the stage-open email before it advances; stages never advance on their own.',
      decisions: [
        'DEC 5: due dates drive stage-open emails and automatic reminders; the admin still advances stages; PM proposed defaults to 4 weeks.',
        'Final budget → Complete has no advance button here; the cycle completes through Close-out.',
      ],
      acceptance: ['Default dates: EWB proposed opens Mar 1, PM proposed Apr 12 (due May 9), Final budget May 10, Complete Jun 1.'],
      js: ['src/lib/soy/model.ts'],
    },
    {
      label: 'Progress tiles',
      selector: '[data-ov-admin] .cbf-soy-ov__tiles',
      intent: 'Projects in cycle, EWB proposed, PM input received vs needed, final amount set, transferred and variance (final − transferred), always current. PMs see their own tiles instead.',
      gotchas: ['PM input needed excludes two-year projects in their off year (their $0 is automatic).'],
      acceptance: ['At ?step=5 (May 7): 219 of 231 PM inputs received, 4 PMs with 12 projects outstanding.'],
    },
    {
      label: 'Next actions',
      selector: '[data-ov-actions]',
      intent: 'What the budget administrator should do next for the current stage, each with the button that does it: run setup, set EWB proposed, open the next stage, send a reminder, set finals, transfer, reconcile, close.',
      acceptance: ['Every action links to the screen or opens the dialog that completes it.'],
    },
  ],
};
