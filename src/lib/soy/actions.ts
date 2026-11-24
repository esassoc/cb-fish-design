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
import {
  addDays, amount, fmtMoney, hasTransfers, isOffYear, isTwoYear, nextStage, project, stageDue,
  suggestDecisionName, transferred, twoYearSuggestion,
} from './model';
import type { AmountStage, SetupReport, SoyItem, SoyState, StageDates, StageKey } from './types';
import { stageLabel } from './types';

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
}

/** What the setup run will do — used by the COLA preview and the review step, then by runSetup. */
export function planSetup(input: SetupInput): { items: SoyItem[]; report: SetupReport } {
  const cola = new Set(input.colaIds);
  const items: SoyItem[] = [];
  const report: SetupReport = {
    carried: 0, excluded: [], added: [], colaRate: input.colaRate, colaApplied: 0,
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
    text: `Ran setup: carried forward ${report.carried} projects, added ${report.added.length} new projects, applied a ${(report.colaRate * 100).toFixed(1)}% COLA to ${report.colaApplied} projects. EWB proposed is open.`,
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

export function closePastCycle(s: SoyState, fy: number) {
  const c = s.pastCycles.find((x) => x.fy === fy);
  if (!c) return;
  c.status = 'Closed';
  c.stage = 'complete';
  c.transferred = c.final;
  c.varianceItems = 0;
  c.blockers = [];
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

export function buildPreset(step: number): SoyState {
  const s = seedState();
  if (step <= 2) return s;

  // Step 2 done: setup with the walkthrough's choices.
  const input = defaultSetupInput(s);
  input.newIds = [...WALKTHROUGH_NEW];
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
    if (k === 1) setAmount(s, i.id, 'pm', ewb + 85_000, 'Adds a second PIT tag array on the lower mainstem so we can separate the two populations.', DEMO_PM);
    else setAmount(s, i.id, 'pm', ewb, 'Agree with EWB proposed.', DEMO_PM);
  });
  simulatePmResponses(s);
  // Two days before PM proposed is due: the admin is about to open Final budget.
  s.today = '2027-05-07';
  if (step === 5) return s;

  // Step 5 done: Final budget — from PM proposed where agreed, by hand where decision makers differed.
  advanceStage(s, true);
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
