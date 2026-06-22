import"./esa-text-field.astro_astro_type_script_index_0_lang.DAPKOTq0.js";import"./esa-select.COdDE1xG.js";import{i as V,b as l,A as b,a as R}from"./lit-element.CbK1SoNn.js";import"./esa-checkbox.astro_astro_type_script_index_0_lang.D19rEDlU.js";import"./esa-textarea.astro_astro_type_script_index_0_lang.Dv3mL_GI.js";class ze extends V{constructor(){super(),this._suppressNextOpen=!1,this.searchTimer=null,this.lastEmittedSearch="",this.onDocClick=e=>{this._open&&(e.composedPath().includes(this)||this.closeDropdown())},this.onSearchInput=e=>{const t=e.target.value;this._search=t,this._active=-1,this.emitSearch(t),this._open||this.openDropdown()},this.onInputFocus=()=>{if(this._suppressNextOpen){this._suppressNextOpen=!1;return}this._open||this.openDropdown()},this.onKeydown=e=>{const t=this.filteredOptions;switch(e.key){case"ArrowDown":if(e.preventDefault(),!this._open)return this.openDropdown();{let a=this._active+1;for(;a<t.length&&t[a].disabled;)a++;a<t.length&&(this._active=a)}break;case"ArrowUp":if(e.preventDefault(),!this._open)return this.openDropdown();{let a=this._active-1;for(;a>=0&&t[a].disabled;)a--;a>=0&&(this._active=a)}break;case"Enter":if(e.preventDefault(),this._open&&this._active>=0){const a=t[this._active];a&&!a.disabled&&this.selectOption(a)}else this._open||this.openDropdown();break;case"Escape":e.preventDefault(),this.closeDropdown();break;case"Tab":this.closeDropdown();break}},this.mode="select",this.triggerStyle="field",this.options=[],this.multiple=!1,this.size="md",this.label="",this.placeholder="Select...",this.disabled=!1,this.required=!1,this.helpText="",this.errorText="",this.loading=!1,this.debounceMs=300,this.resultsCount=null,this._search="",this._selected=[],this._open=!1,this._active=-1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={mode:{type:String,reflect:!0},triggerStyle:{type:String,attribute:"trigger-style"},options:{type:Array},multiple:{type:Boolean},size:{type:String,reflect:!0},label:{type:String},placeholder:{type:String},disabled:{type:Boolean,reflect:!0},required:{type:Boolean},helpText:{type:String,attribute:"help-text"},errorText:{type:String,attribute:"error-text"},loading:{type:Boolean},debounceMs:{type:Number,attribute:"debounce-ms"},resultsCount:{type:Number,attribute:"results-count"},_search:{state:!0},_selected:{state:!0},_open:{state:!0},_active:{state:!0}}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocClick),this.syncFormValue()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocClick),this.searchTimer&&clearTimeout(this.searchTimer)}set value(e){e==null?this._selected=[]:Array.isArray(e)?this._selected=e:this._selected=[e],this.syncFormValue()}get value(){return this.multiple?this._selected:this._selected[0]??""}get filteredOptions(){const e=this._search.toLowerCase();return e?this.options.filter(t=>t.label.toLowerCase().includes(e)):this.options}get displayValue(){return this._selected.length===0?"":this.multiple?this.options.filter(t=>this._selected.includes(t.value)).map(t=>t.label).join(", "):this.options.find(t=>t.value===this._selected[0])?.label??""}get selectedOptions(){return this.options.filter(e=>this._selected.includes(e.value))}get currentPlaceholder(){return this.multiple&&this._selected.length>0?"":this.placeholder}get inputValue(){return this.multiple?this._search:this._search||this.displayValue}isSelected(e){return this._selected.includes(e)}syncFormValue(){this.internals.setFormValue(this.multiple?this._selected.join(","):this._selected[0]??null)}emitValue(){this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}emitSearch(e){this.searchTimer&&clearTimeout(this.searchTimer),this.searchTimer=setTimeout(()=>{e!==this.lastEmittedSearch&&(this.lastEmittedSearch=e,this.dispatchEvent(new CustomEvent("search",{detail:{term:e},bubbles:!0,composed:!0})))},this.debounceMs)}toggleDropdown(){this.disabled||(this._open?this.closeDropdown():this.openDropdown())}openDropdown(){this.disabled||this._open||(this._open=!0,this._active=-1,this.mode==="select"&&requestAnimationFrame(()=>{this.renderRoot.querySelector(".search-input")?.focus()}))}closeDropdown(){this._open&&(this._open=!1,this._search="")}selectOption(e){if(e.disabled)return;const t=e.value;if(this.multiple){const a=this._selected.indexOf(t);this._selected=a>=0?this._selected.filter(c=>c!==t):[...this._selected,t],this._search="",this.emitValue();const n=this.mode==="autocomplete"?".input":".search-input";requestAnimationFrame(()=>this.renderRoot.querySelector(n)?.focus())}else this._selected=[t],this._search="",this.emitValue(),this.closeDropdown(),this.mode==="autocomplete"&&(this._suppressNextOpen=!0,requestAnimationFrame(()=>this.renderRoot.querySelector(".input")?.focus()))}removeValue(e,t){t?.stopPropagation(),this._selected=this._selected.filter(a=>a!==e),this.emitValue()}highlight(e){const t=this._search.trim();if(!t)return l`${e}`;const n=e.toLowerCase().indexOf(t.toLowerCase());return n<0?l`${e}`:l`${e.slice(0,n)}<mark class="hl">${e.slice(n,n+t.length)}</mark>${e.slice(n+t.length)}`}render(){const e=!!this.errorText;return l`
      <div class="field ${e?"field--error":""}">
        ${this.label?l`<label class="field__label">
              ${this.label}${this.required?l`<span class="field__required">*</span>`:null}
            </label>`:null}

        <div class="container">
          ${this.mode==="autocomplete"?this.renderAutocomplete():this.renderSelect()}
          ${this._open?this.renderDropdown():null}
        </div>

        ${e?l`<span class="field__error">${this.errorText}</span>`:this.helpText?l`<span class="field__help">${this.helpText}</span>`:null}
      </div>
    `}renderAutocomplete(){return l`
      ${this.multiple?this.renderChips():null}
      <div class="input-wrapper">
        <input
          class="input"
          role="combobox"
          aria-expanded=${this._open}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          placeholder=${this.currentPlaceholder}
          .value=${this.inputValue}
          ?disabled=${this.disabled}
          @input=${this.onSearchInput}
          @keydown=${this.onKeydown}
          @focus=${this.onInputFocus}
        />
        ${this.loading?l`<span class="spinner spinner--inline">${this.spinnerIcon()}</span>`:null}
      </div>
    `}renderSelect(){const e=this.triggerStyle==="field";return l`
      ${this.multiple&&e?this.renderChips():null}
      <button
        type="button"
        class="trigger ${e?"trigger--field":"trigger--text"}"
        ?disabled=${this.disabled}
        @click=${()=>this.toggleDropdown()}
        @keydown=${this.onKeydown}
      >
        <span class="trigger__label">${this.displayValue||this.placeholder}</span>
        <span class="arrow ${this._open?"arrow--open":""}">${this.chevronIcon()}</span>
      </button>
    `}renderChips(){return this.selectedOptions.length===0?b:l`<div class="chips">
      ${this.selectedOptions.map(e=>l`<span class="chip">
          <span class="chip__label">${e.label}</span>
          <button
            type="button"
            class="chip__remove"
            aria-label=${"Remove "+e.label}
            @click=${t=>this.removeValue(e.value,t)}
          >
            ${this.xIcon()}
          </button>
        </span>`)}
    </div>`}renderDropdown(){const e=this.filteredOptions;return l`<div class="dropdown" role="listbox" @keydown=${this.onKeydown}>
      ${this.mode==="select"?l`<div class="search">
            ${this.searchIcon()}
            <input
              class="search-input"
              placeholder="Search..."
              .value=${this._search}
              @input=${this.onSearchInput}
              @keydown=${this.onKeydown}
            />
            ${this.loading?l`<span class="spinner">${this.spinnerIcon()}</span>`:null}
          </div>`:null}

      ${this.resultsCount!==null?l`<div class="results-count">Displaying ${e.length} of ${this.resultsCount} results</div>`:null}

      <div class="viewport">
        ${e.map((t,a)=>{const n=this.isSelected(t.value);return l`<div
            class="option ${a===this._active?"option--active":""} ${n?"option--selected":""} ${t.disabled?"option--disabled":""}"
            role="option"
            aria-selected=${n}
            @click=${()=>this.selectOption(t)}
            @mouseenter=${()=>this._active=a}
          >
            ${this.multiple?l`<span class="check ${n?"check--selected":""}">${this.checkIcon()}</span>`:null}
            <span class="option__label">${this.highlight(t.label)}</span>
          </div>`})}
      </div>

      ${e.length===0&&!this.loading?l`<div class="empty">${this._search?"No results found":"No options available"}</div>`:null}
      ${this.loading&&e.length===0?l`<div class="loading"><span class="spinner">${this.spinnerIcon()}</span> Searching...</div>`:null}
    </div>`}chevronIcon(){return l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>`}checkIcon(){return l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>`}xIcon(){return l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>`}searchIcon(){return l`<svg class="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>`}spinnerIcon(){return l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>`}static{this.styles=R`
    :host {
      display: block;
      --_field-padding-y: var(--form-padding-y-md, 8px);
      --_field-padding-x: var(--form-padding-x-md, 12px);
      --_field-font-size: var(--form-font-size-md, 14px);
      --_field-height: var(--form-height-md, 40px);
      --_field-radius: var(--form-radius-md, 8px);
      --_field-border-color: var(--form-border-color, #d4d4d4);
    }
    :host([size='xs']) {
      --_field-padding-y: var(--form-padding-y-xs, 2px);
      --_field-padding-x: var(--form-padding-x-xs, 8px);
      --_field-font-size: var(--form-font-size-xs, 11px);
      --_field-height: var(--form-height-xs, 28px);
      --_field-radius: var(--form-radius-xs, 4px);
    }
    :host([size='sm']) {
      --_field-padding-y: var(--form-padding-y-sm, 4px);
      --_field-padding-x: var(--form-padding-x-sm, 8px);
      --_field-font-size: var(--form-font-size-sm, 12px);
      --_field-height: var(--form-height-sm, 32px);
      --_field-radius: var(--form-radius-sm, 6px);
    }
    :host([size='lg']) {
      --_field-padding-y: var(--form-padding-y-lg, 12px);
      --_field-padding-x: var(--form-padding-x-lg, 16px);
      --_field-font-size: var(--form-font-size-lg, 16px);
      --_field-height: var(--form-height-lg, 48px);
      --_field-radius: var(--form-radius-lg, 10px);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-100, 4px);
    }
    .field__label {
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_field-font-size);
      font-weight: var(--font-weight-medium, 450);
      color: var(--form-label-color, #171717);
    }
    .field__required {
      color: var(--color-danger, #ef4444);
      margin-left: 2px;
    }
    .field__help {
      font-size: var(--type-size-150, 12px);
      color: var(--form-help-color, #737373);
    }
    .field__error {
      font-size: var(--type-size-150, 12px);
      color: var(--form-error-color, #ef4444);
    }

    .container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-100, 4px);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input {
      width: 100%;
      height: var(--_field-height);
      padding: var(--_field-padding-y) var(--_field-padding-x);
      padding-inline-end: calc(var(--_field-padding-x) + 24px);
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_field-font-size);
      color: var(--form-text-color, #171717);
      background: var(--form-bg, #fff);
      border: var(--form-border-width, 1px) solid var(--_field-border-color);
      border-radius: var(--_field-radius);
      outline: none;
      box-sizing: border-box;
      transition:
        border-color var(--transition-fast, 150ms ease),
        box-shadow var(--transition-fast, 150ms ease);
    }
    .input::placeholder {
      color: var(--form-placeholder-color, #737373);
    }
    .input:focus {
      --_field-border-color: var(--form-border-color-focus, #43608a);
      box-shadow: 0 0 0 2px var(--focus-ring-color, rgba(0, 88, 98, 0.25));
    }
    .input:disabled {
      background: var(--form-bg-disabled, #efefef);
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinner {
      display: inline-flex;
      color: var(--color-text-muted, #737373);
      animation: esa-cb-spin 1s linear infinite;
    }
    .spinner svg {
      width: var(--icon-size-small, 16px);
      height: var(--icon-size-small, 16px);
    }
    .spinner--inline {
      position: absolute;
      right: var(--_field-padding-x);
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
    @keyframes esa-cb-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .spinner--inline {
      animation: esa-cb-spin-inline 1s linear infinite;
    }
    @keyframes esa-cb-spin-inline {
      from {
        transform: translateY(-50%) rotate(0deg);
      }
      to {
        transform: translateY(-50%) rotate(360deg);
      }
    }

    .trigger--text {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-100, 4px);
      padding: 0;
      border: none;
      background: none;
      color: var(--color-primary, #43608a);
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_field-font-size);
      font-weight: var(--font-weight-medium, 450);
      cursor: pointer;
      max-width: 100%;
    }
    .trigger--text:hover {
      color: var(--color-primary-hover, #39506f);
      text-decoration: underline;
    }
    .trigger--text:focus-visible {
      outline: 2px solid var(--focus-ring-color, rgba(0, 88, 98, 0.25));
      outline-offset: 2px;
      border-radius: var(--_field-radius);
    }
    .trigger--text:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .trigger--text .trigger__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .trigger--field {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--_field-height);
      padding: var(--_field-padding-y) var(--_field-padding-x);
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_field-font-size);
      color: var(--form-text-color, #171717);
      background: var(--form-bg, #fff);
      border: var(--form-border-width, 1px) solid var(--_field-border-color);
      border-radius: var(--_field-radius);
      cursor: pointer;
      text-align: left;
      box-sizing: border-box;
      transition:
        border-color var(--transition-fast, 150ms ease),
        box-shadow var(--transition-fast, 150ms ease);
    }
    .trigger--field:focus-visible {
      border-color: var(--form-border-color-focus, #43608a);
      box-shadow: 0 0 0 2px var(--focus-ring-color, rgba(0, 88, 98, 0.25));
      outline: none;
    }
    .trigger--field:disabled {
      background: var(--form-bg-disabled, #efefef);
      opacity: 0.6;
      cursor: not-allowed;
    }
    .trigger--field .trigger__label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .arrow {
      display: inline-flex;
      color: var(--color-text-muted, #737373);
      pointer-events: none;
      transition: transform var(--transition-fast, 150ms ease);
      flex-shrink: 0;
    }
    .arrow svg {
      width: var(--icon-size-small, 16px);
      height: var(--icon-size-small, 16px);
    }
    .arrow--open {
      transform: rotate(180deg);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: var(--z-dropdown, 50);
      margin-top: var(--spacing-100, 4px);
      background: var(--color-surface, #fff);
      border: var(--form-border-width, 1px) solid var(--form-border-color, #e5e5e5);
      border-radius: var(--form-radius-md, 8px);
      box-shadow: var(--shadow-200, 0 4px 12px rgba(0, 0, 0, 0.12));
      overflow: hidden;
    }

    .search {
      display: flex;
      align-items: center;
      gap: var(--spacing-200, 8px);
      padding: var(--spacing-200, 8px) var(--spacing-300, 12px);
      border-bottom: 1px solid var(--color-border, #e5e5e5);
    }
    .search__icon {
      width: var(--icon-size-small, 16px);
      height: var(--icon-size-small, 16px);
      color: var(--color-text-muted, #737373);
      flex-shrink: 0;
    }
    .search-input {
      flex: 1;
      border: none;
      background: none;
      outline: none;
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_field-font-size);
      color: var(--form-text-color, #171717);
    }
    .search-input::placeholder {
      color: var(--form-placeholder-color, #737373);
    }

    .results-count {
      padding: var(--spacing-100, 4px) var(--spacing-300, 12px);
      font-size: var(--type-size-100, 11px);
      color: var(--color-text-muted, #737373);
      border-bottom: 1px solid var(--color-border-light, #efefef);
    }

    .viewport {
      max-height: 252px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--spacing-100, 4px);
      padding: var(--spacing-200, 8px) var(--spacing-300, 12px);
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_field-font-size);
      color: var(--color-text-primary, #171717);
      cursor: pointer;
      user-select: none;
      transition: background var(--transition-fast, 150ms ease);
      box-sizing: border-box;
    }
    .option:hover,
    .option--active {
      background: var(--color-surface-sunken, #efefef);
    }
    .option--selected {
      background: var(--color-active-overlay, rgba(0, 88, 98, 0.08));
      color: var(--color-primary, #43608a);
    }
    .option--disabled {
      color: var(--color-disabled-text, #a3a3a3);
      cursor: not-allowed;
      opacity: 0.6;
    }
    .option--disabled:hover {
      background: transparent;
    }
    .option__label {
      flex: 1;
    }
    .hl {
      background: var(--color-warning-subtle, #fffbeb);
      color: inherit;
      border-radius: 2px;
      padding: 0 1px;
    }

    .check {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      opacity: 0;
      color: var(--color-primary, #43608a);
      transition: opacity var(--transition-fast, 150ms ease);
    }
    .check svg {
      width: 16px;
      height: 16px;
    }
    .check--selected {
      opacity: 1;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-100, 4px);
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-050, 2px);
      padding: var(--spacing-050, 2px) var(--spacing-100, 4px) var(--spacing-050, 2px) var(--spacing-200, 8px);
      background: var(--color-active-overlay, rgba(0, 88, 98, 0.08));
      color: var(--color-primary, #43608a);
      border-radius: var(--radius-full, 9999px);
      font-family: var(--font-sans, sans-serif);
      font-size: var(--type-size-150, 12px);
      line-height: 1.4;
      user-select: none;
    }
    .chip__label {
      white-space: nowrap;
    }
    .chip__remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--color-primary, #43608a);
      border-radius: 50%;
      cursor: pointer;
      transition: background var(--transition-fast, 150ms ease);
    }
    .chip__remove svg {
      width: 14px;
      height: 14px;
    }
    .chip__remove:hover {
      background: var(--color-hover-overlay-strong, rgba(0, 0, 0, 0.05));
    }
    .chip__remove:focus-visible {
      outline: 2px solid var(--focus-ring-color, rgba(0, 88, 98, 0.25));
      outline-offset: 1px;
    }

    .empty,
    .loading {
      display: flex;
      align-items: center;
      gap: var(--spacing-200, 8px);
      padding: var(--spacing-300, 12px);
      color: var(--color-text-muted, #737373);
      font-size: var(--_field-font-size);
      font-style: italic;
    }

    .field--error .input,
    .field--error .trigger--field {
      --_field-border-color: var(--form-border-color-error, #ef4444);
    }
    .field--error .input:focus,
    .field--error .trigger--field:focus-visible {
      box-shadow: 0 0 0 2px var(--color-danger-border, rgba(211, 47, 47, 0.25));
    }
  `}}customElements.get("esa-combobox")||customElements.define("esa-combobox",ze);class De extends V{constructor(){super(),this.previousFocus=null,this.confirm=()=>this.resolve(!0),this.cancel=()=>this.resolve(!1),this.onKeydown=e=>{if(this.open){if(e.key==="Escape")e.preventDefault(),this.cancel();else if(e.key==="Tab"){const t=this.renderRoot,a=Array.from(t.querySelectorAll("button:not([disabled])"));if(a.length===0)return;const n=a[0],c=a[a.length-1],h=t.activeElement;e.shiftKey&&h===n?(e.preventDefault(),c.focus()):!e.shiftKey&&h===c&&(e.preventDefault(),n.focus())}}},this.open=!1,this.heading="",this.message="",this.variant="default",this.confirmLabel="Confirm",this.cancelLabel="Cancel",this.showIcon=!0}static{this.properties={open:{type:Boolean,reflect:!0},heading:{type:String},message:{type:String},variant:{type:String,reflect:!0},confirmLabel:{type:String,attribute:"confirm-label"},cancelLabel:{type:String,attribute:"cancel-label"},showIcon:{type:Boolean,attribute:"show-icon"}}}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this.onKeydown)}updated(e){e.has("open")&&(this.open?(this.previousFocus=document.activeElement,requestAnimationFrame(()=>{this.renderRoot.querySelector(".esa-confirm-dialog__confirm")?.focus()})):this.previousFocus&&(this.previousFocus.focus?.(),this.previousFocus=null))}show(){this.open=!0}resolve(e){this.open=!1,this.dispatchEvent(new CustomEvent(e?"confirm":"cancel",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("resolved",{detail:{confirmed:e},bubbles:!0,composed:!0}))}icon(){return this.showIcon?this.variant==="danger"?l`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`:this.variant==="warning"?l`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`:l`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`:null}render(){return this.open?l`
      <div class="esa-confirm-dialog__backdrop" @click=${this.cancel}></div>
      <div class="esa-confirm-dialog__panel">
        <div class="esa-confirm-dialog" role="alertdialog" aria-modal="true" aria-label=${this.heading}>
          <div class="esa-confirm-dialog__content">
            ${this.showIcon?l`<div class="esa-confirm-dialog__icon esa-confirm-dialog__icon--${this.variant}">${this.icon()}</div>`:null}
            <h2 class="esa-confirm-dialog__title">${this.heading}</h2>
            <p class="esa-confirm-dialog__message">${this.message}</p>
          </div>
          <div class="esa-confirm-dialog__footer">
            <button class="esa-confirm-dialog__btn esa-confirm-dialog__btn--outline" @click=${this.cancel}>${this.cancelLabel}</button>
            <button
              class="esa-confirm-dialog__confirm esa-confirm-dialog__btn esa-confirm-dialog__btn--${this.variant==="default"?"primary":this.variant}"
              @click=${this.confirm}
            >${this.confirmLabel}</button>
          </div>
        </div>
      </div>
    `:l``}static{this.styles=R`
    :host { display: contents; }

    .esa-confirm-dialog__backdrop {
      position: fixed;
      inset: 0;
      background: var(--confirm-dialog-backdrop-bg, var(--color-backdrop, rgba(0, 0, 0, 0.5)));
      z-index: var(--z-modal-backdrop, 300);
    }
    .esa-confirm-dialog__panel {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--z-modal, 400);
      pointer-events: none;
    }
    .esa-confirm-dialog {
      pointer-events: auto;
      width: var(--confirm-dialog-width, 360px);
      max-width: calc(100vw - 2rem);
      background: var(--confirm-dialog-bg, var(--color-surface-elevated, #ffffff));
      border-radius: var(--confirm-dialog-radius, var(--radius-400, 0.75rem));
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
    }

    .esa-confirm-dialog__content {
      padding: var(--spacing-500, 1.5rem);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .esa-confirm-dialog__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--radius-full, 9999px);
      margin-bottom: var(--spacing-300, 0.75rem);
    }
    .esa-confirm-dialog__icon--default {
      background: var(--color-info-subtle, #eff6ff);
      color: var(--color-info, #3b82f6);
    }
    .esa-confirm-dialog__icon--danger {
      background: var(--color-danger-subtle, #fef2f2);
      color: var(--color-danger, #ef4444);
    }
    .esa-confirm-dialog__icon--warning {
      background: var(--color-warning-subtle, #fffbeb);
      color: var(--color-warning, #f59e0b);
    }
    .esa-confirm-dialog__title {
      font-size: var(--type-size-400, 1.125rem);
      font-weight: var(--font-weight-semibold, 550);
      margin: 0 0 var(--spacing-150, 0.375rem);
      color: var(--confirm-dialog-color, var(--color-text-primary, #171717));
    }
    .esa-confirm-dialog__message {
      color: var(--confirm-dialog-color, var(--color-text-secondary, #525252));
      font-size: var(--type-size-200, 0.9375rem);
      line-height: var(--line-height-normal, 1.6);
      margin: 0;
    }

    .esa-confirm-dialog__footer {
      padding: var(--spacing-300, 0.75rem) var(--spacing-500, 1.5rem);
      border-top: 1px solid var(--confirm-dialog-border-color, var(--color-border-light, #efefef));
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-200, 0.5rem);
    }

    .esa-confirm-dialog__btn {
      padding: var(--spacing-200, 0.5rem) var(--spacing-400, 1rem);
      border-radius: var(--radius-200, 0.5rem);
      font-family: inherit;
      font-size: var(--type-size-200, 0.9375rem);
      font-weight: var(--font-weight-medium, 450);
      cursor: pointer;
      border: 1px solid transparent;
      transition: background var(--transition-fast, 150ms ease);
    }
    .esa-confirm-dialog__btn:focus-visible {
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #43608a);
      outline-offset: var(--focus-ring-offset, 2px);
    }
    .esa-confirm-dialog__btn--outline {
      background: transparent;
      border-color: var(--color-border-strong, #d4d4d4);
      color: var(--color-text-primary, #171717);
    }
    .esa-confirm-dialog__btn--outline:hover { background: var(--color-surface-sunken, #efefef); }
    .esa-confirm-dialog__btn--primary {
      background: var(--color-primary, #43608a);
      color: var(--color-text-inverse, #ffffff);
    }
    .esa-confirm-dialog__btn--primary:hover { background: var(--color-primary-hover, #39506f); }
    .esa-confirm-dialog__btn--danger {
      background: var(--color-danger, #ef4444);
      color: var(--color-text-inverse, #ffffff);
    }
    .esa-confirm-dialog__btn--danger:hover { background: #dc2626; }
    .esa-confirm-dialog__btn--warning {
      background: var(--color-warning, #f59e0b);
      color: var(--color-text-inverse, #ffffff);
    }
    .esa-confirm-dialog__btn--warning:hover { background: #d97706; }
  `}}customElements.get("esa-confirm-dialog")||customElements.define("esa-confirm-dialog",De);const P=["January","February","March","April","May","June","July","August","September","October","November","December"],Ce=["Su","Mo","Tu","We","Th","Fr","Sa"],de=[];for(let i=1990;i<=2060;i++)de.push(i);function le(i){if(!i)return null;const e=i.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const t=parseInt(e[1],10),a=parseInt(e[2],10)-1,n=parseInt(e[3],10),c=new Date(t,a,n);return c.getFullYear()!==t||c.getMonth()!==a||c.getDate()!==n?null:c}function ce(i){return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function Y(i,e){return i.getFullYear()===e.getFullYear()&&i.getMonth()===e.getMonth()&&i.getDate()===e.getDate()}function B(i){return`${String(i.getMonth()+1).padStart(2,"0")}/${String(i.getDate()).padStart(2,"0")}/${i.getFullYear()}`}function A(i){const e=i.trim();if(!e)return null;const t=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);if(t){const n=t[3].length===2?2e3+parseInt(t[3]):parseInt(t[3]),c=new Date(n,parseInt(t[1])-1,parseInt(t[2]));if(c.getMonth()===parseInt(t[1])-1&&c.getDate()===parseInt(t[2]))return c}const a=new Date(e);return isNaN(a.getTime())?null:a}function Ee(i,e=!1){const t=i.slice(0,8);return t.length===0?"":t.length<2?t:t.length===2?e?t:`${t}/`:t.length<4?`${t.slice(0,2)}/${t.slice(2)}`:t.length===4?e?`${t.slice(0,2)}/${t.slice(2)}`:`${t.slice(0,2)}/${t.slice(2)}/`:`${t.slice(0,2)}/${t.slice(2,4)}/${t.slice(4)}`}class Le extends V{static formAssociated=!0;static properties={label:{type:String},placeholder:{type:String},required:{type:Boolean},disabled:{type:Boolean,reflect:!0},errorText:{type:String,attribute:"error-text"},helpText:{type:String,attribute:"help-text"},value:{type:String},_open:{state:!0},_viewYear:{state:!0},_viewMonth:{state:!0},_monthOpen:{state:!0},_yearOpen:{state:!0},_monthSearch:{state:!0},_yearSearch:{state:!0},_inputText:{state:!0}};internals;_onDocClick=e=>{this._open&&!e.composedPath().includes(this)&&this._close()};_onSiblingOpen=e=>{e.detail?.source!==this&&this._open&&this._close()};constructor(){super(),this.label="",this.placeholder="MM/DD/YYYY",this.required=!1,this.disabled=!1,this.errorText="",this.helpText="",this.value="";const e=new Date;this._viewYear=e.getFullYear(),this._viewMonth=e.getMonth(),this._open=!1,this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch="",this._inputText="",this.internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick),document.addEventListener("bcn-date-picker:open",this._onSiblingOpen)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick),document.removeEventListener("bcn-date-picker:open",this._onSiblingOpen)}updated(e){if(e.has("value")){this.internals.setFormValue(this.value||null);const t=le(this.value);if(t){this._viewYear=t.getFullYear(),this._viewMonth=t.getMonth();const a=A(this._inputText);(!a||!Y(a,t))&&(this._inputText=B(t))}else this.value||(this._inputText="")}}_calendarCells(){const e=new Date(this._viewYear,this._viewMonth,1),t=new Date(this._viewYear,this._viewMonth+1,0).getDate(),a=[];for(let n=0;n<e.getDay();n++)a.push(null);for(let n=1;n<=t;n++)a.push(new Date(this._viewYear,this._viewMonth,n));for(;a.length%7!==0;)a.push(null);return a}_onTextInput(e){const t=e.target,a=e.inputType==="insertFromPaste",n=e.inputType?.startsWith("delete")??!1;let c;if(a){const u=A(t.value);c=u?B(u):t.value}else{const u=t.value.replace(/\D/g,"").slice(0,8);c=Ee(u,n)}t.value=c,this._inputText=c;const h=A(c);h?(this.value=ce(h),this.internals.setFormValue(this.value),this._viewYear=h.getFullYear(),this._viewMonth=h.getMonth(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))):c||(this.value="",this.internals.setFormValue(null),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}_onTextBlur(){if(!this._inputText)return;const e=A(this._inputText);e&&(this._inputText=B(e))}_toggle(e){e.stopPropagation(),!this.disabled&&(this._open=!this._open,this._open?document.dispatchEvent(new CustomEvent("bcn-date-picker:open",{detail:{source:this}})):this._closeNavDropdowns())}_close(){this._open=!1,this._closeNavDropdowns()}_closeNavDropdowns(){this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch=""}_toggleMonth(e){e.stopPropagation(),this._monthOpen=!this._monthOpen,this._yearOpen=!1,this._monthSearch="",this._monthOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--month")?.focus()})}_toggleYear(e){e.stopPropagation(),this._yearOpen=!this._yearOpen,this._monthOpen=!1,this._yearSearch="",this._yearOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--year")?.focus(),this.shadowRoot?.querySelector(".cal-nav__option.is-selected")?.scrollIntoView({block:"nearest"})})}_selectMonth(e,t){t.stopPropagation(),this._viewMonth=e,this._monthOpen=!1,this._monthSearch=""}_selectYear(e,t){t.stopPropagation(),this._viewYear=e,this._yearOpen=!1,this._yearSearch=""}_selectDay(e){this.value=ce(e),this.internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this._close()}_selectToday(){const e=new Date;e.setHours(0,0,0,0),this._selectDay(e)}_onKeyDown(e){e.key==="Escape"&&(this._monthOpen||this._yearOpen?(this._closeNavDropdowns(),e.stopPropagation()):this._open&&(this._close(),e.stopPropagation()))}_onCalendarClick(e){if(!this._monthOpen&&!this._yearOpen)return;const t=e.composedPath();let a=!1;this.shadowRoot?.querySelectorAll(".cal-nav").forEach(n=>{t.includes(n)&&(a=!0)}),a||this._closeNavDropdowns()}_renderMonthCombo(){const e=P.filter(t=>t.toLowerCase().includes(this._monthSearch.toLowerCase()));return l`
      <div class="cal-nav" data-type="month">
        <button type="button"
          class="cal-nav__trigger${this._monthOpen?" is-open":""}"
          @click=${this._toggleMonth}
          aria-haspopup="listbox"
          aria-expanded=${String(this._monthOpen)}
          aria-label="Select month">
          ${P[this._viewMonth]}
          <svg class="cal-nav__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${this._monthOpen?l`
          <div class="cal-nav__panel" @click=${t=>t.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--month"
              placeholder="Month…"
              .value=${this._monthSearch}
              @input=${t=>{this._monthSearch=t.target.value}}
              aria-label="Search months"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${e.length===0?l`<p class="cal-nav__empty">No match</p>`:e.map(t=>{const a=P.indexOf(t),n=a===this._viewMonth;return l`<button type="button" role="option"
                    class="cal-nav__option${n?" is-selected":""}"
                    aria-selected=${String(n)}
                    @click=${c=>this._selectMonth(a,c)}>${t}</button>`})}
            </div>
          </div>`:b}
      </div>`}_renderYearCombo(){const e=de.filter(t=>String(t).includes(this._yearSearch));return l`
      <div class="cal-nav" data-type="year">
        <button type="button"
          class="cal-nav__trigger${this._yearOpen?" is-open":""}"
          @click=${this._toggleYear}
          aria-haspopup="listbox"
          aria-expanded=${String(this._yearOpen)}
          aria-label="Select year">
          ${this._viewYear}
          <svg class="cal-nav__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${this._yearOpen?l`
          <div class="cal-nav__panel" @click=${t=>t.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--year"
              placeholder="Year…"
              .value=${this._yearSearch}
              @input=${t=>{this._yearSearch=t.target.value}}
              aria-label="Search years"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${e.length===0?l`<p class="cal-nav__empty">No match</p>`:e.map(t=>{const a=t===this._viewYear;return l`<button type="button" role="option"
                    class="cal-nav__option${a?" is-selected":""}"
                    aria-selected=${String(a)}
                    @click=${n=>this._selectYear(t,n)}>${t}</button>`})}
            </div>
          </div>`:b}
      </div>`}render(){const e=le(this.value),t=new Date;t.setHours(0,0,0,0);const a=this._calendarCells(),n=!!this.errorText;return l`
      <div class="field" @keydown=${this._onKeyDown}>

        ${this.label?l`
          <label class="field__label" @click=${()=>this.shadowRoot?.querySelector(".date-input")?.focus()}>
            ${this.label}${this.required?l`<span class="field__req" aria-hidden="true">&thinsp;*</span>`:b}
          </label>`:b}

        <div class="field__wrap">
          <div class="field__row${n?" has-error":""}">
            <input
              type="text"
              class="date-input"
              placeholder=${this.placeholder}
              .value=${this._inputText}
              @input=${this._onTextInput}
              @blur=${this._onTextBlur}
              ?disabled=${this.disabled}
              aria-label=${this.label||"Date"}
              autocomplete="off"
            />
            <button
              type="button"
              class="cal-btn${this._open?" is-open":""}"
              ?disabled=${this.disabled}
              aria-haspopup="dialog"
              aria-expanded=${String(this._open)}
              aria-label="Open date picker"
              @click=${this._toggle}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </button>
          </div>

          ${this._open?l`
            <div class="calendar" role="dialog" aria-label="Date picker"
              @click=${this._onCalendarClick}>

              <div class="calendar__header">
                ${this._renderMonthCombo()}
                ${this._renderYearCombo()}
                <button type="button" class="calendar__today-btn" @click=${this._selectToday}>
                  Today
                </button>
              </div>

              <div class="calendar__weekdays">
                ${Ce.map(c=>l`<span class="calendar__weekday">${c}</span>`)}
              </div>

              <div class="calendar__days">
                ${a.map(c=>{if(!c)return l`<span class="calendar__day is-empty"></span>`;const h=Y(c,t),u=e&&Y(c,e);return l`
                    <button
                      type="button"
                      class="calendar__day${h?" is-today":""}${u?" is-selected":""}"
                      aria-label=${c.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
                      aria-pressed=${String(!!u)}
                      @click=${()=>this._selectDay(c)}
                    >${c.getDate()}</button>`})}
              </div>


            </div>`:b}
        </div>

        ${n?l`<p class="field__message field__message--error" role="alert">${this.errorText}</p>`:this.helpText?l`<p class="field__message">${this.helpText}</p>`:b}

      </div>
    `}static styles=R`
    :host {
      display: block;
      --_height: var(--form-height-md, 40px);
      --_pad-x: var(--form-padding-x-md, 12px);
      --_font-size: var(--form-font-size-md, 14px);
      --_radius: var(--form-radius-md, 6px);
      --_border: var(--form-border-color, #d4d4d4);
      --_cell: 36px;
    }

    /* ---- Field shell ---- */
    .field { display: flex; flex-direction: column; gap: var(--spacing-100, 4px); }

    .field__label {
      font-family: var(--font-sans, sans-serif);
      font-size: var(--type-size-200, 13px);
      font-weight: var(--font-weight-medium, 500);
      color: var(--color-text-secondary, #464646);
      line-height: 1.4;
      cursor: default;
    }
    .field__req { color: var(--color-danger, #dc2626); }

    .field__wrap { position: relative; }

    .field__message {
      font-family: var(--font-sans, sans-serif);
      font-size: 12px;
      color: var(--color-text-muted, #737373);
      margin: 0;
    }
    .field__message--error { color: var(--color-danger, #dc2626); }

    /* ---- Input + button row ---- */
    .field__row {
      display: flex;
      align-items: stretch;
    }

    .date-input {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      appearance: none;
      height: var(--_height);
      padding: 0 var(--_pad-x);
      border: 1px solid var(--_border);
      border-right: none;
      border-radius: var(--_radius) 0 0 var(--_radius);
      background: var(--color-surface, #fff);
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_font-size);
      color: var(--color-text-primary, #171717);
      outline: none;
      transition: border-color 0.12s ease;
    }
    .date-input::placeholder { color: var(--color-text-muted, #737373); }
    .date-input:hover { border-color: var(--color-primary, #13273e); }
    .date-input:focus { outline: none; }
    .date-input:disabled { opacity: 0.5; cursor: not-allowed; background: var(--color-surface-sunken, #f8f9fb); }

    .field__row:focus-within .date-input,
    .field__row:focus-within .cal-btn {
      border-color: var(--color-primary, #13273e);
    }
    .field__row:focus-within {
      border-radius: var(--_radius);
      box-shadow: 0 0 0 3px var(--color-primary-subtle, #e8edf2);
    }
    .field__row.has-error .date-input,
    .field__row.has-error .cal-btn { border-color: var(--color-danger, #dc2626); }
    .field__row.has-error:focus-within {
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
    }

    .cal-btn {
      flex: none;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: var(--_height);
      border: 1px solid var(--_border);
      border-radius: 0 var(--_radius) var(--_radius) 0;
      background: var(--color-surface-sunken, #f8f9fb);
      color: var(--color-text-muted, #737373);
      cursor: pointer;
      transition: background 0.12s ease, border-color 0.12s ease, color 0.12s ease;
    }
    .cal-btn:hover {
      background: var(--color-primary-subtle, #e8edf2);
      border-color: var(--color-primary, #13273e);
      color: var(--color-primary, #13273e);
    }
    .cal-btn.is-open {
      background: var(--color-primary-subtle, #e8edf2);
      border-color: var(--color-primary, #13273e);
      color: var(--color-primary, #13273e);
    }
    .cal-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* ---- Calendar dropdown ---- */
    .calendar {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: var(--z-dropdown, 50);
      background: var(--color-surface, #fff);
      border: 1px solid var(--color-border, #e5e5e5);
      border-radius: var(--radius-100, 8px);
      box-shadow: 0 8px 24px rgba(19, 39, 62, 0.12), 0 2px 6px rgba(19, 39, 62, 0.06);
      padding: var(--spacing-400, 16px);
      width: calc(var(--_cell) * 7 + var(--spacing-100, 4px) * 6 + var(--spacing-400, 16px) * 2);
      user-select: none;
    }

    /* ---- Header with month + year comboboxes ---- */
    .calendar__header {
      display: flex;
      align-items: center;
      gap: var(--spacing-200, 8px);
      margin-bottom: var(--spacing-400, 16px);
    }

    /* ---- Nav combobox ---- */
    .cal-nav { position: relative; }

    .cal-nav__trigger {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border: 1px solid transparent;
      border-radius: var(--radius-050, 4px);
      background: none;
      font-family: var(--font-sans, sans-serif);
      font-size: 14px;
      font-weight: var(--font-weight-semibold, 600);
      color: var(--color-text-primary, #171717);
      cursor: pointer;
      transition: background 0.12s ease, border-color 0.12s ease;
    }
    .cal-nav__trigger:hover {
      background: var(--color-surface-sunken, #f4f5f7);
      border-color: var(--color-border, #e5e5e5);
    }
    .cal-nav__trigger.is-open {
      background: var(--color-surface-sunken, #f4f5f7);
      border-color: var(--color-primary, #13273e);
    }
    .cal-nav__trigger:focus-visible {
      outline: 2px solid var(--color-primary, #13273e);
      outline-offset: 2px;
    }
    .cal-nav__chevron {
      color: var(--color-text-muted, #737373);
      transition: transform 0.12s ease;
    }
    .cal-nav__trigger.is-open .cal-nav__chevron { transform: rotate(180deg); }

    .cal-nav__panel {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 10;
      background: var(--color-surface, #fff);
      border: 1px solid var(--color-border, #e5e5e5);
      border-radius: var(--radius-100, 6px);
      box-shadow: 0 4px 16px rgba(19, 39, 62, 0.12);
      width: 180px;
      overflow: hidden;
    }

    .cal-nav__search {
      display: block;
      width: 100%;
      padding: 8px 10px;
      border: none;
      border-bottom: 1px solid var(--color-border, #e5e5e5);
      font-family: var(--font-sans, sans-serif);
      font-size: 13px;
      color: var(--color-text-primary, #171717);
      background: var(--color-surface, #fff);
      box-sizing: border-box;
      outline: none;
    }
    .cal-nav__search::placeholder { color: var(--color-text-muted, #737373); }
    .cal-nav__search:focus { border-bottom-color: var(--color-primary, #13273e); }

    .cal-nav__options {
      max-height: 188px;
      overflow-y: auto;
    }
    .cal-nav__option {
      display: block;
      width: 100%;
      padding: 7px 10px;
      border: none;
      background: none;
      font-family: var(--font-sans, sans-serif);
      font-size: 13px;
      color: var(--color-text-primary, #171717);
      text-align: left;
      cursor: pointer;
      transition: background 0.1s ease;
    }
    .cal-nav__option:hover { background: var(--color-surface-sunken, #f4f5f7); }
    .cal-nav__option.is-selected {
      background: var(--color-primary-subtle, #e8edf2);
      color: var(--color-primary, #13273e);
      font-weight: var(--font-weight-semibold, 600);
    }
    .cal-nav__empty {
      padding: 10px;
      font-size: 13px;
      color: var(--color-text-muted, #737373);
      text-align: center;
      margin: 0;
    }

    /* ---- Weekday row ---- */
    .calendar__weekdays {
      display: grid;
      grid-template-columns: repeat(7, var(--_cell));
      gap: var(--spacing-100, 4px);
      margin-bottom: var(--spacing-200, 8px);
    }
    .calendar__weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--_cell);
      font-family: var(--font-sans, sans-serif);
      font-size: 11px;
      font-weight: var(--font-weight-semibold, 600);
      letter-spacing: 0.04em;
      color: var(--color-text-muted, #737373);
      text-transform: uppercase;
    }

    /* ---- Days grid (squarcles) ---- */
    .calendar__days {
      display: grid;
      grid-template-columns: repeat(7, var(--_cell));
      gap: var(--spacing-100, 4px);
    }
    .calendar__day {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--_cell);
      height: var(--_cell);
      border: none;
      border-radius: var(--radius-050, 4px);
      background: none;
      font-family: var(--font-sans, sans-serif);
      font-size: 13px;
      color: var(--color-text-primary, #171717);
      cursor: pointer;
      transition: background 0.1s ease, color 0.1s ease;
    }
    .calendar__day.is-empty { pointer-events: none; }
    .calendar__day:not(.is-empty):hover {
      background: var(--color-surface-sunken, #f4f5f7);
    }
    .calendar__day:focus-visible {
      outline: 2px solid var(--color-primary, #13273e);
      outline-offset: 2px;
    }
    .calendar__day.is-today {
      font-weight: var(--font-weight-semibold, 600);
      color: var(--color-secondary, #1a4d7c);
      position: relative;
    }
    .calendar__day.is-today::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--color-secondary, #1a4d7c);
    }
    .calendar__day.is-selected {
      background: var(--color-primary, #13273e);
      color: var(--color-surface, #fff);
      font-weight: var(--font-weight-semibold, 600);
    }
    .calendar__day.is-selected.is-today::after {
      background: var(--color-gold-300, #f0c040);
    }
    .calendar__day.is-selected:hover {
      background: var(--color-primary, #13273e);
      opacity: 0.9;
    }

    /* ---- Today button (header, right-aligned) ---- */
    .calendar__today-btn {
      margin-left: auto;
      border: none;
      background: none;
      font-family: var(--font-sans, sans-serif);
      font-size: 13px;
      font-weight: var(--font-weight-semibold, 600);
      color: var(--color-secondary, #1a4d7c);
      cursor: pointer;
      padding: var(--spacing-100, 4px) var(--spacing-300, 12px);
      border-radius: var(--radius-050, 4px);
      transition: background 0.12s ease;
    }
    .calendar__today-btn:hover {
      background: var(--color-primary-subtle, #e8edf2);
    }
  `}customElements.define("bcn-date-picker",Le);function Te(){const i=document.querySelector("[data-invoice-wizard]");if(!i)return;const e=i.querySelector("[data-stepper]"),t=Array.from(i.querySelectorAll("[data-stepper-step]")),a=Array.from(i.querySelectorAll(".cbf-stepper__line"));let n=0;const c=2,h=i.querySelector("[data-pdf-panel]"),u=i.querySelector("[data-pdf-frame]"),U=i.querySelector("[data-pdf-filename]"),pe=i.querySelector(".cbf-invoice-workspace"),ue=i.querySelector("[data-parties-bar]");function C(r,o){i.querySelectorAll(`[data-step="${r}"]`).forEach(s=>{o?s.removeAttribute("hidden"):s.setAttribute("hidden","")})}function E(r){if(!(r!==c&&!he(n))){if(n===0&&r===1&&ye()){xe(()=>E(r));return}C(n,!1),n=r,C(n,!0),K(),n===1&&ae(),S(),window.scrollTo({top:0,behavior:"smooth"})}}function K(){const r=n>=t.length;e?.toggleAttribute("hidden",r),!r&&(t.forEach((o,s)=>{o.classList.toggle("is-active",s===n),o.classList.toggle("is-done",s<n)}),a.forEach((o,s)=>{o.style.background=s<n?"var(--color-primary)":"var(--color-border)"}))}i.addEventListener("click",r=>{const o=r.target;o.closest("[data-wizard-next]")&&E(n+1),o.closest("[data-wizard-back]")&&n>0&&(C(n,!1),n--,C(n,!0),K(),S()),o.closest("[data-invoice-replace]")&&q.click(),o.closest("[data-invoice-remove]")&&(Z(),E(0)),o.closest("[data-wizard-submit]")&&we()}),S(),i.querySelectorAll("[data-combobox-options]").forEach(r=>{try{r.options=JSON.parse(r.dataset.comboboxOptions??"[]")}catch{}});function S(){const r=n===0;h?.toggleAttribute("hidden",!r),pe?.classList.toggle("has-pdf",r),ue?.toggleAttribute("hidden",!r)}function he(r){if(r===0){const o=fe(),s=ve();return o&&s}return!0}function fe(){const r=i.querySelector('[data-step-error="upload"]'),o=!!m;return r?.toggleAttribute("hidden",o),o}function ve(){let r=!0;return[i.querySelector('[data-field="invoice-number"]'),i.querySelector('[data-field="invoice-date"]'),i.querySelector('[data-field="issue-date"]'),i.querySelector('[data-field="perf-start"]'),i.querySelector('[data-field="perf-end"]'),i.querySelector('[data-field="contract"]'),i.querySelector('[data-field="project"]')].forEach(s=>{if(!s)return;(s.value??s.getAttribute("value")??"").trim()?s.removeAttribute("error-text"):(s.setAttribute("error-text","This field is required."),r=!1)}),p.length?i.querySelector('[data-step-error="lineitems"]')?.setAttribute("hidden",""):(r=!1,i.querySelector('[data-step-error="lineitems"]')?.removeAttribute("hidden")),r}let L=!1;function H(){const r=!L;i.querySelector("[data-form-lock-notice]")?.toggleAttribute("hidden",!r),i.querySelectorAll("[data-field]").forEach(o=>{o.toggleAttribute("disabled",r)}),i.querySelector("[data-add-line-item]")?.toggleAttribute("disabled",r),i.querySelector("[data-docs-add]")?.toggleAttribute("disabled",r),i.querySelectorAll(".cbf-li-input").forEach(o=>{o.disabled=r}),i.querySelectorAll(".cbf-li-remove").forEach(o=>{o.disabled=r})}H();let m=null;const _=i.querySelector("[data-upload-zone]"),q=i.querySelector("[data-upload-input]"),z=i.querySelector("[data-mobile-upload-input]"),J=i.querySelector("[data-upload-idle]"),W=i.querySelector("[data-pdf-viewer]");let g=null;function M(r){m=r,J?.setAttribute("hidden",""),W?.removeAttribute("hidden"),i.querySelector('[data-step-error="upload"]')?.setAttribute("hidden",""),L||(L=!0,H()),g&&URL.revokeObjectURL(g),g=URL.createObjectURL(r),u&&(u.src=g),U&&(U.textContent=r.name),n===1&&ae(),S()}function Z(){m=null,q.value="",z&&(z.value=""),W?.setAttribute("hidden",""),J?.removeAttribute("hidden"),g&&(URL.revokeObjectURL(g),g=null),u&&(u.src=""),S()}let y=[];const T=i.querySelector("[data-docs-input]"),O=i.querySelector("[data-docs-list]");function Q(){O&&(O.innerHTML=y.map((r,o)=>`
      <div class="cbf-doc-row">
        <svg class="cbf-doc-row__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <div class="cbf-doc-row__info">
          <span class="cbf-doc-row__name">${d(r.name)}</span>
          <span class="cbf-doc-row__size">${F(r.size)}</span>
        </div>
        <button type="button" class="cbf-doc-row__remove" data-doc-remove="${o}" aria-label="Remove ${d(r.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""))}i.querySelector("[data-docs-add]")?.addEventListener("click",()=>T?.click()),T?.addEventListener("change",()=>{const r=Array.from(T.files??[]),o=new Set(y.map(s=>s.name));y.push(...r.filter(s=>!o.has(s.name))),T.value="",Q()}),O?.addEventListener("click",r=>{const o=r.target.closest("[data-doc-remove]");o&&(y.splice(Number(o.dataset.docRemove),1),Q())}),i.querySelector("[data-upload-browse]")?.addEventListener("click",()=>q.click()),i.querySelector("[data-upload-remove]")?.addEventListener("click",Z),i.querySelector("[data-mobile-upload-btn]")?.addEventListener("click",()=>z?.click()),q.addEventListener("change",()=>{const r=q.files?.[0];r&&M(r)}),z?.addEventListener("change",()=>{const r=z.files?.[0];r&&M(r)}),_.addEventListener("dragover",r=>{r.preventDefault(),_.classList.add("is-over")}),_.addEventListener("dragleave",()=>_.classList.remove("is-over")),_.addEventListener("drop",r=>{r.preventDefault(),_.classList.remove("is-over");const o=r.dataTransfer?.files?.[0];o&&o.type==="application/pdf"&&M(o)});function F(r){return r<1024*1024?`${(r/1024).toFixed(0)} KB`:`${(r/(1024*1024)).toFixed(1)} MB`}let p=[];const I=i.querySelector("[data-line-items]"),X=i.querySelector("[data-invoice-total]");function G(){p.push({description:"",qty:1,unitPrice:0}),ee()}function ge(r){p.splice(r,1),ee()}function ee(){const r=L?"":" disabled";I.innerHTML=p.map((o,s)=>`
      <div class="cbf-line-item" data-row="${s}">
        <input${r}
          class="cbf-li-input cbf-li-desc"
          type="text"
          placeholder="Description…"
          value="${d(o.description)}"
          data-li-field="description"
          data-li-idx="${s}"
        />
        <input${r}
          class="cbf-li-input cbf-li-qty"
          type="number"
          min="1"
          value="${o.qty}"
          data-li-field="qty"
          data-li-idx="${s}"
          style="text-align:right"
        />
        <input${r}
          class="cbf-li-input cbf-li-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value="${o.unitPrice||""}"
          data-li-field="unitPrice"
          data-li-idx="${s}"
          style="text-align:right"
        />
        <span class="cbf-li-total" data-li-total="${s}">${x(o.qty*o.unitPrice)}</span>
        <button type="button"${r} class="cbf-li-remove" data-li-remove="${s}" aria-label="Remove line item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""),te()}function te(){const r=p.reduce((o,s)=>o+s.qty*s.unitPrice,0);X&&(X.textContent=x(r))}function x(r){return r.toLocaleString("en-US",{style:"currency",currency:"USD"})}function d(r){return r.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}I.addEventListener("input",r=>{const o=r.target,s=Number(o.dataset.liIdx),f=o.dataset.liField;if(!f||isNaN(s))return;f==="description"&&(p[s].description=o.value),f==="qty"&&(p[s].qty=Math.max(1,Number(o.value)||1)),f==="unitPrice"&&(p[s].unitPrice=Math.max(0,Number(o.value)||0));const $=I.querySelector(`[data-li-total="${s}"]`);$&&($.textContent=x(p[s].qty*p[s].unitPrice)),te()}),I.addEventListener("click",r=>{const o=r.target.closest("[data-li-remove]");o&&ge(Number(o.dataset.liRemove))}),i.querySelector("[data-add-line-item]")?.addEventListener("click",G);const w=i.querySelector("[data-final-invoice]"),be=i.querySelector("[data-final-invoice-callout]"),D=i.querySelector("[data-final-invoice-dialog]"),j=i.querySelector('[data-field="contract"]');let re={};try{re=JSON.parse(j?.dataset.contractAmounts??"{}")}catch{}function ie(){be?.classList.toggle("is-flagged",!!w?.checked)}let N=!1;w?.addEventListener("change",()=>{N=!0,ie()});function me(){return p.reduce((r,o)=>r+o.qty*o.unitPrice,0)}function _e(){const r=re[j?.value??""],o=me();if(!r||o<=0)return!1;const s=r.remaining-o;return s>=0&&s<.05*r.total}function ye(){return!!w&&!N&&!w.checked&&_e()}function xe(r){if(!D){r();return}const o=j?.value||"this contract";D.message=`The remaining balance on ${o} is within 5% of this invoice's total, which usually means it's the last one. Marking it final closes out the contract — should we flag this as the final invoice?`;const s=f=>{D.removeEventListener("resolved",s),N=!0,f.detail?.confirmed&&(w.checked=!0,ie()),r()};D.addEventListener("resolved",s),D.show()}G();function k(r){return i.querySelector(r)?.value??""}function oe(r){const o=i.querySelector(r);if(!o)return"";const s=o.value??"";return o.options?.find($=>$.value===s)?.label??s}function ae(){const r=i.querySelector("[data-review-content]");if(!r)return;const o=k('[data-field="invoice-number"]'),s=k('[data-field="invoice-date"]'),f=k('[data-field="issue-date"]'),$=k('[data-field="perf-start"]'),ke=k('[data-field="perf-end"]'),$e=oe('[data-field="contract"]'),Se=oe('[data-field="project"]'),ne=k('[data-field="notes"]'),qe=p.reduce((v,se)=>v+se.qty*se.unitPrice,0);r.innerHTML=`
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Uploaded invoice</h3>
        <div class="cbf-review-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>${d(m?.name??"(no file)")}</span>
          <span class="cbf-review-meta">${m?F(m.size):""}</span>
          <div class="cbf-review-file-actions">
            <button type="button" class="cbf-review-file-btn" data-invoice-replace>Replace</button>
            <button type="button" class="cbf-review-file-btn cbf-review-file-btn--danger" data-invoice-remove>Remove</button>
          </div>
        </div>
      </div>

      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Invoice details</h3>
        <dl class="cbf-review-dl">
          <div class="cbf-review-dl__row"><dt>Invoice number</dt><dd>${d(o)||"—"}</dd></div>
          <div class="cbf-review-dl__row"><dt>Invoice date</dt><dd>${d(s)||"—"}</dd></div>
          <div class="cbf-review-dl__row"><dt>Issue date</dt><dd>${d(f)||"—"}</dd></div>
          <div class="cbf-review-dl__row"><dt>Performance period</dt><dd>${d($)||"—"} – ${d(ke)||"—"}</dd></div>
          <div class="cbf-review-dl__row"><dt>Contract</dt><dd>${d($e)||"—"}</dd></div>
          <div class="cbf-review-dl__row"><dt>Project</dt><dd>${d(Se)||"—"}</dd></div>
          <div class="cbf-review-dl__row"><dt>Final invoice</dt><dd>${w?.checked?"Yes":"No"}</dd></div>
        </dl>
      </div>

      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Line items</h3>
        <table class="cbf-review-table">
          <thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Total</th></tr></thead>
          <tbody>
            ${p.map(v=>`
              <tr>
                <td>${d(v.description)||"—"}</td>
                <td>${v.qty}</td>
                <td>${x(v.unitPrice)}</td>
                <td>${x(v.qty*v.unitPrice)}</td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr class="cbf-review-table__total">
              <td colspan="3">Total</td>
              <td>${x(qe)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      ${y.length?`
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Supporting documents</h3>
        ${y.map(v=>`
          <div class="cbf-review-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>${d(v.name)}</span>
            <span class="cbf-review-meta">${F(v.size)}</span>
          </div>
        `).join("")}
      </div>`:""}

      ${ne?`
      <div class="cbf-review-section">
        <h3 class="cbf-review-section__title">Notes</h3>
        <p class="cbf-review-notes">${d(ne)}</p>
      </div>`:""}
    `}function we(){const r=i.querySelector("[data-wizard-submit] button.esa-button");if(r){if(r.classList.add("esa-button--loading"),r.disabled=!0,r.setAttribute("aria-busy","true"),!r.querySelector(".esa-button__spinner")){const o=document.createElement("span");o.className="esa-button__spinner",o.setAttribute("aria-hidden","true"),r.prepend(o)}r.querySelector(".esa-button__label")?.classList.add("esa-button__label--hidden")}setTimeout(()=>{const o=`INV-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9e4)+1e4)}`,s=i.querySelector("[data-confirm-ref]");s&&(s.textContent=o),E(2)},1500)}}Te();
