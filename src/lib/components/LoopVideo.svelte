<script lang="ts">
	interface Props {
		mp4: string;
		webm?: string;
		poster: string;
		alt: string;
		position?: string;
	}

	let { mp4, webm, poster, alt, position = 'center' }: Props = $props();

	let video: HTMLVideoElement;
	let reducedMotion = $state(false);

	// A silent loop, like a GIF, but it only downloads and plays while it's on screen.
	// Visitors who ask for reduced motion get the still poster and normal controls instead.
	$effect(() => {
		reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) return;

		video.muted = true;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) video.play().catch(() => {});
				else video.pause();
			},
			{ threshold: 0.25 }
		);
		observer.observe(video);
		return () => observer.disconnect();
	});
</script>

<video
	bind:this={video}
	muted
	loop
	playsinline
	preload="none"
	{poster}
	controls={reducedMotion}
	aria-label={alt}
	style:object-position={position}
>
	{#if webm}<source src={webm} type="video/webm" />{/if}
	<source src={mp4} type="video/mp4" />
</video>

<style>
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: var(--surface-2);
	}
</style>
