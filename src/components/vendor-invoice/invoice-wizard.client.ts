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

  // ---- Step navigation ----

  function goTo(next: number): void {
    if (!validate(current)) return;
    stepEls[current]?.setAttribute('hidden', '');
    current = next;
    stepEls[current]?.removeAttribute('hidden');
    updateStepper();
    if (current === 2) populateReview();
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
    }
    if (t.closest('[data-wizard-submit]')) submitInvoice();
  });

  // ---- Validation ----

  function validate(step: number): boolean {
    if (step === 0) return validateUpload();
    if (step === 1) return validateDetails();
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

  // ---- File upload ----

  let uploadedFile: File | null = null;

  const uploadZone = wizard.querySelector<HTMLElement>('[data-upload-zone]')!;
  const uploadInput = wizard.querySelector<HTMLInputElement>('[data-upload-input]')!;
  const uploadIdle = wizard.querySelector<HTMLElement>('[data-upload-idle]')!;
  const uploadFileEl = wizard.querySelector<HTMLElement>('[data-upload-file]')!;
  const uploadFilename = wizard.querySelector<HTMLElement>('[data-upload-filename]')!;
  const uploadFilesize = wizard.querySelector<HTMLElement>('[data-upload-filesize]')!;

  function showFile(file: File): void {
    uploadedFile = file;
    uploadFilename.textContent = file.name;
    uploadFilesize.textContent = formatBytes(file.size);
    uploadIdle.setAttribute('hidden', '');
    uploadFileEl.removeAttribute('hidden');
    uploadZone.classList.add('has-file');
    wizard.querySelector<HTMLElement>('[data-step-error="upload"]')?.setAttribute('hidden', '');
  }

  function clearFile(): void {
    uploadedFile = null;
    uploadInput.value = '';
    uploadFileEl.setAttribute('hidden', '');
    uploadIdle.removeAttribute('hidden');
    uploadZone.classList.remove('has-file');
  }

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
    lineItemsBody.innerHTML = lineItems
      .map(
        (item, i) => `
      <div class="cbf-line-item" data-row="${i}">
        <input
          class="cbf-li-input cbf-li-desc"
          type="text"
          placeholder="Description…"
          value="${escHtml(item.description)}"
          data-li-field="description"
          data-li-idx="${i}"
        />
        <input
          class="cbf-li-input cbf-li-qty"
          type="number"
          min="1"
          value="${item.qty}"
          data-li-field="qty"
          data-li-idx="${i}"
        />
        <input
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
        <button type="button" class="cbf-li-remove" data-li-remove="${i}" aria-label="Remove line item">
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

  function populateReview(): void {
    const container = wizard.querySelector<HTMLElement>('[data-review-content]');
    if (!container) return;

    const invoiceNum = fieldVal('[data-field="invoice-number"]');
    const invoiceDate = fieldVal('[data-field="invoice-date"]');
    const contract = (wizard.querySelector('[data-field="contract"]') as HTMLSelectElement)?.options?.[
      (wizard.querySelector('[data-field="contract"]') as HTMLSelectElement)?.selectedIndex
    ]?.text ?? fieldVal('[data-field="contract"]');
    const project = (wizard.querySelector('[data-field="project"]') as HTMLSelectElement)?.options?.[
      (wizard.querySelector('[data-field="project"]') as HTMLSelectElement)?.selectedIndex
    ]?.text ?? fieldVal('[data-field="project"]');
    const notes = fieldVal('[data-field="notes"]');
    const total = lineItems.reduce((acc, li) => acc + li.qty * li.unitPrice, 0);

    container.innerHTML = `
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Uploaded Invoice</h3>
        <div class="cbf-review-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>${escHtml(uploadedFile?.name ?? '(no file)')}</span>
          <span class="cbf-review-meta">${uploadedFile ? formatBytes(uploadedFile.size) : ''}</span>
        </div>
      </div>

      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Invoice Details</h3>
        <dl class="cbf-review-dl">
          <div class="cbf-review-dl__row"><dt>Invoice Number</dt><dd>${escHtml(invoiceNum) || '—'}</dd></div>
          <div class="cbf-review-dl__row"><dt>Invoice Date</dt><dd>${escHtml(invoiceDate) || '—'}</dd></div>
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

      ${notes ? `
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Notes</h3>
        <p class="cbf-review-notes">${escHtml(notes)}</p>
      </div>` : ''}
    `;
  }

  // ---- Submit ----

  function submitInvoice(): void {
    const ref = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
    const refEl = wizard.querySelector<HTMLElement>('[data-confirm-ref]');
    if (refEl) refEl.textContent = ref;
    goTo(3);
  }
}
