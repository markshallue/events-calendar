import dayjs from 'dayjs';
import { CalendarEvent, RawCalendarEvent } from '~/types';

const getDayjs = (rawDate: dayjs.Dayjs, timeString: string) => {
	const formatted = timeString.replace(/.{2}$/, ' $&').toUpperCase();
	return dayjs(`${rawDate.format('DD-MMM-YYYY')} ${formatted}`);
};

export function parseRawEvents<T>(events: RawCalendarEvent<T>[]): CalendarEvent<T>[] {
	return events
		.filter(event => event.start || event.end)
		.map((event, index) => {
			// Event start
			let dayjsStart = event.start ? dayjs(event.start) : dayjs(event.end);
			if (event.startTime) {
				dayjsStart = getDayjs(dayjsStart, event.startTime);
			}

			// Event end (default to event start)
			let dayjsEnd = event.end ? dayjs(event.end) : dayjsStart;

			// Add end time
			if (event.startTime || event.endTime || event.isAllDay === false) {
				if (!event.startTime && !event.endTime) {
					dayjsEnd = dayjsStart.add(1, 'hour'); // Neither start nor end time
				} else if (event.endTime) {
					dayjsEnd = getDayjs(dayjsEnd, event.endTime); // Only end Time
				} else {
					dayjsEnd = getDayjs(dayjsEnd, event.startTime!).add(1, 'hour'); // Only start time
				}
			}

			const parsedEvent = {
				...event,
				id: event.id ?? index,
				title: event.title ?? '',
				start: dayjsStart,
				end: dayjsEnd,
				isAllDay: event.isAllDay !== false,
			};

			return parsedEvent;
		});
}
