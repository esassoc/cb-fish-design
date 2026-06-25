# Invoice rail

Left sidebar (260px) that holds the vertical step indicator and a read-only vendor identity card. The rail shows where the user is in the wizard and who is submitting the invoice.

## Key decisions
- Stepper marks the active step with .is-active and completed steps with .is-done — classes are toggled by invoice-wizard.client.ts, not Astro.
- Vendor card is read-only (company, contact, email); it never accepts input.
- Rail becomes a horizontal top bar below 960px; vendor card is hidden entirely below 600px.

## Gotchas
- Connector lines between stepper circles are colored by JS on each goTo() call — do not try to color them with CSS alone.
- Step labels in the rail must match the STEPS array in vendor-invoice.astro exactly.

## Markup
```html
<aside class="cbf-invoice-rail">
  <nav class="cbf-stepper" data-stepper="" aria-label="Submission steps">
    <div class="cbf-stepper__item is-active" data-stepper-step="0">
      <div class="cbf-stepper__circle" aria-hidden="true">
        <svg
          class="cbf-stepper__check"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="cbf-stepper__num">1</span>
      </div>
      <span class="cbf-stepper__label">Invoice details</span>
    </div>
    <div class="cbf-stepper__line" aria-hidden="true"></div>
    <div class="cbf-stepper__item" data-stepper-step="1">
      <div class="cbf-stepper__circle" aria-hidden="true">
        <svg
          class="cbf-stepper__check"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="cbf-stepper__num">2</span>
      </div>
      <span class="cbf-stepper__label">Review &amp; submit</span>
    </div>
  </nav>
  <div class="cbf-vendor-card">
    <p class="cbf-vendor-card__eyebrow">Submitting as</p>
    <p class="cbf-vendor-card__name">Pacific Environmental Services, LLC</p>
    <p class="cbf-vendor-card__contact">Maria Garcia</p>
    <p class="cbf-vendor-card__email">maria.garcia@pacificenv.com</p>
  </div>
</aside>
```

## Styles
```css
.cbf-invoice-rail {
  flex: 0 0 260px;
  border-right: 1px solid var(--color-border);
  padding: var(--spacing-600) var(--spacing-500);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-600);
  background: var(--color-surface-sunken, #f8f9fb);
}
.cbf-stepper {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.cbf-stepper__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
}
.cbf-stepper__circle {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}
.cbf-stepper__item.is-active .cbf-stepper__circle {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
.cbf-stepper__check {
  display: none;
  color: var(--color-surface);
}
.cbf-stepper__num {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  line-height: 1;
}
.cbf-stepper__item.is-active .cbf-stepper__num {
  color: var(--color-surface);
}
.cbf-stepper__label {
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  transition: color 0.15s ease;
}
.cbf-stepper__item.is-active .cbf-stepper__label {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}
.cbf-stepper__line {
  width: 2px;
  height: 28px;
  background: var(--color-border);
  margin-left: 13px;
  margin-block: 2px;
  border-radius: 1px;
  transition: background 0.15s ease;
}
.cbf-vendor-card {
  padding: var(--spacing-400);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  background: var(--color-surface);
}
.cbf-vendor-card__eyebrow {
  margin: 0 0 var(--spacing-150);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.cbf-vendor-card__name {
  margin: 0 0 var(--spacing-150);
  font-size: 13px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 1.35;
}
.cbf-vendor-card__contact {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}
.cbf-vendor-card__email {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
}
```

## Tokens
- `--color-border`: #dcdcdc _(semantic)_
- `--color-primary`: #1e5386 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-surface-sunken`: #f3f7fc _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--font-weight-semibold`: 600 _(primitive)_
- `--radius-100`: .25rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
