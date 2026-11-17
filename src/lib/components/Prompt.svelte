<script lang="ts">
	interface Props {
		/** The "command" typed at the prompt, e.g. "ls projects/". */
		command: string;
		/** The working directory shown before the $. */
		path?: string;
	}

	let { command, path = '~' }: Props = $props();
</script>

<!-- Decoration: the section's real heading follows, so screen readers skip the shell line. -->
<p class="prompt" aria-hidden="true">
	<span class="user">halil@izmir</span>:<span class="path">{path}</span>$ <span class="command"
		>{command}</span
	>
</p>

<style>
	.prompt {
		color: var(--muted);
		font-size: 0.875rem;
		overflow-wrap: anywhere;
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
</style>
