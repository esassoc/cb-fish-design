# Main

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **map-sow** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4321/cb-fish-design/map-sow/
- **Section element:** `<main>`
- **Components:** esa-breadcrumbs (hub), esa-button (hub), esa-container (hub)

## Markup (de-scoped, framework-free)
```html
<main class="msow-page">
  <div class="esa-container" style="--_container-max: 1920px">
    <div class="msow-card">
      <!-- Gold breadcrumb strip -->
      <div class="msow-crumb-strip">
        <nav class="esa-breadcrumbs esa-breadcrumbs--md" aria-label="Breadcrumb">
          <ol class="esa-breadcrumbs__list">
            <li class="esa-breadcrumbs__item">
              <a href="/cb-fish-design/" class="esa-breadcrumbs__link">
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
              <span class="esa-breadcrumbs__current"> Habitat Design Tool </span>
            </li>
          </ol>
        </nav>
      </div>
      <!-- Toolbar: H1 + contract metadata | WE switcher | actions -->
      <div class="msow-toolbar">
        <div class="msow-toolbar-identity">
          <h1 class="msow-tool-title">Habitat Design Tool</h1>
          <div class="msow-contract-meta">
            <span>#84051 REL 50</span> <span class="msow-meta-sep">·</span> <span>FY 2026</span>
            <span class="msow-meta-sep">·</span> <span>Virginia Preiss</span>
          </div>
        </div>
        <!-- WE selector/edit/delete/add hidden for now — per request, kept for easy restore.
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
              <EsaButton color="primary" size="sm" icon="plus">Add WE</EsaButton>
            </span>
          </div>
          -->
        <div class="msow-toolbar-actions">
          <span onclick="clearAll()">
            <span
              class="esa-button esa-button--color-ghost esa-button--appearance-outline esa-button--sm"
            >
              <button class="esa-button__native" type="button">
                <span class="esa-button__label"> Clear All </span>
              </button>
            </span>
          </span>
          <span onclick="openSOW()">
            <span
              class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--sm"
            >
              <button class="esa-button__native" type="button">
                <span class="esa-button__label"> Export Metrics </span>
              </button>
            </span>
          </span>
        </div>
      </div>
      <!-- GIS layout: [wizard column] [sidebar] [map] — wizard only visible when active -->
      <div class="msow-root">
        <div id="msow-layout">
          <!-- Wizard column — rendered by renderWizardStep(); shown by CSS default (Guided is the only mode) -->
          <div id="wizard-panel" role="region" aria-label="Guided workflow"></div>
          <div id="sidebar" role="complementary" aria-label="Work element details">
            <!-- Wizard step body — shown when guided mode is active -->
            <div id="wizard-body-panel"></div>
            <!-- Expert panel — default view -->
            <div id="expert-panel">
              <div id="sidebar-empty" aria-live="polite">
                <div class="big" aria-hidden="true">✎</div>
                <p>
                  Add a work element to begin entering pre-project metrics and habitat work details.
                </p>
              </div>
              <div id="inner-tabbar" role="tablist" aria-label="Work element sections">
                <div
                  class="itab active"
                  id="itab-pp"
                  role="tab"
                  aria-selected="true"
                  aria-controls="pp-side"
                  tabindex="0"
                  onclick="showInnerTab('pp')"
                  onkeydown="if (event.key === 'Enter' || event.key === ' ') showInnerTab('pp');"
                >
                  Pre-Project <span class="badge warn" id="pp-badge">0/11</span>
                </div>
                <div
                  class="itab"
                  id="itab-work"
                  role="tab"
                  aria-selected="false"
                  aria-controls="work-side"
                  tabindex="-1"
                  onclick="showInnerTab('work')"
                  onkeydown="if (event.key === 'Enter' || event.key === ' ') showInnerTab('work');"
                >
                  Habitat Work
                </div>
              </div>
              <div id="pp-side" role="tabpanel" aria-labelledby="itab-pp"></div>
              <div id="work-side" role="tabpanel" aria-labelledby="itab-work"></div>
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
                          transform: translate3d(31px, 132px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://a.basemaps.cartocdn.com/rastertiles/voyager/7/21/45.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(287px, 132px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://b.basemaps.cartocdn.com/rastertiles/voyager/7/20/44.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(31px, -124px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://c.basemaps.cartocdn.com/rastertiles/voyager/7/21/44.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(287px, -124px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://a.basemaps.cartocdn.com/rastertiles/voyager/7/20/46.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(31px, 388px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://b.basemaps.cartocdn.com/rastertiles/voyager/7/21/46.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(287px, 388px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://b.basemaps.cartocdn.com/rastertiles/voyager/7/19/45.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-225px, 132px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://b.basemaps.cartocdn.com/rastertiles/voyager/7/22/45.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(543px, 132px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://a.basemaps.cartocdn.com/rastertiles/voyager/7/19/44.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-225px, -124px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://a.basemaps.cartocdn.com/rastertiles/voyager/7/22/44.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(543px, -124px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://c.basemaps.cartocdn.com/rastertiles/voyager/7/19/46.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-225px, 388px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://c.basemaps.cartocdn.com/rastertiles/voyager/7/22/46.png"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(543px, 388px, 0px);
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
                          transform: translate3d(31px, 132px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/45/21"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(287px, 132px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/44/20"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(31px, -124px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/44/21"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(287px, -124px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/46/20"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(31px, 388px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/46/21"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(287px, 388px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/45/19"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-225px, 132px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/45/22"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(543px, 132px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/44/19"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-225px, -124px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/44/22"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(543px, -124px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/46/19"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(-225px, 388px, 0px);
                          opacity: 1;
                        "
                      /><img
                        alt=""
                        src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/46/22"
                        class="leaflet-tile leaflet-tile-loaded"
                        style="
                          width: 256px;
                          height: 256px;
                          transform: translate3d(543px, 388px, 0px);
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
                      ><label class="layer-row"><input type="radio" name="basemap" /> Topo</label>
                      <div class="layer-section-title" style="margin-top: 8px">Overlays</div>
                      <label class="layer-row"><input type="checkbox" /> NHD Streams</label
                      ><input
                        type="range"
                        class="layer-opacity"
                        min="0"
                        max="1"
                        step="0.05"
                        style="display: block"
                      /><label class="layer-row"><input type="checkbox" /> NWI Wetlands</label
                      ><input
                        type="range"
                        class="layer-opacity"
                        min="0"
                        max="1"
                        step="0.05"
                        style="display: none"
                      /><label class="layer-row"><input type="checkbox" /> USGS Hillshade</label
                      ><input
                        type="range"
                        class="layer-opacity"
                        min="0"
                        max="1"
                        step="0.05"
                        style="display: none"
                      /><label class="layer-row"><input type="checkbox" /> NLCD Land Cover</label
                      ><input
                        type="range"
                        class="layer-opacity"
                        min="0"
                        max="1"
                        step="0.05"
                        style="display: none"
                      />
                    </div>
                  </div>
                </div>
                <div class="leaflet-bottom leaflet-left"></div>
                <div class="leaflet-bottom leaflet-right">
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
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.esa-container {
  width: 100%;
  max-width: var(--_container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--container-gutter, var(--spacing-600, 2rem));
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
html:has(.msow-page) {
  height: 100%;
}
html:has(.msow-page) body {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.msow-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-block: var(--spacing-600);
  overflow: hidden;
  min-height: 0;
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
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--color-surface-inverse) 8%, transparent);
}
.msow-crumb-strip {
  background: var(--color-gold-50);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-400) var(--spacing-600);
  flex-shrink: 0;
}
.msow-crumb-strip .esa-breadcrumbs {
  --breadcrumbs-link-color: var(--color-text-secondary);
  --breadcrumbs-link-hover: var(--color-primary);
}
.msow-toolbar {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-300) var(--spacing-600);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-600);
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
  font-weight: var(--font-weight-bold);
  font-family: var(--font-display, var(--font-sans));
  color: var(--color-surface-inverse);
  white-space: nowrap;
  line-height: 1.2;
}
.msow-contract-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
  font-size: 11px;
  color: var(--color-text-muted);
}
.msow-meta-sep {
  color: var(--color-border-strong);
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
.leg-title {
  font-size: 10px;
  font-weight: var(--font-weight-bold);
  color: var(--color-surface-inverse);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}
.leg-toggle {
  cursor: pointer;
  color: var(--color-text-muted);
  font-weight: var(--font-weight-regular);
  text-transform: none;
  letter-spacing: 0;
  font-size: 11px;
}
.leg-body.collapsed {
  display: none;
}
.msow-welcome-btn,
.msow-welcome-btn .esa-button {
  display: block;
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
  background: var(--color-primary);
  color: var(--color-text-inverse, #fff);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  box-shadow: 0 1px 4px #0006;
  white-space: nowrap;
}
.layer-control-btn {
  background: var(--color-primary);
  color: var(--color-text-inverse, #fff);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  box-shadow: 0 1px 4px #0006;
  white-space: nowrap;
}
.layer-control-panel {
  background: var(--color-primary);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  padding: 10px 12px;
  margin-top: 4px;
  min-width: 170px;
  box-shadow: 0 2px 8px #0006;
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
.esa-button--sm .esa-button__native {
  height: auto;
  padding-block: var(--spacing-150, 6px);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button--color-ghost .esa-button__native {
  background: transparent;
  color: var(--color-text-primary, #171717);
  border-color: transparent;
}
.esa-button--color-ghost.esa-button--appearance-outline .esa-button__native,
.esa-button--color-ghost.esa-button--appearance-dashed .esa-button__native {
  border-color: var(--color-border, #e5e5e5);
}
.esa-button__label {
  white-space: nowrap;
}
.esa-button--color-primary {
  --_accent-text: var(--color-primary-strong);
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: transparent;
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
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--breadcrumbs-link-color` | `#525252` | component |
| `--breadcrumbs-link-hover` | `#3d3d3d` | component |
| `--breadcrumbs-separator-color` | `#bbbbbb` | component |
| `--color-border` | `#dcdcdc` | semantic |
| `--color-border-strong` | `#bdbdbd` | semantic |
| `--color-primary` | `#1e5386` | semantic |
| `--color-primary-hover` | `#1a4570` | semantic |
| `--color-primary-strong` | `#2a7e3b` | semantic |
| `--color-surface` | `#fcfcfc` | semantic |
| `--color-surface-inverse` | `#13273e` | semantic |
| `--color-text-inverse` | `#fcfcfc` | semantic |
| `--color-text-muted` | `#7c7c7c` | semantic |
| `--color-text-primary` | `#3d3d3d` | semantic |
| `--color-text-secondary` | `#525252` | semantic |
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
| `--form-padding-x-md` | `.75rem` | component |
| `--form-padding-x-sm` | `.625rem` | component |
| `--form-radius-md` | `.5rem` | component |
| `--form-radius-sm` | `.25rem` | component |
| `--radius-100` | `.25rem` | primitive |
| `--spacing-100` | `.25rem` | primitive |
| `--spacing-150` | `.375rem` | primitive |
| `--spacing-200` | `.5rem` | primitive |
| `--spacing-300` | `.75rem` | primitive |
| `--spacing-400` | `1rem` | primitive |
| `--spacing-600` | `2rem` | primitive |
| `--transition-fast` | `.15s ease` | primitive |
| `--type-size-200` | `clamp(.75rem, .66rem + .44vw, .9375rem)` | primitive |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
