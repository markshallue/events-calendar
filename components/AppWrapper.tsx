'use client';

import { AppShell } from '@mantine/core';

import { Header } from './Header';

export function AppWrapper({ children }: React.PropsWithChildren) {
	return (
		<AppShell header={{ height: 60 }}>
			<AppShell.Header zIndex={102}>
				<Header />
			</AppShell.Header>
			<AppShell.Main display='flex' h='0' style={{ flexDirection: 'column' }}>
				{children}
			</AppShell.Main>
		</AppShell>
	);
}
