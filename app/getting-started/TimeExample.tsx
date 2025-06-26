'use client';

import { useComputedColorScheme } from '@mantine/core';
import { EventsCalendar, useEventsCalendar } from '~/index';

export function TimeExample() {
	const colorScheme = useComputedColorScheme('light');

	// Optional: set initial calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	return (
		<EventsCalendar
			colorScheme={colorScheme}
			calendar={calendar}
			events={[
				{
					title: 'Only isAllDay = false',
					start: '4-Aug-2024',
					isAllDay: false,
					groups: [{ label: 'red', color: '#f03e3e' }],
				},
				{
					title: 'Only start with time',
					start: '5-Aug-2024 3:00 PM',
					isAllDay: false,
					groups: [{ label: 'red', color: '#1c7ed6' }],
				},
				{
					title: 'Start and end with time',
					start: '6-Aug-2024 3:00 PM',
					end: '6-Aug-2024 5:00 PM',
					isAllDay: false,
					groups: [{ label: 'red', color: '#40c057' }],
				},
				{
					title: 'Impossible start and end',
					start: '6-Aug-2024 1:00 PM',
					end: '6-Aug-2024 10:00 PM',
					isAllDay: false,
					groups: [{ label: 'red', color: '#f03e3e' }],
				},
				{
					title: 'startTime override',
					start: '7-Aug-2024 3:00 PM',
					startTime: '5:01pm',
					isAllDay: false,
					groups: [{ label: 'red', color: '#ae3ec9' }],
				},
				{
					title: 'start and endTime',
					start: '8-Aug-2024',
					endTime: '5:00pm',
					isAllDay: false,
					groups: [{ label: 'red', color: '#f76707' }],
				},
				{
					title: 'Impossible end and startTime',
					end: '9-Aug-2024 2:00 PM',
					startTime: '3:00pm',
					isAllDay: false,
					groups: [{ label: 'red', color: '#7048e8' }],
				},
				{
					title: 'isAllDay = true',
					start: '10-Aug-2024 2:00 PM',
					end: '10-Aug-2024 3:00 PM',
					startTime: '2:00pm',
					endTime: '3:00pm',
					isAllDay: true,
					groups: [{ label: 'red', color: '#1c7ed6' }],
				},
			]}
		/>
	);
}
