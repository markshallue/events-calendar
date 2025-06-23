'use client';

import {
	IconBook,
	IconBrandGithub,
	IconCalendar,
	IconCalendarShare,
	IconHome,
	IconNumber123,
	type TablerIcon,
} from '@tabler/icons-react';
import { Box, Burger, Button, Group, Title } from '@mantine/core';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { ColorSchemeToggle } from './ColorSchemeToggle';

type Page = {
	label: string;
	href: string;
	icon: TablerIcon;
};

const pages: Page[] = [
	{ label: 'Home', href: '/', icon: IconHome },
	{ label: 'Getting started', href: '/getting-started', icon: IconNumber123 },
	{ label: 'Docs', href: '/docs', icon: IconBook },
	{ label: 'Examples', href: '/examples', icon: IconCalendarShare },
];

export function Header() {
	const pathname = usePathname();

	const [opened, { toggle }] = useDisclosure(false);

	const items = pages.map(page => {
		const active = pathname === page.href;
		return (
			<Link key={page.label} href={page.href} className={classes.link} data-active={active}>
				{page.label}
			</Link>
		);
	});

	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group>
					<Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
					<Box component={Link} href='/' td='none' className={classes.title}>
						<Group gap={8} align='center'>
							<IconCalendar size={20} />
							<Title order={3} fw={600}>
								Events Calendar
							</Title>
						</Group>
					</Box>
				</Group>

				<Group gap='xs'>
					{items}

					<Button
						size='xs'
						variant='default'
						leftSection={<IconBrandGithub size={16} />}
						component='a'
						href='https://github.com/markshallue/events-calendar'
						target='_blank'
						aria-label='View on GitHub'
					>
						Source code
					</Button>

					<ColorSchemeToggle />
				</Group>
			</div>
		</header>
	);
}
