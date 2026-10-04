<script lang="ts">
	import { page } from '$app/state';
	import { langOf, switchTarget, ui } from '$lib/i18n';
	import { site } from '$lib/projects';
	import ThemeToggle from './ThemeToggle.svelte';

	const lang = $derived(langOf(page.url.pathname));
	const t = $derived(ui[lang]);
</script>

<header>
	<div class="container bar">
		<a href={t.home} class="brand">
			<span class="long">Halil İbrahim Öztürk</span>
			<span class="short">Halil Öztürk</span>
		</a>
		<nav aria-label="Main">
			<a href="{t.home}#work">{t.work}</a>
			<a href={t.aboutHref}>{t.about}</a>
			<a class="cv-link" href={site.cv}>{t.cv}</a>
			<a
				class="lang"
				href={switchTarget(page.url.pathname)}
				hreflang={lang === 'en' ? 'tr' : 'en'}
				lang={lang === 'en' ? 'tr' : 'en'}
				aria-label={t.switchLabel}
				title={t.switchLabel}>{t.switchText}</a
			>
			<ThemeToggle label={t.toggleTheme} />
		</nav>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: color-mix(in srgb, var(--bg) 88%, transparent);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		min-height: 64px;
	}

	.brand {
		font-family: var(--font-display);
		font-weight: 650;
		font-size: 1.0625rem;
		color: var(--text);
		text-decoration: none;
		white-space: nowrap;
	}

	.short {
		display: none;
	}

	nav {
		display: flex;
		align-items: center;
		gap: clamp(10px, 2.6vw, 24px);
	}

	nav a {
		color: var(--muted);
		text-decoration: none;
		font-size: 0.9375rem;
		font-weight: 500;
		white-space: nowrap;
	}

	nav a:hover {
		color: var(--text);
	}

	.lang {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		padding: 4px 7px;
		border: 1px solid var(--border);
		border-radius: 6px;
	}

	.lang:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	@media (max-width: 560px) {
		.long {
			display: none;
		}
		.short {
			display: inline;
		}
	}

	/* On narrow phones the CV link goes; the CV button is right below it on the home page and in the footer. */
	@media (max-width: 440px) {
		.cv-link {
			display: none;
		}
	}

	@media (max-width: 400px) {
		.bar {
			gap: 10px;
		}
		.brand {
			font-size: 1rem;
		}
		nav {
			gap: 8px;
		}
	}
</style>
