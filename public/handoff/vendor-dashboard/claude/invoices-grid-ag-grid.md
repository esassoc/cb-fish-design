# Invoices grid (AG Grid)

Vendor dashboard · source prototype: https://esassoc.github.io/cb-fish-design/vendor-dashboard/

![Invoices grid (AG Grid), desktop](https://esassoc.github.io/cb-fish-design/handoff/vendor-dashboard/claude/invoices-grid-ag-grid.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/vendor-dashboard/claude/invoices-grid-ag-grid.phone.png

A searchable, status-filterable, group-able, SORTABLE tracking grid of the vendor's invoices across every pipeline stage (Submitted, In review, Approved, Paid, Needs revision). Search header + status chip filter + group-by (None/Contract/Project) over an AG Grid Community data grid with an esa-badge status column, a click-a-row esa-side-dialog detail drawer, an esa-empty-state for no matches, and a live record-count footer.

## Key decisions

- No esa-table/data-grid lego exists, so the tabular surface is AG Grid Community (ag-grid-community, MIT) — an explicit dependency chosen for built-in sort/filter/quick-search over a hand-rolled <table>. The bcn- component is its reusable home; every other control stays a lego: status uses esa-badge, search reuses cbf-search-field, status + group-by controls use esa-chip-group, the detail drawer uses esa-side-dialog, and the no-results state uses esa-empty-state.
- AG Grid is wired to the spoke's tokens via the Theming API (themeQuartz.withParams mapping --color-background-elevation-raised / --color-background-elevation-sunken / --color-border-default / --color-content-default / --color-content-default-secondary / --color-background-brand / --color-background-brand-subtle) so the grid reads like the surrounding data cards, not a third-party palette. The grid's own border/radius are suppressed; the bcn wrapper owns the framed surface. domLayout is autoHeight so the page (not an inner pane) owns vertical scroll.
- Status color encodes stage (info/warning/success/secondary/danger) — color conveys data, not decoration; no colored left-border row indicators.
- Search drives AG Grid's quickFilterText; the status chip drives an EXTERNAL filter (isExternalFilterPresent/doesExternalFilterPass) so the esa-chip-group stays the single control surface and the column header filter UI is suppressed. Column sorting is enabled on every column (the new capability the grid buys).
- Community has NO native row grouping (Enterprise-only), so the Group-by control clusters rows by applying a column sort on the chosen field; "None" clears it — it does not draw grouped header bands.
- The drawer is a two-pane layout mirroring the /vendor-invoice PDF-left / form-right workspace: a document "sheet" (a paper rendering of the submitted invoice — supplier letterhead, billed-to, invoice date + performance period, the line-item table, total due, and printed notes) sits beside a tracking column (the dashboard metadata the document does not carry: a sunken amount hero with the status badge, then contract/project/submitted). On wide screens (>=900px) the panel widens to 980px and the two panes sit side by side; on narrow viewports the lego clamps the panel to the viewport and the panes stack into one column LED BY the tracking hero (the "narrow treatment"), with the document beneath. A Download PDF action and Previous/Next sit in the footer. Previous/Next step through the rows CURRENTLY DISPLAYED (forEachNodeAfterFilterAndSort) so search, filter, AND sort all scope the walk-through.
- Hierarchy is carried by type-role + weight + color, not decoration: the amount is the typography-heading-lg hero, contract is the lead value, labels are 14px normal-case muted (never uppercase micro-labels).

## Gotchas

- Mock invoices are deterministic and fictional — amounts, contracts, and line items are invented, not derived from client documents. Line-item totals sum exactly to each invoice amount so the drawer math always reconciles.
- esa-badge is a presentational .astro (Astro-scoped CSS), NOT a web component — so grid status cells cannot just write <span class="esa-badge">. One real esa-badge per stage is server-rendered into hidden [data-badge-templates] (scope hash intact); the cellRenderer and the drawer clone that exact markup, so grid badges are byte-identical to the lego and never reinvented.
- Row data reaches the client module (which imports ag-grid-community) via a <script type="application/json" data-invoice-data> blob — no second fetch.
- The drawer document sheet (.cbf-doc-sheet) is built per-invoice by JS on row click, so all its styles live in a <style is:global> block (Astro scope hashes do not reach JS-created nodes). Its parties (Pacific Environmental Services / Columbia Basin Fish & Wildlife Program) are fixed mock constants in the client module; injected strings are HTML-escaped. The drawer panel widens via an inline --side-dialog-width-lg override (980px); the lego still clamps to calc(100vw - inset) so mobile stays single-column and overflow-free.
- The Submitted column is configured as cellDataType:"date" with a valueGetter that parses the display string to a Date (a plain string column sorts lexically — "Apr"<"Jun"<"May", wrong for dates) and a valueFormatter that renders it back to the "Jun 20, 2026" form; a getQuickFilterText feeds the original string so search still matches typed dates. Amount is type:"numericColumn"; the other columns are genuinely string-typed.
- AG Grid Community is registered via ModuleRegistry.registerModules([AllCommunityModule]) before createGrid; amounts use a USD valueFormatter + tabular-nums and right-align.
- esa-chip-group is single-select with value="" as the "All" escape; it emits a bubbling change event the grid listens for (search→quickFilter, status→external filter, group→column sort).
- EsaButton drops unknown attrs, so the drawer's prev/next data-hooks live on wrapper spans — the script toggles the inner native <button>'s disabled state.
- Installing ag-grid-community while `astro dev` is live trips the 504 Outdated-Optimize-Dep break on the esa-* web components — stop the dev server before any dependency churn, then restart.

## Components

- `cbf-doc-sheet` (spoke) · `src/components/vendor-dashboard/cbf-vendor-dashboard-invoices.astro`
- `cbf-grid-id` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-grid-num` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-grid-status` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-icon` (spoke) · `src/components/search/cbf-icon.astro`
- `cbf-invoice-attach-list` (spoke) · `src/components/vendor-dashboard/cbf-vendor-dashboard-invoices.astro`
- `cbf-invoice-card` (spoke) · `src/components/shared/cbf-invoice-card.astro`
- `cbf-invoice-card-link` (spoke) · `src/components/vendor-dashboard/cbf-vendor-dashboard-invoices.astro`
- `cbf-invoice-detail` (spoke) · `src/components/vendor-dashboard/cbf-vendor-dashboard-invoices.astro`
- `cbf-invoice-pipeline` (spoke) · `src/components/vendor-dashboard/cbf-vendor-dashboard-invoices.astro`
- `cbf-num` (spoke) · `src/components/invoice-review/cbf-invoice-processor.astro`
- `cbf-search-field` (spoke) · `src/components/search/cbf-search-field.astro`
- `cbf-vendor-dashboard-invoices` (spoke) · `src/components/vendor-dashboard/cbf-vendor-dashboard-invoices.astro`
- `esa-alert-box` (hub) · `packages/ecology/src/components/esa-alert-box.astro`
- `esa-button` (hub) · `packages/ecology/src/components/esa-button.astro`
- `esa-button-toggle` (hub) · `packages/ecology/src/components/esa-button-toggle.ts`
- `esa-card` (hub) · `packages/ecology/src/components/esa-card.astro`
- `esa-chip-group` (hub) · `packages/ecology/src/components/esa-chip-group.ts`
- `esa-empty-state` (hub) · `packages/ecology/src/components/esa-empty-state.astro`
- `esa-icon` (hub) · `packages/ecology/src/components/esa-icon.astro`
- `esa-pill` (hub) · `packages/ecology/src/components/esa-pill.astro`
- `esa-side-dialog` (hub) · `packages/ecology/src/components/esa-side-dialog.ts`

## Markup and styles

_43 repeated elements are collapsed in the markup below; the comments say where._

- [invoices-grid-ag-grid.markup-1.md](https://esassoc.github.io/cb-fish-design/handoff/vendor-dashboard/claude/invoices-grid-ag-grid.markup-1.md) (47 KB)
- [invoices-grid-ag-grid.markup-2.md](https://esassoc.github.io/cb-fish-design/handoff/vendor-dashboard/claude/invoices-grid-ag-grid.markup-2.md) (45 KB)
- [invoices-grid-ag-grid.styles.md](https://esassoc.github.io/cb-fish-design/handoff/vendor-dashboard/claude/invoices-grid-ag-grid.styles.md) (32 KB)

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--alert-box-text-color` | `#525252` | component |
| `--border-width-default` | `1px` | semantic |
| `--button-chrome-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--button-radius-md` | `.5rem` | component |
| `--button-radius-sm` | `.25rem` | component |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-header-bg` | `transparent` | component |
| `--cbf-text-placeholder` | `#9aa3ad` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-muted-hover` | `#1e5386` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-danger` | `#ce2c31` | semantic |
| `--color-background-utility-danger-hover` | `#641723` | semantic |
| `--color-background-utility-danger-subtle` | `#fffcfc` | semantic |
| `--color-background-utility-info-subtle` | `#f3f7fc` | semantic |
| `--color-background-utility-success-subtle` | `#fbfefc` | semantic |
| `--color-background-utility-warning-subtle` | `#fefdfb` | semantic |
| `--color-blue-2` | `#f4faff` | primitive |
| `--color-blue-6` | `#acd8fc` | primitive |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-border-utility-danger` | `#fdbdbe` | semantic |
| `--color-border-utility-info` | `#c6dcf1` | semantic |
| `--color-border-utility-success` | `#adddc0` | semantic |
| `--color-border-utility-warning` | `#f3d673` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--color-content-on-brand-muted` | `#203c25` | semantic |
| `--color-content-utility-danger` | `#ce2c31` | semantic |
| `--color-content-utility-info` | `#0d74ce` | semantic |
| `--color-content-utility-success` | `#218358` | semantic |
| `--color-content-utility-warning` | `#ab6400` | semantic |
| `--color-green-2` | `#f4fbf6` | primitive |
| `--color-green-6` | `#adddc0` | primitive |
| `--color-red-2` | `#fff7f7` | primitive |
| `--color-red-6` | `#fdbdbe` | primitive |
| `--color-yellow-2` | `#fefbe9` | primitive |
| `--color-yellow-6` | `#f3d673` | primitive |
| `--elevation-3` | `0 4px 20px -4px rgba(0, 0, 0, .06)` | semantic |
| `--empty-state-icon-size-md` | `48px` | component |
| `--empty-state-icon-size-sm` | `32px` | component |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--font-size-100` | `clamp(.625rem, .56rem + .32vw, .75rem)` | primitive |
| `--font-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--font-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |
| `--font-size-300` | `clamp(.875rem, .77rem + .52vw, 1.125rem)` | primitive |
| `--gap` | `1rem` | component |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-sm` | `16px` | primitive |
| `--radius-050` | `.125rem` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--radius-chip` | `.25rem` | semantic |
| `--radius-md` | `.5rem` | semantic |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-body-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-body-xs-font-weight` | `400` | semantic |
| `--typography-body-xs-letter-spacing` | `.01em` | semantic |
| `--typography-body-xs-line-height` | `1.6` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-heading-lg-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-heading-lg-font-size` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | semantic |
| `--typography-heading-lg-font-weight` | `600` | semantic |
| `--typography-heading-lg-letter-spacing` | `-.01em` | semantic |
| `--typography-heading-lg-line-height` | `1.3` | semantic |
| `--typography-heading-md-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-heading-md-font-size` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | semantic |
| `--typography-heading-md-font-weight` | `600` | semantic |
| `--typography-heading-md-letter-spacing` | `-.01em` | semantic |
| `--typography-heading-md-line-height` | `1.3` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |
| `--typography-label-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-label-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-sm-strong-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-label-sm-strong-font-weight` | `600` | semantic |
| `--typography-label-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-label-sm-strong-line-height` | `1.6` | semantic |
| `--typography-meta-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-meta-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-meta-font-weight` | `400` | semantic |
| `--typography-meta-letter-spacing` | `.01em` | semantic |
| `--typography-meta-line-height` | `1.6` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |
| `--typography-microcopy-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-microcopy-sm-font-weight` | `500` | semantic |
| `--typography-microcopy-sm-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-sm-line-height` | `1` | semantic |
| `--typography-microcopy-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-font-weight` | `500` | semantic |
| `--typography-microcopy-xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-line-height` | `1` | semantic |
