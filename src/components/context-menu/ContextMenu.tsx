import { Card } from '@mantine/core';

import { EventsCalendarContextMenuProps } from '~/types';
import { EventActions } from '../event-actions';
import { HandleSubmitArgs } from '../form-card/types';

interface ContextMenuProps extends EventsCalendarContextMenuProps {
	handleSubmit: (args: HandleSubmitArgs) => void;
	closeContextMenu: () => void;
}

export function ContextMenu({ setPopoverType, onClose, event, handleSubmit, closeContextMenu }: ContextMenuProps) {
	return (
		<Card p='0.25rem' withBorder shadow='md'>
			<EventActions
				setPopoverType={setPopoverType}
				event={event}
				handleSubmit={handleSubmit}
				onClose={onClose}
				closeContextMenu={closeContextMenu}
				type='buttons'
			/>
		</Card>
	);
}
