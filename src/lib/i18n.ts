export type Lang = 'en' | 'tr';

export function langOf(pathname: string): Lang {
	return pathname === '/tr' || pathname.startsWith('/tr/') ? 'tr' : 'en';
}

/** Pages that exist in both languages, as [English, Turkish] paths. */
const translations: [string, string][] = [
	['/', '/tr'],
	['/about', '/tr/hakkimda']
];

/** The same page in the other language, if it has one. */
export function translationOf(pathname: string): string | undefined {
	for (const [en, tr] of translations) {
		if (pathname === en) return tr;
		if (pathname === tr) return en;
	}
}

/** Where the language switch leads: the translated page, or the other language's home page. */
export function switchTarget(pathname: string): string {
	return translationOf(pathname) ?? (langOf(pathname) === 'tr' ? '/' : '/tr');
}

export const ui = {
	en: {
		home: '/',
		work: 'Work',
		about: 'About',
		aboutHref: '/about',
		cv: 'CV',
		switchText: 'TR',
		switchLabel: 'Türkçe',
		toggleTheme: 'Toggle dark mode',
		getInTouch: 'Get in touch',
		emailLine: 'The fastest way to reach me is email:',
		cvPdf: 'CV (PDF)',
		skip: 'Skip to content'
	},
	tr: {
		home: '/tr',
		work: 'Projeler',
		about: 'Hakkımda',
		aboutHref: '/tr/hakkimda',
		cv: 'CV',
		switchText: 'EN',
		switchLabel: 'English',
		toggleTheme: 'Karanlık modu aç/kapat',
		getInTouch: 'İletişim',
		emailLine: 'Bana en hızlı e-postayla ulaşabilirsiniz:',
		cvPdf: 'CV (PDF)',
		skip: 'İçeriğe geç'
	}
} satisfies Record<Lang, Record<string, string>>;
