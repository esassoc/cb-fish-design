# Invoices grid (AG Grid)

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

## Markup
```html
<section class="cbf-vendor-dashboard-invoices stack" data-gap="md">
  <header class="cbf-vendor-dashboard-invoices__header repel">
    <h2 class="typography-heading-md">Invoices</h2>
    <div class="cbf-vendor-dashboard-invoices__search">
      <label class="cbf-search-field">
        <span class="cbf-icon"
          ><svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path></svg
        ></span>
        <input
          type="text"
          autocomplete="off"
          placeholder="Search invoices, contracts or status…"
          data-invoice-search="true"
          aria-label="Search invoices"
          class="astro-lfax72z2"
        />
      </label>
    </div>
  </header>
  <div class="cbf-vendor-dashboard-invoices__controls repel">
    <esa-chip-group
      data-invoice-stage-filter="true"
      size="sm"
      label="Filter by status"
      value=""
      options='[{"value":"","label":"All"},{"value":"Draft","label":"Draft"},{"value":"In review","label":"In review"},{"value":"Paid","label":"Paid"},{"value":"Needs revision","label":"Needs revision","tone":"amber"}]'
    ></esa-chip-group>
    <div class="cbf-vendor-dashboard-invoices__right cluster" data-gap="md">
      <label class="cbf-vendor-dashboard-invoices__group">
        <span class="typography-meta">Group by</span>
        <esa-chip-group
          data-invoice-group="true"
          size="sm"
          label="Group invoices by"
          value="none"
          options='[{"value":"none","label":"No grouping"},{"value":"contract","label":"Contract"},{"value":"project","label":"Project"}]'
        ></esa-chip-group>
      </label>
      <label class="cbf-vendor-dashboard-invoices__view">
        <span class="typography-meta">View</span>
        <esa-button-toggle
          data-invoice-view="true"
          size="sm"
          label="Choose invoice layout"
          value="grid"
          options='[{"value":"grid","label":"Grid","ariaLabel":"Grid view","icon":"&lt;line x1=\"3\" x2=\"21\" y1=\"9\" y2=\"9\"/&gt;&lt;line x1=\"3\" x2=\"21\" y1=\"15\" y2=\"15\"/&gt;&lt;line x1=\"9\" x2=\"9\" y1=\"3\" y2=\"21\"/&gt;&lt;rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/&gt;"},{"value":"cards","label":"Cards","ariaLabel":"Card view","icon":"&lt;rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"/&gt;&lt;rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"/&gt;&lt;rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"/&gt;&lt;rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"/&gt;"}]'
        ></esa-button-toggle>
      </label>
    </div>
  </div>
  <!-- AG Grid mounts here. Sized by its container; auto-height grows with rows
       so the page (not an inner pane) owns vertical scroll. Hidden when the
       card view is active, but stays mounted as the filter/sort engine. -->
  <div class="cbf-vendor-dashboard-invoices__grid" data-invoice-grid="">
    <div
      class="ag-theme-buttonStyle-1 ag-theme-columnDropStyle-2 ag-theme-batchEditStyle-3 ag-theme-checkboxStyle-4 ag-theme-iconSet-5 ag-theme-tabStyle-6 ag-theme-inputStyle-7 ag-theme-columnDropStyle-2 ag-theme-params-1"
      style="height: 100%; --ag-internal-row-border-width: 1px"
    >
      <div class="ag-measurement-container">
        <div style="width: var(--ag-list-item-height, 15538px)"></div>
        <div style="width: var(--ag-row-height, 15538px)"></div>
        <div style="width: var(--ag-header-height, 15538px)"></div>
        <div
          class="ag-measurement-element-border"
          style="--ag-internal-measurement-border: var(--ag-row-border, solid 15538px)"
        ></div>
        <div
          class="ag-measurement-element-border"
          style="
            --ag-internal-measurement-border: var(--ag-pinned-row-border, solid 15538px);
          "
        ></div>
        <div
          class="ag-measurement-element-border"
          style="
            --ag-internal-measurement-border: var(--ag-header-row-border, solid 15538px);
          "
        ></div>
      </div>
      <div
        class="ag-aria-description-container"
        aria-live="polite"
        aria-relevant="additions text"
        aria-atomic="true"
      ></div>
      <div
        class="ag-root-wrapper ag-layout-auto-height ag-ltr"
        role="presentation"
        grid-id="1"
      >
        <div
          class="ag-root-wrapper-body ag-layout-auto-height ag-focus-managed"
          data-ref="rootWrapperBody"
          role="presentation"
        >
          <div
            class="ag-tab-guard ag-tab-guard-top"
            role="presentation"
            tabindex="0"
          ></div>
          <!--AG-GRID-BODY-->
          <div
            class="ag-root ag-unselectable ag-layout-auto-height ag-body-horizontal-content-no-gap ag-body-vertical-content-no-gap"
            data-ref="eGridRoot"
            role="grid"
            aria-colcount="7"
            aria-rowcount="11"
          >
            <!--AG-HEADER-ROOT-->
            <div
              class="ag-header ag-focus-managed ag-pivot-off ag-header-allow-overflow"
              role="presentation"
              style="height: 49px; min-height: 49px"
            >
              <div
                class="ag-pinned-left-header ag-hidden"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <div class="ag-header-viewport" role="rowgroup" tabindex="-1">
                <div
                  class="ag-header-container"
                  data-ref="eCenterContainer"
                  role="presentation"
                  style="width: 1280px"
                >
                  <div
                    class="ag-header-row ag-header-row-column"
                    role="row"
                    tabindex="0"
                    aria-rowindex="1"
                    style="top: 0px; height: 48px; width: 1280px"
                  >
                    <div
                      class="ag-header-cell ag-column-first ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                      role="columnheader"
                      col-id="number"
                      aria-colindex="1"
                      tabindex="-1"
                      aria-sort="none"
                      style="
                        top: 0px;
                        height: 48px;
                        width: 200px;
                        touch-action: none;
                        left: 0px;
                      "
                    >
                      <div
                        class="ag-header-cell-resize"
                        data-ref="eResize"
                        role="presentation"
                        aria-hidden="false"
                        style="touch-action: none"
                      ></div>
                      <div
                        class="ag-header-cell-comp-wrapper"
                        data-ref="eHeaderCompWrapper"
                        role="presentation"
                      >
                        <div class="ag-cell-label-container" role="presentation">
                          <div
                            class="ag-header-cell-label"
                            data-ref="eLabel"
                            role="presentation"
                          >
                            <span class="ag-header-cell-text" data-ref="eText"
                              >Invoice #</span
                            >
                            <span
                              class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                              data-ref="eFilter"
                              aria-hidden="true"
                              ><span
                                class="ag-icon ag-icon-filter"
                                role="presentation"
                                unselectable="on"
                              ></span
                            ></span>
                            <!--AG-SORT-INDICATOR--><span
                              class="ag-sort-indicator-container"
                              data-ref="eSortIndicator"
                            >
                              <span
                                class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                data-ref="eSortOrder"
                                aria-hidden="true"
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                data-ref="eSortAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-asc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                data-ref="eSortDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-desc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                data-ref="eSortMixed"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                data-ref="eSortAbsoluteAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-aasc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                data-ref="eSortAbsoluteDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-adesc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                data-ref="eSortNone"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                      role="columnheader"
                      col-id="contractNumber"
                      aria-colindex="2"
                      tabindex="-1"
                      aria-sort="none"
                      style="
                        top: 0px;
                        height: 48px;
                        width: 140px;
                        touch-action: none;
                        left: 200px;
                      "
                    >
                      <div
                        class="ag-header-cell-resize"
                        data-ref="eResize"
                        role="presentation"
                        aria-hidden="false"
                        style="touch-action: none"
                      ></div>
                      <div
                        class="ag-header-cell-comp-wrapper"
                        data-ref="eHeaderCompWrapper"
                        role="presentation"
                      >
                        <div class="ag-cell-label-container" role="presentation">
                          <div
                            class="ag-header-cell-label"
                            data-ref="eLabel"
                            role="presentation"
                          >
                            <span class="ag-header-cell-text" data-ref="eText"
                              >Contract #</span
                            >
                            <span
                              class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                              data-ref="eFilter"
                              aria-hidden="true"
                              ><span
                                class="ag-icon ag-icon-filter"
                                role="presentation"
                                unselectable="on"
                              ></span
                            ></span>
                            <!--AG-SORT-INDICATOR--><span
                              class="ag-sort-indicator-container"
                              data-ref="eSortIndicator"
                            >
                              <span
                                class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                data-ref="eSortOrder"
                                aria-hidden="true"
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                data-ref="eSortAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-asc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                data-ref="eSortDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-desc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                data-ref="eSortMixed"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                data-ref="eSortAbsoluteAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-aasc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                data-ref="eSortAbsoluteDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-adesc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                data-ref="eSortNone"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                      role="columnheader"
                      col-id="contract"
                      aria-colindex="3"
                      tabindex="-1"
                      aria-sort="none"
                      style="
                        top: 0px;
                        height: 48px;
                        width: 200px;
                        touch-action: none;
                        left: 340px;
                      "
                    >
                      <div
                        class="ag-header-cell-resize"
                        data-ref="eResize"
                        role="presentation"
                        aria-hidden="false"
                        style="touch-action: none"
                      ></div>
                      <div
                        class="ag-header-cell-comp-wrapper"
                        data-ref="eHeaderCompWrapper"
                        role="presentation"
                      >
                        <div class="ag-cell-label-container" role="presentation">
                          <div
                            class="ag-header-cell-label"
                            data-ref="eLabel"
                            role="presentation"
                          >
                            <span class="ag-header-cell-text" data-ref="eText"
                              >Contract</span
                            >
                            <span
                              class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                              data-ref="eFilter"
                              aria-hidden="true"
                              ><span
                                class="ag-icon ag-icon-filter"
                                role="presentation"
                                unselectable="on"
                              ></span
                            ></span>
                            <!--AG-SORT-INDICATOR--><span
                              class="ag-sort-indicator-container"
                              data-ref="eSortIndicator"
                            >
                              <span
                                class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                data-ref="eSortOrder"
                                aria-hidden="true"
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                data-ref="eSortAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-asc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                data-ref="eSortDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-desc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                data-ref="eSortMixed"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                data-ref="eSortAbsoluteAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-aasc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                data-ref="eSortAbsoluteDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-adesc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                data-ref="eSortNone"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                      role="columnheader"
                      col-id="projectNumber"
                      aria-colindex="4"
                      tabindex="-1"
                      aria-sort="none"
                      style="
                        top: 0px;
                        height: 48px;
                        width: 140px;
                        touch-action: none;
                        left: 540px;
                      "
                    >
                      <div
                        class="ag-header-cell-resize"
                        data-ref="eResize"
                        role="presentation"
                        aria-hidden="false"
                        style="touch-action: none"
                      ></div>
                      <div
                        class="ag-header-cell-comp-wrapper"
                        data-ref="eHeaderCompWrapper"
                        role="presentation"
                      >
                        <div class="ag-cell-label-container" role="presentation">
                          <div
                            class="ag-header-cell-label"
                            data-ref="eLabel"
                            role="presentation"
                          >
                            <span class="ag-header-cell-text" data-ref="eText"
                              >Project #</span
                            >
                            <span
                              class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                              data-ref="eFilter"
                              aria-hidden="true"
                              ><span
                                class="ag-icon ag-icon-filter"
                                role="presentation"
                                unselectable="on"
                              ></span
                            ></span>
                            <!--AG-SORT-INDICATOR--><span
                              class="ag-sort-indicator-container"
                              data-ref="eSortIndicator"
                            >
                              <span
                                class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                data-ref="eSortOrder"
                                aria-hidden="true"
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                data-ref="eSortAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-asc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                data-ref="eSortDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-desc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                data-ref="eSortMixed"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                data-ref="eSortAbsoluteAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-aasc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                data-ref="eSortAbsoluteDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-adesc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                data-ref="eSortNone"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                      role="columnheader"
                      col-id="invoiceDate"
                      aria-colindex="5"
                      tabindex="-1"
                      aria-sort="none"
                      style="
                        top: 0px;
                        height: 48px;
                        width: 200px;
                        touch-action: none;
                        left: 680px;
                      "
                    >
                      <div
                        class="ag-header-cell-resize"
                        data-ref="eResize"
                        role="presentation"
                        aria-hidden="false"
                        style="touch-action: none"
                      ></div>
                      <div
                        class="ag-header-cell-comp-wrapper"
                        data-ref="eHeaderCompWrapper"
                        role="presentation"
                      >
                        <div class="ag-cell-label-container" role="presentation">
                          <div
                            class="ag-header-cell-label"
                            data-ref="eLabel"
                            role="presentation"
                          >
                            <span class="ag-header-cell-text" data-ref="eText"
                              >Invoice date</span
                            >
                            <span
                              class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                              data-ref="eFilter"
                              aria-hidden="true"
                              ><span
                                class="ag-icon ag-icon-filter"
                                role="presentation"
                                unselectable="on"
                              ></span
                            ></span>
                            <!--AG-SORT-INDICATOR--><span
                              class="ag-sort-indicator-container"
                              data-ref="eSortIndicator"
                            >
                              <span
                                class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                data-ref="eSortOrder"
                                aria-hidden="true"
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                data-ref="eSortAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-asc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                data-ref="eSortDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-desc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                data-ref="eSortMixed"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                data-ref="eSortAbsoluteAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-aasc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                data-ref="eSortAbsoluteDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-adesc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                data-ref="eSortNone"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable cbf-grid-num ag-focus-managed"
                      role="columnheader"
                      col-id="amount"
                      aria-colindex="6"
                      tabindex="-1"
                      aria-sort="none"
                      style="
                        top: 0px;
                        height: 48px;
                        width: 200px;
                        touch-action: none;
                        left: 880px;
                      "
                    >
                      <div
                        class="ag-header-cell-resize"
                        data-ref="eResize"
                        role="presentation"
                        aria-hidden="false"
                        style="touch-action: none"
                      ></div>
                      <div
                        class="ag-header-cell-comp-wrapper"
                        data-ref="eHeaderCompWrapper"
                        role="presentation"
                      >
                        <div class="ag-cell-label-container" role="presentation">
                          <div
                            class="ag-header-cell-label"
                            data-ref="eLabel"
                            role="presentation"
                          >
                            <span class="ag-header-cell-text" data-ref="eText"
                              >Amount</span
                            >
                            <span
                              class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                              data-ref="eFilter"
                              aria-hidden="true"
                              ><span
                                class="ag-icon ag-icon-filter"
                                role="presentation"
                                unselectable="on"
                              ></span
                            ></span>
                            <!--AG-SORT-INDICATOR--><span
                              class="ag-sort-indicator-container"
                              data-ref="eSortIndicator"
                            >
                              <span
                                class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                data-ref="eSortOrder"
                                aria-hidden="true"
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                data-ref="eSortAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-asc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                data-ref="eSortDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-desc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                data-ref="eSortMixed"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                data-ref="eSortAbsoluteAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-aasc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                data-ref="eSortAbsoluteDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-adesc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                data-ref="eSortNone"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="ag-header-cell ag-column-last ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                      role="columnheader"
                      col-id="stage"
                      aria-colindex="7"
                      tabindex="-1"
                      aria-sort="none"
                      style="
                        top: 0px;
                        height: 48px;
                        width: 200px;
                        touch-action: none;
                        left: 1080px;
                      "
                    >
                      <div
                        class="ag-header-cell-resize"
                        data-ref="eResize"
                        role="presentation"
                        aria-hidden="false"
                        style="touch-action: none"
                      ></div>
                      <div
                        class="ag-header-cell-comp-wrapper"
                        data-ref="eHeaderCompWrapper"
                        role="presentation"
                      >
                        <div class="ag-cell-label-container" role="presentation">
                          <div
                            class="ag-header-cell-label"
                            data-ref="eLabel"
                            role="presentation"
                          >
                            <span class="ag-header-cell-text" data-ref="eText"
                              >Status</span
                            >
                            <span
                              class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                              data-ref="eFilter"
                              aria-hidden="true"
                              ><span
                                class="ag-icon ag-icon-filter"
                                role="presentation"
                                unselectable="on"
                              ></span
                            ></span>
                            <!--AG-SORT-INDICATOR--><span
                              class="ag-sort-indicator-container"
                              data-ref="eSortIndicator"
                            >
                              <span
                                class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                data-ref="eSortOrder"
                                aria-hidden="true"
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                data-ref="eSortAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-asc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                data-ref="eSortDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-desc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                data-ref="eSortMixed"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                data-ref="eSortAbsoluteAsc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-aasc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                data-ref="eSortAbsoluteDesc"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-adesc"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                              <span
                                class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                data-ref="eSortNone"
                                aria-hidden="true"
                                ><span
                                  class="ag-icon ag-icon-none"
                                  role="presentation"
                                  unselectable="on"
                                ></span
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="ag-pinned-right-header ag-hidden"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
            </div>
            <div
              class="ag-floating-top ag-invisible"
              data-ref="eTop"
              role="presentation"
              style="min-height: 0px; height: 0px; overflow-y: hidden"
            >
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-pinned-left-floating-top ag-hidden"
                data-ref="eContainer"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-viewport ag-floating-top-viewport"
                data-ref="eViewport"
                role="rowgroup"
              >
                <div
                  class="ag-floating-top-container"
                  data-ref="eContainer"
                  role="presentation"
                  style="width: 1280px"
                ></div>
              </div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-pinned-right-floating-top ag-hidden"
                data-ref="eContainer"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-floating-top-full-width-container"
                data-ref="eContainer"
                role="rowgroup"
              ></div>
            </div>
            <div
              class="ag-body ag-layout-auto-height"
              data-ref="eBody"
              role="presentation"
            >
              <div
                class="ag-body-viewport ag-layout-auto-height ag-row-no-animation"
                data-ref="eBodyViewport"
                role="presentation"
                style="width: calc(100% + 16px)"
              >
                <!--AG-ROW-CONTAINER-->
                <div
                  class="ag-pinned-left-cols-container ag-hidden"
                  data-ref="eContainer"
                  role="rowgroup"
                  aria-hidden="true"
                  style="height: 420px; width: 0px; max-width: 0px; min-width: 0px"
                ></div>
                <!--AG-ROW-CONTAINER-->
                <div
                  class="ag-viewport ag-center-cols-viewport"
                  data-ref="eViewport"
                  role="rowgroup"
                  style="height: 420px"
                >
                  <div
                    class="ag-center-cols-container"
                    data-ref="eContainer"
                    role="presentation"
                    style="width: 1280px; height: 420px"
                  >
                    <div
                      role="row"
                      comp-id="60"
                      tabindex="0"
                      row-index="0"
                      class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-first"
                      aria-rowindex="2"
                      row-id="0"
                      style="transform: translateY(0px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="61"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        DRAFT-0002
                      </div>
                      <div
                        role="gridcell"
                        comp-id="62"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-042
                      </div>
                      <div
                        role="gridcell"
                        comp-id="63"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Salmon Habitat Restoration — Wenatchee
                      </div>
                      <div
                        role="gridcell"
                        comp-id="64"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-112
                      </div>
                      <div
                        role="gridcell"
                        comp-id="65"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      >
                        Jun 22, 2026
                      </div>
                      <div
                        role="gridcell"
                        comp-id="66"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $6,120.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="67"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--info esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">Draft</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                    <div
                      role="row"
                      comp-id="68"
                      tabindex="0"
                      row-index="1"
                      class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                      aria-rowindex="3"
                      row-id="1"
                      style="transform: translateY(42px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="69"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        DRAFT-0001
                      </div>
                      <div
                        role="gridcell"
                        comp-id="70"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-058
                      </div>
                      <div
                        role="gridcell"
                        comp-id="71"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Water Quality Sampling — Okanogan
                      </div>
                      <div
                        role="gridcell"
                        comp-id="72"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-143
                      </div>
                      <div
                        role="gridcell"
                        comp-id="73"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      ></div>
                      <div
                        role="gridcell"
                        comp-id="74"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $0.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="75"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--info esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">Draft</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                    <div
                      role="row"
                      comp-id="76"
                      tabindex="0"
                      row-index="2"
                      class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                      aria-rowindex="4"
                      row-id="2"
                      style="transform: translateY(84px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="77"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        INV-2026-0045
                      </div>
                      <div
                        role="gridcell"
                        comp-id="78"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-042
                      </div>
                      <div
                        role="gridcell"
                        comp-id="79"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Salmon Habitat Restoration — Wenatchee
                      </div>
                      <div
                        role="gridcell"
                        comp-id="80"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-112
                      </div>
                      <div
                        role="gridcell"
                        comp-id="81"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      >
                        Jun 18, 2026
                      </div>
                      <div
                        role="gridcell"
                        comp-id="82"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $5,210.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="83"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--warning esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">In review</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                    <div
                      role="row"
                      comp-id="84"
                      tabindex="0"
                      row-index="3"
                      class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                      aria-rowindex="5"
                      row-id="3"
                      style="transform: translateY(126px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="85"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        INV-2026-0042
                      </div>
                      <div
                        role="gridcell"
                        comp-id="86"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-042
                      </div>
                      <div
                        role="gridcell"
                        comp-id="87"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Salmon Habitat Restoration — Wenatchee
                      </div>
                      <div
                        role="gridcell"
                        comp-id="88"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-112
                      </div>
                      <div
                        role="gridcell"
                        comp-id="89"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      >
                        Jun 1, 2026
                      </div>
                      <div
                        role="gridcell"
                        comp-id="90"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $4,850.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="91"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--warning esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">In review</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                    <div
                      role="row"
                      comp-id="92"
                      tabindex="0"
                      row-index="4"
                      class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                      aria-rowindex="6"
                      row-id="4"
                      style="transform: translateY(168px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="93"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        INV-2026-0039
                      </div>
                      <div
                        role="gridcell"
                        comp-id="94"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-051
                      </div>
                      <div
                        role="gridcell"
                        comp-id="95"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Riparian Vegetation Monitoring — Methow
                      </div>
                      <div
                        role="gridcell"
                        comp-id="96"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-088
                      </div>
                      <div
                        role="gridcell"
                        comp-id="97"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      >
                        Jun 2, 2026
                      </div>
                      <div
                        role="gridcell"
                        comp-id="98"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $2,310.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="99"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--warning esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">In review</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                    <div
                      role="row"
                      comp-id="100"
                      tabindex="0"
                      row-index="5"
                      class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                      aria-rowindex="7"
                      row-id="5"
                      style="transform: translateY(210px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="101"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        INV-2026-0035
                      </div>
                      <div
                        role="gridcell"
                        comp-id="102"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-067
                      </div>
                      <div
                        role="gridcell"
                        comp-id="103"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Smolt Survival Telemetry Study
                      </div>
                      <div
                        role="gridcell"
                        comp-id="104"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-201
                      </div>
                      <div
                        role="gridcell"
                        comp-id="105"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      >
                        May 5, 2026
                      </div>
                      <div
                        role="gridcell"
                        comp-id="106"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $3,975.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="107"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--warning esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">In review</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                    <div
                      role="row"
                      comp-id="108"
                      tabindex="0"
                      row-index="6"
                      class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                      aria-rowindex="8"
                      row-id="6"
                      style="transform: translateY(252px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="109"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        INV-2026-0031
                      </div>
                      <div
                        role="gridcell"
                        comp-id="110"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-073
                      </div>
                      <div
                        role="gridcell"
                        comp-id="111"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Hatchery Supplementation — Entiat
                      </div>
                      <div
                        role="gridcell"
                        comp-id="112"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-095
                      </div>
                      <div
                        role="gridcell"
                        comp-id="113"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      >
                        May 1, 2026
                      </div>
                      <div
                        role="gridcell"
                        comp-id="114"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $1,640.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="115"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--success esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">Paid</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                    <div
                      role="row"
                      comp-id="116"
                      tabindex="0"
                      row-index="7"
                      class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                      aria-rowindex="9"
                      row-id="7"
                      style="transform: translateY(294px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="117"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        INV-2026-0028
                      </div>
                      <div
                        role="gridcell"
                        comp-id="118"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-058
                      </div>
                      <div
                        role="gridcell"
                        comp-id="119"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Water Quality Sampling — Okanogan
                      </div>
                      <div
                        role="gridcell"
                        comp-id="120"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-143
                      </div>
                      <div
                        role="gridcell"
                        comp-id="121"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      >
                        Apr 20, 2026
                      </div>
                      <div
                        role="gridcell"
                        comp-id="122"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $1,425.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="123"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--danger esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">Needs revision</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                    <div
                      role="row"
                      comp-id="124"
                      tabindex="0"
                      row-index="8"
                      class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                      aria-rowindex="10"
                      row-id="8"
                      style="transform: translateY(336px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="125"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        INV-2026-0024
                      </div>
                      <div
                        role="gridcell"
                        comp-id="126"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-067
                      </div>
                      <div
                        role="gridcell"
                        comp-id="127"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Smolt Survival Telemetry Study
                      </div>
                      <div
                        role="gridcell"
                        comp-id="128"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-201
                      </div>
                      <div
                        role="gridcell"
                        comp-id="129"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      >
                        Apr 10, 2026
                      </div>
                      <div
                        role="gridcell"
                        comp-id="130"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $2,890.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="131"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--success esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">Paid</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                    <div
                      role="row"
                      comp-id="132"
                      tabindex="0"
                      row-index="9"
                      class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-last"
                      aria-rowindex="11"
                      row-id="9"
                      style="transform: translateY(378px); height: 42px"
                    >
                      <div
                        role="gridcell"
                        comp-id="133"
                        col-id="number"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                        aria-colindex="1"
                        style="left: 0px; width: 200px"
                      >
                        INV-2026-0019
                      </div>
                      <div
                        role="gridcell"
                        comp-id="134"
                        col-id="contractNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="2"
                        style="left: 200px; width: 140px"
                      >
                        C-2024-051
                      </div>
                      <div
                        role="gridcell"
                        comp-id="135"
                        col-id="contract"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="3"
                        style="left: 340px; width: 200px"
                      >
                        Riparian Vegetation Monitoring — Methow
                      </div>
                      <div
                        role="gridcell"
                        comp-id="136"
                        col-id="projectNumber"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                        aria-colindex="4"
                        style="left: 540px; width: 140px"
                      >
                        PRJ-2024-088
                      </div>
                      <div
                        role="gridcell"
                        comp-id="137"
                        col-id="invoiceDate"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                        aria-colindex="5"
                        style="left: 680px; width: 200px"
                      >
                        Mar 25, 2026
                      </div>
                      <div
                        role="gridcell"
                        comp-id="138"
                        col-id="amount"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                        aria-colindex="6"
                        style="left: 880px; width: 200px"
                      >
                        $1,980.00
                      </div>
                      <div
                        role="gridcell"
                        comp-id="139"
                        col-id="stage"
                        class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                        aria-colindex="7"
                        style="left: 1080px; width: 200px"
                      >
                        <span
                          ><span class="cbf-grid-status"
                            ><span
                              class="esa-pill esa-pill--success esa-pill--md typography-microcopy-sm"
                            >
                              <span class="esa-pill__label">Paid</span>
                            </span>
                          </span></span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <!--AG-ROW-CONTAINER-->
                <div
                  class="ag-pinned-right-cols-container ag-hidden"
                  data-ref="eContainer"
                  role="rowgroup"
                  aria-hidden="true"
                  style="height: 420px; width: 0px; max-width: 0px; min-width: 0px"
                ></div>
                <!--AG-ROW-CONTAINER-->
                <div
                  class="ag-full-width-container"
                  data-ref="eContainer"
                  role="rowgroup"
                  style="height: 420px"
                ></div>
              </div>
              <!--AG-FAKE-VERTICAL-SCROLL-->
              <div
                class="ag-body-vertical-scroll ag-apple-scrollbar ag-scrollbar-invisible ag-hidden"
                aria-hidden="true"
                style="width: 16px; max-width: 16px; min-width: 16px"
              >
                <div
                  class="ag-body-vertical-scroll-viewport"
                  data-ref="eViewport"
                  style="width: 16px; max-width: 16px; min-width: 16px"
                >
                  <div
                    class="ag-body-vertical-scroll-container"
                    data-ref="eContainer"
                    style="height: 420px; width: 16px; max-width: 16px; min-width: 16px"
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="ag-sticky-top"
              data-ref="eStickyTop"
              role="presentation"
              style="top: 49px; height: 0px; width: 100%"
            >
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-pinned-left-sticky-top ag-hidden"
                data-ref="eContainer"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-viewport ag-sticky-top-viewport"
                data-ref="eViewport"
                role="rowgroup"
              >
                <div
                  class="ag-sticky-top-container"
                  data-ref="eContainer"
                  role="presentation"
                  style="width: 1280px"
                ></div>
              </div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-pinned-right-sticky-top ag-hidden"
                data-ref="eContainer"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-sticky-top-full-width-container"
                data-ref="eContainer"
                role="rowgroup"
              ></div>
            </div>
            <div
              class="ag-sticky-bottom ag-invisible"
              data-ref="eStickyBottom"
              role="presentation"
              style="bottom: 0px; height: 0px; width: 100%"
            >
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-pinned-left-sticky-bottom ag-hidden"
                data-ref="eContainer"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-viewport ag-sticky-bottom-viewport"
                data-ref="eViewport"
                role="rowgroup"
              >
                <div
                  class="ag-sticky-bottom-container"
                  data-ref="eContainer"
                  role="presentation"
                  style="width: 1280px"
                ></div>
              </div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-pinned-right-sticky-bottom ag-hidden"
                data-ref="eContainer"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-sticky-bottom-full-width-container"
                data-ref="eContainer"
                role="rowgroup"
              ></div>
            </div>
            <div
              class="ag-floating-bottom ag-invisible"
              data-ref="eBottom"
              role="presentation"
              style="min-height: 0px; height: 0px; overflow-y: hidden"
            >
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-pinned-left-floating-bottom ag-hidden"
                data-ref="eContainer"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-viewport ag-floating-bottom-viewport"
                data-ref="eViewport"
                role="rowgroup"
              >
                <div
                  class="ag-floating-bottom-container"
                  data-ref="eContainer"
                  role="presentation"
                  style="width: 1280px"
                ></div>
              </div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-pinned-right-floating-bottom ag-hidden"
                data-ref="eContainer"
                role="rowgroup"
                aria-hidden="true"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <!--AG-ROW-CONTAINER-->
              <div
                class="ag-floating-bottom-full-width-container"
                data-ref="eContainer"
                role="rowgroup"
              ></div>
            </div>
            <!--AG-FAKE-HORIZONTAL-SCROLL-->
            <div
              class="ag-body-horizontal-scroll ag-apple-scrollbar ag-scrollbar-invisible"
              aria-hidden="true"
              style="bottom: 0px; height: 16px; max-height: 16px; min-height: 16px"
            >
              <div
                class="ag-horizontal-left-spacer ag-scroller-corner"
                data-ref="eLeftSpacer"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
              <div
                class="ag-body-horizontal-scroll-viewport"
                data-ref="eViewport"
                style="height: 16px; max-height: 16px; min-height: 16px"
              >
                <div
                  class="ag-body-horizontal-scroll-container"
                  data-ref="eContainer"
                  style="width: 1280px; height: 16px; max-height: 16px; min-height: 16px"
                ></div>
              </div>
              <div
                class="ag-horizontal-right-spacer ag-scroller-corner"
                data-ref="eRightSpacer"
                style="width: 0px; max-width: 0px; min-width: 0px"
              ></div>
            </div>
            <!--AG-OVERLAY-WRAPPER-->
            <div class="ag-overlay ag-hidden" role="presentation">
              <div class="ag-overlay-panel" role="presentation">
                <div
                  class="ag-overlay-wrapper ag-layout-auto-height"
                  data-ref="eOverlayWrapper"
                  role="presentation"
                  style="padding-top: 0px"
                ></div>
              </div>
            </div>
          </div>
          <div
            class="ag-tab-guard ag-tab-guard-bottom"
            role="presentation"
            tabindex="0"
          ></div>
        </div>
        <!--AG-PAGINATION-->
        <div
          class="ag-paging-panel ag-unselectable ag-focus-managed ag-hidden"
          id="ag-29"
          aria-hidden="true"
        >
          <div
            class="ag-tab-guard ag-tab-guard-top"
            role="presentation"
            tabindex="0"
          ></div>
          <span class="ag-paging-page-size"
            ><div
              class="ag-picker-field ag-labeled ag-label-align-left ag-select"
              role="presentation"
            >
              <div
                data-ref="eLabel"
                class="ag-label"
                aria-hidden="false"
                id="ag-31-label"
              >
                Page Size:
              </div>
              <div
                class="ag-wrapper ag-picker-field-wrapper ag-picker-collapsed"
                data-ref="eWrapper"
                tabindex="0"
                aria-expanded="false"
                role="combobox"
                aria-controls="ag-select-list-32"
                aria-label="Page Size"
              >
                <div
                  class="ag-picker-field-display"
                  data-ref="eDisplayField"
                  id="ag-31-display"
                >
                  100
                </div>
                <div class="ag-picker-field-icon" data-ref="eIcon" aria-hidden="true">
                  <span
                    class="ag-icon ag-icon-small-down"
                    role="presentation"
                    unselectable="on"
                  ></span>
                </div>
              </div></div></span
          ><span class="ag-paging-row-summary-panel">
            <span
              class="ag-paging-row-summary-panel-number"
              data-ref="lbFirstRowOnPage"
              id="ag-29-first-row"
              >1</span
            >
            <span id="ag-29-to">to</span>
            <span
              class="ag-paging-row-summary-panel-number"
              data-ref="lbLastRowOnPage"
              id="ag-29-last-row"
              >0</span
            >
            <span id="ag-29-of">of</span>
            <span
              class="ag-paging-row-summary-panel-number"
              data-ref="lbRecordCount"
              id="ag-29-row-count"
              >0</span
            > </span
          ><span class="ag-paging-page-summary-panel" role="presentation">
            <div
              class="ag-button ag-paging-button ag-disabled"
              data-ref="btFirst"
              role="button"
              aria-label="First Page"
              tabindex="0"
              aria-disabled="true"
            >
              <span
                class="ag-icon ag-icon-first"
                role="presentation"
                unselectable="on"
              ></span>
            </div>
            <div
              class="ag-button ag-paging-button ag-disabled"
              data-ref="btPrevious"
              role="button"
              aria-label="Previous Page"
              tabindex="0"
              aria-disabled="true"
            >
              <span
                class="ag-icon ag-icon-previous"
                role="presentation"
                unselectable="on"
              ></span>
            </div>
            <span class="ag-paging-description">
              <span id="ag-29-start-page">Page</span>
              <span
                class="ag-paging-number"
                data-ref="lbCurrent"
                id="ag-29-start-page-number"
                >1</span
              >
              <span id="ag-29-of-page">of</span>
              <span class="ag-paging-number" data-ref="lbTotal" id="ag-29-of-page-number"
                >1</span
              >
            </span>
            <div
              class="ag-button ag-paging-button ag-disabled"
              data-ref="btNext"
              role="button"
              aria-label="Next Page"
              tabindex="0"
              aria-disabled="true"
            >
              <span
                class="ag-icon ag-icon-next"
                role="presentation"
                unselectable="on"
              ></span>
            </div>
            <div
              class="ag-button ag-paging-button ag-disabled"
              data-ref="btLast"
              role="button"
              aria-label="Last Page"
              tabindex="0"
              aria-disabled="true"
            >
              <span
                class="ag-icon ag-icon-last"
                role="presentation"
                unselectable="on"
              ></span>
            </div>
          </span>
          <div
            class="ag-tab-guard ag-tab-guard-bottom"
            role="presentation"
            tabindex="0"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <!-- Card view: the same invoices as a responsive card grid (the .grid auto-fit
       primitive). Each card is the SHARED CbfInvoiceCard — the very same card the
       /vendor-invoice Review & submit step uses — server-rendered once per
       invoice with the pipeline esa-pill passed into its status slot. The client
       only shows/hides and reorders the cards to mirror the grid's filtered +
       sorted display order, so search, status chips, and group-by behave
       identically across both views. Clicking a card opens the same
       esa-side-dialog detail drawer. -->
  <div class="cbf-vendor-dashboard-invoices__cards grid" data-invoice-cards="" hidden="">
    <div class="cbf-invoice-card-link" data-card="DRAFT-0002">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice DRAFT-0002"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">DRAFT-0002</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period"
                    >Jun 16, 2026 – Jun 30, 2026</span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--info esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">Draft</span>
                  </span>
                  <script type="module">
                    document.addEventListener(
                      "click",
                      (t) => {
                        const s = t.target.closest?.("[data-esa-pill-remove]");
                        if (!s) return;
                        t.stopPropagation();
                        const e = s.closest(".esa-pill");
                        e &&
                          (e.dispatchEvent(new CustomEvent("removed", { bubbles: !0 })),
                          e.remove());
                      },
                      !0,
                    );
                  </script> </span
                ><span class="cbf-invoice-card__corner-value">Jun 22, 2026</span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Wenatchee Subbasin</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-112</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Salmon Habitat Restoration — Wenatchee</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-042</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$6,120.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-invoice-card-link" data-card="DRAFT-0001">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice DRAFT-0001"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">DRAFT-0001</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period"> – </span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--info esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">Draft</span>
                  </span> </span
                ><span class="cbf-invoice-card__corner-value"></span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Okanogan Subbasin</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-143</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Water Quality Sampling — Okanogan</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-058</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-invoice-card-link" data-card="INV-2026-0045">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice INV-2026-0045"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">INV-2026-0045</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period">Jun 1, 2026 – Jun 15, 2026</span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--warning esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">In review</span>
                  </span> </span
                ><span class="cbf-invoice-card__corner-value">Jun 18, 2026</span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Wenatchee Subbasin</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-112</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Salmon Habitat Restoration — Wenatchee</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-042</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$5,210.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-invoice-card-link" data-card="INV-2026-0042">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice INV-2026-0042"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">INV-2026-0042</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period">May 1, 2026 – May 31, 2026</span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--warning esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">In review</span>
                  </span> </span
                ><span class="cbf-invoice-card__corner-value">Jun 1, 2026</span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Wenatchee Subbasin</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-112</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Salmon Habitat Restoration — Wenatchee</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-042</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$4,850.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-invoice-card-link" data-card="INV-2026-0039">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice INV-2026-0039"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">INV-2026-0039</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period">May 1, 2026 – May 31, 2026</span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--warning esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">In review</span>
                  </span> </span
                ><span class="cbf-invoice-card__corner-value">Jun 2, 2026</span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Methow Subbasin</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-088</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Riparian Vegetation Monitoring — Methow</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-051</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$2,310.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-invoice-card-link" data-card="INV-2026-0035">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice INV-2026-0035"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">INV-2026-0035</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period">Apr 1, 2026 – Apr 30, 2026</span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--warning esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">In review</span>
                  </span> </span
                ><span class="cbf-invoice-card__corner-value">May 5, 2026</span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Mainstem Survival</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-201</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Smolt Survival Telemetry Study</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-067</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$3,975.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-invoice-card-link" data-card="INV-2026-0031">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice INV-2026-0031"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">INV-2026-0031</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period">Apr 1, 2026 – Apr 30, 2026</span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--success esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">Paid</span>
                  </span> </span
                ><span class="cbf-invoice-card__corner-value">May 1, 2026</span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Entiat Subbasin</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-095</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Hatchery Supplementation — Entiat</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-073</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$1,640.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-invoice-card-link" data-card="INV-2026-0028">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice INV-2026-0028"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">INV-2026-0028</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period">Mar 1, 2026 – Mar 31, 2026</span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--danger esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">Needs revision</span>
                  </span> </span
                ><span class="cbf-invoice-card__corner-value">Apr 20, 2026</span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Okanogan Subbasin</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-143</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Water Quality Sampling — Okanogan</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-058</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$1,425.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-invoice-card-link" data-card="INV-2026-0024">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice INV-2026-0024"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">INV-2026-0024</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period">Mar 1, 2026 – Mar 31, 2026</span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--success esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">Paid</span>
                  </span> </span
                ><span class="cbf-invoice-card__corner-value">Apr 10, 2026</span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Mainstem Survival</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-201</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Smolt Survival Telemetry Study</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-067</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$2,890.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-invoice-card-link" data-card="INV-2026-0019">
      <!-- Stretched-overlay open button: keeps the WHOLE card a single click /
             keyboard target for the detail drawer, while the contract/project
             links inside the card stay independently clickable (they sit above
             this via z-index). Nesting links inside a <button> would be invalid;
             this is the accessible card-with-nested-links pattern. -->
      <button
        type="button"
        class="cbf-invoice-card-link__open"
        data-card-open=""
        aria-label="View invoice INV-2026-0019"
      ></button>
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--stat">
            <div class="cbf-invoice-card__title-row">
              <div class="cbf-invoice-card__id">
                <p class="cbf-invoice-card__number">INV-2026-0019</p>
                <span class="cbf-invoice-card__period-group"
                  ><span class="cbf-invoice-card__period">Feb 1, 2026 – Feb 28, 2026</span
                  ><span class="cbf-invoice-card__period-label"
                    >Performance period</span
                  ></span
                >
              </div>
              <div class="cbf-invoice-card__corner">
                <span class="cbf-invoice-card__status"
                  ><span
                    class="esa-pill esa-pill--success esa-pill--sm typography-microcopy-xs"
                  >
                    <span class="esa-pill__label">Paid</span>
                  </span> </span
                ><span class="cbf-invoice-card__corner-value">Mar 25, 2026</span>
              </div>
            </div>
            <div class="cbf-invoice-card__refs">
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--project">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Methow Subbasin</a
                >
                <p class="cbf-invoice-card__ref-meta">Project · PRJ-2024-088</p>
              </div>
              <div class="cbf-invoice-card__ref cbf-invoice-card__ref--contract">
                <a
                  class="cbf-invoice-card__ref-name cbf-invoice-card__ref-link"
                  data-ref-link=""
                  href="#"
                  >Riparian Vegetation Monitoring — Methow</a
                >
                <p class="cbf-invoice-card__ref-meta">Contract · C-2024-051</p>
              </div>
            </div>
            <div class="cbf-invoice-card__total-band">
              <div class="cbf-invoice-card__amount">
                <span class="cbf-invoice-card__amount-value">$1,980.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cbf-vendor-dashboard-invoices__empty" data-invoice-empty="" hidden="">
    <div class="esa-empty-state esa-empty-state--sm">
      <h3 class="esa-empty-state__title typography-label-sm-strong">
        No invoices match your filters
      </h3>
      <p class="esa-empty-state__description typography-body-xs">
        Try a different invoice number, contract name, or status.
      </p>
      <div class="esa-empty-state__actions typography-label-md"></div>
    </div>
  </div>
  <footer class="cbf-vendor-dashboard-invoices__footer">
    <span class="typography-meta" data-invoice-count="">Showing 10 of 10 invoices</span>
  </footer>
  <!-- The real esa-pill lego, server-rendered once per stage with the design-
       system scope hash intact. The grid's status cell renderer and the drawer
       hero clone the matching template's markup — so those status chips are
       byte-identical to the lego, never a hand-rolled copy. -->
  <div
    class="cbf-vendor-dashboard-invoices__badge-templates"
    data-badge-templates=""
    hidden=""
    aria-hidden="true"
  >
    <span data-stage="Draft"
      ><span class="esa-pill esa-pill--info esa-pill--md typography-microcopy-sm">
        <span class="esa-pill__label">Draft</span>
      </span> </span
    ><span data-stage="In review"
      ><span class="esa-pill esa-pill--warning esa-pill--md typography-microcopy-sm">
        <span class="esa-pill__label">In review</span>
      </span> </span
    ><span data-stage="Paid"
      ><span class="esa-pill esa-pill--success esa-pill--md typography-microcopy-sm">
        <span class="esa-pill__label">Paid</span>
      </span> </span
    ><span data-stage="Needs revision"
      ><span class="esa-pill esa-pill--danger esa-pill--md typography-microcopy-sm">
        <span class="esa-pill__label">Needs revision</span>
      </span>
    </span>
  </div>
  <!-- Row data for the grid. Serialized here so the client module (which imports
       ag-grid-community) can hydrate without a second fetch. -->
  <script type="application/json" data-invoice-data="">
    [
      {
        "number": "DRAFT-0002",
        "contractNumber": "C-2024-042",
        "contract": "Salmon Habitat Restoration — Wenatchee",
        "projectNumber": "PRJ-2024-112",
        "project": "Wenatchee Subbasin",
        "submitted": "",
        "lastEdited": "Jun 24, 2026",
        "amount": 6120,
        "stage": "Draft",
        "invoiceDate": "Jun 22, 2026",
        "issued": "Jun 22, 2026",
        "perfStart": "Jun 16, 2026",
        "perfEnd": "Jun 30, 2026",
        "pdfName": "INV-draft-june-b.pdf",
        "supportingDocs": ["timesheet-jun-b-2026.pdf"],
        "notes": "Second-half June survey window — still confirming mileage totals before submitting.",
        "lineItems": [
          { "description": "Field biologist labor", "qty": 52, "unitPrice": 95 },
          {
            "description": "Habitat survey equipment rental",
            "qty": 1,
            "unitPrice": 650
          },
          { "description": "Field mileage", "qty": 960, "unitPrice": 0.5 }
        ]
      },
      {
        "number": "DRAFT-0001",
        "contractNumber": "C-2024-058",
        "contract": "Water Quality Sampling — Okanogan",
        "projectNumber": "PRJ-2024-143",
        "project": "Okanogan Subbasin",
        "submitted": "",
        "lastEdited": "Jun 12, 2026",
        "amount": 0,
        "stage": "Draft",
        "invoiceDate": "",
        "issued": "",
        "perfStart": "",
        "perfEnd": "",
        "pdfName": "",
        "supportingDocs": [],
        "lineItems": []
      },
      {
        "number": "INV-2026-0045",
        "contractNumber": "C-2024-042",
        "contract": "Salmon Habitat Restoration — Wenatchee",
        "projectNumber": "PRJ-2024-112",
        "project": "Wenatchee Subbasin",
        "submitted": "Jun 20, 2026",
        "amount": 5210,
        "stage": "In review",
        "invoiceDate": "Jun 18, 2026",
        "issued": "Jun 18, 2026",
        "perfStart": "Jun 1, 2026",
        "perfEnd": "Jun 15, 2026",
        "pdfName": "INV-2026-0045-PacificEnv.pdf",
        "supportingDocs": ["timesheet-jun-2026.pdf", "equipment-receipt.pdf"],
        "notes": "Partial-month billing for the June survey window.",
        "lineItems": [
          { "description": "Field biologist labor", "qty": 44, "unitPrice": 95 },
          {
            "description": "Habitat survey equipment rental",
            "qty": 1,
            "unitPrice": 650
          },
          { "description": "Field mileage", "qty": 760, "unitPrice": 0.5 }
        ]
      },
      {
        "number": "INV-2026-0042",
        "contractNumber": "C-2024-042",
        "contract": "Salmon Habitat Restoration — Wenatchee",
        "projectNumber": "PRJ-2024-112",
        "project": "Wenatchee Subbasin",
        "submitted": "Jun 18, 2026",
        "amount": 4850,
        "stage": "In review",
        "invoiceDate": "Jun 1, 2026",
        "issued": "Jun 1, 2026",
        "perfStart": "May 1, 2026",
        "perfEnd": "May 31, 2026",
        "pdfName": "INV-2026-0042-PacificEnv.pdf",
        "supportingDocs": ["timesheet-may-2026.pdf"],
        "lineItems": [
          { "description": "Field biologist labor", "qty": 40, "unitPrice": 95 },
          {
            "description": "Habitat survey equipment rental",
            "qty": 1,
            "unitPrice": 650
          },
          { "description": "Field mileage", "qty": 800, "unitPrice": 0.5 }
        ]
      },
      {
        "number": "INV-2026-0039",
        "contractNumber": "C-2024-051",
        "contract": "Riparian Vegetation Monitoring — Methow",
        "projectNumber": "PRJ-2024-088",
        "project": "Methow Subbasin",
        "submitted": "Jun 11, 2026",
        "amount": 2310,
        "stage": "In review",
        "invoiceDate": "Jun 2, 2026",
        "issued": "Jun 2, 2026",
        "perfStart": "May 1, 2026",
        "perfEnd": "May 31, 2026",
        "pdfName": "INV-2026-0039-PacificEnv.pdf",
        "supportingDocs": ["transect-data.xlsx"],
        "lineItems": [
          {
            "description": "Vegetation transect monitoring",
            "qty": 18,
            "unitPrice": 110
          },
          { "description": "Data processing & reporting", "qty": 3, "unitPrice": 110 }
        ]
      },
      {
        "number": "INV-2026-0035",
        "contractNumber": "C-2024-067",
        "contract": "Smolt Survival Telemetry Study",
        "projectNumber": "PRJ-2024-201",
        "project": "Mainstem Survival",
        "submitted": "May 29, 2026",
        "amount": 3975,
        "stage": "In review",
        "invoiceDate": "May 5, 2026",
        "issued": "May 5, 2026",
        "perfStart": "Apr 1, 2026",
        "perfEnd": "Apr 30, 2026",
        "pdfName": "INV-2026-0035-PacificEnv.pdf",
        "supportingDocs": ["receiver-log.pdf", "maintenance-photos.pdf"],
        "notes": "Telemetry receivers redeployed after the spring high-water event.",
        "lineItems": [
          {
            "description": "Acoustic telemetry tag deployment",
            "qty": 25,
            "unitPrice": 135
          },
          { "description": "Receiver maintenance", "qty": 6, "unitPrice": 100 }
        ]
      },
      {
        "number": "INV-2026-0031",
        "contractNumber": "C-2024-073",
        "contract": "Hatchery Supplementation — Entiat",
        "projectNumber": "PRJ-2024-095",
        "project": "Entiat Subbasin",
        "submitted": "May 14, 2026",
        "amount": 1640,
        "stage": "Paid",
        "invoiceDate": "May 1, 2026",
        "issued": "May 1, 2026",
        "perfStart": "Apr 1, 2026",
        "perfEnd": "Apr 30, 2026",
        "pdfName": "INV-2026-0031-PacificEnv.pdf",
        "supportingDocs": ["broodstock-log.pdf"],
        "paidDate": "May 28, 2026",
        "lineItems": [
          { "description": "Broodstock collection labor", "qty": 16, "unitPrice": 95 },
          { "description": "Field supplies", "qty": 1, "unitPrice": 120 }
        ]
      },
      {
        "number": "INV-2026-0028",
        "contractNumber": "C-2024-058",
        "contract": "Water Quality Sampling — Okanogan",
        "projectNumber": "PRJ-2024-143",
        "project": "Okanogan Subbasin",
        "submitted": "May 2, 2026",
        "amount": 1425,
        "stage": "Needs revision",
        "invoiceDate": "Apr 20, 2026",
        "issued": "Apr 20, 2026",
        "perfStart": "Mar 1, 2026",
        "perfEnd": "Mar 31, 2026",
        "pdfName": "INV-2026-0028-PacificEnv.pdf",
        "supportingDocs": ["sample-chain-of-custody.pdf"],
        "notes": "Returned for revision — lab analysis line item needs a supporting receipt.",
        "revisionNote": "The \"Lab analysis\" line item ($575) is missing its supporting receipt, and the sampling dates in the PDF don’t match the March performance period. Please attach the lab invoice and correct the dates, then resubmit.",
        "returnedBy": "D. Reyes, Contracting Officer’s Representative",
        "returnedOn": "May 6, 2026",
        "lineItems": [
          { "description": "Water sample collection", "qty": 10, "unitPrice": 85 },
          { "description": "Lab analysis", "qty": 5, "unitPrice": 115 }
        ]
      },
      {
        "number": "INV-2026-0024",
        "contractNumber": "C-2024-067",
        "contract": "Smolt Survival Telemetry Study",
        "projectNumber": "PRJ-2024-201",
        "project": "Mainstem Survival",
        "submitted": "Apr 22, 2026",
        "amount": 2890,
        "stage": "Paid",
        "invoiceDate": "Apr 10, 2026",
        "issued": "Apr 10, 2026",
        "perfStart": "Mar 1, 2026",
        "perfEnd": "Mar 31, 2026",
        "pdfName": "INV-2026-0024-PacificEnv.pdf",
        "supportingDocs": ["data-analysis.pdf"],
        "paidDate": "May 9, 2026",
        "lineItems": [
          {
            "description": "Acoustic telemetry data analysis",
            "qty": 20,
            "unitPrice": 120
          },
          { "description": "Receiver retrieval", "qty": 1, "unitPrice": 490 }
        ]
      },
      {
        "number": "INV-2026-0019",
        "contractNumber": "C-2024-051",
        "contract": "Riparian Vegetation Monitoring — Methow",
        "projectNumber": "PRJ-2024-088",
        "project": "Methow Subbasin",
        "submitted": "Apr 8, 2026",
        "amount": 1980,
        "stage": "Paid",
        "invoiceDate": "Mar 25, 2026",
        "issued": "Mar 25, 2026",
        "perfStart": "Feb 1, 2026",
        "perfEnd": "Feb 28, 2026",
        "pdfName": "INV-2026-0019-PacificEnv.pdf",
        "supportingDocs": [],
        "paidDate": "Apr 24, 2026",
        "lineItems": [
          { "description": "Vegetation transect monitoring", "qty": 18, "unitPrice": 110 }
        ]
      }
    ]
  </script>
  <!-- Click-a-row detail: the esa-side-dialog overlay drawer (lego). Body is
       populated from the clicked row's invoice record; prev/next step through
       the rows currently displayed (respecting search + filter + sort) so a
       reviewer can walk the whole list. -->
  <esa-side-dialog
    data-invoice-dialog="true"
    size="lg"
    heading="Invoice"
    style="--side-dialog-width-lg: max(1180px, 75vw)"
    position="right"
  >
    <!-- Wide screens: the document preview and the dashboard's tracking fields sit
         side by side (mirrors the /vendor-invoice PDF-left / form-right layout).
         Narrow screens: a single column led by the tracking fields, the document
         beneath — the lego clamps the panel to the viewport, so this stacks
         automatically without a horizontal scroll. -->
    <div class="cbf-invoice-detail" data-gap="lg">
      <!-- Tracking column (the "form"): the dashboard metadata the printed document
           does not carry — the headline figure, its pipeline status, and what the
           invoice is billed against. DOM-first so the narrow single-column stack
           leads with the figure (the "narrow treatment"); on wide screens the
           grid places it in the right column. -->
      <div class="cbf-invoice-detail__meta stack" data-gap="lg">
        <!-- Hero: the amount is the headline figure; the status badge + a
             plain-language state line sit beneath so the vendor reads "how much"
             and "where is it" before anything else. -->
        <div class="cbf-invoice-detail__hero">
          <div class="cbf-invoice-detail__amount-group">
            <span class="cbf-invoice-detail__label">Amount billed</span>
            <span
              class="typography-heading-lg cbf-invoice-detail__amount cbf-num"
              data-detail-amount=""
            ></span>
            <span class="cbf-invoice-detail__state" data-detail-state=""></span>
          </div>
          <div class="cbf-invoice-detail__status" data-detail-status=""></div>
        </div>
        <!-- Status pipeline: where the invoice sits in the In review → Paid flow,
             so the vendor can see progress at a glance. Steps injected by JS. -->
        <ol
          class="cbf-invoice-pipeline"
          data-detail-pipeline=""
          aria-label="Invoice status"
        ></ol>
        <dl class="cbf-invoice-detail__fields">
          <div class="cbf-invoice-detail__row">
            <dt class="cbf-invoice-detail__label">Contract</dt>
            <dd
              class="cbf-invoice-detail__value cbf-invoice-detail__value--lead"
              data-detail-contract=""
            ></dd>
          </div>
          <div class="cbf-invoice-detail__row">
            <dt class="cbf-invoice-detail__label">Project</dt>
            <dd class="cbf-invoice-detail__value" data-detail-project=""></dd>
          </div>
          <div class="cbf-invoice-detail__row">
            <dt class="cbf-invoice-detail__label">Invoice date</dt>
            <dd class="cbf-invoice-detail__value" data-detail-invoice-date=""></dd>
          </div>
          <div class="cbf-invoice-detail__row">
            <dt class="cbf-invoice-detail__label">Performance</dt>
            <dd class="cbf-invoice-detail__value" data-detail-perf=""></dd>
          </div>
        </dl>
        <!-- Attachments: the invoice document + the vendor's own uploaded files,
             re-downloadable. Rows injected by JS; the per-row download control
             clones the server-rendered esa-icon-button template below. -->
        <section class="cbf-invoice-detail__attach">
          <div class="cbf-invoice-detail__attach-head repel">
            <h3 class="cbf-invoice-detail__section-title" data-detail-attach-title="">
              Attachments
            </h3>
            <span data-detail-download-all="">
              <span
                class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--sm"
                ><button class="esa-button__native typography-microcopy-xs" type="button">
                  <span class="esa-icon esa-icon--sm" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      focusable="false"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                  </span>
                  <span class="esa-button__label">Download all</span>
                </button></span
              >
            </span>
          </div>
          <ul class="cbf-invoice-attach-list" data-detail-attachments=""></ul>
          <!-- Add backup documents — shown by JS only while the invoice is In
               review. Lets a vendor supply extra documentation the COR asks for
               without the invoice being returned or its status changed. -->
          <div class="cbf-invoice-detail__add-docs" data-detail-add-docs="" hidden="">
            <button
              type="button"
              class="cbf-invoice-detail__add-zone"
              data-detail-docs-zone=""
              data-detail-docs-add=""
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span class="cbf-invoice-detail__add-text"
                ><strong>Add backup documents</strong> — drag files here or click to
                browse</span
              >
            </button>
            <p class="cbf-invoice-detail__add-hint">
              Provide additional documentation your contract officer requested — no need
              to change this invoice's status.
            </p>
            <input
              type="file"
              multiple=""
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              class="cbf-invoice-detail__docs-input"
              data-detail-docs-input=""
              tabindex="-1"
              aria-hidden="true"
            />
          </div>
        </section>
        <div data-detail-dl-template="" hidden="" aria-hidden="true">
          <span
            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--sm esa-button--icon-only"
            ><button
              class="esa-button__native typography-microcopy-xs"
              type="button"
              aria-label="Download file"
              title="Download file"
            >
              <span class="esa-icon esa-icon--sm" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  focusable="false"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" x2="12" y1="15" y2="3"></line>
                </svg>
              </span></button
          ></span>
        </div>
        <!-- Vendor-action unit (Draft / Needs revision) — kept in the invoice's own
             tracking column (not the detached dialog footer) and pinned to the
             bottom. For a returned invoice the COR's reason sits directly above the
             action it drives (cause → fix). esa-alert-box is JS-filled; the primary
             control escalates to the wizard ("Continue editing" / "Edit & resubmit");
             Discard is drafts-only and sits far-left, away from the primary. -->
        <div class="cbf-invoice-detail__vendor" data-detail-vendor="" hidden="">
          <div class="cbf-invoice-detail__revision" data-detail-revision="" hidden="">
            <div class="esa-alert-box esa-alert-box--warning typography-body-sm">
              <div class="esa-alert-box__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
                  ></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <div class="esa-alert-box__body">
                <strong class="esa-alert-box__title typography-label-sm-strong"
                  >Returned for revision</strong
                >
                <div class="esa-alert-box__message">
                  <span data-detail-revision-note=""></span>
                  <span
                    class="cbf-invoice-detail__revision-by"
                    data-detail-revision-by=""
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="cbf-invoice-detail__actions"
            data-detail-vendor-actions=""
            hidden=""
          >
            <span data-detail-discard="">
              <span
                class="esa-button esa-button--variant-danger esa-button--appearance-outline esa-button--md"
                ><button class="esa-button__native typography-microcopy-md" type="button">
                  <span class="esa-button__label">Discard</span>
                </button></span
              >
            </span>
            <span data-detail-continue="">
              <span
                class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
                ><button class="esa-button__native typography-microcopy-md" type="button">
                  <span class="esa-button__label">Continue editing</span>
                </button></span
              >
            </span>
          </div>
        </div>
      </div>
      <!-- Document preview (the "PDF"): a paper rendering of the submitted invoice.
           bcn-lego-checked: no esa- lego renders a document / paper-invoice
           preview (checked the ecology catalog — esa-card/esa-badge are atoms,
           esa-file-upload is an UPLOADER not a viewer), and there is no real PDF
           asset for an already-submitted mock invoice, so the credible mock is an
           HTML document sheet. Beacon has no ui- equivalent. This bcn- drawer is
           its reusable home; the sheet's per-invoice body is injected by JS. -->
      <div class="cbf-invoice-detail__doc">
        <article class="cbf-doc-sheet" data-detail-doc=""></article>
      </div>
    </div>
    <div slot="footer" class="cbf-invoice-detail__footer repel">
      <span class="cbf-invoice-detail__position" data-detail-position=""></span>
      <div class="cluster" data-gap="xs">
        <span data-detail-prev="">
          <span
            class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--md"
            ><button class="esa-button__native typography-microcopy-md" type="button">
              <span class="esa-icon esa-icon--md" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  focusable="false"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </span>
              <span class="esa-button__label">Previous</span>
            </button></span
          >
        </span>
        <span data-detail-next="">
          <span
            class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--md"
            ><button class="esa-button__native typography-microcopy-md" type="button">
              <span class="esa-icon esa-icon--md" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  focusable="false"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </span>
              <span class="esa-button__label">Next</span>
            </button></span
          >
        </span>
      </div>
    </div>
  </esa-side-dialog>
</section>
```

## Styles
```css
:where(.ag-theme-batchEditStyle-3) {
.ag-cell-batch-edit{background-color:var(--ag-cell-batch-edit-background-color);color:var(--ag-cell-batch-edit-text-color);display:inherit}
.ag-row-batch-edit{background-color:var(--ag-row-batch-edit-background-color);color:var(--ag-row-batch-edit-text-color)}
:where(.ag-theme-inputStyle-7) {
:where(.ag-input-field-input[type=number]:not(.ag-number-field-input-stepper)){-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;&::-webkit-inner-spin-button,&::-webkit-outer-spin-button{-webkit-appearance:none;appearance:none;margin:0}
:where(.ag-ltr) .ag-input-field-input:where(input:not([type]),input[type=text],input[type=number],input[type=tel],input[type=date],input[type=datetime-local],textarea){padding-left:var(--ag-input-padding-start)}
&:where(.ag-ltr,.ag-rtl) .ag-input-field-input:where(input:not([type]),input[type=text],input[type=number],input[type=tel],input[type=date],input[type=datetime-local],textarea){padding:0 var(--ag-input-padding-start)}
:where(.ag-ltr) :where(.ag-column-select-header-filter-wrapper),:where(.ag-ltr) :where(.ag-filter-add-select),:where(.ag-ltr) :where(.ag-filter-filter),:where(.ag-ltr) :where(.ag-filter-toolpanel-search),:where(.ag-ltr) :where(.ag-floating-filter-search-icon),:where(.ag-ltr) :where(.ag-mini-filter){.ag-input-wrapper:before{margin-left:var(--ag-spacing)}
.esa-button{--_btn-pad-y: var(--spacing-300, .75rem);--_btn-padding-x: var(--spacing-300, .75rem);--_btn-radius: var(--button-radius-md, .5rem);--_accent: var(--color-background-brand, #46a758);--_accent-hover: var(--color-background-brand-hover, #3e9b4f);--_on: var(--color-content-default-knockout, #fcfcfc);--_accent-text: var(--_accent);--_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);--_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);display:inline-block}
.esa-button--sm{--_btn-pad-y: var(--spacing-250, .625rem);--_btn-padding-x: var(--spacing-250, .625rem);--_btn-radius: var(--button-radius-sm, 4px)}
.esa-button__native{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-200, 8px);width:100%;padding-block:var(--_btn-pad-y);padding-inline:var(--_btn-padding-x);border:var(--border-width-default, 1px) solid transparent;border-radius:var(--_btn-radius);text-decoration:none;cursor:pointer;transition:background var(--transition-fast, .15s ease),border-color var(--transition-fast, .15s ease);-webkit-appearance:none;appearance:none}
.esa-button--appearance-fill .esa-button__native{background:var(--_accent);color:var(--_on);border-color:var(--_accent-border, transparent)}
.esa-button--variant-chrome .esa-button__native{background:transparent;color:inherit;border-color:transparent}
.esa-icon{--_icon-size: var(--icon-size-md, 20px);display:inline-flex;align-items:center;justify-content:center;width:var(--_icon-size);height:var(--_icon-size);color:inherit}
.esa-icon--sm{--_icon-size: var(--icon-size-sm, 16px)}
.esa-icon svg{display:block;width:var(--_icon-size);height:var(--_icon-size)}
.esa-button__label{white-space:nowrap}
summary.esa-button{list-style:none;cursor:pointer}
.esa-icon--md{--_icon-size: var(--icon-size-md, 20px)}
.esa-button--lg{--_btn-pad-y: var(--spacing-400, 1rem);--_btn-padding-x: var(--spacing-400, 1rem);--_btn-radius: var(--button-radius-lg, 8px)}
.esa-button--variant-primary{--_accent-text: var(--color-content-brand)}
.esa-icon--lg{--_icon-size: var(--icon-size-lg, 24px)}
:where(.ag-theme-checkboxStyle-4) {
.ag-checkbox-input-wrapper,.ag-radio-button-input-wrapper{background-color:var(--ag-checkbox-unchecked-background-color);border:solid var(--ag-checkbox-border-width) var(--ag-checkbox-unchecked-border-color);flex:none;height:var(--ag-icon-size);position:relative;width:var(--ag-icon-size);&:where(.ag-checked){background-color:var(--ag-checkbox-checked-background-color);border-color:var(--ag-checkbox-checked-border-color)}
&:where(.ag-disabled){filter:grayscale();opacity:.5}
.ag-cell-editing-error .ag-checkbox-input-wrapper:focus-within{box-shadow:var(--ag-focus-error-shadow)}
.cbf-vendor-dashboard-invoices__header{align-items:center;gap:var(--spacing-400);flex-wrap:wrap}
.cbf-vendor-dashboard-invoices__search{flex:1 1 280px;max-width:420px;min-width:220px}
.cbf-vendor-dashboard-invoices__controls{align-items:center;gap:var(--spacing-400);flex-wrap:wrap}
.cbf-vendor-dashboard-invoices__right{align-items:center}
.cbf-vendor-dashboard-invoices__group,.cbf-vendor-dashboard-invoices__view{display:inline-flex;align-items:center;gap:var(--spacing-200)}
.cbf-vendor-dashboard-invoices__group .typography-meta,.cbf-vendor-dashboard-invoices__view .typography-meta{color:var(--color-content-default-tertiary);white-space:nowrap}
.cbf-vendor-dashboard-invoices__grid{border:1px solid var(--color-border-default);border-radius:var(--radius-200);overflow:hidden;background:var(--color-background-elevation-raised)}
.cbf-vendor-dashboard-invoices__cards{--grid-min: max(26rem, calc(50% - var(--gap)))}
.cbf-vendor-dashboard-invoices__cards[hidden]{display:none}
.cbf-vendor-dashboard-invoices__footer{color:var(--color-content-default-tertiary)}
.cbf-vendor-dashboard-invoices__grid .cbf-grid-num,.cbf-vendor-dashboard-invoices__grid .cbf-grid-num .ag-header-cell-label{justify-content:flex-end;text-align:right;font-variant-numeric:tabular-nums}
.cbf-vendor-dashboard-invoices__grid .cbf-grid-id{font-variant-numeric:tabular-nums;color:var(--color-content-default-secondary)}
.cbf-vendor-dashboard-invoices__grid .cbf-grid-status{display:inline-flex;align-items:center;height:100%}
:where(.ag-theme-buttonStyle-1) {
:where(.ag-button){background:none;border:none;color:inherit;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;margin:0;padding:0;text-indent:inherit;text-shadow:inherit;text-transform:inherit;word-spacing:inherit;&:disabled{cursor:default}
.cbf-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;color:inherit}
.esa-nav-dropdown .esa-button__native>.esa-icon:last-child{transition:transform .15s ease}
.cbf-nav-link .cbf-icon{display:inline-flex;align-items:center}
.ag-paging-panel{align-items:center;border-top:var(--ag-footer-row-border);display:flex;flex-wrap:wrap-reverse;gap:calc(var(--ag-spacing)*4);justify-content:flex-end;min-height:var(--ag-pagination-panel-height);padding:calc(var(--ag-spacing)*.5) var(--ag-cell-horizontal-padding);row-gap:calc(var(--ag-spacing)*.5);@container (width < 600px){justify-content:center}
.esa-alert-box{--_alert-bg: var(--color-background-utility-info-subtle, #fbfdff);--_alert-border: var(--color-border-utility-info, #acd8fc);--_alert-accent: var(--color-content-utility-info, #0d74ce);--_alert-icon-color: var(--_alert-accent);--_alert-title-color: var(--_alert-accent);--_alert-text-color: var(--alert-box-text-color, var(--color-content-default-secondary, #646464));display:flex;align-items:flex-start;gap:var(--spacing-300, .75rem);padding:var(--spacing-300, .75rem) var(--spacing-400, 1rem);border:var(--border-width-default, 1px) solid var(--_alert-border);border-radius:var(--radius-md, .5rem);background:var(--_alert-bg)}
.esa-alert-box--warning{--_alert-bg: var(--color-background-utility-warning-subtle, #fefdfb);--_alert-border: var(--color-border-utility-warning, #f3d673);--_alert-accent: var(--color-content-utility-warning, #ab6400)}
.esa-alert-box__icon{flex-shrink:0;color:var(--_alert-icon-color);padding-top:1px}
.esa-alert-box__body{flex:1;min-width:0}
.esa-alert-box__title{display:block;color:var(--_alert-title-color);margin-bottom:var(--spacing-050, .125rem)}
.esa-alert-box__message{color:var(--_alert-text-color)}
.cbf-search-field{display:flex;align-items:center;gap:var(--spacing-300);width:100%;padding:var(--spacing-300) var(--spacing-400);border:1px solid var(--color-border-default);border-radius:var(--radius-100);background:var(--color-background-elevation-raised)}
.cbf-search-field .cbf-icon{color:var(--color-content-default-tertiary);display:inline-flex}
.cbf-search-field input{flex:1;min-width:0;border:0;outline:0;background:transparent;font-family:var(--typography-font-family-sans);font-size:18px;color:var(--color-content-default)}
.cbf-search-field input::placeholder{color:var(--cbf-text-placeholder)}
:has(> :where(.ag-theme-params-1)):not(:where(.ag-theme-params-1)) {
	--ag-inherited-accent-color: var(--ag-accent-color);
	--ag-inherited-advanced-filter-builder-button-bar-border: var(--ag-advanced-filter-builder-button-bar-border);
	--ag-inherited-advanced-filter-builder-column-pill-color: var(--ag-advanced-filter-builder-column-pill-color);
	--ag-inherited-advanced-filter-builder-indent-size: var(--ag-advanced-filter-builder-indent-size);
	--ag-inherited-advanced-filter-builder-join-pill-color: var(--ag-advanced-filter-builder-join-pill-color);
	--ag-inherited-advanced-filter-builder-option-pill-color: var(--ag-advanced-filter-builder-option-pill-color);
	--ag-inherited-advanced-filter-builder-value-pill-color: var(--ag-advanced-filter-builder-value-pill-color);
	--ag-inherited-background-color: var(--ag-background-color);
	--ag-inherited-border-color: var(--ag-border-color);
	--ag-inherited-border-radius: var(--ag-border-radius);
	--ag-inherited-border-width: var(--ag-border-width);
	--ag-inherited-browser-color-scheme: var(--ag-browser-color-scheme);
	--ag-inherited-button-active-background-color: var(--ag-button-active-background-color);
	--ag-inherited-button-active-border: var(--ag-button-active-border);
	--ag-inherited-button-active-text-color: var(--ag-button-active-text-color);
	--ag-inherited-button-background-color: var(--ag-button-background-color);
	--ag-inherited-button-border: var(--ag-button-border);
	--ag-inherited-button-border-radius: var(--ag-button-border-radius);
	--ag-inherited-button-disabled-background-color: var(--ag-button-disabled-background-color);
	--ag-inherited-button-disabled-border: var(--ag-button-disabled-border);
	--ag-inherited-button-disabled-text-color: var(--ag-button-disabled-text-color);
	--ag-inherited-button-font-weight: var(--ag-button-font-weight);
	--ag-inherited-button-horizontal-padding: var(--ag-button-horizontal-padding);
	--ag-inherited-button-hover-background-color: var(--ag-button-hover-background-color);
	--ag-inherited-button-hover-border: var(--ag-button-hover-border);
	--ag-inherited-button-hover-text-color: var(--ag-button-hover-text-color);
	--ag-inherited-button-text-color: var(--ag-button-text-color);
	--ag-inherited-button-vertical-padding: var(--ag-button-vertical-padding);
	--ag-inherited-card-shadow: var(--ag-card-shadow);
	--ag-inherited-cell-batch-edit-background-color: var(--ag-cell-batch-edit-background-color);
	--ag-inherited-cell-batch-edit-text-color: var(--ag-cell-batch-edit-text-color);
	--ag-inherited-cell-editing-border: var(--ag-cell-editing-border);
	--ag-inherited-cell-editing-shadow: var(--ag-cell-editing-shadow);
	--ag-inherited-cell-font-family: var(--ag-cell-font-family);
	--ag-inherited-cell-font-size: var(--ag-cell-font-size);
	--ag-inherited-cell-font-weight: var(--ag-cell-font-weight);
	--ag-inherited-cell-horizontal-padding: var(--ag-cell-horizontal-padding);
	--ag-inherited-cell-horizontal-padding-scale: var(--ag-cell-horizontal-padding-scale);
	--ag-inherited-cell-text-color: var(--ag-cell-text-color);
	--ag-inherited-cell-widget-spacing: var(--ag-cell-widget-spacing);
	--ag-inherited-chart-menu-label-color: var(--ag-chart-menu-label-color);
	--ag-inherited-chart-menu-panel-width: var(--ag-chart-menu-panel-width);
	--ag-inherited-checkbox-border-radius: var(--ag-checkbox-border-radius);
	--ag-inherited-checkbox-border-width: var(--ag-checkbox-border-width);
	--ag-inherited-checkbox-checked-background-color: var(--ag-checkbox-checked-background-color);
	--ag-inherited-checkbox-checked-border-color: var(--ag-checkbox-checked-border-color);
	--ag-inherited-checkbox-checked-shape-color: var(--ag-checkbox-checked-shape-color);
	--ag-inherited-checkbox-checked-shape-image: var(--ag-checkbox-checked-shape-image);
	--ag-inherited-checkbox-indeterminate-background-color: var(--ag-checkbox-indeterminate-background-color);
	--ag-inherited-checkbox-indeterminate-border-color: var(--ag-checkbox-indeterminate-border-color);
	--ag-inherited-checkbox-indeterminate-shape-color: var(--ag-checkbox-indeterminate-shape-color);
	--ag-inherited-checkbox-indeterminate-shape-image: var(--ag-checkbox-indeterminate-shape-image);
	--ag-inherited-checkbox-unchecked-background-color: var(--ag-checkbox-unchecked-background-color);
	--ag-inherited-checkbox-unchecked-border-color: var(--ag-checkbox-unchecked-border-color);
	--ag-inherited-chrome-background-color: var(--ag-chrome-background-color);
	--ag-inherited-color-picker-color-border-radius: var(--ag-color-picker-color-border-radius);
	--ag-inherited-color-picker-thumb-border-width: var(--ag-color-picker-thumb-border-width);
	--ag-inherited-color-picker-thumb-size: var(--ag-color-picker-thumb-size);
	--ag-inherited-color-picker-track-border-radius: var(--ag-color-picker-track-border-radius);
	--ag-inherited-color-picker-track-size: var(--ag-color-picker-track-size);
	--ag-inherited-column-border: var(--ag-column-border);
	--ag-inherited-column-drag-indicator-color: var(--ag-column-drag-indicator-color);
	--ag-inherited-column-drag-indicator-width: var(--ag-column-drag-indicator-width);
	--ag-inherited-column-drop-cell-background-color: var(--ag-column-drop-cell-background-color);
	--ag-inherited-column-drop-cell-border: var(--ag-column-drop-cell-border);
	--ag-inherited-column-drop-cell-drag-handle-color: var(--ag-column-drop-cell-drag-handle-color);
	--ag-inherited-column-drop-cell-text-color: var(--ag-column-drop-cell-text-color);
	--ag-inherited-column-hover-color: var(--ag-column-hover-color);
	--ag-inherited-column-panel-apply-button-background-color: var(--ag-column-panel-apply-button-background-color);
	--ag-inherited-column-panel-apply-button-color: var(--ag-column-panel-apply-button-color);
	--ag-inherited-column-select-indent-size: var(--ag-column-select-indent-size);
	--ag-inherited-data-background-color: var(--ag-data-background-color);
	--ag-inherited-data-font-size: var(--ag-data-font-size);
	--ag-inherited-dialog-border: var(--ag-dialog-border);
	--ag-inherited-dialog-shadow: var(--ag-dialog-shadow);
	--ag-inherited-drag-and-drop-image-background-color: var(--ag-drag-and-drop-image-background-color);
	--ag-inherited-drag-and-drop-image-border: var(--ag-drag-and-drop-image-border);
	--ag-inherited-drag-and-drop-image-not-allowed-border: var(--ag-drag-and-drop-image-not-allowed-border);
	--ag-inherited-drag-and-drop-image-shadow: var(--ag-drag-and-drop-image-shadow);
	--ag-inherited-drag-handle-color: var(--ag-drag-handle-color);
	--ag-inherited-dropdown-shadow: var(--ag-dropdown-shadow);
	--ag-inherited-filter-panel-apply-button-background-color: var(--ag-filter-panel-apply-button-background-color);
	--ag-inherited-filter-panel-apply-button-color: var(--ag-filter-panel-apply-button-color);
	--ag-inherited-filter-panel-card-subtle-color: var(--ag-filter-panel-card-subtle-color);
	--ag-inherited-filter-panel-card-subtle-hover-color: var(--ag-filter-panel-card-subtle-hover-color);
	--ag-inherited-filter-tool-panel-group-indent: var(--ag-filter-tool-panel-group-indent);
	--ag-inherited-find-active-match-background-color: var(--ag-find-active-match-background-color);
	--ag-inherited-find-active-match-color: var(--ag-find-active-match-color);
	--ag-inherited-find-match-background-color: var(--ag-find-match-background-color);
	--ag-inherited-find-match-color: var(--ag-find-match-color);
	--ag-inherited-focus-error-shadow: var(--ag-focus-error-shadow);
	--ag-inherited-focus-shadow: var(--ag-focus-shadow);
	--ag-inherited-font-family: var(--ag-font-family);
	--ag-inherited-font-size: var(--ag-font-size);
	--ag-inherited-font-weight: var(--ag-font-weight);
	--ag-inherited-footer-row-border: var(--ag-footer-row-border);
	--ag-inherited-foreground-color: var(--ag-foreground-color);
	--ag-inherited-formula-token-1-background-color: var(--ag-formula-token-1-background-color);
	--ag-inherited-formula-token-1-border: var(--ag-formula-token-1-border);
	--ag-inherited-formula-token-1-color: var(--ag-formula-token-1-color);
	--ag-inherited-formula-token-2-background-color: var(--ag-formula-token-2-background-color);
	--ag-inherited-formula-token-2-border: var(--ag-formula-token-2-border);
	--ag-inherited-formula-token-2-color: var(--ag-formula-token-2-color);
	--ag-inherited-formula-token-3-background-color: var(--ag-formula-token-3-background-color);
	--ag-inherited-formula-token-3-border: var(--ag-formula-token-3-border);
	--ag-inherited-formula-token-3-color: var(--ag-formula-token-3-color);
	--ag-inherited-formula-token-4-background-color: var(--ag-formula-token-4-background-color);
	--ag-inherited-formula-token-4-border: var(--ag-formula-token-4-border);
	--ag-inherited-formula-token-4-color: var(--ag-formula-token-4-color);
	--ag-inherited-formula-token-5-background-color: var(--ag-formula-token-5-background-color);
	--ag-inherited-formula-token-5-border: var(--ag-formula-token-5-border);
	--ag-inherited-formula-token-5-color: var(--ag-formula-token-5-color);
	--ag-inherited-formula-token-6-background-color: var(--ag-formula-token-6-background-color);
	--ag-inherited-formula-token-6-border: var(--ag-formula-token-6-border);
	--ag-inherited-formula-token-6-color: var(--ag-formula-token-6-color);
	--ag-inherited-formula-token-7-background-color: var(--ag-formula-token-7-background-color);
	--ag-inherited-formula-token-7-border: var(--ag-formula-token-7-border);
	--ag-inherited-formula-token-7-color: var(--ag-formula-token-7-color);
	--ag-inherited-full-row-edit-invalid-background-color: var(--ag-full-row-edit-invalid-background-color);
	--ag-inherited-header-background-color: var(--ag-header-background-color);
	--ag-inherited-header-cell-background-transition-duration: var(--ag-header-cell-background-transition-duration);
	--ag-inherited-header-cell-hover-background-color: var(--ag-header-cell-hover-background-color);
	--ag-inherited-header-cell-moving-background-color: var(--ag-header-cell-moving-background-color);
	--ag-inherited-header-column-border: var(--ag-header-column-border);
	--ag-inherited-header-column-border-height: var(--ag-header-column-border-height);
	--ag-inherited-header-column-resize-handle-color: var(--ag-header-column-resize-handle-color);
	--ag-inherited-header-column-resize-handle-height: var(--ag-header-column-resize-handle-height);
	--ag-inherited-header-column-resize-handle-width: var(--ag-header-column-resize-handle-width);
	--ag-inherited-header-font-family: var(--ag-header-font-family);
	--ag-inherited-header-font-size: var(--ag-header-font-size);
	--ag-inherited-header-font-weight: var(--ag-header-font-weight);
	--ag-inherited-header-height: var(--ag-header-height);
	--ag-inherited-header-row-border: var(--ag-header-row-border);
	--ag-inherited-header-text-color: var(--ag-header-text-color);
	--ag-inherited-header-vertical-padding-scale: var(--ag-header-vertical-padding-scale);
	--ag-inherited-icon-button-active-background-color: var(--ag-icon-button-active-background-color);
	--ag-inherited-icon-button-active-color: var(--ag-icon-button-active-color);
	--ag-inherited-icon-button-active-indicator-color: var(--ag-icon-button-active-indicator-color);
	--ag-inherited-icon-button-background-color: var(--ag-icon-button-background-color);
	--ag-inherited-icon-button-background-spread: var(--ag-icon-button-background-spread);
	--ag-inherited-icon-button-border-radius: var(--ag-icon-button-border-radius);
	--ag-inherited-icon-button-color: var(--ag-icon-button-color);
	--ag-inherited-icon-button-hover-background-color: var(--ag-icon-button-hover-background-color);
	--ag-inherited-icon-button-hover-color: var(--ag-icon-button-hover-color);
	--ag-inherited-icon-color: var(--ag-icon-color);
	--ag-inherited-icon-size: var(--ag-icon-size);
	--ag-inherited-input-background-color: var(--ag-input-background-color);
	--ag-inherited-input-border: var(--ag-input-border);
	--ag-inherited-input-border-radius: var(--ag-input-border-radius);
	--ag-inherited-input-disabled-background-color: var(--ag-input-disabled-background-color);
	--ag-inherited-input-disabled-border: var(--ag-input-disabled-border);
	--ag-inherited-input-disabled-text-color: var(--ag-input-disabled-text-color);
	--ag-inherited-input-focus-background-color: var(--ag-input-focus-background-color);
	--ag-inherited-input-focus-border: var(--ag-input-focus-border);
	--ag-inherited-input-focus-shadow: var(--ag-input-focus-shadow);
	--ag-inherited-input-focus-text-color: var(--ag-input-focus-text-color);
	--ag-inherited-input-height: var(--ag-input-height);
	--ag-inherited-input-icon-color: var(--ag-input-icon-color);
	--ag-inherited-input-invalid-background-color: var(--ag-input-invalid-background-color);
	--ag-inherited-input-invalid-border: var(--ag-input-invalid-border);
	--ag-inherited-input-invalid-text-color: var(--ag-input-invalid-text-color);
	--ag-inherited-input-padding-start: var(--ag-input-padding-start);
	--ag-inherited-input-placeholder-text-color: var(--ag-input-placeholder-text-color);
	--ag-inherited-input-text-color: var(--ag-input-text-color);
	--ag-inherited-invalid-color: var(--ag-invalid-color);
	--ag-inherited-list-item-height: var(--ag-list-item-height);
	--ag-inherited-menu-background-color: var(--ag-menu-background-color);
	--ag-inherited-menu-border: var(--ag-menu-border);
	--ag-inherited-menu-separator-color: var(--ag-menu-separator-color);
	--ag-inherited-menu-shadow: var(--ag-menu-shadow);
	--ag-inherited-menu-text-color: var(--ag-menu-text-color);
	--ag-inherited-modal-overlay-background-color: var(--ag-modal-overlay-background-color);
	--ag-inherited-note-indicator-color: var(--ag-note-indicator-color);
	--ag-inherited-note-indicator-size: var(--ag-note-indicator-size);
	--ag-inherited-note-popup-background-color: var(--ag-note-popup-background-color);
	--ag-inherited-note-popup-border: var(--ag-note-popup-border);
	--ag-inherited-note-popup-input-background-color: var(--ag-note-popup-input-background-color);
	--ag-inherited-note-popup-input-text-color: var(--ag-note-popup-input-text-color);
	--ag-inherited-note-popup-padding: var(--ag-note-popup-padding);
	--ag-inherited-note-popup-text-color: var(--ag-note-popup-text-color);
	--ag-inherited-odd-row-background-color: var(--ag-odd-row-background-color);
	--ag-inherited-pagination-panel-height: var(--ag-pagination-panel-height);
	--ag-inherited-panel-background-color: var(--ag-panel-background-color);
	--ag-inherited-panel-title-bar-background-color: var(--ag-panel-title-bar-background-color);
	--ag-inherited-panel-title-bar-border: var(--ag-panel-title-bar-border);
	--ag-inherited-panel-title-bar-font-family: var(--ag-panel-title-bar-font-family);
	--ag-inherited-panel-title-bar-font-size: var(--ag-panel-title-bar-font-size);
	--ag-inherited-panel-title-bar-font-weight: var(--ag-panel-title-bar-font-weight);
	--ag-inherited-panel-title-bar-height: var(--ag-panel-title-bar-height);
	--ag-inherited-panel-title-bar-icon-color: var(--ag-panel-title-bar-icon-color);
	--ag-inherited-panel-title-bar-text-color: var(--ag-panel-title-bar-text-color);
	--ag-inherited-picker-button-background-color: var(--ag-picker-button-background-color);
	--ag-inherited-picker-button-border: var(--ag-picker-button-border);
	--ag-inherited-picker-button-focus-background-color: var(--ag-picker-button-focus-background-color);
	--ag-inherited-picker-button-focus-border: var(--ag-picker-button-focus-border);
	--ag-inherited-picker-list-background-color: var(--ag-picker-list-background-color);
	--ag-inherited-picker-list-border: var(--ag-picker-list-border);
	--ag-inherited-pinned-column-border: var(--ag-pinned-column-border);
	--ag-inherited-pinned-row-background-color: var(--ag-pinned-row-background-color);
	--ag-inherited-pinned-row-border: var(--ag-pinned-row-border);
	--ag-inherited-pinned-row-font-weight: var(--ag-pinned-row-font-weight);
	--ag-inherited-pinned-row-text-color: var(--ag-pinned-row-text-color);
	--ag-inherited-pinned-source-row-background-color: var(--ag-pinned-source-row-background-color);
	--ag-inherited-pinned-source-row-font-weight: var(--ag-pinned-source-row-font-weight);
	--ag-inherited-pinned-source-row-text-color: var(--ag-pinned-source-row-text-color);
	--ag-inherited-popup-shadow: var(--ag-popup-shadow);
	--ag-inherited-radio-checked-shape-image: var(--ag-radio-checked-shape-image);
	--ag-inherited-range-header-highlight-color: var(--ag-range-header-highlight-color);
	--ag-inherited-range-selection-background-color: var(--ag-range-selection-background-color);
	--ag-inherited-range-selection-border-color: var(--ag-range-selection-border-color);
	--ag-inherited-range-selection-border-style: var(--ag-range-selection-border-style);
	--ag-inherited-range-selection-chart-background-color: var(--ag-range-selection-chart-background-color);
	--ag-inherited-range-selection-chart-category-background-color: var(--ag-range-selection-chart-category-background-color);
	--ag-inherited-range-selection-highlight-color: var(--ag-range-selection-highlight-color);
	--ag-inherited-row-batch-edit-background-color: var(--ag-row-batch-edit-background-color);
	--ag-inherited-row-batch-edit-text-color: var(--ag-row-batch-edit-text-color);
	--ag-inherited-row-border: var(--ag-row-border);
	--ag-inherited-row-drag-indicator-color: var(--ag-row-drag-indicator-color);
	--ag-inherited-row-drag-indicator-width: var(--ag-row-drag-indicator-width);
	--ag-inherited-row-group-indent-size: var(--ag-row-group-indent-size);
	--ag-inherited-row-height: var(--ag-row-height);
	--ag-inherited-row-hover-color: var(--ag-row-hover-color);
	--ag-inherited-row-loading-skeleton-effect-color: var(--ag-row-loading-skeleton-effect-color);
	--ag-inherited-row-numbers-selected-color: var(--ag-row-numbers-selected-color);
	--ag-inherited-row-vertical-padding-scale: var(--ag-row-vertical-padding-scale);
	--ag-inherited-select-cell-background-color: var(--ag-select-cell-background-color);
	--ag-inherited-select-cell-border: var(--ag-select-cell-border);
	--ag-inherited-selected-row-background-color: var(--ag-selected-row-background-color);
	--ag-inherited-set-filter-indent-size: var(--ag-set-filter-indent-size);
	--ag-inherited-side-bar-background-color: var(--ag-side-bar-background-color);
	--ag-inherited-side-bar-panel-animation-duration: var(--ag-side-bar-panel-animation-duration);
	--ag-inherited-side-bar-panel-width: var(--ag-side-bar-panel-width);
	--ag-inherited-side-button-background-color: var(--ag-side-button-background-color);
	--ag-inherited-side-button-bar-background-color: var(--ag-side-button-bar-background-color);
	--ag-inherited-side-button-bar-top-padding: var(--ag-side-button-bar-top-padding);
	--ag-inherited-side-button-border: var(--ag-side-button-border);
	--ag-inherited-side-button-hover-background-color: var(--ag-side-button-hover-background-color);
	--ag-inherited-side-button-hover-text-color: var(--ag-side-button-hover-text-color);
	--ag-inherited-side-button-left-padding: var(--ag-side-button-left-padding);
	--ag-inherited-side-button-right-padding: var(--ag-side-button-right-padding);
	--ag-inherited-side-button-selected-background-color: var(--ag-side-button-selected-background-color);
	--ag-inherited-side-button-selected-border: var(--ag-side-button-selected-border);
	--ag-inherited-side-button-selected-text-color: var(--ag-side-button-selected-text-color);
	--ag-inherited-side-button-selected-underline-color: var(--ag-side-button-selected-underline-color);
	--ag-inherited-side-button-selected-underline-transition-duration: var(--ag-side-button-selected-underline-transition-duration);
	--ag-inherited-side-button-selected-underline-width: var(--ag-side-button-selected-underline-width);
	--ag-inherited-side-button-text-color: var(--ag-side-button-text-color);
	--ag-inherited-side-button-vertical-padding: var(--ag-side-button-vertical-padding);
	--ag-inherited-side-panel-border: var(--ag-side-panel-border);
	--ag-inherited-spacing: var(--ag-spacing);
	--ag-inherited-status-bar-label-color: var(--ag-status-bar-label-color);
	--ag-inherited-status-bar-label-font-weight: var(--ag-status-bar-label-font-weight);
	--ag-inherited-status-bar-value-color: var(--ag-status-bar-value-color);
	--ag-inherited-status-bar-value-font-weight: var(--ag-status-bar-value-font-weight);
	--ag-inherited-subtle-text-color: var(--ag-subtle-text-color);
	--ag-inherited-tab-background-color: var(--ag-tab-background-color);
	--ag-inherited-tab-bar-background-color: var(--ag-tab-bar-background-color);
	--ag-inherited-tab-bar-border: var(--ag-tab-bar-border);
	--ag-inherited-tab-bar-horizontal-padding: var(--ag-tab-bar-horizontal-padding);
	--ag-inherited-tab-bar-top-padding: var(--ag-tab-bar-top-padding);
	--ag-inherited-tab-bottom-padding: var(--ag-tab-bottom-padding);
	--ag-inherited-tab-horizontal-padding: var(--ag-tab-horizontal-padding);
	--ag-inherited-tab-hover-background-color: var(--ag-tab-hover-background-color);
	--ag-inherited-tab-hover-text-color: var(--ag-tab-hover-text-color);
	--ag-inherited-tab-selected-background-color: var(--ag-tab-selected-background-color);
	--ag-inherited-tab-selected-border-color: var(--ag-tab-selected-border-color);
	--ag-inherited-tab-selected-border-width: var(--ag-tab-selected-border-width);
	--ag-inherited-tab-selected-text-color: var(--ag-tab-selected-text-color);
	--ag-inherited-tab-selected-underline-color: var(--ag-tab-selected-underline-color);
	--ag-inherited-tab-selected-underline-transition-duration: var(--ag-tab-selected-underline-transition-duration);
	--ag-inherited-tab-selected-underline-width: var(--ag-tab-selected-underline-width);
	--ag-inherited-tab-spacing: var(--ag-tab-spacing);
	--ag-inherited-tab-text-color: var(--ag-tab-text-color);
	--ag-inherited-tab-top-padding: var(--ag-tab-top-padding);
	--ag-inherited-text-color: var(--ag-text-color);
	--ag-inherited-toggle-button-height: var(--ag-toggle-button-height);
	--ag-inherited-toggle-button-off-background-color: var(--ag-toggle-button-off-background-color);
	--ag-inherited-toggle-button-on-background-color: var(--ag-toggle-button-on-background-color);
	--ag-inherited-toggle-button-switch-background-color: var(--ag-toggle-button-switch-background-color);
	--ag-inherited-toggle-button-switch-inset: var(--ag-toggle-button-switch-inset);
	--ag-inherited-toggle-button-width: var(--ag-toggle-button-width);
	--ag-inherited-tool-panel-separator-border: var(--ag-tool-panel-separator-border);
	--ag-inherited-toolbar-background-color: var(--ag-toolbar-background-color);
	--ag-inherited-toolbar-separator-border: var(--ag-toolbar-separator-border);
	--ag-inherited-toolbar-text-color: var(--ag-toolbar-text-color);
	--ag-inherited-tooltip-background-color: var(--ag-tooltip-background-color);
	--ag-inherited-tooltip-border: var(--ag-tooltip-border);
	--ag-inherited-tooltip-error-background-color: var(--ag-tooltip-error-background-color);
	--ag-inherited-tooltip-error-border: var(--ag-tooltip-error-border);
	--ag-inherited-tooltip-error-text-color: var(--ag-tooltip-error-text-color);
	--ag-inherited-tooltip-text-color: var(--ag-tooltip-text-color);
	--ag-inherited-value-change-delta-down-color: var(--ag-value-change-delta-down-color);
	--ag-inherited-value-change-delta-up-color: var(--ag-value-change-delta-up-color);
	--ag-inherited-value-change-value-highlight-background-color: var(--ag-value-change-value-highlight-background-color);
	--ag-inherited-widget-container-horizontal-padding: var(--ag-widget-container-horizontal-padding);
	--ag-inherited-widget-container-vertical-padding: var(--ag-widget-container-vertical-padding);
	--ag-inherited-widget-horizontal-spacing: var(--ag-widget-horizontal-spacing);
	--ag-inherited-widget-vertical-spacing: var(--ag-widget-vertical-spacing);
	--ag-inherited-wrapper-background-color: var(--ag-wrapper-background-color);
	--ag-inherited-wrapper-border: var(--ag-wrapper-border);
	--ag-inherited-wrapper-border-radius: var(--ag-wrapper-border-radius);
:where([data-ag-theme-mode="light"]) & {
	--ag-inherited-browser-color-scheme: var(--ag-browser-color-scheme);
	--ag-inherited-chrome-background-color: var(--ag-chrome-background-color);
}
:where(.ag-theme-params-1) {
	--ag-accent-color: var(--ag-inherited-accent-color, var(--color-background-brand));
	--ag-advanced-filter-builder-button-bar-border: var(--ag-inherited-advanced-filter-builder-button-bar-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-advanced-filter-builder-column-pill-color: var(--ag-inherited-advanced-filter-builder-column-pill-color, #a6e194);
	--ag-advanced-filter-builder-indent-size: var(--ag-inherited-advanced-filter-builder-indent-size, calc( var(--ag-spacing)   *  2  +   var(--ag-icon-size) ));
	--ag-advanced-filter-builder-join-pill-color: var(--ag-inherited-advanced-filter-builder-join-pill-color, #f08e8d);
	--ag-advanced-filter-builder-option-pill-color: var(--ag-inherited-advanced-filter-builder-option-pill-color, #f3c08b);
	--ag-advanced-filter-builder-value-pill-color: var(--ag-inherited-advanced-filter-builder-value-pill-color, #85c0e4);
	--ag-background-color: var(--ag-inherited-background-color, var(--color-background-elevation-raised));
	--ag-border-color: var(--ag-inherited-border-color, var(--color-border-default));
	--ag-border-radius: var(--ag-inherited-border-radius, var(--radius-100, 4px));
	--ag-border-width: var(--ag-inherited-border-width, 1px);
	--ag-browser-color-scheme: var(--ag-inherited-browser-color-scheme, light);
	--ag-button-active-background-color: var(--ag-inherited-button-active-background-color, var(--ag-button-hover-background-color));
	--ag-button-active-border: var(--ag-inherited-button-active-border, solid var(--ag-border-width) var(--ag-accent-color));
	--ag-button-active-text-color: var(--ag-inherited-button-active-text-color, var(--ag-button-hover-text-color));
	--ag-button-background-color: var(--ag-inherited-button-background-color, var(--ag-background-color));
	--ag-button-border: var(--ag-inherited-button-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-button-border-radius: var(--ag-inherited-button-border-radius, var(--ag-border-radius));
	--ag-button-disabled-background-color: var(--ag-inherited-button-disabled-background-color, var(--ag-input-disabled-background-color));
	--ag-button-disabled-border: var(--ag-inherited-button-disabled-border, var(--ag-input-disabled-border));
	--ag-button-disabled-text-color: var(--ag-inherited-button-disabled-text-color, var(--ag-input-disabled-text-color));
	--ag-button-font-weight: var(--ag-inherited-button-font-weight, normal);
	--ag-button-horizontal-padding: var(--ag-inherited-button-horizontal-padding, calc( var(--ag-spacing)   *  2));
	--ag-button-hover-background-color: var(--ag-inherited-button-hover-background-color, var(--ag-row-hover-color));
	--ag-button-hover-border: var(--ag-inherited-button-hover-border, var(--ag-button-border));
	--ag-button-hover-text-color: var(--ag-inherited-button-hover-text-color, var(--ag-button-text-color));
	--ag-button-text-color: var(--ag-inherited-button-text-color, inherit);
	--ag-button-vertical-padding: var(--ag-inherited-button-vertical-padding, var(--ag-spacing));
	--ag-card-shadow: var(--ag-inherited-card-shadow, 0 1px 4px 1px #00000018);
	--ag-cell-batch-edit-background-color: var(--ag-inherited-cell-batch-edit-background-color, rgba(220 181 139 / 16%));
	--ag-cell-batch-edit-text-color: var(--ag-inherited-cell-batch-edit-text-color, #422f00);
	--ag-cell-editing-border: var(--ag-inherited-cell-editing-border, solid var(--ag-border-width) var(--ag-accent-color));
	--ag-cell-editing-shadow: var(--ag-inherited-cell-editing-shadow, var(--ag-card-shadow));
	--ag-cell-font-family: var(--ag-inherited-cell-font-family, var(--ag-font-family));
	--ag-cell-font-size: var(--ag-inherited-cell-font-size, var(--ag-data-font-size));
	--ag-cell-font-weight: var(--ag-inherited-cell-font-weight, var(--ag-font-weight));
	--ag-cell-horizontal-padding: var(--ag-inherited-cell-horizontal-padding, calc( var(--ag-spacing)   *  2  *   var(--ag-cell-horizontal-padding-scale) ));
	--ag-cell-horizontal-padding-scale: var(--ag-inherited-cell-horizontal-padding-scale, 1);
	--ag-cell-text-color: var(--ag-inherited-cell-text-color, var(--ag-text-color));
	--ag-cell-widget-spacing: var(--ag-inherited-cell-widget-spacing, calc( var(--ag-spacing)   *  1.5));
	--ag-chart-menu-label-color: var(--ag-inherited-chart-menu-label-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 80%));
	--ag-chart-menu-panel-width: var(--ag-inherited-chart-menu-panel-width, 260px);
	--ag-checkbox-border-radius: var(--ag-inherited-checkbox-border-radius, var(--ag-border-radius));
	--ag-checkbox-border-width: var(--ag-inherited-checkbox-border-width, 1px);
	--ag-checkbox-checked-background-color: var(--ag-inherited-checkbox-checked-background-color, var(--ag-accent-color));
	--ag-checkbox-checked-border-color: var(--ag-inherited-checkbox-checked-border-color, var(--ag-checkbox-checked-background-color));
	--ag-checkbox-checked-shape-color: var(--ag-inherited-checkbox-checked-shape-color, var(--ag-background-color));
	--ag-checkbox-checked-shape-image: var(--ag-inherited-checkbox-checked-shape-image, url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%227%22%20fill%3D%22none%22%3E%3Cpath%20stroke%3D%22%23000%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.75%22%20d%3D%22M1%203.5%203.5%206l5-5%22%2F%3E%3C%2Fsvg%3E"));
	--ag-checkbox-indeterminate-background-color: var(--ag-inherited-checkbox-indeterminate-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 30%));
	--ag-checkbox-indeterminate-border-color: var(--ag-inherited-checkbox-indeterminate-border-color, var(--ag-checkbox-indeterminate-background-color));
	--ag-checkbox-indeterminate-shape-color: var(--ag-inherited-checkbox-indeterminate-shape-color, var(--ag-background-color));
	--ag-checkbox-indeterminate-shape-image: var(--ag-inherited-checkbox-indeterminate-shape-image, url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%222%22%20fill%3D%22none%22%3E%3Crect%20width%3D%2210%22%20height%3D%222%22%20fill%3D%22%23000%22%20rx%3D%221%22%2F%3E%3C%2Fsvg%3E"));
	--ag-checkbox-unchecked-background-color: var(--ag-inherited-checkbox-unchecked-background-color, var(--ag-background-color));
	--ag-checkbox-unchecked-border-color: var(--ag-inherited-checkbox-unchecked-border-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 30%));
	--ag-chrome-background-color: var(--ag-inherited-chrome-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 2%));
	--ag-color-picker-color-border-radius: var(--ag-inherited-color-picker-color-border-radius, 4px);
	--ag-color-picker-thumb-border-width: var(--ag-inherited-color-picker-thumb-border-width, 3px);
	--ag-color-picker-thumb-size: var(--ag-inherited-color-picker-thumb-size, 18px);
	--ag-color-picker-track-border-radius: var(--ag-inherited-color-picker-track-border-radius, 12px);
	--ag-color-picker-track-size: var(--ag-inherited-color-picker-track-size, 12px);
	--ag-column-border: var(--ag-inherited-column-border, solid 1px transparent);
	--ag-column-drag-indicator-color: var(--ag-inherited-column-drag-indicator-color, var(--ag-accent-color));
	--ag-column-drag-indicator-width: var(--ag-inherited-column-drag-indicator-width, 2px);
	--ag-column-drop-cell-background-color: var(--ag-inherited-column-drop-cell-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 7.000000000000001%));
	--ag-column-drop-cell-border: var(--ag-inherited-column-drop-cell-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 13%));
	--ag-column-drop-cell-drag-handle-color: var(--ag-inherited-column-drop-cell-drag-handle-color, var(--ag-text-color));
	--ag-column-drop-cell-text-color: var(--ag-inherited-column-drop-cell-text-color, var(--ag-text-color));
	--ag-column-hover-color: var(--ag-inherited-column-hover-color, color-mix(in srgb, transparent, var(--ag-accent-color) 5%));
	--ag-column-panel-apply-button-background-color: var(--ag-inherited-column-panel-apply-button-background-color, var(--ag-accent-color));
	--ag-column-panel-apply-button-color: var(--ag-inherited-column-panel-apply-button-color, var(--ag-background-color));
	--ag-column-select-indent-size: var(--ag-inherited-column-select-indent-size, var(--ag-icon-size));
	--ag-data-background-color: var(--ag-inherited-data-background-color, var(--ag-background-color));
	--ag-data-font-size: var(--ag-inherited-data-font-size, var(--ag-font-size));
	--ag-dialog-border: var(--ag-inherited-dialog-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 20%));
	--ag-dialog-shadow: var(--ag-inherited-dialog-shadow, var(--ag-popup-shadow));
	--ag-drag-and-drop-image-background-color: var(--ag-inherited-drag-and-drop-image-background-color, var(--ag-background-color));
	--ag-drag-and-drop-image-border: var(--ag-inherited-drag-and-drop-image-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-drag-and-drop-image-not-allowed-border: var(--ag-inherited-drag-and-drop-image-not-allowed-border, solid var(--ag-border-width) color-mix(in srgb, var(--ag-drag-and-drop-image-background-color), var(--ag-invalid-color) 50%));
	--ag-drag-and-drop-image-shadow: var(--ag-inherited-drag-and-drop-image-shadow, var(--ag-popup-shadow));
	--ag-drag-handle-color: var(--ag-inherited-drag-handle-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 70%));
	--ag-dropdown-shadow: var(--ag-inherited-dropdown-shadow, var(--ag-card-shadow));
	--ag-filter-panel-apply-button-background-color: var(--ag-inherited-filter-panel-apply-button-background-color, var(--ag-accent-color));
	--ag-filter-panel-apply-button-color: var(--ag-inherited-filter-panel-apply-button-color, var(--ag-background-color));
	--ag-filter-panel-card-subtle-color: var(--ag-inherited-filter-panel-card-subtle-color, color-mix(in srgb, transparent, var(--ag-text-color) 70%));
	--ag-filter-panel-card-subtle-hover-color: var(--ag-inherited-filter-panel-card-subtle-hover-color, var(--ag-text-color));
	--ag-filter-tool-panel-group-indent: var(--ag-inherited-filter-tool-panel-group-indent, var(--ag-spacing));
	--ag-find-active-match-background-color: var(--ag-inherited-find-active-match-background-color, #ffa500);
	--ag-find-active-match-color: var(--ag-inherited-find-active-match-color, var(--ag-foreground-color));
	--ag-find-match-background-color: var(--ag-inherited-find-match-background-color, #ffff00);
	--ag-find-match-color: var(--ag-inherited-find-match-color, var(--ag-foreground-color));
	--ag-focus-error-shadow: var(--ag-inherited-focus-error-shadow, 0px 0px 0px 3px color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 50%));
	--ag-focus-shadow: var(--ag-inherited-focus-shadow, 0px 0px 0px 3px color-mix(in srgb, transparent, var(--ag-accent-color) 50%));
	--ag-font-family: var(--ag-inherited-font-family, inherit);
	--ag-font-size: var(--ag-inherited-font-size, 14px);
	--ag-font-weight: var(--ag-inherited-font-weight, inherit);
	--ag-footer-row-border: var(--ag-inherited-footer-row-border, var(--ag-row-border));
	--ag-foreground-color: var(--ag-inherited-foreground-color, var(--color-content-default));
	--ag-formula-token-1-background-color: var(--ag-inherited-formula-token-1-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-1-color) 8%));
	--ag-formula-token-1-border: var(--ag-inherited-formula-token-1-border, solid var(--ag-border-width) var(--ag-formula-token-1-color));
	--ag-formula-token-1-color: var(--ag-inherited-formula-token-1-color, #3269c6);
	--ag-formula-token-2-background-color: var(--ag-inherited-formula-token-2-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-2-color) 6%));
	--ag-formula-token-2-border: var(--ag-inherited-formula-token-2-border, solid var(--ag-border-width) var(--ag-formula-token-2-color));
	--ag-formula-token-2-color: var(--ag-inherited-formula-token-2-color, #c0343f);
	--ag-formula-token-3-background-color: var(--ag-inherited-formula-token-3-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-3-color) 8%));
	--ag-formula-token-3-border: var(--ag-inherited-formula-token-3-border, solid var(--ag-border-width) var(--ag-formula-token-3-color));
	--ag-formula-token-3-color: var(--ag-inherited-formula-token-3-color, #8156b8);
	--ag-formula-token-4-background-color: var(--ag-inherited-formula-token-4-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-4-color) 6%));
	--ag-formula-token-4-border: var(--ag-inherited-formula-token-4-border, solid var(--ag-border-width) var(--ag-formula-token-4-color));
	--ag-formula-token-4-color: var(--ag-inherited-formula-token-4-color, #007c1f);
	--ag-formula-token-5-background-color: var(--ag-inherited-formula-token-5-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-5-color) 8%));
	--ag-formula-token-5-border: var(--ag-inherited-formula-token-5-border, solid var(--ag-border-width) var(--ag-formula-token-5-color));
	--ag-formula-token-5-color: var(--ag-inherited-formula-token-5-color, #b03e85);
	--ag-formula-token-6-background-color: var(--ag-inherited-formula-token-6-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-6-color) 6%));
	--ag-formula-token-6-border: var(--ag-inherited-formula-token-6-border, solid var(--ag-border-width) var(--ag-formula-token-6-color));
	--ag-formula-token-6-color: var(--ag-inherited-formula-token-6-color, #b74900);
	--ag-formula-token-7-background-color: var(--ag-inherited-formula-token-7-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-7-color) 8%));
	--ag-formula-token-7-border: var(--ag-inherited-formula-token-7-border, solid var(--ag-border-width) var(--ag-formula-token-7-color));
	--ag-formula-token-7-color: var(--ag-inherited-formula-token-7-color, #247492);
	--ag-full-row-edit-invalid-background-color: var(--ag-inherited-full-row-edit-invalid-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 25%));
	--ag-header-background-color: var(--ag-inherited-header-background-color, var(--color-background-elevation-sunken, transparent));
	--ag-header-cell-background-transition-duration: var(--ag-inherited-header-cell-background-transition-duration, 0.2s);
	--ag-header-cell-hover-background-color: var(--ag-inherited-header-cell-hover-background-color, transparent);
	--ag-header-cell-moving-background-color: var(--ag-inherited-header-cell-moving-background-color, var(--ag-header-cell-hover-background-color));
	--ag-header-column-border: var(--ag-inherited-header-column-border, none);
	--ag-header-column-border-height: var(--ag-inherited-header-column-border-height, 100%);
	--ag-header-column-resize-handle-color: var(--ag-inherited-header-column-resize-handle-color, var(--ag-border-color));
	--ag-header-column-resize-handle-height: var(--ag-inherited-header-column-resize-handle-height, 30%);
	--ag-header-column-resize-handle-width: var(--ag-inherited-header-column-resize-handle-width, 2px);
	--ag-header-font-family: var(--ag-inherited-header-font-family, var(--ag-font-family));
	--ag-header-font-size: var(--ag-inherited-header-font-size, var(--ag-font-size));
	--ag-header-font-weight: var(--ag-inherited-header-font-weight, 600);
	--ag-header-height: var(--ag-inherited-header-height, calc(max( var(--ag-icon-size) ,  var(--ag-data-font-size) )  +   var(--ag-spacing)   *  4  *   var(--ag-header-vertical-padding-scale) ));
	--ag-header-row-border: var(--ag-inherited-header-row-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-header-text-color: var(--ag-inherited-header-text-color, var(--color-content-default-secondary));
	--ag-header-vertical-padding-scale: var(--ag-inherited-header-vertical-padding-scale, 1);
	--ag-icon-button-active-background-color: var(--ag-inherited-icon-button-active-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 28.000000000000004%));
	--ag-icon-button-active-color: var(--ag-inherited-icon-button-active-color, var(--ag-accent-color));
	--ag-icon-button-active-indicator-color: var(--ag-inherited-icon-button-active-indicator-color, var(--ag-accent-color));
	--ag-icon-button-background-color: var(--ag-inherited-icon-button-background-color, transparent);
	--ag-icon-button-background-spread: var(--ag-inherited-icon-button-background-spread, 4px);
	--ag-icon-button-border-radius: var(--ag-inherited-icon-button-border-radius, 1px);
	--ag-icon-button-color: var(--ag-inherited-icon-button-color, var(--ag-icon-color));
	--ag-icon-button-hover-background-color: var(--ag-inherited-icon-button-hover-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 10%));
	--ag-icon-button-hover-color: var(--ag-inherited-icon-button-hover-color, var(--ag-icon-button-color));
	--ag-icon-color: var(--ag-inherited-icon-color, inherit);
	--ag-icon-size: var(--ag-inherited-icon-size, 16px);
	--ag-input-background-color: var(--ag-inherited-input-background-color, var(--ag-background-color));
	--ag-input-border: var(--ag-inherited-input-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-input-border-radius: var(--ag-inherited-input-border-radius, var(--ag-border-radius));
	--ag-input-disabled-background-color: var(--ag-inherited-input-disabled-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 6%));
	--ag-input-disabled-border: var(--ag-inherited-input-disabled-border, var(--ag-input-border));
	--ag-input-disabled-text-color: var(--ag-inherited-input-disabled-text-color, color-mix(in srgb, transparent, var(--ag-text-color) 50%));
	--ag-input-focus-background-color: var(--ag-inherited-input-focus-background-color, var(--ag-input-background-color));
	--ag-input-focus-border: var(--ag-inherited-input-focus-border, solid var(--ag-border-width) var(--ag-accent-color));
	--ag-input-focus-shadow: var(--ag-inherited-input-focus-shadow, var(--ag-focus-shadow));
	--ag-input-focus-text-color: var(--ag-inherited-input-focus-text-color, var(--ag-input-text-color));
	--ag-input-height: var(--ag-inherited-input-height, calc(max( var(--ag-icon-size) ,  var(--ag-font-size) )  +   var(--ag-spacing)   *  2));
	--ag-input-icon-color: var(--ag-inherited-input-icon-color, var(--ag-input-text-color));
	--ag-input-invalid-background-color: var(--ag-inherited-input-invalid-background-color, var(--ag-input-background-color));
	--ag-input-invalid-border: var(--ag-inherited-input-invalid-border, solid var(--ag-border-width) var(--ag-invalid-color));
	--ag-input-invalid-text-color: var(--ag-inherited-input-invalid-text-color, var(--ag-input-text-color));
	--ag-input-padding-start: var(--ag-inherited-input-padding-start, var(--ag-spacing));
	--ag-input-placeholder-text-color: var(--ag-inherited-input-placeholder-text-color, color-mix(in srgb, transparent, var(--ag-input-text-color) 50%));
	--ag-input-text-color: var(--ag-inherited-input-text-color, var(--ag-text-color));
	--ag-invalid-color: var(--ag-inherited-invalid-color, #e02525);
	--ag-list-item-height: var(--ag-inherited-list-item-height, calc(max( var(--ag-icon-size) ,  var(--ag-data-font-size) )  +   var(--ag-widget-vertical-spacing) ));
	--ag-menu-background-color: var(--ag-inherited-menu-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 3%));
	--ag-menu-border: var(--ag-inherited-menu-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 20%));
	--ag-menu-separator-color: var(--ag-inherited-menu-separator-color, var(--ag-border-color));
	--ag-menu-shadow: var(--ag-inherited-menu-shadow, var(--ag-popup-shadow));
	--ag-menu-text-color: var(--ag-inherited-menu-text-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 95%));
	--ag-modal-overlay-background-color: var(--ag-inherited-modal-overlay-background-color, color-mix(in srgb, transparent, var(--ag-background-color) 66%));
	--ag-note-indicator-color: var(--ag-inherited-note-indicator-color, var(--ag-accent-color));
	--ag-note-indicator-size: var(--ag-inherited-note-indicator-size, 8px);
	--ag-note-popup-background-color: var(--ag-inherited-note-popup-background-color, var(--ag-menu-background-color));
	--ag-note-popup-border: var(--ag-inherited-note-popup-border, var(--ag-dialog-border));
	--ag-note-popup-input-background-color: var(--ag-inherited-note-popup-input-background-color, var(--ag-input-background-color));
	--ag-note-popup-input-text-color: var(--ag-inherited-note-popup-input-text-color, var(--ag-input-text-color));
	--ag-note-popup-padding: var(--ag-inherited-note-popup-padding, calc( var(--ag-spacing)   *  0.5));
	--ag-note-popup-text-color: var(--ag-inherited-note-popup-text-color, color-mix(in srgb, transparent, var(--ag-menu-text-color) 75%));
	--ag-odd-row-background-color: var(--ag-inherited-odd-row-background-color, var(--ag-data-background-color));
	--ag-pagination-panel-height: var(--ag-inherited-pagination-panel-height, calc(max( var(--ag-row-height) , 22px)));
	--ag-panel-background-color: var(--ag-inherited-panel-background-color, var(--ag-background-color));
	--ag-panel-title-bar-background-color: var(--ag-inherited-panel-title-bar-background-color, var(--ag-header-background-color));
	--ag-panel-title-bar-border: var(--ag-inherited-panel-title-bar-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-panel-title-bar-font-family: var(--ag-inherited-panel-title-bar-font-family, var(--ag-header-font-family));
	--ag-panel-title-bar-font-size: var(--ag-inherited-panel-title-bar-font-size, var(--ag-header-font-size));
	--ag-panel-title-bar-font-weight: var(--ag-inherited-panel-title-bar-font-weight, var(--ag-header-font-weight));
	--ag-panel-title-bar-height: var(--ag-inherited-panel-title-bar-height, var(--ag-header-height));
	--ag-panel-title-bar-icon-color: var(--ag-inherited-panel-title-bar-icon-color, var(--ag-header-text-color));
	--ag-panel-title-bar-text-color: var(--ag-inherited-panel-title-bar-text-color, var(--ag-header-text-color));
	--ag-picker-button-background-color: var(--ag-inherited-picker-button-background-color, var(--ag-background-color));
	--ag-picker-button-border: var(--ag-inherited-picker-button-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-picker-button-focus-background-color: var(--ag-inherited-picker-button-focus-background-color, var(--ag-background-color));
	--ag-picker-button-focus-border: var(--ag-inherited-picker-button-focus-border, var(--ag-input-focus-border));
	--ag-picker-list-background-color: var(--ag-inherited-picker-list-background-color, var(--ag-background-color));
	--ag-picker-list-border: var(--ag-inherited-picker-list-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-pinned-column-border: var(--ag-inherited-pinned-column-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-pinned-row-background-color: var(--ag-inherited-pinned-row-background-color, var(--ag-data-background-color));
	--ag-pinned-row-border: var(--ag-inherited-pinned-row-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-pinned-row-font-weight: var(--ag-inherited-pinned-row-font-weight, 600);
	--ag-pinned-row-text-color: var(--ag-inherited-pinned-row-text-color, var(--ag-text-color));
	--ag-pinned-source-row-background-color: var(--ag-inherited-pinned-source-row-background-color, var(--ag-data-background-color));
	--ag-pinned-source-row-font-weight: var(--ag-inherited-pinned-source-row-font-weight, 600);
	--ag-pinned-source-row-text-color: var(--ag-inherited-pinned-source-row-text-color, var(--ag-text-color));
	--ag-popup-shadow: var(--ag-inherited-popup-shadow, 0 0 16px #00000026);
	--ag-radio-checked-shape-image: var(--ag-inherited-radio-checked-shape-image, url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%226%22%20height%3D%226%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E"));
	--ag-range-header-highlight-color: var(--ag-inherited-range-header-highlight-color, color-mix(in srgb, var(--ag-header-background-color), var(--ag-foreground-color) 8%));
	--ag-range-selection-background-color: var(--ag-inherited-range-selection-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 20%));
	--ag-range-selection-border-color: var(--ag-inherited-range-selection-border-color, var(--ag-accent-color));
	--ag-range-selection-border-style: var(--ag-inherited-range-selection-border-style, solid);
	--ag-range-selection-chart-background-color: var(--ag-inherited-range-selection-chart-background-color, #0058FF1A);
	--ag-range-selection-chart-category-background-color: var(--ag-inherited-range-selection-chart-category-background-color, #00FF841A);
	--ag-range-selection-highlight-color: var(--ag-inherited-range-selection-highlight-color, color-mix(in srgb, transparent, var(--ag-accent-color) 50%));
	--ag-row-batch-edit-background-color: var(--ag-inherited-row-batch-edit-background-color, var(--ag-cell-batch-edit-background-color));
	--ag-row-batch-edit-text-color: var(--ag-inherited-row-batch-edit-text-color, var(--ag-cell-batch-edit-text-color));
	--ag-row-border: var(--ag-inherited-row-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-row-drag-indicator-color: var(--ag-inherited-row-drag-indicator-color, var(--ag-range-selection-border-color));
	--ag-row-drag-indicator-width: var(--ag-inherited-row-drag-indicator-width, 2px);
	--ag-row-group-indent-size: var(--ag-inherited-row-group-indent-size, calc( var(--ag-cell-widget-spacing)   +   var(--ag-icon-size) ));
	--ag-row-height: var(--ag-inherited-row-height, calc(max( var(--ag-icon-size) ,  var(--ag-cell-font-size) )  +   var(--ag-spacing)   *  3.25  *   var(--ag-row-vertical-padding-scale) ));
	--ag-row-hover-color: var(--ag-inherited-row-hover-color, var(--color-background-brand-subtle));
	--ag-row-loading-skeleton-effect-color: var(--ag-inherited-row-loading-skeleton-effect-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 15%));
	--ag-row-numbers-selected-color: var(--ag-inherited-row-numbers-selected-color, color-mix(in srgb, transparent, var(--ag-accent-color) 50%));
	--ag-row-vertical-padding-scale: var(--ag-inherited-row-vertical-padding-scale, 1);
	--ag-select-cell-background-color: var(--ag-inherited-select-cell-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 7.000000000000001%));
	--ag-select-cell-border: var(--ag-inherited-select-cell-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 13%));
	--ag-selected-row-background-color: var(--ag-inherited-selected-row-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 12%));
	--ag-set-filter-indent-size: var(--ag-inherited-set-filter-indent-size, var(--ag-icon-size));
	--ag-side-bar-background-color: var(--ag-inherited-side-bar-background-color, var(--ag-chrome-background-color));
	--ag-side-bar-panel-animation-duration: var(--ag-inherited-side-bar-panel-animation-duration, 0s);
	--ag-side-bar-panel-width: var(--ag-inherited-side-bar-panel-width, 250px);
	--ag-side-button-background-color: var(--ag-inherited-side-button-background-color, transparent);
	--ag-side-button-bar-background-color: var(--ag-inherited-side-button-bar-background-color, var(--ag-side-bar-background-color));
	--ag-side-button-bar-top-padding: var(--ag-inherited-side-button-bar-top-padding, 0px);
	--ag-side-button-border: var(--ag-inherited-side-button-border, solid 1px transparent);
	--ag-side-button-hover-background-color: var(--ag-inherited-side-button-hover-background-color, var(--ag-side-button-background-color));
	--ag-side-button-hover-text-color: var(--ag-inherited-side-button-hover-text-color, var(--ag-side-button-text-color));
	--ag-side-button-left-padding: var(--ag-inherited-side-button-left-padding, var(--ag-spacing));
	--ag-side-button-right-padding: var(--ag-inherited-side-button-right-padding, var(--ag-spacing));
	--ag-side-button-selected-background-color: var(--ag-inherited-side-button-selected-background-color, var(--ag-background-color));
	--ag-side-button-selected-border: var(--ag-inherited-side-button-selected-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-side-button-selected-text-color: var(--ag-inherited-side-button-selected-text-color, var(--ag-side-button-text-color));
	--ag-side-button-selected-underline-color: var(--ag-inherited-side-button-selected-underline-color, transparent);
	--ag-side-button-selected-underline-transition-duration: var(--ag-inherited-side-button-selected-underline-transition-duration, 0s);
	--ag-side-button-selected-underline-width: var(--ag-inherited-side-button-selected-underline-width, 2px);
	--ag-side-button-text-color: var(--ag-inherited-side-button-text-color, var(--ag-text-color));
	--ag-side-button-vertical-padding: var(--ag-inherited-side-button-vertical-padding, calc( var(--ag-spacing)   *  3));
	--ag-side-panel-border: var(--ag-inherited-side-panel-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-spacing: var(--ag-inherited-spacing, 8px);
	--ag-status-bar-label-color: var(--ag-inherited-status-bar-label-color, var(--ag-foreground-color));
	--ag-status-bar-label-font-weight: var(--ag-inherited-status-bar-label-font-weight, 500);
	--ag-status-bar-value-color: var(--ag-inherited-status-bar-value-color, var(--ag-foreground-color));
	--ag-status-bar-value-font-weight: var(--ag-inherited-status-bar-value-font-weight, 500);
	--ag-subtle-text-color: var(--ag-inherited-subtle-text-color, color-mix(in srgb, transparent, var(--ag-text-color) 50%));
	--ag-tab-background-color: var(--ag-inherited-tab-background-color, transparent);
	--ag-tab-bar-background-color: var(--ag-inherited-tab-bar-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 5%));
	--ag-tab-bar-border: var(--ag-inherited-tab-bar-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-tab-bar-horizontal-padding: var(--ag-inherited-tab-bar-horizontal-padding, 0px);
	--ag-tab-bar-top-padding: var(--ag-inherited-tab-bar-top-padding, 0px);
	--ag-tab-bottom-padding: var(--ag-inherited-tab-bottom-padding, var(--ag-spacing));
	--ag-tab-horizontal-padding: var(--ag-inherited-tab-horizontal-padding, var(--ag-spacing));
	--ag-tab-hover-background-color: var(--ag-inherited-tab-hover-background-color, var(--ag-tab-background-color));
	--ag-tab-hover-text-color: var(--ag-inherited-tab-hover-text-color, var(--ag-text-color));
	--ag-tab-selected-background-color: var(--ag-inherited-tab-selected-background-color, var(--ag-background-color));
	--ag-tab-selected-border-color: var(--ag-inherited-tab-selected-border-color, var(--ag-border-color));
	--ag-tab-selected-border-width: var(--ag-inherited-tab-selected-border-width, var(--ag-border-width));
	--ag-tab-selected-text-color: var(--ag-inherited-tab-selected-text-color, var(--ag-text-color));
	--ag-tab-selected-underline-color: var(--ag-inherited-tab-selected-underline-color, transparent);
	--ag-tab-selected-underline-transition-duration: var(--ag-inherited-tab-selected-underline-transition-duration, 0s);
	--ag-tab-selected-underline-width: var(--ag-inherited-tab-selected-underline-width, 0px);
	--ag-tab-spacing: var(--ag-inherited-tab-spacing, 0);
	--ag-tab-text-color: var(--ag-inherited-tab-text-color, color-mix(in srgb, transparent, var(--ag-text-color) 70%));
	--ag-tab-top-padding: var(--ag-inherited-tab-top-padding, var(--ag-spacing));
	--ag-text-color: var(--ag-inherited-text-color, var(--ag-foreground-color));
	--ag-toggle-button-height: var(--ag-inherited-toggle-button-height, 18px);
	--ag-toggle-button-off-background-color: var(--ag-inherited-toggle-button-off-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 30%));
	--ag-toggle-button-on-background-color: var(--ag-inherited-toggle-button-on-background-color, var(--ag-accent-color));
	--ag-toggle-button-switch-background-color: var(--ag-inherited-toggle-button-switch-background-color, var(--ag-background-color));
	--ag-toggle-button-switch-inset: var(--ag-inherited-toggle-button-switch-inset, 2px);
	--ag-toggle-button-width: var(--ag-inherited-toggle-button-width, 28px);
	--ag-tool-panel-separator-border: var(--ag-inherited-tool-panel-separator-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-toolbar-background-color: var(--ag-inherited-toolbar-background-color, var(--ag-header-background-color));
	--ag-toolbar-separator-border: var(--ag-inherited-toolbar-separator-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-toolbar-text-color: var(--ag-inherited-toolbar-text-color, var(--ag-header-text-color));
	--ag-tooltip-background-color: var(--ag-inherited-tooltip-background-color, var(--ag-chrome-background-color));
	--ag-tooltip-border: var(--ag-inherited-tooltip-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-tooltip-error-background-color: var(--ag-inherited-tooltip-error-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 10%));
	--ag-tooltip-error-border: var(--ag-inherited-tooltip-error-border, solid var(--ag-border-width) color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 25%));
	--ag-tooltip-error-text-color: var(--ag-inherited-tooltip-error-text-color, var(--ag-invalid-color));
	--ag-tooltip-text-color: var(--ag-inherited-tooltip-text-color, var(--ag-text-color));
	--ag-value-change-delta-down-color: var(--ag-inherited-value-change-delta-down-color, #e53935);
	--ag-value-change-delta-up-color: var(--ag-inherited-value-change-delta-up-color, #43a047);
	--ag-value-change-value-highlight-background-color: var(--ag-inherited-value-change-value-highlight-background-color, #16a08580);
	--ag-widget-container-horizontal-padding: var(--ag-inherited-widget-container-horizontal-padding, calc( var(--ag-spacing)   *  1.5));
	--ag-widget-container-vertical-padding: var(--ag-inherited-widget-container-vertical-padding, calc( var(--ag-spacing)   *  1.5));
	--ag-widget-horizontal-spacing: var(--ag-inherited-widget-horizontal-spacing, calc( var(--ag-spacing)   *  1.5));
	--ag-widget-vertical-spacing: var(--ag-inherited-widget-vertical-spacing, var(--ag-spacing));
	--ag-wrapper-background-color: var(--ag-inherited-wrapper-background-color, var(--ag-background-color));
	--ag-wrapper-border: var(--ag-inherited-wrapper-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-wrapper-border-radius: var(--ag-inherited-wrapper-border-radius, 0px);
:where([data-ag-theme-mode="light"]) & {
	--ag-browser-color-scheme: var(--ag-inherited-browser-color-scheme, light);
	--ag-chrome-background-color: var(--ag-inherited-chrome-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 2%));
}
:where(.ag-theme-tabStyle-6) {
.ag-tabs-header{background-color:var(--ag-tab-bar-background-color);border-bottom:var(--ag-tab-bar-border);display:flex;flex:1;gap:var(--ag-tab-spacing);padding:var(--ag-tab-bar-top-padding) var(--ag-tab-bar-horizontal-padding) 0}
:where(.ag-ltr) .ag-tabs-close-button-wrapper{border-right:solid var(--ag-border-width) var(--ag-border-color)}
:where(.ag-ltr) .ag-tab.ag-tab-selected:where(:not(:first-of-type)){border-left-color:var(--ag-tab-selected-border-color)}
:where(.ag-ltr) .ag-tab.ag-tab-selected:where(:not(:last-of-type)){border-right-color:var(--ag-tab-selected-border-color)}
.ag-pinned-left-header,.ag-pinned-right-header{display:inline-block;height:100%;overflow:hidden;position:relative}
.ag-pinned-left-header{border-right:var(--ag-pinned-column-border)}
.ag-pinned-right-header{border-left:var(--ag-pinned-column-border)}
.ag-pinned-left-floating-bottom,.ag-pinned-left-floating-top,.ag-pinned-right-floating-bottom,.ag-pinned-right-floating-top{min-width:0;overflow:hidden;position:relative}
.ag-pinned-left-sticky-top,.ag-pinned-right-sticky-top{height:100%;overflow:hidden;position:relative}
.ag-sticky-bottom-full-width-container,.ag-sticky-top-full-width-container{height:100%;overflow:hidden;width:100%}
.ag-body-horizontal-scroll:not(.ag-scrollbar-invisible){.ag-horizontal-left-spacer:not(.ag-scroller-corner){border-right:var(--ag-pinned-column-border)}
.ag-horizontal-right-spacer:not(.ag-scroller-corner){border-left:var(--ag-pinned-column-border)}
.ag-overlay{inset:0;pointer-events:none;position:absolute;z-index:2}
.typography-label-md{font-family:var(--typography-label-md-font-family);font-size:var(--typography-label-md-font-size);font-weight:var(--typography-label-md-font-weight);line-height:var(--typography-label-md-line-height);letter-spacing:var(--typography-label-md-letter-spacing)}
.typography-microcopy-xs{font-family:var(--typography-microcopy-xs-font-family);font-size:var(--typography-microcopy-xs-font-size);font-weight:var(--typography-microcopy-xs-font-weight);line-height:var(--typography-microcopy-xs-line-height);letter-spacing:var(--typography-microcopy-xs-letter-spacing)}
.typography-microcopy-md{font-family:var(--typography-microcopy-md-font-family);font-size:var(--typography-microcopy-md-font-size);font-weight:var(--typography-microcopy-md-font-weight);line-height:var(--typography-microcopy-md-line-height);letter-spacing:var(--typography-microcopy-md-letter-spacing)}
.typography-body-md{font-family:var(--typography-body-md-font-family);font-size:var(--typography-body-md-font-size);font-weight:var(--typography-body-md-font-weight);line-height:var(--typography-body-md-line-height);letter-spacing:var(--typography-body-md-letter-spacing)}
.typography-heading-lg{font-family:var(--typography-heading-lg-font-family);font-size:var(--typography-heading-lg-font-size);font-weight:var(--typography-heading-lg-font-weight);line-height:var(--typography-heading-lg-line-height);letter-spacing:var(--typography-heading-lg-letter-spacing)}
.typography-heading-md{font-family:var(--typography-heading-md-font-family);font-size:var(--typography-heading-md-font-size);font-weight:var(--typography-heading-md-font-weight);line-height:var(--typography-heading-md-line-height);letter-spacing:var(--typography-heading-md-letter-spacing)}
.typography-meta{font-family:var(--typography-meta-font-family);font-size:var(--typography-meta-font-size);font-weight:var(--typography-meta-font-weight);line-height:var(--typography-meta-line-height);letter-spacing:var(--typography-meta-letter-spacing)}
.typography-body-sm{font-family:var(--typography-body-sm-font-family);font-size:var(--typography-body-sm-font-size);font-weight:var(--typography-body-sm-font-weight);line-height:var(--typography-body-sm-line-height);letter-spacing:var(--typography-body-sm-letter-spacing)}
.typography-label-sm-strong{font-family:var(--typography-label-sm-strong-font-family);font-size:var(--typography-label-sm-strong-font-size);font-weight:var(--typography-label-sm-strong-font-weight);line-height:var(--typography-label-sm-strong-line-height);letter-spacing:var(--typography-label-sm-strong-letter-spacing)}
.typography-microcopy-sm{font-family:var(--typography-microcopy-sm-font-family);font-size:var(--typography-microcopy-sm-font-size);font-weight:var(--typography-microcopy-sm-font-weight);line-height:var(--typography-microcopy-sm-line-height);letter-spacing:var(--typography-microcopy-sm-letter-spacing)}
.stack{--gap: var(--spacing-400, 1rem);display:flex;flex-direction:column;gap:var(--gap)}
.repel{--gap: var(--spacing-400, 1rem);--align: center;display:flex;flex-wrap:wrap;gap:var(--gap);align-items:var(--align);justify-content:space-between}
.cluster{--gap: var(--spacing-300, .75rem);--align: center;--justify: flex-start;display:flex;flex-wrap:wrap;gap:var(--gap);align-items:var(--align);justify-content:var(--justify)}
.grid{--gap: var(--spacing-400, 1rem);--grid-min: 16rem;display:grid;gap:var(--gap);grid-template-columns:repeat(auto-fit,minmax(min(var(--grid-min),100%),1fr))}
.esa-pill{--_pill-bg: var(--color-background-elevation-sunken, #f0f0f0);--_pill-text: var(--color-content-default, #202020);--_pill-border: var(--color-border-default-subtle, #d9d9d9);--_pill-padding-y: var(--spacing-150, .375rem);--_pill-padding-x: var(--spacing-200, .5rem);--_pill-gap: var(--spacing-100, .25rem);display:inline-flex;align-items:center;gap:var(--_pill-gap);padding-block:var(--_pill-padding-y);padding-inline:var(--_pill-padding-x);border:var(--border-width-default, 1px) solid var(--_pill-border);border-radius:var(--radius-chip, var(--radius-sm, .25rem));background:var(--_pill-bg);color:var(--_pill-text);white-space:nowrap;box-sizing:border-box}
.esa-pill--info{--_pill-bg: var(--color-background-utility-info-subtle, var(--color-blue-2));--_pill-text: var(--color-content-utility-info, #0d74ce);--_pill-border: var(--color-border-utility-info, var(--color-blue-6))}
.esa-pill--warning{--_pill-bg: var(--color-background-utility-warning-subtle, var(--color-yellow-2));--_pill-text: var(--color-content-utility-warning, #ab6400);--_pill-border: var(--color-border-utility-warning, var(--color-yellow-6))}
.esa-pill--success{--_pill-bg: var(--color-background-utility-success-subtle, var(--color-green-2));--_pill-text: var(--color-content-utility-success, #218358);--_pill-border: var(--color-border-utility-success, var(--color-green-6))}
.esa-pill--danger{--_pill-bg: var(--color-background-utility-danger-subtle, var(--color-red-2));--_pill-text: var(--color-content-utility-danger, #ce2c31);--_pill-border: var(--color-border-utility-danger, var(--color-red-6))}
.ag-aria-description-container{border:0;clip-path:inset(50%);height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px;z-index:9999}
:where(.ag-ltr){direction:ltr;.ag-body,.ag-body-horizontal-scroll,.ag-body-viewport,.ag-floating-bottom,.ag-floating-top,.ag-header,.ag-sticky-bottom,.ag-sticky-top{flex-direction:row}
.ag-layout-auto-height,.ag-layout-print{.ag-center-cols-viewport{min-height:150px}
.ag-root-wrapper{border:var(--ag-wrapper-border);border-radius:var(--ag-wrapper-border-radius);container-type:inline-size;display:flex;flex-direction:column;overflow:hidden;position:relative;&.ag-layout-normal{content-visibility:auto;height:100%}
.ag-root-wrapper-body{display:flex;flex-direction:row;&.ag-layout-normal{flex:1 1 auto;height:0;min-height:0}
.ag-unselectable{-webkit-user-select:none;-moz-user-select:none;user-select:none}
.ag-root{display:flex;flex-direction:column;position:relative;&.ag-layout-auto-height,&.ag-layout-normal{flex:1 1 auto;overflow:hidden;width:0}
&.ag-layout-auto-height,&.ag-layout-normal{flex:1 1 auto;overflow:hidden;width:0}
.ag-body,.ag-body-horizontal-scroll,.ag-body-viewport,.ag-floating-bottom,.ag-floating-top,.ag-header,.ag-sticky-bottom,.ag-sticky-top{flex-direction:row}
.ag-header{background-color:var(--ag-header-background-color);border-bottom:var(--ag-header-row-border);color:var(--ag-header-text-color);display:flex;font-family:var(--ag-header-font-family);font-size:var(--ag-header-font-size);font-weight:var(--ag-header-font-weight);overflow:hidden;white-space:nowrap;width:100%}
.ag-body-horizontal-scroll-viewport,.ag-body-vertical-scroll-viewport,.ag-body-viewport,.ag-center-cols-viewport,.ag-floating-bottom-viewport,.ag-floating-top-viewport,.ag-header-viewport,.ag-sticky-bottom-viewport,.ag-sticky-top-viewport{flex:1 1 auto;height:100%;min-width:0;overflow:hidden;position:relative}
.ag-body-viewport,.ag-center-cols-viewport,.ag-floating-bottom-viewport,.ag-floating-top-viewport,.ag-header-viewport,.ag-sticky-bottom-viewport,.ag-sticky-top-viewport{overflow-x:auto;-ms-overflow-style:none!important;scrollbar-width:none!important}
.ag-body-container,.ag-body-horizontal-scroll-container,.ag-body-vertical-scroll-container,.ag-center-cols-container,.ag-floating-bottom-container,.ag-floating-bottom-full-width-container,.ag-floating-top-container,.ag-full-width-container,.ag-header-container,.ag-pinned-left-cols-container,.ag-pinned-left-sticky-bottom,.ag-pinned-right-cols-container,.ag-pinned-right-sticky-bottom,.ag-sticky-bottom-container,.ag-sticky-top-container{position:relative}
.ag-floating-bottom-container,.ag-floating-top-container,.ag-header-container,.ag-pinned-left-floating-bottom,.ag-pinned-left-floating-top,.ag-pinned-right-floating-bottom,.ag-pinned-right-floating-top,.ag-sticky-bottom-container,.ag-sticky-top-container{height:100%;white-space:nowrap}
.ag-floating-top{display:flex;overflow:hidden;position:relative;white-space:nowrap;width:100%}
.ag-body,.ag-floating-bottom,.ag-floating-top{background-color:var(--ag-data-background-color)}
.ag-viewport{position:relative}
.ag-floating-bottom-container,.ag-floating-top-container,.ag-sticky-bottom-container,.ag-sticky-top-container{min-height:1px}
.ag-floating-bottom-full-width-container,.ag-floating-top-full-width-container,.ag-full-width-container,.ag-sticky-bottom-full-width-container,.ag-sticky-top-full-width-container{pointer-events:none;position:absolute;top:0}
:where(.ag-ltr) .ag-floating-bottom-full-width-container,:where(.ag-ltr) .ag-floating-top-full-width-container,:where(.ag-ltr) .ag-full-width-container,:where(.ag-ltr) .ag-sticky-bottom-full-width-container,:where(.ag-ltr) .ag-sticky-top-full-width-container{left:0}
.ag-floating-bottom-full-width-container,.ag-floating-top-full-width-container{display:inline-block;height:100%;overflow:hidden;width:100%}
.ag-body{display:flex;flex:1 1 auto;flex-direction:row!important;min-height:0;position:relative}
.ag-body-viewport{display:flex;overflow-x:hidden;&:where(.ag-layout-normal){overflow-y:auto;-webkit-overflow-scrolling:touch}
.ag-center-cols-viewport{min-height:100%;width:100%}
.ag-center-cols-viewport{min-height:150px}
.ag-center-cols-container,.ag-pinned-right-cols-container{display:block}
.ag-full-width-container{width:100%}
.ag-body-horizontal-scroll,.ag-body-vertical-scroll{display:flex;min-height:0;min-width:0;position:relative;&:where(.ag-scrollbar-invisible){bottom:0;position:absolute;&:where(.ag-apple-scrollbar){opacity:0;transition:opacity .4s;visibility:hidden;&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
.ag-body-vertical-scroll{height:100%;&:where(.ag-scrollbar-invisible){top:0;z-index:10}
:where(.ag-ltr) .ag-body-vertical-scroll{&:where(.ag-scrollbar-invisible){right:0}
.ag-body-vertical-scroll-viewport{overflow-y:scroll}
.ag-body-vertical-scroll-container{width:100%}
.ag-sticky-bottom,.ag-sticky-top{background-color:var(--ag-data-background-color);display:flex;height:0;overflow:hidden;position:absolute;width:100%;z-index:1}
.ag-sticky-bottom{box-sizing:content-box!important;:where(.ag-pinned-left-sticky-bottom),:where(.ag-pinned-right-sticky-bottom),:where(.ag-sticky-bottom-container){border-top:var(--ag-row-border);box-sizing:border-box}
:where(.ag-pinned-left-sticky-bottom),:where(.ag-pinned-right-sticky-bottom),:where(.ag-sticky-bottom-container){border-top:var(--ag-row-border);box-sizing:border-box}
.ag-floating-bottom{display:flex;overflow:hidden;position:relative;white-space:nowrap;width:100%}
.ag-body-horizontal-scroll{width:100%;&:where(.ag-scrollbar-invisible){left:0;right:0}
.ag-horizontal-left-spacer,.ag-horizontal-right-spacer{height:100%;min-width:0;overflow-x:scroll;&:where(.ag-scroller-corner){overflow-x:hidden}
&:where(.ag-scroller-corner){overflow-x:hidden}
.ag-body-horizontal-scroll-viewport{overflow-x:scroll}
.ag-body-horizontal-scroll-container{height:100%}
.ag-header-row{height:var(--ag-header-height);position:absolute}
.ag-header-row:where(:not(.ag-header-row-column-group)){overflow:hidden}
:where(.ag-header.ag-header-allow-overflow) .ag-header-row{overflow:visible}
:where(.ag-header-cell:not(.ag-right-aligned-header)){.ag-header-col-ref{color:var(--ag-subtle-text-color)}
:where(.ag-ltr) :where(.ag-header-cell:not(.ag-right-aligned-header)){.ag-header-col-ref{margin-right:var(--ag-spacing)}
.ag-header-label-icon,.ag-header-menu-icon{margin-left:var(--ag-spacing)}
.ag-header-cell{display:inline-flex;overflow:hidden}
.ag-header-cell,.ag-header-group-cell{align-items:center;gap:var(--ag-cell-widget-spacing);height:100%;padding:0 var(--ag-cell-horizontal-padding);position:absolute}
.ag-header-cell:where(:not(.ag-floating-filter)):before,.ag-header-group-cell:before{background-image:linear-gradient(var(--ag-internal-hover-color),var(--ag-internal-hover-color)),linear-gradient(var(--ag-internal-moving-color),var(--ag-internal-moving-color));content:"";inset:0;position:absolute;--ag-internal-moving-color:transparent;--ag-internal-hover-color:transparent;transition:--ag-internal-moving-color var(--ag-header-cell-background-transition-duration),--ag-internal-hover-color var(--ag-header-cell-background-transition-duration)}
:where(.ag-header-cell:not(.ag-floating-filter)>*,.ag-header-group-cell>*){position:relative;z-index:1}
.ag-header-cell-resize{align-items:center;cursor:ew-resize;display:flex;height:100%;position:absolute;top:0;width:8px;z-index:2}
:where(.ag-ltr) .ag-header-cell-resize{right:-3px}
.ag-header-cell-resize:after{background-color:var(--ag-header-column-resize-handle-color);content:"";height:var(--ag-header-column-resize-handle-height);position:absolute;top:calc(50% - var(--ag-header-column-resize-handle-height)*.5);width:var(--ag-header-column-resize-handle-width);z-index:1}
:where(.ag-ltr) .ag-header-cell-resize:after{left:calc(50% - var(--ag-header-column-resize-handle-width))}
.ag-header-cell-comp-wrapper{width:100%}
:where(.ag-header-cell:not(.ag-header-cell-auto-height)) .ag-header-cell-comp-wrapper{align-items:center;display:flex;height:100%}
.ag-cell-label-container{align-items:center;display:flex;flex-direction:row-reverse;height:100%;justify-content:space-between;width:100%}
.ag-floating-filter-button-button,.ag-header-cell-filter-button,.ag-header-cell-menu-button,.ag-header-expand-icon,.ag-panel-title-bar-button,:where(.ag-header-cell-sortable) .ag-header-cell-label,:where(.ag-header-group-cell-selectable) .ag-header-cell-comp-wrapper{cursor:pointer}
.ag-header-cell-label,.ag-header-group-cell-label{align-items:center;align-self:stretch;display:flex;flex:1 1 auto;overflow:hidden;padding:5px 0}
.ag-header-cell-label{text-overflow:ellipsis}
.ag-header-cell-text,.ag-header-group-text{overflow:hidden;text-overflow:ellipsis}
.ag-header-cell-text{overflow-wrap:break-word}
.ag-header-label-icon,.ag-header-menu-icon{margin-left:var(--ag-spacing)}
.ag-sort-indicator-container{display:flex;gap:var(--ag-spacing)}
:where(.ag-ltr) .ag-sort-indicator-icon{padding-left:var(--ag-spacing)}
.ag-header-cell:after,.ag-header-group-cell:where(:not(.ag-header-span-height.ag-header-group-cell-no-group)):after{content:"";height:var(--ag-header-column-border-height);position:absolute;top:calc(50% - var(--ag-header-column-border-height)*.5);z-index:1}
:where(.ag-ltr) .ag-header-cell:after,:where(.ag-ltr) .ag-header-group-cell:where(:not(.ag-header-span-height.ag-header-group-cell-no-group)):after{border-right:var(--ag-header-column-border);right:0}
:where(.ag-ltr) :where(.ag-body-horizontal-content-no-gap) .ag-column-last{border-right-color:transparent}
:where(.ag-row-no-animation) .ag-row{transition:none}
.ag-row-position-absolute{position:absolute}
.ag-row,.ag-spanned-row{color:var(--ag-cell-text-color);font-family:var(--ag-cell-font-family);font-size:var(--ag-cell-font-size);font-weight:var(--ag-cell-font-weight);white-space:nowrap;--ag-internal-content-line-height:calc(min(var(--ag-row-height), var(--ag-line-height, 1000px)) - var(--ag-internal-row-border-width, 1px) - 2px)}
.ag-row{background-color:var(--ag-data-background-color);border-bottom:var(--ag-row-border);height:var(--ag-row-height);width:100%;&.ag-row-editing-invalid{background-color:var(--ag-full-row-edit-invalid-background-color)}
.ag-cell{display:inline-block;height:100%;position:absolute;white-space:nowrap;&:focus-visible{box-shadow:none}
.ag-cell-value{flex:1 1 auto}
.ag-cell,.ag-full-width-row .ag-cell-wrapper.ag-row-group{border:1px solid transparent;line-height:var(--ag-internal-content-line-height);-webkit-font-smoothing:subpixel-antialiased}
:where(.ag-ltr) .ag-cell{border-right:var(--ag-column-border)}
.ag-cell-value:not(.ag-allow-overflow),.ag-group-value{overflow:hidden;text-overflow:ellipsis}
:where(.ag-ltr) .ag-cell:not(.ag-cell-inline-editing),:where(.ag-ltr) .ag-full-width-row .ag-cell-wrapper.ag-row-group{padding-left:calc(var(--ag-cell-horizontal-padding) - 1px + var(--ag-row-group-indent-size)*var(--ag-indentation-level));padding-right:calc(var(--ag-cell-horizontal-padding) - 1px)}
.ag-row-odd{background-color:var(--ag-odd-row-background-color)}
&:where(.ag-scrollbar-invisible){bottom:0;position:absolute;&:where(.ag-apple-scrollbar){opacity:0;transition:opacity .4s;visibility:hidden;&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
&:where(.ag-apple-scrollbar){opacity:0;transition:opacity .4s;visibility:hidden;&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
&:where(.ag-scrollbar-invisible){top:0;z-index:10}
&:where(.ag-scrollbar-invisible){right:0}
:where(.ag-body-vertical-content-no-gap>div>div>div,.ag-body-vertical-content-no-gap>div>div>div>div)>.ag-row-last{border-bottom-color:transparent}
&:where(.ag-scrollbar-invisible){left:0;right:0}
.ag-cell,.ag-header-cell,.ag-header-group-cell,.ag-row,.ag-spanned-cell-wrapper{visibility:hidden}
:where(.ag-theme-iconSet-5) {
.ag-icon-aggregation::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M18%207V4H6l6%208-6%208h12v-3%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-arrows::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpolyline%20points%3D%225%209%202%2012%205%2015%22%2F%3E%3Cpolyline%20points%3D%229%205%2012%202%2015%205%22%2F%3E%3Cpolyline%20points%3D%2215%2019%2012%2022%209%2019%22%2F%3E%3Cpolyline%20points%3D%2219%209%2022%2012%2019%2015%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%2222%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%222%22%20y2%3D%2222%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-asc::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%2F%3E%3Cpath%20d%3D%22M12%2019V5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-cancel::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m18%206-12%2012%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chart::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%2218%22%20x2%3D%2218%22%20y1%3D%2220%22%20y2%3D%2210%22%2F%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2220%22%20y2%3D%224%22%2F%3E%3Cline%20x1%3D%226%22%20x2%3D%226%22%20y1%3D%2220%22%20y2%3D%2214%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-color-picker::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m19%2011-8-8-8.6%208.6a2%202%200%200%200%200%202.8l5.2%205.2c.8.8%202%20.8%202.8%200L19%2011Z%22%2F%3E%3Cpath%20d%3D%22m5%202%205%205%22%2F%3E%3Cpath%20d%3D%22M2%2013h15%22%2F%3E%3Cpath%20d%3D%22M22%2020a2%202%200%201%201-4%200c0-1.6%201.7-2.4%202-4%20.3%201.6%202%202.4%202%204Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-columns::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9%203H5a2%202%200%200%200-2%202v4m6-6h10a2%202%200%200%201%202%202v4M9%203v18m0%200h10a2%202%200%200%200%202-2V9M9%2021H5a2%202%200%200%201-2-2V9m0%200h18%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-contracted::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-copy::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%2F%3E%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-cross::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-csv::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M14.5%202H6a2%202%200%200%200-2%202v16a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V7.5L14.5%202z%22%2F%3E%3Cpolyline%20points%3D%2214%202%2014%208%2020%208%22%2F%3E%3Cpath%20d%3D%22M8%2013h2%22%2F%3E%3Cpath%20d%3D%22M8%2017h2%22%2F%3E%3Cpath%20d%3D%22M14%2013h2%22%2F%3E%3Cpath%20d%3D%22M14%2017h2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-cut::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20r%3D%223%22%2F%3E%3Cpath%20d%3D%22M8.12%208.12%2012%2012%22%2F%3E%3Cpath%20d%3D%22M20%204%208.12%2015.88%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%2F%3E%3Cpath%20d%3D%22M14.8%2014.8%2020%2020%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-desc::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M12%205v14%22%2F%3E%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-down::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M12%205v14%22%2F%3E%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-excel::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M14.5%202H6a2%202%200%200%200-2%202v16a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V7.5L14.5%202z%22%2F%3E%3Cpolyline%20points%3D%2214%202%2014%208%2020%208%22%2F%3E%3Cpath%20d%3D%22M8%2013h2%22%2F%3E%3Cpath%20d%3D%22M8%2017h2%22%2F%3E%3Cpath%20d%3D%22M14%2013h2%22%2F%3E%3Cpath%20d%3D%22M14%2017h2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-expanded::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-eye::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M2%2012s3-7%2010-7%2010%207%2010%207-3%207-10%207-10-7-10-7Z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-eye-slash::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9.88%209.88a3%203%200%201%200%204.24%204.24%22%2F%3E%3Cpath%20d%3D%22M10.73%205.08A10.43%2010.43%200%200%201%2012%205c7%200%2010%207%2010%207a13.16%2013.16%200%200%201-1.67%202.68%22%2F%3E%3Cpath%20d%3D%22M6.61%206.61A13.526%2013.526%200%200%200%202%2012s3%207%2010%207a9.74%209.74%200%200%200%205.39-1.61%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%2222%22%20y1%3D%222%22%20y2%3D%2222%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-filter::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M3%206h18%22%2F%3E%3Cpath%20d%3D%22M7%2012h10%22%2F%3E%3Cpath%20d%3D%22M10%2018h4%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-first::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m17%2018-6-6%206-6%22%2F%3E%3Cpath%20d%3D%22M7%206v12%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-grip::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%225%22%20cy%3D%228%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%228%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%228%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%225%22%20cy%3D%2216%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2216%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%220.5%22%2F%3E%3Cg%20stroke%3D%22none%22%20fill%3D%22currentColor%22%3E%3Ccircle%20cx%3D%225%22%20cy%3D%228%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%228%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%228%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%225%22%20cy%3D%2216%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2216%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'); }
.ag-icon-group::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M16%2012H3%22%2F%3E%3Cpath%20d%3D%22M16%2018H3%22%2F%3E%3Cpath%20d%3D%22M10%206H3%22%2F%3E%3Cpath%20d%3D%22M21%2018V8a2%202%200%200%200-2-2h-5%22%2F%3E%3Cpath%20d%3D%22m16%208-2-2%202-2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-last::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m7%2018%206-6-6-6%22%2F%3E%3Cpath%20d%3D%22M17%206v12%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-left::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m12%2019-7-7%207-7%22%2F%3E%3Cpath%20d%3D%22M19%2012H5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-linked::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9%2017H7A5%205%200%200%201%207%207h2%22%2F%3E%3Cpath%20d%3D%22M15%207h2a5%205%200%201%201%200%2010h-2%22%2F%3E%3Cline%20x1%3D%228%22%20x2%3D%2216%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-loading::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%222%22%20y2%3D%226%22%2F%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2218%22%20y2%3D%2222%22%2F%3E%3Cline%20x1%3D%224.93%22%20x2%3D%227.76%22%20y1%3D%224.93%22%20y2%3D%227.76%22%2F%3E%3Cline%20x1%3D%2216.24%22%20x2%3D%2219.07%22%20y1%3D%2216.24%22%20y2%3D%2219.07%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%226%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%2218%22%20x2%3D%2222%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%224.93%22%20x2%3D%227.76%22%20y1%3D%2219.07%22%20y2%3D%2216.24%22%2F%3E%3Cline%20x1%3D%2216.24%22%20x2%3D%2219.07%22%20y1%3D%227.76%22%20y2%3D%224.93%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-maximize::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpolyline%20points%3D%2215%203%2021%203%2021%209%22%2F%3E%3Cpolyline%20points%3D%229%2021%203%2021%203%2015%22%2F%3E%3Cline%20x1%3D%2221%22%20x2%3D%2214%22%20y1%3D%223%22%20y2%3D%2210%22%2F%3E%3Cline%20x1%3D%223%22%20x2%3D%2210%22%20y1%3D%2221%22%20y2%3D%2214%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-menu::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%226%22%20y2%3D%226%22%2F%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2218%22%20y2%3D%2218%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-menu-alt::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%225%22%20r%3D%220.75%22%20fill%3D%22%23D9D9D9%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%220.75%22%20fill%3D%22%23D9D9D9%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2219%22%20r%3D%220.75%22%20fill%3D%22%23D9D9D9%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-minimize::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpolyline%20points%3D%224%2014%2010%2014%2010%2020%22%2F%3E%3Cpolyline%20points%3D%2220%2010%2014%2010%2014%204%22%2F%3E%3Cline%20x1%3D%2214%22%20x2%3D%2221%22%20y1%3D%2210%22%20y2%3D%223%22%2F%3E%3Cline%20x1%3D%223%22%20x2%3D%2210%22%20y1%3D%2221%22%20y2%3D%2214%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-minus::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22M8%2012h8%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-next::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-none::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m7%2015%205%205%205-5%22%2F%3E%3Cpath%20d%3D%22m7%209%205-5%205%205%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-not-allowed::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22m4.9%204.9%2014.2%2014.2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-paste::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M15%202H9a1%201%200%200%200-1%201v2c0%20.6.4%201%201%201h6c.6%200%201-.4%201-1V3c0-.6-.4-1-1-1Z%22%2F%3E%3Cpath%20d%3D%22M8%204H6a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2M16%204h2a2%202%200%200%201%202%202v2M11%2014h10%22%2F%3E%3Cpath%20d%3D%22m17%2010%204%204-4%204%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pin::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2217%22%20y2%3D%2222%22%2F%3E%3Cpath%20d%3D%22M5%2017h14v-1.76a2%202%200%200%200-1.11-1.79l-1.78-.9A2%202%200%200%201%2015%2010.76V6h1a2%202%200%200%200%200-4H8a2%202%200%200%200%200%204h1v4.76a2%202%200%200%201-1.11%201.79l-1.78.9A2%202%200%200%200%205%2015.24Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pivot::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M15%203v18%22%2F%3E%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%2F%3E%3Cpath%20d%3D%22M21%209H3%22%2F%3E%3Cpath%20d%3D%22M21%2015H3%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-plus::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22M8%2012h8%22%2F%3E%3Cpath%20d%3D%22M12%208v8%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-previous::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-right::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M5%2012h14%22%2F%3E%3Cpath%20d%3D%22m12%205%207%207-7%207%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-save::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M12%2017V3%22%2F%3E%3Cpath%20d%3D%22m6%2011%206%206%206-6%22%2F%3E%3Cpath%20d%3D%22M19%2021H5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-search::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%228%22%2F%3E%3Cpath%20d%3D%22m21%2021-4.3-4.3%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-settings::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M20%207h-9%22%2F%3E%3Cpath%20d%3D%22M14%2017H5%22%2F%3E%3Ccircle%20cx%3D%2217%22%20cy%3D%2217%22%20r%3D%223%22%2F%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-left::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-right::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tick::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tree-closed::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tree-indeterminate::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M5%2012h14%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tree-open::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-unlinked::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9%2017H7A5%205%200%200%201%207%207%22%2F%3E%3Cpath%20d%3D%22M15%207h2a5%205%200%200%201%204%208%22%2F%3E%3Cline%20x1%3D%228%22%20x2%3D%2212%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%2222%22%20y1%3D%222%22%20y2%3D%2222%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-up::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%2F%3E%3Cpath%20d%3D%22M12%2019V5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-aasc::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M13.2012%208.07928C13.6346%208.0793%2014.0128%208.15365%2014.3359%208.30193C14.6609%208.45018%2014.9141%208.65595%2015.0947%208.9201C15.2754%209.18439%2015.3683%209.49109%2015.374%209.83904H14.1904C14.1676%209.60898%2014.0695%209.4303%2013.8965%209.30291C13.7235%209.1756%2013.4889%209.1115%2013.1924%209.1115C12.9909%209.1115%2012.8204%209.1404%2012.6816%209.19744C12.543%209.25255%2012.4364%209.32917%2012.3623%209.42791C12.2901%209.52678%2012.2539%209.63933%2012.2539%209.76482C12.2501%209.8692%2012.272%209.9604%2012.3193%2010.0383C12.3688%2010.1162%2012.4369%2010.1843%2012.5225%2010.2414C12.6079%2010.2964%2012.7064%2010.3451%2012.8184%2010.3869C12.9304%2010.4268%2013.0505%2010.4609%2013.1777%2010.4894L13.7031%2010.6144C13.9578%2010.6715%2014.1914%2010.7479%2014.4043%2010.8429C14.6173%2010.938%2014.8021%2011.0547%2014.958%2011.1935C15.1138%2011.3323%2015.2348%2011.4957%2015.3203%2011.6838C15.4077%2011.8719%2015.4522%2012.088%2015.4541%2012.3312C15.4522%2012.6885%2015.3611%2012.9986%2015.1807%2013.2609C15.0019%2013.5214%2014.7427%2013.7248%2014.4043%2013.8693C14.0678%2014.0118%2013.6617%2014.0832%2013.1865%2014.0832C12.7153%2014.0832%2012.3048%2014.0107%2011.9551%2013.8664C11.6071%2013.7219%2011.3345%2013.5071%2011.1387%2013.2238C10.9449%2012.9387%2010.8435%2012.5862%2010.834%2012.1662H12.0283C12.0416%2012.362%2012.0984%2012.5252%2012.1973%2012.6564C12.298%2012.7857%2012.4323%2012.8838%2012.5996%2012.9504C12.7688%2013.0149%2012.96%2013.047%2013.1729%2013.047C13.3817%2013.047%2013.563%2013.0169%2013.7168%2012.9562C13.8727%2012.8954%2013.9935%2012.8106%2014.0791%2012.7023C14.1647%2012.5939%2014.208%2012.469%2014.208%2012.3283C14.2079%2012.1974%2014.1686%2012.0875%2014.0908%2011.9982C14.0148%2011.9089%2013.9022%2011.8324%2013.7539%2011.7697C13.6076%2011.707%2013.4276%2011.6501%2013.2148%2011.5988L12.5791%2011.4387C12.0869%2011.3189%2011.6982%2011.1318%2011.4131%2010.8771C11.128%2010.6224%2010.9855%2010.2793%2010.9873%209.84783C10.9854%209.49418%2011.0804%209.18439%2011.2705%208.9201C11.4625%208.65603%2011.7261%208.45015%2012.0605%208.30193C12.3951%208.15369%2012.7754%208.07928%2013.2012%208.07928Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.8125%2014.0002H4.48926L4.05664%2012.6681H1.94824L1.51465%2014.0002H0.19043L2.20703%208.15935H3.79883L5.8125%2014.0002ZM2.26172%2011.7043H3.74316L3.02539%209.49334H2.98047L2.26172%2011.7043Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.45215%208.15935C8.88165%208.15935%209.24031%208.22251%209.52734%208.34978C9.81445%208.47717%2010.0303%208.65477%2010.1748%208.88103C10.3192%209.10536%2010.3916%209.36368%2010.3916%209.65642C10.3916%209.88452%2010.3461%2010.085%2010.2549%2010.258C10.1637%2010.4289%2010.0384%2010.5696%209.87891%2010.6799C9.72117%2010.7882%209.54024%2010.8657%209.33691%2010.9113V10.9679C9.55917%2010.9775%209.76716%2011.0406%209.96094%2011.1564C10.1568%2011.2724%2010.3158%2011.4356%2010.4375%2011.6447C10.5591%2011.8519%2010.6201%2012.099%2010.6201%2012.3859C10.6201%2012.6958%2010.5427%2012.9727%2010.3887%2013.216C10.2366%2013.4573%2010.0113%2013.6486%209.71289%2013.7892C9.41443%2013.9299%209.04655%2014.0002%208.60938%2014.0002H6.11426V8.15935H8.45215ZM7.34863%2012.9904H8.35547C8.69943%2012.9904%208.95057%2012.9252%209.1084%2012.7941C9.26621%2012.661%209.34473%2012.4834%209.34473%2012.2629C9.34468%2012.1014%209.30643%2011.9587%209.22852%2011.8351C9.15056%2011.7116%209.03903%2011.6145%208.89453%2011.5441C8.75195%2011.4738%208.58148%2011.4387%208.38379%2011.4387H7.34863V12.9904ZM7.34863%2010.6037H8.26465C8.43369%2010.6036%208.58376%2010.5737%208.71484%2010.5148C8.84793%2010.454%208.95227%2010.3683%209.02832%2010.258C9.10628%2010.1477%209.14551%2010.0155%209.14551%209.8615C9.14546%209.65055%209.07008%209.48001%208.91992%209.35076C8.77165%209.22169%208.56064%209.15741%208.28711%209.1574H7.34863V10.6037Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M7.16602%200.377127C7.44584%200.189493%207.82551%200.20905%208.08496%200.442557L11.418%203.44256C11.7257%203.71966%2011.7507%204.19428%2011.4736%204.50213C11.1966%204.80961%2010.7228%204.83441%2010.415%204.55779L7.60938%202.03338L5.11328%204.53045C4.82042%204.82326%204.34562%204.82322%204.05273%204.53045C3.75986%204.23757%203.75989%203.7628%204.05273%203.4699L7.05273%200.4699L7.16602%200.377127Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-adesc::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10.3867%2011.4697C10.6796%2011.1771%2011.1544%2011.1769%2011.4473%2011.4697C11.7399%2011.7626%2011.7399%2012.2374%2011.4473%2012.5303L8.44727%2015.5303L8.33398%2015.623C8.05425%2015.8106%207.67449%2015.7909%207.41504%2015.5576L4.08203%2012.5576C3.77415%2012.2805%203.74927%2011.8059%204.02637%2011.498C4.30342%2011.1907%204.77722%2011.1657%205.08496%2011.4424L7.89062%2013.9668L10.3867%2011.4697Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M13.2012%203.0791C13.6346%203.07912%2014.0128%203.1535%2014.3359%203.30176C14.6611%203.45006%2014.9141%203.65661%2015.0947%203.9209C15.2752%204.18513%2015.3683%204.49104%2015.374%204.83887H14.1904C14.1676%204.60882%2014.0695%204.43012%2013.8965%204.30273C13.7235%204.17546%2013.4889%204.11133%2013.1924%204.11133C12.9909%204.11133%2012.8204%204.14023%2012.6816%204.19727C12.5431%204.25236%2012.4364%204.32902%2012.3623%204.42773C12.2901%204.52659%2012.2539%204.63919%2012.2539%204.76465C12.2501%204.86901%2012.272%204.96023%2012.3193%205.03809C12.3688%205.11604%2012.4369%205.18417%2012.5225%205.24121C12.6079%205.29623%2012.7064%205.34496%2012.8184%205.38672C12.9304%205.42661%2013.0505%205.46075%2013.1777%205.48926L13.7031%205.61426C13.9578%205.67128%2014.1914%205.74776%2014.4043%205.84277C14.6172%205.93784%2014.8021%206.05457%2014.958%206.19336C15.1139%206.33216%2015.2348%206.49633%2015.3203%206.68457C15.4076%206.8727%2015.4522%207.08885%2015.4541%207.33203C15.4521%207.68929%2015.3612%207.99944%2015.1807%208.26172C15.0019%208.52216%2014.7427%208.72465%2014.4043%208.86914C14.0678%209.01165%2013.6617%209.08301%2013.1865%209.08301C12.7153%209.08299%2012.3048%209.01057%2011.9551%208.86621C11.6072%208.72173%2011.3345%208.50786%2011.1387%208.22461C10.9447%207.9394%2010.8435%207.58622%2010.834%207.16602H12.0283C12.0416%207.36176%2012.0985%207.52509%2012.1973%207.65625C12.298%207.78554%2012.4323%207.88365%2012.5996%207.9502C12.7688%208.01477%2012.96%208.04785%2013.1729%208.04785C13.3817%208.04781%2013.5629%208.01678%2013.7168%207.95605C13.8727%207.89522%2013.9935%207.81051%2014.0791%207.70215C14.1646%207.59387%2014.2079%207.46965%2014.208%207.3291C14.208%207.19796%2014.1687%207.08739%2014.0908%206.99805C14.0148%206.90868%2013.9022%206.83228%2013.7539%206.76953C13.6076%206.70685%2013.4276%206.64993%2013.2148%206.59863L12.5791%206.43848C12.0868%206.31871%2011.6982%206.13163%2011.4131%205.87695C11.1279%205.62221%2010.9855%205.27916%2010.9873%204.84766C10.9854%204.49404%2011.0804%204.18517%2011.2705%203.9209C11.4625%203.65661%2011.7259%203.45006%2012.0605%203.30176C12.3951%203.15353%2012.7754%203.0791%2013.2012%203.0791Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.8125%209H4.48926L4.05664%207.66797H1.94824L1.51465%209H0.19043L2.20703%203.15918H3.79883L5.8125%209ZM2.26172%206.7041H3.74316L3.02539%204.49414H2.98047L2.26172%206.7041Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.45215%203.15918C8.88181%203.15918%209.24025%203.22322%209.52734%203.35059C9.81445%203.47798%2010.0303%203.6546%2010.1748%203.88086C10.3193%204.10518%2010.3916%204.36351%2010.3916%204.65625C10.3916%204.88432%2010.3461%205.08484%2010.2549%205.25781C10.1636%205.4289%2010.0386%205.57039%209.87891%205.68066C9.72118%205.78898%209.54022%205.86549%209.33691%205.91113V5.96875C9.55913%205.9783%209.76719%206.04044%209.96094%206.15625C10.1568%206.27223%2010.3158%206.43538%2010.4375%206.64453C10.5591%206.85173%2010.6201%207.09875%2010.6201%207.38574C10.6201%207.69567%2010.5427%207.97245%2010.3887%208.21582C10.2366%208.45719%2010.0113%208.64841%209.71289%208.78906C9.41442%208.9297%209.04658%208.99999%208.60938%209H6.11426V3.15918H8.45215ZM7.34863%207.99023H8.35547C8.69948%207.99023%208.95057%207.92504%209.1084%207.79395C9.26621%207.66085%209.34473%207.48325%209.34473%207.2627C9.34466%207.10125%209.3064%206.95844%209.22852%206.83496C9.15056%206.71143%209.03899%206.61427%208.89453%206.54395C8.75196%206.47365%208.58145%206.43848%208.38379%206.43848H7.34863V7.99023ZM7.34863%205.60352H8.26465C8.43369%205.60347%208.58376%205.57354%208.71484%205.51465C8.84791%205.45381%208.95228%205.36807%209.02832%205.25781C9.10623%205.14755%209.14551%205.01529%209.14551%204.86133C9.14542%204.65046%209.07002%204.48078%208.91992%204.35156C8.77163%204.22228%208.56087%204.15724%208.28711%204.15723H7.34863V5.60352Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-down::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%206L8%2010L4%206%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-left::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2012L6%208L10%204%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-right::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%2012L10%208L6%204%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-up::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M4%2010L8%206L12%2010%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-column-arrow::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%2026C0%2028.2092%201.79086%2030%204%2030H14C16.2091%2030%2018%2028.2092%2018%2026V15H25.8786L24.4394%2016.4393C23.8536%2017.0251%2023.8536%2017.9749%2024.4394%2018.5607C25.0252%2019.1464%2025.9748%2019.1464%2026.5606%2018.5607L30.5606%2014.5607C31.1464%2013.9749%2031.1464%2013.0251%2030.5606%2012.4393L26.5606%208.43934C25.9748%207.85356%2025.0252%207.85356%2024.4394%208.43934C23.8536%209.02512%2023.8536%209.97488%2024.4394%2010.5607L25.8786%2012H18V6C18%203.79086%2016.2091%202%2014%202H4C1.79086%202%200%203.79086%200%206V26ZM14%205H10.5V12H15V6C15%205.44772%2014.5523%205%2014%205ZM4%205H7.5V12H3V6C3%205.44772%203.44772%205%204%205ZM10.5%2015H15V26C15%2026.5522%2014.5523%2027%2014%2027H10.5V15ZM4%2027H7.5V15H3V26C3%2026.5522%203.44772%2027%204%2027Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-edit::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3.5%2010.6262V12.5012H5.375L10.905%206.97122L9.03%205.09622L3.5%2010.6262ZM12.355%205.52122C12.4014%205.47497%2012.4381%205.42002%2012.4632%205.35953C12.4883%205.29905%2012.5012%205.23421%2012.5012%205.16872C12.5012%205.10324%2012.4883%205.0384%2012.4632%204.97791C12.4381%204.91742%2012.4014%204.86248%2012.355%204.81622L11.185%203.64622C11.1387%203.59987%2011.0838%203.5631%2011.0233%203.53801C10.9628%203.51291%2010.898%203.5%2010.8325%203.5C10.767%203.5%2010.7022%203.51291%2010.6417%203.53801C10.5812%203.5631%2010.5263%203.59987%2010.48%203.64622L9.565%204.56122L11.44%206.43622L12.355%205.52122Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-filter-add::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5.12126%207.75L10.8517%207.75%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M6.65934%2011.748L9.32778%2011.748%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M12.2943%201.04872V6.19184M14.9886%203.74341H9.68478%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M8.25488%203C8.04799%203.18323%207.91706%203.45099%207.91699%203.74902C7.91713%204.04868%208.04988%204.31681%208.25879%204.5H2C1.58579%204.5%201.25%204.16421%201.25%203.75C1.25%203.33579%201.58579%203%202%203H8.25488Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pinned-bottom::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20class%3D%22ag-icon%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M3.47%2012.28A.75.75%200%200%201%204%2011h8a.75.75%200%200%201%200%201.5H4a.75.75%200%200%201-.53-.22ZM12.731%205.256a.75.75%200%200%201-.2.524l-4%204a.75.75%200%200%201-1.06%200l-4-4a.75.75%200%201%201%201.06-1.06l2.72%202.72V2a.75.75%200%200%201%201.5%200v5.44l2.72-2.72a.75.75%200%200%201%201.26.536Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pinned-top::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M12.53%203.72A.75.75%200%200%201%2012%205H4a.75.75%200%200%201%200-1.5h8a.75.75%200%200%201%20.53.22ZM3.269%2010.744a.75.75%200%200%201%20.2-.524l4-4a.75.75%200%200%201%201.06%200l4%204a.75.75%200%201%201-1.06%201.06L8.75%208.56V14a.75.75%200%200%201-1.5%200V8.56l-2.72%202.72a.75.75%200%200%201-1.26-.536Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-down::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22black%22%20stroke%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M7.334%2010.667%2016%2021.334l8.667-10.667H7.334Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-up::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22black%22%20stroke%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M7.334%2021.333%2016%2010.666l8.667%2010.667H7.334Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-un-pin::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20class%3D%22ag-icon%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M8%2011a.75.75%200%200%200-.75.75v3.333a.75.75%200%201%200%201.5%200V11.75A.75.75%200%200%200%208%2011Z%22%2F%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M13.11%201.436a.75.75%200%200%200-1.22-.872l-10%2014a.75.75%200%201%200%201.22.872L5.207%2012.5h7.376a.75.75%200%200%200%20.75-.75v-1.174a2.08%202.08%200%200%200-1.153-1.863l-1.185-.599-.005-.002a.58.58%200%200%201-.323-.522V5.165a2.083%202.083%200%200%200%201.854-2.904l.589-.825Zm-3.943%205.52v.634a2.08%202.08%200%200%200%201.153%201.863l1.185.6.005.002a.58.58%200%200%201%20.323.522V11H6.28l2.887-4.044ZM9.277%201H5.25a2.084%202.084%200%200%200-.083%204.165v1.676l1.5-2.132v-.292a.75.75%200%200%200-.75-.75H5.25a.584.584%200%200%201%200-1.167h2.972L9.277%201Z%22%2F%3E%3C%2Fsvg%3E'); }
:where(.ag-theme-columnDropStyle-2) {
.ag-column-drop-vertical-empty-message{align-items:center;border:dashed var(--ag-border-width);border-color:var(--ag-border-color);display:flex;inset:0;justify-content:center;margin:calc(var(--ag-spacing)*1.5) calc(var(--ag-spacing)*2);overflow:hidden;padding:calc(var(--ag-spacing)*2);position:absolute}
.typography-microcopy-xs-strong {
  font-family: var(--typography-microcopy-xs-strong-font-family);
  font-size: var(--typography-microcopy-xs-strong-font-size);
  font-weight: var(--typography-microcopy-xs-strong-font-weight);
  line-height: var(--typography-microcopy-xs-strong-line-height);
  letter-spacing: var(--typography-microcopy-xs-strong-letter-spacing);
}
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
}
.ag-measurement-container{height:0;overflow:hidden;visibility:hidden;width:0}
.ag-measurement-element-border{display:inline-block}
.ag-measurement-element-border:before{border-left:var(--ag-internal-measurement-border);content:"";display:block}
.ag-chart,.ag-dnd-ghost,.ag-external,.ag-popup,.ag-root-wrapper{cursor:default;line-height:normal;white-space:normal;-webkit-font-smoothing:antialiased;background-color:var(--ag-wrapper-background-color);color:var(--ag-text-color);color-scheme:var(--ag-browser-color-scheme);font-family:var(--ag-font-family);font-size:var(--ag-font-size);font-weight:var(--ag-font-weight);--ag-indentation-level:0}
.ag-tab-guard{display:block;height:0;position:absolute;width:0}
.ag-tab-guard-top{top:1px}
.ag-invisible{visibility:hidden!important}
.ag-hidden{display:none!important}
.ag-tab-guard-bottom{bottom:1px}
```

## Tokens
- `--ag-internal-hover-color`: rgba(0, 0, 0, 0) _(component)_
- `--ag-internal-moving-color`: rgba(0, 0, 0, 0) _(component)_
- `--alert-box-text-color`: #525252 _(component)_
- `--border-width-default`: 1px _(semantic)_
- `--button-radius-lg`: .5rem _(component)_
- `--button-radius-md`: .5rem _(component)_
- `--button-radius-sm`: .25rem _(component)_
- `--cbf-text-placeholder`: #9aa3ad _(brand)_
- `--color-background-brand`: #1e5386 _(semantic)_
- `--color-background-brand-hover`: #1a4570 _(semantic)_
- `--color-background-brand-subtle`: #f3f7fc _(semantic)_
- `--color-background-elevation-raised`: #fcfcfc _(semantic)_
- `--color-background-elevation-sunken`: #f3f7fc _(semantic)_
- `--color-background-utility-danger-subtle`: #fffcfc _(semantic)_
- `--color-background-utility-info-subtle`: #f3f7fc _(semantic)_
- `--color-background-utility-success-subtle`: #fbfefc _(semantic)_
- `--color-background-utility-warning-subtle`: #fefdfb _(semantic)_
- `--color-blue-2`: #f4faff _(primitive)_
- `--color-blue-6`: #acd8fc _(primitive)_
- `--color-border-default`: #dcdcdc _(semantic)_
- `--color-border-default-subtle`: #efefef _(semantic)_
- `--color-border-utility-danger`: #fdbdbe _(semantic)_
- `--color-border-utility-info`: #c6dcf1 _(semantic)_
- `--color-border-utility-success`: #adddc0 _(semantic)_
- `--color-border-utility-warning`: #f3d673 _(semantic)_
- `--color-content-brand`: #1e5386 _(semantic)_
- `--color-content-default`: #3d3d3d _(semantic)_
- `--color-content-default-knockout`: #fcfcfc _(semantic)_
- `--color-content-default-secondary`: #525252 _(semantic)_
- `--color-content-default-tertiary`: #656565 _(semantic)_
- `--color-content-utility-danger`: #ce2c31 _(semantic)_
- `--color-content-utility-info`: #0d74ce _(semantic)_
- `--color-content-utility-success`: #218358 _(semantic)_
- `--color-content-utility-warning`: #ab6400 _(semantic)_
- `--color-green-2`: #f4fbf6 _(primitive)_
- `--color-green-6`: #adddc0 _(primitive)_
- `--color-red-2`: #fff7f7 _(primitive)_
- `--color-red-6`: #fdbdbe _(primitive)_
- `--color-yellow-2`: #fefbe9 _(primitive)_
- `--color-yellow-6`: #f3d673 _(primitive)_
- `--gap`: 1rem _(component)_
- `--icon-size-lg`: 24px _(primitive)_
- `--icon-size-md`: 20px _(primitive)_
- `--icon-size-sm`: 16px _(primitive)_
- `--radius-100`: .25rem _(primitive)_
- `--radius-200`: .5rem _(primitive)_
- `--radius-chip`: .25rem _(semantic)_
- `--radius-md`: .5rem _(semantic)_
- `--radius-sm`: .25rem _(semantic)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--transition-fast`: .15s ease _(semantic)_
- `--typography-body-md-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-body-md-font-size`: clamp(.75rem, .66rem + .44vw, .9375rem) _(semantic)_
- `--typography-body-md-font-weight`: 400 _(semantic)_
- `--typography-body-md-letter-spacing`: .01em _(semantic)_
- `--typography-body-md-line-height`: 1.6 _(semantic)_
- `--typography-body-sm-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-body-sm-font-size`: clamp(.6875rem, .61rem + .38vw, .875rem) _(semantic)_
- `--typography-body-sm-font-weight`: 400 _(semantic)_
- `--typography-body-sm-letter-spacing`: .01em _(semantic)_
- `--typography-body-sm-line-height`: 1.6 _(semantic)_
- `--typography-font-family-sans`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-heading-lg-font-family`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-heading-lg-font-size`: clamp(1.375rem, 1.2rem + .88vw, 1.875rem) _(semantic)_
- `--typography-heading-lg-font-weight`: 600 _(semantic)_
- `--typography-heading-lg-letter-spacing`: -.01em _(semantic)_
- `--typography-heading-lg-line-height`: 1.3 _(semantic)_
- `--typography-heading-md-font-family`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-heading-md-font-size`: clamp(1.125rem, .98rem + .72vw, 1.5rem) _(semantic)_
- `--typography-heading-md-font-weight`: 600 _(semantic)_
- `--typography-heading-md-letter-spacing`: -.01em _(semantic)_
- `--typography-heading-md-line-height`: 1.3 _(semantic)_
- `--typography-label-md-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-label-md-font-size`: clamp(.75rem, .66rem + .44vw, .9375rem) _(semantic)_
- `--typography-label-md-font-weight`: 500 _(semantic)_
- `--typography-label-md-letter-spacing`: .01em _(semantic)_
- `--typography-label-md-line-height`: 1.6 _(semantic)_
- `--typography-label-sm-strong-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-label-sm-strong-font-size`: clamp(.6875rem, .61rem + .38vw, .875rem) _(semantic)_
- `--typography-label-sm-strong-font-weight`: 600 _(semantic)_
- `--typography-label-sm-strong-letter-spacing`: .01em _(semantic)_
- `--typography-label-sm-strong-line-height`: 1.6 _(semantic)_
- `--typography-meta-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-meta-font-size`: clamp(.625rem, .56rem + .32vw, .75rem) _(semantic)_
- `--typography-meta-font-weight`: 400 _(semantic)_
- `--typography-meta-letter-spacing`: .01em _(semantic)_
- `--typography-meta-line-height`: 1.6 _(semantic)_
- `--typography-microcopy-md-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-microcopy-md-font-size`: clamp(.75rem, .66rem + .44vw, .9375rem) _(semantic)_
- `--typography-microcopy-md-font-weight`: 500 _(semantic)_
- `--typography-microcopy-md-letter-spacing`: .01em _(semantic)_
- `--typography-microcopy-md-line-height`: 1 _(semantic)_
- `--typography-microcopy-sm-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-microcopy-sm-font-size`: clamp(.6875rem, .61rem + .38vw, .875rem) _(semantic)_
- `--typography-microcopy-sm-font-weight`: 500 _(semantic)_
- `--typography-microcopy-sm-letter-spacing`: .01em _(semantic)_
- `--typography-microcopy-sm-line-height`: 1 _(semantic)_
- `--typography-microcopy-xs-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-microcopy-xs-font-size`: clamp(.625rem, .56rem + .32vw, .75rem) _(semantic)_
- `--typography-microcopy-xs-font-weight`: 500 _(semantic)_
- `--typography-microcopy-xs-letter-spacing`: .01em _(semantic)_
- `--typography-microcopy-xs-line-height`: 1 _(semantic)_
- `--typography-microcopy-xs-strong-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-microcopy-xs-strong-font-size`: clamp(.625rem, .56rem + .32vw, .75rem) _(semantic)_
- `--typography-microcopy-xs-strong-font-weight`: 600 _(semantic)_
- `--typography-microcopy-xs-strong-letter-spacing`: .01em _(semantic)_
- `--typography-microcopy-xs-strong-line-height`: 1 _(semantic)_
