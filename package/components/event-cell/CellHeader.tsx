'use client';

import dayjs from 'dayjs';
import { Dispatch } from 'react';

import classes from './CellHeader.module.css';
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
		<div className={classes.cellHeader}>
			<div className={classes.dateContainer} data-today={isToday}>
				<span className={classes.dateLabel} data-color={textColour} data-sm={isCompact}>
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
