import React from 'react';

import { DEFAULT_COLOR } from './constants';

export function getBackgroundFromArray(colorArray: string[]): React.CSSProperties {
	if (!colorArray.length) return { backgroundColor: DEFAULT_COLOR };

	if (colorArray.length === 1) return { backgroundColor: colorArray[0] };

	const increment = 100 / colorArray.length;
	const values = colorArray.map((color, i) => `${color} ${increment * i}% ${increment * i + increment}%`).join(', ');
	return { backgroundImage: `-webkit-linear-gradient(-30deg,${values})` };
}
