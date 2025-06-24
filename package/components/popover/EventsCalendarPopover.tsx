'use client';

import { ColorScheme } from '~/types';
import { PopoverContent } from './PopoverContent';

interface PopoverProps {
	anchor: HTMLDivElement;
	isOpen: boolean;
	zIndex?: number;
	colorScheme: ColorScheme;
	children: React.ReactNode;
}

export function EventsCalendarPopover({ anchor, colorScheme, isOpen, zIndex = 1, children }: PopoverProps) {
	if (!isOpen || !anchor) return null;
	return (
		<PopoverContent anchor={anchor} zIndex={zIndex} colorScheme={colorScheme}>
			{children}
		</PopoverContent>
	);
}
