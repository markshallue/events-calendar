import { Dayjs } from 'dayjs';
import { CalendarEvent, CalendarView } from '~/types';
import { hasOverlap } from './hasOverlap';

/*
    Function that returns an array of events that overlap the current view (year or month)
*/
export function filterByView<T>(array: CalendarEvent<T>[], activeDate: Dayjs, view: CalendarView) {
	const unit = view === 'year' ? 'year' : 'month';

	const filterStart = activeDate.startOf(unit).day(0);
	const filterEnd = activeDate.endOf(unit).day(6);
	return array.filter(({ start, end }) => hasOverlap(filterStart, filterEnd, start, end));
}
