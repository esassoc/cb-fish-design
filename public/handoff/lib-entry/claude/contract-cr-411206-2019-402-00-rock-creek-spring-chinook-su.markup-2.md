# Contract CR-411206: 2019-402-00 Rock Creek Spring Chinook Su: markup, part 2 of 4

```html
                    <div class="cluster" data-gap="xs">
                      <h2 class="typography-heading-md">Indirect rate</h2>
                      <span
                        class="esa-badge esa-badge--secondary esa-badge--sm typography-microcopy-xs-strong"
                      >
                        <span class="esa-badge__text">Single rate</span>
                      </span>
                    </div>
                    <p class="cbf-lic__authority typography-body-md">
                      <strong data-lic-rate="">26.75%</strong>
                      <span class="cbf-lic__sep" aria-hidden="true">·</span>
                      <span data-lic-doc="">NICRA 2026-14, approved 03/11/2026</span>
                    </p>
                    <p class="cbf-lic__meta typography-body-sm">
                      Effective <span data-lic-start="">05/01/2026</span> through
                      <span data-lic-end="">04/30/2027</span>
                      <span class="cbf-lic__sep" aria-hidden="true">·</span> applied to
                      <span data-lic-scope="">7 of 9</span> cost subtotals
                    </p>
                  </div>
                  <div class="cbf-lic__figures cluster" data-gap="lg">
                    <div class="cbf-lic__num" data-lic-stat="base">
                      <div class="esa-stat">
                        <div class="esa-stat__value typography-display-sm">$201,670</div>
                        <div class="esa-stat__label typography-label-md">Indirect base</div>
                        <div class="esa-stat__sub typography-body-sm">scoped subtotals</div>
                      </div>
                    </div>
                    <div class="cbf-lic__num" data-lic-stat="indirect">
                      <div class="esa-stat">
                        <div class="esa-stat__value typography-display-sm">$53,947</div>
                        <div class="esa-stat__label typography-label-md">Indirect</div>
                        <div class="esa-stat__sub typography-body-sm">at 26.75%</div>
                      </div>
                    </div>
                    <span
                      class="esa-button esa-button--variant-primary esa-button--appearance-outline esa-button--md"
                      ><button
                        class="esa-button__native typography-microcopy-md"
                        type="button"
                        data-lic-open="true"
                      >
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
                            <path
                              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 … [565 characters]"
                            ></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </span>
                        <span class="esa-button__label">Configure…</span>
                      </button></span
                    >
                  </div>
                </div>
              </div>
            </div>
            <esa-side-dialog
              data-lic-dialog="true"
              heading="Configure the indirect rate"
              size="lg"
              position="right"
            >
              <div class="stack" data-gap="lg">
                <p class="cbf-lic__lede typography-body-md">
                  The rate, the document that authorizes it, the period it covers, and — the part
                  that gets checked — exactly which cost subtotals it is applied to. Every change
                  here re-bases the indirect calculation immediately, both below and in the cost
                  grid.
                </p>
                <div class="cbf-lic__fields grid" data-gap="md">
                  <esa-text-field
                    data-lic-field="rate"
                    label="Indirect rate"
                    type="number"
                    suffix="%"
                    value="26.75"
                    help-text="As approved in the reference document."
                    size="md"
                  ></esa-text-field>
                  <esa-text-field
                    data-lic-field="referenceDoc"
                    label="Reference document"
                    value="NICRA 2026-14, approved 03/11/2026"
                    help-text="The negotiated agreement this rate comes from."
                    size="md"
                  ></esa-text-field>
                  <esa-date-picker
                    data-lic-field="effectiveStart"
                    label="Effective from"
                    value="2026-05-01"
                    size="md"
                  ></esa-date-picker>
                  <esa-date-picker
                    data-lic-field="effectiveEnd"
                    label="Effective through"
                    value="2027-04-30"
                    size="md"
                  ></esa-date-picker>
                </div>
                <div class="stack" data-gap="sm">
                  <h3 class="typography-title">Rate structure</h3>
                  <esa-radio-group
                    data-lic-mode="true"
                    orientation="horizontal"
                    size="md"
                  ></esa-radio-group>
                  <div class="esa-alert-box esa-alert-box--info typography-body-sm">
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
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    </div>
                    <div class="esa-alert-box__body">
                      <strong class="esa-alert-box__title typography-label-sm-strong"
                        >Dual rates are not entered on this screen</strong
                      >
                      <div class="esa-alert-box__message">
                        A dual rate charges on-site and off-site work at two different rates, and a
                        rate that changes part-way through the contract has to be weighted by the
                        months on each side of the change. Neither calculation is built here — a
                        dual-rate budget is worked out with your contracting officer before the LIB
                        is entered.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="stack" data-gap="sm">
                  <h3 class="typography-title">What this rate is applied to</h3>
                  <p class="cbf-lic__hint typography-body-sm">
                    A subtotal counts toward the indirect base only while it is checked. Uncheck one
                    and watch the base and the indirect dollars below drop by that amount. Supplies
                    &amp; Equipment is listed as its two classes rather than as one line, because
                    capitalizing an item is exactly the thing that takes it out of the base — so the
                    scope has to be sayable at that level.
                  </p>
                  <ul class="cbf-lic__picker" data-lic-picker="">
                    <li class="cbf-lic__row repel" data-lic-row="personnel-salary" data-in="true">
                      <esa-checkbox
                        data-lic-cat="personnel-salary"
                        label="Personnel — Salary"
                        size="md"
                        checked=""
                      ></esa-checkbox>
                      <span class="cbf-lic__amount" data-lic-row-amount="">$109,495</span>
                    </li>
                    <li class="cbf-lic__row repel" data-lic-row="personnel-fringe" data-in="true">
                      <esa-checkbox
                        data-lic-cat="personnel-fringe"
                        label="Personnel — Fringe"
                        size="md"
                        checked=""
                      ></esa-checkbox>
                      <span class="cbf-lic__amount" data-lic-row-amount="">$36,945</span>
                    </li>
                    <!-- …and 7 more like this (<li class="cbf-lic__row repel">) -->
                  </ul>
                </div>
              </div>
              <div slot="footer" class="cbf-lic__footer stack" data-gap="sm">
                <div class="cbf-lic__equation cluster" data-gap="md">
                  <div class="cbf-lic__num" data-lic-eq="base">
                    <div class="esa-stat">
                      <div class="esa-stat__value typography-display-sm">$201,670</div>
                      <div class="esa-stat__label typography-label-md">Indirect base</div>
                      <div class="esa-stat__sub typography-body-sm">7 of 9 subtotals</div>
                    </div>
                  </div>
                  <span class="cbf-lic__op" aria-hidden="true">×</span>
                  <div class="cbf-lic__num" data-lic-eq="rate">
                    <div class="esa-stat">
                      <div class="esa-stat__value typography-display-sm">26.75%</div>
                      <div class="esa-stat__label typography-label-md">Indirect rate</div>
                      <div class="esa-stat__sub typography-body-sm">approved</div>
                    </div>
                  </div>
                  <span class="cbf-lic__op" aria-hidden="true">=</span>
                  <div class="cbf-lic__num" data-lic-eq="indirect">
                    <div class="esa-stat esa-stat--accent">
                      <div class="esa-stat__value typography-display-sm">$53,947</div>
                      <div class="esa-stat__label typography-label-md">Indirect</div>
                      <div class="esa-stat__sub typography-body-sm">added to the budget</div>
                    </div>
                  </div>
                </div>
                <div class="cbf-lic__actions repel">
                  <span
                    class="esa-button esa-button--variant-ghost esa-button--appearance-fill esa-button--md"
                    ><button
                      class="esa-button__native typography-microcopy-md"
                      type="button"
                      data-lic-reset="true"
                    >
                      <span class="esa-button__label"> Reset to the approved scope </span>
                    </button></span
                  >
                  <span
                    class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
                    ><button
                      class="esa-button__native typography-microcopy-md"
                      type="button"
                      data-lic-done="true"
                    >
                      <span class="esa-button__label">Done</span>
                    </button></span
                  >
                </div>
              </div>
            </esa-side-dialog>
          </section>
          <!-- script type="module" removed (0 bytes) -->
          <section class="cbf-lct stack" data-gap="md" data-lct="">
            <header class="stack" data-gap="3xs">
              <h2 class="typography-heading-md">Line item budget</h2>
              <p class="cbf-lct__lede">CR-411206 · FY2027 · 05/01/2026–04/30/2027</p>
            </header>
            <!-- overflow stays visible at desktop on purpose: the allocation esa-popover,
       the esa-select panels and the add-line esa-dropdown-menu all position
       absolutely and cannot escape a clipping ancestor (same finding as
       cbf-lib-pi-documents). Narrow viewports fall back to horizontal scrolling
       and accept the clipping. -->
            <div class="cbf-lct__scroll">
              <!-- There is deliberately NO global <thead>. One header for nine categories
         forced every section to answer to the same three words, and "Quantity"
         means months here, nights there, and nothing at all in Fringe. Each
         category captions its own columns instead — see `columns` in
         src/data/lib-entry.mjs. The three columns that DON'T move (Amount, Work
         element, the row action) keep one name throughout, because the money
         column has to line up with the subtotals and the table foot. -->
              <table class="cbf-lct__table" aria-label="Line item budget cost lines">
                <tbody data-cat="personnel-salary">
                  <tr class="cbf-lct__cathead">
                    <th scope="colgroup" colspan="4">
                      <span class="stack" data-gap="3xs">
                        <span class="cbf-lct__cat-label">Personnel — Salary</span>
                        <span class="cbf-lct__note"
                          >Positions, never names, and one individual per line — two technicians are
                          two lines. Each line is a number of time units × the cost of one unit,
                          tested against the 12-month contract period.</span
                        >
                      </span>
                    </th>
                    <td class="cbf-lct__cell cbf-lct__cell--num">
                      <strong class="cbf-lct__money" data-cat-total="personnel-salary"
                        >$109,495</strong
                      >
                    </td>
                    <td class="cbf-lct__cell" colspan="2">
                      <esa-dropdown-menu
                        position="below-end"
                        data-add-menu="personnel-salary"
                        width="auto"
                      >
                        <span
                          class="esa-button esa-button--variant-primary esa-button--appearance-outline esa-button--sm"
                          ><button
                            class="esa-button__native typography-microcopy-xs"
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-controls="menu"
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
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                              </svg>
                            </span>
                            <span class="esa-button__label">Add line</span>
                          </button></span
                        >
                      </esa-dropdown-menu>
                    </td>
                  </tr>
                  <tr class="cbf-lct__colhead">
                    <th scope="col" class="cbf-lct__col-line">Position title</th>
                    <th scope="col" class="cbf-lct__col-qty">Number and time unit</th>
                    <th scope="col" class="cbf-lct__col-rate">Cost per unit</th>
                    <th scope="col" class="cbf-lct__col-fringe">Fringe</th>
                    <th scope="col" class="cbf-lct__col-num">Amount</th>
                    <th scope="col" class="cbf-lct__col-we">Work element</th>
                    <th scope="col" class="cbf-lct__col-act">
                      <span class="cbf-lct__sr">Row actions</span>
                    </th>
                  </tr>
                  <tr class="cbf-lct__blockhead" data-blockhead="technical">
                    <th scope="rowgroup" colspan="4">
                      <span class="stack" data-gap="2xs">
                        <span class="cbf-lct__block-label">Technical</span>
                      </span>
                    </th>
                    <td class="cbf-lct__cell cbf-lct__cell--num">
                      <span class="cbf-lct__money" data-block-total="personnel-salary:technical"
                        >$98,695</span
                      >
                    </td>
                    <td class="cbf-lct__cell"></td>
                    <td class="cbf-lct__cell cbf-lct__cell--act"></td>
                  </tr>
                  <tr
                    data-line="sal-1"
                    data-shape="qty-rate"
                    data-cat="personnel-salary"
                    data-block="technical"
                  >
                    <td class="cbf-lct__cell cbf-lct__cell--line">
                      <div class="cbf-lct__grab">
                        <span class="cbf-drag-handle" data-drag-handle="">
                          <span
                            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--xs esa-button--icon-only"
                            ><button
                              class="esa-button__native typography-microcopy-2xs"
                              type="button"
                              aria-label="Reorder Natural Resource Spec. 3 — press Space to lift it, then use the arrow keys"
                              title="Reorder Natural Resource Spec. 3 — press Space to lift it, then use the arrow keys"
                            >
                              <span class="esa-icon esa-icon--xs" aria-hidden="true">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  focusable="false"
                                >
                                  <line x1="4" x2="20" y1="6" y2="6"></line>
                                  <line x1="4" x2="20" y1="12" y2="12"></line>
                                  <line x1="4" x2="20" y1="18" y2="18"></line>
                                </svg>
                              </span></button
                          ></span>
                        </span>
                        <div class="stack" data-gap="3xs">
                          <span data-ident="label" hidden="">
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--label"
                              size="md"
                              data-field="label"
                              value="Natural Resource Spec. 3"
                              placeholder="Describe this cost line"
                              aria-label="Cost line description — Natural Resource Spec. 3"
                            ></esa-text-field>
                          </span>
                          <span data-ident="position">
                            <esa-combobox
                              class="cbf-lct__select"
                              size="md"
                              mode="autocomplete"
                              data-position-combo="true"
                              placeholder="Type a position title"
                              aria-label="Position title — Natural Resource Spec. 3"
                            ></esa-combobox>
                            <span data-position-err="" hidden="">
                              <p class="esa-field-error typography-body-xs">
                                <span class="esa-field-error__icon"
                                  ><span class="esa-icon esa-icon--xs" aria-hidden="true">
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      focusable="false"
                                    >
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <line x1="12" x2="12" y1="8" y2="12"></line>
                                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                    </svg>
                                  </span> </span
                                ><span class="visually-hidden">Error: </span
                                ><span class="esa-field-error__text"
                                  >Name the position this line pays for — the fringe line and any
                                  line that follows this position refer back to it.</span
                                >
                              </p>
                            </span> </span
                          ><!-- …and 2 more like this (<span>) -->
                          <span
                            class="cbf-lct__derived"
                            data-ident="derived"
                            data-cell="ident-derived"
                            hidden=""
                            >Natural Resource Spec. 3</span
                          >
                          <span class="cbf-lct__fact cbf-lct__fact--label" data-fact="label"
                            >Natural Resource Spec. 3</span
                          >
                          <span
                            class="cbf-lct__mark stack"
                            data-gap="3xs"
                            data-mark=""
                            data-sev=""
                            hidden=""
                          >
                            <span class="cluster" data-gap="2xs">
                              <span data-mark-sev="required">
                                <span
                                  class="esa-badge esa-badge--danger esa-badge--sm typography-microcopy-xs-strong"
                                >
                                  <span class="esa-badge__text">Required</span>
                                </span>
                              </span>
                              <span data-mark-sev="question">
                                <span
                                  class="esa-badge esa-badge--warning esa-badge--sm typography-microcopy-xs-strong"
                                >
                                  <span class="esa-badge__text">Question</span>
                                </span>
                              </span>
                              <span class="cbf-lct__mark-reason" data-mark-reason=""> </span>
                            </span>
                            <span class="cbf-lct__mark-note" data-mark-note=""> </span>
                            <span class="cbf-lct__note" data-mark-by=""> </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--qty">
                      <div class="stack" data-gap="2xs">
                        <span class="cluster cbf-lct__qty-chain" data-gap="2xs">
                          <span class="cluster" data-gap="2xs" data-qty-typed="">
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--qty"
                              size="md"
                              data-field="qty"
                              value="10.5"
                              aria-label="Quantity — Natural Resource Spec. 3"
                            ></esa-text-field>
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--unit"
                              size="md"
                              data-field="qtyUnit"
                              data-unit-open="true"
                              value="months"
                              placeholder="unit"
                              hidden=""
                              aria-label="Unit — Natural Resource Spec. 3"
                            ></esa-text-field>
                            <span data-unit-select="">
                              <esa-select
                                class="cbf-lct__select cbf-lct__select--unit"
                                size="md"
                                data-time-unit-select="true"
                                placeholder="months"
                                aria-label="Time unit — Natural Resource Spec. 3"
                              ></esa-select>
                            </span>
                            <span class="cbf-lct__unit" data-unit-locked="" hidden="">months</span>
                          </span>
                          <span data-qty-refollow="" hidden="">
                            <span
                              class="esa-button esa-button--variant-secondary esa-button--appearance-soft esa-button--xs"
                              ><button
                                class="esa-button__native typography-microcopy-2xs"
                                type="button"
                                data-refollow-qty="true"
                              >
                                <span class="esa-button__label">Follow again</span>
                              </button></span
                            >
                          </span>
                          <span class="cluster" data-gap="2xs" data-qty2="" hidden="">
                            <span class="cbf-lct__times" aria-hidden="true">×</span>
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--qty"
                              size="md"
                              data-field="qty2"
                              value=""
                              aria-label="Second quantity — Natural Resource Spec. 3"
                            ></esa-text-field>
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--unit"
                              size="md"
                              data-field="qty2Unit"
                              data-unit2-open="true"
                              value=""
                              placeholder="unit"
                              hidden=""
                              aria-label="Second unit — Natural Resource Spec. 3"
                            ></esa-text-field>
                            <span class="cbf-lct__unit" data-unit2-locked=""></span>
                          </span>
                        </span>
                        <span class="stack" data-gap="2xs" data-months-wrap="">
                          <span class="cluster" data-gap="2xs">
                            <span data-months="pass">
                              <span
                                class="esa-badge esa-badge--success esa-badge--md typography-microcopy-sm-strong"
                              >
                                <span class="esa-badge__text">Within contract period</span>
                              </span>
                            </span>
                            <span data-months="fail" hidden="">
                              <span
                                class="esa-badge esa-badge--danger esa-badge--md typography-microcopy-sm-strong"
                              >
                                <span class="esa-badge__text">Past contract period</span>
                              </span>
                            </span>
                          </span>
                          <span class="cbf-lct__note" data-months-note=""
                            >10.5 months of the 12-month contract period</span
                          >
                          <span data-months-err="" hidden="">
                            <p class="esa-field-error typography-body-xs">
                              <span class="esa-field-error__icon"
                                ><span class="esa-icon esa-icon--xs" aria-hidden="true">
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    focusable="false"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" x2="12" y1="8" y2="12"></line>
                                    <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                  </svg>
                                </span> </span
                              ><span class="visually-hidden">Error: </span
                              ><span class="esa-field-error__text"
                                >10.5 months is 10.5 months of work in a 12-month contract period —
                                one individual cannot be budgeted for more time than the contract
                                runs.</span
                              >
                            </p>
                          </span>
                        </span>
                        <span class="stack" data-gap="3xs" data-qty-derived="" hidden="">
                          <span class="cbf-lct__derived" data-cell="derived-qty">10.5 months</span>
                          <span class="cbf-lct__note" data-cell="derived-src"></span>
                          <span data-qty-detach="">
                            <span
                              class="esa-button esa-button--variant-secondary esa-button--appearance-soft esa-button--xs"
                              ><button
                                class="esa-button__native typography-microcopy-2xs"
                                type="button"
                                data-detach-qty="true"
                              >
                                <span class="esa-button__label"> Type your own </span>
                              </button></span
                            >
                          </span>
                        </span>
                        <span class="cbf-lct__fact" data-fact="qty">10.5 months</span>
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--rate" colspan="1">
                      <div class="stack" data-gap="2xs">
                        <esa-text-field
                          size="md"
                          prefix="$"
                          suffix="/month"
                          data-field="rate"
                          value="4,750"
                          aria-label="Cost per month — Natural Resource Spec. 3"
                          class="cbf-lct__field cbf-lct__field--rate cbf-lct__field--rate-unit"
                        ></esa-text-field>
                        <span class="cbf-lct__fact" data-fact="rate">$4,750</span>
                        <span class="stack" data-gap="2xs" data-cap-wrap="" hidden="">
                          <span data-cap="filed">
                            <span class="stack" data-gap="3xs">
                              <span class="cbf-lct__filed" data-cap-filed=""
                                >$4,750 per item — filed as .</span
                              >
                              <span class="cbf-lct__note" data-cap-why=""
                                >A supply — in the indirect base at 26.75%.</span
                              >
                            </span>
                          </span>
                          <span data-cap="override" hidden="">
                            <span class="stack" data-gap="2xs">
                              <span
                                class="esa-badge esa-badge--warning esa-badge--md typography-microcopy-sm-strong"
                              >
                                <span class="esa-badge__text">Overrides the threshold</span>
                              </span>
                              <span data-cap-err="">
                                <p class="esa-field-error typography-body-xs">
                                  <span class="esa-field-error__icon"
                                    ><span class="esa-icon esa-icon--xs" aria-hidden="true">
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        focusable="false"
                                      >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" x2="12" y1="8" y2="12"></line>
                                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                      </svg>
                                    </span> </span
                                  ><span class="visually-hidden">Error: </span
                                  ><span class="esa-field-error__text"
                                    >Filed as against the sort: at $4,750 per item the $5,000
                                    threshold makes this Capital Equipment. An override of the
                                    threshold needs the COR's agreement — say why on this
                                    line.</span
                                  >
                                </p>
                              </span>
                            </span>
                          </span>
                          <span data-cap-toggle="" hidden="">
                            <span
                              class="esa-button esa-button--variant-secondary esa-button--appearance-soft esa-button--xs"
                              ><button
                                class="esa-button__native typography-microcopy-2xs"
                                type="button"
                              >
                                <span class="esa-button__label">File as a supply instead</span>
                              </button></span
                            >
                          </span>
                        </span>
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--fringe">
                      <div class="cluster" data-gap="2xs" data-fringe="">
                        <esa-text-field
                          class="cbf-lct__field cbf-lct__field--pct"
                          size="md"
                          suffix="%"
                          data-field="fringePct"
                          value="35.1"
                          aria-label="Fringe rate — Natural Resource Spec. 3"
                        ></esa-text-field>
                        <span class="cbf-lct__fact" data-fact="fringe">35.1% fringe</span>
                        <span class="cbf-lct__derived cbf-lct__fringe-amt" data-fringe-note=""
                          >$17,506</span
                        >
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--num">
                      <strong class="cbf-lct__money" data-cell="amount">$49,875</strong>
                    </td>
                    <!-- …and 2 more like this (<td class="cbf-lct__cell cbf-lct__cell--line">) -->
                  </tr>
                  <tr
                    data-line="sal-2"
                    data-shape="qty-rate"
                    data-cat="personnel-salary"
                    data-block="technical"
                  >
                    <td class="cbf-lct__cell cbf-lct__cell--line">
                      <div class="cbf-lct__grab">
                        <span class="cbf-drag-handle" data-drag-handle="">
                          <span
                            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--xs esa-button--icon-only"
                            ><button
                              class="esa-button__native typography-microcopy-2xs"
                              type="button"
                              aria-label="Reorder Natural Resource Spec. 1 — press Space to lift it, then use the arrow keys"
                              title="Reorder Natural Resource Spec. 1 — press Space to lift it, then use the arrow keys"
                            >
                              <span class="esa-icon esa-icon--xs" aria-hidden="true">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  focusable="false"
                                >
                                  <line x1="4" x2="20" y1="6" y2="6"></line>
                                  <line x1="4" x2="20" y1="12" y2="12"></line>
                                  <line x1="4" x2="20" y1="18" y2="18"></line>
                                </svg>
                              </span></button
                          ></span>
                        </span>
                        <div class="stack" data-gap="3xs">
                          <span data-ident="label" hidden="">
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--label"
                              size="md"
                              data-field="label"
                              value="Natural Resource Spec. 1"
                              placeholder="Describe this cost line"
                              aria-label="Cost line description — Natural Resource Spec. 1"
                            ></esa-text-field>
                          </span>
                          <span data-ident="position">
                            <esa-combobox
                              class="cbf-lct__select"
                              size="md"
                              mode="autocomplete"
                              data-position-combo="true"
                              placeholder="Type a position title"
                              aria-label="Position title — Natural Resource Spec. 1"
                            ></esa-combobox>
                            <span data-position-err="" hidden="">
                              <p class="esa-field-error typography-body-xs">
                                <span class="esa-field-error__icon"
                                  ><span class="esa-icon esa-icon--xs" aria-hidden="true">
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      focusable="false"
                                    >
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <line x1="12" x2="12" y1="8" y2="12"></line>
                                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                    </svg>
                                  </span> </span
                                ><span class="visually-hidden">Error: </span
                                ><span class="esa-field-error__text"
                                  >Name the position this line pays for — the fringe line and any
                                  line that follows this position refer back to it.</span
                                >
                              </p>
                            </span> </span
                          ><!-- …and 2 more like this (<span>) -->
                          <span
                            class="cbf-lct__derived"
                            data-ident="derived"
                            data-cell="ident-derived"
                            hidden=""
                            >Natural Resource Spec. 1</span
                          >
                          <span class="cbf-lct__fact cbf-lct__fact--label" data-fact="label"
                            >Natural Resource Spec. 1</span
                          >
                          <span
                            class="cbf-lct__mark stack"
                            data-gap="3xs"
                            data-mark=""
                            data-sev=""
                            hidden=""
                          >
                            <span class="cluster" data-gap="2xs">
                              <span data-mark-sev="required">
                                <span
                                  class="esa-badge esa-badge--danger esa-badge--sm typography-microcopy-xs-strong"
                                >
                                  <span class="esa-badge__text">Required</span>
                                </span>
                              </span>
                              <span data-mark-sev="question">
                                <span
                                  class="esa-badge esa-badge--warning esa-badge--sm typography-microcopy-xs-strong"
                                >
                                  <span class="esa-badge__text">Question</span>
                                </span>
                              </span>
                              <span class="cbf-lct__mark-reason" data-mark-reason=""> </span>
                            </span>
                            <span class="cbf-lct__mark-note" data-mark-note=""> </span>
                            <span class="cbf-lct__note" data-mark-by=""> </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--qty">
                      <div class="stack" data-gap="2xs">
                        <span class="cluster cbf-lct__qty-chain" data-gap="2xs">
                          <span class="cluster" data-gap="2xs" data-qty-typed="">
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--qty"
                              size="md"
                              data-field="qty"
                              value="12"
                              aria-label="Quantity — Natural Resource Spec. 1"
                            ></esa-text-field>
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--unit"
                              size="md"
                              data-field="qtyUnit"
                              data-unit-open="true"
                              value="months"
                              placeholder="unit"
                              hidden=""
                              aria-label="Unit — Natural Resource Spec. 1"
                            ></esa-text-field>
                            <span data-unit-select="">
                              <esa-select
                                class="cbf-lct__select cbf-lct__select--unit"
                                size="md"
                                data-time-unit-select="true"
                                placeholder="months"
                                aria-label="Time unit — Natural Resource Spec. 1"
                              ></esa-select>
                            </span>
                            <span class="cbf-lct__unit" data-unit-locked="" hidden="">months</span>
                          </span>
                          <span data-qty-refollow="" hidden="">
                            <span
                              class="esa-button esa-button--variant-secondary esa-button--appearance-soft esa-button--xs"
                              ><button
                                class="esa-button__native typography-microcopy-2xs"
                                type="button"
                                data-refollow-qty="true"
                              >
                                <span class="esa-button__label">Follow again</span>
                              </button></span
                            >
                          </span>
                          <span class="cluster" data-gap="2xs" data-qty2="" hidden="">
                            <span class="cbf-lct__times" aria-hidden="true">×</span>
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--qty"
                              size="md"
                              data-field="qty2"
                              value=""
```
