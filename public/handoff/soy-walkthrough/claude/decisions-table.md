# Decisions table

Start-of-year (SOY) budgets — future state · source prototype: https://esassoc.github.io/cb-fish-design/soy/walkthrough/

![Decisions table, desktop](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/decisions-table.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/decisions-table.phone.png

The eight decisions BPA needs to make, with the option the prototype shows and the alternative, each linked to where it can be seen.

## Key decisions

- Built at build time from DECISIONS in src/lib/soy/changes.ts, the same registry the changes layer reads.

## Done when

- 8 rows, DEC 1–8, each linking to a SOY screen.

## Components

- `cbf-soy-wt` (spoke) · `src\components\soy\cbf-soy-walkthrough.astro`
- `esa-pill` (hub) · `packages\ecology\src\components\esa-pill.astro`

## Data

- Fixture: `src/data/soy/seed.ts`
- Client store: `src/lib/soy/store.ts`
- Screens: /soy (overview), /soy/cycles, /soy/setup, /soy/items (+ item side panel on every screen), /soy/finals, /soy/transfers, /soy/close-out, /soy/activity.
- State changes are plain functions in src/lib/soy/actions.ts; the store wraps each in persist + notify (event cbf-soy:change). Bulk actions return a report of written and skipped items.
- Walkthrough presets (?step=1…7, plus 4.5 for the PM landing) compose the same actions; src/lib/soy/soy.test.ts pins their numbers (npm test).
- Every behavior change is tagged UI / BE / DEC in src/lib/soy/changes.ts and annotated in place by the “Show what’s changing” layer (cbf-soy-changes).
- All people and comment text are invented; project numbers and titles are illustrative.

| Field | Meaning |
|---|---|
| `item` | project number + fund + account type (Expense) within one fiscal year’s SOY — the Gemini identity |
| `amounts` | whole dollars, recorded per stage (ewb, pm, final), each with who, when and a rationale |
| `transfers` | per item, tied to a Budget Decision (one per round); variance = final − transferred |
| `today` | the demo date moves with the walkthrough (Jan 15 → Jun 15, 2027) |

`stage`: `EWB proposed` · `PM proposed` · `Final budget` · `Complete`

`cycleStatus`: `Draft` · `Open` · `Closed`

`transferStatus`: `No final amount` · `Not transferred` · `Transferred` · `Changed after transfer` · `Partially transferred`

`role`: `Budget administrator (EWB)` · `Project manager`

## Markup

_15 repeated elements are collapsed in the markup below; the comments say where._

```html
<section class="stack" data-gap="sm" aria-labelledby="wt-dec">
  <h2 class="cbf-soy-wt__h2" id="wt-dec">Decisions we need from you</h2>
  <p class="cbf-soy-wt__p">
    The prototype shows our recommended option for each. Tell us if you prefer the alternative.
  </p>
  <div class="cbf-soy-wt__scroll">
    <table class="cbf-soy-wt__table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Decision</th>
          <!-- …and 3 more like this (<th>) -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span class="esa-pill esa-pill--primary esa-pill--xs typography-microcopy-2xs">
              <span class="esa-pill__label">DEC 1</span>
            </span>
            <!-- script type="module" removed (233 bytes) -->
          </td>
          <td>Close FY2024–2027?</td>
          <!-- …and 3 more like this (<td>) -->
        </tr>
        <tr>
          <td>
            <span class="esa-pill esa-pill--primary esa-pill--xs typography-microcopy-2xs">
              <span class="esa-pill__label">DEC 2</span>
            </span>
          </td>
          <td>Should Complete lock admins?</td>
          <!-- …and 3 more like this (<td>) -->
        </tr>
        <!-- …and 6 more like this (<tr>) -->
      </tbody>
    </table>
  </div>
</section>
```

## Styles

```css
.typography-microcopy-2xs {
  font-family: var(--typography-microcopy-2xs-font-family);
  font-size: var(--typography-microcopy-2xs-font-size);
  font-weight: var(--typography-microcopy-2xs-font-weight);
  line-height: var(--typography-microcopy-2xs-line-height);
  letter-spacing: var(--typography-microcopy-2xs-letter-spacing);
}
.typography-microcopy-2xs {
  font-family: var(--typography-microcopy-2xs-font-family);
  font-size: var(--typography-microcopy-2xs-font-size);
  font-weight: var(--typography-microcopy-2xs-font-weight);
  line-height: var(--typography-microcopy-2xs-line-height);
  letter-spacing: var(--typography-microcopy-2xs-letter-spacing);
}
.esa-pill {
  --_pill-bg: var(--color-background-elevation-sunken, #f0f0f0);
  --_pill-text: var(--color-content-default, #202020);
  --_pill-border: var(--color-border-default-subtle, #d9d9d9);
  --_pill-padding-y: var(--spacing-150, 0.375rem);
  --_pill-padding-x: var(--spacing-200, 0.5rem);
  --_pill-gap: var(--spacing-100, 0.25rem);
  display: inline-flex;
  align-items: center;
  gap: var(--_pill-gap);
  padding-block: var(--_pill-padding-y);
  padding-inline: var(--_pill-padding-x);
  border: var(--border-width-default, 1px) solid var(--_pill-border);
  border-radius: var(--radius-chip, var(--radius-sm, 0.25rem));
  background: var(--_pill-bg);
  color: var(--_pill-text);
  white-space: nowrap;
  box-sizing: border-box;
}
.esa-pill--xs {
  --_pill-padding-y: var(--spacing-100, 0.25rem);
  --_pill-padding-x: var(--spacing-100, 0.25rem);
}
.esa-pill--primary {
  --_pill-bg: var(--color-background-brand-subtle, var(--color-grass-2));
  --_pill-text: var(--color-content-brand, var(--color-grass-11));
  --_pill-border: var(--color-border-brand, var(--color-grass-6));
}
.esa-pill[data-category] {
  --_pill-bg: var(--category-2, var(--color-background-elevation-sunken, #f0f0f0));
  --_pill-border: var(--category-6, var(--color-border-default-subtle, #d9d9d9));
  --_pill-text: var(--category-11, var(--color-content-default, #202020));
}
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.stack[data-split] > [data-split] {
  margin-block-end: auto;
}
.cbf-soy-wt__p {
  margin: 0;
  max-inline-size: 75ch;
  color: var(--color-content-default-secondary);
}
.cbf-soy-wt__h2 {
  margin: 0;
  font-family: var(--typography-font-family-display);
  font-weight: var(--typography-font-weight-semibold);
  font-size: var(--font-size-600, 24px);
  color: var(--color-background-default-knockout);
}
.cbf-soy-wt__scroll {
  overflow-x: auto;
}
.cbf-soy-wt__table {
  inline-size: 100%;
  min-inline-size: 720px;
  border-collapse: collapse;
  font-size: 14px;
}
.cbf-soy-wt__table th {
  text-align: start;
  padding: var(--spacing-200) var(--spacing-300);
  border-block-end: 2px solid var(--color-border-default);
  color: var(--color-content-default-secondary);
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-soy-wt__table td {
  padding: var(--spacing-200) var(--spacing-300);
  border-block-end: 1px solid var(--color-border-default-subtle);
  vertical-align: top;
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-brand` | `#c6dcf1` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-grass-11` | `#2a7e3b` | primitive |
| `--color-grass-2` | `#f5fbf5` | primitive |
| `--color-grass-6` | `#b2ddb5` | primitive |
| `--font-size-600` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | primitive |
| `--gap` | `.75rem` | component |
| `--radius-chip` | `.25rem` | semantic |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-microcopy-2xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-2xs-font-size` | `clamp(.5rem, .44rem + .3vw, .625rem)` | semantic |
| `--typography-microcopy-2xs-font-weight` | `500` | semantic |
| `--typography-microcopy-2xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-2xs-line-height` | `1` | semantic |
