import * as react_jsx_runtime from 'react/jsx-runtime';
import { MouseEvent, RefObject, Dispatch, SetStateAction, ReactNode } from 'react';
import dayjs, { Dayjs } from 'dayjs';

declare const CALENDAR_VIEWS: readonly ["year", "month", "week", "day"];
declare const MONTHS: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
declare function EventsCalendar<T extends RawCalendarEvent = RawCalendarEventBase>({ calendar, compact, colorScheme, enableDragCreation, enableRescheduling, events, popoverZIndex, isFetching, noHeader, onEventClick, onEventCreate, onEventReschedule, renderPopover, renderContextMenu, views, }: EventsCalendarProps<T>): react_jsx_runtime.JSX.Element;

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
declare function Header({ activeDate, onClick, hideViewToggle, setActiveDate, setView, views, view, customControls, }: HeaderProps): react_jsx_runtime.JSX.Element;

export { type CalendarAction, type CalendarEvent, type CalendarEventBase, type CalendarGroup, type CalendarState, type CalendarView, type ColorScheme, type DateRecord, type EventClickArgs, type EventEditProps, EventsCalendar, type EventsCalendarContextMenuProps, type EventsCalendarObject, type EventsCalendarPopoverProps, type EventsCalendarProps, Header, type MinMaxDatesInView, type Month, type MonthDates, type MouseEventHandler, type OrderedCalendarEvent, type OrderedCalendarEventBase, type OverflowArrowType, type RawCalendarEvent, type RawCalendarEventBase, type SubmitType, useEventsCalendar, type useEventsCalendarProps };
