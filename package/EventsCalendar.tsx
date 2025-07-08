'use client';

import { ReactNode, useMemo, useRef } from 'react';
import './EventsCalendar.css';

import {
	CalendarView,
	EventEditProps,
	EventClickArgs,
	RawCalendarEvent,
	RawCalendarEventBase,
	EventsCalendarPopoverProps,
	EventsCalendarContextMenuProps,
} from './types';

import { EventsCalendarPopover, CircularLoader } from './components';
import { CALENDAR_VIEWS, filterByView, parseRawEvents } from './utils';
import { MonthView, Header, TimeView, OverflowCard, YearView } from './features';
import { useMouseEvent, useInitEventsCalendar, EventsCalendarObject } from './hooks';

export interface EventsCalendarProps<T extends RawCalendarEventBase = RawCalendarEventBase> {
	/**
	 * Shared calendar state and methods, returned by `useEventsCalendar`.
	 */
	calendar?: EventsCalendarObject;

	/**
	 * Renders a more compact layout, useful in constrained spaces.
	 * Affects padding, font size, and layout density.
	 */
	compact?: boolean;

	/**
	 * Enables drag-to-create behavior for new events.
	 */
	enableDragCreation?: boolean;

	/**
	 * Allows users to reschedule events by dragging.
	 */
	enableRescheduling?: boolean;

	/**
	 * Array of event objects to be rendered in the calendar.
	 */
	events?: RawCalendarEvent<T>[];

	/**
	 * Whether to show a loading spinner overlay on the calendar.
	 */
	isFetching?: boolean;

	/**
	 * If true, hides the built-in calendar header (navigation + view toggle).
	 */
	noHeader?: boolean;

	/**
	 * z-index used for the event popover component.
	 */
	popoverZIndex?: number;

	/**
	 * Calendar views available to the user (e.g. 'month', 'week', 'day', 'year').
	 * Defaults to all supported views.
	 */
	views?: CalendarView[];

	/**
	 * Fired when an existing event is clicked.
	 */
	onEventClick?: (props: EventClickArgs<T>) => void;

	/**
	 * Fired when a new event is created (e.g. via drag or click).
	 */
	onEventCreate?: (props: EventEditProps) => void;

	/**
	 * Fired when an event is rescheduled (e.g. via drag).
	 */
	onEventReschedule?: (props: EventEditProps) => void;

	/**
	 * Custom render function for the event popover.
	 */
	renderPopover?: (props: EventsCalendarPopoverProps) => ReactNode;

	/**
	 * Custom render function for a context menu (e.g. right-click on event).
	 */
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
}

export function EventsCalendar<T extends RawCalendarEvent = RawCalendarEventBase>({
	calendar,
	compact = false,
	enableDragCreation = false,
	enableRescheduling = false,
	events = [],
	popoverZIndex = 101,
	isFetching = false,
	noHeader = false,
	onEventClick,
	onEventCreate,
	onEventReschedule,
	renderPopover,
	renderContextMenu,
	views = [...CALENDAR_VIEWS],
}: EventsCalendarProps<T>) {
	// Initialise data calendar
	const { activeDate, setActiveDate, view, setView, state, dispatch } = useInitEventsCalendar(calendar);

	// Parse raw events
	const parsed = useMemo(() => parseRawEvents<T>(events), [events]);

	// Events in current view
	const calendarEvents = useMemo(() => filterByView<T>(parsed, activeDate, view), [parsed, activeDate, view]);

	// Overflow events (only all day events are needed in time views)
	const isTimeView = view === 'week' || view === 'day';
	const overflowEvents = isTimeView ? calendarEvents.filter(event => event.isAllDay) : calendarEvents;

	// Calendar state
	const { eventAnchor, dragActive, eventDragActive, popoverIsOpen, clickedEvent, placeholderEvent } = state;

	// Popover handlers
	const onClose = () => dispatch({ type: 'reset_calendar' });
	const handleStopDrag = () => {
		if (dragActive || eventDragActive) dispatch({ type: 'event_create_stop' });
	};

	// Placeholder ref
	const placeholderRef = useRef<HTMLDivElement>(null);

	// Mouse event handler
	const handleMouseEvent = useMouseEvent({ enableDragCreation, dispatch, state, onEventCreate });

	// Shared props
	const basicProps = {
		activeDate,
		dispatch,
		state,
		events: calendarEvents,
	};
	const sharedViewProps = {
		...basicProps,
		compact,
		onEventClick,
		handleStopDrag,
		placeholderRef,
		handleMouseEvent,
		onEventReschedule,
		renderContextMenu,
		enableRescheduling,
	};

	// Render function
	const renderCurrentView = () => {
		switch (view) {
			case 'year':
				return <YearView {...basicProps} />;
			case 'month':
				return <MonthView {...sharedViewProps} />;
			case 'week':
			case 'day':
				return <TimeView {...sharedViewProps} view={view} />;
			default:
				return null;
		}
	};

	return (
		<div className='events-calendar-wrapper'>
			{noHeader ? null : (
				<Header view={view} setActiveDate={setActiveDate} setView={setView} activeDate={activeDate} views={views} />
			)}
			<div className='events-calendar' data-withheader={!noHeader} onClick={e => e.stopPropagation()}>
				<CircularLoader visible={isFetching} />
				{renderCurrentView()}

				{renderPopover && eventAnchor && (
					<EventsCalendarPopover isOpen={popoverIsOpen} anchor={eventAnchor} zIndex={popoverZIndex}>
						{renderPopover({ onClose, clickedEvent, newEvent: placeholderEvent })}
					</EventsCalendarPopover>
				)}

				<OverflowCard
					state={state}
					compact={compact}
					dispatch={dispatch}
					events={overflowEvents}
					onEventClick={onEventClick}
					placeholderRef={placeholderRef}
					renderContextMenu={renderContextMenu}
					enableRescheduling={enableRescheduling}
				/>
			</div>
		</div>
	);
}
