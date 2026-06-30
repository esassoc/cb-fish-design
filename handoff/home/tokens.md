# Token contract — home

The 68 design tokens this page actually uses, resolved to their final values for the `cb-fish` theme. Component CSS still references them by name (`var(--color-primary)`), so the names carry the intent; the values below are what they currently resolve to.

## Semantic

| Token | Value |
|---|---|
| `--color-border` | `#dcdcdc` |
| `--color-border-light` | `#efefef` |
| `--color-primary` | `#1e5386` |
| `--color-secondary-strong` | `#2a7e3b` |
| `--color-surface` | `#fcfcfc` |
| `--color-surface-inverse` | `#13273e` |
| `--color-text-inverse` | `#fcfcfc` |
| `--color-text-link` | `#1e5386` |
| `--color-text-muted` | `#7c7c7c` |
| `--color-text-primary` | `#3d3d3d` |
| `--color-text-secondary` | `#525252` |

## Component

| Token | Value |
|---|---|
| `--app-bar-bg` | `#fcfcfc` |
| `--app-bar-brand-bg` | `#1e5386` |
| `--app-bar-brand-strong-bg` | `#13273e` |
| `--app-bar-brand-strong-text` | `#fcfcfc` |
| `--app-bar-brand-text` | `#fcfcfc` |
| `--app-bar-gap` | `2rem` |
| `--app-bar-pad-x` | `2rem` |
| `--app-bar-pad-y` | `1rem` |
| `--app-bar-text` | `#3d3d3d` |
| `--card-bg` | `#fcfcfc` |
| `--card-border-color` | `#dcdcdc` |
| `--card-header-bg` | `transparent` |
| `--card-header-border-color` | `#efefef` |
| `--card-header-color` | `#3d3d3d` |
| `--card-padding` | `1.5rem` |
| `--card-radius` | `.5rem` |
| `--icon-link-font-size-md` | `1rem` |
| `--icon-link-font-size-sm` | `.875rem` |
| `--icon-link-gap` | `.375rem` |
| `--icon-size-medium` | `20px` |
| `--icon-size-small` | `16px` |
| `--link-column-heading-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` |
| `--link-column-item-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` |
| `--side-dialog-width` | `400px` |
| `--side-dialog-width-sm` | `320px` |

## Primitive

| Token | Value |
|---|---|
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` |
| `--font-sans` | `"IBM Plex Sans", sans-serif` |
| `--font-weight-bold` | `700` |
| `--font-weight-medium` | `500` |
| `--font-weight-regular` | `400` |
| `--font-weight-semibold` | `600` |
| `--icon-size-md` | `20px` |
| `--icon-size-sm` | `16px` |
| `--icon-size-xs` | `14px` |
| `--letter-spacing-normal` | `.01em` |
| `--letter-spacing-tight` | `-.01em` |
| `--line-height-normal` | `1.6` |
| `--line-height-relaxed` | `1.8` |
| `--line-height-tight` | `1.3` |
| `--radius-300` | `.5rem` |
| `--spacing-050` | `.125rem` |
| `--spacing-100` | `.25rem` |
| `--spacing-150` | `.375rem` |
| `--spacing-200` | `.5rem` |
| `--spacing-300` | `.75rem` |
| `--spacing-400` | `1rem` |
| `--spacing-500` | `1.5rem` |
| `--spacing-600` | `2rem` |
| `--spacing-650` | `2.5rem` |
| `--spacing-700` | `3rem` |
| `--spacing-800` | `4rem` |
| `--type-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` |
| `--type-size-500` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` |
| `--type-size-600` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` |
| `--type-size-700` | `clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem)` |

## Component-scoped

Defined per-component (not at `:root`); see the component's own rule in `styles.css`.

- `--color-gold-200`
- `--font-sans-condensed`
- `--gap`
- `--grid-min`
- `--stat-accent-color`
- `--stat-gap`
- `--stat-label-color`
- `--stat-label-size`
- `--stat-label-weight`
- `--stat-sub-color`
- `--stat-sub-size`
- `--stat-value-color`
- `--stat-value-font`
- `--stat-value-size`
- `--stat-value-weight`
