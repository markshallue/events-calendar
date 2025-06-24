import { Button } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import { CalendarEvent } from '~/types';

import { HandleSubmitArgs } from '@/types';
import { ActionButton, ConfirmationModal } from './components';

interface EventActionsProps {
	event: CalendarEvent;
	onClose: () => void;
	openPopover?: () => void;
	closeContextMenu?: () => void;
	setPopoverType?: (type: 'view' | 'edit') => void;
	handleSubmit?: (args: HandleSubmitArgs) => void;
	renderCustomEditControls?: (event: CalendarEvent, type: 'icons' | 'buttons', close: () => void) => React.ReactNode;
	type: 'icons' | 'buttons';
}
export function EventActions({
	event,
	handleSubmit = () => null,
	setPopoverType,
	openPopover = () => null,
	onClose = () => null,
	closeContextMenu = () => null,
	renderCustomEditControls,
	type,
}: EventActionsProps) {
	// Close modal, popover and context menu
	const closeAll = () => {
		close();
		onClose();
		closeContextMenu();
	};

	const handleConfirm = () => {
		closeAll();
		handleSubmit({ id: event.id, type: 'delete' });
	};

	return (
		<>
			{setPopoverType && (
				<ActionButton
					buttonContext={type}
					color='indigo'
					icon={<IconEdit size='1.125rem' />}
					label='Quick edit'
					onClick={() => {
						setPopoverType('edit');
						openPopover();
						closeContextMenu();
					}}
				/>
			)}
			{renderCustomEditControls && renderCustomEditControls(event, type, closeAll)}
			<ConfirmationModal
				title='Confirm delete'
				text='Are you sure you want to delete this event?'
				triggerButton={
					<ActionButton buttonContext={type} color='red' icon={<IconTrash size='1.125rem' />} label='Delete event' />
				}
				confirmButton={
					<Button size='xs' color='red' onClick={handleConfirm}>
						Delete
					</Button>
				}
			/>
		</>
	);
}
