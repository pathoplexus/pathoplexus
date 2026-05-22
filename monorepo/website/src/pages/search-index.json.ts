import { buildSearchIndex } from '../utils/buildSearchIndex';

export function GET({ request }: { request: Request }) {
    const { json, etag } = buildSearchIndex();

    /* eslint-disable @typescript-eslint/naming-convention -- HTTP header names */
    if (request.headers.get('if-none-match') === etag) {
        return new Response(null, {
            status: 304,
            headers: {
                'ETag': etag,
                'Cache-Control': 'public, max-age=3600',
            },
        });
    }

    return new Response(json, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600',
            'ETag': etag,
        },
    });
    /* eslint-enable @typescript-eslint/naming-convention */
}
