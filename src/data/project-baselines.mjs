// Sample data for /project-budgets/baselines (CBF-8142 prototype).
// FY28 baselines are FY27 × 1.0228 (the 2.28% COLA) so the arithmetic
// reconciles on screen. Two projects are intentionally missing an FY28
// baseline — the bulk-upload simulation fills them in on Apply.

export const FY = { current: 'FY28', prior: 'FY27' };

export const stats = {
  activeProjects: 216,
  baselinesSet: 214,
  missing: 2,
  totalBaseline: '$318.6M',
  totalBaselineApplied: '$321.0M',
};

export const baselineRows = [
  { project: '1988-115-25', title: 'Yakima Phase II fish screens', fund: 'Expense', fy27: 1240000, cola: 2.28, fy28: 1268272, status: 'Set' },
  { project: '1992-061-00', title: 'Willamette bi-op habitat restoration', fund: 'Expense', fy27: 2310000, cola: 2.28, fy28: 2362668, status: 'Set' },
  { project: '1994-026-00', title: 'Pacific lamprey research and restoration', fund: 'Expense', fy27: 875500, cola: 2.28, fy28: 895461, status: 'Set' },
  { project: '1997-019-00', title: 'Snake River sockeye captive broodstock', fund: 'Capital', fy27: 3150000, cola: 2.28, fy28: 3221820, status: 'Set' },
  { project: '2002-013-00', title: 'Coded-wire tag recovery, lower Columbia', fund: 'Expense', fy27: 458200, cola: 2.28, fy28: 468647, status: 'Set' },
  { project: '2003-011-00', title: 'Klickitat subbasin monitoring and evaluation', fund: 'Expense', fy27: 692400, cola: 2.28, fy28: 708187, status: 'Set' },
  { project: '2007-402-00', title: 'Estuary habitat memorandum of agreement', fund: 'Capital', fy27: 1865000, cola: 2.28, fy28: 1907522, status: 'Set' },
  { project: '2008-471-00', title: 'Okanogan basin monitoring and evaluation', fund: 'Expense', fy27: 940000, cola: null, fy28: null, status: 'Missing' },
  { project: '2010-030-00', title: 'Grande Ronde supplementation operations', fund: 'Expense', fy27: 524750, cola: 2.28, fy28: 536714, status: 'Set' },
  { project: '2012-104-00', title: 'White sturgeon passage and enumeration', fund: 'Capital', fy27: 1378500, cola: null, fy28: null, status: 'Missing' },
];

// FY28 values the simulated clean upload supplies for the two Missing rows.
export const appliedValues = {
  '2008-471-00': { cola: 2.28, fy28: 961432 },
  '2012-104-00': { cola: 2.28, fy28: 1409930 },
};

// First-upload validation results. The error rows mirror the real incidents
// that motivated CBF-8142: a COLA typed as 228 instead of 2.28 (CBF-8112) and
// a workbook that still carried a SOY tab alongside baselines (CBF-8047).
export const uploadIssues = [
  {
    severity: 'Error',
    row: 'Workbook',
    project: '—',
    issue: "Contains a 'SOY EWB Proposed' tab. This upload accepts baseline budgets only — remove all other tabs and re-upload.",
  },
  {
    severity: 'Error',
    row: '87',
    project: '2008-471-00',
    issue: 'COLA % is 228 — out of range (0–15). Did you mean 2.28?',
  },
  {
    severity: 'Error',
    row: '142',
    project: '2014-903-00',
    issue: 'Project number not found in CBFish. Check for a typo or use the template row for this project.',
  },
  {
    severity: 'Warning',
    row: '63',
    project: '1997-019-00',
    issue: 'FY28 baseline is 42% above FY27. Confirm this increase is intended.',
  },
];

// Second-upload (corrected sheet) summary.
export const cleanSummary = {
  rows: 216,
  updated: 214,
  added: 2,
  total: '$321.0M',
};
