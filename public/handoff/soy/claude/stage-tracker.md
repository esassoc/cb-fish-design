# Stage tracker

Start-of-year (SOY) budgets · source prototype: https://esassoc.github.io/cb-fish-design/soy/

![Stage tracker, desktop](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/stage-tracker.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/soy/claude/stage-tracker.phone.png

The four stages with open and due dates, the active stage and days left. A stage is due the day before the next one opens. "Open <next stage>" (admin) previews the stage-open email before it advances; stages never advance on their own.

## Key decisions

- DEC 5: due dates drive stage-open emails and automatic reminders; the admin still advances stages; PM proposed defaults to 4 weeks.
- Final budget → Complete has no advance button here; the cycle completes through Close-out.

## Done when

- Default dates: EWB proposed opens Mar 1, PM proposed Apr 12 (due May 9), Final budget May 10, Complete Jun 1.

## Components

- `cbf-soy-ov` (spoke) · `src\components\soy\cbf-soy-overview.astro`
- `esa-pill` (hub) · `packages\ecology\src\components\esa-pill.astro`

## Data

- Fixture: `src/data/soy/seed.ts`
- Client store: `src/lib/soy/store.ts`
- Screens: /soy (overview), /soy/cycles, /soy/setup, /soy/items (+ item side panel on every screen), /soy/finals, /soy/transfers, /soy/close-out, /soy/activity.
- State changes are plain functions in src/lib/soy/actions.ts; the store wraps each in persist + notify (event cbf-soy:change). Bulk actions return a report of written and skipped items.
- Demo presets (?step=1…7, plus 4.5 for the PM landing; linked from the separate walkthrough guide, not from the prototype) compose the same actions; src/lib/soy/soy.test.ts pins their numbers (npm test).
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

## Behavior

- `src/lib/soy/model.ts`

## Markup

_2 repeated elements are collapsed in the markup below; the comments say where._

```html
<ol class="cbf-soy-ov__tracker" data-ov-tracker="" data-change="ov-tracker">
  <li class="cbf-soy-ov__stage is-todo">
    <span class="cbf-soy-ov__stage-n">1</span>
    <span class="cbf-soy-ov__stage-name">EWB proposed</span>
    <span class="cbf-soy-ov__stage-dates">Opens Mar 1 · due Apr 11</span>
    <span class="esa-pill esa-pill--default esa-pill--xs typography-microcopy-2xs">
      <span class="esa-pill__label">Upcoming</span>
    </span>
  </li>
  <li class="cbf-soy-ov__stage is-todo">
    <span class="cbf-soy-ov__stage-n">2</span>
    <span class="cbf-soy-ov__stage-name">PM proposed</span>
    <span class="cbf-soy-ov__stage-dates">Opens Apr 12 · due May 9</span>
    <span class="esa-pill esa-pill--default esa-pill--xs typography-microcopy-2xs">
      <span class="esa-pill__label">Upcoming</span>
    </span>
  </li>
  <!-- …and 2 more like this (<li class="cbf-soy-ov__stage is-todo">) -->
</ol>
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
.cbf-soy-ip__step.is-todo .cbf-soy-ip__step-amt {
  color: var(--color-content-default-tertiary);
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
.esa-pill[data-category] {
  --_pill-bg: var(--category-2, var(--color-background-elevation-sunken, #f0f0f0));
  --_pill-border: var(--category-6, var(--color-border-default-subtle, #d9d9d9));
  --_pill-text: var(--category-11, var(--color-content-default, #202020));
}
.cbf-soy-ov__tracker {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--spacing-300);
}
@media (max-width: 760px) {
  .cbf-soy-ov__tracker {
    grid-template-columns: 1fr 1fr;
  }
}
.cbf-soy-ov__stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-150);
  padding: var(--spacing-300) var(--spacing-400);
  border: 1px solid var(--color-border-default);
  border-block-start-width: 4px;
  border-radius: var(--radius-200);
  background: var(--color-background-elevation-raised);
}
.cbf-soy-ov__stage.is-done {
  border-block-start-color: var(--color-background-utility-success, var(--color-border-default));
}
.cbf-soy-ov__stage.is-active {
  border-color: var(--color-background-brand);
  border-block-start-color: var(--color-background-brand);
  background: var(--color-background-brand-subtle);
}
.cbf-soy-ov__stage-n {
  font-size: 12px;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-content-default-tertiary);
}
.cbf-soy-ov__stage-name {
  font-size: 16px;
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-soy-ov__stage-dates {
  font-size: 13px;
  color: var(--color-content-default-secondary);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-success` | `#218358` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--radius-200` | `.5rem` | primitive |
| `--radius-chip` | `.25rem` | semantic |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--typography-font-weight-bold` | `700` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-microcopy-2xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-2xs-font-size` | `clamp(.5rem, .44rem + .3vw, .625rem)` | semantic |
| `--typography-microcopy-2xs-font-weight` | `500` | semantic |
| `--typography-microcopy-2xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-2xs-line-height` | `1` | semantic |
