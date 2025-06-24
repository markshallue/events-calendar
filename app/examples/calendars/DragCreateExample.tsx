'use client';

import { useState } from 'react';
import { useComputedColorScheme } from '@mantine/core';
import { EventsCalendar, useEventsCalendar } from '~/index';

import groups from '@/data/groups.json';
import fields from '@/data/form-fields.json';
import initialEvents from '@/data/events.json';

import { exampleSubmitHandler } from '@/utils';
import { FormPopover, DetailPopover } from '@/components';
import { HandleSubmitArgs, PopoverType, RawDemoEvent } from '@/types';

export function DragCreateExample() {
	const colorScheme = useComputedColorScheme('light');

	const [events, setEvents] = useState<RawDemoEvent[]>(initialEvents);
	const [popoverType, setPopoverType] = useState<PopoverType>('view');

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	// Submit handler
	const handleSubmit = (args: HandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<EventsCalendar<RawDemoEvent>
			colorScheme={colorScheme}
			enableDragCreation
			calendar={calendar}
			events={events}
			onEventClick={({ togglePopover }) => {
				setPopoverType('view');
				togglePopover();
			}}
			onEventCreate={({ openPopover }) => {
				openPopover();
				setPopoverType('create');
			}}
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
		/>
	);
}
