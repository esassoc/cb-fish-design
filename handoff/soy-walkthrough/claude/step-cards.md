# Step cards

Start-of-year (SOY) budgets — future state · source prototype: https://esassoc.github.io/cb-fish-design/soy/walkthrough/

![Step cards, desktop](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/step-cards.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/step-cards.phone.png

The FY2028 cycle as seven steps, each linking to the screen and loading the demo state for that moment (?step=N&role=…), so a reviewer can start anywhere.

## Key decisions

- Presets are built by running the same actions a presenter would click, so jumping and clicking always agree.
- Step 4 has a second link (?step=4.5&role=pm) to the PM’s landing just after PM proposed opens.

## Done when

- Step 2 → setup carries 230 of 237 items (7 unchecked with reasons) and adds 4 new projects.
- Step 5 → the overview shows 4 PMs with 12 items outstanding and the automatic reminder sent.
- Step 7 → the close-out checklist is all green with two transfer rounds.

## Components

- `cbf-soy-wt` (spoke) · `src\components\soy\cbf-soy-walkthrough.astro`
- `esa-button` (hub) · `packages\ecology\src\components\esa-badge.astro`
- `esa-card` (hub) · `packages\ecology\src\components\esa-card.astro`
- `esa-icon` (hub) · `packages\ecology\src\components\esa-collapsible.astro`

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

## Behavior

- `src/lib/soy/actions.ts`
- `src/lib/soy/store.ts`

## Markup

_7 repeated elements are collapsed in the markup below; the comments say where._

```html
<section class="stack" data-gap="sm" aria-labelledby="wt-story">
  <h2 class="cbf-soy-wt__h2" id="wt-story">The FY2028 cycle, step by step</h2>
  <ol class="cbf-soy-wt__steps">
    <li>
      <div class="esa-card esa-card--outlined">
        <div class="esa-card__header">
          <div class="esa-card__header-content">
            <div class="esa-card__titles">
              <h3 class="esa-card__title typography-title-sm-strong">
                1. The FY2028 cycle drafts itself
              </h3>
              <dl class="esa-card__meta">
                <div class="esa-card__meta-pair">
                  <dt>Demo date</dt>
                  <dd>Jan 15, 2027</dd>
                </div>
                <div class="esa-card__meta-pair">
                  <dt>Role</dt>
                  <dd>Budget administrator</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div class="esa-card__body typography-body-md">
          <ul class="cbf-soy-wt__points">
            <li>FY2028 appears in All cycles as Draft, with the standard dates.</li>
            <li>FY2024–2027 are flagged as still open.</li>
          </ul>
        </div>
        <div class="esa-card__footer typography-meta">
          <div class="cluster" data-gap="xs">
            <span
              class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
              ><a
                class="esa-button__native typography-microcopy-xs"
                href="/cb-fish-design/soy/cycles?step=1&amp;role=admin"
                role="button"
                ><span class="esa-button__label">Start at All cycles</span
                ><span class="esa-icon esa-icon--sm" aria-hidden="true">
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
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span> </a
            ></span>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div class="esa-card esa-card--outlined">
        <div class="esa-card__header">
          <div class="esa-card__header-content">
            <div class="esa-card__titles">
              <h3 class="esa-card__title typography-title-sm-strong">2. Set up the cycle</h3>
              <dl class="esa-card__meta">
                <div class="esa-card__meta-pair">
                  <dt>Demo date</dt>
                  <dd>Jan 15, 2027</dd>
                </div>
                <div class="esa-card__meta-pair">
                  <dt>Role</dt>
                  <dd>Budget administrator</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div class="esa-card__body typography-body-md">
          <ul class="cbf-soy-wt__points">
            <li>Confirm the pre-filled dates.</li>
            <li>
              Carry forward 230 items; 7 ended or ineligible items start unchecked, each with its
              reason.
            </li>
            <!-- …and 2 more like this (<li>) -->
          </ul>
        </div>
        <div class="esa-card__footer typography-meta">
          <div class="cluster" data-gap="xs">
            <span
              class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
              ><a
                class="esa-button__native typography-microcopy-xs"
                href="/cb-fish-design/soy/setup?step=2&amp;role=admin"
                role="button"
                ><span class="esa-button__label">Open the setup wizard</span
                ><span class="esa-icon esa-icon--sm" aria-hidden="true">
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
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span> </a
            ></span>
          </div>
        </div>
      </div>
    </li>
    <!-- …and 5 more like this (<li>) -->
  </ol>
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
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
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
.esa-button {
  --_btn-pad-y: var(--spacing-300, 0.75rem);
  --_btn-padding-x: var(--spacing-300, 0.75rem);
  --_btn-radius: var(--button-radius-md, 0.5rem);
  --_accent: var(--color-background-brand, #46a758);
  --_accent-hover: var(--color-background-brand-hover, #3e9b4f);
  --_on: var(--color-content-default-knockout, #fcfcfc);
  --_accent-text: var(--_accent);
  --_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);
  --_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);
  display: inline-block;
}
.esa-button--sm {
  --_btn-pad-y: var(--spacing-250, 0.625rem);
  --_btn-padding-x: var(--spacing-250, 0.625rem);
  --_btn-radius: var(--button-radius-sm, 4px);
}
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
}
.esa-button--variant-secondary {
  --_accent: var(--color-background-brand-muted);
  --_accent-hover: var(--color-background-brand-muted-hover);
  --_on: var(--color-content-on-brand-muted, var(--color-content-default));
  --_accent-text: var(--color-content-brand);
  --_accent-border: var(--color-border-default-strong, #bbbbbb);
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent-border, transparent);
}
.esa-button--appearance-fill .esa-button__native:hover:not(:disabled) {
  background: var(--_accent-hover);
}
.esa-button--appearance-fill.esa-button--active .esa-button__native {
  background: var(--_accent-hover);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button--appearance-dashed .esa-button__native {
  border-style: dashed;
}
.esa-button--appearance-outline .esa-button__native:hover:not(:disabled),
.esa-button--appearance-dashed .esa-button__native:hover:not(:disabled) {
  background: var(--_btn-tint-hover);
}
.esa-button--appearance-outline.esa-button--active .esa-button__native,
.esa-button--appearance-dashed.esa-button--active .esa-button__native {
  background: var(--_btn-tint-active);
}
.esa-button--appearance-soft .esa-button__native {
  background: color-mix(
    in srgb,
    var(--color-background-elevation-sunken, #f0f0f0) 45%,
    var(--color-background-elevation-raised, #fcfcfc)
  );
  color: var(--_accent-text);
  border-color: var(--color-border-default-strong, #bbbbbb);
}
.esa-button--appearance-soft .esa-button__native:hover:not(:disabled),
.esa-button--appearance-soft.esa-button--active .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent);
}
.esa-button--variant-ghost .esa-button__native {
  background: transparent;
  color: var(--color-content-default, #202020);
  border-color: transparent;
}
.esa-button--variant-ghost.esa-button--appearance-outline .esa-button__native,
.esa-button--variant-ghost.esa-button--appearance-dashed .esa-button__native {
  border-color: var(--color-border-default, #cecece);
}
.esa-button--variant-ghost .esa-button__native:hover:not(:disabled),
.esa-button--variant-ghost.esa-button--active .esa-button__native {
  background: var(--color-background-elevation-sunken, #f0f0f0);
}
.esa-button--variant-chrome .esa-button__native {
  background: transparent;
  color: inherit;
  border-color: transparent;
}
.esa-button--variant-chrome .esa-button__native:hover:not(:disabled),
.esa-button--variant-chrome.esa-button--active .esa-button__native,
.esa-button--variant-chrome.esa-button--current .esa-button__native {
  background: var(--button-chrome-bg-hover, color-mix(in srgb, currentColor 14%, transparent));
}
.esa-button--variant-chrome .esa-button__native:focus-visible {
  outline-color: currentColor;
}
.esa-button__native {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200, 8px);
  width: 100%;
  padding-block: var(--_btn-pad-y);
  padding-inline: var(--_btn-padding-x);
  border: var(--border-width-default, 1px) solid transparent;
  border-radius: var(--_btn-radius);
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--transition-fast, 0.15s ease),
    border-color var(--transition-fast, 0.15s ease);
  -webkit-appearance: none;
  appearance: none;
}
.esa-button__native:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
}
.esa-button--icon-only .esa-button__native {
  padding-inline: var(--_btn-pad-y);
  aspect-ratio: 1;
}
summary.esa-button {
  list-style: none;
  cursor: pointer;
}
summary.esa-button::-webkit-details-marker {
  display: none;
}
summary.esa-button:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
  border-radius: var(--_btn-radius);
}
.esa-button__label {
  white-space: nowrap;
}
.cbf-qa-icon .esa-button__native > .esa-icon:last-child {
  display: none;
}
.cbf-qa-icon .esa-button__native:after {
  content: "";
  flex: none;
  inline-size: 9px;
  block-size: 5px;
  background: currentColor;
  mask: var(--qa-down) center / contain no-repeat;
  transition: transform 0.15s ease;
}
.cbf-qa-icon details[open] > summary .esa-button__native:after {
  transform: rotate(180deg);
}
.cbf-qa-icon .esa-button__native:before,
.cbf-qa-icon__glyph {
  content: "";
  display: inline-block;
  flex: none;
  inline-size: var(--qa-w);
  block-size: var(--qa-h);
  background: currentColor;
  mask: var(--qa-icon) center / contain no-repeat;
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
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
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.stack[data-split] > [data-split] {
  margin-block-end: auto;
}
.cluster {
  --gap: var(--spacing-300, 0.75rem);
  --align: center;
  --justify: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: var(--justify);
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.esa-nav-dropdown[open] .esa-button__native > .esa-icon:last-child {
  transform: rotate(180deg);
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
.esa-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-100, 0.25rem) var(--spacing-500, 1.5rem);
  margin: var(--spacing-050, 0.125rem) 0 0;
}
.esa-card__meta-pair {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-100, 0.25rem);
  min-width: 0;
}
.esa-card__meta dt {
  font-size: var(--_card-meta-label-size);
  font-weight: var(--font-weight-medium, 500);
  color: var(--_card-meta-label-color);
}
.esa-card__meta dd {
  margin: 0;
  font-size: var(--_card-meta-value-size);
  color: inherit;
}
.esa-card--header-primary .esa-card__meta dt {
  color: #fffc;
}
.esa-card__body {
  padding: var(--_card-padding);
}
.esa-card__footer {
  padding: var(--spacing-300, 0.75rem) var(--_card-padding);
  border-top: var(--border-width-default, 1px) solid var(--_card-header-border);
  background: var(--color-background-elevation-sunken, #f0f0f0);
}
.cbf-soy-wt__h2 {
  margin: 0;
  font-family: var(--typography-font-family-display);
  font-weight: var(--typography-font-weight-semibold);
  font-size: var(--font-size-600, 24px);
  color: var(--color-background-default-knockout);
}
.cbf-soy-wt__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-400);
}
.cbf-soy-wt__steps > li {
  display: flex;
}
.cbf-soy-wt__steps > li > * {
  flex: 1;
}
.cbf-soy-wt__points {
  margin: 0;
  padding-inline-start: var(--spacing-500);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
  font-size: 14px;
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--button-chrome-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--button-radius-md` | `.5rem` | component |
| `--button-radius-sm` | `.25rem` | component |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-header-bg` | `transparent` | component |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-muted-hover` | `#1e5386` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-on-brand-muted` | `#203c25` | semantic |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--font-size-600` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | primitive |
| `--font-weight-medium` | `500` | component |
| `--gap` | `.75rem` | component |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-sm` | `16px` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-meta-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-meta-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-meta-font-weight` | `400` | semantic |
| `--typography-meta-letter-spacing` | `.01em` | semantic |
| `--typography-meta-line-height` | `1.6` | semantic |
| `--typography-microcopy-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-font-weight` | `500` | semantic |
| `--typography-microcopy-xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-line-height` | `1` | semantic |
| `--typography-title-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-title-sm-strong-font-size` | `clamp(.8125rem, .71rem + .5vw, 1.0625rem)` | semantic |
| `--typography-title-sm-strong-font-weight` | `600` | semantic |
| `--typography-title-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-title-sm-strong-line-height` | `1.6` | semantic |
