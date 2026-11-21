# Page title

Contract header navigation · source prototype: https://esassoc.github.io/cb-fish-design/contract-nav/summary/

![Page title, desktop](https://esassoc.github.io/cb-fish-design/handoff/contract-nav-summary/claude/page-title.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/contract-nav-summary/claude/page-title.phone.png

The page being viewed: its phase or menu on a quiet line ("Setup"), directly over the page name as an H2 in brand navy ("Work Element Budgets").

## Key decisions

- No slash, no page count. Tight line height with a 2px gap so the two lines read as one unit.
- Phase line body-sm medium in secondary text; page name in the title composite at semibold.
- Where page and phase share a name (Closeout), the name shows once.

## Components

- `cbf-record-page-title` (spoke) · `src/components/contract-nav/cbf-record-page-title.astro`

## Behavior

- `src/components/contract-nav/cbf-record-page-title.astro`

## Markup

```html
<div class="cbf-record-page-title stack" data-gap="3xs">
  <p class="cbf-record-page-title__section typography-body-sm">Overview</p>
  <h2 class="cbf-record-page-title__name typography-title">Contract summary</h2>
</div>
```

## Styles

```css
.typography-title {
  font-family: var(--typography-title-font-family);
  font-size: var(--typography-title-font-size);
  font-weight: var(--typography-title-font-weight);
  line-height: var(--typography-title-line-height);
  letter-spacing: var(--typography-title-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-title {
  font-family: var(--typography-title-font-family);
  font-size: var(--typography-title-font-size);
  font-weight: var(--typography-title-font-weight);
  line-height: var(--typography-title-line-height);
  letter-spacing: var(--typography-title-letter-spacing);
}
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.cbf-record-page-title__section,
.cbf-record-page-title__name {
  margin: 0;
  line-height: var(--line-height-tight);
}
.cbf-record-page-title__section {
  color: var(--color-content-default-secondary);
  font-weight: var(--typography-font-weight-medium);
}
.cbf-record-page-title__name {
  color: var(--color-background-default-knockout);
  font-weight: var(--typography-font-weight-semibold);
}
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.stack[data-split] > [data-split] {
  margin-block-end: auto;
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--gap` | `.125rem` | component |
| `--line-height-tight` | `1.3` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-title-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-title-font-size` | `clamp(1rem, .88rem + .6vw, 1.25rem)` | semantic |
| `--typography-title-font-weight` | `500` | semantic |
| `--typography-title-letter-spacing` | `.01em` | semantic |
| `--typography-title-line-height` | `1.6` | semantic |
