'use client';

import Link from 'next/link';
import {
	Box,
	Button,
	Container,
	Divider,
	Group,
	Paper,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import classes from './page.module.css';

import { ContextMenuExample } from '@/app/examples/calendars';
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
import { LiveDemo } from './LiveDemo';

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
		demo.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<Box className={classes.wrapper}>
			<Box className={classes.heroSection}>
				<Group className={classes.heroContent}>
					<Stack className={classes.heroText}>
						<Title className={classes.mainTitle}>
							The{' '}
							<Text span inherit variant='gradient' gradient={{ from: 'indigo.5', to: 'grape.5', deg: 135 }}>
								Calendar Component
							</Text>{' '}
							for your event-driven React applications
						</Title>
						<Text size='lg' c='dimmed'>
							A flexible, responsive, and feature-packed calendar designed for seamless event handling
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
					<Box className={classes.calendarContainer}>
						<Paper withBorder radius='md' className={classes.demoCalendarWrapper} style={{ flexGrow: 1 }}>
							<ContextMenuExample />
						</Paper>
					</Box>
				</Group>
			</Box>

			<Divider />

			<Box className={classes.featuresSection}>
				<Container size='xl'>
					<Stack gap='xs' mb='3.5rem'>
						<Title className={classes.sectionTitle}>Fully packed with features</Title>
						<Text size='lg' c='dimmed' ta='center'>
							Everything you need to build a powerful and elegant calendar experience.
						</Text>
					</Stack>
					<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
						{features.map(feature => (
							<Stack key={feature.title} gap='sm'>
								<ThemeIcon variant='light' size='3rem' radius='md'>
									<feature.icon size='1.625rem' strokeWidth={1.75} />
								</ThemeIcon>
								<Text c='lg' fw={600}>
									{feature.title}
								</Text>
								<Text c='dimmed'>{feature.description}</Text>
							</Stack>
						))}
					</SimpleGrid>
				</Container>
			</Box>

			<Box className={classes.demoSection}>
				<Container size='xl' id='demo'>
					<Title order={2} className={classes.sectionTitle} mb='xl'>
						Try it in action
					</Title>
					<LiveDemo />
				</Container>
			</Box>
		</Box>
	);
}
