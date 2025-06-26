'use client';

import { useComputedColorScheme } from '@mantine/core';
import { EventsCalendar, useEventsCalendar } from '~/index';

export function ColorsExample() {
	// Optional: set initial calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });
	const colorScheme = useComputedColorScheme('light');

	return (
		<EventsCalendar
			colorScheme={colorScheme}
			calendar={calendar}
			events={[
				{
					title: 'Lime event',
					start: new Date('5-Aug-2024'),
					groups: [{ label: 'lime', color: '#82c91e' }],
				},
				{
					title: 'Semi-transparent red event',
					start: '6-Aug-2024',
					groups: [{ label: 'transparent-red', color: 'rgba(255,0,0,0.3)' }],
				},
				{
					title: 'Multi-colored multi-day event',
					start: '12-Aug-2024',
					end: '15-Aug-2024',
					groups: [
						{ label: 'indigo', color: '#4263eb' },
						{ label: 'grape', color: '#ae3ec9' },
						{ label: 'teal', color: '#0ca678' },
					],
				},
				{
					title: 'Time event',
					start: '19-Aug-2024 3:00 PM',
					end: '19-Aug-2024 5:00 PM',
					isAllDay: false,
					groups: [
						{ label: 'indigo', color: '#4263eb' },
						{ label: 'grape', color: '#ae3ec9' },
					],
				},
			]}
		/>
	);
}
