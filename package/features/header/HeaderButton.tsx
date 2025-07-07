import './HeaderButton.css';

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
			className='events-calendar-header-button'
		>
			{children}
		</button>
	);
}
