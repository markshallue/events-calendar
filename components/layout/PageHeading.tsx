import { Text, Title } from '@mantine/core';

import { PageWrapper } from './PageWrapper';

interface PageHeadingProps {
	title: string;
	subtitle?: string;
}

export function PageHeading({ title, subtitle }: PageHeadingProps) {
	return (
		<PageWrapper pb='xs'>
			<Title order={1} fz='2.5rem'>
				{title}
			</Title>
			{subtitle && (
				<Text size='lg' c='dimmed'>
					{subtitle}
				</Text>
			)}
		</PageWrapper>
	);
}
