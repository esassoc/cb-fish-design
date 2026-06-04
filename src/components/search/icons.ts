// Inline Lucide glyphs the search feature needs. The hub's esa-icon ships a fixed
// set that lacks several of these (history, folder, book, wallet, venetian-mask,
// rotate-ccw), and the hub is a file: dependency we don't edit — so the spoke
// carries its own small set. One source feeds both build-time (.astro via svg())
// and runtime (the client script builds result rows as HTML strings).
//
// Paths copied from lucide.dev: 24×24, stroke-based, stroke-width 2.

export type IconName =
  | 'search' | 'x' | 'chevron-right' | 'chevron-down'
  | 'folder' | 'file-text' | 'users' | 'book' | 'wallet'
  | 'history' | 'hat-glasses' | 'rotate-ccw'
  | 'circle-user' | 'layout-dashboard';

const ICONS: Record<IconName, string> = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 1-1 1v-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  'hat-glasses': '<path d="M14 18a2 2 0 0 0-4 0"/><path d="m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 11 4H8.5"/><path d="m4 11 2.71-6.715a2 2 0 0 1 2.836-1.187L11 4"/><path d="M4.5 11h15a1 1 0 0 1 1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5a2.5 2.5 0 0 1-2.5-2.5v-.5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v.5a2.5 2.5 0 0 1-2.5 2.5h-.5A2.5 2.5 0 0 1 3.5 12.5V12a1 1 0 0 1 1-1Z"/>',
  'rotate-ccw': '<path d="M3 2v6h6"/><path d="M3 8a9 9 0 1 0 2.83-2.83L3 8"/>',
  'circle-user': '<circle cx="12" cy="12" r="10"/><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/>',
  'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
};

/** Full <svg> string for inline use (set:html in .astro, or innerHTML in JS). */
export function svg(name: IconName, px = 16): string {
  return `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] ?? ''}</svg>`;
}
