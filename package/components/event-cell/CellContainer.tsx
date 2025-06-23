import { Dispatch, ReactNode, RefObject } from 'react';
import { Dayjs } from 'dayjs';

import classes from './EventCell.module.css';

import { Event } from '~/components';
import {
	DateRecord,
	MinMaxDatesInView,
	MouseEventHandler,
	EventsCalendarContextMenuProps,
	CalendarAction,
	CalendarState,
	EventClickArgs,
	EventEditProps,
	OrderedCalendarEvent,
	CalendarEvent,
} from '~/types';

import { CellHeader } from './CellHeader';
import { ShowMoreText } from './ShowMoreText';
import { filterByDate, getVisibleEvents, isBetween, updateEvent } from '~/utils';

interface CellContainerProps<T> {
	EVENT_LIMIT: number;
	enableRescheduling: boolean;
	compact: boolean;
	dayRecord: DateRecord;
	dispatch: Dispatch<CalendarAction>;
	handleMouseEvent: MouseEventHandler;
	headerHeight?: number | string;
	isInWeekHeader?: boolean;
	isInDayHeader?: boolean;
	minMaxDatesInView: MinMaxDatesInView;
	onEventClick?: (props: EventClickArgs<T>) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	orderedEvents: OrderedCalendarEvent<T>[];
	placeholderRef: RefObject<HTMLDivElement | null>;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
}

const getPlaceholderActiveState = (placeholderEvent: CalendarEvent, date: Dayjs, isInHeader: boolean = false) => {
	const { isActive, isAllDay, start, end } = placeholderEvent;
	return (
		isActive &&
		(!isInHeader || isAllDay) &&
		isBetween(date, start, end) &&
		(date.day() === 0 || date.isSame(start, 'day'))
	);
};

export function CellContainer<T>({
	EVENT_LIMIT,
	enableRescheduling,
	compact,
	dayRecord,
	dispatch,
	handleMouseEvent,
	headerHeight = '100%', // Explicit cell height for week header
	isInWeekHeader = false,
	isInDayHeader = false,
	minMaxDatesInView,
	onEventClick,
	onEventReschedule,
	orderedEvents,
	placeholderRef,
	renderContextMenu,
	state,
}: CellContainerProps<T>) {
	const { date } = dayRecord;

	// Calculate visible events within this cell
	const eventsByDate = filterByDate(orderedEvents, date);
	const visibleEvents = getVisibleEvents(eventsByDate, date, EVENT_LIMIT, isInDayHeader);

	// Add button to show events that do not fit in cell, if required
	const numOverflowEvents = eventsByDate.reduce((a, c) => a + (c.order >= EVENT_LIMIT ? 1 : 0), 0);
	const showOverflowButton = (isInDayHeader || isInWeekHeader) && numOverflowEvents > 0;

	// Add placeholder event to events when required
	const showPlaceholder = getPlaceholderActiveState(state.placeholderEvent, date, isInWeekHeader || isInDayHeader);
	if (showPlaceholder) visibleEvents.push(state.placeholderEvent as OrderedCalendarEvent<T>);

	// Popover handler
	const openPopover = () => dispatch({ type: 'open_popover' });
	const reset = () => dispatch({ type: 'reset_calendar' });

	return (
		<>
			<div
				className={classes.cell}
				data-border={!isInDayHeader && date.day() !== 6}
				onMouseDown={e => handleMouseEvent(e, date, false, placeholderRef)}
				onMouseEnter={e => {
					if (state.eventDragActive) updateEvent({ state, dispatch, date, view: 'month' });
					handleMouseEvent(e, date, false, placeholderRef);
				}}
				onMouseUp={e => {
					if (state.eventDragActive) {
						dispatch({ type: 'event_reschedule_end', anchor: placeholderRef.current });
						onEventReschedule?.({
							clickedEvent: state.clickedEvent,
							newEvent: state.placeholderEvent,
							eventRef: placeholderRef.current!,
							openPopover,
							reset,
						});
					}
					handleMouseEvent(e, date, false, placeholderRef);
				}}
				style={{ height: headerHeight, cursor: state.eventDragActive ? 'grabbing' : 'auto' }}
			>
				{/*  If month view, list cell header and overflow text */}
				{!isInWeekHeader && !isInDayHeader && (
					<CellHeader
						dayRecord={dayRecord}
						dispatch={dispatch}
						isCompact={compact}
						numOverflowEvents={numOverflowEvents}
						state={state}
					/>
				)}
				<div className={classes.cellContent} data-week={isInWeekHeader || isInDayHeader}>
					{showOverflowButton && (
						<ShowMoreText
							date={date}
							dispatch={dispatch}
							isCompact={compact}
							numOverflowEvents={numOverflowEvents}
							state={state}
						/>
					)}
				</div>
			</div>
			{/* Render events (which may span multiple cells) */}
			{visibleEvents.map(event => (
				<Event
					compact={compact}
					date={date}
					dispatch={dispatch}
					enableRescheduling={enableRescheduling}
					event={event}
					isInDayHeader={isInDayHeader}
					isInWeekHeader={isInWeekHeader}
					key={event.id}
					minMaxDatesInView={minMaxDatesInView}
					onEventClick={onEventClick}
					placeholderRef={placeholderRef}
					renderContextMenu={renderContextMenu}
					state={state}
					view='month'
				/>
			))}
		</>
	);
}
