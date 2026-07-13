// Mock dataset for the /tributary-habitat prototype — a modernization of the
// legacy CBFish "Work Element Budget" program page. ONE source of truth: the
// chart, the averages rail, and the metadata tab all read from here.
//
// The five series mirror the legacy chart: Habitat (Planned/Actual) and Admin
// (Planned/Actual) work-element budgets, plus the Cost Share contributed by
// project sponsors. Values are illustrative dollars (mock), contoured to match
// the legacy chart's shape: ~0 before the 2004 ramp, a long plateau, a late
// surge through the out-years (FY24-26), then the falloff of not-yet-spent
// planned dollars in FY27-29.

/** @typedef {{ year: number, habitatPlanned: number, habitatActual: number, adminPlanned: number, adminActual: number, costShare: number }} BudgetYear */

const M = 1_000_000;

// Authored per fiscal year (values in $M, scaled to dollars below). 0 = the
// series has no data that year (the line sits on the axis). Actuals stop in the
// near term; planned dollars extend into the out-years.
const RAW = [
  // year   hPlan hAct  aPlan aAct  cShare
  [1995,    0,    0,    0,    0,    0],
  [1996,    0,    0,    0,    0,    0],
  [1997,    0,    0,    0,    0,    2],
  [1998,    0,    0,    0,    0,    6],
  [1999,    0,    0,    0,    0,    9],
  [2000,    0,    0,    0,    0,    12],
  [2001,    0,    0,    0,    0,    16],
  [2002,    0,    0,    0,    0,    20],
  [2003,    0,    0,    0,    0,    26],
  [2004,    20,   16,   6,    5,    31],
  [2005,    32,   27,   40,   38,   33],
  [2006,    40,   30,   54,   50,   38],
  [2007,    48,   35,   58,   54,   42],
  [2008,    55,   31,   62,   60,   38],
  [2009,    58,   42,   72,   69,   39],
  [2010,    62,   44,   75,   73,   20],
  [2011,    67,   52,   80,   78,   33],
  [2012,    69,   61,   87,   81,   41],
  [2013,    66,   59,   84,   80,   37],
  [2014,    70,   59,   90,   82,   40],
  [2015,    68,   58,   88,   82,   41],
  [2016,    69,   57,   95,   86,   45],
  [2017,    73,   61,   84,   77,   28],
  [2018,    70,   58,   88,   76,   40],
  [2019,    66,   49,   85,   75,   41],
  [2020,    74,   63,   88,   80,   41],
  [2021,    73,   63,   80,   76,   34],
  [2022,    74,   72,   88,   75,   40],
  [2023,    66,   54,   88,   75,   45],
  [2024,    95,   76,   100,  98,   38],
  [2025,    96,   82,   101,  101,  38],
  [2026,    88,   81,   100,  101,  4],
  [2027,    24,   4,    25,   24,   0],
  [2028,    6,    1,    6,    6,    0],
  [2029,    0,    0,    0,    0,    0],
];

/** @type {BudgetYear[]} */
export const budgetByYear = RAW.map(([year, hPlan, hAct, aPlan, aAct, cShare]) => ({
  year,
  habitatPlanned: hPlan * M,
  habitatActual: hAct * M,
  adminPlanned: aPlan * M,
  adminActual: aAct * M,
  costShare: cShare * M,
}));

// Series metadata — drives the chart legend + the token-color lookup. `style`
// distinguishes the Planned series (dashed) from Actual (solid), matching the
// legacy chart. `token` names the CSS custom property the chart reads at runtime
// so the palette stays brand-driven (Habitat = blue, Admin = orange, Cost Share
// = neutral gray) rather than hardcoding hex.
export const SERIES = [
  { key: 'habitatPlanned', label: 'Habitat Planned', token: '--cbf-blue-500', style: 'planned' },
  { key: 'habitatActual', label: 'Habitat Actual', token: '--cbf-blue-700', style: 'actual' },
  { key: 'adminPlanned', label: 'Admin Planned', token: '--color-orange-400', style: 'planned' },
  { key: 'adminActual', label: 'Admin Actual', token: '--color-orange-600', style: 'actual' },
  { key: 'costShare', label: 'Cost Share', token: '--cbf-gray-600', style: 'actual' },
];

/**
 * Long-format rows for Vega-Lite: one row per (year, series). Drops 0 values so
 * a series' line begins at its first funded year instead of riding the axis.
 * @returns {{ year: number, series: string, label: string, amount: number }[]}
 */
export const toLongFormat = () =>
  budgetByYear.flatMap((row) =>
    SERIES.filter((s) => row[s.key] > 0).map((s) => ({
      year: row.year,
      series: s.key,
      label: s.label,
      amount: row[s.key],
    })),
  );

// Headline averages shown in the rail. These are the program's authoritative
// aggregate figures over the stated FY ranges (in production they come from the
// backend aggregation, not from the plotted points) — so they live here as
// given rather than being re-derived from the contoured mock series above.
export const averages = [
  { value: '$46,294,234', label: 'Habitat Planned', sub: 'FY 1999–2029' },
  { value: '$39,904,492', label: 'Habitat Actual', sub: 'FY 1999–2029', accent: true },
  { value: '$59,554,024', label: 'Admin Planned', sub: 'FY 1999–2029' },
  { value: '$54,704,085', label: 'Admin Actual', sub: 'FY 1999–2029' },
  { value: '$20,938,199', label: 'Cost Share', sub: 'FY 1995–2028' },
  { value: '73%', label: 'Actual Habitat / Admin Ratio', sub: 'FY 1999–2029' },
];

// Program metadata — the "Metadata" tab. Mirrors the descriptive text the legacy
// page surfaces (which work categories roll into Habitat vs. Admin) plus the kind
// of provenance a program page carries.
export const metadata = {
  description:
    'This chart focuses on Projects that have Purpose set to "Habitat". The Habitat value includes all work elements in the Work Category of "Habitat"; the Admin value includes all work elements in the Work Categories of "Environmental Compliance", "Planning and Coordination", "RM&E and Data Management", and "Reporting".',
  fields: [
    { term: 'Program', detail: 'Tributary Habitat' },
    { term: 'Purpose filter', detail: 'Habitat' },
    { term: 'Habitat work category', detail: 'Habitat' },
    {
      term: 'Admin work categories',
      detail: 'Environmental Compliance · Planning and Coordination · RM&E and Data Management · Reporting',
    },
    { term: 'Fiscal year range', detail: 'FY 1995 – FY 2029' },
    { term: 'Currency', detail: 'Nominal U.S. dollars (not inflation-adjusted)' },
    { term: 'Data source', detail: 'CBFish Work Element Budget (illustrative mock data)' },
  ],
};

/** Min/Max year options for the chart's range selects. */
export const yearOptions = budgetByYear.map((r) => r.year);

/** The project-scope segments above the chart (legacy: the three sub-tabs). */
export const scopeViews = [
  { label: 'All Habitat Projects', value: 'all' },
  { label: 'Projects By Emphasis', value: 'emphasis' },
  { label: 'Custom Project List', value: 'custom' },
];

/** Compact USD for axis ticks / chips, e.g. $46.3M. */
export const fmtCompact = (n) =>
  '$' + (n / M).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'M';

/** Exact USD, e.g. $46,294,234. */
export const fmtExact = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
