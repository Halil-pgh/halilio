<script lang="ts">
	import Flow from '$lib/components/Flow.svelte';
	import ProjectPage from '$lib/components/ProjectPage.svelte';
</script>

<ProjectPage slug="borsa">
	<h2>What it shows</h2>
	<p>
		<a href="https://borsa.halilio.dev/today">The main board</a> draws the BIST 100 as a treemap: one
		rectangle per company, its area proportional to market cap, green or red by how far the price has
		moved since yesterday’s close. Above it sit the index move, how much lira value was added to or
		wiped off the index today, total turnover, and how many stocks rose or fell.
	</p>
	<p>
		Clicking a tile opens a stock card: the live price, where today’s move sits in the ±10% daily
		limit, the company’s share of the index and of today’s move, and a year of price history you can
		scrub through. The toolbar knows the exchange’s hours, holidays and half days, and counts down to
		the next open or close. There’s also <a href="https://borsa.halilio.dev/hangisi"
			>Hangisi daha büyük?</a
		>, a game where you pick which of two companies is bigger, and the pairs get closer the longer
		your streak runs.
	</p>

	<h2>Three free sources, no API keys</h2>
	<Flow
		steps={[
			{ title: 'Yahoo Finance', text: 'Primary quotes, as JSON, about 15 minutes delayed.' },
			{ title: 'Mynet', text: 'Fallback quotes: all 100 stocks scraped from one HTML table.' },
			{
				title: 'İş Yatırım',
				text: 'Shares outstanding, price history, and last-resort end-of-day quotes.'
			}
		]}
		arrows={['if refused', 'if refused']}
		caption="Quotes come from the first provider that answers, and the page header shows which one won."
	/>
	<p>
		Market cap is computed as shares × price rather than read as a fixed number, so tiles resize as
		prices move during the session. Shares are cached for 12 hours and quotes for 60 seconds, and a
		failed refresh keeps serving the last good values instead of showing an error.
	</p>

	<h2>Two bugs worth knowing about</h2>
	<ul>
		<li>
			<strong>Yahoo returns HTTP 429 from shared or datacenter IPs.</strong> That’s a rate limit on the
			address, not a broken endpoint: it works from a home connection. When the header says “Mynet”, the
			fallback did its job.
		</li>
		<li>
			<strong>İş Yatırım doesn’t return rows in a stable order.</strong> The same request comes back in
			date order only about half the time, so rows are sorted by date before anything reads “the latest
			close”. Removing that one sort silently produces wrong prices, which is why it has a test.
		</li>
	</ul>

	<h2>The treemap</h2>
	<p>
		The layout is a squarified treemap (Bruls, Huizing and van Wijk), written as a pure function of
		the items and the available width and height. It knows nothing about Svelte, so it’s unit-tested
		directly; the page only measures its container and hands over the numbers.
	</p>
</ProjectPage>
