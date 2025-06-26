import { Box, TableOfContents as MantineTOC, Text } from '@mantine/core';
import classes from './TableOfContents.module.css';

export function TableOfContents() {
	return (
		<Box w='16rem' style={{ flexShrink: 0 }} pos='sticky' top='var(--app-shell-header-height)' pt='lg' visibleFrom='md'>
			<Text fw={600} size='sm' pb='xs'>
				On this page
			</Text>
			<MantineTOC
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
	);
}
