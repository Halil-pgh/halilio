<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="About"
	description="Halil İbrahim Öztürk: computer engineering student at İzmir Institute of Technology, graduating June 2027."
/>

<div class="container page">
	<p class="eyebrow">About</p>
	<h1>Halil İbrahim Öztürk</h1>

	<div class="prose">
		<p class="lede">
			I’m a fourth-year computer engineering student at İzmir Institute of Technology, graduating in
			June 2027. I’m still at university, but I can’t wait to start working: working on real projects
			and solving real engineering problems is what makes me happy.
		</p>

		<h2>How I started</h2>
		<p>
			I started coding in my first year of high school, in 2019. The pandemic kept me at home, coding
			gave me something to do, and nothing else gave me the same joy. I started by learning to make
			games in Unity. Before that I’d written a little block-based robotics code at Deneyap, but I
			didn’t really know much.
		</p>
		<p>
			After a while it bothered me that everything in Unity just worked, like magic, and I wanted to
			understand the details. I followed MIT’s introduction to programming course on YouTube and tried
			writing my own code in Python and C. Around the same time I found a YouTube channel that made games
			and animations in p5.js, where you work much closer to the pixels than in Unity, and I spent a lot
			of time there: first a snake game, then things like tower defense.
		</p>
		<p>
			Then I found The Cherno, who teaches C++ on YouTube, and that’s where I found myself in computer
			engineering. My foundation was laid around the end of middle school and the start of high school,
			and every video and every problem I ran into along the way pulled me further into this field.
		</p>

		<h2>What I’m looking for</h2>
		<p>
			Internships and new-grad roles from 2027, in systems, embedded, game or backend development. I’m
			most at home in C++ and Python, and comfortable across the stack when a project needs it. I’m open
			to relocating.
		</p>

		<h2>Experience</h2>
		<ul>
			<li>
				<strong>ASELSAN</strong>, Embedded Systems Intern, Aug – Sep 2026. A trace-driven CPU scheduler
				simulator in C++20 (<a href="/projects/scheduler">more here</a>), and an AGENTS.md generator for AI
				coding agents. My first time working at one of Türkiye’s biggest companies, and there are a lot of
				people there.
			</li>
			<li>
				<strong>TechNarts</strong>, Software Engineering Intern, Jun – Sep 2025. Built
				<a href="/projects/topluluk">Topluluk</a> on my own. A growing, startup-like place; the flexible
				working hours were great, and it was much more relaxed than a big company.
			</li>
			<li>
				<strong>Cengaver Rover Team, IYTE</strong>, Electronics Team Member, Oct 2024 – Jun 2025. STM32
				firmware for the rover’s motor controllers over CAN. My teammates really wanted to build things and
				place well in competitions, and getting to know them was good for my network.
			</li>
			<li>
				<strong>Google Developer Student Clubs, IYTE</strong>, Technical Core Member, Oct 2023 – Jun
				2024. Helped run technical workshops and speaker sessions for 100+ students. My first role in a
				community; meeting new people made it easier to settle into a university I’d just started.
			</li>
		</ul>

		<h2>Education</h2>
		<ul>
			<li>
				<strong>İzmir Institute of Technology</strong>, B.Sc. Computer Engineering, expected June 2027.
				GPA 3.73 / 4.00.
			</li>
			<li><strong>Ankara Pursaklar Science High School</strong>, graduated 2023.</li>
			<li><strong>Deneyap</strong>, T3 Foundation, graduated 2020.</li>
		</ul>

		<h2>Outside of code</h2>
		<p>
			When I’m away from the computer, I’m usually playing basketball, chess or table tennis.
		</p>

		<h2>Languages</h2>
		<p>Turkish (native), English (B2).</p>
	</div>
</div>

<style>
	.page {
		padding-top: clamp(40px, 8vw, 88px);
	}

	h1 {
		margin: 10px 0 28px;
		font-size: clamp(2.4rem, 6vw, 3.6rem);
	}

	.lede {
		font-size: 1.25rem;
		line-height: 1.55;
	}
</style>
