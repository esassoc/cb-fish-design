# Intro

BiOp landing page · source prototype: https://esassoc.github.io/cb-fish-design/biop-reporting/

![Intro, desktop](https://esassoc.github.io/cb-fish-design/handoff/biop-reporting/claude/intro.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/biop-reporting/claude/intro.phone.png

Photo and prose explaining what BiOp reporting is: BPA consults with USFWS and NMFS under ESA Section 7, and tracks programmatic biological opinions such as HIP4.

## Key decisions

- The copy is taken verbatim from the live CBFish BiOp reporting summary page, not written for the prototype.

## Components

- `cbf-report-intro` (spoke) · `src/components/shared/cbf-report-intro.astro`

## Markup

```html
<section class="cbf-report-intro">
  <figure class="cbf-report-intro__media">
    <img
      src="/cb-fish-design/biop-reporting-hero.png"
      alt="A forested stream in the Columbia Basin"
      loading="lazy"
    />
  </figure>
  <div class="cbf-report-intro__copy">
    <p class="cbf-report-intro__lede">
      Under the Endangered Species Act (ESA), BPA consults with the United States Fish and Wildlife
      Service (USFWS) and the National Marine Fisheries Service (NMFS) to protect ESA-listed species
      affected by the operation and maintenance of the power system through the ESA Section 7
      interagency process.
    </p>
    <p class="cbf-report-intro__body">
      In BPA's service territory, the USFWS holds jurisdiction over terrestrial and freshwater
      species, while NMFS holds jurisdiction over marine mammals and anadromous salmon and
      steelhead. BPA works with NMFS and USFWS to make collaboration as efficient as possible
      through the identification and tracking of programmatic biological opinions (BiOps) for BPA's
      Fish and Wildlife Program. The Habitat Improvement Program Biological Opinion, or HIP4, is a
      BiOp that provides ESA compliance for most of the habitat improvement activities that BPA
      funds, and has created a streamlined process, saving time and money for federal agencies while
      accelerating habitat improvement project implementation. Several iterations of this BiOp have
      been published, and efforts have been tracked in accordance with each iteration.
    </p>
  </div>
</section>
```

## Styles

```css
.cbf-report-intro {
  display: grid;
  grid-template-columns: minmax(280px, 38%) 1fr;
  gap: var(--spacing-700, 2.5rem);
  align-items: stretch;
}
.cbf-report-intro__media {
  margin: 0;
  align-self: start;
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-100);
  overflow: hidden;
  background: var(--color-background-elevation-sunken);
}
.cbf-report-intro__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
}
.cbf-report-intro__copy {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
  justify-content: center;
  min-width: 0;
}
.cbf-report-intro__lede {
  margin: 0;
  font-size: 24px;
  line-height: 1.4;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
}
.cbf-report-intro__body {
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-content-default-secondary);
}
@media (max-width: 800px) {
  .cbf-report-intro {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 800px) {
  .cbf-report-intro__media {
    aspect-ratio: 2 / 1;
  }
}
```

## Tokens

| Token | Value | Tier |
|---|---|---|
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--radius-100` | `.25rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--typography-font-weight-semibold` | `600` | semantic |
