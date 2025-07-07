'use client';

import dayjs from 'dayjs';
import { useRef } from 'react';
import './MonthDate.css';

interface MonthDateProps {
	date: dayjs.Dayjs;
	handleClick: (e: React.MouseEvent, date: dayjs.Dayjs, ref: React.MutableRefObject<HTMLDivElement | null>) => void;
	isToday: boolean;
	isDimmed: boolean;
	isActive: boolean;
}

export function MonthDate({ date, handleClick, isToday, isDimmed, isActive }: MonthDateProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	return (
		<div
			ref={ref}
			data-date={date.format('DD-MMM-YYYY')}
			className='events-calendar-year-view-month-date'
			data-today={isToday}
			data-dimmed={isDimmed}
			data-active={isActive}
			onMouseDown={e => e.stopPropagation()}
			onClick={e => handleClick(e, date, ref)}
		>
			{date.format('D')}
		</div>
	);
}
