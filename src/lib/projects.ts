export type Media =
	| { kind: 'video'; mp4: string; webm?: string; poster: string; alt: string; position?: string }
	| { kind: 'image'; src: string; alt: string; position?: string }
	| { kind: 'art'; alt: string };

export interface Link {
	label: string;
	href: string;
}

export interface Project {
	slug: string;
	title: string;
	/** What kind of thing it is, in a few words. */
	kind: string;
	/** One sentence for the card on the home page. */
	hook: string;
	/** Where and when it was built. */
	context: string;
	/** Why I built it, in my own words: one string per paragraph. Opens the project page. */
	why?: string[];
	/** What's still rough, in my own words. Closes the project page. */
	rough?: string;
	/** The card text for the Turkish home page. The project pages themselves are English-only. */
	tr: { kind: string; hook: string; context: string };
	stack: string[];
	links: Link[];
	media: Media;
}

// The order here is the order on the home page; the first project gets the large card.
export const projects: Project[] = [
	{
		slug: 'wolf',
		title: 'Wolf',
		kind: 'Multi-agent LLM game',
		hook: 'Nine Claude agents play Werewolf: they scheme at night, bluff by day, and vote each other out. You watch every private thought.',
		context: 'Personal project · 2026',
		tr: {
			kind: 'Multi-agent LLM oyunu',
			hook: 'Dokuz Claude agent’ı Vampir Köylü oynuyor: gece plan kuruyorlar, gündüz blöf yapıyorlar, sonra oylamayla birbirlerini eliyorlar. Her birinin aklından geçenleri görebiliyorsunuz.',
			context: 'Kişisel proje · 2026'
		},
		why: [
			'Whenever I play Werewolf with my friends or family, I’m really struck by how everyone takes on a different role, how everyone keeps trying to convince somebody of something, and the social situation that comes out of all that. Some people always act randomly, some win without saying anything at all, and some are honestly masters at lying.',
			'Seeing all that made me curious how good LLMs would be at the same things, so I decided to build this. Of course, just giving LLMs some input wasn’t going to be enough. I didn’t know how to get them talking to each other, or how to give them their own personalities and let them interact, and I wanted to learn that too.'
		],
		rough: 'Some models really can’t see the bigger game. The Doctor and the Sheriff coordinating is a good example.',
		stack: ['Python', 'Claude', 'pytest'],
		links: [{ label: 'Source on GitHub', href: 'https://github.com/Halil-pgh/wolf' }],
		media: {
			kind: 'video',
			mp4: '/media/wolf-demo.mp4',
			webm: '/media/wolf-demo.webm',
			poster: '/media/wolf-demo.webp',
			alt: 'A recorded game in the terminal: the Sheriff investigates a werewolf at night, is killed before dawn, and on Day 1 the werewolf opens the discussion while a villager calls out his steering.',
			position: 'top'
		}
	},
	{
		slug: 'scheduler',
		title: 'CPU Scheduler Simulator',
		kind: 'Systems simulation',
		hook: 'Round Robin, MLFQ, CFS and aging priority on the same workload, measured by one accountant that has never heard of any of them.',
		context: 'ASELSAN internship · 2026',
		tr: {
			kind: 'Sistem simülasyonu',
			hook: 'Round Robin, MLFQ, CFS ve aging priority aynı iş yükünde çalışıyor ve hepsi aynı metriklerle ölçülüyor.',
			context: 'ASELSAN stajı · 2026'
		},
		why: [
			'This task wasn’t actually going to be mine. I kept begging my mentor for a C++ project, and in the end the team talked it over and told me to build a scheduler. I was really excited when I heard it: it was a chance to learn how the algorithms from our OS course are actually implemented, and how algorithms far more complex than the ones in that course work.'
		],
		stack: ['C++20', 'Catch2', 'Python', 'Manim'],
		links: [{ label: 'Watch the animation', href: 'https://youtu.be/aF2OY-GZKmM' }],
		media: {
			kind: 'image',
			src: '/media/scheduler-video.webp',
			alt: 'Title frame of the scheduler animation.'
		}
	},
	{
		slug: 'kings',
		title: 'Kings',
		kind: 'Multiplayer game',
		hook: 'A small top-down building game in C++ where the host runs the server on its own thread and everyone else joins over UDP.',
		context: 'Personal project · 2023–24',
		tr: {
			kind: 'Multiplayer oyun',
			hook: 'C++ ile yazdığım küçük, kuşbakışı bir inşa oyunu. Oyunu kuran kişi server’ı kendi oyununun içinde ayrı bir thread’de çalıştırıyor, diğerleri UDP üzerinden bağlanıyor.',
			context: 'Kişisel proje · 2023–24'
		},
		why: [
			'My biggest motivation was The Cherno, a YouTube channel I watched in high school. Cherno loves building game engines and once worked at EA, and he really knows his stuff. Watching his videos, I thought: why can’t I do this too? So I started learning from them how a game engine is put together and what to watch out for, and then I started making this game.',
			'The game logic isn’t fully finished yet, but it taught me how things work behind the scenes.'
		],
		rough: 'Using singletons together with multithreading makes race conditions hard to fix.',
		stack: ['C++', 'SFML', 'ENet', 'cereal'],
		links: [{ label: 'Source on GitHub', href: 'https://github.com/Halil-pgh/Kings' }],
		media: {
			kind: 'video',
			mp4: '/media/kings-gameplay.mp4',
			poster: '/media/kings-gameplay.webp',
			alt: 'Two players walking around the same map and placing homes and mines.'
		}
	},
	{
		slug: 'borsa',
		title: 'Borsa',
		kind: 'Market dashboard',
		hook: 'The BIST 100 as one live treemap, stitched together from three free data sources with no API keys.',
		context: 'Personal project · 2026',
		tr: {
			kind: 'Borsa dashboard’u',
			hook: 'BIST 100’ün tamamı tek bir canlı treemap’te; üç ücretsiz veri kaynağından, API key olmadan.',
			context: 'Kişisel proje · 2026'
		},
		why: [
			'Numbers going up and down on the stock market, how big the companies are, buying and selling: these things always excited me. So I thought, can’t I make a map myself where every company takes up space by its size, with its daily change on top? And I made it.',
			'After that I thought, I already have the data, so why not add a little quiz page too. It’s a place I can drop into in my free time, and I get to know the market better along the way.'
		],
		stack: ['SvelteKit', 'TypeScript', 'Vitest'],
		links: [{ label: 'Open the live site', href: 'https://borsa.halilio.dev/' }],
		media: {
			kind: 'image',
			src: '/media/borsa-today.webp',
			alt: 'The BIST 100 treemap: one tile per company, sized by market cap and colored by the day’s move.',
			position: 'top left'
		}
	},
	{
		slug: 'topluluk',
		title: 'Topluluk',
		kind: 'Community platform',
		hook: 'A full community platform built solo, with recommendations that come from sentence embeddings rather than popularity.',
		context: 'TechNarts internship · 2025',
		tr: {
			kind: 'Topluluk platformu',
			hook: 'Tek başıma geliştirdiğim, Reddit benzeri bir platform. Öneriler popülerliğe göre değil, sentence embedding’lere göre geliyor.',
			context: 'TechNarts stajı · 2025'
		},
		why: [
			'TechNarts told me: we use Django, so build anything you like, as long as the backend is Django. The first thing that came to mind was a community site. I thought something like Reddit would actually be pretty good, so honestly, my whole motivation was to build an exact copy of Reddit.'
		],
		stack: ['Django REST', 'React', 'TypeScript', 'pgvector', 'WebSockets'],
		links: [{ label: 'Source on GitHub', href: 'https://github.com/Halil-pgh/Topluluk-all' }],
		media: {
			kind: 'art',
			alt: 'Illustration: topics as points in an embedding space, with a user’s interest vector and its nearest topics highlighted.'
		}
	}
];

export function getProject(slug: string): Project {
	const project = projects.find((p) => p.slug === slug);
	if (!project) throw new Error(`Unknown project: ${slug}`);
	return project;
}

/** The project after this one, wrapping around, for the link at the bottom of each project page. */
export function nextProject(slug: string): Project {
	const i = projects.findIndex((p) => p.slug === slug);
	return projects[(i + 1) % projects.length];
}

export const site = {
	name: 'Halil İbrahim Öztürk',
	url: 'https://halilio.dev',
	email: 'halil.pgh@gmail.com',
	github: 'https://github.com/Halil-pgh',
	linkedin: 'https://www.linkedin.com/in/halilio/',
	cv: '/Halil_Ibrahim_Ozturk_CV.pdf'
};
