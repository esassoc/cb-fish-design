// Vendor Line Item Budget (LIB) entry, v1 scope — mock data + pricing engine for
// /lib-mvp.
//
// A FORK of src/data/lib-entry.mjs (the long-term exploration behind /lib-entry),
// cut down to what docs/lib-mvp-scope.md commits to for the production deadline.
// The two modules share no state: /lib-entry keeps the full model, and nothing
// here imports from it.
//
// INVENTED, NOT DERIVED. The project number, project title, contract/action
// numbers, sponsor organization, contract value, indirect rates, vehicle rates,
// and every dollar figure below are fictional, composed for this prototype. Only
// the Columbia Basin place names come from the real world — the repo's mock-data
// convention for domain credibility.
//
// PERSONNEL RULE: titles only, never names. A LIB carries positions, not people.
//
// ── The three line shapes ───────────────────────────────────────────────────
// Every cost line is one of three shapes, and the shape decides which cells the
// row exposes:
//
//   qty-rate     label, quantity (+ an optional second quantity), unit, cost per
//                unit. The vendor types the rate. Personnel, travel, vehicles,
//                supplies, meetings, rent and other direct costs all use it.
//   pct-of-base  a percentage of a base. Fringe ONLY, and GENERATED from the
//                salary lines rather than authored.
//   lump         label, one dollar amount, and a description of what it covers —
//                a lump with no description cannot be reviewed, so it is gated.
//
// Travel is a plain qty-rate line in v1: a travel KIND (what is counted, what the
// duration is measured in), a typed DESTINATION, count × duration × a typed rate.
// Trips, occurrences and published per-diem rates are v2 or cut.
//
// ── Cross-line dependencies ─────────────────────────────────────────────────
// Three, and `priceLines()` resolves them in order:
//   • fringe          one generated line per salary line, at the budget default
//                     (35.1%) unless the salary line overrides it
//   • linked qty      a line's quantity may FOLLOW one position line — one hop,
//                     never a chain (a cell phone runs for its position's months)
//   • indirect        one rate on the base its rate record names; under MTDC only
//                     the first $25,000 of each subcontract counts
// And one across budgets: a subcontract line's amount IS its child LIB's total.
//
// The screen is shown MID-BUILD and MID-REVIEW: one travel line has no destination
// yet (a submit gate holds it), and the COR has returned the budget with marks on
// it (see src/data/lib-mvp-review.mjs).
//
// ── Line data shape ─────────────────────────────────────────────────────────
//   { id, category, shape, label,
//     block?        sub-block key, in a category with `blocks` (Supplies only)
//     qty?, qtyUnit?, qty2?, qty2Unit?, rate?      qty-rate lines
//     amount?, desc?                               lump lines (desc is gated)
//     staff?, timeUnit?, fringePct?                Personnel — salary
//     travelKind?, destination?, purpose?          Travel
//     vehicleKind?, vehicleType?                   Vehicles
//     meetingKind? / otherKind?                    Meetings / Other direct costs
//     qtyFrom?, qtyDetached?                       linked quantity (one hop)
//     sheet?                                       Subcontracts → child LIB id
//     workElement?  RESERVED for v2 (nullable). Nothing in v1 reads or gates it. }

/** The three line shapes. `shape` on every cost line is one of these. */
export const SHAPES = {
  QTY_RATE: 'qty-rate',
  PCT_OF_BASE: 'pct-of-base',
  LUMP: 'lump',
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
  bpaCor: 'Marguerite Ozuna',
  contractManager: 'Devon Iwasaki',
};

/**
 * How many months the contract period runs. Every month-quantified line is
 * tested against this — a position budgeted for more months than the contract
 * exists is a real, common LIB error, and it is arithmetic the form can do
 * rather than a reviewer.
 */
export const contractMonths = (() => {
  const [sm, , sy] = contract.periodStart.split('/').map(Number);
  const [em, , ey] = contract.periodEnd.split('/').map(Number);
  return (ey - sy) * 12 + (em - sm) + 1;
})();

/**
 * Prototype event names. Each page is its own document, so these cannot collide
 * with /lib-entry's `cbf-lib:*` events — they are prefixed anyway so a grep for
 * one prototype never lands in the other's components.
 */
export const EVENTS = {
  totals: 'cbf-libmvp:totals',
  indirect: 'cbf-libmvp:indirect-config',
  focusLine: 'cbf-libmvp:focus-line',
  openSubcontract: 'cbf-libmvp:open-subcontract',
  review: 'cbf-libmvp:review',
};

export const isSalaryLine = (line) => line?.category === 'personnel-salary';

/**
 * ── Positions ───────────────────────────────────────────────────────────────
 * A position is ONE salary line: a typed title, a staff count, a time unit and
 * one rate. There is no global roster — the sponsor's org chart is theirs — so
 * typing the title on a salary line is what defines the position, and the line
 * id is its identity. Everything that refers to a position (its fringe line, a
 * phone line whose months follow it) refers to that id.
 *
 * One rate per position is the v1 cut: a fiscal-year crossover or a COLA is a
 * second position line with the same title, not a "rate step" on the first.
 * Personnel is also one block — the admin / technical split is not in v1.
 */

/** The position title carried on a salary line — what the vendor typed. */
export const titleOfLine = (line) => (line?.label ?? '').trim();

/** The positions this LIB defines, in order. Derived — the lines ARE the roster. */
export const rosterFor = (lines = costLines) =>
  lines.filter(isSalaryLine).map((l) => ({ key: l.id, lineId: l.id, title: titleOfLine(l) }));

export const positionOf = (id, lines = costLines) => rosterFor(lines).find((p) => p.key === id);
export const positionTitle = (id, lines = costLines) => positionOf(id, lines)?.title ?? '';

/** Salary lines with no position title yet — the first submit gate. */
export const untitledPositionLines = (lines = costLines) =>
  lines.filter((l) => isSalaryLine(l) && !titleOfLine(l));

/**
 * The time units a salary line may be quantified in. `months` converts the unit
 * to the axis the contract period is measured on, so an hourly line and a
 * monthly one are tested by the same rule.
 */
export const HOURS_PER_MONTH = 2080 / 12; // 173.33 — full-time hours in a month
/* Named rather than looked up, so the fallback below is a unit that provably exists. */
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

/**
 * How many people a salary line pays for — default 1. A NAMED multiplicand, so
 * three seasonal technicians are one line, and the period gate still reads time
 * PER PERSON: "12 months × 3 staff" passes where "36 months" would not.
 */
export const staffOf = (line) =>
  isSalaryLine(line) ? Math.max(1, Math.round(Number(line.staff) || 1)) : 1;

/**
 * ── Travel kinds ───────────────────────────────────────────────────────────
 * A plain dropdown over a fixed list. The kind fixes what is counted
 * (`countLabel`) and what the duration is measured in (`durationLabel`; null =
 * no duration) — so "3 persons × 10 days" stops being prose. The RATE is always
 * the vendor's: published per-diem and mileage lookups are v2.
 *
 * amount = count × duration × rate, the same rule as every qty-rate line. Every
 * travel line also names its DESTINATION as typed text, and the submit gate
 * holds a line without one.
 */
export const TRAVEL_KINDS = [
  { key: 'lodging', label: 'Lodging', countLabel: 'rooms', durationLabel: 'nights',
    note: 'Per room, per night. Two travelers sharing is one room.' },
  { key: 'mie', label: 'M&IE per diem', countLabel: 'travelers', durationLabel: 'days',
    note: 'Meals and incidentals, per traveler, per day.' },
  { key: 'airfare', label: 'Airfare', countLabel: 'travelers', durationLabel: null,
    note: 'Per traveler, round trip. Coach fare on a U.S. flag carrier, per the Fly America Act.' },
  { key: 'mileage', label: 'POV mileage', countLabel: 'vehicles', durationLabel: 'miles',
    note: 'Per vehicle, per mile, in a privately owned vehicle.' },
  { key: 'car-rental', label: 'Car rental', countLabel: 'vehicles', durationLabel: 'days',
    note: 'Per rental vehicle, per day. Fuel and parking for it are their own lines.' },
  { key: 'ground', label: 'Ground transport', countLabel: 'travelers', durationLabel: 'rides',
    note: 'Taxi, shuttle, rideshare and transit. Per traveler, per ride.' },
  { key: 'parking', label: 'Parking', countLabel: 'vehicles', durationLabel: 'days',
    note: 'Per vehicle, per day — airport, hotel or event parking, and tolls.' },
  { key: 'fuel', label: 'Rental car fuel', countLabel: 'vehicles', durationLabel: 'days',
    note: 'Fuel for a rental vehicle, per vehicle per day. Fuel for a leased or owned vehicle belongs in Vehicles.' },
  { key: 'registration', label: 'Registration fee', countLabel: 'travelers', durationLabel: null,
    note: 'Per traveler. A course or conference fee already in Professional meetings & training stays there.' },
  { key: 'other', label: 'Other travel cost', countLabel: 'units', durationLabel: null, vendorDefined: true,
    note: 'A travel cost no kind above describes. Say what it is — the COR sees it as vendor-defined.' },
];

export const travelKind = (key) => TRAVEL_KINDS.find((k) => k.key === key);

/** Where a travel line goes — typed text, never looked up. */
export const travelDestination = (line) => (line?.destination ?? '').trim();

/** A travel line names itself from its kind and where it goes. */
export const travelLabel = (line) => {
  const k = travelKind(line.travelKind);
  if (!k) return line.label ?? '';
  const name = k.vendorDefined ? ((line.desc ?? '').trim() || k.label) : k.label;
  const dest = travelDestination(line);
  return dest ? `${name} — ${dest}` : name;
};

/**
 * ── Vehicle types and kinds ─────────────────────────────────────────────────
 * The vehicle TYPE is picked off BPA's controlled list, not typed — a COR needs
 * it to confirm the class fits the job (a 15-passenger van for a two-person crew
 * is the question). In v1 the type does one more thing: it PREFILLS the GSA
 * Fleet monthly or per-mile rate as an editable default, from this static,
 * admin-maintained table. Nothing compares the typed rate against it afterwards
 * — the above-GSA flag is v2.
 *
 * MOCK DATA: the list's shape is real, the names are representative, and the
 * monthly and per-mile figures are invented.
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

/**
 * What kind of vehicle cost a line is. Every kind is qty-rate; the kind fixes the
 * unit(s), and `prefill` names which column of VEHICLE_TYPES seeds the rate
 * (null = the vendor's number from the start). `needsType` is what the submit
 * gate reads — every vehicle cost is about a vehicle, except a vendor-defined one.
 */
export const VEHICLE_KINDS = [
  { key: 'lease', label: 'GSA lease', unit: 'months', needsType: true, prefill: 'monthly',
    note: 'Per month. The GSA Fleet rate for the vehicle type fills in — change it if you pay something else.' },
  { key: 'mileage', label: 'GSA lease mileage', unit: 'months', secondUnit: 'miles/month', needsType: true, prefill: 'perMile',
    note: 'Months × miles per month. The GSA Fleet per-mile rate for the vehicle type fills in.' },
  { key: 'commercial-lease', label: 'Commercial lease (non-GSA)', unit: 'months', needsType: true, prefill: null,
    note: 'Per month, at a commercial lessor’s rate.' },
  { key: 'motor-pool', label: 'Motor pool', unit: 'months', needsType: true, prefill: null,
    note: 'Per month, at your organization’s or an agency’s motor-pool rate.' },
  { key: 'insurance', label: 'Liability insurance', unit: 'months', needsType: true, prefill: null,
    note: 'Months × premium per month.' },
  { key: 'fuel', label: 'Fuel', unit: 'months', needsType: true, prefill: null,
    note: 'Months × estimated fuel per month.' },
  { key: 'maintenance', label: 'Maintenance & repair', unit: 'months', needsType: true, prefill: null,
    note: 'Months × estimated maintenance and repair per month.' },
  { key: 'other', label: 'Other vehicle cost', unit: null, needsType: false, prefill: null, vendorDefined: true,
    note: 'A vehicle cost no kind above describes. Say what it is and name its unit — the COR sees it as vendor-defined.' },
];

export const vehicleKind = (key) => VEHICLE_KINDS.find((k) => k.key === key);

/** The GSA default rate a kind + type pair prefills, or null where there is none. */
export const vehicleDefaultRate = (kindKey, typeKey) => {
  const field = vehicleKind(kindKey)?.prefill;
  const type = vehicleType(typeKey);
  return field && type ? type[field] : null;
};

/** Whether a vehicle line still carries the default its kind and type prefill. */
export const vehicleRateIsDefault = (line) => {
  const d = vehicleDefaultRate(line?.vehicleKind, line?.vehicleType);
  return d != null && line.rate === d;
};

/**
 * Re-seed a vehicle line's rate after its kind or type changes. The default only
 * replaces a rate the vendor has not made their own: an empty rate, or the
 * default of the PREVIOUS kind/type pair. A typed number is never overwritten.
 * Mutates and returns the line.
 */
export const prefillVehicleRate = (line, prev = {}) => {
  const next = vehicleDefaultRate(line.vehicleKind, line.vehicleType);
  if (next == null) return line;
  const old = vehicleDefaultRate(prev.vehicleKind, prev.vehicleType);
  if (line.rate == null || line.rate === '' || (old != null && line.rate === old)) line.rate = next;
  return line;
};

/**
 * ── Indirect: ONE approved rate record, picked, not typed ───────────────────
 * CBFish keeps each organization's indirect rates under Data management →
 * Vendor indirect rates: a NICRA negotiated with a federal cognizant agency, a
 * provisional rate, or a de minimis rate agreed with the BPA Contracting
 * Officer. Each states its BASE, carries a status and its documentation, and the
 * CO — not the COR — approves it.
 *
 * v1 takes ONE of them per budget. The rate, its base, its reference document
 * and its dates come with the pick, read-only. Month-by-month coverage across
 * several rates is v2.
 *
 * MOCK DATA for the fictional sponsor. Statuses as CBFish defines them:
 *   active    approved, and today falls inside its effective dates
 *   approved  approved, effective start in the future
 *   pending   submitted to the CO, awaiting review — pickable, and noted
 *   draft     not submitted yet — not pickable
 *   expired   approved, effective end in the past — not pickable
 */
export const VENDOR_INDIRECT_RATES = [
  { id: 'vir-2025', vendorId: 'RCFC-0042', kind: 'nicra', label: 'NICRA 2025-09', rate: 0.2615, base: 'mtdc',
    start: '01/01/2025', end: '12/31/2025', status: 'expired', doc: 'NICRA 2025-09.pdf' },
  { id: 'vir-2026', vendorId: 'RCFC-0042', kind: 'nicra', label: 'NICRA 2026-14', rate: 0.2675, base: 'mtdc',
    start: '01/01/2026', end: '12/31/2026', status: 'active', doc: 'NICRA 2026-14.pdf', approvedOn: '03/11/2026' },
  { id: 'vir-2027', vendorId: 'RCFC-0042', kind: 'nicra', label: 'NICRA 2027-02', rate: 0.274, base: 'mtdc',
    start: '01/01/2027', end: '12/31/2027', status: 'pending', doc: 'NICRA 2027-02.pdf' },
  /* A rate on a different base, so the base-driven scope has something to show. */
  { id: 'vir-prov', vendorId: 'RCFC-0042', kind: 'provisional', label: 'Provisional rate FY2026', rate: 0.418, base: 'swf',
    start: '05/01/2026', end: '04/30/2027', status: 'approved', doc: 'Provisional rate letter, 04/08/2026' },
  { id: 'vir-dm', vendorId: 'RCFC-0042', kind: 'de-minimis', label: 'De minimis rate', rate: 0.1, base: 'mtdc',
    start: '05/01/2026', end: '', status: 'active', doc: 'CO agreement email, 02/02/2026' },
];

export const vendorRate = (id) => VENDOR_INDIRECT_RATES.find((r) => r.id === id);

export const RATE_STATUS = {
  active: { label: 'Active', variant: 'success', usable: true },
  approved: { label: 'Approved', variant: 'success', usable: true },
  pending: { label: 'Pending CO approval', variant: 'warning', usable: true },
  draft: { label: 'Draft', variant: 'secondary', usable: false },
  expired: { label: 'Expired', variant: 'secondary', usable: false },
};

/** The rate records a vendor may pick — usable statuses only. */
export const pickableRates = () => VENDOR_INDIRECT_RATES.filter((r) => RATE_STATUS[r.status]?.usable);

/**
 * The overhead block. What the LIB STORES is the pick (`rateId`). Everything
 * else is DERIVED from that record by `withResolvedIndirect` and written back
 * onto this object, so readers can take `cfg.rate` / `cfg.appliesTo` directly.
 * Mutable on purpose: it is budget state the indirect block edits.
 */
export const indirectConfig = {
  rateId: 'vir-2026',
  /* Derived — see resolveIndirect. Seeded here only so the shape is visible. */
  rate: 0,
  base: '',
  label: '',
  referenceDoc: '',
  status: '',
  effectiveStart: '',
  effectiveEnd: '',
  subawardCap: false,
  appliesTo: [],
};

/**
 * The categories, in LIB order. `shapes` lists which line shapes are legal in a
 * category; `blocks` splits it into separately-subtotaled sub-blocks (Supplies
 * only, in v1); `columns` captions the entry columns in the category's own
 * vocabulary — "Quantity" is months in Rent, nights in a lodging line and
 * nothing at all in Fringe, so one global header would have to be reinterpreted
 * per section.
 *
 *   `span`        the category collapses every entry column into one spanned cell
 *                 (Subcontracts: the amount comes from the child LIB).
 *   `qty: null`   the quantity column is void here (Fringe).
 *   `fringe`      a fourth entry column. Personnel — salary only; every other
 *                 category spans its rate cell across the gap.
 */
/**
 * ── Supplies: two classes, filed BY HAND ────────────────────────────────────
 * Supplies & equipment splits into Supplies (expensed) and Capital equipment.
 * The split moves real money — the indirect rate reaches expensed items and not
 * capital ones, and capital items go on the contract's Property Inventory — so
 * each class subtotals on its own. In v1 the vendor files each line by hand;
 * there is no threshold auto-filing. An expensed line over $5,000 is noted for
 * the COR (see `advisoriesFor`), because that is where a capital item hides.
 */
export const EQUIPMENT_CLASSES = [
  { key: 'expensed', label: 'Supplies',
    note: 'Consumables and items expensed when bought. The indirect rate reaches these.' },
  { key: 'capital', label: 'Capital equipment',
    note: 'Items you capitalize. They leave the indirect base and go on the contract’s Property Inventory.' },
];

export const equipmentClass = (key) => EQUIPMENT_CLASSES.find((c) => c.key === key);
export const equipmentClassLabel = (key) => equipmentClass(key)?.label ?? '';

/** The per-line size above which an EXPENSED supply line is noted for the COR. */
export const EXPENSED_ADVISORY_LIMIT = 5_000;

/**
 * ── Professional meetings & training ────────────────────────────────────────
 * One category, four kinds; each fixes the unit, the way a vehicle kind does. A
 * stipend is the one with two quantities: trainees × months.
 */
export const MEETING_KINDS = [
  { key: 'registration', label: 'Registration or tuition', unit: 'registrations',
    note: 'A meeting, conference or course — registrations × cost each. The travel to it stays in Travel.' },
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
 * Honorariums are the case CORs named — tribal contracts pay elders and cultural
 * advisors for their time, which is neither salary nor a subcontract. Anything
 * else is vendor-defined and says what it is.
 */
export const OTHER_KINDS = [
  { key: 'honorarium', label: 'Honorarium', unit: 'recipients',
    note: 'Pays for someone’s time or expertise — an elder, a cultural advisor, a guest speaker. Recipients × amount each.' },
  { key: 'other', label: 'Other direct cost', unit: null, vendorDefined: true,
    note: 'A direct cost no category describes. Say what it is and name its unit — the COR sees it as vendor-defined.' },
];
export const otherKind = (key) => OTHER_KINDS.find((k) => k.key === key);

/** The kind a line carries in whichever category names kinds — or null. */
export const kindOfLine = (line) =>
  line?.category === 'travel' ? travelKind(line.travelKind)
  : line?.category === 'vehicles' ? vehicleKind(line.vehicleKind)
  : line?.category === 'meetings' ? meetingKind(line.meetingKind)
  : line?.category === 'other' ? otherKind(line.otherKind)
  : null;

/** A line whose kind is the vendor's own "other" — badged on the row, never gated. */
export const isVendorDefined = (line) => !!kindOfLine(line)?.vendorDefined;

/* `icon` marks each section head — structure, never an item. Names in the hub
   registry render directly; the rest are Lucide glyphs passed through esa-icon's
   own `paths` fallback (`iconPaths`). */
export const categories = [
  {
    key: 'personnel-salary',
    icon: 'users',
    label: 'Personnel — salary',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Position title', qty: 'Time per person × staff', rate: 'Cost per unit', fringe: 'Fringe' },
    note: `Positions, never names. Each line is time per person × staff × one rate, checked against the ${contractMonths}-month period.`,
  },
  {
    key: 'personnel-fringe',
    icon: 'percent',
    iconPaths: '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    label: 'Personnel — fringe',
    shapes: [SHAPES.PCT_OF_BASE],
    /* `derived`: every line here is generated from a salary line, so the section
       has no add affordance and no editable cell. It stays a section because it
       is the object class the funder reads and the indirect base is scoped by. */
    derived: true,
    derivedFrom: 'personnel-salary',
    columns: { line: 'Fringe on', qty: null, rate: 'Rate and base' },
    note: 'One line per position, at the budget’s default rate unless the salary line sets its own. Change rates on the salary lines.',
  },
  {
    key: 'travel',
    icon: 'plane',
    iconPaths: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    label: 'Travel',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Travel line', qty: 'Count × duration', rate: 'Rate' },
    kinds: TRAVEL_KINDS,
    note: 'Pick a kind and say where it goes. Every travel cost needs a destination.',
  },
  {
    key: 'meetings',
    icon: 'graduation-cap',
    iconPaths: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    label: 'Professional meetings & training',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Meeting, course or cost', qty: 'Quantity', rate: 'Cost each' },
    kinds: MEETING_KINDS,
    note: 'Registrations, tuition, subscriptions and training stipends. The travel to a meeting stays in Travel.',
  },
  {
    key: 'vehicles',
    icon: 'truck',
    iconPaths: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    label: 'Vehicles',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Vehicle line', qty: 'Months × usage', rate: 'Rate' },
    kinds: VEHICLE_KINDS,
    note: 'Pick a kind and a vehicle type. GSA kinds fill in the GSA rate for the type — change it if you pay something else.',
  },
  {
    key: 'supplies',
    icon: 'package',
    iconPaths: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/>',
    label: 'Supplies & equipment',
    shapes: [SHAPES.QTY_RATE, SHAPES.LUMP],
    columns: { line: 'Item', qty: 'Quantity', rate: 'Cost per unit' },
    blocks: EQUIPMENT_CLASSES.map((c) => ({ key: c.key, label: c.label, note: c.note })),
    /* The rate does not reach the whole category, so it is scoped by BLOCK here.
       See `indirectScopes` — this is the only category that splits. */
    splitsIndirectScope: true,
    note: 'File each line as a supply or as capital equipment. Capital equipment is outside the indirect base.',
  },
  {
    key: 'rent-utilities',
    icon: 'home',
    label: 'Rent & utilities',
    shapes: [SHAPES.QTY_RATE],
    columns: { line: 'Space or utility', qty: 'Months', rate: 'Cost per month' },
    fixedUnit: 'months',
    note: 'A line can follow a position’s months — no need to type them again.',
  },
  {
    key: 'other',
    icon: 'file-text',
    label: 'Other direct costs',
    shapes: [SHAPES.QTY_RATE, SHAPES.LUMP],
    columns: { line: 'Cost', qty: 'Quantity', rate: 'Cost each' },
    kinds: OTHER_KINDS,
    note: 'Honorariums for elders, cultural advisors and speakers, and costs no other category holds.',
  },
  {
    key: 'subcontracts',
    icon: 'handshake',
    iconPaths: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.47 6.47a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
    label: 'Subcontracts',
    shapes: [SHAPES.LUMP],
    columns: { line: 'Subcontract', span: 'Itemized on its own LIB' },
    note: 'Each subcontract has its own LIB. Its total lands here.',
  },
];

export const categoryOf = (key) => categories.find((c) => c.key === key);

/** The unit a CATEGORY fixes for every line in it, or null where the line names it. */
export const categoryFixedUnit = (key) => categoryOf(key)?.fixedUnit ?? null;

/**
 * A line's units, from the one place that decides them: the time unit on a
 * salary line, the kind in a category that names kinds, the category's fixed
 * unit, else whatever the line stores. `{ unit, secondUnit }`, either may be null.
 */
export const unitsOf = (line) => {
  if (isSalaryLine(line)) return { unit: timeUnit(line).plural, secondUnit: null };
  if (line?.category === 'travel') {
    const k = travelKind(line.travelKind);
    return { unit: k?.countLabel ?? line.qtyUnit ?? null, secondUnit: k ? k.durationLabel : (line.qty2Unit ?? null) };
  }
  const k = kindOfLine(line);
  if (k && k.unit !== undefined) {
    return { unit: k.unit ?? line.qtyUnit ?? null, secondUnit: k.secondUnit ?? line.qty2Unit ?? null };
  }
  return { unit: categoryFixedUnit(line?.category) ?? line?.qtyUnit ?? null, secondUnit: line?.qty2Unit ?? null };
};

/**
 * ── What the indirect rate is scoped BY ─────────────────────────────────────
 * A category, except Supplies & equipment, which scopes by block (expensed vs
 * capital) — the scope key is then `category:block`, the key `priceLines`
 * subtotals blocks under. A flat list on purpose: "which lines were charged
 * overhead" has to stay answerable by one lookup.
 */
export const indirectScopes = categories.flatMap((c) =>
  c.splitsIndirectScope && c.blocks
    ? c.blocks.map((b) => ({ key: `${c.key}:${b.key}`, label: b.label, parent: c.key, parentLabel: c.label }))
    : [{ key: c.key, label: c.label }],
);

/**
 * ── The base decides the scope; the vendor does not ─────────────────────────
 * A rate record states its base, and the base is the scope — derived, never
 * edited in v1. MTDC (modified total direct costs) leaves out capital equipment
 * and rent, and counts only the first $25,000 of each subcontract. A de minimis
 * rate is by definition a share of MTDC.
 */
export const INDIRECT_BASES = {
  mtdc: { key: 'mtdc', label: 'Modified total direct costs', short: 'MTDC',
    scopes: ['personnel-salary', 'personnel-fringe', 'travel', 'meetings', 'vehicles', 'supplies:expensed', 'other', 'subcontracts'] },
  tdc: { key: 'tdc', label: 'Total direct costs', short: 'TDC', scopes: null },
  sw: { key: 'sw', label: 'Salaries and wages', short: 'S&W', scopes: ['personnel-salary'] },
  swf: { key: 'swf', label: 'Salaries, wages and fringe', short: 'S&W + fringe', scopes: ['personnel-salary', 'personnel-fringe'] },
};

/** The scope a base derives, in `indirectScopes` order. */
export const scopesForBase = (baseKey) => {
  const b = INDIRECT_BASES[baseKey];
  if (!b) return [];
  return indirectScopes.map((x) => x.key).filter((k) => !b.scopes || b.scopes.includes(k));
};

/** The first-$25,000-of-each-subaward cap. Applies only under an MTDC base. */
export const SUBAWARD_CAP = 25_000;

/** Everything the picked rate record resolves to. */
export function resolveIndirect(cfg = indirectConfig) {
  const pick = cfg.rateId ? vendorRate(cfg.rateId) ?? null : null;
  const base = pick?.base ?? '';
  return {
    pick,
    usable: !!pick && !!RATE_STATUS[pick.status]?.usable,
    rate: pick?.rate ?? 0,
    base,
    baseLabel: INDIRECT_BASES[base]?.short ?? '',
    label: pick?.label ?? '',
    referenceDoc: pick?.doc ?? '',
    status: pick?.status ?? '',
    statusLabel: RATE_STATUS[pick?.status]?.label ?? '',
    effectiveStart: pick?.start ?? '',
    effectiveEnd: pick?.end ?? '',
    subawardCap: base === 'mtdc',
    appliesTo: scopesForBase(base),
  };
}

/** Write a pick's derived facts onto a config — what the indirect block calls on every change. */
export const withResolvedIndirect = (cfg) => {
  const r = resolveIndirect(cfg);
  return Object.assign(cfg, {
    rate: r.rate, base: r.base, label: r.label, referenceDoc: r.referenceDoc, status: r.status,
    effectiveStart: r.effectiveStart, effectiveEnd: r.effectiveEnd,
    subawardCap: r.subawardCap, appliesTo: r.appliesTo,
  });
};

/** Pick a rate record (or clear the pick with null) and re-derive. */
export const pickIndirectRate = (cfg, id) => withResolvedIndirect(Object.assign(cfg, { rateId: id ?? null }));

/** The scope key one line falls under. */
export const indirectScopeOf = (line) =>
  categoryOf(line.category)?.splitsIndirectScope ? `${line.category}:${line.block ?? ''}` : line.category;

/** A scope's own subtotal, whichever level it sits at. */
export const scopeAmount = (priced, key) =>
  (key.includes(':') ? priced.byBlock[key] : priced.byCategory[key]) ?? 0;

/** Whether the indirect rate reaches a scope, per the LIVE config. */
export const indirectReaches = (scopeKey, cfg = indirectConfig) => (cfg.appliesTo ?? []).includes(scopeKey);

/**
 * ── The column arithmetic, in one place ────────────────────────────────────
 * Six columns: line · quantity · rate · fringe · Amount · action. A section that
 * does not render the fringe cell spans its rate cell over it, so Amount stays
 * in one column. Anything that spans the entry block spans ENTRY_COLUMNS.
 */
export const ENTRY_COLUMNS = 4;

/** Whether a line renders its own fringe cell, or spans the rate cell over it. */
export const hasFringeCell = (line) => isSalaryLine(line);

/** The colspan a line's rate cell carries. */
export const rateSpan = (line) => (hasFringeCell(line) ? 1 : 2);

/** The sub-block a line renders under — nothing, in a category with no blocks. */
export const blockOf = (line) => (categoryOf(line.category)?.blocks ? line.block : '') || '';

// ── Cost lines ──────────────────────────────────────────────────────────────
// `amount` is never stored for computed shapes — priceLines() derives it, so a
// dependency can never silently disagree with the line it depends on. A lump
// stores its amount; a subcontract line's amount is stamped from its child LIB.

export const costLines = [
  // ── Personnel — salary: time per person × staff × ONE rate ────────────────
  // `fringePct` is present only where a line OVERRIDES the budget default
  // (see `fringeDefaults`); a line without it follows the default.
  { id: 'sal-1', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
    label: 'Natural Resource Spec. 3', qty: 10.5, timeUnit: 'month', qtyUnit: 'months', rate: 4_750 },
  { id: 'sal-2', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
    label: 'Natural Resource Spec. 1', qty: 12, timeUnit: 'month', qtyUnit: 'months', rate: 3_150 },
  // Two seasonal technicians on ONE line with a staff count of two. The period
  // gate reads 350 hours PER PERSON. A seasonal position carries its own fringe
  // rate — the per-line override the fringe advisory reports.
  { id: 'sal-3', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
    label: 'Seasonal Technician', staff: 2, qty: 350, timeUnit: 'hour', qtyUnit: 'hours', rate: 16.6,
    fringePct: 0.223 },
  { id: 'sal-4', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
    label: 'Administrative Specialist', qty: 3, timeUnit: 'month', qtyUnit: 'months', rate: 3_600 },

  // ── Personnel — fringe ─────────────────────────────────────────────────────
  // Not authored here. Generated from the salary lines by syncFringeLines(),
  // which runs at the bottom of the pricing helpers and again after every edit.

  // ── Travel: kind + destination, count × duration × rate ───────────────────
  // `label` is DERIVED from kind + destination and kept in sync on edit — it
  // exists here so the review layer, which addresses lines by name, can print it.
  { id: 'trv-1', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'lodging',
    label: 'Lodging — Portland, OR', destination: 'Portland, OR',
    purpose: 'Semiannual basin coordination meetings with co-managers',
    qty: 2, qtyUnit: 'rooms', qty2: 2, qty2Unit: 'nights', rate: 196 },
  { id: 'trv-2', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'mie',
    label: 'M&IE per diem — Portland, OR', destination: 'Portland, OR',
    qty: 3, qtyUnit: 'travelers', qty2: 4, qty2Unit: 'days', rate: 79 },
  { id: 'trv-3', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'mileage',
    label: 'POV mileage — Portland, OR', destination: 'Portland, OR',
    qty: 1, qtyUnit: 'vehicles', qty2: 380, qty2Unit: 'miles', rate: 0.7 },
  // A quoted conference block rate, above the published Boise rate. Nothing in
  // v1 flags it — the COR's mark on it (see lib-mvp-review) is the check.
  { id: 'trv-4', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'lodging',
    label: 'Lodging — Boise, ID', destination: 'Boise, ID',
    purpose: 'Annual fisheries society meeting — presenting PIT tag results',
    qty: 2, qtyUnit: 'rooms', qty2: 4, qty2Unit: 'nights', rate: 189 },
  { id: 'trv-5', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'mie',
    label: 'M&IE per diem — Boise, ID', destination: 'Boise, ID',
    qty: 2, qtyUnit: 'travelers', qty2: 5, qty2Unit: 'days', rate: 68 },
  // No duration: the quote is the round trip.
  { id: 'trv-6', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'airfare',
    label: 'Airfare — Boise, ID', destination: 'Boise, ID',
    qty: 2, qtyUnit: 'travelers', rate: 418 },
  { id: 'trv-7', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'lodging',
    label: 'Lodging — The Dalles, OR', destination: 'The Dalles, OR',
    purpose: 'Broodstock monitoring at the hatchery, every other month',
    qty: 1, qtyUnit: 'rooms', qty2: 6, qty2Unit: 'nights', rate: 121 },
  { id: 'trv-8', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'mileage',
    label: 'POV mileage — Klickitat County, WA', destination: 'Klickitat County, WA',
    purpose: 'Routine runs to the weir and screw trap sites',
    qty: 1, qtyUnit: 'vehicles', qty2: 640, qty2Unit: 'miles', rate: 0.7 },
  // ── Deliberately unfinished: no destination yet. The submit gate holds it. ──
  { id: 'trv-9', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'parking',
    label: 'Parking', destination: '',
    purpose: 'Public hearing on the hatchery permit',
    qty: 1, qtyUnit: 'vehicles', qty2: 1, qty2Unit: 'days', rate: 34 },

  // ── Professional meetings & training (the KIND names the unit) ────────────
  { id: 'mtg-1', category: 'meetings', shape: SHAPES.QTY_RATE, meetingKind: 'registration',
    label: 'Annual fisheries society meeting — registration',
    qty: 2, qtyUnit: 'registrations', rate: 475 },
  { id: 'mtg-2', category: 'meetings', shape: SHAPES.QTY_RATE, meetingKind: 'subscription',
    label: 'Fisheries journal subscription', qty: 2, qtyUnit: 'subscriptions', rate: 120 },
  { id: 'mtg-3', category: 'meetings', shape: SHAPES.QTY_RATE, meetingKind: 'stipend',
    label: 'Tribal youth fisheries internship — living stipend',
    qty: 2, qtyUnit: 'trainees', qty2: 3, qty2Unit: 'months', rate: 1_150 },

  // ── Vehicles (kind fixes the unit; type prefills a GSA rate where one exists) ──
  // veh-1 and veh-2 still carry the GSA default their kind + type prefilled
  // (½-ton crew cab: $385/month, $0.28/mile). veh-3 is the vendor's own number.
  { id: 'veh-1', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'lease',
    vehicleType: 'pickup-half-crew-4x4', label: 'GSA lease', qty: 12, qtyUnit: 'months', rate: 385 },
  { id: 'veh-2', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'mileage',
    vehicleType: 'pickup-half-crew-4x4', label: 'GSA lease mileage',
    qty: 12, qtyUnit: 'months', qty2: 550, qty2Unit: 'miles/month', rate: 0.28 },
  { id: 'veh-3', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'motor-pool',
    vehicleType: 'stake-bed', label: 'Motor pool', qty: 3, qtyUnit: 'months', rate: 560 },
  { id: 'veh-4', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'insurance',
    vehicleType: 'pickup-half-crew-4x4', label: 'Liability insurance', qty: 12, qtyUnit: 'months', rate: 68 },
  { id: 'veh-5', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'fuel',
    vehicleType: 'pickup-half-crew-4x4', label: 'Fuel', qty: 12, qtyUnit: 'months', rate: 210 },
  { id: 'veh-6', category: 'vehicles', shape: SHAPES.QTY_RATE, vehicleKind: 'maintenance',
    vehicleType: 'pickup-half-crew-4x4', label: 'Maintenance & repair', qty: 12, qtyUnit: 'months', rate: 45 },

  // ── Supplies & equipment — `expensed` (qty-rate + lumps, filed by hand) ───
  { id: 'sup-1', category: 'supplies', block: 'expensed', shape: SHAPES.LUMP,
    label: 'Office supplies', desc: 'Paper, pens, and computer media for the field office', amount: 500 },
  { id: 'sup-2', category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE,
    label: 'Printer toner and drums', qty: 6, qtyUnit: 'units', rate: 145 },
  { id: 'sup-3', category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE,
    label: 'Tagging syringes', qty: 100, qtyUnit: 'units', rate: 30 },
  { id: 'sup-4', category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE,
    label: 'PIT tags', qty: 2_000, qtyUnit: 'tags', rate: 2.35 },
  // ── An expensed line over $5,000 — noted for the COR, not blocked ─────────
  //    One lump of field gear: it could be hiding an item the vendor's policy
  //    would capitalize, which is the question the advisory puts to the COR.
  { id: 'sup-5', category: 'supplies', block: 'expensed', shape: SHAPES.LUMP,
    label: 'Waders, nets, and sampling kits',
    desc: '8 pairs of breathable waders, 4 dip nets, and 6 water sampling kits for the field crew',
    amount: 5_400 },

  // ── Supplies & equipment — `capital`, filed by the vendor ─────────────────
  //    Outside the indirect base, and tracked on Property Inventory.
  { id: 'cap-1', category: 'supplies', block: 'capital', shape: SHAPES.QTY_RATE,
    label: 'Water quality sonde array', qty: 1, qtyUnit: 'units', rate: 9_800 },
  { id: 'cap-2', category: 'supplies', block: 'capital', shape: SHAPES.QTY_RATE,
    label: 'Rotary screw trap — panel and pontoon assembly', qty: 1, qtyUnit: 'units', rate: 6_200 },

  // ── Rent & utilities (months fixed; one line's months FOLLOW a position) ──
  { id: 'rnt-1', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Office space', qty: 12, qtyUnit: 'months', rate: 900 },
  { id: 'rnt-2', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Internet and phone service', qty: 12, qtyUnit: 'months', rate: 210 },
  // ── Linked quantity: not typed, it follows sal-1's 10.5 months. `qty` is
  //    what the line falls back to if the vendor detaches it. ──
  { id: 'rnt-3', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Cell phone — Natural Resource Spec. 3', qtyFrom: 'sal-1', qty: 12, qtyUnit: 'months', rate: 55 },
  { id: 'rnt-4', category: 'rent-utilities', shape: SHAPES.QTY_RATE,
    label: 'Propane — hatchery building', qty: 8, qtyUnit: 'months', rate: 200 },

  // ── Other direct costs — the honorarium CORs asked for on tribal contracts ──
  { id: 'oth-1', category: 'other', shape: SHAPES.QTY_RATE, otherKind: 'honorarium',
    label: 'Elder honoraria — cultural resource review', qty: 4, qtyUnit: 'recipients', rate: 250 },

  // ── Subcontracts (the amount is the child LIB's total — never typed) ──────
  { id: 'sub-1', category: 'subcontracts', shape: SHAPES.LUMP,
    label: 'Genetics laboratory analysis', amount: 0, sheet: 'sub-sheet-1' },
];

// ── Pricing engine ──────────────────────────────────────────────────────────
// Resolves in dependency order: linked quantities → qty-rate and lumps →
// fringe (which reads the salary amounts) → indirect (which reads the scope the
// base derives). Everything downstream reads the returned map.

const r2 = (n) => Math.round(n * 100) / 100;
const sum = (ns) => ns.reduce((a, b) => a + b, 0);

/** The rate a line prices at. Always the typed one in v1 — kept as a function so
 *  every reader asks one place. */
export const effectiveRate = (line) => Number(line?.rate) || 0;

/**
 * ── Linked quantities: ONE hop, to a position ───────────────────────────────
 * A line's quantity may follow one SALARY line (`qtyFrom`). Only salary lines can
 * be followed and a salary line can never follow anything, so a chain cannot be
 * built. Detaching keeps the link (`qtyDetached: true`) and freezes the current
 * value into `qty`, so "re-follow" is one gesture back.
 */
export const linkableSources = (line, lines = costLines) =>
  lines.filter((l) => isSalaryLine(l) && l.id !== line?.id);

export const canLinkQty = (line) =>
  !!line && line.shape === SHAPES.QTY_RATE && !isSalaryLine(line);

/** The position line this line's quantity follows right now, or null. */
export const qtySourceOf = (line, lines = costLines) => {
  if (!line?.qtyFrom || line.qtyDetached || !canLinkQty(line)) return null;
  const src = lines.find((l) => l.id === line.qtyFrom);
  return isSalaryLine(src) ? src : null;
};

export const isQtyLinked = (line, lines = costLines) => !!qtySourceOf(line, lines);

/** The quantity actually used — following a live `qtyFrom` link when present. */
export function effectiveQty(line, lines = costLines) {
  const src = qtySourceOf(line, lines);
  if (!src) return Number(line?.qty) || 0;
  /* A line measured in MONTHS follows the position's time converted to months —
     a phone following an hourly position would otherwise run for 700 months.
     Per person: a phone is one device whatever the staff count. */
  if (unitsOf(line).unit === 'months') return Math.round((Number(src.qty) || 0) * timeUnit(src).months * 10) / 10;
  return Number(src.qty) || 0;
}

/** Point a line's quantity at a position line. Mutates and returns the line. */
export const linkQtyTo = (line, salaryId) => {
  if (!canLinkQty(line)) return line;
  line.qtyFrom = salaryId;
  delete line.qtyDetached;
  return line;
};

/** Stop following — freeze the followed value into `qty`, keep the link for later. */
export const detachQty = (line, lines = costLines) => {
  if (!isQtyLinked(line, lines)) return line;
  line.qty = effectiveQty(line, lines);
  line.qtyDetached = true;
  return line;
};

/** Follow the position again. */
export const refollowQty = (line) => {
  delete line.qtyDetached;
  return line;
};

/** "2 rooms × 4 nights" — the row prints this so the math is legible. */
export const countOf = (n, plural) => `${qtyFmt(n)} ${n === 1 ? String(plural).replace(/s$/, '') : plural}`;

export const qtyChain = (line, lines = costLines) => {
  if (line.shape !== SHAPES.QTY_RATE) return '';
  const { unit, secondUnit } = unitsOf(line);
  const parts = [countOf(effectiveQty(line, lines), unit ?? 'units')];
  if (isSalaryLine(line) && staffOf(line) > 1) parts.push(countOf(staffOf(line), 'staff'));
  else if (secondUnit) parts.push(countOf(Number(line.qty2) || 0, secondUnit));
  return parts.join(' × ');
};

/** The second multiplicand: staff on a salary line, the second quantity where the
 *  unit has one, else 1. */
const secondQty = (l) => {
  if (isSalaryLine(l)) return staffOf(l);
  return unitsOf(l).secondUnit ? (Number(l.qty2) || 0) : 1;
};

/**
 * Price every line. Returns `{ amounts, byCategory, byBlock, baseByScope, totals }`.
 * `amounts` is id → dollars, already rounded to cents.
 */
export function priceLines(lines = costLines, cfg = indirectConfig) {
  const amounts = {};

  // Pass 1 — qty-rate and lumps. A subcontract line takes its child LIB's total.
  for (const l of lines) {
    if (l.shape === SHAPES.LUMP) {
      const sheet = l.category === 'subcontracts' && l.sheet ? subcontractSheets[l.sheet] : null;
      amounts[l.id] = r2(sheet ? subLineAmount(sheet) : (Number(l.amount) || 0));
    } else if (l.shape === SHAPES.QTY_RATE) {
      amounts[l.id] = r2(effectiveQty(l, lines) * secondQty(l) * effectiveRate(l));
    }
  }

  // Pass 2 — fringe, reading the salary amounts resolved above.
  for (const l of lines) {
    if (l.shape !== SHAPES.PCT_OF_BASE) continue;
    amounts[l.id] = r2(baseAmountFor(l, lines, amounts) * (l.pct ?? 0));
  }

  // Roll up — by category and by sub-block.
  const byCategory = {};
  const byBlock = {};
  for (const l of lines) {
    byCategory[l.category] = r2((byCategory[l.category] ?? 0) + amounts[l.id]);
    if (l.block) {
      const k = `${l.category}:${l.block}`;
      byBlock[k] = r2((byBlock[k] ?? 0) + amounts[l.id]);
    }
  }

  // Indirect — on the scope the rate's base derives. Under MTDC a subaward counts
  // only up to the cap: the first $25,000 of each subcontract.
  const baseAmountOfLine = (l) =>
    cfg.subawardCap && l.category === 'subcontracts' ? Math.min(amounts[l.id] ?? 0, SUBAWARD_CAP) : (amounts[l.id] ?? 0);
  const baseByScope = {};
  for (const l of lines) {
    const k = indirectScopeOf(l);
    baseByScope[k] = r2((baseByScope[k] ?? 0) + baseAmountOfLine(l));
  }
  const indirectBase = r2(
    sum(lines.filter((l) => (cfg.appliesTo ?? []).includes(indirectScopeOf(l))).map(baseAmountOfLine)),
  );
  const indirect = r2(indirectBase * (cfg.rate ?? 0));
  const direct = r2(sum(lines.map((l) => amounts[l.id] ?? 0)));
  const total = r2(direct + indirect);

  return {
    amounts,
    byCategory,
    byBlock,
    baseByScope,
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

/** Resolve a fringe line's base — its salary line's amount — to dollars. */
export function baseAmountFor(line, lines = costLines, amounts = null) {
  const a = amounts ?? priceLines(lines).amounts;
  const id = line.base?.lineId;
  return id ? r2(a[id] ?? 0) : 0;
}

/** A human label for what a fringe line is a percentage OF — its position. */
export function baseLabelFor(line, lines = costLines) {
  const id = line.base?.lineId;
  return (id && positionTitle(id, lines)) || 'Untitled position';
}

/**
 * ── Fringe is GENERATED, never authored ────────────────────────────────────
 * Fringe is an organization's rate applied to a position, not a budgeting
 * decision. So the RATE is a field on the salary row and the LINE is derived:
 * one per salary line, named by the position, priced off that line's own rate,
 * and destroyed with it. It is still a line, in its own subtotaled category,
 * because that is what the funder reads and the indirect base is scoped by.
 */

/** The organization's standard fringe rate — what a budget's default opens on. */
export const DEFAULT_FRINGE_PCT = 0.351;

/**
 * The budget's default fringe rate, set once. A salary line follows it unless it
 * carries its own `fringePct`; a line that does is an override, which the
 * fringe advisory reports. Mutable on purpose: the grid edits it.
 */
export const fringeDefaults = { pct: DEFAULT_FRINGE_PCT };

/** The fringe rate a salary line carries — its override, or the budget default. */
export const fringePctOf = (line) => line?.fringePct ?? fringeDefaults.pct;

/** Whether a salary line overrides the budget's default fringe rate. */
export const isFringeOverride = (line) => isSalaryLine(line) && line.fringePct != null;

/** A generated fringe line — the ones nothing may type into. */
export const isDerivedFringe = (line) => line?.category === 'personnel-fringe' && line?.base?.type === 'line';

/** Stable per salary line, so a repaint never has to rebuild a row that survived. */
export const fringeIdFor = (salaryId) => `frg-${salaryId}`;

/** A fringe line names itself after the position it follows. */
export const fringeLabel = (line, lines = costLines) => `Fringe — ${baseLabelFor(line, lines)}`;

/**
 * The dollars ONE salary line generates in fringe.
 * @param {Record<string, number>|null} [amounts] priced amounts, if the caller
 *   already has them.
 */
export const fringeOnLine = (line, lines = costLines, amounts = null) => {
  if (!isSalaryLine(line)) return 0;
  const a = amounts ?? priceLines(lines).amounts;
  return r2((a[line.id] ?? 0) * fringePctOf(line));
};

/** The fringe lines a set of salary lines generates — one each, in salary order. */
export function fringeLinesFor(lines = costLines) {
  return lines.filter(isSalaryLine).map((sal) => {
    const line = {
      id: fringeIdFor(sal.id),
      category: 'personnel-fringe',
      shape: SHAPES.PCT_OF_BASE,
      derived: true,
      base: { type: 'line', lineId: sal.id },
      pct: fringePctOf(sal),
    };
    line.label = fringeLabel(line, lines);
    return line;
  });
}

/**
 * Bring the derived fringe set in step with the salary set, IN PLACE — the grid
 * mutates one working array. Called on load and after every edit.
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

/* The seed budget's fringe set, generated once at load. */
syncFringeLines(costLines);

/**
 * Every line that moves when `id` moves — the lines whose quantity follows it,
 * plus its fringe line. The grid surfaces these so a vendor editing a salary
 * line can see what else just changed.
 */
export const dependentsOf = (id, lines = costLines) =>
  lines.filter((l) => l.id !== id && ((l.qtyFrom === id && !l.qtyDetached) || l.base?.lineId === id));

// ── Gates ───────────────────────────────────────────────────────────────────
// Two kinds of finding, kept apart on purpose:
//   · a GATE blocks submission — the budget is incomplete or does not add up
//     (`submitChecksFor`, exactly the nine in docs/lib-mvp-scope.md)
//   · an ADVISORY is noted for the COR and blocks nothing — the vendor made a
//     choice the COR should see (`advisoriesFor`, exactly three)

/**
 * A line's budgeted time in months, PER PERSON — a salary line through its time
 * unit, any other line through whichever of its quantities is measured in
 * months (rent, a vehicle lease, a stipend's months). 0 for a line with none.
 */
export const timeInMonths = (line, lines = costLines) => {
  if (isSalaryLine(line)) return r2(effectiveQty(line, lines) * timeUnit(line).months);
  if (line.shape !== SHAPES.QTY_RATE) return 0;
  const { unit, secondUnit } = unitsOf(line);
  if (unit === 'months') return r2(effectiveQty(line, lines));
  if (secondUnit === 'months') return r2(Number(line.qty2) || 0);
  return 0;
};

/** A line budgeted for more months than the contract period contains. */
export const periodProblem = (line, lines = costLines) =>
  timeInMonths(line, lines) > contractMonths ? 'over-period' : null;

/** Lines budgeted past the contract period. */
export const monthsOverPeriod = (lines = costLines) => lines.filter((l) => periodProblem(l, lines) != null);

/** Travel lines with no destination. */
export const unlocatedTravel = (lines = costLines) =>
  lines.filter((l) => l.category === 'travel' && !travelDestination(l));

/** Vehicle lines whose kind needs a vehicle type and has none. */
export const untypedVehicles = (lines = costLines) =>
  lines.filter((l) => l.category === 'vehicles' && (vehicleKind(l.vehicleKind)?.needsType ?? true) && !vehicleType(l.vehicleType));

/** Lump-sum lines that do not say what they cover. A subcontract line is
 *  described by its child LIB, so it is not one of them. */
export const undescribedLines = (lines = costLines) =>
  lines.filter((l) => l.shape === SHAPES.LUMP && l.category !== 'subcontracts' && !(l.desc ?? '').trim());

/** Why the indirect pick fails the gate, or null. A PENDING rate passes — it is
 *  submitted, the CO decides — and is noted instead. */
export const indirectProblem = (cfg = indirectConfig) => {
  const r = resolveIndirect(cfg);
  if (!r.pick) return 'No indirect rate selected';
  if (!r.usable) return `${r.label} is ${r.statusLabel.toLowerCase()} — select an approved or pending rate`;
  return null;
};

/** Expensed supply lines over the advisory limit. */
export const expensedOverLimit = (lines = costLines, amounts = null) => {
  const a = amounts ?? priceLines(lines, subIndirectCfg()).amounts;
  return lines.filter((l) => l.category === 'supplies' && l.block === 'expensed' && (a[l.id] ?? 0) > EXPENSED_ADVISORY_LIMIT);
};

const plural = (arr, word) => `${arr.length} ${word}${arr.length === 1 ? '' : 's'}`;

/** The open Required marks that fall on one budget's lines. `openRequired` is a
 *  list of flags ({ lineId, budget? }) — the review layer passes it in, so this
 *  module never imports the review. */
const openMarksOn = (openRequired, budgetId, lines) =>
  (openRequired ?? []).filter((f) => (f.budget ? f.budget === budgetId : lines.some((l) => l.id === f.lineId)));

/** Gates 1–5 and 8: the ones that read lines, so a child LIB runs them too. */
function lineGates(lines, budgetId, openRequired) {
  const untitled = untitledPositionLines(lines);
  const months = monthsOverPeriod(lines);
  const unlocated = unlocatedTravel(lines);
  const untyped = untypedVehicles(lines);
  const undescribed = undescribedLines(lines);
  const marks = openMarksOn(openRequired, budgetId, lines);
  return [
    { key: 'named', label: 'Every position is named', ids: untitled.map((l) => l.id),
      pass: untitled.length === 0,
      detail: untitled.length === 0 ? `${plural(rosterFor(lines), 'position')} on this budget` : `${plural(untitled, 'line')} with no position title` },
    { key: 'months', label: 'No line runs past the contract period', ids: months.map((l) => l.id),
      pass: months.length === 0,
      detail: months.length === 0 ? `Every line within ${contractMonths} months` : `${plural(months, 'line')} past ${contractMonths} months` },
    { key: 'located', label: 'Every travel line has a destination', ids: unlocated.map((l) => l.id),
      pass: unlocated.length === 0,
      detail: unlocated.length === 0 ? 'Every travel line says where it goes' : `${plural(unlocated, 'line')} with no destination` },
    { key: 'vehicle-type', label: 'Every vehicle line has a type', ids: untyped.map((l) => l.id),
      pass: untyped.length === 0,
      detail: untyped.length === 0 ? 'Every vehicle line is typed' : `${plural(untyped, 'line')} with no vehicle type` },
    { key: 'described', label: 'Every lump sum is described', ids: undescribed.map((l) => l.id),
      pass: undescribed.length === 0,
      detail: undescribed.length === 0 ? 'Every lump sum says what it covers' : `${plural(undescribed, 'lump sum')} with no description` },
    { key: 'marks', label: 'Every required change is addressed', ids: marks.map((f) => f.lineId),
      pass: marks.length === 0,
      detail: marks.length === 0 ? 'No open required changes' : `${plural(marks, 'required change')} still open` },
  ];
}

/** The child LIBs behind a budget's subcontract lines. */
export const childSheetsOf = (lines = costLines) =>
  lines.filter((l) => l.category === 'subcontracts' && l.sheet && subcontractSheets[l.sheet]).map((l) => subcontractSheets[l.sheet]);

/**
 * The submit gate — exactly nine checks, in the scope doc's order. Every check is
 * computed, so the checklist and the Submit button can never disagree with the
 * grid. Each entry is `{ key, label, pass, detail, ids }`; `ids` are the lines
 * (or, for `children`, the child sheet ids) it is about.
 *
 * @param {object} [opts]
 * @param {Array<{lineId: string, budget?: string}>} [opts.openRequired] open
 *   Required marks across the whole cycle — see lib-mvp-review `openRequiredFlags`.
 * @param {string} [opts.budgetId] which budget `lines` is — 'main' (the default)
 *   or a subcontract sheet id — so gate 8 counts that budget's own marks. The
 *   grid passes it when it renders a child LIB.
 */
export function submitChecksFor(lines = costLines, cfg = indirectConfig, opts = {}) {
  const { openRequired = [], budgetId = 'main' } = opts;
  const { totals } = priceLines(lines, cfg);
  const [named, months, located, vehicleTyped, described, marks] = lineGates(lines, budgetId, openRequired);
  const problem = indirectProblem(cfg);
  const failing = childSheetsOf(lines)
    .map((sh) => ({ sheet: sh, issues: subSheetIssues(sh, { openRequired }) }))
    .filter((x) => x.issues.length);
  return [
    named,
    months,
    located,
    vehicleTyped,
    described,
    { key: 'indirect', label: 'An indirect rate is selected', ids: [],
      pass: !problem,
      detail: problem ?? `${cfg.label} — ${pct(cfg.rate)} of ${INDIRECT_BASES[cfg.base]?.short ?? 'the base'}` },
    { key: 'ceiling', label: 'Total is within the Contract Value', ids: [],
      pass: totals.total <= contract.contractValue,
      detail: totals.total <= contract.contractValue ? `${usd(totals.remaining)} remaining` : `${usd(Math.abs(totals.remaining))} over` },
    marks,
    { key: 'children', label: 'Every subcontract LIB passes the same checks', ids: failing.map((x) => x.sheet.id),
      pass: failing.length === 0,
      detail: failing.length === 0
        ? `${plural(childSheetsOf(lines), 'subcontract LIB')} ready`
        : failing.map((x) => `${x.sheet.name || 'Unnamed subcontract'}: ${x.issues.length} to fix`).join(' · ') },
  ];
}

/**
 * The three advisories — noted for the COR, never blocking. Each carries the ids
 * it is about so a surface can link to the lines. Zero-count entries are kept: a
 * surface that hides them still needs to know the key exists.
 *
 * Fringe overrides and large expensed lines on the child LIBs count too — one
 * review cycle covers the parent and its children.
 */
export function advisoriesFor(lines = costLines, cfg = indirectConfig, { children = true } = {}) {
  const all = children ? [...lines, ...childSheetsOf(lines).flatMap((sh) => sh.lines)] : lines;
  const r = resolveIndirect(cfg);
  const pending = r.pick && r.status === 'pending' ? [r.pick] : [];
  const fringe = all.filter(isFringeOverride);
  const big = [
    ...expensedOverLimit(lines, priceLines(lines, cfg).amounts),
    ...(children ? childSheetsOf(lines).flatMap((sh) => expensedOverLimit(sh.lines)) : []),
  ];
  return [
    { key: 'rate-pending', label: 'Indirect rate pending CO approval', ids: pending.map((x) => x.id),
      detail: pending.map((x) => `${x.label}, ${pct(x.rate)}`).join(' · ') },
    { key: 'fringe', label: 'Fringe overridden', ids: fringe.map((l) => l.id),
      detail: `${plural(fringe, 'line')} off the ${pct(fringeDefaults.pct, 1)} default` },
    { key: 'expensed-over', label: `Expensed supply lines over ${usd(EXPENSED_ADVISORY_LIMIT)}`, ids: big.map((l) => l.id),
      detail: `${plural(big, 'line')} — could hold an item to capitalize` },
  ];
}

// ── Subcontract LIBs ────────────────────────────────────────────────────────
// A subcontract is ONE line on the contract's LIB with a child LIB behind it:
// the same form and categories, minus Subcontracts (one level deep) and minus
// the indirect block. The child's total rolls up into the parent line, which is
// never typed. Detail kept for v1: the subcontractor's name, the type, and an
// optional attached document. Cost share, preparer / basis and the bid table are
// cut.
//
// Sheet shape:
//   { id, parentLine, name, type: 'cr-tm' | 'ffp-estimate' | 'ffp-bid',
//     document: null | { name, size?, uploadedOn? }, lines: [cost lines] }

export const SUB_TYPES = [
  { value: 'cr-tm', label: 'Cost reimbursement or time & materials',
    needs: 'Itemize every cost on the subcontract’s LIB.' },
  { value: 'ffp-estimate', label: 'Firm fixed price, not bid yet',
    needs: 'Itemize the estimate on the subcontract’s LIB.' },
  { value: 'ffp-bid', label: 'Firm fixed price, already bid out',
    needs: 'Enter the winning bid on the subcontract’s LIB and attach a copy of it.' },
];
export const subTypeOf = (key) => SUB_TYPES.find((t) => t.value === key) ?? SUB_TYPES[0];

/** No indirect on a subcontract: an empty scope prices to $0. */
export const subIndirectCfg = () => ({
  rateId: null, rate: 0, base: '', label: '', referenceDoc: '', status: '',
  effectiveStart: '', effectiveEnd: '', subawardCap: false, appliesTo: [],
});

/** What the parent line carries: the child LIB's total (direct only). */
export const subLineAmount = (sheet, lines = sheet.lines) => priceLines(lines, subIndirectCfg()).totals.total;

/**
 * What stops a child LIB passing gate 9 — the same line gates the parent runs
 * (named, months, located, vehicle type, described, required marks), plus an
 * empty LIB, since a subcontract with nothing behind it is a $0 line. Strings,
 * in the order the child's page reads.
 */
export function subSheetIssues(sheet, { openRequired = [] } = {}) {
  const issues = [];
  const own = sheet.lines.filter((l) => l.shape !== SHAPES.PCT_OF_BASE);
  if (!own.length) issues.push('Enter the subcontract’s budget.');
  for (const g of lineGates(sheet.lines, sheet.id, openRequired)) if (!g.pass) issues.push(`${g.label}: ${g.detail}.`);
  return issues;
}

let subSeq = 0;
export const newSubId = (prefix = 'sub-sheet') => `${prefix}-${Date.now().toString(36)}-${(subSeq++).toString(36)}`;

/** A blank subcontract for a line added in the grid — its LIB starts empty. */
export const blankSubSheet = (id = 'new', parentLine = null) => ({
  id, parentLine, name: '', type: 'cr-tm', document: null, lines: [],
});

export const subcontractSheets = {
  'sub-sheet-1': {
    id: 'sub-sheet-1',
    parentLine: 'sub-1',
    name: 'Columbia River Genetics Lab',
    type: 'cr-tm',
    /* No quote attached yet — the COR's Required mark on sub-1 asks for it. */
    document: null,
    /* Reconciles to $28,000: salary 15,000 + fringe 4,500 (the lab's own 30%
       rate, an override) + kits 4,800 + ground transport 700 + cycler rental
       1,200 + a described lump for lab consumables 1,800. No indirect. */
    lines: [
      { id: 'ss1-sal-1', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
        label: 'Laboratory Technician', qty: 180, timeUnit: 'hour', qtyUnit: 'hours', rate: 50, fringePct: 0.3 },
      { id: 'ss1-sal-2', category: 'personnel-salary', shape: SHAPES.QTY_RATE,
        label: 'Geneticist', qty: 60, timeUnit: 'hour', qtyUnit: 'hours', rate: 100, fringePct: 0.3 },
      { id: 'ss1-trv-1', category: 'travel', shape: SHAPES.QTY_RATE, travelKind: 'ground',
        label: 'Ground transport — The Dalles, OR', destination: 'The Dalles, OR',
        purpose: 'Sample pickup at the hatchery', qty: 2, qtyUnit: 'travelers', qty2: 1, qty2Unit: 'rides', rate: 350 },
      { id: 'ss1-sup-1', category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE,
        label: 'SNP genotyping kits', qty: 12, qtyUnit: 'kits', rate: 400 },
      { id: 'ss1-oth-1', category: 'other', shape: SHAPES.QTY_RATE, otherKind: 'other',
        label: 'Thermal cycler rental', qty: 2, qtyUnit: 'months', rate: 600 },
      { id: 'ss1-oth-2', category: 'other', shape: SHAPES.LUMP,
        label: 'Lab consumables', desc: 'Pipette tips, plates, and reagents for 1,200 samples', amount: 1_800 },
    ],
  },
  /* The LIB a subcontract added in the grid opens on — empty. */
  new: blankSubSheet('new'),
};
Object.values(subcontractSheets).forEach((sh) => syncFringeLines(sh.lines));

/** The sheet behind a subcontract line — its own, or the blank one. */
export const subSheetFor = (line) => (line?.sheet && subcontractSheets[line.sheet]) || subcontractSheets.new;

/** Re-stamp every subcontract line's `amount` from its child LIB. */
export const syncSubcontractAmounts = (lines = costLines) => {
  lines.filter((l) => l.category === 'subcontracts' && l.sheet && subcontractSheets[l.sheet])
    .forEach((l) => { l.amount = subLineAmount(subcontractSheets[l.sheet]); });
  return lines;
};

// ── Budgets: the contract's LIB, or one of its subcontracts' ─────────────────
// The grid renders whichever budget it is handed. On the server that is a prop
// (module state is shared between pages there, so nothing is swapped). In the
// browser each page is its own module instance, so a subcontract page swaps
// this module's lines, sections and indirect setup for its own ONCE, up front,
// and every helper that reads them then reads the subcontract's.

/** A subcontract LIB has the contract's sections, less Subcontracts. */
export const subCategories = () => categories.filter((c) => c.key !== 'subcontracts');

/** What the active budget allows. Read by the grid's checks and add menus. */
export const budgetRules = { kind: 'contract', indirect: true, subcontracts: true, sheetId: null };

export function budgetFor(id) {
  const sheet = id && id !== 'main' ? subcontractSheets[id] : null;
  if (!sheet) return { id: 'main', kind: 'contract', lines: costLines, categories, cfg: indirectConfig };
  return { id: sheet.id, kind: 'subcontract', sheet, lines: sheet.lines, categories: subCategories(), cfg: subIndirectCfg() };
}

/** Browser only: make this page's module the subcontract's budget. Idempotent. */
export function activateBudget(id) {
  const b = budgetFor(id);
  if (b.kind !== 'subcontract' || budgetRules.sheetId === b.id) return b;
  const cats = b.categories;
  costLines.splice(0, costLines.length, ...b.lines);
  categories.splice(0, categories.length, ...cats);
  Object.assign(indirectConfig, b.cfg);
  Object.assign(budgetRules, { kind: 'subcontract', indirect: false, subcontracts: false, sheetId: b.id });
  return b;
}

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

// ── Seed — last, because it reads everything above. ──
withResolvedIndirect(indirectConfig);
syncSubcontractAmounts(costLines);
