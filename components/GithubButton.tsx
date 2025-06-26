import { ActionIcon, Tooltip } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

interface Props {
	hidden: boolean;
}

export function GithubButton({ hidden }: Props) {
	if (hidden) return null;

	return (
		<Tooltip label='Source code'>
			<ActionIcon
				size='lg'
				radius='md'
				component='a'
				variant='default'
				title='View on GitHub'
				aria-label='View on GitHub'
				href='https://github.com/markshallue/events-calendar'
			>
				<IconBrandGithub size={22} strokeWidth={1.5} />
			</ActionIcon>
		</Tooltip>
	);
}
