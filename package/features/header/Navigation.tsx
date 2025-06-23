'use client';

import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import classes from './Header.module.css';

import { CalendarView } from '~/types';

import { HeaderButton } from './HeaderButton';
import { IconChevronLeft, IconChevronRight } from '../icons';

const getHeaderTitle = (currDate: dayjs.Dayjs, view: CalendarView) => {
	const weekStart = currDate.startOf('week');
	const weekEnd = currDate.endOf('week');
	return view === 'year'
		? currDate.format('YYYY')
		: view === 'month'
		? currDate.format('MMMM YYYY')
		: view === 'week'
		? `${weekStart.format('MMM DD')} - ${weekEnd.format('MMM DD, YYYY')}`
		: currDate.format('D MMMM, YYYY');
};

interface NavigationProps {
	activeDate: dayjs.Dayjs;
	setActiveDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
	view: CalendarView;
}

export function Navigation({ activeDate, setActiveDate, view }: NavigationProps) {
	// Navigation handlers
	const handleToday = () => setActiveDate(dayjs());
	const handleNext = (increment: CalendarView) => setActiveDate(currDate => currDate.add(1, increment));
	const handlePrev = (increment: CalendarView) => setActiveDate(currDate => currDate.subtract(1, increment));

	return (
		<div className={classes.navigation}>
			<HeaderButton variant='outline' onClick={handleToday}>
				Today
			</HeaderButton>
			<div className={classes.actions}>
				<HeaderButton variant='subtle' onClick={() => handlePrev(view)}>
					<IconChevronLeft size='1.5rem' />
				</HeaderButton>
				<HeaderButton variant='subtle' onClick={() => handleNext(view)}>
					<IconChevronRight size='1.5rem' />
				</HeaderButton>
			</div>
			<span className={classes.date}>{getHeaderTitle(activeDate, view)}</span>
		</div>
	);
}
