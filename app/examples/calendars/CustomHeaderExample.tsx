'use client';

import { useComputedColorScheme } from '@mantine/core';
import { EventsCalendar, useEventsCalendar } from '~/index';
import events from '@/data/events.json';
import classes from './CustomHeader.module.css';

import { DetailPopover } from '@/components';
import { CustomHeader } from './CustomHeader';

export function CustomHeaderExample() {
	const calendar = useEventsCalendar();
	const colorScheme = useComputedColorScheme('light');

	return (
		<div className={classes.wrapper}>
			<CustomHeader calendar={calendar} />
			<EventsCalendar
				noHeader
				calendar={calendar}
				events={events}
				colorScheme={colorScheme}
				onEventClick={({ openPopover }) => openPopover()}
				renderPopover={({ clickedEvent, onClose }) => <DetailPopover event={clickedEvent} onClose={onClose} />}
			/>
		</div>
	);
}
