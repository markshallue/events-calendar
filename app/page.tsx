import { Title } from '@mantine/core';
import { EventsCalendar } from '~/EventsCalendar';

import { PageWrapper, CalendarWrapper } from '@/components';

export default function Home() {
	return (
		<PageWrapper>
			<Title>Fully featured Calendar</Title>
			<Title order={2}>Motivation</Title>
			<CalendarWrapper>
				<EventsCalendar
					events={[
						{ id: 1, start: new Date(), title: 'My first event' },
						{ id: 2, start: new Date(), title: 'My second event' },
						{ id: 3, start: new Date(), title: 'My third event' },
						{
							id: 4,
							title: 'Time',
							start: '10-Jun-2025 3:00 PM',
							isAllDay: false,
							groups: [{ label: 'blue', color: '#1c7ed6' }],
						},
					]}
				/>
			</CalendarWrapper>
		</PageWrapper>
	);
}
