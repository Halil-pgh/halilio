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

<a class="skip" href="#content">{ui[langOf(page.url.pathname)].skip}</a>
<SiteHeader />
<main id="content">
	{@render children()}
</main>
<SiteFooter />

<style>
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
