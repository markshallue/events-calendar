'use client';

import { EventsCalendar, useEventsCalendar } from '~/index';
import events from '@/data/events.json';
import classes from './CustomHeader.module.css';

import { DetailPopover } from '@/components';
import { CustomHeader } from './CustomHeader';

export const customHeaderExampleCode = `
import { EventsCalendar, useEventsCalendar } from 'events-calendar';
import events from '@/data/events.json';
import classes from './CustomHeader.module.css';

import { DetailPopover } from '@/components';
import { CustomHeader } from './CustomHeader';

export function CustomHeaderExample() {
    const calendar = useEventsCalendar();

    return (
        <div className={classes.wrapper}>
            <CustomHeader calendar={calendar} />
            <EventsCalendar
                noHeader
                events={events}
                calendar={calendar}
                onEventClick={({ openPopover }) => openPopover()}
                renderPopover={({ clickedEvent, onClose }) => <DetailPopover event={clickedEvent} onClose={onClose} />}
            />
        </div>
    );
}
`;

export function CustomHeaderExample() {
	const calendar = useEventsCalendar();

	return (
		<div className={classes.wrapper}>
			<CustomHeader calendar={calendar} />
			<EventsCalendar
				noHeader
				events={events}
				calendar={calendar}
				onEventClick={({ openPopover }) => openPopover()}
				renderPopover={({ clickedEvent, onClose }) => <DetailPopover event={clickedEvent} onClose={onClose} />}
			/>
		</div>
	);
}
