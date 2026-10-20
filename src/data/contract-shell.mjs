// The contract page shell — one structure for every contract page.
//
// From "CBFish Contract Page: Navigation and IA Redesign" (2026-10-20). The contract
// is the object, and its eight sections are the things a contract has. ONE
// definition below feeds every rendering, so they can never disagree:
//   • the tab strip      level 1 (default)
//   • the section list   sections with the current one's pages (behind a switch)
//   • the breadcrumb     Projects › <project> › Contract <n> › <section> › <page>
//   • Go to              the full map of these pages, plus search, recents, actions
//
// THE HEADER IS A COMMUNICATION SURFACE between the two people who work a contract
// in CBFish: the BPA COR and the vendor who holds it. (The CO never signs in; COs
// work from exports.) At a glance it answers three questions:
//   where does it stand   the PHASE (pre-award → active → closeout → closed)
//   who is it assigned to derived from the open ACTIONS, never stored
//   what's next           the viewer's single most urgent action, or, when it is
//                         assigned to someone else, what they owe and when
//
// Actions are computed by the system from workflow state (v1 has no hand-made
// to-dos). Each has an OWNER: 'vendor', 'cor', or 'bpa' — BPA staff who never open
// CBFish (a CO signature, an EC Lead review). A 'bpa' action has no button for
// anyone; it exists so the header never says "nothing to do" while the contract is
// in fact stuck. The next action is GLOBAL to the contract — the same on every tab;
// tab-specific verbs belong in that tab's own toolbar.
//
// INVENTED, NOT DERIVED. The demo states, dates and task text are fictional, written
// for the prototype. Contract facts come from the existing mock modules so nothing
// is retyped.

import { contract as libContract, usd } from './lib-entry.mjs';
import {
  contract as piContract,
  contractSummary as piSummary,
  contractContacts as piContacts,
} from './lib-pi-editing.mjs';

/** The prototype's "today". Fixed, so overdue and month-of-period never drift. */
export const TODAY = '2026-10-20';

export const ROLE_LABEL = { vendor: 'Vendor', cor: 'COR' };

// ── The structure ──────────────────────────────────────────────────────────────
// Tab order roughly follows the lifecycle: scope and budget, then reporting,
// invoicing and changes. Children marked `mode` are a way of looking at their
// parent, not a separate place. `bpaOnly` children are hidden from the vendor
// entirely — not disabled. Format and audience go in the label itself.

export const TABS = [
  {
    // Key stays 'overview' (routes and #goto links use it); the IA doc names the
    // section for what it holds: the contract's workflow, where the contract opens.
    key: 'overview',
    label: 'Workflow',
    children: [
      { key: 'summary', label: 'Summary' },
      { key: 'tasks', label: 'Tasks' },
      { key: 'contacts', label: 'Contacts' },
    ],
  },
  {
    key: 'scope',
    label: 'Scope',
    children: [
      { key: 'sow', label: 'Statement of work' },
      { key: 'compare', label: 'Compare changes', mode: true },
      { key: 'locations', label: 'Locations' },
      { key: 'focal-species', label: 'Focal species' },
    ],
  },
  {
    key: 'budget',
    label: 'Budget',
    children: [
      { key: 'lib', label: 'Line item budget' },
      { key: 'we-budgets', label: 'Work element budgets' },
      { key: 'property-inventory', label: 'Property inventory' },
      { key: 'running-balance', label: 'Running balance report', format: 'PDF' },
      { key: 'expenditures', label: 'Expenditures by FY' },
    ],
  },
  {
    key: 'compliance',
    label: 'Environmental compliance',
    children: [{ key: 'environmental', label: 'Compliance summary' }],
  },
  {
    key: 'reporting',
    label: 'Reporting',
    children: [
      { key: 'status-reports', label: 'Status reports' },
      { key: 'metrics-implementation', label: 'Implementation metrics' },
      { key: 'metrics-environmental', label: 'Environmental metrics' },
      { key: 'milestones', label: 'Milestones' },
    ],
  },
  {
    key: 'invoices',
    label: 'Invoices',
    children: [{ key: 'invoices', label: 'Invoices' }],
  },
  {
    key: 'changes',
    label: 'Changes and approvals',
    children: [
      { key: 'workflow', label: 'Approval history' }, // "Workflow" names the landing view now
      { key: 'ccrs', label: 'Contract change requests' },
      { key: 'pre-award', label: 'Pre-award' },
    ],
  },
  {
    key: 'documents',
    label: 'Documents',
    children: [
      { key: 'documents', label: 'Documents' },
      { key: 'cor-file', label: 'COR file', bpaOnly: true },
      { key: 'internal-notes', label: 'Internal notes', bpaOnly: true },
      { key: 'email-archive', label: 'Email archive', bpaOnly: true },
    ],
  },
];

/** A child's label with its format and audience marked, e.g. "COR file (BPA only)". */
export const childLabel = (c) => {
  const notes = [c.format, c.bpaOnly && 'BPA only'].filter(Boolean);
  return notes.length ? `${c.label} (${notes.join(', ')})` : c.label;
};

export const tabOf = (key) => TABS.find((t) => t.key === key);
export const childOf = (tabKey, childKey) => tabOf(tabKey)?.children.find((c) => c.key === childKey);

/** The children a role may see. Vendors never see BPA-internal pages. */
export const childrenFor = (tab, role) => tab.children.filter((c) => role === 'cor' || !c.bpaOnly);

export const PHASES = [
  { key: 'pre-award', label: 'Pre-award' },
  { key: 'active', label: 'Active' },
  { key: 'closeout', label: 'Closeout' },
  { key: 'closed', label: 'Closed' },
];

// ── The contracts this prototype mounts the shell on ───────────────────────────
// `pages` maps "tab/child" to a built route for THIS contract; everything else is
// a real CBFish destination the prototype doesn't build.

export const CONTRACTS = {
  lib: {
    number: libContract.number,
    title: libContract.projectTitle,
    project: libContract.project,
    projectTitle: libContract.projectTitle,
    vendor: libContract.sponsor,
    vendorContact: { name: libContract.contractManager, email: 'd.iwasaki@rockcreekfisheries.example' },
    cor: { name: libContract.bpaCor, email: 'mozuna@bpa.example' },
    periodStart: libContract.periodStart,
    periodEnd: libContract.periodEnd,
    // The Overview's Basics — the SAME shape as the live Contract
    // Summary (see lib-pi-editing.mjs), so one component renders every contract.
    // Invented for this prototype, consistent with the LIB's mock contract.
    summary: {
      lastModifiedBy: libContract.bpaCor,
      lastModifiedAt: '10/16/2026 3:42 PM',
      projectNumber: libContract.project,
      projectTitle: libContract.projectTitle,
      bpaPm: 'Alana Whitcomb',
      projectStage: 'Implementation',
      projectArea: { province: 'Blue Mountain', subbasin: 'Grande Ronde', pct: '100.00%' },
      contractNumber: libContract.number,
      contractTitle: libContract.projectTitle,
      continuation: {
        previous: `CR-398114: ${libContract.projectTitle} FY2026`,
        willBeRenewed: 'Yes',
        next: '—',
      },
      status: 'Issued',
      descriptionLede: `${libContract.projectTitle} - Project ${libContract.project.replace(/-/g, '')}`,
      description:
        'The Rock Creek Fisheries Council collects, spawns and rears spring Chinook broodstock at the Rock Creek acclimation site, releases smolts into Rock Creek each spring, and monitors adult returns at the weir. FY2027 adds a second acclimation pond and a genetics study of returning adults.',
      accountTypes: 'Expense',
      startDate: libContract.periodStart,
      endDate: libContract.periodEnd,
      currentValue: usd(libContract.contractValue),
      expenditures: '$118,406',
      expendituresNote: 'Expenditures include accruals and are based on data through 30-Sep-2026.',
      bpaCo: 'Renata Kowalski',
      bpaCor: libContract.bpaCor,
      envComplianceLead: 'Priya Natarajan',
      contractor: `${libContract.sponsor} - ROCKCRK00`,
      workOrderTasks: 'WO: 00118842, Task: 1',
      contractType: 'Coop',
      accrualCategory: 'Hatchery',
      pricingMethod: 'Cost Reimbursement (CNF)',
      signatureBased: 'Yes',
    },
    pages: {
      'overview/summary': '/contract-overview#contract-basics',
      'overview/tasks': '/contract-overview#contract-tasks',
      'overview/contacts': '/contract-overview#contract-contacts',
      // The Budget landing is the line item budget's summary; /lib-entry is where
      // it's edited — the summary's "Edit line item budget", and the target of the
      // revise/review actions (verbs go to the editor, the noun to the summary).
      'budget/lib-edit': '/lib-entry',
      // Placeholder pages (/contract/<tab>/<page>), one screen per page.
      ...Object.fromEntries(
        TABS.filter((t) => t.key !== 'overview').flatMap((t) =>
          t.children
            .filter((ch) => !ch.mode)
            .map((ch) => [`${t.key}/${ch.key}`, `/contract/${t.key}/${ch.key}`]),
        ),
      ),
    },
  },
  pi: {
    number: piContract.number,
    // The source title leads with the project number, which the breadcrumb already says.
    title: piSummary.contractTitle.replace(`${piContract.project} `, ''),
    project: piContract.project,
    projectTitle: piSummary.projectTitle,
    vendor: piSummary.contractor.replace(/ - .*$/, ''),
    vendorContact: {
      name: piContacts.find((c) => c.role === 'Contract manager')?.name ?? '',
      email: 'bdiller@kootenai.example',
    },
    cor: { name: piContract.cor, email: 'esantana@bpa.example' },
    periodStart: piSummary.startDate,
    periodEnd: piSummary.endDate,
    summary: piSummary,
    pages: {},
  },
};
// /lib-mvp shows the same contract; only its line item budget lives at the MVP route.
CONTRACTS['lib-mvp'] = { ...CONTRACTS.lib, pages: { ...CONTRACTS.lib.pages, 'budget/lib-edit': '/lib-mvp' } };

// ── Demo states ────────────────────────────────────────────────────────────────
// Five situations, each meaningful from BOTH sides: the role lens turns a vendor
// action into "Assigned to you" for the vendor and "Assigned to <vendor>" for the
// COR. `target` is "tab/child". Dates are ISO; `TODAY` decides overdue.

export const STATES = [
  {
    key: 'vendor-action',
    label: 'Vendor action',
    phase: 'active',
    actions: [
      { owner: 'vendor', verb: 'Submit status report', task: 'Submit the Q3 status report', due: '2026-10-15', target: 'reporting/status-reports' },
      { owner: 'vendor', verb: 'Revise budget', task: 'Revise the line item budget: 3 required changes', due: '2026-11-01', target: 'budget/lib-edit' },
      { owner: 'vendor', verb: 'Update inventory', task: 'Update the property inventory', due: '2026-11-15', target: 'budget/property-inventory' },
    ],
    last: { by: 'cor', text: 'sent a reminder that the Q3 status report is overdue', date: '2026-10-16' },
  },
  {
    key: 'cor-action',
    label: 'COR action',
    phase: 'active',
    actions: [
      { owner: 'cor', verb: 'Review budget', task: 'Review the resubmitted line item budget', due: '2026-10-28', target: 'budget/lib-edit' },
      { owner: 'cor', verb: 'Review invoice', task: 'Review invoice 4 (September)', due: '2026-11-03', target: 'invoices/invoices' },
    ],
    last: { by: 'vendor', text: 'resubmitted the line item budget', date: '2026-10-18' },
  },
  {
    key: 'bpa',
    label: 'BPA action',
    phase: 'active',
    ccr: 'CCR 3',
    actions: [
      { owner: 'bpa', who: 'contracting officer', task: 'Sign CCR 3', since: '2026-10-14', target: 'changes/ccrs' },
    ],
    last: { by: 'cor', text: 'sent CCR 3 to the contracting officer for signature', date: '2026-10-14' },
  },
  {
    key: 'quiet',
    label: 'No actions due',
    phase: 'active',
    actions: [],
    next: { task: 'Q4 status report opens', date: '2027-01-01', target: 'reporting/status-reports' },
    last: { by: 'cor', text: 'approved the Q3 status report', date: '2026-10-10' },
  },
  {
    key: 'closeout',
    label: 'Closeout',
    phase: 'closeout',
    actions: [
      { owner: 'vendor', verb: 'Submit final report', task: 'Submit the final technical report', due: '2026-11-30', target: 'reporting/status-reports' },
      { owner: 'vendor', verb: 'Record disposition', task: 'Record property disposition', due: '2026-11-15', target: 'budget/property-inventory' },
      { owner: 'cor', verb: 'Review invoice', task: 'Review the final invoice', due: '2026-12-15', target: 'invoices/invoices' },
    ],
    last: { by: 'cor', text: 'started closeout', date: '2026-10-01' },
  },
];

export const DEFAULT_STATE = 'vendor-action';
export const STATE_KEY = 'cbf-contract-state';
/** Tab strip vs section list. Tabs by default: familiar, and they leave the content
 *  its width. They aren't expected to carry discoverability: the workflow view
 *  reaches pages in context, Go to shows the full map, and weak-scent pages live
 *  where their parent predicts. The section list stays behind the switch. */
export const NAV_KEY = 'cbf-contract-nav';
export const DEFAULT_NAV = 'tabs';
export const VIEWER_ROLES = ['vendor', 'cor'];

// ── Formatting ────────────────────────────────────────────────────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-10-15" → "Oct 15" (same year as TODAY) or "Jan 1, 2027". */
export const shortDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  const base = `${MONTHS[m - 1]} ${d}`;
  return String(y) === TODAY.slice(0, 4) ? base : `${base}, ${y}`;
};

/** "M/D/YYYY" → ISO, string math only (see src/lib/dates.ts for why). */
const usToISO = (s) => {
  const [m, d, y] = s.split('/').map(Number);
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};

/** "Month 6 of 12", or "Period ended Apr 30, 2026" once it has. */
export const periodProgress = (c) => {
  const [sy, sm] = usToISO(c.periodStart).split('-').map(Number);
  const endISO = usToISO(c.periodEnd);
  const [ey, em] = endISO.split('-').map(Number);
  const [ty, tm] = TODAY.split('-').map(Number);
  const total = (ey - sy) * 12 + (em - sm) + 1;
  const now = (ty - sy) * 12 + (tm - sm) + 1;
  if (TODAY > endISO) return `Period ended ${shortDate(endISO)}`;
  return `Month ${Math.max(1, now)} of ${total}`;
};

// ── The model ─────────────────────────────────────────────────────────────────

const isOverdue = (a) => !!a.due && a.due < TODAY;

/** Overdue first, then soonest due; items with no due date last. */
const byUrgency = (a, b) =>
  Number(isOverdue(b)) - Number(isOverdue(a)) || (a.due ?? '9999').localeCompare(b.due ?? '9999');

const partyName = (c, owner) =>
  owner === 'vendor' ? c.vendor : owner === 'cor' ? `${c.cor.name} (COR)` : 'BPA';

const actorName = (c, by) => (by === 'vendor' ? c.vendorContact.name : c.cor.name);

/** Resolve "tab/child" to a route on this contract, or null when not built. */
export const hrefFor = (c, target) => c.pages[target] ?? null;

const describe = (c, a) => ({
  ...a,
  overdue: isOverdue(a),
  when: a.due
    ? `Due ${shortDate(a.due)}`
    : a.since
      ? `Waiting since ${shortDate(a.since)}`
      : '',
  href: hrefFor(c, a.target),
  party: partyName(c, a.owner),
});

/**
 * Everything the header shows for one contract, seen by one role in one state.
 * Pure — the shell renders every (role × state) variant from it on the server.
 */
export function headerModel(contractKey, stateKey, role) {
  const c = CONTRACTS[contractKey];
  const s = STATES.find((x) => x.key === stateKey) ?? STATES[0];
  const all = s.actions.map((a) => describe(c, a)).sort(byUrgency);
  const mine = all.filter((a) => a.owner === role);
  const theirs = all.filter((a) => a.owner !== role);

  // Who it's assigned to: the viewer when they owe anything, else whoever owes the
  // most urgent item. "No actions due" only when nobody — in CBFish or out of
  // it — owes anything.
  const turn = mine.length ? 'you' : theirs.length ? 'them' : 'none';
  const lead = mine[0] ?? theirs[0] ?? null;

  // The lead item carries its own Overdue badge; the flag counts the rest, so the
  // same fact is never said twice in one header.
  const overdueCount = all.filter((a) => a.overdue && a !== lead).length;
  const flags = [
    s.ccr && { label: `${s.ccr} pending`, variant: 'warning' },
    overdueCount && { label: `${overdueCount} other ${overdueCount === 1 ? 'task' : 'tasks'} overdue`, variant: 'danger' },
  ].filter(Boolean);

  const counterparty =
    role === 'cor'
      ? { label: 'Vendor', name: `${c.vendor} · ${c.vendorContact.name}`, email: c.vendorContact.email }
      : { label: 'COR', name: c.cor.name, email: c.cor.email };

  const badges = {};
  for (const a of mine) {
    const tab = a.target.split('/')[0];
    badges[tab] = (badges[tab] ?? 0) + 1;
  }

  return {
    role,
    state: s.key,
    phase: s.phase,
    ccr: s.ccr ?? null,
    turn,
    lead,
    // Who owns the lead task, as the header names them: "Assigned to <owner>".
    owner: turn === 'you' ? 'you' : turn === 'them' ? lead.party + (lead.who ? ` ${lead.who}` : '') : null,
    more: turn === 'you' ? mine.slice(1) : [],
    mine,
    theirs,
    next: s.next ? { ...s.next, when: shortDate(s.next.date), href: hrefFor(c, s.next.target) } : null,
    last: { ...s.last, actor: actorName(c, s.last.by), when: shortDate(s.last.date) },
    counterparty,
    period: periodProgress(c),
    flags: flags.slice(0, 3),
    badges,
  };
}

/** Every (role × state) model for a contract, keyed "role:state". */
export const allModels = (contractKey) =>
  Object.fromEntries(
    VIEWER_ROLES.flatMap((r) => STATES.map((s) => [`${r}:${s.key}`, headerModel(contractKey, s.key, r)])),
  );

/** The breadcrumb trail for a page in the shell. */
export function crumbsFor(contractKey, tabKey, childKey, { ccr = false, trail = [] } = {}) {
  const c = CONTRACTS[contractKey];
  const tab = tabOf(tabKey);
  const child = childKey ? childOf(tabKey, childKey) : null;
  return [
    { label: 'Projects' },
    { label: `${c.project} ${c.projectTitle}` },
    { label: `Contract ${c.number}${ccr ? ' · CCR pending' : ''}` },
    tab && { label: tab.label },
    child && { label: childLabel(child), href: trail.length ? hrefFor(c, `${tabKey}/${childKey}`) ?? undefined : undefined },
    ...trail,
  ].filter(Boolean);
}

// ── Go to: the fast path ───────────────────────────────────────────────────────
// Go to is no longer a second menu of this contract's pages (the section list is
// that). It jumps to any contract, project, vendor or page by number or name:
// "411206" → the contract; "411206 lib" or just "lib" → its line item budget.
// Static until there's portfolio data; records outside this prototype toast.

/** Extra words a page answers to in Go to, beyond its own label. "tab/child" → words. */
export const PAGE_ALIASES = {
  'overview/summary': ['contract summary', 'basics'],
  'overview/tasks': ['to do', 'todo', 'waiting'],
  'overview/contacts': ['people', 'cor', 'vendor contact'],
  'scope/sow': ['sow', 'scope of work'],
  'scope/compare': ['review sow', 'diff'],
  'budget/we-budgets': ['we budgets', 'we'],
  'budget/lib': ['lib', 'line items', 'budget'],
  'budget/running-balance': ['rbr', 'balance'],
  'reporting/status-reports': ['status', 'quarterly', 'report'],
  'compliance/environmental': ['ec', 'nepa', 'compliance'],
  'changes/ccrs': ['ccr', 'change request', 'modification'],
  'documents/cor-file': ['cor file'],
};

/** Pinned pages on this contract, top of Go to. "tab/child". */
export const GOTO_PINS = ['budget/lib', 'reporting/status-reports'];

/** Recent records, newest first. `contract` keys a mounted contract; others are stubs. */
export const GOTO_RECENTS = [
  { kind: 'Contract', label: 'Contract 84055 REL 11', sub: 'Yakama Nation — Klickitat steelhead monitoring' },
  { kind: 'Project', label: '2019-402-00 Rock Creek Spring Chinook Supplementation Program', sub: 'Project · Rock Creek Fisheries Council' },
  { kind: 'Contract', label: 'Contract 79810 REL 4', sub: 'Nez Perce Tribe — Lostine weir operations' },
];

/** Everything else Go to can find. Stubs: selecting one says it's outside the prototype. */
export const GOTO_RECORDS = [
  { kind: 'Contract', label: 'Contract 84055 REL 11', sub: 'Yakama Nation — Klickitat steelhead monitoring' },
  { kind: 'Contract', label: 'Contract 79810 REL 4', sub: 'Nez Perce Tribe — Lostine weir operations' },
  { kind: 'Contract', label: 'Contract 86122', sub: 'Kootenai Tribe — Kootenai River habitat restoration' },
  { kind: 'Contract', label: 'Contract 87760', sub: 'Umatilla Tribes — Walla Walla spring Chinook' },
  { kind: 'Project', label: '2003-048-00 Walla Walla Spring Chinook Reintroduction', sub: 'Project · 6 contracts' },
  { kind: 'Project', label: '2002-008-00 Kootenai River Habitat Restoration', sub: 'Project · 4 contracts' },
  { kind: 'Vendor', label: 'Rock Creek Fisheries Council', sub: 'Vendor · 3 active contracts' },
  { kind: 'Vendor', label: 'Kootenai Tribe of Idaho', sub: 'Vendor · 5 active contracts' },
];

