import{M as V,A as G,t as O,c as K}from"./esa-chip-group.DOnIm-Wx.js";import{A as B,E as Q,i as J,b as q,a as Y}from"./lit-element.C8p3bJxG.js";import"./esa-side-dialog.dYSTc6GU.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X={CHILD:2},Z=n=>(...e)=>({_$litDirective$:n,values:e});class ee{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class M extends ee{constructor(e){if(super(e),this.it=B,e.type!==X.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===B||e==null)return this._t=void 0,this.it=e;if(e===Q)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}}M.directiveName="unsafeHTML",M.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class j extends M{}j.directiveName="unsafeSVG",j.resultType=2;const te=Z(j);class ae extends J{constructor(){super(),this.onKeydown=e=>{if(this.disabled)return;const o=this.options;if(o.length===0)return;const r=this.selectedIndex>=0?this.selectedIndex:0;let s;switch(e.key){case"ArrowRight":case"ArrowDown":s=(r+1)%o.length;break;case"ArrowLeft":case"ArrowUp":s=(r-1+o.length)%o.length;break;case"Home":s=0;break;case"End":s=o.length-1;break;case"Enter":case" ":e.preventDefault(),this.select(o[r]);return;default:return}e.preventDefault(),this.select(o[s]),this.focusButton(s)},this.label="",this.hint="",this.options=[],this.value="",this.size="md",this.disabled=!1,this.required=!1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={label:{type:String},hint:{type:String},options:{type:Array},value:{type:String},size:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.syncFormValue()}willUpdate(e){(e.has("value")||e.has("options"))&&this.syncFormValue()}get selectedIndex(){return this.options.findIndex(e=>e.value===this.value)}get focusIndex(){const e=this.selectedIndex;return e>=0?e:0}syncFormValue(){this.internals.setFormValue(this.value||null)}select(e){this.disabled||e.value===this.value||(this.value=e.value,this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0})))}focusButton(e){this.renderRoot.querySelectorAll(".option")[e]?.focus()}render(){const e=!!this.label;return q`
      ${e?q`<span class="label" id="label">
            ${this.label}${this.required?q`<span class="required" aria-hidden="true">*</span>`:null}
          </span>`:null}
      <div
        class="group"
        role="radiogroup"
        aria-labelledby=${e?"label":null}
        aria-required=${this.required?"true":null}
        aria-describedby=${this.hint?"hint":null}
        @keydown=${this.onKeydown}
      >
        ${this.options.map((o,r)=>{const s=r===this.selectedIndex;return q`<button
            type="button"
            role="radio"
            class="option ${s?"option--selected":""}"
            aria-checked=${s}
            aria-label=${o.ariaLabel??(o.label?null:o.value)}
            tabindex=${r===this.focusIndex?0:-1}
            ?disabled=${this.disabled}
            @click=${()=>this.select(o)}
          >
            ${o.icon?q`<svg
                  class="option__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  ${te(o.icon)}
                </svg>`:null}
            ${o.label?q`<span class="option__label">${o.label}</span>`:null}
          </button>`})}
      </div>
      ${this.hint?q`<span class="hint" id="hint">${this.hint}</span>`:null}
    `}static{this.styles=Y`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-100, 4px);
      --_height: var(--form-height-md, 40px);
      --_padding-x: var(--form-padding-x-md, 12px);
      --_font-size: var(--form-font-size-md, 14px);
      --_radius: var(--form-radius-md, 8px);
      --_border-width: var(--form-border-width, 1px);
      --_border-color: var(--form-border-color, #d4d4d4);
      --_icon-size: 18px;
    }
    :host([size='xs']) {
      --_height: var(--form-height-xs, 28px);
      --_padding-x: var(--form-padding-x-xs, 8px);
      --_font-size: var(--form-font-size-xs, 11px);
      --_radius: var(--form-radius-xs, 4px);
      --_icon-size: 14px;
    }
    :host([size='sm']) {
      --_height: var(--form-height-sm, 32px);
      --_padding-x: var(--form-padding-x-sm, 8px);
      --_font-size: var(--form-font-size-sm, 12px);
      --_radius: var(--form-radius-sm, 6px);
      --_icon-size: 16px;
    }
    :host([size='lg']) {
      --_height: var(--form-height-lg, 48px);
      --_padding-x: var(--form-padding-x-lg, 16px);
      --_font-size: var(--form-font-size-lg, 16px);
      --_radius: var(--form-radius-lg, 10px);
      --_icon-size: 20px;
    }

    .label {
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_font-size);
      font-weight: var(--font-weight-medium, 450);
      color: var(--form-label-color, #171717);
    }
    .required {
      color: var(--color-danger, #ef4444);
      margin-left: 2px;
    }

    /* Segmented-pill track: a sunken rail with a small inset; the selected
       segment floats as a raised white chip. (Replaces the older connected-button
       model — softer, and what the Beacon tracker mockups settled on.) */
    .group {
      display: inline-flex;
      width: fit-content;
      max-width: 100%;
      gap: 2px;
      padding: 2px;
      background: var(--color-surface-sunken, #efefef);
      border: var(--_border-width) solid var(--_border-color);
      border-radius: var(--_radius);
    }

    .option {
      appearance: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-150, 6px);
      height: calc(var(--_height) - 4px);
      padding: 0 var(--_padding-x);
      font-family: var(--font-sans, sans-serif);
      font-size: var(--_font-size);
      font-weight: var(--font-weight-medium, 450);
      color: var(--color-text-secondary, #525252);
      background: transparent;
      border: 0;
      border-radius: calc(var(--_radius) - 2px);
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      transition:
        background-color var(--transition-fast, 150ms ease),
        color var(--transition-fast, 150ms ease),
        box-shadow var(--transition-fast, 150ms ease);
    }

    .option__icon {
      width: var(--_icon-size);
      height: var(--_icon-size);
      flex-shrink: 0;
    }

    .option:hover:not(:disabled):not(.option--selected) {
      color: var(--color-text-primary, #171717);
      background: var(--color-hover-overlay, rgba(0, 0, 0, 0.04));
    }

    .option:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
      position: relative;
      z-index: 1;
    }

    .option--selected {
      background: var(--form-bg, #fff);
      color: var(--color-primary, #43608a);
      font-weight: var(--font-weight-semibold, 550);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    }

    .option:disabled {
      cursor: not-allowed;
      color: var(--color-disabled-text, #a3a3a3);
      background: transparent;
    }
    .option--selected:disabled {
      background: var(--form-bg, #fff);
      color: var(--color-disabled-text, #a3a3a3);
    }

    .hint {
      font-size: var(--type-size-150, 12px);
      color: var(--form-help-color, #737373);
    }
  `}}customElements.get("esa-button-toggle")||customElements.define("esa-button-toggle",ae);V.registerModules([G]);const re=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),U=n=>n.replace(/([()\\])/g,"\\$1");function oe(n,e){const o=`BT /F1 18 Tf 60 740 Td (${U(n)}) Tj /F1 11 Tf 0 -26 Td (${U(e)}) Tj 0 -18 Td (Columbia Basin Fish & Wildlife Program — prototype placeholder) Tj ET`,r=["<</Type/Catalog/Pages 2 0 R>>","<</Type/Pages/Kids[3 0 R]/Count 1>>","<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>",`<</Length ${o.length}>>
stream
${o}
endstream`,"<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>"];let s=`%PDF-1.4
`;const b=[];r.forEach((v,x)=>{b.push(s.length),s+=`${x+1} 0 obj
${v}
endobj
`});const S=s.length;return s+=`xref
0 ${r.length+1}
0000000000 65535 f 
`,b.forEach(v=>{s+=`${String(v).padStart(10,"0")} 00000 n 
`}),s+=`trailer
<</Size ${r.length+1}/Root 1 0 R>>
startxref
${S}
%%EOF`,new Blob([s],{type:"application/pdf"})}function H(n,e){const o=URL.createObjectURL(oe(n,`Attachment for invoice ${e}`)),r=document.createElement("a");r.href=o,r.download=n,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(o),1e3)}const W=["In review","Paid"];function ne(n){switch(n.stage){case"In review":return{text:"Under review by BPA",alert:!1};case"Paid":return{text:n.paidDate?`Paid on ${n.paidDate}`:"Paid",alert:!1};case"Needs revision":return{text:"Needs revision — action required",alert:!0};default:return{text:"",alert:!1}}}const se=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}),ie=n=>{if(!n)return null;const e=new Date(n);return Number.isNaN(e.getTime())?null:e},ce=O.withParams({fontFamily:"inherit",fontSize:"14px",foregroundColor:"var(--color-text-primary)",backgroundColor:"var(--color-surface)",headerBackgroundColor:"var(--color-surface-sunken, transparent)",headerTextColor:"var(--color-text-secondary)",headerFontWeight:600,borderColor:"var(--color-border)",rowHoverColor:"var(--color-surface-subtle, var(--color-primary-subtle))",accentColor:"var(--color-primary)",wrapperBorderRadius:0,borderRadius:"var(--radius-100, 4px)"});function le(n){const e=n.querySelector("[data-invoice-grid]"),o=n.querySelector("[data-invoice-data]");if(!e||!o)return;const r=JSON.parse(o.textContent??"[]"),s=r.length,b=new Map(r.map(t=>[t.number,t])),S=n.querySelector("[data-invoice-search]"),v=n.querySelector("[data-invoice-stage-filter]"),x=n.querySelector("[data-invoice-group]"),k=n.querySelector("[data-invoice-view]"),f=n.querySelector("[data-invoice-cards]"),D=n.querySelector("[data-invoice-empty]"),L=n.querySelector("[data-invoice-count]"),y=new Map;f?.querySelectorAll("[data-card]").forEach(t=>{y.set(t.dataset.card??"",t)});let E=k?.value||"grid",C=x?.value??"none";const T=new Map;n.querySelectorAll("[data-badge-templates] [data-stage]").forEach(t=>{T.set(t.dataset.stage??"",t.innerHTML)});let _="",F=()=>{};const $=K(e,{theme:ce,rowData:r,domLayout:"autoHeight",animateRows:!1,suppressCellFocus:!0,defaultColDef:{sortable:!0,resizable:!0,suppressHeaderMenuButton:!0},columnDefs:[{headerName:"Invoice #",field:"number",colId:"number",cellClass:"cbf-grid-id",minWidth:150,getQuickFilterText:t=>`${t.data.number} ${t.data.contractNumber} ${t.data.projectNumber} ${t.data.project}`},{headerName:"Contract #",field:"contractNumber",colId:"contractNumber",cellClass:"cbf-grid-id",minWidth:120,maxWidth:140},{headerName:"Contract",field:"contract",colId:"contract",flex:2,minWidth:200},{headerName:"Project #",field:"projectNumber",colId:"projectNumber",cellClass:"cbf-grid-id",minWidth:120,maxWidth:140},{headerName:"Invoice date",field:"invoiceDate",colId:"invoiceDate",minWidth:130,cellDataType:"date",valueGetter:t=>ie(t.data?.invoiceDate),valueFormatter:t=>t.value instanceof Date?se.format(t.value):"",getQuickFilterText:t=>t.data?.invoiceDate??""},{headerName:"Amount",field:"amount",colId:"amount",type:"numericColumn",headerClass:"cbf-grid-num",cellClass:"cbf-grid-num",minWidth:130,valueFormatter:t=>re.format(t.value)},{headerName:"Status",field:"stage",colId:"stage",minWidth:150,sortable:!0,cellRenderer:t=>`<span class="cbf-grid-status">${T.get(t.value)??t.value}</span>`}],isExternalFilterPresent:()=>_!=="",doesExternalFilterPass:t=>t.data.stage===_,onModelUpdated:()=>N(),onRowClicked:t=>{t.data&&F(t.data)}}),z=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),A=t=>C==="project"?t.project:t.contract,I=(t,p)=>{const c=document.createElement("div");c.className="cbf-invoice-group-header",c.setAttribute("data-card-group-header",""),c.innerHTML='<span class="cbf-invoice-group-header__label"></span><span class="cbf-invoice-group-header__meta"></span>',c.querySelector(".cbf-invoice-group-header__label").textContent=t;const h=p.count===1?"invoice":"invoices";return c.querySelector(".cbf-invoice-group-header__meta").textContent=`${p.count} ${h} · ${z.format(p.sum)}`,c};function N(){f?.querySelectorAll("[data-card-group-header]").forEach(d=>d.remove());const t=[];$.forEachNodeAfterFilterAndSort(d=>{d.data&&t.push(d.data.number)});const p=t.length;if(L&&(L.textContent=`Showing ${p} of ${s} invoices`),D&&(D.hidden=p!==0),e.hidden=E!=="grid"||p===0,f&&(f.hidden=E!=="cards"||p===0),E!=="cards"||!f)return;const c=new Set(t);if(t.forEach(d=>{const u=y.get(d);u&&(u.hidden=!1,f.appendChild(u))}),y.forEach((d,u)=>{c.has(u)||(d.hidden=!0)}),C==="none")return;const h=new Map;t.forEach(d=>{const u=b.get(d);if(!u)return;const a=A(u),l=h.get(a)??{count:0,sum:0};l.count+=1,l.sum+=u.amount,h.set(a,l)});let w=null;t.forEach(d=>{const u=b.get(d),a=y.get(d);if(!u||!a)return;const l=A(u);l!==w&&(f.insertBefore(I(l,h.get(l)),a),w=l)})}S?.addEventListener("input",()=>{$.setGridOption("quickFilterText",(S.value??"").trim())}),v?.addEventListener("change",()=>{_=v.value??"",$.onFilterChanged()}),x?.addEventListener("change",()=>{C=x.value??"none",$.applyColumnState({state:C==="none"?[]:[{colId:C,sort:"asc"}],defaultState:{sort:null}})}),k?.addEventListener("change",()=>{E=k.value||"grid",N()}),f?.addEventListener("click",t=>{const p=t.target;if(p.closest("[data-ref-link]")){t.preventDefault();return}const c=p.closest("[data-card]"),h=c&&b.get(c.dataset.card??"");h&&F(h)}),F=de(n,$,T),N()}function de(n,e,o){const r=n.querySelector("[data-invoice-dialog]"),s=r?.querySelector("[data-detail-status]")??null,b=r?.querySelector("[data-detail-state]")??null,S=r?.querySelector("[data-detail-pipeline]")??null,v=r?.querySelector("[data-detail-contract]")??null,x=r?.querySelector("[data-detail-project]")??null,k=r?.querySelector("[data-detail-invoice-date]")??null,f=r?.querySelector("[data-detail-perf]")??null,D=r?.querySelector("[data-detail-amount]")??null,L=r?.querySelector("[data-detail-doc]")??null,y=r?.querySelector("[data-detail-attachments]")??null,E=r?.querySelector("[data-detail-attach-title]")??null,C=r?.querySelector("[data-detail-dl-template] button")?.outerHTML??"",T=r?.querySelector("[data-detail-position]")??null;let _=[];const F=r?.querySelector("[data-detail-prev]")??null,$=r?.querySelector("[data-detail-next]")??null,z=F?.querySelector("button")??null,A=$?.querySelector("button")??null,I=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),N="Pacific Environmental Services, LLC",t="Environmental consulting · Portland, OR",p="Columbia Basin Fish & Wildlife Program",c=a=>a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),h=()=>{const a=[];return e.forEachNodeAfterFilterAndSort(l=>{l.data&&a.push(l.data)}),a};let w=-1;const d=a=>{if(!r)return;const l=h();if(w=l.findIndex(i=>i.number===a.number),r.heading=a.number??"Invoice",s&&(s.innerHTML=`<span class="cbf-grid-status">${o.get(a.stage)??a.stage}</span>`),v&&(v.textContent=a.contract??""),x&&(x.textContent=a.project??""),k&&(k.textContent=a.invoiceDate??""),f&&(f.textContent=a.perfStart&&a.perfEnd?`${a.perfStart} – ${a.perfEnd}`:""),D&&(D.textContent=I.format(a.amount??0)),b){const i=ne(a);b.textContent=i.text,b.classList.toggle("cbf-invoice-detail__state--alert",i.alert)}if(S){const i=a.stage==="Needs revision",g=i?0:W.indexOf(a.stage);S.innerHTML=W.map((m,R)=>{let P;return i&&R===0?P="returned":R<g?P="done":R===g?P="active":P="todo",`<li class="cbf-invoice-pipeline__step" data-state="${P}">
            <span class="cbf-invoice-pipeline__dot"></span>
            <span class="cbf-invoice-pipeline__label">${m}</span>
          </li>`}).join("")}if(_=[a.pdfName,...a.supportingDocs??[]],E&&(E.textContent=`Attachments (${_.length})`),y&&(y.innerHTML=_.map((i,g)=>`<li class="cbf-invoice-attach" data-primary="${g===0}">
            <span class="cbf-invoice-attach__name" title="${c(i)}">${c(i)}</span>
            ${g===0?'<span class="cbf-invoice-attach__role">Invoice</span>':""}
            <span class="cbf-invoice-attach__dl" data-attach-dl data-file="${c(i)}">${C}</span>
          </li>`).join(""),y.querySelectorAll("[data-attach-dl]").forEach(i=>{const g=i.dataset.file??"",m=i.querySelector("button");m&&(m.setAttribute("aria-label",`Download ${g}`),m.setAttribute("title",`Download ${g}`))})),L){const i=(a.lineItems??[]).map(m=>`<tr>
              <td>${c(m.description)}</td>
              <td class="cbf-num">${m.qty}</td>
              <td class="cbf-num">${I.format(m.unitPrice)}</td>
              <td class="cbf-num">${I.format(m.qty*m.unitPrice)}</td>
            </tr>`).join(""),g=a.perfStart&&a.perfEnd?`${a.perfStart} – ${a.perfEnd}`:"—";L.innerHTML=`
          <header class="cbf-doc__head">
            <div class="cbf-doc__brand">
              <p class="cbf-doc__supplier">${N}</p>
              <p class="cbf-doc__supplier-meta">${t}</p>
            </div>
            <div class="cbf-doc__mark">
              <p class="cbf-doc__mark-word">Invoice</p>
              <p class="cbf-doc__mark-number">${c(a.number??"")}</p>
            </div>
          </header>
          <div class="cbf-doc__parties">
            <div class="cbf-doc__party">
              <span class="cbf-doc__label">Billed to</span>
              <p class="cbf-doc__party-name">${p}</p>
            </div>
            <div class="cbf-doc__dates">
              <div>
                <span class="cbf-doc__label">Invoice date</span>
                <p>${c(a.invoiceDate??"—")}</p>
              </div>
              <div>
                <span class="cbf-doc__label">Performance period</span>
                <p>${c(g)}</p>
              </div>
            </div>
          </div>
          <table class="cbf-doc__items">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col" class="cbf-num">Qty</th>
                <th scope="col" class="cbf-num">Unit price</th>
                <th scope="col" class="cbf-num">Amount</th>
              </tr>
            </thead>
            <tbody>${i}</tbody>
          </table>
          <div class="cbf-doc__total">
            <span class="cbf-doc__total-label">Total due</span>
            <span class="cbf-doc__total-value">${I.format(a.amount??0)}</span>
          </div>
          ${a.notes?`<div class="cbf-doc__notes">
                   <span class="cbf-doc__label">Notes</span>
                   <p>${c(a.notes)}</p>
                 </div>`:""}
        `}T&&(T.textContent=`Invoice ${w+1} of ${l.length}`),z&&(z.disabled=w<=0),A&&(A.disabled=w>=l.length-1)},u=a=>{const i=h()[w+a];i&&d(i)};return F?.addEventListener("click",()=>u(-1)),$?.addEventListener("click",()=>u(1)),y?.addEventListener("click",a=>{const i=a.target?.closest("[data-attach-dl]")?.dataset.file;i&&H(i,r?.heading??"")}),r?.querySelector("[data-detail-download-all]")?.addEventListener("click",()=>{_.forEach((a,l)=>setTimeout(()=>H(a,r?.heading??""),l*250))}),a=>{d(a),r?.show()}}document.querySelectorAll(".cbf-vendor-dashboard-invoices").forEach(le);
