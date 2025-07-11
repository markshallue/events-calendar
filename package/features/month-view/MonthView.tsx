'use client';

import { Dayjs } from 'dayjs';
import { Dispatch, ReactNode, RefObject, useMemo } from 'react';

import './MonthView.css';

import { MonthHeader } from './components';
import { getEventsByWeekMap, getMaxEvents, getMonthDates } from './utils';
import { CellContainer } from '~/components';
import { useElementSize } from '~/hooks';
import {
  CalendarAction,
  CalendarEvent,
  CalendarState,
  EventClickArgs,
  EventEditProps,
  EventsCalendarContextMenuProps,
  MouseEventHandler,
} from '~/types';

const isTestEnv = process.env.NODE_ENV === 'test';

interface MonthViewProps<T = object> {
  enableRescheduling: boolean;
  compact: boolean;
  activeDate: Dayjs;
  dispatch: Dispatch<CalendarAction>;
  events: CalendarEvent<T>[];
  handleMouseEvent: MouseEventHandler;
  handleStopDrag: () => void;
  onEventClick?: (props: EventClickArgs<T>) => void;
  onEventReschedule?: (props: EventEditProps) => void;
  renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
  placeholderRef: RefObject<HTMLDivElement | null>;
  state: CalendarState;
}

export function MonthView<T = object>({
  enableRescheduling,
  compact,
  activeDate,
  dispatch,
  events,
  handleMouseEvent,
  handleStopDrag,
  onEventClick,
  onEventReschedule,
  placeholderRef,
  renderContextMenu,
  state,
}: MonthViewProps<T>) {
  // Calculate dates within current view
  const monthDates = useMemo(() => getMonthDates(activeDate), [activeDate]);
  const minMaxDatesInView = { first: monthDates.first, last: monthDates.last };

  // Calculate the max number of events that fit within a cell
  const { ref: gridRef, height: gridHeight } = useElementSize();
  const ROW_HEIGHT = isTestEnv ? 100 : gridHeight / monthDates.weeks.length;
  const EVENT_LIMIT = getMaxEvents(ROW_HEIGHT, compact);

  // Create a map of events by week
  const weekMap = useMemo(
    () => getEventsByWeekMap<T>(monthDates.weeks, events),
    [events, monthDates.weeks]
  );

  return (
    <div className="events-calendar-month-view">
      <MonthHeader isCompact={compact} />
      <div className="events-calendar-month-view-grid" onMouseLeave={handleStopDrag} ref={gridRef}>
        {monthDates.weeks.map((week, weekIndex) => {
          // Get this week's events (if in test environment or calendar has height)
          const orderedEvents = isTestEnv || gridHeight > 0 ? weekMap[weekIndex] : [];

          return (
            <div key={weekIndex} className="events-calendar-month-view-row">
              {week.map((dayRecord, dayIndex) => (
                <CellContainer
                  key={dayIndex}
                  EVENT_LIMIT={EVENT_LIMIT}
                  enableRescheduling={enableRescheduling}
                  compact={compact}
                  dayRecord={dayRecord}
                  dispatch={dispatch}
                  handleMouseEvent={handleMouseEvent}
                  isInWeekHeader={false}
                  minMaxDatesInView={minMaxDatesInView}
                  onEventClick={onEventClick}
                  onEventReschedule={onEventReschedule}
                  orderedEvents={orderedEvents}
                  placeholderRef={placeholderRef}
                  renderContextMenu={renderContextMenu}
                  state={state}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
