'use client';

import { useState } from 'react';
import { EventsCalendar, RawCalendarEvent, useEventsCalendar } from '~/index';

import { PopoverType } from '@/types';
import { ContextMenu, FormPopover, DetailPopover } from '@/components';
import { ExampleHandleSubmitArgs, exampleSubmitHandler } from '@/utils';

import groups from '@/data/groups.json';
import fields from '@/data/form-fields.json';
import initialEvents from '@/data/events.json';

export function ContextMenuExample() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(initialEvents);
	const [popoverType, setPopoverType] = useState<PopoverType>('view');

	// Optional: set inital calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	const handleSubmit = (args: ExampleHandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<EventsCalendar
			calendar={calendar}
			events={events}
			onEventClick={({ togglePopover }) => togglePopover()}
			renderPopover={({ clickedEvent, newEvent, onClose }) => {
				return popoverType === 'view' ? (
					<DetailPopover
						editable
						event={clickedEvent}
						onClose={onClose}
						setPopoverType={setPopoverType}
						handleSubmit={handleSubmit}
					/>
				) : (
					<FormPopover
						event={popoverType === 'edit' ? clickedEvent : newEvent}
						onClose={onClose}
						groups={groups}
						fields={fields}
						handleSubmit={handleSubmit}
						formType={popoverType === 'reschedule' ? 'edit' : popoverType}
					/>
				);
			}}
			renderContextMenu={({ event, onClose, openPopover, closeContextMenu }) => (
				<ContextMenu
					event={event}
					onClose={onClose}
					openPopover={openPopover}
					closeContextMenu={closeContextMenu}
					setPopoverType={setPopoverType}
					handleSubmit={handleSubmit}
				/>
			)}
		/>
	);
}
