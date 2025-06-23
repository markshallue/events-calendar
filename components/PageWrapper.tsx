'use client';

import { PropsWithChildren } from 'react';
import classes from './PageWrapper.module.css';

export function PageWrapper({ children }: PropsWithChildren) {
	return <div className={classes.wrapper}>{children}</div>;
}
