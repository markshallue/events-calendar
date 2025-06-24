import { EventsCalendarObject } from '~/index';
import classes from './CustomHeader.module.css';

const NAVIGATION_STEP = {
	next: 1,
	prev: -1,
} as const;

type NavStep = (typeof NAVIGATION_STEP)[keyof typeof NAVIGATION_STEP];

interface CustomHeaderProps {
	calendar: EventsCalendarObject;
}

export function CustomHeader({ calendar }: CustomHeaderProps) {
	const handleNavigate = (step: NavStep) => {
		calendar.setActiveDate(p => p.add(step, 'month'));
	};

	return (
		<div className={classes.header}>
			<div className={classes.controls}>
				<button className={classes.button} type='button' onClick={() => handleNavigate(NAVIGATION_STEP.prev)}>
					Previous month
				</button>
				<button className={classes.button} type='button' onClick={() => handleNavigate(NAVIGATION_STEP.next)}>
					Next month
				</button>
			</div>
			<span className={classes.title}>{calendar.activeDate.format('MMMM YYYY')}</span>
		</div>
	);
}
