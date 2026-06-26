import{M as H,A as W,t as O,c as z}from"./esa-chip-group.DC6Bluok.js";import"./esa-side-dialog.5lXNVt6w.js";import"./lit-element.CbK1SoNn.js";H.registerModules([W]);const Q=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),A=o=>o.replace(/([()\\])/g,"\\$1");function G(o,r){const l=`BT /F1 18 Tf 60 740 Td (${A(o)}) Tj /F1 11 Tf 0 -26 Td (${A(r)}) Tj 0 -18 Td (Columbia Basin Fish & Wildlife Program — prototype placeholder) Tj ET`,t=["<</Type/Catalog/Pages 2 0 R>>","<</Type/Pages/Kids[3 0 R]/Count 1>>","<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>",`<</Length ${l.length}>>
stream
${l}
endstream`,"<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>"];let c=`%PDF-1.4
`;const u=[];t.forEach((p,h)=>{u.push(c.length),c+=`${h+1} 0 obj
${p}
endobj
`});const b=c.length;return c+=`xref
0 ${t.length+1}
0000000000 65535 f 
`,u.forEach(p=>{c+=`${String(p).padStart(10,"0")} 00000 n 
`}),c+=`trailer
<</Size ${t.length+1}/Root 1 0 R>>
startxref
${b}
%%EOF`,new Blob([c],{type:"application/pdf"})}function k(o,r){const l=URL.createObjectURL(G(o,`Attachment for invoice ${r}`)),t=document.createElement("a");t.href=l,t.download=o,document.body.appendChild(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(l),1e3)}const N=["Submitted","In review","Approved","Paid"];function J(o){switch(o.stage){case"Submitted":return{text:"Awaiting BPA review",alert:!1};case"In review":return{text:"Under review by BPA",alert:!1};case"Approved":return{text:"Approved — scheduled for payment",alert:!1};case"Paid":return{text:o.paidDate?`Paid on ${o.paidDate}`:"Paid",alert:!1};case"Needs revision":return{text:"Needs revision — action required",alert:!0};default:return{text:"",alert:!1}}}const K=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}),V=o=>{if(!o)return null;const r=new Date(o);return Number.isNaN(r.getTime())?null:r},Y=O.withParams({fontFamily:"inherit",fontSize:"14px",foregroundColor:"var(--color-text-primary)",backgroundColor:"var(--color-surface)",headerBackgroundColor:"var(--color-surface-sunken, transparent)",headerTextColor:"var(--color-text-secondary)",headerFontWeight:600,borderColor:"var(--color-border)",rowHoverColor:"var(--color-surface-subtle, var(--color-primary-subtle))",accentColor:"var(--color-primary)",wrapperBorderRadius:0,borderRadius:"var(--radius-100, 4px)"});function X(o){const r=o.querySelector("[data-invoice-grid]"),l=o.querySelector("[data-invoice-data]");if(!r||!l)return;const t=JSON.parse(l.textContent??"[]"),c=t.length,u=o.querySelector("[data-invoice-search]"),b=o.querySelector("[data-invoice-stage-filter]"),p=o.querySelector("[data-invoice-group]"),h=o.querySelector("[data-invoice-empty]"),v=o.querySelector("[data-invoice-count]"),g=new Map;o.querySelectorAll("[data-badge-templates] [data-stage]").forEach(a=>{g.set(a.dataset.stage??"",a.innerHTML)});let y="",S=()=>{};const f=z(r,{theme:Y,rowData:t,domLayout:"autoHeight",animateRows:!1,suppressCellFocus:!0,defaultColDef:{sortable:!0,resizable:!0,suppressHeaderMenuButton:!0},columnDefs:[{headerName:"Invoice #",field:"number",colId:"number",cellClass:"cbf-grid-id",minWidth:150,getQuickFilterText:a=>`${a.data.number} ${a.data.project}`},{headerName:"Contract",field:"contract",colId:"contract",flex:2,minWidth:200},{headerName:"Submitted",field:"submitted",colId:"submitted",minWidth:130,cellDataType:"date",valueGetter:a=>V(a.data?.submitted),valueFormatter:a=>a.value instanceof Date?K.format(a.value):"",getQuickFilterText:a=>a.data?.submitted??""},{headerName:"Amount",field:"amount",colId:"amount",type:"numericColumn",headerClass:"cbf-grid-num",cellClass:"cbf-grid-num",minWidth:130,valueFormatter:a=>Q.format(a.value)},{headerName:"Status",field:"stage",colId:"stage",minWidth:150,sortable:!0,cellRenderer:a=>`<span class="cbf-grid-status">${g.get(a.value)??a.value}</span>`}],isExternalFilterPresent:()=>y!=="",doesExternalFilterPass:a=>a.data.stage===y,onModelUpdated:()=>{const a=f.getDisplayedRowCount();v&&(v.textContent=`Showing ${a} of ${c} invoices`),h&&(h.hidden=a!==0),r.hidden=a===0},onRowClicked:a=>{a.data&&S(a.data)}});u?.addEventListener("input",()=>{f.setGridOption("quickFilterText",(u.value??"").trim())}),b?.addEventListener("change",()=>{y=b.value??"",f.onFilterChanged()}),p?.addEventListener("change",()=>{const a=p.value??"none";f.applyColumnState({state:a==="none"?[]:[{colId:a,sort:"asc"}],defaultState:{sort:null}})}),S=Z(o,f,g)}function Z(o,r,l){const t=o.querySelector("[data-invoice-dialog]"),c=t?.querySelector("[data-detail-status]")??null,u=t?.querySelector("[data-detail-state]")??null,b=t?.querySelector("[data-detail-pipeline]")??null,p=t?.querySelector("[data-detail-contract]")??null,h=t?.querySelector("[data-detail-project]")??null,v=t?.querySelector("[data-detail-invoice-date]")??null,g=t?.querySelector("[data-detail-perf]")??null,y=t?.querySelector("[data-detail-submitted]")??null,S=t?.querySelector("[data-detail-amount]")??null,f=t?.querySelector("[data-detail-doc]")??null,a=t?.querySelector("[data-detail-attachments]")??null,q=t?.querySelector("[data-detail-attach-title]")??null,M=t?.querySelector("[data-detail-dl-template] button")?.outerHTML??"",E=t?.querySelector("[data-detail-position]")??null;let x=[];const F=t?.querySelector("[data-detail-prev]")??null,P=t?.querySelector("[data-detail-next]")??null,w=F?.querySelector("button")??null,L=P?.querySelector("button")??null,C=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),j="Pacific Environmental Services, LLC",B="Environmental consulting · Portland, OR",U="Columbia Basin Fish & Wildlife Program",m=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),D=()=>{const e=[];return r.forEachNodeAfterFilterAndSort(i=>{i.data&&e.push(i.data)}),e};let _=-1;const I=e=>{if(!t)return;const i=D();if(_=i.findIndex(n=>n.number===e.number),t.heading=e.number??"Invoice",c&&(c.innerHTML=`<span class="cbf-grid-status">${l.get(e.stage)??e.stage}</span>`),p&&(p.textContent=e.contract??""),h&&(h.textContent=e.project??""),v&&(v.textContent=e.invoiceDate??""),g&&(g.textContent=e.perfStart&&e.perfEnd?`${e.perfStart} – ${e.perfEnd}`:""),y&&(y.textContent=e.submitted??""),S&&(S.textContent=C.format(e.amount??0)),u){const n=J(e);u.textContent=n.text,u.classList.toggle("cbf-invoice-detail__state--alert",n.alert)}if(b){const n=e.stage==="Needs revision",d=n?1:N.indexOf(e.stage);b.innerHTML=N.map((s,T)=>{let $;return n&&T===1?$="returned":T<d?$="done":T===d?$="active":$="todo",`<li class="cbf-invoice-pipeline__step" data-state="${$}">
            <span class="cbf-invoice-pipeline__dot"></span>
            <span class="cbf-invoice-pipeline__label">${s}</span>
          </li>`}).join("")}if(x=[e.pdfName,...e.supportingDocs??[]],q&&(q.textContent=`Attachments (${x.length})`),a&&(a.innerHTML=x.map((n,d)=>`<li class="cbf-invoice-attach" data-primary="${d===0}">
            <span class="cbf-invoice-attach__name" title="${m(n)}">${m(n)}</span>
            ${d===0?'<span class="cbf-invoice-attach__role">Invoice</span>':""}
            <span class="cbf-invoice-attach__dl" data-attach-dl data-file="${m(n)}">${M}</span>
          </li>`).join(""),a.querySelectorAll("[data-attach-dl]").forEach(n=>{const d=n.dataset.file??"",s=n.querySelector("button");s&&(s.setAttribute("aria-label",`Download ${d}`),s.setAttribute("title",`Download ${d}`))})),f){const n=(e.lineItems??[]).map(s=>`<tr>
              <td>${m(s.description)}</td>
              <td class="cbf-num">${s.qty}</td>
              <td class="cbf-num">${C.format(s.unitPrice)}</td>
              <td class="cbf-num">${C.format(s.qty*s.unitPrice)}</td>
            </tr>`).join(""),d=e.perfStart&&e.perfEnd?`${e.perfStart} – ${e.perfEnd}`:"—";f.innerHTML=`
          <header class="cbf-doc__head">
            <div class="cbf-doc__brand">
              <p class="cbf-doc__supplier">${j}</p>
              <p class="cbf-doc__supplier-meta">${B}</p>
            </div>
            <div class="cbf-doc__mark">
              <p class="cbf-doc__mark-word">Invoice</p>
              <p class="cbf-doc__mark-number">${m(e.number??"")}</p>
            </div>
          </header>
          <div class="cbf-doc__parties">
            <div class="cbf-doc__party">
              <span class="cbf-doc__label">Billed to</span>
              <p class="cbf-doc__party-name">${U}</p>
            </div>
            <div class="cbf-doc__dates">
              <div>
                <span class="cbf-doc__label">Invoice date</span>
                <p>${m(e.invoiceDate??"—")}</p>
              </div>
              <div>
                <span class="cbf-doc__label">Performance period</span>
                <p>${m(d)}</p>
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
            <tbody>${n}</tbody>
          </table>
          <div class="cbf-doc__total">
            <span class="cbf-doc__total-label">Total due</span>
            <span class="cbf-doc__total-value">${C.format(e.amount??0)}</span>
          </div>
          ${e.notes?`<div class="cbf-doc__notes">
                   <span class="cbf-doc__label">Notes</span>
                   <p>${m(e.notes)}</p>
                 </div>`:""}
        `}E&&(E.textContent=`Invoice ${_+1} of ${i.length}`),w&&(w.disabled=_<=0),L&&(L.disabled=_>=i.length-1)},R=e=>{const n=D()[_+e];n&&I(n)};return F?.addEventListener("click",()=>R(-1)),P?.addEventListener("click",()=>R(1)),a?.addEventListener("click",e=>{const n=e.target?.closest("[data-attach-dl]")?.dataset.file;n&&k(n,t?.heading??"")}),t?.querySelector("[data-detail-download-all]")?.addEventListener("click",()=>{x.forEach((e,i)=>setTimeout(()=>k(e,t?.heading??""),i*250))}),e=>{I(e),t?.show()}}document.querySelectorAll(".cbf-vendor-dashboard-invoices").forEach(X);
