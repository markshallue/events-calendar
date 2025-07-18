'use client';

import { EventsCalendar, useEventsCalendar } from '~/index';
import events from '@/data/events.json';

import { DetailPopover } from '@/components';

export const popoverExampleCode = `
import { EventsCalendar, useEventsCalendar } from 'events-calendar';
import events from '@/data/events.json';

import { DetailPopover } from '@/components';

export function PopoverExample() {
    // Optional: set initial calendar date
    const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

    return (
        <EventsCalendar
            calendar={calendar}
            events={events}
            onEventClick={({ togglePopover }) => togglePopover()}
            renderPopover={({ clickedEvent, onClose }) => <DetailPopover event={clickedEvent} onClose={onClose} />}
        />
    );
}
`;

export function PopoverExample() {
	// Optional: set initial calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	return (
		<EventsCalendar
			calendar={calendar}
			events={events}
			onEventClick={({ togglePopover }) => togglePopover()}
			renderPopover={({ clickedEvent, onClose }) => <DetailPopover event={clickedEvent} onClose={onClose} />}
		/>
	);
}
