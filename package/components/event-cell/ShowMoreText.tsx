'use client';

import { Dayjs } from 'dayjs';
import { Dispatch, MouseEvent, useRef } from 'react';
import './ShowMoreText.css';

import { CalendarAction, CalendarState } from '~/types';

interface ShowMoreTextProps {
	date: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	isCompact: boolean;
	numOverflowEvents: number;
	state: CalendarState;
}

export function ShowMoreText({ date, dispatch, isCompact, numOverflowEvents, state }: ShowMoreTextProps) {
	const ref = useRef<HTMLDivElement>(null);

	const handleClick = (e: MouseEvent) => {
		if (state.overflowIsOpen && e.target === state.overflowAnchor) {
			dispatch({ type: 'reset_calendar' });
		} else {
			dispatch({ type: 'open_overflow', date, anchor: ref.current });
		}
	};

	if (!numOverflowEvents) return;

	return (
		<div
			className='events-calendar-show-more-text-container'
			data-sm={isCompact}
			data-date={date.format('DD-MMM-YYYY')}
			onClick={handleClick}
			onMouseDown={e => e.stopPropagation()}
			ref={ref}
		>
			<span className='events-calendar-show-more-text-label events-calendar-sm-only'>{`+${numOverflowEvents}`}</span>
			<span className='events-calendar-show-more-text-label events-calendar-lg-only'>{numOverflowEvents} more</span>
		</div>
	);
}
