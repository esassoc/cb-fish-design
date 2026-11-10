// contract-nav — the contract header nav prototype (brief: cbfish-nav-header).
//
// The 27 contract pages, each under the tab agreed on 2026-11-10, with who can see it.
// Labels are sentence-cased per docs/copy-style.md; `prod` keeps today's menu label so
// the January build can map one onto the other (ContractFilletMenu.cs).
//
// Visibility follows every-link-and-tab.md, reduced to three roles:
//   admin       System admin (Gloria Scott) — sees all 27.
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

// Mock record. The real CR-387553 is not yet issued (no Closeout today); it is shown
// issued here so every phase and all 27 pages exist. Lifecycle dates are mock.
export const contract = {
  number: 'CR-387553',
  project: '2027-004-00',
  title: 'Upper Grande Ronde instream habitat restoration FY2027',
  contractor: 'Grande Ronde Model Watershed',
  status: 'Issued',
};

const BACK_OFFICE = ['cor', 'contractor'];

/** @type {{ key: string, label: string, pages: { slug: string, label: string, prod: string, hideFor?: RoleKey[] }[] }[]} */
export const CONTRACT_TABS = [
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
      { slug: 'bpa-internal-work', label: 'Edit / delete BPA internal work', prod: 'Edit / Delete BPA Internal Work', hideFor: BACK_OFFICE },
      { slug: 'back-to-portfolio', label: 'Back to portfolio', prod: 'Back To Portfolio' },
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
      { slug: 'review-sow', label: 'Review SOW', prod: 'Review SOW' },
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
    pages: [{ slug: 'closeout', label: 'Closeout', prod: 'Closeout', hideFor: ['contractor'] }],
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

/** Roles that see no page in a tab — the tab itself is hidden for them. */
export function tabHiddenFor(tab) {
  return NAV_ROLES.map((r) => r.key).filter((role) =>
    tab.pages.every((p) => (p.hideFor ?? []).includes(role)),
  );
}

export const ALL_PAGES = CONTRACT_TABS.flatMap((tab) =>
  tab.pages.map((page) => ({ ...page, tab: tab.key })),
);

export function findPage(slug) {
  return ALL_PAGES.find((p) => p.slug === slug);
}

// Direction B: the phases a contract moves through. Overview and Files sit outside the
// track (always there). Dates are mock. `state`: done | current | next.
export const LIFECYCLE = [
  { tab: 'setup', state: 'done', when: 'Jun 2 – Aug 14, 2026' },
  { tab: 'review', state: 'done', when: 'Approved Sep 22, 2026', revision: 'Revision 2' },
  {
    tab: 'report',
    state: 'current',
    when: 'Oct 1, 2026 – Sep 30, 2027',
    // Contract period elapsed as of 2026-11-10 (41 of 365 days).
    progress: 11,
  },
  { tab: 'closeout', state: 'next', when: 'After Sep 30, 2027' },
];

export const DIRECTIONS = [
  { key: 'a', label: 'A. Menus' },
  { key: 'b', label: 'B. Lifecycle' },
];
