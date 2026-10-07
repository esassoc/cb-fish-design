// Vendor Line Item Budget (LIB) entry — mock data + pricing engine for /lib-entry.
//
// INVENTED, NOT DERIVED. The project number, project title, contract/action
// numbers, sponsor organization, contract value, indirect rate, and every dollar
// figure below are fictional, composed for this prototype. Only two things come
// from the real world, and both are public reference material rather than
// contract content: Columbia Basin tributary place names (the repo's mock-data
// convention for domain credibility) and the shape of BPA's work-element type
// taxonomy ("119. Manage and Administer Projects"), which the spoke already
// treats as safe in src/data/work-elements.ts.
//
// PERSONNEL RULE: titles only, never names. A LIB carries positions, not people.
//
// ── The five line shapes ────────────────────────────────────────────────────
// Every cost line in a LIB is one of five shapes. The shape decides which cells
// the row exposes — this is what "add a line branches by category" actually
// means, and it is why entry belongs in the grid rather than in a modal:
//
//   A  qty-rate        label, qty (+ optional 2nd qty), unit, cost per unit.
//                      The vendor types the rate.
//   B  authority-rate  label, location, season, qty (+ 2nd qty). The rate is
//                      REFERENCED from the GSA schedule, never typed.
//   C  pct-of-base     a percentage of a base. No qty, no unit. Mathematically
//                      dependent on other lines — and in Personnel — Fringe,
//                      GENERATED from them rather than authored at all.
//   D  lump            label, one dollar amount. No qty, no rate.
//   E  travel-line     belongs to a TRIP and picks a travel KIND (lodging, M&IE,
//                      airfare, POV mileage, car rental, ground transport,
//                      parking, rental fuel, registration — or a vendor-defined
//                      "other travel" line). The kind
//                      fixes WHAT IS COUNTED (rooms, travelers, vehicles), the
//                      duration unit, and which schedule rows the rate may come
//                      from; the trip supplies the destination and how many times
//                      the journey OCCURS.
//
// ── Why travel gets its own shape ───────────────────────────────────────────
// A generic "quantity × second quantity × rate" row let a vendor type
// "3 persons × 10 days" as prose, which meant nothing could be checked: not the
// GSA row (was that a lodging or an M&IE rate?), not the arithmetic (were those
// nights or days?), not the repetition (a quarterly meeting entered four times
// as four unrelated rows). Travel is the most RULE-BOUND category in a LIB and
// was being entered as the least structured. Shape E fixes that: kind → units +
// schedule scope, trip → destination + occurrences.
//
// ── Cross-line dependencies ─────────────────────────────────────────────────
// Change one salary line and several others move. That web is the reason this
// screen is a grid:
//   • fringe (C)      GENERATED from the salary lines for its staff group — the
//                     rate is a field on the salary row, the line is derived
//   • cell phone (A)  its months are LINKED to a position's staffing months
//   • indirect        depends on the sum of whatever the rate is scoped to
//   • state tax (C)   depends on items 1–3 (on the subcontract sheet)
// `priceLines()` below resolves all of it in dependency order.
//
// The screen is deliberately shown MID-BUILD: the total sits just under the
// Contract Value, one salary line has no work-element allocation, one vehicle
// line is priced above its GSA rate, one item has been placed against the
// capitalization threshold by hand, and one lump is too large to test per item.
// Only the first of those BLOCKS submission — the rest are noted for the COR
// (see `advisoriesFor`), because the COR feedback of 2026-10 asked for the
// flexibility to price off GSA and to move equipment lines freely, with the
// deviation visible rather than forbidden.
//
// ── Accounting codes ────────────────────────────────────────────────────────
// Every line may carry the vendor's OWN accounting code (`acctCode`) — the GL or
// cost code their books use — so an invoice can be lined up against the LIB it
// bills. It prices nothing and gates nothing; it is the join key between this
// budget and the vendor's ledger, and the grid can subtotal and filter by it.

/** The five line shapes. `shape` on every cost line is one of these. */
export const SHAPES = {
  QTY_RATE: 'qty-rate', // A
  AUTHORITY: 'authority-rate', // B
  PCT_OF_BASE: 'pct-of-base', // C
  LUMP: 'lump', // D
  TRAVEL: 'travel-line', // E
};

/** Which letter each shape is called in the LIB guidance the vendor reads. */
export const shapeLetter = {
  [SHAPES.QTY_RATE]: 'A',
  [SHAPES.AUTHORITY]: 'B',
  [SHAPES.PCT_OF_BASE]: 'C',
  [SHAPES.LUMP]: 'D',
  [SHAPES.TRAVEL]: 'E',
};

export const contract = {
  project: '2019-402-00',
  projectTitle: 'Rock Creek Spring Chinook Supplementation Program',
  number: 'CR-411206',
  sponsor: 'Rock Creek Fisheries Council',
  fiscalYear: 'FY2027',
  periodStart: '05/01/2026',
  periodEnd: '04/30/2027',
  /** The ceiling. Every category subtotal rolls up and must reconcile to it. */
  contractValue: 312_500,
  /** The dollar test that SUGGESTS capital equipment vs. a supply. Not fixed:
   *  thresholds differ by contract, so the vendor can set it on the Supplies &
   *  equipment section, and it files new lines rather than policing old ones. */
  capitalizationThreshold: 5_000,
  bpaCor: 'Marguerite Ozuna',
  contractManager: 'Devon Iwasaki',
};

/**
 * How many months the contract period runs. Salary and any other month-quantified
 * line is tested against this — a position budgeted for more months than the
 * contract exists is a real, common LIB error, and it is arithmetic the form can
 * do rather than a reviewer.
 */
export const contractMonths = (() => {
  const [sm, , sy] = contract.periodStart.split('/').map(Number);
  const [em, , ey] = contract.periodEnd.split('/').map(Number);
  return (ey - sy) * 12 + (em - sm) + 1;
})();

export const isSalaryLine = (line) => line?.category === 'personnel-salary';

/**
 * ── Positions are defined BY the LIB, not handed to it ──────────────────────
 * There is no global roster. A closed list of titles would have asserted that
 * BPA knows the sponsor's org chart — a council whose staff don't match the list
 * would have had nowhere to put them, which is a worse failure than a typo.
 *
 * So a vendor TYPES the position title on a personnel line, and that act defines
 * the position, scoped to this budget. Everything after refers back to it: the
 * fringe line generated for it, a rent line whose months track it, the
 * percentage base a shape-C line points at.
 *
 * The reference is `staffKey` — the title, slugged. Keeping a key rather than
 * comparing raw strings is what lets two lines typed "Seasonal Technician" and
 * "seasonal technician  " land on ONE position, and it keeps the generated
 * fringe id stable. Retitling a line therefore re-points it: if it was the last
 * line carrying the old title, that position stops existing, which is the honest
 * behaviour when the roster is nothing but the sum of what the lines say.
 */
export const positionKey = (title) =>
  (title ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** The position title carried on a personnel line — what the vendor typed. */
export const titleOfLine = (line) => (line?.label ?? '').trim();

/**
 * The positions THIS LIB has defined, in the order they first appear. Derived,
 * never stored: the lines ARE the roster, so the two can never disagree.
 */
export const rosterFor = (lines = costLines) => {
  const out = [];
  const seen = new Set();
  for (const l of lines) {
    if (!isSalaryLine(l)) continue;
    const title = titleOfLine(l);
    const key = positionKey(title);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    /* The type belongs to the position, and the sub-block the line sits in IS
       the type — so it comes from the line rather than being asked twice. */
    out.push({ key, title, type: l.block === 'admin' ? 'admin' : 'technical' });
  }
  return out;
};

export const positionOf = (key, lines = costLines) => rosterFor(lines).find((p) => p.key === key);
export const positionTitle = (key, lines = costLines) => positionOf(key, lines)?.title ?? '';
/** The personnel type a position carries — which is also its sub-block. */
export const positionType = (key, lines = costLines) => positionOf(key, lines)?.type ?? 'technical';

/** Personnel lines with no position typed yet — they define nothing and price nothing. */
export const untitledPositionLines = (lines = costLines) =>
  lines.filter((l) => isSalaryLine(l) && !positionKey(titleOfLine(l)));

/**
 * ── What a personnel line is allowed to be ─────────────────────────────────
 * Six facts, and nothing else:
 *
 *   TYPE      administrative or technical — carried by the roster position, not
 *             typed per line, and it sub-blocks the category so each type
 *             subtotals separately. The split is optional per budget: a vendor
 *             with no meaningful admin/technical line can switch it off.
 *   STAFF     how many people the line pays for, at the same time and rate —
 *             default 1. CORs asked for this so three seasonal technicians are
 *             one line, not three identical ones. It is a NAMED multiplicand,
 *             not the old generic second quantity: the contract-period gate
 *             still reads the time PER PERSON, so "12 months × 3 staff" passes
 *             where "36 months" would not.
 *   NUMBER    how many units of time, per person.
 *   UNIT      a TIME unit off a closed list. It used to be a free-text box
 *             seeded with "months" sitting on top of arithmetic and a column
 *             caption that both assumed months regardless of what was typed in.
 *   UNIT COST the cost of one of those units. The caption follows the unit, so
 *             an hourly line is never captioned "Cost per month".
 *
 * Total is staff × number × unit cost.
 *
 * ── More than one rate for one position ─────────────────────────────────────
 * A fiscal-year crossover, a COLA or a step increase gives one position two
 * rates inside one contract period. The COR consensus was to carry that as
 * additional lines with the same title — the position, its fringe line and its
 * work-element split all key off the title, so the second line joins the first
 * rather than starting a new position. The grid offers "Add a rate step" on a
 * salary line to make that one gesture instead of a retype.
 */
export const PERSONNEL_TYPES = [
  { key: 'technical', label: 'Technical', note: 'Field, hatchery, laboratory and analytical positions.' },
  { key: 'admin', label: 'Administrative', note: 'Contract administration, fiscal and clerical positions.' },
];

export const personnelType = (key) => PERSONNEL_TYPES.find((t) => t.key === key);
export const personnelTypeLabel = (key) => personnelType(key)?.label ?? '';

/**
 * The time units a personnel line may be quantified in. Every one is time-bound
 * — that is the point. `months` converts the unit to the axis the contract
 * period is measured on, so an hourly line and a monthly one can be tested by
 * the same rule rather than only the monthly one being tested at all.
 */
export const HOURS_PER_MONTH = 2080 / 12; // 173.33 — full-time hours in a month
/* The default is named rather than looked up, so the fallback below is a unit
   that provably exists — a .find() for it would be typed as possibly-missing. */
export const MONTH_UNIT = { key: 'month', label: 'Month', plural: 'months', rateLabel: 'Cost per month', months: 1 };
export const TIME_UNITS = [
  { key: 'hour', label: 'Hour', plural: 'hours', rateLabel: 'Cost per hour', months: 1 / HOURS_PER_MONTH },
  { key: 'day', label: 'Day', plural: 'days', rateLabel: 'Cost per day', months: 1 / (HOURS_PER_MONTH / 8) },
  { key: 'week', label: 'Week', plural: 'weeks', rateLabel: 'Cost per week', months: 1 / (52 / 12) },
  MONTH_UNIT,
  { key: 'year', label: 'Year', plural: 'years', rateLabel: 'Cost per year', months: 12 },
];

export const timeUnitOf = (key) => TIME_UNITS.find((u) => u.key === key);
/** A line's time unit, defaulting to months so an undeclared line still means something. */
export const timeUnit = (line) => timeUnitOf(line?.timeUnit) ?? MONTH_UNIT;

/** Every personnel line carrying this position — rate steps of one position. */
export const salaryLinesFor = (staffKey, lines = costLines) =>
  lines.filter((l) => isSalaryLine(l) && l.staffKey === staffKey);

/** How many people a personnel line pays for. At least one; 1 everywhere else. */
export const staffOf = (line) =>
  isSalaryLine(line) ? Math.max(1, Math.round(Number(line.staff) || 1)) : 1;

/**
 * ── Trips ──────────────────────────────────────────────────────────────────
 * Travel is not a list of costs, it is a list of TRIPS that each generate
 * several costs. A trip owns three things: where it goes, when, and
 * `occurrences` — the count that made the old flat list dishonest, because a
 * semiannual coordination meeting is ONE trip that happens twice, not two
 * unrelated rows a reviewer has to recognise as the same journey. Every line
 * inside multiplies by it, so raising it moves them all together.
 *
 * It DOES carry a purpose. An earlier pass dropped it as a field nothing read —
 * it prices nothing and gates nothing — but CORs read it: "why is this trip on
 * the budget" is the first question they ask of travel, and the destination
 * alone does not answer it. It is one short line of text, not a narrative.
 *
 * `startMonth` (1–12, optional) is when the journey first happens. It prices
 * nothing either; it SEEDS the season a lodging claim is made for, because the
 * published lodging rate for some localities changes with the season.
 *
 * What a trip deliberately does NOT own is the traveler count. "How many people
 * slept in hotels", "how many claimed per diem" and "how many cars drove" are
 * three different numbers — a lodging line counts ROOMS, not bodies — so each
 * line carries its own count and a new line seeds from the last line in the trip
 * counting the same unit. One field at trip level plus a per-row override button
 * was the same information said twice, in the place it was least true.
 */
export const trips = [
  {
    key: 'coord',
    locality: 'Portland, OR',
    purpose: 'Basin coordination meetings with co-managers',
    window: 'Semiannual — Jul 2026 and Feb 2027',
    startMonth: 7,
    occurrences: 2,
  },
  {
    key: 'workshop',
    locality: 'Boise, ID',
    purpose: 'Annual fisheries society meeting — presenting PIT tag results',
    window: '09/14–09/18/2026',
    startMonth: 9,
    occurrences: 1,
  },
  {
    key: 'hatchery',
    locality: 'The Dalles, OR',
    purpose: 'Broodstock monitoring at the hatchery',
    window: 'Every other month through the period',
    occurrences: 6,
  },
];

export const tripOf = (key) => trips.find((t) => t.key === key);

/** A trip is named by where it goes — never typed separately. */
export const tripLabel = (t) =>
  (t?.locality ?? '').trim() || 'New trip — set a destination';

/**
 * ── Travel that is not a trip ──────────────────────────────────────────────
 * Grouping every travel cost under a trip made the common small case cost more
 * than it is worth. A single cab fare to a hearing, a mileage claim for routine
 * site runs, one registrant's airfare — these have no journey to describe, no
 * nothing else that would ever sit beside them. A
 * trip forced on them is an empty container with one thing in it, and it makes
 * a reviewer read four facts to understand one line.
 *
 * So a travel line may sit outside every trip. It keeps everything that makes a
 * travel line a travel line — a kind, a count, a duration, a schedule row — and
 * it carries the facts it can no longer inherit: its own destination and its
 * own purpose. The destination is REQUIRED either way — CORs want a location on
 * every travel cost, trip or no trip — and the submit gate holds a line that has
 * none (see `unlocatedTravel`). What it
 * does not get is `occurrences`, because that is the multiplier a JOURNEY has;
 * a loose line that happens twice is two of something, which is what its own
 * count already says.
 *
 * Ungrouped lines file under a block like everything else, so every surface's
 * sub-block machinery — subtotals, the add menu, drag-and-drop between blocks —
 * carries them with no special case. That block is also what makes UNGROUPING a
 * gesture the vendor already knows: drag a line out of a trip and into it.
 */
export const NO_TRIP = 'no-trip';

/** The block a travel line files under — its trip, or the ungrouped block. */
export const travelBlockOf = (line) => line.trip || NO_TRIP;

/** Whether this travel line stands on its own rather than inside a trip. */
export const isLooseTravel = (line) => line.shape === SHAPES.TRAVEL && !line.trip;

/**
 * ── Destination ────────────────────────────────────────────────────────────
 * A destination is typed, not picked, and it does NOT price anything. It names
 * the trip and the lines under it, and it is offered as the default location
 * when a line reaches for a published standard rate — that is all.
 *
 * This is a deliberate reversal. Destination used to select a schedule row and
 * therefore the money, which meant retyping a city silently re-priced every line
 * under it, and a misspelling quietly cost the difference between a locality
 * rate and the CONUS floor. A rate a vendor did not type and cannot see the
 * derivation of is a rate they cannot defend. So the typed rate is now the
 * truth, and referencing a published one is an explicit, parameterised act —
 * see `standardRateFor` and the `standard` reference on a line.
 *
 * The CONUS fallback survives INSIDE that reference: the published schedule
 * prices a few hundred localities separately and covers every other place with
 * one standard row, so a weir on Rock Creek is a legitimate location that simply
 * claims the CONUS rate. CORs also accept the CONUS row for INTERNATIONAL travel
 * in a LIB, so a destination outside the U.S. claims it too, by the same rule.
 */
export const CONUS_FALLBACK = 'Standard CONUS (unlisted locality)';

/**
 * ── The published standard rates ───────────────────────────────────────────
 * Per diem is published per LOCALITY and per FISCAL YEAR, and both halves are
 * load-bearing: rates change every 1 October, and a LIB is built for a contract
 * period that straddles at least one of those changes. So a line that claims a
 * standard rate has to say WHICH year's rate it is claiming — otherwise the
 * number is unauditable the moment the schedule moves, and a budget submitted in
 * September would silently re-price in October.
 *
 * LODGING also varies by SEASON in some localities, and CORs check it — so a
 * lodging claim in a seasonal locality takes a third answer: which season. An
 * earlier pass left season out because it had been GUESSED (every Portland line
 * defaulted to peak whatever the dates said). The fix for a guess is a question,
 * not an omission: the season is asked in the claim dialog, seeded from the
 * trip's start month when there is one, and stated on the row. See
 * `LODGING_SEASONS`.
 *
 * MOCK DATA. Fourteen localities out of the few hundred GSA publishes, and
 * FY2027 modelled as a uniform uplift on FY2026 rather than invented per city.
 * The real thing is the GSA per-diem API — see the note on `standardRateFor`.
 */
const FY26_PER_DIEM = [
  { locality: CONUS_FALLBACK, lodging: 110, mie: 68 },
  // ── Oregon ──
  { locality: 'Portland, OR', lodging: 185, mie: 79 },
  { locality: 'Hood River, OR', lodging: 149, mie: 74 },
  { locality: 'Bend, OR', lodging: 168, mie: 74 },
  { locality: 'The Dalles, OR', lodging: 121, mie: 68 },
  // ── Washington ──
  { locality: 'Seattle, WA', lodging: 241, mie: 86 },
  { locality: 'Spokane, WA', lodging: 142, mie: 74 },
  { locality: 'Yakima, WA', lodging: 118, mie: 68 },
  { locality: 'Wenatchee, WA', lodging: 138, mie: 68 },
  { locality: 'Richland, WA', lodging: 134, mie: 68 },
  // ── Idaho / Montana ──
  { locality: 'Boise, ID', lodging: 166, mie: 68 },
  { locality: "Coeur d'Alene, ID", lodging: 189, mie: 74 },
  { locality: 'Lewiston, ID', lodging: 113, mie: 68 },
  { locality: 'Missoula, MT', lodging: 126, mie: 68 },
];

/** The fiscal years this prototype carries rates for, newest first. */
export const FISCAL_YEARS = [2027, 2026];

/**
 * The year a new claim opens on: the CONTRACT's own fiscal year, not the newest
 * table that happens to be loaded. A LIB is budgeted for a period, and the year
 * that period is funded under is the one nearly every line means — defaulting to
 * "latest published" would quietly claim a schedule the contract does not run
 * in. The vendor can still say otherwise on any line; a period that straddles
 * 1 October is exactly why the answer is per line and not per budget.
 */
export const defaultRateYear = () => {
  const declared = Number(String(contract.fiscalYear).replace(/\D/g, ''));
  return FISCAL_YEARS.includes(declared) ? declared : FISCAL_YEARS[0];
};

/** Every published locality rate, one row per locality per fiscal year. */
export const perDiemRates = [
  ...FY26_PER_DIEM.map((r) => ({ ...r, year: 2026 })),
  /* FY2027 is not published as of this prototype; modelled at +3% on lodging,
     meals unchanged, which is roughly how a year of these tables moves. */
  ...FY26_PER_DIEM.map((r) => ({ ...r, year: 2027, lodging: Math.round(r.lodging * 1.03) })),
];

/** The POV mileage rate — one national figure per year, no locality. */
export const mileageRates = [
  { year: 2026, rate: 0.67 },
  { year: 2027, rate: 0.70 },
];

/** The locality rows for one year, for a picker that has to offer them. */
export const perDiemFor = (year) => perDiemRates.filter((r) => r.year === Number(year));

/**
 * ── Lodging seasons ─────────────────────────────────────────────────────────
 * The localities whose published LODGING rate changes through the year, with
 * the FY2026 rate per season (FY2027 takes the same +3% as the flat table).
 * Meals never vary by season, so only lodging claims ask for one. A locality
 * missing from this map has one lodging rate all year, and its claim asks for
 * nothing extra.
 *
 * MOCK DATA, shaped like the GSA table: a season is a set of months and a rate.
 */
export const LODGING_SEASONS = {
  'Portland, OR': [
    { key: 'peak', label: 'May–Oct (peak)', months: [5, 6, 7, 8, 9, 10], lodging: 196 },
    { key: 'off', label: 'Nov–Apr', months: [11, 12, 1, 2, 3, 4], lodging: 174 },
  ],
  'Hood River, OR': [
    { key: 'peak', label: 'Jun–Sep (peak)', months: [6, 7, 8, 9], lodging: 168 },
    { key: 'off', label: 'Oct–May', months: [10, 11, 12, 1, 2, 3, 4, 5], lodging: 129 },
  ],
  'Bend, OR': [
    { key: 'peak', label: 'Jun–Sep (peak)', months: [6, 7, 8, 9], lodging: 183 },
    { key: 'off', label: 'Oct–May', months: [10, 11, 12, 1, 2, 3, 4, 5], lodging: 158 },
  ],
  'Wenatchee, WA': [
    { key: 'peak', label: 'Jun–Sep (peak)', months: [6, 7, 8, 9], lodging: 152 },
    { key: 'off', label: 'Oct–May', months: [10, 11, 12, 1, 2, 3, 4, 5], lodging: 128 },
  ],
  'Boise, ID': [
    { key: 'peak', label: 'Apr–Oct (peak)', months: [4, 5, 6, 7, 8, 9, 10], lodging: 178 },
    { key: 'off', label: 'Nov–Mar', months: [11, 12, 1, 2, 3], lodging: 155 },
  ],
  "Coeur d'Alene, ID": [
    { key: 'peak', label: 'Jun–Sep (peak)', months: [6, 7, 8, 9], lodging: 189 },
    { key: 'off', label: 'Oct–May', months: [10, 11, 12, 1, 2, 3, 4, 5], lodging: 136 },
  ],
};

/** The lodging seasons a locality publishes — empty when it has one rate all year. */
export const seasonsFor = (locality) => LODGING_SEASONS[resolveLocality(locality)] ?? [];

/** Whether a lodging claim at this locality has to say which season. */
export const needsSeason = (kindKey, locality) =>
  kindKey === 'lodging' && seasonsFor(locality).length > 0;

/** The season a month falls in, at a locality — the seed for a claim's season. */
export const seasonForMonth = (locality, month) =>
  seasonsFor(locality).find((s) => s.months.includes(Number(month)))?.key ?? '';

/** A season's label, for the row and the dialog. */
export const seasonLabel = (locality, key) =>
  seasonsFor(locality).find((s) => s.key === key)?.label ?? '';

/**
 * The published rate a line would claim, given its kind, a location, a year and
 * — for seasonal lodging — a season. Returns null where nothing is published, or
 * where a seasonal locality's claim has not said which season yet: a guessed
 * season is exactly the error this parameter exists to remove.
 *
 * In the real system this is a lookup against the GSA per-diem API, synced and
 * cached per fiscal year rather than called live: a submitted LIB must keep the
 * rate it was budgeted against, not silently re-price when the schedule moves.
 */
export const standardRateFor = (kindKey, locality, year, season = '') => {
  const y = Number(year) || FISCAL_YEARS[0];
  if (kindKey === 'mileage') return mileageRates.find((m) => m.year === y)?.rate ?? null;
  const row = perDiemRates.find((r) => r.year === y && r.locality === resolveLocality(locality));
  if (!row) return null;
  if (kindKey === 'mie') return row.mie;
  if (kindKey !== 'lodging') return null;
  const seasons = seasonsFor(locality);
  if (!seasons.length) return row.lodging;
  const s = seasons.find((x) => x.key === season);
  if (!s) return null;
  return y === 2026 ? s.lodging : Math.round(s.lodging * 1.03);
};

/** Whether a location is separately listed on the published schedule. */
export const isListedLocality = (loc) => {
  const l = (loc ?? '').trim();
  if (!l || l === CONUS_FALLBACK) return false;
  return perDiemRates.some((r) => r.locality === l);
};

/** The schedule location a typed place actually claims. */
export const resolveLocality = (loc) => (isListedLocality(loc) ? (loc ?? '').trim() : CONUS_FALLBACK);

/**
 * ── Travel kinds ───────────────────────────────────────────────────────────
 * The taxonomy that replaces free-text travel entry. A kind fixes three things
 * the vendor used to have to get right by hand:
 *   · what is being counted (`countLabel`) and whether it comes from the trip
 *   · what the duration is measured in (`durationLabel`; null = no duration)
 *   · whether a PUBLISHED rate exists for it at all (`standardRate`)
 *
 * Every travel rate is typed. Three kinds have a published standard the vendor
 * may claim INSTEAD of their own number — and claiming it is an explicit act
 * with its own answers (which location, which fiscal year, and for seasonal
 * lodging which season), because those are what make the claim checkable. The
 * rest have nothing published to claim: an airfare quote, a rental, a parking
 * estimate and a registration fee are prices, not entitlements.
 *
 * Car rental, ground transport, parking and fuel used to be one kind ("Ground
 * transport & parking"). CORs asked for them apart, each with its own rate,
 * because they are counted differently — a rental and its parking per VEHICLE
 * per day, a shuttle per TRAVELER per ride — and one blended row could not be
 * checked against any of them.
 *
 * `other` is the vendor-defined escape hatch: a travel cost none of the kinds
 * describe. It is in tension with the standardization the kinds exist for, and
 * it is offered anyway, because LIBs cover too many kinds of project for a
 * closed list. It names itself (a typed description), and it is counted and
 * shown to the COR as vendor-defined rather than hidden among the standard
 * kinds — see `isVendorDefined`.
 *
 * amount = occurrences × count × duration × rate. Every travel line, one rule —
 * except that an M&IE line's duration is FULL days plus PARTIAL days at 75%.
 */
export const TRAVEL_KINDS = [
  {
    key: 'lodging',
    label: 'Lodging',
    /* ROOMS, not travelers. The GSA lodging rate is a per-room-night ceiling, so
       two people sharing is one room — the distinction a single trip-level
       traveler count could not express without overstating every shared room. */
    countLabel: 'rooms',
    durationLabel: 'nights',
    standardRate: true,
    note: 'Per room, per night. Each locality publishes a lodging rate — claim it, or enter your own.',
  },
  {
    key: 'mie',
    label: 'M&IE per diem',
    countLabel: 'travelers',
    /* Two durations, not one. The first and last day of travel are reimbursed at
       75% of the daily rate, and COs check for it — a LIB that prices a 3-day
       trip as 3 full days is sent back. So the line counts FULL days and PARTIAL
       (travel) days separately, and prices the partial ones at `partialRate`. */
    durationLabel: 'full days',
    partialLabel: 'travel days at 75%',
    partialRate: 0.75,
    standardRate: true,
    note: 'Per traveler, per day. Full days at the rate, first and last travel days at 75%. Claim the published meals rate, or enter your own.',
  },
  {
    key: 'airfare',
    label: 'Airfare',
    countLabel: 'travelers',
    /* No duration. A quoted fare IS the round trip — the number the vendor types
       is what the ticket costs, and a traveler who flies out and back twice has
       a bigger quote, not a second multiplicand. The old 'round trips' slot also
       double-counted against the trip's occurrence count, so "2 trips × 2
       travelers × 2 round trips" was a reachable state that quadrupled a fare
       nobody meant to quadruple. */
    durationLabel: null,
    note: 'Per traveler, round trip. Coach fare on a U.S. flag carrier, per the Fly America Act.',
  },
  {
    key: 'mileage',
    label: 'POV mileage',
    countLabel: 'vehicles',
    durationLabel: 'miles',
    standardRate: true,
    /* The one standard with no locality in it — the POV rate is a single national
       figure per year, so its reference asks for the year and nothing else. */
    standardIsNational: true,
    note: 'Per vehicle, per mile, in a privately owned vehicle. One published national rate per year — claim it, or enter your own.',
  },
  {
    key: 'car-rental',
    label: 'Car rental',
    countLabel: 'vehicles',
    durationLabel: 'days',
    note: 'Per rental vehicle, per day. Fuel and parking for it are their own lines.',
  },
  {
    key: 'ground',
    label: 'Ground transport',
    countLabel: 'travelers',
    durationLabel: 'rides',
    note: 'Taxi, shuttle, rideshare and transit. Per traveler, per ride.',
  },
  {
    key: 'parking',
    label: 'Parking',
    countLabel: 'vehicles',
    durationLabel: 'days',
    note: 'Per vehicle, per day — airport, hotel or event parking, and tolls.',
  },
  {
    key: 'fuel',
    label: 'Rental car fuel',
    countLabel: 'vehicles',
    durationLabel: 'days',
    note: 'Estimated fuel for a rental vehicle, per vehicle per day. Fuel for a leased or owned vehicle belongs in Vehicles.',
  },
  {
    key: 'registration',
    label: 'Registration fee',
    countLabel: 'travelers',
    durationLabel: null,
    note: 'Per traveler, per trip. Already budgeted under Professional meetings & training? Link that line to the trip instead.',
  },
  {
    key: 'other',
    label: 'Other travel cost',
    countLabel: 'units',
    durationLabel: null,
    vendorDefined: true,
    note: 'A travel cost no kind above describes. Say what it is — the COR sees it as vendor-defined.',
  },
];

export const travelKind = (key) => TRAVEL_KINDS.find((k) => k.key === key);

/** Whether a published rate exists for this kind at all — and therefore whether
 *  the "use the standard rate" control is offered on the line. */
export const hasStandardRate = (key) => !!travelKind(key)?.standardRate;

/** Whether claiming that standard needs a LOCATION. Mileage is one national
 *  figure, so asking where it was driven would be asking for nothing. */
export const standardNeedsLocality = (key) =>
  hasStandardRate(key) && !travelKind(key)?.standardIsNational;

/** The reference a line carries when it claims a published rate, or null. */
export const standardOn = (line) => (line?.standard ?? null);

/** The rate that reference resolves to — null when the reference cannot be met. */
export const standardRateOn = (line) => {
  const ref = standardOn(line);
  if (!ref || !hasStandardRate(line.travelKind)) return null;
  return standardRateFor(line.travelKind, ref.locality, ref.year, ref.season);
};

/** How a claimed rate reads as a fact: what was claimed, where, and for when. */
export const standardSourceText = (line) => {
  const ref = standardOn(line);
  if (!ref) return '';
  /* The KIND is not repeated — the line already names it, and "Standard M&IE
     per diem rate" said it twice. What this adds is the two answers that make
     the claim checkable: which locality and which year's schedule. */
  const where = standardNeedsLocality(line.travelKind)
    ? resolveLocality(ref.locality)
    : 'National rate';
  const season = needsSeason(line.travelKind, ref.locality) ? seasonLabel(ref.locality, ref.season) : '';
  return ['Standard rate', where, season, `FY${ref.year}`].filter(Boolean).join(' · ');
};

/** What a line says when it claims nothing — the default, and not a failure. */
export const typedRateText = (line) =>
  hasStandardRate(line?.travelKind)
    ? 'Your own rate — no standard claimed.'
    : 'Your own rate. This kind has no published rate.';

/**
 * ── Vehicle kinds ──────────────────────────────────────────────────────────
 * Vehicles had the same problem as travel in miniature: it mixed schedule-rated
 * and typed-rate lines in one category with no marker for which was which, so
 * "Add line" asked the vendor to pick a SHAPE — internal vocabulary. Picking a
 * KIND instead decides the shape, the unit and the schedule scope for them.
 *
 * ── The vehicle TYPE is picked, not typed ───────────────────────────────────
 * "Truck" in a free-text box cannot be checked against the work. BPA keeps a
 * controlled vehicle type list — about twenty types relevant to fish and
 * wildlife work out of a much longer master list — and a COR needs that level of
 * detail to confirm the class is right for the job (a 15-passenger van for a
 * two-person crew is the question). So every vehicle line that IS a vehicle
 * names its type off that list, and the type is also what looks up the GSA rate.
 *
 * MOCK DATA: the list's shape is real, the names are representative, and the
 * GSA Fleet monthly and per-mile figures are invented.
 */
export const VEHICLE_TYPES = [
  { key: 'sedan-compact', label: 'Compact sedan 4x2', monthly: 262, perMile: 0.19 },
  { key: 'sedan-midsize', label: 'Midsize sedan 4x2', monthly: 289, perMile: 0.2 },
  { key: 'sedan-hybrid', label: 'Midsize hybrid sedan 4x2', monthly: 301, perMile: 0.14 },
  { key: 'ev-sedan', label: 'Electric sedan', monthly: 318, perMile: 0.08 },
  { key: 'minivan', label: 'Minivan, 7 passenger', monthly: 352, perMile: 0.24 },
  { key: 'van-12', label: 'Passenger van, 12 passenger', monthly: 446, perMile: 0.31 },
  { key: 'van-15', label: 'Passenger van, 15 passenger', monthly: 471, perMile: 0.33 },
  { key: 'van-cargo', label: 'Cargo van', monthly: 398, perMile: 0.29 },
  { key: 'suv-small-4x4', label: 'Small SUV 4x4', monthly: 331, perMile: 0.23 },
  { key: 'suv-mid-4x4', label: 'Midsize SUV 4x4', monthly: 389, perMile: 0.26 },
  { key: 'suv-full-4x4', label: 'Full-size SUV 4x4', monthly: 431, perMile: 0.3 },
  { key: 'pickup-compact-4x2', label: 'Compact pickup 4x2, extended cab', monthly: 298, perMile: 0.22 },
  { key: 'pickup-compact-4x4', label: 'Compact pickup 4x4, crew cab', monthly: 336, perMile: 0.24 },
  { key: 'pickup-half-reg-4x4', label: '½-ton pickup 4x4, regular cab', monthly: 352, perMile: 0.27 },
  { key: 'pickup-half-crew-4x4', label: '½-ton pickup 4x4, crew cab', monthly: 385, perMile: 0.28 },
  { key: 'pickup-3q-crew-4x4', label: '¾-ton pickup 4x4, crew cab', monthly: 432, perMile: 0.33 },
  { key: 'pickup-1t-crew-4x4', label: '1-ton pickup 4x4, crew cab', monthly: 476, perMile: 0.36 },
  { key: 'ev-pickup', label: 'Electric pickup 4x4, crew cab', monthly: 455, perMile: 0.11 },
  { key: 'utility-body', label: '¾-ton utility body truck 4x4', monthly: 512, perMile: 0.38 },
  { key: 'stake-bed', label: '1-ton stake bed truck', monthly: 538, perMile: 0.4 },
];

export const vehicleType = (key) => VEHICLE_TYPES.find((t) => t.key === key);
export const vehicleTypeLabel = (key) => vehicleType(key)?.label ?? '';

export const VEHICLE_KINDS = [
  {
    key: 'lease',
    label: 'GSA lease',
    shape: SHAPES.AUTHORITY,
    gsaKind: 'Vehicle lease',
    unit: 'months',
    needsType: true,
    note: 'Per month, at the GSA Fleet rate for the vehicle type. Override it if you don’t pay the GSA rate.',
  },
  {
    key: 'mileage',
    label: 'GSA lease mileage',
    shape: SHAPES.AUTHORITY,
    gsaKind: 'Mileage',
    unit: 'months',
    secondUnit: 'miles/month',
    needsType: true,
    note: 'Months × miles per month, at the GSA Fleet per-mile rate for the vehicle type.',
  },
  {
    /* Not GSA, so the rate is the vendor's — but the GSA rate for the same type
       is still the yardstick a COR reads it against, so the row states it. */
    key: 'commercial-lease',
    label: 'Commercial lease (non-GSA)',
    shape: SHAPES.QTY_RATE,
    unit: 'months',
    needsType: true,
    gsaCompare: 'Vehicle lease',
    note: 'Per month, at a commercial lessor’s rate. The row shows the GSA rate for the same type beside it.',
  },
  {
    key: 'motor-pool',
    label: 'Motor pool',
    shape: SHAPES.QTY_RATE,
    unit: 'months',
    needsType: true,
    gsaCompare: 'Vehicle lease',
    note: 'Per month, at your organization’s or an agency’s motor-pool rate. The row shows the GSA rate for the same type beside it.',
  },
  {
    key: 'insurance',
    label: 'Liability insurance',
    shape: SHAPES.QTY_RATE,
    unit: 'months',
    note: 'Months × premium per month. Not a schedule rate.',
  },
  {
    key: 'fuel',
    label: 'Fuel',
    shape: SHAPES.QTY_RATE,
    unit: 'months',
    note: 'Months × estimated fuel per month. Not a schedule rate.',
  },
  {
    /* Split from fuel at the CORs' request: fuel scales with miles driven and
       maintenance with the age of the fleet, so one blended monthly figure
       could not be checked against either. */
    key: 'maintenance',
    label: 'Maintenance & repair',
    shape: SHAPES.QTY_RATE,
    unit: 'months',
    note: 'Months × estimated maintenance and repair per month. Not a schedule rate.',
  },
  {
    key: 'other',
    label: 'Other vehicle cost',
    shape: SHAPES.QTY_RATE,
    unit: null,
    vendorDefined: true,
    note: 'A vehicle cost no kind above describes. Say what it is and name its unit — the COR sees it as vendor-defined.',
  },
];

export const vehicleKind = (key) => VEHICLE_KINDS.find((k) => k.key === key);

/** The schedule rows a vehicle kind may reference. */
export const gsaRatesForVehicleKind = (key) => {
  const k = vehicleKind(key);
  return k?.gsaKind ? gsaRates.filter((g) => g.kind === k.gsaKind && g.scope === 'vehicle') : [];
};

/** The GSA Fleet row a vehicle line references — its kind's schedule, its type's row. */
export const gsaKeyForVehicle = (kindKey, typeKey) => {
  const k = vehicleKind(kindKey);
  if (!k?.gsaKind || !typeKey) return '';
  return `${k.gsaKind === 'Mileage' ? 'gsa-mileage' : 'gsa-lease'}-${typeKey}`;
};

/**
 * The GSA rate a NON-GSA vehicle line is read against — a commercial lease or a
 * motor-pool vehicle of the same type. Null where the kind has no comparison or
 * the line has no type yet.
 */
export const gsaCompareRate = (line) => {
  const k = vehicleKind(line?.vehicleKind);
  if (!k?.gsaCompare || !line.vehicleType) return null;
  return gsaRate(`gsa-lease-${line.vehicleType}`)?.rate ?? null;
};

/**
 * The overhead/indirect block — the audit-critical one. The rate is not just a
 * number: it carries a reference document, effective dates, and a MANUAL pick of
 * which categories it applies to. `appliesTo` is what the vendor edits, and the
 * indirect base recomputes as they change it.
 */
export const indirectConfig = {
  rate: 0.2675,
  referenceDoc: 'NICRA 2026-14, approved 03/11/2026',
  effectiveStart: '05/01/2026',
  effectiveEnd: '04/30/2027',
  /** Single vs. dual rate. Dual + month-weighting is out of scope for this screen. */
  mode: 'single',
  /**
   * SCOPE keys the rate applies to — see `indirectScopes`. Usually a category
   * key, but Supplies & Equipment splits, because capitalizing an item is
   * exactly the thing that takes it out of the base. Capital equipment and
   * subcontracts are out.
   */
  appliesTo: [
    'personnel-salary',
    'personnel-fringe',
    'travel',
    'meetings',
    'vehicles',
    'supplies:expensed',
    'rent-utilities',
  ],
};

/**
 * The contract tab strip. Only LIB is live in this prototype — the rest are real
 * destinations in cbfish that this screen deliberately sits inside, so the LIB
 * form reads as a native contract tab rather than a form floating on its own page.
 */
export const contractTabs = [
  { key: 'summary', label: 'Summary' },
  { key: 'sow', label: 'SOW' },
  { key: 'we-budgets', label: 'WE budgets' },
  { key: 'lib', label: 'LIB', live: true },
  { key: 'property-inventory', label: 'Property Inventory' },
  { key: 'status-reports', label: 'Status reports' },
  { key: 'workflow', label: 'Workflow' },
  { key: 'documents', label: 'Documents' },
];

/** Work elements on this contract's SOW. Every line still needs its WE split. */
export const workElements = [
  { id: 'A', code: '119', title: 'Manage and Administer Projects' },
  { id: 'B', code: '157', title: 'Collect/Generate/Validate Field and Lab Data' },
  { id: 'C', code: '165', title: 'Produce Environmental Compliance Documentation' },
  { id: 'D', code: '185', title: 'Produce Pisces Status Report' },
  { id: 'E', code: '60', title: 'Operate and Maintain Hatchery' },
  { id: 'F', code: '99', title: 'Outreach and Education' },
];

export const weLabel = (id) => {
  const we = workElements.find((w) => w.id === id);
  return we ? `${we.id}. ${we.code} ${we.title}` : id;
};

/**
 * The element by its letter and code alone — "A. 119". What a summary line uses
 * when it names SEVERAL elements at once: the titles are a sentence each, and
 * six of them side by side stop being readable. The full title is never far —
 * it captions the field that sets the share.
 */
export const weShort = (id) => {
  const we = workElements.find((w) => w.id === id);
  return we ? `${we.id}. ${we.code}` : id;
};

/**
 * The GSA schedule this contract references. Shape-B lines pick a row here; the
 * rate comes from the schedule, and `ceiling` is what an entered rate is tested
 * against when a vendor overrides it.
 */
// The real schedule is thousands of rows — every CONUS locality, with lodging
// that steps by month — which is exactly WHY the rate is looked up rather than
// typed. This is a credible slice of it: the standard CONUS fallback that covers
// any locality not specifically listed, the Columbia Basin localities this
// contract actually travels to (seasonal lodging tiers included), and the fleet
// rows. `scope` is what a line may reference: a travel line must not be able to
// pick a vehicle-lease row, and vice versa.
export const gsaRates = [
  // ── Standard CONUS — the fallback for any locality not separately listed ──
  { key: 'conus-lodging', location: 'Standard CONUS (unlisted locality)', kind: 'Lodging', season: 'Oct–Sep', rate: 110, ceiling: 110, scope: 'travel' },
  { key: 'conus-mie', location: 'Standard CONUS (unlisted locality)', kind: 'M&IE', season: 'Oct–Sep', rate: 68, ceiling: 68, scope: 'travel' },

  // ── Oregon ──
  { key: 'portland-lodging-peak', location: 'Portland, OR', kind: 'Lodging', season: 'May–Oct (peak)', rate: 196, ceiling: 196, scope: 'travel' },
  { key: 'portland-lodging', location: 'Portland, OR', kind: 'Lodging', season: 'Nov–Apr', rate: 174, ceiling: 174, scope: 'travel' },
  { key: 'portland-mie', location: 'Portland, OR', kind: 'M&IE', season: 'Oct–Sep', rate: 79, ceiling: 79, scope: 'travel' },
  { key: 'hood-river-lodging', location: 'Hood River, OR', kind: 'Lodging', season: 'Jun–Sep (peak)', rate: 168, ceiling: 168, scope: 'travel' },
  { key: 'hood-river-lodging-off', location: 'Hood River, OR', kind: 'Lodging', season: 'Oct–May', rate: 129, ceiling: 129, scope: 'travel' },
  { key: 'hood-river-mie', location: 'Hood River, OR', kind: 'M&IE', season: 'Oct–Sep', rate: 74, ceiling: 74, scope: 'travel' },
  { key: 'bend-lodging', location: 'Bend, OR', kind: 'Lodging', season: 'Jun–Sep (peak)', rate: 183, ceiling: 183, scope: 'travel' },
  { key: 'bend-mie', location: 'Bend, OR', kind: 'M&IE', season: 'Oct–Sep', rate: 74, ceiling: 74, scope: 'travel' },
  { key: 'the-dalles-lodging', location: 'The Dalles, OR', kind: 'Lodging', season: 'Oct–Sep', rate: 121, ceiling: 121, scope: 'travel' },
  { key: 'the-dalles-mie', location: 'The Dalles, OR', kind: 'M&IE', season: 'Oct–Sep', rate: 68, ceiling: 68, scope: 'travel' },

  // ── Washington ──
  { key: 'spokane-lodging', location: 'Spokane, WA', kind: 'Lodging', season: 'Oct–Sep', rate: 142, ceiling: 142, scope: 'travel' },
  { key: 'spokane-mie', location: 'Spokane, WA', kind: 'M&IE', season: 'Oct–Sep', rate: 74, ceiling: 74, scope: 'travel' },
  { key: 'yakima-lodging', location: 'Yakima, WA', kind: 'Lodging', season: 'Oct–Sep', rate: 118, ceiling: 118, scope: 'travel' },
  { key: 'yakima-mie', location: 'Yakima, WA', kind: 'M&IE', season: 'Oct–Sep', rate: 68, ceiling: 68, scope: 'travel' },
  { key: 'wenatchee-lodging', location: 'Wenatchee, WA', kind: 'Lodging', season: 'Jun–Sep (peak)', rate: 152, ceiling: 152, scope: 'travel' },
  { key: 'wenatchee-mie', location: 'Wenatchee, WA', kind: 'M&IE', season: 'Oct–Sep', rate: 68, ceiling: 68, scope: 'travel' },
  { key: 'richland-lodging', location: 'Richland, WA', kind: 'Lodging', season: 'Oct–Sep', rate: 134, ceiling: 134, scope: 'travel' },
  { key: 'seattle-lodging', location: 'Seattle, WA', kind: 'Lodging', season: 'Oct–Sep', rate: 241, ceiling: 241, scope: 'travel' },
  { key: 'seattle-mie', location: 'Seattle, WA', kind: 'M&IE', season: 'Oct–Sep', rate: 86, ceiling: 86, scope: 'travel' },

  // ── Idaho / Montana ──
  { key: 'boise-lodging-peak', location: 'Boise, ID', kind: 'Lodging', season: 'Apr–Oct (peak)', rate: 178, ceiling: 178, scope: 'travel' },
  { key: 'boise-lodging', location: 'Boise, ID', kind: 'Lodging', season: 'Nov–Mar (shoulder)', rate: 155, ceiling: 155, scope: 'travel' },
  { key: 'boise-mie', location: 'Boise, ID', kind: 'M&IE', season: 'Oct–Sep', rate: 68, ceiling: 68, scope: 'travel' },
  { key: 'coeur-dalene-lodging', location: "Coeur d'Alene, ID", kind: 'Lodging', season: 'Jun–Sep (peak)', rate: 189, ceiling: 189, scope: 'travel' },
  { key: 'lewiston-lodging', location: 'Lewiston, ID', kind: 'Lodging', season: 'Oct–Sep', rate: 113, ceiling: 113, scope: 'travel' },
  { key: 'missoula-lodging', location: 'Missoula, MT', kind: 'Lodging', season: 'Oct–Sep', rate: 126, ceiling: 126, scope: 'travel' },

  // ── GSA Fleet — a different schedule entirely; travel lines can't use these.
  //    One lease row and one mileage row per controlled vehicle TYPE, so the
  //    type a vehicle line names is the thing that looks its rate up. ──
  ...VEHICLE_TYPES.flatMap((t) => [
    { key: `gsa-lease-${t.key}`, location: 'GSA Fleet', kind: 'Vehicle lease', season: t.label, rate: t.monthly, ceiling: t.monthly, scope: 'vehicle' },
    { key: `gsa-mileage-${t.key}`, location: 'GSA Fleet', kind: 'Mileage', season: t.label, rate: t.perMile, ceiling: t.perMile, scope: 'vehicle' },
  ]),
];

export const gsaRate = (key) => gsaRates.find((g) => g.key === key);

/** Which schedule rows a category may reference. Travel can't pick fleet rows. */
export const GSA_SCOPE_BY_CATEGORY = { travel: 'travel', vehicles: 'vehicle' };

/** The schedule rows a given line is allowed to choose from. */
export const gsaRatesFor = (categoryKey) => {
  const scope = GSA_SCOPE_BY_CATEGORY[categoryKey];
  return scope ? gsaRates.filter((g) => g.scope === scope) : gsaRates;
};

/**
 * The categories, in LIB order. `shapes` lists which line shapes are legal in
 * that category — several categories mix shapes, which is exactly why the row,
 * not the category, decides the cells. `blocks` splits a category into
 * separately-subtotaled sub-blocks.
 *
 * ── `columns` — why each category names its own ─────────────────────────────
 * One global header for all nine categories forced every section to answer to
 * the same three words: Cost line / Quantity / Rate. But "Quantity" is MONTHS in
 * Personnel, NIGHTS in a lodging line, UNITS in Supplies, and nothing at all in
 * Fringe — and a header that has to be reinterpreted per section is a header
 * that stopped helping. So each category captions its own columns in its own
 * vocabulary, directly under its heading.
 *
 * ── How much of the grid is actually shared ─────────────────────────────────
 * Exactly one column HAS to line up across sections: Amount, because it has to
 * agree with the sub-block subtotals, the indirect base and the grand total in
 * the table foot. Work element and the row action ride along beside it. The
 * ENTRY columns to their left are read only within a section, so a section may
 * have as many of them as it needs and collapse the rest:
 *
 *   `span`        this category collapses every entry column into one spanned
 *                 cell (Subcontracts: a lump has no quantity and no rate).
 *   `qty: null`   the quantity column is void here (Fringe).
 *   `fringe`      this category renders a fourth entry column. Only Personnel —
 *                 Salary does; every other category spans its rate cell across
 *                 the gap, so the column costs them nothing but table width.
 */
/**
 * ── The two classes of equipment, as a sub-block axis ───────────────────────
 * Capital Equipment used to be a top-level category sitting next to Supplies &
 * Equipment — two headings that both said "equipment", with nothing in either
 * one telling the vendor which of them their thing belonged in. It is the same
 * relationship Personnel — Salary has with Technical and Administrative: one
 * kind of thing, split on one axis, each side subtotaled on its own.
 *
 * The difference from personnel is WHO decides. A position's type is a fact
 * about the position and the vendor picks it; an item's class is arithmetic —
 * the per-item cost against the capitalization threshold — so the form picks it.
 * See `autoFileEquipment`.
 *
 * This axis REPLACED Office/Field. Both cannot be the block axis at once, and
 * they are not the same kind of question: Office/Field is where an item lives,
 * capital/expensed is what it costs the contract. Only the second one moves
 * money — out of the indirect base and onto Property Inventory — so it is the
 * one the ledger groups by.
 */
export const EQUIPMENT_CLASSES = [
  {
    key: 'expensed',
    label: 'Supplies',
    note: 'Items under the capitalization threshold per item, plus lump-sum supply lines. The indirect rate reaches these.',
  },
  {
    key: 'capital',
    label: 'Capital equipment',
    note: 'Items at or above the threshold per item. Capitalized items leave the indirect base and go on the contract’s Property Inventory.',
  },
];

export const equipmentClass = (key) => EQUIPMENT_CLASSES.find((c) => c.key === key);
export const equipmentClassLabel = (key) => equipmentClass(key)?.label ?? '';

/**
 * ── Professional meetings & training: what kind of cost the line is ────────
 * One category, four kinds. CORs confirmed that subscriptions and training
 * stipends belong here rather than in a category of their own — a stipend that
 * covers a trainee's living expenses (not their tuition) is still the cost of
 * training someone. Each kind fixes the unit, the way a vehicle kind does, so
 * the column never has to be reinterpreted per row.
 *
 * A stipend is the one with two quantities: trainees × months, at a monthly
 * stipend — the same two-number shape a vehicle mileage line has.
 */
export const MEETING_KINDS = [
  { key: 'registration', label: 'Registration or tuition', unit: 'registrations',
    note: 'A meeting, conference or course — registrations × cost each. Link it to its trip to see the full cost.' },
  { key: 'subscription', label: 'Subscription', unit: 'subscriptions',
    note: 'A journal, a data service or a professional membership — subscriptions × cost each.' },
  { key: 'stipend', label: 'Training stipend', unit: 'trainees', secondUnit: 'months',
    note: 'Living expenses for a trainee while in training — not tuition, which is a registration. Trainees × months × the monthly stipend.' },
  { key: 'other', label: 'Other training cost', unit: null, vendorDefined: true,
    note: 'A training cost no kind above describes. Say what it is and name its unit — the COR sees it as vendor-defined.' },
];
export const meetingKind = (key) => MEETING_KINDS.find((k) => k.key === key);

/**
 * ── Other direct costs ──────────────────────────────────────────────────────
 * The category for what no other one holds. Honorariums are the case CORs named
 * — tribal contracts pay elders and cultural advisors for their time, and that
 * is neither salary nor a subcontract — so it is a kind of its own; anything
 * else is vendor-defined and says what it is.
 */
export const OTHER_KINDS = [
  { key: 'honorarium', label: 'Honorarium', unit: 'recipients',
    note: 'Pays for someone’s time or expertise — an elder, a cultural advisor, a guest speaker. Recipients × amount each.' },
  { key: 'other', label: 'Other direct cost', unit: null, vendorDefined: true,
    note: 'A direct cost no category describes. Say what it is and name its unit — the COR sees it as vendor-defined.' },
];
export const otherKind = (key) => OTHER_KINDS.find((k) => k.key === key);

/**
 * The kind a line carries in whichever category names kinds — or null. One
 * lookup so the unit, the note and the vendor-defined test read the same way in
 * every category instead of four.
 */
export const kindOfLine = (line) =>
  line?.shape === SHAPES.TRAVEL ? travelKind(line.travelKind)
  : line?.category === 'vehicles' ? vehicleKind(line.vehicleKind)
  : line?.category === 'meetings' ? meetingKind(line.meetingKind)
  : line?.category === 'other' ? otherKind(line.otherKind)
  : null;

/**
 * ── Vendor-defined lines ────────────────────────────────────────────────────
 * Allowing vendors their own entries is in direct tension with standardizing
 * the LIB — and needed anyway, because LIBs cover too wide a range of projects
 * for any closed list. The resolution is visibility, not prohibition: a
 * vendor-defined line must say what it is (gated), and it is badged on the row
 * and counted for the COR (noted, not blocked).
 */
export const isVendorDefined = (line) => !!kindOfLine(line)?.vendorDefined;

export const categories = [
  {
    key: 'personnel-salary',
    label: 'Personnel — salary',
    shapes: [SHAPES.QTY_RATE],
    /* The caption can no longer say "Months" flat — a line names its own time
       unit, and a header that has to be reinterpreted per row is a header that
       stopped helping. Same argument that gave every category its own captions. */
    /* `fringe` is the ONE category-specific entry column. Fringe rates are
       scanned, not read — "why is this one 22.3% when the rest are 35.1%" is a
       column question, and a percentage stacked inside the rate cell cannot be
       compared down the roster. Every other category has no fringe cell and
       spans its rate column over the gap, so none of them loses usable width. */
    columns: { line: 'Position title', qty: 'Time per person × staff', rate: 'Cost per unit', fringe: 'Fringe' },
    /* The type is a property of the position, so it sub-blocks the category the
       same way Supplies splits its two classes — each type subtotals on its own
       rather than the split being a word buried on every row. The split is
       OPTIONAL per budget (see `personnelSplit`): CORs were not agreed that every
       project has a meaningful admin/technical line, so a vendor can turn it off
       and list every position under one heading. */
    blocks: PERSONNEL_TYPES.map((t) => ({ key: t.key, label: t.label })),
    note: `Positions, never names. Each line is time per person × staff × rate, checked against the ${contractMonths}-month period. A second rate for a position is a second line.`,
  },
  {
    key: 'personnel-fringe',
    label: 'Personnel — fringe',
    shapes: [SHAPES.PCT_OF_BASE],
    /* `derived` means this section is READ, not written: every line in it is
       generated from a salary line, so it carries no add affordance and no
       editable cell. It stays a section — and a separately-subtotaled category —
       because that is the shape the funder reads, the reviewer disputes, and the
       indirect rate is scoped by. What moved is where fringe is TYPED. */
    derived: true,
    derivedFrom: 'personnel-salary',
    columns: { line: 'Fringe on', qty: null, rate: 'Rate and base' },
    note: 'One line per position, built from its salary lines at the default rate unless a salary line sets its own. Change rates on the salary lines.',
  },
  {
    key: 'travel',
    label: 'Travel',
    shapes: [SHAPES.TRAVEL],
    /* The caption names what the CELL holds. Occurrences left it when the
       restated chain did — that multiplier lives on the trip head, and a column
       heading promising it over cells that do not show it is a heading that has
       to be reinterpreted per row. */
    columns: { line: 'Travel line', qty: 'Count × duration', rate: 'Rate' },
    /** Trips ARE the sub-blocks: same machinery Supplies uses for its classes.
        The last block is not a trip — it is where travel that ISN'T a journey
        lives, and it is always present so there is somewhere to put one. */
    blocks: [
      ...trips.map((t) => ({ key: t.key, label: tripLabel(t), trip: t })),
      {
        key: NO_TRIP,
        label: 'Not part of a trip',
        standalone: true,
        note: 'One-off costs with no journey behind them, like a cab fare or routine mileage. Each still needs a destination.',
      },
    ],
    note: 'Add a trip and file its costs under it, or enter a line on its own. A trip’s lines repeat as often as the trip does. Every travel cost needs a destination.',
  },
  {
    key: 'meetings',
    label: 'Professional meetings & training',
    shapes: [SHAPES.QTY_RATE],
    /* The quantity caption is generic because the KIND names the unit on every
       row — registrations, subscriptions, trainees × months. */
    columns: { line: 'Meeting, course or cost', qty: 'Quantity', rate: 'Cost each' },
    kinds: MEETING_KINDS,
    note: 'Registrations, tuition, subscriptions and training stipends. Link a meeting to its trip to see the full cost; the travel stays in Travel.',
  },
  {
    key: 'vehicles',
    label: 'Vehicles',
    shapes: [SHAPES.AUTHORITY, SHAPES.QTY_RATE],
    columns: { line: 'Vehicle line', qty: 'Months × usage', rate: 'Rate' },
    note: 'Pick a kind and a vehicle type. GSA kinds use the GSA rate unless you override it. Commercial and motor-pool kinds take your rate, compared to GSA.',
  },
  {
    key: 'supplies',
    label: 'Supplies & equipment',
    shapes: [SHAPES.QTY_RATE, SHAPES.LUMP],
    columns: { line: 'Item', qty: 'Quantity', rate: 'Cost per unit' },
    /* One entry point, two sub-blocks — the same shape Personnel — salary has
       with Technical and Administrative, except the block is SUGGESTED by the
       per-item cost and the vendor may move it. */
    blocks: EQUIPMENT_CLASSES.map((c) => ({ key: c.key, label: c.label, note: c.note })),
    entersEquipment: true,
    /* The rate does not reach the whole category, so it is scoped by BLOCK here.
       See `indirectScopes` — this is the only category that splits. */
    splitsIndirectScope: true,
    note: 'Enter every item here. New items file by the capitalization threshold, and you can move any line between Supplies and Capital equipment.',
  },
  {
    key: 'rent-utilities',
    label: 'Rent & utilities',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Space or utility', qty: 'Months', rate: 'Cost per month' },
    /* Both captions already say months, and a line is ONE space or utility —
       a second space is a second line. */
    fixedUnit: 'months',
    note: 'A line tied to a position takes that position’s staffing months — no need to type them again.',
  },
  {
    key: 'other',
    label: 'Other direct costs',
    shapes: [SHAPES.QTY_RATE, SHAPES.LUMP],
    columns: { line: 'Cost', qty: 'Quantity', rate: 'Cost each' },
    kinds: OTHER_KINDS,
    note: 'Honorariums for elders, cultural advisors and speakers, and costs no other category holds.',
  },
  {
    key: 'subcontracts',
    label: 'Subcontracts',
    shapes: [SHAPES.LUMP],
    columns: { line: 'Subcontract', span: 'Itemized on its own sheet' },
    note: 'A lump tied to work elements. The detail lives on the subcontract’s own sheet.',
  },
];

export const categoryOf = (key) => categories.find((c) => c.key === key);

/**
 * The unit a CATEGORY fixes for every line in it, or null where the vendor still
 * names it. A third way for the unit to stop being a question, alongside the two
 * that already existed (a vehicle KIND fixes it, a salary line picks it off the
 * time-unit list) — and it exists for the same reason both of those do. An open
 * unit box under a column caption that already names the unit asks the vendor to
 * re-answer a settled question, and it drifts: "registrations" on one line,
 * "people" on the next, with the caption agreeing with neither. Locking it also
 * retires the generic second-quantity control, which these categories have no
 * meaning for — a meetings line is one course, a rent line is one space.
 */
export const categoryFixedUnit = (key) => categoryOf(key)?.fixedUnit ?? null;

/**
 * ── What the indirect rate is scoped BY ─────────────────────────────────────
 * A category, almost always. The exception is the whole reason Capital
 * Equipment used to be a category of its own: the rate reaches supplies and not
 * capitalized items, and those now live in one section as two blocks. So the
 * scope unit is a category UNLESS the category declares `splitsIndirectScope`,
 * in which case it is the block — and the scope key is `category:block`, which
 * is already the key `priceLines` subtotals blocks under.
 *
 * Keeping the scope a flat list of keys is deliberate: the picker in
 * cbf-lib-indirect-config is an audit surface, and "which lines were charged
 * overhead" has to stay answerable by one lookup, not by a tree walk.
 */
export const indirectScopes = categories.flatMap((c) =>
  c.splitsIndirectScope && c.blocks
    ? c.blocks.map((b) => ({
        key: `${c.key}:${b.key}`,
        label: b.label,
        parent: c.key,
        parentLabel: c.label,
      }))
    : [{ key: c.key, label: c.label }],
);

/** The scope key one line falls under. */
export const indirectScopeOf = (line) =>
  categoryOf(line.category)?.splitsIndirectScope
    ? `${line.category}:${line.block ?? ''}`
    : line.category;

/** A scope's own subtotal, whichever level it sits at. */
export const scopeAmount = (priced, key) =>
  (key.includes(':') ? priced.byBlock[key] : priced.byCategory[key]) ?? 0;

/**
 * ── Trip lifecycle ─────────────────────────────────────────────────────────
 * A trip exists in TWO places — the `trips` list the pricing engine looks keys
 * up in, and Travel's `blocks` list every surface walks to draw sub-block heads
 * and their subtotals. They were being pushed to by hand in three different
 * client scripts, and a trip that made it into one list but not the other is a
 * trip whose lines price correctly and render nowhere. So the pair is one
 * operation, here, and all three surfaces call it.
 *
 * The reason this got its own home is the GROUPING gesture (drag one travel
 * line onto another): unlike "Add trip", it creates a trip in the middle of an
 * interaction, from the facts of the trip the vendor dropped onto, and it can
 * leave the trip the line came FROM empty. Every surface has to make exactly
 * the same three decisions, so they are made once.
 */
let tripSeq = 0;

/** Create a trip, register it in both lists, and return it. */
export const createTrip = (seed = {}) => {
  const trip = {
    key: `trip-${++tripSeq}-${Date.now().toString(36)}`,
    locality: '',
    window: 'Dates to be set',
    occurrences: 1,
    ...seed,
  };
  trips.push(trip);
  /* Before the ungrouped block, never after it: "not part of a trip" is the
     catch-all at the bottom of Travel, and a new trip appended past it would
     leave the loose lines stranded in the middle of the section. */
  const blocks = categoryOf('travel')?.blocks;
  if (blocks) {
    const at = blocks.findIndex((b) => b.standalone);
    blocks.splice(at < 0 ? blocks.length : at, 0, { key: trip.key, label: tripLabel(trip), trip });
  }
  return trip;
};

/** Forget a trip — from the pricing list and from Travel's block list together. */
export const removeTrip = (key) => {
  const i = trips.findIndex((t) => t.key === key);
  if (i >= 0) trips.splice(i, 1);
  const blocks = categoryOf('travel')?.blocks;
  const j = blocks?.findIndex((b) => b.key === key) ?? -1;
  if (blocks && j >= 0) blocks.splice(j, 1);
};

/**
 * Which of the trips a move TOUCHED it left with nothing in them. A trip is a
 * container of costs, so one a regroup emptied is not a fact about this budget
 * any more — leaving the head behind accumulates a ghost per regroup, each
 * still claiming a destination and an occurrence count that price nothing.
 *
 * Scoped to the keys the move touched, deliberately: an empty trip the vendor
 * made with "Add trip" and has not filled in yet is empty for a completely
 * different reason, and sweeping it away because a line moved somewhere else
 * would delete work in progress they can still see on screen.
 */
export const emptiedTrips = (lines, touchedKeys = []) =>
  [...new Set(touchedKeys)].filter(
    (key) => key && trips.some((t) => t.key === key) && !lines.some((l) => l.trip === key),
  );

/**
 * ── The column arithmetic, in one place ────────────────────────────────────
 * Seven columns: line · quantity · rate · fringe · Amount · Work element ·
 * action. A section that does not render the fringe cell spans its rate cell
 * over it, so every row still totals seven and Amount stays in one column.
 * Anything that spans the entry block — a category heading, a lump, the totals
 * in the foot — spans ENTRY_COLUMNS of them.
 */
export const ENTRY_COLUMNS = 4;

/** Whether a line renders its own fringe cell, or spans the rate cell over it. */
export const hasFringeCell = (line) => isSalaryLine(line);

/** The colspan a line's rate cell carries. */
export const rateSpan = (line) => (hasFringeCell(line) ? 1 : 2);

// ── Cost lines ──────────────────────────────────────────────────────────────
// `amount` is never stored for computed shapes — priceLines() derives it, so a
// dependency can never silently disagree with the line it depends on.
//
// `acctCode` is the VENDOR'S accounting code, in their own ledger's format. A few
// lines are deliberately uncoded — mid-build, the way a real one arrives.

export const costLines = [
  // ── Personnel — salary ────────────────────────────────────────────────────
  // A number of TIME units per person × staff × the cost of one unit.
  // `block` is the position's type, so the category subtotals by type.
  // `fringePct` is present only where a line OVERRIDES the budget's default
  // fringe rate (see `fringeDefaults`); a line without it follows the default.
  { id: 'sal-1', category: 'personnel-salary', block: 'technical', shape: SHAPES.QTY_RATE,
    label: 'Natural Resource Spec. 3', acctCode: '5100-10',
    staffKey: 'natural-resource-spec-3', qty: 10.5, timeUnit: 'month', qtyUnit: 'months', rate: 4_750,
    allocations: { B: 40, E: 25, A: 15, C: 10, D: 10 } },

  // ── One position, two rates: the fiscal-year crossover ────────────────────
  // The contract period crosses 1 October, and the FY2027 COLA lands on it. The
  // COR consensus was to carry that as a second line with the same title — it
  // joins the same position, the same fringe line and the same work-element
  // split, and it is the "Add a rate step" gesture in the grid.
  { id: 'sal-2a', category: 'personnel-salary', block: 'technical', shape: SHAPES.QTY_RATE,
    label: 'Natural Resource Spec. 1', acctCode: '5100-10',
    staffKey: 'natural-resource-spec-1', qty: 5, timeUnit: 'month', qtyUnit: 'months', rate: 3_100,
    allocations: { B: 70, E: 30 } },
  { id: 'sal-2b', category: 'personnel-salary', block: 'technical', shape: SHAPES.QTY_RATE,
    label: 'Natural Resource Spec. 1', acctCode: '5100-10',
    staffKey: 'natural-resource-spec-1', qty: 7, timeUnit: 'month', qtyUnit: 'months', rate: 3_195,
    allocations: { B: 70, E: 30 } },

  // ── Two seasonal technicians are ONE line with a staff count of two ───────
  // Same title, same hours, same rate — CORs asked for a staff count so this is
  // not two identical lines. The period gate still reads 350 hours PER PERSON.
  // A seasonal position carries a DIFFERENT fringe rate from the budget default,
  // which is why the rate can be overridden per line.
  { id: 'sal-3', category: 'personnel-salary', block: 'technical', shape: SHAPES.QTY_RATE,
    label: 'Seasonal Technician', acctCode: '5100-20',
    staffKey: 'seasonal-technician', staff: 2, qty: 350, timeUnit: 'hour', qtyUnit: 'hours', rate: 16.6,
    fringePct: 0.223,
    allocations: { E: 100 } },

  // ── Administrative — its own sub-block, its own subtotal ──
  { id: 'sal-4', category: 'personnel-salary', block: 'admin', shape: SHAPES.QTY_RATE,
    label: 'Administrative Specialist', acctCode: '5100-30',
    staffKey: 'administrative-specialist', qty: 3, timeUnit: 'month', qtyUnit: 'months', rate: 3_600,
    // ── Deliberately unfinished: no work element assigned yet. ──
    allocations: {}, flags: ['no-allocation'] },

  // ── Personnel — fringe ─────────────────────────────────────────────────────
  // Not authored here. The fringe lines are GENERATED from the salary lines
  // above by syncFringeLines(), which runs at the bottom of this module and
  // again after every edit. See the block comment there for why.

  // ── Travel (shape E: trip + kind. `block` IS the trip key, so the trip gets a
  //    sub-block subtotal for free. `label` is DERIVED from kind + locality and
  //    kept in sync on edit — it exists here so the review layer, which addresses
  //    lines by name, has something to print. ──
  // Three travelers, TWO rooms — two of them share. That gap is exactly what a
  // single trip-level traveler count could not say, and it is why the count
  // lives on the line and names the unit it counts.
  { id: 'trv-1', category: 'travel', shape: SHAPES.TRAVEL, trip: 'coord', block: 'coord',
    travelKind: 'lodging', label: 'Lodging — Portland, OR', acctCode: '5300',
    count: 2, duration: 1,
    /* Claims the published rate for the PEAK season — the July meeting is the
       one that sets it. The typed 175 the vendor started from is kept
       underneath, so dropping the claim restores it rather than blanking the
       line. FY2026 Portland peak lodging is 196. */
    rate: 175, standard: { locality: 'Portland, OR', year: 2026, season: 'peak' },
    allocations: { B: 60, A: 40 } },
  // A two-day meeting is two TRAVEL days and no full one — both are at 75%.
  { id: 'trv-2', category: 'travel', shape: SHAPES.TRAVEL, trip: 'coord', block: 'coord',
    travelKind: 'mie', label: 'M&IE per diem — Portland, OR', acctCode: '5300',
    count: 3, duration: 0, partialDays: 2, rate: 79, standard: { locality: 'Portland, OR', year: 2026 },
    allocations: { B: 60, A: 40 } },
  { id: 'trv-3', category: 'travel', shape: SHAPES.TRAVEL, trip: 'coord', block: 'coord',
    travelKind: 'mileage', label: 'POV mileage — Portland, OR', acctCode: '5300',
    // One vehicle carries all three. The national rate, claimed for FY2026.
    count: 1, duration: 190, rate: 0.67, standard: { year: 2026 },
    allocations: { A: 100 } },

  { id: 'trv-4', category: 'travel', shape: SHAPES.TRAVEL, trip: 'workshop', block: 'workshop',
    travelKind: 'lodging', label: 'Lodging — Boise, ID', acctCode: '5300',
    /* Deliberately NOT on the standard: a quoted conference block rate, above
       the $178 Boise publishes for the Apr–Oct peak season. Nothing flags it — a
       typed rate is the vendor's to justify, and the row says plainly that it
       claims no standard, which is the fact the COR's mark is about. */
    count: 2, duration: 4, rate: 189,
    allocations: { A: 100 } },
  // Five days: three full, and the first and last at 75%.
  { id: 'trv-5', category: 'travel', shape: SHAPES.TRAVEL, trip: 'workshop', block: 'workshop',
    travelKind: 'mie', label: 'M&IE per diem — Boise, ID', acctCode: '5300',
    count: 2, duration: 3, partialDays: 2, rate: 68, standard: { locality: 'Boise, ID', year: 2026 },
    allocations: { A: 100 } },
  { id: 'trv-6', category: 'travel', shape: SHAPES.TRAVEL, trip: 'workshop', block: 'workshop',
    travelKind: 'airfare', label: 'Airfare — Boise, ID', acctCode: '5300',
    // Nothing published to claim, and no duration: the quote is the round trip.
    count: 2, rate: 418,
    allocations: { A: 100 } },
  // The kinds that used to be one blended "ground transport & parking" row.
  { id: 'trv-11', category: 'travel', shape: SHAPES.TRAVEL, trip: 'workshop', block: 'workshop',
    travelKind: 'ground', label: 'Ground transport — Boise, ID', acctCode: '5300',
    count: 2, duration: 2, rate: 24,
    allocations: { A: 100 } },
  { id: 'trv-12', category: 'travel', shape: SHAPES.TRAVEL, trip: 'workshop', block: 'workshop',
    travelKind: 'parking', label: 'Parking — Boise, ID', acctCode: '5300',
    count: 1, duration: 5, rate: 18,
    allocations: { A: 100 } },

  { id: 'trv-7', category: 'travel', shape: SHAPES.TRAVEL, trip: 'hatchery', block: 'hatchery',
    travelKind: 'lodging', label: 'Lodging — The Dalles, OR', acctCode: '5300',
    count: 1, duration: 1, rate: 121, standard: { locality: 'The Dalles, OR', year: 2026 },
    allocations: { E: 100 } },
  { id: 'trv-8', category: 'travel', shape: SHAPES.TRAVEL, trip: 'hatchery', block: 'hatchery',
    travelKind: 'mie', label: 'M&IE per diem — The Dalles, OR', acctCode: '5300',
    /* The second contract year, claimed as such — the trip runs every other month
       through a period that crosses 1 October, and the year is the vendor's to
       state rather than the form's to guess. */
    count: 1, duration: 0, partialDays: 2, rate: 68, standard: { locality: 'The Dalles, OR', year: 2027 },
    allocations: { E: 100 } },

  // ── Travel that is NOT a trip (no `trip`; the ungrouped block) ──
  // Neither of these is a journey anyone would describe: the mileage is routine
  // running around the basin all season, and the parking is one day at a hearing.
  // Each still says where it goes and why — a location is captured on every
  // travel cost, trip or no trip.
  { id: 'trv-9', category: 'travel', shape: SHAPES.TRAVEL, trip: null, block: NO_TRIP,
    travelKind: 'mileage', label: 'POV mileage — Rock Creek, WA', locality: 'Rock Creek, WA',
    purpose: 'Routine runs to the weir and screw trap sites', acctCode: '5300',
    count: 1, duration: 640, rate: 0.67, standard: { year: 2026 },
    allocations: { E: 60, B: 40 } },
  { id: 'trv-10', category: 'travel', shape: SHAPES.TRAVEL, trip: null, block: NO_TRIP,
    travelKind: 'parking', label: 'Parking — Portland, OR',
    locality: 'Portland, OR', purpose: 'Public hearing on the hatchery permit', acctCode: '5300',
    count: 1, duration: 1, rate: 34,
    allocations: { A: 100 } },

  // ── Professional meetings & training (shape A; the KIND names the unit) ──
  // The registration is LINKED to the Boise trip, so the trip head can show what
  // the whole journey costs — travel plus the meeting it was for.
  { id: 'mtg-1', category: 'meetings', shape: SHAPES.QTY_RATE, meetingKind: 'registration',
    label: 'Annual fisheries society meeting — registration', acctCode: '5350',
    qty: 2, qtyUnit: 'registrations', rate: 475, linkedTrip: 'workshop',
    allocations: { B: 50, F: 50 } },
  { id: 'mtg-2', category: 'meetings', shape: SHAPES.QTY_RATE, meetingKind: 'subscription',
    label: 'Fisheries journal subscription', acctCode: '5350',
    qty: 2, qtyUnit: 'subscriptions', rate: 120,
    allocations: { F: 100 } },
  { id: 'mtg-3', category: 'meetings', shape: SHAPES.QTY_RATE, meetingKind: 'stipend',
    label: 'Tribal youth fisheries internship — living stipend', acctCode: '5350',
    qty: 2, qtyUnit: 'trainees', qty2: 3, qty2Unit: 'months', rate: 1_150,
    allocations: { F: 100 } },

  // ── Vehicles (the kind decides the shape; the TYPE decides the GSA row) ──
  { id: 'veh-1', category: 'vehicles', shape: SHAPES.AUTHORITY, vehicleKind: 'lease',
    vehicleType: 'pickup-half-crew-4x4', label: 'GSA lease', acctCode: '5400',
    gsaKey: 'gsa-lease-pickup-half-crew-4x4', qty: 12, qtyUnit: 'months',
    allocations: { B: 50, E: 50 } },
  { id: 'veh-2', category: 'vehicles', shape: SHAPES.AUTHORITY, vehicleKind: 'mileage',
    vehicleType: 'pickup-half-crew-4x4', label: 'GSA lease mileage', acctCode: '5400',
    gsaKey: 'gsa-mileage-pickup-half-crew-4x4', qty: 12, qtyUnit: 'months', qty2: 550, qty2Unit: 'miles/month',
    allocations: { B: 60, C: 20, F: 20 } },
  // ── Deliberately priced above GSA: a motor-pool truck at the pool's rate ──
  //    The pool charges $560 a month against GSA's $538 for the same type. That
  //    is the vendor's number to stand behind, so it is NOTED for the COR beside
  //    the GSA figure rather than blocked.
  { id: 'veh-4', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'motor-pool',
    vehicleType: 'stake-bed', label: 'Motor pool', acctCode: '5400',
    qty: 3, qtyUnit: 'months', rate: 560,
    allocations: { B: 100 } },
  { id: 'veh-3', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'insurance',
    vehicleType: 'pickup-half-crew-4x4', label: 'Liability insurance', acctCode: '5400',
    qty: 12, qtyUnit: 'months', rate: 68,
    allocations: { B: 50, E: 50 } },
  { id: 'veh-5', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'fuel',
    vehicleType: 'pickup-half-crew-4x4', label: 'Fuel', acctCode: '5400',
    qty: 12, qtyUnit: 'months', rate: 210,
    allocations: { B: 50, E: 50 } },
  { id: 'veh-6', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'maintenance',
    vehicleType: 'pickup-half-crew-4x4', label: 'Maintenance & repair',
    qty: 12, qtyUnit: 'months', rate: 45,
    allocations: { B: 50, E: 50 } },

  // ── Supplies & equipment — the `expensed` block (shapes A + D) ────────────
  //    A new item files itself here or in `capital` from its per-item cost.
  //    These are the items under the threshold, plus the lumps.
  { id: 'sup-o1', category: 'supplies', block: 'expensed', shape: SHAPES.LUMP,
    label: 'Paper, pens, computer media', amount: 500, acctCode: '5500',
    allocations: { A: 100 } },
  { id: 'sup-o2', category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE,
    label: 'Printer toner and drums', qty: 6, qtyUnit: 'units', rate: 145, acctCode: '5500',
    allocations: { A: 100 } },
  { id: 'sup-f1', category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE,
    label: 'Tagging syringes', qty: 100, qtyUnit: 'units', rate: 30, acctCode: '5510',
    allocations: { B: 100 } },
  { id: 'sup-f2', category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE,
    label: 'PIT tags', qty: 2_400, qtyUnit: 'tags', rate: 2.35, acctCode: '5510',
    allocations: { B: 80, E: 20 } },
  // ── A lump too large to test per item — noted, not blocked ────────────────
  //    A lump has no per-item cost, so the threshold cannot reach inside it. At
  //    $5,400 it COULD be hiding a capitalizable item; the COR is told so.
  { id: 'sup-f3', category: 'supplies', block: 'expensed', shape: SHAPES.LUMP,
    label: 'Waders, nets, and sampling kits', amount: 5_400,
    allocations: { B: 70, E: 30 } },
  // ── Placed against the threshold, by hand — noted, not blocked ────────────
  //    At $6,200 per item the threshold suggests Capital equipment. The vendor
  //    moved it to Supplies, arguing the trap is an assembly of sub-threshold
  //    panels. Thresholds and their exceptions differ by contract, so the form
  //    allows the move and tells the COR it was made.
  { id: 'sup-f4', category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE,
    label: 'Rotary screw trap — panel and pontoon assembly', acctCode: '5510',
    qty: 1, qtyUnit: 'units', rate: 6_200, classOverride: true,
    allocations: { B: 100 } },

  // ── Supplies & equipment — the `capital` block ────────────────────────────
  //    At $12,400 per item the threshold filed it here, which takes it out of
  //    the indirect base and onto Property Inventory.
  { id: 'cap-1', category: 'supplies', block: 'capital', shape: SHAPES.QTY_RATE,
    label: 'Water quality sonde array', acctCode: '1750',
    qty: 1, qtyUnit: 'units', rate: 12_400,
    allocations: { B: 100 } },

  // ── Rent & utilities (shape A; one line's qty is LINKED to a position) ──
  { id: 'rnt-1', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Office space', qty: 12, qtyUnit: 'months', rate: 900, acctCode: '5600',
    allocations: { A: 100 } },
  { id: 'rnt-2', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Internet and phone service', qty: 12, qtyUnit: 'months', rate: 210, acctCode: '5610',
    allocations: { A: 100 } },
  { id: 'rnt-3', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Cell phone — Natural Resource Spec. 3', acctCode: '5610',
    // ── Cross-line dependency: qty is not typed, it mirrors sal-1's months. ──
    qtyFrom: 'sal-1', qtyUnit: 'months', rate: 55,
    allocations: { B: 60, E: 40 } },
  { id: 'rnt-4', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Propane — hatchery building', qty: 8, qtyUnit: 'months', rate: 200,
    allocations: { E: 100 } },

  // ── Other direct costs — the honorarium CORs asked for on tribal contracts ──
  { id: 'oth-1', category: 'other', shape: SHAPES.QTY_RATE, otherKind: 'honorarium',
    label: 'Elder honoraria — cultural resource review', acctCode: '5700',
    qty: 4, qtyUnit: 'recipients', rate: 250,
    allocations: { C: 100 } },

  // ── Subcontracts (shape D — the detail recurses to its own sheet) ──
  { id: 'sub-1', category: 'subcontracts', shape: SHAPES.LUMP,
    label: 'Genetics laboratory analysis', acctCode: '5800',
    amount: 28_000, sheet: 'sub-sheet-1',
    allocations: { B: 100 } },
];

// ── Pricing engine ──────────────────────────────────────────────────────────
// Resolves in dependency order: linked quantities → shapes A/B/D → shape C
// (which reads the amounts computed above it) → indirect (which reads the
// applicability scope). Everything downstream reads the returned map, so a
// dependent line can never disagree with its base.

const r2 = (n) => Math.round(n * 100) / 100;
const sum = (ns) => ns.reduce((a, b) => a + b, 0);

/** Whether this line's rate comes from the schedule rather than the keyboard. */
/**
 * Whether a line's rate is REFERENCED rather than typed. Two different things
 * wear that description now: a vehicle line on the GSA Fleet schedule, whose
 * whole shape is the reference, and a travel line that has explicitly claimed a
 * published standard rate. A travel line without that claim is typed, whatever
 * its kind — which is the reversal this model turns on.
 */
export const isScheduleRated = (line) =>
  line.shape === SHAPES.AUTHORITY ||
  (line.shape === SHAPES.TRAVEL && !!line.standard);

/**
 * The effective rate. A travel line's typed rate is kept even while a standard
 * is claimed — dropping the claim restores the number the vendor had, rather
 * than making them retype something they already answered — so the claim
 * SUPERSEDES rather than replaces, and this is the one place that decides which
 * of the two is live.
 */
export function effectiveRate(line) {
  if (line.shape === SHAPES.TRAVEL) {
    if (line.standard) return standardRateOn(line) ?? 0;
    return line.rate ?? 0;
  }
  if (isScheduleRated(line)) {
    const g = gsaRate(line.gsaKey);
    return line.rateOverride ?? g?.rate ?? 0;
  }
  return line.rate ?? 0;
}

// ── Travel arithmetic: occurrences × count × duration × rate ────────────────
// All three multiplicands are resolved rather than typed wherever the trip
// already knows them, which is the whole point of grouping by trip: raise the
// trip's occurrences and every line under it moves together.

/** How many times this line's trip happens. A line may override its trip, and a
 *  line with no trip happens once — there is no journey to repeat. */
export const travelOccurrences = (line) =>
  isLooseTravel(line) ? 1 : (line.occurrences ?? tripOf(line.trip)?.occurrences ?? 1);

/** Rooms, travelers or vehicles — whatever this line's KIND counts. Always the
 *  line's own number: the units differ per kind, so one shared count could not
 *  be right for all of them. */
export const travelCount = (line) => line.count ?? 1;

/** Nights, days, miles or rides — 1 for a kind with no duration. For M&IE it is
 *  the DAY-EQUIVALENTS the rate is paid for: full days, plus the partial
 *  (first and last) travel days at the kind's partial rate. */
export const travelDuration = (line) => {
  const k = travelKind(line.travelKind);
  if (!k?.durationLabel) return 1;
  if (k.partialRate) return (line.duration ?? 0) + (line.partialDays ?? 0) * k.partialRate;
  return line.duration ?? 1;
};

/** Partial (first/last) travel days on an M&IE line. */
export const travelPartialDays = (line) =>
  travelKind(line.travelKind)?.partialRate ? (line.partialDays ?? 0) : 0;

/**
 * The count a NEW line opens on: the last line already in this trip that counts
 * the same unit. Carrying from the line directly above would seed a mileage line
 * with a lodging line's room count — same number, different thing.
 */
export const seedCountFor = (tripKey, kindKey, lines = costLines) => {
  const unit = travelKind(kindKey)?.countLabel;
  if (!unit) return 1;
  /* Normalised, because a loose line's trip is absent on some surfaces and null
     on others, and `undefined === null` is false — which would have quietly
     stopped ungrouped lines seeding from each other. */
  const key = tripKey || null;
  const prior = lines.filter(
    (l) => (l.trip || null) === key && travelKind(l.travelKind)?.countLabel === unit,
  );
  return prior.length ? travelCount(prior[prior.length - 1]) : 1;
};

/** Whether this line runs on its trip's occurrence count rather than its own. */
export const travelOccInherited = (line) => line.occurrences == null;

/** "2 trips × 3 travelers × 1 night" — a plural-aware count of a unit. */
export const countOf = (n, plural) => `${qtyFmt(n)} ${n === 1 ? plural.replace(/s$/, '') : plural}`;

/** The multiplication, spelled out — the row prints this so the math is legible.
 *  An ungrouped line drops the leading "1 trip ×": there is no trip, and a
 *  multiplicand that is always 1 and always says the wrong noun is worse than
 *  no multiplicand at all. */
export const travelChain = (line) => {
  const k = travelKind(line.travelKind);
  const parts = isLooseTravel(line) ? [] : [countOf(travelOccurrences(line), 'trips')];
  parts.push(countOf(travelCount(line), k?.countLabel ?? 'units'));
  if (k?.partialRate) {
    /* Both day counts, never the blended day-equivalent: "2.5 days" is a number
       nobody travelled, and the CO is checking the split, not the product. */
    parts.push(`(${countOf(line.duration ?? 0, k.durationLabel)} + ${countOf(travelPartialDays(line), k.partialLabel.split(' at ')[0])} at ${Math.round(k.partialRate * 100)}%)`);
  } else if (k?.durationLabel) {
    parts.push(countOf(travelDuration(line), k.durationLabel));
  }
  return parts.join(' × ');
};

/** Where a travel line goes — its trip's destination, or its own. */
export const travelLocality = (line) =>
  (line.trip ? tripOf(line.trip)?.locality : line.locality) ?? '';

/** A travel line names itself from its kind and where it goes. */
export const travelLabel = (line) => {
  const k = travelKind(line.travelKind);
  if (!k) return line.label ?? '';
  const loc = travelLocality(line);
  /* A vendor-defined line is named by what the vendor said it is. */
  const name = k.vendorDefined ? ((line.desc ?? '').trim() || k.label) : k.label;
  return loc ? `${name} — ${loc}` : name;
};

/** What a trip costs in full: its travel lines, plus any professional meeting or
 *  training line linked to it — the number a COR wants when asking "is this
 *  conference worth it", which used to be two categories apart.
 *  @param {string} tripKey
 *  @param {any[]} [lines]
 *  @param {Record<string, number>|null} [amounts] */
export const tripFullCost = (tripKey, lines = costLines, amounts = null) => {
  const a = amounts ?? priceLines(lines).amounts;
  const travel = sum(lines.filter((l) => l.shape === SHAPES.TRAVEL && l.trip === tripKey).map((l) => a[l.id] ?? 0));
  const linked = lines.filter((l) => l.category === 'meetings' && l.linkedTrip === tripKey);
  const meetings = sum(linked.map((l) => a[l.id] ?? 0));
  return { travel: r2(travel), meetings: r2(meetings), total: r2(travel + meetings), linked };
};

/** A fringe line names itself after the position it follows. */
export const fringeLabel = (line, lines = costLines) =>
  `Fringe — ${baseLabelFor(line, lines)}`;

/** The quantity actually used — following a `qtyFrom` link when present. */
export function effectiveQty(line, lines) {
  if (line.qtyFrom) {
    const src = lines.find((l) => l.id === line.qtyFrom);
    if (!src) return 0;
    /* A line measured in MONTHS that follows a POSITION follows all of it: a
       position split into rate steps (an FY crossover, a COLA) is one person
       working the sum of those lines' time, so a cell phone following it runs
       for that sum — not for whichever step it was first linked to. Hours
       convert to calendar months on the way, or a phone following an hourly
       position would run for 700 months. Per person: a phone is one device. */
    if (line.qtyUnit === 'months' && isSalaryLine(src)) {
      const steps = src.staffKey ? salaryLinesFor(src.staffKey, lines) : [src];
      return Math.round(sum(steps.map((s) => (s.qty ?? 0) * timeUnit(s).months)) * 10) / 10;
    }
    return src.qty ?? 0;
  }
  return line.qty ?? 0;
}

/**
 * Price every line. Returns `{ amounts, byCategory, byBlock, totals }`.
 * `amounts` is id → dollars, already rounded to cents.
 */
export function priceLines(lines = costLines, cfg = indirectConfig) {
  const amounts = {};

  // Pass 1 — shapes A, B, D, E (nothing here depends on another line's AMOUNT,
  // only possibly on another line's QUANTITY, which is stored not derived, or on
  // its TRIP, which is stored too).
  for (const l of lines) {
    if (l.shape === SHAPES.LUMP) {
      amounts[l.id] = r2(l.amount ?? 0);
    } else if (l.shape === SHAPES.TRAVEL) {
      amounts[l.id] = r2(
        travelOccurrences(l) * travelCount(l) * travelDuration(l) * effectiveRate(l),
      );
    } else if (l.shape === SHAPES.QTY_RATE || l.shape === SHAPES.AUTHORITY) {
      const q = effectiveQty(l, lines);
      /* A personnel line's second multiplicand is its STAFF count — a named one,
         read separately by the period gate — never the generic second quantity,
         which let "12 months × 3" price at triple while the gate read only the
         first number. */
      const q2 = isSalaryLine(l) ? staffOf(l) : (l.qty2 ?? 1);
      amounts[l.id] = r2(q * q2 * effectiveRate(l));
    }
  }

  // Pass 2 — shape C, reading the amounts resolved above.
  for (const l of lines) {
    if (l.shape !== SHAPES.PCT_OF_BASE) continue;
    /* Fringe is summed PER SALARY LINE rather than taken off the blended rate a
       derived line displays: a position carried at two rates can carry two
       fringe rates, and blending first would leave the category subtotal a cent
       away from the rows that make it up. */
    amounts[l.id] = isDerivedFringe(l)
      ? r2(sum(salaryLinesFor(l.base.staffKey, lines).map((s) => (amounts[s.id] ?? 0) * fringePctOf(s))))
      : r2(baseAmountFor(l, lines, amounts) * (l.pct ?? 0));
  }

  // Roll up — by category, by sub-block, and by the vendor's accounting code
  // ('' collects the lines with none, so "uncoded" is a subtotal too).
  const byCategory = {};
  const byBlock = {};
  const byCode = {};
  for (const l of lines) {
    byCategory[l.category] = r2((byCategory[l.category] ?? 0) + amounts[l.id]);
    if (l.block) {
      const k = `${l.category}:${l.block}`;
      byBlock[k] = r2((byBlock[k] ?? 0) + amounts[l.id]);
    }
    const code = acctCodeOf(l, lines);
    byCode[code] = r2((byCode[code] ?? 0) + amounts[l.id]);
  }

  // Indirect — the base is whatever the rate is manually scoped to. The scope
  // unit is usually the category, but Supplies & Equipment splits by block: the
  // rate reaches expensed items and not capitalized ones, and those are two
  // blocks of one section rather than two sections. See `indirectScopes`.
  const indirectBase = r2(
    sum(lines.filter((l) => cfg.appliesTo.includes(indirectScopeOf(l))).map((l) => amounts[l.id])),
  );
  const indirect = r2(indirectBase * cfg.rate);
  const direct = r2(sum(lines.map((l) => amounts[l.id])));
  const total = r2(direct + indirect);

  return {
    amounts,
    byCategory,
    byBlock,
    byCode,
    totals: {
      direct,
      indirectBase,
      indirect,
      total,
      remaining: r2(contract.contractValue - total),
      pctOfValue: total / contract.contractValue,
    },
  };
}

/** Resolve a shape-C line's base to dollars. */
export function baseAmountFor(line, lines = costLines, amounts = null) {
  const a = amounts ?? priceLines(lines).amounts;
  const b = line.base ?? {};
  if (b.type === 'staff') {
    return r2(sum(lines.filter((l) => l.staffKey === b.staffKey && l.category === 'personnel-salary').map((l) => a[l.id] ?? 0)));
  }
  if (b.type === 'items') {
    return r2(sum((b.ids ?? []).map((id) => a[id] ?? 0)));
  }
  if (b.type === 'category') {
    return r2(sum(lines.filter((l) => l.category === b.category).map((l) => a[l.id] ?? 0)));
  }
  return 0;
}

/** A human label for what a shape-C line is a percentage OF. */
export function baseLabelFor(line, lines = costLines) {
  const b = line.base ?? {};
  if (b.type === 'staff') {
    /* Name the POSITION, not the first line that happens to carry it — a position
       split across two rate periods has two lines and one name. */
    return positionTitle(b.staffKey, lines) || b.staffKey;
  }
  if (b.type === 'category') return categoryOf(b.category)?.label ?? b.category;
  if (b.type === 'items') return `items ${(b.ids ?? []).length ? '1–' + b.ids.length : ''}`.trim();
  return '—';
}

/**
 * ── Fringe is GENERATED, never authored ────────────────────────────────────
 * Fringe is not a budgeting decision. It is an organization's rate applied to a
 * position: the vendor does not choose it, scope it, or split it across work
 * elements — it follows the salary. Authoring it as an independent line asked
 * for three gestures (create a line, point it at a base, type an allocation)
 * where there are no real choices, and every one of them was a place to drift
 * away from the salary line it is a consequence of.
 *
 * So the RATE is a field on the salary row, and the LINE is derived from it:
 * one per position, named by the position, allocated the way that position's
 * salary is allocated, priced off each salary line's own rate, and destroyed
 * with the last salary line that carried it. There is no orphan to repoint,
 * because there is nothing to point.
 *
 * What did NOT move is where fringe is read. It is still a line, in its own
 * separately-subtotaled category, because that is the object class the funder
 * reads, the thing a reviewer disputes by name, and the unit `indirectConfig
 * .appliesTo` scopes the overhead rate by.
 */

/** The organization's standard fringe rate — what a budget's default opens on. */
export const DEFAULT_FRINGE_PCT = 0.351;

/**
 * ── The DEFAULT fringe rate, set once per budget ────────────────────────────
 * CORs asked for a default fringe with a per-line override. Before, every
 * salary line carried its own copy of the house rate, so a vendor whose rate
 * changed had to retype it on every position — and a line they missed was
 * indistinguishable from a deliberate exception. Now the budget states the rate
 * once; a salary line follows it unless it carries its own `fringePct`, and a
 * line that does is marked as an override, which is the thing a reviewer scans
 * for ("why is this one 22.3%?").
 *
 * Mutable on purpose, like `contract.capitalizationThreshold`: it is budget
 * state the grid edits, and the pricing engine reads it live.
 */
export const fringeDefaults = { pct: DEFAULT_FRINGE_PCT };

/** The fringe rate a salary line carries — its override, or the budget default. */
export const fringePctOf = (line) => line?.fringePct ?? fringeDefaults.pct;

/** Whether a salary line overrides the budget's default fringe rate. */
export const isFringeOverride = (line) => isSalaryLine(line) && line.fringePct != null;

/**
 * The accounting code a line is booked to. A generated fringe line has no field
 * of its own to type into, so it carries its salary lines' code when they agree
 * on one — and none when they do not, rather than picking one.
 */
export const acctCodeOf = (line, lines = costLines) => {
  if (line?.category === 'personnel-fringe' && line.base?.staffKey) {
    const codes = new Set(salaryLinesFor(line.base.staffKey, lines).map((s) => (s.acctCode ?? '').trim()));
    return codes.size === 1 ? [...codes][0] : '';
  }
  return (line?.acctCode ?? '').trim();
};

/**
 * ── Whether Personnel — salary splits into Technical and Administrative ─────
 * CORs were not agreed that the split means something on every contract — "how
 * or if to capture administrative versus on-the-ground work is not clear" — so
 * it is a per-budget choice. Off, every position lists under one heading; the
 * type each line carries is kept, so turning it back on loses nothing.
 */
export const personnelSplit = { on: true };

/** A generated fringe line — the ones nothing may type into. */
export const isDerivedFringe = (line) =>
  line?.category === 'personnel-fringe' && line?.base?.type === 'staff';

/** Stable per position, so a repaint never has to rebuild a row that survived. */
export const fringeIdFor = (staffKey) => `frg-${String(staffKey).toLowerCase()}`;

/**
 * The dollars ONE salary line generates in fringe.
 * @param {Record<string, number>|null} [amounts] priced amounts, if the caller
 *   already has them — annotated because a bare `= null` default infers as the
 *   literal null type and rejects every real argument.
 */
export const fringeOnLine = (line, lines = costLines, amounts = null) => {
  if (!isSalaryLine(line)) return 0;
  const a = amounts ?? priceLines(lines).amounts;
  return r2((a[line.id] ?? 0) * fringePctOf(line));
};

/**
 * The work-element split a derived fringe line inherits — amount-weighted across
 * the position's salary lines, because a position split across two rate periods
 * may be split across work elements differently too. Largest-remainder rounding,
 * so the result totals exactly 100 rather than 99 or 101.
 *
 * A position whose salary is not fully allocated inherits NOTHING, not a partial
 * split: the fringe of an unallocated salary is unallocated, and the fix belongs
 * on the salary line rather than on a row that only follows it.
 */
function inheritedAllocation(sal, weightOf) {
  if (!sal.length) return {};
  if (!sal.every((l) => sum(Object.values(l.allocations ?? {})) === 100)) return {};

  const total = sum(sal.map(weightOf));
  const raw = {};
  for (const l of sal) {
    const w = total ? weightOf(l) / total : 1 / sal.length;
    for (const [we, p] of Object.entries(l.allocations ?? {})) raw[we] = (raw[we] ?? 0) + p * w;
  }

  const keys = Object.keys(raw);
  const out = {};
  keys.forEach((k) => { out[k] = Math.floor(raw[k]); });
  let left = 100 - sum(Object.values(out));
  for (const k of keys.slice().sort((a, b) => (raw[b] - out[b]) - (raw[a] - out[a]))) {
    if (left <= 0) break;
    out[k] += 1;
    left -= 1;
  }
  return Object.fromEntries(Object.entries(out).filter(([, p]) => p > 0));
}

/** The fringe lines a set of salary lines generates — one per position, in the
 *  order the positions first appear, so the section reads down like the salary
 *  section it follows. */
export function fringeLinesFor(lines = costLines) {
  const keys = [];
  for (const l of lines) {
    if (isSalaryLine(l) && l.staffKey && !keys.includes(l.staffKey)) keys.push(l.staffKey);
  }

  return keys.map((staffKey) => {
    const sal = salaryLinesFor(staffKey, lines);
    /* Salary is staff × qty × rate with no cross-line dependency, so the
       weights can be computed here without waiting on a full pricing pass. */
    const weightOf = (l) => r2(staffOf(l) * effectiveQty(l, lines) * effectiveRate(l));
    const base = sum(sal.map(weightOf));
    const dollars = sum(sal.map((l) => weightOf(l) * fringePctOf(l)));
    /* One position, one fringe line — but a position carried at two rates may
       carry two fringe rates, so the line states the BLENDED rate its dollars
       actually represent rather than picking one of them to show. */
    const blended = base ? dollars / base : fringePctOf(sal[0]);

    return {
      id: fringeIdFor(staffKey),
      category: 'personnel-fringe',
      shape: SHAPES.PCT_OF_BASE,
      derived: true,
      staffKey,
      base: { type: 'staff', staffKey },
      pct: Math.round(blended * 10000) / 10000,
      label: `Fringe — ${positionTitle(staffKey, lines) || staffKey}`,
      allocations: inheritedAllocation(sal, weightOf),
    };
  });
}

/**
 * Bring the derived fringe set in step with the salary set, IN PLACE — the grid
 * mutates one working array, so this replaces the fringe lines inside it rather
 * than returning a new list. Called on load and after every edit: adding a
 * position adds its fringe line, deleting the last line carrying a position
 * deletes it, and a rate typed on a salary row lands here on the same keystroke.
 */
export function syncFringeLines(lines = costLines) {
  const next = fringeLinesFor(lines);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    if (lines[i].category === 'personnel-fringe') lines.splice(i, 1);
  }
  const lastSalary = lines.map((l) => l.category).lastIndexOf('personnel-salary');
  lines.splice(lastSalary + 1, 0, ...next);
  return lines;
}

/* The seed budget's fringe set, generated once at load — after the pricing
   helpers it reads. Nothing below this line authors a fringe line by hand. */
syncFringeLines(costLines);

/**
 * Every line that moves when `id` moves — the lines whose quantity is linked to
 * it, plus the shape-C lines computed off its staff group. The grid surfaces
 * these so a vendor editing a salary line can see what else just changed.
 */
export const dependentsOf = (id, lines = costLines) => {
  const src = lines.find((l) => l.id === id);
  if (!src) return [];
  return lines.filter(
    (l) =>
      l.id !== id &&
      (l.qtyFrom === id ||
        (src.staffKey != null && l.base?.type === 'staff' && l.base.staffKey === src.staffKey)),
  );
};

// ── Gates ───────────────────────────────────────────────────────────────────
// Two kinds of finding, kept apart on purpose:
//   · a GATE blocks submission — the budget is incomplete or does not add up
//     (`submitChecksFor`)
//   · an ADVISORY is noted for the COR and blocks nothing — the vendor made a
//     choice the COR should see, and is allowed to make (`advisoriesFor`)
// The COR feedback of 2026-10 moved three findings from the first list to the
// second: pricing a vehicle off the GSA rate, placing an item against the
// capitalization threshold, and a lump too large to test per item. The ask was
// flexibility WITH visibility — "not business logic to restrict" — so the form
// stopped refusing those and started reporting them.

export const unallocatedLines = (lines = costLines) =>
  lines.filter((l) => sum(Object.values(l.allocations ?? {})) !== 100);

/**
 * Vehicle lines priced ABOVE the GSA Fleet rate for their type: a GSA kind whose
 * rate was overridden upward, or a commercial-lease / motor-pool line typed
 * above the GSA rate for the same type. Noted, never blocked — a vendor may be
 * paying a lessor or a pool more than GSA charges, and that is theirs to state.
 *
 * Travel is absent: a travel line either claims a published rate — in which
 * case it IS that rate — or types its own, and the row says which.
 */
export const gsaAboveLines = (lines = costLines) =>
  lines.filter((l) => {
    if (l.category !== 'vehicles') return false;
    if (l.shape === SHAPES.AUTHORITY) {
      const g = gsaRate(l.gsaKey);
      return !!g && l.rateOverride != null && l.rateOverride > g.ceiling;
    }
    const cmp = gsaCompareRate(l);
    return cmp != null && (l.rate ?? 0) > cmp;
  });

/** Kept for the frozen sheet and wizard surfaces, which still read it as a count. */
export const gsaFailingLines = gsaAboveLines;

/**
 * ── The capitalization threshold as a SUGGESTION, not a rule ───────────────
 * A supply and a capital item are not two things a vendor knows how to tell
 * apart by eye, so a NEW item is filed for them from its own numbers
 * (`autoFileEquipment`). What changed is everything after that. Thresholds are
 * not fixed across contracts or across kinds of equipment, so the vendor may
 * set the contract's threshold, and may move ANY equipment line between
 * Supplies and Capital equipment in either direction — an assembly of
 * sub-threshold parts, an item their own policy capitalizes lower. A line moved
 * by hand is pinned (`classOverride`) and the sort leaves it alone.
 *
 * The two classes stay separately subtotaled, because the split is not cosmetic
 * — crossing the threshold does two things to real money:
 *   • the indirect rate reaches `expensed` and NOT `capital` (see
 *     `indirectScopes`), so an item crossing over takes its overhead with it
 *   • a capitalized item becomes tracked property on the Property Inventory tab
 * Which is why the row states the consequence rather than just the block name:
 * money must never move out of the indirect base silently — and why a line
 * placed against the threshold is reported to the COR, not refused.
 */

/** The category whose blocks the threshold sorts between. */
export const EQUIPMENT_CATEGORY = 'supplies';

export const onThreshold = (line) => line.category === EQUIPMENT_CATEGORY;
export const isCapitalLine = (line) => onThreshold(line) && line.block === 'capital';

/** Only a per-unit line has a per-item cost to sort on — a lump has no count. */
export const thresholdTested = (line) => onThreshold(line) && line.shape === SHAPES.QTY_RATE;

export const perItemCost = (line, amounts) => (amounts[line.id] ?? 0) / (line.qty || 1);

/** The whole suggestion, in one line: what a per-item cost makes an item. */
export const classForPerItem = (cost) =>
  cost >= contract.capitalizationThreshold ? 'capital' : 'expensed';

/** Where the threshold would file a sortable equipment line, from its own numbers. */
export const thresholdClassFor = (line, amounts) =>
  thresholdTested(line) ? classForPerItem(perItemCost(line, amounts)) : null;

/** A line the vendor placed by hand — pinned, so the sort no longer moves it. */
export const isClassOverride = (line) => line.classOverride === true;

/** Any equipment line can be moved by hand, in either direction, itemized or lump. */
export const canOverrideThreshold = (line) => onThreshold(line);

/** Retained for the frozen surfaces; a threshold change no longer strands a line. */
export const thresholdDrifted = () => false;

/**
 * File one equipment line into the class its per-item cost suggests — unless
 * the vendor has placed it by hand. Returns `{ from, to }` when the line moved
 * and null when it did not.
 */
export function autoFileEquipment(line, amounts) {
  if (!thresholdTested(line) || isClassOverride(line)) return null;
  const to = classForPerItem(perItemCost(line, amounts));
  if (line.block === to) return null;
  const from = line.block;
  line.block = to;
  return { from, to };
}

/** The sub-block a line renders under — nothing, in a category with no blocks. */
export const blockOf = (line) =>
  (categoryOf(line.category)?.blocks ? line.block : '') || '';

/** The class on the other side from where this line currently sits. */
export const thresholdTargetFor = (line) => (isCapitalLine(line) ? 'expensed' : 'capital');

/** Whether the indirect rate reaches a scope, per the LIVE config. */
export const indirectReaches = (scopeKey, cfg = indirectConfig) =>
  (cfg.appliesTo ?? []).includes(scopeKey);

/**
 * What filing an item on this side of the threshold actually DOES. The vendor is
 * not being told a block name — they are being told which of their dollars the
 * indirect rate reaches, and what the contract will track as property.
 */
export function filingConsequence(line, cfg = indirectConfig) {
  const indirect = indirectReaches(indirectScopeOf(line), cfg)
    ? `in the indirect base at ${pct(cfg.rate)}`
    : 'excluded from the indirect base';
  return isCapitalLine(line)
    ? `Capitalized — ${indirect}, and tracked on Property Inventory.`
    : `A supply — ${indirect}.`;
}

/**
 * Itemized equipment lines sitting on the OTHER side of the threshold from the
 * one their per-item cost suggests. With the sort running, that is exactly the
 * lines a vendor placed by hand against it. Noted for the COR.
 */
export const thresholdMisfiled = (lines = costLines) => {
  const { amounts } = priceLines(lines);
  return lines.filter(
    (l) => thresholdTested(l) && l.block !== classForPerItem(perItemCost(l, amounts)),
  );
};
export const placedAgainstThreshold = thresholdMisfiled;

/**
 * Supply lumps at or above the threshold. A lump carries no per-item cost, so
 * the threshold cannot reach inside it — it COULD be hiding a capitalizable
 * item. Noted for the COR, not blocked: some contracts budget field kits as one
 * line, and itemizing is a request the COR can make with a mark.
 */
export const untestableEquipmentLumps = (lines = costLines) => {
  const { amounts } = priceLines(lines);
  return lines.filter(
    (l) =>
      onThreshold(l) &&
      !isCapitalLine(l) &&
      l.shape === SHAPES.LUMP &&
      (amounts[l.id] ?? 0) >= contract.capitalizationThreshold,
  );
};

/** Everything the threshold could not settle on its own: hand placements and lumps. */
export const thresholdUnsettled = (lines = costLines) => [
  ...thresholdMisfiled(lines),
  ...untestableEquipmentLumps(lines),
];

/**
 * ── The period gate, on the axis every unit shares ──────────────────────────
 * Converting the line's time to months FIRST makes one rule cover every unit:
 * one person cannot be budgeted for more time than the contract runs. The staff
 * count does not enter into it — "12 months × 3 staff" is three people working
 * the whole period, which is fine, where "36 months" for one is not.
 */

/** A personnel line's budgeted time PER PERSON, converted to months. */
export const timeInMonths = (line, lines = costLines) =>
  r2((effectiveQty(line, lines) ?? 0) * timeUnit(line).months);

/** One person, budgeted for more time than the contract period contains. */
export const periodProblem = (line, lines = costLines) => {
  if (!isSalaryLine(line)) return null;
  return timeInMonths(line, lines) > contractMonths ? 'over-period' : null;
};

/** Personnel lines budgeted past the contract period. */
export const monthsOverPeriod = (lines = costLines) =>
  lines.filter((l) => periodProblem(l, lines) != null);

export const unfundedWorkElements = (lines = costLines) =>
  workElements.filter((we) => lines.every((l) => !(l.allocations ?? {})[we.id]));

/** Travel lines with no destination — on a trip with none, or on their own. */
export const unlocatedTravel = (lines = costLines) =>
  lines.filter((l) => l.shape === SHAPES.TRAVEL && !travelLocality(l).trim());

/** Vendor-defined lines that do not yet say what they are. */
export const undescribedLines = (lines = costLines) =>
  lines.filter((l) => {
    if (!isVendorDefined(l)) return false;
    const text = l.shape === SHAPES.TRAVEL || l.category === 'vehicles' ? l.desc : l.label;
    return !(text ?? '').trim();
  });

/** Vehicle lines whose kind needs a vehicle type and has none. */
export const untypedVehicles = (lines = costLines) =>
  lines.filter((l) => l.category === 'vehicles' && vehicleKind(l.vehicleKind)?.needsType && !vehicleType(l.vehicleType));

/** Lines with no accounting code — noted, because invoices cannot be matched to them. */
export const uncodedLines = (lines = costLines) =>
  lines.filter((l) => !acctCodeOf(l, lines));

/**
 * The submit gate. Every check is computed from the lines, so the checklist and
 * the Submit button can never disagree with the grid. The vendor still owns the
 * submit — passing every check enables it, nothing submits on their behalf.
 */
export function submitChecksFor(lines = costLines, cfg = indirectConfig) {
  const { totals } = priceLines(lines, cfg);
  const unallocated = unallocatedLines(lines);
  const months = monthsOverPeriod(lines);
  const untitled = untitledPositionLines(lines);
  const unfunded = unfundedWorkElements(lines);
  const unlocated = unlocatedTravel(lines);
  const undescribed = undescribedLines(lines);
  const untyped = untypedVehicles(lines);
  const n = (arr, word) => `${arr.length} ${word}${arr.length === 1 ? '' : 's'}`;
  return [
    { key: 'allocation', label: 'Every cost line is allocated to a work element',
      pass: unallocated.length === 0,
      detail: unallocated.length === 0 ? 'All lines total 100%' : `${n(unallocated, 'line')} unallocated` },
    { key: 'named', label: 'Every personnel line names a position',
      pass: untitled.length === 0,
      detail: untitled.length === 0
        ? `${rosterFor(lines).length} positions defined on this budget`
        : `${n(untitled, 'line')} with no position title` },
    { key: 'months', label: 'No one is budgeted past the contract period',
      pass: months.length === 0,
      detail: months.length === 0
        ? `All personnel lines within ${contractMonths} months per person`
        : `${n(months, 'line')} budgeted past ${contractMonths} months` },
    { key: 'located', label: 'Every travel cost says where it goes',
      pass: unlocated.length === 0,
      detail: unlocated.length === 0 ? 'Every travel line has a destination' : `${n(unlocated, 'line')} with no destination` },
    { key: 'vehicle-type', label: 'Every vehicle has a vehicle type',
      pass: untyped.length === 0,
      detail: untyped.length === 0 ? 'Every vehicle line is typed' : `${n(untyped, 'line')} with no vehicle type` },
    { key: 'described', label: 'Every vendor-defined line is described',
      pass: undescribed.length === 0,
      detail: undescribed.length === 0 ? 'Every line is described' : `${n(undescribed, 'line')} with no description` },
    { key: 'indirect', label: 'Indirect rate matches the approved reference',
      pass: true, detail: `${pct(cfg.rate)} — ${cfg.referenceDoc}` },
    { key: 'funded', label: 'Every work element carries budget',
      pass: unfunded.length === 0,
      detail: unfunded.length === 0 ? `All ${workElements.length} work elements funded` : `${n(unfunded, 'element')} unfunded` },
    { key: 'ceiling', label: 'Total is within the Contract Value',
      pass: totals.total <= contract.contractValue,
      detail: totals.total <= contract.contractValue
        ? `${usd(totals.remaining)} remaining`
        : `${usd(Math.abs(totals.remaining))} over` },
  ];
}

/**
 * What the COR should see and the vendor is allowed to do — noted, never
 * blocking. Each entry carries the ids it is about, so a surface can link to the
 * lines rather than only count them. Zero-count entries are kept: a surface that
 * hides them still needs to know the key exists to hide it.
 */
export function advisoriesFor(lines = costLines) {
  const n = (arr, word) => `${arr.length} ${word}${arr.length === 1 ? '' : 's'}`;
  const above = gsaAboveLines(lines);
  const placed = thresholdMisfiled(lines);
  const lumps = untestableEquipmentLumps(lines);
  const vendor = lines.filter(isVendorDefined);
  const uncoded = uncodedLines(lines);
  const fringe = lines.filter(isFringeOverride);
  return [
    { key: 'gsa-above', label: 'Vehicles priced above the GSA rate', ids: above.map((l) => l.id),
      detail: n(above, 'line') },
    { key: 'placed', label: 'Equipment moved by hand', ids: placed.map((l) => l.id),
      detail: `${n(placed, 'item')}, against the ${usd(contract.capitalizationThreshold)} threshold` },
    { key: 'lumps', label: 'Large lump-sum supply lines', ids: lumps.map((l) => l.id),
      detail: `${n(lumps, 'lump')} at or above ${usd(contract.capitalizationThreshold)} — could hold capital items` },
    { key: 'fringe', label: 'Fringe overrides', ids: fringe.map((l) => l.id),
      detail: `${n(fringe, 'line')} off the ${pct(fringeDefaults.pct, 1)} default` },
    { key: 'vendor-defined', label: 'Vendor-defined lines', ids: vendor.map((l) => l.id),
      detail: n(vendor, 'line') },
    { key: 'uncoded', label: 'Lines with no accounting code', ids: uncoded.map((l) => l.id),
      detail: `${n(uncoded, 'line')} — invoices can’t be matched to them yet` },
  ];
}

// ── The subcontract sheet (stubbed jump-out) ────────────────────────────────
// Each subcontract runs the ENTIRE category set again on its own sheet, with no
// indirect rate applied and no lump-sums or contingency allowed — plus a state
// tax on construction that is a shape-C percentage of items 1–3. This screen
// shows the seam and a shallow stand-in; the full sheet is a separate build.

export const subcontractSheets = {
  'sub-sheet-1': {
    id: 'sub-sheet-1',
    title: 'Genetics laboratory analysis',
    vendor: 'Subcontractor — competitively selected',
    parentLine: 'sub-1',
    total: 28_000,
    rules: [
      'No indirect rate applies on a subcontract sheet.',
      'No lump-sum or contingency lines — itemize every line.',
      'State tax on construction is a percentage of items 1–3.',
    ],
    /** A shallow stand-in for the recursed category set. */
    categorySummary: [
      { category: 'personnel-salary', label: 'Personnel — salary', amount: 16_800 },
      { category: 'personnel-fringe', label: 'Personnel — fringe', amount: 4_620 },
      { category: 'supplies', label: 'Supplies & equipment', amount: 5_180 },
      { category: 'travel', label: 'Travel', amount: 1_400 },
    ],
  },
};

// ── Formatters (shared so every component renders money identically) ─────────

export function usd(n, { cents = false } = {}) {
  return (n ?? 0).toLocaleString('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
}

export const pct = (f, digits = 2) => `${((f ?? 0) * 100).toFixed(digits)}%`;

/** Number formatting for quantities — keeps 10.5 months honest, drops .00. */
export const qtyFmt = (n) =>
  (n ?? 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
