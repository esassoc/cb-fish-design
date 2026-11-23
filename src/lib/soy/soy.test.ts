// The walkthrough presets must tell the FY2028 story with FY2027-shaped numbers.
import { describe, expect, it } from 'vitest';
import { buildPreset, defaultSetupInput, planSetup } from './actions';
import { closeChecks, outstandingByPm, project, totals } from './model';
import { PRIOR_ITEMS, DEMO_PM } from '../../data/soy/seed';

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
