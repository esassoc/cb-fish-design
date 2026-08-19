# Genetics laboratory analysis

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **lib-entry** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/lib-entry/
- **Section element:** `<esa-side-dialog>`
- **Components:** cbf-lss (spoke), esa-alert-box (hub), esa-card (hub)

## Markup (de-scoped, framework-free)
```html
<esa-side-dialog
  data-subcontract-sheet="true"
  size="lg"
  position="right"
  heading="Subcontract sheet"
  show-close-button="true"
>
  <div class="cbf-lss stack" data-gap="lg" data-sheet="sub-sheet-1" hidden="">
    <header class="cbf-lss__head stack" data-gap="sm">
      <div class="repel" data-gap="md">
        <div class="stack" data-gap="3xs">
          <h2 class="cbf-lss__title typography-title">Genetics laboratory analysis</h2>
          <p class="cbf-lss__meta typography-body-sm">
            Subcontractor — competitively selected · Contract CR-411206 · FY2027
          </p>
        </div>
        <div class="cbf-lss__total stack" data-gap="3xs">
          <span class="cbf-lss__total-value">$28,000</span>
          <span class="cbf-lss__meta typography-body-sm">Subcontract total</span>
        </div>
      </div>
    </header>
    <div class="esa-card esa-card--filled">
      <div class="esa-card__body typography-body-md">
        <div class="stack" data-gap="sm">
          <p class="cbf-lss__lede typography-body-md">
            Carried on the LIB as a single lump-sum line —
            <strong>Genetics laboratory analysis</strong> at $28,000. The itemized detail lives
            here, on the subcontract's own sheet.
          </p>
          <div class="stack" data-gap="2xs">
            <h3 class="cbf-lss__h3 typography-body-md">Work elements the parent line is tied to</h3>
            <dl class="cbf-lss__rows stack" data-gap="2xs">
              <div class="cbf-lss__row repel" data-gap="sm">
                <dt class="typography-body-md">
                  B. 157 Collect/Generate/Validate Field and Lab Data
                </dt>
                <dd class="cbf-lss__num typography-body-md">100%</dd>
              </div>
            </dl>
            <p class="cbf-lss__meta typography-body-sm">
              1 of the 6 work elements on this contract's SOW.
            </p>
          </div>
        </div>
      </div>
    </div>
    <section class="stack" data-gap="sm">
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
          <strong class="esa-alert-box__title typography-label-sm-strong"
            >This sheet runs under different rules</strong
          >
          <div class="esa-alert-box__message">
            <ul class="cbf-lss__rules stack" data-gap="2xs">
              <li class="typography-body-md">
                No indirect rate is applied on a subcontract sheet.
              </li>
              <li class="typography-body-md">
                No lump-sum or contingency lines are permitted — every line itemizes.
              </li>
              <li class="typography-body-md">
                State tax on construction is a percentage of items 1–3.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p class="cbf-lss__meta typography-body-sm">
        The state tax on construction is the same percentage-of-a-base shape as fringe and indirect
        on the parent LIB — it just sits down here, on the sub-sheet, computed off items 1–3 rather
        than off anything in the grid above. It is entered and resolved on the full sheet, not on
        this summary.
      </p>
    </section>
    <section class="stack" data-gap="sm">
      <div class="stack" data-gap="3xs">
        <h3 class="cbf-lss__h3 typography-body-md">The category set, run again</h3>
        <p class="cbf-lss__meta typography-body-sm">
          Summary only — the full category set opens in the subcontract's own sheet. No line detail,
          quantities, or rates are carried here, and nothing on this panel is editable.
        </p>
      </div>
      <div class="esa-card esa-card--filled">
        <div class="esa-card__body typography-body-md">
          <div class="stack" data-gap="sm">
            <dl class="cbf-lss__rows stack" data-gap="2xs">
              <div class="cbf-lss__row repel" data-gap="sm">
                <dt class="typography-body-md">Personnel — Salary</dt>
                <dd class="cbf-lss__num typography-body-md">$16,800</dd>
              </div>
              <div class="cbf-lss__row repel" data-gap="sm">
                <dt class="typography-body-md">Personnel — Fringe</dt>
                <dd class="cbf-lss__num typography-body-md">$4,620</dd>
              </div>
              <div class="cbf-lss__row repel" data-gap="sm">
                <dt class="typography-body-md">Supplies &amp; Equipment</dt>
                <dd class="cbf-lss__num typography-body-md">$5,180</dd>
              </div>
              <div class="cbf-lss__row repel" data-gap="sm">
                <dt class="typography-body-md">Travel</dt>
                <dd class="cbf-lss__num typography-body-md">$1,400</dd>
              </div>
              <div class="cbf-lss__row cbf-lss__row--total repel" data-gap="sm">
                <dt class="typography-body-md">Subtotal — 4 categories</dt>
                <dd class="cbf-lss__num typography-body-md">$28,000</dd>
              </div>
            </dl>
            <p class="cbf-lss__meta typography-body-sm">
              Ties to the $28,000 lump carried on the LIB. No indirect is added on top.
            </p>
          </div>
        </div>
      </div>
      <p class="cbf-lss__meta typography-body-sm">
        The full subcontract entry sheet is a separate screen and is not part of this prototype.
      </p>
    </section>
  </div>
</esa-side-dialog>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
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
.cbf-lct__grab > .stack {
  flex: 1;
  min-width: 0;
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-title {
  font-family: var(--typography-title-font-family);
  font-size: var(--typography-title-font-size);
  font-weight: var(--typography-title-font-weight);
  line-height: var(--typography-title-line-height);
  letter-spacing: var(--typography-title-letter-spacing);
}
.esa-card {
  --_card-bg: var(--card-bg, var(--color-background-elevation-raised, #fcfcfc));
  --_card-border: var(--card-border-color, var(--color-border-default, #cecece));
  --_card-radius: var(--radius-md, 0.5rem);
  --_card-padding: var(--spacing-500, 1.5rem);
  --_card-header-bg: var(--card-header-bg, transparent);
  --_card-header-color: var(--color-content-default, #202020);
  --_card-header-border: var(--color-border-default-subtle, #d9d9d9);
  display: block;
  background: var(--_card-bg);
  border: var(--border-width-default, 1px) solid var(--_card-border);
  border-radius: var(--_card-radius);
  overflow: hidden;
}
.esa-card--filled {
  --_card-bg: var(--color-background-elevation-sunken, #f0f0f0);
  --_card-border: transparent;
}
.esa-card__body {
  padding: var(--_card-padding);
}
.esa-card--outlined {
  --_card-border: var(--color-border-default, #cecece);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-header-bg` | `transparent` | component |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-title-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-title-font-size` | `clamp(1rem, .88rem + .6vw, 1.25rem)` | semantic |
| `--typography-title-font-weight` | `500` | semantic |
| `--typography-title-letter-spacing` | `.01em` | semantic |
| `--typography-title-line-height` | `1.6` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
