import { CALENDAR_VIEWS } from '~/utils';

const viewArray = `['${CALENDAR_VIEWS.join("', '")}']`;

export const props = [
	{
		name: 'calendar',
		type: 'EventsCalendarObject',
		description: 'Calendar object returned by the useEventsCalendar hook',
	},
	{ name: 'compact', type: 'boolean', description: 'Renders a more compact calendar' },
	{ name: 'enableDragCreation', type: 'boolean', description: 'Enables drag event creation' },
	// { name: 'enableRescheduling', type: 'boolean', description: 'Test' },
	{ name: 'events', type: 'RawCalendarEvent[]', description: 'Main array containing events to display in the calendar' },
	{
		name: 'isFetching',
		type: 'boolean',
		description: 'Activates a loading overlay. Useful for asynchronous data fetching',
	},
	{ name: 'noHeader', type: 'boolean', description: 'Removes the default calendar header' },
	{ name: 'onEventClick', type: '(EventClickArgs) => void', description: 'Event click handler' },
	{
		name: 'onEventCreate',
		type: '(EventEditProps) => void',
		description: 'Event creation handler. Fires after event drag creation. Requires enableDragCreation',
	},
	// { name: 'onEventReschedule', type: '(EventEditProps) => void', description: 'Test' },
	{
		name: 'renderPopover',
		type: '(EventsCalendarPopoverProps) => React.ReactNode',
		description:
			'Render function for popovers bound to a calendar event. Used with onEventClick and onEventCreate to display events within a popover.',
	},
	{
		name: 'renderContextMenu',
		type: '(EventsCalendarContextMenuProps) => React.ReactNode',
		description:
			'Render function for a context menu bound to a calendar event. Used with onEventClick and onEventCreate to bind actions to an event.',
	},
	{
		name: 'views',
		type: 'CalendarView[]',
		description: `A subset of the array ${viewArray}. Determines the view control in the default header`,
	},
];
