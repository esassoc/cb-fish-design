# Prototype settings

LIB & PI document editing · source prototype: https://esassoc.github.io/cb-fish-design/lib-pi-editing/

![Prototype settings, desktop](https://esassoc.github.io/cb-fish-design/handoff/lib-pi-editing/claude/prototype-settings.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/lib-pi-editing/claude/prototype-settings.phone.png

## Components

- `cbf-demo-controls` (spoke) · `src/components/lib-pi-editing/cbf-doc-demo-controls.astro`
- `esa-alert-box` (hub) · `packages/ecology/src/components/esa-alert-box.astro`
- `esa-badge` (hub) · `packages/ecology/src/components/esa-badge.astro`
- `esa-button-toggle` (hub) · `packages/ecology/src/components/esa-button-toggle.ts`

## Markup

```html
<aside class="cbf-demo-controls" aria-label="Prototype settings">
  <div class="cbf-demo-controls__row">
    <div class="cbf-demo-controls__flag">
      <span class="esa-badge esa-badge--warning esa-badge--lg typography-microcopy-md-strong">
        <span class="esa-badge__text">Prototype settings</span>
      </span>
      <p class="typography-meta">
        This bar is not part of the application. Use it to set who is viewing the pages and what
        state the CR/CCR is in — the contract below updates to match.
      </p>
    </div>
    <div class="cbf-demo-controls__toggles">
      <esa-button-toggle data-demo-role="true" label="Who is viewing" size="sm"></esa-button-toggle>
      <esa-button-toggle
        data-demo-award="true"
        label="CR / CCR state"
        size="sm"
      ></esa-button-toggle>
    </div>
  </div>
  <!-- Editing-state explainer: which of the three the script shows (and its text)
       depends on the toggles above. It lives here, not in the contract. -->
  <div class="cbf-demo-controls__explain">
    <div data-banner="allowed">
      <div class="esa-alert-box esa-alert-box--success typography-body-sm">
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
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        <div class="esa-alert-box__body">
          <strong class="esa-alert-box__title typography-label-sm-strong"
            >Editing is available for this combination</strong
          >
          <div class="esa-alert-box__message">
            <span data-banner-text=""
              >Acting as Brandon Diller (Contract manager) · CR/CCR state Pending. The SOW is
              Pending, so any user may replace this file from the context menu. All document
              specifications — type, title, authors, and sharing — are kept.</span
            >
          </div>
        </div>
      </div>
      <!-- script type="module" removed (455 bytes) -->
    </div>
    <div data-banner="restricted" hidden="">
      <div class="esa-alert-box esa-alert-box--warning typography-body-sm">
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
            <path
              d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
            ></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
        </div>
        <div class="esa-alert-box__body">
          <strong class="esa-alert-box__title typography-label-sm-strong"
            >Editing is restricted for this role right now</strong
          >
          <div class="esa-alert-box__message"><span data-banner-text=""></span></div>
        </div>
      </div>
    </div>
    <div data-banner="locked" hidden="">
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
          <strong class="esa-alert-box__title typography-label-sm-strong"
            >Documents are locked in this state</strong
          >
          <div class="esa-alert-box__message"><span data-banner-text=""></span></div>
        </div>
      </div>
    </div>
  </div>
</aside>
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
.typography-label-sm-strong {
  font-family: var(--typography-label-sm-strong-font-family);
  font-size: var(--typography-label-sm-strong-font-size);
  font-weight: var(--typography-label-sm-strong-font-weight);
  line-height: var(--typography-label-sm-strong-line-height);
  letter-spacing: var(--typography-label-sm-strong-letter-spacing);
}
.typography-microcopy-md-strong {
  font-family: var(--typography-microcopy-md-strong-font-family);
  font-size: var(--typography-microcopy-md-strong-font-size);
  font-weight: var(--typography-microcopy-md-strong-font-weight);
  line-height: var(--typography-microcopy-md-strong-line-height);
  letter-spacing: var(--typography-microcopy-md-strong-letter-spacing);
}
.typography-meta {
  font-family: var(--typography-meta-font-family);
  font-size: var(--typography-meta-font-size);
  font-weight: var(--typography-meta-font-weight);
  line-height: var(--typography-meta-line-height);
  letter-spacing: var(--typography-meta-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-label-sm-strong {
  font-family: var(--typography-label-sm-strong-font-family);
  font-size: var(--typography-label-sm-strong-font-size);
  font-weight: var(--typography-label-sm-strong-font-weight);
  line-height: var(--typography-label-sm-strong-line-height);
  letter-spacing: var(--typography-label-sm-strong-letter-spacing);
}
.typography-microcopy-md-strong {
  font-family: var(--typography-microcopy-md-strong-font-family);
  font-size: var(--typography-microcopy-md-strong-font-size);
  font-weight: var(--typography-microcopy-md-strong-font-weight);
  line-height: var(--typography-microcopy-md-strong-line-height);
  letter-spacing: var(--typography-microcopy-md-strong-letter-spacing);
}
.typography-meta {
  font-family: var(--typography-meta-font-family);
  font-size: var(--typography-meta-font-size);
  font-weight: var(--typography-meta-font-weight);
  line-height: var(--typography-meta-line-height);
  letter-spacing: var(--typography-meta-letter-spacing);
}
.esa-badge {
  --_badge-bg: var(--badge-bg, var(--color-background-elevation-raised, #fcfcfc));
  --_badge-text: var(--badge-text-color, var(--color-content-default-secondary, #646464));
  --_badge-border: var(--badge-border-color, var(--color-border-default, #cecece));
  --_badge-padding-y: var(--spacing-150, 0.375rem);
  --_badge-padding-x: var(--spacing-200, 0.5rem);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: calc(1lh + 2 * var(--_badge-padding-y));
  padding-block: var(--_badge-padding-y);
  padding-inline: var(--_badge-padding-x);
  border-radius: var(--radius-chip, var(--radius-sm, 0.25rem));
  background: var(--_badge-bg);
  color: var(--_badge-text);
  white-space: nowrap;
  box-sizing: border-box;
}
.esa-badge--lg {
  --_badge-padding-y: var(--spacing-250, 0.625rem);
  --_badge-padding-x: var(--spacing-300, 0.75rem);
}
.esa-badge--warning {
  --_badge-bg: var(--color-background-utility-warning-muted, #fff7c2);
  --_badge-text: var(--color-content-utility-warning, #ab6400);
  --_badge-border: var(--color-border-utility-warning, #f3d673);
}
.esa-badge--neutral:not(.esa-badge--dot),
.esa-badge--success:not(.esa-badge--dot),
.esa-badge--warning:not(.esa-badge--dot),
.esa-badge--danger:not(.esa-badge--dot),
.esa-badge--info:not(.esa-badge--dot) {
  border: 1px solid var(--_badge-border, transparent);
}
.esa-badge--dot.esa-badge--warning {
  --_badge-bg: var(--color-background-utility-warning-hover, #ffba18);
}
@media (forced-colors: active) {
  .esa-badge {
    border: 1px solid CanvasText;
  }
}
.cbf-demo-controls {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
  padding: var(--spacing-400) var(--spacing-500);
  border: 1px dashed var(--color-content-utility-warning, #b45309);
  border-radius: var(--radius-200);
  background: color-mix(
    in srgb,
    var(--color-content-utility-warning, #b45309) 6%,
    var(--color-background-elevation-raised)
  );
}
.cbf-demo-controls__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--spacing-400);
}
.cbf-demo-controls__flag {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-200);
  max-width: 42ch;
}
.cbf-demo-controls__flag p {
  margin: 0;
  color: var(--color-content-default-secondary);
}
.cbf-demo-controls__toggles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-500);
  align-items: flex-end;
}
.cbf-page .cbf-demo-controls {
  margin-block-end: var(--spacing-500);
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
.esa-alert-box--success {
  --_alert-bg: var(--color-background-utility-success-subtle, #fbfefc);
  --_alert-border: var(--color-border-utility-success, #adddc0);
  --_alert-accent: var(--color-content-utility-success, #218358);
}
.esa-alert-box--warning {
  --_alert-bg: var(--color-background-utility-warning-subtle, #fefdfb);
  --_alert-border: var(--color-border-utility-warning, #f3d673);
  --_alert-accent: var(--color-content-utility-warning, #ab6400);
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
.esa-alert-box__title {
  display: block;
  color: var(--_alert-title-color);
  margin-bottom: var(--spacing-050, 0.125rem);
}
.esa-alert-box__message {
  color: var(--_alert-text-color);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--alert-box-text-color` | `#525252` | component |
| `--badge-bg` | `#fcfcfc` | component |
| `--badge-border-color` | `#dcdcdc` | component |
| `--badge-text-color` | `#525252` | component |
| `--border-width-default` | `1px` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-utility-info-subtle` | `#f3f7fc` | semantic |
| `--color-background-utility-success-subtle` | `#fbfefc` | semantic |
| `--color-background-utility-warning-hover` | `#ffba18` | semantic |
| `--color-background-utility-warning-muted` | `#fff7c2` | semantic |
| `--color-background-utility-warning-subtle` | `#fefdfb` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-utility-info` | `#c6dcf1` | semantic |
| `--color-border-utility-success` | `#adddc0` | semantic |
| `--color-border-utility-warning` | `#f3d673` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-utility-info` | `#0d74ce` | semantic |
| `--color-content-utility-success` | `#218358` | semantic |
| `--color-content-utility-warning` | `#ab6400` | semantic |
| `--radius-200` | `.5rem` | primitive |
| `--radius-chip` | `.25rem` | semantic |
| `--radius-md` | `.5rem` | semantic |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-label-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-sm-strong-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-label-sm-strong-font-weight` | `600` | semantic |
| `--typography-label-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-label-sm-strong-line-height` | `1.6` | semantic |
| `--typography-meta-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-meta-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-meta-font-weight` | `400` | semantic |
| `--typography-meta-letter-spacing` | `.01em` | semantic |
| `--typography-meta-line-height` | `1.6` | semantic |
| `--typography-microcopy-md-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-strong-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-strong-font-weight` | `600` | semantic |
| `--typography-microcopy-md-strong-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-strong-line-height` | `1` | semantic |
