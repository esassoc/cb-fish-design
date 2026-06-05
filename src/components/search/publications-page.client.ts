// /publications — the document (full-text) search results page. Publications fork
// out of the unified search into this prod-style "By Text in Documents" experience
// (CBF-8117). Static mock corpus here; a real impl would hit the Report Center's
// full-text index. Filters the corpus by the q param / live input and paints the
// prod result shape: [pdf] · title link · snippet · green /Document.mvc/Viewer path.
import { esc } from './omni-render';

interface Doc {
  title: string;
  snippet: string;
  docId: string; // e.g. 00004235-7  →  /Document.mvc/Viewer/00004235-7
  format?: string; // pdf | docx …
}

// CBFish-flavored corpus; titles/IDs echo the real Report Center so the demo reads true.
const DOCS: Doc[] = [
  { title: 'Fall Chinook Acclimation Project', docId: '00004235-7', snippet: 'Fall Chinook Acclimation Project Pittsburg Landing, Captain John Rapids, and Big Canyon Annual Report 2005 June 2006 DOE/BP-00004235-7 This Document should be cited as follows' },
  { title: 'Fall Chinook Acclimation Project', docId: '00004235-6', snippet: 'Fall Chinook Acclimation Project Pittsburg Landing, Captain John Rapids, and Big Canyon Annual Report 2004 January 2006 DOE/BP-00004235-6 This Document should be cited as follows' },
  { title: 'Fall Chinook Acclimation Project', docId: '00004235-2', snippet: 'Fall Chinook Acclimation Project Pittsburg Landing, Captain John Rapids, and Big Canyon Annual Report 2000 January 2006 DOE/BP-00004235-2 This Document should be cited as follows' },
  { title: 'Fall Chinook Acclimation Project', docId: '00004235-3', snippet: 'Fall Chinook Acclimation Project Pittsburg Landing, Captain John Rapids, and Big Canyon Annual Report 2001 January 2004 DOE/BP-00004235-3 This Document should be cited as follows' },
  { title: 'Fall Chinook Acclimation Project', docId: '00004235-1', snippet: 'Fall Chinook Acclimation Project Pittsburg Landing, Captain John Rapids, and Big Canyon Annual Report 1999 - 1999 DOE/BP-00004235-1 March 2004 This Document should be cited' },
  { title: 'Fall Chinook Acclimation Project', docId: '00004235-4', snippet: 'Fall Chinook Acclimation Project Pittsburg Landing, Captain John Rapids, and Big Canyon Annual Report 2002 January 2003 DOE/BP-00004235-4 This Document should be cited as follows' },
  { title: 'Fall Chinook Acclimation Project', docId: '00004235-5', snippet: 'Fall Chinook Acclimation Project Pittsburg Landing, Captain John Rapids, and Big Canyon Annual Report 2003 January 2004 DOE/BP-00004235-5 This Document should be cited as follows' },
  { title: 'Fall Chinook Acclimation Project', docId: 'P122109', snippet: 'Fall Chinook Acclimation Project Annual Report 2009 Prepared by: Bruce M. McLeod Nez Perce Tribe Department of Fisheries Resources Management' },
  { title: 'Habitat for Fall Chinook and Steelhead', docId: '00017137-1', snippet: 'Habitat for Fall Chinook and Steelhead Habitat Conservation Projects Progress Report 2004 - 2005 April 2006 DOE/BP-00017137-1 This Document should be cited as follows: Bartels' },
  { title: 'Smolt Monitoring Program Annual Report', docId: '00005639-1', snippet: 'Smolt Monitoring Program Annual Report describing juvenile salmonid passage, survival estimates, and PIT-tag detections across the Snake and Columbia River hydrosystem' },
  { title: 'John Day Subbasin Steelhead Spawning Survey', docId: '00021544-2', snippet: 'John Day Salmonid Monitoring Program steelhead redd counts and spawning ground surveys for the mainstem John Day River and major tributaries, 2007 - 2008' },
  { title: 'Salmon River Subbasin Plan', docId: 'P099821', snippet: 'Subbasin Plan: Salmon River — assessment, inventory, and management plan addressing anadromous fish recovery priorities under the Fish & Wildlife Program' },
  { title: 'Hood River Production Program Monitoring & Evaluation', docId: '00004001-9', snippet: 'Hood River Production Program steelhead and spring chinook hatchery monitoring and evaluation, supplementation outcomes, and natural production trends' },
  { title: 'Rattlesnake Creek Salmonid Production Review', docId: 'P112233', snippet: 'Salmonid Production in Restored Rattlesnake Creek — habitat restoration effectiveness monitoring, juvenile rearing density, and out-migration timing' },
];

const PAGE_SIZE = 10;

export function initPublicationsPage(): void {
  const root = document.querySelector<HTMLElement>('[data-pubs-page]');
  if (!root) return;
  const input = root.querySelector<HTMLInputElement>('[data-pubs-input]')!;
  const resultsEl = root.querySelector<HTMLElement>('[data-pubs-results]')!;
  const searchBtn = root.querySelector<HTMLButtonElement>('[data-pubs-search]')!;
  const clearBtn = root.querySelector<HTMLButtonElement>('[data-pubs-clear]')!;

  input.value = new URLSearchParams(window.location.search).get('q') ?? '';

  function syncUrl(): void {
    const q = input.value.trim();
    window.history.replaceState(null, '', window.location.pathname + (q ? `?q=${encodeURIComponent(q)}` : ''));
  }

  function matches(q: string): Doc[] {
    const needle = q.trim().toLowerCase();
    if (!needle) return DOCS;
    return DOCS.filter((d) => (d.title + ' ' + d.snippet).toLowerCase().includes(needle));
  }

  // highlight only inside the snippet (cheap term emphasis, like prod's bolding)
  function emphasize(text: string, q: string): string {
    const needle = q.trim();
    if (!needle) return esc(text);
    const i = text.toLowerCase().indexOf(needle.toLowerCase());
    if (i === -1) return esc(text);
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + needle.length)) + '</mark>' + esc(text.slice(i + needle.length));
  }

  function pageLinks(total: number): string {
    const pages = Math.max(1, Math.min(10, Math.ceil(total / PAGE_SIZE)));
    if (pages <= 1) return '';
    const nums = Array.from({ length: pages }, (_, i) =>
      i === 0
        ? `<strong class="cbf-pubs__page is-current">${i + 1}</strong>`
        : `<a class="cbf-pubs__page" href="#">${i + 1}</a>`,
    ).join(' ');
    return `<span class="cbf-pubs__pages">Result Page: ${nums}</span>`;
  }

  function render(): void {
    const q = input.value;
    const found = matches(q);

    if (q.trim().length > 0 && q.trim().length < 3) {
      resultsEl.innerHTML = `<p class="cbf-pubs__empty">Minimum search term length is 3 characters.</p>`;
      return;
    }
    if (found.length === 0) {
      resultsEl.innerHTML = `<p class="cbf-pubs__empty">No documents matched &ldquo;${esc(q.trim())}&rdquo;. Try a different keyword.</p>`;
      return;
    }

    const shown = found.slice(0, PAGE_SIZE);
    const head = `<div class="cbf-pubs__bar">
        <span class="cbf-pubs__count">Showing 1-${shown.length} of ${found.length}</span>
        ${pageLinks(found.length)}
      </div>`;
    const list = shown
      .map((d) => {
        const fmt = (d.format ?? 'pdf').toLowerCase();
        return `<article class="cbf-pubs__doc">
          <h2 class="cbf-pubs__doc-title">
            <span class="cbf-pubs__fmt">[${esc(fmt)}]</span>
            <a href="#">${esc(d.title)}</a>
          </h2>
          <p class="cbf-pubs__snippet">${emphasize(d.snippet, q)}</p>
          <a class="cbf-pubs__path" href="#">/Document.mvc/Viewer/${esc(d.docId)}</a>
        </article>`;
      })
      .join('');
    resultsEl.innerHTML = head + `<div class="cbf-pubs__list">${list}</div>`;
  }

  input.addEventListener('input', () => { syncUrl(); render(); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); syncUrl(); render(); } });
  searchBtn.addEventListener('click', () => { syncUrl(); render(); });
  clearBtn.addEventListener('click', () => { input.value = ''; syncUrl(); render(); input.focus(); });

  render();
  input.focus();
}
