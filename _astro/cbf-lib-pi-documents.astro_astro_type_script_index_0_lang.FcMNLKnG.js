import"./esa-tab-layout.9Zx3GJMW.js";import{i as pe,b as v,a as ue}from"./lit-element.C8p3bJxG.js";import"./esa-dialog.ClC7BfLJ.js";import"./esa-select.HUpJg4S3.js";import"./esa-text-field.astro_astro_type_script_index_0_lang.Bh9QjbpR.js";import"./esa-textarea.astro_astro_type_script_index_0_lang.f3qIukGs.js";import"./esa-file-upload.D2g8Oy4i.js";import"./esa-button-toggle.CImVxTxI.js";class me extends pe{constructor(){super(),this.toggle=()=>{this.open?this.close():this.openMenu()},this.onDocumentClick=o=>{!this.contains(o.target)&&o.target!==this&&this.close()},this.onKeydown=o=>{o.key==="Escape"&&this.open&&(o.preventDefault(),this.close())},this.items=[],this.position="below-start",this.width="auto",this.open=!1}static{this.properties={items:{type:Array},position:{type:String,reflect:!0},width:{type:String,reflect:!0},open:{type:Boolean,reflect:!0}}}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocumentClick,!0)}openMenu(){this.open=!0,document.addEventListener("click",this.onDocumentClick,!0)}close(){this.open&&(this.open=!1,document.removeEventListener("click",this.onDocumentClick,!0))}selectItem(o){o.disabled||(o.action&&this.dispatchEvent(new CustomEvent("menu-action",{detail:o.action,bubbles:!0,composed:!0})),this.close())}render(){return v`
      <div class="esa-dropdown" @keydown=${this.onKeydown}>
        <div class="esa-dropdown__trigger" @click=${this.toggle}>
          <slot></slot>
        </div>
        ${this.open?v`
              <div class="esa-dropdown-menu__panel esa-dropdown-menu__panel--${this.position}" role="menu">
                ${this.items.map(o=>o.divider?v`<div class="esa-dropdown-menu__divider" role="separator"></div>`:v`
                        <button
                          class="esa-dropdown-menu__item ${o.variant==="danger"?"esa-dropdown-menu__item--danger":""} ${o.disabled?"esa-dropdown-menu__item--disabled":""}"
                          ?disabled=${o.disabled}
                          role="menuitem"
                          @click=${()=>this.selectItem(o)}
                        >
                          ${o.icon?v`<span class="esa-dropdown-menu__bullet" aria-hidden="true"></span>`:null}
                          <span>${o.label}</span>
                        </button>
                      `)}
              </div>
            `:null}
      </div>
    `}static{this.styles=ue`
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
  `}}customElements.get("esa-dropdown-menu")||customElements.define("esa-dropdown-menu",me);const u={number:"84055 REL 11",action:"CR-365847",cor:"Jonathan Flannery"},he=[{value:"rev1",label:"1. 84055 REL 11 (05/01/2024 - 04/30/2026)"},{value:"rev2",label:"2. Amendment 001 (05/01/2024 - 04/30/2026)"}],fe=[{key:"summary",label:"Summary"},{key:"sow",label:"SOW"},{key:"we-budgets",label:"WE Budgets"},{key:"status-reports",label:"Status Reports"},{key:"pre-award",label:"Pre-Award"},{key:"workflow",label:"Workflow",panel:!0},{key:"review-sow",label:"Review SOW"},{key:"email-archive",label:"Email Archive",corOnly:!0},{key:"internal-notes",label:"Internal Notes",corOnly:!0},{key:"documents",label:"Documents",panel:!0},{key:"cor-file",label:"COR File",corOnly:!0}],N=n=>fe.filter(o=>n==="cm"?!o.corOnly:!0),P=[{value:"pending",label:"Pending",tier:1},{value:"review",label:"Review",tier:2},{value:"approved",label:"Approved",tier:2},{value:"signature",label:"Signature",tier:3},{value:"issued",label:"Issued",tier:3}],O=[{value:"cm",label:"Contract manager"},{value:"cor",label:"COR (COTR)"},{value:"qc",label:"QC"},{value:"bpa",label:"BPA writer / Approver / CO"},{value:"other",label:"Other user"}],we={cm:"Elizabeth Santana",cor:"Jonathan Flannery",qc:"David Kaplowe",bpa:"Shawn Young",other:"Virgil Watts III"},ye=["cor","qc","bpa"];function k(n,o,m){const p=P.find(d=>d.value===n),i=p?p.label:n;return p.tier===3?{allowed:!1,tier:3,reason:`The award is in ${i} — documents are locked. This is the existing behavior, unchanged: no file may be edited or replaced until a new revision opens.`}:m==="other"?{allowed:!0,tier:0,reason:"Standard document — existing edit rules apply."}:p.tier===1?{allowed:!0,tier:1,reason:"The SOW is Pending, so any user may replace this file from the context menu. All document specifications — type, title, authors, and sharing — are kept."}:ye.includes(o)?{allowed:!0,tier:2,reason:`The award is in ${i} — as ${O.find(d=>d.value===o).label}, you may still edit LIB and Property Inventory documents.`}:{allowed:!1,tier:2,reason:`The award is in ${i} — only BPA writers, the COR, the Approver, the CO, or QC may edit LIB and Property Inventory documents now.`}}const ve='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',W=[{key:"ec",label:"EC"},{key:"cotr",label:"COTR"},{key:"qc",label:"QC"},{key:"fw",label:"F&W Approver"}],be=[{id:"lib-budget",kind:"lib",title:"CR-365847 1 Budget",file:"CR-365847 1 Budget.xlsx",size:"137.4 KB",type:"Line Item Budget",subtype:"Contract Budget",uploaded:"3/19/2024 11:00 AM",uploadedBy:"Miriam Ashe",originalUpload:"3/15/2024 7:59 AM",originalUploadedBy:"Virgil Watts III",lastUpload:"3/19/2024 11:00 AM",lastUploadedBy:"Miriam Ashe",docId:"P207879",primaryAuthor:"Shawn Young",otherAuthors:"Watts",viewPermission:"Contacts Only",guidance:"A BPA contracting requirement that breaks down the Primary contractor's budget into individual line items. Used to justify the contract amount. May include subcontractor budgets. Max File Size: 5 MB, File Types Allowed: XLS, DOC, PDF, XLSX, DOCX. Other Restrictions: Limited to 5 per SOW revision.",workflowRow:"Line Item Budget",approvals:{ec:null,cotr:"5/22/2025",qc:"5/19/2025",fw:null}},{id:"pi-inventory",kind:"pi",title:"Property Inventory Contract 84055 REL11 (CCR52535)",file:"2002-002-00_Inventory_84055 REL11_CCR52535.xlsx",size:"19.1 KB",type:"Property Inventory",subtype:null,uploaded:"5/15/2025 3:20 PM",uploadedBy:"Brandon Cole",originalUpload:"5/15/2025 3:20 PM",originalUploadedBy:"Brandon Cole",lastUpload:"5/15/2025 3:20 PM",lastUploadedBy:"Brandon Cole",docId:"P21244",primaryAuthor:"Brandon Cole",otherAuthors:"",viewPermission:"Contacts Only",guidance:"An inventory of government-furnished and contractor-acquired property held under the contract. Required when property is transferred, disposed of, or reported annually. Max File Size: 5 MB, File Types Allowed: XLS, XLSX, PDF.",workflowRow:"Property Inventory",approvals:{ec:null,cotr:null,qc:null,fw:null}},{id:"lib-transfer",kind:"lib",title:"Line Item Budget Transfer",file:"Line Item Transfer 84055 REL 11 MOD Budget_09SEP2025.xlsx",size:"164.9 KB",type:"Line Item Budget",subtype:"Contract Budget",uploaded:"9/9/2025 2:48 PM",uploadedBy:"Elizabeth Santana",originalUpload:"9/9/2025 2:48 PM",originalUploadedBy:"Elizabeth Santana",lastUpload:"9/9/2025 2:48 PM",lastUploadedBy:"Elizabeth Santana",docId:"P219301",primaryAuthor:"Elizabeth Santana",otherAuthors:"",viewPermission:"Contacts Only",guidance:"A BPA contracting requirement that breaks down the Primary contractor's budget into individual line items. Used to justify the contract amount. May include subcontractor budgets. Max File Size: 5 MB, File Types Allowed: XLS, DOC, PDF, XLSX, DOCX. Other Restrictions: Limited to 5 per SOW revision.",workflowRow:null,approvals:{ec:null,cotr:null,qc:null,fw:null}},{id:"transmittal",kind:"other",title:"Transmittal Memo CR-365847",file:"Transmittal Memo CR-365847.docx",size:"48.2 KB",type:"Transmittal Memo",subtype:null,uploaded:"7/30/2025 4:07 PM",uploadedBy:"Jonathan Flannery",originalUpload:"7/30/2025 4:07 PM",originalUploadedBy:"Jonathan Flannery",lastUpload:"7/30/2025 4:07 PM",lastUploadedBy:"Jonathan Flannery",docId:"P215870",primaryAuthor:"Jonathan Flannery",otherAuthors:"",viewPermission:"Contacts Only",guidance:"The transmittal memo routed with the award package.",workflowRow:"Transmittal Memo",approvals:{ec:null,cotr:"7/30/2025",qc:"7/30/2025",fw:"8/6/2025"}}],ge=[{date:"08/15/2025 3:02 AM",step:"IssuedInAssetSuite",from:"System Account",to:"",docStatus:""},{date:"08/01/2025 3:02 AM",step:"ApprovedInAssetSuite",from:"System Account",to:"",docStatus:""},{date:"07/30/2025 4:07 PM",step:"SubmitToApprover",from:"Jonathan Flannery",to:"David Kaplowe; Elizabeth Santana; Jonathan Flannery",docStatus:`Transmittal Memo - Attached - COTR Approval = Green
Line Item Budget - Attached - COTR Approval = Green
Property Inventory - Attached - COTR Approval = NotSet`}],X=document.querySelector("[data-lipd]");X&&Ce(X);function Ce(n){const o={award:"pending",role:"cm"},m=be.map(e=>({...e,approvals:{...e.approvals},resetInfo:null})),p=[...ge];let i=null,d=null,b=!1;const a=(e,t=document)=>t.querySelector(e),K=(e,t=document)=>Array.from(t.querySelectorAll(e)),j=e=>m.find(t=>t.id===e),x=()=>O.find(e=>e.value===o.role).label,A=()=>P.find(e=>e.value===o.award).label,S=()=>we[o.role],H=e=>{const t=document.querySelector("[data-omni-user]");if(!t||t.classList.contains("is-impersonating"))return;const r=Array.from(t.childNodes).find(l=>l.nodeType===Node.TEXT_NODE&&l.textContent.trim().length>0);r?r.textContent=` ${e} `:t.insertBefore(document.createTextNode(` ${e} `),t.lastElementChild)},h=e=>{const t=a("[data-snackbar]");(t?.info??t?.success)?.call(t,e,{duration:4e3})},J=()=>{const e=new Date;let t=e.getHours();const r=t>=12?"PM":"AM";t=t%12||12;const l=String(e.getMinutes()).padStart(2,"0");return`${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()} ${t}:${l} ${r}`},Y=()=>{const e=new Date;return`${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()}`},T=e=>`<span class="cbf-check">${ve} ${e}</span>`,w=a("[data-demo-award]"),y=a("[data-demo-role]");w&&(w.options=P.map(e=>({label:e.label,value:e.value})),w.value=o.award,w.addEventListener("change",()=>{o.award=w.value,g()})),y&&(y.options=O.map(e=>({label:e.label,value:e.value})),y.value=o.role,y.addEventListener("change",()=>{o.role=y.value,D(),g()}));const $=a("[data-lipd-tabs]",n),Q=a('[data-panel="documents"]',n),V=a('[data-panel="workflow"]',n);let M="documents";const D=()=>{const e=N(o.role);$.tabs=e.map(l=>({label:l.label,disabled:!l.panel}));const t=e.findIndex(l=>l.key==="documents"),r=e.findIndex(l=>l.key==="workflow");Q.setAttribute("slot",`panel-${t}`),V.setAttribute("slot",`panel-${r}`),$.activeIndex=e.findIndex(l=>l.key===M)};$.addEventListener("tabchange",e=>{const t=N(o.role)[e.detail.index];t?.panel&&(M=t.key)}),D();const E=a("[data-sow-rev]",n);E&&(E.options=he,E.value="rev2");const G={pending:"09/09/2025, DocumentAttached",review:"07/30/2025, SubmitToApprover",approved:"08/01/2025, ApprovedInAssetSuite",signature:"08/12/2025, SentForSignature",issued:"08/15/2025, IssuedInAssetSuite"},_=a("[data-edit-dialog]",n),U=a("[data-why-dialog]",n),q=a("[data-email-dialog]",n),F=a("[data-ed-save]",n),B=F.querySelector("button"),Z=a("[data-save-hint]",n),L=(e,t)=>{B.disabled=!e,F.querySelector(".esa-button")?.classList.toggle("esa-button--disabled",!e),Z.textContent=t},ee=()=>{const t=a("[data-ed-upload-slot]",n).firstElementChild,r=document.createElement("esa-file-upload");r.setAttribute("data-ed-upload",""),r.setAttribute("label","Replace the file"),r.setAttribute("accept",".xls,.xlsx,.doc,.docx,.pdf"),r.setAttribute("max-size-mb","5"),t.replaceWith(r)},te=e=>{i=e,d=null,b=!1,a("[data-ed-type]",n).textContent=e.type,a("[data-ed-subtype]",n).textContent=e.subtype||"—",a("[data-ed-guidance]",n).textContent=e.guidance,a("[data-ed-file]",n).textContent=e.file,a("[data-ed-size]",n).textContent=`(${e.size})`,a("[data-ed-title]",n).value=e.title,a("[data-ed-desc]",n).value="",a("[data-ed-author]",n).textContent=e.primaryAuthor,a("[data-ed-docid]",n).textContent=e.docId,a("[data-ed-perm]",n).textContent=e.viewPermission,a("[data-ed-orig]",n).textContent=e.originalUpload,a("[data-ed-origby]",n).textContent=e.originalUploadedBy,a("[data-ed-last]",n).textContent=e.lastUpload,a("[data-ed-lastby]",n).textContent=e.lastUploadedBy,a("[data-ed-newfile]",n).hidden=!0,a("[data-ed-warning]",n).hidden=!0,L(!1,"Nothing to save yet — replace the file or edit a property to enable Save."),_.show()};n.addEventListener("change",e=>{if(!e.target.closest?.("[data-ed-upload-slot]")||!i)return;const r=e.detail?.files??[];if(!r.length)return;const l=r[0];d={name:l.name,size:`${(l.size/1024).toFixed(1)} KB`};const s=a("[data-ed-newfile]",n);s.hidden=!1,s.textContent=`New file “${d.name}” will replace “${i.file}” when you save.`;const c=Object.values(i.approvals).some(Boolean),I=a("[data-ed-warning]",n);if(I.hidden=!c,c){const f=[];i.approvals.cotr&&f.push(`${u.cor} (COR) approved this document on ${i.approvals.cotr} — they will be notified by email and asked to re-approve.`);const R=W.filter(C=>C.key!=="cotr"&&i.approvals[C.key]);R.length&&f.push(`${R.map(C=>C.label).join(", ")} approval${R.length>1?"s":""} will also be cleared.`),o.role==="qc"&&f.push("Since you are QC, your own QC approval is re-applied to your edit automatically."),a("[data-ed-warning-text]",n).textContent=f.join(" ")}L(!0,"Ready to save — the file is replaced and every specification is kept.")}),_.addEventListener("input",e=>{i&&e.target.closest("[data-ed-title], [data-ed-desc]")&&(b=!0,d||L(!0,"Ready to save your property changes."))});const z=()=>{_.close(),i=null,d=null,b=!1,ee()};a("[data-ed-cancel]",n).querySelector("button").addEventListener("click",z),B.addEventListener("click",()=>{if(!i||B.disabled)return;const e=i,t=S(),r=J(),l=(a("[data-ed-title]",n).value||"").trim();if(l&&(e.title=l),d){const s=!!e.approvals.cotr,c=e.approvals.cotr,I=Object.values(e.approvals).some(Boolean);if(e.file=d.name,e.size=d.size,e.uploaded=r,e.uploadedBy=t,e.lastUpload=r,e.lastUploadedBy=t,e.approvals={ec:null,cotr:null,qc:o.role==="qc"?Y():null,fw:null},e.resetInfo=I?{by:t,at:r}:null,p.unshift({date:r,step:"DocumentReplaced",from:t,to:s?u.cor:"",docStatus:`${e.type} - Replaced by ${x()} - COTR Approval = NotSet`+(o.role==="qc"?"; QC Approval = Green (own edit)":"")}),s){const f={from:"donotreply@cbfish.org",to:`${u.cor} (COR)`,sent:r,subject:`Action required: ${e.type} replaced on Contract ${u.number} (${u.action})`,p1:`${t} (${x()}) replaced the file on “${e.title}” while the SOW was ${A()}. All document specifications were retained.`,p2:`Your approval of this document (given ${c}) no longer applies. Please review the new file and re-approve it on the contract's Workflow tab.`,meta:`Contract ${u.number} · ${u.action} · ${e.file}`,docTitle:e.title};oe(f)}else h(`File replaced — all specifications for “${e.title}” were retained.`)}else b&&h(`Properties of “${e.title}” saved.`);z(),g()}),a("[data-why-close]",n).querySelector("button").addEventListener("click",()=>U.close());const ae=a("[data-email-template]",n),ne=e=>{const t=ae.content.firstElementChild.cloneNode(!0),r=(l,s)=>{t.querySelector(l).textContent=s};return r("[data-em-from]",e.from),r("[data-em-to]",e.to),r("[data-em-sent]",e.sent),r("[data-em-subject]",e.subject),r("[data-em-p1]",e.p1),r("[data-em-p2]",e.p2),r("[data-em-meta]",e.meta),t},oe=e=>{a("[data-em-doc-title]",n).textContent=e.docTitle,a("[data-em-preview]",n).replaceChildren(ne(e)),q.show()};a("[data-em-close]",n).querySelector("button").addEventListener("click",()=>q.close()),n.addEventListener("menu-action",e=>{const t=e.target.closest("[data-doc-menu]");if(!t)return;const r=j(t.getAttribute("data-doc-menu"));if(r)switch(e.detail){case"view":h("Viewing documents is unchanged by this story — out of scope for the prototype.");break;case"copy":h("Attachment link copied (prototype).");break;case"delete":h("Deleting attachments is unchanged by this story — and no longer the only way to swap a file.");break;case"why":{const l=k(o.award,o.role,r.kind);a("[data-why-reason]",n).textContent=l.reason,U.show();break}case"edit":te(r);break}}),a("[data-add-doc]")?.querySelector("button")?.addEventListener("click",()=>h("Adding attachments is unchanged by this story — out of scope for the prototype."));const re=()=>{const e=k(o.award,o.role,"lib"),t=e.allowed?"allowed":e.tier===3?"locked":"restricted";K("[data-banner]",n).forEach(l=>{l.hidden=l.dataset.banner!==t});const r=a(`[data-banner="${t}"] [data-banner-text]`,n);r.textContent=`Acting as ${S()} (${x()}) · award state ${A()}. ${e.reason}`},le=()=>{m.forEach(e=>{const t=a(`[data-doc-menu="${e.id}"]`,n);if(!t)return;const r=k(o.award,o.role,e.kind),l=k(o.award,o.role,"other");t.items=[{label:"View Document",action:"view"},{label:"Edit Properties",action:"edit",disabled:!r.allowed},{label:"Delete Attachment",action:"delete",variant:"danger",disabled:!l.allowed},{label:"Copy Attachment Link",action:"copy"},...r.allowed?[]:[{divider:!0},{label:"Why is editing locked?",action:"why"}]]})},ie=e=>e.approvals.cotr?T(e.approvals.cotr):e.resetInfo?'<span class="cbf-reappr">Needs re-approval</span>':'<span class="cbf-none">–</span>',se=()=>{m.forEach(e=>{const t=a(`[data-doc-row="${e.id}"]`,n);t&&(a('[data-cell="title"]',t).textContent=e.title,a('[data-cell="file"]',t).textContent=e.file,a('[data-cell="size"]',t).textContent=e.size,a('[data-cell="uploaded"]',t).textContent=e.uploaded,a('[data-cell="uploadedBy"]',t).textContent=e.uploadedBy,a('[data-cell="cor"]',t).innerHTML=ie(e))})},de=()=>{m.forEach(e=>{if(!e.workflowRow)return;W.forEach(s=>{const c=a(`[data-appr="${e.id}:${s.key}"]`,n);c&&(c.innerHTML=e.approvals[s.key]?T(e.approvals[s.key]):'<span class="cbf-none">–</span>')});const t=a(`[data-appr-last="${e.id}"]`,n);t&&(t.textContent=e.lastUpload),a(`[data-appr-row="${e.id}"]`,n)?.classList.toggle("is-reset",!!e.resetInfo);const l=a(`[data-appr-flag="${e.id}"]`,n);l&&(l.hidden=!e.resetInfo)})},ce=()=>{a("[data-history]",n).replaceChildren(...p.map(t=>{const r=document.createElement("tr");return[t.date,t.step,t.from,t.to,t.docStatus].forEach((l,s)=>{const c=document.createElement("td");c.textContent=l,s===4&&(c.className="cbf-hist-table__status"),r.appendChild(c)}),t.step==="DocumentReplaced"&&r.classList.add("is-new"),r}))},g=()=>{re(),le(),se(),de(),ce(),H(S()),a("[data-contract-status]",n).textContent=A(),a("[data-last-action]",n).textContent=G[o.award]};g()}
