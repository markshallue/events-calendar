'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, ReactNode } from 'react';

import { ColorScheme } from '~/types';

import { useBindPopover } from './useBindPopover';

interface PopoverContentProps {
	anchor: Element;
	zIndex: number;
	colorScheme: ColorScheme;
	children: ReactNode;
}

export function PopoverContent({ anchor, zIndex, colorScheme, children }: PopoverContentProps) {
	const styles = useRef({});
	const { refs, floatingStyles } = useBindPopover({ anchor });

	// Only apply repositioning styles after element is mounted
	useEffect(() => {
		setTimeout(() => {
			styles.current = { transitionDuration: '250ms', transitionProperty: 'all' };
		}, 100);
	}, []);

	return createPortal(
		<div
			ref={refs.setFloating}
			style={{ ...floatingStyles, ...styles.current, zIndex }}
			data-ec-color-scheme={colorScheme}
		>
			<div onClick={e => e.stopPropagation()}>{children}</div>
		</div>,
		document.body
	);
}
