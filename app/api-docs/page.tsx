'use client';

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

import { CodeBlock, PageWrapper } from '@/components';

import { props } from './propsList';

const calendarPropTypesCode = `
export interface EventsCalendarProps<T extends RawCalendarEventBase = RawCalendarEventBase> {
    calendar?: EventsCalendarObject;
    compact?: boolean;
    colorScheme?: ColorScheme;
    enableDragCreation?: boolean;
    enableRescheduling?: boolean;
    events?: RawCalendarEvent<T>[];
    isFetching?: boolean;
    noHeader?: boolean;
    popoverZIndex?: number;
    views?: CalendarView[];
    onEventClick?: (props: EventClickArgs<T>) => void;
    onEventCreate?: (props: EventEditProps) => void;
    onEventReschedule?: (props: EventEditProps) => void;
    renderPopover?: (props: EventsCalendarPopoverProps) => ReactNode;
    renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
}
    
`;

const eventsObjectCode = `
export type RawCalendarEvent = {
  id?: number | null;
  title?: string;
  start?: string | number | Date | Dayjs;
  end?: string | number | Date | Dayjs;
  startTime?: string | null;
  endTime?: string | null;
  isAllDay?: boolean;
  groups?: { label: string; color: string }[];
}
`;

const useEventsCalendarCode = `
export type useEventsCalendarProps {
    initialDate?: string | number | Date | Dayjs;
    initialView?: CalendarView;
}
`;

const EventsCalendarObject = `
export type EventsCalendarObject = {
    activeDate: dayjs.Dayjs;
    setActiveDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
    view: CalendarView;
    setView: Dispatch<SetStateAction<CalendarView>>;
};
`;

export default function APIDocs() {
	console.log('Mantine Table:', Table);

	const rows = props.map(prop => (
		<TableTr key={prop.name}>
			<TableTd w='20%'>{prop.name}</TableTd>
			{/* <TableTd w='40%' c='blue'>
				{prop.type}
			</TableTd> */}
			<TableTd>{prop.description}</TableTd>
		</TableTr>
	));

	return (
		<PageWrapper withTableOfContents>
			<Stack gap='xl'>
				<Stack>
					<Title order={2}>Calendar props</Title>
					<Paper withBorder radius='md'>
						<Table>
							<TableThead>
								<TableTr>
									<TableTh>Name</TableTh>
									{/* <TableTh>Type</TableTh> */}
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
						With the <Code>useEventsCalendar</Code> hook, you can set the initial state of the calendar, as well as manage the
						calendar state externally. A common use-case is for creating custom header elements.
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
	);
}
