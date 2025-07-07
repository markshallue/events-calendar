'use client';

import { Dispatch, ReactNode, RefObject } from 'react';
import dayjs from 'dayjs';
import './OverflowCard.css';

import { arrangeWeekEvents, filterByDate } from '~/utils';
import { EventsCalendarPopover, Event } from '~/components';
import { CalendarEvent, CalendarState, CalendarAction, EventClickArgs, EventsCalendarContextMenuProps } from '~/types';

interface OverflowCardProps<T> {
	compact: boolean;
	dispatch: Dispatch<CalendarAction>;
	events: CalendarEvent<T>[];
	onEventClick?: ({ event, isDoubleClick }: EventClickArgs<T>) => void;
	placeholderRef: RefObject<HTMLDivElement | null>;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
	enableRescheduling: boolean;
}

/* 
    Create dayjs date object if string is defined
*/
const tryDate = (dateString?: string) => (dateString ? dayjs(dateString) : undefined);

export function OverflowCard<T>({
	compact,
	dispatch,
	events,
	onEventClick,
	placeholderRef,
	renderContextMenu,
	state,
	enableRescheduling,
}: OverflowCardProps<T>) {
	const date = tryDate(state.overflowAnchor?.dataset.date);

	if (!date || !state.overflowAnchor) return <></>;

	const orderedEvents = arrangeWeekEvents(filterByDate(events, date));

	return (
		<EventsCalendarPopover zIndex={2} anchor={state.overflowAnchor} isOpen={state.overflowIsOpen}>
			<div className='events-calendar-overflow-card'>
				<span className='events-calendar-overflow-card-label'>{date.format('dddd, MMMM D')}</span>
				{!orderedEvents.length && (
					<div className='events-calendar-overflow-card-text'>No events scheduled for this date</div>
				)}
				<div className='events-calendar-overflow-card-content'>
					{orderedEvents.map(event => (
						<Event
							view='month'
							isInOverflow
							key={event.id}
							enableRescheduling={enableRescheduling}
							compact={compact}
							date={date}
							dispatch={dispatch}
							event={event}
							onEventClick={onEventClick}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					))}
				</div>
			</div>
		</EventsCalendarPopover>
	);
}
