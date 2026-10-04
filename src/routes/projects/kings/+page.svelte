<script lang="ts">
	import Flow from '$lib/components/Flow.svelte';
	import ProjectPage from '$lib/components/ProjectPage.svelte';
</script>

<ProjectPage slug="kings">
	<h2>The game</h2>
	<p>
		You play as a square that keeps walking towards your mouse cursor, and you grow your kingdom by
		placing buildings: a <strong>Home</strong> raises your soldier capacity, a <strong>Mine</strong>
		earns money every second, and buildings can’t be placed too close to each other. One player picks
		<em>Create Game</em> to host, the others pick <em>Join Game</em> and add the host’s IP, and everyone
		sees each other’s movement and buildings in real time.
	</p>

	<h2>Architecture</h2>
	<Flow
		steps={[
			{
				title: 'Every client',
				text: 'Sends its moves, new buildings and chat. The host’s own client is just another client, over localhost.'
			},
			{
				title: 'Server thread',
				text: 'An ENet host on port 7777, on its own std::thread. Keeps a copy of every player so late joiners get the current state.'
			},
			{ title: 'Other clients', text: 'Receive the relayed packets and update their view of the world.' }
		]}
		arrows={['UDP', 'relay']}
		caption="A listen server: whoever hosts runs the server in the background of their own game."
	/>
	<ul>
		<li>
			<strong>The host is a normal client.</strong> <em>Create Game</em> starts the server on a background
			thread, then connects to it over localhost like everyone else. So there is one client code path for
			all players, and the server thread only ever touches server state; drawing and input stay on the
			main thread.
		</li>
		<li>
			<strong>Typed packets.</strong> Every message is a <code>Packet&lt;T&gt;</code> with a type
			(<code>Join</code>, <code>Leave</code>, <code>Move</code>, <code>CreateHome</code>,
			<code>CreateMine</code>, <code>Chat</code>), the sender’s id and its data. ENet handles the UDP
			connections and reliable delivery, and cereal binary archives turn packets, including the SFML
			types inside them, into bytes.
		</li>
		<li>
			<strong>Scenes and layers.</strong> A scene is an ordered stack of layers, each with its own view
			and entities. Input travels from the top layer down and stops at the first entity that handles it;
			drawing goes from the bottom up. Pop-ups like the options menu are just a new layer on top, so they
			draw above the game and get input first.
		</li>
	</ul>

	<h2>Background</h2>
	<p>
		Kings started out on SFML’s own networking. In summer 2024 I wrote
		<a href="https://github.com/Halil-pgh/LearningEnet">LearningEnet</a>, a small terminal client and
		server, to learn ENet and cereal, then moved Kings over to them.
	</p>
</ProjectPage>
