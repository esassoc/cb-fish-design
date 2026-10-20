#!/usr/bin/env node
// build-gsa-places — regenerate the LIB's place list and GSA per-diem rates.
//
// WHY: a travel destination is picked from a standard list rather than typed, so
// it can be matched to the GSA per-diem rate area that prices it. GSA sets those
// rates by COUNTY ("Portland" is Multnomah County; Gresham, in Multnomah, takes
// Portland's rate), so each place carries its county. GSA publishes rates for
// the continental U.S. only; anywhere else is one "outside the U.S." choice that
// claims the standard CONUS rate (src/data/lib-entry.mjs).
//
// INPUTS (download into one directory, pass it as the argument):
//   gsa-<st>-<fy>.json   GSA Per Diem API, one per state and fiscal year:
//                        https://api.gsa.gov/travel/perdiem/v2/rates/state/<ST>/year/<FY>?api_key=<key>
//   place_county.txt     Census places by county (public domain):
//                        https://www2.census.gov/geo/docs/reference/codes2020/national_place_by_county2020.txt
//   gaz_place.txt        Census Gazetteer places, for coordinates (public domain):
//                        https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2023_Gazetteer/2023_Gaz_place_national.zip
//
// OUTPUTS: src/data/gsa-per-diem.json and src/data/conus-places.json.
//
// Run once a year, after GSA publishes the next fiscal year (August):
//   node scripts/build-gsa-places.mjs <download-dir>
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const STATES = ['WA', 'OR', 'ID', 'MT']; // the Columbia Basin slice this prototype ships
const dir = process.argv[2];
if (!dir) { console.error('usage: node scripts/build-gsa-places.mjs <download-dir>'); process.exit(1); }
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data');

// ── GSA per-diem rate areas ──────────────────────────────────────────────────
const years = {};
const standard = {};
for (const f of readdirSync(dir).filter((n) => /^gsa-[a-z]{2}-\d{4}\.json$/.test(n))) {
  const [, st, fy] = f.match(/^gsa-([a-z]{2})-(\d{4})\.json$/);
  const data = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  for (const r of data.rates ?? []) {
    for (const x of r.rate ?? []) {
      // Lodging by CALENDAR month number (1–12) within the fiscal year.
      const lodging = Array(12).fill(0);
      for (const m of x.months?.month ?? []) lodging[m.number - 1] = Number(m.value);
      if (String(x.city).trim() === 'Standard Rate') {
        standard[fy] = { mie: Number(x.meals), lodging: lodging[0] };
        continue;
      }
      (years[fy] ??= []).push({
        state: st.toUpperCase(),
        area: String(x.city).replace(/\s*\/\s*/g, ' / ').trim(),
        counties: String(x.county ?? '').split('/').map((c) => c.trim()).filter(Boolean),
        mie: Number(x.meals),
        lodging,
      });
    }
  }
}
for (const fy of Object.keys(years)) years[fy].sort((a, b) => a.state.localeCompare(b.state) || a.area.localeCompare(b.area));

writeFileSync(join(out, 'gsa-per-diem.json'), JSON.stringify({
  source: 'GSA Per Diem API v2 (api.gsa.gov/travel/perdiem), by state and fiscal year',
  states: STATES,
  standard,
  years,
}, null, 1) + '\n');

// ── Places, with their counties ──────────────────────────────────────────────
// Coordinates from the Gazetteer, keyed by GEOID (state FIPS + place FIPS).
const coords = new Map();
for (const row of readFileSync(join(dir, 'gaz_place.txt'), 'utf8').split('\n').slice(1)) {
  const c = row.split('\t');
  if (c.length > 11) coords.set(c[1], [Number(Number(c[10]).toFixed(3)), Number(Number(c[11]).toFixed(3))]);
}
const LSAD = / (city|town|village|CDP|city and borough|municipality)$/;
const places = [];
const counties = new Map();
for (const row of readFileSync(join(dir, 'place_county.txt'), 'utf8').split('\n').slice(1)) {
  const c = row.split('|');
  const st = c[0];
  if (!STATES.includes(st)) continue;
  const county = c[3].replace(/ County$/, '');
  counties.set(`${st}|${county}`, { st, county });
  const geoid = c[1] + c[4];
  const name = c[6].replace(LSAD, '').trim();
  const [lat, lon] = coords.get(geoid) ?? [null, null];
  places.push([name, st, county, lat, lon]);
}
places.sort((a, b) => a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]) || a[2].localeCompare(b[2]));

writeFileSync(join(out, 'conus-places.json'), JSON.stringify({
  source: 'U.S. Census Bureau — places by county (2020) and Gazetteer places (2023), public domain',
  states: STATES,
  // [name, state, county, lat, lon] — one row per place PER county it spans.
  places,
  counties: [...counties.values()].sort((a, b) => a.st.localeCompare(b.st) || a.county.localeCompare(b.county)).map((x) => [x.county, x.st]),
}) + '\n');

console.log(`rate areas: ${Object.entries(years).map(([fy, a]) => `FY${fy} ${a.length}`).join(', ')}; places: ${places.length}; counties: ${counties.size}`);
