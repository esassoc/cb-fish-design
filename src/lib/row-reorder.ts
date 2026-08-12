/**
 * cbf-row-reorder — direct-manipulation ordering and grouping for a list of rows.
 *
 * ── WHY THIS IS A SHARED MODULE AND NOT A COMPONENT ─────────────────────────
 * The three LIB entry surfaces disagree about MARKUP — the grid orders `<tr>`s
 * inside a `<tbody>`, the wizard orders `<article>` cards inside a nested
 * container — but they agree completely about the INTERACTION: grab a row, move
 * it among its siblings, and (in Travel) drop it ONTO another row to make the
 * two of them a trip. Writing that three times would give the prototype three
 * subtly different drag feels, which is the one thing a design prototype must
 * not ship. So the gesture lives here once and each surface supplies its own
 * selectors and its own commit.
 *
 * There is no esa-* lego for this — the catalog was re-walked (ls
 * node_modules/@esa/ecology/src/components/) and it has no sortable, tree,
 * drag-handle or table lego. Beacon is not cloned on this machine.
 *
 * ── THE THREE ZONES ─────────────────────────────────────────────────────────
 * A row being dragged over another row means one of three things, decided by
 * where in the target's height the pointer is:
 *
 *   ┌──────────────┐  top quarter     → drop BEFORE the target
 *   │──────────────│
 *   │   (middle)   │  middle half     → GROUP the two (only where canGroup says
 *   │──────────────│                    so — Travel; everywhere else the target
 *   └──────────────┘  bottom quarter  → drop AFTER the target   splits 50/50)
 *
 * The middle zone only exists where grouping is legal, so in Personnel or
 * Supplies the whole row is a reorder target and there is no dead band a vendor
 * can drop into and have nothing happen.
 *
 * ── SCOPE ───────────────────────────────────────────────────────────────────
 * `scopeOf` is what stops a Supplies line being dropped into Personnel. Two
 * elements can interact only when they report the same non-null scope key —
 * which deliberately does NOT mean the same sub-block, so a line can still move
 * Office → Field, or from one trip into another, inside its category.
 *
 * ── KEYBOARD IS NOT AN AFTERTHOUGHT ─────────────────────────────────────────
 * A pointer-only reorder is a reorder half this budget's users cannot perform.
 * The handle is a real button: Space or Enter LIFTS the row, ↑/↓ move it one
 * position per press (committing as they go, so the vendor sees the money move),
 * Shift+↑/↓ group it with that neighbour where grouping is legal, Escape puts it
 * back and Space/Enter/blur drop it. Every one of those announces itself in a
 * shared live region, because the visual answer — the row is now somewhere else
 * — is exactly the answer a screen reader user does not get for free.
 */

export type DropZone = 'before' | 'after' | 'into';

export interface DropInfo {
  /** The row being moved. */
  item: HTMLElement;
  /** The row (or landmark) it was dropped on. */
  target: HTMLElement;
  zone: DropZone;
  /** True when the move came from the keyboard rather than the pointer. */
  keyboard: boolean;
}

export interface RowReorderConfig {
  /** The subtree to wire. Everything is delegated from here. */
  root: HTMLElement;
  /** A draggable row. */
  itemSelector: string;
  /** The grab handle inside a row. Defaults to `[data-drag-handle]`. */
  handleSelector?: string;
  /**
   * Extra elements that accept a drop without being draggable themselves —
   * a trip head or sub-block header. They only ever take the `into` zone.
   */
  landmarkSelector?: string;
  /**
   * The exchange scope. Two elements may interact only when both report the
   * same non-null key. Return null for "this element cannot be dragged".
   */
  scopeOf: (el: HTMLElement) => string | null;
  /** Whether dropping `item` onto the middle of `target` means anything. */
  canGroup?: (item: HTMLElement, target: HTMLElement) => boolean;
  /**
   * Commit the move. Return false to reject it — the engine announces the
   * refusal and leaves the DOM alone, so a host can veto late (a trip that is
   * already this line's own trip, say) without pre-computing every case.
   */
  onDrop: (info: DropInfo) => boolean | void;
  /** How a row names itself in an announcement. Defaults to its text content. */
  describe?: (el: HTMLElement) => string;
  /** Optional override for the announcement channel (defaults to a shared live region). */
  announce?: (message: string) => void;
}

export interface RowReorderHandle {
  destroy(): void;
}

/* How far the pointer travels before a press becomes a drag. Below this a
   click on the handle is still a click — which is what makes the handle
   focusable and keyboard-liftable without every focus attempt starting a drag. */
const DRAG_THRESHOLD = 4;
/* Autoscroll band at the viewport edges. A grid this tall cannot be reordered
   end-to-end without it. */
const SCROLL_BAND = 72;
const SCROLL_STEP = 14;

let liveRegion: HTMLElement | null = null;
const ensureLiveRegion = (): HTMLElement => {
  if (liveRegion?.isConnected) return liveRegion;
  liveRegion = document.createElement('div');
  liveRegion.className = 'cbf-rdnd-live';
  liveRegion.setAttribute('aria-live', 'assertive');
  liveRegion.setAttribute('aria-atomic', 'true');
  document.body.appendChild(liveRegion);
  return liveRegion;
};

let marker: HTMLElement | null = null;
const ensureMarker = (): HTMLElement => {
  if (marker?.isConnected) return marker;
  marker = document.createElement('div');
  marker.className = 'cbf-rdnd-marker';
  marker.setAttribute('aria-hidden', 'true');
  document.body.appendChild(marker);
  return marker;
};

export function initRowReorder(cfg: RowReorderConfig): RowReorderHandle {
  const { root, itemSelector, scopeOf, onDrop } = cfg;
  const handleSelector = cfg.handleSelector ?? '[data-drag-handle]';
  const describe = cfg.describe ?? ((el: HTMLElement) => el.textContent?.trim().slice(0, 60) || 'this line');
  const say = cfg.announce ?? ((msg: string) => { ensureLiveRegion().textContent = msg; });

  const rowOfEvent = (t: EventTarget | null): HTMLElement | null =>
    (t as HTMLElement | null)?.closest?.(itemSelector) as HTMLElement | null;

  /* The handle hook sits on a wrapper (esa-icon-button takes no arbitrary
     attributes), so state and focus have to reach the real control inside it. */
  const handleIn = (row: HTMLElement): HTMLElement | null => {
    const wrap = row.querySelector<HTMLElement>(handleSelector);
    if (!wrap) return null;
    return wrap.matches('button, a') ? wrap : wrap.querySelector<HTMLElement>('button, a') ?? wrap;
  };

  const groupable = (item: HTMLElement, target: HTMLElement) =>
    !!cfg.canGroup && cfg.canGroup(item, target);

  /* ── What the pointer is currently proposing ──────────────────────────────
     Read from geometry every move rather than from a hit-test cache: rows here
     carry live inputs and validation messages, so their heights change under
     the drag and a cached rect would put the marker in last frame's place. */
  const proposalAt = (item: HTMLElement, x: number, y: number): DropInfo | null => {
    const under = document.elementFromPoint(x, y) as HTMLElement | null;
    if (!under || !root.contains(under)) return null;

    const row = under.closest(itemSelector) as HTMLElement | null;
    if (row && row !== item) {
      if (scopeOf(row) !== scopeOf(item)) return null;
      const r = row.getBoundingClientRect();
      const offset = (y - r.top) / (r.height || 1);
      if (groupable(item, row)) {
        if (offset < 0.25) return { item, target: row, zone: 'before', keyboard: false };
        if (offset > 0.75) return { item, target: row, zone: 'after', keyboard: false };
        return { item, target: row, zone: 'into', keyboard: false };
      }
      return { item, target: row, zone: offset < 0.5 ? 'before' : 'after', keyboard: false };
    }

    /* A landmark — a trip head or sub-block header — is a container, so the
       only thing dropping on it can mean is "put this inside". */
    if (cfg.landmarkSelector) {
      const land = under.closest(cfg.landmarkSelector) as HTMLElement | null;
      if (land && scopeOf(land) === scopeOf(item)) {
        return { item, target: land, zone: 'into', keyboard: false };
      }
    }
    return null;
  };

  /* ── Feedback ─────────────────────────────────────────────────────────────
     The marker is fixed-position and lives on <body> on purpose: a table cannot
     hold a divider element between two <tr>s, and the grid's own scroll box
     clips anything positioned inside it. */
  let painted: HTMLElement | null = null;
  const clearPaint = () => {
    if (painted) painted.classList.remove('is-drop-into');
    painted = null;
    if (marker) marker.hidden = true;
  };

  const paint = (info: DropInfo | null) => {
    clearPaint();
    if (!info) return;
    if (info.zone === 'into') {
      info.target.classList.add('is-drop-into');
      painted = info.target;
      return;
    }
    const r = info.target.getBoundingClientRect();
    const bar = ensureMarker();
    bar.hidden = false;
    bar.style.top = `${(info.zone === 'before' ? r.top : r.bottom) - 1}px`;
    bar.style.left = `${r.left}px`;
    bar.style.width = `${r.width}px`;
  };

  /* ── Pointer drag ─────────────────────────────────────────────────────── */
  let item: HTMLElement | null = null;
  let handle: HTMLElement | null = null;
  let startY = 0;
  let armed = false;
  let dragging = false;
  let pointerId = -1;
  let proposal: DropInfo | null = null;
  let lastX = 0;
  let lastY = 0;
  let scrollRaf = 0;
  let scrollDir = 0;

  /* Autoscroll re-asks what is under the pointer on every frame rather than
     holding the target it had when the edge was reached — the whole point of
     scrolling mid-drag is to reach a row that was off screen, and a frozen
     target would scroll past every one of them. */
  const stepScroll = () => {
    if (!scrollDir) { scrollRaf = 0; return; }
    window.scrollBy(0, scrollDir * SCROLL_STEP);
    if (dragging && item) {
      proposal = proposalAt(item, lastX, lastY);
      paint(proposal);
    }
    scrollRaf = window.requestAnimationFrame(stepScroll);
  };
  const setScroll = (dir: number) => {
    scrollDir = dir;
    if (dir && !scrollRaf) scrollRaf = window.requestAnimationFrame(stepScroll);
  };

  const endDrag = (commit: boolean) => {
    setScroll(0);
    if (item) {
      item.classList.remove('is-dragging');
      item.style.removeProperty('--cbf-rdnd-dy');
      if (pointerId >= 0 && handle?.hasPointerCapture?.(pointerId)) {
        handle.releasePointerCapture(pointerId);
      }
    }
    const info = commit && dragging ? proposal : null;
    const wasDragging = dragging;
    clearPaint();
    const moved = item;
    item = null; handle = null; armed = false; dragging = false; pointerId = -1; proposal = null;
    document.body.classList.remove('cbf-rdnd-active');
    if (info) commitMove(info);
    /* Only a real drag that landed nowhere is worth saying. A press that never
       passed the threshold is a CLICK on the handle — which is how it gets
       focused for the keyboard path — and announcing "not moved" every time
       someone focuses a handle would make the live region useless. */
    else if (moved && commit && wasDragging) say(`${describe(moved)} was not moved.`);
  };

  const commitMove = (info: DropInfo) => {
    const ok = onDrop(info) !== false;
    if (!ok) { say(`${describe(info.item)} cannot go there.`); return; }
    /* Where it landed, said visually. A row that teleports with no trace is the
       failure mode of every drag interaction — and a keyboard move is nothing
       BUT a teleport unless the landing is marked. */
    info.item.classList.remove('is-dropped');
    void info.item.offsetWidth;
    info.item.classList.add('is-dropped');
    window.setTimeout(() => info.item.classList.remove('is-dropped'), 900);
    /* Dropping on a CONTAINER and dropping on a PEER are the same zone and two
       different sentences — "moved into the Boise trip" versus "grouped with
       the airfare line". Saying the second when the first happened is how a
       screen reader user ends up believing they made a trip they did not. */
    const ontoPeer = info.target.matches(itemSelector);
    say(
      info.zone !== 'into'
        ? `${describe(info.item)} moved ${info.zone} ${describe(info.target)}.`
        : ontoPeer
          ? `${describe(info.item)} grouped with ${describe(info.target)}.`
          : `${describe(info.item)} moved into ${describe(info.target)}.`,
    );
  };

  const onPointerDown = (ev: PointerEvent) => {
    if (ev.button !== 0) return;
    const h = (ev.target as HTMLElement | null)?.closest?.(handleSelector) as HTMLElement | null;
    if (!h || !root.contains(h)) return;
    const row = rowOfEvent(h);
    if (!row || !scopeOf(row)) return;
    item = row;
    handle = h;
    startY = ev.clientY;
    armed = true;
    pointerId = ev.pointerId;
    h.setPointerCapture?.(ev.pointerId);
  };

  const onPointerMove = (ev: PointerEvent) => {
    if (!armed || !item) return;
    const dy = ev.clientY - startY;
    if (!dragging) {
      if (Math.abs(dy) < DRAG_THRESHOLD) return;
      dragging = true;
      item.classList.add('is-dragging');
      document.body.classList.add('cbf-rdnd-active');
      say(`Moving ${describe(item)}. Drop it between two lines to reorder it.`);
    }
    ev.preventDefault();
    lastX = ev.clientX;
    lastY = ev.clientY;
    item.style.setProperty('--cbf-rdnd-dy', `${dy}px`);
    proposal = proposalAt(item, ev.clientX, ev.clientY);
    paint(proposal);
    setScroll(
      ev.clientY < SCROLL_BAND ? -1 : ev.clientY > window.innerHeight - SCROLL_BAND ? 1 : 0,
    );
  };

  const onPointerUp = () => { if (armed) endDrag(true); };
  const onPointerCancel = () => { if (armed) endDrag(false); };

  /* ── Keyboard lift ────────────────────────────────────────────────────────
     The same three outcomes as the pointer, reached one keystroke at a time and
     committed as they go — so the subtotal under the row the vendor is moving
     updates on every press, exactly as it does mid-drag. */
  let lifted: HTMLElement | null = null;
  const setLifted = (row: HTMLElement | null) => {
    if (lifted) {
      lifted.classList.remove('is-lifted');
      handleIn(lifted)?.setAttribute('aria-pressed', 'false');
    }
    lifted = row;
    if (row) {
      row.classList.add('is-lifted');
      handleIn(row)?.setAttribute('aria-pressed', 'true');
    }
  };

  const neighbour = (row: HTMLElement, dir: -1 | 1): HTMLElement | null => {
    const all = Array.from(root.querySelectorAll<HTMLElement>(itemSelector));
    const scope = scopeOf(row);
    const i = all.indexOf(row);
    for (let k = i + dir; k >= 0 && k < all.length; k += dir) {
      if (scopeOf(all[k]) === scope) return all[k];
      /* Walking past a row in ANOTHER scope means the category boundary is
         here — a line does not tunnel through Personnel to reach Supplies. */
      if (scopeOf(all[k])) return null;
    }
    return null;
  };

  const onKeyDown = (ev: KeyboardEvent) => {
    const h = (ev.target as HTMLElement | null)?.closest?.(handleSelector) as HTMLElement | null;
    if (!h) return;
    const row = rowOfEvent(h);
    if (!row || !scopeOf(row)) return;

    if (ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault();
      if (lifted === row) { say(`${describe(row)} dropped.`); setLifted(null); }
      else {
        setLifted(row);
        say(
          `${describe(row)} lifted. Use the up and down arrows to move it${
            cfg.canGroup ? ', shift with an arrow to group it with a neighbour' : ''
          }, then press Space to drop it.`,
        );
      }
      return;
    }

    if (ev.key === 'Escape' && lifted === row) {
      ev.preventDefault();
      say(`${describe(row)} released.`);
      setLifted(null);
      return;
    }

    if (lifted !== row) return;
    if (ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown') return;
    ev.preventDefault();

    const dir = ev.key === 'ArrowUp' ? -1 : 1;
    const next = neighbour(row, dir);
    if (!next) { say(`${describe(row)} is already ${dir < 0 ? 'first' : 'last'} here.`); return; }

    if (ev.shiftKey) {
      if (!groupable(row, next)) { say('These two lines cannot be grouped.'); return; }
      commitMove({ item: row, target: next, zone: 'into', keyboard: true });
    } else {
      commitMove({ item: row, target: next, zone: dir < 0 ? 'before' : 'after', keyboard: true });
    }
    /* The row moved but the handle came with it — keep the grab alive so a
       second press continues the journey instead of restarting it. */
    handleIn(row)?.focus();
  };

  /* Moving a focused node in the DOM blurs it, so every arrow keystroke fires a
     focusout from the very row being carried — checking it synchronously would
     drop the lift on the first press and make keyboard reordering a one-move
     affair. Ask again after the move has settled and focus has been restored. */
  const onFocusOut = () => {
    if (!lifted) return;
    const row = lifted;
    window.setTimeout(() => {
      if (lifted === row && !row.contains(document.activeElement)) setLifted(null);
    }, 0);
  };

  const onWindowKey = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape' && dragging) { ev.preventDefault(); endDrag(false); }
  };

  /* The marker is positioned in viewport coordinates, so a scroll under an
     in-flight drag has to move it. */
  const onScroll = () => { if (dragging) paint(proposal); };

  root.addEventListener('pointerdown', onPointerDown);
  root.addEventListener('pointermove', onPointerMove);
  root.addEventListener('pointerup', onPointerUp);
  root.addEventListener('pointercancel', onPointerCancel);
  root.addEventListener('keydown', onKeyDown);
  root.addEventListener('focusout', onFocusOut);
  window.addEventListener('keydown', onWindowKey);
  window.addEventListener('scroll', onScroll, { passive: true });

  return {
    destroy() {
      endDrag(false);
      setLifted(null);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('pointercancel', onPointerCancel);
      root.removeEventListener('keydown', onKeyDown);
      root.removeEventListener('focusout', onFocusOut);
      window.removeEventListener('keydown', onWindowKey);
      window.removeEventListener('scroll', onScroll);
    },
  };
}

/**
 * Move `id`'s record so the model reads in the same order the DOM now does.
 * Every one of these surfaces prices, groups and re-renders off the ORDER of
 * its `lines` array, so a DOM-only move would survive exactly until the next
 * recompute re-appended the rows in list order.
 */
export function moveInList<T extends { id: string }>(
  list: T[],
  id: string,
  refId: string | null,
  where: 'before' | 'after' | 'end',
): void {
  const from = list.findIndex((l) => l.id === id);
  if (from < 0) return;
  const [rec] = list.splice(from, 1);
  if (where === 'end' || !refId) { list.push(rec); return; }
  const at = list.findIndex((l) => l.id === refId);
  if (at < 0) { list.push(rec); return; }
  list.splice(where === 'before' ? at : at + 1, 0, rec);
}
