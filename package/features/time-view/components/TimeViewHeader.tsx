'use client';

import { Dispatch, ReactNode, RefObject } from 'react';
import './TimeViewHeader.css';

import {
	DateRecord,
	MinMaxDatesInView,
	MouseEventHandler,
	OrderedCalendarEvent,
	CalendarEvent,
	EventsCalendarContextMenuProps,
	CalendarAction,
	CalendarState,
	EventClickArgs,
	EventEditProps,
} from '~/types';
import { CellContainer } from '~/components';
import { filterByDate, filterByWeek, arrangeWeekEvents } from '~/utils';
import dayjs from 'dayjs';

// Only show a max of two events in header
const EVENT_LIMIT = 2;

interface TimeViewHeaderProps<T> {
	view: 'day' | 'week';
	enableRescheduling: boolean;
	compact: boolean;
	allDayEvents: CalendarEvent<T>[];
	dispatch: Dispatch<CalendarAction>;
	handleMouseEvent: MouseEventHandler;
	handleStopDrag: () => void;
	minMaxDatesInView: MinMaxDatesInView;
	placeholderRef: RefObject<HTMLDivElement | null>;
	onEventClick?: (props: EventClickArgs<T>) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
	weekDatesArray: DateRecord[];
}

export function TimeViewHeader<T>({
	view,
	enableRescheduling,
	compact,
	allDayEvents,
	dispatch,
	handleMouseEvent,
	handleStopDrag,
	minMaxDatesInView,
	onEventClick,
	onEventReschedule,
	placeholderRef,
	renderContextMenu,
	state,
	weekDatesArray,
}: TimeViewHeaderProps<T>) {
	const filteredEvents =
		view === 'day'
			? filterByDate(allDayEvents, weekDatesArray[0].date)
			: filterByWeek(allDayEvents, weekDatesArray[0].date);
	const orderedEvents = arrangeWeekEvents(filteredEvents);
	const totalEventsOnThisDate =
		orderedEvents.length > 0 ? Math.max(...orderedEvents.map((x: OrderedCalendarEvent) => x.order + 1)) : 0;

	// Calculate header height
	const numEventsToShow = Math.min(totalEventsOnThisDate, EVENT_LIMIT + 1); // Include space for show more text
	const heightOfEvent = compact ? 20 : 23;
	const bottomPadding = numEventsToShow > 0 ? 8 : 0;
	const headerHeight = heightOfEvent * numEventsToShow + bottomPadding;

	return (
		<div className='events-calendar-time-view-header' data-isweekview={view === 'week'} onMouseLeave={handleStopDrag}>
			{weekDatesArray.map((dayRecord, dayIndex) => {
				const { date } = dayRecord;
				const withHeaderBorder = view === 'week' || filteredEvents.length > 0;
				return (
					<div className='events-calendar-time-view-header-cell' data-border={withHeaderBorder} key={dayIndex}>
						{view === 'week' && (
							<div
								className='events-calendar-time-view-header-label'
								data-today={date.isSame(dayjs(), 'day')}
								onMouseEnter={handleStopDrag}
							>
								{`${date.format('ddd')} ${date.format('DD')}`}
							</div>
						)}
						<CellContainer
							isInDayHeader={view === 'day'}
							isInWeekHeader={view === 'week'}
							EVENT_LIMIT={EVENT_LIMIT}
							enableRescheduling={enableRescheduling}
							compact={compact}
							dayRecord={dayRecord}
							dispatch={dispatch}
							handleMouseEvent={handleMouseEvent}
							headerHeight={headerHeight}
							minMaxDatesInView={minMaxDatesInView}
							onEventClick={onEventClick}
							onEventReschedule={onEventReschedule}
							orderedEvents={orderedEvents}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					</div>
				);
			})}
		</div>
	);
}
