// Placeholder content for the contract's section tabs (Scope, Budget, Environmental
// compliance, Reporting, Invoices, Changes and approvals, Documents) — what each
// tab COULD hold, so the structure can be judged with something in it. One entry per
// page ("tab/child"); each page renders as a section on its tab's screen.
//
// INVENTED for the prototype, consistent with contract CR-411206 (Rock Creek spring
// Chinook, six work elements, $312,500). Block kinds:
//   table  { columns, rows }          rows are arrays; a cell may be { text, badge }
//   facts  { items: [[label, value]] }
//   link   { text, href }             a page built elsewhere in the prototype
//   cards  { items: [{ title, value, sub, target }] }  a way into each sibling page
// A page can show several blocks (`blocks`), each with an optional `heading`.
// `stats` are [label, value, sub?] tiles under the page header.
// `action` is the section's one verb (a button in its header); `caption` sits on
// the right of the heading.

export const PLACEHOLDERS = {
  // ── Scope ───────────────────────────────────────────────────────────────────
  'scope/sow': {
    stats: [['Work elements', '6'], ['Deliverables', '14'], ['Done', '6 of 14']],
    intro: 'The statement of work: what the vendor will do, organized by work element, with the deliverables each one owes.',
    caption: 'Version 3 · approved Apr 22, 2026',
    action: 'Review SOW',
    block: {
      kind: 'table',
      columns: ['Work element', 'Deliverable', 'Due'],
      rows: [
        ['WE 119 Manage and administer projects', 'Quarterly coordination with BPA', 'Each quarter'],
        ['WE 157 Collect field and lab data', 'Adult return counts at the weir', 'Sep 30, 2026'],
        ['WE 165 Environmental compliance documentation', 'Updated in-water work permit', 'May 15, 2026'],
        ['WE 185 Pisces status report', 'Quarterly status reports', 'Each quarter'],
        ['WE 60 Operate and maintain hatchery', 'Smolt release into Rock Creek', 'Apr 15, 2027'],
        ['WE 99 Outreach and education', 'Spring release day with local schools', 'May 2027'],
      ],
    },
  },
  'scope/locations': {
    stats: [['Locations', '3'], ['Subbasin', 'Grande Ronde']],
    intro: 'Where the work happens. Each location is tied to the work elements carried out there.',
    caption: '3 locations',
    block: {
      kind: 'table',
      columns: ['Location', 'Subbasin', 'Work elements'],
      rows: [
        ['Rock Creek acclimation site', 'Grande Ronde', 'WE 60, WE 165'],
        ['Rock Creek weir', 'Grande Ronde', 'WE 157'],
        ['Grande Ronde subbasin (outreach)', 'Grande Ronde', 'WE 99'],
      ],
    },
  },
  'scope/focal-species': {
    intro: 'The species this contract is for, and the population each work element targets.',
    block: {
      kind: 'table',
      columns: ['Species', 'Population', 'ESA status'],
      rows: [
        ['Chinook salmon', 'Snake River spring/summer', { text: 'Threatened', badge: 'warning' }],
        ['Steelhead', 'Snake River basin (incidental)', { text: 'Threatened', badge: 'warning' }],
      ],
    },
  },

  // ── Budget ──────────────────────────────────────────────────────────────────
  'budget/we-budgets': {
    stats: [['Contract value', '$312,500'], ['Spent', '$118,400', '38%'], ['Remaining', '$194,100'], ['Unfunded WEs', '0']],
    intro: 'Each work element’s share of the contract, and what has been spent against it.',
    caption: 'Through Sep 30, 2026',
    block: {
      kind: 'table',
      columns: ['Work element', 'Budget', 'Spent', 'Remaining'],
      num: [1, 2, 3],
      rows: [
        ['WE 119 Manage and administer projects', '$28,000', '$14,200', '$13,800'],
        ['WE 157 Collect field and lab data', '$96,000', '$41,800', '$54,200'],
        ['WE 165 Environmental compliance documentation', '$12,000', '$6,100', '$5,900'],
        ['WE 185 Pisces status report', '$8,500', '$2,900', '$5,600'],
        ['WE 60 Operate and maintain hatchery', '$142,000', '$49,600', '$92,400'],
        ['WE 99 Outreach and education', '$26,000', '$3,800', '$22,200'],
        ['Total', '$312,500', '$118,400', '$194,100'],
      ],
    },
  },
  'budget/lib': {
    caption: 'Version 3 · applies to invoices from May 1, 2026 · returned Oct 12 with 3 required changes',
    actions: ['Compare versions', 'Download Excel'],
    edit: { text: 'Edit line item budget', href: '/lib-entry' },
    stats: [
      ['Contract value', '$312,500'],
      ['LIB total', '$309,852'],
      ['Invoiced to date', '$118,406'],
      ['Remaining', '$194,094'],
    ],
    block: {
      kind: 'table',
      columns: ['Budget class', 'How it’s calculated', 'Work elements', 'Amount', 'Invoiced'],
      num: [3, 4],
      strong: [0],
      rows: [
        ['Personnel', 'Hours × rate', 'WE 60, WE 157, WE 119', '$148,600', '$56,200'],
        ['Fringe benefits', '% of salary', 'WE 60, WE 157, WE 119', '$44,580', '$16,860'],
        ['Travel', 'GSA rate', 'WE 157, WE 99', '$9,840', '$3,120'],
        ['Supplies and equipment', 'Unit cost × quantity', 'WE 60, WE 157', '$39,450', '$21,050'],
        ['Subcontracts', 'Lump sum', 'WE 165', '$24,000', '$4,800'],
        ['Indirect', '26.75% of base', 'All', '$43,382', '$16,376'],
      ],
      foot: ['Total', '', '', '$309,852', '$118,406'],
    },
  },
  'budget/property-inventory': {
    stats: [['Items', '4'], ['Total cost', '$39,450'], ['Over $5,000', '4', 'capital equipment']],
    intro: 'Equipment bought with contract funds, where it is, and what happens to it at closeout.',
    caption: '4 items',
    action: 'Add item',
    block: {
      kind: 'table',
      columns: ['Item', 'Acquired', 'Cost', 'Location'],
      num: [2],
      rows: [
        ['PIT tag detection array', 'Jun 2026', '$18,400', 'Rock Creek weir'],
        ['Aeration system, pond 2', 'Jul 2026', '$9,750', 'Rock Creek acclimation site'],
        ['Fish transport tank', 'May 2026', '$6,200', 'Rock Creek acclimation site'],
        ['Field laptop (rugged)', 'May 2026', '$5,100', 'Rock Creek weir'],
      ],
    },
  },
  'budget/running-balance': {
    stats: [['Contract value', '$312,500'], ['Invoiced to date', '$118,406'], ['Remaining', '$194,094']],
    intro: 'A PDF statement of the contract’s balance: obligated, invoiced, paid, and remaining.',
    block: {
      kind: 'facts',
      items: [
        ['Contract value', '$312,500'],
        ['Invoiced to date', '$118,406'],
        ['Remaining', '$194,094'],
        ['Generated', 'Overnight from the financial system'],
      ],
    },
    action: 'Download PDF',
  },
  'budget/expenditures': {
    stats: [['FY2026', '$101,190'], ['FY2027 to date', '$17,216']],
    intro: 'Spending by fiscal year, including accruals.',
    block: {
      kind: 'table',
      columns: ['Fiscal year', 'Expenditures', 'Accruals', 'Total'],
      num: [1, 2, 3],
      rows: [
        ['FY2026', '$96,210', '$4,980', '$101,190'],
        ['FY2027', '$17,216', '$0', '$17,216'],
      ],
    },
  },

  // ── Environmental compliance ───────────────────────────────────────────────
  'compliance/environmental': {
    stats: [['Need clearance', '3 of 6 WEs'], ['Cleared', '2'], ['In review', '1', '9 days, EC Lead']],
    intro: 'Which work elements need environmental compliance, and where each one stands. On-the-ground work waits on clearance.',
    caption: 'EC Lead: Priya Natarajan',
    block: {
      kind: 'table',
      columns: ['Work element', 'Needs clearance', 'Status', 'Since'],
      rows: [
        ['WE 157 Collect field and lab data', 'Yes', { text: 'Cleared', badge: 'success' }, 'Apr 30, 2026'],
        ['WE 60 Operate and maintain hatchery', 'Yes', { text: 'Cleared', badge: 'success' }, 'Apr 30, 2026'],
        ['WE 99 Outreach and education', 'Yes', { text: 'In review', badge: 'warning' }, 'Oct 11, 2026'],
        ['WE 119, WE 165, WE 185', 'No', 'Not needed', '—'],
      ],
    },
  },

  // ── Reporting ───────────────────────────────────────────────────────────────
  'reporting/status-reports': {
    stats: [['Overdue', '1', 'Q3, due Oct 15'], ['Accepted', '2'], ['Next due', 'Jan 30, 2027']],
    intro: 'Quarterly status reports: what was done on each work element, submitted by the vendor and accepted by the COR.',
    action: 'Submit status report',
    block: {
      kind: 'table',
      columns: ['Report', 'Due', 'Status'],
      rows: [
        ['Q3 2026 (Jul–Sep)', 'Oct 15, 2026', { text: 'Overdue', badge: 'danger' }],
        ['Q2 2026 (Apr–Jun)', 'Jul 15, 2026', { text: 'Accepted', badge: 'success' }],
        ['Q4 2026 (Oct–Dec)', 'Jan 30, 2027', 'Not started'],
      ],
    },
  },
  'reporting/metrics-implementation': {
    stats: [['Metrics', '3'], ['Reported', '2 of 3']],
    intro: 'What the work produced, reported against the targets in the statement of work.',
    block: {
      kind: 'table',
      columns: ['Metric', 'Target', 'Reported'],
      num: [1, 2],
      rows: [
        ['Smolts released', '150,000', '—'],
        ['Adults counted at the weir', '400', '312'],
        ['Broodstock collected', '120', '118'],
      ],
    },
  },
  'reporting/metrics-environmental': {
    intro: 'Environmental conditions measured during the work.',
    block: {
      kind: 'table',
      columns: ['Metric', 'Site', 'Latest'],
      rows: [
        ['Water temperature (7-day max)', 'Rock Creek weir', '17.8 °C, Aug 2026'],
        ['Dissolved oxygen', 'Acclimation pond 2', '9.1 mg/L, Sep 2026'],
      ],
    },
  },
  'reporting/milestones': {
    stats: [['Done', '6 of 14'], ['Overdue', '1'], ['Next', 'Nov 1', 'Pond 2 aeration']],
    intro: 'Dated milestones from the statement of work, by work element.',
    caption: '6 of 14 done',
    block: {
      kind: 'table',
      columns: ['Milestone', 'Work element', 'Due', 'Status'],
      rows: [
        ['Broodstock collection complete', 'WE 60', 'Sep 15, 2026', { text: 'Done', badge: 'success' }],
        ['Q3 status report', 'WE 185', 'Oct 15, 2026', { text: 'Overdue', badge: 'danger' }],
        ['Pond 2 aeration installed', 'WE 60', 'Nov 1, 2026', { text: 'On track', badge: 'info' }],
        ['Spring release day', 'WE 99', 'May 2027', 'Not started'],
      ],
    },
  },

  // ── Invoices ────────────────────────────────────────────────────────────────
  'invoices/invoices': {
    stats: [['Invoiced to date', '$118,406'], ['Paid', '$96,566'], ['In review', '$0'], ['Last invoice', 'Sep 2026']],
    intro: 'Monthly invoices against the contract, with the backup the vendor attached and where each one is in review.',
    action: 'Submit invoice',
    block: {
      kind: 'table',
      columns: ['Invoice', 'Period', 'Amount', 'Status'],
      num: [2],
      rows: [
        ['Invoice 4', 'September 2026', '$21,840', { text: 'Approved', badge: 'success' }],
        ['Invoice 3', 'August 2026', '$19,212', { text: 'Paid', badge: 'success' }],
        ['Invoice 2', 'July 2026', '$24,906', { text: 'Paid', badge: 'success' }],
        ['Invoice 1', 'May–June 2026', '$52,448', { text: 'Paid', badge: 'success' }],
      ],
    },
  },

  // ── Changes and approvals ───────────────────────────────────────────────────
  'changes/workflow': {
    intro: 'Every approval on this contract, with who acted and when.',
    block: {
      kind: 'table',
      columns: ['Step', 'By', 'When'],
      rows: [
        ['Line item budget returned with 3 changes', 'Marguerite Ozuna (COR)', 'Oct 12, 2026'],
        ['Contract issued', 'Renata Kowalski (CO)', 'Apr 28, 2026'],
        ['SOW and budget approved', 'Marguerite Ozuna (COR)', 'Apr 22, 2026'],
        ['Package submitted', 'Devon Iwasaki (vendor)', 'Apr 2, 2026'],
      ],
    },
  },
  'changes/ccrs': {
    stats: [['Open', '1', 'CCR 3'], ['Approved', '2'], ['Current version', '3']],
    intro: 'Contract change requests and the versions they created. Each CCR is its own record with its own workflow.',
    action: 'Start CCR',
    block: {
      kind: 'table',
      columns: ['Change request', 'What changes', 'Status'],
      rows: [
        ['CCR 3', 'Travel line added', { text: 'Waiting on the contracting officer', badge: 'warning' }],
        ['CCR 2', 'WE 60 budget moved from WE 99', { text: 'Approved', badge: 'success' }],
        ['CCR 1', 'Period of performance extended 1 month', { text: 'Approved', badge: 'success' }],
      ],
    },
  },
  'changes/pre-award': {
    intro: 'The pre-award letter and the conditions it set before the contract was issued.',
    block: {
      kind: 'facts',
      items: [
        ['Letter sent', 'Mar 18, 2026'],
        ['Pre-award costs allowed from', 'Mar 1, 2026'],
        ['Conditions', 'Broodstock collection may begin before issuance'],
      ],
    },
  },

  // ── Documents ───────────────────────────────────────────────────────────────
  'documents/documents': {
    stats: [['Files', '3'], ['Last added', 'Jun 3, 2026']],
    intro: 'Files shared between BPA and the vendor.',
    action: 'Upload document',
    block: {
      kind: 'table',
      columns: ['Document', 'Type', 'Added'],
      rows: [
        ['FY2026 annual technical report.pdf', 'Technical report', 'Mar 30, 2026'],
        ['In-water work permit 2026.pdf', 'Permit', 'May 12, 2026'],
        ['Weir operations plan.docx', 'Plan', 'Jun 3, 2026'],
      ],
    },
  },
  'documents/cor-file': {
    intro: 'The COR’s working file for this contract.',
    block: {
      kind: 'table',
      columns: ['Document', 'Added'],
      rows: [
        ['Site visit notes, Aug 2026.docx', 'Aug 21, 2026'],
        ['Budget review checklist.xlsx', 'Oct 12, 2026'],
      ],
    },
  },
  'documents/internal-notes': {
    intro: 'Notes BPA staff keep about the contract. The vendor never sees them.',
    block: {
      kind: 'table',
      columns: ['Note', 'By', 'When'],
      rows: [['Vendor asked about adding a travel line; told them to start a CCR.', 'Marguerite Ozuna', 'Sep 30, 2026']],
    },
  },
  'documents/email-archive': {
    intro: 'Email about this contract, filed from BPA mailboxes.',
    block: {
      kind: 'table',
      columns: ['Subject', 'From', 'Date'],
      rows: [
        ['Q3 status report reminder', 'Marguerite Ozuna', 'Oct 16, 2026'],
        ['RE: travel line for genetics study', 'Devon Iwasaki', 'Sep 29, 2026'],
      ],
    },
  },
};
