# Portfolio return

Project header navigation · source prototype: https://esassoc.github.io/cb-fish-design/project-nav/summary/

A temporary way back to the portfolio the project was opened from. It sits inside the record card, under the breadcrumbs and above the project eyebrow, outside the navigation itself. It replaces the Back To Portfolio(s) item of today's Go to menu.

## Key decisions

- Shown only when the record was opened from a portfolio ([data-only-arrival="portfolio"]); a direct arrival never sees it.
- An info esa-alert-box, dismissable. Dismissal lasts for the browser session (sessionStorage).
- The same component as the contract header; both records share it.

## Components

- `cbf-portfolio-return` (spoke) · `src/components/contract-nav/cbf-portfolio-return.astro`
- `esa-alert-box` (hub) · `packages/ecology/src/components/esa-alert-box.astro`
- `esa-icon` (hub) · `packages/ecology/src/components/esa-icon.astro`

## Behavior

- `src/components/contract-nav/cbf-portfolio-return.astro`

## Markup

```html
<div class="cbf-portfolio-return" data-only-arrival="portfolio">
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
      <div class="esa-alert-box__message">
        <a class="cbf-portfolio-return__link" href="/cb-fish-design/home">
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
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </span>
          <span>Back to Grande Ronde subbasin habitat portfolio</span>
        </a>
      </div>
    </div>
    <button
      class="esa-alert-box__dismiss"
      type="button"
      aria-label="Dismiss"
      data-esa-alert-dismiss=""
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
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
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </button>
  </div>
  <!-- script type="module" removed (455 bytes) -->
</div>
```

## Styles

```css
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
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
.cbf-qa-icon .esa-button__native > .esa-icon:last-child {
  display: none;
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.esa-nav-dropdown[open] .esa-button__native > .esa-icon:last-child {
  transform: rotate(180deg);
}
.cbf-portfolio-return {
  padding-block-end: var(--spacing-400);
}
.cbf-portfolio-return .esa-alert-box {
  align-items: center;
}
.cbf-portfolio-return .esa-alert-box__icon {
  display: flex;
  padding: 0;
}
.cbf-portfolio-return .esa-alert-box__icon svg {
  display: block;
}
.cbf-portfolio-return .esa-alert-box__message {
  display: flex;
}
.cbf-portfolio-return__link > :first-child {
  margin-block-start: calc((1lh - 16px) / 2);
  flex: none;
}
.cbf-portfolio-return__link {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--spacing-100);
  color: var(--color-content-brand);
  font-weight: var(--typography-font-weight-medium);
}
.esa-collapsible__summary .esa-icon {
  flex-shrink: 0;
  color: var(--color-content-default-secondary, #646464);
}
.esa-alert-box {
  --_alert-bg: var(--color-background-utility-info-subtle, #fbfdff);
  --_alert-border: var(--color-border-utility-info, #acd8fc);
  --_alert-accent: var(--color-content-utility-info, #0d74ce);
  --_alert-icon-color: var(--_alert-accent);
  --_alert-title-color: var(--_alert-accent);
  --_alert-text-color: var(--alert-box-text-color, var(--color-content-default-secondary, #646464));
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-300, 0.75rem);
  padding: var(--spacing-300, 0.75rem) var(--spacing-400, 1rem);
  border: var(--border-width-default, 1px) solid var(--_alert-border);
  border-radius: var(--radius-md, 0.5rem);
  background: var(--_alert-bg);
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
.esa-alert-box__dismiss {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm, 0.25rem);
  background: transparent;
  color: var(--color-content-default-secondary, #646464);
  cursor: pointer;
  transition:
    color var(--transition-fast, 0.15s ease),
    background var(--transition-fast, 0.15s ease);
}
.esa-alert-box__dismiss:hover {
  color: var(--color-content-default, #202020);
  background: var(--color-background-overlay-strong-hover, rgba(0, 0, 0, 0.06));
}
.esa-alert-box__dismiss:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--alert-box-text-color` | `#525252` | component |
| `--border-width-default` | `1px` | semantic |
| `--color-background-overlay-strong-hover` | `rgba(0, 0, 0, .05)` | semantic |
| `--color-background-utility-info-subtle` | `#f3f7fc` | semantic |
| `--color-border-utility-info` | `#c6dcf1` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-utility-info` | `#0d74ce` | semantic |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-sm` | `16px` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
