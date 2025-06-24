import { FormPopoverReturnValues } from '@/components/form-popover/types';
import { CalendarEvent, RawCalendarEvent } from '~/types';

export type HandleSubmitArgs =
	| {
			type: 'delete';
			id: number | null;
	  }
	| {
			id: number | null;
			type: 'create' | 'edit';
			values: FormPopoverReturnValues;
	  };

export type CalendarFormFields = {
	start?: string;
	end?: string;
	group?: string;
	info?: string;
	multiGroup?: boolean;
};

export type CalendarGroup = {
	id: number;
	label: string;
	color: string;
};

export type DemoEventProps = {
	content?: { label: string; content: string | string[] }[];
	images?: string[];
};

export type RawDemoEvent = RawCalendarEvent & DemoEventProps;

export type DemoEvent = CalendarEvent & DemoEventProps;

export type PopoverType = 'view' | 'edit' | 'create' | 'reschedule';
