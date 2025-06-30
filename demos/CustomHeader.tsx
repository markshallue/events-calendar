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

export const customHeaderCss = `
.wrapper {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.header {
	height: 3.5rem;
	display: flex;
	padding: 0.75rem 1rem;
	border-bottom: 1px solid red;
	justify-content: space-between;
}

.controls {
	display: flex;
	gap: 1rem;
	align-items: center;
}

.button {
	font-size: 0.875rem;
}

.title {
	font-size: 1.5rem;
	line-height: 1;
	font-weight: 700;
	color: tomato;
}
`;

export const customHeaderCode = `
import { EventsCalendarObject } from 'events-calendar';
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
`;

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
