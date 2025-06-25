'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconCalendar, IconBrandGithub } from '@tabler/icons-react';
import { ActionIcon, Box, Burger, Group, Title, Tooltip } from '@mantine/core';

import { pages } from '@/config';

import classes from './Header.module.css';
import { ColorSchemeToggle } from '../ColorSchemeToggle';

interface Props {
	opened: boolean;
	toggle: () => void;
}

export function Header({ opened, toggle }: Props) {
	const pathname = usePathname();

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
					<Group gap='xs' visibleFrom='sm'>
						{items}
					</Group>

					<Tooltip label='Source code'>
						<ActionIcon
							size='lg'
							radius='md'
							component='a'
							variant='default'
							title='View on GitHub'
							aria-label='View on GitHub'
							href='https://github.com/markshallue/events-calendar'
						>
							<IconBrandGithub size={22} strokeWidth={1.5} />
						</ActionIcon>
					</Tooltip>

					<ColorSchemeToggle />
				</Group>
			</div>
		</header>
	);
}
