# Headroom panel

Capital program · source prototype: https://esassoc.github.io/cb-fish-design/capital-program/

![Headroom panel, desktop](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/headroom-panel.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/headroom-panel.phone.png

Answers "can we say yes?" for the selected FY: one tile per category plus total, each showing envelope, Active forecast, Placeholder forecast, open requests and headroom = envelope − (Active + Placeholder), with the Optimal ceiling and room to it. The Passage tile shows the placeholder being drawn down by named projects and the competing asks. A "What if we say yes?" checklist counts chosen requests against headroom; a "freed this year" line lists current-FY reductions since the last snapshot.

## Key decisions

- Open requests are shown beside headroom, never subtracted from it unless ticked in what-if.
- Optimal = Expected ÷ 0.8 unless an Optimal figure is entered ("Finance can approve up to Optimal").
- Requests with category TBD count in the total tile only.
- Clicking a tile filters the grid below to that category (event cbf-cap:filter-category).

## Gotchas

- Headroom can be negative; show it in parentheses and red with "Short by n".
- FY29+ has no envelope in the seed — tiles read "No envelope", not zero.

## Done when

- FY27 vs Asset Plan Expected: headroom 0 against 48,415; 12,104 room to the 60,519 Optimal ceiling; open requests 30,900.
- FY27 vs IPR: 18,573, tagged information only.
- Ticking every FY27 request: total headroom (30,900).

## Components

- `cbf-cap-headroom` (spoke) · `src\components\capital-program\cbf-cap-headroom.astro`
- `cbf-cap-hr-asks` (spoke) · `src\components\capital-program\cbf-cap-headroom.astro`
- `cbf-cap-hr-big` (spoke) · `src\components\capital-program\cbf-cap-headroom.astro`
- `cbf-cap-hr-cap` (spoke) · `src\components\capital-program\cbf-cap-headroom.astro`
- `cbf-cap-hr-draw` (spoke) · `src\components\capital-program\cbf-cap-headroom.astro`
- `cbf-cap-hr-freed-title` (spoke) · `src\components\capital-program\cbf-cap-headroom.astro`
- `cbf-cap-hr-list` (spoke) · `src\components\capital-program\cbf-cap-headroom.astro`
- `cbf-cap-hr-optimal` (spoke) · `src\components\capital-program\cbf-cap-headroom.astro`
- `cbf-cap-hr-row` (spoke) · `src\components\capital-program\cbf-cap-headroom.astro`
- `cbf-cap-muted` (spoke) · `src\components\capital-program\cbf-cap-frame.astro`
- `cbf-cap-num` (spoke) · `src\components\capital-program\cbf-cap-close-fy.astro`
- `cbf-cap-section-title` (spoke) · `src\components\capital-program\cbf-cap-frame.astro`
- `esa-card` (hub) · `packages\ecology\src\components\esa-card.astro`
- `esa-collapsible` (hub) · `packages\ecology\src\components\esa-collapsible.astro`
- `esa-icon` (hub) · `packages\ecology\src\components\esa-collapsible.astro`

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

## Behavior

- `src/lib/capital/finance.ts`

## Markup

_7 repeated elements are collapsed in the markup below; the comments say where._

```html
<section
  class="cbf-cap-headroom stack"
  data-gap="sm"
  data-cap-headroom=""
  aria-labelledby="cap-headroom-title"
>
  <div class="repel">
    <h2 class="cbf-cap-section-title" id="cap-headroom-title" data-hr-title="">FY27 headroom</h2>
    <span class="typography-meta cbf-cap-muted" data-hr-source=""
      >Against Asset Plan Expected (SOY) — Asset Plan SOY (approved)</span
    >
  </div>
  <div class="cbf-cap-headroom__tiles">
    <div
      class="cbf-cap-headroom__tile"
      data-hr-tile="Hatchery"
      role="button"
      tabindex="0"
      aria-label="Show Hatchery in the grid"
    >
      <div class="esa-card esa-card--outlined esa-card--padding-compact">
        <div class="esa-card__header">
          <div class="esa-card__header-content">
            <div class="esa-card__titles">
              <h3 class="esa-card__title typography-title-sm-strong">Hatchery</h3>
            </div>
          </div>
        </div>
        <div class="esa-card__body typography-body-md">
          <div data-hr-body="">
            <p class="cbf-cap-hr-big">0</p>
            <p class="cbf-cap-hr-cap">Headroom</p>
            <dl class="cbf-cap-hr-list">
              <div class="cbf-cap-hr-row">
                <dt>Envelope</dt>
                <dd class="cbf-cap-num">16,183</dd>
              </div>
              <div class="cbf-cap-hr-row">
                <dt>Active forecast</dt>
                <dd class="cbf-cap-num">14,883</dd>
              </div>

              <div class="cbf-cap-hr-row is-requests">
                <dt>Open requests</dt>
                <dd class="cbf-cap-num">0</dd>
              </div>
              <!-- …and 1 more like this (<div class="cbf-cap-hr-row ">) -->
            </dl>
            <p
              class="cbf-cap-hr-optimal"
              title="Finance can approve up to Optimal. Expected is 80% of Optimal in every source table."
            >
              <span class="cbf-cap-muted">Up to Optimal</span> 20,229 ·
              <span class="">4,046 room</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cbf-cap-headroom__tile"
      data-hr-tile="Land"
      role="button"
      tabindex="0"
      aria-label="Show Land in the grid"
    >
      <div class="esa-card esa-card--outlined esa-card--padding-compact">
        <div class="esa-card__header">
          <div class="esa-card__header-content">
            <div class="esa-card__titles">
              <h3 class="esa-card__title typography-title-sm-strong">Land</h3>
            </div>
          </div>
        </div>
        <div class="esa-card__body typography-body-md">
          <div data-hr-body="">
            <p class="cbf-cap-hr-big">0</p>
            <p class="cbf-cap-hr-cap">Headroom</p>
            <dl class="cbf-cap-hr-list">
              <div class="cbf-cap-hr-row">
                <dt>Envelope</dt>
                <dd class="cbf-cap-num">21,495</dd>
              </div>
              <div class="cbf-cap-hr-row">
                <dt>Active forecast</dt>
                <dd class="cbf-cap-num">21,495</dd>
              </div>

              <div class="cbf-cap-hr-row is-requests">
                <dt>Open requests</dt>
                <dd class="cbf-cap-num">0</dd>
              </div>
              <!-- …and 1 more like this (<div class="cbf-cap-hr-row ">) -->
            </dl>
            <p
              class="cbf-cap-hr-optimal"
              title="Finance can approve up to Optimal. Expected is 80% of Optimal in every source table."
            >
              <span class="cbf-cap-muted">Up to Optimal</span> 26,869 ·
              <span class="">5,374 room</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- …and 2 more like this (<div class="cbf-cap-headroom__tile">) -->
  </div>
  <div class="cbf-cap-headroom__below">
    <details class="esa-collapsible">
      <summary class="esa-collapsible__summary typography-label-sm-strong">
        <span class="esa-icon esa-icon--sm" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path d="M16 7h6v6"></path>
            <path d="m22 7-8.5 8.5-5-5L2 17"></path>
          </svg>
        </span>
        <span class="esa-collapsible__title">What if we say yes?</span>
      </summary>
      <div class="esa-collapsible__body typography-body-md">
        <div class="stack" data-gap="xs">
          <p class="typography-meta cbf-cap-muted cbf-cap-headroom__hint">
            Tick open requests to count them against headroom for the selected FY.
          </p>
          <div class="stack" data-gap="2xs" data-hr-whatif="">
            <esa-checkbox
              size="sm"
              data-whatif="hall-ranch"
              label="Hall Ranch (GRMW) — Passage — 14,000"
            ></esa-checkbox
            ><esa-checkbox
              size="sm"
              data-whatif="dmf-items"
              label="DMF requests (two $5M items) — TBD — 10,000"
            ></esa-checkbox
            ><!-- …and 3 more like this (<esa-checkbox>) -->
          </div>
        </div>
      </div>
    </details>
    <div class="cbf-cap-headroom__freed" data-hr-freed="">
      <p class="cbf-cap-hr-freed-title">
        <strong>Freed in FY27</strong>
        <span class="cbf-cap-muted">since FY26 Q3 (Jun 30, 2026)</span>
      </p>
      <p class="typography-meta cbf-cap-muted">No FY27 forecast has dropped since that snapshot.</p>
    </div>
  </div>
</section>
```

## Styles

```css
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-label-sm-strong {
  font-family: var(--typography-label-sm-strong-font-family);
  font-size: var(--typography-label-sm-strong-font-size);
  font-weight: var(--typography-label-sm-strong-font-weight);
  line-height: var(--typography-label-sm-strong-line-height);
  letter-spacing: var(--typography-label-sm-strong-letter-spacing);
}
.typography-title-sm-strong {
  font-family: var(--typography-title-sm-strong-font-family);
  font-size: var(--typography-title-sm-strong-font-size);
  font-weight: var(--typography-title-sm-strong-font-weight);
  line-height: var(--typography-title-sm-strong-line-height);
  letter-spacing: var(--typography-title-sm-strong-letter-spacing);
}
.typography-meta {
  font-family: var(--typography-meta-font-family);
  font-size: var(--typography-meta-font-size);
  font-weight: var(--typography-meta-font-weight);
  line-height: var(--typography-meta-line-height);
  letter-spacing: var(--typography-meta-letter-spacing);
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.esa-nav-dropdown[open] .esa-button__native > .esa-icon:last-child {
  transform: rotate(180deg);
}
.esa-icon {
  --_icon-size: var(--icon-size-md, 20px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  color: inherit;
}
.esa-icon--sm {
  --_icon-size: var(--icon-size-sm, 16px);
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-label-sm-strong {
  font-family: var(--typography-label-sm-strong-font-family);
  font-size: var(--typography-label-sm-strong-font-size);
  font-weight: var(--typography-label-sm-strong-font-weight);
  line-height: var(--typography-label-sm-strong-line-height);
  letter-spacing: var(--typography-label-sm-strong-letter-spacing);
}
.typography-title-sm-strong {
  font-family: var(--typography-title-sm-strong-font-family);
  font-size: var(--typography-title-sm-strong-font-size);
  font-weight: var(--typography-title-sm-strong-font-weight);
  line-height: var(--typography-title-sm-strong-line-height);
  letter-spacing: var(--typography-title-sm-strong-letter-spacing);
}
.typography-meta {
  font-family: var(--typography-meta-font-family);
  font-size: var(--typography-meta-font-size);
  font-weight: var(--typography-meta-font-weight);
  line-height: var(--typography-meta-line-height);
  letter-spacing: var(--typography-meta-letter-spacing);
}
.cbf-cap-num {
  font-variant-numeric: tabular-nums;
  text-align: end;
}
.cbf-cap-muted {
  color: var(--color-content-default-tertiary);
}
.cbf-cap-section-title {
  margin: 0;
  font-family: var(--typography-font-family-display);
  font-weight: var(--typography-font-weight-semibold);
  font-size: var(--font-size-500, 20px);
  color: var(--color-background-default-knockout);
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
.repel {
  --gap: var(--spacing-400, 1rem);
  --align: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: space-between;
}
.esa-card {
  --_card-bg: var(--card-bg, var(--color-background-elevation-raised, #fcfcfc));
  --_card-border: var(--card-border-color, var(--color-border-default, #cecece));
  --_card-radius: var(--radius-md, 0.5rem);
  --_card-padding: var(--spacing-500, 1.5rem);
  --_card-header-bg: var(--card-header-bg, transparent);
  --_card-header-color: var(--color-content-default, #202020);
  --_card-header-border: var(--color-border-default-subtle, #d9d9d9);
  --_card-meta-label-color: var(--color-content-default-secondary, #646464);
  --_card-meta-label-size: var(--typography-label-sm-font-size, 0.875rem);
  --_card-meta-value-size: var(--typography-label-md-font-size, 0.9375rem);
  display: block;
  background: var(--_card-bg);
  border: var(--border-width-default, 1px) solid var(--_card-border);
  border-radius: var(--_card-radius);
  overflow: hidden;
}
.esa-card--outlined {
  --_card-border: var(--color-border-default, #cecece);
}
.esa-card--header-primary .esa-card__header {
  --_card-header-bg: var(--color-background-brand, #46a758);
  --_card-header-color: var(--color-content-default-knockout, #fcfcfc);
}
.esa-card--header-muted .esa-card__header {
  --_card-header-bg: var(--color-background-elevation-sunken, #f0f0f0);
}
.esa-card--padding-compact {
  --_card-padding: var(--spacing-300, 0.75rem);
}
.esa-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-400, 1rem) var(--_card-padding);
  background: var(--_card-header-bg);
  color: var(--_card-header-color);
  border-bottom: var(--border-width-default, 1px) solid var(--_card-header-border);
  min-height: 56px;
}
.esa-card__header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-300, 0.75rem);
}
.esa-card__titles {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-050, 0.125rem);
}
.esa-card__title {
  margin: 0;
  color: inherit;
}
.esa-card__body {
  padding: var(--_card-padding);
}
.cbf-cap-hr-big {
  margin: 0;
  font-family: var(--typography-font-family-display);
  font-weight: var(--typography-font-weight-semibold);
  font-size: 32px;
  line-height: 1.1;
  color: var(--color-background-default-knockout);
  font-variant-numeric: tabular-nums;
}
.cbf-cap-hr-big.cbf-cap-neg {
  color: var(--color-content-utility-danger);
}
.cbf-cap-hr-cap {
  margin: 0 0 var(--spacing-200);
  font-size: 13px;
  color: var(--color-content-default-tertiary);
}
.cbf-cap-hr-list {
  margin: 0;
  display: grid;
  gap: 2px;
  font-size: 13px;
}
.cbf-cap-hr-row {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-200);
}
.cbf-cap-hr-row dt {
  color: var(--color-content-default-secondary);
}
.cbf-cap-hr-row dd {
  margin: 0;
}
.cbf-cap-hr-row.is-requests {
  border-top: 1px dashed var(--color-border-default);
  padding-top: 2px;
  margin-top: 2px;
}
.cbf-cap-hr-row.is-whatif dd {
  color: var(--color-content-utility-warning);
}
.cbf-cap-hr-row.is-strong dd {
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-cap-hr-optimal {
  margin: var(--spacing-200) 0 0;
  font-size: 12px;
}
.cbf-cap-hr-draw {
  margin-top: var(--spacing-200);
  padding-top: var(--spacing-200);
  border-top: 1px solid var(--color-border-default-subtle);
}
.cbf-cap-hr-asks {
  margin: var(--spacing-100) 0 0;
  font-size: 12px;
  line-height: 1.4;
}
.cbf-cap-hr-freed-title {
  margin: 0 0 var(--spacing-100);
}
.cbf-cap-headroom__tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: var(--spacing-300);
}
.cbf-cap-headroom__tile {
  cursor: pointer;
  border-radius: var(--radius-200);
}
.cbf-cap-headroom__tile:hover .esa-card {
  border-color: var(--color-border-brand);
}
.cbf-cap-headroom__tile:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.cbf-cap-headroom__tile[data-hr-tile="Total"] .esa-card {
  background: var(--color-background-elevation-sunken);
}
.cbf-cap-headroom__below {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--spacing-300);
  align-items: start;
}
@media (max-width: 900px) {
  .cbf-cap-headroom__below {
    grid-template-columns: 1fr;
  }
}
.cbf-cap-headroom__hint {
  margin: 0;
}
.cbf-cap-headroom__freed {
  font-size: 14px;
  padding: var(--spacing-200) var(--spacing-300);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-200);
}
.cbf-cap-headroom__freed:empty {
  display: none;
}
.cbf-data-grid__filter .typography-meta {
  color: var(--color-content-default-tertiary);
  white-space: nowrap;
}
.esa-collapsible {
  border: var(--border-width-default, 1px) solid var(--color-border-default, #cecece);
  border-radius: var(--radius-md, 0.5rem);
  background: var(--color-background-elevation-raised, #fcfcfc);
}
.esa-collapsible--flush > .esa-collapsible__summary,
.esa-collapsible--flush > .esa-collapsible__body {
  padding-inline: 0;
}
.esa-collapsible__summary {
  display: flex;
  align-items: center;
  gap: var(--spacing-200, 0.5rem);
  padding: var(--spacing-300, 0.75rem) var(--spacing-400, 1rem);
  color: var(--color-content-default, #202020);
  cursor: pointer;
  list-style: none;
}
.esa-collapsible__summary::-webkit-details-marker {
  display: none;
}
.esa-collapsible__summary:after {
  content: "";
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--color-content-default-secondary, #646464);
  border-bottom: 2px solid var(--color-content-default-secondary, #646464);
  transform: rotate(-45deg);
  transition: transform 0.15s ease;
  margin-left: auto;
}
.esa-collapsible[open] > .esa-collapsible__summary:after {
  transform: rotate(45deg);
}
.esa-collapsible__summary .esa-icon {
  flex-shrink: 0;
  color: var(--color-content-default-secondary, #646464);
}
.esa-collapsible__body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400, 1rem);
  padding: 0 var(--spacing-400, 1rem) var(--spacing-400, 1rem);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-header-bg` | `transparent` | component |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-brand` | `#c6dcf1` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-border-focus` | `#3e9b4f` | component |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--color-content-utility-danger` | `#ce2c31` | semantic |
| `--color-content-utility-warning` | `#ab6400` | semantic |
| `--font-size-500` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | primitive |
| `--gap` | `.75rem` | component |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-sm` | `16px` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
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
| `--typography-title-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-title-sm-strong-font-size` | `clamp(.8125rem, .71rem + .5vw, 1.0625rem)` | semantic |
| `--typography-title-sm-strong-font-weight` | `600` | semantic |
| `--typography-title-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-title-sm-strong-line-height` | `1.6` | semantic |
