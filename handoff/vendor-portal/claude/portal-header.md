# Portal header

Welcome banner and activity snapshot on the accountant landing page. Greets the vendor by first name using esa-page-header, then shows a read-only metrics row (invoices submitted, pending review, total billed) via esa-stat legos. The primary CTA drives to /vendor-invoice.

## Key decisions
- esa-page-header owns the greeting + primary CTA — do not hand-roll a custom heading + button pair.
- Stats use esa-stat inside the cluster layout primitive (data-gap="xl") — not a custom flex row.
- Primary CTA button links to /vendor-invoice; no secondary action in the header.

## Gotchas
- esa-stat does not accept a unit prop — currency and suffix formatting must be baked into the value string.
- The greeting uses the vendor's first name split from the full contact string — "Maria" not "Maria Garcia".

## Markup
```html
<div class="cbf-vendor-portal-header">
  <header class="esa-page-header">
    <div class="esa-page-header__bar">
      <div class="esa-page-header__titles">
        <p class="esa-page-header__eyebrow">
          <span>Pacific Environmental Services, LLC</span>
        </p>
        <h1 class="esa-page-header__title">Welcome back, Maria</h1>
        <p class="esa-page-header__lede">
          Submit and track invoices for your Columbia Basin Fish &amp; Wildlife Program
          contracts.
        </p>
      </div>
      <div class="esa-page-header__actions">
        <span
          class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--lg"
        >
          <a
            class="esa-button__native"
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
            <span class="esa-button__label"> Submit Invoice </span></a
          >
        </span>
      </div>
    </div>
  </header>
  <div class="cbf-vendor-portal-header__stats cluster" data-gap="xl">
    <div class="esa-stat">
      <div class="esa-stat__value">4</div>
      <div class="esa-stat__label">Invoices submitted</div>
      <div class="esa-stat__sub">FY 2026</div>
    </div>
    <div class="esa-stat esa-stat--accent">
      <div class="esa-stat__value">1</div>
      <div class="esa-stat__label">Pending review</div>
    </div>
    <div class="esa-stat">
      <div class="esa-stat__value">$14,200</div>
      <div class="esa-stat__label">Total submitted</div>
      <div class="esa-stat__sub">FY 2026</div>
    </div>
  </div>
</div>
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
.esa-icon--md {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
}
.esa-nav-dropdown .esa-icon-link > .esa-icon:last-child {
  transition: transform 0.15s ease;
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
.cluster {
  --gap: var(--spacing-300, 0.75rem);
  --align: center;
  --justify: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: var(--justify);
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
.cbf-vendor-portal-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-600);
  padding-bottom: var(--spacing-600);
  border-bottom: 1px solid var(--color-border);
}
.esa-page-header {
  --_ph-title-color: var(--page-header-title-color, var(--color-text-primary, #171717));
  --_ph-title-font: var(
    --page-header-title-font,
    var(--font-display, var(--font-sans, "DM Sans", sans-serif))
  );
  --_ph-title-size: var(--page-header-title-size, var(--type-size-600, 1.875rem));
  --_ph-title-weight: var(--page-header-title-weight, var(--font-weight-semibold, 550));
  --_ph-lede-color: var(--page-header-lede-color, var(--color-text-secondary, #525252));
  --_ph-lede-size: var(--page-header-lede-size, var(--type-size-300, 1.125rem));
  --_ph-eyebrow-color: var(
    --page-header-eyebrow-color,
    var(--color-text-secondary, #525252)
  );
  --_ph-eyebrow-size: var(--page-header-eyebrow-size, var(--type-size-200, 0.9375rem));
  --_ph-gap: var(--page-header-gap, var(--spacing-200, 0.5rem));
  --_ph-bar-gap: var(--page-header-bar-gap, var(--spacing-500, 1.5rem));
  --_ph-crumb-gap: var(--page-header-breadcrumbs-gap, var(--spacing-300, 0.75rem));
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
  font-weight: var(--font-weight-medium, 500);
  line-height: var(--line-height-normal, 1.5);
  color: var(--_ph-eyebrow-color);
}
.esa-page-header__title {
  margin: 0;
  font-family: var(--_ph-title-font);
  font-size: var(--_ph-title-size);
  font-weight: var(--_ph-title-weight);
  line-height: var(--line-height-tight, 1.3);
  letter-spacing: var(--letter-spacing-tight, -0.01em);
  color: var(--_ph-title-color);
}
.esa-page-header__lede {
  margin: 0;
  font-size: var(--_ph-lede-size);
  font-weight: var(--font-weight-regular, 350);
  line-height: var(--line-height-relaxed, 1.8);
  color: var(--_ph-lede-color);
  max-width: 70ch;
}
.esa-page-header__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-200, 0.5rem);
  flex-shrink: 0;
}
.esa-stat {
  --_stat-value-color: var(--stat-value-color, var(--color-text-primary, #171717));
  --_stat-value-font: var(
    --stat-value-font,
    var(--font-display, var(--font-sans, "DM Sans", sans-serif))
  );
  --_stat-value-size: var(--stat-value-size, var(--type-size-700, 2.25rem));
  --_stat-value-weight: var(--stat-value-weight, var(--font-weight-bold, 650));
  --_stat-label-color: var(--stat-label-color, var(--color-text-secondary, #525252));
  --_stat-label-size: var(--stat-label-size, var(--type-size-200, 0.9375rem));
  --_stat-label-weight: var(--stat-label-weight, var(--font-weight-medium, 450));
  --_stat-sub-color: var(--stat-sub-color, var(--color-text-muted, #737373));
  --_stat-sub-size: var(--stat-sub-size, var(--type-size-150, 0.875rem));
  --_stat-accent-color: var(--stat-accent-color, var(--color-secondary, #5787b9));
  --_stat-gap: var(--stat-gap, var(--spacing-050, 0.125rem));
  display: flex;
  flex-direction: column;
  gap: var(--_stat-gap);
  background: transparent;
}
.esa-stat__value {
  font-family: var(--_stat-value-font);
  font-size: var(--_stat-value-size);
  font-weight: var(--_stat-value-weight);
  line-height: var(--line-height-tight, 1.3);
  letter-spacing: var(--letter-spacing-tight, -0.01em);
  color: var(--_stat-value-color);
}
.esa-stat__label {
  font-size: var(--_stat-label-size);
  font-weight: var(--_stat-label-weight);
  line-height: var(--line-height-normal, 1.6);
  color: var(--_stat-label-color);
}
.esa-stat__sub {
  font-size: var(--_stat-sub-size);
  font-weight: var(--font-weight-regular, 350);
  line-height: var(--line-height-normal, 1.6);
  color: var(--_stat-sub-color);
}
.esa-stat--accent .esa-stat__value {
  color: var(--_stat-accent-color);
}
```

## Tokens
- `--color-border`: #dcdcdc _(semantic)_
- `--color-primary`: #1e5386 _(semantic)_
- `--color-primary-hover`: #1a4570 _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
- `--color-secondary-hover`: #1e5386 _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--font-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(primitive)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-bold`: 700 _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--font-weight-regular`: 400 _(primitive)_
- `--font-weight-semibold`: 600 _(primitive)_
- `--form-font-size-lg`: clamp(.875rem, .77rem + .52vw, 1.125rem) _(component)_
- `--form-font-size-md`: clamp(.75rem, .66rem + .44vw, .9375rem) _(component)_
- `--form-height-lg`: 48px _(component)_
- `--form-height-md`: 40px _(component)_
- `--form-padding-x-lg`: 1rem _(component)_
- `--form-padding-x-md`: .75rem _(component)_
- `--form-radius-lg`: .5rem _(component)_
- `--form-radius-md`: .5rem _(component)_
- `--icon-link-font-size-md`: 1rem _(component)_
- `--icon-link-font-size-sm`: .875rem _(component)_
- `--icon-link-gap`: .375rem _(component)_
- `--icon-size-large`: 24px _(component)_
- `--icon-size-medium`: 20px _(component)_
- `--icon-size-small`: 16px _(component)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
- `--type-size-300`: clamp(.875rem, .77rem + .52vw, 1.125rem) _(primitive)_
- `--type-size-600`: clamp(1.375rem, 1.2rem + .88vw, 1.875rem) _(primitive)_
- `--type-size-700`: clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem) _(primitive)_
