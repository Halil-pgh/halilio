<script lang="ts">
	import { page } from '$app/state';
	import { langOf, ui } from '$lib/i18n';
	import { site } from '$lib/projects';
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
			<li><a href={site.github} lang="en">GitHub</a></li>
			<li><a href={site.linkedin} lang="en">LinkedIn</a></li>
			<li><a href={site.cv}>{t.cvPdf}</a></li>
		</ul>
		<p class="copy">© 2026 {site.name}<span class="cursor" aria-hidden="true"></span></p>
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
		display: flex;
		align-items: center;
		margin-top: 32px;
		font-size: 0.8125rem;
		color: var(--muted);
	}

	/* The block cursor at the end of the session. It stays solid for reduced motion (app.css). */
	.cursor {
		display: inline-block;
		width: 0.6em;
		height: 1.25em;
		margin-left: 0.6em;
		background: var(--accent);
		animation: blink 1.1s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
