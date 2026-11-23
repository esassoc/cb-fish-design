# Record header

Project header navigation · source prototype: https://esassoc.github.io/cb-fish-design/project-nav/summary/

![Record header, desktop](https://esassoc.github.io/cb-fish-design/handoff/project-nav-summary/claude/record-header.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/project-nav-summary/claude/record-header.phone.png

The project identity: number as eyebrow, title as the page H1 in brand navy, the project status badge inline after the title, a line naming the current fiscal year and linking that year's contract, and the row of area menus underneath.

## Key decisions

- No lifecycle track. A project spans many years and runs a new contract each fiscal year, so its pages do not move through phases the way a contract's do.
- The fiscal year is the project's date. The year line links that year's contract with the contract's own status badge, since the contract is the hop people make most from a project.
- Labels are Title Case, matching prod and the contract header (Andy's call for this prototype; it overrides docs/copy-style.md here).

## Gotchas

- Project status, fiscal year and the linked contract are mock.

## Components

- `cbf-page-menu` (spoke) · `src/components/contract-nav/cbf-page-menu.astro`
- `cbf-project-year` (spoke) · `src/components/contract-nav/cbf-project-year.astro`
- `cbf-record-ends` (spoke) · `src/components/contract-nav/cbf-record-ends.astro`
- `cbf-record-header` (spoke) · `src/components/contract-nav/cbf-record-header.astro`
- `esa-badge` (hub) · `packages/ecology/src/components/esa-badge.astro`
- `esa-button` (hub) · `packages/ecology/src/components/esa-button.astro`
- `esa-icon` (hub) · `packages/ecology/src/components/esa-icon.astro`
- `esa-nav-dropdown` (hub) · `packages/ecology/src/components/esa-nav-dropdown.astro`

## Behavior

- `src/components/contract-nav/cbf-project-frame.astro`
- `src/components/contract-nav/cbf-record-header.astro`
- `src/components/contract-nav/cbf-project-year.astro`
- `src/data/project-nav.mjs`

## Markup

_19 repeated elements are collapsed in the markup below; the comments say where._

```html
<div class="cbf-record-header stack" data-gap="lg">
  <div class="repel" data-gap="md">
    <div class="stack" data-gap="2xs">
      <p class="cbf-record-header__eyebrow typography-label-md">Project 2027-004-00</p>
      <div class="cluster" data-gap="sm">
        <h1 class="cbf-record-header__title typography-heading-lg">
          Upper Grande Ronde habitat restoration
        </h1>
        <span class="esa-badge esa-badge--success esa-badge--md typography-microcopy-sm-strong">
          <span class="esa-badge__text">Ongoing</span>
        </span>
      </div>
    </div>
  </div>
  <p class="cbf-project-year cluster typography-body-sm" data-gap="xs">
    <span class="cbf-project-year__fy">FY2027 contract</span>
    <a class="cbf-project-year__link" href="/cb-fish-design/contract-nav/v3/summary">CR-387553</a>
    <span class="esa-badge esa-badge--success esa-badge--sm typography-microcopy-xs-strong">
      <span class="esa-badge__text">Issued</span>
    </span>
  </p>
  <nav
    class="cbf-record-ends cluster cbf-record-ends--row"
    data-gap="2xs"
    aria-label="Project"
    data-record-nav=""
  >
    <div class="cbf-record-ends__menu" data-here="">
      <details class="esa-nav-dropdown esa-nav-dropdown--start">
        <summary
          class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
        >
          <span class="esa-button__native typography-microcopy-md"
            ><span class="esa-button__label">Overview</span
            ><span class="esa-icon esa-icon--md" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </span>
          </span>
        </summary>
        <div class="esa-nav-dropdown__panel typography-body-md">
          <ul class="cbf-page-menu typography-body-md cbf-page-menu--list">
            <li>
              <a href="/cb-fish-design/project-nav/summary" aria-current="page">Project Summary</a>
            </li>
            <li><a href="/cb-fish-design/project-nav/edit">Edit Project</a></li>
            <!-- …and 9 more like this (<li>) -->
          </ul>
        </div>
      </details>
    </div>
    <div class="cbf-record-ends__menu">
      <details class="esa-nav-dropdown esa-nav-dropdown--start">
        <summary
          class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
        >
          <span class="esa-button__native typography-microcopy-md"
            ><span class="esa-button__label">Proposals and Reviews</span
            ><span class="esa-icon esa-icon--md" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </span>
          </span>
        </summary>
        <div class="esa-nav-dropdown__panel typography-body-md">
          <ul class="cbf-page-menu typography-body-md cbf-page-menu--list">
            <li><a href="/cb-fish-design/project-nav/proposals">Proposals</a></li>
            <li><a href="/cb-fish-design/project-nav/isrp-assessments">ISRP Assessments</a></li>
            <!-- …and 5 more like this (<li>) -->
          </ul>
        </div>
      </details>
    </div>
    <!-- …and 5 more like this (<div class="cbf-record-ends__menu">) -->
  </nav>
</div>
```

## Styles

```css
.typography-heading-lg {
  font-family: var(--typography-heading-lg-font-family);
  font-size: var(--typography-heading-lg-font-size);
  font-weight: var(--typography-heading-lg-font-weight);
  line-height: var(--typography-heading-lg-line-height);
  letter-spacing: var(--typography-heading-lg-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
.typography-microcopy-xs-strong {
  font-family: var(--typography-microcopy-xs-strong-font-family);
  font-size: var(--typography-microcopy-xs-strong-font-size);
  font-weight: var(--typography-microcopy-xs-strong-font-weight);
  line-height: var(--typography-microcopy-xs-strong-line-height);
  letter-spacing: var(--typography-microcopy-xs-strong-letter-spacing);
}
.typography-microcopy-sm-strong {
  font-family: var(--typography-microcopy-sm-strong-font-family);
  font-size: var(--typography-microcopy-sm-strong-font-size);
  font-weight: var(--typography-microcopy-sm-strong-font-weight);
  line-height: var(--typography-microcopy-sm-strong-line-height);
  letter-spacing: var(--typography-microcopy-sm-strong-letter-spacing);
}
.esa-icon {
  --_icon-size: var(--icon-size-md, 20px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  color: inherit;
}
.esa-icon--md {
  --_icon-size: var(--icon-size-md, 20px);
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-button {
  --_btn-pad-y: var(--spacing-300, 0.75rem);
  --_btn-padding-x: var(--spacing-300, 0.75rem);
  --_btn-radius: var(--button-radius-md, 0.5rem);
  --_accent: var(--color-background-brand, #46a758);
  --_accent-hover: var(--color-background-brand-hover, #3e9b4f);
  --_on: var(--color-content-default-knockout, #fcfcfc);
  --_accent-text: var(--_accent);
  --_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);
  --_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);
  display: inline-block;
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent-border, transparent);
}
.esa-button--appearance-fill .esa-button__native:hover:not(:disabled) {
  background: var(--_accent-hover);
}
.esa-button--appearance-fill.esa-button--active .esa-button__native {
  background: var(--_accent-hover);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button--appearance-dashed .esa-button__native {
  border-style: dashed;
}
.esa-button--appearance-outline .esa-button__native:hover:not(:disabled),
.esa-button--appearance-dashed .esa-button__native:hover:not(:disabled) {
  background: var(--_btn-tint-hover);
}
.esa-button--appearance-outline.esa-button--active .esa-button__native,
.esa-button--appearance-dashed.esa-button--active .esa-button__native {
  background: var(--_btn-tint-active);
}
.esa-button--appearance-soft .esa-button__native {
  background: color-mix(
    in srgb,
    var(--color-background-elevation-sunken, #f0f0f0) 45%,
    var(--color-background-elevation-raised, #fcfcfc)
  );
  color: var(--_accent-text);
  border-color: var(--color-border-default-strong, #bbbbbb);
}
.esa-button--appearance-soft .esa-button__native:hover:not(:disabled),
.esa-button--appearance-soft.esa-button--active .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent);
}
.esa-button--variant-ghost .esa-button__native {
  background: transparent;
  color: var(--color-content-default, #202020);
  border-color: transparent;
}
.esa-button--variant-ghost.esa-button--appearance-outline .esa-button__native,
.esa-button--variant-ghost.esa-button--appearance-dashed .esa-button__native {
  border-color: var(--color-border-default, #cecece);
}
.esa-button--variant-ghost .esa-button__native:hover:not(:disabled),
.esa-button--variant-ghost.esa-button--active .esa-button__native {
  background: var(--color-background-elevation-sunken, #f0f0f0);
}
.esa-button--variant-chrome .esa-button__native {
  background: transparent;
  color: inherit;
  border-color: transparent;
}
.esa-button--variant-chrome .esa-button__native:hover:not(:disabled),
.esa-button--variant-chrome.esa-button--active .esa-button__native,
.esa-button--variant-chrome.esa-button--current .esa-button__native {
  background: var(--button-chrome-bg-hover, color-mix(in srgb, currentColor 14%, transparent));
}
.esa-button--variant-chrome .esa-button__native:focus-visible {
  outline-color: currentColor;
}
.esa-button__native {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200, 8px);
  width: 100%;
  padding-block: var(--_btn-pad-y);
  padding-inline: var(--_btn-padding-x);
  border: var(--border-width-default, 1px) solid transparent;
  border-radius: var(--_btn-radius);
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--transition-fast, 0.15s ease),
    border-color var(--transition-fast, 0.15s ease);
  -webkit-appearance: none;
  appearance: none;
}
.esa-button__native:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
}
.esa-button--icon-only .esa-button__native {
  padding-inline: var(--_btn-pad-y);
  aspect-ratio: 1;
}
summary.esa-button {
  list-style: none;
  cursor: pointer;
}
summary.esa-button::-webkit-details-marker {
  display: none;
}
summary.esa-button:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
  border-radius: var(--_btn-radius);
}
summary.esa-button--variant-chrome:focus-visible {
  outline-color: currentColor;
}
.esa-button__label {
  white-space: nowrap;
}
.cbf-qa-icon .esa-button__native > .esa-icon:last-child {
  display: none;
}
.cbf-qa-icon .esa-button__native:after {
  content: "";
  flex: none;
  inline-size: 9px;
  block-size: 5px;
  background: currentColor;
  mask: var(--qa-down) center / contain no-repeat;
  transition: transform 0.15s ease;
}
.cbf-qa-icon details[open] > summary .esa-button__native:after {
  transform: rotate(180deg);
}
.cbf-qa-icon .esa-button__native:before,
.cbf-qa-icon__glyph {
  content: "";
  display: inline-block;
  flex: none;
  inline-size: var(--qa-w);
  block-size: var(--qa-h);
  background: currentColor;
  mask: var(--qa-icon) center / contain no-repeat;
}
.typography-heading-lg {
  font-family: var(--typography-heading-lg-font-family);
  font-size: var(--typography-heading-lg-font-size);
  font-weight: var(--typography-heading-lg-font-weight);
  line-height: var(--typography-heading-lg-line-height);
  letter-spacing: var(--typography-heading-lg-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
.typography-microcopy-xs-strong {
  font-family: var(--typography-microcopy-xs-strong-font-family);
  font-size: var(--typography-microcopy-xs-strong-font-size);
  font-weight: var(--typography-microcopy-xs-strong-font-weight);
  line-height: var(--typography-microcopy-xs-strong-line-height);
  letter-spacing: var(--typography-microcopy-xs-strong-letter-spacing);
}
.typography-microcopy-sm-strong {
  font-family: var(--typography-microcopy-sm-strong-font-family);
  font-size: var(--typography-microcopy-sm-strong-font-size);
  font-weight: var(--typography-microcopy-sm-strong-font-weight);
  line-height: var(--typography-microcopy-sm-strong-line-height);
  letter-spacing: var(--typography-microcopy-sm-strong-letter-spacing);
}
.cbf-project-year {
  margin: 0;
  color: var(--color-content-default-secondary);
}
.cbf-project-year__fy {
  color: var(--color-content-default);
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-project-year__link {
  color: var(--color-content-brand);
  font-weight: var(--typography-font-weight-medium);
}
.esa-nav-dropdown {
  position: relative;
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.esa-nav-dropdown[open] .esa-button__native > .esa-icon:last-child {
  transform: rotate(180deg);
}
.esa-nav-dropdown__panel {
  position: absolute;
  top: calc(100% + var(--spacing-200, 8px));
  left: 0;
  z-index: var(--z-dropdown, 50);
  min-width: var(--nav-dropdown-panel-min-width, 240px);
  padding: var(--spacing-300, 12px);
  background: var(--color-background-elevation-raised, #fcfcfc);
  color: var(--color-content-default, #202020);
  border: var(--border-width-default, 1px) solid var(--color-border-default, #cecece);
  border-radius: var(--radius-md, 0.5rem);
  box-shadow: var(--elevation-4, 0 6px 24px -6px rgba(0, 0, 0, 0.07));
}
.esa-nav-dropdown--end .esa-nav-dropdown__panel {
  left: auto;
  right: 0;
}
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.stack[data-split] > [data-split] {
  margin-block-end: auto;
}
.cluster {
  --gap: var(--spacing-300, 0.75rem);
  --align: center;
  --justify: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: var(--justify);
}
.repel {
  --gap: var(--spacing-400, 1rem);
  --align: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: space-between;
}
.cbf-record-header {
  padding-block-end: var(--spacing-400);
}
.cbf-record-header__eyebrow {
  margin: 0;
  color: var(--color-content-default-secondary);
}
.cbf-record-header__title {
  margin: 0;
  color: var(--color-background-default-knockout);
}
.cbf-page-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 15rem;
}
.cbf-page-menu a {
  display: block;
  padding: var(--spacing-150, 6px) var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-content-default);
  text-decoration: none;
  white-space: nowrap;
}
.cbf-page-menu a:hover {
  background: var(--color-background-elevation-sunken);
}
.cbf-page-menu a[aria-current="page"] {
  background: var(--color-background-elevation-sunken);
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-record-ends__menu {
  color: var(--color-content-default-secondary);
}
.cbf-record-ends__menu[data-here] {
  color: var(--color-content-default);
}
.cbf-record-ends__menu[data-here] .esa-button.esa-button .esa-button__native {
  background: var(--color-background-brand);
  color: var(--color-content-on-brand);
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-record-ends--row {
  padding-block-end: var(--spacing-300);
  border-block-end: 1px solid var(--color-border-default);
}
.cbf-record-ends--row .cbf-record-ends__menu {
  color: var(--color-content-default);
}
.esa-collapsible__summary .esa-icon {
  flex-shrink: 0;
  color: var(--color-content-default-secondary, #646464);
}
.esa-badge {
  --_badge-bg: var(--badge-bg, var(--color-background-elevation-raised, #fcfcfc));
  --_badge-text: var(--badge-text-color, var(--color-content-default-secondary, #646464));
  --_badge-border: var(--badge-border-color, var(--color-border-default, #cecece));
  --_badge-padding-y: var(--spacing-150, 0.375rem);
  --_badge-padding-x: var(--spacing-200, 0.5rem);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: calc(1lh + 2 * var(--_badge-padding-y));
  padding-block: var(--_badge-padding-y);
  padding-inline: var(--_badge-padding-x);
  border-radius: var(--radius-chip, var(--radius-sm, 0.25rem));
  background: var(--_badge-bg);
  color: var(--_badge-text);
  white-space: nowrap;
  box-sizing: border-box;
}
.esa-badge--sm {
  --_badge-padding-y: var(--spacing-100, 0.25rem);
  --_badge-padding-x: var(--spacing-150, 0.375rem);
}
.esa-badge--success {
  --_badge-bg: var(--color-background-utility-success-muted, #e6f6eb);
  --_badge-text: var(--color-content-utility-success, #218358);
  --_badge-border: var(--color-border-utility-success, #adddc0);
}
.esa-badge--neutral:not(.esa-badge--dot),
.esa-badge--success:not(.esa-badge--dot),
.esa-badge--warning:not(.esa-badge--dot),
.esa-badge--danger:not(.esa-badge--dot),
.esa-badge--info:not(.esa-badge--dot) {
  border: 1px solid var(--_badge-border, transparent);
}
.esa-badge--dot.esa-badge--success {
  --_badge-bg: var(--color-background-utility-success-hover, #2b9a66);
}
@media (forced-colors: active) {
  .esa-badge {
    border: 1px solid CanvasText;
  }
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--badge-bg` | `#fcfcfc` | component |
| `--badge-border-color` | `#dcdcdc` | component |
| `--badge-text-color` | `#525252` | component |
| `--border-width-default` | `1px` | semantic |
| `--button-chrome-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--button-radius-md` | `.5rem` | component |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-success-hover` | `#193b2d` | semantic |
| `--color-background-utility-success-muted` | `#e6f6eb` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-utility-success` | `#adddc0` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-on-brand` | `#fcfcfc` | semantic |
| `--color-content-utility-success` | `#218358` | semantic |
| `--elevation-4` | `0 6px 24px -6px rgba(0, 0, 0, .07)` | semantic |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--gap` | `1.5rem` | component |
| `--icon-size-md` | `20px` | primitive |
| `--nav-dropdown-panel-min-width` | `240px` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-chip` | `.25rem` | semantic |
| `--radius-md` | `.5rem` | semantic |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-heading-lg-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-heading-lg-font-size` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | semantic |
| `--typography-heading-lg-font-weight` | `600` | semantic |
| `--typography-heading-lg-letter-spacing` | `-.01em` | semantic |
| `--typography-heading-lg-line-height` | `1.3` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |
| `--typography-microcopy-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-sm-strong-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-microcopy-sm-strong-font-weight` | `600` | semantic |
| `--typography-microcopy-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-sm-strong-line-height` | `1` | semantic |
| `--typography-microcopy-xs-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-strong-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-strong-font-weight` | `600` | semantic |
| `--typography-microcopy-xs-strong-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-strong-line-height` | `1` | semantic |
| `--z-dropdown` | `50` | semantic |
