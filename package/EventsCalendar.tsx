'use client';

import { ReactNode, useMemo, useRef } from 'react';
import classes from './EventsCalendar.module.css';

import {
	ColorScheme,
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
	calendar?: EventsCalendarObject;
	compact?: boolean;
	colorScheme?: ColorScheme;
	enableDragCreation?: boolean;
	enableRescheduling?: boolean;
	events?: RawCalendarEvent<T>[];
	isFetching?: boolean;
	noHeader?: boolean;
	popoverZIndex?: number;
	views?: CalendarView[];
	onEventClick?: (props: EventClickArgs<T>) => void;
	onEventCreate?: (props: EventEditProps) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	renderPopover?: (props: EventsCalendarPopoverProps) => ReactNode;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
}

export function EventsCalendar<T extends RawCalendarEvent = RawCalendarEventBase>({
	calendar,
	compact = false,
	colorScheme = 'light',
	enableDragCreation = false,
	enableRescheduling = false,
	events = [],
	popoverZIndex = 100,
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
		<div className={classes.root} data-ec-color-scheme={colorScheme}>
			{noHeader ? null : (
				<Header view={view} setActiveDate={setActiveDate} setView={setView} activeDate={activeDate} views={views} />
			)}
			<div className={classes.calendar} data-withheader={!noHeader} onClick={e => e.stopPropagation()}>
				<CircularLoader visible={isFetching} />
				{renderCurrentView()}

				{renderPopover && eventAnchor && (
					<EventsCalendarPopover
						isOpen={popoverIsOpen}
						anchor={eventAnchor}
						zIndex={popoverZIndex}
						colorScheme={colorScheme}
					>
						{renderPopover({ onClose, clickedEvent, newEvent: placeholderEvent })}
					</EventsCalendarPopover>
				)}

				<OverflowCard
					state={state}
					compact={compact}
					dispatch={dispatch}
					events={overflowEvents}
					colorScheme={colorScheme}
					onEventClick={onEventClick}
					placeholderRef={placeholderRef}
					renderContextMenu={renderContextMenu}
					enableRescheduling={enableRescheduling}
				/>
			</div>
		</div>
	);
}
