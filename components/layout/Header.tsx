'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Box, Burger, Group, ThemeIcon, Title } from '@mantine/core';

import { pages } from '@/config';

import classes from './Header.module.css';

import { GithubButton } from '../GithubButton';
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
						<Group gap='sm' align='center'>
							<ThemeIcon color='indigo' radius='md'>
								<Image src='/calendar-event-white.svg' alt='Calendar icon' width={18} height={18} />
							</ThemeIcon>
							<Title order={3} fw={600} className={classes.titleText}>
								Events Calendar
							</Title>
						</Group>
					</Box>
				</Group>

				<Group gap='xs'>
					<Group gap='xs' visibleFrom='sm'>
						{items}
					</Group>

					<GithubButton />

					<ColorSchemeToggle />
				</Group>
			</div>
		</header>
	);
}
