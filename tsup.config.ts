import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['lib/index.tsx'],
	format: ['cjs', 'esm'],
	dts: true,
	sourcemap: true,
	clean: true,
	external: ['react', 'react-dom', '@floating-ui/core', 'dayjs'],
});
