<script lang="ts">
	import { page } from '$app/state';
	import { langOf, translationOf } from '$lib/i18n';
	import { site } from '$lib/projects';

	interface Props {
		/** Page title; the site name is added after it. Leave out on the home page. */
		title?: string;
		description: string;
	}

	let { title, description }: Props = $props();

	const fullTitle = $derived(title ? `${title} · ${site.name}` : site.name);
	const url = $derived(site.url + page.url.pathname);
	const lang = $derived(langOf(page.url.pathname));
	const translation = $derived(translationOf(page.url.pathname));
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#if translation}
		<link rel="alternate" hreflang={lang} href={url} />
		<link rel="alternate" hreflang={lang === 'en' ? 'tr' : 'en'} href={site.url + translation} />
	{/if}
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={lang === 'tr' ? 'tr_TR' : 'en_US'} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content="{site.url}/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
