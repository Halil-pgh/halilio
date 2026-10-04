<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getProject, nextProject } from '$lib/projects';
	import Media from './Media.svelte';
	import Seo from './Seo.svelte';

	interface Props {
		slug: string;
		/** Replaces the project's card media at the top of the page (e.g. a video player). */
		hero?: Snippet;
		children: Snippet;
	}

	let { slug, hero, children }: Props = $props();

	const project = $derived(getProject(slug));
	const next = $derived(nextProject(slug));
</script>

<Seo title={project.title} description={project.hook} />

<article class="container">
	<a class="back" href="/#work">← All work</a>

	<header>
		<p class="eyebrow">{project.kind} · {project.context}</p>
		<h1>{project.title}</h1>
		<p class="lede">{project.hook}</p>
		<ul class="tags" aria-label="Built with">
			{#each project.stack as item}<li>{item}</li>{/each}
		</ul>
		<div class="links">
			{#each project.links as link, i}
				<a class="button" class:primary={i === 0} href={link.href}>{link.label} ↗</a>
			{/each}
		</div>
	</header>

	{#if hero}
		<div class="hero">{@render hero()}</div>
	{:else}
		<div class="hero media"><Media media={project.media} eager /></div>
	{/if}

	<div class="prose">
		{#if project.why}
			<h2>Why I built it</h2>
			{#each project.why as paragraph}<p>{paragraph}</p>{/each}
		{/if}
		{@render children()}
		{#if project.rough}
			<h2>What’s still rough</h2>
			<p>{project.rough}</p>
		{/if}
	</div>

	<a class="next" href="/projects/{next.slug}">
		<span class="eyebrow">Next project</span>
		<span class="next-title">{next.title} →</span>
	</a>
</article>

<style>
	article {
		padding-top: 32px;
	}

	.back {
		font-size: 0.9375rem;
		color: var(--muted);
		text-decoration: none;
	}

	.back:hover {
		color: var(--accent);
	}

	header {
		max-width: 760px;
		margin-top: 32px;
	}

	h1 {
		font-size: clamp(2.4rem, 6vw, 3.6rem);
		margin-top: 10px;
	}

	.lede {
		margin-top: 16px;
		font-size: 1.25rem;
		line-height: 1.55;
		color: var(--muted);
	}

	.tags {
		margin-top: 20px;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 24px;
	}

	.hero {
		margin: 40px 0 48px;
	}

	.hero.media {
		aspect-ratio: 16 / 10;
		max-height: 640px;
		width: 100%;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid var(--border);
		background: var(--surface-2);
	}

	.prose > :global(h2:first-child) {
		margin-top: 0;
	}

	.next {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: 72px;
		padding: 24px 28px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface);
		text-decoration: none;
		max-width: 68ch;
	}

	.next:hover {
		border-color: var(--accent);
	}

	.next-title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 650;
		color: var(--text);
	}
</style>
