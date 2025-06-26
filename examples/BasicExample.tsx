'use client';

import { useComputedColorScheme } from '@mantine/core';
import { EventsCalendar, useEventsCalendar } from '~/index';
import events from '@/data/events.json';

export function BasicExample() {
	// Optional: set initial calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });
	const colorScheme = useComputedColorScheme('light');

	return <EventsCalendar colorScheme={colorScheme} calendar={calendar} events={events} />;
}
