import { Dayjs } from 'dayjs';

import { CalendarEvent, OrderedCalendarEvent } from '~/types';

import { setTime } from './setTime';
import { getTimeDiff } from './getTimeDiff';

/*
    Function that sorts events by start time, from earliest to latest.
    Only sort arrays with at least 2 events.
*/
function sortByStart<T extends CalendarEvent>(array: T[]) {
	if (array.length < 2) return array;

	return array.sort((a, b) => {
		const timeDiff = getTimeDiff(a.start, b.start);
		return timeDiff > 0 ? -1 : timeDiff < 0 ? 1 : 0;
	});
}

/*
    Function that checks if the start of a test event overlaps with another event
*/
function overlapsStart(test_start: Dayjs, main_start: Dayjs, main_end: Dayjs) {
	return test_start.isSame(main_start) || (test_start.isAfter(main_start) && test_start.isBefore(main_end));
}

/*
    Function that takes an array of events for a single day and orders & indents them based on overlaps
*/
export function arrangeWeekdayEvents<T extends CalendarEvent>(
	dayEvents: T[],
	date: Dayjs
): (OrderedCalendarEvent & T)[] {
	if (dayEvents.length < 2) return dayEvents.map(event => ({ ...event, order: 0, indent: 0 }));

	// Sort events by start time
	const sortedEvents = sortByStart(dayEvents);

	// if (date.day() === 4) {
	// 	console.log(dayEvents);
	// }

	// Extract first event from array and place it first with no indent
	const [firstEvent, ...followingEvents] = sortedEvents;
	const orderedArray: OrderedCalendarEvent<T>[] = [{ ...firstEvent, order: 0, indent: 0 }];

	// Now loop through all other events and add them to the ordered array
	followingEvents.forEach((testEvent, index) => {
		// Set the time for the next event to the correct day
		const tempStart_test_event = setTime(date, testEvent.start);

		// We loop through the current events already added to the ordered array and compare with the test event
		// If the start of the test event overlaps with another event, we increment the indent by 1
		let eventIndent = 0;
		orderedArray.forEach(currEvent => {
			// Set the time for the comparison event to the correct day
			const tempStart_curr_event = setTime(date, currEvent.start);
			const tempEnd_curr_event = setTime(date, currEvent.end);

			if (overlapsStart(tempStart_test_event, tempStart_curr_event, tempEnd_curr_event)) {
				eventIndent += 1;
			}
		});

		// Add this event to the ordered array, noting its order and indent
		// (the array is already sorted so we use the index for ordering)
		orderedArray.push({ ...testEvent, order: index + 1, indent: eventIndent });
	});

	return orderedArray;
}
