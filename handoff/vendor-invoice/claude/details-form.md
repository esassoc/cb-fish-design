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

## Behavior
```ts
// ── src/components/vendor-invoice/invoice-wizard.client.ts ──
// invoice-wizard.client.ts — vendor invoice submission wizard.
// Manages: step navigation + validation, PDF upload zone, line items
// add/remove/total, review-panel population, and submit confirmation.

export function initInvoiceWizard(): void {
  const wizard = document.querySelector<HTMLElement>('[data-invoice-wizard]');
  if (!wizard) return;

  const stepper = wizard.querySelector<HTMLElement>('[data-stepper]');
  const stepperItems = Array.from(
    wizard.querySelectorAll<HTMLElement>('[data-stepper-step]'),
  );
  const stepperLines = Array.from(
    wizard.querySelectorAll<HTMLElement>('.cbf-stepper__line'),
  );

  let current = 0;
  const confirmStep = 2;

  const pdfPanel = wizard.querySelector<HTMLElement>('[data-pdf-panel]');
  const pdfFrame = wizard.querySelector<HTMLIFrameElement>('[data-pdf-frame]');
  const pdfFilenameEl = wizard.querySelector<HTMLElement>('[data-pdf-filename]');
  const cardBody = wizard.querySelector<HTMLElement>('.cbf-invoice-workspace');
  const partiesBar = wizard.querySelector<HTMLElement>('[data-parties-bar]');

  function setStepVisibility(step: number, visible: boolean): void {
    wizard.querySelectorAll<HTMLElement>(`[data-step="${step}"]`).forEach((el) => {
      if (visible) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });
  }

  // ---- Step navigation ----

  function goTo(next: number): void {
    if (next !== confirmStep && !validate(current)) return;
    setStepVisibility(current, false);
    current = next;
    setStepVisibility(current, true);
    updateStepper();
    if (current === 1) populateReview();
    // Show PDF panel only on step 0 (Invoice Details) when a file is loaded
    syncPdfPanel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateStepper(): void {
    const onConfirm = current >= stepperItems.length;
    stepper?.toggleAttribute('hidden', onConfirm);
    if (onConfirm) return;

    stepperItems.forEach((item, i) => {
      item.classList.toggle('is-active', i === current);
      item.classList.toggle('is-done', i < current);
    });
    // colour the connector lines between done steps
    stepperLines.forEach((line, i) => {
      line.style.background =
        i < current ? 'var(--color-primary)' : 'var(--color-border)';
    });
  }

  wizard.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('[data-wizard-next]')) goTo(current + 1);
    if (t.closest('[data-wizard-back]') && current > 0) {
      setStepVisibility(current, false);
      current--;
      setStepVisibility(current, true);
      updateStepper();
      syncPdfPanel();
    }
    if (t.closest('[data-invoice-replace]')) uploadInput.click();
    if (t.closest('[data-invoice-remove]')) { clearFile(); goTo(0); }
    if (t.closest('[data-wizard-submit]')) submitInvoice();
  });

  // Show panel immediately on load (step 0)
  syncPdfPanel();

  // ---- Combobox initialization ----
  // esa-combobox takes options as a JS property, not slotted HTML.
  // We encode the options as JSON on a data attribute at build time and assign here.
  wizard.querySelectorAll<any>('[data-combobox-options]').forEach((el) => {
    try { el.options = JSON.parse(el.dataset.comboboxOptions ?? '[]'); } catch {}
  });

  // ---- PDF panel sync ----

  function syncPdfPanel(): void {
    const show = current === 0;
    pdfPanel?.toggleAttribute('hidden', !show);
    cardBody?.classList.toggle('has-pdf', show);
    partiesBar?.toggleAttribute('hidden', !show);
  }

  // ---- Validation ----

  function validate(step: number): boolean {
    if (step === 0) { const a = validateUpload(); const b = validateDetails(); return a && b; }
    return true;
  }

  function validateUpload(): boolean {
    const err = wizard.querySelector<HTMLElement>('[data-step-error="upload"]')!;
    const hasFile = !!uploadedFile;
    err?.toggleAttribute('hidden', hasFile);
    return hasFile;
  }

  function validateDetails(): boolean {
    let ok = true;
    const required = [
      wizard.querySelector<any>('[data-field="invoice-number"]'),
      wizard.querySelector<any>('[data-field="invoice-date"]'),
      wizard.querySelector<any>('[data-field="issue-date"]'),
      wizard.querySelector<any>('[data-field="perf-start"]'),
      wizard.querySelector<any>('[data-field="perf-end"]'),
      wizard.querySelector<any>('[data-field="contract"]'),
      wizard.querySelector<any>('[data-field="project"]'),
    ];
    required.forEach((el) => {
      if (!el) return;
      const val = el.value ?? el.getAttribute('value') ?? '';
      if (!val.trim()) {
        el.setAttribute('error-text', 'This field is required.');
        ok = false;
      } else {
        el.removeAttribute('error-text');
      }
    });
    if (!lineItems.length) {
      ok = false;
      const err = wizard.querySelector<HTMLElement>('[data-step-error="lineitems"]');
      err?.removeAttribute('hidden');
    } else {
      wizard.querySelector<HTMLElement>('[data-step-error="lineitems"]')?.setAttribute('hidden', '');
    }
    return ok;
  }

  // ---- Form lock (disabled until first PDF upload) ----

  let pdfEverLoaded = false;

  function syncFormLock(): void {
    const locked = !pdfEverLoaded;
    wizard.querySelector<HTMLElement>('[data-form-lock-notice]')?.toggleAttribute('hidden', !locked);

    // Named form fields (esa-text-field, bcn-date-picker, esa-combobox, esa-textarea)
    wizard.querySelectorAll<any>('[data-field]').forEach((el) => {
      el.toggleAttribute('disabled', locked);
    });

    // Action buttons
    wizard.querySelector<HTMLButtonElement>('[data-add-line-item]')?.toggleAttribute('disabled', locked);
    wizard.querySelector<HTMLButtonElement>('[data-docs-add]')?.toggleAttribute('disabled', locked);

    // Dynamically-rendered line item inputs/remove buttons
    wizard.querySelectorAll<HTMLInputElement>('.cbf-li-input').forEach((el) => { el.disabled = locked; });
    wizard.querySelectorAll<HTMLButtonElement>('.cbf-li-remove').forEach((el) => { el.disabled = locked; });
  }

  // Apply initial locked state
  syncFormLock();

  // ---- File upload ----

  let uploadedFile: File | null = null;

  const uploadZone = wizard.querySelector<HTMLElement>('[data-upload-zone]')!;
  const uploadInput = wizard.querySelector<HTMLInputElement>('[data-upload-input]')!;
  const mobileUploadInput = wizard.querySelector<HTMLInputElement>('[data-mobile-upload-input]');
  const uploadIdle = wizard.querySelector<HTMLElement>('[data-upload-idle]')!;
  const pdfViewer = wizard.querySelector<HTMLElement>('[data-pdf-viewer]')!;

  let pdfObjectUrl: string | null = null;

  function showFile(file: File): void {
    uploadedFile = file;
    uploadIdle?.setAttribute('hidden', '');
    pdfViewer?.removeAttribute('hidden');
    wizard.querySelector<HTMLElement>('[data-step-error="upload"]')?.setAttribute('hidden', '');
    if (!pdfEverLoaded) { pdfEverLoaded = true; syncFormLock(); }
    if (pdfObjectUrl) URL.revokeObjectURL(pdfObjectUrl);
    pdfObjectUrl = URL.createObjectURL(file);
    if (pdfFrame) pdfFrame.src = pdfObjectUrl;
    if (pdfFilenameEl) pdfFilenameEl.textContent = file.name;
    if (current === 1) populateReview();
    syncPdfPanel();
  }

  function clearFile(): void {
    uploadedFile = null;
    uploadInput.value = '';
    if (mobileUploadInput) mobileUploadInput.value = '';
    pdfViewer?.setAttribute('hidden', '');
    uploadIdle?.removeAttribute('hidden');
    if (pdfObjectUrl) { URL.revokeObjectURL(pdfObjectUrl); pdfObjectUrl = null; }
    if (pdfFrame) pdfFrame.src = '';
    syncPdfPanel();
  }

  // ---- Supporting documents ----

  let supportingDocs: File[] = [];
  const docsInput = wizard.querySelector<HTMLInputElement>('[data-docs-input]')!;
  const docsList = wizard.querySelector<HTMLElement>('[data-docs-list]')!;

  function renderDocs(): void {
    if (!docsList) return;
    docsList.innerHTML = supportingDocs.map((file, i) => `
      <div class="cbf-doc-row">
        <svg class="cbf-doc-row__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <div class="cbf-doc-row__info">
          <span class="cbf-doc-row__name">${escHtml(file.name)}</span>
          <span class="cbf-doc-row__size">${formatBytes(file.size)}</span>
        </div>
        <button type="button" class="cbf-doc-row__remove" data-doc-remove="${i}" aria-label="Remove ${escHtml(file.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('');
  }

  wizard.querySelector('[data-docs-add]')?.addEventListener('click', () => docsInput?.click());

  docsInput?.addEventListener('change', () => {
    const incoming = Array.from(docsInput.files ?? []);
    const existingNames = new Set(supportingDocs.map((f) => f.name));
    supportingDocs.push(...incoming.filter((f) => !existingNames.has(f.name)));
    docsInput.value = '';
    renderDocs();
  });

  docsList?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-doc-remove]');
    if (!btn) return;
    supportingDocs.splice(Number(btn.dataset.docRemove), 1);
    renderDocs();
  });

  wizard.querySelector('[data-upload-browse]')?.addEventListener('click', () => uploadInput.click());
  wizard.querySelector('[data-upload-remove]')?.addEventListener('click', clearFile);
  wizard.querySelector('[data-mobile-upload-btn]')?.addEventListener('click', () => mobileUploadInput?.click());

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files?.[0];
    if (file) showFile(file);
  });

  mobileUploadInput?.addEventListener('change', () => {
    const file = mobileUploadInput.files?.[0];
    if (file) showFile(file);
  });

  // Drag & drop
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('is-over');
  });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('is-over'));
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('is-over');
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type === 'application/pdf') showFile(file);
  });

  function formatBytes(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // ---- Line items ----

  interface LineItem {
    description: string;
    qty: number;
    unitPrice: number;
  }

  let lineItems: LineItem[] = [];
  const lineItemsBody = wizard.querySelector<HTMLElement>('[data-line-items]')!;
  const totalEl = wizard.querySelector<HTMLElement>('[data-invoice-total]')!;

  function addLineItem(): void {
    lineItems.push({ description: '', qty: 1, unitPrice: 0 });
    renderLineItems();
  }

  function removeLineItem(idx: number): void {
    lineItems.splice(idx, 1);
    renderLineItems();
  }

  function renderLineItems(): void {
    const dis = pdfEverLoaded ? '' : ' disabled';
    lineItemsBody.innerHTML = lineItems
      .map(
        (item, i) => `
      <div class="cbf-line-item" data-row="${i}">
        <input${dis}
          class="cbf-li-input cbf-li-desc"
          type="text"
          placeholder="Description…"
          value="${escHtml(item.description)}"
          data-li-field="description"
          data-li-idx="${i}"
        />
        <input${dis}
          class="cbf-li-input cbf-li-qty"
          type="number"
          min="1"
          value="${item.qty}"
          data-li-field="qty"
          data-li-idx="${i}"
          style="text-align:right"
        />
        <input${dis}
          class="cbf-li-input cbf-li-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value="${item.unitPrice || ''}"
          data-li-field="unitPrice"
          data-li-idx="${i}"
          style="text-align:right"
        />
        <span class="cbf-li-total" data-li-total="${i}">${fmtCurrency(item.qty * item.unitPrice)}</span>
        <button type="button"${dis} class="cbf-li-remove" data-li-remove="${i}" aria-label="Remove line item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `,
      )
      .join('');
    updateTotal();
  }

  function updateTotal(): void {
    const sum = lineItems.reduce((acc, li) => acc + li.qty * li.unitPrice, 0);
    if (totalEl) totalEl.textContent = fmtCurrency(sum);
  }

  function fmtCurrency(n: number): string {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  function escHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  // Delegate input + button events inside the line items body
  lineItemsBody.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    const idx = Number(el.dataset.liIdx);
    const field = el.dataset.liField as keyof LineItem;
    if (!field || isNaN(idx)) return;
    if (field === 'description') lineItems[idx].description = el.value;
    if (field === 'qty') lineItems[idx].qty = Math.max(1, Number(el.value) || 1);
    if (field === 'unitPrice') lineItems[idx].unitPrice = Math.max(0, Number(el.value) || 0);
    const totalCell = lineItemsBody.querySelector<HTMLElement>(`[data-li-total="${idx}"]`);
    if (totalCell) totalCell.textContent = fmtCurrency(lineItems[idx].qty * lineItems[idx].unitPrice);
    updateTotal();
  });

  lineItemsBody.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-li-remove]');
    if (btn) removeLineItem(Number(btn.dataset.liRemove));
  });

  wizard.querySelector('[data-add-line-item]')?.addEventListener('click', addLineItem);

  // Seed with one empty row
  addLineItem();

  // ---- Review panel ----

  function fieldVal(selector: string): string {
    const el = wizard.querySelector<any>(selector);
    return el?.value ?? '';
  }

  function comboboxLabel(selector: string): string {
    const el = wizard.querySelector<any>(selector);
    if (!el) return '';
    const val = el.value ?? '';
    const match = (el.options as Array<{value: string; label: string}> | undefined)
      ?.find((o) => o.value === val);
    return match?.label ?? val;
  }

  function populateReview(): void {
    const container = wizard.querySelector<HTMLElement>('[data-review-content]');
    if (!container) return;

    const invoiceNum = fieldVal('[data-field="invoice-number"]');
    const invoiceDate = fieldVal('[data-field="invoice-date"]');
    const issueDate = fieldVal('[data-field="issue-date"]');
    const perfStart = fieldVal('[data-field="perf-start"]');
    const perfEnd = fieldVal('[data-field="perf-end"]');
    const contract = comboboxLabel('[data-field="contract"]');
    const project = comboboxLabel('[data-field="project"]');
    const notes = fieldVal('[data-field="notes"]');
    const total = lineItems.reduce((acc, li) => acc + li.qty * li.unitPrice, 0);

    container.innerHTML = `
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Uploaded invoice</h3>
        <div class="cbf-review-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>${escHtml(uploadedFile?.name ?? '(no file)')}</span>
          <span class="cbf-review-meta">${uploadedFile ? formatBytes(uploadedFile.size) : ''}</span>
          <div class="cbf-review-file-actions">
            <button type="button" class="cbf-review-file-btn" data-invoice-replace>Replace</button>
            <button type="button" class="cbf-review-file-btn cbf-review-file-btn--danger" data-invoice-remove>Remove</button>
          </div>
        </div>
      </div>

      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Invoice details</h3>
        <dl class="cbf-review-dl">
          <div class="cbf-review-dl__row"><dt>Invoice number</dt><dd>${escHtml(invoiceNum) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Invoice date</dt><dd>${escHtml(invoiceDate) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Issue date</dt><dd>${escHtml(issueDate) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Performance period</dt><dd>${escHtml(perfStart) || '—'} – ${escHtml(perfEnd) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Contract</dt><dd>${escHtml(contract) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Project</dt><dd>${escHtml(project) || '—'}</dd></div>
        </dl>
      </div>

      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Line items</h3>
        <table class="cbf-review-table">
          <thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Total</th></tr></thead>
          <tbody>
            ${lineItems.map(li => `
              <tr>
                <td>${escHtml(li.description) || '—'}</td>
                <td>${li.qty}</td>
                <td>${fmtCurrency(li.unitPrice)}</td>
                <td>${fmtCurrency(li.qty * li.unitPrice)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr class="cbf-review-table__total">
              <td colspan="3">Total</td>
              <td>${fmtCurrency(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      ${supportingDocs.length ? `
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Supporting documents</h3>
        ${supportingDocs.map(f => `
          <div class="cbf-review-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>${escHtml(f.name)}</span>
            <span class="cbf-review-meta">${formatBytes(f.size)}</span>
          </div>
        `).join('')}
      </div>` : ''}

      ${notes ? `
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Notes</h3>
        <p class="cbf-review-notes">${escHtml(notes)}</p>
      </div>` : ''}
    `;
  }

  // ---- Submit ----

  function submitInvoice(): void {
    // Engage loading state on the submit button so "Invoice Submitted" only
    // appears after the simulated network round-trip, not on click.
    const btn = wizard.querySelector<HTMLButtonElement>('[data-wizard-submit] button.esa-button');
    if (btn) {
      btn.classList.add('esa-button--loading');
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      if (!btn.querySelector('.esa-button__spinner')) {
        const spinner = document.createElement('span');
        spinner.className = 'esa-button__spinner';
        spinner.setAttribute('aria-hidden', 'true');
        btn.prepend(spinner);
      }
      btn.querySelector('.esa-button__label')?.classList.add('esa-button__label--hidden');
    }

    setTimeout(() => {
      const ref = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
      const refEl = wizard.querySelector<HTMLElement>('[data-confirm-ref]');
      if (refEl) refEl.textContent = ref;
      goTo(2);
    }, 1500);
  }
}
```
