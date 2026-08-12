// lib-entry-view — the LIB grid's view derivations, in ONE place.
//
// ── Why this module exists ──────────────────────────────────────────────────
// An Astro component that server-renders a grid AND keeps it live in the browser
// has two execution scopes: the frontmatter (SSR) and the client <script>. They
// share no bindings, so every helper used by both was WRITTEN TWICE — 77 of them
// in cbf-lib-cost-table.astro alone, 54 in the sheet's table. Then three more
// surfaces (the sheet, the line editor, the wizard) copied the same helpers a
// third and fourth time.
//
// That is not a tidiness problem, it is a correctness one, and it had already
// produced bugs:
//   · qtyFactText lost its travel branch in the client copy only, so the COR lens
//     server-rendered "2 trips × 2 rooms × 1 night" and then degraded to a bare
//     quantity the moment any edit repainted the row.
//   · the second-quantity control was suppressed for personnel in the client copy
//     but not in the SSR markup, so a personnel line shipped with an affordance
//     that vanished on first repaint.
//   · a position-label change fixed in the main grid propagated into the sheet's
//     line editor by copy-paste, bug included.
//
// Every function here is PURE and takes what it needs explicitly — no closure
// over `lines`, `priced` or `cfg`. That is the whole trick: the frontmatter binds
// them to its static `priceLines()` result, the client binds them to its live
// mutable state, and both run the same body. A surface can no longer drift from
// itself, because there is only one copy to drift from.
//
// Consumers bind rather than re-implement:
//     import * as V from '../../lib/lib-entry-view';
//     const displayLabel = (l: any) => V.displayLabel(l, lines);
//     const capPass      = (l: any) => V.capPass(l, priced.amounts);
// which keeps every existing call site unchanged.

import {
  SHAPES,
  categories,
  categoryFixedUnit,
  effectiveQty,
  baseLabelFor,
  gsaRate,
  gsaRatesFor,
  gsaRatesForVehicleKind,
  isScheduleRated,
  weLabel,
  contract,
  contractMonths,
  rosterFor,
  tripOf,
  tripLabel,
  personnelTypeLabel,
  TIME_UNITS,
  timeUnit,
  isSalaryLine,
  timeInMonths,
  periodProblem,
  travelKind,
  travelChain,
  travelLabel,
  FISCAL_YEARS,
  hasStandardRate,
  standardNeedsLocality,
  resolveLocality,
  perDiemFor,
  standardOn,
  standardRateOn,
  standardSourceText,
  typedRateText,
  fringeLabel,
  fringePctOf,
  fringeOnLine,
  isDerivedFringe,
  TRAVEL_KINDS,
  VEHICLE_KINDS,
  vehicleKind,
  perItemCost,
  onThreshold,
  thresholdTargetFor,
  isClassOverride,
  canOverrideThreshold,
  filingConsequence,
  equipmentClassLabel,
  countOf,
  usd,
  qtyFmt,
} from '../data/lib-entry.mjs';

type Line = any;
type Amounts = Record<string, number>;

/* ── Money / quantity text ─────────────────────────────────────────────────── */
export const cents = (n: number) => Math.abs((n ?? 0) % 1) > 0.0001;
export const money = (n: number) => usd(n, { cents: cents(n) });
/* Field values keep thousands separators (parsed back out on edit) and are never
   rewritten while the vendor types, so the caret can't jump. */
export const numText = (n: number | null | undefined) =>
  n == null ? '' : cents(n) ? String(n) : n.toLocaleString('en-US');

/* ── The GSA gate — VEHICLES only now ───────────────────────────────────────
   Travel used to live here too: its rate came off the schedule and the vendor
   could override it, so the gate asked whether the override cleared the ceiling.
   Travel has since inverted — the typed rate is the default and claiming a
   published one is an explicit act (see the standard-rate helpers below) — so a
   travel line can no longer be "over ceiling": it either IS the published rate
   or makes no claim on it. What is left under this heading is shape B, the GSA
   Fleet lines, where the reference is the whole shape of the line. */
export const gsaOf = (l: Line) => gsaRate(l.gsaKey);
export const overridden = (l: Line) => isScheduleRated(l) && l.rateOverride != null;
export const gsaOver = (l: Line) => {
  const g = gsaOf(l);
  return !!(g && l.rateOverride != null && l.rateOverride > g.ceiling);
};
export const gsaSrcText = (l: Line) => {
  const g = gsaOf(l);
  /* Says what the control DOES rather than restating the row named above it: the
     rate is referenced, not typed, and the schedule sets the ceiling. */
  return g
    ? `Rate referenced from this GSA row — not typed. Ceiling ${money(g.ceiling)}.`
    : 'Pick the GSA schedule row this line references — it sets the rate.';
};
export const gsaErrText = (l: Line) => {
  const g = gsaOf(l);
  if (!g) return 'Select the GSA schedule row this line references.';
  return `${money(l.rateOverride)} is over the ${g.kind} ceiling of ${money(g.ceiling)} for ${g.location} (${g.season}) — ${money(l.rateOverride - g.ceiling)} over.`;
};
export const gsaLabel = (l: Line) => {
  const g = gsaOf(l);
  return g ? `${g.location} · ${g.kind} · ${g.season}` : 'Select a schedule row';
};

/* ── The standard rate, as a CLAIM a travel line makes ──────────────────────
   A travel rate is typed. Three kinds have a published standard the vendor may
   claim instead, and claiming it takes two answers — which locality, which
   fiscal year — because those are exactly what make the claim checkable later.
   The claim supersedes the typed number without erasing it, so dropping the
   claim restores what they had.

   Everything here is a view derivation over `line.standard`; the resolution
   itself lives in the data module, where the published table does. */
export const claimsStandard = (l: Line) => !!standardOn(l);
export const canClaimStandard = (l: Line) => hasStandardRate(l?.travelKind);
export const standardNeedsWhere = (l: Line) => standardNeedsLocality(l?.travelKind);
export const standardSrcText = (l: Line) => standardSourceText(l);
export const typedSrcText = (l: Line) => typedRateText(l);
/** The number a claim resolves to, for the row to print beside the claim. */
export const standardAmountText = (l: Line) => {
  if (!claimsStandard(l)) return '';
  const r = standardRateOn(l);
  /* A claim that resolves to nothing is a real state, not an error to hide: the
     location is unlisted for that year, or the year has no table. Saying so is
     what stops the line quietly pricing at zero without explanation. */
  return r == null ? 'No published rate for that location and year' : money(r);
};
/** The typed rate kept underneath a claim — what dropping it would restore. */
export const supersededText = (l: Line) =>
  l?.rate == null ? '' : `Your rate of ${money(l.rate)} is kept, and returns if you drop the claim.`;
/* ── What a claimed row SHOWS, and what it does not ─────────────────────────
   A claimed rate cell used to carry six things: the disabled typed box, the
   resolved amount, the source sentence, the superseded sentence, a location
   field and a year select. Five of them were the CLAIM'S OWN PARAMETERS — the
   things you answer while making the claim, still sitting on the row long after
   it was made, in the narrowest column of the grid.
   Down a column, only two facts are worth reading: what the rate IS, and that it
   is the published one for a stated year. The year is on the badge because a
   claim on FY2026 and a claim on FY2027 are different numbers, and a row scanned
   in October has to show which. Everything else is answered — and re-answered —
   in the dialog where the claim is made. */
/** The indicator itself: that this rate is the standard, and whose year it is. */
export const standardBadgeText = (l: Line) => {
  const ref = standardOn(l);
  return ref ? `Standard rate · FY${ref.year}` : '';
};
/** WHERE the claim was made — off the row, but on its title and in the dialog. */
export const standardWhereText = (l: Line) => {
  const ref = standardOn(l);
  if (!ref) return '';
  return standardNeedsLocality(l?.travelKind) ? resolveLocality(ref.locality) : 'National rate';
};
/** The locality rows a claim may be made against, for the dialog's picker. */
export const localityOptions = (year: number | string) =>
  perDiemFor(year).map((r: any) => ({ label: r.locality, value: r.locality }));
/** Year options, newest first — a claim must say which schedule it is claiming. */
export const fiscalYearOptions = () =>
  FISCAL_YEARS.map((y: number) => ({ label: `FY${y}`, value: String(y) }));

/* ── Capitalization threshold — PLACEMENT, not a verdict ────────────────────
   The per-item cost files the item; the cell shows the division that was done
   and the CONSEQUENCE of the side it landed on, because crossing the threshold
   takes the item out of the indirect base and onto Property Inventory. */
export const perItem = (l: Line, a: Amounts) => perItemCost(l, a);
export const capOverride = (l: Line) => isClassOverride(l);
/* A lump is only suspicious once it is big enough to be hiding a capitalizable
   item; below the threshold it cannot be, and says nothing. */
export const capLumpOpen = (l: Line, a: Amounts) =>
  onThreshold(l) && l.shape === SHAPES.LUMP && (a[l.id] ?? 0) >= contract.capitalizationThreshold;
export const capPass = (l: Line, a: Amounts) => !capOverride(l) && !capLumpOpen(l, a);
export const capFiledText = (l: Line, a: Amounts) =>
  `${money(perItem(l, a))} per item — filed as ${equipmentClassLabel(l.block)}.`;
export const capWhyText = (l: Line, cfg: any) => filingConsequence(l, cfg);
export const capOverrideText = (l: Line, a: Amounts) =>
  `Filed as ${equipmentClassLabel(l.block)} against the sort: at ${money(perItem(l, a))} per item the ${usd(contract.capitalizationThreshold)} threshold makes this ${equipmentClassLabel(thresholdTargetFor(l))}. An override of the threshold needs the COR's agreement — say why on this line.`;
export const capLumpText = (l: Line, a: Amounts) =>
  `A ${money(a[l.id] ?? 0)} lump has no per-item cost, so the ${usd(contract.capitalizationThreshold)} threshold cannot reach inside it. Itemize this line — quantity × cost each — so each item files itself.`;
/* The override runs one way — see canOverrideThreshold. */
export const capCanOverride = (l: Line, a: Amounts) => canOverrideThreshold(l, a);
export const capToggleText = (l: Line) =>
  capOverride(l) ? 'Use the threshold' : 'File as a supply instead';

/* ── The period guard, on the axis every time unit shares ───────────────────
   Converting the line's time to months FIRST makes one rule cover every unit:
   one individual cannot be budgeted for more time than the contract runs. A
   personnel line carries no dates — the rate covers the contract period. */
export const monthsTested = (l: Line) => isSalaryLine(l);
export const monthsOver = (l: Line, lines: Line[]) => periodProblem(l, lines) != null;
export const timeText = (l: Line, lines: Line[]) =>
  countOf(effectiveQty(l, lines), timeUnit(l).plural);
export const monthsText = (l: Line, lines: Line[]) =>
  timeUnit(l).key === 'month'
    ? `${timeText(l, lines)} of the ${contractMonths}-month contract period`
    : `${timeText(l, lines)} ≈ ${countOf(timeInMonths(l, lines), 'months')} of the ${contractMonths}-month contract period`;
export const monthsErrText = (l: Line, lines: Line[]) =>
  `${timeText(l, lines)} is ${qtyFmt(timeInMonths(l, lines))} months of work in a ${contractMonths}-month contract period — one individual cannot be budgeted for more time than the contract runs.`;

/* The unit decides what the number beside it MEANS, so it captions the rate. */
export const rateLabelOf = (l: Line) => (isSalaryLine(l) ? timeUnit(l).rateLabel : 'Cost per unit');
/* In a grid the unit rides the rate box itself — "$4,750 /month" — rather than a
   caption underneath it. The caption sat below the number it qualified, so the
   unit read as a second fact about the row instead of part of the rate. */
export const rateSuffixOf = (l: Line) => (isSalaryLine(l) ? `/${timeUnit(l).label.toLowerCase()}` : '');

/* ── Fringe: typed on the salary row, read in its own section ──────────────── */
export const fringePctText = (l: Line) => (fringePctOf(l) * 100).toFixed(1);
/* The dollars the rate just generated, as a bare amount. In the grid it sits
   BESIDE the percentage rather than under it, so the row reads left to right —
   rate, the dollars it produces, then the line's own amount in the next column.
   Stacked under the field it read as a sentence about the row instead of as the
   second number in a row of numbers.

   Rounded like the Amount column it is read against, not to the cent: two money
   numbers side by side that round differently read as two different kinds of
   number. The cents still live in the priced total. */
export const fringeAmtText = (l: Line, lines: Line[], a: Amounts) =>
  usd(fringeOnLine(l, lines, a));
export const fringeFactText = (l: Line) => `${fringePctText(l)}% fringe`;

/* There is deliberately no fringeOffText() any more. It printed a justification
   for any rate that differed from the house rate ("Seasonal rate — no retirement
   contribution"), sourced from a `fringeNote` field with no input anywhere on the
   form — so it read as a claim the vendor had made and could not see, edit, or
   account for. The rate itself is on the row, in a column built to be read down;
   an outlier is visible without a sentence explaining it. */

/* ── The Fringe section: derived rows, nothing to type into them ───────────── */
export const derivedRow = (l: Line) => isDerivedFringe(l);
export const fringeSrcText = (l: Line, lines: Line[]) =>
  `Rate carried on the ${baseLabelFor(l, lines)} salary line — change it there.`;
/* One position at two rates blends to a rate on neither line, so the row says
   which it is rather than printing a number nothing typed. */
export const fringeBlended = (l: Line, lines: Line[]) => {
  const sal = lines.filter((s: Line) => isSalaryLine(s) && s.staffKey === l.base?.staffKey);
  return new Set(sal.map((s: Line) => fringePctOf(s))).size > 1;
};
export const fringeRateText = (l: Line, lines: Line[]) =>
  `${((l.pct ?? 0) * 100).toFixed(1)}%${fringeBlended(l, lines) ? ' blended' : ''}`;
/* A derived row cannot be allocated on its own, so the error names the row that
   CAN fix it. */
export const derivedAllocErrText = (l: Line, lines: Line[]) =>
  `Follows ${baseLabelFor(l, lines)} — allocate that position’s salary lines and this follows.`;

/* ── Line identity: which control NAMES this line ───────────────────────────
   Four categories know their own line's name better than the vendor does, so
   they replace the free-text description with the thing that decides it. */
export const identOf = (l: Line): string =>
  l.category === 'personnel-salary' ? 'position'
  : l.category === 'personnel-fringe' ? 'derived'
  : l.shape === SHAPES.TRAVEL ? 'travel-kind'
  : l.category === 'vehicles' ? 'vehicle-kind'
  : 'label';
/** What the line is CALLED, whether that was typed or resolved. */
export const displayLabel = (l: Line, lines: Line[]): string =>
  l.shape === SHAPES.TRAVEL ? travelLabel(l)
  : l.category === 'personnel-fringe' ? fringeLabel(l, lines)
  : l.label ?? '';
/** WHERE the line sits — the section that owns it, as one line of text.
    A name alone does not identify a line ("Mileage" appears under three trips),
    so every surface that addresses a line away from the grid — the line editor's
    subheading, the allocation sheet's subject — states the scope beside it. */
export const scopeOf = (l: Line): string => {
  const cat = categories.find((c: any) => c.key === l.category);
  if (!cat) return '';
  if (l.category === 'travel') {
    /* A line with no trip has a scope too — "Not part of a trip", not a trip
       whose destination nobody has set yet. */
    const trip = tripOf(l.trip);
    return [cat.label, trip ? tripLabel(trip) : 'Not part of a trip'].filter(Boolean).join(' · ');
  }
  if (l.category === 'personnel-salary') {
    return [cat.label, personnelTypeLabel(l.block === 'admin' ? 'admin' : 'technical')]
      .filter(Boolean).join(' · ');
  }
  const b = ((cat as any).blocks ?? []).find((x: any) => x.key === l.block);
  return [cat.label, b?.label].filter(Boolean).join(' · ');
};

/* There is deliberately no kindNote() any more. One slot under the identity
   control was printing two unrelated things — a KIND's rule on travel and
   vehicle lines, and a line's free-text `detail` on every other line — so the
   same position on screen meant "a rule you cannot change" on some rows and "a
   note you may not type" on others, and nothing at all on the rest. The rule now
   lives where it is decided (the kind picker's help text) and the free text is
   gone. Restoring this means answering which of the two it is. */

/* ── A kind, a time unit, or the CATEGORY locks the unit, so it stops being an
   input ─────────────────────────────────────────────────────────────────────
   Salary joins vehicles here, and meetings and rent-utilities join both. The
   unit was free text over arithmetic that assumed months, and because the
   generic second-quantity control is offered wherever the unit is open, a
   personnel line could grow a "× 3" that multiplied the money while the gate
   read only the first number. Locking retires both.

   The category case is the same failure one step earlier: those two columns are
   captioned "Registrations" and "Months", so the open box asked the vendor to
   name a unit the heading had already named — and nothing kept the two agreeing.
   Neither category has a second dimension either (a line is one course, or one
   space), so locking is also what stops "3 registrations × 2 ?" being offered. */
export const unitLocked = (l: Line) =>
  (l.category === 'vehicles' && !!vehicleKind(l.vehicleKind)) ||
  isSalaryLine(l) ||
  !!categoryFixedUnit(l.category);
export const lockedUnit = (l: Line) =>
  isSalaryLine(l)
    ? timeUnit(l).plural
    : (categoryFixedUnit(l.category) ?? vehicleKind(l.vehicleKind)?.unit ?? l.qtyUnit ?? '');
export const lockedUnit2 = (l: Line) => vehicleKind(l.vehicleKind)?.secondUnit ?? l.qty2Unit ?? '';
/* Three renderings of the unit cell, exactly one live: an open text box, a
   time-unit SELECT on a personnel line, or a value a vehicle kind already fixed. */
export const unitPicked = (l: Line) => isSalaryLine(l);
export const unitStatic = (l: Line) => unitLocked(l) && !unitPicked(l);

/* ── Work-element allocation ───────────────────────────────────────────────── */
export const allocEntries = (l: Line): [string, number][] =>
  (Object.entries(l.allocations ?? {}) as [string, number][]).sort((a, b) => b[1] - a[1]);
export const allocSum = (l: Line) => allocEntries(l).reduce((a, [, p]) => a + p, 0);
export const allocSummary = (l: Line) => {
  const e = allocEntries(l);
  if (!e.length) return 'Not allocated';
  return e.length === 1 ? `${e[0][0]} · ${e[0][1]}%` : `${e[0][0]} · ${e[0][1]}% +${e.length - 1}`;
};
export const allocTitle = (l: Line) => {
  const e = allocEntries(l);
  return e.length ? e.map(([id, p]) => `${weLabel(id)} — ${p}%`).join('\n') : 'No work element assigned';
};
export const allocErrText = (l: Line, lines: Line[]) => {
  const s = allocSum(l);
  /* A derived row is not the place to fix its own split. */
  if (derivedRow(l)) return derivedAllocErrText(l, lines);
  return s === 0
    ? 'No work element assigned — allocations must total 100%.'
    : `Allocated ${s}% — work-element allocations must total 100%.`;
};

/* ── Read-only mirrors, for the COR lens ────────────────────────────────────
   A reviewer does not type into someone else's budget, so every entry control is
   replaced by the VALUE it holds — as facts, not disabled inputs. */
export const qtyFactText = (l: Line, lines: Line[]) => {
  if (l.shape === SHAPES.TRAVEL) return travelChain(l);
  const one = `${qtyFmt(effectiveQty(l, lines))} ${lockedUnit(l) || l.qtyUnit || ''}`.trim();
  /* A personnel line is one individual — number × unit cost, no second
     multiplicand exists to print. */
  if (isSalaryLine(l)) return one;
  return l.qty2 != null ? `${one} × ${qtyFmt(l.qty2)} ${l.qty2Unit ?? ''}`.trim() : one;
};
export const allocFactText = (l: Line) => {
  const e = allocEntries(l);
  return e.length ? e.map(([id, p]) => `${id} ${p}%`).join(' · ') : 'Not allocated';
};

/** Row state carried as an inline background tint — never a colored left border. */
export const rowFlag = (l: Line, lines: Line[], a: Amounts) =>
  gsaOver(l) ? 'gsa'
  : allocSum(l) !== 100 ? 'alloc'
  : !capPass(l, a) ? 'capital'
  : monthsOver(l, lines) ? 'months'
  : null;

/* ── Indirect scope, spelled out so re-scoping is legible ───────────────────── */
export const excludedLabels = (cfg: any) =>
  categories.filter((c: any) => !cfg.appliesTo.includes(c.key)).map((c: any) => c.label);
export const scopeText = (cfg: any) => {
  const out = excludedLabels(cfg);
  return out.length
    ? `${cfg.appliesTo.length} of ${categories.length} categories in scope — ${out.join(' and ')} excluded`
    : `All ${categories.length} categories in scope`;
};

/* ── Option lists for the pickers ───────────────────────────────────────────
   Positions are defined BY the LIB (see rosterFor), so their options come from
   the lines rather than a constant. `positionOptionsFor` adds the create row:
   esa-combobox only commits values present in `options`, so "create" has to BE
   an option — its label contains the term, so it survives the combobox's own
   label filter. */
export const NEW_POS = '__new-position__:';
export const positionOptions = (lines: Line[]) =>
  rosterFor(lines).map((p: any) => ({ label: p.title, value: p.key }));
export const positionOptionsFor = (lines: Line[], term: string) => {
  const opts = positionOptions(lines);
  const t = (term ?? '').trim();
  if (!t) return opts;
  const exists = opts.some((o) => o.label.toLowerCase() === t.toLowerCase());
  return exists ? opts : [{ label: `Use “${t}”`, value: NEW_POS + t }, ...opts];
};
export const timeUnitOptions = () => TIME_UNITS.map((u: any) => ({ label: u.plural, value: u.key }));
export const travelKindOptions = () => TRAVEL_KINDS.map((k: any) => ({ label: k.label, value: k.key }));
export const vehicleKindOptions = () => VEHICLE_KINDS.map((k: any) => ({ label: k.label, value: k.key }));
/** The schedule rows a line may reference — scoped by its kind, then its category. */
/* Travel is deliberately absent: a travel line does not pick a schedule ROW any
   more, it states a location and a year and the table answers. What is left is
   the fleet schedule, scoped to the vehicle kind. */
export const gsaOptionsFor = (l: Line) => {
  const rows =
    l.category === 'vehicles' && l.vehicleKind
      ? gsaRatesForVehicleKind(l.vehicleKind)
      : gsaRatesFor(l.category);
  return rows.map((g: any) => ({ label: `${g.location} · ${g.kind} · ${g.season}`, value: g.key }));
};
