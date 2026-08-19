// Handoff spec for the /vendor-dashboard prototype — curated sections for the
// vendor's invoices & financial-outlook view. Consumed only by
// scripts/gen-handoff.mjs at build time.

/** @type {{ sections: import('./search.mjs').HandoffSection[] }} */
export default {
  sections: [
    {
      label: 'Dashboard header',
      selector: '.cbf-vendor-dashboard-header',
      intent:
        'Welcome banner on the invoices view. Greets the vendor by first name using esa-page-header with the primary CTA (Submit invoice → /vendor-invoice). The activity-stat row is suppressed here (showStats={false}) because the financial-outlook band below owns the numbers.',
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
        'Figures derive from the shared vendor-dashboard-invoices data module (deriveOutlook) so the band, attention strip, and table can never drift.',
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
      label: 'Invoices grid (AG Grid)',
      selector: '.cbf-vendor-dashboard-invoices',
      intent:
        'A searchable, status-filterable, group-able, SORTABLE tracking grid of the vendor\'s invoices across every pipeline stage (Submitted, In review, Approved, Paid, Needs revision). Search header + status chip filter + group-by (None/Contract/Project) over an AG Grid Community data grid with an esa-badge status column, a click-a-row esa-side-dialog detail drawer, an esa-empty-state for no matches, and a live record-count footer.',
      decisions: [
        'No esa-table/data-grid lego exists, so the tabular surface is AG Grid Community (ag-grid-community, MIT) — an explicit dependency chosen for built-in sort/filter/quick-search over a hand-rolled <table>. The bcn- component is its reusable home; every other control stays a lego: status uses esa-badge, search reuses cbf-search-field, status + group-by controls use esa-chip-group, the detail drawer uses esa-side-dialog, and the no-results state uses esa-empty-state.',
        'AG Grid is wired to the spoke\'s tokens via the Theming API (themeQuartz.withParams mapping --color-background-elevation-raised / --color-border-default / --color-text-* / --color-background-brand) so the grid reads like the surrounding data cards, not a third-party palette. The grid\'s own border/radius are suppressed; the bcn wrapper owns the framed surface. domLayout is autoHeight so the page (not an inner pane) owns vertical scroll.',
        'Status color encodes stage (info/warning/success/secondary/danger) — color conveys data, not decoration; no colored left-border row indicators.',
        'Search drives AG Grid\'s quickFilterText; the status chip drives an EXTERNAL filter (isExternalFilterPresent/doesExternalFilterPass) so the esa-chip-group stays the single control surface and the column header filter UI is suppressed. Column sorting is enabled on every column (the new capability the grid buys).',
        'Community has NO native row grouping (Enterprise-only), so the Group-by control clusters rows by applying a column sort on the chosen field; "None" clears it — it does not draw grouped header bands.',
        'The drawer is a two-pane layout mirroring the /vendor-invoice PDF-left / form-right workspace: a document "sheet" (a paper rendering of the submitted invoice — supplier letterhead, billed-to, invoice date + performance period, the line-item table, total due, and printed notes) sits beside a tracking column (the dashboard metadata the document does not carry: a sunken amount hero with the status badge, then contract/project/submitted). On wide screens (>=900px) the panel widens to 980px and the two panes sit side by side; on narrow viewports the lego clamps the panel to the viewport and the panes stack into one column LED BY the tracking hero (the "narrow treatment"), with the document beneath. A Download PDF action and Previous/Next sit in the footer. Previous/Next step through the rows CURRENTLY DISPLAYED (forEachNodeAfterFilterAndSort) so search, filter, AND sort all scope the walk-through.',
        'Hierarchy is carried by type-role + weight + color, not decoration: the amount is the typography-heading-lg hero, contract is the lead value, labels are 14px normal-case muted (never uppercase micro-labels).',
      ],
      gotchas: [
        'Mock invoices are deterministic and fictional — amounts, contracts, and line items are invented, not derived from client documents. Line-item totals sum exactly to each invoice amount so the drawer math always reconciles.',
        'esa-badge is a presentational .astro (Astro-scoped CSS), NOT a web component — so grid status cells cannot just write <span class="esa-badge">. One real esa-badge per stage is server-rendered into hidden [data-badge-templates] (scope hash intact); the cellRenderer and the drawer clone that exact markup, so grid badges are byte-identical to the lego and never reinvented.',
        'Row data reaches the client module (which imports ag-grid-community) via a <script type="application/json" data-invoice-data> blob — no second fetch.',
        'The drawer document sheet (.cbf-doc-sheet) is built per-invoice by JS on row click, so all its styles live in a <style is:global> block (Astro scope hashes do not reach JS-created nodes). Its parties (Pacific Environmental Services / Columbia Basin Fish & Wildlife Program) are fixed mock constants in the client module; injected strings are HTML-escaped. The drawer panel widens via an inline --side-dialog-width-lg override (980px); the lego still clamps to calc(100vw - inset) so mobile stays single-column and overflow-free.',
        'The Submitted column is configured as cellDataType:"date" with a valueGetter that parses the display string to a Date (a plain string column sorts lexically — "Apr"<"Jun"<"May", wrong for dates) and a valueFormatter that renders it back to the "Jun 20, 2026" form; a getQuickFilterText feeds the original string so search still matches typed dates. Amount is type:"numericColumn"; the other columns are genuinely string-typed.',
        'AG Grid Community is registered via ModuleRegistry.registerModules([AllCommunityModule]) before createGrid; amounts use a USD valueFormatter + tabular-nums and right-align.',
        'esa-chip-group is single-select with value="" as the "All" escape; it emits a bubbling change event the grid listens for (search→quickFilter, status→external filter, group→column sort).',
        'EsaButton drops unknown attrs, so the drawer\'s prev/next data-hooks live on wrapper spans — the script toggles the inner native <button>\'s disabled state.',
        'Installing ag-grid-community while `astro dev` is live trips the 504 Outdated-Optimize-Dep break on the esa-* web components — stop the dev server before any dependency churn, then restart.',
      ],
    },
  ],
};
