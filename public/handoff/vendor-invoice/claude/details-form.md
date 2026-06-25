# Details form

Step 0 — the main data-entry form. Sections: contract/project selectors, invoice metadata (number, dates, performance period), a dynamic line items table, supporting document attachments, and a notes textarea. The entire form is disabled (locked) until a PDF is uploaded.

## Key decisions
- Contract and project are esa-combobox (not esa-select) — they support free-text search over a list of options passed via data-combobox-options JSON.
- Dates use bcn-date-picker, a spoke-level custom component built on esa-text-field.
- Line item rows are JS-rendered (no Astro scope) — their CSS lives in a <style is:global> block.
- The locked-state overlay ([data-form-lock-notice]) is shown when pdfEverLoaded is false, prompting the user to upload a PDF first.

## Gotchas
- All [data-field="*"] controls are disabled until pdfEverLoaded — attempting to interact before upload will have no effect.
- The "Add line item" button ([data-add-line-item]) is also disabled while locked.
- Line items table has no Astro-scoped styles — any style changes need to target the global .cbf-line-item class.
- Supporting docs are deduplicated by filename before being added to the supportingDocs array.

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
        width="13"
        height="13"
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
      Upload PDF
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
  <!-- Contract & project reference -->
  <div class="cbf-form-section cbf-form-section--first">
    <h2 class="cbf-form-section__title">Contract &amp; project</h2>
    <div class="cbf-form-row--2col">
      <esa-combobox
        mode="autocomplete"
        label="Project"
        placeholder="Search projects…"
        required="true"
        data-field="project"
        data-combobox-options='[{"value":"PRJ-0045","label":"PRJ-0045 — Lower Columbia River Restoration"},{"value":"PRJ-0062","label":"PRJ-0062 — Snake River Fish Passage"},{"value":"PRJ-0071","label":"PRJ-0071 — Wetland Mitigation Banking"}]'
        disabled=""
        size="md"
      ></esa-combobox>
      <esa-combobox
        mode="autocomplete"
        label="Contract"
        placeholder="Search contracts…"
        required="true"
        data-field="contract"
        data-combobox-options='[{"value":"CON-2024-0881","label":"CON-2024-0881 — Tributary Habitat Assessment"},{"value":"CON-2024-0903","label":"CON-2024-0903 — Salmon Passage Study"},{"value":"CON-2025-0112","label":"CON-2025-0112 — Water Quality Monitoring"},{"value":"CON-2025-0234","label":"CON-2025-0234 — Environmental Impact Review"}]'
        data-contract-amounts='{"CON-2024-0881":{"total":120000,"remaining":18500},"CON-2024-0903":{"total":85000,"remaining":85000},"CON-2025-0112":{"total":240000,"remaining":96000},"CON-2025-0234":{"total":60000,"remaining":12300}}'
        disabled=""
        size="md"
      ></esa-combobox>
    </div>
  </div>
  <!-- Invoice metadata + performance period (merged) -->
  <div class="cbf-form-section">
    <h2 class="cbf-form-section__title">Invoice metadata</h2>
    <div class="cbf-form-row--2col">
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
        disabled=""
      ></bcn-date-picker>
      <bcn-date-picker
        label="Issue date"
        required="true"
        data-field="issue-date"
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
    </div>
  </div>
  <!-- Line items -->
  <div class="cbf-form-section">
    <h2 class="cbf-form-section__title">Line items</h2>
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
  <!-- Final invoice — its own section so it reads as a deliberate decision the
       vendor owns. The wizard never ticks this for them; if the invoice looks
       final (remaining balance within 5% of the total), it asks via a modal on
       Review & submit and lets the vendor decide. -->
  <div class="cbf-form-section">
    <h2 class="cbf-form-section__title">Final invoice</h2>
    <div class="cbf-final-invoice" data-final-invoice-callout="">
      <esa-checkbox
        size="lg"
        label="This is the final invoice for this contract"
        data-field="final-invoice"
        data-final-invoice="true"
        disabled=""
      ></esa-checkbox>
    </div>
  </div>
  <!-- Supporting documents -->
  <div class="cbf-form-section">
    <h2 class="cbf-form-section__title">
      Supporting documents <span class="cbf-optional">(optional)</span>
    </h2>
    <p class="cbf-section-desc">
      Attach timesheets, receipts, reports, or any other supporting files.
    </p>
    <div class="cbf-support-docs">
      <div class="cbf-support-docs__list" data-docs-list=""></div>
      <button type="button" class="cbf-support-docs__add" data-docs-add="" disabled="">
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
        Add documents
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
  </div>
  <!-- Notes (optional) -->
  <div class="cbf-form-section">
    <h2 class="cbf-form-section__title">
      Notes <span class="cbf-optional">(optional)</span>
    </h2>
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
  --_accent: var(--color-primary, #43608a);
  --_accent-hover: var(--color-primary-hover, #39506f);
  --_on: var(--color-text-inverse, #ffffff);
  display: inline-block;
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
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: transparent;
}
.esa-button__label {
  white-space: nowrap;
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
.cbf-form-section {
  margin-top: var(--spacing-600);
  padding-top: var(--spacing-500);
  border-top: 1px solid var(--color-border);
}
.cbf-form-section--first {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
}
.cbf-form-section__title {
  margin: 0 0 var(--spacing-400);
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  display: flex;
  align-items: baseline;
  gap: var(--spacing-200);
}
.cbf-form-row--2col {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.cbf-line-items {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  overflow: hidden;
}
.cbf-line-items__head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 56px 96px 88px 32px;
  gap: var(--spacing-200);
  padding: var(--spacing-300) var(--spacing-400);
  background: var(--color-surface-sunken, #f8f9fb);
  border-bottom: 1px solid var(--color-border);
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
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
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-sunken, #f8f9fb);
}
.cbf-add-row {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150);
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-secondary);
  padding: var(--spacing-150) var(--spacing-200);
  border-radius: var(--radius-100);
  transition: background 0.12s ease;
}
.cbf-line-items__total {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  font-size: 15px;
  color: var(--color-text-secondary);
}
.cbf-line-items__total strong {
  font-size: 17px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
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
.cbf-optional {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: var(--font-weight-regular);
  color: var(--color-text-muted);
}
.cbf-section-desc {
  margin: calc(-1 * var(--spacing-200)) 0 var(--spacing-400);
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.5;
}
.cbf-support-docs {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  overflow: hidden;
}
.cbf-support-docs__add {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150);
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-secondary);
  padding: var(--spacing-300) var(--spacing-400);
  width: 100%;
  transition: background 0.12s ease;
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
.cbf-wizard-step--confirm {
  display: flex;
  align-items: flex-start;
}
.cbf-wizard-step--confirm[hidden] {
  display: none;
}
.cbf-line-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 56px 96px 88px 32px;
  gap: var(--spacing-200);
  padding: var(--spacing-250) var(--spacing-400);
  border-bottom: 1px solid var(--color-border);
  align-items: center;
}
.cbf-line-item:last-child {
  border-bottom: 0;
}
.cbf-li-input {
  box-sizing: border-box;
  width: 100%;
  padding: var(--spacing-150) var(--spacing-250);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-primary);
  background: var(--color-surface);
  transition:
    border-color 0.12s ease,
    box-shadow 0.12s ease;
  outline: none;
}
.cbf-li-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-surface-sunken, #f8f9fb);
}
.cbf-li-input::placeholder {
  color: var(--color-text-muted);
}
.cbf-li-qty,
.cbf-li-price {
  text-align: right;
}
.cbf-li-total {
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-align: right;
}
.cbf-li-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-100);
  color: var(--color-text-muted);
  transition:
    background 0.12s ease,
    color 0.12s ease;
}
.cbf-add-row:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.cbf-support-docs__add:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

## Tokens
- `--color-border`: #dcdcdc _(semantic)_
- `--color-primary`: #1e5386 _(semantic)_
- `--color-primary-hover`: #1a4570 _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-surface-inverse`: #13273e _(semantic)_
- `--color-surface-sunken`: #f3f7fc _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
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
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
- `--spacing-700`: 3rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
