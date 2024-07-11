import { Dispatch, ReactNode, RefObject } from 'react';
import { Dayjs } from 'dayjs';
import classes from './DayHeader.module.css';

import {
	MinMaxDatesInView,
	MouseEventHandler,
	OrderedCalendarEvent,
	CalendarEvent,
	EventsCalendarContextMenuProps,
	CalendarAction,
	CalendarState,
} from '~/types';

import { CellContainer } from '~/components';
import { filterByDate, arrangeWeekEvents } from '~/utils';

// Only show a max of two events in header
const EVENT_LIMIT = 2;

interface DayHeaderProps {
	enableDragNDrop: boolean;
	hasPopover: boolean;
	compact: boolean;
	allDayEvents: CalendarEvent[];
	dispatch: Dispatch<CalendarAction>;
	handleMouseEvent: MouseEventHandler;
	minMaxDatesInView: MinMaxDatesInView;
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu: ((props: EventsCalendarContextMenuProps) => ReactNode) | undefined;
	state: CalendarState;
	date: Dayjs;
}

export function DayHeader({
	enableDragNDrop,
	hasPopover,
	compact,
	allDayEvents,
	dispatch,
	handleMouseEvent,
	minMaxDatesInView,
	placeholderRef,
	renderContextMenu,
	state,
	date,
}: DayHeaderProps) {
	const orderedEvents = arrangeWeekEvents(filterByDate(allDayEvents, date));
	const totalEventsOnThisDate =
		orderedEvents.length > 0 ? Math.max(...orderedEvents.map((x: OrderedCalendarEvent) => x.order + 1)) : 0;

	// Calculate header height
	const numEventsToShow = Math.min(totalEventsOnThisDate, EVENT_LIMIT + 1); // Include space for show more text
	const heightOfEvent = compact ? 20 : 23;
	const bottomPadding = numEventsToShow > 0 ? 8 : 0;
	const headerHeight = heightOfEvent * numEventsToShow + bottomPadding;

	// Handlers
	const handleStopDrag = () => {
		if (state.dragActive || state.eventDragActive) dispatch({ type: 'stop_drag_events' });
	};

	return (
		<div className={classes.headerRow} onMouseLeave={handleStopDrag}>
			<CellContainer
				isDayHeader
				EVENT_LIMIT={EVENT_LIMIT}
				enableDragNDrop={enableDragNDrop}
				hasPopover={hasPopover}
				compact={compact}
				dayRecord={{ date }}
				dispatch={dispatch}
				handleMouseEvent={handleMouseEvent}
				headerHeight={headerHeight}
				minMaxDatesInView={minMaxDatesInView}
				orderedEvents={orderedEvents}
				placeholderRef={placeholderRef}
				renderContextMenu={renderContextMenu}
				state={state}
			/>
		</div>
	);
}
