// bcn-lego-checked: this is the render layer for a large, organically-grown prototype —
// most sidebar/wizard markup is built as innerHTML strings (predates component-first).
// All type="text" fields (descriptions, names) and the type="number" fields that don't
// need min/max/step (fInput() and its callers) are now esa-text-field. Native
// type="number" fields that DO rely on min/step (piece counts, depths, widths, etc.)
// are intentionally left raw: esa-text-field has no min/max/step passthrough at all
// (checked its render() — only type/value/placeholder/disabled/required reach the
// internal input), and dropping that validation/spinner affordance on quantity fields
// is a real functional loss, not just a style change. #map-search-input (a Leaflet
// map-surface search control, not a form field) is also intentionally left raw — an
// esa-text-field's bordered/padded chrome doesn't fit a transparent control embedded
// in a compact toolbar row next to an icon button. Don't take this comment as blanket
// cover for new bespoke input markup.

// ── PP metric definitions ─────────────────────────────────────────────────
var PP_DEFS = [
  {id:'perimeter', label:'Project Perimeter',           geo:'polygon', method:'measured', multi:0, segment:false, desc:'Generalized boundary of the project footprint.'},
  {id:'reach_len', label:'Reach Length',                geo:'line',    method:'measured', multi:0, segment:false, desc:'C/L of existing stream channel.'},
  {id:'valley_len',label:'Valley Length',               geo:'line',    method:'calc',     multi:0, segment:false, desc:'Straight-line distance between reach start and end points (auto-calculated from reach).'},
  {id:'sinuosity', label:'Sinuosity',                   geo:null,      method:'calc',     multi:0, segment:false, desc:'Reach Length divided by Valley Length.'},
  {id:'avg_slope', label:'Average Reach Slope',         geo:null,      method:'calc',     multi:0, segment:false, desc:'Auto-calculated from USGS 10M DEM elevation data.'},
  {id:'ch_width',  label:'Average Channel Width',       geo:'line',    method:'measured', multi:3, segment:false, desc:'3 cross-section lines at representative riffle locations.'},
  {id:'bank_ht',   label:'Average Bank Height',         geo:null,      method:'calc',     multi:0, segment:false, desc:'Auto-calculated as the average of bank heights entered with each channel width measurement.'},
  {id:'area_ch',   label:'Area of Channel',             geo:'polygon', method:'measured', multi:0, segment:false, desc:'Digitize over data layers.'},
  {id:'fp_left',   label:'Left Floodplain Area',        geo:'line',    method:'measured', multi:0, segment:false, desc:'Draw the outer edge of the left floodplain — inner edge auto-completes along channel buffer.'},
  {id:'fp_right',  label:'Right Floodplain Area',       geo:'line',    method:'measured', multi:0, segment:false, desc:'Draw the outer edge of the right floodplain — inner edge auto-completes along channel buffer.'},
  {id:'fp_width',  label:'Average Width of Floodplain', geo:'line',    method:'calc',     multi:0, segment:false, desc:'Auto-calculated: Total floodplain area ÷ reach length.'},
  {id:'area_fp',   label:'Total Active Floodplain Area',geo:null,      method:'calc',     multi:0, segment:false, desc:'Auto-calculated: Left + Right floodplain areas.'},
  {id:'fp_poly',   label:'Floodplain Area',             geo:'polygon', method:'measured', multi:0, segment:false, desc:'Draw the floodplain extent — the stream channel is subtracted automatically to give net floodplain area.'},
  {id:'pc_fp',     label:'New Floodplain',              geo:'polygon', method:'measured', multi:0, segment:false, desc:'Draw the designed floodplain extent — the primary channel area is subtracted automatically.'},
  {id:'substrate', label:'Reach-Averaged Substrate',    geo:null,      method:'entered',  multi:0, segment:false, desc:'Prioritization substrate data layer.', inputLabel:'Dominant substrate', inputType:'select', opts:['','Silt','Sand','Gravel','Cobble','Boulders','Bedrock']}
];

var TYPE_COLORS = {pc:'#1a7abf', fp:'#7b4fbf', rr:'#2a7a5c'};
var TYPE_LABELS = {pc:'Primary Channel', fp:'Floodplain', rr:'Riparian Restoration'};
var PP_COLOR = {polygon:'#7b4fbf', line:'#c07820', buffer:'#1a7abf', bufferFp:'#2a7a5c'};
var SOW_COLOR = {line:'#1a7abf', polygon:'#2a7a5c', segment:'#e07b28'};
var CHU_COLOR = {riffle:'#c07820', pool:'#1a7abf', glide:'#2a8a6a', run:'#7b4fbf', unassigned:'#e07b28'};
var CHU_CYCLE = ['riffle','pool','glide','run'];
// Wetlands get their own dedicated colors rather than the generic pre-project
// purple / habitat-work green — Existing Wetland Areas commonly sits under the
// Floodplain polygon (also purple) and Wetland Enhancement sits ON TOP of an
// Existing Wetland Area, so both need to read as distinct from what they overlap.
var WETLAND_COLOR = {existing:'#0c8599', enhance:'#c2185b'};
var activeBasemap = 'Street Map'; // read by updateNaipYearDisplay() outside the map-init closure
var STRUCT_COLOR = {cms:'#e07b28', mcs:'#1a7abf', css:'#c44a4a', fps:'#7b4fbf', scs:'#2a7a5c'};
var STRUCT_LABEL = {cms:'Channel Margin', mcs:'Mid Channel', css:'Channel Spanning', fps:'Floodplain', scs:'Side Channel'};

// ── State ─────────────────────────────────────────────────────────────────
var map;
var refImage = null;         // {overlay, bounds, opacity, rotation, fileName, naturalW, naturalH, locked}
var refImagePositioning = false;
var refImageHandles = {};    // {nw,ne,se,sw: L.circleMarker} — only populated while positioning
var workElements = [];  // [{id, name, types[], ppData{}, sowLayers{}, structures{}, inputVals{}}]
var activeWEId = null;
var activeInnerTab = 'pp';
var ppDrawing = null, sowDrawing = null, pendingStructPoint = null, pendingGravelPoint = null;
var drawPts = [], previewPL = null, previewPG = null;
var legCollapsed = true;
var weModalEditId = null; // null = new, else id of WE being edited
var lineEditing = null; // {type:'pp'|'sow', metricId or sowId, weId}
var chuDrawing = false; // whether we're drawing a CHU split line
var chuPoolMode  = false;  // true while drawing a pool boundary pair
var chuPoolPhase = 0;      // 1 = drew first boundary, waiting for second
var chuPendingPoolUpId   = null; // ID of upstream piece from first split
var chuPendingPoolDownId = null; // ID of downstream piece from first split
var chuDrawPts = [];    // pts being drawn for current split line
var chuSnapDist = 15;   // px snap distance to area_ch boundary

// Leaflet's map panning (and any Leaflet-draggable marker) treats a mousedown+mouseup
// as a real click only if the pointer moved less than this many px — default is 3,
// which is easy to exceed by accident (trackpad jitter, a slightly-shaky click) and
// silently drops the click instead of, say, placing a drawn vertex. Raising it globally
// via mergeOptions (Leaflet's supported way to change a class's defaults) makes clicks
// more forgiving everywhere without touching the custom vertex-edit-handle drag code,
// which uses its own raw mousemove/mouseup listeners rather than L.Draggable.
L.Draggable.mergeOptions({ clickTolerance: 10 });

// ── Init ──────────────────────────────────────────────────────────────────
window.onload = function() {
  // Welcome modal is disabled for now (see cbf-msow-modals.astro) — land on
  // a default work element directly instead of waiting for its `close`
  // event. If the modal comes back, move this back behind a `close` listener.
  createDefaultWE();

  // esa-tab-layout only updates its own internal active-tab state on click — it
  // doesn't know about #pp-side/#work-side, so route its event into showInnerTab().
  document.getElementById('inner-tabbar').addEventListener('tabchange', function(e) {
    showInnerTab(e.detail.index === 0 ? 'pp' : 'work');
  });

  map = L.map('map', {center:[46.5,-120.5], zoom:7, doubleClickZoom:false});
  L.control.scale({imperial:true, metric:true, position:'bottomright'}).addTo(map);

  // Zoom level display (bottom-right, above scale)
  var zoomDisplay = L.Control.extend({
    options: {position: 'bottomright'},
    onAdd: function() {
      var div = L.DomUtil.create('div','');
      div.style.cssText = 'background:rgba(30,83,134,0.9);color:rgba(255,255,255,0.75);font-size:11px;padding:2px 7px;border-radius:3px;margin-bottom:2px;pointer-events:none';
      div.id = 'zoom-display';
      div.textContent = 'Zoom: '+map.getZoom();
      map.on('zoomend', function(){ div.textContent = 'Zoom: '+map.getZoom(); });
      return div;
    }
  });
  new zoomDisplay().addTo(map);

  // NAIP imagery-year display (bottom-right, above zoom/scale) — only shown while
  // the USGS NAIP basemap is active. See updateNaipYearDisplay() for the fetch.
  var naipYearDisplayCtl = L.Control.extend({
    options: {position: 'bottomright'},
    onAdd: function() {
      var div = L.DomUtil.create('div','');
      div.style.cssText = 'background:rgba(30,83,134,0.9);color:rgba(255,255,255,0.9);font-size:11px;padding:2px 7px;border-radius:3px;margin-bottom:2px;pointer-events:none;display:none';
      div.id = 'naip-year-display';
      return div;
    }
  });
  new naipYearDisplayCtl().addTo(map);
  map.on('moveend', updateNaipYearDisplay);

  // Search box using Nominatim (OpenStreetMap geocoder)
  var searchControl = L.Control.extend({
    options: {position:'topleft'},
    onAdd: function() {
      var div = L.DomUtil.create('div','map-search-control');
      div.innerHTML =
        '<div style="display:flex;gap:4px;align-items:center;background:#fff;border:1px solid #dcdcdc;border-radius:4px;padding:4px 6px;box-shadow:0 2px 8px rgba(0,0,0,.15)">' +
        '<input id="map-search-input" type="text" placeholder="Search location..." aria-label="Search for a location" style="background:transparent;border:none;outline:none;color:#3d3d3d;font-size:12px;width:180px;" />' +
        '<button id="map-search-btn" aria-label="Search" style="background:#1e5386;border:none;color:#fff;border-radius:3px;padding:3px 8px;cursor:pointer;font-size:11px;white-space:nowrap">&#128269;</button>' +
        '</div>' +
        '<div id="map-search-results" style="display:none;background:#fff;border:1px solid #dcdcdc;border-top:none;border-radius:0 0 4px 4px;max-height:200px;overflow-y:auto;box-shadow:0 4px 8px rgba(0,0,0,.12)"></div>';
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);
      return div;
    }
  });
  new searchControl().addTo(map);

  // Wire up search after map is ready
  setTimeout(function() {
    var input = document.getElementById('map-search-input');
    var btn   = document.getElementById('map-search-btn');
    var results = document.getElementById('map-search-results');
    if (!input) return;
    function doSearch() {
      var q = input.value.trim(); if (!q) return;
      btn.textContent = '…';
      fetch('https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + encodeURIComponent(q))
        .then(function(r){return r.json();})
        .then(function(data) {
          btn.textContent = '🔍';
          results.innerHTML = '';
          if (!data.length) {
            results.innerHTML = '<div style="padding:6px 10px;font-size:11px;color:#7c7c7c">No results found</div>';
            results.style.display = 'block'; return;
          }
          data.forEach(function(item) {
            var row = document.createElement('div');
            row.style.cssText = 'padding:6px 10px;font-size:11px;color:#3d3d3d;cursor:pointer;border-bottom:1px solid #efefef';
            row.textContent = item.display_name;
            row.onmouseover = function(){this.style.background='#f3f7fc';};
            row.onmouseout  = function(){this.style.background='';};
            row.onclick = function() {
              map.fitBounds([[parseFloat(item.boundingbox[0]),parseFloat(item.boundingbox[2])],[parseFloat(item.boundingbox[1]),parseFloat(item.boundingbox[3])]]);
              results.style.display = 'none';
              input.value = item.display_name.split(',')[0];
            };
            results.appendChild(row);
          });
          results.style.display = 'block';
        })
        .catch(function(){ btn.textContent = '🔍'; });
    }
    btn.onclick = doSearch;
    input.onkeydown = function(e){ if(e.key==='Enter') doSearch(); if(e.key==='Escape'){results.style.display='none';} };
    document.addEventListener('click', function(e){ if(!e.target.closest('.map-search-control')) results.style.display='none'; });
  }, 500);
  // ── Basemaps ──────────────────────────────────────────────────────────────
  var basemaps = {
    'Street Map': L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {maxZoom:19, attribution:'© OpenStreetMap © CARTO'}),
    'Satellite':  L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {maxZoom:20, attribution:'© Google'}),
    'USGS NAIP':  L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {maxZoom:19, maxNativeZoom:16, attribution:'USDA/USGS NAIP'}),
    'Topo':       L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {maxZoom:17, attribution:'© OpenTopoMap'})
  };

  // ── Overlay layers ─────────────────────────────────────────────────────────
  var overlays = {
    'NHD Streams': L.tileLayer(
      'https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/{z}/{y}/{x}',
      {maxZoom: 20, maxNativeZoom: 16, attribution: '© USGS 3DHP/NHD', opacity: 1.0}
    ),
    'NWI Wetlands': L.tileLayer.wms('https://www.fws.gov/wetlands/arcgis/services/Wetlands/MapServer/WmsServer', {
      layers: '0', format: 'image/png', transparent: true, attribution: '© USFWS NWI', opacity: 0.7
    }),
    'USGS Hillshade': L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16, attribution: '© USGS', opacity: 0.5
    }),
    'NLCD Land Cover': L.tileLayer.wms('https://www.mrlc.gov/geoserver/mrlc_display/NLCD_2021_Land_Cover_L48/wms', {
      layers: 'NLCD_2021_Land_Cover_L48', format: 'image/png', transparent: true, attribution: '© MRLC NLCD', opacity: 0.5
    })
  };

  basemaps['Street Map'].addTo(map);
  overlays['NHD Streams'].addTo(map);

  // Layer control — topright
  var LayerControl = L.Control.extend({
    options: {position: 'topright'},
    onAdd: function() {
      var container = L.DomUtil.create('div', 'layer-control-container');
      container.style.position = 'relative';
      container.innerHTML =
        '<button class="zoom-we-btn" style="margin-top:0;margin-right:4px" onclick="zoomToActiveWE()">&#8982; Zoom to Project</button>' +
        '<button class="zoom-we-btn" style="margin-top:0;margin-right:4px" id="pp-layer-toggle-btn" onclick="togglePPLayers()">Hide Pre-Project</button>' +
        '<button class="zoom-we-btn" style="margin-top:0;margin-right:4px" id="label-toggle-btn" onclick="toggleLabels()">Hide Labels</button>' +
        '<button class="layer-control-btn" aria-haspopup="true" aria-expanded="false" id="layer-toggle-btn">&#9864; Layers</button>' +
        '<div class="layer-control-panel" id="layer-panel" style="display:none;position:absolute;right:0;top:32px;z-index:1000;min-width:170px"></div>';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);
      return container;
    }
  });
  new LayerControl().addTo(map);

  // Populate layer panel after DOM is ready
  setTimeout(function() {
    var panel = document.getElementById('layer-panel');
    var btn   = document.getElementById('layer-toggle-btn');
    if (!panel || !btn) return;

    // Build panel content
    function buildLayerPanel() {
      panel.innerHTML = '';
      var h1 = document.createElement('div'); h1.className='layer-section-title'; h1.textContent='Basemap'; panel.appendChild(h1);
      Object.keys(basemaps).forEach(function(name) {
        var row = document.createElement('label'); row.className='layer-row';
        var radio = document.createElement('input'); radio.type='radio'; radio.name='basemap'; radio.checked=(name===activeBasemap);
        radio.onchange = function() {
          Object.keys(basemaps).forEach(function(n){ map.removeLayer(basemaps[n]); });
          basemaps[name].addTo(map);
          activeBasemap = name;
          // Re-add any active overlays on top of new basemap
          Object.keys(overlays).forEach(function(n){
            if (map.hasLayer(overlays[n])) {
              map.removeLayer(overlays[n]);
              overlays[n].addTo(map);
            }
          });
          updateNaipYearDisplay();
        };
        row.appendChild(radio); row.appendChild(document.createTextNode(' '+name)); panel.appendChild(row);
      });
      var h2 = document.createElement('div'); h2.className='layer-section-title'; h2.textContent='Overlays'; h2.style.marginTop='8px'; panel.appendChild(h2);
      Object.keys(overlays).forEach(function(name) {
        var row = document.createElement('label'); row.className='layer-row';
        var cb = document.createElement('input'); cb.type='checkbox';
        var slider = document.createElement('esa-range-slider');
        slider.className = 'layer-opacity-slider';
        slider.setAttribute('min', '0'); slider.setAttribute('max', '100'); slider.setAttribute('step', '5');
        slider.setAttribute('size', 'sm');
        slider.value = Math.round((overlays[name].options.opacity || 0.7) * 100);
        slider.style.display='none';
        if (name === 'NHD Streams') { cb.checked = true; slider.style.display='block'; }
        slider.addEventListener('change', function(e){ overlays[name].setOpacity(e.detail.value / 100); });
        cb.onchange = function() {
          if(cb.checked){ overlays[name].addTo(map); slider.style.display='block'; } else { map.removeLayer(overlays[name]); slider.style.display='none'; }
        };
        row.appendChild(cb); row.appendChild(document.createTextNode(' '+name)); panel.appendChild(row); panel.appendChild(slider);
      });

      var refWrap = document.createElement('div'); refWrap.id = 'ref-image-section';
      panel.appendChild(refWrap);
      renderRefImageSection();
    }
    buildLayerPanel();

    btn.onclick = function() {
      var open = panel.style.display !== 'none';
      panel.style.display = open ? 'none' : 'block';
      btn.setAttribute('aria-expanded', !open);
    };
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.layer-control-container')) panel.style.display='none';
    });
  }, 600);

  map.on('click', mapClick);
  map.on('mousemove', mapMove);
  map.on('dblclick', mapDbl);
  map.on('zoomend', refreshAllFlowArrows);
  renderLegend();
};

// ── WE helpers ────────────────────────────────────────────────────────────
function getWE(id) { for(var i=0;i<workElements.length;i++) if(workElements[i].id===id) return workElements[i]; return null; }
function getActiveWE() { return getWE(activeWEId); }

// A work element has exactly one primary channel (the data model still stores it
// as a one-element array — see newWEData() — since that's what getActivePC() and
// every pc_reach..structures wizard step already key off of; there is no UI to add
// a second one). Each channel gets its own copy of everything those steps touch;
// getActivePC() resolves whichever one the wizard is currently on.
function newPrimaryChannel(n) {
  return {
    id: 'pc-'+Date.now()+'-'+n,
    name: 'Primary Channel '+n,
    sowLayers: {},                     // 'pc-reach','pc-area','pcw1/2/3','pc-bankht'
    inputVals: {},                     // 'pc-width','pc-bank-height','pc-excavation-vol'
    chuUnits: [],
    structures: {cms:[], mcs:[], css:[]},
    structs: [],
    gravelPlacements: [],
    ppData: {},                        // holds 'pc_fp' only
    sowElev: null
  };
}
function getActivePC(we) {
  return we.primaryChannels && we.primaryChannels.filter(function(c){return c.id===we.activePCId;})[0];
}
// pc-*/pcw1-3 sowLayers ids live on the active primary channel; every other id
// (fp-*/rr-*, including generated fpMulti draw ids) stays on the work element directly.
function sowOwner(we, id) {
  return (id && id.substring(0,2) === 'pc') ? getActivePC(we) : we;
}
// pc_fp (the "new floodplain" PP_DEFS entry) lives on the active primary channel;
// every other PP_DEFS id (perimeter, reach_len, fp_poly, ...) stays on the work element.
function ppOwner(we, id) {
  return id === 'pc_fp' ? getActivePC(we) : we;
}

// Distinct colors per primary channel so multiple channels stay visually
// distinguishable on the map when a work element has more than one.
var PC_CHANNEL_COLORS = ['#1a7abf', '#c0392b', '#8e44ad', '#16a085', '#d68910'];
function pcChannelColor(we, pcId) {
  var idx = 0;
  (we.primaryChannels||[]).forEach(function(pc, i){ if (pc.id === pcId) idx = i; });
  return PC_CHANNEL_COLORS[idx % PC_CHANNEL_COLORS.length];
}

function newWEData() {
  var pc1 = newPrimaryChannel(1);
  return {
    id: 'we-'+Date.now(),
    name: '',
    types: [],
    ppData: {},
    sowLayers: {},
    structures: {fps:[],scs:[]},
    channelReaches: [], // flat ordered list for channel structures (cms/mcs/css)
    inputVals: {},
    scReaches: [],  // [{id, layer, bufferLayer, valueM, pts}] secondary channel lines
    fpMulti: {grade:[], road:[], berm:[], revet:[], tailings:[], pp_wetland:[], fp_wetland_enhance:[]}, // [{id, vol}] — id keys into sowLayers for the drawn geometry
    fpStructs: [],
    primaryChannels: [pc1], // [{id, name, sowLayers, inputVals, chuUnits, structures, structs, gravelPlacements, ppData, sowElev}]
    activePCId: pc1.id
  };
}

// ── WE modal ──────────────────────────────────────────────────────────────
function openWEModal(editId) {
  weModalEditId = editId;
  var we = editId ? getWE(editId) : null;
  var dialog = document.getElementById('we-modal');
  dialog.heading = editId ? 'Edit Work Element' : 'New Work Element';
  var nameField = document.querySelector('#we-modal esa-text-field');
  if (nameField) nameField.value = we ? we.name : '';
  ['pc','fp','rr'].forEach(function(t) {
    var sel = we ? we.types.indexOf(t)>=0 : false;
    document.getElementById('chk-'+t).checked = sel;
    document.getElementById('opt-'+t).classList.toggle('selected', sel);
  });
  document.getElementById('we-modal-err').style.display = 'none';
  dialog.show();
  setTimeout(function(){if (nameField) nameField.focus();}, 50);
}

function closeWEModal() {
  document.getElementById('we-modal').close();
  // Restore focus to add button
  var btn = document.getElementById('add-we-btn');
  if (btn) btn.focus();
}

function toggleWEType(t) {
  var chk = document.getElementById('chk-'+t);
  chk.checked = !chk.checked;
  document.getElementById('opt-'+t).classList.toggle('selected', chk.checked);
}

function saveWEModal() {
  var nameField = document.querySelector('#we-modal esa-text-field');
  var name = (nameField ? nameField.value : '').trim();
  var types = ['pc','fp','rr'].filter(function(t){return document.getElementById('chk-'+t).checked;});
  if (!name || !types.length) { document.getElementById('we-modal-err').style.display='block'; return; }
  if (weModalEditId) {
    var we = getWE(weModalEditId);
    we.name = name; we.types = types;
    renderWEList();
    showActiveWELayers(); // refresh label with new name
    if (wizardMode && wizardStep === 0) {
      var vis = getVisibleSteps();
      var perimIdx = 0;
      vis.forEach(function(s,i){ if(s.id==='perimeter') perimIdx=i; });
      wizardStep = perimIdx;
      renderWizardStep(); wizardAutoActivate();
    } else if (wizardMode) renderWizardStep();
    if (activeWEId === weModalEditId) renderWorkSide();
  } else {
    var we2 = newWEData(); we2.name = name; we2.types = types;
    workElements.push(we2);
    wizardStep = 0; // always start at step 1 for a new work element
    renderWEList();
    setActiveWE(we2.id);
  }
  closeWEModal();
}

// Skips the WE settings modal entirely — auto-creates a single work element with
// all 3 types on and a placeholder name, since the WE selector/settings UI is
// hidden for now (see the commented-out toolbar block and this call site).
function createDefaultWE() {
  var we = newWEData();
  we.name = 'Work Element 1';
  we.types = ['pc','fp','rr'];
  workElements.push(we);
  wizardStep = 0;
  renderWEList();
  setActiveWE(we.id);
}

// ── WE list ───────────────────────────────────────────────────────────────
function renderWEList() {
  var el = document.getElementById('we-list');
  if (el) {
    if (!workElements.length) { el.innerHTML='<div class="we-empty">No work elements yet.<br/>Click + Add to begin.</div>'; }
    else {
      el.innerHTML = '';
      workElements.forEach(function(we, i) {
        var div = document.createElement('div');
        div.className = 'we-item' + (we.id===activeWEId?' active':'');
        div.onclick = function(e) { if(e.target.classList.contains('we-item-gear')||e.target.classList.contains('we-item-del'))return; setActiveWE(we.id); };
        var chips = we.types.map(function(t){
          return '<span class="we-type-chip" style="background:'+TYPE_COLORS[t]+'">'+{pc:'PC',fp:'FP',rr:'RR'}[t]+'</span>';
        }).join('');
        div.innerHTML = '<div class="we-item-head"><span class="we-item-num">WE '+(i+1)+'</span><span class="we-item-name">'+we.name+'</span><span class="we-item-gear" onclick="openWEModal(\''+we.id+'\')">&#9881;</span><span class="we-item-del" title="Delete work element" onclick="deleteWE(\''+we.id+'\')">&#10005;</span></div><div class="we-item-types">'+chips+'</div>';
        el.appendChild(div);
      });
    }
  }
  renderWEDropdown();
}

function renderWEDropdown() {
  var sel = document.getElementById('msow-we-dropdown');
  var editBtn = document.getElementById('we-edit-btn');
  var delBtn  = document.getElementById('we-delete-btn');
  var hasActive = !!activeWEId;

  if (sel) {
    if (!workElements.length) {
      sel.innerHTML = '<option value="">— No work elements yet —</option>';
      sel.disabled = true;
    } else {
      sel.disabled = false;
      sel.innerHTML = workElements.map(function(we, i) {
        var typeLabels = we.types.map(function(t){ return {pc:'PC',fp:'FP',rr:'RR'}[t]; }).join('/');
        var label = 'WE ' + (i+1) + ': ' + we.name + (typeLabels ? ' ['+typeLabels+']' : '');
        return '<option value="'+we.id+'"'+(we.id===activeWEId?' selected':'')+'>'+label+'</option>';
      }).join('');
    }
  }

  if (editBtn) editBtn.disabled = !hasActive;
  if (delBtn)  delBtn.disabled  = !hasActive;
}

function selectWEFromDropdown(weId) {
  if (weId) setActiveWE(weId);
}

function deleteWE(id) {
  if (!confirm('Delete this work element and all its drawn features?')) return;
  var we = getWE(id); if (!we) return;
  if (we._labelMarker) map.removeLayer(we._labelMarker);
  allWELayers(we).forEach(function(l){ if(l&&l.remove) l.remove(); });
  workElements = workElements.filter(function(w){ return w.id !== id; });
  if (activeWEId === id) {
    activeWEId = workElements.length ? workElements[0].id : null;
  }
  renderWEList();
  if (activeWEId) {
    setActiveWE(activeWEId);
  } else {
    document.getElementById('sidebar-empty').style.display = 'flex';
    document.getElementById('inner-tabbar').style.display = 'none';
    document.getElementById('pp-side').innerHTML = '';
    document.getElementById('work-side').innerHTML = '';
  }
  renderLegend();
}

function setActiveWE(id) {
  // dim all layers of previous WE
  dimAllLayers();
  activeWEId = id;
  renderWEList();
  // show active WE layers at full opacity
  showActiveWELayers();
  if (activeInnerTab === 'work') {
    workElements.forEach(function(w){ setPPLayerVisibility(w, false); });
  }
  document.getElementById('sidebar-empty').style.display = 'none';
  document.getElementById('inner-tabbar').style.display = 'flex';
  showInnerTab(activeInnerTab);
  renderLegend();
  setTimeout(function(){map.invalidateSize();}, 50);
}

function dimAllLayers() {
  workElements.forEach(function(we) {
    allWELayers(we).forEach(function(l) { if(l&&l.setStyle) l.setStyle({opacity:.25,fillOpacity:.07}); else if(l&&l.setOpacity) l.setOpacity(.25); });
  });
}

var ppLayersVisible = true;

function setPPLayersVisible(show) {
  ppLayersVisible = show;
  var btn = document.getElementById('pp-layer-toggle-btn');
  if (btn) btn.textContent = show ? 'Hide Pre-Project' : 'Show Pre-Project';
  var we = getActiveWE(); if (!we) return;
  var ALWAYS_VISIBLE_PP = {perimeter:1, pc_fp:1};
  PP_DEFS.forEach(function(m) {
    if (ALWAYS_VISIBLE_PP[m.id]) {
      // Always keep these layers visible regardless of pre-project toggle
      var pd = ppOwner(we,m.id).ppData[m.id];
      if (pd && pd.layer) {
        if (!map.hasLayer(pd.layer)) map.addLayer(pd.layer);
        if (m.id === 'perimeter') pd.layer.setStyle({opacity:1, fillOpacity:0, weight:2, dashArray:'8 5'});
        else pd.layer.setStyle({opacity:1});
      }
      return;
    }
    var d = ppOwner(we,m.id).ppData[m.id]; if (!d) return;
    function tog(layer) {
      if (!layer) return;
      if (show && !map.hasLayer(layer)) map.addLayer(layer);
      else if (!show && map.hasLayer(layer)) map.removeLayer(layer);
    }
    tog(d.layer); tog(d.bufferLayer);
    if (d._arrowMarkers) d._arrowMarkers.forEach(tog);
    if (d.lines) d.lines.forEach(function(l){ if(l) tog(l.layer); });
  });
}

function togglePPLayers() { setPPLayersVisible(!ppLayersVisible); }

// Existing Wetland Area shapes (drawn/auto-detected in the pp_wetland pre-project
// step) clutter the map through primary channel / floodplain work — hide them once
// the wizard moves past pre-project, and only show them again on the Wetland
// Enhancement step (fp_wetland_enhance), where the user needs to see the wetland
// extent to draw an enhancement polygon within it.
var WIZARD_STEP_ORDER_IDS = null;
function updateWetlandLayerVisibility(we, step) {
  if (!we) return;
  if (!WIZARD_STEP_ORDER_IDS) WIZARD_STEP_ORDER_IDS = WIZARD_STEPS.map(function(s){ return s.id; });
  var enhanceIdx = WIZARD_STEP_ORDER_IDS.indexOf('fp_wetland_enhance');
  var curIdx = step ? WIZARD_STEP_ORDER_IDS.indexOf(step.id) : -1;
  // 'buffers' (Review Areas) is crowded enough with channel/floodplain buffers —
  // hide the selected wetland shapes there too, even though it's still pre-project.
  var show = !step || (step.phase === 'pp' && step.id !== 'buffers') || (curIdx >= 0 && curIdx >= enhanceIdx);
  var items = (we.fpMulti && we.fpMulti['pp_wetland']) || [];
  items.forEach(function(item) {
    var d = we.sowLayers[item.id];
    if (!d) return;
    if (d.layer) { if (show && !map.hasLayer(d.layer)) map.addLayer(d.layer); else if (!show && map.hasLayer(d.layer)) map.removeLayer(d.layer); }
    if (d._labelMarker) { if (show && !map.hasLayer(d._labelMarker)) map.addLayer(d._labelMarker); else if (!show && map.hasLayer(d._labelMarker)) map.removeLayer(d._labelMarker); }
  });
}

// The floodplain polygon's green fill sits right behind the wetland step's NWI
// candidates/drawn areas and makes them hard to pick out — hide it just for that
// one step, restoring it afterward (unless the user has pre-project layers hidden
// entirely, in which case leave that alone).
function updateFpPolyVisibilityForStep(we, step) {
  if (!we) return;
  var d = we.ppData['fp_poly'];
  if (!d || !d.layer) return;
  var hide = !!(step && step.id === 'pp_wetland');
  if (hide) {
    if (map.hasLayer(d.layer)) { map.removeLayer(d.layer); d._hiddenForWetlandStep = true; }
  } else if (d._hiddenForWetlandStep) {
    d._hiddenForWetlandStep = false;
    if (ppLayersVisible && !map.hasLayer(d.layer)) map.addLayer(d.layer);
  }
}

var labelsVisible = true;

function setLabelsVisible(show) {
  labelsVisible = show;
  var btn = document.getElementById('label-toggle-btn');
  if (btn) btn.textContent = show ? 'Hide Labels' : 'Show Labels';
  workElements.forEach(function(we) {
    function tog(layer) {
      if (!layer) return;
      if (show && !map.hasLayer(layer)) map.addLayer(layer);
      else if (!show && map.hasLayer(layer)) map.removeLayer(layer);
    }
    tog(we._labelMarker);
    // Structure pins (floodplain/side-channel types live on the work element directly)
    Object.keys(we.structures||{}).forEach(function(t){
      (we.structures[t]||[]).forEach(function(s){ tog(s.marker); });
    });
    // Primary-channel CHU labels + structure pins (per channel)
    (we.primaryChannels||[]).forEach(function(pc){
      if (pc.chuUnits) pc.chuUnits.forEach(function(u){ tog(u.labelMarker); });
      Object.keys(pc.structures||{}).forEach(function(t){
        (pc.structures[t]||[]).forEach(function(s){ tog(s.marker); });
      });
    });
  });
}

function toggleLabels() {
  setLabelsVisible(!labelsVisible);
}

function zoomToActiveWE() {
  var we = getActiveWE(); if (!we) return;
  // Prefer zooming to the drawn project boundary
  var perimD = we.ppData['perimeter'];
  if (perimD && perimD.layer) {
    try { map.fitBounds(perimD.layer.getBounds(), {padding:[30,30]}); return; } catch(e) {}
  }
  // Fall back to bounding box of all drawn features
  var bounds = null;
  function eb(layer) { try { var b=layer&&layer.getBounds&&layer.getBounds(); if(b&&b.isValid()) bounds=bounds?bounds.extend(b):b; } catch(e){} }
  PP_DEFS.forEach(function(m){ var d=ppOwner(we,m.id).ppData[m.id];if(!d)return; eb(d.layer); eb(d.bufferLayer); });
  Object.keys(we.sowLayers||{}).forEach(function(k){ if(we.sowLayers[k]&&we.sowLayers[k].layer) eb(we.sowLayers[k].layer); });
  (we.primaryChannels||[]).forEach(function(pc){
    Object.keys(pc.sowLayers||{}).forEach(function(k){ if(pc.sowLayers[k]&&pc.sowLayers[k].layer) eb(pc.sowLayers[k].layer); });
    if (pc.ppData['pc_fp']) eb(pc.ppData['pc_fp'].layer);
  });
  if (bounds && bounds.isValid()) map.fitBounds(bounds, {padding:[30,30]});
}

function showActiveWELayers() {
  var we = getActiveWE(); if (!we) return;
  workElements.forEach(function(w) {
    var isActive = w.id === activeWEId;
    allWELayers(w).forEach(function(l) {
      if (!l) return;
      if (l.setStyle) {
        l.setStyle({opacity:isActive?1:.25, fillOpacity:isActive?.2:.07});
      } else if (l.setOpacity) {
        l.setOpacity(isActive?1:.25);
      }
    });
    // Update WE name label marker
    updateWELabel(w, isActive);
  });
}

function updateWELabel(w, isActive) {
  if (w._labelMarker) { map.removeLayer(w._labelMarker); w._labelMarker = null; }
  // WE pill label hidden on the map for now — per request. Original logic below
  // preserved (just made unreachable) for easy restore.
  return;
  // eslint-disable-next-line no-unreachable
  if (!w.name) return;

  // Find bounding box of all drawn layers for this WE
  var bounds = null;
  function expandBounds(layer) {
    if (!layer) return;
    try {
      var b = layer.getBounds ? layer.getBounds() : null;
      if (b && b.isValid()) bounds = bounds ? bounds.extend(b) : b;
    } catch(e) {}
  }
  PP_DEFS.forEach(function(m) {
    var d = ppOwner(w,m.id).ppData[m.id]; if (!d) return;
    if (d.layer) expandBounds(d.layer);
    if (d.bufferLayer) expandBounds(d.bufferLayer);
    if (d.lines) d.lines.forEach(function(l){
      if (!l) return;
      if (l.layer) expandBounds(l.layer);
      else if (l.pts && l.pts.length) { try { var lb = L.polyline(l.pts).getBounds(); if(lb&&lb.isValid()) bounds = bounds ? bounds.extend(lb) : lb; } catch(e){} }
    });
  });
  Object.keys(w.sowLayers||{}).forEach(function(k){ if(w.sowLayers[k]&&w.sowLayers[k].layer) expandBounds(w.sowLayers[k].layer); });
  (w.primaryChannels||[]).forEach(function(pc){
    Object.keys(pc.sowLayers||{}).forEach(function(k){ if(pc.sowLayers[k]&&pc.sowLayers[k].layer) expandBounds(pc.sowLayers[k].layer); });
    if (pc.ppData['pc_fp'] && pc.ppData['pc_fp'].layer) expandBounds(pc.ppData['pc_fp'].layer);
  });

  if (!bounds || !bounds.isValid()) return;
  var pos = bounds.getCenter();

  var weNum = workElements.indexOf(w) + 1;
  var labelText = 'WE ' + weNum + ': ' + w.name;
  var opacity = isActive ? 1 : 0.6;
  var bg = isActive ? '#1a7abf' : '#445566';
  var icon = L.divIcon({
    className: '',
    iconSize: null,
    iconAnchor: null,
    html: '<div style="background:'+bg+';color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:12px;border:2px solid rgba(255,255,255,0.7);white-space:nowrap;box-shadow:0 1px 5px rgba(0,0,0,.5);pointer-events:none;transform:translate(-50%,-50%);opacity:'+opacity+'">'+labelText+'</div>'
  });
  w._labelMarker = L.marker(pos, {icon:icon, interactive:false, zIndexOffset:200});
  if (labelsVisible) w._labelMarker.addTo(map);
}

function allWELayers(we) {
  var out = [];
  Object.keys(we.sowLayers).forEach(function(k){
    var sl = we.sowLayers[k]; if (!sl) return;
    if (sl.layer) out.push(sl.layer);
    if (sl._labelMarker) out.push(sl._labelMarker);
    if (sl._arrowMarkers) sl._arrowMarkers.forEach(function(m){ if(m) out.push(m); });
  });
  PP_DEFS.forEach(function(m){ var d=ppOwner(we,m.id).ppData[m.id]; if(!d)return; if(d.layer)out.push(d.layer); if(d.bufferLayer)out.push(d.bufferLayer); if(d.labelMarker)out.push(d.labelMarker); if(d.lines)d.lines.forEach(function(l){if(l&&l.layer)out.push(l.layer);}); });
  Object.keys(we.structures).forEach(function(t){ we.structures[t].forEach(function(s){if(s.marker)out.push(s.marker);}); });
  if (we.scReaches) we.scReaches.forEach(function(r){ if(r.layer)out.push(r.layer); if(r.bufferLayer)out.push(r.bufferLayer); });
  // Every primary channel's own reach/area/floodplain/structure/CHU/gravel layers.
  (we.primaryChannels||[]).forEach(function(pc){
    Object.keys(pc.sowLayers).forEach(function(k){
      var sl = pc.sowLayers[k]; if (!sl) return;
      if (sl.layer) out.push(sl.layer);
      if (sl._labelMarker) out.push(sl._labelMarker);
      if (sl._arrowMarkers) sl._arrowMarkers.forEach(function(m){ if(m) out.push(m); });
    });
    if (pc.ppData['pc_fp'] && pc.ppData['pc_fp'].layer) out.push(pc.ppData['pc_fp'].layer);
    Object.keys(pc.structures).forEach(function(t){ pc.structures[t].forEach(function(s){if(s.marker)out.push(s.marker);}); });
    if (pc.chuUnits) pc.chuUnits.forEach(function(u){ if(u.layer)out.push(u.layer); if(u.labelMarker)out.push(u.labelMarker); });
    if (pc.gravelPlacements) pc.gravelPlacements.forEach(function(p){ if(p.marker)out.push(p.marker); });
  });
  return out;
}

// ── Inner tab ─────────────────────────────────────────────────────────────
function showInnerTab(t) {
  activeInnerTab = t;
  var tabbar = document.getElementById('inner-tabbar');
  if (tabbar) tabbar.activeIndex = (t === 'pp') ? 0 : 1;
  var ppEl  = document.getElementById('pp-side');
  var wkEl  = document.getElementById('work-side');
  if (t === 'pp') {
    ppEl.style.display = 'flex'; ppEl.style.flexDirection = 'column'; ppEl.style.flex = '1'; ppEl.style.overflow = 'hidden';
    wkEl.style.display = 'none';
    buildPPSide();
    workElements.forEach(function(w){ setPPLayerVisibility(w, true); });
  } else {
    ppEl.style.display = 'none';
    wkEl.style.display = 'flex'; wkEl.style.flexDirection = 'column'; wkEl.style.flex = '1'; wkEl.style.overflow = 'hidden';
    renderWorkSide();
    workElements.forEach(function(w){ setPPLayerVisibility(w, false); });
  }
}

// Show or hide PP layers. When hiding, keep area_ch visible as map context.
function setPPLayerVisibility(we, show) {
  PP_DEFS.forEach(function(m) {
    var d = ppOwner(we,m.id).ppData[m.id]; if (!d) return;
    var keepVisible = ((m.id === 'area_ch') && (we.id === activeWEId))
      || m.id === 'perimeter' || m.id === 'pc_fp';
    // Perimeter always shows dotted outline; floodplain polygons stay visible as design reference
    var opacity     = (show || keepVisible) ? 1 : 0;
    var fillOpacity = (m.id==='perimeter') ? 0 : show ? 0.18 : keepVisible ? 0.15 : 0;
    function applyLayer(l) {
      if (!l) return;
      if (l.setStyle) l.setStyle({opacity: opacity, fillOpacity: fillOpacity});
      else if (l.setOpacity) l.setOpacity(opacity);
    }
    if (d.layer) applyLayer(d.layer);
    if (d.bufferLayer) applyLayer(d.bufferLayer);
    if (d.lines) d.lines.forEach(function(ln){ if(ln&&ln.layer) applyLayer(ln.layer); });
    // reach direction arrows
    if (m.id==='reach_len') setFlowArrowOpacity(d, opacity);
    // hide/show fp_left and fp_right label markers
    if (d.labelMarker) d.labelMarker.setOpacity(show ? 1 : 0);
  });
}

// ── PP side ───────────────────────────────────────────────────────────────
// ── Guided workflow: step indicators + smart hints ───────────────────────
var PP_STEPS = [
  { id:'perimeter', label:'Perimeter',
    check: function(we){ return !!(we.ppData['perimeter']&&we.ppData['perimeter'].layer); },
    hint: 'Start by drawing your <b>Project Perimeter</b> polygon on the map.' },
  { id:'reach_len', label:'Reach',
    check: function(we){ return !!(we.ppData['reach_len']&&we.ppData['reach_len'].layer); },
    hint: 'Draw or auto-detect the <b>Reach Length</b> — the stream centerline within your project.' },
  { id:'widths', label:'Widths',
    check: function(we){
      var ch=we.ppData['ch_width'], fp=we.ppData['fp_width'];
      return !!(ch&&ch.lines&&ch.lines.length&&fp&&fp.lines&&fp.lines.length);
    },
    hint: 'Measure at least one <b>Channel Width</b> and one <b>Floodplain Width</b> cross-section.' },
  { id:'buffers', label:'Buffers',
    check: function(we){
      var ch=we.ppData['area_ch'], fp=we.ppData['area_fp'];
      return !!((ch&&(ch.layer||ch.bufferLayer))&&(fp&&(fp.layer||fp.bufferLayer)));
    },
    hint: 'Channel and floodplain buffers auto-calculate from widths. Verify they look correct — edit if needed.' },
  { id:'fp_split', label:'L/R Split',
    check: function(we){ return !!(we.ppData['area_fp']&&we.ppData['area_fp'].fpSplit); },
    hint: 'Split the floodplain into <b>Left / Right</b> using the button under Total Active Floodplain Area.' },
  { id:'chu', label:'CHUs',
    check: function(we){ return !!(getActivePC(we).chuUnits&&getActivePC(we).chuUnits.length>1); },
    hint: 'Go to <b>Habitat Work</b> tab and split the channel into riffles, pools, glides, and runs using the split line tool.' }
];

function updatePPSteps() {
  var stepsEl = document.getElementById('pp-steps');
  var hintEl  = document.getElementById('pp-hint');
  if (!stepsEl || !hintEl) return;
  var we = getActiveWE(); if (!we) return;

  // First incomplete step index
  var currentIdx = -1;
  PP_STEPS.forEach(function(s, i) { if (currentIdx===-1 && !s.check(we)) currentIdx=i; });

  // Build step pills
  stepsEl.innerHTML = '';
  PP_STEPS.forEach(function(s, i) {
    var done = s.check(we), isCurrent = (i===currentIdx);
    var pill = document.createElement('div');
    pill.style.cssText = 'display:flex;align-items:center;gap:3px;padding:3px 7px;border-radius:10px;font-size:11px;font-weight:600;white-space:nowrap;flex-shrink:0;cursor:default;' +
      (done      ? 'background:#f3f7fc;color:#0f6849;border:1px solid #dcdcdc;' :
       isCurrent ? 'background:#f3f7fc;color:#525252;border:1px solid #dcdcdc;' :
                   'background:#efefef;color:#7c7c7c;border:1px solid #efefef;');
    pill.innerHTML = (done?'&#10003; ':isCurrent?'&#9654; ':'')+(i+1)+'. '+s.label;
    stepsEl.appendChild(pill);
    if (i < PP_STEPS.length-1) {
      var sep = document.createElement('div');
      sep.style.cssText = 'color:#dcdcdc;font-size:11px;flex-shrink:0;align-self:center';
      sep.textContent = '›';
      stepsEl.appendChild(sep);
    }
  });

  // Smart hint
  if (currentIdx >= 0) {
    hintEl.innerHTML = '<div style="background:#f3f7fc;border-left:3px solid #2770b2;padding:5px 8px;border-radius:0 4px 4px 0;font-size:11px;color:#2770b2;line-height:1.5">&#8594; '+PP_STEPS[currentIdx].hint+'</div>';
  } else {
    hintEl.innerHTML = '<div style="background:#f3f7fc;border-left:3px solid #1e5386;padding:5px 8px;border-radius:0 4px 4px 0;font-size:11px;color:#0f6849;line-height:1.5">&#10003; All pre-project steps complete!</div>';
  }
}

function buildPPSide() {
  var we = getActiveWE(); if (!we) return;
  var ppEl = document.getElementById('pp-side');
  ppEl.innerHTML =
    '<div class="pp-progress">' +
      '<div class="sbt"><span class="sbt-dot"></span>Pre-Project Conditions</div>' +
      '<div class="pp-prog-row"><div class="pp-prog-wrap"><div class="pp-prog-bar" id="pp-prog" style="width:0%"></div></div><span class="pp-prog-pct" id="pp-prog-pct">0%</span></div>' +
      '<div style="font-size:10px;color:var(--msow-muted-text,#8aaccc);margin-top:4px">Hover to highlight. Click row to zoom.</div>' +
    '</div>' +
    '<div id="pp-metrics-list"></div>';
  buildPPMetricsList();
  updatePPSteps();
}

function buildPPMetricsList() {
  var listEl = document.getElementById('pp-metrics-list');
  PP_DEFS.forEach(function(m) {
    var row = document.createElement('div');
    row.id = 'pm-row-'+m.id;
    listEl.appendChild(row);
    renderPMRow(m);
  });
  updatePPProgress();
}

function renderPMRow(m) {
  var row = document.getElementById('pm-row-'+m.id); if (!row) return;
  var we = getActiveWE(); if (!we) return;
  var d = ppOwner(we,m.id).ppData[m.id] || {};
  var isDrawing = ppDrawing && ppDrawing.metricId===m.id && ppDrawing.weId===activeWEId;
  var isDone = pmIsDone(we, m);
  row.className = 'pm-row'+(isDrawing?' active-draw':isDone?' complete':'');
  var h = '<div class="pm-head"><span class="pm-label">'+m.label+'</span></div><div class="pm-desc">'+m.desc+'</div>';
  if (m.method==='entered') {
    var val = d.value||'';
    if (m.inputType==='select') {
      h+='<esa-select class="pm-input" size="sm" onchange="ppSetVal(\''+m.id+'\',this.value)"></esa-select>';
    } else {
      h+='<esa-text-field type="'+m.inputType+'" class="pm-input" value="'+(val||'')+'" placeholder="Enter value..." size="sm" onchange="ppSetVal(\''+m.id+'\',this.value)"></esa-text-field>';
    }
    if (val) h+='<span class="pm-result">&#10003; '+val+'</span>';
  } else if (m.method==='measured') {
    // ── Prerequisite guard ────────────────────────────────────────────────
    var hasReach = !!(we.ppData['reach_len'] && we.ppData['reach_len'].layer);
    var hasChArea = !!(we.ppData['area_ch'] && (we.ppData['area_ch'].layer || we.ppData['area_ch'].bufferLayer));
    var prereqMsg = null;
    if ((m.id==='ch_width') && !hasReach) {
      prereqMsg = '&#128207; Draw your reach line first before measuring channel widths.';
    } else if ((m.id==='fp_left' || m.id==='fp_right') && !hasReach) {
      prereqMsg = '&#128207; Draw your reach line first before drawing floodplain boundaries.';
    } else if ((m.id==='fp_left' || m.id==='fp_right') && !hasChArea) {
      prereqMsg = '&#128207; Measure channel widths first — the channel area is needed to auto-complete the floodplain polygon.';
    }
    if (prereqMsg) {
      h += '<div class="pm-meas-row"><span class="pm-waiting">'+prereqMsg+'</span></div>';
    } else
    if (m.multi>0) {
      for (var i=0;i<m.multi;i++) {
        var lines=d.lines||[],ln=lines[i];
        var bc='pm-draw-btn'+(isDrawing&&ppDrawing.idx===i?' active':'');
        var res=ln?'<span class="pm-result">'+Math.round(ln.lengthM*3.28084).toLocaleString()+' ft <span class="pm-redraw" onclick="clearPPLine(\''+m.id+'\','+i+')">redo</span></span>':'<span class="pm-not-drawn">not drawn</span>';
        h+='<div class="pm-meas-row"><button class="'+bc+'" onclick="startPPDraw(\''+m.id+'\','+i+')">&#128207; Meas. '+(i+1)+'</button>'+res+'</div>';
        if (ln) {
          h+='<div class="pm-meas-row" style="gap:6px"><label style="font-size:11px;color:var(--color-text-muted);white-space:nowrap">Bank ht (ft):</label>';
          h+='<input type="number" min="0" step="0.1" value="'+(ln.bankHt||'')+'" placeholder="0.0" style="width:70px;border:1px solid var(--color-border);border-radius:3px;padding:2px 5px;font-size:11px;font-family:var(--font-sans)" oninput="ppSetBankHt('+i+',this.value)"></div>';
        }
      }
      var avg=ppMultiAvgFt(we,m.id);
      h+='<div><span class="pm-result" style="min-width:110px;display:inline-block">'+(avg!==null?'Avg: '+Math.round(avg).toLocaleString()+' ft':'Avg: —')+'</span></div>';
    } else {
      var bl = m.geo==='polygon' ? '&#9646; Draw polygon'
             : m.id==='fp_left'  ? '&#128207; Draw left edge'
             : m.id==='fp_right' ? '&#128207; Draw right edge'
             : '&#128207; Draw line';
      var bc2='pm-draw-btn'+(isDrawing?' active':'');
      var isEditing = lineEditing && lineEditing.type==='pp' && lineEditing.id===m.id;
      // special handling for area_ch: may have buffer estimate
      if (m.id==='area_ch') {
        var bufId = m.id;
        var isEditingPoly = lineEditing && lineEditing.type==='pp-poly' && lineEditing.id===bufId;
        var hasUserPoly = d.layer && d.userDrawn;
        var hasBuffer = d.bufferLayer && d.valueM && !hasUserPoly;
        var srcNote = 'from reach &times; avg channel width';
        var vs = hasUserPoly ? (d.valueM*0.000247105).toFixed(2)+' acres (digitized)'
                 : hasBuffer ? (d.valueM*0.000247105).toFixed(2)+' acres (estimated)'
                 : null;
        var editLink = (hasUserPoly || hasBuffer) ? ' <span class="pm-redraw" onclick="startPolyEdit(\''+bufId+'\')">'+(isEditingPoly?'editing…':'edit')+'</span>' : '';
        var redoBtn2 = hasUserPoly ? ' <span class="pm-redraw" onclick="clearPPGeom(\''+bufId+'\')">redo</span>' : '';
        var drawnResult = hasUserPoly ? '<span class="pm-result">&#10003; '+vs+editLink+redoBtn2+'</span>' : '';
        var estResult = hasBuffer ? '<div style="margin-top:3px"><span class="pm-result" style="background:#e8f4fd;border-color:#7ab8df;color:#1a5a8c">~ '+vs+'</span><span style="font-size:10px;color:var(--msow-helper-text,#7a96b0);margin-left:5px">'+srcNote+'</span>'+editLink+'</div>' : '';
        var drawPrompt = !hasUserPoly ? '<div class="pm-meas-row" style="margin-top:4px"><button class="'+bc2+'" onclick="startPPDraw(\''+bufId+'\',0)" style="font-size:10px">&#9646; Draw from scratch</button></div>' : '';
        if (!vs) {
          h += '<div class="pm-meas-row"><button class="'+bc2+'" onclick="startPPDraw(\''+bufId+'\',0)">&#9646; Draw polygon</button><span class="pm-not-drawn" style="margin-left:6px">or draw reach length &amp; channel width</span></div>';
        } else {
          h += drawnResult + estResult + drawPrompt;
        }
      } else {
        var vs2=(d.layer||(d._pts&&d.valueM))?(m.geo==='line'?Math.round((d.valueM||0)*3.28084).toLocaleString()+' ft':((d.valueM||0)*0.000247105).toFixed(2)+' acres'):null;
        // fp_left/fp_right are lines that produce polygons — show acres
        if ((m.id==='fp_left'||m.id==='fp_right') && d.layer && d.valueM) {
          vs2 = ((d.valueM||0)*0.000247105).toFixed(2)+' acres';
        }
        var editBtn = (vs2 && m.geo==='line') ? ' <span class="pm-redraw" onclick="startLineEdit(\'pp\',\''+m.id+'\')">'+(isEditing?'editing…':'edit')+'</span>' : '';
        var redoBtn = vs2 ? ' <span class="pm-redraw" onclick="clearPPGeom(\''+m.id+'\')">redo</span>' : '';
        if (m.id === 'reach_len') {
          h+='<div class="pm-meas-row"><button class="'+bc2+'" onclick="startPPDraw(\'reach_len\',0)">&#128207; Draw line</button>';
          h+='<button class="pm-draw-btn'+(d._autoDetecting?' active':'')+'" onclick="startReachAutoDetect()">&#127760; Auto-detect</button>';
          h+=(vs2?'<span class="pm-result">&#10003; '+vs2+editBtn+redoBtn+'</span>':'<span class="pm-not-drawn">not drawn</span>')+'</div>';
          // Pre-trim step panel
          if (d._preTrim && !vs2) {
            var ext = d._preTrimExtending;
            h += '<div style="background:#f3f7fc;border-radius:4px;padding:8px;margin-top:6px;border:1px solid #dcdcdc">';
            h += '<div style="font-size:11px;color:#0f6849;margin-bottom:6px">&#10003; Stream selected — extend if needed, then pick your endpoints.</div>';
            h += '<div style="display:flex;gap:6px;flex-wrap:wrap">';
            h += '<button class="pm-draw-btn'+(ext?' active':'')+'" onclick="'+(ext?'cancelPreTrimExtend()':'startPreTrimExtend()')+'">&#8633; '+(ext?'Cancel extend':'Add more stream')+'</button>';
            h += '<button class="pm-draw-btn" onclick="proceedToTrim()">&#9135; Pick endpoints</button>';
            h += '<button class="pm-draw-btn" onclick="redetectReach()" title="Wrong stream highlighted? Click to try again">&#127760; Re-detect</button>';
            h += '<button class="pm-draw-btn" style="background:#ef4444" onclick="cancelPreTrimStep()">&#10005; Cancel</button>';
            h += '</div></div>';
          }
          if (vs2) {
            h+='<div style="margin-top:4px"><button class="pm-draw-btn'+(d._extendMode?' active':'')+'" onclick="'+(d._extendMode?'cancelReachExtend()':'startReachExtend()')+'">&#8633; '+(d._extendMode?'Cancel extend':'Extend reach')+'</button>';
            if (d._extendMode) h+='<span style="font-size:11px;color:#c07820;margin-left:8px">Click a stream to append it</span>';
            h+='</div>';
          }
          if (d._autoDetecting) h+='<div style="font-size:11px;color:#2770b2;margin-top:3px">Click on a stream on the map to detect it</div>';
          if (d._autoResults && d._autoResults.length && !vs2 && !d._preTrim) {
            var displayR = d._displayResults || d._autoResults;
            h+='<div id="reach-auto-results" style="margin-top:4px;display:flex;flex-direction:column;gap:3px">';
            displayR.forEach(function(r,i){
              var fullIdx = d._autoResults.indexOf(r);
              if (fullIdx < 0) fullIdx = i;
              h+='<div style="display:flex;align-items:center;gap:6px;background:#f3f7fc;border:1px solid #dcdcdc;padding:4px 7px;border-radius:3px;font-size:11px">';
              h+='<span style="color:#3d3d3d;flex:1">'+r.name+'</span>';
              h+='<button class="pm-draw-btn" onclick="acceptAutoReach('+fullIdx+')">Use this</button>';
              h+='</div>';
            });
            h+='</div>';
          }
        } else {
          var isEditingPoly2 = lineEditing && lineEditing.type==='pp-poly' && lineEditing.id===m.id;
          var polyEditBtn = (vs2 && m.geo==='polygon') ? ' <span class="pm-redraw" onclick="startPolyEdit(\''+m.id+'\')">'+(isEditingPoly2?'editing…':'edit')+'</span>' : '';
          h+='<div class="pm-meas-row"><button class="'+bc2+'" onclick="startPPDraw(\''+m.id+'\',0)">'+bl+'</button>'+(vs2?'<span class="pm-result">&#10003; '+vs2+(m.geo==='line'?editBtn:polyEditBtn)+redoBtn+'</span>':'<span class="pm-not-drawn">not drawn</span>')+'</div>';
        }
      }
    }
  } else if (m.method === 'auto') {
    var autoVal = (d && d.valueM) ? (d.valueM*0.000247105).toFixed(2)+' acres' : null;
    if (autoVal) {
      h += '<span class="pm-result">&#10003; '+autoVal+'</span>';
      h += '<div style="font-size:10px;color:var(--msow-helper-text,#7a96b0);margin-top:2px">Auto-calculated from floodplain split</div>';
    } else {
      h += '<span class="pm-waiting">Split Total Floodplain Area to calculate</span>';
    }
  } else {
    var res2=ppCalc(we,m.id);
    if (m.id === 'avg_slope') {
      // Special rendering: show elevation profile chart + auto-fetch button
      if (res2 !== null) {
        h += '<span class="pm-result">'+parseFloat(res2).toFixed(2)+'°</span>';
        h += '<button class="pm-draw-btn" style="font-size:10px;margin-left:6px" onclick="fetchElevationProfile(getActiveWE())">&#8635; Refresh</button>';
      } else {
        h += '<span class="pm-waiting">';
        var sd = we.ppData['avg_slope']||{};
        if (sd._elevLoading) h += 'Fetching from USGS…';
        else if (sd._elevError) h += sd._elevError;
        else h += 'Draw a reach line to auto-calculate';
        h += '</span>';
      }
      h += buildElevChartHTML(we.id);
    } else if (m.id === 'fp_width') {
      if (res2 !== null) {
        h += '<span class="pm-result">'+Math.round(res2*3.28084)+' ft</span>';
        h += '<span style="font-size:10px;color:var(--msow-helper-text,#7a96b0);margin-left:5px">total area ÷ reach length</span>';
      } else {
        h += '<span class="pm-waiting">Draw floodplain polygons and reach length to calculate</span>';
      }
    } else if (m.id === 'bank_ht') {
      if (res2 !== null) {
        h += '<span class="pm-result">'+res2.toFixed(1)+' ft (avg)</span>';
      } else {
        h += '<span class="pm-waiting">Enter bank height with each channel width measurement</span>';
      }
    } else if (m.id === 'area_fp') {
      // Show total as acres (left + right), with swap button
      if (res2 !== null) {
        var fpAcres = (res2 * 0.000247105).toFixed(2);
        h += '<span class="pm-result">'+fpAcres+' acres</span>';
        h += '<span style="font-size:10px;color:var(--msow-helper-text,#7a96b0);margin-left:5px">Left + Right</span>';
      } else {
        h += '<span class="pm-waiting">Draw Left and/or Right floodplain polygons</span>';
      }
      // Swap button
      var hasLeft = we.ppData['fp_left'] && we.ppData['fp_left'].layer;
      var hasRight = we.ppData['fp_right'] && we.ppData['fp_right'].layer;
      if (hasLeft || hasRight) {
        h += '<div style="margin-top:5px"><button class="pm-draw-btn" style="font-size:10px;background:transparent;border-color:var(--color-border-strong);color:var(--color-text-secondary)" onclick="swapFpLeftRight()">&#8646; Swap Left / Right</button></div>';
      }
    } else {
      // Generic calc display — valley_len (metres→feet) and sinuosity (dimensionless ratio)
      if (res2 !== null) {
        var display = m.id === 'valley_len' ? Math.round(res2 * 3.28084).toLocaleString() + ' ft' : String(res2);
        h += '<span class="pm-result">&#10003; ' + display + '</span>';
      } else {
        h += '<span class="pm-waiting">Draw a reach line to auto-calculate</span>';
      }
    }
  }
  row.innerHTML=h;
  if (m.method==='entered' && m.inputType==='select') {
    var pmSel = row.querySelector('esa-select.pm-input');
    if (pmSel) {
      pmSel.options = (m.opts||[]).map(function(o){ return {label:o, value:o}; });
      pmSel.value = d.value||'';
    }
  }
  // Draw elevation chart immediately after DOM update (canvas exists now)
  if (m.id === 'avg_slope') {
    var sd2 = we.ppData['avg_slope'] || {};
    if (sd2._elevProfile) {
      drawElevChart('elev-chart-'+we.id, sd2._elevProfile);
    }
  }
  row.onmouseenter=function(){highlightPP(m.id);};
  row.onmouseleave=function(){unhighlightPP();};
  row.onclick=function(e){var tag=e.target.tagName.toUpperCase();if(tag==='BUTTON'||tag==='INPUT'||tag==='SELECT')return;zoomToPP(m.id);};
}

function pmIsDone(we,m) {
  var d=ppOwner(we,m.id).ppData[m.id]||{};
  if(m.method==='entered'){
    // select fields always have a valid value — check if user has interacted or if it's a select type
    if(m.inputType==='select') return !!d.value;
    return !!d.value;
  }
  if(m.method==='calc')return ppCalc(we,m.id)!==null;
  if(m.method==='auto'){var da=ppOwner(we,m.id).ppData[m.id]||{};return !!(da.valueM&&da.layer);}
  if(m.method==='measured'){
    if(m.id==='area_ch'){var d2=we.ppData[m.id]||{};return !!(d2.userDrawn&&d2.layer)||(!!d2.bufferLayer&&!!d2.valueM);}
    if(m.id==='area_fp'){return ppCalc(we,'area_fp')!==null;}
    if(m.multi>0){var lines=d.lines||[];return lines.filter(function(l){return l&&l.lengthM;}).length===m.multi;}
    return !!(d.layer || (d.valueM && d._pts));
  }
  return false;
}

function ppSetBankHt(idx, val) {
  var we = getActiveWE(); if (!we) return;
  if (!we.ppData['ch_width'] || !we.ppData['ch_width'].lines) return;
  var line = we.ppData['ch_width'].lines[idx]; if (!line) return;
  line.bankHt = parseFloat(val) || null;
  rerenderCalcs();
  // No wizardRefreshIfActive() here: nothing in the ch_width wizard step's markup
  // depends on bankHt, and the debounced refresh it schedules can land mid-mousedown
  // on whatever the user clicks next (e.g. the following measurement's "draw" button),
  // detaching that button before mouseup fires and swallowing the click.
}

function ppCalc(we,id) {
  if(id==='bank_ht'){
    var cw = we.ppData['ch_width'];
    if(!cw || !cw.lines) return null;
    var heights = cw.lines.filter(function(l){ return l && l.bankHt; }).map(function(l){ return l.bankHt; });
    return heights.length ? heights.reduce(function(a,b){return a+b;},0)/heights.length : null;
  }
  if(id==='valley_len'){
    var rd=we.ppData['reach_len'];
    if(!rd||!rd.layer)return null;
    var pts=rd.layer.getLatLngs();
    if(pts.length&&Array.isArray(pts[0]))pts=pts[0];
    if(!pts||pts.length<2)return null;
    var p1=pts[0],p2=pts[pts.length-1];
    // Straight-line distance between first and last reach point in metres
    var R=6378137,toRad=function(d){return d*Math.PI/180;};
    var dLat=toRad(p2.lat-p1.lat);
    var dLng=toRad(p2.lng-p1.lng);
    var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(toRad(p1.lat))*Math.cos(toRad(p2.lat))*Math.sin(dLng/2)*Math.sin(dLng/2);
    var distM=R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    return distM;
  }
  if(id==='fp_width'){
    var fpM2=ppCalc(we,'area_fp');
    var reachM=we.ppData['reach_len']&&we.ppData['reach_len'].valueM;
    return (fpM2&&reachM)?(fpM2/reachM):null;
  }
  if(id==='area_fp'){
    var fpPoly=we.ppData['fp_poly'];
    if(fpPoly && typeof fpPoly.valueM==='number') return fpPoly.valueM;
    var leftD=we.ppData['fp_left'], rightD=we.ppData['fp_right'];
    var leftM2=(leftD&&leftD.layer&&leftD.valueM)?leftD.valueM:0;
    var rightM2=(rightD&&rightD.layer&&rightD.valueM)?rightD.valueM:0;
    return (leftM2||rightM2)?(leftM2+rightM2):null;
  }
  if(id==='avg_slope'){var sd=we.ppData['avg_slope'];return(sd&&sd._slopeDeg!==undefined)?sd._slopeDeg:null;}
  if(id==='sinuosity'){var rl=ppLenFt(we,'reach_len'),vl=ppCalcFt(we,'valley_len');return(rl&&vl&&vl>0)?(rl/vl).toFixed(2):null;}
  return null;
}

function ppCalcFt(we,id){var v=ppCalc(we,id);return v?v*3.28084:null;}

// Core cross-sectional width calculation: given a reach layer and polygon points, returns
// the width (metres) of the polygon perpendicular to the reach at arc-length parameter t.
function calcCrossWidthCore(reachLayer, fpPts, t) {
  var rPts = reachLayer.getLatLngs();
  if (rPts.length && Array.isArray(rPts[0])) rPts = rPts[0];
  if (!rPts || rPts.length < 2) return null;
  var totalLen = 0, segLens = [];
  for (var i = 0; i < rPts.length - 1; i++) { var sl = geoLen([rPts[i],rPts[i+1]]); segLens.push(sl); totalLen += sl; }
  if (totalLen === 0) return null;
  var target = totalLen * t, cum = 0, pt = null, segA = null, segB = null;
  for (var j = 0; j < segLens.length; j++) {
    if (cum + segLens[j] >= target || j === segLens.length - 1) {
      var frac = segLens[j] > 0 ? Math.min(1, (target - cum) / segLens[j]) : 0;
      pt = {lat: rPts[j].lat + frac*(rPts[j+1].lat-rPts[j].lat), lng: rPts[j].lng + frac*(rPts[j+1].lng-rPts[j].lng)};
      segA = rPts[j]; segB = rPts[j+1]; break;
    }
    cum += segLens[j];
  }
  if (!pt) return null;
  var midLat = (segA.lat+segB.lat)/2;
  var cosLat = Math.cos(midLat*Math.PI/180);
  var dLat = segB.lat-segA.lat, dLng = (segB.lng-segA.lng)*cosLat;
  var sLen = Math.sqrt(dLat*dLat+dLng*dLng); if (sLen < 1e-10) return null;
  var pLat = -dLng/sLen, pLng = dLat/sLen/cosLat;
  var hits = [];
  var n = fpPts.length;
  for (var k = 0; k < n; k++) {
    var A = fpPts[k], B = fpPts[(k+1)%n];
    var edgeLat = B.lat-A.lat, edgeLng = B.lng-A.lng;
    var cross = pLat*edgeLng - pLng*edgeLat;
    if (Math.abs(cross) < 1e-14) continue;
    var s = ((A.lat-pt.lat)*edgeLng - (A.lng-pt.lng)*edgeLat) / cross;
    var u = ((A.lat-pt.lat)*pLng    - (A.lng-pt.lng)*pLat)    / cross;
    if (u >= 0 && u <= 1) hits.push(s);
  }
  if (hits.length < 2) return null;
  hits.sort(function(a,b){return a-b;});
  var neg = null, pos = null;
  for (var h = 0; h < hits.length; h++) {
    if (hits[h] <= 0 && (neg === null || hits[h] > neg)) neg = hits[h];
    if (hits[h] >= 0 && (pos === null || hits[h] < pos)) pos = hits[h];
  }
  if (neg === null || pos === null) { neg = hits[0]; pos = hits[hits.length-1]; }
  return Math.abs(pos - neg) * 111320;
}

// Cross-sectional floodplain width perpendicular to the reach at arc-length parameter t (0–1).
// Finds all crossings of a perpendicular ray with the fp_poly outer boundary and returns the
// distance between the two crossings that bracket the reach centre-line.
function calcFpCrossWidth(we, t) {
  var reachD = we.ppData['reach_len']; if (!reachD || !reachD.layer) return null;
  var fpD = we.ppData['fp_poly']; if (!fpD) return null;
  var fpPts = null;
  if (fpD.layer) { var ll = fpD.layer.getLatLngs(); fpPts = (ll.length && Array.isArray(ll[0])) ? ll[0] : ll; }
  if (!fpPts || fpPts.length < 3) fpPts = fpD._pts;
  if (!fpPts || fpPts.length < 3) return null;
  return calcCrossWidthCore(reachD.layer, fpPts, t);
}
function calcFpCrossWidthFt(we, t) { var v = calcFpCrossWidth(we, t); return v ? Math.round(v*3.28084) : null; }

// Same calculation for the new (designed) floodplain against the primary channel.
function calcPCFPCrossWidth(we, t) {
  var pcReach = getActivePC(we).sowLayers['pc-reach']; if (!pcReach || !pcReach.layer) return null;
  var fpD = getActivePC(we).ppData['pc_fp']; if (!fpD) return null;
  var fpPts = null;
  if (fpD.layer) { var ll2 = fpD.layer.getLatLngs(); fpPts = (ll2.length && Array.isArray(ll2[0])) ? ll2[0] : ll2; }
  if (!fpPts || fpPts.length < 3) fpPts = fpD._pts;
  if (!fpPts || fpPts.length < 3) return null;
  return calcCrossWidthCore(pcReach.layer, fpPts, t);
}
function calcPCFPCrossWidthFt(we, t) { var v = calcPCFPCrossWidth(we, t); return v ? Math.round(v*3.28084) : null; }

function ppLenFt(we,id){var d=we.ppData[id];return(d&&d.valueM)?d.valueM*3.28084:null;}
function ppAcres(we,id){var d=we.ppData[id];return(d&&d.valueM)?d.valueM*0.000247105:null;}
function ppMultiAvgFt(we,id){var d=we.ppData[id];if(!d||!d.lines)return null;var lines=d.lines.filter(function(l){return l&&l.lengthM;});return lines.length?lines.reduce(function(a,l){return a+l.lengthM;},0)/lines.length*3.28084:null;}
function ppMultiAvgM(we,id){var d=we.ppData[id];if(!d||!d.lines)return null;var lines=d.lines.filter(function(l){return l&&l.lengthM;});return lines.length?lines.reduce(function(a,l){return a+l.lengthM;},0)/lines.length:null;}

// Build an approximate rectangular buffer polygon around a polyline
// halfWidthM = metres to offset perpendicular on each side
function buildBufferPoly(pts, halfWidthM) {
  if (!pts || pts.length < 2) return null;
  var R = 6378137;
  var toRad = function(d){ return d * Math.PI / 180; };

  function offsetPt(lat, lng, dLatM, dLngM) {
    var dLatDeg = (dLatM / R) * (180 / Math.PI);
    var dLngDeg = (dLngM / R) * (180 / Math.PI) / Math.cos(toRad(lat));
    return L.latLng(lat + dLatDeg, lng + dLngDeg);
  }

  // Left-hand unit perpendicular of segment a→b
  function segPerp(a, b) {
    var midLat = (a.lat + b.lat) / 2;
    var dLat = b.lat - a.lat;
    var dLng = (b.lng - a.lng) * Math.cos(toRad(midLat));
    var len = Math.sqrt(dLat * dLat + dLng * dLng);
    if (len === 0) return {pLat: 0, pLng: 0};
    return {pLat: -dLng / len, pLng: dLat / len};
  }

  var n = pts.length;
  var left = [], right = [];

  for (var i = 0; i < n; i++) {
    var lat = pts[i].lat, lng = pts[i].lng;
    var perp, pLat, pLng, len2, scale;

    if (i === 0) {
      perp = segPerp(pts[0], pts[1]);
      left.push(offsetPt(lat, lng,  perp.pLat * halfWidthM,  perp.pLng * halfWidthM));
      right.push(offsetPt(lat, lng, -perp.pLat * halfWidthM, -perp.pLng * halfWidthM));
    } else if (i === n - 1) {
      perp = segPerp(pts[n-2], pts[n-1]);
      left.push(offsetPt(lat, lng,  perp.pLat * halfWidthM,  perp.pLng * halfWidthM));
      right.push(offsetPt(lat, lng, -perp.pLat * halfWidthM, -perp.pLng * halfWidthM));
    } else {
      var p1 = segPerp(pts[i-1], pts[i]);
      var p2 = segPerp(pts[i],   pts[i+1]);
      // Average perpendicular direction
      pLat = (p1.pLat + p2.pLat) / 2;
      pLng = (p1.pLng + p2.pLng) / 2;
      len2 = Math.sqrt(pLat * pLat + pLng * pLng);
      if (len2 < 0.001) { pLat = p1.pLat; pLng = p1.pLng; len2 = 1; }
      // Normalize to unit vector
      var uLat = pLat / len2, uLng = pLng / len2;
      // Cross product to determine turn direction
      var d1Lat = pts[i].lat - pts[i-1].lat, d1Lng = pts[i].lng - pts[i-1].lng;
      var d2Lat = pts[i+1].lat - pts[i].lat, d2Lng = pts[i+1].lng - pts[i].lng;
      var turnCross = d1Lat * d2Lng - d1Lng * d2Lat;
      // Miter scale corrects for the averaged direction length
      // But cap it: outside max 1.5x, inside max 1.0x halfWidthM
      var miterCorrect = halfWidthM / len2; // proper miter distance
      var distL = turnCross > 0 ? Math.min(miterCorrect, halfWidthM * 1.5) : Math.min(miterCorrect, halfWidthM);
      var distR = turnCross > 0 ? Math.min(miterCorrect, halfWidthM)       : Math.min(miterCorrect, halfWidthM * 1.5);
      left.push(offsetPt(lat, lng,  uLat * distL,  uLng * distL));
      right.push(offsetPt(lat, lng, -uLat * distR, -uLng * distR));
    }
  }

  // Filter out any points that are clearly degenerate (NaN or more than 10× halfWidth from their source)
  var maxDegM = halfWidthM * 10;
  var maxDegDeg = (maxDegM / R) * (180 / Math.PI) * 2;
  left = left.filter(function(p, i){
    if (!isFinite(p.lat) || !isFinite(p.lng)) return false;
    var srcLat = pts[Math.min(i, n-1)].lat, srcLng = pts[Math.min(i, n-1)].lng;
    return Math.abs(p.lat - srcLat) < maxDegDeg * 2 && Math.abs(p.lng - srcLng) < maxDegDeg * 2;
  });
  right = right.filter(function(p, i){
    if (!isFinite(p.lat) || !isFinite(p.lng)) return false;
    var srcLat = pts[Math.min(i, n-1)].lat, srcLng = pts[Math.min(i, n-1)].lng;
    return Math.abs(p.lat - srcLat) < maxDegDeg * 2 && Math.abs(p.lng - srcLng) < maxDegDeg * 2;
  });

  function dedupe(arr) {
    return arr.filter(function(p, i) {
      if (i === 0) return true;
      return !(Math.abs(p.lat - arr[i-1].lat) < 1e-8 && Math.abs(p.lng - arr[i-1].lng) < 1e-8);
    });
  }
  left  = dedupe(left);
  right = dedupe(right);
  if (left.length < 2 || right.length < 2) return null;
  var ring = left.concat(right.slice().reverse());
  ring._left  = right.slice();  // right-hand side = left bank looking downstream
  ring._right = left.slice();   // left-hand side = right bank looking downstream
  // Upstream cap = average of first left and first right point
  // Downstream cap = average of last left and last right point
  ring._upstreamCap   = L.latLng((left[0].lat + right[0].lat)/2,                   (left[0].lng + right[0].lng)/2);
  ring._downstreamCap = L.latLng((left[left.length-1].lat + right[right.length-1].lat)/2, (left[left.length-1].lng + right[right.length-1].lng)/2);
  return ring;
}

// Extend reach pts slightly at both ends to prevent buffer cutoff at clipped boundaries
function extendReachPts(arr) {
  if (!arr || arr.length < 2) return arr;
  var ext = 0.00002; // ~2m in degrees — just enough to close end caps
  function extPt(from, toward) {
    var dLat=from.lat-toward.lat, dLng=from.lng-toward.lng;
    var len=Math.sqrt(dLat*dLat+dLng*dLng); if(len<1e-10) return from;
    return L.latLng(from.lat+(dLat/len)*ext, from.lng+(dLng/len)*ext);
  }
  var extended = arr.slice();
  extended.unshift(extPt(arr[0], arr[1]));
  extended.push(extPt(arr[arr.length-1], arr[arr.length-2]));
  return extended;
}

function clearReachDependents(we) {
  // Clear CHU splits
  if (getActivePC(we).chuUnits && getActivePC(we).chuUnits.length) {
    getActivePC(we).chuUnits.forEach(function(u){
      if(u.layer) map.removeLayer(u.layer);
      if(u.labelMarker) map.removeLayer(u.labelMarker);
    });
    getActivePC(we).chuUnits = [];
    getActivePC(we)._chuUndo = null;
    var chuEl = document.getElementById('chu-units-list');
    if (chuEl) chuEl.innerHTML = '';
    var chuSum = document.getElementById('chu-summary');
    if (chuSum) chuSum.innerHTML = '';
  }
  // Clear fp left/right split
  clearFpSplit(we);
}

function confirmReachChange(we) {
  // Returns true if safe to proceed (no dependents, or user confirmed)
  var hasCHU = getActivePC(we).chuUnits && getActivePC(we).chuUnits.length > 0;
  var hasFpSplit = we.ppData['area_fp'] && we.ppData['area_fp'].fpSplit;
  if (!hasCHU && !hasFpSplit) return true;
  var msg = 'Changing the reach line will clear:\n';
  if (hasCHU) msg += '  • Channel Habitat Unit splits (' + getActivePC(we).chuUnits.length + ' units)\n';
  if (hasFpSplit) msg += '  • Left/Right Floodplain split\n';
  msg += '\nContinue?';
  if (confirm(msg)) { clearReachDependents(we); return true; }
  return false;
}

// Returns true if every interior angle of the polygon is the same sign (convex).
function isConvexPolygon(pts) {
  var n = pts.length; if (n < 3) return false;
  var sign = 0;
  for (var i = 0; i < n; i++) {
    var a=pts[i], b=pts[(i+1)%n], c=pts[(i+2)%n];
    var cross=(b.lat-a.lat)*(c.lng-b.lng)-(b.lng-a.lng)*(c.lat-b.lat);
    if (Math.abs(cross)<1e-12) continue;
    var s=cross>0?1:-1;
    if (!sign) sign=s; else if (s!==sign) return false;
  }
  return true;
}

// Standalone point-in-polygon (ray-casting)
function ptInsidePoly(p, poly) {
  var inside=false;
  for(var i=0,j=poly.length-1;i<poly.length;j=i++){
    var xi=poly[i].lng,yi=poly[i].lat,xj=poly[j].lng,yj=poly[j].lat;
    if(((yi>p.lat)!==(yj>p.lat))&&(p.lng<(xj-xi)*(p.lat-yi)/(yj-yi)+xi))inside=!inside;
  }
  return inside;
}

// Nearest point on segment a→b to point p
function nearestPtOnSeg(p, a, b) {
  var dx=b.lng-a.lng, dy=b.lat-a.lat, lenSq=dx*dx+dy*dy;
  if(lenSq<1e-16) return {lat:a.lat,lng:a.lng};
  var t=Math.max(0,Math.min(1,((p.lng-a.lng)*dx+(p.lat-a.lat)*dy)/lenSq));
  return {lat:a.lat+t*dy, lng:a.lng+t*dx};
}

// If latlng falls outside the project perimeter, snap it to the nearest boundary point.
function snapToPerimeter(we, latlng) {
  var perimD=we&&we.ppData['perimeter'];
  if(!perimD||!perimD.layer) return latlng;
  var pp=perimD.layer.getLatLngs();
  if(pp.length&&Array.isArray(pp[0])) pp=pp[0];
  if(!pp||pp.length<3) return latlng;
  if(ptInsidePoly(latlng,pp)) return latlng;
  var best=null, bestD=Infinity;
  for(var i=0;i<pp.length;i++){
    var s=nearestPtOnSeg(latlng,pp[i],pp[(i+1)%pp.length]);
    var d=(s.lat-latlng.lat)*(s.lat-latlng.lat)+(s.lng-latlng.lng)*(s.lng-latlng.lng);
    if(d<bestD){bestD=d;best=s;}
  }
  return best?L.latLng(best.lat,best.lng):latlng;
}

// Sutherland-Hodgman polygon clipping — clips subject ring to clip polygon.
// Handles CW and CCW winding automatically. Works correctly for convex clip
// polygons; for concave clip polygons it may over-clip but won't crash.
function clipPolygonToPolygon(subject, clip) {
  function cross2D(o, a, b) {
    return (a.lat-o.lat)*(b.lng-o.lng)-(a.lng-o.lng)*(b.lat-o.lat);
  }
  var clipArea = 0;
  for (var k=0; k<clip.length; k++) { var nk=(k+1)%clip.length; clipArea+=clip[k].lat*clip[nk].lng-clip[nk].lat*clip[k].lng; }
  var clipSign = clipArea >= 0 ? 1 : -1;
  function inside(p, a, b) { return cross2D(a,b,p)*clipSign >= 0; }
  function lineIntersect(a, b, c, d) {
    var r={lat:b.lat-a.lat,lng:b.lng-a.lng}, s={lat:d.lat-c.lat,lng:d.lng-c.lng};
    var denom=r.lat*s.lng-r.lng*s.lat; if(Math.abs(denom)<1e-14) return null;
    var t=((c.lat-a.lat)*s.lng-(c.lng-a.lng)*s.lat)/denom;
    return {lat:a.lat+t*r.lat, lng:a.lng+t*r.lng};
  }
  var output = subject.slice();
  for (var i=0; i<clip.length; i++) {
    if (!output.length) return null;
    var input=output; output=[];
    var A=clip[i], B=clip[(i+1)%clip.length];
    for (var j=0; j<input.length; j++) {
      var curr=input[j], prev=input[(j+input.length-1)%input.length];
      if (inside(curr,A,B)) { if(!inside(prev,A,B)){ var ix=lineIntersect(prev,curr,A,B); if(ix)output.push(ix); } output.push(curr); }
      else if (inside(prev,A,B)) { var ix2=lineIntersect(prev,curr,A,B); if(ix2)output.push(ix2); }
    }
  }
  return output.length>=3 ? output : null;
}

// Weiler-Atherton polygon clipping (subject ∩ clip) — unlike clipPolygonToPolygon()
// above (Sutherland-Hodgman), this is correct for a CONCAVE clip polygon too, e.g. a
// project perimeter that bends along a winding creek. Returns an array of output
// rings (usually 1; can be >1 if the subject crosses the clip in genuinely disjoint
// places, or 0 if they don't overlap at all), or null if the geometry looks
// degenerate — callers should keep their existing fallback behavior in that case.
function distToPolyRing(p, poly) {
  var best = Infinity;
  for (var i=0;i<poly.length;i++) {
    var a=poly[i], b=poly[(i+1)%poly.length];
    var dx=b.lng-a.lng, dy=b.lat-a.lat, lenSq=dx*dx+dy*dy;
    var t = lenSq<1e-16 ? 0 : Math.max(0,Math.min(1,((p.lng-a.lng)*dx+(p.lat-a.lat)*dy)/lenSq));
    var cx=a.lng+t*dx, cy=a.lat+t*dy;
    var d=Math.sqrt((p.lng-cx)*(p.lng-cx)+(p.lat-cy)*(p.lat-cy));
    if (d<best) best=d;
  }
  return best;
}
function ptOnOrInsidePoly(p, poly, eps) {
  eps = eps || 1e-7;
  return ptInsidePoly(p, poly) || distToPolyRing(p, poly) < eps;
}
function clipConcave(subjectIn, clipIn) {
  if (!subjectIn || subjectIn.length < 3 || !clipIn || clipIn.length < 3) return null;
  function ensureCCW(pts) {
    var area=0;
    for (var i=0;i<pts.length;i++){ var j=(i+1)%pts.length; area += pts[i].lat*pts[j].lng - pts[j].lat*pts[i].lng; }
    return area < 0 ? pts.slice().reverse() : pts.slice();
  }
  function segSegIntersect(a,b,c,d) {
    var r={lat:b.lat-a.lat,lng:b.lng-a.lng}, s={lat:d.lat-c.lat,lng:d.lng-c.lng};
    var denom = r.lat*s.lng - r.lng*s.lat;
    if (Math.abs(denom) < 1e-14) return null;
    var ca = {lat:c.lat-a.lat, lng:c.lng-a.lng};
    var t = (ca.lat*s.lng - ca.lng*s.lat) / denom;
    var u = (ca.lat*r.lng - ca.lng*r.lat) / denom;
    var EPS = 1e-9;
    // Exclude endpoint-touching (t/u ~0 or ~1) — handled by the containment fallback instead,
    // and excluding them avoids degenerate near-zero-length splits at shared/snapped vertices.
    if (t < EPS || t > 1-EPS || u < EPS || u > 1-EPS) return null;
    return {t:t, u:u, pt:{lat:a.lat+t*r.lat, lng:a.lng+t*r.lng}};
  }
  // Break exact coordinate alignment between subject and clip (e.g. a drawn polygon
  // that happens to share an exact lat/lng bound with the clip polygon, which is
  // common for axis-ish rectangles) by nudging the subject a tiny, deterministic
  // amount — ~1e-9 deg is ~0.1mm, far below any meaningful acreage precision, but
  // enough to stop crossings from landing exactly on a clip vertex, which the
  // endpoint-exclusion above would otherwise misclassify as a degenerate touch and
  // silently drop, producing a false "no overlap" result.
  function jitter(pts) {
    return pts.map(function(p, i){
      return {lat: p.lat + (((i*97+13)%23)-11)*1e-9, lng: p.lng + (((i*61+7)%19)-9)*1e-9};
    });
  }
  // Also collapse consecutive (near-)duplicate vertices — e.g. this app's
  // double-click-to-finish drawing leaves a trailing repeated point — since a
  // real but non-jittered zero-length edge produces the same false-negative.
  function dedupeRing(pts) {
    var out = [];
    for (var i=0;i<pts.length;i++) {
      var p = pts[i], prev = out[out.length-1];
      if (!prev || Math.abs(prev.lat-p.lat) > 1e-11 || Math.abs(prev.lng-p.lng) > 1e-11) out.push(p);
    }
    while (out.length > 1) {
      var f = out[0], l = out[out.length-1];
      if (Math.abs(f.lat-l.lat) < 1e-11 && Math.abs(f.lng-l.lng) < 1e-11) out.pop(); else break;
    }
    return out;
  }
  var subjectDeduped = dedupeRing(subjectIn), clipDeduped = dedupeRing(clipIn);
  if (subjectDeduped.length < 3 || clipDeduped.length < 3) return null;
  var subject = ensureCCW(jitter(subjectDeduped));
  var clip = ensureCCW(clipDeduped);
  var ns = subject.length, nc = clip.length;

  var sInserts = []; for (var i=0;i<ns;i++) sInserts.push([]);
  var cInserts = []; for (var i2=0;i2<nc;i2++) cInserts.push([]);
  var found = false;

  for (var si=0; si<ns; si++) {
    var a=subject[si], b=subject[(si+1)%ns];
    for (var ci=0; ci<nc; ci++) {
      var c=clip[ci], d=clip[(ci+1)%nc];
      var hit = segSegIntersect(a,b,c,d);
      if (!hit) continue;
      found = true;
      sInserts[si].push({t:hit.t, pt:hit.pt});
      cInserts[ci].push({t:hit.u, pt:hit.pt});
    }
  }

  if (!found) {
    if (subject.every(function(p){ return ptOnOrInsidePoly(p, clip); })) return [subject];
    if (clip.every(function(p){ return ptOnOrInsidePoly(p, subject); })) return [clip];
    return [];
  }

  function buildList(poly, inserts) {
    var list = [];
    for (var i=0;i<poly.length;i++) {
      list.push({pt:poly[i], isX:false});
      var ins = inserts[i].slice().sort(function(p,q){return p.t-q.t;});
      ins.forEach(function(x){ list.push({pt:x.pt, isX:true}); });
    }
    return list;
  }
  var sList = buildList(subject, sInserts);
  var cList = buildList(clip, cInserts);

  function keyOf(pt){ return pt.lat.toFixed(9)+','+pt.lng.toFixed(9); }
  var cIndexByKey = {};
  cList.forEach(function(node, idx){ if (node.isX) { var k=keyOf(node.pt); (cIndexByKey[k]=cIndexByKey[k]||[]).push(idx); } });
  var unpaired = 0;
  sList.forEach(function(node, idx){
    if (!node.isX) return;
    var k = keyOf(node.pt);
    var arr = cIndexByKey[k];
    if (arr && arr.length) { node.cIdx = arr.shift(); cList[node.cIdx].sIdx = idx; }
    else unpaired++;
  });
  if (unpaired > 0) return null; // degenerate pairing — let the caller fall back

  var nS = sList.length;
  for (var i3=0;i3<nS;i3++) {
    if (!sList[i3].isX) continue;
    var next = sList[(i3+1)%nS];
    var mid = {lat:(sList[i3].pt.lat+next.pt.lat)/2, lng:(sList[i3].pt.lng+next.pt.lng)/2};
    sList[i3].entry = ptInsidePoly(mid, clip);
  }

  var results = [];
  for (var start=0; start<nS; start++) {
    if (!sList[start].isX || sList[start].visited || !sList[start].entry) continue;
    var ring = [];
    var curList = sList, curIdx = start, isFirst = true;
    var loopGuard = 0;
    while (loopGuard++ < 5000) {
      var node = curList[curIdx];
      if (node.visited && !isFirst) break;
      node.visited = true;
      if (node.isX) {
        if (curList===sList && node.cIdx!==undefined) cList[node.cIdx].visited = true;
        if (curList===cList && node.sIdx!==undefined) sList[node.sIdx].visited = true;
      }
      ring.push(node.pt);
      if (node.isX && !isFirst) {
        if (curList===sList) { curIdx = node.cIdx; curList = cList; }
        else { curIdx = node.sIdx; curList = sList; }
      }
      isFirst = false;
      curIdx = (curIdx+1) % curList.length;
      if (curList===sList && curIdx===start) break;
    }
    if (ring.length>=3) results.push(ring);
  }
  return results;
}

// Clip a polygon ring to the project perimeter using simple point-in-poly filter
// (keeps only vertices inside perimeter, inserts crossing points)
function clipRingToPerimeter(ring, perimPts) {
  if (!perimPts || perimPts.length < 3) return ring;
  // Use the clipLineToPolygon algorithm on the closed ring
  var closed = ring.concat([ring[0]]); // close the ring
  var clipped = clipLineToPolygon(closed.map(function(p){ return L.latLng(p.lat, p.lng); }), perimPts);
  if (!clipped || clipped.length < 3) return ring; // fallback to original
  return clipped;
}

// Clip drawn points to the project perimeter (if one exists).
// geo: 'line'|'segment' → clipLineToPolygon; 'polygon' → clipRingToPerimeter.
// Returns original pts unchanged when no perimeter is drawn yet. Returns null when the
// drawn shape is genuinely entirely outside the perimeter — callers must reject that
// rather than committing whatever this function returns.
function clipPtsToPerimeter(we, pts, geo) {
  var perimD = we && we.ppData['perimeter'];
  if (!perimD || !perimD.layer) return pts;
  var perimLLs = perimD.layer.getLatLngs();
  if (perimLLs.length && Array.isArray(perimLLs[0])) perimLLs = perimLLs[0];
  if (!perimLLs || perimLLs.length < 3) return pts;

  // Check this BEFORE attempting to clip — clipRingToPerimeter in particular falls back
  // to returning the original (unclipped) ring internally when it can't produce a clean
  // result, which would otherwise mask a shape that's genuinely entirely outside.
  var anyInside = pts.some(function(p){ return ptOnOrInsidePoly(p, perimLLs); });
  if (!anyInside) return null;

  if (geo === 'polygon') {
    var cp = clipRingToPerimeter(pts, perimLLs);
    return (cp && cp.length >= 3) ? cp : pts;
  } else {
    var cl = clipLineToPolygon(pts, perimLLs);
    return (cl && cl.length >= 2) ? cl : pts;
  }
}

// Point placements (structures, gravel, etc.) can't be clipped like a line/polygon —
// there's nothing to trim to, so reject the click outright instead. Returns true when
// there's no perimeter drawn yet (nothing to bound against).
function isPtInsidePerimeter(we, latlng) {
  var perimD = we && we.ppData['perimeter'];
  if (!perimD || !perimD.layer) return true;
  var perimLLs = perimD.layer.getLatLngs();
  if (perimLLs.length && Array.isArray(perimLLs[0])) perimLLs = perimLLs[0];
  if (!perimLLs || perimLLs.length < 3) return true;
  return ptOnOrInsidePoly(latlng, perimLLs);
}

// Re-clip the primary channel (pc-reach SOW layer) to the current perimeter.
function reClipPCReach(we) {
  var sl = we && getActivePC(we).sowLayers['pc-reach'];
  if (!sl || !sl.layer) return;
  var pts = sl.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  var clipped = clipPtsToPerimeter(we, pts, 'line');
  if (!clipped || clipped.length < 2) return;
  sl.layer.setLatLngs(clipped);
  sl.valueM = geoLen(clipped);
  addPCReachArrow(we);
  updatePCBuffer(we);
  updateSOWCalcs();
}

// Re-clip the reach line to the current perimeter.
// Called after perimeter is drawn or edited so an existing reach snaps to the new boundary.
function reClipReachToPerimeter(we) {
  var rd = we && we.ppData['reach_len'];
  if (!rd || !rd.layer) return;
  var pts = rd.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  var clipped = clipPtsToPerimeter(we, pts, 'line');
  if (!clipped || clipped.length < 2) return;
  rd.layer.setLatLngs(clipped);
  rd.valueM = geoLen(clipped);
  addReachArrow(we);
  updateAreaChBuffer(we);
  updateAreaFpBuffer(we);
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  if (m) renderPMRow(m);
  rerenderCalcs(); updatePPProgress(); updateSOWCalcs();
}

// Re-clip the pre-project floodplain polygon to the current perimeter.
// Called after perimeter is drawn or edited so an existing floodplain snaps to the new boundary.
function reClipFpPolyToPerimeter(we) {
  var d = we && we.ppData['fp_poly'];
  if (!d || !d.layer) return;
  var pts = d._pts || d.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  commitFpPoly(we, pts);
}

// Re-clip the primary channel's new-floodplain polygon to the current perimeter.
function reClipPCFPToPerimeter(we) {
  var pc = we && getActivePC(we);
  var d = pc && pc.ppData['pc_fp'];
  if (!d || !d.layer) return;
  var pts = d._pts || d.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  commitPCFP(we, pts);
}

function updateAreaChBuffer(we) {
  if (!we) return;
  var d = we.ppData['area_ch'];
  if (!d) { we.ppData['area_ch'] = {}; d = we.ppData['area_ch']; }
  // if user has drawn their own polygon, don't touch anything
  if (d.userDrawn && d.layer) return;
  // remove existing buffer layer
  if (d.bufferLayer) { map.removeLayer(d.bufferLayer); d.bufferLayer = null; }
  // check inputs
  var reachD = we.ppData['reach_len'];
  if (!reachD || !reachD.layer || !reachD.valueM) return;
  var avgWidthM = ppMultiAvgM(we, 'ch_width');
  if (!avgWidthM) return;
  var halfW = avgWidthM / 2;
  var pts = reachD.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  pts = extendReachPts(pts);
  var ring = buildBufferPoly(pts, halfW);
  if (!ring) return;
  // No perimeter clipping — S-H fails on non-convex subject polygons (bent reach
  // buffers have an indent at the inner corner). The buffer may extend slightly
  // past the boundary at endpoints but will never be truncated mid-reach.
  d.bufferLayer = L.polygon(ring, {
    color: PP_COLOR.buffer, fillColor: PP_COLOR.buffer,
    fillOpacity: 0.15, weight: 2, dashArray: '6,4', interactive: true
  }).bindTooltip('Area of Channel (estimated)').addTo(map);
  // Respect the pre-project visibility toggle
  if (!ppLayersVisible && map.hasLayer(d.bufferLayer)) map.removeLayer(d.bufferLayer);
  d.valueM = geoAreaM2(ring);
  // re-render the row if visible
  var m = PP_DEFS.filter(function(x){return x.id==='area_ch';})[0];
  renderPMRow(m); updatePPProgress();
  addReachArrow(we); // channel width just changed — re-fan flow arrows if now wide enough
}

function swapFpLeftRight() {
  var we = getActiveWE(); if (!we) return;
  var leftD = we.ppData['fp_left'] || {};
  var rightD = we.ppData['fp_right'] || {};
  // Swap all data
  we.ppData['fp_left'] = rightD;
  we.ppData['fp_right'] = leftD;
  // Update tooltip labels
  if (we.ppData['fp_left'].layer) we.ppData['fp_left'].layer.unbindTooltip().bindTooltip('Left Floodplain Area');
  if (we.ppData['fp_right'].layer) we.ppData['fp_right'].layer.unbindTooltip().bindTooltip('Right Floodplain Area');
  // Swap colors
  var colLeft = '#2a7a5c', colRight = '#5c2a7a';
  if (we.ppData['fp_left'].layer) we.ppData['fp_left'].layer.setStyle({color:colLeft,fillColor:colLeft});
  if (we.ppData['fp_right'].layer) we.ppData['fp_right'].layer.setStyle({color:colRight,fillColor:colRight});
  var mL = PP_DEFS.filter(function(x){return x.id==='fp_left';})[0];
  var mR = PP_DEFS.filter(function(x){return x.id==='fp_right';})[0];
  var mT = PP_DEFS.filter(function(x){return x.id==='area_fp';})[0];
  renderPMRow(mL); renderPMRow(mR); renderPMRow(mT);
  updatePPProgress();
}

function buildFpFromOuterLine(we, outerPts) {
  // Get channel buffer ring
  var chD = we.ppData['area_ch'];
  var chRing = null;
  if (chD) {
    var chLayer = chD.userDrawn ? chD.layer : chD.bufferLayer;
    if (chLayer) {
      var lls = chLayer.getLatLngs();
      chRing = (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
    }
  }
  if (!chRing || chRing.length < 3) {
    return {poly: outerPts, side: 'unknown'};
  }

  // Determine which side of the reach the outer line is on
  var reachD = we.ppData['reach_len'];
  var reachPts = null;
  if (reachD && reachD.layer) {
    reachPts = reachD.layer.getLatLngs();
    if (reachPts.length && Array.isArray(reachPts[0])) reachPts = reachPts[0];
  }
  var side = 'left';
  if (reachPts && reachPts.length >= 2) {
    var cLat = 0, cLng = 0;
    outerPts.forEach(function(p){ cLat += p.lat; cLng += p.lng; });
    cLat /= outerPts.length; cLng /= outerPts.length;
    var bestA = reachPts[0], bestB = reachPts[1], bestDist = Infinity;
    for (var i = 0; i < reachPts.length - 1; i++) {
      var a = reachPts[i], b = reachPts[i+1];
      var near = nearestOnSegment({lat:cLat,lng:cLng}, a, b);
      var d = Math.sqrt(Math.pow(cLat-near.lat,2)+Math.pow(cLng-near.lng,2));
      if (d < bestDist) { bestDist = d; bestA = a; bestB = b; }
    }
    var dx = bestB.lng - bestA.lng, dy = bestB.lat - bestA.lat;
    var cross = dx * (cLat - bestA.lat) - dy * (cLng - bestA.lng);
    side = cross > 0 ? 'left' : 'right';
  }

  // Find nearest points on channel buffer ring to each end of the outer line
  function nearestOnRing(ring, pt) {
    var bestIdx = 0, bestDist = Infinity;
    ring.forEach(function(p, i) {
      var d = Math.sqrt(Math.pow(p.lat-pt.lat,2)+Math.pow(p.lng-pt.lng,2));
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    });
    return bestIdx;
  }
  var startIdx = nearestOnRing(chRing, outerPts[0]);
  var endIdx   = nearestOnRing(chRing, outerPts[outerPts.length-1]);

  // Trace ring from endIdx to startIdx both directions, pick shorter
  var n = chRing.length;
  function traceArc(from, to, step) {
    var arc = [], idx = from;
    for (var j = 0; j <= n; j++) {
      arc.push(chRing[((idx % n) + n) % n]);
      if (((idx % n) + n) % n === to && j > 0) break;
      idx += step;
    }
    return arc;
  }
  var arcFwd = traceArc(endIdx, startIdx, 1);
  var arcRev = traceArc(endIdx, startIdx, -1);

  // Pick the arc that produces the SMALLER polygon area.
  // The correct arc (tracing the same-side bank) always creates a modest
  // floodplain polygon; the wrong arc wraps all the way around the channel
  // producing a huge polygon regardless of floodplain width or reach curvature.
  var polyFwd = outerPts.concat(arcFwd);
  var polyRev = outerPts.concat(arcRev);
  var arc  = geoAreaM2(polyFwd) <= geoAreaM2(polyRev) ? arcFwd : arcRev;
  var poly = geoAreaM2(polyFwd) <= geoAreaM2(polyRev) ? polyFwd : polyRev;
  return {poly: poly, side: side};
}

function commitFpPoly(we, pts) {
  if (!we || !pts || pts.length < 3) return;
  // Clip to project perimeter. clipConcave() (Weiler-Atherton) is correct for
  // both convex and concave perimeters (e.g. one that bends along a winding
  // creek) — use it whenever it yields a single clean piece; if it bails
  // (degenerate geometry) or the subject crosses the perimeter in genuinely
  // disjoint places, fall back to the convex-only S-H clip so we still get
  // something reasonable for the common convex case.
  var perimD = we.ppData['perimeter'];
  if (perimD && perimD.layer) {
    var perimPts = perimD.layer.getLatLngs();
    if (perimPts.length && Array.isArray(perimPts[0])) perimPts = perimPts[0];
    var concaveClipped = clipConcave(pts, perimPts);
    if (concaveClipped && concaveClipped.length === 1 && concaveClipped[0].length >= 3) {
      pts = concaveClipped[0];
    } else if (isConvexPolygon(perimPts)) {
      var clipped = clipPolygonToPolygon(pts, perimPts);
      if (clipped && clipped.length >= 3) pts = clipped;
    }
  }
  var d = we.ppData['fp_poly'] || {};
  we.ppData['fp_poly'] = d;
  if (d.layer) { map.removeLayer(d.layer); d.layer = null; }
  d._pts = pts;
  // Check for any vertices that fell outside the perimeter (belt-and-suspenders)
  var perimD3 = we.ppData['perimeter'];
  if (perimD3 && perimD3.layer) {
    var pp3 = perimD3.layer.getLatLngs();
    if (pp3.length && Array.isArray(pp3[0])) pp3 = pp3[0];
    d._outsidePerim = pp3.length>=3 && pts.some(function(p){ return !ptOnOrInsidePoly(p, pp3); });
  } else { d._outsidePerim = false; }
  var grossAreaM2 = geoAreaM2(pts);
  // Get channel buffer ring to subtract as a hole
  var achD = we.ppData['area_ch'];
  var chRing = null;
  if (achD) {
    var chLayer = achD.userDrawn ? achD.layer : achD.bufferLayer;
    if (chLayer) {
      var lls = chLayer.getLatLngs();
      chRing = (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
    }
  }
  var col = '#2a7a5c';
  if (chRing && chRing.length >= 3) {
    d.layer = L.polygon([pts, chRing.slice().reverse()], {
      color:col, fillColor:col, fillOpacity:0.18, weight:2, interactive:true
    }).bindTooltip('Floodplain Area').addTo(map);
    var chAreaM2 = geoAreaM2(chRing);
    d.valueM = Math.max(0, grossAreaM2 - chAreaM2);
  } else {
    d.layer = L.polygon(pts, {
      color:col, fillColor:col, fillOpacity:0.18, weight:2, interactive:true
    }).bindTooltip('Floodplain Area').addTo(map);
    d.valueM = grossAreaM2;
  }
  var m = PP_DEFS.filter(function(x){return x.id==='fp_poly';})[0];
  if (m) renderPMRow(m);
}

function commitPCFP(we, pts) {
  if (!we || !pts || pts.length < 3) return;
  var perimD = we.ppData['perimeter'];
  if (perimD && perimD.layer) {
    var pp = perimD.layer.getLatLngs();
    if (pp.length && Array.isArray(pp[0])) pp = pp[0];
    var concaveClippedPCFP = clipConcave(pts, pp);
    if (concaveClippedPCFP && concaveClippedPCFP.length === 1 && concaveClippedPCFP[0].length >= 3) {
      pts = concaveClippedPCFP[0];
    } else if (isConvexPolygon(pp)) {
      var clipped = clipPolygonToPolygon(pts, pp);
      if (clipped && clipped.length >= 3) pts = clipped;
    }
  }
  var pcFpOwner = getActivePC(we);
  var d = pcFpOwner.ppData['pc_fp'] || {};
  pcFpOwner.ppData['pc_fp'] = d;
  if (d.layer) { map.removeLayer(d.layer); d.layer = null; }
  d._pts = pts;
  var perimD2 = we.ppData['perimeter'];
  if (perimD2 && perimD2.layer) {
    var pp2 = perimD2.layer.getLatLngs();
    if (pp2.length && Array.isArray(pp2[0])) pp2 = pp2[0];
    d._outsidePerim = pp2.length>=3 && pts.some(function(p){ return !ptOnOrInsidePoly(p, pp2); });
  } else { d._outsidePerim = false; }
  var grossAreaM2 = geoAreaM2(pts);
  var pcAD = getActivePC(we).sowLayers['pc-area'];
  var chRing = null;
  if (pcAD && pcAD.layer) {
    var lls = pcAD.layer.getLatLngs();
    chRing = (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
  }
  var col = '#1a7a6c';
  if (chRing && chRing.length >= 3) {
    d.layer = L.polygon([pts, chRing.slice().reverse()], {
      color:col, fillColor:col, fillOpacity:0.18, weight:2, interactive:true
    }).bindTooltip('New Floodplain').addTo(map);
    d.valueM = Math.max(0, grossAreaM2 - geoAreaM2(chRing));
  } else {
    d.layer = L.polygon(pts, {
      color:col, fillColor:col, fillOpacity:0.18, weight:2, interactive:true
    }).bindTooltip('New Floodplain').addTo(map);
    d.valueM = grossAreaM2;
  }
  var m = PP_DEFS.filter(function(x){return x.id==='pc_fp';})[0];
  if (m) renderPMRow(m);
}

function commitFpSide(we, id, poly, side) {
  var colLeft = '#2a7a5c', colRight = '#5c2a7a';
  // Respect the user's explicit choice (left or right button).
  // Use the Swap button if sides need correcting after drawing.
  var finalId = id;
  var col = finalId === 'fp_left' ? colLeft : colRight;
  var label = finalId === 'fp_left' ? 'Left Floodplain Area' : 'Right Floodplain Area';
  if (!we.ppData[finalId]) we.ppData[finalId] = {};
  var d = we.ppData[finalId];
  if (d.layer) map.removeLayer(d.layer);
  // applyFpSide() (the auto-split path) stashes a colored label pin here — a manual
  // (re)draw of this side via the wizard's Redraw button only replaced d.layer,
  // leaving the auto-split's old label pin stranded on the map.
  if (d.labelMarker) { map.removeLayer(d.labelMarker); d.labelMarker = null; }
  d.layer = L.polygon(poly, {color:col, fillColor:col, fillOpacity:0.18, weight:2, interactive:true})
    .bindTooltip(label).addTo(map);
  d.valueM = geoAreaM2(poly);
  d.userDrawn = true;
  var m = PP_DEFS.filter(function(x){return x.id===finalId;})[0];
  renderPMRow(m);
  var otherId = finalId === 'fp_left' ? 'fp_right' : 'fp_left';
  var mO = PP_DEFS.filter(function(x){return x.id===otherId;})[0];
  renderPMRow(mO);
  var mT = PP_DEFS.filter(function(x){return x.id==='area_fp';})[0];
  renderPMRow(mT);
  updatePPProgress();
}

function updateAreaFpBuffer(we) {
  // area_fp is now auto-calculated from fp_left + fp_right via ppCalc
  // Just re-render the calc row
  if (!we) return;
  var m = PP_DEFS.filter(function(x){return x.id==='area_fp';})[0];
  renderPMRow(m);
}

function doFpSplit(weId) { try { var we=getWE(weId); if(we) splitFpByReach(we, we.ppData['area_fp']&&we.ppData['area_fp'].fpFlipped); } catch(e) { console.error('doFpSplit error:',e); alert('Split error: '+e.message); } }
function doFpFlip(weId)  { try { var we=getWE(weId); if(we) splitFpByReach(we, !(we.ppData['area_fp']&&we.ppData['area_fp'].fpFlipped)); } catch(e) { console.error('doFpFlip error:',e); alert('Flip error: '+e.message); } }
function doFpClear(weId) { try { var we=getWE(weId); if(we) clearFpSplit(we); } catch(e) { console.error('doFpClear error:',e); } }

function splitFpByReach(we, flip) {
  if (!we) return;
  var fpD = we.ppData['area_fp']; if (!fpD) return;

  var outerLeft     = fpD.outerLeft;
  var outerRight    = fpD.outerRight;
  var innerLeft     = fpD.innerLeft;
  var innerRight    = fpD.innerRight;
  var downstreamCap = fpD.downstreamCap;
  var innerDownCap  = fpD.innerDownstreamCap;

  if (!outerLeft || !outerRight || outerLeft.length < 2 || outerRight.length < 2) {
    setMapHint('Regenerate the floodplain buffer first — redraw a width measurement.');
    setTimeout(function(){setMapHint('');}, 3000); return;
  }

  var leftPts, rightPts;
  if (innerLeft && innerLeft.length >= 2 && innerRight && innerRight.length >= 2) {
    // Use outerLeft's proximity to determine which inner side belongs to left.
    // Then right always gets the opposite — prevents both sides picking the same inner edge.
    var oL0 = outerLeft[0], iL0 = innerLeft[0], iR0 = innerRight[0];
    var distLL = Math.pow(oL0.lat-iL0.lat,2)+Math.pow(oL0.lng-iL0.lng,2);
    var distLR = Math.pow(oL0.lat-iR0.lat,2)+Math.pow(oL0.lng-iR0.lng,2);
    var innerForLeft  = distLL < distLR ? innerLeft  : innerRight;
    var innerForRight = distLL < distLR ? innerRight : innerLeft;

    var oL = outerLeft.slice(0, outerLeft.length - 1);
    var iL = innerForLeft.slice(0, innerForLeft.length - 1);
    var oR = outerRight.slice(0, outerRight.length - 1);
    var iR = innerForRight.slice(0, innerForRight.length - 1);
    // Add explicit upstream cap: midpoint between outer and inner first points
    var upCapL = L.latLng((oL[0].lat+iL[0].lat)/2, (oL[0].lng+iL[0].lng)/2);
    var upCapR = L.latLng((oR[0].lat+iR[0].lat)/2, (oR[0].lng+iR[0].lng)/2);
    leftPts  = oL.concat(iL.slice().reverse()).concat([upCapL]);
    rightPts = oR.concat(iR.slice().reverse()).concat([upCapR]);
  } else {
    leftPts  = outerLeft.slice();
    rightPts = outerRight.slice();
  }

  if (flip) { var tmp = leftPts; leftPts = rightPts; rightPts = tmp; }

  // Clear any leftover debug layers
  if (window._debugLayers) { window._debugLayers.forEach(function(l){try{map.removeLayer(l);}catch(e){}}); }
  window._debugLayers = [];

  var colLeft = '#1a6a4a', colRight = '#4a1a6a';
  function applyFpSide(id, pts, col, label) {
    var d = we.ppData[id]; if (!d) { we.ppData[id] = {}; d = we.ppData[id]; }
    if (d.layer) map.removeLayer(d.layer);
    if (d.labelMarker) { map.removeLayer(d.labelMarker); d.labelMarker = null; }
    d.layer = L.polygon(pts, {color:col, fillColor:col, fillOpacity:0.22, weight:2, interactive:true})
      .bindTooltip(label).addTo(map);
    d.valueM = geoAreaM2(pts);
    // Add a label marker at the polygon centroid
    // Use scan-line to find a point guaranteed inside the polygon
    var lats = pts.map(function(p){return p.lat;}), lngs = pts.map(function(p){return p.lng;});
    var minLat = Math.min.apply(null,lats), maxLat = Math.max.apply(null,lats);
    var bestLen = -1, cLat = (minLat+maxLat)/2, cLng = (Math.min.apply(null,lngs)+Math.max.apply(null,lngs))/2;
    for (var si = 1; si < 32; si++) {
      var y = minLat + (maxLat-minLat)*si/32;
      var xs = [];
      for (var pi = 0; pi < pts.length; pi++) {
        var pj = (pi+1)%pts.length;
        var y1=pts[pi].lat, y2=pts[pj].lat;
        if((y1<=y&&y2>y)||(y2<=y&&y1>y)) xs.push(pts[pi].lng+(y-y1)*(pts[pj].lng-pts[pi].lng)/(y2-y1));
      }
      xs.sort(function(a,b){return a-b;});
      for (var xi = 0; xi+1 < xs.length; xi+=2) {
        var xlen = xs[xi+1]-xs[xi];
        if (xlen > bestLen) { bestLen=xlen; cLat=y; cLng=(xs[xi]+xs[xi+1])/2; }
      }
    }
    var icon = L.divIcon({
      className:'', iconSize:null, iconAnchor:null,
      html:'<div style="background:'+col+';color:#fff;font-size:11px;font-weight:700;padding:3px 9px;border-radius:12px;border:1.5px solid rgba(255,255,255,0.6);white-space:nowrap;box-shadow:0 1px 5px rgba(0,0,0,.5);pointer-events:none;transform:translate(-50%,-50%)">'+label+'</div>'
    });
    d.labelMarker = L.marker(L.latLng(cLat, cLng), {icon:icon, interactive:false, zIndexOffset:100}).addTo(map);
  }
  applyFpSide('fp_left',  leftPts,  colLeft,  'Left Floodplain');
  applyFpSide('fp_right', rightPts, colRight, 'Right Floodplain');

  fpD.fpSplit = true; fpD.fpFlipped = !!flip;
  var mL = PP_DEFS.filter(function(x){return x.id==='fp_left';})[0];
  var mR = PP_DEFS.filter(function(x){return x.id==='fp_right';})[0];
  renderPMRow(mL); renderPMRow(mR); updatePPProgress(); updatePPSteps();
}

function clearFpSplit(we) {
  ['fp_left','fp_right'].forEach(function(id){
    var d = we.ppData[id]; if (!d) return;
    if (d.layer) { map.removeLayer(d.layer); d.layer = null; d.valueM = 0; }
    if (d.labelMarker) { map.removeLayer(d.labelMarker); d.labelMarker = null; }
  });
  if (we.ppData['area_fp']) we.ppData['area_fp'].fpSplit = false;
  var mL = PP_DEFS.filter(function(x){return x.id==='fp_left';})[0];
  var mR = PP_DEFS.filter(function(x){return x.id==='fp_right';})[0];
  renderPMRow(mL); renderPMRow(mR); updatePPProgress();
}

function updatePPProgress() {
  var we=getActiveWE();if(!we)return;
  var total=0,done=0;
  PP_DEFS.forEach(function(m){if(m.method==='calc')return;total++;if(pmIsDone(we,m))done++;});
  var pct=total?Math.round(done/total*100):0;
  var pb=document.getElementById('pp-prog'); if(pb)pb.style.width=pct+'%';
  var pp=document.getElementById('pp-prog-pct'); if(pp)pp.textContent=pct+'%';
  var tabbar=document.getElementById('inner-tabbar');
  if (tabbar) tabbar.tabs = [{label:'Pre-Project', badge:done+'/'+total}, {label:'Habitat Work'}];
  updatePPSteps();
  wizardRefreshIfActive();
}

function ppSetVal(id,val) {
  var we=getActiveWE();if(!we)return;
  if(!we.ppData[id])we.ppData[id]={};
  we.ppData[id].value=val;
  var m=PP_DEFS.filter(function(x){return x.id===id;})[0];
  renderPMRow(m); rerenderCalcs(); updatePPProgress(); updateSOWCalcs();
}

// ── Elevation Profile ─────────────────────────────────────────────────────
var ELEV_SAMPLES = 20;

function sampleReachPts(pts, n) {
  if (!pts || pts.length < 2) return [];
  var totalLen = 0;
  for (var i = 0; i < pts.length-1; i++)
    totalLen += Math.sqrt(Math.pow(pts[i+1].lat-pts[i].lat,2)+Math.pow(pts[i+1].lng-pts[i].lng,2));
  var result = [], step = totalLen/(n-1), cum = 0, seg = 0;
  result.push(pts[0]);
  for (var k = 1; k < n-1; k++) {
    var target = k * step;
    while (seg < pts.length-2) {
      var segLen = Math.sqrt(Math.pow(pts[seg+1].lat-pts[seg].lat,2)+Math.pow(pts[seg+1].lng-pts[seg].lng,2));
      if (cum + segLen >= target) {
        var frac = (target-cum)/segLen;
        result.push(L.latLng(pts[seg].lat+frac*(pts[seg+1].lat-pts[seg].lat), pts[seg].lng+frac*(pts[seg+1].lng-pts[seg].lng)));
        break;
      }
      cum += segLen; seg++;
    }
  }
  result.push(pts[pts.length-1]);
  return result;
}

function fetchElevation(lat, lng) {
  var url = 'https://epqs.nationalmap.gov/v1/json?x='+lng+'&y='+lat+'&wkid=4326&units=Meters&includeDate=false';
  return fetch(url, {headers: {'Accept': 'application/json'}})
    .then(function(r){ return r.json(); })
    .then(function(d){
      return (d.value !== undefined && d.value !== '-1000000') ? parseFloat(d.value) : null;
    });
}

function fetchElevationProfile(we) {
  if (!we) return;
  var reachD = we.ppData['reach_len'];
  if (!reachD || !reachD.layer) return;
  var pts = reachD.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  if (!pts || pts.length < 2) return;
  if (!we.ppData['avg_slope']) we.ppData['avg_slope'] = {};
  we.ppData['avg_slope']._elevLoading = true;
  we.ppData['avg_slope']._elevProfile = null;
  we.ppData['avg_slope']._elevError = null;
  var m = PP_DEFS.filter(function(x){return x.id==='avg_slope';})[0];
  renderPMRow(m);
  var samples = sampleReachPts(pts, ELEV_SAMPLES);
  var promises = samples.map(function(p){ return fetchElevation(p.lat, p.lng); });
  // USGS's elevation service occasionally 500s on individual points, and when that
  // error response lacks CORS headers the fetch throws outright rather than just
  // resolving null — Promise.all() would fail the ENTIRE profile over one bad
  // sample. Promise.allSettled() lets the profile still compute from whatever
  // samples do succeed, so a partial USGS hiccup doesn't take out the whole feature.
  Promise.allSettled(promises).then(function(results) {
    var rejectedCount = results.filter(function(r){ return r.status === 'rejected'; }).length;
    var elevs = results.map(function(r){ return r.status === 'fulfilled' ? r.value : null; });
    var valid = elevs.filter(function(e){ return e !== null && !isNaN(e) && e > -100; });
    if (valid.length < 2) {
      we.ppData['avg_slope']._elevLoading = false;
      we.ppData['avg_slope']._elevError = rejectedCount > 0
        ? 'USGS elevation service is currently having issues — try again in a bit.'
        : 'No elevation data returned — outside USGS coverage?';
      renderPMRow(m);
      return;
    }
    var upstreamElev = elevs[0] !== null ? elevs[0] : valid[0];
    var downstreamElev = elevs[elevs.length-1] !== null ? elevs[elevs.length-1] : valid[valid.length-1];

    // If downstream is higher than upstream, the line is backwards — reverse it
    if (downstreamElev > upstreamElev) {
      var reachD2 = we.ppData['reach_len'];
      if (reachD2 && reachD2.layer) {
        var rPts = reachD2.layer.getLatLngs();
        if (rPts.length && Array.isArray(rPts[0])) rPts = rPts[0];
        rPts = rPts.slice().reverse();
        map.removeLayer(reachD2.layer);
        reachD2.layer = L.polyline(rPts, {color:'#c07820', weight:2.5, interactive:true}).bindTooltip('Reach Length').addTo(map);
        elevs = elevs.slice().reverse();
        var tmp = upstreamElev; upstreamElev = downstreamElev; downstreamElev = tmp;
        setMapHint('Reach direction reversed to flow downstream ↓');
        setTimeout(function(){setMapHint('');}, 3000);
        // Rebuild buffers with corrected direction. Note updateAreaChBuffer() bails
        // out early (before its own addReachArrow() call) when channel width hasn't
        // been measured yet — which is the common case here, since elevation loads
        // while the user is likely still on the Stream Reach step — so refresh the
        // flow arrows explicitly rather than relying on that call to do it.
        updateAreaChBuffer(we); updateAreaFpBuffer(we);
        addReachArrow(we);
      }
    }

    var reachLenM = reachD.valueM || 1;
    var elevChangeM = upstreamElev - downstreamElev;
    var slopePct = (elevChangeM / reachLenM) * 100;
    var slopeDeg = Math.atan(elevChangeM / reachLenM) * (180 / Math.PI);
    we.ppData['avg_slope']._elevLoading = false;
    we.ppData['avg_slope']._elevProfile = elevs;
    we.ppData['avg_slope']._upstreamElev = upstreamElev;
    we.ppData['avg_slope']._downstreamElev = downstreamElev;
    we.ppData['avg_slope']._elevChangeM = elevChangeM;
    we.ppData['avg_slope']._slopePct = slopePct;
    we.ppData['avg_slope']._slopeDeg = slopeDeg;
    we.ppData['avg_slope'].value = slopeDeg.toFixed(3);
    renderPMRow(m); rerenderCalcs(); updatePPProgress(); wizardRefreshIfActive();
  }).catch(function() {
    we.ppData['avg_slope']._elevLoading = false;
    we.ppData['avg_slope']._elevError = 'Could not reach USGS elevation service — check connection.';
    renderPMRow(m); wizardRefreshIfActive();
  });
}

// Manual override for reach flow direction — elevation data isn't always available
// (USGS outage) or reliable (very flat reaches), so let the user flip it themselves
// rather than being stuck with whatever direction it happened to be drawn/detected in.
function flipReachDirection(weArg) {
  var we = weArg || getActiveWE();
  var rd = we && we.ppData['reach_len'];
  if (!rd || !rd.layer) return;
  var pts = rd.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  pts = pts.slice().reverse();
  map.removeLayer(rd.layer);
  rd.layer = L.polyline(pts, {color:'#c07820', weight:2.5, interactive:true}).bindTooltip('Reach Length').addTo(map);

  // Keep an already-computed elevation profile in sync with the new direction
  // rather than leaving stale upstream/downstream stats from the old orientation.
  var sd = we.ppData['avg_slope'];
  if (sd && sd._elevProfile) {
    sd._elevProfile = sd._elevProfile.slice().reverse();
    var tmp = sd._upstreamElev; sd._upstreamElev = sd._downstreamElev; sd._downstreamElev = tmp;
    sd._elevChangeM = sd._upstreamElev - sd._downstreamElev;
    var reachLenM = rd.valueM || 1;
    sd._slopePct = (sd._elevChangeM / reachLenM) * 100;
    sd._slopeDeg = Math.atan(sd._elevChangeM / reachLenM) * (180 / Math.PI);
    sd.value = sd._slopeDeg.toFixed(3);
  }

  updateAreaChBuffer(we); updateAreaFpBuffer(we);
  addReachArrow(we);

  // Keep any already-drawn primary channel reach(es) oriented to match, same as
  // when they're first drawn (see orientPtsLikeReach in finishSOWDraw).
  var savedActivePCId = we.activePCId;
  we.primaryChannels.forEach(function(pc) {
    var sl = pc.sowLayers['pc-reach'];
    if (!sl || !sl.layer) return;
    var pcPts = sl.layer.getLatLngs();
    if (pcPts.length && Array.isArray(pcPts[0])) pcPts = pcPts[0];
    var oriented = orientPtsLikeReach(pcPts, pts);
    if (oriented !== pcPts) {
      sl.layer.setLatLngs(oriented);
      we.activePCId = pc.id;
      addPCReachArrow(we);
    }
  });
  we.activePCId = savedActivePCId;

  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  renderPMRow(m); rerenderCalcs(); updatePPProgress(); updateSOWCalcs();
}

// Manual override for the primary (designed) channel's own flow direction — same
// rationale as flipReachDirection() above, but for the pc-reach line drawn in the
// Primary Channel section rather than the pre-project reach.
function flipPCReachDirection(weArg) {
  var we = weArg || getActiveWE();
  var pc = we && getActivePC(we);
  var sl = pc && pc.sowLayers['pc-reach'];
  if (!sl || !sl.layer) return;
  var pts = sl.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  pts = pts.slice().reverse();
  map.removeLayer(sl.layer);
  var col = pcChannelColor(we, we.activePCId);
  var tipLabel = sl.label || 'Primary Channel';
  if (we.primaryChannels.length > 1) tipLabel += ' (' + pc.name + ')';
  sl.layer = L.polyline(pts, {color:col, weight:2.5, interactive:true}).bindTooltip(tipLabel).addTo(map);

  // Keep an already-computed elevation profile in sync with the new direction.
  var sd = pc.sowElev;
  if (sd && sd._profile) {
    sd._profile = sd._profile.slice().reverse();
    var tmp = sd._upstreamElev; sd._upstreamElev = sd._downstreamElev; sd._downstreamElev = tmp;
    sd._elevChangeM = sd._upstreamElev - sd._downstreamElev;
    var reachLenM = sl.valueM || 1;
    sd._slopePct = (sd._elevChangeM / reachLenM) * 100;
    sd._slopeDeg = Math.atan(sd._elevChangeM / reachLenM) * (180 / Math.PI);
    if (!pc.sowLayers['pc-slope']) pc.sowLayers['pc-slope'] = {};
    pc.sowLayers['pc-slope'].value = sd._slopeDeg.toFixed(3);
  }

  addPCReachArrow(we);
  updatePCBuffer(we);
  rerenderCalcs(); updateSOWCalcs();
  if (wizardMode) wizardRefreshIfActive();
}

function drawElevChart(canvasId, elevs) {
  var canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.offsetWidth || 280;
  canvas.width = w; canvas.height = 90;
  var h = canvas.height;
  // Convert metres → feet for display
  var elevsFt = elevs.map(function(e){ return (e !== null && !isNaN(e)) ? e * 3.28084 : null; });
  var valid = elevsFt.filter(function(e){ return e !== null; });
  if (!valid.length) return;
  var minE = Math.min.apply(null,valid), maxE = Math.max.apply(null,valid);
  var range = maxE - minE || 1;
  var pad = 4, labelW = 40;
  var chartW = w - labelW - pad, chartH = h - pad*2;

  ctx.clearRect(0, 0, w, h);

  // Y-axis labels (ft)
  ctx.fillStyle = '#5a7a9a'; ctx.font = '8px sans-serif'; ctx.textAlign = 'right';
  ctx.fillText(Math.round(maxE)+'ft', labelW-2, pad+8);
  ctx.fillText(Math.round(minE)+'ft', labelW-2, h-pad);

  // Grid lines
  ctx.strokeStyle = 'rgba(74,122,170,.35)'; ctx.lineWidth = 0.5;
  for (var g = 0; g <= 3; g++) {
    var gy = pad + (g/3)*chartH;
    ctx.beginPath(); ctx.moveTo(labelW, gy); ctx.lineTo(w-pad, gy); ctx.stroke();
  }

  // Gradient fill
  var grad = ctx.createLinearGradient(0, pad, 0, h-pad);
  grad.addColorStop(0, 'rgba(74,176,239,0.5)');
  grad.addColorStop(1, 'rgba(74,176,239,0.05)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  elevsFt.forEach(function(e, i) {
    var x = labelW + (i/(elevsFt.length-1))*chartW;
    var y = pad + (1 - ((e||minE)-minE)/range)*chartH;
    if (i===0) { ctx.moveTo(x, h-pad); ctx.lineTo(x,y); }
    else ctx.lineTo(x,y);
  });
  ctx.lineTo(labelW+chartW, h-pad); ctx.closePath(); ctx.fill();

  // Line
  ctx.strokeStyle = '#4ab0ef'; ctx.lineWidth = 1.5; ctx.lineJoin='round';
  ctx.beginPath();
  elevsFt.forEach(function(e, i) {
    var x = labelW + (i/(elevsFt.length-1))*chartW;
    var y = pad + (1 - ((e||minE)-minE)/range)*chartH;
    if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();

  // Upstream / downstream dots
  ctx.fillStyle = '#5ddba5';
  [[0, elevsFt[0]], [elevsFt.length-1, elevsFt[elevsFt.length-1]]].forEach(function(pair) {
    var x = labelW + (pair[0]/(elevsFt.length-1))*chartW;
    var y = pad + (1 - ((pair[1]||minE)-minE)/range)*chartH;
    ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill();
  });
}

// Build elevation profile HTML for the primary channel (we.sowElev).
// Uses a wz-scoped canvas ID so it coexists with the expert-panel chart.
function buildSOWElevChartHTML(we) {
  if (!we) return '';
  var sd = getActivePC(we).sowElev || {};
  var canvasId = 'sow-elev-chart-wz-' + we.id;
  var h = '<div class="elev-panel">';
  h += '<div class="elev-title">&#9650; Elevation Profile';
  if (sd._loading) {
    h += ' <span class="elev-loading">Querying USGS…</span></div>';
  } else if (sd._error) {
    h += '</div><div style="font-size:10px;color:var(--msow-error-soft,#c05050);padding:4px 0">'+sd._error+'</div>';
    h += '<button class="wz-action-btn secondary" style="margin-top:4px" onclick="fetchSOWElevationProfile(getActiveWE())">&#8635; Retry</button>';
  } else if (sd._profile) {
    h += '</div>';
    h += '<canvas id="'+canvasId+'" class="elev-chart" style="width:100%;height:90px;display:block"></canvas>';
    h += '<div class="elev-stats">';
    h += '<div class="elev-stat"><div class="elev-stat-label">Upstream</div><div class="elev-stat-val">'+Math.round((sd._upstreamElev||0)*3.28084)+' ft</div></div>';
    h += '<div class="elev-stat"><div class="elev-stat-label">Downstream</div><div class="elev-stat-val">'+Math.round((sd._downstreamElev||0)*3.28084)+' ft</div></div>';
    h += '<div class="elev-stat"><div class="elev-stat-label">Drop</div><div class="elev-stat-val">'+Math.round(Math.abs(sd._elevChangeM||0)*3.28084)+' ft</div></div>';
    h += '<div class="elev-stat"><div class="elev-stat-label">Slope</div><div class="elev-stat-val">'+(sd._slopeDeg||0).toFixed(2)+'° / '+(sd._slopePct||0).toFixed(2)+'%</div></div>';
    h += '</div>';
  } else {
    h += '</div><div class="elev-loading">Fetching elevation profile…</div>';
  }
  h += '</div>';
  return h;
}

function buildElevChartHTML(weId) {
  var we = getWE(weId); if (!we) return '';
  var sd = we.ppData['avg_slope'] || {};
  var canvasId = 'elev-chart-'+weId;
  var h = '<div class="elev-panel">';
  h += '<div class="elev-title">&#9650; Elevation Profile';
  if (sd._elevLoading) {
    h += ' <span class="elev-loading">Querying USGS elevation service…</span></div>';
  } else if (sd._elevError) {
    h += '</div><div style="font-size:10px;color:var(--msow-error-soft,#c05050);padding:4px 0">'+sd._elevError+'</div>';
    h += '<button class="pm-draw-btn" style="font-size:10px;margin-top:4px" onclick="fetchElevationProfile(getWE(\''+weId+'\'))">&#8635; Retry</button>';
  } else if (sd._elevProfile) {
    h += '</div>';
    h += '<canvas id="'+canvasId+'" class="elev-chart" style="width:100%;height:90px;display:block"></canvas>';
    h += '<div class="elev-stats">';
    h += '<div class="elev-stat"><div class="elev-stat-label">Upstream</div><div class="elev-stat-val">'+Math.round((sd._upstreamElev||0)*3.28084)+' ft</div></div>';
    h += '<div class="elev-stat"><div class="elev-stat-label">Downstream</div><div class="elev-stat-val">'+Math.round((sd._downstreamElev||0)*3.28084)+' ft</div></div>';
    h += '<div class="elev-stat"><div class="elev-stat-label">Drop</div><div class="elev-stat-val">'+Math.round(Math.abs(sd._elevChangeM||0)*3.28084)+' ft</div></div>';
    h += '<div class="elev-stat"><div class="elev-stat-label">Slope</div><div class="elev-stat-val">'+(sd._slopeDeg||0).toFixed(2)+'° / '+(sd._slopePct||0).toFixed(2)+'%</div></div>';
    h += '</div>';
    var profileSnap = sd._elevProfile;
    // Chart drawn synchronously in renderPMRow after innerHTML is set
  } else {
    h += '</div>';
    h += '<div class="elev-loading">Fetching elevation profile…</div>';
  }
  h += '</div>';
  return h;
}

function rerenderCalcs(){
  PP_DEFS.forEach(function(m){if(m.method==='calc')renderPMRow(m);});
  // Re-render prerequisite-gated measured metrics so their draw buttons
  // appear/disappear immediately when reach or area_ch changes.
  ['ch_width','fp_left','fp_right'].forEach(function(id){
    var m=PP_DEFS.filter(function(x){return x.id===id;})[0];
    if(m) renderPMRow(m);
  });
}

// ── PP drawing ────────────────────────────────────────────────────────────
function startPPDraw(metricId,idx) {
  var we=getActiveWE();if(!we)return;
  // Guard: if editing vertices on a shape, confirm before discarding unsaved edits
  if(lineEditing) {
    if(!confirm('You have unsaved vertex edits. Discard them and start a new drawing?')) return;
    cancelLineEdit();
  }
  // Guard: if vertices are already placed for a different metric, confirm before discarding
  if(drawPts.length > 0 && ppDrawing && ppDrawing.metricId !== metricId) {
    if(!confirm('You have an active drawing in progress. Cancel it and start a new one?')) return;
  }
  // Un-highlight any metric whose button is currently yellow before switching
  var prevDrawing = ppDrawing;
  if(reachAutoDetecting){cancelReachAutoDetect();}
  if(reachTrimming){cancelReachTrimMode();}
  if(reachExtending){cancelReachExtend();}
  ppDrawing={metricId:metricId,idx:idx,weId:activeWEId};
  if(prevDrawing && prevDrawing.metricId !== metricId) {
    var prevM = PP_DEFS.filter(function(x){return x.id===prevDrawing.metricId;})[0];
    if(prevM) renderPMRow(prevM);
  }
  sowDrawing=null; pendingStructPoint=null; drawPts=[];clearPreview();
  document.getElementById('mapwrap').classList.add('drawing');
  var m=PP_DEFS.filter(function(x){return x.id===metricId;})[0];
  var msg=m.geo==='polygon'?'Click vertices — double-click to close':(m.multi>0||m.segment)?'Click start then end point':'Click vertices — double-click to finish';
  if(m.id==='fp_left'||m.id==='fp_right') msg='Click along the <b>outer edge</b> of the floodplain — double-click to finish. Inner edge auto-completes along channel buffer.';
  setMapHint(msg); renderPMRow(m);
}

// Called by the "Done" button on the map — routes to the active draw finisher
function finishActiveDraw() {
  if (ppDrawing)   { finishPPDraw(); }
  else if (sowDrawing)  { finishSOWDraw(); }
  else if (chuDrawing)  { commitCHUSplit(); }
  else if (crDrawing)   { finishCRDraw(); }
  // The reach pre-trim "extend" step (Step 2) shows the generic #draw-done-btn pill
  // via the same .drawing class as everything above, but had no case here — clicking
  // it silently did nothing, and "Pick endpoints" in the sidebar was the only working
  // way out. Route Done to the same place Pick endpoints goes.
  else if (preReachExtend) { proceedToTrim(); }
}

function finishPPDraw() {
  if(!ppDrawing)return;
  var m=PP_DEFS.filter(function(x){return x.id===ppDrawing.metricId;})[0];if(!m)return;
  if(m.geo==='line'&&drawPts.length<2)return;
  if(m.geo==='polygon'&&drawPts.length<3)return;
  // Don't clearPreview() here — defer it until after the final layer is on the map
  // so there's no visible frame gap where nothing is shown.
  var we=getWE(ppDrawing.weId);if(!we)return;
  var pts=drawPts.slice();drawPts=[];
  var NO_CLIP_PP = {perimeter:1, ch_width:1};
  if(!NO_CLIP_PP[m.id]) pts=clipPtsToPerimeter(we,pts,m.geo);
  if (!pts) {
    ppDrawing=null;
    clearPreview();
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('That falls entirely outside your project boundary — not saved. Try drawing again inside the boundary.');
    renderPMRow(m);
    if (wizardMode) wizardRefreshIfActive();
    return;
  }
  var col=PP_COLOR[m.geo]||'#c07820';
  if(m.id==='fp_left') col='#2a7a5c';
  if(m.id==='fp_right') col='#5c2a7a';
  if(!ppOwner(we,m.id).ppData[m.id])ppOwner(we,m.id).ppData[m.id]={};
  // fp_poly/pc_fp are geo:'polygon' but need their own channel-subtraction commit path
  // rather than the generic polygon handling below — check them before the geo branch.
  if (m.id === 'fp_poly') {
    ppDrawing=null;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('');
    clearPreview();
    commitFpPoly(we, pts);
    rerenderCalcs(); updatePPProgress(); updateSOWCalcs();
    if (wizardMode) wizardRefreshIfActive();
    return;
  }
  if (m.id === 'pc_fp') {
    ppDrawing=null;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('');
    clearPreview();
    commitPCFP(we, pts);
    rerenderCalcs(); updatePPProgress(); updateSOWCalcs();
    if (wizardMode) wizardRefreshIfActive();
    return;
  }
  if(m.multi>0) {
    if(!we.ppData[m.id].lines)we.ppData[m.id].lines=[];
    // Remove old layer if it exists
    if(we.ppData[m.id].lines[ppDrawing.idx]&&we.ppData[m.id].lines[ppDrawing.idx].layer) {
      map.removeLayer(we.ppData[m.id].lines[ppDrawing.idx].layer);
    }
    we.ppData[m.id].lines[ppDrawing.idx]={layer:null, pts:pts, lengthM:geoLen(pts)};
  } else if(m.geo==='line') {
    if(m.id==='reach_len' && we.ppData[m.id] && we.ppData[m.id].layer && !confirmReachChange(we)) {
      ppDrawing=null; document.getElementById('mapwrap').classList.remove('drawing'); setMapHint(''); return;
    }
    // fp_left / fp_right: build closed polygon from outer line + channel buffer arc
    if (m.id === 'fp_left' || m.id === 'fp_right') {
      ppDrawing=null;
      document.getElementById('mapwrap').classList.remove('drawing');
      setMapHint('');
      var fpResult = buildFpFromOuterLine(we, pts);
      clearPreview();
      commitFpSide(we, m.id, fpResult.poly, fpResult.side);
      rerenderCalcs(); updateSOWCalcs();
      return;
    }
    if(we.ppData[m.id].layer)map.removeLayer(we.ppData[m.id].layer);
    we.ppData[m.id].layer=L.polyline(pts,{color:col,weight:2,dashArray:'4,3',interactive:true}).bindTooltip(m.label).addTo(map);
    we.ppData[m.id].valueM=geoLen(pts);
  } else {
    if(we.ppData[m.id].layer)map.removeLayer(we.ppData[m.id].layer);
    var polyStyle = m.id==='perimeter'
      ? {color:col, fillOpacity:0, weight:2, dashArray:'8 5', interactive:false}
      : {color:col, fillColor:col, fillOpacity:.18, weight:2, interactive:true};
    we.ppData[m.id].layer=L.polygon(pts,polyStyle).bindTooltip(m.label).addTo(map);
    we.ppData[m.id].valueM=geoAreaM2(pts);
    // if this is area_ch or area_fp, mark as user-drawn and hide the buffer
    if(m.id==='area_ch'||m.id==='area_fp'){
      we.ppData[m.id].userDrawn=true;
      if(we.ppData[m.id].bufferLayer){map.removeLayer(we.ppData[m.id].bufferLayer);we.ppData[m.id].bufferLayer=null;}
      if(m.id==='area_ch') updateAreaFpBuffer(getWE(we.id));
      if(m.id==='area_fp') {
        // Store boundary and rebuild as donut (minus channel)
        we.ppData[m.id]._fpBoundaryDrawn = true;
        we.ppData[m.id]._fpBoundaryPts = pts;
        // Remove the raw polygon — donut will replace it
        if(we.ppData[m.id].layer){map.removeLayer(we.ppData[m.id].layer);we.ppData[m.id].layer=null;}
        we.ppData[m.id].userDrawn = false; // donut layer is the display layer
        updateAreaFpBuffer(getWE(we.id));
      }
    }
  }
  clearPreview(); // deferred from top of function — final layer is on the map now, no gap
  ppDrawing=null;
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('');
  renderPMRow(m);rerenderCalcs();updatePPProgress();updateSOWCalcs();
  updateAreaChBuffer(getWE(we.id));
  updateAreaFpBuffer(getWE(we.id));
  if(m.id==='reach_len') addReachArrow(getWE(we.id));
  if(m.id==='perimeter') { reClipReachToPerimeter(getWE(we.id)); reClipPCReach(getWE(we.id)); reClipFpPolyToPerimeter(getWE(we.id)); reClipPCFPToPerimeter(getWE(we.id)); }
  if(m.id==='reach_len') {
    updateWELabel(getWE(we.id), true);
    setTimeout(function(){ fetchElevationProfile(getWE(we.id)); }, 300);
  }
}

// ── Reach direction arrow(s) ──────────────────────────────────────────────
// At each of 25/50/75% along the reach, place one arrow — or, if the channel/
// buffer polygon there is wide enough on screen at the current zoom, a row of
// evenly-spaced arrows fanned across that width instead (all same bearing).
// Re-run on zoomend (see refreshAllFlowArrows) since "wide enough" is judged
// in screen pixels, which changes with zoom even though the geometry doesn't.
function widthPolyPts(d) {
  if (!d) return null;
  var layer = d.layer || d.bufferLayer;
  if (!layer) return null;
  var pts = layer.getLatLngs();
  return (pts.length && Array.isArray(pts[0])) ? pts[0] : pts;
}

// Position + bearing + perpendicular unit vector + real-world width (meters) at
// arc-length fraction t along reachPts, measured against widthPts if given.
function flowArrowCrossSection(reachPts, widthPts, t) {
  var cumLen = [0];
  for (var i = 1; i < reachPts.length; i++) {
    var dlat = reachPts[i].lat - reachPts[i-1].lat, dlng = reachPts[i].lng - reachPts[i-1].lng;
    cumLen.push(cumLen[i-1] + Math.sqrt(dlat*dlat + dlng*dlng));
  }
  var total = cumLen[cumLen.length-1];
  if (total === 0) return null;
  var target = total * t, seg = 0;
  for (var k = 1; k < cumLen.length; k++) { if (cumLen[k] >= target) { seg = k-1; break; } }
  var segLen = cumLen[seg+1] - cumLen[seg];
  var segT = segLen > 0 ? (target - cumLen[seg]) / segLen : 0;
  var p1 = reachPts[seg], p2 = reachPts[seg+1];
  var pos = {lat: p1.lat + segT*(p2.lat-p1.lat), lng: p1.lng + segT*(p2.lng-p1.lng)};

  var lat1 = p1.lat*Math.PI/180, lat2 = p2.lat*Math.PI/180, dLngRad = (p2.lng-p1.lng)*Math.PI/180;
  var y = Math.sin(dLngRad)*Math.cos(lat2);
  var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLngRad);
  var brgDeg = Math.atan2(y,x)*180/Math.PI;

  // Perpendicular unit vector (degree-equivalent space) + width via raycast
  // against widthPts, mirroring calcCrossWidthCore's approach — kept separate
  // from that function since it also needs the direction vector, not just width.
  var widthM = null, pLat = 0, pLng = 0;
  var midLat = (p1.lat+p2.lat)/2, cosLat = Math.cos(midLat*Math.PI/180);
  var dLat = p2.lat-p1.lat, dLngC = (p2.lng-p1.lng)*cosLat;
  var sLen = Math.sqrt(dLat*dLat+dLngC*dLngC);
  if (sLen > 1e-10 && widthPts && widthPts.length >= 3) {
    pLat = -dLngC/sLen; pLng = dLat/sLen/cosLat;
    var hits = [], n = widthPts.length;
    for (var wi = 0; wi < n; wi++) {
      var A = widthPts[wi], B = widthPts[(wi+1)%n];
      var edgeLat = B.lat-A.lat, edgeLng = B.lng-A.lng;
      var cross = pLat*edgeLng - pLng*edgeLat;
      if (Math.abs(cross) < 1e-14) continue;
      var s = ((A.lat-pos.lat)*edgeLng - (A.lng-pos.lng)*edgeLat) / cross;
      var u = ((A.lat-pos.lat)*pLng - (A.lng-pos.lng)*pLat) / cross;
      if (u >= 0 && u <= 1) hits.push(s);
    }
    if (hits.length >= 2) {
      hits.sort(function(a,b){return a-b;});
      var neg=null, pos2=null;
      for (var h=0; h<hits.length; h++) {
        if (hits[h] <= 0 && (neg===null || hits[h] > neg)) neg = hits[h];
        if (hits[h] >= 0 && (pos2===null || hits[h] < pos2)) pos2 = hits[h];
      }
      if (neg !== null && pos2 !== null) widthM = Math.abs(pos2-neg) * 111320;
    }
  }
  return {pos:pos, brgDeg:brgDeg, pLat:pLat, pLng:pLng, widthM:widthM};
}

function makeFlowArrowIcon(brgDeg, colorHex) {
  var html = '<div style="transform:rotate('+brgDeg+'deg);width:22px;height:22px;display:flex;align-items:center;justify-content:center;margin-left:-11px;margin-top:-11px">' +
    '<svg width="18" height="18" viewBox="0 0 18 18"><polygon points="9,0 17,18 9,12 1,18" fill="'+colorHex+'" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg></div>';
  return L.divIcon({ className: '', html: html, iconSize: [0, 0], iconAnchor: [0, 0] });
}

var FLOW_ARROW_SPACING_PX = 28;
var FLOW_ARROW_MAX_COUNT = 5;
var FLOW_ARROW_MIN_FAN_PX = 50; // below this on-screen width, just one centered arrow

function buildFlowArrowMarkers(reachLayer, widthD, colorHex) {
  if (!reachLayer) return [];
  var reachPts = reachLayer.getLatLngs();
  if (reachPts.length && Array.isArray(reachPts[0])) reachPts = reachPts[0];
  if (!reachPts || reachPts.length < 2) return [];
  var wPts = widthPolyPts(widthD);
  var markers = [];
  [0.25, 0.5, 0.75].forEach(function(t) {
    var cs = flowArrowCrossSection(reachPts, wPts, t);
    if (!cs) return;
    var metersPerPixel = 156543.03392 * Math.cos(cs.pos.lat*Math.PI/180) / Math.pow(2, map.getZoom());
    var pixelWidth = cs.widthM ? cs.widthM / metersPerPixel : 0;
    var count = pixelWidth < FLOW_ARROW_MIN_FAN_PX ? 1 : Math.min(FLOW_ARROW_MAX_COUNT, Math.max(2, Math.floor(pixelWidth / FLOW_ARROW_SPACING_PX)));
    if (count <= 1) {
      markers.push(L.marker([cs.pos.lat, cs.pos.lng], {icon: makeFlowArrowIcon(cs.brgDeg, colorHex), interactive:false}).addTo(map));
      return;
    }
    // Evenly space `count` arrows across [-widthM/2, +widthM/2] around the centerline point.
    for (var i = 0; i < count; i++) {
      var frac = (i / (count - 1)) - 0.5; // -0.5..0.5
      var offsetM = frac * cs.widthM;
      var offsetUnits = offsetM / 111320;
      var lat = cs.pos.lat + cs.pLat * offsetUnits;
      var lng = cs.pos.lng + cs.pLng * offsetUnits;
      markers.push(L.marker([lat, lng], {icon: makeFlowArrowIcon(cs.brgDeg, colorHex), interactive:false}).addTo(map));
    }
  });
  return markers;
}

// Flow-direction arrows are stashed on their owning shape two ways: the full
// array (_arrowMarkers, the actual Leaflet layers on the map) and a single
// legacy reference (_arrowMarker) some older call sites still read. The same
// bug — clearing one but not the other, leaving arrows stranded on the map —
// recurred three times (commits 5ce5bef, 624b15e) before landing here as the
// one place that owns both fields together. Safe to call on any holder,
// including one that never had arrows (no-op).
function clearFlowArrows(holder) {
  if (!holder) return;
  if (holder._arrowMarkers) { holder._arrowMarkers.forEach(function(m){ if(m) map.removeLayer(m); }); holder._arrowMarkers = null; }
  if (holder._arrowMarker) { map.removeLayer(holder._arrowMarker); holder._arrowMarker = null; }
}

// Fans a shape's already-built flow arrows to a given opacity without rebuilding
// them — for hiding them during vertex-drag edits (0) and restoring afterward (1),
// or fading with the rest of the pre-project layers (any value in between).
function setFlowArrowOpacity(holder, opacity) {
  if (holder && holder._arrowMarkers) holder._arrowMarkers.forEach(function(a){ if(a) a.setOpacity(opacity); });
}

function addReachArrow(we) {
  var rd = we && we.ppData['reach_len'];
  clearFlowArrows(rd);
  if(!rd || !rd.layer) return;
  var markers = buildFlowArrowMarkers(rd.layer, we.ppData['area_ch'], '#c07820');
  if (!markers.length) return;
  // Respect the pre-project visibility toggle — buildFlowArrowMarkers() always adds
  // fresh markers to the map, which otherwise leaks the pre-project reach's arrows
  // back in on every zoom (refreshAllFlowArrows runs regardless of wizard step)
  // even while pre-project layers are supposed to be hidden during habitat work.
  if (!ppLayersVisible) markers.forEach(function(mk){ map.removeLayer(mk); });
  rd._arrowMarkers = markers;
  rd._arrowMarker = markers[Math.floor(markers.length/2)]; // keep reference for legacy code
}

function addPCReachArrow(we) {
  var sl = we && getActivePC(we).sowLayers['pc-reach'];
  clearFlowArrows(sl);
  if (!sl || !sl.layer) return;
  sl._arrowMarkers = buildFlowArrowMarkers(sl.layer, getActivePC(we).sowLayers['pc-area'], '#2a7a5c');
}

// Pixel width depends on zoom even when the geometry hasn't changed — re-fan
// every work element's/primary channel's flow arrows whenever the zoom changes.
function refreshAllFlowArrows() {
  workElements.forEach(function(w) {
    if (w.ppData['reach_len'] && w.ppData['reach_len'].layer) addReachArrow(w);
    (w.primaryChannels||[]).forEach(function(pc) {
      if (pc.sowLayers['pc-reach'] && pc.sowLayers['pc-reach'].layer) {
        var savedActivePCId = w.activePCId;
        w.activePCId = pc.id;
        addPCReachArrow(w);
        w.activePCId = savedActivePCId;
      }
    });
  });
}

function clearPPGeom(id) {
  var we=getActiveWE();if(!we)return;var d=ppOwner(we,id).ppData[id];if(!d)return;
  if(id==='reach_len' && d.layer && !confirmReachChange(we)) return;
  if(d.layer){map.removeLayer(d.layer);d.layer=null;d.valueM=0;}
  if(id==='reach_len') clearFlowArrows(d);
  if(id==='area_ch'){d.userDrawn=false;updateAreaChBuffer(we);updateAreaFpBuffer(we);}
  if(id==='area_fp'){
    d.userDrawn=false;
    d._fpBoundaryDrawn=false;
    d._fpBoundaryPts=null;
    if(d._donutLayer){map.removeLayer(d._donutLayer);d._donutLayer=null;}
    updateAreaFpBuffer(we);
  }
  var m=PP_DEFS.filter(function(x){return x.id===id;})[0];
  renderPMRow(m);rerenderCalcs();updatePPProgress();
}

function clearPPLine(id,idx) {
  var we=getActiveWE();if(!we)return;var d=we.ppData[id];if(!d||!d.lines||!d.lines[idx])return;
  if(d.lines[idx].layer)map.removeLayer(d.lines[idx].layer);d.lines[idx]=null;
  var m=PP_DEFS.filter(function(x){return x.id===id;})[0];
  renderPMRow(m);rerenderCalcs();updatePPProgress();
  updateAreaChBuffer(we);
  updateAreaFpBuffer(we);
}

// ── PP highlight/zoom ─────────────────────────────────────────────────────
function ppLayersFor(id) {
  var we=getActiveWE();if(!we)return[];var d=ppOwner(we,id).ppData[id];if(!d)return[];
  var out=[];if(d.layer)out.push(d.layer);if(d.bufferLayer)out.push(d.bufferLayer);if(d.lines)d.lines.forEach(function(l){if(l&&l.layer)out.push(l.layer);});return out;
}
function highlightPP(id) {
  PP_DEFS.forEach(function(m){ppLayersFor(m.id).forEach(function(layer){if(!layer.setStyle)return;var active=m.id===id;if(m.geo==='polygon'){if(m.id==='perimeter'){layer.setStyle({weight:active?3:2,fillOpacity:active?0.2:0,opacity:active?1:.5});}else{layer.setStyle({weight:active?3:1,fillOpacity:active?.4:.18,opacity:active?1:.35});}}else layer.setStyle({weight:active?4:1.5,opacity:active?1:.35});});});
}
function unhighlightPP() {
  PP_DEFS.forEach(function(m){ppLayersFor(m.id).forEach(function(layer){if(!layer.setStyle)return;if(m.geo==='polygon'){if(m.id==='perimeter')layer.setStyle({weight:2,fillOpacity:0,opacity:1});else layer.setStyle({weight:2,fillOpacity:.18,opacity:1});}else layer.setStyle({weight:2,opacity:1});});});
}
function zoomToPP(id) {
  var layers=ppLayersFor(id);if(!layers.length)return;var bounds=null;
  layers.forEach(function(layer){try{var b=layer.getBounds?layer.getBounds():null;if(b)bounds=bounds?bounds.extend(b):b;}catch(e){}});
  if(bounds&&bounds.isValid())map.fitBounds(bounds,{padding:[50,50]});
}

// ── Work side ─────────────────────────────────────────────────────────────
function renderWorkSide() {
  var we=getActiveWE();if(!we)return;
  var el=document.getElementById('work-side');
  // Build tab bar from WE types
  var tabHtml='<div class="work-wt-tabs">';
  we.types.forEach(function(t,i){
    tabHtml+='<div class="work-wt-tab'+(i===0?' active':'')+'" id="wttab-'+t+'" onclick="showWorkTab(\''+t+'\')">'+'<span class="wt-dot-sm" style="background:'+TYPE_COLORS[t]+'"></span>'+{pc:'Primary Channel',fp:'Floodplain',rr:'Riparian'}[t]+'</div>';
  });
  tabHtml+='</div><div id="work-content">';
  we.types.forEach(function(t,i){
    tabHtml+='<div class="wt-panel'+(i===0?' active':'')+'" id="panel-'+t+'">';
    tabHtml+=buildWorkPanelHTML(t,we);
    tabHtml+='</div>';
  });
  tabHtml+='</div>';
  el.innerHTML=tabHtml;
  // Attach events for highlight/zoom rows
  el.querySelectorAll('.f-row.has-draw').forEach(function(row){
    var id=row.getAttribute('data-draw-id');if(!id)return;
    row.onmouseenter=function(){highlightSOW(id);};
    row.onmouseleave=function(){unhighlightSOW();};
    row.onclick=function(e){var tag=e.target.tagName.toUpperCase();if(tag==='BUTTON'||tag==='INPUT'||tag==='SELECT')return;zoomToSOW(id);};
  });
  // Render existing structure lists
  ['cms','mcs','css'].forEach(function(t){renderStructures(t);});
  renderFPStructures();
  // Render CHU units if present
  var pcForRender = getActivePC(we);
  if (pcForRender.chuUnits && pcForRender.chuUnits.length) renderCHUUnits(we);
  updateSOWCalcs();
  restoreFInputValues(we);
  renderChannelReaches();
  // Restore elevation profile chart if already fetched
  if (pcForRender.sowElev && pcForRender.sowElev._profile) {
    setTimeout(function(){ updateSOWSlopePanel(we); }, 50);
  }
}

function showWorkTab(t) {
  var we=getActiveWE();if(!we)return;
  we.types.forEach(function(wt){
    var tab=document.getElementById('wttab-'+wt);var panel=document.getElementById('panel-'+wt);
    if(tab)tab.classList.toggle('active',wt===t);
    if(panel)panel.classList.toggle('active',wt===t);
  });
}

function buildWorkPanelHTML(t, we) {
  if(t==='pc') return buildPCPanelHTML(we);
  if(t==='fp') return buildFPPanelHTML(we);
  if(t==='rr') return buildRRPanelHTML(we);
  return '';
}

function fRow(label, id, geo, drawLabel) {
  return '<div class="f-row has-draw" data-draw-id="'+id+'"><label>'+label+'</label>' +
    '<button class="draw-btn" id="dbtn-'+id+'" onclick="startSOWDraw(\''+id+'\',\''+geo+'\',\''+label+'\')">'+drawLabel+'</button>' +
    '<div id="dr-'+id+'"></div></div>';
}
function fInput(label, id) {
  return '<div class="f-row"><esa-text-field label="'+label+'" type="number" id="f-'+id+'" placeholder="0" size="sm" onchange="onFInputChange(\''+id+'\',this.value)"></esa-text-field></div>';
}
function fCalc(label, id) {
  return '<div class="f-row"><label>'+label+'</label><div class="f-calc" id="calc-'+id+'">—</div></div>';
}
function secOpen(title) { return '<div class="wt-section"><div class="wt-sec-head" onclick="toggleSec(this)">'+title+' <span>&#9660;</span></div><div class="wt-sec-body open">'; }
function secClosed(title) { return '<div class="wt-section"><div class="wt-sec-head" onclick="toggleSec(this)">'+title+' <span>&#9660;</span></div><div class="wt-sec-body">'; }
function secEnd() { return '</div></div>'; }

function buildPCPanelHTML(we) {
  var h='';
  h+=secOpen('Wood Structures');
  h+=fCalc('Total # large logs (>12&quot; dia, 15\' len)','large-logs');
  h+=fCalc('Total # small logs (&lt;12&quot; dia, 15\' len)','small-logs');
  h+='<div style="font-size:10px;color:var(--msow-helper-text,#7a96b0);margin-bottom:6px;font-style:italic">Totals calculated from structures below.</div>';
  h+='<div id="structs-list"></div>';
  h+='<button class="add-entry-btn" onclick="addStructure()">+ Add Structure</button>';
  h+=secEnd();
  h+=secClosed('Channel Habitat Units');
  h+='<div id="chu-panel">';
  h+='<div class="f-row" style="flex-direction:column;align-items:flex-start;gap:6px">';
  h+='<div style="font-size:11px;color:var(--msow-helper-text,#7a96b0);line-height:1.5">Draw perpendicular split lines across the channel to divide it into channel habitat units (CHUs). Units follow a <b>riffle → pool → glide → run</b> sequence — click any unit type button to auto-assign the full sequence. Selecting a unit type on one unit sets all others relative to it.</div>';
  h+='<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:6px;font-size:10px;color:var(--msow-desc-text,#5a7a9a)">';
  h+='<span style="color:#7ab8df">&#9632; Riffle</span><span>— shallow, fast, turbulent water over coarse substrate</span>';
  h+='</div>';
  h+='<div style="display:flex;gap:4px;flex-wrap:wrap;font-size:10px;color:var(--msow-desc-text,#5a7a9a)">';
  h+='<span style="color:#b07bdf">&#9632; Pool</span><span>— deep, slow water; scoured by flow</span>';
  h+='</div>';
  h+='<div style="display:flex;gap:4px;flex-wrap:wrap;font-size:10px;color:var(--msow-desc-text,#5a7a9a)">';
  h+='<span style="color:#5ddba5">&#9632; Glide</span><span>— smooth laminar flow, moderate depth, low gradient</span>';
  h+='</div>';
  h+='<div style="display:flex;gap:4px;flex-wrap:wrap;font-size:10px;color:var(--color-text-muted);margin-bottom:8px">';
  h+='<span style="color:#c07820">&#9632; Run</span><span>— deeper than riffle, faster than glide, no surface turbulence</span>';
  h+='</div>';
  h+='<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">';
  h+='<button class="draw-btn" id="chu-draw-btn" onclick="startCHUSplit()">&#9135; Draw split line</button>';
  h+='<button class="draw-btn" id="chu-undo-btn" onclick="undoCHUSplit()" style="background:transparent;border-color:var(--color-border-strong);color:var(--color-text-secondary)">&#8630; Undo last split</button>';
  h+='<button class="draw-btn" id="chu-reset-btn" onclick="resetCHU()" style="background:transparent;border-color:var(--color-danger,#ef4444);color:var(--color-danger,#ef4444)">&#10005; Reset all</button>';
  h+='</div></div>';
  h+='<div id="chu-units-list" style="margin-top:8px"></div>';
  h+='<div style="margin-top:10px;padding:8px;background:var(--color-primary-subtle);border-radius:4px;font-size:11px;color:var(--color-text-primary)" id="chu-summary"></div>';
  h+='</div>';
  h+=secEnd();
  h+=secClosed('Channel Complexity Metrics');
  h+='<div id="channel-reaches-list"></div>';
  h+='<button class="add-entry-btn" onclick="addChannelReach()">+ Add Reach</button>';
  h+=secEnd();
  return h;
}

function buildFPPanelHTML(we) {
  var h='';
  h+=secOpen('Wood Placement');
  h+=fRow('Floodplain area — large log placement','fp-logs-area','polygon','&#9646; Draw polygon');
  h+=fInput('# Individual large logs placed','fp-large-logs');
  h+='<div id="fp-structs-list"></div>';
  h+='<button class="add-entry-btn" onclick="addFPStructure()">+ Add Structure</button>';
  h+=secEnd();
  h+=secClosed('Connectivity Metrics');
  h+=fRow('Stream miles — improved FP connectivity','fp-conn-reach','line','&#128207; Draw line');
  h+=fRow('Avg floodplain width — meas. 1','fpw1','segment','&#128207; Draw');
  h+=fRow('Avg floodplain width — meas. 2','fpw2','segment','&#128207; Draw');
  h+=fRow('Avg floodplain width — meas. 3','fpw3','segment','&#128207; Draw');
  h+=fCalc('Avg floodplain width (calculated)','fp-width');
  h+=fRow('Left floodplain area','fp-left','polygon','&#9646; Draw polygon');
  h+=fRow('Right floodplain area','fp-right','polygon','&#9646; Draw polygon');
  h+=fRow('Acres of floodplain grading (cut)','fp-grade','polygon','&#9646; Draw polygon');
  h+=fRow('Miles of road removed/setback in FP','fp-road','line','&#128207; Draw line');
  h+=fInput('Volume (CY) road removed','fp-road-vol');
  h+=fRow('Miles of berm/levee removed','fp-berm','line','&#128207; Draw line');
  h+=fInput('Volume (CY) berm/levee removed','fp-berm-vol');
  h+=fRow('Miles of revetment removed','fp-revet','line','&#128207; Draw line');
  h+=fInput('Volume (CY) revetment removed','fp-revet-vol');
  h+=fRow('Acres of mine tailings removal','fp-tailings','polygon','&#9646; Draw polygon');
  h+=fInput('Volume (CY) tailings removed','fp-tailings-vol');
  h+=fRow('Miles perennial side channel constructed','fp-perensc','line','&#128207; Draw line');
  h+=fRow('Miles ephemeral side channel constructed','fp-ephsc','line','&#128207; Draw line');
  h+=fRow('Acres wetland constructed/restored/enhanced','fp-wetland','polygon','&#9646; Draw polygon');
  h+=secEnd();
  return h;
}

function buildRRPanelHTML(we) {
  var h='';
  h+=secOpen('Riparian Protection');
  h+=fRow('Miles of fence installed','rr-fence','line','&#128207; Draw line');
  h+=fRow('Area of FP protected by fence','rr-fence-area','polygon','&#9646; Draw polygon');
  h+=secEnd();
  h+=secClosed('Riparian Planting &amp; Regeneration');
  h+=fInput('# Plants installed','rr-plants');
  h+=fRow('Area FP below bankfull planted','rr-plant-bf','polygon','&#9646; Draw polygon');
  h+=fRow('Area FP above bankfull planted','rr-plant-abf','polygon','&#9646; Draw polygon');
  h+=fRow('Area invasive species removed/treated','rr-invasive','polygon','&#9646; Draw polygon');
  h+=fRow('Bank length with riparian improvement','rr-bank','line','&#128207; Draw line');
  h+=fRow('Total area of riparian improvement','rr-total','polygon','&#9646; Draw polygon');
  h+=secEnd();
  return h;
}

// ── SOW draw ──────────────────────────────────────────────────────────────
function startSOWDraw(id,geo,label) {
  var we=getActiveWE();if(!we)return;
  var owner=sowOwner(we,id);
  if(lineEditing){cancelLineEdit();}
  if(wetlandAutoDetecting){cancelWetlandAutoDetect();}
  if(owner.sowLayers[id]&&owner.sowLayers[id].layer)map.removeLayer(owner.sowLayers[id].layer);
  if(owner.sowLayers[id]&&owner.sowLayers[id]._labelMarker)map.removeLayer(owner.sowLayers[id]._labelMarker);
  // addPCReachArrow() stashes pc-reach's flow-direction markers here — harmless
  // no-op for every other id, which never has them.
  clearFlowArrows(owner.sowLayers[id]);
  sowDrawing={id:id,geo:geo,label:label,weId:activeWEId};
  ppDrawing=null;pendingStructPoint=null;drawPts=[];clearPreview();
  document.getElementById('mapwrap').classList.add('drawing');
  document.querySelectorAll('.draw-btn').forEach(function(b){b.classList.remove('active');});
  var btn=document.getElementById('dbtn-'+id);if(btn)btn.classList.add('active');
  var msg=geo==='polygon'?'Click vertices — double-click to close':geo==='segment'?'Click start then end point':'Click vertices — double-click to finish';
  setMapHint(msg);
}

// The primary channel is a redesign of the same stream as the pre-project reach —
// its flow direction (and therefore its flow arrows) should match, but a hand-drawn
// line's point order only reflects whichever end the user happened to click first.
// Reverse the drawn points if that gives a better endpoint match to the reference
// reach than the as-drawn order does.
function orientPtsLikeReach(pts, refPts) {
  if (!pts || pts.length < 2 || !refPts || refPts.length < 2) return pts;
  var cosLat = Math.cos(refPts[0].lat*Math.PI/180);
  function d2(a,b){ var dlat=a.lat-b.lat, dlng=(a.lng-b.lng)*cosLat; return dlat*dlat+dlng*dlng; }
  var pStart=pts[0], pEnd=pts[pts.length-1], rStart=refPts[0], rEnd=refPts[refPts.length-1];
  var sameOrient = d2(pStart,rStart)+d2(pEnd,rEnd);
  var revOrient  = d2(pStart,rEnd)+d2(pEnd,rStart);
  return revOrient < sameOrient ? pts.slice().reverse() : pts;
}

// "Wetland Enhancement" polygons must represent habitat improved WITHIN existing
// wetland, not just anywhere the user draws — clip the drawn ring against every
// pre-project Existing Wetland Area polygon (there may be several, possibly
// disjoint) and keep only the overlapping piece(s). Reuses the same
// Weiler-Atherton clip already proven out for floodplain/perimeter clipping.
// Returns an array of rings (may be empty if nothing overlapped).
function clipDrawnPolygonToExistingWetlands(we, pts) {
  var wetItems = (we.fpMulti && we.fpMulti['pp_wetland']) || [];
  var pieces = [];
  wetItems.forEach(function(item) {
    var wd = we.sowLayers[item.id];
    if (!wd) return;
    var wetPts = null;
    if (wd.layer) { var ll = wd.layer.getLatLngs(); wetPts = (ll.length && Array.isArray(ll[0])) ? ll[0] : ll; }
    if ((!wetPts || wetPts.length < 3) && wd._pts) wetPts = wd._pts;
    if (!wetPts || wetPts.length < 3) return;
    var clipped = clipConcave(pts, wetPts);
    if (clipped) clipped.forEach(function(piece){ if (piece && piece.length >= 3) pieces.push(piece); });
  });
  return pieces;
}

function finishSOWDraw() {
  if(!sowDrawing)return;
  var d=sowDrawing;
  // Mirror finishPPDraw's vertex-count guard — without it, finishing a draw with too few
  // points (e.g. clicking Done right after starting, or right after a stray reset) falls
  // through to clipPtsToPerimeter with an empty/too-short array and throws.
  if((d.geo==='line'||d.geo==='segment')&&drawPts.length<2)return;
  if(d.geo==='polygon'&&drawPts.length<3)return;
  var we=getWE(sowDrawing.weId);if(!we)return;
  var col=SOW_COLOR[d.geo]||'#1a3a5c';
  // Color primary-channel geometry per channel so multiple channels stay distinguishable
  if (d.id && d.id.substring(0,2)==='pc') col = pcChannelColor(we, we.activePCId);
  // Wetlands get their own dedicated colors (see WETLAND_COLOR) rather than the
  // generic pre-project/habitat-work colors.
  var enhRef = findFPMultiRef(we, d.id);
  if (enhRef && enhRef.key === 'pp_wetland') col = WETLAND_COLOR.existing;
  else if (enhRef && enhRef.key === 'fp_wetland_enhance') col = WETLAND_COLOR.enhance;
  var pts=drawPts.slice();drawPts=[];clearPreview();
  var NO_CLIP_SOW = {pcw1:1,pcw2:1,pcw3:1};
  if(!NO_CLIP_SOW[d.id]) pts=clipPtsToPerimeter(we,pts,d.geo);
  if (!pts) {
    sowDrawing=null;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('That falls entirely outside your project boundary — not saved. Try drawing again inside the boundary.');
    if (we.sowLayers[d.id]) {
      // This was a "redo" of a previously-successful shape — startSOWDraw already
      // removed the old layer/marker from the map in anticipation of a new one, so
      // don't leave stale acreage/length sitting here referring to geometry that's
      // no longer actually on the map.
      delete we.sowLayers[d.id];
    } else if (enhRef) {
      // Brand-new multi-entry item (wetland, road removal, etc.) that never got real
      // geometry — undo the optimistic push from wizardAddFPMultiItem so no permanent
      // "not drawn" phantom row lingers and inflates every later item's number.
      we.fpMulti[enhRef.key] = we.fpMulti[enhRef.key].filter(function(x){ return x.id !== d.id; });
      renumberFPMultiLabels(we, enhRef.key);
    }
    if (wizardMode) wizardRefreshIfActive();
    return;
  }

  // Wetland Enhancement polygons get clipped to existing wetland extent instead of
  // being committed as a plain drawn polygon — handle that here and return early.
  if (enhRef && enhRef.key === 'fp_wetland_enhance' && d.geo === 'polygon') {
    var pieces = clipDrawnPolygonToExistingWetlands(we, pts);
    var totalAcres = 0, totalValueM = 0;
    pieces.forEach(function(p){ totalValueM += geoAreaM2(p); totalAcres += geoArea(p); });
    var enhLayer = pieces.length
      ? L.polygon(pieces.map(function(p){ return [p]; }), {color:col, fillColor:col, fillOpacity:.2, weight:2, interactive:true}).bindTooltip(d.label).addTo(map)
      : null;
    var enhOwner = sowOwner(we, d.id);
    enhOwner.sowLayers[d.id] = {layer:enhLayer, valueM:totalValueM, acres:totalAcres, geo:'polygon', label:d.label, _pts:null, _noOverlap: pieces.length===0};
    if (enhLayer) enhOwner.sowLayers[d.id]._labelMarker = addFPMultiLabelMarker(enhLayer, enhRef.idx + 1, col);
    sowDrawing = null;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint(pieces.length ? '' : 'That area didn\'t overlap any Existing Wetland Area');
    updateSOWCalcs(); renderLegend();
    if (wizardMode) wizardRefreshIfActive();
    return;
  }

  // Secondary channel draw: append to scReaches array and return early
  if (d.id === 'sc-reach-new') {
    if (!we.scReaches) we.scReaches = [];
    var scId = 'scr-'+Date.now();
    var scLayer = L.polyline(pts, {color:SC_COLOR, weight:2.5, interactive:true})
      .bindTooltip('Secondary Channel '+(we.scReaches.length+1)).addTo(map);
    we.scReaches.push({id:scId, layer:scLayer, bufferLayer:null, valueM:geoLen(pts), pts:pts});
    updateSCBuffers(we);
    sowDrawing = null;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('');
    renderLegend();
    if (wizardMode) wizardRefreshIfActive();
    return;
  }
  if (d.id === 'pc-reach') {
    var refReachD = we.ppData['reach_len'];
    if (refReachD && refReachD.layer) {
      var refReachPts = refReachD.layer.getLatLngs();
      if (refReachPts.length && Array.isArray(refReachPts[0])) refReachPts = refReachPts[0];
      pts = orientPtsLikeReach(pts, refReachPts);
    }
  }
  var layer,valueM=0,acres=0;
  var NO_DISPLAY_IDS = {pcw1:1,pcw2:1,pcw3:1};
  // Disambiguate tooltips when a work element has more than one primary channel
  var tipLabel = d.label;
  if (d.id && d.id.substring(0,2)==='pc' && we.primaryChannels.length > 1) {
    tipLabel = d.label + ' (' + getActivePC(we).name + ')';
  }
  if(d.geo==='segment'||d.geo==='line'){
    if(NO_DISPLAY_IDS[d.id]){
      layer=null; // store geometry but don't add to map
    } else {
      layer=L.polyline(pts,{color:col,weight:2.5,interactive:true}).bindTooltip(tipLabel).addTo(map);
    }
    valueM=geoLen(pts);
  }
  else{layer=L.polygon(pts,{color:col,fillColor:col,fillOpacity:.2,weight:2,interactive:true}).bindTooltip(tipLabel).addTo(map);acres=geoArea(pts);valueM=geoAreaM2(pts);}
  var owner=sowOwner(we,d.id);
  owner.sowLayers[d.id]={layer:layer,valueM:valueM,acres:acres,geo:d.geo,label:d.label,_pts:NO_DISPLAY_IDS[d.id]?pts:null};
  // Multi-entry FP items (grading/road/berm/revetment/tailings/wetland) get a numbered
  // map label so the list row and the drawn feature are identifiable at a glance.
  var fpRef = findFPMultiRef(we, d.id);
  if (fpRef && layer) {
    owner.sowLayers[d.id]._labelMarker = addFPMultiLabelMarker(layer, fpRef.idx + 1, col);
  }
  var el=document.getElementById('dr-'+d.id);
  if(el){
    var val=d.geo==='polygon'?acres.toFixed(2)+' acres':Math.round(valueM*3.28084).toLocaleString()+' ft';
    var editLink=(d.geo==='line'||d.geo==='segment')?'<span class="drawn-redo" onclick="startLineEdit(\'sow\',\''+d.id+'\')">edit</span> ':'';
    el.innerHTML='<span class="drawn-result">&#10003; '+val+'</span> '+editLink+'<span class="drawn-redo" onclick="startSOWDraw(\''+d.id+'\',\''+d.geo+'\',\''+d.label+'\')">redo</span>';
  }
  var btn=document.getElementById('dbtn-'+d.id);if(btn)btn.classList.remove('active');
  sowDrawing=null;document.getElementById('mapwrap').classList.remove('drawing');setMapHint('');
  updateSOWCalcs();renderLegend();
  if(d.id==='pc-reach') { addPCReachArrow(getWE(d.weId)); updatePCBuffer(getWE(d.weId)); setTimeout(function(){ fetchSOWElevationProfile(getWE(d.weId)); }, 300); }
  if (wizardMode) wizardRefreshIfActive();
}

// Seeds the primary (designed) channel's centerline from the pre-project reach, for
// projects where the design follows the existing alignment — same storage shape and
// post-draw hooks as finishSOWDraw()'s 'pc-reach' branch (lines above), just skipping
// the manual draw since the geometry already exists on the map.
function copyPPReachToPrimaryChannel() {
  var we = getActiveWE(); if (!we) return;
  var refReachD = we.ppData['reach_len'];
  if (!refReachD || !refReachD.layer) return;
  var pts = refReachD.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  pts = pts.map(function(ll){ return L.latLng(ll.lat, ll.lng); }); // copy points, not a live reference to the pp layer
  var pc = getActivePC(we);
  if (pc.sowLayers['pc-reach'] && pc.sowLayers['pc-reach'].layer) map.removeLayer(pc.sowLayers['pc-reach'].layer);
  var col = pcChannelColor(we, we.activePCId);
  var layer = L.polyline(pts, {color:col, weight:2.5, interactive:true}).bindTooltip('Primary Channel').addTo(map);
  pc.sowLayers['pc-reach'] = {layer:layer, valueM:geoLen(pts), acres:0, geo:'line', label:'Primary Channel', _pts:null};
  addPCReachArrow(we);
  updatePCBuffer(we);
  setTimeout(function(){ fetchSOWElevationProfile(we); }, 300);
  if (wizardMode) wizardRefreshIfActive();
}

// Build / rebuild the primary channel area buffer polygon.
// Works without the expert-panel DOM — called from setPCWidth and when pc-reach is drawn.
function updatePCBuffer(we) {
  if (!we) return;
  var reachSL = getActivePC(we).sowLayers['pc-reach'];
  if (!reachSL || !reachSL.layer) return;
  // Width priority: manually entered ft → measured pcw1/2/3 average
  var halfWM = 0;
  if (getActivePC(we).inputVals['pc-width'] > 0) {
    halfWM = (getActivePC(we).inputVals['pc-width'] / 3.28084) / 2;
  } else {
    var measW = avgWidths(we, ['pcw1','pcw2','pcw3']);
    if (measW) halfWM = measW / 2;
  }
  if (!halfWM) return;
  var pts = reachSL.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  pts = extendReachPts(pts);
  var ring = buildBufferPoly(pts, halfWM);
  if (!ring) return;
  // Remove old auto layer
  var old = getActivePC(we).sowLayers['pc-area'];
  if (old && old._auto && old.layer) { map.removeLayer(old.layer); }
  var areaCol = pcChannelColor(we, we.activePCId);
  var areaTip = we.primaryChannels.length > 1 ? 'Area of Restored Channel (estimated) — '+getActivePC(we).name : 'Area of Restored Channel (estimated)';
  var bufLayer = L.polygon(ring, {
    color:areaCol, fillColor:areaCol, fillOpacity:0.15,
    weight:2, dashArray:'6,4', interactive:true
  }).bindTooltip(areaTip).addTo(map);
  var areaM2 = geoAreaM2(ring);
  getActivePC(we).sowLayers['pc-area'] = {layer:bufLayer, valueM:areaM2, acres:areaM2*0.000247105, geo:'polygon', label:'Area of Restored Channel', _auto:true};
  renderLegend();
  addPCReachArrow(we); // channel width just changed — re-fan flow arrows if now wide enough
}

function setPCWidth(val) {
  var we = getActiveWE(); if (!we) return;
  if (!we.inputVals) we.inputVals = {};
  var n = parseFloat(val);
  getActivePC(we).inputVals['pc-width'] = (n > 0) ? n : null;
  updatePCBuffer(we);
  updateSOWCalcs();
  if (wizardMode) wizardRefreshIfActive();
}

function updateSOWCalcs() {
  var we=getActiveWE();if(!we)return;
  // Use measured cross-sections if available; otherwise fall back to manually entered width
  var avgW=avgWidths(we,['pcw1','pcw2','pcw3']);
  if(!avgW && getActivePC(we).inputVals['pc-width']) avgW = getActivePC(we).inputVals['pc-width'] / 3.28084;
  var cw=document.getElementById('calc-pc-width');if(cw)cw.textContent=avgW?Math.round(avgW)+' ft':'—';
  var pcwAvg=document.getElementById('pcw-avg');
  if(pcwAvg)pcwAvg.textContent=avgW?'Avg: '+Math.round(avgW)+' ft':'';
  // Valley length = straight-line distance between pc-reach endpoints
  var rl = getActivePC(we).sowLayers['pc-reach'] ? getActivePC(we).sowLayers['pc-reach'].valueM : 0;
  var vlM = 0;
  var reachLayer = getActivePC(we).sowLayers['pc-reach'] && getActivePC(we).sowLayers['pc-reach'].layer;
  if (reachLayer) {
    var rPts = reachLayer.getLatLngs();
    if (rPts.length && Array.isArray(rPts[0])) rPts = rPts[0];
    if (rPts && rPts.length >= 2) {
      var toRad2 = function(d){ return d*Math.PI/180; };
      var R2=6378137, p1=rPts[0], p2=rPts[rPts.length-1];
      var dLat2=toRad2(p2.lat-p1.lat), dLng2=toRad2(p2.lng-p1.lng);
      var a2=Math.sin(dLat2/2)*Math.sin(dLat2/2)+Math.cos(toRad2(p1.lat))*Math.cos(toRad2(p2.lat))*Math.sin(dLng2/2)*Math.sin(dLng2/2);
      vlM = R2*2*Math.atan2(Math.sqrt(a2),Math.sqrt(1-a2));
    }
  }
  var vl = vlM ? Math.round(vlM*3.28084).toLocaleString()+' ft' : '—';
  var cv=document.getElementById('calc-pc-valley');if(cv)cv.textContent=vl;
  var cs=document.getElementById('calc-pc-sinuosity');if(cs)cs.textContent=(rl&&vlM)?(rl/vlM).toFixed(2):'—';
  // ── Area of Restored Channel: auto-buffer from reach + avg channel width ──
  var pcAreaWrap = document.getElementById('dr-pc-area-wrap');
  if (pcAreaWrap) {
    var sl = getActivePC(we).sowLayers['pc-area'];
    var reachSL = getActivePC(we).sowLayers['pc-reach'];
    var avgW = avgWidths(we, ['pcw1','pcw2','pcw3']);

    if (sl && sl.layer && !sl._auto) {
      // User has drawn/edited manually
      var acresSL = (sl.valueM || sl.acres || 0);
      var displayAc = typeof acresSL === 'number' && acresSL > 0
        ? (acresSL < 10 ? acresSL.toFixed(3) : acresSL.toFixed(2)) + ' acres'
        : '—';
      pcAreaWrap.innerHTML =
        '<span class="drawn-result">~ '+displayAc+'</span> from reach × avg channel width ' +
        '<span class="drawn-redo" onclick="startSOWDraw(\'pc-area\',\'polygon\',\'Area of Restored Channel\')">draw from scratch</span>';
    } else if (reachSL && reachSL.layer && avgW) {
      // Remove stale auto layer if it exists
      if (sl && sl._auto && sl.layer) { map.removeLayer(sl.layer); getActivePC(we).sowLayers['pc-area'] = null; sl = null; }
      // Auto-generate buffer
      var reachPts = reachSL.layer.getLatLngs();
      if (reachPts.length && Array.isArray(reachPts[0])) reachPts = reachPts[0];
      var halfW = (avgW / 3.28084) / 2;
      var ring = buildBufferPoly(reachPts, halfW);
      if (ring) {
        // Remove old auto layer if exists
        if (getActivePC(we)._pcAreaAutoLayer) { map.removeLayer(getActivePC(we)._pcAreaAutoLayer); }
        var autoAreaCol = pcChannelColor(we, we.activePCId);
        var autoAreaTip = we.primaryChannels.length > 1 ? 'Area of Restored Channel (estimated) — '+getActivePC(we).name : 'Area of Restored Channel (estimated)';
        var bufLayer = L.polygon(ring, {
          color: autoAreaCol, fillColor: autoAreaCol, fillOpacity: 0.15,
          weight: 2, dashArray: '6,4', interactive: true
        }).bindTooltip(autoAreaTip).addTo(map);
        getActivePC(we)._pcAreaAutoLayer = bufLayer;
        var areaM2 = geoAreaM2(ring);
        var acresAuto = (areaM2 * 0.000247105).toFixed(3);
        getActivePC(we).sowLayers['pc-area'] = {layer: bufLayer, valueM: areaM2 * 0.000247105, acres: parseFloat(acresAuto), geo: 'polygon', label: 'Area of Restored Channel', _auto: true};
        pcAreaWrap.innerHTML =
          '<span class="drawn-result">~ '+acresAuto+' acres</span> <span style="font-size:10px;color:var(--msow-desc-text,#5a7a9a)">(estimated)</span> ' +
          '<span class="drawn-redo" onclick="startPolyEditSOW(\'pc-area\')">edit</span> ' +
          '<span class="drawn-redo" onclick="startSOWDraw(\'pc-area\',\'polygon\',\'Area of Restored Channel\')">draw from scratch</span>';
      }
    } else {
      pcAreaWrap.innerHTML =
        '<span class="pm-waiting" style="font-size:10px">Auto-calculates from reach × avg channel width — draw the reach and measure widths first</span>' +
        ' <span class="drawn-redo" onclick="startSOWDraw(\'pc-area\',\'polygon\',\'Area of Restored Channel\')">draw manually</span>';
    }
  }
  var avgFW=avgWidths(we,['fpw1','fpw2','fpw3']);
  var cf=document.getElementById('calc-fp-width');if(cf)cf.textContent=avgFW?Math.round(avgFW)+' ft':'—';

  // ── Channel excavation volume — pcExcavationCY() is the pure calculation;
  // this just caches the result on inputVals for openSOW()'s per-PC export loop
  // (which iterates every primary channel, not just the active one — see the
  // comment on pcExcavationCY) and refreshes the retired Expert view's DOM node.
  var excavCY = pcExcavationCY(we);
  getActivePC(we).inputVals['pc-excavation-vol'] = excavCY;
  var ce = document.getElementById('calc-pc-excav');
  if (ce) ce.textContent = excavCY !== null ? excavCY.toLocaleString() + ' CY' : (getActivePC(we).sowLayers['pc-reach'] && pcChannelWidthFt(we) ? 'Enter bank height to calculate' : '—');
  var cl=document.getElementById('calc-large-logs');var cs2=document.getElementById('calc-small-logs');
  if(cl||cs2)updateLogTotals();
}

function startPolyEditSOW(id) {
  var we = getActiveWE(); if (!we) return;
  var sl = sowOwner(we,id).sowLayers[id]; if (!sl || !sl.layer) return;
  startLineEdit('sow', id);
}

function avgWidths(we,ids) {
  var vals=ids.map(function(id){var sl=sowOwner(we,id).sowLayers[id];return sl?sl.valueM*3.28084:null;}).filter(function(v){return v!==null;});
  return vals.length?vals.reduce(function(a,b){return a+b;},0)/vals.length:null;
}

// FP connectivity reach & floodplain width are derived from the already-drawn Secondary
// Channels rather than requiring a separate manual draw.
function scConnectivityMiles(we) {
  // A secondary channel reach IS a reconnected reach — sum their lengths.
  var reaches = (we && we.scReaches || []).filter(function(r){ return r.valueM; });
  if (!reaches.length) return null;
  return reaches.reduce(function(a,r){ return a+r.valueM; }, 0) * 0.000621371;
}
function scAvgWidthFt(we) {
  // "Floodplain width" is the width of the floodplain corridor itself (fp_poly, drawn in
  // pre-project), not a secondary channel's own (much narrower) channel width — measure the
  // floodplain's cross-sectional width perpendicular to each secondary channel reach and average.
  if (!we) return null;
  var fpD = we.ppData['fp_poly'];
  var fpPts = null;
  if (fpD) {
    if (fpD.layer) { var ll = fpD.layer.getLatLngs(); fpPts = (ll.length && Array.isArray(ll[0])) ? ll[0] : ll; }
    if ((!fpPts || fpPts.length < 3) && fpD._pts) fpPts = fpD._pts;
  }
  if (!fpPts || fpPts.length < 3) return null;
  var widths = (we.scReaches || []).map(function(r){
    if (!r.layer) return null;
    var wM = calcCrossWidthCore(r.layer, fpPts, 0.5);
    return wM ? wM * 3.28084 : null;
  }).filter(function(v){ return v !== null; });
  return widths.length ? widths.reduce(function(a,b){return a+b;},0)/widths.length : null;
}

// fp_grading/fp_road/fp_berm/fp_revetment/fp_tailings/fp_wetland store N drawn
// instances in we.fpMulti[key] (each keying its geometry into we.sowLayers).
function fpMultiHasAny(we, key) {
  var items = we.fpMulti && we.fpMulti[key];
  if (!items || !items.length) return false;
  return items.some(function(item){ var d = we.sowLayers[item.id]; return d && d.valueM; });
}
function fpMultiSum(we, key) {
  var items = (we.fpMulti && we.fpMulti[key]) || [];
  var valueM = 0, acres = 0, vol = 0, hasVol = false;
  items.forEach(function(item) {
    var d = we.sowLayers[item.id];
    if (d && d.valueM) { valueM += d.valueM; acres += (d.acres||0); }
    if (item.vol !== '' && item.vol !== undefined && item.vol !== null) { vol += (parseFloat(item.vol)||0); hasVol = true; }
  });
  return {valueM: valueM, acres: acres, vol: vol, hasVol: hasVol, count: items.length};
}

// Which we.fpMulti[key] array (if any) a sowLayers id belongs to, and at what index.
function findFPMultiRef(we, id) {
  if (!we.fpMulti) return null;
  var keys = Object.keys(we.fpMulti);
  for (var i = 0; i < keys.length; i++) {
    var items = we.fpMulti[keys[i]];
    for (var j = 0; j < items.length; j++) {
      if (items[j].id === id) return {key: keys[i], idx: j, item: items[j]};
    }
  }
  return null;
}

function fpMultiLabelIcon(num, color) {
  return L.divIcon({
    className: '', iconSize: [18,18], iconAnchor: [9,9],
    html: '<div style="width:18px;height:18px;border-radius:50%;background:'+color+';border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;">'+num+'</div>'
  });
}

// Small numbered badge dropped at a drawn line/polygon's midpoint so a multi-entry
// step's map features stay identifiable against their list rows.
function addFPMultiLabelMarker(layer, num, color) {
  var pos = layer.getCenter ? layer.getCenter() : (layer.getBounds && layer.getBounds().isValid() ? layer.getBounds().getCenter() : null);
  if (!pos) return null;
  var m = L.marker(pos, {icon: fpMultiLabelIcon(num, color), interactive:false}).addTo(map);
  m._fpLabelColor = color;
  return m;
}

// Deleting an item shifts everyone after it down one — keep map badges matching.
function renumberFPMultiLabels(we, key) {
  var items = (we.fpMulti && we.fpMulti[key]) || [];
  items.forEach(function(item, i) {
    var sl = we.sowLayers[item.id];
    if (!sl) return;
    if (sl._labelMarker) {
      sl._labelMarker.setIcon(fpMultiLabelIcon(i + 1, sl._labelMarker._fpLabelColor));
    }
    // The layer's own hover tooltip and stored label were baked in with whatever number
    // the item had at draw time — regenerate both so hovering the shape doesn't show a
    // stale number once items get deleted/reordered.
    var base = (sl.label || '').replace(/\s+\d+$/, '');
    if (base) {
      var newLabel = base + ' ' + (i + 1);
      sl.label = newLabel;
      if (sl.layer && sl.layer.setTooltipContent) sl.layer.setTooltipContent(newLabel);
    }
  });
}

// ── SOW highlight/zoom ────────────────────────────────────────────────────
// Flattens we.sowLayers plus every primary channel's own sowLayers, since pc-*
// layers now live per-channel rather than directly on the work element.
function highlightSOW(id) {
  var we=getActiveWE();if(!we)return;
  function apply(dict){
    Object.keys(dict).forEach(function(k){var l=dict[k];if(!l||!l.layer||!l.layer.setStyle)return;var active=k===id;if(l.geo==='polygon')l.layer.setStyle({weight:active?3:1,fillOpacity:active?.4:.2,opacity:active?1:.3});else l.layer.setStyle({weight:active?4:1.5,opacity:active?1:.3});});
  }
  apply(we.sowLayers);
  (we.primaryChannels||[]).forEach(function(pc){ apply(pc.sowLayers); });
}
function unhighlightSOW() {
  var we=getActiveWE();if(!we)return;
  function apply(dict){
    Object.keys(dict).forEach(function(k){var l=dict[k];if(!l||!l.layer||!l.layer.setStyle)return;if(l.geo==='polygon')l.layer.setStyle({weight:2,fillOpacity:.2,opacity:1});else l.layer.setStyle({weight:2.5,opacity:1});});
  }
  apply(we.sowLayers);
  (we.primaryChannels||[]).forEach(function(pc){ apply(pc.sowLayers); });
}
function zoomToSOW(id) {
  var we=getActiveWE();if(!we)return;var l=sowOwner(we,id).sowLayers[id];if(!l||!l.layer)return;
  try{var b=l.layer.getBounds?l.layer.getBounds():null;if(b&&b.isValid())map.fitBounds(b,{padding:[50,50]});}catch(e){}
}

// ── Structures ────────────────────────────────────────────────────────────
// we.structures/we.structs hold only floodplain/side-channel types (fps/scs);
// primary-channel types (cms/mcs/css) live on the active primary channel instead.
function structOwner(we, type) {
  return (type === 'fps' || type === 'scs') ? we : getActivePC(we);
}
function globalStructNum(we, type, id) {
  var owner = structOwner(we, type);
  if (!owner.structs) return 1;
  for (var i = 0; i < owner.structs.length; i++) {
    if (owner.structs[i].id === id) return i + 1;
  }
  return 1;
}

// Generate a default description for a new structure: "Mid Channel 1", "Mid Channel 2", etc.
// Call BEFORE pushing the structure onto the array so the count is correct.
function structDefaultDesc(we, type) {
  var existing = (structOwner(we,type).structures[type] || []).length;
  return (STRUCT_LABEL[type] || type) + ' ' + (existing + 1);
}

function addStructure(type, label) {
  var we = getActiveWE(); if (!we) return;
  // Primary channel structures use the flat structs path on the active channel
  var pc = getActivePC(we);
  if (!pc.structs) pc.structs = [];
  var structType = type || 'cms';
  var s = {id:'s-'+Date.now(), structType:structType, desc:structDefaultDesc(we, structType), large:0, small:0, latlng:null, marker:null};
  pc.structs.push(s);
  pc.structures[structType].push(s);
  renderAllStructures();
}

function addFPStructure() {
  var we = getActiveWE(); if (!we) return;
  var s = {id:'s-'+Date.now(), structType:'fps', desc:structDefaultDesc(we, 'fps'), large:0, small:0, latlng:null, marker:null};
  we.structures['fps'].push(s);
  if (!we.fpStructs) we.fpStructs = [];
  we.fpStructs.push(s);
  renderFPStructures();
}

function renderFPStructures() {
  var el = document.getElementById('fp-structs-list'); if (!el) return;
  var we = getActiveWE(); if (!we) return;
  el.innerHTML = '';

  // Use insertion-ordered flat array if available, otherwise reconstruct from fps+scs
  if (!we.fpStructs) {
    we.fpStructs = [];
    ['fps','scs'].forEach(function(t){
      we.structures[t].forEach(function(s){ we.fpStructs.push(s); });
    });
  }

  we.fpStructs.forEach(function(s, i) {
    var type = s.structType || 'fps';
    var col = STRUCT_COLOR[type] || '#2a7a5c';
    var isWaiting = pendingStructPoint && pendingStructPoint.id === s.id;
    var locHTML = s.latlng
      ? '<span class="drawn-result">&#10003; '+s.latlng.lat.toFixed(4)+', '+s.latlng.lng.toFixed(4)+'</span><span class="drawn-redo" onclick="replaceStructPoint(\''+type+'\',\''+s.id+'\')">redo</span>'
      : '<button class="draw-btn'+(isWaiting?' active':'')+'" style="background:'+(isWaiting?'#c07820':col)+';margin-bottom:0" onclick="startStructPoint(\''+type+'\',\''+s.id+'\')">&#9679; Place on map</button>';
    var typeSelect = '<esa-select class="struct-type-sel" size="sm" onchange="changeFPStructType(\''+s.id+'\',this.value)"></esa-select>';
    var div = document.createElement('div');
    div.className = 'multi-entry';
    div.innerHTML = '<div class="multi-entry-head">Structure '+(i+1)
      + '<span style="display:flex;gap:6px;align-items:center">'
      + '<span class="multi-entry-clone" title="Clone" onclick="cloneFPStructure(\''+s.id+'\')">&#10064;</span>'
      + '<span class="multi-entry-del" onclick="delFPStructure(\''+s.id+'\')">&#10005;</span>'
      + '</span></div>'
      + '<div class="f-row"><label>Structure type</label>'+typeSelect+'</div>'
      + '<div class="f-row"><label>Location</label>'+locHTML+'</div>'
      + '<div class="f-row"><esa-text-field label="Description" value="'+s.desc+'" placeholder="e.g. Engineered log jam" size="sm" onchange="updateFPStructure(\''+s.id+'\',\'desc\',this.value)"></esa-text-field></div>'
      + '<div class="f-row"><label># Large pieces (&gt;12&quot; dia)</label><input type="number" value="'+s.large+'" placeholder="0" oninput="updateFPStructure(\''+s.id+'\',\'large\',+this.value)"/></div>'
      + '<div class="f-row"><label># Small pieces (&lt;12&quot; dia)</label><input type="number" value="'+s.small+'" placeholder="0" oninput="updateFPStructure(\''+s.id+'\',\'small\',+this.value)"/></div>';
    el.appendChild(div);
    var fpTypeSel = div.querySelector('esa-select.struct-type-sel');
    fpTypeSel.options = [{label:'Floodplain Structure', value:'fps'}, {label:'Side Channel Structure', value:'scs'}];
    fpTypeSel.value = type;
  });
  updateLogTotals();
}

function changeFPStructType(id, newType) {
  var we = getActiveWE(); if (!we) return;
  var oldType = null, s = null;
  ['fps','scs'].forEach(function(t){
    var found = we.structures[t].filter(function(x){return x.id===id;})[0];
    if (found) { s = found; oldType = t; }
  });
  if (!s || oldType === newType) return;
  // Move between typed arrays
  we.structures[oldType] = we.structures[oldType].filter(function(x){return x.id!==id;});
  s.desc = structDefaultDesc(we, newType);
  s.structType = newType;
  we.structures[newType].push(s);
  // fpStructs keeps the same object reference — just update structType on s (already done)
  if (s.marker) {
    s.marker.setStyle({color: STRUCT_COLOR[newType]||'#2a7a5c', fillColor: STRUCT_COLOR[newType]||'#2a7a5c'});
  }
  renderFPStructures();
  if (wizardMode) wizardRefreshIfActive();
}

function updateFPStructure(id, field, val) {
  var we = getActiveWE(); if (!we) return;
  ['fps','scs'].forEach(function(t){
    var s = we.structures[t].filter(function(x){return x.id===id;})[0];
    if (s) {
      s[field] = val;
      if (field === 'desc' && s.marker && we.fpStructs) {
        var num = we.fpStructs.indexOf(s) + 1;
        s.marker.setTooltipContent(STRUCT_LABEL[s.structType]+' '+num+(val?' – '+val:''));
      }
    }
  });
  updateLogTotals();
}

function delFPStructure(id) {
  var we = getActiveWE(); if (!we) return;
  ['fps','scs'].forEach(function(t){
    var s = we.structures[t].filter(function(x){return x.id===id;})[0];
    if (s && s.marker) map.removeLayer(s.marker);
    we.structures[t] = we.structures[t].filter(function(x){return x.id!==id;});
  });
  if (we.fpStructs) we.fpStructs = we.fpStructs.filter(function(x){return x.id!==id;});
  if (pendingStructPoint && pendingStructPoint.id === id) {
    pendingStructPoint = null;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('');
  }
  renderFPStructures();
}

function cloneFPStructure(id) {
  var we = getActiveWE(); if (!we) return;
  var orig = null;
  ['fps','scs'].forEach(function(t){
    var found = we.structures[t].filter(function(x){return x.id===id;})[0];
    if (found) orig = found;
  });
  if (!orig) return;
  var clone = {id:'s-'+Date.now(), structType:orig.structType, desc:orig.desc, large:orig.large, small:orig.small, latlng:null, marker:null};
  we.structures[clone.structType].push(clone);
  if (!we.fpStructs) we.fpStructs = [];
  we.fpStructs.push(clone);
  renderFPStructures();
  startStructPoint(clone.structType, clone.id);
}

function renderAllStructures() {
  var el = document.getElementById('structs-list');
  if (!el) {
    // fallback for old per-type lists
    ['cms','mcs','css'].forEach(function(t){ renderStructures(t); });
    return;
  }
  var we = getActiveWE(); if (!we) return;
  var pc = getActivePC(we);
  if (!pc.structs) pc.structs = [];
  el.innerHTML = '';
  pc.structs.forEach(function(s, i) {
    var type = s.structType || 'cms';
    var col = STRUCT_COLOR[type];
    var isWaiting = pendingStructPoint && pendingStructPoint.id === s.id;
    var locHTML = s.latlng
      ? '<span class="drawn-result">&#10003; '+s.latlng.lat.toFixed(4)+', '+s.latlng.lng.toFixed(4)+'</span><span class="drawn-redo" onclick="replaceStructPoint(\''+type+'\',\''+s.id+'\')">redo</span>'
      : '<button class="draw-btn'+(isWaiting?' active':'')+'" style="background:'+(isWaiting?'#c07820':col)+';margin-bottom:0" onclick="startStructPoint(\''+type+'\',\''+s.id+'\')">&#9679; Place on map</button>';
    var typeSelect = '<esa-select class="struct-type-sel" size="sm" onchange="changeStructType(null,\''+s.id+'\',this.value)"></esa-select>';
    var div = document.createElement('div');
    div.className = 'multi-entry';
    div.innerHTML = '<div class="multi-entry-head">Structure '+(i+1)
      + '<span style="display:flex;gap:6px;align-items:center">'
      + '<span class="multi-entry-clone" title="Clone" onclick="cloneStructure(\''+type+'\',\''+s.id+'\')">&#10064;</span>'
      + '<span class="multi-entry-del" onclick="delStructFlat(\''+s.id+'\')">&#10005;</span>'
      + '</span></div>'
      + '<div class="f-row"><label>Structure type</label>'+typeSelect+'</div>'
      + '<div class="f-row"><label>Location</label>'+locHTML+'</div>'
      + '<div class="f-row"><esa-text-field label="Description" value="'+s.desc+'" placeholder="e.g. Single-key LWD jam" size="sm" onchange="updateStructFlat(\''+s.id+'\',\'desc\',this.value)"></esa-text-field></div>'
      + '<div class="f-row"><label># Large pieces (&gt;12&quot; dia)</label><input type="number" value="'+s.large+'" placeholder="0" oninput="updateStructFlat(\''+s.id+'\',\'large\',+this.value)"/></div>'
      + '<div class="f-row"><label># Small pieces (&lt;12&quot; dia)</label><input type="number" value="'+s.small+'" placeholder="0" oninput="updateStructFlat(\''+s.id+'\',\'small\',+this.value)"/></div>';
    el.appendChild(div);
    var typeSel = div.querySelector('esa-select.struct-type-sel');
    typeSel.options = [{label:'Channel Margin', value:'cms'}, {label:'Mid Channel', value:'mcs'}, {label:'Channel Spanning', value:'css'}];
    typeSel.value = type;
  });
  updateLogTotals();
}

function updateStructFlat(id, field, val) {
  var we = getActiveWE(); if (!we) return;
  var pc = getActivePC(we); if (!pc.structs) return;
  var s = pc.structs.filter(function(x){return x.id===id;})[0]; if (!s) return;
  s[field] = val;
  if (field === 'desc' && s.marker) {
    var num = pc.structs.indexOf(s) + 1;
    s.marker.setTooltipContent(STRUCT_LABEL[s.structType||'cms']+' '+num+(val?' – '+val:''));
  }
  updateLogTotals();
}

function delStructFlat(id) {
  var we = getActiveWE(); if (!we) return;
  var pc = getActivePC(we); if (!pc.structs) return;
  var s = pc.structs.filter(function(x){return x.id===id;})[0]; if (!s) return;
  if (s.marker) map.removeLayer(s.marker);
  pc.structs = pc.structs.filter(function(x){return x.id!==id;});
  // sync legacy arrays
  ['cms','mcs','css'].forEach(function(t){
    pc.structures[t] = pc.structures[t].filter(function(x){return x.id!==id;});
  });
  renderAllStructures();
}

function changeStructType(oldType, id, newType) {
  var we = getActiveWE(); if (!we) return;
  var pc = getActivePC(we);
  // Find in flat array
  var s = pc.structs && pc.structs.filter(function(x){return x.id===id;})[0];
  if (!s) {
    // fallback: find in typed array
    if (oldType) s = pc.structures[oldType].filter(function(x){return x.id===id;})[0];
  }
  if (!s) return;
  var prevType = s.structType || oldType || 'cms';
  // Set new desc before updating tooltip and syncing arrays
  s.desc = structDefaultDesc(we, newType);
  // Update marker color and tooltip with new desc
  if (s.marker) {
    var col = STRUCT_COLOR[newType];
    var num = pc.structs ? pc.structs.indexOf(s) + 1 : 1;
    var icon = L.divIcon({className:'',iconSize:[20,20],iconAnchor:[10,10],
      html:'<div style="width:20px;height:20px;border-radius:50%;background:'+col+';border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;">'+num+'</div>'});
    s.marker.setIcon(icon);
    s.marker.setTooltipContent(STRUCT_LABEL[newType]+' '+num+(s.desc?' – '+s.desc:''));
  }
  s.structType = newType;
  // Sync legacy arrays
  pc.structures[prevType] = (pc.structures[prevType]||[]).filter(function(x){return x.id!==id;});
  if (!pc.structures[newType]) pc.structures[newType] = [];
  if (!pc.structures[newType].some(function(x){return x.id===id;})) pc.structures[newType].push(s);
  renderAllStructures();
  updateLogTotals();
  if (wizardMode) wizardRefreshIfActive();
}

function renderStructures(type) {
  var el=document.getElementById(type+'-list');if(!el)return;
  var we=getActiveWE();if(!we)return;
  var pc=getActivePC(we);
  el.innerHTML='';
  var col=STRUCT_COLOR[type];

  // Count total structures across all types for sequential numbering
  var allStructs = [];
  ['cms','mcs','css'].forEach(function(t){
    pc.structures[t].forEach(function(s){ allStructs.push({type:t, s:s}); });
  });

  pc.structures[type].forEach(function(s, i){
    var globalNum = allStructs.findIndex ? allStructs.findIndex(function(x){return x.s.id===s.id;}) + 1 : i + 1;
    if (globalNum === 0) globalNum = i + 1; // fallback
    var div=document.createElement('div');div.className='multi-entry';
    var isWaiting=pendingStructPoint&&pendingStructPoint.type===type&&pendingStructPoint.id===s.id;
    var locHTML=s.latlng?'<span class="drawn-result">&#10003; '+s.latlng.lat.toFixed(4)+', '+s.latlng.lng.toFixed(4)+'</span><span class="drawn-redo" onclick="replaceStructPoint(\''+type+'\',\''+s.id+'\')">redo</span>':'<button class="draw-btn'+(isWaiting?' active':'')+'" style="background:'+(isWaiting?'#c07820':col)+';margin-bottom:0" onclick="startStructPoint(\''+type+'\',\''+s.id+'\')">&#9679; Place on map</button>';
    var typeSelect = '<esa-select class="struct-type-sel" size="sm" onchange="changeStructType(\''+type+'\',\''+s.id+'\',this.value)"></esa-select>';
    div.innerHTML='<div class="multi-entry-head">Structure '+globalNum+'<span style="display:flex;gap:6px;align-items:center"><span class="multi-entry-clone" title="Clone" onclick="cloneStructure(\''+type+'\',\''+s.id+'\')">&#10064;</span><span class="multi-entry-del" onclick="delStructure(\''+type+'\',\''+s.id+'\')">&#10005;</span></span></div>'+
      '<div class="f-row"><label>Structure type</label>'+typeSelect+'</div>'+
      '<div class="f-row"><label>Location</label>'+locHTML+'</div>'+
      '<div class="f-row"><esa-text-field label="Description" value="'+s.desc+'" placeholder="e.g. Single-key LWD jam" size="sm" onchange="updateStructure(\''+type+'\',\''+s.id+'\',\'desc\',this.value)"></esa-text-field></div>'+
      '<div class="f-row"><label># Large pieces (&gt;12&quot; dia)</label><input type="number" value="'+s.large+'" placeholder="0" oninput="updateStructure(\''+type+'\',\''+s.id+'\',\'large\',+this.value)"/></div>'+
      '<div class="f-row"><label># Small pieces (&lt;12&quot; dia)</label><input type="number" value="'+s.small+'" placeholder="0" oninput="updateStructure(\''+type+'\',\''+s.id+'\',\'small\',+this.value)"/></div>';
    el.appendChild(div);
    var typeSel2 = div.querySelector('esa-select.struct-type-sel');
    typeSel2.options = [{label:'Channel Margin', value:'cms'}, {label:'Mid Channel', value:'mcs'}, {label:'Channel Spanning', value:'css'}];
    typeSel2.value = type;
  });
  updateLogTotals();
}

function updateStructure(type,id,field,val) {
  var we=getActiveWE();if(!we)return;
  var pc=getActivePC(we);
  var s=(pc.structs&&pc.structs.filter(function(x){return x.id===id;})[0])||pc.structures[type].filter(function(x){return x.id===id;})[0];if(!s)return;
  s[field]=val;
  if(field==='desc'&&s.marker){
    var t2=s.structType||type;
    var num2=(pc.structs&&pc.structs.indexOf(s)>=0)?pc.structs.indexOf(s)+1:globalStructNum(we,t2,id);
    s.marker.setTooltipContent(STRUCT_LABEL[t2]+' '+num2+(val?' – '+val:''));
  }
  updateLogTotals();
}

function cloneStructure(type,id) {
  var we=getActiveWE();if(!we)return;
  var pc=getActivePC(we);
  var s=(pc.structs&&pc.structs.filter(function(x){return x.id===id;})[0])||pc.structures[type].filter(function(x){return x.id===id;})[0];if(!s)return;
  var clone={id:'s-'+Date.now(),structType:s.structType||type,desc:s.desc,large:s.large,small:s.small,latlng:null,marker:null};
  if (!pc.structs) pc.structs = [];
  pc.structs.push(clone);
  pc.structures[clone.structType||type].push(clone);
  renderAllStructures();
  startStructPoint(clone.structType||type,clone.id);
}

function delStructure(type,id) {
  var we=getActiveWE();if(!we)return;
  var pc=getActivePC(we);
  var s=(pc.structs&&pc.structs.filter(function(x){return x.id===id;})[0])||pc.structures[type].filter(function(x){return x.id===id;})[0];
  if(s&&s.marker)map.removeLayer(s.marker);
  if(pc.structs)pc.structs=pc.structs.filter(function(x){return x.id!==id;});
  ['cms','mcs','css'].forEach(function(t){pc.structures[t]=pc.structures[t].filter(function(x){return x.id!==id;});});
  if(pendingStructPoint&&pendingStructPoint.id===id){pendingStructPoint=null;document.getElementById('mapwrap').classList.remove('drawing');setMapHint('');}
  renderAllStructures();
}

function updateLogTotals() {
  var we=getActiveWE();if(!we)return;var tL=0,tS=0;
  var pc=getActivePC(we);
  ['cms','mcs','css'].forEach(function(t){pc.structures[t].forEach(function(s){tL+=+s.large||0;tS+=+s.small||0;});});
  ['fps','scs'].forEach(function(t){we.structures[t].forEach(function(s){tL+=+s.large||0;tS+=+s.small||0;});});
  var cl=document.getElementById('calc-large-logs');if(cl)cl.textContent=tL||'—';
  var cs=document.getElementById('calc-small-logs');if(cs)cs.textContent=tS||'—';
  // Also update wizard totals if visible
  var wl=document.getElementById('wz-struct-total-l');if(wl)wl.textContent=tL;
  var ws=document.getElementById('wz-struct-total-s');if(ws)ws.textContent=tS;
}

function startStructPoint(type,id) {
  pendingStructPoint={type:type,id:id,weId:activeWEId};sowDrawing=null;ppDrawing=null;drawPts=[];clearPreview();
  document.getElementById('mapwrap').classList.add('drawing');setMapHint('Click map to place structure location');
  if (type==='fps'||type==='scs') renderFPStructures();
  else renderStructures(type);
}
function replaceStructPoint(type,id) {
  var we=getActiveWE();if(!we)return;var s=structOwner(we,type).structures[type].filter(function(x){return x.id===id;})[0];if(!s)return;
  if(s.marker){map.removeLayer(s.marker);s.marker=null;}s.latlng=null;startStructPoint(type,id);
}
function placeStructPoint(latlng) {
  if(!pendingStructPoint)return;
  var we=getWE(pendingStructPoint.weId);if(!we)return;
  if (!isPtInsidePerimeter(we, latlng)) {
    setMapHint('That\'s outside your project boundary — click map to place structure location');
    return;
  }
  var type=pendingStructPoint.type,id=pendingStructPoint.id;
  var owner=structOwner(we,type);
  var s = (owner.structs && owner.structs.filter(function(x){return x.id===id;})[0])
       || owner.structures[type].filter(function(x){return x.id===id;})[0];
  if(!s){pendingStructPoint=null;return;}
  if(s.marker)map.removeLayer(s.marker);
  var col=STRUCT_COLOR[type];
  var num;
  if ((type==='fps'||type==='scs') && we.fpStructs) {
    num = we.fpStructs.indexOf(s) + 1;
    if (num <= 0) num = owner.structures[type].indexOf(s) + 1;
  } else {
    num = (owner.structs && owner.structs.indexOf(s) >= 0) ? owner.structs.indexOf(s) + 1 : globalStructNum(we,type,id);
  }
  var icon=L.divIcon({className:'',iconSize:[20,20],iconAnchor:[10,10],html:'<div style="width:20px;height:20px;border-radius:50%;background:'+col+';border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;">'+num+'</div>'});
  s.marker=L.marker(latlng,{icon:icon}).bindTooltip(STRUCT_LABEL[type]+' '+num+(s.desc?' – '+s.desc:'')).addTo(map);
  s.latlng=latlng;pendingStructPoint=null;
  document.getElementById('mapwrap').classList.remove('drawing');setMapHint('');
  if (type==='fps'||type==='scs') renderFPStructures();
  else renderAllStructures();
  wizardRefreshIfActive();
}

// ── Line vertex editing ───────────────────────────────────────────────────
var editHandles = [];   // L.circleMarker handles currently shown

// ── Polygon vertex editing (for any PP polygon) ───────────────────────────
function startPolyEdit(id) {
  var we = getActiveWE(); if (!we) return;
  var d = ppOwner(we,id).ppData[id]; if (!d) return;
  var col = id === 'area_fp' ? PP_COLOR.bufferFp : PP_COLOR.polygon;
  var m = PP_DEFS.filter(function(x){return x.id===id;})[0];
  var tipLabel = m ? m.label : id;

  // fp_poly: edit the outer boundary ring, not the donut (which has a hole)
  if (id === 'fp_poly' && d._pts) {
    if (d.layer) { map.removeLayer(d.layer); d.layer = null; }
    d.layer = L.polygon(d._pts.slice(), {
      color:'#2a7a5c', fillColor:'#2a7a5c', fillOpacity:0.18, weight:2, interactive:false
    }).bindTooltip('Floodplain (editing)').addTo(map);
    d._editingBoundary = true;
    lineEditing = {type:'pp-poly', id:id, weId:activeWEId, layer:d.layer};
    buildPolyEditHandles(d.layer, d._pts.slice());
    document.getElementById('edit-done-bar').style.display='flex';
    document.getElementById('mapwrap').classList.add('editing');
    repositionMapOverlays();
    if (wizardMode) renderWizardStep();
    return;
  }

  // pc_fp: same approach — edit the outer boundary, rebuild donut on commit
  if (id === 'pc_fp' && d._pts) {
    if (d.layer) { map.removeLayer(d.layer); d.layer = null; }
    d.layer = L.polygon(d._pts.slice(), {
      color:'#1a7a6c', fillColor:'#1a7a6c', fillOpacity:0.18, weight:2, interactive:false
    }).bindTooltip('New Floodplain (editing)').addTo(map);
    d._editingBoundary = true;
    lineEditing = {type:'pp-poly', id:id, weId:activeWEId, layer:d.layer};
    buildPolyEditHandles(d.layer, d._pts.slice());
    document.getElementById('edit-done-bar').style.display='flex';
    document.getElementById('mapwrap').classList.add('editing');
    repositionMapOverlays();
    if (wizardMode) renderWizardStep();
    return;
  }

  // Special handling for area_fp: edit the boundary polygon, not the donut
  if (id === 'area_fp' && d._fpBoundaryDrawn && d._fpBoundaryPts) {
    // Create a temporary editable polygon from boundary pts
    if (d._donutLayer) { map.removeLayer(d._donutLayer); d._donutLayer = null; }
    d.layer = L.polygon(d._fpBoundaryPts.slice(), {
      color: col, fillColor: col, fillOpacity: 0.18, weight: 2, interactive: false
    }).bindTooltip('Floodplain Boundary (editing)').addTo(map);
    d.userDrawn = true; // temp — so the edit system works
    d._editingBoundary = true;
  } else if (!d.layer) {
    // if user already has a drawn polygon, edit that; else promote buffer to editable polygon
    if (!d.bufferLayer) return;
    var bufPts = d.bufferLayer.getLatLngs();
    var outerPts = (bufPts.length && Array.isArray(bufPts[0])) ? bufPts[0] : bufPts;
    d.layer = L.polygon(outerPts.slice(), {
      color: col, fillColor: col, fillOpacity: 0.18, weight: 2, interactive: false
    }).bindTooltip(tipLabel).addTo(map);
    d.valueM = geoAreaM2(outerPts);
    d.userDrawn = true;
    map.removeLayer(d.bufferLayer); d.bufferLayer = null;
  }
  if (lineEditing) cancelLineEdit();
  ppDrawing = null; sowDrawing = null; pendingStructPoint = null; drawPts = []; clearPreview();
  document.getElementById('mapwrap').classList.remove('drawing');
  lineEditing = {type: 'pp-poly', id: id, weId: activeWEId, layer: d.layer};
  var ring = d.layer.getLatLngs();
  if (ring.length && Array.isArray(ring[0])) ring = ring[0];
  buildPolyEditHandles(d.layer, ring);
  document.getElementById('edit-done-bar').style.display = 'flex'; document.getElementById('mapwrap').classList.add('editing'); repositionMapOverlays();
  renderPMRow(m);
}

function buildPolyEditHandles(layer, ring) {
  clearEditHandles();
  // for a polygon ring, build handles on all vertices (the ring closes back to [0])
  ring.forEach(function(latlng, idx) {
    var h = L.circleMarker(latlng, {
      radius: 7, color: '#c07820', weight: 2,
      fillColor: '#fff', fillOpacity: 1, interactive: true, bubblingMouseEvents: false
    }).addTo(map);
    h._editIdx = idx;
    h._editLayer = layer;
    h._isPoly = true;
    h.on('mousedown', function(e) {
      if (e.originalEvent.button === 2) return;
      L.DomEvent.stop(e);
      map.dragging.disable();
      document.body.style.userSelect = 'none';
      var onMove = function(domEvt) {
        var latlng = map.mouseEventToLatLng(domEvt);
        if (lineEditing && (lineEditing.id === 'fp_poly' || lineEditing.id === 'pc_fp')) {
          latlng = snapToPerimeter(getActiveWE(), latlng);
        }
        var lls = h._editLayer.getLatLngs();
        var flat = (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
        flat[h._editIdx] = latlng;
        h._editLayer.setLatLngs(flat);
        h.setLatLng(latlng);
        rebuildPolyMidHandles(h._editLayer);
      };
      var onUp = function() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.body.style.userSelect = '';
        map.dragging.enable(); // re-enable panning after handle release
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
    h.on('contextmenu', function(e) {
      L.DomEvent.stop(e);
      var lls = h._editLayer.getLatLngs();
      var flat = (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
      if (flat.length <= 3) return; // keep at least 3 pts for polygon
      flat.splice(h._editIdx, 1);
      h._editLayer.setLatLngs(flat);
      buildPolyEditHandles(h._editLayer, flat);
    });
    h.bindTooltip('Drag to move · Right-click to delete', {sticky:true, className:'vertex-tip'});
    editHandles.push(h);
  });
  buildPolyMidHandles(layer, ring);
}

function buildPolyMidHandles(layer, ring) {
  var n = ring.length;
  for (var i = 0; i < n; i++) {
    (function(i) {
      var next = (i + 1) % n;
      var mid = L.latLng(
        (ring[i].lat + ring[next].lat) / 2,
        (ring[i].lng + ring[next].lng) / 2
      );
      var h = L.circleMarker(mid, {
        radius: 5, color: '#c07820', weight: 1.5,
        fillColor: '#c07820', fillOpacity: 0.5, interactive: true, bubblingMouseEvents: false
      }).addTo(map);
      h._isMid = true; h._isPoly = true;
      h._midAfter = i;
      h._editLayer = layer;
      h.on('mousedown', function(e) {
        L.DomEvent.stop(e);
        var lls = layer.getLatLngs();
        var flat = (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
        flat.splice(h._midAfter + 1, 0, h.getLatLng());
        layer.setLatLngs(flat);
        buildPolyEditHandles(layer, layer.getLatLngs()[0] || layer.getLatLngs());
        var newHandle = editHandles[h._midAfter + 1];
        if (newHandle) newHandle.fire('mousedown', e);
      });
      editHandles.push(h);
    })(i);
  }
}

function rebuildPolyMidHandles(layer) {
  var kept = [];
  editHandles.forEach(function(h) {
    if (h._isMid) { map.removeLayer(h); } else { kept.push(h); }
  });
  editHandles = kept;
  var ring = layer.getLatLngs();
  if (ring.length && Array.isArray(ring[0])) ring = ring[0];
  buildPolyMidHandles(layer, ring);
}

function startLineEdit(type, id) {
  var we = getActiveWE(); if (!we) return;
  var layer = null;
  if (type === 'pp') {
    var d = we.ppData[id]; if (!d) return;
    // For metrics stored without a map layer (e.g. valley_len), create a temp layer for editing
    if (!d.layer && d._pts && d._pts.length >= 2) {
      var m0 = PP_DEFS.filter(function(x){return x.id===id;})[0];
      var col0 = PP_COLOR.line || '#c07820';
      d.layer = L.polyline(d._pts, {color:col0, weight:2, dashArray:'4,3', interactive:false})
        .bindTooltip(m0 ? m0.label : id).addTo(map);
      d._tempLayer = true;
    }
    if (!d.layer) return;
    layer = d.layer;
  } else {
    var d2 = sowOwner(we,id).sowLayers[id]; if (!d2 || !d2.layer) return;
    layer = d2.layer;
  }
  // cancel any active drawing or prior edit
  if (lineEditing) cancelLineEdit();
  ppDrawing = null; sowDrawing = null; pendingStructPoint = null; drawPts = []; clearPreview();
  document.getElementById('mapwrap').classList.remove('drawing');

  lineEditing = {type: type, id: id, weId: activeWEId, layer: layer};
  buildEditHandles(layer);
  setMapHint('');
  document.getElementById('edit-done-bar').style.display = 'flex'; document.getElementById('mapwrap').classList.add('editing'); repositionMapOverlays();
  var ddb = document.getElementById('draw-done-btn'); if (ddb) ddb.style.display = 'none';
  // Hide reach arrows during editing — recalculated on commit
  if (id === 'reach_len') { var _weE=getWE(activeWEId); setFlowArrowOpacity(_weE&&_weE.ppData['reach_len'], 0); }
  if (id === 'pc-reach') { var _wePC=getWE(activeWEId); setFlowArrowOpacity(_wePC&&getActivePC(_wePC).sowLayers['pc-reach'], 0); }
  // reflect editing state in sidebar
  if (type === 'pp') {
    var m = PP_DEFS.filter(function(x){return x.id===id;})[0];
    renderPMRow(m);
  }
}

function buildEditHandles(layer) {
  clearEditHandles();
  var pts = layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  pts.forEach(function(latlng, idx) {
    var h = L.circleMarker(latlng, {
      radius: 7, color: '#c07820', weight: 2,
      fillColor: '#fff', fillOpacity: 1, interactive: true, bubblingMouseEvents: false
    }).addTo(map);
    h._editIdx = idx;
    h._editLayer = layer;
    h.on('mousedown', function(e) {
      if (e.originalEvent.button === 2) return; // right-click handled separately
      L.DomEvent.stop(e);
      map.dragging.disable();
      document.body.style.userSelect = 'none';
      var onMove = function(domEvt) {
        var latlng = map.mouseEventToLatLng(domEvt);
        var lls = h._editLayer.getLatLngs();
        if (lls.length && Array.isArray(lls[0])) {
          lls[0][h._editIdx] = latlng;
          h._editLayer.setLatLngs(lls);
        } else {
          lls[h._editIdx] = latlng;
          h._editLayer.setLatLngs(lls);
        }
        h.setLatLng(latlng);
        rebuildMidHandles(h._editLayer);
      };
      var onUp = function() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.body.style.userSelect = '';
        map.dragging.enable(); // re-enable panning after handle release
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
    h.on('contextmenu', function(e) {
      L.DomEvent.stop(e);
      var lls = h._editLayer.getLatLngs();
      var flat = (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
      if (flat.length <= 2) return; // keep at least 2 pts
      flat.splice(h._editIdx, 1);
      h._editLayer.setLatLngs(lls.length && Array.isArray(lls[0]) ? [flat] : flat);
      buildEditHandles(h._editLayer);
    });
    h.bindTooltip('Drag to move · Right-click to delete', {sticky:true, className:'vertex-tip'});
    editHandles.push(h);
  });
  buildMidHandles(layer);
}

function buildMidHandles(layer) {
  var pts = layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  for (var i = 0; i < pts.length - 1; i++) {
    (function(i){
      var mid = L.latLng(
        (pts[i].lat + pts[i+1].lat) / 2,
        (pts[i].lng + pts[i+1].lng) / 2
      );
      var h = L.circleMarker(mid, {
        radius: 5, color: '#c07820', weight: 1.5,
        fillColor: '#c07820', fillOpacity: 0.5, interactive: true, bubblingMouseEvents: false
      }).addTo(map);
      h._isMid = true;
      h._midAfter = i; // insert after index i
      h._editLayer = layer;
      h.on('mousedown', function(e) {
        L.DomEvent.stop(e);
        // promote midpoint to real vertex
        var lls = layer.getLatLngs();
        var flat = (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
        flat.splice(h._midAfter + 1, 0, h.getLatLng());
        layer.setLatLngs(flat.length && Array.isArray(lls[0]) ? [flat] : flat);
        buildEditHandles(layer); // rebuild all handles with new vertex count
        // immediately start dragging the new vertex handle
        var newHandle = editHandles[h._midAfter + 1];
        if (newHandle) newHandle.fire('mousedown', e);
      });
      editHandles.push(h);
    })(i);
  }
}

function rebuildMidHandles(layer) {
  // remove only midpoint handles and rebuild them
  var kept = [];
  editHandles.forEach(function(h) {
    if (h._isMid) { map.removeLayer(h); }
    else { kept.push(h); }
  });
  editHandles = kept;
  buildMidHandles(layer);
}

function clearEditHandles() {
  editHandles.forEach(function(h){ map.removeLayer(h); });
  editHandles = [];
}

var panShapeActive = false;

function togglePanShape() {
  panShapeActive = !panShapeActive;
  var btn = document.getElementById('pan-shape-btn');
  if (btn) {
    btn.style.background = panShapeActive ? '#c07820' : '#1a3a5c';
    btn.textContent = panShapeActive ? '\u2715 Exit pan' : '\u21d5 Pan shape';
  }
  if (!lineEditing) return;
  var drawDoneBtn = document.getElementById('draw-done-btn');
  if (panShapeActive) {
    editHandles.forEach(function(h){ h.setStyle({opacity:0.3, fillOpacity:0.3}); });
    setMapHint('Drag anywhere on the map to shift the shape');
    document.getElementById('mapwrap').classList.add('drawing');
    if (drawDoneBtn) drawDoneBtn.style.display = 'none';
    document.getElementById('map').addEventListener('mousedown', _panShapeMapMousedown);
  } else {
    editHandles.forEach(function(h){ h.setStyle({opacity:1, fillOpacity:1}); });
    setMapHint('');
    document.getElementById('mapwrap').classList.remove('drawing');
    if (drawDoneBtn) drawDoneBtn.style.display = '';
    document.getElementById('map').removeEventListener('mousedown', _panShapeMapMousedown);
  }
}

function _panShapeMapMousedown(e) {
  if (!panShapeActive || !lineEditing) return;
  if (e.button !== 0) return; // left click only
  e.preventDefault();
  e.stopPropagation();
  map.dragging.disable();
  document.body.style.userSelect = 'none';
  var startLatLng = map.mouseEventToLatLng(e);
  var layer = lineEditing.layer;

  var onMove = function(domEvt) {
    var curLatLng = map.mouseEventToLatLng(domEvt);
    var dLat = curLatLng.lat - startLatLng.lat;
    var dLng = curLatLng.lng - startLatLng.lng;
    startLatLng = curLatLng;
    var lls = layer.getLatLngs();
    var flat = (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
    for (var i = 0; i < flat.length; i++) {
      flat[i] = L.latLng(flat[i].lat + dLat, flat[i].lng + dLng);
    }
    layer.setLatLngs((lls.length && Array.isArray(lls[0])) ? [flat] : flat);
    editHandles.forEach(function(h) {
      if (!h._isMid && h._editIdx !== undefined) h.setLatLng(flat[h._editIdx]);
    });
    rebuildMidHandles(layer);
  };

  var onUp = function() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.body.style.userSelect = '';
    map.dragging.enable();
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

// ── Reference image layer ───────────────────────────────────────────────────
// A single user-uploaded image (site plan, sketch, aerial photo) used as tracing
// paper under the drawing tools. No georeferencing — the user drags/resizes it
// by eye against the basemap, then locks it so map clicks pass through to drawing.
function handleRefImageFile(file) {
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataUrl = e.target.result;
    var img = new Image();
    img.onload = function() {
      createRefImageOverlay(dataUrl, img.naturalWidth, img.naturalHeight, file.name);
    };
    img.src = dataUrl;
  };
  reader.readAsDataURL(file);
}

function createRefImageOverlay(dataUrl, natW, natH, fileName) {
  if (refImage) removeRefImage();
  var mapSize = map.getSize();
  var centerPt = map.latLngToContainerPoint(map.getCenter());
  var targetW = Math.min(mapSize.x, mapSize.y) * 0.6;
  var targetH = targetW * (natH / natW);
  var nw = map.containerPointToLatLng(L.point(centerPt.x - targetW / 2, centerPt.y - targetH / 2));
  var se = map.containerPointToLatLng(L.point(centerPt.x + targetW / 2, centerPt.y + targetH / 2));
  var bounds = L.latLngBounds(nw, se);
  var overlay = L.imageOverlay(dataUrl, bounds, {opacity: 0.85, interactive: true}).addTo(map);
  var imgEl = overlay.getElement();
  if (imgEl) imgEl.style.pointerEvents = 'none'; // starts locked; enterRefImagePositionMode() opens it up

  refImage = {
    overlay: overlay, bounds: bounds, opacity: 0.85, rotation: 0,
    fileName: fileName, naturalW: natW, naturalH: natH, locked: true, visible: true
  };
  applyRefImageTransform();
  if (!refImageZoomHandlerAttached) { map.on('zoom viewreset', applyRefImageTransform); refImageZoomHandlerAttached = true; }
  attachRefImageBodyDrag();
  enterRefImagePositionMode();
}

// Leaflet's ImageOverlay positions its own <img> via L.DomUtil.setPosition(), which
// sets style.transform to a plain translate3d(...) on every setBounds()/zoom/viewreset
// — so a naive `imgEl.style.transform = 'rotate(...)'` gets silently stomped on the
// next drag, resize, or map move. Instead we always recompute the combined transform
// from Leaflet's own last-applied position (img._leaflet_pos, a stable Leaflet
// internal) plus our rotation, and call this after anything that could trigger either.
var refImageZoomHandlerAttached = false;
function applyRefImageTransform() {
  if (!refImage) return;
  var imgEl = refImage.overlay.getElement();
  if (!imgEl) return;
  var pos = imgEl._leaflet_pos;
  var translate = pos ? 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)' : '';
  imgEl.style.transformOrigin = 'center center';
  imgEl.style.transform = translate + (refImage.rotation ? ' rotate(' + refImage.rotation + 'deg)' : '');
}

function attachRefImageBodyDrag() {
  if (!refImage) return;
  var el = refImage.overlay.getElement();
  if (!el) return;
  L.DomEvent.on(el, 'mousedown', function(e) {
    if (e.button !== 0 || refImage.locked) return;
    L.DomEvent.stop(e);
    map.dragging.disable();
    document.body.style.userSelect = 'none';
    var start = map.mouseEventToLatLng(e);
    var onMove = function(domEvt) {
      var cur = map.mouseEventToLatLng(domEvt);
      var dLat = cur.lat - start.lat, dLng = cur.lng - start.lng;
      start = cur;
      var b = refImage.bounds;
      var newBounds = L.latLngBounds(
        L.latLng(b.getSouth() + dLat, b.getWest() + dLng),
        L.latLng(b.getNorth() + dLat, b.getEast() + dLng)
      );
      refImage.bounds = newBounds;
      refImage.overlay.setBounds(newBounds);
      applyRefImageTransform();
      positionRefImageHandles();
    };
    var onUp = function() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.userSelect = '';
      map.dragging.enable();
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

var REF_IMG_OPPOSITE_CORNER = {nw: 'se', ne: 'sw', se: 'nw', sw: 'ne'};

function refImageCorners(bounds) {
  return {
    nw: L.latLng(bounds.getNorth(), bounds.getWest()),
    ne: L.latLng(bounds.getNorth(), bounds.getEast()),
    se: L.latLng(bounds.getSouth(), bounds.getEast()),
    sw: L.latLng(bounds.getSouth(), bounds.getWest())
  };
}

function buildRefImageHandles() {
  clearRefImageHandles();
  if (!refImage) return;
  var corners = refImageCorners(refImage.bounds);
  Object.keys(corners).forEach(function(key) {
    var h = L.circleMarker(corners[key], {
      radius: 7, color: '#1a7abf', weight: 2, fillColor: '#fff', fillOpacity: 1,
      interactive: true, bubblingMouseEvents: false
    }).addTo(map);
    h.bindTooltip('Drag to resize', {sticky: true, className: 'vertex-tip'});
    h.on('mousedown', function(e) {
      if (e.originalEvent.button !== 0) return;
      L.DomEvent.stop(e);
      map.dragging.disable();
      document.body.style.userSelect = 'none';
      var aspect = refImage.naturalW / refImage.naturalH;
      var onMove = function(domEvt) {
        var anchorLatLng = refImageCorners(refImage.bounds)[REF_IMG_OPPOSITE_CORNER[key]];
        var anchorPt = map.latLngToContainerPoint(anchorLatLng);
        var curPt = map.mouseEventToContainerPoint(domEvt);
        var dx = curPt.x - anchorPt.x, dy = curPt.y - anchorPt.y;
        var w = Math.abs(dx), h2 = w / aspect;
        if (Math.abs(dy) > h2) { h2 = Math.abs(dy); w = h2 * aspect; }
        var signX = dx < 0 ? -1 : 1, signY = dy < 0 ? -1 : 1;
        var newCornerLatLng = map.containerPointToLatLng(L.point(anchorPt.x + signX * w, anchorPt.y + signY * h2));
        var newBounds = L.latLngBounds(anchorLatLng, newCornerLatLng);
        refImage.bounds = newBounds;
        refImage.overlay.setBounds(newBounds);
        applyRefImageTransform();
        positionRefImageHandles();
      };
      var onUp = function() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.body.style.userSelect = '';
        map.dragging.enable();
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
    refImageHandles[key] = h;
  });
}

function positionRefImageHandles() {
  if (!refImage) return;
  var corners = refImageCorners(refImage.bounds);
  Object.keys(corners).forEach(function(key) {
    if (refImageHandles[key]) refImageHandles[key].setLatLng(corners[key]);
  });
}

function clearRefImageHandles() {
  Object.keys(refImageHandles).forEach(function(key) {
    if (refImageHandles[key]) map.removeLayer(refImageHandles[key]);
  });
  refImageHandles = {};
}

function enterRefImagePositionMode() {
  if (!refImage) return;
  refImagePositioning = true;
  refImage.locked = false;
  var imgEl = refImage.overlay.getElement();
  if (imgEl) { imgEl.style.pointerEvents = 'auto'; imgEl.style.cursor = 'move'; }
  buildRefImageHandles();
  var bar = document.getElementById('ref-image-position-bar');
  if (bar) bar.classList.add('visible');
  document.getElementById('mapwrap').classList.add('positioning-ref-image');
  repositionMapOverlays();
  renderRefImageSection();
}

function finishRefImagePositioning() {
  if (!refImage) return;
  refImagePositioning = false;
  refImage.locked = true;
  var imgEl = refImage.overlay.getElement();
  if (imgEl) { imgEl.style.pointerEvents = 'none'; imgEl.style.cursor = ''; }
  clearRefImageHandles();
  var bar = document.getElementById('ref-image-position-bar');
  if (bar) bar.classList.remove('visible');
  document.getElementById('mapwrap').classList.remove('positioning-ref-image');
  renderRefImageSection();
}

function removeRefImage() {
  if (!refImage) return;
  if (refImagePositioning) finishRefImagePositioning();
  map.removeLayer(refImage.overlay);
  refImage = null;
  renderRefImageSection();
}

function setRefImageOpacity(v) {
  if (!refImage) return;
  refImage.opacity = v;
  refImage.overlay.setOpacity(v);
}

function setRefImageRotation(deg) {
  if (!refImage) return;
  refImage.rotation = deg;
  applyRefImageTransform();
}

function setRefImageVisible(v) {
  if (!refImage) return;
  refImage.visible = v;
  if (v) {
    refImage.overlay.addTo(map); // Leaflet rebuilds the <img> on re-add, so re-apply lock state + drag + rotation
    var imgEl = refImage.overlay.getElement();
    if (imgEl) {
      imgEl.style.pointerEvents = refImage.locked ? 'none' : 'auto';
      imgEl.style.cursor = refImage.locked ? '' : 'move';
    }
    applyRefImageTransform();
    attachRefImageBodyDrag();
  } else {
    if (refImagePositioning) finishRefImagePositioning();
    map.removeLayer(refImage.overlay);
  }
  renderRefImageSection();
}

function renderRefImageSection() {
  var wrap = document.getElementById('ref-image-section');
  if (!wrap) return;
  wrap.innerHTML = '';

  var title = document.createElement('div');
  title.className = 'layer-section-title';
  title.textContent = 'Reference Image';
  title.style.marginTop = '8px';
  wrap.appendChild(title);

  if (!refImage) {
    var uploader = document.createElement('esa-file-upload');
    uploader.setAttribute('label', 'Upload reference image');
    uploader.setAttribute('accept', 'image/png,image/jpeg,image/webp,image/gif');
    uploader.setAttribute('max-size-mb', '20');
    uploader.addEventListener('change', function(e) {
      var files = e.detail && e.detail.files;
      if (files && files[0]) handleRefImageFile(files[0]);
    });
    wrap.appendChild(uploader);
    return;
  }

  var row = document.createElement('label');
  row.className = 'layer-row ref-img-row';
  var visCb = document.createElement('input');
  visCb.type = 'checkbox';
  visCb.checked = refImage.visible;
  visCb.onchange = function() { setRefImageVisible(visCb.checked); };
  row.appendChild(visCb);
  var nameSpan = document.createElement('span');
  nameSpan.className = 'ref-img-filename';
  nameSpan.textContent = refImage.fileName;
  nameSpan.title = refImage.fileName;
  row.appendChild(nameSpan);
  wrap.appendChild(row);

  var opSlider = document.createElement('esa-range-slider');
  opSlider.className = 'layer-opacity-slider';
  opSlider.setAttribute('label', 'Opacity');
  opSlider.setAttribute('min', '0');
  opSlider.setAttribute('max', '100');
  opSlider.setAttribute('step', '5');
  opSlider.setAttribute('size', 'sm');
  opSlider.value = Math.round(refImage.opacity * 100);
  opSlider.addEventListener('change', function(e) { setRefImageOpacity(e.detail.value / 100); });
  wrap.appendChild(opSlider);

  var rotSlider = document.createElement('esa-range-slider');
  rotSlider.className = 'layer-opacity-slider';
  rotSlider.setAttribute('label', 'Rotation');
  rotSlider.setAttribute('min', '-180');
  rotSlider.setAttribute('max', '180');
  rotSlider.setAttribute('step', '1');
  rotSlider.setAttribute('size', 'sm');
  rotSlider.value = refImage.rotation || 0;
  rotSlider.addEventListener('change', function(e) { setRefImageRotation(e.detail.value); });
  wrap.appendChild(rotSlider);

  var actions = document.createElement('div');
  actions.className = 'ref-img-actions-row';

  var repoBtn = document.createElement('button');
  repoBtn.type = 'button';
  repoBtn.className = 'ref-img-action-btn';
  repoBtn.textContent = refImagePositioning ? 'Positioning…' : 'Reposition';
  repoBtn.disabled = refImagePositioning;
  repoBtn.onclick = function() {
    if (!refImage.visible) setRefImageVisible(true);
    enterRefImagePositionMode();
    var panel = document.getElementById('layer-panel');
    if (panel) panel.style.display = 'none';
  };
  actions.appendChild(repoBtn);

  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'ref-img-action-btn ref-img-action-btn--danger';
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = function() { removeRefImage(); };
  actions.appendChild(removeBtn);

  wrap.appendChild(actions);
}

// A vertex drag mutates the layer's geometry live \u2014 by the time editing ends there's
// no snapshot left to revert to, so "cancel" was never a real revert (see commit
// 8e7e49f). cancelLineEdit() is now a thin wrapper around commitLineEdit(): same
// teardown, same value/arrow/dependent recalculation, everywhere \u2014 one definition of
// "an edit ended," instead of two, so the value-sync fix that motivated this doesn't
// have to be re-applied at each of this function's ~10 other call sites individually.
// The one thing a true cancel should NOT do is confirmReachChange()'s reach_len
// dependents gate: that can pop a second confirm dialog and, if declined, re-enter
// edit mode \u2014 surprising when the user already asked to leave/abort. skipReachConfirm
// suppresses just that one step; the value still gets synced either way.
function cancelLineEdit() {
  commitLineEdit(true);
}

function commitLineEdit(skipReachConfirm) {
  if (!lineEditing) return;
  if (panShapeActive) {
    panShapeActive = false;
    var btn = document.getElementById('pan-shape-btn');
    if (btn) { btn.style.background = '#1a3a5c'; btn.textContent = '\u21d5 Pan shape'; }
    document.getElementById('map').removeEventListener('mousedown', _panShapeMapMousedown);
    document.getElementById('mapwrap').classList.remove('drawing');
  }
  var we = getWE(lineEditing.weId); if (!we) return;
  var layer = lineEditing.layer;
  clearEditHandles();
  map.dragging.enable();
  // recalculate length from updated latlngs, clip to perimeter
  var pts = layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  // Determine geo type for clipping: fp_left/fp_right are polygon-area lines, others are lines
  var editGeo = (lineEditing.id==='fp_left'||lineEditing.id==='fp_right') ? 'line' : 'line';
  var NO_CLIP_EDIT = {perimeter:1, ch_width:1};
  if (!NO_CLIP_EDIT[lineEditing.id]) {
    var clippedPts = clipPtsToPerimeter(we, pts, editGeo);
    if (clippedPts && clippedPts.length >= 2) {
      pts = clippedPts;
      layer.setLatLngs(pts);
    }
  }
  var newLen = geoLen(pts);
  var type = lineEditing.type, id = lineEditing.id;
  lineEditing = null;
  document.getElementById('edit-done-bar').style.display = 'none'; document.getElementById('mapwrap').classList.remove('editing'); var _ddb=document.getElementById('draw-done-btn'); if(_ddb) _ddb.style.display = '';
  if (type === 'pp') {
    if (id === 'reach_len' && !skipReachConfirm && !confirmReachChange(we)) {
      startLineEdit('pp', id); return;
    }
    // fp_left / fp_right are polygons — store area not line length
    we.ppData[id].valueM = (id === 'fp_left' || id === 'fp_right') ? geoAreaM2(pts) : newLen;
    // For no-display metrics (valley_len), store updated pts and remove temp layer
    if (we.ppData[id]._tempLayer) {
      we.ppData[id]._pts = layer.getLatLngs();
      map.removeLayer(layer);
      we.ppData[id].layer = null;
      we.ppData[id]._tempLayer = false;
    }
    var m = PP_DEFS.filter(function(x){return x.id===id;})[0];
    renderPMRow(m); rerenderCalcs(); updatePPProgress(); updateSOWCalcs();
    updateAreaChBuffer(we);
    updateAreaFpBuffer(we);
    if (id === 'reach_len') { addReachArrow(we); setTimeout(function(){ fetchElevationProfile(getWE(activeWEId)); }, 300); }
    if (id === 'perimeter') { reClipReachToPerimeter(we); reClipPCReach(we); reClipFpPolyToPerimeter(we); reClipPCFPToPerimeter(we); }
  } else if (type === 'cr-poly') {
    var crWe = getWE(lineEditing.weId);
    if (crWe) {
      var crR = getCR(crWe, lineEditing.reachId);
      if (crR) {
        var crRing = layer.getLatLngs();
        if (crRing.length && Array.isArray(crRing[0])) crRing = crRing[0];
        crR.sowLayers['pc-area'].valueM = geoAreaM2(crRing) * 0.000247105;
        crR.sowLayers['pc-area']._auto = false;
        renderChannelReaches();
      }
    }
  } else if (type === 'pp-poly') {
    // recalculate area from polygon ring
    var ring2 = layer.getLatLngs();
    if (ring2.length && Array.isArray(ring2[0])) ring2 = ring2[0];
    var ppPolyOwner = ppOwner(we,id);
    ppPolyOwner.ppData[id].valueM = geoAreaM2(ring2);
    ppPolyOwner.ppData[id].userDrawn = true;

    // If editing fp_poly boundary, rebuild the donut from the new ring
    if (id === 'fp_poly' && we.ppData[id]._editingBoundary) {
      we.ppData[id]._editingBoundary = false;
      if (we.ppData[id].layer) { map.removeLayer(we.ppData[id].layer); we.ppData[id].layer = null; }
      commitFpPoly(we, ring2.slice());
      if (wizardMode) wizardRefreshIfActive();
      return;
    }

    // If editing pc_fp boundary, rebuild the donut from the new ring
    if (id === 'pc_fp' && ppPolyOwner.ppData[id]._editingBoundary) {
      ppPolyOwner.ppData[id]._editingBoundary = false;
      if (ppPolyOwner.ppData[id].layer) { map.removeLayer(ppPolyOwner.ppData[id].layer); ppPolyOwner.ppData[id].layer = null; }
      commitPCFP(we, ring2.slice());
      if (wizardMode) wizardRefreshIfActive();
      return;
    }

    // If editing area_fp boundary, save back and rebuild donut
    if (id === 'area_fp' && we.ppData[id]._editingBoundary) {
      we.ppData[id]._fpBoundaryPts = ring2.slice();
      we.ppData[id]._fpBoundaryDrawn = true;
      we.ppData[id]._editingBoundary = false;
      we.ppData[id].userDrawn = false;
      if (we.ppData[id].layer) { map.removeLayer(we.ppData[id].layer); we.ppData[id].layer = null; }
      updateAreaFpBuffer(we);
    }

    var m2 = PP_DEFS.filter(function(x){return x.id===id;})[0];
    renderPMRow(m2); rerenderCalcs(); updatePPProgress(); updateSOWCalcs();
    // if area_ch was edited, clear the fp buffer so user regenerates it from new channel shape
    if (id === 'area_ch') {
      var fpD = we.ppData['area_fp'];
      if (fpD) {
        if (fpD.bufferLayer) { map.removeLayer(fpD.bufferLayer); fpD.bufferLayer = null; }
        if (fpD.layer && !fpD.userDrawn) { map.removeLayer(fpD.layer); fpD.layer = null; fpD.valueM = 0; }
        clearFpSplit(we);
        fpD.outerLeft = null; fpD.outerRight = null;
        fpD.innerLeft = null; fpD.innerRight = null;
      }
      updateAreaFpBuffer(we);
      var m3 = PP_DEFS.filter(function(x){return x.id==='area_fp';})[0];
      renderPMRow(m3);
    }
    // if perimeter was edited, re-clip channel and fp buffers
    if (id === 'perimeter') { updateAreaChBuffer(we); updateAreaFpBuffer(we); }
    wizardRefreshIfActive();
  } else {
    var lineEditOwner = sowOwner(we,id);
    lineEditOwner.sowLayers[id].valueM = newLen;
    var el = document.getElementById('dr-'+id);
    var sl = lineEditOwner.sowLayers[id];
    if (el && sl) {
      var val = Math.round(sl.valueM * 3.28084).toLocaleString() + ' ft';
      el.innerHTML = '<span class="drawn-result">&#10003; ' + val + '</span> ' +
        '<span class="drawn-redo" onclick="startLineEdit(\'sow\',\''+id+'\')">edit</span> ' +
        '<span class="drawn-redo" onclick="startSOWDraw(\''+id+'\',\''+(sl.geo||'line')+'\',\''+sl.label+'\')">redo</span>';
    }
    if (id === 'pc-reach') addPCReachArrow(we);
    updateSOWCalcs(); renderLegend();
  }
}

// ── Channel Habitat Units (CHU) ───────────────────────────────────────────

function getCHUChannelPts(we) {
  // CHUs must be built from the active primary channel's own area, never the
  // pre-project area_ch — that's shared/reach-level data and is wrong once
  // there's more than one primary channel (or the channel step isn't done yet).
  var sl = getActivePC(we).sowLayers['pc-area'];
  if (!sl || !sl.layer) return null;
  var lls = sl.layer.getLatLngs();
  return (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
}

// Initialise the channel as a single riffle unit (called when entering the Identify Pools step).
function initCHUUnits(we) {
  if (!we || getActivePC(we).chuUnits.length > 0) return;
  var chPts = getCHUChannelPts(we); if (!chPts) return;
  getActivePC(we).chuUnits = [{id:'chu-0', type:'riffle', pts:chPts.map(function(p){return L.latLng(p.lat,p.lng);}), layer:null, areaM2:0, lengthM:0}];
  renderCHUUnits(we);
}

// Remove a pool (convert it back to riffle). The split lines remain.
function removeCHUPool(unitId) {
  var we = getActiveWE(); if (!we) return;
  var u = getActivePC(we).chuUnits.filter(function(u){ return u.id===unitId; })[0]; if (!u) return;
  u.type = 'riffle';
  renderCHUUnits(we);
  wizardRefreshIfActive();
}

// Toggle a unit between riffle and pool.
function toggleCHUPool(unitId) {
  var we = getActiveWE(); if (!we) return;
  var u = getActivePC(we).chuUnits.filter(function(u){ return u.id===unitId; })[0]; if (!u) return;
  u.type = (u.type === 'pool') ? 'riffle' : 'pool';
  renderCHUUnits(we);
  wizardRefreshIfActive();
}

// ── Secondary Channels ────────────────────────────────────────────────────
var SC_COLOR = '#2a6a9c';

function startSCReachDraw() {
  var we = getActiveWE(); if (!we) return;
  if (!we.scReaches) we.scReaches = [];
  startSOWDraw('sc-reach-new', 'line', 'Secondary Channel '+(we.scReaches.length+1));
}

function deleteSCReach(id) {
  var we = getActiveWE(); if (!we) return;
  if (!we.scReaches) return;
  var r = we.scReaches.filter(function(r){return r.id===id;})[0];
  if (r) { if(r.layer) map.removeLayer(r.layer); if(r.bufferLayer) map.removeLayer(r.bufferLayer); }
  we.scReaches = we.scReaches.filter(function(r){return r.id!==id;});
  updateSCBuffers(we);
  if (wizardMode) wizardRefreshIfActive();
}

function setPCBankHeight(val) {
  var we = getActiveWE(); if (!we) return;
  if (!we.inputVals) we.inputVals = {};
  var n = parseFloat(val);
  getActivePC(we).inputVals['pc-bank-height'] = (n > 0) ? n : null;
  updateSOWCalcs(); // keeps the auto-calculated excavation volume in sync
  if (wizardMode) wizardRefreshIfActive();
}
// ── Gravel placement (pc_gravel wizard step) ──────────────────────────────
// Channel width used to estimate gravel placement volume: measured cross-sections
// win over the manually entered width, matching the primary-channel-area buffer logic.
function pcChannelWidthFt(we) {
  var w = avgWidths(we, ['pcw1','pcw2','pcw3']);
  if (w) return w;
  if (getActivePC(we).inputVals['pc-width']) return getActivePC(we).inputVals['pc-width'];
  return null;
}

// Excavation volume for the active primary channel — reach length x channel width
// x bank height, treating the channel as a simple rectangular prism (ft3 -> CY).
// A pure calculation (like pcChannelWidthFt above): reads live inputs, no DOM
// writes, no caching — callers that need the number ask for it fresh every time.
// Like pcChannelWidthFt, this reads getActivePC(we), so it's only correct for
// we's CURRENTLY ACTIVE primary channel — callers iterating every primary channel
// of a WE (e.g. openSOW()'s export loop) can't use this for a non-active `pc` and
// still read the inputVals['pc-excavation-vol'] snapshot updateSOWCalcs() caches.
function pcExcavationCY(we) {
  var reachSL = we && getActivePC(we).sowLayers['pc-reach'];
  var reachFt = reachSL && reachSL.valueM ? reachSL.valueM * 3.28084 : 0;
  var widthFt = pcChannelWidthFt(we) || 0;
  var bankHtFt = (we && getActivePC(we).inputVals['pc-bank-height']) || 0;
  return (reachFt && widthFt && bankHtFt) ? Math.round(reachFt * widthFt * bankHtFt / 27) : null;
}

function wizardAddGravelPlacement() {
  var we = getActiveWE(); if (!we) return;
  if (!getActivePC(we).gravelPlacements) getActivePC(we).gravelPlacements = [];
  var p = {id: 'gp-'+Date.now(), latlng: null, marker: null, length: '', depth: ''};
  getActivePC(we).gravelPlacements.push(p);
  renderWizardStep();
  startGravelPoint(p.id);
}

function wizardDelGravelPlacement(placementId) {
  var we = getActiveWE(); if (!we) return;
  var p = getActivePC(we).gravelPlacements.filter(function(x){return x.id===placementId;})[0];
  if (p && p.marker) map.removeLayer(p.marker);
  getActivePC(we).gravelPlacements = getActivePC(we).gravelPlacements.filter(function(x){return x.id!==placementId;});
  if (pendingGravelPoint && pendingGravelPoint.placementId === placementId) {
    pendingGravelPoint = null;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('');
  }
  renumberGravelPlacements(we);
  renderWizardStep();
}

// Deleting a placement shifts the rest down one — keep map badges matching the list.
function renumberGravelPlacements(we) {
  var col = pcChannelColor(we, we.activePCId);
  getActivePC(we).gravelPlacements.forEach(function(p, i) {
    if (p.marker) p.marker.setIcon(fpMultiLabelIcon(i+1, col));
  });
}

// Gravel pins are primary-channel work — keep them on the map while stepping through
// any 'pc' step (across every channel), hide them once the wizard moves on to
// Secondary Channels / Floodplain / Riparian steps where they're just clutter.
function setGravelMarkersVisible(we, show) {
  if (!we) return;
  (we.primaryChannels||[]).forEach(function(pc){
    (pc.gravelPlacements||[]).forEach(function(p){
      if (!p.marker) return;
      if (show) { if (!map.hasLayer(p.marker)) map.addLayer(p.marker); }
      else if (map.hasLayer(p.marker)) map.removeLayer(p.marker);
    });
  });
}

function wizardSetGravelField(placementId, field, val) {
  var we = getActiveWE(); if (!we) return;
  var p = getActivePC(we).gravelPlacements.filter(function(x){return x.id===placementId;})[0];
  if (!p) return;
  p[field] = val;
  if (wizardMode) wizardRefreshIfActive();
}

function startGravelPoint(placementId) {
  pendingGravelPoint = {placementId: placementId, weId: activeWEId};
  sowDrawing = null; ppDrawing = null; pendingStructPoint = null; drawPts = []; clearPreview();
  document.getElementById('mapwrap').classList.add('drawing');
  setMapHint('Click map to place gravel placement location');
  if (wizardMode) wizardRefreshIfActive();
}

function placeGravelPoint(latlng) {
  if (!pendingGravelPoint) return;
  var we = getWE(pendingGravelPoint.weId); if (!we) return;
  if (!isPtInsidePerimeter(we, latlng)) {
    setMapHint('That\'s outside your project boundary — click map to place gravel placement location');
    return;
  }
  var p = getActivePC(we).gravelPlacements.filter(function(x){return x.id===pendingGravelPoint.placementId;})[0];
  pendingGravelPoint = null;
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('');
  if (!p) return;
  if (p.marker) map.removeLayer(p.marker);
  var num = getActivePC(we).gravelPlacements.indexOf(p) + 1;
  var gravelTip = we.primaryChannels.length > 1 ? 'Gravel Placement ' + num + ' (' + getActivePC(we).name + ')' : 'Gravel Placement ' + num;
  p.marker = L.marker(latlng, {icon: fpMultiLabelIcon(num, pcChannelColor(we, we.activePCId)), interactive:false})
    .bindTooltip(gravelTip).addTo(map);
  p.latlng = latlng;
  if (wizardMode) wizardRefreshIfActive();
}

function setSCReachFlowType(id, val) {
  var we = getActiveWE(); if (!we) return;
  var r = we.scReaches && we.scReaches.filter(function(r){return r.id===id;})[0];
  if (!r) return;
  r.flowType = val || null;
  if (wizardMode) wizardRefreshIfActive();
}

function setSCReachWidth(id, val) {
  var we = getActiveWE(); if (!we) return;
  var r = we.scReaches && we.scReaches.filter(function(r){return r.id===id;})[0];
  if (!r) return;
  var n = parseFloat(val);
  r.width = (n > 0) ? n : null;
  updateSCBuffer(we, r);
  if (wizardMode) wizardRefreshIfActive();
}

function setSCWood(field, val) {
  var we = getActiveWE(); if (!we) return;
  if (!we.inputVals) we.inputVals = {};
  var n = parseInt(val) || 0;
  we.inputVals[field] = n;
  if (wizardMode) wizardRefreshIfActive();
}

function updateSCBuffer(we, r) {
  if (!r || !r.layer) return;
  if (r.bufferLayer) { map.removeLayer(r.bufferLayer); r.bufferLayer = null; }
  if (!r.width) return;
  var halfWM = (r.width / 3.28084) / 2;
  var pts = r.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  pts = extendReachPts(pts);
  var ring = buildBufferPoly(pts, halfWM);
  if (!ring) return;
  r.bufferLayer = L.polygon(ring, {
    color:SC_COLOR, fillColor:SC_COLOR, fillOpacity:0.15, weight:1.5, dashArray:'6,4', interactive:true
  }).bindTooltip('Secondary Channel (estimated)').addTo(map);
}

function updateSCBuffers(we) {
  if (!we || !we.scReaches) return;
  we.scReaches.forEach(function(r){ updateSCBuffer(we, r); });
}

function startCHUPoolDraw() {
  var we = getActiveWE(); if (!we) return;
  if (!getCHUChannelPts(we)) {
    setMapHint('No primary channel area — complete steps 8 &amp; 9 first.');
    setTimeout(function(){setMapHint('');}, 3000); return;
  }
  initCHUUnits(we);
  chuPoolMode = true; chuPoolPhase = 1; chuPendingPoolUpId = null; chuPendingPoolDownId = null;
  startCHUSplit();
  setMapHint('Draw the <b>first boundary</b> of the pool — click across the channel');
}

function startCHUSplit() {
  var we = getActiveWE(); if (!we) return;
  if (!getCHUChannelPts(we)) {
    setMapHint('No primary channel area — complete steps 8 & 9 (draw channel and enter width) first.');
    setTimeout(function(){setMapHint('');}, 3000);
    return;
  }
  if (lineEditing) cancelLineEdit();
  ppDrawing = null; sowDrawing = null; pendingStructPoint = null;
  chuDrawing = true; chuDrawPts = [];
  document.getElementById('mapwrap').classList.add('drawing');
  setMapHint('Click anywhere across the channel to place a split line.');
  var btn = document.getElementById('chu-draw-btn');
  if (btn) btn.classList.add('active');
}

function cancelCHUSplit() {
  chuDrawing = false; chuDrawPts = [];
  clearPreview();
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('');
  var btn = document.getElementById('chu-draw-btn');
  if (btn) btn.classList.remove('active');
}

// Build a perpendicular split line across the channel polygon at latlng,
// based on the nearest reach segment direction
function chuPerpendicularLine(latlng, we) {
  // Use primary channel for cut direction; fall back to pre-project reach
  var pcSL = getActivePC(we).sowLayers['pc-reach'];
  var reachLayer = (pcSL && pcSL.layer) ? pcSL.layer : (we.ppData['reach_len'] && we.ppData['reach_len'].layer);
  if (!reachLayer) return null;
  var reachPts = reachLayer.getLatLngs();
  if (reachPts.length && Array.isArray(reachPts[0])) reachPts = reachPts[0];
  if (reachPts.length < 2) return null;

  // Find nearest reach segment
  var bestDist = Infinity, bestA = null, bestB = null;
  for (var i = 0; i < reachPts.length - 1; i++) {
    var a = reachPts[i], b = reachPts[i+1];
    var near = nearestOnSegment(latlng, a, b);
    var d = Math.sqrt(Math.pow(latlng.lat-near.lat,2)+Math.pow(latlng.lng-near.lng,2));
    if (d < bestDist) { bestDist = d; bestA = a; bestB = b; }
  }
  if (!bestA) return null;

  // Snap to the nearest point on the reach segment
  var snapped = nearestOnSegment(latlng, bestA, bestB);

  // Perpendicular direction in lat/lng space (corrected for longitude scaling)
  var toRad = function(x){return x*Math.PI/180;};
  var midLat = (bestA.lat + bestB.lat) / 2;
  var cosLat = Math.cos(toRad(midLat));
  var dLat = bestB.lat - bestA.lat;
  var dLng = (bestB.lng - bestA.lng) * cosLat;
  var len = Math.sqrt(dLat*dLat + dLng*dLng);
  if (len < 1e-10) return null;
  var perpLat = -dLng / len;
  var perpLng =  dLat / len / cosLat;

  // Extension: use primary channel width if available, else pre-project ch_width
  var chAvgWidthM = (getActivePC(we).inputVals['pc-width'] > 0)
    ? getActivePC(we).inputVals['pc-width'] / 3.28084
    : ppMultiAvgM(we, 'ch_width');
  var chD2 = (getActivePC(we).sowLayers['pc-area']) || we.ppData['area_ch'];
  var chHalfWidthDeg = 0.001; // fallback ~100m
  if (chAvgWidthM) {
    var toRad2 = function(x){return x*Math.PI/180;};
    chHalfWidthDeg = (chAvgWidthM / 2 * 4) / 111320; // 4x channel half-width in degrees
  } else if (chD2 && (chD2.bufferLayer || chD2.layer)) {
    var chLls2 = (chD2.bufferLayer || chD2.layer).getLatLngs();
    var chPts2 = (chLls2.length && Array.isArray(chLls2[0])) ? chLls2[0] : chLls2;
    var chLats = chPts2.map(function(p){return p.lat;});
    var chLngs = chPts2.map(function(p){return p.lng;});
    chHalfWidthDeg = Math.min(
      Math.max.apply(null,chLats)-Math.min.apply(null,chLats),
      Math.max.apply(null,chLngs)-Math.min.apply(null,chLngs)
    ) * 1.5;
  }
  var ext = chHalfWidthDeg;

  return [
    L.latLng(snapped.lat + perpLat * ext, snapped.lng + perpLng * ext),
    L.latLng(snapped.lat - perpLat * ext, snapped.lng - perpLng * ext)
  ];
}

function chuMapMove(latlng) {
  var we = getActiveWE(); if (!we || !chuDrawing) return;
  clearPreview();
  var line = chuPerpendicularLine(latlng, we);
  if (line) {
    drawPreview = L.polyline(line, {color:'#ff3333', weight:2.5, dashArray:'6,4', interactive:false}).addTo(map);
  }
}

function chuMapClick(latlng) {
  var we = getActiveWE(); if (!we || !chuDrawing) return;
  var line = chuPerpendicularLine(latlng, we);
  if (!line) return;
  var finalPts = line.slice();
  commitCHUSplit(we, finalPts);
}

function chuMapDbl(latlng) {
  // No-op for single-click mode — dblclick handled by click
}

function updateCHUPreview() {
  // No-op — preview handled in chuMapMove
}

// Snap a latlng to nearest point on the area_ch polygon boundary if within snapPx pixels
function snapToCHUBoundary(latlng, we) {
  var pts = getCHUChannelPts(we); if (!pts || pts.length < 2) return latlng;
  var snapDist = chuSnapDist;
  var best = null, bestPx = snapDist;
  for (var i = 0; i < pts.length; i++) {
    var j = (i + 1) % pts.length;
    var candidate = nearestOnSegment(latlng, pts[i], pts[j]);
    var pxDist = map.latLngToLayerPoint(latlng).distanceTo(map.latLngToLayerPoint(candidate));
    if (pxDist < bestPx) { bestPx = pxDist; best = candidate; }
  }
  return best || latlng;
}

function nearestOnSegment(p, a, b) {
  var dx = b.lng - a.lng, dy = b.lat - a.lat;
  var len2 = dx*dx + dy*dy;
  if (len2 === 0) return a;
  var t = ((p.lng - a.lng)*dx + (p.lat - a.lat)*dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return L.latLng(a.lat + t*dy, a.lng + t*dx);
}

// Core polygon split algorithm
function splitPolyWithLine(poly, line) {
  function segIntersect(p1, p2, p3, p4) {
    var d1 = {lat: p2.lat-p1.lat, lng: p2.lng-p1.lng};
    var d2 = {lat: p4.lat-p3.lat, lng: p4.lng-p3.lng};
    var cross = d1.lat*d2.lng - d1.lng*d2.lat;
    if (Math.abs(cross) < 1e-12) return null;
    var t = ((p3.lat-p1.lat)*d2.lng - (p3.lng-p1.lng)*d2.lat) / cross;
    var u = ((p3.lat-p1.lat)*d1.lng - (p3.lng-p1.lng)*d1.lat) / cross;
    if (t > 1e-10 && t < 1-1e-10 && u >= -1e-10 && u <= 1+1e-10)
      return {lat: p1.lat + t*d1.lat, lng: p1.lng + t*d1.lng, t: t, u: u};
    return null;
  }
  var ixs = [];
  for (var ls = 0; ls < line.length-1; ls++) {
    for (var i = 0; i < poly.length; i++) {
      var j = (i+1) % poly.length;
      var ix = segIntersect(line[ls], line[ls+1], poly[i], poly[j]);
      if (ix) { ix.edgeIdx = i; ix.lineSegIdx = ls; ixs.push(ix); }
    }
  }
  if (ixs.length < 2) return null;
  ixs.sort(function(a,b){ return a.edgeIdx !== b.edgeIdx ? a.edgeIdx - b.edgeIdx : a.t - b.t; });
  var A = ixs[0], B = ixs[ixs.length-1];
  // chord from A to B (including interior line vertices)
  var chord = [L.latLng(A.lat, A.lng)];
  for (var ls2 = A.lineSegIdx+1; ls2 <= B.lineSegIdx; ls2++) chord.push(L.latLng(line[ls2].lat, line[ls2].lng));
  chord.push(L.latLng(B.lat, B.lng));
  var chordRev = chord.slice().reverse();
  // poly1: A -> walk ring -> B -> chordRev
  var p1 = [L.latLng(A.lat, A.lng)];
  var idx = (A.edgeIdx+1) % poly.length, safety = 0;
  while (idx !== (B.edgeIdx+1) % poly.length && safety++ < poly.length+2) {
    p1.push(L.latLng(poly[idx].lat, poly[idx].lng)); idx = (idx+1) % poly.length;
  }
  p1.push(L.latLng(B.lat, B.lng));
  chordRev.slice(1).forEach(function(p){ p1.push(p); });
  // poly2: B -> walk ring -> A -> chord
  var p2 = [L.latLng(B.lat, B.lng)];
  idx = (B.edgeIdx+1) % poly.length; safety = 0;
  while (idx !== (A.edgeIdx+1) % poly.length && safety++ < poly.length+2) {
    p2.push(L.latLng(poly[idx].lat, poly[idx].lng)); idx = (idx+1) % poly.length;
  }
  p2.push(L.latLng(A.lat, A.lng));
  chord.slice(1).forEach(function(p){ p2.push(p); });
  return [p1, p2];
}

function commitCHUSplit(we, line) {
  cancelCHUSplit();
  if (!line || line.length < 2) return;
  if (getActivePC(we).chuUnits.length === 0) {
    var chPts = getCHUChannelPts(we);
    if (!chPts) return;
    getActivePC(we).chuUnits = [{id:'chu-0', type:'riffle', pts:chPts.map(function(p){return L.latLng(p.lat,p.lng);}), layer:null, areaM2:0, lengthM:0}];
  }

  // Extend the split line beyond the polygon in both directions so the user
  // doesn't need to draw exactly to the edge — just roughly across
  function extendLine(pts) {
    if (pts.length < 2) return pts;
    var first = pts[0], second = pts[1];
    var last = pts[pts.length-1], prev = pts[pts.length-2];
    // Compute bbox of all chuUnits to determine extension amount
    var allLats = [], allLngs = [];
    getActivePC(we).chuUnits.forEach(function(u){ u.pts.forEach(function(p){ allLats.push(p.lat); allLngs.push(p.lng); }); });
    var ext = Math.max(
      Math.max.apply(null,allLats) - Math.min.apply(null,allLats),
      Math.max.apply(null,allLngs) - Math.min.apply(null,allLngs)
    ) * 2 + 0.001;
    function extPt(from, toward, dist) {
      var dLat = from.lat - toward.lat, dLng = from.lng - toward.lng;
      var len = Math.sqrt(dLat*dLat + dLng*dLng);
      if (len < 1e-10) return from;
      return L.latLng(from.lat + (dLat/len)*dist, from.lng + (dLng/len)*dist);
    }
    var startExt = extPt(first, second, ext);
    var endExt   = extPt(last, prev, ext);
    return [startExt].concat(pts).concat([endExt]);
  }

  var extLine = extendLine(line);
  // find unit whose polygon the line intersects
  var splitIdx = -1, splitResult = null;
  for (var i = 0; i < getActivePC(we).chuUnits.length; i++) {
    var res = splitPolyWithLine(getActivePC(we).chuUnits[i].pts, extLine);
    if (res) { splitIdx = i; splitResult = res; break; }
  }
  if (splitIdx === -1) {
    setMapHint('Split line did not cross any channel unit — try extending it further.'); 
    setTimeout(function(){setMapHint('');}, 3000);
    return;
  }
  // save undo state
  getActivePC(we)._chuUndo = getActivePC(we).chuUnits.map(function(u){ return {id:u.id,type:u.type,pts:u.pts.slice(),layer:u.layer,areaM2:u.areaM2,lengthM:u.lengthM}; });
  // remove old unit layer and label
  if (getActivePC(we).chuUnits[splitIdx].layer) map.removeLayer(getActivePC(we).chuUnits[splitIdx].layer);
  if (getActivePC(we).chuUnits[splitIdx].labelMarker) map.removeLayer(getActivePC(we).chuUnits[splitIdx].labelMarker);
  var ts = Date.now();
  var newUnits = [
    {id:'chu-'+ts+'a', type: getActivePC(we).chuUnits[splitIdx].type, pts: splitResult[0], layer:null, labelMarker:null, areaM2:0, lengthM:0},
    {id:'chu-'+ts+'b', type: getActivePC(we).chuUnits[splitIdx].type, pts: splitResult[1], layer:null, labelMarker:null, areaM2:0, lengthM:0}
  ];
  // Sort so the topmost (highest lat) or leftmost (lowest lng) piece comes first
  function polyCenter(pts) {
    var lats = pts.map(function(p){return p.lat;}), lngs = pts.map(function(p){return p.lng;});
    return {
      lat: (Math.min.apply(null,lats)+Math.max.apply(null,lats))/2,
      lng: (Math.min.apply(null,lngs)+Math.max.apply(null,lngs))/2
    };
  }
  var c0 = polyCenter(newUnits[0].pts), c1 = polyCenter(newUnits[1].pts);
  // Primary sort: top (higher lat) first; secondary: left (lower lng) first
  var latDiff = Math.abs(c0.lat - c1.lat), lngDiff = Math.abs(c0.lng - c1.lng);
  if (latDiff >= lngDiff) {
    if (c0.lat < c1.lat) newUnits.reverse(); // c1 is higher, should be first
  } else {
    if (c0.lng > c1.lng) newUnits.reverse(); // c1 is further left, should be first
  }
  // Capture ID before splice (indices shift after)
  var splitUnitId = getActivePC(we).chuUnits[splitIdx] ? getActivePC(we).chuUnits[splitIdx].id : null;
  getActivePC(we).chuUnits.splice(splitIdx, 1, newUnits[0], newUnits[1]);

  if (chuPoolMode) {
    if (chuPoolPhase === 1) {
      // First boundary drawn — store both piece IDs; user may draw second in either direction
      chuPendingPoolUpId   = newUnits[0].id;
      chuPendingPoolDownId = newUnits[1].id;
      chuPoolPhase = 2;
      // Stay in drawing mode for second boundary
      chuDrawing = true; chuDrawPts = [];
      document.getElementById('mapwrap').classList.add('drawing');
      setMapHint('Now draw the <b>second boundary</b> of the pool — click across the channel');
      renderCHUUnits(we); wizardRefreshIfActive();
      return;
    } else if (chuPoolPhase === 2) {
      // Second boundary splits one of the two candidates.
      // The pool is the piece between the two split lines:
      //   • if the downstream candidate was split → pool = upstream piece of that split (newUnits[0])
      //   • if the upstream candidate was split   → pool = downstream piece of that split (newUnits[1])
      if (splitUnitId === chuPendingPoolDownId) {
        newUnits[0].type = 'pool';
      } else if (splitUnitId === chuPendingPoolUpId) {
        newUnits[1].type = 'pool';
      }
      chuPoolMode = false; chuPoolPhase = 0; chuPendingPoolUpId = null; chuPendingPoolDownId = null;
    }
  }
  renderCHUUnits(we);
  wizardRefreshIfActive();
}

function undoCHUSplit() {
  var we = getActiveWE(); if (!we || !getActivePC(we)._chuUndo) return;
  getActivePC(we).chuUnits.forEach(function(u){ if(u.layer) map.removeLayer(u.layer); if(u.labelMarker) map.removeLayer(u.labelMarker); });
  getActivePC(we).chuUnits = getActivePC(we)._chuUndo;
  getActivePC(we)._chuUndo = null;
  getActivePC(we).chuUnits.forEach(function(u){ u.layer = null; u.labelMarker = null; });
  renderCHUUnits(we);
}

function resetCHU() {
  var we = getActiveWE(); if (!we) return;
  getActivePC(we).chuUnits.forEach(function(u){ if(u.layer) map.removeLayer(u.layer); if(u.labelMarker) map.removeLayer(u.labelMarker); });
  getActivePC(we).chuUnits = [];
  getActivePC(we)._chuUndo = null;
  renderCHUUnits(we);
}

function setCHUBoulders(id, val) {
  var we = getActiveWE(); if (!we) return;
  var u = getActivePC(we).chuUnits.filter(function(x){ return x.id === id; })[0]; if (!u) return;
  u.boulders = parseInt(val, 10) || 0;
  updateCHUSummary(we);
}

function setCHUPoolDepth(id, val) {
  var we = getActiveWE(); if (!we) return;
  var u = getActivePC(we).chuUnits.filter(function(x){ return x.id === id; })[0]; if (!u) return;
  u.poolDepth = parseFloat(val) || 0;
  updateCHUSummary(we);
}

function setCHUType(id, type) {
  var we = getActiveWE(); if (!we) return;
  var units = getActivePC(we).chuUnits;
  var idx = -1;
  units.forEach(function(u, i){ if (u.id === id) idx = i; });
  if (idx < 0) return;
  // Toggle off if same type clicked again
  if (units[idx].type === type) {
    units.forEach(function(u){ u.type = null; });
  } else {
    var cycleIdx = CHU_CYCLE.indexOf(type);
    units.forEach(function(u, i) {
      var offset = ((i - idx) % CHU_CYCLE.length + CHU_CYCLE.length) % CHU_CYCLE.length;
      u.type = CHU_CYCLE[(cycleIdx + offset) % CHU_CYCLE.length];
    });
  }
  units.forEach(function(u) {
    if (u.layer) u.layer.setStyle({color: CHU_COLOR[u.type||'unassigned'], fillColor: CHU_COLOR[u.type||'unassigned']});
  });
  renderCHUUnits(we);
}

function chuBBoxLength(pts) {
  // Longest axis of the bounding box as approximate unit length
  if (!pts || pts.length < 2) return 0;
  var lats = pts.map(function(p){return p.lat;}), lngs = pts.map(function(p){return p.lng;});
  var minLat = Math.min.apply(null,lats), maxLat = Math.max.apply(null,lats);
  var minLng = Math.min.apply(null,lngs), maxLng = Math.max.apply(null,lngs);
  var R = 6378137, toRad = function(d){return d*Math.PI/180;};
  var midLat = (minLat+maxLat)/2;
  var hM = (maxLat-minLat) * (Math.PI/180) * R;
  var wM = (maxLng-minLng) * Math.cos(toRad(midLat)) * (Math.PI/180) * R;
  return Math.max(hM, wM);
}

function chuCentroid(pts) {
  // Scan horizontal lines through the bbox, return midpoint of the longest interior chord
  var lats = pts.map(function(p){return p.lat;});
  var lngs = pts.map(function(p){return p.lng;});
  var minLat = Math.min.apply(null,lats), maxLat = Math.max.apply(null,lats);
  var bestLen = -1, bestLat = (minLat+maxLat)/2, bestLng = (Math.min.apply(null,lngs)+Math.max.apply(null,lngs))/2;
  var steps = 32;
  for (var s = 1; s < steps; s++) {
    var y = minLat + (maxLat - minLat) * s / steps;
    var xs = [];
    for (var i = 0; i < pts.length; i++) {
      var j = (i+1) % pts.length;
      var y1 = pts[i].lat, y2 = pts[j].lat;
      if ((y1 <= y && y2 > y) || (y2 <= y && y1 > y)) {
        xs.push(pts[i].lng + (y - y1) * (pts[j].lng - pts[i].lng) / (y2 - y1));
      }
    }
    xs.sort(function(a,b){return a-b;});
    for (var k = 0; k+1 < xs.length; k+=2) {
      var len = xs[k+1] - xs[k];
      if (len > bestLen) { bestLen = len; bestLat = y; bestLng = (xs[k]+xs[k+1])/2; }
    }
  }
  return L.latLng(bestLat, bestLng);
}

function renderCHUUnits(we) {
  var poolNum = 0, riffleNum = 0;
  getActivePC(we).chuUnits.forEach(function(u) {
    var col = CHU_COLOR[u.type || 'unassigned'];
    if (u.layer) map.removeLayer(u.layer);
    if (u.labelMarker) { map.removeLayer(u.labelMarker); u.labelMarker = null; }
    u.areaM2 = geoAreaM2(u.pts);
    u.lengthM = chuBBoxLength(u.pts);
    var typeLabel;
    if (u.type === 'pool') { poolNum++; typeLabel = 'Pool ' + poolNum; }
    else { riffleNum++; typeLabel = 'Riffle ' + riffleNum; }
    u._displayLabel = typeLabel;
    u.layer = L.polygon(u.pts, {color:col, fillColor:col, fillOpacity:0.25, weight:2, interactive:true})
      .bindTooltip(typeLabel + ' — ' + (u.areaM2*0.000247105).toFixed(3)+' ac')
      .addTo(map);
    var icon = L.divIcon({
      className: '',
      iconSize: null,
      iconAnchor: null,
      html: '<div style="background:'+col+';color:#fff;font-size:11px;font-weight:700;padding:3px 9px;border-radius:12px;border:1.5px solid rgba(255,255,255,0.6);white-space:nowrap;box-shadow:0 1px 5px rgba(0,0,0,.5);pointer-events:none;transform:translate(-50%,-50%)">'+typeLabel+'</div>'
    });
    // During pool identification, only show labels for pool units — riffle labels add noise
    var identifyingPools = wizardMode && (function(){
      var vis = getVisibleSteps(); var s = vis[wizardStep]; return s && s.id === 'chu_split';
    })();
    if (!identifyingPools || u.type === 'pool') {
      u.labelMarker = L.marker(chuCentroid(u.pts), {icon:icon, interactive:false, zIndexOffset:100});
      if (labelsVisible) u.labelMarker.addTo(map);
    }
  });
  var el = document.getElementById('chu-units-list'); if (!el) return;
  if (getActivePC(we).chuUnits.length === 0) { el.innerHTML = '<div style="font-size:11px;color:#556;font-style:italic">No splits yet — draw a split line to begin.</div>'; updateCHUSummary(we); return; }
  el.innerHTML = '';
  getActivePC(we).chuUnits.forEach(function(u, i) {
    var typeClass = u.type || 'unassigned';
    var areaAc = (u.areaM2*0.000247105).toFixed(3);
    var lenFt = Math.round(u.lengthM * 3.28084).toLocaleString();
    var div = document.createElement('div');
    div.className = 'chu-unit ' + typeClass;
    div.innerHTML =
      '<div style="display:flex;align-items:center;gap:8px;width:100%;flex-wrap:wrap">'+
      '<div style="font-size:11px;color:#c8d4df;font-weight:600;min-width:50px">Unit '+(i+1)+'</div>'+
      '<div style="display:flex;gap:4px;">'+
      '<button class="chu-type-btn'+(u.type==='riffle'?' active-riffle':'')+'" onclick="setCHUType(&apos;'+u.id+'&apos;,&apos;riffle&apos;)">Riffle</button>'+
      '<button class="chu-type-btn'+(u.type==='pool'?' active-pool':'')+'" onclick="setCHUType(&apos;'+u.id+'&apos;,&apos;pool&apos;)">Pool</button>'+
      '<button class="chu-type-btn'+(u.type==='glide'?' active-glide':'')+'" onclick="setCHUType(&apos;'+u.id+'&apos;,&apos;glide&apos;)">Glide</button>'+
      '<button class="chu-type-btn'+(u.type==='run'?' active-run':'')+'" onclick="setCHUType(&apos;'+u.id+'&apos;,&apos;run&apos;)">Run</button>'+
      '</div>'+
      '<div class="chu-unit-info" style="margin-left:auto">'+areaAc+' ac &nbsp;·&nbsp; ~'+lenFt+' ft</div>'+
      '</div>'+
      (u.type==='riffle' ? '<div style="display:flex;align-items:center;gap:5px;margin-top:5px;padding-top:5px;border-top:1px solid rgba(255,255,255,0.15);width:100%"><label style="font-size:11px;color:rgba(255,255,255,0.7);white-space:nowrap">Boulders:</label><input type="number" min="0" style="width:60px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:2px 5px;border-radius:3px;font-size:11px" value="'+(u.boulders||'')+'" placeholder="0" oninput="setCHUBoulders(\''+u.id+'\',this.value)"></div>' : '')+
      (u.type==='pool' ? '<div style="display:flex;align-items:center;gap:5px;margin-top:5px;padding-top:5px;border-top:1px solid rgba(255,255,255,0.15);width:100%"><label style="font-size:11px;color:rgba(255,255,255,0.7);white-space:nowrap">Avg depth at low flow (ft):</label><input type="number" min="0" step="0.1" style="width:60px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:2px 5px;border-radius:3px;font-size:11px" value="'+(u.poolDepth||'')+'" placeholder="0.0" oninput="setCHUPoolDepth(\''+u.id+'\',this.value)"></div>' : '');
    el.appendChild(div);
  });
  updateCHUSummary(we);
  updateCHUCalcFields(we);
}

function updateCHUSummary(we) {
  var el = document.getElementById('chu-summary'); if (!el) return;
  var riffles    = getActivePC(we).chuUnits.filter(function(u){return u.type==='riffle';});
  var pools      = getActivePC(we).chuUnits.filter(function(u){return u.type==='pool';});
  var glides     = getActivePC(we).chuUnits.filter(function(u){return u.type==='glide';});
  var runs       = getActivePC(we).chuUnits.filter(function(u){return u.type==='run';});
  var unassigned = getActivePC(we).chuUnits.filter(function(u){return !u.type;});
  if (!getActivePC(we).chuUnits.length) { el.innerHTML=''; return; }
  var rArea = riffles.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105;
  var pArea = pools.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105;
  var rLen  = riffles.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
  var pLen  = pools.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
  var gLen  = glides.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
  var rnLen = runs.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
  var gArea = glides.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105;
  var rnArea= runs.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105;
  var totalBoulders = riffles.reduce(function(a,u){return a+(u.boulders||0);},0);
  var poolDepths = pools.filter(function(u){return u.poolDepth;}).map(function(u){return u.poolDepth;});
  var avgPoolDepth = poolDepths.length ? (poolDepths.reduce(function(a,v){return a+v;},0)/poolDepths.length).toFixed(1) : null;
  el.innerHTML =
    '<div style="color:#7ab8df;font-weight:700;margin-bottom:4px">CHU Summary</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px 12px;font-size:10px;color:#c8d4df">'+
    '<div style="color:var(--msow-helper-text,#7a96b0)">Type</div><div style="color:var(--msow-helper-text,#7a96b0)">Count</div><div style="color:var(--msow-helper-text,#7a96b0)">Area / Length</div>'+
    (riffles.length?'<div style="color:#7ab8df">Riffles</div><div>'+riffles.length+'</div><div>'+rArea.toFixed(3)+' ac · ~'+Math.round(rLen).toLocaleString()+' ft</div>':'')+ 
    (riffles.length&&totalBoulders?'<div style="color:#7ab8df;padding-left:8px">↳ Boulders</div><div>'+totalBoulders+'</div><div></div>':'')+
    (pools.length?'<div style="color:#b07bdf">Pools</div><div>'+pools.length+'</div><div>'+pArea.toFixed(3)+' ac · ~'+Math.round(pLen).toLocaleString()+' ft</div>':'')+
    (avgPoolDepth?'<div style="color:#b07bdf;padding-left:8px">↳ Avg depth</div><div>'+avgPoolDepth+' ft</div><div></div>':'')+
    (glides.length?'<div style="color:#5ddba5">Glides</div><div>'+glides.length+'</div><div>'+gArea.toFixed(3)+' ac · ~'+Math.round(gLen).toLocaleString()+' ft</div>':'')+
    (runs.length?'<div style="color:#e0a050">Runs</div><div>'+runs.length+'</div><div>'+rnArea.toFixed(3)+' ac · ~'+Math.round(rnLen).toLocaleString()+' ft</div>':'')+
    (unassigned.length?'<div style="color:#e07b28">Unassigned</div><div>'+unassigned.length+'</div><div>—</div>':'')+
    '</div>';
}

function updateCHUCalcFields(we) {
  // stub — updates the SOW calc display fields for riffle/pool counts and areas
  // (these replace the old manual fInput fields)
}

var reachAutoDetecting = false;
var reachAutoLayers = []; // temp highlight layers for detected streams

function startReachAutoDetect() {
  var we = getActiveWE(); if (!we) return;
  if (lineEditing) cancelLineEdit();
  // Cancel any in-progress manual draw fully — nulling the flags alone leaves stale
  // clicked vertices and a dangling preview line on the map (same class of bug fixed
  // for the wetland step's Auto-Detect/+Add conflict).
  ppDrawing = null; sowDrawing = null; chuDrawing = false;
  drawPts = []; clearPreview();
  document.querySelectorAll('.draw-btn').forEach(function(b){b.classList.remove('active');});
  // Clear any existing manually-drawn reach before re-detecting
  if (!we.ppData['reach_len']) we.ppData['reach_len'] = {};
  var rd = we.ppData['reach_len'];
  if (rd.layer) { map.removeLayer(rd.layer); rd.layer = null; rd.valueM = 0; }
  clearFlowArrows(rd);
  reachAutoDetecting = true;
  rd._autoDetecting = true;
  rd._autoResults = null;
  document.getElementById('mapwrap').classList.add('drawing');
  setMapHint('Loading NHD streams...');
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  renderPMRow(m); rerenderCalcs();
  loadNHDPreview();
}

// Pre-load NHD flowlines as clickable vector lines in the current map view.
// When the user clicks one, we know exactly which feature they want.
var nhdPreviewLayer = null;
var nhdPreviewData = null; // full feature set from the preview query

// Approximate centerline of a river polygon.
// Strategy: sort the ring vertices by their position along the principal axis,
// split into two halves (the two banks), then pair opposite vertices and take midpoints.
function polygonCenterline(geometry) {
  if (!geometry || !geometry.rings || !geometry.rings.length) return null;
  var ring = geometry.rings[0];
  if (ring.length < 6) return null;

  // Remove closing duplicate vertex if present
  var pts = ring.slice();
  if (pts.length > 1) {
    var first = pts[0], last = pts[pts.length-1];
    if (Math.abs(first[0]-last[0]) < 1e-8 && Math.abs(first[1]-last[1]) < 1e-8) {
      pts = pts.slice(0, pts.length-1);
    }
  }

  // Find principal axis direction using bounding box
  var lngs = pts.map(function(p){ return p[0]; });
  var lats = pts.map(function(p){ return p[1]; });
  var minLng = Math.min.apply(null,lngs), maxLng = Math.max.apply(null,lngs);
  var minLat = Math.min.apply(null,lats), maxLat = Math.max.apply(null,lats);
  var lngRange = maxLng - minLng, latRange = maxLat - minLat;

  // Project each vertex onto the principal axis to get a scalar position
  var axisLng = lngRange >= latRange ? 1 : 0;
  var axisLat = lngRange >= latRange ? 0 : 1;

  // Sort vertices by position along principal axis
  var indexed = pts.map(function(p, i) {
    return {i: i, lng: p[0], lat: p[1], pos: p[0]*axisLng + p[1]*axisLat};
  });
  indexed.sort(function(a,b){ return a.pos - b.pos; });

  // Split the ring into two banks by walking from min-end to max-end
  // The ring visits one bank then the other — find the split points
  // (the indices of the two extreme vertices in the original ring order)
  var minIdx = indexed[0].i;
  var maxIdx = indexed[indexed.length-1].i;

  // Walk from minIdx to maxIdx in both directions around the ring
  var n = pts.length;
  var bank1 = [], bank2 = [];
  var i = minIdx;
  while (i !== maxIdx) {
    bank1.push({lng: pts[i][0], lat: pts[i][1]});
    i = (i + 1) % n;
  }
  bank1.push({lng: pts[maxIdx][0], lat: pts[maxIdx][1]});

  i = minIdx;
  while (i !== maxIdx) {
    bank2.push({lng: pts[i][0], lat: pts[i][1]});
    i = (i - 1 + n) % n;
  }
  bank2.push({lng: pts[maxIdx][0], lat: pts[maxIdx][1]});

  if (bank1.length < 2 || bank2.length < 2) return null;

  // Resample both banks to N points, then pair and midpoint
  var N = 30;
  function resample(bank, n) {
    if (bank.length === 1) {
      var out = []; for (var k=0;k<n;k++) out.push(bank[0]); return out;
    }
    // Compute cumulative length
    var cumLen = [0];
    for (var j = 1; j < bank.length; j++) {
      var dx = bank[j].lng - bank[j-1].lng, dy = bank[j].lat - bank[j-1].lat;
      cumLen.push(cumLen[j-1] + Math.sqrt(dx*dx + dy*dy));
    }
    var total = cumLen[cumLen.length-1];
    var result = [];
    for (var k = 0; k < n; k++) {
      var target = total * k / (n-1);
      // Find segment
      var seg = 0;
      while (seg < cumLen.length-2 && cumLen[seg+1] < target) seg++;
      var segLen = cumLen[seg+1] - cumLen[seg];
      var t = segLen > 0 ? (target - cumLen[seg]) / segLen : 0;
      result.push({
        lng: bank[seg].lng + t*(bank[seg+1].lng - bank[seg].lng),
        lat: bank[seg].lat + t*(bank[seg+1].lat - bank[seg].lat)
      });
    }
    return result;
  }

  var b1 = resample(bank1, N);
  var b2 = resample(bank2, N);

  var centerline = [];
  for (var k = 0; k < N; k++) {
    centerline.push(L.latLng(
      (b1[k].lat + b2[k].lat) / 2,
      (b1[k].lng + b2[k].lng) / 2
    ));
  }
  return centerline;
}

function clearNHDPreview() {
  nhdPreviewLayer = null;
  nhdPreviewData = null;
}

function loadNHDPreview() {
  clearNHDPreview();
  var zoom = map.getZoom();
  // Only pre-load vectors at zoom 12+; at lower zoom the envelope is too large
  // and the 3DHP service returns too many (or no) features
  if (zoom < 11) {
    setMapHint('Zoom in to level 11+ (currently '+zoom+'), then click Auto-detect again');
    return;
  }
  var bounds = map.getBounds();
  var toRad = function(d){ return d*Math.PI/180; };
  var R = 6378137;
  var toMerc = function(lat, lng) {
    return [R*toRad(lng), R*Math.log(Math.tan(Math.PI/4+toRad(lat)/2))];
  };
  var sw = toMerc(bounds.getSouth(), bounds.getWest());
  var ne = toMerc(bounds.getNorth(), bounds.getEast());
  var env = sw[0]+','+sw[1]+','+ne[0]+','+ne[1];

  var url = 'https://3dhp.nationalmap.gov/arcgis/rest/services/usgs_3dhp_all/FeatureServer/50/query?' +
    'geometry='+encodeURIComponent(env)+
    '&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects' +
    '&where=featuretype+IN+(1,2,3)' +
    '&outFields=gnisidlabel,featuretype,mainstemid&returnGeometry=true&outSR=4326&f=json';

  // Also query waterbody polygons — wide rivers have no flowlines, only a polygon
  var wbUrl = 'https://3dhp.nationalmap.gov/arcgis/rest/services/usgs_3dhp_all/FeatureServer/60/query?' +
    'geometry='+encodeURIComponent(env)+
    '&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects' +
    '&outFields=gnisidlabel&returnGeometry=true&outSR=4326&f=json';

  // Each fetch swallows its own failure into an empty-features fallback (so one bad
  // service doesn't kill the other), but tags _failed so the combined handler below can
  // still tell "genuinely no candidates nearby" apart from "couldn't reach the service".
  Promise.all([
    fetch(url).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).catch(function(){ return {features:[], _failed:true}; }),
    fetch(wbUrl).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).catch(function(){ return {features:[], _failed:true}; })
  ]).then(function(results) {
    if (!reachAutoDetecting) return;
    var data = results[0], wbData = results[1];
    var anyFailed = data._failed || wbData._failed || data.error || wbData.error;
    if (data.error) { data = {features:[]}; }
    if (wbData.error) { wbData = {features:[]}; }

    var layers = [];
    var wbLayers = []; // waterbody layers added last so they're on top
    nhdPreviewData = data;

    // Draw flowlines
    if (data.features && data.features.length) {
      data.features.forEach(function(feat) {
        if (!feat.geometry || !feat.geometry.paths) return;
        feat.geometry.paths.forEach(function(path) {
          var pts = path.map(function(c){ return L.latLng(c[1],c[0]); });
          var isMajor = feat.attributes.featuretype === 3;
          var lyr = L.polyline(pts, {
            color: isMajor ? '#1a9abf' : '#4a8abf',
            weight: isMajor ? 5 : 3,
            opacity: 0.7, interactive: false
          });
          layers.push(lyr);
          // Invisible, much wider companion carries the actual hover/click — the
          // thin visible line above is too precise a target to click reliably.
          var hitLyr = L.polyline(pts, {weight: 20, opacity: 0.001, interactive: true});
          hitLyr.bindTooltip(feat.attributes.gnisidlabel || 'Unnamed stream', {sticky: true});
          hitLyr.on('click', function(e) {
            L.DomEvent.stop(e);
            if (!reachAutoDetecting) return;
            reachAutoClickFeature(feat, e.latlng);
          });
          layers.push(hitLyr);
        });
      });
    }

    // Draw waterbody polygons as clickable filled areas.
    // Skip polygons whose bounding box exceeds 1.0° in BOTH dimensions (truly watershed-scale).
    var MAX_WB_DEGREES = 1.0;
    if (wbData.features && wbData.features.length) {
      wbData.features.forEach(function(wb) {
        if (!wb.geometry || !wb.geometry.rings) return;
        var ring = wb.geometry.rings[0];
        if (!ring || ring.length < 3) return;
        var wbLabel = wb.attributes.gnisidlabel || 'River/Lake';
        // Skip truly oversized polygons (watershed-scale)
        var wlngs = ring.map(function(c){return c[0];}), wlats = ring.map(function(c){return c[1];});
        var wlngR = Math.max.apply(null,wlngs)-Math.min.apply(null,wlngs);
        var wlatR = Math.max.apply(null,wlats)-Math.min.apply(null,wlats);
        if (wlngR > MAX_WB_DEGREES && wlatR > MAX_WB_DEGREES) return; // skip only if BOTH exceed

        var synthFeat = {
          attributes: {gnisidlabel: wbLabel, featuretype: 1, mainstemid: ''},
          geometry: {paths: [ring]},
          _clickOverride: true,
          _wbGeometry: wb.geometry
        };

        var polyPts = ring.map(function(c){ return L.latLng(c[1],c[0]); });

        // Visible outline
        var outlineLyr = L.polygon(polyPts, {
          color: '#00d4ff', weight: 2, opacity: 0.7,
          fillColor: '#00d4ff', fillOpacity: 0.08,
          interactive: false
        });
        wbLayers.push(outlineLyr);

        // Transparent filled polygon as hit zone — clickable anywhere inside
        var hitLyr = L.polygon(polyPts, {
          color: '#00d4ff', weight: 0, opacity: 0,
          fillColor: '#00d4ff', fillOpacity: 0.001,
          interactive: true
        });
        hitLyr.bindTooltip(wbLabel + ' — wide river (click to select)', {sticky: true});
        hitLyr.on('click', function(e) {
          L.DomEvent.stop(e);
          if (!reachAutoDetecting) return;
          reachAutoClickFeature(synthFeat, e.latlng);
        });
        wbLayers.push(hitLyr);
      });
    }

    if (!layers.length && !wbLayers.length) {
      setMapHint(anyFailed
        ? 'Couldn\'t reach the NHD stream service — it may be temporarily down. Try again shortly, or draw manually.'
        : 'Click on or near a stream to auto-detect it');
      return;
    }
    // Add each layer directly to map (not via layerGroup) so click events work reliably
    // Flowlines first, then waterbody layers on top
    layers.concat(wbLayers).forEach(function(lyr) {
      lyr.addTo(map);
      reachAutoLayers.push(lyr);
    });
    setMapHint('Click a highlighted stream to select it');
  }).catch(function(err) {
    console.warn('[NHDPreview] fetch failed:', err);
    if (!reachAutoDetecting) return;
    setMapHint('Couldn\'t reach the NHD stream service — it may be temporarily down. Try again shortly, or draw manually.');
  });
}

// Called when user clicks directly on a previewed NHD feature
function reachAutoClickFeature(feat, latlng) {
  clearNHDPreview();
  var we = getActiveWE(); if (!we) return;

  // If this is a waterbody polygon synthetic feature, derive centerline directly
  // without querying flowlines (wide rivers have none in FeatureServer/50)
  if (feat._wbGeometry) {
    clearReachAutoLayers();
    var ring = feat._wbGeometry.rings[0];
    var clickLL = L.latLng(latlng.lat, latlng.lng);
    var RADIUS_M = 3000;
    var n = ring.length;

    // Find all vertices within RADIUS_M of the click, keep the longest contiguous run
    var inRadius = ring.map(function(c) {
      return clickLL.distanceTo(L.latLng(c[1], c[0])) < RADIUS_M;
    });
    var bestStart = 0, bestLen = 0, curStart = -1, curLen = 0;
    var doubled = inRadius.concat(inRadius);
    for (var i = 0; i < doubled.length; i++) {
      if (doubled[i]) {
        if (curStart < 0) { curStart = i % n; curLen = 1; }
        else { curLen++; }
        if (curLen > bestLen && curLen <= n) { bestLen = curLen; bestStart = curStart; }
      } else {
        curStart = -1; curLen = 0;
      }
    }

    var localPts = [];
    if (bestLen >= 2) {
      for (var j = 0; j < bestLen; j++) {
        var c = ring[(bestStart + j) % n];
        localPts.push(L.latLng(c[1], c[0]));
      }
    } else {
      var withDist = ring.map(function(c, idx) {
        return {idx: idx, d: clickLL.distanceTo(L.latLng(c[1], c[0])), c: c};
      });
      withDist.sort(function(a,b){return a.d-b.d;});
      var closest = withDist.slice(0, 20);
      closest.sort(function(a,b){return a.idx-b.idx;});
      localPts = closest.map(function(x){ return L.latLng(x.c[1], x.c[0]); });
    }

    // The polygon ring visits both banks: it goes along one bank then doubles back
    // along the other. Find the turnaround point (where the path gets closest to
    // its own start) and truncate there, keeping only the first-pass bank.
    if (localPts.length > 4) {
      var startPt = localPts[0];
      var minReturnDist = Infinity, turnIdx = localPts.length;
      // Look for the point (after the first quarter) that is closest to the start
      var quarter = Math.floor(localPts.length / 4);
      for (var ti = quarter * 2; ti < localPts.length; ti++) {
        var dReturn = startPt.distanceTo(localPts[ti]);
        if (dReturn < minReturnDist) { minReturnDist = dReturn; turnIdx = ti; }
      }
      // Only truncate if the ring actually returns close to start (< 500m)
      if (minReturnDist < 500 && turnIdx < localPts.length - 2) {
        localPts = localPts.slice(0, turnIdx + 1);
      }
    }

    reachAutoDetecting = false;
    if (we.ppData['reach_len']) we.ppData['reach_len']._autoDetecting = false;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('');
    setTimeout(function(){ enterPreTrimStep(localPts, false); }, 50);
    return;
  }

  setMapHint('Querying USGS NHD streams...');
  var toRad = function(d){ return d*Math.PI/180; };
  var R = 6378137;
  var x = R * toRad(latlng.lng);
  var y = R * Math.log(Math.tan(Math.PI/4 + toRad(latlng.lat)/2));
  var buf = 3000;
  var envelope = (x-buf)+','+(y-buf)+','+(x+buf)+','+(y+buf);

  var url = 'https://3dhp.nationalmap.gov/arcgis/rest/services/usgs_3dhp_all/FeatureServer/50/query?' +
    'geometry='+encodeURIComponent(envelope)+
    '&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects' +
    '&where=featuretype+IN+(1,2,3)' +
    '&outFields=gnisidlabel,featuretype,mainstemid&returnGeometry=true&outSR=4326&f=json';

  fetch(url).then(function(r){ return r.json(); }).then(function(data) {
    clearReachAutoLayers();
    var clickedInResults = data.features && data.features.some(function(f) {
      return f.attributes.gnisidlabel === feat.attributes.gnisidlabel &&
             f.attributes.featuretype === feat.attributes.featuretype;
    });
    if (data.features && !clickedInResults) {
      data.features.unshift(feat);
    }
    if (data.features) {
      data.features.forEach(function(f) { f._clickOverride = false; });
    }
    feat._clickOverride = true;
    processAutoDetectResults(we, data, latlng, envelope, feat.attributes.gnisidlabel || '');
  }).catch(function(err) {
    console.error('reachAutoClickFeature error:', err);
    setMapHint('Error — try clicking again or draw manually.');
  });
}

function cancelReachAutoDetect() {
  reachAutoDetecting = false;
  clearNHDPreview();
  clearReachAutoLayers();
  var we = getActiveWE();
  if (we && we.ppData['reach_len']) {
    we.ppData['reach_len']._autoDetecting = false;
    we.ppData['reach_len']._autoResults = null;
  }
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('');
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  renderPMRow(m);
}

function clearReachAutoLayers() {
  reachAutoLayers.forEach(function(l){ map.removeLayer(l); });
  reachAutoLayers = [];
}

// ── Wetland auto-detect (National Wetlands Inventory) ─────────────────────
// Mirrors the NHD reach auto-detect pattern above (envelope query against a
// USGS/USFWS ArcGIS FeatureServer -> clickable preview layers -> accept into the
// app's data model) but wetlands are plain closed polygons, so there's no
// centerline/trim step — a clicked ring is committed to the pp_wetland
// multi-entry list directly, the same way a hand-drawn one would be.
var wetlandAutoDetecting = false;
var wetlandAutoLayers = []; // temp highlight layers for detected wetland candidates

// USGS NAIP imagery-year lookup — queries the USGS NAIP Plus catalog (The National
// Map) for whatever source image covers the current map center, and shows its real
// acquisition year in the bottom-right control. Only relevant while the USGS NAIP
// basemap is selected; hidden otherwise. NAIP is refreshed per state every 2-3
// years and this service keeps just the latest vintage per area (not a historical
// archive), so this is a single "as of" year, not a pickable range.
var naipYearReqSeq = 0;
function updateNaipYearDisplay() {
  var div = document.getElementById('naip-year-display');
  if (!div) return;
  if (activeBasemap !== 'USGS NAIP') { div.style.display = 'none'; return; }
  div.style.display = 'block';
  div.textContent = 'USGS NAIP imagery: loading…';
  var seq = ++naipYearReqSeq;
  var center = map.getCenter();
  var url = 'https://imagery.nationalmap.gov/arcgis/rest/services/USGSNAIPPlus/ImageServer/query?' +
    'geometry=' + encodeURIComponent(center.lng + ',' + center.lat) +
    '&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects' +
    '&where=' + encodeURIComponent('Year IS NOT NULL') +
    '&outFields=Year&returnGeometry=false&f=json';
  fetch(url).then(function(r){ return r.json(); }).then(function(data) {
    if (seq !== naipYearReqSeq) return; // a newer request superseded this one
    var years = (data.features || []).map(function(f){ return f.attributes.Year; }).filter(function(y){ return y; });
    if (!years.length) { div.textContent = 'USGS NAIP imagery: no coverage here'; return; }
    var minY = Math.min.apply(null, years), maxY = Math.max.apply(null, years);
    div.textContent = 'USGS NAIP imagery: ' + (minY === maxY ? minY : minY + '–' + maxY);
  }).catch(function() {
    if (seq !== naipYearReqSeq) return;
    div.textContent = 'USGS NAIP imagery: unavailable';
  });
}

function clearWetlandAutoLayers() {
  wetlandAutoLayers.forEach(function(l){ map.removeLayer(l); });
  wetlandAutoLayers = [];
}

function startWetlandAutoDetect() {
  var we = getActiveWE(); if (!we) return;
  // Cancel any in-progress manual polygon draw first (e.g. from "+ Add Wetland area") —
  // otherwise both modes stay active at once and the user gets stuck with no way to
  // finish either one.
  if (sowDrawing) {
    sowDrawing = null; drawPts = []; clearPreview();
    document.getElementById('mapwrap').classList.remove('drawing');
    document.querySelectorAll('.draw-btn').forEach(function(b){b.classList.remove('active');});
  }
  wetlandAutoDetecting = true;
  if (wizardMode) renderWizardStep();
  loadWetlandPreview();
}

function cancelWetlandAutoDetect() {
  wetlandAutoDetecting = false;
  clearWetlandAutoLayers();
  setMapHint('');
  if (wizardMode) renderWizardStep();
}

function loadWetlandPreview() {
  clearWetlandAutoLayers();
  var zoom = map.getZoom();
  // Same rationale as the NHD preview: below this zoom the envelope is too large
  // and the service returns too many (or zero, once past its record cap) features.
  if (zoom < 11) {
    setMapHint('Zoom in to level 11+ (currently '+zoom+'), then click Auto-Detect again');
    if (wizardMode) wizardRefreshIfActive();
    return;
  }
  var bounds = map.getBounds();
  var toRad = function(d){ return d*Math.PI/180; };
  var R = 6378137;
  var toMerc = function(lat, lng) {
    return [R*toRad(lng), R*Math.log(Math.tan(Math.PI/4+toRad(lat)/2))];
  };
  var sw = toMerc(bounds.getSouth(), bounds.getWest());
  var ne = toMerc(bounds.getNorth(), bounds.getEast());
  var env = sw[0]+','+sw[1]+','+ne[0]+','+ne[1];

  // Note: this service requires fully-qualified field names ("Wetlands.FIELD"),
  // not bare field names — a bare outFields list returns a 400 error.
  // Riverine features are the stream/river channel itself, not a pre-project
  // wetland area to preserve — exclude them so only actual wetlands show up here.
  var url = 'https://fwspublicservices.wim.usgs.gov/wetlandsmapservice/rest/services/Wetlands/MapServer/0/query?' +
    'geometry='+encodeURIComponent(env)+
    '&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects' +
    '&outFields='+encodeURIComponent('Wetlands.WETLAND_TYPE,Wetlands.ACRES')+
    '&where='+encodeURIComponent("Wetlands.WETLAND_TYPE <> 'Riverine'")+
    '&returnGeometry=true&outSR=4326&f=json';

  setMapHint('Loading NWI wetlands...');
  fetch(url).then(function(r){
    if (!r.ok) throw new Error('NWI service returned HTTP ' + r.status);
    return r.json();
  }).then(function(data) {
    if (!wetlandAutoDetecting) return;
    if (data.error || !data.features || !data.features.length) {
      setMapHint(data.error ? 'NWI service returned an error — try a smaller area, try again shortly, or draw manually' : 'No mapped wetlands found in this view');
      if (wizardMode) wizardRefreshIfActive();
      return;
    }
    data.features.forEach(function(feat) {
      if (!feat.geometry || !feat.geometry.rings || !feat.geometry.rings.length) return;
      var ring = feat.geometry.rings[0];
      if (!ring || ring.length < 3) return;
      var pts = ring.map(function(c){ return L.latLng(c[1], c[0]); });
      var typeLabel = feat.attributes['Wetlands.WETLAND_TYPE'] || 'Wetland';
      var acVal = feat.attributes['Wetlands.ACRES'];
      var tip = typeLabel + (acVal ? ' ('+acVal.toFixed(2)+' ac, NWI)' : '') + ' — click to add';
      var lyr = L.polygon(pts, {
        color:'#2a7a5c', weight:2, opacity:0.85, fillColor:'#2a7a5c', fillOpacity:0.3, interactive:true
      }).bindTooltip(tip, {sticky:true});
      lyr.on('click', function(e) {
        L.DomEvent.stop(e);
        if (!wetlandAutoDetecting) return;
        wetlandAutoClickFeature(ring, lyr);
      });
      lyr.addTo(map);
      wetlandAutoLayers.push(lyr);
    });
    setMapHint(wetlandAutoLayers.length ? 'Click a highlighted wetland to add it' : 'No mapped wetlands found in this view');
    if (wizardMode) wizardRefreshIfActive();
  }).catch(function(err) {
    console.warn('[NWI] fetch failed:', err);
    if (!wetlandAutoDetecting) return;
    // A blocked/rejected fetch (network error, CORS, or the service itself down) all
    // surface identically as a generic TypeError here — the browser hides the actual
    // status once a response is blocked, so we can't say more specifically what failed.
    setMapHint('Couldn\'t reach the NWI wetlands service — it may be temporarily down. Try again shortly, or draw manually.');
    if (wizardMode) wizardRefreshIfActive();
  });
}

// Accept one clicked NWI candidate ring directly into the pp_wetland multi-entry
// list (same shape finishSOWDraw() produces for a hand-drawn polygon), then
// remove just that candidate from the preview so it can't be double-added —
// detecting mode stays on so the user can keep clicking more in the same view.
function wetlandAutoClickFeature(ring, previewLyr) {
  var we = getActiveWE(); if (!we) return;
  var pts = ring.map(function(c){ return L.latLng(c[1], c[0]); });
  pts = clipPtsToPerimeter(we, pts, 'polygon');
  if (!pts || pts.length < 3) { setMapHint('That wetland falls outside the project boundary'); return; }

  if (!we.fpMulti) we.fpMulti = {grade:[], road:[], berm:[], revet:[], tailings:[], pp_wetland:[], fp_wetland_enhance:[]};
  if (!we.fpMulti['pp_wetland']) we.fpMulti['pp_wetland'] = [];
  var n = we.fpMulti['pp_wetland'].length + 1;
  var id = 'fp-pp_wetland-' + Date.now();
  we.fpMulti['pp_wetland'].push({id: id, vol: ''});

  var col = WETLAND_COLOR.existing;
  var layer = L.polygon(pts, {color:col, fillColor:col, fillOpacity:.2, weight:2, interactive:true})
    .bindTooltip('Wetland area ' + n).addTo(map);
  var acres = geoArea(pts), valueM = geoAreaM2(pts);
  we.sowLayers[id] = {layer:layer, valueM:valueM, acres:acres, geo:'polygon', label:'Wetland area', _pts:null};
  we.sowLayers[id]._labelMarker = addFPMultiLabelMarker(layer, n, col);

  if (previewLyr) {
    map.removeLayer(previewLyr);
    wetlandAutoLayers = wetlandAutoLayers.filter(function(l){ return l !== previewLyr; });
  }
  updateSOWCalcs();
  renderLegend();
  if (wizardMode) { renderWizardStep(); wizardRefreshIfActive(); }
}

function reachAutoClick(latlng) {
  var we = getActiveWE(); if (!we) return;
  // If the NHD preview is loaded, the user clicked empty space — reload preview for new view
  if (nhdPreviewData) {
    loadNHDPreview();
    return;
  }
  clearNHDPreview();
  setMapHint('Querying USGS NHD streams...');

  // Convert click to Web Mercator
  var toRad = function(d){ return d * Math.PI / 180; };
  var R = 6378137;
  var x = R * toRad(latlng.lng);
  var y = R * Math.log(Math.tan(Math.PI/4 + toRad(latlng.lat)/2));
  var buf = 3000; // ~3km to catch centerlines through wide river polygons
  var envelope = (x-buf)+','+(y-buf)+','+(x+buf)+','+(y+buf);

  var baseUrl = 'https://3dhp.nationalmap.gov/arcgis/rest/services/usgs_3dhp_all/FeatureServer/50/query?';

  var url = baseUrl +
    'geometry='+encodeURIComponent(envelope)+
    '&geometryType=esriGeometryEnvelope'+
    '&inSR=102100'+
    '&spatialRel=esriSpatialRelIntersects'+
    '&where=featuretype+IN+(1,2,3)'+   // Channel Line, Canal, Artificial Path (through wide rivers)
    '&outFields=gnisidlabel,featuretype,mainstemid'+
    '&returnGeometry=true'+
    '&outSR=4326'+
    '&f=json';

  // Query waterbody layer at the exact click point — if the user clicked inside a
  // wide river polygon, use that polygon's geometry to build a centerline.
  var wbPointUrl = 'https://3dhp.nationalmap.gov/arcgis/rest/services/usgs_3dhp_all/FeatureServer/60/query?' +
    'geometry='+encodeURIComponent(x+','+y)+
    '&geometryType=esriGeometryPoint&inSR=102100&spatialRel=esriSpatialRelWithin' +
    '&outFields=gnisidlabel&returnGeometry=true&outSR=4326&f=json';

  Promise.all([
    fetch(url).then(function(r){
      if(!r.ok) throw new Error('HTTP '+r.status);
      return r.json();
    }),
    fetch(wbPointUrl).then(function(r){ return r.json(); }).catch(function(){ return {features:[]}; })
  ]).then(function(results2) {
    var data = results2[0], wbData = results2[1];
    clearReachAutoLayers();

    // wbName from point-in-polygon query — non-empty means the user clicked inside a river polygon
    var wbName = '';
    if (wbData.features && wbData.features.length) {
      wbName = wbData.features[0].attributes.gnisidlabel || '';
    }

    if (!data.features || !data.features.length) {
      // No flowlines found — if we have a waterbody polygon, derive a centerline from it
      if (wbData.features && wbData.features.length && wbData.features[0].geometry) {
        var wbPoly = wbData.features[0];
        var centerPts = polygonCenterline(wbPoly.geometry);
        if (centerPts && centerPts.length >= 2) {
          var wbLabel = wbPoly.attributes.gnisidlabel || 'Stream';
          var syntheticFeat = {
            attributes: {gnisidlabel: wbLabel, featuretype: 1, mainstemid: ''},
            geometry: {paths: [centerPts.map(function(p){ return [p.lng, p.lat]; })]},
            _clickOverride: true
          };
          processAutoDetectResults(we, {features: [syntheticFeat]}, latlng, envelope, wbLabel);
          return;
        }
      }
      setMapHint('No streams found nearby — try clicking closer to a stream, or draw manually.');
      setTimeout(function(){ setMapHint('Click on or near a stream to auto-detect it from USGS NHD'); }, 3000);
      return;
    }

    // If click was inside a named river polygon, use that name to filter flowlines —
    // this is far more reliable than vertex proximity for wide rivers.
    if (wbName) {
      var namedFeats = data.features.filter(function(f) {
        return f.attributes.gnisidlabel === wbName;
      });
      if (namedFeats.length > 0) {
        // Inject a synthetic wbName-matched dataset and skip the normal bestFeat logic
        processAutoDetectResults(we, {features: namedFeats}, latlng, envelope, wbName);
        return;
      }
      // Name exists in waterbody but no flowlines match — label type-3 features and fall through
      data.features.forEach(function(f) {
        if (!f.attributes.gnisidlabel && f.attributes.featuretype === 3) {
          f.attributes.gnisidlabel = wbName;
        }
      });
    }

    // If no type-3 artificial paths found, try a wider 8km query for wide-river centerlines.
    var hasType3 = data.features.some(function(f){ return f.attributes.featuretype === 3; });
    if (!hasType3) {
      var buf2 = 8000;
      var env2 = (x-buf2)+','+(y-buf2)+','+(x+buf2)+','+(y+buf2);
      var url2 = baseUrl +
        'geometry='+encodeURIComponent(env2)+
        '&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects' +
        '&where=featuretype+IN+(3)'+
        '&outFields=gnisidlabel,featuretype,mainstemid&returnGeometry=true&outSR=4326&f=json';
      fetch(url2).then(function(r){ return r.json(); }).then(function(d2) {
        if (d2.features && d2.features.length) {
          data.features = data.features.concat(d2.features);
        }
        processAutoDetectResults(we, data, latlng, envelope, wbName);
      }).catch(function() {
        processAutoDetectResults(we, data, latlng, envelope, wbName);
      });
    } else {
      processAutoDetectResults(we, data, latlng, envelope, wbName);
    }
  }).catch(function(err) {
    console.error('reachAutoClick error:', err);
    setMapHint('Auto-detect error: '+err.message+' — try drawing manually.');
    setTimeout(function(){ cancelReachAutoDetect(); }, 4000);
  });
}

function processAutoDetectResults(we, data, latlng, envelope, wbName) {
    wbName = wbName || '';
    var clickPt = L.latLng(latlng.lat, latlng.lng);

    // Find closest feature for each featuretype separately
    var bestByType = {}; // featuretype → {feat, dist}
    var overrideFeat = null;
    data.features.forEach(function(feat) {
      if (feat._clickOverride) { overrideFeat = feat; }
      if (!feat.geometry || !feat.geometry.paths) return;
      var ft = feat.attributes.featuretype;
      feat.geometry.paths.forEach(function(path) {
        path.forEach(function(coord) {
          var d = clickPt.distanceTo(L.latLng(coord[1], coord[0]));
          if (!bestByType[ft] || d < bestByType[ft].dist) {
            bestByType[ft] = {feat: feat, dist: d};
          }
        });
      });
    });

    // If user clicked directly on a previewed NHD line, use that feature exactly
    var bestFeat, bestDist;
    if (overrideFeat) {
      bestFeat = overrideFeat;
      bestDist = 0;
    } else {
      bestFeat = null; bestDist = Infinity;
      Object.keys(bestByType).forEach(function(ft) {
        var b = bestByType[ft];
        if (b.dist < bestDist) { bestDist = b.dist; bestFeat = b.feat; }
      });
      if (bestByType[3] && bestByType[1]) {
        if (bestByType[3].dist <= bestByType[1].dist * 2) {
          bestFeat = bestByType[3].feat;
        }
      }
    }
    if (!bestFeat) { setMapHint('Could not find nearest stream segment.'); return; }

    // If bestFeat is a featuretype=3 artificial path, collect ALL type-3 features —
    // they form the main channel centerline through wide river polygons.
    // Otherwise group by GNIS name or mainstemid numeric prefix.
    var targetName = bestFeat.attributes.gnisidlabel || wbName || '';
    var matchingFeats;
    if (bestFeat.attributes.featuretype === 3) {
      matchingFeats = data.features.filter(function(feat) {
        return feat.attributes.featuretype === 3;
      });
    } else {
      // mainstemid can be a URI (https://...) — only use if numeric
      var rawMsid = bestFeat.attributes.mainstemid || '';
      var targetPrefix = /^\d/.test(rawMsid) ? rawMsid.substring(0, 8) : '';

      // Label bestFeat if unnamed but waterbody name is known
      if (!bestFeat.attributes.gnisidlabel && wbName) {
        bestFeat.attributes.gnisidlabel = wbName;
      }

      matchingFeats = data.features.filter(function(feat) {
        if (feat === bestFeat) return true;
        var name = feat.attributes.gnisidlabel;
        var rawP = feat.attributes.mainstemid || '';
        var prefix = /^\d/.test(rawP) ? rawP.substring(0, 8) : '';
        if (targetName && name && name === targetName) return true;
        if (targetPrefix && prefix && prefix === targetPrefix) return true;
        return false;
      });
      // If nothing matched by name/prefix, just use bestFeat alone.
      // The pre-trim extend step lets the user grow the reach from there.
      if (matchingFeats.length === 0) matchingFeats = [bestFeat];
    }

    // Step 4: build connected polylines by grouping matching segments
    var chains;
    try {
      chains = buildConnectedChains(matchingFeats);
    } catch(e) {
      console.error('[process] buildConnectedChains threw:', e.message, e.stack);
      chains = [{features:[bestFeat], pts: bestFeat.geometry.paths[0].map(function(c){return L.latLng(c[1],c[0]);})}];
    }

    // Step 5: find the chain containing our best feature and offer others as alternatives
    var primaryChain = null;
    chains.forEach(function(chain) {
      if (!primaryChain) {
        chain.features.forEach(function(f) {
          if (f === bestFeat) primaryChain = chain;
        });
      }
    });
    if (!primaryChain && chains.length) primaryChain = chains[0];

    var results = [];

    if (primaryChain) {
      var name = targetName || wbName || 'Stream';
      var layer = L.polyline(primaryChain.pts, {color:'#1a9abf', weight:4, opacity:0.8, interactive:false}).addTo(map);
      reachAutoLayers.push(layer);
      // Invisible, wider companion carries the click/hover — see note above.
      var hitLine = L.polyline(primaryChain.pts, {weight:20, opacity:0.001, interactive:true})
        .bindTooltip(name + ' (' + primaryChain.features.length + ' segments)').addTo(map);
      hitLine.on('click', function(e){ L.DomEvent.stop(e); acceptAutoReach(0); });
      reachAutoLayers.push(hitLine);
      results.push({name: name, pts: primaryChain.pts, layer: layer});
    }

    we.ppData['reach_len']._autoResults = results;
    we.ppData['reach_len']._displayResults = results;
    acceptAutoReach(0);
    if (wizardMode) renderWizardStep();
}

// ── Reach extend mode ─────────────────────────────────────────────────────
var reachExtending = false;

function startReachExtend() {
  var we = getActiveWE(); if (!we) return;
  if (!we.ppData['reach_len'] || !we.ppData['reach_len'].layer) return;
  reachExtending = true;
  we.ppData['reach_len']._extendMode = true;
  document.getElementById('mapwrap').classList.add('drawing');
  setMapHint('Click on a stream segment to append it to your reach');
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  renderPMRow(m);
}

function cancelReachExtend() {
  var we = getActiveWE(); if (!we) return;
  reachExtending = false;
  if (we.ppData['reach_len']) we.ppData['reach_len']._extendMode = false;
  clearReachAutoLayers();
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('');
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  renderPMRow(m);
}

function reachExtendClick(latlng) {
  var we = getActiveWE(); if (!we) return;
  setMapHint('Querying NHD for nearby segments...');

  var toRad = function(d){ return d*Math.PI/180; };
  var R = 6378137;
  var x = R*toRad(latlng.lng);
  var y = R*Math.log(Math.tan(Math.PI/4+toRad(latlng.lat)/2));
  var buf = 800;
  var envelope = (x-buf)+','+(y-buf)+','+(x+buf)+','+(y+buf);

  var url = 'https://3dhp.nationalmap.gov/arcgis/rest/services/usgs_3dhp_all/FeatureServer/50/query?' +
    'geometry='+encodeURIComponent(envelope)+
    '&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects'+
    '&where=featuretype+IN+(1,2)&outFields=gnisidlabel,mainstemid'+
    '&returnGeometry=true&outSR=4326&f=json';

  fetch(url).then(function(r){ return r.json(); }).then(function(data) {
    clearReachAutoLayers();
    if (!data.features || !data.features.length) {
      setMapHint('No streams found — click closer to a stream segment');
      return;
    }

    // Find closest segment to click
    var clickPt = L.latLng(latlng.lat, latlng.lng);
    var bestFeat = null, bestDist = Infinity;
    data.features.forEach(function(feat) {
      if (!feat.geometry || !feat.geometry.paths) return;
      feat.geometry.paths.forEach(function(path){
        path.forEach(function(coord){
          var d = clickPt.distanceTo(L.latLng(coord[1], coord[0]));
          if (d < bestDist) { bestDist = d; bestFeat = feat; }
        });
      });
    });
    if (!bestFeat) return;

    // Build pts for selected segment
    var newPts = [];
    bestFeat.geometry.paths.forEach(function(path){
      path.forEach(function(c){ newPts.push(L.latLng(c[1], c[0])); });
    });

    // Get existing reach pts
    var reachD = we.ppData['reach_len'];
    var existPts = reachD.layer.getLatLngs();
    if (existPts.length && Array.isArray(existPts[0])) existPts = existPts[0];

    // Determine if new segment connects better to start or end of reach
    var reachStart = existPts[0], reachEnd = existPts[existPts.length-1];
    var newStart = newPts[0], newEnd = newPts[newPts.length-1];
    var dEndToStart  = reachEnd.distanceTo(newStart);
    var dEndToEnd    = reachEnd.distanceTo(newEnd);
    var dStartToStart= reachStart.distanceTo(newStart);
    var dStartToEnd  = reachStart.distanceTo(newEnd);
    var minD = Math.min(dEndToStart, dEndToEnd, dStartToStart, dStartToEnd);
    // The clicked segment is just whatever NHD feature has a vertex nearest the click —
    // it may not actually touch the reach at all. Unlike buildConnectedChains() (which
    // only stitches segments within its SNAP tolerance), this used to concatenate
    // regardless of distance, drawing a straight "phantom" line to whichever endpoint
    // was least-far when nothing genuinely connects.
    var MAX_CONNECT_M = 50;
    if (minD > MAX_CONNECT_M) {
      clearReachAutoLayers();
      setMapHint('That segment doesn\'t connect to your reach — click a segment nearer the end you want to extend');
      return;
    }
    var combinedPts;
    if (minD === dEndToStart)   combinedPts = existPts.concat(newPts);
    else if (minD === dEndToEnd)   combinedPts = existPts.concat(newPts.slice().reverse());
    else if (minD === dStartToEnd) combinedPts = newPts.concat(existPts);
    else                           combinedPts = newPts.slice().reverse().concat(existPts);

    // Show preview
    var name = (bestFeat.attributes.gnisidlabel||'segment');
    var preview = L.polyline(newPts, {color:'#c07820', weight:3, dashArray:'6,3', interactive:false}).addTo(map);
    reachAutoLayers.push(preview);
    // Invisible, wider companion carries the click/hover — see note above.
    var previewHit = L.polyline(newPts, {weight:20, opacity:0.001, interactive:true})
      .bindTooltip('Append "'+name+'" — click to confirm').addTo(map);
    reachAutoLayers.push(previewHit);

    // Confirm on click of preview
    previewHit.on('click', function(e) {
      L.DomEvent.stop(e);
      clearReachAutoLayers();
      // Rebuild reach with combined pts
      map.removeLayer(reachD.layer);
      reachD.layer = L.polyline(combinedPts, {color:'#c07820', weight:2.5, interactive:true}).bindTooltip('Reach Length').addTo(map);
      reachD.valueM = geoLen(combinedPts);
      // Every other reach-replacing path (commitLineEdit, finishPPDraw, acceptAutoReach)
      // re-fans flow arrows after changing the geometry — this one didn't, so the
      // arrows stayed at their pre-extension positions until the next zoom silently
      // rebuilt them via refreshAllFlowArrows().
      addReachArrow(we);
      cancelReachExtend();
      var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
      renderPMRow(m); rerenderCalcs(); updatePPProgress(); updateSOWCalcs();
      updateAreaChBuffer(we); updateAreaFpBuffer(we);
      updateWELabel(we, true);
      setTimeout(function(){ fetchElevationProfile(we); }, 300);
    });

    setMapHint('Click the orange segment to append it, or click elsewhere to pick a different one');
  }).catch(function() {
    setMapHint('Could not reach USGS NHD — try again');
  });
}

function fetchSOWElevationProfile(we) {
  var pc = getActivePC(we);
  var reachSL = pc && pc.sowLayers && pc.sowLayers['pc-reach'];
  if (!reachSL || !reachSL.layer) return;
  var pts = reachSL.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  if (!pts || pts.length < 2) return;
  if (!pc.sowElev) pc.sowElev = {};
  pc.sowElev._loading = true;
  pc.sowElev._profile = null;
  pc.sowElev._error = null;
  updateSOWSlopePanel(we);
  var samples = sampleReachPts(pts, ELEV_SAMPLES);
  Promise.all(samples.map(function(p){ return fetchElevation(p.lat, p.lng); }))
    .then(function(elevs) {
      var valid = elevs.filter(function(e){ return e !== null && !isNaN(e) && e > -100; });
      if (valid.length < 2) { pc.sowElev._loading=false; pc.sowElev._error='No elevation data — outside USGS coverage?'; updateSOWSlopePanel(we); return; }
      var upElev = elevs[0] !== null ? elevs[0] : valid[0];
      var dnElev = elevs[elevs.length-1] !== null ? elevs[elevs.length-1] : valid[valid.length-1];
      // Auto-orient: if downstream is higher, reverse
      if (dnElev > upElev) {
        elevs = elevs.slice().reverse();
        var tmp = upElev; upElev = dnElev; dnElev = tmp;
      }
      var lenM = reachSL.valueM || 1;
      var changeM = upElev - dnElev;
      pc.sowElev._loading = false;
      pc.sowElev._profile = elevs;
      pc.sowElev._upstreamElev = upElev;
      pc.sowElev._downstreamElev = dnElev;
      pc.sowElev._elevChangeM = changeM;
      pc.sowElev._slopePct = (changeM / lenM) * 100;
      pc.sowElev._slopeDeg = Math.atan(changeM / lenM) * (180 / Math.PI);
      // Store in sowLayers for SOW export
      if (!pc.sowLayers['pc-slope']) pc.sowLayers['pc-slope'] = {};
      pc.sowLayers['pc-slope'].value = pc.sowElev._slopeDeg.toFixed(3);
      updateSOWSlopePanel(we);
      if (wizardMode) wizardRefreshIfActive();
    })
    .catch(function() {
      pc.sowElev._loading = false;
      pc.sowElev._error = 'Could not reach USGS elevation service.';
      updateSOWSlopePanel(we);
      if (wizardMode) wizardRefreshIfActive();
    });
}

function updateSOWSlopePanel(we) {
  var wrap = document.getElementById('dr-pc-slope-wrap');
  if (!wrap || !we) return;
  var sd = getActivePC(we).sowElev || {};
  var canvasId = 'sow-elev-chart-'+we.id;
  if (sd._loading) {
    wrap.innerHTML = '<span class="pm-waiting" style="font-size:10px">Querying USGS elevation service…</span>';
    return;
  }
  if (sd._error) {
    wrap.innerHTML = '<span style="font-size:10px;color:var(--msow-error-soft,#c05050)">'+sd._error+'</span> ' +
      '<span class="drawn-redo" onclick="fetchSOWElevationProfile(getActiveWE())">retry</span>';
    return;
  }
  if (!sd._profile) {
    wrap.innerHTML = '<span class="pm-waiting" style="font-size:10px">Auto-calculates from USGS elevation after reach is drawn</span>';
    return;
  }
  var h = '<span class="drawn-result">'+(sd._slopeDeg||0).toFixed(2)+'° / '+(sd._slopePct||0).toFixed(2)+'%</span> ';
  h += '<span class="drawn-redo" onclick="fetchSOWElevationProfile(getActiveWE())">&#8635; refresh</span>';
  h += '<div class="elev-panel">';
  h += '<div class="elev-title">&#9650; Elevation Profile</div>';
  h += '<canvas id="'+canvasId+'" class="elev-chart" style="width:100%;height:90px;display:block"></canvas>';
  h += '<div class="elev-stats">';
  h += '<div class="elev-stat"><div class="elev-stat-label">Upstream</div><div class="elev-stat-val">'+Math.round((sd._upstreamElev||0)*3.28084)+' ft</div></div>';
  h += '<div class="elev-stat"><div class="elev-stat-label">Downstream</div><div class="elev-stat-val">'+Math.round((sd._downstreamElev||0)*3.28084)+' ft</div></div>';
  h += '<div class="elev-stat"><div class="elev-stat-label">Drop</div><div class="elev-stat-val">'+Math.round(Math.abs(sd._elevChangeM||0)*3.28084)+' ft</div></div>';
  h += '<div class="elev-stat"><div class="elev-stat-label">Slope</div><div class="elev-stat-val">'+(sd._slopeDeg||0).toFixed(2)+'° / '+(sd._slopePct||0).toFixed(2)+'%</div></div>';
  h += '</div></div>';
  wrap.innerHTML = h;
  setTimeout(function(){ drawElevChart(canvasId, sd._profile); }, 80);
}

function onFInputChange(id, val) {
  var we = getActiveWE(); if (!we) return;
  var owner = sowOwner(we,id);
  if (!owner.sowLayers[id]) owner.sowLayers[id] = {};
  owner.sowLayers[id].value = val;
  updateSOWCalcs();
}

function restoreFInputValues(we) {
  // Restore persisted fInput values after panel rebuild
  if (!we || !we.sowLayers) return;
  Object.keys(we.sowLayers).forEach(function(id) {
    var el = document.getElementById('f-'+id);
    if (el && we.sowLayers[id] && we.sowLayers[id].value !== undefined) {
      el.value = we.sowLayers[id].value;
    }
  });
}

// ── Channel Complexity Metrics — multi-reach system ──────────────────────

function newChannelReach() {
  return {
    id: 'cr-' + Date.now(),
    name: '',
    collapsed: false,
    sowLayers: {},
    sowElev: null
  };
}

function addChannelReach() {
  var we = getActiveWE(); if (!we) return;
  if (!we.channelReaches) we.channelReaches = [];
  we.channelReaches.push(newChannelReach());
  renderChannelReaches();
}

function delChannelReach(id) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, id); if (!r) return;
  // Remove map layers
  ['pc-reach','pc-area'].forEach(function(k){
    if (r.sowLayers[k] && r.sowLayers[k].layer) map.removeLayer(r.sowLayers[k].layer);
  });
  ['pcw1','pcw2','pcw3','pc-gravel'].forEach(function(k){
    if (r.sowLayers[k] && r.sowLayers[k].layer) map.removeLayer(r.sowLayers[k].layer);
  });
  if (r._pcAreaAutoLayer) map.removeLayer(r._pcAreaAutoLayer);
  we.channelReaches = we.channelReaches.filter(function(x){return x.id!==id;});
  renderChannelReaches();
}

function getCR(we, id) {
  return we.channelReaches && we.channelReaches.filter(function(r){return r.id===id;})[0];
}

function toggleCRCollapse(id) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, id); if (!r) return;
  r.collapsed = !r.collapsed;
  renderChannelReaches();
}

function updateCRName(id, val) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, id); if (!r) return;
  r.name = val;
}

function renderChannelReaches() {
  var el = document.getElementById('channel-reaches-list');
  if (!el) return;
  var we = getActiveWE(); if (!we) return;
  if (!we.channelReaches) we.channelReaches = [];
  el.innerHTML = '';
  we.channelReaches.forEach(function(r, i) {
    var div = document.createElement('div');
    div.className = 'multi-entry';
    div.style.marginBottom = '8px';
    var globalNum = i + 1;
    var label = r.name || ('Reach ' + globalNum);
    // Summary stats for header
    var reachSL = r.sowLayers['pc-reach'];
    var reachFt = reachSL && reachSL.valueM ? Math.round(reachSL.valueM * 3.28084).toLocaleString() + ' ft' : null;
    var sinuosity = crCalcSinuosity(r);
    var slope = r.sowElev && r.sowElev._slopeDeg !== undefined ? r.sowElev._slopeDeg.toFixed(2) + '°' : null;
    var summaryParts = [];
    if (reachFt) summaryParts.push(reachFt);
    if (sinuosity) summaryParts.push('sin: ' + sinuosity);
    if (slope) summaryParts.push(slope);
    var summary = summaryParts.length ? ' <span style="font-size:10px;color:#5a8abf;font-weight:400">'+summaryParts.join(' · ')+'</span>' : '';

    var h = '<div class="multi-entry-head" style="cursor:pointer" onclick="toggleCRCollapse(&apos;'+r.id+'&apos;)">';
    h += 'Reach ' + globalNum + summary;
    h += '<span style="display:flex;gap:8px;align-items:center">';
    h += '<span style="color:var(--msow-helper-text,#7a96b0);font-size:12px">'+(r.collapsed?'&#9654;':'&#9660;')+'</span>';
    h += '<span class="multi-entry-del" onclick="event.stopPropagation();delChannelReach(&apos;'+r.id+'&apos;)">&#10005;</span>';
    h += '</span></div>';

    if (!r.collapsed) {
      h += '<div class="f-row"><esa-text-field label="Name" value="'+r.name+'" placeholder="e.g. Main Channel" size="sm" onchange="updateCRName(&apos;'+r.id+'&apos;,this.value)"></esa-text-field></div>';

      // Reach Length
      var rl = r.sowLayers['pc-reach'];
      var rlVal = rl && rl.valueM ? Math.round(rl.valueM*3.28084).toLocaleString()+' ft' : null;
      h += '<div class="f-row"><label>Reach Length</label>';
      if (rlVal) h += '<span class="drawn-result">&#10003; '+rlVal+'</span> <span class="drawn-redo" onclick="startCRDraw(&apos;'+r.id+'&apos;,&apos;pc-reach&apos;,&apos;line&apos;,&apos;Reach&apos;)">redo</span>';
      else h += '<button class="draw-btn" style="font-size:11px" onclick="startCRDraw(&apos;'+r.id+'&apos;,&apos;pc-reach&apos;,&apos;line&apos;,&apos;Reach&apos;)">&#128207; Draw line</button>';
      h += '</div>';

      // Valley length + sinuosity (auto-calc)
      var vl = crCalcValleyLen(r);
      h += '<div class="f-row"><label>Valley Length</label><div class="f-calc">'+(vl ? Math.round(vl*3.28084).toLocaleString()+' ft' : '—')+'</div></div>';
      h += '<div class="f-row"><label>Sinuosity</label><div class="f-calc">'+(sinuosity||'—')+'</div></div>';

      // Slope
      h += '<div class="f-row" style="flex-direction:column;align-items:flex-start;gap:4px"><label>Avg Reach Slope</label>';
      h += '<div id="cr-slope-'+r.id+'">';
      h += crSlopeHTML(r);
      h += '</div></div>';

      // Channel widths
      h += '<div class="f-row" style="flex-direction:column;align-items:flex-start;gap:4px"><label>Avg Channel Width</label>';
      h += '<div style="display:flex;flex-direction:column;gap:4px;width:100%">';
      ['pcw1','pcw2','pcw3'].forEach(function(k, wi) {
        var wsl = r.sowLayers[k];
        var wval = wsl && wsl.valueM ? Math.round(wsl.valueM*3.28084)+' ft' : null;
        h += '<div style="display:flex;align-items:center;gap:6px">';
        if (wval) h += '<span class="drawn-result" style="font-size:11px">&#10003; '+wval+'</span> <span class="drawn-redo" onclick="startCRDraw(&apos;'+r.id+'&apos;,&apos;'+k+'&apos;,&apos;segment&apos;,&apos;Width '+(wi+1)+'&apos;)">redo</span>';
        else h += '<button class="draw-btn" style="font-size:11px" onclick="startCRDraw(&apos;'+r.id+'&apos;,&apos;'+k+'&apos;,&apos;segment&apos;,&apos;Width '+(wi+1)+'&apos;)">&#128207; Meas. '+(wi+1)+'</button>';
        h += '</div>';
      });
      var avgW = crAvgWidth(r);
      if (avgW) h += '<div style="font-size:11px;color:var(--msow-muted-text,#8aaccc);margin-top:2px">Avg: '+Math.round(avgW)+' ft</div>';
      h += '</div></div>';

      // Bank height
      var bh = r.sowLayers['pc-bankht'] && r.sowLayers['pc-bankht'].value ? r.sowLayers['pc-bankht'].value : '';
      h += '<div class="f-row"><label>Avg Bank Height (ft)</label><input type="number" value="'+bh+'" placeholder="0" style="font-size:12px" oninput="updateCRInput(&apos;'+r.id+'&apos;,&apos;pc-bankht&apos;,this.value)"/></div>';

      // Area of Restored Channel
      h += '<div class="f-row" style="flex-direction:column;align-items:flex-start;gap:4px"><label>Area of Restored Channel</label>';
      h += '<div id="cr-area-'+r.id+'">';
      h += crAreaHTML(r);
      h += '</div></div>';

      // Excavation volume
      var excav = crCalcExcav(r);
      h += '<div class="f-row"><label>Channel excavation vol. (CY)</label><div class="f-calc">'+(excav!==null?excav.toLocaleString()+' CY':avgW&&bh?'—':'Enter bank height')+'</div></div>';

      // Gravel placements — multiple segments
      if (!r.gravelPlacements) r.gravelPlacements = [];
      h += '<div class="f-row" style="flex-direction:column;align-items:flex-start;gap:4px"><label>Gravel Placements</label>';
      h += '<div style="width:100%">';
      r.gravelPlacements.forEach(function(gp, gi) {
        h += '<div style="background:#f3f7fc;border:1px solid #dcdcdc;border-radius:4px;padding:7px;margin-bottom:6px">';
        h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">';
        h += '<span style="font-size:11px;font-weight:600;color:#3d3d3d">Placement '+(gi+1)+'</span>';
        h += '<span style="cursor:pointer;color:#ef4444;font-size:12px" onclick="delCRGravel(&apos;'+r.id+'&apos;,'+gi+')">&#10005;</span>';
        h += '</div>';
        if (gp.pts && gp.lenM) {
          var lenFt = Math.round(gp.lenM * 3.28084).toLocaleString();
          h += '<div style="font-size:11px;color:#0f6849;margin-bottom:4px">&#10003; '+lenFt+' ft <span class="drawn-redo" onclick="startCRGravelDraw(&apos;'+r.id+'&apos;,'+gi+')">redo</span></div>';
        } else {
          h += '<button class="draw-btn" style="margin-bottom:4px;width:100%" onclick="startCRGravelDraw(&apos;'+r.id+'&apos;,'+gi+')">&#128207; Draw start &amp; end</button>';
        }
        h += '<div style="display:flex;align-items:center;gap:8px;font-size:11px;color:#525252">';
        h += '<label style="flex:1">Avg depth (ft)</label>';
        h += '<input type="number" min="0" step="0.1" value="'+(gp.depth||'')+'" placeholder="0.0" ';
        h += 'style="width:70px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" ';
        h += 'oninput="setCRGravelDepth(&apos;'+r.id+'&apos;,'+gi+',this.value)">';
        h += '</div>';
        h += '</div>';
      });
      h += '<button class="add-entry-btn" style="width:100%;margin-top:2px" onclick="addCRGravel(&apos;'+r.id+'&apos;)">+ Add Gravel Placement</button>';
      h += '</div></div>';
    }

    div.innerHTML = h;
    el.appendChild(div);

    // Draw elevation chart if available
    if (!r.collapsed && r.sowElev && r.sowElev._profile) {
      setTimeout(function(){ drawElevChart('cr-elev-'+r.id, r.sowElev._profile); }, 80);
    }
  });

  renderChannelReachSummary();
}

function crAreaHTML(r) {
  var reachSL = r.sowLayers['pc-reach'];
  var areaSL = r.sowLayers['pc-area'];
  var avgW = crAvgWidth(r);
  if (areaSL && areaSL.layer && !areaSL._auto) {
    var ac = ((areaSL.valueM||0)*0.000247105).toFixed(3);
    return '<span class="drawn-result">~ '+ac+' acres</span> <span class="drawn-redo" onclick="startCRDraw(&apos;'+r.id+'&apos;,&apos;pc-area&apos;,&apos;polygon&apos;,&apos;Area&apos;)">draw from scratch</span>';
  } else if (areaSL && areaSL.layer && areaSL._auto) {
    var ac2 = ((areaSL.valueM||0)*0.000247105).toFixed(3);
    return '<span class="drawn-result">~ '+ac2+' acres</span> <span style="font-size:10px;color:var(--msow-desc-text,#5a7a9a)">(estimated)</span> '+
      '<span class="drawn-redo" onclick="startCRPolyEdit(&apos;'+r.id+'&apos;)">edit</span> '+
      '<span class="drawn-redo" onclick="startCRDraw(&apos;'+r.id+'&apos;,&apos;pc-area&apos;,&apos;polygon&apos;,&apos;Area&apos;)">draw from scratch</span>';
  } else if (reachSL && reachSL.layer && avgW) {
    return '<span class="pm-waiting" style="font-size:10px">Generating…</span>';
  } else {
    return '<span class="pm-waiting" style="font-size:10px">Auto-calculates from reach × width</span> '+
      '<span class="drawn-redo" onclick="startCRDraw(&apos;'+r.id+'&apos;,&apos;pc-area&apos;,&apos;polygon&apos;,&apos;Area&apos;)">draw manually</span>';
  }
}

function crSlopeHTML(r) {
  var sd = r.sowElev || {};
  if (sd._loading) return '<span class="pm-waiting" style="font-size:10px">Querying USGS…</span>';
  if (sd._error) return '<span style="font-size:10px;color:var(--msow-error-soft,#c05050)">'+sd._error+'</span> <span class="drawn-redo" onclick="fetchCRElevProfile(&apos;'+r.id+'&apos;)">retry</span>';
  if (sd._profile) {
    var h = '<span class="drawn-result">'+(sd._slopeDeg||0).toFixed(2)+'° / '+(sd._slopePct||0).toFixed(2)+'%</span> ';
    h += '<span class="drawn-redo" onclick="fetchCRElevProfile(&apos;'+r.id+'&apos;)">&#8635; refresh</span>';
    h += '<div class="elev-panel"><div class="elev-title">&#9650; Elevation Profile</div>';
    h += '<canvas id="cr-elev-'+r.id+'" class="elev-chart" style="width:100%;height:90px;display:block"></canvas>';
    h += '<div class="elev-stats">';
    h += '<div class="elev-stat"><div class="elev-stat-label">Upstream</div><div class="elev-stat-val">'+Math.round((sd._upstreamElev||0)*3.28084)+' ft</div></div>';
    h += '<div class="elev-stat"><div class="elev-stat-label">Downstream</div><div class="elev-stat-val">'+Math.round((sd._downstreamElev||0)*3.28084)+' ft</div></div>';
    h += '<div class="elev-stat"><div class="elev-stat-label">Drop</div><div class="elev-stat-val">'+Math.round(Math.abs(sd._elevChangeM||0)*3.28084)+' ft</div></div>';
    h += '<div class="elev-stat"><div class="elev-stat-label">Slope</div><div class="elev-stat-val">'+(sd._slopeDeg||0).toFixed(2)+'° / '+(sd._slopePct||0).toFixed(2)+'%</div></div>';
    h += '</div></div>';
    return h;
  }
  return '<span class="pm-waiting" style="font-size:10px">Auto-calculates from USGS elevation after reach is drawn</span>';
}

function crCalcValleyLen(r) {
  var sl = r.sowLayers['pc-reach'];
  if (!sl || !sl.layer) return null;
  var pts = sl.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  if (!pts || pts.length < 2) return null;
  var toRad = function(d){return d*Math.PI/180;};
  var R=6378137, p1=pts[0], p2=pts[pts.length-1];
  var dLat=toRad(p2.lat-p1.lat), dLng=toRad(p2.lng-p1.lng);
  var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(toRad(p1.lat))*Math.cos(toRad(p2.lat))*Math.sin(dLng/2)*Math.sin(dLng/2);
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

function crCalcSinuosity(r) {
  var rl = r.sowLayers['pc-reach'] && r.sowLayers['pc-reach'].valueM;
  var vl = crCalcValleyLen(r);
  if (!rl || !vl || vl === 0) return null;
  return (rl/vl).toFixed(2);
}

function crAvgWidth(r) {
  var vals = [];
  ['pcw1','pcw2','pcw3'].forEach(function(k){
    var sl = r.sowLayers[k];
    if (sl && sl.valueM) vals.push(sl.valueM * 3.28084);
  });
  return vals.length ? vals.reduce(function(a,v){return a+v;},0)/vals.length : null;
}

function crCalcExcav(r) {
  var sl = r.sowLayers['pc-reach'];
  var reachFt = sl && sl.valueM ? sl.valueM * 3.28084 : 0;
  var avgW = crAvgWidth(r);
  var bh = r.sowLayers['pc-bankht'] && r.sowLayers['pc-bankht'].value ? parseFloat(r.sowLayers['pc-bankht'].value) : 0;
  if (!reachFt || !avgW || !bh) return null;
  return Math.round(reachFt * avgW * bh / 27);
}

function updateCRInput(id, key, val) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, id); if (!r) return;
  if (!r.sowLayers[key]) r.sowLayers[key] = {};
  r.sowLayers[key].value = val;
  updateCRAutoArea(r);
  renderChannelReaches();
}

// Draw tool for channel reach metrics
var crDrawing = null; // {reachId, key, geo, label}

function startCRDraw(reachId, key, geo, label) {
  var we = getActiveWE(); if (!we) return;
  if (lineEditing) cancelLineEdit();
  ppDrawing = null; sowDrawing = null;
  crDrawing = {reachId: reachId, key: key, geo: geo, label: label, weId: we.id};
  drawPts = [];
  document.getElementById('mapwrap').classList.add('drawing');
  setMapHint('Draw ' + label + ' — click to place points' + (geo==='segment'?' (2 clicks)':geo==='line'?', double-click to finish':', double-click to close polygon'));
}

function finishCRDraw() {
  if (!crDrawing) return;
  var geo = crDrawing.geo;
  if ((geo==='segment'||geo==='line') && drawPts.length < 2) return;
  if (geo==='polygon' && drawPts.length < 3) return;
  clearPreview();
  var we = getWE(crDrawing.weId); if (!we) return;
  var r = getCR(we, crDrawing.reachId); if (!r) return;
  var pts = drawPts.slice(); drawPts = [];
  var NO_CLIP_CR = {pcw1:1,pcw2:1,pcw3:1};
  if(!NO_CLIP_CR[crDrawing.key]) pts = clipPtsToPerimeter(we, pts, geo);
  if (!pts) {
    crDrawing = null;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('That falls entirely outside your project boundary — not saved.');
    return;
  }
  var key = crDrawing.key;
  var label = crDrawing.label;
  var noDisplay = {pcw1:1, pcw2:1, pcw3:1};
  // Gravel placement special case
  if (key === 'pc-gravel' && crDrawing.gravelIdx !== undefined) {
    if (!r.gravelPlacements) r.gravelPlacements = [];
    var gp = r.gravelPlacements[crDrawing.gravelIdx];
    var clicks = crDrawing.clicks || [];
    if (gp && clicks.length >= 2) {
      // Remove old layer
      if (gp.layers) gp.layers.forEach(function(l){ map.removeLayer(l); });
      else if (gp.layer) map.removeLayer(gp.layer);

      // Get area of restored channel polygon pts
      var areaSL = r.sowLayers['pc-area'];
      var areaPts = null;
      if (areaSL && areaSL.layer) {
        var aLls = areaSL.layer.getLatLngs();
        areaPts = (aLls.length && Array.isArray(aLls[0])) ? aLls[0] : aLls;
      }

      var polyLayer = null;
      if (areaPts && areaPts.length > 2) {
        function extendGravelLine(pts, channelPts) {
          var allLats = channelPts.map(function(p){return p.lat;});
          var allLngs = channelPts.map(function(p){return p.lng;});
          var ext = Math.max(
            Math.max.apply(null,allLats)-Math.min.apply(null,allLats),
            Math.max.apply(null,allLngs)-Math.min.apply(null,allLngs)
          ) * 2 + 0.001;
          var dLat = pts[0].lat-pts[1].lat, dLng = pts[0].lng-pts[1].lng;
          var len = Math.sqrt(dLat*dLat+dLng*dLng)||1;
          return [
            L.latLng(pts[0].lat+(dLat/len)*ext, pts[0].lng+(dLng/len)*ext),
            L.latLng(pts[1].lat-(dLat/len)*ext, pts[1].lng-(dLng/len)*ext)
          ];
        }

        function polyContainsApprox(pts, pt) {
          var minLat = Math.min.apply(null,pts.map(function(p){return p.lat;}));
          var maxLat = Math.max.apply(null,pts.map(function(p){return p.lat;}));
          var minLng = Math.min.apply(null,pts.map(function(p){return p.lng;}));
          var maxLng = Math.max.apply(null,pts.map(function(p){return p.lng;}));
          return pt.lat>=minLat&&pt.lat<=maxLat&&pt.lng>=minLng&&pt.lng<=maxLng;
        }

        var line1 = extendGravelLine(clicks[0].perp, areaPts);
        var line2 = extendGravelLine(clicks[1].perp, areaPts);

        var split1 = splitPolyWithLine(areaPts, line1);
        var midPoly = areaPts;
        if (split1) {
          var c2 = clicks[1].latlng;
          midPoly = polyContainsApprox(split1[0], c2) ? split1[0] : split1[1];
        }

        var split2 = splitPolyWithLine(midPoly, line2);
        var finalPoly = midPoly;
        if (split2) {
          var c1latlng = clicks[0].latlng;
          finalPoly = polyContainsApprox(split2[0], c1latlng) ? split2[0] : split2[1];
        }

        polyLayer = L.polygon(finalPoly, {
          color:'#c07820', fillColor:'#c07820', fillOpacity:0.35,
          weight:1.5, interactive:false
        }).bindTooltip('Gravel Placement '+(crDrawing.gravelIdx+1)).addTo(map);
      }

      gp.pts = [clicks[0].latlng, clicks[1].latlng];
      gp.layers = polyLayer ? [polyLayer] : [];
      gp.layer = polyLayer;
      gp.lenM = clicks[0].latlng.distanceTo(clicks[1].latlng);
    }
    crDrawing = null;
    document.getElementById('mapwrap').classList.remove('drawing');
    setMapHint('');
    clearPreview();
    if (crDrawing && crDrawing._firstPreview) { map.removeLayer(crDrawing._firstPreview); }
    renderChannelReaches();
    return;
  }

  if (!r.sowLayers[key]) r.sowLayers[key] = {};
  var old = r.sowLayers[key].layer;
  if (old) map.removeLayer(old);

  var layer = null;
  if (!noDisplay[key]) {
    if (geo === 'polygon') {
      layer = L.polygon(pts, {color:'#2a7abf', fillColor:'#2a7abf', fillOpacity:.15, weight:2, interactive:false}).bindTooltip(label).addTo(map);
    } else {
      layer = L.polyline(pts, {color:'#2a7abf', weight:2.5, interactive:false}).bindTooltip(label).addTo(map);
    }
  }
  var valueM = geo === 'polygon' ? geoAreaM2(pts) : geoLen(pts);
  r.sowLayers[key] = {layer:layer, valueM:valueM, geo:geo, label:label, _pts: noDisplay[key]?pts:null};

  crDrawing = null;
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('');

  // Auto-generate area buffer if reach drawn
  if (key === 'pc-reach') {
    setTimeout(function(){ fetchCRElevProfile(r.id); }, 300);
    updateCRAutoArea(r);
  }
  if (['pcw1','pcw2','pcw3'].indexOf(key) >= 0) updateCRAutoArea(r);

  renderChannelReaches();
}

function updateCRAutoArea(r) {
  var reachSL = r.sowLayers['pc-reach'];
  var avgW = crAvgWidth(r);
  var areaSL = r.sowLayers['pc-area'];
  if (!reachSL || !reachSL.layer || !avgW) return;
  if (areaSL && areaSL.layer && !areaSL._auto) return; // user drew manually

  // Remove old auto layer
  if (areaSL && areaSL._auto && areaSL.layer) { map.removeLayer(areaSL.layer); }
  if (r._pcAreaAutoLayer) { map.removeLayer(r._pcAreaAutoLayer); }

  var pts = reachSL.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  var halfW = (avgW / 3.28084) / 2;
  var ring = buildBufferPoly(pts, halfW);
  if (!ring) return;
  var bufLayer = L.polygon(ring, {color:'#1a7abf', fillColor:'#1a7abf', fillOpacity:.15, weight:2, dashArray:'6,4', interactive:false})
    .bindTooltip('Area of Restored Channel (estimated)').addTo(map);
  r._pcAreaAutoLayer = bufLayer;
  var areaM2 = geoAreaM2(ring);
  r.sowLayers['pc-area'] = {layer:bufLayer, valueM:areaM2*0.000247105, geo:'polygon', label:'Area of Restored Channel', _auto:true};
  renderChannelReaches();
}

function startCRPolyEdit(reachId) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, reachId); if (!r) return;
  var sl = r.sowLayers['pc-area']; if (!sl || !sl.layer) return;
  // Use existing line edit system — store context
  lineEditing = {type:'cr-poly', id:'pc-area', reachId:reachId, weId:we.id, layer:sl.layer};
  buildPolyEditHandles(sl.layer);
  document.getElementById('edit-done-bar').style.display='flex'; document.getElementById('mapwrap').classList.add('editing');
  repositionMapOverlays();
}

function fetchCRElevProfile(reachId) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, reachId); if (!r) return;
  var sl = r.sowLayers['pc-reach'];
  if (!sl || !sl.layer) return;
  var pts = sl.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  if (!pts || pts.length < 2) return;
  if (!r.sowElev) r.sowElev = {};
  r.sowElev._loading = true; r.sowElev._profile = null; r.sowElev._error = null;
  renderChannelReaches();
  Promise.all(sampleReachPts(pts, ELEV_SAMPLES).map(function(p){ return fetchElevation(p.lat, p.lng); }))
    .then(function(elevs) {
      var valid = elevs.filter(function(e){ return e!==null&&!isNaN(e)&&e>-100; });
      if (valid.length < 2) { r.sowElev._loading=false; r.sowElev._error='No elevation data returned'; renderChannelReaches(); return; }
      var up = elevs[0]!==null?elevs[0]:valid[0], dn = elevs[elevs.length-1]!==null?elevs[elevs.length-1]:valid[valid.length-1];
      if (dn > up) { elevs=elevs.slice().reverse(); var tmp=up;up=dn;dn=tmp; }
      var lenM = sl.valueM || 1;
      var chg = up - dn;
      r.sowElev._loading=false; r.sowElev._profile=elevs;
      r.sowElev._upstreamElev=up; r.sowElev._downstreamElev=dn;
      r.sowElev._elevChangeM=chg;
      r.sowElev._slopePct=(chg/lenM)*100;
      r.sowElev._slopeDeg=Math.atan(chg/lenM)*(180/Math.PI);
      renderChannelReaches();
      setTimeout(function(){ drawElevChart('cr-elev-'+reachId, elevs); }, 80);
    })
    .catch(function(){ r.sowElev._loading=false; r.sowElev._error='Could not reach USGS'; renderChannelReaches(); });
}

function renderChannelReachSummary() {
  // Update any SOW summary fields if needed
}

function addCRGravel(reachId) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, reachId); if (!r) return;
  if (!r.gravelPlacements) r.gravelPlacements = [];
  r.gravelPlacements.push({pts: null, depth: '', layer: null});
  renderChannelReaches();
  // Auto-start drawing for the new placement
  startCRGravelDraw(reachId, r.gravelPlacements.length - 1);
}

function delCRGravel(reachId, idx) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, reachId); if (!r || !r.gravelPlacements) return;
  var gp = r.gravelPlacements[idx];
  if (gp) {
    if (gp.layers) gp.layers.forEach(function(l){ map.removeLayer(l); });
    else if (gp.layer) map.removeLayer(gp.layer);
  }
  r.gravelPlacements.splice(idx, 1);
  renderChannelReaches();
}

function setCRGravelDepth(reachId, idx, val) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, reachId); if (!r || !r.gravelPlacements) return;
  r.gravelPlacements[idx].depth = val;
}

function startCRGravelDraw(reachId, idx) {
  var we = getActiveWE(); if (!we) return;
  var r = getCR(we, reachId);
  if (!r || !r.sowLayers['pc-reach'] || !r.sowLayers['pc-reach'].layer) {
    setMapHint('Draw the reach line first before adding gravel placements.');
    setTimeout(function(){setMapHint('');}, 3000);
    return;
  }
  if (lineEditing) cancelLineEdit();
  ppDrawing = null; sowDrawing = null;
  crDrawing = {reachId: reachId, key: 'pc-gravel', geo: 'gravel-perp', label: 'Gravel Placement', weId: we.id, gravelIdx: idx, clicks: []};
  drawPts = [];
  document.getElementById('mapwrap').classList.add('drawing');
  setMapHint('Click to mark the <b>start</b> of gravel placement (1 of 2)');
}

function crGravelPerpendicularLine(latlng, r) {
  var sl = r.sowLayers['pc-reach']; if (!sl || !sl.layer) return null;
  var reachPts = sl.layer.getLatLngs();
  if (reachPts.length && Array.isArray(reachPts[0])) reachPts = reachPts[0];
  if (!reachPts || reachPts.length < 2) return null;

  // Find nearest reach segment
  var bestDist = Infinity, bestA = null, bestB = null;
  for (var i = 0; i < reachPts.length - 1; i++) {
    var a = reachPts[i], b = reachPts[i+1];
    var near = nearestOnSegment(latlng, a, b);
    var d = Math.sqrt(Math.pow(latlng.lat-near.lat,2)+Math.pow(latlng.lng-near.lng,2));
    if (d < bestDist) { bestDist = d; bestA = a; bestB = b; }
  }
  if (!bestA) return null;

  // Snap to nearest point on segment
  var snapped = nearestOnSegment(latlng, bestA, bestB);

  // Perpendicular with cosLat correction — same as chuPerpendicularLine
  var toRad = function(x){ return x * Math.PI / 180; };
  var midLat = (bestA.lat + bestB.lat) / 2;
  var cosLat = Math.cos(toRad(midLat));
  var dLat = bestB.lat - bestA.lat;
  var dLng = (bestB.lng - bestA.lng) * cosLat;
  var len = Math.sqrt(dLat*dLat + dLng*dLng);
  if (len < 1e-10) return null;
  var perpLat = -dLng / len;
  var perpLng =  dLat / len / cosLat;

  // Scale like chuPerpendicularLine: 3x channel half-width
  var avgWM = crAvgWidth(r);
  var ext;
  if (avgWM) {
    ext = (avgWM / 2 * 3) / 111320;
  } else {
    var areaSL2 = r.sowLayers['pc-area'];
    ext = 0.0003;
    if (areaSL2 && areaSL2.layer) {
      var aLls2 = areaSL2.layer.getLatLngs();
      var aPts2 = (aLls2.length && Array.isArray(aLls2[0])) ? aLls2[0] : aLls2;
      if (aPts2 && aPts2.length > 2) {
        var aLats2 = aPts2.map(function(p){return p.lat;});
        var aLngs2 = aPts2.map(function(p){return p.lng;});
        ext = Math.min(
          Math.max.apply(null,aLats2)-Math.min.apply(null,aLats2),
          Math.max.apply(null,aLngs2)-Math.min.apply(null,aLngs2)
        ) * 1.5;
      }
    }
  }

  return [
    L.latLng(snapped.lat + perpLat * ext, snapped.lng + perpLng * ext),
    L.latLng(snapped.lat - perpLat * ext, snapped.lng - perpLng * ext)
  ];
}

function buildConnectedChains(features) {
  // Stitch NHD segments into continuous chains by matching endpoints
  var segs = features.map(function(feat) {
    var pts = [];
    if (feat.geometry && feat.geometry.paths) {
      feat.geometry.paths.forEach(function(path){
        path.forEach(function(c){ pts.push(L.latLng(c[1], c[0])); });
      });
    }
    return {feat: feat, pts: pts, used: false};
  }).filter(function(s){ return s.pts.length >= 2; });

  var chains = [];
  var SNAP = 0.0002; // ~20m snapping tolerance in degrees

  function ptClose(a, b) {
    return Math.abs(a.lat-b.lat) < SNAP && Math.abs(a.lng-b.lng) < SNAP;
  }

  segs.forEach(function(seed) {
    if (seed.used) return;
    seed.used = true;
    var chain = {pts: seed.pts.slice(), features: [seed.feat]};

    // Walk forward (match chain end to segment start/end)
    var changed = true;
    while (changed) {
      changed = false;
      segs.forEach(function(s) {
        if (s.used) return;
        var chainEnd = chain.pts[chain.pts.length-1];
        var chainStart = chain.pts[0];
        if (ptClose(chainEnd, s.pts[0])) {
          chain.pts = chain.pts.concat(s.pts.slice(1));
          chain.features.push(s.feat); s.used = true; changed = true;
        } else if (ptClose(chainEnd, s.pts[s.pts.length-1])) {
          chain.pts = chain.pts.concat(s.pts.slice(0,-1).reverse());
          chain.features.push(s.feat); s.used = true; changed = true;
        } else if (ptClose(chainStart, s.pts[s.pts.length-1])) {
          chain.pts = s.pts.concat(chain.pts.slice(1));
          chain.features.push(s.feat); s.used = true; changed = true;
        } else if (ptClose(chainStart, s.pts[0])) {
          chain.pts = s.pts.slice().reverse().concat(chain.pts.slice(1));
          chain.features.push(s.feat); s.used = true; changed = true;
        }
      });
    }
    chains.push(chain);
  });

  // Sort chains by length descending
  chains.sort(function(a,b){ return b.pts.length - a.pts.length; });
  return chains;
}

// ── Reach trimming mode ───────────────────────────────────────────────────
var reachTrimming = false;
var reachTrimPts  = null;   // full pts of selected waterway
var reachTrimLayer = null;  // preview highlight layer
var reachTrimClicks = [];   // [upstream click latlng, downstream click latlng]

// ── Pre-trim extend step ───────────────────────────────────────────────────
var preReachExtend = false;   // true while user is in pre-trim extend mode
var preReachPts = null;       // accumulated pts before trimming

function enterPreTrimStep(pts, skipFit) {
  // Show the waterway and offer extend-before-trim
  preReachPts = pts;
  preReachExtend = false;
  if (reachTrimLayer) map.removeLayer(reachTrimLayer);
  reachTrimLayer = L.polyline(pts, {color:'#1a9abf', weight:3, dashArray:'6,4', interactive:false}).addTo(map);
  if (!skipFit) map.fitBounds(L.polyline(pts).getBounds(), {padding:[60,60]});
  setMapHint('Wrong stream? Click <b>Try different stream</b> in the sidebar. Otherwise extend if needed, then click <b>Pick endpoints</b>');
  // Refresh sidebar to show the pre-trim panel
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  var we = getActiveWE(); if (!we) return;
  if (!we.ppData['reach_len']) we.ppData['reach_len'] = {};
  we.ppData['reach_len']._preTrim = true;
  we.ppData['reach_len']._preTrimPts = pts;
  renderPMRow(m);
  if (wizardMode) renderWizardStep();
}

function preTrimExtendClick(latlng) {
  // Same as reachExtendClick but appends to preReachPts instead of committed reach
  var we = getActiveWE(); if (!we) return;
  setMapHint('Querying NHD for nearby segments...');

  var toRad = function(d){ return d*Math.PI/180; };
  var R = 6378137;
  var x = R*toRad(latlng.lng);
  var y = R*Math.log(Math.tan(Math.PI/4+toRad(latlng.lat)/2));
  var buf = 800;
  var envelope = (x-buf)+','+(y-buf)+','+(x+buf)+','+(y+buf);

  var url = 'https://3dhp.nationalmap.gov/arcgis/rest/services/usgs_3dhp_all/FeatureServer/50/query?' +
    'geometry='+encodeURIComponent(envelope)+
    '&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects'+
    '&where=featuretype+IN+(1,2)&outFields=gnisidlabel,mainstemid'+
    '&returnGeometry=true&outSR=4326&f=json';

  fetch(url).then(function(r){ return r.json(); }).then(function(data) {
    clearReachAutoLayers(); // clear any previous preview before showing new one
    if (!data.features || !data.features.length) {
      setMapHint('No streams found nearby — click elsewhere or proceed to Pick endpoints');
      return;
    }
    var clickPt = L.latLng(latlng.lat, latlng.lng);
    var bestFeat = null, bestDist = Infinity;
    data.features.forEach(function(feat) {
      if (!feat.geometry || !feat.geometry.paths) return;
      feat.geometry.paths.forEach(function(path){
        path.forEach(function(coord){
          var d = clickPt.distanceTo(L.latLng(coord[1], coord[0]));
          if (d < bestDist) { bestDist = d; bestFeat = feat; }
        });
      });
    });
    if (!bestFeat) return;

    var newPts = [];
    bestFeat.geometry.paths.forEach(function(path){
      path.forEach(function(c){ newPts.push(L.latLng(c[1], c[0])); });
    });

    // Read preReachPts fresh — may have been updated by a previous append
    var existPts = preReachPts || (getActiveWE() && getActiveWE().ppData['reach_len'] && getActiveWE().ppData['reach_len']._preTrimPts);
    if (!existPts) return;
    var reachStart = existPts[0], reachEnd = existPts[existPts.length-1];
    var newStart = newPts[0], newEnd = newPts[newPts.length-1];
    var dES = reachEnd.distanceTo(newStart), dEE = reachEnd.distanceTo(newEnd);
    var dSS = reachStart.distanceTo(newStart), dSE = reachStart.distanceTo(newEnd);
    var minD = Math.min(dES, dEE, dSS, dSE);
    // See note in reachExtendClick() — reject segments that don't actually touch the
    // reach instead of drawing a straight phantom line to the nearest endpoint.
    var MAX_CONNECT_M = 50;
    if (minD > MAX_CONNECT_M) {
      clearReachAutoLayers();
      setMapHint('That segment doesn\'t connect to your reach — click a segment nearer the end you want to extend');
      return;
    }
    var combinedPts;
    if (minD === dES)      combinedPts = existPts.concat(newPts);
    else if (minD === dEE) combinedPts = existPts.concat(newPts.slice().reverse());
    else if (minD === dSE) combinedPts = newPts.concat(existPts);
    else                   combinedPts = newPts.slice().reverse().concat(existPts);

    var name = bestFeat.attributes.gnisidlabel || 'segment';
    var preview = L.polyline(newPts, {color:'#c07820', weight:3, dashArray:'6,3', interactive:false}).addTo(map);
    reachAutoLayers.push(preview);
    // Invisible, wider companion carries the click/hover — see note above.
    var previewHit = L.polyline(newPts, {weight:20, opacity:0.001, interactive:true})
      .bindTooltip('Append "'+name+'" — click to confirm').addTo(map);
    reachAutoLayers.push(previewHit);

    previewHit.on('click', function(e) {
      L.DomEvent.stop(e);
      clearReachAutoLayers();
      preReachPts = combinedPts;
      if (reachTrimLayer) map.removeLayer(reachTrimLayer);
      reachTrimLayer = L.polyline(combinedPts, {color:'#1a9abf', weight:3, dashArray:'6,4', interactive:false}).addTo(map);
      var we2 = getActiveWE(); if (!we2) return;
      we2.ppData['reach_len']._preTrimPts = combinedPts;
      // Stay in extend mode so user can keep adding without re-clicking the button
      preReachExtend = true;
      we2.ppData['reach_len']._preTrimExtending = true;
      setMapHint('Segment added — click another stream to keep extending, or click <b>Pick endpoints</b> in the sidebar');
      var m2 = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
      renderPMRow(m2);
    });

    setMapHint('Click the orange segment to append it, or click elsewhere for a different one');
  }).catch(function() {
    setMapHint('Could not reach USGS NHD — try again');
  });
}

function startPreTrimExtend() {
  preReachExtend = true;
  document.getElementById('mapwrap').classList.add('drawing');
  setMapHint('Click on a stream segment to append it to the highlighted reach');
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  var we = getActiveWE(); if (!we) return;
  we.ppData['reach_len']._preTrimExtending = true;
  renderPMRow(m);
}

function cancelPreTrimExtend() {
  preReachExtend = false;
  clearReachAutoLayers();
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('Wrong stream? Click <b>Try different stream</b> in the sidebar. Otherwise extend if needed, then click <b>Pick endpoints</b>');
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  var we = getActiveWE(); if (!we) return;
  we.ppData['reach_len']._preTrimExtending = false;
  renderPMRow(m);
}

function proceedToTrim() {
  var we = getActiveWE(); if (!we) return;
  var pts = preReachPts || (we.ppData['reach_len'] && we.ppData['reach_len']._preTrimPts);
  if (!pts) return;
  we.ppData['reach_len']._preTrim = false;
  we.ppData['reach_len']._preTrimPts = null;
  preReachPts = null;
  preReachExtend = false;
  if (reachTrimLayer) { map.removeLayer(reachTrimLayer); reachTrimLayer = null; }
  clearReachAutoLayers();
  setTimeout(function(){ startReachTrimMode(pts); }, 50);
}

function cancelPreTrimStep() {
  var we = getActiveWE(); if (!we) return;
  preReachPts = null;
  preReachExtend = false;
  if (we.ppData['reach_len']) {
    we.ppData['reach_len']._preTrim = false;
    we.ppData['reach_len']._preTrimPts = null;
  }
  if (reachTrimLayer) { map.removeLayer(reachTrimLayer); reachTrimLayer = null; }
  clearReachAutoLayers();
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('');
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  renderPMRow(m);
  if (wizardMode) renderWizardStep();
}

function redetectReach() {
  // Cancel pre-trim and immediately re-enter auto-detect mode
  var we = getActiveWE(); if (!we) return;
  preReachPts = null;
  preReachExtend = false;
  if (we.ppData['reach_len']) {
    we.ppData['reach_len']._preTrim = false;
    we.ppData['reach_len']._preTrimPts = null;
    we.ppData['reach_len']._autoResults = null;
  }
  if (reachTrimLayer) { map.removeLayer(reachTrimLayer); reachTrimLayer = null; }
  clearReachAutoLayers();
  startReachAutoDetect();
}

function startReachTrimMode(pts) {
  var we = getActiveWE(); if (!we) return;
  reachTrimming = true;
  reachTrimPts = pts;
  reachTrimClicks = [];
  // Show full waterway as dashed preview
  if (reachTrimLayer) map.removeLayer(reachTrimLayer);
  reachTrimLayer = L.polyline(pts, {color:'#1a9abf', weight:3, dashArray:'6,4', interactive:false}).addTo(map);
  document.getElementById('mapwrap').classList.add('drawing');
  setMapHint('Click to mark one <b>end</b> of your reach (1 of 2)');
}

function cancelReachTrimMode() {
  reachTrimming = false;
  reachTrimPts = null;
  reachTrimClicks = [];
  if (reachTrimLayer) { map.removeLayer(reachTrimLayer); reachTrimLayer = null; }
  clearPreview();
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('');
}

function reachTrimClick(latlng) {
  if (!reachTrimPts) return;
  reachTrimClicks.push(latlng);
  if (reachTrimClicks.length === 1) {
    // Draw a hash tick mark perpendicular to the waterway at the clicked point
    var seg = nearestSegmentOnLine(reachTrimPts, latlng);
    var snap = nearestPointOnLine(reachTrimPts, latlng);
    if (seg && snap) {
      var toRad = function(x){return x*Math.PI/180;};
      var cosLat = Math.cos(toRad(snap.lat));
      var dLat = seg.b.lat - seg.a.lat;
      var dLng = (seg.b.lng - seg.a.lng) * cosLat;
      var len = Math.sqrt(dLat*dLat + dLng*dLng);
      if (len > 1e-10) {
        var perpLat = -dLng / len;
        var perpLng =  dLat / len / cosLat;
        var ext = 0.0003;
        var p1 = L.latLng(snap.lat + perpLat*ext, snap.lng + perpLng*ext);
        var p2 = L.latLng(snap.lat - perpLat*ext, snap.lng - perpLng*ext);
        var tick = L.polyline([p1, p2], {color:'#c07820', weight:4, interactive:false}).addTo(map);
        reachTrimClicks[0]._tick = tick;
      }
    }
    setMapHint('Now click the <b>other end</b> of your reach (2 of 2)');
  } else if (reachTrimClicks.length === 2) {
    // Remove tick marks
    if (reachTrimClicks[0]._tick) map.removeLayer(reachTrimClicks[0]._tick);
    var trimmed = trimLineToClicks(reachTrimPts, reachTrimClicks[0], reachTrimClicks[1]);
    cancelReachTrimMode();
    commitAutoReach(trimmed);
  }
}

function reachTrimMove(latlng) {
  if (!reachTrimming || !reachTrimPts) return;
  clearPreview();
  // Show perpendicular line at cursor position snapped to waterway
  var nearest = nearestPointOnLine(reachTrimPts, latlng);
  if (!nearest) return;
  // Draw a small crosshair perpendicular indicator
  var toRad = function(x){return x*Math.PI/180;};
  var seg = nearestSegmentOnLine(reachTrimPts, latlng);
  if (!seg) return;
  var cosLat = Math.cos(toRad(nearest.lat));
  var dLat = seg.b.lat - seg.a.lat;
  var dLng = (seg.b.lng - seg.a.lng) * cosLat;
  var len = Math.sqrt(dLat*dLat + dLng*dLng);
  if (len < 1e-10) return;
  var perpLat = -dLng / len;
  var perpLng =  dLat / len / cosLat;
  var ext = 0.0008;
  var p1 = L.latLng(nearest.lat + perpLat*ext, nearest.lng + perpLng*ext);
  var p2 = L.latLng(nearest.lat - perpLat*ext, nearest.lng - perpLng*ext);
  drawPreview = L.polyline([p1, p2], {color:'#ff3333', weight:2.5, dashArray:'5,3', interactive:false}).addTo(map);
}

// Find nearest point on a polyline to latlng
function nearestPointOnLine(pts, latlng) {
  var best = null, bestD = Infinity;
  for (var i = 0; i < pts.length-1; i++) {
    var n = nearestOnSegment(latlng, pts[i], pts[i+1]);
    var d = Math.pow(n.lat-latlng.lat,2)+Math.pow(n.lng-latlng.lng,2);
    if (d < bestD) { bestD = d; best = n; }
  }
  return best;
}

function nearestSegmentOnLine(pts, latlng) {
  var best = null, bestD = Infinity;
  for (var i = 0; i < pts.length-1; i++) {
    var n = nearestOnSegment(latlng, pts[i], pts[i+1]);
    var d = Math.pow(n.lat-latlng.lat,2)+Math.pow(n.lng-latlng.lng,2);
    if (d < bestD) { bestD = d; best = {a: pts[i], b: pts[i+1]}; }
  }
  return best;
}

// Trim a polyline to the segment between two clicked points
function trimLineToClicks(pts, click1, click2) {
  // Find nearest point on line for each click
  var t1 = nearestParamOnLine(pts, click1);
  var t2 = nearestParamOnLine(pts, click2);
  if (t1 > t2) { var tmp = t1; t1 = t2; t2 = tmp; }

  // Walk segments, collecting points between t1 and t2
  var result = [];
  var cumLen = 0;
  var totalLen = 0;
  // compute total param range
  for (var i = 0; i < pts.length-1; i++) {
    totalLen += Math.sqrt(Math.pow(pts[i+1].lat-pts[i].lat,2)+Math.pow(pts[i+1].lng-pts[i].lng,2));
  }
  var segStart = 0;
  for (var i = 0; i < pts.length-1; i++) {
    var segLen = Math.sqrt(Math.pow(pts[i+1].lat-pts[i].lat,2)+Math.pow(pts[i+1].lng-pts[i].lng,2));
    var segEnd = segStart + segLen;
    var tStart = segStart / totalLen, tEnd = segEnd / totalLen;
    if (tEnd < t1 || tStart > t2) { segStart = segEnd; continue; }
    if (result.length === 0) {
      // Add the interpolated start point
      var frac = (t1 - tStart) / (tEnd - tStart);
      frac = Math.max(0, Math.min(1, frac));
      result.push(L.latLng(pts[i].lat + frac*(pts[i+1].lat-pts[i].lat), pts[i].lng + frac*(pts[i+1].lng-pts[i].lng)));
    }
    if (tEnd <= t2) result.push(pts[i+1]);
    else {
      var frac2 = (t2 - tStart) / (tEnd - tStart);
      frac2 = Math.max(0, Math.min(1, frac2));
      result.push(L.latLng(pts[i].lat + frac2*(pts[i+1].lat-pts[i].lat), pts[i].lng + frac2*(pts[i+1].lng-pts[i].lng)));
      break;
    }
    segStart = segEnd;
  }
  return result.length >= 2 ? result : pts;
}

function nearestParamOnLine(pts, latlng) {
  var bestT = 0, bestD = Infinity;
  var totalLen = 0;
  for (var i = 0; i < pts.length-1; i++)
    totalLen += Math.sqrt(Math.pow(pts[i+1].lat-pts[i].lat,2)+Math.pow(pts[i+1].lng-pts[i].lng,2));
  var cum = 0;
  for (var i = 0; i < pts.length-1; i++) {
    var segLen = Math.sqrt(Math.pow(pts[i+1].lat-pts[i].lat,2)+Math.pow(pts[i+1].lng-pts[i].lng,2));
    var n = nearestOnSegment(latlng, pts[i], pts[i+1]);
    var d = Math.pow(n.lat-latlng.lat,2)+Math.pow(n.lng-latlng.lng,2);
    if (d < bestD) {
      bestD = d;
      var frac = segLen > 0 ? Math.sqrt(Math.pow(n.lat-pts[i].lat,2)+Math.pow(n.lng-pts[i].lng,2))/segLen : 0;
      bestT = (cum + frac*segLen) / totalLen;
    }
    cum += segLen;
  }
  return bestT;
}

function commitAutoReach(pts) {
  var we = getActiveWE(); if (!we) return;
  if (we.ppData['reach_len'] && we.ppData['reach_len'].layer && !confirmReachChange(we)) return;
  var clipped = clipPtsToPerimeter(we, pts, 'line');
  if (!clipped) {
    setMapHint('That stream falls entirely outside your project boundary — not saved.');
    return;
  }
  pts = clipped;
  if (!we.ppData['reach_len']) we.ppData['reach_len'] = {};
  if (we.ppData['reach_len'].layer) map.removeLayer(we.ppData['reach_len'].layer);
  var layer = L.polyline(pts, {color:'#c07820', weight:2.5, interactive:true}).bindTooltip('Reach Length').addTo(map);
  we.ppData['reach_len'].layer = layer;
  we.ppData['reach_len'].valueM = geoLen(pts);
  we.ppData['reach_len']._autoDetecting = false;
  we.ppData['reach_len']._autoResults = null;
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  renderPMRow(m); rerenderCalcs(); updatePPProgress(); updateSOWCalcs();
  updateAreaChBuffer(we); updateAreaFpBuffer(we);
  addReachArrow(we);
  updateWELabel(we, true);
  setTimeout(function(){ fetchElevationProfile(we); }, 300);
  // No zoom change — stay at current view
}

function acceptAutoReach(idx) {
  var we = getActiveWE(); if (!we) return;
  var results = we.ppData['reach_len'] && we.ppData['reach_len']._autoResults;
  if (!results || !results[idx]) return;
  var pts = results[idx].pts;
  clearReachAutoLayers();
  reachAutoDetecting = false;
  we.ppData['reach_len']._autoDetecting = false;
  we.ppData['reach_len']._autoResults = null;
  document.getElementById('mapwrap').classList.remove('drawing');
  setMapHint('');
  var m = PP_DEFS.filter(function(x){return x.id==='reach_len';})[0];
  renderPMRow(m);
  // Enter pre-trim step so user can extend before picking endpoints
  setTimeout(function() { enterPreTrimStep(pts); }, 50);
}

// Clip a polyline to a polygon, returning only the interior segment(s)
function clipLineToPolygon(linePts, polyPts) {
  if (!linePts || linePts.length < 2 || !polyPts || polyPts.length < 3) return linePts;

  function ptInPoly(p, poly) {
    var inside = false;
    for (var i = 0, j = poly.length-1; i < poly.length; j = i++) {
      var xi=poly[i].lng, yi=poly[i].lat, xj=poly[j].lng, yj=poly[j].lat;
      if (((yi>p.lat)!==(yj>p.lat)) && (p.lng < (xj-xi)*(p.lat-yi)/(yj-yi)+xi)) inside=!inside;
    }
    return inside;
  }

  function segPolyIntersections(p1, p2, poly) {
    var hits = [];
    for (var i = 0; i < poly.length; i++) {
      var p3 = poly[i], p4 = poly[(i+1)%poly.length];
      var d1={lat:p2.lat-p1.lat,lng:p2.lng-p1.lng};
      var d2={lat:p4.lat-p3.lat,lng:p4.lng-p3.lng};
      var cross=d1.lat*d2.lng-d1.lng*d2.lat;
      if(Math.abs(cross)<1e-12) continue;
      var t=((p3.lat-p1.lat)*d2.lng-(p3.lng-p1.lng)*d2.lat)/cross;
      var u=((p3.lat-p1.lat)*d1.lng-(p3.lng-p1.lng)*d1.lat)/cross;
      if(t>1e-10&&t<1-1e-10&&u>=0&&u<=1)
        hits.push({lat:p1.lat+t*d1.lat,lng:p1.lng+t*d1.lng,t:t});
    }
    hits.sort(function(a,b){return a.t-b.t;});
    return hits;
  }

  // Walk the line splitting into continuous interior segments, then return
  // only the longest one. Concatenating all interior segments creates false
  // straight-line jumps between crossing points (the spider-web artifact).
  var segments = [], curSeg = [];
  var inside = ptInPoly(linePts[0], polyPts);
  if (inside) curSeg.push(linePts[0]);

  for (var i = 0; i < linePts.length-1; i++) {
    var hits = segPolyIntersections(linePts[i], linePts[i+1], polyPts);
    hits.forEach(function(h) {
      var pt = L.latLng(h.lat, h.lng);
      if (inside) {
        curSeg.push(pt);          // close current interior segment at exit
        if (curSeg.length >= 2) segments.push(curSeg);
        curSeg = [];
      } else {
        curSeg = [pt];            // start new interior segment at entry
      }
      inside = !inside;
    });
    if (inside) curSeg.push(linePts[i+1]);
  }
  if (curSeg.length >= 2) segments.push(curSeg);

  if (!segments.length) return null;

  // Pick the longest segment by approximate arc length
  function arcLen(seg) {
    var d = 0;
    for (var k = 1; k < seg.length; k++) {
      var dlat = seg[k].lat - seg[k-1].lat, dlng = seg[k].lng - seg[k-1].lng;
      d += Math.sqrt(dlat*dlat + dlng*dlng);
    }
    return d;
  }
  var longest = segments[0];
  for (var s = 1; s < segments.length; s++) {
    if (arcLen(segments[s]) > arcLen(longest)) longest = segments[s];
  }
  return longest.length >= 2 ? longest : null;
}

// Global keyboard handler
// Note: we-modal / sowmodal / welcome-modal are esa-dialog elements, which handle
// Escape (and focus restore) internally — no manual check needed here for them.
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (lineEditing) { cancelLineEdit(); return; }
    if (reachTrimming) { cancelReachTrimMode(); return; }
    if (preReachExtend) { cancelPreTrimExtend(); return; }
    if (reachExtending) { cancelReachExtend(); return; }
    if (reachAutoDetecting) { cancelReachAutoDetect(); return; }
    if (crDrawing) { crDrawing=null; drawPts=[]; clearPreview(); document.getElementById('mapwrap').classList.remove('drawing'); setMapHint(''); return; }
    if (chuDrawing) { cancelCHUSplit(); return; }
    if (ppDrawing) { ppDrawing=null; drawPts=[]; clearPreview(); document.getElementById('mapwrap').classList.remove('drawing'); setMapHint(''); return; }
  }
});
// ── Map events ────────────────────────────────────────────────────────────
function mapClick(e) {
  if(pendingStructPoint){placeStructPoint(e.latlng);return;}
  if(pendingGravelPoint){placeGravelPoint(e.latlng);return;}
  if(reachTrimming){reachTrimClick(e.latlng);return;}
  if(preReachExtend){preTrimExtendClick(e.latlng);return;}
  if(reachExtending){reachExtendClick(e.latlng);return;}
  if(reachAutoDetecting){
    // If preview layers are showing, clicking empty map reloads for new view
    if(nhdPreviewData){ loadNHDPreview(); return; }
    reachAutoClick(e.latlng);return;
  }
  if(chuDrawing){chuMapClick(e.latlng);return;}
  if(crDrawing){
    if(crDrawing.geo==='gravel-perp'){
      var we2=getWE(crDrawing.weId);
      var r2=we2&&getCR(we2,crDrawing.reachId);
      if(r2){
        var perpPts=crGravelPerpendicularLine(e.latlng,r2);
        if(perpPts){
          crDrawing.clicks.push({latlng:e.latlng, perp:perpPts});
          if(crDrawing.clicks.length===1){
            // First click — freeze the line and ask for second
            clearPreview();
            if(crDrawing._firstPreview){map.removeLayer(crDrawing._firstPreview);crDrawing._firstPreview=null;}
            crDrawing._firstPreview=L.polyline(perpPts,{color:'#ff3333',weight:2.5,interactive:false}).addTo(map);
            setMapHint('Now click to mark the <b>end</b> of gravel placement (2 of 2)');
          } else {
            // Second click — commit
            finishCRDraw();
          }
        }
      }
      return;
    }
    drawPts.push(e.latlng);
    redraw();
    if(crDrawing.geo==='segment'&&drawPts.length===2){finishCRDraw();return;}
    return;
  }
  if(ppDrawing){
    var m=PP_DEFS.filter(function(x){return x.id===ppDrawing.metricId;})[0];
    var clickPt = (m&&(m.id==='fp_poly'||m.id==='pc_fp')) ? snapToPerimeter(getActiveWE(), e.latlng) : e.latlng;
    drawPts.push(clickPt);redraw();
    if((m.multi>0||m.segment)&&drawPts.length===2)finishPPDraw();
    return;
  }
  if(sowDrawing){
    drawPts.push(e.latlng);redraw();
    if(sowDrawing.geo==='segment'&&drawPts.length===2)finishSOWDraw();
    return;
  }
}
function mapMove(e) {
  if(reachTrimming){reachTrimMove(e.latlng);return;}
  if(chuDrawing){chuMapMove(e.latlng);return;}
  if(crDrawing && crDrawing.geo==='gravel-perp'){
    clearPreview();
    var we3=getWE(crDrawing.weId);
    var r3=we3&&getCR(we3,crDrawing.reachId);
    if(r3){
      var prev=crGravelPerpendicularLine(e.latlng,r3);
      if(prev){
        // If first click already placed, show it frozen + new preview
        if(crDrawing.clicks && crDrawing.clicks.length===1){
          drawPreview=L.polyline(prev,{color:'#ff3333',weight:2.5,dashArray:'6,4',interactive:false}).addTo(map);
          // Keep first line visible
          if(!crDrawing._firstPreview){
            crDrawing._firstPreview=L.polyline(crDrawing.clicks[0].perp,{color:'#ff3333',weight:2.5,interactive:false}).addTo(map);
          }
        } else {
          drawPreview=L.polyline(prev,{color:'#ff3333',weight:2.5,dashArray:'6,4',interactive:false}).addTo(map);
        }
      }
    }
    return;
  }
  var geo=ppDrawing?PP_DEFS.filter(function(x){return x.id===ppDrawing.metricId;})[0].geo:sowDrawing?sowDrawing.geo:crDrawing?crDrawing.geo:null;
  if(!geo||geo==='point'||drawPts.length===0)return;redraw(e.latlng);
}
function mapDbl(e) {
  L.DomEvent.stop(e);
  if(chuDrawing){chuMapDbl(e.latlng);return;}
  if(ppDrawing){finishPPDraw();return;}
  if(crDrawing&&crDrawing.geo!=='segment'){
    if(crDrawing.geo==='line'&&drawPts.length>=2)finishCRDraw();
    else if(crDrawing.geo==='polygon'&&drawPts.length>=3)finishCRDraw();
    return;
  }
  if(sowDrawing&&sowDrawing.geo!=='segment'){
    if(sowDrawing.geo==='line'&&drawPts.length>=2)finishSOWDraw();
    else if(sowDrawing.geo==='polygon'&&drawPts.length>=3)finishSOWDraw();
  }
}
function redraw(cursor) {
  clearPreview();
  var col = ppDrawing ? (PP_COLOR[PP_DEFS.filter(function(x){return x.id===ppDrawing.metricId;})[0].geo]||'#c07820')
           : sowDrawing ? (SOW_COLOR[sowDrawing.geo]||'#999')
           : crDrawing ? '#2a7abf'
           : '#999';
  var geo = ppDrawing ? PP_DEFS.filter(function(x){return x.id===ppDrawing.metricId;})[0].geo
           : sowDrawing ? sowDrawing.geo
           : crDrawing ? crDrawing.geo
           : null;
  var pts=cursor?drawPts.concat([cursor]):drawPts.slice();if(pts.length<2)return;
  previewPL=L.polyline(pts,{color:col,weight:2,dashArray:'5,4',interactive:false}).addTo(map);
  if(geo==='polygon'&&pts.length>=3)previewPG=L.polygon(pts,{color:col,fillColor:col,fillOpacity:.15,weight:1,dashArray:'4,4',interactive:false}).addTo(map);
}
var drawPreview = null;
function clearPreview(){
  if(previewPL){map.removeLayer(previewPL);previewPL=null;}
  if(previewPG){map.removeLayer(previewPG);previewPG=null;}
  if(drawPreview){map.removeLayer(drawPreview);drawPreview=null;}
  if(crDrawing&&crDrawing._firstPreview){map.removeLayer(crDrawing._firstPreview);crDrawing._firstPreview=null;}
}

// ── Wizard panel collapse ───────────────────────────────────────────────────
// Reclaims the wizard column's width for the map — distinct from the retired
// toggleWizardMode() (Guided/Expert switch, dead code, do not touch/fix).
// Collapses just the step-tree accordion (#wizard-panel); the current step's
// own instructions/action button live in #sidebar and stay usable throughout.
function setWizardPanelCollapsed(collapsed){
  var layout=document.getElementById('msow-layout');
  var btn=document.getElementById('wizard-collapse-toggle');
  if(!layout||!btn)return;
  layout.classList.toggle('wizard-collapsed', collapsed);
  btn.setAttribute('aria-expanded', collapsed?'false':'true');
  btn.title=collapsed?'Expand steps panel':'Collapse steps panel';
  btn.setAttribute('aria-label', btn.title);
}
function toggleWizardPanel(){
  var layout=document.getElementById('msow-layout');
  if(!layout)return;
  setWizardPanelCollapsed(!layout.classList.contains('wizard-collapsed'));
}
// Auto-collapse below ~1200px so the map isn't squeezed on narrower browser
// windows (not just short ones — see the max-height compaction in
// map-sow.astro for the height axis). The manual toggle above still works
// freely on either side of this breakpoint; crossing it just resets the
// default, the same way a responsive nav re-snaps its menu on resize.
var wizardNarrowMQ = window.matchMedia('(max-width: 1200px)');
wizardNarrowMQ.addEventListener('change', function(e){ setWizardPanelCollapsed(e.matches); });
setWizardPanelCollapsed(wizardNarrowMQ.matches);

// ── Legend ────────────────────────────────────────────────────────────────
function toggleLegend(){legCollapsed=!legCollapsed;document.getElementById('leg-body').classList.toggle('collapsed',legCollapsed);document.getElementById('leg-toggle').textContent=legCollapsed?'[+]':'[–]';}
function renderLegend() {
  var el=document.getElementById('leg-body');if(!el)return;
  var h='<div class="leg-section"><div class="leg-sec-title">Pre-Project</div>';
  h+='<div class="leg-row"><span class="leg-poly" style="background:#7b4fbf"></span>Polygons</div>';
  h+='<div class="leg-row"><span class="leg-line" style="background:#c07820"></span>Lines</div>';
  h+='<div class="leg-row"><span style="width:14px;height:10px;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center"><svg width="11" height="13" viewBox="0 0 18 18"><polygon points="9,0 17,18 9,12 1,18" fill="#c07820" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg></span>Flow direction</div></div>';
  h+='<div class="leg-section"><div class="leg-sec-title">Habitat Work</div>';
  h+='<div class="leg-row"><span class="leg-poly" style="background:#2a7a5c"></span>Polygons</div>';
  h+='<div class="leg-row"><span class="leg-line" style="background:#1a7abf"></span>Lines</div>';
  h+='<div class="leg-row"><span class="leg-line" style="background:#e07b28"></span>Width segments</div></div>';
  h+='<div class="leg-section"><div class="leg-sec-title">Channel Habitat Units</div>';
  h+='<div class="leg-row"><span class="leg-poly" style="background:'+CHU_COLOR.riffle+'"></span>Riffle</div>';
  h+='<div class="leg-row"><span class="leg-poly" style="background:'+CHU_COLOR.pool+'"></span>Pool</div></div>';
  h+='<div class="leg-section"><div class="leg-sec-title">Secondary Channels</div>';
  h+='<div class="leg-row"><span class="leg-line" style="background:'+SC_COLOR+'"></span>Secondary channel</div></div>';
  h+='<div class="leg-section"><div class="leg-sec-title">Wetlands</div>';
  h+='<div class="leg-row"><span class="leg-poly" style="background:'+WETLAND_COLOR.existing+'"></span>Existing Wetland Area</div>';
  h+='<div class="leg-row"><span class="leg-poly" style="background:'+WETLAND_COLOR.enhance+'"></span>Wetland Enhancement</div></div>';
  // Work Elements section hidden for now — per request, kept for easy restore.
  // if(workElements.length){
  //   h+='<div class="leg-section"><div class="leg-sec-title">Work Elements</div>';
  //   workElements.forEach(function(we,i){h+='<div class="leg-row"><span style="font-size:10px;font-weight:700;color:#1a3a5c;margin-right:2px">WE'+(i+1)+'</span>'+we.name+'</div>';});
  //   h+='</div>';
  // }
  // Only worth calling out when a work element actually has more than one primary channel
  var activeWEForLeg = getActiveWE();
  if (activeWEForLeg && activeWEForLeg.primaryChannels && activeWEForLeg.primaryChannels.length > 1) {
    h+='<div class="leg-section"><div class="leg-sec-title">Primary Channels</div>';
    activeWEForLeg.primaryChannels.forEach(function(pc,i){
      h+='<div class="leg-row"><span class="leg-line" style="background:'+PC_CHANNEL_COLORS[i % PC_CHANNEL_COLORS.length]+'"></span>'+pc.name+'</div>';
    });
    h+='</div>';
  }
  el.innerHTML=h;
  el.classList.toggle('collapsed', legCollapsed);
  var toggleEl = document.getElementById('leg-toggle');
  if (toggleEl) { toggleEl.textContent = legCollapsed ? '[+]' : '[–]'; toggleEl.setAttribute('aria-expanded', legCollapsed ? 'false' : 'true'); }
}

// ── Geometry ──────────────────────────────────────────────────────────────
function geoLen(pts){var d=0;for(var i=0;i<pts.length-1;i++)d+=pts[i].distanceTo(pts[i+1]);return d;}
function geoArea(pts){return geoAreaM2(pts)*0.000247105;}
function geoAreaM2(pts){var R=6378137,toRad=function(x){return x*Math.PI/180;},area=0,n=pts.length;for(var i=0;i<n;i++){var j=(i+1)%n;area+=toRad(pts[j].lng-pts[i].lng)*(2+Math.sin(toRad(pts[i].lat))+Math.sin(toRad(pts[j].lat)));}return Math.abs(area*R*R/2);}

// ── Misc ──────────────────────────────────────────────────────────────────
function setMapHint(msg){
  var el=document.getElementById('map-hint');
  el.innerHTML=msg;
  el.style.display=msg?'block':'none';
  repositionMapOverlays();
}
// Drop the hint (and, below that, the draw-done/edit-done overlay buttons) under whichever
// top corner control stack — search box + zoom control on the left, layer toggle cluster on
// the right — extends furthest down, so a long/wrapped message never renders under either one.
// Called whenever the hint text changes, and also whenever edit-done-bar is shown directly
// (entering vertex-edit mode doesn't always go through setMapHint).
function repositionMapOverlays(){
  var el = document.getElementById('map-hint');
  var mapEl = document.getElementById('map');
  if (!el || !mapEl) return;
  var msg = el.innerHTML;
  var mapTop = mapEl.getBoundingClientRect().top;
  var topLeft = document.querySelector('.leaflet-top.leaflet-left');
  var topRight = document.querySelector('.leaflet-top.leaflet-right');
  var belowY = 10;
  [topLeft, topRight].forEach(function(c){
    if (c) belowY = Math.max(belowY, c.getBoundingClientRect().bottom - mapTop);
  });
  belowY += 8;
  if (msg && el.style.display !== 'none') {
    el.style.top = belowY + 'px';
    belowY += el.getBoundingClientRect().height + 8;
  }
  var doneBtn = document.getElementById('draw-done-btn');
  var editBar = document.getElementById('edit-done-bar');
  var refBar = document.getElementById('ref-image-position-bar');
  if (doneBtn) doneBtn.style.top = belowY + 'px';
  if (editBar) editBar.style.top = belowY + 'px';
  if (refBar) refBar.style.top = belowY + 'px';
}
// A narrower window rewraps the hint to more lines without any of the setMapHint()/
// edit-done-bar call sites firing, which left draw-done-btn's stale top overlapping it.
window.addEventListener('resize', repositionMapOverlays);
function toggleSec(head){var body=head.nextElementSibling;var open=body.classList.toggle('open');head.querySelector('span').textContent=open?'▾':'▸';}

// ── Wizard Mode ────────────────────────────────────────────────────────────
var wizardMode = true; // Guided wizard is the only mode now; Expert mode is retired but left in place, unreachable.
var wizardStep = 0;
// Collapsible stepper sections: null = auto-follow the current step's section (the
// normal behavior as you move through the wizard); a section key = that section is
// force-open (user manually peeked at it); '__none__' = user collapsed everything.
// Reset to null on every real navigation so the accordion snaps back to following
// wherever you actually are.
var wzOpenSection = null;
var wzLastEffectiveSection = null;

var WIZARD_STEPS = [
  { id:'perimeter',  label:'Project Boundary', title:'Draw Project Boundary',          phase:'pp' },
  { id:'reach',      label:'Stream Reach',     title:'Identify Your Stream Reach',     phase:'pp' },
  { id:'ch_width',   label:'Channel Width',   title:'Measure Channel Width',          phase:'pp' },
  { id:'substrate',  label:'Substrate',       title:'Enter Reach-Averaged Substrate', phase:'pp' },
  { id:'fp_poly',    label:'Floodplain',      title:'Draw Floodplain Boundary',       phase:'pp' },
  { id:'buffers',    label:'Review Areas',    title:'Review Floodplain Areas',        phase:'pp' },
  { id:'pp_wetland', label:'Existing Wetlands', title:'Existing Wetland Areas',       phase:'pp' },
  { id:'pp_done',    label:'Pre-Project Done',  title:'Pre-Project Complete!',          phase:'pp' },
  { id:'pc_reach',   label:'Primary Channel',  title:'Draw Primary Channel',           phase:'work', types:['pc'], repeat:'pc' },
  { id:'pc_width',   label:'Channel Width',    title:'Enter Primary Channel Width',    phase:'work', types:['pc'], repeat:'pc' },
  { id:'pc_metrics', label:'Metrics', title:'Primary Channel Metrics',    phase:'work', types:['pc'], repeat:'pc' },
  { id:'pc_gravel',  label:'Gravel Placement', title:'Gravel Placement',               phase:'work', types:['pc'], repeat:'pc' },
  { id:'pc_fp',      label:'New Floodplain',   title:'Draw New Floodplain',            phase:'work', types:['pc'], repeat:'pc' },
  { id:'chu_split',  label:'Identify Pools',   title:'Identify Pool Locations',        phase:'work', types:['pc'], repeat:'pc' },
  { id:'chu_details', label:'Pool & Riffle Details', title:'Pool and Riffle Details', phase:'work', types:['pc'], repeat:'pc' },
  { id:'structures', label:'Structures',      title:'Wood Structures',                phase:'work', types:['pc'], repeat:'pc' },
  { id:'pc_channel_done', label:'Channel Complete', title:'Primary Channel Complete!', phase:'work', types:['pc'], repeat:'pc' },
  { id:'sc_draw',  label:'Secondary Channels', title:'Draw Secondary Channels',   phase:'work', types:['fp'], section:'sc' },
  { id:'sc_wood',  label:'Wood Counts',         title:'Secondary Channel Wood',    phase:'work', types:['fp'], section:'sc' },
  { id:'fp_structures',  label:'Structures',      title:'Floodplain Structures',        phase:'work', types:['fp'] },
  { id:'fp_reach_width', label:'Floodplain Width',   title:'Floodplain Connectivity Width', phase:'work', types:['fp'] },
  { id:'fp_grading',     label:'Grading',         title:'Floodplain Grading',           phase:'work', types:['fp'] },
  { id:'fp_road',        label:'Road Removal',    title:'Road Removed/Setback',         phase:'work', types:['fp'] },
  { id:'fp_berm',        label:'Berm Removal',    title:'Berm/Levee Removed',           phase:'work', types:['fp'] },
  { id:'fp_revetment',   label:'Revetment Removal', title:'Revetment Removed',          phase:'work', types:['fp'] },
  { id:'fp_tailings',    label:'Mine Tailings',   title:'Mine Tailings Removed',        phase:'work', types:['fp'] },
  { id:'fp_wetland_enhance', label:'Wetland Enhancement', title:'Existing Wetland Habitat Enhanced', phase:'work', types:['fp'] },
  { id:'rr_fencing',  label:'Fencing',           title:'Riparian Protection — Fencing',      phase:'work', types:['rr'] },
  { id:'rr_planting', label:'Planting & Invasive', title:'Riparian Planting & Regeneration', phase:'work', types:['rr'] },
  { id:'rr_totals',   label:'Bank & Totals',     title:'Riparian Totals',                    phase:'work', types:['rr'] },
  { id:'done',       label:'Complete',        title:'Design Complete!',         phase:'work' }
];

function toggleWizardMode() {
  wizardMode = !wizardMode;
  var btn = document.getElementById('wizard-toggle-btn');
  var wiz = document.getElementById('wizard-panel');
  var wizBody = document.getElementById('wizard-body-panel');
  var exp = document.getElementById('expert-panel');
  if (wizardMode) {
    btn.textContent = '☰ Expert';
    btn.style.background = '#2a7a5c';
    btn.style.color = '#fff';
    btn.setAttribute('aria-pressed', 'true');
    wiz.style.display = 'flex';
    if (wizBody) wizBody.style.display = 'flex';
    if (exp) exp.style.display = 'none';
    if (!activeWEId) wizardStep = 0;
    renderWizardStep();
  } else {
    btn.textContent = '✦ Guided';
    btn.style.background = '';
    btn.style.color = '';
    btn.setAttribute('aria-pressed', 'false');
    wiz.style.display = 'none';
    wiz.innerHTML = '';
    if (wizBody) { wizBody.style.display = 'none'; wizBody.innerHTML = ''; }
    if (exp) exp.style.display = 'flex';
    if (activeWEId) showInnerTab(activeInnerTab);
    updateWetlandLayerVisibility(getActiveWE(), null);
  }
}

function wizardStepStatus(we, stepId) {
  if (!we) return 'pending';
  switch(stepId) {
    case 'setup':     return activeWEId ? 'done' : 'pending';
    case 'perimeter': return (we.ppData['perimeter'] && we.ppData['perimeter'].layer) ? 'done' : 'pending';
    case 'reach':     return (we.ppData['reach_len'] && we.ppData['reach_len'].layer) ? 'done' : 'pending';
    case 'ch_width': {
      var ch = we.ppData['ch_width'];
      return (ch && ch.lines && ch.lines.filter(function(l){return l&&l.lengthM;}).length >= 3) ? 'done' : 'pending';
    }
    case 'bank_ht':   { var bh=ppCalc(we,'bank_ht'); return bh!==null?'done':'pending'; }
    case 'substrate': return (we.ppData['substrate'] && we.ppData['substrate'].value) ? 'done' : 'pending';
    case 'fp_left':  return (we.ppData['fp_left']  && we.ppData['fp_left'].layer)  ? 'done' : 'pending';
    case 'fp_right': return (we.ppData['fp_right'] && we.ppData['fp_right'].layer) ? 'done' : 'pending';
    case 'fp_poly':  return (we.ppData['fp_poly']  && we.ppData['fp_poly'].layer)  ? 'done' : 'pending';
    case 'pp_wetland': return fpMultiHasAny(we, 'pp_wetland') ? 'done' : 'pending';
    case 'buffers': {
      var ach = we.ppData['area_ch'];
      var achDone = ach && (ach.layer || ach.bufferLayer);
      var fpDone = (we.ppData['fp_poly'] && we.ppData['fp_poly'].layer) ||
                   ((we.ppData['fp_left'] && we.ppData['fp_left'].layer) && (we.ppData['fp_right'] && we.ppData['fp_right'].layer));
      return (achDone && fpDone) ? 'done' : 'pending';
    }
    case 'fp_split':  return (we.ppData['area_fp'] && we.ppData['area_fp'].fpSplit) ? 'done' : 'pending';
    case 'pp_done': {
      // Done when every non-skippable pre-project step is complete (substrate and
      // pp_wetland are legitimately skippable, so they don't gate this)
      var corePP = ['perimeter','reach','ch_width','fp_poly','buffers'];
      return corePP.every(function(id){ return wizardStepStatus(we, id) === 'done'; }) ? 'done' : 'pending';
    }
    case 'pc_metrics': {
      return (pcExcavationCY(we) !== null) ? 'done' : 'pending';
    }
    case 'pc_gravel': {
      var anyGravelPlaced = (getActivePC(we).gravelPlacements||[]).some(function(p){ return !!p.latlng; });
      return anyGravelPlaced ? 'done' : 'pending';
    }
    case 'pc_fp':      return (getActivePC(we).ppData['pc_fp'] && getActivePC(we).ppData['pc_fp'].layer) ? 'done' : 'pending';
    case 'pc_reach':   return (getActivePC(we).sowLayers['pc-reach'] && getActivePC(we).sowLayers['pc-reach'].layer) ? 'done' : 'pending';
    case 'pc_width':   { var pcw=getActivePC(we).inputVals['pc-width']; return (pcw&&pcw>0)?'done':'pending'; }
    case 'chu_split':  return (getActivePC(we).chuUnits && getActivePC(we).chuUnits.length >= 1) ? 'done' : 'pending';
    case 'chu_details': {
      if (!getActivePC(we).chuUnits || getActivePC(we).chuUnits.length < 1) return 'pending';
      var allMeasured = getActivePC(we).chuUnits.every(function(u){
        if (u.type==='pool') return !!(u.avgDepth>0);
        return !!(u.boulderCount>=0 && u.boulderCount!==undefined && u.boulderCount!==null);
      });
      return allMeasured ? 'done' : 'pending';
    }
    case 'structures':{
      var hasSt = false;
      var pcSt = getActivePC(we);
      ['cms','mcs','css'].forEach(function(t){ if(pcSt.structures&&pcSt.structures[t]&&pcSt.structures[t].length) hasSt=true; });
      return hasSt ? 'done' : 'pending';
    }
    case 'pc_channel_done': {
      // Done when every non-skippable step in this primary channel is complete
      // (chu_split, structures, and pc_gravel are legitimately skippable)
      var corePC = ['pc_reach','pc_width','pc_metrics','pc_fp'];
      return corePC.every(function(id){ return wizardStepStatus(we, id) === 'done'; }) ? 'done' : 'pending';
    }
    case 'sc_draw':  return (we.scReaches && we.scReaches.length > 0 && we.scReaches.every(function(r){return r.width>0 && r.flowType;})) ? 'done' : 'pending';
    case 'sc_wood':  { var scL=we.inputVals&&we.inputVals['sc-large-wood'], scS=we.inputVals&&we.inputVals['sc-small-wood']; return (scL>=0&&scS>=0&&(scL>0||scS>0))?'done':'pending'; }
    case 'fp_structures': {
      var logsDrawn = we.sowLayers['fp-logs-area'] && we.sowLayers['fp-logs-area'].valueM;
      var logsCount = we.sowLayers['fp-large-logs'] && we.sowLayers['fp-large-logs'].value;
      return (logsDrawn || logsCount || (we.fpStructs && we.fpStructs.length > 0)) ? 'done' : 'pending';
    }
    case 'fp_reach_width': {
      // Connectivity reach/width are auto-calculated from Secondary Channels now (no
      // action possible on this step for that part) — "done" should reflect the one
      // thing you can actually still do here: enter the bankfull connectivity fields.
      var bfDone = ['fp-bankfull-ac','fp-bankfull-2x-ac'].some(function(k){ return we.sowLayers[k] && we.sowLayers[k].value; });
      return bfDone ? 'done' : 'pending';
    }
    case 'fp_grading': return (fpMultiHasAny(we,'grade') || (we.sowLayers['fp-grade'] && we.sowLayers['fp-grade'].valueM)) ? 'done' : 'pending';
    case 'fp_road': {
      var rdV = we.sowLayers['fp-road-vol'];
      return (fpMultiHasAny(we,'road') || (we.sowLayers['fp-road'] && we.sowLayers['fp-road'].valueM) || (rdV && rdV.value)) ? 'done' : 'pending';
    }
    case 'fp_berm': {
      var bdV = we.sowLayers['fp-berm-vol'];
      return (fpMultiHasAny(we,'berm') || (we.sowLayers['fp-berm'] && we.sowLayers['fp-berm'].valueM) || (bdV && bdV.value)) ? 'done' : 'pending';
    }
    case 'fp_revetment': {
      var vdV = we.sowLayers['fp-revet-vol'];
      return (fpMultiHasAny(we,'revet') || (we.sowLayers['fp-revet'] && we.sowLayers['fp-revet'].valueM) || (vdV && vdV.value)) ? 'done' : 'pending';
    }
    case 'fp_tailings': {
      var tdV = we.sowLayers['fp-tailings-vol'];
      return (fpMultiHasAny(we,'tailings') || (we.sowLayers['fp-tailings'] && we.sowLayers['fp-tailings'].valueM) || (tdV && tdV.value)) ? 'done' : 'pending';
    }
    case 'fp_wetland_enhance': return fpMultiHasAny(we, 'fp_wetland_enhance') ? 'done' : 'pending';
    case 'rr_fencing': {
      var rrFenceDone = ['rr-fence','rr-fence-area'].some(function(k){ return we.sowLayers[k] && we.sowLayers[k].valueM; });
      return rrFenceDone ? 'done' : 'pending';
    }
    case 'rr_planting': {
      var rrPlantVal = we.sowLayers['rr-plants'];
      var rrPlantDone = ['rr-plant-bf','rr-plant-abf','rr-invasive'].some(function(k){ return we.sowLayers[k] && we.sowLayers[k].valueM; })
        || (rrPlantVal && rrPlantVal.value);
      return rrPlantDone ? 'done' : 'pending';
    }
    case 'rr_totals': {
      var rrTotalsDone = ['rr-bank','rr-total'].some(function(k){ return we.sowLayers[k] && we.sowLayers[k].valueM; });
      return rrTotalsDone ? 'done' : 'pending';
    }
    case 'done':      return 'pending';
  }
  return 'pending';
}

// Steps flagged repeat:'pc' appear once per we.primaryChannels entry — each virtual
// step instance is tagged with pcId/pcIndex so status/body/autoActivate can resolve
// the right channel (via we.activePCId, synced by the nav functions below).
function getVisibleSteps() {
  var we = getActiveWE();
  var types = we ? we.types : [];
  var filtered = WIZARD_STEPS.filter(function(s) {
    if (!s.types) return true; // no type restriction
    return s.types.some(function(t){ return types.indexOf(t) >= 0; });
  });
  if (!we) return filtered;
  // Repeat steps are a contiguous run in WIZARD_STEPS — expand the WHOLE run per
  // channel (channel 1's full run, then channel 2's, ...), not step-by-step across
  // channels, so each channel's steps stay grouped together in the stepper.
  var expanded = [];
  var i = 0;
  while (i < filtered.length) {
    var s = filtered[i];
    if (s.repeat === 'pc') {
      var runStart = i;
      while (i < filtered.length && filtered[i].repeat === 'pc') i++;
      var run = filtered.slice(runStart, i);
      (we.primaryChannels||[]).forEach(function(pc, ci) {
        run.forEach(function(rs) {
          var copy = {}; for (var k in rs) copy[k] = rs[k];
          copy.pcId = pc.id; copy.pcIndex = ci;
          expanded.push(copy);
        });
      });
    } else {
      expanded.push(s);
      i++;
    }
  }
  return expanded;
}

// Collapsible per-step help box — placeholder for now (generic text); will eventually
// hold term definitions and reference photos (e.g. what a riffle looks like, the
// different wood structure types) specific to each step's topic.
function wzHelpBox(topic) {
  return '<div class="wz-help">'
    + '<div class="wz-help-head" onclick="toggleWzHelp(this)">'
    + '<span class="wz-help-icon">&#9432;</span><span>Learn more about ' + topic + '</span>'
    + '<span class="wz-help-caret">&#9660;</span>'
    + '</div>'
    + '<div class="wz-help-body">Help content coming soon — this will define key terms and show reference photos for this step.</div>'
    + '</div>';
}
function toggleWzHelp(head) {
  var body = head.nextElementSibling;
  var open = body.classList.toggle('open');
  head.classList.toggle('open', open);
}
// Insert the help box right after the step's own <div class="wz-step-desc"> intro
// (every step case leads with one); if that pattern isn't found, fall back to
// placing it at the very top of the step body.
function wzInsertHelpBox(bodyHtml, topic) {
  var helpBox = wzHelpBox(topic);
  // Prefer right after the step's <div class="wz-step-desc"> (wherever it falls — every
  // case emits a wz-step-num + wz-step-title header first, then its own description).
  var descStart = bodyHtml.indexOf('<div class="wz-step-desc">');
  if (descStart > -1) {
    var descEnd = bodyHtml.indexOf('</div>', descStart);
    if (descEnd > -1) {
      var insertAt = descEnd + '</div>'.length;
      return bodyHtml.slice(0, insertAt) + helpBox + bodyHtml.slice(insertAt);
    }
  }
  // Fallback: right after the (always-present) step title, above any per-case content.
  var titleStart = bodyHtml.indexOf('<div class="wz-step-title">');
  if (titleStart > -1) {
    var titleEnd = bodyHtml.indexOf('</div>', titleStart);
    if (titleEnd > -1) {
      var insertAt2 = titleEnd + '</div>'.length;
      return bodyHtml.slice(0, insertAt2) + helpBox + bodyHtml.slice(insertAt2);
    }
  }
  return helpBox + bodyHtml;
}

function renderWizardStep() {
  if (!wizardMode) return;
  var panel = document.getElementById('wizard-panel');
  if (!panel) return;
  var we = getActiveWE();
  var visSteps = getVisibleSteps();
  var step = visSteps[wizardStep] || visSteps[visSteps.length-1];
  if (!step) return;
  updateWetlandLayerVisibility(we, step);
  updateFpPolyVisibilityForStep(we, step);

  // ── Vertical stepper (vendor-invoice pattern), grouped into collapsible sections ──
  var workSectionLabels = {pc: 'Primary Channel', sc: 'Secondary Channels', fp: 'Floodplain', rr: 'Riparian Restoration'};
  var savedActivePCId = we ? we.activePCId : null;

  // Group steps into sections first (Pre-Project, each Primary Channel, Secondary
  // Channels, Floodplain, Riparian) so each can be collapsed as a unit.
  var sections = [];
  var prevSectionKey = null;
  visSteps.forEach(function(s, i) {
    // Steps repeated per primary channel must resolve status against THEIR channel,
    // not whichever one the user currently has active — swap it in for this check only.
    if (we && s.pcId) we.activePCId = s.pcId;
    var st = wizardStepStatus(we, s.id);
    if (we && s.pcId) we.activePCId = savedActivePCId;
    var isActive = (i === wizardStep);
    var isDone = st === 'done';
    var isLast = (i === visSteps.length - 1);

    var sectionKey = null, sectionLabel = null, sectionPhase = (s.phase === 'pp') ? 'pp' : 'work';
    if (s.phase === 'pp') {
      sectionKey = 'pp'; sectionLabel = 'Pre-Project';
    } else if (s.types && s.types.length) {
      sectionKey = s.repeat === 'pc' ? ('pc-' + s.pcIndex) : (s.section || s.types[0]);
      sectionLabel = s.repeat === 'pc' ? ('Primary Channel ' + (s.pcIndex + 1)) : (workSectionLabels[sectionKey] || sectionKey);
    }
    // Steps with no section info of their own (e.g. the final 'done' step) tack onto
    // whichever section came last, same as the old flat rendering did.
    if (sectionKey !== null && sectionKey !== prevSectionKey) {
      sections.push({key: sectionKey, label: sectionLabel, phase: sectionPhase, items: []});
      prevSectionKey = sectionKey;
    }
    if (!sections.length) sections.push({key: 'main', label: '', phase: sectionPhase, items: []});
    sections[sections.length - 1].items.push({s:s, i:i, isActive:isActive, isDone:isDone, isLast:isLast});
  });

  // Accordion state: current step's section auto-opens unless the user explicitly
  // opened/closed a different one (wzOpenSection), which resets on real navigation.
  var activeSectionKey = null;
  sections.forEach(function(sec){ if (sec.items.some(function(it){ return it.isActive; })) activeSectionKey = sec.key; });
  var effectiveOpenKey = (wzOpenSection !== null) ? wzOpenSection : activeSectionKey;
  wzLastEffectiveSection = effectiveOpenKey;

  var stepsHtml = '<div class="wz-v-steps">';
  var workPhaseOpened = false;
  sections.forEach(function(sec) {
    // Mark the Pre-Project → Project Design transition with a banner the first time
    // a 'work'-phase section appears, so the sidebar reads as two distinct phases
    // rather than one flat list of same-looking sections.
    if (sec.phase === 'work' && !workPhaseOpened) {
      stepsHtml += '<div class="wz-phase-group" data-phase="work">';
      stepsHtml += '<div class="wz-phase-group-title">Project Design</div>';
      workPhaseOpened = true;
    }
    var isOpen = sec.key === effectiveOpenKey;
    var doneCount = sec.items.filter(function(it){ return it.isDone; }).length;
    var totalCount = sec.items.length;
    stepsHtml += '<div class="wz-v-section' + (isOpen ? ' open' : '') + '">';
    stepsHtml += '<div class="wz-v-phase-head" onclick="toggleWzSection(\''+sec.key+'\')">';
    stepsHtml += '<span class="wz-v-phase-caret">' + (isOpen ? '&#9660;' : '&#9656;') + '</span>';
    stepsHtml += '<span class="wz-v-phase-label">' + sec.label + '</span>';
    stepsHtml += '<span class="wz-v-phase-count' + (doneCount===totalCount ? ' done' : '') + '">' + doneCount + '/' + totalCount + '</span>';
    stepsHtml += '</div>';
    stepsHtml += '<div class="wz-v-section-body">';
    sec.items.forEach(function(it) {
      var s=it.s, i=it.i, isActive=it.isActive, isDone=it.isDone, isLast=it.isLast;
      stepsHtml += '<div class="wz-v-item wz-v-item--nav" onclick="wizardGoToStep('+i+')" title="Go to: '+s.label+'">';
      stepsHtml += '<div class="wz-v-left">';
      stepsHtml += '<div class="wz-v-circle' + (isDone && isActive ? ' done active' : isDone ? ' done' : isActive ? ' active' : '') + '">';
      stepsHtml += isDone ? '&#10003;' : (i + 1);
      stepsHtml += '</div>';
      if (!isLast) stepsHtml += '<div class="wz-v-line' + (isDone ? ' done' : '') + '"></div>';
      stepsHtml += '</div>';
      stepsHtml += '<div class="wz-v-label' + (isActive ? ' active' : isDone ? ' done' : '') + '">' + s.label + '</div>';
      stepsHtml += '</div>';
    });
    stepsHtml += '</div>'; // wz-v-section-body
    stepsHtml += '</div>'; // wz-v-section
  });
  if (workPhaseOpened) stepsHtml += '</div>'; // wz-phase-group
  stepsHtml += '</div>';

  var bodyHtml = we ? wizardStepBody(we, step, wizardStep) : '<div class="wz-step-desc">Add a work element to get started.</div>';
  // Milestone/summary screens ("X Complete!") aren't term-heavy — no help box there:
  // pp_done (Pre-Project Done), pc_channel_done (Channel Complete), done (Design Complete).
  var wzNoHelpSteps = {pp_done:1, pc_channel_done:1, done:1};
  if (!wzNoHelpSteps[step.id]) bodyHtml = wzInsertHelpBox(bodyHtml, step.label);
  var footerHtml = wizardStepFooter(we, step, wizardStep);

  // Left column: header + vertical stepper only
  // WE header hidden for now — per request, kept commented out for easy restore.
  // var weHeaderHtml =
  //   '<div class="wz-v-header">' +
  //     '<div class="wz-v-mode-label">Work Element</div>' +
  //     '<div class="wz-v-current-step">' + (we ? we.name : '—') + '</div>' +
  //   '</div>';
  var weHeaderHtml = '';
  panel.innerHTML = weHeaderHtml + stepsHtml;

  // Sidebar area: step body + footer (covers the expert panel)
  var bodyPanel = document.getElementById('wizard-body-panel');
  if (bodyPanel) {
    bodyPanel.innerHTML = '<div class="wz-body">' + bodyHtml + '</div><div class="wz-footer">' + footerHtml + '</div>';
    // esa-select instances above are inserted with no options/value (Lit properties,
    // not attributes) — wire them up now that they're in the DOM.
    if (step.id === 'substrate' && we) {
      var subSel = bodyPanel.querySelector('esa-select.wz-substrate-sel');
      if (subSel) {
        subSel.options = ['', 'Silt', 'Sand', 'Gravel', 'Cobble', 'Boulders', 'Bedrock']
          .map(function(o){ return {label: o || '— Select —', value: o}; });
        var subD = we.ppData['substrate'];
        subSel.value = (subD && subD.value) || '';
      }
    } else if (step.id === 'structures' && we) {
      var pcForSel = getActivePC(we);
      var structsForSel = (pcForSel && pcForSel.structs) || [];
      bodyPanel.querySelectorAll('esa-select.wz-struct-type-sel').forEach(function(sel){
        var s = structsForSel.filter(function(x){ return x.id === sel.dataset.structId; })[0];
        sel.options = [{label:'Channel Margin', value:'cms'}, {label:'Mid Channel', value:'mcs'}, {label:'Channel Spanning', value:'css'}];
        sel.value = (s && s.structType) || 'cms';
      });
    } else if (step.id === 'sc_draw' && we) {
      var scReachesForSel = we.scReaches || [];
      bodyPanel.querySelectorAll('esa-select.wz-sc-flow-sel').forEach(function(sel){
        var r = scReachesForSel.filter(function(x){ return x.id === sel.dataset.reachId; })[0];
        sel.options = [{label:'— Select —', value:''}, {label:'Perennial', value:'Perennial'}, {label:'Seasonal', value:'Seasonal'}];
        sel.value = (r && r.flowType) || '';
      });
    }
    // Draw elevation chart canvas if reach step is showing it
    if (step.id === 'reach' && we) {
      var _sd = we.ppData['avg_slope'] || {};
      if (_sd._elevProfile) {
        setTimeout(function(){ drawElevChart('elev-chart-' + we.id, _sd._elevProfile); }, 0);
      }
    }
    // Draw SOW elevation chart canvas for primary channel step
    if (step.id === 'pc_reach' && we) {
      var _sowSd = getActivePC(we).sowElev || {};
      if (_sowSd._profile) {
        setTimeout(function(){ drawElevChart('sow-elev-chart-wz-' + we.id, _sowSd._profile); }, 0);
      }
    }
  }
}

function wizardStepBody(we, step, idx) {
  var h = '<div class="wz-step-num">Step '+(idx+1)+' of '+getVisibleSteps().length+'</div>';
  h += '<div class="wz-step-title">'+step.title+'</div>';

  switch(step.id) {
    case 'setup':
      if (!we) {
        h += '<div class="wz-step-desc">Start by giving this work element a name and selecting the type of habitat work you\'ll be doing.</div>';
        h += '<button class="wz-action-btn" onclick="openWEModal(null)">&#43; Create Work Element</button>';
        h += '<div class="wz-tip">A work element represents one restoration project or site. You can add more later.</div>';
      } else {
        h += '<div class="wz-status done">&#10003; Work element "<b>'+we.name+'</b>" created.</div>';
        h += '<button class="wz-action-btn secondary" onclick="openWEModal(\''+we.id+'\')">&#9881; Edit Name / Type</button>';
      }
      break;

    case 'perimeter':
      h += '<div class="wz-step-desc">Draw the outer boundary of your project area. This helps auto-clip the stream reach and other features to your site.</div>';
      var perimDone = we && we.ppData['perimeter'] && we.ppData['perimeter'].layer;
      if (perimDone) {
        var perimAc = ((we.ppData['perimeter'].valueM||0)*0.000247105).toFixed(2);
        h += '<div class="wz-status done">&#10003; Project boundary drawn — <b>'+perimAc+' ac</b></div>';
        h += '<button class="wz-action-btn secondary" onclick="wizardRedraw(\'perimeter\')">&#8635; Redraw Boundary</button>';
      } else {
        h += '<div class="wz-status pending">&#9654; Click the button below, then click on the map to place polygon vertices. Double-click to finish.</div>';
        h += '<button class="wz-action-btn" onclick="wizardDraw(\'perimeter\')">&#9632; Draw Project Boundary</button>';
      }
      break;

    case 'reach':
      h += '<div class="wz-step-desc">Identify the stream centerline within your project area. You can auto-detect it from the NHD stream network or draw it manually.</div>';
      var reachD = we && we.ppData['reach_len'];
      var reachDone = reachD && reachD.layer;
      var reachPreTrim = reachD && reachD._preTrim && !reachDone;
      var reachDetecting = reachD && reachD._autoDetecting;
      if (reachDone) {
        var reachFt = Math.round((reachD.valueM||0) * 3.28084).toLocaleString();
        var valleyFt = ppCalcFt(we, 'valley_len');
        var sinuosity = ppCalc(we, 'sinuosity');
        h += '<div class="wz-status done">&#10003; Reach length: <b>'+reachFt+' ft</b></div>';
        // Calculated metrics
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Valley Length</span><span class="wz-metric-val '+(valleyFt?'':'missing')+'">'+(valleyFt?Math.round(valleyFt).toLocaleString()+' ft':'calculating…')+'</span></div>';
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Sinuosity</span><span class="wz-metric-val '+(sinuosity?'':'missing')+'">'+(sinuosity||'calculating…')+'</span></div>';
        // Elevation profile
        h += buildElevChartHTML(we.id);
        h += '<button class="wz-action-btn secondary" style="margin-top:12px" onclick="startReachAutoDetect();renderWizardStep()">&#127760; Re-detect from Map</button>';
        h += '<button class="wz-action-btn secondary" onclick="wizardRedraw(\'reach_len\')">&#128207; Redraw Manually</button>';
        h += '<button class="wz-action-btn secondary" onclick="startLineEdit(\'pp\',\'reach_len\');renderWizardStep()">&#9998; Edit Vertices</button>';
        h += '<button class="wz-action-btn secondary" onclick="flipReachDirection();renderWizardStep()">&#8646; Flip Flow Direction</button>';
        h += '<div class="wz-tip">Flow direction is normally set from elevation data — flip it manually if that\'s unavailable or looks wrong.</div>';
      } else if (reachPreTrim) {
        var ext = reachD._preTrimExtending;
        h += '<div class="wz-status pending">&#10003; Stream selected — extend if needed, then pick your endpoints.</div>';
        h += '<button class="wz-action-btn'+(ext?' done':'')+'" onclick="'+(ext?'cancelPreTrimExtend()':'startPreTrimExtend()')+';renderWizardStep()">&#8633; '+(ext?'Cancel extend':'Add more stream')+'</button>';
        h += '<button class="wz-action-btn" onclick="proceedToTrim()">&#9135; Pick endpoints</button>';
        h += '<button class="wz-action-btn secondary" onclick="redetectReach();renderWizardStep()">&#127760; Try different stream</button>';
        h += '<button class="wz-action-btn secondary" onclick="cancelPreTrimStep()">&#10005; Cancel</button>';
      } else if (reachDetecting) {
        h += '<div class="wz-status pending">&#9679; Click on the stream on the map to detect it…</div>';
        h += '<button class="wz-action-btn secondary" onclick="cancelPreTrimStep();renderWizardStep()">&#10005; Cancel</button>';
      } else {
        h += '<button class="wz-action-btn" onclick="startReachAutoDetect();renderWizardStep()">&#127760; Auto-Detect from Map</button>';
        h += '<button class="wz-action-btn secondary" onclick="wizardDraw(\'reach_len\')">&#128207; Draw Manually</button>';
        h += '<div class="wz-tip">Auto-detect queries the NHD stream network — click on the stream to detect it.</div>';
      }
      break;

    case 'ch_width':
      h += '<div class="wz-step-desc">Draw 3 channel width cross-sections at different points along the reach. These are used to calculate the average channel width.</div>';
      var chLines = we && we.ppData['ch_width'] && we.ppData['ch_width'].lines ? we.ppData['ch_width'].lines.filter(function(l){return l&&l.lengthM;}) : [];
      h += '<div class="wz-status '+(chLines.length>=3?'done':chLines.length>0?'warning':'pending')+'">';
      h += chLines.length >= 3 ? '&#10003; 3 measurements recorded.' : '&#9654; '+chLines.length+' of 3 measurements drawn.';
      h += '</div>';
      for (var i = 0; i < 3; i++) {
        var ln = chLines[i];
        h += '<div class="wz-metric-row">';
        h += '<span class="wz-metric-label">Measurement '+(i+1)+'</span>';
        h += '<span class="wz-metric-val '+(ln?'':'missing')+'">'+(ln ? Math.round(ln.lengthM*3.28084)+' ft' : 'not drawn')+'</span>';
        h += '<button style="background:'+(ln?'#f3f7fc':'#1e5386')+';color:'+(ln?'#3d3d3d':'#fff')+';border:1px solid '+(ln?'#dcdcdc':'transparent')+';padding:3px 8px;border-radius:3px;font-size:10px;cursor:pointer;margin-left:8px" onclick="wizardDrawLine(\'ch_width\','+i+')">'+(ln?'redo':'draw')+'</button>';
        h += '</div>';
        if (ln) {
          h += '<div style="display:flex;align-items:center;gap:6px;padding:2px 0 4px 0">';
          h += '<span style="font-size:11px;color:var(--color-text-muted);white-space:nowrap">Bank height (ft):</span>';
          h += '<input type="number" min="0" step="0.1" value="'+(ln.bankHt||'')+'" placeholder="0.0" ';
          h += 'style="width:80px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px;font-family:var(--font-sans)" ';
          h += 'onchange="ppSetBankHt('+i+',this.value)">';
          h += '</div>';
        }
      }
      if (chLines.length > 0) {
        var avgFt = Math.round(chLines.reduce(function(a,l){return a+l.lengthM;},0)/chLines.length*3.28084);
        h += '<div class="wz-tip">Average channel width: <b>'+avgFt+' ft</b></div>';
      }
      break;

    case 'bank_ht': {
      var bhD = we && we.ppData['bank_ht'];
      var bhVal = bhD && bhD.value;
      h += '<div class="wz-step-desc">Enter the average bank height measured from the water surface at a representative riffle to the top of the bank.</div>';
      h += '<div class="wz-metric-row"><span class="wz-metric-label">Bank height (ft)</span>';
      h += '<input type="number" min="0" step="0.1" placeholder="e.g. 3.5" value="'+(bhVal||'')+'" ';
      h += 'style="width:90px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:4px 8px;border-radius:3px;font-size:12px;font-family:inherit" ';
      h += 'oninput="ppSetVal(\'bank_ht\',this.value);renderWizardStep()">';
      h += '</div>';
      if (bhVal) {
        h += '<div class="wz-status done">&#10003; Bank height recorded: <b>'+bhVal+' ft</b></div>';
      } else {
        
      }
      break;
    }

    case 'substrate': {
      var subD = we && we.ppData['substrate'];
      var subVal = subD && subD.value;
      var subOpts = ['', 'Silt', 'Sand', 'Gravel', 'Cobble', 'Boulders', 'Bedrock'];
      h += '<div class="wz-step-desc">Select the dominant substrate material for this reach based on the prioritization data layer or field observation.</div>';
      h += '<div class="wz-metric-row"><span class="wz-metric-label">Dominant substrate</span>';
      h += '<esa-select class="wz-substrate-sel" size="sm" onchange="ppSetVal(\'substrate\',this.value);renderWizardStep()"></esa-select></div>';
      if (subVal) {
        h += '<div class="wz-status done">&#10003; Substrate recorded: <b>'+subVal+'</b></div>';
      } else {
        
      }
      break;
    }

    case 'fp_left': {
      var dFpL = we && we.ppData['fp_left'];
      var fpLDone = dFpL && dFpL.layer;
      h += '<div class="wz-step-desc">Draw the outer edge of the left floodplain (left bank looking downstream). The inner edge auto-completes along the channel buffer.</div>';
      if (fpLDone) {
        h += '<div class="wz-status done">&#10003; Left floodplain: <b>'+((dFpL.valueM||0)*0.000247105).toFixed(2)+' ac</b></div>';
        h += '<button class="wz-action-btn secondary" onclick="startPPDraw(\'fp_left\',0);renderWizardStep()">&#128207; Redraw</button>';
        h += '<button class="wz-action-btn secondary" onclick="startLineEdit(\'pp\',\'fp_left\');renderWizardStep()">&#9998; Edit Vertices</button>';
      } else {
        h += '<button class="wz-action-btn" onclick="startPPDraw(\'fp_left\',0);renderWizardStep()">&#128207; Draw Left Floodplain Edge</button>';
        h += '<div class="wz-tip">Draw along the outer edge of the left bank — the tool will close the polygon against the channel edge.</div>';
      }
      break;
    }

    case 'fp_right': {
      var dFpR = we && we.ppData['fp_right'];
      var fpRDone = dFpR && dFpR.layer;
      h += '<div class="wz-step-desc">Draw the outer edge of the right floodplain (right bank looking downstream). The inner edge auto-completes along the channel buffer.</div>';
      if (fpRDone) {
        h += '<div class="wz-status done">&#10003; Right floodplain: <b>'+((dFpR.valueM||0)*0.000247105).toFixed(2)+' ac</b></div>';
        h += '<button class="wz-action-btn secondary" onclick="startPPDraw(\'fp_right\',0);renderWizardStep()">&#128207; Redraw</button>';
        h += '<button class="wz-action-btn secondary" onclick="startLineEdit(\'pp\',\'fp_right\');renderWizardStep()">&#9998; Edit Vertices</button>';
      } else {
        h += '<button class="wz-action-btn" onclick="startPPDraw(\'fp_right\',0);renderWizardStep()">&#128207; Draw Right Floodplain Edge</button>';
        h += '<div class="wz-tip">Draw along the outer edge of the right bank — the tool will close the polygon against the channel edge.</div>';
      }
      break;
    }

    case 'fp_poly': {
      var dFp = we && we.ppData['fp_poly'];
      var fpPolyDone = dFp && dFp.layer;
      h += '<div class="wz-step-desc">Draw a polygon covering the active floodplain on both sides of the channel. The channel area will be automatically subtracted to give net floodplain area.</div>';
      var isEditingFpPoly = lineEditing && lineEditing.type==='pp-poly' && lineEditing.id==='fp_poly';
      if (fpPolyDone) {
        h += '<div class="wz-status done">&#10003; Floodplain: <b>'+((dFp.valueM||0)*0.000247105).toFixed(2)+' ac (net)</b></div>';
        if (dFp._outsidePerim) {
          h += '<div class="wz-status warning">&#9888; Some vertices are outside the project boundary — edit or redraw to correct.</div>';
        }
        // Cross-sectional widths at start, middle, end of reach
        var fpWS = calcFpCrossWidthFt(we, 0.05);
        var fpWM = calcFpCrossWidthFt(we, 0.5);
        var fpWE = calcFpCrossWidthFt(we, 0.95);
        if (fpWS !== null || fpWM !== null || fpWE !== null) {
          h += '<div style="margin:8px 0 4px;font-size:11px;font-weight:600;color:var(--color-text-secondary)">Cross-sectional widths</div>';
          h += '<div class="wz-metric-row"><span class="wz-metric-label">At reach start</span><span class="wz-metric-val '+(fpWS?'':'missing')+'">'+(fpWS ? fpWS.toLocaleString()+' ft' : '—')+'</span></div>';
          h += '<div class="wz-metric-row"><span class="wz-metric-label">At mid-reach</span><span class="wz-metric-val '+(fpWM?'':'missing')+'">'+(fpWM ? fpWM.toLocaleString()+' ft' : '—')+'</span></div>';
          h += '<div class="wz-metric-row"><span class="wz-metric-label">At reach end</span><span class="wz-metric-val '+(fpWE?'':'missing')+'">'+(fpWE ? fpWE.toLocaleString()+' ft' : '—')+'</span></div>';
        }
        h += '<button class="wz-action-btn secondary" onclick="startPolyEdit(\'fp_poly\');renderWizardStep()">'+(isEditingFpPoly?'&#9998; Editing…':'&#9998; Edit Vertices')+'</button>';
        h += '<button class="wz-action-btn secondary" onclick="clearPPGeom(\'fp_poly\');startPPDraw(\'fp_poly\',0);renderWizardStep()">&#128207; Redraw</button>';
      } else {
        h += '<button class="wz-action-btn" onclick="startPPDraw(\'fp_poly\',0);renderWizardStep()">&#128207; Draw Floodplain Boundary</button>';
        h += '<div class="wz-tip">Draw the outer boundary of the active floodplain — include both banks in one polygon. Clicks outside the project boundary snap to the nearest boundary point.</div>';
      }
      break;
    }

    case 'pp_wetland': {
      var ppWetItems = (we.fpMulti && we.fpMulti['pp_wetland']) || [];
      h += '<div class="wz-step-desc">Identify any wetland areas already present on the site, before project work begins. Check the National Wetlands Inventory for candidates, or draw manually. Add as many as needed — or skip if none are present.</div>';
      if (wetlandAutoDetecting) {
        h += '<div class="wz-status pending">&#9654; Click a highlighted wetland on the map to add it — click <span style="text-decoration:underline;cursor:pointer" onclick="cancelWetlandAutoDetect()">done</span> when finished.</div>';
        // No candidates currently shown means the last query failed or came back empty —
        // offer a one-click retry instead of making the user cancel and re-click Auto-Detect.
        if (!wetlandAutoLayers.length) {
          h += '<button class="wz-action-btn secondary" onclick="loadWetlandPreview();renderWizardStep()">&#8635; Retry NWI Query</button>';
        }
      } else {
        h += '<button class="wz-action-btn secondary" onclick="startWetlandAutoDetect()">&#127760; Auto-Detect from Map (NWI)</button>';
      }
      h += wzFPMultiSection(we, 'pp_wetland', 'polygon', 'Wetland area', false);
      if (ppWetItems.length) {
        var ppWetSum = fpMultiSum(we, 'pp_wetland');
        h += '<div class="wz-status done" style="margin-top:6px">&#10003; '+ppWetItems.length+' wetland area'+(ppWetItems.length>1?'s':'')+' &middot; '+ppWetSum.acres.toFixed(2)+' ac total</div>';
      }
      break;
    }

    case 'buffers': {
      h += '<div class="wz-step-desc">Review the auto-calculated areas on the map. Edit vertices if the shaded polygons don\'t match the real boundaries.</div>';
      var achB = we && we.ppData['area_ch'];
      var fpPolyB = we && we.ppData['fp_poly'];
      var fpLB = we && we.ppData['fp_left'];
      var fpRB = we && we.ppData['fp_right'];
      var achDoneB = achB && (achB.layer || achB.bufferLayer);
      var fpPolyDoneB = fpPolyB && fpPolyB.layer;
      var fpLDoneB = fpLB && fpLB.layer;
      var fpRDoneB = fpRB && fpRB.layer;
      h += '<div class="wz-metric-row"><span class="wz-metric-label">Area of Channel</span>';
      h += achDoneB ? '<span class="wz-metric-val">'+((achB.valueM||0)*0.000247105).toFixed(2)+' ac</span>' : '<span class="wz-metric-val missing">pending channel widths</span>';
      h += achDoneB ? '<button style="background:#f3f7fc;color:#3d3d3d;border:1px solid #dcdcdc;padding:3px 8px;border-radius:3px;font-size:10px;cursor:pointer;margin-left:8px" onclick="startPolyEdit(\'area_ch\')">edit</button>' : '';
      h += '</div>';
      if (fpPolyDoneB) {
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Floodplain (net)</span>';
        h += '<span class="wz-metric-val">'+((fpPolyB.valueM||0)*0.000247105).toFixed(2)+' ac</span>';
        h += '<button style="background:#f3f7fc;color:#3d3d3d;border:1px solid #dcdcdc;padding:3px 8px;border-radius:3px;font-size:10px;cursor:pointer;margin-left:8px" onclick="clearPPGeom(\'fp_poly\');startPPDraw(\'fp_poly\',0)">redraw</button>';
        h += '</div>';
      } else if (fpLDoneB || fpRDoneB) {
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Left Floodplain</span>';
        h += fpLDoneB ? '<span class="wz-metric-val">'+((fpLB.valueM||0)*0.000247105).toFixed(2)+' ac</span>' : '<span class="wz-metric-val missing">not drawn</span>';
        h += '</div>';
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Right Floodplain</span>';
        h += fpRDoneB ? '<span class="wz-metric-val">'+((fpRB.valueM||0)*0.000247105).toFixed(2)+' ac</span>' : '<span class="wz-metric-val missing">not drawn</span>';
        h += '</div>';
      } else {
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Floodplain</span><span class="wz-metric-val missing">not drawn</span></div>';
      }
      if (!achDoneB) {
        h += '<div class="wz-status warning">&#9888; Go back and draw channel width measurements to auto-generate the channel area.</div>';
      } else if (!fpPolyDoneB && !fpLDoneB && !fpRDoneB) {
        h += '<div class="wz-status warning">&#9888; Go back and draw the floodplain boundary.</div>';
      } else {
        h += '<div class="wz-tip">The shaded areas show the channel (blue) and floodplain (green). Edit if they don\'t match the real boundaries.</div>';
      }
      break;
    }

    case 'fp_split':
      h += '<div class="wz-step-desc">The floodplain has been automatically split into left and right banks. If the sides are swapped, use the Flip button.</div>';
      var fpSplit = we && we.ppData['area_fp'] && we.ppData['area_fp'].fpSplit;
      var fpReady = we && we.ppData['area_fp'] && (we.ppData['area_fp'].layer || we.ppData['area_fp'].bufferLayer);
      if (fpSplit) {
        var fpL = we.ppData['fp_left'], fpR = we.ppData['fp_right'];
        h += '<div class="wz-status done">&#10003; Floodplain split complete.</div>';
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Left Floodplain</span><span class="wz-metric-val">'+((fpL&&fpL.valueM||0)*0.000247105).toFixed(2)+' ac</span></div>';
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Right Floodplain</span><span class="wz-metric-val">'+((fpR&&fpR.valueM||0)*0.000247105).toFixed(2)+' ac</span></div>';
        h += '<button class="wz-action-btn secondary" onclick="doFpFlip(\''+we.id+'\');renderWizardStep()">&#8646; Flip Left / Right</button>';
        h += '<button class="wz-action-btn secondary" onclick="doFpSplit(\''+we.id+'\');renderWizardStep()">&#8635; Re-split</button>';
      } else if (fpReady) {
        h += '<div class="wz-status pending">&#9654; Calculating split…</div>';
      } else {
        h += '<div class="wz-status warning">&#9888; Complete earlier steps to generate the floodplain area first.</div>';
      }
      break;

    case 'pp_done':
      h += '<div class="wz-step-desc">Pre-project conditions are complete. Now move on to entering your habitat work details.</div>';
      h += '<div class="wz-status done" style="font-size:13px;padding:14px">&#10003; <b>Pre-project entry complete!</b></div>';
      if (we) {
        var bhVal = (function(){ var bh=ppCalc(we,'bank_ht'); return bh!==null?bh.toFixed(1)+' ft':null; })();
        var fpPolyAc = (we.ppData['fp_poly'] && we.ppData['fp_poly'].valueM) ? (we.ppData['fp_poly'].valueM*0.000247105).toFixed(2)+' ac (net)' : null;
        var fpLAc   = ppAcres(we,'fp_left')  ? ppAcres(we,'fp_left').toFixed(2)+' ac'  : null;
        var fpRAc   = ppAcres(we,'fp_right') ? ppAcres(we,'fp_right').toFixed(2)+' ac' : null;
        var ppMetrics = [
          ['Reach Length',       ppLenFt(we,'reach_len') ? Math.round(ppLenFt(we,'reach_len')).toLocaleString()+' ft' : null],
          ['Channel Width (avg)',ppMultiAvgFt(we,'ch_width') ? Math.round(ppMultiAvgFt(we,'ch_width'))+' ft' : null],
          ['Substrate',          we.ppData['substrate'] && we.ppData['substrate'].value ? we.ppData['substrate'].value : null],
          ['Area of Channel',    ppAcres(we,'area_ch') ? ppAcres(we,'area_ch').toFixed(2)+' ac' : null],
          ['Floodplain Area',    fpPolyAc || (fpLAc||fpRAc ? (fpLAc||'—')+' L / '+(fpRAc||'—')+' R' : null)],
          ['FP Width — Start',  (function(){ var v=calcFpCrossWidthFt(we,0.05); return v?v.toLocaleString()+' ft':null; })()],
          ['FP Width — Middle', (function(){ var v=calcFpCrossWidthFt(we,0.5);  return v?v.toLocaleString()+' ft':null; })()],
          ['FP Width — End',    (function(){ var v=calcFpCrossWidthFt(we,0.95); return v?v.toLocaleString()+' ft':null; })()]
        ];
        // Only include bank height row if a value has been entered
        if (bhVal) ppMetrics.splice(2, 0, ['Bank Height (avg)', bhVal]);
        ppMetrics.forEach(function(m) {
          h += '<div class="wz-metric-row"><span class="wz-metric-label">'+m[0]+'</span>';
          h += '<span class="wz-metric-val '+(m[1]?'':'missing')+'">'+( m[1] || 'not entered')+'</span></div>';
        });
      }
      h += '<div class="wz-tip">Click Next to begin entering habitat work details.</div>';
      break;

    case 'pc_metrics': {
      var pcmEV = pcExcavationCY(we); // derived fresh — no cached/stale value, no render-time side effect
      h += '<div class="wz-step-desc">Additional complexity metrics for the primary channel.</div>';
      var pcmReachSL = getActivePC(we).sowLayers['pc-reach'];
      var pcmStreamMi = pcmReachSL && pcmReachSL.valueM ? (pcmReachSL.valueM * 0.000621371).toFixed(3)+' mi' : null;
      h += '<div class="wz-metric-row"><span class="wz-metric-label">Stream miles with improved floodplain connectivity</span><span class="wz-metric-val '+(pcmStreamMi?'':'missing')+'">'+(pcmStreamMi||'draw the primary channel to calculate')+'</span></div>';
      var pcmMissing = !pcmReachSL ? 'draw the primary channel first (step 8)' :
                        !pcChannelWidthFt(we) ? 'enter channel width first (previous step)' :
                        !getActivePC(we).inputVals['pc-bank-height'] ? 'enter bank height first (previous step)' : '—';
      h += '<div class="wz-metric-row"><span class="wz-metric-label">Excavation volume</span><span class="wz-metric-val '+(pcmEV?'':'missing')+'">'+(pcmEV ? pcmEV.toLocaleString()+' CY' : pcmMissing)+'</span></div>';
      break;
    }

    case 'pc_gravel': {
      h += '<div class="wz-step-desc">Drop a pin for each gravel placement, then enter its length and depth.</div>';
      var gPlacements = getActivePC(we).gravelPlacements || [];
      h += '<div style="margin:2px 0 10px"><button class="pm-draw-btn" onclick="wizardAddGravelPlacement()">&#43; Add Gravel Placement</button></div>';
      if (!gPlacements.length) {
        h += '<div class="wz-status pending">&#9654; No placements yet.</div>';
      }
      var pcWidthFt = pcChannelWidthFt(we);
      var gravelTotalCY = 0, gravelAny = false, gravelTotalLenFt = 0;
      var gravelDepths = gPlacements.filter(function(p){return p.depth;}).map(function(p){return parseFloat(p.depth);});
      gPlacements.forEach(function(p){ if (p.length) gravelTotalLenFt += parseFloat(p.length); });
      gPlacements.forEach(function(p, pi) {
        var isWaiting = pendingGravelPoint && pendingGravelPoint.placementId === p.id;
        var vol = (pcWidthFt && p.length && p.depth) ? (parseFloat(p.length) * parseFloat(p.depth) * pcWidthFt / 27) : null;
        if (vol !== null) { gravelTotalCY += vol; gravelAny = true; }
        h += '<div style="background:#fff;border:1px solid #dcdcdc;border-radius:5px;padding:8px;margin-bottom:6px">';
        h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
        h += '<span style="font-size:11px;font-weight:600;color:#c07820">Placement '+(pi+1)+'</span>';
        h += '<span style="cursor:pointer;color:#ef4444;font-size:12px" onclick="wizardDelGravelPlacement(\''+p.id+'\')">&#10005;</span>';
        h += '</div>';
        if (p.latlng) {
          h += '<div style="font-size:11px;color:#0f6849;margin-bottom:6px">&#10003; Placed on map</div>';
        } else {
          h += '<button class="pm-draw-btn'+(isWaiting?' active':'')+'" style="width:100%;height:auto;padding:5px;margin-bottom:6px" onclick="startGravelPoint(\''+p.id+'\')">&#9679; '+(isWaiting?'Click map to place…':'Place on map')+'</button>';
        }
        h += '<div style="display:flex;gap:8px">';
        h += '<div style="flex:1"><div style="font-size:10px;color:#7c7c7c;margin-bottom:2px">Length (ft)</div><input type="number" min="0" step="1" value="'+(p.length||'')+'" placeholder="0" style="width:100%;box-sizing:border-box;border:1px solid #dcdcdc;border-radius:3px;padding:3px 6px;font-size:11px;font-family:var(--font-sans)" onchange="wizardSetGravelField(\''+p.id+'\',\'length\',this.value)"></div>';
        h += '<div style="flex:1"><div style="font-size:10px;color:#7c7c7c;margin-bottom:2px">Depth (ft)</div><input type="number" min="0" step="0.1" value="'+(p.depth||'')+'" placeholder="0" style="width:100%;box-sizing:border-box;border:1px solid #dcdcdc;border-radius:3px;padding:3px 6px;font-size:11px;font-family:var(--font-sans)" onchange="wizardSetGravelField(\''+p.id+'\',\'depth\',this.value)"></div>';
        h += '</div>';
        if (vol !== null) {
          h += '<div style="font-size:10px;color:#7c7c7c;margin-top:4px">~ '+vol.toFixed(1)+' CY</div>';
        } else if (!pcWidthFt) {
          h += '<div style="font-size:10px;color:#7c7c7c;margin-top:4px;font-style:italic">Enter channel width (step 9) to estimate volume</div>';
        }
        h += '</div>';
      });
      if (gPlacements.length) {
        var gravelAvgDepth = gravelDepths.length ? (gravelDepths.reduce(function(a,v){return a+v;},0)/gravelDepths.length) : null;
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Total gravel placement length</span><span class="wz-metric-val'+(gravelTotalLenFt?'':' missing')+'">'+(gravelTotalLenFt?Math.round(gravelTotalLenFt)+' ft':'not entered')+'</span></div>';
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Average gravel placement depth</span><span class="wz-metric-val'+(gravelAvgDepth!==null?'':' missing')+'">'+(gravelAvgDepth!==null?gravelAvgDepth.toFixed(1)+' ft':'not entered')+'</span></div>';
      }
      if (gravelAny) {
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Total gravel volume</span><span class="wz-metric-val"><b>'+gravelTotalCY.toFixed(1)+' CY</b></span></div>';
      }
      break;
    }

    case 'pc_fp': {
      var dPCFP = we && getActivePC(we).ppData['pc_fp'];
      var pcFPDone = dPCFP && dPCFP.layer;
      var isEditingPCFP = lineEditing && lineEditing.type==='pp-poly' && lineEditing.id==='pc_fp';
      h += '<div class="wz-step-desc">Draw a polygon covering the new designed floodplain on both sides of the primary channel. The channel area will be automatically subtracted to give the net new floodplain area. Your pre-project floodplain is shown on the map for reference.</div>';
      if (pcFPDone) {
        h += '<div class="wz-status done">&#10003; New floodplain: <b>'+((dPCFP.valueM||0)*0.000247105).toFixed(2)+' ac (net)</b></div>';
        if (dPCFP._outsidePerim) {
          h += '<div class="wz-status warning">&#9888; Some vertices are outside the project boundary — edit or redraw to correct.</div>';
        }
        var pcfpWS = calcPCFPCrossWidthFt(we, 0.05);
        var pcfpWM = calcPCFPCrossWidthFt(we, 0.5);
        var pcfpWE = calcPCFPCrossWidthFt(we, 0.95);
        if (pcfpWS !== null || pcfpWM !== null || pcfpWE !== null) {
          h += '<div style="margin:8px 0 4px;font-size:11px;font-weight:600;color:var(--color-text-secondary)">Cross-sectional widths</div>';
          h += '<div class="wz-metric-row"><span class="wz-metric-label">At channel start</span><span class="wz-metric-val '+(pcfpWS?'':'missing')+'">'+(pcfpWS ? pcfpWS.toLocaleString()+' ft' : '—')+'</span></div>';
          h += '<div class="wz-metric-row"><span class="wz-metric-label">At mid-channel</span><span class="wz-metric-val '+(pcfpWM?'':'missing')+'">'+(pcfpWM ? pcfpWM.toLocaleString()+' ft' : '—')+'</span></div>';
          h += '<div class="wz-metric-row"><span class="wz-metric-label">At channel end</span><span class="wz-metric-val '+(pcfpWE?'':'missing')+'">'+(pcfpWE ? pcfpWE.toLocaleString()+' ft' : '—')+'</span></div>';
        }
        h += '<button class="wz-action-btn secondary" onclick="startPolyEdit(\'pc_fp\');renderWizardStep()">'+(isEditingPCFP?'&#9998; Editing…':'&#9998; Edit Vertices')+'</button>';
        h += '<button class="wz-action-btn secondary" onclick="clearPPGeom(\'pc_fp\');startPPDraw(\'pc_fp\',0);renderWizardStep()">&#128207; Redraw</button>';
      } else {
        h += '<button class="wz-action-btn" onclick="startPPDraw(\'pc_fp\',0);renderWizardStep()">&#128207; Draw New Floodplain</button>';
        h += '<div class="wz-tip">Draw the outer boundary of the new designed floodplain — include both banks. Clicks outside the project boundary snap to the nearest boundary point.</div>';
      }
      break;
    }

    case 'pc_reach': {
      var pcSL = we && getActivePC(we).sowLayers['pc-reach'];
      var pcDone = pcSL && pcSL.layer;
      h += '<div class="wz-step-desc">Draw the centerline of the proposed (designed) primary channel. This represents the planned channel alignment after habitat work, and will be used to delineate channel units in the next step. Your pre-project reach is shown on the map for reference.</div>';
      if (pcDone) {
        // Calculate valley length and sinuosity from pc-reach endpoints
        var pcRL = pcSL.valueM;
        var pcVlM = 0;
        var pcPts = pcSL.layer.getLatLngs();
        if (pcPts.length && Array.isArray(pcPts[0])) pcPts = pcPts[0];
        if (pcPts && pcPts.length >= 2) {
          var _toRad=function(d){return d*Math.PI/180;}, _R=6378137;
          var _p1=pcPts[0], _p2=pcPts[pcPts.length-1];
          var _dLat=_toRad(_p2.lat-_p1.lat), _dLng=_toRad(_p2.lng-_p1.lng);
          var _a=Math.sin(_dLat/2)*Math.sin(_dLat/2)+Math.cos(_toRad(_p1.lat))*Math.cos(_toRad(_p2.lat))*Math.sin(_dLng/2)*Math.sin(_dLng/2);
          pcVlM = _R*2*Math.atan2(Math.sqrt(_a),Math.sqrt(1-_a));
        }
        var pcValleyFt = pcVlM ? Math.round(pcVlM*3.28084).toLocaleString()+' ft' : null;
        var pcSinuosity = (pcRL && pcVlM) ? (pcRL/pcVlM).toFixed(2) : null;
        h += '<div class="wz-status done">&#10003; Primary channel: <b>'+Math.round(pcRL*3.28084).toLocaleString()+' ft</b></div>';
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Valley Length</span><span class="wz-metric-val '+(pcValleyFt?'':'missing')+'">'+(pcValleyFt||'calculating…')+'</span></div>';
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Sinuosity</span><span class="wz-metric-val '+(pcSinuosity?'':'missing')+'">'+(pcSinuosity||'calculating…')+'</span></div>';
        h += buildSOWElevChartHTML(we);
        h += '<button class="wz-action-btn secondary" style="margin-top:8px" onclick="startSOWDraw(\'pc-reach\',\'line\',\'Primary Channel\');renderWizardStep()">&#128207; Redraw</button>';
        h += '<button class="wz-action-btn secondary" onclick="startLineEdit(\'sow\',\'pc-reach\');renderWizardStep()">&#9998; Edit Vertices</button>';
        h += '<button class="wz-action-btn secondary" onclick="flipPCReachDirection();renderWizardStep()">&#8646; Flip Flow Direction</button>';
        h += '<div class="wz-tip">Flow direction is normally set from elevation data — flip it manually if that\'s unavailable or looks wrong.</div>';
      } else {
        h += '<button class="wz-action-btn" onclick="startSOWDraw(\'pc-reach\',\'line\',\'Primary Channel\');renderWizardStep()">&#128207; Draw Primary Channel</button>';
        if (we && we.ppData['reach_len'] && we.ppData['reach_len'].layer) {
          h += '<button class="wz-action-btn secondary" onclick="copyPPReachToPrimaryChannel()">&#8942; Copy Pre-Project Reach</button>';
        }
        h += '<div class="wz-tip">Draw the designed channel centerline — this is different from the existing reach and represents where the channel will be after restoration. If the design follows the existing alignment, copy it as a starting point instead.</div>';
      }
      break;
    }

    case 'pc_width': {
      var pcwVal = we && getActivePC(we).inputVals['pc-width'];
      h += '<div class="wz-step-desc">Enter the designed width of the primary channel. This value will be used to estimate the area of restored channel.</div>';
      h += '<div style="display:flex;align-items:center;gap:8px;margin:8px 0">';
      h += '<label style="font-size:12px;color:var(--color-text-secondary);white-space:nowrap">Channel width (ft):</label>';
      h += '<input id="wz-pc-width-input" type="number" min="0" step="1" placeholder="e.g. 30" value="'+(pcwVal||'')+'"';
      h += ' style="width:90px;border:1px solid var(--color-border);border-radius:4px;padding:4px 8px;font-size:13px;font-family:var(--font-sans)"';
      h += ' onchange="setPCWidth(this.value)">';
      h += '<span style="font-size:12px;color:var(--color-text-muted)">ft</span>';
      h += '</div>';
      if (pcwVal > 0) {
        h += '<div class="wz-status done">&#10003; Primary channel width: <b>'+Math.round(pcwVal)+' ft</b></div>';
      }
      var pcBH = we && getActivePC(we).inputVals['pc-bank-height'];
      h += '<div style="display:flex;align-items:center;gap:8px;margin:8px 0">';
      h += '<label style="font-size:12px;color:var(--color-text-secondary);white-space:nowrap">Bank height (ft):</label>';
      h += '<input id="wz-pc-bh-input" type="number" min="0" step="0.1" placeholder="e.g. 3.5" value="'+(pcBH||'')+'"';
      h += ' style="width:90px;border:1px solid var(--color-border);border-radius:4px;padding:4px 8px;font-size:13px;font-family:var(--font-sans)"';
      h += ' onchange="setPCBankHeight(this.value)">';
      h += '<span style="font-size:12px;color:var(--color-text-muted)">ft</span>';
      h += '</div>';
      if (pcBH > 0) {
        h += '<div class="wz-status done" style="margin-top:4px">&#10003; Bank height: <b>'+pcBH+' ft</b></div>';
      }
      break;
    }

    case 'chu_split': {
      h += '<div class="wz-step-desc">Draw two boundaries for each pool — in either order, wherever the pool starts and ends. Everything outside a pool boundary is treated as riffle.</div>';
      var chuSplitReady = we && getCHUChannelPts(we);
      if (!chuSplitReady) {
        h += '<div class="wz-status warning">&#9888; Draw the primary channel and enter a width first (steps 8 &amp; 9) to generate the channel area.</div>';
      } else {
        var units = getActivePC(we).chuUnits || [];
        var pools = units.filter(function(u){return u.type==='pool';});
        var inPoolDraw = chuPoolMode;
        if (inPoolDraw && chuPoolPhase === 1) {
          h += '<div class="wz-status pending">&#9654; Draw the <b>first boundary</b> of the pool on the map…</div>';
        } else if (inPoolDraw && chuPoolPhase === 2) {
          h += '<div class="wz-status pending">&#9654; Draw the <b>second boundary</b> of the pool on the map…</div>';
        } else {
          h += '<button class="wz-action-btn" onclick="showInnerTab(\'work\');startCHUPoolDraw()">&#43; Add Pool</button>';
        }
        if (pools.length > 0) {
          h += '<div style="margin-top:10px">';
          var pIdx = 0;
          units.forEach(function(u) {
            if (u.type !== 'pool') return;
            pIdx++;
            var ac = u.areaM2 ? (u.areaM2*0.000247105).toFixed(3)+' ac' : '—';
            h += '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;margin-bottom:4px;';
            h += 'background:#1a7abf18;border:2px solid #1a7abf55;border-radius:5px">';
            h += '<span style="font-size:12px;font-weight:600;color:#1a7abf">Pool '+pIdx+'</span>';
            h += '<span style="font-size:11px;color:#555">'+ac+'</span>';
            h += '<button onclick="removeCHUPool(\''+u.id+'\');renderWizardStep()" title="Remove pool" ';
            h += 'style="background:transparent;border:none;color:#c44a4a;font-size:14px;cursor:pointer;padding:0 4px;line-height:1">&#10005;</button>';
            h += '</div>';
          });
          h += '</div>';
          h += '<div class="wz-status done" style="margin-top:6px">&#10003; '+pools.length+' pool'+(pools.length>1?'s':'')+' identified.</div>';
        } else if (!inPoolDraw && units.length >= 1) {
          h += '<div class="wz-tip" style="margin-top:8px">No pools yet — click <b>Add Pool</b> and draw two boundary lines to mark a pool. Leave blank for all-riffle.</div>';
        }
      }
      break;
    }

    case 'chu_details': {
      h += '<div class="wz-step-desc">Enter measurements for each channel unit.</div>';
      var detUnits = (we && getActivePC(we).chuUnits) ? getActivePC(we).chuUnits : [];
      if (detUnits.length < 1) {
        h += '<div class="wz-status warning">&#9888; Go back and identify pool locations first.</div>';
      } else {
        detUnits.forEach(function(u, i) {
          var isPool = u.type === 'pool';
          var col = CHU_COLOR[u.type || 'unassigned'];
          var typeLabel = u._displayLabel || (isPool ? 'Pool' : 'Riffle');
          var ac = u.areaM2 ? (u.areaM2*0.000247105).toFixed(3)+' ac' : '—';
          var ft = u.lengthM ? Math.round(u.lengthM*3.28084)+' ft' : '—';
          h += '<div style="background:#fff;border:2px solid '+col+'33;border-radius:6px;padding:10px;margin-bottom:8px">';
          h += '<div style="display:flex;align-items:center;margin-bottom:8px">';
          h += '<span style="font-size:12px;font-weight:700;color:'+col+'">'+typeLabel+'</span>';
          h += '</div>';
          if (isPool) {
            h += '<div style="display:flex;align-items:center;gap:8px;font-size:11px;color:#525252">';
            h += '<label style="flex:1">Avg depth at low flow (ft)</label>';
            h += '<input type="number" min="0" step="0.1" style="width:70px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" ';
            h += 'value="'+(u.avgDepth||'')+'" placeholder="0.0" onchange="wizardSetCHUDepth(&apos;'+u.id+'&apos;,this.value)">';
            h += '</div>';
          } else {
            h += '<div style="display:flex;align-items:center;gap:8px;font-size:11px;color:#525252">';
            h += '<label style="flex:1">Boulder count</label>';
            h += '<input type="number" min="0" style="width:70px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" ';
            h += 'value="'+(u.boulderCount!==undefined&&u.boulderCount!==null?u.boulderCount:'')+'" placeholder="0" onchange="wizardSetCHUBoulders(&apos;'+u.id+'&apos;,this.value)">';
            h += '</div>';
          }
          h += '<div style="display:flex;gap:8px;margin-top:6px;font-size:10px;color:#7c7c7c">';
          h += '<span>'+ac+'</span><span>'+ft+'</span>';
          h += '</div></div>';
        });
      }
      break;
    }

    case 'structures':
      h += '<div class="wz-step-desc">Add wood structure placements — channel margin, mid-channel, and channel spanning. Click a structure type to add it, then place it on the map.</div>';
      var structCount = 0;
      var structTypes = [
        {key:'cms', label:'Channel Margin'},
        {key:'mcs', label:'Mid Channel'},
        {key:'css', label:'Channel Spanning'}
      ];
      var pcForStructs = we && getActivePC(we);
      structTypes.forEach(function(st){
        var list = (pcForStructs && pcForStructs.structures && pcForStructs.structures[st.key]) || [];
        structCount += list.length;
      });

      // Single add button — type is set after adding via the per-structure dropdown
      h += '<div style="margin-bottom:14px">';
      h += '<button class="pm-draw-btn" style="height:var(--form-height-sm,32px);padding:0 12px" ';
      h += 'onclick="wizardAddStructure(\'cms\',\'Channel Margin\')">&#43; Add Structure</button>';
      h += '</div>';

      // Flat structure list — same source as expert mode renderAllStructures()
      var structs = (pcForStructs && pcForStructs.structs) || [];
      if (!structs.length) {
        h += '<div class="wz-status pending">&#9654; No structures added yet.</div>';
      }
      structs.forEach(function(s, i) {
        var t = s.structType || 'cms';
        var isWaiting = pendingStructPoint && pendingStructPoint.id === s.id;
        h += '<div style="background:#fff;border:1px solid #dcdcdc;border-radius:5px;padding:8px;margin-bottom:6px">';
        h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
        h += '<esa-select class="wz-struct-type-sel" size="xs" data-struct-id="'+s.id+'" onchange="changeStructType(null,\''+s.id+'\',this.value)"></esa-select>';
        h += '<span style="cursor:pointer;color:#ef4444;font-size:12px" onclick="wizardDelStructure(\''+t+'\',\''+s.id+'\')">&#10005;</span>';
        h += '</div>';
        if (s.latlng) {
          h += '<div style="font-size:11px;color:#0f6849;margin-bottom:4px">&#10003; Placed on map</div>';
        } else {
          h += '<button class="pm-draw-btn'+(isWaiting?' active':'')+'" style="width:100%;height:auto;padding:5px;margin-bottom:4px" ';
          h += 'onclick="startStructPoint(\''+t+'\',\''+s.id+'\')">&#9679; '+(isWaiting?'Click map to place…':'Place on map')+'</button>';
        }
        h += '<esa-text-field placeholder="Description (e.g. Single-key LWD jam)" style="display:block;margin-bottom:4px" ';
        h += 'value="'+(s.desc||'')+'" size="sm" ';
        h += 'onchange="updateStructure(\''+t+'\',\''+s.id+'\',\'desc\',this.value)"></esa-text-field>';
        h += '<div style="display:flex;gap:8px">';
        h += '<div style="flex:1"><div style="font-size:11px;color:#7c7c7c;margin-bottom:2px">Large pieces (&gt;12")</div>';
        h += '<input type="number" min="0" placeholder="0" value="'+(s.large||'')+'" style="width:100%;box-sizing:border-box;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" ';
        h += 'oninput="updateStructure(\''+t+'\',\''+s.id+'\',\'large\',+this.value)"></div>';
        h += '<div style="flex:1"><div style="font-size:11px;color:#7c7c7c;margin-bottom:2px">Small pieces (&lt;12")</div>';
        h += '<input type="number" min="0" placeholder="0" value="'+(s.small||'')+'" style="width:100%;box-sizing:border-box;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" ';
        h += 'oninput="updateStructure(\''+t+'\',\''+s.id+'\',\'small\',+this.value)"></div>';
        h += '</div></div>';
      });
      if (structs.length) {
        var tL=0, tS=0;
        structs.forEach(function(s){ tL+=(+s.large||0); tS+=(+s.small||0); });
        h += '<div style="background:#f3f7fc;border-radius:4px;padding:8px;margin-top:8px">';
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Total large pieces (&gt;12")</span><span id="wz-struct-total-l" class="wz-metric-val">'+tL+'</span></div>';
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Total small pieces (&lt;12")</span><span id="wz-struct-total-s" class="wz-metric-val">'+tS+'</span></div>';
        h += '</div>';
      }


      break;

    case 'pc_channel_done': {
      var pcDone = getActivePC(we);
      var pcDoneReachDrawn = !!(pcDone.sowLayers['pc-reach'] && pcDone.sowLayers['pc-reach'].layer);
      h += '<div class="wz-step-desc">This primary channel is complete.</div>';
      if (pcDoneReachDrawn) {
        h += '<div class="wz-status done" style="font-size:13px;padding:14px">&#10003; <b>'+pcDone.name+' complete!</b></div>';
      } else {
        h += '<div class="wz-status warning" style="font-size:13px;padding:14px">&#9888; <b>'+pcDone.name+'</b> has no reach drawn yet — go back and draw it before continuing.</div>';
      }
      var pcDoneMetrics = [
        ['Reach Length', (pcDone.sowLayers['pc-reach']&&pcDone.sowLayers['pc-reach'].valueM) ? Math.round(pcDone.sowLayers['pc-reach'].valueM*3.28084).toLocaleString()+' ft' : null],
        ['Channel Width', pcDone.inputVals['pc-width'] ? Math.round(pcDone.inputVals['pc-width'])+' ft' : null],
        ['CHUs', pcDone.chuUnits && pcDone.chuUnits.length > 0 ? pcDone.chuUnits.length+' units' : null],
        ['Gravel Placements', pcDone.gravelPlacements && pcDone.gravelPlacements.length > 0 ? pcDone.gravelPlacements.length : null]
      ];
      pcDoneMetrics.forEach(function(m) {
        h += '<div class="wz-metric-row"><span class="wz-metric-label">'+m[0]+'</span>';
        h += '<span class="wz-metric-val '+(m[1]?'':'missing')+'">'+( m[1] || 'not entered')+'</span></div>';
      });
      break;
    }

    case 'sc_draw': {
      var scReaches = we.scReaches || [];
      h += '<div class="wz-step-desc">Draw each secondary channel and enter its width. The area buffer will appear automatically once a width is entered.</div>';
      h += '<button class="wz-action-btn'+(scReaches.length>0?' secondary':'')+'" onclick="showInnerTab(\'work\');startSCReachDraw()">&#128207; '+(scReaches.length>0?'Add Another':'Draw Secondary Channel')+'</button>';
      if (scReaches.length > 0) {
        scReaches.forEach(function(r, i) {
          var ft = r.valueM ? Math.round(r.valueM*3.28084).toLocaleString()+' ft' : '—';
          var areaAc = (r.width && r.valueM) ? ((r.valueM * (r.width/3.28084)) * 0.000247105).toFixed(3)+' ac' : null;
          h += '<div style="background:#2a6a9c0d;border:2px solid #2a6a9c55;border-radius:6px;padding:8px 10px;margin-top:8px">';
          h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">';
          h += '<span style="font-size:12px;font-weight:600;color:#2a6a9c">Channel '+(i+1)+'</span>';
          h += '<span style="font-size:11px;color:#555">'+ft+'</span>';
          h += '<button onclick="deleteSCReach(\''+r.id+'\');renderWizardStep()" title="Remove" style="background:transparent;border:none;color:#c44a4a;font-size:14px;cursor:pointer;padding:0 4px;line-height:1">&#10005;</button>';
          h += '</div>';
          h += '<div style="display:flex;flex-direction:column;gap:6px">';
          h += '<div style="display:flex;align-items:center;gap:8px">';
          h += '<label style="font-size:11px;color:var(--color-text-secondary);white-space:nowrap;min-width:70px">Width (ft):</label>';
          h += '<input type="number" min="0" step="1" placeholder="e.g. 15" value="'+(r.width||'')+'"';
          h += ' style="width:80px;border:1px solid var(--color-border);border-radius:4px;padding:3px 7px;font-size:12px;font-family:var(--font-sans)"';
          h += ' onchange="setSCReachWidth(\''+r.id+'\',this.value)">';
          if (areaAc) h += '<span style="font-size:11px;color:var(--color-text-muted)">~ '+areaAc+'</span>';
          h += '</div>';
          h += '<div style="display:flex;align-items:center;gap:8px">';
          h += '<label style="font-size:11px;color:var(--color-text-secondary);white-space:nowrap;min-width:70px">Flow type:</label>';
          h += '<esa-select class="wz-sc-flow-sel" size="sm" data-reach-id="'+r.id+'" onchange="setSCReachFlowType(\''+r.id+'\',this.value)"></esa-select>';
          h += '</div>';
          h += '</div>';
          h += '</div>';
        });
        var allComplete = scReaches.every(function(r){return r.width>0 && r.flowType;});
        if (allComplete && scReaches.length > 0) {
          var totalAc = scReaches.reduce(function(a,r){return a+(r.valueM*(r.width/3.28084)*0.000247105);},0).toFixed(3);
          h += '<div class="wz-status done" style="margin-top:8px">&#10003; '+scReaches.length+' channel'+(scReaches.length>1?'s':'')+' · '+totalAc+' ac total</div>';
        } else if (scReaches.length > 0) {
          h += '<div class="wz-tip" style="margin-top:8px">Enter a width and flow type for each channel.</div>';
        }
      }
      break;
    }

    case 'sc_wood': {
      var scLarge = (we && we.inputVals && we.inputVals['sc-large-wood'] !== undefined) ? we.inputVals['sc-large-wood'] : '';
      var scSmall = (we && we.inputVals && we.inputVals['sc-small-wood'] !== undefined) ? we.inputVals['sc-small-wood'] : '';
      h += '<div class="wz-step-desc">Enter the total number of wood pieces placed across all secondary channels.</div>';
      h += '<div style="display:flex;flex-direction:column;gap:8px;margin:8px 0">';
      h += '<div style="display:flex;align-items:center;gap:8px">';
      h += '<label style="font-size:12px;color:var(--color-text-secondary);min-width:110px">Large wood (≥12&quot;):</label>';
      h += '<input type="number" min="0" step="1" placeholder="0" value="'+scLarge+'"';
      h += ' style="width:80px;border:1px solid var(--color-border);border-radius:4px;padding:4px 8px;font-size:13px;font-family:var(--font-sans)"';
      h += ' onchange="setSCWood(\'sc-large-wood\',this.value)">';
      h += '</div>';
      h += '<div style="display:flex;align-items:center;gap:8px">';
      h += '<label style="font-size:12px;color:var(--color-text-secondary);min-width:110px">Small wood (&lt;12&quot;):</label>';
      h += '<input type="number" min="0" step="1" placeholder="0" value="'+scSmall+'"';
      h += ' style="width:80px;border:1px solid var(--color-border);border-radius:4px;padding:4px 8px;font-size:13px;font-family:var(--font-sans)"';
      h += ' onchange="setSCWood(\'sc-small-wood\',this.value)">';
      h += '</div>';
      h += '</div>';
      if (scLarge > 0 || scSmall > 0) {
        h += '<div class="wz-status done">&#10003; Large: <b>'+(scLarge||0)+'</b> · Small: <b>'+(scSmall||0)+'</b></div>';
      }
      break;
    }

    case 'fp_structures': {
      h += '<div class="wz-step-desc">Draw large-log placement and add any floodplain structures. Side-channel structures are counted separately under Secondary Channels — Wood Counts.</div>';
      h += wzFPDrawRow(we, 'fp-logs-area', 'polygon', 'Large-log placement area');
      h += wzFPInputRow(we, 'fp-large-logs', '# Large logs placed');

      h += '<div style="margin:2px 0 10px">';
      h += '<button class="pm-draw-btn" onclick="wizardAddFPStructure()">&#43; Add Structure</button>';
      h += '</div>';
      var fpStructs = (we && we.fpStructs) || [];
      if (!fpStructs.length) {
        h += '<div class="wz-status pending">&#9654; No floodplain structures added yet.</div>';
      }
      fpStructs.forEach(function(s) {
        var t = s.structType || 'fps';
        var isWaiting = pendingStructPoint && pendingStructPoint.id === s.id;
        h += '<div style="background:#fff;border:1px solid #dcdcdc;border-radius:5px;padding:8px;margin-bottom:6px">';
        h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
        h += '<span style="font-size:11px;font-weight:600;color:#7c7c7c">Floodplain Structure</span>';
        h += '<span style="cursor:pointer;color:#ef4444;font-size:12px" onclick="wizardDelFPStructure(\''+s.id+'\')">&#10005;</span>';
        h += '</div>';
        if (s.latlng) {
          h += '<div style="font-size:11px;color:#0f6849;margin-bottom:4px">&#10003; Placed on map</div>';
        } else {
          h += '<button class="pm-draw-btn'+(isWaiting?' active':'')+'" style="width:100%;height:auto;padding:5px;margin-bottom:4px" onclick="startStructPoint(\''+t+'\',\''+s.id+'\')">&#9679; '+(isWaiting?'Click map to place…':'Place on map')+'</button>';
        }
        h += '<esa-text-field placeholder="Description (e.g. Engineered log jam)" value="'+(s.desc||'')+'" style="display:block;margin-bottom:4px" size="sm" onchange="updateFPStructure(\''+s.id+'\',\'desc\',this.value)"></esa-text-field>';
        h += '<div style="display:flex;gap:8px">';
        h += '<div style="flex:1"><div style="font-size:11px;color:#7c7c7c;margin-bottom:2px">Large pieces (&gt;12")</div><input type="number" min="0" placeholder="0" value="'+(s.large||'')+'" style="width:100%;box-sizing:border-box;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" oninput="updateFPStructure(\''+s.id+'\',\'large\',+this.value)"></div>';
        h += '<div style="flex:1"><div style="font-size:11px;color:#7c7c7c;margin-bottom:2px">Small pieces (&lt;12")</div><input type="number" min="0" placeholder="0" value="'+(s.small||'')+'" style="width:100%;box-sizing:border-box;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" oninput="updateFPStructure(\''+s.id+'\',\'small\',+this.value)"></div>';
        h += '</div></div>';
      });
      break;
    }

    case 'fp_reach_width': {
      var scAvgW = scAvgWidthFt(we);
      h += '<div class="wz-step-desc">Floodplain width is measured across the pre-project Floodplain boundary at each Secondary Channel — no separate drawing needed here.</div>';
      if (scAvgW === null) {
        h += '<div class="wz-status warning">&#9888; Floodplain width unavailable — make sure the pre-project Floodplain boundary (step 5) is drawn and at least one Secondary Channel is entered and crosses it.</div>';
      } else {
        h += '<div class="wz-metric-row"><span class="wz-metric-label">Avg floodplain width</span><span class="wz-metric-val">'+Math.round(scAvgW)+' ft</span></div>';
        h += '<div class="wz-status done">&#10003; Calculated from secondary channel data.</div>';
      }
      h += '<div class="wz-group-head divided">Post-Project Connectivity</div>';
      h += wzFPInputRow(we, 'fp-bankfull-ac', 'FP area connected below bankfull (ac)');
      h += wzFPInputRow(we, 'fp-bankfull-2x-ac', 'FP area connected below 2x bankfull (ac)');
      break;
    }

    case 'fp_grading':
      h += '<div class="wz-step-desc">Draw each area of floodplain grading (cut). Add as many as needed.</div>';
      h += wzFPMultiSection(we, 'grade', 'polygon', 'Grading area', false);
      break;

    case 'fp_road':
      h += '<div class="wz-step-desc">Draw each road segment removed or set back within the floodplain. Add as many as needed.</div>';
      h += wzFPMultiSection(we, 'road', 'line', 'Road removal', true);
      break;

    case 'fp_berm':
      h += '<div class="wz-step-desc">Draw each berm or levee segment removed. Add as many as needed.</div>';
      h += wzFPMultiSection(we, 'berm', 'line', 'Berm/levee removal', true);
      break;

    case 'fp_revetment':
      h += '<div class="wz-step-desc">Draw each revetment segment removed. Add as many as needed.</div>';
      h += wzFPMultiSection(we, 'revet', 'line', 'Revetment removal', true);
      break;

    case 'fp_tailings':
      h += '<div class="wz-step-desc">Draw each area of mine tailings removed. Add as many as needed.</div>';
      h += wzFPMultiSection(we, 'tailings', 'polygon', 'Tailings removal area', true);
      break;

    case 'fp_wetland_enhance': {
      var existingWetItems = (we.fpMulti && we.fpMulti['pp_wetland']) || [];
      h += '<div class="wz-step-desc">Draw the area(s) of existing wetland habitat that were constructed, restored, or enhanced. Each area is automatically clipped to your pre-project Existing Wetland Areas, shown on the map for reference — only the overlapping portion counts.</div>';
      if (!existingWetItems.length) {
        h += '<div class="wz-status warning">&#9888; No pre-project Existing Wetland Areas identified yet — go back to that step first, or anything drawn here will clip to zero.</div>';
      }
      h += wzFPMultiSection(we, 'fp_wetland_enhance', 'polygon', 'Enhancement area', false);
      var enhItems = (we.fpMulti && we.fpMulti['fp_wetland_enhance']) || [];
      var anyNoOverlap = enhItems.some(function(item){ var d = we.sowLayers[item.id]; return d && d._noOverlap; });
      if (anyNoOverlap) {
        h += '<div class="wz-status warning">&#9888; One or more drawn areas didn\'t overlap any Existing Wetland Area — check placement and redraw.</div>';
      }
      break;
    }

    case 'rr_fencing':
      h += '<div class="wz-step-desc">Draw fencing installed for riparian protection and the floodplain area it protects.</div>';
      h += wzFPDrawRow(we, 'rr-fence', 'line', 'Miles of fence installed');
      h += wzFPDrawRow(we, 'rr-fence-area', 'polygon', 'Area of FP protected by fence');
      break;

    case 'rr_planting':
      h += '<div class="wz-step-desc">Enter plants installed and draw planting and invasive-species-removal areas.</div>';
      h += wzFPInputRow(we, 'rr-plants', '# Plants installed');
      h += wzFPDrawRow(we, 'rr-plant-bf', 'polygon', 'Area FP below bankfull planted');
      h += wzFPDrawRow(we, 'rr-plant-abf', 'polygon', 'Area FP above bankfull planted');
      h += wzFPDrawRow(we, 'rr-invasive', 'polygon', 'Area invasive species removed/treated');
      break;

    case 'rr_totals':
      h += '<div class="wz-step-desc">Draw the total bank length and area of riparian improvement for this work element.</div>';
      h += wzFPDrawRow(we, 'rr-bank', 'line', 'Bank length with riparian improvement');
      h += wzFPDrawRow(we, 'rr-total', 'polygon', 'Total area of riparian improvement');
      break;

    case 'done':
      h += '<div class="wz-step-desc">Your design is complete. Export your metrics, then return to the work element to continue tracking it through milestones and metrics.</div>';
      h += '<div class="wz-status done" style="font-size:13px;padding:14px">&#10003; <b>Design complete!</b></div>';
      h += '<button class="wz-action-btn" style="margin-top:16px" onclick="openSOW()">&#128196; Export Metrics</button>';
      h += '<a class="wz-action-btn secondary" style="text-decoration:none" href="'+(window.MSOW_WORK_ELEMENTS_HREF||'/legacy/we')+'">&larr; Back to Work Element</a>';
      // "Add Another Work Element" hidden for now — kept for easy restore.
      // h += '<button class="wz-action-btn secondary" onclick="openWEModal(null)">&#43; Add Another Work Element</button>';
      break;
  }
  return h;
}

function wizardStepFooter(we, step, idx) {
  var vis = getVisibleSteps();
  var backDisabled = idx === 0 ? 'disabled' : '';
  var status = wizardStepStatus(we, step.id);
  var isLast = idx === vis.length - 1;
  // Steps that must be completed before advancing
  var required  = ['perimeter', 'reach', 'ch_width', 'fp_left', 'fp_right'];
  // Steps where "Skip ›" shows when empty, "Next ›" when something is entered
  var skippable = ['bank_ht', 'substrate', 'pp_wetland', 'chu_split', 'structures', 'pc_gravel',
    'fp_structures', 'fp_reach_width', 'fp_grading', 'fp_road', 'fp_berm', 'fp_revetment', 'fp_tailings', 'fp_wetland_enhance',
    'rr_fencing', 'rr_planting', 'rr_totals'];

  var nextLabel, nextCls, nextDisabled;
  if (isLast) {
    nextLabel = '&#10003; Finish'; nextCls = 'success'; nextDisabled = '';
  } else if (required.indexOf(step.id) >= 0) {
    nextLabel = 'Next ›';
    nextCls = status === 'done' ? 'success' : '';
    nextDisabled = status !== 'done' ? 'disabled' : '';
  } else if (skippable.indexOf(step.id) >= 0 && status !== 'done') {
    // Nothing entered yet — show Skip in the same position
    nextLabel = 'Skip ›'; nextCls = 'skip'; nextDisabled = '';
  } else {
    nextLabel = 'Next ›';
    nextCls = status === 'done' ? 'success' : '';
    nextDisabled = '';
  }
  return '<button class="wz-btn-back" '+backDisabled+' onclick="wizardBack()">‹ Back</button>' +
         '<button class="wz-btn-next '+nextCls+'" '+nextDisabled+' onclick="wizardNext()">'+nextLabel+'</button>';
}

// Steps repeated per primary channel carry a pcId — landing on one makes that
// channel the active one so status/body/draw functions resolve it via getActivePC().
function syncActivePCForStep(idx) {
  var we = getActiveWE(); if (!we) return;
  var step = getVisibleSteps()[idx];
  if (step && step.pcId) we.activePCId = step.pcId;
}

// Any real navigation snaps the stepper accordion back to auto-following wherever
// the wizard actually is now, discarding any section the user had manually peeked at.
function toggleWzSection(key) {
  wzOpenSection = (wzLastEffectiveSection === key) ? '__none__' : key;
  renderWizardStep();
}

// Whether the user has a drawing/edit in progress that wizardAutoActivate()'s
// cancelAllDrawModes() would silently throw away on a step change: an active
// manual polygon/line/cross-section/CHU-split draw mode, a CHU pool-split
// flow, vertex-editing on an existing shape, an in-flight reach auto-detect/
// extend/trim/pre-trim-extend, or actively repositioning the reference image.
//
// This checks the mode flags directly (ppDrawing/sowDrawing/crDrawing/
// chuDrawing) rather than "has a vertex actually been placed yet"
// (drawPts.length > 0) — the same moment these flags go true is the moment
// #mapwrap gets .drawing and the screen dims, so the guard needs to cover
// that instant too, not just once a click has landed on the map. This also
// matters because wizardRedraw() calls clearPPGeom() — which deletes the
// existing shape immediately — before arming a fresh draw with zero points
// placed; leaving in that exact window used to lose the old shape with no
// warning at all, dimmed screen notwithstanding.
function hasInProgressDraw() {
  return !!ppDrawing || !!sowDrawing || !!crDrawing ||
         !!chuDrawing || !!chuPoolMode ||
         !!lineEditing ||
         !!reachAutoDetecting || !!reachExtending || !!reachTrimming || !!preReachExtend ||
         !!refImagePositioning;
}

// Users reported getting "stuck" while drawing — root cause traced to leaving
// a step mid-draw (clicking Back/Next/a stepper item) with no warning that the
// in-progress shape was about to vanish (cancelAllDrawModes() discards it
// silently). Gate the four navigation entry points so leaving with real
// progress on the map — including an in-progress reference-image reposition —
// requires confirming instead of losing work by surprise.
//
// lineEditing and refImagePositioning are a different case from the rest: both
// live-mutate the actual geometry/bounds as you drag, so there's nothing left
// for leaving to "discard" — it just locks in whatever is currently shown
// (cancelLineEdit() / finishRefImagePositioning() above). Every other state
// here (a fresh manual draw, an unconfirmed auto-detect/extend/trim step, a
// staged-but-unconfirmed reach append) really does lose real work on leaving,
// since cancelAllDrawModes() removes the preview/candidate rather than saving
// it. Word the prompt to match which one is actually true.
function confirmLeaveDrawInProgress() {
  if (!hasInProgressDraw()) return true;
  if (lineEditing || refImagePositioning) {
    return confirm('Your edit on this step is still in progress. Leaving now will save it as currently shown — continue?');
  }
  return confirm('You have an unfinished drawing on this step. Leaving now will discard it — continue?');
}

function wizardNext() {
  if (!confirmLeaveDrawInProgress()) return;
  wzOpenSection = null;
  var vis = getVisibleSteps();
  if (wizardStep < vis.length - 1) {
    wizardStep++;
    syncActivePCForStep(wizardStep);
    renderWizardStep();
    wizardAutoActivate();
  }
}

function wizardBack() {
  if (!confirmLeaveDrawInProgress()) return;
  wzOpenSection = null;
  if (wizardStep > 0) { wizardStep--; syncActivePCForStep(wizardStep); renderWizardStep(); wizardAutoActivate(); }
}

function wizardGoToStep(idx) {
  if (!confirmLeaveDrawInProgress()) return;
  wzOpenSection = null;
  var vis = getVisibleSteps();
  if (idx < 0 || idx >= vis.length) return;
  wizardStep = idx;
  syncActivePCForStep(wizardStep);
  renderWizardStep();
  wizardAutoActivate();
}

function wizardSkip() {
  if (!confirmLeaveDrawInProgress()) return;
  wzOpenSection = null;
  var vis = getVisibleSteps();
  if (wizardStep < vis.length - 1) { wizardStep++; syncActivePCForStep(wizardStep); renderWizardStep(); wizardAutoActivate(); }
}

// Cancels every interactive map mode (manual draws, auto-detects, vertex editing) at
// once. Called whenever the wizard switches steps — previously only ppDrawing and
// wetlandAutoDetecting were reset here, so a draw/detect left in progress on the old
// step (e.g. mid manual-line-draw, mid CHU pool split, mid reach auto-detect) survived
// the step change and silently fed the next map click into the wrong handler.
// exceptStepId lets a mode survive if the wizard is (re-)landing on the very step that
// mode belongs to, matching the wetland behavior this replaces.
function cancelAllDrawModes(exceptStepId) {
  if (ppDrawing) { ppDrawing = null; drawPts = []; clearPreview(); }
  if (sowDrawing) { sowDrawing = null; drawPts = []; clearPreview(); }
  if (crDrawing) { crDrawing = null; drawPts = []; clearPreview(); }
  pendingStructPoint = null;
  pendingGravelPoint = null;
  if (chuDrawing) cancelCHUSplit();
  if (chuPoolMode) { chuPoolMode = false; chuPoolPhase = 0; chuPendingPoolUpId = null; chuPendingPoolDownId = null; }
  // cancelLineEdit() now delegates to commitLineEdit(true) itself, so this keeps the
  // displayed/exported value in sync with the shape's actual dragged geometry (see
  // commit 8e7e49f) without the risk of a second confirm-and-possibly-reenter-edit-mode
  // detour for reach_len — this is a step change the user already agreed to leave.
  if (lineEditing) cancelLineEdit();
  if (refImagePositioning) finishRefImagePositioning();
  if (exceptStepId !== 'reach') {
    if (reachAutoDetecting) cancelReachAutoDetect();
    if (reachExtending) cancelReachExtend();
    if (reachTrimming) cancelReachTrimMode();
    var we = getActiveWE();
    if (we && we.ppData['reach_len'] && we.ppData['reach_len']._preTrim) cancelPreTrimStep();
  }
  if (exceptStepId !== 'pp_wetland' && wetlandAutoDetecting) cancelWetlandAutoDetect();
  document.getElementById('mapwrap').classList.remove('drawing');
  document.querySelectorAll('.draw-btn').forEach(function(b){ b.classList.remove('active'); });
}

function wizardAutoActivate() {
  var vis = getVisibleSteps();
  var step = vis[wizardStep];
  if (!step) return;
  var we = getActiveWE();
  cancelAllDrawModes(step.id);
  // Clear any hint left over from whichever step we were just on — only a couple of
  // step cases below set their own hint, so without this it stays stuck on screen
  // (e.g. leaving Stream Reach for another step used to leave its hint banner up).
  setMapHint('');
  // Auto-manage pre-project layer visibility based on phase
  if (step.phase === 'pp') { setPPLayersVisible(true); }
  else if (step.phase === 'work') { setPPLayersVisible(false); }
  updateFpPolyVisibilityForStep(we, step); // must run after setPPLayersVisible(true) above, which would otherwise re-show it
  setGravelMarkersVisible(we, !!(step.types && step.types.indexOf('pc') >= 0));
  switch(step.id) {
    case 'perimeter':
      setMapHint('Draw your project boundary polygon on the map');
      break;
    case 'reach':
      setMapHint('Click Auto-Detect or Draw Manually to add your reach line');
      break;
    case 'ch_width': case 'fp_left': case 'fp_right': case 'fp_poly':
      if (we && we.ppData['reach_len'] && we.ppData['reach_len'].layer) map.fitBounds(we.ppData['reach_len'].layer.getBounds(), {padding:[60,60]});
      break;
    case 'chu_details':
      // Re-render units so riffle labels appear (they're suppressed in chu_split step)
      if (we && getActivePC(we).chuUnits) { setLabelsVisible(true); renderCHUUnits(we); }
      if (we && getActivePC(we).sowLayers['pc-area'] && getActivePC(we).sowLayers['pc-area'].layer) map.fitBounds(getActivePC(we).sowLayers['pc-area'].layer.getBounds(), {padding:[40,40]});
      break;
    case 'chu_split':
      if (we) { initCHUUnits(we); }
      { var chuPerim = we && we.ppData['perimeter'] && we.ppData['perimeter'].layer;
        if (chuPerim) {
          // Perimeter must always be visible in this step regardless of toggle state
          if (!map.hasLayer(chuPerim)) map.addLayer(chuPerim);
          chuPerim.setStyle({opacity:1, weight:2, dashArray:'8 5', fillOpacity:0});
          map.fitBounds(chuPerim.getBounds(), {padding:[30,30]});
        } else if (we && getActivePC(we).sowLayers['pc-area'] && getActivePC(we).sowLayers['pc-area'].layer) {
          map.fitBounds(getActivePC(we).sowLayers['pc-area'].layer.getBounds(), {padding:[40,40]});
        }
      }
      break;
    case 'pc_metrics':
      if (we && getActivePC(we).sowLayers['pc-reach'] && getActivePC(we).sowLayers['pc-reach'].layer) map.fitBounds(getActivePC(we).sowLayers['pc-reach'].layer.getBounds(), {padding:[40,40]});
      break;
    case 'pc_gravel':
      if (we && getActivePC(we).sowLayers['pc-reach'] && getActivePC(we).sowLayers['pc-reach'].layer) map.fitBounds(getActivePC(we).sowLayers['pc-reach'].layer.getBounds(), {padding:[40,40]});
      break;
    case 'pc_fp':
      // Show the pre-project floodplain as a reference while drawing the new one —
      // setPPLayersVisible(false) above already hid it; re-add with its normal style,
      // same as pc_reach re-adding the pre-project reach line above.
      if (we && we.ppData['fp_poly'] && we.ppData['fp_poly'].layer) {
        var ppFpL = we.ppData['fp_poly'].layer;
        if (!map.hasLayer(ppFpL)) map.addLayer(ppFpL);
      }
      if (we && getActivePC(we).sowLayers['pc-reach'] && getActivePC(we).sowLayers['pc-reach'].layer) map.fitBounds(getActivePC(we).sowLayers['pc-reach'].layer.getBounds(), {padding:[40,40]});
      break;
    case 'sc_draw': case 'sc_width': case 'sc_wood': {
      // Hide labels to reduce clutter while drawing secondary channels
      setLabelsVisible(false);
      // Ensure primary channel reach + area are visible as reference while drawing secondary channels
      if (we) {
        var pcRL = getActivePC(we).sowLayers['pc-reach'];
        if (pcRL && pcRL.layer && !map.hasLayer(pcRL.layer)) map.addLayer(pcRL.layer);
        var pcAL = getActivePC(we).sowLayers['pc-area'];
        if (pcAL && pcAL.layer && !map.hasLayer(pcAL.layer)) map.addLayer(pcAL.layer);
      }
      // Zoom to perimeter so the full project boundary is visible while drawing
      var scPerimL = we && we.ppData['perimeter'] && we.ppData['perimeter'].layer;
      if (scPerimL) {
        scPerimL.setStyle({opacity:1, weight:2, dashArray:'8 5'});
        map.fitBounds(scPerimL.getBounds(), {padding:[30,30]});
      } else if (we && getActivePC(we).sowLayers['pc-reach'] && getActivePC(we).sowLayers['pc-reach'].layer) {
        map.fitBounds(getActivePC(we).sowLayers['pc-reach'].layer.getBounds(), {padding:[40,40]});
      }
      break;
    }
    case 'pc_reach':
      // Show the pre-project reach as a reference while drawing the designed channel —
      // setPPLayersVisible(false) above already hid it (not in ALWAYS_VISIBLE_PP), so
      // re-add it here the same way sc_draw/sc_width/sc_wood re-add the primary channel.
      if (we && we.ppData['reach_len'] && we.ppData['reach_len'].layer) {
        var ppReachL = we.ppData['reach_len'].layer;
        if (!map.hasLayer(ppReachL)) map.addLayer(ppReachL);
        map.fitBounds(ppReachL.getBounds(), {padding:[40,40]});
      }
      break;
    case 'buffers':
      if (we) { updateAreaChBuffer(we); updateAreaFpBuffer(we); setTimeout(function(){ renderWizardStep(); }, 150); }
      break;
    case 'fp_split':
      if (we) {
        // Ensure buffers are fresh then auto-split
        updateAreaChBuffer(we);
        updateAreaFpBuffer(we);
        setTimeout(function() {
          var fpD = we.ppData['area_fp'];
          if (fpD && (fpD.layer || fpD.bufferLayer) && fpD.outerLeft && fpD.outerLeft.length) {
            splitFpByReach(we, fpD.fpFlipped || false);
          }
          renderWizardStep();
        }, 200);
      }
      break;
    case 'pp_done':
      showInnerTab('pp');
      break;
    case 'chu_split':
    case 'chu_details':
    case 'structures':
    case 'pc_channel_done':
    case 'fp_structures':
    case 'fp_reach_width':
    case 'fp_grading':
    case 'fp_road':
    case 'fp_berm':
    case 'fp_revetment':
    case 'fp_tailings':
    case 'fp_wetland_enhance':
    case 'rr_fencing':
    case 'rr_planting':
    case 'rr_totals':
      showInnerTab('work');
      break;
  }
}

function wizardDraw(metricId) {
  startPPDraw(metricId, 0);
  // After draw completes, renderWizardStep is called via updatePPProgress
}

function wizardDrawLine(metricId, idx) {
  startPPDraw(metricId, idx);
}

function wizardRedraw(metricId) {
  clearPPGeom(metricId);
  startPPDraw(metricId, 0);
}

// Wizard refresh hook — called at end of updatePPProgress
function wizardSetCHUType(unitId, type) {
  var we = getActiveWE(); if (!we) return;
  var units = getActivePC(we).chuUnits;
  var idx = -1;
  units.forEach(function(u, i){ if (u.id === unitId) idx = i; });
  if (idx < 0) return;
  var cycleIdx = CHU_CYCLE.indexOf(type);
  units.forEach(function(u, i) {
    var offset = ((i - idx) % CHU_CYCLE.length + CHU_CYCLE.length) % CHU_CYCLE.length;
    u.type = CHU_CYCLE[(cycleIdx + offset) % CHU_CYCLE.length];
  });
  units.forEach(function(u) {
    if (u.layer) u.layer.setStyle({color: CHU_COLOR[u.type||'unassigned'], fillColor: CHU_COLOR[u.type||'unassigned']});
  });
  renderCHUUnits(we);
  renderWizardStep();
}

function wizardSetCHUBoulders(unitId, val) {
  var we = getActiveWE(); if (!we) return;
  var u = getActivePC(we).chuUnits && getActivePC(we).chuUnits.filter(function(u){ return u.id===unitId; })[0];
  if (u) { u.boulderCount = parseInt(val)||0; }
}

function wizardSetCHUDepth(unitId, val) {
  var we = getActiveWE(); if (!we) return;
  var u = getActivePC(we).chuUnits && getActivePC(we).chuUnits.filter(function(u){ return u.id===unitId; })[0];
  if (u) { u.avgDepth = parseFloat(val)||0; }
}

function wizardSkipCHU() {
  wzOpenSection = null;
  // Skip both chu_split and chu_details for the channel currently being stepped through
  var vis = getVisibleSteps();
  var curPcId = vis[wizardStep] && vis[wizardStep].pcId;
  var detailsIdx = -1;
  vis.forEach(function(s, i){ if (s.id === 'chu_details' && s.pcId === curPcId) detailsIdx = i; });
  if (detailsIdx >= 0) wizardStep = detailsIdx + 1;
  else wizardStep = Math.min(wizardStep + 2, vis.length - 1);
  syncActivePCForStep(wizardStep);
  renderWizardStep();
  wizardAutoActivate();
}

function wizardAddStructure(type, label) {
  var we = getActiveWE(); if (!we) return;
  var pc = getActivePC(we);
  var s = {id:type+'-'+Date.now(), structType:type, label:label, desc:structDefaultDesc(we, type), large:0, small:0, latlng:null, marker:null};
  // Write to both arrays so the expert panel's renderAllStructures() picks it up
  if (!pc.structs) pc.structs = [];
  pc.structs.push(s);
  pc.structures[type].push(s);
  renderWizardStep();
  startStructPoint(type, s.id);
}

function wizardDelStructure(type, id) {
  delStructure(type, id);
  renderWizardStep();
}

function wizardAddFPStructure() {
  var we = getActiveWE(); if (!we) return;
  addFPStructure();
  renderWizardStep();
  var s = we.fpStructs[we.fpStructs.length - 1];
  if (s) startStructPoint(s.structType, s.id);
}

function wizardDelFPStructure(id) {
  delFPStructure(id);
  renderWizardStep();
}

// Wizard-styled draw row for a SOW metric — reads we.sowLayers[id] directly so
// status stays correct across the full-body re-renders renderWizardStep() does.
function wzFPDrawRow(we, id, geo, label) {
  var d = we && we.sowLayers[id];
  var hasVal = d && (geo === 'polygon' ? d.acres : d.valueM);
  var displayVal = null;
  if (hasVal) {
    if (geo === 'polygon') displayVal = d.acres.toFixed(2) + ' ac';
    else if (geo === 'segment') displayVal = Math.round(d.valueM * 3.28084) + ' ft';
    else displayVal = (d.valueM * 0.000621371).toFixed(3) + ' mi';
  }
  var h = '<div class="wz-metric-row">';
  h += '<span class="wz-metric-label">' + label + '</span>';
  h += '<span class="wz-metric-val' + (displayVal ? '' : ' missing') + '">' + (displayVal || 'not drawn') + '</span>';
  h += '<button style="background:' + (displayVal ? '#f3f7fc' : '#1e5386') + ';color:' + (displayVal ? '#3d3d3d' : '#fff') + ';border:1px solid ' + (displayVal ? '#dcdcdc' : 'transparent') + ';padding:3px 8px;border-radius:3px;font-size:10px;cursor:pointer;margin-left:8px" ';
  h += 'onclick="startSOWDraw(&apos;' + id + '&apos;,&apos;' + geo + '&apos;,&apos;' + label + '&apos;)">' + (displayVal ? 'redo' : 'draw') + '</button>';
  h += '</div>';
  return h;
}

// Wizard-styled numeric input tied to we.sowLayers[id].value (same storage onFInputChange uses).
function wzFPInputRow(we, id, label) {
  var val = (we && we.sowLayers[id] && we.sowLayers[id].value !== undefined) ? we.sowLayers[id].value : '';
  var h = '<div style="display:flex;align-items:center;gap:8px;padding:4px 0 10px 0">';
  h += '<label style="flex:1;font-size:11px;color:var(--color-text-muted)">' + label + '</label>';
  h += '<input type="number" min="0" step="1" value="' + val + '" placeholder="0" ';
  h += 'style="width:80px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px;font-family:var(--font-sans)" ';
  h += 'onchange="onFInputChange(&apos;' + id + '&apos;,this.value);if(wizardMode)wizardRefreshIfActive();">';
  h += '</div>';
  return h;
}

function wizardAddFPMultiItem(key, geo, label) {
  var we = getActiveWE(); if (!we) return;
  if (!we.fpMulti) we.fpMulti = {grade:[], road:[], berm:[], revet:[], tailings:[], pp_wetland:[], fp_wetland_enhance:[]};
  if (!we.fpMulti[key]) we.fpMulti[key] = [];
  var n = we.fpMulti[key].length + 1;
  var id = 'fp-' + key + '-' + Date.now();
  we.fpMulti[key].push({id: id, vol: ''});
  renderWizardStep();
  startSOWDraw(id, geo, label + ' ' + n);
}

function wizardDelFPMultiItem(key, id) {
  var we = getActiveWE(); if (!we) return;
  if (!we.fpMulti || !we.fpMulti[key]) return;
  var sl = we.sowLayers[id];
  if (sl && sl.layer) map.removeLayer(sl.layer);
  if (sl && sl._labelMarker) map.removeLayer(sl._labelMarker);
  delete we.sowLayers[id];
  we.fpMulti[key] = we.fpMulti[key].filter(function(x){ return x.id !== id; });
  renumberFPMultiLabels(we, key);
  renderWizardStep();
}

function wizardSetFPMultiVol(key, id, val) {
  var we = getActiveWE(); if (!we) return;
  var item = we.fpMulti && we.fpMulti[key] && we.fpMulti[key].filter(function(x){ return x.id===id; })[0];
  if (item) item.vol = val;
}

// Wizard-styled multi-entry section — draw N instances of a metric, each its own
// we.sowLayers entry keyed by a generated id and tracked in we.fpMulti[key].
function wzFPMultiSection(we, key, geo, label, hasVolume) {
  var items = (we && we.fpMulti && we.fpMulti[key]) || [];
  var h = '<div style="margin:2px 0 10px">';
  h += '<button class="pm-draw-btn" onclick="wizardAddFPMultiItem(\'' + key + '\',\'' + geo + '\',\'' + label + '\')">&#43; Add ' + label + '</button>';
  h += '</div>';
  if (!items.length) {
    h += '<div class="wz-status pending">&#9654; None added yet.</div>';
  }
  items.forEach(function(item, i) {
    var d = we.sowLayers[item.id];
    var hasVal = d && (geo === 'polygon' ? d.acres : d.valueM);
    var displayVal = null;
    if (hasVal) {
      displayVal = geo === 'polygon' ? d.acres.toFixed(2) + ' ac' : (d.valueM * 0.000621371).toFixed(3) + ' mi';
    }
    var itemLabel = label + ' ' + (i + 1);
    var hoverAttrs = displayVal
      ? ' onmouseenter="highlightSOW(&apos;' + item.id + '&apos;)" onmouseleave="unhighlightSOW()" style="cursor:pointer"'
      : '';
    h += '<div class="wz-metric-row"' + hoverAttrs + '>';
    h += '<span class="wz-metric-label">' + itemLabel + '</span>';
    h += '<span class="wz-metric-val' + (displayVal ? '' : ' missing') + '">' + (displayVal || 'not drawn') + '</span>';
    h += '<button style="background:' + (displayVal ? '#f3f7fc' : '#1e5386') + ';color:' + (displayVal ? '#3d3d3d' : '#fff') + ';border:1px solid ' + (displayVal ? '#dcdcdc' : 'transparent') + ';padding:3px 8px;border-radius:3px;font-size:10px;cursor:pointer;margin-left:8px" ';
    h += 'onclick="event.stopPropagation();startSOWDraw(&apos;' + item.id + '&apos;,&apos;' + geo + '&apos;,&apos;' + itemLabel + '&apos;)">' + (displayVal ? 'redo' : 'draw') + '</button>';
    if (displayVal) {
      h += '<span style="cursor:pointer;color:#1e5386;font-size:11px;margin-left:6px;text-decoration:underline" onclick="event.stopPropagation();zoomToSOW(&apos;' + item.id + '&apos;)" title="Zoom to this feature">&#128269;</span>';
    }
    h += '<span style="cursor:pointer;color:#ef4444;font-size:12px;margin-left:6px" onclick="event.stopPropagation();wizardDelFPMultiItem(\'' + key + '\',\'' + item.id + '\')">&#10005;</span>';
    h += '</div>';
    if (hasVolume) {
      h += '<div style="display:flex;align-items:center;gap:8px;padding:2px 0 10px 0">';
      h += '<label style="flex:1;font-size:11px;color:var(--color-text-muted)">Volume removed (CY)</label>';
      h += '<input type="number" min="0" step="1" value="' + (item.vol || '') + '" placeholder="0" ';
      h += 'style="width:80px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px;font-family:var(--font-sans)" ';
      h += 'oninput="wizardSetFPMultiVol(\'' + key + '\',\'' + item.id + '\',this.value)">';
      h += '</div>';
    }
  });
  return h;
}

var _wizardRefreshTimer = null;
function wizardRefreshIfActive() {
  if (!wizardMode) return;
  clearTimeout(_wizardRefreshTimer);
  _wizardRefreshTimer = setTimeout(function() {
    // Skip re-render if user is actively focused on an input inside the wizard body
    var active = document.activeElement;
    var bp = document.getElementById('wizard-body-panel');
    // document.activeElement retargets to the host when focus is inside an open shadow
    // root, so a focused esa-select's internal input reports as ESA-SELECT here.
    if (active && bp && bp.contains(active) &&
        (active.tagName==='INPUT'||active.tagName==='TEXTAREA'||active.tagName==='SELECT'||active.tagName==='ESA-SELECT')) return;
    renderWizardStep();
  }, 80);
}

function clearAll() {
  if(!confirm('Clear all work elements and drawn features?'))return;
  workElements.forEach(function(we){
    if(we._labelMarker) map.removeLayer(we._labelMarker);
    allWELayers(we).forEach(function(l){if(l&&l.remove)l.remove();});
  });
  workElements=[];activeWEId=null;ppDrawing=null;sowDrawing=null;pendingStructPoint=null;drawPts=[];clearPreview();
  document.getElementById('mapwrap').classList.remove('drawing');setMapHint('');
  renderWEList();renderLegend();
  document.getElementById('sidebar-empty').style.display='flex';
  document.getElementById('inner-tabbar').style.display='none';
  document.getElementById('pp-side').innerHTML='';
  document.getElementById('work-side').innerHTML='';
}

// ── SOW export ────────────────────────────────────────────────────────────
function fmtFt(we,id){var l=we.sowLayers[id];return l?Math.round(l.valueM*3.28084).toLocaleString()+' ft':'—';}
function fmtMi(we,id){var l=we.sowLayers[id];return l?(l.valueM*0.000621371).toFixed(3)+' mi':'—';}
function fmtAc(we,id){var l=we.sowLayers[id];return l?l.acres.toFixed(2)+' acres':'—';}
function fmtIn(id){var el=document.getElementById('f-'+id);return(el&&el.value)?el.value:'—';}
function fmtCalc(id){var el=document.getElementById('calc-'+id);return el?el.textContent:'—';}

function drawCHUPie(canvasId, data, fmtFn) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  var cx = w/2, cy = h/2, r = Math.min(w,h)/2 - 10;
  var total = data.reduce(function(a,d){return a+d.val;},0);
  if (!total) return;
  ctx.clearRect(0,0,w,h);
  var angle = -Math.PI/2;
  data.forEach(function(d) {
    var slice = (d.val/total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,angle,angle+slice);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Label inside slice if big enough
    if (slice > 0.3) {
      var midA = angle + slice/2;
      var lx = cx + Math.cos(midA)*r*0.62, ly = cy + Math.sin(midA)*r*0.62;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(d.val/total*100)+'%', lx, ly);
    }
    angle += slice;
  });
  // Legend
  var legEl = document.getElementById(canvasId+'-leg');
  if (legEl) {
    legEl.innerHTML = data.map(function(d){
      return '<div style="display:flex;align-items:center;gap:5px;margin-bottom:3px">'
        +'<div style="width:10px;height:10px;border-radius:2px;background:'+d.color+';flex-shrink:0"></div>'
        +'<span style="color:#2c4a6a">'+d.label+': <b>'+fmtFn(d.val)+'</b></span></div>';
    }).join('');
  }
}

// ── Before/After export preview maps ────────────────────────────────────────
// Two small read-only Leaflet maps embedded in the export report, at the same
// extent/zoom so they read as a true before/after comparison. Scope is the core
// channel + floodplain silhouette (plus secondary channels in the after view) —
// wood structures/gravel/riparian detail stays in the metrics tables below,
// where it's already covered; duplicating every marker type onto a 220px
// thumbnail would add clutter, not clarity.
var sowMiniMaps = [];
function clearSOWMiniMaps() {
  sowMiniMaps.forEach(function(m) { m.remove(); });
  sowMiniMaps = [];
}

function buildSOWMiniMap(containerId, we, mode) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var mm = L.map(containerId, {
    zoomControl: false, attributionControl: false, dragging: false,
    scrollWheelZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, tap: false
  });
  sowMiniMaps.push(mm);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {maxZoom: 19}).addTo(mm);

  var bounds = null;
  function extend(latlngs) {
    if (!latlngs || !latlngs.length) return;
    bounds = bounds ? bounds.extend(L.latLngBounds(latlngs)) : L.latLngBounds(latlngs);
  }
  function flat(ll) { return (ll && ll.length && Array.isArray(ll[0])) ? ll[0] : ll; }

  var perimD = we.ppData['perimeter'];
  if (perimD && perimD.layer) {
    var perimPts = flat(perimD.layer.getLatLngs());
    L.polygon(perimPts, {color: '#5a6b7a', weight: 1.5, dashArray: '6 4', fillOpacity: 0, interactive: false}).addTo(mm);
    extend(perimPts);
  }

  if (mode === 'before') {
    var reachD = we.ppData['reach_len'];
    if (reachD && reachD.layer) {
      var reachPts = flat(reachD.layer.getLatLngs());
      L.polyline(reachPts, {color: '#3a6ea5', weight: 2.5, interactive: false}).addTo(mm);
      extend(reachPts);
    }
    var fpD = we.ppData['fp_poly'];
    if (fpD && fpD.layer) {
      var fpPts = flat(fpD.layer.getLatLngs());
      L.polygon(fpPts, {color: '#2a7a5c', fillColor: '#2a7a5c', fillOpacity: 0.18, weight: 1.5, interactive: false}).addTo(mm);
      extend(fpPts);
    }
  } else {
    var pc = we.primaryChannels && we.primaryChannels[0];
    if (pc) {
      var pcReachD = pc.sowLayers['pc-reach'];
      if (pcReachD && pcReachD.layer) {
        var pcReachPts = flat(pcReachD.layer.getLatLngs());
        L.polyline(pcReachPts, {color: pcChannelColor(we, pc.id), weight: 2.5, interactive: false}).addTo(mm);
        extend(pcReachPts);
      }
      var pcFpD = pc.ppData['pc_fp'];
      if (pcFpD && pcFpD.layer) {
        var pcFpPts = flat(pcFpD.layer.getLatLngs());
        L.polygon(pcFpPts, {color: '#1a7a6c', fillColor: '#1a7a6c', fillOpacity: 0.18, weight: 1.5, interactive: false}).addTo(mm);
        extend(pcFpPts);
      }
    }
    (we.scReaches || []).forEach(function(sc) {
      if (sc.pts && sc.pts.length) {
        L.polyline(sc.pts, {color: '#c07820', weight: 2, interactive: false}).addTo(mm);
        extend(sc.pts);
      }
    });
  }

  if (bounds && bounds.isValid()) mm.fitBounds(bounds, {padding: [14, 14]});
  else mm.setView([45.5, -119.5], 6); // no geometry drawn yet — arbitrary Columbia Basin fallback view

  // The modal's show/layout transition can leave the container briefly unmeasured;
  // re-measure and re-fit once it has settled (same defensive pattern the map-sow
  // page itself doesn't need, but a freshly-shown dialog does).
  setTimeout(function() {
    mm.invalidateSize();
    if (bounds && bounds.isValid()) mm.fitBounds(bounds, {padding: [14, 14]});
  }, 50);
}

function openSOW() {
  if(!workElements.length){alert('No work elements to export.');return;}
  clearSOWMiniMaps(); // destroy any preview maps from a previous export before their containers are overwritten below
  var sowMapTargets = [];
  var today=new Date().toLocaleDateString();
  var h='<h3>Contract Information</h3><dl class="smeta"><dt>Contract #</dt><dd>84051 REL 50</dd><dt>COR</dt><dd>Virginia Preiss</dd><dt>FY</dt><dd>2026</dd><dt>Date</dt><dd>'+today+'</dd></dl>';

  workElements.forEach(function(we,idx) {
    // WE header/work-types line hidden for now — kept for easy restore.
    // h+='<h2>WE '+(idx+1)+': '+we.name+'</h2>';
    // h+='<div style="font-size:11px;color:#5ddba5;margin-bottom:8px">Work types: '+we.types.map(function(t){return TYPE_LABELS[t];}).join(', ')+'</div>';

    // Before/After map preview — built after this HTML lands in the DOM (see the
    // setTimeout at the end of openSOW()); container ids are just placeholders here.
    var beforeMapId = 'sow-map-before-' + we.id, afterMapId = 'sow-map-after-' + we.id;
    h += '<div class="sow-before-after-row">';
    h += '<div class="sow-mini-map-col"><div class="sow-mini-map-label">Pre-Project</div><div class="sow-mini-map" id="' + beforeMapId + '"></div></div>';
    h += '<div class="sow-mini-map-col"><div class="sow-mini-map-label">Project Design</div><div class="sow-mini-map" id="' + afterMapId + '"></div></div>';
    h += '</div>';
    sowMapTargets.push({we: we, beforeMapId: beforeMapId, afterMapId: afterMapId});

    // Pre-project
    h+='<h3>Pre-Project Conditions</h3><table><thead><tr><th>Metric</th><th>Method</th><th>Value</th></tr></thead><tbody>';
    PP_DEFS.forEach(function(m){
      // fp_left/fp_right: superseded by the calc'd Average Width/Total Active Floodplain Area rows.
      // pc_fp ("New Floodplain") is per-primary-channel data — it's reported in each channel's
      // Complexity Metrics table below, not here.
      if (m.id==='fp_left' || m.id==='fp_right' || m.id==='pc_fp') return;
      var d=we.ppData[m.id]||{},val='—';
      if(m.method==='entered'&&d.value)val=d.value;
      else if(m.method==='measured'&&!m.multi&&d.valueM)val=m.geo==='line'?Math.round(d.valueM*3.28084).toLocaleString()+' ft':(d.valueM*0.000247105).toFixed(2)+' acres';
      else if(m.method==='measured'&&m.multi){var avg=ppMultiAvgFt(we,m.id);if(avg!==null)val=Math.round(avg).toLocaleString()+' ft (avg)';}
      else if(m.method==='calc'){
        var c=ppCalc(we,m.id);
        if(c!==null){
          if(m.id==='sinuosity') val=c; // already a unitless ratio, formatted to 2 decimals
          else if(m.id==='avg_slope'){var sd=we.ppData['avg_slope']||{};val=c.toFixed(2)+'°'+(sd._slopePct!==undefined?' / '+sd._slopePct.toFixed(2)+'%':'');}
          else if(m.id==='bank_ht') val=c.toFixed(1)+' ft';
          else if(m.id==='valley_len'||m.id==='fp_width') val=Math.round(c*3.28084).toLocaleString()+' ft';
          else if(m.id==='area_fp') val=(c*0.000247105).toFixed(2)+' acres';
          else val=c;
        }
      }
      h+='<tr><td>'+m.label+'</td><td>'+m.method+'</td><td>'+val+'</td></tr>';
    });
    // pp_wetland is a multi-entry list (we.fpMulti/we.sowLayers-backed), not a plain
    // PP_DEFS field — sum it separately rather than through the loop above.
    var ppWetSumExp = fpMultiSum(we, 'pp_wetland');
    h+='<tr><td>Existing Wetland Areas</td><td>measured</td><td>'+(ppWetSumExp.count>0?ppWetSumExp.acres.toFixed(2)+' acres ('+ppWetSumExp.count+')':'—')+'</td></tr>';
    h+='</tbody></table>';

    // Only include sections for selected types — set this WE as active for fmtIn/fmtCalc to work
    // (Note: fmtIn reads from DOM, which reflects the currently rendered WE)
    // We'll use we.sowLayers directly for layer values

    if(we.types.indexOf('pc')>=0) {
      var savedActivePCIdForExport = we.activePCId;
      we.primaryChannels.forEach(function(pc, pcIdx) {
        we.activePCId = pc.id; // so pcChannelWidthFt()/avgWidths() resolve this channel
        var pcLabel = we.primaryChannels.length > 1 ? pc.name : 'Primary Channel';
        h+='<h3>'+pcLabel+' — Wood Structures</h3><table><thead><tr><th>Type</th><th>Description</th><th># Large</th><th># Small</th></tr></thead><tbody>';
        var anyS=false, pcTotalLarge=0, pcTotalSmall=0;
        ['cms','mcs','css'].forEach(function(t){pc.structures[t].forEach(function(s){anyS=true;pcTotalLarge+=+s.large||0;pcTotalSmall+=+s.small||0;h+='<tr><td>'+STRUCT_LABEL[t]+'</td><td>'+s.desc+'</td><td>'+(s.large||0)+'</td><td>'+(s.small||0)+'</td></tr>';});});
        if(!anyS)h+='<tr><td colspan="4" style="color:#aab8c8;font-style:italic">None entered</td></tr>';
        else h+='<tr style="font-weight:700"><td colspan="2">Total individual large/small logs</td><td>'+pcTotalLarge+'</td><td>'+pcTotalSmall+'</td></tr>';
        h+='</tbody></table>';
        // ── Channel Habitat Units ──────────────────────────────────────────────
        var chuR=pc.chuUnits?pc.chuUnits.filter(function(u){return u.type==='riffle';}):[];
        var chuP=pc.chuUnits?pc.chuUnits.filter(function(u){return u.type==='pool';}):[];
        var chuRArea=(chuR.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105);
        var chuPArea=(chuP.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105);
        var chuRLen=chuR.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
        var chuPLen=chuP.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
        var chuTotalBoulders = chuR.reduce(function(a,u){return a+(u.boulders||u.boulderCount||0);},0);
        var chuPDepths = chuP.filter(function(u){return u.poolDepth||u.avgDepth;}).map(function(u){return u.poolDepth||u.avgDepth;});
        var chuAvgDepth = chuPDepths.length?(chuPDepths.reduce(function(a,v){return a+v;},0)/chuPDepths.length).toFixed(1)+' ft':null;
        // % of reach — riffle/pool area relative to the total restored channel area
        var pcTotalAreaSL = pc.sowLayers['pc-area'];
        var pcTotalAreaAc = pcTotalAreaSL && pcTotalAreaSL.valueM ? pcTotalAreaSL.valueM*0.000247105 : null;
        var chuRPct = (pcTotalAreaAc && chuR.length) ? (chuRArea/pcTotalAreaAc*100) : null;
        var chuPPct = (pcTotalAreaAc && chuP.length) ? (chuPArea/pcTotalAreaAc*100) : null;
        if (chuR.length||chuP.length) {
          h+='<h3 class="sow-section-title">'+pcLabel+' — Habitat Units</h3>';
          h+='<table class="sow-table"><thead><tr><th>Metric</th><th>Method</th><th>Value</th></tr></thead><tbody>';
          h+='<tr><td># Riffles</td><td>measured</td><td>'+(chuR.length||'—')+'</td></tr>';
          h+='<tr><td>Total boulders</td><td>entered</td><td>'+(chuR.length?(chuTotalBoulders||'0'):'—')+'</td></tr>';
          h+='<tr><td>Riffle area</td><td>calc</td><td>'+(chuR.length?chuRArea.toFixed(3)+' acres':'—')+'</td></tr>';
          h+='<tr><td>Riffle length (approx)</td><td>calc</td><td>'+(chuR.length?'~'+Math.round(chuRLen).toLocaleString()+' ft':'—')+'</td></tr>';
          h+='<tr><td># Pools</td><td>measured</td><td>'+(chuP.length||'—')+'</td></tr>';
          h+='<tr><td>Pool area</td><td>calc</td><td>'+(chuP.length?chuPArea.toFixed(3)+' acres':'—')+'</td></tr>';
          h+='<tr><td>Pool length (approx)</td><td>calc</td><td>'+(chuP.length?'~'+Math.round(chuPLen).toLocaleString()+' ft':'—')+'</td></tr>';
          h+='<tr><td>Avg pool depth at low flow</td><td>entered</td><td>'+(chuAvgDepth||'—')+'</td></tr>';
          h+='<tr><td>Total area of riffles in project reach</td><td>calc</td><td>'+(chuRPct!==null?chuRPct.toFixed(1)+'%':'—')+'</td></tr>';
          h+='<tr><td>Total area of pools in project reach</td><td>calc</td><td>'+(chuPPct!==null?chuPPct.toFixed(1)+'%':'—')+'</td></tr>';
          h+='</tbody></table>';
        }
        // Pie charts — only if we have typed units
        var hasTypes = chuR.length||chuP.length;
        if (hasTypes) {
          var chartId1 = 'chu-pie-ac-'+we.id+'-'+pcIdx, chartId2 = 'chu-pie-ft-'+we.id+'-'+pcIdx;
          h += '<div style="display:flex;gap:24px;margin:16px 0;flex-wrap:wrap">';
          h += '<div style="flex:1;min-width:200px;text-align:center"><div style="font-size:11px;font-weight:700;color:#2c4a6a;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">By Area (acres)</div><canvas id="'+chartId1+'" width="180" height="180"></canvas><div id="'+chartId1+'-leg" style="margin-top:8px;font-size:10px;text-align:left;display:inline-block"></div></div>';
          h += '<div style="flex:1;min-width:200px;text-align:center"><div style="font-size:11px;font-weight:700;color:#2c4a6a;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">By Length (ft)</div><canvas id="'+chartId2+'" width="180" height="180"></canvas><div id="'+chartId2+'-leg" style="margin-top:8px;font-size:10px;text-align:left;display:inline-block"></div></div>';
          h += '</div>';
          // Draw after DOM is ready — capture per-channel values via closure
          (function(chartId1, chartId2, chuRArea, chuPArea, chuRLen, chuPLen) {
            setTimeout(function() {
              var acData  = [{label:'Riffle',val:chuRArea,color:'#c07820'},{label:'Pool',val:chuPArea,color:'#1a7abf'}].filter(function(d){return d.val>0;});
              var ftData  = [{label:'Riffle',val:chuRLen,color:'#c07820'},{label:'Pool',val:chuPLen,color:'#1a7abf'}].filter(function(d){return d.val>0;});
              drawCHUPie(chartId1, acData, function(v){return v.toFixed(2)+' ac'});
              drawCHUPie(chartId2, ftData, function(v){return Math.round(v).toLocaleString()+' ft'});
            }, 100);
          })(chartId1, chartId2, chuRArea, chuPArea, chuRLen, chuPLen);
        }

        // ── Complexity Metrics ──
        h+='<h3>'+pcLabel+' — Complexity Metrics</h3><table><thead><tr><th>Metric</th><th>Method</th><th>Value</th></tr></thead><tbody>';
        var pcRchSL = pc.sowLayers['pc-reach'];
        var pcRchFt2 = pcRchSL && pcRchSL.valueM ? Math.round(pcRchSL.valueM*3.28084).toLocaleString()+' ft' : '—';
        // Valley length from pc-reach endpoints
        var pcVlM2 = 0;
        if (pcRchSL && pcRchSL.layer) {
          var pcPts2 = pcRchSL.layer.getLatLngs();
          if (pcPts2.length && Array.isArray(pcPts2[0])) pcPts2 = pcPts2[0];
          if (pcPts2 && pcPts2.length >= 2) {
            var _R2=6378137,_tr2=function(d){return d*Math.PI/180;};
            var _p1=pcPts2[0],_p2=pcPts2[pcPts2.length-1];
            var _dl=_tr2(_p2.lat-_p1.lat),_dlg=_tr2(_p2.lng-_p1.lng);
            var _a=Math.sin(_dl/2)*Math.sin(_dl/2)+Math.cos(_tr2(_p1.lat))*Math.cos(_tr2(_p2.lat))*Math.sin(_dlg/2)*Math.sin(_dlg/2);
            pcVlM2=_R2*2*Math.atan2(Math.sqrt(_a),Math.sqrt(1-_a));
          }
        }
        var pcVlFt2 = pcVlM2 ? Math.round(pcVlM2*3.28084).toLocaleString()+' ft' : '—';
        var pcSin2  = (pcRchSL && pcRchSL.valueM && pcVlM2) ? (pcRchSL.valueM/pcVlM2).toFixed(2) : '—';
        var pcSd2   = pc.sowElev || {};
        var pcSlope2 = pcSd2._slopeDeg!==undefined ? pcSd2._slopeDeg.toFixed(2)+'° / '+pcSd2._slopePct.toFixed(2)+'%' : '—';
        var pcWidFt2  = pc.inputVals['pc-width'] ? Math.round(pc.inputVals['pc-width'])+' ft' : '—';
        var pcBHFt2   = pc.inputVals['pc-bank-height'] ? pc.inputVals['pc-bank-height']+' ft' : '—';
        var pcAreaSL2 = pc.sowLayers['pc-area'];
        var pcAreaAc2 = pcAreaSL2 && pcAreaSL2.valueM ? (pcAreaSL2.valueM*0.000247105).toFixed(3)+' acres' : '—';
        var pcExcav2  = pc.inputVals['pc-excavation-vol'] ? pc.inputVals['pc-excavation-vol'].toLocaleString()+' CY' : '—';
        var pcNewFpSL = pc.ppData['pc_fp'];
        var pcNewFpAc = pcNewFpSL && pcNewFpSL.valueM ? (pcNewFpSL.valueM*0.000247105).toFixed(2)+' acres' : '—';
        // Gravel placement — point placements, each with its own length/depth.
        var pcGravelWFt = pcChannelWidthFt(we);
        var pcGravelPlaced2 = (pc.gravelPlacements||[]).filter(function(p){return p.latlng;});
        var pcGravelTotalCY2 = 0, pcGravelTotalLenFt = 0;
        var pcGravelDepths = pcGravelPlaced2.filter(function(p){return p.depth;}).map(function(p){return parseFloat(p.depth);});
        pcGravelPlaced2.forEach(function(p){
          if (p.length) pcGravelTotalLenFt += parseFloat(p.length);
          if (pcGravelWFt && p.length && p.depth) pcGravelTotalCY2 += parseFloat(p.length)*parseFloat(p.depth)*pcGravelWFt/27;
        });
        var pcGravelAvgDepth = pcGravelDepths.length ? (pcGravelDepths.reduce(function(a,v){return a+v;},0)/pcGravelDepths.length) : null;
        h += '<tr><td>Reach length</td><td>measured</td><td>'+pcRchFt2+'</td></tr>';
        h += '<tr><td>Stream miles with improved floodplain connectivity</td><td>calc</td><td>'+(pcRchSL && pcRchSL.valueM ? (pcRchSL.valueM*0.000621371).toFixed(3)+' mi' : '—')+'</td></tr>';
        h += '<tr><td>Valley length</td><td>calc</td><td>'+pcVlFt2+'</td></tr>';
        h += '<tr><td>Sinuosity</td><td>calc</td><td>'+pcSin2+'</td></tr>';
        h += '<tr><td>Average reach slope</td><td>calc</td><td>'+pcSlope2+'</td></tr>';
        h += '<tr><td>Average channel width (at riffle)</td><td>entered</td><td>'+pcWidFt2+'</td></tr>';
        h += '<tr><td>Average bank height (at riffle)</td><td>entered</td><td>'+pcBHFt2+'</td></tr>';
        h += '<tr><td>Area of restored channel</td><td>measured</td><td>'+pcAreaAc2+'</td></tr>';
        h += '<tr><td>New floodplain area</td><td>measured</td><td>'+pcNewFpAc+'</td></tr>';
        h += '<tr><td>Primary channel excavation volume</td><td>calculated</td><td>'+pcExcav2+'</td></tr>';
        h += '<tr><td># Gravel placements</td><td>measured</td><td>'+(pcGravelPlaced2.length||'—')+'</td></tr>';
        h += '<tr><td>Length of gravel placement or channel fill</td><td>entered</td><td>'+(pcGravelTotalLenFt>0?Math.round(pcGravelTotalLenFt).toLocaleString()+' ft':'—')+'</td></tr>';
        h += '<tr><td>Average depth of gravel placement</td><td>entered</td><td>'+(pcGravelAvgDepth!==null?pcGravelAvgDepth.toFixed(1)+' ft':'—')+'</td></tr>';
        h += '<tr><td>Gravel placement volume</td><td>calc</td><td>'+(pcGravelTotalCY2>0?pcGravelTotalCY2.toFixed(1)+' CY':'—')+'</td></tr>';
        h+='</tbody></table>';
      });
      we.activePCId = savedActivePCIdForExport;
    }

    if(we.types.indexOf('fp')>=0) {
      var sl=we.sowLayers;
      function wFt2(id){var l=sl[id];return l?Math.round(l.valueM*3.28084).toLocaleString()+' ft':'—';}
      function wMi2(id){var l=sl[id];return l?(l.valueM*0.000621371).toFixed(3)+' mi':'—';}
      function wAc2(id){var l=sl[id];return l?l.acres.toFixed(2)+' acres':'—';}
      function wAvg2(ids){var v=ids.map(function(id){return sl[id]?sl[id].valueM*3.28084:null;}).filter(function(x){return x!==null;});return v.length?Math.round(v.reduce(function(a,b){return a+b;},0)/v.length)+' ft':'—';}
      function wVal2(id){var l=sl[id];return (l&&l.value!==undefined&&l.value!=='')?l.value:'—';}
      // Grading/road/berm/revetment/tailings/wetland support multiple drawn instances
      // via we.fpMulti[key]; fall back to the single legacy sowLayers id from expert mode.
      function fpMultiDisplay(key,geo,legacyId){var sum=fpMultiSum(we,key);if(sum.count>0)return geo==='polygon'?sum.acres.toFixed(2)+' acres':(sum.valueM*0.000621371).toFixed(3)+' mi';return geo==='polygon'?wAc2(legacyId):wMi2(legacyId);}
      function fpMultiVolDisplay(key,legacyVolId){var sum=fpMultiSum(we,key);if(sum.count>0)return sum.hasVol?sum.vol+' CY':'—';var v=wVal2(legacyVolId);return v!=='—'?v+' CY':'—';}
      h+='<h3>Floodplain</h3><table><thead><tr><th>Metric</th><th>Method</th><th>Value</th></tr></thead><tbody>';
      h+='<tr><td>FP large log placement area</td><td>measured</td><td>'+wAc2('fp-logs-area')+'</td></tr>';
      h+='<tr><td># Large logs placed</td><td>entered</td><td>'+wVal2('fp-large-logs')+'</td></tr>';
      ['fps','scs'].forEach(function(t){
        var tLarge=0, tSmall=0;
        we.structures[t].forEach(function(s,i){ tLarge+=+s.large||0; tSmall+=+s.small||0; h+='<tr><td>'+STRUCT_LABEL[t]+' '+(i+1)+': '+s.desc+'</td><td>entered</td><td>Large: '+(s.large||0)+', Small: '+(s.small||0)+'</td></tr>'; });
        if (we.structures[t].length) h+='<tr style="font-weight:700"><td>Total '+STRUCT_LABEL[t]+' large/small pieces</td><td>calc</td><td>Large: '+tLarge+', Small: '+tSmall+'</td></tr>';
      });
      var scWidthFt = scAvgWidthFt(we);
      h+='<tr><td>Avg floodplain width</td><td>calc</td><td>'+(scWidthFt!==null ? Math.round(scWidthFt)+' ft' : wAvg2(['fpw1','fpw2','fpw3']))+'</td></tr>';
      h+='<tr><td>Post-project FP area connected below bankfull</td><td>entered</td><td>'+(wVal2('fp-bankfull-ac')!=='—'?wVal2('fp-bankfull-ac')+' acres':'—')+'</td></tr>';
      h+='<tr><td>Post-project FP area connected below 2x bankfull</td><td>entered</td><td>'+(wVal2('fp-bankfull-2x-ac')!=='—'?wVal2('fp-bankfull-2x-ac')+' acres':'—')+'</td></tr>';
      h+='<tr><td>FP grading area</td><td>measured</td><td>'+fpMultiDisplay('grade','polygon','fp-grade')+'</td></tr>';
      h+='<tr><td>Road removed in FP</td><td>measured</td><td>'+fpMultiDisplay('road','line','fp-road')+'</td></tr>';
      h+='<tr><td>Road removal volume</td><td>entered</td><td>'+fpMultiVolDisplay('road','fp-road-vol')+'</td></tr>';
      h+='<tr><td>Berm/levee removed</td><td>measured</td><td>'+fpMultiDisplay('berm','line','fp-berm')+'</td></tr>';
      h+='<tr><td>Berm/levee removal volume</td><td>entered</td><td>'+fpMultiVolDisplay('berm','fp-berm-vol')+'</td></tr>';
      h+='<tr><td>Revetment removed</td><td>measured</td><td>'+fpMultiDisplay('revet','line','fp-revet')+'</td></tr>';
      h+='<tr><td>Revetment removal volume</td><td>entered</td><td>'+fpMultiVolDisplay('revet','fp-revet-vol')+'</td></tr>';
      h+='<tr><td>Mine tailings removed</td><td>measured</td><td>'+fpMultiDisplay('tailings','polygon','fp-tailings')+'</td></tr>';
      h+='<tr><td>Mine tailings removal volume</td><td>entered</td><td>'+fpMultiVolDisplay('tailings','fp-tailings-vol')+'</td></tr>';
      // Sum secondary channel lengths by flow type; fall back to SOW layers if no scReaches
      var scP = (we.scReaches||[]).filter(function(r){return r.flowType==='Perennial';});
      var scS = (we.scReaches||[]).filter(function(r){return r.flowType==='Seasonal';});
      var scPMi = scP.length ? (scP.reduce(function(a,r){return a+r.valueM;},0)*0.000621371).toFixed(3)+' mi' : wMi2('fp-perensc');
      var scSMi = scS.length ? (scS.reduce(function(a,r){return a+r.valueM;},0)*0.000621371).toFixed(3)+' mi' : wMi2('fp-ephsc');
      h+='<tr><td>Perennial side channel</td><td>measured</td><td>'+scPMi+'</td></tr>';
      h+='<tr><td>Seasonal side channel</td><td>measured</td><td>'+scSMi+'</td></tr>';
      h+='<tr><td>Acres of existing wetland habitat constructed/restored/enhanced</td><td>measured</td><td>'+fpMultiDisplay('fp_wetland_enhance','polygon','fp-wetland-enhance')+'</td></tr>';
      h+='</tbody></table>';
      // ── Secondary Channels ─────────────────────────────────────────────────
      if (we.scReaches && we.scReaches.length > 0) {
        h += '<h3>Secondary Channels</h3>';
        h += '<table class="sow-table"><thead><tr><th>Channel</th><th>Length</th><th>Width</th><th>Flow Type</th><th>Area (ac)</th></tr></thead><tbody>';
        var totalScAc = 0;
        we.scReaches.forEach(function(r, i) {
          var lenFt = r.valueM ? Math.round(r.valueM*3.28084).toLocaleString()+' ft' : '—';
          var widFt = r.width ? Math.round(r.width)+' ft' : '—';
          var flow  = r.flowType || '—';
          var acStr = '—';
          if (r.valueM && r.width) {
            var ac = r.valueM * (r.width/3.28084) * 0.000247105;
            acStr = ac.toFixed(3);
            totalScAc += ac;
          }
          h += '<tr><td>Channel '+(i+1)+'</td><td>'+lenFt+'</td><td>'+widFt+'</td><td>'+flow+'</td><td>'+acStr+'</td></tr>';
        });
        if (totalScAc > 0) {
          h += '<tr style="font-weight:700"><td>Total</td><td colspan="3"></td><td>'+totalScAc.toFixed(3)+' ac</td></tr>';
        }
        var scLarge = we.inputVals && we.inputVals['sc-large-wood'];
        var scSmall = we.inputVals && we.inputVals['sc-small-wood'];
        if (scLarge || scSmall) {
          h += '</tbody></table>';
          h += '<table class="sow-table" style="margin-top:8px"><thead><tr><th>Wood</th><th>Count</th></tr></thead><tbody>';
          h += '<tr><td>Large wood (≥12")</td><td>'+(scLarge||0)+'</td></tr>';
          h += '<tr><td>Small wood (&lt;12")</td><td>'+(scSmall||0)+'</td></tr>';
        }
        h += '</tbody></table>';
      }
    }

    if(we.types.indexOf('rr')>=0) {
      var sl=we.sowLayers;
      function wFt3(id){var l=sl[id];return l?Math.round(l.valueM*3.28084).toLocaleString()+' ft':'—';}
      function wMi3(id){var l=sl[id];return l?(l.valueM*0.000621371).toFixed(3)+' mi':'—';}
      function wAc3(id){var l=sl[id];return l?l.acres.toFixed(2)+' acres':'—';}
      function wVal3(id){var l=sl[id];return (l&&l.value!==undefined&&l.value!=='')?l.value:'—';}
      h+='<h3>Riparian Restoration</h3><table><thead><tr><th>Metric</th><th>Method</th><th>Value</th></tr></thead><tbody>';
      h+='<tr><td>Miles fence installed</td><td>measured</td><td>'+wMi3('rr-fence')+'</td></tr>';
      h+='<tr><td>FP protected by fence</td><td>measured</td><td>'+wAc3('rr-fence-area')+'</td></tr>';
      h+='<tr><td># Plants installed</td><td>entered</td><td>'+wVal3('rr-plants')+'</td></tr>';
      h+='<tr><td>Planted below bankfull</td><td>measured</td><td>'+wAc3('rr-plant-bf')+'</td></tr>';
      h+='<tr><td>Planted above bankfull</td><td>measured</td><td>'+wAc3('rr-plant-abf')+'</td></tr>';
      h+='<tr><td>Invasive species removed</td><td>measured</td><td>'+wAc3('rr-invasive')+'</td></tr>';
      h+='<tr><td>Bank length riparian improvement</td><td>measured</td><td>'+wMi3('rr-bank')+'</td></tr>';
      h+='<tr><td>Total riparian improvement area</td><td>measured</td><td>'+wAc3('rr-total')+'</td></tr>';
      h+='</tbody></table>';
    }
  });

  document.getElementById('sowbody').innerHTML=h;
  document.getElementById('sowmodal').show();
  // Build the preview maps after the modal's own dialog has shown and its containers
  // are laid out in the DOM — same deferred-after-injection pattern as drawCHUPie() above.
  setTimeout(function() {
    sowMapTargets.forEach(function(t) {
      buildSOWMiniMap(t.beforeMapId, t.we, 'before');
      buildSOWMiniMap(t.afterMapId, t.we, 'after');
    });
  }, 100);
}

function closeSOW(){document.getElementById('sowmodal').close();}