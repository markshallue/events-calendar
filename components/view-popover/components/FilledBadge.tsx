import { Badge } from '@mantine/core';

import { CalendarEvent } from '~/types';
import { getBackgroundFromGroups } from '~/utils';

interface FilledBadgeProps {
	event: CalendarEvent;
}

export function FilledBadge({ event }: FilledBadgeProps) {
	if (!event.groups || event.groups.length === 0) return;
	const label = event.groups.map(g => g.label).join(' • ');
	return (
		<Badge styles={{ root: { border: 0, ...getBackgroundFromGroups(event.groups) } }} variant='filled'>
			{label}
		</Badge>
	);
}
