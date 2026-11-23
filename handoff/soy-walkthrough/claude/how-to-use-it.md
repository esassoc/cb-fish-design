# How to use it

Start-of-year (SOY) budgets — future state · source prototype: https://esassoc.github.io/cb-fish-design/soy/walkthrough/

![How to use it, desktop](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/how-to-use-it.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/how-to-use-it.phone.png

Orients a client reviewer: what the prototype is, that it changes nothing in CBFish, and the four prototype devices — step links, the role lens, the “Show what’s changing” layer and reset/jump.

## Key decisions

- Prototype devices live in cbf-prototype-strip on every SOY screen so they never read as product.

## Done when

- Every device named here exists in the prototype strip on /soy.

## Components

- `cbf-soy-wt` (spoke) · `src\components\soy\cbf-soy-walkthrough.astro`
- `esa-alert-box` (hub) · `packages\ecology\src\components\esa-alert-box.astro`

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

_3 repeated elements are collapsed in the markup below; the comments say where._

```html
<section class="stack" data-gap="sm" aria-labelledby="wt-how">
  <p class="cbf-soy-wt__lede">
    This prototype shows the whole recommended future state of start-of-year (SOY) budgets — screens
    and behavior together — played through one FY2028 cycle with mock data shaped like FY2027 (about
    240 items and $327M baseline). Nothing here changes CBFish; it’s for review and sign-off before
    anything is built.
  </p>
  <div class="esa-alert-box esa-alert-box--info typography-body-sm">
    <div class="esa-alert-box__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    </div>
    <div class="esa-alert-box__body">
      <strong class="esa-alert-box__title typography-label-sm-strong">How to use it</strong>
      <div class="esa-alert-box__message">
        <ul class="cbf-soy-wt__how">
          <li>
            <strong>Start a step</strong> below: each link loads the demo data for that point in the
            year, so you can begin anywhere.
          </li>
          <li>
            <strong>Viewing as</strong> switches between the budget administrator and a project
            manager (Casey Navarro).
          </li>
          <!-- …and 3 more like this (<li>) -->
        </ul>
      </div>
    </div>
  </div>
  <!-- script type="module" removed (455 bytes) -->
</section>
```

## Styles

```css
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-label-sm-strong {
  font-family: var(--typography-label-sm-strong-font-family);
  font-size: var(--typography-label-sm-strong-font-size);
  font-weight: var(--typography-label-sm-strong-font-weight);
  line-height: var(--typography-label-sm-strong-line-height);
  letter-spacing: var(--typography-label-sm-strong-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-label-sm-strong {
  font-family: var(--typography-label-sm-strong-font-family);
  font-size: var(--typography-label-sm-strong-font-size);
  font-weight: var(--typography-label-sm-strong-font-weight);
  line-height: var(--typography-label-sm-strong-line-height);
  letter-spacing: var(--typography-label-sm-strong-letter-spacing);
}
.esa-alert-box {
  --_alert-bg: var(--color-background-utility-info-subtle, #fbfdff);
  --_alert-border: var(--color-border-utility-info, #acd8fc);
  --_alert-accent: var(--color-content-utility-info, #0d74ce);
  --_alert-icon-color: var(--_alert-accent);
  --_alert-title-color: var(--_alert-accent);
  --_alert-text-color: var(--alert-box-text-color, var(--color-content-default-secondary, #646464));
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-300, 0.75rem);
  padding: var(--spacing-300, 0.75rem) var(--spacing-400, 1rem);
  border: var(--border-width-default, 1px) solid var(--_alert-border);
  border-radius: var(--radius-md, 0.5rem);
  background: var(--_alert-bg);
}
.esa-alert-box__icon {
  flex-shrink: 0;
  color: var(--_alert-icon-color);
  padding-top: 1px;
}
.esa-alert-box__body {
  flex: 1;
  min-width: 0;
}
.esa-alert-box__title {
  display: block;
  color: var(--_alert-title-color);
  margin-bottom: var(--spacing-050, 0.125rem);
}
.esa-alert-box__message {
  color: var(--_alert-text-color);
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
.cbf-soy-wt__lede {
  margin: 0;
  max-inline-size: 75ch;
  font-size: 18px;
  line-height: 1.55;
  color: var(--color-content-default);
}
.cbf-soy-wt__how {
  margin: 0;
  padding-inline-start: var(--spacing-500);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--alert-box-text-color` | `#525252` | component |
| `--border-width-default` | `1px` | semantic |
| `--color-background-utility-info-subtle` | `#f3f7fc` | semantic |
| `--color-border-utility-info` | `#c6dcf1` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-utility-info` | `#0d74ce` | semantic |
| `--gap` | `.75rem` | component |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-label-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-sm-strong-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-label-sm-strong-font-weight` | `600` | semantic |
| `--typography-label-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-label-sm-strong-line-height` | `1.6` | semantic |
