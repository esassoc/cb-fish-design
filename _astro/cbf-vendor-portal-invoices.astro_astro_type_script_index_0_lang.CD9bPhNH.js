import{M as I,A as w,t as L,c as P}from"./esa-chip-group.DC6Bluok.js";import"./esa-side-dialog.5lXNVt6w.js";import"./lit-element.CbK1SoNn.js";I.registerModules([w]);const T=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),k=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}),N=o=>{if(!o)return null;const r=new Date(o);return Number.isNaN(r.getTime())?null:r},M=L.withParams({fontFamily:"inherit",fontSize:"14px",foregroundColor:"var(--color-text-primary)",backgroundColor:"var(--color-surface)",headerBackgroundColor:"var(--color-surface-sunken, transparent)",headerTextColor:"var(--color-text-secondary)",headerFontWeight:600,borderColor:"var(--color-border)",rowHoverColor:"var(--color-surface-subtle, var(--color-primary-subtle))",accentColor:"var(--color-primary)",wrapperBorderRadius:0,borderRadius:"var(--radius-100, 4px)"});function A(o){const r=o.querySelector("[data-invoice-grid]"),y=o.querySelector("[data-invoice-data]");if(!r||!y)return;const a=JSON.parse(y.textContent??"[]"),S=a.length,i=o.querySelector("[data-invoice-search]"),u=o.querySelector("[data-invoice-stage-filter]"),m=o.querySelector("[data-invoice-group]"),p=o.querySelector("[data-invoice-empty]"),f=o.querySelector("[data-invoice-count]"),s=new Map;o.querySelectorAll("[data-badge-templates] [data-stage]").forEach(e=>{s.set(e.dataset.stage??"",e.innerHTML)});let l="",b=()=>{};const c=P(r,{theme:M,rowData:a,domLayout:"autoHeight",animateRows:!1,suppressCellFocus:!0,defaultColDef:{sortable:!0,resizable:!0,suppressHeaderMenuButton:!0},columnDefs:[{headerName:"Invoice #",field:"number",colId:"number",cellClass:"cbf-grid-id",minWidth:150,getQuickFilterText:e=>`${e.data.number} ${e.data.project}`},{headerName:"Contract",field:"contract",colId:"contract",flex:2,minWidth:200},{headerName:"Submitted",field:"submitted",colId:"submitted",minWidth:130,cellDataType:"date",valueGetter:e=>N(e.data?.submitted),valueFormatter:e=>e.value instanceof Date?k.format(e.value):"",getQuickFilterText:e=>e.data?.submitted??""},{headerName:"Amount",field:"amount",colId:"amount",type:"numericColumn",headerClass:"cbf-grid-num",cellClass:"cbf-grid-num",minWidth:130,valueFormatter:e=>T.format(e.value)},{headerName:"Status",field:"stage",colId:"stage",minWidth:150,sortable:!0,cellRenderer:e=>`<span class="cbf-grid-status">${s.get(e.value)??e.value}</span>`}],isExternalFilterPresent:()=>l!=="",doesExternalFilterPass:e=>e.data.stage===l,onModelUpdated:()=>{const e=c.getDisplayedRowCount();f&&(f.textContent=`Showing ${e} of ${S} invoices`),p&&(p.hidden=e!==0),r.hidden=e===0},onRowClicked:e=>{e.data&&b(e.data)}});i?.addEventListener("input",()=>{c.setGridOption("quickFilterText",(i.value??"").trim())}),u?.addEventListener("change",()=>{l=u.value??"",c.onFilterChanged()}),m?.addEventListener("change",()=>{const e=m.value??"none";c.applyColumnState({state:e==="none"?[]:[{colId:e,sort:"asc"}],defaultState:{sort:null}})}),b=R(o,c,s)}function R(o,r,y){const a=o.querySelector("[data-invoice-dialog]"),S=a?.querySelector("[data-detail-status]")??null,i=a?.querySelector("[data-detail-contract]")??null,u=a?.querySelector("[data-detail-project]")??null,m=a?.querySelector("[data-detail-submitted]")??null,p=a?.querySelector("[data-detail-amount]")??null,f=a?.querySelector("[data-detail-doc]")??null,s=a?.querySelector("[data-detail-position]")??null,l=a?.querySelector("[data-detail-prev]")??null,b=a?.querySelector("[data-detail-next]")??null,c=l?.querySelector("button")??null,e=b?.querySelector("button")??null,_=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),$="Pacific Environmental Services, LLC",F="Environmental consulting · Portland, OR",D="Columbia Basin Fish & Wildlife Program",g=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),C=()=>{const t=[];return r.forEachNodeAfterFilterAndSort(n=>{n.data&&t.push(n.data)}),t};let h=-1;const x=t=>{if(!a)return;const n=C();if(h=n.findIndex(d=>d.number===t.number),a.heading=t.number??"Invoice",S&&(S.innerHTML=`<span class="cbf-grid-status">${y.get(t.stage)??t.stage}</span>`),i&&(i.textContent=t.contract??""),u&&(u.textContent=t.project??""),m&&(m.textContent=t.submitted??""),p&&(p.textContent=_.format(t.amount??0)),f){const d=(t.lineItems??[]).map(v=>`<tr>
              <td>${g(v.description)}</td>
              <td class="cbf-num">${v.qty}</td>
              <td class="cbf-num">${_.format(v.unitPrice)}</td>
              <td class="cbf-num">${_.format(v.qty*v.unitPrice)}</td>
            </tr>`).join(""),E=t.perfStart&&t.perfEnd?`${t.perfStart} – ${t.perfEnd}`:"—";f.innerHTML=`
          <header class="cbf-doc__head">
            <div class="cbf-doc__brand">
              <p class="cbf-doc__supplier">${$}</p>
              <p class="cbf-doc__supplier-meta">${F}</p>
            </div>
            <div class="cbf-doc__mark">
              <p class="cbf-doc__mark-word">Invoice</p>
              <p class="cbf-doc__mark-number">${g(t.number??"")}</p>
            </div>
          </header>
          <div class="cbf-doc__parties">
            <div class="cbf-doc__party">
              <span class="cbf-doc__label">Billed to</span>
              <p class="cbf-doc__party-name">${D}</p>
            </div>
            <div class="cbf-doc__dates">
              <div>
                <span class="cbf-doc__label">Invoice date</span>
                <p>${g(t.invoiceDate??"—")}</p>
              </div>
              <div>
                <span class="cbf-doc__label">Performance period</span>
                <p>${g(E)}</p>
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
            <tbody>${d}</tbody>
          </table>
          <div class="cbf-doc__total">
            <span class="cbf-doc__total-label">Total due</span>
            <span class="cbf-doc__total-value">${_.format(t.amount??0)}</span>
          </div>
          ${t.notes?`<div class="cbf-doc__notes">
                   <span class="cbf-doc__label">Notes</span>
                   <p>${g(t.notes)}</p>
                 </div>`:""}
        `}s&&(s.textContent=`Invoice ${h+1} of ${n.length}`),c&&(c.disabled=h<=0),e&&(e.disabled=h>=n.length-1)},q=t=>{const d=C()[h+t];d&&x(d)};return l?.addEventListener("click",()=>q(-1)),b?.addEventListener("click",()=>q(1)),t=>{x(t),a?.show()}}document.querySelectorAll(".cbf-vendor-portal-invoices").forEach(A);
