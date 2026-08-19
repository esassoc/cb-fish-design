# Full page

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **map-sow** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/map-sow/
- **Section element:** `<page>`
- **Components:** cbf-app-bar (spoke), cbf-icon (spoke), cbf-logo (spoke), cbf-nav-actions (spoke), cbf-nav-burger (spoke), cbf-nav-collapsible (spoke), cbf-nav-drawer (spoke), cbf-nav-link (spoke), cbf-omni (spoke), cbf-omni-trigger (spoke), cbf-search-surface (spoke), esa-app-bar (hub), esa-breadcrumbs (hub), esa-button (hub), esa-container (hub), esa-empty-state (hub), esa-icon (hub), esa-kbd (hub), esa-link-column (hub), esa-nav-dropdown (hub)

## Markup (de-scoped, framework-free)
```html
<a href="#map" class="skip-link">Skip to map</a>
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
<main class="msow-page">
  <div class="esa-container typography-body-md" style="--_container-max: 1920px">
    <div class="msow-card">
      <!-- Gold breadcrumb strip -->
      <div class="msow-crumb-strip">
        <nav class="esa-breadcrumbs esa-breadcrumbs--md" aria-label="Breadcrumb">
          <ol class="esa-breadcrumbs__list">
            <li class="esa-breadcrumbs__item">
              <span class="esa-breadcrumbs__current typography-label-md">
                Projects &amp; Contracts
              </span>
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
              <span class="esa-breadcrumbs__current typography-label-md"> Projects </span>
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
              <span class="esa-breadcrumbs__current typography-label-md"> 2023-001-00 </span>
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
              <span class="esa-breadcrumbs__current typography-label-md"> Contracts </span>
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
              <span class="esa-breadcrumbs__current typography-label-md"> 84051 REL 50 </span>
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
              <a href="/cb-fish-design/legacy/sow" class="esa-breadcrumbs__link typography-body-md">
                SOW Rev 2
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
              <a href="/cb-fish-design/legacy/we" class="esa-breadcrumbs__link typography-body-md">
                Summary of H: 175. Produce Design - Upper Chewuch Floodplain Enhancement
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
              <span class="esa-breadcrumbs__current typography-label-md">
                Habitat Design Tool
              </span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="msow-toolbar">
        <div class="msow-toolbar-identity">
          <h1 class="msow-tool-title">Habitat Design Tool</h1>
          <div class="msow-contract-meta">
            <span>#84051 REL 50</span> <span class="msow-meta-sep">·</span> <span>FY 2026</span>
            <span class="msow-meta-sep">·</span> <span>Virginia Preiss</span>
          </div>
        </div>
        <!-- bcn-lego-checked: the block below is commented-out reference markup, not live UI —
       the WE selector is disabled per product decision (kept for easy restore). When
       restored, rebuild it with esa-select and esa-icon-button rather than the raw
       select/button shown here.
  <div class="msow-we-selector">
    <select
      id="msow-we-dropdown"
      class="msow-we-select"
      onchange="selectWEFromDropdown(this.value)"
      aria-label="Select work element"
    >
      <option value="">— No work elements yet —</option>
    </select>
    <button
      id="we-edit-btn"
      class="msow-we-action-btn"
      onclick="openWEModal(activeWEId)"
      title="Edit work element"
      disabled
    >&#9998;</button>
    <button
      id="we-delete-btn"
      class="msow-we-action-btn msow-we-action-btn--danger"
      onclick="deleteWE(activeWEId)"
      title="Delete work element"
      disabled
    >&#10005;</button>
    <span onclick="openWEModal(null)">
      <EsaButton variant="primary" size="sm" icon="plus">Add WE</EsaButton>
    </span>
  </div>
  -->
        <div class="msow-toolbar-actions">
          <!-- Modeled on the real CBFish "Back to SOW" button — same placement (leftmost
         in the action row, ghost/outline), same purpose: return to wherever this
         tool session was launched from. -->
          <span
            class="esa-button esa-button--variant-ghost esa-button--appearance-outline esa-button--sm"
            ><a
              class="esa-button__native typography-microcopy-xs"
              href="/cb-fish-design/legacy/we"
              role="button"
              ><span class="esa-button__label">← Back to Work Element</span></a
            ></span
          >
          <span onclick="clearAll()">
            <span
              class="esa-button esa-button--variant-ghost esa-button--appearance-outline esa-button--sm"
              ><button class="esa-button__native typography-microcopy-xs" type="button">
                <span class="esa-button__label">Clear All</span>
              </button></span
            >
          </span>
          <span onclick="openSOW()">
            <span
              class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
              ><button class="esa-button__native typography-microcopy-xs" type="button">
                <span class="esa-button__label">Export Metrics</span>
              </button></span
            >
          </span>
        </div>
      </div>
      <!-- GIS layout: [wizard column] [collapse rail] [sidebar] [map] — wizard only visible when active -->
      <div class="msow-root">
        <div id="msow-layout">
          <div id="wizard-panel" role="region" aria-label="Guided workflow">
            <div class="wz-v-steps">
              <div class="wz-v-section open">
                <div class="wz-v-phase-head" onclick="toggleWzSection('pp')">
                  <span class="wz-v-phase-caret">▼</span
                  ><span class="wz-v-phase-label">Pre-Project</span
                  ><span class="wz-v-phase-count">0/10</span>
                </div>
                <div class="wz-v-section-body">
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(0)"
                    title="Go to: Project Boundary"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle active">1</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label active">Project Boundary</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(1)"
                    title="Go to: Stream Reach"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">2</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Stream Reach</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(2)"
                    title="Go to: Channel Width"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">3</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Channel Width</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(3)"
                    title="Go to: Substrate"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">4</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Substrate</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(4)"
                    title="Go to: Floodplain"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">5</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Floodplain</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(5)"
                    title="Go to: Review Areas"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">6</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Review Areas</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(6)"
                    title="Go to: Existing Wetlands"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">7</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Existing Wetlands</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(7)"
                    title="Go to: Existing Pools"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">8</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Existing Pools</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(8)"
                    title="Go to: Pool &amp; Riffle Details"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">9</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Pool &amp; Riffle Details</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(9)"
                    title="Go to: Pre-Project Done"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">10</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Pre-Project Done</div>
                  </div>
                </div>
              </div>
              <div class="wz-phase-group" data-phase="work">
                <div class="wz-phase-group-title">Project Design</div>
                <div class="wz-v-section">
                  <div class="wz-v-phase-head" onclick="toggleWzSection('pc-0')">
                    <span class="wz-v-phase-caret">▸</span
                    ><span class="wz-v-phase-label">Primary Channel</span
                    ><span class="wz-v-phase-count">0/9</span>
                  </div>
                  <div class="wz-v-section-body">
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(10)"
                      title="Go to: Primary Channel"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">11</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Primary Channel</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(11)"
                      title="Go to: Channel Width"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">12</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Channel Width</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(12)"
                      title="Go to: Metrics"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">13</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Metrics</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(13)"
                      title="Go to: Gravel Placement"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">14</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Gravel Placement</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(14)"
                      title="Go to: New Floodplain"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">15</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">New Floodplain</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(15)"
                      title="Go to: Identify Pools"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">16</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Identify Pools</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(16)"
                      title="Go to: Pool &amp; Riffle Details"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">17</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Pool &amp; Riffle Details</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(17)"
                      title="Go to: Structures"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">18</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Structures</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(18)"
                      title="Go to: Channel Complete"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">19</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Channel Complete</div>
                    </div>
                  </div>
                </div>
                <div class="wz-v-section">
                  <div class="wz-v-phase-head" onclick="toggleWzSection('sc')">
                    <span class="wz-v-phase-caret">▸</span
                    ><span class="wz-v-phase-label">Secondary Channels</span
                    ><span class="wz-v-phase-count">0/2</span>
                  </div>
                  <div class="wz-v-section-body">
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(19)"
                      title="Go to: Secondary Channels"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">20</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Secondary Channels</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(20)"
                      title="Go to: Wood Counts"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">21</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Wood Counts</div>
                    </div>
                  </div>
                </div>
                <div class="wz-v-section">
                  <div class="wz-v-phase-head" onclick="toggleWzSection('fp')">
                    <span class="wz-v-phase-caret">▸</span
                    ><span class="wz-v-phase-label">Floodplain</span
                    ><span class="wz-v-phase-count">0/8</span>
                  </div>
                  <div class="wz-v-section-body">
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(21)"
                      title="Go to: Structures"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">22</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Structures</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(22)"
                      title="Go to: Floodplain Width"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">23</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Floodplain Width</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(23)"
                      title="Go to: Grading"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">24</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Grading</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(24)"
                      title="Go to: Road Removal"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">25</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Road Removal</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(25)"
                      title="Go to: Berm Removal"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">26</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Berm Removal</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(26)"
                      title="Go to: Revetment Removal"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">27</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Revetment Removal</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(27)"
                      title="Go to: Mine Tailings"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">28</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Mine Tailings</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(28)"
                      title="Go to: Wetland Enhancement"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">29</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Wetland Enhancement</div>
                    </div>
                  </div>
                </div>
                <div class="wz-v-section">
                  <div class="wz-v-phase-head" onclick="toggleWzSection('rr')">
                    <span class="wz-v-phase-caret">▸</span
                    ><span class="wz-v-phase-label">Riparian Restoration</span
                    ><span class="wz-v-phase-count">0/4</span>
                  </div>
                  <div class="wz-v-section-body">
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(29)"
                      title="Go to: Fencing"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">30</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Fencing</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(30)"
                      title="Go to: Planting &amp; Invasive"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">31</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Planting &amp; Invasive</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(31)"
                      title="Go to: Bank &amp; Totals"
                    >
                      <div class="wz-v-left">
                        <div class="wz-v-circle">32</div>
                        <div class="wz-v-line"></div>
                      </div>
                      <div class="wz-v-label">Bank &amp; Totals</div>
                    </div>
                    <div
                      class="wz-v-item wz-v-item--nav"
                      onclick="wizardGoToStep(32)"
                      title="Go to: Complete"
                    >
                      <div class="wz-v-left"><div class="wz-v-circle">33</div></div>
                      <div class="wz-v-label">Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- bcn-lego-checked: a floating rail-edge control docked to the panel boundary,
                 not a form action — same exception already established for #edit-done-bar's
                 .msow-done-btn/.msow-pan-btn and the map legend's #leg-toggle (esa-icon-button
                 has no docked-to-a-panel-edge variant). A sibling of #wizard-panel (not nested
                 inside it) so it stays visible and clickable when the panel's width collapses
                 to 0 and overflow:hidden clips its contents — see toggleWizardPanel() in
                 map-sow.js. -->
          <button
            id="wizard-collapse-toggle"
            class="msow-wizard-collapse-toggle"
            onclick="toggleWizardPanel()"
            aria-label="Collapse steps panel"
            aria-expanded="true"
            aria-controls="wizard-panel"
            title="Collapse steps panel"
          >
            ❮
          </button>
          <div id="sidebar" role="complementary" aria-label="Work element details">
            <!-- Wizard step body — shown when guided mode is active -->
            <div id="wizard-body-panel">
              <div class="wz-body">
                <div class="wz-step-num">Step 1 of 33</div>
                <div class="wz-step-title">Draw Project Boundary</div>
                <div class="wz-step-desc">
                  Draw the outer boundary of your project area. This helps auto-clip the stream
                  reach and other features to your site.
                </div>
                <div class="wz-help">
                  <div class="wz-help-head" onclick="toggleWzHelp(this)">
                    <span class="wz-help-icon">ⓘ</span><span>Learn more about Project Boundary</span
                    ><span class="wz-help-caret">▼</span>
                  </div>
                  <div class="wz-help-body">
                    Help content coming soon — this will define key terms and show reference photos
                    for this step.
                  </div>
                </div>
                <div class="wz-status pending">
                  ▶ Click the button below, then click on the map to place polygon vertices.
                  Double-click to finish.
                </div>
                <button class="wz-action-btn" onclick="wizardDraw('perimeter')">
                  ■ Draw Project Boundary
                </button>
              </div>
              <div class="wz-footer">
                <button class="wz-btn-back" disabled="" onclick="wizardBack()">‹ Back</button
                ><button class="wz-btn-next" disabled="" onclick="wizardNext()">Next ›</button>
              </div>
            </div>
            <!-- Expert panel — default view -->
            <div id="expert-panel">
              <div id="sidebar-empty" aria-live="polite" style="display: none">
                <div class="esa-empty-state esa-empty-state--sm">
                  <h3 class="esa-empty-state__title typography-label-sm-strong">
                    No work element selected
                  </h3>
                  <p class="esa-empty-state__description typography-body-xs">
                    Add a work element to begin entering pre-project metrics and habitat work
                    details.
                  </p>
                  <div class="esa-empty-state__actions typography-label-md"></div>
                </div>
              </div>
              <esa-tab-layout
                id="inner-tabbar"
                size="sm"
                aria-label="Work element sections"
                variant="underline"
                appearance="underline"
                style="display: flex"
              ></esa-tab-layout>
              <div
                id="pp-side"
                role="tabpanel"
                style="display: flex; flex-direction: column; flex: 1 1 0%; overflow: hidden"
              >
                <div class="pp-progress">
                  <div class="sbt"><span class="sbt-dot"></span>Pre-Project Conditions</div>
                  <div class="pp-prog-row">
                    <div class="pp-prog-wrap">
                      <div class="pp-prog-bar" id="pp-prog" style="width: 0%"></div>
                    </div>
                    <span class="pp-prog-pct" id="pp-prog-pct">0%</span>
                  </div>
                  <div
                    style="font-size: 10px; color: var(--msow-muted-text, #8aaccc); margin-top: 4px"
                  >
                    Hover to highlight. Click row to zoom.
                  </div>
                </div>
                <div id="pp-metrics-list">
                  <div id="pm-row-perimeter" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Project Perimeter</span></div>
                    <div class="pm-desc">Generalized boundary of the project footprint.</div>
                    <div class="pm-meas-row">
                      <button class="pm-draw-btn" onclick="startPPDraw('perimeter', 0)">
                        ▮ Draw polygon</button
                      ><span class="pm-not-drawn">not drawn</span>
                    </div>
                  </div>
                  <div id="pm-row-reach_len" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Reach Length</span></div>
                    <div class="pm-desc">C/L of existing stream channel.</div>
                    <div class="pm-meas-row">
                      <button class="pm-draw-btn" onclick="startPPDraw('reach_len', 0)">
                        📏 Draw line</button
                      ><button class="pm-draw-btn" onclick="startReachAutoDetect()">
                        🌐 Auto-detect</button
                      ><span class="pm-not-drawn">not drawn</span>
                    </div>
                  </div>
                  <div id="pm-row-valley_len" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Valley Length</span></div>
                    <div class="pm-desc">
                      Straight-line distance between reach start and end points (auto-calculated
                      from reach).
                    </div>
                    <span class="pm-waiting">Draw a reach line to auto-calculate</span>
                  </div>
                  <div id="pm-row-sinuosity" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Sinuosity</span></div>
                    <div class="pm-desc">Reach Length divided by Valley Length.</div>
                    <span class="pm-waiting">Draw a reach line to auto-calculate</span>
                  </div>
                  <div id="pm-row-avg_slope" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Average Reach Slope</span></div>
                    <div class="pm-desc">Auto-calculated from USGS 10M DEM elevation data.</div>
                    <span class="pm-waiting">Draw a reach line to auto-calculate</span>
                    <div class="elev-panel">
                      <div class="elev-title">▲ Elevation Profile</div>
                      <div class="elev-loading">Fetching elevation profile…</div>
                    </div>
                  </div>
                  <div id="pm-row-ch_width" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Average Channel Width</span></div>
                    <div class="pm-desc">
                      3 cross-section lines at representative riffle locations.
                    </div>
                    <div class="pm-meas-row">
                      <span class="pm-waiting"
                        >📏 Draw your reach line first before measuring channel widths.</span
                      >
                    </div>
                  </div>
                  <div id="pm-row-bank_ht" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Average Bank Height</span></div>
                    <div class="pm-desc">
                      Auto-calculated as the average of bank heights entered with each channel width
                      measurement.
                    </div>
                    <span class="pm-waiting"
                      >Enter bank height with each channel width measurement</span
                    >
                  </div>
                  <div id="pm-row-area_ch" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Area of Channel</span></div>
                    <div class="pm-desc">Digitize over data layers.</div>
                    <div class="pm-meas-row">
                      <button class="pm-draw-btn" onclick="startPPDraw('area_ch', 0)">
                        ▮ Draw polygon</button
                      ><span class="pm-not-drawn" style="margin-left: 6px"
                        >or draw reach length &amp; channel width</span
                      >
                    </div>
                  </div>
                  <div id="pm-row-fp_left" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Left Floodplain Area</span></div>
                    <div class="pm-desc">
                      Draw the outer edge of the left floodplain — inner edge auto-completes along
                      channel buffer.
                    </div>
                    <div class="pm-meas-row">
                      <span class="pm-waiting"
                        >📏 Draw your reach line first before drawing floodplain boundaries.</span
                      >
                    </div>
                  </div>
                  <div id="pm-row-fp_right" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Right Floodplain Area</span></div>
                    <div class="pm-desc">
                      Draw the outer edge of the right floodplain — inner edge auto-completes along
                      channel buffer.
                    </div>
                    <div class="pm-meas-row">
                      <span class="pm-waiting"
                        >📏 Draw your reach line first before drawing floodplain boundaries.</span
                      >
                    </div>
                  </div>
                  <div id="pm-row-fp_width" class="pm-row">
                    <div class="pm-head">
                      <span class="pm-label">Average Width of Floodplain</span>
                    </div>
                    <div class="pm-desc">
                      Auto-calculated: Total floodplain area ÷ reach length.
                    </div>
                    <span class="pm-waiting"
                      >Draw floodplain polygons and reach length to calculate</span
                    >
                  </div>
                  <div id="pm-row-area_fp" class="pm-row">
                    <div class="pm-head">
                      <span class="pm-label">Total Active Floodplain Area</span>
                    </div>
                    <div class="pm-desc">Auto-calculated: Left + Right floodplain areas.</div>
                    <span class="pm-waiting">Draw Left and/or Right floodplain polygons</span>
                  </div>
                  <div id="pm-row-fp_poly" class="pm-row">
                    <div class="pm-head"><span class="pm-label">Floodplain Area</span></div>
                    <div class="pm-desc">
                      Draw the floodplain extent — the stream channel is subtracted automatically to
                      give net floodplain area.
                    </div>
                    <div class="pm-meas-row">
                      <button class="pm-draw-btn" onclick="startPPDraw('fp_poly', 0)">
                        ▮ Draw polygon</button
                      ><span class="pm-not-drawn">not drawn</span>
                    </div>
                  </div>
                  <div id="pm-row-pc_fp" class="pm-row">
                    <div class="pm-head"><span class="pm-label">New Floodplain</span></div>
                    <div class="pm-desc">
                      Draw the designed floodplain extent — the primary channel area is subtracted
                      automatically.
                    </div>
                    <div class="pm-meas-row">
                      <button class="pm-draw-btn" onclick="startPPDraw('pc_fp', 0)">
                        ▮ Draw polygon</button
                      ><span class="pm-not-drawn">not drawn</span>
                    </div>
                  </div>
                  <div id="pm-row-substrate" class="pm-row">
                    <div class="pm-head">
                      <span class="pm-label">Reach-Averaged Substrate</span>
                    </div>
                    <div class="pm-desc">Prioritization substrate data layer.</div>
                    <esa-select
                      class="pm-input"
                      size="sm"
                      onchange="ppSetVal('substrate', this.value)"
                    ></esa-select>
                  </div>
                </div>
              </div>
              <div id="work-side" role="tabpanel" style="display: none"></div>
            </div>
          </div>
          <div
            id="mapwrap"
            role="application"
            aria-label="Interactive map — use the sidebar controls to draw features"
          >
            <div
              id="map"
              role="application"
              aria-label="Interactive map"
              class="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
              style="position: relative"
              tabindex="0"
            >
              <div
                class="leaflet-pane leaflet-map-pane"
                style="transform: translate3d(0px, 0px, 0px)"
              >
                <div class="leaflet-pane leaflet-tile-pane">
                  <div class="leaflet-layer" style="z-index: 1; opacity: 1">
                    <div
                      class="leaflet-tile-container leaflet-zoom-animated"
                      style="z-index: 19; transform: translate3d(0px, 0px, 0px) scale(1)"
                    >
                      <img
                        alt=""
                        src="https://c.basemaps.cartocdn.com/rastertiles/voyager/7/20/45.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(23px, 183px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://a.basemaps.cartocdn.com/rastertiles/voyager/7/21/45.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(279px, 183px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://b.basemaps.cartocdn.com/rastertiles/voyager/7/20/44.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(23px, -73px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://c.basemaps.cartocdn.com/rastertiles/voyager/7/21/44.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(279px, -73px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://a.basemaps.cartocdn.com/rastertiles/voyager/7/20/46.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(23px, 439px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://b.basemaps.cartocdn.com/rastertiles/voyager/7/21/46.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(279px, 439px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://b.basemaps.cartocdn.com/rastertiles/voyager/7/19/45.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-233px, 183px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://b.basemaps.cartocdn.com/rastertiles/voyager/7/22/45.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(535px, 183px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://a.basemaps.cartocdn.com/rastertiles/voyager/7/19/44.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-233px, -73px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://a.basemaps.cartocdn.com/rastertiles/voyager/7/22/44.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(535px, -73px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://c.basemaps.cartocdn.com/rastertiles/voyager/7/19/46.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-233px, 439px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://c.basemaps.cartocdn.com/rastertiles/voyager/7/22/46.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(535px, 439px, 0px);
                          opacity: 1;
                        "
                      />
                    </div>
                  </div>
                  <div class="leaflet-layer" style="z-index: 1; opacity: 1">
                    <div
                      class="leaflet-tile-container leaflet-zoom-animated"
                      style="z-index: 20; transform: translate3d(0px, 0px, 0px) scale(1)"
                    >
                      <img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/45/20"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(23px, 183px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/45/21"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(279px, 183px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/44/20"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(23px, -73px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/44/21"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(279px, -73px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/46/20"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(23px, 439px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/46/21"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(279px, 439px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/45/19"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-233px, 183px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/45/22"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(535px, 183px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/44/19"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-233px, -73px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/44/22"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(535px, -73px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/46/19"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-233px, 439px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/46/22"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(535px, 439px, 0px);
                          opacity: 1;
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="leaflet-pane leaflet-overlay-pane"></div>
                <div class="leaflet-pane leaflet-shadow-pane"></div>
                <div class="leaflet-pane leaflet-marker-pane"></div>
                <div class="leaflet-pane leaflet-tooltip-pane"></div>
                <div class="leaflet-pane leaflet-popup-pane"></div>
                <div class="leaflet-proxy leaflet-zoom-animated"></div>
              </div>
              <div class="leaflet-control-container">
                <div class="leaflet-top leaflet-left">
                  <div class="leaflet-control-zoom leaflet-bar leaflet-control">
                    <a
                      class="leaflet-control-zoom-in"
                      href="#"
                      title="Zoom in"
                      role="button"
                      aria-label="Zoom in"
                      aria-disabled="false"
                      ><span aria-hidden="true">+</span></a
                    ><a
                      class="leaflet-control-zoom-out"
                      href="#"
                      title="Zoom out"
                      role="button"
                      aria-label="Zoom out"
                      aria-disabled="false"
                      ><span aria-hidden="true">−</span></a
                    >
                  </div>
                  <div class="map-search-control leaflet-control">
                    <div
                      style="
                        display: flex;
                        gap: 4px;
                        align-items: center;
                        background: #fff;
                        border: 1px solid #dcdcdc;
                        border-radius: 4px;
                        padding: 4px 6px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                      "
                    >
                      <input
                        id="map-search-input"
                        type="text"
                        placeholder="Search location..."
                        aria-label="Search for a location"
                        style="
                          background: transparent;
                          border: none;
                          outline: none;
                          color: #3d3d3d;
                          font-size: 12px;
                          width: 180px;
                        "
                      /><button
                        id="map-search-btn"
                        aria-label="Search"
                        style="
                          background: #1e5386;
                          border: none;
                          color: #fff;
                          border-radius: 3px;
                          padding: 3px 8px;
                          cursor: pointer;
                          font-size: 11px;
                          white-space: nowrap;
                        "
                      >
                        🔍
                      </button>
                    </div>
                    <div
                      id="map-search-results"
                      style="
                        display: none;
                        background: #fff;
                        border: 1px solid #dcdcdc;
                        border-top: none;
                        border-radius: 0 0 4px 4px;
                        max-height: 200px;
                        overflow-y: auto;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
                      "
                    ></div>
                  </div>
                </div>
                <div class="leaflet-top leaflet-right">
                  <div
                    class="layer-control-container leaflet-control"
                    style="position: relative; display: flex; align-items: center"
                  >
                    <button
                      class="zoom-we-btn"
                      style="margin-top: 0; margin-right: 4px"
                      onclick="zoomToActiveWE()"
                    >
                      ⌖ Zoom to Project</button
                    ><button
                      class="zoom-we-btn"
                      style="margin-top: 0; margin-right: 4px"
                      id="pp-layer-toggle-btn"
                      onclick="togglePPLayers()"
                    >
                      Hide Pre-Project</button
                    ><button
                      class="zoom-we-btn"
                      style="margin-top: 0; margin-right: 4px"
                      id="label-toggle-btn"
                      onclick="toggleLabels()"
                    >
                      Hide Labels</button
                    ><button
                      class="layer-control-btn"
                      aria-haspopup="true"
                      aria-expanded="false"
                      id="layer-toggle-btn"
                    >
                      ⚈ Layers
                    </button>
                    <div
                      class="layer-control-panel"
                      id="layer-panel"
                      style="
                        display: none;
                        position: absolute;
                        right: 0;
                        top: 32px;
                        z-index: 1000;
                        min-width: 170px;
                      "
                    >
                      <div class="layer-section-title">Basemap</div>
                      <label class="layer-row"
                        ><input type="radio" name="basemap" /> Street Map</label
                      ><label class="layer-row"
                        ><input type="radio" name="basemap" /> Satellite</label
                      ><label class="layer-row"
                        ><input type="radio" name="basemap" /> USGS NAIP</label
                      ><label class="layer-row"><input type="radio" name="basemap" /> Topo</label>
                      <div class="layer-section-title" style="margin-top: 8px">Overlays</div>
                      <label class="layer-row"><input type="checkbox" /> NHD Streams</label
                      ><esa-range-slider
                        class="layer-opacity-slider"
                        min="0"
                        max="100"
                        step="5"
                        size="sm"
                        style="display: block"
                      ></esa-range-slider
                      ><label class="layer-row"><input type="checkbox" /> NWI Wetlands</label
                      ><esa-range-slider
                        class="layer-opacity-slider"
                        min="0"
                        max="100"
                        step="5"
                        size="sm"
                        style="display: none"
                      ></esa-range-slider
                      ><label class="layer-row"><input type="checkbox" /> USGS Hillshade</label
                      ><esa-range-slider
                        class="layer-opacity-slider"
                        min="0"
                        max="100"
                        step="5"
                        size="sm"
                        style="display: none"
                      ></esa-range-slider
                      ><label class="layer-row"><input type="checkbox" /> NLCD Land Cover</label
                      ><esa-range-slider
                        class="layer-opacity-slider"
                        min="0"
                        max="100"
                        step="5"
                        size="sm"
                        style="display: none"
                      ></esa-range-slider>
                      <div id="ref-image-section">
                        <div class="layer-section-title" style="margin-top: 8px">
                          Reference Image
                        </div>
                        <esa-file-upload
                          label="Upload reference image"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          max-size-mb="20"
                          name="files"
                        ></esa-file-upload>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="leaflet-bottom leaflet-left"></div>
                <div class="leaflet-bottom leaflet-right">
                  <div
                    class="leaflet-control"
                    id="naip-year-display"
                    style="
                      background: rgba(30, 83, 134, 0.9);
                      color: rgba(255, 255, 255, 0.9);
                      font-size: 11px;
                      padding: 2px 7px;
                      border-radius: 3px;
                      margin-bottom: 2px;
                      pointer-events: none;
                      display: none;
                    "
                  ></div>
                  <div
                    class="leaflet-control"
                    id="zoom-display"
                    style="
                      background: rgba(30, 83, 134, 0.9);
                      color: rgba(255, 255, 255, 0.75);
                      font-size: 11px;
                      padding: 2px 7px;
                      border-radius: 3px;
                      margin-bottom: 2px;
                      pointer-events: none;
                    "
                  >
                    Zoom: 7
                  </div>
                  <div class="leaflet-control-scale leaflet-control">
                    <div class="leaflet-control-scale-line" style="width: 59px">50 km</div>
                    <div class="leaflet-control-scale-line" style="width: 96px">50 mi</div>
                  </div>
                  <div class="leaflet-control-attribution leaflet-control">
                    <a
                      href="https://leafletjs.com"
                      title="A JavaScript library for interactive maps"
                      ><svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        class="leaflet-attribution-flag"
                      >
                        <path fill="#4C7BE1" d="M0 0h12v4H0z"></path>
                        <path fill="#FFD500" d="M0 4h12v3H0z"></path>
                        <path fill="#E0BC00" d="M0 7h12v1H0z"></path>
                      </svg>
                      Leaflet</a
                    >
                    <span aria-hidden="true">|</span> © OpenStreetMap © CARTO, © USGS 3DHP/NHD
                  </div>
                </div>
              </div>
            </div>
            <div id="map-hint" role="status" aria-live="polite"></div>
            <!-- Done Drawing button — shown by CSS whenever #mapwrap has .drawing class -->
            <button id="draw-done-btn" onclick="finishActiveDraw()" aria-label="Finish drawing">
              ✓ Done
            </button>
            <!-- Inline editing toolbar — shown/hidden via JS adding .visible class -->
            <div id="edit-done-bar" role="status" aria-live="assertive">
              <button id="pan-shape-btn" onclick="togglePanShape()" class="msow-pan-btn">
                ↕ Pan shape
              </button>
              <button onclick="commitLineEdit()" class="msow-done-btn">
                ✓ Done editing — click to save
              </button>
            </div>
            <!-- bcn-lego-checked: matches the existing #edit-done-bar directly above — a floating
       pill-shaped control docked to the Leaflet map surface, not a form action. esa-button
       is sized/padded for form/toolbar contexts and has no floating-pill variant; the sibling
       bar already establishes .msow-done-btn as the reusable home for this map-overlay control
       shape, so this reuses that class rather than introducing a new one. -->
            <!-- Reference image positioning toolbar — shown while placing/resizing an uploaded reference image -->
            <div id="ref-image-position-bar" role="status" aria-live="assertive">
              <span class="ref-img-position-hint"
                >Drag the image to move it, drag a corner to resize</span
              >
              <button onclick="finishRefImagePositioning()" class="msow-done-btn">✓ Done</button>
            </div>
            <!-- Map legend -->
            <div id="map-legend" role="complementary" aria-label="Map legend">
              <div class="leg-title">
                Legend
                <span
                  class="leg-toggle"
                  id="leg-toggle"
                  onclick="toggleLegend()"
                  role="button"
                  tabindex="0"
                  aria-expanded="false"
                  aria-label="Toggle legend"
                  onkeydown="if (event.key === 'Enter' || event.key === ' ') toggleLegend();"
                  >[+]</span
                >
              </div>
              <div class="leg-body collapsed" id="leg-body">
                <div class="leg-section">
                  <div class="leg-sec-title">Pre-Project</div>
                  <div class="leg-row">
                    <span class="leg-poly" style="background: #7b4fbf"></span>Polygons
                  </div>
                  <div class="leg-row">
                    <span class="leg-line" style="background: #c07820"></span>Lines
                  </div>
                  <div class="leg-row">
                    <span
                      style="
                        width: 14px;
                        height: 10px;
                        flex-shrink: 0;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                      "
                      ><svg width="11" height="13" viewBox="0 0 18 18">
                        <polygon
                          points="9,0 17,18 9,12 1,18"
                          fill="#c07820"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        ></polygon></svg></span
                    >Flow direction
                  </div>
                </div>
                <div class="leg-section">
                  <div class="leg-sec-title">Habitat Work</div>
                  <div class="leg-row">
                    <span class="leg-poly" style="background: #2a7a5c"></span>Polygons
                  </div>
                  <div class="leg-row">
                    <span class="leg-line" style="background: #1a7abf"></span>Lines
                  </div>
                  <div class="leg-row">
                    <span class="leg-line" style="background: #e07b28"></span>Width segments
                  </div>
                </div>
                <div class="leg-section">
                  <div class="leg-sec-title">Channel Habitat Units</div>
                  <div class="leg-row">
                    <span class="leg-poly" style="background: #c07820"></span>Riffle
                  </div>
                  <div class="leg-row">
                    <span class="leg-poly" style="background: #1a7abf"></span>Pool
                  </div>
                </div>
                <div class="leg-section">
                  <div class="leg-sec-title">Secondary Channels</div>
                  <div class="leg-row">
                    <span class="leg-line" style="background: #2a6a9c"></span>Secondary channel
                  </div>
                </div>
                <div class="leg-section">
                  <div class="leg-sec-title">Wetlands</div>
                  <div class="leg-row">
                    <span class="leg-poly" style="background: #0c8599"></span>Existing Wetland Area
                  </div>
                  <div class="leg-row">
                    <span class="leg-poly" style="background: #c2185b"></span>Wetland Enhancement
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<esa-dialog id="we-modal" heading="New Work Element" show-close-button="true" size="md">
  <div class="we-modal-field">
    <esa-text-field
      label="Work Element Title"
      placeholder="e.g. Eagle Valley Reach 1"
      required=""
      size="md"
    ></esa-text-field>
  </div>
  <div class="we-modal-field">
    <label>What type of work will this element include?</label>
    <div class="we-type-check">
      <div class="we-type-opt" id="opt-pc" onclick="toggleWEType('pc')">
        <esa-checkbox id="chk-pc" onclick="event.stopPropagation()" size="md"></esa-checkbox>
        <div>
          <div class="we-type-opt-label we-type-opt-label--pc">■ Primary Channel</div>
          <div class="we-type-opt-desc">Channel restoration, wood structures, habitat units</div>
        </div>
      </div>
      <div class="we-type-opt" id="opt-fp" onclick="toggleWEType('fp')">
        <esa-checkbox id="chk-fp" onclick="event.stopPropagation()" size="md"></esa-checkbox>
        <div>
          <div class="we-type-opt-label we-type-opt-label--fp">
            ■ Floodplain &amp; Side Channels
          </div>
          <div class="we-type-opt-desc">Floodplain reconnection, side channels, wood placement</div>
        </div>
      </div>
      <div class="we-type-opt" id="opt-rr" onclick="toggleWEType('rr')">
        <esa-checkbox id="chk-rr" onclick="event.stopPropagation()" size="md"></esa-checkbox>
        <div>
          <div class="we-type-opt-label we-type-opt-label--rr">■ Riparian Restoration</div>
          <div class="we-type-opt-desc">Fencing, planting, invasive species removal</div>
        </div>
      </div>
    </div>
    <div class="wm-err" id="we-modal-err">
      Please enter a title and select at least one work type.
    </div>
  </div>
  <div slot="footer">
    <span onclick="closeWEModal()">
      <span
        class="esa-button esa-button--variant-ghost esa-button--appearance-outline esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Cancel</span>
        </button></span
      >
    </span>
    <span onclick="saveWEModal()">
      <span
        class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Save</span>
        </button></span
      >
    </span>
  </div>
</esa-dialog>
<esa-dialog
  id="sowmodal"
  heading="Statement of Work — Habitat Program"
  size="lg"
  show-close-button="true"
>
  <div id="sowbody"></div>
  <div slot="footer">
    <span onclick="window.print()">
      <span
        class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
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
            ></svg>
          </span>
          <span class="esa-button__label">Print / Save PDF</span>
        </button></span
      >
    </span>
    <span onclick="closeSOW()">
      <span
        class="esa-button esa-button--variant-ghost esa-button--appearance-outline esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
          <span class="esa-button__label">Close</span>
        </button></span
      >
    </span>
  </div>
</esa-dialog>
<esa-dialog id="welcome-modal" heading="Habitat Design Tool" show-close-button="true" size="md">
  <p class="msow-welcome-heading">Your contract is eligible to use the new map-based tool.</p>
  <p class="msow-welcome-desc">
    Define pre-project conditions and scope habitat work elements visually on the map, with metrics
    calculated automatically from your digitized features.
  </p>
  <div slot="footer">
    <span onclick="document.getElementById('welcome-modal').close()">
      <span
        class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--md"
        ><button class="esa-button__native typography-microcopy-md" type="button">
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
          <span class="esa-button__label">Continue with new tool</span>
        </button></span
      >
    </span>
  </div>
</esa-dialog>
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
  --cbf-surface-crumb: #f4f4f4;
  --color-background-brand: #1e5386;
  --color-background-brand-hover: #1a4570;
  --color-background-brand-muted: #2770b2;
  --color-background-brand-subtle: #f3f7fc;
  --color-background-default-knockout: #13273e;
  --color-background-elevation-floating: #fcfcfc;
  --color-background-elevation-raised: #fcfcfc;
  --color-background-elevation-sunken: #f3f7fc;
  --color-background-utility-danger: #ce2c31;
  --color-border-brand: #c6dcf1;
  --color-border-default: #dcdcdc;
  --color-border-default-strong: #bdbdbd;
  --color-border-default-subtle: #efefef;
  --color-content-brand: #1e5386;
  --color-content-default: #3d3d3d;
  --color-content-default-knockout: #fcfcfc;
  --color-content-default-secondary: #525252;
  --color-content-default-tertiary: #656565;
  --color-content-link: #1e5386;
  --dialog-width: 480px;
  --dialog-width-lg: 640px;
  --elevation-5: 0 8px 32px -8px rgba(0, 0, 0, 0.08);
  --font-size-150: clamp(0.6875rem, 0.61rem + 0.38vw, 0.875rem);
  --icon-size-md: 20px;
  --link-column-rule-color: color-mix(in srgb, currentColor 40%, transparent);
  --radius-100: 0.25rem;
  --radius-lg: 0.75rem;
  --radius-md: 0.5rem;
  --radius-sm: 0.25rem;
  --side-dialog-inset: 16px;
  --side-dialog-width: 400px;
  --side-dialog-width-sm: 320px;
  --spacing-100: 0.25rem;
  --spacing-150: 0.375rem;
  --spacing-200: 0.5rem;
  --spacing-250: 0.625rem;
  --spacing-300: 0.75rem;
  --spacing-400: 1rem;
  --spacing-500: 1.5rem;
  --spacing-600: 2rem;
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
  --typography-font-weight-bold: 700;
  --typography-font-weight-medium: 500;
  --typography-font-weight-regular: 400;
  --typography-font-weight-semibold: 600;
  --typography-label-md-font-family: "IBM Plex Sans", sans-serif;
  --typography-label-md-font-size: clamp(0.75rem, 0.66rem + 0.44vw, 0.9375rem);
  --typography-label-md-font-weight: 500;
  --typography-label-md-letter-spacing: 0.01em;
  --typography-label-md-line-height: 1.6;
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
}

:host {
  --_dialog-bg: var(--color-background-elevation-floating, #fcfcfc);
  --_dialog-border-radius: var(--radius-lg, 0.75rem);
  --_dialog-padding: var(--spacing-500, 1.5rem);
  --_dialog-header-border: var(--color-border-default-subtle, #d9d9d9);
  /* Header/footer surface tints. These were --dialog-header-bg /
         --dialog-footer-bg, declared in no token file — a hook offered on the
         strength of a fallback nobody had asked to override. Folded to their
         literal default 2026-08-16; --dialog-* is a live namespace, so they come
         back as declarations the day a spoke actually wants to frame the body. */
  --_dialog-header-bg: transparent;
  --_dialog-footer-bg: transparent;
  --_dialog-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
  --_dialog-width: var(--dialog-width, 480px);
  --_dialog-max-height: 85vh;
}
dialog.esa-dialog {
  /* UA reset. The UA sheet gives <dialog> a solid border, 1em padding and
         'max-width/max-height: calc(100% - 6px - 2em)'; without clearing those the
         panel renders inside a second, smaller box. */
  border: none;
  padding: 0;
  margin: auto;
  background: var(--_dialog-bg);
  color: var(--color-content-default, #202020);
  border-radius: var(--_dialog-border-radius);
  box-shadow: var(--_dialog-shadow);
  width: var(--_dialog-width);
  max-width: 100vw;
  max-height: var(--_dialog-max-height);
  overflow: hidden;
  font-family: var(--typography-font-family-sans, "DM Sans", sans-serif);
}
:host([size="lg"]) {
  --_dialog-width: var(--dialog-width-lg, 640px);
}
html:has(.msow-page) {
  height: 100%;
}
html:has(.msow-page) body {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-background-brand-muted);
  color: var(--color-content-default-knockout, #fff);
  padding: 8px 12px;
  z-index: 9999;
  font-size: 13px;
  font-weight: var(--typography-font-weight-bold);
  border-radius: 0 0 4px;
  transition: top 0.1s;
}
html:has(.msow-page) .cbf-app-bar--admin {
  display: none;
}
html:has(.msow-page) .cbf-app-bar--header {
  --_bar-pad-y: var(--spacing-200) !important;
}
.msow-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-block: var(--spacing-600);
  overflow: hidden;
  min-height: 0;
}
html:has(.msow-page) .msow-page {
  padding-block: var(--spacing-200, 8px);
}
.msow-page .esa-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.msow-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  overflow: hidden;
  background: var(--color-background-elevation-raised);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--color-background-default-knockout) 8%, transparent);
}
.msow-crumb-strip {
  background: var(--cbf-surface-crumb);
  border-bottom: 1px solid var(--color-border-default);
  padding: var(--spacing-400) var(--spacing-600);
  flex-shrink: 0;
}
html:has(.msow-page) .msow-crumb-strip {
  padding-block: var(--spacing-200, 8px);
}
.msow-crumb-strip .esa-breadcrumbs {
  --breadcrumbs-link-color: var(--color-content-default-secondary);
  --breadcrumbs-link-hover: var(--color-background-brand);
}
.msow-toolbar {
  background: var(--color-background-elevation-raised);
  border-bottom: 1px solid var(--color-border-default);
  padding: var(--spacing-300) var(--spacing-600);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-600);
}
html:has(.msow-page) .msow-toolbar {
  padding-block: var(--spacing-200, 8px);
}
.msow-toolbar-identity {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
}
.msow-tool-title {
  margin: 0;
  font-size: 16px;
  font-weight: var(--typography-font-weight-bold);
  font-family: var(--typography-font-family-display, var(--typography-font-family-sans));
  color: var(--color-background-default-knockout);
  white-space: nowrap;
  line-height: 1.2;
}
.msow-contract-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
  font-size: 11px;
  color: var(--color-content-default-tertiary);
}
.msow-meta-sep {
  color: var(--color-border-default-strong);
}
.msow-toolbar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  flex-shrink: 0;
  margin-left: auto;
}
.msow-root {
  font-size: 13px;
}
.msow-root {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}
.msow-root * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#msow-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}
#wizard-panel {
  width: 260px;
  flex-shrink: 0;
  background: var(--color-background-elevation-sunken);
  border-right: 1px solid var(--color-border-default);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}
.msow-wizard-collapse-toggle {
  flex-shrink: 0;
  width: 16px;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background-elevation-sunken);
  border: none;
  border-right: 1px solid var(--color-border-default);
  color: var(--color-content-default-secondary);
  font-size: 10px;
  line-height: 1;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}
#sidebar {
  width: 300px;
  flex-shrink: 0;
  background: var(--color-background-elevation-raised);
  border-right: 1px solid var(--color-border-default);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
#wizard-body-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: var(--color-background-elevation-sunken);
}
#expert-panel {
  display: none;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
#mapwrap {
  flex: 1;
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
}
#map {
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-user-select: none;
}
#map-hint {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  max-width: 480px;
  text-align: center;
  background: color-mix(in srgb, var(--color-background-brand) 92%, transparent);
  color: var(--color-content-default-knockout, #fff);
  padding: 5px 14px;
  border-radius: 16px;
  font-size: 11px;
  pointer-events: none;
  z-index: 999;
  display: none;
  white-space: normal;
}
#draw-done-btn {
  display: none;
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1000;
  background: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
  border: none;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: var(--typography-font-weight-bold);
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
  cursor: pointer;
  box-shadow: 0 2px 8px #0000004d;
  transition: background 0.15s ease;
}
#edit-done-bar {
  display: none;
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1000;
  align-items: center;
  gap: var(--spacing-200);
  white-space: nowrap;
}
#ref-image-position-bar {
  display: none;
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1000;
  align-items: center;
  gap: var(--spacing-200);
  white-space: nowrap;
}
#map-legend {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: #fffffff7;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-100);
  padding: 8px 10px;
  font-size: 11px;
  z-index: 999;
  box-shadow: 0 2px 8px #0000001f;
  min-width: 160px;
}
.leg-title {
  font-size: 10px;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-background-default-knockout);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}
.leg-toggle {
  cursor: pointer;
  color: var(--color-content-default-tertiary);
  font-weight: var(--typography-font-weight-regular);
  text-transform: none;
  letter-spacing: 0;
  font-size: 11px;
}
.leg-body.collapsed {
  display: none;
}
#we-modal,
#sowmodal,
#welcome-modal {
  --z-modal-backdrop: 2000;
  --z-modal: 2001;
}
.we-modal-field {
  margin-bottom: 14px;
}
.we-modal-field label {
  display: block;
  font-size: 12px;
  color: var(--color-content-default-secondary);
  font-weight: var(--typography-font-weight-medium);
  margin-bottom: 5px;
}
.we-type-check {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.we-type-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1.5px solid var(--color-border-default);
  border-radius: 4px;
  cursor: pointer;
  transition:
    border-color 0.1s,
    background 0.1s;
}
.we-type-opt-label {
  font-size: 12px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
}
.we-type-opt-label--pc {
  color: #1a7abf;
}
.we-type-opt-desc {
  font-size: 10px;
  color: var(--color-content-default-tertiary);
  margin-top: 1px;
}
.pm-not-drawn,
.pm-redraw,
.pm-result,
.pp-prog-pct,
.we-type-opt-desc,
.wz-tip,
.wz-step-num,
.leg-item,
.wz-metric-label {
  font-size: 11px !important;
}
.we-type-opt-label--fp {
  color: #7b4fbf;
}
.we-type-opt-label--rr {
  color: #2a7a5c;
}
.wm-err {
  font-size: 11px;
  color: var(--color-background-utility-danger, #ef4444);
  margin-top: 8px;
  display: none;
}
#sowbody {
  padding: 15px;
  overflow-y: auto;
  flex: 1;
  font-size: 12px;
}
.msow-welcome-heading {
  font-size: 14px;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-background-default-knockout);
  margin-bottom: var(--spacing-300);
}
.msow-welcome-desc {
  font-size: 12px;
  color: var(--color-content-default-tertiary);
  line-height: 1.65;
}
.leaflet-top.leaflet-left {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 6px;
}
.leaflet-control-zoom {
  border: none !important;
  box-shadow: 0 2px 8px #0000004d !important;
  flex-shrink: 0;
}
.leaflet-top.leaflet-left .leaflet-control {
  margin-bottom: 0 !important;
}
.layer-control-container {
  background: transparent;
}
.zoom-we-btn {
  display: block;
  background: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: var(--typography-font-weight-semibold);
  box-shadow: 0 1px 4px #0006;
  white-space: nowrap;
}
.layer-control-btn {
  background: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: var(--typography-font-weight-semibold);
  box-shadow: 0 1px 4px #0006;
  white-space: nowrap;
}
.layer-control-panel {
  background: var(--color-background-brand);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  padding: 10px 12px;
  margin-top: 4px;
  min-width: 220px;
  max-width: 260px;
  box-shadow: 0 2px 8px #0006;
}
.wz-v-steps {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-300) var(--spacing-500) var(--spacing-400);
  min-height: 0;
}
.wz-v-phase-head {
  display: flex;
  align-items: center;
  gap: var(--spacing-150, 6px);
  font-size: 10px;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-content-default-tertiary);
  letter-spacing: 0.06em;
  padding: var(--spacing-300) 0 var(--spacing-150);
  margin-top: var(--spacing-100);
  cursor: pointer;
  user-select: none;
}
.wz-v-section:first-child .wz-v-phase-head {
  margin-top: 0;
  padding-top: var(--spacing-100);
}
.wz-v-phase-caret {
  font-size: 8px;
  flex-shrink: 0;
  width: 10px;
  text-align: center;
}
.wz-v-phase-label {
  flex: 1;
  text-transform: uppercase;
}
.wz-v-phase-count {
  font-size: 9px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default-tertiary);
  text-transform: none;
  letter-spacing: normal;
}
.wz-v-section-body {
  display: none;
  flex-direction: column;
}
.wz-v-section.open .wz-v-section-body {
  display: flex;
}
.wz-v-item {
  display: flex;
  gap: var(--spacing-300);
  align-items: flex-start;
}
.wz-v-item--nav {
  cursor: pointer;
  border-radius: var(--radius-50, 4px);
  margin-inline: -4px;
  padding-inline: 4px;
  transition: background 0.12s ease;
}
.wz-v-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 2px;
}
.wz-v-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--color-border-default);
  background: var(--color-background-elevation-raised);
  color: var(--color-content-default-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: var(--typography-font-weight-bold);
  flex-shrink: 0;
  transition: all 0.15s;
}
.wz-v-circle.active {
  background: var(--color-background-brand-muted);
  border-color: var(--color-background-brand-muted);
  color: var(--color-content-default-knockout, #fff);
  box-shadow: 0 0 0 3px var(--color-border-brand, #c6dcf1);
}
.wz-v-line {
  width: 2px;
  flex: 1;
  min-height: 10px;
  background: var(--color-border-default);
  margin-block: 2px;
}
.wz-v-label {
  font-size: 12px;
  font-weight: var(--typography-font-weight-medium);
  color: var(--color-content-default-tertiary);
  line-height: 1.3;
  padding-top: 3px;
  padding-bottom: 8px;
}
.wz-v-label.active {
  color: var(--color-background-brand-muted);
  font-weight: var(--typography-font-weight-semibold);
}
.wz-phase-group[data-phase="work"] {
  background: color-mix(in srgb, var(--color-background-brand) 4%, transparent);
  border-top: 1px solid var(--color-border-default);
  margin: var(--spacing-200) calc(-1 * var(--spacing-500)) 0;
  padding: 0 var(--spacing-500) var(--spacing-100);
}
.wz-phase-group-title {
  font-size: 14px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default);
  padding: var(--spacing-300) 0 var(--spacing-100);
}
.wz-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px;
}
.wz-step-num {
  font-size: 11px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
}
.wz-step-title {
  font-size: 17px;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-content-default);
  margin-bottom: 10px;
  line-height: 1.2;
}
.wz-step-desc {
  font-size: 12px;
  color: var(--color-content-default-secondary);
  line-height: 1.6;
  margin-bottom: 18px;
}
.wz-help {
  margin: -8px 0 18px;
  border: 1px solid var(--color-border-default-subtle);
  border-radius: 6px;
  overflow: hidden;
  background: var(--color-background-elevation-raised);
}
.wz-help-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  font-size: 11px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default-secondary);
  cursor: pointer;
  user-select: none;
  background: var(--color-background-brand-subtle);
}
.wz-help-icon {
  font-size: 12px;
  line-height: 1;
}
.wz-help-caret {
  margin-left: auto;
  font-size: 9px;
  transition: transform 0.15s;
}
.wz-help-body {
  display: none;
  padding: 10px 12px;
  font-size: 11px;
  color: var(--color-content-default-tertiary);
  font-style: italic;
  line-height: 1.6;
  border-top: 1px solid var(--color-border-default-subtle);
}
.wz-status {
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 11px;
  margin-bottom: 14px;
  line-height: 1.5;
}
.wz-status.pending {
  background: var(--color-background-brand-subtle);
  border-left: 3px solid var(--color-background-brand-muted);
  color: var(--color-content-default-secondary);
}
.wz-action-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 13px;
  font-weight: var(--typography-font-weight-bold);
  cursor: pointer;
  text-align: center;
  margin-bottom: 10px;
  transition: background 0.15s;
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
}
.wz-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--color-border-default);
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  background: var(--color-background-elevation-sunken);
}
.wz-btn-back {
  flex: 1;
  padding: 9px;
  background: transparent;
  color: var(--color-content-default-secondary);
  border: 1px solid var(--color-border-default-strong);
  border-radius: var(--radius-sm, 4px);
  cursor: pointer;
  font-size: 12px;
  font-weight: var(--typography-font-weight-semibold);
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
  transition: background 0.15s;
}
.wz-btn-next {
  flex: 2;
  padding: 9px;
  background: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
  border: none;
  border-radius: var(--radius-sm, 4px);
  cursor: pointer;
  font-size: 13px;
  font-weight: var(--typography-font-weight-bold);
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
  transition: background 0.15s;
}
.wz-btn-next:disabled {
  background: var(--color-border-default-subtle);
  color: var(--color-content-default-tertiary);
  cursor: default;
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
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
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
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
summary.esa-button {
  list-style: none;
  cursor: pointer;
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
.esa-icon--md {
  --_icon-size: var(--icon-size-md, 20px);
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-button__label {
  white-space: nowrap;
}
.esa-button--sm {
  --_btn-pad-y: var(--spacing-250, 0.625rem);
  --_btn-padding-x: var(--spacing-250, 0.625rem);
  --_btn-radius: var(--button-radius-sm, 4px);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button--variant-ghost .esa-button__native {
  background: transparent;
  color: var(--color-content-default, #202020);
  border-color: transparent;
}
.esa-button--variant-ghost.esa-button--appearance-outline .esa-button__native,
.esa-button--variant-ghost.esa-button--appearance-dashed .esa-button__native {
  border-color: var(--color-border-default, #cecece);
}
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
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
.esa-app-bar--brand {
  background: var(--color-background-brand, #46a758);
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
.esa-app-bar__main {
  flex: 1 1 auto;
  min-width: 0;
}
.esa-app-bar__end {
  flex: none;
  margin-left: auto;
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
.esa-container {
  width: 100%;
  max-width: var(--_container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--spacing-600, 2rem);
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
.esa-breadcrumbs__current {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  color: var(--_crumb-current-color);
}
.esa-breadcrumbs__separator {
  flex-shrink: 0;
  color: var(--_crumb-separator-color);
}
.esa-breadcrumbs__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  color: var(--_crumb-link-color);
  text-decoration-color: transparent;
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
.cbf-nav-collapsible {
  display: contents;
}
.esa-nav-dropdown {
  position: relative;
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
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
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
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
.leaflet-container {
  overflow: hidden;
}
.leaflet-container {
  -webkit-tap-highlight-color: transparent;
}
.leaflet-container {
  background: #ddd;
  outline-offset: 1px;
}
.leaflet-container {
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-size: 0.75rem;
  line-height: 1.5;
}
.leaflet-image-layer,
.leaflet-layer,
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-pane,
.leaflet-pane > canvas,
.leaflet-pane > svg,
.leaflet-tile,
.leaflet-tile-container,
.leaflet-zoom-box {
  position: absolute;
  left: 0;
  top: 0;
}
.leaflet-pane {
  z-index: 400;
}
.leaflet-tile-pane {
  z-index: 200;
}
.leaflet-overlay-pane {
  z-index: 400;
}
.leaflet-shadow-pane {
  z-index: 500;
}
.leaflet-marker-pane {
  z-index: 600;
}
.leaflet-tooltip-pane {
  z-index: 650;
}
.leaflet-popup-pane {
  z-index: 700;
}
.leaflet-control,
.leaflet-popup-pane {
  cursor: auto;
}
.leaflet-bottom,
.leaflet-top {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
}
.leaflet-top {
  top: 0;
}
.leaflet-left {
  left: 0;
}
.leaflet-right {
  right: 0;
}
.leaflet-bottom {
  bottom: 0;
}
.leaflet-grab {
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}
.leaflet-container.leaflet-touch-zoom {
  -ms-touch-action: pan-x pan-y;
  touch-action: pan-x pan-y;
}
.leaflet-container.leaflet-touch-drag {
  -ms-touch-action: pinch-zoom;
  touch-action: none;
  touch-action: pinch-zoom;
}
.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
  -ms-touch-action: none;
  touch-action: none;
}
.leaflet-zoom-animated {
  -webkit-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
}
.leaflet-image-layer,
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-pane > svg path,
.leaflet-tile-container {
  pointer-events: none;
}
.leaflet-control {
  position: relative;
  z-index: 800;
  pointer-events: visiblePainted;
  pointer-events: auto;
}
.leaflet-control {
  float: left;
  clear: both;
}
.leaflet-bar {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  border-radius: 4px;
}
.leaflet-top .leaflet-control {
  margin-top: 10px;
}
.leaflet-left .leaflet-control {
  margin-left: 10px;
}
.leaflet-touch .leaflet-bar,
.leaflet-touch .leaflet-control-attribution,
.leaflet-touch .leaflet-control-layers {
  box-shadow: none;
}
.leaflet-touch .leaflet-bar,
.leaflet-touch .leaflet-control-layers {
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
}
.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
  font:
    bold 18px "Lucida Console",
    Monaco,
    monospace;
  text-indent: 1px;
}
.leaflet-container a {
  -webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);
}
.leaflet-container a {
  color: #0078a8;
}
.leaflet-bar a {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  width: 26px;
  height: 26px;
  line-height: 26px;
  display: block;
  text-align: center;
  text-decoration: none;
  color: #000;
}
.leaflet-bar a,
.leaflet-control-layers-toggle {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  display: block;
}
.leaflet-touch .leaflet-control-zoom-in,
.leaflet-touch .leaflet-control-zoom-out {
  font-size: 22px;
}
.leaflet-bar a:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.leaflet-touch .leaflet-bar a {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.leaflet-touch .leaflet-bar a:first-child {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.leaflet-bar a:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: none;
}
.leaflet-touch .leaflet-bar a:last-child {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.leaflet-right .leaflet-control {
  float: right;
}
.leaflet-bottom .leaflet-control {
  margin-bottom: 10px;
}
.leaflet-right .leaflet-control {
  margin-right: 10px;
}
.leaflet-bottom .leaflet-control-scale {
  margin-bottom: 5px;
}
.leaflet-control-attribution,
.leaflet-control-scale-line {
  padding: 0 5px;
  color: #333;
  line-height: 1.4;
}
.leaflet-control-scale-line {
  border: 2px solid #777;
  border-top: none;
  line-height: 1.1;
  padding: 2px 5px 1px;
  white-space: nowrap;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.8);
  text-shadow: 1px 1px #fff;
}
.leaflet-control-scale-line:not(:first-child) {
  border-top: 2px solid #777;
  border-bottom: none;
  margin-top: -2px;
}
.leaflet-container .leaflet-control-attribution {
  background: #fff;
  background: rgba(255, 255, 255, 0.8);
  margin: 0;
}
.leaflet-control-attribution a {
  text-decoration: none;
}
.leaflet-attribution-flag {
  display: inline !important;
  vertical-align: baseline !important;
  width: 1em;
  height: 0.6669em;
}
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-tile {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
}
.leaflet-tile {
  filter: inherit;
  visibility: hidden;
}
.leaflet-container .leaflet-marker-pane img,
.leaflet-container .leaflet-shadow-pane img,
.leaflet-container .leaflet-tile,
.leaflet-container .leaflet-tile-pane img,
.leaflet-container img.leaflet-image-layer {
  max-width: none !important;
  max-height: none !important;
  width: auto;
  padding: 0;
}
.leaflet-container img.leaflet-tile {
  mix-blend-mode: plus-lighter;
}
.leaflet-tile::selection {
  background: 0 0;
}
.leaflet-tile-loaded {
  visibility: inherit;
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
a {
  color: var(--color-content-link, #1e5386);
  text-decoration: none;
}
img {
  display: block;
  max-width: 100%;
}
button {
  font-family: inherit;
  cursor: pointer;
  background: none;
  border: 0;
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
| `--cbf-surface-crumb` | `#f4f4f4` | brand |
| `--color-background-brand` | `#1e5386` | semantic |
| `--color-background-brand-hover` | `#1a4570` | semantic |
| `--color-background-brand-muted` | `#2770b2` | semantic |
| `--color-background-brand-subtle` | `#f3f7fc` | semantic |
| `--color-background-default-knockout` | `#13273e` | semantic |
| `--color-background-elevation-floating` | `#fcfcfc` | semantic |
| `--color-background-elevation-raised` | `#fcfcfc` | semantic |
| `--color-background-elevation-sunken` | `#f3f7fc` | semantic |
| `--color-background-utility-danger` | `#ce2c31` | semantic |
| `--color-border-brand` | `#c6dcf1` | semantic |
| `--color-border-default` | `#dcdcdc` | semantic |
| `--color-border-default-strong` | `#bdbdbd` | semantic |
| `--color-border-default-subtle` | `#efefef` | semantic |
| `--color-content-brand` | `#1e5386` | semantic |
| `--color-content-default` | `#3d3d3d` | semantic |
| `--color-content-default-knockout` | `#fcfcfc` | semantic |
| `--color-content-default-secondary` | `#525252` | semantic |
| `--color-content-default-tertiary` | `#656565` | semantic |
| `--color-content-link` | `#1e5386` | semantic |
| `--dialog-width` | `480px` | component |
| `--dialog-width-lg` | `640px` | component |
| `--elevation-5` | `0 8px 32px -8px rgba(0, 0, 0, .08)` | semantic |
| `--font-size-150` | `clamp(.6875rem, .61rem + .38vw, .875rem)` | primitive |
| `--icon-size-md` | `20px` | primitive |
| `--link-column-rule-color` | `color-mix(in srgb, currentColor 40%, transparent)` | component |
| `--radius-100` | `.25rem` | primitive |
| `--radius-lg` | `.75rem` | semantic |
| `--radius-md` | `.5rem` | semantic |
| `--radius-sm` | `.25rem` | semantic |
| `--side-dialog-inset` | `16px` | component |
| `--side-dialog-width` | `400px` | component |
| `--side-dialog-width-sm` | `320px` | component |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-250` | `.625rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-500` | `1.5rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
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
| `--typography-font-weight-bold` | `700` | semantic |
| `--typography-font-weight-medium` | `500` | semantic |
| `--typography-font-weight-regular` | `400` | semantic |
| `--typography-font-weight-semibold` | `600` | semantic |
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
| `--typography-microcopy-xs-font-family` | `"IBM Plex Sans", sans-serif` | semantic |
| `--typography-microcopy-xs-font-size` | `clamp(.625rem, .56rem + .32vw, .75rem)` | semantic |
| `--typography-microcopy-xs-font-weight` | `500` | semantic |
| `--typography-microcopy-xs-letter-spacing` | `.01em` | semantic |
| `--typography-microcopy-xs-line-height` | `1` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
