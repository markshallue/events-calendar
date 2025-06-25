'use client';

import { useState } from 'react';
import { Button, Group, Paper, Slider, Text } from '@mantine/core';

import { RawDemoEvent } from '@/types';
import { getEvents } from '@/data/utils';
import { IconRefresh } from '@tabler/icons-react';

interface Props {
	setEvents: React.Dispatch<React.SetStateAction<RawDemoEvent[]>>;
}

const marks = [
	{ value: 0, label: '0' },
	{ value: 500, label: '500' },
	{ value: 1000, label: '1000' },
	{ value: 1500, label: '1500' },
	{ value: 2000, label: '2000' },
];

export function LiveDemoControls({ setEvents }: Props) {
	const [numOfEvents, setNumOfEvents] = useState(500);

	return (
		<Paper withBorder radius='md' p='md' mb='sm'>
			<Text size='sm' fw={500} mb='xs'>
				Number of events
			</Text>
			<Group align='center'>
				<Slider
					style={{ flexGrow: 1 }}
					value={numOfEvents}
					onChange={setNumOfEvents}
					min={0}
					max={2000}
					step={10}
					marks={marks}
					color='grape'
				/>
				<Button
					size='sm'
					radius='md'
					color='grape'
					onClick={() => setEvents(getEvents(numOfEvents, 365))}
					rightSection={<IconRefresh size='1.25rem' strokeWidth={1.5} />}
				>
					Generate events!
				</Button>
			</Group>
		</Paper>
	);
}
