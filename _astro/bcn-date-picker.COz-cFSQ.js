import{i as g,A as c,b as i,a as b}from"./lit-element.C8p3bJxG.js";const p=["January","February","March","April","May","June","July","August","September","October","November","December"],y=["Su","Mo","Tu","We","Th","Fr","Sa"],f=[];for(let o=1990;o<=2060;o++)f.push(o);function _(o){if(!o)return null;const t=o.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!t)return null;const e=parseInt(t[1],10),a=parseInt(t[2],10)-1,n=parseInt(t[3],10),r=new Date(e,a,n);return r.getFullYear()!==e||r.getMonth()!==a||r.getDate()!==n?null:r}function v(o){return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}function h(o,t){return o.getFullYear()===t.getFullYear()&&o.getMonth()===t.getMonth()&&o.getDate()===t.getDate()}function u(o){return`${String(o.getMonth()+1).padStart(2,"0")}/${String(o.getDate()).padStart(2,"0")}/${o.getFullYear()}`}function d(o){const t=o.trim();if(!t)return null;const e=t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);if(e){const n=e[3].length===2?2e3+parseInt(e[3]):parseInt(e[3]),r=new Date(n,parseInt(e[1])-1,parseInt(e[2]));if(r.getMonth()===parseInt(e[1])-1&&r.getDate()===parseInt(e[2]))return r}const a=new Date(t);return isNaN(a.getTime())?null:a}function m(o,t=!1){const e=o.slice(0,8);return e.length===0?"":e.length<2?e:e.length===2?t?e:`${e}/`:e.length<4?`${e.slice(0,2)}/${e.slice(2)}`:e.length===4?t?`${e.slice(0,2)}/${e.slice(2)}`:`${e.slice(0,2)}/${e.slice(2)}/`:`${e.slice(0,2)}/${e.slice(2,4)}/${e.slice(4)}`}class x extends g{static formAssociated=!0;static properties={label:{type:String},hideLabel:{type:Boolean,attribute:"hide-label"},placeholder:{type:String},required:{type:Boolean},disabled:{type:Boolean,reflect:!0},errorText:{type:String,attribute:"error-text"},helpText:{type:String,attribute:"help-text"},value:{type:String},_open:{state:!0},_viewYear:{state:!0},_viewMonth:{state:!0},_monthOpen:{state:!0},_yearOpen:{state:!0},_monthSearch:{state:!0},_yearSearch:{state:!0},_inputText:{state:!0}};internals;_onDocClick=t=>{this._open&&!t.composedPath().includes(this)&&this._close()};_onSiblingOpen=t=>{t.detail?.source!==this&&this._open&&this._close()};constructor(){super(),this.label="",this.hideLabel=!1,this.placeholder="MM/DD/YYYY",this.required=!1,this.disabled=!1,this.errorText="",this.helpText="",this.value="";const t=new Date;this._viewYear=t.getFullYear(),this._viewMonth=t.getMonth(),this._open=!1,this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch="",this._inputText="",this.internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick),document.addEventListener("bcn-date-picker:open",this._onSiblingOpen)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick),document.removeEventListener("bcn-date-picker:open",this._onSiblingOpen)}updated(t){if(t.has("value")){this.internals.setFormValue(this.value||null);const e=_(this.value);if(e){this._viewYear=e.getFullYear(),this._viewMonth=e.getMonth();const a=d(this._inputText);(!a||!h(a,e))&&(this._inputText=u(e))}else this.value||(this._inputText="")}}_calendarCells(){const t=new Date(this._viewYear,this._viewMonth,1),e=new Date(this._viewYear,this._viewMonth+1,0).getDate(),a=[];for(let n=0;n<t.getDay();n++)a.push(null);for(let n=1;n<=e;n++)a.push(new Date(this._viewYear,this._viewMonth,n));for(;a.length%7!==0;)a.push(null);return a}_onTextInput(t){const e=t.target,a=t.inputType==="insertFromPaste",n=t.inputType?.startsWith("delete")??!1;let r;if(a){const s=d(e.value);r=s?u(s):e.value}else{const s=e.value.replace(/\D/g,"").slice(0,8);r=m(s,n)}e.value=r,this._inputText=r;const l=d(r);l?(this.value=v(l),this.internals.setFormValue(this.value),this._viewYear=l.getFullYear(),this._viewMonth=l.getMonth(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))):r||(this.value="",this.internals.setFormValue(null),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}_onTextBlur(){if(!this._inputText)return;const t=d(this._inputText);t&&(this._inputText=u(t))}_toggle(t){t.stopPropagation(),!this.disabled&&(this._open=!this._open,this._open?document.dispatchEvent(new CustomEvent("bcn-date-picker:open",{detail:{source:this}})):this._closeNavDropdowns())}_close(){this._open=!1,this._closeNavDropdowns()}_closeNavDropdowns(){this._monthOpen=!1,this._yearOpen=!1,this._monthSearch="",this._yearSearch=""}_toggleMonth(t){t.stopPropagation(),this._monthOpen=!this._monthOpen,this._yearOpen=!1,this._monthSearch="",this._monthOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--month")?.focus()})}_toggleYear(t){t.stopPropagation(),this._yearOpen=!this._yearOpen,this._monthOpen=!1,this._yearSearch="",this._yearOpen&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".cal-nav__search--year")?.focus(),this.shadowRoot?.querySelector(".cal-nav__option.is-selected")?.scrollIntoView({block:"nearest"})})}_selectMonth(t,e){e.stopPropagation(),this._viewMonth=t,this._monthOpen=!1,this._monthSearch=""}_selectYear(t,e){e.stopPropagation(),this._viewYear=t,this._yearOpen=!1,this._yearSearch=""}_selectDay(t){this.value=v(t),this.internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this._close()}_selectToday(){const t=new Date;t.setHours(0,0,0,0),this._selectDay(t)}_onKeyDown(t){t.key==="Escape"&&(this._monthOpen||this._yearOpen?(this._closeNavDropdowns(),t.stopPropagation()):this._open&&(this._close(),t.stopPropagation()))}_onCalendarClick(t){if(!this._monthOpen&&!this._yearOpen)return;const e=t.composedPath();let a=!1;this.shadowRoot?.querySelectorAll(".cal-nav").forEach(n=>{e.includes(n)&&(a=!0)}),a||this._closeNavDropdowns()}_renderMonthCombo(){const t=p.filter(e=>e.toLowerCase().includes(this._monthSearch.toLowerCase()));return i`
      <div class="cal-nav" data-type="month">
        <button type="button"
          class="cal-nav__trigger${this._monthOpen?" is-open":""}"
          @click=${this._toggleMonth}
          aria-haspopup="listbox"
          aria-expanded=${String(this._monthOpen)}
          aria-label="Select month">
          ${p[this._viewMonth]}
          <svg class="cal-nav__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${this._monthOpen?i`
          <div class="cal-nav__panel" @click=${e=>e.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--month"
              placeholder="Month…"
              .value=${this._monthSearch}
              @input=${e=>{this._monthSearch=e.target.value}}
              aria-label="Search months"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${t.length===0?i`<p class="cal-nav__empty">No match</p>`:t.map(e=>{const a=p.indexOf(e),n=a===this._viewMonth;return i`<button type="button" role="option"
                    class="cal-nav__option${n?" is-selected":""}"
                    aria-selected=${String(n)}
                    @click=${r=>this._selectMonth(a,r)}>${e}</button>`})}
            </div>
          </div>`:c}
      </div>`}_renderYearCombo(){const t=f.filter(e=>String(e).includes(this._yearSearch));return i`
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
        ${this._yearOpen?i`
          <div class="cal-nav__panel" @click=${e=>e.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--year"
              placeholder="Year…"
              .value=${this._yearSearch}
              @input=${e=>{this._yearSearch=e.target.value}}
              aria-label="Search years"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${t.length===0?i`<p class="cal-nav__empty">No match</p>`:t.map(e=>{const a=e===this._viewYear;return i`<button type="button" role="option"
                    class="cal-nav__option${a?" is-selected":""}"
                    aria-selected=${String(a)}
                    @click=${n=>this._selectYear(e,n)}>${e}</button>`})}
            </div>
          </div>`:c}
      </div>`}render(){const t=_(this.value),e=new Date;e.setHours(0,0,0,0);const a=this._calendarCells(),n=!!this.errorText;return i`
      <div class="field" @keydown=${this._onKeyDown}>

        ${this.label&&!this.hideLabel?i`
          <label class="field__label" @click=${()=>this.shadowRoot?.querySelector(".date-input")?.focus()}>
            ${this.label}${this.required?i`<span class="field__req" aria-hidden="true">&thinsp;*</span>`:c}
          </label>`:c}

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

          ${this._open?i`
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
                ${y.map(r=>i`<span class="calendar__weekday">${r}</span>`)}
              </div>

              <div class="calendar__days">
                ${a.map(r=>{if(!r)return i`<span class="calendar__day is-empty"></span>`;const l=h(r,e),s=t&&h(r,t);return i`
                    <button
                      type="button"
                      class="calendar__day${l?" is-today":""}${s?" is-selected":""}"
                      aria-label=${r.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
                      aria-pressed=${String(!!s)}
                      @click=${()=>this._selectDay(r)}
                    >${r.getDate()}</button>`})}
              </div>


            </div>`:c}
        </div>

        ${n?i`<p class="field__message field__message--error" role="alert">${this.errorText}</p>`:this.helpText?i`<p class="field__message">${this.helpText}</p>`:c}

      </div>
    `}static styles=b`
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
  `}customElements.define("bcn-date-picker",x);
