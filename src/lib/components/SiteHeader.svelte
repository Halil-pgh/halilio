<script lang="ts">
	import { page } from '$app/state';
	import { langOf, switchTarget, ui } from '$lib/i18n';
	import { site } from '$lib/projects';
	import { newTab } from '$lib/links';
	import ThemeToggle from './ThemeToggle.svelte';

	const path = $derived(page.url.pathname);
	const lang = $derived(langOf(path));
	const t = $derived(ui[lang]);

	// The active "window" in the tmux bar. Project pages light up "work" without claiming to be it.
	const active = $derived(
		path === t.home ? 'home' : path === t.aboutHref ? 'about' : path.startsWith('/projects/') ? 'work' : ''
	);
</script>

<header>
	<div class="container bar">
		<a href={t.home} class="brand">halilio</a>
		<nav aria-label="Main">
			<ul>
				<li class="home-window">
					<a
						href={t.home}
						class:active={active === 'home'}
						aria-current={active === 'home' ? 'page' : undefined}><span class="num">0:</span>{t.homeLabel}</a
					>
				</li>
				<li>
					<a href="{t.home}#work" class:active={active === 'work'}><span class="num">1:</span>{t.work}</a>
				</li>
				<li>
					<a
						href={t.aboutHref}
						class:active={active === 'about'}
						aria-current={active === 'about' ? 'page' : undefined}><span class="num">2:</span>{t.about}</a
					>
				</li>
				<li>
					<a href={site.cv} {...newTab}><span class="num">3:</span>{t.cv}</a>
				</li>
			</ul>
		</nav>
		<div class="tools">
			<a
				class="lang"
				href={switchTarget(path)}
				hreflang={lang === 'en' ? 'tr' : 'en'}
				lang={lang === 'en' ? 'tr' : 'en'}
				aria-label={t.switchLabel}
				title={t.switchLabel}>{t.switchText}</a
			>
			<ThemeToggle label={t.toggleTheme} />
		</div>
	</div>
</header>

<style>
	header {
		background: var(--surface);
		border-bottom: 1px solid var(--border);
		font-size: 0.875rem;
	}

	/* Phones: two rows. The name and the toggles on top, the windows underneath. */
	.bar {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas:
			'brand tools'
			'nav nav';
		align-items: center;
	}

	.brand {
		grid-area: brand;
		justify-self: start;
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 0 12px;
		background: var(--accent);
		color: var(--on-accent);
		font-weight: 800;
		text-decoration: none;
	}

	.brand:hover {
		background: var(--accent-hover);
		color: var(--on-accent);
	}

	nav {
		grid-area: nav;
		min-width: 0;
		border-top: 1px solid var(--border);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		margin: 0 0 0 -10px;
		padding: 0;
		list-style: none;
	}

	nav a {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 0 10px;
		color: var(--text);
		text-decoration: none;
		text-transform: lowercase;
		white-space: nowrap;
	}

	nav a:hover {
		background: var(--surface-2);
		color: var(--bright);
	}

	.num {
		color: var(--muted);
	}

	nav a.active {
		background: var(--text);
		color: var(--bg);
	}

	nav a.active .num {
		color: inherit;
	}

	nav a.active::after {
		content: '*';
		content: '*' / '';
	}

	/* The name already leads home, so phones drop window 0 to keep the rest on one line. */
	.home-window {
		display: none;
	}

	.tools {
		grid-area: tools;
		justify-self: end;
		display: flex;
		align-items: center;
		margin-right: -10px;
	}

	.lang {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 44px;
		min-height: 44px;
		padding: 0 6px;
		color: var(--muted);
		text-decoration: none;
		text-transform: lowercase;
	}

	.lang::before {
		content: '[';
		content: '[' / '';
	}

	.lang::after {
		content: ']';
		content: ']' / '';
	}

	.lang:hover {
		color: var(--bright);
	}

	/* Wider screens: one sticky row, like tmux's status line. */
	@media (min-width: 640px) {
		header {
			position: sticky;
			top: 0;
			z-index: 10;
		}

		.bar {
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 'brand nav tools';
		}

		nav {
			border-top: 0;
		}

		ul {
			margin: 0;
		}

		.home-window {
			display: block;
		}
	}
</style>
