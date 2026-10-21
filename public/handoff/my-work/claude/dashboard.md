# Dashboard

Dashboard (COR landing) · source prototype: https://esassoc.github.io/cb-fish-design/my-work/

![Dashboard, desktop](https://esassoc.github.io/cb-fish-design/handoff/my-work/claude/dashboard.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/my-work/claude/dashboard.phone.png

## Components

- `cbf-app-panel` (spoke) · `src/components/shared/cbf-app-panel.astro`
- `cbf-grid-id` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-grid-idcell` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-grid-link` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-grid-num` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-grid-overdue` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-grid-status` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-icon` (spoke) · `src/components/search/cbf-icon.astro`
- `cbf-invoice-doc` (spoke) · `src/components/invoice-review/cbf-invoice-processor.astro`
- `cbf-invoice-queue-metrics` (spoke) · `src/components/invoice-review/cbf-invoice-queue-metrics.astro`
- `cbf-invoice-review-queue` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-my-invoices` (spoke) · `src/components/my-work/cbf-my-invoices.astro`
- `cbf-mywork-tabs` (spoke) · `src/components/my-work/cbf-mywork-tabs.astro`
- `cbf-num` (spoke) · `src/components/invoice-review/cbf-invoice-processor.astro`
- `cbf-review` (spoke) · `src/components/invoice-review/cbf-invoice-processor.astro`
- `cbf-review-attachments` (spoke) · `src/components/invoice-review/cbf-invoice-processor.astro`
- `cbf-review-deadline` (spoke) · `src/components/invoice-review/cbf-invoice-processor.astro`
- `cbf-review-dialog` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-review-docpane` (spoke) · `src/components/invoice-review/cbf-invoice-processor.astro`
- `cbf-review-fields` (spoke) · `src/components/invoice-review/cbf-invoice-processor.astro`
- `cbf-review-footer` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-review-hero` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-review-money` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-review-panel` (spoke) · `src/components/invoice-review/cbf-invoice-processor.astro`
- `cbf-review-process` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-review-split` (spoke) · `src/components/invoice-review/cbf-invoice-review-queue.astro`
- `cbf-search-field` (spoke) · `src/components/search/cbf-search-field.astro`
- `esa-alert-box` (hub) · `packages/ecology/src/components/esa-alert-box.astro`
- `esa-breadcrumbs` (hub) · `packages/ecology/src/components/esa-breadcrumbs.astro`
- `esa-button` (hub) · `packages/ecology/src/components/esa-button.astro`
- `esa-container` (hub) · `packages/ecology/src/components/esa-container.astro`
- `esa-empty-state` (hub) · `packages/ecology/src/components/esa-empty-state.astro`
- `esa-icon` (hub) · `packages/ecology/src/components/esa-icon.astro`
- `esa-page-header` (hub) · `packages/ecology/src/components/esa-page-header.astro`
- `esa-pill` (hub) · `packages/ecology/src/components/esa-pill.astro`
- `esa-side-dialog` (hub) · `packages/ecology/src/components/esa-side-dialog.ts`
- `esa-stat` (hub) · `packages/ecology/src/components/esa-stat.astro`
- `esa-tab-layout` (hub) · `packages/ecology/src/components/esa-tab-layout.ts`

## Markup and styles

_30 repeated elements are collapsed in the markup below; the comments say where._

- [dashboard.markup-1.md](https://esassoc.github.io/cb-fish-design/handoff/my-work/claude/dashboard.markup-1.md) (46 KB)
- [dashboard.markup-2.md](https://esassoc.github.io/cb-fish-design/handoff/my-work/claude/dashboard.markup-2.md) (47 KB)
- [dashboard.markup-3.md](https://esassoc.github.io/cb-fish-design/handoff/my-work/claude/dashboard.markup-3.md) (8.6 KB)
- [dashboard.styles.md](https://esassoc.github.io/cb-fish-design/handoff/my-work/claude/dashboard.styles.md) (37 KB)

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--alert-box-text-color` | `#525252` | component |
| `--border-width-default` | `1px` | semantic |
| `--breadcrumbs-bg` | `transparent` | component |
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#3d3d3d` | component |
| `--button-chrome-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--button-radius-md` | `.5rem` | component |
| `--button-radius-sm` | `.25rem` | component |
| `--button-radius-xs` | `.25rem` | component |
| `--cbf-surface-crumb` | `#f4f4f4` | brand |
| `--cbf-text-placeholder` | `#9aa3ad` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-muted-hover` | `#1e5386` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-danger` | `#ce2c31` | semantic |
| `--color-background-utility-danger-subtle` | `#fffcfc` | semantic |
| `--color-background-utility-info-subtle` | `#f3f7fc` | semantic |
| `--color-background-utility-success-subtle` | `#fbfefc` | semantic |
| `--color-background-utility-warning-subtle` | `#fefdfb` | semantic |
| `--color-blue-2` | `#f4faff` | primitive |
| `--color-blue-6` | `#acd8fc` | primitive |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-border-utility-danger` | `#fdbdbe` | semantic |
| `--color-border-utility-info` | `#c6dcf1` | semantic |
| `--color-border-utility-success` | `#adddc0` | semantic |
| `--color-border-utility-warning` | `#f3d673` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--color-content-on-brand-muted` | `#203c25` | semantic |
| `--color-content-utility-danger` | `#ce2c31` | semantic |
| `--color-content-utility-info` | `#0d74ce` | semantic |
| `--color-content-utility-success` | `#218358` | semantic |
| `--color-content-utility-warning` | `#ab6400` | semantic |
| `--color-green-2` | `#f4fbf6` | primitive |
| `--color-green-6` | `#adddc0` | primitive |
| `--color-red-2` | `#fff7f7` | primitive |
| `--color-red-6` | `#fdbdbe` | primitive |
| `--color-yellow-2` | `#fefbe9` | primitive |
| `--color-yellow-6` | `#f3d673` | primitive |
| `--empty-state-icon-size-md` | `48px` | component |
| `--empty-state-icon-size-sm` | `32px` | component |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--font-size-050` | `clamp(.5rem, .44rem + .3vw, .625rem)` | primitive |
| `--font-size-100` | `clamp(.625rem, .56rem + .32vw, .75rem)` | primitive |
| `--font-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--font-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |
| `--font-size-400` | `clamp(1rem, .88rem + .6vw, 1.25rem)` | primitive |
| `--font-size-500` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | primitive |
| `--font-size-600` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | primitive |
| `--font-size-700` | `clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem)` | primitive |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-sm` | `16px` | primitive |
| `--icon-size-xs` | `14px` | primitive |
| `--line-height-normal` | `1.6` | primitive |
| `--line-height-relaxed` | `1.8` | primitive |
| `--line-height-tight` | `1.3` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--radius-chip` | `.25rem` | semantic |
| `--radius-md` | `.5rem` | semantic |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--stat-accent-color` | `#1e5386` | component |
| `--stat-value-color` | `#3d3d3d` | component |
| `--stat-value-size` | `clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem)` | component |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-body-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-body-xs-font-weight` | `400` | semantic |
| `--typography-body-xs-letter-spacing` | `.01em` | semantic |
| `--typography-body-xs-line-height` | `1.6` | semantic |
| `--typography-display-sm-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-display-sm-font-size` | `clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem)` | semantic |
| `--typography-display-sm-font-weight` | `700` | semantic |
| `--typography-display-sm-letter-spacing` | `-.01em` | semantic |
| `--typography-display-sm-line-height` | `1.3` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-bold` | `700` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-regular` | `400` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-heading-lg-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-heading-lg-font-size` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | semantic |
| `--typography-heading-lg-font-weight` | `600` | semantic |
| `--typography-heading-lg-letter-spacing` | `-.01em` | semantic |
| `--typography-heading-lg-line-height` | `1.3` | semantic |
| `--typography-heading-md-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-heading-md-font-size` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | semantic |
| `--typography-heading-md-font-weight` | `600` | semantic |
| `--typography-heading-md-letter-spacing` | `-.01em` | semantic |
| `--typography-heading-md-line-height` | `1.3` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |
| `--typography-label-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-label-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-sm-strong-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-label-sm-strong-font-weight` | `600` | semantic |
| `--typography-label-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-label-sm-strong-line-height` | `1.6` | semantic |
| `--typography-meta-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-meta-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-meta-font-weight` | `400` | semantic |
| `--typography-meta-letter-spacing` | `.01em` | semantic |
| `--typography-meta-line-height` | `1.6` | semantic |
| `--typography-microcopy-2xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-2xs-font-size` | `clamp(.5rem, .44rem + .3vw, .625rem)` | semantic |
| `--typography-microcopy-2xs-font-weight` | `500` | semantic |
| `--typography-microcopy-2xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-2xs-line-height` | `1` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |
| `--typography-microcopy-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-microcopy-sm-font-weight` | `500` | semantic |
| `--typography-microcopy-sm-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-sm-line-height` | `1` | semantic |
| `--typography-microcopy-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-font-weight` | `500` | semantic |
| `--typography-microcopy-xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-line-height` | `1` | semantic |
