/**
 * Links that leave the site (other domains, or files like the CV PDF) open in a new tab, so a
 * visitor never loses the site behind them. Screen readers hear "opens in a new tab" from the
 * hidden note in +layout.svelte that aria-describedby points to.
 */
export const newTab = {
	target: '_blank',
	rel: 'noopener',
	'aria-describedby': 'new-tab-note'
} as const;

/** newTab for a link that leaves the site, nothing for one that stays (mailto: stays put too). */
export function linkAttrs(href: string) {
	return /^https?:\/\//.test(href) || href.endsWith('.pdf') ? newTab : {};
}
