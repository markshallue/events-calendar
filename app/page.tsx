'use client';

import { Title } from '@mantine/core';

import { PageWrapper } from '@/components';
import { KitchenSinkExample } from './examples/calendars';

export default function Home() {
	return (
		<PageWrapper>
			<Title>Fully featured React events Calendar</Title>

			<Title order={2}>Features</Title>
			<ul>
				<li>Typescript</li>
				<li>Dark mode</li>
				<li>Lightweight (?)</li>
				<li>Responsive</li>
				<li>Drag event creation</li>
				<li>Overflow handling</li>
				<li>Context menu and popover handling</li>
				<li>Importable views (import year, month, week, day or time views separately</li>
			</ul>
			<Title order={2}>Demo</Title>

			<KitchenSinkExample />
		</PageWrapper>
	);
}
