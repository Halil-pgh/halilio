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

	.step {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 14px 16px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--surface);
		font-size: 0.9375rem;
		line-height: 1.45;
	}

	.step strong {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--accent);
	}

	.step span {
		color: var(--muted);
	}

	.arrow {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 0 6px 22px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--muted);
	}

	.glyph::before {
		content: '↓';
		font-size: 1.1rem;
		color: var(--accent);
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
			max-width: 92px;
			padding: 0 8px;
			text-align: center;
		}

		.glyph::before {
			content: '→';
		}
	}
</style>
