# Dashboard: markup, part 1 of 3

```html
<div class="esa-container typography-body-md" style="--_container-max: 1920px">
  <section class="cbf-app-panel">
    <div class="cbf-app-panel__crumb">
      <nav class="esa-breadcrumbs esa-breadcrumbs--md" aria-label="Breadcrumb">
        <ol class="esa-breadcrumbs__list">
          <li class="esa-breadcrumbs__item">
            <a href="/cb-fish-design/home" class="esa-breadcrumbs__link typography-body-md">
              <span class="esa-breadcrumbs__icon"
                ><svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <path d="M9 22V12h6v10"></path></svg
              ></span>
              Home
            </a>
            <svg
              class="esa-breadcrumbs__separator"
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
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </li>
          <li class="esa-breadcrumbs__item" aria-current="page">
            <span class="esa-breadcrumbs__current typography-label-md"> Dashboard </span>
          </li>
        </ol>
      </nav>
    </div>
    <div class="cbf-app-panel__body">
      <div class="cbf-app-panel__content">
        <header class="esa-page-header">
          <div class="esa-page-header__bar">
            <div class="esa-page-header__titles">
              <p class="esa-page-header__eyebrow typography-label-md">
                <span>James Whitfield · Contracting Officer's Representative</span>
              </p>
              <h1 class="esa-page-header__title typography-heading-lg">Dashboard</h1>
            </div>
          </div>
        </header>
        <!-- script type="module" removed (233 bytes) --><!-- script type="module" removed (455 bytes) --><!-- script type="module" removed (0 bytes) --><esa-tab-layout
          class="cbf-mywork-tabs"
          size="md"
          appearance="underline"
          active-index="0"
          tabs='[{"label":"Invoices"},{"label":"Contracts","disabled":true},{"label":"Projects","disabled":true},{"label":"Portfolios","disabled":true},{"label":"Contracts by project","disabled":true},{"label":"Alerts","disabled":true},{"label":"Contract work activity tasks","disabled":true}]'
          variant="underline"
        >
          <div slot="panel-0" class="cbf-mywork-tabs__panel stack" data-gap="lg">
            <div class="stack cbf-my-invoices" data-gap="sm">
              <section class="cbf-invoice-queue-metrics" aria-label="Invoice status summary">
                <div class="cbf-invoice-queue-metrics__row cluster" data-gap="xl">
                  <div class="cbf-invoice-queue-metrics__overdue">
                    <div class="esa-stat">
                      <div class="esa-stat__value typography-display-sm">1</div>
                      <div class="esa-stat__label typography-label-md">Overdue</div>
                      <div class="esa-stat__sub typography-body-sm">Immediate review needed</div>
                    </div>
                  </div>
                  <div class="esa-stat">
                    <div class="esa-stat__value typography-display-sm">5</div>
                    <div class="esa-stat__label typography-label-md">Awaiting review</div>
                    <div class="esa-stat__sub typography-body-sm">Submitted by vendor</div>
                  </div>
                  <div class="esa-stat">
                    <div class="esa-stat__value typography-display-sm">3</div>
                    <div class="esa-stat__label typography-label-md">Returned</div>
                    <div class="esa-stat__sub typography-body-sm">Awaiting vendor resubmission</div>
                  </div>
                  <div class="esa-stat">
                    <div class="esa-stat__value typography-display-sm">4</div>
                    <div class="esa-stat__label typography-label-md">Recently approved</div>
                    <div class="esa-stat__sub typography-body-sm">Pending PR creation</div>
                  </div>
                </div>
              </section>
              <section
                class="cbf-invoice-review-queue stack"
                data-gap="md"
                data-variant="workspace"
                data-show-days-left="false"
                data-show-asset-suite="false"
              >
                <header class="cbf-invoice-review-queue__header repel">
                  <h2 class="typography-heading-md">Invoices for contracts where I am the COR</h2>
                  <div class="cbf-invoice-review-queue__search">
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
                        placeholder="Search invoices, vendors or contracts…"
                        data-queue-search="true"
                        aria-label="Search the review queue"
                        class="astro-lfax72z2"
                      />
                    </label>
                  </div>
                </header>
                <div class="cbf-invoice-review-queue__controls">
                  <div class="cbf-invoice-review-queue__controls-end">
                    <span
                      class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--sm"
                      slot="controls-end"
                      ><a
                        class="esa-button__native typography-microcopy-xs"
                        href="/cb-fish-design/invoice-history"
                        role="button"
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
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                            <path d="M3 3v5h5"></path>
                            <path d="M12 7v5l4 2"></path>
                          </svg>
                        </span>
                        <span class="esa-button__label"> View other invoices </span></a
                      ></span
                    >
                  </div>
                </div>
                <!-- AG Grid mounts here; auto-height grows with rows so the page owns scroll. -->
                <div class="cbf-invoice-review-queue__grid" data-queue-grid="">
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
                        style="
                          --ag-internal-measurement-border: var(--ag-row-border, solid 15538px);
                        "
                      ></div>
                      <div
                        class="ag-measurement-element-border"
                        style="
                          --ag-internal-measurement-border: var(
                            --ag-pinned-row-border,
                            solid 15538px
                          );
                        "
                      ></div>
                      <div
                        class="ag-measurement-element-border"
                        style="
                          --ag-internal-measurement-border: var(
                            --ag-header-row-border,
                            solid 15538px
                          );
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
                          aria-colcount="6"
                          aria-rowcount="6"
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
                                style="width: 1146px"
                              >
                                <div
                                  class="ag-header-row ag-header-row-column"
                                  role="row"
                                  tabindex="0"
                                  aria-rowindex="1"
                                  style="top: 0px; height: 48px; width: 1146px"
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
                                      width: 160px;
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
                                    col-id="vendor"
                                    aria-colindex="2"
                                    tabindex="-1"
                                    aria-sort="none"
                                    style="
                                      top: 0px;
                                      height: 48px;
                                      width: 279px;
                                      touch-action: none;
                                      left: 160px;
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
                                            >Vendor</span
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
                                    aria-colindex="4"
                                    tabindex="-1"
                                    aria-sort="none"
                                    style="
                                      top: 0px;
                                      height: 48px;
                                      width: 140px;
                                      touch-action: none;
                                      left: 717px;
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
                                    col-id="inStatusDays"
                                    aria-colindex="6"
                                    tabindex="-1"
                                    aria-sort="descending"
                                    style="
                                      top: 0px;
                                      height: 48px;
                                      width: 139px;
                                      touch-action: none;
                                      left: 1007px;
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
                                            >Days in status</span
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
                                              >1</span
                                            >
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
                                              class="ag-sort-indicator-icon ag-sort-descending-icon"
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
                                  <!-- …and 2 more like this (<div class="ag-header-cell ag-column-first ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed">) -->
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
                                style="width: 1146px"
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
                                style="height: 210px; width: 0px; max-width: 0px; min-width: 0px"
                              ></div>
                              <!--AG-ROW-CONTAINER-->
                              <div
                                class="ag-viewport ag-center-cols-viewport"
                                data-ref="eViewport"
                                role="rowgroup"
                                style="height: 210px"
                              >
                                <div
                                  class="ag-center-cols-container"
                                  data-ref="eContainer"
                                  role="presentation"
                                  style="width: 1146px; height: 210px"
                                >
                                  <div
                                    role="row"
                                    comp-id="57"
                                    tabindex="0"
                                    row-index="0"
                                    class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-first"
                                    aria-rowindex="2"
                                    row-id="2"
                                    style="transform: translateY(0px); height: 42px"
                                  >
                                    <div
                                      role="gridcell"
                                      comp-id="58"
                                      col-id="number"
                                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                                      aria-colindex="1"
                                      style="left: 0px; width: 160px"
                                    >
                                      <span
                                        ><a
                                          class="cbf-grid-link"
                                          href="/cb-fish-design/invoice-review/INV-2026-0047"
                                          >INV-2026-0047</a
                                        ></span
                                      >
                                    </div>
                                    <div
                                      role="gridcell"
                                      comp-id="59"
                                      col-id="vendor"
                                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                      aria-colindex="2"
                                      style="left: 160px; width: 279px"
                                    >
                                      Methow Restoration Partners
                                    </div>
                                    <div
                                      role="gridcell"
                                      comp-id="61"
                                      col-id="amount"
                                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                                      aria-colindex="4"
                                      style="left: 717px; width: 140px"
                                    >
                                      $3,960.00
                                    </div>
                                    <div
                                      role="gridcell"
                                      comp-id="63"
                                      col-id="inStatusDays"
                                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last cbf-grid-overdue"
                                      aria-colindex="6"
                                      style="left: 1007px; width: 139px"
                                    >
                                      5 days
                                    </div>
                                    <!-- …and 2 more like this (<div class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id">) -->
                                  </div>
                                  <div
                                    role="row"
                                    comp-id="64"
                                    tabindex="0"
                                    row-index="1"
                                    class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                                    aria-rowindex="3"
                                    row-id="1"
                                    style="transform: translateY(42px); height: 42px"
                                  >
                                    <div
                                      role="gridcell"
                                      comp-id="65"
                                      col-id="number"
                                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first cbf-grid-id"
                                      aria-colindex="1"
                                      style="left: 0px; width: 160px"
                                    >
                                      <span
                                        ><a
                                          class="cbf-grid-link"
                                          href="/cb-fish-design/invoice-review/INV-2026-0049"
                                          >INV-2026-0049</a
                                        ></span
                                      >
                                    </div>
                                    <div
                                      role="gridcell"
                                      comp-id="66"
                                      col-id="vendor"
                                      class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                      aria-colindex="2"
                                      style="left: 160px; width: 279px"
                                    >
```
