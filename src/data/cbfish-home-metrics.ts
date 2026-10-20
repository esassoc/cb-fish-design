// Program results for the /home metrics band (CBF-8287) — ONE data source for
// every presentation option (cards, counters, growth, basin), so switching
// options never changes the numbers.
//
// PLACEHOLDER DATA. Every figure here is illustrative until CBF-8302 settles
// which CBFish (or warehouse) queries produce each metric. The shapes are what
// the real feed will need to supply: a total, a cumulative series by fiscal
// year, a split by state, a split by program area, and the projects behind it.

export type StateCode = 'WA' | 'OR' | 'ID' | 'MT';

export const STATES: { code: StateCode; name: string }[] = [
  { code: 'WA', name: 'Washington' },
  { code: 'OR', name: 'Oregon' },
  { code: 'ID', name: 'Idaho' },
  { code: 'MT', name: 'Montana' },
];

export interface Metric {
  id: string;
  /** Sentence-case label, read after the number: "1,060,000 acres of habitat…" */
  label: string;
  /** Short name for chips, axes and the map picker. */
  short: string;
  /** Unit word for tooltips: "acres", "fish". */
  unit: string;
  /** One line on what counts toward the number. */
  definition: string;
  total: number;
  /** Cumulative total at the end of each fiscal year, FY05 → FY25. */
  cumulative: { fy: number; value: number }[];
  byState: Record<StateCode, number>;
  /** Split by program area, each with a one-line description for the homepage. */
  byProgram: { name: string; value: number; description: string }[];
  /** Example projects behind the number. Generic placeholders, not real projects. */
  projects: { name: string; state: StateCode; value: number }[];
}

export const FIRST_FY = 2005;
export const LAST_FY = 2025;

/** A smooth, slightly accelerating build-up to `total` — stands in for the
    real year-by-year series until the warehouse feed exists. */
function buildUp(total: number, curve = 1.25): { fy: number; value: number }[] {
  const years = LAST_FY - FIRST_FY;
  return Array.from({ length: years + 1 }, (_, i) => {
    const t = (i + 1) / (years + 1);
    const wobble = 1 + 0.035 * Math.sin(i * 1.7);
    return { fy: FIRST_FY + i, value: Math.round(total * Math.min(1, Math.pow(t, curve) * wobble)) };
  }).map((d, i, a) => (i === a.length - 1 ? { ...d, value: total } : d));
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


function metric(m: Omit<Metric, 'cumulative' | 'byState'> & { weights: Record<StateCode, number>; curve?: number }): Metric {
  const { weights, curve, ...rest } = m;
  return { ...rest, cumulative: buildUp(m.total, curve), byState: split(m.total, weights) };
}

export const METRICS: Metric[] = [
  metric({
    id: 'habitat',
    label: 'Acres of habitat protected or improved',
    short: 'Habitat',
    unit: 'acres',
    definition: 'Tributary, mainstem and upland habitat acres protected by acquisition or easement, or improved by restoration work.',
    total: 1060000,
    weights: { WA: 34, OR: 30, ID: 22, MT: 14 },
    byProgram: [
      { name: 'Tributary habitat', value: 512000, description: 'Restoring streams, side channels and streamside areas where salmon and steelhead spawn and rear.' },
      { name: 'Wildlife mitigation', value: 341000, description: 'Habitat protected for wildlife to offset lands lost to dam construction and reservoirs.' },
      { name: 'Mainstem habitat', value: 129000, description: 'Shoreline and off-channel habitat along the Columbia and Snake rivers.' },
      { name: 'Resident fish', value: 78000, description: 'Habitat for fish that live in the basin year-round, such as bull trout and sturgeon.' },
    ],
    projects: [
      { name: 'Northeast Oregon tributary restoration', state: 'OR', value: 48200 },
      { name: 'North-central Washington floodplain work', state: 'WA', value: 36900 },
      { name: 'Upper Salmon conservation easements', state: 'ID', value: 31400 },
    ],
  }),
  metric({
    id: 'estuary',
    label: 'Acres of estuary floodplain reconnected',
    short: 'Estuary floodplain',
    unit: 'acres',
    definition: 'Lower Columbia estuary floodplain acres reconnected to tidal flow by levee breaches, culvert and tide-gate work.',
    total: 9800,
    curve: 1.6,
    weights: { WA: 56, OR: 44, ID: 0, MT: 0 },
    byProgram: [
      { name: 'Levee breach and setback', value: 5400, description: 'Opening or moving levees so tides and river flows reach the floodplain again.' },
      { name: 'Tide-gate replacement', value: 2600, description: 'Fish-friendly tide gates that let young salmon reach tidal marshes.' },
      { name: 'Culvert and channel work', value: 1800, description: 'Removing barriers and reopening tidal channels through former wetlands.' },
    ],
    projects: [
      { name: 'Lower Columbia levee setback', state: 'WA', value: 965 },
      { name: 'Oregon-side tidal marsh restoration', state: 'OR', value: 191 },
      { name: 'Washington-side tide-gate replacement', state: 'WA', value: 160 },
    ],
  }),
  metric({
    id: 'fish',
    label: 'Fish produced by program hatcheries',
    short: 'Fish produced',
    unit: 'fish',
    definition: 'Juvenile salmon, steelhead, sturgeon and resident fish released from program-funded hatchery facilities.',
    total: 2100000000,
    curve: 1.05,
    weights: { WA: 38, OR: 27, ID: 29, MT: 6 },
    byProgram: [
      { name: 'Spring Chinook', value: 820000000, description: 'Juveniles released to rebuild and supplement spring-run Chinook salmon.' },
      { name: 'Fall Chinook', value: 610000000, description: 'Juveniles released for fall-run Chinook salmon.' },
      { name: 'Steelhead', value: 390000000, description: 'Juvenile steelhead released into tributaries across the basin.' },
      { name: 'Coho and other', value: 280000000, description: 'Coho reintroduction plus sockeye, sturgeon and resident fish releases.' },
    ],
    projects: [
      { name: 'Yakima basin spring Chinook supplementation', state: 'WA', value: 15800000 },
      { name: 'Clearwater basin hatchery program', state: 'ID', value: 13200000 },
      { name: 'Northeast Oregon hatchery program', state: 'OR', value: 11600000 },
    ],
  }),
  metric({
    id: 'wildlife',
    label: 'Acres of land protected for wildlife',
    short: 'Wildlife lands',
    unit: 'acres',
    definition: 'Acres acquired or placed under easement to mitigate wildlife habitat lost to hydroelectric construction and inundation.',
    total: 565000,
    weights: { WA: 30, OR: 24, ID: 26, MT: 20 },
    byProgram: [
      { name: 'Fee-title acquisitions', value: 318000, description: 'Land bought outright and managed as wildlife habitat.' },
      { name: 'Conservation easements', value: 172000, description: 'Private land kept as habitat through permanent easements.' },
      { name: 'Long-term agreements', value: 75000, description: 'Land protected through long-term management agreements.' },
    ],
    projects: [
      { name: 'North Idaho wildlife mitigation lands', state: 'ID', value: 21400 },
      { name: 'Willamette valley wildlife lands', state: 'OR', value: 18700 },
      { name: 'Northwest Montana mitigation lands', state: 'MT', value: 16300 },
    ],
  }),
];

/** "2.1 billion", "1.06 million", "565,000", "14" — compact where it helps. */
export function formatCompact(n: number): string {
  if (n >= 1e9) return `${+(n / 1e9).toFixed(n >= 1e10 ? 0 : 1)} billion`;
  if (n >= 1e6) return `${+(n / 1e6).toFixed(2)} million`;
  return n.toLocaleString('en-US');
}
export const formatFull = (n: number) => n.toLocaleString('en-US');

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
  habitat: ['tributary habitat restoration', 'riparian planting and fencing', 'instream structure placement', 'side-channel reconnection'],
  estuary: ['levee breach and floodplain reconnection', 'tide-gate replacement', 'tidal marsh restoration', 'culvert removal'],
  fish: ['spring Chinook hatchery operations', 'steelhead acclimation and release', 'resident trout production', 'coho reintroduction'],
  wildlife: ['wildlife area acquisition', 'conservation easement', 'shrub-steppe habitat protection', 'wetland mitigation lands'],
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

// ── Everyday-scale comparisons ──────────────────────────────────────────────
// "An area equivalent to more than 9 times the size of Seattle" — the device
// BPA's 2023 Fish & Wildlife Program review uses (p. 6), here computed from the
// measure's total so it stays true when the placeholder figures are replaced.
// Reference sizes are approximate public figures.
export interface Equivalent {
  /** The thing measured against, as it reads after "the size of". */
  reference: string;
  /** Size of one reference in the measure's unit. */
  size: number;
  /** Plural noun for the unit strip: "Seattles". */
  plural: string;
  /** How the multiple reads: "area" → "N times the size of", "per" → "N for every". */
  kind: 'area' | 'per';
}
export const EQUIVALENTS: Record<string, Equivalent> = {
  habitat: { reference: 'the city of Seattle', size: 53600, plural: 'Seattles', kind: 'area' },           // ~83.8 sq mi land area
  estuary: { reference: 'Ann Morrison Park in Boise', size: 153, plural: 'Ann Morrison Parks', kind: 'area' }, // ~153 acres
  fish: { reference: 'person living in the four program states', size: 15400000, plural: 'residents', kind: 'per' }, // ~15.4M people, WA+OR+ID+MT
  wildlife: { reference: 'Siuslaw National Forest', size: 630000, plural: 'Siuslaw National Forests', kind: 'area' }, // ~630,000 acres
};

/** "about 20 times the size of the city of Seattle" / "about 136 for every person…" */
export function equivalentPhrase(m: Metric): { multiple: number; text: string } | null {
  const e = EQUIVALENTS[m.id];
  if (!e) return null;
  const x = m.total / e.size;
  const shown = x >= 10 ? Math.round(x).toLocaleString('en-US') : x >= 1 ? x.toFixed(1).replace(/\.0$/, '') : null;
  if (e.kind === 'per') {
    // below one per person, keep two decimals rather than rounding to nothing
    if (!shown) return { multiple: x, text: `about ${x.toFixed(2)} for every ${e.reference}` };
    return { multiple: x, text: `about ${shown} for every ${e.reference}` };
  }
  if (!shown) return { multiple: x, text: `about ${Math.round(x * 100)}% of the size of ${e.reference}` };
  return { multiple: x, text: `about ${shown} times the size of ${e.reference}` };
}

/** Program area each measure reports under — the "Area" column of BPA's
    "Current metrics" table (p. 7). */
export const AREA: Record<string, string> = {
  habitat: 'Tributary habitat restoration',
  estuary: 'Estuary habitat restoration',
  fish: 'Hatchery production',
  wildlife: 'Wildlife mitigation',
};

/** URL-hash token for a program area or state filter on /program-results:
    "program-tributary-habitat", "state-WA". Bare tokens survive every host. */
export const filterToken = (kind: 'program' | 'state', value: string) =>
  `${kind}-${kind === 'state' ? value : value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
