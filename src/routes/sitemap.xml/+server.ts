import { projects, site } from '$lib/projects';

export const prerender = true;

export function GET() {
	const paths = ['/', '/about', '/tr', '/tr/hakkimda', ...projects.map((p) => `/projects/${p.slug}`)];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `\t<url><loc>${site.url}${path}</loc></url>`).join('\n')}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
