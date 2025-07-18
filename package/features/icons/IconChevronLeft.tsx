interface Props {
	size?: string | number;
	stroke?: string | number;
}

export function IconChevronLeft({ size = '24', stroke = '2' }: Props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={stroke}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='icon icon-tabler icons-tabler-outline icon-tabler-chevron-left'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M15 6l-6 6l6 6' />
		</svg>
	);
}
