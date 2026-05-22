import { readFileSync, readdirSync } from 'fs';
import { createHash } from 'node:crypto';
import { join } from 'path';

import MiniSearch from 'minisearch';
import { parse as parseYaml } from 'yaml';

interface SearchDocument {
    id: string;
    title: string;
    section: 'docs' | 'about';
    url: string;
    content: string;
}

interface SearchIndexPayload {
    options: ConstructorParameters<typeof MiniSearch>[0];
    documents: SearchDocument[];
}

export interface BuildSearchIndexResult {
    json: string;
    etag: string;
}

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n?/;

const splitFrontmatter = (content: string): { frontmatter: Record<string, unknown>; body: string } => {
    const match = FRONTMATTER_RE.exec(content);
    if (!match) return { frontmatter: {}, body: content };
    let parsed: unknown = {};
    try {
        parsed = parseYaml(match[1]) ?? {};
    } catch {
        parsed = {};
    }
    const frontmatter = (typeof parsed === 'object' && parsed !== null ? parsed : {}) as Record<string, unknown>;
    return { frontmatter, body: content.slice(match[0].length) };
};

const stripMarkdown = (body: string): string =>
    body
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .trim();

const collectMdxFiles = (
    directory: string,
    section: 'docs' | 'about',
): { path: string; section: 'docs' | 'about' }[] => {
    const files: { path: string; section: 'docs' | 'about' }[] = [];
    const walk = (dir: string) => {
        let entries;
        try {
            entries = readdirSync(dir, { withFileTypes: true });
        } catch {
            return;
        }
        for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.name.endsWith('.mdx')) {
                files.push({ path: fullPath, section });
            }
        }
    };
    walk(directory);
    return files;
};

const parseUrlFromPath = (filePath: string): string => {
    // /…/src/pages/docs/how-to/revise-submissions.mdx -> /docs/how-to/revise-submissions
    // /…/src/pages/docs/how-to/index.mdx              -> /docs/how-to
    const parts = filePath.split('/pages/')[1];
    const urlPath = parts.replace(/\.mdx$/, '').replace(/\/index$/, '');
    return `/${urlPath}`;
};

let cached: BuildSearchIndexResult | undefined;

export const buildSearchIndex = (): BuildSearchIndexResult => {
    if (cached) return cached;

    const cwd = process.cwd();
    const files = [
        ...collectMdxFiles(join(cwd, 'src', 'pages', 'docs'), 'docs'),
        ...collectMdxFiles(join(cwd, 'src', 'pages', 'about'), 'about'),
    ];

    const documents: SearchDocument[] = [];
    let id = 0;
    for (const { path, section } of files) {
        const raw = readFileSync(path, 'utf-8');
        const { frontmatter, body } = splitFrontmatter(raw);
        const title =
            typeof frontmatter.title === 'string' && frontmatter.title.length > 0 ? frontmatter.title : 'Untitled';
        documents.push({
            id: `doc-${id++}`,
            title,
            section,
            url: parseUrlFromPath(path),
            content: stripMarkdown(body),
        });
    }

    const payload: SearchIndexPayload = {
        options: {
            fields: ['title', 'content'],
            storeFields: ['title', 'url', 'section'],
        },
        documents,
    };

    const json = JSON.stringify(payload);
    const etag = `"${createHash('sha1').update(json).digest('hex')}"`;
    cached = { json, etag };
    return cached;
};
