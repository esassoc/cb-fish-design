# Omni — recents

Global search & command palette · source prototype: https://esassoc.github.io/cb-fish-design/search/

![Omni — recents, desktop](https://esassoc.github.io/cb-fish-design/handoff/search/claude/omni-recents.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/search/claude/omni-recents.phone.png

The palette on open with no query — the Recent list (last-viewed records) as the zero-state, so the fast path is useful before you type a thing.

## Key decisions

- Empty query shows Recents, never a blank list.
- Keyboard-first: ↑/↓ move the active row, ⏎ opens it, Esc closes, ⌘K/"/" toggle.

## Gotchas

- Recents are a distinct view from results — do not collapse them into an empty results list.

## Components

- `cbf-icon` (spoke) · `src/components/search/cbf-icon.astro`
- `cbf-omni` (spoke) · `src/components/search/cbf-omni-empty.astro`
- `cbf-scope-pill` (spoke) · `src/components/search/cbf-omni-search.astro`
- `cbf-search-surface` (spoke) · `src/components/search/cbf-omni-search.astro`
- `esa-kbd` (hub) · `packages/ecology/src/components/esa-kbd.astro`

## Behavior

- `src/components/search/omni-search.client.ts`
- `src/components/search/omni-render.ts`

## Markup

_5 repeated elements are collapsed in the markup below; the comments say where._

```html
<div class="cbf-omni" data-omni="">
  <div class="cbf-omni__scrim" data-omni-close=""></div>
  <div
    class="cbf-omni__panel cbf-search-surface"
    role="dialog"
    aria-modal="true"
    aria-label="Search"
  >
    <div class="cbf-omni__searchrow">
      <span class="cbf-icon cbf-omni__searchicon"
        ><svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path></svg
      ></span>
      <input
        class="cbf-omni__input"
        data-omni-input=""
        type="text"
        placeholder="Search projects, contracts, people, publications…"
        autocomplete="off"
      />
      <button class="cbf-omni__clear" data-omni-clear="" type="button" aria-label="Close">
        <span class="cbf-icon"
          ><svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path></svg
        ></span>
      </button>
    </div>
    <div class="cbf-omni__scopes" data-omni-scopes="">
      <button type="button" class="cbf-scope-pill is-active">
        <span class="cbf-icon"
          ><svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path></svg></span
        >All</button
      ><button type="button" class="cbf-scope-pill">
        <span class="cbf-icon"
          ><svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
            ></path></svg></span
        >Projects</button
      ><!-- …and 3 more like this (<button class="cbf-scope-pill is-active">) -->
    </div>
    <div class="cbf-omni__body">
      <!-- default view: brand illustration + search note (Recent lives in the nav) -->
      <div class="cbf-omni__empty" data-omni-empty="">
        <div class="cbf-omni__hero">
          <img class="cbf-omni__art" src="/cb-fish-design/dam-illustration.jpg" alt="" />
          <p class="cbf-omni__hero-title">Search the Program</p>
          <p class="cbf-omni__hero-note">
            Find projects, contracts, people, and publications across the Columbia Basin. Start
            typing, or press <kbd class="esa-kbd typography-microcopy-xs">Tab</kbd> to choose a
            scope.
          </p>
        </div>
      </div>
      <!-- query view: grouped results (injected) -->
      <div class="cbf-omni__results" data-omni-results="" hidden=""></div>
    </div>
    <button class="cbf-omni__showall" data-omni-showall="" type="button" hidden="">
      <span data-omni-showall-label="">Show all results</span>
      <span class="cbf-icon"
        ><svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6"></path></svg
      ></span>
    </button>
    <div class="cbf-omni__footer">
      <div class="cbf-omni__hints">
        <span
          ><kbd class="esa-kbd typography-microcopy-xs">↑</kbd>
          <kbd class="esa-kbd typography-microcopy-xs">↓</kbd> Navigate</span
        >
        <span><kbd class="esa-kbd typography-microcopy-xs">↵</kbd> Select</span
        ><!-- …and 2 more like this (<span>) -->
      </div>
    </div>
  </div>
</div>
```

## Styles

```css
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
}
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
}
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
}
.esa-kbd {
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 19px;
  height: 19px;
  padding: 0 5px;
  color: var(--color-content-default-secondary, #646464);
  background: var(--color-background-elevation-raised, #fcfcfc);
  border: var(--border-width-default, 1px) solid var(--color-border-default, #cecece);
  border-bottom-width: 2px;
  border-radius: var(--radius-sm, 0.25rem);
}
.cbf-omni__hero {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-300);
  text-align: center;
  padding: var(--spacing-500) var(--spacing-600) var(--spacing-700);
}
.cbf-omni__art {
  width: 200px;
  height: auto;
  opacity: 0.92;
  mix-blend-mode: multiply;
}
.cbf-omni__hero-title {
  margin: 0;
  font-family: var(--typography-font-family-display);
  font-size: 22px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-background-brand);
}
.cbf-omni__hero-note {
  margin: 0;
  max-width: 420px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-content-default-tertiary);
}
.cbf-omni__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  padding: var(--spacing-200) var(--spacing-500);
  border-top: 1px solid var(--color-border-default);
  background: var(--color-background-elevation-sunken);
}
.cbf-omni__hints {
  display: flex;
  gap: var(--spacing-400);
}
.cbf-omni__hints span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--color-content-default-tertiary);
}
.cbf-search-surface .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-search-surface .cbf-scope-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px var(--spacing-300);
  border-radius: 999px;
  border: 1px solid var(--color-border-default);
  background: var(--color-background-elevation-raised);
  color: var(--color-background-brand);
  font-family: var(--typography-font-family-sans);
  font-size: 13px;
  font-weight: var(--typography-font-weight-medium);
  transition:
    background 0.1s,
    border-color 0.1s,
    color 0.1s;
}
.cbf-search-surface .cbf-scope-pill:hover {
  background: var(--color-background-brand-subtle);
}
.cbf-search-surface .cbf-scope-pill.is-active {
  background: var(--color-background-brand);
  border-color: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
}
.cbf-search-surface .cbf-scope-pill__count {
  opacity: 0.65;
  font-weight: var(--typography-font-weight-regular);
}
.cbf-search-surface .cbf-result-empty {
  padding: var(--spacing-600) var(--spacing-500);
  text-align: center;
  color: var(--color-content-default-tertiary);
  font-size: 15px;
}
.cbf-search-surface .cbf-result-group {
  padding-block: 0;
}
.cbf-search-surface .cbf-result-group__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-200) var(--spacing-500);
  background: var(--color-background-elevation-sunken);
  border-top: 1px solid var(--color-border-default);
  border-bottom: 1px solid var(--color-border-default);
}
.cbf-search-surface .cbf-result-group:first-child .cbf-result-group__head {
  border-top: 0;
}
.cbf-search-surface .cbf-result-group__title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: var(--typography-font-weight-semibold);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-content-default);
}
.cbf-search-surface .cbf-result-group__title .cbf-icon {
  color: var(--color-content-default-tertiary);
}
.cbf-search-surface .cbf-result-group__count {
  font-size: 13px;
  color: var(--color-content-default-tertiary);
}
.cbf-search-surface .cbf-result {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  padding: 8px var(--spacing-500);
  cursor: pointer;
}
.cbf-search-surface .cbf-result__lead {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  flex: none;
  background: var(--color-background-brand-subtle);
  color: var(--color-background-brand);
}
.cbf-search-surface .cbf-result__body {
  flex: 1;
  min-width: 0;
}
.cbf-search-surface .cbf-result__title {
  font-size: 15px;
  font-weight: var(--typography-font-weight-medium);
  color: var(--color-content-default);
}
.cbf-search-surface .cbf-result__title mark {
  background: var(--cbf-search-highlight);
  color: inherit;
  border-radius: 2px;
  padding: 0 1px;
}
.cbf-search-surface .cbf-result__sub {
  font-size: 13px;
  color: var(--color-content-default-tertiary);
  margin-top: 1px;
}
.cbf-search-surface .cbf-result__chevron {
  color: var(--color-background-brand-muted);
  opacity: 0;
  flex: none;
}
.cbf-search-surface .cbf-result:hover,
.cbf-search-surface .cbf-result.is-active {
  background: var(--color-background-brand-subtle);
}
.cbf-search-surface .cbf-result.is-active .cbf-result__chevron {
  opacity: 1;
}
.cbf-person-card .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-person-card__label .cbf-icon {
  color: var(--color-background-brand-muted);
}
.cbf-search-surface .cbf-result--person.is-cardopen {
  background: var(--color-background-brand-subtle);
}
.cbf-omni {
  position: fixed;
  inset: 0;
  z-index: 80;
}
.cbf-omni[hidden] {
  display: none;
}
.cbf-omni__scrim {
  position: absolute;
  inset: 0;
  background: #13273e73;
  backdrop-filter: blur(2px);
}
.cbf-omni__panel {
  position: relative;
  z-index: 1;
  width: 920px;
  max-width: 92vw;
  height: min(820px, 92vh);
  margin: 56px auto 0;
  display: flex;
  flex-direction: column;
  background: var(--color-background-elevation-raised);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 64px #13273e52;
}
.cbf-omni__searchrow {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  flex: none;
  padding: var(--spacing-300) var(--spacing-500);
  border-bottom: 1px solid var(--color-border-default);
}
.cbf-omni__searchicon {
  color: var(--color-content-default-tertiary);
}
.cbf-omni__input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: var(--typography-font-family-sans);
  font-size: 18px;
  color: var(--color-content-default);
}
.cbf-omni__input::placeholder {
  color: var(--cbf-text-placeholder);
}
.cbf-omni__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  flex: none;
  background: var(--color-background-elevation-sunken);
  color: var(--color-content-default-tertiary);
}
.cbf-omni__clear:hover {
  background: var(--color-border-default);
}
.cbf-omni__scopes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-200);
  flex: none;
  padding: var(--spacing-200) var(--spacing-500);
  border-bottom: 1px solid var(--color-border-default);
}
.cbf-omni__body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}
.cbf-omni__empty {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.cbf-omni__empty[hidden] {
  display: none;
}
.cbf-omni__results {
  padding: var(--spacing-100) 0;
}
.cbf-omni__showall {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200);
  flex: none;
  width: 100%;
  padding: var(--spacing-300);
  background: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
  font-family: var(--typography-font-family-sans);
  font-size: 15px;
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-omni__showall:hover {
  background: var(--color-background-brand-hover);
}
.cbf-omni__showall[hidden] {
  display: none;
}
.cbf-nav-link .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-search-field .cbf-icon {
  color: var(--color-content-default-tertiary);
  display: inline-flex;
}
.cbf-search-surface .cbf-facet {
  display: flex;
  align-items: center;
  gap: var(--spacing-250);
  width: 100%;
  padding: var(--spacing-200) var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-background-brand);
  font-family: var(--typography-font-family-sans);
  font-size: 16px;
  font-weight: var(--typography-font-weight-regular);
  text-align: left;
}
.cbf-search-surface .cbf-facet:hover {
  background: var(--color-background-brand-subtle);
}
.cbf-search-surface .cbf-facet.is-active {
  background: var(--color-background-brand-subtle);
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-search-surface .cbf-facet .cbf-icon {
  color: var(--color-background-brand-muted);
}
.cbf-search-surface .cbf-facet__label {
  flex: 1;
}
.cbf-search-surface .cbf-facet__count {
  color: var(--color-content-default-tertiary);
  font-size: 14px;
}
.cbf-search-surface .cbf-search-results .cbf-result-group {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  overflow: hidden;
  background: var(--color-background-elevation-raised);
}
.cbf-search-surface .cbf-search-results .cbf-result-group__head {
  background: var(--cbf-surface-section-head);
  border-top: 0;
  border-bottom: 1px solid var(--color-border-default);
  padding: var(--spacing-300) var(--spacing-400);
}
.cbf-search-surface .cbf-search-results .cbf-result-group__title {
  font-family: var(--typography-font-family-display);
  font-size: 20px;
  font-weight: var(--typography-font-weight-medium);
  letter-spacing: 0;
  text-transform: none;
  color: var(--color-content-default);
}
.cbf-search-surface .cbf-search-results .cbf-result-group__title .cbf-icon {
  color: var(--color-background-brand-muted);
}
.cbf-search-surface .cbf-search-results .cbf-result-group__title .cbf-icon svg {
  width: 18px;
  height: 18px;
}
.cbf-search-surface .cbf-search-results .cbf-result-group__count {
  font-size: 16px;
}
.cbf-search-surface .cbf-result--allbtn {
  width: 100%;
  text-align: left;
  padding: var(--spacing-400) var(--spacing-500);
}
.cbf-search-surface .cbf-result--allbtn .cbf-result__title {
  color: var(--color-background-brand-muted);
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-search-surface .cbf-result--allbtn .cbf-result__chevron {
  color: var(--color-background-brand-muted);
  opacity: 1;
}
.cbf-search-surface .cbf-result--allbtn:hover,
.cbf-search-surface .cbf-result--allbtn.is-active {
  background: var(--color-background-brand-subtle);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--cbf-search-highlight` | `#ffe9b0` | brand |
| `--cbf-surface-section-head` | `#f5f5f5` | brand |
| `--cbf-text-placeholder` | `#9aa3ad` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--radius-100` | `.25rem` | primitive |
| `--radius-sm` | `.25rem` | semantic |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-regular` | `400` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-microcopy-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-font-weight` | `500` | semantic |
| `--typography-microcopy-xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-line-height` | `1` | semantic |
