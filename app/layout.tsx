import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';

import React from 'react';
import { cookies } from 'next/headers';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';

import { AppWrapper, ShikiAdapterProvider } from '@/components';

export const metadata = {
	title: 'Mantine Next.js template',
	description: 'I am using Mantine with Next.js!',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const theme = cookieStore.get('mantine-color-scheme')?.value as 'light' | 'dark' | 'auto' | undefined;
	const initialColorScheme = theme ?? 'auto';

	return (
		<html lang='en' {...mantineHtmlProps} style={{ scrollPaddingTop: 'calc(var(--app-shell-header-height) + 1rem)' }}>
			<head>
				<ColorSchemeScript defaultColorScheme={initialColorScheme} />
				<link rel='shortcut icon' href='/favicon.svg' />
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no' />
			</head>
			<body>
				<MantineProvider defaultColorScheme={initialColorScheme}>
					<ShikiAdapterProvider>
						<AppWrapper>{children}</AppWrapper>
					</ShikiAdapterProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
