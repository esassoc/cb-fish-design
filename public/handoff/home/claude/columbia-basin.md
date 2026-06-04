# Columbia Basin

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **home** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/
- **Section element:** `<section>`
- **Components:** cbf-hero (spoke)

## Markup (de-scoped, framework-free)
```html
<section class="cbf-hero">
  <div class="cbf-hero__title">
    <h1 class="cbf-hero__line cbf-hero__line--strong">Columbia Basin</h1>
    <h1 class="cbf-hero__line">Fish &amp; Wildlife Program</h1>
  </div>
</section>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.cbf-hero {
  position: relative;
  height: 640px;
  background: #1d3c5d url(assets/hero.webp) center 40% / cover no-repeat;
  display: flex;
  align-items: flex-end;
}
.cbf-hero__title {
  position: relative;
  z-index: 1;
  margin: 0 0 36px 61px;
}
.cbf-hero__line {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-size: 64px;
  line-height: 64px;
  font-weight: var(--font-weight-regular);
  font-feature-settings:
    "liga" off,
    "clig" off;
}
.cbf-hero__line--strong {
  font-weight: var(--font-weight-semibold);
}
.cbf-hero:after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #13273e00 45%, #13273e73);
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-regular` | `400` | primitive |
| `--font-weight-semibold` | `600` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
