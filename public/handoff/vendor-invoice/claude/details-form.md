# Details form

Step 0 — the main data-entry form: contract reference, an auto-populated read-only project, invoice metadata (number, invoice date, performance start + end), the total amount with contract-balance validation, a final-invoice flag, supporting documents, and notes. The entire form is locked until a PDF is uploaded.

## Key decisions
- Contract is an esa-combobox (autocomplete over data-combobox-options JSON). Project is a DISABLED esa-text-field auto-populated from the selected contract (data-contract-projects) — it is read-only by design and must never be user-selectable.
- Dates use bcn-date-picker (a spoke component built on esa-text-field). The performance period is two separate fields — "Performance period — Start" and "— End" ([data-field="perf-start"]/[data-field="perf-end"]).
- Total amount ([data-field="total-amount"]) is validated against the contract’s remaining balance (data-contract-amounts). Exceeding it shows [data-step-error="total-exceeds"] with the remaining figure interpolated; an empty total shows [data-step-error="total"].
- Final invoice is a deliberate callout esa-checkbox ([data-final-invoice]). On Review, if the invoice looks final and the box is not set, the wizard opens the esa-confirm-dialog ([data-final-invoice-dialog]) to confirm before continuing.
- The line-items table is intentionally DORMANT — it is wrapped in a `<div hidden>`; the line-item breakdown lives in the uploaded PDF, not in the form. The markup is retained but never shown.
- Lock notice ([data-form-lock-notice]) shows until pdfEverLoaded. Supporting docs are deduplicated by filename before being added to supportingDocs[].

## Gotchas
- All [data-field="*"] controls are disabled until a PDF is uploaded — interacting before upload does nothing.
- The Project field is disabled on purpose — do not "fix" it to be editable; it is driven entirely by the chosen contract.
- The line items section is hidden — do not surface it without deliberately removing the `<div hidden>` wrapper and its global .cbf-line-item styles.
- Dates are parsed as yyyy-mm-dd (not via Date()) to avoid a UTC off-by-one day.
- esa-combobox / bcn-date-picker are web components — adding a NEW @esa/ecology import to this page requires clearing node_modules/.vite and restarting astro dev, or the fields render empty (504 Outdated Optimize Dep).

## Markup
```html
<div class="cbf-wizard-step" data-step="0">
  <h1 class="cbf-page-title">Invoice details</h1>
  <!-- Lock notice: hidden once a PDF has been uploaded -->
  <div class="cbf-form-lock" data-form-lock-notice="">
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
    <span class="cbf-form-lock__msg--wide"
      >Drop an invoice PDF on the right to unlock the form.</span
    >
    <span class="cbf-form-lock__msg--narrow"
      >Upload your invoice PDF to unlock the form.</span
    >
    <button type="button" class="cbf-form-lock__upload-btn" data-mobile-upload-btn="">
      <svg
        width="15"
        height="15"
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
      Upload Invoice
    </button>
  </div>
  <!-- Mobile PDF input: lives outside the notice so it survives after the notice is hidden -->
  <input
    type="file"
    accept=".pdf,application/pdf"
    class="cbf-mobile-pdf-input"
    data-mobile-upload-input=""
    tabindex="-1"
    aria-hidden="true"
  />
  <div class="cbf-form-fields">
    <esa-combobox
      mode="autocomplete"
      label="Contract"
      placeholder="Search contracts…"
      required="true"
      data-field="contract"
      data-combobox-options='[{"value":"CON-2024-0881","label":"CON-2024-0881 — Tributary Habitat Assessment"},{"value":"CON-2024-0903","label":"CON-2024-0903 — Salmon Passage Study"},{"value":"CON-2025-0112","label":"CON-2025-0112 — Water Quality Monitoring"},{"value":"CON-2025-0234","label":"CON-2025-0234 — Environmental Impact Review"}]'
      data-contract-amounts='{"CON-2024-0881":{"total":120000,"remaining":18500},"CON-2024-0903":{"total":85000,"remaining":85000},"CON-2025-0112":{"total":240000,"remaining":96000},"CON-2025-0234":{"total":60000,"remaining":12300}}'
      data-contract-projects='{"CON-2024-0881":"PRJ-0045 — Lower Columbia River Restoration","CON-2024-0903":"PRJ-0062 — Snake River Fish Passage","CON-2025-0112":"PRJ-0071 — Wetland Mitigation Banking","CON-2025-0234":"PRJ-0045 — Lower Columbia River Restoration"}'
      disabled=""
      size="md"
    ></esa-combobox>
    <esa-text-field
      label="Project"
      placeholder="Auto-populated from contract"
      disabled=""
      data-field="project"
      data-readonly="true"
      help-text="Read-only — determined by the selected contract."
      size="md"
    ></esa-text-field>
    <esa-text-field
      label="Invoice number"
      placeholder="e.g. INV-2026-0042"
      required=""
      data-field="invoice-number"
      disabled=""
      size="md"
    ></esa-text-field>
    <bcn-date-picker
      label="Invoice date"
      required="true"
      data-field="invoice-date"
      value="2026-07-13"
      disabled=""
    ></bcn-date-picker>
    <bcn-date-picker
      label="Performance period — Start"
      required="true"
      data-field="perf-start"
      disabled=""
    ></bcn-date-picker>
    <bcn-date-picker
      label="Performance period — End"
      required="true"
      data-field="perf-end"
      disabled=""
    ></bcn-date-picker>
    <esa-text-field
      label="Total amount (USD)"
      placeholder="e.g. 4,850.00"
      inputmode="decimal"
      required=""
      data-field="total-amount"
      help-text="Enter the total due, matching your uploaded invoice PDF."
      disabled=""
      size="md"
    ></esa-text-field>
    <div data-step-error="total" hidden="">
      <div class="esa-alert-box esa-alert-box--danger">
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
            <path d="M12 8v4"></path>
            <path d="M12 16h.01"></path>
          </svg>
        </div>
        <div class="esa-alert-box__body">
          <div class="esa-alert-box__message">Please enter the invoice total amount.</div>
        </div>
      </div>
    </div>
    <div data-step-error="total-exceeds" hidden="">
      <div class="esa-alert-box esa-alert-box--danger">
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
            <path d="M12 8v4"></path>
            <path d="M12 16h.01"></path>
          </svg>
        </div>
        <div class="esa-alert-box__body">
          <div class="esa-alert-box__message">
            This amount exceeds the
            <span data-remaining-amount="">remaining balance</span> remaining on this
            contract. Reduce the total, or contact your contract manager.
          </div>
        </div>
      </div>
    </div>
    <!-- Line items — hidden; the breakdown lives in the PDF. -->
    <div hidden="">
      <div class="cbf-line-items">
        <div class="cbf-line-items__head" aria-hidden="true">
          <span class="cbf-li-col--desc">Description</span>
          <span class="cbf-li-col--qty">Qty</span>
          <span class="cbf-li-col--price">Unit price</span>
          <span class="cbf-li-col--total">Total</span>
          <span class="cbf-li-col--action"></span>
        </div>
        <div class="cbf-line-items__body" data-line-items="">
          <div class="cbf-line-item" data-row="0">
            <input
              disabled=""
              class="cbf-li-input cbf-li-desc"
              type="text"
              placeholder="Description…"
              value=""
              data-li-field="description"
              data-li-idx="0"
            />
            <input
              disabled=""
              class="cbf-li-input cbf-li-qty"
              type="number"
              min="1"
              value="1"
              data-li-field="qty"
              data-li-idx="0"
              style="text-align: right"
            />
            <input
              disabled=""
              class="cbf-li-input cbf-li-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value=""
              data-li-field="unitPrice"
              data-li-idx="0"
              style="text-align: right"
            />
            <span class="cbf-li-total" data-li-total="0">$0.00</span>
            <button
              type="button"
              disabled=""
              class="cbf-li-remove"
              data-li-remove="0"
              aria-label="Remove line item"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div class="cbf-line-items__foot">
          <button type="button" class="cbf-add-row" data-add-line-item="" disabled="">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add line item
          </button>
          <div class="cbf-line-items__total">
            <span>Invoice total</span> <strong data-invoice-total="">$0.00</strong>
          </div>
        </div>
      </div>
      <div data-step-error="lineitems" hidden="">
        <div class="esa-alert-box esa-alert-box--danger">
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
              <path d="M12 8v4"></path>
              <path d="M12 16h.01"></path>
            </svg>
          </div>
          <div class="esa-alert-box__body">
            <div class="esa-alert-box__message">Please add at least one line item.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cbf-final-invoice" data-final-invoice-callout="">
      <esa-checkbox
        size="lg"
        label="This is the final invoice for this contract"
        data-field="final-invoice"
        data-final-invoice="true"
        disabled=""
      ></esa-checkbox>
    </div>
    <div class="cbf-support-docs-group">
      <p class="cbf-support-docs-group__label">
        Backup documents <span class="cbf-optional">(optional)</span>
      </p>
      <p class="cbf-support-docs-group__desc">
        Timesheets, receipts, reports, or other supporting files.
      </p>
      <div class="cbf-support-docs" data-docs-zone="">
        <div class="cbf-support-docs__list" data-docs-list=""></div>
        <button type="button" class="cbf-support-docs__add" data-docs-add="" disabled="">
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
          <span class="cbf-support-docs__add-text"
            ><strong>Drag documents here</strong> or click to browse</span
          >
        </button>
      </div>
      <input
        type="file"
        multiple=""
        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
        class="cbf-docs-input"
        data-docs-input=""
        tabindex="-1"
        aria-hidden="true"
      />
      <div data-docs-error="" hidden="">
        <div class="esa-alert-box esa-alert-box--danger">
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
              <path d="M12 8v4"></path>
              <path d="M12 16h.01"></path>
            </svg>
          </div>
          <div class="esa-alert-box__body">
            <div class="esa-alert-box__message"><span data-docs-error-msg=""></span></div>
          </div>
        </div>
      </div>
    </div>
    <esa-textarea
      label="Additional notes"
      placeholder="Any additional context for the payment processor…"
      rows="3"
      data-field="notes"
      disabled=""
      size="md"
    ></esa-textarea>
  </div>
  <div data-step-error="upload" hidden="">
    <div class="esa-alert-box esa-alert-box--danger">
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
          <path d="M12 8v4"></path>
          <path d="M12 16h.01"></path>
        </svg>
      </div>
      <div class="esa-alert-box__body">
        <div class="esa-alert-box__message">
          Please upload a PDF invoice before continuing.
        </div>
      </div>
    </div>
  </div>
  <div class="cbf-step-actions">
    <span data-wizard-cancel="">
      <span
        class="esa-button esa-button--color-danger esa-button--appearance-outline esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Cancel </span>
        </button>
      </span>
    </span>
    <span data-wizard-save-draft="">
      <span
        class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Save as draft </span>
        </button>
      </span>
    </span>
    <span data-wizard-next="">
      <span
        class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Review &amp; submit </span>
        </button>
      </span>
    </span>
  </div>
</div>
```

## Styles
```css
.esa-button {
  --_btn-height: var(--form-height-md, 40px);
  --_btn-padding-x: var(--form-padding-x-md, 16px);
  --_btn-font-size: var(--form-font-size-md, 14px);
  --_btn-radius: var(--form-radius-md, 6px);
  --_accent: var(--color-primary, #46a758);
  --_accent-hover: var(--color-primary-hover, #3e9b4f);
  --_on: var(--color-text-inverse, #ffffff);
  --_accent-text: var(--_accent);
  --_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);
  --_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);
  display: inline-block;
}
.esa-button--color-danger {
  --_accent: var(--color-danger);
  --_accent-hover: var(--color-danger-hover);
  --_accent-text: var(--color-danger-strong);
}
.esa-button__native {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200, 8px);
  width: 100%;
  height: var(--_btn-height);
  padding-inline: var(--_btn-padding-x);
  border: 1px solid transparent;
  border-radius: var(--_btn-radius);
  font-size: var(--_btn-font-size);
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: var(--font-weight-medium, 500);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--transition-fast, 0.15s ease),
    border-color var(--transition-fast, 0.15s ease);
  -webkit-appearance: none;
  appearance: none;
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button__label {
  white-space: nowrap;
}
.esa-button--color-secondary {
  --_accent: var(--color-secondary);
  --_accent-hover: var(--color-secondary-hover);
  --_on: var(--color-secondary-on-fill, var(--color-gray-12));
  --_accent-text: var(--color-secondary-strong);
}
.esa-button--color-primary {
  --_accent-text: var(--color-primary-strong);
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: transparent;
}
.cbf-page-title {
  margin: 0 0 var(--spacing-400);
  font-family: var(--font-display);
  font-weight: var(--font-weight-medium);
  font-size: 40px;
  line-height: 1;
  letter-spacing: -1px;
  color: var(--color-surface-inverse);
}
.cbf-form-lock {
  display: flex;
  align-items: center;
  gap: var(--spacing-250);
  margin-bottom: var(--spacing-500);
  padding: var(--spacing-300) var(--spacing-400);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  background: var(--color-surface-sunken, #f8f9fb);
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.4;
}
.cbf-form-lock svg {
  flex: none;
  color: var(--color-text-muted);
}
.cbf-form-lock[hidden],
.cbf-form-lock__msg--narrow,
.cbf-form-lock__upload-btn {
  display: none;
}
.cbf-mobile-pdf-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
.cbf-form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-500);
}
.cbf-final-invoice {
  padding: var(--spacing-400) var(--spacing-450, var(--spacing-400));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  background: var(--color-surface-sunken, #f8f9fb);
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    box-shadow 0.15s ease;
}
.cbf-support-docs-group__label {
  margin: 0 0 var(--spacing-050);
  font-size: var(--type-size-200, 13px);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}
.cbf-optional {
  font-size: 13px;
  font-weight: var(--font-weight-regular);
  color: var(--color-text-muted);
}
.cbf-support-docs-group__desc {
  margin: 0 0 var(--spacing-300);
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
}
.cbf-support-docs {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  overflow: hidden;
  transition:
    border-color 0.12s ease,
    background 0.12s ease;
}
.cbf-support-docs__add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200);
  font-size: 14px;
  color: var(--color-text-secondary);
  padding: var(--spacing-400);
  width: 100%;
  transition:
    background 0.12s ease,
    color 0.12s ease;
}
.cbf-support-docs__add svg {
  flex: none;
  color: var(--color-secondary);
}
.cbf-support-docs__add-text strong {
  font-weight: var(--font-weight-semibold);
  color: var(--color-secondary);
}
.cbf-docs-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
.cbf-step-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  margin-top: var(--spacing-700);
  padding-top: var(--spacing-500);
  border-top: 1px solid var(--color-border);
}
.cbf-step-actions [data-wizard-save-draft] {
  margin-left: auto;
}
.cbf-support-docs__add:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

## Tokens
- `--color-border`: #dcdcdc _(semantic)_
- `--color-danger`: #e5484d _(semantic)_
- `--color-danger-hover`: #dc3e42 _(semantic)_
- `--color-danger-strong`: #ce2c31 _(semantic)_
- `--color-gray-12`: #202020 _(primitive)_
- `--color-primary`: #1e5386 _(semantic)_
- `--color-primary-hover`: #1a4570 _(semantic)_
- `--color-primary-strong`: #2a7e3b _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
- `--color-secondary-hover`: #1e5386 _(semantic)_
- `--color-secondary-on-fill`: #203c25 _(semantic)_
- `--color-secondary-strong`: #1c4a76 _(semantic)_
- `--color-surface-inverse`: #13273e _(semantic)_
- `--color-surface-sunken`: #f3f7fc _(semantic)_
- `--color-text-inverse`: #fcfcfc _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--font-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(primitive)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--font-weight-regular`: 400 _(primitive)_
- `--font-weight-semibold`: 600 _(primitive)_
- `--form-font-size-md`: clamp(.75rem, .66rem + .44vw, .9375rem) _(component)_
- `--form-height-md`: 40px _(component)_
- `--form-padding-x-md`: .75rem _(component)_
- `--form-radius-md`: .5rem _(component)_
- `--radius-100`: .25rem _(primitive)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-700`: 3rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
