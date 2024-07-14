import { FormPopoverReturnValues } from '@/components/form-popover/types';
import { demoGroups } from '@/data/constants/demoGroups';
import { Dispatch, SetStateAction } from 'react';
import { RawCalendarEvent } from '~/types';
import { createNewEventFromForm } from './createNewEventFromForm';

export type HandleSubmitArgs =
	| {
			type: 'delete';
			id: number | null;
	  }
	| {
			id: number | null;
			type: 'create' | 'edit';
			values: FormPopoverReturnValues;
	  };

export const exampleSubmitHandler = (
	args: HandleSubmitArgs,
	events: RawCalendarEvent[],
	setEvents: Dispatch<SetStateAction<RawCalendarEvent[]>>
) => {
	const { type } = args;
	if (type === 'delete') {
		setEvents(p => p.filter(event => event.id !== args.id));
	}
	if (type === 'create') {
		const newId = Math.max(...events.map(e => e.id)) + 1;
		const newEvent = createNewEventFromForm({ type, values: args.values, groups: demoGroups, id: newId });
		setEvents(p => [...p, newEvent]);
	}
	if (type === 'edit') {
		const newEvents = events.map(event => {
			if (event.id !== args.id) return event;
			return createNewEventFromForm({ type, values: args.values, groups: demoGroups, event: event });
		});
		setEvents(newEvents);
	}
};
