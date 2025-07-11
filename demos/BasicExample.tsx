'use client';

import events from '@/data/events.json';
import { EventsCalendar, useEventsCalendar } from '~/index';

export const basicExampleCode = `
import { EventsCalendar, useEventsCalendar } from 'events-calendar';
import events from '@/data/events.json';

export function BasicExample() {
    // Optional: set initial calendar date
    const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

    return <EventsCalendar calendar={calendar} events={events} />;
}
`;

export function BasicExample() {
  // Optional: set initial calendar date
  const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

  return <EventsCalendar calendar={calendar} events={events} />;
}
