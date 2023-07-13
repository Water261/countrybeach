import type { RequestHandler } from './$types';
import { DatabaseClient } from '$lib/server/DatabaseClient';

const DB_CLIENT = DatabaseClient.getInstance();

export const POST: RequestHandler = async ({ cookies }) => {
	console.log("Got new logout request")
	const sessionId = cookies.get('SESSION_ID');

	if (sessionId === undefined) {
		console.log("Client provided an invalid session");
		return new Response('401: Unauthorized', { status: 401, statusText: 'Unauthorized' });
	}

	await DB_CLIENT.prismaClient.sessions.delete({
		where: {
			id: sessionId
		}
	});

	return new Response('200: Ok', { status: 200, statusText: 'Ok' });
};
