import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Every page is prerendered to plain HTML, so the site works without JavaScript and Netlify
			// only has to serve files. 404.html is the fallback Netlify shows for unknown paths.
			adapter: adapter({ fallback: '404.html' })
		})
	]
});
