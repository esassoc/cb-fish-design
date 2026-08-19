# Nav drawer

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **my-work** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/my-work/
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
      <span class="esa-link-column__head typography-label-md">Mitigation work</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Projects</li>
        <li class="typography-body-sm">Contracts</li>
        <li class="typography-body-sm">Portfolios</li>
        <li class="typography-body-sm"><a href="/cb-fish-design/legacy/sow">Work elements</a></li>
        <li class="typography-body-sm">Estuary program</li>
        <li class="typography-body-sm">Tributary habitat</li>
        <li class="typography-body-sm">Land acquisitions</li>
        <li class="typography-body-sm">
          <a href="/cb-fish-design/rme-reporting">RM&amp;E reporting</a>
        </li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">Reporting</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Report Center</li>
        <li class="typography-body-sm">Maps</li>
        <li class="typography-body-sm">Publications</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">Funding</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Funds</li>
        <li class="typography-body-sm">Fund budgets summary</li>
        <li class="typography-body-sm">Long-term funding agreements</li>
        <li class="typography-body-sm">
          <a href="/cb-fish-design/project-budgets">Project budgets</a>
        </li>
        <li class="typography-body-sm">Working budgets</li>
        <li class="typography-body-sm">Expenditures</li>
        <li class="typography-body-sm">Accruals</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">Quick links</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm"><a href="#">Recent</a></li>
        <li class="typography-body-sm"><a href="/my-work">Dashboard</a></li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">System</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Data management</li>
        <li class="typography-body-sm">System status</li>
        <li class="typography-body-sm">System configuration</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">Help</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Help center</li>
        <li class="typography-body-sm">Data dictionary</li>
        <li class="typography-body-sm">EF&amp;W Program documents</li>
        <li class="typography-body-sm">Request support</li>
        <li class="typography-body-sm">Send feedback</li>
      </ul>
    </div>
  </nav>
</esa-side-dialog>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.esa-link-column {
  color: inherit;
}
.esa-link-column__head {
  display: block;
  margin: 0 0 var(--spacing-100, 4px);
  font-size: var(--typography-label-md-font-size);
  color: inherit;
  text-decoration-color: transparent;
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
  font-size: var(--font-size-150, var(--typography-body-sm-font-size));
  margin-bottom: var(--spacing-100, 4px);
}
.esa-link-column__list a {
  color: inherit;
  text-decoration-color: transparent;
}
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--font-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
