<script lang="ts">
	import ProjectPage from '$lib/components/ProjectPage.svelte';
</script>

<ProjectPage slug="wolf">
	<h2>The game</h2>
	<p>
		Werewolf is a game of hidden roles. Two werewolves hide among the village. At night they pick
		someone to kill, the Doctor protects one player, and the Sheriff checks whether someone is a wolf.
		During the day everyone talks, accuses and defends, then votes one player out. The village wins
		when every wolf is dead; the wolves win as soon as they can no longer be outvoted.
	</p>
	<p>
		In Wolf, every player is a Claude agent with a secret role and its own personality: the
		Contrarian, the Quiet One, the Detective, the Hothead. Each turn, an agent gives a public move
		and a private thought. So you can watch a wolf calmly agree on a kill with its partner at night,
		then lead the hunt for the killer the next morning.
	</p>

	<h2>How it works</h2>
	<ul>
		<li>
			<strong>The engine owns the game; agents only answer.</strong> All game state lives on one
			thread. For each decision, the engine builds a prompt from that player’s own view of the game:
			a villager’s log never contains the wolves’ private chat. Hidden-information tests check that
			no prompt leaks what its player shouldn’t know.
		</li>
		<li>
			<strong>Concurrent, but deterministic.</strong> The engine builds every request first, sends
			them to Claude in parallel (four at a time by default), then applies the answers and announces
			them in a fixed order. The result never depends on which call came back first.
		</li>
		<li>
			<strong>Answers are checked.</strong> Every reply must match a JSON schema for its task. A bad
			or failed reply is retried, and if the retries run out the game makes a random legal move
			instead of crashing.
		</li>
		<li>
			<strong>Two backends.</strong> The real one runs Claude Code headlessly on a Claude
			subscription, so there’s no API key. The mock plays random legal moves instantly from a seed,
			which makes every rule testable: 153 tests run in about 20 seconds without a single model call.
		</li>
		<li>
			<strong>Every game is a file.</strong> Events are written to a JSONL log and a Markdown
			transcript, and <code>wolf replay</code> re-watches any game with no AI calls.
		</li>
	</ul>

	<h2>Debugging with replays</h2>
	<p>
		One afternoon, some agent turns started coming back refused by the model’s safety filter: six
		decisions across two games, mostly ordinary night actions like the Doctor choosing whom to
		protect. Only three of the prompts behind them had been saved.
	</p>
	<p>
		That turned out not to matter. Because the engine is deterministic, replaying a game’s logged events up
		to the moment a request was built produces that exact request again. I rebuilt every refused
		prompt from the logs, checked the method against three prompts that had been saved at the time
		(all identical), and re-sent each one to two models to see which refusals were consistent. The
		refused prompts turned out to be ordinary game turns, and the error details pointed at the
		prompts asking for the agent’s “private reasoning”, not at the game’s violence.
	</p>
	<p class="callout">
		Determinism started as a way to make tests reliable. It ended up being the best debugging tool
		in the project.
	</p>

	<h2>Running it</h2>
	<pre><code>python -m wolf play                  # 9 players on Sonnet
python -m wolf play --view public    # see only what a villager sees
python -m wolf play --backend mock   # instant, free, no AI
python -m wolf replay games/&lt;file&gt;.jsonl</code></pre>
	<p>
		Setup, flags and the full rules are in the <a href="https://github.com/Halil-pgh/wolf">README on
		GitHub</a>.
	</p>
</ProjectPage>
