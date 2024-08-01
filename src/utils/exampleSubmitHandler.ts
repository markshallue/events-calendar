import { Dispatch, SetStateAction } from 'react';

import { HandleSubmitArgs } from '@/types';
import { RawCalendarEvent } from '~/types';

import { demoGroups } from '@/data/constants/demoGroups';
import { createNewEventFromForm } from './createNewEventFromForm';

export const exampleSubmitHandler = (
	args: HandleSubmitArgs,
	events: RawCalendarEvent[],
	setEvents: Dispatch<SetStateAction<RawCalendarEvent[]>>
) => {
	const { type } = args;
	console.log(type);
	if (type === 'delete') {
		setEvents(p => p.filter(event => event.id !== args.id));
	}
	if (type === 'create') {
		const newId = Math.max(...events.map(e => e.id ?? 0)) + 1;
		const newEvent = createNewEventFromForm({ type, values: args.values, groups: demoGroups, id: newId });
		setEvents(p => [...p, newEvent]);
	}
	// if (type === 'reschedule') {
	// 	const newEvents = events.map(event => {
	// 		if (event.id !== args.id) return event;
	// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// 		const { dragId, isActive, indent, order, ...props } = args.event;
	// 		return { ...props, id: dragId };
	// 	});
	// 	setEvents(newEvents);
	// }
	if (type === 'edit') {
		const newEvents = events.map(event => {
			if (event.id !== args.id) return event;
			return createNewEventFromForm({ type, values: args.values, groups: demoGroups, event: event });
		});
		setEvents(newEvents);
	}
};
