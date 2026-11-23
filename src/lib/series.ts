/**
 * Small helpers for the cumulative fiscal-year series behind the homepage
 * results (src/data/cbfish-home-metrics.ts). Shared so the homepage and the
 * /program-results pages summarise a series the same way.
 */
export type SeriesPoint = { fy: number; value: number };

/** What the latest fiscal year added to the running total. */
export function latestGain(series: SeriesPoint[]): number {
  if (series.length < 2) return series[0]?.value ?? 0;
  return series[series.length - 1].value - series[series.length - 2].value;
}
