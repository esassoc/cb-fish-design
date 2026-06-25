# Results — projects

Project-scoped results — the same row component carrying a different entity type (project number + fiscal year + status), proving the row generalizes across types.

## Key decisions
- One row component renders every entity type; type only changes the leading icon and subtitle shape.

## Gotchas
- Keep the row layout identical across types — only icon + subtitle content should vary.

## Markup
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
        <div class="cbf-result__title">
          2001-006-00 <mark>Salmon</mark>/Steelhead Days
        </div>
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
        <div class="cbf-result__title">
          2002-051-00 <mark>Salmon</mark> Subbasin Planning
        </div>
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
    <div class="cbf-result">
      <div class="cbf-result__body">
        <div class="cbf-result__title">
          2002-032-00 Passage of ESA-Listed Juvenile <mark>Salmon</mark>
        </div>
        <div class="cbf-result__sub">Project · FY2002</div>
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
        <div class="cbf-result__title">
          2002-033-00 John Day <mark>Salmon</mark>id Monitoring Program
        </div>
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
    <div class="cbf-result">
      <div class="cbf-result__body">
        <div class="cbf-result__title">
          2001-025-00 <mark>Salmon</mark>id Production in Restored Rattlesnake Creek
        </div>
        <div class="cbf-result__sub">Project · FY2001</div>
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
  </div>
</div>
```

## Styles
```css
.cbf-search-field .cbf-icon {
  color: var(--color-text-muted);
  display: inline-flex;
}
.cbf-search-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.cbf-search-surface .cbf-facet .cbf-icon {
  color: var(--color-secondary);
}
.cbf-search-surface .cbf-search-results .cbf-result-group {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  overflow: hidden;
  background: var(--color-surface);
}
.cbf-search-surface .cbf-search-results .cbf-result-group__head {
  background: var(--cbf-surface-section-head);
  border-top: 0;
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-300) var(--spacing-400);
}
.cbf-search-surface .cbf-search-results .cbf-result-group__title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0;
  text-transform: none;
  color: var(--color-text-primary);
}
.cbf-search-surface .cbf-search-results .cbf-result-group__title .cbf-icon {
  color: var(--color-secondary);
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
  color: var(--color-secondary);
  font-weight: var(--font-weight-semibold);
}
.cbf-search-surface .cbf-result--allbtn .cbf-result__chevron {
  color: var(--color-secondary);
  opacity: 1;
}
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
}
.cbf-nav-link .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-search-surface .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-search-surface .cbf-result-empty {
  padding: var(--spacing-600) var(--spacing-500);
  text-align: center;
  color: var(--color-text-muted);
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
  background: var(--color-surface-sunken);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.cbf-search-surface .cbf-result-group:first-child .cbf-result-group__head {
  border-top: 0;
}
.cbf-search-surface .cbf-result-group__title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-text-primary);
}
.cbf-search-surface .cbf-result-group__title .cbf-icon {
  color: var(--color-text-muted);
}
.cbf-search-surface .cbf-result-group__count {
  font-size: 13px;
  color: var(--color-text-muted);
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
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}
.cbf-search-surface .cbf-result__title mark {
  background: var(--cbf-search-highlight);
  color: inherit;
  border-radius: 2px;
  padding: 0 1px;
}
.cbf-search-surface .cbf-result__sub {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-top: 1px;
}
.cbf-search-surface .cbf-result__chevron {
  color: var(--color-secondary);
  opacity: 0;
  flex: none;
}
```

## Tokens
- `--cbf-search-highlight`: #ffe9b0 _(brand)_
- `--cbf-surface-section-head`: #f5f5f5 _(brand)_
- `--color-border`: #dcdcdc _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-surface-sunken`: #f3f7fc _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
- `--font-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--font-weight-semibold`: 600 _(primitive)_
- `--radius-100`: .25rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
