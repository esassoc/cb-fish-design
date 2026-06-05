# Main

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **search** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/search/
- **Section element:** `<main>`
- **Components:** cbf-app-card (spoke), cbf-app-content (spoke), cbf-app-page (spoke), cbf-app-sidebar (spoke), cbf-container (spoke), cbf-facet (spoke), cbf-icon (spoke), cbf-page-title (spoke), cbf-result-empty (spoke), cbf-search-field (spoke), cbf-search-note (spoke), cbf-search-results (spoke), cbf-search-surface (spoke), esa-alert-box (hub), esa-breadcrumbs (hub)

## Markup (de-scoped, framework-free)
```html
<main class="cbf-app-page" data-search-page="">
  <div class="cbf-container" style="--cbf-container-max: 1920px">
    <div class="cbf-app-card">
      <div class="cbf-app-card__crumb">
        <nav class="esa-breadcrumbs esa-breadcrumbs--md" aria-label="Breadcrumb">
          <ol class="esa-breadcrumbs__list">
            <li class="esa-breadcrumbs__item">
              <a href="/cb-fish-design/" class="esa-breadcrumbs__link">
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
            <li class="esa-breadcrumbs__item" aria-current="page">
              <span class="esa-breadcrumbs__current"> Search </span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="cbf-app-card__body">
        <aside class="cbf-app-sidebar cbf-search-surface">
          <p class="cbf-app-sidebar__head">Filter by type</p>
          <div class="cbf-app-sidebar__facets" data-search-facets="">
            <button type="button" class="cbf-facet is-active">
              <span class="cbf-icon"
                ><svg
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path></svg></span
              ><span class="cbf-facet__label">All</span></button
            ><button type="button" class="cbf-facet">
              <span class="cbf-icon"
                ><svg
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
                  <path
                    d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                  ></path></svg></span
              ><span class="cbf-facet__label">Projects</span></button
            ><button type="button" class="cbf-facet">
              <span class="cbf-icon"
                ><svg
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
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path></svg></span
              ><span class="cbf-facet__label">Contracts</span></button
            ><button type="button" class="cbf-facet">
              <span class="cbf-icon"
                ><svg
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span
              ><span class="cbf-facet__label">People</span></button
            ><button type="button" class="cbf-facet">
              <span class="cbf-icon"
                ><svg
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
                  <path
                    d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
                  ></path></svg></span
              ><span class="cbf-facet__label">Publications</span></button
            ><button type="button" class="cbf-facet">
              <span class="cbf-icon"
                ><svg
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
                  <path
                    d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 1-1 1v-1"
                  ></path>
                  <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg></span
              ><span class="cbf-facet__label">Funds</span>
            </button>
          </div>
        </aside>
        <section class="cbf-app-content">
          <h1 class="cbf-page-title" data-search-title="">Search</h1>
          <div class="cbf-search-note">
            <div class="esa-alert-box esa-alert-box--info">
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
                <div class="esa-alert-box__message">
                  Results are limited to records you have permission to view.
                </div>
              </div>
            </div>
          </div>
          <label class="cbf-search-field">
            <span class="cbf-icon"
              ><svg
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
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path></svg
            ></span>
            <input
              type="text"
              data-search-input=""
              placeholder="Search projects, contracts, people, publications…"
              autocomplete="off"
            />
          </label>
          <div class="cbf-search-surface">
            <div class="cbf-search-results" data-search-results="">
              <p class="cbf-result-empty">
                Enter a keyword to search projects, contracts, people, publications, and funds.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</main>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
}
.cbf-nav-link .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-app-page {
  padding-block: var(--spacing-600) var(--spacing-800);
}
.cbf-container {
  width: 100%;
  max-width: var(--cbf-container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--spacing-600);
}
.cbf-app-card {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: 0 1px 3px #13273e14;
}
.cbf-app-card__crumb {
  background: var(--cbf-gold-50);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-400) var(--spacing-600);
}
.esa-breadcrumbs {
  --_crumb-font-size: var(--type-size-200, 0.875rem);
  --_crumb-link-color: var(--breadcrumbs-link-color, #005862);
  --_crumb-link-hover: var(--breadcrumbs-link-hover, #004752);
  --_crumb-current-color: var(--color-text-primary, #171717);
  --_crumb-separator-color: var(--breadcrumbs-separator-color, #737373);
  --_crumb-gap: var(--spacing-200, 8px);
  display: block;
}
.cbf-app-card__crumb .esa-breadcrumbs {
  --breadcrumbs-link-color: var(--color-gray-800, #464646);
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
.cbf-app-card__body {
  flex: 1;
  display: flex;
  align-items: stretch;
}
.cbf-app-sidebar {
  width: 300px;
  flex: none;
  border-right: 1px solid var(--color-border);
  padding: var(--spacing-500);
}
.cbf-app-sidebar__head {
  margin: 0 0 var(--spacing-200);
  font-size: 16px;
  font-weight: var(--font-weight-semibold);
  color: var(--cbf-gold-900);
}
.cbf-app-sidebar__facets {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cbf-app-content {
  flex: 1;
  min-width: 0;
  padding: var(--spacing-600);
}
.cbf-page-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-300);
  margin: 0 0 var(--spacing-400);
  font-family: var(--font-display);
  font-weight: var(--font-weight-medium);
  font-size: 40px;
  line-height: 40px;
  letter-spacing: -1px;
  color: var(--cbf-blue-950);
}
.cbf-search-note {
  margin-bottom: var(--spacing-400);
}
.esa-alert-box {
  --_alert-bg: var(--color-info-subtle, #eff6ff);
  --_alert-border: var(--color-info-border, #bfdbfe);
  --_alert-icon-color: var(--color-info, #3b82f6);
  --_alert-title-color: var(--color-text-primary, #171717);
  --_alert-text-color: var(--color-text-secondary, #525252);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-300, 0.75rem);
  padding: var(--spacing-300, 0.75rem) var(--spacing-400, 1rem);
  border: 1px solid var(--_alert-border);
  border-radius: var(--radius-200, 0.5rem);
  background: var(--_alert-bg);
  font-size: var(--type-size-150, 0.875rem);
  line-height: 1.5;
}
.cbf-search-note .esa-alert-box {
  --color-info-subtle: var(--color-primary-subtle);
  --color-info-border: var(--color-primary-border);
  --color-info: var(--color-secondary);
  --color-text-secondary: var(--color-text-primary);
  font-size: 16px;
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
.esa-alert-box__message {
  color: var(--_alert-text-color);
}
.cbf-search-field {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  padding: var(--spacing-300) var(--spacing-400);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  background: var(--color-surface);
}
.cbf-search-field .cbf-icon {
  color: var(--color-text-muted);
}
.cbf-search-field input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: var(--font-sans);
  font-size: 18px;
  color: var(--color-text-primary);
}
.cbf-search-field input::placeholder {
  color: var(--cbf-text-placeholder);
}
.cbf-search-results {
  margin-top: var(--spacing-400);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.cbf-search-surface .cbf-facet {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: var(--font-weight-regular);
  text-align: left;
}
.cbf-search-surface .cbf-facet.is-active {
  background: var(--color-primary-subtle);
  font-weight: var(--font-weight-semibold);
}
.cbf-search-surface .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-search-surface .cbf-facet .cbf-icon {
  color: var(--color-secondary);
}
.cbf-search-surface .cbf-facet__label {
  flex: 1;
}
.cbf-search-surface .cbf-result-empty {
  padding: var(--spacing-600) var(--spacing-500);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 15px;
}
.cbf-search-field:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#171717` | component |
| `--breadcrumbs-separator-color` | `#a3a3a3` | component |
| `--cbf-blue-950` | `#13273e` | brand |
| `--cbf-gold-50` | `#f8f8f4` | brand |
| `--cbf-gold-900` | `#534c3b` | brand |
| `--cbf-text-placeholder` | `#9aa3ad` | brand |
| `--color-border` | `#dcdcdc` | semantic |
| `--color-gray-800` | `#262626` | primitive |
| `--color-info` | `#3b82f6` | semantic |
| `--color-info-border` | `#bfdbfe` | semantic |
| `--color-info-subtle` | `#eff6ff` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-border` | `#c6dcf1` | semantic |
| `--color-primary-subtle` | `#f3f7fc` | semantic |
| `--color-secondary` | `#2770b2` | semantic |
| `--color-surface` | `#ffffff` | semantic |
| `--color-text-muted` | `#7c7c7c` | semantic |
| `--color-text-primary` | `#171717` | semantic |
| `--color-text-secondary` | `#525252` | semantic |
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | primitive |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--font-weight-regular` | `400` | primitive |
| `--font-weight-semibold` | `600` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--type-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
