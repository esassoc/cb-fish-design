# Needs-attention strip

Hoists invoices blocked ON THE VENDOR (Needs revision) out of the table into one unmissable CTA — the rejection/fix loop discovery flagged as the most painful hand-off. Renders nothing when the count is zero.

## Key decisions
- esa-alert-box (variant="warning") is the lego — no bespoke banner.
- The Review CTA drives the table's status chip-group to "Needs revision" and scrolls it into view, decoupled via the chip's public selector + value property.

## Gotchas
- The whole section is conditional on count > 0 — verify it disappears cleanly when no invoice needs revision.

## Markup
```html
<section class="cbf-vendor-attention" aria-label="Needs your attention">
  <div class="esa-alert-box esa-alert-box--warning">
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
        <path
          d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
        ></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
    </div>
    <div class="esa-alert-box__body">
      <strong class="esa-alert-box__title">Needs your attention</strong>
      <div class="esa-alert-box__message">
        <div class="cbf-vendor-attention__body repel">
          <span class="type-body"
            >1 invoice needs revision before BPA can continue review. Resubmit to keep
            payment on track.</span
          ><span
            class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--sm"
          >
            <button class="esa-button__native" type="button">
              <span class="esa-icon esa-icon--sm" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  focusable="false"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
              <span class="esa-button__label"> Review </span>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Styles
```css
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
.esa-alert-box {
  --_alert-bg: var(--alert-box-bg, var(--color-info-subtle, #eff6ff));
  --_alert-border: var(--alert-box-border-color, var(--color-info-border, #bfdbfe));
  --_alert-icon-color: var(--color-info, #3b82f6);
  --_alert-title-color: var(--alert-box-title-color, var(--color-text-primary, #171717));
  --_alert-text-color: var(--alert-box-text-color, var(--color-text-secondary, #525252));
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-300, 0.75rem);
  padding: var(--alert-box-padding, var(--spacing-300, 0.75rem) var(--spacing-400, 1rem));
  border: 1px solid var(--_alert-border);
  border-radius: var(--alert-box-radius, var(--radius-200, 0.5rem));
  background: var(--_alert-bg);
  font-size: var(--type-size-150, 0.875rem);
  line-height: 1.5;
}
.esa-alert-box--warning {
  --_alert-bg: var(--color-warning-subtle, #fffbeb);
  --_alert-border: var(--color-warning-border, #fde68a);
  --_alert-icon-color: var(--color-warning, #f59e0b);
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
.esa-alert-box__title {
  display: block;
  font-weight: 600;
  color: var(--_alert-title-color);
  margin-bottom: var(--spacing-050, 0.125rem);
}
.esa-alert-box__message {
  color: var(--_alert-text-color);
}
.esa-nav-dropdown .esa-icon-link > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.repel {
  --gap: var(--spacing-400, 1rem);
  --align: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: space-between;
}
.type-body {
  font-size: var(--type-size-200);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-normal);
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
.esa-button--sm {
  --_btn-height: var(--form-height-sm, 32px);
  --_btn-padding-x: var(--form-padding-x-sm, 12px);
  --_btn-font-size: var(--form-font-size-sm, 12px);
  --_btn-radius: var(--form-radius-sm, 4px);
}
.cbf-vendor-attention__body {
  align-items: center;
  gap: var(--spacing-400);
  flex-wrap: wrap;
}
```

## Tokens
- `--alert-box-bg`: #f3f7fc _(component)_
- `--alert-box-border-color`: #c6dcf1 _(component)_
- `--alert-box-padding`: .75rem 1rem _(component)_
- `--alert-box-radius`: .5rem _(component)_
- `--alert-box-text-color`: #525252 _(component)_
- `--alert-box-title-color`: #3d3d3d _(component)_
- `--color-info`: #2770b2 _(semantic)_
- `--color-info-border`: #c6dcf1 _(semantic)_
- `--color-info-subtle`: #f3f7fc _(semantic)_
- `--color-primary`: #1e5386 _(semantic)_
- `--color-primary-hover`: #1a4570 _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--color-warning`: #f59e0b _(semantic)_
- `--color-warning-border`: #fde68a _(semantic)_
- `--color-warning-subtle`: #fffbeb _(semantic)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--font-weight-regular`: 400 _(primitive)_
- `--form-font-size-lg`: clamp(.875rem, .77rem + .52vw, 1.125rem) _(component)_
- `--form-font-size-md`: clamp(.75rem, .66rem + .44vw, .9375rem) _(component)_
- `--form-font-size-sm`: clamp(.625rem, .56rem + .32vw, .75rem) _(component)_
- `--form-height-lg`: 48px _(component)_
- `--form-height-md`: 40px _(component)_
- `--form-height-sm`: 32px _(component)_
- `--form-padding-x-lg`: 1rem _(component)_
- `--form-padding-x-md`: .75rem _(component)_
- `--form-padding-x-sm`: .625rem _(component)_
- `--form-radius-lg`: .5rem _(component)_
- `--form-radius-md`: .5rem _(component)_
- `--form-radius-sm`: .25rem _(component)_
- `--icon-link-font-size-md`: 1rem _(component)_
- `--icon-link-font-size-sm`: .875rem _(component)_
- `--icon-link-gap`: .375rem _(component)_
- `--icon-size-large`: 24px _(component)_
- `--icon-size-medium`: 20px _(component)_
- `--icon-size-small`: 16px _(component)_
- `--radius-200`: .5rem _(primitive)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
