# Full page

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **legacy-sow** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/legacy/sow/
- **Section element:** `<page>`
- **Components:** esa-button (hub), esa-icon (hub)

## Markup (de-scoped, framework-free)
```html
<div class="legacy-chrome">
  <div class="legacy-chrome__utilitybar">
    <div class="legacy-chrome__utilitybar-inner">
      <span>Data management</span> <span>System status</span> <span>System configuration</span>
    </div>
  </div>
  <div class="legacy-chrome__appbar">
    <div class="legacy-chrome__appbar-inner">
      <a class="legacy-chrome__brand" href="#">
        <img
          class="legacy-chrome__logo"
          src="/cb-fish-design/images/legacy/Modern-Nav-Logo.svg"
          width="48"
          height="48"
          alt=""
        />
        <img
          class="legacy-chrome__logotype"
          src="/cb-fish-design/images/legacy/Modern-Nav-Logo-Type.svg"
          width="190"
          height="47"
          alt="Columbia Basin Fish &amp; Wildlife Program"
        />
      </a>
      <nav class="legacy-chrome__nav">
        <span class="legacy-chrome__navitem">
          <img
            src="/cb-fish-design/images/legacy/Nav-Mitigationwork.svg"
            alt=""
            width="16"
            height="16"
          />
          Mitigation work
          <img
            class="legacy-chrome__navcaret"
            src="/cb-fish-design/images/legacy/Nav-Down-arrow.svg"
            alt=""
            width="9"
            height="9"
          /> </span
        ><span class="legacy-chrome__navitem">
          <img
            src="/cb-fish-design/images/legacy/Nav-Reporting.svg"
            alt=""
            width="16"
            height="16"
          />
          Reporting
          <img
            class="legacy-chrome__navcaret"
            src="/cb-fish-design/images/legacy/Nav-Down-arrow.svg"
            alt=""
            width="9"
            height="9"
          /> </span
        ><span class="legacy-chrome__navitem">
          <img src="/cb-fish-design/images/legacy/Nav-Funding.svg" alt="" width="16" height="16" />
          Funding
          <img
            class="legacy-chrome__navcaret"
            src="/cb-fish-design/images/legacy/Nav-Down-arrow.svg"
            alt=""
            width="9"
            height="9"
          /> </span
        ><span class="legacy-chrome__navitem">
          <img
            src="/cb-fish-design/images/legacy/Nav-Dashboard.svg"
            alt=""
            width="16"
            height="16"
          />
          Dashboard </span
        ><span class="legacy-chrome__navitem">
          Recent
          <img
            class="legacy-chrome__navcaret"
            src="/cb-fish-design/images/legacy/Nav-Down-arrow.svg"
            alt=""
            width="9"
            height="9"
          />
        </span>
      </nav>
    </div>
  </div>
  <div class="legacy-chrome__messagebar"></div>
  <div class="legacy-container legacy-chrome__crumbrow">
    <ul class="legacy-chrome__crumbs">
      <span>Projects &amp; Contracts</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>Projects</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>2023-001-00</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>Contracts</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>84051 REL 50</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>SOW for Change Request (CCR) - APPROVED - CCR-53920</span>
    </ul>
    <a href="#" class="legacy-chrome__gotobtn">Go to… ▾</a>
  </div>
  <div class="legacy-container">
    <div class="legacy-panel">
      <div class="legacy-panel__tabbar">
        <ul class="legacy-chrome__tabs">
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Summary </span>
          </li>
          <li class="is-active">
            <a href="/cb-fish-design/legacy/sow" class="legacy-chrome__tab"> SOW </a>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> WE Budgets </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Status Reports </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Pre-Award </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Workflow </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Review SOW </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Email Archive </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Internal Notes </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Documents </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> COR File </span>
          </li>
        </ul>
      </div>
      <div class="legacy-panel__body">
        <p class="legacy-contract-header__help">
          Select a Contract Action to view its work statement elements. If a Contract Action has not
          been issued, only authorized users are allowed to view or work with the work statement
          elements.
        </p>
      </div>
    </div>
  </div>
</div>
<main class="legacy-sow-page">
  <div class="legacy-container">
    <h2 class="legacy-we-grid__title">
      Contract 84051 REL 50: 2023-001-00 EXP CTCR UPPER COLUMBIA HABITAT IMPROVEMENT PROJECT
    </h2>
    <div class="legacy-panel legacy-we-grid__wrap">
      <table class="legacy-we-grid">
        <thead>
          <tr>
            <th>Sort Order</th>
            <th>WE ID</th>
            <th>Work Element History</th>
            <th>Work Element Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>MS</th>
            <th>M</th>
            <th>L</th>
            <th>F</th>
            <th>EC</th>
            <th>RM</th>
            <th class="legacy-we-grid__hdcol">HD</th>
            <th>% of Total WSE Effective Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>H</td>
            <td>175</td>
            <td>Existing</td>
            <td>Produce Design</td>
            <td>Upper Chewuch Floodplain Enhancement</td>
            <td class="legacy-we-grid__desc">
              Design phase for reconnecting the Upper Chewuch River to its historic floodplain —
              draw the designed channel and floodplain extent, then compute pre- and post-project
              metrics for the SOW.
            </td>
            <td class="legacy-we-grid__num">
              <a href="/cb-fish-design/legacy/we-milestones" title="Open Milestones for WE H">13</a>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell legacy-we-grid__hdcol">
              <a href="/cb-fish-design/legacy/we" title="Open Habitat Design for WE H">
                <span class="legacy-dot legacy-dot--ring"></span>
              </a>
            </td>
            <td class="legacy-we-grid__num">5%</td>
          </tr>
          <tr>
            <td>M</td>
            <td>175</td>
            <td>Existing</td>
            <td>Produce Design</td>
            <td>Salmon Creek Floodplain Design</td>
            <td class="legacy-we-grid__desc">
              Salmon Creek has been identified as a priority reach for floodplain reconnection
              design work.
            </td>
            <td class="legacy-we-grid__num">
              <a href="/cb-fish-design/legacy/we-milestones" title="Open Milestones for WE M">13</a>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--ring"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell legacy-we-grid__hdcol">
              <a href="/cb-fish-design/legacy/we" title="Open Habitat Design for WE M">
                <span class="legacy-dot legacy-dot--ring"></span>
              </a>
            </td>
            <td class="legacy-we-grid__num">10%</td>
          </tr>
          <tr>
            <td>N</td>
            <td>175</td>
            <td>Existing</td>
            <td>Produce Design</td>
            <td>Omak Creek Instream Complexity</td>
            <td class="legacy-we-grid__desc">
              Design phase for adding instream structure and channel complexity along a degraded
              reach of Omak Creek.
            </td>
            <td class="legacy-we-grid__num">
              <a href="/cb-fish-design/legacy/we-milestones" title="Open Milestones for WE N">3</a>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--ring"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell legacy-we-grid__hdcol">
              <a href="/cb-fish-design/legacy/we" title="Open Habitat Design for WE N">
                <span class="legacy-dot legacy-dot--ring"></span>
              </a>
            </td>
            <td class="legacy-we-grid__num">10%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main>
<esa-dialog
  id="sow-intro-modal"
  heading="About this prototype"
  show-close-button="true"
  open=""
  size="md"
>
  <p class="legacy-sow-intro__body">
    This page recreates the real CBFish SOW screen to show where a new capability plugs in.
  </p>
  <p class="legacy-sow-intro__body">
    The <strong>HD</strong> (Habitat Design) column is new, and only appears for
    <strong>175. Produce Design</strong> work elements. Clicking it opens that work element's
    Habitat Design tab, where you can review any metrics already entered and launch the design tool.
  </p>
  <p class="legacy-sow-intro__body">
    There's also a new milestone — "Submit design with Habitat Design tool" — tracking this
    activity.
  </p>
  <div slot="footer">
    <span onclick="document.getElementById('sow-intro-modal').close()">
      <span
        class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-icon esa-icon--md" aria-hidden="true">
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
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </span>
          <span class="esa-button__label">Got it</span>
        </button></span
      >
    </span>
  </div>
</esa-dialog>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
:root,
[data-theme="cb-fish"] {
  --border-width-default: 1px;
  --button-radius-md: 0.5rem;
  --color-background-brand: #1e5386;
  --color-background-brand-hover: #1a4570;
  --color-background-elevation-floating: #fcfcfc;
  --color-background-elevation-raised: #fcfcfc;
  --color-background-overlay-backdrop: rgba(0, 0, 0, 0.5);
  --color-border-default-subtle: #efefef;
  --color-content-brand: #1e5386;
  --color-content-default: #3d3d3d;
  --color-content-default-knockout: #fcfcfc;
  --color-content-default-secondary: #525252;
  --color-content-link: #1e5386;
  --dialog-width: 480px;
  --focus-ring-color: #3e9b4f;
  --focus-ring-offset: 2px;
  --focus-ring-width: 2px;
  --font-size-200: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --icon-size-md: 20px;
  --radius-lg: 0.75rem;
  --radius-md: 0.5rem;
  --spacing-200: 0.5rem;
  --spacing-300: 0.75rem;
  --spacing-500: 1.5rem;
  --transition-fast: 0.15s ease;
  --typography-body-md-font-family: "IBM Plex Sans", sans-serif;
  --typography-body-md-font-size: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --typography-body-md-font-weight: 400;
  --typography-body-md-letter-spacing: 0.01em;
  --typography-body-md-line-height: 1.6;
  --typography-font-family-sans: "IBM Plex Sans", sans-serif;
  --typography-label-md-font-family: "IBM Plex Sans", sans-serif;
  --typography-label-md-font-size: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --typography-label-md-font-weight: 500;
  --typography-label-md-letter-spacing: 0.01em;
  --typography-label-md-line-height: 1.6;
  --typography-microcopy-md-font-family: "IBM Plex Sans", sans-serif;
  --typography-microcopy-md-font-size: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --typography-microcopy-md-font-weight: 500;
  --typography-microcopy-md-letter-spacing: 0.01em;
  --typography-microcopy-md-line-height: 1;
  --typography-title-font-family: "IBM Plex Sans", sans-serif;
  --typography-title-font-size: clamp(1rem, 0.88rem + 0.6vw, 1.25rem);
  --typography-title-font-weight: 500;
  --typography-title-letter-spacing: 0.01em;
  --typography-title-line-height: 1.6;
}

.typography-title {
  font-family: var(--typography-title-font-family);
  font-size: var(--typography-title-font-size);
  font-weight: var(--typography-title-font-weight);
  line-height: var(--typography-title-line-height);
  letter-spacing: var(--typography-title-letter-spacing);
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
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
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
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent-border, transparent);
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
.esa-button__label {
  white-space: nowrap;
}
:host {
  --_dialog-bg: var(--color-background-elevation-floating, #fcfcfc);
  --_dialog-border-radius: var(--radius-lg, 0.75rem);
  --_dialog-padding: var(--spacing-500, 1.5rem);
  --_dialog-header-border: var(--color-border-default-subtle, #d9d9d9);
  /* Header/footer surface tints. These were --dialog-header-bg /
         --dialog-footer-bg, declared in no token file — a hook offered on the
         strength of a fallback nobody had asked to override. Folded to their
         literal default 2026-08-16; --dialog-* is a live namespace, so they come
         back as declarations the day a spoke actually wants to frame the body. */
  --_dialog-header-bg: transparent;
  --_dialog-footer-bg: transparent;
  --_dialog-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
  --_dialog-width: var(--dialog-width, 480px);
  --_dialog-max-height: 85vh;
}
dialog.esa-dialog {
  /* UA reset. The UA sheet gives <dialog> a solid border, 1em padding and
         'max-width/max-height: calc(100% - 6px - 2em)'; without clearing those the
         panel renders inside a second, smaller box. */
  border: none;
  padding: 0;
  margin: auto;
  background: var(--_dialog-bg);
  color: var(--color-content-default, #202020);
  border-radius: var(--_dialog-border-radius);
  box-shadow: var(--_dialog-shadow);
  width: var(--_dialog-width);
  max-width: 100vw;
  max-height: var(--_dialog-max-height);
  overflow: hidden;
  font-family: var(--typography-font-family-sans, "DM Sans", sans-serif);
}
dialog.esa-dialog[open] {
  display: flex;
  flex-direction: column;
}
dialog.esa-dialog::backdrop {
  background: var(--color-background-overlay-backdrop, rgba(0, 0, 0, 0.5));
}
.esa-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-300, 0.75rem);
  padding: var(--_dialog-padding);
  background: var(--_dialog-header-bg);
  border-bottom: var(--border-width-default, 1px) solid var(--_dialog-header-border);
  flex-shrink: 0;
}
.esa-dialog__title {
  margin: 0;
  color: var(--color-content-default, #202020);
}
.esa-dialog__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius-md, 0.5rem);
  background: transparent;
  color: var(--color-content-default-secondary, #646464);
  cursor: pointer;
  transition: background var(--transition-fast, 150ms ease);
}
.esa-dialog__body {
  padding: var(--_dialog-padding);
  overflow-y: auto;
  flex: 1;
  color: var(--color-content-default, #202020);
}
.esa-dialog__footer {
  padding: var(--spacing-300, 0.75rem) var(--_dialog-padding);
  background: var(--_dialog-footer-bg);
  border-top: var(--border-width-default, 1px) solid var(--_dialog-header-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-200, 0.5rem);
  flex-shrink: 0;
}
.esa-dialog__close:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
}
:host {
  all: initial;
}
.host-root {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483000;
  font-family: system-ui, sans-serif;
}
.host-root > * {
  pointer-events: auto;
}
.launch {
  position: fixed;
  bottom: 22px;
  left: 22px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 19px;
  border-radius: 999px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  border: 1px solid #3d6fd6;
  background: linear-gradient(180deg, #1f6feb, #1551c4);
  box-shadow:
    0 10px 28px -8px rgba(31, 111, 235, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease;
}
.launch svg {
  flex: none;
}
.panel {
  position: fixed;
  top: 18px;
  right: 18px;
  bottom: 18px;
  width: min(720px, 94vw);
  display: flex;
  flex-direction: column;
  color: #ffffff;
  border-radius: 16px;
  background: linear-gradient(155deg, rgba(26, 31, 40, 0.74), rgba(11, 15, 21, 0.86));
  backdrop-filter: blur(26px) saturate(150%);
  -webkit-backdrop-filter: blur(26px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 28px 70px -18px rgba(0, 0, 0, 0.62),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  font-size: 12.5px;
  overflow: hidden;
  /* slide in from the right */
  transform: translateX(calc(100% + 32px));
  opacity: 0;
  visibility: hidden;
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.22s ease,
    visibility 0s linear 0.3s;
}
.head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
.head strong {
  font-size: 14px;
}
.head .sub {
  flex: 1;
  color: #ccd5e0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.x {
  border: 0;
  background: none;
  color: #c4cdd8;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.picker {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chip {
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: #eef2f6;
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.12s ease,
    background 0.12s ease,
    color 0.12s ease;
}
.chip.on {
  background: rgba(31, 111, 235, 0.28);
  border-color: #4493f8;
  color: #fff;
  font-weight: 600;
}
.tabs {
  display: flex;
  gap: 4px;
  padding: 9px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
.tabs button {
  padding: 5px 12px;
  border: 0;
  border-radius: 6px;
  background: none;
  color: #ccd5e0;
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
}
.tabs button.on {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}
.body {
  overflow: auto;
  padding: 13px 16px;
  flex: 1;
}
.hint {
  margin: 0;
  color: #c4cdd8;
  line-height: 1.6;
}
.footer {
  position: relative;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 11px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.18);
}
[hidden] {
  display: none !important;
}
.cpreview {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: calc(100% + 8px);
  background: rgba(13, 17, 23, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  box-shadow: 0 18px 50px -14px rgba(0, 0, 0, 0.7);
  padding: 12px 14px;
  max-height: 50vh;
  overflow: auto;
}
.copy {
  color: #eef2f6;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
}
.footer button {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 8px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
}
.claude {
  color: #fff;
  border: 1px solid #d97757;
  background: linear-gradient(180deg, #e0805f, #c25e3c);
  box-shadow:
    0 6px 18px -6px rgba(217, 119, 87, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.claude svg {
  flex: none;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
  color: var(--color-content-default, #171717);
  background: var(--color-background-elevation-raised, #fff);
  -webkit-font-smoothing: antialiased;
}
a {
  color: var(--color-content-link, #1e5386);
  text-decoration: none;
}
img {
  display: block;
  max-width: 100%;
}
button {
  font-family: inherit;
  cursor: pointer;
  background: none;
  border: 0;
}
.legacy-chrome {
  background: #dadada;
  display: flow-root;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  color: #333;
}
.legacy-chrome__utilitybar {
  background: #13273e;
  font-size: 14px;
  font-family:
    IBM Plex Sans,
    sans-serif;
  color: #fff;
}
.legacy-chrome__utilitybar-inner {
  width: 100%;
  box-sizing: border-box;
  padding: 17px 20px;
  display: flex;
  gap: 24px;
}
.legacy-chrome__appbar {
  background: var(--color-background-brand, #1e5386);
  min-height: 80px;
}
.legacy-chrome__appbar-inner {
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}
.legacy-chrome__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.legacy-chrome__logo,
.legacy-chrome__logotype {
  display: block;
}
.legacy-chrome__nav {
  display: flex;
  gap: 26px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}
.legacy-chrome__navitem {
  display: flex;
  align-items: center;
  gap: 7px;
}
.legacy-chrome__navcaret {
  opacity: 0.85;
}
.legacy-chrome__messagebar {
  background: #fff;
  height: 48px;
}
.legacy-container {
  width: 100%;
  margin: 0 auto;
  padding-inline: 15px;
  box-sizing: border-box;
}
.legacy-container {
  width: 780px;
  padding-inline: 0;
}
.legacy-container {
  width: 1000px;
}
.legacy-container {
  width: 1200px;
}
.legacy-chrome__crumbrow {
  background: #dadada;
  padding-block: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
:where(h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd, ul, ol, pre) {
  margin: 0;
}
.legacy-chrome__crumbs {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.legacy-chrome__crumbsep {
  margin: 0 6px;
  color: #999;
}
.legacy-chrome__gotobtn {
  background: #5bc0de;
  color: #fff;
  font-size: 13px;
  padding: 3px 12px;
  border: 1px solid #46b8da;
  border-radius: 4px;
  text-decoration: none;
  white-space: nowrap;
}
.legacy-panel {
  background: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px #0000000d;
  margin: 0 0 20px;
}
.legacy-panel__tabbar {
  padding: 20px 0 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
.legacy-chrome__tabs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}
.legacy-chrome__tabs li {
  background: #dadada;
}
.legacy-chrome__tab {
  display: block;
  padding: 10px 7px;
  font-size: 14px;
  color: #007090;
  text-decoration: none;
}
.legacy-chrome__tab--inert {
  cursor: default;
}
.legacy-chrome__tabs li.is-active {
  background: #42a2c1;
}
.legacy-chrome__tabs li.is-active .legacy-chrome__tab {
  color: #fff;
  text-decoration: none;
}
.legacy-panel__body {
  padding: 0 15px 15px;
}
.legacy-contract-header__help {
  font-family: Montserrat, sans-serif;
  font-size: 13px;
  color: #333;
  max-width: 900px;
  margin: 0;
}
.legacy-sow-page {
  background: #dadada;
  min-height: calc(100vh - 260px);
  padding-block: 20px;
}
.legacy-we-grid__title {
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin: 0 0 14px;
}
.legacy-we-grid__wrap {
  font-family: Montserrat, sans-serif;
  overflow-x: auto;
}
.legacy-we-grid {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
  background: #fff;
}
.legacy-we-grid th {
  background: transparent;
  border: 1px solid #ddd;
  padding: 5px 8px;
  text-align: left;
  font-weight: 700;
  color: #333;
  white-space: nowrap;
}
.legacy-we-grid__hdcol {
  background: #eaf6fa;
}
.legacy-we-grid td {
  border: 1px solid #ddd;
  padding: 5px 8px;
  vertical-align: top;
  color: #333;
}
.legacy-we-grid__desc {
  max-width: 320px;
}
.legacy-we-grid__num {
  text-align: right;
  white-space: nowrap;
}
.legacy-we-grid a {
  color: #007090;
  text-decoration: none;
}
.legacy-we-grid__dotcell {
  text-align: center;
}
.legacy-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.legacy-dot--filled {
  background: #007090;
}
.legacy-dot--ring {
  background: transparent;
  border: 2px solid #007090;
}
.legacy-sow-intro__body {
  margin: 0 0 var(--spacing-300, 12px);
  font-size: var(--font-size-200, 15px);
  line-height: 1.5;
  color: var(--color-content-default-secondary, #404040);
}
.legacy-sow-intro__body:last-of-type {
  margin-bottom: 0;
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--button-radius-md` | `.5rem` | component |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-elevation-floating` | `#fcfcfc` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-overlay-backdrop` | `rgba(0, 0, 0, .5)` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-link` | `#1e5386` | semantic |
| `--dialog-width` | `480px` | component |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--font-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |
| `--icon-size-md` | `20px` | primitive |
| `--radius-lg` | `.75rem` | semantic |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
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
| `--typography-title-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-title-font-size` | `clamp(1rem, .88rem + .6vw, 1.25rem)` | semantic |
| `--typography-title-font-weight` | `500` | semantic |
| `--typography-title-letter-spacing` | `.01em` | semantic |
| `--typography-title-line-height` | `1.6` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
