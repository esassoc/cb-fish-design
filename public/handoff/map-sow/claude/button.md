# Button

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **map-sow** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/map-sow/
- **Section element:** `<esa-dialog>`
- **Components:** esa-button (hub)

## Markup (de-scoped, framework-free)
```html
<esa-dialog id="we-modal" heading="New Work Element" show-close-button="true" size="md">
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
          <div class="we-type-opt-desc">Channel restoration, wood structures, habitat units</div>
        </div>
      </div>
      <div class="we-type-opt" id="opt-fp" onclick="toggleWEType('fp')">
        <esa-checkbox id="chk-fp" onclick="event.stopPropagation()" size="md"></esa-checkbox>
        <div>
          <div class="we-type-opt-label we-type-opt-label--fp">
            ■ Floodplain &amp; Side Channels
          </div>
          <div class="we-type-opt-desc">Floodplain reconnection, side channels, wood placement</div>
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
  <div slot="footer">
    <span onclick="closeWEModal()">
      <span
        class="esa-button esa-button--variant-ghost esa-button--appearance-outline esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Cancel</span>
        </button></span
      >
    </span>
    <span onclick="saveWEModal()">
      <span
        class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Save</span>
        </button></span
      >
    </span>
  </div>
</esa-dialog>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.we-modal-field {
  margin-bottom: 14px;
}
.we-modal-field label {
  display: block;
  font-size: 12px;
  color: var(--color-content-default-secondary);
  font-weight: var(--typography-font-weight-medium);
  margin-bottom: 5px;
}
.we-type-check {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.we-type-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1.5px solid var(--color-border-default);
  border-radius: 4px;
  cursor: pointer;
  transition:
    border-color 0.1s,
    background 0.1s;
}
.we-type-opt-label {
  font-size: 12px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
}
.we-type-opt-label--pc {
  color: #1a7abf;
}
.we-type-opt-desc {
  font-size: 10px;
  color: var(--color-content-default-tertiary);
  margin-top: 1px;
}
.pm-not-drawn,
.pm-redraw,
.pm-result,
.pp-prog-pct,
.we-type-opt-desc,
.wz-tip,
.wz-step-num,
.leg-item,
.wz-metric-label {
  font-size: 11px !important;
}
.we-type-opt-label--fp {
  color: #7b4fbf;
}
.we-type-opt-label--rr {
  color: #2a7a5c;
}
.wm-err {
  font-size: 11px;
  color: var(--color-background-utility-danger, #ef4444);
  margin-top: 8px;
  display: none;
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
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
summary.esa-button {
  list-style: none;
  cursor: pointer;
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
.esa-button--sm {
  --_btn-pad-y: var(--spacing-250, 0.625rem);
  --_btn-padding-x: var(--spacing-250, 0.625rem);
  --_btn-radius: var(--button-radius-sm, 4px);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button--variant-ghost .esa-button__native {
  background: transparent;
  color: var(--color-content-default, #202020);
  border-color: transparent;
}
.esa-button--variant-ghost.esa-button--appearance-outline .esa-button__native,
.esa-button--variant-ghost.esa-button--appearance-dashed .esa-button__native {
  border-color: var(--color-border-default, #cecece);
}
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
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
| `--color-background-utility-danger` | `#ce2c31` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
