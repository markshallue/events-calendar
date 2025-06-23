import { PageWrapper } from '@/components';
import { Title } from '@mantine/core';
import { EventsCalendar } from '~/EventsCalendar';

export default function Home() {
	return (
		<PageWrapper>
			<Title>Fully featured Calendar</Title>
			<Title order={2}>Motivation</Title>
			<div style={{ height: 550, border: '1px solid #dedede', borderRadius: '0.25rem' }}>
				<EventsCalendar events={[{ id: 1, start: new Date(), title: 'My first event' }]} />
			</div>
		</PageWrapper>
	);
}
