# Full page

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **project-budgets** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/project-budgets/
- **Section element:** `<page>`
- **Components:** cbf-app-bar (spoke), cbf-app-panel (spoke), cbf-icon (spoke), cbf-logo (spoke), cbf-nav-actions (spoke), cbf-nav-burger (spoke), cbf-nav-collapsible (spoke), cbf-nav-drawer (spoke), cbf-nav-link (spoke), cbf-omni (spoke), cbf-omni-trigger (spoke), cbf-page (spoke), cbf-page-heading (spoke), cbf-related-items (spoke), cbf-report-intro (spoke), cbf-report-tabs (spoke), cbf-search-surface (spoke), esa-app-bar (hub), esa-breadcrumbs (hub), esa-button (hub), esa-card (hub), esa-container (hub), esa-icon (hub), esa-kbd (hub), esa-link-column (hub), esa-nav-dropdown (hub)

## Markup (de-scoped, framework-free)
```html
<nav class="esa-app-bar esa-app-bar--brand-strong cbf-app-bar--admin">
  <div class="esa-app-bar__row">
    <div class="esa-app-bar__start typography-label-md">
      <div class="cbf-nav-collapsible">
        <span
          class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--sm"
          ><button class="esa-button__native typography-microcopy-xs" type="button">
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
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                <path d="M3 12A9 3 0 0 0 21 12"></path>
              </svg>
            </span>
            <span class="esa-button__label">Data management</span
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
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </span></button
        ></span>
        <span
          class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--sm"
          ><button class="esa-button__native typography-microcopy-xs" type="button">
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
                <path
                  d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                ></path>
              </svg>
            </span>
            <span class="esa-button__label">System status</span
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
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </span></button
        ></span>
        <span
          class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--sm"
          ><button class="esa-button__native typography-microcopy-xs" type="button">
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
                <path
                  d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                ></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </span>
            <span class="esa-button__label">System configuration</span
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
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </span></button
        ></span>
      </div>
    </div>
    <div class="esa-app-bar__main typography-label-md">
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
    <div class="esa-app-bar__end typography-label-md">
      <div class="cbf-nav-collapsible">
        <details class="esa-nav-dropdown esa-nav-dropdown--end">
          <summary
            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--sm"
          >
            <span class="esa-button__native typography-microcopy-xs"
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </span>
              <span class="esa-button__label">Help</span
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
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            </span>
          </summary>
          <div class="esa-nav-dropdown__panel typography-body-md">
            <div class="esa-link-column">
              <span class="esa-link-column__head typography-label-md">Help</span>
              <hr class="esa-link-column__rule" />
              <ul class="esa-link-column__list">
                <li class="typography-body-sm">Help center</li>
                <li class="typography-body-sm">Data dictionary</li>
                <li class="typography-body-sm">EF&amp;W Program documents</li>
                <li class="typography-body-sm">Request support</li>
                <li class="typography-body-sm">Send feedback</li>
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
    <div class="esa-app-bar__start typography-label-md">
      <span class="cbf-nav-burger" data-nav-toggle="">
        <span
          class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md esa-button--icon-only"
          ><button
            class="esa-button__native typography-microcopy-md"
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
            </span></button
        ></span>
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
    <div class="esa-app-bar__main typography-label-md">
      <div class="cbf-nav-collapsible cbf-nav-collapsible--inline">
        <details class="esa-nav-dropdown esa-nav-dropdown--start">
          <summary
            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
          >
            <span class="esa-button__native typography-microcopy-md"
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
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
                  <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"></path>
                  <path d="M7 16v6"></path>
                  <path d="M13 19v3"></path>
                  <path
                    d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"
                  ></path>
                </svg>
              </span>
              <span class="esa-button__label">Mitigation work</span
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
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
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            </span>
          </summary>
          <div class="esa-nav-dropdown__panel typography-body-md">
            <div class="esa-link-column">
              <span class="esa-link-column__head typography-label-md">Mitigation work</span>
              <hr class="esa-link-column__rule" />
              <ul class="esa-link-column__list">
                <li class="typography-body-sm">Projects</li>
                <li class="typography-body-sm">Contracts</li>
                <li class="typography-body-sm">Portfolios</li>
                <li class="typography-body-sm">
                  <a href="/cb-fish-design/legacy/sow">Work elements</a>
                </li>
                <li class="typography-body-sm">Estuary program</li>
                <li class="typography-body-sm">Tributary habitat</li>
                <li class="typography-body-sm">Land acquisitions</li>
                <li class="typography-body-sm">
                  <a href="/cb-fish-design/rme-reporting">RM&amp;E reporting</a>
                </li>
              </ul>
            </div>
          </div>
        </details>
        <details class="esa-nav-dropdown esa-nav-dropdown--start">
          <summary
            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
          >
            <span class="esa-button__native typography-microcopy-md"
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
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
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
              </span>
              <span class="esa-button__label">Reporting</span
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
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
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            </span>
          </summary>
          <div class="esa-nav-dropdown__panel typography-body-md">
            <div class="esa-link-column">
              <span class="esa-link-column__head typography-label-md">Reporting</span>
              <hr class="esa-link-column__rule" />
              <ul class="esa-link-column__list">
                <li class="typography-body-sm">Report Center</li>
                <li class="typography-body-sm">Maps</li>
                <li class="typography-body-sm">Publications</li>
              </ul>
            </div>
          </div>
        </details>
        <details class="esa-nav-dropdown esa-nav-dropdown--start">
          <summary
            class="esa-button esa-button--variant-chrome esa-button--appearance-fill esa-button--md"
          >
            <span class="esa-button__native typography-microcopy-md"
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
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
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </span>
              <span class="esa-button__label">Funding</span
              ><span class="esa-icon esa-icon--md" aria-hidden="true">
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
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            </span>
          </summary>
          <div class="esa-nav-dropdown__panel typography-body-md">
            <div class="esa-link-column">
              <span class="esa-link-column__head typography-label-md">Funding</span>
              <hr class="esa-link-column__rule" />
              <ul class="esa-link-column__list">
                <li class="typography-body-sm">Funds</li>
                <li class="typography-body-sm">Fund budgets summary</li>
                <li class="typography-body-sm">Long-term funding agreements</li>
                <li class="typography-body-sm">
                  <a href="/cb-fish-design/project-budgets">Project budgets</a>
                </li>
                <li class="typography-body-sm">Working budgets</li>
                <li class="typography-body-sm">Expenditures</li>
                <li class="typography-body-sm">Accruals</li>
              </ul>
            </div>
          </div>
        </details>
      </div>
    </div>
    <div class="esa-app-bar__end typography-label-md">
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
        <a class="cbf-nav-link cbf-nav-link--collapse" href="/cb-fish-design/my-work">
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
            typing, or press <kbd class="esa-kbd typography-microcopy-xs">Tab</kbd> to choose a
            scope.
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
        <span
          ><kbd class="esa-kbd typography-microcopy-xs">↑</kbd>
          <kbd class="esa-kbd typography-microcopy-xs">↓</kbd> Navigate</span
        >
        <span><kbd class="esa-kbd typography-microcopy-xs">↵</kbd> Select</span>
        <span><kbd class="esa-kbd typography-microcopy-xs">Tab</kbd> Scope</span>
        <span><kbd class="esa-kbd typography-microcopy-xs">Esc</kbd> Close</span>
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
      <span class="esa-link-column__head typography-label-md">Mitigation work</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Projects</li>
        <li class="typography-body-sm">Contracts</li>
        <li class="typography-body-sm">Portfolios</li>
        <li class="typography-body-sm"><a href="/cb-fish-design/legacy/sow">Work elements</a></li>
        <li class="typography-body-sm">Estuary program</li>
        <li class="typography-body-sm">Tributary habitat</li>
        <li class="typography-body-sm">Land acquisitions</li>
        <li class="typography-body-sm">
          <a href="/cb-fish-design/rme-reporting">RM&amp;E reporting</a>
        </li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">Reporting</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Report Center</li>
        <li class="typography-body-sm">Maps</li>
        <li class="typography-body-sm">Publications</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">Funding</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Funds</li>
        <li class="typography-body-sm">Fund budgets summary</li>
        <li class="typography-body-sm">Long-term funding agreements</li>
        <li class="typography-body-sm">
          <a href="/cb-fish-design/project-budgets">Project budgets</a>
        </li>
        <li class="typography-body-sm">Working budgets</li>
        <li class="typography-body-sm">Expenditures</li>
        <li class="typography-body-sm">Accruals</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">Quick links</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm"><a href="#">Recent</a></li>
        <li class="typography-body-sm"><a href="/my-work">Dashboard</a></li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">System</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Data management</li>
        <li class="typography-body-sm">System status</li>
        <li class="typography-body-sm">System configuration</li>
      </ul>
    </div>
    <div class="esa-link-column">
      <span class="esa-link-column__head typography-label-md">Help</span>
      <hr class="esa-link-column__rule" />
      <ul class="esa-link-column__list">
        <li class="typography-body-sm">Help center</li>
        <li class="typography-body-sm">Data dictionary</li>
        <li class="typography-body-sm">EF&amp;W Program documents</li>
        <li class="typography-body-sm">Request support</li>
        <li class="typography-body-sm">Send feedback</li>
      </ul>
    </div>
  </nav>
</esa-side-dialog>
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
              <span class="esa-breadcrumbs__current typography-label-md"> Funding </span>
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
              <span class="esa-breadcrumbs__current typography-label-md"> Project budgets </span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="cbf-app-panel__body">
        <div class="cbf-app-panel__content">
          <h1 class="cbf-page-heading">Project budgets: Summary</h1>
          <nav class="cbf-report-tabs" aria-label="Project budget sections">
            <a class="cbf-report-tabs__tab is-active" href="#" aria-current="page">Summary</a
            ><a class="cbf-report-tabs__tab" href="/cb-fish-design/project-budgets/baselines"
              >Baselines</a
            ><a class="cbf-report-tabs__tab" href="#">Start-of-year (SOY)</a
            ><a class="cbf-report-tabs__tab" href="#">Decisions</a
            ><a class="cbf-report-tabs__tab" href="#">Change requests (BOG)</a>
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
            <h2 class="cbf-related-items__head typography-heading-md">Related items</h2>
            <div class="cbf-related-items__grid grid">
              <div class="esa-card esa-card--outlined">
                <div class="esa-card__header">
                  <div class="esa-card__header-content">
                    <div class="esa-card__titles">
                      <h3 class="esa-card__title typography-title-sm-strong">Reviews</h3>
                    </div>
                  </div>
                </div>
                <div class="esa-card__body typography-body-md">
                  <div class="cbf-related-items__card">
                    <p class="cbf-related-items__overview">
                      <strong>Overview:</strong> Review project budgets across fiscal years and
                      funds — open a working budget to inspect its baseline, start-of-year amount,
                      and the decisions and transfers applied through the year.
                    </p>
                  </div>
                </div>
                <div class="esa-card__footer typography-meta">
                  <div class="cbf-related-items__foot">
                    <span
                      class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
                      ><a class="esa-button__native typography-microcopy-xs" href="#" role="button"
                        ><span class="esa-button__label">View page</span></a
                      ></span
                    >
                  </div>
                </div>
              </div>
              <div class="esa-card esa-card--outlined">
                <div class="esa-card__header">
                  <div class="esa-card__header-content">
                    <div class="esa-card__titles">
                      <h3 class="esa-card__title typography-title-sm-strong">Featured reviews</h3>
                    </div>
                  </div>
                </div>
                <div class="esa-card__body typography-body-md">
                  <div class="cbf-related-items__card">
                    <p class="cbf-related-items__overview">
                      <strong>Overview:</strong> Curated budget reviews highlighted for quick access
                      — the project budget views financial analysts and project managers return to
                      most often.
                    </p>
                  </div>
                </div>
                <div class="esa-card__footer typography-meta">
                  <div class="cbf-related-items__foot">
                    <span
                      class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
                      ><a class="esa-button__native typography-microcopy-xs" href="#" role="button"
                        ><span class="esa-button__label">View page</span></a
                      ></span
                    >
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
  --animation-overlay-enter: 0.25s ease-out;
  --border-width-default: 1px;
  --breadcrumbs-bg: transparent;
  --breadcrumbs-link-color: #525252;
  --breadcrumbs-link-hover: #3d3d3d;
  --button-radius-md: 0.5rem;
  --button-radius-sm: 0.25rem;
  --card-bg: #fcfcfc;
  --card-border-color: #dcdcdc;
  --card-header-bg: transparent;
  --cbf-surface-crumb: #f4f4f4;
  --color-background-brand: #1e5386;
  --color-background-brand-hover: #1a4570;
  --color-background-default-knockout: #13273e;
  --color-background-elevation-raised: #fcfcfc;
  --color-background-elevation-sunken: #f3f7fc;
  --color-border-default: #dcdcdc;
  --color-border-default-strong: #bdbdbd;
  --color-border-default-subtle: #efefef;
  --color-content-brand: #1e5386;
  --color-content-default: #3d3d3d;
  --color-content-default-knockout: #fcfcfc;
  --color-content-default-secondary: #525252;
  --color-content-link: #1e5386;
  --color-gray-3: #f0f0f0;
  --elevation-5: 0 8px 32px -8px rgba(0, 0, 0, 0.08);
  --font-size-150: clamp(0.6875rem, 0.61rem + 0.38vw, 0.875rem);
  --icon-size-md: 20px;
  --icon-size-sm: 16px;
  --link-column-rule-color: color-mix(in srgb, currentColor 40%, transparent);
  --radius-100: 0.25rem;
  --radius-200: 0.5rem;
  --radius-md: 0.5rem;
  --side-dialog-inset: 16px;
  --side-dialog-width: 400px;
  --side-dialog-width-sm: 320px;
  --spacing-050: 0.125rem;
  --spacing-100: 0.25rem;
  --spacing-150: 0.375rem;
  --spacing-200: 0.5rem;
  --spacing-250: 0.625rem;
  --spacing-300: 0.75rem;
  --spacing-400: 1rem;
  --spacing-500: 1.5rem;
  --spacing-600: 2rem;
  --spacing-700: 3rem;
  --spacing-800: 4rem;
  --transition-fast: 0.15s ease;
  --typography-body-md-font-family: "IBM Plex Sans", sans-serif;
  --typography-body-md-font-size: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --typography-body-md-font-weight: 400;
  --typography-body-md-letter-spacing: 0.01em;
  --typography-body-md-line-height: 1.6;
  --typography-body-sm-font-family: "IBM Plex Sans", sans-serif;
  --typography-body-sm-font-size: clamp(0.6875rem, 0.61rem + 0.38vw, 0.875rem);
  --typography-body-sm-font-weight: 400;
  --typography-body-sm-letter-spacing: 0.01em;
  --typography-body-sm-line-height: 1.6;
  --typography-font-family-display: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif;
  --typography-font-family-sans: "IBM Plex Sans", sans-serif;
  --typography-font-weight-medium: 500;
  --typography-font-weight-semibold: 600;
  --typography-heading-md-font-family: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif;
  --typography-heading-md-font-size: clamp(1.125rem, 0.98rem + 0.72vw, 1.5rem);
  --typography-heading-md-font-weight: 600;
  --typography-heading-md-letter-spacing: -0.01em;
  --typography-heading-md-line-height: 1.3;
  --typography-label-md-font-family: "IBM Plex Sans", sans-serif;
  --typography-label-md-font-size: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --typography-label-md-font-weight: 500;
  --typography-label-md-letter-spacing: 0.01em;
  --typography-label-md-line-height: 1.6;
  --typography-meta-font-family: "IBM Plex Sans", sans-serif;
  --typography-meta-font-size: clamp(0.625rem, 0.56rem + 0.32vw, 0.75rem);
  --typography-meta-font-weight: 400;
  --typography-meta-letter-spacing: 0.01em;
  --typography-meta-line-height: 1.6;
  --typography-microcopy-md-font-family: "IBM Plex Sans", sans-serif;
  --typography-microcopy-md-font-size: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --typography-microcopy-md-font-weight: 500;
  --typography-microcopy-md-letter-spacing: 0.01em;
  --typography-microcopy-md-line-height: 1;
  --typography-microcopy-xs-font-family: "IBM Plex Sans", sans-serif;
  --typography-microcopy-xs-font-size: clamp(0.625rem, 0.56rem + 0.32vw, 0.75rem);
  --typography-microcopy-xs-font-weight: 500;
  --typography-microcopy-xs-letter-spacing: 0.01em;
  --typography-microcopy-xs-line-height: 1;
  --typography-title-sm-strong-font-family: "IBM Plex Sans", sans-serif;
  --typography-title-sm-strong-font-size: clamp(0.8125rem, 0.71rem + 0.5vw, 1.0625rem);
  --typography-title-sm-strong-font-weight: 600;
  --typography-title-sm-strong-letter-spacing: 0.01em;
  --typography-title-sm-strong-line-height: 1.6;
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
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
}
:host {
  --_width: var(--side-dialog-width, 400px);
}
:host([size="sm"]) {
  --_width: var(--side-dialog-width-sm, 320px);
}
dialog.panel {
  --_inset: var(--side-dialog-inset, 16px);
  position: fixed;
  top: var(--_inset);
  bottom: var(--_inset);
  margin: 0;
  border: none;
  padding: 0;
  width: min(var(--_width), calc(100vw - var(--_inset) * 2));
  max-width: none;
  max-height: none;
  background: var(--color-background-elevation-raised, #fcfcfc);
  color: var(--color-content-default, #202020);
  border-radius: var(--radius-md, 0.5rem);
  box-shadow: var(--elevation-5, 0 8px 32px -8px rgba(0, 0, 0, 0.2));
  outline: none;
  overflow: hidden;
  /* Hosts may re-point --side-dialog-inset while open (e.g. card-stacking a
         second dialog on top) — ease the reposition instead of jumping. */
  transition:
    top 220ms ease,
    right 220ms ease,
    bottom 220ms ease,
    left 220ms ease;
}
:host([position="left"]) dialog.panel {
  left: var(--_inset);
  animation: slide-left var(--animation-overlay-enter, 250ms ease-out);
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
.typography-body-sm {
  font-family: var(--typography-body-sm-font-family);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--typography-body-sm-font-weight);
  line-height: var(--typography-body-sm-line-height);
  letter-spacing: var(--typography-body-sm-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-heading-md {
  font-family: var(--typography-heading-md-font-family);
  font-size: var(--typography-heading-md-font-size);
  font-weight: var(--typography-heading-md-font-weight);
  line-height: var(--typography-heading-md-line-height);
  letter-spacing: var(--typography-heading-md-letter-spacing);
}
.typography-title-sm-strong {
  font-family: var(--typography-title-sm-strong-font-family);
  font-size: var(--typography-title-sm-strong-font-size);
  font-weight: var(--typography-title-sm-strong-font-weight);
  line-height: var(--typography-title-sm-strong-line-height);
  letter-spacing: var(--typography-title-sm-strong-letter-spacing);
}
.typography-meta {
  font-family: var(--typography-meta-font-family);
  font-size: var(--typography-meta-font-size);
  font-weight: var(--typography-meta-font-weight);
  line-height: var(--typography-meta-line-height);
  letter-spacing: var(--typography-meta-letter-spacing);
}
:host {
  all: initial;
}
.host-root {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483000;
  font-family: system-ui, sans-serif;
}
.host-root > * {
  pointer-events: auto;
}
.launch {
  position: fixed;
  bottom: 22px;
  left: 22px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 19px;
  border-radius: 999px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  border: 1px solid #3d6fd6;
  background: linear-gradient(180deg, #1f6feb, #1551c4);
  box-shadow:
    0 10px 28px -8px rgba(31, 111, 235, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease;
}
.launch svg {
  flex: none;
}
.panel {
  position: fixed;
  top: 18px;
  right: 18px;
  bottom: 18px;
  width: min(720px, 94vw);
  display: flex;
  flex-direction: column;
  color: #ffffff;
  border-radius: 16px;
  background: linear-gradient(155deg, rgba(26, 31, 40, 0.74), rgba(11, 15, 21, 0.86));
  backdrop-filter: blur(26px) saturate(150%);
  -webkit-backdrop-filter: blur(26px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 28px 70px -18px rgba(0, 0, 0, 0.62),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  font-size: 12.5px;
  overflow: hidden;
  /* slide in from the right */
  transform: translateX(calc(100% + 32px));
  opacity: 0;
  visibility: hidden;
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.22s ease,
    visibility 0s linear 0.3s;
}
.head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
.head strong {
  font-size: 14px;
}
.head .sub {
  flex: 1;
  color: #ccd5e0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.x {
  border: 0;
  background: none;
  color: #c4cdd8;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.picker {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chip {
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: #eef2f6;
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.12s ease,
    background 0.12s ease,
    color 0.12s ease;
}
.chip.on {
  background: rgba(31, 111, 235, 0.28);
  border-color: #4493f8;
  color: #fff;
  font-weight: 600;
}
.tabs {
  display: flex;
  gap: 4px;
  padding: 9px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
.tabs button {
  padding: 5px 12px;
  border: 0;
  border-radius: 6px;
  background: none;
  color: #ccd5e0;
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
}
.tabs button.on {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}
.body {
  overflow: auto;
  padding: 13px 16px;
  flex: 1;
}
.hint {
  margin: 0;
  color: #c4cdd8;
  line-height: 1.6;
}
.footer {
  position: relative;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 11px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.18);
}
[hidden] {
  display: none !important;
}
.cpreview {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: calc(100% + 8px);
  background: rgba(13, 17, 23, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  box-shadow: 0 18px 50px -14px rgba(0, 0, 0, 0.7);
  padding: 12px 14px;
  max-height: 50vh;
  overflow: auto;
}
.copy {
  color: #eef2f6;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
}
.footer button {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 8px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
}
.claude {
  color: #fff;
  border: 1px solid #d97757;
  background: linear-gradient(180deg, #e0805f, #c25e3c);
  box-shadow:
    0 6px 18px -6px rgba(217, 119, 87, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.claude svg {
  flex: none;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
  color: var(--color-content-default, #171717);
  background: var(--color-background-elevation-raised, #fff);
  -webkit-font-smoothing: antialiased;
}
.esa-app-bar {
  --_bar-gap: var(--spacing-600, 32px);
  --_bar-pad-x: var(--spacing-600, 32px);
  --_bar-pad-y: var(--spacing-400, 16px);
  display: block;
  width: 100%;
  background: var(--color-background-elevation-raised, #fcfcfc);
  color: var(--color-content-default, #202020);
}
.esa-app-bar--brand-strong {
  background: var(--color-background-default-knockout, #202020);
  color: var(--color-content-default-knockout, #fcfcfc);
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
button {
  font-family: inherit;
  cursor: pointer;
  background: none;
  border: 0;
}
.esa-app-bar__main {
  flex: 1 1 auto;
  min-width: 0;
}
.esa-app-bar__end {
  flex: none;
  margin-left: auto;
}
.esa-app-bar--brand {
  background: var(--color-background-brand, #46a758);
  color: var(--color-content-default-knockout, #fcfcfc);
}
a {
  color: var(--color-content-link, #1e5386);
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
.esa-link-column {
  color: inherit;
}
.esa-link-column__head {
  display: block;
  margin: 0 0 var(--spacing-100, 4px);
  font-size: var(--typography-label-md-font-size);
  color: inherit;
  text-decoration-color: transparent;
}
.esa-link-column__rule {
  height: 1px;
  border: 0;
  margin: 0 0 var(--spacing-200, 8px);
  background: var(--link-column-rule-color, color-mix(in srgb, currentColor 40%, transparent));
}
:where(h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd, ul, ol, pre) {
  margin: 0;
}
.esa-link-column__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.esa-link-column__list li {
  font-size: var(--font-size-150, var(--typography-body-sm-font-size));
  margin-bottom: var(--spacing-100, 4px);
}
.esa-link-column__list a {
  color: inherit;
  text-decoration-color: transparent;
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
.cbf-page-heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-300, 12px);
  margin: 0;
  font-family: var(--typography-font-family-display);
  font-weight: var(--typography-font-weight-medium);
  font-size: 40px;
  line-height: 40px;
  letter-spacing: -1px;
  color: var(--color-background-default-knockout);
}
.cbf-report-tabs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-100);
  padding: var(--spacing-150);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-200, 8px);
  background: var(--color-gray-3);
}
.cbf-report-tabs__tab {
  padding: var(--spacing-200) var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-background-brand);
  font-size: 16px;
  font-weight: var(--typography-font-weight-medium);
  white-space: nowrap;
}
.cbf-report-tabs__tab.is-active {
  background: var(--color-background-elevation-raised, #fff);
  color: var(--color-background-default-knockout);
  font-weight: var(--typography-font-weight-semibold);
  box-shadow: 0 1px 2px
    color-mix(in srgb, var(--color-background-default-knockout) 12%, transparent);
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
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
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
.cbf-related-items {
  padding-top: var(--spacing-600);
  border-top: 1px solid var(--color-border-default);
}
.cbf-related-items__head {
  margin: 0 0 var(--spacing-400);
}
.cbf-related-items__grid {
  --grid-min: 20rem;
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
.esa-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-400, 1rem) var(--_card-padding);
  background: var(--_card-header-bg);
  color: var(--_card-header-color);
  border-bottom: var(--border-width-default, 1px) solid var(--_card-header-border);
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
  margin: 0;
  color: inherit;
}
.esa-card__body {
  padding: var(--_card-padding);
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
  color: var(--color-content-default-secondary);
}
.cbf-related-items__overview strong,
.cbf-related-items__meta strong {
  color: var(--color-content-default);
}
.esa-card__footer {
  padding: var(--spacing-300, 0.75rem) var(--_card-padding);
  border-top: var(--border-width-default, 1px) solid var(--_card-header-border);
  background: var(--color-background-elevation-sunken, #f0f0f0);
}
.cbf-related-items__foot {
  display: flex;
  justify-content: flex-end;
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
  font-family: var(--typography-font-family-sans);
  font-size: 13px;
  font-weight: var(--typography-font-weight-medium);
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
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
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
  font-weight: var(--typography-font-weight-medium);
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
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--animation-overlay-enter` | `.25s ease-out` | semantic |
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
| `--color-content-link` | `#1e5386` | semantic |
| `--color-gray-3` | `#f0f0f0` | primitive |
| `--elevation-5` | `0 8px 32px -8px rgba(0, 0, 0, .08)` | semantic |
| `--font-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--icon-size-md` | `20px` | primitive |
| `--icon-size-sm` | `16px` | primitive |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-200` | `.5rem` | primitive |
| `--radius-md` | `.5rem` | semantic |
| `--side-dialog-inset` | `16px` | component |
| `--side-dialog-width` | `400px` | component |
| `--side-dialog-width-sm` | `320px` | component |
| `--spacing-050` | `.125rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
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
| `--typography-body-sm-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-body-sm-font-size` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | semantic |
| `--typography-body-sm-font-weight` | `400` | semantic |
| `--typography-body-sm-letter-spacing` | `.01em` | semantic |
| `--typography-body-sm-line-height` | `1.6` | semantic |
| `--typography-font-family-display` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-family-sans` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
| `--typography-heading-md-font-family` | `"IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif` | semantic |
| `--typography-heading-md-font-size` | `clamp(1.125rem, .98rem + .72vw, 1.5rem)` | semantic |
| `--typography-heading-md-font-weight` | `600` | semantic |
| `--typography-heading-md-letter-spacing` | `-.01em` | semantic |
| `--typography-heading-md-line-height` | `1.3` | semantic |
| `--typography-label-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-label-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-label-md-font-weight` | `500` | semantic |
| `--typography-label-md-letter-spacing` | `.01em` | semantic |
| `--typography-label-md-line-height` | `1.6` | semantic |
| `--typography-meta-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-meta-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-meta-font-weight` | `400` | semantic |
| `--typography-meta-letter-spacing` | `.01em` | semantic |
| `--typography-meta-line-height` | `1.6` | semantic |
| `--typography-microcopy-md-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-md-font-size` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | semantic |
| `--typography-microcopy-md-font-weight` | `500` | semantic |
| `--typography-microcopy-md-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-md-line-height` | `1` | semantic |
| `--typography-microcopy-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-font-weight` | `500` | semantic |
| `--typography-microcopy-xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-line-height` | `1` | semantic |
| `--typography-title-sm-strong-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-title-sm-strong-font-size` | `clamp(.8125rem, .71rem + .5vw, 1.0625rem)` | semantic |
| `--typography-title-sm-strong-font-weight` | `600` | semantic |
| `--typography-title-sm-strong-letter-spacing` | `.01em` | semantic |
| `--typography-title-sm-strong-line-height` | `1.6` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
