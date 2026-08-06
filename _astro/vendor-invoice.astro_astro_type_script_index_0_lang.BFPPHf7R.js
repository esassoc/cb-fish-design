import"./crs-commitments.astro_astro_type_script_index_0_lang.BfuPGaUe.js";import"./esa-text-field.astro_astro_type_script_index_0_lang.Bh9QjbpR.js";import"./cbf-legacy-we-selector.astro_astro_type_script_index_0_lang.HUpJg4S3.js";import"./esa-combobox.Ce7-Tfkz.js";import"./cbf-legacy-milestones-panel.astro_astro_type_script_index_0_lang.CAN_sttU.js";import"./esa-confirm-dialog.DkUG8ZSa.js";import"./cbf-legacy-sow-intro-modal.astro_astro_type_script_index_0_lang.ClC7BfLJ.js";import{i as nt,A as C,b as d,a as it}from"./lit-element.C8p3bJxG.js";import"./esa-textarea.astro_astro_type_script_index_0_lang.f3qIukGs.js";const ne=["January","February","March","April","May","June","July","August","September","October","November","December"],st=["Su","Mo","Tu","We","Th","Fr","Sa"],Te=[];for(let l=1990;l<=2060;l++)Te.push(l);function Ce(l){if(!l)return null;const t=l.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!t)return null;const o=parseInt(t[1],10),s=parseInt(t[2],10)-1,c=parseInt(t[3],10),n=new Date(o,s,c);return n.getFullYear()!==o||n.getMonth()!==s||n.getDate()!==c?null:n}function Ie(l){return`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`}function ie(l,t){return l.getFullYear()===t.getFullYear()&&l.getMonth()===t.getMonth()&&l.getDate()===t.getDate()}function se(l){return`${String(l.getMonth()+1).padStart(2,"0")}/${String(l.getDate()).padStart(2,"0")}/${l.getFullYear()}`}function Z(l){const t=l.trim();if(!t)return null;const o=t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);if(o){const c=o[3].length===2?2e3+parseInt(o[3]):parseInt(o[3]),n=new Date(c,parseInt(o[1])-1,parseInt(o[2]));if(n.getMonth()===parseInt(o[1])-1&&n.getDate()===parseInt(o[2]))return n}const s=new Date(t);return isNaN(s.getTime())?null:s}function lt(l,t=!1){const o=l.slice(0,8);return o.length===0?"":o.length<2?o:o.length===2?t?o:`${o}/`:o.length<4?`${o.slice(0,2)}/${o.slice(2)}`:o.length===4?t?`${o.slice(0,2)}/${o.slice(2)}`:`${o.slice(0,2)}/${o.slice(2)}/`:`${o.slice(0,2)}/${o.slice(2,4)}/${o.slice(4)}`}class ct extends nt{static formAssociated=!0;static properties={label:{type:String},placeholder:{type:String},required:{type:Boolean},disabled:{type:Boolean,reflect:!0},errorText:{type:String,attribute:"error-text"},helpText:{type:String,attribute:"help-text"},value:{type:String},_open:{state:!0},_viewYear:{state:!0},_viewMonth:{state:!0},_monthOpen:{state:!0},_yearOpen:{state:!0},_monthSearch:{state:!0},_yearSearch:{state:!0},_inputText:{state:!0}};internals;_onDocClick=t=>{this._open&&!t.composedPath().includes(this)&&this._close()};_onSiblingOpen=t=>{t.detail?.source!==this&&this._open&&this._close()};constructor(){super(),this.label="",this.placeholder="MM/DD/YYYY",this.required=!1,this.disabled=!1,this.errorText="",this.helpText="",this.value="";const t=new Date;this._viewYear=t.getFullYear(),this._viewMonth=t.getMonth(),this._open=!1,this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch="",this._inputText="",this.internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick),document.addEventListener("bcn-date-picker:open",this._onSiblingOpen)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick),document.removeEventListener("bcn-date-picker:open",this._onSiblingOpen)}updated(t){if(t.has("value")){this.internals.setFormValue(this.value||null);const o=Ce(this.value);if(o){this._viewYear=o.getFullYear(),this._viewMonth=o.getMonth();const s=Z(this._inputText);(!s||!ie(s,o))&&(this._inputText=se(o))}else this.value||(this._inputText="")}}_calendarCells(){const t=new Date(this._viewYear,this._viewMonth,1),o=new Date(this._viewYear,this._viewMonth+1,0).getDate(),s=[];for(let c=0;c<t.getDay();c++)s.push(null);for(let c=1;c<=o;c++)s.push(new Date(this._viewYear,this._viewMonth,c));for(;s.length%7!==0;)s.push(null);return s}_onTextInput(t){const o=t.target,s=t.inputType==="insertFromPaste",c=t.inputType?.startsWith("delete")??!1;let n;if(s){const f=Z(o.value);n=f?se(f):o.value}else{const f=o.value.replace(/\D/g,"").slice(0,8);n=lt(f,c)}o.value=n,this._inputText=n;const m=Z(n);m?(this.value=Ie(m),this.internals.setFormValue(this.value),this._viewYear=m.getFullYear(),this._viewMonth=m.getMonth(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))):n||(this.value="",this.internals.setFormValue(null),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}_onTextBlur(){if(!this._inputText)return;const t=Z(this._inputText);t&&(this._inputText=se(t))}_toggle(t){t.stopPropagation(),!this.disabled&&(this._open=!this._open,this._open?document.dispatchEvent(new CustomEvent("bcn-date-picker:open",{detail:{source:this}})):this._closeNavDropdowns())}_close(){this._open=!1,this._closeNavDropdowns()}_closeNavDropdowns(){this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch=""}_toggleMonth(t){t.stopPropagation(),this._monthOpen=!this._monthOpen,this._yearOpen=!1,this._monthSearch="",this._monthOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--month")?.focus()})}_toggleYear(t){t.stopPropagation(),this._yearOpen=!this._yearOpen,this._monthOpen=!1,this._yearSearch="",this._yearOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--year")?.focus(),this.shadowRoot?.querySelector(".cal-nav__option.is-selected")?.scrollIntoView({block:"nearest"})})}_selectMonth(t,o){o.stopPropagation(),this._viewMonth=t,this._monthOpen=!1,this._monthSearch=""}_selectYear(t,o){o.stopPropagation(),this._viewYear=t,this._yearOpen=!1,this._yearSearch=""}_selectDay(t){this.value=Ie(t),this.internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this._close()}_selectToday(){const t=new Date;t.setHours(0,0,0,0),this._selectDay(t)}_onKeyDown(t){t.key==="Escape"&&(this._monthOpen||this._yearOpen?(this._closeNavDropdowns(),t.stopPropagation()):this._open&&(this._close(),t.stopPropagation()))}_onCalendarClick(t){if(!this._monthOpen&&!this._yearOpen)return;const o=t.composedPath();let s=!1;this.shadowRoot?.querySelectorAll(".cal-nav").forEach(c=>{o.includes(c)&&(s=!0)}),s||this._closeNavDropdowns()}_renderMonthCombo(){const t=ne.filter(o=>o.toLowerCase().includes(this._monthSearch.toLowerCase()));return d`
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
        ${this._monthOpen?d`
          <div class="cal-nav__panel" @click=${o=>o.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--month"
              placeholder="Month…"
              .value=${this._monthSearch}
              @input=${o=>{this._monthSearch=o.target.value}}
              aria-label="Search months"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${t.length===0?d`<p class="cal-nav__empty">No match</p>`:t.map(o=>{const s=ne.indexOf(o),c=s===this._viewMonth;return d`<button type="button" role="option"
                    class="cal-nav__option${c?" is-selected":""}"
                    aria-selected=${String(c)}
                    @click=${n=>this._selectMonth(s,n)}>${o}</button>`})}
            </div>
          </div>`:C}
      </div>`}_renderYearCombo(){const t=Te.filter(o=>String(o).includes(this._yearSearch));return d`
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
        ${this._yearOpen?d`
          <div class="cal-nav__panel" @click=${o=>o.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--year"
              placeholder="Year…"
              .value=${this._yearSearch}
              @input=${o=>{this._yearSearch=o.target.value}}
              aria-label="Search years"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${t.length===0?d`<p class="cal-nav__empty">No match</p>`:t.map(o=>{const s=o===this._viewYear;return d`<button type="button" role="option"
                    class="cal-nav__option${s?" is-selected":""}"
                    aria-selected=${String(s)}
                    @click=${c=>this._selectYear(o,c)}>${o}</button>`})}
            </div>
          </div>`:C}
      </div>`}render(){const t=Ce(this.value),o=new Date;o.setHours(0,0,0,0);const s=this._calendarCells(),c=!!this.errorText;return d`
      <div class="field" @keydown=${this._onKeyDown}>

        ${this.label?d`
          <label class="field__label" @click=${()=>this.shadowRoot?.querySelector(".date-input")?.focus()}>
            ${this.label}${this.required?d`<span class="field__req" aria-hidden="true">&thinsp;*</span>`:C}
          </label>`:C}

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

          ${this._open?d`
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
                ${st.map(n=>d`<span class="calendar__weekday">${n}</span>`)}
              </div>

              <div class="calendar__days">
                ${s.map(n=>{if(!n)return d`<span class="calendar__day is-empty"></span>`;const m=ie(n,o),f=t&&ie(n,t);return d`
                    <button
                      type="button"
                      class="calendar__day${m?" is-today":""}${f?" is-selected":""}"
                      aria-label=${n.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
                      aria-pressed=${String(!!f)}
                      @click=${()=>this._selectDay(n)}
                    >${n.getDate()}</button>`})}
              </div>


            </div>`:C}
        </div>

        ${c?d`<p class="field__message field__message--error" role="alert">${this.errorText}</p>`:this.helpText?d`<p class="field__message">${this.helpText}</p>`:C}

      </div>
    `}static styles=it`
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
  `}customElements.define("bcn-date-picker",ct);function dt(){const l=document.querySelector("[data-invoice-wizard]");if(!l)return;const t=l,o=t.querySelector("[data-stepper]"),s=Array.from(t.querySelectorAll("[data-stepper-step]")),c=Array.from(t.querySelectorAll(".cbf-stepper__line"));let n=0;const m=2,f=t.querySelector("[data-pdf-panel]"),g=t.querySelector("[data-pdf-frame]"),$=t.querySelector("[data-pdf-filename]"),ze=t.querySelector(".cbf-invoice-workspace");function q(e,r){t.querySelectorAll(`[data-step="${e}"]`).forEach(a=>{r?a.removeAttribute("hidden"):a.setAttribute("hidden","")})}function G(e){if(!(e!==m&&!Oe(n))){if(n===0&&e===1&&He()){Je(()=>G(e));return}if(e===1&&de()==="modal"){Fe();return}q(n,!1),n=e,q(n,!0),K(),n===1&&Me(),D(),window.scrollTo({top:0,behavior:"smooth"})}}function Fe(){const e=t.querySelector("[data-confirm-modal]");e&&(tt(),e.show())}function K(){const e=n>=s.length;o?.toggleAttribute("hidden",e),!e&&(s.forEach((r,a)=>{r.classList.toggle("is-active",a===n),r.classList.toggle("is-done",a<n)}),c.forEach((r,a)=>{r.style.background=a<n?"var(--color-primary)":"var(--color-border)"}))}let le="page";const ce=t.querySelector("[data-confirm-mode-bar]");ce?.addEventListener("click",e=>{const r=e.target.closest("[data-confirm-mode]");if(!r)return;const a=r.dataset.confirmMode;a&&(le=a,ce.querySelectorAll("[data-confirm-mode]").forEach(i=>{i.classList.toggle("is-active",i.dataset.confirmMode===a)}))});function de(){return le}const Ne="JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXSAvUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GMSA0IDAgUiA+PiA+PiAvQ29udGVudHMgNSAwIFIgPj4KZW5kb2JqCjQgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iago1IDAgb2JqCjw8IC9MZW5ndGggNjAgPj4Kc3RyZWFtCkJUIC9GMSAyMiBUZiA3MiA3MDAgVGQgKERlbW8gaW52b2ljZSBcMjI2IGZvciB0ZXN0aW5nKSBUaiBFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0MSAwMDAwMCBuIAowMDAwMDAwMzExIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKNDIxCiUlRU9GCg==";function Pe(){const e=Uint8Array.from(atob(Ne),r=>r.charCodeAt(0));return new File([e],"demo-invoice.pdf",{type:"application/pdf"})}function ue(){u||j(Pe());const e=(r,a)=>{const i=t.querySelector(r);i&&(i.value=a,i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0})))};e('[data-field="contract"]',"CON-2025-0112"),e('[data-field="invoice-number"]',"INV-2026-0042"),e('[data-field="invoice-date"]',"2026-06-29"),e('[data-field="perf-start"]',"2026-01-01"),e('[data-field="perf-end"]',"2026-03-31"),e('[data-field="total-amount"]',"4850.00"),e('[data-field="notes"]',"Autofilled demo invoice (testing)."),G(1)}window.vendorInvoiceAutofill=ue,t.addEventListener("click",e=>{const r=e.target;r.closest("[data-wizard-next]")&&G(n+1),r.closest("[data-wizard-back]")&&n>0&&(q(n,!1),n--,q(n,!0),K(),D()),r.closest("[data-wizard-save-draft]")&&rt(),r.closest("[data-wizard-submit]")&&Ee(),r.closest("[data-modal-submit]")&&Ee(),r.closest("[data-modal-back]")&&t.querySelector("[data-confirm-modal]")?.close(),r.closest("[data-wizard-cancel]")&&(t.querySelector("[data-confirm-modal]")?.close(),window.location.href="/cb-fish-design/vendor-dashboard"),r.closest("[data-dev-autofill]")&&ue()}),t.querySelectorAll("[data-combobox-options]").forEach(e=>{try{e.options=JSON.parse(e.dataset.comboboxOptions??"[]")}catch{}});function D(){const e=n===1,r=n===0||e;f?.toggleAttribute("hidden",!r),ze?.classList.toggle("has-pdf",r),t.querySelector("[data-upload-remove]")?.toggleAttribute("hidden",e),r&&u&&ve()}function Oe(e){if(e===0){const r=Ue(),a=je();return r&&a}return!0}function Ue(){const e=t.querySelector('[data-step-error="upload"]'),r=!!u;return e?.toggleAttribute("hidden",r),r}function je(){let e=!0;[t.querySelector('[data-field="invoice-number"]'),t.querySelector('[data-field="invoice-date"]'),t.querySelector('[data-field="perf-start"]'),t.querySelector('[data-field="perf-end"]'),t.querySelector('[data-field="contract"]')].forEach(S=>{if(!S)return;(S.value??S.getAttribute("value")??"").trim()?S.removeAttribute("error-text"):(S.setAttribute("error-text","This field is required."),e=!1)});const a=t.querySelector('[data-field="perf-start"]'),i=t.querySelector('[data-field="perf-end"]'),p=a?.value??"",N=i?.value??"";p&&N&&p>N&&(i?.setAttribute("error-text","End date must be on or after start date."),e=!1);const P=t.querySelector('[data-step-error="total"]'),O=t.querySelector('[data-step-error="total-exceeds"]');return te()<=0?(e=!1,P?.removeAttribute("hidden"),O?.setAttribute("hidden",""),_?.setAttribute("error-text","Enter the invoice total amount.")):(P?.setAttribute("hidden",""),we()?(e=!1,W()):(O?.setAttribute("hidden",""),_?.removeAttribute("error-text"))),e}let I=!1;function H(){const e=!I;t.querySelector("[data-form-lock-notice]")?.toggleAttribute("hidden",!e),t.querySelectorAll("[data-field]:not([data-readonly])").forEach(r=>{r.toggleAttribute("disabled",e)}),t.querySelector("[data-add-line-item]")?.toggleAttribute("disabled",e),t.querySelector("[data-docs-add]")?.toggleAttribute("disabled",e),t.querySelectorAll(".cbf-li-input").forEach(r=>{r.disabled=e}),t.querySelectorAll(".cbf-li-remove").forEach(r=>{r.disabled=e})}H();let u=null;const M=t.querySelector("[data-upload-zone]"),U=t.querySelector("[data-upload-input]"),T=t.querySelector("[data-mobile-upload-input]"),pe=t.querySelector("[data-upload-idle]"),fe=t.querySelector("[data-pdf-viewer]");let h=null,b=null;function he(e){t.querySelectorAll("[data-view-invoice],[data-view-doc]").forEach(r=>{r.classList.toggle("is-active",r.getAttribute("data-view-name")===e)})}function ve(){b&&(URL.revokeObjectURL(b),b=null),g&&h&&(g.src=h),$&&u&&($.textContent=u.name),he(u?.name??"")}function Ye(e){b&&(URL.revokeObjectURL(b),b=null),b=URL.createObjectURL(e),g&&(g.src=b),$&&($.textContent=e.name),he(e.name)}function Re(e){return e.type==="application/pdf"||e.type.startsWith("image/")||/\.(pdf|png|jpe?g)$/i.test(e.name)}D();const J=25*1024*1024;function Be(e){const r=t.querySelector("[data-upload-inline-error]"),a=t.querySelector("[data-upload-inline-error-msg]");a&&(a.textContent=e),r?.removeAttribute("hidden")}function We(){t.querySelector("[data-upload-inline-error]")?.setAttribute("hidden","")}function Ve(e){return e.type==="application/pdf"||e.name.toLowerCase().endsWith(".pdf")?e.size>J?`This file is ${R(e.size)} — the maximum is 25 MB. Please upload a smaller PDF.`:null:"That file isn’t a PDF. Please upload a PDF invoice."}function j(e){const r=Ve(e);if(r){Be(r);return}We(),u=e,pe?.setAttribute("hidden",""),fe?.removeAttribute("hidden"),t.querySelector('[data-step-error="upload"]')?.setAttribute("hidden",""),I||(I=!0,H()),h&&URL.revokeObjectURL(h),h=URL.createObjectURL(e),g&&(g.src=h),$&&($.textContent=e.name),n===1&&Me(),D()}function me(){u=null,U.value="",T&&(T.value=""),fe?.setAttribute("hidden",""),pe?.removeAttribute("hidden"),h&&(URL.revokeObjectURL(h),h=null),g&&(g.src=""),D()}let y=[];const Y=t.querySelector("[data-docs-input]"),X=t.querySelector("[data-docs-list]");function Q(){X&&(X.innerHTML=y.map((e,r)=>`
      <div class="cbf-doc-row">
        <svg class="cbf-doc-row__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <div class="cbf-doc-row__info">
          <span class="cbf-doc-row__name">${E(e.name)}</span>
          <span class="cbf-doc-row__size">${R(e.size)}</span>
        </div>
        <button type="button" class="cbf-doc-row__remove" data-doc-remove="${r}" aria-label="Remove ${E(e.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""))}t.querySelector("[data-docs-add]")?.addEventListener("click",()=>Y?.click());function ge(e){const r=t.querySelector("[data-docs-error]"),a=t.querySelector("[data-docs-error-msg]");e?(a&&(a.textContent=e),r?.removeAttribute("hidden")):r?.setAttribute("hidden","")}function be(e){if(!e.length)return;const r=e.filter(i=>i.size>J),a=new Set(y.map(i=>i.name));if(y.push(...e.filter(i=>i.size<=J&&!a.has(i.name))),r.length){const i=r.map(p=>p.name).join(", ");ge(`${i} ${r.length>1?"each exceed":"exceeds"} the 25 MB limit and ${r.length>1?"were":"was"} not added.`)}else ge("");Q()}Y?.addEventListener("change",()=>{be(Array.from(Y.files??[])),Y.value=""});const A=t.querySelector("[data-docs-zone]");A?.addEventListener("dragover",e=>{e.preventDefault(),A.classList.add("is-over")}),A?.addEventListener("dragleave",e=>{A.contains(e.relatedTarget)||A.classList.remove("is-over")}),A?.addEventListener("drop",e=>{e.preventDefault(),A.classList.remove("is-over"),be(Array.from(e.dataTransfer?.files??[]))}),X?.addEventListener("click",e=>{const r=e.target.closest("[data-doc-remove]");r&&(y.splice(Number(r.dataset.docRemove),1),Q())}),t.querySelector("[data-review-content]")?.addEventListener("click",e=>{const r=e.target;if(r.closest("[data-view-invoice]")){ve();return}const a=r.closest("[data-view-doc]");if(a){const i=y[Number(a.dataset.viewDoc)];i&&Ye(i)}}),t.querySelector("[data-upload-browse]")?.addEventListener("click",()=>U.click()),t.querySelector("[data-upload-remove]")?.addEventListener("click",me),t.querySelector("[data-mobile-upload-btn]")?.addEventListener("click",()=>T?.click()),U.addEventListener("change",()=>{const e=U.files?.[0];e&&j(e)}),T?.addEventListener("change",()=>{const e=T.files?.[0];e&&j(e)}),M.addEventListener("dragover",e=>{e.preventDefault(),M.classList.add("is-over")}),M.addEventListener("dragleave",()=>M.classList.remove("is-over")),M.addEventListener("drop",e=>{e.preventDefault(),M.classList.remove("is-over");const r=e.dataTransfer?.files?.[0];r&&j(r)});function R(e){return e<1024*1024?`${(e/1024).toFixed(0)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function ee(e){if(!e)return"—";const r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e),a=r?new Date(Number(r[1]),Number(r[2])-1,Number(r[3])):new Date(e);return Number.isNaN(a.getTime())?e:a.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}let v=[];const B=t.querySelector("[data-line-items]"),ye=t.querySelector("[data-invoice-total]"),_=t.querySelector('[data-field="total-amount"]');function te(){const e=String(_?.value??"").replace(/[^0-9.]/g,""),r=parseFloat(e);return Number.isFinite(r)&&r>0?r:0}function _e(){const e=re[x?.value??""];return e?e.remaining:null}function we(){const e=_e();return e!=null&&te()>e}function W(){const e=t.querySelector('[data-step-error="total-exceeds"]'),r=_e();if(r!=null&&we()){const a=e?.querySelector("[data-remaining-amount]");a&&(a.textContent=z(r)),e?.removeAttribute("hidden"),_?.setAttribute("error-text","Exceeds the remaining contract balance.")}else e?.setAttribute("hidden",""),_?.getAttribute("error-text")==="Exceeds the remaining contract balance."&&_.removeAttribute("error-text")}function xe(){v.push({description:"",qty:1,unitPrice:0}),Se()}function Ze(e){v.splice(e,1),Se()}function Se(){const e=I?"":" disabled";B.innerHTML=v.map((r,a)=>`
      <div class="cbf-line-item" data-row="${a}">
        <input${e}
          class="cbf-li-input cbf-li-desc"
          type="text"
          placeholder="Description…"
          value="${E(r.description)}"
          data-li-field="description"
          data-li-idx="${a}"
        />
        <input${e}
          class="cbf-li-input cbf-li-qty"
          type="number"
          min="1"
          value="${r.qty}"
          data-li-field="qty"
          data-li-idx="${a}"
          style="text-align:right"
        />
        <input${e}
          class="cbf-li-input cbf-li-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value="${r.unitPrice||""}"
          data-li-field="unitPrice"
          data-li-idx="${a}"
          style="text-align:right"
        />
        <span class="cbf-li-total" data-li-total="${a}">${z(r.qty*r.unitPrice)}</span>
        <button type="button"${e} class="cbf-li-remove" data-li-remove="${a}" aria-label="Remove line item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join(""),ke()}function ke(){const e=v.reduce((r,a)=>r+a.qty*a.unitPrice,0);ye&&(ye.textContent=z(e))}function z(e){return e.toLocaleString("en-US",{style:"currency",currency:"USD"})}function E(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}B.addEventListener("input",e=>{const r=e.target,a=Number(r.dataset.liIdx),i=r.dataset.liField;if(!i||isNaN(a))return;i==="description"&&(v[a].description=r.value),i==="qty"&&(v[a].qty=Math.max(1,Number(r.value)||1)),i==="unitPrice"&&(v[a].unitPrice=Math.max(0,Number(r.value)||0));const p=B.querySelector(`[data-li-total="${a}"]`);p&&(p.textContent=z(v[a].qty*v[a].unitPrice)),ke()}),B.addEventListener("click",e=>{const r=e.target.closest("[data-li-remove]");r&&Ze(Number(r.dataset.liRemove))}),t.querySelector("[data-add-line-item]")?.addEventListener("click",xe);const w=t.querySelector("[data-final-invoice]"),Ge=t.querySelector("[data-final-invoice-callout]"),F=t.querySelector("[data-final-invoice-dialog]"),x=t.querySelector('[data-field="contract"]');let re={};try{re=JSON.parse(x?.dataset.contractAmounts??"{}")}catch{}_?.addEventListener("input",W),_?.addEventListener("change",W),x?.addEventListener("change",W);const Ae=t.querySelector('[data-field="project"]');let $e={};try{$e=JSON.parse(x?.dataset.contractProjects??"{}")}catch{}x?.addEventListener("change",()=>{Ae&&(Ae.value=$e[x.value??""]??"")});function ae(){Ge?.classList.toggle("is-flagged",!!w?.checked)}let V=!1;w?.addEventListener("change",()=>{V=!0,ae()});function qe(){return te()}function Ke(){const e=re[x?.value??""],r=qe();if(!e||r<=0)return!1;const a=e.remaining-r;return a>=0&&a<.05*e.total}function He(){return!!w&&!V&&!w.checked&&Ke()}function Je(e){if(!F){e();return}const r=x?.value||"this contract";F.message=`The remaining balance on ${r} is within 5% of this invoice's total, which usually means it's the last one. Marking it final closes out the contract — should we flag this as the final invoice?`;const a=i=>{F.removeEventListener("resolved",a),!i.detail?.dismissed&&(V=!0,i.detail?.confirmed&&(w.checked=!0,ae()),e())};F.addEventListener("resolved",a),F.show()}xe();function L(e){return t.querySelector(e)?.value??""}function Xe(e){const r=t.querySelector(e);if(!r)return"";const a=r.value??"";return r.options?.find(p=>p.value===a)?.label??a}const Qe='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',et='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';function De(e,r=!1){if(!e)return;const a=(k,oe)=>{const Le=e.querySelector(`[data-review="${k}"]`);Le&&(Le.textContent=oe)};a("file-name",u?.name??"(no file)"),a("file-size",u?R(u.size):"");const i=e.querySelector("[data-view-invoice]");i&&(i.toggleAttribute("hidden",!r||!u),i.setAttribute("data-view-name",u?.name??"")),a("invoice-number",L('[data-field="invoice-number"]')||"No invoice number"),a("contract",Xe('[data-field="contract"]')||"—"),a("project",L('[data-field="project"]')||"—");const p=L('[data-field="invoice-date"]');a("issued",p?ee(p):"Not set");const N=L('[data-field="perf-start"]'),P=L('[data-field="perf-end"]');a("perf-start",N?ee(N):"Not set"),a("perf-end",P?ee(P):"Not set"),a("total",z(qe())),e.querySelector('[data-review="final-flag"]')?.toggleAttribute("hidden",!w?.checked);const O=e.querySelector('[data-review="docs-list"]');O&&(O.innerHTML=y.map((k,oe)=>`
        <div class="cbf-review-row">
          ${Qe}
          <span>${E(k.name)}</span>
          <span class="cbf-review-meta">${R(k.size)}</span>
          ${r&&Re(k)?`<button type="button" class="cbf-doc-view" data-view-doc="${oe}" data-view-name="${E(k.name)}" aria-label="Preview ${E(k.name)}">${et}</button>`:""}
        </div>`).join("")),e.querySelector('[data-review="docs-card"]')?.toggleAttribute("hidden",y.length===0);const S=L('[data-field="notes"]');a("notes",S),e.querySelector('[data-review="notes-card"]')?.toggleAttribute("hidden",!S)}function Me(){De(t.querySelector("[data-review-content]"),!0)}function tt(){De(t.querySelector("[data-modal-review-content]"))}function rt(){document.querySelector("[data-snackbar]")?.success?.("Draft saved.",{duration:3e3}),setTimeout(()=>{window.location.href="/cb-fish-design/vendor-dashboard"},700)}function Ee(){const e=de()==="modal",r=e?"[data-modal-submit]":"[data-wizard-submit]",a=t.querySelector(`${r} button.esa-button`);if(a){if(a.classList.add("esa-button--loading"),a.disabled=!0,a.setAttribute("aria-busy","true"),!a.querySelector(".esa-button__spinner")){const i=document.createElement("span");i.className="esa-button__spinner",i.setAttribute("aria-hidden","true"),a.prepend(i)}a.querySelector(".esa-button__label")?.classList.add("esa-button__label--hidden")}setTimeout(()=>{const i=`INV-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9e4)+1e4)}`;at(a),e&&t.querySelector("[data-confirm-modal]")?.close(),ot(),document.querySelector("[data-snackbar]")?.success?.(`Invoice ${i} submitted.`,{duration:4e3})},1500)}function at(e){e&&(e.classList.remove("esa-button--loading"),e.disabled=!1,e.removeAttribute("aria-busy"),e.querySelector(".esa-button__spinner")?.remove(),e.querySelector(".esa-button__label")?.classList.remove("esa-button__label--hidden"))}function ot(){me(),y=[],Q(),t.querySelectorAll("[data-field]").forEach(e=>{typeof e.checked=="boolean"&&(e.checked=!1),e.value="",e.removeAttribute?.("error-text")}),t.querySelectorAll("[data-step-error]").forEach(e=>e.setAttribute("hidden","")),V=!1,w&&(w.checked=!1),ae(),I=!1,H(),q(n,!1),n=0,q(0,!0),K(),D(),window.scrollTo({top:0,behavior:"smooth"})}}dt();
