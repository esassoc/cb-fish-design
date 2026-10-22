// All of the capital program's money math, in one pure module (PRD: "Put all
// money math in one pure module with unit tests"). Nothing here touches the DOM,
// storage or the clock — every screen and finance.test.ts call the same
// functions, so a number on screen is a number under test.
//
// Units: $000s throughout. Time: quarter SLOTS, 0 = FY24 Q1 … 27 = FY30 Q4.
import {
  CATEGORIES,
  FY_LIST,
  FY_START,
  MONTHS,
  SLOT_COUNT,
  type ActualsByFy,
  type CapitalRequest,
  type Category,
  type Envelope,
  type EnvelopeSource,
  type FrozenData,
  type GateDefinition,
  type GateKey,
  type GateRecord,
  type GateStatus,
  type LineType,
  type OmbRecord,
  type Project,
  type RequestCategory,
  type SpendPlan,
} from './types';

// ---------------------------------------------------------------------------
// Fiscal calendar
// ---------------------------------------------------------------------------

export const slotOf = (fy: number, q: number): number => (fy - FY_START) * 4 + (q - 1);
export const fyOfSlot = (slot: number): number => FY_START + Math.floor(slot / 4);
export const qOfSlot = (slot: number): number => (slot % 4) + 1;
export const slotLabel = (slot: number): string => `Q${qOfSlot(slot)} FY${String(fyOfSlot(slot)).slice(2)}`;
export const fyLabel = (fy: number): string => `FY${String(fy).slice(2)}`;

/** FY of a date: October or later belongs to the next calendar year's FY. */
export function fyOfDate(iso: string): number {
  const [y, m] = iso.split('-').map(Number);
  return m >= 10 ? y + 1 : y;
}

/** Quarter of a date: Oct–Dec Q1, Jan–Mar Q2, Apr–Jun Q3, Jul–Sep Q4. */
export function quarterOfDate(iso: string): number {
  const m = Number(iso.split('-')[1]);
  return m >= 10 ? 1 : Math.floor((m - 1) / 3) + 2;
}

/** ISO date of a quarter's last day. */
export function slotEndDate(slot: number): string {
  const fy = fyOfSlot(slot);
  switch (qOfSlot(slot)) {
    case 1: return `${fy - 1}-12-31`;
    case 2: return `${fy}-03-31`;
    case 3: return `${fy}-06-30`;
    default: return `${fy}-09-30`;
  }
}

/** A quarter is closed when its last day is on or before the "Data as of" date. */
export const isClosed = (slot: number, asOf: string): boolean => slotEndDate(slot) <= asOf;

/** First open slot, or SLOT_COUNT if every quarter in the window is closed. */
export function firstOpenSlot(asOf: string): number {
  for (let s = 0; s < SLOT_COUNT; s++) if (!isClosed(s, asOf)) return s;
  return SLOT_COUNT;
}

/** Month indexes (0 = Oct) belonging to a quarter. */
const monthsOfQuarter = (q: number): number[] => [(q - 1) * 3, (q - 1) * 3 + 1, (q - 1) * 3 + 2];

// ---------------------------------------------------------------------------
// Spreading — the team's "total divided by 8 quarters" helper
// ---------------------------------------------------------------------------

/**
 * Divide an amount into n whole-thousand parts that sum back to it exactly; the
 * remainder rides on the last part so a re-spread never loses a dollar.
 */
export function spreadEvenly(amount: number, n: number): number[] {
  if (n <= 0) return [];
  const each = Math.trunc(amount / n);
  const parts = Array(n).fill(each);
  parts[n - 1] = amount - each * (n - 1);
  return parts;
}

/** Spread by weights (e.g. [1,1,0,0] = first half only), exact to the total. */
export function spreadWeighted(amount: number, weights: number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum === 0) return weights.map(() => 0);
  const parts = weights.map((w) => Math.trunc((amount * w) / sum));
  const last = weights.map((w) => w > 0).lastIndexOf(true);
  parts[last] += amount - parts.reduce((a, b) => a + b, 0);
  return parts;
}

// ---------------------------------------------------------------------------
// Plan and actuals per project
// ---------------------------------------------------------------------------

export const emptySlots = (): number[] => Array(SLOT_COUNT).fill(0);

/** Forecast at a slot, summed across line types (or one line type). */
export function planAt(plan: SpendPlan | undefined, slot: number, lineType?: LineType): number {
  if (!plan) return 0;
  if (lineType) return plan[lineType]?.[slot] ?? 0;
  let total = 0;
  for (const row of Object.values(plan)) total += row?.[slot] ?? 0;
  return total;
}

/** Sum of actuals in a quarter. */
export function actualAt(actuals: ActualsByFy | undefined, slot: number): number {
  const months = actuals?.[fyOfSlot(slot)];
  if (!months) return 0;
  return monthsOfQuarter(qOfSlot(slot)).reduce((t, i) => t + (months[i] ?? 0), 0);
}

/** Closed quarters use actuals, open quarters use forecast. */
export function resolvedAt(plan: SpendPlan | undefined, actuals: ActualsByFy | undefined, slot: number, asOf: string): number {
  return isClosed(slot, asOf) ? actualAt(actuals, slot) : planAt(plan, slot);
}

/** FY forecast = closed-quarter actuals + open-quarter forecast. */
export function fyForecast(plan: SpendPlan | undefined, actuals: ActualsByFy | undefined, fy: number, asOf: string): number {
  if (fy < FY_START || fy > FY_LIST[FY_LIST.length - 1]) return 0;
  let t = 0;
  for (let q = 1; q <= 4; q++) t += resolvedAt(plan, actuals, slotOf(fy, q), asOf);
  return t;
}

/** What the plan said for a FY, ignoring actuals — the year-end close compares this to actuals. */
export function fyPlanned(plan: SpendPlan | undefined, fy: number): number {
  let t = 0;
  for (let q = 1; q <= 4; q++) t += planAt(plan, slotOf(fy, q));
  return t;
}

export function fyActuals(actuals: ActualsByFy | undefined, fy: number): number {
  return (actuals?.[fy] ?? []).reduce((a, b) => a + (b ?? 0), 0);
}

export function allTimeActuals(actuals: ActualsByFy | undefined): number {
  if (!actuals) return 0;
  return Object.keys(actuals).reduce((t, fy) => t + fyActuals(actuals, Number(fy)), 0);
}

/** Forecast still to spend: every open quarter. */
export function openForecast(plan: SpendPlan | undefined, asOf: string): number {
  let t = 0;
  for (let s = firstOpenSlot(asOf); s < SLOT_COUNT; s++) t += planAt(plan, s);
  return t;
}

export function modifiedBudget(p: Project): number | null {
  return p.budgetHistory.length ? p.budgetHistory[p.budgetHistory.length - 1].amount : null;
}

/** Remaining budget = modified budget − all-time actuals. */
export function remainingBudget(p: Project, actuals: ActualsByFy | undefined): number | null {
  const mod = modifiedBudget(p);
  return mod == null ? null : mod - allTimeActuals(actuals);
}

/** Overage = all-time actuals + open-quarter forecast − modified budget; > 0 warns. */
export function overage(p: Project, plan: SpendPlan | undefined, actuals: ActualsByFy | undefined, asOf: string): number {
  const mod = modifiedBudget(p);
  if (mod == null) return 0;
  return allTimeActuals(actuals) + openForecast(plan, asOf) - mod;
}

/**
 * The year-end re-forecast spreads the project's REMAINING NEED, not the FY's
 * unspent amount (Ben: a $20M hatchery that has spent $3M has $17M left, not
 * $14M). Projects with no modified budget fall back to their open forecast.
 */
export function remainingNeed(p: Project, plan: SpendPlan | undefined, actuals: ActualsByFy | undefined, asOf: string): number {
  const mod = modifiedBudget(p);
  return mod == null ? openForecast(plan, asOf) : mod - allTimeActuals(actuals);
}

// ---------------------------------------------------------------------------
// Approval pathway (R7)
// ---------------------------------------------------------------------------

export function ombGateStatus(omb: OmbRecord): GateStatus {
  switch (omb.status) {
    case 'Appropriations language approved': return 'Green';
    case 'Not required (below threshold)': return 'Not applicable';
    case 'Submitted': return 'In progress';
    default: return 'Red';
  }
}

export function npccGateStatus(step: Project['npcc'], category: RequestCategory): GateStatus {
  if (category !== 'Hatchery' || step === 'Not required') return 'Not applicable';
  if (step === 'Step 3 (final design)' || step === 'Complete') return 'Green';
  return 'In progress';
}

type Gated = { category: RequestCategory; omb: OmbRecord; npcc?: Project['npcc']; gates: Partial<Record<GateKey, GateRecord>> };

/** Status of one gate. OMB and NPCC derive from their own records; the rest are stored lights. */
export function gateStatus(item: Gated, def: GateDefinition): GateStatus {
  if (def.key === 'omb') return ombGateStatus(item.omb);
  if (def.key === 'npcc') return npccGateStatus(item.npcc ?? 'Not required', item.category);
  if (def.hatcheryOnly && item.category !== 'Hatchery') return 'Not applicable';
  return item.gates[def.key]?.status ?? 'Not started';
}

export interface Pathway {
  lights: { def: GateDefinition; status: GateStatus }[];
  applicable: number;
  green: number;
  greenlit: boolean;
}

/** "Greenlit" = every applicable gate Green. */
export function pathway(item: Gated, defs: GateDefinition[]): Pathway {
  const lights = defs.map((def) => ({ def, status: gateStatus(item, def) }));
  const applicable = lights.filter((l) => l.status !== 'Not applicable');
  const green = applicable.filter((l) => l.status === 'Green').length;
  return { lights, applicable: applicable.length, green, greenlit: applicable.length > 0 && green === applicable.length };
}

const ombClear = (omb: OmbRecord) =>
  omb.status === 'Appropriations language approved' || omb.status === 'Not required (below threshold)';

/** Red "OMB not approved" flag: construction-contract spend in an open quarter without appropriations language. */
export function hasOmbFlag(p: Project, plan: SpendPlan | undefined, asOf: string): boolean {
  if (ombClear(p.omb)) return false;
  const row = plan?.['Construction contract'];
  if (!row) return false;
  for (let s = firstOpenSlot(asOf); s < SLOT_COUNT; s++) if ((row[s] ?? 0) > 0) return true;
  return false;
}

/** Same flag on a request: any FY amount while OMB isn't approved. */
export function requestHasOmbFlag(r: CapitalRequest): boolean {
  if (ombClear(r.omb)) return false;
  return Object.values(r.amounts).some((v) => (v ?? 0) > 0);
}

/** Months between OMB submission and a date (or approval), for "waited n months". */
export function monthsWaited(omb: OmbRecord, today: string): number | null {
  if (!omb.submittedDate) return null;
  const end = omb.approvedDate ?? today;
  const [y1, m1] = omb.submittedDate.split('-').map(Number);
  const [y2, m2] = end.split('-').map(Number);
  return (y2 - y1) * 12 + (m2 - m1);
}

// ---------------------------------------------------------------------------
// Envelopes and headroom (R2)
// ---------------------------------------------------------------------------

/** Expected is 80% of Optimal in every source table; Finance allows spending up to Optimal. */
export const OPTIMAL_FACTOR = 0.8;

/**
 * Envelope for a FY/source/category. Optimal falls back to Expected ÷ 0.8 when
 * no Optimal amount was entered. Null when the source has no figure.
 */
export function envelopeAmount(envelopes: Envelope[], fy: number, source: EnvelopeSource, category: Category): number | null {
  const row = envelopes.find((e) => e.fy === fy && e.source === source);
  const v = row?.amounts[category];
  if (v != null) return v;
  if (source === 'apOptimal') {
    const exp = envelopeAmount(envelopes, fy, 'apExpected', category);
    return exp == null ? null : exp / OPTIMAL_FACTOR;
  }
  return null;
}

export function envelopeTotal(envelopes: Envelope[], fy: number, source: EnvelopeSource): number | null {
  let t = 0;
  for (const c of CATEGORIES) {
    const v = envelopeAmount(envelopes, fy, source, c);
    if (v == null) return null;
    t += v;
  }
  return t;
}

export function envelopeSourceLabel(envelopes: Envelope[], fy: number, source: EnvelopeSource): string | null {
  const row = envelopes.find((e) => e.fy === fy && e.source === source);
  if (row) return row.sourceLabel;
  if (source === 'apOptimal' && envelopes.some((e) => e.fy === fy && e.source === 'apExpected')) return 'Expected ÷ 0.8';
  return null;
}

export const OPEN_REQUEST_STATUSES = ['New', 'Under review'] as const;
export const isOpenRequest = (r: CapitalRequest) => (OPEN_REQUEST_STATUSES as readonly string[]).includes(r.status);

/** Record types whose forecast counts as committed (Active) vs. placeholder. */
export const isActiveType = (p: Project) => p.recordType === 'Active' || p.recordType === 'Complete';
export const isPlaceholderType = (p: Project) => p.recordType === 'Placeholder';

export interface HeadroomRow {
  key: Category | 'Total';
  envelope: number | null;
  /** Up-to-Optimal ceiling, Expected ÷ 0.8 unless entered. */
  optimal: number | null;
  active: number;
  placeholder: number;
  openRequests: number;
  /** Requests switched on in "what if". */
  whatIf: number;
  /** envelope − (active + placeholder + whatIf). Null when no envelope. */
  headroom: number | null;
  headroomToOptimal: number | null;
}

export interface HeadroomInput {
  data: FrozenData;
  requests: CapitalRequest[];
  envelopes: Envelope[];
  fy: number;
  source: EnvelopeSource;
  asOf: string;
  /** Request ids switched on in "what if". */
  whatIf?: string[];
}

/**
 * Headroom (FY, category) = envelope − Σ forecast of Active and Placeholder
 * projects. Requests sit beside it as their own figure and only reduce headroom
 * when "what if" switches them on. Requests with no category yet ("TBD") count
 * in the total only.
 */
export function headroom(input: HeadroomInput): HeadroomRow[] {
  const { data, requests, envelopes, fy, source, asOf } = input;
  const whatIf = new Set(input.whatIf ?? []);
  const rows: HeadroomRow[] = [];

  const sums = (cat: Category | null) => {
    let active = 0;
    let placeholder = 0;
    for (const p of data.projects) {
      if (cat && p.category !== cat) continue;
      const v = fyForecast(data.plans[p.id], data.actuals[p.id], fy, asOf);
      if (isActiveType(p)) active += v;
      else if (isPlaceholderType(p)) placeholder += v;
    }
    let open = 0;
    let wi = 0;
    for (const r of requests) {
      if (!isOpenRequest(r)) continue;
      if (cat && r.category !== cat) continue;
      const v = r.amounts[fy] ?? 0;
      open += v;
      if (whatIf.has(r.id)) wi += v;
    }
    return { active, placeholder, open, wi };
  };

  const build = (key: Category | 'Total', envelope: number | null, optimal: number | null, s: ReturnType<typeof sums>): HeadroomRow => {
    const used = s.active + s.placeholder + s.wi;
    return {
      key,
      envelope,
      optimal,
      active: s.active,
      placeholder: s.placeholder,
      openRequests: s.open,
      whatIf: s.wi,
      headroom: envelope == null ? null : envelope - used,
      headroomToOptimal: optimal == null ? null : optimal - used,
    };
  };

  for (const c of CATEGORIES) {
    rows.push(build(c, envelopeAmount(envelopes, fy, source, c), envelopeAmount(envelopes, fy, 'apOptimal', c), sums(c)));
  }
  rows.push(build('Total', envelopeTotal(envelopes, fy, source), envelopeTotal(envelopes, fy, 'apOptimal'), sums(null)));
  return rows;
}

// ---------------------------------------------------------------------------
// Snapshots and comparison (R5)
// ---------------------------------------------------------------------------

/** Per-project FY forecast across the plan window, for one frozen dataset. */
export function projectFyTotals(data: FrozenData, asOf: string): Map<string, Record<number, number>> {
  const out = new Map<string, Record<number, number>>();
  for (const p of data.projects) {
    const row: Record<number, number> = {};
    for (const fy of FY_LIST) row[fy] = fyForecast(data.plans[p.id], data.actuals[p.id], fy, asOf);
    out.set(p.id, row);
  }
  return out;
}

export interface CompareRow {
  projectId: string;
  fy: number;
  a: number;
  b: number;
  delta: number;
}

/** A-vs-B by project and FY, largest absolute delta first; zero deltas dropped unless asked. */
export function compareSnapshots(
  a: { data: FrozenData; asOf: string },
  b: { data: FrozenData; asOf: string },
  opts: { includeZero?: boolean } = {},
): CompareRow[] {
  const ta = projectFyTotals(a.data, a.asOf);
  const tb = projectFyTotals(b.data, b.asOf);
  const ids = new Set([...ta.keys(), ...tb.keys()]);
  const rows: CompareRow[] = [];
  for (const id of ids) {
    for (const fy of FY_LIST) {
      const av = ta.get(id)?.[fy] ?? 0;
      const bv = tb.get(id)?.[fy] ?? 0;
      const delta = bv - av;
      if (!opts.includeZero && Math.abs(delta) < 0.5) continue;
      if (opts.includeZero && av === 0 && bv === 0) continue;
      rows.push({ projectId: id, fy, a: av, b: bv, delta });
    }
  }
  return rows.sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta));
}

// ---------------------------------------------------------------------------
// Actuals import (R10)
// ---------------------------------------------------------------------------

export interface ImportResult {
  actuals: Record<string, ActualsByFy>;
  rowsRead: number;
  rowsMatched: number;
  unmatched: string[];
  errors: string[];
  /** project id → months replaced, for the confirmation message. */
  touched: Record<string, number>;
}

/** L6 project id = CBFish project number without dashes. */
export const l6Of = (number: string | null): string | null => (number ? number.replace(/-/g, '') : null);

/**
 * Import a Finance-shaped CSV (category_l5, project_l6, fiscal_year, month,
 * amount — whole dollars). Matching rows REPLACE actuals for that project-month;
 * unmatched project ids are listed for review. Returns a new actuals map.
 */
export function importActualsCsv(csv: string, projects: Project[], current: Record<string, ActualsByFy>): ImportResult {
  const byL6 = new Map<string, string>();
  for (const p of projects) {
    const l6 = l6Of(p.number);
    if (l6) byL6.set(l6, p.id);
  }
  const actuals: Record<string, ActualsByFy> = structuredClone(current);
  const result: ImportResult = { actuals, rowsRead: 0, rowsMatched: 0, unmatched: [], errors: [], touched: {} };
  const unmatched = new Set<string>();

  const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return result;
  const header = lines[0].toLowerCase().split(',').map((h) => h.trim());
  const col = (name: string) => header.indexOf(name);
  const iL6 = col('project_l6');
  const iFy = col('fiscal_year');
  const iMonth = col('month');
  const iAmount = col('amount');
  if ([iL6, iFy, iMonth, iAmount].some((i) => i < 0)) {
    result.errors.push('Expected columns: category_l5, project_l6, fiscal_year, month, amount.');
    return result;
  }

  for (const line of lines.slice(1)) {
    const cells = line.split(',').map((c) => c.trim());
    result.rowsRead += 1;
    const l6 = cells[iL6];
    const fy = Number(cells[iFy]);
    const mi = MONTHS.findIndex((m) => m.toLowerCase() === (cells[iMonth] ?? '').slice(0, 3).toLowerCase());
    const dollars = Number(cells[iAmount]);
    if (!Number.isFinite(fy) || mi < 0 || !Number.isFinite(dollars)) {
      result.errors.push(`Row ${result.rowsRead + 1}: could not read "${line}".`);
      continue;
    }
    const id = byL6.get(l6);
    if (!id) {
      unmatched.add(l6);
      continue;
    }
    const proj = (actuals[id] ??= {});
    const months = (proj[fy] ??= Array(12).fill(0));
    months[mi] = dollars / 1000;
    result.rowsMatched += 1;
    result.touched[id] = (result.touched[id] ?? 0) + 1;
  }
  result.unmatched = [...unmatched];
  return result;
}

/** Build a Finance-shaped CSV (whole dollars) from actuals — the shipped sample. */
export function actualsToCsv(projects: Project[], actuals: Record<string, ActualsByFy>, fy: number, ids?: string[]): string {
  const out = ['category_l5,project_l6,fiscal_year,month,amount'];
  const l5: Record<Category, string> = { Hatchery: '0005510', Land: '0005509', Passage: '0005511' };
  for (const p of projects) {
    if (ids && !ids.includes(p.id)) continue;
    const l6 = l6Of(p.number);
    const months = actuals[p.id]?.[fy];
    if (!l6 || !months) continue;
    months.forEach((v, i) => {
      if (v) out.push(`${l5[p.category]},${l6},${fy},${MONTHS[i]},${Math.round(v * 1000)}`);
    });
  }
  return out.join('\n');
}

// ---------------------------------------------------------------------------
// Display
// ---------------------------------------------------------------------------

const intFmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

/** $000s, whole thousands, thousands separators, negatives in parentheses. */
export function fmtK(v: number | null | undefined, opts: { zero?: string; empty?: string } = {}): string {
  if (v == null || Number.isNaN(v)) return opts.empty ?? '—';
  const r = Math.round(v);
  if (r === 0) return opts.zero ?? '0';
  return r < 0 ? `(${intFmt.format(-r)})` : intFmt.format(r);
}

/** $000s as a headline: 48,415 → "$48.4M". */
export function fmtMillions(v: number | null | undefined): string {
  if (v == null) return '—';
  const m = Math.round(v / 100) / 10;
  return m < 0 ? `($${Math.abs(m).toFixed(1)}M)` : `$${m.toFixed(1)}M`;
}

export function fmtPct(v: number | null | undefined): string {
  if (v == null || !Number.isFinite(v)) return '—';
  return `${Math.round(v * 100)}%`;
}

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
export const fmtDate = (iso?: string | null): string => (iso ? dateFmt.format(new Date(`${iso.slice(0, 10)}T00:00:00Z`)) : '—');
