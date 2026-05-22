import MiniSearch from 'minisearch';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface SearchDocument {
	id: string;
	title: string;
	section: 'docs' | 'about';
	url: string;
	content: string;
}

const extractTextFromMdx = (content: string): string => {
	// Remove frontmatter
	let text = content.replace(/^---[\s\S]*?---\n/, '');

	// Remove markdown links [text](url) -> text
	text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

	// Remove markdown headers
	text = text.replace(/^#{1,6}\s+/gm, '');

	// Remove code blocks
	text = text.replace(/```[\s\S]*?```/g, '');

	// Remove inline code
	text = text.replace(/`([^`]+)`/g, '$1');

	// Remove HTML comments
	text = text.replace(/<!--[\s\S]*?-->/g, '');

	// Remove extra whitespace
	text = text.replace(/\s+/g, ' ').trim();

	return text;
};

const getMdxFilesFromDirectory = (directory: string): Array<{ path: string; section: 'docs' | 'about' }> => {
	const files: Array<{ path: string; section: 'docs' | 'about' }> = [];
	const section = directory.includes('docs') ? 'docs' : 'about';

	const walkDir = (dir: string) => {
		try {
			const entries = readdirSync(dir, { withFileTypes: true });

			for (const entry of entries) {
				const fullPath = join(dir, entry.name);
				if (entry.isDirectory()) {
					walkDir(fullPath);
				} else if (entry.name.endsWith('.mdx')) {
					files.push({ path: fullPath, section });
				}
			}
		} catch (error) {
			console.error(`Error reading directory ${dir}:`, error);
		}
	};

	walkDir(directory);
	return files;
};

const parseUrlFromPath = (filePath: string): string => {
	// Convert file path to URL
	// /path/to/src/pages/docs/how-to/revise-submissions.mdx -> /docs/how-to/revise-submissions
	// /path/to/src/pages/docs/how-to/index.mdx -> /docs/how-to
	const parts = filePath.split('/pages/')[1];
	const urlPath = parts
		.replace(/\.mdx$/, '')
		.replace(/\/index$/, '');

	return `/${urlPath}`;
};

const getTitleFromMdx = (content: string): string => {
	// Try double quotes first
	let match = content.match(/title:\s*"([^"]*)"/);
	if (match) return match[1];

	// Then try single quotes
	match = content.match(/title:\s*'([^']*)'/);
	if (match) return match[1];

	// Fallback to unquoted (in case there's no quotes at all)
	match = content.match(/title:\s*([^\n]+)/);
	if (match) return match[1].trim();

	return 'Untitled';
};

export const buildSearchIndex = async (): Promise<string> => {
	const docsDirectory = join(process.cwd(), 'src', 'pages', 'docs');
	const aboutDirectory = join(process.cwd(), 'src', 'pages', 'about');

	const docFiles = getMdxFilesFromDirectory(docsDirectory);
	const aboutFiles = getMdxFilesFromDirectory(aboutDirectory);
	const allFiles = [...docFiles, ...aboutFiles];

	const documents: SearchDocument[] = [];
	let id = 0;

	for (const { path, section } of allFiles) {
		try {
			const content = readFileSync(path, 'utf-8');
			const title = getTitleFromMdx(content);
			const textContent = extractTextFromMdx(content);
			const url = parseUrlFromPath(path);

			// Skip index pages as they'll be redundant
			if (!url.endsWith('index')) {
				documents.push({
					id: `doc-${id++}`,
					title,
					section,
					url,
					content: textContent,
				});
			}
		} catch (error) {
			console.error(`Error processing ${path}:`, error);
		}
	}

	const miniSearch = new MiniSearch({
		fields: ['title', 'content'],
		storeFields: ['title', 'url', 'section'],
		searchOptions: {
			boost: { title: 2 },
			fuzzy: 0.2,
		},
	});

	miniSearch.addAll(documents);

	// Return a format that's easy to restore: options + raw documents
	return JSON.stringify({
		options: {
			fields: ['title', 'content'],
			storeFields: ['title', 'url', 'section'],
		},
		documents: documents,
	});
};
