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
    slug: 'vendor-portal',
    title: 'Vendor portal',
    description:
      'Accountant landing page — activity snapshot and four quick-action cards for invoice management.',
    route: '/vendor-portal',
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
    slug: 'invoice-review',
    title: 'Invoice review (COR)',
    description:
      'The reviewer’s side: an urgency-triaged queue of invoices assigned across contracts, and a split-view detail — submitted document beside the contract context — to QA/QC then Approve or Return for revision.',
    route: '/invoice-review',
    createdAt: '2026-06-22',
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
];

/** Newest first — the order the index table renders. */
export const prototypesByNewest = (): Prototype[] =>
  [...prototypes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
