<script lang="ts">
	import Flow from '$lib/components/Flow.svelte';
	import ProjectPage from '$lib/components/ProjectPage.svelte';
	import YouTube from '$lib/components/YouTube.svelte';

	// Averages over one six-job workload (time in ticks), from the manifests the simulator writes.
	const runs = [
		{ label: 'RR, quantum 2', response: 3.17, waiting: 22.5, turnaround: 35.0, utilization: 98, switches: 28 },
		{ label: 'RR, quantum 8', response: 8.83, waiting: 21.83, turnaround: 34.33, utilization: 96, switches: 16 },
		{ label: 'Aging priority', response: 4.17, waiting: 14.83, turnaround: 27.33, utilization: 92, switches: 24 },
		{ label: 'MLFQ', response: 2.83, waiting: 21.5, turnaround: 34.0, utilization: 100, switches: 28 },
		{ label: 'CFS', response: 1.5, waiting: 18.17, turnaround: 30.67, utilization: 92, switches: 30 }
	];

	const best = {
		response: Math.min(...runs.map((r) => r.response)),
		waiting: Math.min(...runs.map((r) => r.waiting)),
		turnaround: Math.min(...runs.map((r) => r.turnaround)),
		utilization: Math.max(...runs.map((r) => r.utilization)),
		switches: Math.min(...runs.map((r) => r.switches))
	};
</script>

<ProjectPage slug="scheduler">
	{#snippet hero()}
		<YouTube
			id="aF2OY-GZKmM"
			title="CPU scheduling algorithms, animated"
			poster="/media/scheduler-video.webp"
		/>
	{/snippet}

	<h2>What it is</h2>
	<p>
		A CPU scheduling comparison harness I built during my internship on ASELSAN’s embedded systems
		team. It has one simulation engine, interchangeable scheduling policies, and a single set of
		metrics computed the same way for all of them, so the comparison is fair.
	</p>
	<p>
		The founding rule is that <strong>no algorithm may see the future</strong>. A policy is told only
		what has already happened: who arrived, who has been waiting, how much CPU each job has used.
		That’s the standard a real scheduler is held to, and it’s why Shortest Job First isn’t here while
		MLFQ and CFS are.
	</p>

	<h2>The pieces</h2>
	<Flow
		steps={[
			{ title: 'Driver', text: 'Owns the loop and decides how time moves.' },
			{
				title: 'Kernel',
				text: 'Wakes only when something can change: charges elapsed time, notices what finished, records every event.'
			},
			{ title: 'Policy', text: 'Has no clock and no power to act. It only answers.' }
		]}
		arrows={['advance', 'who runs next?']}
	/>
	<Flow
		steps={[
			{ title: 'Event trace', text: 'One CSV row per event, in order: seq, time, event, job, cpu.' },
			{
				title: 'Accountant',
				text: 'Turns the trace into metrics. It has never heard of any algorithm.'
			},
			{
				title: 'Animation',
				text: 'Manim draws the same trace and refuses to draw a chart that disagrees with the numbers.'
			}
		]}
		arrows={['read afterwards', 'checked against']}
		caption="During a run, the kernel asks a policy it can’t name for decisions. Afterwards, everything is measured from the trace alone."
	/>
	<p>
		Round Robin, MLFQ, CFS and aging priority each live in one file and register themselves by name,
		so a run picks its algorithm with a string. Because the accountant only reads the trace, adding a
		new algorithm never needs a new metric, and adding a metric never touches an algorithm.
	</p>

	<h2>Checking the numbers</h2>
	<p>
		Between arriving and finishing, a job is always in exactly one state: waiting, running, blocked
		on I/O, or being switched in. So for every finished job,
		<code>turnaround = waiting + CPU + I/O + switch overhead</code> must hold exactly. It’s a
		conservation law rather than an estimate, and the strongest check on the whole pipeline: if it
		fails, blocked time is being counted as waiting time somewhere. All numbers are integer ticks
		until the last division, so results are exact and reproducible. The project has 84 Catch2
		tests.
	</p>

	<h2>One workload, five runs</h2>
	<div class="table-scroll">
		<table>
			<thead>
				<tr>
					<th>Run</th>
					<th>Avg response</th>
					<th>Avg waiting</th>
					<th>Avg turnaround</th>
					<th>CPU use</th>
					<th>Context switches</th>
				</tr>
			</thead>
			<tbody>
				{#each runs as run}
					<tr>
						<td>{run.label}</td>
						<td class:best={run.response === best.response}>{run.response.toFixed(2)}</td>
						<td class:best={run.waiting === best.waiting}>{run.waiting.toFixed(2)}</td>
						<td class:best={run.turnaround === best.turnaround}>{run.turnaround.toFixed(2)}</td>
						<td class:best={run.utilization === best.utilization}>{run.utilization}%</td>
						<td class:best={run.switches === best.switches}>{run.switches}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="caption">
		Averages in ticks over one six-job workload, mixing CPU-heavy and I/O-heavy jobs. RR is Round
		Robin. Best value per column in bold. With one workload this shows trade-offs, not a winner.
	</p>
	<p>
		Even this small workload shows the trade-offs. CFS gets every new job onto the CPU fastest. Aging
		priority finishes jobs soonest on average. Raising Round Robin’s quantum from 2 to 8 cuts context
		switches from 28 to 16, but nearly triples the average response time.
	</p>

	<h2>The animation</h2>
	<p>
		The video above is rendered with Manim (Python) straight from the simulator’s output. Nothing is
		invented at render time: each scene reads the trace files, and the loader cross-checks every trace
		against its recorded metrics before drawing. It walks through the six jobs, why they can’t all be
		satisfied at once, each algorithm in turn, and a final scoreboard.
	</p>
</ProjectPage>

<style>
	td.best {
		font-weight: 700;
		color: var(--accent);
	}
</style>
