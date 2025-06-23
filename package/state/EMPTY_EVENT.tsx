import dayjs from 'dayjs';
import { OrderedCalendarEvent } from '../types';

export const EMPTY_EVENT: OrderedCalendarEvent = {
	id: null,
	dragId: null,
	title: 'Untitled',
	groups: [],
	start: dayjs(),
	end: dayjs(),
	startTime: undefined,
	endTime: undefined,
	isActive: false,
	isAllDay: true,
	indent: 0,
	order: 0,
};
