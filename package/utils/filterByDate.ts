import { Dayjs } from 'dayjs';

import { CalendarEvent } from '~/types';
import { isBetween } from './isBetween';

export function filterByDate<T extends CalendarEvent>(data: T[], date: Dayjs): T[] {
	return data.filter(({ start, end }) => isBetween(date, start, end));
}
