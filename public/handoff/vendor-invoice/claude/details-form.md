# Details form

Vendor invoice submission · source prototype: https://esassoc.github.io/cb-fish-design/vendor-invoice/

![Details form, desktop](https://esassoc.github.io/cb-fish-design/handoff/vendor-invoice/claude/details-form.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/vendor-invoice/claude/details-form.phone.png

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

## Components

- `cbf-add-row` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-docs-input` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-final-invoice` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-form-fields` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-form-lock` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-li-input` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-li-price` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-li-qty` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-li-remove` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-li-total` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-line-item` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-line-items` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-mobile-pdf-input` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-optional` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-page-title` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-step-actions` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-support-docs` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `cbf-support-docs-group` (spoke) · `src/components/vendor-invoice/cbf-invoice-step-details.astro`
- `esa-alert-box` (hub) · `packages/ecology/src/components/esa-alert-box.astro`
- `esa-button` (hub) · `packages/ecology/src/components/esa-button.astro`
- `esa-checkbox` (hub) · `packages/ecology/src/components/esa-checkbox.ts`
- `esa-combobox` (hub) · `packages/ecology/src/components/esa-combobox.ts`
- `esa-text-field` (hub) · `packages/ecology/src/components/esa-text-field.ts`
- `esa-textarea` (hub) · `packages/ecology/src/components/esa-textarea.ts`

## Behavior

- `src/components/vendor-invoice/invoice-wizard.client.ts`

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
    <span class="cbf-form-lock__msg--narrow">Upload your invoice PDF to unlock the form.</span>
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
    style=""
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
      value="2026-10-21"
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
      <div class="esa-alert-box esa-alert-box--danger typography-body-sm">
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
      <div class="esa-alert-box esa-alert-box--danger typography-body-sm">
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
            <span data-remaining-amount="">remaining balance</span> remaining on this contract.
            Reduce the total, or contact your contract manager.
          </div>
        </div>
      </div>
    </div>
    <!-- Line items — hidden; the breakdown lives in the PDF. -->
    <div hidden="">
      <div class="cbf-line-items">
        <div class="cbf-line-items__head" aria-hidden="true">
          <span class="cbf-li-col--desc">Description</span> <span class="cbf-li-col--qty">Qty</span>
          <span class="cbf-li-col--price">Unit price</span>
          <span class="cbf-li-col--total">Total</span> <span class="cbf-li-col--action"></span>
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
              style=""
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
        <div class="esa-alert-box esa-alert-box--danger typography-body-sm">
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
        style=""
      />
      <div data-docs-error="" hidden="">
        <div class="esa-alert-box esa-alert-box--danger typography-body-sm">
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
    <div class="esa-alert-box esa-alert-box--danger typography-body-sm">
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
        <div class="esa-alert-box__message">Please upload a PDF invoice before continuing.</div>
      </div>
    </div>
  </div>
  <div class="cbf-step-actions">
    <span data-wizard-cancel="">
      <span
        class="esa-button esa-button--variant-danger esa-button--appearance-outline esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Cancel</span>
        </button></span
      >
    </span>
    <span data-wizard-save-draft="">
      <span
        class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Save as draft</span>
        </button></span
      >
    </span>
    <span data-wizard-next="">
      <span
        class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Review &amp; submit</span>
        </button></span
      >
    </span>
  </div>
</div>
```

## Styles

```css
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.esa-nav-dropdown[open] .esa-button__native > .esa-icon:last-child {
  transform: rotate(180deg);
}
.esa-button {
  --_btn-pad-y: var(--spacing-300, 0.75rem);
  --_btn-padding-x: var(--spacing-300, 0.75rem);
  --_btn-radius: var(--button-radius-md, 0.5rem);
  --_accent: var(--color-background-brand, #46a758);
  --_accent-hover: var(--color-background-brand-hover, #3e9b4f);
  --_on: var(--color-content-default-knockout, #fcfcfc);
  --_accent-text: var(--_accent);
  --_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);
  --_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);
  display: inline-block;
}
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
}
.esa-button--variant-secondary {
  --_accent: var(--color-background-brand-muted);
  --_accent-hover: var(--color-background-brand-muted-hover);
  --_on: var(--color-content-on-brand-muted, var(--color-content-default));
  --_accent-text: var(--color-content-brand);
  --_accent-border: var(--color-border-default-strong, #bbbbbb);
}
.esa-button--variant-danger {
  --_accent: var(--color-background-utility-danger);
  --_accent-hover: var(--color-background-utility-danger-hover);
  --_accent-text: var(--color-content-utility-danger);
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent-border, transparent);
}
.esa-button--appearance-fill .esa-button__native:hover:not(:disabled) {
  background: var(--_accent-hover);
}
.esa-button--appearance-fill.esa-button--active .esa-button__native {
  background: var(--_accent-hover);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button--appearance-dashed .esa-button__native {
  border-style: dashed;
}
.esa-button--appearance-outline .esa-button__native:hover:not(:disabled),
.esa-button--appearance-dashed .esa-button__native:hover:not(:disabled) {
  background: var(--_btn-tint-hover);
}
.esa-button--appearance-outline.esa-button--active .esa-button__native,
.esa-button--appearance-dashed.esa-button--active .esa-button__native {
  background: var(--_btn-tint-active);
}
.esa-button--appearance-soft .esa-button__native {
  background: color-mix(
    in srgb,
    var(--color-background-elevation-sunken, #f0f0f0) 45%,
    var(--color-background-elevation-raised, #fcfcfc)
  );
  color: var(--_accent-text);
  border-color: var(--color-border-default-strong, #bbbbbb);
}
.esa-button--appearance-soft .esa-button__native:hover:not(:disabled),
.esa-button--appearance-soft.esa-button--active .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent);
}
.esa-button--variant-ghost .esa-button__native {
  background: transparent;
  color: var(--color-content-default, #202020);
  border-color: transparent;
}
.esa-button--variant-ghost.esa-button--appearance-outline .esa-button__native,
.esa-button--variant-ghost.esa-button--appearance-dashed .esa-button__native {
  border-color: var(--color-border-default, #cecece);
}
.esa-button--variant-ghost .esa-button__native:hover:not(:disabled),
.esa-button--variant-ghost.esa-button--active .esa-button__native {
  background: var(--color-background-elevation-sunken, #f0f0f0);
}
.esa-button--variant-chrome .esa-button__native {
  background: transparent;
  color: inherit;
  border-color: transparent;
}
.esa-button--variant-chrome .esa-button__native:hover:not(:disabled),
.esa-button--variant-chrome.esa-button--active .esa-button__native,
.esa-button--variant-chrome.esa-button--current .esa-button__native {
  background: var(--button-chrome-bg-hover, color-mix(in srgb, currentColor 14%, transparent));
}
.esa-button--variant-chrome .esa-button__native:focus-visible {
  outline-color: currentColor;
}
.esa-button__native {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200, 8px);
  width: 100%;
  padding-block: var(--_btn-pad-y);
  padding-inline: var(--_btn-padding-x);
  border: var(--border-width-default, 1px) solid transparent;
  border-radius: var(--_btn-radius);
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--transition-fast, 0.15s ease),
    border-color var(--transition-fast, 0.15s ease);
  -webkit-appearance: none;
  appearance: none;
}
.esa-button__native:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
}
.esa-button--icon-only .esa-button__native {
  padding-inline: var(--_btn-pad-y);
  aspect-ratio: 1;
}
summary.esa-button {
  list-style: none;
  cursor: pointer;
}
summary.esa-button::-webkit-details-marker {
  display: none;
}
summary.esa-button:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
  border-radius: var(--_btn-radius);
}
.esa-button__label {
  white-space: nowrap;
}
.cbf-line-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 56px 96px 88px 32px;
  gap: var(--spacing-200);
  padding: var(--spacing-250) var(--spacing-400);
  border-bottom: 1px solid var(--color-border-default);
  align-items: center;
}
.cbf-line-item:last-child {
  border-bottom: 0;
}
.cbf-li-input {
  box-sizing: border-box;
  width: 100%;
  padding: var(--spacing-150) var(--spacing-250);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  font-family: var(--typography-font-family-sans);
  font-size: 14px;
  color: var(--color-content-default);
  background: var(--color-background-elevation-raised);
  transition:
    border-color 0.12s ease,
    box-shadow 0.12s ease;
  outline: none;
}
.cbf-li-input:focus {
  border-color: var(--color-background-brand);
  box-shadow: 0 0 0 3px var(--color-background-brand-subtle);
}
.cbf-li-input::placeholder {
  color: var(--color-content-default-tertiary);
}
.cbf-li-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-background-elevation-sunken, #f8f9fb);
}
.cbf-li-qty,
.cbf-li-price {
  text-align: right;
}
.cbf-li-total {
  font-size: 14px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
  text-align: right;
}
.cbf-li-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-100);
  color: var(--color-content-default-tertiary);
  transition:
    background 0.12s ease,
    color 0.12s ease;
}
.cbf-li-remove:hover {
  background: var(--color-background-elevation-sunken, #f8f9fb);
  color: var(--color-content-default);
}
.cbf-page-title {
  margin: 0 0 var(--spacing-400);
  font-family: var(--typography-font-family-display);
  font-weight: var(--typography-font-weight-medium);
  font-size: 40px;
  line-height: 1;
  letter-spacing: -1px;
  color: var(--color-background-default-knockout);
}
.cbf-form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-500);
}
.cbf-form-lock {
  display: flex;
  align-items: center;
  gap: var(--spacing-250);
  margin-bottom: var(--spacing-500);
  padding: var(--spacing-300) var(--spacing-400);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  background: var(--color-background-elevation-sunken, #f8f9fb);
  font-size: 13px;
  color: var(--color-content-default-tertiary);
  line-height: 1.4;
}
.cbf-form-lock svg {
  flex: none;
  color: var(--color-content-default-tertiary);
}
.cbf-form-lock[hidden],
.cbf-form-lock__msg--narrow,
.cbf-form-lock__upload-btn {
  display: none;
}
@media (max-width: 1100px) {
  .cbf-form-lock__msg--wide {
    display: none;
  }
}
@media (max-width: 1100px) {
  .cbf-form-lock__msg--narrow {
    display: inline;
  }
}
@media (max-width: 1100px) {
  .cbf-form-lock__upload-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-150);
    margin-left: auto;
    flex: none;
    padding: var(--spacing-150) var(--spacing-300);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-100);
    font-size: 13px;
    font-weight: var(--typography-font-weight-semibold);
    color: var(--color-background-brand-muted);
    background: var(--color-background-elevation-raised);
    transition:
      background 0.12s ease,
      border-color 0.12s ease;
  }
}
@media (max-width: 1100px) {
  .cbf-form-lock__upload-btn:hover {
    background: var(--color-background-brand-subtle);
    border-color: var(--color-border-brand);
  }
}
@media (max-width: 600px) {
  .cbf-form-lock {
    flex-wrap: wrap;
  }
}
@media (max-width: 600px) {
  .cbf-form-lock__upload-btn {
    width: 100%;
    margin-left: 0;
    justify-content: center;
    gap: var(--spacing-200);
    padding: var(--spacing-300) var(--spacing-400);
    font-size: 16px;
    color: var(--color-content-default-knockout, #fff);
    background: var(--color-background-brand);
    border-color: var(--color-background-brand);
  }
}
@media (max-width: 600px) {
  .cbf-form-lock__upload-btn svg {
    width: 17px;
    height: 17px;
  }
}
@media (max-width: 600px) {
  .cbf-form-lock__upload-btn:hover {
    background: var(--color-background-brand-hover, var(--color-background-brand-muted));
    border-color: var(--color-background-brand-hover, var(--color-background-brand-muted));
  }
}
.cbf-mobile-pdf-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
.cbf-optional {
  font-size: 13px;
  font-weight: var(--typography-font-weight-regular);
  color: var(--color-content-default-tertiary);
}
.cbf-support-docs-group__label {
  margin: 0 0 var(--spacing-050);
  font-size: var(--font-size-200, 13px);
  font-weight: var(--typography-font-weight-medium);
  color: var(--color-content-default-secondary);
}
.cbf-support-docs-group__desc {
  margin: 0 0 var(--spacing-300);
  font-size: 13px;
  color: var(--color-content-default-tertiary);
  line-height: 1.5;
}
.cbf-line-items {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  overflow: hidden;
}
.cbf-line-items__head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 56px 96px 88px 32px;
  gap: var(--spacing-200);
  padding: var(--spacing-300) var(--spacing-400);
  background: var(--color-background-elevation-sunken, #f8f9fb);
  border-bottom: 1px solid var(--color-border-default);
  font-size: 12px;
  font-weight: var(--typography-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-content-default-tertiary);
}
.cbf-line-items__body {
  display: flex;
  flex-direction: column;
}
.cbf-line-items__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-300) var(--spacing-400);
  border-top: 1px solid var(--color-border-default);
  background: var(--color-background-elevation-sunken, #f8f9fb);
}
.cbf-add-row {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150);
  font-size: 14px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-background-brand-muted);
  padding: var(--spacing-150) var(--spacing-200);
  border-radius: var(--radius-100);
  transition: background 0.12s ease;
}
.cbf-add-row:hover {
  background: var(--color-background-brand-subtle);
}
.cbf-add-row:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.cbf-line-items__total {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  font-size: 15px;
  color: var(--color-content-default-secondary);
}
.cbf-line-items__total strong {
  font-size: 17px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
}
.cbf-final-invoice {
  padding: var(--spacing-400) var(--spacing-450, var(--spacing-400));
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  background: var(--color-background-elevation-sunken, #f8f9fb);
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    box-shadow 0.15s ease;
}
.cbf-final-invoice.is-flagged {
  border-color: var(--color-border-brand, var(--color-background-brand));
  background: var(--color-background-brand-subtle);
  box-shadow: 0 0 0 1px var(--color-border-brand, var(--color-background-brand));
}
.cbf-support-docs {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  overflow: hidden;
  transition:
    border-color 0.12s ease,
    background 0.12s ease;
}
.cbf-support-docs.is-over {
  border-color: var(--color-background-brand);
  background: var(--color-background-brand-subtle);
}
.cbf-support-docs__list:not(:empty) {
  border-bottom: 1px solid var(--color-border-default);
}
.cbf-support-docs__add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200);
  font-size: 14px;
  color: var(--color-content-default-secondary);
  padding: var(--spacing-400);
  width: 100%;
  transition:
    background 0.12s ease,
    color 0.12s ease;
}
.cbf-support-docs__add svg {
  flex: none;
  color: var(--color-background-brand-muted);
}
.cbf-support-docs__add-text strong {
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-background-brand-muted);
}
.cbf-support-docs__add:hover {
  background: var(--color-background-brand-subtle);
}
.cbf-support-docs.is-over .cbf-support-docs__add {
  pointer-events: none;
}
.cbf-support-docs__add:disabled {
  opacity: 0.4;
  cursor: not-allowed;
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
  border-top: 1px solid var(--color-border-default);
}
.cbf-step-actions [data-wizard-save-draft] {
  margin-left: auto;
}
.cbf-page-title {
  margin: 0 0 var(--spacing-500);
  font-family: var(--typography-font-family-display);
  font-weight: var(--typography-font-weight-medium);
  font-size: 40px;
  line-height: 1;
  letter-spacing: -1px;
  color: var(--color-background-default-knockout);
}
.cbf-review-notice .esa-alert-box {
  --color-background-utility-info-subtle: var(--color-background-brand-subtle);
  --color-border-utility-info: var(--color-border-brand);
  --color-background-utility-info: var(--color-background-brand-muted);
  --color-content-default-secondary: var(--color-content-default);
  font-size: 15px;
}
.cbf-step-actions [data-wizard-back] {
  margin-left: auto;
}
.esa-alert-box {
  --_alert-bg: var(--color-background-utility-info-subtle, #fbfdff);
  --_alert-border: var(--color-border-utility-info, #acd8fc);
  --_alert-accent: var(--color-content-utility-info, #0d74ce);
  --_alert-icon-color: var(--_alert-accent);
  --_alert-title-color: var(--_alert-accent);
  --_alert-text-color: var(--alert-box-text-color, var(--color-content-default-secondary, #646464));
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-300, 0.75rem);
  padding: var(--spacing-300, 0.75rem) var(--spacing-400, 1rem);
  border: var(--border-width-default, 1px) solid var(--_alert-border);
  border-radius: var(--radius-md, 0.5rem);
  background: var(--_alert-bg);
}
.esa-alert-box--danger {
  --_alert-bg: var(--color-background-utility-danger-subtle, #fffcfc);
  --_alert-border: var(--color-border-utility-danger, #fdbdbe);
  --_alert-accent: var(--color-content-utility-danger, #ce2c31);
}
.esa-alert-box__icon {
  flex-shrink: 0;
  color: var(--_alert-icon-color);
  padding-top: 1px;
}
.esa-alert-box__body {
  flex: 1;
  min-width: 0;
}
.esa-alert-box__message {
  color: var(--_alert-text-color);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--alert-box-text-color` | `#525252` | component |
| `--border-width-default` | `1px` | semantic |
| `--button-chrome-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--button-radius-md` | `.5rem` | component |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-muted-hover` | `#1e5386` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-danger` | `#ce2c31` | semantic |
| `--color-background-utility-danger-hover` | `#641723` | semantic |
| `--color-background-utility-danger-subtle` | `#fffcfc` | semantic |
| `--color-background-utility-info-subtle` | `#f3f7fc` | semantic |
| `--color-border-brand` | `#c6dcf1` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-utility-danger` | `#fdbdbe` | semantic |
| `--color-border-utility-info` | `#c6dcf1` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--color-content-on-brand-muted` | `#203c25` | semantic |
| `--color-content-utility-danger` | `#ce2c31` | semantic |
| `--color-content-utility-info` | `#0d74ce` | semantic |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--font-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-regular` | `400` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |
