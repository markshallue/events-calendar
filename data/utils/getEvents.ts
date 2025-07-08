import { createDemoEvent } from './createDemoEvent';

export const getEvents = (numOfEvents: number = 200, dayRange?: number) => {
	return Array.from({ length: numOfEvents }, (_, i) => createDemoEvent(i, dayRange));
};
