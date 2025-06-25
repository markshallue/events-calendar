import { AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import classes from './AppWrapper.module.css';

import { Header } from './Header';
import { Footer } from './Footer';

const HEADER_HEIGHT = 56;
const FOOTER_HEIGHT = '8rem';

export function AppWrapper({ children }: React.PropsWithChildren) {
	return (
		<AppShell header={{ height: HEADER_HEIGHT }} style={{ '--footer-height': FOOTER_HEIGHT }}>
			<AppShellHeader>
				<Header />
			</AppShellHeader>
			<AppShellMain className={classes.main}>{children}</AppShellMain>
			<Footer />
		</AppShell>
	);
}
