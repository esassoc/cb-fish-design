# Projects at a Glance

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **home** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/
- **Section element:** `<div>`
- **Components:** cbf-container (spoke), cbf-control-pill (spoke), cbf-glance (spoke), cbf-pg-header (spoke), cbf-svg (spoke), esa-icon (hub)

## Markup (de-scoped, framework-free)
```html
<div class="cbf-container" style="--cbf-container-max: 1556px">
  <section class="cbf-glance">
    <div class="cbf-pg-header">
      <h2 class="cbf-pg-header__title">Projects at a Glance</h2>
      <div class="cbf-control-pill">
        <button class="cbf-control-pill__btn">
          <span class="esa-icon esa-icon--xs" aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </span>
          Previous
        </button>
        <span class="cbf-control-pill__divider"></span>
        <button class="cbf-control-pill__btn">
          <svg
            class="cbf-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
            <path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path>
            <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path>
            <path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path>
          </svg>
          Enlarge
        </button>
        <span class="cbf-control-pill__divider"></span>
        <button class="cbf-control-pill__btn">
          Next
          <span class="esa-icon esa-icon--xs" aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="cbf-glance__chart">
      <img src="assets/chart.png" alt="Projects at a glance — budget by fiscal year" />
    </div>
    <div class="cbf-glance__meta">
      <span>Pivoted Raw Data with Charts:&nbsp;</span><a href="#">Download Raw</a>
    </div>
  </section>
</div>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.esa-icon-link {
  --_il-font: 1rem;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150, 6px);
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  color: inherit;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: var(--_il-font);
  font-weight: var(--font-weight-medium, 500);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}
.esa-icon-link--sm {
  --_il-font: 0.875rem;
}
.esa-icon-link--medium {
  font-weight: var(--font-weight-medium, 500);
}
.esa-icon {
  --_icon-size: var(--icon-size-medium, 20px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  line-height: 1;
  color: inherit;
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-icon-link__label {
  display: inline-block;
}
summary.esa-icon-link {
  list-style: none;
}
.esa-nav-dropdown .esa-icon-link > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.esa-icon-button {
  --_ib-size: var(--form-height-md, 40px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_ib-size);
  height: var(--_ib-size);
  padding: 0;
  border: 0;
  border-radius: var(--radius-200, 8px);
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background var(--transition-fast, 0.15s ease);
  -webkit-appearance: none;
  appearance: none;
}
.cbf-container {
  width: 100%;
  max-width: var(--cbf-container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--spacing-600);
}
.cbf-glance {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-500);
  padding-block: var(--spacing-600);
}
.cbf-pg-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-600);
}
.cbf-pg-header__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--font-weight-semibold);
  font-size: 40px;
  line-height: 40px;
}
.cbf-control-pill {
  display: flex;
  align-items: center;
  gap: var(--spacing-500);
  padding: var(--spacing-300) var(--spacing-500);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-100);
}
.cbf-control-pill__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-200);
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-sans);
  color: var(--color-primary);
  background: none;
  border: 0;
  cursor: pointer;
}
.cbf-control-pill__btn .esa-icon {
  width: 12px;
  height: 12px;
}
.cbf-control-pill__btn .esa-icon svg {
  width: 12px;
  height: 12px;
}
.cbf-control-pill__divider {
  width: 1px;
  height: 16px;
  background: var(--color-border);
}
.cbf-svg {
  width: 12px;
  height: 12px;
  display: block;
  flex: none;
}
.cbf-glance__chart {
  width: 100%;
}
.cbf-glance__chart img {
  width: 100%;
  height: auto;
}
.cbf-glance__meta {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-block: var(--spacing-200);
  border-top: 1px solid var(--color-border);
  font-size: 14px;
}
.cbf-glance__meta span {
  color: var(--color-text-muted);
}
.cbf-glance__meta a {
  color: var(--color-primary);
  text-decoration: underline;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--cbf-container-max` | `1556px` | brand |
| `--color-border` | `#dcdcdc` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-border` | `#c6dcf1` | semantic |
| `--color-primary-subtle` | `#f3f7fc` | semantic |
| `--color-text-muted` | `#7c7c7c` | semantic |
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | primitive |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-bold` | `700` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--font-weight-semibold` | `600` | primitive |
| `--form-height-md` | `40px` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--transition-fast` | `.15s ease` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
