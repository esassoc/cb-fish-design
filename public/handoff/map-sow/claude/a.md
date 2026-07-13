# a

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **map-sow** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/map-sow/
- **Section element:** `<a>`
- **Components:** —

## Markup (de-scoped, framework-free)
```html
<a href="#map" class="skip-link">Skip to map</a>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-secondary);
  color: var(--color-text-inverse, #fff);
  padding: 8px 12px;
  z-index: 9999;
  font-size: 13px;
  font-weight: var(--font-weight-bold);
  border-radius: 0 0 4px;
  transition: top 0.1s;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--color-secondary` | `#2770b2` | semantic |
| `--color-text-inverse` | `#fcfcfc` | semantic |
| `--font-weight-bold` | `700` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
