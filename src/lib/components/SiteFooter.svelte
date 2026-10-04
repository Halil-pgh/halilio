<script lang="ts">
	import { page } from '$app/state';
	import { langOf, ui } from '$lib/i18n';
	import { site } from '$lib/projects';

	const t = $derived(ui[langOf(page.url.pathname)]);
</script>

<footer>
	<div class="container">
		<div class="contact">
			<h2>{t.getInTouch}</h2>
			<p>
				{t.emailLine} <a href="mailto:{site.email}">{site.email}</a>
			</p>
		</div>
		<div class="bottom">
			<p>© 2026 {site.name}</p>
			<ul>
				<li><a href={site.github}>GitHub</a></li>
				<li><a href={site.linkedin}>LinkedIn</a></li>
				<li><a href={site.cv}>{t.cvPdf}</a></li>
			</ul>
		</div>
	</div>
</footer>

<style>
	footer {
		margin-top: 96px;
		padding: 56px 0 40px;
		border-top: 1px solid var(--border);
	}

	h2 {
		font-size: 1.75rem;
		margin-bottom: 8px;
	}

	.contact p {
		color: var(--muted);
	}

	.bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px 24px;
		margin-top: 48px;
		font-size: 0.875rem;
		color: var(--muted);
	}

	ul {
		display: flex;
		gap: 20px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	ul a {
		color: var(--muted);
	}

	ul a:hover {
		color: var(--accent);
	}
</style>
