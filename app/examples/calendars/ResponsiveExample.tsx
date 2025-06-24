'use client';

import { useComputedColorScheme } from '@mantine/core';
import { EventsCalendar, useEventsCalendar } from '~/index';
import events from '@/data/events.json';

export function ResponsiveExample() {
	const colorScheme = useComputedColorScheme('light');

	// Optional: set inital calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	return (
		<div style={{ height: '550px', resize: 'vertical', border: '1px solid #ccc', overflow: 'auto' }}>
			<EventsCalendar colorScheme={colorScheme} calendar={calendar} events={events} />
		</div>
	);
}
