// Handoff spec for the /vendor-portal prototype — curated sections for the
// vendor's invoices & financial-outlook view. Consumed only by
// scripts/gen-handoff.mjs at build time.

/** @type {{ sections: import('./search.mjs').HandoffSection[] }} */
export default {
  sections: [
    {
      label: 'Portal header',
      selector: '.cbf-vendor-portal-header',
      intent:
        'Welcome banner on the invoices view. Greets the vendor by first name using esa-page-header with the primary CTA (Submit Invoice → /vendor-invoice). The activity-stat row is suppressed here (showStats={false}) because the financial-outlook band below owns the numbers.',
      decisions: [
        'esa-page-header owns the greeting + primary CTA — do not hand-roll a custom heading + button pair.',
        'showStats is false on this page so two stat rows do not compete; the financial-outlook band is the single source of headline metrics.',
        'Primary CTA button links to /vendor-invoice; no secondary action in the header.',
      ],
      gotchas: [
        'The greeting uses the vendor\'s first name split from the full contact string — "Maria" not "Maria Garcia".',
      ],
    },
    {
      label: 'Financial outlook band',
      selector: '.cbf-vendor-financial-outlook',
      intent:
        'The headline money rollup — total contracted, expended-to-date, remaining, awaiting BPA approval, and approved-but-unpaid — so the vendor reads their cross-contract position WITHOUT drilling into each contract. A row of esa-stat legos plus an as-of provenance caption.',
      decisions: [
        'Metrics are esa-stat legos inside the cluster primitive — not a bespoke metric block.',
        'Figures derive from the shared vendor-portal-invoices data module (deriveOutlook) so the band, attention strip, and table can never drift.',
        'The as-of caption is required, not cosmetic: expenditures are a nightly PeopleSoft feed, so an unstamped figure reads as an untrusted figure.',
        'Awaiting approval is accented (esa-stat accent) — it is the money in flight the vendor cares about most.',
      ],
      gotchas: [
        'Big figures use the compact currency formatter ($1.84M); invoice-level amounts use the exact formatter ($4,850.00) — both live in the data module.',
        'esa-stat has no unit prop — currency formatting is baked into the value string.',
      ],
    },
    {
      label: 'Needs-attention strip',
      selector: '.cbf-vendor-attention',
      intent:
        'Hoists invoices blocked ON THE VENDOR (Needs revision) out of the table into one unmissable CTA — the rejection/fix loop discovery flagged as the most painful hand-off. Renders nothing when the count is zero.',
      decisions: [
        'esa-alert-box (variant="warning") is the lego — no bespoke banner.',
        'The Review CTA drives the table\'s status chip-group to "Needs revision" and scrolls it into view, decoupled via the chip\'s public selector + value property.',
      ],
      gotchas: [
        'The whole section is conditional on count > 0 — verify it disappears cleanly when no invoice needs revision.',
      ],
    },
    {
      label: 'Invoices table',
      selector: '.cbf-vendor-portal-invoices',
      intent:
        'A searchable, status-filterable, group-able tracking table of the vendor\'s invoices across every pipeline stage (Submitted, In review, Approved, Paid, Needs revision). Search header + status chip filter + group-by (None/Contract/Project) over an esa-badge status column, with a click-a-row esa-side-dialog detail drawer, an esa-empty-state for no matches, and a live record-count footer.',
      decisions: [
        'No esa-table/data-grid lego exists and the spoke has no AG Grid dependency — the table scaffold is a documented bcn build; status uses esa-badge, search reuses cbf-search-field, status + group-by controls use esa-chip-group, the detail drawer uses esa-side-dialog, and the no-results state uses esa-empty-state.',
        'Status color encodes stage (info/warning/success/secondary/danger) — color conveys data, not decoration; no colored left-border row indicators.',
        'Search + status filter + grouping are recomputed together in one client render(); group-by injects scoped divider rows and parks hidden rows last.',
        'The drawer leads with a sunken amount hero (billed amount + status badge), then a spec list (contract/project/invoice date/performance period/submitted), the line-item breakdown with a reconciling invoice total, and a notes block; a Download PDF action and Previous/Next sit in the footer. Previous/Next step through the CURRENTLY VISIBLE rows so filtering scopes the walk-through.',
        'Hierarchy is carried by type-role + weight + color, not decoration: the amount is the type-page-title hero, contract is the lead value, labels are 14px normal-case muted (never uppercase micro-labels).',
      ],
      gotchas: [
        'Mock invoices are deterministic and fictional — amounts, contracts, and line items are invented, not derived from client documents. Line-item totals sum exactly to each invoice amount so the drawer math always reconciles.',
        'Drawer line-item rows are injected by JS, so their table styles live in a <style is:global> block (Astro scope hashes do not reach JS-created nodes); the status badge is cloned from the row\'s rendered esa-badge.',
        'The table is dense (14px) and horizontally scrollable on narrow viewports so the frame stays stable; amounts use tabular-nums and right-align.',
        'esa-chip-group is single-select with value="" as the "All" escape; it emits a bubbling change event the table listens for.',
        'EsaButton drops unknown attrs, so the drawer\'s prev/next data-hooks live on wrapper spans — the script toggles the inner native <button>\'s disabled state.',
      ],
    },
  ],
};
