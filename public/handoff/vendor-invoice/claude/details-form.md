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
      value="2026-06-30"
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
        Supporting documents <span class="cbf-optional">(optional)</span>
      </p>
      <p class="cbf-support-docs-group__desc">
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
  justify-content: flex-end;
  gap: var(--spacing-300);
  margin-top: var(--spacing-700);
  padding-top: var(--spacing-500);
  border-top: 1px solid var(--color-border);
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
  --_accent: var(--color-primary, #46a758);
  --_accent-hover: var(--color-primary-hover, #3e9b4f);
  --_on: var(--color-text-inverse, #ffffff);
  --_accent-text: var(--_accent);
  --_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);
  --_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);
  display: inline-block;
}
.esa-button--color-primary {
  --_accent-text: var(--color-primary-strong);
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
- `--color-primary-strong`: #2a7e3b _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
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
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-700`: 3rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_

## Behavior
```ts
// ── src/components/vendor-invoice/invoice-wizard.client.ts ──
// invoice-wizard.client.ts — vendor invoice submission wizard.
// Manages: step navigation + validation, PDF upload zone, line items
// add/remove/total, review-panel population, and submit confirmation.

export function initInvoiceWizard(): void {
  const root = document.querySelector<HTMLElement>('[data-invoice-wizard]');
  if (!root) return;
  const wizard: HTMLElement = root;

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

  function setStepVisibility(step: number, visible: boolean): void {
    wizard.querySelectorAll<HTMLElement>(`[data-step="${step}"]`).forEach((el) => {
      if (visible) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });
  }

  // ---- Step navigation ----

  function goTo(next: number): void {
    if (next !== confirmStep && !validate(current)) return;
    // Leaving the details step for review: if the invoice looks like a final one
    // and the vendor hasn't said either way, ask first — then resume this same
    // transition once they've answered (shouldPromptFinal is false on re-entry).
    if (current === 0 && next === 1 && shouldPromptFinal()) {
      promptFinalInvoice(() => goTo(next));
      return;
    }
    // Modal mode: step 1 opens the modal review page instead of the page step.
    if (next === 1 && confirmMode() === 'modal') {
      openModalAtReview();
      return;
    }
    setStepVisibility(current, false);
    current = next;
    setStepVisibility(current, true);
    updateStepper();
    if (current === 1) populateReview();
    // Show PDF panel only on step 0 (Invoice Details) when a file is loaded
    syncPdfPanel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openModalAtReview(): void {
    const modal = wizard.querySelector<any>('[data-confirm-modal]');
    if (!modal) return;
    populateModalReview();
    modal.show();
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

  // Dev toggle: switch confirmation mode between "page" and "modal".
  // Mode is stored in a plain variable so confirmMode() never re-reads the DOM
  // (avoids fragility around Astro-scoped class selectors on dynamically toggled nodes).
  let activeConfirmMode: 'page' | 'modal' = 'page';
  const confirmModeBar = wizard.querySelector<HTMLElement>('[data-confirm-mode-bar]');
  confirmModeBar?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-confirm-mode]');
    if (!btn) return;
    const mode = btn.dataset.confirmMode as 'page' | 'modal' | undefined;
    if (!mode) return;
    activeConfirmMode = mode;
    confirmModeBar.querySelectorAll<HTMLElement>('[data-confirm-mode]').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.confirmMode === mode);
    });
  });

  function confirmMode(): string {
    return activeConfirmMode;
  }

  // ---- Dev: autofill valid demo data and jump straight to the review step. ----
  // Prototype-only testing helper so the review/confirmation screens can be reached
  // without hand-filling the form. Wired to the dev-bar "Autofill → Review" button
  // and exposed on window for console use (vendorInvoiceAutofill()).
  function devAutofill(): void {
    // A placeholder PDF unlocks the form (pdfEverLoaded) and shows the panel.
    if (!uploadedFile) {
      const demo = new File(['%PDF-1.4\n% demo invoice for testing\n'], 'demo-invoice.pdf', {
        type: 'application/pdf',
      });
      showFile(demo);
    }
    const fill = (selector: string, value: string): void => {
      const el = wizard.querySelector<any>(selector);
      if (!el) return;
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    // CON-2025-0112 has a large remaining balance, so the total stays well clear of
    // the over-balance and "final invoice?" prompts. Contract change auto-fills Project.
    fill('[data-field="contract"]', 'CON-2025-0112');
    fill('[data-field="invoice-number"]', 'INV-2026-0042');
    fill('[data-field="invoice-date"]', '2026-06-29');
    fill('[data-field="perf-start"]', '2026-01-01');
    fill('[data-field="perf-end"]', '2026-03-31');
    fill('[data-field="total-amount"]', '4850.00');
    fill('[data-field="notes"]', 'Autofilled demo invoice (testing).');
    goTo(1);
  }
  (window as unknown as { vendorInvoiceAutofill?: () => void }).vendorInvoiceAutofill = devAutofill;

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
    if (t.closest('[data-modal-submit]')) submitInvoice();
    if (t.closest('[data-modal-back]')) wizard.querySelector<any>('[data-confirm-modal]')?.close();
    if (t.closest('[data-dev-autofill]')) devAutofill();
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
      wizard.querySelector<any>('[data-field="perf-start"]'),
      wizard.querySelector<any>('[data-field="perf-end"]'),
      wizard.querySelector<any>('[data-field="contract"]'),
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
    // Performance period cross-check: start must not be after end
    const perfStartEl = wizard.querySelector<any>('[data-field="perf-start"]');
    const perfEndEl = wizard.querySelector<any>('[data-field="perf-end"]');
    const pStart = perfStartEl?.value ?? '';
    const pEnd = perfEndEl?.value ?? '';
    if (pStart && pEnd && pStart > pEnd) {
      perfEndEl?.setAttribute('error-text', 'End date must be on or after start date.');
      ok = false;
    }
    // Invoice total must be a positive amount, and must not exceed the remaining
    // balance on the selected contract (replaces the old line-item check).
    const totalErr = wizard.querySelector<HTMLElement>('[data-step-error="total"]');
    const exceedsErr = wizard.querySelector<HTMLElement>('[data-step-error="total-exceeds"]');
    if (readInvoiceTotal() <= 0) {
      ok = false;
      totalErr?.removeAttribute('hidden');
      exceedsErr?.setAttribute('hidden', '');
      totalAmountField?.setAttribute('error-text', 'Enter the invoice total amount.');
    } else {
      totalErr?.setAttribute('hidden', '');
      if (exceedsRemaining()) {
        ok = false;
        refreshTotalExceeds(); // shows the over-balance alert + field error
      } else {
        exceedsErr?.setAttribute('hidden', '');
        totalAmountField?.removeAttribute('error-text');
      }
    }
    return ok;
  }

  // ---- Form lock (disabled until first PDF upload) ----

  let pdfEverLoaded = false;

  function syncFormLock(): void {
    const locked = !pdfEverLoaded;
    wizard.querySelector<HTMLElement>('[data-form-lock-notice]')?.toggleAttribute('hidden', !locked);

    // Named form fields (esa-text-field, bcn-date-picker, esa-combobox, esa-textarea).
    // Skip [data-readonly] fields — they stay disabled regardless of lock state.
    wizard.querySelectorAll<any>('[data-field]:not([data-readonly])').forEach((el) => {
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

  // Upload size cap — mirrors the "Max 25 MB" hint shown on the drop zones.
  const MAX_FILE_BYTES = 25 * 1024 * 1024;

  // Size/type rejections show INLINE in the drop zone (right at the input), not in
  // the bottom "no file" validation alert which is far from where the user dropped.
  function setUploadError(msg: string): void {
    const slot = wizard.querySelector<HTMLElement>('[data-upload-inline-error]');
    const msgEl = wizard.querySelector<HTMLElement>('[data-upload-inline-error-msg]');
    if (msgEl) msgEl.textContent = msg;
    slot?.removeAttribute('hidden');
  }
  function clearUploadError(): void {
    wizard.querySelector<HTMLElement>('[data-upload-inline-error]')?.setAttribute('hidden', '');
  }

  // Returns an error message if the main invoice file is invalid, else null.
  function validateMainFile(file: File): string | null {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) return 'That file isn’t a PDF. Please upload a PDF invoice.';
    if (file.size > MAX_FILE_BYTES) {
      return `This file is ${formatBytes(file.size)} — the maximum is 25 MB. Please upload a smaller PDF.`;
    }
    return null;
  }

  function showFile(file: File): void {
    const fileError = validateMainFile(file);
    if (fileError) { setUploadError(fileError); return; }
    clearUploadError();
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

  function setDocsError(msg: string): void {
    const slot = wizard.querySelector<HTMLElement>('[data-docs-error]');
    const msgEl = wizard.querySelector<HTMLElement>('[data-docs-error-msg]');
    if (msg) {
      if (msgEl) msgEl.textContent = msg;
      slot?.removeAttribute('hidden');
    } else {
      slot?.setAttribute('hidden', '');
    }
  }

  docsInput?.addEventListener('change', () => {
    const incoming = Array.from(docsInput.files ?? []);
    const oversize = incoming.filter((f) => f.size > MAX_FILE_BYTES);
    const existingNames = new Set(supportingDocs.map((f) => f.name));
    supportingDocs.push(
      ...incoming.filter((f) => f.size <= MAX_FILE_BYTES && !existingNames.has(f.name)),
    );
    docsInput.value = '';
    if (oversize.length) {
      const names = oversize.map((f) => f.name).join(', ');
      setDocsError(
        `${names} ${oversize.length > 1 ? 'each exceed' : 'exceeds'} the 25 MB limit and ` +
        `${oversize.length > 1 ? 'were' : 'was'} not added.`,
      );
    } else {
      setDocsError('');
    }
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
    // showFile validates type + size and surfaces the error (no silent drop).
    if (file) showFile(file);
  });

  function formatBytes(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // Render an ISO date (yyyy-mm-dd from the date inputs) as a human, self-evident
  // date — "June 29, 2026". Parse y/m/d parts to avoid UTC-vs-local off-by-one.
  function formatDate(value: string): string {
    if (!value) return '—';
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

  // The invoice total is now entered directly (line items live in the PDF). Parse
  // the field leniently — strip $, commas, spaces — so "4,850.00" or "$4850" work.
  const totalAmountField = wizard.querySelector<any>('[data-field="total-amount"]');
  function readInvoiceTotal(): number {
    const raw = String(totalAmountField?.value ?? '').replace(/[^0-9.]/g, '');
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  // Remaining (unbilled) balance on the selected contract, from the contract
  // ledger encoded on the combobox; null when no contract is chosen.
  function remainingForContract(): number | null {
    const a = contractAmounts[contractField?.value ?? ''];
    return a ? a.remaining : null;
  }
  // True when the entered total is strictly over the contract's remaining balance.
  // (Equal is allowed — that's a final invoice, handled separately.)
  function exceedsRemaining(): boolean {
    const rem = remainingForContract();
    return rem != null && readInvoiceTotal() > rem;
  }
  // Live toggle for the over-balance alert (run on total/contract change).
  function refreshTotalExceeds(): void {
    const exceedsErr = wizard.querySelector<HTMLElement>('[data-step-error="total-exceeds"]');
    const rem = remainingForContract();
    if (rem != null && exceedsRemaining()) {
      const amtEl = exceedsErr?.querySelector<HTMLElement>('[data-remaining-amount]');
      if (amtEl) amtEl.textContent = fmtCurrency(rem);
      exceedsErr?.removeAttribute('hidden');
      totalAmountField?.setAttribute('error-text', 'Exceeds the remaining contract balance.');
    } else {
      exceedsErr?.setAttribute('hidden', '');
      if (totalAmountField?.getAttribute('error-text') === 'Exceeds the remaining contract balance.') {
        totalAmountField.removeAttribute('error-text');
      }
    }
  }

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

  // ---- Final-invoice flag + detection ----
  // The vendor owns this checkbox — the wizard never ticks it for them. Detection
  // only decides *whether to ask*: if the contract's remaining balance is the same
  // as, or only slightly more than, this invoice's total ("slightly more" = the gap
  // is under 5% of the total contract value), we prompt once on Review & submit.

  const finalCheckbox = wizard.querySelector<any>('[data-final-invoice]');
  const finalCallout = wizard.querySelector<HTMLElement>('[data-final-invoice-callout]');
  const finalDialog = wizard.querySelector<any>('[data-final-invoice-dialog]');
  const contractField = wizard.querySelector<any>('[data-field="contract"]');

  let contractAmounts: Record<string, { total: number; remaining: number }> = {};
  try {
    contractAmounts = JSON.parse(contractField?.dataset.contractAmounts ?? '{}');
  } catch { /* leave empty */ }

  // Live over-balance feedback: re-check whenever the total or the chosen
  // contract changes, so the alert appears/clears without waiting for Next.
  totalAmountField?.addEventListener('input', refreshTotalExceeds);
  totalAmountField?.addEventListener('change', refreshTotalExceeds);
  contractField?.addEventListener('change', refreshTotalExceeds);

  // Contract → project auto-populate (project field is read-only for reference only).
  const projectDisplayField = wizard.querySelector<any>('[data-field="project"]');
  let contractProjectMap: Record<string, string> = {};
  try { contractProjectMap = JSON.parse(contractField?.dataset.contractProjects ?? '{}'); } catch { /* leave empty */ }
  contractField?.addEventListener('change', () => {
    if (projectDisplayField) projectDisplayField.value = contractProjectMap[contractField.value ?? ''] ?? '';
  });

  function syncFinalCallout(): void {
    finalCallout?.classList.toggle('is-flagged', !!finalCheckbox?.checked);
  }

  // The vendor has decided once they toggle the box OR answer the prompt — either
  // way we never auto-prompt again.
  let finalDecided = false;
  finalCheckbox?.addEventListener('change', () => {
    finalDecided = true;
    syncFinalCallout();
  });

  function invoiceTotal(): number {
    return readInvoiceTotal();
  }

  function seemsFinalInvoice(): boolean {
    const amounts = contractAmounts[contractField?.value ?? ''];
    const total = invoiceTotal();
    if (!amounts || total <= 0) return false;
    const gap = amounts.remaining - total;
    // Remaining must cover the invoice (gap ≥ 0) and leave less than 5% of the
    // total contract unbilled — i.e. this invoice all but closes the contract.
    return gap >= 0 && gap < 0.05 * amounts.total;
  }

  // Returns true if we still need the vendor's decision before proceeding.
  function shouldPromptFinal(): boolean {
    return !!finalCheckbox && !finalDecided && !finalCheckbox.checked && seemsFinalInvoice();
  }

  // Opens the confirm modal, then runs onResolved once the vendor answers.
  function promptFinalInvoice(onResolved: () => void): void {
    if (!finalDialog) { onResolved(); return; }
    const contractName = contractField?.value || 'this contract';
    finalDialog.message =
      `The remaining balance on ${contractName} is within 5% of this invoice's total, ` +
      `which usually means it's the last one. Marking it final closes out the contract — ` +
      `should we flag this as the final invoice?`;
    const handler = (e: CustomEvent<{ confirmed: boolean; dismissed?: boolean }>): void => {
      finalDialog.removeEventListener('resolved', handler);
      // Backdrop/Esc dismiss isn't an answer — it cancels the process. Stay on the
      // current step and re-prompt next time (don't mark finalDecided).
      if (e.detail?.dismissed) return;
      finalDecided = true;
      if (e.detail?.confirmed) {
        finalCheckbox.checked = true;
        syncFinalCallout();
      }
      onResolved();
    };
    finalDialog.addEventListener('resolved', handler);
    finalDialog.show();
  }

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

  // The summary markup is the CbfInvoiceReviewSummary component (esa-card legos);
  // here we only fill its [data-review="…"] placeholders from form state. Two
  // instances exist (page step + modal), so fill is scoped to one root container.
  const fileRowSvg =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  function fillReviewSummary(root: HTMLElement | null): void {
    if (!root) return;
    const set = (key: string, value: string): void => {
      const el = root.querySelector<HTMLElement>(`[data-review="${key}"]`);
      if (el) el.textContent = value;
    };

    set('file-name', uploadedFile?.name ?? '(no file)');
    set('file-size', uploadedFile ? formatBytes(uploadedFile.size) : '');

    set('invoice-number', fieldVal('[data-field="invoice-number"]') || 'No invoice number');
    // Label-left review layout: show the full contract / project identifiers as values.
    set('contract', comboboxLabel('[data-field="contract"]') || '—');
    set('project', fieldVal('[data-field="project"]') || '—');

    const invoiceDate = fieldVal('[data-field="invoice-date"]');
    set('issued', invoiceDate ? formatDate(invoiceDate) : 'Not set');
    // Performance period is split into separate start / end rows on the review card.
    const ps = fieldVal('[data-field="perf-start"]');
    const pe = fieldVal('[data-field="perf-end"]');
    set('perf-start', ps ? formatDate(ps) : 'Not set');
    set('perf-end', pe ? formatDate(pe) : 'Not set');

    set('total', fmtCurrency(invoiceTotal()));

    root.querySelector<HTMLElement>('[data-review="final-flag"]')
      ?.toggleAttribute('hidden', !finalCheckbox?.checked);

    // Supporting documents — rows are plain data (not legos); toggle the card.
    const docsList = root.querySelector<HTMLElement>('[data-review="docs-list"]');
    if (docsList) {
      docsList.innerHTML = supportingDocs.map((f) => `
        <div class="cbf-review-row">
          ${fileRowSvg}
          <span>${escHtml(f.name)}</span>
          <span class="cbf-review-meta">${formatBytes(f.size)}</span>
        </div>`).join('');
    }
    root.querySelector<HTMLElement>('[data-review="docs-card"]')
      ?.toggleAttribute('hidden', supportingDocs.length === 0);

    // Notes — toggle the card when empty.
    const notes = fieldVal('[data-field="notes"]');
    set('notes', notes);
    root.querySelector<HTMLElement>('[data-review="notes-card"]')
      ?.toggleAttribute('hidden', !notes);
  }

  function populateReview(): void {
    fillReviewSummary(wizard.querySelector<HTMLElement>('[data-review-content]'));
  }

  function populateModalReview(): void {
    fillReviewSummary(wizard.querySelector<HTMLElement>('[data-modal-review-content]'));
  }

  // ---- Submit ----

  function submitInvoice(): void {
    const isModal = confirmMode() === 'modal';
    // Target the submit button in whichever surface is active.
    const btnWrap = isModal ? '[data-modal-submit]' : '[data-wizard-submit]';
    const btn = wizard.querySelector<HTMLButtonElement>(`${btnWrap} button.esa-button`);
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
      // Both modes: the "Invoice submitted" page/success page is replaced by a success
      // toast. Close the modal if open, reset to a blank form (in place, no reload),
      // and let the vendor file another invoice.
      restoreSubmitButton(btn);
      if (isModal) wizard.querySelector<any>('[data-confirm-modal]')?.close();
      resetWizard();
      const snackbar = document.querySelector<any>('[data-snackbar]');
      snackbar?.success?.(`Invoice ${ref} submitted. The form has been cleared for your next one.`, { duration: 6000 });
    }, 1500);
  }

  function restoreSubmitButton(btn: HTMLButtonElement | null): void {
    if (!btn) return;
    btn.classList.remove('esa-button--loading');
    btn.disabled = false;
    btn.removeAttribute('aria-busy');
    btn.querySelector('.esa-button__spinner')?.remove();
    btn.querySelector('.esa-button__label')?.classList.remove('esa-button__label--hidden');
  }

  // Reset the wizard back to a blank step-0 form (used after a modal-mode submit so
  // the vendor can file another invoice without a page reload).
  function resetWizard(): void {
    clearFile();
    supportingDocs = [];
    renderDocs();
    wizard.querySelectorAll<any>('[data-field]').forEach((el) => {
      if (typeof el.checked === 'boolean') el.checked = false;
      el.value = '';
      el.removeAttribute?.('error-text');
    });
    wizard.querySelectorAll<HTMLElement>('[data-step-error]').forEach((el) => el.setAttribute('hidden', ''));
    finalDecided = false;
    if (finalCheckbox) finalCheckbox.checked = false;
    syncFinalCallout();
    pdfEverLoaded = false;
    syncFormLock();
    setStepVisibility(current, false);
    current = 0;
    setStepVisibility(0, true);
    updateStepper();
    syncPdfPanel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
```
