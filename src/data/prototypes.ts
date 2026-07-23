// The spoke's prototype registry — the single source of truth that drives:
//   1. the home page index table (src/pages/index.astro),
//   2. (later) the per-route handoff bundles we capture (one per `route`),
//   3. (later) the runtime inspector's manifest lookup (/handoff/<slug>/…).
// Add a row here when you ship a new prototype; everything else reads from it.

export type PrototypeStatus = 'live' | 'in-progress' | 'archived';

export interface Prototype {
  /** URL-safe id. Also the handoff bundle subfolder name (public/handoff/<slug>/). */
  slug: string;
  title: string;
  description: string;
  /** Internal route, root-relative and base-less — wrap with withBase() at render. */
  route: string;
  /** ISO date (YYYY-MM-DD) the prototype was first built. */
  createdAt: string;
  /** Jira ticket id, e.g. "CBF-8117". Optional — not every prototype has one. */
  ticket?: string;
  status: PrototypeStatus;
}

export const prototypes: Prototype[] = [
  {
    slug: 'lib-pi-editing',
    title: 'LIB & PI document editing',
    description:
      'A supportive, fully explained process for unlocking Line Item Budget and Property Inventory document edits under select business conditions — replace a file in place with all specifications retained, approvals reset, and the COR notified when an already-approved document changes.',
    route: '/lib-pi-editing',
    createdAt: '2026-07-23',
    ticket: 'CBF-8204',
    status: 'in-progress',
  },
  {
    slug: 'home',
    title: 'CBFish homepage',
    description:
      'A static, in-design-system snapshot of the live cbfish.org landing — the shared home every prototype returns to via the logo and the Home breadcrumb.',
    route: '/home',
    createdAt: '2026-06-24',
    status: 'live',
  },
  {
    slug: 'search',
    title: 'Global search & command palette',
    description:
      'Omni-search command palette (⌘K) plus a full /search results page with faceted filtering.',
    route: '/search',
    createdAt: '2026-06-04',
    ticket: 'CBF-8117',
    status: 'live',
  },
  {
    slug: 'vendor-dashboard',
    title: 'Vendor dashboard',
    description:
      "Vendor’s invoices & financial-outlook view — cross-contract money position, a needs-attention strip, and a sortable invoices grid with a click-through detail drawer.",
    route: '/vendor-dashboard',
    createdAt: '2026-06-15',
    status: 'in-progress',
  },
  {
    slug: 'vendor-invoice',
    title: 'Vendor invoice submission',
    description:
      'Three-step wizard: upload a PDF invoice, enter metadata + contract reference + line items, then review and submit.',
    route: '/vendor-invoice',
    createdAt: '2026-06-15',
    status: 'in-progress',
  },
  {
    slug: 'my-work',
    title: 'Dashboard (COR landing)',
    description:
      'The COR landing console — a tabbed case-management surface: the action queue and at-risk band, the invoice workspace with Asset Suite status, and a portfolio health view. Tab badges carry urgent counts everywhere.',
    route: '/my-work',
    createdAt: '2026-07-13',
    status: 'in-progress',
  },
  {
    slug: 'project-budgets',
    title: 'Project budgets',
    description:
      'A new Funding area for managing project budgets by fiscal year and fund. Starts with the "Summary" landing — sub-nav across Baselines, SOY, Decisions, and Change requests (BOG), a photo/prose intro, and related report links.',
    route: '/project-budgets',
    createdAt: '2026-06-23',
    status: 'in-progress',
  },
  {
    slug: 'map-sow',
    title: 'Habitat Design Tool',
    description:
      'Map-based statement-of-work builder — draw work elements on a Leaflet map, compute pre-project metrics from digitized features, and export a formatted SOW.',
    route: '/map-sow',
    createdAt: '2026-06-22',
    status: 'in-progress',
  },
  {
    slug: 'crs-commitments',
    title: 'Basin Fish Passage Commitments',
    description:
      'A scannable grid of every tracked fish/wildlife mitigation commitment, filterable by category and status, drilling into a per-commitment summary with its full record and multi-year status timeline.',
    route: '/crs-commitments',
    createdAt: '2026-07-16',
    status: 'in-progress',
  },
  {
    slug: 'rme-work-elements',
    title: 'RM&E Work Elements Report',
    description:
      'Every Work Statement Element carrying RM&E work, field-for-field with the legacy report, with a new twist: Primary/Secondary RM&E Type and Focal Area are editable right in the grid instead of a multi-click path to a separate metrics tab.',
    route: '/rme-work-elements',
    createdAt: '2026-07-23',
    status: 'in-progress',
  },
];

/** Newest first — the order the index table renders. */
export const prototypesByNewest = (): Prototype[] =>
  [...prototypes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
