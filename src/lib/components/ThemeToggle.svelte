<script lang="ts">
	interface Props {
		label?: string;
	}

	let { label = 'Toggle dark mode' }: Props = $props();

	// Which icon shows is decided by CSS from the same rules as the colors, so the button is right
	// on the first paint and needs no JavaScript to look correct. The click handler only flips it.
	function toggle() {
		const root = document.documentElement;
		const current =
			root.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		const next = current === 'dark' ? 'light' : 'dark';
		root.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			// Private windows can refuse storage; the theme still changes for this page.
		}
	}
</script>

<button type="button" class="toggle" onclick={toggle} aria-label={label}>
	<svg class="moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
		<path
			d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linejoin="round"
		/>
	</svg>
	<svg class="sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
		<circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8" />
		<path
			d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
		/>
	</svg>
</button>

<style>
	.toggle {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
	}

	.toggle:hover {
		color: var(--accent);
		border-color: var(--accent);
	}

	.sun {
		display: none;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) .sun {
			display: block;
		}
		:global(:root:not([data-theme='light'])) .moon {
			display: none;
		}
	}

	:global(:root[data-theme='dark']) .sun {
		display: block;
	}

	:global(:root[data-theme='dark']) .moon {
		display: none;
	}
</style>
