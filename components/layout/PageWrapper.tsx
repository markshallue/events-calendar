'use client';

import React from 'react';
import classes from './PageWrapper.module.css';
import { Box, BoxProps, Group, MantineSpacing, Stack } from '@mantine/core';

import { TableOfContents } from '../TableOfContents';

interface Props extends BoxProps {
	gap?: MantineSpacing;
	withTableOfContents?: boolean;
	children: React.ReactNode;
}

export function PageWrapper({ gap, withTableOfContents, children, ...props }: Props) {
	if (!withTableOfContents)
		return (
			<Box className={classes.wrapper} {...props}>
				<Stack gap={gap} flex='1'>
					{children}
				</Stack>
			</Box>
		);

	return (
		<Box className={classes.wrapper} {...props}>
			<Group wrap='nowrap' align='start' gap='3rem' w='100%'>
				<Stack gap={gap} flex='1' style={{ minWidth: 0 }}>
					{children}
				</Stack>
				<TableOfContents />
			</Group>
		</Box>
	);
}
