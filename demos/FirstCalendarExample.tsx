'use client';

import { EventsCalendar } from '~/index';

export const firstCalendarExampleCode = `
import { EventsCalendar } from 'events-calendar';

export function FirstCalendarExample() {
    return (
        <div style={{ height: '560px', border: '1px solid #ccc' }}>
            <EventsCalendar events={[{ title: 'My first event!', end: new Date() }]} />
        </div>
    );
}
`;

export function FirstCalendarExample() {
	return <EventsCalendar events={[{ title: 'My first event!', end: new Date() }]} />;
}
