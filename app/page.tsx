'use client';

import { Title, useComputedColorScheme } from '@mantine/core';
import { EventsCalendar } from '~/EventsCalendar';

import { PageWrapper, CalendarWrapper } from '@/components';

const events = [
	{ id: 1, start: '06-Jun-2025', title: 'My first event' },
	{
		id: 2,
		start: '22-Jun-2025',
		end: '26-Jun-2025',
		title: 'My event',
		groups: [
			{ label: 'blue', color: '#1c7ed6' },
			{ label: 'pink', color: '#d61c70' },
		],
	},
	{
		id: 21,
		start: '22-Jun-2025',
		end: '26-Jun-2025',
		title: 'My asfnio event',
		groups: [
			{ label: 'blue', color: '#1c7ed6' },
			{ label: 'pink', color: '#d61c70' },
		],
	},
	{
		id: 22,
		start: '22-Jun-2025',
		end: '26-Jun-2025',
		title: 'IUBFEIUN',
		groups: [
			{ label: 'blue', color: '#1c7ed6' },
			{ label: 'pink', color: '#d61c70' },
		],
	},
	{
		id: 23,
		start: '30-May-2025',
		end: '4-Jun-2025',
		title: 'My second event',
		groups: [
			{ label: 'blue', color: '#1c7ed6' },
			{ label: 'pink', color: '#d61c70' },
		],
	},
	{
		id: 3,
		start: new Date(),
		title: 'My third event',
	},
	{
		id: 4,
		title: 'Time',
		start: '10-Jun-2025 3:00 PM',
		isAllDay: false,
		groups: [
			{ label: 'blue', color: '#1c7ed6' },
			{ label: 'pink', color: '#d61c70' },
		],
	},
];

export default function Home() {
	const computedColorScheme = useComputedColorScheme('light');

	return (
		<PageWrapper>
			<Title>Fully featured React events Calendar</Title>

			<Title order={2}>Features</Title>
			<ul>
				<li>Typescript</li>
				<li>Dark mode</li>
				<li>Lightweight (?)</li>
				<li>Responsive</li>
				<li>Drag event creation</li>
				<li>Overflow handling</li>
				<li>Context menu and popover handling</li>
				<li>Importable views (import year, month, week, day or time views separately</li>
			</ul>
			<Title order={2}>Motivation</Title>
			<CalendarWrapper>
				<EventsCalendar colorScheme={computedColorScheme} events={events} />
			</CalendarWrapper>
		</PageWrapper>
	);
}
