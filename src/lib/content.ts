import type { Lang } from './i18n';

export interface Job {
	role: string;
	org: string;
	dates: string;
	summary: string;
	/** Project pages are English-only, so both languages link to the same page. */
	link?: { label: string; href: string };
}

export const intro = {
	en: {
		description:
			'Computer engineering student at İzmir Institute of Technology. I love the art of developing things: a CPU scheduler simulator, a multiplayer game, and a Werewolf game played by AI agents.',
		eyebrow: 'Computer Engineering · İzmir Institute of Technology · Class of 2027',
		title: 'Hi, I’m Halil. I\u00a0love the art of developing things.',
		lede: 'Some of what I make ends up useful, some maybe not, but I enjoy the process either way. A few of them: a CPU scheduler simulator, a multiplayer game, and a Werewolf game played by AI agents. I’ve interned at ASELSAN and TechNarts, and I’m looking for internships and new-grad roles starting 2027.',
		downloadCv: 'Download CV',
		email: 'Email',
		workTitle: 'Selected work',
		readMore: 'Read more →',
		experienceTitle: 'Experience'
	},
	tr: {
		description:
			'İzmir Yüksek Teknoloji Enstitüsü’nde bilgisayar mühendisliği öğrencisi. Bir şeyler geliştirme sanatını seviyorum: CPU scheduler simülatörü, multiplayer bir oyun ve AI agent’ların oynadığı bir Vampir Köylü oyunu.',
		eyebrow: 'Bilgisayar Mühendisliği · İzmir Yüksek Teknoloji Enstitüsü · Mezuniyet 2027',
		title: 'Merhaba, ben Halil. Bir şeyler geliştirme sanatını seviyorum.',
		lede: 'Yaptıklarımın bazıları işe yarıyor, bazıları belki yaramıyor ama süreçten her seferinde keyif alıyorum. Birkaçı: bir CPU scheduler simülatörü, multiplayer bir oyun ve AI agent’ların oynadığı bir Vampir Köylü oyunu. ASELSAN ve TechNarts’ta staj yaptım; 2027’den itibaren staj ve yeni mezun pozisyonlarına bakıyorum.',
		downloadCv: 'CV’yi indir',
		email: 'E-posta',
		workTitle: 'Projeler',
		readMore: 'Devamını oku (İngilizce) →',
		experienceTitle: 'Deneyim'
	}
} satisfies Record<Lang, Record<string, string>>;

export const experience: Record<Lang, Job[]> = {
	en: [
		{
			role: 'Embedded Systems Intern',
			org: 'ASELSAN',
			dates: 'Aug – Sep 2026',
			summary:
				'Built a trace-driven CPU scheduling simulator in C++20, and an AGENTS.md generator that cut AI agents’ token use by about 20% in benchmark tasks.',
			link: { label: 'The scheduler', href: '/projects/scheduler' }
		},
		{
			role: 'Software Engineering Intern',
			org: 'TechNarts',
			dates: 'Jun – Sep 2025',
			summary:
				'Built Topluluk, a community platform, on my own: Django REST, React and TypeScript, with recommendations from sentence embeddings in pgvector.',
			link: { label: 'Topluluk', href: '/projects/topluluk' }
		},
		{
			role: 'Electronics Team Member',
			org: 'Cengaver Rover Team, IYTE',
			dates: 'Oct 2024 – Jun 2025',
			summary:
				'Wrote STM32 firmware in C that sends commands to the rover’s VESC motor controllers over CAN and decodes their status packets.'
		},
		{
			role: 'Technical Core Member',
			org: 'Google Developer Student Clubs, IYTE',
			dates: 'Oct 2023 – Jun 2024',
			summary:
				'Helped organize technical workshops and speaker sessions for 100+ students, and helped newer members get started with software development.'
		}
	],
	tr: [
		{
			role: 'Gömülü Sistemler Stajyeri',
			org: 'ASELSAN',
			dates: 'Ağu – Eyl 2026',
			summary:
				'C++20 ile trace tabanlı bir CPU scheduler simülatörü geliştirdim. Ayrıca AI agent’lar için AGENTS.md üreten bir OpenCode skill’i yazdım; benchmark görevlerinde token kullanımını yaklaşık %20 azalttı.',
			link: { label: 'Scheduler projesi', href: '/projects/scheduler' }
		},
		{
			role: 'Yazılım Mühendisliği Stajyeri',
			org: 'TechNarts',
			dates: 'Haz – Eyl 2025',
			summary:
				'Topluluk adında, Reddit benzeri bir platformu tek başıma geliştirdim: Django REST, React ve TypeScript. Öneri sistemi, pgvector’da tutulan sentence embedding’lere dayanıyor.',
			link: { label: 'Topluluk', href: '/projects/topluluk' }
		},
		{
			role: 'Elektronik Ekibi Üyesi',
			org: 'Cengaver Rover Takımı, İYTE',
			dates: 'Eki 2024 – Haz 2025',
			summary:
				'Rover’daki VESC motor sürücülerine CAN üzerinden komut gönderen ve status paketlerini çözen STM32 kodunu C ile yazdım.'
		},
		{
			role: 'Technical Core Member',
			org: 'Google Developer Student Clubs, İYTE',
			dates: 'Eki 2023 – Haz 2024',
			summary:
				'100’den fazla öğrencinin katıldığı teknik workshop’ları ve konuşmacı etkinliklerini düzenlemeye yardım ettim; yeni üyelerin yazılıma başlamasına destek oldum.'
		}
	]
};
