# Header

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **project-budgets** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/project-budgets/
- **Section element:** `<header>`
- **Components:** cbf-app-bar (spoke), cbf-icon (spoke), cbf-logo (spoke), cbf-nav-actions (spoke), cbf-nav-burger (spoke), cbf-nav-collapsible (spoke), cbf-nav-link (spoke), esa-app-bar (hub), esa-button (hub), esa-icon (hub), esa-link-column (hub), esa-nav-dropdown (hub)

## Markup (de-scoped, framework-free)
```html
<header class="esa-app-bar esa-app-bar--brand cbf-app-bar--header">
  <div class="esa-app-bar__row">
    <div class="esa-app-bar__start typography-label-md">
      <span class="cbf-nav-burger" data-nav-toggle="">
        <span
          class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md esa-button--icon-only"
          ><button
            class="esa-button__native typography-microcopy-md"
            type="button"
            aria-label="Open menu"
            title="Open menu"
          >
            <span class="esa-icon esa-icon--md" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              >
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </span></button
        ></span>
      </span>
      <a
        class="cbf-logo"
        href="/cb-fish-design/home"
        title="Columbia Basin Fish &amp; Wildlife Program"
      >
        <img class="cbf-logo__mark" src="/cb-fish-design/logo-mark.svg" alt="" />
        <img
          class="cbf-logo__type"
          src="/cb-fish-design/logo-type.svg"
          alt="Columbia Basin Fish &amp; Wildlife Program"
        />
      </a>
    </div>
    <div class="esa-app-bar__main typography-label-md">
      <div class="cbf-nav-collapsible cbf-nav-collapsible--inline">
        <details class="esa-nav-dropdown esa-nav-dropdown--start">
          <summary
            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
          >
            <span class="esa-button__native typography-microcopy-md"
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  focusable="false"
                >
                  <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"></path>
                  <path d="M7 16v6"></path>
                  <path d="M13 19v3"></path>
                  <path
                    d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"
                  ></path>
                </svg>
              </span>
              <span class="esa-button__label">Mitigation work</span
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  focusable="false"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            </span>
          </summary>
          <div class="esa-nav-dropdown__panel typography-body-md">
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
          </div>
        </details>
        <details class="esa-nav-dropdown esa-nav-dropdown--start">
          <summary
            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
          >
            <span class="esa-button__native typography-microcopy-md"
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
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
              <span class="esa-button__label">Reporting</span
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  focusable="false"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            </span>
          </summary>
          <div class="esa-nav-dropdown__panel typography-body-md">
            <div class="esa-link-column">
              <span class="esa-link-column__head typography-label-md">Reporting</span>
              <hr class="esa-link-column__rule" />
              <ul class="esa-link-column__list">
                <li class="typography-body-sm">Report Center</li>
                <li class="typography-body-sm">Maps</li>
                <li class="typography-body-sm">Publications</li>
              </ul>
            </div>
          </div>
        </details>
        <details class="esa-nav-dropdown esa-nav-dropdown--start">
          <summary
            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
          >
            <span class="esa-button__native typography-microcopy-md"
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  focusable="false"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </span>
              <span class="esa-button__label">Funding</span
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  focusable="false"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            </span>
          </summary>
          <div class="esa-nav-dropdown__panel typography-body-md">
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
          </div>
        </details>
      </div>
    </div>
    <div class="esa-app-bar__end typography-label-md">
      <div class="cbf-nav-actions">
        <button class="cbf-nav-link cbf-nav-link--collapse" type="button">
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
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
              <path d="M12 7v5l4 2"></path></svg
          ></span>
          Recent
          <span class="cbf-icon"
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
        </button>
        <a class="cbf-nav-link cbf-nav-link--collapse" href="/cb-fish-design/my-work">
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
              <rect width="7" height="9" x="3" y="3" rx="1"></rect>
              <rect width="7" height="5" x="14" y="3" rx="1"></rect>
              <rect width="7" height="9" x="14" y="12" rx="1"></rect>
              <rect width="7" height="5" x="3" y="16" rx="1"></rect></svg
          ></span>
          Dashboard
        </a>
        <button class="cbf-nav-link cbf-nav-link--user" type="button" data-omni-user="">
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
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M18 20a6 6 0 0 0-12 0"></path>
              <circle cx="12" cy="10" r="4"></circle></svg
          ></span>
          Angela Zhao
          <span class="cbf-icon"
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
        </button>
      </div>
    </div>
  </div>
</header>
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
.esa-button__label {
  white-space: nowrap;
}
summary.esa-button {
  list-style: none;
  cursor: pointer;
}
.esa-icon--md {
  --_icon-size: var(--icon-size-md, 20px);
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
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
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
.esa-app-bar {
  --_bar-gap: var(--spacing-600, 32px);
  --_bar-pad-x: var(--spacing-600, 32px);
  --_bar-pad-y: var(--spacing-400, 16px);
  display: block;
  width: 100%;
  background: var(--color-background-elevation-raised, #fcfcfc);
  color: var(--color-content-default, #202020);
}
.esa-app-bar--brand-strong {
  background: var(--color-background-default-knockout, #202020);
  color: var(--color-content-default-knockout, #fcfcfc);
}
.esa-app-bar__row {
  display: flex;
  align-items: center;
  gap: var(--_bar-gap);
  padding: var(--_bar-pad-y) var(--_bar-pad-x);
}
.esa-app-bar__start,
.esa-app-bar__main,
.esa-app-bar__end {
  display: inline-flex;
  align-items: center;
  gap: var(--_bar-gap);
}
.esa-app-bar__start {
  flex: none;
}
.esa-app-bar__main {
  flex: 1 1 auto;
  min-width: 0;
}
.esa-app-bar__end {
  flex: none;
  margin-left: auto;
}
.esa-app-bar--brand {
  background: var(--color-background-brand, #46a758);
  color: var(--color-content-default-knockout, #fcfcfc);
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
.cbf-app-bar--admin .esa-app-bar__row {
  display: grid;
  grid-template-columns: 1fr minmax(0, 380px) 1fr;
}
.cbf-app-bar--admin .esa-app-bar__start {
  justify-self: start;
}
.cbf-nav-collapsible {
  display: contents;
}
.cbf-app-bar--admin .esa-app-bar__main {
  justify-content: center;
}
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
}
.cbf-app-bar--admin .esa-app-bar__end {
  justify-self: end;
}
.esa-nav-dropdown {
  position: relative;
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.cbf-nav-burger {
  display: none;
}
.cbf-logo {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-300, 12px);
  flex: none;
  color: inherit;
  text-decoration: none;
}
.cbf-logo__mark {
  width: 48px;
  height: 48px;
  flex: none;
}
.cbf-logo__type {
  height: 40px;
  width: auto;
}
.cbf-nav-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-600);
}
.cbf-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: inherit;
  background: none;
  border: 0;
  font-size: 16px;
  font-weight: var(--typography-font-weight-medium);
  white-space: nowrap;
}
.cbf-nav-link .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-nav-link--user {
  position: relative;
  padding-left: var(--spacing-500);
}
.cbf-nav-link--user:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 1.1em;
  background: #ffffff40;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--button-radius-md` | `.5rem` | component |
| `--button-radius-sm` | `.25rem` | component |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--font-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-sm` | `16px` | primitive |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
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
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
