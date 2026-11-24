import { describe, expect, it } from 'vitest';
import { generatedCycle, summarize } from '../../data/soy/history';
import { PAST_CYCLES, PRIOR_ITEMS } from '../../data/soy/seed';
import { buildPreset, closePastCycle } from './actions';
import { closeChecks } from './model';

describe('past SOY cycles (fiscal-year picker)', () => {
  it('every past year hits its All cycles totals', () => {
    for (const p of PAST_CYCLES) {
      const s = summarize(generatedCycle(p.fy)!);
      expect(s.items).toBe(p.items);
      expect(s.baseline).toBe(Math.round(p.baseline));
      expect(s.final).toBe(Math.round(p.final));
      expect(s.transferred).toBe(Math.round(p.transferred));
      expect(s.varianceItems).toBe(p.varianceItems);
    }
  });

  it('FY2027 is the same projects the FY2028 setup carries forward', () => {
    const ids = generatedCycle(2027)!.items.map((i) => i.id).sort();
    expect(ids).toEqual(PRIOR_ITEMS.map((c) => c.id).sort());
  });

  it('closed years pass every close-out check; open years have blockers', () => {
    expect(closeChecks(generatedCycle(2019)!).every((c) => c.ok)).toBe(true);
    expect(summarize(generatedCycle(2027)!).blockers).toEqual([
      '9 projects differ between final and transferred ($3.5M)',
      '2 projects with a final amount were never transferred',
      '33 projects have no final amount — confirm they are $0',
    ]);
  });

  it('reconcile and close leaves a past year closed with nothing outstanding', () => {
    const s = buildPreset(7);
    closePastCycle(s, 2026);
    const c = s.history![2026];
    expect(c.status).toBe('Closed');
    expect(closeChecks(c).every((x) => x.ok)).toBe(true);
    expect(s.pastCycles.find((p) => p.fy === 2026)).toMatchObject({ status: 'Closed', varianceItems: 0 });
    // The seed's own copy is untouched.
    expect(generatedCycle(2026)!.status).toBe('Open');
  });
});
