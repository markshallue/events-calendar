import { HOURS } from '~/utils';
import classes from './HoursColumn.module.css';

export function HoursColumn() {
	return (
		<div className={classes.hoursColumn}>
			{HOURS.map(hour => (
				<div className={classes.hour} key={hour}>
					<span className={classes.hourLabel}>{hour}</span>
				</div>
			))}
		</div>
	);
}
