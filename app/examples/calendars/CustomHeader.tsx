import { EventsCalendarObject } from '~/index';
import classes from './CustomHeader.module.css';

enum NavigationStep {
	Next = 1,
	Prev = -1,
}

interface CustomHeaderProps {
	calendar: EventsCalendarObject;
}

export function CustomHeader({ calendar }: CustomHeaderProps) {
	const handleNavigate = (step: NavigationStep) => {
		calendar.setActiveDate(p => p.add(step, 'month'));
	};

	return (
		<div className={classes.header}>
			<div className={classes.controls}>
				<button className={classes.button} type='button' onClick={() => handleNavigate(NavigationStep.Prev)}>
					Previous month
				</button>
				<button className={classes.button} type='button' onClick={() => handleNavigate(NavigationStep.Next)}>
					Next month
				</button>
			</div>
			<span className={classes.title}>{calendar.activeDate.format('MMMM YYYY')}</span>
		</div>
	);
}
