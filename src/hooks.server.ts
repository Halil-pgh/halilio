import type { Handle } from '@sveltejs/kit';
import { langOf } from '$lib/i18n';

// Fills <html lang="%lang%"> in app.html, so Turkish pages are marked as Turkish for screen readers,
// spell checkers and search engines.
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', langOf(event.url.pathname))
	});
