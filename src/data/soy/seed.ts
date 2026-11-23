// Mock data for the SOY future-state prototype, shaped like the FY2027 QA cycle
// (237 items, $326.6M baseline; finals $311.3M on 204 items; $307.6M
// transferred; 9 variances) so the FY2028 walkthrough has realistic scale.
//
// Everything is generated from a fixed-seed PRNG, so every reload and every
// handoff capture sees the same data. Project numbers follow Gemini's
// 0000-000-00 format and titles are plausible basin + activity pairs; they are
// illustrative, not real projects. Every person's name and every comment is
// invented — none is copied from QA or Gemini.
import type { CarryCandidate, Emphasis, Fund, PastCycle, Project, SoyState } from '../../lib/soy/types';

export const SEED_VERSION = 3;

// ---------------------------------------------------------------------------
// People (invented)
// ---------------------------------------------------------------------------

export const ADMIN = 'Morgan Ellery';
export const ADMIN_TEAM = ['Morgan Ellery', 'Reese Halvorsen'];
/** The PM the "Project manager" lens signs in as. */
export const DEMO_PM = 'Casey Navarro';

export const PMS = [
  'Casey Navarro',
  'Avery Lindqvist',
  'Jordan Okafor',
  'Priya Ramaswamy',
  'Theo Barrington',
  'Marisol Quintero',
  'Dev Kapoor',
  'Harper Sato',
  'Rowan Ellison',
  'Nadia Petrova',
  'Elliot Marchetti',
  'Sam Whitaker',
  'June Abernathy',
  'Kai Holloway',
];

/** PMs who are still outstanding when the PM-response simulation runs. */
export const LATE_PMS = ['Theo Barrington', 'Nadia Petrova', 'Sam Whitaker', 'Kai Holloway'];

// ---------------------------------------------------------------------------
// PRNG
// ---------------------------------------------------------------------------

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20270115);
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];
const normal = () => {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

// ---------------------------------------------------------------------------
// Project catalog
// ---------------------------------------------------------------------------

const PLACES = [
  'Yakima', 'Wenatchee', 'Methow', 'Okanogan', 'Entiat', 'John Day', 'Umatilla', 'Walla Walla',
  'Grande Ronde', 'Imnaha', 'Clearwater', 'Upper Salmon', 'Lemhi', 'Pahsimeroi', 'Kootenai',
  'Flathead', 'Clark Fork', 'Pend Oreille', 'Spokane', 'Deschutes', 'Hood River', 'Klickitat',
  'Willamette', 'Lower Columbia estuary', 'Lower Snake', 'Tucannon', 'Asotin Creek', 'Lochsa',
  'Selway', 'Blackfoot', "Coeur d'Alene", 'Wind River', 'Fifteenmile Creek', 'Crooked River',
  'Malheur', 'Owyhee', 'Bitterroot', 'South Fork Salmon', 'Middle Fork John Day', 'Touchet',
];

const ACTIVITIES: Record<Emphasis, string[]> = {
  'Restoration/protection': [
    'habitat restoration', 'riparian protection', 'floodplain reconnection', 'fish passage improvements',
    'instream flow restoration', 'wildlife area operations and maintenance', 'land stewardship',
    'tributary habitat enhancement', 'fish screen operations and maintenance',
  ],
  'RM and E': [
    'status and trend monitoring', 'juvenile outmigration monitoring', 'PIT tag detection array',
    'spawning ground surveys', 'habitat effectiveness monitoring', 'population viability research',
  ],
  Supplementation: [
    'spring Chinook supplementation', 'steelhead hatchery operations', 'coho reintroduction',
    'acclimation facility operations', 'kelt reconditioning',
  ],
  'Harvest augmentation': ['resident fish stocking', 'kokanee enhancement', 'trout hatchery operations'],
  'Predator removal': ['northern pikeminnow management', 'avian predation management', 'nonnative predator suppression'],
  'Data management': ['fish data coordination', 'tributary data stewardship'],
  'Regional coordination': ['regional fish and wildlife coordination', 'tribal program coordination'],
  'Local coordination': ['watershed council coordination', 'conservation district coordination'],
  'Law enforcement': ['fish and wildlife enforcement'],
  'Selective harvest': ['selective fishing gear evaluation'],
};

const EMPHASIS_WEIGHTS: [Emphasis, number][] = [
  ['Restoration/protection', 40], ['RM and E', 25], ['Supplementation', 12], ['Harvest augmentation', 5],
  ['Predator removal', 3], ['Data management', 4], ['Regional coordination', 4], ['Local coordination', 4],
  ['Law enforcement', 2], ['Selective harvest', 1],
];
function pickEmphasis(): Emphasis {
  const total = EMPHASIS_WEIGHTS.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [e, w] of EMPHASIS_WEIGHTS) {
    r -= w;
    if (r <= 0) return e;
  }
  return 'Restoration/protection';
}

const usedNumbers = new Set<string>();
function projectNumber(minYear = 1982, maxYear = 2021): string {
  for (;;) {
    const y = minYear + Math.floor(rand() * (maxYear - minYear + 1));
    const seq = 1 + Math.floor(rand() * 899);
    const rev = rand() < 0.75 ? 0 : 1 + Math.floor(rand() * 9);
    const n = `${y}-${String(seq).padStart(3, '0')}-${String(rev).padStart(2, '0')}`;
    if (!usedNumbers.has(n)) {
      usedNumbers.add(n);
      return n;
    }
  }
}

const usedTitles = new Set<string>();
function projectTitle(emphasis: Emphasis): string {
  for (let i = 0; i < 200; i++) {
    const t = `${pick(PLACES)} ${pick(ACTIVITIES[emphasis])}`;
    if (!usedTitles.has(t)) {
      usedTitles.add(t);
      return t;
    }
  }
  const t = `${pick(PLACES)} ${pick(ACTIVITIES[emphasis])} ${usedTitles.size}`;
  usedTitles.add(t);
  return t;
}

export const PROJECTS: Record<string, Project> = {};

function makeProject(pm: string, opts: Partial<Project> = {}, years?: [number, number]): Project {
  const emphasis = opts.emphasis ?? pickEmphasis();
  const p: Project = {
    number: projectNumber(...(years ?? [1982, 2021])),
    title: projectTitle(emphasis),
    emphasis,
    pm,
    cycleType: 'One-year',
    ...opts,
  };
  PROJECTS[p.number] = p;
  return p;
}

// --- FY2027 items (the carry-forward source) -------------------------------

const PRIOR_COUNT = 237;
const PRIOR_BASELINE_TOTAL = 326_600_000;
const TWO_FUND_PROJECTS = 5; // 232 projects, 5 of them with a second fund → 237 items

interface Draft {
  p: Project;
  fund: Fund;
  weight: number;
}
const drafts: Draft[] = [];

// Casey Navarro (the demo PM) owns exactly five items, one of them two-year.
const caseyProjects = [
  makeProject(DEMO_PM, { emphasis: 'Restoration/protection' }),
  makeProject(DEMO_PM, { emphasis: 'RM and E' }),
  makeProject(DEMO_PM, { emphasis: 'Restoration/protection', cycleType: 'Two-year', offYear: false }),
  makeProject(DEMO_PM, { emphasis: 'Supplementation' }),
  makeProject(DEMO_PM, { emphasis: 'Local coordination' }),
];
for (const p of caseyProjects) drafts.push({ p, fund: 'Program', weight: Math.exp(normal() * 0.7) });

const otherPms = PMS.filter((p) => p !== DEMO_PM);
const projectCount = PRIOR_COUNT - TWO_FUND_PROJECTS - caseyProjects.length;
for (let i = 0; i < projectCount; i++) {
  const p = makeProject(otherPms[i % otherPms.length]);
  const fund: Fund = rand() < 0.14 ? 'BiOp, non-Accord' : rand() < 0.06 ? 'General program' : 'Program';
  drafts.push({ p, fund, weight: Math.exp(normal() * 0.9) });
}
// Second funds for a handful of the larger projects.
for (let i = 0; i < TWO_FUND_PROJECTS; i++) {
  const d = drafts[caseyProjects.length + 3 + i * 17];
  drafts.push({ p: d.p, fund: d.fund === 'Program' ? 'BiOp, non-Accord' : 'Program', weight: d.weight * 0.35 });
}

// Two-year projects: 11 more (12 with Casey's), three of them in their off year in FY2028.
const twoYearIdx = [12, 27, 41, 58, 73, 96, 118, 140, 163, 187, 209];
const offYearIdx = new Set([27, 96, 163]);
for (const i of twoYearIdx) {
  drafts[i].p.cycleType = 'Two-year';
  drafts[i].p.offYear = offYearIdx.has(i);
}

const round100 = (n: number) => Math.round(n / 100) * 100;

// Seven items are not eligible for FY2028, each with the reason it starts unchecked.
const EXCLUDED: Record<number, string> = {
  19: 'Project ended Sep 30, 2027',
  64: 'Project ended Sep 30, 2027',
  101: 'Project closed out in December 2026',
  133: 'Project ended Sep 30, 2027',
  176: 'Fund moved to a Fish Accord in FY2028 — no longer non-Accord expense',
  198: 'Project ended Sep 30, 2027',
  221: 'Fund moved to a Fish Accord in FY2028 — no longer non-Accord expense',
};
// Two carried items have no baseline on file.
const NO_BASELINE = new Set([88, 152]);
const weightTotal = drafts.reduce((s, d, i) => s + (NO_BASELINE.has(i) ? 0 : d.weight), 0);

export const PRIOR_ITEMS: CarryCandidate[] = drafts.map((d, i) => {
  const baseline = NO_BASELINE.has(i) ? null : round100((d.weight / weightTotal) * PRIOR_BASELINE_TOTAL);
  const working = baseline == null ? round100(400_000 + rand() * 600_000) : round100(baseline * (0.9 + rand() * 0.12));
  return {
    id: `${d.p.number}|${d.fund}|Expense`,
    projectNumber: d.p.number,
    fund: d.fund,
    priorBaseline: baseline,
    priorWorking: working,
    excludeReason: EXCLUDED[i] ?? null,
  };
});

// --- New eligible projects (not in FY2027) --------------------------------

export const NEW_PROJECTS: { id: string; projectNumber: string; fund: Fund; startNote: string }[] = [
  makeProject('Harper Sato', { emphasis: 'Restoration/protection' }, [2025, 2026]),
  makeProject('Dev Kapoor', { emphasis: 'RM and E' }, [2025, 2026]),
  makeProject('Avery Lindqvist', { emphasis: 'Restoration/protection' }, [2025, 2026]),
  makeProject('Jordan Okafor', { emphasis: 'Predator removal' }, [2025, 2026]),
  makeProject('June Abernathy', { emphasis: 'Data management' }, [2025, 2026]),
  makeProject('Marisol Quintero', { emphasis: 'Local coordination' }, [2025, 2026]),
].map((p, i) => ({
  id: `${p.number}|Program|Expense`,
  projectNumber: p.number,
  fund: 'Program' as Fund,
  startNote: ['Starts Oct 1, 2027', 'Starts Oct 1, 2027', 'Approved Nov 2026, starts FY2028', 'Starts Oct 1, 2027', 'Starts Jan 1, 2028', 'Starts Oct 1, 2027'][i],
}));
/** The four the walkthrough adds. */
export const WALKTHROUGH_NEW = NEW_PROJECTS.slice(0, 4).map((n) => n.id);

// ---------------------------------------------------------------------------
// Past cycles (FY2014–2027), summarised
// ---------------------------------------------------------------------------

const M = 1_000_000;
export const PAST_CYCLES: PastCycle[] = [
  [2014, 221, 247.9, 241.2, 241.2, 0],
  [2015, 224, 252.3, 247.0, 247.0, 0],
  [2016, 226, 258.8, 251.4, 251.4, 0],
  [2017, 229, 263.0, 255.9, 255.9, 0],
  [2018, 231, 268.4, 262.7, 262.7, 0],
  [2019, 233, 274.1, 266.0, 266.0, 0],
  [2020, 234, 281.6, 270.8, 270.8, 0],
  [2021, 235, 289.2, 279.5, 279.5, 0],
  [2022, 236, 296.7, 285.1, 285.1, 0],
  [2023, 238, 304.5, 292.6, 292.6, 0],
].map(([fy, items, b, f, t, v]) => ({
  fy, status: 'Closed' as const, stage: 'complete' as const, items, baseline: b * M, final: f * M, transferred: t * M, varianceItems: v,
}));
PAST_CYCLES.push(
  {
    fy: 2024, status: 'Open', stage: 'final', items: 239, baseline: 311.9 * M, final: 298.4 * M, transferred: 297.9 * M, varianceItems: 3,
    blockers: ['3 items differ between final and transferred ($0.5M)', '1 item has no final amount'],
  },
  {
    fy: 2025, status: 'Open', stage: 'final', items: 238, baseline: 316.2 * M, final: 303.0 * M, transferred: 301.8 * M, varianceItems: 5,
    blockers: ['5 items differ between final and transferred ($1.2M)'],
  },
  {
    fy: 2026, status: 'Open', stage: 'final', items: 236, baseline: 321.4 * M, final: 306.7 * M, transferred: 305.9 * M, varianceItems: 4,
    blockers: ['4 items differ between final and transferred ($0.8M)', '2 items have no final amount'],
  },
  {
    fy: 2027, status: 'Open', stage: 'final', items: 237, baseline: 326.6 * M, final: 311.3 * M, transferred: 307.6 * M, varianceItems: 9,
    blockers: ['9 items differ between final and transferred ($3.7M)', '2 items with a final amount were never transferred', '33 items have no final amount — confirm they are $0'],
  },
);

// ---------------------------------------------------------------------------
// Default cycle dates (the standard pattern)
// ---------------------------------------------------------------------------

export const DEFAULT_DATES = { ewb: '2027-03-01', pm: '2027-04-12', final: '2027-05-10', complete: '2027-06-01' };

/** The demo's "today" for each point in the story. */
export const STORY_DATES = {
  draft: '2027-01-15',
  ewb: '2027-03-01',
  pm: '2027-04-12',
  reminder: '2027-05-03',
  final: '2027-05-10',
  transfer: '2027-06-01',
  roundTwo: '2027-06-08',
  close: '2027-06-15',
};

export function seedState(): SoyState {
  return {
    version: SEED_VERSION,
    today: STORY_DATES.draft,
    cycle: {
      fy: 2028,
      status: 'Draft',
      stage: null,
      dates: { ...DEFAULT_DATES },
      items: [],
      decisions: [],
      activity: [
        { id: 'a-draft', date: STORY_DATES.draft, who: 'CBFish', kind: 'setup', text: 'FY2028 SOY drafted automatically with the standard dates. Review it and run setup to open it.' },
      ],
      reminders: { on: true, daysBefore: 5 },
      reopenLog: [],
    },
    pastCycles: PAST_CYCLES.map((c) => ({ ...c, blockers: c.blockers ? [...c.blockers] : undefined })),
    notifyPrefs: Object.fromEntries(PMS.map((p, i) => [p, i % 3 === 1 ? 'immediately' : 'digest'])) as SoyState['notifyPrefs'],
    pmResponsesSimulated: false,
  };
}
