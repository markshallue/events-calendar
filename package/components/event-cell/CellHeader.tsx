'use client';

import { Dispatch } from 'react';

import classes from './EventCell.module.css';

import { ShowMoreText } from './ShowMoreText';
import { CalendarAction, CalendarState } from '~/types';
import { DateRecord } from '~/types';
import dayjs from 'dayjs';

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
			{numOverflowEvents > 0 && (
				<ShowMoreText
					date={date}
					dispatch={dispatch}
					isCompact={isCompact}
					numOverflowEvents={numOverflowEvents}
					state={state}
				/>
			)}
		</div>
	);
}
