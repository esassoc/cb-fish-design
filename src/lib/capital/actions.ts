// Capital program state changes — pure functions over a CapitalState, so the
// rules ("every budget change writes an Adjustment", "a snapshot is a frozen
// copy", "re-forecast the remaining need") are tested without a browser. The
// client store (store.ts) wraps each in persist + notify; nothing here knows
// about storage or the DOM.
import {
  emptySlots,
  firstOpenSlot,
  fyOfSlot,
  importActualsCsv,
  modifiedBudget,
  qOfSlot,
  remainingNeed,
  slotOf,
  spreadEvenly,
} from './finance';
import {
  SLOT_COUNT,
  type AdjustmentType,
  type CapitalRequest,
  type CapitalState,
  type Category,
  type EnvelopeSource,
  type GateKey,
  type GateRecord,
  type LineType,
  type OmbRecord,
  type Project,
  type RecordType,
  type Snapshot,
  type SnapshotType,
  type VarianceReason,
} from './types';

const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export function findProject(state: CapitalState, id: string): Project {
  const p = state.projects.find((x) => x.id === id);
  if (!p) throw new Error(`No project ${id}`);
  return p;
}

// ---------------------------------------------------------------------------
// Spending plan (R4)
// ---------------------------------------------------------------------------

function line(state: CapitalState, projectId: string, lineType: LineType): number[] {
  const plan = (state.plans[projectId] ??= {});
  return (plan[lineType] ??= emptySlots());
}

export function setPlanCell(state: CapitalState, projectId: string, lineType: LineType, slot: number, amount: number): void {
  line(state, projectId, lineType)[slot] = amount;
}

/** "Spread evenly": replace a range of quarters with an amount divided across them. */
export function spreadIntoPlan(state: CapitalState, projectId: string, lineType: LineType, amount: number, fromSlot: number, toSlot: number): void {
  const lo = Math.min(fromSlot, toSlot);
  const hi = Math.max(fromSlot, toSlot);
  const parts = spreadEvenly(amount, hi - lo + 1);
  const row = line(state, projectId, lineType);
  parts.forEach((v, i) => { row[lo + i] = v; });
}

export interface MoveInput {
  projectId: string;
  lineType: LineType;
  amount: number;
  fromSlot: number;
  toSlot: number;
  type: AdjustmentType;
  reason: string;
  varianceReason?: VarianceReason;
  docRef?: string;
  docUrl?: string;
  user: string;
  date: string;
}

/** Move money between quarters (and so between FYs) — always logged. */
export function moveMoney(state: CapitalState, m: MoveInput): void {
  const row = line(state, m.projectId, m.lineType);
  row[m.fromSlot] -= m.amount;
  row[m.toSlot] += m.amount;
  state.adjustments.unshift({
    id: uid('adj'), projectId: m.projectId, type: m.type, amount: m.amount, fromSlot: m.fromSlot, toSlot: m.toSlot,
    reason: m.reason, varianceReason: m.varianceReason, docRef: m.docRef, docUrl: m.docUrl, user: m.user, date: m.date,
  });
}

// ---------------------------------------------------------------------------
// Budget (R3, R9)
// ---------------------------------------------------------------------------

export interface BudgetChangeInput {
  projectId: string;
  amount: number;
  type: AdjustmentType;
  reason: string;
  decisionRef?: string;
  docUrl?: string;
  approvedBy?: string;
  user: string;
  date: string;
}

/** A modified-budget change appends to the history and writes its Adjustment. */
export function changeBudget(state: CapitalState, c: BudgetChangeInput): void {
  const p = findProject(state, c.projectId);
  const before = modifiedBudget(p) ?? p.originalBudget ?? 0;
  if (p.originalBudget == null && !p.budgetHistory.length) p.originalBudget = c.amount;
  p.budgetHistory.push({ date: c.date, amount: c.amount, reason: c.reason, decisionRef: c.decisionRef });
  if (p.pendingBudget != null && p.pendingBudget === c.amount) p.pendingBudget = null;
  state.adjustments.unshift({
    id: uid('adj'), projectId: c.projectId, type: c.type, amount: c.amount - before, reason: c.reason,
    docRef: c.decisionRef, docUrl: c.docUrl, approvedBy: c.approvedBy, user: c.user, date: c.date,
  });
}

// ---------------------------------------------------------------------------
// Pathway (R7)
// ---------------------------------------------------------------------------

type Gated = Project | CapitalRequest;

export function findGated(state: CapitalState, kind: 'project' | 'request', id: string): Gated {
  const item = kind === 'project' ? state.projects.find((p) => p.id === id) : state.requests.find((r) => r.id === id);
  if (!item) throw new Error(`No ${kind} ${id}`);
  return item;
}

export function setGate(state: CapitalState, kind: 'project' | 'request', id: string, key: GateKey, patch: Partial<GateRecord>): void {
  const item = findGated(state, kind, id);
  item.gates[key] = { ...(item.gates[key] ?? { status: 'Not started' }), ...patch } as GateRecord;
}

export function setOmb(state: CapitalState, kind: 'project' | 'request', id: string, patch: Partial<OmbRecord>): void {
  const item = findGated(state, kind, id);
  item.omb = { ...item.omb, ...patch };
}

export function setNpcc(state: CapitalState, id: string, step: Project['npcc']): void {
  findProject(state, id).npcc = step;
}

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------

export function addNote(state: CapitalState, projectId: string, text: string, author: string, date: string): void {
  const fy = date >= `${date.slice(0, 4)}-10-01` ? Number(date.slice(0, 4)) + 1 : Number(date.slice(0, 4));
  const m = Number(date.slice(5, 7));
  const q = m >= 10 ? 1 : Math.floor((m - 1) / 3) + 2;
  state.notes.unshift({ id: uid('note'), projectId, fy, q, text, author, date });
}

// ---------------------------------------------------------------------------
// Snapshots (R5)
// ---------------------------------------------------------------------------

export interface SnapshotInput {
  label: string;
  type: SnapshotType;
  asOf: string;
  createdBy: string;
  createdAt: string;
}

/** Freeze every spend plan, budget and gate. A deep copy — later edits never reach it. */
export function takeSnapshot(state: CapitalState, s: SnapshotInput): Snapshot {
  const snap: Snapshot = {
    id: uid('snap'),
    ...s,
    data: structuredClone({ projects: state.projects, plans: state.plans, actuals: state.actuals }),
  };
  state.snapshots.push(snap);
  return snap;
}

/** One snapshot per FY is the Asset Plan baseline. */
export function setBaseline(state: CapitalState, snapshotId: string, fy: number): void {
  for (const s of state.snapshots) if (s.baselineFy === fy) delete s.baselineFy;
  const snap = state.snapshots.find((s) => s.id === snapshotId);
  if (snap) snap.baselineFy = fy;
}

// ---------------------------------------------------------------------------
// Requests (R6)
// ---------------------------------------------------------------------------

export function newRequest(createdAt: string, requester: string): CapitalRequest {
  return {
    id: uid('req'),
    title: '',
    requester,
    category: 'TBD',
    source: 'Internal',
    omb: { status: 'Not submitted' },
    amounts: {},
    status: 'New',
    targetCycle: 'FY28 Asset Plan',
    gates: {
      leadership: { status: 'Not started' },
      capitalization: { status: 'Not started' },
      funding: { status: 'Not started' },
      assetPlan: { status: 'Not started' },
      cbfishBudget: { status: 'Not started' },
    },
    createdAt,
  };
}

export function upsertRequest(state: CapitalState, r: CapitalRequest): void {
  const i = state.requests.findIndex((x) => x.id === r.id);
  if (i >= 0) state.requests[i] = r;
  else state.requests.unshift(r);
}

export interface AddToPlanInput {
  requestId: string;
  mode: 'placeholder' | 'active' | 'attach';
  attachTo?: string;
  /** Category for a TBD request becoming a project. */
  category?: Category;
  asOf: string;
}

/**
 * Convert a request into a Placeholder or Active project (or attach its amounts
 * to an existing one) and keep the link back. The request's OMB record travels
 * with it, so a "Not in OMB" request carries its flag into the plan.
 */
export function addRequestToPlan(state: CapitalState, input: AddToPlanInput): string {
  const r = state.requests.find((x) => x.id === input.requestId);
  if (!r) throw new Error(`No request ${input.requestId}`);
  const category: Category = r.category === 'TBD' ? input.category ?? 'Passage' : r.category;
  const lineType: LineType = category === 'Land' ? 'Land purchase' : 'Construction contract';

  let projectId: string;
  if (input.mode === 'attach' && input.attachTo) {
    projectId = input.attachTo;
  } else {
    projectId = uid('proj');
    const recordType: RecordType = input.mode === 'active' ? 'Active' : 'Placeholder';
    state.projects.push({
      id: projectId,
      number: r.relatedNumber ?? null,
      title: r.title,
      category,
      subcategory: category === 'Hatchery' ? 'Expand' : undefined,
      sponsor: r.askSponsor ?? '',
      pm: r.requester,
      fundSource: 'General',
      accountType: 'Capital',
      portfolio: category === 'Hatchery' ? 'Hatchery capital' : category === 'Land' ? 'Land capital' : 'Passage (from the passage forecast list)',
      recordType,
      stage: 'Planning/MOA',
      omb: { ...r.omb },
      npcc: category === 'Hatchery' ? 'Step 1 (master plan)' : 'Not required',
      gates: structuredClone(r.gates),
      originalBudget: null,
      budgetHistory: [],
      ec: { status: 'Not started' },
      moa: { status: 'Not started' },
      design: { status: 'Not started' },
      milestones: [],
      fromRequestId: r.id,
      description: r.note,
    });
  }

  // Each FY amount spreads evenly over that FY's open quarters.
  const open = firstOpenSlot(input.asOf);
  const row = line(state, projectId, lineType);
  for (const [fyStr, amount] of Object.entries(r.amounts)) {
    if (!amount) continue;
    const fy = Number(fyStr);
    const slots = [1, 2, 3, 4].map((q) => slotOf(fy, q)).filter((sl) => sl >= open && sl < SLOT_COUNT);
    if (!slots.length) continue;
    spreadEvenly(amount, slots.length).forEach((v, i) => { row[slots[i]] += v; });
  }

  r.status = 'Added to plan';
  r.linkedProjectId = projectId;
  return projectId;
}

// ---------------------------------------------------------------------------
// Actuals import (R10)
// ---------------------------------------------------------------------------

export function importActuals(state: CapitalState, csv: string) {
  const result = importActualsCsv(csv, state.projects, state.actuals);
  if (!result.errors.length || result.rowsMatched) state.actuals = result.actuals;
  return result;
}

// ---------------------------------------------------------------------------
// Year-end close (R8)
// ---------------------------------------------------------------------------

export interface CloseEntry {
  projectId: string;
  fromSlot: number;
  toSlot: number;
  varianceReason: VarianceReason;
  note?: string;
}

/**
 * Re-spread each project's remaining need (modified budget − all-time actuals)
 * across the chosen future quarters, replacing the open forecast, and write one
 * "Year-end re-forecast" Adjustment per project. Nothing is banked into next
 * year's envelope — that comes from the new Asset Plan.
 */
export function closeFy(state: CapitalState, fy: number, entries: CloseEntry[], asOf: string, user: string, date: string): void {
  const open = firstOpenSlot(asOf);
  for (const e of entries) {
    const p = findProject(state, e.projectId);
    const plan = state.plans[p.id] ?? {};
    const need = Math.max(0, remainingNeed(p, plan, state.actuals[p.id], asOf));
    const lineType: LineType = p.category === 'Land' ? 'Land purchase' : 'Construction contract';
    for (const lt of Object.keys(plan) as LineType[]) {
      const row = plan[lt]!;
      for (let sl = open; sl < SLOT_COUNT; sl++) row[sl] = 0;
    }
    state.plans[p.id] = plan;
    spreadIntoPlan(state, p.id, lineType, Math.round(need), Math.max(e.fromSlot, open), Math.max(e.toSlot, open));
    state.adjustments.unshift({
      id: uid('adj'), projectId: p.id, type: 'Year-end re-forecast', amount: Math.round(need),
      fromSlot: slotOf(fy, 4), toSlot: e.fromSlot,
      reason: e.note || `FY${String(fy).slice(2)} close: remaining need re-spread ${qLabel(e.fromSlot)}–${qLabel(e.toSlot)}.`,
      varianceReason: e.varianceReason, user, date,
    });
  }
}

const qLabel = (slot: number) => `Q${qOfSlot(slot)} FY${String(fyOfSlot(slot)).slice(2)}`;

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export function setEnvelope(state: CapitalState, fy: number, source: EnvelopeSource, category: Category, amount: number | null): void {
  let row = state.envelopes.find((e) => e.fy === fy && e.source === source);
  if (!row) {
    row = { fy, source, sourceLabel: 'Entered in settings', amounts: { Hatchery: null, Land: null, Passage: null } };
    state.envelopes.push(row);
  }
  row.amounts[category] = amount;
}
