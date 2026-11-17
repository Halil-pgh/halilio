<script lang="ts">
	import { page } from '$app/state';
	import { langOf, ui } from '$lib/i18n';
	import { site } from '$lib/projects';
	import { newTab } from '$lib/links';
	import Prompt from './Prompt.svelte';

	const t = $derived(ui[langOf(page.url.pathname)]);
</script>

<footer>
	<div class="container">
		<Prompt command={t.footerCommand} />
		<h2>{t.getInTouch}</h2>
		<p class="email">
			{t.emailLine} <a href="mailto:{site.email}">{site.email}</a>
		</p>
		<ul>
			<!-- English names: lowercasing them under lang="tr" would turn LinkedIn into "linkedın". -->
			<li><a href={site.github} lang="en" {...newTab}>GitHub</a></li>
			<li><a href={site.linkedin} lang="en" {...newTab}>LinkedIn</a></li>
			<li><a href={site.cv} {...newTab}>{t.cvPdf}</a></li>
		</ul>
		<p class="copy">© 2026 {site.name}</p>
	</div>
</footer>

<style>
	footer {
		margin-top: 104px;
		padding: 40px 0 48px;
		border-top: 1px solid var(--border);
	}

	h2 {
		margin-top: 12px;
		font-size: 1.5rem;
	}

	.email {
		margin-top: 8px;
		color: var(--muted);
	}

	.email a {
		overflow-wrap: anywhere;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 22px;
		margin: 12px 0 0;
		padding: 0;
		list-style: none;
	}

	ul a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		text-transform: lowercase;
	}

	.copy {
		margin-top: 32px;
		font-size: 0.8125rem;
		color: var(--muted);
	}
</style>
