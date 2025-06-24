'use client';

import dayjs from 'dayjs';
import { Divider } from '@mantine/core';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import classes from './Header.module.css';

import { CalendarView } from '~/types';
import { CALENDAR_VIEWS } from '~/utils';

import { Controls } from './Controls';
import { Navigation } from './Navigation';

interface HeaderProps {
	activeDate: dayjs.Dayjs;
	view?: CalendarView;
	hideViewToggle?: boolean;
	maxDate?: dayjs.Dayjs | null;
	minDate?: dayjs.Dayjs | null;
	onClick?: () => void;
	setActiveDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
	setView?: Dispatch<SetStateAction<CalendarView>>;
	views?: CalendarView[];
	customControls?: ReactNode;
}
export function Header({
	activeDate,
	onClick = () => null,
	hideViewToggle,
	setActiveDate,
	setView = () => null,
	views = [...CALENDAR_VIEWS],
	view = 'month',
	customControls,
}: HeaderProps) {
	return (
		<>
			<div className={classes.header} onClick={onClick}>
				<Navigation activeDate={activeDate} setActiveDate={setActiveDate} view={view} />
				<Controls hideViewToggle={hideViewToggle} views={views} setView={setView} view={view}>
					{customControls}
				</Controls>
			</div>
			<Divider />
		</>
	);
}
