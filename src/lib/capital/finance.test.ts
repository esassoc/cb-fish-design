// The PRD's "Tests that must pass", against the real seed — if the seed or the
// money math drifts from the Asset Plan, these fail before Ben sees a wrong number.
import { describe, expect, it } from 'vitest';
import { seedState, SAMPLE_ACTUALS_CSV } from '../../data/capital-program/seed';
import {
  fyActuals,
  fyForecast,
  headroom,
  isActiveType,
  isPlaceholderType,
  pathway,
  remainingNeed,
  hasOmbFlag,
  requestHasOmbFlag,
  fmtK,
  spreadEvenly,
  fyOfDate,
  quarterOfDate,
  isClosed,
  slotOf,
} from './finance';
import { addRequestToPlan, changeBudget, closeFy, importActuals, setGate, setNpcc, setPlanCell, takeSnapshot } from './actions';
import { CATEGORIES, type CapitalState } from './types';

const ASOF = '2026-09-30';

function categoryTotal(state: CapitalState, fy: number, cat: string) {
  return state.projects
    .filter((p) => p.category === cat && (isActiveType(p) || isPlaceholderType(p)))
    .reduce((t, p) => t + fyForecast(state.plans[p.id], state.actuals[p.id], fy, ASOF), 0);
}

const hr = (state: CapitalState, fy: number, source: 'apExpected' | 'apOptimal' | 'ipr', whatIf: string[] = []) =>
  headroom({ data: state, requests: state.requests, envelopes: state.envelopes, fy, source, asOf: ASOF, whatIf });

describe('fiscal calendar', () => {
  it('maps dates to BPA fiscal years and quarters', () => {
    expect(fyOfDate('2026-10-01')).toBe(2027);
    expect(fyOfDate('2026-09-30')).toBe(2026);
    expect(quarterOfDate('2026-10-15')).toBe(1);
    expect(quarterOfDate('2027-02-01')).toBe(2);
    expect(quarterOfDate('2027-06-30')).toBe(3);
    expect(quarterOfDate('2027-07-01')).toBe(4);
  });
  it('closes quarters on or before the data-as-of date', () => {
    expect(isClosed(slotOf(2026, 4), ASOF)).toBe(true);
    expect(isClosed(slotOf(2027, 1), ASOF)).toBe(false);
  });
});

describe('seed ties to the Asset Plan', () => {
  const state = seedState();

  it('FY27 Asset Plan category totals equal 16,183 / 21,495 / 10,737 / 48,415', () => {
    expect(categoryTotal(state, 2027, 'Hatchery')).toBe(16183);
    expect(categoryTotal(state, 2027, 'Land')).toBe(21495);
    expect(categoryTotal(state, 2027, 'Passage')).toBe(10737);
    expect(CATEGORIES.reduce((t, c) => t + categoryTotal(state, 2027, c), 0)).toBe(48415);
  });

  it('FY28 Asset Plan proposed total = 63,846', () => {
    expect(CATEGORIES.reduce((t, c) => t + categoryTotal(state, 2028, c), 0)).toBe(63846);
  });

  it('FY26 Q3 snapshot totals match the Finance submission', () => {
    const q3 = state.snapshots.find((s) => s.id === 'fy26-q3')!;
    const fy26 = (cat: string) =>
      q3.data.projects.filter((p) => p.category === cat).reduce((t, p) => t + fyForecast(q3.data.plans[p.id], q3.data.actuals[p.id], 2026, q3.asOf), 0);
    expect(fy26('Hatchery')).toBe(24443);
    expect(fy26('Land')).toBe(15095);
    expect(fy26('Passage')).toBe(6844);
  });

  it('FY26 baseline snapshot totals match the Asset Plan baseline', () => {
    const b = state.snapshots.find((s) => s.id === 'fy26-baseline')!;
    const fy26 = (cat: string) =>
      b.data.projects.filter((p) => p.category === cat).reduce((t, p) => t + fyForecast(b.data.plans[p.id], b.data.actuals[p.id], 2026, b.asOf), 0);
    expect(fy26('Hatchery')).toBe(22016);
    expect(fy26('Land')).toBe(18415);
    expect(fy26('Passage')).toBe(12000);
  });
});

describe('headroom', () => {
  const state = seedState();

  it('FY27 vs Asset Plan Expected = 0', () => {
    expect(Math.round(hr(state, 2027, 'apExpected').at(-1)!.headroom!)).toBe(0);
  });
  it('FY27 vs Optimal = 12,104 (ceiling 60,519)', () => {
    const total = hr(state, 2027, 'apOptimal').at(-1)!;
    expect(Math.round(total.envelope!)).toBe(60519);
    expect(Math.round(total.headroom!)).toBe(12104);
  });
  it('FY27 vs IPR = 18,573', () => {
    expect(Math.round(hr(state, 2027, 'ipr').at(-1)!.headroom!)).toBe(18573);
  });
  it('FY27 open requests = 30,900 and all of them in "what if" = (30,900)', () => {
    const open = state.requests.filter((r) => (r.amounts[2027] ?? 0) > 0).map((r) => r.id);
    const total = hr(state, 2027, 'apExpected', open).at(-1)!;
    expect(total.openRequests).toBe(30900);
    expect(total.headroom).toBe(-30900);
    expect(fmtK(total.headroom)).toBe('(30,900)');
  });
});

describe('actuals import', () => {
  it('sets Klickitat FY26 actuals to 18,301 and keeps the June reversal negative', () => {
    const state = seedState();
    const result = importActuals(state, SAMPLE_ACTUALS_CSV);
    expect(result.rowsMatched).toBe(11);
    expect(result.unmatched).toEqual([]);
    expect(Math.round(fyActuals(state.actuals.klickitat, 2026))).toBe(18301);
    expect(state.actuals.klickitat[2026][8]).toBeLessThan(0); // Jun
  });
  it('lists unmatched project ids for review', () => {
    const state = seedState();
    const result = importActuals(state, 'category_l5,project_l6,fiscal_year,month,amount\n0005510,999999999,2026,Oct,1000');
    expect(result.unmatched).toEqual(['999999999']);
    expect(result.rowsMatched).toBe(0);
  });
});

describe('snapshots', () => {
  it('saving a snapshot, then editing a forecast, leaves the snapshot unchanged', () => {
    const state = seedState();
    const snap = takeSnapshot(state, { label: 'Test', type: 'Ad hoc', asOf: ASOF, createdBy: 'Test', createdAt: ASOF });
    const before = fyForecast(snap.data.plans.waterwheel, snap.data.actuals.waterwheel, 2028, ASOF);
    setPlanCell(state, 'waterwheel', 'Construction contract', slotOf(2028, 1), 99999);
    expect(fyForecast(snap.data.plans.waterwheel, snap.data.actuals.waterwheel, 2028, ASOF)).toBe(before);
    expect(fyForecast(state.plans.waterwheel, state.actuals.waterwheel, 2028, ASOF)).not.toBe(before);
  });
});

describe('approval pathway', () => {
  it('shows "Not greenlit" until the last gate goes green', () => {
    const state = seedState();
    const ww = () => state.projects.find((p) => p.id === 'waterwheel')!;
    expect(pathway(ww(), state.settings.gates).greenlit).toBe(false);
    setGate(state, 'project', 'waterwheel', 'leadership', { status: 'Green' });
    setNpcc(state, 'waterwheel', 'Step 3 (final design)');
    expect(pathway(ww(), state.settings.gates).greenlit).toBe(false);
    setGate(state, 'project', 'waterwheel', 'cbfishBudget', { status: 'Green' });
    expect(pathway(ww(), state.settings.gates).greenlit).toBe(true);
  });

  it("seeds Coeur d'Alene green on funding, red on the Asset Plan", () => {
    const state = seedState();
    const cda = state.projects.find((p) => p.id === 'coeur-dalene')!;
    const lights = pathway(cda, state.settings.gates).lights;
    expect(lights.find((l) => l.def.key === 'funding')!.status).toBe('Green');
    expect(lights.find((l) => l.def.key === 'assetPlan')!.status).toBe('Red');
  });

  it('flags construction spend without OMB approval, and the flag survives "Add to plan"', () => {
    const state = seedState();
    const cj = state.projects.find((p) => p.id === 'chief-joseph')!;
    expect(hasOmbFlag(cj, state.plans[cj.id], ASOF)).toBe(true);
    const klickitat = state.projects.find((p) => p.id === 'klickitat')!;
    expect(hasOmbFlag(klickitat, state.plans.klickitat, ASOF)).toBe(false);

    const estuary = state.requests.find((r) => r.id === 'estuary')!;
    expect(requestHasOmbFlag(estuary)).toBe(true);
    const id = addRequestToPlan(state, { requestId: 'estuary', mode: 'placeholder', asOf: ASOF });
    const p = state.projects.find((x) => x.id === id)!;
    expect(hasOmbFlag(p, state.plans[id], ASOF)).toBe(true);
    expect(fyForecast(state.plans[id], undefined, 2027, ASOF)).toBe(2500);
  });
});

describe('year-end re-forecast', () => {
  it('offers the remaining need ($17,000 of a $20,000 project with $3,000 spent), not the FY unspent', () => {
    const state = seedState();
    const p = state.projects.find((x) => x.id === 'waterwheel')!;
    changeBudget(state, { projectId: p.id, amount: 20000, type: 'Scope change', reason: 'Test', user: 'Test', date: ASOF });
    state.actuals[p.id] = { 2026: [3000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    expect(remainingNeed(p, state.plans[p.id], state.actuals[p.id], ASOF)).toBe(17000);

    closeFy(state, 2026, [{ projectId: p.id, fromSlot: slotOf(2027, 1), toSlot: slotOf(2028, 4), varianceReason: 'Schedule slip' }], ASOF, 'Test', ASOF);
    const reforecast = fyForecast(state.plans[p.id], state.actuals[p.id], 2027, ASOF) + fyForecast(state.plans[p.id], state.actuals[p.id], 2028, ASOF);
    expect(reforecast).toBe(17000);
    expect(state.adjustments[0].type).toBe('Year-end re-forecast');
    expect(state.adjustments[0].amount).toBe(17000);
  });
});

describe('display', () => {
  it('formats $000s with separators and parentheses', () => {
    expect(fmtK(48415)).toBe('48,415');
    expect(fmtK(-30900)).toBe('(30,900)');
    expect(fmtK(12103.75)).toBe('12,104');
  });
  it('spreads evenly without losing a dollar', () => {
    expect(spreadEvenly(17000, 8)).toEqual(Array(8).fill(2125));
    expect(spreadEvenly(10, 3).reduce((a, b) => a + b, 0)).toBe(10);
  });
});
