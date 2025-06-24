'use client';

import { useComputedColorScheme } from '@mantine/core';
import { EventsCalendar, useEventsCalendar } from '~/index';
import events from '@/data/events.json';

import { DetailPopover } from '@/components';

export function PopoverExample() {
	const colorScheme = useComputedColorScheme('light');

	// Optional: set inital calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	return (
		<EventsCalendar
			colorScheme={colorScheme}
			calendar={calendar}
			events={events}
			onEventClick={({ togglePopover }) => togglePopover()}
			renderPopover={({ clickedEvent, onClose }) => <DetailPopover event={clickedEvent} onClose={onClose} />}
		/>
	);
}
