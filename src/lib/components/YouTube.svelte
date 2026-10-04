<script lang="ts">
	interface Props {
		id: string;
		title: string;
		poster: string;
	}

	let { id, title, poster }: Props = $props();

	// The YouTube player is heavy and sets cookies, so the page shows a thumbnail and only loads the
	// player when someone presses play. Without JavaScript the thumbnail is a plain link to YouTube.
	let playing = $state(false);
</script>

<div class="frame">
	{#if playing}
		<iframe
			src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1&rel=0"
			{title}
			allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
			allowfullscreen
		></iframe>
	{:else}
		<a
			class="facade"
			href="https://youtu.be/{id}"
			aria-label="Play video: {title}"
			onclick={(event) => {
				event.preventDefault();
				playing = true;
			}}
		>
			<img src={poster} alt="" loading="lazy" />
			<span class="play">
				<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
					<path d="M8 5.5v13l11-6.5z" fill="currentColor" />
				</svg>
				Play video
			</span>
		</a>
	{/if}
</div>

<style>
	.frame {
		position: relative;
		aspect-ratio: 16 / 9;
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--surface-2);
	}

	iframe,
	.facade,
	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	img {
		object-fit: cover;
	}

	.play {
		position: absolute;
		left: 16px;
		bottom: 16px;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		border-radius: 999px;
		background: var(--accent);
		color: var(--on-accent);
		font-weight: 600;
		font-size: 0.9375rem;
		box-shadow: var(--shadow);
	}

	.facade:hover .play {
		background: var(--accent-hover);
	}
</style>
