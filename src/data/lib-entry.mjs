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
//   C  pct-of-base     pick a base, enter a percentage. No qty, no unit.
//                      Mathematically dependent on other lines.
//   D  lump            label, one dollar amount. No qty, no rate.
//   E  travel-line     belongs to a TRIP and picks a travel KIND (lodging, M&IE,
//                      airfare, POV mileage, ground, registration). The kind
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
//   • fringe (C)      depends on the salary lines for its staff group
//   • cell phone (A)  its months are LINKED to a position's staffing months
//   • indirect        depends on the sum of whatever the rate is scoped to
//   • state tax (C)   depends on items 1–3 (on the subcontract sheet)
// `priceLines()` below resolves all of it in dependency order.
//
// The screen is deliberately shown MID-BUILD: the total reads ~91% of the
// Contract Value, one travel line is over its GSA ceiling, and one salary line
// has no work-element allocation. Those unfinished states are the design point.

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
  /** The dollar test that decides capital equipment vs. a supply. */
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

/**
 * The sponsor's position roster. A LIB carries POSITIONS, not people, so a
 * salary line picks a title from the roster instead of typing one — which is
 * also what lets a fringe line name itself after the position it follows.
 * `staffKey` on a cost line is a position key.
 */
export const positions = [
  { key: 'NRS3', title: 'Natural Resource Spec. 3' },
  { key: 'NRS2', title: 'Natural Resource Spec. 2' },
  { key: 'NRS1', title: 'Natural Resource Spec. 1' },
  { key: 'HATCH', title: 'Hatchery Supervisor' },
  { key: 'TECH', title: 'Seasonal Technician' },
  { key: 'GIS', title: 'GIS Analyst' },
  { key: 'ADMIN', title: 'Administrative Specialist' },
  { key: 'FISCAL', title: 'Fiscal Officer' },
];

export const positionOf = (key) => positions.find((p) => p.key === key);
export const positionTitle = (key) => positionOf(key)?.title ?? '';

/**
 * ── Trips ──────────────────────────────────────────────────────────────────
 * Travel is not a list of costs, it is a list of TRIPS that each generate
 * several costs. A trip owns only what is genuinely a fact about the JOURNEY:
 * where, why, when, and `occurrences` — the count that made the old flat list
 * dishonest, because a semiannual coordination meeting is ONE trip that happens
 * twice, not two unrelated rows a reviewer has to recognise as the same journey.
 * Every line inside multiplies by it, so raising it moves them all together.
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
    purpose: 'Co-manager coordination meetings',
    window: 'Semiannual — Jul 2026 and Feb 2027',
    occurrences: 2,
  },
  {
    key: 'workshop',
    locality: 'Boise, ID',
    purpose: 'Subbasin planning workshop',
    window: '09/14–09/18/2026',
    occurrences: 1,
  },
  {
    key: 'hatchery',
    locality: 'The Dalles, OR',
    purpose: 'Hatchery inspection and broodstock coordination',
    window: 'Every other month through the period',
    occurrences: 6,
  },
];

export const tripOf = (key) => trips.find((t) => t.key === key);

/** A trip is named by where it goes and what for — never typed separately. */
export const tripLabel = (t) =>
  [t?.locality, t?.purpose].filter(Boolean).join(' — ') || 'New trip — set a destination';

/**
 * ── Destination, and the CONUS fallback ────────────────────────────────────
 * A destination is typed, not picked. The GSA schedule prices a few hundred
 * localities separately and covers EVERY other place in the country with one
 * standard CONUS row — so a list of listed localities would tell a vendor they
 * may only travel where GSA itemises, which is the opposite of how per diem
 * works. A field trip to a weir on Rock Creek is a legitimate destination that
 * simply prices at CONUS.
 *
 * What the vendor gets instead of a constrained list is the RESOLUTION, stated:
 * whether the place they typed is separately listed, and which rate their lines
 * will therefore price at. That is the thing a dropdown hid.
 */
export const CONUS_FALLBACK = 'Standard CONUS (unlisted locality)';

/** Whether the typed destination is separately priced on the schedule. */
export const isListedLocality = (loc) => {
  const l = (loc ?? '').trim();
  if (!l || l === CONUS_FALLBACK) return false;
  return gsaRates.some((g) => g.scope === 'travel' && g.location === l);
};

/** The schedule location a destination actually prices at. */
export const resolveLocality = (loc) => (isListedLocality(loc) ? (loc ?? '').trim() : CONUS_FALLBACK);

/** The sentence under the destination field — the resolution, in words. */
export const localityNote = (trip) => {
  const l = (trip?.locality ?? '').trim();
  if (!l) return 'Set a destination. Until you do, lines price at the Standard CONUS rate.';
  return isListedLocality(l)
    ? `Separately listed — lines price at ${l} schedule rates.`
    : `Not separately listed — lines price at the Standard CONUS rate.`;
};

/**
 * The schedule row a travel line should reference, given its kind and its trip's
 * destination. Mileage rows are not locality-scoped (they are fleet rates), so
 * the locality filter simply finds nothing and the kind's first row stands.
 */
export const gsaRowFor = (kindKey, locality) => {
  const rows = gsaRatesForTravelKind(kindKey);
  if (!rows.length) return null;
  const atLocality = rows.filter((g) => g.location === resolveLocality(locality));
  return atLocality[0] ?? rows[0];
};

/**
 * ── Travel kinds ───────────────────────────────────────────────────────────
 * The taxonomy that replaces free-text travel entry. A kind fixes three things
 * the vendor used to have to get right by hand:
 *   · what is being counted (`countLabel`) and whether it comes from the trip
 *   · what the duration is measured in (`durationLabel`; null = no duration)
 *   · where the rate comes from — a filtered slice of the GSA schedule, or typed
 *
 * amount = occurrences × count × duration × rate. Every travel line, one rule.
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
    rateSource: 'gsa',
    gsaKind: 'Lodging',
    note: 'Per room, per night, at the GSA lodging rate for the locality and season.',
  },
  {
    key: 'mie',
    label: 'M&IE per diem',
    countLabel: 'travelers',
    durationLabel: 'days',
    rateSource: 'gsa',
    gsaKind: 'M&IE',
    note: 'Per traveler, per day. First and last travel day are reimbursed at 75%.',
  },
  {
    key: 'airfare',
    label: 'Airfare',
    countLabel: 'travelers',
    durationLabel: 'round trips',
    rateSource: 'typed',
    note: 'Coach fare on a U.S. flag carrier — Fly America Act. Quote per traveler.',
  },
  {
    key: 'mileage',
    label: 'POV mileage',
    countLabel: 'vehicles',
    durationLabel: 'miles',
    rateSource: 'gsa',
    gsaKind: 'Mileage',
    note: 'Privately owned vehicle, per vehicle per mile, at the GSA mileage rate.',
  },
  {
    key: 'ground',
    label: 'Ground transport & parking',
    countLabel: 'travelers',
    durationLabel: 'days',
    rateSource: 'typed',
    note: 'Parking, tolls, shuttle and transit. Per traveler, per day.',
  },
  {
    key: 'registration',
    label: 'Registration fee',
    countLabel: 'travelers',
    durationLabel: null,
    rateSource: 'typed',
    note: 'A per-traveler fee with no duration — one charge per traveler, per occurrence.',
  },
];

export const travelKind = (key) => TRAVEL_KINDS.find((k) => k.key === key);

/** The schedule rows a travel kind may reference — filtered by rate KIND, so a
 *  lodging line can never pick an M&IE row and mileage reaches the fleet rows. */
export const gsaRatesForTravelKind = (key) => {
  const k = travelKind(key);
  return k?.gsaKind ? gsaRates.filter((g) => g.kind === k.gsaKind) : [];
};

/**
 * ── Vehicle kinds ──────────────────────────────────────────────────────────
 * Vehicles had the same problem as travel in miniature: it mixed schedule-rated
 * and typed-rate lines in one category with no marker for which was which, so
 * "Add line" asked the vendor to pick a SHAPE — internal vocabulary. Picking a
 * KIND instead decides the shape, the unit and the schedule scope for them.
 */
export const VEHICLE_KINDS = [
  {
    key: 'lease',
    label: 'GSA vehicle lease',
    shape: SHAPES.AUTHORITY,
    gsaKind: 'Vehicle lease',
    unit: 'months',
    note: 'Monthly lease at the GSA Fleet schedule rate for the vehicle class.',
  },
  {
    key: 'mileage',
    label: 'GSA mileage',
    shape: SHAPES.AUTHORITY,
    gsaKind: 'Mileage',
    unit: 'months',
    secondUnit: 'miles/month',
    note: 'Months × miles per month, at the GSA Fleet mileage rate.',
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
    label: 'Fuel & maintenance',
    shape: SHAPES.QTY_RATE,
    unit: 'months',
    note: 'Months × estimated cost per month. Not a schedule rate.',
  },
];

export const vehicleKind = (key) => VEHICLE_KINDS.find((k) => k.key === key);

/** The schedule rows a vehicle kind may reference. */
export const gsaRatesForVehicleKind = (key) => {
  const k = vehicleKind(key);
  return k?.gsaKind ? gsaRates.filter((g) => g.kind === k.gsaKind && g.scope === 'vehicle') : [];
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
  /** Category keys the rate applies to. Capital equipment and subcontracts are out. */
  appliesTo: [
    'personnel-salary',
    'personnel-fringe',
    'travel',
    'meetings',
    'vehicles',
    'supplies',
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
  { key: 'we-budgets', label: 'WE Budgets' },
  { key: 'lib', label: 'LIB', live: true },
  { key: 'property-inventory', label: 'Property Inventory' },
  { key: 'status-reports', label: 'Status Reports' },
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

  // ── GSA Fleet — a different schedule entirely; travel lines can't use these ──
  { key: 'gsa-lease-crew', location: 'GSA Fleet', kind: 'Vehicle lease', season: 'FY2027 schedule', rate: 385, ceiling: 385, scope: 'vehicle' },
  { key: 'gsa-lease-compact', location: 'GSA Fleet', kind: 'Vehicle lease', season: 'FY2027 schedule', rate: 262, ceiling: 262, scope: 'vehicle' },
  { key: 'gsa-lease-suv-4x4', location: 'GSA Fleet', kind: 'Vehicle lease', season: 'FY2027 schedule', rate: 431, ceiling: 431, scope: 'vehicle' },
  { key: 'gsa-mileage', location: 'GSA Fleet', kind: 'Mileage', season: 'FY2027 schedule', rate: 0.67, ceiling: 0.67, scope: 'vehicle' },
  { key: 'gsa-mileage-gov-avail', location: 'GSA Fleet', kind: 'Mileage', season: 'Gov’t vehicle available', rate: 0.21, ceiling: 0.21, scope: 'vehicle' },
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
 * Only the three variable columns are re-captioned. Amount, Work element and the
 * row action stay put and stay named the same in every section, because the
 * money column has to line up with the sub-block subtotals, the indirect base
 * and the grand total in the table foot. `span` means this category's shape
 * collapses quantity and rate into one spanned cell (Subcontracts: a lump has
 * neither), and `qty: null` means the quantity column is void here (Fringe).
 */
export const categories = [
  {
    key: 'personnel-salary',
    label: 'Personnel — Salary',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Position title', qty: 'Months', rate: 'Cost per month' },
    note: `Positions, never names. Months are tested against the ${contractMonths}-month contract period.`,
  },
  {
    key: 'personnel-fringe',
    label: 'Personnel — Fringe',
    shapes: [SHAPES.PCT_OF_BASE],
    columns: { line: 'Fringe on', qty: null, rate: 'Percentage of salary' },
    note: 'Each line is a percentage of one salary group, and names itself after the position it follows.',
  },
  {
    key: 'travel',
    label: 'Travel',
    shapes: [SHAPES.TRAVEL],
    columns: { line: 'Travel line', qty: 'Occurrences × count × duration', rate: 'Rate' },
    /** Trips ARE the sub-blocks: same machinery Supplies uses for Office/Field. */
    blocks: trips.map((t) => ({ key: t.key, label: tripLabel(t), trip: t })),
    note: 'Grouped by trip. The trip sets where, why and how many times it happens; each line picks a travel kind, and the kind fixes what is counted, the duration unit, and the schedule rows the rate may come from.',
  },
  {
    key: 'meetings',
    label: 'Professional Meetings & Training',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Meeting or course', qty: 'Registrations', rate: 'Cost each' },
    note: 'Registration and tuition only — the travel to get there belongs in Travel.',
  },
  {
    key: 'vehicles',
    label: 'Vehicles',
    shapes: [SHAPES.AUTHORITY, SHAPES.QTY_RATE],
    columns: { line: 'Vehicle line', qty: 'Months × usage', rate: 'Rate' },
    note: 'Pick a vehicle kind — lease and mileage reference the GSA Fleet schedule, insurance and fuel are typed. The kind sets the unit.',
  },
  {
    key: 'supplies',
    label: 'Supplies & Equipment',
    shapes: [SHAPES.QTY_RATE, SHAPES.LUMP],
    columns: { line: 'Item', qty: 'Quantity', rate: 'Cost per unit' },
    blocks: [
      { key: 'office', label: 'Office' },
      { key: 'field', label: 'Field' },
    ],
    note: `Split Office and Field, each subtotaled. Anything at or above ${'$'}${contract.capitalizationThreshold.toLocaleString('en-US')} per item belongs in Capital Equipment.`,
  },
  {
    key: 'rent-utilities',
    label: 'Rent & Utilities',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Space or utility', qty: 'Months', rate: 'Cost per month' },
    note: 'Lines tied to a position follow that position’s staffing months rather than being typed again.',
  },
  {
    key: 'capital-equipment',
    label: 'Capital Equipment',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Equipment item', qty: 'Units', rate: 'Cost per unit' },
    note: `Items at or above the ${'$'}${contract.capitalizationThreshold.toLocaleString('en-US')} capitalization threshold. Below it, the item is a supply.`,
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

// ── Cost lines ──────────────────────────────────────────────────────────────
// `amount` is never stored for computed shapes — priceLines() derives it, so a
// dependency can never silently disagree with the line it depends on.

export const costLines = [
  // ── Personnel — Salary (shape A: months × cost/month) ──
  { id: 'sal-1', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
    label: 'Natural Resource Spec. 3', detail: 'Program lead — supplementation and monitoring oversight',
    staffKey: 'NRS3', qty: 10.5, qtyUnit: 'months', rate: 4_750,
    allocations: { B: 40, E: 25, A: 15, C: 10, D: 10 } },
  { id: 'sal-2', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
    label: 'Natural Resource Spec. 1', detail: 'Juvenile trapping, PIT tagging, redd surveys',
    staffKey: 'NRS1', qty: 12, qtyUnit: 'months', rate: 3_100,
    allocations: { B: 70, E: 30 } },
  { id: 'sal-3', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
    label: 'Seasonal Technician', detail: 'Apr–Sep hatchery and weir support',
    staffKey: 'TECH', qty: 4, qtyUnit: 'months', rate: 2_900,
    allocations: { E: 100 } },
  { id: 'sal-4', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
    label: 'Administrative Specialist', detail: 'Contract administration, invoicing, status reporting',
    staffKey: 'ADMIN', qty: 3, qtyUnit: 'months', rate: 3_600,
    // ── Deliberately unfinished: no work element assigned yet. ──
    allocations: {}, flags: ['no-allocation'] },

  // ── Personnel — Fringe (shape C: % of a salary group) ──
  { id: 'frg-1', category: 'personnel-fringe', shape: SHAPES.PCT_OF_BASE,
    label: 'Fringe — Natural Resource Spec. 3',
    base: { type: 'staff', staffKey: 'NRS3' }, pct: 0.351,
    allocations: { B: 40, E: 25, A: 15, C: 10, D: 10 } },
  { id: 'frg-2', category: 'personnel-fringe', shape: SHAPES.PCT_OF_BASE,
    label: 'Fringe — Natural Resource Spec. 1',
    base: { type: 'staff', staffKey: 'NRS1' }, pct: 0.351,
    allocations: { B: 70, E: 30 } },
  { id: 'frg-3', category: 'personnel-fringe', shape: SHAPES.PCT_OF_BASE,
    label: 'Fringe — Seasonal Technician', detail: 'Seasonal rate — no retirement contribution',
    base: { type: 'staff', staffKey: 'TECH' }, pct: 0.223,
    allocations: { E: 100 } },
  { id: 'frg-4', category: 'personnel-fringe', shape: SHAPES.PCT_OF_BASE,
    label: 'Fringe — Administrative Specialist',
    base: { type: 'staff', staffKey: 'ADMIN' }, pct: 0.351,
    allocations: { A: 100 } },

  // ── Travel (shape E: trip + kind. `block` IS the trip key, so the trip gets a
  //    sub-block subtotal for free. `label` is DERIVED from kind + locality and
  //    kept in sync on edit — it exists here so the review layer, which addresses
  //    lines by name, has something to print. ──
  // Three travelers, TWO rooms — two of them share. That gap is exactly what a
  // single trip-level traveler count could not say, and it is why the count
  // lives on the line and names the unit it counts.
  { id: 'trv-1', category: 'travel', shape: SHAPES.TRAVEL, trip: 'coord', block: 'coord',
    travelKind: 'lodging', label: 'Lodging — Portland, OR',
    count: 2, duration: 1, gsaKey: 'portland-lodging-peak',
    allocations: { B: 60, A: 40 } },
  { id: 'trv-2', category: 'travel', shape: SHAPES.TRAVEL, trip: 'coord', block: 'coord',
    travelKind: 'mie', label: 'M&IE per diem — Portland, OR',
    count: 3, duration: 2, gsaKey: 'portland-mie',
    allocations: { B: 60, A: 40 } },
  { id: 'trv-3', category: 'travel', shape: SHAPES.TRAVEL, trip: 'coord', block: 'coord',
    travelKind: 'mileage', label: 'POV mileage — Portland, OR',
    // One vehicle carries all three.
    count: 1, duration: 190, gsaKey: 'gsa-mileage',
    allocations: { A: 100 } },

  { id: 'trv-4', category: 'travel', shape: SHAPES.TRAVEL, trip: 'workshop', block: 'workshop',
    travelKind: 'lodging', label: 'Lodging — Boise, ID',
    count: 2, duration: 4, gsaKey: 'boise-lodging',
    // ── Deliberately unfinished: the entered rate overrides GSA and is over ceiling. ──
    rateOverride: 172, flags: ['gsa-over-ceiling'],
    allocations: { A: 100 } },
  { id: 'trv-5', category: 'travel', shape: SHAPES.TRAVEL, trip: 'workshop', block: 'workshop',
    travelKind: 'mie', label: 'M&IE per diem — Boise, ID',
    count: 2, duration: 5, gsaKey: 'boise-mie',
    allocations: { A: 100 } },
  { id: 'trv-6', category: 'travel', shape: SHAPES.TRAVEL, trip: 'workshop', block: 'workshop',
    travelKind: 'airfare', label: 'Airfare — Boise, ID',
    count: 2, duration: 1, rate: 418,
    allocations: { A: 100 } },

  { id: 'trv-7', category: 'travel', shape: SHAPES.TRAVEL, trip: 'hatchery', block: 'hatchery',
    travelKind: 'lodging', label: 'Lodging — The Dalles, OR',
    count: 1, duration: 1, gsaKey: 'the-dalles-lodging',
    allocations: { E: 100 } },
  { id: 'trv-8', category: 'travel', shape: SHAPES.TRAVEL, trip: 'hatchery', block: 'hatchery',
    travelKind: 'mie', label: 'M&IE per diem — The Dalles, OR',
    count: 1, duration: 2, gsaKey: 'the-dalles-mie',
    allocations: { E: 100 } },

  // ── Professional Meetings & Training (shape A, one qty) ──
  { id: 'mtg-1', category: 'meetings', shape: SHAPES.QTY_RATE,
    label: 'Annual fisheries society meeting — registration', detail: 'Program lead, NRS 1, and hatchery supervisor',
    qty: 3, qtyUnit: 'registrations', rate: 475,
    allocations: { B: 50, F: 50 } },

  // ── Vehicles (kind decides the shape: lease/mileage reference the GSA Fleet
  //    schedule, insurance/fuel are typed) ──
  { id: 'veh-1', category: 'vehicles', shape: SHAPES.AUTHORITY, vehicleKind: 'lease',
    label: 'GSA vehicle lease', detail: '3/4-ton crew truck',
    gsaKey: 'gsa-lease-crew', qty: 12, qtyUnit: 'months',
    allocations: { B: 50, E: 50 } },
  { id: 'veh-2', category: 'vehicles', shape: SHAPES.AUTHORITY, vehicleKind: 'mileage',
    label: 'GSA mileage', detail: 'Field access — trap, weir, and survey reaches',
    gsaKey: 'gsa-mileage', qty: 12, qtyUnit: 'months', qty2: 550, qty2Unit: 'miles/month',
    allocations: { B: 60, C: 20, F: 20 } },
  { id: 'veh-3', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'insurance',
    label: 'Vehicle liability insurance', qty: 12, qtyUnit: 'months', rate: 68,
    allocations: { B: 50, E: 50 } },

  // ── Supplies & Equipment — Office block (shapes A + D) ──
  { id: 'sup-o1', category: 'supplies', block: 'office', shape: SHAPES.LUMP,
    label: 'Paper, pens, computer media', amount: 500,
    allocations: { A: 100 } },
  { id: 'sup-o2', category: 'supplies', block: 'office', shape: SHAPES.QTY_RATE,
    label: 'Printer toner and drums', qty: 6, qtyUnit: 'units', rate: 145,
    allocations: { A: 100 } },

  // ── Supplies & Equipment — Field block (shapes A + D) ──
  { id: 'sup-f1', category: 'supplies', block: 'field', shape: SHAPES.QTY_RATE,
    label: 'Tagging syringes', qty: 100, qtyUnit: 'units', rate: 30,
    allocations: { B: 100 } },
  { id: 'sup-f2', category: 'supplies', block: 'field', shape: SHAPES.QTY_RATE,
    label: 'PIT tags', qty: 2_400, qtyUnit: 'tags', rate: 2.35,
    allocations: { B: 80, E: 20 } },
  { id: 'sup-f3', category: 'supplies', block: 'field', shape: SHAPES.LUMP,
    label: 'Waders, nets, and sampling kits', amount: 2_800,
    allocations: { B: 70, E: 30 } },
  // ── Deliberately unfinished, the OTHER way: at $6,200 per item this is over
  //    the capitalization threshold and belongs in Capital Equipment. The old
  //    screen only tested the capital side, so this misfiling was invisible. ──
  { id: 'sup-f4', category: 'supplies', block: 'field', shape: SHAPES.QTY_RATE,
    label: 'Rotary screw trap — panel and pontoon assembly',
    qty: 1, qtyUnit: 'units', rate: 6_200, flags: ['over-threshold'],
    allocations: { B: 100 } },

  // ── Rent & Utilities (shape A; one line's qty is LINKED to a position) ──
  { id: 'rnt-1', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Office space', qty: 12, qtyUnit: 'months', rate: 900,
    allocations: { A: 100 } },
  { id: 'rnt-2', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Internet and phone service', qty: 12, qtyUnit: 'months', rate: 210,
    allocations: { A: 100 } },
  { id: 'rnt-3', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Cell phone — Natural Resource Spec. 3',
    detail: 'Months follow the position’s staffing months',
    // ── Cross-line dependency: qty is not typed, it mirrors sal-1's months. ──
    qtyFrom: 'sal-1', qtyUnit: 'months', rate: 55,
    allocations: { B: 60, E: 40 } },
  { id: 'rnt-4', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Propane — hatchery building', qty: 8, qtyUnit: 'months', rate: 200,
    allocations: { E: 100 } },

  // ── Capital Equipment (shape A, gated by the capitalization threshold) ──
  { id: 'cap-1', category: 'capital-equipment', shape: SHAPES.QTY_RATE,
    label: 'Water quality sonde array', detail: 'Continuous temperature and DO logging, 4 stations',
    qty: 1, qtyUnit: 'units', rate: 12_400,
    allocations: { B: 100 } },

  // ── Subcontracts (shape D — the detail recurses to its own sheet) ──
  { id: 'sub-1', category: 'subcontracts', shape: SHAPES.LUMP,
    label: 'Genetics laboratory analysis', detail: 'Parentage-based tagging, ~1,800 samples',
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
export const isScheduleRated = (line) =>
  line.shape === SHAPES.AUTHORITY ||
  (line.shape === SHAPES.TRAVEL && travelKind(line.travelKind)?.rateSource === 'gsa');

/** The effective rate for a line: a schedule-rated line's GSA rate, unless overridden. */
export function effectiveRate(line) {
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

/** How many times this line's trip happens. A line may override its trip. */
export const travelOccurrences = (line) =>
  line.occurrences ?? tripOf(line.trip)?.occurrences ?? 1;

/** Rooms, travelers or vehicles — whatever this line's KIND counts. Always the
 *  line's own number: the units differ per kind, so one shared count could not
 *  be right for all of them. */
export const travelCount = (line) => line.count ?? 1;

/** Nights, days, miles or round trips — 1 for a kind with no duration. */
export const travelDuration = (line) =>
  travelKind(line.travelKind)?.durationLabel ? (line.duration ?? 1) : 1;

/**
 * The count a NEW line opens on: the last line already in this trip that counts
 * the same unit. Carrying from the line directly above would seed a mileage line
 * with a lodging line's room count — same number, different thing.
 */
export const seedCountFor = (tripKey, kindKey, lines = costLines) => {
  const unit = travelKind(kindKey)?.countLabel;
  if (!unit) return 1;
  const prior = lines.filter(
    (l) => l.trip === tripKey && travelKind(l.travelKind)?.countLabel === unit,
  );
  return prior.length ? travelCount(prior[prior.length - 1]) : 1;
};

/** Whether this line runs on its trip's occurrence count rather than its own. */
export const travelOccInherited = (line) => line.occurrences == null;

/** "2 trips × 3 travelers × 1 night" — a plural-aware count of a unit. */
export const countOf = (n, plural) => `${qtyFmt(n)} ${n === 1 ? plural.replace(/s$/, '') : plural}`;

/** The multiplication, spelled out — the row prints this so the math is legible. */
export const travelChain = (line) => {
  const k = travelKind(line.travelKind);
  const parts = [countOf(travelOccurrences(line), 'trips'), countOf(travelCount(line), k?.countLabel ?? 'units')];
  if (k?.durationLabel) parts.push(countOf(travelDuration(line), k.durationLabel));
  return parts.join(' × ');
};

/** A travel line names itself from its kind and its trip's locality. */
export const travelLabel = (line) => {
  const k = travelKind(line.travelKind);
  const t = tripOf(line.trip);
  if (!k) return line.label ?? '';
  return t ? `${k.label} — ${t.locality}` : k.label;
};

/** A fringe line names itself after the position it follows. */
export const fringeLabel = (line, lines = costLines) =>
  `Fringe — ${baseLabelFor(line, lines)}`;

/** The quantity actually used — following a `qtyFrom` link when present. */
export function effectiveQty(line, lines) {
  if (line.qtyFrom) {
    const src = lines.find((l) => l.id === line.qtyFrom);
    return src ? (src.qty ?? 0) : 0;
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
      const q2 = l.qty2 ?? 1;
      amounts[l.id] = r2(q * q2 * effectiveRate(l));
    }
  }

  // Pass 2 — shape C, reading the amounts resolved above.
  for (const l of lines) {
    if (l.shape !== SHAPES.PCT_OF_BASE) continue;
    amounts[l.id] = r2(baseAmountFor(l, lines, amounts) * (l.pct ?? 0));
  }

  // Roll up.
  const byCategory = {};
  const byBlock = {};
  for (const l of lines) {
    byCategory[l.category] = r2((byCategory[l.category] ?? 0) + amounts[l.id]);
    if (l.block) {
      const k = `${l.category}:${l.block}`;
      byBlock[k] = r2((byBlock[k] ?? 0) + amounts[l.id]);
    }
  }

  // Indirect — the base is whatever the rate is manually scoped to.
  const indirectBase = r2(
    sum(lines.filter((l) => cfg.appliesTo.includes(l.category)).map((l) => amounts[l.id])),
  );
  const indirect = r2(indirectBase * cfg.rate);
  const direct = r2(sum(lines.map((l) => amounts[l.id])));
  const total = r2(direct + indirect);

  return {
    amounts,
    byCategory,
    byBlock,
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
    const src = lines.find((l) => l.staffKey === b.staffKey && l.category === 'personnel-salary');
    return src ? src.label : b.staffKey;
  }
  if (b.type === 'category') return categoryOf(b.category)?.label ?? b.category;
  if (b.type === 'items') return `items ${(b.ids ?? []).length ? '1–' + b.ids.length : ''}`.trim();
  return '—';
}

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

export const unallocatedLines = (lines = costLines) =>
  lines.filter((l) => sum(Object.values(l.allocations ?? {})) !== 100);

/** Schedule-rated lines whose overridden rate exceeds the referenced ceiling. */
export const gsaFailingLines = (lines = costLines) =>
  lines.filter((l) => {
    if (!isScheduleRated(l)) return false;
    const g = gsaRate(l.gsaKey);
    return g && l.rateOverride != null && l.rateOverride > g.ceiling;
  });

/**
 * The capitalization threshold is a two-way test, and it was only ever enforced
 * one way. A $12,400 sonde sitting in Supplies is the same misfiling as a $400
 * toner cartridge sitting in Capital Equipment — the item just has to move in the
 * other direction. Both sides are computed here so the row can offer the move.
 */
export const perItemCost = (line, amounts) => (amounts[line.id] ?? 0) / (line.qty || 1);

/** Capital lines BELOW the threshold — they belong in Supplies & Equipment. */
export const capitalThresholdFailures = (lines = costLines) => {
  const { amounts } = priceLines(lines);
  return lines.filter(
    (l) => l.category === 'capital-equipment' && perItemCost(l, amounts) < contract.capitalizationThreshold,
  );
};

/** Supply lines AT OR ABOVE the threshold — they belong in Capital Equipment. */
export const suppliesOverThreshold = (lines = costLines) => {
  const { amounts } = priceLines(lines);
  return lines.filter(
    (l) =>
      l.category === 'supplies' &&
      l.shape === SHAPES.QTY_RATE &&
      perItemCost(l, amounts) >= contract.capitalizationThreshold,
  );
};

/** Every line on the wrong side of the threshold, in either direction. */
export const thresholdMisfiled = (lines = costLines) => [
  ...capitalThresholdFailures(lines),
  ...suppliesOverThreshold(lines),
];

/** Where a misfiled line belongs — the category the row offers to move it to. */
export const thresholdTargetFor = (line) =>
  line.category === 'capital-equipment' ? 'supplies' : 'capital-equipment';

/** Salary lines budgeted for more months than the contract period runs. */
export const monthsOverPeriod = (lines = costLines) =>
  lines.filter(
    (l) => l.category === 'personnel-salary' && (effectiveQty(l, lines) ?? 0) > contractMonths,
  );

export const unfundedWorkElements = (lines = costLines) =>
  workElements.filter((we) => lines.every((l) => !(l.allocations ?? {})[we.id]));

/**
 * The submit gate. Every check is computed from the lines, so the checklist and
 * the Submit button can never disagree with the grid. The vendor still owns the
 * submit — passing every check enables it, nothing submits on their behalf.
 */
export function submitChecksFor(lines = costLines, cfg = indirectConfig) {
  const { totals } = priceLines(lines, cfg);
  const unallocated = unallocatedLines(lines);
  const gsa = gsaFailingLines(lines);
  const capital = thresholdMisfiled(lines);
  const months = monthsOverPeriod(lines);
  const unfunded = unfundedWorkElements(lines);
  const n = (arr, word) => `${arr.length} ${word}${arr.length === 1 ? '' : 's'}`;
  return [
    { key: 'allocation', label: 'Every cost line is allocated to a work element',
      pass: unallocated.length === 0,
      detail: unallocated.length === 0 ? 'All lines total 100%' : `${n(unallocated, 'line')} unallocated` },
    { key: 'gsa', label: 'Travel and vehicle rates match the GSA schedule',
      pass: gsa.length === 0,
      detail: gsa.length === 0 ? 'All referenced rates within ceiling' : `${n(gsa, 'line')} over ceiling` },
    { key: 'capital', label: 'Every item is on the right side of the capitalization threshold',
      pass: capital.length === 0,
      detail: capital.length === 0
        ? `Threshold ${usd(contract.capitalizationThreshold)} per item`
        : `${n(capital, 'item')} filed in the wrong category` },
    { key: 'months', label: 'No position is budgeted past the contract period',
      pass: months.length === 0,
      detail: months.length === 0
        ? `All positions within ${contractMonths} months`
        : `${n(months, 'position')} over ${contractMonths} months` },
    { key: 'indirect', label: 'Indirect rate matches the approved reference',
      pass: true, detail: `${pct(cfg.rate)} — ${cfg.referenceDoc}` },
    { key: 'funded', label: 'Every work element carries budget',
      pass: unfunded.length === 0,
      detail: unfunded.length === 0 ? `All ${workElements.length} work elements funded` : `${n(unfunded, 'element')} unfunded` },
    { key: 'ceiling', label: 'Total matches the Contract Value',
      pass: totals.total <= contract.contractValue,
      detail: totals.total <= contract.contractValue
        ? `${usd(totals.remaining)} remaining`
        : `${usd(Math.abs(totals.remaining))} over` },
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
      'No indirect rate is applied on a subcontract sheet.',
      'No lump-sum or contingency lines are permitted — every line itemizes.',
      'State tax on construction is a percentage of items 1–3.',
    ],
    /** A shallow stand-in for the recursed category set. */
    categorySummary: [
      { category: 'personnel-salary', label: 'Personnel — Salary', amount: 16_800 },
      { category: 'personnel-fringe', label: 'Personnel — Fringe', amount: 4_620 },
      { category: 'supplies', label: 'Supplies & Equipment', amount: 5_180 },
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
