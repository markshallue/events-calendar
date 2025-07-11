import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { EventsCalendar } from '@/package/EventsCalendar';
import dayjs from 'dayjs';

const testEvents = [{ title: 'My first event!', start: new Date() }];
const firstEvent = testEvents[0];

describe('EventsCalendar', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders without events', () => {
		render(<EventsCalendar />);
		expect(screen.getByText('July 2025')).not.toBeNull();
		expect(screen.queryByText(/event/i)).toBeNull();
	});

	it('renders events', () => {
		render(<EventsCalendar events={testEvents} />);

		expect(screen.getByText(firstEvent.title)).not.toBeNull();
	});

	it('calls onEventClick when an event is clicked', () => {
		const onEventClick = vi.fn();

		render(<EventsCalendar events={testEvents} onEventClick={onEventClick} />);
		fireEvent.click(screen.getByText(firstEvent.title));

		expect(onEventClick).toHaveBeenCalledWith(
			expect.objectContaining({
				event: expect.objectContaining({
					id: expect.any(Number),
					title: firstEvent.title,
					start: expect.any(dayjs),
					end: expect.any(dayjs),
					isAllDay: expect.any(Boolean),
				}),
			})
		);
	});

	it('onEventClick is called once per click', () => {
		const onEventClick = vi.fn();

		render(<EventsCalendar events={testEvents} onEventClick={onEventClick} />);
		fireEvent.click(screen.getByText(firstEvent.title));

		expect(onEventClick).toHaveBeenCalledTimes(1);
	});
});
