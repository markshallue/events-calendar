'use client';

import dayjs from 'dayjs';
import { Dispatch } from 'react';
import './YearView.css';

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
		<div className='events-calendar-year-view-scroll-wrapper'>
			<div className='events-calendar-year-view' onMouseDown={handleMouseDown}>
				{MONTHS.map(month => {
					return (
						<div key={month} className='events-calendar-year-view-month'>
							<div className='events-calendar-year-view-month-label'>{month}</div>
							<div className='events-calendar-year-view-month-dates'>
								{DAY_LABELS_SHORT.map((day, i) => (
									<div key={`${month}-${i}`} className='events-calendar-year-view-month-header'>
										{day}
									</div>
								))}

								{yearDates[month].map(({ date, isToday, isCurrentMonth, isActive }, i) => (
									<MonthDate
										key={i}
										date={date}
										handleClick={handleClick}
										isToday={isToday}
										isActive={isActive}
										isDimmed={!isCurrentMonth}
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
