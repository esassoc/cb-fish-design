# Main

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **project-budgets** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/project-budgets/
- **Section element:** `<main>`
- **Components:** cbf-app-panel (spoke), cbf-page (spoke), cbf-page-heading (spoke), cbf-related-items (spoke), cbf-report-intro (spoke), cbf-report-tabs (spoke), esa-breadcrumbs (hub), esa-button (hub), esa-card (hub), esa-container (hub)

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
              <span class="esa-breadcrumbs__current typography-label-md"> Funding </span>
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
              <span class="esa-breadcrumbs__current typography-label-md"> Project budgets </span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="cbf-app-panel__body">
        <div class="cbf-app-panel__content">
          <h1 class="cbf-page-heading">Project budgets: Summary</h1>
          <nav class="cbf-report-tabs" aria-label="Project budget sections">
            <a class="cbf-report-tabs__tab is-active" href="#" aria-current="page">Summary</a
            ><a class="cbf-report-tabs__tab" href="/cb-fish-design/project-budgets/baselines"
              >Baselines</a
            ><a class="cbf-report-tabs__tab" href="#">Start-of-year (SOY)</a
            ><a class="cbf-report-tabs__tab" href="#">Decisions</a
            ><a class="cbf-report-tabs__tab" href="#">Change requests (BOG)</a>
            <details class="cbf-report-tabs__related" name="cbf-report-tabs-menu">
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
            <h2 class="cbf-related-items__head typography-heading-md">Related items</h2>
            <div class="cbf-related-items__grid grid">
              <div class="esa-card esa-card--outlined">
                <div class="esa-card__header">
                  <div class="esa-card__header-content">
                    <div class="esa-card__titles">
                      <h3 class="esa-card__title typography-title-sm-strong">Reviews</h3>
                    </div>
                  </div>
                </div>
                <div class="esa-card__body typography-body-md">
                  <div class="cbf-related-items__card">
                    <p class="cbf-related-items__overview">
                      <strong>Overview:</strong> Review project budgets across fiscal years and
                      funds — open a working budget to inspect its baseline, start-of-year amount,
                      and the decisions and transfers applied through the year.
                    </p>
                  </div>
                </div>
                <div class="esa-card__footer typography-meta">
                  <div class="cbf-related-items__foot">
                    <span
                      class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
                      ><a class="esa-button__native typography-microcopy-xs" href="#" role="button"
                        ><span class="esa-button__label">View page</span></a
                      ></span
                    >
                  </div>
                </div>
              </div>
              <div class="esa-card esa-card--outlined">
                <div class="esa-card__header">
                  <div class="esa-card__header-content">
                    <div class="esa-card__titles">
                      <h3 class="esa-card__title typography-title-sm-strong">Featured reviews</h3>
                    </div>
                  </div>
                </div>
                <div class="esa-card__body typography-body-md">
                  <div class="cbf-related-items__card">
                    <p class="cbf-related-items__overview">
                      <strong>Overview:</strong> Curated budget reviews highlighted for quick access
                      — the project budget views financial analysts and project managers return to
                      most often.
                    </p>
                  </div>
                </div>
                <div class="esa-card__footer typography-meta">
                  <div class="cbf-related-items__foot">
                    <span
                      class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
                      ><a class="esa-button__native typography-microcopy-xs" href="#" role="button"
                        ><span class="esa-button__label">View page</span></a
                      ></span
                    >
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
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent-border, transparent);
}
.esa-button--variant-chrome .esa-button__native {
  background: transparent;
  color: inherit;
  border-color: transparent;
}
.esa-button__label {
  white-space: nowrap;
}
summary.esa-button {
  list-style: none;
  cursor: pointer;
}
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-heading-md {
  font-family: var(--typography-heading-md-font-family);
  font-size: var(--typography-heading-md-font-size);
  font-weight: var(--typography-heading-md-font-weight);
  line-height: var(--typography-heading-md-line-height);
  letter-spacing: var(--typography-heading-md-letter-spacing);
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
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
}
.cbf-page {
  padding-block: var(--spacing-600) var(--spacing-800);
}
.esa-container {
  width: 100%;
  max-width: var(--_container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--spacing-600, 2rem);
}
.cbf-related-items {
  padding-top: var(--spacing-600);
  border-top: 1px solid var(--color-border-default);
}
.cbf-related-items__head {
  margin: 0 0 var(--spacing-400);
}
.cbf-related-items__grid {
  --grid-min: 20rem;
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
.esa-card--outlined {
  --_card-border: var(--color-border-default, #cecece);
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
.cbf-related-items__card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-300);
}
.cbf-related-items__overview {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-content-default-secondary);
}
.cbf-related-items__overview strong,
.cbf-related-items__meta strong {
  color: var(--color-content-default);
}
.esa-card__footer {
  padding: var(--spacing-300, 0.75rem) var(--_card-padding);
  border-top: var(--border-width-default, 1px) solid var(--_card-header-border);
  background: var(--color-background-elevation-sunken, #f0f0f0);
}
.cbf-related-items__foot {
  display: flex;
  justify-content: flex-end;
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--breadcrumbs-bg` | `transparent` | component |
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#3d3d3d` | component |
| `--button-radius-md` | `.5rem` | component |
| `--button-radius-sm` | `.25rem` | component |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-header-bg` | `transparent` | component |
| `--cbf-surface-crumb` | `#f4f4f4` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
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
| `--color-gray-3` | `#f0f0f0` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
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

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
