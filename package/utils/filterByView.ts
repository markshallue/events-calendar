import { Dayjs } from 'dayjs';
import { CalendarEvent, CalendarView } from '~/types';
import { hasOverlap } from './hasOverlap';

/**
 * Filters events that overlap with the visible range of a calendar view (month or year).
 *
 * @template T - Optional custom data attached to the calendar event.
 * @param {CalendarEvent<T>[]} events - List of calendar events.
 * @param {Dayjs} activeDate - The current date used to determine the visible time range.
 * @param {CalendarView} view - The current calendar view ('month' or 'year').
 * @returns {CalendarEvent<T>[]} An array of events that overlap the given view range.
 */
export function filterByView<T>(events: CalendarEvent<T>[], activeDate: Dayjs, view: CalendarView): CalendarEvent<T>[] {
	const unit = view === 'year' ? 'year' : 'month';

	const filterStart = activeDate.startOf(unit).day(0); // Align to Sunday
	const filterEnd = activeDate.endOf(unit).day(6); // Align to Saturday

	return events.filter(({ start, end }) => hasOverlap(filterStart, filterEnd, start, end));
}
