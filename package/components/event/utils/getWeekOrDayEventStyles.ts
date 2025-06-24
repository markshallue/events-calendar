import { OrderedCalendarEvent } from '~/types';
import { getBackgroundFromGroups } from '~/utils';

export const getWeekOrDayEventStyles = (
	event: OrderedCalendarEvent,
	timeDuration: number,
	dayIndex: number,
	overlapOffset: number,
	isActive: boolean
) => {
	const timeColumnOffset = dayIndex === 0 ? 6 : 0;

	return {
		gridColumnStart: dayIndex + 1,
		gridRowStart: event.start && event.start.hour() * 4 + Math.round(event.start.minute() / 15) + 1,
		gridRowEnd: event.end && event.end.hour() * 4 + Math.round(event.end.minute() / 15) + 1,
		height: 12 * ((timeDuration || 60) / 15) - 2,
		borderWidth: event.indent > 0 ? (timeDuration > 30 ? '1px' : '0.5px') : 0,
		marginLeft: overlapOffset * event.indent + timeColumnOffset,
		width: `calc(100% - ${overlapOffset * (event.indent + 1) + timeColumnOffset}px)`,
		zIndex: isActive ? 100 : 1 + event.order,
		...getBackgroundFromGroups(event.groups),
	};
};
