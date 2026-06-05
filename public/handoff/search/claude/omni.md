# Omni

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **search** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/search/
- **Section element:** `<div>`
- **Components:** cbf-icon (spoke), cbf-kbd (spoke), cbf-omni (spoke), cbf-search-surface (spoke)

## Markup (de-scoped, framework-free)
```html
<div class="cbf-omni" data-omni="" hidden="">
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
      <button class="cbf-omni__clear" data-omni-clear="" type="button" aria-label="Clear">
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
    <div class="cbf-omni__scopes" data-omni-scopes=""></div>
    <div class="cbf-omni__body">
      <!-- default view: Recent (injected) + illustration/note -->
      <div class="cbf-omni__empty" data-omni-empty="">
        <div data-omni-recent=""></div>
        <div class="cbf-omni__hero">
          <img class="cbf-omni__art" src="/cb-fish-design/dam-illustration.jpg" alt="" />
          <p class="cbf-omni__hero-title">Search the Program</p>
          <p class="cbf-omni__hero-note">
            Find projects, contracts, people, publications, and funds across the Columbia Basin.
            Start typing, or press <kbd class="cbf-kbd">Tab</kbd> to choose a scope.
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
        <span><kbd class="cbf-kbd">↑</kbd> <kbd class="cbf-kbd">↓</kbd> Navigate</span>
        <span><kbd class="cbf-kbd">↵</kbd> Select</span>
        <span><kbd class="cbf-kbd">Tab</kbd> Scope</span>
        <span><kbd class="cbf-kbd">Esc</kbd> Close</span>
      </div>
    </div>
  </div>
</div>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.cbf-omni-trigger {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  width: 520px;
  max-width: 100%;
  padding: 7px var(--spacing-300) 7px var(--spacing-400);
  background: #ffffff1a;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  color: #ffffffbf;
  transition:
    background 0.12s,
    border-color 0.12s;
}
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
}
.cbf-omni-trigger__ph {
  flex: 1;
  text-align: left;
  font-size: 15px;
}
.cbf-omni-trigger__kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 19px;
  height: 19px;
  padding: 0 6px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: var(--font-weight-medium);
  color: #ffffffd9;
  background: #ffffff1f;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
}
.cbf-nav-link .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-omni {
  position: fixed;
  inset: 0;
  z-index: 80;
}
.cbf-omni[hidden] {
  display: none;
}
.cbf-search-field .cbf-icon {
  color: var(--color-text-muted);
}
.cbf-search-surface .cbf-facet {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: var(--font-weight-regular);
  text-align: left;
}
.cbf-search-surface .cbf-facet.is-active {
  background: var(--color-primary-subtle);
  font-weight: var(--font-weight-semibold);
}
.cbf-search-surface .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-search-surface .cbf-facet .cbf-icon {
  color: var(--color-secondary);
}
.cbf-search-surface .cbf-facet__label {
  flex: 1;
}
.cbf-search-surface .cbf-result-empty {
  padding: var(--spacing-600) var(--spacing-500);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 15px;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-subtle` | `#f3f7fc` | semantic |
| `--color-secondary` | `#2770b2` | semantic |
| `--color-text-muted` | `#7c7c7c` | semantic |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--font-weight-regular` | `400` | primitive |
| `--font-weight-semibold` | `600` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
