<script lang="ts">
	interface Props {
		/** The "command" typed at the prompt, e.g. "ls projects/". */
		command: string;
		/** The working directory shown before the $. */
		path?: string;
	}

	let { command, path = '~' }: Props = $props();

	// Each word stays whole (browsers would otherwise break "--graph" after its hyphens).
	const words = $derived(command.split(' '));
</script>

<!-- Decoration: the section's real heading follows, so screen readers skip the shell line. -->
<p class="prompt" aria-hidden="true">
	<span class="user">halil@izmir</span>:<span class="path">{path}</span>$ <span class="command"
		>{#each words as word, i}{#if i > 0}{' '}{/if}<span class="word">{word}</span>{/each}</span
	>
</p>

<style>
	.prompt {
		color: var(--muted);
		font-size: 0.875rem;
		overflow-wrap: break-word;
	}

	.user {
		color: var(--accent);
	}

	.path {
		color: var(--blue);
	}

	.command {
		color: var(--text);
	}

	.word {
		white-space: nowrap;
	}
</style>
