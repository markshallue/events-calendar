'use client';

import { PopoverContent } from './PopoverContent';

interface PopoverProps {
	anchor: HTMLDivElement;
	isOpen: boolean;
	zIndex?: number;
	children: React.ReactNode;
}

export function EventsCalendarPopover({ anchor, isOpen, zIndex = 1, children }: PopoverProps) {
	if (!isOpen || !anchor) return null;
	return (
		<PopoverContent anchor={anchor} zIndex={zIndex}>
			{children}
		</PopoverContent>
	);
}
