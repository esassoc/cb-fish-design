# Results — people

Global search & command palette · source prototype: https://esassoc.github.io/cb-fish-design/search/

![Results — people, desktop](https://esassoc.github.io/cb-fish-design/handoff/search/claude/results-people.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/search/claude/results-people.phone.png

People-scoped results — each row resolves to a person with an Impersonate affordance (the dev/QA team are the impersonation targets in this prototype).

## Key decisions

- Rows reuse the palette's `.cbf-search-surface` styles, so a person looks identical in the palette and on the page.
- Matched query text is highlighted within the row title/subtitle.

## Gotchas

- Results are permission-filtered server-side — show the "limited to records you can view" notice.

## Components

- `cbf-icon` (spoke) · `src/components/search/cbf-icon.astro`
- `cbf-result` (spoke) · `src/components/search/cbf-omni-search.astro`
- `cbf-result-group` (spoke) · `src/components/search/cbf-omni-search.astro`
- `cbf-search-results` (spoke) · `src/components/search/cbf-search-results.astro`

## Markup

_5 repeated elements are collapsed in the markup below; the comments say where._

```html
<div class="cbf-search-results" data-search-results="">
  <div class="cbf-result-group">
    <div class="cbf-result-group__head">
      <span class="cbf-result-group__title"
        ><span class="cbf-icon"
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span
        >People</span
      >
      <span class="cbf-result-group__count">7</span>
    </div>
    <div class="cbf-result cbf-result--person">
      <div class="cbf-result__body">
        <div class="cbf-result__title">Gloria Scott</div>
        <div class="cbf-result__sub">
          Environmental Technologist IV · DT-Technology Services, Portland
        </div>
      </div>
      <span class="cbf-result__chevron cbf-icon"
        ><svg
          width="17"
          height="17"
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
    </div>
    <div class="cbf-result cbf-result--person">
      <div class="cbf-result__body">
        <div class="cbf-result__title">Dan Squires</div>
        <div class="cbf-result__sub">Environmental Technologist II · Portland</div>
      </div>
      <span class="cbf-result__chevron cbf-icon"
        ><svg
          width="17"
          height="17"
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
    </div>
    <!-- …and 5 more like this (<div class="cbf-result cbf-result--person">) -->
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
.cbf-search-surface .cbf-facet .cbf-icon {
  color: var(--color-background-brand-muted);
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
.cbf-search-surface .cbf-result--allbtn .cbf-result__title {
  color: var(--color-background-brand-muted);
  font-weight: var(--typography-font-weight-semibold);
}
.cbf-search-surface .cbf-result--allbtn .cbf-result__chevron {
  color: var(--color-background-brand-muted);
  opacity: 1;
}
.cbf-search-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--cbf-search-highlight` | `#ffe9b0` | brand |
| `--cbf-surface-section-head` | `#f5f5f5` | brand |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--radius-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
