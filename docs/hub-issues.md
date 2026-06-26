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

## `.stack` / `.cluster` primitives override the `[hidden]` attribute

**Component:** `@esa/tokens/src/layouts.css` (layout primitives)

**Problem:**
`.stack` and `.cluster` set `display: flex` unconditionally. The UA stylesheet's `[hidden] { display: none }` has the same specificity (one attribute/element vs. one class — actually the class wins), so a `<div class="stack" hidden>` or `<div class="cluster" hidden>` STILL RENDERS. Any pattern that toggles a primitive group via the `hidden` attribute (the idiomatic way to show/hide in plain DOM) silently breaks: every "hidden" group is visible at once. Hit in `cbf-invoice-review-queue` where the Approve-confirm and Return-comment decision sub-states (both `.stack`/`.cluster` + `hidden`) rendered on top of the default Approve/Return row.

**Requested change:**
Guard the display rule so the `[hidden]` attribute keeps working:

```css
/* @esa/tokens/src/layouts.css */
.stack:not([hidden])   { display: flex; }
.cluster:not([hidden]) { display: flex; }
/* (same for .repel/.grid/.switcher/.sidebar — any primitive that sets display) */
```

**Local workaround:**
Force `[hidden]` to win within the affected container in scoped component CSS:

```css
.cbf-review-actions [hidden] { display: none !important; }
```
