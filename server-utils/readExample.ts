import fs from 'fs';
import path from 'path';

export function readExample(filename: string): string {
	const filePath = path.resolve(process.cwd(), filename);
	const fileString = fs.readFileSync(filePath, 'utf-8');
	return fileString
		.replace("'use client';", '')
		.replace("const colorScheme = useComputedColorScheme('light');\n", '')
		.replace("import { useComputedColorScheme } from '@mantine/core';\n", '')
		.replace('~/index', 'events-calendar')
		.replace('//prettier-ignore', '')
		.replace('colorScheme={colorScheme} ', '')
		.replaceAll(/\t/g, '  ');
}
