import { describe, expect, it } from 'vitest';
import dayjs from 'dayjs';

import { CalendarEvent } from '@/package';
import { filterByDate } from './filterByDate';

describe('filterByDate', () => {
	const today = dayjs('10-Jul-2025');
	const tomorrow = today.add(1, 'day');
	const yesterday = today.subtract(1, 'day');

	it('returns events that start on the given date', () => {
		const testEvents: CalendarEvent[] = [
			{ id: 1, title: '1', start: today, end: today, isAllDay: true },
			{ id: 2, title: '2', start: tomorrow, end: tomorrow, isAllDay: true },
			{ id: 3, title: '3', start: yesterday, end: yesterday, isAllDay: true },
		];
		const filtered = filterByDate(testEvents, today);
		expect(filtered).toHaveLength(1);
	});

	it('returns events that end on the given date', () => {
		const testEvents: CalendarEvent[] = [
			{ id: 1, title: '1', start: yesterday, end: today, isAllDay: true },
			{ id: 2, title: '2', start: yesterday, end: yesterday, isAllDay: true },
		];
		const filtered = filterByDate(testEvents, today);
		expect(filtered).toHaveLength(1);
	});

	it('returns events that span across the given date', () => {
		const testEvents: CalendarEvent[] = [
			{ id: 1, title: '1', start: yesterday, end: yesterday, isAllDay: true },
			{ id: 2, title: '2', start: yesterday, end: tomorrow, isAllDay: true },
		];
		const filtered = filterByDate(testEvents, today);
		expect(filtered).toHaveLength(1);
	});

	it('excludes events that occur before the given date', () => {
		const testEvents: CalendarEvent[] = [
			{ id: 1, title: '1', start: yesterday, end: yesterday, isAllDay: true },
			{ id: 2, title: '2', start: today, end: today, isAllDay: true },
		];
		const filtered = filterByDate(testEvents, today);
		expect(filtered).toHaveLength(1);
	});

	it('excludes events that occur after the given date', () => {
		const testEvents: CalendarEvent[] = [
			{ id: 1, title: '1', start: tomorrow, end: tomorrow, isAllDay: true },
			{ id: 2, title: '2', start: today, end: today, isAllDay: true },
		];
		const filtered = filterByDate(testEvents, today);
		expect(filtered).toHaveLength(1);
	});

	it('returns an empty array if no events match', () => {
		const testEvents: CalendarEvent[] = [
			{ id: 1, title: '1', start: yesterday, end: yesterday, isAllDay: true },
			{ id: 2, title: '2', start: tomorrow, end: tomorrow, isAllDay: true },
		];
		const filtered = filterByDate(testEvents, today);
		expect(filtered).toHaveLength(0);
	});
});
