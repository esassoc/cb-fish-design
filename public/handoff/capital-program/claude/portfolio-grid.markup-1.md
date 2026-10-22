# Portfolio grid: markup, part 1 of 4

```html
<section class="cbf-cap-grid stack" data-gap="sm" data-cap-grid="" aria-labelledby="cap-grid-title">
  <div class="repel">
    <h2 class="cbf-cap-section-title" id="cap-grid-title" data-grid-title="">
      Capital forecast by project — FY27 view
    </h2>
    <div class="cluster" data-gap="xs">
      <esa-popover
        trigger="click"
        position="bottom"
        class="cbf-cap-grid__columns"
        appearance="default"
      >
        <span
          class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--sm"
          ><button
            class="esa-button__native typography-microcopy-xs"
            type="button"
            aria-expanded="false"
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
                <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                <!-- …and 2 more like this (<rect>) -->
              </svg>
            </span>
            <span class="esa-button__label">Columns</span
            ><span class="esa-icon esa-icon--sm" aria-hidden="true">
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
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </span></button
        ></span>
        <div slot="content" class="cbf-cap-grid__columns-panel">
          <esa-checkbox-group
            size="sm"
            label="Show columns"
            data-grid-columns="true"
            orientation="vertical"
          ></esa-checkbox-group>
        </div>
      </esa-popover>
      <span
        class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--sm"
        ><button
          class="esa-button__native typography-microcopy-xs"
          type="button"
          data-grid-csv="true"
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
          </span>
          <span class="esa-button__label">Export CSV</span>
        </button></span
      >
    </div>
  </div>
  <div class="cbf-data-grid__controls repel">
    <div class="cbf-data-grid__filters cluster" data-gap="md">
      <label class="cbf-data-grid__filter">
        <span class="typography-meta">Category</span>
        <esa-chip-group
          size="sm"
          label="Filter by category"
          value=""
          options='[{"value":"","label":"All"},{"value":"Hatchery","label":"Hatchery"},{"value":"Land","label":"Land"},{"value":"Passage","label":"Passage"}]'
          data-f-category="true"
        ></esa-chip-group>
      </label>
      <esa-select
        size="sm"
        label="Record type"
        class="cbf-cap-grid__f"
        data-f-record="true"
      ></esa-select>
      <esa-select size="sm" label="Stage" class="cbf-cap-grid__f" data-f-stage="true"></esa-select
      ><!-- …and 2 more like this (<esa-select class="cbf-cap-grid__f">) -->
      <esa-switch-toggle
        size="sm"
        label="Flagged only"
        data-f-flag="true"
        label-position="after"
      ></esa-switch-toggle>
      <esa-switch-toggle
        size="sm"
        label="Count placeholders in totals"
        checked=""
        data-f-placeholders="true"
        label-position="after"
      ></esa-switch-toggle>
    </div>
    <div class="cbf-data-grid__search">
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
          placeholder="Search number, title, sponsor…"
          data-f-search="true"
          aria-label="Search projects"
          class="astro-lfax72z2"
          style=""
        />
      </label>
    </div>
  </div>
  <div class="cbf-data-grid__grid cbf-cap-grid__grid" data-grid-host="">
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
      >
        No Rows To Show
      </div>
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
            aria-colcount="21"
            aria-rowcount="39"
          >
            <!--AG-HEADER-ROOT-->
            <div
              class="ag-header ag-focus-managed ag-pivot-off ag-header-allow-overflow"
              role="presentation"
              style="height: 49px; min-height: 49px"
            >
              <div
                class="ag-pinned-left-header"
                role="rowgroup"
                style="width: 432px; max-width: 432px; min-width: 432px"
              >
                <div
                  class="ag-header-row ag-header-row-column"
                  role="row"
                  tabindex="0"
                  aria-rowindex="1"
                  style="top: 0px; height: 48px; width: 432px"
                >
                  <div
                    class="ag-header-cell ag-column-first ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                    role="columnheader"
                    col-id="number"
                    aria-colindex="1"
                    tabindex="-1"
                    aria-sort="none"
                    style="top: 0px; height: 48px; width: 132px; left: 0px; touch-action: none"
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
                          <span class="ag-header-cell-text" data-ref="eText">Project #</span>
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
                    col-id="title"
                    aria-colindex="2"
                    tabindex="-1"
                    aria-sort="none"
                    style="top: 0px; height: 48px; width: 300px; left: 132px; touch-action: none"
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
                          <span class="ag-header-cell-text" data-ref="eText">Title</span>
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
                </div>
              </div>
              <div class="ag-header-viewport" role="rowgroup" tabindex="-1">
                <div
                  class="ag-header-container"
                  data-ref="eCenterContainer"
                  role="presentation"
                  style="width: 2234px"
                >
                  <div
                    class="ag-header-row ag-header-row-column"
                    role="row"
                    tabindex="0"
                    aria-rowindex="1"
                    style="top: 0px; height: 48px; width: 2234px"
                  >
                    <div
                      class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                      role="columnheader"
                      col-id="sponsor"
                      aria-colindex="3"
                      tabindex="-1"
                      aria-sort="none"
                      style="top: 0px; height: 48px; width: 160px; left: 0px; touch-action: none"
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
                            <span class="ag-header-cell-text" data-ref="eText">Sponsor</span>
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
                      col-id="pm"
                      aria-colindex="4"
                      tabindex="-1"
                      aria-sort="none"
                      style="top: 0px; height: 48px; width: 150px; left: 160px; touch-action: none"
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
                            <span class="ag-header-cell-text" data-ref="eText">PM / COR</span>
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
                    <!-- …and 5 more like this (<div class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed">) -->
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
                class="ag-pinned-left-floating-top"
                data-ref="eContainer"
                role="rowgroup"
                aria-hidden="false"
                style="width: 432px; max-width: 432px; min-width: 432px"
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
                  style="width: 2234px"
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
                  class="ag-pinned-left-cols-container"
                  data-ref="eContainer"
                  role="rowgroup"
                  aria-hidden="false"
                  style="height: 1596px; width: 432px; max-width: 432px; min-width: 432px"
                >
                  <div
                    role="row"
                    comp-id="104"
                    tabindex="0"
                    row-index="0"
                    class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-group ag-row-position-absolute ag-row-first ag-row-not-inline-editing"
                    aria-rowindex="2"
                    row-id="g:Hatchery Expand"
                    style="transform: translateY(0px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="105"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span></span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="106"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><strong>Hatchery Expand</strong>
                        <span class="cbf-cap-muted">10 projects</span></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="107"
                    tabindex="0"
                    row-index="1"
                    class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="3"
                    row-id="klickitat"
                    style="transform: translateY(42px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="108"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>1988-115-35</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="109"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=klickitat"
                          >Klickitat Hatchery Spring Chinook</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="110"
                    tabindex="0"
                    row-index="2"
                    class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project is-inactive ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="4"
                    row-id="kelt"
                    style="transform: translateY(84px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="111"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>2007-401-00</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="112"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=kelt"
                          >Kelt Reconditioning Facility</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="113"
                    tabindex="0"
                    row-index="3"
                    class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="5"
                    row-id="prosser"
                    style="transform: translateY(126px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="114"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>2008-527-00</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="115"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=prosser"
                          >John Day Mitigation @ Prosser</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="116"
                    tabindex="0"
                    row-index="4"
                    class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="6"
                    row-id="trinity"
                    style="transform: translateY(168px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="117"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>1996-040-01</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="118"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=trinity"
                          >Trinity (Natapoc) Acclimation Site</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="119"
                    tabindex="0"
                    row-index="5"
                    class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="7"
                    row-id="sturgeon"
                    style="transform: translateY(210px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="120"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>2007-155-00</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="121"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=sturgeon"
                          >White Sturgeon Hatchery @ Marion Drain</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="122"
                    tabindex="0"
                    row-index="6"
                    class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="8"
                    row-id="waterwheel"
                    style="transform: translateY(252px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="123"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>2008-901-00</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="124"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=waterwheel"
                          >Waterwheel Hatchery</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="125"
                    tabindex="0"
                    row-index="7"
                    class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project is-placeholder ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="9"
                    row-id="coeur-dalene"
                    style="transform: translateY(294px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="126"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>2024-001-00</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="127"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=coeur-dalene"
                          >Coeur d'Alene Anadromous &amp; Resident Hatchery</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="128"
                    tabindex="0"
                    row-index="8"
                    class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project is-placeholder ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="10"
                    row-id="ford"
                    style="transform: translateY(336px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="129"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>2028-001-00</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="130"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=ford"
                          >Ford Hatchery</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="131"
                    tabindex="0"
                    row-index="9"
                    class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project is-placeholder ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="11"
                    row-id="spokane-ops"
                    style="transform: translateY(378px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="132"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>2024-002-01</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="133"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=spokane-ops"
                          >Spokane Operations Center</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="134"
                    tabindex="0"
                    row-index="10"
                    class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 cbf-cap-row-project ag-row-position-absolute ag-row-not-inline-editing"
                    aria-rowindex="12"
                    row-id="lake-roosevelt"
                    style="transform: translateY(420px); height: 42px"
                  >
                    <div
                      role="gridcell"
                      comp-id="135"
                      col-id="number"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                      aria-colindex="1"
                      style="left: 0px; width: 132px"
                    >
                      <span>1991-046-01</span>
                    </div>
                    <div
                      role="gridcell"
                      comp-id="136"
                      col-id="title"
                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-last-left-pinned"
                      aria-colindex="2"
                      style="left: 132px; width: 300px"
                    >
                      <span
                        ><a
                          class="cbf-grid-link"
                          href="/cb-fish-design/capital-program/project?id=lake-roosevelt"
                          >Lake Roosevelt Net Pens</a
                        ></span
                      >
                    </div>
                  </div>
                  <div
                    role="row"
                    comp-id="137"
                    tabindex="0"
                    row-index="11"
```
