# Token contract — home

The 32 design tokens this page actually uses, resolved to their final values for the `cb-fish` theme. Component CSS still references them by name (`var(--color-primary)`), so the names carry the intent; the values below are what they currently resolve to.

## Semantic

| Token | Value |
|---|---|
| `--color-border` | `#dcdcdc` |
| `--color-primary` | `#1e5386` |
| `--color-primary-border` | `#c6dcf1` |
| `--color-primary-subtle` | `#f3f7fc` |
| `--color-surface` | `#ffffff` |
| `--color-surface-inverse` | `#13273e` |
| `--color-text-inverse` | `#ffffff` |
| `--color-text-link` | `#1e5386` |
| `--color-text-muted` | `#7c7c7c` |
| `--color-text-primary` | `#171717` |

## Component

| Token | Value |
|---|---|
| `--form-height-md` | `40px` |

## Primitive

| Token | Value |
|---|---|
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` |
| `--font-sans` | `"IBM Plex Sans", sans-serif` |
| `--font-weight-bold` | `700` |
| `--font-weight-medium` | `500` |
| `--font-weight-regular` | `400` |
| `--font-weight-semibold` | `600` |
| `--radius-100` | `.25rem` |
| `--radius-200` | `.5rem` |
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
| `--transition-fast` | `.15s ease` |
| `--type-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` |

## Component-scoped

Defined per-component (not at `:root`); see the component's own rule in `styles.css`.

- `--app-bar-gap`
- `--app-bar-pad-x`
- `--app-bar-pad-y`
- `--cbf-container-max`
- `--icon-size-medium`
