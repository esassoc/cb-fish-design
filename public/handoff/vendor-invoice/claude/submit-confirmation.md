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
        <div class="esa-card__body">
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
              <h3 class="esa-card__title">Uploaded invoice</h3>
            </div>
          </div>
        </div>
        <div class="esa-card__body">
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
          </div>
        </div>
      </div>
      <div data-review="docs-card" hidden="">
        <div class="esa-card">
          <div class="esa-card__header">
            <div class="esa-card__header-content">
              <div class="esa-card__titles">
                <h3 class="esa-card__title">Supporting documents</h3>
              </div>
            </div>
          </div>
          <div class="esa-card__body">
            <div class="cbf-review-docs" data-review="docs-list"></div>
          </div>
        </div>
      </div>
      <div data-review="notes-card" hidden="">
        <div class="esa-card">
          <div class="esa-card__header">
            <div class="esa-card__header-content">
              <div class="esa-card__titles"><h3 class="esa-card__title">Notes</h3></div>
            </div>
          </div>
          <div class="esa-card__body">
            <p class="cbf-review-notes" data-review="notes"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div slot="footer" class="cbf-confirm-modal-footer">
    <span data-wizard-cancel="">
      <span
        class="esa-button esa-button--color-danger esa-button--appearance-outline esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Cancel </span>
        </button>
      </span>
    </span>
    <span data-modal-back="">
      <span
        class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Edit </span>
        </button>
      </span>
    </span>
    <span data-modal-submit="">
      <span
        class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Submit invoice </span>
        </button>
      </span>
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
  border-bottom: 1px solid var(--color-border);
}
.cbf-invoice-card__number {
  margin: 0;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}
.cbf-invoice-card__flag {
  flex: none;
  display: inline-flex;
  align-items: center;
  padding: 2px var(--spacing-200);
  border-radius: var(--radius-100);
  background: var(--color-primary-subtle);
  color: var(--color-secondary);
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
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
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
}
.cbf-invoice-card__row-value {
  margin: 0;
  font-size: 15px;
  color: var(--color-text-primary);
}
.cbf-invoice-card__total {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: var(--spacing-400);
  align-items: baseline;
  padding-top: var(--spacing-400);
  border-top: 1px solid var(--color-border);
}
.cbf-invoice-card__total-label {
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}
.cbf-invoice-card__total-value {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
}
.esa-card {
  --_card-bg: var(--card-bg, var(--color-surface, #ffffff));
  --_card-border: var(--card-border-color, var(--color-border, #e5e5e5));
  --_card-radius: var(--card-radius, var(--radius-300, 0.5rem));
  --_card-padding: var(--card-padding, var(--spacing-500, 1.5rem));
  --_card-header-bg: var(--card-header-bg, transparent);
  --_card-header-color: var(--card-header-color, var(--color-text-primary, #171717));
  --_card-header-border: var(
    --card-header-border-color,
    var(--color-border-light, #efefef)
  );
  display: block;
  background: var(--_card-bg);
  border: 1px solid var(--_card-border);
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
  border-bottom: 1px solid var(--_card-header-border);
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
  font-size: var(--type-size-250, 1.0625rem);
  font-weight: 600;
  margin: 0;
  color: inherit;
  font-family: var(--font-sans, "DM Sans", sans-serif);
}
.cbf-review-summary {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.cbf-review-summary .esa-card {
  box-shadow: var(--shadow-100, 0 1px 3px rgba(16, 24, 40, 0.06));
}
.cbf-review-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  font-size: 15px;
  color: var(--color-text-primary);
}
.cbf-review-row svg {
  color: var(--color-secondary);
  flex: none;
}
.cbf-review-meta {
  color: var(--color-text-muted);
  font-size: 13px;
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
```

## Tokens
- `--card-bg`: #fcfcfc _(component)_
- `--card-border-color`: #dcdcdc _(component)_
- `--card-header-bg`: transparent _(component)_
- `--card-header-border-color`: #efefef _(component)_
- `--card-header-color`: #3d3d3d _(component)_
- `--card-padding`: 1.5rem _(component)_
- `--card-radius`: .5rem _(component)_
- `--color-border`: #dcdcdc _(semantic)_
- `--color-border-light`: #efefef _(semantic)_
- `--color-danger`: #e5484d _(semantic)_
- `--color-danger-hover`: #dc3e42 _(semantic)_
- `--color-danger-strong`: #ce2c31 _(semantic)_
- `--color-gray-12`: #202020 _(primitive)_
- `--color-primary`: #1e5386 _(semantic)_
- `--color-primary-hover`: #1a4570 _(semantic)_
- `--color-primary-strong`: #2a7e3b _(semantic)_
- `--color-primary-subtle`: #f3f7fc _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
- `--color-secondary-hover`: #1e5386 _(semantic)_
- `--color-secondary-on-fill`: #203c25 _(semantic)_
- `--color-secondary-strong`: #1c4a76 _(semantic)_
- `--color-surface`: #fcfcfc _(semantic)_
- `--color-text-inverse`: #fcfcfc _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--font-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(primitive)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--font-weight-semibold`: 600 _(primitive)_
- `--form-font-size-md`: clamp(.75rem, .66rem + .44vw, .9375rem) _(component)_
- `--form-height-md`: 40px _(component)_
- `--form-padding-x-md`: .75rem _(component)_
- `--form-radius-md`: .5rem _(component)_
- `--radius-100`: .25rem _(primitive)_
- `--radius-300`: .5rem _(primitive)_
- `--shadow-100`: 0 2px 12px 0 rgba(0, 0, 0, .04) _(primitive)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
- `--type-size-250`: clamp(.8125rem, .71rem + .5vw, 1.0625rem) _(primitive)_
