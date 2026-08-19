# Main

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **rme-work-elements** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/rme-reporting/
- **Section element:** `<main>`
- **Components:** cbf-app-panel (spoke), cbf-page (spoke), cbf-page-heading (spoke), cbf-report-intro (spoke), cbf-report-tabs (spoke), esa-breadcrumbs (hub), esa-container (hub)

## Markup (de-scoped, framework-free)
```html
<main class="cbf-page">
  <div class="esa-container typography-body-md" style="--_container-max: 1920px">
    <section class="cbf-app-panel">
      <div class="cbf-app-panel__crumb">
        <nav class="esa-breadcrumbs esa-breadcrumbs--md" aria-label="Breadcrumb">
          <ol class="esa-breadcrumbs__list">
            <li class="esa-breadcrumbs__item">
              <a href="/cb-fish-design/home" class="esa-breadcrumbs__link typography-body-md">
                <span class="esa-breadcrumbs__icon"
                  ><svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <path d="M9 22V12h6v10"></path></svg
                ></span>
                Home
              </a>
              <svg
                class="esa-breadcrumbs__separator"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li class="esa-breadcrumbs__item">
              <span class="esa-breadcrumbs__current typography-label-md"> Mitigation work </span>
              <svg
                class="esa-breadcrumbs__separator"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li class="esa-breadcrumbs__item" aria-current="page">
              <span class="esa-breadcrumbs__current typography-label-md"> RM&amp;E reporting </span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="cbf-app-panel__body">
        <div class="cbf-app-panel__content">
          <h1 class="cbf-page-heading">RM&amp;E reporting: Summary</h1>
          <nav class="cbf-report-tabs" aria-label="RM&amp;E reporting sections">
            <a
              class="cbf-report-tabs__tab is-active"
              href="/cb-fish-design/rme-reporting"
              aria-current="page"
              >Summary</a
            ><a class="cbf-report-tabs__tab" href="/cb-fish-design/rme-work-elements"
              >Work statement elements</a
            ><a class="cbf-report-tabs__tab" href="/cb-fish-design/rme-contract-reports"
              >Contracts</a
            ><a class="cbf-report-tabs__tab" href="/cb-fish-design/rme-priorities"
              >Manage priorities</a
            >
          </nav>
          <section class="cbf-report-intro">
            <figure class="cbf-report-intro__media">
              <img
                src="/cb-fish-design/project-budgets-hero.jpg"
                alt="A Columbia River Gorge stream in autumn"
                loading="lazy"
              />
            </figure>
            <div class="cbf-report-intro__copy">
              <p class="cbf-report-intro__lede">
                Research, monitoring, and evaluation (RM&amp;E) is the process by which BPA assesses
                whether Fish &amp; Wildlife Program investments are achieving their intended
                biological outcomes.
              </p>
              <p class="cbf-report-intro__body">
                BPA funds RM&amp;E activities across the Columbia River Basin to track the status
                and trends of fish and wildlife populations, measure the effectiveness of habitat
                and other restoration actions, and evaluate overall program performance. Data
                collected through RM&amp;E contractual work efforts informs investment decisions and
                supports adaptive management: the iterative process of implementing actions,
                evaluating results, and making adjustments based on what the data show. BPA's
                RM&amp;E approach is guided by the Northwest Power and Conservation Council's Fish
                &amp; Wildlife Program and involves collaborations with fish and wildlife managers,
                project sponsors, NOAA Fisheries, and other regional partners.
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</main>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.cbf-page {
  padding-block: var(--spacing-600) var(--spacing-800);
}
.esa-container {
  width: 100%;
  max-width: var(--_container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--spacing-600, 2rem);
}
.cbf-app-panel {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  overflow: clip;
  background: var(--color-background-elevation-raised);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--color-background-default-knockout) 8%, transparent);
}
.cbf-app-panel__crumb {
  background: var(--cbf-surface-crumb);
  border-bottom: 1px solid var(--color-border-default);
  padding: var(--spacing-400) var(--spacing-600);
}
.esa-breadcrumbs {
  --_crumb-link-color: var(--breadcrumbs-link-color, #646464);
  --_crumb-link-hover: var(--breadcrumbs-link-hover, #202020);
  --_crumb-current-color: var(--color-content-default, #202020);
  --_crumb-separator-color: var(--color-border-default-strong, #bbbbbb);
  --_crumb-gap: var(--spacing-200, 8px);
  display: block;
  background: var(--breadcrumbs-bg, transparent);
}
.cbf-app-panel__crumb .esa-breadcrumbs {
  --breadcrumbs-link-color: var(--color-content-default-secondary);
  --breadcrumbs-link-hover: var(--color-background-brand);
}
.esa-breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--_crumb-gap);
  list-style: none;
  margin: 0;
  padding: 0;
}
.esa-breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: var(--_crumb-gap);
}
.esa-breadcrumbs__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  color: var(--_crumb-link-color);
  text-decoration-color: transparent;
}
.esa-breadcrumbs__icon {
  display: inline-flex;
  align-items: center;
}
.esa-breadcrumbs__separator {
  flex-shrink: 0;
  color: var(--_crumb-separator-color);
}
.esa-breadcrumbs__current {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  color: var(--_crumb-current-color);
}
.cbf-app-panel__body {
  flex: 1;
}
.cbf-app-panel__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
  padding: var(--spacing-600);
}
.cbf-page-heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-300, 12px);
  margin: 0;
  font-family: var(--typography-font-family-display);
  font-weight: var(--typography-font-weight-medium);
  font-size: 40px;
  line-height: 40px;
  letter-spacing: -1px;
  color: var(--color-background-default-knockout);
}
.cbf-report-tabs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-100);
  padding: var(--spacing-150);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-200, 8px);
  background: var(--color-gray-3);
}
.cbf-report-tabs__tab {
  padding: var(--spacing-200) var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-background-brand);
  font-size: 16px;
  font-weight: var(--typography-font-weight-medium);
  white-space: nowrap;
}
.cbf-report-tabs__tab.is-active {
  background: var(--color-background-elevation-raised, #fff);
  color: var(--color-background-default-knockout);
  font-weight: var(--typography-font-weight-semibold);
  box-shadow: 0 1px 2px
    color-mix(in srgb, var(--color-background-default-knockout) 12%, transparent);
}
.cbf-report-intro {
  display: grid;
  grid-template-columns: minmax(280px, 38%) 1fr;
  gap: var(--spacing-700, 2.5rem);
  align-items: stretch;
}
.cbf-report-intro__media {
  margin: 0;
  align-self: start;
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-100);
  overflow: hidden;
  background: var(--color-background-elevation-sunken);
}
.cbf-report-intro__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
}
.cbf-report-intro__copy {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
  justify-content: center;
  min-width: 0;
}
.cbf-report-intro__lede {
  margin: 0;
  font-size: 24px;
  line-height: 1.4;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
}
.cbf-report-intro__body {
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-content-default-secondary);
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--breadcrumbs-bg` | `transparent` | component |
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#3d3d3d` | component |
| `--cbf-surface-crumb` | `#f4f4f4` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-gray-3` | `#f0f0f0` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
