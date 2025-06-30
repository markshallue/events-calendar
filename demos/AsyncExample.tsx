'use client';

import { useState } from 'react';
import { IconRefresh } from '@tabler/icons-react';
import { Button, useComputedColorScheme } from '@mantine/core';

import { EventsCalendar, RawCalendarEvent } from '~/index';

import { getEvents } from '@/data/utils';
import { CalendarWrapper } from '@/components';

export const asyncExampleCode = `
import { useState } from 'react';
import { IconRefresh } from '@tabler/icons-react';

import { EventsCalendar, RawCalendarEvent } from 'events-calendar';

import { getEvents } from '@/data/utils';
import { CalendarWrapper } from '@/components';

export function AsyncExample() {
    const [isFetching, setIsFetching] = useState(false);
    const [events, setEvents] = useState<RawCalendarEvent[]>([]);

    // Mock fetch from API
    const fetchData = () => {
        setIsFetching(true);
        setEvents([]);

        setTimeout(() => {
            setEvents(getEvents());
            setIsFetching(false);
        }, 500);
    };

    return (
        <div>
            <Button mb='md' color='indigo' leftSection={<IconRefresh size={20} />} onClick={fetchData}>
                Fetch data
            </Button>
            <CalendarWrapper>
                <EventsCalendar events={events} isFetching={isFetching} />
            </CalendarWrapper>
        </div>
    );
}
`;

export function AsyncExample() {
	const [isFetching, setIsFetching] = useState(false);
	const [events, setEvents] = useState<RawCalendarEvent[]>([]);
	const colorScheme = useComputedColorScheme('light');

	// Mock fetch from API
	const fetchData = () => {
		setIsFetching(true);
		setEvents([]);

		setTimeout(() => {
			setEvents(getEvents());
			setIsFetching(false);
		}, 500);
	};

	return (
		<div>
			<Button mb='md' color='indigo' leftSection={<IconRefresh size={20} />} onClick={fetchData}>
				Fetch data
			</Button>
			<CalendarWrapper>
				<EventsCalendar colorScheme={colorScheme} events={events} isFetching={isFetching} />
			</CalendarWrapper>
		</div>
	);
}
