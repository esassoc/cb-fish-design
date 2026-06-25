# PDF upload

Two-state PDF panel: (1) idle dropzone — drag-and-drop prompt with a browse button; (2) loaded viewer — iframe displaying the uploaded PDF with a toolbar showing the filename and a remove button. Uploading a PDF unlocks the entire details form.

## Key decisions
- Desktop upload: drag-drop onto [data-upload-zone] or click [data-upload-browse].
- Mobile upload: a separate [data-mobile-upload-btn] in the form body triggers [data-mobile-upload-input] because the panel is not visible at narrow widths.
- Only PDF MIME type is accepted; the wizard validates type on drop and on file input change.
- Removing the PDF (via remove button or "Replace" in review) calls clearFile() and resets the viewer to the idle state.

## Gotchas
- Panel stacks to full-width below 1100px with a fixed height of 420px — the CSS switches from sidebar to block layout at that breakpoint.
- syncFormLock() is called on every file change — ALL [data-field] elements remain disabled until pdfEverLoaded is true.
- The iframe src is a Blob object URL — it is revoked on remove to avoid memory leaks.

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
    <iframe
      class="cbf-pdf-viewer__frame"
      data-pdf-frame=""
      title="Invoice PDF preview"
    ></iframe>
  </div>
</aside>
```

## Styles
```css
.cbf-pdf-panel {
  flex: 1;
  min-width: 0;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: relative;
}
.cbf-pdf-panel {
  background: var(--color-surface-sunken, #f8f9fb);
}
.cbf-pdf-panel[hidden] {
  display: none;
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
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-100);
  background: var(--color-surface);
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}
.cbf-pdf-drop__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
.cbf-pdf-drop__icon {
  color: var(--color-text-muted);
}
.cbf-pdf-drop__heading {
  margin: 0;
  font-size: 16px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
.cbf-pdf-drop__sub {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}
.cbf-pdf-drop__browse {
  color: var(--color-secondary);
  font-weight: var(--font-weight-semibold);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.cbf-pdf-drop__hint {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-muted);
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
```

## Tokens
- `--color-border`: #dcdcdc _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-surface-sunken`: #f3f7fc _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--font-weight-semibold`: 600 _(primitive)_
- `--radius-100`: .25rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
- `--spacing-700`: 3rem _(primitive)_
