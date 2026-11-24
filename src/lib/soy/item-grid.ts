// The SOY item grid — one column vocabulary and one AG Grid bootstrap shared by
// the Items workspace (cbf-soy-items) and Final decisions (cbf-soy-finals), so
// the two tables can't drift apart. Columns are chosen by key; every grid gets
// header filters (floating filters), a pinned total row, optional checkbox
// selection, and opens the item side panel on row click.
import { createGrid, type ColDef, type GridApi, type RowSelectionOptions } from 'ag-grid-community';
import { cbfGridTheme } from '../../components/shared/grid-chrome';
import { openItem } from './store';
import { amount, isOffYear, isTwoYear, negotiation, negotiationLabel, pmDelta, project, transferStatus, transferred, hasTransfers } from './model';
import { deltaHtml, esc, moneyHtml, pill, statusPill } from './ui';
import type { SoyItem } from './types';

export interface GridRow {
  id: string;
  item?: SoyItem;
  /** Pinned total row: sums by column key. */
  sums?: Partial<Record<ColKey, number>>;
  label?: string;
}

export type ColKey =
  | 'number' | 'title' | 'emphasis' | 'fund' | 'pm'
  | 'priorWorking' | 'priorBaseline' | 'baseline'
  | 'ewb' | 'pmAmt' | 'diff' | 'final' | 'transferred' | 'finalSet' | 'status' | 'flags'
  | 'negotiation' | 'assignee';

const MONEY: ColKey[] = ['priorWorking', 'priorBaseline', 'baseline', 'ewb', 'pmAmt', 'diff', 'final', 'transferred'];

/** The number a money column shows for an item. */
export function moneyOf(item: SoyItem, key: ColKey): number | null {
  switch (key) {
    case 'priorWorking': return item.priorWorking;
    case 'priorBaseline': return item.priorBaseline;
    case 'baseline': return item.baseline;
    case 'ewb': return amount(item, 'ewb');
    case 'pmAmt': return amount(item, 'pm');
    case 'diff': return pmDelta(item);
    case 'final': return amount(item, 'final');
    case 'transferred': return hasTransfers(item) ? transferred(item) : null;
    default: return null;
  }
}

export function flagsHtml(item: SoyItem): string {
  const out: string[] = [];
  if (isTwoYear(item)) out.push(`<span data-change="it-two-year">${pill(isOffYear(item) ? 'Two-year · off' : 'Two-year · on', 'info', { size: 'xs', title: isOffYear(item) ? 'Off year: $0 automatically' : 'On year: suggested amount is annual × 2, plus inflation' })}</span>`);
  if (item.isNew) out.push(pill('New', 'primary', { size: 'xs' }));
  if (item.followUp) out.push(pill('Follow-up', 'warning', { size: 'xs' }));
  if (item.changedAfterTransfer && transferStatus(item) !== 'Transferred') out.push(pill('Changed after transfer', 'danger', { size: 'xs' }));
  return `<span class="cbf-soy-cell-actions">${out.join('')}</span>`;
}

/** "Round 2 · with PM" while open; "Settled" once a final closed it. */
export function negotiationHtml(item: SoyItem): string {
  const n = negotiation(item);
  if (!n) return '';
  if (!n.active) return pill(`Settled · ${n.round} ${n.round === 1 ? 'round' : 'rounds'}`, 'default', { size: 'xs' });
  return pill(negotiationLabel(n), n.assigneeRole === 'leader' ? 'warning' : n.assigneeRole === 'pm' ? 'info' : 'primary', { size: 'xs' });
}
const negotiationText = (item: SoyItem) => {
  const n = negotiation(item);
  return !n ? '' : n.active ? negotiationLabel(n) : 'Settled';
};

const flagText = (item: SoyItem) => [
  isTwoYear(item) ? (isOffYear(item) ? 'Two-year off' : 'Two-year on') : '',
  item.isNew ? 'New' : '', item.followUp ? 'Follow-up' : '',
  item.changedAfterTransfer && transferStatus(item) !== 'Transferred' ? 'Changed after transfer' : '',
].filter(Boolean).join('; ');

export function columns(keys: ColKey[], fy: number): ColDef<GridRow>[] {
  const prior = fy - 1;
  const money = (key: ColKey, headerName: string, width = 132): ColDef<GridRow> => ({
    colId: key, headerName, width, type: 'rightAligned', cellClass: 'cbf-soy-num',
    filter: 'agNumberColumnFilter',
    valueGetter: (p) => (p.data?.item ? moneyOf(p.data.item, key) : p.data?.sums?.[key] ?? null),
    cellRenderer: (p: { value: number | null; data: GridRow }) => key === 'diff' ? deltaHtml(p.value) : moneyHtml(p.value),
  });
  const text = (key: ColKey, headerName: string, width: number, get: (i: SoyItem) => string, extra: Partial<ColDef<GridRow>> = {}): ColDef<GridRow> => ({
    colId: key, headerName, width, filter: 'agTextColumnFilter',
    valueGetter: (p) => (p.data?.item ? get(p.data.item) : ''),
    ...extra,
  });
  const defs: Record<ColKey, ColDef<GridRow>> = {
    number: text('number', 'Project', 150, (i) => i.projectNumber, {
      pinned: 'left',
      cellRenderer: (p: { value: string; data: GridRow }) => p.data.item
        ? `<a href="#" class="cbf-grid-link" data-soy-open="${esc(p.data.item.id)}">${esc(p.value)}</a>`
        : `<strong>${esc(p.data.label ?? 'Total')}</strong>`,
    }),
    title: text('title', 'Title', 300, (i) => project(i).title, { tooltipValueGetter: (p) => (p.data?.item ? project(p.data.item).title : '') }),
    emphasis: text('emphasis', 'Emphasis', 170, (i) => project(i).emphasis),
    fund: text('fund', 'Fund', 150, (i) => i.fund),
    pm: text('pm', 'PM', 160, (i) => project(i).pm),
    priorWorking: money('priorWorking', `FY${prior} working`),
    priorBaseline: money('priorBaseline', `FY${prior} baseline`),
    baseline: money('baseline', `FY${fy} baseline`),
    ewb: money('ewb', 'EWB proposed'),
    pmAmt: money('pmAmt', 'PM proposed'),
    diff: money('diff', 'PM − EWB', 120),
    final: money('final', 'Final'),
    transferred: money('transferred', 'Transferred'),
    finalSet: text('finalSet', 'Final set?', 110, (i) => (i.amounts.final ? 'Set' : 'Not set'), {
      cellRenderer: (p: { value: string; data: GridRow }) => (p.data.item ? pill(p.value, p.value === 'Set' ? 'success' : 'default', { size: 'xs' }) : ''),
    }),
    status: text('status', 'Transfer status', 180, (i) => transferStatus(i), {
      cellRenderer: (p: { data: GridRow }) => (p.data.item ? statusPill(transferStatus(p.data.item)) : ''),
    }),
    negotiation: text('negotiation', 'Negotiation', 200, negotiationText, {
      cellRenderer: (p: { data: GridRow }) => (p.data.item ? `<span data-change="it-negotiation">${negotiationHtml(p.data.item)}</span>` : ''),
    }),
    assignee: text('assignee', 'Assigned to', 170, (i) => { const n = negotiation(i); return n?.active ? n.assignee : ''; }),
    flags: text('flags', 'Flags', 220, flagText, {
      sortable: false,
      cellRenderer: (p: { data: GridRow }) => (p.data.item ? flagsHtml(p.data.item) : ''),
    }),
  };
  return keys.map((k) => defs[k]);
}

export function totalRow(items: SoyItem[], keys: ColKey[], label = 'Total'): GridRow {
  const sums: Partial<Record<ColKey, number>> = {};
  for (const k of keys) {
    if (!MONEY.includes(k)) continue;
    let sum = 0;
    let any = false;
    for (const i of items) {
      const v = moneyOf(i, k);
      if (v != null) { sum += v; any = true; }
    }
    if (any) sums[k] = sum;
  }
  return { id: 'total', sums, label };
}

export const SELECTION: RowSelectionOptions<GridRow> = {
  mode: 'multiRow',
  checkboxes: true,
  headerCheckbox: true,
  selectAll: 'filtered',
  enableClickSelection: false,
  isRowSelectable: (node) => !!node.data?.item,
};

export function createItemGrid(host: HTMLElement): GridApi<GridRow> {
  const api = createGrid<GridRow>(host, {
    theme: cbfGridTheme,
    rowData: [],
    columnDefs: [],
    domLayout: 'autoHeight',
    pagination: true,
    paginationPageSize: 50,
    paginationPageSizeSelector: [25, 50, 100, 250],
    animateRows: false,
    suppressCellFocus: true,
    tooltipShowDelay: 400,
    defaultColDef: { sortable: true, resizable: true, floatingFilter: true, suppressHeaderMenuButton: true },
    selectionColumnDef: { pinned: 'left', width: 48, suppressHeaderMenuButton: true },
    getRowId: (p) => p.data.id,
    onRowClicked: (e) => {
      const t = e.event?.target as HTMLElement | undefined;
      if (!e.data?.item || t?.closest('.ag-selection-checkbox, .ag-checkbox, input')) return;
      e.event?.preventDefault();
      openItem(e.data.item.id);
    },
  });
  return api;
}

/** CSV export with plain values (no HTML), money as whole dollars. */
export function exportCsv(api: GridApi<GridRow>, fileName: string): void {
  api.exportDataAsCsv({
    fileName,
    processCellCallback: (p) => {
      const v = p.value;
      if (typeof v === 'number') return String(Math.round(v));
      return v ?? '';
    },
  });
}

/** Items currently selected (pinned rows are never selectable). */
export const selectedItems = (api: GridApi<GridRow>): SoyItem[] => api.getSelectedRows().map((r) => r.item!).filter(Boolean);

/** Items shown after filters, in display order. */
export function shownItems(api: GridApi<GridRow>): SoyItem[] {
  const out: SoyItem[] = [];
  api.forEachNodeAfterFilterAndSort((n) => { if (n.data?.item) out.push(n.data.item); });
  return out;
}
