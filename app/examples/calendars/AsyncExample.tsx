'use client';

import { useEffect, useState } from 'react';
import { useComputedColorScheme } from '@mantine/core';
import { EventsCalendar, RawCalendarEvent, useEventsCalendar } from '~/index';
import initialEvents from '@/data/events.json';

export function AsyncExample() {
	const [isFetching, setIsFetching] = useState(true);
	const [events, setEvents] = useState<RawCalendarEvent[] | undefined>(undefined);

	const colorScheme = useComputedColorScheme('light');

	// Optional: set inital calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	useEffect(() => {
		setTimeout(() => {
			setEvents(initialEvents);
			setIsFetching(false);
		}, 2000);
	}, []);

	return <EventsCalendar colorScheme={colorScheme} calendar={calendar} events={events} isFetching={isFetching} />;
}
