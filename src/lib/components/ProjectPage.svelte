<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getProject, nextProject } from '$lib/projects';
	import Media from './Media.svelte';
	import Prompt from './Prompt.svelte';
	import Seo from './Seo.svelte';

	interface Props {
		slug: string;
		/** Replaces the project's card media at the top of the page (e.g. a video player). */
		hero?: Snippet;
		/** The name in the hero pane's border, e.g. "video". Defaults to one from the media kind. */
		heroLabel?: string;
		children: Snippet;
	}

	let { slug, hero, heroLabel, children }: Props = $props();

	const project = $derived(getProject(slug));
	const next = $derived(nextProject(slug));
	const label = $derived(
		heroLabel ?? { video: 'demo', image: 'screenshot', art: 'diagram' }[project.media.kind]
	);
</script>

<Seo title={project.title} description={project.hook} />

<!-- Inside a project page the accent becomes the project's own color (see projects.ts). -->
<article class="container" style:--tint="var(--{project.tint})">
	<a class="back" href="/#work"><span aria-hidden="true">←</span>All work</a>

	<header>
		<Prompt path="~/projects/{project.slug}" command="cat README.md" />
		<p class="eyebrow">{project.kind} · {project.context}</p>
		<h1>{project.title}</h1>
		<p class="lede">{project.hook}</p>
		<div class="stack">
			<span>stack:</span>&#32;<ul class="tags" aria-label="Built with" lang="en">
				{#each project.stack as item}<li>{item}</li>{/each}
			</ul>
		</div>
		<div class="links">
			{#each project.links as link, i}
				<a class="button" class:primary={i === 0} href={link.href}>{link.label} ↗</a>
			{/each}
		</div>
	</header>

	<div class="hero pane">
		<span class="pane-title" aria-hidden="true">{label}</span>
		{#if hero}
			{@render hero()}
		{:else}
			<div class="frame"><Media media={project.media} eager /></div>
		{/if}
	</div>

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

	<a class="pane next" href="/projects/{next.slug}" style:--tint="var(--{next.tint})">
		<span class="pane-title" aria-hidden="true">next</span>
		<span class="visually-hidden">Next project:</span>
		<span class="eyebrow">{next.kind} · {next.context}</span>
		<span class="next-title">{next.title} →</span>
	</a>
</article>

<style>
	article {
		--accent: var(--tint);
		--accent-hover: color-mix(in srgb, var(--tint) 75%, var(--bright));
		padding-top: 20px;
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 1ch;
		min-height: 44px;
		font-size: 0.875rem;
		color: var(--muted);
		text-decoration: none;
	}

	.back:hover {
		color: var(--bright);
	}

	header {
		max-width: 780px;
		margin-top: 20px;
	}

	.eyebrow {
		margin-top: 18px;
	}

	h1 {
		margin-top: 8px;
		font-size: clamp(2rem, 6vw, 3.25rem);
		color: var(--tint);
	}

	.lede {
		margin-top: 14px;
		font-size: 1.0625rem;
		line-height: 1.6;
	}

	.stack {
		margin-top: 16px;
		font-size: 0.8125rem;
		color: var(--muted);
	}

	.stack .tags,
	.stack .tags li {
		display: inline;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 24px;
	}

	.hero {
		margin: 48px 0 52px;
		padding: 22px 14px 14px;
	}

	.frame {
		aspect-ratio: 16 / 10;
		max-height: 640px;
		width: 100%;
		overflow: hidden;
		border: 1px solid var(--border);
		background: var(--surface);
	}

	.prose > :global(h2:first-child) {
		margin-top: 0;
	}

	.next {
		display: flex;
		flex-direction: column;
		gap: 2px;
		max-width: 72ch;
		margin-top: 80px;
		padding: 24px 22px 20px;
		text-decoration: none;
		transition: border-color 0.15s;
	}

	.next:hover {
		border-color: var(--tint);
	}

	.next-title {
		font-size: 1.375rem;
		font-weight: 750;
		color: var(--tint);
	}
</style>
