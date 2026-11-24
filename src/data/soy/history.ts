// Past SOY cycles (FY2014–2027) at project level, so every SOY screen can show
// a past fiscal year the way CBFish does today (the fiscal-year picker).
//
// Each year is generated on demand from a fixed-seed PRNG and hits the totals
// in PAST_CYCLES exactly: project count, baseline, final and transferred. Open
// years (FY2024–2027) keep what blocks closing them — projects whose final and
// transferred amounts differ, finals that were never transferred, projects
// with no final amount — so close-out has real work to show. FY2027 uses the
// same projects the FY2028 setup carries forward.
//
// All names and comments are invented.
import { ADMIN, ADMIN_TEAM, DEFAULT_DATES, DEMO_PM, PAST_CYCLES, PRIOR_ITEMS, PROJECTS, makeProject } from './seed';
import type { Activity, CarryCandidate, PastCycle, SoyCycle, SoyItem } from '../../lib/soy/types';

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const round100 = (n: number) => Math.round(n / 100) * 100;
const fyShort = (fy: number) => `FY${String(fy).slice(2)}`;

/** Projects that ran in FY2024–2025 but ended before FY2027 (so they're not in PRIOR_ITEMS). */
const ENDED: CarryCandidate[] = [
  makeProject('Rowan Ellison', { emphasis: 'Restoration/protection' }, [1998, 2010]),
  makeProject('Harper Sato', { emphasis: 'RM and E' }, [2002, 2012]),
].map((p) => ({ id: `${p.number}|Program|Expense`, projectNumber: p.number, fund: 'Program', priorBaseline: 900_000, priorWorking: 880_000, excludeReason: null }));

/** Which FY2027 items existed in earlier years: the demo PM's first, then a fixed order. */
const ORDER: CarryCandidate[] = (() => {
  const r = mulberry32(2014);
  const keyed = PRIOR_ITEMS.map((c) => ({ c, k: PROJECTS[c.projectNumber].pm === DEMO_PM ? -1 : r() }));
  return keyed.sort((a, b) => a.k - b.k).map((x) => x.c);
})();

const COLA: Record<number, number> = {
  2014: 0.015, 2015: 0.02, 2016: 0.02, 2017: 0.018, 2018: 0.02, 2019: 0.022, 2020: 0.025,
  2021: 0.02, 2022: 0.03, 2023: 0.035, 2024: 0.03, 2025: 0.025, 2026: 0.025, 2027: 0.025,
};
/** What blocks closing each open year: [no final, never transferred]. Variance count comes from PAST_CYCLES. */
const OPEN_GAPS: Record<number, [number, number]> = { 2024: [1, 0], 2025: [0, 0], 2026: [2, 0], 2027: [33, 2] };

const PM_REASONS = [
  'Adds a second field crew for the spring survey window.',
  'Covers the vehicle lease that moved from capital to expense.',
  'Restores the monitoring cut in the prior year.',
  'Picks up the landowner agreement renewals due this year.',
  'Funds the design phase ahead of next year’s construction.',
];
const FINAL_REASONS = [
  'Decision makers approved the PM request.',
  'Decision makers approved half of the requested increase.',
  'Decision makers held the EWB amount; revisit at mid-year review.',
];

const dateIn = (fy: number, mmdd: string) => `${fy - 1}-${mmdd}`;

function build(t: PastCycle): SoyCycle {
  // Whole dollars — the summary figures are written as e.g. 268.4 * 1e6.
  const target = { ...t, baseline: Math.round(t.baseline), final: Math.round(t.final), transferred: Math.round(t.transferred) };
  const fy = target.fy;
  const r = mulberry32(fy * 7919);
  const dates = {
    ewb: dateIn(fy, DEFAULT_DATES.ewb.slice(5)),
    pm: dateIn(fy, DEFAULT_DATES.pm.slice(5)),
    final: dateIn(fy, DEFAULT_DATES.final.slice(5)),
    complete: dateIn(fy, DEFAULT_DATES.complete.slice(5)),
  };
  const roundOne = dateIn(fy, '06-01');
  const chosen = fy === 2027
    ? PRIOR_ITEMS
    : target.items <= ORDER.length ? ORDER.slice(0, target.items) : [...ORDER, ...ENDED.slice(0, target.items - ORDER.length)];

  // Off-year flips every year for two-year projects.
  const flip = (2028 - fy) % 2 === 1;
  const offYear = (c: CarryCandidate) => {
    const p = PROJECTS[c.projectNumber];
    return p.cycleType === 'Two-year' ? !!p.offYear !== flip : undefined;
  };

  // Baselines scaled to the year's total.
  const raw = chosen.map((c) => (offYear(c) ? 0 : c.priorBaseline == null ? null : c.priorBaseline * (0.97 + r() * 0.06)));
  const rawTotal = raw.reduce<number>((s, v) => s + (v ?? 0), 0);
  const baselines = raw.map((v) => (v == null ? null : round100((v / rawTotal) * target.baseline)));
  fixTotal(baselines, target.baseline);

  const colaRate = COLA[fy] ?? 0.02;
  const items: SoyItem[] = chosen.map((c, i) => {
    const b = baselines[i];
    const ewb = b ?? round100((c.priorWorking ?? 500_000) * (0.95 + r() * 0.05));
    const item: SoyItem = {
      id: c.id, projectNumber: c.projectNumber, fund: c.fund, accountType: 'Expense',
      priorBaseline: b == null ? null : round100(b / (1 + colaRate)),
      priorWorking: b == null ? c.priorWorking : round100((b / (1 + colaRate)) * (0.92 + r() * 0.1)),
      baseline: b, cola: c.fund === 'Program' && b ? colaRate : undefined,
      offYear: offYear(c),
      amounts: {
        ewb: { amount: ewb, by: ADMIN_TEAM[i % 2], date: dates.ewb, rationale: b == null ? 'No baseline on file — held at the prior working budget.' : `FY${fy} baseline, including COLA.` },
      },
      transfers: [], followUp: false, notify: true,
    };
    if (item.offYear) {
      item.amounts.ewb = { amount: 0, by: ADMIN_TEAM[0], date: dates.ewb, rationale: 'Two-year project in its off year — $0.' };
      return item;
    }
    if (r() < 0.9) {
      const differs = r() < 0.16;
      const amt = differs ? round100(ewb * (1.05 + r() * 0.12)) : ewb;
      item.amounts.pm = {
        amount: amt, by: PROJECTS[c.projectNumber].pm, date: addDaysIso(dates.pm, Math.floor(r() * 20)),
        rationale: differs ? PM_REASONS[Math.floor(r() * PM_REASONS.length)] : 'Agree with EWB proposed.',
      };
    }
    return item;
  });

  // Finals: open years leave some unset; the rest are scaled to the year's final total.
  const [noFinal, neverTransferred] = target.status === 'Open' ? OPEN_GAPS[fy] ?? [0, 0] : [0, 0];
  const eligible = items.map((it, i) => ({ it, i })).filter(({ it }) => !it.offYear && PROJECTS[it.projectNumber].pm !== DEMO_PM);
  const noFinalSet = new Set(pickN(eligible.map((x) => x.i), noFinal, r));
  const finalRaw = items.map((it, i) => {
    if (it.offYear) return 0;
    if (noFinalSet.has(i)) return null;
    const e = it.amounts.ewb!.amount;
    const p = it.amounts.pm?.amount ?? e;
    if (p === e) return e;
    const k = Math.floor(r() * 3);
    return k === 0 ? p : k === 1 ? (p + e) / 2 : e;
  });
  const fTotal = finalRaw.reduce<number>((s, v) => s + (v ?? 0), 0);
  const finals = finalRaw.map((v) => (v == null ? null : round100((v / fTotal) * target.final)));
  fixTotal(finals, target.final);
  items.forEach((it, i) => {
    const f = finals[i];
    if (f == null) return;
    const e = it.amounts.ewb!.amount;
    const p = it.amounts.pm?.amount ?? e;
    const reason = it.offYear ? 'Off year — $0.' : p === e ? (it.amounts.pm ? 'Agreed amount — PM proposed matches EWB proposed.' : 'No PM input — final set from EWB proposed.') : FINAL_REASONS[i % 3];
    it.amounts.final = { amount: f, by: ADMIN, date: addDaysIso(dates.final, Math.floor(r() * 14)), rationale: reason };
  });

  // Transfers: Round 1 moves every final, except the gaps an open year still has.
  const decisionId = `d-${fy}-1`;
  const withFinal = items.map((it, i) => ({ it, i })).filter(({ it }) => (it.amounts.final?.amount ?? 0) > 0);
  const untransferred = new Set(pickN([...withFinal].sort((a, b) => a.it.amounts.final!.amount - b.it.amounts.final!.amount).slice(0, 12).map((x) => x.i), neverTransferred, r));
  const varCandidates = withFinal.filter(({ i, it }) => !untransferred.has(i) && it.amounts.final!.amount > 300_000).map((x) => x.i);
  const varSet = pickN(varCandidates, target.varianceItems, r);
  const U = [...untransferred].reduce((s, i) => s + items[i].amounts.final!.amount, 0);
  const D = target.final - target.transferred - U;
  const weights = varSet.map(() => 0.5 + r());
  const wTotal = weights.reduce((s, w) => s + w, 0);
  const diffs = weights.map((w) => round100((w / wTotal) * D));
  if (diffs.length) diffs[0] += D - diffs.reduce((s, d) => s + d, 0);
  const diffOf = new Map(varSet.map((i, k) => [i, diffs[k]]));
  for (const { it, i } of withFinal) {
    if (untransferred.has(i)) continue;
    const amt = it.amounts.final!.amount - (diffOf.get(i) ?? 0);
    it.transfers.push({ id: `t-${fy}-${i}`, decisionId, amount: amt, date: roundOne });
  }
  // A variance in a past year reads as a final changed after the transfer.
  for (const [i, d] of diffOf) {
    const it = items[i];
    const to = it.amounts.final!.amount;
    it.changedAfterTransfer = { from: to - d, to, reason: 'Decision makers revised the amount after Round 1; never reconciled.', by: ADMIN, date: dateIn(fy, '07-15') };
  }

  items.sort((a, b) => a.projectNumber.localeCompare(b.projectNumber) || a.fund.localeCompare(b.fund));

  const closed = target.status === 'Closed';
  const closedOn = target.closedOn ?? dateIn(fy, '08-15');
  const activity: Activity[] = [
    ...(closed ? [{ id: `a-${fy}-close`, date: closedOn, who: ADMIN, kind: 'close' as const, stage: 'complete' as const, text: `Closed the FY${fy} SOY. Amounts are locked for everyone.` }] : []),
    { id: `a-${fy}-tr`, date: roundOne, who: ADMIN, kind: 'transfer', stage: 'final', text: `Transferred final budgets to working budgets under “${fyShort(fy)} SOY – Round 1 – ${roundOne}”.` },
    { id: `a-${fy}-notify`, date: addDaysIso(dates.complete, -3), who: ADMIN, kind: 'notify', stage: 'final', text: 'Sent PMs a summary of final amounts and rationale.' },
    { id: `a-${fy}-final`, date: dates.final, who: 'CBFish', kind: 'stage', stage: 'final', text: 'Final budget opened.' },
    { id: `a-${fy}-pm`, date: dates.pm, who: 'CBFish', kind: 'stage', stage: 'pm', text: 'PM proposed opened. The stage-open email went to every PM with projects in the cycle.' },
    { id: `a-${fy}-setup`, date: dates.ewb, who: ADMIN, kind: 'setup', stage: 'ewb', text: `Ran setup: ${items.length} projects, ${(colaRate * 100).toFixed(1)}% COLA. EWB proposed is open.` },
  ];

  const colaApplied = items.filter((i) => i.cola).length;
  return {
    fy,
    status: target.status,
    stage: closed ? 'complete' : target.stage,
    dates,
    items,
    decisions: [{ id: decisionId, name: `${fyShort(fy)} SOY – Round 1 – ${roundOne}`, description: `FY${fy} SOY final budgets to working budgets.`, rationale: `Final budgets agreed in the FY${fy} SOY.`, bpaComments: '', date: roundOne, round: 1 }],
    activity,
    reminders: { on: false, daysBefore: 5 },
    setupReport: {
      carried: items.length - 3, excluded: [], added: items.slice(-3).map((i) => i.id), colaRate, colaApplied,
      colaComment: `FY${fy} COLA of ${(colaRate * 100).toFixed(1)}% per BPA's planning guidance, applied to Program-fund projects only.`,
      colaSkippedOffYear: [], colaSkippedNoBaseline: [], twoYearFlagged: [], totalBaseline: target.baseline,
    },
    closedOn: closed ? closedOn : undefined,
    reopenLog: [],
  };
}

function addDaysIso(iso: string, n: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function fixTotal(vals: (number | null)[], total: number) {
  let max = -1;
  vals.forEach((v, i) => { if (v != null && (max < 0 || v > (vals[max] ?? 0))) max = i; });
  if (max >= 0) vals[max] = (vals[max] ?? 0) + total - vals.reduce<number>((s, v) => s + (v ?? 0), 0);
}

function pickN(from: number[], n: number, r: () => number): number[] {
  const a = [...from];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, n);
}

const cache = new Map<number, SoyCycle>();

/** The seed's version of a past year. Treat as read-only — clone before changing it. */
export function generatedCycle(fy: number): SoyCycle | null {
  if (cache.has(fy)) return cache.get(fy)!;
  const target = PAST_CYCLES.find((c) => c.fy === fy);
  if (!target) return null;
  const c = build(target);
  cache.set(fy, c);
  return c;
}

/** The All cycles row for a cycle, with what blocks closing it. */
export function summarize(c: SoyCycle): PastCycle {
  let baseline = 0, final = 0, transferredTotal = 0, varianceItems = 0, variance = 0, noFinal = 0, never = 0;
  for (const i of c.items) {
    baseline += i.baseline ?? 0;
    const f = i.amounts.final?.amount;
    const t = i.transfers.reduce((s, x) => s + x.amount, 0);
    transferredTotal += t;
    if (f == null) { noFinal++; continue; }
    final += f;
    if (!i.transfers.length) { if (f !== 0) never++; continue; }
    if (Math.round(f - t) !== 0) { varianceItems++; variance += f - t; }
  }
  const m = (n: number) => `$${(Math.abs(n) / 1e6).toFixed(1)}M`;
  const blockers = c.status === 'Closed' ? undefined : [
    ...(varianceItems ? [`${varianceItems} ${varianceItems === 1 ? 'project differs' : 'projects differ'} between final and transferred (${m(variance)})`] : []),
    ...(never ? [`${never} ${never === 1 ? 'project' : 'projects'} with a final amount ${never === 1 ? 'was' : 'were'} never transferred`] : []),
    ...(noFinal ? [`${noFinal} ${noFinal === 1 ? 'project has' : 'projects have'} no final amount${noFinal > 5 ? ' — confirm they are $0' : ''}`] : []),
  ];
  return {
    fy: c.fy, status: c.status, stage: c.stage ?? 'final', items: c.items.length, baseline, final, transferred: transferredTotal,
    varianceItems, blockers, closedOn: c.closedOn,
  };
}
