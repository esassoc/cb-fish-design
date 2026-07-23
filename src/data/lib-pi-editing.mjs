// Data + business rules for /lib-pi-editing (CBF-8204 — "Enable LIB and property
// inventory document replacement under certain conditions").
//
// One module imported BOTH by Astro frontmatter (server render) and the client
// script (the live state machine), so the rule tiers can never drift between the
// markup and the behavior. Names, files, and dates mirror the real contract used
// in the ticket's screenshots (Contract 84055 REL 11).

export const contract = {
  label: 'Contract 84055 REL 11: 2002-002-00 EXP ENHANCE WHITE STURGEON HABITAT',
  number: '84055 REL 11',
  project: '2002-002-00',
  action: 'CR-365847',
  /** The COR of record — who gets notified when an approved doc is replaced.
   *  From the contract's contacts (84055 REL 11). */
  cor: 'Elizabeth Santana',
  totalDocs: 60,
};

export const sowRevisions = [
  { value: 'rev1', label: '1. 84055 REL 11 (05/01/2024 - 04/30/2026)' },
  { value: 'rev2', label: '2. Amendment 001 (05/01/2024 - 04/30/2026)' },
];

/**
 * The contract view's full tab strip, mirroring the live app (in order). Only the
 * two tabs flagged `panel` are interactive in this prototype — the rest render as
 * disabled context so the contract frame reads like the real thing. `corOnly` tabs
 * are hidden from contract managers, who see a narrower set.
 */
export const CONTRACT_TABS = [
  { key: 'summary', label: 'Summary' },
  { key: 'sow', label: 'SOW' },
  { key: 'we-budgets', label: 'WE Budgets' },
  { key: 'status-reports', label: 'Status Reports' },
  { key: 'pre-award', label: 'Pre-Award' },
  { key: 'workflow', label: 'Workflow', panel: true },
  { key: 'review-sow', label: 'Review SOW' },
  { key: 'email-archive', label: 'Email Archive', corOnly: true },
  { key: 'internal-notes', label: 'Internal Notes', corOnly: true },
  { key: 'documents', label: 'Documents', panel: true },
  { key: 'cor-file', label: 'COR File', corOnly: true },
];

/** The tabs a given role sees. Contract managers don't get the COR-only tabs. */
export const contractTabsFor = (role) =>
  CONTRACT_TABS.filter((t) => (role === 'cm' ? !t.corOnly : true));

/** Award lifecycle states, in order. `tier` groups them into the three rule tiers. */
export const AWARD_STATES = [
  { value: 'pending', label: 'Pending', tier: 1 },
  { value: 'review', label: 'Review', tier: 2 },
  { value: 'approved', label: 'Approved', tier: 2 },
  { value: 'signature', label: 'Signature', tier: 3 },
  { value: 'issued', label: 'Issued', tier: 3 },
];

export const ROLES = [
  { value: 'cm', label: 'Contract manager' },
  { value: 'cor', label: 'COR (COTR)' },
  { value: 'qc', label: 'QC' },
  { value: 'bpa', label: 'F&W Approver' },
];

/** The person in each role, from the contract's contacts (84055 REL 11) —
 *  used for "acting as", the header user menu, and the notification email copy. */
export const ROLE_PEOPLE = {
  cm: 'Brandon Diller',
  cor: 'Elizabeth Santana',
  qc: 'Jonathan Flannery',
  bpa: 'David Kaplowe',
};

/** Roles allowed to edit LIB/PI while the award is in Review or Approved. */
const TIER2_ROLES = ['cor', 'qc', 'bpa'];

/**
 * The CBF-8204 rule: may `role` edit a document of `kind` ('lib' | 'pi' | 'other')
 * while the award is in `award`? Returns { allowed, tier, reason } — reason is the
 * plain-language explanation surfaced in banners, tooltips, and the "why" dialog.
 */
export function editRule(award, role, kind) {
  const state = AWARD_STATES.find((s) => s.value === award);
  const label = state ? state.label : award;

  if (state.tier === 3) {
    return {
      allowed: false,
      tier: 3,
      reason: `The award is in ${label} — documents are locked. This is the existing behavior, unchanged: no file may be edited or replaced until a new revision opens.`,
    };
  }
  if (kind === 'other') {
    return { allowed: true, tier: 0, reason: 'Standard document — existing edit rules apply.' };
  }
  if (state.tier === 1) {
    return {
      allowed: true,
      tier: 1,
      reason:
        'The SOW is Pending, so any user may replace this file from the context menu. All document specifications — type, title, authors, and sharing — are kept.',
    };
  }
  // Tier 2: Review or Approved.
  if (TIER2_ROLES.includes(role)) {
    return {
      allowed: true,
      tier: 2,
      reason: `The award is in ${label} — as ${ROLES.find((r) => r.value === role).label}, you may still edit LIB and Property Inventory documents.`,
    };
  }
  return {
    allowed: false,
    tier: 2,
    reason: `The award is in ${label} — only the COR, QC, or the F&W Approver may edit LIB and Property Inventory documents now.`,
  };
}

/** Green approval check (Lucide `check`) — shared by server render and the
 *  client re-render so the two can never draw different marks. */
export const CHECK_SVG =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

/** Columns of the Workflow tab's Document Approval grid. */
export const APPROVAL_COLS = [
  { key: 'ec', label: 'EC' },
  { key: 'cotr', label: 'COTR' },
  { key: 'qc', label: 'QC' },
  { key: 'fw', label: 'F&W Approver' },
];

/**
 * The attached documents (the filtered LIB/PI view of the 60 on the contract,
 * plus the transmittal memo for contrast — an "other" doc the new rules do NOT
 * unlock). `approvals` values are date strings or null (not approved).
 * `workflowRow` names the matching row in the Document Approval grid.
 */
export const documents = [
  {
    id: 'lib-budget',
    kind: 'lib',
    title: 'CR-365847 1 Budget',
    file: 'CR-365847 1 Budget.xlsx',
    size: '137.4 KB',
    type: 'Line Item Budget',
    subtype: 'Contract Budget',
    uploaded: '3/19/2024 11:00 AM',
    uploadedBy: 'Miriam Ashe',
    originalUpload: '3/15/2024 7:59 AM',
    originalUploadedBy: 'Virgil Watts III',
    lastUpload: '3/19/2024 11:00 AM',
    lastUploadedBy: 'Miriam Ashe',
    docId: 'P207879',
    primaryAuthor: 'Shawn Young',
    otherAuthors: 'Watts',
    viewPermission: 'Contacts Only',
    guidance:
      "A BPA contracting requirement that breaks down the Primary contractor's budget into individual line items. Used to justify the contract amount. May include subcontractor budgets. Max File Size: 5 MB, File Types Allowed: XLS, DOC, PDF, XLSX, DOCX. Other Restrictions: Limited to 5 per SOW revision.",
    workflowRow: 'Line Item Budget',
    approvals: { ec: null, cotr: '5/22/2025', qc: '5/19/2025', fw: null },
  },
  {
    id: 'pi-inventory',
    kind: 'pi',
    title: 'Property Inventory Contract 84055 REL11 (CCR52535)',
    file: '2002-002-00_Inventory_84055 REL11_CCR52535.xlsx',
    size: '19.1 KB',
    type: 'Property Inventory',
    subtype: null,
    uploaded: '5/15/2025 3:20 PM',
    uploadedBy: 'Brandon Cole',
    originalUpload: '5/15/2025 3:20 PM',
    originalUploadedBy: 'Brandon Cole',
    lastUpload: '5/15/2025 3:20 PM',
    lastUploadedBy: 'Brandon Cole',
    docId: 'P21244',
    primaryAuthor: 'Brandon Cole',
    otherAuthors: '',
    viewPermission: 'Contacts Only',
    guidance:
      'An inventory of government-furnished and contractor-acquired property held under the contract. Required when property is transferred, disposed of, or reported annually. Max File Size: 5 MB, File Types Allowed: XLS, XLSX, PDF.',
    workflowRow: 'Property Inventory',
    approvals: { ec: null, cotr: null, qc: null, fw: null },
  },
  {
    id: 'lib-transfer',
    kind: 'lib',
    title: 'Line Item Budget Transfer',
    file: 'Line Item Transfer 84055 REL 11 MOD Budget_09SEP2025.xlsx',
    size: '164.9 KB',
    type: 'Line Item Budget',
    subtype: 'Contract Budget',
    uploaded: '9/9/2025 2:48 PM',
    uploadedBy: 'Elizabeth Santana',
    originalUpload: '9/9/2025 2:48 PM',
    originalUploadedBy: 'Elizabeth Santana',
    lastUpload: '9/9/2025 2:48 PM',
    lastUploadedBy: 'Elizabeth Santana',
    docId: 'P219301',
    primaryAuthor: 'Elizabeth Santana',
    otherAuthors: '',
    viewPermission: 'Contacts Only',
    guidance:
      "A BPA contracting requirement that breaks down the Primary contractor's budget into individual line items. Used to justify the contract amount. May include subcontractor budgets. Max File Size: 5 MB, File Types Allowed: XLS, DOC, PDF, XLSX, DOCX. Other Restrictions: Limited to 5 per SOW revision.",
    workflowRow: null,
    approvals: { ec: null, cotr: null, qc: null, fw: null },
  },
  {
    id: 'transmittal',
    kind: 'other',
    title: 'Transmittal Memo CR-365847',
    file: 'Transmittal Memo CR-365847.docx',
    size: '48.2 KB',
    type: 'Transmittal Memo',
    subtype: null,
    uploaded: '7/30/2025 4:07 PM',
    uploadedBy: 'Jonathan Flannery',
    originalUpload: '7/30/2025 4:07 PM',
    originalUploadedBy: 'Jonathan Flannery',
    lastUpload: '7/30/2025 4:07 PM',
    lastUploadedBy: 'Jonathan Flannery',
    docId: 'P215870',
    primaryAuthor: 'Jonathan Flannery',
    otherAuthors: '',
    viewPermission: 'Contacts Only',
    guidance: 'The transmittal memo routed with the award package.',
    workflowRow: 'Transmittal Memo',
    approvals: { ec: null, cotr: '7/30/2025', qc: '7/30/2025', fw: '8/6/2025' },
  },
];

/** Initial Workflow History rows (mirrors the real Workflow tab). */
export const workflowHistory = [
  {
    date: '08/15/2025 3:02 AM',
    step: 'IssuedInAssetSuite',
    from: 'System Account',
    to: '',
    docStatus: '',
  },
  {
    date: '08/01/2025 3:02 AM',
    step: 'ApprovedInAssetSuite',
    from: 'System Account',
    to: '',
    docStatus: '',
  },
  {
    date: '07/30/2025 4:07 PM',
    step: 'SubmitToApprover',
    from: 'Jonathan Flannery',
    to: 'David Kaplowe; Elizabeth Santana; Jonathan Flannery',
    docStatus:
      'Transmittal Memo - Attached - COTR Approval = Green\nLine Item Budget - Attached - COTR Approval = Green\nProperty Inventory - Attached - COTR Approval = NotSet',
  },
];
