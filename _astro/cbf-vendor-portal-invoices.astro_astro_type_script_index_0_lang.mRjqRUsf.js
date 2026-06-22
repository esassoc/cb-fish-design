import{i as L,b as A,a as I}from"./lit-element.CbK1SoNn.js";import"./esa-side-dialog.5lXNVt6w.js";class z extends L{constructor(){super(),this.onKeydown=t=>{const e=this.options;if(!e||e.length===0)return;const l=this.renderRoot.querySelectorAll(".chip"),s=Array.from(l).indexOf(this.renderRoot.activeElement),d=this.multiple?Math.max(0,s):Math.max(0,e.findIndex(b=>b.value===this.value));let u;switch(t.key){case"ArrowRight":case"ArrowDown":u=(d+1)%e.length;break;case"ArrowLeft":case"ArrowUp":u=(d-1+e.length)%e.length;break;case"Home":u=0;break;case"End":u=e.length-1;break;case"Enter":case" ":t.preventDefault(),this.select(e[d]);return;default:return}t.preventDefault(),this.multiple||this.select(e[u]),l[u]?.focus()},this.options=[],this.value="",this.values=[],this.multiple=!1,this.size="md",this.name="",this.label="",this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={options:{type:Array},value:{type:String,reflect:!0},values:{type:Array},multiple:{type:Boolean,reflect:!0},size:{type:String,reflect:!0},name:{type:String},label:{type:String}}}willUpdate(t){if(t.has("options")&&typeof this.options=="string")try{this.options=JSON.parse(this.options)}catch{this.options=[]}if(t.has("values")&&typeof this.values=="string")try{this.values=JSON.parse(this.values)}catch{this.values=[]}}connectedCallback(){super.connectedCallback(),this.internals.role=this.multiple?"group":"radiogroup",this.label&&(this.internals.ariaLabel=this.label),this.syncFormValue()}updated(){this.label&&(this.internals.ariaLabel=this.label)}syncFormValue(){this.multiple?this.internals.setFormValue(this.values.length?this.values.join(","):null):this.internals.setFormValue(this.value||null)}isActive(t){return this.multiple?this.values.includes(t.value):t.value===this.value}select(t){if(this.multiple){this.values=this.values.includes(t.value)?this.values.filter(e=>e!==t.value):[...this.values,t.value],this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{values:[...this.values]},bubbles:!0,composed:!0}));return}t.value!==this.value&&(this.value=t.value,this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0})))}render(){return A`
      <div class="root" @keydown=${this.onKeydown}>
        ${(this.options??[]).map((t,e)=>{const l=this.isActive(t),s=this.multiple?e===0:l;return A`
            <button
              type="button"
              role=${this.multiple?"checkbox":"radio"}
              class="chip chip--${t.tone??"neutral"} ${l?"chip--active":""}"
              part="chip"
              tabindex=${s?0:-1}
              aria-checked=${l}
              @click=${()=>this.select(t)}
            >
              <span class="chip__label" part="label">${t.label}</span>
            </button>
          `})}
      </div>
    `}static{this.styles=I`
    :host {
      --_gap: var(--spacing-150, 0.375rem);
      --_pad-y: var(--spacing-150, 0.375rem);
      --_pad-x: var(--form-padding-x-md, 0.75rem);
      --_font: var(--form-font-size-md, 0.9375rem);
      --_radius: var(--radius-100, 0.25rem);

      /* Resting (unselected) chrome. */
      --_bg: var(--color-surface, #fff);
      --_border: var(--color-border, #e5e5e5);
      --_color: var(--color-text-secondary, #525252);
      --_bg-hover: var(--color-surface-sunken, #f5f5f5);
      --_border-hover: var(--color-border-strong, #d4d4d4);
      --_color-hover: var(--color-text-primary, #171717);

      display: inline-flex;
    }
    :host([size='xs']) { --_pad-x: var(--form-padding-x-xs, 0.5rem); --_font: var(--form-font-size-xs, 0.75rem); --_pad-y: var(--spacing-100, 0.25rem); }
    :host([size='sm']) { --_pad-x: var(--form-padding-x-sm, 0.625rem); --_font: var(--form-font-size-sm, 0.75rem); --_pad-y: var(--spacing-100, 0.25rem); }
    :host([size='lg']) { --_pad-x: var(--form-padding-x-lg, 1rem); --_font: var(--form-font-size-lg, 1rem); --_pad-y: var(--spacing-200, 0.5rem); }

    .root {
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--_gap);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-100, 0.25rem);
      padding: var(--_pad-y) var(--_pad-x);
      border-radius: var(--_radius, 0.25rem);
      border: 1px solid var(--_border);
      background: var(--_bg);
      color: var(--_color);
      font: inherit;
      font-size: var(--_font);
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      transition:
        background-color var(--transition-fast, 150ms ease),
        border-color var(--transition-fast, 150ms ease),
        color var(--transition-fast, 150ms ease);
    }

    .chip:hover:not(.chip--active) {
      background: var(--_bg-hover);
      border-color: var(--_border-hover);
      color: var(--_color-hover);
    }

    .chip:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--focus-ring-width, 2px) var(--focus-ring-color, #43608a);
    }

    .chip__label { line-height: 1; }

    /* Active palettes mirror Ecology semantic tokens. */
    .chip--active.chip--neutral {
      background: var(--color-surface-sunken, #efefef);
      border-color: var(--color-border-strong, #d4d4d4);
      color: var(--color-text-tertiary, #404040);
    }
    .chip--active.chip--neutral-strong {
      background: var(--color-border, #e5e5e5);
      border-color: var(--color-border-strong, #d4d4d4);
      color: var(--color-text-primary, #171717);
    }
    /* Reads the SEMANTIC primary chain so spoke themes re-skin it — hub
       default is brand blue, a forest-green theme goes forest. */
    .chip--active.chip--brand {
      background: var(--color-primary-subtle, #f3f8fb);
      border-color: var(--color-primary-border, #cfe2ee);
      color: var(--color-primary, #43608a);
    }
    .chip--active.chip--amber {
      background: var(--color-warning-subtle, #fffbeb);
      border-color: var(--color-warning-border, #fde68a);
      color: var(--color-warning, #b45309);
    }
  `}}customElements.get("esa-chip-group")||customElements.define("esa-chip-group",z);function D(o){const t=o.querySelector("[data-invoice-search]"),e=o.querySelector("[data-invoice-stage-filter]"),l=o.querySelector("[data-invoice-group]"),s=o.querySelector("[data-invoice-body]"),d=Array.from(o.querySelectorAll("[data-row]")),u=o.querySelector("[data-invoice-empty]"),b=o.querySelector("[data-invoice-table]"),x=o.querySelector("[data-invoice-count]");if(!s)return;const q=d.length,w=o.querySelectorAll("thead th").length,C=()=>s.querySelectorAll("[data-group-header]").forEach(p=>p.remove()),E=(p,g)=>{const f=document.createElement("tr");f.setAttribute("data-group-header","");const n=document.createElement("th");return n.colSpan=w,n.setAttribute("scope","colgroup"),n.innerHTML=`${p} <span class="cbf-vendor-portal-invoices__group-count">· ${g}</span>`,f.appendChild(n),f},y=()=>{const p=(t?.value??"").trim().toLowerCase(),g=e?.value??"",f=l?.value??"none",n=[];for(const i of d){const h=!p||(i.dataset.haystack??"").includes(p),c=!g||i.dataset.stage===g,a=h&&c;i.hidden=!a,a&&n.push(i)}if(C(),f==="none")for(const i of d)s.appendChild(i);else{const i=new Map;for(const h of n){const c=h.dataset[f]??"—";let a=i.get(c);a||(a=[],i.set(c,a)),a.push(h)}for(const[h,c]of[...i.entries()].sort((a,S)=>a[0].localeCompare(S[0]))){s.appendChild(E(h,c.length));for(const a of c)s.appendChild(a)}for(const h of d)h.hidden&&s.appendChild(h)}u&&(u.hidden=n.length!==0),b&&(b.hidden=n.length===0),x&&(x.textContent=`Showing ${n.length} of ${q} invoices`)};t?.addEventListener("input",y),e?.addEventListener("change",y),l?.addEventListener("change",y),F(o,d)}function F(o,t){const e=o.querySelector("[data-invoice-dialog]");if(!e)return;const l=e.querySelector("[data-detail-status]"),s=e.querySelector("[data-detail-contract]"),d=e.querySelector("[data-detail-project]"),u=e.querySelector("[data-detail-invoice-date]"),b=e.querySelector("[data-detail-perf]"),x=e.querySelector("[data-detail-submitted]"),q=e.querySelector("[data-detail-amount]"),w=e.querySelector("[data-detail-items]"),C=e.querySelector("[data-detail-total]"),E=e.querySelector("[data-detail-notes-section]"),y=e.querySelector("[data-detail-notes]"),p=e.querySelector("[data-detail-position]"),g=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}),f=e.querySelector("[data-detail-prev]"),n=e.querySelector("[data-detail-next]"),i=f?.querySelector("button")??null,h=n?.querySelector("button")??null;let c=-1;const a=()=>t.filter(r=>!r.hidden),S=r=>{const v=a();c=v.indexOf(r),e.heading=r.dataset.number??"Invoice";const _=r.querySelector("[data-status-cell]");l&&(l.innerHTML=_?_.innerHTML:""),s&&(s.textContent=r.dataset.contract??""),d&&(d.textContent=r.dataset.project??""),x&&(x.textContent=r.dataset.submitted??""),q&&(q.textContent=r.dataset.amount??"");const m=JSON.parse(r.dataset.detail??"{}");u&&(u.textContent=m.invoiceDate??""),b&&(b.textContent=m.perfStart&&m.perfEnd?`${m.perfStart} – ${m.perfEnd}`:""),w&&(w.innerHTML=(m.lineItems??[]).map(k=>`<tr>
              <td>${k.description}</td>
              <td class="cbf-num">${k.qty}</td>
              <td class="cbf-num">${g.format(k.unitPrice)}</td>
              <td class="cbf-num">${g.format(k.qty*k.unitPrice)}</td>
            </tr>`).join("")),C&&(C.textContent=r.dataset.amount??""),E&&y&&(y.textContent=m.notes??"",E.hidden=!m.notes),p&&(p.textContent=`Invoice ${c+1} of ${v.length}`),i&&(i.disabled=c<=0),h&&(h.disabled=c>=v.length-1)},$=r=>{const _=a()[c+r];_&&S(_)};for(const r of t)r.addEventListener("click",()=>{S(r),e.show()}),r.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),S(r),e.show())});f?.addEventListener("click",()=>$(-1)),n?.addEventListener("click",()=>$(1))}document.querySelectorAll(".cbf-vendor-portal-invoices").forEach(D);
