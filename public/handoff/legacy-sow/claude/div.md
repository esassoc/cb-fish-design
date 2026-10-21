# div

Habitat Design Tool - Entrance · source prototype: https://esassoc.github.io/cb-fish-design/legacy/sow/

![div, desktop](https://esassoc.github.io/cb-fish-design/handoff/legacy-sow/claude/div.desktop.png)

Phone width: https://esassoc.github.io/cb-fish-design/handoff/legacy-sow/claude/div.phone.png

## Markup

_28 repeated elements are collapsed in the markup below; the comments say where._

```html
<div class="legacy-panel legacy-we-grid__wrap">
  <table class="legacy-we-grid">
    <thead>
      <tr>
        <th>Sort Order</th>
        <th>WE ID</th>
        <!-- …and 10 more like this (<th>) -->
        <th class="legacy-we-grid__hdcol">HD</th>
        <th>% of Total WSE Effective Budget</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>H</td>
        <td>175</td>
        <!-- …and 3 more like this (<td>) -->
        <td class="legacy-we-grid__desc">
          Design phase for reconnecting the Upper Chewuch River to its historic floodplain — draw
          the designed channel and floodplain extent, then compute pre- and post-project metrics for
          the SOW.
        </td>
        <td class="legacy-we-grid__num">
          <a href="/cb-fish-design/legacy/we-milestones" title="Open Milestones for WE H">13</a>
        </td>
        <td class="legacy-we-grid__dotcell"><span class="legacy-dot legacy-dot--filled"></span></td>
        <td class="legacy-we-grid__dotcell"><span class="legacy-dot legacy-dot--filled"></span></td>
        <td class="legacy-we-grid__dotcell legacy-we-grid__hdcol">
          <a href="/cb-fish-design/legacy/we" title="Open Habitat Design for WE H">
            <span class="legacy-dot legacy-dot--ring"></span>
          </a>
        </td>
        <!-- …and 3 more like this (<td class="legacy-we-grid__dotcell">) -->
        <td class="legacy-we-grid__num">5%</td>
      </tr>
      <tr>
        <td>M</td>
        <td>175</td>
        <!-- …and 3 more like this (<td>) -->
        <td class="legacy-we-grid__desc">
          Salmon Creek has been identified as a priority reach for floodplain reconnection design
          work.
        </td>
        <td class="legacy-we-grid__num">
          <a href="/cb-fish-design/legacy/we-milestones" title="Open Milestones for WE M">13</a>
        </td>
        <td class="legacy-we-grid__dotcell"><span class="legacy-dot legacy-dot--filled"></span></td>
        <td class="legacy-we-grid__dotcell"><span class="legacy-dot legacy-dot--filled"></span></td>
        <td class="legacy-we-grid__dotcell legacy-we-grid__hdcol">
          <a href="/cb-fish-design/legacy/we" title="Open Habitat Design for WE M">
            <span class="legacy-dot legacy-dot--ring"></span>
          </a>
        </td>
        <!-- …and 3 more like this (<td class="legacy-we-grid__dotcell">) -->
        <td class="legacy-we-grid__num">10%</td>
      </tr>
      <tr>
        <td>N</td>
        <td>175</td>
        <!-- …and 3 more like this (<td>) -->
        <td class="legacy-we-grid__desc">
          Design phase for adding instream structure and channel complexity along a degraded reach
          of Omak Creek.
        </td>
        <td class="legacy-we-grid__num">
          <a href="/cb-fish-design/legacy/we-milestones" title="Open Milestones for WE N">3</a>
        </td>
        <td class="legacy-we-grid__dotcell"><span class="legacy-dot legacy-dot--filled"></span></td>
        <td class="legacy-we-grid__dotcell"><span class="legacy-dot legacy-dot--filled"></span></td>
        <td class="legacy-we-grid__dotcell legacy-we-grid__hdcol">
          <a href="/cb-fish-design/legacy/we" title="Open Habitat Design for WE N">
            <span class="legacy-dot legacy-dot--ring"></span>
          </a>
        </td>
        <!-- …and 3 more like this (<td class="legacy-we-grid__dotcell">) -->
        <td class="legacy-we-grid__num">10%</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Styles

```css
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
.legacy-we-grid td {
  border: 1px solid #ddd;
  padding: 5px 8px;
  vertical-align: top;
  color: #333;
}
.legacy-we-grid tbody tr:hover {
  background: #f5f9fc;
}
.legacy-we-grid a {
  color: #007090;
  text-decoration: none;
}
.legacy-we-grid a:hover {
  text-decoration: underline;
}
.legacy-we-grid__desc {
  max-width: 320px;
}
.legacy-we-grid__num {
  text-align: right;
  white-space: nowrap;
}
.legacy-we-grid__dotcell {
  text-align: center;
}
.legacy-we-grid__hdcol {
  background: #eaf6fa;
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
.legacy-panel {
  background: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px #0000000d;
  margin: 0 0 20px;
}
```
