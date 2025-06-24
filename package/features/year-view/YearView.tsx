'use client';

import dayjs from 'dayjs';
import { Dispatch } from 'react';
import classes from './YearView.module.css';

import { DAY_LABELS_SHORT, MONTHS } from '~/utils';
import { CalendarAction, CalendarEvent, CalendarState } from '~/types';

import { MonthDate } from './components';
import { generateYearDates } from './utils';

interface YearViewProps<T> {
	activeDate: dayjs.Dayjs;
	dispatch: Dispatch<CalendarAction>;
	events: CalendarEvent<T>[];
	state: CalendarState;
}

export function YearView<T extends object>({ activeDate, dispatch, events, state }: YearViewProps<T>) {
	const yearDates = generateYearDates<T>(activeDate, events);

	// Handlers
	const handleMouseDown = () => dispatch({ type: 'reset_calendar' });
	const handleClick = (e: React.MouseEvent, date: dayjs.Dayjs, ref: React.MutableRefObject<HTMLDivElement | null>) => {
		if (state.overflowIsOpen && e.target === state.overflowAnchor) {
			dispatch({ type: 'reset_calendar' });
		} else {
			dispatch({ type: 'open_overflow', date, anchor: ref.current });
		}
	};

	return (
		<div className={classes.scrollWrapper}>
			<div className={classes.yearView} onMouseDown={handleMouseDown}>
				{MONTHS.map(month => {
					return (
						<div key={month} className={classes.month}>
							<div className={classes.monthLabel}>{month}</div>
							<div className={classes.monthDates}>
								{DAY_LABELS_SHORT.map((day, i) => (
									<div key={`${month}-${i}`} className={classes.monthHeaderDay}>
										{day}
									</div>
								))}

								{yearDates[month].map(({ date, isToday, isCurrentMonth, isActive }, i) => (
									<MonthDate
										key={i}
										date={date}
										handleClick={handleClick}
										isToday={isToday}
										isDimmed={!isCurrentMonth}
										isActive={isActive}
									/>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
