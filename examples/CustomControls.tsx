import dayjs from 'dayjs';
import { CALENDAR_VIEWS } from '~/utils';
import { EventsCalendarObject } from '~/index';

import { getEvents } from '@/data/utils';
import { RawDemoEvent } from '@/types';

import { CustomButton } from './CustomButton';

interface Props {
	calendar: EventsCalendarObject;
	setEvents: React.Dispatch<React.SetStateAction<RawDemoEvent[]>>;
	numOfEvents?: number;
	dayRange?: number;
}

export function CustomControls({ calendar, setEvents, numOfEvents, dayRange }: Props) {
	const handleToggleView = () => {
		const currIndex = CALENDAR_VIEWS.indexOf(calendar.view);
		calendar.setView(CALENDAR_VIEWS[(currIndex + 1) % CALENDAR_VIEWS.length]);
	};

	return (
		<div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between' }}>
			<div style={{ display: 'flex', gap: '0.75rem' }}>
				<CustomButton color='pink' onClick={() => calendar.setActiveDate(p => p.subtract(1, 'month'))}>
					Prev month
				</CustomButton>
				<CustomButton color='pink' onClick={() => calendar.setActiveDate(p => p.add(1, 'month'))}>
					Next month
				</CustomButton>
				<CustomButton color='indigo' onClick={() => calendar.setActiveDate(dayjs().add(3, 'M'))}>
					3 months from now
				</CustomButton>
			</div>
			<div style={{ display: 'flex', gap: '0.75rem' }}>
				<CustomButton color='grape' onClick={() => setEvents(getEvents(numOfEvents, dayRange))}>
					Randomise events!
				</CustomButton>
				<CustomButton color='teal' onClick={handleToggleView}>
					Toggle calendar view
				</CustomButton>
			</div>
		</div>
	);
}
