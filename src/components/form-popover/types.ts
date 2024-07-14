import { Dayjs } from 'dayjs';

export type CalendarGroup = {
	id: number;
	label: string;
	color: string;
	isDefault?: boolean;
};

export type CalendarFields = {
	id?: string | null;
	title?: string | null;
	info?: string | null;
	start?: string | null;
	end?: string | null;
	image?: string | null;
	group?: string | null;
	filter?: string | null;
	popover?: string[];
	multiGroup?: boolean;
};

export type FormPopoverValues = {
	end: Date;
	groups: string[];
	info: string;
	startTime: string | null;
	endTime: string | null;
	start: Date;
	title: string;
};

export type FormPopoverReturnValues = {
	end: Dayjs;
	groups: string[];
	info: string;
	startTime: string | null;
	endTime: string | null;
	start: Dayjs;
	title: string;
};
