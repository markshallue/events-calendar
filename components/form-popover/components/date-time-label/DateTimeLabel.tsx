import { getDateTimeLabel } from '@/utils';
import { CalendarEvent } from '~/types';
import classes from './DateTimeLabel.module.css';

export function DateTimeLabel({ event }: { event: CalendarEvent }) {
  const { start, end, startTime, endTime, isAllDay } = event;
  const isBlurred = !start;

  return (
    <p className={classes.label} data-blur={isBlurred}>
      {getDateTimeLabel(start, end, startTime, endTime, isAllDay)}
    </p>
  );
}
