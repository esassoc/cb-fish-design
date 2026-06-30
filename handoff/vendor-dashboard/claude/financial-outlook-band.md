# Financial outlook band

The headline money rollup — total contracted, expended-to-date, remaining, awaiting BPA approval, and approved-but-unpaid — so the vendor reads their cross-contract position WITHOUT drilling into each contract. A row of esa-stat legos plus an as-of provenance caption.

## Key decisions
- Metrics are esa-stat legos inside the cluster primitive — not a bespoke metric block.
- Figures derive from the shared vendor-dashboard-invoices data module (deriveOutlook) so the band, attention strip, and table can never drift.
- The as-of caption is required, not cosmetic: expenditures are a nightly PeopleSoft feed, so an unstamped figure reads as an untrusted figure.
- Awaiting approval is accented (esa-stat accent) — it is the money in flight the vendor cares about most.

## Gotchas
- Big figures use the compact currency formatter ($1.84M); invoice-level amounts use the exact formatter ($4,850.00) — both live in the data module.
- esa-stat has no unit prop — currency formatting is baked into the value string.

## Markup
```html
<section
  class="cbf-vendor-financial-outlook stack"
  data-gap="sm"
  aria-label="Financial outlook"
>
  <header class="cbf-vendor-financial-outlook__head repel">
    <h2 class="type-section-title">Financial outlook</h2>
    <span class="type-caption cbf-vendor-financial-outlook__caption"
      >Across 9 active contracts</span
    >
  </header>
  <div class="cbf-vendor-financial-outlook__stats cluster" data-gap="xl">
    <div class="esa-stat">
      <div class="esa-stat__value">$1.84M</div>
      <div class="esa-stat__label">Total active contract value</div>
    </div>
    <div class="esa-stat">
      <div class="esa-stat__value">$1.21M</div>
      <div class="esa-stat__label">Invoiced to date</div>
      <div class="esa-stat__sub">
        as of Jun 21, 2026 · includes all submitted invoices
      </div>
    </div>
    <div class="esa-stat">
      <div class="esa-stat__value">$630K</div>
      <div class="esa-stat__label">Uninvoiced balance</div>
      <div class="esa-stat__sub">as of Jun 21, 2026</div>
    </div>
  </div>
</section>
```

## Styles
```css
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
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
.cbf-vendor-financial-outlook {
  padding-bottom: var(--spacing-600);
  border-bottom: 1px solid var(--color-border);
}
.cbf-vendor-financial-outlook__head {
  align-items: baseline;
  gap: var(--spacing-400);
  flex-wrap: wrap;
}
.cbf-vendor-financial-outlook__caption {
  color: var(--color-text-muted);
}
.cbf-vendor-financial-outlook__stats {
  --align: flex-start;
  row-gap: var(--spacing-500);
}
.cbf-vendor-dashboard-invoices__group .type-caption,
.cbf-vendor-dashboard-invoices__view .type-caption {
  color: var(--color-text-muted);
  white-space: nowrap;
}
.type-section-title {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--type-size-500);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
.type-caption {
  font-size: var(--type-size-100);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
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
  --_stat-accent-color: var(--stat-accent-color, var(--color-secondary-strong, #3a7c59));
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
```

## Tokens
- `--color-border`: #dcdcdc _(semantic)_
- `--color-secondary-strong`: #2a7e3b _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--font-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(primitive)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-bold`: 700 _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--font-weight-regular`: 400 _(primitive)_
- `--font-weight-semibold`: 600 _(primitive)_
- `--gap`: .75rem _(component)_
- `--letter-spacing-normal`: .01em _(primitive)_
- `--letter-spacing-tight`: -.01em _(primitive)_
- `--line-height-normal`: 1.6 _(primitive)_
- `--line-height-tight`: 1.3 _(primitive)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
- `--type-size-100`: clamp(.625rem, .56rem + .32vw, .75rem) _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
- `--type-size-500`: clamp(1.125rem, .98rem + .72vw, 1.5rem) _(primitive)_
- `--type-size-700`: clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem) _(primitive)_
