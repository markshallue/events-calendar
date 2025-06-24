import React from 'react';

import { DEFAULT_COLOR } from '~/utils';
import { CalendarGroup } from '~/types';

export function getBackgroundFromGroups(groups?: CalendarGroup[]): React.CSSProperties {
	const colors = groups?.map(g => g.color).filter(Boolean) ?? [];

	if (!colors.length) return { backgroundColor: DEFAULT_COLOR };

	if (colors.length === 1) return { backgroundColor: colors[0] };

	const increment = 100 / colors.length;
	const values = colors.map((color, i) => `${color} ${increment * i}% ${increment * i + increment}%`).join(', ');
	return { backgroundImage: `-webkit-linear-gradient(-30deg,${values})` };
}
