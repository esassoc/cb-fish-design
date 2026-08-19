# Main

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **crs-commitments** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/biop-reporting/
- **Section element:** `<main>`
- **Components:** cbf-app-panel (spoke), cbf-page (spoke), cbf-page-heading (spoke), cbf-password-gate (spoke), cbf-related-items (spoke), cbf-report-intro (spoke), cbf-report-tabs (spoke), esa-breadcrumbs (hub), esa-button (hub), esa-card (hub), esa-container (hub), esa-icon (hub)

## Markup (de-scoped, framework-free)
```html
<main class="cbf-page">
  <div class="esa-container typography-body-md" style="--_container-max: 1920px">
    <section class="cbf-app-panel">
      <div class="cbf-app-panel__crumb">
        <nav class="esa-breadcrumbs esa-breadcrumbs--md" aria-label="Breadcrumb">
          <ol class="esa-breadcrumbs__list">
            <li class="esa-breadcrumbs__item">
              <a href="/cb-fish-design/home" class="esa-breadcrumbs__link typography-body-md">
                <span class="esa-breadcrumbs__icon"
                  ><svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <path d="M9 22V12h6v10"></path></svg
                ></span>
                Home
              </a>
              <svg
                class="esa-breadcrumbs__separator"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li class="esa-breadcrumbs__item">
              <span class="esa-breadcrumbs__current typography-label-md"> Reporting </span>
              <svg
                class="esa-breadcrumbs__separator"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li class="esa-breadcrumbs__item" aria-current="page">
              <span class="esa-breadcrumbs__current typography-label-md"> BiOp reporting </span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="cbf-app-panel__body">
        <div class="cbf-app-panel__content">
          <div class="cbf-password-gate" data-cbf-gate="" data-storage-key="cbf-gate-unlocked">
            <div class="cbf-password-gate__lock" data-cbf-gate-lock="">
              <div class="esa-card esa-card--outlined esa-card--padding-spacious">
                <div class="esa-card__body typography-body-md">
                  <div class="cbf-password-gate__body stack" data-gap="lg">
                    <div class="cbf-password-gate__icon" aria-hidden="true">
                      <span class="esa-icon esa-icon--lg" aria-hidden="true">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          focusable="false"
                        >
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </span>
                    </div>
                    <div class="stack" data-gap="xs">
                      <h1 class="typography-title">This prototype is password protected</h1>
                      <p class="typography-body-md cbf-password-gate__desc">
                        Enter the password to continue.
                      </p>
                    </div>
                    <form class="stack" data-gap="md" data-cbf-gate-form="">
                      <esa-text-field
                        type="password"
                        label="Password"
                        data-cbf-gate-input="true"
                        required=""
                        size="md"
                      ></esa-text-field>
                      <span
                        class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
                        ><button class="esa-button__native typography-microcopy-md" type="submit">
                          <span class="esa-button__label">Unlock</span>
                        </button></span
                      >
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="cbf-password-gate__content" data-cbf-gate-content="" hidden="">
              <h1 class="cbf-page-heading">BiOp reporting: Summary</h1>
              <nav class="cbf-report-tabs" aria-label="BiOp reporting sections">
                <a
                  class="cbf-report-tabs__tab is-active"
                  href="/cb-fish-design/biop-reporting"
                  aria-current="page"
                  >Summary</a
                >
                <details class="cbf-report-tabs__dropdown" name="cbf-report-tabs-menu">
                  <summary class="cbf-report-tabs__tab cbf-report-tabs__dropdown-trigger">
                    2020 CRS Commitments<span class="cbf-report-tabs__chev"
                      ><svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6"></path></svg
                    ></span>
                  </summary>
                  <div class="cbf-report-tabs__menu" role="menu">
                    <a
                      class="cbf-report-tabs__menu-item"
                      role="menuitem"
                      href="/cb-fish-design/crs-commitments"
                      >Commitments</a
                    ><a
                      class="cbf-report-tabs__menu-item"
                      role="menuitem"
                      href="/cb-fish-design/crs-commitments/dashboard"
                      >Dashboard</a
                    ><a
                      class="cbf-report-tabs__menu-item"
                      role="menuitem"
                      href="/cb-fish-design/crs-commitments/documents"
                      >Document Library</a
                    >
                  </div>
                </details>
                <details class="cbf-report-tabs__dropdown" name="cbf-report-tabs-menu">
                  <summary class="cbf-report-tabs__tab cbf-report-tabs__dropdown-trigger">
                    CRS habitat<span class="cbf-report-tabs__chev"
                      ><svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6"></path></svg
                    ></span>
                  </summary>
                  <div class="cbf-report-tabs__menu" role="menu">
                    <a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >CRS habitat reports</a
                    ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >CRS habitat report measures</a
                    ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >CRS habitat report map</a
                    ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >CRS habitat measure targets</a
                    ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >CRS habitat metrics report</a
                    ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >CRS habitat metrics report - interactive</a
                    >
                  </div>
                </details>
                <details class="cbf-report-tabs__dropdown" name="cbf-report-tabs-menu">
                  <summary class="cbf-report-tabs__tab cbf-report-tabs__dropdown-trigger">
                    FCRPS BiOp<span class="cbf-report-tabs__chev"
                      ><svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6"></path></svg
                    ></span>
                  </summary>
                  <div class="cbf-report-tabs__menu" role="menu">
                    <a class="cbf-report-tabs__menu-item" role="menuitem" href="#">FCRPS BiOp</a
                    ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >FCRPS BiOp dashboard</a
                    ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >FCRPS 2008 BiOp actions</a
                    ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >Project associations to FCRPS 2008 BiOp</a
                    ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >FCRPS BiOp RPAs and Associated BPA Projects</a
                    >
                  </div>
                </details>
                <details class="cbf-report-tabs__related" name="cbf-report-tabs-menu">
                  <summary class="cbf-report-tabs__tab cbf-report-tabs__related-trigger">
                    Related items<span class="cbf-report-tabs__chev"
                      ><svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6"></path></svg
                    ></span>
                  </summary>
                  <div class="cbf-report-tabs__menu" role="menu">
                    <a class="cbf-report-tabs__menu-item" role="menuitem" href="#"
                      >Reclamation uploader</a
                    >
                  </div>
                </details>
              </nav>
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
                    Under the Endangered Species Act (ESA), BPA consults with the United States Fish
                    and Wildlife Service (USFWS) and the National Marine Fisheries Service (NMFS) to
                    protect ESA-listed species affected by the operation and maintenance of the
                    power system through the ESA Section 7 interagency process.
                  </p>
                  <p class="cbf-report-intro__body">
                    In BPA's service territory, the USFWS holds jurisdiction over terrestrial and
                    freshwater species, while NMFS holds jurisdiction over marine mammals and
                    anadromous salmon and steelhead. BPA works with NMFS and USFWS to make
                    collaboration as efficient as possible through the identification and tracking
                    of programmatic biological opinions (BiOps) for BPA's Fish and Wildlife Program.
                    The Habitat Improvement Program Biological Opinion, or HIP4, is a BiOp that
                    provides ESA compliance for most of the habitat improvement activities that BPA
                    funds, and has created a streamlined process, saving time and money for federal
                    agencies while accelerating habitat improvement project implementation. Several
                    iterations of this BiOp have been published, and efforts have been tracked in
                    accordance with each iteration.
                  </p>
                </div>
              </section>
              <section class="cbf-related-items" id="related-items" aria-label="Related items">
                <h2 class="cbf-related-items__head typography-heading-md">Related items</h2>
                <div class="cbf-related-items__grid grid cbf-related-items__grid--single">
                  <div class="esa-card esa-card--outlined">
                    <div class="esa-card__header">
                      <div class="esa-card__header-content">
                        <div class="esa-card__titles">
                          <h3 class="esa-card__title typography-title-sm-strong">
                            Reclamation uploader
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div class="esa-card__body typography-body-md">
                      <div class="cbf-related-items__card">
                        <p class="cbf-related-items__overview">
                          <strong>Overview:</strong> Upload XLSX files containing Biological Opinion
                          Reclamation data.
                        </p>
                      </div>
                    </div>
                    <div class="esa-card__footer typography-meta">
                      <div class="cbf-related-items__foot">
                        <span
                          class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
                          ><a
                            class="esa-button__native typography-microcopy-xs"
                            href="#"
                            role="button"
                            ><span class="esa-button__label">View page</span></a
                          ></span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <!-- Password lives here in plain text — see the security note above; there
       is no way to protect a value that must be checked client-side. -->
            <script type="application/json" data-cbf-gate-password="">
              "2020crs"
            </script>
          </div>
          <script
            type="module"
            src="/cb-fish-design/_astro/cbf-password-gate.astro_astro_type_script_index_0_lang.Xo-G2OVc.js"
          ></script>
        </div>
      </div>
    </section>
  </div>
</main>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.cbf-app-panel {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  overflow: clip;
  background: var(--color-background-elevation-raised);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--color-background-default-knockout) 8%, transparent);
}
.cbf-app-panel__crumb {
  background: var(--cbf-surface-crumb);
  border-bottom: 1px solid var(--color-border-default);
  padding: var(--spacing-400) var(--spacing-600);
}
.esa-breadcrumbs {
  --_crumb-link-color: var(--breadcrumbs-link-color, #646464);
  --_crumb-link-hover: var(--breadcrumbs-link-hover, #202020);
  --_crumb-current-color: var(--color-content-default, #202020);
  --_crumb-separator-color: var(--color-border-default-strong, #bbbbbb);
  --_crumb-gap: var(--spacing-200, 8px);
  display: block;
  background: var(--breadcrumbs-bg, transparent);
}
.cbf-app-panel__crumb .esa-breadcrumbs {
  --breadcrumbs-link-color: var(--color-content-default-secondary);
  --breadcrumbs-link-hover: var(--color-background-brand);
}
.esa-breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--_crumb-gap);
  list-style: none;
  margin: 0;
  padding: 0;
}
.esa-breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: var(--_crumb-gap);
}
.esa-breadcrumbs__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  color: var(--_crumb-link-color);
  text-decoration-color: transparent;
}
.esa-breadcrumbs__icon {
  display: inline-flex;
  align-items: center;
}
.esa-breadcrumbs__separator {
  flex-shrink: 0;
  color: var(--_crumb-separator-color);
}
.esa-breadcrumbs__current {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  color: var(--_crumb-current-color);
}
.cbf-app-panel__body {
  flex: 1;
}
.cbf-app-panel__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
  padding: var(--spacing-600);
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
}
.typography-microcopy-md {
  font-family: var(--typography-microcopy-md-font-family);
  font-size: var(--typography-microcopy-md-font-size);
  font-weight: var(--typography-microcopy-md-font-weight);
  line-height: var(--typography-microcopy-md-line-height);
  letter-spacing: var(--typography-microcopy-md-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-title {
  font-family: var(--typography-title-font-family);
  font-size: var(--typography-title-font-size);
  font-weight: var(--typography-title-font-weight);
  line-height: var(--typography-title-line-height);
  letter-spacing: var(--typography-title-letter-spacing);
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.esa-button {
  --_btn-pad-y: var(--spacing-300, 0.75rem);
  --_btn-padding-x: var(--spacing-300, 0.75rem);
  --_btn-radius: var(--button-radius-md, 0.5rem);
  --_accent: var(--color-background-brand, #46a758);
  --_accent-hover: var(--color-background-brand-hover, #3e9b4f);
  --_on: var(--color-content-default-knockout, #fcfcfc);
  --_accent-text: var(--_accent);
  --_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);
  --_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);
  display: inline-block;
}
.esa-button--sm {
  --_btn-pad-y: var(--spacing-250, 0.625rem);
  --_btn-padding-x: var(--spacing-250, 0.625rem);
  --_btn-radius: var(--button-radius-sm, 4px);
}
.esa-button__native {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200, 8px);
  width: 100%;
  padding-block: var(--_btn-pad-y);
  padding-inline: var(--_btn-padding-x);
  border: var(--border-width-default, 1px) solid transparent;
  border-radius: var(--_btn-radius);
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--transition-fast, 0.15s ease),
    border-color var(--transition-fast, 0.15s ease);
  -webkit-appearance: none;
  appearance: none;
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent-border, transparent);
}
.esa-button--variant-chrome .esa-button__native {
  background: transparent;
  color: inherit;
  border-color: transparent;
}
.esa-icon {
  --_icon-size: var(--icon-size-md, 20px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  color: inherit;
}
.esa-icon--sm {
  --_icon-size: var(--icon-size-sm, 16px);
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-button__label {
  white-space: nowrap;
}
summary.esa-button {
  list-style: none;
  cursor: pointer;
}
.esa-icon--md {
  --_icon-size: var(--icon-size-md, 20px);
}
.esa-icon--lg {
  --_icon-size: var(--icon-size-lg, 24px);
}
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-microcopy-md-subtle {
  font-family: var(--typography-microcopy-md-subtle-font-family);
  font-size: var(--typography-microcopy-md-subtle-font-size);
  font-weight: var(--typography-microcopy-md-subtle-font-weight);
  line-height: var(--typography-microcopy-md-subtle-line-height);
  letter-spacing: var(--typography-microcopy-md-subtle-letter-spacing);
}
.cbf-page {
  padding-block: var(--spacing-600) var(--spacing-800);
}
.esa-container {
  width: 100%;
  max-width: var(--_container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--spacing-600, 2rem);
}
.cbf-password-gate__lock {
  display: flex;
  justify-content: center;
  padding-block: var(--spacing-800, 4rem);
}
.esa-card {
  --_card-bg: var(--card-bg, var(--color-background-elevation-raised, #fcfcfc));
  --_card-border: var(--card-border-color, var(--color-border-default, #cecece));
  --_card-radius: var(--radius-md, 0.5rem);
  --_card-padding: var(--spacing-500, 1.5rem);
  --_card-header-bg: var(--card-header-bg, transparent);
  --_card-header-color: var(--color-content-default, #202020);
  --_card-header-border: var(--color-border-default-subtle, #d9d9d9);
  display: block;
  background: var(--_card-bg);
  border: var(--border-width-default, 1px) solid var(--_card-border);
  border-radius: var(--_card-radius);
  overflow: hidden;
}
.esa-card--outlined {
  --_card-border: var(--color-border-default, #cecece);
}
.esa-card--padding-spacious {
  --_card-padding: var(--spacing-700, 3rem);
}
.cbf-password-gate__lock .esa-card {
  max-width: 26rem;
  width: 100%;
}
.esa-card__body {
  padding: var(--_card-padding);
}
.cbf-password-gate__body {
  align-items: center;
  text-align: center;
}
.cbf-password-gate__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full, 999px);
  background: var(--color-background-elevation-sunken);
  color: var(--color-content-default-secondary);
}
.cbf-password-gate__desc {
  color: var(--color-content-default-secondary);
}
.cbf-password-gate__lock form {
  width: 100%;
  text-align: left;
}
.cbf-password-gate__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.cbf-password-gate__content[hidden] {
  display: none;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--border-width-default` | `1px` | semantic |
| `--breadcrumbs-bg` | `transparent` | component |
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#3d3d3d` | component |
| `--button-radius-md` | `.5rem` | component |
| `--button-radius-sm` | `.25rem` | component |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-header-bg` | `transparent` | component |
| `--cbf-surface-crumb` | `#f4f4f4` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--icon-size-lg` | `24px` | primitive |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-sm` | `16px` | primitive |
| `--radius-100` | `.25rem` | primitive |
| `--radius-full` | `9999px` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--transition-fast` | `.15s ease` | semantic |
| `--typography-body-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-body-md-font-weight` | `400` | semantic |
| `--typography-body-md-letter-spacing` | `.01em` | semantic |
| `--typography-body-md-line-height` | `1.6` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |
| `--typography-microcopy-md-subtle-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-subtle-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-subtle-font-weight` | `400` | semantic |
| `--typography-microcopy-md-subtle-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-subtle-line-height` | `1` | semantic |
| `--typography-microcopy-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-font-weight` | `500` | semantic |
| `--typography-microcopy-xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-line-height` | `1` | semantic |
| `--typography-title-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-title-font-size` | `clamp(1rem, .88rem + .6vw, 1.25rem)` | semantic |
| `--typography-title-font-weight` | `500` | semantic |
| `--typography-title-letter-spacing` | `.01em` | semantic |
| `--typography-title-line-height` | `1.6` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
