# Habitat Design Tool

Habitat Design Tool · source prototype: https://esassoc.github.io/cb-fish-design/map-sow/

![Habitat Design Tool, desktop](https://esassoc.github.io/cb-fish-design/handoff/map-sow/claude/habitat-design-tool.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/map-sow/claude/habitat-design-tool.phone.png

## Components

- `esa-breadcrumbs` (hub) · `packages/ecology/src/components/esa-breadcrumbs.astro`
- `esa-button` (hub) · `packages/ecology/src/components/esa-button.astro`
- `esa-container` (hub) · `packages/ecology/src/components/esa-container.astro`
- `esa-empty-state` (hub) · `packages/ecology/src/components/esa-empty-state.astro`
- `esa-file-upload` (hub) · `packages/ecology/src/components/esa-file-upload.ts`
- `esa-range-slider` (hub) · `packages/ecology/src/components/esa-range-slider.ts`
- `esa-select` (hub) · `packages/ecology/src/components/esa-select.ts`
- `esa-tab-layout` (hub) · `packages/ecology/src/components/esa-tab-layout.ts`

## Markup and styles

_59 repeated elements are collapsed in the markup below; the comments say where._

- [habitat-design-tool.markup.md](https://esassoc.github.io/cb-fish-design/handoff/map-sow/claude/habitat-design-tool.markup.md) (31 KB)
- [habitat-design-tool.styles.md](https://esassoc.github.io/cb-fish-design/handoff/map-sow/claude/habitat-design-tool.styles.md) (30 KB)

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--breadcrumbs-bg` | `transparent` | component |
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#3d3d3d` | component |
| `--button-chrome-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--button-radius-md` | `.5rem` | component |
| `--button-radius-sm` | `.25rem` | component |
| `--cbf-amber-attention` | `#f6c244` | brand |
| `--cbf-blue-500` | `#3484c3` | brand |
| `--cbf-surface-crumb` | `#f4f4f4` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-default` | `#fafafa` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-brand` | `#c6dcf1` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--empty-state-icon-size-md` | `48px` | component |
| `--empty-state-icon-size-sm` | `32px` | component |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-body-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-body-xs-font-weight` | `400` | semantic |
| `--typography-body-xs-letter-spacing` | `.01em` | semantic |
| `--typography-body-xs-line-height` | `1.6` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-bold` | `700` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-regular` | `400` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-label-2xs-font-size` | `clamp(.5rem, .44rem + .3vw, .625rem)` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |
| `--typography-label-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-sm-strong-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-label-sm-strong-font-weight` | `600` | semantic |
| `--typography-label-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-label-sm-strong-line-height` | `1.6` | semantic |
| `--typography-microcopy-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-font-weight` | `500` | semantic |
| `--typography-microcopy-xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-line-height` | `1` | semantic |
