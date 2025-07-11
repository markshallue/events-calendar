import { Dayjs } from 'dayjs';

/**
 * Checks if a date is between two other dates, inclusive of the start date,
 * and optionally exclusive of the end date.
 *
 * @param date - The date to test.
 * @param testStart - The start date of the range.
 * @param testEnd - The end date of the range.
 * @param startOnly - If true, only consider the start date as inclusive (default: false).
 * @returns True if `date` is between `testStart` and `testEnd` (inclusive start, optional inclusive end).
 */
export function isBetween(
  date: Dayjs,
  testStart: Dayjs,
  testEnd: Dayjs,
  startOnly: boolean = false
): boolean {
  if (date.isSame(testStart, 'd')) return true;
  if (!startOnly && date.isSame(testEnd, 'd')) return true;
  return date.isAfter(testStart) && date.isBefore(testEnd);
}
