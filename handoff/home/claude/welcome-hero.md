# Welcome hero

CBFish homepage · source prototype: https://esassoc.github.io/cb-fish-design/home/

![Welcome hero, desktop](https://esassoc.github.io/cb-fish-design/handoff/home/claude/welcome-hero.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/home/claude/welcome-hero.phone.png

## Components

- `cbf-welcome-hero` (spoke) · `src/components/cbfish-home/cbf-welcome-hero.astro`

## Markup

```html
<section class="cbf-welcome-hero">
  <img
    class="cbf-welcome-hero__img"
    src="/cb-fish-design/cbfish-homepage-hero.jpg"
    alt="The Columbia River at dawn, with basin mountains and sky mirrored in still water"
  />
  <div class="cbf-welcome-hero__scrim"></div>
  <div class="cbf-welcome-hero__inner">
    <p class="cbf-welcome-hero__eyebrow">Columbia Basin Fish &amp; Wildlife Program</p>
    <p class="cbf-welcome-hero__tagline">
      An unprecedented view into the region’s fish &amp; wildlife mitigation.
    </p>
  </div>
  <p class="cbf-welcome-hero__credit">Photo: Rob Meyers / BPA</p>
</section>
```

## Styles

```css
.cbf-welcome-hero {
  position: relative;
  min-height: clamp(320px, 42vw, 520px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  isolation: isolate;
}
.cbf-welcome-hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
  z-index: -2;
}
.cbf-welcome-hero__scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--color-background-default-knockout) 82%, transparent) 0%,
    color-mix(in srgb, var(--color-background-default-knockout) 38%, transparent) 38%,
    transparent 72%
  );
}
.cbf-welcome-hero__inner {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: var(--spacing-800) var(--spacing-600);
  color: var(--color-content-default-knockout, #fff);
}
.cbf-welcome-hero__eyebrow {
  margin: 0 0 var(--spacing-200);
  font-family: var(--font-sans-condensed, var(--typography-font-family-sans));
  font-size: 15px;
  font-weight: var(--typography-font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cbf-gold-200, #f3d99b);
}
.cbf-welcome-hero__tagline {
  margin: 0;
  max-width: 22ch;
  font-family: var(--typography-font-family-display, var(--typography-font-family-sans));
  font-size: clamp(28px, 4vw, 48px);
  font-weight: var(--typography-font-weight-bold, 700);
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.cbf-welcome-hero__credit {
  position: absolute;
  right: var(--spacing-400);
  bottom: var(--spacing-200);
  margin: 0;
  font-size: 12px;
  color: color-mix(in srgb, var(--color-content-default-knockout, #fff) 75%, transparent);
}
@media (max-width: 680px) {
  .cbf-welcome-hero__inner {
    padding: var(--spacing-700) var(--spacing-500);
  }
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--cbf-gold-200` | `#f3d99b` | brand |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-bold` | `700` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
