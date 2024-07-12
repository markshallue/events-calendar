import { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Group, Paper, Title } from '@mantine/core';

import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { createNewEventFromForm } from '@/utils';
import { ContextMenu, FormPopover, ViewPopover } from '@/components';

import { PageWrapper } from '@/layout/PageWrapper';

import { demoData } from '@/data/constants/demoData';
import { demoGroups } from '@/data/constants/demoGroups';
import { HandleSubmitArgs } from '@/components/form-popover/types';

export function KitchenSink() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(demoData);

	const formFields = {
		id: 'id',
		start: 'start',
		end: 'end',
		group: 'Status',
		info: 'Description',
	};

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Jul-2024' });

	const handleSubmit = (args: HandleSubmitArgs) => {
		if (args.type === 'delete') {
			setEvents(p => p.filter(event => event.id !== args.id));
		}
		if (args.type === 'create') {
			const newId = Math.max(...events.map(e => e.id)) + 1;
			console.log(newId);
			const newEvent = createNewEventFromForm({ type: 'create', values: args.values, groups: demoGroups, id: newId });
			setEvents(p => [...p, newEvent]);
		}
		if (args.type === 'edit') {
			const newEvents = events.map(event => {
				if (event.id !== args.id) return event;
				return createNewEventFromForm({
					type: 'edit',
					values: args.values,
					groups: demoGroups,
					event: event,
				});
			});
			setEvents(newEvents);
		}
	};

	return (
		<PageWrapper>
			<Title mb='sm'>All features</Title>
			<Group mb='sm'>
				<Button onClick={() => calendar.setActiveDate(p => p.subtract(1, 'month'))}>Prev month</Button>
				<Button onClick={() => calendar.setActiveDate(p => p.add(1, 'month'))}>Next month</Button>
				<Button onClick={() => calendar.setActiveDate(dayjs())}>Today</Button>
				<Button onClick={() => calendar.setActiveDate(dayjs('01-01-2023'))}>January 2023</Button>
				<Button onClick={() => calendar.setActiveDate(dayjs().add(4, 'M'))}>4 months from now</Button>
			</Group>
			<Group mb='sm'>
				<Button onClick={() => calendar.setView('week')}>Week view</Button>
			</Group>
			<Paper withBorder radius='md' shadow='lg'>
				<EventsCalendar
					enableDragCreation
					enableDragNDrop
					views={['month', 'week', 'day']}
					calendar={calendar}
					events={events}
					renderPopover={props => {
						return props.popoverType === 'view' ? (
							<ViewPopover {...props} editable handleSubmit={handleSubmit} />
						) : (
							<FormPopover
								{...props}
								groups={demoGroups}
								fields={formFields}
								handleSubmit={handleSubmit}
								formType={props.popoverType}
							/>
						);
					}}
					renderContextMenu={props => <ContextMenu {...props} handleSubmit={handleSubmit} />}
				/>
			</Paper>
		</PageWrapper>
	);
}
