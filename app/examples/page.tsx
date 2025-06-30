import { Text, Stack, Code, Title } from '@mantine/core';

import { demoEvents } from '@/data';
import { CalendarWrapper, CodeBlock, ContentHeading, PageHeading, PageWrapper } from '@/components';

import {
	AsyncExample,
	asyncExampleCode,
	BasicExample,
	basicExampleCode,
	ContextMenuExample,
	CustomHeaderExample,
	customHeaderExampleCode,
	customHeaderCode,
	customHeaderCss,
	ClickNDragExample,
	KitchenSinkExample,
	PopoverExample,
	popoverExampleCode,
	ResponsiveExample,
	responsiveExampleCode,
	contextMenuExampleCode,
	kitchenSinkExampleCode,
	clickNDragExampleCode,
} from '@/demos';
import { customControlsCode } from '@/demos/CustomControls';

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
							{ fileName: 'BasicExample.tsx', code: basicExampleCode },
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
					<CodeBlock withExpandButton tabs={[{ fileName: 'AsnycExample.tsx', code: asyncExampleCode }]} />
					<Title order={3}>Result</Title>
					<AsyncExample />
				</Stack>

				<Stack>
					<ContentHeading
						title='Responsive overflow handling'
						subtitle='The calendar will grow to fill its container. Resize the container below to see the calendar automatically show/hide events
					based on the available space.'
					/>
					<CodeBlock withExpandButton tabs={[{ fileName: 'ResponsiveExample.tsx', code: responsiveExampleCode }]} />
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
							{ fileName: 'PopoverExample.tsx', code: popoverExampleCode },
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
							{ fileName: 'CustomHeader.tsx', code: customHeaderExampleCode },
							{ fileName: 'CustomHeaderElement.tsx', code: customHeaderCode },
							{ fileName: 'CustomHeader.module.css', code: customHeaderCss },
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
					<CodeBlock tabs={[{ fileName: 'ClickNDragExample.tsx', code: clickNDragExampleCode }]} />
					<CalendarWrapper title='Result'>
						<ClickNDragExample />
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
					<CodeBlock withExpandButton tabs={[{ fileName: 'ContentMenuExample.tsx', code: contextMenuExampleCode }]} />
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
							{ fileName: 'KitchenSinkExample.tsx', code: kitchenSinkExampleCode },
							{ fileName: 'CustomControls.tsx', code: customControlsCode },
						]}
					/>
					<Title order={3}>Result</Title>
					<KitchenSinkExample />
				</Stack>
			</PageWrapper>
		</>
	);
}
