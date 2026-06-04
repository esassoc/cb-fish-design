# Full page

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **home** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/
- **Section element:** `<page>`
- **Components:** cbf-about (spoke), cbf-app-bar (spoke), cbf-bpa-logo (spoke), cbf-container (spoke), cbf-control-pill (spoke), cbf-footer (spoke), cbf-glance (spoke), cbf-hero (spoke), cbf-logo (spoke), cbf-pg-header (spoke), cbf-stat-grid (spoke), cbf-stat-tile (spoke), cbf-svg (spoke), esa-app-bar (hub), esa-icon (hub), esa-icon-button (hub), esa-icon-link (hub), esa-link-column (hub), esa-nav-dropdown (hub)

## Markup (de-scoped, framework-free)
```html
<nav class="esa-app-bar esa-app-bar--brand-strong cbf-app-bar--admin">
  <div class="esa-app-bar__row">
    <div class="esa-app-bar__main">
      <button class="esa-icon-link esa-icon-link--sm esa-icon-link--medium" type="button">
        <span class="esa-icon esa-icon--xs" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
            <path d="M3 12A9 3 0 0 0 21 12"></path>
          </svg>
        </span>
        <span class="esa-icon-link__label">Data management</span>
        <span class="esa-icon esa-icon--xs" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </span>
      </button>
      <button class="esa-icon-link esa-icon-link--sm esa-icon-link--medium" type="button">
        <span class="esa-icon esa-icon--xs" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path
              d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
            ></path>
          </svg>
        </span>
        <span class="esa-icon-link__label">System status</span>
        <span class="esa-icon esa-icon--xs" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </span>
      </button>
      <button class="esa-icon-link esa-icon-link--sm esa-icon-link--medium" type="button">
        <span class="esa-icon esa-icon--xs" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path
              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
            ></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </span>
        <span class="esa-icon-link__label">System configuration</span>
        <span class="esa-icon esa-icon--xs" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </span>
      </button>
    </div>
    <div class="esa-app-bar__end">
      <details class="esa-nav-dropdown esa-nav-dropdown--end">
        <summary class="esa-icon-link esa-icon-link--sm esa-icon-link--medium">
          <span class="esa-icon esa-icon--xs" aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </span>
          <span class="esa-icon-link__label">Help</span>
          <span class="esa-icon esa-icon--xs" aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </span>
        </summary>
        <div class="esa-nav-dropdown__panel">
          <div class="esa-link-column">
            <span class="esa-link-column__head">Help</span>
            <hr class="esa-link-column__rule" />
            <ul class="esa-link-column__list">
              <li>Help Center</li>
              <li>Data dictionary</li>
              <li>EF&amp;W Program documents</li>
              <li>Request support</li>
              <li>Send feedback</li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  </div>
</nav>
<header class="esa-app-bar esa-app-bar--brand cbf-app-bar--header">
  <div class="esa-app-bar__row">
    <div class="esa-app-bar__start">
      <a class="cbf-logo" href="/" title="Columbia Basin Fish &amp; Wildlife Program">
        <img class="cbf-logo__mark" src="assets/logo-mark.svg" alt="" />
        <img
          class="cbf-logo__type"
          src="assets/logo-type.svg"
          alt="Columbia Basin Fish &amp; Wildlife Program"
        />
      </a>
    </div>
    <div class="esa-app-bar__main">
      <details class="esa-nav-dropdown esa-nav-dropdown--start">
        <summary class="esa-icon-link esa-icon-link--md esa-icon-link--medium">
          <span class="esa-icon esa-icon--sm" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"></path>
              <path d="M7 16v6"></path>
              <path d="M13 19v3"></path>
              <path
                d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"
              ></path>
            </svg>
          </span>
          <span class="esa-icon-link__label">Mitigation work</span>
          <span class="esa-icon esa-icon--sm" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </span>
        </summary>
        <div class="esa-nav-dropdown__panel">
          <div class="esa-link-column">
            <span class="esa-link-column__head">Mitigation work</span>
            <hr class="esa-link-column__rule" />
            <ul class="esa-link-column__list">
              <li>Projects</li>
              <li>Contracts</li>
              <li>Portfolios</li>
              <li>Work elements</li>
              <li>Estuary program</li>
              <li>Tributary habitat</li>
              <li>Land acquisitions</li>
            </ul>
          </div>
        </div>
      </details>
      <details class="esa-nav-dropdown esa-nav-dropdown--start">
        <summary class="esa-icon-link esa-icon-link--md esa-icon-link--medium">
          <span class="esa-icon esa-icon--sm" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="M16 7h6v6"></path>
              <path d="m22 7-8.5 8.5-5-5L2 17"></path>
            </svg>
          </span>
          <span class="esa-icon-link__label">Reporting</span>
          <span class="esa-icon esa-icon--sm" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </span>
        </summary>
        <div class="esa-nav-dropdown__panel">
          <div class="esa-link-column">
            <span class="esa-link-column__head">Reporting</span>
            <hr class="esa-link-column__rule" />
            <ul class="esa-link-column__list">
              <li>Report Center</li>
              <li>Maps</li>
              <li>Publications</li>
            </ul>
          </div>
        </div>
      </details>
      <details class="esa-nav-dropdown esa-nav-dropdown--start">
        <summary class="esa-icon-link esa-icon-link--md esa-icon-link--medium">
          <span class="esa-icon esa-icon--sm" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
          </span>
          <span class="esa-icon-link__label">Funding</span>
          <span class="esa-icon esa-icon--sm" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </span>
        </summary>
        <div class="esa-nav-dropdown__panel">
          <div class="esa-link-column">
            <span class="esa-link-column__head">Funding</span>
            <hr class="esa-link-column__rule" />
            <ul class="esa-link-column__list">
              <li>Funds</li>
              <li>Fund budgets summary</li>
              <li>Long-term funding agreements</li>
              <li>Start-of-year (SOY) budgets</li>
              <li>Working budgets</li>
              <li>Budget change requests</li>
              <li>Expenditures</li>
              <li>Accruals</li>
            </ul>
          </div>
        </div>
      </details>
    </div>
    <div class="esa-app-bar__end">
      <button
        class="esa-icon-button esa-icon-button--md"
        type="button"
        aria-label="Search"
        title="Search"
      >
        <span class="esa-icon esa-icon--md" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </span>
      </button>
      <a class="esa-icon-link esa-icon-link--md esa-icon-link--medium" href="#"
        ><span class="esa-icon esa-icon--sm" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
          </svg>
        </span>
        <span class="esa-icon-link__label">Dashboard</span>
      </a>
      <button class="esa-icon-link esa-icon-link--md esa-icon-link--medium" type="button">
        <span class="esa-icon esa-icon--sm" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M18 20a6 6 0 0 0-12 0"></path>
            <circle cx="12" cy="10" r="4"></circle>
          </svg>
        </span>
        <span class="esa-icon-link__label">Angela Zhao</span>
        <span class="esa-icon esa-icon--sm" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</header>
<section class="cbf-hero">
  <div class="cbf-hero__title">
    <h1 class="cbf-hero__line cbf-hero__line--strong">Columbia Basin</h1>
    <h1 class="cbf-hero__line">Fish &amp; Wildlife Program</h1>
  </div>
</section>
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
<div class="cbf-container" style="--cbf-container-max: 1556px">
  <section class="cbf-glance">
    <div class="cbf-pg-header">
      <h2 class="cbf-pg-header__title">Projects at a Glance</h2>
      <div class="cbf-control-pill">
        <button class="cbf-control-pill__btn">
          <span class="esa-icon esa-icon--xs" aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </span>
          Previous
        </button>
        <span class="cbf-control-pill__divider"></span>
        <button class="cbf-control-pill__btn">
          <svg
            class="cbf-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
            <path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path>
            <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path>
            <path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path>
          </svg>
          Enlarge
        </button>
        <span class="cbf-control-pill__divider"></span>
        <button class="cbf-control-pill__btn">
          Next
          <span class="esa-icon esa-icon--xs" aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="cbf-glance__chart">
      <img src="assets/chart.png" alt="Projects at a glance — budget by fiscal year" />
    </div>
    <div class="cbf-glance__meta">
      <span>Pivoted Raw Data with Charts:&nbsp;</span><a href="#">Download Raw</a>
    </div>
  </section>
</div>
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
:root,
[data-theme="cb-fish"] {
  --color-border: #dcdcdc;
  --color-primary: #1e5386;
  --color-primary-border: #c6dcf1;
  --color-primary-subtle: #f3f7fc;
  --color-surface: #ffffff;
  --color-surface-inverse: #13273e;
  --color-text-inverse: #ffffff;
  --color-text-link: #1e5386;
  --color-text-muted: #7c7c7c;
  --color-text-primary: #171717;
  --font-display: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif;
  --font-sans: "IBM Plex Sans", sans-serif;
  --font-weight-bold: 700;
  --font-weight-medium: 500;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --form-height-md: 40px;
  --radius-100: 0.25rem;
  --radius-200: 0.5rem;
  --spacing-100: 0.25rem;
  --spacing-150: 0.375rem;
  --spacing-200: 0.5rem;
  --spacing-300: 0.75rem;
  --spacing-400: 1rem;
  --spacing-500: 1.5rem;
  --spacing-600: 2rem;
  --spacing-650: 2.5rem;
  --spacing-700: 3rem;
  --spacing-800: 4rem;
  --transition-fast: 0.15s ease;
  --type-size-150: clamp(0.6875rem, 0.61rem + 0.38vw, 0.875rem);
  --type-size-200: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: var(--font-sans, system-ui, sans-serif);
  color: var(--color-text-primary, #171717);
  background: var(--color-surface, #fff);
  -webkit-font-smoothing: antialiased;
}
.cbf-app-bar--admin {
  --app-bar-gap: var(--spacing-650);
}
.esa-app-bar {
  --_bar-gap: var(--app-bar-gap, var(--spacing-600, 32px));
  --_bar-pad-x: var(--app-bar-pad-x, var(--spacing-600, 32px));
  --_bar-pad-y: var(--app-bar-pad-y, var(--spacing-400, 16px));
  display: block;
  width: 100%;
  background: var(--color-surface, #fff);
  color: var(--color-text-primary, #171717);
}
.esa-app-bar--brand-strong {
  background: var(--color-surface-inverse, #171717);
  color: var(--color-text-inverse, #fff);
}
.esa-app-bar__row {
  display: flex;
  align-items: center;
  gap: var(--_bar-gap);
  padding: var(--_bar-pad-y) var(--_bar-pad-x);
}
.esa-app-bar__start,
.esa-app-bar__main,
.esa-app-bar__end {
  display: inline-flex;
  align-items: center;
  gap: var(--_bar-gap);
}
.esa-app-bar__main {
  flex: 1 1 auto;
}
.esa-icon-link {
  --_il-font: 1rem;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150, 6px);
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  color: inherit;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: var(--_il-font);
  font-weight: var(--font-weight-medium, 500);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}
.esa-icon-link--sm {
  --_il-font: 0.875rem;
}
.esa-icon-link--medium {
  font-weight: var(--font-weight-medium, 500);
}
.esa-icon {
  --_icon-size: var(--icon-size-medium, 20px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  line-height: 1;
  color: inherit;
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-icon-link__label {
  display: inline-block;
}
.esa-app-bar__end {
  flex: none;
  margin-left: auto;
}
.esa-nav-dropdown {
  position: relative;
}
summary.esa-icon-link {
  list-style: none;
}
.esa-nav-dropdown .esa-icon-link > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.cbf-app-bar--header {
  --app-bar-gap: var(--spacing-800);
}
.esa-app-bar--brand {
  background: var(--color-primary, #005862);
  color: var(--color-text-inverse, #fff);
}
.esa-app-bar__start {
  flex: none;
}
a {
  color: var(--color-text-link, #1e5386);
  text-decoration: none;
}
.cbf-logo {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-300, 12px);
  flex: none;
  color: inherit;
  text-decoration: none;
}
img {
  display: block;
  max-width: 100%;
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
.esa-icon-button {
  --_ib-size: var(--form-height-md, 40px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_ib-size);
  height: var(--_ib-size);
  padding: 0;
  border: 0;
  border-radius: var(--radius-200, 8px);
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background var(--transition-fast, 0.15s ease);
  -webkit-appearance: none;
  appearance: none;
}
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
.cbf-glance {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-500);
  padding-block: var(--spacing-600);
}
.cbf-pg-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-600);
}
.cbf-pg-header__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--font-weight-semibold);
  font-size: 40px;
  line-height: 40px;
}
.cbf-control-pill {
  display: flex;
  align-items: center;
  gap: var(--spacing-500);
  padding: var(--spacing-300) var(--spacing-500);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-100);
}
.cbf-control-pill__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-200);
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-sans);
  color: var(--color-primary);
  background: none;
  border: 0;
  cursor: pointer;
}
.cbf-control-pill__btn .esa-icon {
  width: 12px;
  height: 12px;
}
.cbf-control-pill__btn .esa-icon svg {
  width: 12px;
  height: 12px;
}
.cbf-control-pill__divider {
  width: 1px;
  height: 16px;
  background: var(--color-border);
}
.cbf-svg {
  width: 12px;
  height: 12px;
  display: block;
  flex: none;
}
.cbf-glance__chart {
  width: 100%;
}
.cbf-glance__chart img {
  width: 100%;
  height: auto;
}
.cbf-glance__meta {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-block: var(--spacing-200);
  border-top: 1px solid var(--color-border);
  font-size: 14px;
}
.cbf-glance__meta span {
  color: var(--color-text-muted);
}
.cbf-glance__meta a {
  color: var(--color-primary);
  text-decoration: underline;
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
| `--color-border` | `#dcdcdc` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-border` | `#c6dcf1` | semantic |
| `--color-primary-subtle` | `#f3f7fc` | semantic |
| `--color-surface` | `#ffffff` | semantic |
| `--color-surface-inverse` | `#13273e` | semantic |
| `--color-text-inverse` | `#ffffff` | semantic |
| `--color-text-link` | `#1e5386` | semantic |
| `--color-text-muted` | `#7c7c7c` | semantic |
| `--color-text-primary` | `#171717` | semantic |
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | primitive |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-bold` | `700` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--font-weight-regular` | `400` | primitive |
| `--font-weight-semibold` | `600` | primitive |
| `--form-height-md` | `40px` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-650` | `2.5rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--transition-fast` | `.15s ease` | primitive |
| `--type-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
