# Review step

Step 1 — read-only summary of everything entered in step 0. The step shell is a static empty container; all content is JS-generated into [data-review-content] by populateReview() when goTo(1) is called. Shows: uploaded file info, invoice details, line items table, supporting docs list, and notes.

## Key decisions
- Review content is entirely client-side — populateReview() reads all [data-field] values, combobox labels, lineItems[], and supportingDocs[] at navigation time.
- Combobox display labels are resolved via comboboxLabel(selector) which reads el.options to find the matching label for the stored value.
- PDF actions (Replace / Remove) in the review card navigate back to step 0 or clear the file.

## Gotchas
- The review card ([data-review-content]) is empty in SSR output — do not expect Astro-rendered content here.
- If the user goes back and changes form data, the review is re-populated fresh on the next goTo(1) call.

## Markup
```html
<div class="cbf-wizard-step" data-step="1" hidden="">
  <h1 class="cbf-page-title">Review &amp; submit</h1>
  <div class="cbf-review-notice">
    <div class="esa-alert-box esa-alert-box--info">
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
        <div class="esa-alert-box__message">
          Please review your invoice before submitting. Once submitted, you'll receive a
          confirmation and can track processing status in your account.
        </div>
      </div>
    </div>
  </div>
  <!-- JS populates this from form state (invoice-wizard.client.ts: populateReview) -->
  <div class="cbf-review-card" data-review-content=""></div>
  <div class="cbf-step-actions">
    <button type="button" class="cbf-btn-ghost" data-wizard-back="">Back</button>
    <span data-wizard-submit="">
      <span
        class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Submit invoice </span>
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
- `--color-surface-inverse`: #13273e _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--font-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(primitive)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--form-font-size-md`: clamp(.75rem, .66rem + .44vw, .9375rem) _(component)_
- `--form-height-md`: 40px _(component)_
- `--form-padding-x-md`: .75rem _(component)_
- `--form-radius-md`: .5rem _(component)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-700`: 3rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
