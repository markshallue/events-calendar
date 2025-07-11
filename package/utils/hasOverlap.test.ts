import { describe, expect, it } from 'vitest';
import { hasOverlap } from './hasOverlap';
import dayjs from 'dayjs';

describe('hasOverlap', () => {
	// One week range for all tests
	const rangeStart = dayjs('10-July-2025');
	const rangeEnd = dayjs('17-July-2025');

	it('returns true when range 1 starts within range 2', () => {
		const testStart = dayjs('05-July-2025');
		const testEnd = dayjs('15-July-2025');
		expect(hasOverlap(rangeStart, rangeEnd, testStart, testEnd)).toBe(true);
	});
	it('returns true when range 2 starts within range 1', () => {
		const testStart = dayjs('12-July-2025');
		const testEnd = dayjs('19-July-2025');
		expect(hasOverlap(rangeStart, rangeEnd, testStart, testEnd)).toBe(true);
	});
	it('returns true when range 2 fully inside range 1', () => {
		const testStart = dayjs('12-July-2025');
		const testEnd = dayjs('15-July-2025');
		expect(hasOverlap(rangeStart, rangeEnd, testStart, testEnd)).toBe(true);
	});
	it('returns true when range 1 fully inside range 2', () => {
		const testStart = dayjs('05-July-2025');
		const testEnd = dayjs('20-July-2025');
		expect(hasOverlap(rangeStart, rangeEnd, testStart, testEnd)).toBe(true);
	});
	it('returns true when range 2 starts at the end of range 1', () => {
		const testStart = dayjs('17-July-2025');
		const testEnd = dayjs('19-July-2025');
		expect(hasOverlap(rangeStart, rangeEnd, testStart, testEnd)).toBe(true);
	});
	it('returns true when range 1 starts at the end of range 2', () => {
		const testStart = dayjs('05-July-2025');
		const testEnd = dayjs('10-July-2025');
		expect(hasOverlap(rangeStart, rangeEnd, testStart, testEnd)).toBe(true);
	});
	it('returns true for identical ranges', () => {
		const testStart = dayjs('10-July-2025');
		const testEnd = dayjs('17-July-2025');
		expect(hasOverlap(rangeStart, rangeEnd, testStart, testEnd)).toBe(true);
	});
	it('returns true when a time event overlaps an all-day event', () => {
		const testStart = dayjs('17-July-2025').hour(10);
		const testEnd = dayjs('17-July-2025').hour(11);
		expect(hasOverlap(rangeStart, rangeEnd, testStart, testEnd)).toBe(true);
	});
	it('returns false when the first range is completely after the second', () => {
		const testStart = rangeStart.add(2, 'week');
		const testEnd = testStart.add(1, 'week');
		expect(hasOverlap(rangeStart, rangeEnd, testStart, testEnd)).toBe(false);
	});
});
