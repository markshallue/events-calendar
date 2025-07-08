'use client';

import { useState } from 'react';
import { Paper, Stack } from '@mantine/core';
import classes from './LiveDemo.module.css';

import { EventsCalendar, Header, useEventsCalendar } from '~/index';

import groups from '@/data/groups.json';
import fields from '@/data/form-fields.json';
import { getEvents } from '@/data/utils';

import { exampleSubmitHandler } from '@/utils';
import { useGetFilteredEvents } from '@/hooks';
import { HandleSubmitArgs, PopoverType, RawDemoEvent } from '@/types';
import { ContextMenu, FormPopover, DetailPopover, FilterControl } from '@/components';

// Generate demo events
const numOfEvents = 100;
const dayRange = 60;

export function LiveDemo() {
	const [events, setEvents] = useState<RawDemoEvent[]>(() => getEvents(numOfEvents, dayRange));
	const [inactiveGroups, setInactiveGroups] = useState<string[]>([]);
	const [popoverType, setPopoverType] = useState<PopoverType>('view');

	// Get calendar instance
	const calendar = useEventsCalendar();

	// Filter events
	const filteredEvents = useGetFilteredEvents({ data: events, inactiveGroups });

	// Submit handler
	const handleSubmit = (args: HandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<Stack>
			{/* <LiveDemoControls setEvents={setEvents} /> */}
			<Paper className={classes.wrapper} withBorder>
				<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
					<Header
						{...calendar}
						customControls={
							<FilterControl
								filterLabel={fields.group}
								items={groups}
								hiddenItems={inactiveGroups}
								setHiddenItems={setInactiveGroups}
							/>
						}
					/>
					<EventsCalendar
						enableDragCreation
						noHeader
						calendar={calendar}
						events={filteredEvents}
						onEventClick={({ togglePopover }) => {
							setPopoverType('view');
							togglePopover();
						}}
						onEventCreate={({ openPopover }) => {
							openPopover();
							setPopoverType('create');
						}}
						onEventReschedule={({ openPopover }) => {
							openPopover();
							setPopoverType('reschedule');
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
				</div>
			</Paper>
		</Stack>
	);
}
