// Single source of truth for the vendor dashboard invoices view.
// The financial-outlook band, the "needs attention" strip, and the invoices
// table all derive from this one dataset so the numbers can never drift.
//
// Deterministic, fictional, domain-credible mock data — amounts and contract
// names are invented, NOT derived from any client document.

/**
 * @typedef {'Submitted' | 'In review' | 'Approved' | 'Paid' | 'Needs revision'} Stage
 * @typedef {{ description: string; qty: number; unitPrice: number }} LineItem
 * @typedef {{
 *   number: string; contract: string; project: string; submitted: string;
 *   amount: number; stage: Stage;
 *   invoiceDate: string; issued: string; perfStart: string; perfEnd: string;
 *   lineItems: LineItem[]; notes?: string; pdfName: string;
 *   supportingDocs: string[]; paidDate?: string;
 * }} Invoice
 *
 * `pdfName` is the invoice document; `supportingDocs` are the extra files the
 * vendor uploaded. `paidDate` is set only once an invoice reaches the Paid stage.
 */

/** As-of stamp for the expenditure rollup (nightly PeopleSoft feed in production). */
export const asOf = 'Jun 21, 2026';

/** Active contracts the vendor holds across all projects (broader than the recent-invoice set). */
export const contractCount = 9;

/**
 * Contract-level money figures (not derived from invoices — these come from the
 * Contract object: contracted value vs. expended-to-date incl. accruals).
 */
export const portfolio = {
  contracted: 1_840_000,
  expended: 1_210_000,
  remaining: 630_000,
};

// Line-item totals sum to `amount`; performance period precedes the invoice
// date, which precedes the dashboard submission date. Fictional but internally
// consistent so the drawer's line-item math always reconciles.
/** @type {Invoice[]} */
export const invoices = [
  {
    number: 'INV-2026-0045', contractNumber: 'C-2024-042', contract: 'Salmon Habitat Restoration — Wenatchee',
    projectNumber: 'PRJ-2024-112', project: 'Wenatchee Subbasin',
    submitted: 'Jun 20, 2026', amount: 5210, stage: 'Submitted',
    invoiceDate: 'Jun 18, 2026', issued: 'Jun 18, 2026', perfStart: 'Jun 1, 2026', perfEnd: 'Jun 15, 2026',
    pdfName: 'INV-2026-0045-PacificEnv.pdf', supportingDocs: ['timesheet-jun-2026.pdf', 'equipment-receipt.pdf'],
    notes: 'Partial-month billing for the June survey window.',
    lineItems: [
      { description: 'Field biologist labor', qty: 44, unitPrice: 95 },
      { description: 'Habitat survey equipment rental', qty: 1, unitPrice: 650 },
      { description: 'Field mileage', qty: 760, unitPrice: 0.5 },
    ],
  },
  {
    number: 'INV-2026-0042', contractNumber: 'C-2024-042', contract: 'Salmon Habitat Restoration — Wenatchee',
    projectNumber: 'PRJ-2024-112', project: 'Wenatchee Subbasin',
    submitted: 'Jun 18, 2026', amount: 4850, stage: 'Submitted',
    invoiceDate: 'Jun 1, 2026', issued: 'Jun 1, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 31, 2026',
    pdfName: 'INV-2026-0042-PacificEnv.pdf', supportingDocs: ['timesheet-may-2026.pdf'],
    lineItems: [
      { description: 'Field biologist labor', qty: 40, unitPrice: 95 },
      { description: 'Habitat survey equipment rental', qty: 1, unitPrice: 650 },
      { description: 'Field mileage', qty: 800, unitPrice: 0.5 },
    ],
  },
  {
    number: 'INV-2026-0039', contractNumber: 'C-2024-051', contract: 'Riparian Vegetation Monitoring — Methow',
    projectNumber: 'PRJ-2024-088', project: 'Methow Subbasin',
    submitted: 'Jun 11, 2026', amount: 2310, stage: 'In review',
    invoiceDate: 'Jun 2, 2026', issued: 'Jun 2, 2026', perfStart: 'May 1, 2026', perfEnd: 'May 31, 2026',
    pdfName: 'INV-2026-0039-PacificEnv.pdf', supportingDocs: ['transect-data.xlsx'],
    lineItems: [
      { description: 'Vegetation transect monitoring', qty: 18, unitPrice: 110 },
      { description: 'Data processing & reporting', qty: 3, unitPrice: 110 },
    ],
  },
  {
    number: 'INV-2026-0035', contractNumber: 'C-2024-067', contract: 'Smolt Survival Telemetry Study',
    projectNumber: 'PRJ-2024-201', project: 'Mainstem Survival',
    submitted: 'May 29, 2026', amount: 3975, stage: 'Approved',
    invoiceDate: 'May 5, 2026', issued: 'May 5, 2026', perfStart: 'Apr 1, 2026', perfEnd: 'Apr 30, 2026',
    pdfName: 'INV-2026-0035-PacificEnv.pdf', supportingDocs: ['receiver-log.pdf', 'maintenance-photos.pdf'],
    notes: 'Telemetry receivers redeployed after the spring high-water event.',
    lineItems: [
      { description: 'Acoustic telemetry tag deployment', qty: 25, unitPrice: 135 },
      { description: 'Receiver maintenance', qty: 6, unitPrice: 100 },
    ],
  },
  {
    number: 'INV-2026-0031', contractNumber: 'C-2024-073', contract: 'Hatchery Supplementation — Entiat',
    projectNumber: 'PRJ-2024-095', project: 'Entiat Subbasin',
    submitted: 'May 14, 2026', amount: 1640, stage: 'Paid',
    invoiceDate: 'May 1, 2026', issued: 'May 1, 2026', perfStart: 'Apr 1, 2026', perfEnd: 'Apr 30, 2026',
    pdfName: 'INV-2026-0031-PacificEnv.pdf', supportingDocs: ['broodstock-log.pdf'], paidDate: 'May 28, 2026',
    lineItems: [
      { description: 'Broodstock collection labor', qty: 16, unitPrice: 95 },
      { description: 'Field supplies', qty: 1, unitPrice: 120 },
    ],
  },
  {
    number: 'INV-2026-0028', contractNumber: 'C-2024-058', contract: 'Water Quality Sampling — Okanogan',
    projectNumber: 'PRJ-2024-143', project: 'Okanogan Subbasin',
    submitted: 'May 2, 2026', amount: 1425, stage: 'Needs revision',
    invoiceDate: 'Apr 20, 2026', issued: 'Apr 20, 2026', perfStart: 'Mar 1, 2026', perfEnd: 'Mar 31, 2026',
    pdfName: 'INV-2026-0028-PacificEnv.pdf', supportingDocs: ['sample-chain-of-custody.pdf'],
    notes: 'Returned for revision — lab analysis line item needs a supporting receipt.',
    lineItems: [
      { description: 'Water sample collection', qty: 10, unitPrice: 85 },
      { description: 'Lab analysis', qty: 5, unitPrice: 115 },
    ],
  },
  {
    number: 'INV-2026-0024', contractNumber: 'C-2024-067', contract: 'Smolt Survival Telemetry Study',
    projectNumber: 'PRJ-2024-201', project: 'Mainstem Survival',
    submitted: 'Apr 22, 2026', amount: 2890, stage: 'Paid',
    invoiceDate: 'Apr 10, 2026', issued: 'Apr 10, 2026', perfStart: 'Mar 1, 2026', perfEnd: 'Mar 31, 2026',
    pdfName: 'INV-2026-0024-PacificEnv.pdf', supportingDocs: ['data-analysis.pdf'], paidDate: 'May 9, 2026',
    lineItems: [
      { description: 'Acoustic telemetry data analysis', qty: 20, unitPrice: 120 },
      { description: 'Receiver retrieval', qty: 1, unitPrice: 490 },
    ],
  },
  {
    number: 'INV-2026-0019', contractNumber: 'C-2024-051', contract: 'Riparian Vegetation Monitoring — Methow',
    projectNumber: 'PRJ-2024-088', project: 'Methow Subbasin',
    submitted: 'Apr 8, 2026', amount: 1980, stage: 'Paid',
    invoiceDate: 'Mar 25, 2026', issued: 'Mar 25, 2026', perfStart: 'Feb 1, 2026', perfEnd: 'Feb 28, 2026',
    pdfName: 'INV-2026-0019-PacificEnv.pdf', supportingDocs: [], paidDate: 'Apr 24, 2026',
    lineItems: [
      { description: 'Vegetation transect monitoring', qty: 18, unitPrice: 110 },
    ],
  },
];

/** Compact USD formatter for big rollup figures ($1.84M, $630K). */
export function fmtCompact(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(n);
}

/** Exact USD formatter for invoice line amounts ($4,850.00). */
export function fmtExact(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/**
 * Derive the cross-contract financial position from the invoice pipeline.
 * Awaiting = money the vendor has billed but BPA has not yet approved
 * (Submitted + In review). Approved-unpaid = approved, not yet Paid.
 */
export function deriveOutlook(list = invoices) {
  const sumWhere = (stages) =>
    list.filter((i) => stages.includes(i.stage)).reduce((t, i) => t + i.amount, 0);
  const countWhere = (stages) => list.filter((i) => stages.includes(i.stage)).length;

  return {
    ...portfolio,
    awaiting: { amount: sumWhere(['Submitted', 'In review']), count: countWhere(['Submitted', 'In review']) },
    approvedUnpaid: { amount: sumWhere(['Approved']), count: countWhere(['Approved']) },
    needsRevision: { count: countWhere(['Needs revision']) },
    asOf,
    contractCount,
  };
}
