// ── Places: the standard list a travel destination is picked from ────────────
// A destination is picked, not typed, so it can be matched to the GSA per-diem
// rate area that prices it. GSA sets those rates by COUNTY, so every place here
// carries its county. GSA publishes rates for the continental U.S. only, and a
// LIB claims the standard CONUS rate anywhere else — so the list is U.S. places
// (this prototype ships the Columbia Basin states; see
// scripts/build-gsa-places.mjs), plus ONE choice for everywhere else, which
// keeps whatever the vendor wrote so the COR can still read where it was.
//
// A destination is stored as its canonical display string, which every other
// part of the LIB already reads (labels, trip heads, the claim dialog):
//   "Gresham, OR"                          a place in one county
//   "Portland, OR (Multnomah County)"      a place that spans counties — one per county
//   "Klickitat County, WA"                 a county, for anywhere that isn't a town
//   "Outside the U.S. — Vancouver, BC"     everywhere GSA doesn't price
import data from './conus-places.json' with { type: 'json' };

export const OUTSIDE_US = 'Outside the U.S.';
const OUTSIDE_PREFIX = `${OUTSIDE_US} — `;

/** Every pickable destination: { value, name, st, county, kind, lat, lon }. */
export const PLACES = (() => {
  const byName = new Map();
  for (const [name, st, county, lat, lon] of data.places) {
    const k = `${name}|${st}`;
    if (!byName.has(k)) byName.set(k, []);
    byName.get(k).push({ name, st, county, lat, lon });
  }
  const out = [];
  for (const rows of byName.values()) {
    const many = rows.length > 1;
    for (const r of rows) {
      out.push({
        ...r,
        kind: 'place',
        value: many ? `${r.name}, ${r.st} (${r.county} County)` : `${r.name}, ${r.st}`,
      });
    }
  }
  for (const [county, st] of data.counties) {
    out.push({ name: `${county} County`, st, county, kind: 'county', value: `${county} County, ${st}` });
  }
  return out;
})();
const BY_VALUE = new Map(PLACES.map((p) => [p.value, p]));

/** The states the list covers — said in the picker's help text. */
export const PLACE_STATES = data.states;

export const isOutsideUS = (loc) => String(loc ?? '').startsWith(OUTSIDE_US);
export const outsideUS = (where) => (String(where ?? '').trim() ? `${OUTSIDE_PREFIX}${String(where).trim()}` : OUTSIDE_US);

/**
 * The picked place behind a destination string, or null. A bare "City, ST" for
 * a city that spans counties (older entries, and what people type) is read as
 * the county whose rate area carries the city's name — "Portland, OR" is the
 * Portland rate area, Multnomah County — and otherwise its first county.
 */
export function placeOf(loc, preferCounty = null) {
  const s = String(loc ?? '').trim();
  if (!s || isOutsideUS(s)) return null;
  const exact = BY_VALUE.get(s);
  if (exact) return exact;
  const m = s.match(/^(.+?),\s*([A-Z]{2})$/);
  if (!m) return null;
  const rows = PLACES.filter((p) => p.kind === 'place' && p.name === m[1] && p.st === m[2]);
  if (!rows.length) return null;
  return (preferCounty && rows.find((p) => preferCounty(p))) || rows[0];
}

/** Whether a destination is one the list knows (or the "outside" choice). */
export const isStandardPlace = (loc) => isOutsideUS(loc) || !!placeOf(loc);

/** An option for esa-combobox: the stored value, and a label that names the county. */
export const placeOption = (loc) => {
  const s = String(loc ?? '').trim();
  if (!s) return null;
  if (isOutsideUS(s)) return { value: s, label: s };
  const p = BY_VALUE.get(s);
  if (!p) return { value: s, label: s };
  return { value: p.value, label: p.kind === 'county' || p.value.includes('County)') ? p.value : `${p.value} · ${p.county} County` };
};

const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * The best matches for what's been typed, for the picker to show — never the
 * whole list (a combobox that renders 2,000 rows on focus is unusable). Name
 * prefix first, then a word prefix, then anywhere; "gresham or" narrows by
 * state. Always offers "Outside the U.S." with what was typed, and always keeps
 * the current value in the list so the field can still display it.
 */
export function placeOptions(term, current = '', limit = 25) {
  const t = norm(term);
  const opts = [];
  if (t) {
    const parts = t.split(' ');
    const st = parts.length > 1 && parts[parts.length - 1].length === 2 ? parts[parts.length - 1].toUpperCase() : null;
    const q = st ? parts.slice(0, -1).join(' ') : t;
    const scored = [];
    for (const p of PLACES) {
      if (st && p.st !== st) continue;
      const n = norm(p.name);
      const score = n.startsWith(q) ? 0 : n.split(' ').some((w) => w.startsWith(q)) ? 1 : n.includes(q) ? 2 : -1;
      if (score >= 0) scored.push([score + (p.kind === 'county' ? 0.5 : 0), p]);
    }
    scored.sort((a, b) => a[0] - b[0] || a[1].name.localeCompare(b[1].name) || a[1].st.localeCompare(b[1].st));
    for (const [, p] of scored.slice(0, limit)) opts.push(placeOption(p.value));
    opts.push({ value: outsideUS(term), label: `${outsideUS(term)} — standard CONUS rate` });
  }
  const cur = placeOption(current);
  if (cur && !opts.some((o) => o.value === cur.value)) opts.unshift(cur);
  return opts;
}
