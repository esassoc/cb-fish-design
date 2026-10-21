# PDF upload

Vendor invoice submission · source prototype: https://esassoc.github.io/cb-fish-design/vendor-invoice/

![PDF upload, desktop](https://esassoc.github.io/cb-fish-design/handoff/vendor-invoice/claude/pdf-upload.desktop.png)

Two-state PDF panel that gates the whole form. Idle: a drag-and-drop zone with a browse button. Loaded: an inline iframe preview with a toolbar (filename + remove). Uploading a PDF is what unlocks the details form — nothing else can be entered until a PDF is present.

## Key decisions

- Desktop: drag-drop onto [data-upload-zone] or click [data-upload-browse].
- Mobile (≤600px): the idle drop zone is hidden entirely — the panel uses CSS `:has([data-upload-idle]:not([hidden]))` to collapse to display:none while idle. Upload happens via the full-width primary "Upload Invoice" button ([data-mobile-upload-btn]) in the form body; the panel reappears only to preview a loaded PDF.
- PDF only, max 25 MB — validated on drop and on file-input change. A rejection (wrong type / too big) shows an inline esa-alert-box right in the drop zone ([data-upload-inline-error]), capped at 360px, not at the bottom of the form.
- Removing the PDF (viewer remove button, or Remove in the review summary) calls clearFile(), resets to the idle state, and revokes the Blob URL.

## Gotchas

- Panel stacks full-width below 1100px at a fixed 420px height; below 600px it is display:none while idle — do not assume it is always on screen.
- syncFormLock() runs on every file change — ALL [data-field] controls stay disabled until pdfEverLoaded is true.
- The iframe src is a Blob object URL — it is revoked on remove to avoid leaks.

## Components

- `cbf-pdf-drop` (spoke) · `src/components/vendor-invoice/cbf-invoice-pdf-panel.astro`
- `cbf-pdf-panel` (spoke) · `src/components/vendor-invoice/cbf-invoice-pdf-panel.astro`
- `cbf-pdf-viewer` (spoke) · `src/components/vendor-invoice/cbf-invoice-pdf-panel.astro`
- `esa-alert-box` (hub) · `packages/ecology/src/components/esa-alert-box.astro`

## Markup

```html
<aside class="cbf-pdf-panel" data-pdf-panel="" data-upload-zone="">
  <!-- Idle: drop zone (visible when no file loaded) -->
  <div class="cbf-pdf-drop" data-upload-idle="">
    <input
      type="file"
      accept=".pdf,application/pdf"
      class="cbf-pdf-drop__input"
      data-upload-input=""
      tabindex="-1"
      aria-hidden="true"
    />
    <div class="cbf-pdf-drop__icon" aria-hidden="true">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>
    </div>
    <p class="cbf-pdf-drop__heading">Drop invoice PDF here</p>
    <p class="cbf-pdf-drop__sub">
      or
      <button type="button" class="cbf-pdf-drop__browse" data-upload-browse="">
        browse to upload
      </button>
    </p>
    <p class="cbf-pdf-drop__hint">PDF only · Max 25 MB</p>
    <div class="cbf-pdf-drop__error" data-upload-inline-error="" role="alert" hidden="">
      <div class="esa-alert-box esa-alert-box--danger typography-body-sm">
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
            <path d="M12 8v4"></path>
            <path d="M12 16h.01"></path>
          </svg>
        </div>
        <div class="esa-alert-box__body">
          <div class="esa-alert-box__message"><span data-upload-inline-error-msg=""></span></div>
        </div>
      </div>
      <!-- script type="module" removed (455 bytes) -->
    </div>
  </div>
  <!-- Loaded: PDF viewer (visible when file is loaded) -->
  <div class="cbf-pdf-viewer" data-pdf-viewer="" hidden="">
    <div class="cbf-pdf-viewer__bar">
      <svg
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
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
      <span class="cbf-pdf-viewer__name" data-pdf-filename=""></span>
      <button
        type="button"
        class="cbf-pdf-viewer__remove"
        data-upload-remove=""
        aria-label="Remove invoice"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        Remove
      </button>
    </div>
    <iframe class="cbf-pdf-viewer__frame" data-pdf-frame="" title="Invoice PDF preview"></iframe>
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
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.cbf-review-notice .esa-alert-box {
  --color-background-utility-info-subtle: var(--color-background-brand-subtle);
  --color-border-utility-info: var(--color-border-brand);
  --color-background-utility-info: var(--color-background-brand-muted);
  --color-content-default-secondary: var(--color-content-default);
  font-size: 15px;
}
.cbf-pdf-panel {
  flex: 1;
  min-width: 0;
  border-right: 1px solid var(--color-border-default);
  display: flex;
  flex-direction: column;
  position: relative;
}
.cbf-pdf-panel[hidden] {
  display: none;
}
.cbf-pdf-panel {
  background: var(--color-background-elevation-sunken, #f8f9fb);
}
.cbf-pdf-drop {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-300);
  text-align: center;
  margin: var(--spacing-500);
  padding: var(--spacing-700) var(--spacing-600);
  border: 2px dashed var(--color-border-default);
  border-radius: var(--radius-100);
  background: var(--color-background-elevation-raised);
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}
.cbf-pdf-drop[hidden] {
  display: none;
}
.cbf-pdf-panel.is-over .cbf-pdf-drop {
  border-color: var(--color-background-brand);
  background: var(--color-background-brand-subtle);
}
.cbf-pdf-drop__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
.cbf-pdf-drop__icon {
  color: var(--color-content-default-tertiary);
}
.cbf-pdf-drop__heading {
  margin: 0;
  font-size: 16px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
}
.cbf-pdf-drop__sub {
  margin: 0;
  font-size: 14px;
  color: var(--color-content-default-secondary);
}
.cbf-pdf-drop__browse {
  color: var(--color-background-brand-muted);
  font-weight: var(--typography-font-weight-semibold);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.cbf-pdf-drop__browse:hover {
  color: var(--color-background-brand);
}
.cbf-pdf-drop__hint {
  margin: 0;
  font-size: 12px;
  color: var(--color-content-default-tertiary);
}
.cbf-pdf-drop__error {
  width: 100%;
  max-width: 360px;
  margin-top: var(--spacing-200);
  margin-inline: auto;
  text-align: left;
}
.cbf-pdf-drop__error[hidden] {
  display: none;
}
.cbf-pdf-viewer {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.cbf-pdf-viewer[hidden] {
  display: none;
}
.cbf-pdf-viewer__bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  padding: 0 var(--spacing-400);
  height: 40px;
  flex: none;
  border-bottom: 1px solid var(--color-border-default);
  background: var(--color-background-elevation-raised);
}
.cbf-pdf-viewer__name {
  flex: 1;
  min-width: 0;
  font-size: 13px;
  color: var(--color-content-default-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cbf-pdf-viewer__remove {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150);
  font-size: 12px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default-tertiary);
  padding: var(--spacing-100) var(--spacing-250);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  background: var(--color-background-elevation-raised);
  transition:
    color 0.12s ease,
    border-color 0.12s ease,
    background 0.12s ease;
}
.cbf-pdf-viewer__remove:hover {
  color: var(--color-background-utility-danger, #dc2626);
  border-color: var(--color-background-utility-danger, #dc2626);
  background: var(--color-background-utility-danger-subtle, #fef2f2);
}
.cbf-pdf-viewer__remove[hidden] {
  display: none;
}
.cbf-pdf-viewer__frame {
  flex: 1;
  width: 100%;
  border: none;
  display: block;
  min-height: 0;
}
@media (max-width: 1100px) {
  .cbf-pdf-panel {
    flex: none;
    height: 420px;
    border-right: none;
    border-bottom: 1px solid var(--color-border-default);
  }
}
@media (max-width: 600px) {
  .cbf-pdf-panel:has([data-upload-idle]:not([hidden])) {
    display: none;
  }
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
.esa-alert-box--danger {
  --_alert-bg: var(--color-background-utility-danger-subtle, #fffcfc);
  --_alert-border: var(--color-border-utility-danger, #fdbdbe);
  --_alert-accent: var(--color-content-utility-danger, #ce2c31);
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
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--alert-box-text-color` | `#525252` | component |
| `--border-width-default` | `1px` | semantic |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-danger` | `#ce2c31` | semantic |
| `--color-background-utility-danger-subtle` | `#fffcfc` | semantic |
| `--color-background-utility-info-subtle` | `#f3f7fc` | semantic |
| `--color-border-brand` | `#c6dcf1` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-utility-danger` | `#fdbdbe` | semantic |
| `--color-border-utility-info` | `#c6dcf1` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--color-content-utility-danger` | `#ce2c31` | semantic |
| `--color-content-utility-info` | `#0d74ce` | semantic |
| `--radius-100` | `.25rem` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
