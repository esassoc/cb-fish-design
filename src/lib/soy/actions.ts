// State changes for the SOY prototype — plain functions over SoyState, wrapped by
// the store's update() (persist + notify). Every bulk action RETURNS a report
// (what was written, what was skipped and why), because every bulk action follows
// select → preview → confirm → report.
//
// The walkthrough presets at the bottom compose these same actions, so "jump to
// step 5" produces exactly the state a presenter would reach by clicking.
import {
  ADMIN, DEMO_PM, LATE_PMS, NEW_PROJECTS, PRIOR_ITEMS, PROJECTS, STORY_DATES, WALKTHROUGH_NEW, seedState,
} from '../../data/soy/seed';
import { PAST_CYCLES } from '../../data/soy/seed';
import { generatedCycle, summarize } from '../../data/soy/history';
import {
  addDays, amount, fmtMoney, hasTransfers, isOffYear, isTwoYear, nextStage, project, stageDue,
  suggestDecisionName, transferred, twoYearSuggestion,
} from './model';
import type { AmountStage, SetupReport, SoyItem, SoyState, StageDates, StageKey } from './types';
import { stageLabel } from './types';

import { ADMIN_TEAM, LEADERS } from '../../data/soy/seed';
import { negotiation } from './model';
import type { Negotiation, NegotiationEntry, PartyRole } from './types';

let seq = 0;
const uid = (p: string) => `${p}-${Date.now().toString(36)}-${(seq++).toString(36)}`;

const later = (a: string, b: string) => (a > b ? a : b);

function log(s: SoyState, entry: Omit<SoyState['cycle']['activity'][number], 'id' | 'date'> & { date?: string }) {
  s.cycle.activity.unshift({ id: uid('a'), date: entry.date ?? s.today, ...entry });
}

const name = (id: string) => {
  const num = id.split('|')[0];
  return `${num} ${PROJECTS[num]?.title ?? ''}`.trim();
};

// ---------------------------------------------------------------------------
// Setup wizard
// ---------------------------------------------------------------------------

export interface SetupInput {
  dates: StageDates;
  carryIds: string[];
  newIds: string[];
  colaRate: number;
  /** Items the COLA is applied to (from the filtered table). */
  colaIds: string[];
  /** The administrator's comment on the COLA — kept on the setup report and on each project it applies to. */
  colaComment: string;
}

/** What the setup run will do — used by the COLA preview and the review step, then by runSetup. */
export function planSetup(input: SetupInput): { items: SoyItem[]; report: SetupReport } {
  const cola = new Set(input.colaIds);
  const items: SoyItem[] = [];
  const report: SetupReport = {
    carried: 0, excluded: [], added: [], colaRate: input.colaRate, colaApplied: 0, colaComment: input.colaComment.trim() || undefined,
    colaSkippedOffYear: [], colaSkippedNoBaseline: [], twoYearFlagged: [], totalBaseline: 0,
  };
  const carry = new Set(input.carryIds);
  for (const c of PRIOR_ITEMS) {
    if (!carry.has(c.id)) {
      if (c.excludeReason) report.excluded.push({ id: c.id, reason: c.excludeReason });
      else report.excluded.push({ id: c.id, reason: 'Unchecked by the administrator' });
      continue;
    }
    const p = PROJECTS[c.projectNumber];
    let baseline = c.priorBaseline;
    let applied: number | undefined;
    if (p.cycleType === 'Two-year') {
      if (p.offYear) {
        baseline = 0;
        if (cola.has(c.id)) report.colaSkippedOffYear.push(c.id);
      } else {
        baseline = twoYearSuggestion(c.priorBaseline, input.colaRate);
        report.twoYearFlagged.push(c.id);
      }
    } else if (cola.has(c.id)) {
      if (baseline == null) report.colaSkippedNoBaseline.push(c.id);
      else {
        baseline = Math.round((baseline * (1 + input.colaRate)) / 100) * 100;
        applied = input.colaRate;
        report.colaApplied++;
      }
    }
    items.push({
      id: c.id, projectNumber: c.projectNumber, fund: c.fund, accountType: 'Expense',
      priorWorking: c.priorWorking, priorBaseline: c.priorBaseline, baseline, cola: applied,
      colaComment: applied != null ? input.colaComment.trim() || undefined : undefined,
      amounts: {}, transfers: [], followUp: false, notify: true,
    });
    report.carried++;
  }
  for (const id of input.newIds) {
    const n = NEW_PROJECTS.find((x) => x.id === id);
    if (!n) continue;
    if (cola.has(id)) report.colaSkippedNoBaseline.push(id);
    items.push({
      id, projectNumber: n.projectNumber, fund: n.fund, accountType: 'Expense',
      priorWorking: null, priorBaseline: null, baseline: null, isNew: true,
      amounts: {}, transfers: [], followUp: false, notify: true,
    });
    report.added.push(id);
  }
  report.totalBaseline = items.reduce((s, i) => s + (i.baseline ?? 0), 0);
  items.sort((a, b) => a.projectNumber.localeCompare(b.projectNumber) || a.fund.localeCompare(b.fund));
  return { items, report };
}

export function runSetup(s: SoyState, input: SetupInput): SetupReport {
  const { items, report } = planSetup(input);
  s.cycle.items = items;
  s.cycle.dates = { ...input.dates };
  s.cycle.setupReport = report;
  s.cycle.status = 'Open';
  s.cycle.stage = 'ewb';
  log(s, {
    who: ADMIN, kind: 'setup', stage: 'ewb',
    text: `Ran setup: carried forward ${report.carried} projects, added ${report.added.length} new projects, applied a ${(report.colaRate * 100).toFixed(1)}% COLA to ${report.colaApplied} projects${report.colaComment ? ` (“${report.colaComment}”)` : ''}. EWB proposed is open.`,
  });
  return report;
}

/** The defaults the wizard opens with: every eligible item, no new projects, COLA on Program-fund items. */
export function defaultSetupInput(s: SoyState): SetupInput {
  const carryIds = PRIOR_ITEMS.filter((c) => !c.excludeReason).map((c) => c.id);
  return {
    dates: { ...s.cycle.dates },
    carryIds,
    newIds: [],
    colaRate: 0.025,
    colaIds: PRIOR_ITEMS.filter((c) => !c.excludeReason && c.fund === 'Program').map((c) => c.id),
    colaComment: '',
  };
}

// ---------------------------------------------------------------------------
// Amounts and comments
// ---------------------------------------------------------------------------

export interface BulkReport {
  stage: AmountStage;
  written: string[];
  skipped: { id: string; reason: string }[];
  total: number;
}

export type AmountSource = 'baseline' | 'ewb' | 'pm';
export const SOURCE_LABEL: Record<AmountSource, string> = { baseline: 'Baseline', ewb: 'EWB proposed', pm: 'PM proposed' };

/** The value a bulk "set from source" would write, or why it can't. */
export function sourceValue(item: SoyItem, source: AmountSource): { value: number | null; reason?: string } {
  if (isOffYear(item)) return { value: 0 };
  const v = source === 'baseline' ? item.baseline : amount(item, source);
  if (v == null) return { value: null, reason: source === 'baseline' ? 'No baseline' : `No ${SOURCE_LABEL[source]} amount` };
  return { value: v };
}

export function bulkSet(s: SoyState, ids: string[], stage: AmountStage, source: AmountSource, rationale: string, who = ADMIN): BulkReport {
  const report: BulkReport = { stage, written: [], skipped: [], total: 0 };
  const set = new Set(ids);
  for (const item of s.cycle.items) {
    if (!set.has(item.id)) continue;
    if (stage === 'final' && hasTransfers(item)) { report.skipped.push({ id: item.id, reason: 'Already transferred — change it from the project' }); continue; }
    // A bulk set never settles a negotiation behind its participants' backs.
    const neg = stage === 'final' ? negotiation(item) : null;
    if (neg?.active) { report.skipped.push({ id: item.id, reason: `In negotiation — with ${neg.assignee}` }); continue; }
    const { value, reason } = sourceValue(item, source);
    if (value == null) { report.skipped.push({ id: item.id, reason: reason! }); continue; }
    item.amounts[stage] = { amount: value, by: who, date: s.today, rationale: isOffYear(item) ? 'Two-year project in its off year — $0 set automatically.' : rationale };
    report.written.push(item.id);
    report.total += value;
  }
  log(s, {
    who, kind: 'amount', stage,
    text: `Set ${stageLabel(stage)} from ${source === 'baseline' ? 'baseline' : SOURCE_LABEL[source]} for ${report.written.length} projects (${fmtMoney(report.total)}).${report.skipped.length ? ` Skipped ${report.skipped.length}.` : ''}`,
  });
  return report;
}

export interface SetAmountResult { ok: boolean; error?: string; changedAfterTransfer?: boolean }

export function setAmount(s: SoyState, id: string, stage: AmountStage, value: number, rationale: string, who: string, afterTransferReason?: string): SetAmountResult {
  const item = s.cycle.items.find((i) => i.id === id);
  if (!item) return { ok: false, error: 'Project not found' };
  if (s.cycle.status === 'Closed') return { ok: false, error: 'This cycle is closed.' };
  const prior = amount(item, stage);
  let cat = false;
  if (stage === 'final' && hasTransfers(item) && Math.round(value) !== Math.round(transferred(item))) {
    if (!afterTransferReason?.trim()) return { ok: false, error: 'A reason is required to change a final amount after a transfer.' };
    item.changedAfterTransfer = { from: prior ?? 0, to: value, reason: afterTransferReason.trim(), by: who, date: s.today };
    cat = true;
  }
  item.amounts[stage] = { amount: value, by: who, date: s.today, rationale };
  if (stage === 'final') resolveNegotiation(s, item, value, rationale, who);
  log(s, {
    who, kind: cat ? 'change-after-transfer' : 'amount', stage, itemId: id, amount: value,
    text: cat
      ? `Changed the final amount after a transfer: ${fmtMoney(prior)} → ${fmtMoney(value)}. Reason: ${afterTransferReason}`
      : `${stageLabel(stage)} set to ${fmtMoney(value)}. ${rationale}`,
  });
  return { ok: true, changedAfterTransfer: cat };
}

export function addComment(s: SoyState, id: string, text: string, who: string) {
  log(s, { who, kind: 'comment', stage: s.cycle.stage ?? undefined, itemId: id, text });
}

export function setItemFlag(s: SoyState, id: string, patch: Partial<Pick<SoyItem, 'followUp' | 'notify'>>) {
  const item = s.cycle.items.find((i) => i.id === id);
  if (item) Object.assign(item, patch);
}

// ---------------------------------------------------------------------------
// Negotiation — revised proposals, comments and assignments
// ---------------------------------------------------------------------------

/** Who can be handed the ball on a project: its PM, the budget team, decision makers. */
export function assignees(item: SoyItem): { name: string; role: PartyRole }[] {
  return [
    { name: project(item).pm, role: 'pm' as PartyRole },
    ...ADMIN_TEAM.map((name) => ({ name, role: 'admin' as PartyRole })),
    ...LEADERS.map((name) => ({ name, role: 'leader' as PartyRole })),
  ];
}

/** The open thread for a project, started from its EWB and PM proposals if it has none yet. */
function openThread(s: SoyState, item: SoyItem): Negotiation {
  if (item.negotiation && item.negotiation.status === 'open') return item.negotiation;
  const thread: NegotiationEntry[] = item.negotiation?.thread ?? [];
  if (!thread.length) {
    const e = item.amounts.ewb;
    const p = item.amounts.pm;
    if (e) thread.push({ id: uid('n'), date: e.date, who: e.by, whoRole: 'admin', kind: 'proposal', stage: 'ewb', amount: e.amount, text: e.rationale });
    if (p) thread.push({ id: uid('n'), date: p.date, who: p.by, whoRole: 'pm', kind: 'proposal', stage: 'pm', amount: p.amount, text: p.rationale });
  }
  item.negotiation = { assignee: ADMIN, assigneeRole: 'admin', round: Math.max(1, item.negotiation?.round ?? 1), status: 'open', thread };
  void s;
  return item.negotiation;
}

export interface NegotiationResult { ok: boolean; error?: string }

/** A revised EWB (budget team) or PM proposal: updates the stage amount and adds a round. */
export function reviseProposal(
  s: SoyState, id: string, stage: 'ewb' | 'pm', value: number, text: string, who: string, whoRole: PartyRole,
  assignTo?: { name: string; role: PartyRole },
): NegotiationResult {
  const item = s.cycle.items.find((i) => i.id === id);
  if (!item) return { ok: false, error: 'Project not found' };
  if (s.cycle.status === 'Closed') return { ok: false, error: 'This cycle is closed.' };
  if (!text.trim()) return { ok: false, error: 'Add a comment that explains the revised amount.' };
  const n = openThread(s, item);
  const prior = amount(item, stage);
  item.amounts[stage] = { amount: value, by: who, date: s.today, rationale: text.trim() };
  n.round++;
  n.thread.push({ id: uid('n'), date: s.today, who, whoRole, kind: 'proposal', stage, amount: value, text: text.trim() });
  log(s, {
    who, kind: 'amount', stage, itemId: id, amount: value,
    text: `Revised ${stageLabel(stage)}: ${fmtMoney(prior)} → ${fmtMoney(value)} (round ${n.round}). ${text.trim()}`,
  });
  if (assignTo) handOff(s, item, n, assignTo, '', who, whoRole);
  return { ok: true };
}

function handOff(s: SoyState, item: SoyItem, n: Negotiation, to: { name: string; role: PartyRole }, text: string, who: string, whoRole: PartyRole) {
  n.assignee = to.name;
  n.assigneeRole = to.role;
  n.thread.push({ id: uid('n'), date: s.today, who, whoRole, kind: 'assign', to: to.name, toRole: to.role, text });
  log(s, { who, kind: 'comment', stage: s.cycle.stage ?? undefined, itemId: item.id, text: `Assigned to ${to.name}.${text ? ` ${text}` : ''}` });
}

/** Comment and hand the ball to the next person. The comment is required — it says what they need to do. */
export function assignNegotiation(s: SoyState, id: string, to: { name: string; role: PartyRole }, text: string, who: string, whoRole: PartyRole): NegotiationResult {
  const item = s.cycle.items.find((i) => i.id === id);
  if (!item) return { ok: false, error: 'Project not found' };
  if (s.cycle.status === 'Closed') return { ok: false, error: 'This cycle is closed.' };
  if (!text.trim()) return { ok: false, error: 'Add a comment that tells them what you need.' };
  handOff(s, item, openThread(s, item), to, text.trim(), who, whoRole);
  return { ok: true };
}

/** A note on the thread that leaves the ball where it is. */
export function commentNegotiation(s: SoyState, id: string, text: string, who: string, whoRole: PartyRole): NegotiationResult {
  const item = s.cycle.items.find((i) => i.id === id);
  if (!item) return { ok: false, error: 'Project not found' };
  if (!text.trim()) return { ok: false, error: 'Write a comment.' };
  const n = openThread(s, item);
  n.thread.push({ id: uid('n'), date: s.today, who, whoRole, kind: 'comment', text: text.trim() });
  log(s, { who, kind: 'comment', stage: s.cycle.stage ?? undefined, itemId: id, text: text.trim() });
  return { ok: true };
}

/** Setting a final amount settles an open negotiation. */
function resolveNegotiation(s: SoyState, item: SoyItem, value: number, rationale: string, who: string) {
  const n = item.negotiation;
  if (!n || n.status !== 'open') return;
  n.status = 'resolved';
  n.thread.push({ id: uid('n'), date: s.today, who, whoRole: 'admin', kind: 'resolved', stage: 'final', amount: value, text: rationale });
}

// ---------------------------------------------------------------------------
// Stages, emails and reminders
// ---------------------------------------------------------------------------

export function advanceStage(s: SoyState, sendEmail: boolean, who = ADMIN): StageKey | null {
  const to = nextStage(s.cycle.stage);
  if (!to) return null;
  const from = s.cycle.stage;
  s.cycle.stage = to;
  s.today = later(s.today, s.cycle.dates[to]);
  const pms = new Set(s.cycle.items.map((i) => project(i).pm));
  log(s, {
    who, kind: 'stage', stage: to,
    text: `Closed ${stageLabel(from)} and opened ${stageLabel(to)}.${sendEmail ? ` Stage-open email sent to ${pms.size} PMs.` : ''}`,
  });
  return to;
}

export function sendReminders(s: SoyState, pms: string[], auto: boolean, who = ADMIN) {
  const counts = pms.map((pm) => `${pm} (${s.cycle.items.filter((i) => project(i).pm === pm && i.amounts[s.cycle.stage as AmountStage] == null && !isOffYear(i)).length})`);
  log(s, {
    who: auto ? 'CBFish' : who, kind: 'reminder', stage: s.cycle.stage ?? undefined,
    text: `${auto ? 'Automatic reminder' : 'Reminder'} sent to ${pms.length} PMs with missing input: ${counts.join(', ')}.`,
  });
}

const INCREASE_REASONS = [
  'Adds a second field crew for the summer survey season.',
  'Covers the culvert replacement deferred from last year.',
  'Reflects the new lease rate for the acclimation site.',
  'Replaces aging detection equipment at two sites.',
  'Adds landowner outreach the sponsor committed to in the new contract.',
];
const DECREASE_REASONS = [
  'Sponsor expects lower vehicle and fuel costs this year.',
  'One monitoring site is paused while the road is rebuilt.',
];

/**
 * Prototype-only fast forward through the PM window: most PMs respond (most
 * agree with EWB, some propose a change with a rationale), four PMs leave a few
 * items outstanding, and the automatic reminder goes out to them.
 */
export function simulatePmResponses(s: SoyState) {
  if (s.cycle.stage !== 'pm') return;
  const lateLeft = new Map(LATE_PMS.map((p) => [p, 3]));
  let n = 0;
  for (const item of s.cycle.items) {
    if (item.amounts.pm || isOffYear(item)) continue;
    const p = project(item);
    const left = lateLeft.get(p.pm) ?? 0;
    if (left > 0) { lateLeft.set(p.pm, left - 1); continue; }
    const ewb = amount(item, 'ewb') ?? item.baseline ?? 0;
    const change = n % 9 === 4 ? 1 : n % 23 === 11 ? -1 : 0;
    n++;
    if (change === 0) {
      item.amounts.pm = { amount: ewb, by: p.pm, date: addDays(s.cycle.dates.pm, 3 + (n % 18)), rationale: 'Agree with EWB proposed.' };
    } else {
      const pct = change > 0 ? 0.04 + (n % 5) * 0.03 : -(0.03 + (n % 3) * 0.02);
      const amt = Math.round((ewb * (1 + pct)) / 1000) * 1000;
      item.amounts.pm = {
        amount: amt, by: p.pm, date: addDays(s.cycle.dates.pm, 3 + (n % 18)),
        rationale: (change > 0 ? INCREASE_REASONS : DECREASE_REASONS)[n % (change > 0 ? INCREASE_REASONS.length : DECREASE_REASONS.length)],
      };
    }
  }
  const due = stageDue(s.cycle.dates, 'pm');
  const reminderDay = addDays(due, -s.cycle.reminders.daysBefore);
  s.today = later(s.today, reminderDay);
  log(s, { who: 'CBFish', kind: 'comment', stage: 'pm', date: addDays(reminderDay, -1), text: `PM input received on ${s.cycle.items.filter((i) => i.amounts.pm).length} projects.` });
  if (s.cycle.reminders.on) sendReminders(s, LATE_PMS, true);
  s.pmResponsesSimulated = true;
}

export function notifyFinals(s: SoyState, ids: string[], who = ADMIN) {
  const pms = new Set(s.cycle.items.filter((i) => ids.includes(i.id)).map((i) => project(i).pm));
  log(s, { who, kind: 'notify', stage: 'final', text: `Sent ${pms.size} PMs a summary of final amounts and rationale for ${ids.length} projects.` });
}

// ---------------------------------------------------------------------------
// Transfers
// ---------------------------------------------------------------------------

export interface TransferInput { name: string; description: string; rationale: string; bpaComments: string }

export function transferable(item: SoyItem): number {
  const f = amount(item, 'final');
  if (f == null) return 0;
  return f - transferred(item);
}

export function makeTransfers(s: SoyState, ids: string[], input: TransferInput, who = ADMIN): { count: number; total: number; decisionId: string } {
  const decisionId = uid('bd');
  const round = s.cycle.decisions.length + 1;
  // Never record a Budget Decision that moves nothing.
  if (!s.cycle.items.some((i) => ids.includes(i.id) && Math.round(transferable(i)) !== 0)) return { count: 0, total: 0, decisionId: '' };
  s.cycle.decisions.push({ id: decisionId, name: input.name, description: input.description, rationale: input.rationale, bpaComments: input.bpaComments, date: s.today, round });
  let count = 0;
  let total = 0;
  for (const item of s.cycle.items) {
    if (!ids.includes(item.id)) continue;
    const amt = transferable(item);
    if (Math.round(amt) === 0) continue;
    item.transfers.push({ id: uid('t'), decisionId, amount: amt, date: s.today });
    count++;
    total += amt;
  }
  log(s, { who, kind: 'transfer', stage: s.cycle.stage ?? undefined, text: `Transferred ${fmtMoney(total)} on ${count} projects to working budgets under “${input.name}”.` });
  return { count, total, decisionId };
}

// ---------------------------------------------------------------------------
// Close-out
// ---------------------------------------------------------------------------

export function closeCycle(s: SoyState, who = ADMIN) {
  if (s.cycle.stage !== 'complete') s.cycle.stage = 'complete';
  s.cycle.status = 'Closed';
  s.cycle.closedOn = s.today;
  log(s, { who, kind: 'close', stage: 'complete', text: `Closed the FY${s.cycle.fy} SOY. Amounts are locked for everyone.` });
}

export function reopenCycle(s: SoyState, reason: string, who = ADMIN) {
  s.cycle.status = 'Open';
  s.cycle.reopenLog.unshift({ date: s.today, who, reason });
  log(s, { who, kind: 'close', stage: s.cycle.stage ?? undefined, text: `Reopened the FY${s.cycle.fy} SOY. Reason: ${reason}` });
}

/**
 * Close a past open year from All cycles / Close-out: confirm $0 for projects
 * with no final amount, reconcile every variance and untransferred final in
 * one closing round, then lock it. Works on the year's project-level data so
 * the year itself (fiscal-year picker) shows the same result.
 */
export function closePastCycle(s: SoyState, fy: number, who = ADMIN) {
  // Viewing that year already? Then s.cycle is the working copy (the store keeps it).
  const src = s.cycle.fy === fy ? s.cycle : s.history?.[fy] ?? generatedCycle(fy);
  if (!src) return;
  const c = src === s.cycle ? s.cycle : structuredClone(src);
  const view: SoyState = { ...s, cycle: c };
  for (const i of c.items) {
    if (!i.amounts.final) i.amounts.final = { amount: 0, by: who, date: s.today, rationale: 'Confirmed $0 at close-out.' };
  }
  const ids = c.items.filter((i) => Math.round(transferable(i)) !== 0).map((i) => i.id);
  if (ids.length) {
    const round = c.decisions.length + 1;
    makeTransfers(view, ids, {
      name: suggestDecisionName(fy, round, s.today), description: `FY${fy} SOY close-out reconciliation.`,
      rationale: 'Reconciles final and transferred amounts so the year can close.', bpaComments: '',
    }, who);
  }
  closeCycle(view, who);
  s.history = { ...(s.history ?? {}), [fy]: c };
  s.pastCycles = s.pastCycles.map((p) => (p.fy === fy ? summarize(c) : p));
}

// ---------------------------------------------------------------------------
// Walkthrough presets — the state at the START of each walkthrough step
// ---------------------------------------------------------------------------

const HAND_EWB: Record<number, [number, string]> = {
  0: [1_250_000, 'New project — first-year amount from the approved proposal.'],
  1: [640_000, 'New project — first-year amount from the approved proposal.'],
  2: [980_000, 'New project — first-year amount from the approved proposal, less the deferred land purchase.'],
  3: [410_000, 'New project — first-year amount from the approved proposal.'],
};

const k1 = (n: number) => Math.round(n / 1000) * 1000;

/**
 * Step 5's negotiations: projects at different points of the back and forth,
 * each with a thread and someone holding the ball. Returns the final amount
 * each one settles at in step 6.
 */
function seedNegotiations(s: SoyState): Map<string, [number, string]> {
  const at = (date: string, fn: () => void) => { const t = s.today; s.today = date; fn(); s.today = t; };
  const late = new Set(LATE_PMS);
  const used = new Set<string>();
  const pool = s.cycle.items.filter((i) => {
    const p = project(i);
    const e = amount(i, 'ewb') ?? 0;
    return i.amounts.pm && p.pm !== DEMO_PM && !late.has(p.pm) && !isTwoYear(i) && !i.isNew && e > 350_000 && e < 2_000_000;
  });
  const next = () => {
    const i = pool.find((x) => !used.has(project(x).pm))!;
    used.add(project(i).pm);
    return i;
  };
  const setPm = (i: SoyItem, value: number, why: string, date: string) => { i.amounts.pm = { amount: value, by: project(i).pm, date, rationale: why }; };
  const [morgan, reese] = ADMIN_TEAM;
  const [dana, lee] = LEADERS;
  const finals = new Map<string, [number, string]>();

  // A — EWB $461K vs PM $500K: EWB sends it to the PM to get leadership approval; the PM comes back agreed.
  const a = next();
  const aPm = project(a).pm;
  a.amounts.ewb = { amount: 461_000, by: morgan, date: s.cycle.dates.ewb, rationale: 'FY2028 baseline, including COLA.' };
  setPm(a, 500_000, 'Adds the second smolt trap season the co-managers asked for.', '2027-04-20');
  at('2027-04-28', () => assignNegotiation(s, a.id, { name: aPm, role: 'pm' }, 'The extra $39K is more than we can cover in the base. Please take it to Dana Whitcomb for approval and let us know.', morgan, 'admin'));
  at('2027-05-06', () => assignNegotiation(s, a.id, { name: morgan, role: 'admin' }, 'Discussed with Dana Whitcomb — approved at the May 5 leadership meeting. Agreed: $500K is the final budget.', aPm, 'pm'));
  finals.set(a.id, [500_000, 'Approved by Dana Whitcomb at the May 5 leadership meeting.']);

  // B — with a decision maker.
  const b = next();
  const bE = amount(b, 'ewb')!;
  setPm(b, k1(bE * 1.11), 'Adds a rotary screw trap so we can count juveniles above the new weir.', '2027-04-22');
  at('2027-04-30', () => assignNegotiation(s, b.id, { name: dana, role: 'leader' }, `Fits the RM and E priority, but there is no room in the base for the ${fmtMoney(k1(bE * 1.11) - bE)}. Needs a leadership call.`, morgan, 'admin'));
  finals.set(b.id, [k1(bE * 1.055), 'Decision makers approved half of the requested increase.']);

  // C — round 3: EWB revised, the PM revised, back with EWB.
  const c = next();
  const cE = amount(c, 'ewb')!;
  setPm(c, k1(cE * 1.12), 'Covers the screen maintenance and a new seasonal crew.', '2027-04-16');
  at('2027-04-24', () => reviseProposal(s, c.id, 'ewb', k1(cE * 1.04), 'We can cover the screen maintenance, not the new crew.', reese, 'admin', { name: project(c).pm, role: 'pm' }));
  at('2027-05-02', () => reviseProposal(s, c.id, 'pm', k1(cE * 1.07), 'We can live with this if the crew starts in July instead of April.', project(c).pm, 'pm', { name: reese, role: 'admin' }));
  finals.set(c.id, [k1(cE * 1.07), 'Agreed in round 3 — the crew starts in July.']);

  // D — Casey's +$85K PIT array: EWB asks Casey to phase it.
  const d = caseyMonitoring(s);
  const dE = amount(d, 'ewb')!;
  at('2027-05-01', () => assignNegotiation(s, d.id, { name: DEMO_PM, role: 'pm' }, 'Can the second PIT array be phased? We can fund phase 1 this year if you can split it.', morgan, 'admin'));
  finals.set(d.id, [dE + 40_000, 'Phase 1 of the second PIT array funded; phase 2 next year.']);

  // E — with the other decision maker.
  const e = next();
  const eE = amount(e, 'ewb')!;
  setPm(e, k1(eE * 1.08), 'The landowner raised the lease rate for the acclimation site.', '2027-04-25');
  at('2027-05-03', () => assignNegotiation(s, e.id, { name: lee, role: 'leader' }, 'The sponsor needs the lease increase. Your call — it sets a precedent for the other leases.', reese, 'admin'));
  finals.set(e.id, [k1(eE * 1.08), 'Decision makers approved the lease increase.']);

  // F — a decision maker declined and handed it back to EWB.
  const f = next();
  const fE = amount(f, 'ewb')!;
  setPm(f, k1(fE * 1.15), 'Expands the riparian planting to the second reach.', '2027-04-18');
  at('2027-04-29', () => assignNegotiation(s, f.id, { name: dana, role: 'leader' }, 'Second-reach planting is new scope. Can we fund it this year?', morgan, 'admin'));
  at('2027-05-05', () => assignNegotiation(s, f.id, { name: morgan, role: 'admin' }, 'Not this year — hold at EWB proposed and revisit at mid-year review.', dana, 'leader'));
  finals.set(f.id, [fE, 'Held at EWB proposed per the May 5 leadership decision; revisit at mid-year review.']);

  // G — EWB met the PM halfway; the PM holds the ball (round 2).
  const g = next();
  const gE = amount(g, 'ewb')!;
  const gHalf = k1(gE * 1.05);
  setPm(g, k1(gE * 1.1), 'Replaces two failing PIT antennas before the spring run.', '2027-04-21');
  at('2027-05-04', () => reviseProposal(s, g.id, 'ewb', gHalf, 'We can meet you halfway. Does this work?', reese, 'admin', { name: project(g).pm, role: 'pm' }));
  finals.set(g.id, [gHalf, 'Agreed at the revised EWB proposed amount.']);

  return finals;
}

/** Casey's monitoring project — the one whose PM proposal asks for a second PIT tag array. */
const caseyMonitoring = (s: SoyState) => s.cycle.items.find((i) => project(i).pm === DEMO_PM && project(i).emphasis === 'RM and E')!;

export function buildPreset(step: number): SoyState {
  const s = seedState();
  // All cycles rows come from each past year's project-level data.
  s.pastCycles = PAST_CYCLES.map((p) => summarize(generatedCycle(p.fy)!));
  if (step <= 2) return s;

  // Step 2 done: setup with the walkthrough's choices.
  const input = defaultSetupInput(s);
  input.newIds = [...WALKTHROUGH_NEW];
  input.colaComment = '2.5% per BPA’s FY2028 planning guidance. Program-fund projects only; two-year projects get the on-year suggestion instead.';
  runSetup(s, input);
  s.today = STORY_DATES.ewb;
  if (step === 3) return s;

  // Step 3 done: EWB from baseline, then hand entries for items with no baseline.
  bulkSet(s, s.cycle.items.map((i) => i.id), 'ewb', 'baseline', 'FY2028 baseline, including COLA.');
  s.cycle.items.filter((i) => i.isNew).forEach((i, k) => {
    const [amt, why] = HAND_EWB[k] ?? [500_000, 'New project.'];
    setAmount(s, i.id, 'ewb', amt, why, ADMIN);
  });
  s.cycle.items.filter((i) => !i.isNew && i.baseline == null).forEach((i) => {
    setAmount(s, i.id, 'ewb', i.priorWorking ?? 500_000, 'No baseline on file — held at the FY2027 working budget.', ADMIN);
  });
  s.today = STORY_DATES.pm;
  if (step === 4) return s;

  // Step 4 done: PM proposed opened with the email; PMs respond (Casey included); reminder goes out.
  advanceStage(s, true);
  // 4.5 = the moment PM proposed opens, before anyone responds (the PM's landing in step 4).
  if (step < 5) return s;
  const casey = s.cycle.items.filter((i) => project(i).pm === DEMO_PM);
  casey.forEach((i, k) => {
    const ewb = amount(i, 'ewb') ?? 0;
    if (i === caseyMonitoring(s)) setAmount(s, i.id, 'pm', ewb + 85_000, 'Adds a second PIT tag array on the lower mainstem so we can separate the two populations.', DEMO_PM);
    else setAmount(s, i.id, 'pm', ewb, 'Agree with EWB proposed.', DEMO_PM);
  });
  simulatePmResponses(s);
  const negotiated = seedNegotiations(s);
  // Two days before PM proposed is due: the admin is about to open Final budget.
  s.today = '2027-05-07';
  if (step === 5) return s;

  // Step 5 done: Final budget — the negotiations settle first, then PM proposed where agreed, by hand where decision makers differed.
  advanceStage(s, true);
  for (const [id, [value, why]] of negotiated) setAmount(s, id, 'final', value, why, ADMIN);
  const agreed = s.cycle.items.filter((i) => i.amounts.pm && i.amounts.pm.amount === i.amounts.ewb?.amount).map((i) => i.id);
  bulkSet(s, agreed, 'final', 'pm', 'Agreed amount — PM proposed matches EWB proposed.');
  const noPm = s.cycle.items.filter((i) => !i.amounts.pm).map((i) => i.id);
  bulkSet(s, noPm, 'final', 'ewb', 'No PM input — final set from EWB proposed.');
  s.cycle.items.filter((i) => !i.amounts.final).forEach((i, k) => {
    const pm = amount(i, 'pm') ?? 0;
    const ewb = amount(i, 'ewb') ?? 0;
    const choice = k % 3;
    const v = choice === 0 ? pm : choice === 1 ? Math.round((pm + ewb) / 2 / 1000) * 1000 : ewb;
    const why = choice === 0 ? 'Decision makers approved the PM request.' : choice === 1 ? 'Decision makers approved half of the requested increase.' : 'Decision makers held the EWB amount; revisit at mid-year review.';
    setAmount(s, i.id, 'final', v, why, ADMIN);
  });
  notifyFinals(s, s.cycle.items.map((i) => i.id));
  s.today = STORY_DATES.transfer;
  if (step === 6) return s;

  // Step 6 done: Round 1, one change after transfer, Round 2 reconciles it.
  makeTransfers(s, s.cycle.items.map((i) => i.id), {
    name: suggestDecisionName(s.cycle.fy, 1, s.today), description: 'FY2028 SOY final budgets to working budgets.',
    rationale: 'Final budgets agreed in the FY2028 SOY.', bpaComments: '',
  });
  s.today = '2027-06-05';
  const changed = s.cycle.items.find((i) => project(i).pm === DEMO_PM && !isTwoYear(i))!;
  setAmount(s, changed.id, 'final', (amount(changed, 'final') ?? 0) + 150_000, 'Decision makers restored the lamprey survey funding.', ADMIN, 'Decision makers restored the lamprey survey funding at the June 4 meeting.');
  s.today = STORY_DATES.roundTwo;
  makeTransfers(s, [changed.id], {
    name: suggestDecisionName(s.cycle.fy, 2, s.today), description: 'FY2028 SOY change after Round 1.',
    rationale: 'Reconciles the final amount changed on Jun 5.', bpaComments: '',
  });
  advanceStage(s, false);
  s.today = STORY_DATES.close;
  return s;
}
