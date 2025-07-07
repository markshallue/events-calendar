import './MonthHeader.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface MonthHeaderProps {
	isCompact: boolean;
}

export function MonthHeader({ isCompact }: MonthHeaderProps) {
	return (
		<div className='events-calendar-month-header' data-sm={isCompact}>
			{DAYS.map((day, i) => (
				<div className='events-calendar-month-header-cell' key={i}>
					{day}
				</div>
			))}
		</div>
	);
}
