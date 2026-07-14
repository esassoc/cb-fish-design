// Handoff spec for the /vendor-invoice prototype — curated sections for the
// invoice submission wizard. Consumed only by scripts/gen-handoff.mjs.
//
// Flow today: a PDF-gated, two-step wizard (Details → Review) plus a modal
// confirmation variant. There is NO post-submit success page — submitting shows a
// toast and resets to a blank form. The old left rail/stepper was removed.

/** @type {{ sections: import('./search.mjs').HandoffSection[] }} */
export default {
  sections: [
    {
      label: 'PDF upload',
      selector: '[data-pdf-panel]',
      intent:
        'Two-state PDF panel that gates the whole form. Idle: a drag-and-drop zone with a browse button. Loaded: an inline iframe preview with a toolbar (filename + remove). Uploading a PDF is what unlocks the details form — nothing else can be entered until a PDF is present.',
      decisions: [
        'Desktop: drag-drop onto [data-upload-zone] or click [data-upload-browse].',
        'Mobile (≤600px): the idle drop zone is hidden entirely — the panel uses CSS `:has([data-upload-idle]:not([hidden]))` to collapse to display:none while idle. Upload happens via the full-width primary "Upload Invoice" button ([data-mobile-upload-btn]) in the form body; the panel reappears only to preview a loaded PDF.',
        'PDF only, max 25 MB — validated on drop and on file-input change. A rejection (wrong type / too big) shows an inline esa-alert-box right in the drop zone ([data-upload-inline-error]), capped at 360px, not at the bottom of the form.',
        'Removing the PDF (viewer remove button, or Remove in the review summary) calls clearFile(), resets to the idle state, and revokes the Blob URL.',
      ],
      gotchas: [
        'Panel stacks full-width below 1100px at a fixed 420px height; below 600px it is display:none while idle — do not assume it is always on screen.',
        'syncFormLock() runs on every file change — ALL [data-field] controls stay disabled until pdfEverLoaded is true.',
        'The iframe src is a Blob object URL — it is revoked on remove to avoid leaks.',
      ],
      js: ['src/components/vendor-invoice/invoice-wizard.client.ts'],
    },
    {
      label: 'Details form',
      selector: '[data-step="0"]',
      intent:
        'Step 0 — the main data-entry form: contract reference, an auto-populated read-only project, invoice metadata (number, invoice date, performance start + end), the total amount with contract-balance validation, a final-invoice flag, supporting documents, and notes. The entire form is locked until a PDF is uploaded.',
      decisions: [
        'Contract is an esa-combobox (autocomplete over data-combobox-options JSON). Project is a DISABLED esa-text-field auto-populated from the selected contract (data-contract-projects) — it is read-only by design and must never be user-selectable.',
        'Dates use bcn-date-picker (a spoke component built on esa-text-field). The performance period is two separate fields — "Performance period — Start" and "— End" ([data-field="perf-start"]/[data-field="perf-end"]).',
        'Total amount ([data-field="total-amount"]) is validated against the contract’s remaining balance (data-contract-amounts). Exceeding it shows [data-step-error="total-exceeds"] with the remaining figure interpolated; an empty total shows [data-step-error="total"].',
        'Final invoice is a deliberate callout esa-checkbox ([data-final-invoice]). On Review, if the invoice looks final and the box is not set, the wizard opens the esa-confirm-dialog ([data-final-invoice-dialog]) to confirm before continuing.',
        'The line-items table is intentionally DORMANT — it is wrapped in a `<div hidden>`; the line-item breakdown lives in the uploaded PDF, not in the form. The markup is retained but never shown.',
        'Lock notice ([data-form-lock-notice]) shows until pdfEverLoaded. Supporting docs are deduplicated by filename before being added to supportingDocs[].',
      ],
      gotchas: [
        'All [data-field="*"] controls are disabled until a PDF is uploaded — interacting before upload does nothing.',
        'The Project field is disabled on purpose — do not "fix" it to be editable; it is driven entirely by the chosen contract.',
        'The line items section is hidden — do not surface it without deliberately removing the `<div hidden>` wrapper and its global .cbf-line-item styles.',
        'Dates are parsed as yyyy-mm-dd (not via Date()) to avoid a UTC off-by-one day.',
        'esa-combobox / bcn-date-picker are web components — adding a NEW @esa/ecology import to this page requires clearing node_modules/.vite and restarting astro dev, or the fields render empty (504 Outdated Optimize Dep).',
      ],
      js: ['src/components/vendor-invoice/invoice-wizard.client.ts'],
    },
    {
      label: 'Review step',
      selector: '[data-step="1"]',
      intent:
        'Step 1 — a read-only review of everything entered in step 0, plus the Submit action. The step is a shell (title + info alert + actions); the body is the shared CbfInvoiceReviewSummary, composed of real esa-card legos and filled by the wizard from form state. Back sits left, "Submit invoice" is right-aligned.',
      decisions: [
        'The summary markup lives in ONE place — cbf-invoice-review-summary.astro — shared by this page step AND the modal confirmation variant, so the two can never drift.',
        'It is built from real esa-card legos with [data-review="…"] placeholders that fillReviewSummary() populates at navigation time (not SSR).',
        'The invoice card is the shared CbfInvoiceCard with variant="summary": label-left rows (invoice date, performance start, performance end, contract, project) with the total amount aligned on the same vertical value column so the eye scans straight down.',
        'The uploaded-invoice card carries inline Replace/Remove file actions; the supporting-docs and notes cards are conditional ([data-review="docs-card"]/[data-review="notes-card"], hidden until populated).',
      ],
      gotchas: [
        'The [data-review] placeholders are EMPTY in SSR output — the content is filled client-side; do not expect Astro-rendered values.',
        'Going back, editing form data, and returning re-fills the summary fresh on the next navigation.',
        'CbfInvoiceCard has two variants: the dashboard uses variant="stat" (quick scanning), the review uses variant="summary" (structured, label-left). They serve different needs — do not unify them.',
      ],
      js: ['src/components/vendor-invoice/invoice-wizard.client.ts'],
    },
    {
      label: 'Submit & confirmation',
      selector: '[data-confirm-modal]',
      intent:
        'Submission and its confirmation. A dev toggle ([data-confirm-mode]) switches between two modes that share the SAME review summary: "page" (the Review step above) and "modal" (this esa-dialog "Review & submit", [data-confirm-modal]). There is NO post-submit success page in either mode — submitting shows a success toast and resets the wizard to a fresh blank form.',
      decisions: [
        'The modal wraps the shared CbfInvoiceReviewSummary with a Back/Submit footer; populateModalReview() fills it the same way the page step is filled.',
        'submitInvoice() simulates ~1.5s (spinner on the Submit button), then: restores the button, closes the modal if open, resets the wizard, and fires an esa-snackbar success toast — "Invoice <ref> submitted. The form has been cleared for your next one." (duration 6s). The toast REPLACES the former "Invoice submitted" confirmation screen entirely.',
        'On narrow viewports (≤600px) esa-dialog and esa-confirm-dialog render as bottom sheets (hub edit) rather than centered dialogs.',
        'The reference number is generated client-side as INV-<year>-<5-digit> — prototype demonstration only.',
      ],
      gotchas: [
        'There is no [data-step="2"] / success screen — do not look for one in the DOM. Confirmation is the toast (esa-snackbar-container [data-snackbar], which must be present on the page) plus an in-place reset.',
        'esa-dialog renders empty while closed — the captured region is the collapsed shell; the behavior is what matters.',
        'The "Confirmation mode" bar ([data-confirm-mode-bar]) and "Autofill → Review" ([data-dev-autofill]) are prototype-only dev tools and must NOT ship to production.',
      ],
      js: ['src/components/vendor-invoice/invoice-wizard.client.ts'],
    },
  ],
};
