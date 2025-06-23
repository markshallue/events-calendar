'use client';

import dayjs from 'dayjs';
import classes from './TimeIndicator.module.css';

const NOW = dayjs();

export function TimeIndicator({ activeDate, isDayView }: { activeDate: dayjs.Dayjs; isDayView?: boolean }) {
	if (!activeDate.isSame(NOW, 'day')) return;

	const gridColumn = isDayView ? 1 : NOW.day() + 1;
	const gridRow = NOW.hour() * 4 + Math.round(NOW.minute() / 15) + 1;

	return (
		<div className={classes.wrapper} style={{ gridColumn, gridRow }}>
			<div className={classes.dot}></div>
			<div className={classes.line}></div>
		</div>
	);
}
