# Results — projects

Global search & command palette · source prototype: https://esassoc.github.io/cb-fish-design/search/

![Results — projects, desktop](https://esassoc.github.io/cb-fish-design/handoff/search/claude/results-projects.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/search/claude/results-projects.phone.png

Project-scoped results — the same row component carrying a different entity type (project number + fiscal year + status), proving the row generalizes across types.

## Key decisions

- One row component renders every entity type; type only changes the leading icon and subtitle shape.

## Gotchas

- Keep the row layout identical across types — only icon + subtitle content should vary.

## Components

- `cbf-icon` (spoke) · `src/components/search/cbf-icon.astro`
- `cbf-result` (spoke) · `src/components/search/cbf-omni-search.astro`
- `cbf-result-group` (spoke) · `src/components/search/cbf-omni-search.astro`
- `cbf-search-results` (spoke) · `src/components/search/cbf-search-results.astro`

## Markup

_3 repeated elements are collapsed in the markup below; the comments say where._

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
            <path
              d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
            ></path></svg></span
        >Projects</span
      >
      <span class="cbf-result-group__count">5</span>
    </div>
    <div class="cbf-result">
      <div class="cbf-result__body">
        <div class="cbf-result__title">2001-006-00 <mark>Salmon</mark>/Steelhead Days</div>
        <div class="cbf-result__sub">Project · FY2001 · Active</div>
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
    <div class="cbf-result">
      <div class="cbf-result__body">
        <div class="cbf-result__title">2002-051-00 <mark>Salmon</mark> Subbasin Planning</div>
        <div class="cbf-result__sub">Project · FY2002 · Active</div>
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
    <!-- …and 3 more like this (<div class="cbf-result">) -->
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
