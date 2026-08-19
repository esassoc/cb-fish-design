# Dashboard header

Welcome banner on the invoices view. Greets the vendor by first name using esa-page-header with the primary CTA (Submit invoice → /vendor-invoice). The activity-stat row is suppressed here (showStats={false}) because the financial-outlook band below owns the numbers.

## Key decisions
- esa-page-header owns the greeting + primary CTA — do not hand-roll a custom heading + button pair.
- showStats is false on this page so two stat rows do not compete; the financial-outlook band is the single source of headline metrics.
- Primary CTA button links to /vendor-invoice; no secondary action in the header.

## Gotchas
- The greeting uses the vendor's first name split from the full contact string — "Maria" not "Maria Garcia".

## Markup
```html
<div class="cbf-vendor-dashboard-header">
  <header class="esa-page-header">
    <div class="esa-page-header__bar">
      <div class="esa-page-header__titles">
        <p class="esa-page-header__eyebrow typography-label-md">
          <span>Pacific Environmental Services, LLC</span>
        </p>
        <h1 class="esa-page-header__title typography-heading-lg">Welcome back, Maria</h1>
      </div>
      <div class="esa-page-header__actions typography-label-md">
        <span
          class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--lg"
          slot="actions"
          ><a
            class="esa-button__native typography-microcopy-lg"
            href="/cb-fish-design/vendor-invoice"
            role="button"
            ><span class="esa-icon esa-icon--lg" aria-hidden="true">
              <svg
                width="24"
                height="24"
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
          ></span
        >
      </div>
    </div>
  </header>
</div>
```

## Styles
```css
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-heading-lg {
  font-family: var(--typography-heading-lg-font-family);
  font-size: var(--typography-heading-lg-font-size);
  font-weight: var(--typography-heading-lg-font-weight);
  line-height: var(--typography-heading-lg-line-height);
  letter-spacing: var(--typography-heading-lg-letter-spacing);
}
.typography-microcopy-lg {
  font-family: var(--typography-microcopy-lg-font-family);
  font-size: var(--typography-microcopy-lg-font-size);
  font-weight: var(--typography-microcopy-lg-font-weight);
  line-height: var(--typography-microcopy-lg-line-height);
  letter-spacing: var(--typography-microcopy-lg-letter-spacing);
}
.cbf-vendor-dashboard-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-600);
  padding-bottom: var(--spacing-600);
  border-bottom: 1px solid var(--color-border-default);
}
.esa-page-header {
  --_ph-title-color: var(--color-content-default, #202020);
  --_ph-title-font: var(
    --typography-heading-lg-font-family,
    var(--typography-font-family-display, "DM Sans", sans-serif)
  );
  --_ph-title-size: var(
    --typography-heading-lg-font-size,
    var(--font-size-600, 1.875rem)
  );
  --_ph-title-weight: var(
    --typography-heading-lg-font-weight,
    var(--typography-font-weight-semibold, 550)
  );
  --_ph-eyebrow-color: var(--color-content-default-secondary, #646464);
  --_ph-eyebrow-size: var(
    --typography-label-md-font-size,
    var(--font-size-200, 0.9375rem)
  );
  --_ph-gap: var(--spacing-200, 0.5rem);
  --_ph-bar-gap: var(--spacing-500, 1.5rem);
  --_ph-crumb-gap: var(--spacing-300, 0.75rem);
  display: block;
  background: transparent;
}
.esa-page-header__bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--_ph-bar-gap);
  flex-wrap: wrap;
}
.esa-page-header__titles {
  display: flex;
  flex-direction: column;
  gap: var(--_ph-gap);
  min-width: 0;
}
.esa-page-header__eyebrow {
  display: flex;
  align-items: center;
  gap: var(--spacing-100, 0.25rem);
  margin: 0;
  font-size: var(--_ph-eyebrow-size);
  color: var(--_ph-eyebrow-color);
}
.esa-page-header__title {
  margin: 0;
  font-family: var(--_ph-title-font);
  font-size: var(--_ph-title-size);
  font-weight: var(--_ph-title-weight);
  color: var(--_ph-title-color);
}
.esa-page-header__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-200, 0.5rem);
  flex-shrink: 0;
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
.esa-icon {
  --_icon-size: var(--icon-size-md, 20px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  color: inherit;
}
.esa-icon--sm {
  --_icon-size: var(--icon-size-sm, 16px);
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-button__label {
  white-space: nowrap;
}
summary.esa-button {
  list-style: none;
  cursor: pointer;
}
.esa-icon--md {
  --_icon-size: var(--icon-size-md, 20px);
}
.esa-button--lg {
  --_btn-pad-y: var(--spacing-400, 1rem);
  --_btn-padding-x: var(--spacing-400, 1rem);
  --_btn-radius: var(--button-radius-lg, 8px);
}
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
}
.esa-icon--lg {
  --_icon-size: var(--icon-size-lg, 24px);
}
.esa-button--variant-secondary {
  --_accent: var(--color-background-brand-muted);
  --_accent-hover: var(--color-background-brand-muted-hover);
  --_on: var(--color-content-on-brand-muted, var(--color-content-default));
  --_accent-text: var(--color-content-brand);
  --_accent-border: var(--color-border-default-strong, #bbbbbb);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
```

## Tokens
- `--border-width-default`: 1px _(semantic)_
- `--button-radius-lg`: .5rem _(component)_
- `--button-radius-md`: .5rem _(component)_
- `--button-radius-sm`: .25rem _(component)_
- `--color-background-brand`: #1e5386 _(semantic)_
- `--color-background-brand-hover`: #1a4570 _(semantic)_
- `--color-background-brand-muted`: #2770b2 _(semantic)_
- `--color-background-brand-muted-hover`: #1e5386 _(semantic)_
- `--color-border-default`: #dcdcdc _(semantic)_
- `--color-border-default-strong`: #bdbdbd _(semantic)_
- `--color-content-brand`: #1e5386 _(semantic)_
- `--color-content-default`: #3d3d3d _(semantic)_
- `--color-content-default-knockout`: #fcfcfc _(semantic)_
- `--color-content-default-secondary`: #525252 _(semantic)_
- `--color-content-on-brand-muted`: #203c25 _(semantic)_
- `--font-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
- `--font-size-600`: clamp(1.375rem, 1.2rem + .88vw, 1.875rem) _(primitive)_
- `--icon-size-lg`: 24px _(primitive)_
- `--icon-size-md`: 20px _(primitive)_
- `--icon-size-sm`: 16px _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
- `--transition-fast`: .15s ease _(semantic)_
- `--typography-font-family-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-font-weight-semibold`: 600 _(semantic)_
- `--typography-heading-lg-font-family`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-heading-lg-font-size`: clamp(1.375rem, 1.2rem + .88vw, 1.875rem) _(semantic)_
- `--typography-heading-lg-font-weight`: 600 _(semantic)_
- `--typography-heading-lg-letter-spacing`: -.01em _(semantic)_
- `--typography-heading-lg-line-height`: 1.3 _(semantic)_
- `--typography-label-md-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-label-md-font-size`: clamp(.75rem, .66rem + .44vw, .9375rem) _(semantic)_
- `--typography-label-md-font-weight`: 500 _(semantic)_
- `--typography-label-md-letter-spacing`: .01em _(semantic)_
- `--typography-label-md-line-height`: 1.6 _(semantic)_
- `--typography-microcopy-lg-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-microcopy-lg-font-size`: clamp(.875rem, .77rem + .52vw, 1.125rem) _(semantic)_
- `--typography-microcopy-lg-font-weight`: 500 _(semantic)_
- `--typography-microcopy-lg-letter-spacing`: .01em _(semantic)_
- `--typography-microcopy-lg-line-height`: 1 _(semantic)_
