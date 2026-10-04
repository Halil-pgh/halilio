<script lang="ts">
	import Flow from '$lib/components/Flow.svelte';
	import ProjectPage from '$lib/components/ProjectPage.svelte';
</script>

<ProjectPage slug="topluluk">
	<h2>What it is</h2>
	<p>
		<em>Topluluk</em> means “community” in Turkish. It has communities you can join, topics with
		threaded comment replies, up- and downvotes, moderators who can remove content and ban users, and
		live notifications. The backend is Django REST Framework, the frontend is React with TypeScript, and
		Docker Compose runs the whole stack: PostgreSQL with pgvector, Redis, the API and the UI.
	</p>

	<h2>Recommendations from meaning, not popularity</h2>
	<Flow
		steps={[
			{
				title: 'New content',
				text: 'Every topic, comment and community is embedded with Sentence-Transformers (all-MiniLM-L6-v2, 384 dimensions).'
			},
			{ title: 'pgvector', text: 'The vector is stored in PostgreSQL next to the row it describes.' }
		]}
		arrows={['on save']}
	/>
	<Flow
		steps={[
			{
				title: 'You interact',
				text: 'Votes count three times their value, views count once, joining a community half.'
			},
			{
				title: 'Interest vector',
				text: 'A running weighted average of everything you’ve interacted with.'
			},
			{
				title: 'Recommendations',
				text: 'The 10 nearest topics you haven’t seen yet, by cosine distance.'
			}
		]}
		arrows={['update', 'query']}
		caption="Because a downvote has a negative weight, it pushes your interests away from that topic."
	/>
	<p>
		The interest vector is updated incrementally: each profile stores the weighted sum and the total
		weight, so a new interaction is one vector addition rather than a pass over your whole history.
	</p>
	<pre><code>def update_interaction(self, interaction_embedding, weight):
    if self.weighted_sum_vector is not None:
        ws_vec = np.array(self.weighted_sum_vector)
    else:
        ws_vec = np.zeros(384)
    tw = self.total_weight

    ws_vec += weight * np.array(interaction_embedding)
    tw += weight

    self.weighted_sum_vector = ws_vec.tolist()
    self.total_weight = tw
    self.interest_vector = (ws_vec / tw).tolist()
    self.save()</code></pre>
	<p>
		Ranking then happens inside the database: pgvector orders topics by cosine distance to the
		interest vector, after excluding everything you’ve already clicked or voted on.
	</p>

	<h2>The rest of the platform</h2>
	<ul>
		<li>
			<strong>Hot topics:</strong> topics from the last 24 hours, ranked by views plus five times their
			votes.
		</li>
		<li>
			<strong>Live notifications:</strong> a WebSocket per signed-in user through Django Channels, with
			Redis as the channel layer.
		</li>
		<li>
			<strong>Moderation:</strong> per-community moderators, with permissions for removing topics and
			comments and banning users.
		</li>
		<li><strong>Auth:</strong> JWT, with the refresh token kept in a cookie.</li>
	</ul>
</ProjectPage>
