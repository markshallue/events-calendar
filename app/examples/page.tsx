import { Title, Text } from '@mantine/core';

import { demoEvents } from '@/data';
import { readExample } from '@/server-utils';
import { CalendarWrapper, CodeBlock, PageWrapper } from '@/components';

import { BasicExample } from './calendars';

const CALENDAR_PATH = 'app/examples/calendars';

export default function Examples() {
	return (
		<PageWrapper withTableOfContents>
			<Title order={2}>Basic Calendar</Title>
			<Text size='sm'>To create a simple calendar, just pass in an events array.</Text>
			<CodeBlock
				defaultExpanded
				tabs={[
					{ fileName: 'BasicExample.tsx', code: readExample(`${CALENDAR_PATH}/BasicExample.tsx`) },
					{ fileName: 'events.json', code: demoEvents },
				]}
			/>
			<CalendarWrapper title='Result'>
				<BasicExample />
			</CalendarWrapper>
		</PageWrapper>
	);
}
