import './CircularLoader.css';

export function CircularLoader({ visible }: { visible: boolean }) {
	if (!visible) return;
	return (
		<div className='events-calendar-loader-wrapper'>
			<span className='events-calendar-loader'></span>
		</div>
	);
}
