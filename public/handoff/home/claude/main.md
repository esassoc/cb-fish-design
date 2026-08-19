# Main

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **home** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/home/
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
        <h1 class="typography-heading-lg">
          Welcome to the Columbia Basin Fish &amp; Wildlife Program
        </h1>
        <p class="typography-body-md cbf-program-overview__intro">
          The program is Bonneville Power Administration’s effort to protect, mitigate, and enhance
          the fish and wildlife affected by the hydroelectric dams on the Columbia River and its
          tributaries. Established under the Northwest Power Act of 1980, it funds work across a
          four-state region — Idaho, Montana, Oregon, and Washington.
        </p>
      </div>
      <ul class="cbf-program-overview__stats grid">
        <li>
          <div class="esa-card">
            <div class="esa-card__body typography-body-md">
              <div class="esa-stat">
                <div class="esa-stat__value typography-display-sm">41</div>
                <div class="esa-stat__label typography-label-md">Funds</div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="esa-card">
            <div class="esa-card__body typography-body-md">
              <div class="esa-stat">
                <div class="esa-stat__value typography-display-sm">301</div>
                <div class="esa-stat__label typography-label-md">Projects</div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="esa-card">
            <div class="esa-card__body typography-body-md">
              <div class="esa-stat">
                <div class="esa-stat__value typography-display-sm">633</div>
                <div class="esa-stat__label typography-label-md">Contracts</div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="esa-card">
            <div class="esa-card__body typography-body-md">
              <div class="esa-stat">
                <div class="esa-stat__value typography-display-sm">73,521</div>
                <div class="esa-stat__label typography-label-md">Work sites</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="cbf-program-impacts">
      <div class="cbf-program-impacts__head">
        <h2 class="typography-heading-md">Program impacts</h2>
        <p class="typography-body-md cbf-program-impacts__lede">
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
          <span class="esa-link-column__head typography-label-md">Mitigation work</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li class="typography-body-sm">Projects</li>
            <li class="typography-body-sm">Contracts</li>
            <li class="typography-body-sm">Portfolios</li>
            <li class="typography-body-sm">
              <a href="/cb-fish-design/legacy/sow">Work elements</a>
            </li>
            <li class="typography-body-sm">Estuary program</li>
            <li class="typography-body-sm">Tributary habitat</li>
            <li class="typography-body-sm">Land acquisitions</li>
            <li class="typography-body-sm">
              <a href="/cb-fish-design/rme-reporting">RM&amp;E reporting</a>
            </li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head typography-label-md">Reporting</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li class="typography-body-sm">Report Center</li>
            <li class="typography-body-sm">Maps</li>
            <li class="typography-body-sm">Publications</li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head typography-label-md">Funding</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li class="typography-body-sm">Funds</li>
            <li class="typography-body-sm">Fund budgets summary</li>
            <li class="typography-body-sm">Long-term funding agreements</li>
            <li class="typography-body-sm">
              <a href="/cb-fish-design/project-budgets">Project budgets</a>
            </li>
            <li class="typography-body-sm">Working budgets</li>
            <li class="typography-body-sm">Expenditures</li>
            <li class="typography-body-sm">Accruals</li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head typography-label-md">Help</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li class="typography-body-sm">Help center</li>
            <li class="typography-body-sm">Data dictionary</li>
            <li class="typography-body-sm">EF&amp;W Program documents</li>
            <li class="typography-body-sm">Request support</li>
            <li class="typography-body-sm">Send feedback</li>
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
.esa-card__body {
  padding: var(--_card-padding);
}
.esa-stat {
  --_stat-value-color: var(--stat-value-color, var(--color-content-default, #202020));
  --_stat-value-font: var(
    --typography-font-family-display,
    var(
      --typography-display-sm-font-family,
      var(--typography-font-family-display, "DM Sans", sans-serif)
    )
  );
  --_stat-value-size: var(
    --stat-value-size,
    var(--typography-display-sm-font-size, var(--font-size-700, 2.25rem))
  );
  --_stat-value-weight: var(
    --typography-font-weight-bold,
    var(--typography-display-sm-font-weight, var(--typography-font-weight-bold, 650))
  );
  --_stat-label-color: var(--color-content-default-secondary, #646464);
  --_stat-label-size: var(
    --font-size-200,
    var(--typography-label-md-font-size, var(--font-size-200, 0.9375rem))
  );
  --_stat-label-weight: var(
    --typography-font-weight-medium,
    var(--typography-label-md-font-weight, var(--typography-font-weight-medium, 500))
  );
  --_stat-sub-color: var(--color-content-default-secondary, #646464);
  --_stat-sub-size: var(
    --font-size-150,
    var(--typography-body-sm-font-size, var(--font-size-150, 0.875rem))
  );
  --_stat-accent-color: var(--stat-accent-color, var(--color-content-brand, #2a7e3b));
  --_stat-gap: var(--spacing-050, 0.125rem);
  display: flex;
  flex-direction: column;
  gap: var(--_stat-gap);
  background: transparent;
}
.esa-stat__value {
  font-family: var(--_stat-value-font);
  font-size: var(--_stat-value-size);
  font-weight: var(--_stat-value-weight);
  color: var(--_stat-value-color);
}
.esa-stat__label {
  font-size: var(--_stat-label-size);
  font-weight: var(--_stat-label-weight);
  color: var(--_stat-label-color);
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
    color-mix(in srgb, var(--color-background-default-knockout) 82%, transparent) 0%,
    color-mix(in srgb, var(--color-background-default-knockout) 38%, transparent) 38%,
    transparent 72%
  );
}
.cbf-welcome-hero__inner {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: var(--spacing-800) var(--spacing-600);
  color: var(--color-content-default-knockout, #fff);
}
.cbf-welcome-hero__eyebrow {
  margin: 0 0 var(--spacing-200);
  font-family: var(--font-sans-condensed, var(--typography-font-family-sans));
  font-size: 15px;
  font-weight: var(--typography-font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cbf-gold-200, #f3d99b);
}
.cbf-welcome-hero__tagline {
  margin: 0;
  max-width: 22ch;
  font-family: var(--typography-font-family-display, var(--typography-font-family-sans));
  font-size: clamp(28px, 4vw, 48px);
  font-weight: var(--typography-font-weight-bold, 700);
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.cbf-welcome-hero__credit {
  position: absolute;
  right: var(--spacing-400);
  bottom: var(--spacing-200);
  margin: 0;
  font-size: 12px;
  color: color-mix(in srgb, var(--color-content-default-knockout, #fff) 75%, transparent);
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
  color: var(--color-content-default-secondary);
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
  color: var(--color-content-default-secondary);
}
.cbf-program-impacts__chart {
  margin: 0;
  padding: var(--spacing-500);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-300);
  background: var(--color-background-elevation-raised);
}
.cbf-program-impacts__chart svg {
  width: 100%;
  height: auto;
  display: block;
}
.cbf-program-impacts__bar {
  fill: var(--color-background-brand);
}
.cbf-program-impacts__xlabel {
  fill: var(--color-content-default-tertiary);
  font-size: 12px;
  font-family: var(--typography-font-family-sans);
}
.cbf-program-impacts__caption {
  margin-top: var(--spacing-300);
  font-size: 14px;
  color: var(--color-content-default-tertiary);
}
.cbf-app-footer {
  margin-top: var(--spacing-800);
  background: var(--color-background-default-knockout);
  color: var(--color-content-default-knockout, #fff);
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
  border-top: 1px solid
    color-mix(in srgb, var(--color-content-default-knockout, #fff) 22%, transparent);
  font-size: 14px;
}
.cbf-app-footer__org {
  color: color-mix(in srgb, var(--color-content-default-knockout, #fff) 82%, transparent);
}
.cbf-app-footer__policy {
  color: inherit;
  text-decoration: underline;
}
.esa-link-column {
  color: inherit;
}
.esa-link-column__head {
  display: block;
  margin: 0 0 var(--spacing-100, 4px);
  font-size: var(--typography-label-md-font-size);
  color: inherit;
  text-decoration-color: transparent;
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
  font-size: var(--font-size-150, var(--typography-body-sm-font-size));
  margin-bottom: var(--spacing-100, 4px);
}
.esa-link-column__list a {
  color: inherit;
  text-decoration-color: transparent;
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-heading-lg {
  font-family: var(--typography-heading-lg-font-family);
  font-size: var(--typography-heading-lg-font-size);
  font-weight: var(--typography-heading-lg-font-weight);
  line-height: var(--typography-heading-lg-line-height);
  letter-spacing: var(--typography-heading-lg-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-display-sm {
  font-family: var(--typography-display-sm-font-family);
  font-size: var(--typography-display-sm-font-size);
  font-weight: var(--typography-display-sm-font-weight);
  line-height: var(--typography-display-sm-line-height);
  letter-spacing: var(--typography-display-sm-letter-spacing);
}
.typography-heading-md {
  font-family: var(--typography-heading-md-font-family);
  font-size: var(--typography-heading-md-font-size);
  font-weight: var(--typography-heading-md-font-weight);
  line-height: var(--typography-heading-md-line-height);
  letter-spacing: var(--typography-heading-md-letter-spacing);
}
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-header-bg` | `transparent` | component |
| `--cbf-gold-200` | `#f3d99b` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--font-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--font-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |
| `--font-size-700` | `clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem)` | primitive |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--radius-300` | `.5rem` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--stat-accent-color` | `#1e5386` | component |
| `--stat-value-color` | `#3d3d3d` | component |
| `--stat-value-size` | `clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem)` | component |
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
| `--typography-display-sm-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-display-sm-font-size` | `clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem)` | semantic |
| `--typography-display-sm-font-weight` | `700` | semantic |
| `--typography-display-sm-letter-spacing` | `-.01em` | semantic |
| `--typography-display-sm-line-height` | `1.3` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-bold` | `700` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-heading-lg-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-heading-lg-font-size` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | semantic |
| `--typography-heading-lg-font-weight` | `600` | semantic |
| `--typography-heading-lg-letter-spacing` | `-.01em` | semantic |
| `--typography-heading-lg-line-height` | `1.3` | semantic |
| `--typography-heading-md-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-heading-md-font-size` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | semantic |
| `--typography-heading-md-font-weight` | `600` | semantic |
| `--typography-heading-md-letter-spacing` | `-.01em` | semantic |
| `--typography-heading-md-line-height` | `1.3` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
