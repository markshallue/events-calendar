import dayjs from 'dayjs';
import { CalendarEvent, RawCalendarEvent } from '~/types';

export function parseRawEvents<T>(events: RawCalendarEvent<T>[]): CalendarEvent<T>[] {
	return events
		.filter(event => event.start || event.end)
		.map((event, index) => {
			// Event start
			let dayjsStart = event.start ? dayjs(event.start) : dayjs(event.end);
			if (event.startTime) {
				const formatted = event.startTime.replace(/.{2}$/, ' $&').toUpperCase();
				dayjsStart = dayjs(`${dayjsStart.format('DD-MMM-YYYY')} ${formatted}`);
			}

			// Event end
			let dayjsEnd = event.end ? dayjs(event.end) : dayjsStart;
			if (event.startTime || event.endTime || event.isAllDay === false) {
				if (!event.startTime && !event.endTime) {
					dayjsEnd = dayjsStart.add(1, 'hour');
				}
				if (event.endTime) {
					const formatted = event.endTime.replace(/.{2}$/, ' $&').toUpperCase();
					dayjsEnd = dayjs(`${dayjsEnd.format('DD-MMM-YYYY')} ${formatted}`);
				}
				if (!event.endTime && event.startTime) {
					const formatted = event.startTime.replace(/.{2}$/, ' $&').toUpperCase();
					dayjsEnd = dayjs(`${dayjsEnd.format('DD-MMM-YYYY')} ${formatted}`).add(1, 'hour');
				}
			}

			const parsedEvent = {
				...event,
				id: event.id ?? index,
				title: event.title ?? '',
				start: dayjsStart,
				end: dayjsEnd,
				isAllDay: event.isAllDay === undefined ? true : event.isAllDay,
			};

			return parsedEvent;
		});
}
