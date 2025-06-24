import { Box, Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Props {
	title: React.ReactNode;
	text: string;
	confirmButton: React.ReactNode;
	triggerButton: React.ReactNode;
}

export function ConfirmationModal({ title, text, triggerButton, confirmButton }: Props) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} title={title} centered>
				<Text size='sm'>{text}</Text>
				<Group gap='sm' mt='lg' justify='flex-end'>
					<Button size='xs' color='gray' variant='default' onClick={close}>
						Cancel
					</Button>
					<Box onClick={close}>{confirmButton}</Box>
				</Group>
			</Modal>

			<Box onClick={open}>{triggerButton}</Box>
		</>
	);
}
