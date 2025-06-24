'use client';

import { EventsCalendar, useEventsCalendar } from '~/index';
import events from '@/data/events.json';

export function BasicExample() {
	// Optional: set inital calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	return <EventsCalendar calendar={calendar} events={events} />;
}
