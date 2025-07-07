'use client';

import { EventsCalendar, useEventsCalendar } from '~/index';

const events = [
	{
		title: 'Lime event',
		start: new Date('5-Aug-2024'),
		groups: [{ label: 'lime', color: '#82c91e' }],
	},
	{
		title: 'Semi-transparent red event',
		start: '6-Aug-2024',
		groups: [{ label: 'transparent-red', color: 'rgba(255,0,0,0.3)' }],
	},
	{
		title: 'Multi-colored multi-day event',
		start: '12-Aug-2024',
		end: '15-Aug-2024',
		groups: [
			{ label: 'indigo', color: '#4263eb' },
			{ label: 'grape', color: '#ae3ec9' },
			{ label: 'teal', color: '#0ca678' },
		],
	},
	{
		title: 'Time event',
		start: '19-Aug-2024 3:00 PM',
		end: '19-Aug-2024 5:00 PM',
		isAllDay: false,
		groups: [
			{ label: 'indigo', color: '#4263eb' },
			{ label: 'grape', color: '#ae3ec9' },
		],
	},
];

export const colorsExampleEvents = `
    export const events = [
    {
        title: 'Lime event',
        start: new Date('5-Aug-2024'),
        groups: [{ label: 'lime', color: '#82c91e' }],
    },
    {
        title: 'Semi-transparent red event',
        start: '6-Aug-2024',
        groups: [{ label: 'transparent-red', color: 'rgba(255,0,0,0.3)' }],
    },
    {
        title: 'Multi-colored multi-day event',
        start: '12-Aug-2024',
        end: '15-Aug-2024',
        groups: [
            { label: 'indigo', color: '#4263eb' },
            { label: 'grape', color: '#ae3ec9' },
            { label: 'teal', color: '#0ca678' },
        ],
    },
    {
        title: 'Time event',
        start: '19-Aug-2024 3:00 PM',
        end: '19-Aug-2024 5:00 PM',
        isAllDay: false,
        groups: [
            { label: 'indigo', color: '#4263eb' },
            { label: 'grape', color: '#ae3ec9' },
        ],
    },
];
`;

export const colorsExampleCode = `
import { EventsCalendar, useEventsCalendar } from 'events-calendar';
import { events } from './events'

export function ColorsExample() {
    // Optional: set initial calendar date
    const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

    return (
        <EventsCalendar
            calendar={calendar}
            events={events}
        />
    );
}
`;

export function ColorsExample() {
	// Optional: set initial calendar date
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	return <EventsCalendar calendar={calendar} events={events} />;
}
