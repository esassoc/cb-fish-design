# Contract CR-411206: 2019-402-00 Rock Creek Spring Chinook Su: markup, part 3 of 4

```html
                              aria-label="Second quantity — Natural Resource Spec. 1"
                            ></esa-text-field>
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--unit"
                              size="md"
                              data-field="qty2Unit"
                              data-unit2-open="true"
                              value=""
                              placeholder="unit"
                              hidden=""
                              aria-label="Second unit — Natural Resource Spec. 1"
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
                            >12 months of the 12-month contract period</span
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
                                >12 months is 12 months of work in a 12-month contract period — one
                                individual cannot be budgeted for more time than the contract
                                runs.</span
                              >
                            </p>
                          </span>
                        </span>
                        <span class="stack" data-gap="3xs" data-qty-derived="" hidden="">
                          <span class="cbf-lct__derived" data-cell="derived-qty">12 months</span>
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
                        <span class="cbf-lct__fact" data-fact="qty">12 months</span>
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--rate" colspan="1">
                      <div class="stack" data-gap="2xs">
                        <esa-text-field
                          size="md"
                          prefix="$"
                          suffix="/month"
                          data-field="rate"
                          value="3,100"
                          aria-label="Cost per month — Natural Resource Spec. 1"
                          class="cbf-lct__field cbf-lct__field--rate cbf-lct__field--rate-unit"
                        ></esa-text-field>
                        <span class="cbf-lct__fact" data-fact="rate">$3,100</span>
                        <span class="stack" data-gap="2xs" data-cap-wrap="" hidden="">
                          <span data-cap="filed">
                            <span class="stack" data-gap="3xs">
                              <span class="cbf-lct__filed" data-cap-filed=""
                                >$3,100 per item — filed as .</span
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
                                    >Filed as against the sort: at $3,100 per item the $5,000
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
                          aria-label="Fringe rate — Natural Resource Spec. 1"
                        ></esa-text-field>
                        <span class="cbf-lct__fact" data-fact="fringe">35.1% fringe</span>
                        <span class="cbf-lct__derived cbf-lct__fringe-amt" data-fringe-note=""
                          >$13,057</span
                        >
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--num">
                      <strong class="cbf-lct__money" data-cell="amount">$37,200</strong>
                    </td>
                    <!-- …and 2 more like this (<td class="cbf-lct__cell cbf-lct__cell--line">) -->
                  </tr>
                  <!-- …and 2 more like this (<tr>) -->
                  <tr class="cbf-lct__blockhead" data-blockhead="admin">
                    <th scope="rowgroup" colspan="4">
                      <span class="stack" data-gap="2xs">
                        <span class="cbf-lct__block-label">Administrative</span>
                      </span>
                    </th>
                    <td class="cbf-lct__cell cbf-lct__cell--num">
                      <span class="cbf-lct__money" data-block-total="personnel-salary:admin"
                        >$10,800</span
                      >
                    </td>
                    <td class="cbf-lct__cell"></td>
                    <td class="cbf-lct__cell cbf-lct__cell--act"></td>
                  </tr>
                  <tr
                    data-line="sal-4"
                    data-shape="qty-rate"
                    data-cat="personnel-salary"
                    data-block="admin"
                    data-flag="alloc"
                  >
                    <td class="cbf-lct__cell cbf-lct__cell--line">
                      <div class="cbf-lct__grab">
                        <span class="cbf-drag-handle" data-drag-handle="">
                          <span
                            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--xs esa-button--icon-only"
                            ><button
                              class="esa-button__native typography-microcopy-2xs"
                              type="button"
                              aria-label="Reorder Administrative Specialist — press Space to lift it, then use the arrow keys"
                              title="Reorder Administrative Specialist — press Space to lift it, then use the arrow keys"
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
                              value="Administrative Specialist"
                              placeholder="Describe this cost line"
                              aria-label="Cost line description — Administrative Specialist"
                            ></esa-text-field>
                          </span>
                          <span data-ident="position">
                            <esa-combobox
                              class="cbf-lct__select"
                              size="md"
                              mode="autocomplete"
                              data-position-combo="true"
                              placeholder="Type a position title"
                              aria-label="Position title — Administrative Specialist"
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
                            >Administrative Specialist</span
                          >
                          <span class="cbf-lct__fact cbf-lct__fact--label" data-fact="label"
                            >Administrative Specialist</span
                          >
                          <span
                            class="cbf-lct__mark stack"
                            data-gap="3xs"
                            data-mark=""
                            data-sev="required"
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
                              <span class="cbf-lct__mark-reason" data-mark-reason=""
                                >Work-element allocation incomplete</span
                              >
                            </span>
                            <span class="cbf-lct__mark-note" data-mark-note=""
                              >The Administrative Specialist carries no work-element allocation.
                              Split the 3 months across the elements the position actually supports
                              — 119 Manage and Administer at a minimum — so the cost lands somewhere
                              in the SOW.</span
                            >
                            <span class="cbf-lct__note" data-mark-by=""
                              >Marguerite Ozuna · 08/03/2026</span
                            >
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
                              value="3"
                              aria-label="Quantity — Administrative Specialist"
                            ></esa-text-field>
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--unit"
                              size="md"
                              data-field="qtyUnit"
                              data-unit-open="true"
                              value="months"
                              placeholder="unit"
                              hidden=""
                              aria-label="Unit — Administrative Specialist"
                            ></esa-text-field>
                            <span data-unit-select="">
                              <esa-select
                                class="cbf-lct__select cbf-lct__select--unit"
                                size="md"
                                data-time-unit-select="true"
                                placeholder="months"
                                aria-label="Time unit — Administrative Specialist"
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
                              aria-label="Second quantity — Administrative Specialist"
                            ></esa-text-field>
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--unit"
                              size="md"
                              data-field="qty2Unit"
                              data-unit2-open="true"
                              value=""
                              placeholder="unit"
                              hidden=""
                              aria-label="Second unit — Administrative Specialist"
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
                            >3 months of the 12-month contract period</span
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
                                >3 months is 3 months of work in a 12-month contract period — one
                                individual cannot be budgeted for more time than the contract
                                runs.</span
                              >
                            </p>
                          </span>
                        </span>
                        <span class="stack" data-gap="3xs" data-qty-derived="" hidden="">
                          <span class="cbf-lct__derived" data-cell="derived-qty">3 months</span>
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
                        <span class="cbf-lct__fact" data-fact="qty">3 months</span>
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--rate" colspan="1">
                      <div class="stack" data-gap="2xs">
                        <esa-text-field
                          size="md"
                          prefix="$"
                          suffix="/month"
                          data-field="rate"
                          value="3,600"
                          aria-label="Cost per month — Administrative Specialist"
                          class="cbf-lct__field cbf-lct__field--rate cbf-lct__field--rate-unit"
                        ></esa-text-field>
                        <span class="cbf-lct__fact" data-fact="rate">$3,600</span>
                        <span class="stack" data-gap="2xs" data-cap-wrap="" hidden="">
                          <span data-cap="filed">
                            <span class="stack" data-gap="3xs">
                              <span class="cbf-lct__filed" data-cap-filed=""
                                >$3,600 per item — filed as .</span
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
                                    >Filed as against the sort: at $3,600 per item the $5,000
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
                          aria-label="Fringe rate — Administrative Specialist"
                        ></esa-text-field>
                        <span class="cbf-lct__fact" data-fact="fringe">35.1% fringe</span>
                        <span class="cbf-lct__derived cbf-lct__fringe-amt" data-fringe-note=""
                          >$3,791</span
                        >
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--num">
                      <strong class="cbf-lct__money" data-cell="amount">$10,800</strong>
                    </td>
                    <!-- …and 2 more like this (<td class="cbf-lct__cell cbf-lct__cell--line">) -->
                  </tr>
                </tbody>
                <tbody data-cat="personnel-fringe">
                  <tr class="cbf-lct__cathead">
                    <th scope="colgroup" colspan="4">
                      <span class="stack" data-gap="3xs">
                        <span class="cbf-lct__cat-label">Personnel — Fringe</span>
                        <span class="cbf-lct__note"
                          >Generated from Personnel — Salary: one line per position, at the fringe
                          rate carried on that position’s salary line. Change the rate there and it
                          lands here.</span
                        >
                      </span>
                    </th>
                    <td class="cbf-lct__cell cbf-lct__cell--num">
                      <strong class="cbf-lct__money" data-cat-total="personnel-fringe"
                        >$36,945</strong
                      >
                    </td>
                    <td class="cbf-lct__cell" colspan="2">
                      <span class="cbf-lct__note">No lines are added here.</span>
                    </td>
                  </tr>
                  <tr class="cbf-lct__colhead">
                    <th scope="col" class="cbf-lct__col-line">Fringe on</th>
                    <th scope="col" class="cbf-lct__col-qty">
                      <span class="cbf-lct__sr">This section has no quantity column</span>
                    </th>
                    <th scope="col" class="cbf-lct__col-rate" colspan="2">Rate and base</th>
                    <th scope="col" class="cbf-lct__col-num">Amount</th>
                    <th scope="col" class="cbf-lct__col-we">Work element</th>
                    <th scope="col" class="cbf-lct__col-act">
                      <span class="cbf-lct__sr">Row actions</span>
                    </th>
                  </tr>
                  <tr
                    data-line="frg-natural-resource-spec-3"
                    data-shape="pct-of-base"
                    data-cat="personnel-fringe"
                    data-block=""
                  >
                    <td class="cbf-lct__cell cbf-lct__cell--line">
                      <div class="cbf-lct__grab">
                        <span class="cbf-lct__grab-void" aria-hidden="true"></span>
                        <div class="stack" data-gap="3xs">
                          <span data-ident="label" hidden="">
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--label"
                              size="md"
                              data-field="label"
                              value="Fringe — Natural Resource Spec. 3"
                              placeholder="Describe this cost line"
                              aria-label="Cost line description — Fringe — Natural Resource Spec. 3"
                            ></esa-text-field>
                          </span>
                          <span data-ident="position" hidden="">
                            <esa-combobox
                              class="cbf-lct__select"
                              size="md"
                              mode="autocomplete"
                              data-position-combo="true"
                              placeholder="Type a position title"
                              aria-label="Position title — Fringe — Natural Resource Spec. 3"
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
                            >Fringe — Natural Resource Spec. 3</span
                          >
                          <span class="cbf-lct__fact cbf-lct__fact--label" data-fact="label"
                            >Fringe — Natural Resource Spec. 3</span
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
                    <td class="cbf-lct__cell cbf-lct__cell--void">
                      <span class="cbf-lct__void-mark">No quantity</span>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--rate" colspan="2">
                      <div class="stack" data-gap="2xs">
                        <span class="cbf-lct__ref" data-cell="fringe-pct">35.1%</span>
                        <span class="cbf-lct__note" data-cell="fringe-src"
                          >Rate carried on the Natural Resource Spec. 3 salary line — change it
                          there.</span
                        >
                        <span class="cbf-lct__derived" data-cell="base"
                          >$49,875 base · Natural Resource Spec. 3</span
                        >
                      </div>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--num">
                      <strong class="cbf-lct__money" data-cell="amount">$17,506</strong>
                    </td>
                    <td class="cbf-lct__cell cbf-lct__cell--we">
                      <div class="stack" data-gap="2xs">
                        <span
                          class="cbf-lct__derived"
                          data-alloc-derived=""
                          title="B. 157 Collect/Generate/Validate Field and Lab Data — 40%
E. 60 Operate and Maintain Hatchery — 25%
A. 119 Manage and Administer Projects — 15%
C. 165 Produce Environmental Compliance Documentation — 10%
D. 185 Produce Pisces Status Report — 10%"
                          >B 40% · E 25% · A 15% · C 10% · D 10%</span
                        >
                        <span data-alloc-editor="" hidden="">
                          <span data-alloc-state="set">
                            <span
                              class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--md"
                              ><button
                                class="esa-button__native typography-microcopy-md"
                                type="button"
                                title="B. 157 Collect/Generate/Validate Field and Lab Data — 40%
E. 60 Operate and Maintain Hatchery — 25%
A. 119 Manage and Administer Projects — 15%
C. 165 Produce Environmental Compliance Documentation — 10%
D. 185 Produce Pisces Status Report — 10%"
                              >
                                <span class="esa-button__label">B · 40% +4</span>
                              </button></span
                            >
                          </span>
                          <span data-alloc-state="unset" hidden="">
                            <span
                              class="esa-button esa-button--variant-warning esa-button--appearance-outline esa-button--md"
                              ><button
                                class="esa-button__native typography-microcopy-md"
                                type="button"
                                title="B. 157 Collect/Generate/Validate Field and Lab Data — 40%
E. 60 Operate and Maintain Hatchery — 25%
A. 119 Manage and Administer Projects — 15%
C. 165 Produce Environmental Compliance Documentation — 10%
D. 185 Produce Pisces Status Report — 10%"
                              >
                                <span class="esa-button__label">B · 40% +4</span>
                              </button></span
                            >
                          </span>
                        </span>
                        <span
                          class="cbf-lct__fact"
                          data-fact="alloc"
                          title="B. 157 Collect/Generate/Validate Field and Lab Data — 40%
E. 60 Operate and Maintain Hatchery — 25%
A. 119 Manage and Administer Projects — 15%
C. 165 Produce Environmental Compliance Documentation — 10%
D. 185 Produce Pisces Status Report — 10%"
                          hidden=""
                          >B 40% · E 25% · A 15% · C 10% · D 10%</span
                        >
                        <span data-alloc-row-err="" hidden="">
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
                              >Follows Natural Resource Spec. 3 — allocate that position’s salary
                              lines and this follows.</span
                            >
                          </p>
                        </span>
                      </div>
                    </td>
                    <!-- …and 1 more like this (<td class="cbf-lct__cell cbf-lct__cell--line">) -->
                  </tr>
                  <tr
                    data-line="frg-natural-resource-spec-1"
                    data-shape="pct-of-base"
                    data-cat="personnel-fringe"
                    data-block=""
                  >
                    <td class="cbf-lct__cell cbf-lct__cell--line">
                      <div class="cbf-lct__grab">
                        <span class="cbf-lct__grab-void" aria-hidden="true"></span>
                        <div class="stack" data-gap="3xs">
                          <span data-ident="label" hidden="">
                            <esa-text-field
                              class="cbf-lct__field cbf-lct__field--label"
                              size="md"
                              data-field="label"
                              value="Fringe — Natural Resource Spec. 1"
                              placeholder="Describe this cost line"
                              aria-label="Cost line description — Fringe — Natural Resource Spec. 1"
                            ></esa-text-field>
                          </span>
                          <span data-ident="position" hidden="">
                            <esa-combobox
                              class="cbf-lct__select"
                              size="md"
                              mode="autocomplete"
                              data-position-combo="true"
                              placeholder="Type a position title"
                              aria-label="Position title — Fringe — Natural Resource Spec. 1"
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
```
