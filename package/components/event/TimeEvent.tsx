import './TimeEvent.css';

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
		<div className='events-calendar-time' data-sm={isCompact} style={borderStyle}>
			<div className='events-calendar-time-dot' style={colorStyles}></div>
			<div className='events-calendar-time-text'>{start.format('h:mma')}</div>
			<span className='events-calendar-time-label'>{title}</span>
		</div>
	);
}
