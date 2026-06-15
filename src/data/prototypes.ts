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
    slug: 'search',
    title: 'Global search & command palette',
    description:
      'Omni-search command palette (⌘K) plus a full /search results page with faceted filtering — CBFish Modernization "Report Center v2".',
    route: '/search',
    createdAt: '2026-06-04',
    ticket: 'CBF-8117',
    status: 'live',
  },
  {
    slug: 'vendor-invoice',
    title: 'Vendor invoice submission',
    description:
      'Three-step wizard for vendor accountants: upload a PDF invoice, enter invoice metadata + contract reference + line items, then review and submit.',
    route: '/vendor-invoice',
    createdAt: '2026-06-15',
    status: 'in-progress',
  },
];

/** Newest first — the order the index table renders. */
export const prototypesByNewest = (): Prototype[] =>
  [...prototypes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
