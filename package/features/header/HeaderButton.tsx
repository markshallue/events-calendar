'use client';

import classes from './HeaderButton.module.css';

interface HeaderButtonProps {
	isGroupButton?: boolean;
	active?: boolean;
	onClick?: () => void;
	variant?: 'outline' | 'subtle';
	children: React.ReactNode;
}

export function HeaderButton({
	isGroupButton,
	active = false,
	onClick = () => null,
	variant,
	children,
}: HeaderButtonProps) {
	return (
		<button
			type='button'
			onClick={onClick}
			data-group={isGroupButton}
			data-active={active}
			data-variant={variant}
			className={classes.button}
		>
			{children}
		</button>
	);
}
