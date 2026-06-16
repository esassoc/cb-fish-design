// invoice-wizard.client.ts — vendor invoice submission wizard.
// Manages: step navigation + validation, PDF upload zone, line items
// add/remove/total, review-panel population, and submit confirmation.

export function initInvoiceWizard(): void {
  const wizard = document.querySelector<HTMLElement>('[data-invoice-wizard]');
  if (!wizard) return;

  const stepEls = Array.from(wizard.querySelectorAll<HTMLElement>('[data-step]'));
  const stepperItems = Array.from(
    wizard.querySelectorAll<HTMLElement>('[data-stepper-step]'),
  );
  const stepperLines = Array.from(
    wizard.querySelectorAll<HTMLElement>('.cbf-stepper__line'),
  );

  let current = 0;

  const pdfPanel = wizard.querySelector<HTMLElement>('[data-pdf-panel]');
  const pdfFrame = wizard.querySelector<HTMLIFrameElement>('[data-pdf-frame]');
  const pdfFilenameEl = wizard.querySelector<HTMLElement>('[data-pdf-filename]');
  const cardBody = wizard.querySelector<HTMLElement>('.cbf-invoice-workspace');
  const partiesBar = wizard.querySelector<HTMLElement>('[data-parties-bar]');

  // ---- Step navigation ----

  function goTo(next: number): void {
    if (!validate(current)) return;
    stepEls[current]?.setAttribute('hidden', '');
    current = next;
    stepEls[current]?.removeAttribute('hidden');
    updateStepper();
    if (current === 1) populateReview();
    // Show PDF panel only on step 0 (Invoice Details) when a file is loaded
    syncPdfPanel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateStepper(): void {
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
      stepEls[current]?.setAttribute('hidden', '');
      current--;
      stepEls[current]?.removeAttribute('hidden');
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
    (wizard.querySelector<HTMLButtonElement>('[data-add-line-item]') ?? null as any).disabled = locked;
    (wizard.querySelector<HTMLButtonElement>('[data-docs-add]') ?? null as any).disabled = locked;

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

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files?.[0];
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
        <h3 class="cbf-review-section__title">Uploaded Invoice</h3>
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
        <h3 class="cbf-review-section__title">Invoice Details</h3>
        <dl class="cbf-review-dl">
          <div class="cbf-review-dl__row"><dt>Invoice Number</dt><dd>${escHtml(invoiceNum) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Invoice Date</dt><dd>${escHtml(invoiceDate) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Issue Date</dt><dd>${escHtml(issueDate) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Performance Period</dt><dd>${escHtml(perfStart) || '—'} – ${escHtml(perfEnd) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Contract</dt><dd>${escHtml(contract) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Project</dt><dd>${escHtml(project) || '—'}</dd></div>
        </dl>
      </div>

      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Line Items</h3>
        <table class="cbf-review-table">
          <thead><tr><th>Description</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
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
        <h3 class="cbf-review-section__title">Supporting Documents</h3>
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
