# Footer

CBFish homepage · source prototype: https://esassoc.github.io/cb-fish-design/home/

![Footer, desktop](https://esassoc.github.io/cb-fish-design/handoff/home/claude/footer.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/home/claude/footer.phone.png

## Components

- `cbf-app-footer` (spoke) · `src/components/cbfish-home/cbf-app-footer.astro`
- `esa-link-column` (hub) · `packages/ecology/src/components/esa-link-column.astro`

## Markup

_8 repeated elements are collapsed in the markup below; the comments say where._

```html
<footer class="cbf-app-footer">
  <div class="cbf-app-footer__inner">
    <div class="cbf-app-footer__cols grid">
      <div class="esa-link-column">
        <span class="esa-link-column__head typography-label-md">Mitigation work</span>
        <hr class="esa-link-column__rule" />
        <ul class="esa-link-column__list">
          <li class="typography-body-sm">Projects</li>
          <li class="typography-body-sm">Contracts</li>
          <!-- …and 6 more like this (<li class="typography-body-sm">) -->
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
      <!-- …and 2 more like this (<div class="esa-link-column">) -->
    </div>
    <div class="cbf-app-footer__base">
      <span class="cbf-app-footer__org">
        Bonneville Power Administration · Columbia Basin Fish &amp; Wildlife Program
      </span>
      <a class="cbf-app-footer__policy" href="#">Website usage policy</a>
    </div>
  </div>
</footer>
```

## Styles

```css
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
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
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.cbf-app-footer {
  margin-top: var(--spacing-800);
  background: var(--color-background-default-knockout);
  color: var(--color-content-default-knockout, #fff);
}
.cbf-app-footer__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-800) var(--spacing-600) var(--spacing-600);
}
.cbf-app-footer__cols {
  --grid-min: 12rem;
  gap: var(--spacing-700);
}
.cbf-app-footer__base {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-300);
  margin-top: var(--spacing-700);
  padding-top: var(--spacing-400);
  border-top: 1px solid
    color-mix(in srgb, var(--color-content-default-knockout, #fff) 22%, transparent);
  font-size: 14px;
}
.cbf-app-footer__org {
  color: color-mix(in srgb, var(--color-content-default-knockout, #fff) 82%, transparent);
}
.cbf-app-footer__policy {
  color: inherit;
  text-decoration: underline;
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
.esa-link-column__head[href]:hover {
  text-decoration: underline;
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
.esa-link-column__list a:hover {
  text-decoration: underline;
}
@media (forced-colors: active) {
  .esa-link-column__rule {
    background: CanvasText;
  }
}
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--font-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
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
