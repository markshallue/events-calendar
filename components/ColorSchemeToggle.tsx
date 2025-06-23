import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ColorSchemeToggle() {
	const { colorScheme, setColorScheme } = useMantineColorScheme();

	// -> computedColorScheme is 'light' | 'dark', argument is the default value
	const computedColorScheme = useComputedColorScheme('light');

	const toggleColorScheme = () => {
		setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
	};

	return (
		<ActionIcon
			size='lg'
			radius='md'
			variant='default'
			onClick={toggleColorScheme}
			title='Toggle color scheme'
			aria-label='Toggle color scheme'
		>
			{colorScheme === 'dark' ? <IconSun size={20} strokeWidth={1.5} /> : <IconMoon size={20} strokeWidth={1.5} />}
		</ActionIcon>
	);
}
