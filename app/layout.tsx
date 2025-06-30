import '@mantine/core/styles.layer.css';
import '@mantine/carousel/styles.layer.css';
import '@mantine/code-highlight/styles.layer.css';

import React from 'react';
import { cookies } from 'next/headers';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';

import { AppWrapper, ShikiAdapterProvider } from '@/components';

import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-space-grotesk',
});

export const metadata = {
	title: 'Events Calendar',
	description: 'A fully featured react events calendar',
	icons: {
		icon: '/calendar-event-white.svg',
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const theme = cookieStore.get('mantine-color-scheme')?.value as 'light' | 'dark' | 'auto' | undefined;
	const initialColorScheme = theme ?? 'auto';

	return (
		<html
			lang='en'
			{...mantineHtmlProps}
			style={{ scrollPaddingTop: 'calc(var(--app-shell-header-height) + 1.75rem)' }}
			className={spaceGrotesk.variable}
		>
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
