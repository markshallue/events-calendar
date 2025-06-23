import { CalendarEvent, DateRecord, OrderedCalendarEvent } from '~/types';
import { arrangeWeekdayEvents, filterByDate } from '~/utils';

export function getEventsByDayMap<T>(
	weekDays: DateRecord[],
	events: CalendarEvent[]
): Record<number, OrderedCalendarEvent<T>[]> {
	return weekDays.reduce((a, c, i) => ({ ...a, [i]: arrangeWeekdayEvents(filterByDate(events, c.date), c.date) }), {});
}
