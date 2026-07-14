// invoice-wizard.client.ts — vendor invoice submission wizard.
// Manages: step navigation + validation, PDF upload zone, line items
// add/remove/total, review-panel population, and submit confirmation.

export function initInvoiceWizard(): void {
  const root = document.querySelector<HTMLElement>('[data-invoice-wizard]');
  if (!root) return;
  const wizard: HTMLElement = root;

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
    // Modal mode: step 1 opens the modal review page instead of the page step.
    if (next === 1 && confirmMode() === 'modal') {
      openModalAtReview();
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

  function openModalAtReview(): void {
    const modal = wizard.querySelector<any>('[data-confirm-modal]');
    if (!modal) return;
    populateModalReview();
    modal.show();
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

  // Dev toggle: switch confirmation mode between "page" and "modal".
  // Mode is stored in a plain variable so confirmMode() never re-reads the DOM
  // (avoids fragility around Astro-scoped class selectors on dynamically toggled nodes).
  let activeConfirmMode: 'page' | 'modal' = 'page';
  const confirmModeBar = wizard.querySelector<HTMLElement>('[data-confirm-mode-bar]');
  confirmModeBar?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-confirm-mode]');
    if (!btn) return;
    const mode = btn.dataset.confirmMode as 'page' | 'modal' | undefined;
    if (!mode) return;
    activeConfirmMode = mode;
    confirmModeBar.querySelectorAll<HTMLElement>('[data-confirm-mode]').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.confirmMode === mode);
    });
  });

  function confirmMode(): string {
    return activeConfirmMode;
  }

  // ---- Dev: autofill valid demo data and jump straight to the review step. ----
  // Prototype-only testing helper so the review/confirmation screens can be reached
  // without hand-filling the form. Wired to the dev-bar "Autofill → Review" button
  // and exposed on window for console use (vendorInvoiceAutofill()).
  function devAutofill(): void {
    // A placeholder PDF unlocks the form (pdfEverLoaded) and shows the panel.
    if (!uploadedFile) {
      const demo = new File(['%PDF-1.4\n% demo invoice for testing\n'], 'demo-invoice.pdf', {
        type: 'application/pdf',
      });
      showFile(demo);
    }
    const fill = (selector: string, value: string): void => {
      const el = wizard.querySelector<any>(selector);
      if (!el) return;
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    // CON-2025-0112 has a large remaining balance, so the total stays well clear of
    // the over-balance and "final invoice?" prompts. Contract change auto-fills Project.
    fill('[data-field="contract"]', 'CON-2025-0112');
    fill('[data-field="invoice-number"]', 'INV-2026-0042');
    fill('[data-field="invoice-date"]', '2026-06-29');
    fill('[data-field="perf-start"]', '2026-01-01');
    fill('[data-field="perf-end"]', '2026-03-31');
    fill('[data-field="total-amount"]', '4850.00');
    fill('[data-field="notes"]', 'Autofilled demo invoice (testing).');
    goTo(1);
  }
  (window as unknown as { vendorInvoiceAutofill?: () => void }).vendorInvoiceAutofill = devAutofill;

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
    if (t.closest('[data-wizard-save-draft]')) saveDraft();
    if (t.closest('[data-wizard-submit]')) submitInvoice();
    if (t.closest('[data-modal-submit]')) submitInvoice();
    if (t.closest('[data-modal-back]')) wizard.querySelector<any>('[data-confirm-modal]')?.close();
    if (t.closest('[data-wizard-cancel]')) {
      wizard.querySelector<any>('[data-confirm-modal]')?.close();
      window.location.href = import.meta.env.BASE_URL + 'vendor-dashboard';
    }
    if (t.closest('[data-dev-autofill]')) devAutofill();
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
      wizard.querySelector<any>('[data-field="perf-start"]'),
      wizard.querySelector<any>('[data-field="perf-end"]'),
      wizard.querySelector<any>('[data-field="contract"]'),
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
    // Performance period cross-check: start must not be after end
    const perfStartEl = wizard.querySelector<any>('[data-field="perf-start"]');
    const perfEndEl = wizard.querySelector<any>('[data-field="perf-end"]');
    const pStart = perfStartEl?.value ?? '';
    const pEnd = perfEndEl?.value ?? '';
    if (pStart && pEnd && pStart > pEnd) {
      perfEndEl?.setAttribute('error-text', 'End date must be on or after start date.');
      ok = false;
    }
    // Invoice total must be a positive amount, and must not exceed the remaining
    // balance on the selected contract (replaces the old line-item check).
    const totalErr = wizard.querySelector<HTMLElement>('[data-step-error="total"]');
    const exceedsErr = wizard.querySelector<HTMLElement>('[data-step-error="total-exceeds"]');
    if (readInvoiceTotal() <= 0) {
      ok = false;
      totalErr?.removeAttribute('hidden');
      exceedsErr?.setAttribute('hidden', '');
      totalAmountField?.setAttribute('error-text', 'Enter the invoice total amount.');
    } else {
      totalErr?.setAttribute('hidden', '');
      if (exceedsRemaining()) {
        ok = false;
        refreshTotalExceeds(); // shows the over-balance alert + field error
      } else {
        exceedsErr?.setAttribute('hidden', '');
        totalAmountField?.removeAttribute('error-text');
      }
    }
    return ok;
  }

  // ---- Form lock (disabled until first PDF upload) ----

  let pdfEverLoaded = false;

  function syncFormLock(): void {
    const locked = !pdfEverLoaded;
    wizard.querySelector<HTMLElement>('[data-form-lock-notice]')?.toggleAttribute('hidden', !locked);

    // Named form fields (esa-text-field, bcn-date-picker, esa-combobox, esa-textarea).
    // Skip [data-readonly] fields — they stay disabled regardless of lock state.
    wizard.querySelectorAll<any>('[data-field]:not([data-readonly])').forEach((el) => {
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

  // Upload size cap — mirrors the "Max 25 MB" hint shown on the drop zones.
  const MAX_FILE_BYTES = 25 * 1024 * 1024;

  // Size/type rejections show INLINE in the drop zone (right at the input), not in
  // the bottom "no file" validation alert which is far from where the user dropped.
  function setUploadError(msg: string): void {
    const slot = wizard.querySelector<HTMLElement>('[data-upload-inline-error]');
    const msgEl = wizard.querySelector<HTMLElement>('[data-upload-inline-error-msg]');
    if (msgEl) msgEl.textContent = msg;
    slot?.removeAttribute('hidden');
  }
  function clearUploadError(): void {
    wizard.querySelector<HTMLElement>('[data-upload-inline-error]')?.setAttribute('hidden', '');
  }

  // Returns an error message if the main invoice file is invalid, else null.
  function validateMainFile(file: File): string | null {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) return 'That file isn’t a PDF. Please upload a PDF invoice.';
    if (file.size > MAX_FILE_BYTES) {
      return `This file is ${formatBytes(file.size)} — the maximum is 25 MB. Please upload a smaller PDF.`;
    }
    return null;
  }

  function showFile(file: File): void {
    const fileError = validateMainFile(file);
    if (fileError) { setUploadError(fileError); return; }
    clearUploadError();
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

  function setDocsError(msg: string): void {
    const slot = wizard.querySelector<HTMLElement>('[data-docs-error]');
    const msgEl = wizard.querySelector<HTMLElement>('[data-docs-error-msg]');
    if (msg) {
      if (msgEl) msgEl.textContent = msg;
      slot?.removeAttribute('hidden');
    } else {
      slot?.setAttribute('hidden', '');
    }
  }

  // Accept a batch of files (from the picker or a drag-drop), skipping oversize
  // and duplicate-name files and surfacing a single error for any rejected ones.
  function addDocs(incoming: File[]): void {
    if (!incoming.length) return;
    const oversize = incoming.filter((f) => f.size > MAX_FILE_BYTES);
    const existingNames = new Set(supportingDocs.map((f) => f.name));
    supportingDocs.push(
      ...incoming.filter((f) => f.size <= MAX_FILE_BYTES && !existingNames.has(f.name)),
    );
    if (oversize.length) {
      const names = oversize.map((f) => f.name).join(', ');
      setDocsError(
        `${names} ${oversize.length > 1 ? 'each exceed' : 'exceeds'} the 25 MB limit and ` +
        `${oversize.length > 1 ? 'were' : 'was'} not added.`,
      );
    } else {
      setDocsError('');
    }
    renderDocs();
  }

  docsInput?.addEventListener('change', () => {
    addDocs(Array.from(docsInput.files ?? []));
    docsInput.value = '';
  });

  // Drag & drop onto the whole backup-documents surface — multiple files at once.
  const docsZone = wizard.querySelector<HTMLElement>('[data-docs-zone]');
  docsZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    docsZone.classList.add('is-over');
  });
  docsZone?.addEventListener('dragleave', (e) => {
    // Only clear when the pointer actually leaves the zone, not its children.
    if (!docsZone.contains(e.relatedTarget as Node)) docsZone.classList.remove('is-over');
  });
  docsZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    docsZone.classList.remove('is-over');
    addDocs(Array.from(e.dataTransfer?.files ?? []));
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
    // showFile validates type + size and surfaces the error (no silent drop).
    if (file) showFile(file);
  });

  function formatBytes(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // Render an ISO date (yyyy-mm-dd from the date inputs) as a human, self-evident
  // date — "June 29, 2026". Parse y/m/d parts to avoid UTC-vs-local off-by-one.
  function formatDate(value: string): string {
    if (!value) return '—';
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

  // The invoice total is now entered directly (line items live in the PDF). Parse
  // the field leniently — strip $, commas, spaces — so "4,850.00" or "$4850" work.
  const totalAmountField = wizard.querySelector<any>('[data-field="total-amount"]');
  function readInvoiceTotal(): number {
    const raw = String(totalAmountField?.value ?? '').replace(/[^0-9.]/g, '');
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  // Remaining (unbilled) balance on the selected contract, from the contract
  // ledger encoded on the combobox; null when no contract is chosen.
  function remainingForContract(): number | null {
    const a = contractAmounts[contractField?.value ?? ''];
    return a ? a.remaining : null;
  }
  // True when the entered total is strictly over the contract's remaining balance.
  // (Equal is allowed — that's a final invoice, handled separately.)
  function exceedsRemaining(): boolean {
    const rem = remainingForContract();
    return rem != null && readInvoiceTotal() > rem;
  }
  // Live toggle for the over-balance alert (run on total/contract change).
  function refreshTotalExceeds(): void {
    const exceedsErr = wizard.querySelector<HTMLElement>('[data-step-error="total-exceeds"]');
    const rem = remainingForContract();
    if (rem != null && exceedsRemaining()) {
      const amtEl = exceedsErr?.querySelector<HTMLElement>('[data-remaining-amount]');
      if (amtEl) amtEl.textContent = fmtCurrency(rem);
      exceedsErr?.removeAttribute('hidden');
      totalAmountField?.setAttribute('error-text', 'Exceeds the remaining contract balance.');
    } else {
      exceedsErr?.setAttribute('hidden', '');
      if (totalAmountField?.getAttribute('error-text') === 'Exceeds the remaining contract balance.') {
        totalAmountField.removeAttribute('error-text');
      }
    }
  }

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

  // Live over-balance feedback: re-check whenever the total or the chosen
  // contract changes, so the alert appears/clears without waiting for Next.
  totalAmountField?.addEventListener('input', refreshTotalExceeds);
  totalAmountField?.addEventListener('change', refreshTotalExceeds);
  contractField?.addEventListener('change', refreshTotalExceeds);

  // Contract → project auto-populate (project field is read-only for reference only).
  const projectDisplayField = wizard.querySelector<any>('[data-field="project"]');
  let contractProjectMap: Record<string, string> = {};
  try { contractProjectMap = JSON.parse(contractField?.dataset.contractProjects ?? '{}'); } catch { /* leave empty */ }
  contractField?.addEventListener('change', () => {
    if (projectDisplayField) projectDisplayField.value = contractProjectMap[contractField.value ?? ''] ?? '';
  });

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
    return readInvoiceTotal();
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
    const handler = (e: CustomEvent<{ confirmed: boolean; dismissed?: boolean }>): void => {
      finalDialog.removeEventListener('resolved', handler);
      // Backdrop/Esc dismiss isn't an answer — it cancels the process. Stay on the
      // current step and re-prompt next time (don't mark finalDecided).
      if (e.detail?.dismissed) return;
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

  // The summary markup is the CbfInvoiceReviewSummary component (esa-card legos);
  // here we only fill its [data-review="…"] placeholders from form state. Two
  // instances exist (page step + modal), so fill is scoped to one root container.
  const fileRowSvg =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  function fillReviewSummary(root: HTMLElement | null): void {
    if (!root) return;
    const set = (key: string, value: string): void => {
      const el = root.querySelector<HTMLElement>(`[data-review="${key}"]`);
      if (el) el.textContent = value;
    };

    set('file-name', uploadedFile?.name ?? '(no file)');
    set('file-size', uploadedFile ? formatBytes(uploadedFile.size) : '');

    set('invoice-number', fieldVal('[data-field="invoice-number"]') || 'No invoice number');
    // Label-left review layout: show the full contract / project identifiers as values.
    set('contract', comboboxLabel('[data-field="contract"]') || '—');
    set('project', fieldVal('[data-field="project"]') || '—');

    const invoiceDate = fieldVal('[data-field="invoice-date"]');
    set('issued', invoiceDate ? formatDate(invoiceDate) : 'Not set');
    // Performance period is split into separate start / end rows on the review card.
    const ps = fieldVal('[data-field="perf-start"]');
    const pe = fieldVal('[data-field="perf-end"]');
    set('perf-start', ps ? formatDate(ps) : 'Not set');
    set('perf-end', pe ? formatDate(pe) : 'Not set');

    set('total', fmtCurrency(invoiceTotal()));

    root.querySelector<HTMLElement>('[data-review="final-flag"]')
      ?.toggleAttribute('hidden', !finalCheckbox?.checked);

    // Supporting documents — rows are plain data (not legos); toggle the card.
    const docsList = root.querySelector<HTMLElement>('[data-review="docs-list"]');
    if (docsList) {
      docsList.innerHTML = supportingDocs.map((f) => `
        <div class="cbf-review-row">
          ${fileRowSvg}
          <span>${escHtml(f.name)}</span>
          <span class="cbf-review-meta">${formatBytes(f.size)}</span>
        </div>`).join('');
    }
    root.querySelector<HTMLElement>('[data-review="docs-card"]')
      ?.toggleAttribute('hidden', supportingDocs.length === 0);

    // Notes — toggle the card when empty.
    const notes = fieldVal('[data-field="notes"]');
    set('notes', notes);
    root.querySelector<HTMLElement>('[data-review="notes-card"]')
      ?.toggleAttribute('hidden', !notes);
  }

  function populateReview(): void {
    fillReviewSummary(wizard.querySelector<HTMLElement>('[data-review-content]'));
  }

  function populateModalReview(): void {
    fillReviewSummary(wizard.querySelector<HTMLElement>('[data-modal-review-content]'));
  }

  // ---- Save as draft ----
  // A draft keeps whatever's been entered so far — no validation, no submission.
  // Prototype: there's no persistence layer, so we confirm with a toast and return
  // the vendor to the dashboard, where drafts are listed with a "Draft" status.
  function saveDraft(): void {
    const snackbar = document.querySelector<any>('[data-snackbar]');
    snackbar?.success?.('Draft saved.', { duration: 3000 });
    setTimeout(() => {
      window.location.href = import.meta.env.BASE_URL + 'vendor-dashboard';
    }, 700);
  }

  // ---- Submit ----

  function submitInvoice(): void {
    const isModal = confirmMode() === 'modal';
    // Target the submit button in whichever surface is active.
    const btnWrap = isModal ? '[data-modal-submit]' : '[data-wizard-submit]';
    const btn = wizard.querySelector<HTMLButtonElement>(`${btnWrap} button.esa-button`);
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
      // Both modes: the "Invoice submitted" page/success page is replaced by a success
      // toast. Close the modal if open, reset to a blank form (in place, no reload),
      // and let the vendor file another invoice.
      restoreSubmitButton(btn);
      if (isModal) wizard.querySelector<any>('[data-confirm-modal]')?.close();
      resetWizard();
      const snackbar = document.querySelector<any>('[data-snackbar]');
      snackbar?.success?.(`Invoice ${ref} submitted.`, { duration: 4000 });
    }, 1500);
  }

  function restoreSubmitButton(btn: HTMLButtonElement | null): void {
    if (!btn) return;
    btn.classList.remove('esa-button--loading');
    btn.disabled = false;
    btn.removeAttribute('aria-busy');
    btn.querySelector('.esa-button__spinner')?.remove();
    btn.querySelector('.esa-button__label')?.classList.remove('esa-button__label--hidden');
  }

  // Reset the wizard back to a blank step-0 form (used after a modal-mode submit so
  // the vendor can file another invoice without a page reload).
  function resetWizard(): void {
    clearFile();
    supportingDocs = [];
    renderDocs();
    wizard.querySelectorAll<any>('[data-field]').forEach((el) => {
      if (typeof el.checked === 'boolean') el.checked = false;
      el.value = '';
      el.removeAttribute?.('error-text');
    });
    wizard.querySelectorAll<HTMLElement>('[data-step-error]').forEach((el) => el.setAttribute('hidden', ''));
    finalDecided = false;
    if (finalCheckbox) finalCheckbox.checked = false;
    syncFinalCallout();
    pdfEverLoaded = false;
    syncFormLock();
    setStepVisibility(current, false);
    current = 0;
    setStepVisibility(0, true);
    updateStepper();
    syncPdfPanel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
