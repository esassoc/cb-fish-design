// Sample data for /project-budgets/baselines (CBF-8142 prototype), modeled on
// the real FY27 bulk upload sheet ("Baseline budgets.xlsx", tab "Baseline
// Upload"): one row per project per cycle, with StartFiscalYear/EndFiscalYear
// (often "indefinite"), a One-year/Two-year Cycle Type, BaselineBudget in
// dollars, COLA as a DECIMAL FRACTION (0.0228 = 2.28%), and a Comment. Two-year
// baselines cover both years ("Double the prior baseline + inflation") and $0
// baselines are legitimate ("adjusted for multi-year contracting"). System
// columns (Create/UpdatePersonID, dates, ProjectID, ProjectBaselineBudgetID)
// are CBFish-filled and ship empty in the upload.
//
// Titles are illustrative (the upload sheet carries no title column; the app
// view joins them). Two projects ship without an FY28 baseline — the
// bulk-upload simulation fills them in on Apply.

export const FY = { current: 'FY28', prior: 'FY27' };
export const COLA = 0.0228;

export const stats = {
  activeProjects: 239,
  baselinesSet: 237,
  missing: 2,
  totalBaseline: '$336.5M',
  totalBaselineApplied: '$337.9M',
};

export const baselineRows = [
  { project: '1982-013-01', title: 'Yakima Phase II fish screens', cycle: 'One-year', startFY: '2028', endFY: '2028', baseline: 455521.15, cola: COLA, comment: 'FY27 Baseline + 2.28% Inflation', status: 'Set' },
  { project: '1983-319-00', title: 'Willamette bi-op habitat restoration', cycle: 'One-year', startFY: '2028', endFY: '2028', baseline: 968061.77, cola: COLA, comment: 'FY27 Baseline + 2.28% Inflation', status: 'Set' },
  { project: '1983-435-00', title: 'Pacific lamprey research and restoration', cycle: 'Two-year', startFY: '2028', endFY: 'indefinite', baseline: 1902317.26, cola: COLA, comment: 'Double the FY27 Baseline + 2.28% Inflation', status: 'Set' },
  { project: '1984-021-00', title: 'Snake River sockeye captive broodstock', cycle: 'One-year', startFY: '2028', endFY: '2028', baseline: 622257.84, cola: COLA, comment: 'FY27 Baseline + 2.28% Inflation', status: 'Set' },
  { project: '1986-050-00', title: 'Coded-wire tag recovery, lower Columbia', cycle: 'One-year', startFY: '2028', endFY: '2028', baseline: 1766233.90, cola: COLA, comment: 'FY27 Baseline + 2.28% Inflation', status: 'Set' },
  { project: '1987-127-00', title: 'Klickitat subbasin monitoring and evaluation', cycle: 'Two-year', startFY: '2028', endFY: 'indefinite', baseline: 3621040.69, cola: COLA, comment: 'Double the FY27 Baseline + 2.28% Inflation', status: 'Set' },
  { project: '1988-053-03', title: 'Estuary habitat memorandum of agreement', cycle: 'One-year', startFY: '2028', endFY: '2028', baseline: 524112.19, cola: COLA, comment: 'FY27 Baseline + 2.28% Inflation', status: 'Set' },
  { project: '1988-053-08', title: 'Okanogan basin monitoring and evaluation', cycle: 'One-year', startFY: '2028', endFY: '2028', baseline: null, cola: null, comment: null, status: 'Missing' },
  { project: '1988-108-04', title: 'Yakima screen shop operations and maintenance', cycle: 'Two-year', startFY: '2028', endFY: '2029', baseline: 0, cola: COLA, comment: 'Baseline adjusted for multi-year contracting', status: 'Set' },
  { project: '1989-096-00', title: 'Grande Ronde supplementation operations', cycle: 'Two-year', startFY: '2028', endFY: 'indefinite', baseline: null, cola: null, comment: null, status: 'Missing' },
];

// Values the simulated clean upload supplies for the two Missing rows.
export const appliedValues = {
  '1988-053-08': { cola: COLA, baseline: 635371.39, comment: 'FY27 Baseline + 2.28% Inflation' },
  '1989-096-00': { cola: COLA, baseline: 799391.08, comment: 'Double the FY27 Baseline + 2.28% Inflation' },
};

// First-upload validation results. The error rows mirror the real incidents
// that motivated CBF-8142: a COLA entered as 2.28 where the model expects the
// decimal fraction 0.0228 — i.e. 228% (CBF-8112) — and a workbook that still
// carried a SOY tab alongside baselines (CBF-8047).
export const uploadIssues = [
  {
    severity: 'Error',
    row: 'Workbook',
    project: '—',
    issue: "Contains a 'SOY EWB Proposed' tab. This upload accepts the Baseline Upload tab only — remove all other tabs and re-upload.",
  },
  {
    severity: 'Error',
    row: '89',
    project: '1988-053-08',
    issue: 'COLA is 2.28 — that reads as 228%. Enter a decimal fraction between 0 and 0.15 (2.28% = 0.0228).',
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
    project: '1987-127-00',
    issue: 'Two-year cycle, but BaselineBudget is about 1× the FY27 baseline. Two-year baselines cover both years (double + inflation) — confirm the amount.',
  },
];

// Second-upload (corrected sheet) summary.
export const cleanSummary = {
  rows: 239,
  updated: 237,
  added: 2,
  total: '$337.9M',
};
