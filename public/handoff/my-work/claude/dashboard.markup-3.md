# Dashboard: markup, part 3 of 3

```html
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
                      <!-- Single action: this overlay is a quick preview. Processing the invoice
             (reviewing the documents + Line Item Budget and approving or returning)
             happens on the invoice's own page. EsaButton renders as a link; its href
             is set to the invoice's process page per record in populate(). -->
                      <div class="cbf-review-process" data-process="">
                        <span
                          class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
                          ><a
                            class="esa-button__native typography-microcopy-md"
                            href="#"
                            role="button"
                            ><span class="esa-icon esa-icon--md" aria-hidden="true">
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
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                              </svg>
                            </span>
                            <span class="esa-button__label">Process invoice</span></a
                          ></span
                        >
                      </div>
                    </aside>
                    <!-- Document (last child → fluid, left). A read-only preview of the submitted
           invoice so the COR can eyeball the bill from the queue. The full document
           workspace (Line Item Budget, backup files side by side, approve / return)
           lives on the invoice's Process page, not this preview. -->
                    <div class="cbf-review-docpane">
                      <div class="cbf-review-docpane__scroll">
                        <article
                          class="cbf-invoice-doc"
                          data-doc-view="invoice"
                          aria-label="Submitted invoice document"
                        >
                          <div class="cbf-invoice-doc__stamp" data-f-stamp="" hidden="">
                            Final invoice
                          </div>
                          <header class="cbf-invoice-doc__head">
                            <div>
                              <p class="cbf-invoice-doc__vendor" data-f-vendor-doc=""></p>
                              <p class="cbf-invoice-doc__sub">Vendor</p>
                            </div>
                            <div class="cbf-invoice-doc__meta">
                              <p>
                                <span>Invoice #</span>
                                <strong class="cbf-num" data-f-num-doc=""></strong>
                              </p>
                              <p><span>Date</span> <strong data-f-date=""></strong></p>
                            </div>
                          </header>
                          <div class="cbf-invoice-doc__billto">
                            <p class="cbf-invoice-doc__sub">Bill to</p>
                            <p data-f-billto=""></p>
                          </div>
                          <table class="cbf-invoice-doc__items">
                            <thead>
                              <tr>
                                <th scope="col">Description</th>
                                <th scope="col" class="cbf-num">Qty</th>
                                <th scope="col" class="cbf-num">Unit</th>
                                <th scope="col" class="cbf-num">Total</th>
                              </tr>
                            </thead>
                            <tbody data-f-items=""></tbody>
                            <tfoot>
                              <tr>
                                <th scope="row" colspan="3">Subtotal</th>
                                <td class="cbf-num" data-f-subtotal=""></td>
                              </tr>
                              <tr>
                                <th scope="row" colspan="3">Tax</th>
                                <td class="cbf-num" data-f-tax=""></td>
                              </tr>
                              <tr class="cbf-invoice-doc__total">
                                <th scope="row" colspan="3">Total</th>
                                <td class="cbf-num" data-f-total=""></td>
                              </tr>
                            </tfoot>
                          </table>
                          <p class="cbf-invoice-doc__memo" data-f-memo-wrap="" hidden="">
                            <span>Memo:</span> <span data-f-memo=""></span>
                          </p>
                          <p class="cbf-invoice-doc__generated" data-f-pdf=""></p>
                        </article>
                      </div>
                    </div>
                  </div>
                  <div slot="footer" class="cbf-review-footer repel">
                    <span class="cbf-review-footer__position" data-f-position=""></span>
                    <div class="cluster" data-gap="xs">
                      <span data-review-prev=""
                        ><span
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
                        ></span
                      >
                      <span data-review-next=""
                        ><span
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
                        ></span
                      >
                    </div>
                  </div>
                </esa-side-dialog>
              </section>
            </div>
          </div>
        </esa-tab-layout>
        <!-- script type="module" removed (0 bytes) -->
      </div>
    </div>
  </section>
</div>
```
