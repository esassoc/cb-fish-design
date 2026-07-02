import{M as le,A as de,t as ue,c as fe}from"./esa-chip-group.DOnIm-Wx.js";import{A as ae,E as pe,i as he,b as T,a as me}from"./lit-element.C8p3bJxG.js";import"./esa-side-dialog.dYSTc6GU.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const be={CHILD:2},ve=o=>(...a)=>({_$litDirective$:o,values:a});class ge{constructor(a){}get _$AU(){return this._$AM._$AU}_$AT(a,n,t){this._$Ct=a,this._$AM=n,this._$Ci=t}_$AS(a,n){return this.update(a,n)}update(a,n){return this.render(...n)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class O extends ge{constructor(a){if(super(a),this.it=ae,a.type!==be.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(a){if(a===ae||a==null)return this._t=void 0,this.it=a;if(a===pe)return a;if(typeof a!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(a===this.it)return this._t;this.it=a;const n=[a];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}O.directiveName="unsafeHTML",O.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class V extends O{}V.directiveName="unsafeSVG",V.resultType=2;const ye=ve(V);class xe extends he{constructor(){super(),this.onKeydown=a=>{if(this.disabled)return;const n=this.options;if(n.length===0)return;const t=this.selectedIndex>=0?this.selectedIndex:0;let s;switch(a.key){case"ArrowRight":case"ArrowDown":s=(t+1)%n.length;break;case"ArrowLeft":case"ArrowUp":s=(t-1+n.length)%n.length;break;case"Home":s=0;break;case"End":s=n.length-1;break;case"Enter":case" ":a.preventDefault(),this.select(n[t]);return;default:return}a.preventDefault(),this.select(n[s]),this.focusButton(s)},this.label="",this.hint="",this.options=[],this.value="",this.size="md",this.disabled=!1,this.required=!1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={label:{type:String},hint:{type:String},options:{type:Array},value:{type:String},size:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.syncFormValue()}willUpdate(a){(a.has("value")||a.has("options"))&&this.syncFormValue()}get selectedIndex(){return this.options.findIndex(a=>a.value===this.value)}get focusIndex(){const a=this.selectedIndex;return a>=0?a:0}syncFormValue(){this.internals.setFormValue(this.value||null)}select(a){this.disabled||a.value===this.value||(this.value=a.value,this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0})))}focusButton(a){this.renderRoot.querySelectorAll(".option")[a]?.focus()}render(){const a=!!this.label;return T`
      ${a?T`<span class="label" id="label">
            ${this.label}${this.required?T`<span class="required" aria-hidden="true">*</span>`:null}
          </span>`:null}
      <div
        class="group"
        role="radiogroup"
        aria-labelledby=${a?"label":null}
        aria-required=${this.required?"true":null}
        aria-describedby=${this.hint?"hint":null}
        @keydown=${this.onKeydown}
      >
        ${this.options.map((n,t)=>{const s=t===this.selectedIndex;return T`<button
            type="button"
            role="radio"
            class="option ${s?"option--selected":""}"
            aria-checked=${s}
            aria-label=${n.ariaLabel??(n.label?null:n.value)}
            tabindex=${t===this.focusIndex?0:-1}
            ?disabled=${this.disabled}
            @click=${()=>this.select(n)}
          >
            ${n.icon?T`<svg
                  class="option__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  ${ye(n.icon)}
                </svg>`:null}
            ${n.label?T`<span class="option__label">${n.label}</span>`:null}
          </button>`})}
      </div>
      ${this.hint?T`<span class="hint" id="hint">${this.hint}</span>`:null}
    `}static{this.styles=me`
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
  `}}customElements.get("esa-button-toggle")||customElements.define("esa-button-toggle",xe);le.registerModules([de]);const _e=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),re=o=>o.replace(/([()\\])/g,"\\$1");function $e(o,a){const n=`BT /F1 18 Tf 60 740 Td (${re(o)}) Tj /F1 11 Tf 0 -26 Td (${re(a)}) Tj 0 -18 Td (Columbia Basin Fish & Wildlife Program — prototype placeholder) Tj ET`,t=["<</Type/Catalog/Pages 2 0 R>>","<</Type/Pages/Kids[3 0 R]/Count 1>>","<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>",`<</Length ${n.length}>>
stream
${n}
endstream`,"<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>"];let s=`%PDF-1.4
`;const _=[];t.forEach((S,q)=>{_.push(s.length),s+=`${q+1} 0 obj
${S}
endobj
`});const $=s.length;return s+=`xref
0 ${t.length+1}
0000000000 65535 f 
`,_.forEach(S=>{s+=`${String(S).padStart(10,"0")} 00000 n 
`}),s+=`trailer
<</Size ${t.length+1}/Root 1 0 R>>
startxref
${$}
%%EOF`,new Blob([s],{type:"application/pdf"})}function ne(o,a){const n=URL.createObjectURL($e(o,`Attachment for invoice ${a}`)),t=document.createElement("a");t.href=n,t.download=o,document.body.appendChild(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}const oe=["In review","Paid"];function Se(o){switch(o.stage){case"Draft":return{text:o.lastEdited?`Draft · last edited ${o.lastEdited}`:"Draft — not yet submitted",alert:!1};case"In review":return{text:"Under review by BPA",alert:!1};case"Paid":return{text:o.paidDate?`Paid on ${o.paidDate}`:"Paid",alert:!1};case"Needs revision":return{text:"Needs revision — action required",alert:!0};default:return{text:"",alert:!1}}}const we=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}),Ee=o=>{if(!o)return null;const a=new Date(o);return Number.isNaN(a.getTime())?null:a},qe=ue.withParams({fontFamily:"inherit",fontSize:"14px",foregroundColor:"var(--color-text-primary)",backgroundColor:"var(--color-surface)",headerBackgroundColor:"var(--color-surface-sunken, transparent)",headerTextColor:"var(--color-text-secondary)",headerFontWeight:600,borderColor:"var(--color-border)",rowHoverColor:"var(--color-surface-subtle, var(--color-primary-subtle))",accentColor:"var(--color-primary)",wrapperBorderRadius:0,borderRadius:"var(--radius-100, 4px)"});function Ce(o){const a=o.querySelector("[data-invoice-grid]"),n=o.querySelector("[data-invoice-data]");if(!a||!n)return;const t=JSON.parse(n.textContent??"[]"),s=t.length,_=new Map(t.map(r=>[r.number,r])),$=o.querySelector("[data-invoice-search]"),S=o.querySelector("[data-invoice-stage-filter]"),q=o.querySelector("[data-invoice-group]"),I=o.querySelector("[data-invoice-view]"),g=o.querySelector("[data-invoice-cards]"),z=o.querySelector("[data-invoice-empty]"),B=o.querySelector("[data-invoice-count]"),w=new Map;g?.querySelectorAll("[data-card]").forEach(r=>{w.set(r.dataset.card??"",r)});let D=I?.value||"grid",L=q?.value??"none";const F=new Map;o.querySelectorAll("[data-badge-templates] [data-stage]").forEach(r=>{F.set(r.dataset.stage??"",r.innerHTML)});let A="",C=()=>{};const h=fe(a,{theme:qe,rowData:t,domLayout:"autoHeight",animateRows:!1,suppressCellFocus:!0,defaultColDef:{sortable:!0,resizable:!0,suppressHeaderMenuButton:!0},columnDefs:[{headerName:"Invoice #",field:"number",colId:"number",cellClass:"cbf-grid-id",minWidth:150,getQuickFilterText:r=>`${r.data.number} ${r.data.contractNumber} ${r.data.projectNumber} ${r.data.project}`},{headerName:"Contract #",field:"contractNumber",colId:"contractNumber",cellClass:"cbf-grid-id",minWidth:120,maxWidth:140},{headerName:"Contract",field:"contract",colId:"contract",flex:2,minWidth:200},{headerName:"Project #",field:"projectNumber",colId:"projectNumber",cellClass:"cbf-grid-id",minWidth:120,maxWidth:140},{headerName:"Invoice date",field:"invoiceDate",colId:"invoiceDate",minWidth:130,cellDataType:"date",valueGetter:r=>Ee(r.data?.invoiceDate),valueFormatter:r=>r.value instanceof Date?we.format(r.value):"",getQuickFilterText:r=>r.data?.invoiceDate??""},{headerName:"Amount",field:"amount",colId:"amount",type:"numericColumn",headerClass:"cbf-grid-num",cellClass:"cbf-grid-num",minWidth:130,valueFormatter:r=>_e.format(r.value)},{headerName:"Status",field:"stage",colId:"stage",minWidth:150,sortable:!0,cellRenderer:r=>`<span class="cbf-grid-status">${F.get(r.value)??r.value}</span>`}],isExternalFilterPresent:()=>A!=="",doesExternalFilterPass:r=>r.data.stage===A,onModelUpdated:()=>N(),onRowClicked:r=>{r.data&&C(r.data)}}),H=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),R=r=>L==="project"?r.project:r.contract,W=(r,m)=>{const b=document.createElement("div");b.className="cbf-invoice-group-header",b.setAttribute("data-card-group-header",""),b.innerHTML='<span class="cbf-invoice-group-header__label"></span><span class="cbf-invoice-group-header__meta"></span>',b.querySelector(".cbf-invoice-group-header__label").textContent=r;const y=m.count===1?"invoice":"invoices";return b.querySelector(".cbf-invoice-group-header__meta").textContent=`${m.count} ${y} · ${H.format(m.sum)}`,b};function N(){g?.querySelectorAll("[data-card-group-header]").forEach(f=>f.remove());const r=[];h.forEachNodeAfterFilterAndSort(f=>{f.data&&r.push(f.data.number)});const m=r.length;if(B&&(B.textContent=`Showing ${m} of ${s} invoices`),z&&(z.hidden=m!==0),a.hidden=D!=="grid"||m===0,g&&(g.hidden=D!=="cards"||m===0),D!=="cards"||!g)return;const b=new Set(r);if(r.forEach(f=>{const c=w.get(f);c&&(c.hidden=!1,g.appendChild(c))}),w.forEach((f,c)=>{b.has(c)||(f.hidden=!0)}),L==="none")return;const y=new Map;r.forEach(f=>{const c=_.get(f);if(!c)return;const E=R(c),l=y.get(E)??{count:0,sum:0};l.count+=1,l.sum+=c.amount,y.set(E,l)});let M=null;r.forEach(f=>{const c=_.get(f),E=w.get(f);if(!c||!E)return;const l=R(c);l!==M&&(g.insertBefore(W(l,y.get(l)),E),M=l)})}$?.addEventListener("input",()=>{h.setGridOption("quickFilterText",($.value??"").trim())}),S?.addEventListener("change",()=>{A=S.value??"",h.onFilterChanged()}),q?.addEventListener("change",()=>{L=q.value??"none",h.applyColumnState({state:L==="none"?[]:[{colId:L,sort:"asc"}],defaultState:{sort:null}})}),I?.addEventListener("change",()=>{D=I.value||"grid",N()}),g?.addEventListener("click",r=>{const m=r.target;if(m.closest("[data-ref-link]")){r.preventDefault();return}const b=m.closest("[data-card]"),y=b&&_.get(b.dataset.card??"");y&&C(y)}),C=ke(o,h,F),N()}function ke(o,a,n){const t=o.querySelector("[data-invoice-dialog]"),s=t?.querySelector("[data-detail-status]")??null,_=t?.querySelector("[data-detail-state]")??null,$=t?.querySelector("[data-detail-pipeline]")??null,S=t?.querySelector("[data-detail-contract]")??null,q=t?.querySelector("[data-detail-project]")??null,I=t?.querySelector("[data-detail-invoice-date]")??null,g=t?.querySelector("[data-detail-perf]")??null,z=t?.querySelector("[data-detail-amount]")??null,B=t?.querySelector("[data-detail-doc]")??null,w=t?.querySelector("[data-detail-attachments]")??null,D=t?.querySelector("[data-detail-attach-title]")??null,L=t?.querySelector("[data-detail-dl-template] button")?.outerHTML??"",F=t?.querySelector("[data-detail-position]")??null,A=t?.querySelector("[data-detail-add-docs]")??null,C=t?.querySelector("[data-detail-docs-input]")??null,h=t?.querySelector("[data-detail-docs-zone]")??null,H=t?.querySelector("[data-detail-vendor]")??null,R=t?.querySelector("[data-detail-vendor-actions]")??null,W=t?.querySelector("[data-detail-continue]")??null,N=t?.querySelector("[data-detail-continue] .esa-button__label")??null,r=t?.querySelector("[data-detail-discard]")??null,m=t?.querySelector(".cbf-invoice-detail__attach")??null,b=t?.querySelector(".cbf-invoice-detail__add-hint")??null,y=t?.querySelector("[data-detail-revision]")??null,M=t?.querySelector("[data-detail-revision-note]")??null,f=t?.querySelector("[data-detail-revision-by]")??null;let c=[];const E=new Map;let l=null;const G=t?.querySelector("[data-detail-prev]")??null,K=t?.querySelector("[data-detail-next]")??null,Q=G?.querySelector("button")??null,J=K?.querySelector("button")??null,U=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),se="Pacific Environmental Services, LLC",ie="Environmental consulting · Portland, OR",ce="Columbia Basin Fish & Wildlife Program",k=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),Y=()=>{const e=[];return a.forEachNodeAfterFilterAndSort(u=>{u.data&&e.push(u.data)}),e};let j=-1;const Z=e=>{const u=[e.pdfName,...e.supportingDocs??[]].filter(Boolean),p=E.get(e.number)??[];c=[...u,...p],m&&(m.hidden=c.length===0),D&&(D.textContent=`Attachments (${c.length})`),w&&(w.innerHTML=c.map((d,i)=>{const v=i===0?"Invoice":i>=u.length?"Added":"";return`<li class="cbf-invoice-attach" data-primary="${i===0}">
            <span class="cbf-invoice-attach__name" title="${k(d)}">${k(d)}</span>
            ${v?`<span class="cbf-invoice-attach__role">${v}</span>`:""}
            <span class="cbf-invoice-attach__dl" data-attach-dl data-file="${k(d)}">${L}</span>
          </li>`}).join(""),w.querySelectorAll("[data-attach-dl]").forEach(d=>{const i=d.dataset.file??"",v=d.querySelector("button");v&&(v.setAttribute("aria-label",`Download ${i}`),v.setAttribute("title",`Download ${i}`))}))},X=e=>{if(!l||!e.length)return;const u=new Set(c),p=e.filter(i=>i&&!u.has(i));if(!p.length)return;const d=E.get(l.number)??[];d.push(...p),E.set(l.number,d),Z(l)},ee=e=>{if(!t)return;const u=Y();j=u.findIndex(i=>i.number===e.number);const p=e.stage==="Draft",d=e.stage==="Needs revision";if(t.heading=e.number??"Invoice",s&&(s.innerHTML=`<span class="cbf-grid-status">${n.get(e.stage)??e.stage}</span>`),S&&(S.textContent=e.contract??""),q&&(q.textContent=e.project??""),I&&(I.textContent=e.invoiceDate??""),g&&(g.textContent=e.perfStart&&e.perfEnd?`${e.perfStart} – ${e.perfEnd}`:""),z&&(z.textContent=e.stage==="Draft"&&!e.amount?"—":U.format(e.amount??0)),_){const i=Se(e);_.textContent=i.text,_.classList.toggle("cbf-invoice-detail__state--alert",i.alert)}if($&&p){const i=["Draft","In review","Paid"];$.innerHTML=i.map((v,x)=>`<li class="cbf-invoice-pipeline__step" data-state="${x===0?"active":"todo"}">
            <span class="cbf-invoice-pipeline__dot"></span>
            <span class="cbf-invoice-pipeline__label">${v}</span>
          </li>`).join("")}else if($){const i=d?0:oe.indexOf(e.stage);$.innerHTML=oe.map((v,x)=>{let P;return d&&x===0?P="returned":x<i?P="done":x===i?P="active":P="todo",`<li class="cbf-invoice-pipeline__step" data-state="${P}">
            <span class="cbf-invoice-pipeline__dot"></span>
            <span class="cbf-invoice-pipeline__label">${v}</span>
          </li>`}).join("")}if(l=e,Z(e),A&&(A.hidden=!(e.stage==="In review"||d)),b&&(b.textContent=d?"Attach the documentation your contract officer asked for, then use Edit & resubmit to send it back.":"Provide additional documentation your contract officer requested — no need to change this invoice’s status."),H&&(H.hidden=!(p||d)),R&&(R.hidden=!(p||d)),N&&(N.textContent=p?"Continue editing":"Edit & resubmit"),r&&(r.hidden=!p),y&&(y.hidden=!d),d&&(M&&(M.textContent=e.revisionNote??"This invoice needs changes before it can be approved."),f&&(f.textContent=e.returnedBy?`— ${e.returnedBy}${e.returnedOn?` · ${e.returnedOn}`:""}`:"")),B){const i=(e.lineItems??[]).map(x=>`<tr>
              <td>${k(x.description)}</td>
              <td class="cbf-num">${x.qty}</td>
              <td class="cbf-num">${U.format(x.unitPrice)}</td>
              <td class="cbf-num">${U.format(x.qty*x.unitPrice)}</td>
            </tr>`).join(""),v=e.perfStart&&e.perfEnd?`${e.perfStart} – ${e.perfEnd}`:"—";B.innerHTML=`
          <header class="cbf-doc__head">
            <div class="cbf-doc__brand">
              <p class="cbf-doc__supplier">${se}</p>
              <p class="cbf-doc__supplier-meta">${ie}</p>
            </div>
            <div class="cbf-doc__mark">
              <p class="cbf-doc__mark-word">Invoice</p>
              <p class="cbf-doc__mark-number">${k(e.number??"")}</p>
            </div>
          </header>
          <div class="cbf-doc__parties">
            <div class="cbf-doc__party">
              <span class="cbf-doc__label">Billed to</span>
              <p class="cbf-doc__party-name">${ce}</p>
            </div>
            <div class="cbf-doc__dates">
              <div>
                <span class="cbf-doc__label">Invoice date</span>
                <p>${k(e.invoiceDate??"—")}</p>
              </div>
              <div>
                <span class="cbf-doc__label">Performance period</span>
                <p>${k(v)}</p>
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
            <span class="cbf-doc__total-value">${U.format(e.amount??0)}</span>
          </div>
          ${e.notes?`<div class="cbf-doc__notes">
                   <span class="cbf-doc__label">Notes</span>
                   <p>${k(e.notes)}</p>
                 </div>`:""}
        `}F&&(F.textContent=`Invoice ${j+1} of ${u.length}`),Q&&(Q.disabled=j<=0),J&&(J.disabled=j>=u.length-1)},te=e=>{const p=Y()[j+e];p&&ee(p)};return G?.addEventListener("click",()=>te(-1)),K?.addEventListener("click",()=>te(1)),w?.addEventListener("click",e=>{const p=e.target?.closest("[data-attach-dl]")?.dataset.file;p&&ne(p,t?.heading??"")}),t?.querySelector("[data-detail-download-all]")?.addEventListener("click",()=>{c.forEach((e,u)=>setTimeout(()=>ne(e,t?.heading??""),u*250))}),h?.addEventListener("click",()=>C?.click()),C?.addEventListener("change",()=>{X(Array.from(C.files??[]).map(e=>e.name)),C.value=""}),h?.addEventListener("dragover",e=>{e.preventDefault(),h.classList.add("is-over")}),h?.addEventListener("dragleave",e=>{h.contains(e.relatedTarget)||h.classList.remove("is-over")}),h?.addEventListener("drop",e=>{e.preventDefault(),h.classList.remove("is-over"),X(Array.from(e.dataTransfer?.files??[]).map(u=>u.name))}),W?.addEventListener("click",()=>{if(!l)return;const e="/cb-fish-design/";window.location.href=`${e}vendor-invoice?invoice=${encodeURIComponent(l.number)}`}),r?.addEventListener("click",()=>{if(!l||!window.confirm(`Discard draft ${l.number}? This can’t be undone.`))return;const e=l;a.applyTransaction({remove:[e]}),o.querySelector(`[data-card="${e.number}"]`)?.remove(),t?.close?.()}),e=>{ee(e),t?.show()}}document.querySelectorAll(".cbf-vendor-dashboard-invoices").forEach(Ce);
