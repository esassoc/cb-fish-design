# Submit & confirmation

Submission and its confirmation. A dev toggle ([data-confirm-mode]) switches between two modes that share the SAME review summary: "page" (the Review step above) and "modal" (this esa-dialog "Review & submit", [data-confirm-modal]). There is NO post-submit success page in either mode — submitting shows a success toast and resets the wizard to a fresh blank form.

## Key decisions
- The modal wraps the shared CbfInvoiceReviewSummary with a Back/Submit footer; populateModalReview() fills it the same way the page step is filled.
- submitInvoice() simulates ~1.5s (spinner on the Submit button), then: restores the button, closes the modal if open, resets the wizard, and fires an esa-snackbar success toast — "Invoice <ref> submitted. The form has been cleared for your next one." (duration 6s). The toast REPLACES the former "Invoice submitted" confirmation screen entirely.
- On narrow viewports (≤600px) esa-dialog and esa-confirm-dialog render as bottom sheets (hub edit) rather than centered dialogs.
- The reference number is generated client-side as INV-<year>-<5-digit> — prototype demonstration only.

## Gotchas
- There is no [data-step="2"] / success screen — do not look for one in the DOM. Confirmation is the toast (esa-snackbar-container [data-snackbar], which must be present on the page) plus an in-place reset.
- esa-dialog renders empty while closed — the captured region is the collapsed shell; the behavior is what matters.
- The "Confirmation mode" bar ([data-confirm-mode-bar]) and "Autofill → Review" ([data-dev-autofill]) are prototype-only dev tools and must NOT ship to production.

## Markup
```html
<esa-dialog
  data-confirm-modal="true"
  heading="Review &amp; submit"
  size="lg"
  show-close-button="true"
>
  <!-- JS fills the [data-review] placeholders (populateModalReview). -->
  <div data-modal-review-content="">
    <div class="cbf-review-summary" data-review-summary="">
      <div class="esa-card">
        <div class="esa-card__body typography-body-md">
          <div class="cbf-invoice-card cbf-invoice-card--summary">
            <div class="cbf-invoice-card__head">
              <p class="cbf-invoice-card__number" data-review="invoice-number"></p>
              <span class="cbf-invoice-card__flag" data-review="final-flag" hidden=""
                >Final invoice</span
              >
            </div>
            <dl class="cbf-invoice-card__rows">
              <div class="cbf-invoice-card__row">
                <dt class="cbf-invoice-card__row-label">Invoice date</dt>
                <dd class="cbf-invoice-card__row-value" data-review="issued"></dd>
              </div>
              <div class="cbf-invoice-card__row">
                <dt class="cbf-invoice-card__row-label">Performance start</dt>
                <dd class="cbf-invoice-card__row-value" data-review="perf-start"></dd>
              </div>
              <div class="cbf-invoice-card__row">
                <dt class="cbf-invoice-card__row-label">Performance end</dt>
                <dd class="cbf-invoice-card__row-value" data-review="perf-end"></dd>
              </div>
              <div class="cbf-invoice-card__row">
                <dt class="cbf-invoice-card__row-label">Contract</dt>
                <dd class="cbf-invoice-card__row-value" data-review="contract"></dd>
              </div>
              <div class="cbf-invoice-card__row">
                <dt class="cbf-invoice-card__row-label">Project</dt>
                <dd class="cbf-invoice-card__row-value" data-review="project"></dd>
              </div>
            </dl>
            <div class="cbf-invoice-card__total">
              <span class="cbf-invoice-card__total-label">Total amount due</span
              ><span class="cbf-invoice-card__total-value" data-review="total"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="esa-card">
        <div class="esa-card__header">
          <div class="esa-card__header-content">
            <div class="esa-card__titles">
              <h3 class="esa-card__title typography-title-sm-strong">Uploaded invoice</h3>
            </div>
          </div>
        </div>
        <div class="esa-card__body typography-body-md">
          <div class="cbf-review-row">
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span data-review="file-name"></span>
            <span class="cbf-review-meta" data-review="file-size"></span>
            <button
              type="button"
              class="cbf-doc-view"
              data-view-invoice=""
              hidden=""
              aria-label="Preview invoice"
            >
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
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div data-review="docs-card" hidden="">
        <div class="esa-card">
          <div class="esa-card__header">
            <div class="esa-card__header-content">
              <div class="esa-card__titles">
                <h3 class="esa-card__title typography-title-sm-strong">
                  Supporting documents
                </h3>
              </div>
            </div>
          </div>
          <div class="esa-card__body typography-body-md">
            <div class="cbf-review-docs" data-review="docs-list"></div>
          </div>
        </div>
      </div>
      <div data-review="notes-card" hidden="">
        <div class="esa-card">
          <div class="esa-card__header">
            <div class="esa-card__header-content">
              <div class="esa-card__titles">
                <h3 class="esa-card__title typography-title-sm-strong">Notes</h3>
              </div>
            </div>
          </div>
          <div class="esa-card__body typography-body-md">
            <p class="cbf-review-notes" data-review="notes"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div slot="footer" class="cbf-confirm-modal-footer">
    <span data-wizard-cancel="">
      <span
        class="esa-button esa-button--variant-danger esa-button--appearance-outline esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Cancel</span>
        </button></span
      >
    </span>
    <span data-modal-back="">
      <span
        class="esa-button esa-button--variant-secondary esa-button--appearance-outline esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Edit</span>
        </button></span
      >
    </span>
    <span data-modal-submit="">
      <span
        class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Submit invoice</span>
        </button></span
      >
    </span>
  </div>
</esa-dialog>
```

## Styles
```css
.cbf-invoice-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-400);
  padding-bottom: var(--spacing-400);
  border-bottom: 1px solid var(--color-border-default);
}
.cbf-invoice-card__number {
  margin: 0;
  font-family: var(--typography-font-family-display);
  font-size: 22px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}
.cbf-invoice-card__flag {
  flex: none;
  display: inline-flex;
  align-items: center;
  padding: 2px var(--spacing-200);
  border-radius: var(--radius-100);
  background: var(--color-background-brand-subtle);
  color: var(--color-background-brand-muted);
  font-size: 12px;
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-invoice-card__flag[hidden] {
  display: none;
}
.cbf-invoice-card__rows {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-300);
  padding: var(--spacing-400) 0;
}
.cbf-invoice-card__row {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: var(--spacing-400);
  align-items: baseline;
}
.cbf-invoice-card__row-label {
  font-size: 14px;
  font-weight: var(--typography-font-weight-medium);
  color: var(--color-content-default-tertiary);
}
.cbf-invoice-card__row-value {
  margin: 0;
  font-size: 15px;
  color: var(--color-content-default);
}
.cbf-invoice-card__total {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: var(--spacing-400);
  align-items: baseline;
  padding-top: var(--spacing-400);
  border-top: 1px solid var(--color-border-default);
}
.cbf-invoice-card__total-label {
  font-size: 15px;
  font-weight: var(--typography-font-weight-medium);
  color: var(--color-content-default-secondary);
}
.cbf-invoice-card__total-value {
  font-family: var(--typography-font-family-display);
  font-size: 28px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-title-sm-strong {
  font-family: var(--typography-title-sm-strong-font-family);
  font-size: var(--typography-title-sm-strong-font-size);
  font-weight: var(--typography-title-sm-strong-font-weight);
  line-height: var(--typography-title-sm-strong-line-height);
  letter-spacing: var(--typography-title-sm-strong-letter-spacing);
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
.esa-button--sm {
  --_btn-pad-y: var(--spacing-250, 0.625rem);
  --_btn-padding-x: var(--spacing-250, 0.625rem);
  --_btn-radius: var(--button-radius-sm, 4px);
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
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent-border, transparent);
}
.esa-button--variant-chrome .esa-button__native {
  background: transparent;
  color: inherit;
  border-color: transparent;
}
.esa-button__label {
  white-space: nowrap;
}
summary.esa-button {
  list-style: none;
  cursor: pointer;
}
.esa-button--variant-danger {
  --_accent: var(--color-background-utility-danger);
  --_accent-hover: var(--color-background-utility-danger-hover);
  --_accent-text: var(--color-content-utility-danger);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button--variant-secondary {
  --_accent: var(--color-background-brand-muted);
  --_accent-hover: var(--color-background-brand-muted-hover);
  --_on: var(--color-content-on-brand-muted, var(--color-content-default));
  --_accent-text: var(--color-content-brand);
  --_accent-border: var(--color-border-default-strong, #bbbbbb);
}
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.cbf-review-summary {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.cbf-review-summary .esa-card {
  box-shadow: var(--elevation-2, 0 1px 3px rgba(16, 24, 40, 0.06));
}
.cbf-review-summary .cbf-review-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  font-size: 15px;
  color: var(--color-content-default);
}
.cbf-review-summary .cbf-review-row svg {
  color: var(--color-background-brand-muted);
  flex: none;
}
.cbf-review-summary .cbf-review-meta {
  color: var(--color-content-default-tertiary);
  font-size: 13px;
}
.cbf-review-summary .cbf-doc-view {
  flex: none;
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  background: var(--color-background-elevation-raised);
  color: var(--color-content-default-tertiary);
  cursor: pointer;
  transition:
    color 0.12s ease,
    border-color 0.12s ease,
    background 0.12s ease;
}
.cbf-review-summary .cbf-doc-view[hidden] {
  display: none;
}
.cbf-confirm-modal-footer {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  flex-wrap: wrap;
  width: 100%;
}
.cbf-confirm-modal-footer [data-modal-back] {
  margin-left: auto;
}
.typography-microcopy-md-subtle {
  font-family: var(--typography-microcopy-md-subtle-font-family);
  font-size: var(--typography-microcopy-md-subtle-font-size);
  font-weight: var(--typography-microcopy-md-subtle-font-weight);
  line-height: var(--typography-microcopy-md-subtle-line-height);
  letter-spacing: var(--typography-microcopy-md-subtle-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.esa-card {
  --_card-bg: var(--card-bg, var(--color-background-elevation-raised, #fcfcfc));
  --_card-border: var(--card-border-color, var(--color-border-default, #cecece));
  --_card-radius: var(--radius-md, 0.5rem);
  --_card-padding: var(--spacing-500, 1.5rem);
  --_card-header-bg: var(--card-header-bg, transparent);
  --_card-header-color: var(--color-content-default, #202020);
  --_card-header-border: var(--color-border-default-subtle, #d9d9d9);
  display: block;
  background: var(--_card-bg);
  border: var(--border-width-default, 1px) solid var(--_card-border);
  border-radius: var(--_card-radius);
  overflow: hidden;
}
.esa-card__body {
  padding: var(--_card-padding);
}
.esa-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-400, 1rem) var(--_card-padding);
  background: var(--_card-header-bg);
  color: var(--_card-header-color);
  border-bottom: var(--border-width-default, 1px) solid var(--_card-header-border);
  min-height: 56px;
}
.esa-card__header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-300, 0.75rem);
}
.esa-card__titles {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-050, 0.125rem);
}
.esa-card__title {
  margin: 0;
  color: inherit;
}
```

## Tokens
- `--border-width-default`: 1px _(semantic)_
- `--button-radius-md`: .5rem _(component)_
- `--button-radius-sm`: .25rem _(component)_
- `--card-bg`: #fcfcfc _(component)_
- `--card-border-color`: #dcdcdc _(component)_
- `--card-header-bg`: transparent _(component)_
- `--color-background-brand`: #1e5386 _(semantic)_
- `--color-background-brand-hover`: #1a4570 _(semantic)_
- `--color-background-brand-muted`: #2770b2 _(semantic)_
- `--color-background-brand-muted-hover`: #1e5386 _(semantic)_
- `--color-background-brand-subtle`: #f3f7fc _(semantic)_
- `--color-background-elevation-raised`: #fcfcfc _(semantic)_
- `--color-background-utility-danger`: #ce2c31 _(semantic)_
- `--color-background-utility-danger-hover`: #641723 _(semantic)_
- `--color-border-default`: #dcdcdc _(semantic)_
- `--color-border-default-strong`: #bdbdbd _(semantic)_
- `--color-border-default-subtle`: #efefef _(semantic)_
- `--color-content-brand`: #1e5386 _(semantic)_
- `--color-content-default`: #3d3d3d _(semantic)_
- `--color-content-default-knockout`: #fcfcfc _(semantic)_
- `--color-content-default-secondary`: #525252 _(semantic)_
- `--color-content-default-tertiary`: #656565 _(semantic)_
- `--color-content-on-brand-muted`: #203c25 _(semantic)_
- `--color-content-utility-danger`: #ce2c31 _(semantic)_
- `--elevation-2`: 0 2px 12px 0 rgba(0, 0, 0, .04) _(semantic)_
- `--radius-100`: .25rem _(primitive)_
- `--radius-md`: .5rem _(semantic)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--transition-fast`: .15s ease _(semantic)_
- `--typography-body-md-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-body-md-font-size`: clamp(.75rem, .66rem + .44vw, .9375rem) _(semantic)_
- `--typography-body-md-font-weight`: 400 _(semantic)_
- `--typography-body-md-letter-spacing`: .01em _(semantic)_
- `--typography-body-md-line-height`: 1.6 _(semantic)_
- `--typography-font-family-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-font-weight-medium`: 500 _(semantic)_
- `--typography-font-weight-semibold`: 600 _(semantic)_
- `--typography-microcopy-md-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-microcopy-md-font-size`: clamp(.75rem, .66rem + .44vw, .9375rem) _(semantic)_
- `--typography-microcopy-md-font-weight`: 500 _(semantic)_
- `--typography-microcopy-md-letter-spacing`: .01em _(semantic)_
- `--typography-microcopy-md-line-height`: 1 _(semantic)_
- `--typography-microcopy-md-subtle-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-microcopy-md-subtle-font-size`: clamp(.75rem, .66rem + .44vw, .9375rem) _(semantic)_
- `--typography-microcopy-md-subtle-font-weight`: 400 _(semantic)_
- `--typography-microcopy-md-subtle-letter-spacing`: .01em _(semantic)_
- `--typography-microcopy-md-subtle-line-height`: 1 _(semantic)_
- `--typography-title-sm-strong-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-title-sm-strong-font-size`: clamp(.8125rem, .71rem + .5vw, 1.0625rem) _(semantic)_
- `--typography-title-sm-strong-font-weight`: 600 _(semantic)_
- `--typography-title-sm-strong-letter-spacing`: .01em _(semantic)_
- `--typography-title-sm-strong-line-height`: 1.6 _(semantic)_

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
        i < current ? 'var(--color-background-brand)' : 'var(--color-border-default)';
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
  // A minimal but *valid* one-page PDF (base64). A bare "%PDF-1.4" header with no
  // objects/xref/trailer is NOT a renderable PDF — Chrome's PDF engine shows a
  // blank viewer for it — so the demo file must be a real document to preview.
  const DEMO_PDF_BASE64 =
    'JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXSAvUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GMSA0IDAgUiA+PiA+PiAvQ29udGVudHMgNSAwIFIgPj4KZW5kb2JqCjQgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iago1IDAgb2JqCjw8IC9MZW5ndGggNjAgPj4Kc3RyZWFtCkJUIC9GMSAyMiBUZiA3MiA3MDAgVGQgKERlbW8gaW52b2ljZSBcMjI2IGZvciB0ZXN0aW5nKSBUaiBFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0MSAwMDAwMCBuIAowMDAwMDAwMzExIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKNDIxCiUlRU9GCg==';

  function makeDemoInvoiceFile(): File {
    const bytes = Uint8Array.from(atob(DEMO_PDF_BASE64), (c) => c.charCodeAt(0));
    return new File([bytes], 'demo-invoice.pdf', { type: 'application/pdf' });
  }

  function devAutofill(): void {
    // A valid demo PDF unlocks the form (pdfEverLoaded), shows the panel, and
    // actually renders in the viewer.
    if (!uploadedFile) {
      showFile(makeDemoInvoiceFile());
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
    if (t.closest('[data-wizard-save-draft]')) saveDraft();
    if (t.closest('[data-wizard-submit]')) submitInvoice();
    if (t.closest('[data-modal-submit]')) submitInvoice();
    if (t.closest('[data-modal-back]')) wizard.querySelector<any>('[data-confirm-modal]')?.close();
    if (t.closest('[data-wizard-cancel]')) {
      wizard.querySelector<any>('[data-confirm-modal]')?.close();
      window.location.href = import.meta.env.BASE_URL + 'vendor-dashboard';
    }
    if (t.closest('[data-dev-autofill]')) devAutofill();
  });

  // ---- Combobox initialization ----
  // esa-combobox takes options as a JS property, not slotted HTML.
  // We encode the options as JSON on a data attribute at build time and assign here.
  wizard.querySelectorAll<any>('[data-combobox-options]').forEach((el) => {
    try { el.options = JSON.parse(el.dataset.comboboxOptions ?? '[]'); } catch {}
  });

  // ---- PDF panel sync ----

  function syncPdfPanel(): void {
    // The panel rides alongside BOTH the details form (step 0) and the review
    // summary (step 1) so the layout stays consistent across the two steps.
    const onReview = current === 1;
    const show = current === 0 || onReview;
    pdfPanel?.toggleAttribute('hidden', !show);
    cardBody?.classList.toggle('has-pdf', show);
    // Remove is a step-0 edit action; on review the viewer is a read-only preview
    // the vendor can switch between the invoice and each supporting document.
    wizard.querySelector<HTMLElement>('[data-upload-remove]')?.toggleAttribute('hidden', onReview);
    // Whenever the panel (re)opens, reset the viewer to the main invoice so a
    // leftover supporting-doc preview doesn't carry across step changes.
    if (show && uploadedFile) previewMainInvoice();
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
  // Object URL for a supporting-doc preview (kept separate from pdfObjectUrl so
  // switching previews never revokes the main invoice's URL).
  let activePreviewUrl: string | null = null;

  // Highlight whichever review "view" button matches the doc now on screen.
  function setActiveViewRow(name: string): void {
    wizard.querySelectorAll<HTMLElement>('[data-view-invoice],[data-view-doc]').forEach((b) => {
      b.classList.toggle('is-active', b.getAttribute('data-view-name') === name);
    });
  }

  // Point the viewer back at the main invoice PDF.
  function previewMainInvoice(): void {
    if (activePreviewUrl) { URL.revokeObjectURL(activePreviewUrl); activePreviewUrl = null; }
    if (pdfFrame && pdfObjectUrl) pdfFrame.src = pdfObjectUrl;
    if (pdfFilenameEl && uploadedFile) pdfFilenameEl.textContent = uploadedFile.name;
    setActiveViewRow(uploadedFile?.name ?? '');
  }

  // Point the viewer at a supporting document (PDF or image renders inline).
  function previewDoc(file: File): void {
    if (activePreviewUrl) { URL.revokeObjectURL(activePreviewUrl); activePreviewUrl = null; }
    activePreviewUrl = URL.createObjectURL(file);
    if (pdfFrame) pdfFrame.src = activePreviewUrl;
    if (pdfFilenameEl) pdfFilenameEl.textContent = file.name;
    setActiveViewRow(file.name);
  }

  // Only PDFs and images preview inline in the iframe; office docs can't be shown.
  function isPreviewable(file: File): boolean {
    return file.type === 'application/pdf'
      || file.type.startsWith('image/')
      || /\.(pdf|png|jpe?g)$/i.test(file.name);
  }

  // Show the panel immediately on load (step 0). Deferred to here so syncPdfPanel's
  // uploadedFile read runs after that binding is initialized (no TDZ at init).
  syncPdfPanel();

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

  // Accept a batch of files (from the picker or a drag-drop), skipping oversize
  // and duplicate-name files and surfacing a single error for any rejected ones.
  function addDocs(incoming: File[]): void {
    if (!incoming.length) return;
    const oversize = incoming.filter((f) => f.size > MAX_FILE_BYTES);
    const existingNames = new Set(supportingDocs.map((f) => f.name));
    supportingDocs.push(
      ...incoming.filter((f) => f.size <= MAX_FILE_BYTES && !existingNames.has(f.name)),
    );
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
  }

  docsInput?.addEventListener('change', () => {
    addDocs(Array.from(docsInput.files ?? []));
    docsInput.value = '';
  });

  // Drag & drop onto the whole backup-documents surface — multiple files at once.
  const docsZone = wizard.querySelector<HTMLElement>('[data-docs-zone]');
  docsZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    docsZone.classList.add('is-over');
  });
  docsZone?.addEventListener('dragleave', (e) => {
    // Only clear when the pointer actually leaves the zone, not its children.
    if (!docsZone.contains(e.relatedTarget as Node)) docsZone.classList.remove('is-over');
  });
  docsZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    docsZone.classList.remove('is-over');
    addDocs(Array.from(e.dataTransfer?.files ?? []));
  });

  docsList?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-doc-remove]');
    if (!btn) return;
    supportingDocs.splice(Number(btn.dataset.docRemove), 1);
    renderDocs();
  });

  // Review step: "view" buttons swap which document the PDF panel is showing.
  wizard.querySelector<HTMLElement>('[data-review-content]')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-view-invoice]')) { previewMainInvoice(); return; }
    const docBtn = target.closest<HTMLElement>('[data-view-doc]');
    if (docBtn) {
      const doc = supportingDocs[Number(docBtn.dataset.viewDoc)];
      if (doc) previewDoc(doc);
    }
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
  const eyeSvg =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';

  // withViewer: only the page-step review sits beside the PDF panel, so only it
  // renders the "view" buttons. The modal review has no panel to drive.
  function fillReviewSummary(root: HTMLElement | null, withViewer = false): void {
    if (!root) return;
    const set = (key: string, value: string): void => {
      const el = root.querySelector<HTMLElement>(`[data-review="${key}"]`);
      if (el) el.textContent = value;
    };

    set('file-name', uploadedFile?.name ?? '(no file)');
    set('file-size', uploadedFile ? formatBytes(uploadedFile.size) : '');

    // Main-invoice "view" button — shown only beside the panel; tag it with the
    // filename so setActiveViewRow can highlight it when it's the one on screen.
    const invViewBtn = root.querySelector<HTMLElement>('[data-view-invoice]');
    if (invViewBtn) {
      invViewBtn.toggleAttribute('hidden', !withViewer || !uploadedFile);
      invViewBtn.setAttribute('data-view-name', uploadedFile?.name ?? '');
    }

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
      docsList.innerHTML = supportingDocs.map((f, i) => `
        <div class="cbf-review-row">
          ${fileRowSvg}
          <span>${escHtml(f.name)}</span>
          <span class="cbf-review-meta">${formatBytes(f.size)}</span>
          ${withViewer && isPreviewable(f)
            ? `<button type="button" class="cbf-doc-view" data-view-doc="${i}" data-view-name="${escHtml(f.name)}" aria-label="Preview ${escHtml(f.name)}">${eyeSvg}</button>`
            : ''}
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
    fillReviewSummary(wizard.querySelector<HTMLElement>('[data-review-content]'), true);
  }

  function populateModalReview(): void {
    fillReviewSummary(wizard.querySelector<HTMLElement>('[data-modal-review-content]'));
  }

  // ---- Save as draft ----
  // A draft keeps whatever's been entered so far — no validation, no submission.
  // Prototype: there's no persistence layer, so we confirm with a toast and return
  // the vendor to the dashboard, where drafts are listed with a "Draft" status.
  function saveDraft(): void {
    const snackbar = document.querySelector<any>('[data-snackbar]');
    snackbar?.success?.('Draft saved.', { duration: 3000 });
    setTimeout(() => {
      window.location.href = import.meta.env.BASE_URL + 'vendor-dashboard';
    }, 700);
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
      snackbar?.success?.(`Invoice ${ref} submitted.`, { duration: 4000 });
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
