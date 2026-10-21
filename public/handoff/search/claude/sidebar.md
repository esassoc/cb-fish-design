# Sidebar

Global search & command palette · source prototype: https://esassoc.github.io/cb-fish-design/search/

![Sidebar, desktop](https://esassoc.github.io/cb-fish-design/handoff/search/claude/sidebar.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/search/claude/sidebar.phone.png

The /search facet rail — "Filter by type" (All, Projects, Contracts, People, Publications, Funds). Scopes the result set to one entity type.

## Key decisions

- Facet counts and active state are driven from the same data/render layer as the results, so they never disagree.
- Selecting a facet updates the scope in place (no full navigation).

## Gotchas

- Keep the facet list and the omni scope pills in sync — they represent the same scopes.

## Components

- `cbf-facet` (spoke) · `src/components/search/cbf-search-facets.astro`
- `cbf-icon` (spoke) · `src/components/search/cbf-icon.astro`
- `cbf-search-facets` (spoke) · `src/components/search/cbf-search-facets.astro`
- `cbf-search-surface` (spoke) · `src/components/search/cbf-omni-search.astro`

## Behavior

- `src/components/search/search-page.client.ts`

## Markup

_3 repeated elements are collapsed in the markup below; the comments say where._

```html
<div class="cbf-search-facets cbf-search-surface">
  <p class="cbf-search-facets__head">Filter by type</p>
  <div class="cbf-search-facets__list" data-search-facets="">
    <button type="button" class="cbf-facet is-active">
      <span class="cbf-icon"
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
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path></svg></span
      ><span class="cbf-facet__label">All</span></button
    ><button type="button" class="cbf-facet">
      <span class="cbf-icon"
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
          <path
            d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
          ></path></svg></span
      ><span class="cbf-facet__label">Projects</span></button
    ><!-- …and 3 more like this (<button class="cbf-facet is-active">) -->
  </div>
</div>
```

## Styles

```css
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
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
.cbf-search-facets__head {
  margin: 0 0 var(--spacing-200);
  font-size: 16px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--cbf-gold-900);
}
.cbf-search-facets__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
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
| `--cbf-gold-900` | `#534c3b` | brand |
| `--cbf-search-highlight` | `#ffe9b0` | brand |
| `--cbf-surface-section-head` | `#f5f5f5` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--radius-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-regular` | `400` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
