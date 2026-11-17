<script lang="ts">
	import { experience, intro } from '$lib/content';
	import type { Lang } from '$lib/i18n';
	import { newTab } from '$lib/links';
	import { getProject, projects, site, type Project } from '$lib/projects';
	import Media from './Media.svelte';
	import Prompt from './Prompt.svelte';
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

	/** Project pages are English-only, so links to them from the Turkish page say so. */
	const projectHreflang = $derived(lang === 'tr' ? 'en' : undefined);
</script>

<Seo description={t.description} />

<section class="container intro">
	<Prompt command={t.commands.whoami} />
	<div class="whoami">
		<h1>{site.name}</h1>
		<p class="who">{t.eyebrow}</p>
		<p class="tagline">{t.tagline}</p>
	</div>

	<div class="about">
		<Prompt command={t.commands.about} />
		<p class="lede">
			{#each t.lede as part}{#if typeof part === 'string'}{part}{:else}<a
						href="/projects/{part.slug}"
						hreflang={projectHreflang}
						style:--tint="var(--{getProject(part.slug).tint})">{part.text}</a
					>{/if}{/each}
		</p>
		<div class="actions">
			<a class="button primary" href={site.cv} download="Halil_Ibrahim_Ozturk_CV.pdf">{t.downloadCv}</a>
			<a class="button" href={site.github} {...newTab}>GitHub</a>
			<a class="button" href={site.linkedin} {...newTab}>LinkedIn</a>
			<a class="button" href="mailto:{site.email}">{t.email}</a>
		</div>
	</div>
</section>

<section id="work" class="container work" aria-labelledby="work-title">
	<Prompt command={t.commands.work} />
	<p class="ls" aria-hidden="true">
		{#each projects as project}<span style:color="var(--{project.tint})">{project.slug}/</span>{/each}
	</p>
	<h2 id="work-title" class="visually-hidden">{t.workTitle}</h2>

	<a
		class="pane card featured"
		href="/projects/{featured.slug}"
		hreflang={projectHreflang}
		style:--tint="var(--{featured.tint})"
	>
		<span class="pane-title" aria-hidden="true">{featured.slug}</span>
		<div class="media"><Media media={featured.media} eager /></div>
		<div class="body">
			<p class="eyebrow">{card(featured).kind} · {card(featured).context}</p>
			<h3>{featured.title}</h3>
			<p class="hook">{card(featured).hook}</p>
			<div class="stack">
				<span>stack:</span>&#32;<ul class="tags" lang="en">
					{#each featured.stack as item}<li>{item}</li>{/each}
				</ul>
			</div>
			<span class="more">{t.readMore}</span>
		</div>
	</a>

	<div class="grid">
		{#each rest as project}
			<a
				class="pane card"
				href="/projects/{project.slug}"
				hreflang={projectHreflang}
				style:--tint="var(--{project.tint})"
			>
				<span class="pane-title" aria-hidden="true">{project.slug}</span>
				<div class="media"><Media media={project.media} /></div>
				<div class="body">
					<p class="eyebrow">{card(project).kind} · {card(project).context}</p>
					<h3>{project.title}</h3>
					<p class="hook">{card(project).hook}</p>
					<div class="stack">
						<span>stack:</span>&#32;<ul class="tags" lang="en">
							{#each project.stack as item}<li>{item}</li>{/each}
						</ul>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<section class="container experience" aria-labelledby="experience-title">
	<Prompt command={t.commands.experience} />
	<h2 id="experience-title" class="visually-hidden">{t.experienceTitle}</h2>
	<ol class="log">
		{#each jobs as job}
			<li>
				<span class="node" aria-hidden="true">*</span>
				<div class="head">
					<p class="when">{job.dates}</p>
					<h3>{job.role} <span class="org">@ {job.org}</span></h3>
				</div>
				<p class="summary">{job.summary}</p>
				{#if job.link}<a href={job.link.href} hreflang={projectHreflang}>→ {job.link.label}</a>{/if}
			</li>
		{/each}
	</ol>
</section>

<style>
	/* ─── whoami ─── */

	.intro {
		padding-top: clamp(32px, 7vw, 64px);
	}

	/* The double red frame from the Wolf replay screen. The outline sits 6px outside the border,
	   so the box keeps 6px of margin to stay inside the page on the narrowest phones. */
	.whoami {
		margin: 22px 6px 0;
		padding: clamp(28px, 6vw, 48px) clamp(14px, 4vw, 32px);
		border: 1px solid var(--red);
		outline: 1px solid var(--red);
		outline-offset: 5px;
		text-align: center;
	}

	h1 {
		font-size: clamp(1.625rem, 5.4vw, 3.25rem);
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: 0.02em;
	}

	.who {
		margin-top: 14px;
		font-size: 0.875rem;
	}

	.tagline {
		margin-top: 6px;
		color: var(--muted);
		font-style: italic;
	}

	.about {
		margin-top: 44px;
	}

	.lede {
		max-width: 74ch;
		margin-top: 12px;
		font-size: 1rem;
	}

	.lede a {
		color: var(--tint);
	}

	.lede a:hover {
		color: var(--bright);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 26px;
	}

	/* ─── projects ─── */

	.work {
		padding-top: 80px;
		scroll-margin-top: 56px;
	}

	.ls {
		display: flex;
		flex-wrap: wrap;
		gap: 0 3ch;
		margin-top: 6px;
		font-size: 0.875rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		padding: 24px 18px 20px;
		color: inherit;
		text-decoration: none;
		transition: border-color 0.15s;
	}

	.card:hover {
		border-color: var(--tint);
	}

	.media {
		aspect-ratio: 16 / 9;
		border: 1px solid var(--border);
		background: var(--surface);
		overflow: hidden;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding-top: 16px;
	}

	h3 {
		font-size: 1.375rem;
		color: var(--tint);
	}

	.hook {
		color: var(--text);
	}

	/* Flows like a line of text, so a long stack wraps after "stack:" instead of before it. */
	.stack {
		font-size: 0.8125rem;
		color: var(--muted);
	}

	.stack .tags,
	.stack .tags li {
		display: inline;
	}

	.more {
		margin-top: 4px;
		color: var(--accent);
		font-weight: 700;
	}

	.card:hover .more {
		color: var(--accent-hover);
	}

	.featured {
		margin-top: 36px;
	}

	.featured h3 {
		font-size: clamp(1.625rem, 3.5vw, 2.125rem);
	}

	.featured .hook {
		font-size: 1rem;
	}

	@media (min-width: 880px) {
		.featured {
			display: grid;
			grid-template-columns: 1.45fr 1fr;
			gap: 28px;
			padding: 28px 24px 24px;
		}

		.featured .media {
			aspect-ratio: 16 / 10;
		}

		.featured .body {
			justify-content: center;
			padding-top: 0;
		}
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
		gap: 40px 28px;
		margin-top: 44px;
	}

	/* ─── experience, as a git log ─── */

	.experience {
		padding-top: 88px;
	}

	.log {
		max-width: 860px;
		margin: 22px 0 0;
		padding: 0 0 0 6px;
		list-style: none;
	}

	.log li {
		position: relative;
		padding: 0 0 30px 24px;
		border-left: 1px solid var(--border-strong);
	}

	.log li:last-child {
		padding-bottom: 0;
		border-left-color: transparent;
	}

	.node {
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(-50%);
		background: var(--bg);
		color: var(--accent);
		font-weight: 800;
		line-height: inherit;
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0 2ch;
	}

	.when {
		color: var(--yellow);
		white-space: nowrap;
	}

	.log h3 {
		font-size: 1rem;
		font-weight: 700;
		color: var(--bright);
	}

	.org {
		color: var(--accent);
		font-weight: 500;
	}

	.summary {
		margin-top: 6px;
		color: var(--muted);
	}

	.log a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-weight: 600;
		text-decoration: none;
	}

	.log a:hover {
		text-decoration: underline;
	}
</style>
