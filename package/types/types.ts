import { Dayjs } from 'dayjs';
import { MouseEvent, RefObject } from 'react';

import { CALENDAR_VIEWS, MONTHS } from '~/utils';

export type Month = (typeof MONTHS)[number];
export type CalendarView = (typeof CALENDAR_VIEWS)[number];
export type CalendarGroup = { label: string; color: string };

export interface RawCalendarEventBase {
	id?: number | null;
	title?: string;
	start?: string | number | Date | Dayjs;
	end?: string | number | Date | Dayjs;
	startTime?: string | null;
	endTime?: string | null;
	isAllDay?: boolean;
	groups?: CalendarGroup[];
}

export interface CalendarEventBase {
	id: number | null;
	title: string;
	start: Dayjs;
	end: Dayjs;
	isAllDay: boolean;
	startTime?: string | null;
	endTime?: string | null;
	isActive?: boolean;
	groups?: { label: string; color: string }[];
	dragId?: number | null;
}

export interface OrderedCalendarEventBase extends CalendarEventBase {
	order: number;
	indent: number;
}

export type RawCalendarEvent<T = object> = RawCalendarEventBase & T;
export type CalendarEvent<T = object> = CalendarEventBase & T;
export type OrderedCalendarEvent<T = object> = OrderedCalendarEventBase & T;

export type SubmitType = 'create' | 'delete' | 'update';

export type MouseEventHandler = {
	(e: MouseEvent, date: Dayjs, isTimeEntry: boolean, placeholderRef: RefObject<HTMLDivElement | null>): void;
};

export type DateRecord = { date: Dayjs; isCurrentMonth?: boolean };

export interface MinMaxDatesInView {
	first: Dayjs;
	last: Dayjs;
}

export type OverflowArrowType = 'both' | 'left' | 'right' | 'none';

export interface MonthDates extends MinMaxDatesInView {
	weeks: DateRecord[][];
}

export interface EventsCalendarPopoverProps {
	clickedEvent: CalendarEvent;
	newEvent: CalendarEvent;
	onClose: () => void;
}

export interface EventsCalendarContextMenuProps {
	event: CalendarEvent;
	onClose: () => void;
	openPopover: () => void;
	closeContextMenu: () => void;
}

type CalendarActionType =
	| 'reset_calendar'
	| 'set_clicked_event'
	| 'event_create_stop'
	| 'event_create_start'
	| 'update_event'
	| 'event_create_end'
	| 'open_overflow'
	| 'event_reschedule_start'
	| 'event_reschedule_end'
	| 'open_popover'
	| 'open_context_menu';

export interface CalendarAction {
	activeFilters?: string[];
	activeGroups?: string[];
	event?: CalendarEvent | OrderedCalendarEvent;
	anchor?: HTMLDivElement | null;
	date?: Dayjs;
	newView?: CalendarView;
	type: CalendarActionType;
	dragStartOffset?: number | null;
}

export interface CalendarState {
	// Entry Popover
	clickedEvent: CalendarEvent;
	popoverIsOpen: boolean;
	eventAnchor: HTMLDivElement | null;

	// Drag creation
	dragActive: boolean;
	firstClickDate: Dayjs | null;
	placeholderEvent: OrderedCalendarEvent;

	// Event Drag & drop
	dragStartOffset: number | null;
	eventDragActive: boolean;

	// Overflow Popover
	overflowAnchor: HTMLDivElement | null;
	overflowIsOpen: boolean;
}

export type EventClickArgs<T> = {
	event: CalendarEventBase & T;
	isDoubleClick: boolean;
	eventRef: HTMLDivElement;
	openPopover: () => void;
	closePopover: () => void;
	togglePopover: () => void;
};

export type EventEditProps = {
	clickedEvent: CalendarEvent;
	newEvent: CalendarEvent;
	eventRef: HTMLDivElement;
	openPopover: () => void;
	reset: () => void;
};
