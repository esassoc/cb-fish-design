// Behavior for cbf-budget-chart — builds the Vega-Lite spec and embeds it.
// Ported from Beacon's vega chart approach (vega-bar-chart.ts / vega-pie-chart.ts):
// a plain spec factory + vega-embed render. Colors are read from the live CSS
// custom properties so the chart re-skins with the spoke theme automatically.
import embed from 'vega-embed';
import { toLongFormat, SERIES } from '../../data/tributary-habitat.mjs';

/** Resolve a CSS custom property to its computed value (e.g. '--cbf-blue-700' → '#1e5386'). */
const cssVar = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export async function initBudgetChart(): Promise<void> {
  const el = document.querySelector<HTMLElement>('[data-cbf-budget-chart]');
  if (!el) return;

  // One legend keyed on the series label, driven by two encodings that share the
  // field (color + strokeDash) so Vega-Lite merges them into a single legend —
  // each swatch shows the series color AND whether it's planned (dashed) or
  // actual (solid), matching the legacy chart.
  const labels = SERIES.map((s) => s.label);
  const colors = SERIES.map((s) => cssVar(s.token) || '#1e5386');
  const dashes = SERIES.map((s) => (s.style === 'planned' ? [6, 4] : [1, 0]));

  const ink = cssVar('--color-text-secondary') || '#525252';
  const grid = cssVar('--color-border') || '#dcdcdc';
  const font = cssVar('--font-sans') || 'system-ui, sans-serif';

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    description: 'Tributary Habitat work element budget by fiscal year',
    width: 'container',
    height: 440,
    autosize: { type: 'fit', contains: 'padding' },
    background: 'transparent',
    data: { values: toLongFormat() },
    mark: {
      type: 'line',
      point: { filled: true, size: 26 },
      strokeWidth: 2.5,
      interpolate: 'linear',
    },
    encoding: {
      x: {
        field: 'year',
        type: 'quantitative',
        axis: { title: 'Fiscal Year', format: 'd', tickCount: 12, labelAngle: 0, grid: false },
        scale: { nice: false },
      },
      y: {
        field: 'amount',
        type: 'quantitative',
        axis: { title: 'Amount', labelExpr: "'$' + format(datum.value, '~s')" },
        scale: { nice: true },
      },
      color: {
        field: 'label',
        type: 'nominal',
        scale: { domain: labels, range: colors },
        legend: { orient: 'top', title: null, direction: 'horizontal', columnPadding: 16 },
      },
      strokeDash: {
        field: 'label',
        type: 'nominal',
        scale: { domain: labels, range: dashes },
        legend: { orient: 'top', title: null, direction: 'horizontal' },
      },
      tooltip: [
        { field: 'label', title: 'Series' },
        { field: 'year', title: 'FY', format: 'd' },
        { field: 'amount', title: 'Amount', format: '$,.0f' },
      ],
    },
    config: {
      view: { stroke: 'transparent' },
      font,
      axis: {
        labelColor: ink,
        titleColor: ink,
        titleFontWeight: 600,
        labelFontSize: 12,
        titleFontSize: 13,
        domainColor: grid,
        tickColor: grid,
        gridColor: grid,
      },
      legend: { labelColor: ink, labelFontSize: 13, symbolStrokeWidth: 2.5, symbolSize: 120 },
    },
  };

  // renderer:'svg' avoids the node-canvas dependency and stays crisp; actions
  // off hides the Vega export menu (this is product chrome, not a notebook).
  await embed(el, spec as Parameters<typeof embed>[1], { actions: false, renderer: 'svg' });
}
