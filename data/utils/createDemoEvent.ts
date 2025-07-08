import dayjs from 'dayjs';
import { RawCalendarEvent } from '~/types';

import tasks from '@/data/tasks.json';
import staff from '@/data/staff.json';
import groups from '@/data/groups.json';

const HOUR_OPTIONS = [8, 9, 10, 11, 12, 13, 14];
const IMAGE_URLS = [
	'/images/demo-image-1.jpg',
	'/images/demo-image-2.jpg',
	'/images/demo-image-3.jpg',
	'/images/demo-image-4.jpg',
	'/images/demo-image-5.jpg',
];

export interface DemoEvent extends RawCalendarEvent {
	content: { label: string; content: string | string[] }[];
	images: string[];
	dayRange?: number;
}

export function createDemoEvent(index: number, dayRange = 90): DemoEvent {
	// Dates
	const IS_PAST = Math.round(Math.random()) === 0 ? 1 : -1;
	const START_DAY = Math.round(Math.random() * dayRange) * IS_PAST;
	const DAY_DIFF = Math.round(Math.random() * 5);

	// Time
	const IS_ALLDAY = Math.round(Math.random()) === 0;
	const START_HOUR = IS_ALLDAY ? 0 : HOUR_OPTIONS[Math.floor(Math.random() * HOUR_OPTIONS.length)];
	const START_DATE = dayjs().subtract(START_DAY, 'day').hour(START_HOUR).minute(0).second(0).millisecond(0);
	const END_DATE = IS_ALLDAY ? START_DATE.add(DAY_DIFF, 'day') : START_DATE.add(Math.ceil(Math.random() * 8), 'hour');

	// Status
	const STATUS = groups[Math.round(Math.random() * 2)].label;

	// Staff
	const STAFF = new Set<string>();
	const NUM_STAFF = Math.round(Math.random() * 6);
	for (let staffIndex = 0; staffIndex < NUM_STAFF; staffIndex += 1) {
		const j = Math.round(Math.random() * (staff.length - 2));
		STAFF.add(staff[j].label);
	}
	const STAFF_ARRAY = [...STAFF];

	// Images
	const IMAGES = new Set<string>();
	const NUM_IMAGES = Math.round(Math.random() * 3);
	for (let imageIndex = 0; imageIndex < NUM_IMAGES; imageIndex += 1) {
		IMAGES.add(IMAGE_URLS[Math.round(Math.random() * (IMAGE_URLS.length - 1))]);
	}
	const IMAGE_ARRAY = [...IMAGES];

	const eventTime = IS_ALLDAY
		? undefined
		: {
				startTime: START_DATE.format('h:mma'),
				endTime: END_DATE.format('h:mma'),
			};

	return {
		id: index + 1,
		title: tasks[index % tasks.length].label,
		start: START_DATE.format('YYYY-MM-DD'),
		end: END_DATE.format('YYYY-MM-DD'),
		...(eventTime ?? []),
		groups: [{ label: STATUS, color: groups.find(o => o.label === STATUS)?.color || '#858E96' }],
		isAllDay: IS_ALLDAY,
		content: [
			{ label: 'Description', content: tasks[index % tasks.length].info },
			{ label: 'Staff', content: STAFF_ARRAY },
		].filter(({ content }) => content && content.length > 0),
		images: IMAGE_ARRAY,
	};
}
