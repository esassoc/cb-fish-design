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

import { fmtExact, fmtCompact } from './vendor-dashboard-invoices.mjs';
export { fmtExact, fmtCompact };

/**
 * @typedef {'Submitted' | 'In review' | 'Returned' | 'Approved'} ReviewStage
 * @typedef {{ description: string; qty: number; unitPrice: number }} LineItem
 * @typedef {{
 *   number: string; vendor: string;
 *   contract: string; contractNumber: string; project: string; projectNumber: string;
 *   submitted: string; reviewBy: string; daysRemaining: number; netTerms: string;
 *   amount: number; stage: ReviewStage; final: boolean;
 *   invoiceDate: string; perfStart: string; perfEnd: string;
 *   contractStart: string; contractEnd: string;
 *   billTo: string; lineItems: LineItem[]; notes?: string; pdfName: string;
 *   supportingDocs: string[];
 *   contractValue: number; expended: number; remaining: number; asOf: string;
 *   assetSuite: string;
 *   inStatusDays: number;
 * }} ReviewInvoice
 *
 * `contractNumber` / `projectNumber` are the reference IDs a COR transcribes into
 * Asset Suite and other systems; `contractStart` / `contractEnd` are the contract's
 * period-of-performance START and END dates, stated EXPLICITLY (not inferred from the
 * invoice's own performance period) so the COR can place this invoice on the contract's
 * full timeline and see how close the work runs to the contract's close; `netTerms` is
 * the vendor's payment terms. All five are merged onto each record from the by-name
 * lookup below.
 *
 * `pdfName` is the invoice document the vendor submitted; `supportingDocs` are the
 * extra files they attached (timesheets, receipts, reports). The COR downloads any
 * one of them or all at once. Fictional filenames — no real blobs exist.
 *
 * `assetSuite` is the Asset Suite processing status string, refreshed via nightly feed:
 *   - 'Not sent'                      → Submitted / In review / Returned stages
 *   - 'Processing — sent <Mon D>'     → Approved, payment in transit
 *   - 'Paid <Mon D>'                  → Approved, payment confirmed
 * `inStatusDays` is the number of calendar days the invoice has been in its current
 * stage (stored deterministic int, consistent with submitted/reviewBy dates).
 */

/** The signed-in reviewer. In production this comes from the authenticated COR. */
export const reviewer = {
  name: 'James Whitfield',
  role: 'Contracting Officer’s Representative',
  org: 'Bonneville Power Administration',
};

/** Review window, in calendar days, the COR is allotted to act on a submitted invoice. */
export const reviewWindowDays = 30;

/** The as-of date for the most recent Asset Suite nightly payment-status feed. */
export const assetSuiteFeedAsOf = 'Jun 21, 2026';

/**
 * The COR's assigned invoices. `daysRemaining` is stored (not computed) so the mock
 * is deterministic — negative = past the review-by date (overdue). Submitted and
 * In review are the actionable queue; Returned and Approved give recent context.
 * (Base records; the contract/project reference numbers, contract end date, and net
 * terms are merged on by name in the `reviewQueue` export below.)
 */
const reviewQueueBase = [
  {
    number: 'INV-2026-0051', vendor: 'Pacific Environmental Services, LLC',
    contract: 'Salmon Habitat Restoration — Wenatchee', project: 'Wenatchee Subbasin',
    submitted: 'Jun 19, 2026', reviewBy: 'Jun 24, 2026', daysRemaining: 2,
    amount: 6120, stage: 'Submitted', final: false,
    invoiceDate: 'Jun 17, 2026', perfStart: 'Jun 1, 2026', perfEnd: 'Jun 15, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0051-PacificEnv.pdf', supportingDocs: ['timesheet-jun-2026.pdf', 'equipment-rental-receipt.pdf'],
    lineItems: [
      { description: 'Field biologist labor', qty: 52, unitPrice: 95 },
      { description: 'Habitat survey equipment rental', qty: 1, unitPrice: 650 },
      { description: 'Field mileage', qty: 940, unitPrice: 0.5 },
    ],
    contractValue: 420_000, expended: 318_400, remaining: 101_600, asOf: 'Jun 21, 2026',
    assetSuite: 'Not sent', inStatusDays: 2,
  },
  {
    number: 'INV-2026-0049', vendor: 'Cascade Fisheries Consulting',
    contract: 'Smolt Survival Telemetry Study', project: 'Mainstem Survival',
    submitted: 'Jun 15, 2026', reviewBy: 'Jun 23, 2026', daysRemaining: 1,
    amount: 12_480, stage: 'In review', final: false,
    invoiceDate: 'Jun 10, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 31, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0049-Cascade.pdf', supportingDocs: ['receiver-deployment-log.pdf', 'data-analysis-summary.pdf'],
    notes: 'Receivers redeployed after the spring high-water event; deployment hours above baseline.',
    lineItems: [
      { description: 'Acoustic telemetry tag deployment', qty: 64, unitPrice: 135 },
      { description: 'Receiver maintenance & retrieval', qty: 18, unitPrice: 100 },
      { description: 'Data analysis', qty: 16, unitPrice: 120 },
    ],
    contractValue: 680_000, expended: 612_300, remaining: 67_700, asOf: 'Jun 21, 2026',
    assetSuite: 'Not sent', inStatusDays: 6,
  },
  {
    number: 'INV-2026-0047', vendor: 'Methow Restoration Partners',
    contract: 'Riparian Vegetation Monitoring — Methow', project: 'Methow Subbasin',
    submitted: 'May 28, 2026', reviewBy: 'Jun 20, 2026', daysRemaining: -2,
    amount: 3960, stage: 'In review', final: false,
    invoiceDate: 'May 22, 2026', perfStart: 'Apr 1, 2026', perfEnd: 'Apr 30, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0047-Methow.pdf', supportingDocs: ['timesheet-apr-2026.pdf', 'field-receipts.pdf'],
    lineItems: [
      { description: 'Vegetation transect monitoring', qty: 30, unitPrice: 110 },
      { description: 'Data processing & reporting', qty: 6, unitPrice: 110 },
    ],
    contractValue: 240_000, expended: 196_800, remaining: 43_200, asOf: 'Jun 21, 2026',
    assetSuite: 'Not sent', inStatusDays: 24,
  },
  {
    number: 'INV-2026-0046', vendor: 'Pacific Environmental Services, LLC',
    contract: 'Hatchery Supplementation — Entiat', project: 'Entiat Subbasin',
    submitted: 'Jun 18, 2026', reviewBy: 'Jul 5, 2026', daysRemaining: 13,
    amount: 2280, stage: 'Submitted', final: false,
    invoiceDate: 'Jun 12, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 31, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0046-PacificEnv.pdf', supportingDocs: ['broodstock-field-log.pdf'],
    lineItems: [
      { description: 'Broodstock collection labor', qty: 22, unitPrice: 95 },
      { description: 'Field supplies', qty: 1, unitPrice: 190 },
    ],
    contractValue: 180_000, expended: 88_500, remaining: 91_500, asOf: 'Jun 21, 2026',
    assetSuite: 'Not sent', inStatusDays: 3,
  },
  {
    number: 'INV-2026-0044', vendor: 'Okanogan Water Sciences',
    contract: 'Water Quality Sampling — Okanogan', project: 'Okanogan Subbasin',
    submitted: 'Jun 16, 2026', reviewBy: 'Jul 1, 2026', daysRemaining: 9,
    amount: 18_750, stage: 'Submitted', final: true,
    invoiceDate: 'Jun 14, 2026', perfStart: 'Apr 1, 2026', perfEnd: 'Jun 13, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0044-Okanogan-FINAL.pdf', supportingDocs: ['lab-analysis-report.pdf', 'sampling-field-notes.pdf', 'final-data-deliverable.xlsx'],
    notes: 'Final invoice — closes out the FY26 sampling contract. Includes the held-back retainage.',
    lineItems: [
      { description: 'Water sample collection', qty: 120, unitPrice: 85 },
      { description: 'Lab analysis', qty: 60, unitPrice: 115 },
      { description: 'Final report & data deliverable', qty: 1, unitPrice: 1650 },
    ],
    contractValue: 96_000, expended: 77_250, remaining: 18_750, asOf: 'Jun 21, 2026',
    assetSuite: 'Not sent', inStatusDays: 5,
  },
  {
    number: 'INV-2026-0041', vendor: 'Cascade Fisheries Consulting',
    contract: 'Smolt Survival Telemetry Study', project: 'Mainstem Survival',
    submitted: 'Jun 5, 2026', reviewBy: 'Jun 28, 2026', daysRemaining: 6,
    amount: 4310, stage: 'Returned', final: false,
    invoiceDate: 'May 30, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 31, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0041-Cascade.pdf', supportingDocs: [],
    notes: 'Returned Jun 8 — receiver-maintenance line lacks a supporting field log; mileage exceeds the approved rate.',
    lineItems: [
      { description: 'Receiver maintenance', qty: 22, unitPrice: 100 },
      { description: 'Field mileage', qty: 1200, unitPrice: 0.62 },
    ],
    contractValue: 680_000, expended: 612_300, remaining: 67_700, asOf: 'Jun 21, 2026',
    assetSuite: 'Not sent', inStatusDays: 13,
  },
  {
    number: 'INV-2026-0038', vendor: 'Pacific Environmental Services, LLC',
    contract: 'Salmon Habitat Restoration — Wenatchee', project: 'Wenatchee Subbasin',
    submitted: 'May 29, 2026', reviewBy: 'Jun 21, 2026', daysRemaining: -1,
    amount: 5210, stage: 'Approved', final: false,
    invoiceDate: 'May 24, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 15, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0038-PacificEnv.pdf', supportingDocs: ['timesheet-may-2026.pdf'],
    lineItems: [
      { description: 'Field biologist labor', qty: 44, unitPrice: 95 },
      { description: 'Habitat survey equipment rental', qty: 1, unitPrice: 650 },
      { description: 'Field mileage', qty: 760, unitPrice: 0.5 },
    ],
    contractValue: 420_000, expended: 318_400, remaining: 101_600, asOf: 'Jun 21, 2026',
    // Approved Jun 9; Asset Suite payment confirmed Jun 17 (8 days in Approved stage)
    assetSuite: 'Paid Jun 17', inStatusDays: 8,
  },
  // ── Historical Approved records — do NOT disturb deriveTriage (counts only open stages) ──
  {
    number: 'INV-2026-0032', vendor: 'Methow Restoration Partners',
    contract: 'Riparian Vegetation Monitoring — Methow', project: 'Methow Subbasin',
    submitted: 'May 15, 2026', reviewBy: 'Jun 8, 2026', daysRemaining: -13,
    amount: 4180, stage: 'Approved', final: false,
    invoiceDate: 'May 10, 2026', perfStart: 'Mar 1, 2026', perfEnd: 'Mar 31, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0032-Methow.pdf', supportingDocs: ['timesheet-mar-2026.pdf', 'field-receipts-mar.pdf'],
    lineItems: [
      { description: 'Vegetation transect monitoring', qty: 28, unitPrice: 110 },
      { description: 'Data processing & reporting', qty: 8, unitPrice: 110 },
      { description: 'Field supplies', qty: 1, unitPrice: 300 },
    ],
    contractValue: 240_000, expended: 192_620, remaining: 47_380, asOf: 'Jun 21, 2026',
    // Approved May 30; payment confirmed Jun 12 (9 days after approval)
    assetSuite: 'Paid Jun 12', inStatusDays: 22,
  },
  {
    number: 'INV-2026-0027', vendor: 'Okanogan Water Sciences',
    contract: 'Water Quality Sampling — Okanogan', project: 'Okanogan Subbasin',
    submitted: 'May 8, 2026', reviewBy: 'Jun 1, 2026', daysRemaining: -20,
    amount: 9450, stage: 'Approved', final: false,
    invoiceDate: 'May 3, 2026', perfStart: 'Feb 1, 2026', perfEnd: 'Mar 31, 2026',
    billTo: 'BPA — Columbia Basin Fish & Wildlife Program',
    pdfName: 'INV-2026-0027-Okanogan.pdf', supportingDocs: ['lab-analysis-feb-mar.pdf', 'sampling-field-notes-q1.pdf'],
    notes: 'Q1 sampling period; includes winter low-flow and spring runoff events.',
    lineItems: [
      { description: 'Water sample collection', qty: 72, unitPrice: 85 },
      { description: 'Lab analysis', qty: 36, unitPrice: 115 },
      { description: 'Data summary & QA', qty: 6, unitPrice: 120 },
    ],
    contractValue: 96_000, expended: 58_050, remaining: 37_950, asOf: 'Jun 21, 2026',
    // Approved Jun 10; Asset Suite payment packet sent Jun 18 (3 days ago as of feed)
    assetSuite: 'Processing — sent Jun 18', inStatusDays: 11,
  },
];

// Per-contract reference data, keyed by contract/project NAME. Contract & project
// numbers are kept 1-to-1 with the same contracts in vendor-dashboard-invoices.mjs,
// and `contractEnd` mirrors portfolio[].perfEnd in my-work.mjs, so a given contract
// reads identically everywhere it appears. (Not imported to avoid a circular dep.)
//
// `contractStart` is a two-year period of performance ending on `contractEnd` — the
// term implied by the C-2024-* numbering, and early enough that every invoice's own
// performance period falls inside it.
const contractRefs = {
  'Salmon Habitat Restoration — Wenatchee': { contractNumber: 'C-2024-042', contractStart: 'Oct 1, 2024', contractEnd: 'Sep 30, 2026', netTerms: 'Net 30' },
  'Smolt Survival Telemetry Study':         { contractNumber: 'C-2024-067', contractStart: 'Nov 1, 2024', contractEnd: 'Oct 31, 2026', netTerms: 'Net 30' },
  'Riparian Vegetation Monitoring — Methow': { contractNumber: 'C-2024-051', contractStart: 'Dec 1, 2024', contractEnd: 'Nov 30, 2026', netTerms: 'Net 30' },
  'Hatchery Supplementation — Entiat':      { contractNumber: 'C-2024-073', contractStart: 'Sep 1, 2024', contractEnd: 'Aug 31, 2026', netTerms: 'Net 45' },
  'Water Quality Sampling — Okanogan':      { contractNumber: 'C-2024-058', contractStart: 'Jun 14, 2024', contractEnd: 'Jun 13, 2026', netTerms: 'Net 30' },
};
const projectNumbers = {
  'Wenatchee Subbasin': 'PRJ-2024-112',
  'Mainstem Survival': 'PRJ-2024-201',
  'Methow Subbasin': 'PRJ-2024-088',
  'Entiat Subbasin': 'PRJ-2024-095',
  'Okanogan Subbasin': 'PRJ-2024-143',
};

/**
 * The COR's assigned invoices — base records enriched with each contract/project's
 * reference number, the contract start/end dates, and net terms.
 * @type {ReviewInvoice[]}
 */
export const reviewQueue = reviewQueueBase.map((inv) => {
  const ref = contractRefs[inv.contract] ?? {};
  return {
    ...inv,
    contractNumber: ref.contractNumber ?? '',
    projectNumber: projectNumbers[inv.project] ?? '',
    contractStart: ref.contractStart ?? '',
    contractEnd: ref.contractEnd ?? '',
    netTerms: ref.netTerms ?? 'Net 30',
  };
});

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

/**
 * What share of the FULL contract value this single invoice represents — the figure
 * that tells a COR whether they're signing off on a routine draw or a material slice
 * of the whole award. Returns a number (percent), or null when the contract carries
 * no value to divide by.
 * @param {{ amount: number; contractValue: number }} invoice
 */
export function pctOfContract(invoice) {
  const value = Number(invoice?.contractValue) || 0;
  if (value <= 0) return null;
  return (Number(invoice.amount) || 0) / value * 100;
}

/**
 * Display form of `pctOfContract` — one decimal under 10%, whole numbers above, so a
 * small routine draw still reads as a real number ("1.5%") instead of rounding to 1%.
 */
export function pctLabel(invoice) {
  const pct = pctOfContract(invoice);
  if (pct === null) return '';
  if (pct > 0 && pct < 0.1) return '<0.1%';
  return `${pct < 10 ? pct.toFixed(1) : Math.round(pct)}%`;
}

/** Find one invoice by its number (detail-page lookup). */
export function findInvoice(number, list = reviewQueue) {
  return list.find((i) => i.number === number) ?? null;
}

/**
 * Headline triage metrics for the COR's active invoice workspace — the review
 * pile and its facets. All scoped to OPEN invoices (Submitted / In review), the
 * ones actually awaiting the COR's decision:
 *   - awaitingReview: size of the pile (the "how big is my pile" number)
 *   - overdue:        open invoices past their review-by clock (the SIG-B trigger)
 *   - oldestWaiting:  most days any open invoice has sat in its current stage
 *   - finalInQueue:   open FINAL invoices (each one triggers contract closeout)
 * `overdue` uses the SAME rule the queue's urgency pill does (open stage AND
 * daysRemaining < 0), so the metric can never diverge from what the grid shows.
 * @param {ReviewInvoice[]} list
 */
export function deriveWorkspaceMetrics(list = reviewQueue) {
  const open = list.filter((i) => openStages.includes(i.stage));
  return {
    awaitingReview: open.length,
    overdue: open.filter((i) => i.daysRemaining < 0).length,
    oldestWaiting: open.reduce((max, i) => Math.max(max, i.inStatusDays ?? 0), 0),
    finalInQueue: open.filter((i) => i.final).length,
  };
}

/**
 * Asset Suite has confirmed payment for this invoice (assetSuite === 'Paid <date>').
 * Paid invoices are terminal — nothing more the COR can do — so they are filed under
 * Invoice history rather than cluttering the active My Invoices workspace.
 */
export function isPaid(invoice) {
  return (invoice.assetSuite ?? '').startsWith('Paid');
}

/**
 * The active My Invoices workspace: every invoice Asset Suite has NOT yet paid —
 * i.e. anything still needing (or awaiting) action. Excludes the paid history.
 * @param {ReviewInvoice[]} list
 */
export function actionableInvoices(list = reviewQueue) {
  return list.filter((i) => !isPaid(i));
}

/**
 * Invoice history: every invoice Asset Suite has marked Paid. Kept out of the
 * active workspace so that grid stays scoped to what still needs attention.
 * @param {ReviewInvoice[]} list
 */
export function paidInvoices(list = reviewQueue) {
  return list.filter(isPaid);
}
