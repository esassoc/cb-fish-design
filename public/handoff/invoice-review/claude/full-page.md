# Full page

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **invoice-review** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/invoice-review/
- **Section element:** `<page>`
- **Components:** cbf-app-bar (spoke), cbf-app-panel (spoke), cbf-grid-id (spoke), cbf-grid-num (spoke), cbf-grid-status (spoke), cbf-icon (spoke), cbf-invoice-doc (spoke), cbf-invoice-review-queue (spoke), cbf-logo (spoke), cbf-nav-actions (spoke), cbf-nav-burger (spoke), cbf-nav-collapsible (spoke), cbf-nav-drawer (spoke), cbf-nav-link (spoke), cbf-num (spoke), cbf-omni (spoke), cbf-omni-trigger (spoke), cbf-page (spoke), cbf-review (spoke), cbf-review-actions (spoke), cbf-review-attachments (spoke), cbf-review-context (spoke), cbf-review-dialog (spoke), cbf-review-docpane (spoke), cbf-review-fields (spoke), cbf-review-footer (spoke), cbf-review-hero (spoke), cbf-review-impact (spoke), cbf-review-panel (spoke), cbf-review-split (spoke), cbf-review-triage-strip (spoke), cbf-search-field (spoke), cbf-search-surface (spoke), esa-alert-box (hub), esa-app-bar (hub), esa-badge (hub), esa-breadcrumbs (hub), esa-button (hub), esa-container (hub), esa-empty-state (hub), esa-icon (hub), esa-icon-button (hub), esa-icon-link (hub), esa-kbd (hub), esa-link-column (hub), esa-nav-dropdown (hub), esa-page-header (hub), esa-stat (hub)

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
            <li class="esa-breadcrumbs__item" aria-current="page">
              <span class="esa-breadcrumbs__current"> Invoice review </span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="cbf-app-panel__body">
        <div class="cbf-app-panel__content">
          <header class="esa-page-header">
            <div class="esa-page-header__bar">
              <div class="esa-page-header__titles">
                <p class="esa-page-header__eyebrow"><span>James Whitfield</span></p>
                <h1 class="esa-page-header__title">Invoices awaiting your review</h1>
                <p class="esa-page-header__lede">
                  Review submitted invoices against the contract before they move to payment. Act
                  before the review-by date on each.
                </p>
              </div>
            </div>
          </header>
          <section
            class="cbf-review-triage-strip stack"
            data-gap="sm"
            aria-label="Review queue status"
          >
            <header class="cbf-review-triage-strip__head repel">
              <h2 class="type-section-title">Awaiting your review</h2>
              <span class="type-caption cbf-review-triage-strip__caption"
                >Contracting Officer’s Representative · across your assigned contracts</span
              >
            </header>
            <div class="cbf-review-triage-strip__stats cluster" data-gap="xl">
              <div class="esa-stat">
                <div class="esa-stat__value">5</div>
                <div class="esa-stat__label">In your queue</div>
                <div class="esa-stat__sub">5 invoices</div>
              </div>
              <div class="esa-stat esa-stat--accent">
                <div class="esa-stat__value">1</div>
                <div class="esa-stat__label">Overdue</div>
                <div class="esa-stat__sub">past review-by date</div>
              </div>
              <div class="esa-stat">
                <div class="esa-stat__value">2</div>
                <div class="esa-stat__label">Due soon</div>
                <div class="esa-stat__sub">3 days or less</div>
              </div>
              <div class="esa-stat">
                <div class="esa-stat__value">$43,590.00</div>
                <div class="esa-stat__label">Value awaiting decision</div>
              </div>
            </div>
          </section>
          <section class="cbf-invoice-review-queue stack" data-gap="md">
            <header class="cbf-invoice-review-queue__header repel">
              <h2 class="type-section-title">Review queue</h2>
              <div class="cbf-invoice-review-queue__search">
                <label class="cbf-search-field">
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
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path></svg
                  ></span>
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="Search invoices, vendors or contracts…"
                    data-queue-search="true"
                    aria-label="Search the review queue"
                    class="astro-lfax72z2"
                  />
                </label>
              </div>
            </header>
            <div class="cbf-invoice-review-queue__controls">
              <esa-chip-group
                data-queue-stage-filter="true"
                size="sm"
                label="Filter by status"
                value=""
                options='[{"value":"","label":"All"},{"value":"Submitted","label":"Submitted"},{"value":"In review","label":"In review"},{"value":"Returned","label":"Returned"},{"value":"Approved","label":"Approved"}]'
              ></esa-chip-group>
            </div>
            <!-- AG Grid mounts here; auto-height grows with rows so the page owns scroll. -->
            <div class="cbf-invoice-review-queue__grid" data-queue-grid="">
              <div
                class="ag-theme-buttonStyle-1 ag-theme-columnDropStyle-2 ag-theme-batchEditStyle-3 ag-theme-checkboxStyle-4 ag-theme-iconSet-5 ag-theme-tabStyle-6 ag-theme-inputStyle-7 ag-theme-columnDropStyle-2 ag-theme-params-1"
                style="height: 100%; --ag-internal-row-border-width: 1px"
              >
                <div class="ag-measurement-container">
                  <div style="width: var(--ag-list-item-height, 15538px)"></div>
                  <div style="width: var(--ag-row-height, 15538px)"></div>
                  <div style="width: var(--ag-header-height, 15538px)"></div>
                  <div
                    class="ag-measurement-element-border"
                    style="--ag-internal-measurement-border: var(--ag-row-border, solid 15538px)"
                  ></div>
                  <div
                    class="ag-measurement-element-border"
                    style="
                      --ag-internal-measurement-border: var(--ag-pinned-row-border, solid 15538px);
                    "
                  ></div>
                  <div
                    class="ag-measurement-element-border"
                    style="
                      --ag-internal-measurement-border: var(--ag-header-row-border, solid 15538px);
                    "
                  ></div>
                </div>
                <div
                  class="ag-aria-description-container"
                  aria-live="polite"
                  aria-relevant="additions text"
                  aria-atomic="true"
                ></div>
                <div
                  class="ag-root-wrapper ag-layout-auto-height ag-ltr"
                  role="presentation"
                  grid-id="1"
                >
                  <div
                    class="ag-root-wrapper-body ag-layout-auto-height ag-focus-managed"
                    data-ref="rootWrapperBody"
                    role="presentation"
                  >
                    <div
                      class="ag-tab-guard ag-tab-guard-top"
                      role="presentation"
                      tabindex="0"
                    ></div>
                    <!--AG-GRID-BODY-->
                    <div
                      class="ag-root ag-unselectable ag-layout-auto-height ag-body-horizontal-content-no-gap ag-body-vertical-content-no-gap"
                      data-ref="eGridRoot"
                      role="grid"
                      aria-colcount="8"
                      aria-rowcount="8"
                    >
                      <!--AG-HEADER-ROOT-->
                      <div
                        class="ag-header ag-focus-managed ag-pivot-off ag-header-allow-overflow"
                        role="presentation"
                        style="height: 49px; min-height: 49px"
                      >
                        <div
                          class="ag-pinned-left-header ag-hidden"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <div class="ag-header-viewport" role="rowgroup" tabindex="-1">
                          <div
                            class="ag-header-container"
                            data-ref="eCenterContainer"
                            role="presentation"
                            style="width: 1600px"
                          >
                            <div
                              class="ag-header-row ag-header-row-column"
                              role="row"
                              tabindex="0"
                              aria-rowindex="1"
                              style="top: 0px; height: 48px; width: 1600px"
                            >
                              <div
                                class="ag-header-cell ag-column-first ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                                role="columnheader"
                                col-id="daysRemaining"
                                aria-colindex="1"
                                tabindex="-1"
                                aria-sort="ascending"
                                style="
                                  top: 0px;
                                  height: 48px;
                                  width: 200px;
                                  touch-action: none;
                                  left: 0px;
                                "
                              >
                                <div
                                  class="ag-header-cell-resize"
                                  data-ref="eResize"
                                  role="presentation"
                                  aria-hidden="false"
                                  style="touch-action: none"
                                ></div>
                                <div
                                  class="ag-header-cell-comp-wrapper"
                                  data-ref="eHeaderCompWrapper"
                                  role="presentation"
                                >
                                  <div class="ag-cell-label-container" role="presentation">
                                    <div
                                      class="ag-header-cell-label"
                                      data-ref="eLabel"
                                      role="presentation"
                                    >
                                      <span class="ag-header-cell-text" data-ref="eText"
                                        >Days left</span
                                      >
                                      <span
                                        class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                                        data-ref="eFilter"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-filter"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <!--AG-SORT-INDICATOR--><span
                                        class="ag-sort-indicator-container"
                                        data-ref="eSortIndicator"
                                      >
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                          data-ref="eSortOrder"
                                          aria-hidden="true"
                                          >1</span
                                        >
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-ascending-icon"
                                          data-ref="eSortAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-asc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                          data-ref="eSortDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-desc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                          data-ref="eSortMixed"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                          data-ref="eSortAbsoluteAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-aasc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                          data-ref="eSortAbsoluteDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-adesc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                          data-ref="eSortNone"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                                role="columnheader"
                                col-id="reviewBy"
                                aria-colindex="2"
                                tabindex="-1"
                                aria-sort="none"
                                style="
                                  top: 0px;
                                  height: 48px;
                                  width: 200px;
                                  touch-action: none;
                                  left: 200px;
                                "
                              >
                                <div
                                  class="ag-header-cell-resize"
                                  data-ref="eResize"
                                  role="presentation"
                                  aria-hidden="false"
                                  style="touch-action: none"
                                ></div>
                                <div
                                  class="ag-header-cell-comp-wrapper"
                                  data-ref="eHeaderCompWrapper"
                                  role="presentation"
                                >
                                  <div class="ag-cell-label-container" role="presentation">
                                    <div
                                      class="ag-header-cell-label"
                                      data-ref="eLabel"
                                      role="presentation"
                                    >
                                      <span class="ag-header-cell-text" data-ref="eText"
                                        >Review by</span
                                      >
                                      <span
                                        class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                                        data-ref="eFilter"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-filter"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <!--AG-SORT-INDICATOR--><span
                                        class="ag-sort-indicator-container"
                                        data-ref="eSortIndicator"
                                      >
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                          data-ref="eSortOrder"
                                          aria-hidden="true"
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                          data-ref="eSortAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-asc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                          data-ref="eSortDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-desc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                          data-ref="eSortMixed"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                          data-ref="eSortAbsoluteAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-aasc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                          data-ref="eSortAbsoluteDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-adesc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                          data-ref="eSortNone"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                                role="columnheader"
                                col-id="number"
                                aria-colindex="3"
                                tabindex="-1"
                                aria-sort="none"
                                style="
                                  top: 0px;
                                  height: 48px;
                                  width: 200px;
                                  touch-action: none;
                                  left: 400px;
                                "
                              >
                                <div
                                  class="ag-header-cell-resize"
                                  data-ref="eResize"
                                  role="presentation"
                                  aria-hidden="false"
                                  style="touch-action: none"
                                ></div>
                                <div
                                  class="ag-header-cell-comp-wrapper"
                                  data-ref="eHeaderCompWrapper"
                                  role="presentation"
                                >
                                  <div class="ag-cell-label-container" role="presentation">
                                    <div
                                      class="ag-header-cell-label"
                                      data-ref="eLabel"
                                      role="presentation"
                                    >
                                      <span class="ag-header-cell-text" data-ref="eText"
                                        >Invoice #</span
                                      >
                                      <span
                                        class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                                        data-ref="eFilter"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-filter"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <!--AG-SORT-INDICATOR--><span
                                        class="ag-sort-indicator-container"
                                        data-ref="eSortIndicator"
                                      >
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                          data-ref="eSortOrder"
                                          aria-hidden="true"
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                          data-ref="eSortAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-asc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                          data-ref="eSortDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-desc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                          data-ref="eSortMixed"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                          data-ref="eSortAbsoluteAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-aasc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                          data-ref="eSortAbsoluteDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-adesc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                          data-ref="eSortNone"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                                role="columnheader"
                                col-id="vendor"
                                aria-colindex="4"
                                tabindex="-1"
                                aria-sort="none"
                                style="
                                  top: 0px;
                                  height: 48px;
                                  width: 200px;
                                  touch-action: none;
                                  left: 600px;
                                "
                              >
                                <div
                                  class="ag-header-cell-resize"
                                  data-ref="eResize"
                                  role="presentation"
                                  aria-hidden="false"
                                  style="touch-action: none"
                                ></div>
                                <div
                                  class="ag-header-cell-comp-wrapper"
                                  data-ref="eHeaderCompWrapper"
                                  role="presentation"
                                >
                                  <div class="ag-cell-label-container" role="presentation">
                                    <div
                                      class="ag-header-cell-label"
                                      data-ref="eLabel"
                                      role="presentation"
                                    >
                                      <span class="ag-header-cell-text" data-ref="eText"
                                        >Vendor</span
                                      >
                                      <span
                                        class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                                        data-ref="eFilter"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-filter"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <!--AG-SORT-INDICATOR--><span
                                        class="ag-sort-indicator-container"
                                        data-ref="eSortIndicator"
                                      >
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                          data-ref="eSortOrder"
                                          aria-hidden="true"
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                          data-ref="eSortAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-asc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                          data-ref="eSortDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-desc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                          data-ref="eSortMixed"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                          data-ref="eSortAbsoluteAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-aasc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                          data-ref="eSortAbsoluteDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-adesc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                          data-ref="eSortNone"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                                role="columnheader"
                                col-id="contract"
                                aria-colindex="5"
                                tabindex="-1"
                                aria-sort="none"
                                style="
                                  top: 0px;
                                  height: 48px;
                                  width: 200px;
                                  touch-action: none;
                                  left: 800px;
                                "
                              >
                                <div
                                  class="ag-header-cell-resize"
                                  data-ref="eResize"
                                  role="presentation"
                                  aria-hidden="false"
                                  style="touch-action: none"
                                ></div>
                                <div
                                  class="ag-header-cell-comp-wrapper"
                                  data-ref="eHeaderCompWrapper"
                                  role="presentation"
                                >
                                  <div class="ag-cell-label-container" role="presentation">
                                    <div
                                      class="ag-header-cell-label"
                                      data-ref="eLabel"
                                      role="presentation"
                                    >
                                      <span class="ag-header-cell-text" data-ref="eText"
                                        >Contract</span
                                      >
                                      <span
                                        class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                                        data-ref="eFilter"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-filter"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <!--AG-SORT-INDICATOR--><span
                                        class="ag-sort-indicator-container"
                                        data-ref="eSortIndicator"
                                      >
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                          data-ref="eSortOrder"
                                          aria-hidden="true"
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                          data-ref="eSortAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-asc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                          data-ref="eSortDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-desc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                          data-ref="eSortMixed"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                          data-ref="eSortAbsoluteAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-aasc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                          data-ref="eSortAbsoluteDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-adesc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                          data-ref="eSortNone"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable cbf-grid-num ag-focus-managed"
                                role="columnheader"
                                col-id="amount"
                                aria-colindex="6"
                                tabindex="-1"
                                aria-sort="none"
                                style="
                                  top: 0px;
                                  height: 48px;
                                  width: 200px;
                                  touch-action: none;
                                  left: 1000px;
                                "
                              >
                                <div
                                  class="ag-header-cell-resize"
                                  data-ref="eResize"
                                  role="presentation"
                                  aria-hidden="false"
                                  style="touch-action: none"
                                ></div>
                                <div
                                  class="ag-header-cell-comp-wrapper"
                                  data-ref="eHeaderCompWrapper"
                                  role="presentation"
                                >
                                  <div class="ag-cell-label-container" role="presentation">
                                    <div
                                      class="ag-header-cell-label"
                                      data-ref="eLabel"
                                      role="presentation"
                                    >
                                      <span class="ag-header-cell-text" data-ref="eText"
                                        >Amount</span
                                      >
                                      <span
                                        class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                                        data-ref="eFilter"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-filter"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <!--AG-SORT-INDICATOR--><span
                                        class="ag-sort-indicator-container"
                                        data-ref="eSortIndicator"
                                      >
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                          data-ref="eSortOrder"
                                          aria-hidden="true"
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                          data-ref="eSortAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-asc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                          data-ref="eSortDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-desc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                          data-ref="eSortMixed"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                          data-ref="eSortAbsoluteAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-aasc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                          data-ref="eSortAbsoluteDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-adesc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                          data-ref="eSortNone"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                                role="columnheader"
                                col-id="final"
                                aria-colindex="7"
                                tabindex="-1"
                                aria-sort="none"
                                style="
                                  top: 0px;
                                  height: 48px;
                                  width: 200px;
                                  touch-action: none;
                                  left: 1200px;
                                "
                              >
                                <div
                                  class="ag-header-cell-resize"
                                  data-ref="eResize"
                                  role="presentation"
                                  aria-hidden="false"
                                  style="touch-action: none"
                                ></div>
                                <div
                                  class="ag-header-cell-comp-wrapper"
                                  data-ref="eHeaderCompWrapper"
                                  role="presentation"
                                >
                                  <div class="ag-cell-label-container" role="presentation">
                                    <div
                                      class="ag-header-cell-label"
                                      data-ref="eLabel"
                                      role="presentation"
                                    >
                                      <span class="ag-header-cell-text" data-ref="eText"
                                        >Final?</span
                                      >
                                      <span
                                        class="ag-header-icon ag-header-label-icon ag-filter-icon ag-hidden"
                                        data-ref="eFilter"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-filter"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <!--AG-SORT-INDICATOR--><span
                                        class="ag-sort-indicator-container"
                                        data-ref="eSortIndicator"
                                      >
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                          data-ref="eSortOrder"
                                          aria-hidden="true"
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                          data-ref="eSortAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-asc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                          data-ref="eSortDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-desc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                          data-ref="eSortMixed"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                          data-ref="eSortAbsoluteAsc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-aasc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                          data-ref="eSortAbsoluteDesc"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-adesc"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                        <span
                                          class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                          data-ref="eSortNone"
                                          aria-hidden="true"
                                          ><span
                                            class="ag-icon ag-icon-none"
                                            role="presentation"
                                            unselectable="on"
                                          ></span
                                        ></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="ag-pinned-right-header ag-hidden"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                      </div>
                      <div
                        class="ag-floating-top ag-invisible"
                        data-ref="eTop"
                        role="presentation"
                        style="min-height: 0px; height: 0px; overflow-y: hidden"
                      >
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-pinned-left-floating-top ag-hidden"
                          data-ref="eContainer"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-viewport ag-floating-top-viewport"
                          data-ref="eViewport"
                          role="rowgroup"
                        >
                          <div
                            class="ag-floating-top-container"
                            data-ref="eContainer"
                            role="presentation"
                            style="width: 1600px"
                          ></div>
                        </div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-pinned-right-floating-top ag-hidden"
                          data-ref="eContainer"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-floating-top-full-width-container"
                          data-ref="eContainer"
                          role="rowgroup"
                        ></div>
                      </div>
                      <div
                        class="ag-body ag-layout-auto-height"
                        data-ref="eBody"
                        role="presentation"
                      >
                        <div
                          class="ag-body-viewport ag-layout-auto-height ag-row-no-animation"
                          data-ref="eBodyViewport"
                          role="presentation"
                          style="width: calc(100% + 16px)"
                        >
                          <!--AG-ROW-CONTAINER-->
                          <div
                            class="ag-pinned-left-cols-container ag-hidden"
                            data-ref="eContainer"
                            role="rowgroup"
                            aria-hidden="true"
                            style="height: 294px; width: 0px; max-width: 0px; min-width: 0px"
                          ></div>
                          <!--AG-ROW-CONTAINER-->
                          <div
                            class="ag-viewport ag-center-cols-viewport"
                            data-ref="eViewport"
                            role="rowgroup"
                            style="height: 294px"
                          >
                            <div
                              class="ag-center-cols-container"
                              data-ref="eContainer"
                              role="presentation"
                              style="width: 1600px; height: 294px"
                            >
                              <div
                                role="row"
                                comp-id="60"
                                tabindex="0"
                                row-index="0"
                                class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-first"
                                aria-rowindex="2"
                                row-id="2"
                                style="transform: translateY(0px); height: 42px"
                              >
                                <div
                                  role="gridcell"
                                  comp-id="61"
                                  col-id="daysRemaining"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                                  aria-colindex="1"
                                  style="left: 0px; width: 200px"
                                >
                                  <span
                                    ><span class="cbf-grid-status"
                                      ><span class="esa-badge esa-badge--danger esa-badge--lg">
                                        <span class="esa-badge__text">2 days overdue</span>
                                      </span>
                                    </span></span
                                  >
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="62"
                                  col-id="reviewBy"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="2"
                                  style="left: 200px; width: 200px"
                                >
                                  Jun 20, 2026
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="63"
                                  col-id="number"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                                  aria-colindex="3"
                                  style="left: 400px; width: 200px"
                                >
                                  INV-2026-0047
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="64"
                                  col-id="vendor"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="4"
                                  style="left: 600px; width: 200px"
                                >
                                  Methow Restoration Partners
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="65"
                                  col-id="contract"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="5"
                                  style="left: 800px; width: 200px"
                                >
                                  Riparian Vegetation Monitoring — Methow
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="66"
                                  col-id="amount"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                                  aria-colindex="6"
                                  style="left: 1000px; width: 200px"
                                >
                                  $3,960.00
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="67"
                                  col-id="final"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="7"
                                  style="left: 1200px; width: 200px"
                                >
                                  <span></span>
                                </div>
                              </div>
                              <div
                                role="row"
                                comp-id="68"
                                tabindex="0"
                                row-index="1"
                                class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                                aria-rowindex="3"
                                row-id="6"
                                style="transform: translateY(42px); height: 42px"
                              >
                                <div
                                  role="gridcell"
                                  comp-id="69"
                                  col-id="daysRemaining"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                                  aria-colindex="1"
                                  style="left: 0px; width: 200px"
                                >
                                  <span
                                    ><span class="cbf-grid-status"
                                      ><span class="esa-badge esa-badge--danger esa-badge--lg">
                                        <span class="esa-badge__text">1 day overdue</span>
                                      </span>
                                    </span></span
                                  >
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="70"
                                  col-id="reviewBy"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="2"
                                  style="left: 200px; width: 200px"
                                >
                                  Jun 21, 2026
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="71"
                                  col-id="number"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                                  aria-colindex="3"
                                  style="left: 400px; width: 200px"
                                >
                                  INV-2026-0038
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="72"
                                  col-id="vendor"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="4"
                                  style="left: 600px; width: 200px"
                                >
                                  Pacific Environmental Services, LLC
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="73"
                                  col-id="contract"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="5"
                                  style="left: 800px; width: 200px"
                                >
                                  Salmon Habitat Restoration — Wenatchee
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="74"
                                  col-id="amount"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                                  aria-colindex="6"
                                  style="left: 1000px; width: 200px"
                                >
                                  $5,210.00
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="75"
                                  col-id="final"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="7"
                                  style="left: 1200px; width: 200px"
                                >
                                  <span></span>
                                </div>
                              </div>
                              <div
                                role="row"
                                comp-id="76"
                                tabindex="0"
                                row-index="2"
                                class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                                aria-rowindex="4"
                                row-id="1"
                                style="transform: translateY(84px); height: 42px"
                              >
                                <div
                                  role="gridcell"
                                  comp-id="77"
                                  col-id="daysRemaining"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                                  aria-colindex="1"
                                  style="left: 0px; width: 200px"
                                >
                                  <span
                                    ><span class="cbf-grid-status"
                                      ><span class="esa-badge esa-badge--warning esa-badge--lg">
                                        <span class="esa-badge__text">1 day left</span>
                                      </span>
                                    </span></span
                                  >
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="78"
                                  col-id="reviewBy"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="2"
                                  style="left: 200px; width: 200px"
                                >
                                  Jun 23, 2026
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="79"
                                  col-id="number"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                                  aria-colindex="3"
                                  style="left: 400px; width: 200px"
                                >
                                  INV-2026-0049
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="80"
                                  col-id="vendor"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="4"
                                  style="left: 600px; width: 200px"
                                >
                                  Cascade Fisheries Consulting
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="81"
                                  col-id="contract"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="5"
                                  style="left: 800px; width: 200px"
                                >
                                  Smolt Survival Telemetry Study
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="82"
                                  col-id="amount"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                                  aria-colindex="6"
                                  style="left: 1000px; width: 200px"
                                >
                                  $12,480.00
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="83"
                                  col-id="final"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="7"
                                  style="left: 1200px; width: 200px"
                                >
                                  <span></span>
                                </div>
                              </div>
                              <div
                                role="row"
                                comp-id="84"
                                tabindex="0"
                                row-index="3"
                                class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                                aria-rowindex="5"
                                row-id="0"
                                style="transform: translateY(126px); height: 42px"
                              >
                                <div
                                  role="gridcell"
                                  comp-id="85"
                                  col-id="daysRemaining"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                                  aria-colindex="1"
                                  style="left: 0px; width: 200px"
                                >
                                  <span
                                    ><span class="cbf-grid-status"
                                      ><span class="esa-badge esa-badge--warning esa-badge--lg">
                                        <span class="esa-badge__text">2 days left</span>
                                      </span>
                                    </span></span
                                  >
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="86"
                                  col-id="reviewBy"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="2"
                                  style="left: 200px; width: 200px"
                                >
                                  Jun 24, 2026
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="87"
                                  col-id="number"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                                  aria-colindex="3"
                                  style="left: 400px; width: 200px"
                                >
                                  INV-2026-0051
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="88"
                                  col-id="vendor"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="4"
                                  style="left: 600px; width: 200px"
                                >
                                  Pacific Environmental Services, LLC
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="89"
                                  col-id="contract"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="5"
                                  style="left: 800px; width: 200px"
                                >
                                  Salmon Habitat Restoration — Wenatchee
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="90"
                                  col-id="amount"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                                  aria-colindex="6"
                                  style="left: 1000px; width: 200px"
                                >
                                  $6,120.00
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="91"
                                  col-id="final"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="7"
                                  style="left: 1200px; width: 200px"
                                >
                                  <span></span>
                                </div>
                              </div>
                              <div
                                role="row"
                                comp-id="92"
                                tabindex="0"
                                row-index="4"
                                class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                                aria-rowindex="6"
                                row-id="5"
                                style="transform: translateY(168px); height: 42px"
                              >
                                <div
                                  role="gridcell"
                                  comp-id="93"
                                  col-id="daysRemaining"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                                  aria-colindex="1"
                                  style="left: 0px; width: 200px"
                                >
                                  <span
                                    ><span class="cbf-grid-status"
                                      ><span class="esa-badge esa-badge--secondary esa-badge--lg">
                                        <span class="esa-badge__text">6 days left</span>
                                      </span>
                                    </span></span
                                  >
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="94"
                                  col-id="reviewBy"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="2"
                                  style="left: 200px; width: 200px"
                                >
                                  Jun 28, 2026
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="95"
                                  col-id="number"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                                  aria-colindex="3"
                                  style="left: 400px; width: 200px"
                                >
                                  INV-2026-0041
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="96"
                                  col-id="vendor"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="4"
                                  style="left: 600px; width: 200px"
                                >
                                  Cascade Fisheries Consulting
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="97"
                                  col-id="contract"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="5"
                                  style="left: 800px; width: 200px"
                                >
                                  Smolt Survival Telemetry Study
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="98"
                                  col-id="amount"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                                  aria-colindex="6"
                                  style="left: 1000px; width: 200px"
                                >
                                  $4,310.00
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="99"
                                  col-id="final"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="7"
                                  style="left: 1200px; width: 200px"
                                >
                                  <span></span>
                                </div>
                              </div>
                              <div
                                role="row"
                                comp-id="100"
                                tabindex="0"
                                row-index="5"
                                class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                                aria-rowindex="7"
                                row-id="4"
                                style="transform: translateY(210px); height: 42px"
                              >
                                <div
                                  role="gridcell"
                                  comp-id="101"
                                  col-id="daysRemaining"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                                  aria-colindex="1"
                                  style="left: 0px; width: 200px"
                                >
                                  <span
                                    ><span class="cbf-grid-status"
                                      ><span class="esa-badge esa-badge--secondary esa-badge--lg">
                                        <span class="esa-badge__text">9 days left</span>
                                      </span>
                                    </span></span
                                  >
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="102"
                                  col-id="reviewBy"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="2"
                                  style="left: 200px; width: 200px"
                                >
                                  Jul 1, 2026
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="103"
                                  col-id="number"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                                  aria-colindex="3"
                                  style="left: 400px; width: 200px"
                                >
                                  INV-2026-0044
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="104"
                                  col-id="vendor"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="4"
                                  style="left: 600px; width: 200px"
                                >
                                  Okanogan Water Sciences
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="105"
                                  col-id="contract"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="5"
                                  style="left: 800px; width: 200px"
                                >
                                  Water Quality Sampling — Okanogan
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="106"
                                  col-id="amount"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                                  aria-colindex="6"
                                  style="left: 1000px; width: 200px"
                                >
                                  $18,750.00
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="107"
                                  col-id="final"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="7"
                                  style="left: 1200px; width: 200px"
                                >
                                  <span
                                    ><span class="cbf-grid-status"
                                      ><span class="esa-badge esa-badge--secondary esa-badge--lg">
                                        <span class="esa-badge__text">Final</span>
                                      </span>
                                    </span></span
                                  >
                                </div>
                              </div>
                              <div
                                role="row"
                                comp-id="108"
                                tabindex="0"
                                row-index="6"
                                class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-last"
                                aria-rowindex="8"
                                row-id="3"
                                style="transform: translateY(252px); height: 42px"
                              >
                                <div
                                  role="gridcell"
                                  comp-id="109"
                                  col-id="daysRemaining"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                                  aria-colindex="1"
                                  style="left: 0px; width: 200px"
                                >
                                  <span
                                    ><span class="cbf-grid-status"
                                      ><span class="esa-badge esa-badge--secondary esa-badge--lg">
                                        <span class="esa-badge__text">13 days left</span>
                                      </span>
                                    </span></span
                                  >
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="110"
                                  col-id="reviewBy"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="2"
                                  style="left: 200px; width: 200px"
                                >
                                  Jul 5, 2026
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="111"
                                  col-id="number"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-id"
                                  aria-colindex="3"
                                  style="left: 400px; width: 200px"
                                >
                                  INV-2026-0046
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="112"
                                  col-id="vendor"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="4"
                                  style="left: 600px; width: 200px"
                                >
                                  Pacific Environmental Services, LLC
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="113"
                                  col-id="contract"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="5"
                                  style="left: 800px; width: 200px"
                                >
                                  Hatchery Supplementation — Entiat
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="114"
                                  col-id="amount"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height cbf-grid-num"
                                  aria-colindex="6"
                                  style="left: 1000px; width: 200px"
                                >
                                  $2,280.00
                                </div>
                                <div
                                  role="gridcell"
                                  comp-id="115"
                                  col-id="final"
                                  class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                                  aria-colindex="7"
                                  style="left: 1200px; width: 200px"
                                >
                                  <span></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!--AG-ROW-CONTAINER-->
                          <div
                            class="ag-pinned-right-cols-container ag-hidden"
                            data-ref="eContainer"
                            role="rowgroup"
                            aria-hidden="true"
                            style="height: 294px; width: 0px; max-width: 0px; min-width: 0px"
                          ></div>
                          <!--AG-ROW-CONTAINER-->
                          <div
                            class="ag-full-width-container"
                            data-ref="eContainer"
                            role="rowgroup"
                            style="height: 294px"
                          ></div>
                        </div>
                        <!--AG-FAKE-VERTICAL-SCROLL-->
                        <div
                          class="ag-body-vertical-scroll ag-apple-scrollbar ag-scrollbar-invisible ag-hidden"
                          aria-hidden="true"
                          style="width: 16px; max-width: 16px; min-width: 16px"
                        >
                          <div
                            class="ag-body-vertical-scroll-viewport"
                            data-ref="eViewport"
                            style="width: 16px; max-width: 16px; min-width: 16px"
                          >
                            <div
                              class="ag-body-vertical-scroll-container"
                              data-ref="eContainer"
                              style="height: 294px; width: 16px; max-width: 16px; min-width: 16px"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="ag-sticky-top"
                        data-ref="eStickyTop"
                        role="presentation"
                        style="top: 49px; height: 0px; width: 100%"
                      >
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-pinned-left-sticky-top ag-hidden"
                          data-ref="eContainer"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-viewport ag-sticky-top-viewport"
                          data-ref="eViewport"
                          role="rowgroup"
                        >
                          <div
                            class="ag-sticky-top-container"
                            data-ref="eContainer"
                            role="presentation"
                            style="width: 1600px"
                          ></div>
                        </div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-pinned-right-sticky-top ag-hidden"
                          data-ref="eContainer"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-sticky-top-full-width-container"
                          data-ref="eContainer"
                          role="rowgroup"
                        ></div>
                      </div>
                      <div
                        class="ag-sticky-bottom ag-invisible"
                        data-ref="eStickyBottom"
                        role="presentation"
                        style="bottom: 0px; height: 0px; width: 100%"
                      >
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-pinned-left-sticky-bottom ag-hidden"
                          data-ref="eContainer"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-viewport ag-sticky-bottom-viewport"
                          data-ref="eViewport"
                          role="rowgroup"
                        >
                          <div
                            class="ag-sticky-bottom-container"
                            data-ref="eContainer"
                            role="presentation"
                            style="width: 1600px"
                          ></div>
                        </div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-pinned-right-sticky-bottom ag-hidden"
                          data-ref="eContainer"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-sticky-bottom-full-width-container"
                          data-ref="eContainer"
                          role="rowgroup"
                        ></div>
                      </div>
                      <div
                        class="ag-floating-bottom ag-invisible"
                        data-ref="eBottom"
                        role="presentation"
                        style="min-height: 0px; height: 0px; overflow-y: hidden"
                      >
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-pinned-left-floating-bottom ag-hidden"
                          data-ref="eContainer"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-viewport ag-floating-bottom-viewport"
                          data-ref="eViewport"
                          role="rowgroup"
                        >
                          <div
                            class="ag-floating-bottom-container"
                            data-ref="eContainer"
                            role="presentation"
                            style="width: 1600px"
                          ></div>
                        </div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-pinned-right-floating-bottom ag-hidden"
                          data-ref="eContainer"
                          role="rowgroup"
                          aria-hidden="true"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <!--AG-ROW-CONTAINER-->
                        <div
                          class="ag-floating-bottom-full-width-container"
                          data-ref="eContainer"
                          role="rowgroup"
                        ></div>
                      </div>
                      <!--AG-FAKE-HORIZONTAL-SCROLL-->
                      <div
                        class="ag-body-horizontal-scroll ag-apple-scrollbar ag-scrollbar-invisible"
                        aria-hidden="true"
                        style="bottom: 0px; height: 16px; max-height: 16px; min-height: 16px"
                      >
                        <div
                          class="ag-horizontal-left-spacer ag-scroller-corner"
                          data-ref="eLeftSpacer"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                        <div
                          class="ag-body-horizontal-scroll-viewport"
                          data-ref="eViewport"
                          style="height: 16px; max-height: 16px; min-height: 16px"
                        >
                          <div
                            class="ag-body-horizontal-scroll-container"
                            data-ref="eContainer"
                            style="width: 1600px; height: 16px; max-height: 16px; min-height: 16px"
                          ></div>
                        </div>
                        <div
                          class="ag-horizontal-right-spacer ag-scroller-corner"
                          data-ref="eRightSpacer"
                          style="width: 0px; max-width: 0px; min-width: 0px"
                        ></div>
                      </div>
                      <!--AG-OVERLAY-WRAPPER-->
                      <div class="ag-overlay ag-hidden" role="presentation">
                        <div class="ag-overlay-panel" role="presentation">
                          <div
                            class="ag-overlay-wrapper ag-layout-auto-height"
                            data-ref="eOverlayWrapper"
                            role="presentation"
                            style="padding-top: 0px"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="ag-tab-guard ag-tab-guard-bottom"
                      role="presentation"
                      tabindex="0"
                    ></div>
                  </div>
                  <!--AG-PAGINATION-->
                  <div
                    class="ag-paging-panel ag-unselectable ag-focus-managed ag-hidden"
                    id="ag-29"
                    aria-hidden="true"
                  >
                    <div
                      class="ag-tab-guard ag-tab-guard-top"
                      role="presentation"
                      tabindex="0"
                    ></div>
                    <span class="ag-paging-page-size"
                      ><div
                        class="ag-picker-field ag-labeled ag-label-align-left ag-select"
                        role="presentation"
                      >
                        <div
                          data-ref="eLabel"
                          class="ag-label"
                          aria-hidden="false"
                          id="ag-31-label"
                        >
                          Page Size:
                        </div>
                        <div
                          class="ag-wrapper ag-picker-field-wrapper ag-picker-collapsed"
                          data-ref="eWrapper"
                          tabindex="0"
                          aria-expanded="false"
                          role="combobox"
                          aria-controls="ag-select-list-32"
                          aria-label="Page Size"
                        >
                          <div
                            class="ag-picker-field-display"
                            data-ref="eDisplayField"
                            id="ag-31-display"
                          >
                            100
                          </div>
                          <div class="ag-picker-field-icon" data-ref="eIcon" aria-hidden="true">
                            <span
                              class="ag-icon ag-icon-small-down"
                              role="presentation"
                              unselectable="on"
                            ></span>
                          </div>
                        </div></div></span
                    ><span class="ag-paging-row-summary-panel">
                      <span
                        class="ag-paging-row-summary-panel-number"
                        data-ref="lbFirstRowOnPage"
                        id="ag-29-first-row"
                        >1</span
                      >
                      <span id="ag-29-to">to</span>
                      <span
                        class="ag-paging-row-summary-panel-number"
                        data-ref="lbLastRowOnPage"
                        id="ag-29-last-row"
                        >0</span
                      >
                      <span id="ag-29-of">of</span>
                      <span
                        class="ag-paging-row-summary-panel-number"
                        data-ref="lbRecordCount"
                        id="ag-29-row-count"
                        >0</span
                      > </span
                    ><span class="ag-paging-page-summary-panel" role="presentation">
                      <div
                        class="ag-button ag-paging-button ag-disabled"
                        data-ref="btFirst"
                        role="button"
                        aria-label="First Page"
                        tabindex="0"
                        aria-disabled="true"
                      >
                        <span
                          class="ag-icon ag-icon-first"
                          role="presentation"
                          unselectable="on"
                        ></span>
                      </div>
                      <div
                        class="ag-button ag-paging-button ag-disabled"
                        data-ref="btPrevious"
                        role="button"
                        aria-label="Previous Page"
                        tabindex="0"
                        aria-disabled="true"
                      >
                        <span
                          class="ag-icon ag-icon-previous"
                          role="presentation"
                          unselectable="on"
                        ></span>
                      </div>
                      <span class="ag-paging-description">
                        <span id="ag-29-start-page">Page</span>
                        <span
                          class="ag-paging-number"
                          data-ref="lbCurrent"
                          id="ag-29-start-page-number"
                          >1</span
                        >
                        <span id="ag-29-of-page">of</span>
                        <span class="ag-paging-number" data-ref="lbTotal" id="ag-29-of-page-number"
                          >1</span
                        >
                      </span>
                      <div
                        class="ag-button ag-paging-button ag-disabled"
                        data-ref="btNext"
                        role="button"
                        aria-label="Next Page"
                        tabindex="0"
                        aria-disabled="true"
                      >
                        <span
                          class="ag-icon ag-icon-next"
                          role="presentation"
                          unselectable="on"
                        ></span>
                      </div>
                      <div
                        class="ag-button ag-paging-button ag-disabled"
                        data-ref="btLast"
                        role="button"
                        aria-label="Last Page"
                        tabindex="0"
                        aria-disabled="true"
                      >
                        <span
                          class="ag-icon ag-icon-last"
                          role="presentation"
                          unselectable="on"
                        ></span>
                      </div>
                    </span>
                    <div
                      class="ag-tab-guard ag-tab-guard-bottom"
                      role="presentation"
                      tabindex="0"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cbf-invoice-review-queue__empty" data-queue-empty="" hidden="">
              <div class="esa-empty-state esa-empty-state--sm">
                <h3 class="esa-empty-state__title">No invoices match your filters</h3>
                <p class="esa-empty-state__description">
                  Try a different invoice number, vendor, contract, or status.
                </p>
                <div class="esa-empty-state__actions"></div>
              </div>
            </div>
            <footer class="cbf-invoice-review-queue__footer">
              <span class="type-caption" data-queue-count="">Showing 7 of 7 invoices</span>
            </footer>
            <!-- Real esa-badge legos, server-rendered once per stage AND per urgency bucket
       with the design-system scope hash intact. Grid cells + the panel clone the
       matching template's markup — so every badge is byte-identical to the lego. -->
            <div
              class="cbf-invoice-review-queue__badge-templates"
              data-badge-templates=""
              hidden=""
              aria-hidden="true"
            >
              <span data-stage="Submitted"
                ><span class="esa-badge esa-badge--info esa-badge--lg">
                  <span class="esa-badge__text">Submitted</span>
                </span> </span
              ><span data-stage="In review"
                ><span class="esa-badge esa-badge--warning esa-badge--lg">
                  <span class="esa-badge__text">In review</span>
                </span> </span
              ><span data-stage="Returned"
                ><span class="esa-badge esa-badge--danger esa-badge--lg">
                  <span class="esa-badge__text">Returned</span>
                </span> </span
              ><span data-stage="Approved"
                ><span class="esa-badge esa-badge--success esa-badge--lg">
                  <span class="esa-badge__text">Approved</span>
                </span>
              </span>
              <span data-urgency="overdue"
                ><span class="esa-badge esa-badge--danger esa-badge--lg">
                  <span class="esa-badge__text">overdue</span>
                </span> </span
              ><span data-urgency="due-soon"
                ><span class="esa-badge esa-badge--warning esa-badge--lg">
                  <span class="esa-badge__text">due-soon</span>
                </span> </span
              ><span data-urgency="on-track"
                ><span class="esa-badge esa-badge--secondary esa-badge--lg">
                  <span class="esa-badge__text">on-track</span>
                </span>
              </span>
              <span data-flag="final"
                ><span class="esa-badge esa-badge--secondary esa-badge--lg">
                  <span class="esa-badge__text">Final</span>
                </span>
              </span>
            </div>
            <!-- Row data for the client grid module (avoids a second fetch). -->
            <script type="application/json" data-queue-data="">
              [
                {
                  "number": "INV-2026-0051",
                  "vendor": "Pacific Environmental Services, LLC",
                  "contract": "Salmon Habitat Restoration — Wenatchee",
                  "project": "Wenatchee Subbasin",
                  "submitted": "Jun 19, 2026",
                  "reviewBy": "Jun 24, 2026",
                  "daysRemaining": 2,
                  "amount": 6120,
                  "stage": "Submitted",
                  "final": false,
                  "invoiceDate": "Jun 17, 2026",
                  "perfStart": "Jun 1, 2026",
                  "perfEnd": "Jun 15, 2026",
                  "billTo": "BPA — Columbia Basin Fish & Wildlife Program",
                  "pdfName": "INV-2026-0051-PacificEnv.pdf",
                  "supportingDocs": ["timesheet-jun-2026.pdf", "equipment-rental-receipt.pdf"],
                  "lineItems": [
                    { "description": "Field biologist labor", "qty": 52, "unitPrice": 95 },
                    {
                      "description": "Habitat survey equipment rental",
                      "qty": 1,
                      "unitPrice": 650
                    },
                    { "description": "Field mileage", "qty": 940, "unitPrice": 0.5 }
                  ],
                  "contractValue": 420000,
                  "expended": 318400,
                  "remaining": 101600,
                  "asOf": "Jun 21, 2026"
                },
                {
                  "number": "INV-2026-0049",
                  "vendor": "Cascade Fisheries Consulting",
                  "contract": "Smolt Survival Telemetry Study",
                  "project": "Mainstem Survival",
                  "submitted": "Jun 15, 2026",
                  "reviewBy": "Jun 23, 2026",
                  "daysRemaining": 1,
                  "amount": 12480,
                  "stage": "In review",
                  "final": false,
                  "invoiceDate": "Jun 10, 2026",
                  "perfStart": "May 1, 2026",
                  "perfEnd": "May 31, 2026",
                  "billTo": "BPA — Columbia Basin Fish & Wildlife Program",
                  "pdfName": "INV-2026-0049-Cascade.pdf",
                  "supportingDocs": ["receiver-deployment-log.pdf", "data-analysis-summary.pdf"],
                  "notes": "Receivers redeployed after the spring high-water event; deployment hours above baseline.",
                  "lineItems": [
                    {
                      "description": "Acoustic telemetry tag deployment",
                      "qty": 64,
                      "unitPrice": 135
                    },
                    {
                      "description": "Receiver maintenance & retrieval",
                      "qty": 18,
                      "unitPrice": 100
                    },
                    { "description": "Data analysis", "qty": 16, "unitPrice": 120 }
                  ],
                  "contractValue": 680000,
                  "expended": 612300,
                  "remaining": 67700,
                  "asOf": "Jun 21, 2026"
                },
                {
                  "number": "INV-2026-0047",
                  "vendor": "Methow Restoration Partners",
                  "contract": "Riparian Vegetation Monitoring — Methow",
                  "project": "Methow Subbasin",
                  "submitted": "May 28, 2026",
                  "reviewBy": "Jun 20, 2026",
                  "daysRemaining": -2,
                  "amount": 3960,
                  "stage": "In review",
                  "final": false,
                  "invoiceDate": "May 22, 2026",
                  "perfStart": "Apr 1, 2026",
                  "perfEnd": "Apr 30, 2026",
                  "billTo": "BPA — Columbia Basin Fish & Wildlife Program",
                  "pdfName": "INV-2026-0047-Methow.pdf",
                  "supportingDocs": ["timesheet-apr-2026.pdf", "field-receipts.pdf"],
                  "lineItems": [
                    {
                      "description": "Vegetation transect monitoring",
                      "qty": 30,
                      "unitPrice": 110
                    },
                    { "description": "Data processing & reporting", "qty": 6, "unitPrice": 110 }
                  ],
                  "contractValue": 240000,
                  "expended": 196800,
                  "remaining": 43200,
                  "asOf": "Jun 21, 2026"
                },
                {
                  "number": "INV-2026-0046",
                  "vendor": "Pacific Environmental Services, LLC",
                  "contract": "Hatchery Supplementation — Entiat",
                  "project": "Entiat Subbasin",
                  "submitted": "Jun 18, 2026",
                  "reviewBy": "Jul 5, 2026",
                  "daysRemaining": 13,
                  "amount": 2280,
                  "stage": "Submitted",
                  "final": false,
                  "invoiceDate": "Jun 12, 2026",
                  "perfStart": "May 1, 2026",
                  "perfEnd": "May 31, 2026",
                  "billTo": "BPA — Columbia Basin Fish & Wildlife Program",
                  "pdfName": "INV-2026-0046-PacificEnv.pdf",
                  "supportingDocs": ["broodstock-field-log.pdf"],
                  "lineItems": [
                    { "description": "Broodstock collection labor", "qty": 22, "unitPrice": 95 },
                    { "description": "Field supplies", "qty": 1, "unitPrice": 190 }
                  ],
                  "contractValue": 180000,
                  "expended": 88500,
                  "remaining": 91500,
                  "asOf": "Jun 21, 2026"
                },
                {
                  "number": "INV-2026-0044",
                  "vendor": "Okanogan Water Sciences",
                  "contract": "Water Quality Sampling — Okanogan",
                  "project": "Okanogan Subbasin",
                  "submitted": "Jun 16, 2026",
                  "reviewBy": "Jul 1, 2026",
                  "daysRemaining": 9,
                  "amount": 18750,
                  "stage": "Submitted",
                  "final": true,
                  "invoiceDate": "Jun 14, 2026",
                  "perfStart": "Apr 1, 2026",
                  "perfEnd": "Jun 13, 2026",
                  "billTo": "BPA — Columbia Basin Fish & Wildlife Program",
                  "pdfName": "INV-2026-0044-Okanogan-FINAL.pdf",
                  "supportingDocs": [
                    "lab-analysis-report.pdf",
                    "sampling-field-notes.pdf",
                    "final-data-deliverable.xlsx"
                  ],
                  "notes": "Final invoice — closes out the FY26 sampling contract. Includes the held-back retainage.",
                  "lineItems": [
                    { "description": "Water sample collection", "qty": 120, "unitPrice": 85 },
                    { "description": "Lab analysis", "qty": 60, "unitPrice": 115 },
                    {
                      "description": "Final report & data deliverable",
                      "qty": 1,
                      "unitPrice": 1650
                    }
                  ],
                  "contractValue": 96000,
                  "expended": 77250,
                  "remaining": 18750,
                  "asOf": "Jun 21, 2026"
                },
                {
                  "number": "INV-2026-0041",
                  "vendor": "Cascade Fisheries Consulting",
                  "contract": "Smolt Survival Telemetry Study",
                  "project": "Mainstem Survival",
                  "submitted": "Jun 5, 2026",
                  "reviewBy": "Jun 28, 2026",
                  "daysRemaining": 6,
                  "amount": 4310,
                  "stage": "Returned",
                  "final": false,
                  "invoiceDate": "May 30, 2026",
                  "perfStart": "May 1, 2026",
                  "perfEnd": "May 31, 2026",
                  "billTo": "BPA — Columbia Basin Fish & Wildlife Program",
                  "pdfName": "INV-2026-0041-Cascade.pdf",
                  "supportingDocs": [],
                  "notes": "Returned Jun 8 — receiver-maintenance line lacks a supporting field log; mileage exceeds the approved rate.",
                  "lineItems": [
                    { "description": "Receiver maintenance", "qty": 22, "unitPrice": 100 },
                    { "description": "Field mileage", "qty": 1200, "unitPrice": 0.62 }
                  ],
                  "contractValue": 680000,
                  "expended": 612300,
                  "remaining": 67700,
                  "asOf": "Jun 21, 2026"
                },
                {
                  "number": "INV-2026-0038",
                  "vendor": "Pacific Environmental Services, LLC",
                  "contract": "Salmon Habitat Restoration — Wenatchee",
                  "project": "Wenatchee Subbasin",
                  "submitted": "May 29, 2026",
                  "reviewBy": "Jun 21, 2026",
                  "daysRemaining": -1,
                  "amount": 5210,
                  "stage": "Approved",
                  "final": false,
                  "invoiceDate": "May 24, 2026",
                  "perfStart": "May 1, 2026",
                  "perfEnd": "May 15, 2026",
                  "billTo": "BPA — Columbia Basin Fish & Wildlife Program",
                  "pdfName": "INV-2026-0038-PacificEnv.pdf",
                  "supportingDocs": ["timesheet-may-2026.pdf"],
                  "lineItems": [
                    { "description": "Field biologist labor", "qty": 44, "unitPrice": 95 },
                    {
                      "description": "Habitat survey equipment rental",
                      "qty": 1,
                      "unitPrice": 650
                    },
                    { "description": "Field mileage", "qty": 760, "unitPrice": 0.5 }
                  ],
                  "contractValue": 420000,
                  "expended": 318400,
                  "remaining": 101600,
                  "asOf": "Jun 21, 2026"
                }
              ]
            </script>
            <!-- ───────── Review overlay: the split-view QA/QC surface (lego drawer) ─────────
       Populated from the clicked row; prev/next step through the displayed rows. -->
            <esa-side-dialog
              data-review-dialog="true"
              size="lg"
              heading="Invoice"
              class="cbf-review-dialog"
              position="right"
            >
              <div
                class="cbf-review-split sidebar"
                data-side="end"
                style="
                  --sidebar-width: 22rem;
                  --sidebar-content-min: 50%;
                  --gap: var(--spacing-600);
                "
              >
                <!-- Panel (first child → ordered right by data-side=end). -->
                <aside class="cbf-review-panel stack" data-gap="lg" aria-label="Review">
                  <div data-review-result="" hidden="">
                    <div class="esa-alert-box esa-alert-box--success">
                      <div class="esa-alert-box__icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <div class="esa-alert-box__body">
                        <strong class="esa-alert-box__title">Approved</strong>
                        <div class="esa-alert-box__message"><span data-result-text=""></span></div>
                      </div>
                    </div>
                  </div>
                  <!-- Hero: the billed amount is the headline figure the COR is deciding on;
             the status badge sits beside it, and the one line of context that
             matters most (this invoice vs. what's left on the contract) sits
             directly beneath. Everything below recedes in scale from here. -->
                  <header class="cbf-review-hero repel">
                    <div class="cbf-review-hero__group">
                      <span class="cbf-review__label">Amount billed</span>
                      <div class="cbf-review-hero__amount-row">
                        <span class="cbf-review-hero__amount cbf-num" data-f-amount-hero=""></span>
                        <span class="cbf-review-fields__copy" data-copy="" data-f-amount-copy="">
                          <button
                            class="esa-icon-button esa-icon-button--xs"
                            type="button"
                            aria-label="Copy amount"
                            title="Copy amount"
                          >
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
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                <path
                                  d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </span>
                      </div>
                      <span class="cbf-review-hero__pct" data-f-pct=""></span>
                    </div>
                    <span class="cbf-review-hero__status" data-f-status=""></span>
                  </header>
                  <div class="cbf-review-panel__clock repel">
                    <span class="cbf-review__label"
                      >Review by <span data-f-reviewby=""></span
                    ></span>
                    <span data-f-urgency=""></span>
                  </div>
                  <div data-f-final-alert="" hidden="">
                    <div class="esa-alert-box esa-alert-box--info">
                      <div class="esa-alert-box__icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                      </div>
                      <div class="esa-alert-box__body">
                        <strong class="esa-alert-box__title">Final invoice</strong>
                        <div class="esa-alert-box__message">
                          Closes out this contract. Confirm all deliverables are accepted and any
                          retainage is accounted for before approving.
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Supporting context: smaller than the hero, read as one related set —
             where this contract stands, so the amount above lands in proportion.
             Compact figures (the exact billed amount is the hero above). -->
                  <section class="cbf-review-panel__context stack" data-gap="sm">
                    <h3 class="cbf-review__section-title">Against this contract</h3>
                    <div class="cbf-review-context">
                      <div class="cbf-review-context__item">
                        <span
                          class="cbf-review-context__value cbf-num"
                          data-f-contractvalue=""
                        ></span>
                        <span class="cbf-review-context__label">Contract value</span>
                      </div>
                      <div class="cbf-review-context__item">
                        <span class="cbf-review-context__value cbf-num" data-f-expended=""></span>
                        <span class="cbf-review-context__label" data-f-asof=""></span>
                      </div>
                      <div class="cbf-review-context__item">
                        <span
                          class="cbf-review-context__value cbf-num cbf-review-context__value--accent"
                          data-f-remaining=""
                        ></span>
                        <span class="cbf-review-context__label">Remaining</span>
                      </div>
                    </div>
                  </section>
                  <!-- Budget impact: what processing THIS invoice does to the contract's
             remaining balance — a before → after ledger so the COR sees the
             draw-down at the moment of decision. Exact figures (not compact) so
             the arithmetic reconciles on screen. -->
                  <section class="cbf-review-impact" aria-label="Budget impact if approved">
                    <h3 class="cbf-review__section-title">If this invoice is processed</h3>
                    <dl class="cbf-review-impact__ledger">
                      <div class="cbf-review-impact__row">
                        <dt>Remaining before</dt>
                        <dd class="cbf-num" data-f-rem-before=""></dd>
                      </div>
                      <div class="cbf-review-impact__row">
                        <dt>This invoice</dt>
                        <dd class="cbf-num cbf-review-impact__delta" data-f-rem-delta=""></dd>
                      </div>
                      <div class="cbf-review-impact__row cbf-review-impact__row--total">
                        <dt>Remaining after</dt>
                        <dd class="cbf-num" data-f-rem-after=""></dd>
                      </div>
                    </dl>
                  </section>
                  <!-- Spec fields. Each row carries a copy control (esa-icon-button lego)
             that copies that field's value to the clipboard. Invoice number is
             repeated here (it also heads the modal) so it is copyable in-line
             with the rest of the metadata. -->
                  <dl class="cbf-review-fields">
                    <div class="cbf-review-fields__row">
                      <dt class="cbf-review__label">Invoice</dt>
                      <dd class="cbf-review-fields__value cbf-num" data-f-number-panel=""></dd>
                      <span class="cbf-review-fields__copy" data-copy="">
                        <button
                          class="esa-icon-button esa-icon-button--xs"
                          type="button"
                          aria-label="Copy invoice number"
                          title="Copy invoice number"
                        >
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
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                              <path
                                d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </span>
                    </div>
                    <div class="cbf-review-fields__row">
                      <dt class="cbf-review__label">Vendor</dt>
                      <dd
                        class="cbf-review-fields__value cbf-review-fields__value--lead"
                        data-f-vendor-panel=""
                      ></dd>
                      <span class="cbf-review-fields__copy" data-copy="">
                        <button
                          class="esa-icon-button esa-icon-button--xs"
                          type="button"
                          aria-label="Copy vendor"
                          title="Copy vendor"
                        >
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
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                              <path
                                d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </span>
                    </div>
                    <div class="cbf-review-fields__row">
                      <dt class="cbf-review__label">Contract</dt>
                      <dd class="cbf-review-fields__value" data-f-contract=""></dd>
                      <span class="cbf-review-fields__copy" data-copy="">
                        <button
                          class="esa-icon-button esa-icon-button--xs"
                          type="button"
                          aria-label="Copy contract"
                          title="Copy contract"
                        >
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
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                              <path
                                d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </span>
                    </div>
                    <div class="cbf-review-fields__row">
                      <dt class="cbf-review__label">Project</dt>
                      <dd class="cbf-review-fields__value" data-f-project=""></dd>
                      <span class="cbf-review-fields__copy" data-copy="">
                        <button
                          class="esa-icon-button esa-icon-button--xs"
                          type="button"
                          aria-label="Copy project"
                          title="Copy project"
                        >
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
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                              <path
                                d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </span>
                    </div>
                    <div class="cbf-review-fields__row">
                      <dt class="cbf-review__label">Perf. start</dt>
                      <dd class="cbf-review-fields__value" data-f-perf-start=""></dd>
                      <span class="cbf-review-fields__copy" data-copy="">
                        <button
                          class="esa-icon-button esa-icon-button--xs"
                          type="button"
                          aria-label="Copy performance start date"
                          title="Copy performance start date"
                        >
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
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                              <path
                                d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </span>
                    </div>
                    <div class="cbf-review-fields__row">
                      <dt class="cbf-review__label">Perf. end</dt>
                      <dd class="cbf-review-fields__value" data-f-perf-end=""></dd>
                      <span class="cbf-review-fields__copy" data-copy="">
                        <button
                          class="esa-icon-button esa-icon-button--xs"
                          type="button"
                          aria-label="Copy performance end date"
                          title="Copy performance end date"
                        >
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
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                              <path
                                d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </span>
                    </div>
                    <div class="cbf-review-fields__row">
                      <dt class="cbf-review__label">Submitted</dt>
                      <dd class="cbf-review-fields__value" data-f-submitted=""></dd>
                      <span class="cbf-review-fields__copy" data-copy="">
                        <button
                          class="esa-icon-button esa-icon-button--xs"
                          type="button"
                          aria-label="Copy submitted date"
                          title="Copy submitted date"
                        >
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
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                              <path
                                d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </span>
                    </div>
                  </dl>
                  <!-- Attachments: the invoice document the vendor submitted + the
             supporting files they uploaded. The COR downloads any single file or
             all at once. Rows are injected by JS; the per-row download control
             clones the server-rendered esa-icon-button template below so the lego
             markup stays byte-identical. (Mock files — download produces a named
             placeholder PDF, since no real blob exists.) -->
                  <section class="cbf-review-attachments" aria-label="Attachments">
                    <div class="cbf-review-attachments__head repel">
                      <h3 class="cbf-review__section-title" data-f-attach-title="">Attachments</h3>
                      <span data-attach-all="">
                        <span
                          class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--sm"
                        >
                          <button class="esa-button__native" type="button">
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
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" x2="12" y1="15" y2="3"></line>
                              </svg>
                            </span>
                            <span class="esa-button__label"> Download all </span>
                          </button>
                        </span>
                      </span>
                    </div>
                    <ul class="cbf-review-attachments__list" data-f-attachments=""></ul>
                  </section>
                  <div data-dl-template="" hidden="" aria-hidden="true">
                    <button
                      class="esa-icon-button esa-icon-button--sm"
                      type="button"
                      aria-label="Download file"
                      title="Download file"
                    >
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
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <!-- Decisions. Inline confirm/comment (no nested modal). -->
                  <div class="cbf-review-actions" data-actions="">
                    <div class="cluster" data-gap="sm" data-actions-default="">
                      <span data-act-approve=""
                        ><span
                          class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
                        >
                          <button class="esa-button__native" type="button">
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
                                <path d="M20 6 9 17l-5-5"></path>
                              </svg>
                            </span>
                            <span class="esa-button__label"> Approve </span>
                          </button>
                        </span>
                      </span>
                      <span data-act-return=""
                        ><span
                          class="esa-button esa-button--color-danger esa-button--appearance-outline esa-button--md"
                        >
                          <button class="esa-button__native" type="button">
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
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                <path d="M3 3v5h5"></path>
                              </svg>
                            </span>
                            <span class="esa-button__label"> Return for revision </span>
                          </button>
                        </span>
                      </span>
                    </div>
                    <div class="stack" data-gap="sm" data-actions-approve="" hidden="">
                      <p class="cbf-review-fields__value">
                        Approve <strong class="cbf-num" data-f-num-approve=""></strong> for
                        <span data-f-amount-approve=""></span> and route it to the Contracting
                        Officer for payment? This records your QA/QC sign-off.
                      </p>
                      <div class="cluster" data-gap="sm">
                        <span data-act-approve-cancel=""
                          ><span
                            class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--md"
                          >
                            <button class="esa-button__native" type="button">
                              <span class="esa-button__label"> Cancel </span>
                            </button>
                          </span>
                        </span>
                        <span data-act-approve-confirm=""
                          ><span
                            class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
                          >
                            <button class="esa-button__native" type="button">
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
                                  <path d="M20 6 9 17l-5-5"></path>
                                </svg>
                              </span>
                              <span class="esa-button__label"> Confirm approval </span>
                            </button>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div class="stack" data-gap="sm" data-actions-return="" hidden="">
                      <esa-textarea
                        data-return-reason="true"
                        label="Comments for the vendor"
                        placeholder="Explain what needs to change — e.g. a line item needs a supporting receipt, or the mileage rate exceeds the contract."
                        rows="4"
                        size="md"
                      ></esa-textarea>
                      <div class="cluster" data-gap="sm">
                        <span data-act-return-cancel=""
                          ><span
                            class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--md"
                          >
                            <button class="esa-button__native" type="button">
                              <span class="esa-button__label"> Cancel </span>
                            </button>
                          </span>
                        </span>
                        <span data-act-return-confirm=""
                          ><span
                            class="esa-button esa-button--color-danger esa-button--appearance-fill esa-button--md"
                          >
                            <button class="esa-button__native" type="button">
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
                                  <path
                                    d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
                                  ></path>
                                  <path d="M3 3v5h5"></path>
                                </svg>
                              </span>
                              <span class="esa-button__label"> Return for revision </span>
                            </button>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </aside>
                <!-- Document (last child → fluid, left). The thing the COR reads. -->
                <div class="cbf-review-docpane">
                  <article class="cbf-invoice-doc" aria-label="Submitted invoice document">
                    <div class="cbf-invoice-doc__stamp" data-f-stamp="" hidden="">
                      Final invoice
                    </div>
                    <header class="cbf-invoice-doc__head">
                      <div>
                        <p class="cbf-invoice-doc__vendor" data-f-vendor-doc=""></p>
                        <p class="cbf-invoice-doc__sub">Vendor</p>
                      </div>
                      <div class="cbf-invoice-doc__meta">
                        <p>
                          <span>Invoice #</span> <strong class="cbf-num" data-f-num-doc=""></strong>
                        </p>
                        <p><span>Date</span> <strong data-f-date=""></strong></p>
                      </div>
                    </header>
                    <div class="cbf-invoice-doc__billto">
                      <p class="cbf-invoice-doc__sub">Bill to</p>
                      <p data-f-billto=""></p>
                    </div>
                    <table class="cbf-invoice-doc__items">
                      <thead>
                        <tr>
                          <th scope="col">Description</th>
                          <th scope="col" class="cbf-num">Qty</th>
                          <th scope="col" class="cbf-num">Unit</th>
                          <th scope="col" class="cbf-num">Total</th>
                        </tr>
                      </thead>
                      <tbody data-f-items=""></tbody>
                      <tfoot>
                        <tr>
                          <th scope="row" colspan="3">Subtotal</th>
                          <td class="cbf-num" data-f-subtotal=""></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="3">Tax</th>
                          <td class="cbf-num" data-f-tax=""></td>
                        </tr>
                        <tr class="cbf-invoice-doc__total">
                          <th scope="row" colspan="3">Total</th>
                          <td class="cbf-num" data-f-total=""></td>
                        </tr>
                      </tfoot>
                    </table>
                    <p class="cbf-invoice-doc__memo" data-f-memo-wrap="" hidden="">
                      <span>Memo:</span> <span data-f-memo=""></span>
                    </p>
                    <p class="cbf-invoice-doc__generated" data-f-pdf=""></p>
                  </article>
                </div>
              </div>
              <div slot="footer" class="cbf-review-footer repel">
                <span class="cbf-review-footer__position" data-f-position=""></span>
                <div class="cluster" data-gap="xs">
                  <span data-review-prev=""
                    ><span
                      class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--md"
                    >
                      <button class="esa-button__native" type="button">
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
                            <path d="m15 18-6-6 6-6"></path>
                          </svg>
                        </span>
                        <span class="esa-button__label"> Previous </span>
                      </button>
                    </span>
                  </span>
                  <span data-review-next=""
                    ><span
                      class="esa-button esa-button--color-secondary esa-button--appearance-outline esa-button--md"
                    >
                      <button class="esa-button__native" type="button">
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
                            <path d="m9 18 6-6-6-6"></path>
                          </svg>
                        </span>
                        <span class="esa-button__label"> Next </span>
                      </button>
                    </span>
                  </span>
                </div>
              </div>
            </esa-side-dialog>
          </section>
          <script
            type="module"
            src="/cb-fish-design/_astro/cbf-invoice-review-queue.astro_astro_type_script_index_0_lang.wcbM4cBe.js"
          ></script>
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
  --ag-internal-hover-color: rgba(0, 0, 0, 0);
  --ag-internal-moving-color: rgba(0, 0, 0, 0);
  --app-bar-bg: #fcfcfc;
  --app-bar-brand-bg: #1e5386;
  --app-bar-brand-strong-bg: #13273e;
  --app-bar-brand-strong-text: #fcfcfc;
  --app-bar-brand-text: #fcfcfc;
  --app-bar-gap: 2rem;
  --app-bar-pad-x: 2rem;
  --app-bar-pad-y: 1rem;
  --app-bar-text: #3d3d3d;
  --badge-bg: #1e5386;
  --badge-height-lg: 34px;
  --badge-height-md: 28px;
  --badge-radius: .25rem;
  --badge-text-color: #fcfcfc;
  --breadcrumbs-link-color: #525252;
  --breadcrumbs-link-hover: #3d3d3d;
  --breadcrumbs-separator-color: #bbbbbb;
  --cbf-text-placeholder: #9aa3ad;
  --color-border: #dcdcdc;
  --color-border-light: #efefef;
  --color-border-strong: #bdbdbd;
  --color-danger: #e5484d;
  --color-danger-hover: #dc3e42;
  --color-danger-strong: #ce2c31;
  --color-primary: #1e5386;
  --color-primary-hover: #1a4570;
  --color-primary-strong: #2a7e3b;
  --color-primary-subtle: #f3f7fc;
  --color-secondary: #2770b2;
  --color-secondary-hover: #1e5386;
  --color-secondary-strong: #2a7e3b;
  --color-surface: #fcfcfc;
  --color-surface-inverse: #13273e;
  --color-surface-sunken: #f3f7fc;
  --color-text-inverse: #fcfcfc;
  --color-text-link: #1e5386;
  --color-text-muted: #7c7c7c;
  --color-text-primary: #3d3d3d;
  --color-text-secondary: #525252;
  --color-text-tertiary: #656565;
  --color-warning: #ffc53d;
  --color-warning-on-fill: #4f3422;
  --container-gutter: 2rem;
  --font-display: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif;
  --font-sans: "IBM Plex Sans", sans-serif;
  --font-weight-bold: 700;
  --font-weight-medium: 500;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --form-font-size-md: clamp(.75rem, .66rem + .44vw, .9375rem);
  --form-font-size-sm: clamp(.625rem, .56rem + .32vw, .75rem);
  --form-height-md: 40px;
  --form-height-sm: 32px;
  --form-height-xs: 28px;
  --form-padding-x-md: .75rem;
  --form-padding-x-sm: .625rem;
  --form-radius-md: .5rem;
  --form-radius-sm: .25rem;
  --icon-button-bg-hover: color-mix(in srgb, currentColor 14%, transparent);
  --icon-link-font-size-md: 1rem;
  --icon-link-font-size-sm: .875rem;
  --icon-link-gap: .375rem;
  --icon-size-md: 20px;
  --icon-size-medium: 20px;
  --icon-size-sm: 16px;
  --icon-size-small: 16px;
  --icon-size-xs: 14px;
  --letter-spacing-normal: .01em;
  --letter-spacing-tight: -.01em;
  --line-height-normal: 1.6;
  --line-height-relaxed: 1.8;
  --line-height-tight: 1.3;
  --link-column-heading-font-size: clamp(.75rem, .66rem + .44vw, .9375rem);
  --link-column-item-font-size: clamp(.6875rem, .61rem + .38vw, .875rem);
  --link-column-rule-color: color-mix(in srgb, currentColor 40%, transparent);
  --radius-100: .25rem;
  --radius-200: .5rem;
  --side-dialog-width: 400px;
  --side-dialog-width-lg: 520px;
  --side-dialog-width-sm: 320px;
  --sidebar-width: 280px;
  --spacing-050: .125rem;
  --spacing-100: .25rem;
  --spacing-150: .375rem;
  --spacing-200: .5rem;
  --spacing-250: .625rem;
  --spacing-300: .75rem;
  --spacing-400: 1rem;
  --spacing-500: 1.5rem;
  --spacing-600: 2rem;
  --spacing-650: 2.5rem;
  --spacing-700: 3rem;
  --spacing-800: 4rem;
  --transition-fast: .15s ease;
  --type-size-050: clamp(.5rem, .44rem + .3vw, .625rem);
  --type-size-100: clamp(.625rem, .56rem + .32vw, .75rem);
  --type-size-150: clamp(.6875rem, .61rem + .38vw, .875rem);
  --type-size-200: clamp(.75rem, .66rem + .44vw, .9375rem);
  --type-size-250: clamp(.8125rem, .71rem + .5vw, 1.0625rem);
  --type-size-300: clamp(.875rem, .77rem + .52vw, 1.125rem);
  --type-size-400: clamp(1rem, .88rem + .6vw, 1.25rem);
  --type-size-500: clamp(1.125rem, .98rem + .72vw, 1.5rem);
  --type-size-600: clamp(1.375rem, 1.2rem + .88vw, 1.875rem);
  --type-size-700: clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem);
}

.ag-pinned-left-header,.ag-pinned-right-header{display:inline-block;height:100%;overflow:hidden;position:relative}
.ag-pinned-left-header{border-right:var(--ag-pinned-column-border)}
.ag-pinned-right-header{border-left:var(--ag-pinned-column-border)}
.ag-pinned-left-floating-bottom,.ag-pinned-left-floating-top,.ag-pinned-right-floating-bottom,.ag-pinned-right-floating-top{min-width:0;overflow:hidden;position:relative}
.ag-pinned-left-sticky-top,.ag-pinned-right-sticky-top{height:100%;overflow:hidden;position:relative}
.ag-sticky-bottom-full-width-container,.ag-sticky-top-full-width-container{height:100%;overflow:hidden;width:100%}
.ag-body-horizontal-scroll:not(.ag-scrollbar-invisible){.ag-horizontal-left-spacer:not(.ag-scroller-corner){border-right:var(--ag-pinned-column-border)}
.ag-horizontal-right-spacer:not(.ag-scroller-corner){border-left:var(--ag-pinned-column-border)}
:where(.ag-theme-batchEditStyle-3) {
.ag-cell-batch-edit{background-color:var(--ag-cell-batch-edit-background-color);color:var(--ag-cell-batch-edit-text-color);display:inherit}
.ag-row-batch-edit{background-color:var(--ag-row-batch-edit-background-color);color:var(--ag-row-batch-edit-text-color)}
.esa-container{width:100%;max-width:var(--_container-max, 1556px);margin-inline:auto;padding-inline:var(--container-gutter, var(--spacing-600, 2rem))}
.cbf-search-field{display:flex;align-items:center;gap:var(--spacing-300);width:100%;padding:var(--spacing-300) var(--spacing-400);border:1px solid var(--color-border);border-radius:var(--radius-100);background:var(--color-surface)}
.cbf-search-field .cbf-icon{color:var(--color-text-muted);display:inline-flex}
.cbf-search-field input{flex:1;min-width:0;border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:18px;color:var(--color-text-primary)}
.cbf-search-field input::placeholder{color:var(--cbf-text-placeholder)}
.esa-badge{--_badge-bg: var(--badge-bg, var(--color-primary, #43608a));--_badge-text: var(--badge-text-color, var(--color-text-inverse, #fff));--_badge-height: var(--badge-height-md, 28px);--_badge-font-size: 13px;--_badge-padding-x: var(--spacing-200, .5rem);--_badge-min-width: var(--badge-height-md, 28px);display:inline-flex;align-items:center;justify-content:center;height:var(--_badge-height);min-width:var(--_badge-min-width);padding-inline:var(--_badge-padding-x);border-radius:var(--badge-radius, var(--radius-100, 4px));background:var(--_badge-bg);color:var(--_badge-text);font-size:var(--_badge-font-size);font-weight:600;line-height:1;white-space:nowrap;box-sizing:border-box}
.esa-badge--lg{--_badge-height: var(--badge-height-lg, 34px);--_badge-font-size: 14px;--_badge-padding-x: var(--spacing-300, .75rem);--_badge-min-width: var(--badge-height-lg, 34px)}
.esa-badge--danger{--_badge-bg: var(--color-danger, #e5484d)}
.esa-badge--warning{--_badge-bg: var(--color-warning, #ffc53d);--_badge-text: var(--color-warning-on-fill, #4f3422)}
.esa-badge--secondary{--_badge-bg: var(--color-secondary, #65ba74)}
.ag-overlay{inset:0;pointer-events:none;position:absolute;z-index:2}
:host { --_width: var(--side-dialog-width, 400px); }
:host([size='sm']) { --_width: var(--side-dialog-width-sm, 320px); }
:host([size='lg']) { --_width: var(--side-dialog-width-lg, 520px); }
:has(> :where(.ag-theme-params-1)):not(:where(.ag-theme-params-1)) {
	--ag-inherited-accent-color: var(--ag-accent-color);
	--ag-inherited-advanced-filter-builder-button-bar-border: var(--ag-advanced-filter-builder-button-bar-border);
	--ag-inherited-advanced-filter-builder-column-pill-color: var(--ag-advanced-filter-builder-column-pill-color);
	--ag-inherited-advanced-filter-builder-indent-size: var(--ag-advanced-filter-builder-indent-size);
	--ag-inherited-advanced-filter-builder-join-pill-color: var(--ag-advanced-filter-builder-join-pill-color);
	--ag-inherited-advanced-filter-builder-option-pill-color: var(--ag-advanced-filter-builder-option-pill-color);
	--ag-inherited-advanced-filter-builder-value-pill-color: var(--ag-advanced-filter-builder-value-pill-color);
	--ag-inherited-background-color: var(--ag-background-color);
	--ag-inherited-border-color: var(--ag-border-color);
	--ag-inherited-border-radius: var(--ag-border-radius);
	--ag-inherited-border-width: var(--ag-border-width);
	--ag-inherited-browser-color-scheme: var(--ag-browser-color-scheme);
	--ag-inherited-button-active-background-color: var(--ag-button-active-background-color);
	--ag-inherited-button-active-border: var(--ag-button-active-border);
	--ag-inherited-button-active-text-color: var(--ag-button-active-text-color);
	--ag-inherited-button-background-color: var(--ag-button-background-color);
	--ag-inherited-button-border: var(--ag-button-border);
	--ag-inherited-button-border-radius: var(--ag-button-border-radius);
	--ag-inherited-button-disabled-background-color: var(--ag-button-disabled-background-color);
	--ag-inherited-button-disabled-border: var(--ag-button-disabled-border);
	--ag-inherited-button-disabled-text-color: var(--ag-button-disabled-text-color);
	--ag-inherited-button-font-weight: var(--ag-button-font-weight);
	--ag-inherited-button-horizontal-padding: var(--ag-button-horizontal-padding);
	--ag-inherited-button-hover-background-color: var(--ag-button-hover-background-color);
	--ag-inherited-button-hover-border: var(--ag-button-hover-border);
	--ag-inherited-button-hover-text-color: var(--ag-button-hover-text-color);
	--ag-inherited-button-text-color: var(--ag-button-text-color);
	--ag-inherited-button-vertical-padding: var(--ag-button-vertical-padding);
	--ag-inherited-card-shadow: var(--ag-card-shadow);
	--ag-inherited-cell-batch-edit-background-color: var(--ag-cell-batch-edit-background-color);
	--ag-inherited-cell-batch-edit-text-color: var(--ag-cell-batch-edit-text-color);
	--ag-inherited-cell-editing-border: var(--ag-cell-editing-border);
	--ag-inherited-cell-editing-shadow: var(--ag-cell-editing-shadow);
	--ag-inherited-cell-font-family: var(--ag-cell-font-family);
	--ag-inherited-cell-font-size: var(--ag-cell-font-size);
	--ag-inherited-cell-font-weight: var(--ag-cell-font-weight);
	--ag-inherited-cell-horizontal-padding: var(--ag-cell-horizontal-padding);
	--ag-inherited-cell-horizontal-padding-scale: var(--ag-cell-horizontal-padding-scale);
	--ag-inherited-cell-text-color: var(--ag-cell-text-color);
	--ag-inherited-cell-widget-spacing: var(--ag-cell-widget-spacing);
	--ag-inherited-chart-menu-label-color: var(--ag-chart-menu-label-color);
	--ag-inherited-chart-menu-panel-width: var(--ag-chart-menu-panel-width);
	--ag-inherited-checkbox-border-radius: var(--ag-checkbox-border-radius);
	--ag-inherited-checkbox-border-width: var(--ag-checkbox-border-width);
	--ag-inherited-checkbox-checked-background-color: var(--ag-checkbox-checked-background-color);
	--ag-inherited-checkbox-checked-border-color: var(--ag-checkbox-checked-border-color);
	--ag-inherited-checkbox-checked-shape-color: var(--ag-checkbox-checked-shape-color);
	--ag-inherited-checkbox-checked-shape-image: var(--ag-checkbox-checked-shape-image);
	--ag-inherited-checkbox-indeterminate-background-color: var(--ag-checkbox-indeterminate-background-color);
	--ag-inherited-checkbox-indeterminate-border-color: var(--ag-checkbox-indeterminate-border-color);
	--ag-inherited-checkbox-indeterminate-shape-color: var(--ag-checkbox-indeterminate-shape-color);
	--ag-inherited-checkbox-indeterminate-shape-image: var(--ag-checkbox-indeterminate-shape-image);
	--ag-inherited-checkbox-unchecked-background-color: var(--ag-checkbox-unchecked-background-color);
	--ag-inherited-checkbox-unchecked-border-color: var(--ag-checkbox-unchecked-border-color);
	--ag-inherited-chrome-background-color: var(--ag-chrome-background-color);
	--ag-inherited-color-picker-color-border-radius: var(--ag-color-picker-color-border-radius);
	--ag-inherited-color-picker-thumb-border-width: var(--ag-color-picker-thumb-border-width);
	--ag-inherited-color-picker-thumb-size: var(--ag-color-picker-thumb-size);
	--ag-inherited-color-picker-track-border-radius: var(--ag-color-picker-track-border-radius);
	--ag-inherited-color-picker-track-size: var(--ag-color-picker-track-size);
	--ag-inherited-column-border: var(--ag-column-border);
	--ag-inherited-column-drag-indicator-color: var(--ag-column-drag-indicator-color);
	--ag-inherited-column-drag-indicator-width: var(--ag-column-drag-indicator-width);
	--ag-inherited-column-drop-cell-background-color: var(--ag-column-drop-cell-background-color);
	--ag-inherited-column-drop-cell-border: var(--ag-column-drop-cell-border);
	--ag-inherited-column-drop-cell-drag-handle-color: var(--ag-column-drop-cell-drag-handle-color);
	--ag-inherited-column-drop-cell-text-color: var(--ag-column-drop-cell-text-color);
	--ag-inherited-column-hover-color: var(--ag-column-hover-color);
	--ag-inherited-column-panel-apply-button-background-color: var(--ag-column-panel-apply-button-background-color);
	--ag-inherited-column-panel-apply-button-color: var(--ag-column-panel-apply-button-color);
	--ag-inherited-column-select-indent-size: var(--ag-column-select-indent-size);
	--ag-inherited-data-background-color: var(--ag-data-background-color);
	--ag-inherited-data-font-size: var(--ag-data-font-size);
	--ag-inherited-dialog-border: var(--ag-dialog-border);
	--ag-inherited-dialog-shadow: var(--ag-dialog-shadow);
	--ag-inherited-drag-and-drop-image-background-color: var(--ag-drag-and-drop-image-background-color);
	--ag-inherited-drag-and-drop-image-border: var(--ag-drag-and-drop-image-border);
	--ag-inherited-drag-and-drop-image-not-allowed-border: var(--ag-drag-and-drop-image-not-allowed-border);
	--ag-inherited-drag-and-drop-image-shadow: var(--ag-drag-and-drop-image-shadow);
	--ag-inherited-drag-handle-color: var(--ag-drag-handle-color);
	--ag-inherited-dropdown-shadow: var(--ag-dropdown-shadow);
	--ag-inherited-filter-panel-apply-button-background-color: var(--ag-filter-panel-apply-button-background-color);
	--ag-inherited-filter-panel-apply-button-color: var(--ag-filter-panel-apply-button-color);
	--ag-inherited-filter-panel-card-subtle-color: var(--ag-filter-panel-card-subtle-color);
	--ag-inherited-filter-panel-card-subtle-hover-color: var(--ag-filter-panel-card-subtle-hover-color);
	--ag-inherited-filter-tool-panel-group-indent: var(--ag-filter-tool-panel-group-indent);
	--ag-inherited-find-active-match-background-color: var(--ag-find-active-match-background-color);
	--ag-inherited-find-active-match-color: var(--ag-find-active-match-color);
	--ag-inherited-find-match-background-color: var(--ag-find-match-background-color);
	--ag-inherited-find-match-color: var(--ag-find-match-color);
	--ag-inherited-focus-error-shadow: var(--ag-focus-error-shadow);
	--ag-inherited-focus-shadow: var(--ag-focus-shadow);
	--ag-inherited-font-family: var(--ag-font-family);
	--ag-inherited-font-size: var(--ag-font-size);
	--ag-inherited-font-weight: var(--ag-font-weight);
	--ag-inherited-footer-row-border: var(--ag-footer-row-border);
	--ag-inherited-foreground-color: var(--ag-foreground-color);
	--ag-inherited-formula-token-1-background-color: var(--ag-formula-token-1-background-color);
	--ag-inherited-formula-token-1-border: var(--ag-formula-token-1-border);
	--ag-inherited-formula-token-1-color: var(--ag-formula-token-1-color);
	--ag-inherited-formula-token-2-background-color: var(--ag-formula-token-2-background-color);
	--ag-inherited-formula-token-2-border: var(--ag-formula-token-2-border);
	--ag-inherited-formula-token-2-color: var(--ag-formula-token-2-color);
	--ag-inherited-formula-token-3-background-color: var(--ag-formula-token-3-background-color);
	--ag-inherited-formula-token-3-border: var(--ag-formula-token-3-border);
	--ag-inherited-formula-token-3-color: var(--ag-formula-token-3-color);
	--ag-inherited-formula-token-4-background-color: var(--ag-formula-token-4-background-color);
	--ag-inherited-formula-token-4-border: var(--ag-formula-token-4-border);
	--ag-inherited-formula-token-4-color: var(--ag-formula-token-4-color);
	--ag-inherited-formula-token-5-background-color: var(--ag-formula-token-5-background-color);
	--ag-inherited-formula-token-5-border: var(--ag-formula-token-5-border);
	--ag-inherited-formula-token-5-color: var(--ag-formula-token-5-color);
	--ag-inherited-formula-token-6-background-color: var(--ag-formula-token-6-background-color);
	--ag-inherited-formula-token-6-border: var(--ag-formula-token-6-border);
	--ag-inherited-formula-token-6-color: var(--ag-formula-token-6-color);
	--ag-inherited-formula-token-7-background-color: var(--ag-formula-token-7-background-color);
	--ag-inherited-formula-token-7-border: var(--ag-formula-token-7-border);
	--ag-inherited-formula-token-7-color: var(--ag-formula-token-7-color);
	--ag-inherited-full-row-edit-invalid-background-color: var(--ag-full-row-edit-invalid-background-color);
	--ag-inherited-header-background-color: var(--ag-header-background-color);
	--ag-inherited-header-cell-background-transition-duration: var(--ag-header-cell-background-transition-duration);
	--ag-inherited-header-cell-hover-background-color: var(--ag-header-cell-hover-background-color);
	--ag-inherited-header-cell-moving-background-color: var(--ag-header-cell-moving-background-color);
	--ag-inherited-header-column-border: var(--ag-header-column-border);
	--ag-inherited-header-column-border-height: var(--ag-header-column-border-height);
	--ag-inherited-header-column-resize-handle-color: var(--ag-header-column-resize-handle-color);
	--ag-inherited-header-column-resize-handle-height: var(--ag-header-column-resize-handle-height);
	--ag-inherited-header-column-resize-handle-width: var(--ag-header-column-resize-handle-width);
	--ag-inherited-header-font-family: var(--ag-header-font-family);
	--ag-inherited-header-font-size: var(--ag-header-font-size);
	--ag-inherited-header-font-weight: var(--ag-header-font-weight);
	--ag-inherited-header-height: var(--ag-header-height);
	--ag-inherited-header-row-border: var(--ag-header-row-border);
	--ag-inherited-header-text-color: var(--ag-header-text-color);
	--ag-inherited-header-vertical-padding-scale: var(--ag-header-vertical-padding-scale);
	--ag-inherited-icon-button-active-background-color: var(--ag-icon-button-active-background-color);
	--ag-inherited-icon-button-active-color: var(--ag-icon-button-active-color);
	--ag-inherited-icon-button-active-indicator-color: var(--ag-icon-button-active-indicator-color);
	--ag-inherited-icon-button-background-color: var(--ag-icon-button-background-color);
	--ag-inherited-icon-button-background-spread: var(--ag-icon-button-background-spread);
	--ag-inherited-icon-button-border-radius: var(--ag-icon-button-border-radius);
	--ag-inherited-icon-button-color: var(--ag-icon-button-color);
	--ag-inherited-icon-button-hover-background-color: var(--ag-icon-button-hover-background-color);
	--ag-inherited-icon-button-hover-color: var(--ag-icon-button-hover-color);
	--ag-inherited-icon-color: var(--ag-icon-color);
	--ag-inherited-icon-size: var(--ag-icon-size);
	--ag-inherited-input-background-color: var(--ag-input-background-color);
	--ag-inherited-input-border: var(--ag-input-border);
	--ag-inherited-input-border-radius: var(--ag-input-border-radius);
	--ag-inherited-input-disabled-background-color: var(--ag-input-disabled-background-color);
	--ag-inherited-input-disabled-border: var(--ag-input-disabled-border);
	--ag-inherited-input-disabled-text-color: var(--ag-input-disabled-text-color);
	--ag-inherited-input-focus-background-color: var(--ag-input-focus-background-color);
	--ag-inherited-input-focus-border: var(--ag-input-focus-border);
	--ag-inherited-input-focus-shadow: var(--ag-input-focus-shadow);
	--ag-inherited-input-focus-text-color: var(--ag-input-focus-text-color);
	--ag-inherited-input-height: var(--ag-input-height);
	--ag-inherited-input-icon-color: var(--ag-input-icon-color);
	--ag-inherited-input-invalid-background-color: var(--ag-input-invalid-background-color);
	--ag-inherited-input-invalid-border: var(--ag-input-invalid-border);
	--ag-inherited-input-invalid-text-color: var(--ag-input-invalid-text-color);
	--ag-inherited-input-padding-start: var(--ag-input-padding-start);
	--ag-inherited-input-placeholder-text-color: var(--ag-input-placeholder-text-color);
	--ag-inherited-input-text-color: var(--ag-input-text-color);
	--ag-inherited-invalid-color: var(--ag-invalid-color);
	--ag-inherited-list-item-height: var(--ag-list-item-height);
	--ag-inherited-menu-background-color: var(--ag-menu-background-color);
	--ag-inherited-menu-border: var(--ag-menu-border);
	--ag-inherited-menu-separator-color: var(--ag-menu-separator-color);
	--ag-inherited-menu-shadow: var(--ag-menu-shadow);
	--ag-inherited-menu-text-color: var(--ag-menu-text-color);
	--ag-inherited-modal-overlay-background-color: var(--ag-modal-overlay-background-color);
	--ag-inherited-note-indicator-color: var(--ag-note-indicator-color);
	--ag-inherited-note-indicator-size: var(--ag-note-indicator-size);
	--ag-inherited-note-popup-background-color: var(--ag-note-popup-background-color);
	--ag-inherited-note-popup-border: var(--ag-note-popup-border);
	--ag-inherited-note-popup-input-background-color: var(--ag-note-popup-input-background-color);
	--ag-inherited-note-popup-input-text-color: var(--ag-note-popup-input-text-color);
	--ag-inherited-note-popup-padding: var(--ag-note-popup-padding);
	--ag-inherited-note-popup-text-color: var(--ag-note-popup-text-color);
	--ag-inherited-odd-row-background-color: var(--ag-odd-row-background-color);
	--ag-inherited-pagination-panel-height: var(--ag-pagination-panel-height);
	--ag-inherited-panel-background-color: var(--ag-panel-background-color);
	--ag-inherited-panel-title-bar-background-color: var(--ag-panel-title-bar-background-color);
	--ag-inherited-panel-title-bar-border: var(--ag-panel-title-bar-border);
	--ag-inherited-panel-title-bar-font-family: var(--ag-panel-title-bar-font-family);
	--ag-inherited-panel-title-bar-font-size: var(--ag-panel-title-bar-font-size);
	--ag-inherited-panel-title-bar-font-weight: var(--ag-panel-title-bar-font-weight);
	--ag-inherited-panel-title-bar-height: var(--ag-panel-title-bar-height);
	--ag-inherited-panel-title-bar-icon-color: var(--ag-panel-title-bar-icon-color);
	--ag-inherited-panel-title-bar-text-color: var(--ag-panel-title-bar-text-color);
	--ag-inherited-picker-button-background-color: var(--ag-picker-button-background-color);
	--ag-inherited-picker-button-border: var(--ag-picker-button-border);
	--ag-inherited-picker-button-focus-background-color: var(--ag-picker-button-focus-background-color);
	--ag-inherited-picker-button-focus-border: var(--ag-picker-button-focus-border);
	--ag-inherited-picker-list-background-color: var(--ag-picker-list-background-color);
	--ag-inherited-picker-list-border: var(--ag-picker-list-border);
	--ag-inherited-pinned-column-border: var(--ag-pinned-column-border);
	--ag-inherited-pinned-row-background-color: var(--ag-pinned-row-background-color);
	--ag-inherited-pinned-row-border: var(--ag-pinned-row-border);
	--ag-inherited-pinned-row-font-weight: var(--ag-pinned-row-font-weight);
	--ag-inherited-pinned-row-text-color: var(--ag-pinned-row-text-color);
	--ag-inherited-pinned-source-row-background-color: var(--ag-pinned-source-row-background-color);
	--ag-inherited-pinned-source-row-font-weight: var(--ag-pinned-source-row-font-weight);
	--ag-inherited-pinned-source-row-text-color: var(--ag-pinned-source-row-text-color);
	--ag-inherited-popup-shadow: var(--ag-popup-shadow);
	--ag-inherited-radio-checked-shape-image: var(--ag-radio-checked-shape-image);
	--ag-inherited-range-header-highlight-color: var(--ag-range-header-highlight-color);
	--ag-inherited-range-selection-background-color: var(--ag-range-selection-background-color);
	--ag-inherited-range-selection-border-color: var(--ag-range-selection-border-color);
	--ag-inherited-range-selection-border-style: var(--ag-range-selection-border-style);
	--ag-inherited-range-selection-chart-background-color: var(--ag-range-selection-chart-background-color);
	--ag-inherited-range-selection-chart-category-background-color: var(--ag-range-selection-chart-category-background-color);
	--ag-inherited-range-selection-highlight-color: var(--ag-range-selection-highlight-color);
	--ag-inherited-row-batch-edit-background-color: var(--ag-row-batch-edit-background-color);
	--ag-inherited-row-batch-edit-text-color: var(--ag-row-batch-edit-text-color);
	--ag-inherited-row-border: var(--ag-row-border);
	--ag-inherited-row-drag-indicator-color: var(--ag-row-drag-indicator-color);
	--ag-inherited-row-drag-indicator-width: var(--ag-row-drag-indicator-width);
	--ag-inherited-row-group-indent-size: var(--ag-row-group-indent-size);
	--ag-inherited-row-height: var(--ag-row-height);
	--ag-inherited-row-hover-color: var(--ag-row-hover-color);
	--ag-inherited-row-loading-skeleton-effect-color: var(--ag-row-loading-skeleton-effect-color);
	--ag-inherited-row-numbers-selected-color: var(--ag-row-numbers-selected-color);
	--ag-inherited-row-vertical-padding-scale: var(--ag-row-vertical-padding-scale);
	--ag-inherited-select-cell-background-color: var(--ag-select-cell-background-color);
	--ag-inherited-select-cell-border: var(--ag-select-cell-border);
	--ag-inherited-selected-row-background-color: var(--ag-selected-row-background-color);
	--ag-inherited-set-filter-indent-size: var(--ag-set-filter-indent-size);
	--ag-inherited-side-bar-background-color: var(--ag-side-bar-background-color);
	--ag-inherited-side-bar-panel-animation-duration: var(--ag-side-bar-panel-animation-duration);
	--ag-inherited-side-bar-panel-width: var(--ag-side-bar-panel-width);
	--ag-inherited-side-button-background-color: var(--ag-side-button-background-color);
	--ag-inherited-side-button-bar-background-color: var(--ag-side-button-bar-background-color);
	--ag-inherited-side-button-bar-top-padding: var(--ag-side-button-bar-top-padding);
	--ag-inherited-side-button-border: var(--ag-side-button-border);
	--ag-inherited-side-button-hover-background-color: var(--ag-side-button-hover-background-color);
	--ag-inherited-side-button-hover-text-color: var(--ag-side-button-hover-text-color);
	--ag-inherited-side-button-left-padding: var(--ag-side-button-left-padding);
	--ag-inherited-side-button-right-padding: var(--ag-side-button-right-padding);
	--ag-inherited-side-button-selected-background-color: var(--ag-side-button-selected-background-color);
	--ag-inherited-side-button-selected-border: var(--ag-side-button-selected-border);
	--ag-inherited-side-button-selected-text-color: var(--ag-side-button-selected-text-color);
	--ag-inherited-side-button-selected-underline-color: var(--ag-side-button-selected-underline-color);
	--ag-inherited-side-button-selected-underline-transition-duration: var(--ag-side-button-selected-underline-transition-duration);
	--ag-inherited-side-button-selected-underline-width: var(--ag-side-button-selected-underline-width);
	--ag-inherited-side-button-text-color: var(--ag-side-button-text-color);
	--ag-inherited-side-button-vertical-padding: var(--ag-side-button-vertical-padding);
	--ag-inherited-side-panel-border: var(--ag-side-panel-border);
	--ag-inherited-spacing: var(--ag-spacing);
	--ag-inherited-status-bar-label-color: var(--ag-status-bar-label-color);
	--ag-inherited-status-bar-label-font-weight: var(--ag-status-bar-label-font-weight);
	--ag-inherited-status-bar-value-color: var(--ag-status-bar-value-color);
	--ag-inherited-status-bar-value-font-weight: var(--ag-status-bar-value-font-weight);
	--ag-inherited-subtle-text-color: var(--ag-subtle-text-color);
	--ag-inherited-tab-background-color: var(--ag-tab-background-color);
	--ag-inherited-tab-bar-background-color: var(--ag-tab-bar-background-color);
	--ag-inherited-tab-bar-border: var(--ag-tab-bar-border);
	--ag-inherited-tab-bar-horizontal-padding: var(--ag-tab-bar-horizontal-padding);
	--ag-inherited-tab-bar-top-padding: var(--ag-tab-bar-top-padding);
	--ag-inherited-tab-bottom-padding: var(--ag-tab-bottom-padding);
	--ag-inherited-tab-horizontal-padding: var(--ag-tab-horizontal-padding);
	--ag-inherited-tab-hover-background-color: var(--ag-tab-hover-background-color);
	--ag-inherited-tab-hover-text-color: var(--ag-tab-hover-text-color);
	--ag-inherited-tab-selected-background-color: var(--ag-tab-selected-background-color);
	--ag-inherited-tab-selected-border-color: var(--ag-tab-selected-border-color);
	--ag-inherited-tab-selected-border-width: var(--ag-tab-selected-border-width);
	--ag-inherited-tab-selected-text-color: var(--ag-tab-selected-text-color);
	--ag-inherited-tab-selected-underline-color: var(--ag-tab-selected-underline-color);
	--ag-inherited-tab-selected-underline-transition-duration: var(--ag-tab-selected-underline-transition-duration);
	--ag-inherited-tab-selected-underline-width: var(--ag-tab-selected-underline-width);
	--ag-inherited-tab-spacing: var(--ag-tab-spacing);
	--ag-inherited-tab-text-color: var(--ag-tab-text-color);
	--ag-inherited-tab-top-padding: var(--ag-tab-top-padding);
	--ag-inherited-text-color: var(--ag-text-color);
	--ag-inherited-toggle-button-height: var(--ag-toggle-button-height);
	--ag-inherited-toggle-button-off-background-color: var(--ag-toggle-button-off-background-color);
	--ag-inherited-toggle-button-on-background-color: var(--ag-toggle-button-on-background-color);
	--ag-inherited-toggle-button-switch-background-color: var(--ag-toggle-button-switch-background-color);
	--ag-inherited-toggle-button-switch-inset: var(--ag-toggle-button-switch-inset);
	--ag-inherited-toggle-button-width: var(--ag-toggle-button-width);
	--ag-inherited-tool-panel-separator-border: var(--ag-tool-panel-separator-border);
	--ag-inherited-toolbar-background-color: var(--ag-toolbar-background-color);
	--ag-inherited-toolbar-separator-border: var(--ag-toolbar-separator-border);
	--ag-inherited-toolbar-text-color: var(--ag-toolbar-text-color);
	--ag-inherited-tooltip-background-color: var(--ag-tooltip-background-color);
	--ag-inherited-tooltip-border: var(--ag-tooltip-border);
	--ag-inherited-tooltip-error-background-color: var(--ag-tooltip-error-background-color);
	--ag-inherited-tooltip-error-border: var(--ag-tooltip-error-border);
	--ag-inherited-tooltip-error-text-color: var(--ag-tooltip-error-text-color);
	--ag-inherited-tooltip-text-color: var(--ag-tooltip-text-color);
	--ag-inherited-value-change-delta-down-color: var(--ag-value-change-delta-down-color);
	--ag-inherited-value-change-delta-up-color: var(--ag-value-change-delta-up-color);
	--ag-inherited-value-change-value-highlight-background-color: var(--ag-value-change-value-highlight-background-color);
	--ag-inherited-widget-container-horizontal-padding: var(--ag-widget-container-horizontal-padding);
	--ag-inherited-widget-container-vertical-padding: var(--ag-widget-container-vertical-padding);
	--ag-inherited-widget-horizontal-spacing: var(--ag-widget-horizontal-spacing);
	--ag-inherited-widget-vertical-spacing: var(--ag-widget-vertical-spacing);
	--ag-inherited-wrapper-background-color: var(--ag-wrapper-background-color);
	--ag-inherited-wrapper-border: var(--ag-wrapper-border);
	--ag-inherited-wrapper-border-radius: var(--ag-wrapper-border-radius);
:where([data-ag-theme-mode="light"]) & {
	--ag-inherited-browser-color-scheme: var(--ag-browser-color-scheme);
	--ag-inherited-chrome-background-color: var(--ag-chrome-background-color);
}
:where([data-ag-theme-mode="dark"]) & {
	--ag-inherited-advanced-filter-builder-column-pill-color: var(--ag-advanced-filter-builder-column-pill-color);
	--ag-inherited-advanced-filter-builder-join-pill-color: var(--ag-advanced-filter-builder-join-pill-color);
	--ag-inherited-advanced-filter-builder-option-pill-color: var(--ag-advanced-filter-builder-option-pill-color);
	--ag-inherited-advanced-filter-builder-value-pill-color: var(--ag-advanced-filter-builder-value-pill-color);
	--ag-inherited-browser-color-scheme: var(--ag-browser-color-scheme);
	--ag-inherited-card-shadow: var(--ag-card-shadow);
	--ag-inherited-cell-batch-edit-background-color: var(--ag-cell-batch-edit-background-color);
	--ag-inherited-cell-batch-edit-text-color: var(--ag-cell-batch-edit-text-color);
	--ag-inherited-checkbox-unchecked-border-color: var(--ag-checkbox-unchecked-border-color);
	--ag-inherited-chrome-background-color: var(--ag-chrome-background-color);
	--ag-inherited-column-panel-apply-button-color: var(--ag-column-panel-apply-button-color);
	--ag-inherited-filter-panel-apply-button-color: var(--ag-filter-panel-apply-button-color);
	--ag-inherited-find-active-match-color: var(--ag-find-active-match-color);
	--ag-inherited-find-match-color: var(--ag-find-match-color);
	--ag-inherited-formula-token-1-color: var(--ag-formula-token-1-color);
	--ag-inherited-formula-token-2-color: var(--ag-formula-token-2-color);
	--ag-inherited-formula-token-3-color: var(--ag-formula-token-3-color);
	--ag-inherited-formula-token-4-color: var(--ag-formula-token-4-color);
	--ag-inherited-formula-token-5-color: var(--ag-formula-token-5-color);
	--ag-inherited-formula-token-6-color: var(--ag-formula-token-6-color);
	--ag-inherited-formula-token-7-color: var(--ag-formula-token-7-color);
	--ag-inherited-menu-background-color: var(--ag-menu-background-color);
	--ag-inherited-popup-shadow: var(--ag-popup-shadow);
	--ag-inherited-row-batch-edit-background-color: var(--ag-row-batch-edit-background-color);
	--ag-inherited-row-batch-edit-text-color: var(--ag-row-batch-edit-text-color);
	--ag-inherited-selected-row-background-color: var(--ag-selected-row-background-color);
	--ag-inherited-toggle-button-off-background-color: var(--ag-toggle-button-off-background-color);
}
:where([data-ag-theme-mode="dark-blue"]) & {
	--ag-inherited-advanced-filter-builder-column-pill-color: var(--ag-advanced-filter-builder-column-pill-color);
	--ag-inherited-advanced-filter-builder-join-pill-color: var(--ag-advanced-filter-builder-join-pill-color);
	--ag-inherited-advanced-filter-builder-option-pill-color: var(--ag-advanced-filter-builder-option-pill-color);
	--ag-inherited-advanced-filter-builder-value-pill-color: var(--ag-advanced-filter-builder-value-pill-color);
	--ag-inherited-browser-color-scheme: var(--ag-browser-color-scheme);
	--ag-inherited-card-shadow: var(--ag-card-shadow);
	--ag-inherited-cell-batch-edit-background-color: var(--ag-cell-batch-edit-background-color);
	--ag-inherited-cell-batch-edit-text-color: var(--ag-cell-batch-edit-text-color);
	--ag-inherited-checkbox-unchecked-border-color: var(--ag-checkbox-unchecked-border-color);
	--ag-inherited-chrome-background-color: var(--ag-chrome-background-color);
	--ag-inherited-column-panel-apply-button-color: var(--ag-column-panel-apply-button-color);
	--ag-inherited-filter-panel-apply-button-color: var(--ag-filter-panel-apply-button-color);
	--ag-inherited-find-active-match-color: var(--ag-find-active-match-color);
	--ag-inherited-find-match-color: var(--ag-find-match-color);
	--ag-inherited-formula-token-1-color: var(--ag-formula-token-1-color);
	--ag-inherited-formula-token-2-color: var(--ag-formula-token-2-color);
	--ag-inherited-formula-token-3-color: var(--ag-formula-token-3-color);
	--ag-inherited-formula-token-4-color: var(--ag-formula-token-4-color);
	--ag-inherited-formula-token-5-color: var(--ag-formula-token-5-color);
	--ag-inherited-formula-token-6-color: var(--ag-formula-token-6-color);
	--ag-inherited-formula-token-7-color: var(--ag-formula-token-7-color);
	--ag-inherited-menu-background-color: var(--ag-menu-background-color);
	--ag-inherited-popup-shadow: var(--ag-popup-shadow);
	--ag-inherited-row-batch-edit-background-color: var(--ag-row-batch-edit-background-color);
	--ag-inherited-row-batch-edit-text-color: var(--ag-row-batch-edit-text-color);
	--ag-inherited-selected-row-background-color: var(--ag-selected-row-background-color);
	--ag-inherited-toggle-button-off-background-color: var(--ag-toggle-button-off-background-color);
}
:where(.ag-theme-params-1) {
	--ag-accent-color: var(--ag-inherited-accent-color, var(--color-primary));
	--ag-advanced-filter-builder-button-bar-border: var(--ag-inherited-advanced-filter-builder-button-bar-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-advanced-filter-builder-column-pill-color: var(--ag-inherited-advanced-filter-builder-column-pill-color, #a6e194);
	--ag-advanced-filter-builder-indent-size: var(--ag-inherited-advanced-filter-builder-indent-size, calc( var(--ag-spacing)   *  2  +   var(--ag-icon-size) ));
	--ag-advanced-filter-builder-join-pill-color: var(--ag-inherited-advanced-filter-builder-join-pill-color, #f08e8d);
	--ag-advanced-filter-builder-option-pill-color: var(--ag-inherited-advanced-filter-builder-option-pill-color, #f3c08b);
	--ag-advanced-filter-builder-value-pill-color: var(--ag-inherited-advanced-filter-builder-value-pill-color, #85c0e4);
	--ag-background-color: var(--ag-inherited-background-color, var(--color-surface));
	--ag-border-color: var(--ag-inherited-border-color, var(--color-border));
	--ag-border-radius: var(--ag-inherited-border-radius, var(--radius-100, 4px));
	--ag-border-width: var(--ag-inherited-border-width, 1px);
	--ag-browser-color-scheme: var(--ag-inherited-browser-color-scheme, light);
	--ag-button-active-background-color: var(--ag-inherited-button-active-background-color, var(--ag-button-hover-background-color));
	--ag-button-active-border: var(--ag-inherited-button-active-border, solid var(--ag-border-width) var(--ag-accent-color));
	--ag-button-active-text-color: var(--ag-inherited-button-active-text-color, var(--ag-button-hover-text-color));
	--ag-button-background-color: var(--ag-inherited-button-background-color, var(--ag-background-color));
	--ag-button-border: var(--ag-inherited-button-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-button-border-radius: var(--ag-inherited-button-border-radius, var(--ag-border-radius));
	--ag-button-disabled-background-color: var(--ag-inherited-button-disabled-background-color, var(--ag-input-disabled-background-color));
	--ag-button-disabled-border: var(--ag-inherited-button-disabled-border, var(--ag-input-disabled-border));
	--ag-button-disabled-text-color: var(--ag-inherited-button-disabled-text-color, var(--ag-input-disabled-text-color));
	--ag-button-font-weight: var(--ag-inherited-button-font-weight, normal);
	--ag-button-horizontal-padding: var(--ag-inherited-button-horizontal-padding, calc( var(--ag-spacing)   *  2));
	--ag-button-hover-background-color: var(--ag-inherited-button-hover-background-color, var(--ag-row-hover-color));
	--ag-button-hover-border: var(--ag-inherited-button-hover-border, var(--ag-button-border));
	--ag-button-hover-text-color: var(--ag-inherited-button-hover-text-color, var(--ag-button-text-color));
	--ag-button-text-color: var(--ag-inherited-button-text-color, inherit);
	--ag-button-vertical-padding: var(--ag-inherited-button-vertical-padding, var(--ag-spacing));
	--ag-card-shadow: var(--ag-inherited-card-shadow, 0 1px 4px 1px #00000018);
	--ag-cell-batch-edit-background-color: var(--ag-inherited-cell-batch-edit-background-color, rgba(220 181 139 / 16%));
	--ag-cell-batch-edit-text-color: var(--ag-inherited-cell-batch-edit-text-color, #422f00);
	--ag-cell-editing-border: var(--ag-inherited-cell-editing-border, solid var(--ag-border-width) var(--ag-accent-color));
	--ag-cell-editing-shadow: var(--ag-inherited-cell-editing-shadow, var(--ag-card-shadow));
	--ag-cell-font-family: var(--ag-inherited-cell-font-family, var(--ag-font-family));
	--ag-cell-font-size: var(--ag-inherited-cell-font-size, var(--ag-data-font-size));
	--ag-cell-font-weight: var(--ag-inherited-cell-font-weight, var(--ag-font-weight));
	--ag-cell-horizontal-padding: var(--ag-inherited-cell-horizontal-padding, calc( var(--ag-spacing)   *  2  *   var(--ag-cell-horizontal-padding-scale) ));
	--ag-cell-horizontal-padding-scale: var(--ag-inherited-cell-horizontal-padding-scale, 1);
	--ag-cell-text-color: var(--ag-inherited-cell-text-color, var(--ag-text-color));
	--ag-cell-widget-spacing: var(--ag-inherited-cell-widget-spacing, calc( var(--ag-spacing)   *  1.5));
	--ag-chart-menu-label-color: var(--ag-inherited-chart-menu-label-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 80%));
	--ag-chart-menu-panel-width: var(--ag-inherited-chart-menu-panel-width, 260px);
	--ag-checkbox-border-radius: var(--ag-inherited-checkbox-border-radius, var(--ag-border-radius));
	--ag-checkbox-border-width: var(--ag-inherited-checkbox-border-width, 1px);
	--ag-checkbox-checked-background-color: var(--ag-inherited-checkbox-checked-background-color, var(--ag-accent-color));
	--ag-checkbox-checked-border-color: var(--ag-inherited-checkbox-checked-border-color, var(--ag-checkbox-checked-background-color));
	--ag-checkbox-checked-shape-color: var(--ag-inherited-checkbox-checked-shape-color, var(--ag-background-color));
	--ag-checkbox-checked-shape-image: var(--ag-inherited-checkbox-checked-shape-image, url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%227%22%20fill%3D%22none%22%3E%3Cpath%20stroke%3D%22%23000%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.75%22%20d%3D%22M1%203.5%203.5%206l5-5%22%2F%3E%3C%2Fsvg%3E"));
	--ag-checkbox-indeterminate-background-color: var(--ag-inherited-checkbox-indeterminate-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 30%));
	--ag-checkbox-indeterminate-border-color: var(--ag-inherited-checkbox-indeterminate-border-color, var(--ag-checkbox-indeterminate-background-color));
	--ag-checkbox-indeterminate-shape-color: var(--ag-inherited-checkbox-indeterminate-shape-color, var(--ag-background-color));
	--ag-checkbox-indeterminate-shape-image: var(--ag-inherited-checkbox-indeterminate-shape-image, url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%222%22%20fill%3D%22none%22%3E%3Crect%20width%3D%2210%22%20height%3D%222%22%20fill%3D%22%23000%22%20rx%3D%221%22%2F%3E%3C%2Fsvg%3E"));
	--ag-checkbox-unchecked-background-color: var(--ag-inherited-checkbox-unchecked-background-color, var(--ag-background-color));
	--ag-checkbox-unchecked-border-color: var(--ag-inherited-checkbox-unchecked-border-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 30%));
	--ag-chrome-background-color: var(--ag-inherited-chrome-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 2%));
	--ag-color-picker-color-border-radius: var(--ag-inherited-color-picker-color-border-radius, 4px);
	--ag-color-picker-thumb-border-width: var(--ag-inherited-color-picker-thumb-border-width, 3px);
	--ag-color-picker-thumb-size: var(--ag-inherited-color-picker-thumb-size, 18px);
	--ag-color-picker-track-border-radius: var(--ag-inherited-color-picker-track-border-radius, 12px);
	--ag-color-picker-track-size: var(--ag-inherited-color-picker-track-size, 12px);
	--ag-column-border: var(--ag-inherited-column-border, solid 1px transparent);
	--ag-column-drag-indicator-color: var(--ag-inherited-column-drag-indicator-color, var(--ag-accent-color));
	--ag-column-drag-indicator-width: var(--ag-inherited-column-drag-indicator-width, 2px);
	--ag-column-drop-cell-background-color: var(--ag-inherited-column-drop-cell-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 7.000000000000001%));
	--ag-column-drop-cell-border: var(--ag-inherited-column-drop-cell-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 13%));
	--ag-column-drop-cell-drag-handle-color: var(--ag-inherited-column-drop-cell-drag-handle-color, var(--ag-text-color));
	--ag-column-drop-cell-text-color: var(--ag-inherited-column-drop-cell-text-color, var(--ag-text-color));
	--ag-column-hover-color: var(--ag-inherited-column-hover-color, color-mix(in srgb, transparent, var(--ag-accent-color) 5%));
	--ag-column-panel-apply-button-background-color: var(--ag-inherited-column-panel-apply-button-background-color, var(--ag-accent-color));
	--ag-column-panel-apply-button-color: var(--ag-inherited-column-panel-apply-button-color, var(--ag-background-color));
	--ag-column-select-indent-size: var(--ag-inherited-column-select-indent-size, var(--ag-icon-size));
	--ag-data-background-color: var(--ag-inherited-data-background-color, var(--ag-background-color));
	--ag-data-font-size: var(--ag-inherited-data-font-size, var(--ag-font-size));
	--ag-dialog-border: var(--ag-inherited-dialog-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 20%));
	--ag-dialog-shadow: var(--ag-inherited-dialog-shadow, var(--ag-popup-shadow));
	--ag-drag-and-drop-image-background-color: var(--ag-inherited-drag-and-drop-image-background-color, var(--ag-background-color));
	--ag-drag-and-drop-image-border: var(--ag-inherited-drag-and-drop-image-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-drag-and-drop-image-not-allowed-border: var(--ag-inherited-drag-and-drop-image-not-allowed-border, solid var(--ag-border-width) color-mix(in srgb, var(--ag-drag-and-drop-image-background-color), var(--ag-invalid-color) 50%));
	--ag-drag-and-drop-image-shadow: var(--ag-inherited-drag-and-drop-image-shadow, var(--ag-popup-shadow));
	--ag-drag-handle-color: var(--ag-inherited-drag-handle-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 70%));
	--ag-dropdown-shadow: var(--ag-inherited-dropdown-shadow, var(--ag-card-shadow));
	--ag-filter-panel-apply-button-background-color: var(--ag-inherited-filter-panel-apply-button-background-color, var(--ag-accent-color));
	--ag-filter-panel-apply-button-color: var(--ag-inherited-filter-panel-apply-button-color, var(--ag-background-color));
	--ag-filter-panel-card-subtle-color: var(--ag-inherited-filter-panel-card-subtle-color, color-mix(in srgb, transparent, var(--ag-text-color) 70%));
	--ag-filter-panel-card-subtle-hover-color: var(--ag-inherited-filter-panel-card-subtle-hover-color, var(--ag-text-color));
	--ag-filter-tool-panel-group-indent: var(--ag-inherited-filter-tool-panel-group-indent, var(--ag-spacing));
	--ag-find-active-match-background-color: var(--ag-inherited-find-active-match-background-color, #ffa500);
	--ag-find-active-match-color: var(--ag-inherited-find-active-match-color, var(--ag-foreground-color));
	--ag-find-match-background-color: var(--ag-inherited-find-match-background-color, #ffff00);
	--ag-find-match-color: var(--ag-inherited-find-match-color, var(--ag-foreground-color));
	--ag-focus-error-shadow: var(--ag-inherited-focus-error-shadow, 0px 0px 0px 3px color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 50%));
	--ag-focus-shadow: var(--ag-inherited-focus-shadow, 0px 0px 0px 3px color-mix(in srgb, transparent, var(--ag-accent-color) 50%));
	--ag-font-family: var(--ag-inherited-font-family, inherit);
	--ag-font-size: var(--ag-inherited-font-size, 14px);
	--ag-font-weight: var(--ag-inherited-font-weight, inherit);
	--ag-footer-row-border: var(--ag-inherited-footer-row-border, var(--ag-row-border));
	--ag-foreground-color: var(--ag-inherited-foreground-color, var(--color-text-primary));
	--ag-formula-token-1-background-color: var(--ag-inherited-formula-token-1-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-1-color) 8%));
	--ag-formula-token-1-border: var(--ag-inherited-formula-token-1-border, solid var(--ag-border-width) var(--ag-formula-token-1-color));
	--ag-formula-token-1-color: var(--ag-inherited-formula-token-1-color, #3269c6);
	--ag-formula-token-2-background-color: var(--ag-inherited-formula-token-2-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-2-color) 6%));
	--ag-formula-token-2-border: var(--ag-inherited-formula-token-2-border, solid var(--ag-border-width) var(--ag-formula-token-2-color));
	--ag-formula-token-2-color: var(--ag-inherited-formula-token-2-color, #c0343f);
	--ag-formula-token-3-background-color: var(--ag-inherited-formula-token-3-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-3-color) 8%));
	--ag-formula-token-3-border: var(--ag-inherited-formula-token-3-border, solid var(--ag-border-width) var(--ag-formula-token-3-color));
	--ag-formula-token-3-color: var(--ag-inherited-formula-token-3-color, #8156b8);
	--ag-formula-token-4-background-color: var(--ag-inherited-formula-token-4-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-4-color) 6%));
	--ag-formula-token-4-border: var(--ag-inherited-formula-token-4-border, solid var(--ag-border-width) var(--ag-formula-token-4-color));
	--ag-formula-token-4-color: var(--ag-inherited-formula-token-4-color, #007c1f);
	--ag-formula-token-5-background-color: var(--ag-inherited-formula-token-5-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-5-color) 8%));
	--ag-formula-token-5-border: var(--ag-inherited-formula-token-5-border, solid var(--ag-border-width) var(--ag-formula-token-5-color));
	--ag-formula-token-5-color: var(--ag-inherited-formula-token-5-color, #b03e85);
	--ag-formula-token-6-background-color: var(--ag-inherited-formula-token-6-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-6-color) 6%));
	--ag-formula-token-6-border: var(--ag-inherited-formula-token-6-border, solid var(--ag-border-width) var(--ag-formula-token-6-color));
	--ag-formula-token-6-color: var(--ag-inherited-formula-token-6-color, #b74900);
	--ag-formula-token-7-background-color: var(--ag-inherited-formula-token-7-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-7-color) 8%));
	--ag-formula-token-7-border: var(--ag-inherited-formula-token-7-border, solid var(--ag-border-width) var(--ag-formula-token-7-color));
	--ag-formula-token-7-color: var(--ag-inherited-formula-token-7-color, #247492);
	--ag-full-row-edit-invalid-background-color: var(--ag-inherited-full-row-edit-invalid-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 25%));
	--ag-header-background-color: var(--ag-inherited-header-background-color, var(--color-surface-sunken, transparent));
	--ag-header-cell-background-transition-duration: var(--ag-inherited-header-cell-background-transition-duration, 0.2s);
	--ag-header-cell-hover-background-color: var(--ag-inherited-header-cell-hover-background-color, transparent);
	--ag-header-cell-moving-background-color: var(--ag-inherited-header-cell-moving-background-color, var(--ag-header-cell-hover-background-color));
	--ag-header-column-border: var(--ag-inherited-header-column-border, none);
	--ag-header-column-border-height: var(--ag-inherited-header-column-border-height, 100%);
	--ag-header-column-resize-handle-color: var(--ag-inherited-header-column-resize-handle-color, var(--ag-border-color));
	--ag-header-column-resize-handle-height: var(--ag-inherited-header-column-resize-handle-height, 30%);
	--ag-header-column-resize-handle-width: var(--ag-inherited-header-column-resize-handle-width, 2px);
	--ag-header-font-family: var(--ag-inherited-header-font-family, var(--ag-font-family));
	--ag-header-font-size: var(--ag-inherited-header-font-size, var(--ag-font-size));
	--ag-header-font-weight: var(--ag-inherited-header-font-weight, 600);
	--ag-header-height: var(--ag-inherited-header-height, calc(max( var(--ag-icon-size) ,  var(--ag-data-font-size) )  +   var(--ag-spacing)   *  4  *   var(--ag-header-vertical-padding-scale) ));
	--ag-header-row-border: var(--ag-inherited-header-row-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-header-text-color: var(--ag-inherited-header-text-color, var(--color-text-secondary));
	--ag-header-vertical-padding-scale: var(--ag-inherited-header-vertical-padding-scale, 1);
	--ag-icon-button-active-background-color: var(--ag-inherited-icon-button-active-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 28.000000000000004%));
	--ag-icon-button-active-color: var(--ag-inherited-icon-button-active-color, var(--ag-accent-color));
	--ag-icon-button-active-indicator-color: var(--ag-inherited-icon-button-active-indicator-color, var(--ag-accent-color));
	--ag-icon-button-background-color: var(--ag-inherited-icon-button-background-color, transparent);
	--ag-icon-button-background-spread: var(--ag-inherited-icon-button-background-spread, 4px);
	--ag-icon-button-border-radius: var(--ag-inherited-icon-button-border-radius, 1px);
	--ag-icon-button-color: var(--ag-inherited-icon-button-color, var(--ag-icon-color));
	--ag-icon-button-hover-background-color: var(--ag-inherited-icon-button-hover-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 10%));
	--ag-icon-button-hover-color: var(--ag-inherited-icon-button-hover-color, var(--ag-icon-button-color));
	--ag-icon-color: var(--ag-inherited-icon-color, inherit);
	--ag-icon-size: var(--ag-inherited-icon-size, 16px);
	--ag-input-background-color: var(--ag-inherited-input-background-color, var(--ag-background-color));
	--ag-input-border: var(--ag-inherited-input-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-input-border-radius: var(--ag-inherited-input-border-radius, var(--ag-border-radius));
	--ag-input-disabled-background-color: var(--ag-inherited-input-disabled-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 6%));
	--ag-input-disabled-border: var(--ag-inherited-input-disabled-border, var(--ag-input-border));
	--ag-input-disabled-text-color: var(--ag-inherited-input-disabled-text-color, color-mix(in srgb, transparent, var(--ag-text-color) 50%));
	--ag-input-focus-background-color: var(--ag-inherited-input-focus-background-color, var(--ag-input-background-color));
	--ag-input-focus-border: var(--ag-inherited-input-focus-border, solid var(--ag-border-width) var(--ag-accent-color));
	--ag-input-focus-shadow: var(--ag-inherited-input-focus-shadow, var(--ag-focus-shadow));
	--ag-input-focus-text-color: var(--ag-inherited-input-focus-text-color, var(--ag-input-text-color));
	--ag-input-height: var(--ag-inherited-input-height, calc(max( var(--ag-icon-size) ,  var(--ag-font-size) )  +   var(--ag-spacing)   *  2));
	--ag-input-icon-color: var(--ag-inherited-input-icon-color, var(--ag-input-text-color));
	--ag-input-invalid-background-color: var(--ag-inherited-input-invalid-background-color, var(--ag-input-background-color));
	--ag-input-invalid-border: var(--ag-inherited-input-invalid-border, solid var(--ag-border-width) var(--ag-invalid-color));
	--ag-input-invalid-text-color: var(--ag-inherited-input-invalid-text-color, var(--ag-input-text-color));
	--ag-input-padding-start: var(--ag-inherited-input-padding-start, var(--ag-spacing));
	--ag-input-placeholder-text-color: var(--ag-inherited-input-placeholder-text-color, color-mix(in srgb, transparent, var(--ag-input-text-color) 50%));
	--ag-input-text-color: var(--ag-inherited-input-text-color, var(--ag-text-color));
	--ag-invalid-color: var(--ag-inherited-invalid-color, #e02525);
	--ag-list-item-height: var(--ag-inherited-list-item-height, calc(max( var(--ag-icon-size) ,  var(--ag-data-font-size) )  +   var(--ag-widget-vertical-spacing) ));
	--ag-menu-background-color: var(--ag-inherited-menu-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 3%));
	--ag-menu-border: var(--ag-inherited-menu-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 20%));
	--ag-menu-separator-color: var(--ag-inherited-menu-separator-color, var(--ag-border-color));
	--ag-menu-shadow: var(--ag-inherited-menu-shadow, var(--ag-popup-shadow));
	--ag-menu-text-color: var(--ag-inherited-menu-text-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 95%));
	--ag-modal-overlay-background-color: var(--ag-inherited-modal-overlay-background-color, color-mix(in srgb, transparent, var(--ag-background-color) 66%));
	--ag-note-indicator-color: var(--ag-inherited-note-indicator-color, var(--ag-accent-color));
	--ag-note-indicator-size: var(--ag-inherited-note-indicator-size, 8px);
	--ag-note-popup-background-color: var(--ag-inherited-note-popup-background-color, var(--ag-menu-background-color));
	--ag-note-popup-border: var(--ag-inherited-note-popup-border, var(--ag-dialog-border));
	--ag-note-popup-input-background-color: var(--ag-inherited-note-popup-input-background-color, var(--ag-input-background-color));
	--ag-note-popup-input-text-color: var(--ag-inherited-note-popup-input-text-color, var(--ag-input-text-color));
	--ag-note-popup-padding: var(--ag-inherited-note-popup-padding, calc( var(--ag-spacing)   *  0.5));
	--ag-note-popup-text-color: var(--ag-inherited-note-popup-text-color, color-mix(in srgb, transparent, var(--ag-menu-text-color) 75%));
	--ag-odd-row-background-color: var(--ag-inherited-odd-row-background-color, var(--ag-data-background-color));
	--ag-pagination-panel-height: var(--ag-inherited-pagination-panel-height, calc(max( var(--ag-row-height) , 22px)));
	--ag-panel-background-color: var(--ag-inherited-panel-background-color, var(--ag-background-color));
	--ag-panel-title-bar-background-color: var(--ag-inherited-panel-title-bar-background-color, var(--ag-header-background-color));
	--ag-panel-title-bar-border: var(--ag-inherited-panel-title-bar-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-panel-title-bar-font-family: var(--ag-inherited-panel-title-bar-font-family, var(--ag-header-font-family));
	--ag-panel-title-bar-font-size: var(--ag-inherited-panel-title-bar-font-size, var(--ag-header-font-size));
	--ag-panel-title-bar-font-weight: var(--ag-inherited-panel-title-bar-font-weight, var(--ag-header-font-weight));
	--ag-panel-title-bar-height: var(--ag-inherited-panel-title-bar-height, var(--ag-header-height));
	--ag-panel-title-bar-icon-color: var(--ag-inherited-panel-title-bar-icon-color, var(--ag-header-text-color));
	--ag-panel-title-bar-text-color: var(--ag-inherited-panel-title-bar-text-color, var(--ag-header-text-color));
	--ag-picker-button-background-color: var(--ag-inherited-picker-button-background-color, var(--ag-background-color));
	--ag-picker-button-border: var(--ag-inherited-picker-button-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-picker-button-focus-background-color: var(--ag-inherited-picker-button-focus-background-color, var(--ag-background-color));
	--ag-picker-button-focus-border: var(--ag-inherited-picker-button-focus-border, var(--ag-input-focus-border));
	--ag-picker-list-background-color: var(--ag-inherited-picker-list-background-color, var(--ag-background-color));
	--ag-picker-list-border: var(--ag-inherited-picker-list-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-pinned-column-border: var(--ag-inherited-pinned-column-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-pinned-row-background-color: var(--ag-inherited-pinned-row-background-color, var(--ag-data-background-color));
	--ag-pinned-row-border: var(--ag-inherited-pinned-row-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-pinned-row-font-weight: var(--ag-inherited-pinned-row-font-weight, 600);
	--ag-pinned-row-text-color: var(--ag-inherited-pinned-row-text-color, var(--ag-text-color));
	--ag-pinned-source-row-background-color: var(--ag-inherited-pinned-source-row-background-color, var(--ag-data-background-color));
	--ag-pinned-source-row-font-weight: var(--ag-inherited-pinned-source-row-font-weight, 600);
	--ag-pinned-source-row-text-color: var(--ag-inherited-pinned-source-row-text-color, var(--ag-text-color));
	--ag-popup-shadow: var(--ag-inherited-popup-shadow, 0 0 16px #00000026);
	--ag-radio-checked-shape-image: var(--ag-inherited-radio-checked-shape-image, url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%226%22%20height%3D%226%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E"));
	--ag-range-header-highlight-color: var(--ag-inherited-range-header-highlight-color, color-mix(in srgb, var(--ag-header-background-color), var(--ag-foreground-color) 8%));
	--ag-range-selection-background-color: var(--ag-inherited-range-selection-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 20%));
	--ag-range-selection-border-color: var(--ag-inherited-range-selection-border-color, var(--ag-accent-color));
	--ag-range-selection-border-style: var(--ag-inherited-range-selection-border-style, solid);
	--ag-range-selection-chart-background-color: var(--ag-inherited-range-selection-chart-background-color, #0058FF1A);
	--ag-range-selection-chart-category-background-color: var(--ag-inherited-range-selection-chart-category-background-color, #00FF841A);
	--ag-range-selection-highlight-color: var(--ag-inherited-range-selection-highlight-color, color-mix(in srgb, transparent, var(--ag-accent-color) 50%));
	--ag-row-batch-edit-background-color: var(--ag-inherited-row-batch-edit-background-color, var(--ag-cell-batch-edit-background-color));
	--ag-row-batch-edit-text-color: var(--ag-inherited-row-batch-edit-text-color, var(--ag-cell-batch-edit-text-color));
	--ag-row-border: var(--ag-inherited-row-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-row-drag-indicator-color: var(--ag-inherited-row-drag-indicator-color, var(--ag-range-selection-border-color));
	--ag-row-drag-indicator-width: var(--ag-inherited-row-drag-indicator-width, 2px);
	--ag-row-group-indent-size: var(--ag-inherited-row-group-indent-size, calc( var(--ag-cell-widget-spacing)   +   var(--ag-icon-size) ));
	--ag-row-height: var(--ag-inherited-row-height, calc(max( var(--ag-icon-size) ,  var(--ag-cell-font-size) )  +   var(--ag-spacing)   *  3.25  *   var(--ag-row-vertical-padding-scale) ));
	--ag-row-hover-color: var(--ag-inherited-row-hover-color, var(--color-surface-subtle, var(--color-primary-subtle)));
	--ag-row-loading-skeleton-effect-color: var(--ag-inherited-row-loading-skeleton-effect-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 15%));
	--ag-row-numbers-selected-color: var(--ag-inherited-row-numbers-selected-color, color-mix(in srgb, transparent, var(--ag-accent-color) 50%));
	--ag-row-vertical-padding-scale: var(--ag-inherited-row-vertical-padding-scale, 1);
	--ag-select-cell-background-color: var(--ag-inherited-select-cell-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 7.000000000000001%));
	--ag-select-cell-border: var(--ag-inherited-select-cell-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 13%));
	--ag-selected-row-background-color: var(--ag-inherited-selected-row-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 12%));
	--ag-set-filter-indent-size: var(--ag-inherited-set-filter-indent-size, var(--ag-icon-size));
	--ag-side-bar-background-color: var(--ag-inherited-side-bar-background-color, var(--ag-chrome-background-color));
	--ag-side-bar-panel-animation-duration: var(--ag-inherited-side-bar-panel-animation-duration, 0s);
	--ag-side-bar-panel-width: var(--ag-inherited-side-bar-panel-width, 250px);
	--ag-side-button-background-color: var(--ag-inherited-side-button-background-color, transparent);
	--ag-side-button-bar-background-color: var(--ag-inherited-side-button-bar-background-color, var(--ag-side-bar-background-color));
	--ag-side-button-bar-top-padding: var(--ag-inherited-side-button-bar-top-padding, 0px);
	--ag-side-button-border: var(--ag-inherited-side-button-border, solid 1px transparent);
	--ag-side-button-hover-background-color: var(--ag-inherited-side-button-hover-background-color, var(--ag-side-button-background-color));
	--ag-side-button-hover-text-color: var(--ag-inherited-side-button-hover-text-color, var(--ag-side-button-text-color));
	--ag-side-button-left-padding: var(--ag-inherited-side-button-left-padding, var(--ag-spacing));
	--ag-side-button-right-padding: var(--ag-inherited-side-button-right-padding, var(--ag-spacing));
	--ag-side-button-selected-background-color: var(--ag-inherited-side-button-selected-background-color, var(--ag-background-color));
	--ag-side-button-selected-border: var(--ag-inherited-side-button-selected-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-side-button-selected-text-color: var(--ag-inherited-side-button-selected-text-color, var(--ag-side-button-text-color));
	--ag-side-button-selected-underline-color: var(--ag-inherited-side-button-selected-underline-color, transparent);
	--ag-side-button-selected-underline-transition-duration: var(--ag-inherited-side-button-selected-underline-transition-duration, 0s);
	--ag-side-button-selected-underline-width: var(--ag-inherited-side-button-selected-underline-width, 2px);
	--ag-side-button-text-color: var(--ag-inherited-side-button-text-color, var(--ag-text-color));
	--ag-side-button-vertical-padding: var(--ag-inherited-side-button-vertical-padding, calc( var(--ag-spacing)   *  3));
	--ag-side-panel-border: var(--ag-inherited-side-panel-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-spacing: var(--ag-inherited-spacing, 8px);
	--ag-status-bar-label-color: var(--ag-inherited-status-bar-label-color, var(--ag-foreground-color));
	--ag-status-bar-label-font-weight: var(--ag-inherited-status-bar-label-font-weight, 500);
	--ag-status-bar-value-color: var(--ag-inherited-status-bar-value-color, var(--ag-foreground-color));
	--ag-status-bar-value-font-weight: var(--ag-inherited-status-bar-value-font-weight, 500);
	--ag-subtle-text-color: var(--ag-inherited-subtle-text-color, color-mix(in srgb, transparent, var(--ag-text-color) 50%));
	--ag-tab-background-color: var(--ag-inherited-tab-background-color, transparent);
	--ag-tab-bar-background-color: var(--ag-inherited-tab-bar-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 5%));
	--ag-tab-bar-border: var(--ag-inherited-tab-bar-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-tab-bar-horizontal-padding: var(--ag-inherited-tab-bar-horizontal-padding, 0px);
	--ag-tab-bar-top-padding: var(--ag-inherited-tab-bar-top-padding, 0px);
	--ag-tab-bottom-padding: var(--ag-inherited-tab-bottom-padding, var(--ag-spacing));
	--ag-tab-horizontal-padding: var(--ag-inherited-tab-horizontal-padding, var(--ag-spacing));
	--ag-tab-hover-background-color: var(--ag-inherited-tab-hover-background-color, var(--ag-tab-background-color));
	--ag-tab-hover-text-color: var(--ag-inherited-tab-hover-text-color, var(--ag-text-color));
	--ag-tab-selected-background-color: var(--ag-inherited-tab-selected-background-color, var(--ag-background-color));
	--ag-tab-selected-border-color: var(--ag-inherited-tab-selected-border-color, var(--ag-border-color));
	--ag-tab-selected-border-width: var(--ag-inherited-tab-selected-border-width, var(--ag-border-width));
	--ag-tab-selected-text-color: var(--ag-inherited-tab-selected-text-color, var(--ag-text-color));
	--ag-tab-selected-underline-color: var(--ag-inherited-tab-selected-underline-color, transparent);
	--ag-tab-selected-underline-transition-duration: var(--ag-inherited-tab-selected-underline-transition-duration, 0s);
	--ag-tab-selected-underline-width: var(--ag-inherited-tab-selected-underline-width, 0px);
	--ag-tab-spacing: var(--ag-inherited-tab-spacing, 0);
	--ag-tab-text-color: var(--ag-inherited-tab-text-color, color-mix(in srgb, transparent, var(--ag-text-color) 70%));
	--ag-tab-top-padding: var(--ag-inherited-tab-top-padding, var(--ag-spacing));
	--ag-text-color: var(--ag-inherited-text-color, var(--ag-foreground-color));
	--ag-toggle-button-height: var(--ag-inherited-toggle-button-height, 18px);
	--ag-toggle-button-off-background-color: var(--ag-inherited-toggle-button-off-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 30%));
	--ag-toggle-button-on-background-color: var(--ag-inherited-toggle-button-on-background-color, var(--ag-accent-color));
	--ag-toggle-button-switch-background-color: var(--ag-inherited-toggle-button-switch-background-color, var(--ag-background-color));
	--ag-toggle-button-switch-inset: var(--ag-inherited-toggle-button-switch-inset, 2px);
	--ag-toggle-button-width: var(--ag-inherited-toggle-button-width, 28px);
	--ag-tool-panel-separator-border: var(--ag-inherited-tool-panel-separator-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-toolbar-background-color: var(--ag-inherited-toolbar-background-color, var(--ag-header-background-color));
	--ag-toolbar-separator-border: var(--ag-inherited-toolbar-separator-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-toolbar-text-color: var(--ag-inherited-toolbar-text-color, var(--ag-header-text-color));
	--ag-tooltip-background-color: var(--ag-inherited-tooltip-background-color, var(--ag-chrome-background-color));
	--ag-tooltip-border: var(--ag-inherited-tooltip-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-tooltip-error-background-color: var(--ag-inherited-tooltip-error-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 10%));
	--ag-tooltip-error-border: var(--ag-inherited-tooltip-error-border, solid var(--ag-border-width) color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 25%));
	--ag-tooltip-error-text-color: var(--ag-inherited-tooltip-error-text-color, var(--ag-invalid-color));
	--ag-tooltip-text-color: var(--ag-inherited-tooltip-text-color, var(--ag-text-color));
	--ag-value-change-delta-down-color: var(--ag-inherited-value-change-delta-down-color, #e53935);
	--ag-value-change-delta-up-color: var(--ag-inherited-value-change-delta-up-color, #43a047);
	--ag-value-change-value-highlight-background-color: var(--ag-inherited-value-change-value-highlight-background-color, #16a08580);
	--ag-widget-container-horizontal-padding: var(--ag-inherited-widget-container-horizontal-padding, calc( var(--ag-spacing)   *  1.5));
	--ag-widget-container-vertical-padding: var(--ag-inherited-widget-container-vertical-padding, calc( var(--ag-spacing)   *  1.5));
	--ag-widget-horizontal-spacing: var(--ag-inherited-widget-horizontal-spacing, calc( var(--ag-spacing)   *  1.5));
	--ag-widget-vertical-spacing: var(--ag-inherited-widget-vertical-spacing, var(--ag-spacing));
	--ag-wrapper-background-color: var(--ag-inherited-wrapper-background-color, var(--ag-background-color));
	--ag-wrapper-border: var(--ag-inherited-wrapper-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-wrapper-border-radius: var(--ag-inherited-wrapper-border-radius, 0px);
:where([data-ag-theme-mode="light"]) & {
	--ag-browser-color-scheme: var(--ag-inherited-browser-color-scheme, light);
	--ag-chrome-background-color: var(--ag-inherited-chrome-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 2%));
}
:where([data-ag-theme-mode="dark"]) & {
	--ag-advanced-filter-builder-column-pill-color: var(--ag-inherited-advanced-filter-builder-column-pill-color, #355f2d);
	--ag-advanced-filter-builder-join-pill-color: var(--ag-inherited-advanced-filter-builder-join-pill-color, #7a3a37);
	--ag-advanced-filter-builder-option-pill-color: var(--ag-inherited-advanced-filter-builder-option-pill-color, #5a3168);
	--ag-advanced-filter-builder-value-pill-color: var(--ag-inherited-advanced-filter-builder-value-pill-color, #374c86);
	--ag-browser-color-scheme: var(--ag-inherited-browser-color-scheme, dark);
	--ag-card-shadow: var(--ag-inherited-card-shadow, 0 1px 4px 1px #000A);
	--ag-cell-batch-edit-background-color: var(--ag-inherited-cell-batch-edit-background-color, rgba(220 181 139 / 16%));
	--ag-cell-batch-edit-text-color: var(--ag-inherited-cell-batch-edit-text-color, #f3d0b3);
	--ag-checkbox-unchecked-border-color: var(--ag-inherited-checkbox-unchecked-border-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 40%));
	--ag-chrome-background-color: var(--ag-inherited-chrome-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 5%));
	--ag-column-panel-apply-button-color: var(--ag-inherited-column-panel-apply-button-color, var(--ag-foreground-color));
	--ag-filter-panel-apply-button-color: var(--ag-inherited-filter-panel-apply-button-color, var(--ag-foreground-color));
	--ag-find-active-match-color: var(--ag-inherited-find-active-match-color, var(--ag-background-color));
	--ag-find-match-color: var(--ag-inherited-find-match-color, var(--ag-background-color));
	--ag-formula-token-1-color: var(--ag-inherited-formula-token-1-color, #4da3e5);
	--ag-formula-token-2-color: var(--ag-inherited-formula-token-2-color, #f55864);
	--ag-formula-token-3-color: var(--ag-inherited-formula-token-3-color, #b688f2);
	--ag-formula-token-4-color: var(--ag-inherited-formula-token-4-color, #24bb4a);
	--ag-formula-token-5-color: var(--ag-inherited-formula-token-5-color, #e772ba);
	--ag-formula-token-6-color: var(--ag-inherited-formula-token-6-color, #f69b5f);
	--ag-formula-token-7-color: var(--ag-inherited-formula-token-7-color, #a3e6ff);
	--ag-menu-background-color: var(--ag-inherited-menu-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 10%));
	--ag-popup-shadow: var(--ag-inherited-popup-shadow, 0 0px 20px #000A);
	--ag-row-batch-edit-background-color: var(--ag-inherited-row-batch-edit-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 10%));
	--ag-row-batch-edit-text-color: var(--ag-inherited-row-batch-edit-text-color, var(--ag-cell-batch-edit-text-color));
	--ag-selected-row-background-color: var(--ag-inherited-selected-row-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 20%));
	--ag-toggle-button-off-background-color: var(--ag-inherited-toggle-button-off-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 40%));
}
:where([data-ag-theme-mode="dark-blue"]) & {
	--ag-advanced-filter-builder-column-pill-color: var(--ag-inherited-advanced-filter-builder-column-pill-color, #355f2d);
	--ag-advanced-filter-builder-join-pill-color: var(--ag-inherited-advanced-filter-builder-join-pill-color, #7a3a37);
	--ag-advanced-filter-builder-option-pill-color: var(--ag-inherited-advanced-filter-builder-option-pill-color, #5a3168);
	--ag-advanced-filter-builder-value-pill-color: var(--ag-inherited-advanced-filter-builder-value-pill-color, #374c86);
	--ag-browser-color-scheme: var(--ag-inherited-browser-color-scheme, dark);
	--ag-card-shadow: var(--ag-inherited-card-shadow, 0 1px 4px 1px #000A);
	--ag-cell-batch-edit-background-color: var(--ag-inherited-cell-batch-edit-background-color, rgba(220 181 139 / 16%));
	--ag-cell-batch-edit-text-color: var(--ag-inherited-cell-batch-edit-text-color, #f3d0b3);
	--ag-checkbox-unchecked-border-color: var(--ag-inherited-checkbox-unchecked-border-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 40%));
	--ag-chrome-background-color: var(--ag-inherited-chrome-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 5%));
	--ag-column-panel-apply-button-color: var(--ag-inherited-column-panel-apply-button-color, var(--ag-foreground-color));
	--ag-filter-panel-apply-button-color: var(--ag-inherited-filter-panel-apply-button-color, var(--ag-foreground-color));
	--ag-find-active-match-color: var(--ag-inherited-find-active-match-color, var(--ag-background-color));
	--ag-find-match-color: var(--ag-inherited-find-match-color, var(--ag-background-color));
	--ag-formula-token-1-color: var(--ag-inherited-formula-token-1-color, #4da3e5);
	--ag-formula-token-2-color: var(--ag-inherited-formula-token-2-color, #f55864);
	--ag-formula-token-3-color: var(--ag-inherited-formula-token-3-color, #b688f2);
	--ag-formula-token-4-color: var(--ag-inherited-formula-token-4-color, #24bb4a);
	--ag-formula-token-5-color: var(--ag-inherited-formula-token-5-color, #e772ba);
	--ag-formula-token-6-color: var(--ag-inherited-formula-token-6-color, #f69b5f);
	--ag-formula-token-7-color: var(--ag-inherited-formula-token-7-color, #a3e6ff);
	--ag-menu-background-color: var(--ag-inherited-menu-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 10%));
	--ag-popup-shadow: var(--ag-inherited-popup-shadow, 0 0px 20px #000A);
	--ag-row-batch-edit-background-color: var(--ag-inherited-row-batch-edit-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 10%));
	--ag-row-batch-edit-text-color: var(--ag-inherited-row-batch-edit-text-color, var(--ag-cell-batch-edit-text-color));
	--ag-selected-row-background-color: var(--ag-inherited-selected-row-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 20%));
	--ag-toggle-button-off-background-color: var(--ag-inherited-toggle-button-off-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 40%));
}
.ag-paging-panel{align-items:center;border-top:var(--ag-footer-row-border);display:flex;flex-wrap:wrap-reverse;gap:calc(var(--ag-spacing)*4);justify-content:flex-end;min-height:var(--ag-pagination-panel-height);padding:calc(var(--ag-spacing)*.5) var(--ag-cell-horizontal-padding);row-gap:calc(var(--ag-spacing)*.5);@container (width < 600px){justify-content:center}
.cbf-app-bar--admin{--app-bar-pad-y: var(--spacing-300)}
.cbf-app-bar--admin .esa-app-bar__row{display:grid;grid-template-columns:1fr minmax(0,380px) 1fr}
.cbf-app-bar--admin .esa-app-bar__start{justify-self:start}
.cbf-nav-collapsible{display:contents}
.cbf-app-bar--admin .esa-app-bar__main{justify-content:center}
.cbf-omni-trigger{display:flex;align-items:center;gap:var(--spacing-200);width:380px;max-width:100%;padding:5px var(--spacing-200) 5px var(--spacing-300);background:#ffffff1a;border:1px solid rgba(255,255,255,.22);border-radius:999px;color:#ffffffbf;transition:background .12s,border-color .12s}
.cbf-app-bar--admin .cbf-omni-trigger{min-width:0}
.cbf-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;color:inherit}
.cbf-omni-trigger__ph{flex:1;min-width:0;text-align:left;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cbf-omni-trigger__kbd{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;font-family:var(--font-sans);font-size:13px;font-weight:var(--font-weight-medium);color:#ffffffd9;background:#ffffff1f;border:1px solid rgba(255,255,255,.25);border-radius:4px}
.cbf-app-bar--admin .esa-app-bar__end{justify-self:end}
.esa-nav-dropdown{position:relative}
.esa-nav-dropdown .esa-icon-link>.esa-icon:last-child{transition:transform .15s ease}
.cbf-nav-burger{display:none}
.cbf-logo{display:inline-flex;align-items:center;gap:var(--spacing-300, 12px);flex:none;color:inherit;text-decoration:none}
.cbf-logo__mark{width:48px;height:48px;flex:none}
.cbf-logo__type{height:40px;width:auto}
.cbf-nav-actions{display:inline-flex;align-items:center;gap:var(--spacing-600)}
.cbf-nav-link{display:inline-flex;align-items:center;gap:6px;color:inherit;background:none;border:0;font-size:16px;font-weight:var(--font-weight-medium);white-space:nowrap}
.cbf-nav-link .cbf-icon{display:inline-flex;align-items:center}
.cbf-nav-link--user{position:relative;padding-left:var(--spacing-500)}
.cbf-nav-link--user:before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);width:1px;height:1.1em;background:#ffffff40}
.cbf-omni{position:fixed;inset:0;z-index:80}
.cbf-omni[hidden]{display:none}
.esa-link-column{color:inherit}
.esa-link-column__head{display:block;margin:0 0 var(--spacing-100, 4px);font-size:var(--link-column-heading-font-size, var(--type-size-200, 1rem));font-weight:var(--font-weight-medium, 500);color:inherit;text-decoration:none}
.esa-link-column__rule{height:1px;border:0;margin:0 0 var(--spacing-200, 8px);background:var(--link-column-rule-color, color-mix(in srgb, currentColor 40%, transparent))}
.esa-link-column__list{list-style:none;margin:0;padding:0}
.esa-link-column__list li{font-size:var(--link-column-item-font-size, var(--type-size-150, .875rem));line-height:22px;margin-bottom:var(--spacing-100, 4px)}
.esa-link-column__list a{color:inherit;text-decoration:none}
:where(.ag-delay-render){.ag-cell,.ag-header-cell,.ag-header-group-cell,.ag-row,.ag-spanned-cell-wrapper{visibility:hidden}
.ag-cell,.ag-header-cell,.ag-header-group-cell,.ag-row,.ag-spanned-cell-wrapper{visibility:hidden}
*,*:before,*:after{box-sizing:border-box}
body{margin:0;font-family:var(--font-sans, system-ui, sans-serif);color:var(--color-text-primary, #171717);background:var(--color-surface, #fff);-webkit-font-smoothing:antialiased}
button{font-family:inherit;cursor:pointer;background:none;border:0}
a{color:var(--color-text-link, #1e5386);text-decoration:none}
img{display:block;max-width:100%}
:where(.ag-theme-buttonStyle-1) {
:where(.ag-button){background:none;border:none;color:inherit;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;margin:0;padding:0;text-indent:inherit;text-shadow:inherit;text-transform:inherit;word-spacing:inherit;&:disabled{cursor:default}
&:focus-visible{box-shadow:var(--ag-focus-shadow);outline:none}
.ag-standard-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--ag-button-background-color);border:var(--ag-button-border);border-radius:var(--ag-button-border-radius);color:var(--ag-button-text-color);cursor:pointer;font-weight:var(--ag-button-font-weight);padding:var(--ag-button-vertical-padding) var(--ag-button-horizontal-padding);&:active{background-color:var(--ag-button-active-background-color);border:var(--ag-button-active-border);color:var(--ag-button-active-text-color)}
&:disabled{background-color:var(--ag-button-disabled-background-color);border:var(--ag-button-disabled-border);color:var(--ag-button-disabled-text-color)}
.ag-standard-button:hover{background-color:var(--ag-button-hover-background-color);border:var(--ag-button-hover-border);color:var(--ag-button-hover-text-color)}
:where(.ag-theme-columnDropStyle-2) {
.ag-column-drop-vertical-empty-message{align-items:center;border:dashed var(--ag-border-width);border-color:var(--ag-border-color);display:flex;inset:0;justify-content:center;margin:calc(var(--ag-spacing)*1.5) calc(var(--ag-spacing)*2);overflow:hidden;padding:calc(var(--ag-spacing)*2);position:absolute}
.esa-icon{--_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));display:inline-flex;align-items:center;justify-content:center;width:var(--_icon-size);height:var(--_icon-size);line-height:1;color:inherit}
.esa-icon--xs{--_icon-size: var(--icon-size-xs, 14px)}
.esa-icon svg{display:block;width:var(--_icon-size);height:var(--_icon-size)}
.esa-icon--sm{--_icon-size: var(--icon-size-sm, var(--icon-size-small, 16px))}
.esa-icon-button{--_ib-size: var(--form-height-md, 40px);--_ib-bg-hover: var(--icon-button-bg-hover, color-mix(in srgb, currentColor 14%, transparent));display:inline-flex;align-items:center;justify-content:center;width:var(--_ib-size);height:var(--_ib-size);padding:0;border:0;border-radius:var(--radius-200, 8px);background:transparent;color:inherit;cursor:pointer;transition:background var(--transition-fast, .15s ease);-webkit-appearance:none;appearance:none}
.esa-icon-button--xs{--_ib-size: var(--form-height-xs, 28px)}
.esa-icon--md{--_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px))}
:host { all: initial; }
.host-root { position: fixed; inset: 0; pointer-events: none; z-index: 2147483000;
    font-family: system-ui, sans-serif; }
.host-root > * { pointer-events: auto; }
.launch { position: fixed; bottom: 22px; left: 22px; display: inline-flex; align-items: center; gap: 9px;
    padding: 13px 19px; border-radius: 999px; color: #fff; cursor: pointer; font-size: 15px; font-weight: 600;
    letter-spacing: .01em; border: 1px solid #3d6fd6;
    background: linear-gradient(180deg, #1f6feb, #1551c4);
    box-shadow: 0 10px 28px -8px rgba(31,111,235,.65), inset 0 1px 0 rgba(255,255,255,.18);
    transition: transform .15s ease, box-shadow .15s ease, filter .15s ease; }
.launch svg { flex: none; }
.panel { position: fixed; top: 18px; right: 18px; bottom: 18px; width: min(720px, 94vw);
    display: flex; flex-direction: column; color: #ffffff; border-radius: 16px;
    background: linear-gradient(155deg, rgba(26,31,40,.74), rgba(11,15,21,.86));
    backdrop-filter: blur(26px) saturate(150%); -webkit-backdrop-filter: blur(26px) saturate(150%);
    border: 1px solid rgba(255,255,255,.15);
    box-shadow: 0 28px 70px -18px rgba(0,0,0,.62), inset 0 1px 0 rgba(255,255,255,.10);
    font-size: 12.5px; overflow: hidden;
    /* slide in from the right */
    transform: translateX(calc(100% + 32px)); opacity: 0; visibility: hidden;
    transition: transform .3s cubic-bezier(.4,0,.2,1), opacity .22s ease, visibility 0s linear .3s; }
.head { display: flex; align-items: center; gap: 8px; padding: 13px 16px; border-bottom: 1px solid rgba(255,255,255,.09); }
.head strong { font-size: 14px; }
.head .sub { flex: 1; color: #ccd5e0; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.x { border: 0; background: none; color: #c4cdd8; font-size: 20px; line-height: 1; cursor: pointer; }
.picker { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.09); }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { padding: 5px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.04);
    color: #eef2f6; font: inherit; font-size: 12.5px; cursor: pointer; white-space: nowrap;
    transition: border-color .12s ease, background .12s ease, color .12s ease; }
.chip.on { background: rgba(31,111,235,.28); border-color: #4493f8; color: #fff; font-weight: 600; }
.tabs { display: flex; gap: 4px; padding: 9px 14px; border-bottom: 1px solid rgba(255,255,255,.09); }
.tabs button { padding: 5px 12px; border: 0; border-radius: 6px; background: none; color: #ccd5e0;
    font: inherit; font-size: 12.5px; cursor: pointer; }
.tabs button.on { background: rgba(255,255,255,.12); color: #fff; }
.body { overflow: auto; padding: 13px 16px; flex: 1; }
.hint { margin: 0; color: #c4cdd8; line-height: 1.6; }
.footer { position: relative; display: flex; justify-content: flex-end; gap: 8px; padding: 11px 16px;
    border-top: 1px solid rgba(255,255,255,.10); background: rgba(0,0,0,.18); }
[hidden] { display: none !important; }
.cpreview { position: absolute; left: 16px; right: 16px; bottom: calc(100% + 8px);
    background: rgba(13,17,23,.96); border: 1px solid rgba(255,255,255,.16); border-radius: 12px;
    box-shadow: 0 18px 50px -14px rgba(0,0,0,.7); padding: 12px 14px; max-height: 50vh; overflow: auto; }
.copy { color: #eef2f6; border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.05); }
.footer button { flex: none; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    padding: 8px 14px; border-radius: 8px; font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer; }
.claude { color: #fff; border: 1px solid #d97757;
    background: linear-gradient(180deg, #e0805f, #c25e3c);
    box-shadow: 0 6px 18px -6px rgba(217,119,87,.6), inset 0 1px 0 rgba(255,255,255,.2); }
.claude svg { flex: none; }
.cbf-app-bar--admin{--app-bar-gap: var(--spacing-650)}
.esa-app-bar{--_bar-gap: var(--app-bar-gap, var(--spacing-600, 32px));--_bar-pad-x: var(--app-bar-pad-x, var(--spacing-600, 32px));--_bar-pad-y: var(--app-bar-pad-y, var(--spacing-400, 16px));display:block;width:100%;background:var(--app-bar-bg, var(--color-surface, #fff));color:var(--app-bar-text, var(--color-text-primary, #171717))}
.esa-app-bar--brand-strong{background:var(--app-bar-brand-strong-bg, var(--color-surface-inverse, #171717));color:var(--app-bar-brand-strong-text, var(--color-text-inverse, #fff))}
.esa-app-bar__row{display:flex;align-items:center;gap:var(--_bar-gap);padding:var(--_bar-pad-y) var(--_bar-pad-x)}
.esa-app-bar__start,.esa-app-bar__main,.esa-app-bar__end{display:inline-flex;align-items:center;gap:var(--_bar-gap)}
.esa-app-bar__start{flex:none}
.esa-icon-link{--_il-font: var(--icon-link-font-size-md, 1rem);display:inline-flex;align-items:center;gap:var(--icon-link-gap, var(--spacing-150, 6px));padding:0;margin:0;border:0;background:none;color:inherit;font-family:var(--font-sans, system-ui, sans-serif);font-size:var(--_il-font);font-weight:var(--font-weight-medium, 500);line-height:1;text-decoration:none;cursor:pointer;white-space:nowrap}
.esa-icon-link--sm{--_il-font: var(--icon-link-font-size-sm, .875rem)}
.esa-icon-link--medium{font-weight:var(--font-weight-medium, 500)}
.esa-icon-link__label{display:inline-block}
.esa-app-bar__main{flex:1 1 auto}
.esa-app-bar__end{flex:none;margin-left:auto}
summary.esa-icon-link{list-style:none}
.cbf-app-bar--header{--app-bar-gap: var(--spacing-800)}
.esa-app-bar--brand{background:var(--app-bar-brand-bg, var(--color-primary, #43608a));color:var(--app-bar-brand-text, var(--color-text-inverse, #fff))}
.stack{--gap: var(--spacing-400, 1rem);display:flex;flex-direction:column;gap:var(--gap)}
[data-gap=lg]{--gap: var(--spacing-500, 1.5rem)}
:where(h1,h2,h3,h4,h5,h6,p,figure,blockquote,dl,dd,ul,ol,pre){margin:0}
.cbf-app-panel{display:flex;flex-direction:column;min-height:80vh;border:1px solid var(--color-border);border-radius:var(--radius-100);overflow:hidden;background:var(--color-surface);box-shadow:0 1px 3px color-mix(in srgb,var(--color-surface-inverse) 8%,transparent)}
.cbf-app-panel__crumb{background:var(--color-gold-50);border-bottom:1px solid var(--color-border);padding:var(--spacing-400) var(--spacing-600)}
.esa-breadcrumbs{--_crumb-font-size: var(--type-size-200, .875rem);--_crumb-link-color: var(--breadcrumbs-link-color, #43608a);--_crumb-link-hover: var(--breadcrumbs-link-hover, #39506f);--_crumb-current-color: var(--color-text-primary, #171717);--_crumb-separator-color: var(--breadcrumbs-separator-color, #737373);--_crumb-gap: var(--spacing-200, 8px);display:block}
.cbf-app-panel__crumb .esa-breadcrumbs{--breadcrumbs-link-color: var(--color-text-secondary);--breadcrumbs-link-hover: var(--color-primary)}
.esa-breadcrumbs__list{display:flex;align-items:center;flex-wrap:wrap;gap:var(--_crumb-gap);list-style:none;margin:0;padding:0;font-size:var(--_crumb-font-size)}
.esa-breadcrumbs__item{display:flex;align-items:center;gap:var(--_crumb-gap)}
.esa-breadcrumbs__link{display:inline-flex;align-items:center;gap:var(--spacing-100, 4px);color:var(--_crumb-link-color);text-decoration:none}
.esa-breadcrumbs__icon{display:inline-flex;align-items:center}
.esa-breadcrumbs__separator{flex-shrink:0;color:var(--_crumb-separator-color)}
.esa-breadcrumbs__current{display:inline-flex;align-items:center;gap:var(--spacing-100, 4px);color:var(--_crumb-current-color);font-weight:var(--font-weight-medium, 500)}
.cbf-app-panel__body{flex:1}
.cbf-app-panel__content{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--spacing-400);padding:var(--spacing-600)}
.esa-page-header{--_ph-title-color: var(--page-header-title-color, var(--color-text-primary, #171717));--_ph-title-font: var(--page-header-title-font, var(--font-display, var(--font-sans, "DM Sans", sans-serif)));--_ph-title-size: var(--page-header-title-size, var(--type-size-600, 1.875rem));--_ph-title-weight: var(--page-header-title-weight, var(--font-weight-semibold, 550));--_ph-lede-color: var(--page-header-lede-color, var(--color-text-secondary, #525252));--_ph-lede-size: var(--page-header-lede-size, var(--type-size-300, 1.125rem));--_ph-eyebrow-color: var(--page-header-eyebrow-color, var(--color-text-secondary, #525252));--_ph-eyebrow-size: var(--page-header-eyebrow-size, var(--type-size-200, .9375rem));--_ph-gap: var(--page-header-gap, var(--spacing-200, .5rem));--_ph-bar-gap: var(--page-header-bar-gap, var(--spacing-500, 1.5rem));--_ph-crumb-gap: var(--page-header-breadcrumbs-gap, var(--spacing-300, .75rem));display:block;background:transparent}
.esa-page-header__bar{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--_ph-bar-gap);flex-wrap:wrap}
.esa-page-header__titles{display:flex;flex-direction:column;gap:var(--_ph-gap);min-width:0}
.esa-page-header__eyebrow{display:flex;align-items:center;gap:var(--spacing-100, .25rem);margin:0;font-size:var(--_ph-eyebrow-size);font-weight:var(--font-weight-medium, 500);line-height:var(--line-height-normal, 1.5);color:var(--_ph-eyebrow-color)}
.esa-page-header__title{margin:0;font-family:var(--_ph-title-font);font-size:var(--_ph-title-size);font-weight:var(--_ph-title-weight);line-height:var(--line-height-tight, 1.3);letter-spacing:var(--letter-spacing-tight, -.01em);color:var(--_ph-title-color)}
.esa-page-header__lede{margin:0;font-size:var(--_ph-lede-size);font-weight:var(--font-weight-regular, 350);line-height:var(--line-height-relaxed, 1.8);color:var(--_ph-lede-color);max-width:70ch}
[data-gap=sm]{--gap: var(--spacing-300, .75rem)}
.repel{--gap: var(--spacing-400, 1rem);--align: center;display:flex;flex-wrap:wrap;gap:var(--gap);align-items:var(--align);justify-content:space-between}
.type-section-title{font-family:var(--font-display, var(--font-sans));font-size:var(--type-size-500);font-weight:var(--font-weight-semibold);line-height:var(--line-height-tight);letter-spacing:var(--letter-spacing-tight)}
.type-caption{font-size:var(--type-size-100);font-weight:var(--font-weight-regular);line-height:var(--line-height-normal);letter-spacing:var(--letter-spacing-normal)}
.cluster{--gap: var(--spacing-300, .75rem);--align: center;--justify: flex-start;display:flex;flex-wrap:wrap;gap:var(--gap);align-items:var(--align);justify-content:var(--justify)}
[data-gap=xl]{--gap: var(--spacing-600, 2rem)}
.esa-stat{--_stat-value-color: var(--stat-value-color, var(--color-text-primary, #171717));--_stat-value-font: var(--stat-value-font, var(--font-display, var(--font-sans, "DM Sans", sans-serif)));--_stat-value-size: var(--stat-value-size, var(--type-size-700, 2.25rem));--_stat-value-weight: var(--stat-value-weight, var(--font-weight-bold, 650));--_stat-label-color: var(--stat-label-color, var(--color-text-secondary, #525252));--_stat-label-size: var(--stat-label-size, var(--type-size-200, .9375rem));--_stat-label-weight: var(--stat-label-weight, var(--font-weight-medium, 450));--_stat-sub-color: var(--stat-sub-color, var(--color-text-muted, #737373));--_stat-sub-size: var(--stat-sub-size, var(--type-size-150, .875rem));--_stat-accent-color: var(--stat-accent-color, var(--color-secondary-strong, #3a7c59));--_stat-gap: var(--stat-gap, var(--spacing-050, .125rem));display:flex;flex-direction:column;gap:var(--_stat-gap);background:transparent}
.esa-stat__value{font-family:var(--_stat-value-font);font-size:var(--_stat-value-size);font-weight:var(--_stat-value-weight);line-height:var(--line-height-tight, 1.3);letter-spacing:var(--letter-spacing-tight, -.01em);color:var(--_stat-value-color)}
.esa-stat__label{font-size:var(--_stat-label-size);font-weight:var(--_stat-label-weight);line-height:var(--line-height-normal, 1.6);color:var(--_stat-label-color)}
.esa-stat__sub{font-size:var(--_stat-sub-size);font-weight:var(--font-weight-regular, 350);line-height:var(--line-height-normal, 1.6);color:var(--_stat-sub-color)}
.esa-stat--accent .esa-stat__value{color:var(--_stat-accent-color)}
[data-gap=md]{--gap: var(--spacing-400, 1rem)}
.sidebar{--gap: var(--spacing-500, 1.5rem);--sidebar-width: 18rem;--sidebar-content-min: 60%;display:flex;flex-wrap:wrap;gap:var(--gap)}
.sidebar>:first-child{flex-basis:var(--sidebar-width);flex-grow:1}
.sidebar[data-side=end]>:first-child{order:2}
.sidebar>:last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--sidebar-content-min)}
[data-gap=xs]{--gap: var(--spacing-200, .5rem)}
:where(.ag-theme-iconSet-5) {
.ag-icon-aggregation::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M18%207V4H6l6%208-6%208h12v-3%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-arrows::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpolyline%20points%3D%225%209%202%2012%205%2015%22%2F%3E%3Cpolyline%20points%3D%229%205%2012%202%2015%205%22%2F%3E%3Cpolyline%20points%3D%2215%2019%2012%2022%209%2019%22%2F%3E%3Cpolyline%20points%3D%2219%209%2022%2012%2019%2015%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%2222%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%222%22%20y2%3D%2222%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-asc::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%2F%3E%3Cpath%20d%3D%22M12%2019V5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-cancel::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m18%206-12%2012%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chart::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%2218%22%20x2%3D%2218%22%20y1%3D%2220%22%20y2%3D%2210%22%2F%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2220%22%20y2%3D%224%22%2F%3E%3Cline%20x1%3D%226%22%20x2%3D%226%22%20y1%3D%2220%22%20y2%3D%2214%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-color-picker::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m19%2011-8-8-8.6%208.6a2%202%200%200%200%200%202.8l5.2%205.2c.8.8%202%20.8%202.8%200L19%2011Z%22%2F%3E%3Cpath%20d%3D%22m5%202%205%205%22%2F%3E%3Cpath%20d%3D%22M2%2013h15%22%2F%3E%3Cpath%20d%3D%22M22%2020a2%202%200%201%201-4%200c0-1.6%201.7-2.4%202-4%20.3%201.6%202%202.4%202%204Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-columns::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9%203H5a2%202%200%200%200-2%202v4m6-6h10a2%202%200%200%201%202%202v4M9%203v18m0%200h10a2%202%200%200%200%202-2V9M9%2021H5a2%202%200%200%201-2-2V9m0%200h18%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-contracted::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-copy::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%2F%3E%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-cross::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-csv::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M14.5%202H6a2%202%200%200%200-2%202v16a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V7.5L14.5%202z%22%2F%3E%3Cpolyline%20points%3D%2214%202%2014%208%2020%208%22%2F%3E%3Cpath%20d%3D%22M8%2013h2%22%2F%3E%3Cpath%20d%3D%22M8%2017h2%22%2F%3E%3Cpath%20d%3D%22M14%2013h2%22%2F%3E%3Cpath%20d%3D%22M14%2017h2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-cut::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20r%3D%223%22%2F%3E%3Cpath%20d%3D%22M8.12%208.12%2012%2012%22%2F%3E%3Cpath%20d%3D%22M20%204%208.12%2015.88%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%2F%3E%3Cpath%20d%3D%22M14.8%2014.8%2020%2020%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-desc::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M12%205v14%22%2F%3E%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-down::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M12%205v14%22%2F%3E%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-excel::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M14.5%202H6a2%202%200%200%200-2%202v16a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V7.5L14.5%202z%22%2F%3E%3Cpolyline%20points%3D%2214%202%2014%208%2020%208%22%2F%3E%3Cpath%20d%3D%22M8%2013h2%22%2F%3E%3Cpath%20d%3D%22M8%2017h2%22%2F%3E%3Cpath%20d%3D%22M14%2013h2%22%2F%3E%3Cpath%20d%3D%22M14%2017h2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-expanded::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-eye::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M2%2012s3-7%2010-7%2010%207%2010%207-3%207-10%207-10-7-10-7Z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-eye-slash::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9.88%209.88a3%203%200%201%200%204.24%204.24%22%2F%3E%3Cpath%20d%3D%22M10.73%205.08A10.43%2010.43%200%200%201%2012%205c7%200%2010%207%2010%207a13.16%2013.16%200%200%201-1.67%202.68%22%2F%3E%3Cpath%20d%3D%22M6.61%206.61A13.526%2013.526%200%200%200%202%2012s3%207%2010%207a9.74%209.74%200%200%200%205.39-1.61%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%2222%22%20y1%3D%222%22%20y2%3D%2222%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-filter::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M3%206h18%22%2F%3E%3Cpath%20d%3D%22M7%2012h10%22%2F%3E%3Cpath%20d%3D%22M10%2018h4%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-first::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m17%2018-6-6%206-6%22%2F%3E%3Cpath%20d%3D%22M7%206v12%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-grip::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%225%22%20cy%3D%228%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%228%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%228%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%225%22%20cy%3D%2216%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2216%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%220.5%22%2F%3E%3Cg%20stroke%3D%22none%22%20fill%3D%22currentColor%22%3E%3Ccircle%20cx%3D%225%22%20cy%3D%228%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%228%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%228%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%225%22%20cy%3D%2216%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2216%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'); }
.ag-icon-group::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M16%2012H3%22%2F%3E%3Cpath%20d%3D%22M16%2018H3%22%2F%3E%3Cpath%20d%3D%22M10%206H3%22%2F%3E%3Cpath%20d%3D%22M21%2018V8a2%202%200%200%200-2-2h-5%22%2F%3E%3Cpath%20d%3D%22m16%208-2-2%202-2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-last::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m7%2018%206-6-6-6%22%2F%3E%3Cpath%20d%3D%22M17%206v12%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-left::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m12%2019-7-7%207-7%22%2F%3E%3Cpath%20d%3D%22M19%2012H5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-linked::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9%2017H7A5%205%200%200%201%207%207h2%22%2F%3E%3Cpath%20d%3D%22M15%207h2a5%205%200%201%201%200%2010h-2%22%2F%3E%3Cline%20x1%3D%228%22%20x2%3D%2216%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-loading::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%222%22%20y2%3D%226%22%2F%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2218%22%20y2%3D%2222%22%2F%3E%3Cline%20x1%3D%224.93%22%20x2%3D%227.76%22%20y1%3D%224.93%22%20y2%3D%227.76%22%2F%3E%3Cline%20x1%3D%2216.24%22%20x2%3D%2219.07%22%20y1%3D%2216.24%22%20y2%3D%2219.07%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%226%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%2218%22%20x2%3D%2222%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%224.93%22%20x2%3D%227.76%22%20y1%3D%2219.07%22%20y2%3D%2216.24%22%2F%3E%3Cline%20x1%3D%2216.24%22%20x2%3D%2219.07%22%20y1%3D%227.76%22%20y2%3D%224.93%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-maximize::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpolyline%20points%3D%2215%203%2021%203%2021%209%22%2F%3E%3Cpolyline%20points%3D%229%2021%203%2021%203%2015%22%2F%3E%3Cline%20x1%3D%2221%22%20x2%3D%2214%22%20y1%3D%223%22%20y2%3D%2210%22%2F%3E%3Cline%20x1%3D%223%22%20x2%3D%2210%22%20y1%3D%2221%22%20y2%3D%2214%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-menu::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%226%22%20y2%3D%226%22%2F%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2218%22%20y2%3D%2218%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-menu-alt::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%225%22%20r%3D%220.75%22%20fill%3D%22%23D9D9D9%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%220.75%22%20fill%3D%22%23D9D9D9%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2219%22%20r%3D%220.75%22%20fill%3D%22%23D9D9D9%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-minimize::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpolyline%20points%3D%224%2014%2010%2014%2010%2020%22%2F%3E%3Cpolyline%20points%3D%2220%2010%2014%2010%2014%204%22%2F%3E%3Cline%20x1%3D%2214%22%20x2%3D%2221%22%20y1%3D%2210%22%20y2%3D%223%22%2F%3E%3Cline%20x1%3D%223%22%20x2%3D%2210%22%20y1%3D%2221%22%20y2%3D%2214%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-minus::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22M8%2012h8%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-next::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-none::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m7%2015%205%205%205-5%22%2F%3E%3Cpath%20d%3D%22m7%209%205-5%205%205%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-not-allowed::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22m4.9%204.9%2014.2%2014.2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-paste::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M15%202H9a1%201%200%200%200-1%201v2c0%20.6.4%201%201%201h6c.6%200%201-.4%201-1V3c0-.6-.4-1-1-1Z%22%2F%3E%3Cpath%20d%3D%22M8%204H6a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2M16%204h2a2%202%200%200%201%202%202v2M11%2014h10%22%2F%3E%3Cpath%20d%3D%22m17%2010%204%204-4%204%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pin::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2217%22%20y2%3D%2222%22%2F%3E%3Cpath%20d%3D%22M5%2017h14v-1.76a2%202%200%200%200-1.11-1.79l-1.78-.9A2%202%200%200%201%2015%2010.76V6h1a2%202%200%200%200%200-4H8a2%202%200%200%200%200%204h1v4.76a2%202%200%200%201-1.11%201.79l-1.78.9A2%202%200%200%200%205%2015.24Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pivot::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M15%203v18%22%2F%3E%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%2F%3E%3Cpath%20d%3D%22M21%209H3%22%2F%3E%3Cpath%20d%3D%22M21%2015H3%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-plus::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22M8%2012h8%22%2F%3E%3Cpath%20d%3D%22M12%208v8%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-previous::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-right::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M5%2012h14%22%2F%3E%3Cpath%20d%3D%22m12%205%207%207-7%207%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-save::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M12%2017V3%22%2F%3E%3Cpath%20d%3D%22m6%2011%206%206%206-6%22%2F%3E%3Cpath%20d%3D%22M19%2021H5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-search::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%228%22%2F%3E%3Cpath%20d%3D%22m21%2021-4.3-4.3%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-settings::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M20%207h-9%22%2F%3E%3Cpath%20d%3D%22M14%2017H5%22%2F%3E%3Ccircle%20cx%3D%2217%22%20cy%3D%2217%22%20r%3D%223%22%2F%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-left::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-right::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tick::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tree-closed::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tree-indeterminate::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M5%2012h14%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tree-open::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-unlinked::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9%2017H7A5%205%200%200%201%207%207%22%2F%3E%3Cpath%20d%3D%22M15%207h2a5%205%200%200%201%204%208%22%2F%3E%3Cline%20x1%3D%228%22%20x2%3D%2212%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%2222%22%20y1%3D%222%22%20y2%3D%2222%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-up::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%2F%3E%3Cpath%20d%3D%22M12%2019V5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-aasc::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M13.2012%208.07928C13.6346%208.0793%2014.0128%208.15365%2014.3359%208.30193C14.6609%208.45018%2014.9141%208.65595%2015.0947%208.9201C15.2754%209.18439%2015.3683%209.49109%2015.374%209.83904H14.1904C14.1676%209.60898%2014.0695%209.4303%2013.8965%209.30291C13.7235%209.1756%2013.4889%209.1115%2013.1924%209.1115C12.9909%209.1115%2012.8204%209.1404%2012.6816%209.19744C12.543%209.25255%2012.4364%209.32917%2012.3623%209.42791C12.2901%209.52678%2012.2539%209.63933%2012.2539%209.76482C12.2501%209.8692%2012.272%209.9604%2012.3193%2010.0383C12.3688%2010.1162%2012.4369%2010.1843%2012.5225%2010.2414C12.6079%2010.2964%2012.7064%2010.3451%2012.8184%2010.3869C12.9304%2010.4268%2013.0505%2010.4609%2013.1777%2010.4894L13.7031%2010.6144C13.9578%2010.6715%2014.1914%2010.7479%2014.4043%2010.8429C14.6173%2010.938%2014.8021%2011.0547%2014.958%2011.1935C15.1138%2011.3323%2015.2348%2011.4957%2015.3203%2011.6838C15.4077%2011.8719%2015.4522%2012.088%2015.4541%2012.3312C15.4522%2012.6885%2015.3611%2012.9986%2015.1807%2013.2609C15.0019%2013.5214%2014.7427%2013.7248%2014.4043%2013.8693C14.0678%2014.0118%2013.6617%2014.0832%2013.1865%2014.0832C12.7153%2014.0832%2012.3048%2014.0107%2011.9551%2013.8664C11.6071%2013.7219%2011.3345%2013.5071%2011.1387%2013.2238C10.9449%2012.9387%2010.8435%2012.5862%2010.834%2012.1662H12.0283C12.0416%2012.362%2012.0984%2012.5252%2012.1973%2012.6564C12.298%2012.7857%2012.4323%2012.8838%2012.5996%2012.9504C12.7688%2013.0149%2012.96%2013.047%2013.1729%2013.047C13.3817%2013.047%2013.563%2013.0169%2013.7168%2012.9562C13.8727%2012.8954%2013.9935%2012.8106%2014.0791%2012.7023C14.1647%2012.5939%2014.208%2012.469%2014.208%2012.3283C14.2079%2012.1974%2014.1686%2012.0875%2014.0908%2011.9982C14.0148%2011.9089%2013.9022%2011.8324%2013.7539%2011.7697C13.6076%2011.707%2013.4276%2011.6501%2013.2148%2011.5988L12.5791%2011.4387C12.0869%2011.3189%2011.6982%2011.1318%2011.4131%2010.8771C11.128%2010.6224%2010.9855%2010.2793%2010.9873%209.84783C10.9854%209.49418%2011.0804%209.18439%2011.2705%208.9201C11.4625%208.65603%2011.7261%208.45015%2012.0605%208.30193C12.3951%208.15369%2012.7754%208.07928%2013.2012%208.07928Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.8125%2014.0002H4.48926L4.05664%2012.6681H1.94824L1.51465%2014.0002H0.19043L2.20703%208.15935H3.79883L5.8125%2014.0002ZM2.26172%2011.7043H3.74316L3.02539%209.49334H2.98047L2.26172%2011.7043Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.45215%208.15935C8.88165%208.15935%209.24031%208.22251%209.52734%208.34978C9.81445%208.47717%2010.0303%208.65477%2010.1748%208.88103C10.3192%209.10536%2010.3916%209.36368%2010.3916%209.65642C10.3916%209.88452%2010.3461%2010.085%2010.2549%2010.258C10.1637%2010.4289%2010.0384%2010.5696%209.87891%2010.6799C9.72117%2010.7882%209.54024%2010.8657%209.33691%2010.9113V10.9679C9.55917%2010.9775%209.76716%2011.0406%209.96094%2011.1564C10.1568%2011.2724%2010.3158%2011.4356%2010.4375%2011.6447C10.5591%2011.8519%2010.6201%2012.099%2010.6201%2012.3859C10.6201%2012.6958%2010.5427%2012.9727%2010.3887%2013.216C10.2366%2013.4573%2010.0113%2013.6486%209.71289%2013.7892C9.41443%2013.9299%209.04655%2014.0002%208.60938%2014.0002H6.11426V8.15935H8.45215ZM7.34863%2012.9904H8.35547C8.69943%2012.9904%208.95057%2012.9252%209.1084%2012.7941C9.26621%2012.661%209.34473%2012.4834%209.34473%2012.2629C9.34468%2012.1014%209.30643%2011.9587%209.22852%2011.8351C9.15056%2011.7116%209.03903%2011.6145%208.89453%2011.5441C8.75195%2011.4738%208.58148%2011.4387%208.38379%2011.4387H7.34863V12.9904ZM7.34863%2010.6037H8.26465C8.43369%2010.6036%208.58376%2010.5737%208.71484%2010.5148C8.84793%2010.454%208.95227%2010.3683%209.02832%2010.258C9.10628%2010.1477%209.14551%2010.0155%209.14551%209.8615C9.14546%209.65055%209.07008%209.48001%208.91992%209.35076C8.77165%209.22169%208.56064%209.15741%208.28711%209.1574H7.34863V10.6037Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M7.16602%200.377127C7.44584%200.189493%207.82551%200.20905%208.08496%200.442557L11.418%203.44256C11.7257%203.71966%2011.7507%204.19428%2011.4736%204.50213C11.1966%204.80961%2010.7228%204.83441%2010.415%204.55779L7.60938%202.03338L5.11328%204.53045C4.82042%204.82326%204.34562%204.82322%204.05273%204.53045C3.75986%204.23757%203.75989%203.7628%204.05273%203.4699L7.05273%200.4699L7.16602%200.377127Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-adesc::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10.3867%2011.4697C10.6796%2011.1771%2011.1544%2011.1769%2011.4473%2011.4697C11.7399%2011.7626%2011.7399%2012.2374%2011.4473%2012.5303L8.44727%2015.5303L8.33398%2015.623C8.05425%2015.8106%207.67449%2015.7909%207.41504%2015.5576L4.08203%2012.5576C3.77415%2012.2805%203.74927%2011.8059%204.02637%2011.498C4.30342%2011.1907%204.77722%2011.1657%205.08496%2011.4424L7.89062%2013.9668L10.3867%2011.4697Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M13.2012%203.0791C13.6346%203.07912%2014.0128%203.1535%2014.3359%203.30176C14.6611%203.45006%2014.9141%203.65661%2015.0947%203.9209C15.2752%204.18513%2015.3683%204.49104%2015.374%204.83887H14.1904C14.1676%204.60882%2014.0695%204.43012%2013.8965%204.30273C13.7235%204.17546%2013.4889%204.11133%2013.1924%204.11133C12.9909%204.11133%2012.8204%204.14023%2012.6816%204.19727C12.5431%204.25236%2012.4364%204.32902%2012.3623%204.42773C12.2901%204.52659%2012.2539%204.63919%2012.2539%204.76465C12.2501%204.86901%2012.272%204.96023%2012.3193%205.03809C12.3688%205.11604%2012.4369%205.18417%2012.5225%205.24121C12.6079%205.29623%2012.7064%205.34496%2012.8184%205.38672C12.9304%205.42661%2013.0505%205.46075%2013.1777%205.48926L13.7031%205.61426C13.9578%205.67128%2014.1914%205.74776%2014.4043%205.84277C14.6172%205.93784%2014.8021%206.05457%2014.958%206.19336C15.1139%206.33216%2015.2348%206.49633%2015.3203%206.68457C15.4076%206.8727%2015.4522%207.08885%2015.4541%207.33203C15.4521%207.68929%2015.3612%207.99944%2015.1807%208.26172C15.0019%208.52216%2014.7427%208.72465%2014.4043%208.86914C14.0678%209.01165%2013.6617%209.08301%2013.1865%209.08301C12.7153%209.08299%2012.3048%209.01057%2011.9551%208.86621C11.6072%208.72173%2011.3345%208.50786%2011.1387%208.22461C10.9447%207.9394%2010.8435%207.58622%2010.834%207.16602H12.0283C12.0416%207.36176%2012.0985%207.52509%2012.1973%207.65625C12.298%207.78554%2012.4323%207.88365%2012.5996%207.9502C12.7688%208.01477%2012.96%208.04785%2013.1729%208.04785C13.3817%208.04781%2013.5629%208.01678%2013.7168%207.95605C13.8727%207.89522%2013.9935%207.81051%2014.0791%207.70215C14.1646%207.59387%2014.2079%207.46965%2014.208%207.3291C14.208%207.19796%2014.1687%207.08739%2014.0908%206.99805C14.0148%206.90868%2013.9022%206.83228%2013.7539%206.76953C13.6076%206.70685%2013.4276%206.64993%2013.2148%206.59863L12.5791%206.43848C12.0868%206.31871%2011.6982%206.13163%2011.4131%205.87695C11.1279%205.62221%2010.9855%205.27916%2010.9873%204.84766C10.9854%204.49404%2011.0804%204.18517%2011.2705%203.9209C11.4625%203.65661%2011.7259%203.45006%2012.0605%203.30176C12.3951%203.15353%2012.7754%203.0791%2013.2012%203.0791Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.8125%209H4.48926L4.05664%207.66797H1.94824L1.51465%209H0.19043L2.20703%203.15918H3.79883L5.8125%209ZM2.26172%206.7041H3.74316L3.02539%204.49414H2.98047L2.26172%206.7041Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.45215%203.15918C8.88181%203.15918%209.24025%203.22322%209.52734%203.35059C9.81445%203.47798%2010.0303%203.6546%2010.1748%203.88086C10.3193%204.10518%2010.3916%204.36351%2010.3916%204.65625C10.3916%204.88432%2010.3461%205.08484%2010.2549%205.25781C10.1636%205.4289%2010.0386%205.57039%209.87891%205.68066C9.72118%205.78898%209.54022%205.86549%209.33691%205.91113V5.96875C9.55913%205.9783%209.76719%206.04044%209.96094%206.15625C10.1568%206.27223%2010.3158%206.43538%2010.4375%206.64453C10.5591%206.85173%2010.6201%207.09875%2010.6201%207.38574C10.6201%207.69567%2010.5427%207.97245%2010.3887%208.21582C10.2366%208.45719%2010.0113%208.64841%209.71289%208.78906C9.41442%208.9297%209.04658%208.99999%208.60938%209H6.11426V3.15918H8.45215ZM7.34863%207.99023H8.35547C8.69948%207.99023%208.95057%207.92504%209.1084%207.79395C9.26621%207.66085%209.34473%207.48325%209.34473%207.2627C9.34466%207.10125%209.3064%206.95844%209.22852%206.83496C9.15056%206.71143%209.03899%206.61427%208.89453%206.54395C8.75196%206.47365%208.58145%206.43848%208.38379%206.43848H7.34863V7.99023ZM7.34863%205.60352H8.26465C8.43369%205.60347%208.58376%205.57354%208.71484%205.51465C8.84791%205.45381%208.95228%205.36807%209.02832%205.25781C9.10623%205.14755%209.14551%205.01529%209.14551%204.86133C9.14542%204.65046%209.07002%204.48078%208.91992%204.35156C8.77163%204.22228%208.56087%204.15724%208.28711%204.15723H7.34863V5.60352Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-down::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%206L8%2010L4%206%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-left::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2012L6%208L10%204%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-right::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%2012L10%208L6%204%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-up::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M4%2010L8%206L12%2010%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-column-arrow::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%2026C0%2028.2092%201.79086%2030%204%2030H14C16.2091%2030%2018%2028.2092%2018%2026V15H25.8786L24.4394%2016.4393C23.8536%2017.0251%2023.8536%2017.9749%2024.4394%2018.5607C25.0252%2019.1464%2025.9748%2019.1464%2026.5606%2018.5607L30.5606%2014.5607C31.1464%2013.9749%2031.1464%2013.0251%2030.5606%2012.4393L26.5606%208.43934C25.9748%207.85356%2025.0252%207.85356%2024.4394%208.43934C23.8536%209.02512%2023.8536%209.97488%2024.4394%2010.5607L25.8786%2012H18V6C18%203.79086%2016.2091%202%2014%202H4C1.79086%202%200%203.79086%200%206V26ZM14%205H10.5V12H15V6C15%205.44772%2014.5523%205%2014%205ZM4%205H7.5V12H3V6C3%205.44772%203.44772%205%204%205ZM10.5%2015H15V26C15%2026.5522%2014.5523%2027%2014%2027H10.5V15ZM4%2027H7.5V15H3V26C3%2026.5522%203.44772%2027%204%2027Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-edit::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3.5%2010.6262V12.5012H5.375L10.905%206.97122L9.03%205.09622L3.5%2010.6262ZM12.355%205.52122C12.4014%205.47497%2012.4381%205.42002%2012.4632%205.35953C12.4883%205.29905%2012.5012%205.23421%2012.5012%205.16872C12.5012%205.10324%2012.4883%205.0384%2012.4632%204.97791C12.4381%204.91742%2012.4014%204.86248%2012.355%204.81622L11.185%203.64622C11.1387%203.59987%2011.0838%203.5631%2011.0233%203.53801C10.9628%203.51291%2010.898%203.5%2010.8325%203.5C10.767%203.5%2010.7022%203.51291%2010.6417%203.53801C10.5812%203.5631%2010.5263%203.59987%2010.48%203.64622L9.565%204.56122L11.44%206.43622L12.355%205.52122Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-filter-add::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5.12126%207.75L10.8517%207.75%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M6.65934%2011.748L9.32778%2011.748%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M12.2943%201.04872V6.19184M14.9886%203.74341H9.68478%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M8.25488%203C8.04799%203.18323%207.91706%203.45099%207.91699%203.74902C7.91713%204.04868%208.04988%204.31681%208.25879%204.5H2C1.58579%204.5%201.25%204.16421%201.25%203.75C1.25%203.33579%201.58579%203%202%203H8.25488Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pinned-bottom::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20class%3D%22ag-icon%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M3.47%2012.28A.75.75%200%200%201%204%2011h8a.75.75%200%200%201%200%201.5H4a.75.75%200%200%201-.53-.22ZM12.731%205.256a.75.75%200%200%201-.2.524l-4%204a.75.75%200%200%201-1.06%200l-4-4a.75.75%200%201%201%201.06-1.06l2.72%202.72V2a.75.75%200%200%201%201.5%200v5.44l2.72-2.72a.75.75%200%200%201%201.26.536Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pinned-top::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M12.53%203.72A.75.75%200%200%201%2012%205H4a.75.75%200%200%201%200-1.5h8a.75.75%200%200%201%20.53.22ZM3.269%2010.744a.75.75%200%200%201%20.2-.524l4-4a.75.75%200%200%201%201.06%200l4%204a.75.75%200%201%201-1.06%201.06L8.75%208.56V14a.75.75%200%200%201-1.5%200V8.56l-2.72%202.72a.75.75%200%200%201-1.26-.536Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-down::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22black%22%20stroke%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M7.334%2010.667%2016%2021.334l8.667-10.667H7.334Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-up::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22black%22%20stroke%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M7.334%2021.333%2016%2010.666l8.667%2010.667H7.334Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-un-pin::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20class%3D%22ag-icon%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M8%2011a.75.75%200%200%200-.75.75v3.333a.75.75%200%201%200%201.5%200V11.75A.75.75%200%200%200%208%2011Z%22%2F%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M13.11%201.436a.75.75%200%200%200-1.22-.872l-10%2014a.75.75%200%201%200%201.22.872L5.207%2012.5h7.376a.75.75%200%200%200%20.75-.75v-1.174a2.08%202.08%200%200%200-1.153-1.863l-1.185-.599-.005-.002a.58.58%200%200%201-.323-.522V5.165a2.083%202.083%200%200%200%201.854-2.904l.589-.825Zm-3.943%205.52v.634a2.08%202.08%200%200%200%201.153%201.863l1.185.6.005.002a.58.58%200%200%201%20.323.522V11H6.28l2.887-4.044ZM9.277%201H5.25a2.084%202.084%200%200%200-.083%204.165v1.676l1.5-2.132v-.292a.75.75%200%200%200-.75-.75H5.25a.584.584%200%200%201%200-1.167h2.972L9.277%201Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-asc::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%2F%3E%3Cpath%20d%3D%22M12%2019V5%22%2F%3E%3C%2Fsvg%3E'); }
:where(.ag-theme-tabStyle-6) {
.ag-tabs-header{background-color:var(--ag-tab-bar-background-color);border-bottom:var(--ag-tab-bar-border);display:flex;flex:1;gap:var(--ag-tab-spacing);padding:var(--ag-tab-bar-top-padding) var(--ag-tab-bar-horizontal-padding) 0}
.ag-tabs-header-wrapper{display:flex}
.ag-tabs-close-button-wrapper{align-items:center;border:0;display:flex;padding:var(--ag-spacing)}
:where(.ag-ltr) .ag-tabs-close-button-wrapper{border-right:solid var(--ag-border-width) var(--ag-border-color)}
:where(.ag-rtl) .ag-tabs-close-button-wrapper{border-left:solid var(--ag-border-width) var(--ag-border-color)}
.ag-tabs-close-button{background-color:unset;border:0;cursor:pointer;padding:0}
.ag-tab{align-items:center;background-color:var(--ag-tab-background-color);border-left:var(--ag-tab-selected-border-width) solid transparent;border-right:var(--ag-tab-selected-border-width) solid transparent;color:var(--ag-tab-text-color);cursor:pointer;display:flex;flex:1;justify-content:center;padding:var(--ag-tab-top-padding) var(--ag-tab-horizontal-padding) var(--ag-tab-bottom-padding);position:relative}
.ag-tab:hover{background-color:var(--ag-tab-hover-background-color);color:var(--ag-tab-hover-text-color)}
.ag-tab.ag-tab-selected{background-color:var(--ag-tab-selected-background-color);color:var(--ag-tab-selected-text-color)}
:where(.ag-ltr) .ag-tab.ag-tab-selected:where(:not(:first-of-type)){border-left-color:var(--ag-tab-selected-border-color)}
:where(.ag-rtl) .ag-tab.ag-tab-selected:where(:not(:first-of-type)){border-right-color:var(--ag-tab-selected-border-color)}
:where(.ag-ltr) .ag-tab.ag-tab-selected:where(:not(:last-of-type)){border-right-color:var(--ag-tab-selected-border-color)}
:where(.ag-rtl) .ag-tab.ag-tab-selected:where(:not(:last-of-type)){border-left-color:var(--ag-tab-selected-border-color)}
.ag-tab:after{background-color:var(--ag-tab-selected-underline-color);bottom:0;content:"";display:block;height:var(--ag-tab-selected-underline-width);left:0;opacity:0;position:absolute;right:0;transition:opacity var(--ag-tab-selected-underline-transition-duration)}
.ag-tab.ag-tab-selected:after{opacity:1}
.ag-aria-description-container{border:0;clip-path:inset(50%);height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px;z-index:9999}
:where(.ag-ltr){direction:ltr;.ag-body,.ag-body-horizontal-scroll,.ag-body-viewport,.ag-floating-bottom,.ag-floating-top,.ag-header,.ag-sticky-bottom,.ag-sticky-top{flex-direction:row}
.ag-layout-auto-height,.ag-layout-print{.ag-center-cols-viewport{min-height:150px}
.ag-root-wrapper{border:var(--ag-wrapper-border);border-radius:var(--ag-wrapper-border-radius);container-type:inline-size;display:flex;flex-direction:column;overflow:hidden;position:relative;&.ag-layout-normal{content-visibility:auto;height:100%}
.ag-root-wrapper-body{display:flex;flex-direction:row;&.ag-layout-normal{flex:1 1 auto;height:0;min-height:0}
.ag-unselectable{-webkit-user-select:none;-moz-user-select:none;user-select:none}
.ag-root{display:flex;flex-direction:column;position:relative;&.ag-layout-auto-height,&.ag-layout-normal{flex:1 1 auto;overflow:hidden;width:0}
&.ag-layout-normal{height:100%}
&.ag-layout-auto-height,&.ag-layout-normal{flex:1 1 auto;overflow:hidden;width:0}
.ag-body,.ag-body-horizontal-scroll,.ag-body-viewport,.ag-floating-bottom,.ag-floating-top,.ag-header,.ag-sticky-bottom,.ag-sticky-top{flex-direction:row}
.ag-header{background-color:var(--ag-header-background-color);border-bottom:var(--ag-header-row-border);color:var(--ag-header-text-color);display:flex;font-family:var(--ag-header-font-family);font-size:var(--ag-header-font-size);font-weight:var(--ag-header-font-weight);overflow:hidden;white-space:nowrap;width:100%}
.ag-body-horizontal-scroll-viewport,.ag-body-vertical-scroll-viewport,.ag-body-viewport,.ag-center-cols-viewport,.ag-floating-bottom-viewport,.ag-floating-top-viewport,.ag-header-viewport,.ag-sticky-bottom-viewport,.ag-sticky-top-viewport{flex:1 1 auto;height:100%;min-width:0;overflow:hidden;position:relative}
.ag-body-viewport,.ag-center-cols-viewport,.ag-floating-bottom-viewport,.ag-floating-top-viewport,.ag-header-viewport,.ag-sticky-bottom-viewport,.ag-sticky-top-viewport{overflow-x:auto;-ms-overflow-style:none!important;scrollbar-width:none!important}
.ag-body-container,.ag-body-horizontal-scroll-container,.ag-body-vertical-scroll-container,.ag-center-cols-container,.ag-floating-bottom-container,.ag-floating-bottom-full-width-container,.ag-floating-top-container,.ag-full-width-container,.ag-header-container,.ag-pinned-left-cols-container,.ag-pinned-left-sticky-bottom,.ag-pinned-right-cols-container,.ag-pinned-right-sticky-bottom,.ag-sticky-bottom-container,.ag-sticky-top-container{position:relative}
.ag-floating-bottom-container,.ag-floating-top-container,.ag-header-container,.ag-pinned-left-floating-bottom,.ag-pinned-left-floating-top,.ag-pinned-right-floating-bottom,.ag-pinned-right-floating-top,.ag-sticky-bottom-container,.ag-sticky-top-container{height:100%;white-space:nowrap}
.ag-floating-top{display:flex;overflow:hidden;position:relative;white-space:nowrap;width:100%}
.ag-body,.ag-floating-bottom,.ag-floating-top{background-color:var(--ag-data-background-color)}
.ag-viewport{position:relative}
.ag-floating-bottom-container,.ag-floating-top-container,.ag-sticky-bottom-container,.ag-sticky-top-container{min-height:1px}
.ag-floating-bottom-full-width-container,.ag-floating-top-full-width-container,.ag-full-width-container,.ag-sticky-bottom-full-width-container,.ag-sticky-top-full-width-container{pointer-events:none;position:absolute;top:0}
:where(.ag-ltr) .ag-floating-bottom-full-width-container,:where(.ag-ltr) .ag-floating-top-full-width-container,:where(.ag-ltr) .ag-full-width-container,:where(.ag-ltr) .ag-sticky-bottom-full-width-container,:where(.ag-ltr) .ag-sticky-top-full-width-container{left:0}
.ag-floating-bottom-full-width-container,.ag-floating-top-full-width-container{display:inline-block;height:100%;overflow:hidden;width:100%}
.ag-body{display:flex;flex:1 1 auto;flex-direction:row!important;min-height:0;position:relative}
.ag-body-viewport{display:flex;overflow-x:hidden;&:where(.ag-layout-normal){overflow-y:auto;-webkit-overflow-scrolling:touch}
.ag-center-cols-viewport{min-height:100%;width:100%}
.ag-center-cols-viewport{min-height:150px}
.ag-center-cols-container,.ag-pinned-right-cols-container{display:block}
.ag-full-width-container{width:100%}
.ag-body-horizontal-scroll,.ag-body-vertical-scroll{display:flex;min-height:0;min-width:0;position:relative;&:where(.ag-scrollbar-invisible){bottom:0;position:absolute;&:where(.ag-apple-scrollbar){opacity:0;transition:opacity .4s;visibility:hidden;&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
.ag-body-vertical-scroll{height:100%;&:where(.ag-scrollbar-invisible){top:0;z-index:10}
:where(.ag-ltr) .ag-body-vertical-scroll{&:where(.ag-scrollbar-invisible){right:0}
.ag-body-vertical-scroll-viewport{overflow-y:scroll}
.ag-body-vertical-scroll-container{width:100%}
.ag-sticky-bottom,.ag-sticky-top{background-color:var(--ag-data-background-color);display:flex;height:0;overflow:hidden;position:absolute;width:100%;z-index:1}
.ag-sticky-bottom{box-sizing:content-box!important;:where(.ag-pinned-left-sticky-bottom),:where(.ag-pinned-right-sticky-bottom),:where(.ag-sticky-bottom-container){border-top:var(--ag-row-border);box-sizing:border-box}
:where(.ag-pinned-left-sticky-bottom),:where(.ag-pinned-right-sticky-bottom),:where(.ag-sticky-bottom-container){border-top:var(--ag-row-border);box-sizing:border-box}
.ag-floating-bottom{display:flex;overflow:hidden;position:relative;white-space:nowrap;width:100%}
.ag-body-horizontal-scroll{width:100%;&:where(.ag-scrollbar-invisible){left:0;right:0}
.ag-horizontal-left-spacer,.ag-horizontal-right-spacer{height:100%;min-width:0;overflow-x:scroll;&:where(.ag-scroller-corner){overflow-x:hidden}
&:where(.ag-scroller-corner){overflow-x:hidden}
.ag-body-horizontal-scroll-viewport{overflow-x:scroll}
.ag-body-horizontal-scroll-container{height:100%}
.ag-header-row{height:var(--ag-header-height);position:absolute}
.ag-header-row:where(:not(.ag-header-row-column-group)){overflow:hidden}
:where(.ag-header.ag-header-allow-overflow) .ag-header-row{overflow:visible}
:where(.ag-header-cell:not(.ag-right-aligned-header)){.ag-header-col-ref{color:var(--ag-subtle-text-color)}
:where(.ag-ltr) :where(.ag-header-cell:not(.ag-right-aligned-header)){.ag-header-col-ref{margin-right:var(--ag-spacing)}
.ag-header-label-icon,.ag-header-menu-icon{margin-left:var(--ag-spacing)}
.ag-header-cell{display:inline-flex;overflow:hidden}
.ag-header-cell,.ag-header-group-cell{align-items:center;gap:var(--ag-cell-widget-spacing);height:100%;padding:0 var(--ag-cell-horizontal-padding);position:absolute}
.ag-header-cell:where(:not(.ag-floating-filter)):before,.ag-header-group-cell:before{background-image:linear-gradient(var(--ag-internal-hover-color),var(--ag-internal-hover-color)),linear-gradient(var(--ag-internal-moving-color),var(--ag-internal-moving-color));content:"";inset:0;position:absolute;--ag-internal-moving-color:transparent;--ag-internal-hover-color:transparent;transition:--ag-internal-moving-color var(--ag-header-cell-background-transition-duration),--ag-internal-hover-color var(--ag-header-cell-background-transition-duration)}
:where(.ag-header-cell:not(.ag-floating-filter)>*,.ag-header-group-cell>*){position:relative;z-index:1}
.ag-header-cell-resize{align-items:center;cursor:ew-resize;display:flex;height:100%;position:absolute;top:0;width:8px;z-index:2}
:where(.ag-ltr) .ag-header-cell-resize{right:-3px}
.ag-header-cell-resize:after{background-color:var(--ag-header-column-resize-handle-color);content:"";height:var(--ag-header-column-resize-handle-height);position:absolute;top:calc(50% - var(--ag-header-column-resize-handle-height)*.5);width:var(--ag-header-column-resize-handle-width);z-index:1}
:where(.ag-ltr) .ag-header-cell-resize:after{left:calc(50% - var(--ag-header-column-resize-handle-width))}
.ag-header-cell-comp-wrapper{width:100%}
:where(.ag-header-cell:not(.ag-header-cell-auto-height)) .ag-header-cell-comp-wrapper{align-items:center;display:flex;height:100%}
.ag-cell-label-container{align-items:center;display:flex;flex-direction:row-reverse;height:100%;justify-content:space-between;width:100%}
.ag-floating-filter-button-button,.ag-header-cell-filter-button,.ag-header-cell-menu-button,.ag-header-expand-icon,.ag-panel-title-bar-button,:where(.ag-header-cell-sortable) .ag-header-cell-label,:where(.ag-header-group-cell-selectable) .ag-header-cell-comp-wrapper{cursor:pointer}
.ag-header-cell-label,.ag-header-group-cell-label{align-items:center;align-self:stretch;display:flex;flex:1 1 auto;overflow:hidden;padding:5px 0}
.ag-header-cell-label{text-overflow:ellipsis}
.ag-header-cell-text,.ag-header-group-text{overflow:hidden;text-overflow:ellipsis}
.ag-header-cell-text{overflow-wrap:break-word}
.ag-header-label-icon,.ag-header-menu-icon{margin-left:var(--ag-spacing)}
.ag-sort-indicator-container{display:flex;gap:var(--ag-spacing)}
:where(.ag-ltr) .ag-sort-indicator-icon{padding-left:var(--ag-spacing)}
.ag-header-cell:after,.ag-header-group-cell:where(:not(.ag-header-span-height.ag-header-group-cell-no-group)):after{content:"";height:var(--ag-header-column-border-height);position:absolute;top:calc(50% - var(--ag-header-column-border-height)*.5);z-index:1}
:where(.ag-ltr) .ag-header-cell:after,:where(.ag-ltr) .ag-header-group-cell:where(:not(.ag-header-span-height.ag-header-group-cell-no-group)):after{border-right:var(--ag-header-column-border);right:0}
:where(.ag-row-no-animation) .ag-row{transition:none}
.ag-row-position-absolute{position:absolute}
.ag-row,.ag-spanned-row{color:var(--ag-cell-text-color);font-family:var(--ag-cell-font-family);font-size:var(--ag-cell-font-size);font-weight:var(--ag-cell-font-weight);white-space:nowrap;--ag-internal-content-line-height:calc(min(var(--ag-row-height), var(--ag-line-height, 1000px)) - var(--ag-internal-row-border-width, 1px) - 2px)}
.ag-row{background-color:var(--ag-data-background-color);border-bottom:var(--ag-row-border);height:var(--ag-row-height);width:100%;&.ag-row-editing-invalid{background-color:var(--ag-full-row-edit-invalid-background-color)}
.ag-cell{display:inline-block;height:100%;position:absolute;white-space:nowrap;&:focus-visible{box-shadow:none}
.ag-cell-value{flex:1 1 auto}
.ag-cell,.ag-full-width-row .ag-cell-wrapper.ag-row-group{border:1px solid transparent;line-height:var(--ag-internal-content-line-height);-webkit-font-smoothing:subpixel-antialiased}
:where(.ag-ltr) .ag-cell{border-right:var(--ag-column-border)}
.ag-cell-value:not(.ag-allow-overflow),.ag-group-value{overflow:hidden;text-overflow:ellipsis}
:where(.ag-ltr) .ag-cell:not(.ag-cell-inline-editing),:where(.ag-ltr) .ag-full-width-row .ag-cell-wrapper.ag-row-group{padding-left:calc(var(--ag-cell-horizontal-padding) - 1px + var(--ag-row-group-indent-size)*var(--ag-indentation-level));padding-right:calc(var(--ag-cell-horizontal-padding) - 1px)}
.ag-row-odd{background-color:var(--ag-odd-row-background-color)}
&:where(.ag-scrollbar-invisible){bottom:0;position:absolute;&:where(.ag-apple-scrollbar){opacity:0;transition:opacity .4s;visibility:hidden;&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
&:where(.ag-apple-scrollbar){opacity:0;transition:opacity .4s;visibility:hidden;&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
&:where(.ag-scrollbar-invisible){top:0;z-index:10}
&:where(.ag-scrollbar-invisible){right:0}
:where(.ag-body-vertical-content-no-gap>div>div>div,.ag-body-vertical-content-no-gap>div>div>div>div)>.ag-row-last{border-bottom-color:transparent}
&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
&:where(.ag-scrollbar-invisible){left:0;right:0}
:host {
      --_gap: var(--spacing-150, 0.375rem);
      --_pad-y: var(--spacing-150, 0.375rem);
      --_pad-x: var(--form-padding-x-md, 0.75rem);
      --_font: var(--form-font-size-md, 0.9375rem);
      --_radius: var(--radius-100, 0.25rem);

      /* Resting (unselected) chrome. */
      --_bg: var(--color-surface, #fff);
      --_border: var(--color-border, #e5e5e5);
      --_color: var(--color-text-secondary, #525252);
      --_bg-hover: var(--color-surface-sunken, #f5f5f5);
      --_border-hover: var(--color-border-strong, #d4d4d4);
      --_color-hover: var(--color-text-primary, #171717);

      display: inline-flex;
    }
:host([size='sm']) { --_pad-x: var(--form-padding-x-sm, 0.625rem); --_font: var(--form-font-size-sm, 0.75rem); --_pad-y: var(--spacing-100, 0.25rem); }
.root {
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--_gap);
    }
.chip {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-100, 0.25rem);
      padding: var(--_pad-y) var(--_pad-x);
      border-radius: var(--_radius, 0.25rem);
      border: 1px solid var(--_border);
      background: var(--_bg);
      color: var(--_color);
      font: inherit;
      font-size: var(--_font);
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      transition:
        background-color var(--transition-fast, 150ms ease),
        border-color var(--transition-fast, 150ms ease),
        color var(--transition-fast, 150ms ease);
    }
.chip--active.chip--neutral {
      background: var(--color-surface-sunken, #efefef);
      border-color: var(--color-border-strong, #d4d4d4);
      color: var(--color-text-tertiary, #404040);
    }
.chip__label { line-height: 1; }
:where(.ag-theme-checkboxStyle-4) {
.ag-checkbox-input-wrapper,.ag-radio-button-input-wrapper{background-color:var(--ag-checkbox-unchecked-background-color);border:solid var(--ag-checkbox-border-width) var(--ag-checkbox-unchecked-border-color);flex:none;height:var(--ag-icon-size);position:relative;width:var(--ag-icon-size);&:where(.ag-checked){background-color:var(--ag-checkbox-checked-background-color);border-color:var(--ag-checkbox-checked-border-color)}
&:where(.ag-checked):after{background-color:var(--ag-checkbox-checked-shape-color)}
&:where(.ag-disabled){filter:grayscale();opacity:.5}
.ag-checkbox-input,.ag-radio-button-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;display:block;height:var(--ag-icon-size);margin:0;opacity:0;width:var(--ag-icon-size)}
.ag-checkbox-input-wrapper:after,.ag-radio-button-input-wrapper:after{content:"";display:block;inset:0;-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;pointer-events:none;position:absolute}
.ag-checkbox-input-wrapper:where(:focus-within,:active),.ag-radio-button-input-wrapper:where(:focus-within,:active){box-shadow:var(--ag-focus-shadow)}
.ag-checkbox-input-wrapper{border-radius:var(--ag-checkbox-border-radius);&:where(.ag-checked):after{-webkit-mask-image:var(--ag-checkbox-checked-shape-image);mask-image:var(--ag-checkbox-checked-shape-image)}
&:where(.ag-indeterminate){background-color:var(--ag-checkbox-indeterminate-background-color);border-color:var(--ag-checkbox-indeterminate-border-color)}
&:where(.ag-indeterminate):after{background-color:var(--ag-checkbox-indeterminate-shape-color);-webkit-mask-image:var(--ag-checkbox-indeterminate-shape-image);mask-image:var(--ag-checkbox-indeterminate-shape-image)}
.ag-cell-editing-error .ag-checkbox-input-wrapper:focus-within{box-shadow:var(--ag-focus-error-shadow)}
.ag-radio-button-input-wrapper{border-radius:100%;&:where(.ag-checked):after{-webkit-mask-image:var(--ag-radio-checked-shape-image);mask-image:var(--ag-radio-checked-shape-image)}
.esa-button{--_btn-height: var(--form-height-md, 40px);--_btn-padding-x: var(--form-padding-x-md, 16px);--_btn-font-size: var(--form-font-size-md, 14px);--_btn-radius: var(--form-radius-md, 6px);--_accent: var(--color-primary, #46a758);--_accent-hover: var(--color-primary-hover, #3e9b4f);--_on: var(--color-text-inverse, #ffffff);--_accent-text: var(--_accent);--_btn-tint-hover: color-mix(in srgb, var(--_accent) 8%, transparent);--_btn-tint-active: color-mix(in srgb, var(--_accent) 14%, transparent);display:inline-block}
.esa-button--sm{--_btn-height: var(--form-height-sm, 32px);--_btn-padding-x: var(--form-padding-x-sm, 12px);--_btn-font-size: var(--form-font-size-sm, 12px);--_btn-radius: var(--form-radius-sm, 4px)}
.esa-button--color-secondary{--_accent: var(--color-secondary);--_accent-hover: var(--color-secondary-hover);--_accent-text: var(--color-secondary-strong)}
.esa-button__native{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-200, 8px);width:100%;height:var(--_btn-height);padding-inline:var(--_btn-padding-x);border:1px solid transparent;border-radius:var(--_btn-radius);font-size:var(--_btn-font-size);font-family:var(--font-sans, system-ui, sans-serif);font-weight:var(--font-weight-medium, 500);line-height:1;text-decoration:none;cursor:pointer;transition:background var(--transition-fast, .15s ease),border-color var(--transition-fast, .15s ease);-webkit-appearance:none;appearance:none}
.esa-button--appearance-outline .esa-button__native,.esa-button--appearance-dashed .esa-button__native{background:transparent;color:var(--_accent-text);border-color:var(--_accent)}
.esa-button__label{white-space:nowrap}
.esa-button--color-primary{--_accent-text: var(--color-primary-strong)}
.esa-button--appearance-fill .esa-button__native{background:var(--_accent);color:var(--_on);border-color:transparent}
.esa-button--color-danger{--_accent: var(--color-danger);--_accent-hover: var(--color-danger-hover);--_accent-text: var(--color-danger-strong)}
:where([class^=ag-]),:where([class^=ag-]):after,:where([class^=ag-]):before{box-sizing:border-box}
.ag-measurement-container{height:0;overflow:hidden;visibility:hidden;width:0}
.ag-measurement-element-border{display:inline-block}
.ag-measurement-element-border:before{border-left:var(--ag-internal-measurement-border);content:"";display:block}
.ag-chart,.ag-dnd-ghost,.ag-external,.ag-popup,.ag-root-wrapper{cursor:default;line-height:normal;white-space:normal;-webkit-font-smoothing:antialiased;background-color:var(--ag-wrapper-background-color);color:var(--ag-text-color);color-scheme:var(--ag-browser-color-scheme);font-family:var(--ag-font-family);font-size:var(--ag-font-size);font-weight:var(--ag-font-weight);--ag-indentation-level:0}
.ag-tab-guard{display:block;height:0;position:absolute;width:0}
.ag-tab-guard-top{top:1px}
.ag-invisible{visibility:hidden!important}
.ag-hidden{display:none!important}
.ag-tab-guard-bottom{bottom:1px}
.ag-icon{background-position:50%;background-repeat:no-repeat;background-size:contain;color:var(--ag-icon-color);display:block;height:var(--ag-icon-size);position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:var(--ag-icon-size)}
:where(.ag-icon):before{align-items:center;background-color:currentcolor;color:inherit;content:"";display:flex;font-family:inherit;font-size:var(--ag-icon-size);font-style:normal;font-variant:normal;height:var(--ag-icon-size);justify-content:center;line-height:var(--ag-icon-size);-webkit-mask-size:contain;mask-size:contain;text-transform:none;width:var(--ag-icon-size)}
.cbf-page{padding-block:var(--spacing-600) var(--spacing-800)}
.cbf-review-triage-strip{padding-bottom:var(--spacing-600);border-bottom:1px solid var(--color-border)}
.cbf-review-triage-strip__head{align-items:baseline;gap:var(--spacing-400);flex-wrap:wrap}
.cbf-review-triage-strip__caption{color:var(--color-text-muted)}
.cbf-review-triage-strip__stats{--align: flex-start;row-gap:var(--spacing-500)}
.cbf-invoice-review-queue__header{align-items:center;gap:var(--spacing-400);flex-wrap:wrap}
.cbf-invoice-review-queue__search{flex:1 1 280px;max-width:440px;min-width:220px}
.cbf-invoice-review-queue__grid{border:1px solid var(--color-border);border-radius:var(--radius-200);overflow:hidden;background:var(--color-surface)}
.cbf-invoice-review-queue__footer{color:var(--color-text-muted)}
.cbf-review-dialog{--side-dialog-width-lg: max(1180px, 75vw)}
.cbf-review-split{min-height:100%}
.cbf-review-hero{align-items:flex-start;gap:var(--spacing-400)}
.cbf-review-hero__group{display:flex;flex-direction:column;gap:var(--spacing-50);min-width:0}
.cbf-review__label{font-size:var(--type-size-150);font-weight:var(--font-weight-medium);color:var(--color-text-muted)}
.cbf-review-hero__amount-row{display:flex;align-items:center;gap:var(--spacing-200)}
.cbf-review-hero__amount{font-size:var(--type-size-600);font-weight:var(--font-weight-bold);line-height:var(--line-height-tight);color:var(--color-text-primary);font-variant-numeric:tabular-nums}
.cbf-review-fields__copy{align-self:center;position:relative;line-height:0;color:var(--color-text-muted)}
.cbf-review-fields__copy .esa-icon-button{color:inherit}
.cbf-review-hero__pct{font-size:var(--type-size-100);color:var(--color-text-muted)}
.cbf-review-hero__status{flex:none}
.cbf-review-panel__clock{align-items:center;gap:var(--spacing-300);padding:var(--spacing-300) var(--spacing-400);background:var(--color-surface-sunken);border:1px solid var(--color-border);border-radius:var(--radius-200)}
.cbf-review-panel__context{padding-block:var(--spacing-400);border-block:1px solid var(--color-border)}
.cbf-review__section-title{margin:0;font-size:var(--type-size-150);font-weight:var(--font-weight-semibold);color:var(--color-text-muted)}
.cbf-review-context{display:flex;flex-wrap:wrap;gap:var(--spacing-300) var(--spacing-500)}
.cbf-review-context__item{display:flex;flex-direction:column;gap:var(--spacing-50)}
.cbf-review-context__value{font-size:var(--type-size-250);font-weight:var(--font-weight-semibold);color:var(--color-text-secondary);font-variant-numeric:tabular-nums}
.cbf-review-context__label{font-size:var(--type-size-050);color:var(--color-text-muted)}
.cbf-review-context__value--accent{color:var(--color-text-primary)}
.cbf-review-impact{margin-top:var(--spacing-200)}
.cbf-review-impact__ledger{margin:var(--spacing-200) 0 0;border:1px solid var(--color-border);border-radius:var(--radius-200);overflow:hidden}
.cbf-review-impact__row{display:flex;align-items:baseline;justify-content:space-between;gap:var(--spacing-400);padding:var(--spacing-250) var(--spacing-400)}
.cbf-review-impact__row dt{margin:0;font-size:var(--type-size-150);color:var(--color-text-secondary)}
.cbf-review-impact__row dd{margin:0;font-size:var(--type-size-200);color:var(--color-text-primary);font-variant-numeric:tabular-nums}
.cbf-review-impact__row+.cbf-review-impact__row{border-top:1px solid var(--color-border-light, var(--color-border))}
.cbf-review-impact__delta{color:var(--color-text-secondary)}
.cbf-review-impact__row--total{background:var(--color-surface-sunken);border-top:1px solid var(--color-border)}
.cbf-review-impact__row--total dt{font-weight:var(--font-weight-semibold);color:var(--color-text-primary)}
.cbf-review-impact__row--total dd{font-weight:var(--font-weight-semibold)}
.cbf-review-fields{margin:0}
.cbf-review-fields__row{display:grid;grid-template-columns:92px 1fr auto;gap:var(--spacing-300);align-items:baseline;padding-block:var(--spacing-250);border-top:1px solid var(--color-border-light, var(--color-border))}
.cbf-review-fields__row:first-child{border-top:0;padding-top:0}
.cbf-review-fields__value{margin:0;font-size:var(--type-size-200);color:var(--color-text-secondary)}
.cbf-review-fields__value--lead{font-weight:var(--font-weight-medium);color:var(--color-text-primary)}
.cbf-review-attachments{margin-top:var(--spacing-200)}
.cbf-review-attachments__head{align-items:center;gap:var(--spacing-300);margin-bottom:var(--spacing-300)}
.cbf-review-attachments__head .cbf-review__section-title{margin:0}
.cbf-review-attachments__list{list-style:none;margin:0;padding:0;border:1px solid var(--color-border);border-radius:var(--radius-200);overflow:hidden}
.cbf-review-actions [hidden]{display:none!important}
.cbf-review-docpane{background:var(--color-surface-sunken);border:1px solid var(--color-border);border-radius:var(--radius-200);padding:var(--spacing-600);display:flex;flex-direction:column;align-items:center;overflow-y:auto}
.cbf-invoice-doc{position:relative;flex:1 0 auto;width:100%;max-width:620px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-100);box-shadow:0 1px 4px color-mix(in srgb,var(--color-surface-inverse) 10%,transparent);padding:var(--spacing-700) var(--spacing-700) var(--spacing-600);color:var(--color-text-primary);font-size:var(--type-size-150);line-height:var(--line-height-normal)}
.cbf-invoice-doc__stamp{position:absolute;top:var(--spacing-500);right:var(--spacing-500);font-size:var(--type-size-100);font-weight:var(--font-weight-semibold);text-transform:uppercase;letter-spacing:.06em;color:var(--color-danger, #b42318);border:1.5px solid currentColor;border-radius:var(--radius-100);padding:2px var(--spacing-200);transform:rotate(-4deg);opacity:.8}
.cbf-invoice-doc__head{display:flex;justify-content:space-between;gap:var(--spacing-400);align-items:flex-start;margin-bottom:var(--spacing-500)}
.cbf-invoice-doc__vendor{margin:0;font-size:var(--type-size-400);font-weight:var(--font-weight-bold)}
.cbf-invoice-doc__sub{margin:0;color:var(--color-text-muted);font-size:var(--type-size-100)}
.cbf-invoice-doc__meta{text-align:right}
.cbf-invoice-doc__meta p{margin:0 0 var(--spacing-100)}
.cbf-invoice-doc__meta span{color:var(--color-text-muted);margin-right:var(--spacing-200)}
.cbf-invoice-doc .cbf-num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.cbf-invoice-doc__billto{margin-bottom:var(--spacing-500)}
.cbf-invoice-doc__billto p{margin:0}
.cbf-invoice-doc__items{width:100%;border-collapse:collapse}
.cbf-invoice-doc__items th,.cbf-invoice-doc__items td{text-align:left;padding:var(--spacing-250) 0;vertical-align:top}
.cbf-invoice-doc__items thead th{border-bottom:1px solid var(--color-text-primary);font-weight:var(--font-weight-semibold);font-size:var(--type-size-100);color:var(--color-text-secondary)}
.cbf-invoice-doc__items th.cbf-num{text-align:right}
.cbf-invoice-doc__items tfoot th,.cbf-invoice-doc__items tfoot td{padding:var(--spacing-150) 0;text-align:right}
.cbf-invoice-doc__items tfoot th{font-weight:var(--font-weight-regular);color:var(--color-text-secondary)}
.cbf-invoice-doc__items tfoot tr:first-child th,.cbf-invoice-doc__items tfoot tr:first-child td{padding-top:var(--spacing-400)}
.cbf-invoice-doc__total th,.cbf-invoice-doc__total td{border-top:1px solid var(--color-text-primary);font-weight:var(--font-weight-bold);font-size:var(--type-size-200);padding-top:var(--spacing-300)!important}
.cbf-invoice-doc__memo{margin:var(--spacing-600) 0 0;color:var(--color-text-secondary);line-height:var(--line-height-relaxed)}
.cbf-invoice-doc__generated{margin:var(--spacing-600) 0 0;padding-top:var(--spacing-400);border-top:1px solid var(--color-border-light, var(--color-border));color:var(--color-text-muted);font-size:var(--type-size-100);font-style:italic}
.cbf-review-footer{align-items:center;gap:var(--spacing-400);width:100%}
.cbf-review-footer__position{font-size:var(--type-size-150);color:var(--color-text-muted);font-variant-numeric:tabular-nums}
.cbf-invoice-review-queue__grid .cbf-grid-num,.cbf-invoice-review-queue__grid .cbf-grid-num .ag-header-cell-label{justify-content:flex-end;text-align:right;font-variant-numeric:tabular-nums}
.cbf-invoice-review-queue__grid .ag-row{cursor:pointer}
.cbf-invoice-review-queue__grid .cbf-grid-id{font-variant-numeric:tabular-nums;color:var(--color-text-secondary)}
.cbf-invoice-review-queue__grid .cbf-grid-status{display:inline-flex;align-items:center;height:100%}
:where(.ag-theme-inputStyle-7) {
:where(.ag-input-field-input[type=number]:not(.ag-number-field-input-stepper)){-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;&::-webkit-inner-spin-button,&::-webkit-outer-spin-button{-webkit-appearance:none;appearance:none;margin:0}
.ag-input-field-input:where(input:not([type]),input[type=text],input[type=number],input[type=tel],input[type=date],input[type=datetime-local],textarea){background-color:var(--ag-input-background-color);border:var(--ag-input-border);border-radius:var(--ag-input-border-radius);color:var(--ag-input-text-color);font-family:inherit;font-size:inherit;line-height:inherit;margin:0;min-height:var(--ag-input-height);padding:0;&:where(:disabled){background-color:var(--ag-input-disabled-background-color);border:var(--ag-input-disabled-border);color:var(--ag-input-disabled-text-color)}
&:where(:focus){background-color:var(--ag-input-focus-background-color);border:var(--ag-input-focus-border);box-shadow:var(--ag-input-focus-shadow);color:var(--ag-input-focus-text-color);outline:none}
&:where(:invalid){background-color:var(--ag-input-invalid-background-color);border:var(--ag-input-invalid-border);color:var(--ag-input-invalid-text-color)}
&:where(.invalid){background-color:var(--ag-input-invalid-background-color);border:var(--ag-input-invalid-border);color:var(--ag-input-invalid-text-color)}
&::-moz-placeholder{color:var(--ag-input-placeholder-text-color)}
&::placeholder{color:var(--ag-input-placeholder-text-color)}
:where(.ag-ltr) .ag-input-field-input:where(input:not([type]),input[type=text],input[type=number],input[type=tel],input[type=date],input[type=datetime-local],textarea){padding-left:var(--ag-input-padding-start)}
:where(.ag-rtl) .ag-input-field-input:where(input:not([type]),input[type=text],input[type=number],input[type=tel],input[type=date],input[type=datetime-local],textarea){padding-right:var(--ag-input-padding-start)}
&:where(.ag-ltr,.ag-rtl) .ag-input-field-input:where(input:not([type]),input[type=text],input[type=number],input[type=tel],input[type=date],input[type=datetime-local],textarea){padding:0 var(--ag-input-padding-start)}
:where(.ag-column-select-header-filter-wrapper),:where(.ag-filter-add-select),:where(.ag-filter-filter),:where(.ag-filter-toolpanel-search),:where(.ag-floating-filter-search-icon),:where(.ag-mini-filter){.ag-input-wrapper:before{background-color:currentcolor;color:var(--ag-input-icon-color);content:"";display:block;height:12px;-webkit-mask-image:url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48cGF0aCBkPSJNNS4zIDlhMy43IDMuNyAwIDEgMCAwLTcuNSAzLjcgMy43IDAgMCAwIDAgNy41Wk0xMC41IDEwLjUgOC4zIDguMiIvPjwvc3ZnPg==");mask-image:url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48cGF0aCBkPSJNNS4zIDlhMy43IDMuNyAwIDEgMCAwLTcuNSAzLjcgMy43IDAgMCAwIDAgNy41Wk0xMC41IDEwLjUgOC4zIDguMiIvPjwvc3ZnPg==");-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;opacity:.5;position:absolute;width:12px}
:where(.ag-ltr) :where(.ag-column-select-header-filter-wrapper),:where(.ag-ltr) :where(.ag-filter-add-select),:where(.ag-ltr) :where(.ag-filter-filter),:where(.ag-ltr) :where(.ag-filter-toolpanel-search),:where(.ag-ltr) :where(.ag-floating-filter-search-icon),:where(.ag-ltr) :where(.ag-mini-filter){.ag-input-wrapper:before{margin-left:var(--ag-spacing)}
.ag-number-field-input,.ag-text-field-input{padding-left:calc(var(--ag-spacing)*1.5 + 12px)}
:where(.ag-rtl) :where(.ag-column-select-header-filter-wrapper),:where(.ag-rtl) :where(.ag-filter-add-select),:where(.ag-rtl) :where(.ag-filter-filter),:where(.ag-rtl) :where(.ag-filter-toolpanel-search),:where(.ag-rtl) :where(.ag-floating-filter-search-icon),:where(.ag-rtl) :where(.ag-mini-filter){.ag-input-wrapper:before{margin-right:var(--ag-spacing)}
.ag-number-field-input,.ag-text-field-input{padding-right:calc(var(--ag-spacing)*1.5 + 12px)}
.ag-input-field-input:where(input:not([type]),input[type=text],input[type=number],input[type=tel],input[type=date],input[type=datetime-local],textarea){&:focus{box-shadow:var(--ag-focus-shadow);&:where(.invalid),&:where(:invalid){box-shadow:var(--ag-focus-error-shadow)}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--ag-internal-hover-color` | `rgba(0, 0, 0, 0)` | component |
| `--ag-internal-moving-color` | `rgba(0, 0, 0, 0)` | component |
| `--app-bar-bg` | `#fcfcfc` | component |
| `--app-bar-brand-bg` | `#1e5386` | component |
| `--app-bar-brand-strong-bg` | `#13273e` | component |
| `--app-bar-brand-strong-text` | `#fcfcfc` | component |
| `--app-bar-brand-text` | `#fcfcfc` | component |
| `--app-bar-gap` | `2rem` | component |
| `--app-bar-pad-x` | `2rem` | component |
| `--app-bar-pad-y` | `1rem` | component |
| `--app-bar-text` | `#3d3d3d` | component |
| `--badge-bg` | `#1e5386` | component |
| `--badge-height-lg` | `34px` | component |
| `--badge-height-md` | `28px` | component |
| `--badge-radius` | `.25rem` | component |
| `--badge-text-color` | `#fcfcfc` | component |
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#3d3d3d` | component |
| `--breadcrumbs-separator-color` | `#bbbbbb` | component |
| `--cbf-text-placeholder` | `#9aa3ad` | brand |
| `--color-border` | `#dcdcdc` | semantic |
| `--color-border-light` | `#efefef` | semantic |
| `--color-border-strong` | `#bdbdbd` | semantic |
| `--color-danger` | `#e5484d` | semantic |
| `--color-danger-hover` | `#dc3e42` | semantic |
| `--color-danger-strong` | `#ce2c31` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-hover` | `#1a4570` | semantic |
| `--color-primary-strong` | `#2a7e3b` | semantic |
| `--color-primary-subtle` | `#f3f7fc` | semantic |
| `--color-secondary` | `#2770b2` | semantic |
| `--color-secondary-hover` | `#1e5386` | semantic |
| `--color-secondary-strong` | `#2a7e3b` | semantic |
| `--color-surface` | `#fcfcfc` | semantic |
| `--color-surface-inverse` | `#13273e` | semantic |
| `--color-surface-sunken` | `#f3f7fc` | semantic |
| `--color-text-inverse` | `#fcfcfc` | semantic |
| `--color-text-link` | `#1e5386` | semantic |
| `--color-text-muted` | `#7c7c7c` | semantic |
| `--color-text-primary` | `#3d3d3d` | semantic |
| `--color-text-secondary` | `#525252` | semantic |
| `--color-text-tertiary` | `#656565` | semantic |
| `--color-warning` | `#ffc53d` | semantic |
| `--color-warning-on-fill` | `#4f3422` | semantic |
| `--container-gutter` | `2rem` | component |
| `--font-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | primitive |
| `--font-sans` | `"IBM Plex Sans", sans-serif` | primitive |
| `--font-weight-bold` | `700` | primitive |
| `--font-weight-medium` | `500` | primitive |
| `--font-weight-regular` | `400` | primitive |
| `--font-weight-semibold` | `600` | primitive |
| `--form-font-size-md` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | component |
| `--form-font-size-sm` | `clamp(.625rem, .56rem + .32vw, .75rem)` | component |
| `--form-height-md` | `40px` | component |
| `--form-height-sm` | `32px` | component |
| `--form-height-xs` | `28px` | component |
| `--form-padding-x-md` | `.75rem` | component |
| `--form-padding-x-sm` | `.625rem` | component |
| `--form-radius-md` | `.5rem` | component |
| `--form-radius-sm` | `.25rem` | component |
| `--icon-button-bg-hover` | `color-mix(in srgb, currentColor 14%, transparent)` | component |
| `--icon-link-font-size-md` | `1rem` | component |
| `--icon-link-font-size-sm` | `.875rem` | component |
| `--icon-link-gap` | `.375rem` | component |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-medium` | `20px` | component |
| `--icon-size-sm` | `16px` | primitive |
| `--icon-size-small` | `16px` | component |
| `--icon-size-xs` | `14px` | primitive |
| `--letter-spacing-normal` | `.01em` | primitive |
| `--letter-spacing-tight` | `-.01em` | primitive |
| `--line-height-normal` | `1.6` | primitive |
| `--line-height-relaxed` | `1.8` | primitive |
| `--line-height-tight` | `1.3` | primitive |
| `--link-column-heading-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | component |
| `--link-column-item-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | component |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--side-dialog-width` | `400px` | component |
| `--side-dialog-width-lg` | `520px` | component |
| `--side-dialog-width-sm` | `320px` | component |
| `--sidebar-width` | `280px` | semantic |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--spacing-650` | `2.5rem` | primitive |
| `--spacing-700` | `3rem` | primitive |
| `--spacing-800` | `4rem` | primitive |
| `--transition-fast` | `.15s ease` | primitive |
| `--type-size-050` | `clamp(.5rem, .44rem + .3vw, .625rem)` | primitive |
| `--type-size-100` | `clamp(.625rem, .56rem + .32vw, .75rem)` | primitive |
| `--type-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |
| `--type-size-250` | `clamp(.8125rem, .71rem + .5vw, 1.0625rem)` | primitive |
| `--type-size-300` | `clamp(.875rem, .77rem + .52vw, 1.125rem)` | primitive |
| `--type-size-400` | `clamp(1rem, .88rem + .6vw, 1.25rem)` | primitive |
| `--type-size-500` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | primitive |
| `--type-size-600` | `clamp(1.375rem, 1.2rem + .88vw, 1.875rem)` | primitive |
| `--type-size-700` | `clamp(1.625rem, 1.41rem + 1.08vw, 2.25rem)` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
