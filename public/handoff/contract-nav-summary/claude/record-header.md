# Record header

Contract header navigation · source prototype: https://esassoc.github.io/cb-fish-design/contract-nav/summary/

![Record header, desktop](https://esassoc.github.io/cb-fish-design/handoff/contract-nav-summary/claude/record-header.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/contract-nav-summary/claude/record-header.phone.png

The contract identity: number as eyebrow, title as the page H1 in brand navy, the status badge inline after the title, and Overview and Files menus at the end of the title row. The lifecycle track sits underneath.

## Key decisions

- Overview and Files are always available, whatever the phase; they are not phases.
- Status badge per stage: Draft (neutral), In review (info), Issued (success), Change request pending (info), Closed (neutral).
- The menu holding the page you are on gets a filled brand trigger.
- Labels are Title Case, matching prod (Andy's call for this prototype; it overrides docs/copy-style.md here).

## Components

- `cbf-icon` (spoke) · `src/components/search/cbf-icon.astro`
- `cbf-lifecycle-track` (spoke) · `src/components/contract-nav/cbf-lifecycle-track.astro`
- `cbf-page-menu` (spoke) · `src/components/contract-nav/cbf-page-menu.astro`
- `cbf-record-ends` (spoke) · `src/components/contract-nav/cbf-record-ends.astro`
- `cbf-record-header` (spoke) · `src/components/contract-nav/cbf-record-header.astro`
- `cbf-record-lifecycle` (spoke) · `src/components/contract-nav/cbf-record-lifecycle.astro`
- `esa-badge` (hub) · `packages/ecology/src/components/esa-badge.astro`
- `esa-button` (hub) · `packages/ecology/src/components/esa-button.astro`
- `esa-icon` (hub) · `packages/ecology/src/components/esa-icon.astro`
- `esa-nav-dropdown` (hub) · `packages/ecology/src/components/esa-nav-dropdown.astro`

## Behavior

- `src/components/contract-nav/cbf-record-header.astro`
- `src/components/contract-nav/cbf-record-ends.astro`

## Markup

_27 repeated elements are collapsed in the markup below; the comments say where._

```html
<div class="cbf-record-header stack" data-gap="lg">
  <div class="repel" data-gap="md">
    <div class="stack" data-gap="2xs">
      <p class="cbf-record-header__eyebrow typography-label-md">Contract CR-387553</p>
      <div class="cluster" data-gap="sm">
        <h1 class="cbf-record-header__title typography-heading-lg">
          Upper Grande Ronde instream habitat restoration FY2027
        </h1>
        <span data-hide-stages="review issued change closed">
          <span class="esa-badge esa-badge--neutral esa-badge--md typography-microcopy-sm-strong">
            <span class="esa-badge__text">Draft</span>
          </span> </span
        ><span data-hide-stages="setup issued change closed">
          <span class="esa-badge esa-badge--info esa-badge--md typography-microcopy-sm-strong">
            <span class="esa-badge__text">In review</span>
          </span> </span
        ><!-- …and 3 more like this (<span>) -->
      </div>
    </div>
    <nav
      class="cbf-record-ends cluster cbf-record-ends--title"
      data-gap="2xs"
      aria-label="Contract Overview and Files"
      data-record-nav=""
    >
      <div class="cbf-record-ends__menu" data-here="">
        <details class="esa-nav-dropdown esa-nav-dropdown--end">
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
                <a href="/cb-fish-design/contract-nav/summary" aria-current="page"
                  >Contract summary</a
                >
              </li>
              <li><a href="/cb-fish-design/contract-nav/contacts">Contract contacts</a></li>
              <!-- …and 6 more like this (<li>) -->
            </ul>
          </div>
        </details>
      </div>
      <div class="cbf-record-ends__menu">
        <details class="esa-nav-dropdown esa-nav-dropdown--end">
          <summary
            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
          >
            <span class="esa-button__native typography-microcopy-md"
              ><span class="esa-button__label">Files</span
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
              <li><a href="/cb-fish-design/contract-nav/documents">Documents</a></li>
              <li data-hide-for="contractor">
                <a href="/cb-fish-design/contract-nav/cor-file">COR file</a>
              </li>
              <!-- …and 2 more like this (<li>) -->
            </ul>
          </div>
        </details>
      </div>
    </nav>
  </div>
  <nav
    class="cbf-record-lifecycle stack"
    data-gap="md"
    aria-label="Contract lifecycle"
    data-record-nav=""
    data-lifecycle=""
    data-stages='[{"key":"setup","label":"Setup","status":"Draft","variant":"neutral","phases":{"setup":["current",49,"Oct 5 – Dec 18, 20… [1411 characters]'
  >
    <ol class="cbf-lifecycle-track" aria-label="Contract lifecycle">
      <li
        class="cbf-lifecycle-track__phase"
        data-phase="setup"
        data-state="done"
        data-name="menu"
        data-hidden-for=""
        data-hidden-stages=""
      >
        <span class="cbf-lifecycle-track__when typography-eyebrow-sm">
          <span class="visually-hidden" data-state-label="">Finished, </span
          ><span data-when-text="">Jun 2 – Aug 14, 2026</span>
        </span>
        <span class="cbf-lifecycle-track__meter" aria-hidden="true"></span>
        <div class="cbf-lifecycle-track__name">
          <span class="cbf-lifecycle-track__status" aria-hidden="true">
            <span class="cbf-icon cbf-lifecycle-track__icon--done"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path></svg
            ></span>
            <span class="cbf-icon cbf-lifecycle-track__icon--current"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 18a6 6 0 0 0 0-12v12z"></path></svg
            ></span>
            <span class="cbf-icon cbf-lifecycle-track__icon--next"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M10.1 2.182a10 10 0 0 1 3.8 0"></path>
                <path d="M13.9 21.818a10 10 0 0 1-3.8 0"></path>
                <!-- …and 6 more like this (<path>) -->
              </svg></span
            >
          </span>
          <span class="cbf-lifecycle-track__text typography-label-md">Setup</span>
          <div class="cbf-lifecycle-track__menu">
            <details class="esa-nav-dropdown esa-nav-dropdown--start">
              <summary
                class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
              >
                <span class="esa-button__native typography-microcopy-md"
                  ><span class="esa-button__label">Setup</span
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
                  <li><a href="/cb-fish-design/contract-nav/pre-award">Pre-award</a></li>
                  <li data-hide-for="contractor">
                    <a href="/cb-fish-design/contract-nav/initialize-sow">Initialize SOW</a>
                  </li>
                  <!-- …and 2 more like this (<li>) -->
                </ul>
              </div>
            </details>
          </div>
        </div>
      </li>
      <li
        class="cbf-lifecycle-track__phase"
        data-phase="review"
        data-state="done"
        data-name="menu"
        data-hidden-for=""
        data-hidden-stages=""
      >
        <span class="cbf-lifecycle-track__when typography-eyebrow-sm">
          <span class="visually-hidden" data-state-label="">Finished, </span
          ><span data-when-text="">Aug 14 – Sep 22, 2026</span>
        </span>
        <span class="cbf-lifecycle-track__meter" aria-hidden="true"></span>
        <div class="cbf-lifecycle-track__name">
          <span class="cbf-lifecycle-track__status" aria-hidden="true">
            <span class="cbf-icon cbf-lifecycle-track__icon--done"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path></svg
            ></span>
            <span class="cbf-icon cbf-lifecycle-track__icon--current"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 18a6 6 0 0 0 0-12v12z"></path></svg
            ></span>
            <span class="cbf-icon cbf-lifecycle-track__icon--next"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M10.1 2.182a10 10 0 0 1 3.8 0"></path>
                <path d="M13.9 21.818a10 10 0 0 1-3.8 0"></path>
                <!-- …and 6 more like this (<path>) -->
              </svg></span
            >
          </span>
          <span class="cbf-lifecycle-track__text typography-label-md">Review and approve</span>
          <div class="cbf-lifecycle-track__menu">
            <details class="esa-nav-dropdown esa-nav-dropdown--start">
              <summary
                class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
              >
                <span class="esa-button__native typography-microcopy-md"
                  ><span class="esa-button__label">Review and approve</span
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
                  <li data-hide-stages="setup">
                    <a href="/cb-fish-design/contract-nav/review-sow">Review SOW</a>
                  </li>
                  <li><a href="/cb-fish-design/contract-nav/workflow">Workflow</a></li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </li>
      <!-- …and 2 more like this (<li class="cbf-lifecycle-track__phase">) -->
    </ol>
  </nav>
  <!-- script type="module" removed (1016 bytes) -->
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
.typography-microcopy-sm-strong {
  font-family: var(--typography-microcopy-sm-strong-font-family);
  font-size: var(--typography-microcopy-sm-strong-font-size);
  font-weight: var(--typography-microcopy-sm-strong-font-weight);
  line-height: var(--typography-microcopy-sm-strong-line-height);
  letter-spacing: var(--typography-microcopy-sm-strong-letter-spacing);
}
.typography-eyebrow-sm {
  font-family: var(--typography-eyebrow-sm-font-family);
  font-size: var(--typography-eyebrow-sm-font-size);
  font-weight: var(--typography-eyebrow-sm-font-weight);
  line-height: var(--typography-eyebrow-sm-line-height);
  letter-spacing: var(--typography-eyebrow-sm-letter-spacing);
  text-transform: var(--typography-eyebrow-sm-text-transform);
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}
.cbf-lifecycle-track {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: var(--spacing-200) var(--spacing-100);
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 0;
}
.cbf-lifecycle-track__phase {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-200);
  min-width: 0;
  color: var(--color-content-default-secondary);
}
.cbf-lifecycle-track__phase[data-state="current"] {
  color: var(--color-content-default);
}
.cbf-lifecycle-track__phase[data-state="next"] {
  color: var(--color-content-default-tertiary);
}
.cbf-lifecycle-track__meter {
  block-size: 6px;
  border-radius: var(--radius-full, 999px);
  background: var(--color-border-default);
}
.cbf-lifecycle-track__phase[data-state="done"] .cbf-lifecycle-track__meter {
  background: color-mix(in srgb, var(--color-content-default-tertiary) 45%, transparent);
}
.cbf-lifecycle-track__phase[data-state="current"] .cbf-lifecycle-track__meter {
  background: linear-gradient(
    to right,
    var(--color-background-brand) var(--phase-progress, 0%),
    color-mix(in srgb, var(--color-background-brand) 22%, transparent) var(--phase-progress, 0%)
  );
}
.cbf-lifecycle-track {
  margin-inline: calc(-1 * var(--spacing-300));
}
.cbf-lifecycle-track__phase {
  position: relative;
  padding: var(--spacing-200) var(--spacing-300) var(--spacing-100);
  border-radius: var(--radius-100);
}
.cbf-lifecycle-track__phase[data-name="menu"]:has(.cbf-lifecycle-track__menu :is(summary, a):hover),
.cbf-lifecycle-track__phase[data-name="menu"]:has(details[open]) {
  background: var(--color-background-elevation-sunken);
}
.cbf-lifecycle-track__phase:has(.cbf-lifecycle-track__menu :is(summary, a):focus-visible) {
  outline: 2px solid var(--color-background-brand);
  outline-offset: -2px;
}
.cbf-lifecycle-track__menu :is(summary, a).esa-button:focus-visible {
  outline: none;
}
.cbf-lifecycle-track__name {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
  min-block-size: 2.875rem;
  margin-block-start: calc(-1 * var(--spacing-100));
  min-width: 0;
}
.cbf-lifecycle-track__menu {
  min-width: 0;
}
.cbf-lifecycle-track__menu .esa-nav-dropdown {
  position: static;
}
.cbf-lifecycle-track__phase .cbf-lifecycle-track__menu .esa-button.esa-button .esa-button__native {
  padding-inline: 0;
  background: transparent;
}
.cbf-lifecycle-track__menu :is(summary, a).esa-button:after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
}
.cbf-lifecycle-track__menu .esa-nav-dropdown__panel {
  inset-inline-start: 0;
}
.cbf-lifecycle-track__status {
  display: inline-flex;
  flex: none;
}
.cbf-lifecycle-track__phase:not([data-state="done"]) .cbf-lifecycle-track__icon--done,
.cbf-lifecycle-track__phase:not([data-state="current"]) .cbf-lifecycle-track__icon--current,
.cbf-lifecycle-track__phase:not([data-state="next"]) .cbf-lifecycle-track__icon--next,
.cbf-lifecycle-track__phase[data-name="text"] .cbf-lifecycle-track__menu,
.cbf-lifecycle-track__phase[data-name="menu"] .cbf-lifecycle-track__text {
  display: none;
}
.cbf-lifecycle-track__phase[data-state="done"] .cbf-lifecycle-track__status {
  color: var(--color-content-success);
}
.cbf-lifecycle-track__phase[data-state="current"] .cbf-lifecycle-track__status {
  color: var(--color-background-brand);
}
.cbf-lifecycle-track__phase[data-state="next"] .cbf-lifecycle-track__status {
  color: var(--color-content-default-tertiary);
}
.cbf-lifecycle-track__status .cbf-lifecycle-track__icon--current path {
  fill: currentColor;
}
.cbf-lifecycle-track__phase[data-here],
.cbf-lifecycle-track__phase[data-here][data-name="menu"]:has(
    .cbf-lifecycle-track__menu :is(summary, a):hover
  ),
.cbf-lifecycle-track__phase[data-here][data-name="menu"]:has(details[open]) {
  background: var(--color-background-brand);
  color: var(--color-content-on-brand);
}
.cbf-lifecycle-track__phase[data-here] .cbf-lifecycle-track__status,
.cbf-lifecycle-track__phase[data-here] .cbf-lifecycle-track__when,
.cbf-lifecycle-track__phase[data-here] .cbf-lifecycle-track__text,
.cbf-lifecycle-track__phase[data-here] .cbf-lifecycle-track__menu .esa-button__native {
  color: var(--color-content-on-brand);
}
.cbf-lifecycle-track__phase[data-here] .cbf-lifecycle-track__text,
.cbf-lifecycle-track__phase[data-here] .cbf-lifecycle-track__menu .esa-button__native {
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-lifecycle-track__phase[data-here] .cbf-lifecycle-track__meter {
  background: color-mix(in srgb, var(--color-content-on-brand) 30%, transparent);
}
.cbf-lifecycle-track__phase[data-here][data-state="done"] .cbf-lifecycle-track__meter {
  background: color-mix(in srgb, var(--color-content-on-brand) 70%, transparent);
}
.cbf-lifecycle-track__phase[data-here][data-state="current"] .cbf-lifecycle-track__meter {
  background: linear-gradient(
    to right,
    var(--color-content-on-brand) var(--phase-progress, 0%),
    color-mix(in srgb, var(--color-content-on-brand) 30%, transparent) var(--phase-progress, 0%)
  );
}
@media (max-width: 63.99rem) {
  .cbf-lifecycle-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 29.99rem) {
  .cbf-lifecycle-track {
    grid-template-columns: minmax(0, 1fr);
  }
}
.cbf-record-lifecycle {
  border-bottom: 1px solid var(--color-border-default);
}
.cbf-record-phases__steps .cbf-icon {
  display: inline-flex;
}
.cbf-find-page .cbf-icon {
  display: inline-flex;
  color: var(--color-content-default-secondary);
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
.cbf-search-surface .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-search-surface .cbf-result-group__title .cbf-icon {
  color: var(--color-content-default-tertiary);
}
.cbf-person-card .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-person-card__label .cbf-icon {
  color: var(--color-background-brand-muted);
}
.cbf-nav-link .cbf-icon {
  display: inline-flex;
  align-items: center;
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
.typography-microcopy-sm-strong {
  font-family: var(--typography-microcopy-sm-strong-font-family);
  font-size: var(--typography-microcopy-sm-strong-font-size);
  font-weight: var(--typography-microcopy-sm-strong-font-weight);
  line-height: var(--typography-microcopy-sm-strong-line-height);
  letter-spacing: var(--typography-microcopy-sm-strong-letter-spacing);
}
.typography-eyebrow-sm {
  font-family: var(--typography-eyebrow-sm-font-family);
  font-size: var(--typography-eyebrow-sm-font-size);
  font-weight: var(--typography-eyebrow-sm-font-weight);
  line-height: var(--typography-eyebrow-sm-line-height);
  letter-spacing: var(--typography-eyebrow-sm-letter-spacing);
  text-transform: var(--typography-eyebrow-sm-text-transform);
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
.cbf-record-ends--row .cbf-record-ends__menu {
  color: var(--color-content-default);
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
.esa-collapsible__summary .esa-icon {
  flex-shrink: 0;
  color: var(--color-content-default-secondary, #646464);
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
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
.esa-badge--success {
  --_badge-bg: var(--color-background-utility-success-muted, #e6f6eb);
  --_badge-text: var(--color-content-utility-success, #218358);
  --_badge-border: var(--color-border-utility-success, #adddc0);
}
.esa-badge--info {
  --_badge-bg: var(--color-background-utility-info-muted, #e6f4fe);
  --_badge-text: var(--color-content-utility-info, #0d74ce);
  --_badge-border: var(--color-border-utility-info, #acd8fc);
}
.esa-badge--neutral:not(.esa-badge--dot),
.esa-badge--success:not(.esa-badge--dot),
.esa-badge--warning:not(.esa-badge--dot),
.esa-badge--danger:not(.esa-badge--dot),
.esa-badge--info:not(.esa-badge--dot) {
  border: 1px solid var(--_badge-border, transparent);
}
.esa-badge--dot.esa-badge--neutral {
  --_badge-bg: var(--color-content-default-secondary, #646464);
}
.esa-badge--dot.esa-badge--success {
  --_badge-bg: var(--color-background-utility-success-hover, #2b9a66);
}
.esa-badge--dot.esa-badge--info {
  --_badge-bg: var(--color-background-utility-info-hover, #0588f0);
}
@media (forced-colors: active) {
  .esa-badge {
    border: 1px solid CanvasText;
  }
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
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-info-hover` | `#113264` | semantic |
| `--color-background-utility-info-muted` | `#e6f4fe` | semantic |
| `--color-background-utility-success-hover` | `#193b2d` | semantic |
| `--color-background-utility-success-muted` | `#e6f6eb` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-utility-info` | `#c6dcf1` | semantic |
| `--color-border-utility-success` | `#adddc0` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--color-content-on-brand` | `#fcfcfc` | semantic |
| `--color-content-success` | `#218358` | component |
| `--color-content-utility-info` | `#0d74ce` | semantic |
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
| `--radius-full` | `9999px` | primitive |
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
| `--typography-eyebrow-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-eyebrow-sm-font-size` | `clamp(.5rem, .44rem + .3vw, .625rem)` | semantic |
| `--typography-eyebrow-sm-font-weight` | `600` | semantic |
| `--typography-eyebrow-sm-letter-spacing` | `.06em` | semantic |
| `--typography-eyebrow-sm-line-height` | `1.6` | semantic |
| `--typography-eyebrow-sm-text-transform` | `uppercase` | semantic |
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
| `--z-dropdown` | `50` | semantic |
