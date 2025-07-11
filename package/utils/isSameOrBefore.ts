import { Dayjs } from 'dayjs';

/**
 * Checks if a date is the same as or before another date, using day precision.
 *
 * @param a - The first Dayjs date
 * @param b - The second Dayjs date
 * @returns `true` if `a` is the same as or before `b`, otherwise `false`
 */
export function isSameOrBefore(a: Dayjs, b: Dayjs): boolean {
  return a.isBefore(b, 'd') || a.isSame(b, 'd');
}
