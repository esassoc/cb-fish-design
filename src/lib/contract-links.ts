/**
 * Where the homepage's "View data" links go, and how out-of-scope
 * destinations (projects, contracts) render.
 *
 * The /program-results/<measure> contract pages are a saved DRAFT: built and
 * deployed, reachable by URL, but out of scope for the homepage prototype for
 * now. While CONTRACT_PAGES_LIVE is false, every homepage link to them renders
 * as an out-of-scope link instead — cbf-out-of-scope-notice turns a click on
 * it into a "…is outside this prototype" notice, the same wording the contract
 * tabs use. Flip the flag to link the draft pages back in.
 */
import { withBase } from './base';

export const CONTRACT_PAGES_LIVE = false;

export const OUT_OF_SCOPE_CONTRACTS = 'The data behind this result is outside this prototype.';

/**
 * Attributes for an out-of-scope destination. No href, so there is nothing to
 * navigate to or open in a new tab: on esa-button that renders a native
 * <button>; on a custom <a> the role/tabindex make it a keyboard-operable
 * button. cbf-out-of-scope-notice handles the click / Enter / Space.
 */
export const outOfScope = (message: string): Record<string, string> => ({ role: 'button', tabindex: '0', 'data-out-of-scope': message });

/**
 * Link attributes for a measure's contracts page, optionally pre-filtered by a
 * filterToken ("program-tributary-habitat", "state-WA"). Spread onto an <a>
 * or esa-button: `<a {...contractLink('habitat')}>`.
 */
export function contractLink(metricId: string, token?: string): Record<string, string> {
  if (!CONTRACT_PAGES_LIVE) return outOfScope(OUT_OF_SCOPE_CONTRACTS);
  return { href: `${withBase(`/program-results/${metricId}`)}${token ? `#${token}` : ''}` };
}
