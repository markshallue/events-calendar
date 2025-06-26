import { Stack, Title, Text } from '@mantine/core';
import React from 'react';

interface Props {
	title: string;
	subtitle?: string | React.ReactNode;
}

export function ContentHeading({ title, subtitle }: Props) {
	return (
		<Stack gap='xs'>
			<Title order={2}>{title}</Title>
			{subtitle && typeof subtitle === 'string' ? <Text>{subtitle}</Text> : subtitle}
		</Stack>
	);
}
