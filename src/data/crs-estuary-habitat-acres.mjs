// Estuary habitat acres — the data behind the 2020 CRS dashboard's Estuary
// Habitat "Open visualization" dialog (cbf-crs-estuary-habitat-viz-dialog).
//
// Unlike the tributary dialog's invented numbers, these rows are a SNAPSHOT of a
// local CBFish copy (11/19/2026), so the prototype can be checked against
// qa.cbfish.org's Estuary Program > Subactions page. Source, per the BPA/Estuary
// Program thread of 11/19/2026:
//   - Estuary subactions (dbo.EstuarySubaction) with "Include in analysis" set,
//     of the restoration types below. CRE 1.3 and 9.3 are acquisitions and
//     are left out.
//   - Planned  = the subaction's latest ERTG Preliminary subaction goal (acres).
//   - Restored = the subaction's latest ERTG Final subaction goal (acres).
//   - Fiscal year from the subaction's completion date (Oct 1 – Sep 30).
// The subaction list, and whether the current fiscal year counts toward the
// average, are still being confirmed with BPA.

/** Restoration subaction types counted, CRE number → short name. */
export const ESTUARY_SUBACTION_TYPES = {
  '1.4 M': 'Restore matrix areas',
  '9.4': 'Restore off-channel habitat',
  '10.1': 'Restore full hydrology/access',
  '10.1 FPL': 'Restore full hydrology/access to a floodplain lake',
  '10.2': 'Improve hydrology/access',
  '10.2 FPL': 'Improve hydrology/access to a floodplain lake',
  '10.3': 'Improve access',
  '10.3 FPL': 'Improve access to a floodplain lake',
  '15.3': 'Reduce invasive plants',
};

/** First fiscal year counted (CRS_Com-195: the first 10 years of the 2020 CRS). */
export const ESTUARY_FIRST_FY = 2021;
/** The fiscal year in progress; charted, but left out of the averages. */
export const ESTUARY_CURRENT_FY = 2027;
/** CRS_Com-195: an annual average of 300 acres over the first 10 years. */
export const ESTUARY_ANNUAL_TARGET = 300;
export const ESTUARY_TARGET_YEARS = 10;

/**
 * One row per subaction:
 * [fiscalYear, creType, subactionId, actionId, actionName, subactionName, plannedAcres, restoredAcres]
 * A null acreage means the subaction has no score of that type yet.
 */
const SUBACTION_ROWS = [
  [2021, '10.1', 542, 259, 'Burlington Bottoms-Palensky', '', 207.3, 208.0],
  [2021, '15.3', 917, 259, 'Burlington Bottoms-Palensky', '', 4.4, 13.8],
  [2021, '9.4', 779, 259, 'Burlington Bottoms-Palensky', '', 9.3, 10.4],
  [2022, '10.1', 446, 327, 'Steigerwald NWR', '', 570.0, 591.0],
  [2022, '10.1', 770, 826, 'Elochoman River #3 - Nelson Creek Swamp', '', 105.5, 116.3],
  [2022, '10.1', 868, 850, 'Dalton Lake', '', null, 33.4],
  [2022, '15.3', 447, 327, 'Steigerwald NWR', '', 647.0, 200.0],
  [2022, '15.3', 722, 327, 'Steigerwald NWR', 'scrape', 133.0, 60.0],
  [2022, '15.3', 915, 826, 'Elochoman River #3 - Nelson Creek Swamp', '', 125.0, 144.8],
  [2022, '15.3', 944, 850, 'Dalton Lake', '', 0.6, 0.7],
  [2022, '9.4', 303, 327, 'Steigerwald NWR', '', 27.0, 75.0],
  [2022, '9.4', 769, 826, 'Elochoman River #3 - Nelson Creek Swamp', '', 2.9, 0.5],
  [2022, '9.4', 869, 850, 'Dalton Lake', '', 0.7, 0.7],
  [2022, '9.4', 947, 826, 'Elochoman River #3 - Nelson Creek Swamp', 'Excavation', null, 3.0],
  [2023, '10.1', 727, 815, 'South Tongue Point Phase #2', '', 23.2, 14.5],
  [2023, '10.2', 926, 820, 'Aldrich Point East RR Crossing', '', 24.3, 24.3],
  [2023, '9.4', 726, 815, 'South Tongue Point Phase #2', '', 1.3, 0.9],
  [2023, '9.4', 751, 820, 'Aldrich Point East RR Crossing', '', 1.7, 2.0],
  [2023, '9.4', 941, 815, 'South Tongue Point Phase #2', 'excavation', 1.3, 4.0],
  [2024, '10.2', 927, 821, 'Wolf Bay RR Crossing', '', 43.4, 43.4],
  [2024, '9.4', 753, 821, 'Wolf Bay RR Crossing', '', 5.3, 5.3],
  [2025, '10.1', 738, 818, 'The Shire - Yeon Springs Reconnection', '', 14.8, 23.2],
  [2025, '10.1', 767, 825, 'Upper Lewis & Clark (NPS Netul Landing)', '', 21.8, 21.8],
  [2025, '10.1', 830, 298, 'Multnomah Channel Natural Area (MCNA) - Metro Site', '', 243.3, null],
  [2025, '10.3', 768, 825, 'Upper Lewis & Clark (NPS Netul Landing)', '', 2.0, 2.0],
  [2025, '15.3', 740, 818, 'The Shire - Yeon Springs Reconnection', '', 0.0, 4.7],
  [2025, '15.3', 940, 825, 'Upper Lewis & Clark (NPS Netul Landing)', '', 5.8, 1.9],
  [2025, '15.3', 1099, 298, 'Multnomah Channel Natural Area (MCNA) - Metro Site', '', 47.6, null],
  [2025, '9.4', 737, 818, 'The Shire - Yeon Springs Reconnection', '', 2.9, 2.8],
  [2025, '9.4', 766, 825, 'Upper Lewis & Clark (NPS Netul Landing)', '', 5.3, 5.8],
  [2025, '9.4', 829, 298, 'Multnomah Channel Natural Area (MCNA) - Metro Site', '', 20.4, null],
  [2025, '9.4', 948, 818, 'The Shire - Yeon Springs Reconnection', 'Excavation', null, 0.1],
  [2026, '10.1', 108, 378, 'Svensen Island - Cathlamet Bay', 'West', 180.3, 176.2],
  [2026, '10.1', 663, 378, 'Svensen Island - Cathlamet Bay', 'East', 114.3, 114.3],
  [2026, '10.1', 748, 819, 'Warren Slough Railroad', '', 22.0, 22.0],
  [2026, '10.1', 925, 860, 'Agency Creek', '11-acre parcel', 11.7, 11.7],
  [2026, '10.1', 929, 860, 'Agency Creek', '8-acre parcel', 8.1, 8.1],
  [2026, '10.1', 945, 203, 'Carr Slough', '', 18.8, null],
  [2026, '10.1', 1017, 831, 'Scappoose Bay-Hogan Ranch', '', 91.8, null],
  [2026, '10.1', 1104, 831, 'Scappoose Bay-Hogan Ranch', 'Bump SW', 30.1, null],
  [2026, '10.1', 1105, 831, 'Scappoose Bay-Hogan Ranch', 'Bump W', 36.3, null],
  [2026, '10.2', 653, 203, 'Carr Slough', '', 121.0, null],
  [2026, '10.3', 928, 860, 'Agency Creek', '', 2.1, 2.1],
  [2026, '15.3', 654, 203, 'Carr Slough', '', 6.0, null],
  [2026, '15.3', 809, 831, 'Scappoose Bay-Hogan Ranch', '', 13.7, null],
  [2026, '9.4', 79, 378, 'Svensen Island - Cathlamet Bay', 'West', 35.7, 44.2],
  [2026, '9.4', 385, 203, 'Carr Slough', 'Excavation', 5.5, null],
  [2026, '9.4', 662, 378, 'Svensen Island - Cathlamet Bay', 'East', 6.9, 8.6],
  [2026, '9.4', 747, 819, 'Warren Slough Railroad', '', 1.8, 1.8],
  [2026, '9.4', 776, 831, 'Scappoose Bay-Hogan Ranch', '', 7.4, null],
  [2026, '9.4', 808, 831, 'Scappoose Bay-Hogan Ranch', 'Excavation', 2.5, null],
  [2026, '9.4', 930, 203, 'Carr Slough', '', 7.8, null],
  [2026, '9.4', 1106, 831, 'Scappoose Bay-Hogan Ranch', 'Bump SW', 3.4, null],
  [2026, '9.4', 1107, 831, 'Scappoose Bay-Hogan Ranch', 'Bump W', 4.2, null],
];

/** Rounds to one decimal, so sums of tenths don't leak float noise. */
const round1 = (v) => Math.round(v * 10) / 10;

/** The subactions as objects — the "where the totals come from" grid. */
export function estuarySubactionRows() {
  return SUBACTION_ROWS.map(([fiscalYear, creType, subactionId, actionId, actionName, subactionName, planned, restored]) => ({
    fiscalYear,
    subactionType: `CRE ${creType} – ${ESTUARY_SUBACTION_TYPES[creType]}`,
    subactionId,
    actionId,
    actionName,
    subactionName,
    planned,
    restored,
  }));
}

/**
 * One row per fiscal year from ESTUARY_FIRST_FY to ESTUARY_CURRENT_FY: planned and
 * restored acres, cumulative restored, and the running average restored per year.
 * The running average is null for the year in progress, which has not had a
 * full year to report.
 */
export function estuaryYearRows() {
  const rows = [];
  let cumulative = 0;
  for (let fy = ESTUARY_FIRST_FY; fy <= ESTUARY_CURRENT_FY; fy++) {
    const inYear = SUBACTION_ROWS.filter((r) => r[0] === fy);
    const planned = round1(inYear.reduce((s, r) => s + (r[6] ?? 0), 0));
    const restored = round1(inYear.reduce((s, r) => s + (r[7] ?? 0), 0));
    cumulative = round1(cumulative + restored);
    const complete = fy < ESTUARY_CURRENT_FY;
    rows.push({
      fiscalYear: fy,
      label: complete ? `FY ${fy}` : `FY ${fy} (in progress)`,
      planned,
      restored,
      cumulative,
      runningAverage: complete ? round1(cumulative / (fy - ESTUARY_FIRST_FY + 1)) : null,
      target: ESTUARY_ANNUAL_TARGET,
      subactionCount: inYear.length,
    });
  }
  return rows;
}

/**
 * Cumulative restored acres against the 10-year target pace, one row per year of
 * the target window. Cumulative is null past the last completed year, so the
 * line stops where the data does.
 */
export function estuaryCumulativeRows() {
  const byYear = new Map(estuaryYearRows().map((r) => [r.fiscalYear, r]));
  return Array.from({ length: ESTUARY_TARGET_YEARS }, (_, i) => {
    const fy = ESTUARY_FIRST_FY + i;
    const year = byYear.get(fy);
    return {
      label: `FY ${fy}`,
      cumulative: year && fy < ESTUARY_CURRENT_FY ? year.cumulative : null,
      targetPace: ESTUARY_ANNUAL_TARGET * (i + 1),
    };
  });
}

/** Headline figures for the stat row. Averages count completed years only. */
export function estuarySummary() {
  const years = estuaryYearRows();
  const completed = years.filter((r) => r.fiscalYear < ESTUARY_CURRENT_FY);
  const restored = round1(years.reduce((s, r) => s + r.restored, 0));
  const planned = round1(years.reduce((s, r) => s + r.planned, 0));
  return {
    restored,
    planned,
    completedYears: completed.length,
    annualAverage: Math.round(restored / completed.length),
    tenYearTarget: ESTUARY_ANNUAL_TARGET * ESTUARY_TARGET_YEARS,
    lastCompletedFy: ESTUARY_CURRENT_FY - 1,
  };
}
