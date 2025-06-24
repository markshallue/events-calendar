import { Text, Stack, Code, Title } from '@mantine/core';

import { demoEvents } from '@/data';
import { readExample } from '@/server-utils';
import { CalendarWrapper, CodeBlock, PageHeading, PageWrapper } from '@/components';

import { AsyncExample, BasicExample, PopoverExample, ResponsiveExample } from './calendars';

const PATH = 'app/examples/calendars';

export default function Examples() {
	return (
		<PageWrapper withTableOfContents gap='4rem'>
			<Stack>
				<PageHeading title='Basic' subtitle='To create a simple calendar, just pass in an events array.' />
				<CodeBlock
					defaultExpanded
					tabs={[
						{ fileName: 'BasicExample.tsx', code: readExample(`${PATH}/BasicExample.tsx`) },
						{ fileName: 'events.json', code: demoEvents },
					]}
				/>
				<CalendarWrapper title='Result'>
					<BasicExample />
				</CalendarWrapper>
			</Stack>

			<Stack>
				<PageHeading
					title='Asynchronous data fetching'
					subtitle={
						<Text size='sm'>
							Set the <Code>isFetching</Code> prop to <Code>true</Code> to activate the loading overlay.
						</Text>
					}
				/>
				<CodeBlock tabs={[{ fileName: 'AsnycExample.tsx', code: readExample(`${PATH}/AsyncExample.tsx`) }]} />
				<CalendarWrapper title='Result'>
					<AsyncExample />
				</CalendarWrapper>
			</Stack>

			<Stack>
				<PageHeading
					title='Responsive'
					subtitle='The calendar will grow to fill its container. Resize the container below to see the calendar automatically show/hide events
					based on the available space.'
				/>
				<CodeBlock tabs={[{ fileName: 'ResponsiveExample.tsx', code: readExample(`${PATH}/ResponsiveExample.tsx`) }]} />
				<Stack gap='0'>
					<Title order={3}>Result</Title>
					<Text size='sm' c='dimmed'>
						Resize the calendar by dragging the bottom-right corner
					</Text>
				</Stack>
				<div style={{ minHeight: 550 }}>
					<ResponsiveExample />
				</div>
			</Stack>

			<Stack>
				<PageHeading
					title='Detail Popover'
					subtitle={
						<>
							<Text size='sm'>
								Use the <Code>onEventClick</Code> and <Code>renderPopover</Code> props to bind a popover to events.
							</Text>
							<Text size='sm'>
								The renderPopover function provides an object containing the <Code>clickedEvent</Code>, <Code>newEvent</Code>{' '}
								(for event drag creation) and an <Code>onClose</Code> function. Make sure to call the <Code>onClose</Code>{' '}
								function on your popover close event to reset the internal calendar state.
							</Text>
						</>
					}
				/>
				<CodeBlock
					tabs={[
						{ fileName: 'PopoverExample.tsx', code: readExample(`${PATH}/PopoverExample.tsx`), language: 'tsx' },
						{ fileName: 'events.json', code: demoEvents, language: 'ts' },
					]}
				/>
				<CalendarWrapper title='Result'>
					<PopoverExample />
				</CalendarWrapper>
			</Stack>
		</PageWrapper>
	);
}
