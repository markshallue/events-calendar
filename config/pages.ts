import { IconBook, IconHome, IconNumber123, IconCalendarShare, type TablerIcon } from '@tabler/icons-react';

type Page = {
	label: string;
	href: string;
	icon: TablerIcon;
};

export const pages: Page[] = [
	{ label: 'Home', href: '/', icon: IconHome },
	{ label: 'Getting started', href: '/getting-started', icon: IconNumber123 },
	{ label: 'API Docs', href: '/docs', icon: IconBook },
	{ label: 'Examples', href: '/examples', icon: IconCalendarShare },
];
