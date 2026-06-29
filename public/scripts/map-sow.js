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
  {id:'substrate', label:'Reach-Averaged Substrate',    geo:null,      method:'entered',  multi:0, segment:false, desc:'Prioritization substrate data layer.', inputLabel:'Dominant substrate', inputType:'select', opts:['','Silt','Sand','Gravel','Cobble','Boulders','Bedrock']}
];

var TYPE_COLORS = {pc:'#1a7abf', fp:'#7b4fbf', rr:'#2a7a5c'};
var TYPE_LABELS = {pc:'Primary Channel', fp:'Floodplain & Side Channels', rr:'Riparian Restoration'};
var PP_COLOR = {polygon:'#7b4fbf', line:'#c07820', buffer:'#1a7abf', bufferFp:'#2a7a5c'};
var SOW_COLOR = {line:'#1a7abf', polygon:'#2a7a5c', segment:'#e07b28'};
var CHU_COLOR = {riffle:'#7b4fbf', pool:'#1a7abf', glide:'#2a8a6a', run:'#c07820', unassigned:'#e07b28'};
var CHU_CYCLE = ['riffle','pool','glide','run'];
var STRUCT_COLOR = {cms:'#e07b28', mcs:'#1a7abf', css:'#c44a4a', fps:'#7b4fbf', scs:'#2a7a5c'};
var STRUCT_LABEL = {cms:'Channel Margin', mcs:'Mid Channel', css:'Channel Spanning', fps:'Floodplain', scs:'Side Channel'};

// ── State ─────────────────────────────────────────────────────────────────
var map;
var workElements = [];  // [{id, name, types[], ppData{}, sowLayers{}, structures{}, inputVals{}}]
var activeWEId = null;
var activeInnerTab = 'pp';
var ppDrawing = null, sowDrawing = null, pendingStructPoint = null;
var drawPts = [], previewPL = null, previewPG = null;
var legCollapsed = false;
var weModalEditId = null; // null = new, else id of WE being edited
var lineEditing = null; // {type:'pp'|'sow', metricId or sowId, weId}
var chuDrawing = false; // whether we're drawing a CHU split line
var chuDrawPts = [];    // pts being drawn for current split line
var chuSnapDist = 15;   // px snap distance to area_ch boundary

// ── Init ──────────────────────────────────────────────────────────────────
window.onload = function() {
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
  var activeBasemap = 'Street Map';
  overlays['NHD Streams'].addTo(map);

  // Layer control — topright
  var LayerControl = L.Control.extend({
    options: {position: 'topright'},
    onAdd: function() {
      var container = L.DomUtil.create('div', 'layer-control-container');
      container.style.position = 'relative';
      container.innerHTML =
        '<button class="zoom-we-btn" style="margin-top:0;margin-right:4px" onclick="zoomToActiveWE()">&#8982; Zoom to WE</button>' +
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
        };
        row.appendChild(radio); row.appendChild(document.createTextNode(' '+name)); panel.appendChild(row);
      });
      var h2 = document.createElement('div'); h2.className='layer-section-title'; h2.textContent='Overlays'; h2.style.marginTop='8px'; panel.appendChild(h2);
      Object.keys(overlays).forEach(function(name) {
        var row = document.createElement('label'); row.className='layer-row';
        var cb = document.createElement('input'); cb.type='checkbox';
        var slider = document.createElement('input'); slider.type='range'; slider.className='layer-opacity';
        slider.min='0'; slider.max='1'; slider.step='0.05'; slider.value=String(overlays[name].options.opacity||0.7);
        slider.style.display='none';
        if (name === 'NHD Streams') { cb.checked = true; slider.style.display='block'; }
        slider.oninput = function(){ overlays[name].setOpacity(parseFloat(slider.value)); };
        cb.onchange = function() {
          if(cb.checked){ overlays[name].addTo(map); slider.style.display='block'; } else { map.removeLayer(overlays[name]); slider.style.display='none'; }
        };
        row.appendChild(cb); row.appendChild(document.createTextNode(' '+name)); panel.appendChild(row); panel.appendChild(slider);
      });
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
  renderLegend();

  // Default to guided mode on load
  toggleWizardMode();
};

// ── WE helpers ────────────────────────────────────────────────────────────
function getWE(id) { for(var i=0;i<workElements.length;i++) if(workElements[i].id===id) return workElements[i]; return null; }
function getActiveWE() { return getWE(activeWEId); }

function newWEData() {
  return {
    id: 'we-'+Date.now(),
    name: '',
    types: [],
    ppData: {},
    sowLayers: {},
    structures: {cms:[],mcs:[],css:[],fps:[],scs:[]},
    structs: [],
    channelReaches: [], // flat ordered list for channel structures (cms/mcs/css)
    inputVals: {},
    chuUnits: []   // [{id, type:'riffle'|'pool'|null, pts:[], layer, areaM2, lengthM}]
  };
}

// ── WE modal ──────────────────────────────────────────────────────────────
function openWEModal(editId) {
  weModalEditId = editId;
  var we = editId ? getWE(editId) : null;
  document.getElementById('we-modal-title').textContent = editId ? 'Edit Work Element' : 'New Work Element';
  var nameField = document.querySelector('#we-modal esa-text-field');
  if (nameField) nameField.value = we ? we.name : '';
  ['pc','fp','rr'].forEach(function(t) {
    var sel = we ? we.types.indexOf(t)>=0 : false;
    document.getElementById('chk-'+t).checked = sel;
    document.getElementById('opt-'+t).classList.toggle('selected', sel);
  });
  document.getElementById('we-modal-err').style.display = 'none';
  document.getElementById('we-modal').style.display = 'flex';
  setTimeout(function(){if (nameField) nameField.focus();}, 50);
}

function closeWEModal() {
  document.getElementById('we-modal').style.display = 'none';
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
  PP_DEFS.forEach(function(m){ var d=we.ppData[m.id];if(!d)return; eb(d.layer); eb(d.bufferLayer); });
  Object.keys(we.sowLayers||{}).forEach(function(k){ if(we.sowLayers[k]&&we.sowLayers[k].layer) eb(we.sowLayers[k].layer); });
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
    var d = w.ppData[m.id]; if (!d) return;
    if (d.layer) expandBounds(d.layer);
    if (d.bufferLayer) expandBounds(d.bufferLayer);
    if (d.lines) d.lines.forEach(function(l){
      if (!l) return;
      if (l.layer) expandBounds(l.layer);
      else if (l.pts && l.pts.length) { try { var lb = L.polyline(l.pts).getBounds(); if(lb&&lb.isValid()) bounds = bounds ? bounds.extend(lb) : lb; } catch(e){} }
    });
  });
  Object.keys(w.sowLayers||{}).forEach(function(k){ if(w.sowLayers[k]&&w.sowLayers[k].layer) expandBounds(w.sowLayers[k].layer); });

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
  w._labelMarker = L.marker(pos, {icon:icon, interactive:false, zIndexOffset:200}).addTo(map);
}

function allWELayers(we) {
  var out = [];
  Object.keys(we.sowLayers).forEach(function(k){ if(we.sowLayers[k]&&we.sowLayers[k].layer) out.push(we.sowLayers[k].layer); });
  PP_DEFS.forEach(function(m){ var d=we.ppData[m.id]; if(!d)return; if(d.layer)out.push(d.layer); if(d.bufferLayer)out.push(d.bufferLayer); if(d.labelMarker)out.push(d.labelMarker); if(d.lines)d.lines.forEach(function(l){if(l&&l.layer)out.push(l.layer);}); });
  Object.keys(we.structures).forEach(function(t){ we.structures[t].forEach(function(s){if(s.marker)out.push(s.marker);}); });
  if (we.chuUnits) we.chuUnits.forEach(function(u){ if(u.layer)out.push(u.layer); if(u.labelMarker)out.push(u.labelMarker); });
  return out;
}

// ── Inner tab ─────────────────────────────────────────────────────────────
function showInnerTab(t) {
  activeInnerTab = t;
  var ppTab  = document.getElementById('itab-pp');
  var wkTab  = document.getElementById('itab-work');
  ppTab.classList.toggle('active', t==='pp');
  wkTab.classList.toggle('active', t==='work');
  ppTab.setAttribute('aria-selected', t==='pp' ? 'true' : 'false');
  wkTab.setAttribute('aria-selected', t==='work' ? 'true' : 'false');
  ppTab.setAttribute('tabindex', t==='pp' ? '0' : '-1');
  wkTab.setAttribute('tabindex', t==='work' ? '0' : '-1');
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
    var d = we.ppData[m.id]; if (!d) return;
    var keepVisible = (m.id === 'area_ch') && (we.id === activeWEId);
    // Perimeter shows dotted outline at rest, fill only on hover
    var opacity     = (show || keepVisible) ? 1 : 0;
    var fillOpacity = (m.id==='perimeter') ? 0 : show ? 0.18 : keepVisible ? 0.1 : 0;
    function applyLayer(l) {
      if (!l) return;
      if (l.setStyle) l.setStyle({opacity: opacity, fillOpacity: fillOpacity});
      else if (l.setOpacity) l.setOpacity(opacity);
    }
    if (d.layer) applyLayer(d.layer);
    if (d.bufferLayer) applyLayer(d.bufferLayer);
    if (d.lines) d.lines.forEach(function(ln){ if(ln&&ln.layer) applyLayer(ln.layer); });
    // reach direction arrows
    if (m.id==='reach_len' && d._arrowMarkers) d._arrowMarkers.forEach(function(a){ if(a) a.setOpacity(opacity); });
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
    check: function(we){ return !!(we.chuUnits&&we.chuUnits.length>1); },
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
  var d = we.ppData[m.id] || {};
  var isDrawing = ppDrawing && ppDrawing.metricId===m.id && ppDrawing.weId===activeWEId;
  var isDone = pmIsDone(we, m);
  row.className = 'pm-row'+(isDrawing?' active-draw':isDone?' complete':'');
  var h = '<div class="pm-head"><span class="pm-label">'+m.label+'</span></div><div class="pm-desc">'+m.desc+'</div>';
  if (m.method==='entered') {
    var val = d.value||'';
    if (m.inputType==='select') {
      h+='<select class="pm-input" onchange="ppSetVal(\''+m.id+'\',this.value)">'+(m.opts||[]).map(function(o){return '<option'+(o===val?' selected':'')+'>'+o+'</option>';}).join('')+'</select>';
    } else {
      h+='<input type="'+m.inputType+'" class="pm-input" value="'+(val||'')+'" placeholder="Enter value..." onchange="ppSetVal(\''+m.id+'\',this.value)"/>';
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
  var d=we.ppData[m.id]||{};
  if(m.method==='entered'){
    // select fields always have a valid value — check if user has interacted or if it's a select type
    if(m.inputType==='select') return !!d.value;
    return !!d.value;
  }
  if(m.method==='calc')return ppCalc(we,m.id)!==null;
  if(m.method==='auto'){var da=we.ppData[m.id]||{};return !!(da.valueM&&da.layer);}
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
  if (wizardMode) wizardRefreshIfActive();
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
  if (we.chuUnits && we.chuUnits.length) {
    we.chuUnits.forEach(function(u){
      if(u.layer) map.removeLayer(u.layer);
      if(u.labelMarker) map.removeLayer(u.labelMarker);
    });
    we.chuUnits = [];
    we._chuUndo = null;
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
  var hasCHU = we.chuUnits && we.chuUnits.length > 0;
  var hasFpSplit = we.ppData['area_fp'] && we.ppData['area_fp'].fpSplit;
  if (!hasCHU && !hasFpSplit) return true;
  var msg = 'Changing the reach line will clear:\n';
  if (hasCHU) msg += '  • Channel Habitat Unit splits (' + we.chuUnits.length + ' units)\n';
  if (hasFpSplit) msg += '  • Left/Right Floodplain split\n';
  msg += '\nContinue?';
  if (confirm(msg)) { clearReachDependents(we); return true; }
  return false;
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
// Returns original pts unchanged when no perimeter is drawn yet.
function clipPtsToPerimeter(we, pts, geo) {
  var perimD = we && we.ppData['perimeter'];
  if (!perimD || !perimD.layer) return pts;
  var perimLLs = perimD.layer.getLatLngs();
  if (perimLLs.length && Array.isArray(perimLLs[0])) perimLLs = perimLLs[0];
  if (!perimLLs || perimLLs.length < 3) return pts;

  if (geo === 'polygon') {
    var cp = clipRingToPerimeter(pts, perimLLs);
    return (cp && cp.length >= 3) ? cp : pts;
  } else {
    var cl = clipLineToPolygon(pts, perimLLs);
    return (cl && cl.length >= 2) ? cl : pts;
  }
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
  // Clip buffer to project perimeter using Sutherland-Hodgman polygon intersection.
  var perimD2 = we.ppData['perimeter'];
  if (perimD2 && perimD2.layer) {
    var perimPts2 = perimD2.layer.getLatLngs();
    if (perimPts2.length && Array.isArray(perimPts2[0])) perimPts2 = perimPts2[0];
    var clipped = clipPolygonToPolygon(ring, perimPts2);
    if (clipped && clipped.length >= 3) ring = clipped;
  }
  d.bufferLayer = L.polygon(ring, {
    color: PP_COLOR.buffer, fillColor: PP_COLOR.buffer,
    fillOpacity: 0.15, weight: 2, dashArray: '6,4', interactive: false
  }).bindTooltip('Area of Channel (estimated)').addTo(map);
  d.valueM = geoAreaM2(ring);
  // re-render the row if visible
  var m = PP_DEFS.filter(function(x){return x.id==='area_ch';})[0];
  renderPMRow(m); updatePPProgress();
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
  d.layer = L.polygon(poly, {color:col, fillColor:col, fillOpacity:0.18, weight:2, interactive:false})
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
    d.layer = L.polygon(pts, {color:col, fillColor:col, fillOpacity:0.22, weight:2, interactive:false})
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
  document.getElementById('pp-badge').textContent=done+'/'+total;
  document.getElementById('pp-badge').className='badge'+(pct===100?'':' warn');
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
  Promise.all(promises).then(function(elevs) {
    var valid = elevs.filter(function(e){ return e !== null && !isNaN(e) && e > -100; });
    if (valid.length < 2) { we.ppData['avg_slope']._elevLoading = false; we.ppData['avg_slope']._elevError = 'No elevation data returned — outside USGS coverage?'; renderPMRow(m); return; }
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
        reachD2.layer = L.polyline(rPts, {color:'#c07820', weight:2.5, interactive:false}).addTo(map);
        elevs = elevs.slice().reverse();
        var tmp = upstreamElev; upstreamElev = downstreamElev; downstreamElev = tmp;
        setMapHint('Reach direction reversed to flow downstream ↓');
        setTimeout(function(){setMapHint('');}, 3000);
        // Rebuild buffers with corrected direction
        updateAreaChBuffer(we); updateAreaFpBuffer(we);
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
  var col=PP_COLOR[m.geo]||'#c07820';
  if(m.id==='fp_left') col='#2a7a5c';
  if(m.id==='fp_right') col='#5c2a7a';
  if(!we.ppData[m.id])we.ppData[m.id]={};
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
    we.ppData[m.id].layer=L.polyline(pts,{color:col,weight:2,dashArray:'4,3',interactive:false}).bindTooltip(m.label).addTo(map);
    we.ppData[m.id].valueM=geoLen(pts);
  } else {
    if(we.ppData[m.id].layer)map.removeLayer(we.ppData[m.id].layer);
    var polyStyle = m.id==='perimeter'
      ? {color:col, fillOpacity:0, weight:2, dashArray:'8 5', interactive:false}
      : {color:col, fillColor:col, fillOpacity:.18, weight:2, interactive:false};
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
  if(m.id==='perimeter') reClipReachToPerimeter(getWE(we.id));
  if(m.id==='reach_len') {
    updateWELabel(getWE(we.id), true);
    setTimeout(function(){ fetchElevationProfile(getWE(we.id)); }, 300);
  }
}

// ── Reach direction arrow ─────────────────────────────────────────────────
function addReachArrow(we) {
  var rd = we && we.ppData['reach_len'];
  // Remove existing arrow markers
  if(rd && rd._arrowMarkers) { rd._arrowMarkers.forEach(function(m){ if(m) map.removeLayer(m); }); rd._arrowMarkers = null; }
  if(rd && rd._arrowMarker){ map.removeLayer(rd._arrowMarker); rd._arrowMarker = null; }
  if(!rd || !rd.layer) return;
  var pts = rd.layer.getLatLngs();
  if(pts.length && Array.isArray(pts[0])) pts = pts[0];
  if(!pts || pts.length < 2) return;

  // Build cumulative arc-length table
  var cumLen = [0];
  for (var i = 1; i < pts.length; i++) {
    var dlat = pts[i].lat - pts[i-1].lat, dlng = pts[i].lng - pts[i-1].lng;
    cumLen.push(cumLen[i-1] + Math.sqrt(dlat*dlat + dlng*dlng));
  }
  var total = cumLen[cumLen.length - 1];

  function makeArrowAtFraction(frac) {
    var target = total * frac;
    // Find the segment containing this distance
    var seg = 0;
    for (var k = 1; k < cumLen.length; k++) {
      if (cumLen[k] >= target) { seg = k - 1; break; }
    }
    var segLen = cumLen[seg+1] - cumLen[seg];
    var t = segLen > 0 ? (target - cumLen[seg]) / segLen : 0;
    var pos = L.latLng(
      pts[seg].lat + t * (pts[seg+1].lat - pts[seg].lat),
      pts[seg].lng + t * (pts[seg+1].lng - pts[seg].lng)
    );
    // Bearing from segment direction
    var p1 = pts[seg], p2 = pts[seg+1];
    var lat1 = p1.lat * Math.PI/180, lat2 = p2.lat * Math.PI/180;
    var dLng = (p2.lng - p1.lng) * Math.PI/180;
    var y = Math.sin(dLng) * Math.cos(lat2);
    var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLng);
    var brg = Math.atan2(y, x) * 180 / Math.PI;
    var html = '<div style="transform:rotate('+brg+'deg);width:22px;height:22px;display:flex;align-items:center;justify-content:center;margin-left:-11px;margin-top:-11px">' +
      '<svg width="18" height="18" viewBox="0 0 18 18"><polygon points="9,0 17,18 9,12 1,18" fill="#c07820" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg></div>';
    var icon = L.divIcon({ className: '', html: html, iconSize: [0, 0], iconAnchor: [0, 0] });
    return L.marker([pos.lat, pos.lng], { icon: icon, interactive: false }).addTo(map);
  }

  // Place arrows at 25%, 50%, 75% of total arc length
  var markers = [
    makeArrowAtFraction(0.25),
    makeArrowAtFraction(0.5),
    makeArrowAtFraction(0.75)
  ];
  rd._arrowMarkers = markers;
  rd._arrowMarker = markers[1]; // keep reference to middle arrow for legacy code
}

function clearPPGeom(id) {
  var we=getActiveWE();if(!we)return;var d=we.ppData[id];if(!d)return;
  if(id==='reach_len' && d.layer && !confirmReachChange(we)) return;
  if(d.layer){map.removeLayer(d.layer);d.layer=null;d.valueM=0;}
  if(id==='reach_len' && d._arrowMarkers){ d._arrowMarkers.forEach(function(m){ if(m) map.removeLayer(m); }); d._arrowMarkers=null; d._arrowMarker=null; }
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
  var we=getActiveWE();if(!we)return[];var d=we.ppData[id];if(!d)return[];
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
  if (we.chuUnits && we.chuUnits.length) renderCHUUnits(we);
  updateSOWCalcs();
  restoreFInputValues(we2);
  renderChannelReaches();
  // Restore elevation profile chart if already fetched
  var we2 = getActiveWE();
  if (we2 && we2.sowElev && we2.sowElev._profile) {
    setTimeout(function(){ updateSOWSlopePanel(we2); }, 50);
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
  return '<div class="f-row"><label>'+label+'</label><input type="number" id="f-'+id+'" placeholder="0" oninput="onFInputChange(\''+id+'\',this.value)"/></div>';
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
  if(lineEditing){cancelLineEdit();}
  if(we.sowLayers[id]&&we.sowLayers[id].layer)map.removeLayer(we.sowLayers[id].layer);
  sowDrawing={id:id,geo:geo,label:label,weId:activeWEId};
  ppDrawing=null;pendingStructPoint=null;drawPts=[];clearPreview();
  document.getElementById('mapwrap').classList.add('drawing');
  document.querySelectorAll('.draw-btn').forEach(function(b){b.classList.remove('active');});
  var btn=document.getElementById('dbtn-'+id);if(btn)btn.classList.add('active');
  var msg=geo==='polygon'?'Click vertices — double-click to close':geo==='segment'?'Click start then end point':'Click vertices — double-click to finish';
  setMapHint(msg);
}

function finishSOWDraw() {
  if(!sowDrawing)return;
  var we=getWE(sowDrawing.weId);if(!we)return;
  var d=sowDrawing,col=SOW_COLOR[d.geo]||'#1a3a5c';
  var pts=drawPts.slice();drawPts=[];clearPreview();
  var NO_CLIP_SOW = {pcw1:1,pcw2:1,pcw3:1};
  if(!NO_CLIP_SOW[d.id]) pts=clipPtsToPerimeter(we,pts,d.geo);
  var layer,valueM=0,acres=0;
  var NO_DISPLAY_IDS = {pcw1:1,pcw2:1,pcw3:1};
  if(d.geo==='segment'||d.geo==='line'){
    if(NO_DISPLAY_IDS[d.id]){
      layer=null; // store geometry but don't add to map
    } else {
      layer=L.polyline(pts,{color:col,weight:2.5,interactive:false}).bindTooltip(d.label).addTo(map);
    }
    valueM=geoLen(pts);
  }
  else{layer=L.polygon(pts,{color:col,fillColor:col,fillOpacity:.2,weight:2,interactive:false}).bindTooltip(d.label).addTo(map);acres=geoArea(pts);valueM=geoAreaM2(pts);}
  we.sowLayers[d.id]={layer:layer,valueM:valueM,acres:acres,geo:d.geo,label:d.label,_pts:NO_DISPLAY_IDS[d.id]?pts:null};
  var el=document.getElementById('dr-'+d.id);
  if(el){
    var val=d.geo==='polygon'?acres.toFixed(2)+' acres':Math.round(valueM*3.28084).toLocaleString()+' ft';
    var editLink=(d.geo==='line'||d.geo==='segment')?'<span class="drawn-redo" onclick="startLineEdit(\'sow\',\''+d.id+'\')">edit</span> ':'';
    el.innerHTML='<span class="drawn-result">&#10003; '+val+'</span> '+editLink+'<span class="drawn-redo" onclick="startSOWDraw(\''+d.id+'\',\''+d.geo+'\',\''+d.label+'\')">redo</span>';
  }
  var btn=document.getElementById('dbtn-'+d.id);if(btn)btn.classList.remove('active');
  sowDrawing=null;document.getElementById('mapwrap').classList.remove('drawing');setMapHint('');
  updateSOWCalcs();renderLegend();
  if(d.id==='pc-reach') setTimeout(function(){ fetchSOWElevationProfile(getWE(d.weId)); }, 300);
}

function updateSOWCalcs() {
  var we=getActiveWE();if(!we)return;
  var avgW=avgWidths(we,['pcw1','pcw2','pcw3']);
  var cw=document.getElementById('calc-pc-width');if(cw)cw.textContent=avgW?Math.round(avgW)+' ft':'—';
  var pcwAvg=document.getElementById('pcw-avg');
  if(pcwAvg)pcwAvg.textContent=avgW?'Avg: '+Math.round(avgW)+' ft':'';
  // Valley length = straight-line distance between pc-reach endpoints
  var rl = we.sowLayers['pc-reach'] ? we.sowLayers['pc-reach'].valueM : 0;
  var vlM = 0;
  var reachLayer = we.sowLayers['pc-reach'] && we.sowLayers['pc-reach'].layer;
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
    var sl = we.sowLayers['pc-area'];
    var reachSL = we.sowLayers['pc-reach'];
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
      if (sl && sl._auto && sl.layer) { map.removeLayer(sl.layer); we.sowLayers['pc-area'] = null; sl = null; }
      // Auto-generate buffer
      var reachPts = reachSL.layer.getLatLngs();
      if (reachPts.length && Array.isArray(reachPts[0])) reachPts = reachPts[0];
      var halfW = (avgW / 3.28084) / 2;
      var ring = buildBufferPoly(reachPts, halfW);
      if (ring) {
        // Remove old auto layer if exists
        if (we._pcAreaAutoLayer) { map.removeLayer(we._pcAreaAutoLayer); }
        var bufLayer = L.polygon(ring, {
          color: '#1a7abf', fillColor: '#1a7abf', fillOpacity: 0.15,
          weight: 2, dashArray: '6,4', interactive: false
        }).bindTooltip('Area of Restored Channel (estimated)').addTo(map);
        we._pcAreaAutoLayer = bufLayer;
        var areaM2 = geoAreaM2(ring);
        var acresAuto = (areaM2 * 0.000247105).toFixed(3);
        we.sowLayers['pc-area'] = {layer: bufLayer, valueM: areaM2 * 0.000247105, acres: parseFloat(acresAuto), geo: 'polygon', label: 'Area of Restored Channel', _auto: true};
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

  // ── Channel excavation volume ─────────────────────────────────────────────
  var reachFt = we.sowLayers['pc-reach'] ? we.sowLayers['pc-reach'].valueM * 3.28084 : 0;
  var widthFt = avgW || 0; // avg channel width from pcw1/2/3
  var bankHtSL = we.sowLayers['pc-bankht'];
  var bankHtFt = bankHtSL && bankHtSL.value ? parseFloat(bankHtSL.value) : 0;
  var excavCY = (reachFt && widthFt && bankHtFt) ? Math.round(reachFt * widthFt * bankHtFt / 27) : null;
  var ce = document.getElementById('calc-pc-excav');
  if (ce) ce.textContent = excavCY !== null ? excavCY.toLocaleString() + ' CY' : (reachFt && widthFt ? 'Enter bank height to calculate' : '—');
  // Store for SOW export
  if (!we.sowLayers['pc-excav']) we.sowLayers['pc-excav'] = {};
  we.sowLayers['pc-excav'].value = excavCY;
  var cl=document.getElementById('calc-large-logs');var cs2=document.getElementById('calc-small-logs');
  if(cl||cs2)updateLogTotals();
}

function startPolyEditSOW(id) {
  var we = getActiveWE(); if (!we) return;
  var sl = we.sowLayers[id]; if (!sl || !sl.layer) return;
  startLineEdit('sow', id);
}

function avgWidths(we,ids) {
  var vals=ids.map(function(id){return we.sowLayers[id]?we.sowLayers[id].valueM*3.28084:null;}).filter(function(v){return v!==null;});
  return vals.length?vals.reduce(function(a,b){return a+b;},0)/vals.length:null;
}

// ── SOW highlight/zoom ────────────────────────────────────────────────────
function highlightSOW(id) {
  var we=getActiveWE();if(!we)return;
  Object.keys(we.sowLayers).forEach(function(k){var l=we.sowLayers[k];if(!l||!l.layer||!l.layer.setStyle)return;var active=k===id;if(l.geo==='polygon')l.layer.setStyle({weight:active?3:1,fillOpacity:active?.4:.2,opacity:active?1:.3});else l.layer.setStyle({weight:active?4:1.5,opacity:active?1:.3});});
}
function unhighlightSOW() {
  var we=getActiveWE();if(!we)return;
  Object.keys(we.sowLayers).forEach(function(k){var l=we.sowLayers[k];if(!l||!l.layer||!l.layer.setStyle)return;if(l.geo==='polygon')l.layer.setStyle({weight:2,fillOpacity:.2,opacity:1});else l.layer.setStyle({weight:2.5,opacity:1});});
}
function zoomToSOW(id) {
  var we=getActiveWE();if(!we)return;var l=we.sowLayers[id];if(!l||!l.layer)return;
  try{var b=l.layer.getBounds?l.layer.getBounds():null;if(b&&b.isValid())map.fitBounds(b,{padding:[50,50]});}catch(e){}
}

// ── Structures ────────────────────────────────────────────────────────────
function globalStructNum(we, type, id) {
  if (!we.structs) return 1;
  for (var i = 0; i < we.structs.length; i++) {
    if (we.structs[i].id === id) return i + 1;
  }
  return 1;
}

function addStructure(type, label) {
  var we = getActiveWE(); if (!we) return;
  // Primary channel structures use the flat we.structs path
  if (!we.structs) we.structs = [];
  var structType = type || 'cms';
  var s = {id:'s-'+Date.now(), structType:structType, desc:'', large:0, small:0, latlng:null, marker:null};
  we.structs.push(s);
  we.structures[structType].push(s);
  renderAllStructures();
}

function addFPStructure() {
  var we = getActiveWE(); if (!we) return;
  var s = {id:'s-'+Date.now(), structType:'fps', desc:'', large:0, small:0, latlng:null, marker:null};
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
    var typeSelect = '<select class="struct-type-sel" onchange="changeFPStructType(\''+s.id+'\',this.value)">'
      + '<option value="fps"'+(type==='fps'?' selected':'')+'>Floodplain Structure</option>'
      + '<option value="scs"'+(type==='scs'?' selected':'')+'>Side Channel Structure</option>'
      + '</select>';
    var div = document.createElement('div');
    div.className = 'multi-entry';
    div.innerHTML = '<div class="multi-entry-head">Structure '+(i+1)
      + '<span style="display:flex;gap:6px;align-items:center">'
      + '<span class="multi-entry-clone" title="Clone" onclick="cloneFPStructure(\''+s.id+'\')">&#10064;</span>'
      + '<span class="multi-entry-del" onclick="delFPStructure(\''+s.id+'\')">&#10005;</span>'
      + '</span></div>'
      + '<div class="f-row"><label>Structure type</label>'+typeSelect+'</div>'
      + '<div class="f-row"><label>Location</label>'+locHTML+'</div>'
      + '<div class="f-row"><label>Description</label><input type="text" value="'+s.desc+'" placeholder="e.g. Engineered log jam" oninput="updateFPStructure(\''+s.id+'\',\'desc\',this.value)"/></div>'
      + '<div class="f-row"><label># Large pieces (&gt;12&quot; dia)</label><input type="number" value="'+s.large+'" placeholder="0" oninput="updateFPStructure(\''+s.id+'\',\'large\',+this.value)"/></div>'
      + '<div class="f-row"><label># Small pieces (&lt;12&quot; dia)</label><input type="number" value="'+s.small+'" placeholder="0" oninput="updateFPStructure(\''+s.id+'\',\'small\',+this.value)"/></div>';
    el.appendChild(div);
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
  s.structType = newType;
  we.structures[newType].push(s);
  // fpStructs keeps the same object reference — just update structType on s (already done)
  if (s.marker) {
    s.marker.setStyle({color: STRUCT_COLOR[newType]||'#2a7a5c', fillColor: STRUCT_COLOR[newType]||'#2a7a5c'});
  }
  renderFPStructures();
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
  if (!we.structs) we.structs = [];
  el.innerHTML = '';
  we.structs.forEach(function(s, i) {
    var type = s.structType || 'cms';
    var col = STRUCT_COLOR[type];
    var isWaiting = pendingStructPoint && pendingStructPoint.id === s.id;
    var locHTML = s.latlng
      ? '<span class="drawn-result">&#10003; '+s.latlng.lat.toFixed(4)+', '+s.latlng.lng.toFixed(4)+'</span><span class="drawn-redo" onclick="replaceStructPoint(\''+type+'\',\''+s.id+'\')">redo</span>'
      : '<button class="draw-btn'+(isWaiting?' active':'')+'" style="background:'+(isWaiting?'#c07820':col)+';margin-bottom:0" onclick="startStructPoint(\''+type+'\',\''+s.id+'\')">&#9679; Place on map</button>';
    var typeSelect = '<select class="struct-type-sel" onchange="changeStructType(null,\''+s.id+'\',this.value)">'
      + '<option value="cms"'+(type==='cms'?' selected':'')+'>Channel Margin</option>'
      + '<option value="mcs"'+(type==='mcs'?' selected':'')+'>Mid Channel</option>'
      + '<option value="css"'+(type==='css'?' selected':'')+'>Channel Spanning</option>'
      + '</select>';
    var div = document.createElement('div');
    div.className = 'multi-entry';
    div.innerHTML = '<div class="multi-entry-head">Structure '+(i+1)
      + '<span style="display:flex;gap:6px;align-items:center">'
      + '<span class="multi-entry-clone" title="Clone" onclick="cloneStructure(\''+type+'\',\''+s.id+'\')">&#10064;</span>'
      + '<span class="multi-entry-del" onclick="delStructFlat(\''+s.id+'\')">&#10005;</span>'
      + '</span></div>'
      + '<div class="f-row"><label>Structure type</label>'+typeSelect+'</div>'
      + '<div class="f-row"><label>Location</label>'+locHTML+'</div>'
      + '<div class="f-row"><label>Description</label><input type="text" value="'+s.desc+'" placeholder="e.g. Single-key LWD jam" oninput="updateStructFlat(\''+s.id+'\',\'desc\',this.value)"/></div>'
      + '<div class="f-row"><label># Large pieces (&gt;12&quot; dia)</label><input type="number" value="'+s.large+'" placeholder="0" oninput="updateStructFlat(\''+s.id+'\',\'large\',+this.value)"/></div>'
      + '<div class="f-row"><label># Small pieces (&lt;12&quot; dia)</label><input type="number" value="'+s.small+'" placeholder="0" oninput="updateStructFlat(\''+s.id+'\',\'small\',+this.value)"/></div>';
    el.appendChild(div);
  });
  updateLogTotals();
}

function updateStructFlat(id, field, val) {
  var we = getActiveWE(); if (!we || !we.structs) return;
  var s = we.structs.filter(function(x){return x.id===id;})[0]; if (!s) return;
  s[field] = val;
  if (field === 'desc' && s.marker) {
    var num = we.structs.indexOf(s) + 1;
    s.marker.setTooltipContent(STRUCT_LABEL[s.structType||'cms']+' '+num+(val?' – '+val:''));
  }
  updateLogTotals();
}

function delStructFlat(id) {
  var we = getActiveWE(); if (!we || !we.structs) return;
  var s = we.structs.filter(function(x){return x.id===id;})[0]; if (!s) return;
  if (s.marker) map.removeLayer(s.marker);
  we.structs = we.structs.filter(function(x){return x.id!==id;});
  // sync legacy arrays
  ['cms','mcs','css'].forEach(function(t){
    we.structures[t] = we.structures[t].filter(function(x){return x.id!==id;});
  });
  renderAllStructures();
}

function changeStructType(oldType, id, newType) {
  var we = getActiveWE(); if (!we) return;
  // Find in flat array
  var s = we.structs && we.structs.filter(function(x){return x.id===id;})[0];
  if (!s) {
    // fallback: find in typed array
    if (oldType) s = we.structures[oldType].filter(function(x){return x.id===id;})[0];
  }
  if (!s) return;
  var prevType = s.structType || oldType || 'cms';
  // Update marker color
  if (s.marker) {
    var col = STRUCT_COLOR[newType];
    var num = we.structs ? we.structs.indexOf(s) + 1 : 1;
    var icon = L.divIcon({className:'',iconSize:[20,20],iconAnchor:[10,10],
      html:'<div style="width:20px;height:20px;border-radius:50%;background:'+col+';border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;">'+num+'</div>'});
    s.marker.setIcon(icon);
    s.marker.setTooltipContent(STRUCT_LABEL[newType]+' '+num+(s.desc?' – '+s.desc:''));
  }
  s.structType = newType;
  // Sync legacy arrays
  we.structures[prevType] = (we.structures[prevType]||[]).filter(function(x){return x.id!==id;});
  if (!we.structures[newType]) we.structures[newType] = [];
  if (!we.structures[newType].some(function(x){return x.id===id;})) we.structures[newType].push(s);
  renderAllStructures();
  updateLogTotals();
}

function renderStructures(type) {
  var el=document.getElementById(type+'-list');if(!el)return;
  var we=getActiveWE();if(!we)return;
  el.innerHTML='';
  var col=STRUCT_COLOR[type];

  // Count total structures across all types for sequential numbering
  var allStructs = [];
  ['cms','mcs','css'].forEach(function(t){
    we.structures[t].forEach(function(s){ allStructs.push({type:t, s:s}); });
  });

  we.structures[type].forEach(function(s, i){
    var globalNum = allStructs.findIndex ? allStructs.findIndex(function(x){return x.s.id===s.id;}) + 1 : i + 1;
    if (globalNum === 0) globalNum = i + 1; // fallback
    var div=document.createElement('div');div.className='multi-entry';
    var isWaiting=pendingStructPoint&&pendingStructPoint.type===type&&pendingStructPoint.id===s.id;
    var locHTML=s.latlng?'<span class="drawn-result">&#10003; '+s.latlng.lat.toFixed(4)+', '+s.latlng.lng.toFixed(4)+'</span><span class="drawn-redo" onclick="replaceStructPoint(\''+type+'\',\''+s.id+'\')">redo</span>':'<button class="draw-btn'+(isWaiting?' active':'')+'" style="background:'+(isWaiting?'#c07820':col)+';margin-bottom:0" onclick="startStructPoint(\''+type+'\',\''+s.id+'\')">&#9679; Place on map</button>';
    var typeSelect = '<select class="struct-type-sel" onchange="changeStructType(\''+type+'\',\''+s.id+'\',this.value)">' +
      '<option value="cms"'+(type==='cms'?' selected':'')+'>Channel Margin</option>' +
      '<option value="mcs"'+(type==='mcs'?' selected':'')+'>Mid Channel</option>' +
      '<option value="css"'+(type==='css'?' selected':'')+'>Channel Spanning</option>' +
      '</select>';
    div.innerHTML='<div class="multi-entry-head">Structure '+globalNum+'<span style="display:flex;gap:6px;align-items:center"><span class="multi-entry-clone" title="Clone" onclick="cloneStructure(\''+type+'\',\''+s.id+'\')">&#10064;</span><span class="multi-entry-del" onclick="delStructure(\''+type+'\',\''+s.id+'\')">&#10005;</span></span></div>'+
      '<div class="f-row"><label>Structure type</label>'+typeSelect+'</div>'+
      '<div class="f-row"><label>Location</label>'+locHTML+'</div>'+
      '<div class="f-row"><label>Description</label><input type="text" value="'+s.desc+'" placeholder="e.g. Single-key LWD jam" oninput="updateStructure(\''+type+'\',\''+s.id+'\',\'desc\',this.value)"/></div>'+
      '<div class="f-row"><label># Large pieces (&gt;12&quot; dia)</label><input type="number" value="'+s.large+'" placeholder="0" oninput="updateStructure(\''+type+'\',\''+s.id+'\',\'large\',+this.value)"/></div>'+
      '<div class="f-row"><label># Small pieces (&lt;12&quot; dia)</label><input type="number" value="'+s.small+'" placeholder="0" oninput="updateStructure(\''+type+'\',\''+s.id+'\',\'small\',+this.value)"/></div>';
    el.appendChild(div);
  });
  updateLogTotals();
}

function updateStructure(type,id,field,val) {
  var we=getActiveWE();if(!we)return;
  var s=(we.structs&&we.structs.filter(function(x){return x.id===id;})[0])||we.structures[type].filter(function(x){return x.id===id;})[0];if(!s)return;
  s[field]=val;
  if(field==='desc'&&s.marker){
    var t2=s.structType||type;
    var num2=(we.structs&&we.structs.indexOf(s)>=0)?we.structs.indexOf(s)+1:globalStructNum(we,t2,id);
    s.marker.setTooltipContent(STRUCT_LABEL[t2]+' '+num2+(val?' – '+val:''));
  }
  updateLogTotals();
}

function cloneStructure(type,id) {
  var we=getActiveWE();if(!we)return;
  var s=(we.structs&&we.structs.filter(function(x){return x.id===id;})[0])||we.structures[type].filter(function(x){return x.id===id;})[0];if(!s)return;
  var clone={id:'s-'+Date.now(),structType:s.structType||type,desc:s.desc,large:s.large,small:s.small,latlng:null,marker:null};
  if (!we.structs) we.structs = [];
  we.structs.push(clone);
  we.structures[clone.structType||type].push(clone);
  renderAllStructures();
  startStructPoint(clone.structType||type,clone.id);
}

function delStructure(type,id) {
  var we=getActiveWE();if(!we)return;
  var s=(we.structs&&we.structs.filter(function(x){return x.id===id;})[0])||we.structures[type].filter(function(x){return x.id===id;})[0];
  if(s&&s.marker)map.removeLayer(s.marker);
  if(we.structs)we.structs=we.structs.filter(function(x){return x.id!==id;});
  ['cms','mcs','css'].forEach(function(t){we.structures[t]=we.structures[t].filter(function(x){return x.id!==id;});});
  if(pendingStructPoint&&pendingStructPoint.id===id){pendingStructPoint=null;document.getElementById('mapwrap').classList.remove('drawing');setMapHint('');}
  renderAllStructures();
}

function updateLogTotals() {
  var we=getActiveWE();if(!we)return;var tL=0,tS=0;
  ['cms','mcs','css','fps','scs'].forEach(function(t){we.structures[t].forEach(function(s){tL+=+s.large||0;tS+=+s.small||0;});});
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
  var we=getActiveWE();if(!we)return;var s=we.structures[type].filter(function(x){return x.id===id;})[0];if(!s)return;
  if(s.marker){map.removeLayer(s.marker);s.marker=null;}s.latlng=null;startStructPoint(type,id);
}
function placeStructPoint(latlng) {
  if(!pendingStructPoint)return;
  var we=getWE(pendingStructPoint.weId);if(!we)return;
  var type=pendingStructPoint.type,id=pendingStructPoint.id;
  var s = (we.structs && we.structs.filter(function(x){return x.id===id;})[0])
       || we.structures[type].filter(function(x){return x.id===id;})[0];
  if(!s){pendingStructPoint=null;return;}
  if(s.marker)map.removeLayer(s.marker);
  var col=STRUCT_COLOR[type];
  var num;
  if ((type==='fps'||type==='scs') && we.fpStructs) {
    num = we.fpStructs.indexOf(s) + 1;
    if (num <= 0) num = we.structures[type].indexOf(s) + 1;
  } else {
    num = (we.structs && we.structs.indexOf(s) >= 0) ? we.structs.indexOf(s) + 1 : globalStructNum(we,type,id);
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
  var d = we.ppData[id]; if (!d) return;
  var col = id === 'area_fp' ? PP_COLOR.bufferFp : PP_COLOR.polygon;
  var m = PP_DEFS.filter(function(x){return x.id===id;})[0];
  var tipLabel = m ? m.label : id;

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
  document.getElementById('edit-done-bar').style.display = 'flex'; document.getElementById('mapwrap').classList.add('editing');
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
    var d2 = we.sowLayers[id]; if (!d2 || !d2.layer) return;
    layer = d2.layer;
  }
  // cancel any active drawing or prior edit
  if (lineEditing) cancelLineEdit();
  ppDrawing = null; sowDrawing = null; pendingStructPoint = null; drawPts = []; clearPreview();
  document.getElementById('mapwrap').classList.remove('drawing');

  lineEditing = {type: type, id: id, weId: activeWEId, layer: layer};
  buildEditHandles(layer);
  setMapHint('');
  document.getElementById('edit-done-bar').style.display = 'flex'; document.getElementById('mapwrap').classList.add('editing');
  var ddb = document.getElementById('draw-done-btn'); if (ddb) ddb.style.display = 'none';
  // Hide reach arrows during editing — recalculated on commit
  if (id === 'reach_len') { var _weE=getWE(activeWEId); var _rdE=_weE&&_weE.ppData['reach_len']; if(_rdE&&_rdE._arrowMarkers) _rdE._arrowMarkers.forEach(function(a){if(a)a.setOpacity(0);}); }
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

function cancelLineEdit() {
  var wasEditing = lineEditing;
  if (panShapeActive) {
    panShapeActive = false;
    var btn = document.getElementById('pan-shape-btn');
    if (btn) { btn.style.background = '#1a3a5c'; btn.textContent = '\u21d5 Pan shape'; }
    document.getElementById('map').removeEventListener('mousedown', _panShapeMapMousedown);
    document.getElementById('mapwrap').classList.remove('drawing');
  }
  clearEditHandles();
  map.dragging.enable();
  lineEditing = null;
  document.getElementById('edit-done-bar').style.display = 'none'; document.getElementById('mapwrap').classList.remove('editing'); var _ddb=document.getElementById('draw-done-btn'); if(_ddb) _ddb.style.display = '';
  // Re-render the row that was showing "editing\u2026" so it returns to its normal state
  if(wasEditing && (wasEditing.type==='pp'||wasEditing.type==='pp-poly')) {
    var m=PP_DEFS.filter(function(x){return x.id===wasEditing.id;})[0];
    if(m) renderPMRow(m);
  }
}

function commitLineEdit() {
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
    if (id === 'reach_len' && !confirmReachChange(we)) {
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
    if (id === 'perimeter') reClipReachToPerimeter(we);
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
    we.ppData[id].valueM = geoAreaM2(ring2);
    we.ppData[id].userDrawn = true;

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
    we.sowLayers[id].valueM = newLen;
    var el = document.getElementById('dr-'+id);
    var sl = we.sowLayers[id];
    if (el && sl) {
      var val = Math.round(sl.valueM * 3.28084).toLocaleString() + ' ft';
      el.innerHTML = '<span class="drawn-result">&#10003; ' + val + '</span> ' +
        '<span class="drawn-redo" onclick="startLineEdit(\'sow\',\''+id+'\')">edit</span> ' +
        '<span class="drawn-redo" onclick="startSOWDraw(\''+id+'\',\''+(sl.geo||'line')+'\',\''+sl.label+'\')">redo</span>';
    }
    updateSOWCalcs(); renderLegend();
  }
}

// ── Channel Habitat Units (CHU) ───────────────────────────────────────────

function getCHUChannelPts(we) {
  // Returns the flat latlng array for the area_ch polygon (user or buffer)
  var d = we.ppData['area_ch'];
  if (!d) return null;
  var layer = d.userDrawn ? d.layer : d.bufferLayer;
  if (!layer) return null;
  var lls = layer.getLatLngs();
  return (lls.length && Array.isArray(lls[0])) ? lls[0] : lls;
}

function startCHUSplit() {
  var we = getActiveWE(); if (!we) return;
  if (!getCHUChannelPts(we)) {
    setMapHint('No Area of Channel polygon — draw or estimate it first in Pre-Project tab.');
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
  var reachD = we.ppData['reach_len'];
  if (!reachD || !reachD.layer) return null;
  var reachPts = reachD.layer.getLatLngs();
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

  // Extension: 3x the channel buffer width
  var chAvgWidthM = ppMultiAvgM(we, 'ch_width');
  var chD2 = we.ppData['area_ch'];
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
  if (we.chuUnits.length === 0) {
    var chPts = getCHUChannelPts(we);
    if (!chPts) return;
    we.chuUnits = [{id:'chu-0', type:null, pts:chPts.map(function(p){return L.latLng(p.lat,p.lng);}), layer:null, areaM2:0, lengthM:0}];
  }

  // Extend the split line beyond the polygon in both directions so the user
  // doesn't need to draw exactly to the edge — just roughly across
  function extendLine(pts) {
    if (pts.length < 2) return pts;
    var first = pts[0], second = pts[1];
    var last = pts[pts.length-1], prev = pts[pts.length-2];
    // Compute bbox of all chuUnits to determine extension amount
    var allLats = [], allLngs = [];
    we.chuUnits.forEach(function(u){ u.pts.forEach(function(p){ allLats.push(p.lat); allLngs.push(p.lng); }); });
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
  for (var i = 0; i < we.chuUnits.length; i++) {
    var res = splitPolyWithLine(we.chuUnits[i].pts, extLine);
    if (res) { splitIdx = i; splitResult = res; break; }
  }
  if (splitIdx === -1) {
    setMapHint('Split line did not cross any channel unit — try extending it further.'); 
    setTimeout(function(){setMapHint('');}, 3000);
    return;
  }
  // save undo state
  we._chuUndo = we.chuUnits.map(function(u){ return {id:u.id,type:u.type,pts:u.pts.slice(),layer:u.layer,areaM2:u.areaM2,lengthM:u.lengthM}; });
  // remove old unit layer and label
  if (we.chuUnits[splitIdx].layer) map.removeLayer(we.chuUnits[splitIdx].layer);
  if (we.chuUnits[splitIdx].labelMarker) map.removeLayer(we.chuUnits[splitIdx].labelMarker);
  var ts = Date.now();
  var newUnits = [
    {id:'chu-'+ts+'a', type: we.chuUnits[splitIdx].type, pts: splitResult[0], layer:null, labelMarker:null, areaM2:0, lengthM:0},
    {id:'chu-'+ts+'b', type: we.chuUnits[splitIdx].type, pts: splitResult[1], layer:null, labelMarker:null, areaM2:0, lengthM:0}
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
  we.chuUnits.splice(splitIdx, 1, newUnits[0], newUnits[1]);

  // If any units already have types, re-apply alternating pattern from first typed unit
  var anyTyped = we.chuUnits.some(function(u){ return !!u.type; });
  if (anyTyped) {
    var anchorIdx = -1, anchorType = null;
    we.chuUnits.forEach(function(u, i){
      if (anchorIdx === -1 && u.type) { anchorIdx = i; anchorType = u.type; }
    });
    if (anchorIdx >= 0) {
      var cycleIdx = CHU_CYCLE.indexOf(anchorType);
      we.chuUnits.forEach(function(u, i){
        var offset = ((i - anchorIdx) % CHU_CYCLE.length + CHU_CYCLE.length) % CHU_CYCLE.length;
        u.type = CHU_CYCLE[(cycleIdx + offset) % CHU_CYCLE.length];
      });
    }
  }

  renderCHUUnits(we);
  wizardRefreshIfActive();
}

function undoCHUSplit() {
  var we = getActiveWE(); if (!we || !we._chuUndo) return;
  we.chuUnits.forEach(function(u){ if(u.layer) map.removeLayer(u.layer); if(u.labelMarker) map.removeLayer(u.labelMarker); });
  we.chuUnits = we._chuUndo;
  we._chuUndo = null;
  we.chuUnits.forEach(function(u){ u.layer = null; u.labelMarker = null; });
  renderCHUUnits(we);
}

function resetCHU() {
  var we = getActiveWE(); if (!we) return;
  we.chuUnits.forEach(function(u){ if(u.layer) map.removeLayer(u.layer); if(u.labelMarker) map.removeLayer(u.labelMarker); });
  we.chuUnits = [];
  we._chuUndo = null;
  renderCHUUnits(we);
}

function setCHUBoulders(id, val) {
  var we = getActiveWE(); if (!we) return;
  var u = we.chuUnits.filter(function(x){ return x.id === id; })[0]; if (!u) return;
  u.boulders = parseInt(val, 10) || 0;
  updateCHUSummary(we);
}

function setCHUPoolDepth(id, val) {
  var we = getActiveWE(); if (!we) return;
  var u = we.chuUnits.filter(function(x){ return x.id === id; })[0]; if (!u) return;
  u.poolDepth = parseFloat(val) || 0;
  updateCHUSummary(we);
}

function setCHUType(id, type) {
  var we = getActiveWE(); if (!we) return;
  var units = we.chuUnits;
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
  we.chuUnits.forEach(function(u) {
    var col = CHU_COLOR[u.type || 'unassigned'];
    if (u.layer) map.removeLayer(u.layer);
    if (u.labelMarker) { map.removeLayer(u.labelMarker); u.labelMarker = null; }
    u.areaM2 = geoAreaM2(u.pts);
    u.lengthM = chuBBoxLength(u.pts);
    u.layer = L.polygon(u.pts, {color:col, fillColor:col, fillOpacity:0.25, weight:2, interactive:false})
      .bindTooltip((u.type ? (u.type.charAt(0).toUpperCase()+u.type.slice(1)) : 'Unassigned') + ' — ' + (u.areaM2*0.000247105).toFixed(3)+' ac')
      .addTo(map);
    // label at centroid
    var labelFull = 'Unit ' + (we.chuUnits.indexOf(u) + 1);
    var icon = L.divIcon({
      className: '',
      iconSize: null,
      iconAnchor: null,
      html: '<div style="background:'+col+';color:#fff;font-size:11px;font-weight:700;padding:3px 9px;border-radius:12px;border:1.5px solid rgba(255,255,255,0.6);white-space:nowrap;box-shadow:0 1px 5px rgba(0,0,0,.5);pointer-events:none;transform:translate(-50%,-50%)">'+labelFull+'</div>'
    });
    u.labelMarker = L.marker(chuCentroid(u.pts), {icon:icon, interactive:false, zIndexOffset:100}).addTo(map);
  });
  var el = document.getElementById('chu-units-list'); if (!el) return;
  if (we.chuUnits.length === 0) { el.innerHTML = '<div style="font-size:11px;color:#556;font-style:italic">No splits yet — draw a split line to begin.</div>'; updateCHUSummary(we); return; }
  el.innerHTML = '';
  we.chuUnits.forEach(function(u, i) {
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
  var riffles    = we.chuUnits.filter(function(u){return u.type==='riffle';});
  var pools      = we.chuUnits.filter(function(u){return u.type==='pool';});
  var glides     = we.chuUnits.filter(function(u){return u.type==='glide';});
  var runs       = we.chuUnits.filter(function(u){return u.type==='run';});
  var unassigned = we.chuUnits.filter(function(u){return !u.type;});
  if (!we.chuUnits.length) { el.innerHTML=''; return; }
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
  ppDrawing = null; sowDrawing = null; chuDrawing = false;
  // Clear any existing manually-drawn reach before re-detecting
  if (!we.ppData['reach_len']) we.ppData['reach_len'] = {};
  var rd = we.ppData['reach_len'];
  if (rd.layer) { map.removeLayer(rd.layer); rd.layer = null; rd.valueM = 0; }
  if (rd._arrowMarker) { map.removeLayer(rd._arrowMarker); rd._arrowMarker = null; }
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

  Promise.all([
    fetch(url).then(function(r){ return r.json(); }).catch(function(){ return {features:[]}; }),
    fetch(wbUrl).then(function(r){ return r.json(); }).catch(function(){ return {features:[]}; })
  ]).then(function(results) {
    if (!reachAutoDetecting) return;
    var data = results[0], wbData = results[1];
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
            opacity: 0.7, interactive: true
          });
          lyr.bindTooltip(feat.attributes.gnisidlabel || 'Unnamed stream', {sticky: true});
          lyr.on('click', function(e) {
            L.DomEvent.stop(e);
            if (!reachAutoDetecting) return;
            reachAutoClickFeature(feat, e.latlng);
          });
          layers.push(lyr);
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
      setMapHint('Click on or near a stream to auto-detect it');
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
    setMapHint('Click on or near a stream to auto-detect it');
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
      var layer = L.polyline(primaryChain.pts, {color:'#1a9abf', weight:4, opacity:0.8, interactive:true})
        .bindTooltip(name + ' (' + primaryChain.features.length + ' segments)').addTo(map);
      layer.on('click', function(e){ L.DomEvent.stop(e); acceptAutoReach(0); });
      reachAutoLayers.push(layer);
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
    var combinedPts;
    if (minD === dEndToStart)   combinedPts = existPts.concat(newPts);
    else if (minD === dEndToEnd)   combinedPts = existPts.concat(newPts.slice().reverse());
    else if (minD === dStartToEnd) combinedPts = newPts.concat(existPts);
    else                           combinedPts = newPts.slice().reverse().concat(existPts);

    // Show preview
    var name = (bestFeat.attributes.gnisidlabel||'segment');
    var preview = L.polyline(newPts, {color:'#c07820', weight:3, dashArray:'6,3', interactive:true})
      .bindTooltip('Append "'+name+'" — click to confirm').addTo(map);
    reachAutoLayers.push(preview);

    // Confirm on click of preview
    preview.on('click', function(e) {
      L.DomEvent.stop(e);
      clearReachAutoLayers();
      // Rebuild reach with combined pts
      map.removeLayer(reachD.layer);
      reachD.layer = L.polyline(combinedPts, {color:'#c07820', weight:2.5, interactive:false}).addTo(map);
      reachD.valueM = geoLen(combinedPts);
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
  var reachSL = we && we.sowLayers && we.sowLayers['pc-reach'];
  if (!reachSL || !reachSL.layer) return;
  var pts = reachSL.layer.getLatLngs();
  if (pts.length && Array.isArray(pts[0])) pts = pts[0];
  if (!pts || pts.length < 2) return;
  if (!we.sowElev) we.sowElev = {};
  we.sowElev._loading = true;
  we.sowElev._profile = null;
  we.sowElev._error = null;
  updateSOWSlopePanel(we);
  var samples = sampleReachPts(pts, ELEV_SAMPLES);
  Promise.all(samples.map(function(p){ return fetchElevation(p.lat, p.lng); }))
    .then(function(elevs) {
      var valid = elevs.filter(function(e){ return e !== null && !isNaN(e) && e > -100; });
      if (valid.length < 2) { we.sowElev._loading=false; we.sowElev._error='No elevation data — outside USGS coverage?'; updateSOWSlopePanel(we); return; }
      var upElev = elevs[0] !== null ? elevs[0] : valid[0];
      var dnElev = elevs[elevs.length-1] !== null ? elevs[elevs.length-1] : valid[valid.length-1];
      // Auto-orient: if downstream is higher, reverse
      if (dnElev > upElev) {
        elevs = elevs.slice().reverse();
        var tmp = upElev; upElev = dnElev; dnElev = tmp;
      }
      var lenM = reachSL.valueM || 1;
      var changeM = upElev - dnElev;
      we.sowElev._loading = false;
      we.sowElev._profile = elevs;
      we.sowElev._upstreamElev = upElev;
      we.sowElev._downstreamElev = dnElev;
      we.sowElev._elevChangeM = changeM;
      we.sowElev._slopePct = (changeM / lenM) * 100;
      we.sowElev._slopeDeg = Math.atan(changeM / lenM) * (180 / Math.PI);
      // Store in sowLayers for SOW export
      if (!we.sowLayers['pc-slope']) we.sowLayers['pc-slope'] = {};
      we.sowLayers['pc-slope'].value = we.sowElev._slopeDeg.toFixed(3);
      updateSOWSlopePanel(we);
    })
    .catch(function() {
      we.sowElev._loading = false;
      we.sowElev._error = 'Could not reach USGS elevation service.';
      updateSOWSlopePanel(we);
    });
}

function updateSOWSlopePanel(we) {
  var wrap = document.getElementById('dr-pc-slope-wrap');
  if (!wrap || !we) return;
  var sd = we.sowElev || {};
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
  if (!we.sowLayers[id]) we.sowLayers[id] = {};
  we.sowLayers[id].value = val;
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
      h += '<div class="f-row"><label>Name</label><input type="text" value="'+r.name+'" placeholder="e.g. Main Channel" style="font-size:12px" oninput="updateCRName(&apos;'+r.id+'&apos;,this.value)"/></div>';

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
  if (sowDrawing) { sowDrawing = null; }
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
  if (sowDrawing) sowDrawing = null;
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
  setMapHint('Wrong stream? Click <b>Re-detect</b> in the sidebar. Otherwise extend if needed, then click <b>Pick endpoints</b>');
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
    var combinedPts;
    if (minD === dES)      combinedPts = existPts.concat(newPts);
    else if (minD === dEE) combinedPts = existPts.concat(newPts.slice().reverse());
    else if (minD === dSE) combinedPts = newPts.concat(existPts);
    else                   combinedPts = newPts.slice().reverse().concat(existPts);

    var name = bestFeat.attributes.gnisidlabel || 'segment';
    var preview = L.polyline(newPts, {color:'#c07820', weight:3, dashArray:'6,3', interactive:true})
      .bindTooltip('Append "'+name+'" — click to confirm').addTo(map);
    reachAutoLayers.push(preview);

    preview.on('click', function(e) {
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
  setMapHint('Wrong stream? Click <b>Re-detect</b> in the sidebar. Otherwise extend if needed, then click <b>Pick endpoints</b>');
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
  pts = clipPtsToPerimeter(we, pts, 'line');
  if (!we.ppData['reach_len']) we.ppData['reach_len'] = {};
  if (we.ppData['reach_len'].layer) map.removeLayer(we.ppData['reach_len'].layer);
  var layer = L.polyline(pts, {color:'#c07820', weight:2.5, interactive:false}).addTo(map);
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
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var weModal = document.getElementById('we-modal');
    if (weModal && weModal.style.display !== 'none') { closeWEModal(); return; }
    var sowModal = document.getElementById('sow-modal');
    if (sowModal && sowModal.style.display !== 'none') { sowModal.style.display='none'; return; }
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
    drawPts.push(e.latlng);redraw();
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
  if(workElements.length){
    h+='<div class="leg-section"><div class="leg-sec-title">Work Elements</div>';
    workElements.forEach(function(we,i){h+='<div class="leg-row"><span style="font-size:10px;font-weight:700;color:#1a3a5c;margin-right:2px">WE'+(i+1)+'</span>'+we.name+'</div>';});
    h+='</div>';
  }
  el.innerHTML=h;if(legCollapsed)el.classList.add('collapsed');
}

// ── Geometry ──────────────────────────────────────────────────────────────
function geoLen(pts){var d=0;for(var i=0;i<pts.length-1;i++)d+=pts[i].distanceTo(pts[i+1]);return d;}
function geoArea(pts){return geoAreaM2(pts)*0.000247105;}
function geoAreaM2(pts){var R=6378137,toRad=function(x){return x*Math.PI/180;},area=0,n=pts.length;for(var i=0;i<n;i++){var j=(i+1)%n;area+=toRad(pts[j].lng-pts[i].lng)*(2+Math.sin(toRad(pts[i].lat))+Math.sin(toRad(pts[j].lat)));}return Math.abs(area*R*R/2);}

// ── Misc ──────────────────────────────────────────────────────────────────
function setMapHint(msg){var el=document.getElementById('map-hint');el.innerHTML=msg;el.style.display=msg?'block':'none';}
function toggleSec(head){var body=head.nextElementSibling;var open=body.classList.toggle('open');head.querySelector('span').textContent=open?'▾':'▸';}

// ── Wizard Mode ────────────────────────────────────────────────────────────
var wizardMode = false;
var wizardStep = 0;

var WIZARD_STEPS = [
  { id:'perimeter',  label:'Project Boundary', title:'Draw Project Boundary',          phase:'pp' },
  { id:'reach',      label:'Stream Reach',     title:'Identify Your Stream Reach',     phase:'pp' },
  { id:'ch_width',   label:'Channel Width',   title:'Measure Channel Width',          phase:'pp' },
  { id:'substrate',  label:'Substrate',       title:'Enter Reach-Averaged Substrate', phase:'pp' },
  { id:'fp_left',    label:'Left Floodplain', title:'Draw Left Floodplain Boundary',  phase:'pp' },
  { id:'fp_right',   label:'Right Floodplain',title:'Draw Right Floodplain Boundary', phase:'pp' },
  { id:'buffers',    label:'Review Areas',    title:'Review Floodplain Areas',        phase:'pp' },
  { id:'pp_done',    label:'Pre-Project Done',title:'Pre-Project Complete!',          phase:'pp' },
  { id:'chu_split',   label:'Channel Splits',  title:'Split Channel into Units',       phase:'work', types:['pc'] },
  { id:'chu_details', label:'Channel Details', title:'Assign Unit Types & Depths',     phase:'work', types:['pc'] },
  { id:'structures', label:'Structures',      title:'Wood Structures',                phase:'work', types:['pc'] },
  { id:'fp_work',    label:'Floodplain Work', title:'Floodplain Work Elements',       phase:'work', types:['fp'] },
  { id:'rr_work',    label:'Riparian Work',   title:'Riparian Work Elements',         phase:'work', types:['rr'] },
  { id:'done',       label:'Complete',        title:'Work Element Complete!',         phase:'work' }
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
    case 'buffers': {
      var ach = we.ppData['area_ch'];
      var fpL = we.ppData['fp_left'], fpR = we.ppData['fp_right'];
      return ((ach&&(ach.layer||ach.bufferLayer)) && (fpL&&fpL.layer) && (fpR&&fpR.layer)) ? 'done' : 'pending';
    }
    case 'fp_split':  return (we.ppData['area_fp'] && we.ppData['area_fp'].fpSplit) ? 'done' : 'pending';
    case 'pp_done': {
      // Done when core PP measurements are all complete
      var corePP = ['perimeter','reach','ch_width','fp_left','fp_right'];
      return corePP.every(function(id){ return wizardStepStatus(we, id) === 'done'; }) ? 'done' : 'pending';
    }
    case 'chu_split':  return (we.chuUnits && we.chuUnits.length > 1) ? 'done' : 'pending';
    case 'chu_details': {
      if (!we.chuUnits || we.chuUnits.length < 2) return 'pending';
      var allTyped = we.chuUnits.every(function(u){ return !!u.type; });
      return allTyped ? 'done' : 'pending';
    }
    case 'structures':{
      var hasSt = false;
      ['cms','mcs','css'].forEach(function(t){ if(we.structures&&we.structures[t]&&we.structures[t].length) hasSt=true; });
      return hasSt ? 'done' : 'pending';
    }
    case 'fp_work': {
      var fpSow = we.sowLayers && Object.keys(we.sowLayers).some(function(k){ return k.indexOf('fp')===0 && we.sowLayers[k] && we.sowLayers[k].valueM; });
      return fpSow ? 'done' : 'pending';
    }
    case 'rr_work': {
      var rrSow = we.sowLayers && Object.keys(we.sowLayers).some(function(k){ return k.indexOf('rr')===0 && we.sowLayers[k] && we.sowLayers[k].valueM; });
      return rrSow ? 'done' : 'pending';
    }
    case 'done':      return 'pending';
  }
  return 'pending';
}

function getVisibleSteps() {
  var we = getActiveWE();
  var types = we ? we.types : [];
  return WIZARD_STEPS.filter(function(s) {
    if (!s.types) return true; // no type restriction
    return s.types.some(function(t){ return types.indexOf(t) >= 0; });
  });
}

function renderWizardStep() {
  if (!wizardMode) return;
  var panel = document.getElementById('wizard-panel');
  if (!panel) return;
  var we = getActiveWE();
  var visSteps = getVisibleSteps();
  var step = visSteps[wizardStep] || visSteps[visSteps.length-1];
  if (!step) return;

  // ── Vertical stepper (vendor-invoice pattern) ──────────────────────────
  var workSectionLabels = {pc: 'Primary Channel', fp: 'Floodplain & Side Channels', rr: 'Riparian Restoration'};
  var stepsHtml = '<div class="wz-v-steps">';
  var prevPhase = null, prevWorkSection = null;
  visSteps.forEach(function(s, i) {
    var st = wizardStepStatus(we, s.id);
    var isActive = (i === wizardStep);
    var isDone = st === 'done';
    var isLast = (i === visSteps.length - 1);

    // Phase header — PP only; work phase uses type sub-sections instead
    if (s.phase !== prevPhase) {
      if (s.phase === 'pp') stepsHtml += '<div class="wz-v-phase-head">Pre-Project</div>';
      prevPhase = s.phase;
      prevWorkSection = null;
    }

    // Work type headers replace the "Habitat Work" label (same style as Pre-Project)
    if (s.phase === 'work' && s.types && s.types.length) {
      var sectionKey = s.types[0];
      if (sectionKey !== prevWorkSection) {
        stepsHtml += '<div class="wz-v-phase-head">' + (workSectionLabels[sectionKey] || sectionKey) + '</div>';
        prevWorkSection = sectionKey;
      }
    }

    stepsHtml += '<div class="wz-v-item">';
    stepsHtml += '<div class="wz-v-left">';
    stepsHtml += '<div class="wz-v-circle' + (isDone && isActive ? ' done active' : isDone ? ' done' : isActive ? ' active' : '') + '">';
    stepsHtml += isDone ? '&#10003;' : (i + 1);
    stepsHtml += '</div>';
    if (!isLast) stepsHtml += '<div class="wz-v-line' + (isDone ? ' done' : '') + '"></div>';
    stepsHtml += '</div>';
    stepsHtml += '<div class="wz-v-label' + (isActive ? ' active' : isDone ? ' done' : '') + '">' + s.label + '</div>';
    stepsHtml += '</div>';
  });
  stepsHtml += '</div>';

  var bodyHtml = we ? wizardStepBody(we, step, wizardStep) : '<div class="wz-step-desc">Add a work element to get started.</div>';
  var footerHtml = wizardStepFooter(we, step, wizardStep);

  // Left column: header + vertical stepper only
  panel.innerHTML =
    '<div class="wz-v-header">' +
      '<div class="wz-v-mode-label">Work Element</div>' +
      '<div class="wz-v-current-step">' + (we ? we.name : '—') + '</div>' +
    '</div>' +
    stepsHtml;

  // Sidebar area: step body + footer (covers the expert panel)
  var bodyPanel = document.getElementById('wizard-body-panel');
  if (bodyPanel) {
    bodyPanel.innerHTML = '<div class="wz-body">' + bodyHtml + '</div><div class="wz-footer">' + footerHtml + '</div>';
    // Draw elevation chart canvas if reach step is showing it
    if (step.id === 'reach' && we) {
      var _sd = we.ppData['avg_slope'] || {};
      if (_sd._elevProfile) {
        setTimeout(function(){ drawElevChart('elev-chart-' + we.id, _sd._elevProfile); }, 0);
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
          h += 'oninput="ppSetBankHt('+i+',this.value)">';
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
      h += '<select style="background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:4px 8px;border-radius:3px;font-size:12px;font-family:inherit" ';
      h += 'onchange="ppSetVal(\'substrate\',this.value);renderWizardStep()">';
      subOpts.forEach(function(o){ h += '<option'+(o===subVal?' selected':'')+'>'+o+'</option>'; });
      h += '</select></div>';
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

    case 'buffers': {
      h += '<div class="wz-step-desc">Review the auto-calculated areas on the map. Edit vertices if the shaded polygons don\'t match the real boundaries.</div>';
      var achB = we && we.ppData['area_ch'];
      var fpLB = we && we.ppData['fp_left'];
      var fpRB = we && we.ppData['fp_right'];
      var achDoneB = achB && (achB.layer || achB.bufferLayer);
      var fpLDoneB = fpLB && fpLB.layer;
      var fpRDoneB = fpRB && fpRB.layer;
      h += '<div class="wz-metric-row"><span class="wz-metric-label">Area of Channel</span>';
      h += achDoneB ? '<span class="wz-metric-val">'+((achB.valueM||0)*0.000247105).toFixed(2)+' ac</span>' : '<span class="wz-metric-val missing">pending channel widths</span>';
      h += achDoneB ? '<button style="background:#f3f7fc;color:#3d3d3d;border:1px solid #dcdcdc;padding:3px 8px;border-radius:3px;font-size:10px;cursor:pointer;margin-left:8px" onclick="startPolyEdit(\'area_ch\')">edit</button>' : '';
      h += '</div>';
      h += '<div class="wz-metric-row"><span class="wz-metric-label">Left Floodplain</span>';
      h += fpLDoneB ? '<span class="wz-metric-val">'+((fpLB.valueM||0)*0.000247105).toFixed(2)+' ac</span>' : '<span class="wz-metric-val missing">not drawn</span>';
      h += fpLDoneB ? '<button style="background:#f3f7fc;color:#3d3d3d;border:1px solid #dcdcdc;padding:3px 8px;border-radius:3px;font-size:10px;cursor:pointer;margin-left:8px" onclick="startLineEdit(\'pp\',\'fp_left\')">edit</button>' : '';
      h += '</div>';
      h += '<div class="wz-metric-row"><span class="wz-metric-label">Right Floodplain</span>';
      h += fpRDoneB ? '<span class="wz-metric-val">'+((fpRB.valueM||0)*0.000247105).toFixed(2)+' ac</span>' : '<span class="wz-metric-val missing">not drawn</span>';
      h += fpRDoneB ? '<button style="background:#f3f7fc;color:#3d3d3d;border:1px solid #dcdcdc;padding:3px 8px;border-radius:3px;font-size:10px;cursor:pointer;margin-left:8px" onclick="startLineEdit(\'pp\',\'fp_right\')">edit</button>' : '';
      h += '</div>';
      if (!achDoneB) {
        h += '<div class="wz-status warning">&#9888; Go back and draw channel width measurements to auto-generate the channel area.</div>';
      } else if (!fpLDoneB && !fpRDoneB) {
        h += '<div class="wz-status warning">&#9888; Go back and draw at least one floodplain boundary.</div>';
      } else {
        h += '<div class="wz-tip">The shaded areas show the channel (blue) and floodplain (green/purple). Edit vertices if they don\'t match the real boundaries.</div>';
      }
      if (fpLDoneB && fpRDoneB) {
        h += '<button class="wz-action-btn secondary" onclick="swapFpLeftRight();renderWizardStep()">&#8646; Swap Left / Right</button>';
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
        var ppMetrics = [
          ['Reach Length', ppLenFt(we,'reach_len') ? Math.round(ppLenFt(we,'reach_len')).toLocaleString()+' ft' : null],
          ['Channel Width (avg)', ppMultiAvgFt(we,'ch_width') ? Math.round(ppMultiAvgFt(we,'ch_width'))+' ft' : null],
          ['Bank Height (avg)', (function(){ var bh=ppCalc(we,'bank_ht'); return bh!==null?bh.toFixed(1)+' ft':null; })()],
          ['Substrate', we.ppData['substrate'] && we.ppData['substrate'].value ? we.ppData['substrate'].value : null],
          ['Area of Channel', ppAcres(we,'area_ch') ? ppAcres(we,'area_ch').toFixed(2)+' ac' : null],
          ['Left Floodplain', ppAcres(we,'fp_left') ? ppAcres(we,'fp_left').toFixed(2)+' ac' : null],
          ['Right Floodplain', ppAcres(we,'fp_right') ? ppAcres(we,'fp_right').toFixed(2)+' ac' : null]
        ];
        ppMetrics.forEach(function(m) {
          h += '<div class="wz-metric-row"><span class="wz-metric-label">'+m[0]+'</span>';
          h += '<span class="wz-metric-val '+(m[1]?'':'missing')+'">'+( m[1] || 'not entered')+'</span></div>';
        });
      }
      h += '<div class="wz-tip">Click Next to begin entering habitat work details.</div>';
      break;

    case 'chu_split':
      h += '<div class="wz-step-desc">Draw perpendicular cut lines across the channel to divide it into riffles and pools. Add as many splits as needed, then click Next.</div>';
      var chuSplitReady = we && we.ppData['area_ch'] && (we.ppData['area_ch'].layer || we.ppData['area_ch'].bufferLayer);
      if (!chuSplitReady) {
        h += '<div class="wz-status warning">&#9888; Complete pre-project steps first to generate the Area of Channel polygon.</div>';
      } else {
        var splitCount = we.chuUnits ? we.chuUnits.length : 0;
        h += '<div class="wz-status '+(splitCount>1?'done':'pending')+'">';
        h += splitCount > 1 ? '&#10003; '+splitCount+' units created.' : '&#9654; No splits yet — channel is one unit.';
        h += '</div>';
        h += '<button class="wz-action-btn'+(splitCount>1?' secondary':'')+'" onclick="showInnerTab(\'work\');startCHUSplit()">&#9135; '+(splitCount>1?'Add Another Split':'Draw First Split Line')+'</button>';
        if (splitCount > 1) {
          we.chuUnits.forEach(function(u, i) {
            h += '<div class="wz-metric-row"><span class="wz-metric-label">Unit '+(i+1)+'</span><span class="wz-metric-val">'+(u.areaM2?((u.areaM2*0.000247105).toFixed(3)+' ac'):'—')+'</span></div>';
          });
        }
      }
      break;

    case 'chu_details':
      h += '<div class="wz-step-desc">For each channel unit, assign a type (riffle or pool) and enter the measurements below.</div>';
      var units = (we && we.chuUnits) ? we.chuUnits : [];
      if (units.length < 2) {
        h += '<div class="wz-status warning">&#9888; Go back and draw at least one split line first.</div>';
      } else {
        var allTyped = units.every(function(u){ return !!u.type; });
        h += '<div class="wz-status '+(allTyped?'done':'warning')+'">';
        h += allTyped ? '&#10003; All units assigned.' : '&#9888; '+units.filter(function(u){return !u.type;}).length+' unit(s) still need a type.';
        h += '</div>';
        units.forEach(function(u, i) {
          var typeLabel = u.type ? u.type.charAt(0).toUpperCase()+u.type.slice(1) : 'Unassigned';
          var typeColor = u.type==='riffle'?'#1a7abf':u.type==='pool'?'#7b4fbf':u.type==='glide'?'#2a8a6a':u.type==='run'?'#c07820':'#7c7c7c';
          h += '<div style="background:#fff;border:1px solid #dcdcdc;border-radius:6px;padding:10px;margin-bottom:8px">';
          h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">';
          h += '<span style="font-size:12px;font-weight:700;color:#3d3d3d">Unit '+(i+1)+'</span>';
          h += '<span style="font-size:10px;font-weight:700;color:'+typeColor+';background:#f3f7fc;padding:2px 8px;border-radius:10px;border:1px solid #dcdcdc">'+typeLabel+'</span>';
          h += '</div>';
          h += '<div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap">';
          h += '<button class="chu-type-btn'+(u.type==='riffle'?' active-riffle':'')+'" style="flex:1;min-width:60px;padding:6px" ';
          h += 'onclick="wizardSetCHUType(&apos;'+u.id+'&apos;,&apos;riffle&apos;)">Riffle</button>';
          h += '<button class="chu-type-btn'+(u.type==='pool'?' active-pool':'')+'" style="flex:1;min-width:60px;padding:6px" ';
          h += 'onclick="wizardSetCHUType(&apos;'+u.id+'&apos;,&apos;pool&apos;)">Pool</button>';
          h += '<button class="chu-type-btn'+(u.type==='glide'?' active-glide':'')+'" style="flex:1;min-width:60px;padding:6px" ';
          h += 'onclick="wizardSetCHUType(&apos;'+u.id+'&apos;,&apos;glide&apos;)">Glide</button>';
          h += '<button class="chu-type-btn'+(u.type==='run'?' active-run':'')+'" style="flex:1;min-width:60px;padding:6px" ';
          h += 'onclick="wizardSetCHUType(&apos;'+u.id+'&apos;,&apos;run&apos;)">Run</button>';
          h += '</div>';
          if (u.type === 'riffle') {
            h += '<div style="display:flex;align-items:center;gap:8px;font-size:11px;color:#525252">';
            h += '<label style="flex:1">Boulder count</label>';
            h += '<input type="number" min="0" style="width:70px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" ';
            h += 'value="'+(u.boulderCount||'')+'" placeholder="0" onchange="wizardSetCHUBoulders(&apos;'+u.id+'&apos;,this.value)">';
            h += '</div>';
          }
          if (u.type === 'pool') {
            h += '<div style="display:flex;align-items:center;gap:8px;font-size:11px;color:#525252">';
            h += '<label style="flex:1">Avg depth at low flow (ft)</label>';
            h += '<input type="number" min="0" step="0.1" style="width:70px;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" ';
            h += 'value="'+(u.avgDepth||'')+'" placeholder="0.0" onchange="wizardSetCHUDepth(&apos;'+u.id+'&apos;,this.value)">';
            h += '</div>';
          }
          // Length and area shown for all types
          h += '<div style="display:flex;gap:8px;margin-top:4px;font-size:10px;color:#7c7c7c">';
          h += '<span>'+( u.areaM2 ? (u.areaM2*0.000247105).toFixed(3)+' ac' : '—' )+'</span>';
          h += '<span>'+( u.lengthM ? Math.round(u.lengthM*3.28084)+' ft' : '—' )+'</span>';
          h += '</div>';
          h += '</div>';
        });
      }
      break;

    case 'structures':
      h += '<div class="wz-step-desc">Add wood structure placements — channel margin, mid-channel, and channel spanning. Click a structure type to add it, then place it on the map.</div>';
      var structCount = 0;
      var structTypes = [
        {key:'cms', label:'Channel Margin'},
        {key:'mcs', label:'Mid Channel'},
        {key:'css', label:'Channel Spanning'}
      ];
      structTypes.forEach(function(st){
        var list = (we && we.structures && we.structures[st.key]) || [];
        structCount += list.length;
      });

      // Single add button — type is set after adding via the per-structure dropdown
      h += '<div style="margin-bottom:14px">';
      h += '<button class="pm-draw-btn" style="height:var(--form-height-sm,32px);padding:0 12px" ';
      h += 'onclick="wizardAddStructure(\'cms\',\'Channel Margin\')">&#43; Add Structure</button>';
      h += '</div>';

      // Flat structure list — same source as expert mode renderAllStructures()
      var structs = (we && we.structs) || [];
      if (!structs.length) {
        h += '<div class="wz-status pending">&#9654; No structures added yet.</div>';
      }
      structs.forEach(function(s, i) {
        var t = s.structType || 'cms';
        var isWaiting = pendingStructPoint && pendingStructPoint.id === s.id;
        h += '<div style="background:#fff;border:1px solid #dcdcdc;border-radius:5px;padding:8px;margin-bottom:6px">';
        h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
        var typeSelect2 = '<select style="font-size:11px;border:1px solid var(--color-border);border-radius:3px;padding:2px 4px;background:var(--color-surface);color:var(--color-text-primary);font-family:var(--font-sans,system-ui)" onchange="changeStructType(null,\''+s.id+'\',this.value)">';
        typeSelect2 += '<option value="cms"'+(t==='cms'?' selected':'')+'>Channel Margin</option>';
        typeSelect2 += '<option value="mcs"'+(t==='mcs'?' selected':'')+'>Mid Channel</option>';
        typeSelect2 += '<option value="css"'+(t==='css'?' selected':'')+'>Channel Spanning</option>';
        typeSelect2 += '</select>';
        h += typeSelect2;
        h += '<span style="cursor:pointer;color:#ef4444;font-size:12px" onclick="wizardDelStructure(\''+t+'\',\''+s.id+'\')">&#10005;</span>';
        h += '</div>';
        if (s.latlng) {
          h += '<div style="font-size:11px;color:#0f6849;margin-bottom:4px">&#10003; Placed on map</div>';
        } else {
          h += '<button class="pm-draw-btn'+(isWaiting?' active':'')+'" style="width:100%;height:auto;padding:5px;margin-bottom:4px" ';
          h += 'onclick="startStructPoint(\''+t+'\',\''+s.id+'\')">&#9679; '+(isWaiting?'Click map to place…':'Place on map')+'</button>';
        }
        h += '<input type="text" placeholder="Description (e.g. Single-key LWD jam)" ';
        h += 'value="'+(s.desc||'')+'" style="width:100%;box-sizing:border-box;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:4px 6px;border-radius:3px;font-size:11px;margin-bottom:4px" ';
        h += 'oninput="updateStructure(\''+t+'\',\''+s.id+'\',\'desc\',this.value)">';
        h += '<div style="display:flex;gap:8px">';
        h += '<div style="flex:1"><div style="font-size:11px;color:#7c7c7c;margin-bottom:2px">Large pieces (&gt;12")</div>';
        h += '<input type="number" min="0" value="'+(s.large||0)+'" style="width:100%;box-sizing:border-box;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" ';
        h += 'oninput="updateStructure(\''+t+'\',\''+s.id+'\',\'large\',+this.value)"></div>';
        h += '<div style="flex:1"><div style="font-size:11px;color:#7c7c7c;margin-bottom:2px">Small pieces (&lt;12")</div>';
        h += '<input type="number" min="0" value="'+(s.small||0)+'" style="width:100%;box-sizing:border-box;background:#fff;border:1px solid #dcdcdc;color:#3d3d3d;padding:3px 6px;border-radius:3px;font-size:11px" ';
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

    case 'fp_work':
      h += '<div class="wz-step-desc">Draw floodplain work features — floodplain structures, side channel improvements, and other floodplain enhancements.</div>';
      h += '<button class="wz-action-btn" onclick="toggleWizardMode();showInnerTab(\'work\');showWorkTab(\'fp\')">&#9654; Go to Floodplain Work</button>';
      
      break;

    case 'rr_work':
      h += '<div class="wz-step-desc">Draw riparian work features — fencing lines, planting areas, and invasive species removal areas.</div>';
      h += '<button class="wz-action-btn" onclick="toggleWizardMode();showInnerTab(\'work\');showWorkTab(\'rr\')">&#9654; Go to Riparian Work</button>';
      
      break;

    case 'done':
      h += '<div class="wz-step-desc">Your work element is complete. Review the summary and export your Statement of Work.</div>';
      h += '<div class="wz-status done" style="font-size:13px;padding:14px">&#10003; <b>'+( we ? we.name : 'Work element')+' complete!</b></div>';
      if (we) {
        var doneMetrics = [
          ['Reach Length', ppLenFt(we,'reach_len') ? Math.round(ppLenFt(we,'reach_len')).toLocaleString()+' ft' : null],
          ['Area of Channel', ppAcres(we,'area_ch') ? ppAcres(we,'area_ch').toFixed(2)+' ac' : null],
          ['Left Floodplain', ppAcres(we,'fp_left') ? ppAcres(we,'fp_left').toFixed(2)+' ac' : null],
          ['Right Floodplain', ppAcres(we,'fp_right') ? ppAcres(we,'fp_right').toFixed(2)+' ac' : null],
          ['CHUs', we.chuUnits && we.chuUnits.length > 0 ? we.chuUnits.length+' units' : null]
        ];
        doneMetrics.forEach(function(m) {
          h += '<div class="wz-metric-row"><span class="wz-metric-label">'+m[0]+'</span>';
          h += '<span class="wz-metric-val '+(m[1]?'':'missing')+'">'+( m[1] || 'not entered')+'</span></div>';
        });
      }
      h += '<button class="wz-action-btn" style="margin-top:16px" onclick="openSOW()">&#128196; Export Metrics</button>';
      h += '<button class="wz-action-btn secondary" onclick="openWEModal(null)">&#43; Add Another Work Element</button>';
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
  var skippable = ['bank_ht', 'substrate', 'chu_split', 'structures', 'fp_work', 'rr_work'];

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

function wizardNext() {
  var vis = getVisibleSteps();
  if (wizardStep < vis.length - 1) {
    wizardStep++;
    renderWizardStep();
    wizardAutoActivate();
  }
}

function wizardBack() {
  if (wizardStep > 0) { wizardStep--; renderWizardStep(); wizardAutoActivate(); }
}

function wizardSkip() {
  var vis = getVisibleSteps();
  if (wizardStep < vis.length - 1) { wizardStep++; renderWizardStep(); wizardAutoActivate(); }
}

function wizardAutoActivate() {
  var vis = getVisibleSteps();
  var step = vis[wizardStep];
  if (!step) return;
  var we = getActiveWE();
  if (ppDrawing) { ppDrawing = null; drawPts = []; clearPreview(); document.getElementById('mapwrap').classList.remove('drawing'); setMapHint(''); }
  switch(step.id) {
    case 'perimeter':
      setMapHint('Draw your project boundary polygon on the map');
      break;
    case 'reach':
      setMapHint('Click Auto-Detect or Draw Manually to add your reach line');
      break;
    case 'ch_width': case 'fp_left': case 'fp_right':
      if (we && we.ppData['reach_len'] && we.ppData['reach_len'].layer) map.fitBounds(we.ppData['reach_len'].layer.getBounds(), {padding:[60,60]});
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
    case 'fp_work':
    case 'rr_work':
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
  var units = we.chuUnits;
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
  var u = we.chuUnits && we.chuUnits.filter(function(u){ return u.id===unitId; })[0];
  if (u) { u.boulderCount = parseInt(val)||0; }
}

function wizardSetCHUDepth(unitId, val) {
  var we = getActiveWE(); if (!we) return;
  var u = we.chuUnits && we.chuUnits.filter(function(u){ return u.id===unitId; })[0];
  if (u) { u.avgDepth = parseFloat(val)||0; }
}

function wizardSkipCHU() {
  // Skip both chu_split and chu_details
  var vis = getVisibleSteps();
  var detailsIdx = -1;
  vis.forEach(function(s, i){ if (s.id === 'chu_details') detailsIdx = i; });
  if (detailsIdx >= 0) wizardStep = detailsIdx + 1;
  else wizardStep = Math.min(wizardStep + 2, vis.length - 1);
  renderWizardStep();
  wizardAutoActivate();
}

function wizardAddStructure(type, label) {
  var we = getActiveWE(); if (!we) return;
  var s = {id:type+'-'+Date.now(), structType:type, label:label, desc:'', large:0, small:0, latlng:null, marker:null};
  // Write to both arrays so the expert panel's renderAllStructures() picks it up
  if (!we.structs) we.structs = [];
  we.structs.push(s);
  we.structures[type].push(s);
  renderWizardStep();
  startStructPoint(type, s.id);
}

function wizardDelStructure(type, id) {
  delStructure(type, id);
  renderWizardStep();
}

function wizardRefreshIfActive() {
  if (wizardMode) setTimeout(renderWizardStep, 50);
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

function openSOW() {
  if(!workElements.length){alert('No work elements to export.');return;}
  var today=new Date().toLocaleDateString();
  var h='<h3>Contract Information</h3><dl class="smeta"><dt>Contract #</dt><dd>84042 REL 117</dd><dt>COR</dt><dd>Tracy Hauser</dd><dt>FY</dt><dd>2026</dd><dt>Date</dt><dd>'+today+'</dd></dl>';

  workElements.forEach(function(we,idx) {
    h+='<h2>WE '+(idx+1)+': '+we.name+'</h2>';
    h+='<div style="font-size:11px;color:#5ddba5;margin-bottom:8px">Work types: '+we.types.map(function(t){return TYPE_LABELS[t];}).join(', ')+'</div>';

    // Pre-project
    h+='<h3>Pre-Project Conditions</h3><table><thead><tr><th>Metric</th><th>Method</th><th>Value</th></tr></thead><tbody>';
    PP_DEFS.forEach(function(m){
      var d=we.ppData[m.id]||{},val='—';
      if(m.method==='entered'&&d.value)val=d.value;
      else if(m.method==='measured'&&!m.multi&&d.valueM)val=m.geo==='line'?Math.round(d.valueM*3.28084).toLocaleString()+' ft':(d.valueM*0.000247105).toFixed(2)+' acres';
      else if(m.method==='measured'&&m.multi){var avg=ppMultiAvgFt(we,m.id);if(avg!==null)val=Math.round(avg).toLocaleString()+' ft (avg)';}
      else if(m.method==='calc'){var c=ppCalc(we,m.id);if(c!==null)val=c;}
      h+='<tr><td>'+m.label+'</td><td>'+m.method+'</td><td>'+val+'</td></tr>';
    });
    h+='</tbody></table>';

    // Only include sections for selected types — set this WE as active for fmtIn/fmtCalc to work
    // (Note: fmtIn reads from DOM, which reflects the currently rendered WE)
    // We'll use we.sowLayers directly for layer values

    if(we.types.indexOf('pc')>=0) {
      h+='<h3>Primary Channel — Wood Structures</h3><table><thead><tr><th>Type</th><th>Description</th><th># Large</th><th># Small</th></tr></thead><tbody>';
      var anyS=false;
      ['cms','mcs','css'].forEach(function(t){we.structures[t].forEach(function(s){anyS=true;h+='<tr><td>'+STRUCT_LABEL[t]+'</td><td>'+s.desc+'</td><td>'+(s.large||0)+'</td><td>'+(s.small||0)+'</td></tr>';});});
      if(!anyS)h+='<tr><td colspan="4" style="color:#aab8c8;font-style:italic">None entered</td></tr>';
      h+='</tbody></table>';
      h+='<h3>Primary Channel — Habitat &amp; Complexity</h3><table><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>';
      var sl=we.sowLayers;
      function wFt(id){var l=sl[id];return l?Math.round(l.valueM*3.28084).toLocaleString()+' ft':'—';}
      function wAc(id){var l=sl[id];return l?l.acres.toFixed(2)+' acres':'—';}
      function wAvg(ids){var v=ids.map(function(id){return sl[id]?sl[id].valueM*3.28084:null;}).filter(function(x){return x!==null;});return v.length?Math.round(v.reduce(function(a,b){return a+b;},0)/v.length)+' ft':'—';}

      // ── Channel Complexity Metrics — per-reach ─────────────────────────────
      var reaches = we.channelReaches || [];
      if (reaches.length > 0) {
        reaches.forEach(function(r, ri) {
          var rLabel = r.name || ('Reach '+(ri+1));
          h += '<tr><td colspan="2" style="background:#f0f5fa;font-weight:700;color:#1a3a5c;padding:6px 8px">'+rLabel+'</td></tr>';
          // Reach length
          var reachSL = r.sowLayers['pc-reach'];
          var reachFt = reachSL && reachSL.valueM ? Math.round(reachSL.valueM*3.28084).toLocaleString()+' ft' : '—';
          h += '<tr><td>Reach length</td><td>'+reachFt+'</td></tr>';
          // Valley length
          var vlM = crCalcValleyLen(r);
          h += '<tr><td>Valley length</td><td>'+(vlM?Math.round(vlM*3.28084).toLocaleString()+' ft':'—')+'</td></tr>';
          // Sinuosity
          h += '<tr><td>Sinuosity</td><td>'+(crCalcSinuosity(r)||'—')+'</td></tr>';
          // Slope
          var sd = r.sowElev||{};
          h += '<tr><td>Avg reach slope</td><td>'+(sd._slopeDeg!==undefined?sd._slopeDeg.toFixed(2)+'° / '+sd._slopePct.toFixed(2)+'%':'—')+'</td></tr>';
          // Avg channel width
          var avgW = crAvgWidth(r);
          h += '<tr><td>Avg channel width</td><td>'+(avgW?Math.round(avgW)+' ft':'—')+'</td></tr>';
          // Bank height
          var bh = r.sowLayers['pc-bankht'] && r.sowLayers['pc-bankht'].value ? r.sowLayers['pc-bankht'].value+' ft' : '—';
          h += '<tr><td>Avg bank height</td><td>'+bh+'</td></tr>';
          // Area of restored channel
          var areaSL = r.sowLayers['pc-area'];
          var areaAc = areaSL && areaSL.valueM ? (areaSL.valueM*0.000247105).toFixed(3)+' acres' : '—';
          h += '<tr><td>Area of restored channel</td><td>'+areaAc+'</td></tr>';
          // Excavation volume
          var excav = crCalcExcav(r);
          h += '<tr><td>Channel excavation volume</td><td>'+(excav!==null?excav.toLocaleString()+' CY':'—')+'</td></tr>';
          // Gravel placements
          if (r.gravelPlacements && r.gravelPlacements.length > 0) {
            r.gravelPlacements.forEach(function(gp, gi) {
              var gpFt = gp.lenM ? Math.round(gp.lenM*3.28084).toLocaleString()+' ft' : '—';
              var gpDepth = gp.depth ? gp.depth+' ft avg depth' : '';
              h += '<tr><td>Gravel placement '+(gi+1)+'</td><td>'+gpFt+(gpDepth?' · '+gpDepth:'')+'</td></tr>';
            });
          }
        });
      } else {
        h += '<tr><td colspan="2" style="color:#888;font-style:italic">No channel complexity reaches defined</td></tr>';
      }
      h+='</tbody></table>';

      // ── Channel Habitat Units ──────────────────────────────────────────────
      var chuR=we.chuUnits?we.chuUnits.filter(function(u){return u.type==='riffle';}):[]; 
      var chuP=we.chuUnits?we.chuUnits.filter(function(u){return u.type==='pool';}):[];
      var chuG=we.chuUnits?we.chuUnits.filter(function(u){return u.type==='glide';}):[];
      var chuRn=we.chuUnits?we.chuUnits.filter(function(u){return u.type==='run';}):[];
      var chuRArea=(chuR.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105);
      var chuPArea=(chuP.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105);
      var chuGArea=(chuG.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105);
      var chuRnArea=(chuRn.reduce(function(a,u){return a+u.areaM2;},0)*0.000247105);
      var chuRLen=chuR.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
      var chuPLen=chuP.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
      var chuGLen=chuG.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
      var chuRnLen=chuRn.reduce(function(a,u){return a+u.lengthM;},0)*3.28084;
      var chuTotalBoulders = chuR.reduce(function(a,u){return a+(u.boulders||0);},0);
      var chuPDepths = chuP.filter(function(u){return u.poolDepth;}).map(function(u){return u.poolDepth;});
      var chuAvgDepth = chuPDepths.length?(chuPDepths.reduce(function(a,v){return a+v;},0)/chuPDepths.length).toFixed(1)+' ft':null;
      if (chuR.length||chuP.length||chuG.length||chuRn.length) {
        h+='<h3 class="sow-section-title">Channel Habitat Units</h3>';
        h+='<table class="sow-table"><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>';
        h+='<tr><td># Riffles</td><td>'+(chuR.length||'—')+'</td></tr>';
        h+='<tr><td>Total boulders</td><td>'+(chuR.length?(chuTotalBoulders||'0'):'—')+'</td></tr>';
        h+='<tr><td>Riffle area</td><td>'+(chuR.length?chuRArea.toFixed(3)+' acres':'—')+'</td></tr>';
        h+='<tr><td>Riffle length (approx)</td><td>'+(chuR.length?'~'+Math.round(chuRLen).toLocaleString()+' ft':'—')+'</td></tr>';
        h+='<tr><td># Pools</td><td>'+(chuP.length||'—')+'</td></tr>';
        h+='<tr><td>Pool area</td><td>'+(chuP.length?chuPArea.toFixed(3)+' acres':'—')+'</td></tr>';
        h+='<tr><td>Pool length (approx)</td><td>'+(chuP.length?'~'+Math.round(chuPLen).toLocaleString()+' ft':'—')+'</td></tr>';
        h+='<tr><td>Avg pool depth at low flow</td><td>'+(chuAvgDepth||'—')+'</td></tr>';
        h+='<tr><td># Glides</td><td>'+(chuG.length||'—')+'</td></tr>';
        h+='<tr><td>Glide area</td><td>'+(chuG.length?chuGArea.toFixed(3)+' acres':'—')+'</td></tr>';
        h+='<tr><td>Glide length (approx)</td><td>'+(chuG.length?'~'+Math.round(chuGLen).toLocaleString()+' ft':'—')+'</td></tr>';
        h+='<tr><td># Runs</td><td>'+(chuRn.length||'—')+'</td></tr>';
        h+='<tr><td>Run area</td><td>'+(chuRn.length?chuRnArea.toFixed(3)+' acres':'—')+'</td></tr>';
        h+='<tr><td>Run length (approx)</td><td>'+(chuRn.length?'~'+Math.round(chuRnLen).toLocaleString()+' ft':'—')+'</td></tr>';
        h+='</tbody></table>';
      }
      // Pie charts — only if we have typed units
      var hasTypes = chuR.length||chuP.length||chuG.length||chuRn.length;
      if (hasTypes) {
        var chartId1 = 'chu-pie-ac-'+we.id, chartId2 = 'chu-pie-ft-'+we.id;
        h += '<div style="display:flex;gap:24px;margin:16px 0;flex-wrap:wrap">';
        h += '<div style="flex:1;min-width:200px;text-align:center"><div style="font-size:11px;font-weight:700;color:#2c4a6a;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">By Area (acres)</div><canvas id="'+chartId1+'" width="180" height="180"></canvas><div id="'+chartId1+'-leg" style="margin-top:8px;font-size:10px;text-align:left;display:inline-block"></div></div>';
        h += '<div style="flex:1;min-width:200px;text-align:center"><div style="font-size:11px;font-weight:700;color:#2c4a6a;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">By Length (ft)</div><canvas id="'+chartId2+'" width="180" height="180"></canvas><div id="'+chartId2+'-leg" style="margin-top:8px;font-size:10px;text-align:left;display:inline-block"></div></div>';
        h += '</div>';
        // Draw after DOM is ready
        setTimeout(function() {
          var acData  = [{label:'Riffle',val:chuRArea,color:'#7b4fbf'},{label:'Pool',val:chuPArea,color:'#1a7abf'},{label:'Glide',val:chuGArea,color:'#2a8a6a'},{label:'Run',val:chuRnArea,color:'#c07820'}].filter(function(d){return d.val>0;});
          var ftData  = [{label:'Riffle',val:chuRLen,color:'#7b4fbf'},{label:'Pool',val:chuPLen,color:'#1a7abf'},{label:'Glide',val:chuGLen,color:'#2a8a6a'},{label:'Run',val:chuRnLen,color:'#c07820'}].filter(function(d){return d.val>0;});
          drawCHUPie(chartId1, acData, function(v){return v.toFixed(2)+' ac'});
          drawCHUPie(chartId2, ftData, function(v){return Math.round(v).toLocaleString()+' ft'});
        }, 100);
      }
    }

    if(we.types.indexOf('fp')>=0) {
      var sl=we.sowLayers;
      function wFt2(id){var l=sl[id];return l?Math.round(l.valueM*3.28084).toLocaleString()+' ft':'—';}
      function wMi2(id){var l=sl[id];return l?(l.valueM*0.000621371).toFixed(3)+' mi':'—';}
      function wAc2(id){var l=sl[id];return l?l.acres.toFixed(2)+' acres':'—';}
      function wAvg2(ids){var v=ids.map(function(id){return sl[id]?sl[id].valueM*3.28084:null;}).filter(function(x){return x!==null;});return v.length?Math.round(v.reduce(function(a,b){return a+b;},0)/v.length)+' ft':'—';}
      h+='<h3>Floodplain &amp; Side Channels</h3><table><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>';
      h+='<tr><td>FP large log placement area</td><td>'+wAc2('fp-logs-area')+'</td></tr>';
      ['fps','scs'].forEach(function(t){we.structures[t].forEach(function(s,i){h+='<tr><td>'+STRUCT_LABEL[t]+' '+(i+1)+': '+s.desc+'</td><td>Large: '+(s.large||0)+', Small: '+(s.small||0)+'</td></tr>';});});
      h+='<tr><td>FP connectivity reach</td><td>'+wMi2('fp-conn-reach')+'</td></tr>';
      h+='<tr><td>Avg floodplain width</td><td>'+wAvg2(['fpw1','fpw2','fpw3'])+'</td></tr>';
      h+='<tr><td>Left floodplain area</td><td>'+(ppAcres(we,'fp_left')?ppAcres(we,'fp_left').toFixed(2)+' acres':'—')+'</td></tr>';
      h+='<tr><td>Right floodplain area</td><td>'+(ppAcres(we,'fp_right')?ppAcres(we,'fp_right').toFixed(2)+' acres':'—')+'</td></tr>';
      h+='<tr><td>FP grading area</td><td>'+wAc2('fp-grade')+'</td></tr>';
      h+='<tr><td>Road removed in FP</td><td>'+wMi2('fp-road')+'</td></tr>';
      h+='<tr><td>Berm/levee removed</td><td>'+wMi2('fp-berm')+'</td></tr>';
      h+='<tr><td>Revetment removed</td><td>'+wMi2('fp-revet')+'</td></tr>';
      h+='<tr><td>Mine tailings removed</td><td>'+wAc2('fp-tailings')+'</td></tr>';
      h+='<tr><td>Perennial side channel</td><td>'+wMi2('fp-perensc')+'</td></tr>';
      h+='<tr><td>Ephemeral side channel</td><td>'+wMi2('fp-ephsc')+'</td></tr>';
      h+='<tr><td>Wetland restored/enhanced</td><td>'+wAc2('fp-wetland')+'</td></tr>';
      h+='</tbody></table>';
    }

    if(we.types.indexOf('rr')>=0) {
      var sl=we.sowLayers;
      function wFt3(id){var l=sl[id];return l?Math.round(l.valueM*3.28084).toLocaleString()+' ft':'—';}
      function wMi3(id){var l=sl[id];return l?(l.valueM*0.000621371).toFixed(3)+' mi':'—';}
      function wAc3(id){var l=sl[id];return l?l.acres.toFixed(2)+' acres':'—';}
      h+='<h3>Riparian Restoration</h3><table><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>';
      h+='<tr><td>Miles fence installed</td><td>'+wMi3('rr-fence')+'</td></tr>';
      h+='<tr><td>FP protected by fence</td><td>'+wAc3('rr-fence-area')+'</td></tr>';
      h+='<tr><td>Planted below bankfull</td><td>'+wAc3('rr-plant-bf')+'</td></tr>';
      h+='<tr><td>Planted above bankfull</td><td>'+wAc3('rr-plant-abf')+'</td></tr>';
      h+='<tr><td>Invasive species removed</td><td>'+wAc3('rr-invasive')+'</td></tr>';
      h+='<tr><td>Bank length riparian improvement</td><td>'+wMi3('rr-bank')+'</td></tr>';
      h+='<tr><td>Total riparian improvement area</td><td>'+wAc3('rr-total')+'</td></tr>';
      h+='</tbody></table>';
    }
  });

  document.getElementById('sowbody').innerHTML=h;
  document.getElementById('sowmodal').style.display='flex';
}

function closeSOW(){document.getElementById('sowmodal').style.display='none';}