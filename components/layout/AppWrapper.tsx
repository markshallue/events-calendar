'use client';

import { useDisclosure } from '@mantine/hooks';
import { AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import classes from './AppWrapper.module.css';

import { Header } from './Header';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

const HEADER_HEIGHT = 56;
const FOOTER_HEIGHT = '8rem';

export function AppWrapper({ children }: React.PropsWithChildren) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: HEADER_HEIGHT }}
			navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: true } }}
			style={{ '--footer-height': FOOTER_HEIGHT }}
		>
			<AppShellHeader zIndex={102}>
				<Header opened={opened} toggle={toggle} />
			</AppShellHeader>
			<AppShell.Navbar zIndex={102}>
				<Navbar toggle={toggle} />
			</AppShell.Navbar>
			<AppShellMain className={classes.main}>{children}</AppShellMain>
			<Footer />
		</AppShell>
	);
}
