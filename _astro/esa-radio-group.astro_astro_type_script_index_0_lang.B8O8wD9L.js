import{i as n,b as s,a as d}from"./lit-element.C8p3bJxG.js";let c=0;class p extends n{constructor(){super(),this.warnedNoName=!1,this.selectOption=e=>{e.disabled||(this.value=e.value,this.internals.setFormValue(this.value),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0})))},this.onKeydown=(e,i)=>{(e.key===" "||e.key==="Enter")&&(e.preventDefault(),this.selectOption(i))},this.options=[],this.label="",this.ariaLabel=null,this.size="md",this.orientation="vertical",this.value=null,this.internals=this.attachInternals(),this.uid=`esa-radio-${++c}`}static{this.formAssociated=!0}static{this.properties={options:{type:Array},label:{type:String},ariaLabel:{type:String,attribute:"aria-label"},size:{type:String,reflect:!0},orientation:{type:String,reflect:!0},value:{type:String}}}willUpdate(e){if(e.has("options")&&typeof this.options=="string")try{this.options=JSON.parse(this.options)}catch{this.options=[]}!this.warnedNoName&&!this.label&&!this.ariaLabel&&(this.warnedNoName=!0,console.warn("<esa-radio-group> has no accessible name. Set `label` (visible) or `aria-label` (invisible) so screen readers announce the group."))}connectedCallback(){super.connectedCallback(),this.internals.setFormValue(this.value)}isSelected(e){return this.value===e}render(){const e=`${this.uid}-label`;return s`
      ${this.label?s`<span class="group-label" id=${e}>${this.label}</span>`:null}
      <div
        class="items"
        role="radiogroup"
        aria-labelledby=${this.label?e:void 0}
        aria-label=${!this.label&&this.ariaLabel?this.ariaLabel:void 0}
      >
        ${this.options.map((i,o)=>{const t=this.isSelected(i.value),a=i.disabled??!1,r=`${this.uid}-option-${o}`;return s`
            <label
              class="item ${a?"item--disabled":""}"
              @keydown=${l=>this.onKeydown(l,i)}
              @click=${()=>this.selectOption(i)}
            >
              <span
                class="circle ${t?"circle--selected":""}"
                role="radio"
                aria-checked=${String(t)}
                aria-disabled=${String(a)}
                aria-labelledby=${r}
                tabindex=${a?-1:0}
              >
                <span class="dot"></span>
              </span>
              <span class="item-label" id=${r}>${i.label}</span>
            </label>
          `})}
      </div>
    `}static{this.styles=d`
    :host {
      --_radio-size: 20px;
      --_radio-dot-size: 10px;
      --_radio-font-size: var(--form-font-size-md, 0.9375rem);
      display: block;
    }
    :host([size='xs']) {
      --_radio-size: 14px;
      --_radio-dot-size: 7px;
      --_radio-font-size: var(--form-font-size-xs, 0.8125rem);
    }
    :host([size='sm']) {
      --_radio-size: 16px;
      --_radio-dot-size: 8px;
      --_radio-font-size: var(--form-font-size-sm, 0.875rem);
    }
    :host([size='lg']) {
      --_radio-size: 24px;
      --_radio-dot-size: 12px;
      --_radio-font-size: var(--form-font-size-lg, 1.125rem);
    }

    .group-label {
      display: block;
      margin-bottom: var(--spacing-200, 8px);
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_radio-font-size);
      font-weight: var(--font-weight-medium, 450);
      color: var(--color-text-primary, #171717);
    }

    .items {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-200, 8px);
    }
    :host([orientation='horizontal']) .items {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--spacing-400, 16px);
    }

    .item {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-200, 8px);
      cursor: pointer;
      user-select: none;
    }
    .item--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--_radio-size);
      height: var(--_radio-size);
      flex-shrink: 0;
      border: var(--form-border-width, 2px) solid var(--form-border-color, #d4d4d4);
      border-radius: 50%;
      background: var(--form-bg, #fff);
      transition:
        border-color var(--transition-fast, 150ms ease),
        box-shadow var(--transition-fast, 150ms ease);
    }
    .circle--selected {
      border-color: var(--color-primary, #43608a);
    }
    .circle:focus-visible {
      outline: none;
      border-color: var(--form-border-color-focus, #43608a);
      box-shadow: 0 0 0 var(--focus-ring-width)
        var(--focus-ring-color);
    }

    .dot {
      width: var(--_radio-dot-size);
      height: var(--_radio-dot-size);
      border-radius: 50%;
      background: transparent;
      transition: background var(--transition-fast, 150ms ease);
    }
    .circle--selected .dot {
      background: var(--color-primary, #43608a);
    }

    .item-label {
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_radio-font-size);
      color: var(--color-text-primary, #171717);
      line-height: 1.4;
    }
  `}}customElements.get("esa-radio-group")||customElements.define("esa-radio-group",p);
