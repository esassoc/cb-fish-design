// LIB import — the workbook path into the Line Item Budget grid.
//
// ── Why there are two ways in ────────────────────────────────────────────────
// Whether Excel import is the primary path with form entry as the fallback, or
// the reverse, is undecided — and for change management the system has to
// support both. So this module turns a workbook's rows into the SAME line
// records the grid's own "Add line" produces, and hands them to the grid. Every
// gate, threshold and derived line then runs on an imported line exactly as it
// does on a typed one: there is one budget model, with two doors into it.
//
// ── What this prototype reads ───────────────────────────────────────────────
// CSV, which every spreadsheet saves as and the browser can parse with no
// library. A real .xlsx needs a workbook parser this prototype does not ship;
// the dialog says so and offers the sample workbook instead of pretending.
//
// Every function here is PURE: rows in, records and per-row findings out. The
// dialog renders the findings; the grid adds the records.

import {
  SHAPES,
  NO_TRIP,
  TRAVEL_KINDS,
  VEHICLE_KINDS,
  VEHICLE_TYPES,
  MEETING_KINDS,
  OTHER_KINDS,
  TIME_UNITS,
  workElements,
  categories,
  positionKey,
  gsaKeyForVehicle,
  gsaRate,
} from './lib-entry.mjs';

/**
 * The template's columns, in order. `key` is the header the parser reads; the
 * label and hint are what the downloaded template's second row explains, so a
 * vendor filling it in never has to come back to this screen to ask.
 */
export const TEMPLATE_COLUMNS = [
  { key: 'category', hint: 'Personnel, Travel, Training, Vehicles, Supplies, Rent, Other or Subcontracts' },
  { key: 'kind', hint: 'Travel, training, vehicle or other kind — e.g. Lodging, M&IE per diem, Subscription, GSA lease, Honorarium' },
  { key: 'description', hint: 'Position title, item, course or cost — what the line is' },
  { key: 'position_type', hint: 'Personnel only: Technical or Administrative' },
  { key: 'staff', hint: 'Personnel only: how many people (default 1)' },
  { key: 'quantity', hint: 'Time per person, count, travelers, months…' },
  { key: 'unit', hint: 'Personnel: hours, days, weeks, months or years. Supplies: any unit' },
  { key: 'quantity_2', hint: 'Travel: nights/days/miles/rides. Mileage: miles per month. Stipend: months' },
  { key: 'travel_days_75', hint: 'M&IE only: first and last travel days, paid at 75%' },
  { key: 'rate', hint: 'Cost per unit. GSA vehicle kinds: leave blank for the GSA rate' },
  { key: 'amount', hint: 'Lump sums only — leave quantity and rate blank' },
  { key: 'fringe_pct', hint: 'Personnel only: leave blank to use the budget default' },
  { key: 'destination', hint: 'Required for travel: City, ST' },
  { key: 'purpose', hint: 'Travel: why the trip happens' },
  { key: 'vehicle_type', hint: 'Vehicles: from the vehicle type list, e.g. ½-ton pickup 4x4, crew cab' },
  { key: 'accounting_code', hint: 'Your own GL or cost code' },
  { key: 'work_elements', hint: 'Split as WE:percent, e.g. B:60; E:40 — must total 100' },
];

/** A sample workbook, so the path can be tried without preparing one. */
export const SAMPLE_ROWS = [
  { category: 'Personnel', description: 'Fish Biologist 2', position_type: 'Technical', staff: '1', quantity: '120', unit: 'hours', rate: '31.50', accounting_code: '5100-10', work_elements: 'B:50; E:50' },
  { category: 'Personnel', description: 'Seasonal Technician', position_type: 'Technical', staff: '1', quantity: '80', unit: 'hours', rate: '16.60', fringe_pct: '22.3', accounting_code: '5100-20', work_elements: 'E:100' },
  { category: 'Travel', kind: 'Car rental', destination: 'Lewiston, ID', purpose: 'Spawning ground surveys on the Clearwater', quantity: '1', quantity_2: '4', rate: '68', accounting_code: '5300', work_elements: 'E:100' },
  { category: 'Travel', kind: 'M&IE per diem', destination: 'Lewiston, ID', purpose: 'Spawning ground surveys on the Clearwater', quantity: '2', quantity_2: '2', travel_days_75: '2', rate: '68', accounting_code: '5300', work_elements: 'E:100' },
  { category: 'Training', kind: 'Registration or tuition', description: 'Electrofishing safety certification', quantity: '2', rate: '350', accounting_code: '5350', work_elements: 'F:100' },
  { category: 'Vehicles', kind: 'Commercial lease (non-GSA)', vehicle_type: 'Midsize SUV 4x4', quantity: '1', rate: '415', accounting_code: '5400', work_elements: 'B:100' },
  { category: 'Supplies', description: 'Hip chain and flagging', quantity: '12', unit: 'kits', rate: '42', work_elements: 'B:100' },
  { category: 'Other', kind: 'Honorarium', description: 'Guest instructor — traditional fishing practices', quantity: '1', rate: '400', accounting_code: '5700', work_elements: 'C:100' },
  { category: 'Vehicles', kind: 'GSA lease', vehicle_type: 'Hovercraft', quantity: '12', accounting_code: '5400', work_elements: 'B:100' },
];

// ── CSV ─────────────────────────────────────────────────────────────────────

/** RFC 4180-ish: quoted fields, doubled quotes, CRLF or LF. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  const src = String(text ?? '').replace(/^﻿/, '');
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') { field += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i += 1;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += ch;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => String(c).trim() !== ''));
}

const csvCell = (v) => {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** The downloadable template: header row, a hint row, then the sample rows. */
export function templateCsv() {
  const keys = TEMPLATE_COLUMNS.map((c) => c.key);
  const lines = [
    keys.join(','),
    TEMPLATE_COLUMNS.map((c) => csvCell(`# ${c.hint}`)).join(','),
    ...SAMPLE_ROWS.slice(0, -1).map((r) => keys.map((k) => csvCell(r[k] ?? '')).join(',')),
  ];
  return lines.join('\r\n') + '\r\n';
}

/** CSV text → row objects keyed by header. Hint rows (first cell "#…") drop out. */
export function rowsFromCsv(text) {
  const [head, ...body] = parseCsv(text);
  if (!head) return [];
  const keys = head.map((h) => String(h).trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''));
  return body
    .filter((r) => !String(r[0] ?? '').trim().startsWith('#'))
    .map((r) => Object.fromEntries(keys.map((k, i) => [k, String(r[i] ?? '').trim()])));
}

// ── Matching a row's words to the model's keys ──────────────────────────────

const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9&½¾]+/g, ' ').trim();

const CATEGORY_WORDS = {
  'personnel-salary': ['personnel', 'salary', 'personnel salary', 'staff', 'labor'],
  travel: ['travel'],
  meetings: ['training', 'meetings', 'professional meetings & training', 'professional meetings training', 'meetings & training'],
  vehicles: ['vehicles', 'vehicle'],
  supplies: ['supplies', 'supplies & equipment', 'supplies equipment', 'equipment'],
  'rent-utilities': ['rent', 'utilities', 'rent & utilities', 'rent utilities'],
  other: ['other', 'other direct costs', 'odc'],
  subcontracts: ['subcontracts', 'subcontract'],
};

export function categoryFromText(text) {
  const t = norm(text);
  if (!t) return null;
  for (const [key, words] of Object.entries(CATEGORY_WORDS)) {
    if (words.map(norm).includes(t)) return key;
  }
  return categories.find((c) => norm(c.label) === t)?.key ?? null;
}

const byWord = (list, text) => {
  const t = norm(text);
  if (!t) return null;
  return list.find((k) => norm(k.key) === t || norm(k.label) === t)
    ?? list.find((k) => norm(k.label).startsWith(t))
    ?? null;
};

/** Numbers as people type them in spreadsheets: "$1,200.50", "35.1%". */
export const numberFrom = (text) => {
  const s = String(text ?? '').trim();
  if (!s) return null;
  const v = parseFloat(s.replace(/[$,%\s]/g, ''));
  return Number.isFinite(v) ? v : NaN;
};

/** "B:60; E:40" → { B: 60, E: 40 }, with what was wrong with it. */
export function allocationFrom(text) {
  const s = String(text ?? '').trim();
  if (!s) return { allocations: {}, note: 'No work-element split. Add one in the grid.' };
  const out = {};
  const ids = new Set(workElements.map((w) => w.id));
  for (const part of s.split(/[;|/]+/)) {
    const [id, p] = part.split(/[:=]/).map((x) => x?.trim());
    if (!id) continue;
    const key = id.toUpperCase();
    const n = numberFrom(p);
    if (!ids.has(key) || n == null || Number.isNaN(n)) {
      return { allocations: {}, note: `“${part.trim()}” isn’t a work element on this contract. Split it in the grid.` };
    }
    out[key] = (out[key] ?? 0) + n;
  }
  const total = Object.values(out).reduce((a, b) => a + b, 0);
  return total === 100
    ? { allocations: out, note: '' }
    : { allocations: out, note: `Split totals ${total}%, not 100%. Fix it in the grid.` };
}

// ── Rows → line records ─────────────────────────────────────────────────────

/**
 * One workbook row → `{ record, status, problem, note, preview }`.
 *   status 'ready'   — it imports
 *   status 'check'   — it imports, and something on it needs a look in the grid
 *                      (the same thing the grid's own gates would say)
 *   status 'skip'    — it cannot become a line; `problem` says why
 * A skipped row never half-imports: either the line it describes exists, or
 * the vendor is told exactly what stopped it.
 */
export function recordFromRow(row) {
  const category = categoryFromText(row.category);
  const desc = (row.description ?? '').trim();
  const code = (row.accounting_code ?? '').trim();
  const nums = {};
  for (const k of ['staff', 'quantity', 'quantity_2', 'travel_days_75', 'rate', 'amount', 'fringe_pct']) {
    nums[k] = numberFrom(row[k]);
    if (Number.isNaN(nums[k])) return skip(row, `“${row[k]}” in ${k.replace(/_/g, ' ')} is not a number.`);
  }
  if (!category) return skip(row, row.category ? `“${row.category}” is not a LIB category.` : 'Category is blank.');
  if (category === 'personnel-fringe') return skip(row, 'Fringe lines are generated from salary. Put the rate in the salary row’s fringe_pct column.');
  const { allocations, note: allocNote } = allocationFrom(row.work_elements);
  const notes = allocNote ? [allocNote] : [];
  const base = { allocations, acctCode: code || undefined };
  let record;

  if (category === 'personnel-salary') {
    if (!desc) return skip(row, 'A personnel line needs a position title.');
    const unitWord = norm(row.unit || 'months');
    const unit = TIME_UNITS.find((u) => norm(u.plural) === unitWord || norm(u.label) === unitWord || norm(u.key) === unitWord);
    if (!unit) return skip(row, `“${row.unit}” is not a time unit — use hours, days, weeks, months or years.`);
    const admin = norm(row.position_type).startsWith('admin');
    record = {
      ...base, category, block: admin ? 'admin' : 'technical', shape: SHAPES.QTY_RATE,
      label: desc, staffKey: positionKey(desc), staff: Math.max(1, Math.round(nums.staff ?? 1)),
      qty: nums.quantity ?? 0, timeUnit: unit.key, qtyUnit: unit.plural, rate: nums.rate ?? 0,
    };
    if (nums.fringe_pct != null) record.fringePct = nums.fringe_pct / 100;
  } else if (category === 'travel') {
    const k = byWord(TRAVEL_KINDS, row.kind);
    if (!k) return skip(row, row.kind ? `“${row.kind}” is not a travel kind.` : 'A travel line needs a kind — lodging, M&IE per diem, airfare…');
    if (!(row.destination ?? '').trim()) notes.push('No destination. Add one in the grid.');
    record = {
      ...base, category, block: NO_TRIP, shape: SHAPES.TRAVEL, kind: k.key, trip: null,
      locality: (row.destination ?? '').trim(), purpose: (row.purpose ?? '').trim() || undefined,
      count: nums.quantity ?? 1, rate: nums.rate ?? 0,
    };
    if (k.durationLabel) record.duration = nums.quantity_2 ?? (k.partialRate ? 0 : 1);
    if (k.partialRate) record.partialDays = nums.travel_days_75 ?? 0;
    if (k.vendorDefined) record.desc = desc;
  } else if (category === 'meetings' || category === 'other') {
    const list = category === 'meetings' ? MEETING_KINDS : OTHER_KINDS;
    const k = byWord(list, row.kind) ?? list.find((x) => x.vendorDefined);
    if (!desc) return skip(row, 'Description is blank.');
    const lump = nums.amount != null && nums.quantity == null && nums.rate == null;
    if (lump && category === 'other') {
      record = { ...base, category, shape: SHAPES.LUMP, kind: 'other', label: desc, amount: nums.amount };
    } else {
      record = {
        ...base, category, shape: SHAPES.QTY_RATE, kind: k.key, label: desc,
        qty: nums.quantity ?? 1, rate: nums.rate ?? 0,
      };
      if (!k.unit) record.qtyUnit = (row.unit ?? '').trim();
      if (k.secondUnit) record.qty2 = nums.quantity_2 ?? 1;
    }
    if (!byWord(list, row.kind) && row.kind) notes.push(`“${row.kind}” isn’t a standard kind, so it imports as vendor-defined.`);
  } else if (category === 'vehicles') {
    const k = byWord(VEHICLE_KINDS, row.kind);
    if (!k) return skip(row, row.kind ? `“${row.kind}” is not a vehicle kind.` : 'A vehicle line needs a kind — GSA lease, motor pool, fuel…');
    const t = byWord(VEHICLE_TYPES, row.vehicle_type);
    if (k.needsType && !t) {
      return skip(row, row.vehicle_type
        ? `“${row.vehicle_type}” is not on the vehicle type list.`
        : 'This vehicle kind needs a vehicle type from the list.');
    }
    record = {
      ...base, category, shape: k.shape, kind: k.key, vehicleType: t?.key,
      qty: nums.quantity ?? 1, qtyUnit: k.unit ?? (row.unit ?? '').trim(),
    };
    if (k.secondUnit) record.qty2 = nums.quantity_2 ?? 1;
    if (k.vendorDefined) record.desc = desc;
    if (k.shape === SHAPES.AUTHORITY) {
      const g = gsaRate(gsaKeyForVehicle(k.key, t?.key));
      if (nums.rate != null && g && nums.rate !== g.rate) {
        record.rateOverride = nums.rate;
        notes.push(`Uses your $${nums.rate} rate instead of the $${g.rate} GSA rate. The COR will see this.`);
      }
    } else {
      record.rate = nums.rate ?? 0;
    }
  } else if (category === 'supplies') {
    if (!desc) return skip(row, 'Description is blank.');
    const lump = nums.amount != null && nums.quantity == null;
    record = lump
      ? { ...base, category, block: 'expensed', shape: SHAPES.LUMP, label: desc, amount: nums.amount }
      : { ...base, category, block: 'expensed', shape: SHAPES.QTY_RATE, label: desc,
          qty: nums.quantity ?? 1, qtyUnit: (row.unit ?? '').trim() || 'units', rate: nums.rate ?? 0 };
  } else if (category === 'rent-utilities') {
    if (!desc) return skip(row, 'Description is blank.');
    record = { ...base, category, shape: SHAPES.QTY_RATE, label: desc, qty: nums.quantity ?? 12, qtyUnit: 'months', rate: nums.rate ?? 0 };
  } else if (category === 'subcontracts') {
    if (!desc) return skip(row, 'Description is blank.');
    if (nums.amount == null) return skip(row, 'A subcontract needs an amount.');
    record = { ...base, category, shape: SHAPES.LUMP, label: desc, amount: nums.amount };
    notes.push('Build its itemized sheet in the grid.');
  }

  if (!code) notes.push('No accounting code.');
  return {
    record,
    status: notes.length ? 'check' : 'ready',
    problem: '',
    note: notes.join(' '),
    preview: previewOf(row, category),
  };
}

function skip(row, problem) {
  return { record: null, status: 'skip', problem, note: '', preview: previewOf(row, categoryFromText(row.category)) };
}

function previewOf(row, category) {
  const cat = categories.find((c) => c.key === category);
  const name = (row.description ?? '').trim() || (row.kind ?? '').trim() || '—';
  const qty = [row.quantity, row.unit, row.quantity_2 && `× ${row.quantity_2}`].filter(Boolean).join(' ');
  return {
    category: cat?.label ?? (row.category || '—'),
    name: row.vehicle_type ? `${name} — ${row.vehicle_type}` : name,
    qty: qty || (row.amount ? 'Lump sum' : '—'),
    rate: row.rate || row.amount || '',
    code: row.accounting_code || '',
  };
}

/** A whole workbook's rows → the findings, plus the records ready to add. */
export function importRows(rows) {
  const results = rows.map(recordFromRow);
  return {
    results,
    records: results.filter((r) => r.record).map((r) => r.record),
    counts: {
      ready: results.filter((r) => r.status === 'ready').length,
      check: results.filter((r) => r.status === 'check').length,
      skip: results.filter((r) => r.status === 'skip').length,
    },
  };
}
