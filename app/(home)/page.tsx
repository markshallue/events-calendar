'use client';

import { Box, Button, Center, Container, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './page.module.css';

import { KitchenSinkExample } from '@/app/examples/calendars';
import {
	IconArrowDown,
	IconLayoutNavbarCollapse,
	IconBrandTypescript,
	IconCalendarPlus,
	IconLayoutDashboard,
	IconLayersSubtract,
	IconMoonStars,
	IconRocket,
} from '@tabler/icons-react';
import Link from 'next/link';

const features = [
	{
		icon: IconBrandTypescript,
		title: 'Written in TypeScript',
		description: 'Type-safe and developer-friendly with full TypeScript support.',
	},
	{
		icon: IconMoonStars,
		title: 'Dark mode ready',
		description: 'Seamlessly adapts to your theme — light or dark.',
	},
	{
		icon: IconLayoutDashboard,
		title: 'Adaptive visibility',
		description: 'Automatically shows or hides events based on available calendar space.',
	},
	{
		icon: IconCalendarPlus,
		title: 'Click & drag event creation',
		description: 'Create new events directly from the calendar interface.',
	},
	{
		icon: IconLayoutNavbarCollapse,
		title: 'Overflow handling',
		description: 'Gracefully handles days with many events using smart overflow controls.',
	},
	{
		icon: IconLayersSubtract,
		title: 'Integrated overlays',
		description: 'Context menus and popovers for intuitive event management.',
	},
];

export default function Home() {
	const scrollToDemo = () => {
		const demo = document.getElementById('demo')!;
		demo.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
	};

	return (
		<Box className={classes.wrapper}>
			<Box className={classes.heroSection}>
				<Container size='lg'>
					<Center>
						<Stack align='center' gap='md'>
							<Title className={classes.mainTitle}>
								The{' '}
								<Text span inherit variant='gradient' gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
									calendar component
								</Text>{' '}
								for your event-rich React applications
							</Title>
							<Text size='lg' c='dimmed' ta='center' maw={600}>
								A flexible, responsive, and feature-packed calendar built with Mantine.
							</Text>
							<Group mt='md'>
								<Button
									size='md'
									variant='gradient'
									radius='md'
									gradient={{ from: 'indigo', to: 'grape', deg: 135 }}
									rightSection={<IconRocket size='1.25rem' strokeWidth={1.5} />}
									component={Link}
									href='/getting-started'
								>
									Get Started
								</Button>
								<Button
									size='md'
									variant='outline'
									color='indigo'
									radius='md'
									rightSection={<IconArrowDown size='1.25rem' />}
									onClick={scrollToDemo}
								>
									Live Demo
								</Button>
							</Group>
						</Stack>
					</Center>
				</Container>
			</Box>

			<Container size='lg' py='xl'>
				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
					{features.map(feature => (
						<Stack key={feature.title} gap='xs'>
							<ThemeIcon variant='light' size='xl' radius='md'>
								<feature.icon size='1.5rem' strokeWidth={1.75} />
							</ThemeIcon>
							<Text fw={500}>{feature.title}</Text>
							<Text c='dimmed' size='sm'>
								{feature.description}
							</Text>
						</Stack>
					))}
				</SimpleGrid>
			</Container>

			<Box className={classes.demoSection} id='demo'>
				<Container size='lg'>
					<Title order={2} ta='center' mb='md'>
						Try it in action
					</Title>
					<KitchenSinkExample />
				</Container>
			</Box>
		</Box>
	);
}
