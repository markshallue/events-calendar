'use client';

import { EventsCalendar, useEventsCalendar } from '~/index';
import events from '@/data/events.json';

export const responsiveExampleCode = `
import { EventsCalendar, useEventsCalendar } from 'events-calendar';
import events from '@/data/events.json';

export function ResponsiveExample() {
    // Optional: set initial calendar date
    const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

    return (
        <div style={{ height: '550px', resize: 'vertical', border: '1px solid #f00', overflow: 'auto' }}>
            <EventsCalendar calendar={calendar} events={events} />
        </div>
    );
}
`;

export function ResponsiveExample() {
	// Optional: set initial calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	return (
		<div style={{ height: '550px', resize: 'vertical', border: '1px solid #f00', overflow: 'auto' }}>
			<EventsCalendar calendar={calendar} events={events} />
		</div>
	);
}
