# Submit & confirmation

Vendor invoice submission · source prototype: https://esassoc.github.io/cb-fish-design/vendor-invoice/

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

## Components

- `cbf-confirm-modal-footer` (spoke) · `src/components/vendor-invoice/cbf-invoice-confirm.astro`
- `cbf-doc-view` (spoke) · `src/components/vendor-invoice/cbf-invoice-review-summary.astro`
- `cbf-invoice-card` (spoke) · `src/components/shared/cbf-invoice-card.astro`
- `cbf-review-meta` (spoke) · `src/components/vendor-invoice/cbf-invoice-review-summary.astro`
- `cbf-review-notes` (spoke) · `src/components/vendor-invoice/cbf-invoice-review-summary.astro`
- `cbf-review-row` (spoke) · `src/components/vendor-invoice/cbf-invoice-review-summary.astro`
- `cbf-review-summary` (spoke) · `src/components/vendor-invoice/cbf-invoice-review-summary.astro`
- `esa-button` (hub) · `packages/ecology/src/components/esa-button.astro`
- `esa-card` (hub) · `packages/ecology/src/components/esa-card.astro`
- `esa-dialog` (hub) · `packages/ecology/src/components/esa-dialog.ts`

## Markup

_3 repeated elements are collapsed in the markup below; the comments say where._

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
              <!-- …and 3 more like this (<div class="cbf-invoice-card__row">) -->
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
                <h3 class="esa-card__title typography-title-sm-strong">Supporting documents</h3>
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
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
.typography-title-sm-strong {
  font-family: var(--typography-title-sm-strong-font-family);
  font-size: var(--typography-title-sm-strong-font-size);
  font-weight: var(--typography-title-sm-strong-font-weight);
  line-height: var(--typography-title-sm-strong-line-height);
  letter-spacing: var(--typography-title-sm-strong-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
.typography-title-sm-strong {
  font-family: var(--typography-title-sm-strong-font-family);
  font-size: var(--typography-title-sm-strong-font-size);
  font-weight: var(--typography-title-sm-strong-font-weight);
  line-height: var(--typography-title-sm-strong-line-height);
  letter-spacing: var(--typography-title-sm-strong-letter-spacing);
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
.cbf-invoice-card--stat .cbf-invoice-card__number {
  margin: 0;
  font-family: var(--typography-font-family-display);
  font-size: 26px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
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
.cbf-review-summary .cbf-review-row + .cbf-review-row {
  margin-top: var(--spacing-300);
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
.cbf-review-summary .cbf-doc-view svg {
  color: inherit;
}
.cbf-review-summary .cbf-doc-view:hover {
  color: var(--color-background-brand-muted);
  border-color: var(--color-border-brand);
  background: var(--color-background-brand-subtle);
}
.cbf-review-summary .cbf-doc-view.is-active {
  color: var(--color-background-elevation-raised);
  background: var(--color-background-brand-muted);
  border-color: var(--color-background-brand-muted);
}
.cbf-review-notes {
  margin: 0;
  font-size: 14px;
  color: var(--color-content-default-secondary);
  line-height: 1.6;
  white-space: pre-wrap;
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
.esa-card {
  --_card-bg: var(--card-bg, var(--color-background-elevation-raised, #fcfcfc));
  --_card-border: var(--card-border-color, var(--color-border-default, #cecece));
  --_card-radius: var(--radius-md, 0.5rem);
  --_card-padding: var(--spacing-500, 1.5rem);
  --_card-header-bg: var(--card-header-bg, transparent);
  --_card-header-color: var(--color-content-default, #202020);
  --_card-header-border: var(--color-border-default-subtle, #d9d9d9);
  --_card-meta-label-color: var(--color-content-default-secondary, #646464);
  --_card-meta-label-size: var(--typography-label-sm-font-size, 0.875rem);
  --_card-meta-value-size: var(--typography-label-md-font-size, 0.9375rem);
  display: block;
  background: var(--_card-bg);
  border: var(--border-width-default, 1px) solid var(--_card-border);
  border-radius: var(--_card-radius);
  overflow: hidden;
}
.esa-card--header-primary .esa-card__header {
  --_card-header-bg: var(--color-background-brand, #46a758);
  --_card-header-color: var(--color-content-default-knockout, #fcfcfc);
}
.esa-card--header-muted .esa-card__header {
  --_card-header-bg: var(--color-background-elevation-sunken, #f0f0f0);
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
.esa-card__body {
  padding: var(--_card-padding);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--button-chrome-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--button-radius-md` | `.5rem` | component |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-header-bg` | `transparent` | component |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-muted-hover` | `#1e5386` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-danger` | `#ce2c31` | semantic |
| `--color-background-utility-danger-hover` | `#641723` | semantic |
| `--color-border-brand` | `#c6dcf1` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--color-content-on-brand-muted` | `#203c25` | semantic |
| `--color-content-utility-danger` | `#ce2c31` | semantic |
| `--elevation-2` | `0 2px 12px 0 rgba(0, 0, 0, .04)` | semantic |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |
| `--typography-title-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-title-sm-strong-font-size` | `clamp(.8125rem, .71rem + .5vw, 1.0625rem)` | semantic |
| `--typography-title-sm-strong-font-weight` | `600` | semantic |
| `--typography-title-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-title-sm-strong-line-height` | `1.6` | semantic |
