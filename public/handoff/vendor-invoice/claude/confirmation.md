# Confirmation

Step 2 — success screen shown after submitInvoice() completes. Contains a checkmark icon, a success message, a generated reference number (INV-YYYY-NNNNN format written into [data-confirm-ref]), and two action links: "Return to portal" and "Submit another invoice".

## Key decisions
- submitInvoice() simulates a 1.5 s network delay, then calls goTo(2) — the confirmation is shown only after the fake submission resolves.
- Reference number is generated client-side as INV-<year>-<5-digit-random> and is for prototype demonstration only.
- Submit button shows a loading spinner (.esa-button--loading) during the delay.

## Gotchas
- Step 2 is hidden by default (hidden attribute) — the capture will see the collapsed DOM unless the apply recipe drives through the wizard.
- The two action links are plain <a> elements, not esa-button — they are styled with utility classes (.cbf-confirm__link).

## Markup
```html
<div class="cbf-wizard-step cbf-wizard-step--confirm" data-step="2" hidden="">
  <div class="cbf-confirm">
    <div class="cbf-confirm__icon" aria-hidden="true">
      <svg
        width="52"
        height="52"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <h1 class="cbf-confirm__title">Invoice submitted</h1>
    <p class="cbf-confirm__body">
      Your invoice has been submitted for processing.<br />
      You'll receive a confirmation email at <strong>maria.garcia@pacificenv.com</strong>.
    </p>
    <p class="cbf-confirm__ref">
      Reference number: <strong data-confirm-ref="">&nbsp;</strong>
    </p>
    <div class="cbf-confirm__actions">
      <a href="/cb-fish-design/" class="cbf-confirm__link cbf-confirm__link--outline"
        >Return to home</a
      >
      <a href="/cb-fish-design/vendor-invoice" class="cbf-confirm__link"
        >Submit another invoice</a
      >
    </div>
  </div>
</div>
```

## Styles
```css
.cbf-wizard-step--confirm {
  display: flex;
  align-items: flex-start;
}
.cbf-wizard-step--confirm[hidden] {
  display: none;
}
```
