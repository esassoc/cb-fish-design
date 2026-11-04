/**
 * Where the homepage's "View contracts" links go.
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

/** Attributes for a link to an out-of-scope destination. */
export const outOfScope = (message: string) => ({ href: '#', 'data-out-of-scope': message });

/**
 * Link attributes for a measure's contracts page, optionally pre-filtered by a
 * filterToken ("program-tributary-habitat", "state-WA"). Spread onto an <a>
 * or esa-button: `<a {...contractLink('habitat')}>`.
 */
export function contractLink(metricId: string, token?: string): Record<string, string> {
  if (!CONTRACT_PAGES_LIVE) return outOfScope(OUT_OF_SCOPE_CONTRACTS);
  return { href: `${withBase(`/program-results/${metricId}`)}${token ? `#${token}` : ''}` };
}
