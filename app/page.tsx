import { Title } from '@mantine/core';
import { EventsCalendar } from '~/EventsCalendar';

import { PageWrapper, CalendarWrapper } from '@/components';

export default function Home() {
	return (
		<PageWrapper>
			<Title>Fully featured React events Calendar</Title>

			<Title order={2}>Features</Title>
			<ul>
				<li>Typescript</li>
				<li>Dark mode</li>
				<li>Lightweight (?)</li>
				<li>Responsive</li>
				<li>Drag event creation</li>
				<li>Overflow handling</li>
				<li>Context menu and popover handling</li>
				<li>Importable views (import year, month, week, day or time views separately</li>
				<li>Importable views (import year, month, week, day or time views separately</li>
			</ul>
			<Title order={2}>Motivation</Title>
			<CalendarWrapper>
				<EventsCalendar
					events={[
						{ id: 1, start: new Date(), title: 'My first event' },
						{
							id: 2,
							start: new Date(),
							title: 'My second event',
							groups: [
								{ label: 'blue', color: '#1c7ed6' },
								{ label: 'pink', color: '#d61c70' },
							],
						},
						{
							id: 3,
							start: new Date(),
							title: 'My third event',
						},
						{
							id: 4,
							title: 'Time',
							start: '10-Jun-2025 3:00 PM',
							isAllDay: false,
							groups: [
								{ label: 'blue', color: '#1c7ed6' },
								{ label: 'pink', color: '#d61c70' },
							],
						},
					]}
				/>
			</CalendarWrapper>
		</PageWrapper>
	);
}
