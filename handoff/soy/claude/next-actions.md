# Next actions

Start-of-year (SOY) budgets · source prototype: https://esassoc.github.io/cb-fish-design/soy/

![Next actions, desktop](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/next-actions.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/soy/claude/next-actions.phone.png

What the budget administrator should do next for the current stage, each with the button that does it: run setup, set EWB proposed, open the next stage, send a reminder, set finals, transfer, reconcile, close.

## Done when

- Every action links to the screen or opens the dialog that completes it.

## Components

- `cbf-soy-ov` (spoke) · `src\components\soy\cbf-soy-overview.astro`

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

## Markup

```html
<ul class="cbf-soy-ov__actions" data-ov-actions="">
  <li class="cbf-soy-ov__action">
    <div class="stack" data-gap="3xs">
      <strong>Review the FY2028 draft and run setup</strong
      ><span class="cbf-soy-ov__action-sub"
        >Confirm the dates, carry last year’s items forward, add new projects and apply the
        COLA.</span
      >
    </div>
    <a class="cbf-soy-ov__action-link" href="/cb-fish-design/soy/setup">Start setup →</a>
  </li>
</ul>
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
.cbf-soy-ov__actions {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-200);
}
.cbf-soy-ov__action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-400);
  flex-wrap: wrap;
  padding: var(--spacing-300) var(--spacing-400);
  border: 1px solid var(--color-border-default);
  border-inline-start: 4px solid var(--color-background-brand);
  border-radius: var(--radius-200);
  background: var(--color-background-elevation-raised);
}
.cbf-soy-ov__action-sub {
  font-size: 14px;
  color: var(--color-content-default-secondary);
}
.cbf-soy-ov__action-link {
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-background-brand);
  white-space: nowrap;
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--gap` | `.75rem` | component |
| `--radius-200` | `.5rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--typography-font-weight-semibold` | `600` | semantic |
