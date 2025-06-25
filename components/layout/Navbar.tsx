'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, ScrollArea } from '@mantine/core';

import { pages } from '@/config/pages';

import classes from './Navbar.module.css';

interface Props {
	toggle: () => void;
}

export function Navbar({ toggle }: Props) {
	const pathname = usePathname();

	const items = pages.map(page => {
		const active = pathname === page.href;
		return (
			<Link key={page.label} href={page.href} className={classes.link} data-active={active} onClick={toggle}>
				{page.label}
			</Link>
		);
	});
	return (
		<ScrollArea.Autosize h='100%'>
			<Box py='sm' style={{ overflow: 'hidden' }}>
				{items}
			</Box>
		</ScrollArea.Autosize>
	);
}
