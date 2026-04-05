'use client';

import dayjs from 'dayjs';
import { Dispatch, ReactNode, RefObject } from 'react';

import './OverflowCard.css';

import { Event, EventsCalendarPopover } from '~/components';
import {
  CalendarAction,
  CalendarEvent,
  CalendarState,
  EventClickArgs,
  EventsCalendarContextMenuProps,
} from '~/types';
import { arrangeWeekEvents, filterByDate } from '~/utils';

interface OverflowCardProps<T> {
  compact: boolean;
  dispatch: Dispatch<CalendarAction>;
  events: CalendarEvent<T>[];
  onEventClick?: ({ event, isDoubleClick }: EventClickArgs<T>) => void;
  placeholderRef: RefObject<HTMLDivElement | null>;
  renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
  state: CalendarState;
  enableRescheduling: boolean;
  zIndex?: number;
}

/* 
    Create dayjs date object if string is defined
*/
const tryDate = (dateString?: string) => (dateString ? dayjs(dateString) : undefined);

export function OverflowCard<T>({
  compact,
  dispatch,
  events,
  onEventClick,
  placeholderRef,
  renderContextMenu,
  state,
  enableRescheduling,
  zIndex,
}: OverflowCardProps<T>) {
  const date = tryDate(state.overflowAnchor?.dataset.date);

  if (!date || !state.overflowAnchor) return <></>;

  const orderedEvents = arrangeWeekEvents(filterByDate(events, date));

  return (
    <EventsCalendarPopover zIndex={zIndex} anchor={state.overflowAnchor} isOpen={state.overflowIsOpen}>
      <div className="events-calendar-overflow-card">
        <span className="events-calendar-overflow-card-label">{date.format('dddd, MMMM D')}</span>
        {!orderedEvents.length && (
          <div className="events-calendar-overflow-card-text">
            No events scheduled for this date
          </div>
        )}
        <div className="events-calendar-overflow-card-content">
          {orderedEvents.map((event) => (
            <Event
              view="month"
              isInOverflow
              key={event.id}
              enableRescheduling={enableRescheduling}
              compact={compact}
              date={date}
              dispatch={dispatch}
              event={event}
              onEventClick={onEventClick}
              placeholderRef={placeholderRef}
              renderContextMenu={renderContextMenu}
              state={state}
            />
          ))}
        </div>
      </div>
    </EventsCalendarPopover>
  );
}
