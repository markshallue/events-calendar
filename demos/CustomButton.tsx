import { PropsWithChildren } from 'react';
import classes from './CustomButton.module.css';

interface Props extends PropsWithChildren {
	color: 'blue' | 'pink' | 'indigo' | 'grape' | 'teal';
	onClick: () => void;
}

export function CustomButton({ onClick, color, children }: Props) {
	return (
		<button type='button' className={classes.button} data-color={color} onClick={onClick}>
			{children}
		</button>
	);
}
