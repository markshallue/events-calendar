'use client';

import dayjs from 'dayjs';
import { Dispatch } from 'react';
import './CellHeader.css';

import { CalendarAction, CalendarState, DateRecord } from '~/types';

import { ShowMoreText } from './ShowMoreText';

interface CellHeaderProps {
	dayRecord: DateRecord;
	dispatch: Dispatch<CalendarAction>;
	isCompact: boolean;
	numOverflowEvents: number;
	state: CalendarState;
}

export function CellHeader({ dayRecord, dispatch, isCompact, numOverflowEvents, state }: CellHeaderProps) {
	const { date, isCurrentMonth } = dayRecord;

	const isToday = date.isSame(dayjs(), 'day');
	const textColour = isToday ? 'white' : isCurrentMonth ? 'dark' : 'dim';

	return (
		<div className='events-calendar-month-cell-header'>
			<div className='events-calendar-month-cell-date-container' data-today={isToday}>
				<span className='events-calendar-month-cell-date-label' data-color={textColour} data-sm={isCompact}>
					{date.date()}
				</span>
			</div>
			<ShowMoreText
				date={date}
				dispatch={dispatch}
				isCompact={isCompact}
				numOverflowEvents={numOverflowEvents}
				state={state}
			/>
		</div>
	);
}
