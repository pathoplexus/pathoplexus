import { buildSearchIndex } from '../utils/buildSearchIndex';

export async function GET() {
	const indexJson = await buildSearchIndex();

	return new Response(indexJson, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
