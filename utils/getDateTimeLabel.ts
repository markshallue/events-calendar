import { Dayjs } from 'dayjs';

export function getDateTimeLabel(
	start: Dayjs,
	end: Dayjs,
	startTime?: string | null,
	endTime?: string | null,
	isAllDay?: boolean
) {
	const isMultiDay = end && !end.isSame(start, 'd');
	const hasTime = !isAllDay && startTime;
	return `${start.format('dddd MMMM D')}${isMultiDay ? ` - ${end.format('dddd MMMM D')}` : ''}${
		hasTime ? `, ${start.format('h:mm a')}${endTime ? ' - ' + end.format('h:mm a') : ''}` : ''
	}`;
}
