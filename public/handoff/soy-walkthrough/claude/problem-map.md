# Problem map

Start-of-year (SOY) budgets — future state · source prototype: https://esassoc.github.io/cb-fish-design/soy/walkthrough/

![Problem map, desktop](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/problem-map.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/problem-map.phone.png

Each of today’s ten problems (P1–P10) with the screens and changes that answer it, plus counts of UI, BE and DEC changes so engineering can see the weight.

## Done when

- Every problem P1–P10 lists at least one change.

## Components

- `cbf-soy-wt` (spoke) · `src\components\soy\cbf-soy-walkthrough.astro`

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

_8 repeated elements are collapsed in the markup below; the comments say where._

```html
<section class="stack" data-gap="sm" aria-labelledby="wt-prob">
  <h2 class="cbf-soy-wt__h2" id="wt-prob">What each change solves</h2>
  <p class="cbf-soy-wt__p">
    42 changes in all: 28 need front-end work only (UI), 15 need backend or data work (BE), and 13
    show a recommended answer to a decision (DEC). Turn on “Show what’s changing” on any screen to
    see them in place.
  </p>
  <div class="cbf-soy-wt__scroll">
    <table class="cbf-soy-wt__table">
      <thead>
        <tr>
          <th scope="col">Problem today</th>
          <th scope="col">Answered on</th>
          <th scope="col">Changes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>P1</strong> The cycle is assembled by hand every year</td>
          <td>All cycles, Setup</td>
          <td>The next cycle drafts itself · One setup wizard · Dates are pre-filled</td>
        </tr>
        <tr>
          <td><strong>P2</strong> Due dates do nothing</td>
          <td>Overview, Setup, Final decisions, Activity</td>
          <td>
            Stage tracker with due dates · Advance stage with an email preview · "Needs input"
            replaces Remaining · Dates are pre-filled · Notify PMs of final amounts · Automatic
            reminders
          </td>
        </tr>
        <!-- …and 8 more like this (<tr>) -->
      </tbody>
    </table>
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
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--font-size-600` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | primitive |
| `--gap` | `.75rem` | component |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
