import { Anchor, Group, Text } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
	return (
		<footer className={classes.root}>
			<div className={classes.content}>
				<Group h='100%' w='100%' justify='space-between'>
					<Text size='sm' c='dimmed'>
						Events Calendar
					</Text>
					<Text size='sm' c='dimmed'>
						Built by{' '}
						<Anchor c='dimmed' href='https://github.com/markshallue' underline='always'>
							Mark Shallue
						</Anchor>
					</Text>
				</Group>
			</div>
		</footer>
	);
}
