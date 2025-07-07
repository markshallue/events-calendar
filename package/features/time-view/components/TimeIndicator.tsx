import dayjs from 'dayjs';
import './TimeIndicator.css';

const NOW = dayjs();

export function TimeIndicator({ activeDate, isDayView }: { activeDate: dayjs.Dayjs; isDayView?: boolean }) {
	if (!activeDate.isSame(NOW, 'day')) return;

	const gridColumn = isDayView ? 1 : NOW.day() + 1;
	const gridRow = NOW.hour() * 4 + Math.round(NOW.minute() / 15) + 1;

	return (
		<div className='events-calendar-time-indicator' style={{ gridColumn, gridRow }}>
			<div className='events-calendar-time-indicator-dot'></div>
			<div className='events-calendar-time-indicator-line'></div>
		</div>
	);
}
