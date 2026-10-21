# Welcome to the Columbia Basin Fish & Wildlife Program: markup, part 1 of 2

```html
<div class="cbf-home__body stack">
  <section class="cbf-program-overview">
    <div class="cbf-program-overview__copy">
      <h1 class="typography-heading-lg">
        Welcome to the Columbia Basin Fish &amp; Wildlife Program
      </h1>
      <p class="typography-body-md cbf-program-overview__intro">
        Bonneville Power Administration funds work to protect and restore the fish and wildlife
        affected by hydroelectric dams on the Columbia River and its tributaries. CBFish tracks that
        work — the projects, the contracts, and what they achieve — across Idaho, Montana, Oregon,
        and Washington.
      </p>
    </div>
    <ul class="cbf-program-overview__stats grid">
      <li>
        <div class="esa-card">
          <div class="esa-card__body typography-body-md">
            <div class="esa-stat">
              <div class="esa-stat__value typography-display-sm">301</div>
              <div class="esa-stat__label typography-label-md">Projects</div>
              <div class="esa-stat__sub typography-body-sm">Active this fiscal year</div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="esa-card">
          <div class="esa-card__body typography-body-md">
            <div class="esa-stat">
              <div class="esa-stat__value typography-display-sm">633</div>
              <div class="esa-stat__label typography-label-md">Contracts</div>
              <div class="esa-stat__sub typography-body-sm">Active this fiscal year</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
  <section class="cbf-metrics-counters" aria-labelledby="cbf-metrics-counters-h" data-counters="">
    <div class="cbf-metrics-counters__head">
      <h2 id="cbf-metrics-counters-h" class="typography-heading-md">
        What the program has delivered since 2005
      </h2>
      <p class="typography-body-md cbf-metrics-counters__lede">
        Select any total to see where it happened and the contracts behind it.
      </p>
    </div>
    <ul class="cbf-metrics-counters__list">
      <li style="--i: 0">
        <a class="cbf-metrics-counters__item" href="/cb-fish-design/program-results/habitat">
          <span class="cbf-metrics-counters__value">
            <span data-count="1.06" data-decimals="2">1.06</span>
            <span class="cbf-metrics-counters__word"> million</span>
          </span>
          <span class="cbf-metrics-counters__label">Acres of habitat protected or improved</span>
          <span class="cbf-metrics-counters__cta" aria-hidden="true"
            >View contracts
            <span class="esa-icon esa-icon--sm" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </span>
        </a>
      </li>
      <li style="--i: 1">
        <a class="cbf-metrics-counters__item" href="/cb-fish-design/program-results/estuary">
          <span class="cbf-metrics-counters__value">
            <span data-count="9800" data-decimals="0">9,800</span>
          </span>
          <span class="cbf-metrics-counters__label">Acres of estuary floodplain reconnected</span>
          <span class="cbf-metrics-counters__cta" aria-hidden="true"
            >View contracts
            <span class="esa-icon esa-icon--sm" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </span>
        </a>
      </li>
      <!-- …and 2 more like this (<li>) -->
    </ul>
  </section>
  <!-- script type="module" removed (620 bytes) -->
  <section class="cbf-metrics-growth" aria-labelledby="cbf-metrics-growth-h">
    <div class="cbf-metrics-growth__head">
      <h2 id="cbf-metrics-growth-h" class="typography-heading-md">How the results have grown</h2>
      <p class="typography-body-md cbf-metrics-growth__lede">
        Twenty years of cumulative results. Pick a measure, then move the fiscal-year slider or
        point at the chart to see any year.
      </p>
    </div>
    <div class="cbf-metrics-growth__frame">
      <!-- script type="module" removed (0 bytes) --><esa-tab-layout
        tabs='[{"label":"Habitat","badge":"1.06 million"},{"label":"Estuary floodplain","badge":"9,800"},{"label":"Fish produced","badge":"2.1 billion"},{"label":"Wildlife lands","badge":"565,000"}]'
        active-index="0"
        size="md"
        variant="underline"
        appearance="underline"
      >
        <div class="cbf-metrics-growth__stage" slot="panel-0">
          <div class="cbf-metrics-growth__stage-head">
            <div class="esa-stat">
              <div class="esa-stat__value typography-display-sm">1.06 million</div>
              <div class="esa-stat__label typography-label-md">
                Acres of habitat protected or improved
              </div>
              <div class="esa-stat__sub typography-body-sm">FY05–FY25, cumulative</div>
            </div>
            <dl class="cbf-metrics-growth__facts">
              <div>
                <dt class="typography-label-xs">Added in FY25</dt>
                <dd>+35,722</dd>
              </div>
              <div>
                <dt class="typography-label-xs">Average per year</dt>
                <dd>50,476</dd>
              </div>
            </dl>
          </div>
          <figure
            class="cbf-cumulative-chart is-interactive"
            data-cumulative-chart=""
            data-series='[{"fy":2005,"value":23579},{"fy":2006,"value":58028},{"fy":2007,"value":92264},{"fy":2008,"value":129063},{"fy":2009,"va… [567 characters]'
            data-unit="acres"
          >
            <svg
              viewBox="0 0 640 260"
              role="img"
              aria-label="Cumulative habitat, rising from 23,579 in FY05 to 1,060,000 acres in FY25."
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="cbf-cc-m8d3yr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" class="cbf-cumulative-chart__stop-top"></stop>
                  <stop offset="100%" class="cbf-cumulative-chart__stop-bottom"></stop>
                </linearGradient>
              </defs>
              <line
                x1="8"
                x2="624"
                y1="182.32"
                y2="182.32"
                class="cbf-cumulative-chart__grid"
              ></line>
              <line
                x1="8"
                x2="624"
                y1="132.64000000000001"
                y2="132.64000000000001"
                class="cbf-cumulative-chart__grid"
              ></line>
              <!-- …and 2 more like this (<line class="[object SVGAnimatedString]">) -->
              <path
                d="M8.0,227.6L38.8,221.1L69.6,214.6L100.4,207.6L131.2,198.2L162.0,189.1L192.8,182.6L223.6,173.4L254.4,160.6L285.2,151.8L316.0,145.9L346.8,133.2L377.6,118.3L408.4,112.0L439.2,105.1L470.0,87.8L500.8,73.7L531.6,70.4L562.4,60.0L593.2,38.7L624.0,32.0L624.0,232L8.0,232Z"
                fill="url(#cbf-cc-m8d3yr)"
              ></path>
              <path
                d="M8.0,227.6L38.8,221.1L69.6,214.6L100.4,207.6L131.2,198.2L162.0,189.1L192.8,182.6L223.6,173.4L254.4,160.6L285.2,151.8L316.0,145.9L346.8,133.2L377.6,118.3L408.4,112.0L439.2,105.1L470.0,87.8L500.8,73.7L531.6,70.4L562.4,60.0L593.2,38.7L624.0,32.0"
                class="cbf-cumulative-chart__line"
                pathLength="1"
              ></path>
              <circle cx="624" cy="32" r="5" class="cbf-cumulative-chart__end"></circle>
              <text x="8" y="252" text-anchor="start" class="cbf-cumulative-chart__tick">FY05</text>
              <text x="162" y="252" text-anchor="middle" class="cbf-cumulative-chart__tick">
                FY10
              </text>
              <!-- …and 3 more like this (<text class="[object SVGAnimatedString]">) -->
              <g class="cbf-cumulative-chart__cursor" data-cursor="" hidden="">
                <line y1="16" y2="232" class="cbf-cumulative-chart__cursor-line"></line>
                <circle r="6" class="cbf-cumulative-chart__cursor-dot"></circle>
              </g>
            </svg>
            <div
              class="cbf-cumulative-chart__readout typography-body-sm"
              aria-live="polite"
              data-readout=""
            >
              <strong>FY25</strong> · 1,060,000 acres to date
            </div>
            <esa-range-slider
              class="cbf-cumulative-chart__scrub"
              size="sm"
              label="Fiscal year"
              min="2005"
              max="2025"
              value="2025"
              step="1"
              data-scrub="true"
            ></esa-range-slider>
          </figure>
          <div class="cbf-metrics-growth__actions">
            <span
              class="esa-button esa-button--variant-primary esa-button--appearance-outline esa-button--md"
              ><a
                class="esa-button__native typography-microcopy-md"
                href="/cb-fish-design/program-results/habitat"
                role="button"
                ><span class="esa-button__label">View contributing contracts</span
                ><span class="esa-icon esa-icon--md" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    focusable="false"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span> </a
            ></span>
          </div>
        </div>
        <div class="cbf-metrics-growth__stage" slot="panel-1">
          <div class="cbf-metrics-growth__stage-head">
            <div class="esa-stat">
              <div class="esa-stat__value typography-display-sm">9,800</div>
              <div class="esa-stat__label typography-label-md">
                Acres of estuary floodplain reconnected
              </div>
              <div class="esa-stat__sub typography-body-sm">FY05–FY25, cumulative</div>
            </div>
            <dl class="cbf-metrics-growth__facts">
              <div>
                <dt class="typography-label-xs">Added in FY25</dt>
                <dd>+491</dd>
              </div>
              <div>
                <dt class="typography-label-xs">Average per year</dt>
                <dd>467</dd>
              </div>
            </dl>
          </div>
          <figure
            class="cbf-cumulative-chart is-interactive"
            data-cumulative-chart=""
            data-series='[{"fy":2005,"value":75},{"fy":2006,"value":236},{"fy":2007,"value":432},{"fy":2008,"value":668},{"fy":2009,"value":1003}… [521 characters]'
            data-unit="acres"
          >
            <svg
              viewBox="0 0 640 260"
              role="img"
              aria-label="Cumulative estuary floodplain, rising from 75 in FY05 to 9,800 acres in FY25."
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="cbf-cc-eaxr9b" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" class="cbf-cumulative-chart__stop-top"></stop>
                  <stop offset="100%" class="cbf-cumulative-chart__stop-bottom"></stop>
                </linearGradient>
              </defs>
              <line
                x1="8"
                x2="624"
                y1="182.32"
                y2="182.32"
                class="cbf-cumulative-chart__grid"
              ></line>
              <line
                x1="8"
                x2="624"
                y1="132.64000000000001"
                y2="132.64000000000001"
                class="cbf-cumulative-chart__grid"
              ></line>
              <!-- …and 2 more like this (<line class="[object SVGAnimatedString]">) -->
              <path
                d="M8.0,230.5L38.8,227.2L69.6,223.2L100.4,218.4L131.2,211.5L162.0,204.3L192.8,198.4L223.6,190.2L254.4,178.9L285.2,170.1L316.0,163.3L346.8,150.7L377.6,135.9L408.4,127.9L439.2,119.2L470.0,100.9L500.8,85.0L531.6,78.9L562.4,65.9L593.2,42.0L624.0,32.0L624.0,232L8.0,232Z"
                fill="url(#cbf-cc-eaxr9b)"
              ></path>
              <path
                d="M8.0,230.5L38.8,227.2L69.6,223.2L100.4,218.4L131.2,211.5L162.0,204.3L192.8,198.4L223.6,190.2L254.4,178.9L285.2,170.1L316.0,163.3L346.8,150.7L377.6,135.9L408.4,127.9L439.2,119.2L470.0,100.9L500.8,85.0L531.6,78.9L562.4,65.9L593.2,42.0L624.0,32.0"
                class="cbf-cumulative-chart__line"
                pathLength="1"
              ></path>
              <circle cx="624" cy="32" r="5" class="cbf-cumulative-chart__end"></circle>
              <text x="8" y="252" text-anchor="start" class="cbf-cumulative-chart__tick">FY05</text>
              <text x="162" y="252" text-anchor="middle" class="cbf-cumulative-chart__tick">
                FY10
              </text>
              <!-- …and 3 more like this (<text class="[object SVGAnimatedString]">) -->
              <g class="cbf-cumulative-chart__cursor" data-cursor="" hidden="">
                <line y1="16" y2="232" class="cbf-cumulative-chart__cursor-line"></line>
                <circle r="6" class="cbf-cumulative-chart__cursor-dot"></circle>
              </g>
            </svg>
            <div
              class="cbf-cumulative-chart__readout typography-body-sm"
              aria-live="polite"
              data-readout=""
            >
              <strong>FY25</strong> · 9,800 acres to date
            </div>
            <esa-range-slider
              class="cbf-cumulative-chart__scrub"
              size="sm"
              label="Fiscal year"
              min="2005"
              max="2025"
              value="2025"
              step="1"
              data-scrub="true"
            ></esa-range-slider>
          </figure>
          <div class="cbf-metrics-growth__actions">
            <span
              class="esa-button esa-button--variant-primary esa-button--appearance-outline esa-button--md"
              ><a
                class="esa-button__native typography-microcopy-md"
                href="/cb-fish-design/program-results/estuary"
                role="button"
                ><span class="esa-button__label">View contributing contracts</span
                ><span class="esa-icon esa-icon--md" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    focusable="false"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span> </a
            ></span>
          </div>
        </div>
        <!-- …and 2 more like this (<div class="cbf-metrics-growth__stage">) -->
      </esa-tab-layout>
    </div>
  </section>
  <!-- script type="module" removed (0 bytes) -->
  <section
    class="cbf-metrics-basin"
    aria-labelledby="cbf-metrics-basin-h"
    data-basin=""
    data-metrics='[{"id":"habitat","short":"Habitat","unit":"acres","byState":{"WA":360400,"OR":318000,"ID":233200,"MT":148400}},{"id":"es… [460 characters]'
  >
    <div class="cbf-metrics-basin__head">
      <div class="cbf-metrics-basin__intro">
        <h2 id="cbf-metrics-basin-h" class="typography-heading-md">Results across the basin</h2>
        <p class="typography-body-md cbf-metrics-basin__lede">
          Since 2005, in Idaho, Montana, Oregon, and Washington. Choose a measure, then select a
          state.
        </p>
      </div>
      <esa-button-toggle size="sm" label="Measure" data-basin-measure="true"></esa-button-toggle>
    </div>
    <div class="cbf-metrics-basin__frame">
      <div class="cbf-metrics-basin__map">
        <svg viewBox="0 0 589 304" role="group" aria-label="Program states">
          <a
            href="#"
            class="cbf-metrics-basin__state is-active"
            data-state="WA"
            aria-label="Washington: 360,400 acres"
            style="--share: 1"
          >
            <path
              d="M8.3,40.0L50.0,48.0L55.6,16.0L221.5,16.0L221.5,119.2L224.5,136.0L167.3,136.0L150.0,139.2L105.6,150.0L72.2,153.2L58.4,150.0L41.7,126.0L26.4,125.2L25.0,84.0Z"
            ></path>
          </a>
          <a
            href="#"
            class="cbf-metrics-basin__state"
            data-state="OR"
            aria-label="Oregon: 318,000 acres"
            style="--share: 0.8823529411764706"
          >
            <path
              d="M26.4,125.2L41.7,126.0L58.4,150.0L72.2,153.2L105.6,150.0L150.0,139.2L167.3,136.0L224.5,136.0L237.0,152.0L228.4,172.0L215.6,204.0L225.1,224.0L221.5,232.0L221.5,296.0L22.0,296.0L12.5,262.4L25.0,192.0L29.2,144.0Z"
            ></path>
          </a>
          <!-- …and 2 more like this (<a class="[object SVGAnimatedString]">) -->
          <path
            class="cbf-metrics-basin__highlight"
            d="M8.3,40.0L50.0,48.0L55.6,16.0L221.5,16.0L221.5,119.2L224.5,136.0L167.3,136.0L150.0,139.2L105.6,150.0L72.2,153.2L58.4,150.0L41.7,126.0L26.4,125.2L25.0,84.0Z"
            data-highlight=""
            aria-hidden="true"
          ></path>
          <path
            d="M204.8,16.0L191.7,40.0L169.5,58.0L141.7,60.0L136.2,84.0L140.3,106.0L158.4,124.0L166.7,134.0L150.0,139.2L105.6,150.0L72.2,153.2L58.4,150.0L41.7,126.0L26.4,126.0"
            class="cbf-metrics-basin__river"
          ></path>
          <path
            d="M397.3,208.0L372.3,232.0L344.6,260.0L294.5,272.0L255.6,258.0L225.1,228.0L228.4,172.0L224.5,119.2L197.3,112.0L169.5,126.0L166.7,134.0"
            class="cbf-metrics-basin__river"
          ></path>
          <g
            class="cbf-metrics-basin__label"
            transform="translate(127.8 80.0)"
            data-label="WA"
            aria-hidden="true"
          >
            <text class="cbf-metrics-basin__label-code" text-anchor="middle" y="-6">WA</text>
            <text
              class="cbf-metrics-basin__label-value"
              text-anchor="middle"
              y="14"
              data-label-value=""
            >
              360,400
            </text>
          </g>
          <g
            class="cbf-metrics-basin__label"
            transform="translate(125.0 220.0)"
            data-label="OR"
            aria-hidden="true"
          >
            <text class="cbf-metrics-basin__label-code" text-anchor="middle" y="-6">OR</text>
            <text
              class="cbf-metrics-basin__label-value"
              text-anchor="middle"
              y="14"
              data-label-value=""
            >
              318,000
            </text>
          </g>
          <!-- …and 2 more like this (<g class="[object SVGAnimatedString]">) -->
        </svg>
        <div class="cbf-metrics-basin__legend typography-body-xs" aria-hidden="true">
          <span>Less</span><span class="cbf-metrics-basin__ramp"></span><span>More</span>
          <span class="cbf-metrics-basin__legend-rivers"
            ><span class="cbf-metrics-basin__river-key"></span>Columbia and Snake rivers</span
          >
        </div>
      </div>
      <aside class="cbf-metrics-basin__panel" data-panel="WA" aria-live="polite">
        <p class="cbf-metrics-basin__panel-eyebrow typography-label-xs">State results since 2005</p>
        <h3 class="cbf-metrics-basin__panel-title">Washington</h3>
        <dl class="cbf-metrics-basin__rows">
          <div class="cbf-metrics-basin__row is-current" data-row="habitat">
            <dt class="typography-body-sm">Habitat</dt>
            <dd><span class="cbf-metrics-basin__row-value">360,400</span></dd>
          </div>
          <div class="cbf-metrics-basin__row" data-row="estuary">
            <dt class="typography-body-sm">Estuary floodplain</dt>
            <dd><span class="cbf-metrics-basin__row-value">5,488</span></dd>
          </div>
          <!-- …and 2 more like this (<div class="cbf-metrics-basin__row is-current">) -->
        </dl>
        <span
          class="esa-button esa-button--variant-primary esa-button--appearance-outline esa-button--md"
          ><a
            class="esa-button__native typography-microcopy-md"
            href="http://127.0.0.1:4398/cb-fish-design/program-results/habitat"
            role="button"
            data-basin-open="true"
            ><span class="esa-button__label">View habitat contracts</span
            ><span class="esa-icon esa-icon--md" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span> </a
        ></span>
      </aside>
      <aside class="cbf-metrics-basin__panel" data-panel="OR" hidden="" aria-live="polite">
        <p class="cbf-metrics-basin__panel-eyebrow typography-label-xs">State results since 2005</p>
        <h3 class="cbf-metrics-basin__panel-title">Oregon</h3>
        <dl class="cbf-metrics-basin__rows">
          <div class="cbf-metrics-basin__row is-current" data-row="habitat">
            <dt class="typography-body-sm">Habitat</dt>
            <dd><span class="cbf-metrics-basin__row-value">318,000</span></dd>
          </div>
          <div class="cbf-metrics-basin__row" data-row="estuary">
            <dt class="typography-body-sm">Estuary floodplain</dt>
            <dd><span class="cbf-metrics-basin__row-value">4,312</span></dd>
          </div>
          <!-- …and 2 more like this (<div class="cbf-metrics-basin__row is-current">) -->
        </dl>
        <span
          class="esa-button esa-button--variant-primary esa-button--appearance-outline esa-button--md"
          ><a
            class="esa-button__native typography-microcopy-md"
            href="http://127.0.0.1:4398/cb-fish-design/program-results/habitat"
            role="button"
            data-basin-open="true"
            ><span class="esa-button__label">View habitat contracts</span
            ><span class="esa-icon esa-icon--md" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span> </a
        ></span>
      </aside>
      <!-- …and 2 more like this (<aside class="cbf-metrics-basin__panel">) -->
    </div>
  </section>
  <!-- script type="module" removed (0 bytes) -->
  <section
    class="cbf-metrics-mosaic"
    aria-labelledby="cbf-metrics-mosaic-h"
    data-mosaic=""
    data-measures='[{"label":"Habitat","value":"habitat"},{"label":"Estuary floodplain","value":"estuary"},{"label":"Fish produced","value":"fish"},{"label":"Wildlife lands","value":"wildlife"}]'
    data-splits='[{"label":"By program area","value":"program"},{"label":"By state","value":"state"}]'
  >
    <div class="cbf-metrics-mosaic__head">
      <div class="cbf-metrics-mosaic__intro">
        <h2 id="cbf-metrics-mosaic-h" class="typography-heading-md">Where the results come from</h2>
        <p class="typography-body-md cbf-metrics-mosaic__lede">
          Each block is sized by its share of the total since 2005. Select a block to see the
          contracts behind it.
        </p>
      </div>
      <div class="cbf-metrics-mosaic__pickers">
        <esa-button-toggle size="sm" label="Measure" data-pick-measure="true"></esa-button-toggle>
        <esa-button-toggle size="sm" label="Split" data-pick-split="true"></esa-button-toggle>
      </div>
    </div>
    <div class="cbf-metrics-mosaic__view" data-view="habitat:program">
      <ul
        class="cbf-metrics-mosaic__map is-wide"
        style="aspect-ratio: 1000 / 330"
        aria-label="Habitat by program area"
      >
        <li
          class="cbf-metrics-mosaic__cell"
          style="left: 0%; top: 0%; width: 48.302%; height: 100%; --i: 0"
        >
          <a
            class="cbf-metrics-mosaic__block"
            href="/cb-fish-design/program-results/habitat#program-tributary-habitat"
          >
            <svg
              class="cbf-metrics-mosaic__symbol"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M-6 18 C 22 12, 34 44, 54 48 S 78 82, 106 84"
                fill="none"
                stroke="currentColor"
                stroke-width="15"
                stroke-linecap="round"
              ></path>
              <path
                d="M30 -4 C 34 14, 30 26, 42 40"
                fill="none"
                stroke="currentColor"
                stroke-width="8"
                stroke-linecap="round"
              ></path>
            </svg>
            <span class="cbf-metrics-mosaic__pct">48%</span>
            <span class="cbf-metrics-mosaic__name">Tributary habitat</span>
            <span class="cbf-metrics-mosaic__desc"
              >Restoring streams, side channels and streamside areas where salmon and steelhead
              spawn and rear.</span
            >
            <span class="cbf-metrics-mosaic__foot">
              <span class="cbf-metrics-mosaic__value">512,000 acres</span>
              <span class="cbf-metrics-mosaic__cta" aria-hidden="true">View contracts →</span>
            </span>
          </a>
        </li>
        <li
          class="cbf-metrics-mosaic__cell"
          style="left: 48.302%; top: 0%; width: 32.17%; height: 100%; --i: 1"
        >
          <a
            class="cbf-metrics-mosaic__block"
            href="/cb-fish-design/program-results/habitat#program-wildlife-mitigation"
          >
            <svg
              class="cbf-metrics-mosaic__symbol"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <g fill="currentColor">
                <path d="M32 30 L48 62 H38 L52 82 H12 L26 62 H16 Z"></path>
                <rect x="29" y="82" width="6" height="12"></rect>
                <path d="M68 10 L88 48 H76 L92 74 H44 L60 48 H48 Z"></path>
                <rect x="65" y="74" width="7" height="20"></rect>
              </g>
            </svg>
            <span class="cbf-metrics-mosaic__pct">32%</span>
            <span class="cbf-metrics-mosaic__name">Wildlife mitigation</span>
            <span class="cbf-metrics-mosaic__desc"
              >Habitat protected for wildlife to offset lands lost to dam construction and
              reservoirs.</span
            >
            <span class="cbf-metrics-mosaic__foot">
              <span class="cbf-metrics-mosaic__value">341,000 acres</span>
              <span class="cbf-metrics-mosaic__cta" aria-hidden="true">View contracts →</span>
            </span>
          </a>
        </li>
        <!-- …and 2 more like this (<li class="cbf-metrics-mosaic__cell">) -->
      </ul>
      <ul
        class="cbf-metrics-mosaic__map is-tall"
        style="aspect-ratio: 600 / 820"
        aria-label="Habitat by program area"
      >
        <li
          class="cbf-metrics-mosaic__cell"
          style="left: 0%; top: 0%; width: 100%; height: 48.302%; --i: 0"
        >
          <a
            class="cbf-metrics-mosaic__block"
            href="/cb-fish-design/program-results/habitat#program-tributary-habitat"
          >
            <svg
              class="cbf-metrics-mosaic__symbol"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M-6 18 C 22 12, 34 44, 54 48 S 78 82, 106 84"
                fill="none"
                stroke="currentColor"
                stroke-width="15"
                stroke-linecap="round"
              ></path>
              <path
                d="M30 -4 C 34 14, 30 26, 42 40"
                fill="none"
                stroke="currentColor"
                stroke-width="8"
                stroke-linecap="round"
              ></path>
            </svg>
            <span class="cbf-metrics-mosaic__pct">48%</span>
            <span class="cbf-metrics-mosaic__name">Tributary habitat</span>
            <span class="cbf-metrics-mosaic__desc"
              >Restoring streams, side channels and streamside areas where salmon and steelhead
              spawn and rear.</span
            >
            <span class="cbf-metrics-mosaic__foot">
              <span class="cbf-metrics-mosaic__value">512,000 acres</span>
              <span class="cbf-metrics-mosaic__cta" aria-hidden="true">View contracts →</span>
            </span>
          </a>
        </li>
        <li
          class="cbf-metrics-mosaic__cell"
          style="left: 0%; top: 48.302%; width: 62.226%; height: 51.698%; --i: 1"
        >
          <a
            class="cbf-metrics-mosaic__block"
            href="/cb-fish-design/program-results/habitat#program-wildlife-mitigation"
          >
            <svg
              class="cbf-metrics-mosaic__symbol"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <g fill="currentColor">
                <path d="M32 30 L48 62 H38 L52 82 H12 L26 62 H16 Z"></path>
                <rect x="29" y="82" width="6" height="12"></rect>
                <path d="M68 10 L88 48 H76 L92 74 H44 L60 48 H48 Z"></path>
                <rect x="65" y="74" width="7" height="20"></rect>
              </g>
            </svg>
            <span class="cbf-metrics-mosaic__pct">32%</span>
            <span class="cbf-metrics-mosaic__name">Wildlife mitigation</span>
            <span class="cbf-metrics-mosaic__desc"
              >Habitat protected for wildlife to offset lands lost to dam construction and
              reservoirs.</span
            >
            <span class="cbf-metrics-mosaic__foot">
              <span class="cbf-metrics-mosaic__value">341,000 acres</span>
              <span class="cbf-metrics-mosaic__cta" aria-hidden="true">View contracts →</span>
            </span>
          </a>
        </li>
        <!-- …and 2 more like this (<li class="cbf-metrics-mosaic__cell">) -->
      </ul>
    </div>
    <div class="cbf-metrics-mosaic__view" data-view="habitat:state" hidden="">
      <ul
        class="cbf-metrics-mosaic__map is-wide"
        style="aspect-ratio: 1000 / 330"
        aria-label="Habitat by state"
      >
        <li
          class="cbf-metrics-mosaic__cell"
          style="left: 0%; top: 0%; width: 34%; height: 100%; --i: 0"
        >
          <a
            class="cbf-metrics-mosaic__block"
            href="/cb-fish-design/program-results/habitat#state-WA"
          >
            <svg
              class="cbf-metrics-mosaic__symbol is-outline"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
                d="M-0.0,29.4L19.3,33.1L21.9,18.3L98.6,18.3L98.6,66.0L100.0,73.8L73.5,73.8L65.6,75.3L45.0,80.3L29.6,81.7L23.1,80.3L15.4,69.2L8.4,68.8L7.7,49.7Z"
              ></path>
            </svg>
            <span class="cbf-metrics-mosaic__pct">34%</span>
            <span class="cbf-metrics-mosaic__name">Washington</span>
            <span class="cbf-metrics-mosaic__desc"
              >360,400 acres of habitat protected or improved in Washington.</span
            >
            <span class="cbf-metrics-mosaic__foot">
              <span class="cbf-metrics-mosaic__cta" aria-hidden="true">View contracts →</span>
            </span>
          </a>
        </li>
        <li
          class="cbf-metrics-mosaic__cell"
          style="left: 34%; top: 0%; width: 30%; height: 100%; --i: 1"
        >
          <a
            class="cbf-metrics-mosaic__block"
            href="/cb-fish-design/program-results/habitat#state-OR"
          >
            <svg
              class="cbf-metrics-mosaic__symbol is-outline"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
                d="M6.2,12.0L13.0,12.3L20.4,23.0L26.6,24.4L41.5,23.0L61.3,18.2L68.9,16.8L94.4,16.8L100.0,23.9L96.2,32.8L90.5,47.1L94.7,56.0L93.1,59.5L93.1,88.0L4.2,88.0L0.0,73.1L5.6,41.7L7.4,20.3Z"
              ></path>
            </svg>
            <span class="cbf-metrics-mosaic__pct">30%</span>
            <span class="cbf-metrics-mosaic__name">Oregon</span>
            <span class="cbf-metrics-mosaic__desc"
              >318,000 acres of habitat protected or improved in Oregon.</span
            >
            <span class="cbf-metrics-mosaic__foot">
              <span class="cbf-metrics-mosaic__cta" aria-hidden="true">View contracts →</span>
            </span>
          </a>
        </li>
        <!-- …and 2 more like this (<li class="cbf-metrics-mosaic__cell">) -->
      </ul>
      <ul
        class="cbf-metrics-mosaic__map is-tall"
        style="aspect-ratio: 600 / 820"
        aria-label="Habitat by state"
      >
        <li
          class="cbf-metrics-mosaic__cell"
          style="left: 0%; top: 0%; width: 53.125%; height: 64%; --i: 0"
        >
          <a
            class="cbf-metrics-mosaic__block"
            href="/cb-fish-design/program-results/habitat#state-WA"
          >
            <svg
              class="cbf-metrics-mosaic__symbol is-outline"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
                d="M-0.0,29.4L19.3,33.1L21.9,18.3L98.6,18.3L98.6,66.0L100.0,73.8L73.5,73.8L65.6,75.3L45.0,80.3L29.6,81.7L23.1,80.3L15.4,69.2L8.4,68.8L7.7,49.7Z"
              ></path>
            </svg>
            <span class="cbf-metrics-mosaic__pct">34%</span>
            <span class="cbf-metrics-mosaic__name">Washington</span>
            <span class="cbf-metrics-mosaic__desc"
              >360,400 acres of habitat protected or improved in Washington.</span
            >
            <span class="cbf-metrics-mosaic__foot">
              <span class="cbf-metrics-mosaic__cta" aria-hidden="true">View contracts →</span>
            </span>
          </a>
        </li>
        <li
          class="cbf-metrics-mosaic__cell"
          style="left: 53.125%; top: 0%; width: 46.875%; height: 64%; --i: 1"
        >
          <a
            class="cbf-metrics-mosaic__block"
            href="/cb-fish-design/program-results/habitat#state-OR"
          >
            <svg
              class="cbf-metrics-mosaic__symbol is-outline"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
                d="M6.2,12.0L13.0,12.3L20.4,23.0L26.6,24.4L41.5,23.0L61.3,18.2L68.9,16.8L94.4,16.8L100.0,23.9L96.2,32.8L90.5,47.1L94.7,56.0L93.1,59.5L93.1,88.0L4.2,88.0L0.0,73.1L5.6,41.7L7.4,20.3Z"
              ></path>
            </svg>
            <span class="cbf-metrics-mosaic__pct">30%</span>
            <span class="cbf-metrics-mosaic__name">Oregon</span>
            <span class="cbf-metrics-mosaic__desc"
              >318,000 acres of habitat protected or improved in Oregon.</span
            >
            <span class="cbf-metrics-mosaic__foot">
              <span class="cbf-metrics-mosaic__cta" aria-hidden="true">View contracts →</span>
            </span>
          </a>
        </li>
        <!-- …and 2 more like this (<li class="cbf-metrics-mosaic__cell">) -->
      </ul>
    </div>
    <!-- …and 6 more like this (<div class="cbf-metrics-mosaic__view">) -->
  </section>
  <!-- script type="module" removed (0 bytes) -->
  <section class="cbf-metrics-equivalents" aria-labelledby="cbf-metrics-equivalents-h">
    <div class="cbf-metrics-equivalents__head">
      <h2 id="cbf-metrics-equivalents-h" class="typography-heading-md">
        Results at everyday scale
      </h2>
      <p class="typography-body-md cbf-metrics-equivalents__lede">
        What twenty years of work adds up to, measured against places people know. Open a row to see
        it.
      </p>
    </div>
    <ul class="cbf-metrics-equivalents__list">
      <li>
        <details class="esa-collapsible esa-collapsible--flush" open="">
          <summary class="esa-collapsible__summary typography-label-sm-strong">
            <span class="esa-collapsible__title"
              >Habitat: 1.06 million acres, about 20 times the size of the city of Seattle.</span
            >
          </summary>
          <div class="esa-collapsible__body typography-body-md">
            <div class="cbf-metrics-equivalents__detail">
              <p class="typography-label-sm cbf-metrics-equivalents__key">
                Each shape is the size of the city of Seattle, about 53,600 acres
              </p>
              <div class="cbf-metrics-equivalents__strip" aria-hidden="true">
                <span class="cbf-metrics-equivalents__unit" style="--k: 0"></span
                ><span class="cbf-metrics-equivalents__unit" style="--k: 1"></span>
                <span
                  class="cbf-metrics-equivalents__unit is-part"
                  style="--k: 19; --part: 0.7761194029850742"
                ></span
                ><!-- …and 17 more like this (<span class="cbf-metrics-equivalents__unit">) -->
              </div>
              <span
                class="esa-button esa-button--variant-primary esa-button--appearance-outline esa-button--sm"
                ><a
                  class="esa-button__native typography-microcopy-xs"
                  href="/cb-fish-design/program-results/habitat"
                  role="button"
                  ><span class="esa-button__label"> View contributing contracts </span
                  ><span class="esa-icon esa-icon--sm" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      focusable="false"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span> </a
              ></span>
            </div>
          </div>
        </details>
      </li>
      <li>
        <details class="esa-collapsible esa-collapsible--flush">
          <summary class="esa-collapsible__summary typography-label-sm-strong">
            <span class="esa-collapsible__title"
              >Estuary floodplain: 9,800 acres, about 64 times the size of Ann Morrison Park in
              Boise.</span
            >
          </summary>
          <div class="esa-collapsible__body typography-body-md">
            <div class="cbf-metrics-equivalents__detail">
              <p class="typography-label-sm cbf-metrics-equivalents__key">
                Each shape is the size of Ann Morrison Park in Boise, about 153 acres
              </p>
              <div class="cbf-metrics-equivalents__strip" aria-hidden="true">
                <span class="cbf-metrics-equivalents__unit" style="--k: 0"></span
                ><span class="cbf-metrics-equivalents__unit" style="--k: 1"></span
                ><!-- …and 38 more like this (<span class="cbf-metrics-equivalents__unit">) -->
                <span class="cbf-metrics-equivalents__more typography-label-sm">+ 24 more</span>
              </div>
              <span
                class="esa-button esa-button--variant-primary esa-button--appearance-outline esa-button--sm"
                ><a
                  class="esa-button__native typography-microcopy-xs"
                  href="/cb-fish-design/program-results/estuary"
                  role="button"
                  ><span class="esa-button__label"> View contributing contracts </span
                  ><span class="esa-icon esa-icon--sm" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      focusable="false"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span> </a
              ></span>
            </div>
          </div>
        </details>
      </li>
      <!-- …and 2 more like this (<li>) -->
    </ul>
    <p class="typography-body-xs cbf-metrics-equivalents__note">
      Comparisons use approximate public sizes and are computed from each total.
    </p>
  </section>
  <section
    class="cbf-metrics-table"
    aria-labelledby="cbf-metrics-table-h"
    data-metrics-table=""
    data-years='[{"label":"FY25","value":"2025"},{"label":"FY24","value":"2024"},{"label":"FY23","value":"2023"},{"label":"FY22","value":"2022"},{"label":"FY21","value":"2021"}]'
  >
    <div class="cbf-metrics-table__head">
      <div class="cbf-metrics-table__intro">
        <h2 id="cbf-metrics-table-h" class="typography-heading-md">Current metrics</h2>
        <p class="typography-body-md cbf-metrics-table__lede">
          One year's results next to the running total since 2005. Choose a fiscal year; select a
          row for its contracts.
        </p>
      </div>
      <esa-button-toggle size="sm" label="Fiscal year" data-year-pick="true"></esa-button-toggle>
    </div>
    <div class="cbf-metrics-table__scroll">
      <table class="cbf-metrics-table__table">
        <caption class="visually-hidden">
          Program results by area: selected fiscal year and cumulative since 2005
        </caption>
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Description</th>
            <th scope="col" class="is-num"><span data-year-head="">FY25</span></th>
            <th scope="col" class="is-num">Since 2005</th>
            <th scope="col"><span class="visually-hidden">Trend, FY05 to FY25</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            data-row=""
            data-by-year='{"2021":74969,"2022":17314,"2023":55201,"2024":112773,"2025":35722}'
            data-total="1060000"
            data-unit="acres"
          >
            <th scope="row" class="cbf-metrics-table__area">Tributary habitat restoration</th>
            <td>
              <a class="cbf-metrics-table__link" href="/cb-fish-design/program-results/habitat"
                >Acres of habitat protected or improved</a
              >
            </td>
            <td class="is-num">
              <span class="cbf-metrics-table__year" data-year-value="">35,722</span>
              <span class="cbf-metrics-table__share-text typography-body-xs" data-year-share="">
                3.4% of total
              </span>
            </td>
            <td class="is-num cbf-metrics-table__total">1,060,000</td>
            <td class="cbf-metrics-table__spark-cell">
              <svg
                class="cbf-metrics-table__spark"
                viewBox="0 0 100 24"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0.0,21.6L5.0,20.9L10.0,20.3L15.0,19.6L20.0,18.6L25.0,17.7L30.0,17.1L35.0,16.1L40.0,14.9L45.0,14.0L50.0,13.4L55.0,12.1L60.0,10.6L65.0,10.0L70.0,9.3L75.0,7.6L80.0,6.2L85.0,5.8L90.0,4.8L95.0,2.7L100.0,2.0"
                ></path>
              </svg>
            </td>
          </tr>
          <tr
            data-row=""
            data-by-year='{"2021":782,"2022":297,"2023":636,"2024":1172,"2025":491}'
            data-total="9800"
            data-unit="acres"
          >
            <th scope="row" class="cbf-metrics-table__area">Estuary habitat restoration</th>
            <td>
              <a class="cbf-metrics-table__link" href="/cb-fish-design/program-results/estuary"
                >Acres of estuary floodplain reconnected</a
              >
            </td>
            <td class="is-num">
              <span class="cbf-metrics-table__year" data-year-value="">491</span>
              <span class="cbf-metrics-table__share-text typography-body-xs" data-year-share="">
                5.0% of total
              </span>
            </td>
            <td class="is-num cbf-metrics-table__total">9,800</td>
            <td class="cbf-metrics-table__spark-cell">
              <svg
                class="cbf-metrics-table__spark"
                viewBox="0 0 100 24"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0.0,21.8L5.0,21.5L10.0,21.1L15.0,20.6L20.0,20.0L25.0,19.2L30.0,18.6L35.0,17.8L40.0,16.7L45.0,15.8L50.0,15.1L55.0,13.9L60.0,12.4L65.0,11.6L70.0,10.7L75.0,8.9L80.0,7.3L85.0,6.7L90.0,5.4L95.0,3.0L100.0,2.0"
                ></path>
              </svg>
```
