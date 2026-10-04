<script lang="ts">
	import { experience, intro } from '$lib/content';
	import type { Lang } from '$lib/i18n';
	import { projects, site, type Project } from '$lib/projects';
	import Media from './Media.svelte';
	import Seo from './Seo.svelte';

	interface Props {
		lang: Lang;
	}

	let { lang }: Props = $props();

	const t = $derived(intro[lang]);
	const jobs = $derived(experience[lang]);
	const [featured, ...rest] = projects;

	/** The card text in this page's language. */
	function card(project: Project) {
		return lang === 'tr' ? project.tr : project;
	}
</script>

<Seo description={t.description} />

<section class="container intro">
	<p class="eyebrow">{t.eyebrow}</p>
	<h1>{t.title}</h1>
	<p class="lede">{t.lede}</p>
	<div class="actions">
		<a class="button primary" href={site.cv}>{t.downloadCv}</a>
		<a class="button" href={site.github}>GitHub</a>
		<a class="button" href={site.linkedin}>LinkedIn</a>
		<a class="button" href="mailto:{site.email}">{t.email}</a>
	</div>
</section>

<section id="work" class="container work" aria-labelledby="work-title">
	<h2 id="work-title">{t.workTitle}</h2>

	<a class="card featured" href="/projects/{featured.slug}">
		<div class="media"><Media media={featured.media} eager /></div>
		<div class="body">
			<p class="eyebrow">{card(featured).kind} · {card(featured).context}</p>
			<h3>{featured.title}</h3>
			<p class="hook">{card(featured).hook}</p>
			<ul class="tags">
				{#each featured.stack as item}<li>{item}</li>{/each}
			</ul>
			<span class="more">{t.readMore}</span>
		</div>
	</a>

	<div class="grid">
		{#each rest as project}
			<a class="card" href="/projects/{project.slug}">
				<div class="media"><Media media={project.media} /></div>
				<div class="body">
					<p class="eyebrow">{card(project).kind} · {card(project).context}</p>
					<h3>{project.title}</h3>
					<p class="hook">{card(project).hook}</p>
					<ul class="tags">
						{#each project.stack as item}<li>{item}</li>{/each}
					</ul>
				</div>
			</a>
		{/each}
	</div>
</section>

<section class="container experience" aria-labelledby="experience-title">
	<h2 id="experience-title">{t.experienceTitle}</h2>
	<ol>
		{#each jobs as job}
			<li>
				<div class="when">{job.dates}</div>
				<div>
					<h3>{job.role} <span class="org">· {job.org}</span></h3>
					<p>{job.summary}</p>
					{#if job.link}<a href={job.link.href}>{job.link.label} →</a>{/if}
				</div>
			</li>
		{/each}
	</ol>
</section>

<style>
	.intro {
		padding-top: clamp(48px, 10vw, 112px);
		padding-bottom: 24px;
	}

	h1 {
		max-width: 20ch;
		margin-top: 16px;
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		line-height: 1.04;
	}

	.lede {
		max-width: 60ch;
		margin-top: 24px;
		font-size: 1.1875rem;
		color: var(--muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 32px;
	}

	.work {
		padding-top: 72px;
		scroll-margin-top: 64px;
	}

	h2 {
		font-size: clamp(1.75rem, 4vw, 2.25rem);
		margin-bottom: 28px;
	}

	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface);
		overflow: hidden;
		color: inherit;
		text-decoration: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s,
			transform 0.2s;
	}

	.card:hover {
		border-color: color-mix(in srgb, var(--accent) 50%, var(--border));
		box-shadow: var(--shadow);
		transform: translateY(-2px);
	}

	.card:hover h3 {
		color: var(--accent);
	}

	.media {
		aspect-ratio: 16 / 10;
		background: var(--surface-2);
		border-bottom: 1px solid var(--border);
		overflow: hidden;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px 22px 24px;
	}

	h3 {
		font-size: 1.5rem;
		transition: color 0.15s;
	}

	.hook {
		color: var(--muted);
	}

	.body .tags {
		margin-top: 6px;
	}

	.featured {
		margin-bottom: 20px;
	}

	.featured h3 {
		font-size: clamp(1.75rem, 3.5vw, 2.25rem);
	}

	.featured .hook {
		font-size: 1.125rem;
	}

	.more {
		margin-top: 8px;
		font-weight: 600;
		color: var(--accent);
	}

	@media (min-width: 880px) {
		.featured {
			display: grid;
			grid-template-columns: 1.45fr 1fr;
		}

		.featured .media {
			aspect-ratio: auto;
			min-height: 380px;
			border-bottom: 0;
			border-right: 1px solid var(--border);
		}

		.featured .body {
			justify-content: center;
			padding: 32px;
		}
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
		gap: 20px;
	}

	.experience {
		padding-top: 88px;
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
		max-width: 820px;
	}

	.experience li {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 4px 24px;
		padding: 24px 0;
		border-top: 1px solid var(--border);
	}

	.experience li:last-child {
		border-bottom: 1px solid var(--border);
	}

	.when {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--muted);
		padding-top: 5px;
	}

	.experience li h3 {
		font-size: 1.25rem;
	}

	.org {
		font-family: var(--font-body);
		font-weight: 500;
		font-size: 1rem;
		color: var(--muted);
	}

	.experience li p {
		margin-top: 6px;
		color: var(--muted);
	}

	.experience li a {
		display: inline-block;
		margin-top: 8px;
		font-weight: 600;
		font-size: 0.9375rem;
	}

	@media (max-width: 600px) {
		.experience li {
			grid-template-columns: 1fr;
		}
	}
</style>
