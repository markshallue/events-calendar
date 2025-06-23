'use client';

import { Dispatch, MouseEvent, RefObject, useState } from 'react';
import { useFloating, flip, offset, shift, useDismiss, useInteractions } from '@floating-ui/react';

import { CalendarEvent, CalendarAction, CalendarState } from '~/types';

interface useCalendarEventProps<T> {
	dispatch: Dispatch<CalendarAction>;
	event: CalendarEvent<T>;
	isInOverflow: boolean;
	hasContextMenu: boolean;
	state: CalendarState;
}

export function useCalendarEvent<T>({
	dispatch,
	event,
	isInOverflow,
	hasContextMenu,
	state,
}: useCalendarEventProps<T>) {
	// Context menu state
	const [contextIsOpen, setContextIsOpen] = useState(false);
	const closeContextMenu = () => setContextIsOpen(false);

	// Constants
	const isActive = event.id !== null && state.clickedEvent?.id === event.id;

	const { refs, floatingStyles, context } = useFloating({
		open: contextIsOpen,
		onOpenChange: setContextIsOpen,
		middleware: [
			offset({ mainAxis: 5, alignmentAxis: 4 }),
			flip({
				fallbackPlacements: ['left-start'],
			}),
			shift({ padding: 10 }),
		],
		placement: 'right-start',
		// strategy: 'fixed',
		// whileElementsMounted: autoUpdate,
	});

	const dismiss = useDismiss(context);

	const { getFloatingProps } = useInteractions([dismiss]);

	// Handle event right click (context menu)
	const handleContextMenu = (e: MouseEvent, eventRef: RefObject<HTMLDivElement | null>) => {
		if (!hasContextMenu) return;
		e.preventDefault();

		if (state.popoverIsOpen || (state.overflowIsOpen && !isInOverflow)) return;

		refs.setPositionReference({
			getBoundingClientRect() {
				return {
					width: 0,
					height: 0,
					x: e.clientX,
					y: e.clientY,
					top: e.clientY,
					right: e.clientX,
					bottom: e.clientY,
					left: e.clientX,
				};
			},
		});

		dispatch({ type: 'open_context_menu', event, anchor: eventRef.current });
		setContextIsOpen(true);
	};

	return {
		handleContextMenu,
		isActive,
		contextIsOpen,
		refs,
		floatingStyles,
		getFloatingProps,
		closeContextMenu,
	};
}
