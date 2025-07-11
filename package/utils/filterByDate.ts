import { Dayjs } from 'dayjs';
import { isBetween } from './isBetween';
import { CalendarEvent } from '~/types';

/**
 * Filters a list of calendar events to include only those that occur on a given date.
 *
 * An event is included if the `date` is:
 * - strictly between the event's `start` and `end` dates,
 * - equal to the `start` date,
 * - or equal to the `end` date.
 *
 * @param data - The list of calendar events to filter.
 * @param date - The target date to match against event ranges.
 * @returns An array of events that occur on the specified date.
 */
export function filterByDate<T extends CalendarEvent>(data: T[], date: Dayjs): T[] {
  return data.filter(({ start, end }) => isBetween(date, start, end));
}
