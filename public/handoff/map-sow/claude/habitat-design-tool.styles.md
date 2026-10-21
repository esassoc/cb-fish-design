# Habitat Design Tool: styles

```css
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-body-xs {
  font-family: var(--typography-body-xs-font-family);
  font-size: var(--typography-body-xs-font-size);
  font-weight: var(--typography-body-xs-font-weight);
  line-height: var(--typography-body-xs-line-height);
  letter-spacing: var(--typography-body-xs-letter-spacing);
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-label-sm-strong {
  font-family: var(--typography-label-sm-strong-font-family);
  font-size: var(--typography-label-sm-strong-font-size);
  font-weight: var(--typography-label-sm-strong-font-weight);
  line-height: var(--typography-label-sm-strong-line-height);
  letter-spacing: var(--typography-label-sm-strong-letter-spacing);
}
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
}
.typography-body-md {
  font-family: var(--typography-body-md-font-family);
  font-size: var(--typography-body-md-font-size);
  font-weight: var(--typography-body-md-font-weight);
  line-height: var(--typography-body-md-line-height);
  letter-spacing: var(--typography-body-md-letter-spacing);
}
.typography-body-xs {
  font-family: var(--typography-body-xs-font-family);
  font-size: var(--typography-body-xs-font-size);
  font-weight: var(--typography-body-xs-font-weight);
  line-height: var(--typography-body-xs-line-height);
  letter-spacing: var(--typography-body-xs-letter-spacing);
}
.typography-label-md {
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  letter-spacing: var(--typography-label-md-letter-spacing);
}
.typography-label-sm-strong {
  font-family: var(--typography-label-sm-strong-font-family);
  font-size: var(--typography-label-sm-strong-font-size);
  font-weight: var(--typography-label-sm-strong-font-weight);
  line-height: var(--typography-label-sm-strong-line-height);
  letter-spacing: var(--typography-label-sm-strong-letter-spacing);
}
.typography-microcopy-xs {
  font-family: var(--typography-microcopy-xs-font-family);
  font-size: var(--typography-microcopy-xs-font-size);
  font-weight: var(--typography-microcopy-xs-font-weight);
  line-height: var(--typography-microcopy-xs-line-height);
  letter-spacing: var(--typography-microcopy-xs-letter-spacing);
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
.msow-root * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.msow-root {
  font-size: 13px;
}
.pp-progress {
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border-default-subtle);
  flex-shrink: 0;
}
.sbt {
  font-size: 11px;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-content-default-tertiary);
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.sbt-dot {
  width: 7px;
  height: 7px;
  background: var(--color-background-brand);
  border-radius: 50%;
}
.pp-prog-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pp-prog-wrap {
  flex: 1;
  background: var(--color-border-default-subtle);
  border-radius: 4px;
  height: 7px;
  overflow: hidden;
}
.pp-prog-bar {
  height: 100%;
  background: var(--color-background-brand);
  border-radius: 4px;
  transition: width 0.3s;
}
.pp-prog-pct {
  font-size: 12px;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-background-default-knockout);
}
.pm-row {
  border-bottom: 1px solid var(--color-border-default-subtle);
  padding: 9px 12px;
  cursor: pointer;
}
.pm-row:hover {
  background: var(--color-background-brand-subtle);
}
.pm-row.active-draw {
  background: #fff8ee;
  border-left: 3px solid var(--cbf-amber-attention);
}
.pm-row.complete {
  border-left: 3px solid var(--color-background-brand);
}
.pm-head {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 4px;
}
.pm-label {
  font-size: 12px;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-background-default-knockout);
  flex: 1;
}
.pm-desc {
  font-size: 10px;
  color: var(--color-content-default-tertiary);
  margin-bottom: 6px;
  font-style: italic;
}
.pm-input {
  width: 100%;
  border: 1px solid var(--color-border-default);
  border-radius: 3px;
  padding: 4px 7px;
  font-size: 12px;
  color: var(--color-content-default);
  margin-bottom: 4px;
}
esa-select.pm-input,
esa-text-field.pm-input {
  width: 100%;
  border: none;
  padding: 0;
  margin-bottom: 4px;
}
.pm-meas-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  min-height: 26px;
}
.pm-draw-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  background: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
  border: 1px solid transparent;
  padding-block: var(--spacing-150);
  padding-inline: var(--spacing-200, 8px);
  border-radius: var(--radius-sm, 4px);
  cursor: pointer;
  font-size: var(--typography-label-2xs-font-size, 11px);
  font-weight: var(--typography-font-weight-medium);
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
.pm-draw-btn:hover {
  background: var(--color-background-brand-hover);
}
.pm-draw-btn.active {
  background: var(--cbf-amber-attention);
}
.pm-waiting {
  font-size: 11px;
  color: var(--cbf-amber-attention);
  font-style: italic;
}
.pm-not-drawn {
  font-size: 11px;
  color: var(--color-content-default-tertiary);
  font-style: italic;
}
.work-wt-tab.active {
  color: var(--color-background-default-knockout);
  background: var(--color-background-brand-subtle);
  border-bottom: 2px solid var(--color-background-brand);
  margin-bottom: -2px;
}
.wt-panel.active {
  display: block;
}
.wt-sec-body.open {
  display: block;
}
.draw-btn.active {
  background: var(--cbf-amber-attention);
}
.layer-control-container {
  background: transparent;
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
.layer-control-btn:hover {
  background: var(--color-background-brand-hover);
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
.zoom-we-btn:hover {
  background: var(--color-background-brand-hover);
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
.layer-section-title {
  font-size: 10px;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-content-default-knockout, #fff);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 5px;
}
.layer-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #ffffffbf;
  cursor: pointer;
  padding: 2px 0;
  user-select: none;
}
.layer-row input[type="radio"],
.layer-row input[type="checkbox"] {
  accent-color: var(--cbf-blue-500);
  cursor: pointer;
}
.layer-species-select {
  display: block;
  margin: 4px 0 6px 18px;
  --color-background-field: var(--color-background-default);
}
.layer-opacity-slider {
  display: block;
  width: 100%;
  margin: 2px 0 8px;
  --color-content-default: rgba(255, 255, 255, 0.85);
  --color-border-default: rgba(255, 255, 255, 0.25);
  --color-background-brand: var(--cbf-blue-500);
}
.ref-img-position-hint {
  background: var(--color-background-default-knockout);
  color: var(--color-content-default-knockout, #fff);
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: var(--typography-font-weight-bold);
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
  box-shadow: 0 2px 8px #0000004d;
  white-space: nowrap;
}
.msow-card:has(#mapwrap.drawing) :is(.msow-crumb-strip, .msow-toolbar, #wizard-panel, #sidebar),
.msow-card:has(#mapwrap.editing) :is(.msow-crumb-strip, .msow-toolbar, #wizard-panel, #sidebar),
.msow-card:has(#mapwrap.positioning-ref-image)
  :is(.msow-crumb-strip, .msow-toolbar, #wizard-panel, #sidebar) {
  opacity: 0.4;
  transition: opacity 0.2s ease;
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
.leg-section {
  margin-bottom: 5px;
}
.leg-section:last-child {
  margin-bottom: 0;
}
.leg-sec-title {
  font-size: 9px;
  color: var(--color-content-default-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 3px;
  font-weight: var(--typography-font-weight-semibold);
}
.leg-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 1px 0;
  font-size: 10px;
  color: var(--color-content-default);
  line-height: 1.4;
}
.leg-poly {
  width: 14px;
  height: 10px;
  flex-shrink: 0;
  border-radius: 1px;
  opacity: 0.6;
}
.leg-line {
  width: 14px;
  height: 3px;
  flex-shrink: 0;
  border-radius: 1px;
}
.elev-panel {
  background: var(--color-background-brand);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  padding: 10px;
  margin-top: 6px;
}
.elev-title {
  font-size: 10px;
  font-weight: var(--typography-font-weight-bold);
  color: #ffffffbf;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.elev-loading {
  font-size: 10px;
  color: #ffffff8c;
  font-style: italic;
  padding: 6px 0;
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
.msow-wizard-collapse-toggle:hover {
  background: var(--color-background-brand-subtle);
  color: var(--color-background-brand);
}
#msow-layout.wizard-collapsed .msow-wizard-collapse-toggle {
  transform: scaleX(-1);
}
.wz-v-steps {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-300) var(--spacing-500) var(--spacing-400);
  min-height: 0;
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
.wz-v-phase-head:hover .wz-v-phase-label {
  color: var(--color-content-default-secondary);
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
.wz-v-phase-count.done {
  color: var(--color-background-brand);
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
.wz-v-item--nav:hover {
  background: color-mix(in srgb, var(--color-background-default-knockout) 6%, transparent);
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
.wz-v-circle.done {
  background: var(--color-background-brand);
  border-color: var(--color-background-brand);
  color: var(--color-content-default-knockout, #fff);
}
.wz-v-circle.active {
  background: var(--color-background-brand-muted);
  border-color: var(--color-background-brand-muted);
  color: var(--color-content-default-knockout, #fff);
  box-shadow: 0 0 0 3px var(--color-border-brand, #c6dcf1);
}
.wz-v-circle.done.active {
  background: var(--color-background-brand-muted);
  border-color: var(--color-background-brand-muted);
  box-shadow: 0 0 0 3px var(--color-border-brand, #c6dcf1);
}
.wz-v-line {
  width: 2px;
  flex: 1;
  min-height: 10px;
  background: var(--color-border-default);
  margin-block: 2px;
}
.wz-v-line.done {
  background: var(--color-background-brand);
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
.wz-v-label.done {
  color: var(--color-content-default-tertiary);
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
.wz-help-head:hover {
  filter: brightness(0.97);
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
.wz-help-head.open .wz-help-caret {
  transform: rotate(180deg);
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
.wz-help-body.open {
  display: block;
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
.wz-action-btn:hover {
  background: var(--color-background-brand-hover);
}
.wz-action-btn.done {
  background: var(--color-background-brand);
}
.wz-action-btn.secondary {
  background: transparent;
  border-color: var(--color-border-default-strong);
  color: var(--color-content-default-secondary);
  font-weight: var(--typography-font-weight-semibold);
}
.wz-action-btn.secondary:hover {
  background: var(--color-background-brand-subtle);
}
.wz-action-btn:disabled {
  background: var(--color-border-default-subtle);
  color: var(--color-content-default-tertiary);
  cursor: default;
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
.wz-status.done {
  background: #edf7f2;
  border-left: 3px solid #0f6849;
  color: #0f6849;
}
.wz-status.warning {
  background: #fff8ee;
  border-left: 3px solid var(--cbf-amber-attention);
  color: #7a4a00;
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
.wz-btn-back:hover {
  background: var(--color-background-brand-subtle);
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
.wz-btn-next:hover {
  background: var(--color-background-brand-hover);
}
.wz-btn-next:disabled {
  background: var(--color-border-default-subtle);
  color: var(--color-content-default-tertiary);
  cursor: default;
}
.wz-btn-next.success {
  background: #0f6849;
}
.wz-btn-next.success:hover {
  background: #0a5038;
}
.wz-btn-next.skip {
  background: transparent;
  border: 1px solid var(--color-border-default-strong);
  color: var(--color-content-default-secondary);
}
.wz-btn-next.skip:hover {
  background: var(--color-background-brand-subtle);
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
.msow-pan-btn {
  background: var(--color-background-default-knockout);
  color: var(--color-content-default-knockout, #fff);
  border: none;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: var(--typography-font-weight-bold);
  cursor: pointer;
  box-shadow: 0 2px 8px #0000004d;
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
}
.msow-done-btn {
  background: var(--cbf-amber-attention);
  color: var(--color-content-default-knockout, #fff);
  border: none;
  padding: 6px 18px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: var(--typography-font-weight-bold);
  cursor: pointer;
  box-shadow: 0 2px 8px #0000004d;
  font-family: var(--typography-font-family-sans, system-ui, sans-serif);
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
.msow-crumb-strip .esa-breadcrumbs {
  --breadcrumbs-link-color: var(--color-content-default-secondary);
  --breadcrumbs-link-hover: var(--color-background-brand);
}
.msow-root {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}
@media (max-height: 800px) {
  html:has(.msow-page) .msow-crumb-strip {
    padding-block: var(--spacing-200, 8px);
  }
}
@media (max-height: 800px) {
  html:has(.msow-page) .msow-toolbar {
    padding-block: var(--spacing-200, 8px);
  }
}
.esa-nav-dropdown .esa-button__native > .esa-icon:last-child {
  transition: transform 0.15s ease;
}
.esa-nav-dropdown[open] .esa-button__native > .esa-icon:last-child {
  transform: rotate(180deg);
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
.esa-button--variant-primary {
  --_accent-text: var(--color-content-brand);
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: var(--_accent-border, transparent);
}
.esa-button--appearance-fill .esa-button__native:hover:not(:disabled) {
  background: var(--_accent-hover);
}
.esa-button--appearance-fill.esa-button--active .esa-button__native {
  background: var(--_accent-hover);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent-text);
  border-color: var(--_accent);
}
.esa-button--appearance-dashed .esa-button__native {
  border-style: dashed;
}
.esa-button--appearance-outline .esa-button__native:hover:not(:disabled),
.esa-button--appearance-dashed .esa-button__native:hover:not(:disabled) {
  background: var(--_btn-tint-hover);
}
.esa-button--appearance-outline.esa-button--active .esa-button__native,
.esa-button--appearance-dashed.esa-button--active .esa-button__native {
  background: var(--_btn-tint-active);
}
.esa-button--appearance-soft .esa-button__native {
  background: color-mix(
    in srgb,
    var(--color-background-elevation-sunken, #f0f0f0) 45%,
    var(--color-background-elevation-raised, #fcfcfc)
  );
  color: var(--_accent-text);
  border-color: var(--color-border-default-strong, #bbbbbb);
}
.esa-button--appearance-soft .esa-button__native:hover:not(:disabled),
.esa-button--appearance-soft.esa-button--active .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
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
.esa-button--variant-ghost .esa-button__native:hover:not(:disabled),
.esa-button--variant-ghost.esa-button--active .esa-button__native {
  background: var(--color-background-elevation-sunken, #f0f0f0);
}
.esa-button--variant-chrome .esa-button__native {
  background: transparent;
  color: inherit;
  border-color: transparent;
}
.esa-button--variant-chrome .esa-button__native:hover:not(:disabled),
.esa-button--variant-chrome.esa-button--active .esa-button__native,
.esa-button--variant-chrome.esa-button--current .esa-button__native {
  background: var(--button-chrome-bg-hover, color-mix(in srgb, currentColor 14%, transparent));
}
.esa-button--variant-chrome .esa-button__native:focus-visible {
  outline-color: currentColor;
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
.esa-button__native:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
}
.esa-button--icon-only .esa-button__native {
  padding-inline: var(--_btn-pad-y);
  aspect-ratio: 1;
}
summary.esa-button {
  list-style: none;
  cursor: pointer;
}
summary.esa-button::-webkit-details-marker {
  display: none;
}
summary.esa-button:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
  outline-offset: var(--focus-ring-offset, 2px);
  border-radius: var(--_btn-radius);
}
.esa-button__label {
  white-space: nowrap;
}
.esa-empty-state {
  --_empty-icon-size: var(--empty-state-icon-size-md, 48px);
  --_empty-gap: var(--spacing-200, 0.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-600, 2rem) var(--spacing-400, 1rem);
  gap: var(--_empty-gap);
}
.esa-empty-state--sm {
  --_empty-icon-size: var(--empty-state-icon-size-sm, 32px);
  padding: var(--spacing-400, 1rem) var(--spacing-300, 0.75rem);
}
.esa-empty-state__title {
  margin: 0;
  color: var(--color-content-default, #202020);
}
.esa-empty-state__description {
  margin: 0;
  color: var(--color-content-default-secondary, #646464);
  max-width: 360px;
}
.esa-empty-state__actions {
  margin-top: var(--spacing-200, 0.5rem);
}
.esa-empty-state__actions:empty {
  display: none;
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
.esa-breadcrumbs__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  color: var(--_crumb-link-color);
  text-decoration-color: transparent;
}
.esa-breadcrumbs__link:hover {
  color: var(--_crumb-link-hover);
  text-decoration: underline;
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
.esa-container {
  width: 100%;
  max-width: var(--_container-max, 1556px);
  margin-inline: auto;
  padding-inline: var(--spacing-600, 2rem);
}
```
