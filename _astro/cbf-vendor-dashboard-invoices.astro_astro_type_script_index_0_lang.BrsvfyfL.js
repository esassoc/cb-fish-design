import{M as oe,A as ce,t as se,c as ie}from"./esa-chip-group.DOnIm-Wx.js";import"./esa-button-toggle.CImVxTxI.js";import"./esa-side-dialog.dYSTc6GU.js";import"./lit-element.C8p3bJxG.js";oe.registerModules([ce]);const le=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),X=n=>n.replace(/([()\\])/g,"\\$1");function de(n,m){const S=`BT /F1 18 Tf 60 740 Td (${X(n)}) Tj /F1 11 Tf 0 -26 Td (${X(m)}) Tj 0 -18 Td (Columbia Basin Fish & Wildlife Program — prototype placeholder) Tj ET`,t=["<</Type/Catalog/Pages 2 0 R>>","<</Type/Pages/Kids[3 0 R]/Count 1>>","<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>",`<</Length ${S.length}>>
stream
${S}
endstream`,"<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>"];let b=`%PDF-1.4
`;const _=[];t.forEach((E,C)=>{_.push(b.length),b+=`${C+1} 0 obj
${E}
endobj
`});const $=b.length;return b+=`xref
0 ${t.length+1}
0000000000 65535 f 
`,_.forEach(E=>{b+=`${String(E).padStart(10,"0")} 00000 n 
`}),b+=`trailer
<</Size ${t.length+1}/Root 1 0 R>>
startxref
${$}
%%EOF`,new Blob([b],{type:"application/pdf"})}function ee(n,m){const S=URL.createObjectURL(de(n,`Attachment for invoice ${m}`)),t=document.createElement("a");t.href=S,t.download=n,document.body.appendChild(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(S),1e3)}const te=["In review","Paid"];function ue(n){switch(n.stage){case"Draft":return{text:n.lastEdited?`Draft · last edited ${n.lastEdited}`:"Draft — not yet submitted",alert:!1};case"In review":return{text:"Under review by BPA",alert:!1};case"Paid":return{text:n.paidDate?`Paid on ${n.paidDate}`:"Paid",alert:!1};case"Needs revision":return{text:"Needs revision — action required",alert:!0};default:return{text:"",alert:!1}}}const fe=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}),pe=n=>{if(!n)return null;const m=new Date(n);return Number.isNaN(m.getTime())?null:m},me=se.withParams({fontFamily:"inherit",fontSize:"14px",foregroundColor:"var(--color-text-primary)",backgroundColor:"var(--color-surface)",headerBackgroundColor:"var(--color-surface-sunken, transparent)",headerTextColor:"var(--color-text-secondary)",headerFontWeight:600,borderColor:"var(--color-border)",rowHoverColor:"var(--color-surface-subtle, var(--color-primary-subtle))",accentColor:"var(--color-primary)",wrapperBorderRadius:0,borderRadius:"var(--radius-100, 4px)"});function be(n){const m=n.querySelector("[data-invoice-grid]"),S=n.querySelector("[data-invoice-data]");if(!m||!S)return;const t=JSON.parse(S.textContent??"[]"),b=t.length,_=new Map(t.map(a=>[a.number,a])),$=n.querySelector("[data-invoice-search]"),E=n.querySelector("[data-invoice-stage-filter]"),C=n.querySelector("[data-invoice-group]"),F=n.querySelector("[data-invoice-view]"),v=n.querySelector("[data-invoice-cards]"),A=n.querySelector("[data-invoice-empty]"),B=n.querySelector("[data-invoice-count]"),q=new Map;v?.querySelectorAll("[data-card]").forEach(a=>{q.set(a.dataset.card??"",a)});let w=F?.value||"grid",T=C?.value??"none";const I=new Map;n.querySelectorAll("[data-badge-templates] [data-stage]").forEach(a=>{I.set(a.dataset.stage??"",a.innerHTML)});let N="",D=()=>{};const u=ie(m,{theme:me,rowData:t,domLayout:"autoHeight",animateRows:!1,suppressCellFocus:!0,defaultColDef:{sortable:!0,resizable:!0,suppressHeaderMenuButton:!0},columnDefs:[{headerName:"Invoice #",field:"number",colId:"number",cellClass:"cbf-grid-id",minWidth:150,getQuickFilterText:a=>`${a.data.number} ${a.data.contractNumber} ${a.data.projectNumber} ${a.data.project}`},{headerName:"Contract #",field:"contractNumber",colId:"contractNumber",cellClass:"cbf-grid-id",minWidth:120,maxWidth:140},{headerName:"Contract",field:"contract",colId:"contract",flex:2,minWidth:200},{headerName:"Project #",field:"projectNumber",colId:"projectNumber",cellClass:"cbf-grid-id",minWidth:120,maxWidth:140},{headerName:"Invoice date",field:"invoiceDate",colId:"invoiceDate",minWidth:130,cellDataType:"date",valueGetter:a=>pe(a.data?.invoiceDate),valueFormatter:a=>a.value instanceof Date?fe.format(a.value):"",getQuickFilterText:a=>a.data?.invoiceDate??""},{headerName:"Amount",field:"amount",colId:"amount",type:"numericColumn",headerClass:"cbf-grid-num",cellClass:"cbf-grid-num",minWidth:130,valueFormatter:a=>le.format(a.value)},{headerName:"Status",field:"stage",colId:"stage",minWidth:150,sortable:!0,cellRenderer:a=>`<span class="cbf-grid-status">${I.get(a.value)??a.value}</span>`}],isExternalFilterPresent:()=>N!=="",doesExternalFilterPass:a=>a.data.stage===N,onModelUpdated:()=>P(),onRowClicked:a=>{a.data&&D(a.data)}}),H=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),R=a=>T==="project"?a.project:a.contract,W=(a,f)=>{const p=document.createElement("div");p.className="cbf-invoice-group-header",p.setAttribute("data-card-group-header",""),p.innerHTML='<span class="cbf-invoice-group-header__label"></span><span class="cbf-invoice-group-header__meta"></span>',p.querySelector(".cbf-invoice-group-header__label").textContent=a;const g=f.count===1?"invoice":"invoices";return p.querySelector(".cbf-invoice-group-header__meta").textContent=`${f.count} ${g} · ${H.format(f.sum)}`,p};function P(){v?.querySelectorAll("[data-card-group-header]").forEach(l=>l.remove());const a=[];u.forEachNodeAfterFilterAndSort(l=>{l.data&&a.push(l.data.number)});const f=a.length;if(B&&(B.textContent=`Showing ${f} of ${b} invoices`),A&&(A.hidden=f!==0),m.hidden=w!=="grid"||f===0,v&&(v.hidden=w!=="cards"||f===0),w!=="cards"||!v)return;const p=new Set(a);if(a.forEach(l=>{const o=q.get(l);o&&(o.hidden=!1,v.appendChild(o))}),q.forEach((l,o)=>{p.has(o)||(l.hidden=!0)}),T==="none")return;const g=new Map;a.forEach(l=>{const o=_.get(l);if(!o)return;const x=R(o),c=g.get(x)??{count:0,sum:0};c.count+=1,c.sum+=o.amount,g.set(x,c)});let M=null;a.forEach(l=>{const o=_.get(l),x=q.get(l);if(!o||!x)return;const c=R(o);c!==M&&(v.insertBefore(W(c,g.get(c)),x),M=c)})}$?.addEventListener("input",()=>{u.setGridOption("quickFilterText",($.value??"").trim())}),E?.addEventListener("change",()=>{N=E.value??"",u.onFilterChanged()}),C?.addEventListener("change",()=>{T=C.value??"none",u.applyColumnState({state:T==="none"?[]:[{colId:T,sort:"asc"}],defaultState:{sort:null}})}),F?.addEventListener("change",()=>{w=F.value||"grid",P()}),v?.addEventListener("click",a=>{const f=a.target;if(f.closest("[data-ref-link]")){a.preventDefault();return}const p=f.closest("[data-card]"),g=p&&_.get(p.dataset.card??"");g&&D(g)}),D=he(n,u,I),P()}function he(n,m,S){const t=n.querySelector("[data-invoice-dialog]"),b=t?.querySelector("[data-detail-status]")??null,_=t?.querySelector("[data-detail-state]")??null,$=t?.querySelector("[data-detail-pipeline]")??null,E=t?.querySelector("[data-detail-contract]")??null,C=t?.querySelector("[data-detail-project]")??null,F=t?.querySelector("[data-detail-invoice-date]")??null,v=t?.querySelector("[data-detail-perf]")??null,A=t?.querySelector("[data-detail-amount]")??null,B=t?.querySelector("[data-detail-doc]")??null,q=t?.querySelector("[data-detail-attachments]")??null,w=t?.querySelector("[data-detail-attach-title]")??null,T=t?.querySelector("[data-detail-dl-template] button")?.outerHTML??"",I=t?.querySelector("[data-detail-position]")??null,N=t?.querySelector("[data-detail-add-docs]")??null,D=t?.querySelector("[data-detail-docs-input]")??null,u=t?.querySelector("[data-detail-docs-zone]")??null,H=t?.querySelector("[data-detail-vendor]")??null,R=t?.querySelector("[data-detail-vendor-actions]")??null,W=t?.querySelector("[data-detail-continue]")??null,P=t?.querySelector("[data-detail-continue] .esa-button__label")??null,a=t?.querySelector("[data-detail-discard]")??null,f=t?.querySelector(".cbf-invoice-detail__attach")??null,p=t?.querySelector(".cbf-invoice-detail__add-hint")??null,g=t?.querySelector("[data-detail-revision]")??null,M=t?.querySelector("[data-detail-revision-note]")??null,l=t?.querySelector("[data-detail-revision-by]")??null;let o=[];const x=new Map;let c=null;const O=t?.querySelector("[data-detail-prev]")??null,G=t?.querySelector("[data-detail-next]")??null,z=O?.querySelector("button")??null,Q=G?.querySelector("button")??null,U=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),ae="Pacific Environmental Services, LLC",ne="Environmental consulting · Portland, OR",re="Columbia Basin Fish & Wildlife Program",L=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),V=()=>{const e=[];return m.forEachNodeAfterFilterAndSort(i=>{i.data&&e.push(i.data)}),e};let j=-1;const K=e=>{const i=[e.pdfName,...e.supportingDocs??[]].filter(Boolean),d=x.get(e.number)??[];o=[...i,...d],f&&(f.hidden=o.length===0),w&&(w.textContent=`Attachments (${o.length})`),q&&(q.innerHTML=o.map((s,r)=>{const h=r===0?"Invoice":r>=i.length?"Added":"";return`<li class="cbf-invoice-attach" data-primary="${r===0}">
            <span class="cbf-invoice-attach__name" title="${L(s)}">${L(s)}</span>
            ${h?`<span class="cbf-invoice-attach__role">${h}</span>`:""}
            <span class="cbf-invoice-attach__dl" data-attach-dl data-file="${L(s)}">${T}</span>
          </li>`}).join(""),q.querySelectorAll("[data-attach-dl]").forEach(s=>{const r=s.dataset.file??"",h=s.querySelector("button");h&&(h.setAttribute("aria-label",`Download ${r}`),h.setAttribute("title",`Download ${r}`))}))},J=e=>{if(!c||!e.length)return;const i=new Set(o),d=e.filter(r=>r&&!i.has(r));if(!d.length)return;const s=x.get(c.number)??[];s.push(...d),x.set(c.number,s),K(c)},Y=e=>{if(!t)return;const i=V();j=i.findIndex(r=>r.number===e.number);const d=e.stage==="Draft",s=e.stage==="Needs revision";if(t.heading=e.number??"Invoice",b&&(b.innerHTML=`<span class="cbf-grid-status">${S.get(e.stage)??e.stage}</span>`),E&&(E.textContent=e.contract??""),C&&(C.textContent=e.project??""),F&&(F.textContent=e.invoiceDate??""),v&&(v.textContent=e.perfStart&&e.perfEnd?`${e.perfStart} – ${e.perfEnd}`:""),A&&(A.textContent=e.stage==="Draft"&&!e.amount?"—":U.format(e.amount??0)),_){const r=ue(e);_.textContent=r.text,_.classList.toggle("cbf-invoice-detail__state--alert",r.alert)}if($&&d){const r=["Draft","In review","Paid"];$.innerHTML=r.map((h,y)=>`<li class="cbf-invoice-pipeline__step" data-state="${y===0?"active":"todo"}">
            <span class="cbf-invoice-pipeline__dot"></span>
            <span class="cbf-invoice-pipeline__label">${h}</span>
          </li>`).join("")}else if($){const r=s?0:te.indexOf(e.stage);$.innerHTML=te.map((h,y)=>{let k;return s&&y===0?k="returned":y<r?k="done":y===r?k="active":k="todo",`<li class="cbf-invoice-pipeline__step" data-state="${k}">
            <span class="cbf-invoice-pipeline__dot"></span>
            <span class="cbf-invoice-pipeline__label">${h}</span>
          </li>`}).join("")}if(c=e,K(e),N&&(N.hidden=!(e.stage==="In review"||s)),p&&(p.textContent=s?"Attach the documentation your contract officer asked for, then use Edit & resubmit to send it back.":"Provide additional documentation your contract officer requested — no need to change this invoice’s status."),H&&(H.hidden=!(d||s)),R&&(R.hidden=!(d||s)),P&&(P.textContent=d?"Continue editing":"Edit & resubmit"),a&&(a.hidden=!d),g&&(g.hidden=!s),s&&(M&&(M.textContent=e.revisionNote??"This invoice needs changes before it can be approved."),l&&(l.textContent=e.returnedBy?`— ${e.returnedBy}${e.returnedOn?` · ${e.returnedOn}`:""}`:"")),B){const r=(e.lineItems??[]).map(y=>`<tr>
              <td>${L(y.description)}</td>
              <td class="cbf-num">${y.qty}</td>
              <td class="cbf-num">${U.format(y.unitPrice)}</td>
              <td class="cbf-num">${U.format(y.qty*y.unitPrice)}</td>
            </tr>`).join(""),h=e.perfStart&&e.perfEnd?`${e.perfStart} – ${e.perfEnd}`:"—";B.innerHTML=`
          <header class="cbf-doc__head">
            <div class="cbf-doc__brand">
              <p class="cbf-doc__supplier">${ae}</p>
              <p class="cbf-doc__supplier-meta">${ne}</p>
            </div>
            <div class="cbf-doc__mark">
              <p class="cbf-doc__mark-word">Invoice</p>
              <p class="cbf-doc__mark-number">${L(e.number??"")}</p>
            </div>
          </header>
          <div class="cbf-doc__parties">
            <div class="cbf-doc__party">
              <span class="cbf-doc__label">Billed to</span>
              <p class="cbf-doc__party-name">${re}</p>
            </div>
            <div class="cbf-doc__dates">
              <div>
                <span class="cbf-doc__label">Invoice date</span>
                <p>${L(e.invoiceDate??"—")}</p>
              </div>
              <div>
                <span class="cbf-doc__label">Performance period</span>
                <p>${L(h)}</p>
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
            <tbody>${r}</tbody>
          </table>
          <div class="cbf-doc__total">
            <span class="cbf-doc__total-label">Total due</span>
            <span class="cbf-doc__total-value">${U.format(e.amount??0)}</span>
          </div>
          ${e.notes?`<div class="cbf-doc__notes">
                   <span class="cbf-doc__label">Notes</span>
                   <p>${L(e.notes)}</p>
                 </div>`:""}
        `}I&&(I.textContent=`Invoice ${j+1} of ${i.length}`),z&&(z.disabled=j<=0),Q&&(Q.disabled=j>=i.length-1)},Z=e=>{const d=V()[j+e];d&&Y(d)};return O?.addEventListener("click",()=>Z(-1)),G?.addEventListener("click",()=>Z(1)),q?.addEventListener("click",e=>{const d=e.target?.closest("[data-attach-dl]")?.dataset.file;d&&ee(d,t?.heading??"")}),t?.querySelector("[data-detail-download-all]")?.addEventListener("click",()=>{o.forEach((e,i)=>setTimeout(()=>ee(e,t?.heading??""),i*250))}),u?.addEventListener("click",()=>D?.click()),D?.addEventListener("change",()=>{J(Array.from(D.files??[]).map(e=>e.name)),D.value=""}),u?.addEventListener("dragover",e=>{e.preventDefault(),u.classList.add("is-over")}),u?.addEventListener("dragleave",e=>{u.contains(e.relatedTarget)||u.classList.remove("is-over")}),u?.addEventListener("drop",e=>{e.preventDefault(),u.classList.remove("is-over"),J(Array.from(e.dataTransfer?.files??[]).map(i=>i.name))}),W?.addEventListener("click",()=>{if(!c)return;const e="/cb-fish-design/";window.location.href=`${e}vendor-invoice?invoice=${encodeURIComponent(c.number)}`}),a?.addEventListener("click",()=>{if(!c||!window.confirm(`Discard draft ${c.number}? This can’t be undone.`))return;const e=c;m.applyTransaction({remove:[e]}),n.querySelector(`[data-card="${e.number}"]`)?.remove(),t?.close?.()}),e=>{Y(e),t?.show()}}document.querySelectorAll(".cbf-vendor-dashboard-invoices").forEach(be);
