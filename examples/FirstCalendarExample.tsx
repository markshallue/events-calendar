'use client';

import { EventsCalendar } from '~/index';
import { useComputedColorScheme } from '@mantine/core';

export function FirstCalendarExample() {
	const colorScheme = useComputedColorScheme('light');
	return <EventsCalendar colorScheme={colorScheme} events={[{ title: 'My first event!', end: new Date() }]} />;
}
