# Main

Re-implement this UI section faithfully on your stack. Keep the CSS custom-property
names (`var(--…)`) so it stays themeable — the values below are the resolved
`cb-fish` theme of the **legacy-sow** design system (an ESA Ecology spoke).

- **Source prototype:** http://localhost:4787/cb-fish-design/legacy/sow/
- **Section element:** `<main>`
- **Components:** —

## Markup (de-scoped, framework-free)
```html
<main class="legacy-sow-page">
  <div class="legacy-container">
    <h2 class="legacy-we-grid__title">
      Contract 84051 REL 50: 2023-001-00 EXP CTCR UPPER COLUMBIA HABITAT IMPROVEMENT PROJECT
    </h2>
    <div class="legacy-panel legacy-we-grid__wrap">
      <table class="legacy-we-grid">
        <thead>
          <tr>
            <th>Sort Order</th>
            <th>WE ID</th>
            <th>Work Element History</th>
            <th>Work Element Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>MS</th>
            <th>M</th>
            <th>L</th>
            <th>F</th>
            <th>EC</th>
            <th>RM</th>
            <th class="legacy-we-grid__hdcol">HD</th>
            <th>% of Total WSE Effective Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>H</td>
            <td>175</td>
            <td>Existing</td>
            <td>Produce Design</td>
            <td>Upper Chewuch Floodplain Enhancement</td>
            <td class="legacy-we-grid__desc">
              Design phase for reconnecting the Upper Chewuch River to its historic floodplain —
              draw the designed channel and floodplain extent, then compute pre- and post-project
              metrics for the SOW.
            </td>
            <td class="legacy-we-grid__num">
              <a href="/cb-fish-design/legacy/we-milestones" title="Open Milestones for WE H">13</a>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell legacy-we-grid__hdcol">
              <a href="/cb-fish-design/legacy/we" title="Open Habitat Design for WE H">
                <span class="legacy-dot legacy-dot--ring"></span>
              </a>
            </td>
            <td class="legacy-we-grid__num">5%</td>
          </tr>
          <tr>
            <td>M</td>
            <td>175</td>
            <td>Existing</td>
            <td>Produce Design</td>
            <td>Salmon Creek Floodplain Design</td>
            <td class="legacy-we-grid__desc">
              Salmon Creek has been identified as a priority reach for floodplain reconnection
              design work.
            </td>
            <td class="legacy-we-grid__num">
              <a href="/cb-fish-design/legacy/we-milestones" title="Open Milestones for WE M">13</a>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--ring"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell legacy-we-grid__hdcol">
              <a href="/cb-fish-design/legacy/we" title="Open Habitat Design for WE M">
                <span class="legacy-dot legacy-dot--ring"></span>
              </a>
            </td>
            <td class="legacy-we-grid__num">10%</td>
          </tr>
          <tr>
            <td>N</td>
            <td>175</td>
            <td>Existing</td>
            <td>Produce Design</td>
            <td>Omak Creek Instream Complexity</td>
            <td class="legacy-we-grid__desc">
              Design phase for adding instream structure and channel complexity along a degraded
              reach of Omak Creek.
            </td>
            <td class="legacy-we-grid__num">
              <a href="/cb-fish-design/legacy/we-milestones" title="Open Milestones for WE N">3</a>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--filled"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell">
              <span class="legacy-dot legacy-dot--ring"></span>
            </td>
            <td class="legacy-we-grid__dotcell"></td>
            <td class="legacy-we-grid__dotcell legacy-we-grid__hdcol">
              <a href="/cb-fish-design/legacy/we" title="Open Habitat Design for WE N">
                <span class="legacy-dot legacy-dot--ring"></span>
              </a>
            </td>
            <td class="legacy-we-grid__num">10%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main>
```

## Styles (only what this section uses; tokens resolved for the theme)
```css
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
.legacy-panel__body {
  padding: 0 15px 15px;
}
.legacy-sow-page {
  background: #dadada;
  min-height: calc(100vh - 260px);
  padding-block: 20px;
}
.legacy-we-grid__title {
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin: 0 0 14px;
}
.legacy-we-grid__wrap {
  font-family: Montserrat, sans-serif;
  overflow-x: auto;
}
.legacy-we-grid {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
  background: #fff;
}
.legacy-we-grid th {
  background: transparent;
  border: 1px solid #ddd;
  padding: 5px 8px;
  text-align: left;
  font-weight: 700;
  color: #333;
  white-space: nowrap;
}
.legacy-we-grid__hdcol {
  background: #eaf6fa;
}
.legacy-we-grid td {
  border: 1px solid #ddd;
  padding: 5px 8px;
  vertical-align: top;
  color: #333;
}
.legacy-we-grid__desc {
  max-width: 320px;
}
.legacy-we-grid__num {
  text-align: right;
  white-space: nowrap;
}
.legacy-we-grid a {
  color: #007090;
  text-decoration: none;
}
.legacy-we-grid__dotcell {
  text-align: center;
}
.legacy-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.legacy-dot--filled {
  background: #007090;
}
.legacy-dot--ring {
  background: transparent;
  border: 2px solid #007090;
}
```

## Tokens
_None._

---
_Full page, complete stylesheet, and all tokens: `./full-page.md`, `../styles.css`, `../index.html`._
