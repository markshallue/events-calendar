import dayjs from 'dayjs';
import classes from './AllDayEvent.module.css';

import { getBackgroundFromArray } from '~/utils';
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
	// Destructure event
	const { title, start, end, groups } = event;
	const colors = groups?.map(g => g.color).filter(Boolean) ?? [];

	// Calculate arrows for display in overflow popover
	const overflowArrows = getOverflowArrows(isInOverflow, date, start, end, minMaxDatesInView);

	// Event background color(s)
	const clipPath = getClipPath(overflowArrows);
	const colorstyles = getBackgroundFromArray(colors);

	return (
		<div className={classes.container} style={{ ...colorstyles, clipPath }}>
			<div className={classes.content} data-sm={isCompact}>
				<span className={classes.text} data-arrows={overflowArrows}>
					{title}
				</span>
			</div>
		</div>
	);
}
