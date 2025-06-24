'use client';

import React from 'react';
import { createShikiAdapter, CodeHighlightAdapterProvider } from '@mantine/code-highlight';

const shikiAdapter = createShikiAdapter(async () => {
	const { createHighlighter } = await import('shiki');
	return createHighlighter({
		langs: ['tsx', 'scss', 'html', 'bash', 'json'],
		themes: [],
	});
});

export function ShikiAdapterProvider({ children }: { children: React.ReactNode }) {
	return <CodeHighlightAdapterProvider adapter={shikiAdapter}>{children}</CodeHighlightAdapterProvider>;
}
