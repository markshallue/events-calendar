'use client';

import { Dayjs } from 'dayjs';
import { Dispatch, ReactNode, RefObject, useMemo } from 'react';

import './TimeView.css';

import {
	CalendarAction,
	CalendarState,
	EventClickArgs,
	EventEditProps,
	CalendarEvent,
	MouseEventHandler,
	EventsCalendarContextMenuProps,
	OrderedCalendarEvent,
} from '~/types';
import { Event } from '~/components';
import { isBetween } from '~/utils';

import { useSetInitialScroll } from './hooks';
import { getWeekDates, getEventsByDayMap } from './utils';
import { TimeViewHeader, HoursColumn, TimeBackground, TimeIndicator } from './components';

interface TimeViewProps<T> {
	view: 'day' | 'week';
	enableRescheduling: boolean;
	compact: boolean;
	activeDate: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	events: CalendarEvent<T>[];
	handleMouseEvent: MouseEventHandler;
	handleStopDrag: () => void;
	placeholderRef: RefObject<HTMLDivElement | null>;
	onEventClick?: (props: EventClickArgs<T>) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
}

export function TimeView<T>({
	view,
	activeDate,
	compact,
	dispatch,
	enableRescheduling,
	events,
	handleMouseEvent,
	handleStopDrag,
	onEventClick,
	onEventReschedule,
	placeholderRef,
	renderContextMenu,
	state,
}: TimeViewProps<T>) {
	// Constants
	const isDayView = view === 'day';
	const isWeekView = view === 'week';

	// Split events into all day / timed
	const allDayEvents = events.filter(event => event.isAllDay);
	const timeEvents = events.filter(event => !event.isAllDay);

	// Scroll viewport to current time
	const viewportRef = useSetInitialScroll();

	// Get week days
	const weekDatesArray = useMemo(() => getWeekDates(activeDate, view), [activeDate, view]);
	const minMaxDatesInView = {
		first: isDayView ? activeDate : weekDatesArray[0].date,
		last: isDayView ? activeDate : weekDatesArray[6].date,
	};

	// Create a map of events by day
	const dayMap = useMemo(() => getEventsByDayMap<T>(weekDatesArray, timeEvents), [timeEvents, weekDatesArray]);

	return (
		<div className='events-calendar-time-view'>
			<TimeViewHeader
				allDayEvents={allDayEvents}
				compact={compact}
				dispatch={dispatch}
				enableRescheduling={enableRescheduling}
				handleMouseEvent={handleMouseEvent}
				handleStopDrag={handleStopDrag}
				minMaxDatesInView={minMaxDatesInView}
				onEventClick={onEventClick}
				onEventReschedule={onEventReschedule}
				placeholderRef={placeholderRef}
				renderContextMenu={renderContextMenu}
				state={state}
				view={view}
				weekDatesArray={weekDatesArray}
			/>
			<div ref={viewportRef} className='events-calendar-time-view-scroll-wrapper'>
				<div className='events-calendar-time-view-grid-wrapper'>
					<HoursColumn />

					<div
						className='events-calendar-time-view-grid'
						data-isweekview={isWeekView}
						onMouseEnter={handleStopDrag}
						onMouseLeave={handleStopDrag}
					>
						<TimeBackground
							activeDate={activeDate}
							dispatch={dispatch}
							handleMouseEvent={handleMouseEvent}
							onEventReschedule={onEventReschedule}
							placeholderRef={placeholderRef}
							state={state}
							view={view}
						/>

						<TimeIndicator activeDate={activeDate} isDayView={isDayView} />

						{/* Render events */}
						{weekDatesArray.map(({ date }, dayIndex) => {
							const orderedEvents = dayMap[dayIndex];

							// Add placeholder event to events when required
							const { isActive, isAllDay, start, end } = state.placeholderEvent;
							const showPlaceholder = isActive && !isAllDay && isBetween(date, start, end);
							if (showPlaceholder) orderedEvents.push(state.placeholderEvent as OrderedCalendarEvent<T>);

							return orderedEvents.map(event => (
								<Event
									date={date}
									dispatch={dispatch}
									enableRescheduling={enableRescheduling}
									event={event}
									key={event.id}
									onEventClick={onEventClick}
									placeholderRef={placeholderRef}
									renderContextMenu={renderContextMenu}
									state={state}
									view={view}
								/>
							));
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
