import type { RequestHandler } from '@sveltejs/kit';

/**
 * @description Health check
 */
export const GET = (() => {
	return new Response(
		JSON.stringify({
			service: 'Pollitaea API',
			status: 'UP'
		})
	);
}) satisfies RequestHandler;
