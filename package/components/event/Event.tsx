'use client';

import { Dispatch, ReactNode, RefObject, useRef } from 'react';
import { Dayjs } from 'dayjs';
import classes from './Event.module.css';

import { getTimeDiff, getTimeLabel } from '~/utils';
import { useCalendarEvent } from '~/hooks';
import {
	CalendarState,
	CalendarAction,
	MinMaxDatesInView,
	OrderedCalendarEvent,
	EventsCalendarContextMenuProps,
	CalendarView,
	EventClickArgs,
} from '~/types';

import { TimeEvent } from './TimeEvent';
import { AllDayEvent } from './AllDayEvent';
import { getEventStyles, getWeekOrDayEventStyles, isBeingDragged } from './utils';

interface EventProps<T> {
	view: CalendarView;
	enableRescheduling: boolean;
	compact?: boolean;
	date: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	event: OrderedCalendarEvent<T>;
	isInWeekHeader?: boolean;
	isInOverflow?: boolean;
	isInDayHeader?: boolean;
	minMaxDatesInView?: MinMaxDatesInView;
	placeholderRef: RefObject<HTMLDivElement | null>;
	onEventClick?: (props: EventClickArgs<T>) => void;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
}

export function Event<T>({
	view,
	enableRescheduling,
	compact = false,
	date,
	dispatch,
	event,
	isInWeekHeader = false,
	isInOverflow = false,
	isInDayHeader = false,
	minMaxDatesInView,
	onEventClick,
	placeholderRef,
	renderContextMenu,
	state,
}: EventProps<T>) {
	const ref = useRef<HTMLDivElement>(null);
	const hasContextMenu = !!renderContextMenu;
	const isInteractive = !!onEventClick || enableRescheduling;
	const isMonthView = view === 'month';
	const isDayView = view === 'day';

	// Popover handlers
	const openPopover = () => dispatch({ type: 'open_popover' });
	const closePopover = () => dispatch({ type: 'reset_calendar' });

	// Context menu onClose
	const onClose = () => dispatch({ type: 'reset_calendar' });

	// Handle event left click (view popover)
	const handleClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		isPlaceholder: boolean,
		eventRef: RefObject<HTMLDivElement | null>,
		onEventClick?: (props: EventClickArgs<T>) => void
	) => {
		e.stopPropagation();
		if (isPlaceholder) return;

		if (!eventRef.current) return;

		// Check if popover is open and anchored to the clicked event, we want to
		// move the popover if the event is clicked twice, but on different weeks)
		const isDoubleClick = isActive && state.eventAnchor?.dataset.anchorday === eventRef.current.dataset.anchorday;

		// Overflow popover should close if clicked event was not inside the overflow popover
		const overflowShouldClose = !isInOverflow && state.overflowIsOpen;

		// Close popover (this is either a double-click on an open event or an event outside the popover)
		if (overflowShouldClose) dispatch({ type: 'reset_calendar' });

		// Open popover if there is currently no anchored popover
		if (!isDoubleClick) {
			dispatch({ type: 'set_clicked_event', event: event, anchor: eventRef.current });
		}

		// Toggle popover visibility handler
		const togglePopover = () => (isDoubleClick ? closePopover() : openPopover());

		onEventClick?.({
			event,
			isDoubleClick,
			eventRef: eventRef.current,
			openPopover,
			closePopover,
			togglePopover,
		});
	};

	// Main event hook
	const { handleContextMenu, isActive, contextIsOpen, refs, floatingStyles, getFloatingProps, closeContextMenu } =
		useCalendarEvent({
			dispatch,
			event,
			state,
			hasContextMenu,
			isInOverflow,
		});

	// Current event is placeholder event
	const isPlaceholder = event.id === null;
	const eventRef = isPlaceholder && event.start.isSame(date, 'd') ? placeholderRef : ref;
	const timeDuration = Math.abs(getTimeDiff(event.start, event.end));
	const isShort = timeDuration <= 30;
	const overlapOffset = isDayView ? 120 : 20;
	const dayIndex = isDayView ? 0 : date.day();

	const onDragStart = () => {
		dispatch({ type: 'reset_calendar' });
		if (enableRescheduling && !isInOverflow) {
			dispatch({
				type: 'event_reschedule_start',
				event: { ...event, dragId: event.id, order: isMonthView ? event.order : 1000 },
			});
		}
	};

	const styles = isMonthView
		? getEventStyles(isInOverflow, event, date, compact, isInWeekHeader, isInDayHeader)
		: getWeekOrDayEventStyles(event, timeDuration, dayIndex, overlapOffset, isInteractive && isActive);

	return (
		<>
			<div
				className={isMonthView ? classes.monthItemContainer : classes.weekItemContainer}
				data-interactive={isInteractive}
				data-active={isInteractive && isActive}
				data-anchorday={date.format('DD-MMM-YYYY')}
				data-placeholder={isPlaceholder}
				data-dragactive={state.dragActive || state.eventDragActive}
				data-isdragging={isBeingDragged(state, event)}
				data-sm={compact}
				data-time={isMonthView && !event.isAllDay}
				draggable='true'
				onClick={e => handleClick(e, isPlaceholder, eventRef, onEventClick)}
				onContextMenu={e => handleContextMenu(e, eventRef)}
				onDragStart={onDragStart}
				ref={eventRef}
				style={styles}
			>
				{isMonthView ? (
					!event.isAllDay ? (
						<TimeEvent event={event} isCompact={compact} />
					) : (
						<AllDayEvent
							date={date}
							event={event}
							isCompact={compact}
							isInOverflow={isInOverflow}
							minMaxDatesInView={minMaxDatesInView}
						/>
					)
				) : (
					<div className={classes.itemLabelWrapper} data-short={isShort}>
						<span style={isShort ? undefined : { width: '100%' }}>{event.title}</span>
						<span className={classes.timeText}>{getTimeLabel(event, timeDuration)}</span>
					</div>
				)}
			</div>
			{contextIsOpen && (
				<div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 2 }} {...getFloatingProps()}>
					{renderContextMenu && renderContextMenu({ event, closeContextMenu, onClose, openPopover })}
				</div>
			)}
		</>
	);
}
