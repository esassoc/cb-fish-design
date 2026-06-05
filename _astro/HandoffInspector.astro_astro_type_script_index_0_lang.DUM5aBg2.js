const h=o=>String(o).replace(/[&<>]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[n]),I=o=>/^(#[0-9a-f]{3,8}|rgba?\([\d.,\s%/]+\)|hsla?\([\d.,\s%/]+\))$/i.test(String(o).trim());function j(o){return o.replace(/("[^"]*"|'[^']*')/g,'<span class="s">$1</span>').replace(/(var\()(--[\w-]+)/g,'$1<span class="t">$2</span>').replace(/(#[0-9a-fA-F]{3,8})\b/g,'<span class="n">$1</span>')}function N(o){return h(o).split(`
`).map(n=>{if(/\{\s*$/.test(n))return n.replace(/^(\s*)(.+?)(\s*\{)\s*$/,'$1<span class="sel">$2</span>$3');const s=n.match(/^(\s*)([\w-]+)(\s*:\s*)(.+?)(;?)\s*$/);return s?`${s[1]}<span class="p">${s[2]}</span>${s[3]}${j(s[4])}${s[5]}`:n}).join(`
`)}function P(o){return h(o).replace(/("[^"]*")/g,'<span class="s">$1</span>').replace(/(&lt;\/?)([a-zA-Z][\w-]*)/g,'$1<span class="tag">$2</span>')}function R(o){if(!o||!o.length)return'<p class="hint">No design tokens in this section.</p>';const n={};for(const i of o)(n[i.tier]=n[i.tier]||[]).push(i);return["brand","semantic","component","primitive"].filter(i=>n[i]).map(i=>`
      <div class="tgroup">
        <div class="tgroup__h">${i} <span>${n[i].length}</span></div>
        ${n[i].map(c=>`<div class="tok">
              <span class="tok__name">${I(c.value)?`<i style="background:${h(c.value)}"></i>`:""}<code>${h(c.name)}</code></span>
              <span class="tok__val">${h(c.value)}</span>
            </div>`).join("")}
      </div>`).join("")}const O=`
  :host { all: initial; }
  /* The hidden attribute must win over the explicit display on .launch/.panel,
     otherwise the toggle is defeated by specificity. */
  [hidden] { display: none !important; }
  .host-root { position: fixed; inset: 0; pointer-events: none; z-index: 2147483000;
    font-family: system-ui, sans-serif; }
  .host-root > * { pointer-events: auto; }
  .launch { position: fixed; bottom: 16px; right: 16px; display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 13px; border-radius: 999px; background: #0d1117; color: #e6edf3; border: 1px solid #30363d;
    box-shadow: 0 8px 24px -8px rgba(0,0,0,.5); font-size: 13px; cursor: pointer; }
  .launch:hover { border-color: #4493f8; }
  .launch svg { color: #4493f8; flex: none; }
  .panel { position: fixed; top: 12px; right: 12px; width: min(460px, 94vw);
    max-height: calc(100vh - 24px); display: flex; flex-direction: column;
    background: #0d1117; color: #e6edf3; border: 1px solid #30363d; border-radius: 12px;
    box-shadow: 0 16px 50px -12px rgba(0,0,0,.6); font-size: 12.5px; overflow: hidden; }
  .head { display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-bottom: 1px solid #21262d; }
  .head strong { font-size: 14px; }
  .head .sub { flex: 1; color: #7d8590; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .picker { padding: 10px 14px; border-bottom: 1px solid #21262d; }
  .picker__label { color: #7d8590; font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase;
    margin-bottom: 6px; }
  .tree { position: relative; }
  .node { position: relative; display: block; width: 100%; text-align: left; padding: 4px 0 4px 26px;
    border: 0; background: none; color: #adbac7; font: inherit; font-size: 12.5px; cursor: pointer;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tree .node::before { content: ''; position: absolute; left: 8px; top: 0; height: 100%; border-left: 1px solid #30363d; }
  .tree .node:last-child::before { height: 50%; }
  .tree .node::after { content: ''; position: absolute; left: 8px; top: 50%; width: 12px; border-top: 1px solid #30363d; }
  .node:hover { color: #fff; }
  .node.on { color: #fff; font-weight: 600; }
  .tree .node.on::after { border-color: #4493f8; }
  .node--full { margin-top: 8px; padding-top: 9px; border-top: 1px solid #21262d; }
  .node--full::before { content: '⤓'; position: absolute; left: 7px; top: 9px; color: #7d8590; }
  .node--full.on::before { color: #4493f8; }
  .tabs { display: flex; gap: 4px; padding: 8px 12px; border-bottom: 1px solid #21262d; }
  .tabs button { padding: 5px 12px; border: 0; border-radius: 6px; background: none; color: #7d8590;
    font: inherit; font-size: 12.5px; cursor: pointer; }
  .tabs button.on { background: #21262d; color: #fff; }
  .tabs .actions { margin-left: auto; display: flex; align-items: center; gap: 6px; }
  .tabs .copy { color: #adbac7; border: 1px solid #30363d; }
  .tabs .copy:hover { border-color: #4493f8; color: #fff; }
  .tabs .copy.done { color: #7ee787; border-color: #238636; }
  .claude { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px;
    border: 1px solid #d97757; border-radius: 6px; background: #d977571a; color: #e9a589;
    font-size: 12.5px; cursor: pointer; white-space: nowrap; }
  .claude svg { color: #d97757; flex: none; }
  .claude:hover { background: #d9775733; color: #f0b89e; }
  .claude.done { border-color: #238636; color: #7ee787; }
  .claude.done svg { color: #7ee787; }
  .body { overflow: auto; padding: 12px 14px; }
  .hint { margin: 0; color: #7d8590; line-height: 1.6; }
  pre.code { margin: 0; white-space: pre-wrap; word-break: break-word; line-height: 1.55; tab-size: 2; color: #adbac7;
    font-family: ui-monospace, "SF Mono", Menlo, monospace; }
  pre.code .tag { color: #7ee787; }
  pre.code .s   { color: #a5d6ff; }
  pre.code .sel { color: #d2a8ff; }
  pre.code .p   { color: #79c0ff; }
  pre.code .t   { color: #ffa657; }
  pre.code .n   { color: #f0883e; }
  .tgroup { margin-bottom: 14px; }
  .tgroup__h { text-transform: capitalize; color: #7d8590; font-size: 11px; letter-spacing: .04em; margin-bottom: 6px; }
  .tgroup__h span { color: #4d5560; }
  .tok { display: flex; flex-direction: column; gap: 2px; padding: 6px 0; border-bottom: 1px solid #161b22; }
  .tok__name { display: flex; align-items: center; gap: 8px; }
  .tok__name i { width: 14px; height: 14px; border-radius: 3px; border: 1px solid #ffffff22; flex: none; }
  .tok__name code { color: #e6edf3; font-family: ui-monospace, monospace; }
  .tok__val { color: #7d8590; padding-left: 22px; word-break: break-all; font-family: ui-monospace, monospace; }
  .x { border: 0; background: none; color: #7d8590; font-size: 20px; line-height: 1; cursor: pointer; }
  .x:hover { color: #fff; }
`,w="handoff-inspector",B=/^(SCRIPT|STYLE|LINK|ASTRO-DEV-TOOLBAR|ASTRO-ISLAND)$/;function D(){const o="/cb-fish-design/";let n=location.pathname;return n.startsWith(o)&&(n=n.slice(o.length)),n=n.replace(/^\/|\/$/g,""),n.replace(/\//g,"-")||"index"}const F=o=>`/cb-fish-design/handoff/${o}/manifest.json`;function U(){if(document.getElementById(w))return;const o=F(D());fetch(o).then(n=>n.ok?n.json():Promise.reject()).then(n=>K(n,o)).catch(()=>{})}function K(o,n){const s=document.createElement("div");s.id=w;const i=s.attachShadow({mode:"open"});document.documentElement.appendChild(s);const c=document.createElement("style");c.textContent=`
    [data-handoff-pick]:hover { outline: 2px dashed #1f6feb; outline-offset: -2px; cursor: pointer; }
    [data-handoff-on] { outline: 2px solid #4493f8 !important; outline-offset: -2px; }`;const M=n.replace(/manifest\.json.*$/,""),$=document.createElement("style");$.textContent=O;const a=document.createElement("div");a.className="host-root",a.innerHTML=`
    <button class="launch" title="Inspect this prototype (⌥⇧I)">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 9 3 3-3 3"/><path d="M14 15h3"/><rect width="18" height="16" x="3" y="4" rx="2"/></svg>
      Inspect
    </button>
    <div class="panel" hidden>
      <div class="head"><strong>Dev Handoff</strong><span class="sub"></span><button class="x" title="Close">×</button></div>
      <div class="picker"></div>
      <div class="tabs">
        <button data-tab="html" class="on">HTML</button>
        <button data-tab="css">CSS</button>
        <button data-tab="tokens">Tokens</button>
        <span class="actions">
          <button class="copy" title="Copy this tab's raw content">Copy</button>
          <button class="claude" title="Copy a fetchable spec link for Claude">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg>
            for Claude
          </button>
        </span>
      </div>
      <div class="body"></div>
    </div>`,i.append($,a);const S=a.querySelector(".launch"),z=a.querySelector(".panel"),C=a.querySelector(".sub"),p=a.querySelector(".picker"),b=a.querySelector(".body"),L=[...a.querySelectorAll(".tabs button[data-tab]")],v=a.querySelector(".copy"),y=a.querySelector(".claude"),f=()=>[...document.body.children].filter(e=>e.id!==w&&!B.test(e.tagName));let r=null,u="html",k=!1;function x(){if(!r){C.textContent=`${o.name} · ${o.sections.length} sections`,b.innerHTML='<p class="hint">Pick a section above, or click any region of the page.</p>';return}C.textContent=r.tag&&r.tag!=="page"?`${r.label} · <${r.tag}>`:r.label,u==="html"?b.innerHTML=`<pre class="code">${P(r.html)}</pre>`:u==="css"?b.innerHTML=r.css?`<pre class="code">${N(r.css)}</pre>`:'<p class="hint">No section-local CSS (inherited utilities only).</p>':b.innerHTML=R(r.tokens)}const E=()=>[...p.querySelectorAll(".tree .node")];function T(e){r=o.sections[e]||null,E().forEach((t,l)=>t.classList.toggle("on",l===e)),p.querySelector(".node--full")?.classList.remove("on"),f().forEach((t,l)=>t.toggleAttribute("data-handoff-on",l===e)),x()}function q(){o.full&&(r={tag:"page",...o.full},E().forEach(e=>e.classList.remove("on")),p.querySelector(".node--full")?.classList.add("on"),f().forEach(e=>e.removeAttribute("data-handoff-on")),x())}function A(){p.innerHTML='<div class="picker__label">Sections</div><div class="tree"></div>';const e=p.querySelector(".tree");if(o.sections.forEach((t,l)=>{const d=document.createElement("button");d.className="node",d.title=t.label,d.textContent=t.label,d.onclick=()=>T(l),e.appendChild(d)}),o.full){const t=document.createElement("button");t.className="node node--full",t.textContent=o.full.label||"Full page",t.onclick=q,p.appendChild(t)}}const _=e=>{if(!k)return;const t=f().find(l=>l.contains(e.target));t&&(e.preventDefault(),e.stopPropagation(),T(f().indexOf(t)))};function g(e){k=e,z.hidden=!e,S.hidden=e,e?(document.head.append(c),f().forEach(t=>t.setAttribute("data-handoff-pick","")),document.addEventListener("click",_,!0)):(c.remove(),f().forEach(t=>{t.removeAttribute("data-handoff-pick"),t.removeAttribute("data-handoff-on")}),document.removeEventListener("click",_,!0))}function H(){return r?u==="html"?r.html||"":u==="css"?r.css||"":(r.tokens||[]).map(e=>`${e.name}: ${e.value};`).join(`
`):""}const m=(e,t,l=!0)=>{const d=e.innerHTML;e.classList.toggle("done",l),e.textContent=t,setTimeout(()=>{e.innerHTML=d,e.classList.remove("done")},1300)};v.onclick=async()=>{const e=H();if(e)try{await navigator.clipboard.writeText(e),m(v,"Copied")}catch{m(v,"Failed",!1)}},y.onclick=async()=>{if(!r?.claudePath)return;const t=["Re-implement this UI section on my stack, faithfully, keeping the CSS custom-property names.","Spec (markup + styles + tokens) — use whichever you can reach:",`• hosted URL: ${new URL(M+r.claudePath,location.origin).href}`];r.repoPath&&t.push(`• in this repo: ${r.repoPath}`);try{await navigator.clipboard.writeText(t.join(`
`)),m(y,"Copied link")}catch{m(y,"Failed",!1)}},S.onclick=()=>g(!0),a.querySelector(".x").onclick=()=>g(!1),L.forEach(e=>e.onclick=()=>{u=e.dataset.tab,L.forEach(t=>t.classList.toggle("on",t===e)),x()}),document.addEventListener("keydown",e=>{e.altKey&&e.shiftKey&&(e.key==="I"||e.key==="i")&&(e.preventDefault(),g(!k))}),A(),x(),new URLSearchParams(location.search).has("inspect")&&g(!0)}U();
