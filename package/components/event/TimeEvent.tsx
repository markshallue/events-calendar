import classes from './TimeEvent.module.css';

import { CalendarEvent } from '~/types';
import { DEFAULT_COLOR, getBackgroundFromArray } from '~/utils';

interface TimeEventProps {
	event: CalendarEvent;
	isCompact: boolean;
}

export function TimeEvent({ event, isCompact }: TimeEventProps) {
	// Destructure event
	const { title, start, groups } = event;
	const colors = groups?.map(g => g.color).filter(Boolean) ?? [];

	const timeStyles = {
		border: `1px solid ${colors.length ? colors[0] : DEFAULT_COLOR}`,
		width: '100%',
	};

	// Event background color(s)
	const colorStyles = getBackgroundFromArray(colors);

	return (
		<div className={`${classes.timeContainer}`} data-sm={isCompact} style={timeStyles}>
			<div className={`${classes.timeDot}`} style={colorStyles}></div>
			<div className={`${classes.timeText}`}>{start.format('h:mma')}</div>
			<span className={`${classes.timeLabel}`}>{title}</span>
		</div>
	);
}
