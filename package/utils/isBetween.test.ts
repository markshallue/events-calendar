import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';

import { CalendarEvent } from '~/types';
import { filterByDate } from './filterByDate';

describe('filterByDate', () => {
	const today = dayjs('2025-07-10');
	const yesterday = today.subtract(1, 'day');
	const tomorrow = today.add(1, 'day');

	it('includes events starting on the given date', () => {
		const events: CalendarEvent[] = [{ id: 1, title: 'Event A', start: today, end: tomorrow, isAllDay: true }];
		expect(filterByDate(events, today)).toHaveLength(1);
	});

	it('includes events ending on the given date', () => {
		const events: CalendarEvent[] = [{ id: 1, title: 'Event B', start: yesterday, end: today, isAllDay: true }];
		expect(filterByDate(events, today)).toHaveLength(1);
	});

	it('includes events spanning across the given date', () => {
		const events: CalendarEvent[] = [{ id: 1, title: 'Event C', start: yesterday, end: tomorrow, isAllDay: true }];
		expect(filterByDate(events, today)).toHaveLength(1);
	});

	it('excludes events before the given date', () => {
		const events: CalendarEvent[] = [{ id: 1, title: 'Event D', start: yesterday, end: yesterday, isAllDay: true }];
		expect(filterByDate(events, today)).toHaveLength(0);
	});

	it('excludes events after the given date', () => {
		const events: CalendarEvent[] = [{ id: 1, title: 'Event E', start: tomorrow, end: tomorrow, isAllDay: true }];
		expect(filterByDate(events, today)).toHaveLength(0);
	});

	it('returns empty array if no events match', () => {
		const events: CalendarEvent[] = [];
		expect(filterByDate(events, today)).toEqual([]);
	});

	it('handles empty input list', () => {
		expect(filterByDate([], today)).toEqual([]);
	});
});
