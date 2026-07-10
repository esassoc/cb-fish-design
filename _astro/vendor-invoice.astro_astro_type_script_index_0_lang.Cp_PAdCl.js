import"./baselines.astro_astro_type_script_index_0_lang.BfuPGaUe.js";import"./esa-text-field.astro_astro_type_script_index_0_lang.Bh9QjbpR.js";import"./esa-select.HUpJg4S3.js";import{i as ae,b as n,A as S,a as se}from"./lit-element.C8p3bJxG.js";import"./esa-checkbox.astro_astro_type_script_index_0_lang.CAN_sttU.js";import"./esa-confirm-dialog.DkUG8ZSa.js";import"./esa-textarea.astro_astro_type_script_index_0_lang.f3qIukGs.js";class Ze extends ae{constructor(){super(),this._suppressNextOpen=!1,this.searchTimer=null,this.lastEmittedSearch="",this.onDocClick=e=>{this._open&&(e.composedPath().includes(this)||this.closeDropdown())},this.onSearchInput=e=>{const r=e.target.value;this._search=r,this._active=-1,this.emitSearch(r),this._open||this.openDropdown()},this.onInputFocus=()=>{if(this._suppressNextOpen){this._suppressNextOpen=!1;return}this._open||this.openDropdown()},this.onInputClick=()=>{this._open||this.openDropdown()},this.onKeydown=e=>{const r=this.filteredOptions;switch(e.key){case"ArrowDown":if(e.preventDefault(),!this._open)return this.openDropdown();{let a=this._active+1;for(;a<r.length&&r[a].disabled;)a++;a<r.length&&(this._active=a)}break;case"ArrowUp":if(e.preventDefault(),!this._open)return this.openDropdown();{let a=this._active-1;for(;a>=0&&r[a].disabled;)a--;a>=0&&(this._active=a)}break;case"Enter":if(e.preventDefault(),this._open&&this._active>=0){const a=r[this._active];a&&!a.disabled&&this.selectOption(a)}else this._open||this.openDropdown();break;case"Escape":e.preventDefault(),this.closeDropdown();break;case"Tab":this.closeDropdown();break}},this.mode="select",this.triggerStyle="field",this.options=[],this.multiple=!1,this.size="md",this.label="",this.placeholder="Select...",this.disabled=!1,this.required=!1,this.helpText="",this.errorText="",this.loading=!1,this.debounceMs=300,this.resultsCount=null,this._search="",this._selected=[],this._open=!1,this._active=-1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={mode:{type:String,reflect:!0},triggerStyle:{type:String,attribute:"trigger-style"},options:{type:Array},multiple:{type:Boolean},size:{type:String,reflect:!0},label:{type:String},placeholder:{type:String},disabled:{type:Boolean,reflect:!0},required:{type:Boolean},helpText:{type:String,attribute:"help-text"},errorText:{type:String,attribute:"error-text"},loading:{type:Boolean},debounceMs:{type:Number,attribute:"debounce-ms"},resultsCount:{type:Number,attribute:"results-count"},_search:{state:!0},_selected:{state:!0},_open:{state:!0},_active:{state:!0}}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocClick),this.syncFormValue()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocClick),this.searchTimer&&clearTimeout(this.searchTimer)}set value(e){e==null?this._selected=[]:Array.isArray(e)?this._selected=e:this._selected=[e],this.syncFormValue()}get value(){return this.multiple?this._selected:this._selected[0]??""}get filteredOptions(){const e=this._search.toLowerCase();return e?this.options.filter(r=>r.label.toLowerCase().includes(e)):this.options}get displayValue(){return this._selected.length===0?"":this.multiple?this.options.filter(r=>this._selected.includes(r.value)).map(r=>r.label).join(", "):this.options.find(r=>r.value===this._selected[0])?.label??""}get selectedOptions(){return this.options.filter(e=>this._selected.includes(e.value))}get currentPlaceholder(){return this.multiple&&this._selected.length>0?"":this.placeholder}get inputValue(){return this.multiple?this._search:this._search||this.displayValue}isSelected(e){return this._selected.includes(e)}syncFormValue(){this.internals.setFormValue(this.multiple?this._selected.join(","):this._selected[0]??null)}emitValue(){this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}emitSearch(e){this.searchTimer&&clearTimeout(this.searchTimer),this.searchTimer=setTimeout(()=>{e!==this.lastEmittedSearch&&(this.lastEmittedSearch=e,this.dispatchEvent(new CustomEvent("search",{detail:{term:e},bubbles:!0,composed:!0})))},this.debounceMs)}toggleDropdown(){this.disabled||(this._open?this.closeDropdown():this.openDropdown())}openDropdown(){this.disabled||this._open||(this._open=!0,this._active=-1,this.mode==="select"&&requestAnimationFrame(()=>{this.renderRoot.querySelector(".search-input")?.focus()}))}closeDropdown(){this._open&&(this._open=!1,this._search="")}selectOption(e){if(e.disabled)return;const r=e.value;if(this.multiple){const a=this._selected.indexOf(r);this._selected=a>=0?this._selected.filter(s=>s!==r):[...this._selected,r],this._search="",this.emitValue();const l=this.mode==="autocomplete"?".input":".search-input";requestAnimationFrame(()=>this.renderRoot.querySelector(l)?.focus())}else if(this._selected=[r],this._search="",this.emitValue(),this.closeDropdown(),this.mode==="autocomplete"){const a=this.renderRoot.querySelector(".input");a&&this.renderRoot.activeElement!==a&&(this._suppressNextOpen=!0,requestAnimationFrame(()=>a.focus()))}}removeValue(e,r){r?.stopPropagation(),this._selected=this._selected.filter(a=>a!==e),this.emitValue()}highlight(e){const r=this._search.trim();if(!r)return n`${e}`;const l=e.toLowerCase().indexOf(r.toLowerCase());return l<0?n`${e}`:n`${e.slice(0,l)}<mark class="hl">${e.slice(l,l+r.length)}</mark>${e.slice(l+r.length)}`}render(){const e=!!this.errorText;return n`
      <div class="field ${e?"field--error":""}">
        ${this.label?n`<label class="field__label">
              ${this.label}${this.required?n`<span class="field__required">*</span>`:null}
            </label>`:null}

        <div class="container">
          ${this.mode==="autocomplete"?this.renderAutocomplete():this.renderSelect()}
          ${this._open?this.renderDropdown():null}
        </div>

        ${e?n`<span class="field__error">${this.errorText}</span>`:this.helpText?n`<span class="field__help">${this.helpText}</span>`:null}
      </div>
    `}renderAutocomplete(){return n`
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
          @click=${this.onInputClick}
        />
        ${this.loading?n`<span class="spinner spinner--inline">${this.spinnerIcon()}</span>`:null}
      </div>
    `}renderSelect(){const e=this.triggerStyle==="field";return n`
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
    `}renderChips(){return this.selectedOptions.length===0?S:n`<div class="chips">
      ${this.selectedOptions.map(e=>n`<span class="chip">
          <span class="chip__label">${e.label}</span>
          <button
            type="button"
            class="chip__remove"
            aria-label=${"Remove "+e.label}
            @click=${r=>this.removeValue(e.value,r)}
          >
            ${this.xIcon()}
          </button>
        </span>`)}
    </div>`}renderDropdown(){const e=this.filteredOptions;return n`<div class="dropdown" role="listbox" @keydown=${this.onKeydown}>
      ${this.mode==="select"?n`<div class="search">
            ${this.searchIcon()}
            <input
              class="search-input"
              placeholder="Search..."
              .value=${this._search}
              @input=${this.onSearchInput}
              @keydown=${this.onKeydown}
            />
            ${this.loading?n`<span class="spinner">${this.spinnerIcon()}</span>`:null}
          </div>`:null}

      ${this.resultsCount!==null?n`<div class="results-count">Displaying ${e.length} of ${this.resultsCount} results</div>`:null}

      <div class="viewport">
        ${e.map((r,a)=>{const l=this.isSelected(r.value);return n`<div
            class="option ${a===this._active?"option--active":""} ${l?"option--selected":""} ${r.disabled?"option--disabled":""}"
            role="option"
            aria-selected=${l}
            @click=${()=>this.selectOption(r)}
            @mouseenter=${()=>this._active=a}
          >
            ${this.multiple?n`<span class="check ${l?"check--selected":""}">${this.checkIcon()}</span>`:null}
            <span class="option__label">${this.highlight(r.label)}</span>
          </div>`})}
      </div>

      ${e.length===0&&!this.loading?n`<div class="empty">${this._search?"No results found":"No options available"}</div>`:null}
      ${this.loading&&e.length===0?n`<div class="loading"><span class="spinner">${this.spinnerIcon()}</span> Searching...</div>`:null}
    </div>`}chevronIcon(){return n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>`}checkIcon(){return n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>`}xIcon(){return n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>`}searchIcon(){return n`<svg class="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>`}spinnerIcon(){return n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>`}static{this.styles=se`
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
      color: var(--color-danger-strong, #ce2c31);
      margin-left: 2px;
    }
    .field__help {
      font-size: var(--type-size-150, 12px);
      color: var(--form-help-color, #737373);
    }
    .field__error {
      font-size: var(--type-size-150, 12px);
      color: var(--form-error-color, var(--color-danger-strong, #ce2c31));
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
      box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
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
      color: var(--color-primary-strong, #3a7c59);
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_field-font-size);
      font-weight: var(--font-weight-medium, 450);
      cursor: pointer;
      max-width: 100%;
    }
    .trigger--text:hover {
      color: var(--color-primary-strong, #3a7c59);
      text-decoration: underline;
    }
    .trigger--text:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
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
      box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
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
      color: var(--color-primary-strong, #3a7c59);
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
      color: var(--color-primary-strong, #3a7c59);
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
      color: var(--color-primary-strong, #3a7c59);
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
      color: var(--color-primary-strong, #3a7c59);
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
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
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
  `}}customElements.get("esa-combobox")||customElements.define("esa-combobox",Ze);class Ge extends ae{constructor(){super(),this.previousFocus=null,this.onKeydown=e=>{this.open&&(e.key==="Escape"?(e.preventDefault(),this.close()):e.key==="Tab"&&this.trapFocus(e))},this.onBackdropClick=()=>{this.close()},this.open=!1,this.heading="",this.showCloseButton=!0,this.size="md"}static{this.properties={open:{type:Boolean,reflect:!0},heading:{type:String},showCloseButton:{type:Boolean,attribute:"show-close-button"},size:{type:String,reflect:!0}}}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this.onKeydown)}updated(e){e.has("open")&&(this.open?(this.previousFocus=document.activeElement,requestAnimationFrame(()=>this.focusFirst())):this.previousFocus&&(this.previousFocus.focus?.(),this.previousFocus=null))}show(){this.open=!0}close(){this.open&&(this.open=!1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}focusable(){const r=this.renderRoot.querySelector(".esa-dialog");if(!r)return[];const a=r.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'),l=Array.from(this.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));return[...Array.from(a),...l].filter(s=>s.offsetParent!==null||s===this)}focusFirst(){const e=this.focusable();e.length?e[0].focus():this.renderRoot.querySelector(".esa-dialog")?.focus()}trapFocus(e){const r=this.focusable();if(r.length===0)return;const a=r[0],l=r[r.length-1],s=this.renderRoot.activeElement||document.activeElement;e.shiftKey&&s===a?(e.preventDefault(),l.focus()):!e.shiftKey&&s===l&&(e.preventDefault(),a.focus())}render(){if(!this.open)return n``;const e=this.heading||this.showCloseButton||!!this.querySelector('[slot="header"]');return n`
      <div class="esa-dialog-backdrop" @click=${this.onBackdropClick}></div>
      <div class="esa-dialog-panel">
        <div class="esa-dialog" role="dialog" aria-modal="true" aria-label=${this.heading||"Dialog"} tabindex="-1">
          ${e?n`
                <div class="esa-dialog__header">
                  <slot name="header"><h2 class="esa-dialog__title">${this.heading}</h2></slot>
                  ${this.showCloseButton?n`
                        <button class="esa-dialog__close" @click=${this.close} aria-label="Close dialog">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      `:null}
                </div>
              `:null}
          <div class="esa-dialog__body"><slot></slot></div>
          <div class="esa-dialog__footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `}static{this.styles=se`
    :host {
      --_dialog-bg: var(--dialog-bg, var(--color-surface-elevated, #ffffff));
      --_dialog-border-radius: var(--dialog-radius, var(--radius-400, 0.75rem));
      --_dialog-padding: var(--spacing-500, 1.5rem);
      --_dialog-header-border: var(--dialog-border-color, var(--color-border-light, #efefef));
      /* Optional header/footer surface tints — a spoke fills these to frame the
         body; default transparent leaves existing consumers unchanged. */
      --_dialog-header-bg: var(--dialog-header-bg, transparent);
      --_dialog-footer-bg: var(--dialog-footer-bg, transparent);
      --_dialog-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
      --_dialog-width: var(--dialog-width, 480px);
      --_dialog-max-height: 85vh;
    }
    /* base :host = md (480px). xs is one step below sm. */
    :host([size='xs']) { --_dialog-width: var(--dialog-width-xs, 280px); }
    :host([size='sm']) { --_dialog-width: var(--dialog-width-sm, 360px); }
    :host([size='lg']) { --_dialog-width: var(--dialog-width-lg, 640px); }
    :host([size='fullscreen']) {
      --_dialog-width: 100vw;
      --_dialog-max-height: 100vh;
      --_dialog-border-radius: 0;
    }

    .esa-dialog-backdrop {
      position: fixed;
      inset: 0;
      background: var(--dialog-backdrop-bg, var(--color-backdrop, rgba(0, 0, 0, 0.5)));
      z-index: var(--z-modal-backdrop, 300);
    }
    .esa-dialog-panel {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--z-modal, 400);
      pointer-events: none;
    }

    .esa-dialog {
      pointer-events: auto;
      background: var(--_dialog-bg);
      border-radius: var(--_dialog-border-radius);
      box-shadow: var(--_dialog-shadow);
      width: var(--_dialog-width);
      max-width: 100vw;
      max-height: var(--_dialog-max-height);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
    }
    .esa-dialog:focus { outline: none; }

    /* hub-edit-approved: user approved hub edits this session (2026-06-30) — on
       narrow (mobile) viewports a centered dialog reads better as a bottom sheet:
       docked to the bottom edge, full width, only the top corners rounded, and
       sliding up on open. */
    @media (max-width: 600px) {
      .esa-dialog-panel { align-items: flex-end; }
      .esa-dialog {
        width: 100%;
        max-width: 100%;
        max-height: 92vh;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        animation: esa-dialog-sheet-in 0.24s ease;
      }
    }
    @keyframes esa-dialog-sheet-in {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    .esa-dialog__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-300, 0.75rem);
      padding: var(--_dialog-padding);
      background: var(--_dialog-header-bg);
      border-bottom: 1px solid var(--_dialog-header-border);
      flex-shrink: 0;
    }
    .esa-dialog__title {
      font-size: var(--type-size-400, 1.125rem);
      font-weight: var(--font-weight-semibold, 550);
      margin: 0;
      color: var(--dialog-color, var(--color-text-primary, #171717));
    }
    .esa-dialog__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: var(--radius-200, 0.5rem);
      background: transparent;
      color: var(--color-text-secondary, #525252);
      cursor: pointer;
      transition: background var(--transition-fast, 150ms ease);
    }
    .esa-dialog__close:hover { background: var(--color-surface-sunken, #efefef); }
    .esa-dialog__close:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset, 2px);
    }

    .esa-dialog__body {
      padding: var(--_dialog-padding);
      overflow-y: auto;
      flex: 1;
      color: var(--dialog-color, var(--color-text-primary, #171717));
    }
    .esa-dialog__footer {
      padding: var(--spacing-300, 0.75rem) var(--_dialog-padding);
      background: var(--_dialog-footer-bg);
      border-top: 1px solid var(--_dialog-header-border);
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-200, 0.5rem);
      flex-shrink: 0;
    }
    .esa-dialog__footer:not(:has(*)) { display: none; }
  `}}customElements.get("esa-dialog")||customElements.define("esa-dialog",Ge);const re=["January","February","March","April","May","June","July","August","September","October","November","December"],Qe=["Su","Mo","Tu","We","Th","Fr","Sa"],Ae=[];for(let c=1990;c<=2060;c++)Ae.push(c);function ze(c){if(!c)return null;const e=c.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const r=parseInt(e[1],10),a=parseInt(e[2],10)-1,l=parseInt(e[3],10),s=new Date(r,a,l);return s.getFullYear()!==r||s.getMonth()!==a||s.getDate()!==l?null:s}function Ce(c){return`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}-${String(c.getDate()).padStart(2,"0")}`}function oe(c,e){return c.getFullYear()===e.getFullYear()&&c.getMonth()===e.getMonth()&&c.getDate()===e.getDate()}function ie(c){return`${String(c.getMonth()+1).padStart(2,"0")}/${String(c.getDate()).padStart(2,"0")}/${c.getFullYear()}`}function V(c){const e=c.trim();if(!e)return null;const r=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);if(r){const l=r[3].length===2?2e3+parseInt(r[3]):parseInt(r[3]),s=new Date(l,parseInt(r[1])-1,parseInt(r[2]));if(s.getMonth()===parseInt(r[1])-1&&s.getDate()===parseInt(r[2]))return s}const a=new Date(e);return isNaN(a.getTime())?null:a}function et(c,e=!1){const r=c.slice(0,8);return r.length===0?"":r.length<2?r:r.length===2?e?r:`${r}/`:r.length<4?`${r.slice(0,2)}/${r.slice(2)}`:r.length===4?e?`${r.slice(0,2)}/${r.slice(2)}`:`${r.slice(0,2)}/${r.slice(2)}/`:`${r.slice(0,2)}/${r.slice(2,4)}/${r.slice(4)}`}class tt extends ae{static formAssociated=!0;static properties={label:{type:String},placeholder:{type:String},required:{type:Boolean},disabled:{type:Boolean,reflect:!0},errorText:{type:String,attribute:"error-text"},helpText:{type:String,attribute:"help-text"},value:{type:String},_open:{state:!0},_viewYear:{state:!0},_viewMonth:{state:!0},_monthOpen:{state:!0},_yearOpen:{state:!0},_monthSearch:{state:!0},_yearSearch:{state:!0},_inputText:{state:!0}};internals;_onDocClick=e=>{this._open&&!e.composedPath().includes(this)&&this._close()};_onSiblingOpen=e=>{e.detail?.source!==this&&this._open&&this._close()};constructor(){super(),this.label="",this.placeholder="MM/DD/YYYY",this.required=!1,this.disabled=!1,this.errorText="",this.helpText="",this.value="";const e=new Date;this._viewYear=e.getFullYear(),this._viewMonth=e.getMonth(),this._open=!1,this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch="",this._inputText="",this.internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick),document.addEventListener("bcn-date-picker:open",this._onSiblingOpen)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick),document.removeEventListener("bcn-date-picker:open",this._onSiblingOpen)}updated(e){if(e.has("value")){this.internals.setFormValue(this.value||null);const r=ze(this.value);if(r){this._viewYear=r.getFullYear(),this._viewMonth=r.getMonth();const a=V(this._inputText);(!a||!oe(a,r))&&(this._inputText=ie(r))}else this.value||(this._inputText="")}}_calendarCells(){const e=new Date(this._viewYear,this._viewMonth,1),r=new Date(this._viewYear,this._viewMonth+1,0).getDate(),a=[];for(let l=0;l<e.getDay();l++)a.push(null);for(let l=1;l<=r;l++)a.push(new Date(this._viewYear,this._viewMonth,l));for(;a.length%7!==0;)a.push(null);return a}_onTextInput(e){const r=e.target,a=e.inputType==="insertFromPaste",l=e.inputType?.startsWith("delete")??!1;let s;if(a){const p=V(r.value);s=p?ie(p):r.value}else{const p=r.value.replace(/\D/g,"").slice(0,8);s=et(p,l)}r.value=s,this._inputText=s;const f=V(s);f?(this.value=Ce(f),this.internals.setFormValue(this.value),this._viewYear=f.getFullYear(),this._viewMonth=f.getMonth(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))):s||(this.value="",this.internals.setFormValue(null),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}_onTextBlur(){if(!this._inputText)return;const e=V(this._inputText);e&&(this._inputText=ie(e))}_toggle(e){e.stopPropagation(),!this.disabled&&(this._open=!this._open,this._open?document.dispatchEvent(new CustomEvent("bcn-date-picker:open",{detail:{source:this}})):this._closeNavDropdowns())}_close(){this._open=!1,this._closeNavDropdowns()}_closeNavDropdowns(){this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch=""}_toggleMonth(e){e.stopPropagation(),this._monthOpen=!this._monthOpen,this._yearOpen=!1,this._monthSearch="",this._monthOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--month")?.focus()})}_toggleYear(e){e.stopPropagation(),this._yearOpen=!this._yearOpen,this._monthOpen=!1,this._yearSearch="",this._yearOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--year")?.focus(),this.shadowRoot?.querySelector(".cal-nav__option.is-selected")?.scrollIntoView({block:"nearest"})})}_selectMonth(e,r){r.stopPropagation(),this._viewMonth=e,this._monthOpen=!1,this._monthSearch=""}_selectYear(e,r){r.stopPropagation(),this._viewYear=e,this._yearOpen=!1,this._yearSearch=""}_selectDay(e){this.value=Ce(e),this.internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this._close()}_selectToday(){const e=new Date;e.setHours(0,0,0,0),this._selectDay(e)}_onKeyDown(e){e.key==="Escape"&&(this._monthOpen||this._yearOpen?(this._closeNavDropdowns(),e.stopPropagation()):this._open&&(this._close(),e.stopPropagation()))}_onCalendarClick(e){if(!this._monthOpen&&!this._yearOpen)return;const r=e.composedPath();let a=!1;this.shadowRoot?.querySelectorAll(".cal-nav").forEach(l=>{r.includes(l)&&(a=!0)}),a||this._closeNavDropdowns()}_renderMonthCombo(){const e=re.filter(r=>r.toLowerCase().includes(this._monthSearch.toLowerCase()));return n`
      <div class="cal-nav" data-type="month">
        <button type="button"
          class="cal-nav__trigger${this._monthOpen?" is-open":""}"
          @click=${this._toggleMonth}
          aria-haspopup="listbox"
          aria-expanded=${String(this._monthOpen)}
          aria-label="Select month">
          ${re[this._viewMonth]}
          <svg class="cal-nav__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${this._monthOpen?n`
          <div class="cal-nav__panel" @click=${r=>r.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--month"
              placeholder="Month…"
              .value=${this._monthSearch}
              @input=${r=>{this._monthSearch=r.target.value}}
              aria-label="Search months"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${e.length===0?n`<p class="cal-nav__empty">No match</p>`:e.map(r=>{const a=re.indexOf(r),l=a===this._viewMonth;return n`<button type="button" role="option"
                    class="cal-nav__option${l?" is-selected":""}"
                    aria-selected=${String(l)}
                    @click=${s=>this._selectMonth(a,s)}>${r}</button>`})}
            </div>
          </div>`:S}
      </div>`}_renderYearCombo(){const e=Ae.filter(r=>String(r).includes(this._yearSearch));return n`
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
        ${this._yearOpen?n`
          <div class="cal-nav__panel" @click=${r=>r.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--year"
              placeholder="Year…"
              .value=${this._yearSearch}
              @input=${r=>{this._yearSearch=r.target.value}}
              aria-label="Search years"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${e.length===0?n`<p class="cal-nav__empty">No match</p>`:e.map(r=>{const a=r===this._viewYear;return n`<button type="button" role="option"
                    class="cal-nav__option${a?" is-selected":""}"
                    aria-selected=${String(a)}
                    @click=${l=>this._selectYear(r,l)}>${r}</button>`})}
            </div>
          </div>`:S}
      </div>`}render(){const e=ze(this.value),r=new Date;r.setHours(0,0,0,0);const a=this._calendarCells(),l=!!this.errorText;return n`
      <div class="field" @keydown=${this._onKeyDown}>

        ${this.label?n`
          <label class="field__label" @click=${()=>this.shadowRoot?.querySelector(".date-input")?.focus()}>
            ${this.label}${this.required?n`<span class="field__req" aria-hidden="true">&thinsp;*</span>`:S}
          </label>`:S}

        <div class="field__wrap">
          <div class="field__row${l?" has-error":""}">
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

          ${this._open?n`
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
                ${Qe.map(s=>n`<span class="calendar__weekday">${s}</span>`)}
              </div>

              <div class="calendar__days">
                ${a.map(s=>{if(!s)return n`<span class="calendar__day is-empty"></span>`;const f=oe(s,r),p=e&&oe(s,e);return n`
                    <button
                      type="button"
                      class="calendar__day${f?" is-today":""}${p?" is-selected":""}"
                      aria-label=${s.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
                      aria-pressed=${String(!!p)}
                      @click=${()=>this._selectDay(s)}
                    >${s.getDate()}</button>`})}
              </div>


            </div>`:S}
        </div>

        ${l?n`<p class="field__message field__message--error" role="alert">${this.errorText}</p>`:this.helpText?n`<p class="field__message">${this.helpText}</p>`:S}

      </div>
    `}static styles=se`
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
  `}customElements.define("bcn-date-picker",tt);function rt(){const c=document.querySelector("[data-invoice-wizard]");if(!c)return;const e=c,r=e.querySelector("[data-stepper]"),a=Array.from(e.querySelectorAll("[data-stepper-step]")),l=Array.from(e.querySelectorAll(".cbf-stepper__line"));let s=0;const f=2,p=e.querySelector("[data-pdf-panel]"),M=e.querySelector("[data-pdf-frame]"),ne=e.querySelector("[data-pdf-filename]"),Le=e.querySelector(".cbf-invoice-workspace");function $(t,o){e.querySelectorAll(`[data-step="${t}"]`).forEach(i=>{o?i.removeAttribute("hidden"):i.setAttribute("hidden","")})}function U(t){if(!(t!==f&&!Fe(s))){if(s===0&&t===1&&Re()){Ve(()=>U(t));return}if(t===1&&ce()==="modal"){Te();return}$(s,!1),s=t,$(s,!0),K(),s===1&&Ee(),q(),window.scrollTo({top:0,behavior:"smooth"})}}function Te(){const t=e.querySelector("[data-confirm-modal]");t&&(He(),t.show())}function K(){const t=s>=a.length;r?.toggleAttribute("hidden",t),!t&&(a.forEach((o,i)=>{o.classList.toggle("is-active",i===s),o.classList.toggle("is-done",i<s)}),l.forEach((o,i)=>{o.style.background=i<s?"var(--color-primary)":"var(--color-border)"}))}let le="page";const de=e.querySelector("[data-confirm-mode-bar]");de?.addEventListener("click",t=>{const o=t.target.closest("[data-confirm-mode]");if(!o)return;const i=o.dataset.confirmMode;i&&(le=i,de.querySelectorAll("[data-confirm-mode]").forEach(d=>{d.classList.toggle("is-active",d.dataset.confirmMode===i)}))});function ce(){return le}function ue(){if(!b){const o=new File([`%PDF-1.4
% demo invoice for testing
`],"demo-invoice.pdf",{type:"application/pdf"});O(o)}const t=(o,i)=>{const d=e.querySelector(o);d&&(d.value=i,d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0})))};t('[data-field="contract"]',"CON-2025-0112"),t('[data-field="invoice-number"]',"INV-2026-0042"),t('[data-field="invoice-date"]',"2026-06-29"),t('[data-field="perf-start"]',"2026-01-01"),t('[data-field="perf-end"]',"2026-03-31"),t('[data-field="total-amount"]',"4850.00"),t('[data-field="notes"]',"Autofilled demo invoice (testing)."),U(1)}window.vendorInvoiceAutofill=ue,e.addEventListener("click",t=>{const o=t.target;o.closest("[data-wizard-next]")&&U(s+1),o.closest("[data-wizard-back]")&&s>0&&($(s,!1),s--,$(s,!0),K(),q()),o.closest("[data-wizard-save-draft]")&&We(),o.closest("[data-wizard-submit]")&&De(),o.closest("[data-modal-submit]")&&De(),o.closest("[data-modal-back]")&&e.querySelector("[data-confirm-modal]")?.close(),o.closest("[data-wizard-cancel]")&&(e.querySelector("[data-confirm-modal]")?.close(),window.location.href="/cb-fish-design/vendor-dashboard"),o.closest("[data-dev-autofill]")&&ue()}),q(),e.querySelectorAll("[data-combobox-options]").forEach(t=>{try{t.options=JSON.parse(t.dataset.comboboxOptions??"[]")}catch{}});function q(){const t=s===0;p?.toggleAttribute("hidden",!t),Le?.classList.toggle("has-pdf",t)}function Fe(t){if(t===0){const o=Me(),i=Ie();return o&&i}return!0}function Me(){const t=e.querySelector('[data-step-error="upload"]'),o=!!b;return t?.toggleAttribute("hidden",o),o}function Ie(){let t=!0;[e.querySelector('[data-field="invoice-number"]'),e.querySelector('[data-field="invoice-date"]'),e.querySelector('[data-field="perf-start"]'),e.querySelector('[data-field="perf-end"]'),e.querySelector('[data-field="contract"]')].forEach(k=>{if(!k)return;(k.value??k.getAttribute("value")??"").trim()?k.removeAttribute("error-text"):(k.setAttribute("error-text","This field is required."),t=!1)});const i=e.querySelector('[data-field="perf-start"]'),d=e.querySelector('[data-field="perf-end"]'),u=i?.value??"",T=d?.value??"";u&&T&&u>T&&(d?.setAttribute("error-text","End date must be on or after start date."),t=!1);const F=e.querySelector('[data-step-error="total"]'),w=e.querySelector('[data-step-error="total-exceeds"]');return G()<=0?(t=!1,F?.removeAttribute("hidden"),w?.setAttribute("hidden",""),v?.setAttribute("error-text","Enter the invoice total amount.")):(F?.setAttribute("hidden",""),_e()?(t=!1,j()):(w?.setAttribute("hidden",""),v?.removeAttribute("error-text"))),t}let z=!1;function H(){const t=!z;e.querySelector("[data-form-lock-notice]")?.toggleAttribute("hidden",!t),e.querySelectorAll("[data-field]:not([data-readonly])").forEach(o=>{o.toggleAttribute("disabled",t)}),e.querySelector("[data-add-line-item]")?.toggleAttribute("disabled",t),e.querySelector("[data-docs-add]")?.toggleAttribute("disabled",t),e.querySelectorAll(".cbf-li-input").forEach(o=>{o.disabled=t}),e.querySelectorAll(".cbf-li-remove").forEach(o=>{o.disabled=t})}H();let b=null;const E=e.querySelector("[data-upload-zone]"),I=e.querySelector("[data-upload-input]"),C=e.querySelector("[data-mobile-upload-input]"),pe=e.querySelector("[data-upload-idle]"),he=e.querySelector("[data-pdf-viewer]");let _=null;const W=25*1024*1024;function Oe(t){const o=e.querySelector("[data-upload-inline-error]"),i=e.querySelector("[data-upload-inline-error-msg]");i&&(i.textContent=t),o?.removeAttribute("hidden")}function Ne(){e.querySelector("[data-upload-inline-error]")?.setAttribute("hidden","")}function Pe(t){return t.type==="application/pdf"||t.name.toLowerCase().endsWith(".pdf")?t.size>W?`This file is ${P(t.size)} — the maximum is 25 MB. Please upload a smaller PDF.`:null:"That file isn’t a PDF. Please upload a PDF invoice."}function O(t){const o=Pe(t);if(o){Oe(o);return}Ne(),b=t,pe?.setAttribute("hidden",""),he?.removeAttribute("hidden"),e.querySelector('[data-step-error="upload"]')?.setAttribute("hidden",""),z||(z=!0,H()),_&&URL.revokeObjectURL(_),_=URL.createObjectURL(t),M&&(M.src=_),ne&&(ne.textContent=t.name),s===1&&Ee(),q()}function fe(){b=null,I.value="",C&&(C.value=""),he?.setAttribute("hidden",""),pe?.removeAttribute("hidden"),_&&(URL.revokeObjectURL(_),_=null),M&&(M.src=""),q()}let y=[];const N=e.querySelector("[data-docs-input]"),J=e.querySelector("[data-docs-list]");function X(){J&&(J.innerHTML=y.map((t,o)=>`
      <div class="cbf-doc-row">
        <svg class="cbf-doc-row__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <div class="cbf-doc-row__info">
          <span class="cbf-doc-row__name">${Y(t.name)}</span>
          <span class="cbf-doc-row__size">${P(t.size)}</span>
        </div>
        <button type="button" class="cbf-doc-row__remove" data-doc-remove="${o}" aria-label="Remove ${Y(t.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""))}e.querySelector("[data-docs-add]")?.addEventListener("click",()=>N?.click());function ve(t){const o=e.querySelector("[data-docs-error]"),i=e.querySelector("[data-docs-error-msg]");t?(i&&(i.textContent=t),o?.removeAttribute("hidden")):o?.setAttribute("hidden","")}function ge(t){if(!t.length)return;const o=t.filter(d=>d.size>W),i=new Set(y.map(d=>d.name));if(y.push(...t.filter(d=>d.size<=W&&!i.has(d.name))),o.length){const d=o.map(u=>u.name).join(", ");ve(`${d} ${o.length>1?"each exceed":"exceeds"} the 25 MB limit and ${o.length>1?"were":"was"} not added.`)}else ve("");X()}N?.addEventListener("change",()=>{ge(Array.from(N.files??[])),N.value=""});const x=e.querySelector("[data-docs-zone]");x?.addEventListener("dragover",t=>{t.preventDefault(),x.classList.add("is-over")}),x?.addEventListener("dragleave",t=>{x.contains(t.relatedTarget)||x.classList.remove("is-over")}),x?.addEventListener("drop",t=>{t.preventDefault(),x.classList.remove("is-over"),ge(Array.from(t.dataTransfer?.files??[]))}),J?.addEventListener("click",t=>{const o=t.target.closest("[data-doc-remove]");o&&(y.splice(Number(o.dataset.docRemove),1),X())}),e.querySelector("[data-upload-browse]")?.addEventListener("click",()=>I.click()),e.querySelector("[data-upload-remove]")?.addEventListener("click",fe),e.querySelector("[data-mobile-upload-btn]")?.addEventListener("click",()=>C?.click()),I.addEventListener("change",()=>{const t=I.files?.[0];t&&O(t)}),C?.addEventListener("change",()=>{const t=C.files?.[0];t&&O(t)}),E.addEventListener("dragover",t=>{t.preventDefault(),E.classList.add("is-over")}),E.addEventListener("dragleave",()=>E.classList.remove("is-over")),E.addEventListener("drop",t=>{t.preventDefault(),E.classList.remove("is-over");const o=t.dataTransfer?.files?.[0];o&&O(o)});function P(t){return t<1024*1024?`${(t/1024).toFixed(0)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}function Z(t){if(!t)return"—";const o=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t),i=o?new Date(Number(o[1]),Number(o[2])-1,Number(o[3])):new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}let h=[];const B=e.querySelector("[data-line-items]"),me=e.querySelector("[data-invoice-total]"),v=e.querySelector('[data-field="total-amount"]');function G(){const t=String(v?.value??"").replace(/[^0-9.]/g,""),o=parseFloat(t);return Number.isFinite(o)&&o>0?o:0}function be(){const t=Q[m?.value??""];return t?t.remaining:null}function _e(){const t=be();return t!=null&&G()>t}function j(){const t=e.querySelector('[data-step-error="total-exceeds"]'),o=be();if(o!=null&&_e()){const i=t?.querySelector("[data-remaining-amount]");i&&(i.textContent=A(o)),t?.removeAttribute("hidden"),v?.setAttribute("error-text","Exceeds the remaining contract balance.")}else t?.setAttribute("hidden",""),v?.getAttribute("error-text")==="Exceeds the remaining contract balance."&&v.removeAttribute("error-text")}function ye(){h.push({description:"",qty:1,unitPrice:0}),xe()}function Be(t){h.splice(t,1),xe()}function xe(){const t=z?"":" disabled";B.innerHTML=h.map((o,i)=>`
      <div class="cbf-line-item" data-row="${i}">
        <input${t}
          class="cbf-li-input cbf-li-desc"
          type="text"
          placeholder="Description…"
          value="${Y(o.description)}"
          data-li-field="description"
          data-li-idx="${i}"
        />
        <input${t}
          class="cbf-li-input cbf-li-qty"
          type="number"
          min="1"
          value="${o.qty}"
          data-li-field="qty"
          data-li-idx="${i}"
          style="text-align:right"
        />
        <input${t}
          class="cbf-li-input cbf-li-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value="${o.unitPrice||""}"
          data-li-field="unitPrice"
          data-li-idx="${i}"
          style="text-align:right"
        />
        <span class="cbf-li-total" data-li-total="${i}">${A(o.qty*o.unitPrice)}</span>
        <button type="button"${t} class="cbf-li-remove" data-li-remove="${i}" aria-label="Remove line item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""),we()}function we(){const t=h.reduce((o,i)=>o+i.qty*i.unitPrice,0);me&&(me.textContent=A(t))}function A(t){return t.toLocaleString("en-US",{style:"currency",currency:"USD"})}function Y(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}B.addEventListener("input",t=>{const o=t.target,i=Number(o.dataset.liIdx),d=o.dataset.liField;if(!d||isNaN(i))return;d==="description"&&(h[i].description=o.value),d==="qty"&&(h[i].qty=Math.max(1,Number(o.value)||1)),d==="unitPrice"&&(h[i].unitPrice=Math.max(0,Number(o.value)||0));const u=B.querySelector(`[data-li-total="${i}"]`);u&&(u.textContent=A(h[i].qty*h[i].unitPrice)),we()}),B.addEventListener("click",t=>{const o=t.target.closest("[data-li-remove]");o&&Be(Number(o.dataset.liRemove))}),e.querySelector("[data-add-line-item]")?.addEventListener("click",ye);const g=e.querySelector("[data-final-invoice]"),je=e.querySelector("[data-final-invoice-callout]"),L=e.querySelector("[data-final-invoice-dialog]"),m=e.querySelector('[data-field="contract"]');let Q={};try{Q=JSON.parse(m?.dataset.contractAmounts??"{}")}catch{}v?.addEventListener("input",j),v?.addEventListener("change",j),m?.addEventListener("change",j);const ke=e.querySelector('[data-field="project"]');let Se={};try{Se=JSON.parse(m?.dataset.contractProjects??"{}")}catch{}m?.addEventListener("change",()=>{ke&&(ke.value=Se[m.value??""]??"")});function ee(){je?.classList.toggle("is-flagged",!!g?.checked)}let R=!1;g?.addEventListener("change",()=>{R=!0,ee()});function $e(){return G()}function Ye(){const t=Q[m?.value??""],o=$e();if(!t||o<=0)return!1;const i=t.remaining-o;return i>=0&&i<.05*t.total}function Re(){return!!g&&!R&&!g.checked&&Ye()}function Ve(t){if(!L){t();return}const o=m?.value||"this contract";L.message=`The remaining balance on ${o} is within 5% of this invoice's total, which usually means it's the last one. Marking it final closes out the contract — should we flag this as the final invoice?`;const i=d=>{L.removeEventListener("resolved",i),!d.detail?.dismissed&&(R=!0,d.detail?.confirmed&&(g.checked=!0,ee()),t())};L.addEventListener("resolved",i),L.show()}ye();function D(t){return e.querySelector(t)?.value??""}function Ue(t){const o=e.querySelector(t);if(!o)return"";const i=o.value??"";return o.options?.find(u=>u.value===i)?.label??i}const Ke='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';function qe(t){if(!t)return;const o=(w,k)=>{const te=t.querySelector(`[data-review="${w}"]`);te&&(te.textContent=k)};o("file-name",b?.name??"(no file)"),o("file-size",b?P(b.size):""),o("invoice-number",D('[data-field="invoice-number"]')||"No invoice number"),o("contract",Ue('[data-field="contract"]')||"—"),o("project",D('[data-field="project"]')||"—");const i=D('[data-field="invoice-date"]');o("issued",i?Z(i):"Not set");const d=D('[data-field="perf-start"]'),u=D('[data-field="perf-end"]');o("perf-start",d?Z(d):"Not set"),o("perf-end",u?Z(u):"Not set"),o("total",A($e())),t.querySelector('[data-review="final-flag"]')?.toggleAttribute("hidden",!g?.checked);const T=t.querySelector('[data-review="docs-list"]');T&&(T.innerHTML=y.map(w=>`
        <div class="cbf-review-row">
          ${Ke}
          <span>${Y(w.name)}</span>
          <span class="cbf-review-meta">${P(w.size)}</span>
        </div>`).join("")),t.querySelector('[data-review="docs-card"]')?.toggleAttribute("hidden",y.length===0);const F=D('[data-field="notes"]');o("notes",F),t.querySelector('[data-review="notes-card"]')?.toggleAttribute("hidden",!F)}function Ee(){qe(e.querySelector("[data-review-content]"))}function He(){qe(e.querySelector("[data-modal-review-content]"))}function We(){document.querySelector("[data-snackbar]")?.success?.("Draft saved.",{duration:3e3}),setTimeout(()=>{window.location.href="/cb-fish-design/vendor-dashboard"},700)}function De(){const t=ce()==="modal",o=t?"[data-modal-submit]":"[data-wizard-submit]",i=e.querySelector(`${o} button.esa-button`);if(i){if(i.classList.add("esa-button--loading"),i.disabled=!0,i.setAttribute("aria-busy","true"),!i.querySelector(".esa-button__spinner")){const d=document.createElement("span");d.className="esa-button__spinner",d.setAttribute("aria-hidden","true"),i.prepend(d)}i.querySelector(".esa-button__label")?.classList.add("esa-button__label--hidden")}setTimeout(()=>{const d=`INV-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9e4)+1e4)}`;Je(i),t&&e.querySelector("[data-confirm-modal]")?.close(),Xe(),document.querySelector("[data-snackbar]")?.success?.(`Invoice ${d} submitted.`,{duration:4e3})},1500)}function Je(t){t&&(t.classList.remove("esa-button--loading"),t.disabled=!1,t.removeAttribute("aria-busy"),t.querySelector(".esa-button__spinner")?.remove(),t.querySelector(".esa-button__label")?.classList.remove("esa-button__label--hidden"))}function Xe(){fe(),y=[],X(),e.querySelectorAll("[data-field]").forEach(t=>{typeof t.checked=="boolean"&&(t.checked=!1),t.value="",t.removeAttribute?.("error-text")}),e.querySelectorAll("[data-step-error]").forEach(t=>t.setAttribute("hidden","")),R=!1,g&&(g.checked=!1),ee(),z=!1,H(),$(s,!1),s=0,$(0,!0),K(),q(),window.scrollTo({top:0,behavior:"smooth"})}}rt();
