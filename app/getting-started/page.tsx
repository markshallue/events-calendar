'use client';

import { Alert, Code, Text, Title } from '@mantine/core';

import { CodeBlock, PageWrapper, CalendarWrapper, PageHeading } from '@/components';
import {
	TimeExample,
	timeExampleCode,
	ColorsExample,
	colorsExampleCode,
	FirstCalendarExample,
	firstCalendarExampleCode,
	timeExampleEvents,
	colorsExampleEvents,
} from '@/demos';
import { IconInfoCircle } from '@tabler/icons-react';

export default function GettingStarted() {
	return (
		<>
			<PageHeading title='Getting Started' />
			<PageWrapper withTableOfContents>
				<Title order={2}>Installation</Title>
				<CodeBlock
					defaultExpanded
					tabs={[
						{ language: 'shell', fileName: 'npm', code: 'npm i events-calendar' },
						{ language: 'shell', fileName: 'yarn', code: 'yarn add events-calendar' },
						{ language: 'shell', fileName: 'pnpm', code: 'pnpm i events-calendar' },
					]}
				/>

				<Text mt='xs'>Make sure to also import the css somewhere in your application</Text>
				<CodeBlock defaultExpanded code="import 'events-calendar/styles.css';" />

				{/* First Calendar */}
				<Title order={2} mt='lg'>
					Creating your first calendar
				</Title>
				<Alert variant='light' color='blue' title='Important!' icon={<IconInfoCircle />}>
					The calendar expands to fill its parent container. Always ensure that the parent has an explicit height.
				</Alert>
				<CodeBlock defaultExpanded code={firstCalendarExampleCode} />
				<Title order={3}>Result</Title>
				<div style={{ height: '560px', border: '1px solid #ccc' }}>
					<FirstCalendarExample />
				</div>

				{/* Colors */}
				<Title order={2} mt='lg'>
					Colors and multi-day events
				</Title>
				<Text>
					To add colors to events, assign each event to one or more groups. If an event is assigned to multiple groups, the
					event will be shown with multiple colors.
				</Text>
				<Text>To display multi-day events, add an end to the event.</Text>
				<CodeBlock
					withExpandButton
					tabs={[
						{ fileName: 'ColorsExample.tsx', code: colorsExampleCode },
						{ fileName: 'events.ts', code: colorsExampleEvents },
					]}
				/>
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
				<CodeBlock
					withExpandButton
					tabs={[
						{ fileName: 'TimeExample.tsx', code: timeExampleCode },
						{ fileName: 'events.ts', code: timeExampleEvents },
					]}
				/>
				<CalendarWrapper title='Result'>
					<TimeExample />
				</CalendarWrapper>
			</PageWrapper>
		</>
	);
}
