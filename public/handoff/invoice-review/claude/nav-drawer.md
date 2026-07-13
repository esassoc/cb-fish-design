# Nav drawer

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **invoice-review** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/invoice-review/
- **Section element:** `<esa-side-dialog>`
- **Components:** cbf-nav-drawer (spoke), esa-link-column (hub)

## Markup (de-scoped, framework-free)
```html
<esa-side-dialog
  position="left"
  heading="Menu"
  size="sm"
  class="cbf-nav-drawer"
  data-nav-drawer="true"
>
  <nav class="stack" data-gap="lg" aria-label="Site navigation">
    <div class="esa-link-column">
      <span class="esa-link-column__head">Mitigation work</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li>Projects</li>
        <li>Contracts</li>
        <li>Portfolios</li>
        <li>Work elements</li>
        <li>Estuary program</li>
        <li>Tributary habitat</li>
        <li>Land acquisitions</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head">Reporting</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li>Report Center</li>
        <li>Maps</li>
        <li>Publications</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head">Funding</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li>Funds</li>
        <li>Fund budgets summary</li>
        <li>Long-term funding agreements</li>
        <li><a href="/cb-fish-design/project-budgets">Project budgets</a></li>
        <li>Working budgets</li>
        <li>Expenditures</li>
        <li>Accruals</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head">Quick links</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li><a href="#">Recent</a></li>
        <li><a href="#">Dashboard</a></li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head">System</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li>Data management</li>
        <li>System status</li>
        <li>System configuration</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head">Help</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li>Help center</li>
        <li>Data dictionary</li>
        <li>EF&amp;W Program documents</li>
        <li>Request support</li>
        <li>Send feedback</li>
      </ul>
    </div>
  </nav>
</esa-side-dialog>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.esa-link-column {
  color: inherit;
}
.esa-link-column__head {
  display: block;
  margin: 0 0 var(--spacing-100, 4px);
  font-size: var(--link-column-heading-font-size, var(--type-size-200, 1rem));
  font-weight: var(--font-weight-medium, 500);
  color: inherit;
  text-decoration: none;
}
.esa-link-column__rule {
  height: 1px;
  border: 0;
  margin: 0 0 var(--spacing-200, 8px);
  background: var(--link-column-rule-color, color-mix(in srgb, currentColor 40%, transparent));
}
.esa-link-column__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.esa-link-column__list li {
  font-size: var(--link-column-item-font-size, var(--type-size-150, 0.875rem));
  line-height: 22px;
  margin-bottom: var(--spacing-100, 4px);
}
.esa-link-column__list a {
  color: inherit;
  text-decoration: none;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--font-weight-medium` | `500` | primitive |
| `--link-column-heading-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | component |
| `--link-column-item-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | component |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--type-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
