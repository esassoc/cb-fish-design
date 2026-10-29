const c=t=>t.replace(/([()\\])/g,"\\$1");function p(t,n){const a=`BT /F1 18 Tf 60 740 Td (${c(t)}) Tj /F1 11 Tf 0 -26 Td (${c(n)}) Tj 0 -18 Td (Columbia Basin Fish & Wildlife Program — prototype placeholder) Tj ET`,e=["<</Type/Catalog/Pages 2 0 R>>","<</Type/Pages/Kids[3 0 R]/Count 1>>","<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>",`<</Length ${a.length}>>
stream
${a}
endstream`,"<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>"];let o=`%PDF-1.4
`;const s=[];e.forEach((r,l)=>{s.push(o.length),o+=`${l+1} 0 obj
${r}
endobj
`});const d=o.length;return o+=`xref
0 ${e.length+1}
0000000000 65535 f 
`,s.forEach(r=>{o+=`${String(r).padStart(10,"0")} 00000 n 
`}),o+=`trailer
<</Size ${e.length+1}/Root 1 0 R>>
startxref
${d}
%%EOF`,new Blob([o],{type:"application/pdf"})}function f(t,n){const a=URL.createObjectURL(t),e=document.createElement("a");e.href=a,e.download=n,document.body.appendChild(e),e.click(),e.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e3)}function i(t,n){f(p(t,n),t)}export{i as d,p as m,f as s};
