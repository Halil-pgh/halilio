<script lang="ts">
	import type { Media } from '$lib/projects';
	import LoopVideo from './LoopVideo.svelte';
	import ToplulukArt from './ToplulukArt.svelte';

	interface Props {
		media: Media;
		eager?: boolean;
	}

	let { media, eager = false }: Props = $props();
</script>

{#if media.kind === 'video'}
	<LoopVideo
		mp4={media.mp4}
		webm={media.webm}
		poster={media.poster}
		alt={media.alt}
		position={media.position}
	/>
{:else if media.kind === 'image'}
	<img
		src={media.src}
		alt={media.alt}
		loading={eager ? 'eager' : 'lazy'}
		style:object-position={media.position ?? 'center'}
	/>
{:else}
	<ToplulukArt alt={media.alt} />
{/if}

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
