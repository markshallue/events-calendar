import dayjs from 'dayjs';
import './AllDayEvent.css';

import { getBackgroundFromGroups } from '~/utils';
import { CalendarEvent, MinMaxDatesInView } from '~/types';

import { getClipPath, getOverflowArrows } from './utils';

interface AllDayEventProps {
	date: dayjs.Dayjs;
	event: CalendarEvent;
	minMaxDatesInView?: MinMaxDatesInView;
	isCompact: boolean;
	isInOverflow: boolean;
}

export function AllDayEvent({ date, event, minMaxDatesInView, isCompact, isInOverflow }: AllDayEventProps) {
	// Calculate arrows for display in overflow popover
	const overflowArrows = getOverflowArrows(isInOverflow, date, event.start, event.end, minMaxDatesInView);

	// Event background color(s)
	const clipPath = getClipPath(overflowArrows);
	const colorstyles = getBackgroundFromGroups(event.groups);

	return (
		<div className='events-calendar-all-day-event' style={{ ...colorstyles, clipPath }}>
			<div className='events-calendar-all-day-event-content' data-sm={isCompact}>
				<span className='events-calendar-all-day-event-text' data-arrows={overflowArrows}>
					{event.title}
				</span>
			</div>
		</div>
	);
}
