import { Dayjs } from 'dayjs';
import { isSameOrBefore } from './isSameOrBefore';

/**
 * Checks if two date ranges overlap.
 *
 * Returns true if any part of the first range (start1 to end1)
 * overlaps with the second range (start2 to end2).
 *
 * @param start1 - Start of the first date range
 * @param end1 - End of the first date range
 * @param start2 - Start of the second date range
 * @param end2 - End of the second date range
 * @returns `true` if the two date ranges overlap, otherwise `false`
 */

export function hasOverlap(start1: Dayjs, end1: Dayjs, start2: Dayjs, end2: Dayjs) {
	// return (
	// 	isBetween(start1, start2, end2) || // range 1 starts within range 2
	// 	isBetween(start2, start1, end1) || // range 2 starts within range 1
	// 	isBetween(end2, start1, end1) // range 2 ends within range 1
	// );

	return isSameOrBefore(start1, end2) && isSameOrBefore(start2, end1);
}
