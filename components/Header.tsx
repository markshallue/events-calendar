'use client';

import { IconBook, IconBrandGithub, IconCalendarShare, IconHome, IconNumber123, TablerIcon } from '@tabler/icons-react';
import { Box, Button, Group, Title } from '@mantine/core';
import Link from 'next/link';

type Page = {
	label: string;
	href: string;
	icon: TablerIcon;
};

const pages: Page[] = [
	{
		label: 'Home',
		href: '/',
		icon: IconHome,
	},
	{
		label: 'Getting started',
		href: '/getting-started',
		icon: IconNumber123,
	},
	{
		label: 'Docs',
		href: '/docs',
		icon: IconBook,
	},
	{
		label: 'Examples',
		href: '/examples',
		icon: IconCalendarShare,
	},
];

export function Header() {
	return (
		<Group h='100%' px='md' justify='space-between'>
			<Box component={Link} href='/' td='none' c='dark'>
				<Title order={2}>Events Calendar</Title>
			</Box>
			<Group gap='xs'>
				{pages.map(({ label, href, icon: Icon }) => (
					<Button
						key={href}
						size='xs'
						fz='sm'
						variant='subtle'
						color='gray'
						c='dark'
						leftSection={<Icon size={16} />}
						component={Link}
						href={href}
					>
						{label}
					</Button>
				))}
				<Button
					size='xs'
					variant='default'
					leftSection={<IconBrandGithub size={16} />}
					component='a'
					aria-label={`View events-calendar source code on GitHub`}
					href='https://github.com/markshallue/events-calendar'
					target='_blank'
				>
					Source code
				</Button>
			</Group>
		</Group>
	);
}
