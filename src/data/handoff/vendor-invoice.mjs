// Handoff spec for the /vendor-invoice prototype — curated sections for the
// three-step invoice submission wizard. Consumed only by scripts/gen-handoff.mjs.

/** @type {{ sections: import('./search.mjs').HandoffSection[] }} */
export default {
  sections: [
    {
      label: 'Invoice rail',
      selector: '.cbf-invoice-rail',
      intent:
        'Left sidebar (260px) that holds the vertical step indicator and a read-only vendor identity card. The rail shows where the user is in the wizard and who is submitting the invoice.',
      decisions: [
        'Stepper marks the active step with .is-active and completed steps with .is-done — classes are toggled by invoice-wizard.client.ts, not Astro.',
        'Vendor card is read-only (company, contact, email); it never accepts input.',
        'Rail becomes a horizontal top bar below 960px; vendor card is hidden entirely below 600px.',
      ],
      gotchas: [
        'Connector lines between stepper circles are colored by JS on each goTo() call — do not try to color them with CSS alone.',
        'Step labels in the rail must match the STEPS array in vendor-invoice.astro exactly.',
      ],
      js: ['src/components/vendor-invoice/invoice-wizard.client.ts'],
    },
    {
      label: 'PDF upload',
      selector: '[data-pdf-panel]',
      intent:
        'Two-state PDF panel: (1) idle dropzone — drag-and-drop prompt with a browse button; (2) loaded viewer — iframe displaying the uploaded PDF with a toolbar showing the filename and a remove button. Uploading a PDF unlocks the entire details form.',
      decisions: [
        'Desktop upload: drag-drop onto [data-upload-zone] or click [data-upload-browse].',
        'Mobile upload: a separate [data-mobile-upload-btn] in the form body triggers [data-mobile-upload-input] because the panel is not visible at narrow widths.',
        'Only PDF MIME type is accepted; the wizard validates type on drop and on file input change.',
        'Removing the PDF (via remove button or "Replace" in review) calls clearFile() and resets the viewer to the idle state.',
      ],
      gotchas: [
        'Panel stacks to full-width below 1100px with a fixed height of 420px — the CSS switches from sidebar to block layout at that breakpoint.',
        'syncFormLock() is called on every file change — ALL [data-field] elements remain disabled until pdfEverLoaded is true.',
        'The iframe src is a Blob object URL — it is revoked on remove to avoid memory leaks.',
      ],
      js: ['src/components/vendor-invoice/invoice-wizard.client.ts'],
    },
    {
      label: 'Details form',
      selector: '[data-step="0"]',
      intent:
        'Step 0 — the main data-entry form. Sections: contract/project selectors, invoice metadata (number, dates, performance period), a dynamic line items table, supporting document attachments, and a notes textarea. The entire form is disabled (locked) until a PDF is uploaded.',
      decisions: [
        'Contract and project are esa-combobox (not esa-select) — they support free-text search over a list of options passed via data-combobox-options JSON.',
        'Dates use bcn-date-picker, a spoke-level custom component built on esa-text-field.',
        'Line item rows are JS-rendered (no Astro scope) — their CSS lives in a <style is:global> block.',
        'The locked-state overlay ([data-form-lock-notice]) is shown when pdfEverLoaded is false, prompting the user to upload a PDF first.',
      ],
      gotchas: [
        'All [data-field="*"] controls are disabled until pdfEverLoaded — attempting to interact before upload will have no effect.',
        'The "Add line item" button ([data-add-line-item]) is also disabled while locked.',
        'Line items table has no Astro-scoped styles — any style changes need to target the global .cbf-line-item class.',
        'Supporting docs are deduplicated by filename before being added to the supportingDocs array.',
      ],
      js: ['src/components/vendor-invoice/invoice-wizard.client.ts'],
    },
    {
      label: 'Review step',
      selector: '[data-step="1"]',
      intent:
        'Step 1 — read-only summary of everything entered in step 0. The step shell is a static empty container; all content is JS-generated into [data-review-content] by populateReview() when goTo(1) is called. Shows: uploaded file info, invoice details, line items table, supporting docs list, and notes.',
      decisions: [
        'Review content is entirely client-side — populateReview() reads all [data-field] values, combobox labels, lineItems[], and supportingDocs[] at navigation time.',
        'Combobox display labels are resolved via comboboxLabel(selector) which reads el.options to find the matching label for the stored value.',
        'PDF actions (Replace / Remove) in the review card navigate back to step 0 or clear the file.',
      ],
      gotchas: [
        'The review card ([data-review-content]) is empty in SSR output — do not expect Astro-rendered content here.',
        'If the user goes back and changes form data, the review is re-populated fresh on the next goTo(1) call.',
      ],
      js: ['src/components/vendor-invoice/invoice-wizard.client.ts'],
    },
    {
      label: 'Confirmation',
      selector: '[data-step="2"]',
      intent:
        'Step 2 — success screen shown after submitInvoice() completes. Contains a checkmark icon, a success message, a generated reference number (INV-YYYY-NNNNN format written into [data-confirm-ref]), and two action links: "Return to dashboard" and "Submit another invoice".',
      decisions: [
        'submitInvoice() simulates a 1.5 s network delay, then calls goTo(2) — the confirmation is shown only after the fake submission resolves.',
        'Reference number is generated client-side as INV-<year>-<5-digit-random> and is for prototype demonstration only.',
        'Submit button shows a loading spinner (.esa-button--loading) during the delay.',
      ],
      gotchas: [
        'Step 2 is hidden by default (hidden attribute) — the capture will see the collapsed DOM unless the apply recipe drives through the wizard.',
        'The two action links are plain <a> elements, not esa-button — they are styled with utility classes (.cbf-confirm__link).',
      ],
      js: ['src/components/vendor-invoice/invoice-wizard.client.ts'],
    },
  ],
};
