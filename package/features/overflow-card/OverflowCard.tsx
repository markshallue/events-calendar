'use client';

import { Dispatch, ReactNode, RefObject } from 'react';
import dayjs from 'dayjs';
import classes from './OverflowCard.module.css';

import { arrangeWeekEvents, filterByDate } from '~/utils';
import { EventsCalendarPopover, Event } from '~/components';
import {
	ColorScheme,
	CalendarEvent,
	CalendarState,
	CalendarAction,
	EventClickArgs,
	EventsCalendarContextMenuProps,
} from '~/types';

interface OverflowCardProps<T> {
	compact: boolean;
	colorScheme: ColorScheme;
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
	colorScheme,
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
		<EventsCalendarPopover
			zIndex={2}
			anchor={state.overflowAnchor}
			isOpen={state.overflowIsOpen}
			colorScheme={colorScheme}
		>
			<div className={classes.overflowCard}>
				<span className={classes.label}>{date.format('dddd, MMMM D')}</span>
				{!orderedEvents.length && <div className={classes.empty}>No events scheduled for this date</div>}
				<div className={classes.eventsWrapper}>
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
