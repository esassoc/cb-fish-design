import{i as T,b as s,a as M,A as E}from"./lit-element.C8p3bJxG.js";import"./esa-text-field.astro_astro_type_script_index_0_lang.CxfFO9_Q.js";import"./esa-select.DVtrAvy5.js";import"./esa-checkbox.astro_astro_type_script_index_0_lang.CAN_sttU.js";import"./esa-textarea.astro_astro_type_script_index_0_lang.f3qIukGs.js";class at extends T{constructor(){super(),this.onAction=()=>{this.dispatchEvent(new CustomEvent("action",{bubbles:!0,composed:!0})),this.dismiss()},this.dismiss=()=>{this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))},this.message="",this.variant="info",this.action="",this.dismissable=!0,this.icon=""}static{this.properties={message:{type:String},variant:{type:String,reflect:!0},action:{type:String},dismissable:{type:Boolean},icon:{type:String}}}renderIcon(){switch(this.variant){case"success":return s`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;case"warning":return s`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;case"danger":return s`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;default:return s`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`}}render(){return s`
      <div class="esa-snackbar esa-snackbar--${this.variant}">
        <span class="esa-snackbar__icon">${this.renderIcon()}</span>
        <span class="esa-snackbar__message">${this.message}</span>
        ${this.action?s`<button class="esa-snackbar__action" @click=${this.onAction}>${this.action}</button>`:null}
        ${this.dismissable?s`
              <button class="esa-snackbar__close" @click=${this.dismiss} aria-label="Dismiss">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            `:null}
      </div>
    `}static{this.styles=M`
    :host { display: block; }

    .esa-snackbar {
      display: flex;
      align-items: center;
      gap: var(--spacing-300, 0.75rem);
      padding: var(--spacing-300, 0.75rem) var(--spacing-400, 1rem);
      border-radius: var(--snackbar-item-radius, var(--radius-200, 0.5rem));
      box-shadow: var(--shadow-300, 0 6px 24px -6px rgba(0, 0, 0, 0.07));
      background: var(--color-gray-12);
      color: var(--snackbar-item-color, var(--color-text-inverse, #ffffff));
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: var(--type-size-200, 0.9375rem);
      animation: esa-snackbar-enter 200ms ease-out;
    }
    @keyframes esa-snackbar-enter {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .esa-snackbar--success { background: var(--snackbar-item-bg-success, var(--color-green-11)); }
    .esa-snackbar--warning { background: var(--snackbar-item-bg-warning, var(--color-orange-11)); }
    .esa-snackbar--danger { background: var(--snackbar-item-bg-danger, var(--color-red-10)); }
    .esa-snackbar--info { background: var(--snackbar-item-bg-info, var(--color-blue-11)); }

    .esa-snackbar__icon {
      flex-shrink: 0;
      display: inline-flex;
    }
    .esa-snackbar__message { flex: 1; }

    .esa-snackbar__action {
      flex-shrink: 0;
      padding: var(--spacing-100, 0.25rem) var(--spacing-200, 0.5rem);
      border: none;
      border-radius: var(--radius-100, 0.25rem);
      background: rgba(255, 255, 255, 0.2);
      color: inherit;
      font-family: inherit;
      font-size: var(--type-size-150, 0.875rem);
      font-weight: var(--font-weight-semibold, 550);
      cursor: pointer;
    }
    .esa-snackbar__action:hover { background: rgba(255, 255, 255, 0.3); }

    .esa-snackbar__close {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: none;
      border-radius: var(--radius-100, 0.25rem);
      background: transparent;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;
    }
    .esa-snackbar__close:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1);
    }
  `}}customElements.get("esa-snackbar-item")||customElements.define("esa-snackbar-item",at);class st extends T{constructor(){super(),this.nextId=0,this.snackbars=[]}static{this.properties={snackbars:{state:!0}}}show(e){const r={variant:"info",duration:5e3,dismissable:!0,...e};if(r.uniqueKey){const n=this.snackbars.find(u=>u.uniqueKey===r.uniqueKey);if(n)return n.id}const a=`esa-snackbar-${this.nextId++}`,l={...r,id:a,timer:null};return r.duration&&r.duration>0&&(l.timer=setTimeout(()=>this.dismiss(a),r.duration)),this.snackbars=[...this.snackbars,l],a}success(e,r){return this.show({...r,message:e,variant:"success"})}info(e,r){return this.show({...r,message:e,variant:"info"})}warning(e,r){return this.show({...r,message:e,variant:"warning"})}danger(e,r){return this.show({...r,message:e,variant:"danger"})}dismiss(e){const r=this.snackbars.find(a=>a.id===e);r?.timer&&clearTimeout(r.timer),this.snackbars=this.snackbars.filter(a=>a.id!==e)}clearAll(){this.snackbars.forEach(e=>e.timer&&clearTimeout(e.timer)),this.snackbars=[]}disconnectedCallback(){super.disconnectedCallback(),this.snackbars.forEach(e=>e.timer&&clearTimeout(e.timer))}render(){return s`
      <div class="esa-snackbar-container">
        ${this.snackbars.map(e=>s`
            <esa-snackbar-item
              message=${e.message}
              variant=${e.variant??"info"}
              action=${e.action??""}
              ?dismissable=${e.dismissable!==!1}
              @dismiss=${()=>this.dismiss(e.id)}
              @action=${()=>this.dispatchEvent(new CustomEvent("snackbar-action",{detail:{id:e.id},bubbles:!0,composed:!0}))}
            ></esa-snackbar-item>
          `)}
      </div>
    `}static{this.styles=M`
    :host { display: contents; }

    .esa-snackbar-container {
      position: fixed;
      bottom: var(--spacing-500, 1.5rem);
      right: var(--spacing-500, 1.5rem);
      z-index: var(--z-toast, 500);
      display: flex;
      flex-direction: column-reverse;
      gap: var(--spacing-200, 0.5rem);
      max-width: var(--snackbar-container-max-width, 420px);
    }
  `}}customElements.get("esa-snackbar-container")||customElements.define("esa-snackbar-container",st);class nt extends T{constructor(){super(),this._suppressNextOpen=!1,this.searchTimer=null,this.lastEmittedSearch="",this.onDocClick=e=>{this._open&&(e.composedPath().includes(this)||this.closeDropdown())},this.onSearchInput=e=>{const r=e.target.value;this._search=r,this._active=-1,this.emitSearch(r),this._open||this.openDropdown()},this.onInputFocus=()=>{if(this._suppressNextOpen){this._suppressNextOpen=!1;return}this._open||this.openDropdown()},this.onInputClick=()=>{this._open||this.openDropdown()},this.onKeydown=e=>{const r=this.filteredOptions;switch(e.key){case"ArrowDown":if(e.preventDefault(),!this._open)return this.openDropdown();{let a=this._active+1;for(;a<r.length&&r[a].disabled;)a++;a<r.length&&(this._active=a)}break;case"ArrowUp":if(e.preventDefault(),!this._open)return this.openDropdown();{let a=this._active-1;for(;a>=0&&r[a].disabled;)a--;a>=0&&(this._active=a)}break;case"Enter":if(e.preventDefault(),this._open&&this._active>=0){const a=r[this._active];a&&!a.disabled&&this.selectOption(a)}else this._open||this.openDropdown();break;case"Escape":e.preventDefault(),this.closeDropdown();break;case"Tab":this.closeDropdown();break}},this.mode="select",this.triggerStyle="field",this.options=[],this.multiple=!1,this.size="md",this.label="",this.placeholder="Select...",this.disabled=!1,this.required=!1,this.helpText="",this.errorText="",this.loading=!1,this.debounceMs=300,this.resultsCount=null,this._search="",this._selected=[],this._open=!1,this._active=-1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={mode:{type:String,reflect:!0},triggerStyle:{type:String,attribute:"trigger-style"},options:{type:Array},multiple:{type:Boolean},size:{type:String,reflect:!0},label:{type:String},placeholder:{type:String},disabled:{type:Boolean,reflect:!0},required:{type:Boolean},helpText:{type:String,attribute:"help-text"},errorText:{type:String,attribute:"error-text"},loading:{type:Boolean},debounceMs:{type:Number,attribute:"debounce-ms"},resultsCount:{type:Number,attribute:"results-count"},_search:{state:!0},_selected:{state:!0},_open:{state:!0},_active:{state:!0}}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocClick),this.syncFormValue()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocClick),this.searchTimer&&clearTimeout(this.searchTimer)}set value(e){e==null?this._selected=[]:Array.isArray(e)?this._selected=e:this._selected=[e],this.syncFormValue()}get value(){return this.multiple?this._selected:this._selected[0]??""}get filteredOptions(){const e=this._search.toLowerCase();return e?this.options.filter(r=>r.label.toLowerCase().includes(e)):this.options}get displayValue(){return this._selected.length===0?"":this.multiple?this.options.filter(r=>this._selected.includes(r.value)).map(r=>r.label).join(", "):this.options.find(r=>r.value===this._selected[0])?.label??""}get selectedOptions(){return this.options.filter(e=>this._selected.includes(e.value))}get currentPlaceholder(){return this.multiple&&this._selected.length>0?"":this.placeholder}get inputValue(){return this.multiple?this._search:this._search||this.displayValue}isSelected(e){return this._selected.includes(e)}syncFormValue(){this.internals.setFormValue(this.multiple?this._selected.join(","):this._selected[0]??null)}emitValue(){this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}emitSearch(e){this.searchTimer&&clearTimeout(this.searchTimer),this.searchTimer=setTimeout(()=>{e!==this.lastEmittedSearch&&(this.lastEmittedSearch=e,this.dispatchEvent(new CustomEvent("search",{detail:{term:e},bubbles:!0,composed:!0})))},this.debounceMs)}toggleDropdown(){this.disabled||(this._open?this.closeDropdown():this.openDropdown())}openDropdown(){this.disabled||this._open||(this._open=!0,this._active=-1,this.mode==="select"&&requestAnimationFrame(()=>{this.renderRoot.querySelector(".search-input")?.focus()}))}closeDropdown(){this._open&&(this._open=!1,this._search="")}selectOption(e){if(e.disabled)return;const r=e.value;if(this.multiple){const a=this._selected.indexOf(r);this._selected=a>=0?this._selected.filter(n=>n!==r):[...this._selected,r],this._search="",this.emitValue();const l=this.mode==="autocomplete"?".input":".search-input";requestAnimationFrame(()=>this.renderRoot.querySelector(l)?.focus())}else this._selected=[r],this._search="",this.emitValue(),this.closeDropdown(),this.mode==="autocomplete"&&(this._suppressNextOpen=!0,requestAnimationFrame(()=>this.renderRoot.querySelector(".input")?.focus()))}removeValue(e,r){r?.stopPropagation(),this._selected=this._selected.filter(a=>a!==e),this.emitValue()}highlight(e){const r=this._search.trim();if(!r)return s`${e}`;const l=e.toLowerCase().indexOf(r.toLowerCase());return l<0?s`${e}`:s`${e.slice(0,l)}<mark class="hl">${e.slice(l,l+r.length)}</mark>${e.slice(l+r.length)}`}render(){const e=!!this.errorText;return s`
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
    `}renderChips(){return this.selectedOptions.length===0?E:s`<div class="chips">
      ${this.selectedOptions.map(e=>s`<span class="chip">
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
        ${e.map((r,a)=>{const l=this.isSelected(r.value);return s`<div
            class="option ${a===this._active?"option--active":""} ${l?"option--selected":""} ${r.disabled?"option--disabled":""}"
            role="option"
            aria-selected=${l}
            @click=${()=>this.selectOption(r)}
            @mouseenter=${()=>this._active=a}
          >
            ${this.multiple?s`<span class="check ${l?"check--selected":""}">${this.checkIcon()}</span>`:null}
            <span class="option__label">${this.highlight(r.label)}</span>
          </div>`})}
      </div>

      ${e.length===0&&!this.loading?s`<div class="empty">${this._search?"No results found":"No options available"}</div>`:null}
      ${this.loading&&e.length===0?s`<div class="loading"><span class="spinner">${this.spinnerIcon()}</span> Searching...</div>`:null}
    </div>`}chevronIcon(){return s`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>`}checkIcon(){return s`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>`}xIcon(){return s`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>`}searchIcon(){return s`<svg class="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>`}spinnerIcon(){return s`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>`}static{this.styles=M`
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
  `}}customElements.get("esa-combobox")||customElements.define("esa-combobox",nt);class lt extends T{constructor(){super(),this.previousFocus=null,this.confirm=()=>this.resolve(!0),this.cancel=()=>this.resolve(!1),this.dismiss=()=>this.resolve(!1,!0),this.onKeydown=e=>{if(this.open){if(e.key==="Escape")e.preventDefault(),this.dismiss();else if(e.key==="Tab"){const r=this.renderRoot,a=Array.from(r.querySelectorAll("button:not([disabled])"));if(a.length===0)return;const l=a[0],n=a[a.length-1],u=r.activeElement;e.shiftKey&&u===l?(e.preventDefault(),n.focus()):!e.shiftKey&&u===n&&(e.preventDefault(),l.focus())}}},this.open=!1,this.heading="",this.message="",this.variant="default",this.confirmLabel="Confirm",this.cancelLabel="Cancel",this.showIcon=!0,this.showCloseButton=!0}static{this.properties={open:{type:Boolean,reflect:!0},heading:{type:String},message:{type:String},variant:{type:String,reflect:!0},confirmLabel:{type:String,attribute:"confirm-label"},cancelLabel:{type:String,attribute:"cancel-label"},showIcon:{type:Boolean,attribute:"show-icon"},showCloseButton:{type:Boolean,attribute:"show-close-button"}}}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this.onKeydown)}updated(e){e.has("open")&&(this.open?(this.previousFocus=document.activeElement,requestAnimationFrame(()=>{this.renderRoot.querySelector(".esa-confirm-dialog__confirm")?.focus()})):this.previousFocus&&(this.previousFocus.focus?.(),this.previousFocus=null))}show(){this.open=!0}resolve(e,r=!1){this.open=!1,r&&this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(e?"confirm":"cancel",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("resolved",{detail:{confirmed:e,dismissed:r},bubbles:!0,composed:!0}))}icon(){return this.showIcon?this.variant==="danger"?s`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`:this.variant==="warning"?s`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`:s`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`:null}render(){return this.open?s`
      <div class="esa-confirm-dialog__backdrop" @click=${this.dismiss}></div>
      <div class="esa-confirm-dialog__panel">
        <div class="esa-confirm-dialog" role="alertdialog" aria-modal="true" aria-label=${this.heading}>
          ${""}
          ${this.showCloseButton?s`<button
                class="esa-confirm-dialog__close"
                type="button"
                aria-label="Close"
                @click=${this.dismiss}
              ><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`:null}
          <div class="esa-confirm-dialog__content">
            ${this.showIcon?s`<div class="esa-confirm-dialog__icon esa-confirm-dialog__icon--${this.variant}">${this.icon()}</div>`:null}
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
    `:s``}static{this.styles=M`
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
    /* hub-edit-approved: user approved (2026-06-29) — relative + close button styles. */
    .esa-confirm-dialog {
      position: relative;
      pointer-events: auto;
      width: var(--confirm-dialog-width, 360px);
      max-width: calc(100vw - 2rem);
      background: var(--confirm-dialog-bg, var(--color-surface-elevated, #ffffff));
      border-radius: var(--confirm-dialog-radius, var(--radius-400, 0.75rem));
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
    }

    /* hub-edit-approved: user approved hub edits this session (2026-06-30) — on mobile
       the confirm dialog docks to the bottom as a full-width sheet, matching esa-dialog. */
    @media (max-width: 600px) {
      .esa-confirm-dialog__panel { align-items: flex-end; }
      .esa-confirm-dialog {
        width: 100%;
        max-width: 100%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        animation: esa-confirm-sheet-in 0.24s ease;
      }
    }
    @keyframes esa-confirm-sheet-in {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    .esa-confirm-dialog__close {
      position: absolute;
      top: var(--spacing-300, 0.75rem);
      right: var(--spacing-300, 0.75rem);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      border-radius: var(--radius-200, 0.5rem);
      background: transparent;
      color: var(--color-text-muted, #737373);
      cursor: pointer;
      transition: background var(--transition-fast, 150ms ease), color var(--transition-fast, 150ms ease);
    }
    .esa-confirm-dialog__close:hover {
      background: var(--color-surface-sunken, #efefef);
      color: var(--color-text-primary, #171717);
    }
    .esa-confirm-dialog__close:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset, 2px);
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
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
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
  `}}customElements.get("esa-confirm-dialog")||customElements.define("esa-confirm-dialog",lt);class ct extends T{constructor(){super(),this.previousFocus=null,this.onKeydown=e=>{this.open&&(e.key==="Escape"?(e.preventDefault(),this.close()):e.key==="Tab"&&this.trapFocus(e))},this.onBackdropClick=()=>{this.close()},this.open=!1,this.heading="",this.showCloseButton=!0,this.size="md"}static{this.properties={open:{type:Boolean,reflect:!0},heading:{type:String},showCloseButton:{type:Boolean,attribute:"show-close-button"},size:{type:String,reflect:!0}}}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this.onKeydown)}updated(e){e.has("open")&&(this.open?(this.previousFocus=document.activeElement,requestAnimationFrame(()=>this.focusFirst())):this.previousFocus&&(this.previousFocus.focus?.(),this.previousFocus=null))}show(){this.open=!0}close(){this.open&&(this.open=!1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}focusable(){const r=this.renderRoot.querySelector(".esa-dialog");if(!r)return[];const a=r.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'),l=Array.from(this.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));return[...Array.from(a),...l].filter(n=>n.offsetParent!==null||n===this)}focusFirst(){const e=this.focusable();e.length?e[0].focus():this.renderRoot.querySelector(".esa-dialog")?.focus()}trapFocus(e){const r=this.focusable();if(r.length===0)return;const a=r[0],l=r[r.length-1],n=this.renderRoot.activeElement||document.activeElement;e.shiftKey&&n===a?(e.preventDefault(),l.focus()):!e.shiftKey&&n===l&&(e.preventDefault(),a.focus())}render(){if(!this.open)return s``;const e=this.heading||this.showCloseButton||!!this.querySelector('[slot="header"]');return s`
      <div class="esa-dialog-backdrop" @click=${this.onBackdropClick}></div>
      <div class="esa-dialog-panel">
        <div class="esa-dialog" role="dialog" aria-modal="true" aria-label=${this.heading||"Dialog"} tabindex="-1">
          ${e?s`
                <div class="esa-dialog__header">
                  <slot name="header"><h2 class="esa-dialog__title">${this.heading}</h2></slot>
                  ${this.showCloseButton?s`
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
    `}static{this.styles=M`
    :host {
      --_dialog-bg: var(--dialog-bg, var(--color-surface-elevated, #ffffff));
      --_dialog-border-radius: var(--dialog-radius, var(--radius-400, 0.75rem));
      --_dialog-padding: var(--spacing-500, 1.5rem);
      --_dialog-header-border: var(--dialog-border-color, var(--color-border-light, #efefef));
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
      border-top: 1px solid var(--_dialog-header-border);
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-200, 0.5rem);
      flex-shrink: 0;
    }
    .esa-dialog__footer:not(:has(*)) { display: none; }
  `}}customElements.get("esa-dialog")||customElements.define("esa-dialog",ct);const ne=["January","February","March","April","May","June","July","August","September","October","November","December"],dt=["Su","Mo","Tu","We","Th","Fr","Sa"],Ie=[];for(let d=1990;d<=2060;d++)Ie.push(d);function Me(d){if(!d)return null;const e=d.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const r=parseInt(e[1],10),a=parseInt(e[2],10)-1,l=parseInt(e[3],10),n=new Date(r,a,l);return n.getFullYear()!==r||n.getMonth()!==a||n.getDate()!==l?null:n}function Fe(d){return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}function le(d,e){return d.getFullYear()===e.getFullYear()&&d.getMonth()===e.getMonth()&&d.getDate()===e.getDate()}function ce(d){return`${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}/${d.getFullYear()}`}function J(d){const e=d.trim();if(!e)return null;const r=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);if(r){const l=r[3].length===2?2e3+parseInt(r[3]):parseInt(r[3]),n=new Date(l,parseInt(r[1])-1,parseInt(r[2]));if(n.getMonth()===parseInt(r[1])-1&&n.getDate()===parseInt(r[2]))return n}const a=new Date(e);return isNaN(a.getTime())?null:a}function ut(d,e=!1){const r=d.slice(0,8);return r.length===0?"":r.length<2?r:r.length===2?e?r:`${r}/`:r.length<4?`${r.slice(0,2)}/${r.slice(2)}`:r.length===4?e?`${r.slice(0,2)}/${r.slice(2)}`:`${r.slice(0,2)}/${r.slice(2)}/`:`${r.slice(0,2)}/${r.slice(2,4)}/${r.slice(4)}`}class pt extends T{static formAssociated=!0;static properties={label:{type:String},placeholder:{type:String},required:{type:Boolean},disabled:{type:Boolean,reflect:!0},errorText:{type:String,attribute:"error-text"},helpText:{type:String,attribute:"help-text"},value:{type:String},_open:{state:!0},_viewYear:{state:!0},_viewMonth:{state:!0},_monthOpen:{state:!0},_yearOpen:{state:!0},_monthSearch:{state:!0},_yearSearch:{state:!0},_inputText:{state:!0}};internals;_onDocClick=e=>{this._open&&!e.composedPath().includes(this)&&this._close()};_onSiblingOpen=e=>{e.detail?.source!==this&&this._open&&this._close()};constructor(){super(),this.label="",this.placeholder="MM/DD/YYYY",this.required=!1,this.disabled=!1,this.errorText="",this.helpText="",this.value="";const e=new Date;this._viewYear=e.getFullYear(),this._viewMonth=e.getMonth(),this._open=!1,this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch="",this._inputText="",this.internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick),document.addEventListener("bcn-date-picker:open",this._onSiblingOpen)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick),document.removeEventListener("bcn-date-picker:open",this._onSiblingOpen)}updated(e){if(e.has("value")){this.internals.setFormValue(this.value||null);const r=Me(this.value);if(r){this._viewYear=r.getFullYear(),this._viewMonth=r.getMonth();const a=J(this._inputText);(!a||!le(a,r))&&(this._inputText=ce(r))}else this.value||(this._inputText="")}}_calendarCells(){const e=new Date(this._viewYear,this._viewMonth,1),r=new Date(this._viewYear,this._viewMonth+1,0).getDate(),a=[];for(let l=0;l<e.getDay();l++)a.push(null);for(let l=1;l<=r;l++)a.push(new Date(this._viewYear,this._viewMonth,l));for(;a.length%7!==0;)a.push(null);return a}_onTextInput(e){const r=e.target,a=e.inputType==="insertFromPaste",l=e.inputType?.startsWith("delete")??!1;let n;if(a){const f=J(r.value);n=f?ce(f):r.value}else{const f=r.value.replace(/\D/g,"").slice(0,8);n=ut(f,l)}r.value=n,this._inputText=n;const u=J(n);u?(this.value=Fe(u),this.internals.setFormValue(this.value),this._viewYear=u.getFullYear(),this._viewMonth=u.getMonth(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))):n||(this.value="",this.internals.setFormValue(null),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}_onTextBlur(){if(!this._inputText)return;const e=J(this._inputText);e&&(this._inputText=ce(e))}_toggle(e){e.stopPropagation(),!this.disabled&&(this._open=!this._open,this._open?document.dispatchEvent(new CustomEvent("bcn-date-picker:open",{detail:{source:this}})):this._closeNavDropdowns())}_close(){this._open=!1,this._closeNavDropdowns()}_closeNavDropdowns(){this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch=""}_toggleMonth(e){e.stopPropagation(),this._monthOpen=!this._monthOpen,this._yearOpen=!1,this._monthSearch="",this._monthOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--month")?.focus()})}_toggleYear(e){e.stopPropagation(),this._yearOpen=!this._yearOpen,this._monthOpen=!1,this._yearSearch="",this._yearOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--year")?.focus(),this.shadowRoot?.querySelector(".cal-nav__option.is-selected")?.scrollIntoView({block:"nearest"})})}_selectMonth(e,r){r.stopPropagation(),this._viewMonth=e,this._monthOpen=!1,this._monthSearch=""}_selectYear(e,r){r.stopPropagation(),this._viewYear=e,this._yearOpen=!1,this._yearSearch=""}_selectDay(e){this.value=Fe(e),this.internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this._close()}_selectToday(){const e=new Date;e.setHours(0,0,0,0),this._selectDay(e)}_onKeyDown(e){e.key==="Escape"&&(this._monthOpen||this._yearOpen?(this._closeNavDropdowns(),e.stopPropagation()):this._open&&(this._close(),e.stopPropagation()))}_onCalendarClick(e){if(!this._monthOpen&&!this._yearOpen)return;const r=e.composedPath();let a=!1;this.shadowRoot?.querySelectorAll(".cal-nav").forEach(l=>{r.includes(l)&&(a=!0)}),a||this._closeNavDropdowns()}_renderMonthCombo(){const e=ne.filter(r=>r.toLowerCase().includes(this._monthSearch.toLowerCase()));return s`
      <div class="cal-nav" data-type="month">
        <button type="button"
          class="cal-nav__trigger${this._monthOpen?" is-open":""}"
          @click=${this._toggleMonth}
          aria-haspopup="listbox"
          aria-expanded=${String(this._monthOpen)}
          aria-label="Select month">
          ${ne[this._viewMonth]}
          <svg class="cal-nav__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${this._monthOpen?s`
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
              ${e.length===0?s`<p class="cal-nav__empty">No match</p>`:e.map(r=>{const a=ne.indexOf(r),l=a===this._viewMonth;return s`<button type="button" role="option"
                    class="cal-nav__option${l?" is-selected":""}"
                    aria-selected=${String(l)}
                    @click=${n=>this._selectMonth(a,n)}>${r}</button>`})}
            </div>
          </div>`:E}
      </div>`}_renderYearCombo(){const e=Ie.filter(r=>String(r).includes(this._yearSearch));return s`
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
              ${e.length===0?s`<p class="cal-nav__empty">No match</p>`:e.map(r=>{const a=r===this._viewYear;return s`<button type="button" role="option"
                    class="cal-nav__option${a?" is-selected":""}"
                    aria-selected=${String(a)}
                    @click=${l=>this._selectYear(r,l)}>${r}</button>`})}
            </div>
          </div>`:E}
      </div>`}render(){const e=Me(this.value),r=new Date;r.setHours(0,0,0,0);const a=this._calendarCells(),l=!!this.errorText;return s`
      <div class="field" @keydown=${this._onKeyDown}>

        ${this.label?s`
          <label class="field__label" @click=${()=>this.shadowRoot?.querySelector(".date-input")?.focus()}>
            ${this.label}${this.required?s`<span class="field__req" aria-hidden="true">&thinsp;*</span>`:E}
          </label>`:E}

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
                ${dt.map(n=>s`<span class="calendar__weekday">${n}</span>`)}
              </div>

              <div class="calendar__days">
                ${a.map(n=>{if(!n)return s`<span class="calendar__day is-empty"></span>`;const u=le(n,r),f=e&&le(n,e);return s`
                    <button
                      type="button"
                      class="calendar__day${u?" is-today":""}${f?" is-selected":""}"
                      aria-label=${n.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
                      aria-pressed=${String(!!f)}
                      @click=${()=>this._selectDay(n)}
                    >${n.getDate()}</button>`})}
              </div>


            </div>`:E}
        </div>

        ${l?s`<p class="field__message field__message--error" role="alert">${this.errorText}</p>`:this.helpText?s`<p class="field__message">${this.helpText}</p>`:E}

      </div>
    `}static styles=M`
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
  `}customElements.define("bcn-date-picker",pt);function ht(){const d=document.querySelector("[data-invoice-wizard]");if(!d)return;const e=d,r=e.querySelector("[data-stepper]"),a=Array.from(e.querySelectorAll("[data-stepper-step]")),l=Array.from(e.querySelectorAll(".cbf-stepper__line"));let n=0;const u=2,f=e.querySelector("[data-pdf-panel]"),m=e.querySelector("[data-pdf-frame]"),q=e.querySelector("[data-pdf-filename]"),Oe=e.querySelector(".cbf-invoice-workspace");function C(t,i){e.querySelectorAll(`[data-step="${t}"]`).forEach(o=>{i?o.removeAttribute("hidden"):o.setAttribute("hidden","")})}function X(t){if(!(t!==u&&!je(n))){if(n===0&&t===1&&Xe()){Ze(()=>X(t));return}if(t===1&&pe()==="modal"){Be();return}C(n,!1),n=t,C(n,!0),Z(),n===1&&Ae(),z(),window.scrollTo({top:0,behavior:"smooth"})}}function Be(){const t=e.querySelector("[data-confirm-modal]");t&&(tt(),t.show())}function Z(){const t=n>=a.length;r?.toggleAttribute("hidden",t),!t&&(a.forEach((i,o)=>{i.classList.toggle("is-active",o===n),i.classList.toggle("is-done",o<n)}),l.forEach((i,o)=>{i.style.background=o<n?"var(--color-primary)":"var(--color-border)"}))}let de="page";const ue=e.querySelector("[data-confirm-mode-bar]");ue?.addEventListener("click",t=>{const i=t.target.closest("[data-confirm-mode]");if(!i)return;const o=i.dataset.confirmMode;o&&(de=o,ue.querySelectorAll("[data-confirm-mode]").forEach(c=>{c.classList.toggle("is-active",c.dataset.confirmMode===o)}))});function pe(){return de}function he(){if(!p){const i=new File([`%PDF-1.4
% demo invoice for testing
`],"demo-invoice.pdf",{type:"application/pdf"});R(i)}const t=(i,o)=>{const c=e.querySelector(i);c&&(c.value=o,c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0})))};t('[data-field="contract"]',"CON-2025-0112"),t('[data-field="invoice-number"]',"INV-2026-0042"),t('[data-field="invoice-date"]',"2026-06-29"),t('[data-field="perf-start"]',"2026-01-01"),t('[data-field="perf-end"]',"2026-03-31"),t('[data-field="total-amount"]',"4850.00"),t('[data-field="notes"]',"Autofilled demo invoice (testing)."),X(1)}window.vendorInvoiceAutofill=he,e.addEventListener("click",t=>{const i=t.target;i.closest("[data-wizard-next]")&&X(n+1),i.closest("[data-wizard-back]")&&n>0&&(C(n,!1),n--,C(n,!0),Z(),z()),i.closest("[data-wizard-save-draft]")&&rt(),i.closest("[data-wizard-submit]")&&Le(),i.closest("[data-modal-submit]")&&Le(),i.closest("[data-modal-back]")&&e.querySelector("[data-confirm-modal]")?.close(),i.closest("[data-wizard-cancel]")&&(e.querySelector("[data-confirm-modal]")?.close(),window.location.href="/cb-fish-design/vendor-dashboard"),i.closest("[data-dev-autofill]")&&he()}),e.querySelectorAll("[data-combobox-options]").forEach(t=>{try{t.options=JSON.parse(t.dataset.comboboxOptions??"[]")}catch{}});function z(){const t=n===1,i=n===0||t;f?.toggleAttribute("hidden",!i),Oe?.classList.toggle("has-pdf",i),e.querySelector("[data-upload-remove]")?.toggleAttribute("hidden",t),i&&p&&me()}function je(t){if(t===0){const i=Ne(),o=Pe();return i&&o}return!0}function Ne(){const t=e.querySelector('[data-step-error="upload"]'),i=!!p;return t?.toggleAttribute("hidden",i),i}function Pe(){let t=!0;[e.querySelector('[data-field="invoice-number"]'),e.querySelector('[data-field="invoice-date"]'),e.querySelector('[data-field="perf-start"]'),e.querySelector('[data-field="perf-end"]'),e.querySelector('[data-field="contract"]')].forEach(k=>{if(!k)return;(k.value??k.getAttribute("value")??"").trim()?k.removeAttribute("error-text"):(k.setAttribute("error-text","This field is required."),t=!1)});const o=e.querySelector('[data-field="perf-start"]'),c=e.querySelector('[data-field="perf-end"]'),h=o?.value??"",j=c?.value??"";h&&j&&h>j&&(c?.setAttribute("error-text","End date must be on or after start date."),t=!1);const N=e.querySelector('[data-step-error="total"]'),P=e.querySelector('[data-step-error="total-exceeds"]');return ie()<=0?(t=!1,N?.removeAttribute("hidden"),P?.setAttribute("hidden",""),y?.setAttribute("error-text","Enter the invoice total amount.")):(N?.setAttribute("hidden",""),ke()?(t=!1,H()):(P?.setAttribute("hidden",""),y?.removeAttribute("error-text"))),t}let F=!1;function G(){const t=!F;e.querySelector("[data-form-lock-notice]")?.toggleAttribute("hidden",!t),e.querySelectorAll("[data-field]:not([data-readonly])").forEach(i=>{i.toggleAttribute("disabled",t)}),e.querySelector("[data-add-line-item]")?.toggleAttribute("disabled",t),e.querySelector("[data-docs-add]")?.toggleAttribute("disabled",t),e.querySelectorAll(".cbf-li-input").forEach(i=>{i.disabled=t}),e.querySelectorAll(".cbf-li-remove").forEach(i=>{i.disabled=t})}G();let p=null;const D=e.querySelector("[data-upload-zone]"),Y=e.querySelector("[data-upload-input]"),I=e.querySelector("[data-mobile-upload-input]"),fe=e.querySelector("[data-upload-idle]"),ve=e.querySelector("[data-pdf-viewer]");let v=null,b=null;function ge(t){e.querySelectorAll("[data-view-invoice],[data-view-doc]").forEach(i=>{i.classList.toggle("is-active",i.getAttribute("data-view-name")===t)})}function me(){b&&(URL.revokeObjectURL(b),b=null),m&&v&&(m.src=v),q&&p&&(q.textContent=p.name),ge(p?.name??"")}function Ye(t){b&&(URL.revokeObjectURL(b),b=null),b=URL.createObjectURL(t),m&&(m.src=b),q&&(q.textContent=t.name),ge(t.name)}function Re(t){return t.type==="application/pdf"||t.type.startsWith("image/")||/\.(pdf|png|jpe?g)$/i.test(t.name)}z();const Q=25*1024*1024;function Ve(t){const i=e.querySelector("[data-upload-inline-error]"),o=e.querySelector("[data-upload-inline-error-msg]");o&&(o.textContent=t),i?.removeAttribute("hidden")}function Ue(){e.querySelector("[data-upload-inline-error]")?.setAttribute("hidden","")}function Ke(t){return t.type==="application/pdf"||t.name.toLowerCase().endsWith(".pdf")?t.size>Q?`This file is ${U(t.size)} — the maximum is 25 MB. Please upload a smaller PDF.`:null:"That file isn’t a PDF. Please upload a PDF invoice."}function R(t){const i=Ke(t);if(i){Ve(i);return}Ue(),p=t,fe?.setAttribute("hidden",""),ve?.removeAttribute("hidden"),e.querySelector('[data-step-error="upload"]')?.setAttribute("hidden",""),F||(F=!0,G()),v&&URL.revokeObjectURL(v),v=URL.createObjectURL(t),m&&(m.src=v),q&&(q.textContent=t.name),n===1&&Ae(),z()}function be(){p=null,Y.value="",I&&(I.value=""),ve?.setAttribute("hidden",""),fe?.removeAttribute("hidden"),v&&(URL.revokeObjectURL(v),v=null),m&&(m.src=""),z()}let _=[];const V=e.querySelector("[data-docs-input]"),ee=e.querySelector("[data-docs-list]");function te(){ee&&(ee.innerHTML=_.map((t,i)=>`
      <div class="cbf-doc-row">
        <svg class="cbf-doc-row__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <div class="cbf-doc-row__info">
          <span class="cbf-doc-row__name">${A(t.name)}</span>
          <span class="cbf-doc-row__size">${U(t.size)}</span>
        </div>
        <button type="button" class="cbf-doc-row__remove" data-doc-remove="${i}" aria-label="Remove ${A(t.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""))}e.querySelector("[data-docs-add]")?.addEventListener("click",()=>V?.click());function _e(t){const i=e.querySelector("[data-docs-error]"),o=e.querySelector("[data-docs-error-msg]");t?(o&&(o.textContent=t),i?.removeAttribute("hidden")):i?.setAttribute("hidden","")}function ye(t){if(!t.length)return;const i=t.filter(c=>c.size>Q),o=new Set(_.map(c=>c.name));if(_.push(...t.filter(c=>c.size<=Q&&!o.has(c.name))),i.length){const c=i.map(h=>h.name).join(", ");_e(`${c} ${i.length>1?"each exceed":"exceeds"} the 25 MB limit and ${i.length>1?"were":"was"} not added.`)}else _e("");te()}V?.addEventListener("change",()=>{ye(Array.from(V.files??[])),V.value=""});const S=e.querySelector("[data-docs-zone]");S?.addEventListener("dragover",t=>{t.preventDefault(),S.classList.add("is-over")}),S?.addEventListener("dragleave",t=>{S.contains(t.relatedTarget)||S.classList.remove("is-over")}),S?.addEventListener("drop",t=>{t.preventDefault(),S.classList.remove("is-over"),ye(Array.from(t.dataTransfer?.files??[]))}),ee?.addEventListener("click",t=>{const i=t.target.closest("[data-doc-remove]");i&&(_.splice(Number(i.dataset.docRemove),1),te())}),e.querySelector("[data-review-content]")?.addEventListener("click",t=>{const i=t.target;if(i.closest("[data-view-invoice]")){me();return}const o=i.closest("[data-view-doc]");if(o){const c=_[Number(o.dataset.viewDoc)];c&&Ye(c)}}),e.querySelector("[data-upload-browse]")?.addEventListener("click",()=>Y.click()),e.querySelector("[data-upload-remove]")?.addEventListener("click",be),e.querySelector("[data-mobile-upload-btn]")?.addEventListener("click",()=>I?.click()),Y.addEventListener("change",()=>{const t=Y.files?.[0];t&&R(t)}),I?.addEventListener("change",()=>{const t=I.files?.[0];t&&R(t)}),D.addEventListener("dragover",t=>{t.preventDefault(),D.classList.add("is-over")}),D.addEventListener("dragleave",()=>D.classList.remove("is-over")),D.addEventListener("drop",t=>{t.preventDefault(),D.classList.remove("is-over");const i=t.dataTransfer?.files?.[0];i&&R(i)});function U(t){return t<1024*1024?`${(t/1024).toFixed(0)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}function re(t){if(!t)return"—";const i=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t),o=i?new Date(Number(i[1]),Number(i[2])-1,Number(i[3])):new Date(t);return Number.isNaN(o.getTime())?t:o.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}let g=[];const K=e.querySelector("[data-line-items]"),xe=e.querySelector("[data-invoice-total]"),y=e.querySelector('[data-field="total-amount"]');function ie(){const t=String(y?.value??"").replace(/[^0-9.]/g,""),i=parseFloat(t);return Number.isFinite(i)&&i>0?i:0}function we(){const t=oe[w?.value??""];return t?t.remaining:null}function ke(){const t=we();return t!=null&&ie()>t}function H(){const t=e.querySelector('[data-step-error="total-exceeds"]'),i=we();if(i!=null&&ke()){const o=t?.querySelector("[data-remaining-amount]");o&&(o.textContent=O(i)),t?.removeAttribute("hidden"),y?.setAttribute("error-text","Exceeds the remaining contract balance.")}else t?.setAttribute("hidden",""),y?.getAttribute("error-text")==="Exceeds the remaining contract balance."&&y.removeAttribute("error-text")}function $e(){g.push({description:"",qty:1,unitPrice:0}),Se()}function He(t){g.splice(t,1),Se()}function Se(){const t=F?"":" disabled";K.innerHTML=g.map((i,o)=>`
      <div class="cbf-line-item" data-row="${o}">
        <input${t}
          class="cbf-li-input cbf-li-desc"
          type="text"
          placeholder="Description…"
          value="${A(i.description)}"
          data-li-field="description"
          data-li-idx="${o}"
        />
        <input${t}
          class="cbf-li-input cbf-li-qty"
          type="number"
          min="1"
          value="${i.qty}"
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
          value="${i.unitPrice||""}"
          data-li-field="unitPrice"
          data-li-idx="${o}"
          style="text-align:right"
        />
        <span class="cbf-li-total" data-li-total="${o}">${O(i.qty*i.unitPrice)}</span>
        <button type="button"${t} class="cbf-li-remove" data-li-remove="${o}" aria-label="Remove line item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""),Ee()}function Ee(){const t=g.reduce((i,o)=>i+o.qty*o.unitPrice,0);xe&&(xe.textContent=O(t))}function O(t){return t.toLocaleString("en-US",{style:"currency",currency:"USD"})}function A(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}K.addEventListener("input",t=>{const i=t.target,o=Number(i.dataset.liIdx),c=i.dataset.liField;if(!c||isNaN(o))return;c==="description"&&(g[o].description=i.value),c==="qty"&&(g[o].qty=Math.max(1,Number(i.value)||1)),c==="unitPrice"&&(g[o].unitPrice=Math.max(0,Number(i.value)||0));const h=K.querySelector(`[data-li-total="${o}"]`);h&&(h.textContent=O(g[o].qty*g[o].unitPrice)),Ee()}),K.addEventListener("click",t=>{const i=t.target.closest("[data-li-remove]");i&&He(Number(i.dataset.liRemove))}),e.querySelector("[data-add-line-item]")?.addEventListener("click",$e);const x=e.querySelector("[data-final-invoice]"),We=e.querySelector("[data-final-invoice-callout]"),B=e.querySelector("[data-final-invoice-dialog]"),w=e.querySelector('[data-field="contract"]');let oe={};try{oe=JSON.parse(w?.dataset.contractAmounts??"{}")}catch{}y?.addEventListener("input",H),y?.addEventListener("change",H),w?.addEventListener("change",H);const qe=e.querySelector('[data-field="project"]');let Ce={};try{Ce=JSON.parse(w?.dataset.contractProjects??"{}")}catch{}w?.addEventListener("change",()=>{qe&&(qe.value=Ce[w.value??""]??"")});function ae(){We?.classList.toggle("is-flagged",!!x?.checked)}let W=!1;x?.addEventListener("change",()=>{W=!0,ae()});function ze(){return ie()}function Je(){const t=oe[w?.value??""],i=ze();if(!t||i<=0)return!1;const o=t.remaining-i;return o>=0&&o<.05*t.total}function Xe(){return!!x&&!W&&!x.checked&&Je()}function Ze(t){if(!B){t();return}const i=w?.value||"this contract";B.message=`The remaining balance on ${i} is within 5% of this invoice's total, which usually means it's the last one. Marking it final closes out the contract — should we flag this as the final invoice?`;const o=c=>{B.removeEventListener("resolved",o),!c.detail?.dismissed&&(W=!0,c.detail?.confirmed&&(x.checked=!0,ae()),t())};B.addEventListener("resolved",o),B.show()}$e();function L(t){return e.querySelector(t)?.value??""}function Ge(t){const i=e.querySelector(t);if(!i)return"";const o=i.value??"";return i.options?.find(h=>h.value===o)?.label??o}const Qe='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',et='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';function De(t,i=!1){if(!t)return;const o=($,se)=>{const Te=t.querySelector(`[data-review="${$}"]`);Te&&(Te.textContent=se)};o("file-name",p?.name??"(no file)"),o("file-size",p?U(p.size):"");const c=t.querySelector("[data-view-invoice]");c&&(c.toggleAttribute("hidden",!i||!p),c.setAttribute("data-view-name",p?.name??"")),o("invoice-number",L('[data-field="invoice-number"]')||"No invoice number"),o("contract",Ge('[data-field="contract"]')||"—"),o("project",L('[data-field="project"]')||"—");const h=L('[data-field="invoice-date"]');o("issued",h?re(h):"Not set");const j=L('[data-field="perf-start"]'),N=L('[data-field="perf-end"]');o("perf-start",j?re(j):"Not set"),o("perf-end",N?re(N):"Not set"),o("total",O(ze())),t.querySelector('[data-review="final-flag"]')?.toggleAttribute("hidden",!x?.checked);const P=t.querySelector('[data-review="docs-list"]');P&&(P.innerHTML=_.map(($,se)=>`
        <div class="cbf-review-row">
          ${Qe}
          <span>${A($.name)}</span>
          <span class="cbf-review-meta">${U($.size)}</span>
          ${i&&Re($)?`<button type="button" class="cbf-doc-view" data-view-doc="${se}" data-view-name="${A($.name)}" aria-label="Preview ${A($.name)}">${et}</button>`:""}
        </div>`).join("")),t.querySelector('[data-review="docs-card"]')?.toggleAttribute("hidden",_.length===0);const k=L('[data-field="notes"]');o("notes",k),t.querySelector('[data-review="notes-card"]')?.toggleAttribute("hidden",!k)}function Ae(){De(e.querySelector("[data-review-content]"),!0)}function tt(){De(e.querySelector("[data-modal-review-content]"))}function rt(){document.querySelector("[data-snackbar]")?.success?.("Draft saved.",{duration:3e3}),setTimeout(()=>{window.location.href="/cb-fish-design/vendor-dashboard"},700)}function Le(){const t=pe()==="modal",i=t?"[data-modal-submit]":"[data-wizard-submit]",o=e.querySelector(`${i} button.esa-button`);if(o){if(o.classList.add("esa-button--loading"),o.disabled=!0,o.setAttribute("aria-busy","true"),!o.querySelector(".esa-button__spinner")){const c=document.createElement("span");c.className="esa-button__spinner",c.setAttribute("aria-hidden","true"),o.prepend(c)}o.querySelector(".esa-button__label")?.classList.add("esa-button__label--hidden")}setTimeout(()=>{const c=`INV-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9e4)+1e4)}`;it(o),t&&e.querySelector("[data-confirm-modal]")?.close(),ot(),document.querySelector("[data-snackbar]")?.success?.(`Invoice ${c} submitted.`,{duration:4e3})},1500)}function it(t){t&&(t.classList.remove("esa-button--loading"),t.disabled=!1,t.removeAttribute("aria-busy"),t.querySelector(".esa-button__spinner")?.remove(),t.querySelector(".esa-button__label")?.classList.remove("esa-button__label--hidden"))}function ot(){be(),_=[],te(),e.querySelectorAll("[data-field]").forEach(t=>{typeof t.checked=="boolean"&&(t.checked=!1),t.value="",t.removeAttribute?.("error-text")}),e.querySelectorAll("[data-step-error]").forEach(t=>t.setAttribute("hidden","")),W=!1,x&&(x.checked=!1),ae(),F=!1,G(),C(n,!1),n=0,C(0,!0),Z(),z(),window.scrollTo({top:0,behavior:"smooth"})}}ht();
