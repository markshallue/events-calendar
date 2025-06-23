import { Dayjs } from 'dayjs';

import { OrderedCalendarEvent } from '~/types';
import { EMPTY_EVENT } from '~/state/EMPTY_EVENT';

import { returnValidStartEnd } from './returnValidStartEnd';

export const getPlaceholderEvent = (start: Dayjs, end: Dayjs, isTimeEntry?: boolean, isInitialisation?: boolean) => {
	const [validStart, validEnd] = returnValidStartEnd(start, end);
	const eventEnd = isInitialisation && isTimeEntry ? validStart.add(15, 'minute') : validEnd;

	const updatedEvent: OrderedCalendarEvent = {
		...EMPTY_EVENT,
		id: null,
		start: validStart,
		end: eventEnd,
		isActive: true,
		isAllDay: isTimeEntry ? false : true,
		startTime: isTimeEntry ? validStart.format('h:mma') : undefined,
		endTime: isTimeEntry ? eventEnd.format('h:mma') : undefined,
		order: isTimeEntry ? 100 : 0,
	};
	return updatedEvent;
};
