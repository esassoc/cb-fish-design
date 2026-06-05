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
        >All <span class="cbf-scope-pill__count">16</span></button
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
        >Publications <span class="cbf-scope-pill__count">2</span></button
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
              d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 1-1 1v-1"
            ></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg></span
        >Funds <span class="cbf-scope-pill__count">1</span>
      </button>
    </div>
    <div class="cbf-omni__body">
      <!-- default view: Recent (injected) + illustration/note -->
      <div class="cbf-omni__empty" data-omni-empty="" hidden="">
        <div data-omni-recent="">
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
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M12 7v5l4 2"></path></svg></span
                >Recent</span
              >
            </div>
            <div class="cbf-result is-active">
              <span class="cbf-result__lead"
                ><span class="cbf-icon"
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
                    <path
                      d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                    ></path></svg></span
              ></span>
              <div class="cbf-result__body">
                <div class="cbf-result__title">2002-051-00 Salmon Subbasin Planning</div>
                <div class="cbf-result__sub">Project · viewed 2h ago</div>
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
              <span class="cbf-result__lead"
                ><span class="cbf-icon"
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
                    <path
                      d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                    ></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path></svg></span
              ></span>
              <div class="cbf-result__body">
                <div class="cbf-result__title">
                  [10046] 2001-006-01 Salmon/Steelhead Days
                </div>
                <div class="cbf-result__sub">Contract · viewed yesterday</div>
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
              <span class="cbf-result__lead"
                ><span class="cbf-icon"
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span
              ></span>
              <div class="cbf-result__body">
                <div class="cbf-result__title">David Roberts</div>
                <div class="cbf-result__sub">Nez Perce Tribe · viewed yesterday</div>
              </div>
              <button class="cbf-impersonate" type="button" data-impersonate="">
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
                    <path d="M14 18a2 2 0 0 0-4 0"></path>
                    <path
                      d="m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 11 4H8.5"
                    ></path>
                    <path d="m4 11 2.71-6.715a2 2 0 0 1 2.836-1.187L11 4"></path>
                    <path
                      d="M4.5 11h15a1 1 0 0 1 1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5a2.5 2.5 0 0 1-2.5-2.5v-.5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5A2.5 2.5 0 0 1 3.5 12.5V12a1 1 0 0 1 1-1Z"
                    ></path></svg></span
                >Impersonate
              </button>
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
              <span class="cbf-result__lead"
                ><span class="cbf-icon"
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
                    <path
                      d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
                    ></path></svg></span
              ></span>
              <div class="cbf-result__body">
                <div class="cbf-result__title">
                  2023 Annual Progress Report — Salmon Recovery
                </div>
                <div class="cbf-result__sub">Publication · viewed 3d ago</div>
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
        <div class="cbf-omni__hero">
          <img class="cbf-omni__art" src="/cb-fish-design/dam-illustration.jpg" alt="" />
          <p class="cbf-omni__hero-title">Search the Program</p>
          <p class="cbf-omni__hero-note">
            Find projects, contracts, people, publications, and funds across the Columbia
            Basin. Start typing, or press <kbd class="cbf-kbd">Tab</kbd> to choose a
            scope.
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
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">Maria Gonzales</div>
              <div class="cbf-result__sub">
                Idaho Dept of Fish &amp; Game · Salmon program
              </div>
            </div>
            <button class="cbf-impersonate" type="button" data-impersonate="">
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
                  <path d="M14 18a2 2 0 0 0-4 0"></path>
                  <path
                    d="m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 11 4H8.5"
                  ></path>
                  <path d="m4 11 2.71-6.715a2 2 0 0 1 2.836-1.187L11 4"></path>
                  <path
                    d="M4.5 11h15a1 1 0 0 1 1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5a2.5 2.5 0 0 1-2.5-2.5v-.5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5A2.5 2.5 0 0 1 3.5 12.5V12a1 1 0 0 1 1-1Z"
                  ></path></svg></span
              >Impersonate
            </button>
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
                    d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 1-1 1v-1"
                  ></path>
                  <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg></span
              >Funds</span
            >
            <span class="cbf-result-group__count">1</span>
          </div>
          <div class="cbf-result">
            <div class="cbf-result__body">
              <div class="cbf-result__title">
                <mark>Salmon</mark> Mitigation Fund (FY26)
              </div>
              <div class="cbf-result__sub">Fund · $24.7M committed</div>
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
      <span data-omni-showall-label="">Show all 16 results</span>
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
        <span><kbd class="cbf-kbd">↑</kbd> <kbd class="cbf-kbd">↓</kbd> Navigate</span>
        <span><kbd class="cbf-kbd">↵</kbd> Select</span>
        <span><kbd class="cbf-kbd">Tab</kbd> Scope</span>
        <span><kbd class="cbf-kbd">Esc</kbd> Close</span>
      </div>
    </div>
  </div>
</div>
```

## Styles
```css
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
.cbf-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: inherit;
}
.cbf-omni-trigger__ph {
  flex: 1;
  text-align: left;
  font-size: 13px;
}
.cbf-omni-trigger__kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 17px;
  height: 17px;
  padding: 0 5px;
  font-family: var(--font-sans);
  font-size: 11px;
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
.cbf-search-surface .cbf-facet {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px var(--spacing-300);
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
.cbf-search-surface .cbf-icon {
  display: inline-flex;
  align-items: center;
}
.cbf-search-surface .cbf-facet .cbf-icon {
  color: var(--color-secondary);
}
.cbf-search-surface .cbf-facet__label {
  flex: 1;
}
.cbf-search-field .cbf-icon {
  color: var(--color-text-muted);
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
.cbf-search-surface .cbf-result {
  display: flex;
  align-items: center;
  gap: var(--spacing-300);
  padding: 8px var(--spacing-500);
  cursor: pointer;
  border-left: 3px solid transparent;
}
.cbf-search-surface .cbf-result:hover,
.cbf-search-surface .cbf-result.is-active {
  background: var(--color-primary-subtle);
  border-left-color: var(--color-secondary);
}
.cbf-search-surface .cbf-result__lead {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  flex: none;
  background: var(--color-primary-subtle);
  color: var(--color-primary);
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
.cbf-search-surface .cbf-impersonate {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: none;
  padding: 4px var(--spacing-300);
  border-radius: 999px;
  border: 1px solid var(--color-primary-border);
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
.cbf-search-surface .cbf-result:has(.cbf-impersonate) .cbf-result__chevron {
  display: none;
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
.cbf-kbd {
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
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-bottom-width: 2px;
  border-radius: 4px;
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
  font-size: 12px;
  color: var(--color-text-muted);
}
.cbf-search-surface .cbf-scope-pill__count {
  opacity: 0.65;
  font-weight: var(--font-weight-regular);
}
.cbf-omni__empty[hidden] {
  display: none;
}
.cbf-search-surface .cbf-result-group__count {
  font-size: 13px;
  color: var(--color-text-muted);
}
.cbf-search-surface .cbf-result__title mark {
  background: #ffe9b0;
  color: inherit;
  border-radius: 2px;
  padding: 0 1px;
}
```

## Tokens
- `--cbf-text-placeholder`: #9aa3ad _(brand)_
- `--color-border`: #dcdcdc _(semantic)_
- `--color-primary`: #1e5386 _(semantic)_
- `--color-primary-border`: #c6dcf1 _(semantic)_
- `--color-primary-subtle`: #f3f7fc _(semantic)_
- `--color-secondary`: #2770b2 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-surface-sunken`: #f3f7fc _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-muted`: #7c7c7c _(semantic)_
- `--color-text-primary`: #171717 _(semantic)_
- `--font-display`: "IBM Plex Sans Condensed", "IBM Plex Sans", sans-serif _(primitive)_
- `--font-sans`: "IBM Plex Sans", sans-serif _(primitive)_
- `--font-weight-medium`: 500 _(primitive)_
- `--font-weight-regular`: 400 _(primitive)_
- `--font-weight-semibold`: 600 _(primitive)_
- `--radius-100`: .25rem _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--spacing-600`: 2rem _(primitive)_
- `--spacing-700`: 3rem _(primitive)_

## Behavior
```ts
// ── src/components/search/icons.ts ──
// Inline Lucide glyphs the search feature needs. The hub's esa-icon ships a fixed
// set that lacks several of these (history, folder, book, wallet, venetian-mask,
// rotate-ccw), and the hub is a file: dependency we don't edit — so the spoke
// carries its own small set. One source feeds both build-time (.astro via svg())
// and runtime (the client script builds result rows as HTML strings).
//
// Paths copied from lucide.dev: 24×24, stroke-based, stroke-width 2.

export type IconName =
  | 'search' | 'x' | 'chevron-right' | 'chevron-down'
  | 'folder' | 'file-text' | 'users' | 'book' | 'wallet'
  | 'history' | 'hat-glasses' | 'rotate-ccw'
  | 'circle-user' | 'layout-dashboard';

const ICONS: Record<IconName, string> = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 1-1 1v-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  'hat-glasses': '<path d="M14 18a2 2 0 0 0-4 0"/><path d="m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 11 4H8.5"/><path d="m4 11 2.71-6.715a2 2 0 0 1 2.836-1.187L11 4"/><path d="M4.5 11h15a1 1 0 0 1 1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5a2.5 2.5 0 0 1-2.5-2.5v-.5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5A2.5 2.5 0 0 1 3.5 12.5V12a1 1 0 0 1 1-1Z"/>',
  'rotate-ccw': '<path d="M3 2v6h6"/><path d="M3 8a9 9 0 1 0 2.83-2.83L3 8"/>',
  'circle-user': '<circle cx="12" cy="12" r="10"/><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/>',
  'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
};

/** Full <svg> string for inline use (set:html in .astro, or innerHTML in JS). */
export function svg(name: IconName, px = 16): string {
  return `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] ?? ''}</svg>`;
}

// ── src/components/search/omni-data.ts ──
// Mock data for the search palette prototype (CBF-8117). Real impl would query
// the API with permission scoping; here it's static, CBFish-flavored content so a
// demo reads as credible. People are the ESA dev/QA team (impersonation targets).
import type { IconName } from './icons';

export type EntityType = 'project' | 'contract' | 'person' | 'publication' | 'fund';
export type ScopeId = 'all' | EntityType;

export interface Scope {
  id: ScopeId;
  label: string;
  icon: IconName;
}
export interface Entity {
  type: EntityType;
  title: string;
  sub: string;
}

export const SCOPES: Scope[] = [
  { id: 'all', label: 'All', icon: 'search' },
  { id: 'project', label: 'Projects', icon: 'folder' },
  { id: 'contract', label: 'Contracts', icon: 'file-text' },
  { id: 'person', label: 'People', icon: 'users' },
  { id: 'publication', label: 'Publications', icon: 'book' },
  { id: 'fund', label: 'Funds', icon: 'wallet' },
];

export const SCOPE_BY_ID: Record<ScopeId, Scope> = Object.fromEntries(
  SCOPES.map((s) => [s.id, s]),
) as Record<ScopeId, Scope>;

/** Group render order for results. */
export const GROUP_ORDER: EntityType[] = ['project', 'contract', 'person', 'publication', 'fund'];

/** Per-group cap when browsing a scope with no query. */
export const BROWSE_CAP = 6;

export const DATA: Entity[] = [
  { type: 'project', title: '2001-006-00 Salmon/Steelhead Days', sub: 'Project · FY2001 · Active' },
  { type: 'project', title: '2002-051-00 Salmon Subbasin Planning', sub: 'Project · FY2002 · Active' },
  { type: 'project', title: '2002-032-00 Passage of ESA-Listed Juvenile Salmon', sub: 'Project · FY2002' },
  { type: 'project', title: '2002-033-00 John Day Salmonid Monitoring Program', sub: 'Project · FY2002 · Active' },
  { type: 'project', title: '2001-025-00 Salmonid Production in Restored Rattlesnake Creek', sub: 'Project · FY2001' },
  { type: 'project', title: '1996-019-00 Hood River Production Program', sub: 'Project · FY1996 · Active' },

  { type: 'contract', title: '[10046] 2001-006-01 Salmon/Steelhead Days', sub: 'Contract · Project 2001-006-00' },
  { type: 'contract', title: '[10205] 2001-006-02 Trout/Salmon Watch', sub: 'Contract · Project 2001-006-00' },
  { type: 'contract', title: '[10217] 2001-025-00 Salmonid Production, Rattlesnake Creek', sub: 'Contract · Project 2001-025-00' },
  { type: 'contract', title: '[10253 REL 32] Shoshone-Bannock Tribe — Salmon Subbasin', sub: 'Contract · Project 2002-051-00' },
  { type: 'contract', title: '[10253 REL 33] Nez Perce Tribe — Salmon Subbasin', sub: 'Contract · Project 2002-051-00' },
  { type: 'contract', title: '[10255 REL 18] Idaho Dept of Fish & Game — Salmon Subbasin', sub: 'Contract · Project 2002-051-00' },
  { type: 'contract', title: '[10952] 2002-033-00 John Day Salmonid Monitoring', sub: 'Contract · Project 2002-033-00' },

  { type: 'person', title: 'Andrew Lovseth', sub: 'Bonneville Power Administration · Project lead' },
  { type: 'person', title: 'Angela Zhao', sub: 'NW Power & Conservation Council · Program analyst' },
  { type: 'person', title: 'David Roberts', sub: 'Nez Perce Tribe · Fisheries biologist' },
  { type: 'person', title: 'Maria Gonzales', sub: 'Idaho Dept of Fish & Game · Salmon program' },
  { type: 'person', title: 'Gloria Scott', sub: 'Environmental Technologist IV · DT-Technology Services, Portland' },
  { type: 'person', title: 'Dan Squires', sub: 'Environmental Technologist II · Portland' },
  { type: 'person', title: 'John Vivio', sub: 'Software Developer/Architect IV · Portland' },
  { type: 'person', title: 'Adrian Mickel', sub: 'Software Developer II · Portland' },
  { type: 'person', title: 'Hunter Kennedy', sub: 'Software Developer II · Sacramento' },
  { type: 'person', title: 'Rex Ounekeo', sub: 'Software Developer III · Portland' },
  { type: 'person', title: 'Tom Kamin', sub: 'Software Developer III · Portland' },
  { type: 'person', title: 'Michael Ferrante', sub: 'Software Developer/Architect IV · Portland' },

  { type: 'publication', title: '2023 Annual Progress Report — Salmon Recovery', sub: 'Publication · Report Center' },
  { type: 'publication', title: 'Subbasin Plan: Salmon River', sub: 'Publication · Planning document' },
  { type: 'publication', title: 'Smolt Monitoring Protocol (rev. 4)', sub: 'Publication · Methods' },

  { type: 'fund', title: 'Salmon Mitigation Fund (FY26)', sub: 'Fund · $24.7M committed' },
  { type: 'fund', title: 'Anadromous Fish Screening Fund', sub: 'Fund · $8.1M committed' },
];

/** Recently-viewed entities shown in the default (no-query) empty state. */
export const RECENT: Entity[] = [
  { type: 'project', title: '2002-051-00 Salmon Subbasin Planning', sub: 'Project · viewed 2h ago' },
  { type: 'contract', title: '[10046] 2001-006-01 Salmon/Steelhead Days', sub: 'Contract · viewed yesterday' },
  { type: 'person', title: 'David Roberts', sub: 'Nez Perce Tribe · viewed yesterday' },
  { type: 'publication', title: '2023 Annual Progress Report — Salmon Recovery', sub: 'Publication · viewed 3d ago' },
];

// ── src/components/search/omni-render.ts ──
// Shared render core for the search surfaces — used by BOTH the command palette
// (cbf-omni-search) and the full results page (/search). Pure builders + the
// impersonation helper, so the two surfaces stay pixel-identical and never drift.
// Styling for what these build lives under .cbf-search-surface (cbf-omni-search).
import { svg, type IconName } from './icons';
import {
  SCOPES,
  SCOPE_BY_ID,
  DATA,
  RECENT,
  GROUP_ORDER,
  type Entity,
  type EntityType,
  type ScopeId,
} from './omni-data';

export const esc = (s: string): string =>
  s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string);

export function highlight(text: string, q: string): string {
  if (!q) return esc(text);
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}

export function filterData(query: string, scope: ScopeId): Entity[] {
  const q = query.trim().toLowerCase();
  return DATA.filter((d) => {
    if (scope !== 'all' && d.type !== scope) return false;
    if (!q) return true;
    return d.title.toLowerCase().includes(q) || d.sub.toLowerCase().includes(q);
  });
}

export interface RowHandlers {
  onSelect: (item: Entity) => void;
  onImpersonate: (item: Entity) => void;
}

function icon(name: IconName, px: number): string {
  return `<span class="cbf-icon">${svg(name, px)}</span>`;
}

export function makeRow(item: Entity, query: string, lead: boolean, h: RowHandlers): HTMLElement {
  const row = document.createElement('div');
  row.className = 'cbf-result';
  const leadHtml = lead ? `<span class="cbf-result__lead">${icon(SCOPE_BY_ID[item.type].icon, 16)}</span>` : '';
  const impHtml =
    item.type === 'person'
      ? `<button class="cbf-impersonate" type="button" data-impersonate>${icon('hat-glasses', 15)}Impersonate</button>`
      : '';
  row.innerHTML = `${leadHtml}
    <div class="cbf-result__body">
      <div class="cbf-result__title">${highlight(item.title, query)}</div>
      <div class="cbf-result__sub">${esc(item.sub)}</div>
    </div>
    ${impHtml}
    <span class="cbf-result__chevron cbf-icon">${svg('chevron-right', 17)}</span>`;
  row.addEventListener('click', () => h.onSelect(item));
  const imp = row.querySelector<HTMLElement>('[data-impersonate]');
  if (imp) imp.addEventListener('click', (e) => { e.stopPropagation(); h.onImpersonate(item); });
  return row;
}

function groupEl(headIcon: IconName, label: string, count: string): HTMLElement {
  const g = document.createElement('div');
  g.className = 'cbf-result-group';
  g.innerHTML = `<div class="cbf-result-group__head">
      <span class="cbf-result-group__title">${icon(headIcon, 14)}${esc(label)}</span>
      ${count ? `<span class="cbf-result-group__count">${esc(count)}</span>` : ''}
    </div>`;
  return g;
}

/** Scope filter pills. Counts are shown ONLY when there's a query. */
export function renderScopePills(
  container: HTMLElement,
  opts: { scope: ScopeId; query: string; onSelect: (id: ScopeId) => void },
): void {
  container.innerHTML = '';
  const hasQuery = !!opts.query.trim();
  const matchingAll = filterData(opts.query, 'all');
  SCOPES.forEach((s) => {
    const n = s.id === 'all' ? matchingAll.length : matchingAll.filter((d) => d.type === s.id).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cbf-scope-pill' + (s.id === opts.scope ? ' is-active' : '');
    btn.innerHTML = icon(s.icon, 14) + esc(s.label) + (hasQuery ? ` <span class="cbf-scope-pill__count">${n}</span>` : '');
    btn.addEventListener('click', () => opts.onSelect(s.id));
    container.appendChild(btn);
  });
}

/** Vertical scope facets for the results-page sidebar. Counts only with a query. */
export function renderScopeFacets(
  container: HTMLElement,
  opts: { scope: ScopeId; query: string; onSelect: (id: ScopeId) => void },
): void {
  container.innerHTML = '';
  const hasQuery = !!opts.query.trim();
  const matchingAll = filterData(opts.query, 'all');
  SCOPES.forEach((s) => {
    const n = s.id === 'all' ? matchingAll.length : matchingAll.filter((d) => d.type === s.id).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cbf-facet' + (s.id === opts.scope ? ' is-active' : '');
    btn.innerHTML =
      `${icon(s.icon, 16)}<span class="cbf-facet__label">${esc(s.label)}</span>` +
      (hasQuery ? `<span class="cbf-facet__count">${n}</span>` : '');
    btn.addEventListener('click', () => opts.onSelect(s.id));
    container.appendChild(btn);
  });
}

/** Grouped results for a query. Returns the flat row list (for keyboard nav). */
export function renderResults(
  container: HTMLElement,
  opts: { query: string; scope: ScopeId } & RowHandlers,
): HTMLElement[] {
  const q = opts.query.trim();
  const matches = filterData(opts.query, opts.scope);
  container.innerHTML = '';
  const out: HTMLElement[] = [];
  if (matches.length === 0) {
    container.innerHTML = `<p class="cbf-result-empty">No matches for &ldquo;${esc(q)}&rdquo;. Try a different keyword or scope.</p>`;
    return out;
  }
  const order: EntityType[] = GROUP_ORDER;
  order.forEach((type) => {
    const items = matches.filter((m) => m.type === type);
    if (items.length === 0) return;
    const s = SCOPE_BY_ID[type];
    const g = groupEl(s.icon, s.label, String(items.length));
    items.forEach((item) => {
      const row = makeRow(item, q, false, opts);
      out.push(row);
      g.appendChild(row);
    });
    container.appendChild(g);
  });
  return out;
}

/** Recently-viewed list for the default (no-query) view. */
export function renderRecent(container: HTMLElement, h: RowHandlers): HTMLElement[] {
  container.innerHTML = '';
  const out: HTMLElement[] = [];
  const g = groupEl('history', 'Recent', '');
  RECENT.forEach((item) => {
    const row = makeRow(item, '', true, h);
    out.push(row);
    g.appendChild(row);
  });
  container.appendChild(g);
  return out;
}

// ---- impersonation (shared so palette + page behave identically) ----
let userDefaultHtml: string | null = null;

export function impersonateUser(person: Entity): void {
  const el = document.querySelector<HTMLElement>('[data-omni-user]');
  if (!el) return;
  if (userDefaultHtml === null) userDefaultHtml = el.innerHTML;
  el.classList.add('is-impersonating');
  el.innerHTML =
    `<span class="cbf-imp-badge">${icon('hat-glasses', 13)} Impersonating</span>` +
    `${icon('circle-user', 16)} ${esc(person.title)} ${icon('rotate-ccw', 12)}`;
}

/** Wire the header user menu to revert impersonation on click. Call once. */
export function initImpersonationRevert(): void {
  const el = document.querySelector<HTMLElement>('[data-omni-user]');
  if (!el) return;
  el.addEventListener('click', () => {
    if (!el.classList.contains('is-impersonating')) return;
    el.classList.remove('is-impersonating');
    if (userDefaultHtml !== null) el.innerHTML = userDefaultHtml;
  });
}

// ── src/lib/base.ts ──
/**
 * Prefix a root-relative path with Astro's configured `base`.
 *
 * Use for anything Astro WON'T rewrite for us: `public/` asset references
 * (`<img src>`, CSS `url()`) and hand-written internal links/redirects.
 * Assets imported through the build pipeline already get the base — don't
 * wrap those.
 *
 * `import.meta.env.BASE_URL` always ends in `/` (e.g. `/cb-fish-design/` in
 * a production build, `/` in dev), so we strip any leading slash from `path`
 * to avoid a doubled separator.
 */
export const withBase = (path: string): string =>
  import.meta.env.BASE_URL + path.replace(/^\//, '');

// ── src/components/search/omni-search.client.ts ──
// Command-palette behavior (CBF-8117). The rendering is shared with the /search
// page via omni-render; this file owns palette-only concerns: open/close, the
// empty↔results toggle, keyboard navigation, and "view all results" → /search.
import {
  renderScopePills,
  renderResults,
  renderRecent,
  filterData,
  impersonateUser,
  initImpersonationRevert,
} from './omni-render';
import { SCOPES, type Entity, type ScopeId } from './omni-data';
import { withBase } from '../../lib/base';

export function initOmniSearch(): void {
  const omni = document.querySelector<HTMLElement>('[data-omni]');
  if (!omni) return;

  const input = omni.querySelector<HTMLInputElement>('[data-omni-input]')!;
  const scopesEl = omni.querySelector<HTMLElement>('[data-omni-scopes]')!;
  const resultsEl = omni.querySelector<HTMLElement>('[data-omni-results]')!;
  const emptyEl = omni.querySelector<HTMLElement>('[data-omni-empty]')!;
  const recentEl = omni.querySelector<HTMLElement>('[data-omni-recent]')!;
  const showall = omni.querySelector<HTMLElement>('[data-omni-showall]')!;
  const showallLabel = omni.querySelector<HTMLElement>('[data-omni-showall-label]')!;
  const trigger = document.querySelector<HTMLElement>('[data-omni-open]');

  let scope: ScopeId = 'all';
  let rows: HTMLElement[] = [];
  let active = 0;

  function setActive(idx: number): void {
    active = idx;
    rows.forEach((r, i) => r.classList.toggle('is-active', i === idx));
    rows[idx]?.scrollIntoView({ block: 'nearest' });
  }

  const handlers = {
    onSelect: (item: Entity) => {
      console.log('[CBF-8117] selected:', item.type, '—', item.title);
      closePalette();
    },
    onImpersonate: (item: Entity) => {
      impersonateUser(item);
      closePalette();
    },
  };

  function bindActiveOnHover(): void {
    rows.forEach((row, i) => row.addEventListener('mousemove', () => setActive(i)));
  }

  function refresh(): void {
    renderScopePills(scopesEl, { scope, query: input.value, onSelect: (id) => { scope = id; refresh(); } });
    // no query → no counts, no results: show the Recent + illustration empty state
    const isDefault = !input.value.trim();
    if (isDefault) {
      emptyEl.hidden = false;
      resultsEl.hidden = true;
      showall.hidden = true;
      rows = renderRecent(recentEl, handlers);
    } else {
      emptyEl.hidden = true;
      resultsEl.hidden = false;
      rows = renderResults(resultsEl, { query: input.value, scope, ...handlers });
      const total = filterData(input.value, scope).length;
      showall.hidden = total === 0;
      showallLabel.textContent = `Show all ${total} result${total === 1 ? '' : 's'}`;
    }
    bindActiveOnHover();
    active = 0;
    if (rows.length) setActive(0);
  }

  function goToResults(): void {
    const params = new URLSearchParams();
    if (input.value.trim()) params.set('q', input.value.trim());
    if (scope !== 'all') params.set('scope', scope);
    const qs = params.toString();
    window.location.href = withBase('/search') + (qs ? `?${qs}` : '');
  }

  function openPalette(): void {
    omni!.hidden = false;
    input.value = '';
    scope = 'all';
    refresh();
    setTimeout(() => input.focus(), 0);
  }
  function closePalette(): void {
    omni!.hidden = true;
  }

  // ---- wiring ----
  input.addEventListener('input', refresh);
  omni.querySelector('[data-omni-clear]')!.addEventListener('click', () => { input.value = ''; refresh(); input.focus(); });
  omni.querySelector('[data-omni-close]')!.addEventListener('click', closePalette);
  showall.addEventListener('click', goToResults);
  trigger?.addEventListener('click', openPalette);
  initImpersonationRevert();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); goToResults(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(active + 1, rows.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(active - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); rows[active]?.click(); }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const i = SCOPES.findIndex((s) => s.id === scope);
      scope = SCOPES[(i + (e.shiftKey ? SCOPES.length - 1 : 1)) % SCOPES.length].id;
      refresh();
    }
  });

  document.addEventListener('keydown', (e) => {
    const el = document.activeElement;
    const typing = el instanceof HTMLElement && /^(INPUT|TEXTAREA)$/.test(el.tagName);
    if (e.key === '/' && !typing) { e.preventDefault(); openPalette(); }
    else if (e.key === 'Escape') { closePalette(); }
  });
}
```
