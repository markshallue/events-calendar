import { OverflowArrowType } from '~/types';

export const getClipPath = (overflowArrows: OverflowArrowType): string | undefined => {
	switch (overflowArrows) {
		case 'both':
			return 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)';
		case 'left':
			return 'polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% 50%)';
		case 'right':
			return 'polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%)';
		case 'none':
			return undefined;
		default:
			return undefined;
	}
};
