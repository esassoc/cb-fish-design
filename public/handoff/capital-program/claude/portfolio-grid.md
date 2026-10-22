# Portfolio grid

Capital program · source prototype: https://esassoc.github.io/cb-fish-design/capital-program/

![Portfolio grid, desktop](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.phone.png

The capital budget spreadsheet with more columns: every project grouped Hatchery Expand, Hatchery Sustain, Land, Passage with a subtotal per group and a pinned grand total. Columns follow the Current FY (prior FY actuals, current FY forecast and YTD actuals, FY+1 to FY+3), plus record type, stage, OMB and NPCC status, design status, modified budget, remaining and last note; account type, in current Asset Plan and a pathway-dot strip are optional columns.

## Key decisions

- No esa data-grid lego exists, so the table is AG Grid Community on the shared token theme; filters are esa-chip-group, esa-select and esa-switch-toggle; the column picker is esa-popover + esa-checkbox-group.
- Sorting happens within groups: postSortRows keeps each group header, its rows and its subtotal together.
- Placeholders read muted with a dashed left edge, and one switch drops them from the totals.
- A red "OMB not approved" pill marks construction-contract spend in an open quarter without appropriations language (R7); "Flagged only" lists them.
- Filters live in sessionStorage so the browser back button from Project detail returns to the same view.

## Gotchas

- Row ids are stable across rebuilds, so the grid forces a cell refresh after each rebuild or group counts go stale.
- Negative values display in parentheses, matching the source reports.

## Done when

- FY27 grand total 48,415 (16,183 / 21,495 / 10,737 by category); FY28 total 63,846.
- Flagged only shows Chief Joseph Hatchery water temperature and Sherman Creek Intake.
- Clicking a row opens /capital-program/project?id=<id>.

## Components

- `cbf-cap-grid` (spoke) · `src\components\capital-program\cbf-cap-portfolio-grid.astro`
- `cbf-cap-muted` (spoke) · `src\components\capital-program\cbf-cap-frame.astro`
- `cbf-cap-row-group` (spoke) · `src\components\capital-program\cbf-cap-portfolio-grid.astro`
- `cbf-cap-row-project` (spoke) · `src\components\capital-program\cbf-cap-portfolio-grid.astro`
- `cbf-cap-row-subtotal` (spoke) · `src\components\capital-program\cbf-cap-portfolio-grid.astro`
- `cbf-cap-section-title` (spoke) · `src\components\capital-program\cbf-cap-frame.astro`
- `cbf-data-grid` (spoke) · `src\components\rme-work-elements\cbf-rme-work-elements-grid.astro`
- `cbf-grid-id` (spoke) · `src\components\invoice-review\cbf-invoice-review-queue.astro`
- `cbf-grid-link` (spoke) · `src\components\invoice-review\cbf-invoice-review-queue.astro`
- `cbf-icon` (spoke) · `src\components\search\cbf-icon.astro`
- `cbf-search-field` (spoke) · `src\components\search\cbf-search-field.astro`
- `esa-button` (hub) · `packages\ecology\src\components\esa-badge.astro`
- `esa-icon` (hub) · `packages\ecology\src\components\esa-collapsible.astro`
- `esa-pill` (hub) · `packages\ecology\src\components\esa-pill.astro`
- `esa-popover` (hub) · `packages\ecology\src\components\esa-popover.ts`

## Data

- Fixture: `src/data/capital-program/seed.ts`
- Client store: `src/lib/capital/store.ts`
- All money math lives in src/lib/capital/finance.ts and is unit-tested (npm test) against the PRD's "tests that must pass".
- State changes are pure functions in src/lib/capital/actions.ts; the store wraps each in persist + notify (event cbf-cap:change).

| Field | Meaning |
|---|---|
| `amounts` | $000s everywhere except the actuals CSV, which is whole dollars and is divided by 1,000 on import |
| `plans` | per project, per line type: 28 quarter slots, slot 0 = FY24 Q1 … slot 27 = FY30 Q4 |
| `actuals` | per project, per FY: 12 months, Oct first |
| `dataAsOf` | a quarter whose last day is on or before this date is closed and shows actuals |

`recordType`: `Request` · `Placeholder` · `Active` · `Complete` · `Cancelled` · `Deferred`

`envelopeSource`: `apExpected (default)` · `apOptimal (Expected ÷ 0.8 unless entered)` · `ipr (information only)`

`gateStatus`: `Not started` · `In progress` · `Green` · `Red` · `Not applicable`

## Markup and styles

_212 repeated elements are collapsed in the markup below; the comments say where._

- [portfolio-grid.markup-1.md](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.markup-1.md) (46 KB)
- [portfolio-grid.markup-2.md](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.markup-2.md) (47 KB)
- [portfolio-grid.markup-3.md](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.markup-3.md) (47 KB)
- [portfolio-grid.markup-4.md](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.markup-4.md) (21 KB)
- [portfolio-grid.styles.md](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.styles.md) (14 KB)

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--button-chrome-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--button-radius-md` | `.5rem` | component |
| `--button-radius-sm` | `.25rem` | component |
| `--cbf-text-placeholder` | `#9aa3ad` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-muted-hover` | `#1e5386` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-danger-subtle` | `#fffcfc` | semantic |
| `--color-background-utility-success-subtle` | `#fbfefc` | semantic |
| `--color-border-brand` | `#c6dcf1` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-border-utility-danger` | `#fdbdbe` | semantic |
| `--color-border-utility-success` | `#adddc0` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--color-content-on-brand-muted` | `#203c25` | semantic |
| `--color-content-utility-danger` | `#ce2c31` | semantic |
| `--color-content-utility-success` | `#218358` | semantic |
| `--color-grass-11` | `#2a7e3b` | primitive |
| `--color-grass-2` | `#f5fbf5` | primitive |
| `--color-grass-6` | `#b2ddb5` | primitive |
| `--color-green-2` | `#f4fbf6` | primitive |
| `--color-green-6` | `#adddc0` | primitive |
| `--color-red-2` | `#fff7f7` | primitive |
| `--color-red-6` | `#fdbdbe` | primitive |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--font-size-500` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | primitive |
| `--gap` | `.75rem` | component |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-sm` | `16px` | primitive |
| `--radius-050` | `.125rem` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--radius-chip` | `.25rem` | semantic |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
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
| `--typography-microcopy-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-font-weight` | `500` | semantic |
| `--typography-microcopy-xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-line-height` | `1` | semantic |
