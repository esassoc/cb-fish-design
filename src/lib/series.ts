/**
 * Small helpers for the cumulative fiscal-year series behind the homepage
 * results (src/data/cbfish-home-metrics.ts). Shared so the growth tabs, the
 * current-metrics table and the /program-results pages draw and summarise a
 * series the same way.
 */
export type SeriesPoint = { fy: number; value: number };

/**
 * An SVG path for a sparkline of `series`, scaled to a `width` x `height` box
 * with `pad` units kept clear top and bottom. Values are plotted against the
 * series maximum, so the line always ends near the top for a cumulative total.
 * A one-point series draws a flat line; an empty one draws nothing.
 */
export function sparkPath(series: { value: number }[], width = 100, height = 24, pad = 2): string {
  if (series.length === 0) return '';
  const max = Math.max(...series.map((d) => d.value)) || 1;
  const step = series.length > 1 ? width / (series.length - 1) : 0;
  const y = (v: number) => (height - pad - (v / max) * (height - pad * 2)).toFixed(1);
  if (series.length === 1) return `M0,${y(series[0].value)}L${width},${y(series[0].value)}`;
  return series.map((d, i) => `${i ? 'L' : 'M'}${(i * step).toFixed(1)},${y(d.value)}`).join('');
}

/** What the latest fiscal year added to the running total. */
export function latestGain(series: SeriesPoint[]): number {
  if (series.length < 2) return series[0]?.value ?? 0;
  return series[series.length - 1].value - series[series.length - 2].value;
}
