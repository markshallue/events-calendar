import { CalendarEvent, DateRecord, OrderedCalendarEvent } from '~/types';
import { arrangeWeekEvents, filterByWeek } from '~/utils';

export function getEventsByWeekMap<T>(
	weeks: DateRecord[][],
	events: CalendarEvent[]
): Record<number, OrderedCalendarEvent<T>[]> {
	return weeks.reduce((a, c, i) => ({ ...a, [i]: arrangeWeekEvents(filterByWeek(events, c[0].date)) }), {});
}
