import { Code, Text, Title } from '@mantine/core';

import { readExample } from '@/utils';
import { CodeBlock } from '@/components';
import { PageWrapper, CalendarWrapper } from '@/components';

import { TimeExample } from './TimeExample';
import { ColorsExample } from './ColorsExample';
import { FirstCalendarExample } from './FirstCalendarExample';

// import firstCalendarExample from './FirstCalendarExample?raw';
// import colorsCalendarExample from './ColorsExample?raw';
// import timeCalendarExample from './TimeExample?raw';

const PATH = 'app/getting-started';

export default function GettingStarted() {
	return (
		<PageWrapper>
			<Title>Installation</Title>
			<CodeBlock
				tabs={[
					{ language: 'shell', fileName: 'npm', code: 'npm i events-calendar' },
					{ language: 'shell', fileName: 'yarn', code: 'yarn add events-calendar' },
					{ language: 'shell', fileName: 'pnpm', code: 'pnpm i events-calendar' },
				]}
			/>

			{/* First Calendar */}
			<Title order={2} mt='lg'>
				Creating your first calendar
			</Title>
			<CodeBlock code={readExample(`${PATH}/FirstCalendarExample.tsx`)} />
			<CalendarWrapper title='Result'>
				<FirstCalendarExample />
			</CalendarWrapper>

			{/* Colors */}
			<Title order={2} mt='lg'>
				Colors and multi-day events
			</Title>
			<Text>
				To add colors to events, assign each event to one or more groups. If an event is assigned to multiple groups, the
				event will be shown with multiple colors.
			</Text>
			<Text>To display multi-day events, add an end to the event.</Text>
			<CodeBlock withExpandButton tabs={[{ fileName: 'Calendar.tsx', code: readExample(`${PATH}/ColorsExample.tsx`) }]} />
			<CalendarWrapper title='Result'>
				<ColorsExample />
			</CalendarWrapper>

			{/* Timed events */}
			<Title order={2} mt='lg'>
				Adding time to events
			</Title>
			<Text>
				To display an event along with a time, set <Code>isAllDay</Code> to <Code>false</Code>.
			</Text>
			<Text>
				The calendar will attempt to read the time from the <Code>start</Code> and <Code>end</Code> properties. This can be
				overridden using the <Code>startTime</Code> property. If no <Code>end</Code> or <Code>endTime</Code> is provided,
				the event will default to a one-hour event.
			</Text>
			<Text>
				The following calendar demonstrates how different permutations of <Code>isAllDay</Code>, <Code>start</Code>,{' '}
				<Code>end</Code>, <Code>startTime</Code> and <Code>endTime</Code> are parsed into valid event objects.
			</Text>
			<CodeBlock withExpandButton tabs={[{ fileName: 'Calendar.tsx', code: readExample(`${PATH}/TimeExample.tsx`) }]} />
			<CalendarWrapper title='Result'>
				<TimeExample />
			</CalendarWrapper>
		</PageWrapper>
	);
}
