# Hub component issues

Issues found in the hub (`@esa/ecology` components and `@esa/tokens` layout primitives) during spoke development. Reported to the design system team for upstream fixes.

---

## esa-alert-box

### `variant` uses `"danger"` instead of `"error"`

**Status:** Open — needs upstream change  
**Affects:** All usages of `<EsaAlertBox variant="...">` where an error state is needed

**Problem:**  
The `variant` prop is typed as `'info' | 'success' | 'warning' | 'danger'`. Spoke authors and app developers reach for `"error"` by instinct (consistent with HTML form validation semantics, ARIA roles, and common design system conventions like Material, Spectrum, and Carbon). The mismatch produces a TS error and forces an unintuitive rename at every callsite.

**Requested change:**  
Add `"error"` as an accepted variant (either as an alias mapping to the `danger` CSS modifier, or as a renamed canonical value). If the design token side already uses `danger`, an alias is the least-breaking path:

```ts
variant?: 'info' | 'success' | 'warning' | 'danger' | 'error';
// in render: normalize 'error' → 'danger' before building the class
```

---

## esa-app-bar

### No overflow / responsive handling — a dense bar clips on small viewports

**Status:** Open — needs upstream change. Worked around locally in `cbf-public-nav.astro`.
**Affects:** Any `<esa-app-bar>` that carries more inline items than fit the viewport width.

**Problem:**
`esa-app-bar`'s inner `.esa-app-bar__row` is a single-line flex row (`display: flex; align-items: center`) with `flex: none` start/end groups and no `flex-wrap`, `overflow`, or media queries — by design it's a pure layout primitive. The consequence is that a bar packed with real chrome (logo + several `esa-nav-dropdown`s + an end cluster, as in CBFish's two-tier nav) **clips off the right edge** below ~1024px: items overflow the viewport with no scroll, wrap, or collapse. Every spoke that composes a non-trivial bar must hand-roll its own responsive collapse, which defeats the "assemble legos" promise for the single most prominent piece of chrome.

**Requested change:**
Give `esa-app-bar` a built-in overflow strategy so spokes get graceful small-viewport behavior for free. Options, least- to most-opinionated:
1. A `reel`/scroll affordance hook (opt-in `overflow-x: auto` on the row) so content scrolls instead of clipping.
2. A `collapse` prop + breakpoint token (`--app-bar-collapse`) that, below the breakpoint, hides flagged groups and exposes a standard hamburger slot wired to `esa-side-dialog` — i.e. promote the pattern below into the lego.

**Local workaround (CBFish):**
`cbf-public-nav.astro` wraps the inline groups in `display: contents` `.cbf-nav-collapsible` gates and, below a 1024px breakpoint, folds them into an `esa-side-dialog` drawer opened by an `esa-icon-button` hamburger. It composes existing legos (`esa-side-dialog` + `esa-icon-button` + `esa-link-column`), but the breakpoint orchestration is bespoke per spoke — exactly what belongs upstream.

---

## esa-combobox

### Click on already-focused input does not reopen dropdown (`autocomplete` mode)

**Status:** Workaround applied locally in ecology repo — pending upstream fix  
**Affects:** `mode="autocomplete"`, single-select, after a mouse selection

**Reproduction:**
1. Render an `<esa-combobox mode="autocomplete">` with options
2. Click an option to select it (closes dropdown, focus returns to input via `requestAnimationFrame`)
3. Immediately click the input field again
4. Dropdown does not reopen — must click away first, then click again

**Root cause:**  
After mouse-selection, `selectOption()` restores focus with `requestAnimationFrame(() => input.focus())`. The `focus` event fires `onInputFocus`, which opens the dropdown — but the existing `_suppressNextOpen` flag (added for the prior bug) correctly suppresses that. However, the input now has focus. When the user clicks it again, no `focus` event fires (the element already has focus), and there was no `@click` handler, so nothing opened the dropdown.

**Fix:**  
Add an `onInputClick` handler that calls `openDropdown()` when the panel is closed, and bind it to `@click` on the autocomplete input.

```ts
private onInputClick = (): void => {
  if (!this._open) this.openDropdown();
};
// in renderAutocomplete template:
// @click=${this.onInputClick}
```

---

### Mouse selection leaves dropdown open (`autocomplete` mode)

**Status:** Workaround applied locally in ecology repo — pending upstream fix  
**Affects:** `mode="autocomplete"`, single-select (not multi-select, not `mode="select"`)

**Reproduction:**
1. Render an `<esa-combobox mode="autocomplete">` with options
2. Type to filter, then click an option with the mouse
3. The dropdown closes briefly then immediately reopens

**Root cause:**  
`selectOption()` calls `requestAnimationFrame(() => input.focus())` to restore focus after selection. That focus event fires `onInputFocus`, which unconditionally calls `openDropdown()` — reopening the panel that was just closed.

**Fix:**  
Add a `_suppressNextOpen` flag. Set it to `true` before the `requestAnimationFrame` in `selectOption`. In `onInputFocus`, bail out early if the flag is set (then clear it).

```ts
// selectOption — autocomplete single-select branch
this._suppressNextOpen = true;
requestAnimationFrame(() => (this.renderRoot.querySelector('.input') as HTMLInputElement | null)?.focus());

// onInputFocus
private onInputFocus = (): void => {
  if (this._suppressNextOpen) { this._suppressNextOpen = false; return; }
  if (!this._open) this.openDropdown();
};
```

---

### Lit class-field shadowing — component renders with empty shadow root

**Status:** Workaround applied locally in ecology repo — pending upstream fix  
**Affects:** All usages of `<esa-combobox>` at all viewport sizes

**Reproduction:**
1. Render any `<esa-combobox>` with options
2. Component mounts but shadow root is empty — no label, no trigger, no dropdown
3. Browser console warns: _"The following properties on element esa-combobox will not trigger updates as expected because they are set using class fields: `_search`, `_selected`, `_open`, `_active`."_

**Root cause:**  
`esa-combobox.ts` declares `_search`, `_selected`, `_open`, and `_active` in both the Lit `static properties` block (registering reactive accessors on the prototype) and as bare TypeScript class fields without the `declare` keyword. TypeScript/esbuild compiles bare class fields to `__publicField()` constructor calls, which run after `super()` and overwrite the Lit reactive accessor getters with plain `undefined` values. Lit's reactive system is broken for those properties and `render()` is never called.

**Fix:**  
Add the `declare` keyword to the four private class field declarations so TypeScript emits no constructor code for them — leaving Lit's prototype accessors intact.

```ts
// before (broken)
private _search: string;
private _selected: string[];
private _open: boolean;
private _active: number;

// after
private declare _search: string;
private declare _selected: string[];
private declare _open: boolean;
private declare _active: number;
```

**Upstream request:**  
Apply the same `declare` pattern to any other private reactive state properties that are declared as class fields without `declare` in any `esa-*` Lit component. The Lit documentation explicitly covers this: https://lit.dev/docs/components/properties/#avoiding-issues-with-class-fields

---

## layout primitives (`@esa/tokens/src/layouts.css`)

### `.cluster` defaults to `align-items: center` — rarely the desired behavior

**Status:** Open — needs upstream change. Worked around locally with a `--align: flex-start` override in `cbf-vendor-financial-outlook.astro`.
**Affects:** Every `.cluster` usage that holds items of differing heights — stat groups, label + value rows, anything that should align to the top or baseline.

**Problem:**
`.cluster` sets `--align: center`, applied via `align-items: var(--align)`. Centering is a poor default for a row-of-items primitive: when children differ in height (e.g. an `esa-stat` with a sub-label sitting next to one without), center alignment floats the shorter items to the vertical middle, breaking the top edge the eye expects. Authors must override `--align` on essentially every non-trivial cluster, which signals the default is wrong. There is no common case where center is the obvious right choice for a wrapping row of content blocks.

**Requested change:**
Change the `.cluster` default to `--align: flex-start` (top-align) — the least-surprising baseline for a wrapping row. Authors who genuinely want centering can opt in with `--align: center`. (`baseline` is also a reasonable default candidate for text-led clusters.)

```css
/* @esa/tokens/src/layouts.css */
.cluster {
  --gap: var(--spacing-300, 0.75rem);
  --align: flex-start; /* was: center */
  --justify: flex-start;
  /* … */
}
```

**Local workaround:**
Override the custom property in scoped component CSS rather than touching the hub file:

```css
.cbf-vendor-financial-outlook__stats {
  --align: flex-start; /* override .cluster's center default */
}
```

---

## `.stack` / `.cluster` / `.grid` primitives override the `[hidden]` attribute

**Component:** `@esa/tokens/src/layouts.css` (layout primitives)

**Problem:**
`.stack`/`.cluster` set `display: flex` and `.grid` sets `display: grid` unconditionally. Author `display` declarations beat the UA stylesheet's `[hidden] { display: none }` (author styles win over UA styles regardless of specificity), so a `<div class="stack" hidden>`, `<div class="cluster" hidden>`, or `<div class="grid" hidden>` STILL RENDERS. Any pattern that toggles a primitive group via the `hidden` attribute (the idiomatic way to show/hide in plain DOM) silently breaks: every "hidden" group is visible at once.

Hit twice so far:
- `cbf-invoice-review-queue` — the Approve-confirm and Return-comment decision sub-states (both `.stack`/`.cluster` + `hidden`) rendered on top of the default Approve/Return row.
- `cbf-vendor-dashboard-invoices` — the Grid ⇄ Cards view toggle: the card container is `<div class="... grid" hidden>`, so the cards leaked into the Grid (table) view because `.grid`'s `display: grid` defeated `hidden`.

**Requested change:**
Guard the display rule so the `[hidden]` attribute keeps working:

```css
/* @esa/tokens/src/layouts.css */
.stack:not([hidden])   { display: flex; }
.cluster:not([hidden]) { display: flex; }
/* (same for .repel/.grid/.switcher/.sidebar — any primitive that sets display) */
```

**Local workaround:**
Force `[hidden]` to win in scoped component CSS — either within the affected container, or with an attribute+class selector that out-specifies the primitive:

```css
/* container scope (cbf-invoice-review-queue) */
.cbf-review-actions [hidden] { display: none !important; }

/* attribute + class out-specifies .grid (cbf-vendor-dashboard-invoices) */
.cbf-vendor-dashboard-invoices__cards[hidden] { display: none; }
```

---

## esa-confirm-dialog

### Backdrop/Esc dismiss is indistinguishable from the explicit Cancel button

**Status:** Patched upstream (2026-06-29, user-approved hub edit). Backward-compatible.
**Affects:** Any consumer that proceeds with a flow on the `resolved` event — a backdrop click or Esc was treated as an answer, not an abort.

**Problem:**
Backdrop click (`@click=${this.cancel}`) and Esc both called `cancel()` → `resolve(false)`, emitting the same `cancel` + `resolved { confirmed: false }` as the explicit "Cancel" button. A consumer cannot tell "the user clicked Cancel" from "the user dismissed the dialog without deciding". In `cbf-invoice` the final-invoice prompt advanced the wizard to Review on a backdrop click, when an outside click should cancel/abort the process and leave the user where they were.

**Change made:**
`resolve(confirmed, dismissed = false)` now carries a `dismissed` flag; backdrop/Esc route through a new `dismiss()` method (`resolve(false, true)`) that also fires a `dismiss` event. The explicit Cancel button is unchanged (`dismissed: false`). Fully additive — existing `confirmed`-only consumers keep working.

```ts
dismiss = (): void => this.resolve(false, true);
// resolved.detail is now { confirmed, dismissed }
```

**Spoke usage:** the `resolved` handler returns early when `e.detail.dismissed` is true, so a dismiss neither marks the decision nor advances the step.

### No close (X) button — only confirm/cancel + backdrop/Esc

**Status:** Patched upstream (2026-06-29, user-approved hub edit). Backward-compatible.
**Affects:** Any confirm dialog where the user expects a standard top-right X to dismiss.

**Problem:**
`esa-confirm-dialog` rendered only the footer confirm/cancel buttons; there was no X affordance, so the only non-answer exits were the backdrop and Esc (both invisible affordances).

**Change made:**
Added a `show-close-button` boolean prop (**default `true`**) that renders a top-right X. The X routes through `dismiss()` (same as backdrop/Esc — an abort, `dismissed: true`), not `cancel()`. Set `show-close-button="false"` to opt out.

---

## esa-snackbar-container

### Toasts never render — reactive `snackbars` state shadowed by a class field

**Status:** Patched upstream (2026-06-29, user-approved hub edit).
**Affects:** Every `container.show()/.success()/.info()/…` call — the toast was added to internal state but never rendered.

**Problem:**
`snackbars` is declared reactive (`static properties = { snackbars: { state: true } }`) but was initialized with a class-field initializer (`private snackbars: SnackbarEntry[] = []`). Under `useDefineForClassFields`, the field overwrites Lit's generated accessor, so `this.snackbars = [...]` writes a plain property and never triggers a re-render. Lit logs the `class-field-shadowing` warning. Net effect: `.success()` returns an id, but no `<esa-snackbar-item>` ever appears.

**Change made:**
Switched to the same pattern every other esa-* component uses — `declare private snackbars: SnackbarEntry[]` + initialize in the constructor (`this.snackbars = []`). Reactivity restored; toasts render and auto-dismiss.

---

## esa-dialog / esa-confirm-dialog — mobile bottom-sheet

### Centered dialogs on small viewports read better as bottom sheets

**Status:** Added upstream (2026-06-30, user-approved hub edit). Additive, mobile-only.
**Affects:** All modal dialogs on narrow viewports.

**Change made:**
Added a `@media (max-width: 600px)` rule to both `esa-dialog` and `esa-confirm-dialog`: the panel aligns to the bottom (`align-items: flex-end`), the surface goes full-width with only the top corners rounded, and it slides up on open (`translateY(100%) → 0`). Desktop (>600px) is unchanged — still centered.
