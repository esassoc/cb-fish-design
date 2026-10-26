// Tributary habitat metrics — the MOCK data behind the 2020 CRS dashboard's
// "Open visualization" dialog (cbf-crs-trib-habitat-viz-dialog). The SHAPE
// mirrors prod's Tributary Habitat tab charts (qa.cbfish.org
// BiologicalOpinionCommitmentDashboard/TributaryHabitat): six measures, each
// charted per population as planned (by year), actual to date, and the BiOp
// target. The populations and measure names match prod; every number is
// invented for the prototype.

/** Populations (ESU/DPS - MPG), in prod's chart order. */
export const TRIB_HABITAT_POPULATIONS = [
  'Upper Columbia River spring chinook ESU - North Cascades',
  'Upper Columbia River steelhead DPS - North Cascades',
  'Snake River spring/summer Chinook ESU - Lower Snake',
  'Snake River Steelhead DPS - Lower Snake',
  'Snake River Steelhead DPS - Clearwater',
  'Snake River Steelhead DPS - Grande Ronde',
  'Snake River Steelhead DPS - Salmon',
  'Snake River spring/summer Chinook ESU - Grande Ronde/Imnaha',
  'Snake River spring/summer Chinook ESU - Upper Salmon',
];

/** Planned years shown in the data view, in order. */
export const TRIB_HABITAT_PLANNED_YEARS = [2026, 2027, 2028, 2029];

/**
 * One entry per chart. Arrays run parallel to TRIB_HABITAT_POPULATIONS.
 * `planned` is keyed by year (a missing year means nothing planned);
 * `actual` is to date.
 */
export const TRIB_HABITAT_METRICS = [
  {
    measure: 16,
    title: 'Acre-feet protected',
    description: 'Acre-feet per year of water protected',
    unit: 'acre-ft/yr',
    planned: {
      2026: [1200, 950, 0, 0, 400, 0, 1800, 0, 1650],
      2027: [600, 0, 0, 0, 0, 900, 1500, 700, 1500],
      2028: [2100, 2400, 0, 0, 0, 0, 4200, 0, 3900],
      2029: [0, 500, 0, 0, 0, 1200, 1500, 0, 1500],
    },
    actual: [1100, 900, 0, 0, 250, 0, 1050, 0, 980],
    target: [5000, 7800, 0, 0, 1500, 6500, 6200, 6000, 9200],
  },
  {
    measure: 17,
    title: 'CFS protected',
    description: 'Cubic feet per second (cfs) of water flow protected',
    unit: 'cfs',
    planned: {
      2026: [4.2, 3.5, 0, 0, 1.5, 0, 18, 0, 16.5],
      2027: [0, 0, 0, 0, 0, 6, 17, 4.5, 15],
      2028: [8.5, 10, 0, 0, 0, 0, 11, 0, 12],
      2029: [0, 2, 0, 0, 0, 8, 15, 0, 15],
    },
    actual: [3.8, 3.1, 0, 0, 0.8, 0, 14.2, 0, 13.6],
    target: [30, 40, 0, 0, 6, 75, 72, 70, 74],
  },
  {
    measure: 78,
    title: 'Screens installed or addressed',
    description: 'Number of screens installed or addressed',
    unit: 'screens',
    planned: {
      2026: [1, 2, 0, 0, 0, 0, 6, 0, 5],
      2027: [0, 1, 0, 0, 2, 3, 12, 4, 11],
      2028: [2, 0, 0, 0, 0, 2, 4, 1, 3],
    },
    actual: [1, 2, 0, 0, 0, 0, 4, 0, 4],
    target: [6, 9, 0, 0, 4, 8, 24, 6, 22],
  },
  {
    measure: 10,
    title: 'Stream miles with improved access',
    description: 'Miles of habitat accessed',
    unit: 'miles',
    planned: {
      2026: [1.5, 2, 6.5, 7, 38, 0, 3, 0, 1.2],
      2027: [24, 26, 0, 1.5, 18, 120, 8.5, 110, 6],
      2028: [0.5, 0.8, 0, 0, 5, 10, 7, 0, 7.5],
      2029: [0.3, 0.3, 0, 0, 0, 0, 2, 0, 1],
    },
    actual: [1.2, 1.8, 6, 6.4, 30.5, 0, 1.4, 0, 0.9],
    target: [6, 32, 4, 4, 20, 60, 28, 52, 18],
  },
  {
    measure: 6,
    title: 'Instream miles improved',
    description: 'Miles of stream with improved complexity',
    unit: 'miles',
    planned: {
      2026: [3, 6.2, 2.5, 5.8, 6, 0.5, 6.8, 0.2, 5.9],
      2027: [4, 4.5, 0.8, 2, 4, 2.8, 7.5, 0.5, 6.4],
      2028: [1, 1.8, 0, 0.5, 0.4, 4.6, 1.8, 2.7, 1.6],
      2029: [1.2, 1.4, 0, 0, 0, 0.6, 0, 0, 0.4],
    },
    actual: [1.8, 3.1, 1.5, 4.1, 1.2, 0.2, 4.4, 0, 3.8],
    target: [9, 10, 8, 10, 7, 9, 7, 8, 7],
  },
  {
    measure: 83,
    title: 'Riparian acres improved',
    description: 'Acres improved in riparian areas',
    unit: 'acres',
    planned: {
      2026: [240, 300, 52, 61, 120, 15, 185, 8, 176],
      2027: [165, 170, 22, 60, 190, 480, 110, 70, 58],
      2028: [25, 30, 0, 12, 22, 20, 230, 5, 240],
      2029: [35, 70, 0, 0, 0, 4, 10, 0, 6],
    },
    actual: [225, 260, 48, 50, 98, 10, 150, 6, 142],
    target: [80, 115, 150, 120, 400, 360, 310, 150, 45],
  },
];

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * One row per population for a metric: planned per year, planned total, actual
 * to date, and target. The chart reads plannedTotal/actual/target; the data
 * view reads every field.
 */
export function tribHabitatRows(metric) {
  return TRIB_HABITAT_POPULATIONS.map((population, i) => {
    const byYear = Object.fromEntries(
      TRIB_HABITAT_PLANNED_YEARS.map((y) => [`planned${y}`, metric.planned[y]?.[i] ?? 0]),
    );
    return {
      population,
      ...byYear,
      plannedTotal: round2(Object.values(byYear).reduce((a, b) => a + b, 0)),
      actual: metric.actual[i],
      target: metric.target[i],
    };
  });
}
