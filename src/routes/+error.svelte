<script lang="ts">
	import { page } from '$app/state';
	import Prompt from '$lib/components/Prompt.svelte';
	import { langOf, ui } from '$lib/i18n';

	const lang = $derived(langOf(page.url.pathname));
	const missing = $derived(page.status === 404);
	const text = $derived(
		lang === 'tr'
			? {
					title: missing ? 'Bu adreste bir şey yok.' : 'Bir şeyler ters gitti.',
					back: 'Ana sayfaya dön'
				}
			: {
					title: missing ? 'There’s nothing at this address.' : 'Something went wrong.',
					back: 'Back to the home page'
				}
	);
</script>

<svelte:head>
	<title>{text.title} · Halil İbrahim Öztürk</title>
</svelte:head>

<div class="container page">
	<Prompt command="cd {page.url.pathname}" />
	<p class="shell-error" aria-hidden="true">
		{#if missing}bash: cd: {page.url.pathname}: No such file or directory{:else}error: exit status {page.status}{/if}
	</p>
	<h1>{text.title}</h1>
	<p>
		<a class="button primary" href={ui[lang].home}>{text.back}</a>
	</p>
</div>

<style>
	.page {
		padding-top: clamp(40px, 10vw, 112px);
	}

	.shell-error {
		color: var(--red);
		font-size: 0.875rem;
		overflow-wrap: anywhere;
	}

	h1 {
		margin: 32px 0 28px;
		font-size: clamp(1.75rem, 5vw, 2.75rem);
	}
</style>
