# Results — empty

The default, no-query state — a first-class prompt, not a blank container. What the user sees on arrival.

## Key decisions
- Empty state is an intentional view (keyword prompt), deliberately distinct from "no matches".

## Gotchas
- Never render a bare empty div here — the empty state must read as guidance.

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
.cbf-search-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.cbf-search-surface .cbf-result-empty {
  padding: var(--spacing-600) var(--spacing-500);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 15px;
}
```

## Tokens
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
