# Habitat Design Tool: markup

```html
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
          <!-- …and 6 more like this (<li class="esa-breadcrumbs__item">) -->
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
            ><span class="esa-button__label">← Back to work element</span></a
          ></span
        >
        <span onclick="clearAll()">
          <span
            class="esa-button esa-button--variant-ghost esa-button--appearance-outline esa-button--sm"
            ><button class="esa-button__native typography-microcopy-xs" type="button">
              <span class="esa-button__label">Clear all</span>
            </button></span
          >
        </span>
        <span onclick="openSOW()">
          <span
            class="esa-button esa-button--variant-primary esa-button--appearance-fill esa-button--sm"
            ><button class="esa-button__native typography-microcopy-xs" type="button">
              <span class="esa-button__label">Export metrics</span>
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
                ><span class="wz-v-phase-label">Pre-project</span
                ><span class="wz-v-phase-count">0/10</span>
              </div>
              <div class="wz-v-section-body">
                <div
                  class="wz-v-item wz-v-item--nav"
                  onclick="wizardGoToStep(0)"
                  title="Go to: Project boundary"
                >
                  <div class="wz-v-left">
                    <div class="wz-v-circle active">1</div>
                    <div class="wz-v-line"></div>
                  </div>
                  <div class="wz-v-label active">Project boundary</div>
                </div>
                <div
                  class="wz-v-item wz-v-item--nav"
                  onclick="wizardGoToStep(1)"
                  title="Go to: Stream reach"
                >
                  <div class="wz-v-left">
                    <div class="wz-v-circle">2</div>
                    <div class="wz-v-line"></div>
                  </div>
                  <div class="wz-v-label">Stream reach</div>
                </div>
                <!-- …and 8 more like this (<div class="wz-v-item wz-v-item--nav">) -->
              </div>
            </div>
            <div class="wz-phase-group" data-phase="work">
              <div class="wz-phase-group-title">Project design</div>
              <div class="wz-v-section">
                <div class="wz-v-phase-head" onclick="toggleWzSection('hip')">
                  <span class="wz-v-phase-caret">▸</span
                  ><span class="wz-v-phase-label">Types of work</span
                  ><span class="wz-v-phase-count">0/2</span>
                </div>
                <div class="wz-v-section-body">
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(10)"
                    title="Go to: Types of work"
                  >
                    <div class="wz-v-left">
                      <div class="wz-v-circle">11</div>
                      <div class="wz-v-line"></div>
                    </div>
                    <div class="wz-v-label">Types of work</div>
                  </div>
                  <div
                    class="wz-v-item wz-v-item--nav"
                    onclick="wizardGoToStep(11)"
                    title="Go to: Complete"
                  >
                    <div class="wz-v-left"><div class="wz-v-circle">12</div></div>
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
              <div class="wz-step-num">Step 1 of 12</div>
              <div class="wz-step-title">Draw project boundary</div>
              <div class="wz-step-desc">
                Draw the outer boundary of your project area. This helps auto-clip the stream reach
                and other features to your site.
              </div>
              <div class="wz-help">
                <div class="wz-help-head" onclick="toggleWzHelp(this)">
                  <span class="wz-help-icon">ⓘ</span><span>Learn more about project boundary</span
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
                ■ Draw project boundary
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
                  Add a work element to begin entering pre-project metrics and habitat work details.
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
                <div class="sbt"><span class="sbt-dot"></span>Pre-project conditions</div>
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
                  <div class="pm-head"><span class="pm-label">Project perimeter</span></div>
                  <div class="pm-desc">Generalized boundary of the project footprint.</div>
                  <div class="pm-meas-row">
                    <button class="pm-draw-btn" onclick="startPPDraw('perimeter', 0)">
                      ▮ Draw polygon</button
                    ><span class="pm-not-drawn">not drawn</span>
                  </div>
                </div>
                <div id="pm-row-reach_len" class="pm-row">
                  <div class="pm-head"><span class="pm-label">Reach length</span></div>
                  <div class="pm-desc">C/L of existing stream channel.</div>
                  <div class="pm-meas-row">
                    <button class="pm-draw-btn" onclick="startPPDraw('reach_len', 0)">
                      📏 Draw line</button
                    ><button class="pm-draw-btn" onclick="startReachAutoDetect()">
                      🌐 Auto-detect</button
                    ><span class="pm-not-drawn">not drawn</span>
                  </div>
                </div>
                <!-- …and 13 more like this (<div class="pm-row">) -->
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
                      src="https://tile.openstreetmap.org/7/20/45.png"
                      class="leaflet-tile leaflet-tile-loaded"
                      style="
                        width: 256px;
                        height: 256px;
                        transform: translate3d(23px, 194px, 0px);
                        opacity: 1;
                      "
                    /><img
                      alt=""
                      src="https://tile.openstreetmap.org/7/21/45.png"
                      class="leaflet-tile leaflet-tile-loaded"
                      style="
                        width: 256px;
                        height: 256px;
                        transform: translate3d(279px, 194px, 0px);
                        opacity: 1;
                      "
                    /><!-- …and 10 more like this (<img class="leaflet-tile leaflet-tile-loaded">) -->
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
                        transform: translate3d(23px, 194px, 0px);
                        opacity: 1;
                      "
                    /><img
                      alt=""
                      src="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/7/45/21"
                      class="leaflet-tile leaflet-tile-loaded"
                      style="
                        width: 256px;
                        height: 256px;
                        transform: translate3d(279px, 194px, 0px);
                        opacity: 1;
                      "
                    /><!-- …and 10 more like this (<img class="leaflet-tile leaflet-tile-loaded">) -->
                  </div>
                </div>
              </div>
              <div class="leaflet-pane leaflet-overlay-pane"></div>
              <div class="leaflet-pane leaflet-shadow-pane"></div>
              <div class="leaflet-pane leaflet-marker-pane"></div>
              <div class="leaflet-pane leaflet-tooltip-pane"></div>
              <!-- …and 1 more like this (<div class="leaflet-pane leaflet-tile-pane">) -->
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
                    ⌖ Zoom to project</button
                  ><button
                    class="zoom-we-btn"
                    style="margin-top: 0; margin-right: 4px"
                    id="pp-layer-toggle-btn"
                    onclick="togglePPLayers()"
                  >
                    Hide pre-project</button
                  ><button
                    class="zoom-we-btn"
                    style="margin-top: 0; margin-right: 4px"
                    id="label-toggle-btn"
                    onclick="toggleLabels()"
                  >
                    Hide labels</button
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
                    <label class="layer-row"><input type="radio" name="basemap" /> Street map</label
                    ><label class="layer-row"><input type="radio" name="basemap" /> Satellite</label
                    ><!-- …and 2 more like this (<label class="layer-row">) -->
                    <div class="layer-section-title" style="margin-top: 8px">Overlays</div>
                    <label class="layer-row"><input type="checkbox" /> NHD streams</label
                    ><esa-range-slider
                      class="layer-opacity-slider"
                      min="0"
                      max="100"
                      step="5"
                      size="sm"
                      style="display: block"
                    ></esa-range-slider
                    ><label class="layer-row"><input type="checkbox" /> NWI wetlands</label
                    ><esa-range-slider
                      class="layer-opacity-slider"
                      min="0"
                      max="100"
                      step="5"
                      size="sm"
                      style="display: none"
                    ></esa-range-slider
                    ><label class="layer-row"><input type="checkbox" /> USGS hillshade</label
                    ><esa-range-slider
                      class="layer-opacity-slider"
                      min="0"
                      max="100"
                      step="5"
                      size="sm"
                      style="display: none"
                    ></esa-range-slider
                    ><label class="layer-row"><input type="checkbox" /> NLCD land cover</label
                    ><esa-range-slider
                      class="layer-opacity-slider"
                      min="0"
                      max="100"
                      step="5"
                      size="sm"
                      style="display: none"
                    ></esa-range-slider
                    ><label class="layer-row"
                      ><input type="checkbox" /> StreamNet fish distribution</label
                    ><esa-select
                      class="layer-species-select"
                      size="sm"
                      style="display: none"
                    ></esa-select
                    ><esa-range-slider
                      class="layer-opacity-slider"
                      min="0"
                      max="100"
                      step="5"
                      size="sm"
                      style="display: none"
                    ></esa-range-slider>
                    <div id="ref-image-section">
                      <div class="layer-section-title" style="margin-top: 8px">Reference image</div>
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
                  <a href="https://leafletjs.com" title="A JavaScript library for interactive maps"
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
                  <span aria-hidden="true">|</span> © OpenStreetMap contributors, © USGS 3DHP/NHD
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
                <div class="leg-sec-title">
                  Pre-project
                  <span style="font-weight: 400; color: var(--color-text-muted, #888)"
                    >(dashed)</span
                  >
                </div>
                <div class="leg-row">
                  <span
                    class="leg-poly"
                    style="
                      background: repeating-linear-gradient(
                        90deg,
                        rgb(239, 95, 0) 0 5px,
                        transparent 5px 8px
                      );
                    "
                  ></span
                  >Reach
                </div>
                <div class="leg-row">
                  <span
                    class="leg-poly"
                    style="
                      background: repeating-linear-gradient(
                        90deg,
                        rgb(62, 99, 221) 0 5px,
                        transparent 5px 8px
                      );
                    "
                  ></span
                  >Channel area
                </div>
                <!-- …and 3 more like this (<div class="leg-row">) -->
              </div>
              <div class="leg-section">
                <div class="leg-sec-title">Design</div>
                <div class="leg-row">
                  <span class="leg-poly" style="background: rgb(239, 95, 0)"></span>Reach / primary
                  channel
                </div>
                <div class="leg-row">
                  <span class="leg-poly" style="background: rgb(62, 99, 221)"></span>Channel area
                </div>
                <!-- …and 2 more like this (<div class="leg-row">) -->
              </div>
              <!-- …and 4 more like this (<div class="leg-section">) -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
