'use client';

import { Dispatch, ReactNode, SetStateAction } from 'react';
import classes from './Header.module.css';

import { CalendarView } from '~/types';
import { CALENDAR_VIEWS } from '~/utils';

import { HeaderButton } from './HeaderButton';

interface ControlsProps {
	hideViewToggle?: boolean;
	views: CalendarView[];
	view: CalendarView;
	setView: Dispatch<SetStateAction<CalendarView>>;
	children: ReactNode;
}

export function Controls({ hideViewToggle, views, setView, view, children }: ControlsProps) {
	if (views.length < 1 && !children) return;

	const viewsToDisplay = CALENDAR_VIEWS.filter(validView => views.includes(validView));

	return (
		<div className={classes.controls}>
			{!hideViewToggle && viewsToDisplay.length > 1 && (
				<div className={classes.buttonGroup}>
					{viewsToDisplay.map(viewLabel => (
						<HeaderButton key={viewLabel} isGroupButton active={view === viewLabel} onClick={() => setView(viewLabel)}>
							{viewLabel}
						</HeaderButton>
					))}
				</div>
			)}
			{children}
		</div>
	);
}
