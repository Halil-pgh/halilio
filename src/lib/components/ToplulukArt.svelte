<script lang="ts">
	interface Props {
		alt: string;
	}

	let { alt }: Props = $props();

	// Topics scattered in a 2-D stand-in for embedding space, from a fixed seed so the server and the
	// browser draw the same picture. The user's interest vector sits among them, and its nearest
	// topics are the recommendations.
	function seeded(seed: number) {
		return () => {
			seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
			return seed / 2 ** 32;
		};
	}

	const random = seeded(11);
	const clusters = [
		[150, 120],
		[470, 105],
		[300, 285],
		[525, 290]
	];
	const topics = Array.from({ length: 48 }, (_, i) => {
		const [cx, cy] = clusters[i % clusters.length];
		return { x: cx + (random() - 0.5) * 210, y: cy + (random() - 0.5) * 150 };
	}).filter((p) => p.x > 24 && p.x < 616 && p.y > 24 && p.y < 360);

	const you = { x: 372, y: 196 };
	const distance = (p: { x: number; y: number }) => Math.hypot(p.x - you.x, p.y - you.y);
	const nearest = new Set([...topics].sort((a, b) => distance(a) - distance(b)).slice(0, 5));
</script>

<svg viewBox="0 0 640 400" role="img" aria-label={alt}>
	<rect width="640" height="400" class="bg" />
	{#each [...nearest] as p}
		<line x1={you.x} y1={you.y} x2={p.x} y2={p.y} class="link" />
	{/each}
	{#each topics as p}
		<circle cx={p.x} cy={p.y} r={nearest.has(p) ? 6.5 : 4.5} class={nearest.has(p) ? 'near' : 'topic'} />
	{/each}
	<circle cx={you.x} cy={you.y} r="15" class="halo" />
	<circle cx={you.x} cy={you.y} r="7" class="you" />
	<text x={you.x + 22} y={you.y - 16} class="label">your interests</text>
	<text x="24" y="384" class="legend">● recommended: nearest unseen topics by cosine similarity</text>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	.bg {
		fill: var(--surface-2);
	}

	.topic {
		fill: var(--muted);
		opacity: 0.35;
	}

	.near {
		fill: var(--accent);
	}

	.link {
		stroke: var(--accent);
		stroke-width: 1.5;
		stroke-dasharray: 4 4;
		opacity: 0.8;
	}

	.halo {
		fill: var(--accent-soft);
		stroke: var(--accent);
		stroke-width: 1.5;
	}

	.you {
		fill: var(--accent);
	}

	.label,
	.legend {
		font-family: var(--font-mono);
		fill: var(--text);
	}

	.label {
		font-size: 15px;
		font-weight: 600;
	}

	.legend {
		font-size: 13px;
		fill: var(--muted);
	}
</style>
