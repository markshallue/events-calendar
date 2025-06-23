import { Dayjs } from 'dayjs';
import classes from './AllDayEvent.module.css';

import { CalendarEvent, MinMaxDatesInView } from '~/types';
import { DEFAULT_COLOR, getBackgroundFromArray } from '~/utils';

import { OverflowArrow } from '../overflow-arrow';

interface AllDayEventProps {
	date: Dayjs;
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
	const arrowLeft =
		(isInOverflow && start.isBefore(date, 'd')) || (minMaxDatesInView && start.isBefore(minMaxDatesInView?.first, 'd'));
	const arrowRight =
		(isInOverflow && end.isAfter(date, 'd')) || (minMaxDatesInView && end.isAfter(minMaxDatesInView?.last, 'd'));
	const arrows = arrowLeft && arrowRight ? 'both' : arrowLeft ? 'left' : arrowRight ? 'right' : false;

	// Event background color(s)
	const colorstyles = getBackgroundFromArray(colors);
	const leftArrowColor = colors.length ? colors[0] : DEFAULT_COLOR;
	const rightArrowColor = colors.length ? colors[colors.length - 1] : DEFAULT_COLOR;

	return (
		<div className={classes.allDayContainer} style={colorstyles}>
			<OverflowArrow color={leftArrowColor} dir='left' isHidden={!arrowLeft} isCompact={isCompact} />
			<div className={classes.allDayTextContainer} data-sm={isCompact}>
				<span className={classes.allDayText} data-arrows={arrows}>
					{title}
				</span>
			</div>
			<OverflowArrow color={rightArrowColor} dir='right' isHidden={!arrowRight} isCompact={isCompact} />
		</div>
	);
}
