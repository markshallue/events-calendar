'use client';

import { useState } from 'react';
import { useComputedColorScheme } from '@mantine/core';

import { EventsCalendar } from '~/index';
import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';

import groups from '@/data/groups.json';
import fields from '@/data/form-fields.json';
import initialEvents from '@/data/events.json';

import { ContextMenu, FormPopover } from '@/components';
import { ExampleHandleSubmitArgs, exampleSubmitHandler } from '@/utils';

export const editableExample = `
import { useState } from 'react';
import { EventsCalendar } from 'events-calendar';

import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';

import groups from '@/data/groups.json';
import fields from '@/data/form-fields.json';
import initialEvents from '@/data/events.json';

import { ContextMenu, FormPopover } from '@/components';
import { ExampleHandleSubmitArgs, exampleSubmitHandler } from '@/utils';

export function EditableExample() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(initialEvents);

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Jul-2024' });

	const handleSubmit = (args: ExampleHandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<EventsCalendar
			calendar={calendar}
			events={events}
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
`;

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
