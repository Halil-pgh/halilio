<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} · Halil İbrahim Öztürk</title>
</svelte:head>

<div class="container page">
	<p class="eyebrow">{page.status}</p>
	<h1>{page.status === 404 ? 'There’s nothing at this address.' : 'Something went wrong.'}</h1>
	<p>
		<a class="button primary" href="/">Back to the home page</a>
	</p>
</div>

<style>
	.page {
		padding-top: clamp(48px, 10vw, 120px);
	}

	h1 {
		margin: 12px 0 32px;
		font-size: clamp(2rem, 5vw, 3rem);
	}
</style>
