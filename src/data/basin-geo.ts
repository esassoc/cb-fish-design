// Schematic geography for the four program states — shared by the basin map
// (cbf-metrics-basin) and the state watermarks in the results mosaic
// (cbf-metrics-mosaic). Deliberately coarse: a dozen-odd points per state,
// recognisable at a glance, light enough to inline. A real build would use
// the subbasin geometry CBFish already maps.
import type { StateCode } from './cbfish-home-metrics';

// [lon, lat] rings, roughly traced.
export const OUTLINES: Record<StateCode, [number, number][]> = {
  WA: [[-124.7,48.4],[-123.2,48.2],[-123.0,49.0],[-117.03,49.0],[-117.03,46.42],[-116.92,46.0],[-118.98,46.0],[-119.6,45.92],[-121.2,45.65],[-122.4,45.57],[-122.9,45.65],[-123.5,46.25],[-124.05,46.27],[-124.1,47.3]],
  OR: [[-124.05,46.27],[-123.5,46.25],[-122.9,45.65],[-122.4,45.57],[-121.2,45.65],[-119.6,45.92],[-118.98,46.0],[-116.92,46.0],[-116.47,45.6],[-116.78,45.1],[-117.24,44.3],[-116.9,43.8],[-117.03,43.6],[-117.03,42.0],[-124.21,42.0],[-124.55,42.84],[-124.1,44.6],[-123.95,45.8]],
  ID: [[-117.03,49.0],[-116.05,49.0],[-116.05,47.98],[-115.7,47.42],[-114.6,46.65],[-114.4,45.6],[-113.45,44.86],[-112.8,44.43],[-111.05,44.5],[-111.05,42.0],[-117.03,42.0],[-117.03,43.6],[-116.9,43.8],[-117.24,44.3],[-116.78,45.1],[-116.47,45.6],[-116.92,46.0],[-117.03,46.42]],
  MT: [[-116.05,49.0],[-104.05,49.0],[-104.05,45.0],[-111.05,45.0],[-111.05,44.5],[-112.8,44.43],[-113.45,44.86],[-114.4,45.6],[-114.6,46.65],[-115.7,47.42],[-116.05,47.98]],
};
export const RIVERS: [number, number][][] = [
  // Columbia: from the Canadian border down to the Pacific
  [[-117.63,49.0],[-118.1,48.4],[-118.9,47.95],[-119.9,47.9],[-120.1,47.3],[-119.95,46.75],[-119.3,46.3],[-119.0,46.05],[-119.6,45.92],[-121.2,45.65],[-122.4,45.57],[-122.9,45.65],[-123.5,46.25],[-124.05,46.25]],
  // Snake: from Yellowstone across southern Idaho, up Hells Canyon, into the Columbia
  [[-110.7,44.2],[-111.6,43.6],[-112.6,42.9],[-114.4,42.6],[-115.8,42.95],[-116.9,43.7],[-116.78,45.1],[-116.92,46.42],[-117.9,46.6],[-118.9,46.25],[-119.0,46.05]],
];

const COS46 = Math.cos((46 * Math.PI) / 180);

/** One state's outline as an SVG path fitted (centred, aspect kept) into a
    `size` x `size` box — for using a state's shape as a symbol. */
export function stateSymbolPath(code: StateCode, size = 100): string {
  const pts = OUTLINES[code].map(([lon, lat]) => [lon * COS46, -lat] as const);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs), minY = Math.min(...ys);
  const w = Math.max(...xs) - minX, h = Math.max(...ys) - minY;
  const k = size / Math.max(w, h);
  const ox = (size - w * k) / 2, oy = (size - h * k) / 2;
  return 'M' + pts.map(([x, y]) => `${(ox + (x - minX) * k).toFixed(1)},${(oy + (y - minY) * k).toFixed(1)}`).join('L') + 'Z';
}
