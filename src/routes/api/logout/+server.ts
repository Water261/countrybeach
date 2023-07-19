import { DbClient } from '../../../hooks.server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	console.log('Got new logout request');
	const sessionId = cookies.get('SESSION_ID') ?? '';

	return await DbClient.session
		.delete({
			where: {
				sessionId
			}
		})
		.catch(() => new Response(null, { status: 500, statusText: 'Internal Server Error' }))
		.then(() => new Response(null, { status: 200, statusText: 'Ok' }));
};
