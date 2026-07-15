import{i as p,b as l,a as v}from"./lit-element.C8p3bJxG.js";class u extends p{constructor(){super(),this.onKeydown=(t,a)=>{let e=null;switch(t.key){case"ArrowRight":e=this.findNextEnabledTab(a,1);break;case"ArrowLeft":e=this.findNextEnabledTab(a,-1);break;case"Home":e=this.findNextEnabledTab(-1,1);break;case"End":e=this.findNextEnabledTab(this.tabs.length,-1);break;default:return}e!==null&&(t.preventDefault(),this.selectTab(e),t.target.parentElement?.children[e]?.focus())},this.tabs=[],this.activeIndex=0,this.size="md",this.variant="underline",this.appearance="underline"}static{this.properties={tabs:{type:Array},activeIndex:{type:Number,attribute:"active-index"},size:{type:String,reflect:!0},variant:{type:String,reflect:!0},appearance:{type:String,reflect:!0}}}selectTab(t){this.tabs[t]?.disabled||(this.activeIndex=t,this.dispatchEvent(new CustomEvent("tabchange",{detail:{index:t},bubbles:!0,composed:!0})))}findNextEnabledTab(t,a){let e=t+a;for(;e>=0&&e<this.tabs.length;){if(!this.tabs[e].disabled)return e;e+=a}return null}render(){return l`
      <div class="layout">
        <div class="tabs" part="tabs" role="tablist">
          ${this.tabs.map((t,a)=>{const e=this.activeIndex===a;return l`<button
              class="tab ${e?"tab--active":""} ${t.disabled?"tab--disabled":""}"
              type="button"
              role="tab"
              aria-selected=${e}
              tabindex=${e?0:-1}
              ?disabled=${t.disabled}
              @click=${()=>this.selectTab(a)}
              @keydown=${s=>this.onKeydown(s,a)}
            >
              ${t.icon?l`<span class="icon" .innerHTML=${t.icon}></span>`:null}
              <span>${t.label}</span>
              ${t.badge!=null?l`<span class="badge">${t.badge}</span>`:null}
            </button>`})}
        </div>
        <div class="panel" role="tabpanel">
          <slot name="panel-${this.activeIndex}"><slot></slot></slot>
        </div>
      </div>
    `}static{this.styles=v`
    :host {
      --_tab-height: var(--tab-layout-height-md, 44px);
      --_tab-font-size: var(--type-size-200, 0.875rem);
      --_tab-color: var(--tab-layout-color, var(--color-text-secondary, #525252));
      --_tab-color-active: var(--tab-layout-color-active, var(--color-primary, #43608a));
      --_tab-color-hover: var(--color-text-primary, #171717);
      --_tab-indicator-color: var(--tab-layout-indicator-color, var(--color-primary, #43608a));
      --_tab-indicator-height: 2px;
      --_tab-bg-hover: var(--color-surface-sunken, #efefef);
      --_tab-gap: var(--spacing-100, 4px);
      --_tab-padding-x: var(--spacing-400, 16px);
      --_tab-border: var(--tab-layout-border-color, var(--color-border, #e5e5e5));
      --_tab-badge-bg: var(--color-primary, #43608a);
      --_tab-badge-color: var(--color-text-inverse, #ffffff);

      display: block;
    }

    /* base :host = md. xs is one step below sm; sm/lg keep the old small/large values. */
    :host([size='xs']) {
      --_tab-height: var(--tab-layout-height-xs, 30px);
      --_tab-font-size: var(--type-size-100, 0.6875rem);
      --_tab-padding-x: var(--spacing-200, 8px);
    }
    :host([size='sm']) {
      --_tab-height: var(--tab-layout-height-sm, 36px);
      --_tab-font-size: var(--type-size-150, 0.75rem);
      --_tab-padding-x: var(--spacing-300, 12px);
    }
    :host([size='lg']) {
      --_tab-height: var(--tab-layout-height-lg, 52px);
      --_tab-font-size: var(--type-size-300, 1rem);
      --_tab-padding-x: var(--spacing-500, 24px);
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid var(--_tab-border);
      gap: var(--_tab-gap);
    }

    .tab {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-200, 8px);
      height: var(--_tab-height);
      padding-inline: var(--_tab-padding-x);
      font-family: inherit;
      font-size: var(--_tab-font-size);
      color: var(--_tab-color);
      background: none;
      border: none;
      cursor: pointer;
      position: relative;
      text-decoration: none;
      white-space: nowrap;
      transition: color 150ms ease, background-color 150ms ease;
    }
    .tab:hover:not(:disabled):not(.tab--disabled) {
      color: var(--_tab-color-hover);
      background: var(--_tab-bg-hover);
    }
    .tab--active { color: var(--_tab-color-active); font-weight: var(--font-weight-medium, 500); }
    .tab--active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--_tab-indicator-height);
      background: var(--_tab-indicator-color);
      border-radius: var(--_tab-indicator-height);
    }
    .tab--disabled { opacity: 0.5; cursor: not-allowed; }
    .tab:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: -2px;
      border-radius: var(--radius-100, 4px);
    }

    .icon { display: inline-flex; }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding-inline: var(--spacing-150, 6px);
      font-size: var(--type-size-100, 0.6875rem);
      font-weight: var(--font-weight-semibold, 600);
      background: var(--_tab-badge-bg);
      color: var(--_tab-badge-color);
      border-radius: var(--radius-full, 9999px);
    }

    /* Segmented appearance (Beacon UiTabsAppearance='segmented').
       variant='pill' is the legacy alias and shares these rules. */
    :host([appearance='segmented']) .tabs,
    :host([variant='pill']) .tabs {
      align-self: flex-start;
      border-bottom: none;
      background: var(--color-surface-sunken, #efefef);
      border: 1px solid var(--color-border, #e5e5e5);
      border-radius: var(--radius-200, 8px);
      padding: var(--spacing-050, 2px);
      gap: var(--spacing-050, 2px);
    }
    :host([appearance='segmented']) .tab,
    :host([variant='pill']) .tab { border-radius: var(--radius-100, 4px); }
    :host([appearance='segmented']) .tab--active,
    :host([variant='pill']) .tab--active {
      background: var(--color-surface, #ffffff);
      box-shadow: var(--shadow-50, 0 1px 2px rgba(0, 0, 0, 0.06));
    }
    :host([appearance='segmented']) .tab--active::after,
    :host([variant='pill']) .tab--active::after { display: none; }

    .panel { padding-top: var(--spacing-400, 16px); }
  `}}customElements.get("esa-tab-layout")||customElements.define("esa-tab-layout",u);const h={"#tasks":0,"#invoices":1,"#portfolio":2},g=["#tasks","#invoices","#portfolio"],f={cor:0,"invoice-team":1,vendor:1};function x(){const i=h[window.location.hash];if(i!=null)return i;const t=new URLSearchParams(window.location.search).get("role")??"";return f[t]??0}function m(i){const t=i,a=i.dataset.titlePrefix;let e=[];try{e=JSON.parse(i.getAttribute("tabs")??"[]").map(o=>o.label)}catch{}const s=document.querySelector(".esa-page-header__title"),c=document.title.includes("—")?document.title.slice(document.title.indexOf("—")):"",d=o=>{if(!a)return;const r=e[o],n=r?`${a}: ${r}`:a;s&&(s.textContent=n),document.title=c?`${n} ${c}`:n};t.activeIndex=x(),d(t.activeIndex),t.addEventListener("tabchange",o=>{const r=o.detail?.index,n=g[r];n&&history.replaceState(null,"",n),typeof r=="number"&&d(r)});const b=".cbf-invoice-review-queue";i.addEventListener("cbf:open-invoice",async o=>{const r=o;r.target?.closest?.(b)||(t.activeIndex=1,await t.updateComplete,i.querySelector(b)?.dispatchEvent(new CustomEvent("cbf:open-invoice",{detail:r.detail})))})}document.querySelectorAll(".cbf-mywork-tabs").forEach(m);
