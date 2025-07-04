import * as react from 'react';
import react__default, { Dispatch, MouseEvent, RefObject, SetStateAction, ReactNode } from 'react';
import dayjs, { Dayjs } from 'dayjs';

declare function setTime(date: Dayjs, time: Dayjs): Dayjs;

declare const CALENDAR_VIEWS: readonly ["year", "month", "week", "day"];
declare const MONTHS: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
declare const DAY_LABELS_SHORT: readonly ["S", "M", "T", "W", "T", "F", "S"];
declare const DAYS_IN_FULL_MONTH = 42;
declare const DEFAULT_COLOR = "#0ea5e9";
declare const HOURS: readonly ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];

declare function isBetween(date: Dayjs, testStart: Dayjs, testEnd: Dayjs, startOnly?: boolean): boolean;

declare function hasOverlap(start1: Dayjs, end1: Dayjs, start2: Dayjs, end2: Dayjs): boolean;

interface updateDragNDropPlaceholderProps {
    state: CalendarState;
    dispatch: Dispatch<CalendarAction>;
    date: Dayjs;
    view: CalendarView;
}
declare function updateEvent({ state, dispatch, date, view }: updateDragNDropPlaceholderProps): void;

declare function getTimeDiff(dt1: Dayjs, dt2: Dayjs): number;

declare function getTimeLabel(event: CalendarEvent, timeDuration: number): string;

declare function filterByWeek<T extends CalendarEvent>(array: T[], weekStartDate: Dayjs): T[];

declare function filterByDate<T extends CalendarEvent>(data: T[], date: Dayjs): T[];

declare function filterByView<T>(array: CalendarEvent<T>[], activeDate: Dayjs, view: CalendarView): CalendarEvent<T>[];

declare function parseRawEvents<T>(events: RawCalendarEvent<T>[]): CalendarEvent<T>[];

declare function getVisibleEvents<T extends OrderedCalendarEvent>(data: T[], date: Dayjs, maxEvents: number, isInDayHeader: boolean): T[];

declare function arrangeWeekEvents<T extends CalendarEvent>(weekEventsArray: T[]): (OrderedCalendarEvent & T)[];

declare const getPlaceholderEvent: (start: Dayjs, end: Dayjs, isTimeEntry?: boolean, isInitialisation?: boolean) => OrderedCalendarEvent;

declare function returnValidStartEnd(start: Dayjs, end: Dayjs): Dayjs[];

declare function arrangeWeekdayEvents<T extends CalendarEvent>(dayEvents: T[], date: Dayjs): (OrderedCalendarEvent & T)[];

declare const createDayjsObjFromTime: (startTime: string | null, endTime: string | null, startString?: string, endString?: string) => {
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
};

declare function getBackgroundFromGroups(groups?: CalendarGroup[]): react__default.CSSProperties;

type Month = (typeof MONTHS)[number];
type ColorScheme = 'light' | 'dark' | 'auto';
type CalendarView = (typeof CALENDAR_VIEWS)[number];
type CalendarGroup = {
    label: string;
    color: string;
};
interface RawCalendarEventBase {
    id?: number | null;
    title?: string;
    start?: string | number | Date | Dayjs;
    end?: string | number | Date | Dayjs;
    startTime?: string | null;
    endTime?: string | null;
    isAllDay?: boolean;
    groups?: CalendarGroup[];
}
interface CalendarEventBase {
    id: number | null;
    title: string;
    start: Dayjs;
    end: Dayjs;
    isAllDay: boolean;
    startTime?: string | null;
    endTime?: string | null;
    isActive?: boolean;
    groups?: {
        label: string;
        color: string;
    }[];
    dragId?: number | null;
}
interface OrderedCalendarEventBase extends CalendarEventBase {
    order: number;
    indent: number;
}
type RawCalendarEvent<T = object> = RawCalendarEventBase & T;
type CalendarEvent<T = object> = CalendarEventBase & T;
type OrderedCalendarEvent<T = object> = OrderedCalendarEventBase & T;
type SubmitType = 'create' | 'delete' | 'update';
type MouseEventHandler = {
    (e: MouseEvent, date: Dayjs, isTimeEntry: boolean, placeholderRef: RefObject<HTMLDivElement | null>): void;
};
type DateRecord = {
    date: Dayjs;
    isCurrentMonth?: boolean;
};
interface MinMaxDatesInView {
    first: Dayjs;
    last: Dayjs;
}
type OverflowArrowType = 'both' | 'left' | 'right' | 'none';
interface MonthDates extends MinMaxDatesInView {
    weeks: DateRecord[][];
}
interface EventsCalendarPopoverProps {
    clickedEvent: CalendarEvent;
    newEvent: CalendarEvent;
    onClose: () => void;
}
interface EventsCalendarContextMenuProps {
    event: CalendarEvent;
    onClose: () => void;
    openPopover: () => void;
    closeContextMenu: () => void;
}
type CalendarActionType = 'reset_calendar' | 'set_clicked_event' | 'event_create_stop' | 'event_create_start' | 'update_event' | 'event_create_end' | 'open_overflow' | 'event_reschedule_start' | 'event_reschedule_end' | 'open_popover' | 'open_context_menu';
interface CalendarAction {
    activeFilters?: string[];
    activeGroups?: string[];
    event?: CalendarEvent | OrderedCalendarEvent;
    anchor?: HTMLDivElement | null;
    date?: Dayjs;
    newView?: CalendarView;
    type: CalendarActionType;
    dragStartOffset?: number | null;
}
interface CalendarState {
    clickedEvent: CalendarEvent;
    popoverIsOpen: boolean;
    eventAnchor: HTMLDivElement | null;
    dragActive: boolean;
    firstClickDate: Dayjs | null;
    placeholderEvent: OrderedCalendarEvent;
    dragStartOffset: number | null;
    eventDragActive: boolean;
    overflowAnchor: HTMLDivElement | null;
    overflowIsOpen: boolean;
}
type EventClickArgs<T> = {
    event: CalendarEventBase & T;
    isDoubleClick: boolean;
    eventRef: HTMLDivElement;
    openPopover: () => void;
    closePopover: () => void;
    togglePopover: () => void;
};
type EventEditProps = {
    clickedEvent: CalendarEvent;
    newEvent: CalendarEvent;
    eventRef: HTMLDivElement;
    openPopover: () => void;
    reset: () => void;
};

type EventsCalendarObject = {
    activeDate: Dayjs;
    setActiveDate: Dispatch<SetStateAction<Dayjs>>;
    view: CalendarView;
    setView: Dispatch<SetStateAction<CalendarView>>;
    state: CalendarState;
    dispatch: Dispatch<CalendarAction>;
};
type useEventsCalendarProps = {
    isInitialised?: boolean;
    initialDate?: string | number | Date | Dayjs;
    initialView?: CalendarView;
    closeOnClickOutside?: boolean;
};
declare function useEventsCalendar({ isInitialised, initialDate, initialView, closeOnClickOutside, }?: Partial<useEventsCalendarProps>): EventsCalendarObject;

interface EventsCalendarProps<T extends RawCalendarEventBase = RawCalendarEventBase> {
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
declare function EventsCalendar<T extends RawCalendarEvent = RawCalendarEventBase>({ calendar, compact, colorScheme, enableDragCreation, enableRescheduling, events, popoverZIndex, isFetching, noHeader, onEventClick, onEventCreate, onEventReschedule, renderPopover, renderContextMenu, views, }: EventsCalendarProps<T>): react.JSX.Element;

interface HeaderProps {
    activeDate: dayjs.Dayjs;
    view?: CalendarView;
    hideViewToggle?: boolean;
    maxDate?: dayjs.Dayjs | null;
    minDate?: dayjs.Dayjs | null;
    onClick?: () => void;
    setActiveDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
    setView?: Dispatch<SetStateAction<CalendarView>>;
    views?: CalendarView[];
    customControls?: ReactNode;
}
declare function Header({ activeDate, onClick, hideViewToggle, setActiveDate, setView, views, view, customControls, }: HeaderProps): react.JSX.Element;

export { CALENDAR_VIEWS, type CalendarAction, type CalendarEvent, type CalendarEventBase, type CalendarGroup, type CalendarState, type CalendarView, type ColorScheme, DAYS_IN_FULL_MONTH, DAY_LABELS_SHORT, DEFAULT_COLOR, type DateRecord, type EventClickArgs, type EventEditProps, EventsCalendar, type EventsCalendarContextMenuProps, type EventsCalendarObject, type EventsCalendarPopoverProps, type EventsCalendarProps, HOURS, Header, MONTHS, type MinMaxDatesInView, type Month, type MonthDates, type MouseEventHandler, type OrderedCalendarEvent, type OrderedCalendarEventBase, type OverflowArrowType, type RawCalendarEvent, type RawCalendarEventBase, type SubmitType, arrangeWeekEvents, arrangeWeekdayEvents, createDayjsObjFromTime, filterByDate, filterByView, filterByWeek, getBackgroundFromGroups, getPlaceholderEvent, getTimeDiff, getTimeLabel, getVisibleEvents, hasOverlap, isBetween, parseRawEvents, returnValidStartEnd, setTime, updateEvent, useEventsCalendar, type useEventsCalendarProps };
