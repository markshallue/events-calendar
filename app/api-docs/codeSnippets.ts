export const calendarPropTypesCode = `
export interface EventsCalendarProps<T extends RawCalendarEventBase = RawCalendarEventBase> {
    calendar?: EventsCalendarObject;
    compact?: boolean;
    enableDragCreation?: boolean;
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
    
`;

export const eventsObjectCode = `
export type RawCalendarEvent = {
  id?: number | null;
  title?: string;
  start?: string | number | Date | Dayjs;
  end?: string | number | Date | Dayjs;
  startTime?: string | null;
  endTime?: string | null;
  isAllDay?: boolean;
  groups?: { label: string; color: string }[];
}
`;

export const useEventsCalendarCode = `
export type useEventsCalendarProps {
    initialDate?: string | number | Date | Dayjs;
    initialView?: CalendarView;
}
`;

export const EventsCalendarObject = `
export type EventsCalendarObject = {
    activeDate: dayjs.Dayjs;
    setActiveDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
    view: CalendarView;
    setView: Dispatch<SetStateAction<CalendarView>>;
};
`;
