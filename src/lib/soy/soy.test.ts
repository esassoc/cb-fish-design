// The walkthrough presets must tell the FY2028 story with FY2027-shaped numbers.
import { describe, expect, it } from 'vitest';
import { advanceStage, assignNegotiation, bulkSet, buildPreset, defaultSetupInput, planSetup, setAmount } from './actions';
import { closeChecks, inNegotiation, negotiation, outstandingByPm, project, totals } from './model';
import { ADMIN, DEMO_LEADER, PRIOR_ITEMS, DEMO_PM } from '../../data/soy/seed';

describe('seed', () => {
  it('is shaped like FY2027: 237 items, $326.6M baseline, 7 ineligible', () => {
    expect(PRIOR_ITEMS).toHaveLength(237);
    const total = PRIOR_ITEMS.reduce((s, c) => s + (c.priorBaseline ?? 0), 0);
    expect(Math.abs(total - 326_600_000)).toBeLessThan(300_000);
    expect(PRIOR_ITEMS.filter((c) => c.excludeReason)).toHaveLength(7);
    expect(new Set(PRIOR_ITEMS.map((c) => c.id)).size).toBe(237);
  });
});

describe('setup (step 2)', () => {
  it('carries 230, adds 4, names the 3 off-year two-year projects', () => {
    const s = buildPreset(3);
    const r = s.cycle.setupReport!;
    expect(r.carried).toBe(230);
    expect(r.added).toHaveLength(4);
    expect(s.cycle.items).toHaveLength(234);
    expect(r.colaSkippedOffYear.length).toBeLessThanOrEqual(3);
    expect(r.excluded).toHaveLength(7);
  });
  it('plans without side effects', () => {
    const s = buildPreset(1);
    planSetup(defaultSetupInput(s));
    expect(s.cycle.items).toHaveLength(0);
  });
});

describe('stages', () => {
  it('step 4 starts with every item EWB proposed', () => {
    const s = buildPreset(4);
    expect(s.cycle.stage).toBe('ewb');
    expect(totals(s.cycle).ewbCount).toBe(234);
  });
  it('step 5 starts in PM proposed with 4 PMs outstanding and Casey done', () => {
    const s = buildPreset(5);
    expect(s.cycle.stage).toBe('pm');
    const out = outstandingByPm(s.cycle);
    expect(out.map((o) => o.pm)).toHaveLength(4);
    expect(out.reduce((n, o) => n + o.items.length, 0)).toBe(12);
    expect(s.cycle.items.filter((i) => project(i).pm === DEMO_PM).every((i) => i.amounts.pm)).toBe(true);
  });
  it('step 6 starts with a final on every item', () => {
    const s = buildPreset(6);
    expect(s.cycle.stage).toBe('final');
    expect(totals(s.cycle).finalCount).toBe(234);
  });
  it('step 7 starts reconciled: close-out checklist all green, two rounds', () => {
    const s = buildPreset(7);
    expect(s.cycle.decisions).toHaveLength(2);
    expect(closeChecks(s.cycle).every((c) => c.ok)).toBe(true);
    expect(s.cycle.items.filter((i) => i.changedAfterTransfer)).toHaveLength(1);
  });
});

describe('negotiation', () => {
  it('step 5 seeds negotiations at different points, the $461K vs $500K example back with EWB', () => {
    const s = buildPreset(5);
    const open = s.cycle.items.filter((i) => i.negotiation?.status === 'open');
    expect(open).toHaveLength(7);
    const ex = open.find((i) => i.amounts.ewb?.amount === 461_000 && i.amounts.pm?.amount === 500_000)!;
    expect(ex).toBeTruthy();
    expect(ex.negotiation!.assignee).toBe(ADMIN);
    expect(ex.negotiation!.thread.filter((e) => e.kind === 'assign').map((e) => e.toRole)).toEqual(['pm', 'admin']);
    const holders = open.map((i) => i.negotiation!.assigneeRole);
    expect(holders.filter((r) => r === 'leader')).toHaveLength(2);
    expect(holders.filter((r) => r === 'pm')).toHaveLength(2);
    expect(Math.max(...open.map((i) => i.negotiation!.round))).toBe(3);
    expect(open.some((i) => project(i).pm === DEMO_PM && i.negotiation!.assignee === DEMO_PM)).toBe(true);
    expect(s.cycle.items.filter((i) => project(i).pm === DEMO_PM)).toHaveLength(5);
    // PM ≠ EWB without a thread is in negotiation too, with the budget administrator.
    const derived = s.cycle.items.filter((i) => !i.negotiation && negotiation(i)?.active);
    expect(derived.length).toBeGreaterThan(0);
    expect(derived.every((i) => negotiation(i)!.assignee === ADMIN)).toBe(true);
  });
  it('bulk set never settles an open negotiation', () => {
    const s = buildPreset(5);
    advanceStage(s, false);
    const r = bulkSet(s, s.cycle.items.map((i) => i.id), 'final', 'pm', 'Test.');
    const skipped = r.skipped.filter((k) => k.reason.startsWith('In negotiation — with '));
    expect(skipped.length).toBe(s.cycle.items.filter((i) => inNegotiation(i)).length);
    expect(skipped.length).toBeGreaterThanOrEqual(7);
  });
  it('a final settles it; assign needs a comment', () => {
    const s = buildPreset(5);
    const it = s.cycle.items.find((i) => i.negotiation?.status === 'open')!;
    expect(assignNegotiation(s, it.id, { name: DEMO_LEADER, role: 'leader' }, '  ', ADMIN, 'admin').ok).toBe(false);
    advanceStage(s, false);
    setAmount(s, it.id, 'final', 1000, 'Settled.', ADMIN);
    expect(it.negotiation!.status).toBe('resolved');
    expect(it.negotiation!.thread.at(-1)!.kind).toBe('resolved');
  });
  it('step 6 has settled every negotiation, the example at $500K', () => {
    const s = buildPreset(6);
    expect(s.cycle.items.filter((i) => inNegotiation(i))).toHaveLength(0);
    const ex = s.cycle.items.find((i) => i.amounts.ewb?.amount === 461_000)!;
    expect(ex.amounts.final?.amount).toBe(500_000);
    expect(ex.negotiation!.status).toBe('resolved');
  });
});
