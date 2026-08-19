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
    <h2 class="typography-heading-md">Financial outlook</h2>
    <span class="typography-meta cbf-vendor-financial-outlook__caption"
      >Across 9 active contracts</span
    >
  </header>
  <div class="cbf-vendor-financial-outlook__stats cluster" data-gap="xl">
    <div class="esa-stat">
      <div class="esa-stat__value typography-display-sm">$1.84M</div>
      <div class="esa-stat__label typography-label-md">Total active contract value</div>
    </div>
    <div class="esa-stat">
      <div class="esa-stat__value typography-display-sm">$1.21M</div>
      <div class="esa-stat__label typography-label-md">Invoiced to date</div>
      <div class="esa-stat__sub typography-body-sm">
        as of Jun 21, 2026 · includes all submitted invoices
      </div>
    </div>
    <div class="esa-stat">
      <div class="esa-stat__value typography-display-sm">$630K</div>
      <div class="esa-stat__label typography-label-md">Uninvoiced balance</div>
      <div class="esa-stat__sub typography-body-sm">as of Jun 21, 2026</div>
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
.esa-stat {
  --_stat-value-color: var(--stat-value-color, var(--color-content-default, #202020));
  --_stat-value-font: var(
    --typography-font-family-display,
    var(
      --typography-display-sm-font-family,
      var(--typography-font-family-display, "DM Sans", sans-serif)
    )
  );
  --_stat-value-size: var(
    --stat-value-size,
    var(--typography-display-sm-font-size, var(--font-size-700, 2.25rem))
  );
  --_stat-value-weight: var(
    --typography-font-weight-bold,
    var(--typography-display-sm-font-weight, var(--typography-font-weight-bold, 650))
  );
  --_stat-label-color: var(--color-content-default-secondary, #646464);
  --_stat-label-size: var(
    --font-size-200,
    var(--typography-label-md-font-size, var(--font-size-200, 0.9375rem))
  );
  --_stat-label-weight: var(
    --typography-font-weight-medium,
    var(--typography-label-md-font-weight, var(--typography-font-weight-medium, 500))
  );
  --_stat-sub-color: var(--color-content-default-secondary, #646464);
  --_stat-sub-size: var(
    --font-size-150,
    var(--typography-body-sm-font-size, var(--font-size-150, 0.875rem))
  );
  --_stat-accent-color: var(--stat-accent-color, var(--color-content-brand, #2a7e3b));
  --_stat-gap: var(--spacing-050, 0.125rem);
  display: flex;
  flex-direction: column;
  gap: var(--_stat-gap);
  background: transparent;
}
.esa-stat__value {
  font-family: var(--_stat-value-font);
  font-size: var(--_stat-value-size);
  font-weight: var(--_stat-value-weight);
  color: var(--_stat-value-color);
}
.esa-stat__label {
  font-size: var(--_stat-label-size);
  font-weight: var(--_stat-label-weight);
  color: var(--_stat-label-color);
}
.esa-stat__sub {
  font-size: var(--_stat-sub-size);
  color: var(--_stat-sub-color);
}
.cbf-vendor-financial-outlook {
  padding-bottom: var(--spacing-600);
  border-bottom: 1px solid var(--color-border-default);
}
.cbf-vendor-financial-outlook__head {
  align-items: baseline;
  gap: var(--spacing-400);
  flex-wrap: wrap;
}
.cbf-vendor-financial-outlook__caption {
  color: var(--color-content-default-tertiary);
}
.cbf-vendor-financial-outlook__stats {
  --align: flex-start;
  row-gap: var(--spacing-500);
}
.cbf-vendor-dashboard-invoices__group .typography-meta,
.cbf-vendor-dashboard-invoices__view .typography-meta {
  color: var(--color-content-default-tertiary);
  white-space: nowrap;
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-heading-md {
  font-family: var(--typography-heading-md-font-family);
  font-size: var(--typography-heading-md-font-size);
  font-weight: var(--typography-heading-md-font-weight);
  line-height: var(--typography-heading-md-line-height);
  letter-spacing: var(--typography-heading-md-letter-spacing);
}
.typography-meta {
  font-family: var(--typography-meta-font-family);
  font-size: var(--typography-meta-font-size);
  font-weight: var(--typography-meta-font-weight);
  line-height: var(--typography-meta-line-height);
  letter-spacing: var(--typography-meta-letter-spacing);
}
.typography-display-sm {
  font-family: var(--typography-display-sm-font-family);
  font-size: var(--typography-display-sm-font-size);
  font-weight: var(--typography-display-sm-font-weight);
  line-height: var(--typography-display-sm-line-height);
  letter-spacing: var(--typography-display-sm-letter-spacing);
}
```

## Tokens
- `--color-border-default`: #dcdcdc _(semantic)_
- `--color-content-brand`: #1e5386 _(semantic)_
- `--color-content-default`: #3d3d3d _(semantic)_
- `--color-content-default-secondary`: #525252 _(semantic)_
- `--color-content-default-tertiary`: #656565 _(semantic)_
- `--font-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--font-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
- `--font-size-700`: clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem) _(primitive)_
- `--gap`: .75rem _(component)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
- `--stat-accent-color`: #1e5386 _(component)_
- `--stat-value-color`: #3d3d3d _(component)_
- `--stat-value-size`: clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem) _(component)_
- `--typography-body-sm-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-body-sm-font-size`: clamp(.6875rem, .61rem + .38vw, .875rem) _(semantic)_
- `--typography-body-sm-font-weight`: 400 _(semantic)_
- `--typography-body-sm-letter-spacing`: .01em _(semantic)_
- `--typography-body-sm-line-height`: 1.6 _(semantic)_
- `--typography-display-sm-font-family`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-display-sm-font-size`: clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem) _(semantic)_
- `--typography-display-sm-font-weight`: 700 _(semantic)_
- `--typography-display-sm-letter-spacing`: -.01em _(semantic)_
- `--typography-display-sm-line-height`: 1.3 _(semantic)_
- `--typography-font-family-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-font-weight-bold`: 700 _(semantic)_
- `--typography-font-weight-medium`: 500 _(semantic)_
- `--typography-heading-md-font-family`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-heading-md-font-size`: clamp(1.125rem, .98rem + .72vw, 1.5rem) _(semantic)_
- `--typography-heading-md-font-weight`: 600 _(semantic)_
- `--typography-heading-md-letter-spacing`: -.01em _(semantic)_
- `--typography-heading-md-line-height`: 1.3 _(semantic)_
- `--typography-label-md-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-label-md-font-size`: clamp(.75rem, .66rem + .44vw, .9375rem) _(semantic)_
- `--typography-label-md-font-weight`: 500 _(semantic)_
- `--typography-label-md-letter-spacing`: .01em _(semantic)_
- `--typography-label-md-line-height`: 1.6 _(semantic)_
- `--typography-meta-font-family`: "IBM Plex Sans", sans-serif _(semantic)_
- `--typography-meta-font-size`: clamp(.625rem, .56rem + .32vw, .75rem) _(semantic)_
- `--typography-meta-font-weight`: 400 _(semantic)_
- `--typography-meta-letter-spacing`: .01em _(semantic)_
- `--typography-meta-line-height`: 1.6 _(semantic)_
