import { Paper } from '@mantine/core';
import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';
import { IconBrandCss3, IconBrandTypescript, IconFileTypeTsx, IconJson, IconTerminal } from '@tabler/icons-react';

const ICON_PROPS = { size: 16 };

const ICONS = {
	tsx: <IconFileTypeTsx {...ICON_PROPS} />,
	ts: <IconBrandTypescript {...ICON_PROPS} />,
	css: <IconBrandCss3 {...ICON_PROPS} />,
	shell: <IconTerminal {...ICON_PROPS} />,
	json: <IconJson {...ICON_PROPS} />,
};

function getLanguage(fileName: string) {
	return fileName.split('.').pop() as keyof typeof ICONS;
}

export type CodeBlockProps =
	| {
			withExpandButton?: boolean;
			defaultExpanded?: boolean;
			language?: keyof typeof ICONS;
			fileName?: never;
			code: string;
			tabs?: never;
	  }
	| {
			withExpandButton?: boolean;
			defaultExpanded?: boolean;
			language?: never;
			fileName: string;
			code: string;
			tabs?: never;
	  }
	| {
			withExpandButton?: boolean;
			defaultExpanded?: boolean;
			language?: never;
			fileName?: never;
			code?: never;
			tabs: {
				language?: keyof typeof ICONS;
				fileName: string;
				code: string;
			}[];
	  };

export function CodeBlock({
	withExpandButton = false,
	defaultExpanded = false,
	fileName,
	language,
	code,
	tabs,
}: CodeBlockProps) {
	return (
		<Paper withBorder style={{ overflow: 'hidden' }} w='100%'>
			{tabs ? (
				<CodeHighlightTabs
					withExpandButton={withExpandButton}
					defaultExpanded={defaultExpanded}
					code={tabs.map(({ language, fileName, code }) => {
						language = language || getLanguage(fileName);
						return {
							language,
							fileName,
							code,
							icon: ICONS[language] || undefined,
						};
					})}
					radius='md'
				/>
			) : (
				<CodeHighlight code={code} language={fileName ? getLanguage(fileName) : language || 'tsx'} radius='md' />
			)}
		</Paper>
	);
}
