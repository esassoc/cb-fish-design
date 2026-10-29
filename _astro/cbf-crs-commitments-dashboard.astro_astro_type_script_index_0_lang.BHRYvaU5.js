import"./cbf-metrics-growth.astro_astro_type_script_index_0_lang.-CryuNyB.js";import"./cbf-legacy-sow-intro-modal.astro_astro_type_script_index_0_lang.BNeEZbXv.js";import"./cbf-legacy-we-selector.astro_astro_type_script_index_0_lang.8jfMTFNb.js";import{i as P,b as u,A as K,t as Y,a as z}from"./typography.C7xuE2z_.js";import{a as j}from"./a11y.c6v_nqwk.js";import{a as V}from"./announcer.dkeh-00N.js";import"./cbf-legacy-milestones-panel.astro_astro_type_script_index_0_lang.C3dGn_o2.js";import{C as U,a as H,Y as v}from"./crs-commitments.prRZzEXc.js";import"./boolish.DOQu-9JQ.js";const W={xs:"microcopy-xs",sm:"microcopy-sm",md:"microcopy-md",lg:"microcopy-lg"},J={xs:"microcopy-xs-strong",sm:"microcopy-sm-strong",md:"microcopy-md-strong",lg:"microcopy-lg-strong"},M={xs:"microcopy-xs-subtle",sm:"microcopy-sm-subtle",md:"microcopy-md-subtle",lg:"microcopy-lg-subtle"},Q={xs:"microcopy-xs-subtle",sm:"microcopy-sm-subtle",md:"microcopy-md-subtle",lg:"microcopy-lg-subtle"};class X extends P{constructor(){super(),this.onDocClick=t=>{this._open&&!t.composedPath().includes(this)&&this.closePanel()},this.onDocKeydown=t=>{t.key==="Escape"&&this._open&&this.closePanel()},this.togglePanel=()=>{const t=!this._open;this._open=t,t&&(this._highlighted=-1,requestAnimationFrame(()=>{this.renderRoot?.querySelector(".esa-filter-dropdown__search-input")?.focus()}))},this.onSearchInput=t=>{this._searchText=t.target.value,this._highlighted=-1},this.onKeydown=t=>{const r=this.filteredOptions,s=r.length-1;let o=this._highlighted;switch(t.key){case"ArrowDown":for(t.preventDefault(),o=o<s?o+1:0;r[o]?.disabled&&o<s;)o++;this._highlighted=o;break;case"ArrowUp":for(t.preventDefault(),o=o>0?o-1:s;r[o]?.disabled&&o>0;)o--;this._highlighted=o;break;case"Enter":t.preventDefault(),o>=0&&o<=s&&this.selectOption(r[o]);break;case"Escape":this.closePanel();break}},this.clear=t=>{t.stopPropagation(),this._selected=[],this.emitChange([])},this.wasEmpty=!1,this.name="",this.label="",this.options=[],this.multiple=!1,this.placeholder="",this.size="md",this._open=!1,this._searchText="",this._selected=[],this._highlighted=-1}static{this.properties={name:{type:String},label:{type:String},options:{type:Array},multiple:{type:Boolean,reflect:!0},placeholder:{type:String},size:{type:String,reflect:!0},_open:{state:!0},_searchText:{state:!0},_selected:{state:!0},_highlighted:{state:!0}}}closePanel(){if(!this._open)return;const t=this.renderRoot,r=!!t.activeElement;this._open=!1,r&&this.updateComplete.then(()=>{t.querySelector(".esa-filter-dropdown__trigger")?.focus()})}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocClick,!0),document.addEventListener("keydown",this.onDocKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocClick,!0),document.removeEventListener("keydown",this.onDocKeydown)}get filteredOptions(){const t=this._searchText.toLowerCase();return t?this.options.filter(r=>r.label.toLowerCase().includes(t)):this.options}get hasSelection(){return this._selected.length>0}get buttonLabel(){if(this.multiple||this._selected.length===0)return this.label;const t=this.options.find(r=>r.value===this._selected[0]);return`${this.label}: ${t?.label??this._selected[0]}`}isSelected(t){return this._selected.includes(t)}selectOption(t){if(t.disabled)return;const r=t.value;if(this.multiple){const o=this._selected.indexOf(r)>=0?this._selected.filter(l=>l!==r):[...this._selected,r];this._selected=o,this._searchText="",this.emitChange(o),requestAnimationFrame(()=>{this.renderRoot?.querySelector(".esa-filter-dropdown__search-input")?.focus()})}else this._selected=[r],this._searchText="",this.emitChange([r]),this.closePanel()}emitChange(t){const r=this.multiple?t:t[0]??void 0;this.dispatchEvent(new CustomEvent("selection-change",{detail:{value:r},bubbles:!0,composed:!0}));const s=t.map(o=>{const l=this.options.find(d=>d.value===o);return{name:this.name,label:this.label,value:o,displayValue:l?.label??o}});this.dispatchEvent(new CustomEvent("esa-filter-change",{detail:{name:this.name,filters:s},bubbles:!0,composed:!0}))}updated(){this.announceEmptyResults()}announceEmptyResults(){const t=this._open&&!!this._searchText.trim()&&this.filteredOptions.length===0;t&&!this.wasEmpty&&V("No options match",{assertive:!0}),this.wasEmpty=t}render(){const t=this.filteredOptions,r=this.hasSelection?J[this.size]:W[this.size];return u`
      <div class="esa-filter-dropdown">
        <button
          class="esa-filter-dropdown__trigger typography-${r} ${this.hasSelection?"esa-filter-dropdown__trigger--active":""}"
          type="button"
          aria-expanded=${this._open}
          aria-haspopup="listbox"
          @click=${this.togglePanel}
        >
          <span class="esa-filter-dropdown__label">${this.buttonLabel}</span>
          ${this.multiple&&this._selected.length>0?u`<span class="esa-filter-dropdown__count typography-microcopy-xs-strong"
                >${this._selected.length}</span
              >`:null}
          <span
            class="esa-filter-dropdown__arrow ${this._open?"esa-filter-dropdown__arrow--open":""}"
          >${Z}</span>
        </button>

        ${this._open?u`<div class="esa-filter-dropdown__panel" role="listbox" id="listbox">
              <div class="esa-filter-dropdown__search">
                <!-- The search input had no accessible name — only a placeholder,
                     which is not a name and vanishes as soon as you type. The cue is
                     what makes announcing the option list on every keystroke
                     unnecessary. aria-activedescendant is what makes arrow-key
                     navigation audible: focus stays here, so without it the
                     highlighted option changes silently. Both IDREFs resolve inside
                     this shadow root, which is the only place they can. -->
                <input
                  class="esa-filter-dropdown__search-input typography-${M[this.size]}"
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="listbox"
                  aria-label=${"Filter "+this.label}
                  aria-describedby="cue"
                  aria-activedescendant=${this._highlighted>=0?`opt-${this._highlighted}`:K}
                  placeholder=${this.placeholder||"Search..."}
                  .value=${this._searchText}
                  @input=${this.onSearchInput}
                  @keydown=${this.onKeydown}
                  autocomplete="off"
                />
                <span class="visually-hidden" id="cue"
                  >Options filter as you type. Use the up and down arrows to review
                  them, Enter to toggle one.</span
                >
              </div>
              <div class="esa-filter-dropdown__options" role="group" aria-label=${this.label}>
                ${t.length===0?u`<div class="esa-filter-dropdown__empty">No options match.</div>`:t.map((s,o)=>u`<div
                        class="esa-filter-dropdown__option typography-${Q[this.size]}
                          ${s.disabled?"esa-filter-dropdown__option--disabled":""}
                          ${this._highlighted===o?"esa-filter-dropdown__option--highlighted":""}"
                        role="option"
                        id="opt-${o}"
                        aria-selected=${this.isSelected(s.value)}
                        aria-disabled=${s.disabled??!1}
                        @click=${()=>this.selectOption(s)}
                      >
                        <esa-checkbox
                          class="esa-filter-dropdown__checkbox"
                          size="sm"
                          ?checked=${this.isSelected(s.value)}
                          ?disabled=${s.disabled}
                          aria-hidden="true"
                          tabindex="-1"
                        ></esa-checkbox>
                        ${s.color?u`<span
                              class="esa-filter-dropdown__option-dot"
                              style="background:${s.color}"
                            ></span>`:null}
                        <span class="esa-filter-dropdown__option-label">${s.label}</span>
                      </div>`)}
              </div>
              <div class="esa-filter-dropdown__footer">
                <button
                  type="button"
                  class="esa-filter-dropdown__clear-link typography-microcopy-sm"
                  ?disabled=${!this.hasSelection}
                  @click=${this.clear}
                >Clear all</button>
              </div>
            </div>`:null}
      </div>
    `}static{this.styles=[Y,j,z`
    :host {
      display: inline-block;

      --_filter-height: 40px;
      --_filter-padding-x: var(--spacing-400, 1rem);
      --_filter-radius: var(--radius-md, 0.5rem);
      --_filter-bg: var(--color-background-elevation-raised, #fcfcfc);
      --_filter-bg-active: var(--color-background-brand-subtle, #fbfefb);
      --_filter-text: var(--color-content-default, #202020);
      --_filter-text-active: var(--color-background-brand, #46a758);
      --_filter-border: var(--color-border-default, #cecece);
      --_filter-border-active: var(--color-background-brand, #46a758);
    }

    /* base :host = md. xs is one step below sm; sm/lg keep the old small/large values.
       The size steps carry geometry only — the text comes from a composite class
       named in render() (TRIGGER_TYPE / TRIGGER_ACTIVE_TYPE / OPTION_TYPE), so the
       trigger and the panel it opens stay on one rung by construction. */
    :host([size='xs']) {
      --_filter-height: 28px;
      --_filter-padding-x: var(--spacing-200, 0.5rem);
      --_filter-radius: var(--radius-sm, 0.25rem);
    }
    :host([size='sm']) {
      --_filter-height: 32px;
      --_filter-padding-x: var(--spacing-300, 0.75rem);
      --_filter-radius: var(--radius-sm, 0.25rem);
    }
    :host([size='lg']) {
      --_filter-height: 48px;
      --_filter-padding-x: var(--spacing-500, 1.5rem);
      --_filter-radius: var(--radius-md, 0.5rem);
    }

    .esa-filter-dropdown {
      position: relative;
      display: inline-flex;
    }

    .esa-filter-dropdown__trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-100, 0.25rem);
      height: var(--_filter-height);
      padding-inline: var(--_filter-padding-x);
      border: var(--border-width-default, 1px) solid var(--_filter-border);
      border-radius: var(--_filter-radius);
      background: var(--_filter-bg);
      color: var(--_filter-text);
      cursor: pointer;
      white-space: nowrap;
      transition:
        background var(--transition-fast, 150ms ease),
        border-color var(--transition-fast, 150ms ease),
        color var(--transition-fast, 150ms ease);
      -webkit-appearance: none;
      appearance: none;
    }
    .esa-filter-dropdown__trigger:hover:not(.esa-filter-dropdown__trigger--active) {
      border-color: var(--_filter-border-active);
    }
    .esa-filter-dropdown__trigger:focus-visible {
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
    }
    /* Weight comes from TRIGGER_ACTIVE_TYPE (label-*-strong) — same rung as the
       resting trigger, so applying a filter does not resize the bar. */
    .esa-filter-dropdown__trigger--active {
      background: var(--_filter-bg-active);
      border-color: var(--_filter-border-active);
      color: var(--_filter-text-active);
    }
    /* Open (panel showing) but nothing selected yet → just lift the border. */
    .esa-filter-dropdown__trigger[aria-expanded='true']:not(.esa-filter-dropdown__trigger--active) {
      border-color: var(--_filter-border-active);
    }

    .esa-filter-dropdown__label {
      /* clip/visible, not "overflow: hidden" — the trigger sets a microcopy composite,
         whose line-height "none" (1) leaves the line box 1em against DM Sans's 1.30em
         glyph box, so hiding the Y axis clips the descenders in a label like
         "Category" or "Region type". Same fix as esa-file-list's .file__name, where
         the arithmetic is written out. */
      overflow-x: clip;
      overflow-y: visible;
      text-overflow: ellipsis;
      max-width: 200px;
    }

    .esa-filter-dropdown__count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.25rem;
      height: 1.25rem;
      padding-inline: 0.3rem;
      border-radius: var(--radius-pill, 9999px);
      background: var(--color-background-brand, #46a758);
      color: var(--color-content-default-knockout, #fcfcfc);
    }

    .esa-filter-dropdown__arrow {
      display: inline-flex;
      width: 20px;
      height: 20px;
      transition: transform var(--transition-fast, 150ms ease);
    }
    .esa-filter-dropdown__arrow svg { width: 20px; height: 20px; }
    .esa-filter-dropdown__arrow--open {
      transform: rotate(180deg);
    }

    .esa-filter-dropdown__clear {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity var(--transition-fast, 150ms ease);
    }
    .esa-filter-dropdown__clear:hover { opacity: 1; }
    .esa-filter-dropdown__clear svg { width: 16px; height: 16px; }

    .esa-filter-dropdown__panel {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: var(--z-dropdown, 50);
      min-width: var(--filter-dropdown-min-width, 200px);
      max-height: 300px;
      background: var(--color-background-elevation-raised, #fcfcfc);
      border: var(--border-width-default, 1px) solid
        var(--color-border-default, #cecece);
      border-radius: var(--radius-md, 0.5rem);
      box-shadow: var(--elevation-4, 0 6px 24px -6px rgba(0, 0, 0, 0.07));
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .esa-filter-dropdown__search {
      padding: var(--spacing-200, 0.5rem);
      border-bottom: var(--border-width-default, 1px) solid var(--color-border-default, #cecece);
    }
    .esa-filter-dropdown__search-input {
      /* A real <input> — it cannot wrap, so leading only sets the box height. */
      width: 100%;
      box-sizing: border-box;
      padding: var(--spacing-100, 0.25rem) var(--spacing-200, 0.5rem);
      border: var(--border-width-default, 1px) solid var(--color-border-default, #cecece);
      border-radius: var(--radius-sm, 0.25rem);
      background: var(--color-background-elevation-raised, #fcfcfc);
      color: var(--color-content-default, #202020);
      /* Suppressed only because the :focus rule below paints the ring. */
      outline: none;
    }
    /* This ring was three problems in one rule until 2026-08-16: it was 1px, which
       is half the area Focus Appearance asks for; it read --color-background-brand
       directly, so a spoke re-pointing --focus-ring-color left this one field
       behind; and it fired on mouse. Now the house shape. :focus-visible is safe
       here even though it is a text input — engines match :focus-visible on text
       entry whether it was clicked or tabbed to. */
    .esa-filter-dropdown__search-input:focus-visible {
      border-color: var(--form-border-color-focus, #3e9b4f);
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
    }

    .esa-filter-dropdown__options {
      margin: 0;
      padding: var(--spacing-100, 0.25rem) 0;
      overflow-y: auto;
      max-height: 240px;
    }
    .esa-filter-dropdown__option {
      display: flex;
      align-items: center;
      gap: var(--spacing-200, 0.5rem);
      padding: var(--spacing-150, 0.375rem) var(--spacing-300, 0.75rem);
      color: var(--color-content-default, #202020);
      cursor: pointer;
      user-select: none;
      transition: background var(--transition-fast, 150ms ease);
    }
    .esa-filter-dropdown__option:hover:not(.esa-filter-dropdown__option--disabled),
    .esa-filter-dropdown__option--highlighted:not(.esa-filter-dropdown__option--disabled) {
      background: var(--color-background-elevation-sunken, #f0f0f0);
    }
    .esa-filter-dropdown__option--disabled {
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    }
    /* Display-only: the row owns the click so the box never double-toggles. */
    .esa-filter-dropdown__checkbox {
      pointer-events: none;
      flex-shrink: 0;
    }
    /* Optional per-option color dot (options[].color) */
    .esa-filter-dropdown__option-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .esa-filter-dropdown__option-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .esa-filter-dropdown__empty {
      padding: var(--spacing-300, 0.75rem);
      color: var(--color-content-default-secondary, #646464);
      font-style: var(--font-style-italic, italic);
      text-align: center;
    }

    .esa-filter-dropdown__footer {
      display: flex;
      justify-content: flex-end;
      padding: var(--spacing-200, 0.5rem);
      border-top: var(--border-width-default, 1px) solid var(--color-border-default, #cecece);
    }
    .esa-filter-dropdown__clear-link {
      background: none;
      border: none;
      color: var(--color-content-brand, #2a7e3b);
      cursor: pointer;
      padding: var(--spacing-100, 0.25rem) var(--spacing-200, 0.5rem);
      border-radius: var(--radius-sm, 0.25rem);
    }
    .esa-filter-dropdown__clear-link:hover:not(:disabled) {
      background: var(--color-background-elevation-sunken, #f0f0f0);
    }
    .esa-filter-dropdown__clear-link:disabled {
      color: var(--color-content-default-secondary, #646464);
      cursor: not-allowed;
    }

    /* FORCED COLORS. This list is the one that mostly survives already: selection
       is carried by a nested <esa-checkbox> with a real glyph and a real border,
       not by a row tint. Only the keyboard cursor needs restoring.

       The per-option colour dot is the exception — it is an inline
       per-option background colour with no label of any kind, so it is content
       rather than decoration and opts out. Without the opt-out every dot renders
       identically and the colour dimension of the filter is simply gone. */
    @media (forced-colors: active) {
      .esa-filter-dropdown__option--highlighted {
        outline: 2px solid CanvasText;
        outline-offset: -2px;
      }
      .esa-filter-dropdown__option--disabled { color: GrayText; }
      .esa-filter-dropdown__option-dot {
        forced-color-adjust: none;
        outline: 1px solid CanvasText;
      }
    }
  `]}}const Z=u`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>`;customElements.get("esa-filter-dropdown")||customElements.define("esa-filter-dropdown",X);class ee extends P{constructor(){super(),this.showTimeout=null,this.onGlobalKeydown=t=>{t.key!=="Escape"||!this.open||this.onLeave()},this.onEnter=()=>{this.open||!this.text||(this.showTimeout=setTimeout(()=>{this.open=!0},this.delay))},this.onLeave=()=>{this.showTimeout&&(clearTimeout(this.showTimeout),this.showTimeout=null),this.open=!1},this.text="",this.position="above",this.align="center",this.delay=200,this.open=!1}static{this.properties={text:{type:String},position:{type:String,reflect:!0},align:{type:String,reflect:!0},delay:{type:Number},open:{type:Boolean,reflect:!0}}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.onGlobalKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.onGlobalKeydown),this.showTimeout&&clearTimeout(this.showTimeout)}render(){return u`
      <span
        class="esa-tooltip-anchor typography-label-md"
        @mouseenter=${this.onEnter}
        @mouseleave=${this.onLeave}
        @focusin=${this.onEnter}
        @focusout=${this.onLeave}
      >
        <slot></slot>
        ${this.open&&this.text?u`
              <span
                class="esa-tooltip typography-microcopy-xs-subtle esa-tooltip--${this.position} esa-tooltip--align-${this.align}"
                role="tooltip"
              >
                <span class="esa-tooltip__text">${this.text}</span>
                <span class="esa-tooltip__arrow"></span>
              </span>
            `:null}
      </span>
    `}static{this.styles=[Y,z`
    :host { display: inline-block; }

    .esa-tooltip-anchor {
      position: relative;
      display: inline-flex;
    }

    .esa-tooltip {
      position: absolute;
      z-index: var(--z-tooltip, 600);
      background: var(--color-background-default-knockout);
      color: var(--color-content-default-knockout, #fcfcfc);
      padding: var(--spacing-150, 0.375rem) var(--spacing-250, 0.625rem);
      border-radius: var(--radius-sm, 0.25rem);
      /* Leading comes from microcopy-sm-subtle. This carried a tight override
         justified as "a tooltip may wrap to two or three lines" — but the rule
         below sets white-space: nowrap, so it never wraps and never did. The
         override was correcting for a case this component cannot produce.
         --tooltip-max-width is in the same position: nowrap makes it inert. */
      max-width: var(--tooltip-max-width, 240px);
      pointer-events: none;
      white-space: nowrap;
      box-shadow: var(--elevation-4, 0 6px 24px -6px rgba(0, 0, 0, 0.07));
      /* Enters by fading AND sliding 4px in from the side it sits on — the two
         transforms per position are the rest pose (--_to) and the pose one beat
         before it (--_from); the keyframe reads them so one animation serves all
         four placements. Reduced motion keeps the fade and drops the slide. */
      transform: var(--_to);
      animation: esa-tooltip-in var(--animation-enter, 150ms ease-out) both;
    }
    @keyframes esa-tooltip-in {
      from { opacity: 0; transform: var(--_from); }
      to { opacity: 1; transform: var(--_to); }
    }
    @keyframes esa-tooltip-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      .esa-tooltip { animation-name: esa-tooltip-fade; }
    }

    .esa-tooltip--above {
      bottom: calc(100% + 8px);
      left: 50%;
      --_from: translate(-50%, 4px);
      --_to: translate(-50%, 0);
    }
    .esa-tooltip--below {
      top: calc(100% + 8px);
      left: 50%;
      --_from: translate(-50%, -4px);
      --_to: translate(-50%, 0);
    }
    .esa-tooltip--left {
      right: calc(100% + 8px);
      top: 50%;
      --_from: translate(4px, -50%);
      --_to: translate(0, -50%);
    }
    .esa-tooltip--right {
      left: calc(100% + 8px);
      top: 50%;
      --_from: translate(-4px, -50%);
      --_to: translate(0, -50%);
    }

    /* start/end only mean something above or below; left/right keep the vertical centre. */
    .esa-tooltip--above.esa-tooltip--align-start,
    .esa-tooltip--below.esa-tooltip--align-start {
      left: 0;
      --_from: translate(0, var(--_dy));
      --_to: translate(0, 0);
    }
    .esa-tooltip--above.esa-tooltip--align-end,
    .esa-tooltip--below.esa-tooltip--align-end {
      left: auto;
      right: 0;
      --_from: translate(0, var(--_dy));
      --_to: translate(0, 0);
    }
    .esa-tooltip--above { --_dy: 4px; }
    .esa-tooltip--below { --_dy: -4px; }

    .esa-tooltip__arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--color-background-default-knockout);
      transform: rotate(45deg);
    }
    .esa-tooltip--above .esa-tooltip__arrow {
      bottom: -4px;
      left: 50%;
      margin-left: -4px;
    }
    .esa-tooltip--below .esa-tooltip__arrow {
      top: -4px;
      left: 50%;
      margin-left: -4px;
    }
    .esa-tooltip--left .esa-tooltip__arrow {
      right: -4px;
      top: 50%;
      margin-top: -4px;
    }
    .esa-tooltip--right .esa-tooltip__arrow {
      left: -4px;
      top: 50%;
      margin-top: -4px;
    }

    /* FORCED COLORS. This file ships no 'border:' at all — the tooltip is a dark
       knockout background and a shadow, and the mode flattens the first and
       deletes the second. The ARROW is hidden rather than bordered: it is a
       rotated 8px square, so a border round it renders as a diamond floating
       outside the bubble, and the bubble's own edge already does the job. */
    @media (forced-colors: active) {
      .esa-tooltip { border: 1px solid CanvasText; }
      .esa-tooltip__arrow { display: none; }
    }
  
    /* After the per-position arrow rules on purpose: same specificity, so source order decides. */
    .esa-tooltip--align-start .esa-tooltip__arrow { left: 12px; margin-left: -4px; }
    .esa-tooltip--align-end .esa-tooltip__arrow { left: auto; right: 8px; margin-left: 0; }
`]}}customElements.get("esa-tooltip")||customElements.define("esa-tooltip",ee);function te(e){const t=[];return v.forEach((r,s)=>{const o=e[String(r)],l=t[t.length-1];l&&l.status===o?(l.endIndex=s,l.span+=1):t.push({status:o,startIndex:s,endIndex:s,span:1})}),t}function oe(e){const t=v[e.startIndex],r=v[e.endIndex],s=e.status||"Unset";return e.span>1?`${t}–${r}: ${s}`:`${t}: ${s}`}function se(e){const t=v[e.startIndex],r=v[e.endIndex],s=e.status||"Unset";return e.span>1?`${s}, ${t}–${r} (${e.span} years)`:`${s}, ${t}`}function re(e,t){e.querySelectorAll(":scope > .cbf-crs-dashboard__segment-tip").forEach(d=>d.remove());const r=e.querySelector(".cbf-crs-dashboard__now-line"),s=e.getAttributeNames().find(d=>d.startsWith("data-astro-cid-")),o=te(t);o.forEach(d=>{const p=document.createElement("esa-tooltip");p.className="cbf-crs-dashboard__segment-tip",p.setAttribute("text",se(d)),p.style.gridColumn=`${d.startIndex+1} / ${d.endIndex+2}`;const f=document.createElement("span");f.className="cbf-crs-dashboard__segment",f.dataset.variant=H[d.status]??"secondary",s&&(p.setAttribute(s,""),f.setAttribute(s,"")),p.appendChild(f),r?e.insertBefore(p,r):e.appendChild(p)});const l=e.closest("[data-crs-row]")?.dataset.number??"";e.setAttribute("aria-label",`Status timeline for ${l}: ${o.map(oe).join("; ")}`)}const ae=[()=>!0,e=>e.commitmentType==="Reporting",e=>e.category==="Habitat"&&e.subcategory==="Tributary",e=>e.category==="Habitat"&&e.subcategory==="Estuary",e=>e.category==="Above Anadromy",e=>e.category==="Hatchery",e=>e.category==="Predation",e=>e.category==="Hydro",e=>e.subcategory==="RM&E"],ie={total:null,"in-progress":["In Progress"],"not-started":["Not Started"],delayed:["Delayed"],complete:["Complete"],closed:["Closed"],future:["Future"],unset:[""]};function ne(e){const t=e.querySelector("[data-crs-tabs]"),r=Array.from(e.querySelectorAll(".cbf-crs-dashboard__status-chip")),s=e.querySelector("[data-crs-search]"),o=e.querySelector("[data-crs-type-filter]"),l=e.querySelector("[data-crs-source-filter]"),d=Array.from(e.querySelectorAll("[data-crs-row]")),p=e.querySelector(".cbf-crs-dashboard__scroll"),f=e.querySelector("[data-crs-empty]"),L=new Map;e.querySelectorAll("[data-stat-key]").forEach(a=>{const i=a.querySelector(".esa-stat__value");i&&L.set(a.dataset.statKey??"",i)});let q=0,S="",R="",T=[],$=[];function m(){const a=ae[q]??(()=>!0),i=R.trim().toLowerCase(),n=[];for(const c of d){const g={category:c.dataset.category??"",subcategory:c.dataset.subcategory??"",commitmentType:c.dataset.type??""},x=c.dataset.status??"",k=JSON.parse(c.dataset.source||"[]"),E=a(g)&&(T.length===0||T.includes(g.commitmentType))&&($.length===0||k.some(G=>$.includes(G)))&&(S===""||x===S)&&(i===""||(c.dataset.search??"").includes(i));c.hidden=!E,E&&n.push(x)}for(const[c,g]of Object.entries(ie)){const x=g===null?n.length:n.filter(E=>g.includes(E)).length,k=L.get(c);k&&(k.textContent=String(x))}const h=n.length>0;f&&(f.hidden=h),p&&(p.hidden=!h)}const N=2,C=e.querySelector("[data-crs-trib-viz-open]");C?.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("crs-trib-viz:open"))}),t?.addEventListener("tabchange",a=>{const i=a.detail?.index;typeof i=="number"&&(q=i,C&&(C.hidden=i!==N),m())}),r.forEach(a=>{a.addEventListener("click",()=>{S=a.dataset.value??"",r.forEach(i=>i.setAttribute("aria-checked",String(i===a))),m()})});const O=a=>{const i=a.detail?.value;return Array.isArray(i)?i:[]};o?.addEventListener("selection-change",a=>{T=O(a),m()}),l?.addEventListener("selection-change",a=>{$=O(a),m()}),s?.addEventListener("input",()=>{R=s.value??"",m()});const y=e.querySelector("[data-crs-edit-toggle]"),A=e.querySelector("[data-crs-edit-dialog]"),I=e.querySelector("[data-crs-edit-desc]"),w=e.querySelector("[data-crs-edit-select]"),B=e.querySelector("[data-crs-edit-cancel]"),F=e.querySelector("[data-crs-edit-save]"),D=Array.from(e.querySelectorAll(".cbf-crs-dashboard__edit-cell"));let b=!1,_=null;y?.addEventListener("click",()=>{b=!b,e.classList.toggle("is-edit-mode",b),D.forEach(n=>{n.tabIndex=b?0:-1});const a=b?y.dataset.labelLeave:y.dataset.labelEnter,i=y.querySelector(".esa-button__label");i&&a&&(i.textContent=a)}),D.forEach(a=>{a.addEventListener("click",()=>{const i=a.closest("[data-crs-row]"),n=Number(a.dataset.year);if(!i||!Number.isFinite(n))return;const h=JSON.parse(i.dataset.statusByYear||"{}");_={row:i,year:n},I&&(I.textContent=`${i.dataset.title??""} (${i.dataset.number??""}) — status for ${n}`),w&&(w.value=h[String(n)]??""),A?.show()})}),B?.addEventListener("click",()=>{A?.close(),_=null}),F?.addEventListener("click",()=>{if(!_||!w)return;const{row:a,year:i}=_,n=JSON.parse(a.dataset.statusByYear||"{}"),h=w.value;h===""?delete n[String(i)]:n[String(i)]=h,a.dataset.statusByYear=JSON.stringify(n);const c=a.querySelector("[data-crs-bar]");c&&re(c,n),i===U&&(a.dataset.status=h,m()),document.querySelector("[data-snackbar]")?.success?.(`${a.dataset.number}: ${i} status set to ${h||"Unset"}.`,{duration:4e3}),A?.close(),_=null}),e.querySelectorAll("[data-crs-docmark]").forEach(a=>{a.addEventListener("click",()=>{const i=a.closest("[data-crs-row]");i&&document.dispatchEvent(new CustomEvent("crs-doc-due-dates:open",{detail:{number:i.dataset.number??"",title:i.dataset.title??"",year:Number(a.dataset.year)}}))})}),m()}document.querySelectorAll(".cbf-crs-dashboard").forEach(ne);
