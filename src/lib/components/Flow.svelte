<script lang="ts">
	interface Step {
		title: string;
		text: string;
	}

	interface Props {
		steps: Step[];
		/** Labels for the arrows between steps; arrows[i] sits between steps[i] and steps[i + 1]. */
		arrows?: string[];
		caption?: string;
	}

	let { steps, arrows = [], caption }: Props = $props();
</script>

<figure class="flow">
	<ol>
		{#each steps as step, i}
			<li class="step">
				<strong>{step.title}</strong>
				<span>{step.text}</span>
			</li>
			{#if i < steps.length - 1}
				<li class="arrow" aria-hidden={arrows[i] ? undefined : 'true'}>
					<span class="glyph" aria-hidden="true"></span>
					{#if arrows[i]}<span class="label">{arrows[i]}</span>{/if}
				</li>
			{/if}
		{/each}
	</ol>
	{#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>

<style>
	.flow {
		margin: 1.6em 0;
	}

	ol {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* Each step is a small pane: its name in the accent color, what it does underneath. */
	/* margin: 0 undoes the README list spacing (.prose li + li) the flow sits inside. */
	.step,
	.arrow {
		margin: 0;
	}

	.step {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 12px 14px;
		border: 1px solid var(--border-strong);
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.step strong {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--accent);
	}

	.step span {
		color: var(--muted);
	}

	.arrow {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 0 6px 18px;
		font-size: 0.75rem;
		color: var(--muted);
	}

	.glyph::before {
		content: '↓';
		color: var(--accent);
		font-weight: 700;
	}

	@media (min-width: 760px) {
		ol {
			flex-direction: row;
			align-items: stretch;
		}

		.step {
			flex: 1 1 0;
			min-width: 0;
		}

		.arrow {
			flex: 0 0 auto;
			flex-direction: column;
			justify-content: center;
			gap: 2px;
			max-width: 104px;
			padding: 0 8px;
			text-align: center;
		}

		.glyph::before {
			content: '──▶';
		}
	}
</style>
