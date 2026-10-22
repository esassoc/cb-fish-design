# Results — empty

Global search & command palette · source prototype: https://esassoc.github.io/cb-fish-design/search/

![Results — empty, desktop](https://esassoc.github.io/cb-fish-design/handoff/search/claude/results-empty.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/search/claude/results-empty.phone.png

The default, no-query state — a first-class prompt, not a blank container. What the user sees on arrival.

## Key decisions

- Empty state is an intentional view (keyword prompt), deliberately distinct from "no matches".

## Gotchas

- Never render a bare empty div here — the empty state must read as guidance.

## Components

- `cbf-result-empty` (spoke) · `src/components/search/cbf-omni-search.astro`
- `cbf-search-results` (spoke) · `src/components/search/cbf-search-results.astro`

## Behavior

- `src/components/search/search-page.client.ts`

## Markup

```html
<div class="cbf-search-results" data-search-results="">
  <p class="cbf-result-empty">
    Enter a keyword to search projects, contracts, people, and publications.
  </p>
</div>
```

## Styles

```css
.cbf-search-surface .cbf-result-empty {
  padding: var(--spacing-600) var(--spacing-500);
  text-align: center;
  color: var(--color-content-default-tertiary);
  font-size: 15px;
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
.cbf-search-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--cbf-surface-section-head` | `#f5f5f5` | brand |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--radius-100` | `.25rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
