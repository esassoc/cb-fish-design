# Main

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **project-budgets** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/project-budgets/
- **Section element:** `<main>`
- **Components:** cbf-app-panel (spoke), cbf-page (spoke), cbf-page-heading (spoke), cbf-related-items (spoke), cbf-report-intro (spoke), cbf-report-tabs (spoke), esa-breadcrumbs (hub), esa-button (hub), esa-card (hub), esa-container (hub)

## Markup (de-scoped, framework-free)
```html
<main class="cbf-page">
  <div class="esa-container" style="--_container-max: 1920px">
    <section class="cbf-app-panel">
      <div class="cbf-app-panel__crumb">
        <nav class="esa-breadcrumbs esa-breadcrumbs--md" aria-label="Breadcrumb">
          <ol class="esa-breadcrumbs__list">
            <li class="esa-breadcrumbs__item">
              <a href="/cb-fish-design/home" class="esa-breadcrumbs__link">
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
              <span class="esa-breadcrumbs__current"> Funding </span>
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
              <span class="esa-breadcrumbs__current"> Project budgets </span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="cbf-app-panel__body">
        <div class="cbf-app-panel__content">
          <h1 class="cbf-page-heading">Project budgets: Summary</h1>
          <nav class="cbf-report-tabs" aria-label="Project budget sections">
            <a class="cbf-report-tabs__tab is-active" href="#" aria-current="page">Summary</a
            ><a class="cbf-report-tabs__tab" href="#">Baselines</a
            ><a class="cbf-report-tabs__tab" href="#">Start-of-year (SOY)</a
            ><a class="cbf-report-tabs__tab" href="#">Decisions</a
            ><a class="cbf-report-tabs__tab" href="#">Change requests (BOG)</a>
            <details class="cbf-report-tabs__related">
              <summary class="cbf-report-tabs__tab cbf-report-tabs__related-trigger">
                Related items<span class="cbf-report-tabs__chev"
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
                    <path d="m6 9 6 6 6-6"></path></svg
                ></span>
              </summary>
              <div class="cbf-report-tabs__menu" role="menu">
                <a class="cbf-report-tabs__menu-item" role="menuitem" href="#">Reviews</a
                ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#">Featured reviews</a>
              </div>
            </details>
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
                BPA financial analysts manage budgets at a project level by fiscal year and fund.
              </p>
              <p class="cbf-report-intro__body">
                Every year, project budgets are set for the majority of the F&amp;W Program through
                the start-of-year (SOY) process, in which financial analysts and project managers
                discuss project budget needs and finalize budgets for the fiscal year. Throughout
                the year, budget decisions and transfers are documented to track funding changes to
                project working budgets.
              </p>
            </div>
          </section>
          <section class="cbf-related-items" id="related-items" aria-label="Related items">
            <h2 class="cbf-related-items__head type-section-title">Related items</h2>
            <div class="cbf-related-items__grid grid">
              <div class="esa-card esa-card--outlined">
                <div class="esa-card__header">
                  <div class="esa-card__header-content">
                    <div class="esa-card__titles"><h3 class="esa-card__title">Reviews</h3></div>
                  </div>
                </div>
                <div class="esa-card__body">
                  <div class="cbf-related-items__card">
                    <p class="cbf-related-items__overview">
                      <strong>Overview:</strong> Review project budgets across fiscal years and
                      funds — open a working budget to inspect its baseline, start-of-year amount,
                      and the decisions and transfers applied through the year.
                    </p>
                  </div>
                </div>
                <div class="esa-card__footer">
                  <div class="cbf-related-items__foot">
                    <span
                      class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--sm"
                    >
                      <a class="esa-button__native" href="#" role="button">
                        <span class="esa-button__label"> View page </span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div class="esa-card esa-card--outlined">
                <div class="esa-card__header">
                  <div class="esa-card__header-content">
                    <div class="esa-card__titles">
                      <h3 class="esa-card__title">Featured reviews</h3>
                    </div>
                  </div>
                </div>
                <div class="esa-card__body">
                  <div class="cbf-related-items__card">
                    <p class="cbf-related-items__overview">
                      <strong>Overview:</strong> Curated budget reviews highlighted for quick access
                      — the project budget views financial analysts and project managers return to
                      most often.
                    </p>
                  </div>
                </div>
                <div class="esa-card__footer">
                  <div class="cbf-related-items__foot">
                    <span
                      class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--sm"
                    >
                      <a class="esa-button__native" href="#" role="button">
                        <span class="esa-button__label"> View page </span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
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
.cbf-report-tabs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-100);
  padding: var(--spacing-150);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-200, 8px);
  background: var(--color-gray-50, #f4f5f7);
}
.cbf-report-tabs__tab {
  padding: var(--spacing-200) var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-primary);
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}
.cbf-report-tabs__tab.is-active {
  background: var(--color-surface, #fff);
  color: var(--color-surface-inverse);
  font-weight: var(--font-weight-semibold);
  box-shadow: 0 1px 2px color-mix(in srgb, var(--color-surface-inverse) 12%, transparent);
}
.cbf-report-tabs__related {
  position: relative;
  margin-left: auto;
}
.cbf-report-tabs__related-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150);
  list-style: none;
  cursor: pointer;
}
.cbf-report-tabs__chev {
  display: inline-flex;
  transition: transform 0.12s ease;
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
  background: var(--color-surface-sunken);
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
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
.cbf-report-intro__body {
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}
.cbf-related-items {
  padding-top: var(--spacing-600);
  border-top: 1px solid var(--color-border);
}
.cbf-related-items__head {
  margin: 0 0 var(--spacing-400);
}
.cbf-related-items__grid {
  --grid-min: 20rem;
}
.cbf-related-items__card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-300);
}
.cbf-related-items__overview {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
.cbf-related-items__overview strong,
.cbf-related-items__meta strong {
  color: var(--color-text-primary);
}
.cbf-related-items__foot {
  display: flex;
  justify-content: flex-end;
}
.esa-button {
  --_btn-height: var(--form-height-md, 40px);
  --_btn-padding-x: var(--form-padding-x-md, 16px);
  --_btn-font-size: var(--form-font-size-md, 14px);
  --_btn-radius: var(--form-radius-md, 6px);
  --_accent: var(--color-primary, #46a758);
  --_accent-hover: var(--color-primary-hover, #3e9b4f);
  --_on: var(--color-text-inverse, #ffffff);
  --_accent-text: var(--_accent);
  --_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);
  --_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);
  display: inline-block;
}
.esa-button--sm {
  --_btn-height: var(--form-height-sm, 32px);
  --_btn-padding-x: var(--form-padding-x-sm, 12px);
  --_btn-font-size: var(--form-font-size-sm, 12px);
  --_btn-radius: var(--form-radius-sm, 4px);
}
.esa-button--color-primary {
  --_accent-text: var(--color-primary-strong);
}
.esa-button__native {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200, 8px);
  width: 100%;
  height: var(--_btn-height);
  padding-inline: var(--_btn-padding-x);
  border: 1px solid transparent;
  border-radius: var(--_btn-radius);
  font-size: var(--_btn-font-size);
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: var(--font-weight-medium, 500);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--transition-fast, 0.15s ease),
    border-color var(--transition-fast, 0.15s ease);
  -webkit-appearance: none;
  appearance: none;
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: transparent;
}
.esa-button__label {
  white-space: nowrap;
}
.esa-container {
  width: 100%;
  max-width: var(--_container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--container-gutter, var(--spacing-600, 2rem));
}
.type-section-title {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--type-size-500);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
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
.esa-card--outlined {
  --_card-border: var(--color-border, #e5e5e5);
}
.esa-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-400, 1rem) var(--_card-padding);
  background: var(--_card-header-bg);
  color: var(--_card-header-color);
  border-bottom: 1px solid var(--_card-header-border);
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
  font-size: var(--type-size-250, 1.0625rem);
  font-weight: 600;
  margin: 0;
  color: inherit;
  font-family: var(--font-sans, "DM Sans", sans-serif);
}
.esa-card__body {
  padding: var(--_card-padding);
}
.esa-card__footer {
  padding: var(--spacing-300, 0.75rem) var(--_card-padding);
  border-top: 1px solid var(--_card-header-border);
  background: var(--card-footer-bg, var(--color-surface-sunken, #efefef));
}
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
}
.cbf-app-panel {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--color-surface-inverse) 8%, transparent);
}
.cbf-app-panel__crumb {
  background: var(--color-gold-50);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-400) var(--spacing-600);
}
.esa-breadcrumbs {
  --_crumb-font-size: var(--type-size-200, 0.875rem);
  --_crumb-link-color: var(--breadcrumbs-link-color, #43608a);
  --_crumb-link-hover: var(--breadcrumbs-link-hover, #39506f);
  --_crumb-current-color: var(--color-text-primary, #171717);
  --_crumb-separator-color: var(--breadcrumbs-separator-color, #737373);
  --_crumb-gap: var(--spacing-200, 8px);
  display: block;
}
.cbf-app-panel__crumb .esa-breadcrumbs {
  --breadcrumbs-link-color: var(--color-text-secondary);
  --breadcrumbs-link-hover: var(--color-primary);
}
.esa-breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--_crumb-gap);
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--_crumb-font-size);
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
  text-decoration: none;
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
  font-weight: var(--font-weight-medium, 500);
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
  font-family: var(--font-display);
  font-weight: var(--font-weight-medium);
  font-size: 40px;
  line-height: 40px;
  letter-spacing: -1px;
  color: var(--color-surface-inverse);
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#3d3d3d` | component |
| `--breadcrumbs-separator-color` | `#bbbbbb` | component |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-footer-bg` | `#f3f7fc` | component |
| `--card-header-bg` | `transparent` | component |
| `--card-header-border-color` | `#efefef` | component |
| `--card-header-color` | `#3d3d3d` | component |
| `--card-padding` | `1.5rem` | component |
| `--card-radius` | `.5rem` | component |
| `--color-border` | `#dcdcdc` | semantic |
| `--color-border-light` | `#efefef` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-hover` | `#1a4570` | semantic |
| `--color-primary-strong` | `#2a7e3b` | semantic |
| `--color-surface` | `#fcfcfc` | semantic |
| `--color-surface-inverse` | `#13273e` | semantic |
| `--color-surface-sunken` | `#f3f7fc` | semantic |
| `--color-text-inverse` | `#fcfcfc` | semantic |
| `--color-text-primary` | `#3d3d3d` | semantic |
| `--color-text-secondary` | `#525252` | semantic |
| `--container-gutter` | `2rem` | component |
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | primitive |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--font-weight-semibold` | `600` | primitive |
| `--form-font-size-md` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | component |
| `--form-font-size-sm` | `clamp(.625rem, .56rem + .32vw, .75rem)` | component |
| `--form-height-md` | `40px` | component |
| `--form-height-sm` | `32px` | component |
| `--form-padding-x-md` | `.75rem` | component |
| `--form-padding-x-sm` | `.625rem` | component |
| `--form-radius-md` | `.5rem` | component |
| `--form-radius-sm` | `.25rem` | component |
| `--letter-spacing-tight` | `-.01em` | primitive |
| `--line-height-tight` | `1.3` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--radius-300` | `.5rem` | primitive |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--transition-fast` | `.15s ease` | primitive |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |
| `--type-size-250` | `clamp(.8125rem, .71rem + .5vw, 1.0625rem)` | primitive |
| `--type-size-500` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
