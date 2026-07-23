// Shared AG Grid chrome — the token-mapped theme, small formatting helpers,
// and the common grid-bootstrap wiring every themed AG Grid in this spoke
// needs. Promoted from crs-commitments/ to shared/ when
// cbf-rme-work-elements-grid became a second feature area to consume it
// (same promotion cbf-report-tabs went through) — nothing here was ever
// CRS-specific, only its old folder was. wireDataGrid() was added when a
// third grid made the create/search/CSV/count-footer bootstrap (previously
// copy-pasted into each grid's own client script) start drifting apart —
// flagged by the /design-qa decomposition review.
import { createGrid, ModuleRegistry, AllCommunityModule, themeQuartz, type ColDef, type GridApi, type GridOptions } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

// AG Grid Theming API mapped onto the spoke's semantic tokens — every themed
// grid reads like the rest of the surfaces instead of shipping its own palette.
export const cbfGridTheme = themeQuartz.withParams({
  fontFamily: 'inherit',
  fontSize: '14px',
  foregroundColor: 'var(--color-text-primary)',
  backgroundColor: 'var(--color-surface)',
  headerBackgroundColor: 'var(--color-surface-sunken, transparent)',
  headerTextColor: 'var(--color-text-secondary)',
  headerFontWeight: 600,
  borderColor: 'var(--color-border)',
  rowHoverColor: 'var(--color-surface-subtle, var(--color-primary-subtle))',
  accentColor: 'var(--color-primary)',
  wrapperBorderRadius: 0,
  borderRadius: 'var(--radius-100, 4px)',
});

/** Renders a Date back to a readable "Oct 1, 2020" form (more scannable than a raw slashed string). */
export const gridDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

/** Parses a source M/D/YYYY string to a Date so date columns sort chronologically; blank/invalid -> null. */
export function asGridDate(s?: string): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Escapes text dropped into a cellRenderer's HTML string. */
export function escGridHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface DataGridWiring<T> {
  root: HTMLElement;
  /** Selector for the empty div AG Grid mounts into. */
  gridSelector: string;
  /** Selector for the <script type="application/json"> element carrying serialized row data. */
  dataSelector: string;
  columnDefs: ColDef[];
  /** Plural noun for the count footer, e.g. "commitments" -> "Showing 3 of 16 commitments". */
  countNoun: string;
  csvFileName: string;
  searchSelector?: string;
  countSelector?: string;
  csvSelector?: string;
  /** Read-only grids (no cell editing) suppress the cell focus ring; editable grids need it. */
  suppressCellFocus?: boolean;
  /** Extra grid-level callbacks a specific grid needs on top of the common
   *  bootstrap (isExternalFilterPresent/doesExternalFilterPass for chip
   *  filters, onCellValueChanged for inline editing, etc.). Merged in after
   *  the common options — must not redeclare rowData/columnDefs/onModelUpdated. */
  gridOptions?: Partial<GridOptions<T>>;
}

export interface DataGridHandle<T> {
  gridApi: GridApi<T>;
  /** The live row-data array — mutate in place (unshift/push) then call
   *  gridApi.applyTransaction and bump countState.total to keep the footer in sync. */
  data: T[];
  countState: { total: number };
}

/**
 * Wires up the create-grid + quick-search + CSV-export + count-footer
 * bootstrap every themed AG Grid data grid in this spoke shares. A caller
 * still owns and passes its own columnDefs and any grid-specific extras
 * (external chip filters, cell-edit callbacks) via `gridOptions` — this only
 * owns the parts that were identical across all three grids.
 */
export function wireDataGrid<T = unknown>(opts: DataGridWiring<T>): DataGridHandle<T> | null {
  const gridHost = opts.root.querySelector<HTMLElement>(opts.gridSelector);
  const dataEl = opts.root.querySelector<HTMLScriptElement>(opts.dataSelector);
  if (!gridHost || !dataEl) return null;

  const data: T[] = JSON.parse(dataEl.textContent ?? '[]');
  const countState = { total: data.length };

  const search = opts.searchSelector ? opts.root.querySelector<HTMLInputElement>(opts.searchSelector) : null;
  const count = opts.countSelector ? opts.root.querySelector<HTMLElement>(opts.countSelector) : null;
  const csvBtn = opts.csvSelector ? opts.root.querySelector<HTMLElement>(opts.csvSelector) : null;

  let gridApi: GridApi<T>;
  gridApi = createGrid(gridHost, {
    theme: cbfGridTheme,
    rowData: data,
    domLayout: 'autoHeight',
    animateRows: false,
    suppressCellFocus: opts.suppressCellFocus ?? false,
    defaultColDef: { sortable: true, resizable: true, suppressHeaderMenuButton: true, getQuickFilterText: () => '' },
    columnDefs: opts.columnDefs,
    onModelUpdated: () => {
      let shown = 0;
      gridApi.forEachNodeAfterFilterAndSort(() => { shown += 1; });
      if (count) count.textContent = `Showing ${shown} of ${countState.total} ${opts.countNoun}`;
    },
    ...opts.gridOptions,
  });

  search?.addEventListener('input', () => {
    gridApi.setGridOption('quickFilterText', (search.value ?? '').trim());
  });

  csvBtn?.addEventListener('click', () => {
    gridApi.exportDataAsCsv({ fileName: opts.csvFileName });
  });

  return { gridApi, data, countState };
}
