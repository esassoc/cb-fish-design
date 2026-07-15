// Data spine for the My Portfolio tab's Miller-column explorer.
// Drill-down path: Projects → Contracts → Entity cluster (SOW / LIB / Status Reports / Invoices).
//
// All content is deterministic and domain-credible (Columbia Basin BPA fisheries).
// Contract IDs and titles are kept 1-to-1 with portfolio[] in my-work.mjs;
// invoice EntityItems are DERIVED from reviewQueue in invoice-review.mjs.

import { reviewQueue, fmtExact, fmtCompact } from './invoice-review.mjs';
import { portfolio } from './my-work.mjs';

// ── Type definitions ──────────────────────────────────────────────────────────────────────

/**
 * @typedef {{ label: string; variant: 'default'|'info'|'success'|'warning'|'danger' }} PillStatus
 *
 * @typedef {{
 *   id: string;
 *   label: string;
 *   sub: string | null;
 *   status: PillStatus | null;
 *   href: string;
 * }} EntityItem
 *
 * @typedef {{
 *   sow: EntityItem[];
 *   lib: EntityItem[];
 *   statusReports: EntityItem[];
 *   invoices: EntityItem[];
 * }} EntityCluster
 *
 * Rollup severity: highest attention level found among descendants, or null.
 * Only 'warning' and 'danger' count as attention (success/info/default do not).
 * @typedef {'warning'|'danger'|null} Attention
 *
 * @typedef {{
 *   id: string;
 *   number: string;
 *   title: string;
 *   vendor: string;
 *   status: string;
 *   clusters: EntityCluster;
 *   attention: Attention;                 // rollup across this contract's own records (drives the contract-row dot)
 *   clusterAttention: Record<keyof EntityCluster, Attention>; // per-artifact rollup (drives the artifact-row dots)
 * }} ExplorerContract
 *
 * A project's hover-preview card payload (sponsor, rolled-up budget position, last activity).
 * Budget is summed across the project's contracts from the shared my-work.mjs portfolio[]
 * (matched by contract id) so the figures are one view of the same source of truth.
 * @typedef {{
 *   sponsor: string;
 *   budget: {
 *     value: number; expended: number; remaining: number;
 *     valueLabel: string; expendedLabel: string;   // fmtCompact display strings
 *     spentPct: number;                             // expended / value, 0–100
 *     plannedPct: number;                           // authored baseline: planned % spent to date
 *     variancePct: number;                          // spentPct − plannedPct (+ = over plan)
 *     pace: 'over' | 'under' | 'on';                // variance bucket (>2 / <−2 / within)
 *   };
 *   lastActivity: { label: string; date: string };
 * }} ProjectPreview
 *
 * @typedef {{
 *   id: string;
 *   number: string;
 *   name: string;
 *   contracts: ExplorerContract[];
 *   attention: Attention;                 // rollup across every contract + record below (drives the project-row dot)
 *   preview: ProjectPreview;              // sponsor / budget position / last activity for the hover card
 * }} ExplorerProject
 */

// ── Invoice derivation ────────────────────────────────────────────────────────────────────

/**
 * Map a reviewQueue stage to an esa-pill variant.
 * @param {import('./invoice-review.mjs').ReviewStage} stage
 * @returns {'default'|'info'|'success'|'warning'|'danger'}
 */
function stageVariant(stage) {
  if (stage === 'Submitted') return 'info';
  if (stage === 'In review')  return 'warning';
  if (stage === 'Returned')   return 'danger';
  if (stage === 'Approved')   return 'success';
  return 'default';
}

/**
 * Derive EntityItem[] for a contract's invoices cluster from the global reviewQueue.
 * Only rows whose `contract` field matches `contractTitle` are included.
 * @param {string} contractTitle  Must match ReviewInvoice.contract exactly.
 * @returns {EntityItem[]}
 */
function deriveInvoiceItems(contractTitle) {
  return reviewQueue
    .filter((inv) => inv.contract === contractTitle)
    .map((inv) => ({
      id: 'inv-' + inv.number,
      label: inv.number,
      sub: `${fmtExact(inv.amount)} · submitted ${inv.submitted}`,
      status: { label: inv.stage, variant: stageVariant(inv.stage) },
      href: '#',
    }));
}

// ── Static entity helpers (keep file DRY) ─────────────────────────────────────────────────

/** @returns {EntityItem} */
function sow(id, label, sub, statusLabel, variant, href = '#') {
  return { id, label, sub, status: { label: statusLabel, variant }, href };
}

/** @returns {EntityItem} */
function lib(id, label, sub, statusLabel, variant) {
  return { id, label, sub, status: { label: statusLabel, variant }, href: '/project-budgets' };
}

/** @returns {EntityItem} */
function sr(id, label, sub, statusLabel, variant) {
  return { id, label, sub, status: { label: statusLabel, variant }, href: '#' };
}

// ── Project 1 — Wenatchee & Methow Habitat Restoration ────────────────────────────────────
// BPA project 2003-024-00. Three contracts covering habitat restoration and riparian
// vegetation monitoring across the Wenatchee and upper Methow subbasins.

/** @type {ExplorerContract} */
const contractWenatchee = {
  id: 'pc-wenatchee',
  number: '56344 REL 12',
  title: 'Salmon Habitat Restoration — Wenatchee',
  vendor: 'Pacific Environmental Services, LLC',
  status: 'Active',
  clusters: {
    sow: [
      // href = '/map-sow' — the Habitat Design Tool prototype (one SOW links here)
      sow('sow-wenatchee-orig', 'Statement of Work — original', 'Effective Oct 1, 2023', 'Current', 'success', '/map-sow'),
      sow('sow-wenatchee-amd1', 'SOW Amendment 1', 'Effective Mar 15, 2024', 'Current', 'success'),
    ],
    lib: [
      lib('lib-wenatchee-r1', 'LIB Rev 1', 'Effective Oct 1, 2023', 'Superseded', 'default'),
      lib('lib-wenatchee-r2', 'LIB Rev 2', 'Effective Mar 15, 2024', 'Superseded', 'default'),
      lib('lib-wenatchee-r3', 'LIB Rev 3', 'Effective Oct 1, 2024', 'Active', 'success'),
    ],
    statusReports: [
      sr('sr-wenatchee-q1-2026', 'Q1 2026 Status Report', 'Period: Jan–Mar 2026', 'Accepted', 'success'),
      sr('sr-wenatchee-q4-2025', 'Q4 2025 Status Report', 'Submitted Jan 15, 2026', 'Accepted', 'success'),
      sr('sr-wenatchee-q3-2025', 'Q3 2025 Status Report', 'Submitted Oct 10, 2025', 'Accepted', 'success'),
    ],
    invoices: deriveInvoiceItems('Salmon Habitat Restoration — Wenatchee'),
  },
};

/** @type {ExplorerContract} */
const contractMethow = {
  id: 'pc-methow',
  number: '56344 REL 17',
  title: 'Riparian Vegetation Monitoring — Methow',
  vendor: 'Methow Restoration Partners',
  status: 'Active',
  clusters: {
    sow: [
      sow('sow-methow-orig', 'Statement of Work — original', 'Effective Oct 1, 2022', 'Current', 'success'),
    ],
    lib: [
      lib('lib-methow-r1', 'LIB Rev 1', 'Effective Oct 1, 2022', 'Superseded', 'default'),
      lib('lib-methow-r2', 'LIB Rev 2', 'Effective Oct 1, 2023', 'Active', 'success'),
    ],
    statusReports: [
      sr('sr-methow-q1-2026', 'Q1 2026 Status Report', 'Submitted Apr 12, 2026', 'Accepted', 'success'),
      sr('sr-methow-q4-2025', 'Q4 2025 Status Report', 'Submitted Jan 9, 2026', 'Accepted', 'success'),
    ],
    invoices: deriveInvoiceItems('Riparian Vegetation Monitoring — Methow'),
  },
};

/** @type {ExplorerContract} */
const contractJohnDay = {
  id: 'pc-riparian-john-day',
  number: '56344 REL 23',
  title: 'Riparian Fencing & Off-site Watering — John Day',
  vendor: 'High Desert Ecological Services',
  status: 'Active',
  clusters: {
    sow: [
      sow('sow-johnday-orig', 'Statement of Work — original', 'Effective Nov 1, 2025', 'Current', 'success'),
    ],
    lib: [
      lib('lib-johnday-r1', 'LIB Rev 1', 'Effective Nov 1, 2025', 'Active', 'success'),
    ],
    statusReports: [
      sr('sr-johnday-q1-2026', 'Q1 2026 Status Report', 'Period: Jan–Mar 2026', 'Draft', 'default'),
    ],
    // Newest contract — demos the empty invoices state; no invoices submitted yet
    invoices: [],
  },
};

// ── Project 2 — Okanogan Water Quality & Hatchery Monitoring ─────────────────────────────
// BPA project 1997-031-00. Two contracts covering water quality sampling and hatchery
// supplementation in the Okanogan and Entiat subbasins.

/** @type {ExplorerContract} */
const contractOkanogan = {
  id: 'pc-okanogan',
  number: '56512 REL 08',
  title: 'Water Quality Sampling — Okanogan',
  vendor: 'Okanogan Water Sciences',
  status: 'Expiring soon',
  clusters: {
    sow: [
      sow('sow-okanogan-orig', 'Statement of Work — original', 'Effective Oct 1, 2024', 'Current', 'success'),
    ],
    lib: [
      lib('lib-okanogan-r1', 'LIB Rev 1', 'Effective Oct 1, 2024', 'Superseded', 'default'),
      lib('lib-okanogan-r2', 'LIB Rev 2', 'Effective Feb 1, 2025', 'Active', 'success'),
    ],
    statusReports: [
      sr('sr-okanogan-q1-2026', 'Q1 2026 Status Report', 'Submitted Apr 5, 2026', 'Accepted', 'success'),
      sr('sr-okanogan-q4-2025', 'Q4 2025 Status Report', 'Submitted Jan 8, 2026', 'Accepted', 'success'),
      sr('sr-okanogan-q3-2025', 'Q3 2025 Status Report', 'Submitted Oct 7, 2025', 'Accepted', 'success'),
      sr('sr-okanogan-q2-2025', 'Q2 2025 Status Report', 'Submitted Jul 11, 2025', 'Accepted', 'success'),
    ],
    invoices: deriveInvoiceItems('Water Quality Sampling — Okanogan'),
  },
};

/** @type {ExplorerContract} */
const contractEntiat = {
  id: 'pc-entiat',
  number: '56512 REL 14',
  title: 'Hatchery Supplementation — Entiat',
  vendor: 'Pacific Environmental Services, LLC',
  status: 'Active',
  clusters: {
    sow: [
      sow('sow-entiat-orig', 'Statement of Work — original', 'Effective Oct 1, 2023', 'Current', 'success'),
      sow('sow-entiat-amd1', 'SOW Amendment 1', 'Effective Jun 1, 2024', 'Current', 'success'),
    ],
    lib: [
      lib('lib-entiat-r1', 'LIB Rev 1', 'Effective Oct 1, 2023', 'Superseded', 'default'),
      lib('lib-entiat-r2', 'LIB Rev 2', 'Effective Jun 1, 2024', 'Active', 'success'),
    ],
    statusReports: [
      sr('sr-entiat-q1-2026', 'Q1 2026 Status Report', 'Submitted Apr 8, 2026', 'Accepted', 'success'),
      sr('sr-entiat-q4-2025', 'Q4 2025 Status Report', 'Submitted Jan 12, 2026', 'Accepted', 'success'),
    ],
    invoices: deriveInvoiceItems('Hatchery Supplementation — Entiat'),
  },
};

// ── Project 3 — Mainstem Passage, PIT Tag & Lamprey ─────────────────────────────────────
// BPA project 2001-017-00. Three contracts spanning smolt survival telemetry, PIT tag
// infrastructure O&M at Lower Granite, and Pacific lamprey passage on the Umatilla.

/** @type {ExplorerContract} */
const contractTelemetry = {
  id: 'pc-telemetry',
  number: '56721 REL 31',
  title: 'Smolt Survival Telemetry Study',
  vendor: 'Cascade Fisheries Consulting',
  // Pending modification — SOW amendment and draft LIB revision reflect the mod in progress
  status: 'Pending modification',
  clusters: {
    sow: [
      sow('sow-telemetry-orig', 'Statement of Work — original', 'Effective Oct 1, 2022', 'Superseded', 'default'),
      sow('sow-telemetry-amd1', 'SOW Amendment 1', 'Effective Oct 1, 2023', 'Current', 'success'),
    ],
    lib: [
      lib('lib-telemetry-r1', 'LIB Rev 1', 'Effective Oct 1, 2022', 'Superseded', 'default'),
      lib('lib-telemetry-r2', 'LIB Rev 2', 'Effective Oct 1, 2023', 'Superseded', 'default'),
      lib('lib-telemetry-r3', 'LIB Rev 3', 'Effective Oct 1, 2024', 'Active', 'success'),
      // Draft revision tied to Mod 2 — pending modification
      lib('lib-telemetry-r4-draft', 'LIB Rev 4 (draft under Mod 2)', 'Pending countersignature', 'Draft', 'warning'),
    ],
    statusReports: [
      sr('sr-telemetry-q1-2026', 'Q1 2026 Status Report', 'Submitted Apr 14, 2026', 'Accepted', 'success'),
      sr('sr-telemetry-q4-2025', 'Q4 2025 Status Report', 'Submitted Jan 14, 2026', 'Accepted', 'success'),
      sr('sr-telemetry-q3-2025', 'Q3 2025 Status Report', 'Submitted Oct 9, 2025', 'Accepted', 'success'),
    ],
    invoices: deriveInvoiceItems('Smolt Survival Telemetry Study'),
  },
};

/** @type {ExplorerContract} */
const contractPitTagLG = {
  id: 'pc-pit-tag-lg',
  number: '56721 REL 38',
  title: 'PIT Tag Detection System O&M — Lower Granite',
  vendor: 'Pacific States Marine Fisheries Commission',
  status: 'Active',
  clusters: {
    sow: [
      sow('sow-pittag-orig', 'Statement of Work — original', 'Effective Oct 1, 2023', 'Current', 'success'),
    ],
    lib: [
      lib('lib-pittag-r1', 'LIB Rev 1', 'Effective Oct 1, 2023', 'Superseded', 'default'),
      lib('lib-pittag-r2', 'LIB Rev 2', 'Effective Oct 1, 2024', 'Active', 'success'),
    ],
    statusReports: [
      // Q1 2026 is the one awaiting COR review — matches task-sr-lg-q1-2026 in my-work.mjs
      sr('sr-pittag-q1-2026', 'Q1 2026 Status Report', 'Submitted May 30, 2026', 'Awaiting review', 'warning'),
      sr('sr-pittag-q4-2025', 'Q4 2025 Status Report', 'Submitted Jan 13, 2026', 'Accepted', 'success'),
      sr('sr-pittag-q3-2025', 'Q3 2025 Status Report', 'Submitted Oct 8, 2025', 'Accepted', 'success'),
    ],
    // No invoices in reviewQueue for this contract; authored historical paid invoices
    invoices: [
      {
        id: 'inv-hist-pittag-0029',
        label: 'INV-2026-0029',
        sub: '$28,400.00 · submitted Apr 3, 2026',
        status: { label: 'Approved', variant: 'success' },
        href: '#',
      },
      {
        id: 'inv-hist-pittag-0018',
        label: 'INV-2026-0018',
        sub: '$31,200.00 · submitted Jan 22, 2026',
        status: { label: 'Approved', variant: 'success' },
        href: '#',
      },
    ],
  },
};

/** @type {ExplorerContract} */
const contractLamprey = {
  id: 'pc-lamprey-umatilla',
  number: '56721 REL 45',
  title: 'Pacific Lamprey Passage — Umatilla',
  vendor: 'Confederated Tribes of the Umatilla Indian Reservation',
  status: 'Active',
  clusters: {
    sow: [
      sow('sow-lamprey-orig', 'Statement of Work — original', 'Effective Oct 1, 2024', 'Current', 'success'),
    ],
    lib: [
      lib('lib-lamprey-r1', 'LIB Rev 1', 'Effective Oct 1, 2024', 'Active', 'success'),
    ],
    statusReports: [
      sr('sr-lamprey-q1-2026', 'Q1 2026 Status Report', 'Submitted Apr 10, 2026', 'Accepted', 'success'),
      sr('sr-lamprey-q4-2025', 'Q4 2025 Status Report', 'Submitted Jan 10, 2026', 'Accepted', 'success'),
    ],
    // No invoices in reviewQueue; authored historical paid invoices
    invoices: [
      {
        id: 'inv-hist-lamprey-0023',
        label: 'INV-2026-0023',
        sub: '$19,600.00 · submitted Mar 18, 2026',
        status: { label: 'Approved', variant: 'success' },
        href: '#',
      },
    ],
  },
};

// ── Project 4 — Hatchery & Juvenile Trapping M&E ─────────────────────────────────────────
// BPA project 2005-088-00. Two contracts: rotary screw trap juvenile salmonid M&E on the
// Chiwawa and hatchery effectiveness M&E at Winthrop NFH.

/** @type {ExplorerContract} */
const contractChiwawaRST = {
  id: 'pc-chiwawa-rst',
  number: '56921 REL 09',
  title: 'Rotary Screw Trap Juvenile M&E — Chiwawa',
  vendor: 'Yakama Nation Fisheries',
  status: 'Active',
  clusters: {
    sow: [
      sow('sow-chiwawa-orig', 'Statement of Work — original', 'Effective Oct 1, 2024', 'Current', 'success'),
    ],
    lib: [
      lib('lib-chiwawa-r1', 'LIB Rev 1', 'Effective Oct 1, 2024', 'Active', 'success'),
    ],
    statusReports: [
      // Awaiting acceptance — matches task-sr-chiwawa-q1-2026 (waiting: true) in my-work.mjs
      sr('sr-chiwawa-q1-2026', 'Q1 2026 Status Report', 'Submitted Jun 5, 2026 · awaiting acceptance', 'Awaiting review', 'warning'),
      sr('sr-chiwawa-q4-2025', 'Q4 2025 Status Report', 'Submitted Jan 7, 2026', 'Accepted', 'success'),
    ],
    // No invoices in reviewQueue; authored historical paid invoices
    invoices: [
      {
        id: 'inv-hist-chiwawa-0033',
        label: 'INV-2026-0033',
        sub: '$16,800.00 · submitted May 12, 2026',
        status: { label: 'Approved', variant: 'success' },
        href: '#',
      },
      {
        id: 'inv-hist-chiwawa-0021',
        label: 'INV-2026-0021',
        sub: '$17,400.00 · submitted Feb 18, 2026',
        status: { label: 'Approved', variant: 'success' },
        href: '#',
      },
    ],
  },
};

/** @type {ExplorerContract} */
const contractWinthropHatchery = {
  id: 'pc-winthrop-hatchery',
  number: '56921 REL 16',
  title: 'Hatchery Effectiveness M&E — Winthrop NFH',
  vendor: 'Fish Pro Inc.',
  status: 'Closeout eligible',
  clusters: {
    sow: [
      sow('sow-winthrop-orig', 'Statement of Work — original', 'Effective Oct 1, 2022', 'Superseded', 'default'),
      sow('sow-winthrop-amd1', 'SOW Amendment 1', 'Effective Oct 1, 2023', 'Current', 'success'),
    ],
    lib: [
      lib('lib-winthrop-r1', 'LIB Rev 1', 'Effective Oct 1, 2022', 'Superseded', 'default'),
      lib('lib-winthrop-r2', 'LIB Rev 2', 'Effective Oct 1, 2023', 'Superseded', 'default'),
      lib('lib-winthrop-r3', 'LIB Rev 3', 'Effective Oct 1, 2024', 'Active', 'success'),
    ],
    statusReports: [
      sr('sr-winthrop-q1-2026', 'Q1 2026 Status Report', 'Submitted Apr 9, 2026', 'Accepted', 'success'),
      sr('sr-winthrop-q4-2025', 'Q4 2025 Status Report', 'Submitted Jan 11, 2026', 'Accepted', 'success'),
      sr('sr-winthrop-q3-2025', 'Q3 2025 Status Report', 'Submitted Oct 14, 2025', 'Accepted', 'success'),
    ],
    // No invoices in reviewQueue; authored historical paid invoices consistent with
    // expended = $193,800 (contract is in closeout, nearly fully expended)
    invoices: [
      {
        id: 'inv-hist-winthrop-0036',
        label: 'INV-2026-0036',
        sub: '$22,600.00 · submitted Apr 28, 2026',
        status: { label: 'Approved', variant: 'success' },
        href: '#',
      },
      {
        id: 'inv-hist-winthrop-0024',
        label: 'INV-2026-0024',
        sub: '$24,100.00 · submitted Feb 5, 2026',
        status: { label: 'Approved', variant: 'success' },
        href: '#',
      },
    ],
  },
};

// ── Attention rollup ────────────────────────────────────────────────────────────────────────
// A parent row (project / contract / artifact) shows a quiet badge dot when something below it
// needs the COR's attention. "Attention" = a warning or danger status only; success/info/default
// (Accepted, Approved, Submitted, Current, Superseded…) are the calm majority and never roll up,
// so the dots stay sparse and meaningful. Dot color follows the highest severity found (danger
// outranks warning) — same severity language the esa-pill variants already speak.

/** @param {'warning'|'danger'|null} s */
const sevRank = (s) => (s === 'danger' ? 2 : s === 'warning' ? 1 : 0);
/** Keep the higher of two severities. @returns {Attention} */
const maxSev = (a, b) => (sevRank(a) >= sevRank(b) ? a : b);

/**
 * Attention severity carried by a single record's status pill.
 * @param {PillStatus | null} status
 * @returns {Attention}
 */
function statusSeverity(status) {
  if (status?.variant === 'danger') return 'danger';
  if (status?.variant === 'warning') return 'warning';
  return null;
}

/**
 * Highest attention severity across a list of records.
 * @param {EntityItem[]} items
 * @returns {Attention}
 */
const itemsAttention = (items = []) =>
  items.reduce((acc, it) => maxSev(acc, statusSeverity(it.status)), /** @type {Attention} */ (null));

/**
 * Attention carried by a contract's OWN status string (a contract IS a child of its project,
 * so its non-Active status rolls up to the project dot). Mirrors cbf-portfolio-explorer's
 * contractStatus() variant map: Closeout eligible → info (calm), any other non-Active
 * ('Pending modification' | 'Expiring soon') → warning.
 * @param {string} status
 * @returns {Attention}
 */
const contractStatusSeverity = (status) =>
  !status || status === 'Active' || status === 'Closeout eligible' ? null : 'warning';

/** Enrich one contract with per-artifact and whole-contract descendant rollups. */
function enrichContract(c) {
  const clusterAttention = {
    sow: itemsAttention(c.clusters.sow),
    lib: itemsAttention(c.clusters.lib),
    statusReports: itemsAttention(c.clusters.statusReports),
    invoices: itemsAttention(c.clusters.invoices),
  };
  // The contract-row dot reflects its records only — the contract's own status already shows
  // as a trailing pill, so folding it in here would just duplicate that signal.
  const attention = Object.values(clusterAttention).reduce(maxSev, /** @type {Attention} */ (null));
  return { ...c, clusterAttention, attention };
}

/** Enrich one project: its dot rolls up every contract's status AND every record beneath it. */
function enrichProject(p) {
  const contracts = p.contracts.map(enrichContract);
  const attention = contracts.reduce(
    (acc, c) => maxSev(acc, maxSev(contractStatusSeverity(c.status), c.attention)),
    /** @type {Attention} */ (null),
  );
  return { ...p, contracts, attention };
}

// ── Project preview (hover card) ──────────────────────────────────────────────────────────
// The column-1 hover card surfaces three at-a-glance signals per project: who sponsors it,
// where its budget sits (rolled up across its contracts, % spent vs an authored planned
// baseline), and the most recent activity. Budget figures are SUMMED from my-work.mjs's
// portfolio[] (matched by contract id) — never re-authored here — so the explorer and the
// portfolio table can never diverge. Sponsor, the planned baseline, and last activity are
// authored per project below (deterministic, domain-credible; not present in portfolio[]).

/** Portfolio contracts indexed by id, for O(1) budget lookup during rollup. */
const portfolioById = new Map(portfolio.map((c) => [c.id, c]));

/**
 * Authored per-project meta the budget rollup can't supply.
 *  - sponsor:     the BPA project sponsor (implementing entity).
 *  - plannedPct:  baseline planned % of budget spent to date (from the spend plan).
 *  - lastActivity the most recent notable event on the project.
 * Keyed by ExplorerProject.id.
 * @type {Record<string, { sponsor: string; plannedPct: number; lastActivity: { label: string; date: string } }>}
 */
const projectMeta = {
  'proj-wenatchee-methow': {
    sponsor: 'Chelan County Natural Resources',
    plannedPct: 70,
    lastActivity: { label: 'Invoice INV-2026-0047 submitted', date: 'Jun 12, 2026' },
  },
  'proj-okanogan-entiat': {
    sponsor: 'Colville Confederated Tribes',
    plannedPct: 65,
    lastActivity: { label: 'Final invoice submitted — Okanogan', date: 'Jun 10, 2026' },
  },
  'proj-mainstem-passage': {
    sponsor: 'Pacific States Marine Fisheries Commission',
    plannedPct: 72,
    lastActivity: { label: 'Q1 2026 Status Report submitted — PIT Tag O&M', date: 'May 30, 2026' },
  },
  'proj-hatchery-juvenile-me': {
    sponsor: 'Yakama Nation Fisheries',
    plannedPct: 68,
    lastActivity: { label: 'Q1 2026 Status Report submitted — Chiwawa RST', date: 'Jun 5, 2026' },
  },
};

/**
 * Build a project's ProjectPreview: roll up its contracts' budget from portfolio[] and
 * merge the authored sponsor / planned baseline / last activity.
 * @param {ExplorerProject} p
 * @returns {ProjectPreview}
 */
function buildPreview(p) {
  const meta = projectMeta[p.id];
  const rollup = p.contracts.reduce(
    (acc, c) => {
      const pc = portfolioById.get(c.id);
      if (pc) { acc.value += pc.value; acc.expended += pc.expended; }
      return acc;
    },
    { value: 0, expended: 0 },
  );
  const remaining = rollup.value - rollup.expended;
  const spentPct = rollup.value ? Math.round((rollup.expended / rollup.value) * 100) : 0;
  const plannedPct = meta?.plannedPct ?? spentPct;
  const variancePct = spentPct - plannedPct;
  const pace = variancePct > 2 ? 'over' : variancePct < -2 ? 'under' : 'on';
  return {
    sponsor: meta?.sponsor ?? '—',
    budget: {
      value: rollup.value,
      expended: rollup.expended,
      remaining,
      valueLabel: fmtCompact(rollup.value),
      expendedLabel: fmtCompact(rollup.expended),
      spentPct,
      plannedPct,
      variancePct,
      pace,
    },
    lastActivity: meta?.lastActivity ?? { label: 'No recent activity', date: '' },
  };
}

/** Attach the hover-card preview to an already-enriched project. */
const attachPreview = (p) => ({ ...p, preview: buildPreview(p) });

// ── Explorer projects ─────────────────────────────────────────────────────────────────────

/**
 * The COR's portfolio organized as Miller-column projects.
 * Four BPA projects covering all ten portfolio contracts from my-work.mjs.
 * Each project/contract/cluster is decorated with an `attention` rollup (see above).
 * @type {ExplorerProject[]}
 */
export const explorerProjects = [
  {
    id: 'proj-wenatchee-methow',
    number: '2003-024-00',
    name: 'Wenatchee & Methow Habitat Restoration',
    contracts: [contractWenatchee, contractMethow, contractJohnDay],
  },
  {
    id: 'proj-okanogan-entiat',
    number: '1997-031-00',
    name: 'Okanogan Water Quality & Hatchery Supplementation',
    contracts: [contractOkanogan, contractEntiat],
  },
  {
    id: 'proj-mainstem-passage',
    number: '2001-017-00',
    name: 'Mainstem Passage — Telemetry, PIT Tag & Lamprey',
    contracts: [contractTelemetry, contractPitTagLG, contractLamprey],
  },
  {
    id: 'proj-hatchery-juvenile-me',
    number: '2005-088-00',
    name: 'Hatchery & Juvenile Trapping M&E',
    contracts: [contractChiwawaRST, contractWinthropHatchery],
  },
].map(enrichProject).map(attachPreview);
