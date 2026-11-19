// Program results for the /home metrics band (CBF-8287) — ONE data source for
// every presentation option (cards, counters, growth, basin), so switching
// options never changes the numbers.
//
// PLACEHOLDER DATA. Every figure here is illustrative until CBF-8302 settles
// which CBFish (or warehouse) queries produce each metric. The shapes are what
// the real feed will need to supply: a total, a cumulative series by fiscal
// year, a split by state, a split by program area, and the projects behind it.
//
// Totals, their "+"/"~" qualifiers and FY25 gains now match BPA's FY25
// results table (Nov 2026). Everything else is still illustrative: the
// year-by-year curve, the state split, the program-area splits (scaled to the
// new totals) and the project rows.

export type StateCode = 'WA' | 'OR' | 'ID' | 'MT';

export const STATES: { code: StateCode; name: string }[] = [
  { code: 'WA', name: 'Washington' },
  { code: 'OR', name: 'Oregon' },
  { code: 'ID', name: 'Idaho' },
  { code: 'MT', name: 'Montana' },
];

export interface Metric {
  id: string;
  /** Sentence-case label, read after the number: "1,530,000 acres of land protected…" */
  label: string;
  /** Short name for chips, axes and the map picker. */
  short: string;
  /** Unit word for tooltips: "acres", "fish". */
  unit: string;
  /** One line on what counts toward the number. */
  definition: string;
  total: number;
  /** How BPA qualifies the total: "+" (at least) or "~" (approximately). */
  qualifier?: '+' | '~';
  /** Cumulative total at the end of each fiscal year, FY05 → FY25. */
  cumulative: { fy: number; value: number }[];
  /** Fiscal years whose gain is a reported figure; every other year of
      `cumulative` is an illustrative placeholder. */
  reportedFys: number[];
  byState: Record<StateCode, number>;
  /** Split by program area, each with a one-line description for the homepage. */
  byProgram: { name: string; value: number; description: string }[];
  /** Example projects behind the number. Generic placeholders, not real projects. */
  projects: { name: string; state: StateCode; value: number }[];
}

export const FIRST_FY = 2005;
export const LAST_FY = 2025;

/** A smooth, slightly accelerating build-up to `total` — stands in for the
    real year-by-year series until the warehouse feed exists.

    With a reported `gain` for the last fiscal year, the curve is built up to
    `total − gain` at the year before, so every earlier year scales with it
    and the reported gain is the only fixed step (pinning one point alone
    piles the whole difference into a single fake spike year). */
function buildUp(total: number, curve = 1.25, gain?: number): { fy: number; value: number }[] {
  // a reported gain can't be negative or exceed the total
  const g = gain === undefined ? undefined : Math.min(Math.max(gain, 0), total);
  const target = total - (g ?? 0);
  const n = (g === undefined ? LAST_FY : LAST_FY - 1) - FIRST_FY + 1;
  // each year's gain follows the curve with a light wobble; every gain is
  // positive, so the running total only goes up
  const gains = Array.from({ length: n }, (_, i) =>
    (Math.pow((i + 1) / n, curve) - Math.pow(i / n, curve)) * (1 + 0.12 * Math.sin(i * 1.7)));
  const scale = target / gains.reduce((a, b) => a + b, 0);
  let run = 0;
  const series = gains.map((x, i) => {
    run += x * scale;
    return { fy: FIRST_FY + i, value: i === n - 1 ? target : Math.round(run) };
  });
  if (g !== undefined) series.push({ fy: LAST_FY, value: total });
  return series;
}

/** Split `total` across states by weight, keeping the parts summing exactly. */
function split(total: number, w: Record<StateCode, number>): Record<StateCode, number> {
  const sum = Object.values(w).reduce((a, b) => a + b, 0);
  const out = {} as Record<StateCode, number>;
  let used = 0;
  (Object.keys(w) as StateCode[]).forEach((k, i, keys) => {
    out[k] = i === keys.length - 1 ? total - used : Math.round((total * w[k]) / sum);
    used += out[k];
  });
  return out;
}


/** A reported gain for one fiscal year. It must be LAST_FY: the series pins
    the last year's gain, so a stale year would silently be relabelled. */
type Reported = { fy: number; gain: number };

function metric(m: Omit<Metric, 'cumulative' | 'byState' | 'reportedFys'> & { weights: Record<StateCode, number>; curve?: number; reported?: Reported }): Metric {
  const { weights, curve, reported, ...rest } = m;
  if (reported && reported.fy !== LAST_FY) {
    throw new Error(`${m.id}: reported gain is for FY${reported.fy}, but LAST_FY is ${LAST_FY}. Update the gain with LAST_FY.`);
  }
  return {
    ...rest,
    cumulative: buildUp(m.total, curve, reported?.gain),
    reportedFys: reported ? [reported.fy] : [],
    byState: split(m.total, weights),
  };
}

export const METRICS: Metric[] = [
  metric({
    id: 'habitat',
    // BPA's row "Acres of land protected for wildlife conservation". The
    // separate "improved" row (935,500+) is left out: the two may overlap.
    label: 'Acres of land protected for wildlife conservation',
    short: 'Habitat',
    unit: 'acres',
    definition: 'Habitat acres protected for wildlife conservation by acquisition or easement.',
    total: 1530000,
    qualifier: '+',
    reported: { fy: 2025, gain: 46236 },
    weights: { WA: 34, OR: 30, ID: 22, MT: 14 },
    byProgram: [
      { name: 'Tributary habitat', value: 739000, description: 'Land protected along streams, side channels and streamside areas where salmon and steelhead spawn and rear.' },
      { name: 'Wildlife mitigation', value: 492200, description: 'Habitat protected for wildlife to offset lands lost to dam construction and reservoirs.' },
      { name: 'Mainstem habitat', value: 186200, description: 'Shoreline and off-channel land protected along the Columbia and Snake rivers.' },
      { name: 'Resident fish', value: 112600, description: 'Land protected for fish that live in the basin year-round, such as bull trout and sturgeon.' },
    ],
    projects: [
      { name: 'Northeast Oregon tributary land acquisitions', state: 'OR', value: 48200 },
      { name: 'North-central Washington floodplain easements', state: 'WA', value: 36900 },
      { name: 'Upper Salmon conservation easements', state: 'ID', value: 31400 },
    ],
  }),
  metric({
    id: 'estuary',
    label: 'Acres of estuary floodplain restored or protected',
    short: 'Estuary floodplain',
    unit: 'acres',
    definition: 'Lower Columbia estuary floodplain acres restored (reconnected to tidal flow by levee breaches, culvert and tide-gate work) or protected by acquisition or easement.',
    // BPA FY25 results: ~17,000 acres of estuarine floodplain since 2005; 113 in FY25
    total: 17000,
    qualifier: '~',
    reported: { fy: 2025, gain: 113 },
    curve: 1.6,
    weights: { WA: 56, OR: 44, ID: 0, MT: 0 },
    byProgram: [
      { name: 'Levee breach and setback', value: 9370, description: 'Opening or moving levees so tides and river flows reach the floodplain again.' },
      { name: 'Tide-gate replacement', value: 4510, description: 'Fish-friendly tide gates that let young salmon reach tidal marshes.' },
      { name: 'Culvert and channel work', value: 3120, description: 'Removing barriers and reopening tidal channels through former wetlands.' },
    ],
    projects: [
      { name: 'Lower Columbia levee setback', state: 'WA', value: 965 },
      { name: 'Oregon-side tidal marsh restoration', state: 'OR', value: 191 },
      { name: 'Washington-side tide-gate replacement', state: 'WA', value: 160 },
    ],
  }),
  metric({
    id: 'fish',
    label: 'Fish released from hatcheries',
    short: 'Fish released',
    unit: 'fish',
    definition: 'Juvenile salmon, steelhead, sturgeon and resident fish released from program-funded hatchery facilities.',
    // BPA FY25 results: 419 million fish released since 2005; 19.8 million in FY25
    total: 419000000,
    reported: { fy: 2025, gain: 19800000 },
    curve: 1.05,
    weights: { WA: 38, OR: 27, ID: 29, MT: 6 },
    byProgram: [
      { name: 'Spring Chinook', value: 163600000, description: 'Juveniles released to rebuild and supplement spring-run Chinook salmon.' },
      { name: 'Fall Chinook', value: 121700000, description: 'Juveniles released for fall-run Chinook salmon.' },
      { name: 'Steelhead', value: 77800000, description: 'Juvenile steelhead released into tributaries across the basin.' },
      { name: 'Coho and other', value: 55900000, description: 'Coho reintroduction plus sockeye, sturgeon and resident fish releases.' },
    ],
    projects: [
      { name: 'Yakima basin spring Chinook supplementation', state: 'WA', value: 3150000 },
      { name: 'Clearwater basin hatchery program', state: 'ID', value: 2630000 },
      { name: 'Northeast Oregon hatchery program', state: 'OR', value: 2310000 },
    ],
  }),
];

/** "2.1 billion", "1.53 million", "565,000", "14" — compact where it helps. */
export function formatCompact(n: number): string {
  if (n >= 1e9) return `${+(n / 1e9).toFixed(n >= 1e10 ? 0 : 1)} billion`;
  if (n >= 1e6) return `${+(n / 1e6).toFixed(2)} million`;
  return n.toLocaleString('en-US');
}
export const formatFull = (n: number) => n.toLocaleString('en-US');

/** A metric's total with BPA's qualifier: "1.53 million+", "~17,000". */
export const qualify = (m: Pick<Metric, 'qualifier'>, text: string) =>
  m.qualifier === '~' ? `~${text}` : m.qualifier === '+' ? `${text}+` : text;

// ── Contributing contracts ──────────────────────────────────────────────────
// The contracts behind each total, for the /program-results/<metric> pages.
// Deterministic, fictional, domain-credible: no real contract or project
// numbers, no real contractor names (same bar as rme-contract-reports.mjs).
// A sample of ~20 per measure; the real list comes from CBF-8302's queries.

export interface ContributingContract {
  contractNumber: string;
  projectNumber: string;
  title: string;
  contractor: string;
  state: StateCode;
  /** Program area, one of the measure's byProgram names. */
  program: string;
  status: 'Active' | 'Closed';
  start: string; // ISO date
  end: string;
  /** This contract's contribution to the measure, in the measure's unit. */
  contribution: number;
}

const CONTRACTOR_KINDS = [
  'Tribal fisheries department', 'State fish and wildlife agency', 'Watershed council',
  'Soil and water conservation district', 'Land trust', 'Regional fisheries enhancement group',
];
const PLACES: Record<StateCode, string[]> = {
  WA: ['Upper Columbia', 'Yakima', 'Lower Columbia', 'Walla Walla', 'Okanogan'],
  OR: ['John Day', 'Grande Ronde', 'Willamette', 'Deschutes', 'Umatilla'],
  ID: ['Clearwater', 'Upper Salmon', 'Kootenai', 'Lemhi', 'Pend Oreille'],
  MT: ['Flathead', 'Kootenai', 'Bitterroot', 'Clark Fork', 'Blackfoot'],
};
const WORK: Record<string, string[]> = {
  habitat: ['tributary land acquisition', 'riparian conservation easement', 'floodplain land purchase', 'wildlife area acquisition'],
  estuary: ['levee breach and floodplain reconnection', 'tide-gate replacement', 'tidal marsh restoration', 'culvert removal'],
  fish: ['spring Chinook hatchery operations', 'steelhead acclimation and release', 'resident trout production', 'coho reintroduction'],
};

/** Small seeded PRNG so every build produces the same sample. */
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function sampleContracts(m: Metric, seed: number): ContributingContract[] {
  const rand = seeded(seed);
  const states = (Object.keys(m.byState) as StateCode[]).filter((s) => m.byState[s] > 0);
  const rows: ContributingContract[] = Array.from({ length: 20 }, () => {
    const state = states[Math.floor(rand() * states.length)];
    // program area drawn in proportion to the measure's own split
    let r = rand() * m.byProgram.reduce((n, p) => n + p.value, 0);
    const program = (m.byProgram.find((p) => (r -= p.value) < 0) ?? m.byProgram[0]).name;
    const place = PLACES[state][Math.floor(rand() * PLACES[state].length)];
    const work = WORK[m.id][Math.floor(rand() * WORK[m.id].length)];
    const startYear = FIRST_FY + 1 + Math.floor(rand() * 21);
    const len = 1 + Math.floor(rand() * 4);
    const endYear = Math.min(startYear + len, LAST_FY + 2);
    const share = Math.round((m.total / 260) * (0.25 + rand() * 1.75));
    return {
      contractNumber: String(70000 + Math.floor(rand() * 19999)),
      projectNumber: `${startYear - Math.floor(rand() * 8)}-${String(Math.floor(rand() * 899) + 100)}-00`,
      title: `${place} ${work}`,
      contractor: `${place} ${CONTRACTOR_KINDS[Math.floor(rand() * CONTRACTOR_KINDS.length)].toLowerCase()}`.replace(/^./, (c) => c.toUpperCase()),
      state,
      program,
      status: endYear > LAST_FY ? 'Active' : 'Closed',
      start: `${startYear - 1}-10-01`,
      end: `${endYear}-09-30`,
      contribution: share,
    };
  });
  return rows.sort((a, b) => b.contribution - a.contribution);
}

export const CONTRACTS: Record<string, ContributingContract[]> = Object.fromEntries(
  METRICS.map((m, i) => [m.id, sampleContracts(m, 4211 + i * 97)]),
);

/** Program area each measure reports under — the "Area" column of BPA's
    "Current metrics" table (p. 7). Habitat reads "Habitat protection" because
    the measure is now BPA's protected-land row, not restoration. */
export const AREA: Record<string, string> = {
  habitat: 'Habitat protection',
  estuary: 'Estuary habitat restoration',
  fish: 'Hatchery production',
};

/** URL-hash token for a program area or state filter on /program-results:
    "program-tributary-habitat", "state-WA". Bare tokens survive every host. */
export const filterToken = (kind: 'program' | 'state', value: string) =>
  `${kind}-${kind === 'state' ? value : value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
