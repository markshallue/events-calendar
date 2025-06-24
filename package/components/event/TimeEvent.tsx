import classes from './TimeEvent.module.css';

import { CalendarEvent } from '~/types';
import { DEFAULT_COLOR, getBackgroundFromGroups } from '~/utils';

interface TimeEventProps {
	event: CalendarEvent;
	isCompact: boolean;
}

export function TimeEvent({ event, isCompact }: TimeEventProps) {
	// Destructure event
	const { title, start, groups } = event;

	// Event background color(s)
	const colorStyles = getBackgroundFromGroups(groups);
	const eventColors = groups?.map(g => g.color).filter(Boolean) ?? [];
	const borderStyle = { border: `1px solid ${eventColors[0] ?? DEFAULT_COLOR}` };

	return (
		<div className={`${classes.timeContainer}`} data-sm={isCompact} style={borderStyle}>
			<div className={`${classes.timeDot}`} style={colorStyles}></div>
			<div className={`${classes.timeText}`}>{start.format('h:mma')}</div>
			<span className={`${classes.timeLabel}`}>{title}</span>
		</div>
	);
}
