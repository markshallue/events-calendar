import { HOURS } from '~/utils';
import './HoursColumn.css';

export function HoursColumn() {
	return (
		<div className='events-calendar-hours-column'>
			{HOURS.map(hour => (
				<div className='events-calendar-hour' key={hour}>
					<span className='events-calendar-hour-label'>{hour}</span>
				</div>
			))}
		</div>
	);
}
