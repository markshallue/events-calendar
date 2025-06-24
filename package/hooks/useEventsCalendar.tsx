'use client';

import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';

import { DEFAULT_STATE, reducer } from '~/state';

import { CalendarAction, CalendarState, CalendarView } from '../types';

export type EventsCalendarObject = {
	activeDate: Dayjs;
	setActiveDate: Dispatch<SetStateAction<Dayjs>>;
	view: CalendarView;
	setView: Dispatch<SetStateAction<CalendarView>>;
	state: CalendarState;
	dispatch: Dispatch<CalendarAction>;
};

export type useEventsCalendarProps = {
	isInitialised?: boolean;
	initialDate?: string | number | Date | Dayjs;
	initialView?: CalendarView;
	closeOnClickOutside?: boolean;
};

export function useEventsCalendar({
	isInitialised = false,
	initialDate = dayjs(),
	initialView = 'month',
	closeOnClickOutside = true,
}: Partial<useEventsCalendarProps> = {}): EventsCalendarObject {
	const [activeDate, setActiveDate] = useState(dayjs(initialDate));
	const [view, setView] = useState<CalendarView>(initialView);

	const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

	// Reset calendar on click outside of the react component
	useEffect(() => {
		if (!closeOnClickOutside || isInitialised) return;
		const handleClose = () => dispatch({ type: 'reset_calendar' });

		window.addEventListener('click', handleClose);
		return () => {
			window.removeEventListener('click', handleClose);
		};
	}, [dispatch, isInitialised, closeOnClickOutside]);

	return {
		activeDate,
		setActiveDate,
		view,
		setView,
		state,
		dispatch,
	};
}
