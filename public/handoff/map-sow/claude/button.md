# Button

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **map-sow** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/map-sow/
- **Section element:** `<div>`
- **Components:** esa-button (hub)

## Markup (de-scoped, framework-free)
```html
<div
  id="we-modal"
  style="
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3000;
    align-items: center;
    justify-content: center;
  "
  role="dialog"
  aria-modal="true"
  aria-labelledby="we-modal-title"
>
  <div id="we-modal-box">
    <div class="we-modal-head">
      <span id="we-modal-title">New Work Element</span>
      <button onclick="closeWEModal()" aria-label="Close dialog">✕</button>
    </div>
    <div class="we-modal-body">
      <div class="we-modal-field">
        <esa-text-field
          label="Work Element Title"
          placeholder="e.g. Eagle Valley Reach 1"
          required=""
          size="md"
        ></esa-text-field>
      </div>
      <div class="we-modal-field">
        <label>What type of work will this element include?</label>
        <div class="we-type-check">
          <div class="we-type-opt" id="opt-pc" onclick="toggleWEType('pc')">
            <esa-checkbox id="chk-pc" onclick="event.stopPropagation()" size="md"></esa-checkbox>
            <div>
              <div class="we-type-opt-label we-type-opt-label--pc">■ Primary Channel</div>
              <div class="we-type-opt-desc">
                Channel restoration, wood structures, habitat units
              </div>
            </div>
          </div>
          <div class="we-type-opt" id="opt-fp" onclick="toggleWEType('fp')">
            <esa-checkbox id="chk-fp" onclick="event.stopPropagation()" size="md"></esa-checkbox>
            <div>
              <div class="we-type-opt-label we-type-opt-label--fp">
                ■ Floodplain &amp; Side Channels
              </div>
              <div class="we-type-opt-desc">
                Floodplain reconnection, side channels, wood placement
              </div>
            </div>
          </div>
          <div class="we-type-opt" id="opt-rr" onclick="toggleWEType('rr')">
            <esa-checkbox id="chk-rr" onclick="event.stopPropagation()" size="md"></esa-checkbox>
            <div>
              <div class="we-type-opt-label we-type-opt-label--rr">■ Riparian Restoration</div>
              <div class="we-type-opt-desc">Fencing, planting, invasive species removal</div>
            </div>
          </div>
        </div>
        <div class="wm-err" id="we-modal-err">
          Please enter a title and select at least one work type.
        </div>
      </div>
    </div>
    <div class="we-modal-foot">
      <span onclick="closeWEModal()">
        <span
          class="esa-button esa-button--color-ghost esa-button--appearance-outline esa-button--md"
        >
          <button class="esa-button__native" type="button">
            <span class="esa-button__label"> Cancel </span>
          </button>
        </span>
      </span>
      <span onclick="saveWEModal()">
        <span
          class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
        >
          <button class="esa-button__native" type="button">
            <span class="esa-button__label"> Save </span>
          </button>
        </span>
      </span>
    </div>
  </div>
</div>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.msow-welcome-btn,
.msow-welcome-btn .esa-button {
  display: block;
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
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--color-border` | `#dcdcdc` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-hover` | `#1a4570` | semantic |
| `--color-primary-strong` | `#2a7e3b` | semantic |
| `--color-text-inverse` | `#fcfcfc` | semantic |
| `--color-text-primary` | `#3d3d3d` | semantic |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--form-font-size-md` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | component |
| `--form-font-size-sm` | `clamp(.625rem, .56rem + .32vw, .75rem)` | component |
| `--form-height-md` | `40px` | component |
| `--form-height-sm` | `32px` | component |
| `--form-padding-x-md` | `.75rem` | component |
| `--form-padding-x-sm` | `.625rem` | component |
| `--form-radius-md` | `.5rem` | component |
| `--form-radius-sm` | `.25rem` | component |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--transition-fast` | `.15s ease` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
