import { LitElement, html, css, nothing } from 'lit';

// bcn-date-picker — form-associated Lit web component.
// Input-first: user can type a date directly (MM/DD/YYYY) or click the calendar
// icon to open the picker. Both paths write the same ISO value.

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const YEARS: number[] = [];
for (let y = 1990; y <= 2060; y++) YEARS.push(y);

function isoToDate(iso: string): Date | null {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10) - 1;
  const day = parseInt(m[3], 10);
  const d = new Date(y, mo, day);
  if (d.getFullYear() !== y || d.getMonth() !== mo || d.getDate() !== day) return null;
  return d;
}
function dateToIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}
function formatForInput(d: Date): string {
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
}
function parseInputDate(text: string): Date | null {
  const t = text.trim();
  if (!t) return null;
  // MM/DD/YYYY or M/D/YYYY or M/D/YY
  const m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (m) {
    const year = m[3].length === 2 ? 2000 + parseInt(m[3]) : parseInt(m[3]);
    const d = new Date(year, parseInt(m[1]) - 1, parseInt(m[2]));
    if (d.getMonth() === parseInt(m[1]) - 1 && d.getDate() === parseInt(m[2])) return d;
  }
  const native = new Date(t);
  return isNaN(native.getTime()) ? null : native;
}

// Auto-mask: rebuilds MM/DD/YYYY from raw digits.
// When deleting, skips the trailing-slash auto-insert so backspace doesn't get stuck.
function applyDateMask(digits: string, isDeleting = false): string {
  const d = digits.slice(0, 8);
  if (d.length === 0) return '';
  if (d.length < 2) return d;
  if (d.length === 2) return isDeleting ? d : `${d}/`;
  if (d.length < 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  if (d.length === 4) return isDeleting ? `${d.slice(0, 2)}/${d.slice(2)}` : `${d.slice(0, 2)}/${d.slice(2)}/`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

export class BcnDatePicker extends LitElement {
  static formAssociated = true;

  static properties = {
    label:        { type: String },
    // Keep `label` as the accessible name (it is already forwarded to the input's
    // aria-label) while dropping the VISIBLE <label>. For a caller whose own layout
    // already labels the control — a label→value data row, a labelled table column —
    // rendering the word a second time is noise, and clearing `label` instead would
    // leave the input unnamed. Same idea the hub form legos still need (see the
    // spoke's docs/hub-issues.md).
    hideLabel:    { type: Boolean, attribute: 'hide-label' },
    placeholder:  { type: String },
    required:     { type: Boolean },
    disabled:     { type: Boolean, reflect: true },
    errorText:    { type: String, attribute: 'error-text' },
    helpText:     { type: String, attribute: 'help-text' },
    value:        { type: String },
    _open:        { state: true },
    _viewYear:    { state: true },
    _viewMonth:   { state: true },
    _monthOpen:   { state: true },
    _yearOpen:    { state: true },
    _monthSearch: { state: true },
    _yearSearch:  { state: true },
    _inputText:   { state: true },
  };

  declare label: string;
  declare hideLabel: boolean;
  declare placeholder: string;
  declare required: boolean;
  declare disabled: boolean;
  declare errorText: string;
  declare helpText: string;
  declare value: string;
  declare _open: boolean;
  declare _viewYear: number;
  declare _viewMonth: number;
  declare _monthOpen: boolean;
  declare _yearOpen: boolean;
  declare _monthSearch: string;
  declare _yearSearch: string;
  declare _inputText: string;

  private internals: ElementInternals;
  private _onDocClick = (e: MouseEvent) => {
    if (this._open && !e.composedPath().includes(this)) this._close();
  };
  // Close when another bcn-date-picker opens
  private _onSiblingOpen = (e: Event) => {
    if ((e as CustomEvent).detail?.source !== this && this._open) this._close();
  };

  constructor() {
    super();
    this.label = '';
    this.hideLabel = false;
    this.placeholder = 'MM/DD/YYYY';
    this.required = false;
    this.disabled = false;
    this.errorText = '';
    this.helpText = '';
    this.value = '';
    const now = new Date();
    this._viewYear = now.getFullYear();
    this._viewMonth = now.getMonth();
    this._open = false;
    this._monthOpen = false;
    this._yearOpen = false;
    this._monthSearch = '';
    this._yearSearch = '';
    this._inputText = '';
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick);
    document.addEventListener('bcn-date-picker:open', this._onSiblingOpen);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('bcn-date-picker:open', this._onSiblingOpen);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this.internals.setFormValue(this.value || null);
      const d = isoToDate(this.value);
      if (d) {
        this._viewYear = d.getFullYear();
        this._viewMonth = d.getMonth();
        // Only overwrite input text if it doesn't already represent this date
        // (avoids stomping on the user mid-type)
        const currentParsed = parseInputDate(this._inputText);
        if (!currentParsed || !sameDay(currentParsed, d)) {
          this._inputText = formatForInput(d);
        }
      } else if (!this.value) {
        this._inputText = '';
      }
    }
  }

  // ---- Calendar grid ----

  private _calendarCells(): Array<Date | null> {
    const first = new Date(this._viewYear, this._viewMonth, 1);
    const daysInMonth = new Date(this._viewYear, this._viewMonth + 1, 0).getDate();
    const cells: Array<Date | null> = [];
    for (let i = 0; i < first.getDay(); i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(this._viewYear, this._viewMonth, d));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }

  // ---- Text input handlers ----

  private _onTextInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const isPaste = e.inputType === 'insertFromPaste';
    const isDeleting = e.inputType?.startsWith('delete') ?? false;

    let masked: string;

    if (isPaste) {
      // Paste: try to parse whatever format arrived, then normalize
      const parsed = parseInputDate(input.value);
      masked = parsed ? formatForInput(parsed) : input.value;
    } else {
      // Keyboard: strip non-digits and apply MM/DD/YYYY mask
      const digits = input.value.replace(/\D/g, '').slice(0, 8);
      masked = applyDateMask(digits, isDeleting);
    }

    // Write back immediately so the cursor doesn't flicker to a stale value
    input.value = masked;
    this._inputText = masked;

    const d = parseInputDate(masked);
    if (d) {
      this.value = dateToIso(d);
      this.internals.setFormValue(this.value);
      this._viewYear = d.getFullYear();
      this._viewMonth = d.getMonth();
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    } else if (!masked) {
      this.value = '';
      this.internals.setFormValue(null);
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private _onTextBlur() {
    if (!this._inputText) return;
    // Normalize any edge-case text to MM/DD/YYYY on blur
    const d = parseInputDate(this._inputText);
    if (d) this._inputText = formatForInput(d);
  }

  // ---- Calendar state ----

  private _toggle(e: Event) {
    e.stopPropagation();
    if (this.disabled) return;
    this._open = !this._open;
    if (this._open) {
      // Tell sibling pickers to close; pass `this` so each instance can skip itself
      document.dispatchEvent(new CustomEvent('bcn-date-picker:open', { detail: { source: this } }));
    } else {
      this._closeNavDropdowns();
    }
  }
  private _close() {
    this._open = false;
    this._closeNavDropdowns();
  }
  private _closeNavDropdowns() {
    this._monthOpen = false;
    this._yearOpen = false;
    this._monthSearch = '';
    this._yearSearch = '';
  }

  private _toggleMonth(e: Event) {
    e.stopPropagation();
    this._monthOpen = !this._monthOpen;
    this._yearOpen = false;
    this._monthSearch = '';
    if (this._monthOpen) {
      this.updateComplete.then(() => {
        this.shadowRoot?.querySelector<HTMLInputElement>('.cal-nav__search--month')?.focus();
      });
    }
  }
  private _toggleYear(e: Event) {
    e.stopPropagation();
    this._yearOpen = !this._yearOpen;
    this._monthOpen = false;
    this._yearSearch = '';
    if (this._yearOpen) {
      this.updateComplete.then(() => {
        this.shadowRoot?.querySelector<HTMLInputElement>('.cal-nav__search--year')?.focus();
        this.shadowRoot?.querySelector<HTMLElement>('.cal-nav__option.is-selected')
          ?.scrollIntoView({ block: 'nearest' });
      });
    }
  }

  private _selectMonth(idx: number, e: Event) {
    e.stopPropagation();
    this._viewMonth = idx;
    this._monthOpen = false;
    this._monthSearch = '';
  }
  private _selectYear(year: number, e: Event) {
    e.stopPropagation();
    this._viewYear = year;
    this._yearOpen = false;
    this._yearSearch = '';
  }

  private _selectDay(date: Date) {
    this.value = dateToIso(date);
    this.internals.setFormValue(this.value);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this._close();
  }

  private _selectToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this._selectDay(today);
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (this._monthOpen || this._yearOpen) {
        this._closeNavDropdowns();
        e.stopPropagation();
      } else if (this._open) {
        this._close();
        e.stopPropagation();
      }
    }
  }

  private _onCalendarClick(e: MouseEvent) {
    if (!this._monthOpen && !this._yearOpen) return;
    const path = e.composedPath();
    let insideNav = false;
    this.shadowRoot?.querySelectorAll('.cal-nav').forEach(n => {
      if (path.includes(n)) insideNav = true;
    });
    if (!insideNav) this._closeNavDropdowns();
  }

  // ---- Nav comboboxes ----

  private _renderMonthCombo() {
    const filtered = MONTHS.filter(m =>
      m.toLowerCase().includes(this._monthSearch.toLowerCase())
    );
    return html`
      <div class="cal-nav" data-type="month">
        <button type="button"
          class="cal-nav__trigger${this._monthOpen ? ' is-open' : ''}"
          @click=${this._toggleMonth}
          aria-haspopup="listbox"
          aria-expanded=${String(this._monthOpen)}
          aria-label="Select month">
          ${MONTHS[this._viewMonth]}
          <svg class="cal-nav__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${this._monthOpen ? html`
          <div class="cal-nav__panel" @click=${(e: Event) => e.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--month"
              placeholder="Month…"
              .value=${this._monthSearch}
              @input=${(e: InputEvent) => { this._monthSearch = (e.target as HTMLInputElement).value; }}
              aria-label="Search months"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${filtered.length === 0
                ? html`<p class="cal-nav__empty">No match</p>`
                : filtered.map(m => {
                  const idx = MONTHS.indexOf(m);
                  const isCur = idx === this._viewMonth;
                  return html`<button type="button" role="option"
                    class="cal-nav__option${isCur ? ' is-selected' : ''}"
                    aria-selected=${String(isCur)}
                    @click=${(e: Event) => this._selectMonth(idx, e)}>${m}</button>`;
                })}
            </div>
          </div>` : nothing}
      </div>`;
  }

  private _renderYearCombo() {
    const filtered = YEARS.filter(y => String(y).includes(this._yearSearch));
    return html`
      <div class="cal-nav" data-type="year">
        <button type="button"
          class="cal-nav__trigger${this._yearOpen ? ' is-open' : ''}"
          @click=${this._toggleYear}
          aria-haspopup="listbox"
          aria-expanded=${String(this._yearOpen)}
          aria-label="Select year">
          ${this._viewYear}
          <svg class="cal-nav__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${this._yearOpen ? html`
          <div class="cal-nav__panel" @click=${(e: Event) => e.stopPropagation()} role="listbox">
            <input type="text"
              class="cal-nav__search cal-nav__search--year"
              placeholder="Year…"
              .value=${this._yearSearch}
              @input=${(e: InputEvent) => { this._yearSearch = (e.target as HTMLInputElement).value; }}
              aria-label="Search years"
              autocomplete="off"
            />
            <div class="cal-nav__options">
              ${filtered.length === 0
                ? html`<p class="cal-nav__empty">No match</p>`
                : filtered.map(y => {
                  const isCur = y === this._viewYear;
                  return html`<button type="button" role="option"
                    class="cal-nav__option${isCur ? ' is-selected' : ''}"
                    aria-selected=${String(isCur)}
                    @click=${(e: Event) => this._selectYear(y, e)}>${y}</button>`;
                })}
            </div>
          </div>` : nothing}
      </div>`;
  }

  // ---- Render ----

  render() {
    const selected = isoToDate(this.value);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const cells = this._calendarCells();
    const hasError = !!this.errorText;

    return html`
      <div class="field" @keydown=${this._onKeyDown}>

        ${this.label && !this.hideLabel ? html`
          <label class="field__label" @click=${() => this.shadowRoot?.querySelector<HTMLInputElement>('.date-input')?.focus()}>
            ${this.label}${this.required ? html`<span class="field__req" aria-hidden="true">&thinsp;*</span>` : nothing}
          </label>` : nothing}

        <div class="field__wrap">
          <div class="field__row${hasError ? ' has-error' : ''}">
            <input
              type="text"
              class="date-input"
              placeholder=${this.placeholder}
              .value=${this._inputText}
              @input=${this._onTextInput}
              @blur=${this._onTextBlur}
              ?disabled=${this.disabled}
              aria-label=${this.label || 'Date'}
              autocomplete="off"
            />
            <button
              type="button"
              class="cal-btn${this._open ? ' is-open' : ''}"
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

          ${this._open ? html`
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
                ${WEEKDAYS.map(d => html`<span class="calendar__weekday">${d}</span>`)}
              </div>

              <div class="calendar__days">
                ${cells.map(date => {
                  if (!date) return html`<span class="calendar__day is-empty"></span>`;
                  const isTod = sameDay(date, today);
                  const isSel = selected && sameDay(date, selected);
                  return html`
                    <button
                      type="button"
                      class="calendar__day${isTod ? ' is-today' : ''}${isSel ? ' is-selected' : ''}"
                      aria-label=${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      aria-pressed=${String(!!isSel)}
                      @click=${() => this._selectDay(date)}
                    >${date.getDate()}</button>`;
                })}
              </div>


            </div>` : nothing}
        </div>

        ${hasError
          ? html`<p class="field__message field__message--error" role="alert">${this.errorText}</p>`
          : this.helpText
            ? html`<p class="field__message">${this.helpText}</p>`
            : nothing}

      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      /* No --_height. esa-text-field dropped its fixed height when the hub retired
         the form-height ramp — the box is padding plus text, so it grows with rem type.
         A px lock here would leave this picker short beside a sibling field. */
      --_pad-y: var(--spacing-300, 12px);
      --_pad-x: var(--spacing-300, 12px);
      --_font-size: var(--typography-label-md-font-size, 14px);
      --_radius: var(--radius-md, 6px);
      --_border: var(--form-border-color, #d4d4d4);
      --_cell: 36px;
    }

    /* ---- Field shell ---- */
    .field { display: flex; flex-direction: column; gap: var(--spacing-100, 4px); }

    .field__label {
      font-family: var(--typography-font-family-sans, sans-serif);
      font-size: var(--font-size-200, 13px);
      font-weight: var(--typography-font-weight-medium, 500);
      color: var(--color-content-default-secondary, #464646);
      line-height: 1.4;
      cursor: default;
    }
    .field__req { color: var(--color-background-utility-danger, #dc2626); }

    .field__wrap { position: relative; }

    .field__message {
      font-family: var(--typography-font-family-sans, sans-serif);
      font-size: 12px;
      color: var(--color-content-default-tertiary, #737373);
      margin: 0;
    }
    .field__message--error { color: var(--color-background-utility-danger, #dc2626); }

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
      padding: var(--_pad-y) var(--_pad-x);
      border: 1px solid var(--_border);
      border-right: none;
      border-radius: var(--_radius) 0 0 var(--_radius);
      background: var(--color-background-elevation-raised, #fff);
      font-family: var(--typography-font-family-sans, sans-serif);
      font-size: var(--_font-size);
      color: var(--color-content-default, #171717);
      outline: none;
      transition: border-color 0.12s ease;
    }
    .date-input::placeholder { color: var(--color-content-default-tertiary, #737373); }
    .date-input:hover { border-color: var(--color-background-brand, #13273e); }
    .date-input:focus { outline: none; }
    .date-input:disabled { opacity: 0.5; cursor: not-allowed; background: var(--color-background-elevation-sunken, #f8f9fb); }

    .field__row:focus-within .date-input,
    .field__row:focus-within .cal-btn {
      border-color: var(--color-background-brand, #13273e);
    }
    .field__row:focus-within {
      border-radius: var(--_radius);
      box-shadow: 0 0 0 3px var(--color-background-brand-subtle, #e8edf2);
    }
    .field__row.has-error .date-input,
    .field__row.has-error .cal-btn { border-color: var(--color-background-utility-danger, #dc2626); }
    .field__row.has-error:focus-within {
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
    }

    .cal-btn {
      flex: none;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      /* .field__row is align-items:stretch, so the button takes the input's height;
         aspect-ratio keeps it square at whatever that turns out to be. */
      aspect-ratio: 1;
      border: 1px solid var(--_border);
      border-radius: 0 var(--_radius) var(--_radius) 0;
      background: var(--color-background-elevation-sunken, #f8f9fb);
      color: var(--color-content-default-tertiary, #737373);
      cursor: pointer;
      transition: background 0.12s ease, border-color 0.12s ease, color 0.12s ease;
    }
    .cal-btn:hover {
      background: var(--color-background-brand-subtle, #e8edf2);
      border-color: var(--color-background-brand, #13273e);
      color: var(--color-background-brand, #13273e);
    }
    .cal-btn.is-open {
      background: var(--color-background-brand-subtle, #e8edf2);
      border-color: var(--color-background-brand, #13273e);
      color: var(--color-background-brand, #13273e);
    }
    .cal-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* ---- Calendar dropdown ---- */
    .calendar {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: var(--z-dropdown, 50);
      background: var(--color-background-elevation-raised, #fff);
      border: 1px solid var(--color-border-default, #e5e5e5);
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
      font-family: var(--typography-font-family-sans, sans-serif);
      font-size: 14px;
      font-weight: var(--typography-font-weight-semibold, 600);
      color: var(--color-content-default, #171717);
      cursor: pointer;
      transition: background 0.12s ease, border-color 0.12s ease;
    }
    .cal-nav__trigger:hover {
      background: var(--color-background-elevation-sunken, #f4f5f7);
      border-color: var(--color-border-default, #e5e5e5);
    }
    .cal-nav__trigger.is-open {
      background: var(--color-background-elevation-sunken, #f4f5f7);
      border-color: var(--color-background-brand, #13273e);
    }
    .cal-nav__trigger:focus-visible {
      outline: 2px solid var(--color-background-brand, #13273e);
      outline-offset: 2px;
    }
    .cal-nav__chevron {
      color: var(--color-content-default-tertiary, #737373);
      transition: transform 0.12s ease;
    }
    .cal-nav__trigger.is-open .cal-nav__chevron { transform: rotate(180deg); }

    .cal-nav__panel {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 10;
      background: var(--color-background-elevation-raised, #fff);
      border: 1px solid var(--color-border-default, #e5e5e5);
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
      border-bottom: 1px solid var(--color-border-default, #e5e5e5);
      font-family: var(--typography-font-family-sans, sans-serif);
      font-size: 13px;
      color: var(--color-content-default, #171717);
      background: var(--color-background-elevation-raised, #fff);
      box-sizing: border-box;
      outline: none;
    }
    .cal-nav__search::placeholder { color: var(--color-content-default-tertiary, #737373); }
    .cal-nav__search:focus { border-bottom-color: var(--color-background-brand, #13273e); }

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
      font-family: var(--typography-font-family-sans, sans-serif);
      font-size: 13px;
      color: var(--color-content-default, #171717);
      text-align: left;
      cursor: pointer;
      transition: background 0.1s ease;
    }
    .cal-nav__option:hover { background: var(--color-background-elevation-sunken, #f4f5f7); }
    .cal-nav__option.is-selected {
      background: var(--color-background-brand-subtle, #e8edf2);
      color: var(--color-background-brand, #13273e);
      font-weight: var(--typography-font-weight-semibold, 600);
    }
    .cal-nav__empty {
      padding: 10px;
      font-size: 13px;
      color: var(--color-content-default-tertiary, #737373);
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
      font-family: var(--typography-font-family-sans, sans-serif);
      font-size: 11px;
      font-weight: var(--typography-font-weight-semibold, 600);
      letter-spacing: 0.04em;
      color: var(--color-content-default-tertiary, #737373);
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
      font-family: var(--typography-font-family-sans, sans-serif);
      font-size: 13px;
      color: var(--color-content-default, #171717);
      cursor: pointer;
      transition: background 0.1s ease, color 0.1s ease;
    }
    .calendar__day.is-empty { pointer-events: none; }
    .calendar__day:not(.is-empty):hover {
      background: var(--color-background-elevation-sunken, #f4f5f7);
    }
    .calendar__day:focus-visible {
      outline: 2px solid var(--color-background-brand, #13273e);
      outline-offset: 2px;
    }
    .calendar__day.is-today {
      font-weight: var(--typography-font-weight-semibold, 600);
      color: var(--color-background-brand-muted, #1a4d7c);
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
      background: var(--color-background-brand-muted, #1a4d7c);
    }
    .calendar__day.is-selected {
      background: var(--color-background-brand, #13273e);
      color: var(--color-background-elevation-raised, #fff);
      font-weight: var(--typography-font-weight-semibold, 600);
    }
    .calendar__day.is-selected.is-today::after {
      background: var(--cbf-gold-300, #f0c040);
    }
    .calendar__day.is-selected:hover {
      background: var(--color-background-brand, #13273e);
      opacity: 0.9;
    }

    /* ---- Today button (header, right-aligned) ---- */
    .calendar__today-btn {
      margin-left: auto;
      border: none;
      background: none;
      font-family: var(--typography-font-family-sans, sans-serif);
      font-size: 13px;
      font-weight: var(--typography-font-weight-semibold, 600);
      color: var(--color-background-brand-muted, #1a4d7c);
      cursor: pointer;
      padding: var(--spacing-100, 4px) var(--spacing-300, 12px);
      border-radius: var(--radius-050, 4px);
      transition: background 0.12s ease;
    }
    .calendar__today-btn:hover {
      background: var(--color-background-brand-subtle, #e8edf2);
    }
  `;
}

customElements.define('bcn-date-picker', BcnDatePicker);
