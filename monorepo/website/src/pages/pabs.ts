import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
    return new Response(null, {
        status: 302,
        headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Location: '/files/2025-12-02-PABS.pdf',
        },
    });
};
