'use client';

import React from 'react';
import classes from './PageWrapper.module.css';
import { Box, Group, MantineSpacing, Stack, TableOfContents, Text } from '@mantine/core';

interface Props {
	gap?: MantineSpacing;
	withTableOfContents?: boolean;
	children: React.ReactNode;
}

export function PageWrapper({ gap, withTableOfContents, children }: Props) {
	if (!withTableOfContents)
		return (
			<div className={classes.wrapper}>
				<Stack gap={gap}>{children}</Stack>
			</div>
		);
	return (
		<div className={classes.wrapper}>
			<Group wrap='nowrap' align='start' gap='3rem' maw='100%'>
				<Stack gap={gap} style={{ flexGrow: 1 }}>
					{children}
				</Stack>
				<Box w='16rem' style={{ flexShrink: 0 }} pos='sticky' top='var(--app-shell-header-height)' pt='lg'>
					<Text fw={600} size='sm' pb='xs'>
						On this page
					</Text>
					<TableOfContents
						classNames={classes}
						variant='light'
						color='blue'
						size='sm'
						radius='sm'
						scrollSpyOptions={{
							selector: 'h2',
						}}
						getControlProps={({ data }) => ({
							onClick: () => data.getNode().scrollIntoView(),
							children: data.value,
						})}
					/>
				</Box>
			</Group>
		</div>
	);
}
