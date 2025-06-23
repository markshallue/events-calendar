import { CalendarEvent, OrderedCalendarEvent } from '~/types';
import { hasOverlap } from './hasOverlap';

/**
 * Sorts an array of calendar events with the following priority:
 *  1. Longer events appear first (descending by length in days).
 *  2. If lengths are equal, earlier start dates come first.
 *  3. If start dates are equal, all-day events come before timed events.
 *
 * @template T
 * @param {T[]} weekEventsArray - Array of calendar events to sort.
 * @returns {T[]} A new array sorted according to the above criteria.
 */
function calendarSort<T extends CalendarEvent>(weekEventsArray: T[]) {
	const clone = [...weekEventsArray];

	return clone.sort((a, b) => {
		// Calculate the length of each event in days, including both start and end days
		const a_lengthInDays = a.end.diff(a.start, 'day') + 1;
		const b_lengthInDays = b.end.diff(b.start, 'day') + 1;

		// Sort order priority:
		// 1. Longer events come first (descending by length)
		if (a_lengthInDays > b_lengthInDays) return -1;
		if (a_lengthInDays < b_lengthInDays) return 1;

		// 2. If lengths are equal, earlier start date comes first
		if (a.start.isBefore(b.start, 'day')) return -1;
		if (b.start.isBefore(a.start, 'day')) return 1;

		// 3. If same start date, place all-day events above timed events
		if (a.isAllDay && !b.isAllDay) return -1;
		if (!a.isAllDay && b.isAllDay) return 1;

		// 4. If all criteria are equal, keep original order (stable sort)
		return 0;
	});
}

/**
 * Finds the lowest non-negative integer slot not present in the given set of occupied slots.
 *
 * @param {Set<number>} overlappingSlots - A set of slot numbers that are already taken.
 * @returns {number} The lowest slot number not in the set, starting from 0.
 */
function findAvailableSlot(overlappingSlots: Set<number>): number {
	let slot = 0;
	while (overlappingSlots.has(slot)) slot++;
	return slot;
}

/*
    Function that takes an array of events for a single week and arranges them to create a dense fit
*/
export function arrangeWeekEvents<T extends CalendarEvent>(weekEventsArray: T[]): (OrderedCalendarEvent & T)[] {
	if (weekEventsArray.length < 2) return weekEventsArray.map(event => ({ ...{ ...event, order: 0, indent: 0 } }));

	// Sort events by length, then start date, then duration
	const sortedWeekEvents = calendarSort(weekEventsArray);

	// Extract first event from array and place as in first (top) slot/position
	const [firstEvent, ...followingEvents] = sortedWeekEvents;
	const orderedArray: OrderedCalendarEvent<T>[] = [{ ...firstEvent, order: 0, indent: 0 }];

	// Now loop through all other events and add them to the ordered array
	followingEvents.forEach(testEvent => {
		const testStart = testEvent.start;
		const testEnd = testEvent.end || testStart; // fallback if no end

		// Assign 'slots' for each day cell. Track slots that contain overlapping entries
		const overlappingSlots = new Set<number>();

		// Check for overlaps with already placed events
		for (const placedEvent of orderedArray) {
			const placedStart = placedEvent.start;
			const placedEnd = placedEvent.end || placedStart; // fallback if no end

			if (hasOverlap(testStart, testEnd, placedStart, placedEnd)) {
				overlappingSlots.add(placedEvent.order);
			}
		}

		// Find the lowest slot number not taken by overlapping events
		const eventOrder = findAvailableSlot(overlappingSlots);

		// Add this event to the ordered array, along with its allocated slot
		orderedArray.push({ ...testEvent, order: eventOrder, indent: 0 });
	});
	return orderedArray;
}
