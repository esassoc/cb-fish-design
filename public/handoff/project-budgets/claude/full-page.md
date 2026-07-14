# Full page

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **project-budgets** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/project-budgets/
- **Section element:** `<page>`
- **Components:** cbf-app-bar (spoke), cbf-app-panel (spoke), cbf-icon (spoke), cbf-logo (spoke), cbf-nav-actions (spoke), cbf-nav-burger (spoke), cbf-nav-collapsible (spoke), cbf-nav-drawer (spoke), cbf-nav-link (spoke), cbf-omni (spoke), cbf-omni-trigger (spoke), cbf-page (spoke), cbf-page-heading (spoke), cbf-related-items (spoke), cbf-report-intro (spoke), cbf-report-tabs (spoke), cbf-search-surface (spoke), esa-app-bar (hub), esa-breadcrumbs (hub), esa-button (hub), esa-card (hub), esa-container (hub), esa-icon (hub), esa-icon-button (hub), esa-icon-link (hub), esa-kbd (hub), esa-link-column (hub), esa-nav-dropdown (hub)

## Markup (de-scoped, framework-free)
```html
<nav class="esa-app-bar esa-app-bar--brand-strong cbf-app-bar--admin">
  <div class="esa-app-bar__row">
    <div class="esa-app-bar__start">
      <div class="cbf-nav-collapsible">
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
    </div>
    <div class="esa-app-bar__main">
      <button class="cbf-omni-trigger" type="button" data-omni-open="" aria-label="Search">
        <span class="cbf-icon"
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
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path></svg
        ></span>
        <span class="cbf-omni-trigger__ph">Search projects, contracts, people…</span>
        <kbd class="cbf-omni-trigger__kbd">/</kbd>
      </button>
    </div>
    <div class="esa-app-bar__end">
      <div class="cbf-nav-collapsible">
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
                <li>Help center</li>
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
  </div>
</nav>
<header class="esa-app-bar esa-app-bar--brand cbf-app-bar--header">
  <div class="esa-app-bar__row">
    <div class="esa-app-bar__start">
      <span class="cbf-nav-burger" data-nav-toggle="">
        <button
          class="esa-icon-button esa-icon-button--md"
          type="button"
          aria-label="Open menu"
          title="Open menu"
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
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </span>
        </button>
      </span>
      <a
        class="cbf-logo"
        href="/cb-fish-design/home"
        title="Columbia Basin Fish &amp; Wildlife Program"
      >
        <img class="cbf-logo__mark" src="/cb-fish-design/logo-mark.svg" alt="" />
        <img
          class="cbf-logo__type"
          src="/cb-fish-design/logo-type.svg"
          alt="Columbia Basin Fish &amp; Wildlife Program"
        />
      </a>
    </div>
    <div class="esa-app-bar__main">
      <div class="cbf-nav-collapsible cbf-nav-collapsible--inline">
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
    </div>
    <div class="esa-app-bar__end">
      <div class="cbf-nav-actions">
        <button class="cbf-nav-link cbf-nav-link--collapse" type="button">
          <span class="cbf-icon"
            ><svg
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
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
              <path d="M12 7v5l4 2"></path></svg
          ></span>
          Recent
          <span class="cbf-icon"
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
        </button>
        <a class="cbf-nav-link cbf-nav-link--collapse" href="#">
          <span class="cbf-icon"
            ><svg
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
              <rect width="7" height="9" x="3" y="3" rx="1"></rect>
              <rect width="7" height="5" x="14" y="3" rx="1"></rect>
              <rect width="7" height="9" x="14" y="12" rx="1"></rect>
              <rect width="7" height="5" x="3" y="16" rx="1"></rect></svg
          ></span>
          Dashboard
        </a>
        <button class="cbf-nav-link cbf-nav-link--user" type="button" data-omni-user="">
          <span class="cbf-icon"
            ><svg
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
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M18 20a6 6 0 0 0-12 0"></path>
              <circle cx="12" cy="10" r="4"></circle></svg
          ></span>
          Angela Zhao
          <span class="cbf-icon"
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
        </button>
      </div>
    </div>
  </div>
</header>
<div class="cbf-omni" data-omni="" hidden="">
  <div class="cbf-omni__scrim" data-omni-close=""></div>
  <div
    class="cbf-omni__panel cbf-search-surface"
    role="dialog"
    aria-modal="true"
    aria-label="Search"
  >
    <div class="cbf-omni__searchrow">
      <span class="cbf-icon cbf-omni__searchicon"
        ><svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path></svg
      ></span>
      <input
        class="cbf-omni__input"
        data-omni-input=""
        type="text"
        placeholder="Search projects, contracts, people, publications…"
        autocomplete="off"
      />
      <button class="cbf-omni__clear" data-omni-clear="" type="button" aria-label="Clear">
        <span class="cbf-icon"
          ><svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path></svg
        ></span>
      </button>
    </div>
    <div class="cbf-omni__scopes" data-omni-scopes=""></div>
    <div class="cbf-omni__body">
      <!-- default view: brand illustration + search note (Recent lives in the nav) -->
      <div class="cbf-omni__empty" data-omni-empty="">
        <div class="cbf-omni__hero">
          <img class="cbf-omni__art" src="/cb-fish-design/dam-illustration.jpg" alt="" />
          <p class="cbf-omni__hero-title">Search the Program</p>
          <p class="cbf-omni__hero-note">
            Find projects, contracts, people, and publications across the Columbia Basin. Start
            typing, or press <kbd class="esa-kbd">Tab</kbd> to choose a scope.
          </p>
        </div>
      </div>
      <!-- query view: grouped results (injected) -->
      <div class="cbf-omni__results" data-omni-results="" hidden=""></div>
    </div>
    <button class="cbf-omni__showall" data-omni-showall="" type="button" hidden="">
      <span data-omni-showall-label="">Show all results</span>
      <span class="cbf-icon"
        ><svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6"></path></svg
      ></span>
    </button>
    <div class="cbf-omni__footer">
      <div class="cbf-omni__hints">
        <span><kbd class="esa-kbd">↑</kbd> <kbd class="esa-kbd">↓</kbd> Navigate</span>
        <span><kbd class="esa-kbd">↵</kbd> Select</span>
        <span><kbd class="esa-kbd">Tab</kbd> Scope</span>
        <span><kbd class="esa-kbd">Esc</kbd> Close</span>
      </div>
    </div>
  </div>
</div>
<esa-side-dialog
  position="left"
  heading="Menu"
  size="sm"
  class="cbf-nav-drawer"
  data-nav-drawer="true"
>
  <nav class="stack" data-gap="lg" aria-label="Site navigation">
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
    <div class="esa-link-column">
      <span class="esa-link-column__head">Reporting</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li>Report Center</li>
        <li>Maps</li>
        <li>Publications</li>
      </ul>
    </div>
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
    <div class="esa-link-column">
      <span class="esa-link-column__head">Quick links</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li><a href="#">Recent</a></li>
        <li><a href="#">Dashboard</a></li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head">System</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li>Data management</li>
        <li>System status</li>
        <li>System configuration</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head">Help</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li>Help center</li>
        <li>Data dictionary</li>
        <li>EF&amp;W Program documents</li>
        <li>Request support</li>
        <li>Send feedback</li>
      </ul>
    </div>
  </nav>
</esa-side-dialog>
<main class="cbf-page">
  <div class="esa-container" style="--_container-max: 1920px">
    <section class="cbf-app-panel">
      <div class="cbf-app-panel__crumb">
        <nav class="esa-breadcrumbs esa-breadcrumbs--md" aria-label="Breadcrumb">
          <ol class="esa-breadcrumbs__list">
            <li class="esa-breadcrumbs__item">
              <a href="/cb-fish-design/home" class="esa-breadcrumbs__link">
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
              <span class="esa-breadcrumbs__current"> Funding </span>
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
              <span class="esa-breadcrumbs__current"> Project budgets </span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="cbf-app-panel__body">
        <div class="cbf-app-panel__content">
          <h1 class="cbf-page-heading">Project budgets: Summary</h1>
          <nav class="cbf-report-tabs" aria-label="Project budget sections">
            <a class="cbf-report-tabs__tab is-active" href="#" aria-current="page">Summary</a
            ><a class="cbf-report-tabs__tab" href="#">Baselines</a
            ><a class="cbf-report-tabs__tab" href="#">Start-of-year (SOY)</a
            ><a class="cbf-report-tabs__tab" href="#">Decisions</a
            ><a class="cbf-report-tabs__tab" href="#">Change requests (BOG)</a>
            <details class="cbf-report-tabs__related">
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
                <a class="cbf-report-tabs__menu-item" role="menuitem" href="#">Reviews</a
                ><a class="cbf-report-tabs__menu-item" role="menuitem" href="#">Featured reviews</a>
              </div>
            </details>
          </nav>
          <section class="cbf-report-intro">
            <figure class="cbf-report-intro__media">
              <img
                src="/cb-fish-design/project-budgets-hero.jpg"
                alt="A Columbia River Gorge stream in autumn"
                loading="lazy"
              />
            </figure>
            <div class="cbf-report-intro__copy">
              <p class="cbf-report-intro__lede">
                BPA financial analysts manage budgets at a project level by fiscal year and fund.
              </p>
              <p class="cbf-report-intro__body">
                Every year, project budgets are set for the majority of the F&amp;W Program through
                the start-of-year (SOY) process, in which financial analysts and project managers
                discuss project budget needs and finalize budgets for the fiscal year. Throughout
                the year, budget decisions and transfers are documented to track funding changes to
                project working budgets.
              </p>
            </div>
          </section>
          <section class="cbf-related-items" id="related-items" aria-label="Related items">
            <h2 class="cbf-related-items__head type-section-title">Related items</h2>
            <div class="cbf-related-items__grid grid">
              <div class="esa-card esa-card--outlined">
                <div class="esa-card__header">
                  <div class="esa-card__header-content">
                    <div class="esa-card__titles"><h3 class="esa-card__title">Reviews</h3></div>
                  </div>
                </div>
                <div class="esa-card__body">
                  <div class="cbf-related-items__card">
                    <p class="cbf-related-items__overview">
                      <strong>Overview:</strong> Review project budgets across fiscal years and
                      funds — open a working budget to inspect its baseline, start-of-year amount,
                      and the decisions and transfers applied through the year.
                    </p>
                  </div>
                </div>
                <div class="esa-card__footer">
                  <div class="cbf-related-items__foot">
                    <span
                      class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--sm"
                    >
                      <a class="esa-button__native" href="#" role="button">
                        <span class="esa-button__label"> View page </span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div class="esa-card esa-card--outlined">
                <div class="esa-card__header">
                  <div class="esa-card__header-content">
                    <div class="esa-card__titles">
                      <h3 class="esa-card__title">Featured reviews</h3>
                    </div>
                  </div>
                </div>
                <div class="esa-card__body">
                  <div class="cbf-related-items__card">
                    <p class="cbf-related-items__overview">
                      <strong>Overview:</strong> Curated budget reviews highlighted for quick access
                      — the project budget views financial analysts and project managers return to
                      most often.
                    </p>
                  </div>
                </div>
                <div class="esa-card__footer">
                  <div class="cbf-related-items__foot">
                    <span
                      class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--sm"
                    >
                      <a class="esa-button__native" href="#" role="button">
                        <span class="esa-button__label"> View page </span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</main>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
:root,
[data-theme="cb-fish"] {
  --app-bar-bg: #fcfcfc;
  --app-bar-brand-bg: #1e5386;
  --app-bar-brand-strong-bg: #13273e;
  --app-bar-brand-strong-text: #fcfcfc;
  --app-bar-brand-text: #fcfcfc;
  --app-bar-gap: 2rem;
  --app-bar-pad-x: 2rem;
  --app-bar-pad-y: 1rem;
  --app-bar-text: #3d3d3d;
  --breadcrumbs-link-color: #525252;
  --breadcrumbs-link-hover: #3d3d3d;
  --breadcrumbs-separator-color: #bbbbbb;
  --card-bg: #fcfcfc;
  --card-border-color: #dcdcdc;
  --card-footer-bg: #f3f7fc;
  --card-header-bg: transparent;
  --card-header-border-color: #efefef;
  --card-header-color: #3d3d3d;
  --card-padding: 1.5rem;
  --card-radius: 0.5rem;
  --color-border: #dcdcdc;
  --color-border-light: #efefef;
  --color-primary: #1e5386;
  --color-primary-hover: #1a4570;
  --color-primary-strong: #2a7e3b;
  --color-surface: #fcfcfc;
  --color-surface-inverse: #13273e;
  --color-surface-sunken: #f3f7fc;
  --color-text-inverse: #fcfcfc;
  --color-text-link: #1e5386;
  --color-text-primary: #3d3d3d;
  --color-text-secondary: #525252;
  --container-gutter: 2rem;
  --font-display: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif;
  --font-sans: "IBM Plex Sans", sans-serif;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --form-font-size-md: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --form-font-size-sm: clamp(0.625rem, 0.56rem + 0.32vw, 0.75rem);
  --form-height-md: 40px;
  --form-height-sm: 32px;
  --form-padding-x-md: 0.75rem;
  --form-padding-x-sm: 0.625rem;
  --form-radius-md: 0.5rem;
  --form-radius-sm: 0.25rem;
  --icon-link-font-size-md: 1rem;
  --icon-link-font-size-sm: 0.875rem;
  --icon-link-gap: 0.375rem;
  --icon-size-md: 20px;
  --icon-size-medium: 20px;
  --icon-size-sm: 16px;
  --icon-size-small: 16px;
  --icon-size-xs: 14px;
  --letter-spacing-tight: -0.01em;
  --line-height-tight: 1.3;
  --link-column-heading-font-size: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --link-column-item-font-size: clamp(0.6875rem, 0.61rem + 0.38vw, 0.875rem);
  --link-column-rule-color: color-mix(in srgb, currentColor 40%, transparent);
  --radius-100: 0.25rem;
  --radius-200: 0.5rem;
  --radius-300: 0.5rem;
  --side-dialog-width: 400px;
  --side-dialog-width-sm: 320px;
  --spacing-050: 0.125rem;
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
  --type-size-250: clamp(0.8125rem, 0.71rem + 0.5vw, 1.0625rem);
  --type-size-500: clamp(1.125rem, 0.98rem + 0.72vw, 1.5rem);
}

.cbf-page {
  padding-block: var(--spacing-600) var(--spacing-800);
}
.cbf-report-tabs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-100);
  padding: var(--spacing-150);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-200, 8px);
  background: var(--color-gray-50, #f4f5f7);
}
.cbf-report-tabs__tab {
  padding: var(--spacing-200) var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-primary);
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}
.cbf-report-tabs__tab.is-active {
  background: var(--color-surface, #fff);
  color: var(--color-surface-inverse);
  font-weight: var(--font-weight-semibold);
  box-shadow: 0 1px 2px color-mix(in srgb, var(--color-surface-inverse) 12%, transparent);
}
.cbf-report-tabs__related {
  position: relative;
  margin-left: auto;
}
.cbf-report-tabs__related-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-150);
  list-style: none;
  cursor: pointer;
}
.cbf-report-tabs__chev {
  display: inline-flex;
  transition: transform 0.12s ease;
}
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
  background: var(--color-surface-sunken);
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
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
.cbf-report-intro__body {
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}
.cbf-related-items {
  padding-top: var(--spacing-600);
  border-top: 1px solid var(--color-border);
}
.cbf-related-items__head {
  margin: 0 0 var(--spacing-400);
}
.cbf-related-items__grid {
  --grid-min: 20rem;
}
.cbf-related-items__card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-300);
}
.cbf-related-items__overview {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
.cbf-related-items__overview strong,
.cbf-related-items__meta strong {
  color: var(--color-text-primary);
}
.cbf-related-items__foot {
  display: flex;
  justify-content: flex-end;
}
.esa-button {
  --_btn-height: var(--form-height-md, 40px);
  --_btn-padding-x: var(--form-padding-x-md, 16px);
  --_btn-font-size: var(--form-font-size-md, 14px);
  --_btn-radius: var(--form-radius-md, 6px);
  --_accent: var(--color-primary, #46a758);
  --_accent-hover: var(--color-primary-hover, #3e9b4f);
  --_on: var(--color-text-inverse, #ffffff);
  --_accent-text: var(--_accent);
  --_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);
  --_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);
  display: inline-block;
}
.esa-button--sm {
  --_btn-height: var(--form-height-sm, 32px);
  --_btn-padding-x: var(--form-padding-x-sm, 12px);
  --_btn-font-size: var(--form-font-size-sm, 12px);
  --_btn-radius: var(--form-radius-sm, 4px);
}
.esa-button--color-primary {
  --_accent-text: var(--color-primary-strong);
}
.esa-button__native {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200, 8px);
  width: 100%;
  height: var(--_btn-height);
  padding-inline: var(--_btn-padding-x);
  border: 1px solid transparent;
  border-radius: var(--_btn-radius);
  font-size: var(--_btn-font-size);
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: var(--font-weight-medium, 500);
  line-height: 1;
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
  border-color: transparent;
}
.esa-button__label {
  white-space: nowrap;
}
.cbf-app-bar--admin {
  --app-bar-pad-y: var(--spacing-300);
}
.cbf-app-bar--admin .esa-app-bar__row {
  display: grid;
  grid-template-columns: 1fr minmax(0, 380px) 1fr;
}
.cbf-app-bar--admin .esa-app-bar__start {
  justify-self: start;
}
.cbf-nav-collapsible {
  display: contents;
}
.cbf-app-bar--admin .esa-app-bar__main {
  justify-content: center;
}
.cbf-omni-trigger {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  width: 380px;
  max-width: 100%;
  padding: 5px var(--spacing-200) 5px var(--spacing-300);
  background: #ffffff1a;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  color: #ffffffbf;
  transition:
    background 0.12s,
    border-color 0.12s;
}
.cbf-app-bar--admin .cbf-omni-trigger {
  min-width: 0;
}
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
}
.cbf-omni-trigger__ph {
  flex: 1;
  min-width: 0;
  text-align: left;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cbf-omni-trigger__kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: var(--font-weight-medium);
  color: #ffffffd9;
  background: #ffffff1f;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
}
.cbf-app-bar--admin .esa-app-bar__end {
  justify-self: end;
}
.esa-nav-dropdown {
  position: relative;
}
.esa-nav-dropdown .esa-icon-link > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.cbf-nav-burger {
  display: none;
}
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
.cbf-nav-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-600);
}
.cbf-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: inherit;
  background: none;
  border: 0;
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}
.cbf-nav-link .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-nav-link--user {
  position: relative;
  padding-left: var(--spacing-500);
}
.cbf-nav-link--user:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 1.1em;
  background: #ffffff40;
}
.cbf-omni {
  position: fixed;
  inset: 0;
  z-index: 80;
}
.cbf-omni[hidden] {
  display: none;
}
.esa-link-column {
  color: inherit;
}
.esa-link-column__head {
  display: block;
  margin: 0 0 var(--spacing-100, 4px);
  font-size: var(--link-column-heading-font-size, var(--type-size-200, 1rem));
  font-weight: var(--font-weight-medium, 500);
  color: inherit;
  text-decoration: none;
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
  font-size: var(--link-column-item-font-size, var(--type-size-150, 0.875rem));
  line-height: 22px;
  margin-bottom: var(--spacing-100, 4px);
}
.esa-link-column__list a {
  color: inherit;
  text-decoration: none;
}
.esa-container {
  width: 100%;
  max-width: var(--_container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--container-gutter, var(--spacing-600, 2rem));
}
.type-section-title {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--type-size-500);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
.esa-card {
  --_card-bg: var(--card-bg, var(--color-surface, #ffffff));
  --_card-border: var(--card-border-color, var(--color-border, #e5e5e5));
  --_card-radius: var(--card-radius, var(--radius-300, 0.5rem));
  --_card-padding: var(--card-padding, var(--spacing-500, 1.5rem));
  --_card-header-bg: var(--card-header-bg, transparent);
  --_card-header-color: var(--card-header-color, var(--color-text-primary, #171717));
  --_card-header-border: var(--card-header-border-color, var(--color-border-light, #efefef));
  display: block;
  background: var(--_card-bg);
  border: 1px solid var(--_card-border);
  border-radius: var(--_card-radius);
  overflow: hidden;
}
.esa-card--outlined {
  --_card-border: var(--color-border, #e5e5e5);
}
.esa-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-400, 1rem) var(--_card-padding);
  background: var(--_card-header-bg);
  color: var(--_card-header-color);
  border-bottom: 1px solid var(--_card-header-border);
  min-height: 56px;
}
.esa-card__header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-300, 0.75rem);
}
.esa-card__titles {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-050, 0.125rem);
}
.esa-card__title {
  font-size: var(--type-size-250, 1.0625rem);
  font-weight: 600;
  margin: 0;
  color: inherit;
  font-family: var(--font-sans, "DM Sans", sans-serif);
}
.esa-card__body {
  padding: var(--_card-padding);
}
.esa-card__footer {
  padding: var(--spacing-300, 0.75rem) var(--_card-padding);
  border-top: 1px solid var(--_card-header-border);
  background: var(--card-footer-bg, var(--color-surface-sunken, #efefef));
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
button {
  font-family: inherit;
  cursor: pointer;
  background: none;
  border: 0;
}
a {
  color: var(--color-text-link, #1e5386);
  text-decoration: none;
}
img {
  display: block;
  max-width: 100%;
}
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
[data-gap="lg"] {
  --gap: var(--spacing-500, 1.5rem);
}
:where(h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd, ul, ol, pre) {
  margin: 0;
}
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
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
  background: var(--app-bar-bg, var(--color-surface, #fff));
  color: var(--app-bar-text, var(--color-text-primary, #171717));
}
.esa-app-bar--brand-strong {
  background: var(--app-bar-brand-strong-bg, var(--color-surface-inverse, #171717));
  color: var(--app-bar-brand-strong-text, var(--color-text-inverse, #fff));
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
.esa-app-bar__start {
  flex: none;
}
.esa-icon-link {
  --_il-font: var(--icon-link-font-size-md, 1rem);
  display: inline-flex;
  align-items: center;
  gap: var(--icon-link-gap, var(--spacing-150, 6px));
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
  --_il-font: var(--icon-link-font-size-sm, 0.875rem);
}
.esa-icon-link--medium {
  font-weight: var(--font-weight-medium, 500);
}
.esa-icon-link__label {
  display: inline-block;
}
.esa-app-bar__main {
  flex: 1 1 auto;
}
.esa-app-bar__end {
  flex: none;
  margin-left: auto;
}
summary.esa-icon-link {
  list-style: none;
}
.cbf-app-bar--header {
  --app-bar-gap: var(--spacing-800);
}
.esa-app-bar--brand {
  background: var(--app-bar-brand-bg, var(--color-primary, #43608a));
  color: var(--app-bar-brand-text, var(--color-text-inverse, #fff));
}
.cbf-app-panel {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--color-surface-inverse) 8%, transparent);
}
.cbf-app-panel__crumb {
  background: var(--color-gold-50);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-400) var(--spacing-600);
}
.esa-breadcrumbs {
  --_crumb-font-size: var(--type-size-200, 0.875rem);
  --_crumb-link-color: var(--breadcrumbs-link-color, #43608a);
  --_crumb-link-hover: var(--breadcrumbs-link-hover, #39506f);
  --_crumb-current-color: var(--color-text-primary, #171717);
  --_crumb-separator-color: var(--breadcrumbs-separator-color, #737373);
  --_crumb-gap: var(--spacing-200, 8px);
  display: block;
}
.cbf-app-panel__crumb .esa-breadcrumbs {
  --breadcrumbs-link-color: var(--color-text-secondary);
  --breadcrumbs-link-hover: var(--color-primary);
}
.esa-breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--_crumb-gap);
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--_crumb-font-size);
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
  text-decoration: none;
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
  font-weight: var(--font-weight-medium, 500);
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
.cbf-page-heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-300, 12px);
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--font-weight-medium);
  font-size: 40px;
  line-height: 40px;
  letter-spacing: -1px;
  color: var(--color-surface-inverse);
}
.esa-icon {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  line-height: 1;
  color: inherit;
}
.esa-icon--xs {
  --_icon-size: var(--icon-size-xs, 14px);
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-icon--sm {
  --_icon-size: var(--icon-size-sm, var(--icon-size-small, 16px));
}
:host {
  --_width: var(--side-dialog-width, 400px);
}
:host([size="sm"]) {
  --_width: var(--side-dialog-width-sm, 320px);
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--app-bar-bg` | `#fcfcfc` | component |
| `--app-bar-brand-bg` | `#1e5386` | component |
| `--app-bar-brand-strong-bg` | `#13273e` | component |
| `--app-bar-brand-strong-text` | `#fcfcfc` | component |
| `--app-bar-brand-text` | `#fcfcfc` | component |
| `--app-bar-gap` | `2rem` | component |
| `--app-bar-pad-x` | `2rem` | component |
| `--app-bar-pad-y` | `1rem` | component |
| `--app-bar-text` | `#3d3d3d` | component |
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#3d3d3d` | component |
| `--breadcrumbs-separator-color` | `#bbbbbb` | component |
| `--card-bg` | `#fcfcfc` | component |
| `--card-border-color` | `#dcdcdc` | component |
| `--card-footer-bg` | `#f3f7fc` | component |
| `--card-header-bg` | `transparent` | component |
| `--card-header-border-color` | `#efefef` | component |
| `--card-header-color` | `#3d3d3d` | component |
| `--card-padding` | `1.5rem` | component |
| `--card-radius` | `.5rem` | component |
| `--color-border` | `#dcdcdc` | semantic |
| `--color-border-light` | `#efefef` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-hover` | `#1a4570` | semantic |
| `--color-primary-strong` | `#2a7e3b` | semantic |
| `--color-surface` | `#fcfcfc` | semantic |
| `--color-surface-inverse` | `#13273e` | semantic |
| `--color-surface-sunken` | `#f3f7fc` | semantic |
| `--color-text-inverse` | `#fcfcfc` | semantic |
| `--color-text-link` | `#1e5386` | semantic |
| `--color-text-primary` | `#3d3d3d` | semantic |
| `--color-text-secondary` | `#525252` | semantic |
| `--container-gutter` | `2rem` | component |
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | primitive |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--font-weight-semibold` | `600` | primitive |
| `--form-font-size-md` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | component |
| `--form-font-size-sm` | `clamp(.625rem, .56rem + .32vw, .75rem)` | component |
| `--form-height-md` | `40px` | component |
| `--form-height-sm` | `32px` | component |
| `--form-padding-x-md` | `.75rem` | component |
| `--form-padding-x-sm` | `.625rem` | component |
| `--form-radius-md` | `.5rem` | component |
| `--form-radius-sm` | `.25rem` | component |
| `--icon-link-font-size-md` | `1rem` | component |
| `--icon-link-font-size-sm` | `.875rem` | component |
| `--icon-link-gap` | `.375rem` | component |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-medium` | `20px` | component |
| `--icon-size-sm` | `16px` | primitive |
| `--icon-size-small` | `16px` | component |
| `--icon-size-xs` | `14px` | primitive |
| `--letter-spacing-tight` | `-.01em` | primitive |
| `--line-height-tight` | `1.3` | primitive |
| `--link-column-heading-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | component |
| `--link-column-item-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | component |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--radius-300` | `.5rem` | primitive |
| `--side-dialog-width` | `400px` | component |
| `--side-dialog-width-sm` | `320px` | component |
| `--spacing-050` | `.125rem` | primitive |
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
| `--type-size-250` | `clamp(.8125rem, .71rem + .5vw, 1.0625rem)` | primitive |
| `--type-size-500` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
