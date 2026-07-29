// Work elements — mock "Produce Design" work statement elements under contract
// 84051 REL 50 (the same contract already hardcoded into the Habitat Design
// Tool's toolbar). Invented, not derived: names/descriptions are fictional,
// composed for this prototype rather than transcribed from any real SOW — but
// use real Columbia Basin tributary names for domain credibility, matching the
// biochar-design convention this repo's mock-data rules point to.
//
// Only WE H has a live design-tool session — its contract/COR/FY already match
// what map-sow.astro hardcodes. The others are shown for context (a work
// element list has more than one row) but aren't wired to anything yet.
export interface WorkElement {
  letter: string;
  weType: string;
  name: string;
  description: string;
  contractNum: string;
  budgetPct: number;
  status: 'in-progress' | 'not-started';
  designToolHref?: string;
}

export const workElements: WorkElement[] = [
  {
    letter: 'H',
    weType: '175. Produce Design',
    name: 'Upper Chewuch Floodplain Enhancement',
    description:
      'Design phase for reconnecting the Upper Chewuch River to its historic floodplain — draw the designed channel and floodplain extent, then compute pre- and post-project metrics for the SOW.',
    contractNum: '84051 REL 50',
    budgetPct: 5,
    status: 'in-progress',
    designToolHref: '/map-sow',
  },
  {
    letter: 'M',
    weType: '175. Produce Design',
    name: 'Salmon Creek Floodplain Design',
    description:
      'Salmon Creek has been identified as a priority reach for floodplain reconnection design work.',
    contractNum: '84051 REL 50',
    budgetPct: 10,
    status: 'not-started',
  },
  {
    letter: 'N',
    weType: '175. Produce Design',
    name: 'Omak Creek Instream Complexity',
    description:
      'Design phase for adding instream structure and channel complexity along a degraded reach of Omak Creek.',
    contractNum: '84051 REL 50',
    budgetPct: 10,
    status: 'not-started',
  },
];
