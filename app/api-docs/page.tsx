import {
	Anchor,
	Code,
	Paper,
	Stack,
	Table,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	Text,
	Title,
} from '@mantine/core';
import Link from 'next/link';

import { CodeBlock, PageHeading, PageWrapper } from '@/components';

import { props } from './propsList';
import { calendarPropTypesCode, EventsCalendarObject, eventsObjectCode, useEventsCalendarCode } from './codeSnippets';

export default function APIDocs() {
	const rows = props.map(prop => (
		<TableTr key={prop.name}>
			<TableTd w='20%'>{prop.name}</TableTd>
			<TableTd>{prop.description}</TableTd>
		</TableTr>
	));

	return (
		<>
			<PageHeading title='API Documentation' />
			<PageWrapper withTableOfContents>
				<Stack gap='xl'>
					<Stack>
						<Title order={2}>Calendar props</Title>
						<Paper withBorder radius='md'>
							<Table>
								<TableThead>
									<TableTr>
										<TableTh>Name</TableTh>
										<TableTh>Description</TableTh>
									</TableTr>
								</TableThead>
								<TableTbody>{rows}</TableTbody>
							</Table>
						</Paper>
					</Stack>

					<Stack>
						<Title order={2}>Calendar prop types</Title>
						<CodeBlock code={calendarPropTypesCode} />
					</Stack>

					{/* Calendar event object */}
					<Stack>
						<Title order={2}>Calendar event object</Title>
						<CodeBlock code={eventsObjectCode} />
					</Stack>

					{/* The useEventsCalendar hook */}
					<Stack>
						<Title order={2}>The useEventsCalendar hook</Title>
						<Text>
							With the <Code>useEventsCalendar</Code> hook, you can set the initial state of the calendar, as well as manage
							the calendar state externally. A common use-case is for creating custom header elements.
						</Text>
						<CodeBlock code={useEventsCalendarCode} />
						<CodeBlock code={`const calendar = useEventsCalendar({ initialDate: '01-Aug-2024', initialView: 'week' })`} />
						<Text>The hook returns a object containing the following properties:</Text>
						<CodeBlock code={EventsCalendarObject} />
						<Text>
							Check out the{' '}
							<Anchor component={Link} href='/custom-header'>
								Custom Header
							</Anchor>{' '}
							example to see the <Code>useEventsCalendar</Code> hook in action
						</Text>
					</Stack>
				</Stack>
			</PageWrapper>
		</>
	);
}
