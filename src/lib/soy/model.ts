// Pure reads, money math and formatting for the SOY prototype. No DOM, no
// store — every screen derives what it shows from the state through these.
import { ADMIN, PROJECTS } from '../../data/soy/seed';
import type { AmountStage, PartyRole, Project, SoyCycle, SoyItem, StageDates, StageKey } from './types';
import { STAGES } from './types';

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
/** "$1,234,567" — negatives as "−$1,234". */
export const fmtMoney = (n: number | null | undefined, empty = '—'): string => {
  if (n == null) return empty;
  return n < 0 ? `−${usd.format(-n)}` : usd.format(n);
};
/** "$326.6M" / "$840K". */
export const fmtShort = (n: number | null | undefined, empty = '—'): string => {
  if (n == null) return empty;
  const a = Math.abs(n);
  const sign = n < 0 ? '−' : '';
  if (a >= 1e6) return `${sign}$${(a / 1e6).toFixed(1)}M`;
  if (a >= 1e3) return `${sign}$${Math.round(a / 1e3)}K`;
  return `${sign}$${Math.round(a)}`;
};
export const fmtPct = (r: number): string => `${(r * 100).toFixed(r * 100 % 1 === 0 ? 0 : 1)}%`;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "Mar 1, 2027". */
export const fmtDate = (iso: string | null | undefined): string => {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};
/** "Mar 1". */
export const fmtDay = (iso: string): string => {
  const [, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}`;
};
const toDate = (iso: string) => new Date(`${iso}T12:00:00Z`);
export const addDays = (iso: string, n: number): string => {
  const d = toDate(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
export const daysBetween = (a: string, b: string): number => Math.round((toDate(b).getTime() - toDate(a).getTime()) / 86_400_000);

export const fyShort = (fy: number) => `FY${String(fy).slice(2)}`;

// ---------------------------------------------------------------------------
// Stages and dates
// ---------------------------------------------------------------------------

export const stageIndex = (k: StageKey | null): number => (k ? STAGES.findIndex((s) => s.key === k) : -1);
export const nextStage = (k: StageKey | null): StageKey | null => {
  const i = stageIndex(k);
  return i < 0 ? 'ewb' : STAGES[i + 1]?.key ?? null;
};

/** A stage is due the day before the next one opens; Complete is due on its own date. */
export function stageDue(dates: StageDates, k: StageKey): string {
  if (k === 'ewb') return addDays(dates.pm, -1);
  if (k === 'pm') return addDays(dates.final, -1);
  if (k === 'final') return addDays(dates.complete, -1);
  return dates.complete;
}

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

export const project = (item: { projectNumber: string }): Project => PROJECTS[item.projectNumber];
export const amount = (item: SoyItem, k: AmountStage): number | null => item.amounts[k]?.amount ?? null;
export const transferred = (item: SoyItem): number => item.transfers.reduce((s, t) => s + t.amount, 0);
export const hasTransfers = (item: SoyItem) => item.transfers.length > 0;
export const isOffYear = (item: SoyItem) => project(item).cycleType === 'Two-year' && !!(item.offYear ?? project(item).offYear);
export const isTwoYear = (item: SoyItem) => project(item).cycleType === 'Two-year';

export type TransferStatus = 'No final amount' | 'Not transferred' | 'Transferred' | 'Changed after transfer' | 'Partially transferred';

export function transferStatus(item: SoyItem): TransferStatus {
  const f = amount(item, 'final');
  const t = transferred(item);
  if (!hasTransfers(item)) return f == null ? 'No final amount' : f === 0 ? 'Transferred' : 'Not transferred';
  if (f != null && Math.round(f) === Math.round(t)) return 'Transferred';
  return item.changedAfterTransfer ? 'Changed after transfer' : 'Partially transferred';
}

/** Final − transferred, for items that have both a final amount and at least one transfer. */
export const variance = (item: SoyItem): number => {
  const f = amount(item, 'final');
  if (f == null || !hasTransfers(item)) return 0;
  return f - transferred(item);
};

/** PM − EWB, when both exist. */
export const pmDelta = (item: SoyItem): number | null => {
  const e = amount(item, 'ewb');
  const p = amount(item, 'pm');
  return e == null || p == null ? null : p - e;
};

/** Does this item still need input in the given stage? Off-year two-year items never do ($0 is automatic). */
export function needsInput(item: SoyItem, stage: StageKey | null): boolean {
  if (!stage || stage === 'complete') return false;
  if (isOffYear(item)) return false;
  return item.amounts[stage] == null;
}

/** The suggested on-year amount for a two-year item: annual × 2, plus inflation (DEC 7). */
export function twoYearSuggestion(priorAnnual: number | null, inflation: number): number | null {
  if (priorAnnual == null) return null;
  return Math.round((priorAnnual * 2 * (1 + inflation)) / 100) * 100;
}

// ---------------------------------------------------------------------------
// Cycle roll-ups
// ---------------------------------------------------------------------------

export interface CycleTotals {
  items: number;
  baseline: number;
  ewbCount: number;
  ewb: number;
  pmCount: number;
  pm: number;
  finalCount: number;
  final: number;
  transferred: number;
  transferredCount: number;
  varianceItems: number;
  variance: number;
  needsInput: number;
  /** Items expected to get PM input in the PM stage (off-year excluded). */
  pmExpected: number;
}

export function totals(cycle: SoyCycle): CycleTotals {
  const t: CycleTotals = {
    items: cycle.items.length, baseline: 0, ewbCount: 0, ewb: 0, pmCount: 0, pm: 0, finalCount: 0, final: 0,
    transferred: 0, transferredCount: 0, varianceItems: 0, variance: 0, needsInput: 0, pmExpected: 0,
  };
  for (const i of cycle.items) {
    t.baseline += i.baseline ?? 0;
    const e = amount(i, 'ewb'); if (e != null) { t.ewbCount++; t.ewb += e; }
    const p = amount(i, 'pm'); if (p != null) { t.pmCount++; t.pm += p; }
    const f = amount(i, 'final'); if (f != null) { t.finalCount++; t.final += f; }
    const tr = transferred(i);
    if (hasTransfers(i)) { t.transferredCount++; t.transferred += tr; }
    const v = variance(i);
    if (Math.round(v) !== 0) { t.varianceItems++; t.variance += v; }
    if (needsInput(i, cycle.stage)) t.needsInput++;
    if (!isOffYear(i)) t.pmExpected++;
  }
  return t;
}

/** PMs with items still needing input in the active stage, most outstanding first. */
export function outstandingByPm(cycle: SoyCycle): { pm: string; items: SoyItem[] }[] {
  const map = new Map<string, SoyItem[]>();
  for (const i of cycle.items) {
    if (!needsInput(i, cycle.stage)) continue;
    const pm = project(i).pm;
    map.set(pm, [...(map.get(pm) ?? []), i]);
  }
  return [...map.entries()].map(([pm, items]) => ({ pm, items })).sort((a, b) => b.items.length - a.items.length || a.pm.localeCompare(b.pm));
}

export interface CloseCheck {
  key: 'finals' | 'transfers' | 'variance';
  label: string;
  ok: boolean;
  detail: string;
}

export function closeChecks(cycle: SoyCycle): CloseCheck[] {
  const noFinal = cycle.items.filter((i) => amount(i, 'final') == null);
  const notTransferred = cycle.items.filter((i) => { const f = amount(i, 'final'); return f != null && f !== 0 && !hasTransfers(i); });
  const varianceItems = cycle.items.filter((i) => Math.round(variance(i)) !== 0);
  return [
    {
      key: 'finals', label: 'Every project has a final amount or is explicitly $0', ok: noFinal.length === 0,
      detail: noFinal.length ? `${noFinal.length} projects have no final amount` : `All ${cycle.items.length} projects have a final amount`,
    },
    {
      key: 'transfers', label: 'Every final amount is transferred', ok: notTransferred.length === 0,
      detail: notTransferred.length ? `${notTransferred.length} projects are not transferred yet` : 'All final amounts are transferred',
    },
    {
      key: 'variance', label: 'Final and transferred amounts match', ok: varianceItems.length === 0,
      detail: varianceItems.length
        ? `${varianceItems.length} projects differ by ${fmtMoney(varianceItems.reduce((s, i) => s + variance(i), 0))}`
        : 'No variance',
    },
  ];
}

/** "FY28 SOY – Round 1 – 2027-06-01" (DEC 8). */
export const suggestDecisionName = (fy: number, round: number, date: string) => `${fyShort(fy)} SOY – Round ${round} – ${date}`;

// ---------------------------------------------------------------------------
// Negotiation — back and forth between EWB, the PM and decision makers
// ---------------------------------------------------------------------------

export const PARTY_LABEL: Record<PartyRole, string> = { admin: 'Budget administrator', pm: 'Project manager', leader: 'Decision maker' };
/** Short "with …" form for pills: "Round 2 · with PM". */
export const PARTY_SHORT: Record<PartyRole, string> = { admin: 'EWB', pm: 'PM', leader: 'decision maker' };

export interface NegotiationState {
  /** In negotiation right now (open thread, or PM ≠ EWB with no final yet). */
  active: boolean;
  /** Had a negotiation that a final amount settled. */
  resolved: boolean;
  assignee: string;
  assigneeRole: PartyRole;
  round: number;
  /** PM proposed − EWB proposed. */
  gap: number | null;
  /** When the ball last moved (or the PM proposal, if nobody has assigned it yet). */
  since: string | null;
}

/**
 * Where a project's negotiation stands. A project is in negotiation when its
 * thread is open, or when the PM proposed a different amount from EWB and no
 * final is set yet — until someone assigns it, the ball sits with the budget
 * administrator.
 */
export function negotiation(item: SoyItem): NegotiationState | null {
  const n = item.negotiation;
  const gap = pmDelta(item);
  const hasFinal = item.amounts.final != null;
  if (n) {
    const last = n.thread[n.thread.length - 1];
    return {
      active: n.status === 'open' && !hasFinal, resolved: n.status === 'resolved' || hasFinal,
      assignee: n.assignee, assigneeRole: n.assigneeRole, round: n.round, gap, since: last?.date ?? null,
    };
  }
  if (gap == null || Math.round(gap) === 0 || hasFinal) return null;
  return { active: true, resolved: false, assignee: ADMIN, assigneeRole: 'admin', round: 1, gap, since: item.amounts.pm?.date ?? null };
}

export const inNegotiation = (item: SoyItem): boolean => !!negotiation(item)?.active;

/** "Round 2 · with PM". */
export const negotiationLabel = (n: NegotiationState): string => `Round ${n.round} · with ${PARTY_SHORT[n.assigneeRole]}`;
