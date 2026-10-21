# Invoices grid (AG Grid): markup, part 1 of 2

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
          style=""
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
          options='[{"value":"grid","label":"Grid","ariaLabel":"Grid view","icon":"&lt;line x1=\"3\" x2=\"21\" y1=\"9\" y2=\"9\"/&gt;&lt;line x1=\"3… [560 characters]'
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
          style="--ag-internal-measurement-border: var(--ag-pinned-row-border, solid 15538px)"
        ></div>
        <div
          class="ag-measurement-element-border"
          style="--ag-internal-measurement-border: var(--ag-header-row-border, solid 15538px)"
        ></div>
      </div>
      <div
        class="ag-aria-description-container"
        aria-live="polite"
        aria-relevant="additions text"
        aria-atomic="true"
      ></div>
      <div class="ag-root-wrapper ag-layout-auto-height ag-ltr" role="presentation" grid-id="1">
        <div
          class="ag-root-wrapper-body ag-layout-auto-height ag-focus-managed"
          data-ref="rootWrapperBody"
          role="presentation"
        >
          <div class="ag-tab-guard ag-tab-guard-top" role="presentation" tabindex="0"></div>
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
                      style="top: 0px; height: 48px; width: 200px; touch-action: none; left: 0px"
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
                          <div class="ag-header-cell-label" data-ref="eLabel" role="presentation">
                            <span class="ag-header-cell-text" data-ref="eText">Invoice #</span>
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
                                ></span></span
                              ><!-- …and 2 more like this (<span class="ag-sort-indicator-icon ag-sort-order ag-hidden">) -->
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
                      style="top: 0px; height: 48px; width: 140px; touch-action: none; left: 200px"
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
                          <div class="ag-header-cell-label" data-ref="eLabel" role="presentation">
                            <span class="ag-header-cell-text" data-ref="eText">Contract #</span>
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
                                ></span></span
                              ><!-- …and 2 more like this (<span class="ag-sort-indicator-icon ag-sort-order ag-hidden">) -->
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
                      style="top: 0px; height: 48px; width: 200px; touch-action: none; left: 880px"
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
                          <div class="ag-header-cell-label" data-ref="eLabel" role="presentation">
                            <span class="ag-header-cell-text" data-ref="eText">Amount</span>
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
                                ></span></span
                              ><!-- …and 2 more like this (<span class="ag-sort-indicator-icon ag-sort-order ag-hidden">) -->
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
                      style="top: 0px; height: 48px; width: 200px; touch-action: none; left: 1080px"
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
                          <div class="ag-header-cell-label" data-ref="eLabel" role="presentation">
                            <span class="ag-header-cell-text" data-ref="eText">Status</span>
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
                                ></span></span
                              ><!-- …and 2 more like this (<span class="ag-sort-indicator-icon ag-sort-order ag-hidden">) -->
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- …and 3 more like this (<div class="ag-header-cell ag-column-first ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed">) -->
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
            <div class="ag-body ag-layout-auto-height" data-ref="eBody" role="presentation">
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
                      <!-- …and 2 more like this (<div class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id">) -->
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
                      <!-- …and 2 more like this (<div class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id">) -->
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
                      <!-- …and 2 more like this (<div class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id">) -->
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
                      <!-- …and 2 more like this (<div class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id">) -->
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
                      <!-- …and 2 more like this (<div class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id">) -->
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
                      <!-- …and 2 more like this (<div class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id">) -->
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
```
