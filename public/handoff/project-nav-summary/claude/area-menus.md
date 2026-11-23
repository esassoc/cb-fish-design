# Area menus

Project header navigation · source prototype: https://esassoc.github.io/cb-fish-design/project-nav/summary/

![Area menus, desktop](https://esassoc.github.io/cb-fish-design/handoff/project-nav-summary/claude/area-menus.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/project-nav-summary/claude/area-menus.phone.png

Every page of today's project Go to menu, grouped into the areas agreed on 2026-11-10 at equal weight in one row: Overview, Proposals and Reviews, Budget, Contracts and Work, Spending, Results and Files. Each area opens a menu of its pages.

## Key decisions

- Today's page labels, with no merges, renames or removals. The nav holds 44 of the 45 Go to links; Back To Portfolio(s) moved to the portfolio return above the header.
- The menu holding the page you are on gets a filled brand trigger, the header's one "you are here" mark.
- Pages a role cannot see are hidden (data-hide-for). Admin sees everything; the COR loses system-admin and budgeter pages; a contractor also loses BPA-only and editor-only pages. An area with no pages for a role is hidden for that role.
- One menu open at a time; menus close on outside click, focus leaving and Esc, and stay inside the viewport. The row is ruled off from the page below.

## Gotchas

- Every role state is server-rendered; the role and arrival lenses only toggle attributes on <html> and the CSS in cbf-role-gate hides what they rule out. Switching to a role that cannot see the current page redirects to Project Summary.
- Page visibility per role is reduced from every-link-and-tab.md to the contract nav's three roles (Admin, COR, Contractor).

## Done when

- Every page of today's Go to menu, except Back To Portfolio(s), is reachable from the row in two clicks.
- You can tell which area you are in without opening a menu.

## Components

- `cbf-page-menu` (spoke) · `src/components/contract-nav/cbf-page-menu.astro`
- `cbf-record-ends` (spoke) · `src/components/contract-nav/cbf-record-ends.astro`
- `esa-button` (hub) · `packages/ecology/src/components/esa-button.astro`
- `esa-icon` (hub) · `packages/ecology/src/components/esa-icon.astro`
- `esa-nav-dropdown` (hub) · `packages/ecology/src/components/esa-nav-dropdown.astro`

## Behavior

- `src/components/contract-nav/cbf-record-ends.astro`
- `src/components/contract-nav/cbf-page-menu.astro`
- `src/components/contract-nav/cbf-role-gate.astro`
- `src/data/project-nav.mjs`

## Markup

_19 repeated elements are collapsed in the markup below; the comments say where._

```html
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
```

## Styles

```css
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
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
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
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
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--align` | `center` | component |
| `--border-width-default` | `1px` | semantic |
| `--button-chrome-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--button-radius-md` | `.5rem` | component |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-on-brand` | `#fcfcfc` | semantic |
| `--elevation-4` | `0 6px 24px -6px rgba(0, 0, 0, .07)` | semantic |
| `--focus-ring-color` | `#3e9b4f` | component |
| `--focus-ring-offset` | `2px` | component |
| `--focus-ring-width` | `2px` | component |
| `--gap` | `.25rem` | component |
| `--icon-size-md` | `20px` | primitive |
| `--justify` | `flex-start` | component |
| `--nav-dropdown-panel-min-width` | `240px` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |
| `--z-dropdown` | `50` | semantic |
