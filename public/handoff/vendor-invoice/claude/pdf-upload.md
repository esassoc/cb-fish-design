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

## Behavior
```ts
// ── src/components/vendor-invoice/invoice-wizard.client.ts ──
// invoice-wizard.client.ts — vendor invoice submission wizard.
// Manages: step navigation + validation, PDF upload zone, line items
// add/remove/total, review-panel population, and submit confirmation.

export function initInvoiceWizard(): void {
  const wizard = document.querySelector<HTMLElement>('[data-invoice-wizard]');
  if (!wizard) return;

  const stepper = wizard.querySelector<HTMLElement>('[data-stepper]');
  const stepperItems = Array.from(
    wizard.querySelectorAll<HTMLElement>('[data-stepper-step]'),
  );
  const stepperLines = Array.from(
    wizard.querySelectorAll<HTMLElement>('.cbf-stepper__line'),
  );

  let current = 0;
  const confirmStep = 2;

  const pdfPanel = wizard.querySelector<HTMLElement>('[data-pdf-panel]');
  const pdfFrame = wizard.querySelector<HTMLIFrameElement>('[data-pdf-frame]');
  const pdfFilenameEl = wizard.querySelector<HTMLElement>('[data-pdf-filename]');
  const cardBody = wizard.querySelector<HTMLElement>('.cbf-invoice-workspace');
  const partiesBar = wizard.querySelector<HTMLElement>('[data-parties-bar]');

  function setStepVisibility(step: number, visible: boolean): void {
    wizard.querySelectorAll<HTMLElement>(`[data-step="${step}"]`).forEach((el) => {
      if (visible) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });
  }

  // ---- Step navigation ----

  function goTo(next: number): void {
    if (next !== confirmStep && !validate(current)) return;
    // Leaving the details step for review: if the invoice looks like a final one
    // and the vendor hasn't said either way, ask first — then resume this same
    // transition once they've answered (shouldPromptFinal is false on re-entry).
    if (current === 0 && next === 1 && shouldPromptFinal()) {
      promptFinalInvoice(() => goTo(next));
      return;
    }
    setStepVisibility(current, false);
    current = next;
    setStepVisibility(current, true);
    updateStepper();
    if (current === 1) populateReview();
    // Show PDF panel only on step 0 (Invoice Details) when a file is loaded
    syncPdfPanel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateStepper(): void {
    const onConfirm = current >= stepperItems.length;
    stepper?.toggleAttribute('hidden', onConfirm);
    if (onConfirm) return;

    stepperItems.forEach((item, i) => {
      item.classList.toggle('is-active', i === current);
      item.classList.toggle('is-done', i < current);
    });
    // colour the connector lines between done steps
    stepperLines.forEach((line, i) => {
      line.style.background =
        i < current ? 'var(--color-primary)' : 'var(--color-border)';
    });
  }

  wizard.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('[data-wizard-next]')) goTo(current + 1);
    if (t.closest('[data-wizard-back]') && current > 0) {
      setStepVisibility(current, false);
      current--;
      setStepVisibility(current, true);
      updateStepper();
      syncPdfPanel();
    }
    if (t.closest('[data-invoice-replace]')) uploadInput.click();
    if (t.closest('[data-invoice-remove]')) { clearFile(); goTo(0); }
    if (t.closest('[data-wizard-submit]')) submitInvoice();
  });

  // Show panel immediately on load (step 0)
  syncPdfPanel();

  // ---- Combobox initialization ----
  // esa-combobox takes options as a JS property, not slotted HTML.
  // We encode the options as JSON on a data attribute at build time and assign here.
  wizard.querySelectorAll<any>('[data-combobox-options]').forEach((el) => {
    try { el.options = JSON.parse(el.dataset.comboboxOptions ?? '[]'); } catch {}
  });

  // ---- PDF panel sync ----

  function syncPdfPanel(): void {
    const show = current === 0;
    pdfPanel?.toggleAttribute('hidden', !show);
    cardBody?.classList.toggle('has-pdf', show);
    partiesBar?.toggleAttribute('hidden', !show);
  }

  // ---- Validation ----

  function validate(step: number): boolean {
    if (step === 0) { const a = validateUpload(); const b = validateDetails(); return a && b; }
    return true;
  }

  function validateUpload(): boolean {
    const err = wizard.querySelector<HTMLElement>('[data-step-error="upload"]')!;
    const hasFile = !!uploadedFile;
    err?.toggleAttribute('hidden', hasFile);
    return hasFile;
  }

  function validateDetails(): boolean {
    let ok = true;
    const required = [
      wizard.querySelector<any>('[data-field="invoice-number"]'),
      wizard.querySelector<any>('[data-field="invoice-date"]'),
      wizard.querySelector<any>('[data-field="issue-date"]'),
      wizard.querySelector<any>('[data-field="perf-start"]'),
      wizard.querySelector<any>('[data-field="perf-end"]'),
      wizard.querySelector<any>('[data-field="contract"]'),
      wizard.querySelector<any>('[data-field="project"]'),
    ];
    required.forEach((el) => {
      if (!el) return;
      const val = el.value ?? el.getAttribute('value') ?? '';
      if (!val.trim()) {
        el.setAttribute('error-text', 'This field is required.');
        ok = false;
      } else {
        el.removeAttribute('error-text');
      }
    });
    if (!lineItems.length) {
      ok = false;
      const err = wizard.querySelector<HTMLElement>('[data-step-error="lineitems"]');
      err?.removeAttribute('hidden');
    } else {
      wizard.querySelector<HTMLElement>('[data-step-error="lineitems"]')?.setAttribute('hidden', '');
    }
    return ok;
  }

  // ---- Form lock (disabled until first PDF upload) ----

  let pdfEverLoaded = false;

  function syncFormLock(): void {
    const locked = !pdfEverLoaded;
    wizard.querySelector<HTMLElement>('[data-form-lock-notice]')?.toggleAttribute('hidden', !locked);

    // Named form fields (esa-text-field, bcn-date-picker, esa-combobox, esa-textarea)
    wizard.querySelectorAll<any>('[data-field]').forEach((el) => {
      el.toggleAttribute('disabled', locked);
    });

    // Action buttons
    wizard.querySelector<HTMLButtonElement>('[data-add-line-item]')?.toggleAttribute('disabled', locked);
    wizard.querySelector<HTMLButtonElement>('[data-docs-add]')?.toggleAttribute('disabled', locked);

    // Dynamically-rendered line item inputs/remove buttons
    wizard.querySelectorAll<HTMLInputElement>('.cbf-li-input').forEach((el) => { el.disabled = locked; });
    wizard.querySelectorAll<HTMLButtonElement>('.cbf-li-remove').forEach((el) => { el.disabled = locked; });
  }

  // Apply initial locked state
  syncFormLock();

  // ---- File upload ----

  let uploadedFile: File | null = null;

  const uploadZone = wizard.querySelector<HTMLElement>('[data-upload-zone]')!;
  const uploadInput = wizard.querySelector<HTMLInputElement>('[data-upload-input]')!;
  const mobileUploadInput = wizard.querySelector<HTMLInputElement>('[data-mobile-upload-input]');
  const uploadIdle = wizard.querySelector<HTMLElement>('[data-upload-idle]')!;
  const pdfViewer = wizard.querySelector<HTMLElement>('[data-pdf-viewer]')!;

  let pdfObjectUrl: string | null = null;

  function showFile(file: File): void {
    uploadedFile = file;
    uploadIdle?.setAttribute('hidden', '');
    pdfViewer?.removeAttribute('hidden');
    wizard.querySelector<HTMLElement>('[data-step-error="upload"]')?.setAttribute('hidden', '');
    if (!pdfEverLoaded) { pdfEverLoaded = true; syncFormLock(); }
    if (pdfObjectUrl) URL.revokeObjectURL(pdfObjectUrl);
    pdfObjectUrl = URL.createObjectURL(file);
    if (pdfFrame) pdfFrame.src = pdfObjectUrl;
    if (pdfFilenameEl) pdfFilenameEl.textContent = file.name;
    if (current === 1) populateReview();
    syncPdfPanel();
  }

  function clearFile(): void {
    uploadedFile = null;
    uploadInput.value = '';
    if (mobileUploadInput) mobileUploadInput.value = '';
    pdfViewer?.setAttribute('hidden', '');
    uploadIdle?.removeAttribute('hidden');
    if (pdfObjectUrl) { URL.revokeObjectURL(pdfObjectUrl); pdfObjectUrl = null; }
    if (pdfFrame) pdfFrame.src = '';
    syncPdfPanel();
  }

  // ---- Supporting documents ----

  let supportingDocs: File[] = [];
  const docsInput = wizard.querySelector<HTMLInputElement>('[data-docs-input]')!;
  const docsList = wizard.querySelector<HTMLElement>('[data-docs-list]')!;

  function renderDocs(): void {
    if (!docsList) return;
    docsList.innerHTML = supportingDocs.map((file, i) => `
      <div class="cbf-doc-row">
        <svg class="cbf-doc-row__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <div class="cbf-doc-row__info">
          <span class="cbf-doc-row__name">${escHtml(file.name)}</span>
          <span class="cbf-doc-row__size">${formatBytes(file.size)}</span>
        </div>
        <button type="button" class="cbf-doc-row__remove" data-doc-remove="${i}" aria-label="Remove ${escHtml(file.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('');
  }

  wizard.querySelector('[data-docs-add]')?.addEventListener('click', () => docsInput?.click());

  docsInput?.addEventListener('change', () => {
    const incoming = Array.from(docsInput.files ?? []);
    const existingNames = new Set(supportingDocs.map((f) => f.name));
    supportingDocs.push(...incoming.filter((f) => !existingNames.has(f.name)));
    docsInput.value = '';
    renderDocs();
  });

  docsList?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-doc-remove]');
    if (!btn) return;
    supportingDocs.splice(Number(btn.dataset.docRemove), 1);
    renderDocs();
  });

  wizard.querySelector('[data-upload-browse]')?.addEventListener('click', () => uploadInput.click());
  wizard.querySelector('[data-upload-remove]')?.addEventListener('click', clearFile);
  wizard.querySelector('[data-mobile-upload-btn]')?.addEventListener('click', () => mobileUploadInput?.click());

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files?.[0];
    if (file) showFile(file);
  });

  mobileUploadInput?.addEventListener('change', () => {
    const file = mobileUploadInput.files?.[0];
    if (file) showFile(file);
  });

  // Drag & drop
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('is-over');
  });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('is-over'));
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('is-over');
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type === 'application/pdf') showFile(file);
  });

  function formatBytes(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // ---- Line items ----

  interface LineItem {
    description: string;
    qty: number;
    unitPrice: number;
  }

  let lineItems: LineItem[] = [];
  const lineItemsBody = wizard.querySelector<HTMLElement>('[data-line-items]')!;
  const totalEl = wizard.querySelector<HTMLElement>('[data-invoice-total]')!;

  function addLineItem(): void {
    lineItems.push({ description: '', qty: 1, unitPrice: 0 });
    renderLineItems();
  }

  function removeLineItem(idx: number): void {
    lineItems.splice(idx, 1);
    renderLineItems();
  }

  function renderLineItems(): void {
    const dis = pdfEverLoaded ? '' : ' disabled';
    lineItemsBody.innerHTML = lineItems
      .map(
        (item, i) => `
      <div class="cbf-line-item" data-row="${i}">
        <input${dis}
          class="cbf-li-input cbf-li-desc"
          type="text"
          placeholder="Description…"
          value="${escHtml(item.description)}"
          data-li-field="description"
          data-li-idx="${i}"
        />
        <input${dis}
          class="cbf-li-input cbf-li-qty"
          type="number"
          min="1"
          value="${item.qty}"
          data-li-field="qty"
          data-li-idx="${i}"
          style="text-align:right"
        />
        <input${dis}
          class="cbf-li-input cbf-li-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value="${item.unitPrice || ''}"
          data-li-field="unitPrice"
          data-li-idx="${i}"
          style="text-align:right"
        />
        <span class="cbf-li-total" data-li-total="${i}">${fmtCurrency(item.qty * item.unitPrice)}</span>
        <button type="button"${dis} class="cbf-li-remove" data-li-remove="${i}" aria-label="Remove line item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `,
      )
      .join('');
    updateTotal();
  }

  function updateTotal(): void {
    const sum = lineItems.reduce((acc, li) => acc + li.qty * li.unitPrice, 0);
    if (totalEl) totalEl.textContent = fmtCurrency(sum);
  }

  function fmtCurrency(n: number): string {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  function escHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  // Delegate input + button events inside the line items body
  lineItemsBody.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    const idx = Number(el.dataset.liIdx);
    const field = el.dataset.liField as keyof LineItem;
    if (!field || isNaN(idx)) return;
    if (field === 'description') lineItems[idx].description = el.value;
    if (field === 'qty') lineItems[idx].qty = Math.max(1, Number(el.value) || 1);
    if (field === 'unitPrice') lineItems[idx].unitPrice = Math.max(0, Number(el.value) || 0);
    const totalCell = lineItemsBody.querySelector<HTMLElement>(`[data-li-total="${idx}"]`);
    if (totalCell) totalCell.textContent = fmtCurrency(lineItems[idx].qty * lineItems[idx].unitPrice);
    updateTotal();
  });

  lineItemsBody.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-li-remove]');
    if (btn) removeLineItem(Number(btn.dataset.liRemove));
  });

  wizard.querySelector('[data-add-line-item]')?.addEventListener('click', addLineItem);

  // ---- Final-invoice flag + detection ----
  // The vendor owns this checkbox — the wizard never ticks it for them. Detection
  // only decides *whether to ask*: if the contract's remaining balance is the same
  // as, or only slightly more than, this invoice's total ("slightly more" = the gap
  // is under 5% of the total contract value), we prompt once on Review & submit.

  const finalCheckbox = wizard.querySelector<any>('[data-final-invoice]');
  const finalCallout = wizard.querySelector<HTMLElement>('[data-final-invoice-callout]');
  const finalDialog = wizard.querySelector<any>('[data-final-invoice-dialog]');
  const contractField = wizard.querySelector<any>('[data-field="contract"]');

  let contractAmounts: Record<string, { total: number; remaining: number }> = {};
  try {
    contractAmounts = JSON.parse(contractField?.dataset.contractAmounts ?? '{}');
  } catch { /* leave empty */ }

  function syncFinalCallout(): void {
    finalCallout?.classList.toggle('is-flagged', !!finalCheckbox?.checked);
  }

  // The vendor has decided once they toggle the box OR answer the prompt — either
  // way we never auto-prompt again.
  let finalDecided = false;
  finalCheckbox?.addEventListener('change', () => {
    finalDecided = true;
    syncFinalCallout();
  });

  function invoiceTotal(): number {
    return lineItems.reduce((acc, li) => acc + li.qty * li.unitPrice, 0);
  }

  function seemsFinalInvoice(): boolean {
    const amounts = contractAmounts[contractField?.value ?? ''];
    const total = invoiceTotal();
    if (!amounts || total <= 0) return false;
    const gap = amounts.remaining - total;
    // Remaining must cover the invoice (gap ≥ 0) and leave less than 5% of the
    // total contract unbilled — i.e. this invoice all but closes the contract.
    return gap >= 0 && gap < 0.05 * amounts.total;
  }

  // Returns true if we still need the vendor's decision before proceeding.
  function shouldPromptFinal(): boolean {
    return !!finalCheckbox && !finalDecided && !finalCheckbox.checked && seemsFinalInvoice();
  }

  // Opens the confirm modal, then runs onResolved once the vendor answers.
  function promptFinalInvoice(onResolved: () => void): void {
    if (!finalDialog) { onResolved(); return; }
    const contractName = contractField?.value || 'this contract';
    finalDialog.message =
      `The remaining balance on ${contractName} is within 5% of this invoice's total, ` +
      `which usually means it's the last one. Marking it final closes out the contract — ` +
      `should we flag this as the final invoice?`;
    const handler = (e: CustomEvent<{ confirmed: boolean }>): void => {
      finalDialog.removeEventListener('resolved', handler);
      finalDecided = true;
      if (e.detail?.confirmed) {
        finalCheckbox.checked = true;
        syncFinalCallout();
      }
      onResolved();
    };
    finalDialog.addEventListener('resolved', handler);
    finalDialog.show();
  }

  // Seed with one empty row
  addLineItem();

  // ---- Review panel ----

  function fieldVal(selector: string): string {
    const el = wizard.querySelector<any>(selector);
    return el?.value ?? '';
  }

  function comboboxLabel(selector: string): string {
    const el = wizard.querySelector<any>(selector);
    if (!el) return '';
    const val = el.value ?? '';
    const match = (el.options as Array<{value: string; label: string}> | undefined)
      ?.find((o) => o.value === val);
    return match?.label ?? val;
  }

  function populateReview(): void {
    const container = wizard.querySelector<HTMLElement>('[data-review-content]');
    if (!container) return;

    const invoiceNum = fieldVal('[data-field="invoice-number"]');
    const invoiceDate = fieldVal('[data-field="invoice-date"]');
    const issueDate = fieldVal('[data-field="issue-date"]');
    const perfStart = fieldVal('[data-field="perf-start"]');
    const perfEnd = fieldVal('[data-field="perf-end"]');
    const contract = comboboxLabel('[data-field="contract"]');
    const project = comboboxLabel('[data-field="project"]');
    const notes = fieldVal('[data-field="notes"]');
    const total = lineItems.reduce((acc, li) => acc + li.qty * li.unitPrice, 0);

    container.innerHTML = `
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Uploaded invoice</h3>
        <div class="cbf-review-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>${escHtml(uploadedFile?.name ?? '(no file)')}</span>
          <span class="cbf-review-meta">${uploadedFile ? formatBytes(uploadedFile.size) : ''}</span>
          <div class="cbf-review-file-actions">
            <button type="button" class="cbf-review-file-btn" data-invoice-replace>Replace</button>
            <button type="button" class="cbf-review-file-btn cbf-review-file-btn--danger" data-invoice-remove>Remove</button>
          </div>
        </div>
      </div>

      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Invoice details</h3>
        <dl class="cbf-review-dl">
          <div class="cbf-review-dl__row"><dt>Invoice number</dt><dd>${escHtml(invoiceNum) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Invoice date</dt><dd>${escHtml(invoiceDate) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Issue date</dt><dd>${escHtml(issueDate) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Performance period</dt><dd>${escHtml(perfStart) || '—'} – ${escHtml(perfEnd) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Contract</dt><dd>${escHtml(contract) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Project</dt><dd>${escHtml(project) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Final invoice</dt><dd>${finalCheckbox?.checked ? 'Yes' : 'No'}</dd></div>
        </dl>
      </div>

      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Line items</h3>
        <table class="cbf-review-table">
          <thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Total</th></tr></thead>
          <tbody>
            ${lineItems.map(li => `
              <tr>
                <td>${escHtml(li.description) || '—'}</td>
                <td>${li.qty}</td>
                <td>${fmtCurrency(li.unitPrice)}</td>
                <td>${fmtCurrency(li.qty * li.unitPrice)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr class="cbf-review-table__total">
              <td colspan="3">Total</td>
              <td>${fmtCurrency(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      ${supportingDocs.length ? `
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Supporting documents</h3>
        ${supportingDocs.map(f => `
          <div class="cbf-review-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>${escHtml(f.name)}</span>
            <span class="cbf-review-meta">${formatBytes(f.size)}</span>
          </div>
        `).join('')}
      </div>` : ''}

      ${notes ? `
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Notes</h3>
        <p class="cbf-review-notes">${escHtml(notes)}</p>
      </div>` : ''}
    `;
  }

  // ---- Submit ----

  function submitInvoice(): void {
    // Engage loading state on the submit button so "Invoice Submitted" only
    // appears after the simulated network round-trip, not on click.
    const btn = wizard.querySelector<HTMLButtonElement>('[data-wizard-submit] button.esa-button');
    if (btn) {
      btn.classList.add('esa-button--loading');
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      if (!btn.querySelector('.esa-button__spinner')) {
        const spinner = document.createElement('span');
        spinner.className = 'esa-button__spinner';
        spinner.setAttribute('aria-hidden', 'true');
        btn.prepend(spinner);
      }
      btn.querySelector('.esa-button__label')?.classList.add('esa-button__label--hidden');
    }

    setTimeout(() => {
      const ref = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
      const refEl = wizard.querySelector<HTMLElement>('[data-confirm-ref]');
      if (refEl) refEl.textContent = ref;
      goTo(2);
    }, 1500);
  }
}
```
