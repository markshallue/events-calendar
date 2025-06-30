'use client';

import { EventsCalendar } from '~/index';
import { useComputedColorScheme } from '@mantine/core';

export const firstCalendarExampleCode = `
import { EventsCalendar } from 'events-calendar';

export function FirstCalendarExample() {
    return <EventsCalendar events={[{ title: 'My first event!', end: new Date() }]} />;
}
`;

export function FirstCalendarExample() {
	const colorScheme = useComputedColorScheme('light');
	return <EventsCalendar colorScheme={colorScheme} events={[{ title: 'My first event!', end: new Date() }]} />;
}
