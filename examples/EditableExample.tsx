'use client';

import { useState } from 'react';

import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import groups from '@/data/groups.json';
import fields from '@/data/form-fields.json';
import initialEvents from '@/data/events.json';

import { ExampleHandleSubmitArgs, exampleSubmitHandler } from '@/utils';
import { ContextMenu, FormPopover } from '@/components';
import { useComputedColorScheme } from '@mantine/core';

export function EditableExample() {
	const colorScheme = useComputedColorScheme('light');

	const [events, setEvents] = useState<RawCalendarEvent[]>(initialEvents);

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Jul-2024' });

	const handleSubmit = (args: ExampleHandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<EventsCalendar
			calendar={calendar}
			events={events}
			colorScheme={colorScheme}
			onEventClick={({ openPopover, isDoubleClick, closePopover }) => {
				if (isDoubleClick) {
					closePopover();
				} else {
					openPopover();
				}
			}}
			renderPopover={({ clickedEvent, onClose }) => (
				<FormPopover
					event={clickedEvent}
					onClose={onClose}
					groups={groups}
					fields={fields}
					handleSubmit={handleSubmit}
					formType={'edit'}
				/>
			)}
			renderContextMenu={({ event, onClose, openPopover, closeContextMenu }) => (
				<ContextMenu
					event={event}
					onClose={onClose}
					openPopover={openPopover}
					closeContextMenu={closeContextMenu}
					setPopoverType={() => null}
					handleSubmit={handleSubmit}
				/>
			)}
		/>
	);
}
