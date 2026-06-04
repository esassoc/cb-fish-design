# Footer

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **home** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/
- **Section element:** `<footer>`
- **Components:** cbf-bpa-logo (spoke), cbf-footer (spoke), cbf-logo (spoke), esa-link-column (hub)

## Markup (de-scoped, framework-free)
```html
<footer class="cbf-footer">
  <div class="cbf-footer__inner">
    <div class="cbf-footer__nav">
      <a class="cbf-logo" href="/" title="Columbia Basin Fish &amp; Wildlife Program">
        <img class="cbf-logo__mark" src="assets/logo-mark.svg" alt="" />
        <img
          class="cbf-logo__type"
          src="assets/logo-type.svg"
          alt="Columbia Basin Fish &amp; Wildlife Program"
        />
      </a>
      <div class="cbf-footer__cols">
        <div class="esa-link-column">
          <span class="esa-link-column__head">Mitigation work</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li>Contracts</li>
            <li>Projects</li>
            <li>Portfolios</li>
            <li>Work orders</li>
            <li>Work elements</li>
            <li>Metrics</li>
            <li>Measures</li>
            <li>Limiting factors</li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head">Reporting</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li>Report Center</li>
            <li>Programs</li>
            <li>Annual Progress Report Measures</li>
            <li>Measure Targets</li>
            <li>CRS Commitments</li>
            <li>Maps</li>
            <li>High-Level Indicators</li>
            <li>States</li>
            <li>Reviews</li>
            <li>Assessments</li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head">Funding</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li>Funds</li>
            <li>Working Budgets</li>
            <li>Accords</li>
            <li>Start of Year Budgets</li>
            <li>Proposals</li>
            <li>Budget Change Requests</li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head">Help</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li>Request support</li>
            <li>Help Center</li>
            <li>Data dictionary</li>
            <li>Release notes</li>
          </ul>
        </div>
        <div class="esa-link-column">
          <span class="esa-link-column__head">Account</span>
          <hr class="esa-link-column__rule" />
          <ul class="esa-link-column__list">
            <li>Dashboard</li>
            <li>Edit settings</li>
          </ul>
        </div>
      </div>
      <div class="cbf-bpa-logo">
        <img
          class="cbf-bpa-logo__img"
          src="assets/bpa-logo.png"
          alt="Bonneville Power Administration"
        />
      </div>
    </div>
    <div class="cbf-footer__meta">
      <a href="https://www.cbfish.org/Help.mvc/PrivacyPolicy" target="_blank" rel="noopener"
        >Website usage policy</a
      >
      <span>Version 3.145.10371.0&nbsp;&nbsp;&nbsp;Compiled 05/30/2024 17:16:44</span>
    </div>
  </div>
</footer>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.cbf-logo {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-300, 12px);
  flex: none;
  color: inherit;
  text-decoration: none;
}
.cbf-logo__mark {
  width: 48px;
  height: 48px;
  flex: none;
}
.cbf-logo__type {
  height: 40px;
  width: auto;
}
.cbf-footer {
  background: var(--color-primary);
  color: var(--color-text-inverse, #fff);
}
.cbf-footer__inner {
  display: flex;
  flex-direction: column;
}
.cbf-footer__nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--spacing-650);
  align-items: start;
  padding: var(--spacing-700) var(--spacing-600) 0;
}
.cbf-footer__cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11.25rem, 1fr));
  gap: var(--spacing-650);
}
.esa-link-column {
  color: inherit;
}
.esa-link-column__head {
  display: block;
  margin: 0 0 var(--spacing-100, 4px);
  font-size: var(--type-size-200, 1rem);
  font-weight: var(--font-weight-medium, 500);
  color: inherit;
  text-decoration: none;
}
.esa-link-column__rule {
  height: 1px;
  border: 0;
  margin: 0 0 var(--spacing-200, 8px);
  background: color-mix(in srgb, currentColor 40%, transparent);
}
.esa-link-column__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.esa-link-column__list li {
  font-size: var(--type-size-150, 0.875rem);
  line-height: 22px;
  margin-bottom: var(--spacing-100, 4px);
}
.cbf-bpa-logo {
  flex: none;
  align-self: start;
  max-width: 254px;
}
.cbf-bpa-logo__img {
  width: 100%;
  height: auto;
}
.cbf-footer__meta {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-400);
  padding: 0 var(--spacing-600) var(--spacing-700);
  font-size: 12px;
}
.cbf-footer__meta a {
  text-decoration: underline;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--color-primary` | `#1e5386` | semantic |
| `--color-text-inverse` | `#ffffff` | semantic |
| `--font-weight-medium` | `500` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-650` | `2.5rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--type-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
