import"./crs-commitments.astro_astro_type_script_index_0_lang.BfuPGaUe.js";import"./esa-text-field.astro_astro_type_script_index_0_lang.Bh9QjbpR.js";import"./esa-select.HUpJg4S3.js";import{i as Ie,b as s,A,a as Te}from"./lit-element.C8p3bJxG.js";import"./esa-checkbox.astro_astro_type_script_index_0_lang.CAN_sttU.js";import"./esa-confirm-dialog.DkUG8ZSa.js";import"./esa-dialog.ClC7BfLJ.js";import"./esa-textarea.astro_astro_type_script_index_0_lang.f3qIukGs.js";class st extends Ie{constructor(){super(),this._suppressNextOpen=!1,this.searchTimer=null,this.lastEmittedSearch="",this.onDocClick=e=>{this._open&&(e.composedPath().includes(this)||this.closeDropdown())},this.onSearchInput=e=>{const i=e.target.value;this._search=i,this._active=-1,this.emitSearch(i),this._open||this.openDropdown()},this.onInputFocus=()=>{if(this._suppressNextOpen){this._suppressNextOpen=!1;return}this._open||this.openDropdown()},this.onInputClick=()=>{this._open||this.openDropdown()},this.onKeydown=e=>{const i=this.filteredOptions;switch(e.key){case"ArrowDown":if(e.preventDefault(),!this._open)return this.openDropdown();{let a=this._active+1;for(;a<i.length&&i[a].disabled;)a++;a<i.length&&(this._active=a)}break;case"ArrowUp":if(e.preventDefault(),!this._open)return this.openDropdown();{let a=this._active-1;for(;a>=0&&i[a].disabled;)a--;a>=0&&(this._active=a)}break;case"Enter":if(e.preventDefault(),this._open&&this._active>=0){const a=i[this._active];a&&!a.disabled&&this.selectOption(a)}else this._open||this.openDropdown();break;case"Escape":e.preventDefault(),this.closeDropdown();break;case"Tab":this.closeDropdown();break}},this.mode="select",this.triggerStyle="field",this.options=[],this.multiple=!1,this.size="md",this.label="",this.placeholder="Select...",this.disabled=!1,this.required=!1,this.helpText="",this.errorText="",this.loading=!1,this.debounceMs=300,this.resultsCount=null,this._search="",this._selected=[],this._open=!1,this._active=-1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={mode:{type:String,reflect:!0},triggerStyle:{type:String,attribute:"trigger-style"},options:{type:Array},multiple:{type:Boolean},size:{type:String,reflect:!0},label:{type:String},placeholder:{type:String},disabled:{type:Boolean,reflect:!0},required:{type:Boolean},helpText:{type:String,attribute:"help-text"},errorText:{type:String,attribute:"error-text"},loading:{type:Boolean},debounceMs:{type:Number,attribute:"debounce-ms"},resultsCount:{type:Number,attribute:"results-count"},_search:{state:!0},_selected:{state:!0},_open:{state:!0},_active:{state:!0}}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocClick),this.syncFormValue()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocClick),this.searchTimer&&clearTimeout(this.searchTimer)}set value(e){e==null?this._selected=[]:Array.isArray(e)?this._selected=e:this._selected=[e],this.syncFormValue()}get value(){return this.multiple?this._selected:this._selected[0]??""}get filteredOptions(){const e=this._search.toLowerCase();return e?this.options.filter(i=>i.label.toLowerCase().includes(e)):this.options}get displayValue(){return this._selected.length===0?"":this.multiple?this.options.filter(i=>this._selected.includes(i.value)).map(i=>i.label).join(", "):this.options.find(i=>i.value===this._selected[0])?.label??""}get selectedOptions(){return this.options.filter(e=>this._selected.includes(e.value))}get currentPlaceholder(){return this.multiple&&this._selected.length>0?"":this.placeholder}get inputValue(){return this.multiple?this._search:this._search||this.displayValue}isSelected(e){return this._selected.includes(e)}syncFormValue(){this.internals.setFormValue(this.multiple?this._selected.join(","):this._selected[0]??null)}emitValue(){this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}emitSearch(e){this.searchTimer&&clearTimeout(this.searchTimer),this.searchTimer=setTimeout(()=>{e!==this.lastEmittedSearch&&(this.lastEmittedSearch=e,this.dispatchEvent(new CustomEvent("search",{detail:{term:e},bubbles:!0,composed:!0})))},this.debounceMs)}toggleDropdown(){this.disabled||(this._open?this.closeDropdown():this.openDropdown())}openDropdown(){this.disabled||this._open||(this._open=!0,this._active=-1,this.mode==="select"&&requestAnimationFrame(()=>{this.renderRoot.querySelector(".search-input")?.focus()}))}closeDropdown(){this._open&&(this._open=!1,this._search="")}selectOption(e){if(e.disabled)return;const i=e.value;if(this.multiple){const a=this._selected.indexOf(i);this._selected=a>=0?this._selected.filter(n=>n!==i):[...this._selected,i],this._search="",this.emitValue();const c=this.mode==="autocomplete"?".input":".search-input";requestAnimationFrame(()=>this.renderRoot.querySelector(c)?.focus())}else if(this._selected=[i],this._search="",this.emitValue(),this.closeDropdown(),this.mode==="autocomplete"){const a=this.renderRoot.querySelector(".input");a&&this.renderRoot.activeElement!==a&&(this._suppressNextOpen=!0,requestAnimationFrame(()=>a.focus()))}}removeValue(e,i){i?.stopPropagation(),this._selected=this._selected.filter(a=>a!==e),this.emitValue()}highlight(e){const i=this._search.trim();if(!i)return s`${e}`;const c=e.toLowerCase().indexOf(i.toLowerCase());return c<0?s`${e}`:s`${e.slice(0,c)}<mark class="hl">${e.slice(c,c+i.length)}</mark>${e.slice(c+i.length)}`}render(){const e=!!this.errorText;return s`
      <div class="field ${e?"field--error":""}">
        ${this.label?s`<label class="field__label">
              ${this.label}${this.required?s`<span class="field__required">*</span>`:null}
            </label>`:null}

        <div class="container">
          ${this.mode==="autocomplete"?this.renderAutocomplete():this.renderSelect()}
          ${this._open?this.renderDropdown():null}
        </div>

        ${e?s`<span class="field__error">${this.errorText}</span>`:this.helpText?s`<span class="field__help">${this.helpText}</span>`:null}
      </div>
    `}renderAutocomplete(){return s`
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
        ${this.loading?s`<span class="spinner spinner--inline">${this.spinnerIcon()}</span>`:null}
      </div>
    `}renderSelect(){const e=this.triggerStyle==="field";return s`
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
    `}renderChips(){return this.selectedOptions.length===0?A:s`<div class="chips">
      ${this.selectedOptions.map(e=>s`<span class="chip">
          <span class="chip__label">${e.label}</span>
          <button
            type="button"
            class="chip__remove"
            aria-label=${"Remove "+e.label}
            @click=${i=>this.removeValue(e.value,i)}
          >
            ${this.xIcon()}
          </button>
        </span>`)}
    </div>`}renderDropdown(){const e=this.filteredOptions;return s`<div class="dropdown" role="listbox" @keydown=${this.onKeydown}>
      ${this.mode==="select"?s`<div class="search">
            ${this.searchIcon()}
            <input
              class="search-input"
              placeholder="Search..."
              .value=${this._search}
              @input=${this.onSearchInput}
              @keydown=${this.onKeydown}
            />
            ${this.loading?s`<span class="spinner">${this.spinnerIcon()}</span>`:null}
          </div>`:null}

      ${this.resultsCount!==null?s`<div class="results-count">Displaying ${e.length} of ${this.resultsCount} results</div>`:null}

      <div class="viewport">
        ${e.map((i,a)=>{const c=this.isSelected(i.value);return s`<div
            class="option ${a===this._active?"option--active":""} ${c?"option--selected":""} ${i.disabled?"option--disabled":""}"
            role="option"
            aria-selected=${c}
            @click=${()=>this.selectOption(i)}
            @mouseenter=${()=>this._active=a}
          >
            ${this.multiple?s`<span class="check ${c?"check--selected":""}">${this.checkIcon()}</span>`:null}
            <span class="option__label">${this.highlight(i.label)}</span>
          </div>`})}
      </div>

      ${e.length===0&&!this.loading?s`<div class="empty">${this._search?"No results found":"No options available"}</div>`:null}
      ${this.loading&&e.length===0?s`<div class="loading"><span class="spinner">${this.spinnerIcon()}</span> Searching...</div>`:null}
    </div>`}chevronIcon(){return s`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>`}checkIcon(){return s`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>`}xIcon(){return s`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>`}searchIcon(){return s`<svg class="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>`}spinnerIcon(){return s`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>`}static{this.styles=Te`
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
  `}}customElements.get("esa-combobox")||customElements.define("esa-combobox",st);const ae=["January","February","March","April","May","June","July","August","September","October","November","December"],lt=["Su","Mo","Tu","We","Th","Fr","Sa"],Fe=[];for(let d=1990;d<=2060;d++)Fe.push(d);function ze(d){if(!d)return null;const e=d.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const i=parseInt(e[1],10),a=parseInt(e[2],10)-1,c=parseInt(e[3],10),n=new Date(i,a,c);return n.getFullYear()!==i||n.getMonth()!==a||n.getDate()!==c?null:n}function Le(d){return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}function ne(d,e){return d.getFullYear()===e.getFullYear()&&d.getMonth()===e.getMonth()&&d.getDate()===e.getDate()}function se(d){return`${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}/${d.getFullYear()}`}function K(d){const e=d.trim();if(!e)return null;const i=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);if(i){const c=i[3].length===2?2e3+parseInt(i[3]):parseInt(i[3]),n=new Date(c,parseInt(i[1])-1,parseInt(i[2]));if(n.getMonth()===parseInt(i[1])-1&&n.getDate()===parseInt(i[2]))return n}const a=new Date(e);return isNaN(a.getTime())?null:a}function ct(d,e=!1){const i=d.slice(0,8);return i.length===0?"":i.length<2?i:i.length===2?e?i:`${i}/`:i.length<4?`${i.slice(0,2)}/${i.slice(2)}`:i.length===4?e?`${i.slice(0,2)}/${i.slice(2)}`:`${i.slice(0,2)}/${i.slice(2)}/`:`${i.slice(0,2)}/${i.slice(2,4)}/${i.slice(4)}`}class dt extends Ie{static formAssociated=!0;static properties={label:{type:String},placeholder:{type:String},required:{type:Boolean},disabled:{type:Boolean,reflect:!0},errorText:{type:String,attribute:"error-text"},helpText:{type:String,attribute:"help-text"},value:{type:String},_open:{state:!0},_viewYear:{state:!0},_viewMonth:{state:!0},_monthOpen:{state:!0},_yearOpen:{state:!0},_monthSearch:{state:!0},_yearSearch:{state:!0},_inputText:{state:!0}};internals;_onDocClick=e=>{this._open&&!e.composedPath().includes(this)&&this._close()};_onSiblingOpen=e=>{e.detail?.source!==this&&this._open&&this._close()};constructor(){super(),this.label="",this.placeholder="MM/DD/YYYY",this.required=!1,this.disabled=!1,this.errorText="",this.helpText="",this.value="";const e=new Date;this._viewYear=e.getFullYear(),this._viewMonth=e.getMonth(),this._open=!1,this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch="",this._inputText="",this.internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick),document.addEventListener("bcn-date-picker:open",this._onSiblingOpen)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick),document.removeEventListener("bcn-date-picker:open",this._onSiblingOpen)}updated(e){if(e.has("value")){this.internals.setFormValue(this.value||null);const i=ze(this.value);if(i){this._viewYear=i.getFullYear(),this._viewMonth=i.getMonth();const a=K(this._inputText);(!a||!ne(a,i))&&(this._inputText=se(i))}else this.value||(this._inputText="")}}_calendarCells(){const e=new Date(this._viewYear,this._viewMonth,1),i=new Date(this._viewYear,this._viewMonth+1,0).getDate(),a=[];for(let c=0;c<e.getDay();c++)a.push(null);for(let c=1;c<=i;c++)a.push(new Date(this._viewYear,this._viewMonth,c));for(;a.length%7!==0;)a.push(null);return a}_onTextInput(e){const i=e.target,a=e.inputType==="insertFromPaste",c=e.inputType?.startsWith("delete")??!1;let n;if(a){const h=K(i.value);n=h?se(h):i.value}else{const h=i.value.replace(/\D/g,"").slice(0,8);n=ct(h,c)}i.value=n,this._inputText=n;const g=K(n);g?(this.value=Le(g),this.internals.setFormValue(this.value),this._viewYear=g.getFullYear(),this._viewMonth=g.getMonth(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))):n||(this.value="",this.internals.setFormValue(null),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}_onTextBlur(){if(!this._inputText)return;const e=K(this._inputText);e&&(this._inputText=se(e))}_toggle(e){e.stopPropagation(),!this.disabled&&(this._open=!this._open,this._open?document.dispatchEvent(new CustomEvent("bcn-date-picker:open",{detail:{source:this}})):this._closeNavDropdowns())}_close(){this._open=!1,this._closeNavDropdowns()}_closeNavDropdowns(){this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch=""}_toggleMonth(e){e.stopPropagation(),this._monthOpen=!this._monthOpen,this._yearOpen=!1,this._monthSearch="",this._monthOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--month")?.focus()})}_toggleYear(e){e.stopPropagation(),this._yearOpen=!this._yearOpen,this._monthOpen=!1,this._yearSearch="",this._yearOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--year")?.focus(),this.shadowRoot?.querySelector(".cal-nav__option.is-selected")?.scrollIntoView({block:"nearest"})})}_selectMonth(e,i){i.stopPropagation(),this._viewMonth=e,this._monthOpen=!1,this._monthSearch=""}_selectYear(e,i){i.stopPropagation(),this._viewYear=e,this._yearOpen=!1,this._yearSearch=""}_selectDay(e){this.value=Le(e),this.internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this._close()}_selectToday(){const e=new Date;e.setHours(0,0,0,0),this._selectDay(e)}_onKeyDown(e){e.key==="Escape"&&(this._monthOpen||this._yearOpen?(this._closeNavDropdowns(),e.stopPropagation()):this._open&&(this._close(),e.stopPropagation()))}_onCalendarClick(e){if(!this._monthOpen&&!this._yearOpen)return;const i=e.composedPath();let a=!1;this.shadowRoot?.querySelectorAll(".cal-nav").forEach(c=>{i.includes(c)&&(a=!0)}),a||this._closeNavDropdowns()}_renderMonthCombo(){const e=ae.filter(i=>i.toLowerCase().includes(this._monthSearch.toLowerCase()));return s`
      <div class="cal-nav" data-type="month">
        <button type="button"
          class="cal-nav__trigger${this._monthOpen?" is-open":""}"
          @click=${this._toggleMonth}
          aria-haspopup="listbox"
          aria-expanded=${String(this._monthOpen)}
          aria-label="Select month">
          ${ae[this._viewMonth]}
          <svg class="cal-nav__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${this._monthOpen?s`
          <div class="cal-nav__panel" @click=${i=>i.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--month"
              placeholder="Month…"
              .value=${this._monthSearch}
              @input=${i=>{this._monthSearch=i.target.value}}
              aria-label="Search months"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${e.length===0?s`<p class="cal-nav__empty">No match</p>`:e.map(i=>{const a=ae.indexOf(i),c=a===this._viewMonth;return s`<button type="button" role="option"
                    class="cal-nav__option${c?" is-selected":""}"
                    aria-selected=${String(c)}
                    @click=${n=>this._selectMonth(a,n)}>${i}</button>`})}
            </div>
          </div>`:A}
      </div>`}_renderYearCombo(){const e=Fe.filter(i=>String(i).includes(this._yearSearch));return s`
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
        ${this._yearOpen?s`
          <div class="cal-nav__panel" @click=${i=>i.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--year"
              placeholder="Year…"
              .value=${this._yearSearch}
              @input=${i=>{this._yearSearch=i.target.value}}
              aria-label="Search years"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${e.length===0?s`<p class="cal-nav__empty">No match</p>`:e.map(i=>{const a=i===this._viewYear;return s`<button type="button" role="option"
                    class="cal-nav__option${a?" is-selected":""}"
                    aria-selected=${String(a)}
                    @click=${c=>this._selectYear(i,c)}>${i}</button>`})}
            </div>
          </div>`:A}
      </div>`}render(){const e=ze(this.value),i=new Date;i.setHours(0,0,0,0);const a=this._calendarCells(),c=!!this.errorText;return s`
      <div class="field" @keydown=${this._onKeyDown}>

        ${this.label?s`
          <label class="field__label" @click=${()=>this.shadowRoot?.querySelector(".date-input")?.focus()}>
            ${this.label}${this.required?s`<span class="field__req" aria-hidden="true">&thinsp;*</span>`:A}
          </label>`:A}

        <div class="field__wrap">
          <div class="field__row${c?" has-error":""}">
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

          ${this._open?s`
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
                ${lt.map(n=>s`<span class="calendar__weekday">${n}</span>`)}
              </div>

              <div class="calendar__days">
                ${a.map(n=>{if(!n)return s`<span class="calendar__day is-empty"></span>`;const g=ne(n,i),h=e&&ne(n,e);return s`
                    <button
                      type="button"
                      class="calendar__day${g?" is-today":""}${h?" is-selected":""}"
                      aria-label=${n.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
                      aria-pressed=${String(!!h)}
                      @click=${()=>this._selectDay(n)}
                    >${n.getDate()}</button>`})}
              </div>


            </div>`:A}
        </div>

        ${c?s`<p class="field__message field__message--error" role="alert">${this.errorText}</p>`:this.helpText?s`<p class="field__message">${this.helpText}</p>`:A}

      </div>
    `}static styles=Te`
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
  `}customElements.define("bcn-date-picker",dt);function ut(){const d=document.querySelector("[data-invoice-wizard]");if(!d)return;const e=d,i=e.querySelector("[data-stepper]"),a=Array.from(e.querySelectorAll("[data-stepper-step]")),c=Array.from(e.querySelectorAll(".cbf-stepper__line"));let n=0;const g=2,h=e.querySelector("[data-pdf-panel]"),m=e.querySelector("[data-pdf-frame]"),D=e.querySelector("[data-pdf-filename]"),Oe=e.querySelector(".cbf-invoice-workspace");function q(t,r){e.querySelectorAll(`[data-step="${t}"]`).forEach(o=>{r?o.removeAttribute("hidden"):o.setAttribute("hidden","")})}function Z(t){if(!(t!==g&&!Be(n))){if(n===0&&t===1&&Xe()){Qe(()=>Z(t));return}if(t===1&&de()==="modal"){Ne();return}q(n,!1),n=t,q(n,!0),G(),n===1&&Ce(),C(),window.scrollTo({top:0,behavior:"smooth"})}}function Ne(){const t=e.querySelector("[data-confirm-modal]");t&&(it(),t.show())}function G(){const t=n>=a.length;i?.toggleAttribute("hidden",t),!t&&(a.forEach((r,o)=>{r.classList.toggle("is-active",o===n),r.classList.toggle("is-done",o<n)}),c.forEach((r,o)=>{r.style.background=o<n?"var(--color-primary)":"var(--color-border)"}))}let le="page";const ce=e.querySelector("[data-confirm-mode-bar]");ce?.addEventListener("click",t=>{const r=t.target.closest("[data-confirm-mode]");if(!r)return;const o=r.dataset.confirmMode;o&&(le=o,ce.querySelectorAll("[data-confirm-mode]").forEach(l=>{l.classList.toggle("is-active",l.dataset.confirmMode===o)}))});function de(){return le}const Pe="JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXSAvUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GMSA0IDAgUiA+PiA+PiAvQ29udGVudHMgNSAwIFIgPj4KZW5kb2JqCjQgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iago1IDAgb2JqCjw8IC9MZW5ndGggNjAgPj4Kc3RyZWFtCkJUIC9GMSAyMiBUZiA3MiA3MDAgVGQgKERlbW8gaW52b2ljZSBcMjI2IGZvciB0ZXN0aW5nKSBUaiBFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0MSAwMDAwMCBuIAowMDAwMDAwMzExIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKNDIxCiUlRU9GCg==";function je(){const t=Uint8Array.from(atob(Pe),r=>r.charCodeAt(0));return new File([t],"demo-invoice.pdf",{type:"application/pdf"})}function ue(){u||B(je());const t=(r,o)=>{const l=e.querySelector(r);l&&(l.value=o,l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0})))};t('[data-field="contract"]',"CON-2025-0112"),t('[data-field="invoice-number"]',"INV-2026-0042"),t('[data-field="invoice-date"]',"2026-06-29"),t('[data-field="perf-start"]',"2026-01-01"),t('[data-field="perf-end"]',"2026-03-31"),t('[data-field="total-amount"]',"4850.00"),t('[data-field="notes"]',"Autofilled demo invoice (testing)."),Z(1)}window.vendorInvoiceAutofill=ue,e.addEventListener("click",t=>{const r=t.target;r.closest("[data-wizard-next]")&&Z(n+1),r.closest("[data-wizard-back]")&&n>0&&(q(n,!1),n--,q(n,!0),G(),C()),r.closest("[data-wizard-save-draft]")&&ot(),r.closest("[data-wizard-submit]")&&Me(),r.closest("[data-modal-submit]")&&Me(),r.closest("[data-modal-back]")&&e.querySelector("[data-confirm-modal]")?.close(),r.closest("[data-wizard-cancel]")&&(e.querySelector("[data-confirm-modal]")?.close(),window.location.href="/cb-fish-design/vendor-dashboard"),r.closest("[data-dev-autofill]")&&ue()}),e.querySelectorAll("[data-combobox-options]").forEach(t=>{try{t.options=JSON.parse(t.dataset.comboboxOptions??"[]")}catch{}});function C(){const t=n===1,r=n===0||t;h?.toggleAttribute("hidden",!r),Oe?.classList.toggle("has-pdf",r),e.querySelector("[data-upload-remove]")?.toggleAttribute("hidden",t),r&&u&&ve()}function Be(t){if(t===0){const r=Re(),o=Ue();return r&&o}return!0}function Re(){const t=e.querySelector('[data-step-error="upload"]'),r=!!u;return t?.toggleAttribute("hidden",r),r}function Ue(){let t=!0;[e.querySelector('[data-field="invoice-number"]'),e.querySelector('[data-field="invoice-date"]'),e.querySelector('[data-field="perf-start"]'),e.querySelector('[data-field="perf-end"]'),e.querySelector('[data-field="contract"]')].forEach(k=>{if(!k)return;(k.value??k.getAttribute("value")??"").trim()?k.removeAttribute("error-text"):(k.setAttribute("error-text","This field is required."),t=!1)});const o=e.querySelector('[data-field="perf-start"]'),l=e.querySelector('[data-field="perf-end"]'),p=o?.value??"",O=l?.value??"";p&&O&&p>O&&(l?.setAttribute("error-text","End date must be on or after start date."),t=!1);const N=e.querySelector('[data-step-error="total"]'),P=e.querySelector('[data-step-error="total-exceeds"]');return te()<=0?(t=!1,N?.removeAttribute("hidden"),P?.setAttribute("hidden",""),y?.setAttribute("error-text","Enter the invoice total amount.")):(N?.setAttribute("hidden",""),xe()?(t=!1,V()):(P?.setAttribute("hidden",""),y?.removeAttribute("error-text"))),t}let L=!1;function H(){const t=!L;e.querySelector("[data-form-lock-notice]")?.toggleAttribute("hidden",!t),e.querySelectorAll("[data-field]:not([data-readonly])").forEach(r=>{r.toggleAttribute("disabled",t)}),e.querySelector("[data-add-line-item]")?.toggleAttribute("disabled",t),e.querySelector("[data-docs-add]")?.toggleAttribute("disabled",t),e.querySelectorAll(".cbf-li-input").forEach(r=>{r.disabled=t}),e.querySelectorAll(".cbf-li-remove").forEach(r=>{r.disabled=t})}H();let u=null;const M=e.querySelector("[data-upload-zone]"),j=e.querySelector("[data-upload-input]"),I=e.querySelector("[data-mobile-upload-input]"),pe=e.querySelector("[data-upload-idle]"),he=e.querySelector("[data-pdf-viewer]");let f=null,b=null;function fe(t){e.querySelectorAll("[data-view-invoice],[data-view-doc]").forEach(r=>{r.classList.toggle("is-active",r.getAttribute("data-view-name")===t)})}function ve(){b&&(URL.revokeObjectURL(b),b=null),m&&f&&(m.src=f),D&&u&&(D.textContent=u.name),fe(u?.name??"")}function Ye(t){b&&(URL.revokeObjectURL(b),b=null),b=URL.createObjectURL(t),m&&(m.src=b),D&&(D.textContent=t.name),fe(t.name)}function Ve(t){return t.type==="application/pdf"||t.type.startsWith("image/")||/\.(pdf|png|jpe?g)$/i.test(t.name)}C();const J=25*1024*1024;function We(t){const r=e.querySelector("[data-upload-inline-error]"),o=e.querySelector("[data-upload-inline-error-msg]");o&&(o.textContent=t),r?.removeAttribute("hidden")}function Ke(){e.querySelector("[data-upload-inline-error]")?.setAttribute("hidden","")}function Ze(t){return t.type==="application/pdf"||t.name.toLowerCase().endsWith(".pdf")?t.size>J?`This file is ${U(t.size)} — the maximum is 25 MB. Please upload a smaller PDF.`:null:"That file isn’t a PDF. Please upload a PDF invoice."}function B(t){const r=Ze(t);if(r){We(r);return}Ke(),u=t,pe?.setAttribute("hidden",""),he?.removeAttribute("hidden"),e.querySelector('[data-step-error="upload"]')?.setAttribute("hidden",""),L||(L=!0,H()),f&&URL.revokeObjectURL(f),f=URL.createObjectURL(t),m&&(m.src=f),D&&(D.textContent=t.name),n===1&&Ce(),C()}function ge(){u=null,j.value="",I&&(I.value=""),he?.setAttribute("hidden",""),pe?.removeAttribute("hidden"),f&&(URL.revokeObjectURL(f),f=null),m&&(m.src=""),C()}let _=[];const R=e.querySelector("[data-docs-input]"),X=e.querySelector("[data-docs-list]");function Q(){X&&(X.innerHTML=_.map((t,r)=>`
      <div class="cbf-doc-row">
        <svg class="cbf-doc-row__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <div class="cbf-doc-row__info">
          <span class="cbf-doc-row__name">${E(t.name)}</span>
          <span class="cbf-doc-row__size">${U(t.size)}</span>
        </div>
        <button type="button" class="cbf-doc-row__remove" data-doc-remove="${r}" aria-label="Remove ${E(t.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""))}e.querySelector("[data-docs-add]")?.addEventListener("click",()=>R?.click());function me(t){const r=e.querySelector("[data-docs-error]"),o=e.querySelector("[data-docs-error-msg]");t?(o&&(o.textContent=t),r?.removeAttribute("hidden")):r?.setAttribute("hidden","")}function be(t){if(!t.length)return;const r=t.filter(l=>l.size>J),o=new Set(_.map(l=>l.name));if(_.push(...t.filter(l=>l.size<=J&&!o.has(l.name))),r.length){const l=r.map(p=>p.name).join(", ");me(`${l} ${r.length>1?"each exceed":"exceeds"} the 25 MB limit and ${r.length>1?"were":"was"} not added.`)}else me("");Q()}R?.addEventListener("change",()=>{be(Array.from(R.files??[])),R.value=""});const $=e.querySelector("[data-docs-zone]");$?.addEventListener("dragover",t=>{t.preventDefault(),$.classList.add("is-over")}),$?.addEventListener("dragleave",t=>{$.contains(t.relatedTarget)||$.classList.remove("is-over")}),$?.addEventListener("drop",t=>{t.preventDefault(),$.classList.remove("is-over"),be(Array.from(t.dataTransfer?.files??[]))}),X?.addEventListener("click",t=>{const r=t.target.closest("[data-doc-remove]");r&&(_.splice(Number(r.dataset.docRemove),1),Q())}),e.querySelector("[data-review-content]")?.addEventListener("click",t=>{const r=t.target;if(r.closest("[data-view-invoice]")){ve();return}const o=r.closest("[data-view-doc]");if(o){const l=_[Number(o.dataset.viewDoc)];l&&Ye(l)}}),e.querySelector("[data-upload-browse]")?.addEventListener("click",()=>j.click()),e.querySelector("[data-upload-remove]")?.addEventListener("click",ge),e.querySelector("[data-mobile-upload-btn]")?.addEventListener("click",()=>I?.click()),j.addEventListener("change",()=>{const t=j.files?.[0];t&&B(t)}),I?.addEventListener("change",()=>{const t=I.files?.[0];t&&B(t)}),M.addEventListener("dragover",t=>{t.preventDefault(),M.classList.add("is-over")}),M.addEventListener("dragleave",()=>M.classList.remove("is-over")),M.addEventListener("drop",t=>{t.preventDefault(),M.classList.remove("is-over");const r=t.dataTransfer?.files?.[0];r&&B(r)});function U(t){return t<1024*1024?`${(t/1024).toFixed(0)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}function ee(t){if(!t)return"—";const r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t),o=r?new Date(Number(r[1]),Number(r[2])-1,Number(r[3])):new Date(t);return Number.isNaN(o.getTime())?t:o.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}let v=[];const Y=e.querySelector("[data-line-items]"),_e=e.querySelector("[data-invoice-total]"),y=e.querySelector('[data-field="total-amount"]');function te(){const t=String(y?.value??"").replace(/[^0-9.]/g,""),r=parseFloat(t);return Number.isFinite(r)&&r>0?r:0}function ye(){const t=re[w?.value??""];return t?t.remaining:null}function xe(){const t=ye();return t!=null&&te()>t}function V(){const t=e.querySelector('[data-step-error="total-exceeds"]'),r=ye();if(r!=null&&xe()){const o=t?.querySelector("[data-remaining-amount]");o&&(o.textContent=T(r)),t?.removeAttribute("hidden"),y?.setAttribute("error-text","Exceeds the remaining contract balance.")}else t?.setAttribute("hidden",""),y?.getAttribute("error-text")==="Exceeds the remaining contract balance."&&y.removeAttribute("error-text")}function we(){v.push({description:"",qty:1,unitPrice:0}),ke()}function Ge(t){v.splice(t,1),ke()}function ke(){const t=L?"":" disabled";Y.innerHTML=v.map((r,o)=>`
      <div class="cbf-line-item" data-row="${o}">
        <input${t}
          class="cbf-li-input cbf-li-desc"
          type="text"
          placeholder="Description…"
          value="${E(r.description)}"
          data-li-field="description"
          data-li-idx="${o}"
        />
        <input${t}
          class="cbf-li-input cbf-li-qty"
          type="number"
          min="1"
          value="${r.qty}"
          data-li-field="qty"
          data-li-idx="${o}"
          style="text-align:right"
        />
        <input${t}
          class="cbf-li-input cbf-li-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value="${r.unitPrice||""}"
          data-li-field="unitPrice"
          data-li-idx="${o}"
          style="text-align:right"
        />
        <span class="cbf-li-total" data-li-total="${o}">${T(r.qty*r.unitPrice)}</span>
        <button type="button"${t} class="cbf-li-remove" data-li-remove="${o}" aria-label="Remove line item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""),Se()}function Se(){const t=v.reduce((r,o)=>r+o.qty*o.unitPrice,0);_e&&(_e.textContent=T(t))}function T(t){return t.toLocaleString("en-US",{style:"currency",currency:"USD"})}function E(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}Y.addEventListener("input",t=>{const r=t.target,o=Number(r.dataset.liIdx),l=r.dataset.liField;if(!l||isNaN(o))return;l==="description"&&(v[o].description=r.value),l==="qty"&&(v[o].qty=Math.max(1,Number(r.value)||1)),l==="unitPrice"&&(v[o].unitPrice=Math.max(0,Number(r.value)||0));const p=Y.querySelector(`[data-li-total="${o}"]`);p&&(p.textContent=T(v[o].qty*v[o].unitPrice)),Se()}),Y.addEventListener("click",t=>{const r=t.target.closest("[data-li-remove]");r&&Ge(Number(r.dataset.liRemove))}),e.querySelector("[data-add-line-item]")?.addEventListener("click",we);const x=e.querySelector("[data-final-invoice]"),He=e.querySelector("[data-final-invoice-callout]"),F=e.querySelector("[data-final-invoice-dialog]"),w=e.querySelector('[data-field="contract"]');let re={};try{re=JSON.parse(w?.dataset.contractAmounts??"{}")}catch{}y?.addEventListener("input",V),y?.addEventListener("change",V),w?.addEventListener("change",V);const $e=e.querySelector('[data-field="project"]');let Ae={};try{Ae=JSON.parse(w?.dataset.contractProjects??"{}")}catch{}w?.addEventListener("change",()=>{$e&&($e.value=Ae[w.value??""]??"")});function ie(){He?.classList.toggle("is-flagged",!!x?.checked)}let W=!1;x?.addEventListener("change",()=>{W=!0,ie()});function De(){return te()}function Je(){const t=re[w?.value??""],r=De();if(!t||r<=0)return!1;const o=t.remaining-r;return o>=0&&o<.05*t.total}function Xe(){return!!x&&!W&&!x.checked&&Je()}function Qe(t){if(!F){t();return}const r=w?.value||"this contract";F.message=`The remaining balance on ${r} is within 5% of this invoice's total, which usually means it's the last one. Marking it final closes out the contract — should we flag this as the final invoice?`;const o=l=>{F.removeEventListener("resolved",o),!l.detail?.dismissed&&(W=!0,l.detail?.confirmed&&(x.checked=!0,ie()),t())};F.addEventListener("resolved",o),F.show()}we();function z(t){return e.querySelector(t)?.value??""}function et(t){const r=e.querySelector(t);if(!r)return"";const o=r.value??"";return r.options?.find(p=>p.value===o)?.label??o}const tt='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',rt='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';function qe(t,r=!1){if(!t)return;const o=(S,oe)=>{const Ee=t.querySelector(`[data-review="${S}"]`);Ee&&(Ee.textContent=oe)};o("file-name",u?.name??"(no file)"),o("file-size",u?U(u.size):"");const l=t.querySelector("[data-view-invoice]");l&&(l.toggleAttribute("hidden",!r||!u),l.setAttribute("data-view-name",u?.name??"")),o("invoice-number",z('[data-field="invoice-number"]')||"No invoice number"),o("contract",et('[data-field="contract"]')||"—"),o("project",z('[data-field="project"]')||"—");const p=z('[data-field="invoice-date"]');o("issued",p?ee(p):"Not set");const O=z('[data-field="perf-start"]'),N=z('[data-field="perf-end"]');o("perf-start",O?ee(O):"Not set"),o("perf-end",N?ee(N):"Not set"),o("total",T(De())),t.querySelector('[data-review="final-flag"]')?.toggleAttribute("hidden",!x?.checked);const P=t.querySelector('[data-review="docs-list"]');P&&(P.innerHTML=_.map((S,oe)=>`
        <div class="cbf-review-row">
          ${tt}
          <span>${E(S.name)}</span>
          <span class="cbf-review-meta">${U(S.size)}</span>
          ${r&&Ve(S)?`<button type="button" class="cbf-doc-view" data-view-doc="${oe}" data-view-name="${E(S.name)}" aria-label="Preview ${E(S.name)}">${rt}</button>`:""}
        </div>`).join("")),t.querySelector('[data-review="docs-card"]')?.toggleAttribute("hidden",_.length===0);const k=z('[data-field="notes"]');o("notes",k),t.querySelector('[data-review="notes-card"]')?.toggleAttribute("hidden",!k)}function Ce(){qe(e.querySelector("[data-review-content]"),!0)}function it(){qe(e.querySelector("[data-modal-review-content]"))}function ot(){document.querySelector("[data-snackbar]")?.success?.("Draft saved.",{duration:3e3}),setTimeout(()=>{window.location.href="/cb-fish-design/vendor-dashboard"},700)}function Me(){const t=de()==="modal",r=t?"[data-modal-submit]":"[data-wizard-submit]",o=e.querySelector(`${r} button.esa-button`);if(o){if(o.classList.add("esa-button--loading"),o.disabled=!0,o.setAttribute("aria-busy","true"),!o.querySelector(".esa-button__spinner")){const l=document.createElement("span");l.className="esa-button__spinner",l.setAttribute("aria-hidden","true"),o.prepend(l)}o.querySelector(".esa-button__label")?.classList.add("esa-button__label--hidden")}setTimeout(()=>{const l=`INV-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9e4)+1e4)}`;at(o),t&&e.querySelector("[data-confirm-modal]")?.close(),nt(),document.querySelector("[data-snackbar]")?.success?.(`Invoice ${l} submitted.`,{duration:4e3})},1500)}function at(t){t&&(t.classList.remove("esa-button--loading"),t.disabled=!1,t.removeAttribute("aria-busy"),t.querySelector(".esa-button__spinner")?.remove(),t.querySelector(".esa-button__label")?.classList.remove("esa-button__label--hidden"))}function nt(){ge(),_=[],Q(),e.querySelectorAll("[data-field]").forEach(t=>{typeof t.checked=="boolean"&&(t.checked=!1),t.value="",t.removeAttribute?.("error-text")}),e.querySelectorAll("[data-step-error]").forEach(t=>t.setAttribute("hidden","")),W=!1,x&&(x.checked=!1),ie(),L=!1,H(),q(n,!1),n=0,q(0,!0),G(),C(),window.scrollTo({top:0,behavior:"smooth"})}}ut();
