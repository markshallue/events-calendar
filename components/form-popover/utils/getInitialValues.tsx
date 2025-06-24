import { DemoEvent } from '@/types';
import { FormPopoverValues } from '../types';

export const getInitialValues = (event: DemoEvent | null, infoField?: string): FormPopoverValues => {
	const eventInfo = infoField ? event?.content?.find((x: any) => x.label === infoField)?.content : '';

	return {
		title: event?.title || 'Untitled',
		info: typeof eventInfo === 'string' ? eventInfo : '',
		groups: event?.groups?.map(g => g.label) || [],
		start: event?.start?.toDate() || new Date(),
		end: event?.end?.toDate() || new Date(),
		startTime: event?.startTime || null,
		endTime: event?.endTime || null,
	};
};
