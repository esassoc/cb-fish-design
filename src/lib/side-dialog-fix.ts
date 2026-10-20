/**
 * Workaround — docs/hub-issues.md "esa-side-dialog — position='right' renders on
 * the left, content-height". The lego sets right/top/bottom on its panel but never
 * clears the UA dialog's `left: 0` and `height: fit-content`, so a right drawer
 * pins left and shrinks to its content. This appends the two missing declarations
 * to one instance's shadow root. Delete it (and its call sites) once the hub
 * clears them itself.
 */
export function fixSideDialog(el: Element | null | undefined): void {
  if (!el) return;
  customElements.whenDefined('esa-side-dialog').then(async () => {
    await (el as any).updateComplete;
    const root = (el as HTMLElement).shadowRoot;
    if (!root || root.querySelector('style[data-cbf-fix]')) return;
    const fix = document.createElement('style');
    fix.dataset.cbfFix = '';
    fix.textContent = `:host([position='right']) dialog.panel { left: auto; height: auto; }
      :host([position='left']) dialog.panel { right: auto; height: auto; }`;
    root.appendChild(fix);
  });
}
