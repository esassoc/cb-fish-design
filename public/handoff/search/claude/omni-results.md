# Omni — results

The palette mid-query — grouped results across types with scope pills, matched-text highlighting, and "view all" handing off to the /search page.

## Key decisions
- Rendering is shared with the /search page via omni-render.ts — one render path, two shells (palette overlay vs. full page).
- Active-row state is index-based and resets on every query change.

## Gotchas
- "View all results" must carry the current query + scope to /search as ?q=&scope=.

## Done when
- Typing filters within ~1 frame; ↑/↓/⏎/Esc all work.

## Markup
```html
<div class="cbf-omni" data-omni="">
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
    <div class="cbf-omni__scopes" data-omni-scopes="">
      <button type="button" class="cbf-scope-pill is-active">
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
            <path d="m21 21-4.3-4.3"></path></svg></span
        >All <span class="cbf-scope-pill__count">15</span></button
      ><button type="button" class="cbf-scope-pill">
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
            <path
              d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
            ></path></svg></span
        >Projects <span class="cbf-scope-pill__count">5</span></button
      ><button type="button" class="cbf-scope-pill">
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <path d="M10 9H8"></path>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path></svg></span
        >Contracts <span class="cbf-scope-pill__count">7</span></button
      ><button type="button" class="cbf-scope-pill">
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span
        >People <span class="cbf-scope-pill__count">1</span></button
      ><button type="button" class="cbf-scope-pill">
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
            <path
              d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
            ></path></svg></span
        >Publications <span class="cbf-scope-pill__count">2</span>
      </button>
    </div>
    <div class="cbf-omni__body">
      <!-- default view: brand illustration + search note (Recent lives in the nav) -->
      <div class="cbf-omni__empty" data-omni-empty="" hidden="">
        <div class="cbf-omni__hero">
          <img class="cbf-omni__art" src="/cb-fish-design/dam-illustration.jpg" alt="" />
          <p class="cbf-omni__hero-title">Search the Program</p>
          <p class="cbf-omni__hero-note">
            Find projects, contracts, people, and publications across the Columbia Basin.
            Start typing, or press <kbd class="esa-kbd">Tab</kbd> to choose a scope.
          </p>
        </div>
      </div>
      <!-- query view: grouped results (injected) -->
      <div class="cbf-omni__results" data-omni-results="">
        <div class="cbf-result-group">
          <div class="cbf-result-group__head">
            <span class="cbf-result-group__title"
              ><span class="cbf-icon"
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
                  <path
                    d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                  ></path></svg></span
              >Projects</span
            >
            <span class="cbf-result-group__count">5</span>
          </div>
          <div class="cbf-result is-active">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                2001-006-00 <mark>Salmon</mark>/Steelhead Days
              </div>
              <div class="cbf-result__sub">Project · FY2001 · Active</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                2002-051-00 <mark>Salmon</mark> Subbasin Planning
              </div>
              <div class="cbf-result__sub">Project · FY2002 · Active</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                2002-032-00 Passage of ESA-Listed Juvenile <mark>Salmon</mark>
              </div>
              <div class="cbf-result__sub">Project · FY2002</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                2002-033-00 John Day <mark>Salmon</mark>id Monitoring Program
              </div>
              <div class="cbf-result__sub">Project · FY2002 · Active</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                2001-025-00 <mark>Salmon</mark>id Production in Restored Rattlesnake Creek
              </div>
              <div class="cbf-result__sub">Project · FY2001</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
        </div>
        <div class="cbf-result-group">
          <div class="cbf-result-group__head">
            <span class="cbf-result-group__title"
              ><span class="cbf-icon"
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
                  <path
                    d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                  ></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path></svg></span
              >Contracts</span
            >
            <span class="cbf-result-group__count">7</span>
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                [10046] 2001-006-01 <mark>Salmon</mark>/Steelhead Days
              </div>
              <div class="cbf-result__sub">Contract · Project 2001-006-00</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                [10205] 2001-006-02 Trout/<mark>Salmon</mark> Watch
              </div>
              <div class="cbf-result__sub">Contract · Project 2001-006-00</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                [10217] 2001-025-00 <mark>Salmon</mark>id Production, Rattlesnake Creek
              </div>
              <div class="cbf-result__sub">Contract · Project 2001-025-00</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                [10253 REL 32] Shoshone-Bannock Tribe — <mark>Salmon</mark> Subbasin
              </div>
              <div class="cbf-result__sub">Contract · Project 2002-051-00</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                [10253 REL 33] Nez Perce Tribe — <mark>Salmon</mark> Subbasin
              </div>
              <div class="cbf-result__sub">Contract · Project 2002-051-00</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                [10255 REL 18] Idaho Dept of Fish &amp; Game —
                <mark>Salmon</mark> Subbasin
              </div>
              <div class="cbf-result__sub">Contract · Project 2002-051-00</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                [10952] 2002-033-00 John Day <mark>Salmon</mark>id Monitoring
              </div>
              <div class="cbf-result__sub">Contract · Project 2002-033-00</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
        </div>
        <div class="cbf-result-group">
          <div class="cbf-result-group__head">
            <span class="cbf-result-group__title"
              ><span class="cbf-icon"
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span
              >People</span
            >
            <span class="cbf-result-group__count">1</span>
          </div>
          <div class="cbf-result cbf-result--person">
            <div class="cbf-result__body">
              <div class="cbf-result__title">Maria Gonzales</div>
              <div class="cbf-result__sub">
                Idaho Dept of Fish &amp; Game · Salmon program
              </div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
        </div>
        <div class="cbf-result-group">
          <div class="cbf-result-group__head">
            <span class="cbf-result-group__title"
              ><span class="cbf-icon"
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
                  <path
                    d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
                  ></path></svg></span
              >Publications</span
            >
            <span class="cbf-result-group__count">2</span>
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                2023 Annual Progress Report — <mark>Salmon</mark> Recovery
              </div>
              <div class="cbf-result__sub">Publication · Report Center</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                Subbasin Plan: <mark>Salmon</mark> River
              </div>
              <div class="cbf-result__sub">Publication · Planning document</div>
            </div>
            <span class="cbf-result__chevron cbf-icon"
              ><svg
                width="17"
                height="17"
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
          </div>
        </div>
      </div>
    </div>
    <button class="cbf-omni__showall" data-omni-showall="" type="button">
      <span data-omni-showall-label="">Show all 15 results</span>
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
```

## Styles
```css
.cbf-search-surface .cbf-facet {
  display: flex;
  align-items: center;
  gap: var(--spacing-250);
  width: 100%;
  padding: var(--spacing-200) var(--spacing-300);
  border-radius: var(--radius-100);
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: var(--font-weight-regular);
  text-align: left;
}
.cbf-search-surface .cbf-facet.is-active {
  background: var(--color-primary-subtle);
  font-weight: var(--font-weight-semibold);
}
.cbf-search-surface .cbf-facet .cbf-icon {
  color: var(--color-secondary);
}
.cbf-search-surface .cbf-facet__label {
  flex: 1;
}
.cbf-search-field .cbf-icon {
  color: var(--color-text-muted);
  display: inline-flex;
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
.cbf-nav-link .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-omni {
  position: fixed;
  inset: 0;
  z-index: 80;
}
.cbf-omni[hidden] {
  display: none;
}
.cbf-search-surface .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-search-surface .cbf-result-empty {
  padding: var(--spacing-600) var(--spacing-500);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 15px;
}
.cbf-omni-trigger:hover {
  background: #ffffff29;
  border-color: #ffffff59;
}
.cbf-omni__scrim {
  position: absolute;
  inset: 0;
  background: #13273e73;
  backdrop-filter: blur(2px);
}
.cbf-omni__panel {
  position: relative;
  z-index: 1;
  width: 920px;
  max-width: 92vw;
  height: min(820px, 92vh);
  margin: 56px auto 0;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 64px #13273e52;
}
.cbf-omni__searchrow {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  flex: none;
  padding: var(--spacing-300) var(--spacing-500);
  border-bottom: 1px solid var(--color-border);
}
.cbf-omni__input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: var(--font-sans);
  font-size: 18px;
  color: var(--color-text-primary);
}
.cbf-omni__input::placeholder {
  color: var(--cbf-text-placeholder);
}
.cbf-omni__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  flex: none;
  background: var(--color-surface-sunken);
  color: var(--color-text-muted);
}
.cbf-omni__scopes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-200);
  flex: none;
  padding: var(--spacing-200) var(--spacing-500);
  border-bottom: 1px solid var(--color-border);
}
.cbf-search-surface .cbf-scope-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px var(--spacing-300);
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: var(--font-weight-medium);
  transition:
    background 0.1s,
    border-color 0.1s,
    color 0.1s;
}
.cbf-search-surface .cbf-scope-pill.is-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse, #fff);
}
.cbf-omni__body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}
.cbf-omni__empty {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.cbf-omni__hero {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-300);
  text-align: center;
  padding: var(--spacing-500) var(--spacing-600) var(--spacing-700);
}
.cbf-omni__art {
  width: 200px;
  height: auto;
  opacity: 0.92;
  mix-blend-mode: multiply;
}
.cbf-omni__hero-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}
.cbf-omni__hero-note {
  margin: 0;
  max-width: 420px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-text-muted);
}
.esa-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 19px;
  height: 19px;
  padding: 0 5px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: var(--font-weight-medium);
  line-height: 1;
  color: var(--kbd-color, var(--color-text-muted));
  background: var(--kbd-bg, var(--color-surface));
  border: 1px solid var(--kbd-border-color, var(--color-border));
  border-bottom-width: 2px;
  border-radius: var(--kbd-radius, 4px);
}
.cbf-omni__results {
  padding: var(--spacing-100) 0;
}
.cbf-omni__showall {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200);
  flex: none;
  width: 100%;
  padding: var(--spacing-300);
  background: var(--color-primary);
  color: var(--color-text-inverse, #fff);
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: var(--font-weight-semibold);
}
.cbf-omni__showall[hidden] {
  display: none;
}
.cbf-omni__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  padding: var(--spacing-200) var(--spacing-500);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-sunken);
}
.cbf-omni__hints {
  display: flex;
  gap: var(--spacing-400);
}
.cbf-omni__hints span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--color-text-muted);
}
.cbf-search-surface .cbf-scope-pill__count {
  opacity: 0.65;
  font-weight: var(--font-weight-regular);
}
.cbf-omni__empty[hidden] {
  display: none;
}
.cbf-search-surface .cbf-result-group {
  padding-block: 0;
}
.cbf-search-surface .cbf-result-group__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-200) var(--spacing-500);
  background: var(--color-surface-sunken);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.cbf-search-surface .cbf-result-group:first-child .cbf-result-group__head {
  border-top: 0;
}
.cbf-search-surface .cbf-result-group__title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-text-primary);
}
.cbf-search-surface .cbf-result-group__title .cbf-icon {
  color: var(--color-text-muted);
}
.cbf-search-surface .cbf-result-group__count {
  font-size: 13px;
  color: var(--color-text-muted);
}
.cbf-search-surface .cbf-result {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  padding: 8px var(--spacing-500);
  cursor: pointer;
}
.cbf-search-surface .cbf-result:hover,
.cbf-search-surface .cbf-result.is-active {
  background: var(--color-primary-subtle);
}
.cbf-search-surface .cbf-result__body {
  flex: 1;
  min-width: 0;
}
.cbf-search-surface .cbf-result__title {
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}
.cbf-search-surface .cbf-result__title mark {
  background: var(--cbf-search-highlight);
  color: inherit;
  border-radius: 2px;
  padding: 0 1px;
}
.cbf-search-surface .cbf-result__sub {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-top: 1px;
}
.cbf-search-surface .cbf-result__chevron {
  color: var(--color-secondary);
  opacity: 0;
  flex: none;
}
.cbf-search-surface .cbf-result.is-active .cbf-result__chevron {
  opacity: 1;
}
```

## Tokens
- `--cbf-search-highlight`: #ffe9b0 _(brand)_
- `--cbf-text-placeholder`: #9aa3ad _(brand)_
- `--color-border`: #dcdcdc _(semantic)_
- `--color-primary`: #1e5386 _(semantic)_
- `--color-primary-subtle`: #f3f7fc _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-surface-sunken`: #f3f7fc _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-primary`: #3d3d3d _(semantic)_
- `--font-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(primitive)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--font-weight-regular`: 400 _(primitive)_
- `--font-weight-semibold`: 600 _(primitive)_
- `--kbd-bg`: #ffffff _(component)_
- `--kbd-border-color`: #dcdcdc _(component)_
- `--kbd-color`: #7c7c7c _(component)_
- `--kbd-radius`: 4px _(component)_
- `--radius-100`: .25rem _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
- `--spacing-700`: 3rem _(primitive)_
