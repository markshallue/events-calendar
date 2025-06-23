import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';

// Constants
const PIXELS_PER_HOUR = 48;
const MINUTES_PER_HOUR = 60;
const NOW_IN_MINUTES = dayjs().diff(dayjs().startOf('day'), 'm');
const pixelsPerMinute = PIXELS_PER_HOUR / MINUTES_PER_HOUR;

interface Props {
	minutesToScroll?: number;
	offset?: number;
}

export function useSetInitialScroll({ minutesToScroll = NOW_IN_MINUTES, offset = 140 }: Partial<Props> = {}) {
	const viewportRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!viewportRef.current) return;

		const offset8am = pixelsPerMinute * minutesToScroll - offset;
		viewportRef.current.scrollTo({ top: offset8am });
	}, [minutesToScroll, offset]);

	return viewportRef;
}
