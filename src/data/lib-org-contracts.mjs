// Other contracts the sponsor organization manages — the source for "Copy lines
// from another contract" on the LIB grid.
//
// ── Why copy from another contract ──────────────────────────────────────────
// Most of a LIB is not new each year. The same positions, the same field crew
// travel, the same lease and the same supplies recur across an organization's
// contracts — last year's continuation above all — and retyping them is where
// typos and stale rates come from. So any section of the grid can pull lines from
// another contract the same organization manages, pick which ones, and bring
// them in as ordinary lines that every check then runs on.
//
// What does NOT come across, and why:
//   · work-element (WSE) splits — a WSE belongs to its own contract's SOW, so a
//     copied line arrives unallocated and the allocation check holds it until it
//     is split across THIS contract's WSEs
//   · trips — a copied travel line arrives on its own, carrying its destination
//     and purpose, because the source contract's trips are not this one's
//   · subcontract sheets — the lump comes across; its itemized sheet does not
//
// INVENTED, NOT DERIVED. Contract numbers, project numbers and every figure here
// are fictional, in the same voice as src/data/lib-entry.mjs. Lines use the same
// shape as `costLines` there, so the grid adds them through the same door the
// Excel import uses.

import { SHAPES, NO_TRIP, contract, categories } from './lib-entry.mjs';

export const ORG_CONTRACTS = [
  {
    id: 'cr-398512',
    number: 'CR-398512',
    project: '2019-402-00',
    title: 'Rock Creek Spring Chinook Supplementation Program',
    fiscalYear: 'FY2026',
    status: 'Issued',
    relation: 'Previous contract on this project',
    lines: [
      { category: 'personnel-salary', block: 'technical', shape: SHAPES.QTY_RATE, label: 'Natural Resource Spec. 3', staffKey: 'natural-resource-spec-3', qty: 12, timeUnit: 'month', qtyUnit: 'months', rate: 4_560, acctCode: '5100-10' },
      { category: 'personnel-salary', block: 'technical', shape: SHAPES.QTY_RATE, label: 'Fish Biologist 2', staffKey: 'fish-biologist-2', qty: 6, timeUnit: 'month', qtyUnit: 'months', rate: 5_050, acctCode: '5100-10' },
      { category: 'personnel-salary', block: 'technical', shape: SHAPES.QTY_RATE, label: 'Seasonal Technician', staffKey: 'seasonal-technician', staff: 3, qty: 320, timeUnit: 'hour', qtyUnit: 'hours', rate: 16.1, fringePct: 0.223, acctCode: '5100-20' },
      { category: 'personnel-salary', block: 'admin', shape: SHAPES.QTY_RATE, label: 'Grants Coordinator', staffKey: 'grants-coordinator', qty: 2, timeUnit: 'month', qtyUnit: 'months', rate: 3_900, acctCode: '5100-30' },
      { category: 'travel', shape: SHAPES.TRAVEL, kind: 'lodging', travelKind: 'lodging', locality: 'Portland, OR', purpose: 'Basin coordination meetings with co-managers', count: 2, duration: 1, rate: 182, acctCode: '5300' },
      { category: 'travel', shape: SHAPES.TRAVEL, kind: 'mie', travelKind: 'mie', locality: 'Portland, OR', purpose: 'Basin coordination meetings with co-managers', count: 3, duration: 0, partialDays: 2, rate: 79, acctCode: '5300' },
      { category: 'travel', shape: SHAPES.TRAVEL, kind: 'mileage', travelKind: 'mileage', locality: 'Rock Creek, WA', purpose: 'Routine runs to the weir and screw trap sites', count: 1, duration: 600, rate: 0.67, acctCode: '5300' },
      { category: 'meetings', shape: SHAPES.QTY_RATE, kind: 'registration', meetingKind: 'registration', label: 'Annual fisheries society meeting — registration', qty: 2, qtyUnit: 'registrations', rate: 450, acctCode: '5350' },
      { category: 'vehicles', shape: SHAPES.AUTHORITY, kind: 'lease', vehicleKind: 'lease', vehicleType: 'pickup-half-crew-4x4', qty: 12, qtyUnit: 'months', acctCode: '5400' },
      { category: 'vehicles', shape: SHAPES.QTY_RATE, kind: 'fuel', vehicleKind: 'fuel', vehicleType: 'pickup-half-crew-4x4', qty: 12, qtyUnit: 'months', rate: 195, acctCode: '5400' },
      { category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE, label: 'PIT tags', qty: 2_000, qtyUnit: 'tags', rate: 2.3, acctCode: '5510' },
      { category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE, label: 'Tagging syringes', qty: 100, qtyUnit: 'units', rate: 29, acctCode: '5510' },
      { category: 'supplies', block: 'expensed', shape: SHAPES.LUMP, label: 'Waders, nets, and sampling kits', amount: 4_800 },
      { category: 'rent-utilities', shape: SHAPES.QTY_RATE, label: 'Office space', qty: 12, qtyUnit: 'months', rate: 875, acctCode: '5600' },
      { category: 'rent-utilities', shape: SHAPES.QTY_RATE, label: 'Propane — hatchery building', qty: 8, qtyUnit: 'months', rate: 190 },
      { category: 'other', shape: SHAPES.QTY_RATE, kind: 'honorarium', otherKind: 'honorarium', label: 'Elder honoraria — cultural resource review', qty: 3, qtyUnit: 'recipients', rate: 250, acctCode: '5700' },
      { category: 'subcontracts', shape: SHAPES.LUMP, label: 'Genetics laboratory analysis', amount: 26_500, acctCode: '5800' },
    ],
  },
  {
    id: 'c-84102',
    number: '84102 REL 3',
    project: '2008-104-00',
    title: 'Rock Creek Habitat Restoration',
    fiscalYear: 'FY2027',
    status: 'Issued',
    relation: 'Another project managed by the same organization',
    lines: [
      { category: 'personnel-salary', block: 'technical', shape: SHAPES.QTY_RATE, label: 'Restoration Ecologist', staffKey: 'restoration-ecologist', qty: 9, timeUnit: 'month', qtyUnit: 'months', rate: 5_300, acctCode: '5100-40' },
      { category: 'personnel-salary', block: 'technical', shape: SHAPES.QTY_RATE, label: 'Seasonal Technician', staffKey: 'seasonal-technician', staff: 2, qty: 400, timeUnit: 'hour', qtyUnit: 'hours', rate: 16.6, fringePct: 0.223, acctCode: '5100-20' },
      { category: 'travel', shape: SHAPES.TRAVEL, kind: 'car-rental', travelKind: 'car-rental', locality: 'Yakima, WA', purpose: 'Site visits to planting units', count: 1, duration: 6, rate: 72, acctCode: '5300' },
      { category: 'travel', shape: SHAPES.TRAVEL, kind: 'lodging', travelKind: 'lodging', locality: 'Yakima, WA', purpose: 'Site visits to planting units', count: 1, duration: 5, rate: 118, acctCode: '5300' },
      { category: 'meetings', shape: SHAPES.QTY_RATE, kind: 'registration', meetingKind: 'registration', label: 'Riparian planting certification', qty: 2, qtyUnit: 'registrations', rate: 325, acctCode: '5350' },
      { category: 'vehicles', shape: SHAPES.QTY_RATE, kind: 'motor-pool', vehicleKind: 'motor-pool', vehicleType: 'utility-body', qty: 4, qtyUnit: 'months', rate: 530, acctCode: '5400' },
      { category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE, label: 'Native plant plugs', qty: 3_000, qtyUnit: 'plugs', rate: 1.85, acctCode: '5520' },
      { category: 'supplies', block: 'expensed', shape: SHAPES.QTY_RATE, label: 'Erosion control fabric', qty: 40, qtyUnit: 'rolls', rate: 96, acctCode: '5520' },
      { category: 'other', shape: SHAPES.QTY_RATE, kind: 'honorarium', otherKind: 'honorarium', label: 'Tribal cultural monitor honoraria', qty: 2, qtyUnit: 'recipients', rate: 300, acctCode: '5700' },
    ],
  },
];

/** The organization the copy is scoped to — the sponsor of THIS contract. */
export const managingOrg = () => contract.sponsor;

/** Other contracts that have lines in a section, for that section's picker. */
export const contractsWithLinesIn = (catKey) =>
  ORG_CONTRACTS.filter((c) => c.lines.some((l) => l.category === catKey));

export const orgContract = (id) => ORG_CONTRACTS.find((c) => c.id === id);

/**
 * One source line → the record the grid's import door adds. The id goes (the
 * grid assigns its own), the split goes (WSEs are per contract), a travel line
 * leaves its trip, and the subcontract sheet does not follow its lump.
 */
export const copyRecordOf = (l) => {
  const { kind = '', ...rest } = l;
  const rec = { ...rest, kind, allocations: {} };
  if (l.shape === SHAPES.TRAVEL) { rec.block = NO_TRIP; rec.trip = null; }
  delete rec.sheet;
  delete rec.id;
  return rec;
};

/** The section label a copy dialog names. */
export const sectionLabel = (catKey) => categories.find((c) => c.key === catKey)?.label ?? catKey;
