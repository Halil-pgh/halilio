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
		homeLabel: 'Home',
		work: 'Work',
		about: 'About',
		aboutHref: '/about',
		cv: 'CV',
		switchText: 'TR',
		switchLabel: 'Türkçe',
		toggleTheme: 'Toggle light mode',
		getInTouch: 'Get in touch',
		footerCommand: 'echo "get in touch"',
		emailLine: 'The fastest way to reach me is email:',
		cvPdf: 'CV (PDF)',
		skip: 'Skip to content',
		newTab: 'Opens in a new tab'
	},
	tr: {
		home: '/tr',
		homeLabel: 'Ana sayfa',
		work: 'Projeler',
		about: 'Hakkımda',
		aboutHref: '/tr/hakkimda',
		cv: 'CV',
		switchText: 'EN',
		switchLabel: 'English',
		toggleTheme: 'Açık modu aç/kapat',
		getInTouch: 'İletişim',
		footerCommand: 'echo "iletişim"',
		emailLine: 'Bana en hızlı e-postayla ulaşabilirsiniz:',
		cvPdf: 'CV (PDF)',
		skip: 'İçeriğe geç',
		newTab: 'Yeni sekmede açılır'
	}
} satisfies Record<Lang, Record<string, string>>;
