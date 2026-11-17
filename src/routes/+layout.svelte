<script lang="ts">
	import '@fontsource-variable/jetbrains-mono';
	import '@fontsource-variable/jetbrains-mono/wght-italic.css';
	import '../app.css';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { page } from '$app/state';
	import { langOf, ui } from '$lib/i18n';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<!-- At least one screen tall, with the main part taking the spare room, so the footer stays at the
     bottom of short pages (a 404, say) instead of riding up under the content. -->
<div class="shell">
	<a class="skip" href="#content">{ui[langOf(page.url.pathname)].skip}</a>
	<SiteHeader />
	<main id="content">
		{@render children()}
	</main>
	<SiteFooter />
	<!-- Read out after every link that opens a new tab (aria-describedby in $lib/links). -->
	<p id="new-tab-note" hidden>{ui[langOf(page.url.pathname)].newTab}</p>
</div>

<style>
	.shell {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-height: 100dvh;
	}

	main {
		flex: 1 0 auto;
	}

	.skip {
		position: absolute;
		left: 12px;
		top: -48px;
		z-index: 20;
		padding: 8px 14px;
		background: var(--accent);
		color: var(--on-accent);
		font-weight: 700;
	}

	.skip:focus {
		top: 12px;
	}
</style>
