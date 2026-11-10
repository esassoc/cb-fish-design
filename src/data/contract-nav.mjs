// contract-nav — the contract header nav prototype (brief: cbfish-nav-header).
//
// The contract pages, each under the tab agreed on 2026-11-10, with who can see it.
// Round 2 (Andy, 2026-11-10): Back To Portfolio left the nav for a temporary back link
// above the header (PORTFOLIO below), and Edit / Delete BPA Internal Work shows only on
// internal-work records, so this contract's nav carries 25 of the original 27.
// Labels are sentence-cased per docs/copy-style.md; `prod` keeps today's menu label so
// the January build can map one onto the other (ContractFilletMenu.cs).
//
// Visibility follows every-link-and-tab.md, reduced to three roles:
//   admin       System admin (Gloria Scott) — sees all 25.
//   cor         BPA COR on this contract (Tori Bolin).
//   contractor  A contact at the contracting organization.
// `hideFor` lists the roles that do NOT see the page.

/** @typedef {'admin' | 'cor' | 'contractor'} RoleKey */

export const NAV_ROLES = [
  { key: 'admin', label: 'Admin', who: 'Gloria Scott, system admin', name: 'Gloria Scott' },
  { key: 'cor', label: 'COR', who: 'Tori Bolin, BPA COR on this contract', name: 'Tori Bolin' },
  { key: 'contractor', label: 'Contractor', who: 'Dana Whitlock, contractor contact', name: 'Dana Whitlock' },
];
export const NAV_ROLE_KEY = 'cbf-contract-nav-role';

// Mock record. The real CR-387553 is not yet issued (no Closeout today); the stage lens
// shows it at each stage. Lifecycle dates are mock.
export const contract = {
  number: 'CR-387553',
  project: '2027-004-00',
  title: 'Upper Grande Ronde instream habitat restoration FY2027',
  contractor: 'Grande Ronde Model Watershed',
  internalWork: false,
};

// Where "back" goes when the contract was opened from a portfolio (mock; the link
// is a stand-in to Home).
export const PORTFOLIO = { name: 'Grande Ronde subbasin habitat portfolio' };

// The stage lens. Each stage sets the status badge, which phase is current, how far
// its period has run, each phase's dates (so "today", 2026-11-10, always falls in the
// current phase: phases map to [state, percent elapsed or null, date range]), and
// which status-gated pages exist: Review SOW needs a SOW
// revision (none in Setup); Closeout exists once the contract is issued with a SOW.
/** @typedef {'setup' | 'review' | 'issued' | 'closed'} StageKey */
export const STAGES = [
  {
    key: 'setup',
    label: 'Setup',
    status: 'Draft',
    variant: 'neutral',
    // Setup period elapsed: 36 of 74 days.
    phases: {
      setup: ['current', 49, 'Oct 5 – Dec 18, 2026'],
      review: ['next', null, 'Dec 18, 2026 – Jan 29, 2027'],
      report: ['next', null, 'Feb 1, 2027 – Jan 31, 2028'],
      closeout: ['next', null, 'Feb 1 – Apr 28, 2028'],
    },
  },
  {
    key: 'review',
    label: 'In review',
    status: 'In review',
    variant: 'info',
    // Review period elapsed: 25 of 42 days.
    phases: {
      setup: ['done', null, 'Aug 3 – Oct 16, 2026'],
      review: ['current', 60, 'Oct 16 – Nov 27, 2026'],
      report: ['next', null, 'Dec 1, 2026 – Nov 30, 2027'],
      closeout: ['next', null, 'Dec 1, 2027 – Feb 29, 2028'],
    },
  },
  {
    key: 'issued',
    label: 'Issued',
    status: 'Issued',
    variant: 'success',
    // Contract period elapsed as of 2026-11-10 (41 of 365 days).
    phases: {
      setup: ['done', null, 'Jun 2 – Aug 14, 2026'],
      review: ['done', null, 'Aug 14 – Sep 22, 2026'],
      report: ['current', 11, 'Oct 1, 2026 – Sep 30, 2027'],
      closeout: ['next', null, 'Oct 1 – Dec 31, 2027'],
    },
  },
  {
    key: 'closed',
    label: 'Closed',
    status: 'Closed',
    // Quiet, like Draft: neither is active work. The label carries the difference.
    variant: 'neutral',
    phases: {
      setup: ['done', null, 'Jun 3 – Aug 15, 2025'],
      review: ['done', null, 'Aug 15 – Sep 23, 2025'],
      report: ['done', null, 'Oct 1, 2025 – Sep 30, 2026'],
      closeout: ['done', null, 'Oct 1 – Oct 30, 2026'],
    },
  },
];
export const DEFAULT_STAGE = 'issued';
export const NAV_STAGE_KEY = 'cbf-contract-nav-stage';

export const ARRIVALS = [
  { key: 'direct', label: 'Direct', who: '' },
  { key: 'portfolio', label: 'Portfolio', who: '' },
];
export const NAV_ARRIVAL_KEY = 'cbf-contract-nav-arrival';

const BACK_OFFICE = ['cor', 'contractor'];

/**
 * hideFor: roles that never see the page. hideStages: stages in which it doesn't exist.
 * internalOnly: shown only on internal-work records.
 * @type {{ key: string, label: string, pages: { slug: string, label: string, prod: string, hideFor?: RoleKey[], hideStages?: StageKey[], internalOnly?: boolean }[] }[]}
 */
const ALL_TABS = [
  {
    key: 'overview',
    label: 'Overview',
    pages: [
      { slug: 'summary', label: 'Contract summary', prod: 'Contract Summary' },
      { slug: 'contacts', label: 'Contract contacts', prod: 'Contract Contacts' },
      { slug: 'metrics-implementation', label: 'Metrics summary (implementation)', prod: 'Metrics Summary (Implementation)' },
      { slug: 'metrics-environmental', label: 'Metrics summary (environmental)', prod: 'Metrics Summary (Environmental)' },
      { slug: 'milestones', label: 'Milestones summary', prod: 'Milestones Summary' },
      { slug: 'location', label: 'Location summary', prod: 'Location Summary' },
      { slug: 'focal-species', label: 'Focal species summary', prod: 'Focal Species Summary' },
      { slug: 'environmental-compliance', label: 'Environmental compliance summary', prod: 'Environmental Compliance Summary' },
      { slug: 'bpa-internal-work', label: 'Edit / delete BPA internal work', prod: 'Edit / Delete BPA Internal Work', hideFor: BACK_OFFICE, internalOnly: true },
    ],
  },
  {
    key: 'setup',
    label: 'Setup',
    pages: [
      { slug: 'pre-award', label: 'Pre-award', prod: 'Pre-Award' },
      { slug: 'initialize-sow', label: 'Initialize SOW', prod: 'Initialize SOW', hideFor: ['contractor'] },
      { slug: 'sow', label: 'SOW', prod: 'SOW' },
      { slug: 'work-element-budgets', label: 'Work element budgets', prod: 'Work Element Budgets' },
    ],
  },
  {
    key: 'review',
    label: 'Review and approve',
    pages: [
      { slug: 'review-sow', label: 'Review SOW', prod: 'Review SOW', hideStages: ['setup'] },
      { slug: 'workflow', label: 'Workflow', prod: 'Workflow' },
    ],
  },
  {
    key: 'report',
    label: 'Report and invoice',
    pages: [
      { slug: 'status-reports', label: 'Status reports', prod: 'Status Reports' },
      { slug: 'invoices', label: 'Invoices', prod: 'Invoices' },
      { slug: 'expenditures-by-fy', label: 'Expenditures by FY', prod: 'Expenditures by FY' },
      { slug: 'expenditures-raw', label: 'Expenditures raw', prod: 'Expenditures Raw', hideFor: BACK_OFFICE },
      { slug: 'payment-authorizations-raw', label: 'Contract payment authorizations raw', prod: 'Contract Payment Authorizations Raw', hideFor: BACK_OFFICE },
      { slug: 'running-balance', label: 'Contract running balance report', prod: 'Contract Running Balance Report' },
    ],
  },
  {
    key: 'closeout',
    label: 'Closeout',
    pages: [{ slug: 'closeout', label: 'Closeout', prod: 'Closeout', hideFor: ['contractor'], hideStages: ['setup', 'review'] }],
  },
  {
    key: 'files',
    label: 'Files',
    pages: [
      { slug: 'documents', label: 'Documents', prod: 'Documents' },
      { slug: 'cor-file', label: 'COR file', prod: 'COR File', hideFor: ['contractor'] },
      { slug: 'email-archive', label: 'Email archive', prod: 'Email Archive', hideFor: ['contractor'] },
      { slug: 'internal-notes', label: 'Internal notes', prod: 'Internal Notes', hideFor: ['contractor'] },
    ],
  },
];

/** This record's tabs: internal-work pages drop out unless it is internal work. */
export const CONTRACT_TABS = ALL_TABS.map((tab) => ({
  ...tab,
  pages: tab.pages.filter((p) => !p.internalOnly || contract.internalWork),
}));

/** Roles that see no page in a tab — the tab itself is hidden for them. */
export function tabHiddenFor(tab) {
  return NAV_ROLES.map((r) => r.key).filter((role) =>
    tab.pages.every((p) => (p.hideFor ?? []).includes(role)),
  );
}

/** Stages in which a tab has no page at all. */
export function tabHiddenStages(tab) {
  return STAGES.map((s) => s.key).filter((stage) =>
    tab.pages.every((p) => (p.hideStages ?? []).includes(stage)),
  );
}

export const ALL_PAGES = CONTRACT_TABS.flatMap((tab) =>
  tab.pages.map((page) => ({ ...page, tab: tab.key })),
);

export function findPage(slug) {
  return ALL_PAGES.find((p) => p.slug === slug);
}

// Direction B: the phases a contract moves through, each a date range (mock; Closeout
// is the planned window after the period ends). The stage lens (STAGES) sets state,
// progress and dates; this is the default stage's, for the server render.
const defaultStage = STAGES.find((s) => s.key === DEFAULT_STAGE);
export const LIFECYCLE = Object.entries(defaultStage.phases).map(([tab, [state, progress, when]]) => ({
  tab,
  when,
  state,
  progress: progress ?? undefined,
}));

export const DIRECTIONS = [
  { key: 'a', label: 'A. Menus' },
  { key: 'b', label: 'B. Lifecycle' },
];
