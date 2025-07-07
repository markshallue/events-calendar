'use client';

import { useState } from 'react';
import { EventsCalendar, Header, useEventsCalendar } from '~/index';

import groups from '@/data/groups.json';
import fields from '@/data/form-fields.json';
import { getEvents } from '@/data/utils';

import { exampleSubmitHandler } from '@/utils';
import { useGetFilteredEvents } from '@/hooks';
import { HandleSubmitArgs, PopoverType, RawDemoEvent } from '@/types';
import { ContextMenu, FormPopover, DetailPopover, FilterControl, CalendarWrapper } from '@/components';

import { CustomControls } from './CustomControls';

const numOfEvents = 1000;
const initialEvents = getEvents(numOfEvents, 365);

export const kitchenSinkExampleCode = `
import { useState } from 'react';
import { EventsCalendar, Header, useEventsCalendar } from 'events-calendar';

import groups from '@/data/groups.json';
import fields from '@/data/form-fields.json';
import { getEvents } from '@/data/utils';

import { exampleSubmitHandler } from '@/utils';
import { useGetFilteredEvents } from '@/hooks';
import { HandleSubmitArgs, PopoverType, RawDemoEvent } from '@/types';
import { ContextMenu, FormPopover, DetailPopover, FilterControl, CalendarWrapper } from '@/components';

import { CustomControls } from './CustomControls';

const numOfEvents = 1000;
const initialEvents = getEvents(numOfEvents, 365);

export function KitchenSinkExample() {
    const [events, setEvents] = useState<RawDemoEvent[]>(initialEvents);
    const [inactiveGroups, setInactiveGroups] = useState<string[]>([]);
    const [popoverType, setPopoverType] = useState<PopoverType>('view');

    // Get calendar instance
    const calendar = useEventsCalendar();

    // Filter events
    const filteredEvents = useGetFilteredEvents({ data: events, inactiveGroups });

    // Submit handler
    const handleSubmit = (args: HandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <CustomControls calendar={calendar} setEvents={setEvents} numOfEvents={numOfEvents} />
            <CalendarWrapper>
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
            </CalendarWrapper>
        </div>
    );
}
`;

export function KitchenSinkExample() {
	const [events, setEvents] = useState<RawDemoEvent[]>(initialEvents);
	const [inactiveGroups, setInactiveGroups] = useState<string[]>([]);
	const [popoverType, setPopoverType] = useState<PopoverType>('view');

	// Get calendar instance
	const calendar = useEventsCalendar();

	// Filter events
	const filteredEvents = useGetFilteredEvents({ data: events, inactiveGroups });

	// Submit handler
	const handleSubmit = (args: HandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexWrap: 'wrap', width: '100%' }}>
			<CustomControls calendar={calendar} setEvents={setEvents} numOfEvents={numOfEvents} />
			<CalendarWrapper>
				<div style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
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
			</CalendarWrapper>
		</div>
	);
}
