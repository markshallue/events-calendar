import { createDemoEvent } from './createDemoEvent';

export const getEvents = (numOfEvents: number = 200, dayRange?: number) => {
	return new Array(numOfEvents).fill(0).map((_, i) => createDemoEvent(i, dayRange));
};
