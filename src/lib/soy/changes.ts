// The "Show what's changing" registry — the client-facing layer of the SOY
// prototype. Every changed element on a screen carries data-change="<id>"; when
// the toggle is on, cbf-soy-changes outlines it, numbers it, and lists the note
// below: what it was before, what it does now, which problem it solves (P1–P10)
// and its weight tag (UI = front end only, BE = needs backend or data work,
// DEC = shows the recommended answer to a client decision).
//
// Plain data with no DOM, so the walkthrough page can render the problem and
// decision tables from the same source at build time.

export type ChangeTag = 'UI' | 'BE' | 'DEC';

export interface Change {
  title: string;
  before: string;
  now: string;
  problems: ProblemKey[];
  tags: ChangeTag[];
  /** The client decision (DEC 1–8) this shows the recommended answer to. */
  dec?: number;
}

export type ProblemKey = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9' | 'P10';

export const PROBLEMS: Record<ProblemKey, string> = {
  P1: 'The cycle is assembled by hand every year',
  P2: 'Due dates do nothing',
  P3: 'Bulk add is blind and slow',
  P4: 'COLA is hard to target and reports poorly',
  P5: '"Bulk set Final Budget amounts" can write to the wrong stage',
  P6: 'Final budgets and transfers drift apart',
  P7: 'Cycles never close',
  P8: "Screens don't fit the work",
  P9: 'Two-year budgets are handled in comments',
  P10: 'The admin process is undocumented',
};

export interface Decision {
  n: number;
  question: string;
  recommendation: string;
  alternative: string;
  /** Where the prototype shows it. */
  where: { label: string; href: string };
}

export const DECISIONS: Decision[] = [
  { n: 1, question: 'Close FY2024–2027?', recommendation: 'Yes, after reconciling the FY2027 variances', alternative: 'Leave them open and hide them from the overview', where: { label: 'Close-out', href: '/soy/close-out' } },
  { n: 2, question: 'Should Complete lock admins?', recommendation: 'Yes, with a logged Reopen that requires a reason', alternative: "Lock PMs only (today's behavior)", where: { label: 'Close-out', href: '/soy/close-out' } },
  { n: 3, question: 'Changes to final amounts after a transfer', recommendation: 'Allow with a warning and a required reason; show the variance', alternative: 'Block until the transfer is deleted', where: { label: 'Transfers', href: '/soy/transfers' } },
  { n: 4, question: 'Bulk carry-forward exclusions', recommendation: 'Uncheck by default: ended projects and items no longer non-Accord expense; the admin can re-check', alternative: 'Carry everything forward (today)', where: { label: 'Setup, step 2', href: '/soy/setup' } },
  { n: 5, question: 'Due dates and the PM window', recommendation: 'Automatic stage-open emails and reminders; the admin still advances stages; PM proposed defaults to 4 weeks', alternative: 'Auto-advance stages on the due date', where: { label: 'Overview', href: '/soy' } },
  { n: 6, question: 'Cycle creation', recommendation: 'Auto-draft each year on January 15; the admin reviews and opens it', alternative: 'Draft when the prior cycle closes', where: { label: 'All cycles', href: '/soy/cycles' } },
  { n: 7, question: 'Two-year budgets', recommendation: 'Flag two-year items; suggest the on-year amount (annual × 2, plus inflation) for admin confirmation; off-year shows $0 automatically', alternative: 'Keep manual, but list affected items', where: { label: 'Setup, step 4', href: '/soy/setup' } },
  { n: 8, question: 'Budget Decision names', recommendation: 'Suggested "FY## SOY – Round N – date", editable', alternative: 'Free text (today)', where: { label: 'Transfers', href: '/soy/transfers' } },
];

export const CHANGES: Record<string, Change> = {
  // --- Shared ---------------------------------------------------------------
  'gl-nav': {
    title: 'SOY is one area with one set of tabs',
    before: 'Eight tabs mixed reports, admin screens and a live counter ("Remaining: N Projects"); admin tools sat under Maintenance and Project Assignment.',
    now: 'Tabs follow the work: Overview, Items, Setup, Final decisions, Transfers, Close-out, Activity, All cycles. PMs only see the tabs they use.',
    problems: ['P8'], tags: ['UI'],
  },
  'gl-locked': {
    title: 'A closed cycle says so on every screen',
    before: 'Even Complete did not lock admins, and nothing on screen said a cycle was finished.',
    now: 'A closed cycle shows a locked banner everywhere and every edit control is disabled, for admins too.',
    problems: ['P7'], tags: ['BE', 'DEC'], dec: 2,
  },

  // --- 4.1 Cycle overview ------------------------------------------------------
  'ov-tracker': {
    title: 'Stage tracker with due dates',
    before: 'Four due dates were shown in a header but the code never read them. Nothing said how much time was left.',
    now: 'Each stage shows when it opens and is due, the active stage, and days remaining. The dates drive emails and reminders.',
    problems: ['P2'], tags: ['UI'],
  },
  'ov-tiles': {
    title: 'Progress tiles',
    before: 'Progress meant exporting the grid or counting by hand. Final vs transferred was never compared.',
    now: 'Items, EWB proposed, PM input received vs needed, final set, transferred and variance, always current.',
    problems: ['P6', 'P8'], tags: ['UI'],
  },
  'ov-actions': {
    title: 'Next actions by role',
    before: 'The admin process lived in people’s heads (the training guide covers PMs only). PMs learned what to do at a meeting.',
    now: 'The overview says what each role should do next, with the button to do it: open a stage, send a reminder, reconcile.',
    problems: ['P8', 'P10'], tags: ['UI'],
  },
  'ov-advance': {
    title: 'Advance stage with an email preview',
    before: 'Changing the active stage only saved a field. No email went out; PMs heard about it at a meeting.',
    now: 'The admin advances the stage (it never advances itself) and previews the stage-open email PMs will receive.',
    problems: ['P2'], tags: ['BE', 'DEC'], dec: 5,
  },
  'ov-needs': {
    title: '"Needs input" replaces Remaining',
    before: '"Remaining" said "no projects" outside PM Proposed, and reminders were emailed by hand.',
    now: 'The list appears only in stages where it applies, names the stage it checks, and groups items by PM with a reminder action.',
    problems: ['P8', 'P2'], tags: ['UI'],
  },
  'ov-pm-home': {
    title: 'PMs land on their own work',
    before: '"My Projects" was empty for non-PMs and showed every stage’s columns to PMs.',
    now: 'A PM lands on how many of their projects need input, by when, with a link to exactly those items.',
    problems: ['P8'], tags: ['UI'],
  },

  // --- 4.2 All cycles -----------------------------------------------------------
  'cy-list': {
    title: 'All cycles with status and money',
    before: 'The Maintenance grid listed fiscal year, project count, active stage and four due dates.',
    now: 'Each cycle shows Draft, Open (stage) or Closed, with item count, baseline, final, transferred and variance.',
    problems: ['P7'], tags: ['UI'],
  },
  'cy-flag': {
    title: 'Open past years are flagged',
    before: 'FY2024–2027 all sit at Final Budget with nothing to say they were never finished.',
    now: 'Open past years are flagged with what blocks closing them, and link to close-out.',
    problems: ['P7'], tags: ['DEC'], dec: 1,
  },
  'cy-draft': {
    title: 'The next cycle drafts itself',
    before: 'Each year started from a blank form with four dates; recent cycles started later and later.',
    now: 'On January 15 the next cycle appears as Draft with the standard dates. The admin reviews it and runs setup.',
    problems: ['P1'], tags: ['BE', 'DEC'], dec: 6,
  },

  // --- 4.3 Setup wizard ---------------------------------------------------------
  'su-wizard': {
    title: 'One setup wizard',
    before: 'Create new SOY, Bulk add, Add Project and Bulk COLA were four separate screens and dialogs.',
    now: 'Five steps in order — dates, carry forward, new projects, COLA, review — and the wizard can be re-entered to add projects later.',
    problems: ['P1'], tags: ['UI'],
  },
  'su-dates': {
    title: 'Dates are pre-filled',
    before: 'A blank form with four due dates.',
    now: 'The standard pattern is pre-filled (EWB early March, PM early April for 4 weeks, Final early May, Complete June 1) and every date is editable.',
    problems: ['P1', 'P2'], tags: ['UI'],
  },
  'su-carry': {
    title: 'Carry forward with a preview',
    before: 'One confirm copied every prior-year item — ended projects included — with no preview.',
    now: 'Last year’s items are listed with checkboxes. Ended or no-longer-eligible items start unchecked with the reason; counts update live.',
    problems: ['P3'], tags: ['BE', 'DEC'], dec: 4,
  },
  'su-new': {
    title: 'Add new projects from a list',
    before: 'Add Project was one item at a time: pick a project, a fund and an account type.',
    now: 'Eligible projects that were not in last year’s cycle are listed; select several and add them at once.',
    problems: ['P3'], tags: ['BE'],
  },
  'su-cola': {
    title: 'COLA with filters and a before/after preview',
    before: 'A 237-entry multiselect with no preview. COLA rewrote project baselines directly.',
    now: 'Pick projects with table filters (fund, emphasis, PM), enter the rate, and see each baseline before and after, with the total.',
    problems: ['P4'], tags: ['UI'],
  },
  'su-cola-skips': {
    title: 'Skipped projects are named',
    before: 'Two-year projects were skipped and reported only as a count; projects with no baseline were dropped silently.',
    now: 'Two-year projects in their off year and projects with no baseline are listed by name.',
    problems: ['P4'], tags: ['UI', 'BE'],
  },
  'su-two-year': {
    title: 'Two-year amounts are suggested',
    before: 'EWB doubled and inflated two-year budgets by hand ("doubled and then inflated at 2.21%") and entered $0 in off years.',
    now: 'Two-year items are flagged. The on-year amount is suggested (annual × 2, plus inflation) for the admin to confirm; the off year is $0 automatically.',
    problems: ['P9'], tags: ['BE', 'DEC'], dec: 7,
  },
  'su-run': {
    title: 'Progress and a results report',
    before: 'Bulk add ran with no progress, then re-saved every item one at a time.',
    now: 'The run shows progress, saves only the new items, and ends with a report that names what was excluded or skipped.',
    problems: ['P3'], tags: ['BE'],
  },

  // --- 4.4 Items workspace ----------------------------------------------------
  'it-views': {
    title: 'Saved views',
    before: 'My Projects, All Projects and Remaining were separate tabs; My Projects was empty for non-PMs.',
    now: 'One table with saved views: My projects, Needs my input, All items, Changed vs EWB, Variance, Two-year. Non-PMs start on All items.',
    problems: ['P8'], tags: ['UI'],
  },
  'it-columns': {
    title: 'The columns the work needs',
    before: 'Optional columns hid behind a Customize dialog; transferred amounts were on another tab.',
    now: 'Prior-year working and baseline, EWB proposed, PM proposed, difference, final, transferred and flags, with CSV export kept.',
    problems: ['P8', 'P6'], tags: ['UI'],
  },
  'it-bulk-ewb': {
    title: 'Bulk set names the stage',
    before: '"Bulk set" wrote to whatever stage was active; the label only echoed the stage name.',
    now: 'Select items, preview before and after, and confirm a message that names the stage and the count.',
    problems: ['P5'], tags: ['UI'],
  },
  'it-panel': {
    title: 'Item side panel',
    before: 'Details opened a magnifier panel; history rendered at the bottom of the page; amounts went through a separate $ dialog.',
    now: 'One panel: amounts across stages, EWB’s rationale above the PM’s input, the comment thread, a follow-up flag and a notification toggle.',
    problems: ['P8'], tags: ['UI'],
  },
  'it-propose': {
    title: 'Propose with a rationale',
    before: 'A free amount box and an optional comment, with a Stage dropdown that let entries land in other stages.',
    now: 'The amount starts at EWB’s figure. A comment is required, and a rationale is required when the amount differs.',
    problems: ['P8'], tags: ['UI'],
  },
  'it-stage-named': {
    title: 'Admin entries say which stage they go to',
    before: '"You can add this comment or proposed amount to a stage other than the active stage."',
    now: 'Admins can enter amounts in any open stage, and the panel always states the stage the entry goes to.',
    problems: ['P5'], tags: ['UI'],
  },
  'it-two-year': {
    title: 'Two-year flag',
    before: 'Two-year handling lived in comments.',
    now: 'Two-year items carry a flag; on-year items show the suggested amount and off-year items show $0 automatically.',
    problems: ['P9'], tags: ['BE', 'DEC'], dec: 7,
  },
  'it-notify': {
    title: 'Per-project notifications',
    before: 'A notification triangle column toggled per item; delivery preference was on its own page.',
    now: 'The toggle sits in the item panel; delivery preference (none, immediately, daily digest) moves to user settings.',
    problems: ['P8'], tags: ['UI'],
  },

  // --- 4.5 Final decisions ------------------------------------------------------
  'fi-source': {
    title: 'Choose where finals come from',
    before: '"Bulk set Final Budget amounts" copied the baseline into whatever stage was active.',
    now: 'Select items and choose the source: baseline, EWB proposed or PM proposed.',
    problems: ['P5'], tags: ['UI', 'BE'],
  },
  'fi-preview': {
    title: 'Preview before and after',
    before: 'No preview.',
    now: 'Each item’s current and new final amount, the change, and the total — before anything is written.',
    problems: ['P5'], tags: ['UI'],
  },
  'fi-confirm': {
    title: 'The confirm names the target',
    before: 'The confirm repeated whatever stage happened to be active.',
    now: '“Set Final budget for 204 items” — the stage and the count, every time. A rationale applies to all, or per item.',
    problems: ['P5'], tags: ['UI'],
  },
  'fi-notify': {
    title: 'Notify PMs of final amounts',
    before: 'PMs found out about final amounts by looking, or by email from EWB.',
    now: 'Optionally send each PM a summary of their final amounts and rationale.',
    problems: ['P2'], tags: ['UI', 'BE'],
  },

  // --- 4.6 Transfers ------------------------------------------------------------
  'tr-status': {
    title: 'Transfer status and variance',
    before: 'Final and transferred drifted apart unseen: FY2027 final $311.3M vs transferred $307.6M, 9 items differing, 2 never transferred.',
    now: 'Every item shows Not transferred, Transferred, Changed after transfer or Partially transferred, with its variance and a filter.',
    problems: ['P6'], tags: ['UI'],
  },
  'tr-decision': {
    title: 'Suggested Budget Decision names',
    before: 'Free-text labels ("R2", "R3", "July SOY Upload").',
    now: 'A suggested name — "FY28 SOY – Round 1 – 2027-06-01" — that the admin can edit, plus description, rationale and BPA comments.',
    problems: ['P6'], tags: ['UI', 'DEC'], dec: 8,
  },
  'tr-review': {
    title: 'Review totals before transferring',
    before: 'Bulk transfer went straight through.',
    now: 'The dialog shows the item count and the total to transfer before you confirm.',
    problems: ['P6'], tags: ['UI'],
  },
  'tr-after': {
    title: 'Changing a final after a transfer',
    before: 'Admins could edit amounts after a transfer, silently.',
    now: 'A warning appears and a reason is required. The item shows "Changed after transfer" until another round reconciles it.',
    problems: ['P6'], tags: ['BE', 'DEC'], dec: 3,
  },

  // --- 4.7 Close-out ------------------------------------------------------------
  'co-checklist': {
    title: 'Close-out checklist',
    before: 'There was no definition of done; cycles stayed at Final Budget for years.',
    now: 'Every item has a final (or $0), every final is transferred, and the variance is zero or explained.',
    problems: ['P7'], tags: ['UI'],
  },
  'co-lock': {
    title: 'Close locks everyone',
    before: 'Complete locked PMs only; admins could still change anything.',
    now: 'Closing the cycle locks it for everyone, admins included.',
    problems: ['P7'], tags: ['BE', 'DEC'], dec: 2,
  },
  'co-reopen': {
    title: 'Reopen needs a reason',
    before: 'Not applicable — cycles never closed.',
    now: 'Reopen requires a reason and is logged with who and when.',
    problems: ['P7'], tags: ['BE', 'DEC'], dec: 2,
  },
  'co-past': {
    title: 'Past open cycles show what blocks them',
    before: 'FY2024–2027 sit open with no explanation.',
    now: 'Each open past year lists what is blocking closure, so it can be reconciled and closed.',
    problems: ['P7'], tags: ['DEC'], dec: 1,
  },

  // --- 4.8 Activity and notifications -----------------------------------------
  'ac-feed': {
    title: 'Activity feed with filter chips',
    before: 'The Activity Log had four dropdowns and a Filter button over a long history list.',
    now: 'Filter by stage, kind and person with chips; every entry links into the item panel.',
    problems: ['P8'], tags: ['UI'],
  },
  'ac-prefs': {
    title: 'Notification preferences in user settings',
    before: 'A separate Notifications page inside SOY.',
    now: 'None, immediately or daily digest — set once in user settings; per-project toggles stay on each item.',
    problems: ['P8'], tags: ['UI'],
  },
  'ac-reminders': {
    title: 'Automatic reminders',
    before: 'Reminders were written and sent by hand.',
    now: 'Reminders go out N days before each due date, only to PMs with missing input. Admins can preview them and turn them off.',
    problems: ['P2'], tags: ['BE', 'DEC'], dec: 5,
  },
};
