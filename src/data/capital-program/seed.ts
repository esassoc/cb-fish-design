// Capital program seed — the real projects and figures from the PRD's "Seed data"
// section (docs/capital-program-prd.md), so Ben recognizes his program on first
// click. Amounts are $000s. FY27 and FY28 project values tie exactly to the FY27
// Asset Plan totals; FY26 values are the Q3 expected end-of-year forecast.
//
// The tables below are authored as compact rows (one per project, FY totals) and
// expanded by buildDataset() into quarterly spend plans and monthly actuals. The
// same builder produces the three seeded snapshots from the same rows plus each
// snapshot's "notable differences", so Current and history can never drift apart
// by accident — only by the differences written down here.
import { slotOf, spreadEvenly, spreadWeighted, isClosed, emptySlots, fyOfSlot, qOfSlot } from '../../lib/capital/finance';
import {
  FY_LIST,
  SLOT_COUNT,
  type ActualsByFy,
  type CapitalRequest,
  type CapitalState,
  type Category,
  type Envelope,
  type FrozenData,
  type GateDefinition,
  type GateKey,
  type GateRecord,
  type LineType,
  type Milestone,
  type MilestonePhase,
  type NpccStep,
  type OmbStatus,
  type Project,
  type RecordType,
  type LifecycleStage,
  type Snapshot,
  type SpendPlan,
  type Subcategory,
  type AccountType,
  type FundSource,
  type BudgetChange,
} from '../../lib/capital/types';

export const SEED_VERSION = 1;
export const DATA_AS_OF = '2026-09-30';

const s = slotOf;

// ---------------------------------------------------------------------------
// Settings — every open question gets a working assumption, tagged in the UI.
// ---------------------------------------------------------------------------

export const GATE_DEFINITIONS: GateDefinition[] = [
  { key: 'leadership', label: 'Leadership approval', owner: 'Jason Sweet (approver), recorded by Ben Dick', editableBy: ['cpm'] },
  { key: 'omb', label: 'OMB inclusion', owner: 'Rodrigo George', editableBy: ['cpm', 'apl'] },
  { key: 'capitalization', label: 'Capitalization policy', owner: 'Dorie', editableBy: ['cpm'] },
  { key: 'funding', label: 'Funding source', owner: 'Ben Dick', editableBy: ['cpm'] },
  { key: 'assetPlan', label: 'SAMP / Asset Plan', owner: 'Victoria DuVal', editableBy: ['cpm', 'apl'] },
  { key: 'cbfishBudget', label: 'CBFish budget (money in the FY)', owner: "Michelle O'Malley", editableBy: ['cpm'] },
  { key: 'npcc', label: 'NPCC 3-step review', owner: 'NPCC', editableBy: ['cpm'], hatcheryOnly: true },
];

// ---------------------------------------------------------------------------
// Budget envelopes
// ---------------------------------------------------------------------------

const env = (fy: number, source: Envelope['source'], sourceLabel: string, h: number | null, l: number | null, p: number | null): Envelope => ({
  fy, source, sourceLabel, amounts: { Hatchery: h, Land: l, Passage: p },
});

export const ENVELOPES: Envelope[] = [
  env(2026, 'ipr', 'Rate case (BP-26)', 14970, 10960, 12000),
  env(2026, 'apExpected', 'SOY working budget', 22803, 18415, 12000),
  env(2027, 'ipr', 'Rate case / SAMP (May 2024)', 42588, 12400, 12000),
  env(2027, 'apExpected', 'Asset Plan SOY (approved)', 16183, 21495, 10737),
  env(2028, 'ipr', 'SAMP / IPR expected', 29634, 22400, null),
  env(2028, 'apExpected', 'Asset Plan proposed', 29095, 27750, 7001),
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

interface Row {
  id: string;
  number: string | null;
  title: string;
  category: Category;
  sub?: Subcategory;
  sponsor: string;
  pm: string;
  record: RecordType;
  stage: LifecycleStage;
  stageNote?: string;
  omb: OmbStatus;
  npcc?: NpccStep;
  orig?: number | null;
  /** Budget history, oldest first. Empty = no modified budget yet. */
  history?: BudgetChange[];
  pending?: number;
  /** FY totals, $000s. FY29 holds the PRD's "FY29+" column. */
  fy: Partial<Record<number, number>>;
  /** All-time actuals before FY26, split across FY24–FY25. */
  prior?: number;
  /** Quarter weights per FY where spend is not even through the year. */
  weights?: Partial<Record<number, number[]>>;
  /** Q4 FY26 actuals where the year-end landed off the plan. */
  actualQ4Fy26?: number;
  /** Klickitat's September 2026 had not posted when the Finance export ran. */
  septemberUnposted?: boolean;
  gates?: Partial<Record<GateKey, Partial<GateRecord>>>;
  account?: AccountType;
  fund?: FundSource;
  acres?: number;
  design?: string;
  ec?: string;
  moa?: string;
  description?: string;
}

const bh = (date: string, amount: number, reason: string, decisionRef?: string): BudgetChange => ({ date, amount, reason, decisionRef });

const HATCHERY: Row[] = [
  {
    id: 'klickitat', number: '1988-115-35', title: 'Klickitat Hatchery Spring Chinook', category: 'Hatchery', sub: 'Expand',
    sponsor: 'Yakama Nation', pm: 'Mary Todd Haight', record: 'Active', stage: 'Construction', stageNote: 'to Q1 FY27',
    omb: 'Appropriations language approved', npcc: 'Step 3 (final design)', orig: 13200,
    history: [
      bh('2019-06-12', 13200, 'Original budget (MOA executed)', 'DMF Jun 2019'),
      bh('2022-03-15', 21000, 'Final design construction estimate', 'DMF Mar 2022'),
      bh('2024-11-12', 30800, 'Construction bids over estimate', 'DMF Nov 2024'),
      bh('2025-08-20', 36000, 'Change orders — site conditions at the intake', 'BCR-25-014'),
    ],
    fy: { 2026: 16225, 2027: 3587 }, prior: 16188, weights: { 2027: [1, 0, 0, 0] }, septemberUnposted: true,
    design: 'Final design complete', ec: 'ROD signed', moa: 'Executed',
    description: 'Expands the Klickitat Hatchery to rear spring Chinook for the Yakama Nation, with a new intake, adult holding and an upgraded fish ladder.',
  },
  {
    id: 'kelt', number: '2007-401-00', title: 'Kelt Reconditioning Facility', category: 'Hatchery', sub: 'Expand',
    sponsor: 'CRITFC', pm: 'Tracy Hauser', record: 'Complete', stage: 'Closeout',
    omb: 'Appropriations language approved', npcc: 'Step 3 (final design)', orig: 3100,
    history: [bh('2016-04-01', 3100, 'Original budget', 'DMF Apr 2016'), bh('2021-09-14', 6500, 'Scope added — second reconditioning building', 'DMF Sep 2021'), bh('2023-10-03', 8944, 'Bids over estimate', 'BCR-24-002')],
    fy: { 2026: 715 }, prior: 8229, weights: { 2026: [1, 1, 1, 0] },
    design: 'Complete', ec: 'FONSI signed', moa: 'Executed',
  },
  {
    id: 'prosser', number: '2008-527-00', title: 'John Day Mitigation @ Prosser', category: 'Hatchery', sub: 'Expand',
    sponsor: 'CRITFC', pm: 'Andy Traylor', record: 'Active', stage: 'Construction', stageNote: 'to Q2 FY27',
    omb: 'Appropriations language approved', npcc: 'Step 3 (final design)', orig: 4500,
    history: [bh('2018-02-20', 4500, 'Original budget', 'DMF Feb 2018'), bh('2023-05-09', 7800, 'Final design estimate', 'DMF May 2023'), bh('2025-01-21', 9627, 'Bids over estimate', 'BCR-25-003')],
    fy: { 2026: 6603, 2027: 3026 }, prior: 998, weights: { 2027: [1, 1, 0, 0] },
    design: 'Final design complete', ec: 'FONSI signed', moa: 'Executed',
  },
  {
    id: 'trinity', number: '1996-040-01', title: 'Trinity (Natapoc) Acclimation Site', category: 'Hatchery', sub: 'Expand',
    sponsor: 'Yakama Nation', pm: 'Mary Todd Haight', record: 'Active', stage: 'Construction', stageNote: 'Phase 2, to Q1 FY28',
    omb: 'Appropriations language approved', npcc: 'Not required', orig: 5100,
    history: [bh('2020-07-01', 5100, 'Original budget', 'DMF Jul 2020'), bh('2024-06-18', 8100, 'Phase 2 added', 'DMF Jun 2024')],
    fy: { 2026: 345, 2027: 5226, 2028: 2210 }, prior: 319, weights: { 2028: [1, 0, 0, 0] }, actualQ4Fy26: 0,
    design: 'Phase 2 final design', ec: 'Complete', moa: 'Executed',
  },
  {
    id: 'sturgeon', number: '2007-155-00', title: 'White Sturgeon Hatchery @ Marion Drain', category: 'Hatchery', sub: 'Expand',
    sponsor: 'CRITFC / YN', pm: 'Brian McIlraith', record: 'Active', stage: 'Design', stageNote: 'groundbreak Q2 FY29',
    omb: 'Appropriations language approved', npcc: 'Step 2 (preliminary design)', orig: 6793,
    history: [bh('2021-03-02', 6793, 'Original budget', 'DMF Mar 2021')], pending: 14937,
    fy: { 2029: 6218 }, prior: 575, weights: { 2029: [0, 1, 1, 1] },
    gates: { cbfishBudget: { status: 'Not started', note: 'Nothing placed before FY29.' } },
    design: '60% design', ec: 'EA in progress', moa: 'Executed (design)',
  },
  {
    id: 'waterwheel', number: '2008-901-00', title: 'Waterwheel Hatchery', category: 'Hatchery', sub: 'Expand',
    sponsor: 'Shoshone-Bannock', pm: 'Mary Todd Haight', record: 'Active', stage: 'Planning/MOA', stageNote: 'groundbreak Q1 FY28',
    omb: 'Appropriations language approved', npcc: 'Step 2 (preliminary design)', orig: 12300,
    history: [bh('2019-09-10', 12300, 'Original budget', 'DMF Sep 2019')], pending: 26346,
    fy: { 2028: 16562, 2029: 9784 },
    gates: {
      leadership: { status: 'In progress', note: 'Increase to $26.3M goes to DMF.', docRef: 'BCR draft' },
      cbfishBudget: { status: 'Not started' },
    },
    design: '30% design', ec: 'Not started', moa: 'In negotiation',
  },
  {
    id: 'coeur-dalene', number: '2024-001-00', title: "Coeur d'Alene Anadromous & Resident Hatchery", category: 'Hatchery', sub: 'Expand',
    sponsor: "Coeur d'Alene Tribe", pm: 'Mary Todd Haight', record: 'Placeholder', stage: 'Planning/MOA', stageNote: 'dropped from BP-26',
    omb: 'Appropriations language approved', npcc: 'Step 1 (master plan)', orig: 40000, fy: {},
    fund: 'Long-term funding agreement',
    gates: {
      leadership: { status: 'Green', date: '2024-03-12', approver: 'Jason Sweet' },
      capitalization: { status: 'Green' },
      funding: { status: 'Green', date: '2024-05-01', docRef: "Coeur d'Alene long-term funding agreement", note: 'Agreement signed — money in an agreement is not a green light by itself.' },
      assetPlan: { status: 'Red', note: 'The ~$20M in the FY27 IPR never reached the FY27 Asset Plan; the tribe was not ready to start.' },
      cbfishBudget: { status: 'Not started' },
    },
    design: 'Master plan', ec: 'Not started', moa: 'Not started',
  },
  {
    id: 'ford', number: '2028-001-00', title: 'Ford Hatchery', category: 'Hatchery', sub: 'Expand',
    sponsor: 'Spokane Tribe', pm: 'Carlos Matthews', record: 'Placeholder', stage: 'Planning/MOA', stageNote: 'groundbreak Q4 FY28',
    omb: 'Appropriations language approved', npcc: 'Step 1 (master plan)', orig: 3000, fy: {},
    gates: { leadership: { status: 'Green' }, funding: { status: 'In progress' } },
    design: 'Master plan', ec: 'Not started', moa: 'Not started',
  },
  {
    id: 'spokane-ops', number: '2024-002-01', title: 'Spokane Operations Center', category: 'Hatchery', sub: 'Expand',
    sponsor: 'Spokane Tribe', pm: '', record: 'Placeholder', stage: 'Planning/MOA', stageNote: 'to FY29',
    omb: 'Not submitted', fy: {},
    gates: { leadership: { status: 'Not started' } },
    design: 'Not started', ec: 'Not started', moa: 'Not started',
  },
  {
    id: 'lake-roosevelt', number: '1991-046-01', title: 'Lake Roosevelt Net Pens', category: 'Hatchery', sub: 'Expand',
    sponsor: 'Spokane Tribe', pm: 'Carlos Matthews', record: 'Active', stage: 'Construction',
    omb: 'Not required (below threshold)', fy: { 2026: 555 },
    design: 'Complete', ec: 'Categorical exclusion', moa: 'Executed',
  },
  {
    id: 'umatilla-water', number: '1989-035-01', title: 'Umatilla Water Supply', category: 'Hatchery', sub: 'Sustain',
    sponsor: 'CTUIR', pm: 'Jennifer Lord', record: 'Active', stage: 'Design', stageNote: 'complete Q4 FY28',
    omb: 'Appropriations language approved', orig: 5367,
    history: [bh('2025-02-04', 5367, 'Original budget', 'DMF Feb 2025')],
    fy: { 2027: 3044, 2028: 2323, 2029: 4600 },
    design: '90% design', ec: 'EA in progress', moa: 'Executed',
  },
  {
    id: 'chief-joseph', number: '2003-023-00', title: 'Chief Joseph Hatchery water temperature', category: 'Hatchery', sub: 'Sustain',
    sponsor: 'Colville Tribes', pm: '', record: 'Placeholder', stage: 'Design',
    omb: 'Not submitted', fy: { 2028: 5000 },
    gates: {
      leadership: { status: 'Green', date: '2026-02-10', approver: 'Jason Sweet' },
      capitalization: { status: 'Green' },
      funding: { status: 'Green', note: 'Budget allocation.' },
      assetPlan: { status: 'Green', note: 'In the FY27 Asset Plan for FY28.' },
      cbfishBudget: { status: 'Not started' },
    },
    design: 'Concept', ec: 'Not started', moa: 'Not started',
  },
  {
    id: 'sherman-creek', number: '1991-047-00', title: 'Sherman Creek Intake', category: 'Hatchery', sub: 'Sustain',
    sponsor: 'WDFW', pm: '', record: 'Placeholder', stage: 'Design',
    omb: 'Not submitted', fy: { 2028: 3000 },
    gates: { leadership: { status: 'In progress' }, assetPlan: { status: 'Green' }, funding: { status: 'In progress' } },
    design: 'Concept', ec: 'Not started', moa: 'Not started',
  },
  {
    id: 'colville-wells', number: null, title: 'Colville Tribe Well Field Rehab', category: 'Hatchery', sub: 'Sustain',
    sponsor: 'Colville Tribes', pm: '', record: 'Placeholder', stage: 'Construction',
    omb: 'Not required (below threshold)', fy: { 2027: 1300 },
    gates: { leadership: { status: 'Green' }, capitalization: { status: 'In progress', note: 'Rehab vs. replacement — Dorie reviewing.' }, funding: { status: 'Green' }, assetPlan: { status: 'Green' }, cbfishBudget: { status: 'In progress' } },
    design: 'Complete', ec: 'Categorical exclusion', moa: 'Not started',
  },
];

const land = (id: string, number: string | null, title: string, sponsor: string, pm: string, fy26: number, fy27: number, fy28: number, acres: number, extra: Partial<Row> = {}): Row => ({
  id, number, title, category: 'Land', sponsor, pm, record: 'Active', stage: 'Acquisition',
  omb: 'Appropriations language approved', fy: { 2026: fy26, 2027: fy27, 2028: fy28 }, acres,
  design: 'Not applicable', ec: 'Per parcel', moa: 'Executed', ...extra,
});

const LAND: Row[] = [
  land('wwf', '2011-003-00', 'Willamette Wildlife Mitigation (WWF)', 'ODFW', 'Matthew Schwartz', 4478, 3276, 15000, 186, { weights: { 2027: [2, 1, 1, 1] } }),
  land('cskt', '2002-003-00', 'CSKT Resident Fish Habitat', 'Confederated Salish-Kootenai Tribes', '', 527, 1250, 1250, 75),
  land('cda-land', null, "Coeur d'Alene Tribe acquisitions", "Coeur d'Alene Tribe", '', 190, 560, 2000, 269),
  land('spokane-land', null, 'Spokane Tribe acquisitions', 'Spokane Tribe', '', 2500, 2000, 2000, 70),
  land('kootenai', null, 'Kootenai Fish & Wildlife Mitigation', 'Kootenai Tribe', '', 2600, 8497, 1000, 1300),
  land('kalispel', null, 'Kalispel Fish & Wildlife Mitigation', 'Kalispel Tribe', '', 2200, 1800, 2000, 275),
  land('umatilla-land', null, 'Umatilla land acquisitions', 'CTUIR', '', 2600, 3900, 2500, 195),
  land('southern-idaho', '1995-057-03', 'Southern Idaho Wildlife Mitigation', 'Shoshone-Paiute Tribes', '', 0, 0, 0, 0),
  land('northern-idaho', null, 'Northern Idaho Wildlife Mitigation', 'Nez Perce Tribe', '', 0, 212, 0, 0),
  land('colville-land', null, 'Colville acquisitions', 'Colville Tribes', '', 0, 0, 2000, 0, {
    gates: { cbfishBudget: { status: 'Not started', note: 'FY28 money not yet placed.' } },
  }),
];

const passage = (id: string, number: string, title: string, sponsor: string, pm: string, fy: Row['fy'], extra: Partial<Row> = {}): Row => ({
  id, number, title, category: 'Passage', sponsor, pm, record: 'Active', stage: 'Construction',
  omb: 'Appropriations language approved', fy, design: 'Final design', ec: 'Complete', moa: 'Executed', ...extra,
});

const PASSAGE: Row[] = [
  passage('crest', '2010-004-01', 'CREST Estuary Habitat Restoration Bridges', 'CREST', 'Alan Whiting', { 2026: 775, 2027: 3000, 2028: 3500 }),
  passage('umabirch', '1987-100-01', 'UmaBirch – Umatilla Anadromous Fish Habitat', 'CTUIR', 'Jennifer Lord', { 2026: 752, 2027: 4001, 2028: 700 }, { account: 'Mixed' }),
  passage('chesnimnus', '1992-026-01', 'Grande Ronde Model Watershed – Chesnimnus Creek', 'GRMW', 'Tracy Hauser', { 2026: 2142, 2027: 2325, 2028: 1301 }),
  passage('uc-programmatic', '2010-001-00', 'Upper Columbia Programmatic Habitat', 'UCSRB', 'Victoria Bohlen', { 2026: 2232, 2027: 1411 }),
  passage('nason', '2009-003-01', 'Upper Columbia Habitat – Yakima Nason Creek', 'Yakama Nation', 'Victoria Bohlen', { 2028: 1500, 2029: 3500 }, {
    stage: 'Design', design: '60% design', ec: 'In progress',
    gates: { cbfishBudget: { status: 'Not started', note: 'FY28 money not yet placed.' } },
  }),
  {
    // Open question 15: FY26 per-project passage sums to 5,901 but Finance's Q3
    // shows 6,844. The 943 gap is carried here as the unallocated placeholder the
    // named passage projects draw down.
    id: 'passage-placeholder', number: null, title: 'Passage placeholder (unallocated)', category: 'Passage',
    sponsor: 'BPA', pm: 'Ben Dick', record: 'Placeholder', stage: 'Planning/MOA',
    omb: 'Not required (below threshold)', fy: { 2026: 943 },
    gates: { leadership: { status: 'Green' }, capitalization: { status: 'Green' }, funding: { status: 'Green' }, assetPlan: { status: 'Green' }, cbfishBudget: { status: 'Green' } },
    design: 'Not applicable', ec: 'Not applicable', moa: 'Not applicable',
    description: 'Budget held for passage work not yet assigned to a named project. Nason Creek, Chesnimnus, Hall Ranch and the estuary work all draw on it.',
  },
];

export const SEED_ROWS: Row[] = [...HATCHERY, ...LAND, ...PASSAGE];

// Milestone bars for the schedule strip (execution-report style), FY24–FY30.
const ms = (id: string, phase: MilestonePhase, start: number, end: number, label?: string, actual?: [number, number]): Milestone => ({
  id, phase, plannedStart: start, plannedEnd: end, label,
  ...(actual ? { actualStart: actual[0], actualEnd: actual[1] } : {}),
});

const MILESTONES: Record<string, Milestone[]> = {
  klickitat: [
    ms('k1', 'Construction procurement', s(2024, 1), s(2024, 3), 'Re-bid', [s(2024, 1), s(2025, 1)]),
    ms('k2', 'Construction', s(2025, 1), s(2027, 1), 'Prime contract', [s(2025, 2), s(2027, 1)]),
  ],
  kelt: [ms('ke1', 'Construction', s(2024, 1), s(2025, 4), undefined, [s(2024, 1), s(2026, 3)])],
  prosser: [
    ms('p1', 'Construction procurement', s(2024, 3), s(2025, 1), undefined, [s(2024, 3), s(2025, 2)]),
    ms('p2', 'Construction', s(2025, 2), s(2027, 2), undefined, [s(2025, 3), s(2027, 2)]),
  ],
  trinity: [
    ms('t1', 'Construction', s(2024, 3), s(2025, 4), 'Phase 1', [s(2024, 3), s(2025, 4)]),
    ms('t2', 'EC', s(2026, 1), s(2026, 3), 'Phase 2 supplemental EA'),
    ms('t3', 'Construction procurement', s(2026, 3), s(2026, 4)),
    ms('t4', 'Construction', s(2027, 1), s(2028, 1), 'Phase 2'),
  ],
  sturgeon: [
    ms('st1', 'Design', s(2025, 1), s(2028, 2)),
    ms('st2', 'EC', s(2026, 2), s(2027, 4)),
    ms('st3', '3-Step review', s(2027, 3), s(2028, 2), 'Step 3 submittal'),
    ms('st4', 'Construction procurement', s(2028, 3), s(2029, 1)),
    ms('st5', 'Construction', s(2029, 2), s(2030, 4)),
  ],
  waterwheel: [
    ms('w1', 'Planning/MOA', s(2026, 1), s(2027, 2), 'MOA with Sho-Ban'),
    ms('w2', 'Design', s(2026, 3), s(2027, 4)),
    ms('w3', 'EC', s(2027, 1), s(2027, 4)),
    ms('w4', 'Construction', s(2028, 1), s(2029, 4)),
  ],
  'coeur-dalene': [
    ms('c1', 'Planning/MOA', s(2025, 1), s(2028, 4)),
    ms('c2', '3-Step review', s(2026, 1), s(2027, 4), 'Step 1 master plan'),
  ],
  ford: [ms('f1', 'Planning/MOA', s(2026, 1), s(2028, 2)), ms('f2', 'Construction', s(2028, 4), s(2030, 2))],
  'umatilla-water': [ms('u1', 'Design', s(2026, 2), s(2027, 3)), ms('u2', 'Construction', s(2027, 3), s(2029, 4))],
  'chief-joseph': [ms('cj1', 'Design', s(2027, 1), s(2027, 4)), ms('cj2', 'Construction', s(2028, 1), s(2028, 4))],
  'sherman-creek': [ms('sc1', 'Design', s(2027, 1), s(2027, 4)), ms('sc2', 'Construction', s(2028, 1), s(2028, 4))],
  'colville-wells': [ms('cw1', 'Construction', s(2027, 1), s(2027, 4))],
  'lake-roosevelt': [ms('lr1', 'Construction', s(2026, 1), s(2026, 4), undefined, [s(2026, 1), s(2026, 4)])],
  crest: [ms('cr1', 'Construction', s(2026, 3), s(2028, 4))],
  umabirch: [ms('ub1', 'Construction', s(2026, 2), s(2028, 2))],
  chesnimnus: [ms('ch1', 'Construction', s(2025, 3), s(2028, 4))],
  'uc-programmatic': [ms('uc1', 'Construction', s(2025, 1), s(2027, 4))],
  nason: [ms('n1', 'Design', s(2026, 3), s(2027, 4)), ms('n2', 'Construction', s(2028, 1), s(2029, 4))],
};

// ---------------------------------------------------------------------------
// Dataset builder
// ---------------------------------------------------------------------------

/** Line-type split: land buys land; everything else is a construction contract with ~8% support capital. */
function splitLines(row: Row, amount: number): Partial<Record<LineType, number>> {
  if (row.category === 'Land') return { 'Land purchase': amount };
  const support = Math.round(amount * 0.08);
  return { 'Construction contract': amount - support, 'Support capital': support };
}

function defaultGates(row: Row): Partial<Record<GateKey, GateRecord>> {
  const committed = row.record === 'Active' || row.record === 'Complete';
  const base: Partial<Record<GateKey, GateRecord>> = committed
    ? {
        leadership: { status: 'Green', approver: 'Jason Sweet' },
        capitalization: { status: 'Green' },
        funding: { status: 'Green', note: row.fund === 'Long-term funding agreement' ? 'Long-term funding agreement' : 'Budget allocation' },
        assetPlan: { status: 'Green' },
        cbfishBudget: { status: 'Green', note: 'Placed at SOY.' },
      }
    : {
        leadership: { status: 'In progress' },
        capitalization: { status: 'Not started' },
        funding: { status: 'Not started' },
        assetPlan: { status: 'Not started' },
        cbfishBudget: { status: 'Not started' },
      };
  // An override replaces the default light outright, so a default note ("Placed
  // at SOY.") never sits under a light that says the opposite.
  for (const [k, v] of Object.entries(row.gates ?? {})) {
    base[k as GateKey] = { status: 'Not started', ...v } as GateRecord;
  }
  return base;
}

function toProject(row: Row): Project {
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    category: row.category,
    subcategory: row.sub,
    sponsor: row.sponsor,
    pm: row.pm,
    fundSource: row.fund ?? 'General',
    accountType: row.account ?? 'Capital',
    portfolio: row.category === 'Hatchery' ? 'Hatchery capital' : row.category === 'Land' ? 'Land capital' : 'Passage (from the passage forecast list)',
    recordType: row.record,
    stage: row.stage,
    stageNote: row.stageNote,
    description: row.description,
    omb: {
      status: row.omb,
      thresholdMet: row.omb !== 'Not required (below threshold)',
      ...(row.omb === 'Appropriations language approved' ? { submittedDate: '2024-07-15', approvedDate: '2025-03-14' } : {}),
    },
    npcc: row.category === 'Hatchery' ? row.npcc ?? 'Not required' : 'Not required',
    gates: defaultGates(row),
    originalBudget: row.orig ?? null,
    budgetHistory: row.history ?? [],
    pendingBudget: row.pending ?? null,
    contingency: row.history?.length ? Math.round((row.history[row.history.length - 1].amount * 0.1) / 10) * 10 : null,
    ec: { status: row.ec ?? 'Not started' },
    moa: { status: row.moa ?? 'Not started' },
    design: { status: row.design ?? 'Not started' },
    milestones: MILESTONES[row.id] ?? [],
    plannedAcres: row.acres,
  };
}

/** Per-row FY totals with a snapshot's overrides applied. */
type FyOverrides = Record<string, Partial<Record<number, number>>>;

function fyTotals(row: Row, overrides?: FyOverrides): Record<number, number> {
  const out: Record<number, number> = {};
  const prior = row.prior ?? 0;
  out[2024] = Math.trunc(prior / 2);
  out[2025] = prior - out[2024];
  for (const fy of FY_LIST.filter((f) => f >= 2026)) out[fy] = row.fy[fy] ?? 0;
  for (const [fy, v] of Object.entries(overrides?.[row.id] ?? {})) out[Number(fy)] = v ?? 0;
  return out;
}

/**
 * Expand rows into quarterly plans and monthly actuals as of a date. Closed
 * quarters get actuals equal to their plan (split across the quarter's months)
 * unless the row says Q4 FY26 landed elsewhere.
 */
export function buildDataset(asOf: string, overrides?: FyOverrides): FrozenData {
  const projects = SEED_ROWS.map(toProject);
  const plans: Record<string, SpendPlan> = {};
  const actuals: Record<string, ActualsByFy> = {};

  for (const row of SEED_ROWS) {
    const totals = fyTotals(row, overrides);
    const plan: SpendPlan = {};
    const quarterTotals = emptySlots();
    for (const fy of FY_LIST) {
      const amount = totals[fy] ?? 0;
      if (!amount) continue;
      const quarters = row.weights?.[fy] ? spreadWeighted(amount, row.weights[fy]!) : spreadEvenly(amount, 4);
      quarters.forEach((qAmount, qi) => {
        const slot = slotOf(fy, qi + 1);
        quarterTotals[slot] += qAmount;
        for (const [lt, v] of Object.entries(splitLines(row, qAmount))) {
          const line = (plan[lt as LineType] ??= emptySlots());
          line[slot] += v ?? 0;
        }
      });
    }
    plans[row.id] = plan;

    const act: ActualsByFy = {};
    for (let slot = 0; slot < SLOT_COUNT; slot++) {
      if (!isClosed(slot, asOf)) continue;
      const fy = fyOfSlot(slot);
      let qAmount = quarterTotals[slot];
      if (fy === 2026 && qOfSlot(slot) === 4 && row.actualQ4Fy26 != null) qAmount = row.actualQ4Fy26;
      if (!qAmount && !act[fy]) continue;
      const months = (act[fy] ??= Array(12).fill(0));
      const parts = spreadEvenly(qAmount, 3);
      const q = qOfSlot(slot);
      parts.forEach((v, i) => { months[(q - 1) * 3 + i] = v; });
      if (row.septemberUnposted && fy === 2026 && q === 4) months[11] = 0;
    }
    if (Object.keys(act).length) actuals[row.id] = act;
  }
  return { projects, plans, actuals };
}

// ---------------------------------------------------------------------------
// Snapshots — FY26 Asset Plan baseline, FY26 Q2, FY26 Q3
// ---------------------------------------------------------------------------

const BASELINE_OVERRIDES: FyOverrides = {
  klickitat: { 2026: 14798 },
  prosser: { 2026: 5603 },
  trinity: { 2027: 10452 },
  waterwheel: { 2028: 33124 },
  'umatilla-water': { 2027: 8668 },
  'chief-joseph': { 2028: 10000 },
  sturgeon: { 2028: 6218, 2029: 0 },
  wwf: { 2026: 6300, 2027: 1454 },
  kootenai: { 2026: 4098 },
  'passage-placeholder': { 2026: 6099 },
};

const Q2_OVERRIDES: FyOverrides = {
  klickitat: { 2026: 16820 },
  prosser: { 2026: 5603 },
  sturgeon: { 2028: 6218, 2029: 0 },
  wwf: { 2026: 6300, 2027: 1454 },
};

function seedSnapshot(id: string, label: string, type: Snapshot['type'], asOf: string, createdBy: string, overrides?: FyOverrides, baselineFy?: number): Snapshot {
  return { id, label, type, asOf, createdBy, createdAt: asOf, baselineFy, data: buildDataset(asOf, overrides) };
}

// ---------------------------------------------------------------------------
// Requests, adjustments, notes
// ---------------------------------------------------------------------------

const req = (r: Omit<CapitalRequest, 'gates' | 'createdAt'> & { gates?: CapitalRequest['gates']; createdAt?: string }): CapitalRequest => ({
  createdAt: '2026-10-05',
  ...r,
  gates: {
    leadership: { status: 'Not started' },
    capitalization: { status: 'Not started' },
    funding: { status: 'Not started' },
    assetPlan: { status: 'Red', note: 'Not in the FY27 Asset Plan.' },
    cbfishBudget: { status: 'Not started' },
    ...r.gates,
  },
});

const notInOmb: CapitalRequest['omb'] = { status: 'Not submitted', thresholdMet: true };

export const REQUESTS: CapitalRequest[] = [
  req({
    id: 'hall-ranch', title: 'Hall Ranch (GRMW)', requester: 'Tracy Hauser', askSponsor: 'GRMW', category: 'Passage', source: 'OMB',
    sourceNote: 'In OMB, not in the Asset Plan', relatedNumber: '1992-026-01',
    omb: { status: 'Submitted', submittedDate: '2025-07-15', thresholdMet: true },
    amounts: { 2027: 14000 }, status: 'Under review', targetCycle: 'FY28 Asset Plan',
    note: 'Was a $2M project three years ago; sponsor now says ready in FY27. Rodrigo says too late for FY27.',
    assumption: 'Open question 7: FY27, under review, leadership gate in progress until Tracy and Jason Sweet confirm.',
    gates: { leadership: { status: 'In progress', note: 'Awaiting Jason Sweet.' }, capitalization: { status: 'Green' } },
  }),
  req({
    id: 'dmf-items', title: 'DMF requests (two $5M items)', requester: 'Ben Dick', askSponsor: 'DMF', category: 'TBD', source: 'Email/partner',
    omb: notInOmb, amounts: { 2027: 10000 }, status: 'New', targetCycle: 'FY28 Asset Plan',
    note: 'Raised at DMF while Rodrigo was out. Confirm which are not already in the Asset Plan (CTUIR land at $3.9M FY27 is).',
    assumption: 'Open question 8: carried as one $10M FY27 request, category TBD.',
  }),
  req({
    id: 'nason-accel', title: 'Nason Creek acceleration', requester: 'Victoria Bohlen', category: 'Passage', source: 'PM forecast',
    relatedNumber: '2009-003-01', omb: { status: 'Appropriations language approved', submittedDate: '2024-07-15', approvedDate: '2025-03-14', thresholdMet: true },
    amounts: { 2027: 3000 }, status: 'New', targetCycle: 'FY28 Asset Plan', linkedProjectId: 'nason',
    gates: { leadership: { status: 'Green' }, capitalization: { status: 'Green' }, funding: { status: 'Green' } },
  }),
  req({
    id: 'albany-oxbow', title: 'Willamette BiOp – Albany Oxbow', requester: 'PM forecast', category: 'Passage', source: 'PM forecast',
    relatedNumber: '2009-012-01', omb: notInOmb, amounts: { 2027: 1400 }, status: 'New', targetCycle: 'FY28 Asset Plan',
  }),
  req({
    id: 'estuary', title: 'Columbia River Estuary Habitat Restoration', requester: 'PM forecast', category: 'Passage', source: 'PM forecast',
    relatedNumber: '2003-011-00', omb: notInOmb, amounts: { 2027: 2500, 2028: 2000 }, status: 'New', targetCycle: 'FY28 Asset Plan',
    note: 'Not in OMB — the flag stays with it if it is added to the plan.',
  }),
  req({
    id: 'elijah-bristow', title: 'Willamette BiOp – Elijah Bristow State Park', requester: 'PM forecast', category: 'Passage', source: 'PM forecast',
    relatedNumber: '2009-012-01', omb: notInOmb, amounts: { 2028: 2600, 2029: 2000 }, status: 'New', targetCycle: 'FY28 Asset Plan',
  }),
  req({
    id: 'lc-estuary', title: 'Lower Columbia Estuary Scoping & Implementation', requester: 'PM forecast', category: 'Passage', source: 'PM forecast',
    relatedNumber: '2010-070-00', omb: notInOmb, amounts: { 2028: 2200 }, status: 'New', targetCycle: 'FY28 Asset Plan',
  }),
  req({
    id: 'clt-estuarine', title: 'Columbia Land Trust Estuarine Restoration', requester: 'PM forecast', category: 'Passage', source: 'PM forecast',
    relatedNumber: '2010-073-00', omb: notInOmb, amounts: { 2028: 2500 }, status: 'New', targetCycle: 'FY28 Asset Plan',
  }),
  req({
    id: 'grande-ronde', title: 'Grande Ronde capital need', requester: 'Tracy Hauser', askSponsor: 'Leadership', category: 'TBD', source: 'Email/partner',
    omb: notInOmb, amounts: { 2028: 2250 }, status: 'New', targetCycle: 'FY28 Asset Plan',
    note: 'Leadership said proceed. May be expense under capitalization policy (revegetation, no construction).',
    assumption: 'Open question 9: FY28 request, capitalization pending.',
    gates: { leadership: { status: 'Green', note: 'Leadership told Tracy to pursue.' }, capitalization: { status: 'In progress', note: 'Capitalization pending — Dorie.' } },
  }),
];

let adjN = 0;
const adj = (a: Omit<CapitalState['adjustments'][number], 'id'>) => ({ id: `adj-${++adjN}`, ...a });

export const ADJUSTMENTS: CapitalState['adjustments'] = [
  adj({ projectId: 'klickitat', type: 'Bid over estimate', amount: 9800, reason: 'Construction bids came in over the final design estimate.', docRef: 'DMF Nov 2024', approvedBy: 'DMF', user: 'Ben Dick', date: '2024-11-12' }),
  adj({ projectId: 'klickitat', type: 'Change order', amount: 5200, reason: 'Site conditions at the intake.', docRef: 'BCR-25-014', approvedBy: 'Finance Committee', user: 'Mary Todd Haight', date: '2025-08-20' }),
  adj({ projectId: 'sturgeon', type: 'Schedule slip', amount: 6218, fromSlot: s(2028, 1), toSlot: s(2029, 2), reason: 'Groundbreaking moved to Q2 FY29; design continues.', varianceReason: 'Schedule slip', docRef: 'FY26 Q2 execution report', user: 'Brian McIlraith', date: '2026-04-28' }),
  adj({ projectId: 'wwf', type: 'Schedule slip', amount: 1822, fromSlot: s(2026, 4), toSlot: s(2027, 1), reason: 'Three WWF closings pushed to FY27 (appraisal review).', varianceReason: 'Partner not ready', docRef: 'Land acquisition tracker, May 2026', user: 'Matthew Schwartz', date: '2026-05-14' }),
  adj({ projectId: 'prosser', type: 'Change order', amount: 1000, toSlot: s(2026, 4), reason: 'Added $1.0M to FY26 for the intake screen change order.', docRef: 'Email, A. Traylor 6/24/26', user: 'Andy Traylor', date: '2026-06-24' }),
  adj({ projectId: 'waterwheel', type: 'Scope change', amount: 14046, reason: 'Budget increase to $26.3M pending DMF — the forecast already carries it.', docRef: 'BCR draft', user: 'Mary Todd Haight', date: '2026-04-10' }),
  adj({ projectId: 'trinity', type: 'Scope change', amount: -5226, fromSlot: s(2027, 1), reason: 'Phase 2 re-scoped; FY27 halved.', docRef: 'FY27 Asset Plan', user: 'Victoria DuVal', date: '2026-08-12' }),
  adj({ projectId: 'umatilla-water', type: 'Schedule slip', amount: 5624, fromSlot: s(2027, 1), toSlot: s(2029, 1), reason: 'Design takes longer; construction moves to FY28–FY29.', varianceReason: 'Schedule slip', docRef: 'FY27 Asset Plan', user: 'Victoria DuVal', date: '2026-08-12' }),
  adj({ projectId: 'chief-joseph', type: 'Scope change', amount: -5000, fromSlot: s(2028, 1), reason: 'Chiller option replaced by well water; estimate halved.', docRef: 'FY27 Asset Plan', user: 'Victoria DuVal', date: '2026-08-12' }),
];

let noteN = 0;
const note = (projectId: string, fy: number, q: number, text: string, author: string, date: string) => ({ id: `note-${++noteN}`, projectId, fy, q, text, author, date });

export const NOTES: CapitalState['notes'] = [
  note('klickitat', 2026, 3, 'June shows a ($169K) reversal — a mis-coded invoice moved to expense.', 'Gloria Scott', '2026-07-10'),
  note('klickitat', 2026, 4, 'Substantially complete; punch list and fish-ladder commissioning carry into Q1 FY27.', 'Mary Todd Haight', '2026-09-25'),
  note('prosser', 2026, 3, 'Added $1.0M to FY26 for the intake screen change order.', 'Andy Traylor', '2026-06-24'),
  note('sturgeon', 2026, 2, 'Groundbreaking moved to Q2 FY29; design continues; Step 3 submittal planned FY28.', 'Brian McIlraith', '2026-04-28'),
  note('waterwheel', 2026, 4, 'MOA negotiation with Sho-Ban continues; budget increase to $26.3M pending DMF.', 'Mary Todd Haight', '2026-09-18'),
  note('trinity', 2026, 4, 'Phase 2 bid package advertised; Phase 1 closeout slipped; Q4 billing ($87K) moves into FY27.', 'Mary Todd Haight', '2026-09-22'),
  note('wwf', 2026, 3, 'Three closings pushed to FY27 pending appraisal review.', 'Matthew Schwartz', '2026-05-14'),
  note('coeur-dalene', 2026, 4, 'Tribe not ready to start; carried as a placeholder outside BP-26.', 'Mary Todd Haight', '2026-09-30'),
  note('chesnimnus', 2026, 4, 'Hall Ranch phase requested separately for FY27 ($14M).', 'Tracy Hauser', '2026-10-02'),
  note('passage-placeholder', 2026, 4, 'FY26 per-project passage sums to 5,901 against Finance Q3 at 6,844; the 943 is held here.', 'Gloria Scott', '2026-07-10'),
];

// ---------------------------------------------------------------------------
// The whole seed
// ---------------------------------------------------------------------------

export function seedState(): CapitalState {
  const current = buildDataset(DATA_AS_OF);
  return {
    version: SEED_VERSION,
    ...current,
    requests: structuredClone(REQUESTS),
    adjustments: structuredClone(ADJUSTMENTS),
    notes: structuredClone(NOTES),
    envelopes: structuredClone(ENVELOPES),
    snapshots: [
      seedSnapshot('fy26-baseline', 'FY26 Asset Plan baseline', 'Asset Plan baseline', '2025-10-01', 'Victoria DuVal', BASELINE_OVERRIDES, 2026),
      seedSnapshot('fy26-q2', 'FY26 Q2', 'Quarterly', '2026-03-31', 'Gloria Scott', Q2_OVERRIDES),
      seedSnapshot('fy26-q3', 'FY26 Q3', 'Finance submission', '2026-06-30', 'Gloria Scott'),
    ],
    settings: {
      dataAsOf: DATA_AS_OF,
      apTurnInDate: '2027-01-29',
      apTurnInCycle: 'FY28 Asset Plan',
      ombThreshold: 3000,
      ratePeriod: { label: 'BP-26', startFy: 2026, endFy: 2027 },
      currentApFy: 2027,
      gates: structuredClone(GATE_DEFINITIONS),
    },
  };
}

/**
 * The sample actuals CSV the PRD ships: Klickitat FY26 monthly capital actuals
 * from the Finance export, through August 2026, in whole dollars. The June
 * reversal is real; the 11-month total (18,301) already beats the Q3 forecast.
 */
export const SAMPLE_ACTUALS_CSV = `category_l5,project_l6,fiscal_year,month,amount
0005510,198811535,2026,Oct,1592974
0005510,198811535,2026,Nov,1035514
0005510,198811535,2026,Dec,1210013
0005510,198811535,2026,Jan,1256526
0005510,198811535,2026,Feb,1071160
0005510,198811535,2026,Mar,2519915
0005510,198811535,2026,Apr,367159
0005510,198811535,2026,May,3120740
0005510,198811535,2026,Jun,-168989
0005510,198811535,2026,Jul,3089966
0005510,198811535,2026,Aug,3205984
`;
