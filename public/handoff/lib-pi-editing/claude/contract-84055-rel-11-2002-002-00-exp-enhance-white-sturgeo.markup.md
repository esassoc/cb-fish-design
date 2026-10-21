# Contract 84055 REL 11: 2002-002-00 EXP ENHANCE WHITE STURGEO: markup

```html
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
        <li class="esa-breadcrumbs__item">
          <span class="esa-breadcrumbs__current typography-label-md"> Projects </span>
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
        <!-- …and 4 more like this (<li class="esa-breadcrumbs__item">) -->
      </ol>
    </nav>
  </div>
  <div class="cbf-app-panel__body">
    <div class="cbf-app-panel__content">
      <section class="cbf-lipd stack" data-gap="md" data-lipd="">
        <!-- The editing-state banner lives in the Prototype settings bar (cbf-doc-demo-controls),
       not here — LIB/PI editing is a rare action and shouldn't occupy the contract. -->
        <!-- The full contract tab strip is built by the script from CONTRACT_TABS; only
       Documents & Workflow are enabled, and the two panels below are re-slotted to
       their live index (it shifts when a contract manager loses the COR-only tabs). -->
        <!-- script type="module" removed (564 bytes) --><esa-tab-layout
          data-lipd-tabs="true"
          active-index="0"
          size="md"
          appearance="underline"
          variant="underline"
        >
          <!-- ═══════════════ Summary (enabled — default) ═══════════════ -->
          <div data-panel="summary" slot="panel-0" class="cbf-lipd__panel stack" data-gap="md">
            <div class="cbf-summary stack" data-gap="md" data-contract-summary="">
              <!-- Title + report/expand controls (mirrors the live Summary header row) -->
              <div class="cbf-summary__head">
                <h2 class="cbf-summary__title">
                  Contract 84055 REL 11: 2002-002-00 EXP ENHANCE WHITE STURGEON HABITAT
                </h2>
                <div class="cbf-summary__actions">
                  <span data-sow-report=""
                    ><span
                      class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--sm"
                      ><button class="esa-button__native typography-microcopy-xs" type="button">
                        <span class="esa-button__label">SOW Report</span>
                      </button></span
                    ></span
                  >
                  <span data-expand-all=""
                    ><span
                      class="esa-button esa-button--variant-secondary esa-button--appearance-ghost esa-button--sm"
                      ><button class="esa-button__native typography-microcopy-xs" type="button">
                        <span class="esa-button__label">Expand All</span>
                      </button></span
                    ></span
                  >
                  <span data-collapse-all=""
                    ><span
                      class="esa-button esa-button--variant-secondary esa-button--appearance-ghost esa-button--sm"
                      ><button class="esa-button__native typography-microcopy-xs" type="button">
                        <span class="esa-button__label">Collapse All</span>
                      </button></span
                    ></span
                  >
                </div>
              </div>
              <!-- ═══ Basics (expanded) ═══ -->
              <details class="esa-collapsible" open="">
                <summary class="esa-collapsible__summary typography-label-sm-strong">
                  <span class="esa-collapsible__title">Basics</span>
                </summary>
                <div class="esa-collapsible__body typography-body-md">
                  <p class="cbf-summary__modified typography-meta">
                    Last modified by Virgil Watts III, 03/13/2024 12:56 PM
                  </p>
                  <div class="cbf-summary__basics">
                    <div class="cbf-summary__basics-main">
                      <dl class="cbf-summary__dl">
                        <dt>Project Number</dt>
                        <dd><a class="cbf-doc-link" href="#">2002-002-00</a></dd>
                        <dt>Project Title</dt>
                        <dd>Kootenai River Habitat Restoration Program</dd>
                        <dt>BPA PM</dt>
                        <dd>Elizabeth Santana</dd>
                        <dt>Project Stage</dt>
                        <dd>Implementation</dd>
                        <dt>Project Area</dt>
                        <dd>
                          <table class="cbf-summary__subtable">
                            <thead>
                              <tr>
                                <th>Province</th>
                                <th>Subbasin</th>
                                <th>%</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Mountain Columbia</td>
                                <td>Kootenai</td>
                                <td>100.00%</td>
                              </tr>
                            </tbody>
                          </table>
                        </dd>
                        <dt>Contract Number</dt>
                        <dd>84055 REL 11</dd>
                        <dt>Contract Title</dt>
                        <dd>2002-002-00 EXP ENHANCE WHITE STURGEON HABITAT</dd>
                        <dt>Contract Continuation</dt>
                        <dd>
                          <table class="cbf-summary__subtable">
                            <thead>
                              <tr>
                                <th>Previous</th>
                                <th>Will be renewed</th>
                                <th>Next</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <span class="cbf-doc-link"
                                    >84055 REL 3: 2002-002-00 EXP ENHANCE WHITE STURGEON
                                    HABITAT</span
                                  >
                                </td>
                                <td>Yes</td>
                                <td>
                                  <span class="cbf-doc-link"
                                    >84055 REL 20: 2002-002-00 ENHANCE WHITE STURGEON HABITAT</span
                                  >
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </dd>
                        <dt>Contract Status</dt>
                        <dd>Issued</dd>
                        <dt>Contract Description</dt>
                        <dd>
                          <p class="cbf-summary__desc-lede">
                            Kootenai River Habitat Restoration Program (KRHRP) - Project 200200200
                          </p>
                          <p class="cbf-summary__desc">
                            During FY 2024/2025, KTOI plans to partner with USFWS Kootenai National
                            Wildlife Refuge (NWR) to reconnect floodplain habitat. As part of a
                            large scale habitat restoration project across the Kootenai NWR,
                            improvements to Riverside Road, including raising the elevation, must be
                            addressed to allow the greater habitat restoration to occur. KTOI has
                            proposed that BPA allow use of KTOI's mitigation portfolio to fund the
                            Riverside Road Improvement Project with the Federal Highways and
                            Boundary County. With the combined package of Riverside Road and the
                            habitat restoration project across the Refuge, KTOI, USFWS, Federal
                            Highways, and Boundary County are now working together under and
                            Memorandum of Agreement to bring the project to full implementation in
                            2025. All road design and construction requirements will be under the
                            direction of Federal Highways and Boundary County.
                          </p>
                        </dd>
                        <dt>Account Type(s)</dt>
                        <dd>Expense</dd>
                        <dt>Contract Start Date</dt>
                        <dd>05/01/2024</dd>
                        <dt>Contract End Date</dt>
                        <dd>04/30/2026</dd>
                        <dt>Current Contract Value</dt>
                        <dd>$17,461,219</dd>
                        <dt>Expenditures</dt>
                        <dd>
                          $16,835,615<span class="typography-meta cbf-summary__note"
                            >* Expenditures data includes accruals and are based on data through
                            30-Jun-2026.</span
                          >
                        </dd>
                        <dt>BPA CO</dt>
                        <dd><a class="cbf-doc-link" href="#">Daniel Affonso</a></dd>
                        <dt>BPA COR</dt>
                        <dd><a class="cbf-doc-link" href="#">Elizabeth Santana</a></dd>
                        <dt>Env. Compliance Lead</dt>
                        <dd><a class="cbf-doc-link" href="#">Edward Gresh</a></dd>
                        <dt>Contract Contractor</dt>
                        <dd><a class="cbf-doc-link" href="#">Kootenai Tribe - KOOTENAI00</a></dd>
                        <dt>Work Order Task(s)</dt>
                        <dd><a class="cbf-doc-link" href="#">WO: 00103073, Task: 1</a></dd>
                        <dt>Contract Type</dt>
                        <dd>Coop</dd>
                        <dt>Accrual category</dt>
                        <dd>Habitat Improvement</dd>
                        <dt>Pricing Method</dt>
                        <dd>Cost Reimbursement (CNF)</dd>
                      </dl>
                    </div>
                    <div class="cbf-summary__map" aria-hidden="true">
                      <div class="cbf-summary__map-canvas">
                        <svg
                          viewBox="0 0 24 24"
                          width="26"
                          height="26"
                          fill="var(--color-background-brand)"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
                          ></path>
                        </svg>
                      </div>
                      <p class="cbf-summary__map-cap typography-meta">
                        Click the map to see this Contract's location details.
                      </p>
                    </div>
                  </div>
                </div>
              </details>
              <!-- ═══ Collapsed sections ═══ -->
              <details class="esa-collapsible">
                <summary class="esa-collapsible__summary typography-label-sm-strong">
                  <span class="esa-collapsible__title">Photos</span>
                </summary>
                <div class="esa-collapsible__body typography-body-md">
                  <div class="esa-empty-state esa-empty-state--sm">
                    <h3 class="esa-empty-state__title typography-label-sm-strong">No photos</h3>
                    <p class="esa-empty-state__description typography-body-xs">
                      No photos have been added to this contract.
                    </p>
                    <div class="esa-empty-state__actions typography-label-md"></div>
                  </div>
                </div>
              </details>
              <!-- …and 7 more like this (<details class="esa-collapsible">) -->
            </div>
          </div>
          <!-- ═══════════════ Documents (enabled) ═══════════════ -->
          <div data-panel="documents" slot="panel-7" class="cbf-lipd__panel stack" data-gap="md">
            <p class="cbf-lipd__intro">
              Use this area to store and manage document attachments relevant to this contract. When
              a replacement clears an approval the Contracting Officer's Representative (COR) has
              given, the COR is notified by email automatically.
            </p>
            <div class="cbf-lipd__toolbar repel">
              <span class="typography-meta">
                Viewing 4 of 60 attached documents — filtered to Line Item Budget &amp; Property
                Inventory (the transmittal memo and design report are shown for contrast).
              </span>
              <span data-add-doc="">
                <span
                  class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
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
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </span>
                    <span class="esa-button__label">Add…</span>
                  </button></span
                >
              </span>
            </div>
            <div class="cbf-lipd__doctable">
              <table class="cbf-doc-table">
                <thead>
                  <tr>
                    <th class="cbf-doc-table__menu-col">
                      <span class="visually-hidden">Actions</span>
                    </th>
                    <th>Title</th>
                    <th>File</th>
                    <!-- …and 5 more like this (<th>) -->
                  </tr>
                </thead>
                <tbody>
                  <tr data-doc-row="lib-budget">
                    <td class="cbf-doc-table__menu-col">
                      <esa-dropdown-menu
                        data-doc-menu="lib-budget"
                        position="below-start"
                        data-edit-reason=""
                        width="auto"
                      >
                        <span
                          class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--sm esa-button--icon-only"
                          ><button
                            class="esa-button__native typography-microcopy-xs"
                            type="button"
                            aria-label="Actions for CR-365847 1 Budget"
                            title="Actions for CR-365847 1 Budget"
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
                                <line x1="4" x2="20" y1="6" y2="6"></line>
                                <line x1="4" x2="20" y1="12" y2="12"></line>
                                <line x1="4" x2="20" y1="18" y2="18"></line>
                              </svg>
                            </span></button
                        ></span>
                      </esa-dropdown-menu>
                    </td>
                    <td class="cbf-doc-table__title" data-cell="title">CR-365847 1 Budget</td>
                    <td>
                      <a class="cbf-doc-link" href="#" data-cell="file">CR-365847 1 Budget.xlsx</a>
                    </td>
                    <td class="cbf-num" data-cell="size">137.4 KB</td>
                    <td>Line Item Budget: Contract Budget</td>
                    <td data-cell="uploaded">3/19/2024 11:00 AM</td>
                    <!-- …and 2 more like this (<td>) -->
                  </tr>
                  <tr data-doc-row="pi-inventory">
                    <td class="cbf-doc-table__menu-col">
                      <esa-dropdown-menu
                        data-doc-menu="pi-inventory"
                        position="below-start"
                        data-edit-reason=""
                        width="auto"
                      >
                        <span
                          class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--sm esa-button--icon-only"
                          ><button
                            class="esa-button__native typography-microcopy-xs"
                            type="button"
                            aria-label="Actions for Property Inventory Contract 84055 REL11 (CCR52535)"
                            title="Actions for Property Inventory Contract 84055 REL11 (CCR52535)"
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
                                <line x1="4" x2="20" y1="6" y2="6"></line>
                                <line x1="4" x2="20" y1="12" y2="12"></line>
                                <line x1="4" x2="20" y1="18" y2="18"></line>
                              </svg>
                            </span></button
                        ></span>
                      </esa-dropdown-menu>
                    </td>
                    <td class="cbf-doc-table__title" data-cell="title">
                      Property Inventory Contract 84055 REL11 (CCR52535)
                    </td>
                    <td>
                      <a class="cbf-doc-link" href="#" data-cell="file"
                        >2002-002-00_Inventory_84055 REL11_CCR52535.xlsx</a
                      >
                    </td>
                    <td class="cbf-num" data-cell="size">19.1 KB</td>
                    <td>Property Inventory</td>
                    <td data-cell="uploaded">5/15/2025 3:20 PM</td>
                    <!-- …and 2 more like this (<td>) -->
                  </tr>
                  <!-- …and 2 more like this (<tr>) -->
                </tbody>
              </table>
            </div>
          </div>
          <!-- ═══════════════ Workflow (enabled) ═══════════════ -->
          <div data-panel="workflow" slot="panel-5" class="cbf-lipd__panel stack" data-gap="md">
            <div class="cbf-lipd__status repel">
              <div class="cbf-lipd__status-facts">
                <span>Contract status: <strong>Issued</strong></span>
                <span>Last SOW action: <span>SubmitToCOR by Brandon Diller, 5/15/2025</span></span>
              </div>
              <div class="cbf-lipd__status-rev">
                <esa-select data-sow-rev="true" label="SOW revision" size="sm"></esa-select>
              </div>
            </div>
            <h3 class="typography-heading-md">Document approval</h3>
            <div data-appr-readonly="" hidden="">
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
                    >Original requisition — read-only</strong
                  >
                  <div class="esa-alert-box__message">
                    These approvals are the finalized record of the original contract requisition
                    (SOW revision 1) and can't be changed. Switch to the CCR revision to work the
                    current documents.
                  </div>
                </div>
              </div>
            </div>
            <div class="cbf-lipd__scroll">
              <table class="cbf-appr-table">
                <thead>
                  <tr>
                    <th>Required documents</th>
                    <th>Attached date</th>
                    <!-- …and 5 more like this (<th>) -->
                  </tr>
                </thead>
                <tbody data-appr-body="">
                  <tr class="">
                    <th scope="row">Line Item Budget</th>
                    <td>3/19/2024 11:00 AM</td>
                    <td>
                      <span class="cbf-check" title="Approved by EC on 5/12/2025"
                        ><svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        5/12/2025</span
                      >
                    </td>
                    <!-- …and 4 more like this (<td>) -->
                  </tr>
                  <tr class="">
                    <th scope="row">Property Inventory</th>
                    <td>5/15/2025 3:20 PM</td>
                    <td>
                      <span class="cbf-check" title="Approved by EC on 5/12/2025"
                        ><svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        5/12/2025</span
                      >
                    </td>
                    <!-- …and 4 more like this (<td>) -->
                  </tr>
                  <!-- …and 2 more like this (<tr>) -->
                </tbody>
              </table>
            </div>
            <h3 class="typography-heading-md">Workflow history</h3>
            <div class="cbf-lipd__scroll">
              <table class="cbf-hist-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Step</th>
                    <!-- …and 3 more like this (<th>) -->
                  </tr>
                </thead>
                <tbody data-history="">
                  <tr>
                    <td>05/15/2025 3:20 PM</td>
                    <td>SubmitToCOR</td>
                    <!-- …and 2 more like this (<td>) -->
                    <td class="cbf-hist-table__status">
                      Line Item Budget - Attached - COR Approval = Green Property Inventory -
                      Attached - COR Approval = Green Transmittal Memo - Attached - COR Approval =
                      Green
                    </td>
                  </tr>
                  <tr>
                    <td>05/13/2025 9:41 AM</td>
                    <td>DocumentAttached</td>
                    <!-- …and 2 more like this (<td>) -->
                    <td class="cbf-hist-table__status"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </esa-tab-layout>
        <!-- ── Edit-properties dialog (the real modal, with the supportive fixes) ── -->
        <esa-dialog
          data-edit-dialog="true"
          size="lg"
          heading="View and edit the properties of this attachment"
        >
          <div class="cbf-edit stack" data-gap="md">
            <p class="cbf-edit__lede">
              Replace the file or adjust its properties. Everything you don't change is kept exactly
              as it is — including approvals, unless you upload a new file.
            </p>
            <section class="cbf-edit__section">
              <span class="cbf-edit__num" aria-hidden="true">1</span>
              <div class="cbf-edit__fields">
                <div class="cbf-edit__specs">
                  <div>
                    <span class="cbf-edit__label">Type</span><strong data-ed-type=""></strong>
                  </div>
                  <div>
                    <span class="cbf-edit__label">Subtype</span><strong data-ed-subtype=""></strong>
                  </div>
                  <div>
                    <span class="cbf-edit__label">WE ref</span><strong data-ed-weref=""></strong>
                  </div>
                </div>
                <p class="cbf-edit__guidance typography-meta" data-ed-guidance=""></p>
              </div>
            </section>
            <section class="cbf-edit__section">
              <span class="cbf-edit__num" aria-hidden="true">2</span>
              <div class="cbf-edit__fields stack" data-gap="sm">
                <p class="cbf-edit__file">
                  Current file: <a href="#" class="cbf-doc-link" data-ed-file=""></a>
                  <span class="typography-meta" data-ed-size=""></span>
                </p>
                <div data-ed-upload-slot="">
                  <esa-file-upload
                    data-ed-upload="true"
                    label="Replace the file"
                    accept=".xls,.xlsx,.doc,.docx,.pdf"
                    max-size-mb="5"
                    name="files"
                  ></esa-file-upload>
                </div>
                <p class="typography-meta">
                  Uploading a new file replaces the current one when you save — the title, type,
                  authors, and sharing below all stay put.
                </p>
                <p class="cbf-edit__newfile" data-ed-newfile="" hidden=""></p>
                <div data-ed-warning="" hidden="">
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
                        >Replacing this file clears its approvals</strong
                      >
                      <div class="esa-alert-box__message">
                        <span data-ed-warning-text=""></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- …and 2 more like this (<section class="cbf-edit__section">) -->
            <div class="cbf-edit__history">
              <div>
                <span class="cbf-edit__label">Original upload</span><span data-ed-orig=""></span>
              </div>
              <div>
                <span class="cbf-edit__label">Original uploaded by</span
                ><span data-ed-origby=""></span>
              </div>
              <!-- …and 2 more like this (<div>) -->
            </div>
          </div>
          <div slot="footer" class="cbf-edit__footer">
            <span class="typography-meta" data-save-hint="">
              Nothing to save yet — replace the file or edit a property to enable Save.
            </span>
            <span data-ed-cancel=""
              ><span
                class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--md"
                ><button class="esa-button__native typography-microcopy-md" type="button">
                  <span class="esa-button__label">Cancel</span>
                </button></span
              ></span
            >
            <span data-ed-save=""
              ><span
                class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md esa-button--disabled"
                ><button
                  class="esa-button__native typography-microcopy-md"
                  type="button"
                  disabled=""
                >
                  <span class="esa-button__label">Save</span>
                </button></span
              ></span
            >
          </div>
        </esa-dialog>
        <!-- ── COR notification dialog (shows the email that was just sent) ── -->
        <esa-dialog data-email-dialog="true" size="md" heading="The COR has been notified">
          <div class="stack" data-gap="sm">
            <p>
              Because <strong data-em-doc-title=""></strong> was already approved by the COR,
              replacing it cleared that approval — this email went out automatically:
            </p>
            <div data-em-preview=""></div>
          </div>
          <div slot="footer" class="cbf-edit__footer">
            <span data-em-close=""
              ><span
                class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
                ><button class="esa-button__native typography-microcopy-md" type="button">
                  <span class="esa-button__label">Done</span>
                </button></span
              ></span
            >
          </div>
        </esa-dialog>
        <!-- Cloneable email envelope — the single source of the email-card markup. -->
        <template data-email-template="">
          <article class="cbf-email" data-astro-cid-se44uqys="">
            <header class="cbf-email__head" data-astro-cid-se44uqys="">
              <div data-astro-cid-se44uqys="">
                <span class="cbf-email__label" data-astro-cid-se44uqys="">From</span
                ><span data-em-from="" data-astro-cid-se44uqys=""></span>
              </div>
              <div data-astro-cid-se44uqys="">
                <span class="cbf-email__label" data-astro-cid-se44uqys="">To</span
                ><span data-em-to="" data-astro-cid-se44uqys=""></span>
              </div>
              <div data-astro-cid-se44uqys="">
                <span class="cbf-email__label" data-astro-cid-se44uqys="">Sent</span
                ><span data-em-sent="" data-astro-cid-se44uqys=""></span>
              </div>
              <div class="cbf-email__subject" data-astro-cid-se44uqys="">
                <span class="cbf-email__label" data-astro-cid-se44uqys="">Subject</span
                ><strong data-em-subject="" data-astro-cid-se44uqys=""></strong>
              </div>
            </header>
            <div class="cbf-email__body" data-astro-cid-se44uqys="">
              <p data-em-p1="" data-astro-cid-se44uqys=""></p>
              <p data-em-p2="" data-astro-cid-se44uqys=""></p>
              <p class="cbf-email__meta" data-em-meta="" data-astro-cid-se44uqys=""></p>
            </div>
            <footer class="cbf-email__foot typography-meta" data-astro-cid-se44uqys="">
              System-generated notification · cbfish.org · do not reply
            </footer>
          </article>
        </template>
      </section>
      <!-- script type="module" removed (0 bytes) -->
    </div>
  </div>
</section>
```
