# Button

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **map-sow** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/map-sow/
- **Section element:** `<div>`
- **Components:** esa-button (hub), esa-icon (hub)

## Markup (de-scoped, framework-free)
```html
<div
  id="welcome-modal"
  style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <div class="msow-welcome-card">
    <div class="msow-welcome-head"><p class="msow-welcome-title">Habitat Design Tool</p></div>
    <div class="msow-welcome-body">
      <p class="msow-welcome-heading">Your contract is eligible to use the new map-based tool.</p>
      <p class="msow-welcome-desc">
        Define pre-project conditions and scope habitat work elements visually on the map, with
        metrics calculated automatically from your digitized features.
      </p>
    </div>
    <div class="msow-welcome-actions">
      <span
        onclick="
          document.getElementById('welcome-modal').style.display = 'none';
          createDefaultWE();
        "
        class="msow-welcome-btn"
      >
        <span
          class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
        >
          <button class="esa-button__native" type="button">
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
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            </span>
            <span class="esa-button__label"> Continue with new tool </span>
          </button>
        </span>
      </span>
      <!-- "Go back to old tool" removed for now — kept for easy restore.
      <span onclick="alert('Returning to classic SOW editor...')" class="msow-welcome-btn">
        <EsaButton color="ghost" appearance="outline" icon="arrow-left">Go back to old tool</EsaButton>
      </span>
      -->
    </div>
  </div>
</div>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.esa-icon-link {
  --_il-font: var(--icon-link-font-size-md, 1rem);
  display: inline-flex;
  align-items: center;
  gap: var(--icon-link-gap, var(--spacing-150, 6px));
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
  --_il-font: var(--icon-link-font-size-sm, 0.875rem);
}
.esa-icon-link--medium {
  font-weight: var(--font-weight-medium, 500);
}
.esa-icon-link__label {
  display: inline-block;
}
summary.esa-icon-link {
  list-style: none;
}
.msow-welcome-card {
  background: var(--color-surface);
  width: 440px;
  border-radius: var(--radius-100);
  overflow: hidden;
  box-shadow: 0 8px 32px #00000040;
}
.msow-welcome-head {
  background: var(--color-primary);
  padding: var(--spacing-500) var(--spacing-600);
  border-bottom: 3px solid var(--color-primary-hover);
}
.msow-welcome-title {
  color: var(--color-text-inverse, #fff);
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  margin: 0;
}
.msow-welcome-body {
  padding: var(--spacing-500) var(--spacing-600) var(--spacing-500);
}
.msow-welcome-heading {
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  color: var(--color-surface-inverse);
  margin-bottom: var(--spacing-300);
}
.msow-welcome-desc {
  font-size: 12px;
  color: var(--color-text-tertiary);
  line-height: 1.65;
}
.msow-welcome-actions {
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.msow-welcome-btn,
.msow-welcome-btn .esa-button {
  display: block;
}
.esa-nav-dropdown .esa-icon-link > .esa-icon:last-child {
  transition: transform 0.15s ease;
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
.esa-button--sm .esa-button__native {
  height: auto;
  padding-block: var(--spacing-150, 6px);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button--color-ghost .esa-button__native {
  background: transparent;
  color: var(--color-text-primary, #171717);
  border-color: transparent;
}
.esa-button--color-ghost.esa-button--appearance-outline .esa-button__native,
.esa-button--color-ghost.esa-button--appearance-dashed .esa-button__native {
  border-color: var(--color-border, #e5e5e5);
}
.esa-button__label {
  white-space: nowrap;
}
.esa-button--color-primary {
  --_accent-text: var(--color-primary-strong);
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: transparent;
}
.esa-icon {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  line-height: 1;
  color: inherit;
}
.esa-icon--xs {
  --_icon-size: var(--icon-size-xs, 14px);
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-icon--sm {
  --_icon-size: var(--icon-size-sm, var(--icon-size-small, 16px));
}
.esa-icon--md {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--color-border` | `#dcdcdc` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-hover` | `#1a4570` | semantic |
| `--color-primary-strong` | `#2a7e3b` | semantic |
| `--color-surface` | `#fcfcfc` | semantic |
| `--color-surface-inverse` | `#13273e` | semantic |
| `--color-text-inverse` | `#fcfcfc` | semantic |
| `--color-text-primary` | `#3d3d3d` | semantic |
| `--color-text-tertiary` | `#656565` | semantic |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-bold` | `700` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--form-font-size-md` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | component |
| `--form-font-size-sm` | `clamp(.625rem, .56rem + .32vw, .75rem)` | component |
| `--form-height-md` | `40px` | component |
| `--form-height-sm` | `32px` | component |
| `--form-padding-x-md` | `.75rem` | component |
| `--form-padding-x-sm` | `.625rem` | component |
| `--form-radius-md` | `.5rem` | component |
| `--form-radius-sm` | `.25rem` | component |
| `--icon-link-font-size-md` | `1rem` | component |
| `--icon-link-font-size-sm` | `.875rem` | component |
| `--icon-link-gap` | `.375rem` | component |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-medium` | `20px` | component |
| `--icon-size-sm` | `16px` | primitive |
| `--icon-size-small` | `16px` | component |
| `--icon-size-xs` | `14px` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--transition-fast` | `.15s ease` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
