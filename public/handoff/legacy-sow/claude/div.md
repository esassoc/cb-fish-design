# div

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **legacy-sow** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/legacy/sow/
- **Section element:** `<div>`
- **Components:** —

## Markup (de-scoped, framework-free)
```html
<div class="legacy-chrome">
  <div class="legacy-chrome__utilitybar">
    <div class="legacy-chrome__utilitybar-inner">
      <span>Data management</span> <span>System status</span> <span>System configuration</span>
    </div>
  </div>
  <div class="legacy-chrome__appbar">
    <div class="legacy-chrome__appbar-inner">
      <a class="legacy-chrome__brand" href="#">
        <img
          class="legacy-chrome__logo"
          src="/cb-fish-design/images/legacy/Modern-Nav-Logo.svg"
          width="48"
          height="48"
          alt=""
        />
        <img
          class="legacy-chrome__logotype"
          src="/cb-fish-design/images/legacy/Modern-Nav-Logo-Type.svg"
          width="190"
          height="47"
          alt="Columbia Basin Fish &amp; Wildlife Program"
        />
      </a>
      <nav class="legacy-chrome__nav">
        <span class="legacy-chrome__navitem">
          <img
            src="/cb-fish-design/images/legacy/Nav-Mitigationwork.svg"
            alt=""
            width="16"
            height="16"
          />
          Mitigation work
          <img
            class="legacy-chrome__navcaret"
            src="/cb-fish-design/images/legacy/Nav-Down-arrow.svg"
            alt=""
            width="9"
            height="9"
          /> </span
        ><span class="legacy-chrome__navitem">
          <img
            src="/cb-fish-design/images/legacy/Nav-Reporting.svg"
            alt=""
            width="16"
            height="16"
          />
          Reporting
          <img
            class="legacy-chrome__navcaret"
            src="/cb-fish-design/images/legacy/Nav-Down-arrow.svg"
            alt=""
            width="9"
            height="9"
          /> </span
        ><span class="legacy-chrome__navitem">
          <img src="/cb-fish-design/images/legacy/Nav-Funding.svg" alt="" width="16" height="16" />
          Funding
          <img
            class="legacy-chrome__navcaret"
            src="/cb-fish-design/images/legacy/Nav-Down-arrow.svg"
            alt=""
            width="9"
            height="9"
          /> </span
        ><span class="legacy-chrome__navitem">
          <img
            src="/cb-fish-design/images/legacy/Nav-Dashboard.svg"
            alt=""
            width="16"
            height="16"
          />
          Dashboard </span
        ><span class="legacy-chrome__navitem">
          Recent
          <img
            class="legacy-chrome__navcaret"
            src="/cb-fish-design/images/legacy/Nav-Down-arrow.svg"
            alt=""
            width="9"
            height="9"
          />
        </span>
      </nav>
    </div>
  </div>
  <div class="legacy-chrome__messagebar"></div>
  <div class="legacy-container legacy-chrome__crumbrow">
    <ul class="legacy-chrome__crumbs">
      <span>Projects &amp; Contracts</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>Projects</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>2023-001-00</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>Contracts</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>84051 REL 50</span
      ><span class="legacy-chrome__crumbsep">/</span
      ><span>SOW for Change Request (CCR) - APPROVED - CCR-53920</span>
    </ul>
    <a href="#" class="legacy-chrome__gotobtn">Go to… ▾</a>
  </div>
  <div class="legacy-container">
    <div class="legacy-panel">
      <div class="legacy-panel__tabbar">
        <ul class="legacy-chrome__tabs">
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Summary </span>
          </li>
          <li class="is-active">
            <a href="/cb-fish-design/legacy/sow" class="legacy-chrome__tab"> SOW </a>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> WE Budgets </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Status Reports </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Pre-Award </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Workflow </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Review SOW </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Email Archive </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Internal Notes </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> Documents </span>
          </li>
          <li class="">
            <span class="legacy-chrome__tab legacy-chrome__tab--inert"> COR File </span>
          </li>
        </ul>
      </div>
      <div class="legacy-panel__body">
        <p class="legacy-contract-header__help">
          Select a Contract Action to view its work statement elements. If a Contract Action has not
          been issued, only authorized users are allowed to view or work with the work statement
          elements.
        </p>
      </div>
    </div>
  </div>
</div>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
.legacy-chrome {
  background: #dadada;
  display: flow-root;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  color: #333;
}
.legacy-chrome__utilitybar {
  background: #13273e;
  font-size: 14px;
  font-family:
    IBM Plex Sans,
    sans-serif;
  color: #fff;
}
.legacy-chrome__utilitybar-inner {
  width: 100%;
  box-sizing: border-box;
  padding: 17px 20px;
  display: flex;
  gap: 24px;
}
.legacy-chrome__appbar {
  background: var(--color-background-brand, #1e5386);
  min-height: 80px;
}
.legacy-chrome__appbar-inner {
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}
.legacy-chrome__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.legacy-chrome__logo,
.legacy-chrome__logotype {
  display: block;
}
.legacy-chrome__nav {
  display: flex;
  gap: 26px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}
.legacy-chrome__navitem {
  display: flex;
  align-items: center;
  gap: 7px;
}
.legacy-chrome__navcaret {
  opacity: 0.85;
}
.legacy-chrome__messagebar {
  background: #fff;
  height: 48px;
}
.legacy-container {
  width: 100%;
  margin: 0 auto;
  padding-inline: 15px;
  box-sizing: border-box;
}
.legacy-container {
  width: 780px;
  padding-inline: 0;
}
.legacy-container {
  width: 1000px;
}
.legacy-container {
  width: 1200px;
}
.legacy-chrome__crumbrow {
  background: #dadada;
  padding-block: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.legacy-chrome__crumbs {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.legacy-chrome__crumbsep {
  margin: 0 6px;
  color: #999;
}
.legacy-chrome__gotobtn {
  background: #5bc0de;
  color: #fff;
  font-size: 13px;
  padding: 3px 12px;
  border: 1px solid #46b8da;
  border-radius: 4px;
  text-decoration: none;
  white-space: nowrap;
}
.legacy-panel {
  background: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px #0000000d;
  margin: 0 0 20px;
}
.legacy-panel__tabbar {
  padding: 20px 0 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
.legacy-chrome__tabs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}
.legacy-chrome__tabs li {
  background: #dadada;
}
.legacy-chrome__tab {
  display: block;
  padding: 10px 7px;
  font-size: 14px;
  color: #007090;
  text-decoration: none;
}
.legacy-chrome__tab--inert {
  cursor: default;
}
.legacy-chrome__tabs li.is-active {
  background: #42a2c1;
}
.legacy-chrome__tabs li.is-active .legacy-chrome__tab {
  color: #fff;
  text-decoration: none;
}
.legacy-panel__body {
  padding: 0 15px 15px;
}
.legacy-contract-header__help {
  font-family: Montserrat, sans-serif;
  font-size: 13px;
  color: #333;
  max-width: 900px;
  margin: 0;
}
```

## Tokens
| Token | Value | Tier |
|---|---|---|
| `--color-background-brand` | `#1e5386` | semantic |

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
