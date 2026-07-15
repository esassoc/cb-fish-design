// Single data spine for the "My Work" COR landing console (three-tab orientation surface:
// My Tasks · My Invoices · My Portfolio). All shapes are deterministic, invented, and
// domain-credible — Columbia-basin BPA fisheries program — NOT derived from any client data.
//
// Architecture: this module imports reviewQueue from invoice-review.mjs and derives invoice
// tasks from it, so My Tasks badge, My Invoices badge, task rows, and the queue component
// all share one authoritative source and can never diverge.

import { reviewQueue, reviewer as _reviewer, openStages, deriveTriage, fmtExact } from './invoice-review.mjs';

// Re-export the single reviewer persona so page assemblers import from one place.
export { _reviewer as reviewer };

// ── Type definitions ──────────────────────────────────────────────────────────────────────

/**
 * @typedef {'invoice-review'|'status-report-review'|'status-report-waiting'|'ec-requirements'|'final-invoice-due'|'closeout-form'} TaskKind
 * @typedef {{
 *   id: string;
 *   kind: TaskKind;
 *   what: string;           // verb-first obligation label
 *   contract: string;
 *   project: string;
 *   due: string;            // display date string
 *   daysRemaining: number;  // negative = overdue (same convention as invoice-review.mjs)
 *   actionLabel: string;
 *   href?: string;          // stub '#' for non-invoice tasks; absent for invoice tasks
 *   invoiceNumber?: string; // present iff kind === 'invoice-review'
 *   amount?: string;        // present iff kind === 'invoice-review'; display string (e.g. "$6,120.00")
 *   vendor?: string;        // counterparty name; present for invoice tasks and contractor-facing standing tasks
 *   waiting?: boolean;      // informational rows — no action button rendered
 * }} WorkTask
 *
 * @typedef {'past-due'|'ec-gate'|'pending-mod'|'closeout-blocked'} RiskKind
 * @typedef {{
 *   id: string;
 *   kind: RiskKind;
 *   severity: 'danger'|'warning';
 *   title: string;
 *   detail: string;   // one-line, names blocker inline; no separate tooltip needed
 *   contract?: string;
 *   due?: string;
 * }} RiskItem
 *
 * @typedef {'Active'|'Pending modification'|'Expiring soon'|'Closeout eligible'} ContractStatus
 * @typedef {{
 *   id: string;
 *   contract: string;
 *   vendor: string;
 *   project: string;
 *   status: ContractStatus;
 *   perfEnd: string;
 *   closeoutEligible?: string;    // date perf period ended / triggering closeout clock
 *   closeoutBlocker?: string;     // inline blocker text when closeout is stalled
 *   value: number;
 *   expended: number;
 *   remaining: number;
 *   asOf: string;
 *   source: string;
 *   ecGateDue?: string;           // approaching EC-gate deadline if any
 * }} PortfolioContract
 */

// ── Standing tasks (authored, deterministic) ───────────────────────────────────────────────
// Five obligation types beyond invoice reviews. At least one is past due (daysRemaining < 0)
// so the past-due risk summary spans more than one item type.

/** @type {WorkTask[]} */
export const standingTasks = [
  {
    // (1) Status Report to approve or reject for the PIT Tag O&M contract at Lower Granite.
    //     Quarterly report submitted May 30; COR has a 30-day window → due Jun 29.
    //     Past due by 4 days as of Jun 21 snapshot — this plus INV-2026-0047 makes ≥2 items
    //     past due across different task types, as required by the plan.
    id: 'task-sr-lg-q1-2026',
    kind: 'status-report-review',
    what: 'Approve or reject Q1 2026 Status Report — PIT Tag Detection System O&M',
    contract: 'PIT Tag Detection System O&M — Lower Granite',
    project: 'Lower Granite Dam Passage',
    due: 'Jun 17, 2026',
    daysRemaining: -4,
    actionLabel: 'Review report',
    href: '#',
    vendor: 'Pacific States Marine Fisheries Commission',
  },
  {
    // (2) Status Report submitted and awaiting acceptance — informational row, no action button.
    //     Vendor submitted; COR has not yet accepted it into the review cycle.
    id: 'task-sr-chiwawa-q1-2026',
    kind: 'status-report-waiting',
    what: 'Status Report awaiting acceptance — Rotary Screw Trap Juvenile M&E',
    contract: 'Rotary Screw Trap Juvenile M&E — Chiwawa',
    project: 'Chiwawa River Juvenile Salmonid M&E',
    due: 'Jul 10, 2026',
    daysRemaining: 19,
    actionLabel: 'Accept report',
    href: '#',
    vendor: 'Yakama Nation Fisheries',
    waiting: true,
  },
  {
    // (3) EC (Environmental Compliance) requirements — HIP gate on a Wenatchee habitat
    //     restoration Work Element. Must fulfill before the gate deadline or the WE is blocked.
    id: 'task-ec-wenatchee-hip',
    kind: 'ec-requirements',
    what: 'Fulfill HIP gate EC requirements — Wenatchee Riparian Restoration WE',
    contract: 'Salmon Habitat Restoration — Wenatchee',
    project: 'Wenatchee Subbasin',
    due: 'Jun 28, 2026',
    daysRemaining: 7,
    actionLabel: 'Fulfill requirements',
    href: '#',
  },
  {
    // (4) Final invoice due — tied to INV-2026-0044 (the only record with final: true in
    //     invoice-review.mjs), which is Water Quality Sampling — Okanogan. The queue already
    //     has the Submitted invoice; this standing task tracks the final-invoice obligation
    //     at the contract level (vendor must submit before contract closeout can start).
    //     Already submitted but COR deadline to process it is Jul 1.
    id: 'task-final-inv-okanogan',
    kind: 'final-invoice-due',
    what: 'Process final invoice — Water Quality Sampling — Okanogan',
    contract: 'Water Quality Sampling — Okanogan',
    project: 'Okanogan Subbasin',
    due: 'Jul 1, 2026',
    daysRemaining: 10,
    actionLabel: 'View contract',
    href: '#',
  },
  {
    // (5) Closeout form due for the Hatchery Effectiveness M&E contract at Winthrop NFH.
    //     Performance period ended Apr 30; closeout form must be submitted within 90 days.
    id: 'task-closeout-winthrop',
    kind: 'closeout-form',
    what: 'Submit closeout form — Hatchery Effectiveness M&E — Winthrop NFH',
    contract: 'Hatchery Effectiveness M&E — Winthrop NFH',
    project: 'Winthrop National Fish Hatchery Effectiveness',
    due: 'Jul 29, 2026',
    daysRemaining: 38,
    actionLabel: 'Submit closeout',
    href: '#',
  },
];

// ── Invoice task derivation ────────────────────────────────────────────────────────────────

/**
 * Filter the review queue to open (actionable) stages and map each to a WorkTask.
 * Reuses `openStages` exported by invoice-review.mjs — same list that deriveTriage uses —
 * so the badge counts can never diverge from the triage strip.
 * @param {import('./invoice-review.mjs').ReviewInvoice[]} list
 * @returns {WorkTask[]}
 */
export function deriveInvoiceTasks(list = reviewQueue) {
  return list
    .filter((inv) => openStages.includes(inv.stage))
    .map((inv) => ({
      id: 'task-inv-' + inv.number,
      kind: 'invoice-review',
      what: 'Review & approve invoice ' + inv.number,
      contract: inv.contract,
      project: inv.project,
      due: inv.reviewBy,
      daysRemaining: inv.daysRemaining,
      actionLabel: 'Review & approve',
      invoiceNumber: inv.number,
      amount: fmtExact(inv.amount),
      vendor: inv.vendor,
    }));
}

// ── Combined task list ────────────────────────────────────────────────────────────────────

/**
 * All actionable + informational tasks for the COR, sorted by daysRemaining ascending
 * (overdue items first, tightest deadlines next, furthest out last).
 * @returns {WorkTask[]}
 */
export function deriveMyTasks() {
  return [...deriveInvoiceTasks(), ...standingTasks].sort(
    (a, b) => a.daysRemaining - b.daysRemaining,
  );
}

// ── Risk derivation ────────────────────────────────────────────────────────────────────────

/**
 * Compute the at-risk band shown below the task queue. The first item is always a DERIVED
 * past-due summary (if any tasks are overdue); the remaining items are authored conditions.
 * Cross-references portfolio contract IDs for the pending-mod and closeout-blocked items.
 * @param {WorkTask[]} tasks
 * @returns {RiskItem[]}
 */
export function deriveRisks(tasks = deriveMyTasks()) {
  const risks = [];

  // ── Derived: past-due summary ────────────────────────────────────────────────────────
  const overdue = tasks.filter((t) => t.daysRemaining < 0 && !t.waiting);
  if (overdue.length > 0) {
    const oldest = Math.abs(Math.min(...overdue.map((t) => t.daysRemaining)));
    risks.push({
      id: 'risk-past-due',
      kind: 'past-due',
      severity: 'danger',
      title: `${overdue.length} task${overdue.length === 1 ? '' : 's'} past due — oldest ${oldest} day${oldest === 1 ? '' : 's'}`,
      detail: `${overdue.length} obligation${overdue.length === 1 ? '' : 's'} past their due date. Review and act immediately to avoid contract compliance issues.`,
    });
  }

  // ── Authored: EC gate approaching ─────────────────────────────────────────────────────
  risks.push({
    id: 'risk-ec-gate-wenatchee',
    kind: 'ec-gate',
    severity: 'warning',
    title: 'EC gate deadline approaching — Wenatchee Riparian Restoration WE',
    detail: 'HIP compliance documentation must be uploaded and approved before Jun 28, 2026 or the Work Element will be blocked from further expenditure.',
    contract: 'Salmon Habitat Restoration — Wenatchee',
    due: 'Jun 28, 2026',
  });

  // ── Authored: pending contract modification ─────────────────────────────────────────────
  risks.push({
    id: 'risk-pending-mod-telemetry',
    kind: 'pending-mod',
    severity: 'warning',
    title: 'Contract modification pending — Smolt Survival Telemetry Study',
    detail: 'Downstream budget figures are unstable until the modification executes; do not approve invoices against the new ceiling until the mod is countersigned.',
    contract: 'Smolt Survival Telemetry Study',
  });

  // ── Authored: closeout blocked ──────────────────────────────────────────────────────────
  risks.push({
    id: 'risk-closeout-blocked-winthrop',
    kind: 'closeout-blocked',
    severity: 'warning',
    title: 'Closeout blocked — Hatchery Effectiveness M&E — Winthrop NFH',
    detail: 'CCR property inventory must be re-uploaded before closeout can proceed. The previous upload was rejected due to a missing asset tag on equipment item #WFH-2024-07.',
    contract: 'Hatchery Effectiveness M&E — Winthrop NFH',
  });

  return risks;
}

// ── Portfolio ─────────────────────────────────────────────────────────────────────────────
// ~10 rows. The 5 contracts already named in invoice-review.mjs appear FIRST with
// value/expended/remaining copied verbatim from those records (two views of the same data).
// Five new contracts cover the additional standing-task obligations.

/** @type {PortfolioContract[]} */
export const portfolio = [
  // ── From invoice-review.mjs (budget figures copied verbatim) ──────────────────────────
  {
    id: 'pc-wenatchee',
    contract: 'Salmon Habitat Restoration — Wenatchee',
    vendor: 'Pacific Environmental Services, LLC',
    project: 'Wenatchee Subbasin',
    status: 'Active',
    perfEnd: 'Sep 30, 2026',
    value: 420_000, expended: 318_400, remaining: 101_600,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
    ecGateDue: 'Jun 28, 2026',
  },
  {
    id: 'pc-telemetry',
    contract: 'Smolt Survival Telemetry Study',
    vendor: 'Cascade Fisheries Consulting',
    project: 'Mainstem Survival',
    // Pending modification — mod is in countersignature queue; ceiling TBD.
    status: 'Pending modification',
    perfEnd: 'Oct 31, 2026',
    value: 680_000, expended: 612_300, remaining: 67_700,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
  },
  {
    id: 'pc-methow',
    contract: 'Riparian Vegetation Monitoring — Methow',
    vendor: 'Methow Restoration Partners',
    project: 'Methow Subbasin',
    status: 'Active',
    perfEnd: 'Nov 30, 2026',
    value: 240_000, expended: 196_800, remaining: 43_200,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
  },
  {
    id: 'pc-entiat',
    contract: 'Hatchery Supplementation — Entiat',
    vendor: 'Pacific Environmental Services, LLC',
    project: 'Entiat Subbasin',
    status: 'Active',
    perfEnd: 'Aug 31, 2026',
    value: 180_000, expended: 88_500, remaining: 91_500,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
  },
  {
    id: 'pc-okanogan',
    contract: 'Water Quality Sampling — Okanogan',
    vendor: 'Okanogan Water Sciences',
    project: 'Okanogan Subbasin',
    // Performance period ended Jun 13; awaiting final invoice processing before closeout.
    // perfEnd within ~45 days of the feed asOf (Jun 21) → Expiring soon.
    status: 'Expiring soon',
    perfEnd: 'Jun 13, 2026',
    value: 96_000, expended: 77_250, remaining: 18_750,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
  },
  // ── New contracts (5) — matching standing tasks and risk items ────────────────────────
  {
    id: 'pc-pit-tag-lg',
    contract: 'PIT Tag Detection System O&M — Lower Granite',
    vendor: 'Pacific States Marine Fisheries Commission',
    project: 'Lower Granite Dam Passage',
    status: 'Active',
    perfEnd: 'Sep 30, 2026',
    value: 312_000, expended: 188_400, remaining: 123_600,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
  },
  {
    id: 'pc-chiwawa-rst',
    contract: 'Rotary Screw Trap Juvenile M&E — Chiwawa',
    vendor: 'Yakama Nation Fisheries',
    project: 'Chiwawa River Juvenile Salmonid M&E',
    status: 'Active',
    perfEnd: 'Nov 15, 2026',
    value: 228_000, expended: 104_600, remaining: 123_400,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
  },
  {
    // Closeout eligible; blocked by CCR property inventory re-upload — matches the
    // closeout-blocked risk item and the closeout-form standing task.
    id: 'pc-winthrop-hatchery',
    contract: 'Hatchery Effectiveness M&E — Winthrop NFH',
    vendor: 'Fish Pro Inc.',
    project: 'Winthrop National Fish Hatchery Effectiveness',
    status: 'Closeout eligible',
    perfEnd: 'Apr 30, 2026',
    closeoutEligible: 'Apr 30, 2026',
    closeoutBlocker: 'CCR property inventory must be re-uploaded before closeout can proceed',
    value: 195_000, expended: 193_800, remaining: 1_200,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
  },
  {
    id: 'pc-lamprey-umatilla',
    contract: 'Pacific Lamprey Passage — Umatilla',
    vendor: 'Confederated Tribes of the Umatilla Indian Reservation',
    project: 'Umatilla River Lamprey Restoration',
    status: 'Active',
    perfEnd: 'Oct 31, 2026',
    value: 148_000, expended: 62_300, remaining: 85_700,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
  },
  {
    id: 'pc-riparian-john-day',
    contract: 'Riparian Fencing & Off-site Watering — John Day',
    vendor: 'High Desert Ecological Services',
    project: 'John Day Subbasin Riparian Restoration',
    status: 'Active',
    perfEnd: 'Aug 15, 2026',
    value: 87_500, expended: 31_200, remaining: 56_300,
    asOf: 'Jun 21, 2026',
    source: 'Asset Suite nightly feed · includes accruals',
  },
];

// ── Summary badges ────────────────────────────────────────────────────────────────────────

/**
 * Compute the three badge values shown on the My Work tab bar.
 *  - tasks:              count of actionable tasks (excludes waiting:true rows)
 *  - invoiceBadge:       if any open invoice is overdue → '${n} overdue', else String(open count)
 *  - portfolioAttention: count of portfolio rows with a non-Active status OR a closeoutBlocker
 * @returns {{ tasks: number; invoiceBadge: string; portfolioAttention: number }}
 */
export function deriveWorkBadges() {
  const allTasks = deriveMyTasks();
  const tasks = allTasks.filter((t) => !t.waiting).length;

  // Reuse deriveTriage for the invoice badge — same logic, same source, zero divergence.
  const triage = deriveTriage();
  const invoiceBadge = triage.overdue > 0
    ? `${triage.overdue} overdue`
    : String(triage.open);

  const portfolioAttention = portfolio.filter(
    (c) => c.status !== 'Active' || Boolean(c.closeoutBlocker),
  ).length;

  return { tasks, invoiceBadge, portfolioAttention };
}
