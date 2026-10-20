// lib-mvp-view — the /lib-mvp grid's view derivations, in ONE place.
//
// A FORK of src/lib/lib-entry-view.ts, read against src/data/lib-mvp.mjs (the
// v1 scope in docs/lib-mvp-scope.md). Everything the long-term model needed and
// v1 cut is gone from here too: GSA per-diem claims, the standard-rate dialog,
// the capitalization threshold, work-element allocation, accounting codes,
// trips and rate steps.
//
// ── Why this module exists ──────────────────────────────────────────────────
// An Astro component that server-renders a grid AND keeps it live in the browser
// has two execution scopes: the frontmatter (SSR) and the client script. They
// share no bindings, so a helper both need used to be written twice — and the
// two copies drifted (lib-entry's client copy of qtyFactText once lost a branch
// the SSR copy kept, so the COR lens degraded on the first repaint).
//
// Every derivation here is PURE and takes what it needs explicitly — no closure
// over `lines`, `amounts` or `cfg`. The frontmatter binds them to its static
// `priceLines()` result, the client binds them to its live working copy, and
// both run the same body:
//     import * as V from '../../lib/lib-mvp-view';
//     const displayLabel = (l: any) => V.displayLabel(l, lines);
//
// The one exception is at the bottom: the per-budget line store. It lives here
// so the grid and the demo controls (which clear it) import one key.

import {
  SHAPES,
  categories,
  indirectScopes,
  categoryFixedUnit,
  effectiveQty,
  baseLabelFor,
  contractMonths,
  timeUnit,
  TIME_UNITS,
  isSalaryLine,
  timeInMonths,
  periodProblem,
  travelKind,
  travelLabel,
  travelDestination,
  fringeLabel,
  fringePctOf,
  fringeOnLine,
  isDerivedFringe,
  isFringeOverride,
  fringeDefaults,
  DEFAULT_FRINGE_PCT,
  TRAVEL_KINDS,
  VEHICLE_KINDS,
  VEHICLE_TYPES,
  MEETING_KINDS,
  OTHER_KINDS,
  EQUIPMENT_CLASSES,
  vehicleKind,
  vehicleType,
  vehicleTypeLabel,
  vehicleDefaultRate,
  kindOfLine,
  isVendorDefined,
  unitsOf,
  staffOf,
  titleOfLine,
  qtySourceOf,
  isQtyLinked,
  canLinkQty,
  linkableSources,
  equipmentClassLabel,
  resolveIndirect,
  subcontractSheets,
  subSheetIssues,
  countOf,
  usd,
  pct,
  qtyFmt,
} from '../data/lib-mvp.mjs';

type Line = any;
type Amounts = Record<string, number>;

/* ── Money / quantity text ─────────────────────────────────────────────────── */
export const cents = (n: number) => Math.abs((n ?? 0) % 1) > 0.0001;
export const money = (n: number) => usd(n, { cents: cents(n) });
/* Field values keep thousands separators (parsed back out on edit) and are never
   rewritten while the vendor types, so the caret can't jump. */
export const numText = (n: number | null | undefined) =>
  n == null || n === ('' as any) ? '' : cents(n) ? String(n) : Number(n).toLocaleString('en-US');

/* ── The period guard, on the axis every time unit shares ───────────────────
   Converting a salary line's time to months FIRST makes one rule cover every
   unit: one person cannot be budgeted for more time than the contract runs. */
export const monthsTested = (l: Line) => isSalaryLine(l);
export const monthsOver = (l: Line, lines: Line[]) => periodProblem(l, lines) != null;
export const timeText = (l: Line, lines: Line[]) => countOf(effectiveQty(l, lines), timeUnit(l).plural);
export const monthsErrText = (l: Line, lines: Line[]) =>
  timeUnit(l).key === 'month'
    ? `${timeText(l, lines)} per person is past the ${contractMonths}-month contract period. Shorten it to fit.`
    : `${timeText(l, lines)} per person is ${qtyFmt(timeInMonths(l, lines))} months — past the ${contractMonths}-month contract period. Shorten it to fit.`;

/* The unit decides what the number beside it MEANS, so it captions the rate. */
export const rateLabelOf = (l: Line) => (isSalaryLine(l) ? timeUnit(l).rateLabel : 'Cost per unit');
/* In a grid the unit rides the rate box itself — "$4,750 /month". */
export const rateSuffixOf = (l: Line) => (isSalaryLine(l) ? `/${timeUnit(l).label.toLowerCase()}` : '');

/* ── Fringe: set on the salary row, read in its own section ────────────────── */
export const fringePctText = (l: Line) => (fringePctOf(l) * 100).toFixed(1);
/* Rounded like the Amount column it is read against. */
export const fringeAmtText = (l: Line, lines: Line[], a: Amounts) => usd(fringeOnLine(l, lines, a));
export const fringeFactText = (l: Line) =>
  `${fringePctText(l)}% fringe${isFringeOverride(l) ? ' — overrides the default' : ''}`;
export const fringeOverridden = (l: Line) => isFringeOverride(l);
export const fringeDefaultText = () => (fringeDefaults.pct * 100).toFixed(1);
export const fringeResetText = () => `Use the ${fringeDefaultText()}% default`;
/** The Personnel head's badge — only when the budget default differs from the
    system default; null otherwise. */
export const fringeBadge = () =>
  Math.abs(fringeDefaults.pct - DEFAULT_FRINGE_PCT) > 1e-9 ? `Default fringe ${(fringeDefaults.pct * 100).toFixed(1)}%` : null;

/* ── The Fringe section: generated rows, nothing to type into them ─────────── */
export const derivedRow = (l: Line) => isDerivedFringe(l);
export const fringeSrcText = (l: Line, lines: Line[]) =>
  `Rate set on the ${baseLabelFor(l, lines)} salary line — change it there.`;
/* One fringe line per salary line in v1, so the rate is always that line's own. */
export const fringeRateText = (l: Line) => `${((l.pct ?? 0) * 100).toFixed(1)}%`;

/* ── Line identity: which control NAMES this line ───────────────────────────
   Travel and Vehicles name themselves from their pickers; Fringe from the
   position it follows; every other line from typed text. */
export const identOf = (l: Line): string =>
  l.category === 'personnel-fringe' ? 'derived'
  : l.category === 'travel' || l.category === 'vehicles' ? 'picked'
  : 'label';
/** A vehicle line names its kind and its type — the type is what a COR checks
    against the work. A vendor-defined one names what the vendor said it is. */
export const vehicleLabel = (l: Line): string => {
  const k = vehicleKind(l.vehicleKind);
  if (!k) return l.label ?? '';
  const name = k.vendorDefined ? ((l.desc ?? '').trim() || k.label) : k.label;
  const type = vehicleTypeLabel(l.vehicleType);
  return type ? `${name} — ${type}` : name;
};
/** What the line is CALLED, whether that was typed or resolved. */
export const displayLabel = (l: Line, lines: Line[]): string =>
  l.category === 'travel' ? travelLabel(l)
  : l.category === 'personnel-fringe' ? fringeLabel(l, lines)
  : l.category === 'vehicles' ? vehicleLabel(l)
  : l.label ?? '';
/** WHERE the line sits — its section, and its sub-block where it has one. */
export const scopeOf = (l: Line): string => {
  const cat: any = categories.find((c: any) => c.key === l.category);
  if (!cat) return '';
  const b = (cat.blocks ?? []).find((x: any) => x.key === l.block);
  return [cat.label, b?.label].filter(Boolean).join(' · ');
};
/** The label field's prompt, which changes with what the line is. */
export const labelPlaceholderOf = (l: Line) =>
  isSalaryLine(l) ? 'Position title'
  : l.category === 'subcontracts' ? 'Subcontractor or scope of work'
  : 'Describe this cost line';

/* ── The unit: a kind, a time unit or the CATEGORY fixes it, else it's typed ──
   Three renderings of the unit cell, exactly one live: an open text box, the
   time-unit SELECT on a salary line, or a value something else already fixed. */
const kindUnitOf = (l: Line) => {
  if (l.category === 'travel') return travelKind(l.travelKind)?.countLabel ?? null;
  return (kindOfLine(l) as any)?.unit ?? null;
};
export const unitLocked = (l: Line) => isSalaryLine(l) || !!categoryFixedUnit(l.category) || !!kindUnitOf(l);
export const unitPicked = (l: Line) => isSalaryLine(l);
export const unitStatic = (l: Line) => unitLocked(l) && !unitPicked(l);
export const lockedUnit = (l: Line) => unitsOf(l).unit ?? '';
/** The second quantity exists only where the unit has a second dimension — a
    travel kind's duration, a vehicle kind's miles a month, a stipend's months. */
export const hasQty2 = (l: Line) => !isSalaryLine(l) && !!unitsOf(l).secondUnit;
export const unit2Locked = (l: Line) =>
  l.category === 'travel' ? !!travelKind(l.travelKind)?.durationLabel : !!(kindOfLine(l) as any)?.secondUnit;
export const lockedUnit2 = (l: Line) => unitsOf(l).secondUnit ?? '';

/* ── Linked quantities: one hop, to a position ─────────────────────────────── */
export const qtyLinked = (l: Line, lines: Line[]) => isQtyLinked(l, lines);
/** "Follows Natural Resource Spec. 3" — the source, named. */
export const qtySourceText = (l: Line, lines: Line[]) => {
  const src = qtySourceOf(l, lines);
  return src ? `Follows ${titleOfLine(src) || 'an untitled position'}` : '';
};
/** The position a detached link would re-follow, while it still exists. */
export const detachedSource = (l: Line, lines: Line[]) =>
  l?.qtyFrom && l.qtyDetached ? lines.find((x: Line) => x.id === l.qtyFrom && isSalaryLine(x)) ?? null : null;
export const linkOptions = (l: Line, lines: Line[]) =>
  canLinkQty(l) ? linkableSources(l, lines).filter((s: Line) => s.id !== l.qtyFrom) : [];

/* ── Vehicles: the GSA default the type prefills ───────────────────────────── */
export const takesVehicleType = (l: Line) =>
  l.category === 'vehicles' && !!vehicleKind(l.vehicleKind) && !vehicleKind(l.vehicleKind)?.vendorDefined;
/** One quiet sentence under a prefilled rate: where the default came from, or
    what it was when the vendor typed their own. Nothing compares the two. */
export const vehicleRateNote = (l: Line) => {
  const d = vehicleDefaultRate(l?.vehicleKind, l?.vehicleType);
  if (d == null) return '';
  return Number(l.rate) === d
    ? 'GSA Fleet rate for this type — change it if you pay something else.'
    : `GSA Fleet rate for this type: ${money(d)}.`;
};

/* ── Supplies: filed by hand ───────────────────────────────────────────────── */
export const otherClassOf = (l: Line) => (l.block === 'capital' ? 'expensed' : 'capital');
/** The move names its DESTINATION, because that is the decision being made. */
export const moveClassText = (l: Line) => `Move to ${equipmentClassLabel(otherClassOf(l)).toLowerCase()}`;

/* ── Descriptions ───────────────────────────────────────────────────────────
   A lump sum must say what it covers (a submit gate), and a vendor-defined
   travel or vehicle line says what it is (its name). One field, two prompts. */
export const isPlainLump = (l: Line) => l.shape === SHAPES.LUMP && l.category !== 'subcontracts';
export const takesDesc = (l: Line) =>
  isPlainLump(l) || (isVendorDefined(l) && (l.category === 'travel' || l.category === 'vehicles'));
export const descPlaceholderOf = (l: Line) => (isPlainLump(l) ? 'What this amount covers' : 'Say what this cost is');
export const vendorDefined = (l: Line) => isVendorDefined(l);
export const staffText = (l: Line) => String(staffOf(l));

/* ── Inline validation: the submit gates that read ONE line ────────────────
   Positions named, months within the period, travel destination, vehicle
   type, lump described. Gate 8 (required marks) lives on the mark band, and
   gate 9 (child LIBs) on the subcontract row, which reads its own sheet. */
export const lineErrors = (l: Line, lines: Line[]): string[] => {
  const errors: string[] = [];
  if (derivedRow(l)) return errors;
  if (isSalaryLine(l) && !titleOfLine(l)) errors.push('Name the position. Its fringe line and any linked lines refer back to it.');
  if (monthsTested(l) && monthsOver(l, lines)) errors.push(monthsErrText(l, lines));
  if (l.category === 'travel' && !travelDestination(l)) errors.push('Add a destination — every travel line needs one.');
  if (l.category === 'vehicles' && (vehicleKind(l.vehicleKind)?.needsType ?? true) && !vehicleType(l.vehicleType))
    errors.push('Pick a vehicle type. It sets the GSA default rate and lets the COR check the class.');
  if (isPlainLump(l) && !(l.desc ?? '').trim()) errors.push('Describe what this lump sum covers.');
  return errors;
};
/** Row state carried as an inline background tint — never a colored left border. */
export const rowFlag = (l: Line, lines: Line[]) =>
  monthsTested(l) && monthsOver(l, lines) ? 'months' : lineErrors(l, lines).length ? 'error' : null;

/* ── Subcontracts: the child LIB, summarised on the parent's row ────────────
   Gate 9 on one line: whether the LIB behind this subcontract passes the same
   checks. `openRequired` is the review's open Required marks, so a mark on a
   child line counts here too. */
export const subIssuesOf = (l: Line, openRequired: any[] = []): string[] => {
  if (l?.category !== 'subcontracts') return [];
  const sheet = l.sheet ? (subcontractSheets as any)[l.sheet] : null;
  if (!sheet) return ['Enter this subcontract’s budget on its own LIB.'];
  return (subSheetIssues as any)(sheet, { openRequired });
};
export const subStatusText = (l: Line, openRequired: any[] = []) => {
  const n = subIssuesOf(l, openRequired).length;
  return n ? `${n} item${n === 1 ? '' : 's'} to fix on its LIB` : 'Its LIB passes every check';
};

/* ── Read-only mirrors, for the COR lens and a locked budget ────────────────
   A reader does not type into the budget, so every entry control is replaced by
   the VALUE it holds — as facts, not disabled inputs. */
export const qtyFactText = (l: Line, lines: Line[]) => {
  if (l.shape !== SHAPES.QTY_RATE) return '';
  const unit = lockedUnit(l) || l.qtyUnit || '';
  const one = unit ? countOf(effectiveQty(l, lines), unit) : qtyFmt(effectiveQty(l, lines));
  if (isSalaryLine(l)) return staffOf(l) > 1 ? `${one} × ${staffOf(l)} staff` : one;
  return hasQty2(l) ? `${one} × ${countOf(Number(l.qty2) || 0, lockedUnit2(l) || 'units')}` : one;
};

/* ── Indirect scope, spelled out ──────────────────────────────────────────── */
export const excludedLabels = (cfg: any) =>
  indirectScopes.filter((x: any) => !(cfg.appliesTo ?? []).includes(x.key)).map((x: any) => x.label);
const listText = (xs: string[]) =>
  xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
export const scopeText = (cfg: any) => {
  if (!cfg?.rateId) return 'No indirect rate selected yet.';
  const r = resolveIndirect(cfg);
  const out = excludedLabels(cfg);
  return out.length
    ? `${r.baseLabel} — ${listText(out)} excluded`
    : `${r.baseLabel} — every cost group in scope`;
};
export const indirectRefText = (cfg: any) => (cfg?.rateId ? [cfg.label, cfg.referenceDoc].filter(Boolean).join(' · ') : '');

/* ── Option lists for the pickers — plain dropdowns over fixed lists ───────── */
export const timeUnitOptions = () => TIME_UNITS.map((u: any) => ({ label: u.plural, value: u.key }));
export const travelKindOptions = () => TRAVEL_KINDS.map((k: any) => ({ label: k.label, value: k.key }));
export const vehicleKindOptions = () => VEHICLE_KINDS.map((k: any) => ({ label: k.label, value: k.key }));
export const vehicleTypeOptions = () => VEHICLE_TYPES.map((t: any) => ({ label: t.label, value: t.key }));
export const meetingKindOptions = () => MEETING_KINDS.map((k: any) => ({ label: k.label, value: k.key }));
export const otherKindOptions = () => OTHER_KINDS.map((k: any) => ({ label: k.label, value: k.key }));
export const equipmentClassOptions = () => EQUIPMENT_CLASSES.map((c: any) => ({ label: c.label, value: c.key }));

export const pctText = (f: number) => pct(f, 1);

/* ── The per-budget line store (sessionStorage) ─────────────────────────────
   The prototype has no backend, so "autosave per line" is this: every committed
   edit writes the budget's working lines here, under one key per budget —
   `cbf-libmvp-lines:main` for the contract LIB, `cbf-libmvp-lines:<sheet>` for
   each child. Two jobs: edits survive a reload, and a child LIB's total reaches
   the parent page (the parent reads every stored sheet on mount and re-stamps
   its subcontract lines from them).

   The demo controls own Reset / Clear and drop these keys with
   clearStoredLines(). Every accessor is guarded: a full or blocked store must
   never break the screen. */
export const LINES_KEY_PREFIX = 'cbf-libmvp-lines:';

export interface StoredBudget {
  lines: Line[];
  /** The budget's default fringe rate, as a fraction. */
  fringePct?: number;
}

const store = () => {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null;
  }
};

export function loadStoredLines(budgetId: string): StoredBudget | null {
  const s = store();
  if (!s) return null;
  try {
    const raw = s.getItem(LINES_KEY_PREFIX + budgetId);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.lines) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveStoredLines(budgetId: string, data: StoredBudget) {
  try {
    store()?.setItem(LINES_KEY_PREFIX + budgetId, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

/** Every budget id with stored lines in this tab. */
export function storedBudgetIds(): string[] {
  const s = store();
  if (!s) return [];
  const ids: string[] = [];
  try {
    for (let i = 0; i < s.length; i += 1) {
      const k = s.key(i);
      if (k?.startsWith(LINES_KEY_PREFIX)) ids.push(k.slice(LINES_KEY_PREFIX.length));
    }
  } catch {
    /* ignore */
  }
  return ids;
}

/** Drop every stored budget — the demo's Reset and Clear call this. */
export function clearStoredLines() {
  const s = store();
  if (!s) return;
  storedBudgetIds().forEach((id) => {
    try {
      s.removeItem(LINES_KEY_PREFIX + id);
    } catch {
      /* ignore */
    }
  });
}
