# Action cards

Four navigational quick-action cards in a 2×2 grid. "Submit an invoice" is elevated as the primary CTA; the remaining three (Submission history, Payment status, Account & profile) are standard informational cards.

## Key decisions
- All four cards are esa-card legos — no custom card component.
- Grid uses the .grid layout primitive with data-gap="md", not a bespoke CSS grid.
- "Submit an invoice" card carries a filled esa-button to reinforce the primary path; the others link via the card href.

## Gotchas
- esa-card elevation variants differ between lego versions — verify the "elevated" prop name against the installed ecology version.
- Card actions are esa-button inside the card body, not anchor wrappers around the whole card.

## Markup
```html
<div
  class="cbf-vendor-portal-actions grid"
  data-gap="md"
  style="--grid-min: 260px; align-items: flex-start"
>
  <div class="esa-card esa-card--elevated esa-card--padding-spacious">
    <div class="esa-card__header">
      <div class="esa-card__header-content">
        <div class="esa-card__titles">
          <h3 class="esa-card__title">Submit an invoice</h3>
          <p class="esa-card__subtitle">Upload a PDF and complete invoice details</p>
        </div>
      </div>
    </div>
    <div class="esa-card__body">
      <p>
        Most submissions take under 5 minutes. You'll be guided step-by-step through
        uploading your invoice PDF, entering line items, and confirming totals before
        sending.
      </p>
    </div>
    <div class="esa-card__footer">
      <div>
        <span
          class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
        >
          <a
            class="esa-button__native"
            href="/cb-fish-design/vendor-invoice"
            role="button"
            ><span class="esa-icon esa-icon--md" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              ></svg>
            </span>
            <span class="esa-button__label"> Submit invoice </span></a
          >
        </span>
      </div>
    </div>
  </div>
  <div class="esa-card esa-card--outlined">
    <div class="esa-card__header">
      <div class="esa-card__header-content">
        <div class="esa-card__titles">
          <h3 class="esa-card__title">Submission history</h3>
          <p class="esa-card__subtitle">Review past invoices</p>
        </div>
      </div>
    </div>
    <div class="esa-card__body">
      <p>
        View all invoices you've submitted, track their current status, and download
        copies of previously submitted documents.
      </p>
    </div>
    <div class="esa-card__footer">
      <div>
        <span
          class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--md"
        >
          <button class="esa-button__native" type="button">
            <span class="esa-button__label"> View history </span>
          </button>
        </span>
      </div>
    </div>
  </div>
  <div class="esa-card esa-card--outlined">
    <div class="esa-card__header">
      <div class="esa-card__header-content">
        <div class="esa-card__titles">
          <h3 class="esa-card__title">Payment status</h3>
          <p class="esa-card__subtitle">Track remittance</p>
        </div>
      </div>
    </div>
    <div class="esa-card__body">
      <p>
        Check when payments have been processed and view remittance details and payment
        dates for completed invoices.
      </p>
    </div>
    <div class="esa-card__footer">
      <div>
        <span
          class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--md"
        >
          <button class="esa-button__native" type="button">
            <span class="esa-button__label"> Check status </span>
          </button>
        </span>
      </div>
    </div>
  </div>
  <div class="esa-card esa-card--outlined">
    <div class="esa-card__header">
      <div class="esa-card__header-content">
        <div class="esa-card__titles">
          <h3 class="esa-card__title">Account &amp; profile</h3>
          <p class="esa-card__subtitle">Manage company information</p>
        </div>
      </div>
    </div>
    <div class="esa-card__body">
      <p>
        Update your company details, banking information, and tax documentation on file
        with Columbia Basin Fish &amp; Wildlife Program.
      </p>
    </div>
    <div class="esa-card__footer">
      <div>
        <span
          class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--md"
        >
          <button class="esa-button__native" type="button">
            <span class="esa-button__label"> Manage account </span>
          </button>
        </span>
      </div>
    </div>
  </div>
</div>
```

## Styles
```css
.esa-icon-link {
  --_il-font: var(--icon-link-font-size-md, 1rem);
  display: inline-flex;
  align-items: center;
  gap: var(--icon-link-gap, var(--spacing-150, 6px));
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  color: inherit;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: var(--_il-font);
  font-weight: var(--font-weight-medium, 500);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}
.esa-icon-link--sm {
  --_il-font: var(--icon-link-font-size-sm, 0.875rem);
}
.esa-icon-link--medium {
  font-weight: var(--font-weight-medium, 500);
}
.esa-icon-link__label {
  display: inline-block;
}
summary.esa-icon-link {
  list-style: none;
}
.esa-nav-dropdown .esa-icon-link > .esa-icon:last-child {
  transition: transform 0.15s ease;
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
.esa-card--elevated {
  --_card-border: transparent;
  box-shadow: var(--shadow-100, 0 2px 12px 0 rgba(0, 0, 0, 0.04));
}
.esa-card--padding-spacious {
  --_card-padding: var(--spacing-700, 3rem);
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
.esa-card__subtitle {
  font-size: var(--type-size-150, 0.8125rem);
  color: var(--color-text-secondary, #525252);
  margin: 0;
}
.esa-card__body {
  padding: var(--_card-padding);
}
.esa-card__footer {
  padding: var(--spacing-300, 0.75rem) var(--_card-padding);
  border-top: 1px solid var(--_card-header-border);
  background: var(--card-footer-bg, var(--color-surface-sunken, #efefef));
}
.esa-card--outlined {
  --_card-border: var(--color-border, #e5e5e5);
}
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
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
.esa-button--lg {
  --_btn-height: var(--form-height-lg, 48px);
  --_btn-padding-x: var(--form-padding-x-lg, 20px);
  --_btn-font-size: var(--form-font-size-lg, 16px);
  --_btn-radius: var(--form-radius-lg, 8px);
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
.esa-button--color-secondary {
  --_accent: var(--color-secondary, #5787b9);
  --_accent-hover: var(--color-secondary-hover, #43608a);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent);
  border-color: var(--_accent);
}
.esa-icon {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  line-height: 1;
  color: inherit;
}
.esa-icon--xs {
  --_icon-size: var(--icon-size-xs, 14px);
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-icon--sm {
  --_icon-size: var(--icon-size-sm, var(--icon-size-small, 16px));
}
.esa-icon--lg {
  --_icon-size: var(--icon-size-lg, var(--icon-size-large, 24px));
}
.esa-icon--md {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
}
```

## Tokens
- `--card-bg`: #ffffff _(component)_
- `--card-border-color`: #dcdcdc _(component)_
- `--card-footer-bg`: #f3f7fc _(component)_
- `--card-header-bg`: transparent _(component)_
- `--card-header-border-color`: #efefef _(component)_
- `--card-header-color`: #3d3d3d _(component)_
- `--card-padding`: 1.5rem _(component)_
- `--card-radius`: .5rem _(component)_
- `--color-border`: #dcdcdc _(semantic)_
- `--color-border-light`: #efefef _(semantic)_
- `--color-primary`: #1e5386 _(semantic)_
- `--color-primary-hover`: #1a4570 _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
- `--color-secondary-hover`: #1e5386 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-surface-sunken`: #f3f7fc _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--form-font-size-lg`: clamp(.875rem, .77rem + .52vw, 1.125rem) _(component)_
- `--form-font-size-md`: clamp(.75rem, .66rem + .44vw, .9375rem) _(component)_
- `--form-height-lg`: 48px _(component)_
- `--form-height-md`: 40px _(component)_
- `--form-padding-x-lg`: 1rem _(component)_
- `--form-padding-x-md`: .75rem _(component)_
- `--form-radius-lg`: .5rem _(component)_
- `--form-radius-md`: .5rem _(component)_
- `--gap`: 1rem _(component)_
- `--grid-min`: 260px _(component)_
- `--icon-link-font-size-md`: 1rem _(component)_
- `--icon-link-font-size-sm`: .875rem _(component)_
- `--icon-link-gap`: .375rem _(component)_
- `--icon-size-large`: 24px _(component)_
- `--icon-size-medium`: 20px _(component)_
- `--icon-size-small`: 16px _(component)_
- `--radius-300`: .5rem _(primitive)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-700`: 3rem _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--type-size-250`: clamp(.8125rem, .71rem + .5vw, 1.0625rem) _(primitive)_
