# Sub-nav tabs

BiOp landing page · source prototype: https://esassoc.github.io/cb-fish-design/biop-reporting/

![Sub-nav tabs, desktop](https://esassoc.github.io/cb-fish-design/handoff/biop-reporting/claude/sub-nav-tabs.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/biop-reporting/claude/sub-nav-tabs.phone.png

The BiOp reporting tab strip: Summary, then the 2020 CRS Commitments, CRS habitat and FCRPS BiOp menus, and a Related items disclosure. Shared by every page in the area.

## Key decisions

- The tab list comes from biopReportingTabs() in one shared file, so the area pages cannot drift apart.
- Menu tabs are folder labels and never show as active; only the page you are on is marked active, inside its menu.
- CRS habitat, FCRPS BiOp and Related items are placeholders (href="#"), matching the live site menu wording.

## Components

- `cbf-report-tabs` (spoke) · `src/components/shared/cbf-report-tabs.astro`

## Behavior

- `src/components/shared/biop-reporting-tabs.ts`

## Markup

_7 repeated elements are collapsed in the markup below; the comments say where._

```html
<nav class="cbf-report-tabs" aria-label="BiOp reporting sections">
  <a
    class="cbf-report-tabs__tab is-active"
    href="/cb-fish-design/biop-reporting"
    aria-current="page"
    >Summary</a
  >
  <details class="cbf-report-tabs__dropdown" name="cbf-report-tabs-menu">
    <summary class="cbf-report-tabs__tab cbf-report-tabs__dropdown-trigger">
      2020 CRS Commitments<span class="cbf-report-tabs__chev"
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
          <path d="m6 9 6 6 6-6"></path></svg
      ></span>
    </summary>
    <div class="cbf-report-tabs__menu" role="menu">
      <a class="cbf-report-tabs__menu-item" role="menuitem" href="/cb-fish-design/crs-commitments"
        >Commitments</a
      ><a
        class="cbf-report-tabs__menu-item"
        role="menuitem"
        href="/cb-fish-design/crs-commitments/dashboard"
        >Dashboard</a
      ><a
        class="cbf-report-tabs__menu-item"
        role="menuitem"
        href="/cb-fish-design/crs-commitments/documents"
        >Document Library</a
      >
    </div>
  </details>
  <details class="cbf-report-tabs__dropdown" name="cbf-report-tabs-menu">
    <summary class="cbf-report-tabs__tab cbf-report-tabs__dropdown-trigger">
      CRS habitat<span class="cbf-report-tabs__chev"
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
          <path d="m6 9 6 6 6-6"></path></svg
      ></span>
    </summary>
    <div class="cbf-report-tabs__menu" role="menu">
      <a class="cbf-report-tabs__menu-item" role="menuitem" href="#">CRS habitat reports</a
      ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#">CRS habitat report measures</a
      ><!-- …and 4 more like this (<a class="cbf-report-tabs__menu-item">) -->
    </div>
  </details>
  <details class="cbf-report-tabs__dropdown" name="cbf-report-tabs-menu">
    <summary class="cbf-report-tabs__tab cbf-report-tabs__dropdown-trigger">
      FCRPS BiOp<span class="cbf-report-tabs__chev"
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
          <path d="m6 9 6 6 6-6"></path></svg
      ></span>
    </summary>
    <div class="cbf-report-tabs__menu" role="menu">
      <a class="cbf-report-tabs__menu-item" role="menuitem" href="#">FCRPS BiOp</a
      ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#">FCRPS BiOp dashboard</a
      ><!-- …and 3 more like this (<a class="cbf-report-tabs__menu-item">) -->
    </div>
  </details>
  <details class="cbf-report-tabs__related" name="cbf-report-tabs-menu">
    <summary class="cbf-report-tabs__tab cbf-report-tabs__related-trigger">
      Related items<span class="cbf-report-tabs__chev"
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
          <path d="m6 9 6 6 6-6"></path></svg
      ></span>
    </summary>
    <div class="cbf-report-tabs__menu" role="menu">
      <a class="cbf-report-tabs__menu-item" role="menuitem" href="#">Reclamation uploader</a>
    </div>
  </details>
</nav>
```

## Styles

```css
.cbf-search-surface .cbf-scope-pill.is-active {
  background: var(--color-background-brand);
  border-color: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
}
.cbf-search-surface .cbf-result:hover,
.cbf-search-surface .cbf-result.is-active {
  background: var(--color-background-brand-subtle);
}
.cbf-search-surface .cbf-result.is-active .cbf-result__chevron {
  opacity: 1;
}
.cbf-report-tabs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-100);
  padding: var(--spacing-150);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-200, 8px);
  background: var(--color-gray-3);
}
.cbf-report-tabs__tab {
  padding: var(--spacing-200) var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-background-brand);
  font-size: 16px;
  font-weight: var(--typography-font-weight-medium);
  white-space: nowrap;
}
.cbf-report-tabs__tab:hover {
  background: color-mix(in srgb, var(--color-background-brand) 8%, transparent);
}
.cbf-report-tabs__tab.is-active {
  background: var(--color-background-elevation-raised, #fff);
  color: var(--color-background-default-knockout);
  font-weight: var(--typography-font-weight-semibold);
  box-shadow: 0 1px 2px
    color-mix(in srgb, var(--color-background-default-knockout) 12%, transparent);
}
.cbf-report-tabs__tab.is-active:hover {
  background: var(--color-background-elevation-raised, #fff);
}
.cbf-report-tabs__dropdown {
  position: relative;
}
.cbf-report-tabs__dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150);
  list-style: none;
  cursor: pointer;
}
.cbf-report-tabs__dropdown-trigger::-webkit-details-marker {
  display: none;
}
.cbf-report-tabs__related {
  position: relative;
  margin-left: auto;
}
.cbf-report-tabs__related-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150);
  list-style: none;
  cursor: pointer;
}
.cbf-report-tabs__related-trigger::-webkit-details-marker {
  display: none;
}
.cbf-report-tabs__chev {
  display: inline-flex;
  transition: transform 0.12s ease;
}
.cbf-report-tabs__dropdown[open] .cbf-report-tabs__chev,
.cbf-report-tabs__related[open] .cbf-report-tabs__chev {
  transform: rotate(180deg);
}
.cbf-report-tabs__menu {
  position: absolute;
  top: calc(100% + var(--spacing-150));
  left: 0;
  z-index: 20;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-150);
  background: var(--color-background-elevation-raised);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  box-shadow: 0 4px 14px
    color-mix(in srgb, var(--color-background-default-knockout) 14%, transparent);
}
.cbf-report-tabs__related .cbf-report-tabs__menu {
  left: auto;
  right: 0;
}
.cbf-report-tabs__menu-item {
  padding: var(--spacing-200) var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-content-default);
  font-size: 15px;
  white-space: nowrap;
}
.cbf-report-tabs__menu-item:hover {
  background: var(--color-background-brand-subtle);
  color: var(--color-background-brand);
}
.cbf-report-tabs__menu-item.is-active {
  background: var(--color-background-brand-subtle);
  color: var(--color-background-brand);
  font-weight: var(--typography-font-weight-semibold);
}
@media (max-width: 640px) {
  .cbf-report-tabs__related {
    margin-left: 0;
  }
}
@media (max-width: 640px) {
  .cbf-report-tabs__related .cbf-report-tabs__menu {
    right: auto;
    left: 0;
  }
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-gray-3` | `#f0f0f0` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
