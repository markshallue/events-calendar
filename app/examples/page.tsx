import { Text, Stack, Code, Title } from '@mantine/core';

import { demoEvents } from '@/data';
import { readExample } from '@/server-utils';
import { CalendarWrapper, CodeBlock, ContentHeading, PageHeading, PageWrapper } from '@/components';

import {
	AsyncExample,
	BasicExample,
	ContextMenuExample,
	CustomHeaderExample,
	DragCreateExample,
	KitchenSinkExample,
	PopoverExample,
	ResponsiveExample,
} from '@/examples';

export default function Examples() {
	return (
		<>
			<PageHeading title='Examples' />
			<PageWrapper withTableOfContents gap='4rem'>
				<Stack>
					<ContentHeading title='Basic' subtitle='To create a simple calendar, just pass in an events array.' />
					<CodeBlock
						withExpandButton
						tabs={[
							{ fileName: 'BasicExample.tsx', code: readExample(`examples/BasicExample.tsx`) },
							{ fileName: 'events.json', code: demoEvents },
						]}
					/>
					<CalendarWrapper title='Result'>
						<BasicExample />
					</CalendarWrapper>
				</Stack>

				<Stack>
					<ContentHeading
						title='Asynchronous data fetching'
						subtitle={
							<Text>
								Set the <Code>isFetching</Code> prop to <Code>true</Code> to activate the loading overlay.
							</Text>
						}
					/>
					<CodeBlock
						withExpandButton
						tabs={[{ fileName: 'AsnycExample.tsx', code: readExample(`examples/AsyncExample.tsx`) }]}
					/>
					<Title order={3}>Result</Title>
					<AsyncExample />
				</Stack>

				<Stack>
					<ContentHeading
						title='Responsive'
						subtitle='The calendar will grow to fill its container. Resize the container below to see the calendar automatically show/hide events
					based on the available space.'
					/>
					<CodeBlock
						withExpandButton
						tabs={[{ fileName: 'ResponsiveExample.tsx', code: readExample(`examples/ResponsiveExample.tsx`) }]}
					/>
					<Stack gap='0'>
						<Title order={3}>Result</Title>
						<Text>Resize the calendar by dragging the bottom-right corner</Text>
					</Stack>
					<div style={{ minHeight: 550 }}>
						<ResponsiveExample />
					</div>
				</Stack>

				<Stack>
					<ContentHeading
						title='Detail popover'
						subtitle={
							<>
								<Text>
									Use the <Code>onEventClick</Code> and <Code>renderPopover</Code> props to bind a popover to events.
								</Text>
								<Text>
									The renderPopover function provides an object containing the <Code>clickedEvent</Code>, <Code>newEvent</Code>{' '}
									(for click & drag event creation) and an <Code>onClose</Code> function. Make sure to call the{' '}
									<Code>onClose</Code> function on your popover close event to reset the internal calendar state.
								</Text>
							</>
						}
					/>
					<CodeBlock
						withExpandButton
						tabs={[
							{ fileName: 'PopoverExample.tsx', code: readExample(`examples/PopoverExample.tsx`) },
							{ fileName: 'events.json', code: demoEvents },
						]}
					/>
					<CalendarWrapper title='Result'>
						<PopoverExample />
					</CalendarWrapper>
				</Stack>

				<Stack>
					<ContentHeading
						title='Custom header'
						subtitle={
							<Text>
								With the <Code>useEventsCalendar</Code> hook, we can manage the calendar state externally and create a custom
								header element.
							</Text>
						}
					/>
					<CodeBlock
						withExpandButton
						tabs={[
							{ fileName: 'CustomHeader.tsx', code: readExample(`examples/CustomHeaderExample.tsx`) },
							{ fileName: 'CustomHeaderElement.tsx', code: readExample(`examples/CustomHeader.tsx`) },
							{ fileName: 'CustomHeader.module.css', code: readExample(`examples/CustomHeader.module.css`) },
						]}
					/>
					<CalendarWrapper title='Result'>
						<CustomHeaderExample />
					</CalendarWrapper>
				</Stack>

				<Stack>
					<ContentHeading
						title='Click & drag event creation'
						subtitle={
							<Text>
								To enable click & drag event creation, set <Code>enableDragCreation</Code> to <Code>true</Code>. You can then
								use the <Code>onEventCreate</Code> callback to handle when the user finishes dragging (for example by opening a
								popover).
							</Text>
						}
					/>
					<CodeBlock tabs={[{ fileName: 'DragCreateExample.tsx', code: readExample(`examples/DragCreateExample.tsx`) }]} />
					<CalendarWrapper title='Result'>
						<DragCreateExample />
					</CalendarWrapper>
				</Stack>

				<Stack>
					<ContentHeading
						title='Context menu'
						subtitle={
							<Text>
								Use the <Code>renderContextMenu</Code> prop to bind a context menu to events. Right click on an event below to
								see it in action.
							</Text>
						}
					/>
					<CodeBlock
						withExpandButton
						tabs={[{ fileName: 'ContentMenuExample.tsx', code: readExample(`examples/ContextMenuExample.tsx`) }]}
					/>
					<CalendarWrapper title='Result'>
						<ContextMenuExample />
					</CalendarWrapper>
				</Stack>

				<Stack>
					<ContentHeading
						title='Kitchen sink'
						subtitle='Kitchen sink implementation with popover & context menu rendering, click & drag event creation, custom header component and external calendar state management.'
					/>
					<CodeBlock
						withExpandButton
						tabs={[
							{ fileName: 'KitchenSinkExample.tsx', code: readExample(`examples/KitchenSinkExample.tsx`) },
							{ fileName: 'CustomControls.tsx', code: readExample(`examples/CustomControls.tsx`) },
						]}
					/>
					<Title order={3}>Result</Title>
					<KitchenSinkExample />
				</Stack>
			</PageWrapper>
		</>
	);
}
