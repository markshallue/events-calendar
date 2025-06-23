import dayjs from 'dayjs';
import { MONTHS, DAYS_IN_FULL_MONTH } from '~/constants';
import { CalendarEvent, Month } from '~/types';

export type MonthDate = { date: dayjs.Dayjs; isToday: boolean; isCurrentMonth: boolean; isActive: boolean };
export type YearDateRecord = Record<Month, MonthDate[]>;

/*
    Function to create a object containing the months and dates within each month
*/
export function generateYearDates<T extends object>(activeDate: dayjs.Dayjs, events: CalendarEvent<T>[]) {
	const result = {} as YearDateRecord;

	// Create a set of all active dates from the events
	const activeDates = new Set<string>();
	events.forEach(({ start, end }) => {
		let current = start.clone().startOf('day');
		const endOfDay = end.clone().startOf('day');
		while (current.isBefore(endOfDay, 'day') || current.isSame(endOfDay, 'day')) {
			activeDates.add(current.format('YYYY-MM-DD'));
			current = current.add(1, 'day');
		}
	});

	// Build the result object
	let currentDate = activeDate.startOf('year');
	MONTHS.forEach((month, i) => {
		const startOfMonth = currentDate.clone().day(0);
		const dateArray = Array.from({ length: DAYS_IN_FULL_MONTH }, (_, i) => {
			const date = startOfMonth.clone().add(i, 'day');
			const isToday = date.isSame(dayjs(), 'day');
			const isCurrentMonth = currentDate.isSame(date, 'month');
			const isActive = isCurrentMonth && activeDates.has(date.format('YYYY-MM-DD'));
			return { date, isToday, isActive, isCurrentMonth };
		});

		result[month] = dateArray;
		currentDate = currentDate.month(i + 1);
	});

	return result;
}
