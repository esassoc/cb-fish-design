# Main

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **home** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/home/
- **Section element:** `<main>`
- **Components:** cbf-app-footer (spoke), cbf-home (spoke), cbf-program-impacts (spoke), cbf-program-overview (spoke), cbf-welcome-hero (spoke), esa-card (hub), esa-link-column (hub), esa-stat (hub)

## Markup (de-scoped, framework-free)
```html
<main class="cbf-home">
  <section class="cbf-welcome-hero">
    <img
      class="cbf-welcome-hero__img"
      src="/cb-fish-design/cbfish-homepage-hero.jpg"
      alt="The Columbia River at dawn, with basin mountains and sky mirrored in still water"
    />
    <div class="cbf-welcome-hero__scrim"></div>
    <div class="cbf-welcome-hero__inner">
      <p class="cbf-welcome-hero__eyebrow">Columbia Basin Fish &amp; Wildlife Program</p>
      <p class="cbf-welcome-hero__tagline">
        An unprecedented view into the region’s fish &amp; wildlife mitigation.
      </p>
    </div>
    <p class="cbf-welcome-hero__credit">Photo: Rob Meyers / BPA</p>
  </section>
  <div class="cbf-home__body">
    <section class="cbf-program-overview">
      <div class="cbf-program-overview__copy">
        <h1 class="type-page-title">Welcome to the Columbia Basin Fish &amp; Wildlife Program</h1>
        <p class="type-body cbf-program-overview__intro">
          The program is Bonneville Power Administration’s effort to protect, mitigate, and enhance
          the fish and wildlife affected by the hydroelectric dams on the Columbia River and its
          tributaries. Established under the Northwest Power Act of 1980, it funds work across a
          four-state region — Idaho, Montana, Oregon, and Washington.
        </p>
      </div>
      <ul class="cbf-program-overview__stats grid">
        <li>
          <div class="esa-card">
            <div class="esa-card__body">
              <div class="esa-stat">
                <div class="esa-stat__value">41</div>
                <div class="esa-stat__label">Funds</div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="esa-card">
            <div class="esa-card__body">
              <div class="esa-stat">
                <div class="esa-stat__value">301</div>
                <div class="esa-stat__label">Projects</div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="esa-card">
            <div class="esa-card__body">
              <div class="esa-stat">
                <div class="esa-stat__value">633</div>
                <div class="esa-stat__label">Contracts</div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="esa-card">
            <div class="esa-card__body">
              <div class="esa-stat">
                <div class="esa-stat__value">73,521</div>
                <div class="esa-stat__label">Work sites</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="cbf-program-impacts">
      <div class="cbf-program-impacts__head">
        <h2 class="type-section-title">Program impacts</h2>
        <p class="type-body cbf-program-impacts__lede">
          Funding invested in fish &amp; wildlife mitigation across the Columbia River Basin, fiscal
          years 2005–2026.
        </p>
      </div>
      <figure class="cbf-program-impacts__chart">
        <svg
          viewBox="0 0 720 240"
          role="img"
          aria-label="Bar chart of funded amount by fiscal year, rising from FY05 to FY26."
          preserveAspectRatio="xMidYMid meet"
        >
          <g>
            <rect
              x="8"
              y="101"
              width="72.25"
              height="111"
              rx="3"
              class="cbf-program-impacts__bar"
            ></rect>
            <text x="44.125" y="230" class="cbf-program-impacts__xlabel" text-anchor="middle">
              FY05
            </text>
          </g>
          <g>
            <rect
              x="98.25"
              y="85"
              width="72.25"
              height="127"
              rx="3"
              class="cbf-program-impacts__bar"
            ></rect>
            <text x="134.375" y="230" class="cbf-program-impacts__xlabel" text-anchor="middle">
              FY08
            </text>
          </g>
          <g>
            <rect
              x="188.5"
              y="70"
              width="72.25"
              height="142"
              rx="3"
              class="cbf-program-impacts__bar"
            ></rect>
            <text x="224.625" y="230" class="cbf-program-impacts__xlabel" text-anchor="middle">
              FY11
            </text>
          </g>
          <g>
            <rect
              x="278.75"
              y="56"
              width="72.25"
              height="156"
              rx="3"
              class="cbf-program-impacts__bar"
            ></rect>
            <text x="314.875" y="230" class="cbf-program-impacts__xlabel" text-anchor="middle">
              FY14
            </text>
          </g>
          <g>
            <rect
              x="369"
              y="46"
              width="72.25"
              height="166"
              rx="3"
              class="cbf-program-impacts__bar"
            ></rect>
            <text x="405.125" y="230" class="cbf-program-impacts__xlabel" text-anchor="middle">
              FY17
            </text>
          </g>
          <g>
            <rect
              x="459.25"
              y="35"
              width="72.25"
              height="177"
              rx="3"
              class="cbf-program-impacts__bar"
            ></rect>
            <text x="495.375" y="230" class="cbf-program-impacts__xlabel" text-anchor="middle">
              FY20
            </text>
          </g>
          <g>
            <rect
              x="549.5"
              y="27"
              width="72.25"
              height="185"
              rx="3"
              class="cbf-program-impacts__bar"
            ></rect>
            <text x="585.625" y="230" class="cbf-program-impacts__xlabel" text-anchor="middle">
              FY23
            </text>
          </g>
          <g>
            <rect
              x="639.75"
              y="16"
              width="72.25"
              height="196"
              rx="3"
              class="cbf-program-impacts__bar"
            ></rect>
            <text x="675.875" y="230" class="cbf-program-impacts__xlabel" text-anchor="middle">
              FY26
            </text>
          </g>
        </svg>
        <figcaption class="cbf-program-impacts__caption">
          Illustrative figures. <a href="#">Download raw data</a>
        </figcaption>
      </figure>
    </section>
  </div>
  <footer class="cbf-app-footer">
    <div class="cbf-app-footer__inner">
      <div class="cbf-app-footer__cols grid">
        <div class="esa-link-column">
          <span class="esa-link-column__head">Mitigation work</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li>Projects</li>
            <li>Contracts</li>
            <li>Portfolios</li>
            <li>Work elements</li>
            <li>Estuary program</li>
            <li>Tributary habitat</li>
            <li>Land acquisitions</li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head">Reporting</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li>Report Center</li>
            <li>Maps</li>
            <li>Publications</li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head">Funding</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li>Funds</li>
            <li>Fund budgets summary</li>
            <li>Long-term funding agreements</li>
            <li>Start-of-year (SOY) budgets</li>
            <li>Working budgets</li>
            <li>Budget change requests</li>
            <li>Expenditures</li>
            <li>Accruals</li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head">Help</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li>Help center</li>
            <li>Data dictionary</li>
            <li>EF&amp;W Program documents</li>
            <li>Request support</li>
            <li>Send feedback</li>
          </ul>
        </div>
      </div>
      <div class="cbf-app-footer__base">
        <span class="cbf-app-footer__org">
          Bonneville Power Administration · Columbia Basin Fish &amp; Wildlife Program
        </span>
        <a class="cbf-app-footer__policy" href="#">Website usage policy</a>
      </div>
    </div>
  </footer>
</main>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.esa-link-column {
  color: inherit;
}
.esa-link-column__head {
  display: block;
  margin: 0 0 var(--spacing-100, 4px);
  font-size: var(--link-column-heading-font-size, var(--type-size-200, 1rem));
  font-weight: var(--font-weight-medium, 500);
  color: inherit;
  text-decoration: none;
}
.esa-link-column__rule {
  height: 1px;
  border: 0;
  margin: 0 0 var(--spacing-200, 8px);
  background: var(--link-column-rule-color, color-mix(in srgb, currentColor 40%, transparent));
}
.esa-link-column__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.esa-link-column__list li {
  font-size: var(--link-column-item-font-size, var(--type-size-150, 0.875rem));
  line-height: 22px;
  margin-bottom: var(--spacing-100, 4px);
}
.esa-link-column__list a {
  color: inherit;
  text-decoration: none;
}
.type-page-title {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--type-size-600);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
.type-body {
  font-size: var(--type-size-200);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-normal);
}
.esa-card {
  --_card-bg: var(--card-bg, var(--color-surface, #ffffff));
  --_card-border: var(--card-border-color, var(--color-border, #e5e5e5));
  --_card-radius: var(--card-radius, var(--radius-300, 0.5rem));
  --_card-padding: var(--card-padding, var(--spacing-500, 1.5rem));
  --_card-header-bg: var(--card-header-bg, transparent);
  --_card-header-color: var(--card-header-color, var(--color-text-primary, #171717));
  --_card-header-border: var(--card-header-border-color, var(--color-border-light, #efefef));
  display: block;
  background: var(--_card-bg);
  border: 1px solid var(--_card-border);
  border-radius: var(--_card-radius);
  overflow: hidden;
}
.esa-card__body {
  padding: var(--_card-padding);
}
.esa-stat {
  --_stat-value-color: var(--stat-value-color, var(--color-text-primary, #171717));
  --_stat-value-font: var(
    --stat-value-font,
    var(--font-display, var(--font-sans, "DM Sans", sans-serif))
  );
  --_stat-value-size: var(--stat-value-size, var(--type-size-700, 2.25rem));
  --_stat-value-weight: var(--stat-value-weight, var(--font-weight-bold, 650));
  --_stat-label-color: var(--stat-label-color, var(--color-text-secondary, #525252));
  --_stat-label-size: var(--stat-label-size, var(--type-size-200, 0.9375rem));
  --_stat-label-weight: var(--stat-label-weight, var(--font-weight-medium, 450));
  --_stat-sub-color: var(--stat-sub-color, var(--color-text-muted, #737373));
  --_stat-sub-size: var(--stat-sub-size, var(--type-size-150, 0.875rem));
  --_stat-accent-color: var(--stat-accent-color, var(--color-secondary-strong, #3a7c59));
  --_stat-gap: var(--stat-gap, var(--spacing-050, 0.125rem));
  display: flex;
  flex-direction: column;
  gap: var(--_stat-gap);
  background: transparent;
}
.esa-stat__value {
  font-family: var(--_stat-value-font);
  font-size: var(--_stat-value-size);
  font-weight: var(--_stat-value-weight);
  line-height: var(--line-height-tight, 1.3);
  letter-spacing: var(--letter-spacing-tight, -0.01em);
  color: var(--_stat-value-color);
}
.esa-stat__label {
  font-size: var(--_stat-label-size);
  font-weight: var(--_stat-label-weight);
  line-height: var(--line-height-normal, 1.6);
  color: var(--_stat-label-color);
}
.type-section-title {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--type-size-500);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
}
.cbf-welcome-hero {
  position: relative;
  min-height: clamp(320px, 42vw, 520px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  isolation: isolate;
}
.cbf-welcome-hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
  z-index: -2;
}
.cbf-welcome-hero__scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--color-surface-inverse) 82%, transparent) 0%,
    color-mix(in srgb, var(--color-surface-inverse) 38%, transparent) 38%,
    transparent 72%
  );
}
.cbf-welcome-hero__inner {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: var(--spacing-800) var(--spacing-600);
  color: var(--color-text-inverse, #fff);
}
.cbf-welcome-hero__eyebrow {
  margin: 0 0 var(--spacing-200);
  font-family: var(--font-sans-condensed, var(--font-sans));
  font-size: 15px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold-200, #f3d99b);
}
.cbf-welcome-hero__tagline {
  margin: 0;
  max-width: 22ch;
  font-family: var(--font-display, var(--font-sans));
  font-size: clamp(28px, 4vw, 48px);
  font-weight: var(--font-weight-bold, 700);
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.cbf-welcome-hero__credit {
  position: absolute;
  right: var(--spacing-400);
  bottom: var(--spacing-200);
  margin: 0;
  font-size: 12px;
  color: color-mix(in srgb, var(--color-text-inverse, #fff) 75%, transparent);
}
.cbf-home__body {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-800) var(--spacing-600);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-800);
}
.cbf-program-overview {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-600);
}
.cbf-program-overview__copy {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-300);
  max-width: 70ch;
}
.cbf-program-overview__intro {
  color: var(--color-text-secondary);
  font-size: 18px;
  line-height: 1.6;
}
.cbf-program-overview__stats {
  list-style: none;
  margin: 0;
  padding: 0;
  --grid-min: 12rem;
}
.cbf-program-impacts {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-500);
}
.cbf-program-impacts__head {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-200);
  max-width: 70ch;
}
.cbf-program-impacts__lede {
  color: var(--color-text-secondary);
}
.cbf-program-impacts__chart {
  margin: 0;
  padding: var(--spacing-500);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-300);
  background: var(--color-surface);
}
.cbf-program-impacts__chart svg {
  width: 100%;
  height: auto;
  display: block;
}
.cbf-program-impacts__bar {
  fill: var(--color-primary);
}
.cbf-program-impacts__xlabel {
  fill: var(--color-text-muted);
  font-size: 12px;
  font-family: var(--font-sans);
}
.cbf-program-impacts__caption {
  margin-top: var(--spacing-300);
  font-size: 14px;
  color: var(--color-text-muted);
}
.cbf-app-footer {
  margin-top: var(--spacing-800);
  background: var(--color-surface-inverse);
  color: var(--color-text-inverse, #fff);
}
.cbf-app-footer__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-800) var(--spacing-600) var(--spacing-600);
}
.cbf-app-footer__cols {
  --grid-min: 12rem;
  gap: var(--spacing-700);
}
.cbf-app-footer__base {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-300);
  margin-top: var(--spacing-700);
  padding-top: var(--spacing-400);
  border-top: 1px solid color-mix(in srgb, var(--color-text-inverse, #fff) 22%, transparent);
  font-size: 14px;
}
.cbf-app-footer__org {
  color: color-mix(in srgb, var(--color-text-inverse, #fff) 82%, transparent);
}
.cbf-app-footer__policy {
  color: inherit;
  text-decoration: underline;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-header-bg` | `transparent` | component |
| `--card-header-border-color` | `#efefef` | component |
| `--card-header-color` | `#3d3d3d` | component |
| `--card-padding` | `1.5rem` | component |
| `--card-radius` | `.5rem` | component |
| `--color-border` | `#dcdcdc` | semantic |
| `--color-border-light` | `#efefef` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-secondary-strong` | `#2a7e3b` | semantic |
| `--color-surface` | `#fcfcfc` | semantic |
| `--color-surface-inverse` | `#13273e` | semantic |
| `--color-text-inverse` | `#fcfcfc` | semantic |
| `--color-text-muted` | `#7c7c7c` | semantic |
| `--color-text-primary` | `#3d3d3d` | semantic |
| `--color-text-secondary` | `#525252` | semantic |
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | primitive |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-bold` | `700` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--font-weight-regular` | `400` | primitive |
| `--font-weight-semibold` | `600` | primitive |
| `--letter-spacing-normal` | `.01em` | primitive |
| `--letter-spacing-tight` | `-.01em` | primitive |
| `--line-height-normal` | `1.6` | primitive |
| `--line-height-relaxed` | `1.8` | primitive |
| `--line-height-tight` | `1.3` | primitive |
| `--link-column-heading-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | component |
| `--link-column-item-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | component |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--radius-300` | `.5rem` | primitive |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--type-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |
| `--type-size-500` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | primitive |
| `--type-size-600` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | primitive |
| `--type-size-700` | `clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem)` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
