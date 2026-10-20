// The contract workflow view — where a contract opens (IA doc, "The contract
// workflow view"). The rows are the contract's scope (its work elements); the
// columns are the tracks each one moves through. Contract-wide tracks (invoices,
// an open CCR) sit above the grid, and during setup, issuance and closeout a stage
// strip sits above those.
//
// Every cell is something CBFish would DERIVE from records (EC clearances, LIB
// allocations and expenditures, accepted status reports, milestone dates), never
// typed status. When CBFish can't know who's up (a handoff by email, a step on the
// NS side), the cell says what it does know.
//
// Keyed by the demo states in contract-shell.mjs, so switching state moves the
// tracks, the strip and the cells that depend on it. INVENTED for the prototype,
// but the money reconciles: WE allocations sum to the contract value ($312,500)
// and spending to the expenditures in the contract summary ($118,406).

import { workElements } from './lib-entry.mjs';
import { TODAY, shortDate } from './contract-shell.mjs';

/** The grid's columns, left to right. `section` is where a cell in it links. */
export const COLUMNS = [
  { key: 'ec', label: 'Environmental compliance', section: 'compliance/environmental' },
  { key: 'budget', label: 'Budget', section: 'budget/we-budgets' },
  { key: 'reporting', label: 'Reporting', section: 'reporting/status-reports' },
  { key: 'milestones', label: 'Milestones', section: 'reporting/milestones' },
];

const k = (n) => `$${Math.round(n / 100) / 10}k`;
const money = (spent, alloc) => ({ text: `${k(spent)} of ${k(alloc)}`, pct: spent / alloc });

/** Days between an ISO date and TODAY. */
export const daysSince = (iso) =>
  Math.round((Date.parse(TODAY) - Date.parse(iso)) / 86_400_000);

// tone: 'done' | 'active' | 'waiting' | 'late' | 'none' — every status is ALSO in
// words; tone only picks the badge variant.
const BASE = {
  119: {
    ec: { text: 'Not needed', tone: 'none' },
    budget: money(14_200, 28_000),
    reporting: { text: 'Not reported', tone: 'none' },
    milestones: { text: '2 of 4 done', tone: 'active' },
  },
  157: {
    ec: { text: 'Cleared', tone: 'done' },
    budget: money(41_800, 96_000),
    reporting: { text: 'Q3 accepted', tone: 'done' },
    milestones: { text: 'On track', tone: 'active' },
  },
  165: {
    ec: { text: 'Not needed', tone: 'none' },
    budget: money(6_100, 12_000),
    reporting: { text: 'Not reported', tone: 'none' },
    milestones: { text: '1 of 1 done', tone: 'done' },
  },
  185: {
    ec: { text: 'Not needed', tone: 'none' },
    budget: money(2_900, 8_500),
    reporting: { text: 'Q3 accepted', tone: 'done' },
    milestones: { text: 'Q4 due Jan 30', tone: 'active' },
  },
  60: {
    ec: { text: 'Cleared', tone: 'done' },
    budget: money(49_600, 142_000),
    reporting: { text: 'Q3 accepted', tone: 'done' },
    milestones: { text: '3 of 6 done', tone: 'active' },
  },
  99: {
    ec: { text: `EC review, ${daysSince('2026-10-11')} days`, tone: 'waiting', note: 'Waiting on the EC Lead' },
    budget: money(3_800, 26_000),
    reporting: { text: 'Not started', tone: 'none' },
    milestones: { text: '0 of 2; event May 2027', tone: 'none' },
  },
};

// Per-state overrides: only the cells the state actually moves.
const OVERRIDES = {
  'vendor-action': {
    185: { reporting: { text: 'Q3 overdue', tone: 'late', note: 'Due Oct 15, vendor' } },
  },
  'cor-action': {},
  bpa: {},
  quiet: {},
  closeout: {
    185: { reporting: { text: 'Final report due Nov 30', tone: 'active' } },
    60: { milestones: { text: '6 of 6 done', tone: 'done' } },
    119: { milestones: { text: '4 of 4 done', tone: 'done' } },
  },
};

// Where each WE happens and what it's for: Locations and Focal species are
// weak-scent pages, so they live on the row their parent (the WE) predicts.
const WHERE = {
  119: { location: 'Contract-wide' },
  157: { location: 'Rock Creek weir', species: 'Spring Chinook' },
  165: { location: 'Rock Creek acclimation site', species: 'Spring Chinook' },
  185: { location: 'Contract-wide' },
  60: { location: 'Rock Creek acclimation site', species: 'Spring Chinook' },
  99: { location: 'Grande Ronde subbasin' },
};

/** The work element grid for a state: one row per WE, cells keyed by column. */
export function gridFor(stateKey) {
  const o = OVERRIDES[stateKey] ?? {};
  return workElements.map((we) => ({
    code: we.code,
    title: we.title,
    ...WHERE[we.code],
    cells: { ...BASE[we.code], ...(o[we.code] ?? {}) },
  }));
}

// ── Contract-wide tracks, above the grid ──────────────────────────────────────
// One card each: the latest item, who's up, and for how long. The CCR card shows
// only while a CCR is open.

const waiting = (who, since) => ({ who, since, days: daysSince(since), when: shortDate(since) });

const TRACKS = {
  'vendor-action': [
    { key: 'invoices', label: 'Invoices', item: 'Invoice 4 (September)', status: 'Approved Oct 12', tone: 'done', target: 'invoices/invoices' },
  ],
  'cor-action': [
    { key: 'invoices', label: 'Invoices', item: 'Invoice 4 (September)', status: 'Waiting on the COR', tone: 'waiting', up: waiting('cor', '2026-10-17'), target: 'invoices/invoices' },
  ],
  bpa: [
    { key: 'invoices', label: 'Invoices', item: 'Invoice 4 (September)', status: 'Approved Oct 12', tone: 'done', target: 'invoices/invoices' },
    {
      key: 'ccr',
      label: 'Change request',
      item: 'CCR 3: travel line added',
      status: 'Sent to the contracting officer Oct 14; no update since',
      tone: 'waiting',
      up: waiting('bpa', '2026-10-14'),
      target: 'changes/ccrs',
    },
  ],
  quiet: [
    { key: 'invoices', label: 'Invoices', item: 'Invoice 4 (September)', status: 'Approved Oct 12', tone: 'done', target: 'invoices/invoices' },
  ],
  closeout: [
    { key: 'invoices', label: 'Invoices', item: 'Final invoice', status: 'Waits on the final report', tone: 'none', target: 'invoices/invoices' },
  ],
};

/** "you" / the party's name, for the viewing role. */
export const whoLabel = (up, role, c) =>
  up.who === role ? 'you' : up.who === 'vendor' ? c.vendor : up.who === 'cor' ? 'the COR' : 'BPA';

export const tracksFor = (stateKey) => TRACKS[stateKey] ?? [];

// ── The stage strip: only while the work is sequential ─────────────────────────
// Implementation is a rhythm that lasts years, so it gets a phase LABEL, not a
// strip. Setup, issuance and closeout are steps with handoffs, so they get one.
// Gates show as upcoming conditions, not errors at the end.

const CLOSEOUT = {
  label: 'Closeout',
  steps: [
    { key: 'final-report', label: 'Final report', status: 'current', who: 'vendor', due: 'Nov 30' },
    { key: 'property', label: 'Property disposition', status: 'current', who: 'vendor', due: 'Nov 15' },
    { key: 'final-invoice', label: 'Final invoice', status: 'upcoming', gate: 'Opens once the final report is accepted' },
    { key: 'checks', label: 'Closeout checks', status: 'upcoming', gate: 'COR and contracting officer' },
    { key: 'closed', label: 'Closed', status: 'upcoming' },
  ],
};

/** { strip } during sequential phases, { label } during implementation. */
export function phaseViewFor(stateKey, period) {
  if (stateKey === 'closeout') return { strip: CLOSEOUT };
  return { label: `Implementation, ${period.charAt(0).toLowerCase()}${period.slice(1)}` };
}
