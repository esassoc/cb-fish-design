const c=o=>o.replace(/([()\\])/g,"\\$1");function p(o,a){const n=`BT /F1 18 Tf 60 740 Td (${c(o)}) Tj /F1 11 Tf 0 -26 Td (${c(a)}) Tj 0 -18 Td (Columbia Basin Fish & Wildlife Program — prototype placeholder) Tj ET`,e=["<</Type/Catalog/Pages 2 0 R>>","<</Type/Pages/Kids[3 0 R]/Count 1>>","<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>",`<</Length ${n.length}>>
stream
${n}
endstream`,"<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>"];let t=`%PDF-1.4
`;const d=[];e.forEach((r,s)=>{d.push(t.length),t+=`${s+1} 0 obj
${r}
endobj
`});const l=t.length;return t+=`xref
0 ${e.length+1}
0000000000 65535 f 
`,d.forEach(r=>{t+=`${String(r).padStart(10,"0")} 00000 n 
`}),t+=`trailer
<</Size ${e.length+1}/Root 1 0 R>>
startxref
${l}
%%EOF`,new Blob([t],{type:"application/pdf"})}function f(o,a){const n=URL.createObjectURL(p(o,a)),e=document.createElement("a");e.href=n,e.download=o,document.body.appendChild(e),e.click(),e.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}export{f as d};
