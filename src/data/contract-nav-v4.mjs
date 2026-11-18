// Contract header nav, round 6 ("Phases"): the team's round 2, built from round 5's
// "Areas" (option C) after the 2026-11-12 review with Gloria, Dan and Rex (criteria:
// docs/private/briefs/cbfish-nav-header/criteria-round6.md; phases: brief section 10,
// from Mauricio's CAW Discovery Broadsheet).
//
// What differs from round 5 (contract-nav-v2.mjs, v3):
//   - "Report and Invoice" is "Implementation" (Dan: "doing the work needs to be called
//     out more"). Same pages.
//   - Three phases, Setup, Implementation, Closeout (Gloria), each with a date range
//     worked back from the contract's start and end: Setup runs the 150 days before
//     the start (Gloria: setup "was supposed to have been done 150 days before this
//     date"), Closeout the 90 days after the end. Mock rule, to confirm with Gloria.
//   - Approval stays visible inside Setup (Andy: a contractor needs to know "if it's
//     been approved or not").
//   - The status is always shown, including "Issued, CCR pending" and "Issued, past
//     end date" (Gloria), so the stage lens gains "Past end date".
//   - A find-page search beside Files, and a steps drawer from the phase line.
import { CONTRACT_ACTIONS, CONTRACT_TABS_V3, REVISIONS, UNLISTED_PAGES_V2, VARIANTS as VARIANTS_V2 } from './contract-nav-v2.mjs';

/** Stage lens values; 'late' is new in round 6. */
export const STAGE_KEYS_V4 = ['setup', 'review', 'issued', 'change', 'late', 'closed'];

// An issued contract past its end date still has every page an issued one has.
const withLate = (stages) => (stages?.includes('issued') ? [...stages, 'late'] : stages);
const v4Page = (p) => ({ ...p, ...(p.hideStages ? { hideStages: withLate(p.hideStages) } : {}) });

// The SOW menu's "Setup" group (Pre-Award alone) collided with the Setup phase, which
// also covers review; Pre-Award joins the ungrouped SOW pages.
export const CONTRACT_TABS_V4 = CONTRACT_TABS_V3.map((t) => ({
  ...t,
  label: t.key === 'report' ? 'Implementation' : t.label,
  pages: t.pages.map((p) => v4Page(p.group === 'Setup' ? (({ group, ...rest }) => rest)(p) : p)),
}));

export const ALL_PAGES_V4 = [
  ...CONTRACT_TABS_V4.flatMap((t) => t.pages.map((p) => ({ ...p, tab: t.key }))),
  ...UNLISTED_PAGES_V2.map((p) => ({ ...v4Page(p), hideStages: [...(p.hideStages ?? []), 'late'] })),
];

export const VARIANTS = {
  ...VARIANTS_V2,
  v4: {
    tabs: CONTRACT_TABS_V4,
    pages: ALL_PAGES_V4,
    ends: CONTRACT_TABS_V4.map((t) => t.key),
    header: 'phases',
    view: 'phases',
  },
};

/**
 * The stage lens for round 6. Each stage: the status badge beside the title, and per
 * phase [state, date range, note, past due]. Dates are mock, from two rules to confirm
 * with Gloria: Setup is due 150 days before the contract starts (Gloria, 2026-11-12:
 * setup "was supposed to have been done 150 days before" the start), so its range
 * ends on that due date; Closeout is due 90 days after the end. "Today" is 2026-11-17.
 *   Draft and In review: the real CR-387553 dates, Feb 1, 2027 to Jan 31, 2028, so
 *     Setup was due Sep 4, 2026 and is past due, as the real contract is.
 *   Issued and CCR pending: Oct 1, 2026 to Sep 30, 2027.
 *   Past end date and Closed: Oct 1, 2025 to Sep 30, 2026.
 * A note is [text, badge variant, page slug it links to].
 */
export const STAGES_V4 = [
  {
    key: 'setup',
    label: 'Draft',
    status: 'Draft',
    variant: 'neutral',
    phases: {
      setup: ['current', 'Jun 6 – Sep 4, 2026', null, true],
      implementation: ['next', 'Feb 1, 2027 – Jan 31, 2028'],
      closeout: ['next', 'Feb 1 – Apr 30, 2028'],
    },
  },
  {
    key: 'review',
    label: 'In review',
    status: 'Pending',
    variant: 'info',
    phases: {
      setup: ['current', 'Jun 6 – Sep 4, 2026', ['SOW in review', 'info', 'review-sow'], true],
      implementation: ['next', 'Feb 1, 2027 – Jan 31, 2028'],
      closeout: ['next', 'Feb 1 – Apr 30, 2028'],
    },
  },
  {
    key: 'issued',
    label: 'Issued',
    status: 'Issued',
    variant: 'success',
    phases: {
      setup: ['done', 'Feb 3 – May 4, 2026', ['Approved', 'success']],
      implementation: ['current', 'Oct 1, 2026 – Sep 30, 2027'],
      closeout: ['next', 'Oct 1 – Dec 29, 2027'],
    },
  },
  {
    // A change request reruns setup (broadsheet step 9) while the work, status reports
    // and invoices carry on, so both phases are in progress; Setup shows the change
    // request's own dates while it is reopened.
    key: 'change',
    label: 'CCR',
    status: 'Issued, CCR pending',
    variant: 'info',
    phases: {
      setup: ['current', 'Nov 2 – Dec 4, 2026', ['CCR-61204 in review', 'info', 'review-sow']],
      implementation: ['current', 'Oct 1, 2026 – Sep 30, 2027'],
      closeout: ['next', 'Oct 1 – Dec 29, 2027'],
    },
  },
  {
    key: 'late',
    label: 'Past end',
    status: 'Issued, past end date',
    variant: 'warning',
    phases: {
      setup: ['done', 'Feb 3 – May 4, 2025', ['Approved', 'success']],
      implementation: ['done', 'Oct 1, 2025 – Sep 30, 2026'],
      closeout: ['current', 'Oct 1 – Dec 29, 2026'],
    },
  },
  {
    key: 'closed',
    label: 'Closed',
    status: 'Closed',
    variant: 'neutral',
    phases: {
      setup: ['done', 'Feb 3 – May 4, 2025', ['Approved', 'success']],
      implementation: ['done', 'Oct 1, 2025 – Sep 30, 2026'],
      closeout: ['done', 'Oct 1 – Oct 30, 2026'],
    },
  },
];
export const DEFAULT_STAGE_V4 = 'issued';

export const PHASES_V4 = [
  { key: 'setup', label: 'Setup' },
  { key: 'implementation', label: 'Implementation' },
  { key: 'closeout', label: 'Closeout' },
];

/**
 * The steps drawer (Andy's permit-portal idea, tool-ideas row 115): every step on this
 * contract's path, from the broadsheet's steps 0 to 9, cut to the ones a CB Fish user
 * acts on. `page` links a step to the page where it happens; `who` is the role that
 * does it. `state` per stage: done, current, else not started. The CCR step shows
 * only while one is open.
 */
export const STEPS_V4 = [
  { phase: 'setup', key: 'create', label: 'Contract created in Asset Suite', who: 'COR' },
  { phase: 'setup', key: 'initialize', label: 'Initialize SOW', who: 'COR', page: 'initialize-sow', pageWhen: ['setup'] },
  { phase: 'setup', key: 'draft', label: 'Draft SOW, work elements and budget', who: 'Contract manager', page: 'sow' },
  { phase: 'setup', key: 'pre-award', label: 'Pre-award', who: 'COR', page: 'pre-award' },
  { phase: 'setup', key: 'review', label: 'Review SOW', who: 'COR, EC lead', page: 'review-sow' },
  { phase: 'setup', key: 'approve', label: 'Approvals and transmittal memo', who: 'COR, F&W approver', page: 'workflow' },
  { phase: 'setup', key: 'issue', label: 'Contract issued', who: 'Contracting officer' },
  // A change request reopens Setup (broadsheet step 9): its own run of the same steps.
  { phase: 'setup', key: 'ccr-draft', label: 'Draft CCR-61204 changes to the SOW and budget', who: 'Contract manager', page: 'sow', onlyStages: ['change'] },
  { phase: 'setup', key: 'ccr-review', label: 'Review SOW Rev 2', who: 'COR, EC lead', page: 'review-sow', onlyStages: ['change'] },
  { phase: 'setup', key: 'ccr-approve', label: 'Approvals and CCR memo', who: 'COR, F&W approver', page: 'workflow', onlyStages: ['change'] },
  { phase: 'setup', key: 'ccr-sign', label: 'Amendment signed', who: 'Contracting officer, contractor', onlyStages: ['change'] },
  { phase: 'implementation', key: 'work', label: 'Work and work element updates', who: 'Contractor', page: 'sow' },
  { phase: 'implementation', key: 'reports', label: 'Status reports', who: 'Contract manager, COR', page: 'status-reports' },
  { phase: 'implementation', key: 'invoices', label: 'Invoices', who: 'Contractor, COR', page: 'invoices' },
  { phase: 'closeout', key: 'final', label: 'Final status report and invoice', who: 'Contract manager, COR', page: 'status-reports' },
  { phase: 'closeout', key: 'balance', label: 'Balance work element budgets', who: 'Contract manager', page: 'work-element-budgets' },
  { phase: 'closeout', key: 'form', label: 'Closeout form', who: 'COR', page: 'closeout' },
  { phase: 'closeout', key: 'close', label: 'De-obligate and close', who: 'Contracting officer' },
];

const ORDER = STEPS_V4.map((s) => s.key);
const upTo = (key) => ORDER.slice(0, ORDER.indexOf(key));
const SETUP_DONE = ['create', 'initialize', 'draft', 'pre-award', 'review', 'approve', 'issue'];
/** stage → which steps are done and which in progress. */
export const STEP_STATES_V4 = {
  setup: { done: ['create', 'initialize'], current: ['draft', 'pre-award'] },
  review: { done: ['create', 'initialize', 'draft', 'pre-award'], current: ['review'] },
  issued: { done: SETUP_DONE, current: ['work', 'reports', 'invoices'] },
  change: { done: [...SETUP_DONE, 'ccr-draft'], current: ['ccr-review', 'work', 'reports', 'invoices'] },
  late: { done: upTo('final'), current: ['final'] },
  closed: { done: ORDER, current: [] },
};

/**
 * Find page: today's names and the words people use for a page, so a search on the
 * old Go to label or a nickname still lands. Keyed by slug.
 */
export const PAGE_KEYWORDS_V4 = {
  summary: ['overview', 'home', 'contract summary'],
  'running-balance': ['balance', 'remaining'],
  'payment-authorizations-raw': ['payment authorizations', 'PA', 'payments'],
  'expenditures-by-fy': ['spending', 'fiscal year'],
  'expenditures-raw': ['spending'],
  'work-element-budgets': ['WE budgets', 'budget', 'line item budget', 'LIB'],
  'review-sow': ['approve', 'approval'],
  workflow: ['approve', 'approval', 'sign-off'],
  'transmittal-memo': ['memo'],
  'status-reports': ['progress', 'reporting'],
  invoices: ['billing', 'pay'],
  closeout: ['close', 'closeout form', 'final'],
  documents: ['attachments', 'files', 'upload'],
  'cor-file': ['COR'],
  'email-archive': ['email', 'mail'],
  'internal-notes': ['notes'],
  sow: ['statement of work', 'work elements', 'WE', 'WSE'],
  'pre-award': ['award'],
  contacts: ['people', 'contacts'],
};

/** QA screenshots of today's pages (public/contract-nav/qa/<slug>.jpg), by slug. */
export const QA_SHOTS = [
  'summary', 'contacts', 'metrics-implementation', 'metrics-environmental', 'milestones', 'location',
  'focal-species', 'environmental-compliance', 'pre-award', 'sow', 'work-element-budgets', 'review-sow',
  'workflow', 'status-reports', 'invoices', 'expenditures-by-fy', 'expenditures-raw',
  'payment-authorizations-raw', 'closeout', 'documents', 'cor-file', 'email-archive', 'internal-notes',
];
// Not captured (gray placeholder instead): Contract Running Balance Report (QA serves
// a PDF), Transmittal Memo (a button on Workflow, no page of its own), Initialize SOW
// (no link once a SOW exists). Closeout is from contract 94159; CR-387553 is pending.

/** Work element tabs captured on 94159, SOW Rev 2, WE L (Metrics is disabled on QA). */
export const QA_WSE_SHOTS = ['summary', 'milestones', 'location', 'focal-species', 'environmental-compliance', 'rme-metadata'];

/**
 * Which work element tabs apply to a work element, by its template (mock, to confirm
 * with Gloria): every element has a summary and milestones; metrics, location, focal
 * species and environmental compliance apply to on-the-ground work; RM&E metadata
 * only to data collection.
 */
const ON_THE_GROUND = [29, 30, 47, 157, 186, 198];
export function tabsThatApply(template) {
  const tabs = ['summary', 'milestones'];
  if (ON_THE_GROUND.includes(template)) tabs.push('metrics', 'location', 'focal-species', 'environmental-compliance');
  if (template === 157) tabs.push('rme-metadata');
  return tabs;
}

/** Round 5's SOW revisions and contract actions, with "Past end date" wherever Issued is. */
export const REVISIONS_V4 = REVISIONS.map((r) => ({
  ...r,
  stages: withLate(r.stages),
  unlocked: withLate(r.unlocked),
  current: withLate(r.current),
}));
export const CONTRACT_ACTIONS_V4 = CONTRACT_ACTIONS.map((a) => ({ ...a, onlyStages: withLate(a.onlyStages) }));

/** CR-387553's title on qa.cbfish.org (2026-11-17), as the page bodies show it. */
export const QA_CONTRACT_TITLE = '2027-004-00 EXP DESERT WILDLIFE, WENAS, SUNNYSIDE O&M';
