# Welcome to the Columbia Basin Fish & Wildlife Program

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **home** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/
- **Section element:** `<div>`
- **Components:** cbf-about (spoke), cbf-container (spoke), cbf-stat-grid (spoke), cbf-stat-tile (spoke)

## Markup (de-scoped, framework-free)
```html
<div class="cbf-container" style="--cbf-container-max: 1300px">
  <section class="cbf-about">
    <div class="cbf-stat-grid">
      <div class="cbf-stat-tile">
        <span class="cbf-stat-tile__num">37</span> <span class="cbf-stat-tile__label">Funds</span>
      </div>
      <div class="cbf-stat-tile">
        <span class="cbf-stat-tile__num">317</span>
        <span class="cbf-stat-tile__label">Projects</span>
      </div>
      <div class="cbf-stat-tile">
        <span class="cbf-stat-tile__num">766</span>
        <span class="cbf-stat-tile__label">Contracts</span>
      </div>
      <div class="cbf-stat-tile">
        <span class="cbf-stat-tile__num">68,793</span>
        <span class="cbf-stat-tile__label">Work sites</span>
      </div>
    </div>
    <div class="cbf-about__copy">
      <h2 class="cbf-about__title">Welcome to the Columbia Basin Fish &amp; Wildlife Program</h2>
      <p class="cbf-about__body">
        This interactive site provides the public with an unprecedented view into Bonneville Power
        Administration's implementation of the Columbia Basin Fish &amp; Wildlife Program, which
        spans across a four-state region and is the largest environmental program of its kind in the
        world. Developed by the Northwest Power and Conservation Council pursuant to the Northwest
        Electric Power Planning and Conservation Act of 1980, the Program measures for the purpose
        of protecting, mitigating, and enhancing fish and wildlife, including related spawning
        grounds and habitat, on the Columbia River and its tributaries.
      </p>
      <p class="cbf-about__body">
        Scope of this site includes project proposals from fiscal year 2007 forward, and budget
        adjustments from 2004 forward. If you have questions or comments, we always welcome your
        feedback.
      </p>
    </div>
  </section>
</div>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.cbf-container {
  width: 100%;
  max-width: var(--cbf-container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--spacing-600);
}
.cbf-about {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: var(--spacing-600);
  align-items: start;
  padding-block: var(--spacing-800);
}
.cbf-stat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-400);
}
.cbf-stat-tile {
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-200);
  align-items: center;
  justify-content: center;
  background: var(--color-primary-subtle);
  border: 2px solid var(--color-primary-border);
}
.cbf-stat-tile__num {
  font-family: var(--font-display);
  font-weight: var(--font-weight-semibold);
  font-size: 60px;
  line-height: 60px;
  color: var(--color-text-primary);
}
.cbf-stat-tile__label {
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  text-align: center;
}
.cbf-about__copy {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.cbf-about__title {
  margin: 0;
  font-size: 28px;
  font-weight: var(--font-weight-medium);
  line-height: 40px;
}
.cbf-about__body {
  margin: 0;
  font-size: 24px;
  font-weight: var(--font-weight-regular);
  line-height: 32px;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--cbf-container-max` | `1300px` | brand |
| `--color-primary-border` | `#c6dcf1` | semantic |
| `--color-primary-subtle` | `#f3f7fc` | semantic |
| `--color-text-primary` | `#171717` | semantic |
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--font-weight-regular` | `400` | primitive |
| `--font-weight-semibold` | `600` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-800` | `4rem` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
