import"./esa-tab-layout.9Zx3GJMW.js";import{i as de,b as y,a as ce}from"./lit-element.C8p3bJxG.js";import"./esa-dialog.ClC7BfLJ.js";import"./esa-select.HUpJg4S3.js";import"./esa-text-field.astro_astro_type_script_index_0_lang.Bh9QjbpR.js";import"./esa-textarea.astro_astro_type_script_index_0_lang.f3qIukGs.js";import"./esa-file-upload.D2g8Oy4i.js";import"./esa-button-toggle.CImVxTxI.js";class pe extends de{constructor(){super(),this.toggle=()=>{this.open?this.close():this.openMenu()},this.onDocumentClick=o=>{!this.contains(o.target)&&o.target!==this&&this.close()},this.onKeydown=o=>{o.key==="Escape"&&this.open&&(o.preventDefault(),this.close())},this.items=[],this.position="below-start",this.width="auto",this.open=!1}static{this.properties={items:{type:Array},position:{type:String,reflect:!0},width:{type:String,reflect:!0},open:{type:Boolean,reflect:!0}}}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocumentClick,!0)}openMenu(){this.open=!0,document.addEventListener("click",this.onDocumentClick,!0)}close(){this.open&&(this.open=!1,document.removeEventListener("click",this.onDocumentClick,!0))}selectItem(o){o.disabled||(o.action&&this.dispatchEvent(new CustomEvent("menu-action",{detail:o.action,bubbles:!0,composed:!0})),this.close())}render(){return y`
      <div class="esa-dropdown" @keydown=${this.onKeydown}>
        <div class="esa-dropdown__trigger" @click=${this.toggle}>
          <slot></slot>
        </div>
        ${this.open?y`
              <div class="esa-dropdown-menu__panel esa-dropdown-menu__panel--${this.position}" role="menu">
                ${this.items.map(o=>o.divider?y`<div class="esa-dropdown-menu__divider" role="separator"></div>`:y`
                        <button
                          class="esa-dropdown-menu__item ${o.variant==="danger"?"esa-dropdown-menu__item--danger":""} ${o.disabled?"esa-dropdown-menu__item--disabled":""}"
                          ?disabled=${o.disabled}
                          role="menuitem"
                          @click=${()=>this.selectItem(o)}
                        >
                          ${o.icon?y`<span class="esa-dropdown-menu__bullet" aria-hidden="true"></span>`:null}
                          <span>${o.label}</span>
                        </button>
                      `)}
              </div>
            `:null}
      </div>
    `}static{this.styles=ce`
    :host { display: inline-block; }

    .esa-dropdown {
      position: relative;
      display: inline-block;
    }
    .esa-dropdown__trigger { display: inline-block; }

    .esa-dropdown-menu__panel {
      position: absolute;
      z-index: var(--z-dropdown, 50);
      background: var(--dropdown-menu-bg, var(--color-surface-elevated, #ffffff));
      border: 1px solid var(--dropdown-menu-border-color, var(--color-border, #e5e5e5));
      border-radius: var(--dropdown-menu-radius, var(--radius-200, 0.5rem));
      box-shadow: var(--shadow-300, 0 6px 24px -6px rgba(0, 0, 0, 0.07));
      min-width: var(--dropdown-menu-min-width, 160px);
      max-width: var(--dropdown-menu-max-width, 280px);
      padding: var(--spacing-100, 0.25rem);
      overflow-y: auto;
      max-height: 320px;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      animation: esa-dropdown-fade 120ms ease-out;
    }
    @keyframes esa-dropdown-fade {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    :host([width='trigger']) .esa-dropdown-menu__panel { min-width: 100%; }

    .esa-dropdown-menu__panel--below-start { top: calc(100% + 4px); left: 0; }
    .esa-dropdown-menu__panel--below-end { top: calc(100% + 4px); right: 0; }
    .esa-dropdown-menu__panel--above-start { bottom: calc(100% + 4px); left: 0; }
    .esa-dropdown-menu__panel--above-end { bottom: calc(100% + 4px); right: 0; }

    .esa-dropdown-menu__item {
      display: flex;
      align-items: center;
      gap: var(--spacing-200, 0.5rem);
      width: 100%;
      padding: var(--spacing-200, 0.5rem) var(--spacing-300, 0.75rem);
      border: none;
      border-radius: var(--radius-100, 0.25rem);
      background: transparent;
      color: var(--dropdown-menu-item-color, var(--color-text-primary, #171717));
      font-family: inherit;
      font-size: var(--type-size-200, 0.9375rem);
      cursor: pointer;
      text-align: left;
      transition: background 100ms ease;
    }
    .esa-dropdown-menu__item:hover:not(:disabled) {
      background: var(--color-surface-sunken, #efefef);
    }
    .esa-dropdown-menu__item:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: -2px;
    }
    .esa-dropdown-menu__item--danger { color: var(--color-danger, #ef4444); }
    .esa-dropdown-menu__item--danger:hover:not(:disabled) {
      background: var(--color-danger-subtle, #fef2f2);
    }
    .esa-dropdown-menu__item--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .esa-dropdown-menu__bullet {
      width: 6px;
      height: 6px;
      border-radius: var(--radius-full, 9999px);
      background: currentColor;
      flex-shrink: 0;
      opacity: 0.6;
    }

    .esa-dropdown-menu__divider {
      height: 1px;
      background: var(--color-border-light, #efefef);
      margin: var(--spacing-100, 0.25rem) 0;
    }
  `}}customElements.get("esa-dropdown-menu")||customElements.define("esa-dropdown-menu",pe);const h={number:"84055 REL 11",action:"CR-365847",cor:"Jonathan Flannery"},ue=[{value:"rev1",label:"1. 84055 REL 11 (05/01/2024 - 04/30/2026)"},{value:"rev2",label:"2. Amendment 001 (05/01/2024 - 04/30/2026)"}],A=[{value:"pending",label:"Pending",tier:1},{value:"review",label:"Review",tier:2},{value:"approved",label:"Approved",tier:2},{value:"signature",label:"Signature",tier:3},{value:"issued",label:"Issued",tier:3}],M=[{value:"cm",label:"Contract manager"},{value:"cor",label:"COR (COTR)"},{value:"qc",label:"QC"},{value:"bpa",label:"BPA writer / Approver / CO"},{value:"other",label:"Other user"}],me={cm:"Elizabeth Santana",cor:"Jonathan Flannery",qc:"David Kaplowe",bpa:"Shawn Young",other:"Virgil Watts III"},he=["cor","qc","bpa"];function x(n,o,f){const u=A.find(i=>i.value===n),c=u?u.label:n;return u.tier===3?{allowed:!1,tier:3,reason:`The award is in ${c} — documents are locked. This is the existing behavior, unchanged: no file may be edited or replaced until a new revision opens.`}:f==="other"?{allowed:!0,tier:0,reason:"Standard document — existing edit rules apply."}:u.tier===1?{allowed:!0,tier:1,reason:"The SOW is Pending, so any user may replace this file from the context menu. All document specifications — type, title, authors, and sharing — are kept."}:he.includes(o)?{allowed:!0,tier:2,reason:`The award is in ${c} — as ${M.find(i=>i.value===o).label}, you may still edit LIB and Property Inventory documents.`}:{allowed:!1,tier:2,reason:`The award is in ${c} — only BPA writers, the COR, the Approver, the CO, or QC may edit LIB and Property Inventory documents now.`}}const fe='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',j=[{key:"ec",label:"EC"},{key:"cotr",label:"COTR"},{key:"qc",label:"QC"},{key:"fw",label:"F&W Approver"}],ve=[{id:"lib-budget",kind:"lib",title:"CR-365847 1 Budget",file:"CR-365847 1 Budget.xlsx",size:"137.4 KB",type:"Line Item Budget",subtype:"Contract Budget",uploaded:"3/19/2024 11:00 AM",uploadedBy:"Miriam Ashe",originalUpload:"3/15/2024 7:59 AM",originalUploadedBy:"Virgil Watts III",lastUpload:"3/19/2024 11:00 AM",lastUploadedBy:"Miriam Ashe",docId:"P207879",primaryAuthor:"Shawn Young",otherAuthors:"Watts",viewPermission:"Contacts Only",guidance:"A BPA contracting requirement that breaks down the Primary contractor's budget into individual line items. Used to justify the contract amount. May include subcontractor budgets. Max File Size: 5 MB, File Types Allowed: XLS, DOC, PDF, XLSX, DOCX. Other Restrictions: Limited to 5 per SOW revision.",workflowRow:"Line Item Budget",approvals:{ec:null,cotr:"5/22/2025",qc:"5/19/2025",fw:null}},{id:"pi-inventory",kind:"pi",title:"Property Inventory Contract 84055 REL11 (CCR52535)",file:"2002-002-00_Inventory_84055 REL11_CCR52535.xlsx",size:"19.1 KB",type:"Property Inventory",subtype:null,uploaded:"5/15/2025 3:20 PM",uploadedBy:"Brandon Cole",originalUpload:"5/15/2025 3:20 PM",originalUploadedBy:"Brandon Cole",lastUpload:"5/15/2025 3:20 PM",lastUploadedBy:"Brandon Cole",docId:"P21244",primaryAuthor:"Brandon Cole",otherAuthors:"",viewPermission:"Contacts Only",guidance:"An inventory of government-furnished and contractor-acquired property held under the contract. Required when property is transferred, disposed of, or reported annually. Max File Size: 5 MB, File Types Allowed: XLS, XLSX, PDF.",workflowRow:"Property Inventory",approvals:{ec:null,cotr:null,qc:null,fw:null}},{id:"lib-transfer",kind:"lib",title:"Line Item Budget Transfer",file:"Line Item Transfer 84055 REL 11 MOD Budget_09SEP2025.xlsx",size:"164.9 KB",type:"Line Item Budget",subtype:"Contract Budget",uploaded:"9/9/2025 2:48 PM",uploadedBy:"Elizabeth Santana",originalUpload:"9/9/2025 2:48 PM",originalUploadedBy:"Elizabeth Santana",lastUpload:"9/9/2025 2:48 PM",lastUploadedBy:"Elizabeth Santana",docId:"P219301",primaryAuthor:"Elizabeth Santana",otherAuthors:"",viewPermission:"Contacts Only",guidance:"A BPA contracting requirement that breaks down the Primary contractor's budget into individual line items. Used to justify the contract amount. May include subcontractor budgets. Max File Size: 5 MB, File Types Allowed: XLS, DOC, PDF, XLSX, DOCX. Other Restrictions: Limited to 5 per SOW revision.",workflowRow:null,approvals:{ec:null,cotr:null,qc:null,fw:null}},{id:"transmittal",kind:"other",title:"Transmittal Memo CR-365847",file:"Transmittal Memo CR-365847.docx",size:"48.2 KB",type:"Transmittal Memo",subtype:null,uploaded:"7/30/2025 4:07 PM",uploadedBy:"Jonathan Flannery",originalUpload:"7/30/2025 4:07 PM",originalUploadedBy:"Jonathan Flannery",lastUpload:"7/30/2025 4:07 PM",lastUploadedBy:"Jonathan Flannery",docId:"P215870",primaryAuthor:"Jonathan Flannery",otherAuthors:"",viewPermission:"Contacts Only",guidance:"The transmittal memo routed with the award package.",workflowRow:"Transmittal Memo",approvals:{ec:null,cotr:"7/30/2025",qc:"7/30/2025",fw:"8/6/2025"}}],we=[{date:"08/15/2025 3:02 AM",step:"IssuedInAssetSuite",from:"System Account",to:"",docStatus:""},{date:"08/01/2025 3:02 AM",step:"ApprovedInAssetSuite",from:"System Account",to:"",docStatus:""},{date:"07/30/2025 4:07 PM",step:"SubmitToApprover",from:"Jonathan Flannery",to:"David Kaplowe; Elizabeth Santana; Jonathan Flannery",docStatus:`Transmittal Memo - Attached - COTR Approval = Green
Line Item Budget - Attached - COTR Approval = Green
Property Inventory - Attached - COTR Approval = NotSet`}],K=document.querySelector("[data-lipd]");K&&be(K);function be(n){const o={award:"pending",role:"cm"},f=ve.map(e=>({...e,approvals:{...e.approvals},resetInfo:null})),u=[...we],c=[];let i=null,p=null,g=!1;const a=(e,t=document)=>t.querySelector(e),T=(e,t=document)=>Array.from(t.querySelectorAll(e)),N=e=>f.find(t=>t.id===e),S=()=>M.find(e=>e.value===o.role).label,E=()=>A.find(e=>e.value===o.award).label,D=()=>me[o.role],v=e=>{const t=a("[data-snackbar]");(t?.info??t?.success)?.call(t,e,{duration:4e3})},H=()=>{const e=new Date;let t=e.getHours();const r=t>=12?"PM":"AM";t=t%12||12;const l=String(e.getMinutes()).padStart(2,"0");return`${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()} ${t}:${l} ${r}`},J=()=>{const e=new Date;return`${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()}`},O=e=>`<span class="cbf-check">${fe} ${e}</span>`,w=a("[data-demo-award]"),b=a("[data-demo-role]");w&&(w.options=A.map(e=>({label:e.label,value:e.value})),w.value=o.award,w.addEventListener("change",()=>{o.award=w.value,C()})),b&&(b.options=M.map(e=>({label:e.label,value:e.value})),b.value=o.role,b.addEventListener("change",()=>{o.role=b.value,C()}));const q=a("[data-lipd-tabs]",n),U=()=>{q.tabs=[{label:"Documents"},{label:"Workflow"},{label:"Email archive",badge:c.length||void 0}]};U();const $=a("[data-sow-rev]",n);$&&($.options=ue,$.value="rev2");const Y={pending:"09/09/2025, DocumentAttached",review:"07/30/2025, SubmitToApprover",approved:"08/01/2025, ApprovedInAssetSuite",signature:"08/12/2025, SentForSignature",issued:"08/15/2025, IssuedInAssetSuite"},_=a("[data-edit-dialog]",n),z=a("[data-why-dialog]",n),B=a("[data-email-dialog]",n),F=a("[data-ed-save]",n),L=F.querySelector("button"),Q=a("[data-save-hint]",n),R=(e,t)=>{L.disabled=!e,F.querySelector(".esa-button")?.classList.toggle("esa-button--disabled",!e),Q.textContent=t},V=()=>{const t=a("[data-ed-upload-slot]",n).firstElementChild,r=document.createElement("esa-file-upload");r.setAttribute("data-ed-upload",""),r.setAttribute("label","Replace the file"),r.setAttribute("accept",".xls,.xlsx,.doc,.docx,.pdf"),r.setAttribute("max-size-mb","5"),t.replaceWith(r)},G=e=>{i=e,p=null,g=!1,a("[data-ed-type]",n).textContent=e.type,a("[data-ed-subtype]",n).textContent=e.subtype||"—",a("[data-ed-guidance]",n).textContent=e.guidance,a("[data-ed-file]",n).textContent=e.file,a("[data-ed-size]",n).textContent=`(${e.size})`,a("[data-ed-title]",n).value=e.title,a("[data-ed-desc]",n).value="",a("[data-ed-author]",n).textContent=e.primaryAuthor,a("[data-ed-docid]",n).textContent=e.docId,a("[data-ed-perm]",n).textContent=e.viewPermission,a("[data-ed-orig]",n).textContent=e.originalUpload,a("[data-ed-origby]",n).textContent=e.originalUploadedBy,a("[data-ed-last]",n).textContent=e.lastUpload,a("[data-ed-lastby]",n).textContent=e.lastUploadedBy,a("[data-ed-newfile]",n).hidden=!0,a("[data-ed-warning]",n).hidden=!0,R(!1,"Nothing to save yet — replace the file or edit a property to enable Save."),_.show()};n.addEventListener("change",e=>{if(!e.target.closest?.("[data-ed-upload-slot]")||!i)return;const r=e.detail?.files??[];if(!r.length)return;const l=r[0];p={name:l.name,size:`${(l.size/1024).toFixed(1)} KB`};const s=a("[data-ed-newfile]",n);s.hidden=!1,s.textContent=`New file “${p.name}” will replace “${i.file}” when you save.`;const d=Object.values(i.approvals).some(Boolean),P=a("[data-ed-warning]",n);if(P.hidden=!d,d){const m=[];i.approvals.cotr&&m.push(`${h.cor} (COR) approved this document on ${i.approvals.cotr} — they will be notified by email and asked to re-approve.`);const I=j.filter(k=>k.key!=="cotr"&&i.approvals[k.key]);I.length&&m.push(`${I.map(k=>k.label).join(", ")} approval${I.length>1?"s":""} will also be cleared.`),o.role==="qc"&&m.push("Since you are QC, your own QC approval is re-applied to your edit automatically."),a("[data-ed-warning-text]",n).textContent=m.join(" ")}R(!0,"Ready to save — the file is replaced and every specification is kept.")}),_.addEventListener("input",e=>{i&&e.target.closest("[data-ed-title], [data-ed-desc]")&&(g=!0,p||R(!0,"Ready to save your property changes."))});const W=()=>{_.close(),i=null,p=null,g=!1,V()};a("[data-ed-cancel]",n).querySelector("button").addEventListener("click",W),L.addEventListener("click",()=>{if(!i||L.disabled)return;const e=i,t=D(),r=H(),l=(a("[data-ed-title]",n).value||"").trim();if(l&&(e.title=l),p){const s=!!e.approvals.cotr,d=e.approvals.cotr,P=Object.values(e.approvals).some(Boolean);if(e.file=p.name,e.size=p.size,e.uploaded=r,e.uploadedBy=t,e.lastUpload=r,e.lastUploadedBy=t,e.approvals={ec:null,cotr:null,qc:o.role==="qc"?J():null,fw:null},e.resetInfo=P?{by:t,at:r}:null,u.unshift({date:r,step:"DocumentReplaced",from:t,to:s?h.cor:"",docStatus:`${e.type} - Replaced by ${S()} - COTR Approval = NotSet`+(o.role==="qc"?"; QC Approval = Green (own edit)":"")}),s){const m={from:"donotreply@cbfish.org",to:`${h.cor} (COR)`,sent:r,subject:`Action required: ${e.type} replaced on Contract ${h.number} (${h.action})`,p1:`${t} (${S()}) replaced the file on “${e.title}” while the SOW was ${E()}. All document specifications were retained.`,p2:`Your approval of this document (given ${d}) no longer applies. Please review the new file and re-approve it on the contract's Workflow tab.`,meta:`Contract ${h.number} · ${h.action} · ${e.file}`,docTitle:e.title};c.unshift(m),ee(m)}else v(`File replaced — all specifications for “${e.title}” were retained.`)}else g&&v(`Properties of “${e.title}” saved.`);W(),C()}),a("[data-why-close]",n).querySelector("button").addEventListener("click",()=>z.close());const Z=a("[data-email-template]",n),X=e=>{const t=Z.content.firstElementChild.cloneNode(!0),r=(l,s)=>{t.querySelector(l).textContent=s};return r("[data-em-from]",e.from),r("[data-em-to]",e.to),r("[data-em-sent]",e.sent),r("[data-em-subject]",e.subject),r("[data-em-p1]",e.p1),r("[data-em-p2]",e.p2),r("[data-em-meta]",e.meta),t},ee=e=>{a("[data-em-doc-title]",n).textContent=e.docTitle,a("[data-em-preview]",n).replaceChildren(X(e)),B.show()};a("[data-em-close]",n).querySelector("button").addEventListener("click",()=>B.close()),a("[data-em-archive]",n).querySelector("button").addEventListener("click",()=>{B.close(),q.activeIndex=2}),n.addEventListener("menu-action",e=>{const t=e.target.closest("[data-doc-menu]");if(!t)return;const r=N(t.getAttribute("data-doc-menu"));if(r)switch(e.detail){case"view":v("Viewing documents is unchanged by this story — out of scope for the prototype.");break;case"copy":v("Attachment link copied (prototype).");break;case"delete":v("Deleting attachments is unchanged by this story — and no longer the only way to swap a file.");break;case"why":{const l=x(o.award,o.role,r.kind);a("[data-why-reason]",n).textContent=l.reason,z.show();break}case"edit":G(r);break}}),a("[data-add-doc]")?.querySelector("button")?.addEventListener("click",()=>v("Adding attachments is unchanged by this story — out of scope for the prototype."));const te=()=>{const e=x(o.award,o.role,"lib"),t=e.allowed?"allowed":e.tier===3?"locked":"restricted";T("[data-banner]",n).forEach(l=>{l.hidden=l.dataset.banner!==t});const r=a(`[data-banner="${t}"] [data-banner-text]`,n);r.textContent=`Acting as ${D()} (${S()}) · award state ${E()}. ${e.reason}`},ae=()=>{f.forEach(e=>{const t=a(`[data-doc-menu="${e.id}"]`,n);if(!t)return;const r=x(o.award,o.role,e.kind),l=x(o.award,o.role,"other");t.items=[{label:"View Document",action:"view"},{label:"Edit Properties",action:"edit",disabled:!r.allowed},{label:"Delete Attachment",action:"delete",variant:"danger",disabled:!l.allowed},{label:"Copy Attachment Link",action:"copy"},...r.allowed?[]:[{divider:!0},{label:"Why is editing locked?",action:"why"}]]})},ne=e=>e.approvals.cotr?O(e.approvals.cotr):e.resetInfo?'<span class="cbf-reappr">Needs re-approval</span>':'<span class="cbf-none">–</span>',oe=()=>{f.forEach(e=>{const t=a(`[data-doc-row="${e.id}"]`,n);t&&(a('[data-cell="title"]',t).textContent=e.title,a('[data-cell="file"]',t).textContent=e.file,a('[data-cell="size"]',t).textContent=e.size,a('[data-cell="uploaded"]',t).textContent=e.uploaded,a('[data-cell="uploadedBy"]',t).textContent=e.uploadedBy,a('[data-cell="cor"]',t).innerHTML=ne(e))})},re=()=>{f.forEach(e=>{if(!e.workflowRow)return;j.forEach(s=>{const d=a(`[data-appr="${e.id}:${s.key}"]`,n);d&&(d.innerHTML=e.approvals[s.key]?O(e.approvals[s.key]):'<span class="cbf-none">–</span>')});const t=a(`[data-appr-last="${e.id}"]`,n);t&&(t.textContent=e.lastUpload),a(`[data-appr-row="${e.id}"]`,n)?.classList.toggle("is-reset",!!e.resetInfo);const l=a(`[data-appr-flag="${e.id}"]`,n);l&&(l.hidden=!e.resetInfo)})},le=()=>{a("[data-history]",n).replaceChildren(...u.map(t=>{const r=document.createElement("tr");return[t.date,t.step,t.from,t.to,t.docStatus].forEach((l,s)=>{const d=document.createElement("td");d.textContent=l,s===4&&(d.className="cbf-hist-table__status"),r.appendChild(d)}),t.step==="DocumentReplaced"&&r.classList.add("is-new"),r}))},ie=()=>{a("[data-email-empty]",n).hidden=c.length>0,a("[data-email-list]",n).replaceChildren(...c.map(X)),U()},se=()=>{const e=A.find(t=>t.value===o.award).tier;T("[data-rule-tier]").forEach(t=>{const r=Number(t.dataset.ruleTier)===e;t.classList.toggle("is-active",r);const l=t.querySelector("[data-rule-current]");l&&(l.hidden=!r)})},C=()=>{te(),ae(),oe(),re(),le(),ie(),se(),a("[data-contract-status]",n).textContent=E(),a("[data-last-action]",n).textContent=Y[o.award]};C()}
