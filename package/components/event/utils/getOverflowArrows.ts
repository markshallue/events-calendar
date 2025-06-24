import { MinMaxDatesInView, OverflowArrowType } from '~/types';
import dayjs from 'dayjs';

export const getOverflowArrows = (
	isInOverflow: boolean,
	date: dayjs.Dayjs,
	start: dayjs.Dayjs,
	end: dayjs.Dayjs,
	minMaxDatesInView?: MinMaxDatesInView
): OverflowArrowType => {
	const showLeftArrow = isInOverflow
		? start.isBefore(date, 'day')
		: !!minMaxDatesInView?.first && start.isBefore(minMaxDatesInView.first, 'day');

	const showRightArrow = isInOverflow
		? end.isAfter(date, 'day')
		: !!minMaxDatesInView?.last && end.isAfter(minMaxDatesInView.last, 'day');

	return showLeftArrow && showRightArrow ? 'both' : showLeftArrow ? 'left' : showRightArrow ? 'right' : 'none';
};
