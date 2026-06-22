// Single source of truth for the COR (BPA Contracting Officer's Representative)
// invoice-review experience: the urgency-triaged review queue and the per-invoice
// detail page. A COR is assigned invoices across MULTIPLE vendors and contracts,
// must act within a fixed review window, then Approves or Returns for revision.
//
// Grounded in the CBFish OOUX object map (FigJam EEPyq8D8): the Contract object
// carries Current Contract Value + Expenditures (aggregated, incl. accruals, with
// an as-of date) — the money context a COR needs to judge an invoice. The COR's
// mapped verbs are Review → Approve / Reject. "review-by / days remaining" and the
// "final invoice" flag are NOT yet modeled in the object map; they are introduced
// here (the real-world SLA constraint + the wizard's final-invoice flag) so the
// queue's urgency triage and the detail callout are real.
//
// Deterministic, fictional, domain-credible mock data — vendors, amounts, and
// contract figures are invented, NOT derived from any client document. Line-item
// totals sum to `amount`; performance period precedes the invoice date, which
// precedes submission; expended + remaining never exceed the contract value.

import { fmtExact, fmtCompact } from './vendor-portal-invoices.mjs';
export { fmtExact, fmtCompact };

/**
 * @typedef {'Submitted' | 'In review' | 'Returned' | 'Approved'} ReviewStage
 * @typedef {{ description: string; qty: number; unitPrice: number }} LineItem
 * @typedef {{
 *   number: string; vendor: string; contract: string; project: string;
 *   submitted: string; reviewBy: string; daysRemaining: number;
 *   amount: number; stage: ReviewStage; final: boolean;
 *   invoiceDate: string; perfStart: string; perfEnd: string;
 *   billTo: string; lineItems: LineItem[]; notes?: string; pdfName: string;
 *   contractValue: number; expended: number; remaining: number; asOf: string;
 * }} ReviewInvoice
 */

/** The signed-in reviewer. In production this comes from the authenticated COR. */
export const reviewer = {
  name: 'James Whitfield',
  role: 'Contracting Officer’s Representative',
  org: 'Bonneville Power Administration',
};

/** Review window, in calendar days, the COR is allotted to act on a submitted invoice. */
export const reviewWindowDays = 30;

/**
 * The COR's assigned invoices. `daysRemaining` is stored (not computed) so the mock
 * is deterministic — negative = past the review-by date (overdue). Submitted and
 * In review are the actionable queue; Returned and Approved give recent context.
 * @type {ReviewInvoice[]}
 */
export const reviewQueue = [
  {
    number: 'INV-2026-0051', vendor: 'Pacific Environmental Services, LLC',
    contract: 'Salmon Habitat Restoration — Wenatchee', project: 'Wenatchee Subbasin',
    submitted: 'Jun 19, 2026', reviewBy: 'Jun 24, 2026', daysRemaining: 2,
    amount: 6120, stage: 'Submitted', final: false,
    invoiceDate: 'Jun 17, 2026', perfStart: 'Jun 1, 2026', perfEnd: 'Jun 15, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0051-PacificEnv.pdf',
    lineItems: [
      { description: 'Field biologist labor', qty: 52, unitPrice: 95 },
      { description: 'Habitat survey equipment rental', qty: 1, unitPrice: 650 },
      { description: 'Field mileage', qty: 940, unitPrice: 0.5 },
    ],
    contractValue: 420_000, expended: 318_400, remaining: 101_600, asOf: 'Jun 21, 2026',
  },
  {
    number: 'INV-2026-0049', vendor: 'Cascade Fisheries Consulting',
    contract: 'Smolt Survival Telemetry Study', project: 'Mainstem Survival',
    submitted: 'Jun 15, 2026', reviewBy: 'Jun 23, 2026', daysRemaining: 1,
    amount: 12_480, stage: 'In review', final: false,
    invoiceDate: 'Jun 10, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 31, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0049-Cascade.pdf',
    notes: 'Receivers redeployed after the spring high-water event; deployment hours above baseline.',
    lineItems: [
      { description: 'Acoustic telemetry tag deployment', qty: 64, unitPrice: 135 },
      { description: 'Receiver maintenance & retrieval', qty: 18, unitPrice: 100 },
      { description: 'Data analysis', qty: 16, unitPrice: 120 },
    ],
    contractValue: 680_000, expended: 612_300, remaining: 67_700, asOf: 'Jun 21, 2026',
  },
  {
    number: 'INV-2026-0047', vendor: 'Methow Restoration Partners',
    contract: 'Riparian Vegetation Monitoring — Methow', project: 'Methow Subbasin',
    submitted: 'May 28, 2026', reviewBy: 'Jun 20, 2026', daysRemaining: -2,
    amount: 3960, stage: 'In review', final: false,
    invoiceDate: 'May 22, 2026', perfStart: 'Apr 1, 2026', perfEnd: 'Apr 30, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0047-Methow.pdf',
    lineItems: [
      { description: 'Vegetation transect monitoring', qty: 30, unitPrice: 110 },
      { description: 'Data processing & reporting', qty: 6, unitPrice: 110 },
    ],
    contractValue: 240_000, expended: 196_800, remaining: 43_200, asOf: 'Jun 21, 2026',
  },
  {
    number: 'INV-2026-0046', vendor: 'Pacific Environmental Services, LLC',
    contract: 'Hatchery Supplementation — Entiat', project: 'Entiat Subbasin',
    submitted: 'Jun 18, 2026', reviewBy: 'Jul 5, 2026', daysRemaining: 13,
    amount: 2280, stage: 'Submitted', final: false,
    invoiceDate: 'Jun 12, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 31, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0046-PacificEnv.pdf',
    lineItems: [
      { description: 'Broodstock collection labor', qty: 22, unitPrice: 95 },
      { description: 'Field supplies', qty: 1, unitPrice: 190 },
    ],
    contractValue: 180_000, expended: 88_500, remaining: 91_500, asOf: 'Jun 21, 2026',
  },
  {
    number: 'INV-2026-0044', vendor: 'Okanogan Water Sciences',
    contract: 'Water Quality Sampling — Okanogan', project: 'Okanogan Subbasin',
    submitted: 'Jun 16, 2026', reviewBy: 'Jul 1, 2026', daysRemaining: 9,
    amount: 18_750, stage: 'Submitted', final: true,
    invoiceDate: 'Jun 14, 2026', perfStart: 'Apr 1, 2026', perfEnd: 'Jun 13, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0044-Okanogan-FINAL.pdf',
    notes: 'Final invoice — closes out the FY26 sampling contract. Includes the held-back retainage.',
    lineItems: [
      { description: 'Water sample collection', qty: 120, unitPrice: 85 },
      { description: 'Lab analysis', qty: 60, unitPrice: 115 },
      { description: 'Final report & data deliverable', qty: 1, unitPrice: 1650 },
    ],
    contractValue: 96_000, expended: 77_250, remaining: 18_750, asOf: 'Jun 21, 2026',
  },
  {
    number: 'INV-2026-0041', vendor: 'Cascade Fisheries Consulting',
    contract: 'Smolt Survival Telemetry Study', project: 'Mainstem Survival',
    submitted: 'Jun 5, 2026', reviewBy: 'Jun 28, 2026', daysRemaining: 6,
    amount: 4310, stage: 'Returned', final: false,
    invoiceDate: 'May 30, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 31, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0041-Cascade.pdf',
    notes: 'Returned Jun 8 — receiver-maintenance line lacks a supporting field log; mileage exceeds the approved rate.',
    lineItems: [
      { description: 'Receiver maintenance', qty: 22, unitPrice: 100 },
      { description: 'Field mileage', qty: 1200, unitPrice: 0.62 },
    ],
    contractValue: 680_000, expended: 612_300, remaining: 67_700, asOf: 'Jun 21, 2026',
  },
  {
    number: 'INV-2026-0038', vendor: 'Pacific Environmental Services, LLC',
    contract: 'Salmon Habitat Restoration — Wenatchee', project: 'Wenatchee Subbasin',
    submitted: 'May 29, 2026', reviewBy: 'Jun 21, 2026', daysRemaining: -1,
    amount: 5210, stage: 'Approved', final: false,
    invoiceDate: 'May 24, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 15, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0038-PacificEnv.pdf',
    lineItems: [
      { description: 'Field biologist labor', qty: 44, unitPrice: 95 },
      { description: 'Habitat survey equipment rental', qty: 1, unitPrice: 650 },
      { description: 'Field mileage', qty: 760, unitPrice: 0.5 },
    ],
    contractValue: 420_000, expended: 318_400, remaining: 101_600, asOf: 'Jun 21, 2026',
  },
];

/** Stages that sit in the COR's actionable queue (awaiting their decision). */
export const openStages = ['Submitted', 'In review'];

/**
 * Urgency bucket for a review-by countdown.
 * overdue: past the date · due-soon: 0–3 days left · on-track: 4+ days left.
 */
export function urgencyOf(daysRemaining) {
  if (daysRemaining < 0) return 'overdue';
  if (daysRemaining <= 3) return 'due-soon';
  return 'on-track';
}

/** Human "days remaining" phrasing for a countdown chip/cell. */
export function daysLabel(daysRemaining) {
  if (daysRemaining < 0) {
    const d = Math.abs(daysRemaining);
    return `${d} day${d === 1 ? '' : 's'} overdue`;
  }
  if (daysRemaining === 0) return 'Due today';
  return `${daysRemaining} day${daysRemaining === 1 ? '' : 's'} left`;
}

/** Triage counts across the actionable queue — feeds the urgency strip. */
export function deriveTriage(list = reviewQueue) {
  const open = list.filter((i) => openStages.includes(i.stage));
  const by = (u) => open.filter((i) => urgencyOf(i.daysRemaining) === u);
  return {
    open: open.length,
    overdue: by('overdue').length,
    dueSoon: by('due-soon').length,
    onTrack: by('on-track').length,
    awaitingAmount: open.reduce((t, i) => t + i.amount, 0),
  };
}

/** Find one invoice by its number (detail-page lookup). */
export function findInvoice(number, list = reviewQueue) {
  return list.find((i) => i.number === number) ?? null;
}
