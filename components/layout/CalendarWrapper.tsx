import { Paper, PaperProps, Title } from '@mantine/core';
import classes from './CalendarWrapper.module.css';

interface Props extends PaperProps {
	title?: string;
	children: React.ReactNode;
}

export function CalendarWrapper({ title, children, style }: Props) {
	return (
		<>
			{title && <Title order={3}>{title}</Title>}
			<Paper style={style} className={classes.wrapper} withBorder shadow='sm'>
				{children}
			</Paper>
		</>
	);
}
