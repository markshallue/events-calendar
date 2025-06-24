import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ColorSchemeToggle() {
	const { colorScheme, setColorScheme } = useMantineColorScheme();

	const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

	const toggleColorScheme = () => {
		const nextScheme = computedColorScheme === 'dark' ? 'light' : 'dark';
		setColorScheme(nextScheme);
		document.cookie = `mantine-color-scheme=${nextScheme}; path=/; max-age=31536000`;
	};

	return (
		<Tooltip label={`${colorScheme === 'dark' ? 'Light' : 'Dark'} mode`}>
			<ActionIcon
				size='lg'
				radius='md'
				variant='default'
				onClick={toggleColorScheme}
				title='Toggle color scheme'
				aria-label='Toggle color scheme'
			>
				{colorScheme === 'dark' ? <IconSun size={22} strokeWidth={1.5} /> : <IconMoon size={22} strokeWidth={1.5} />}
			</ActionIcon>
		</Tooltip>
	);
}
