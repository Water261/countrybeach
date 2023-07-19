import { DatabaseClient } from '$lib/server/DatabaseClient';
import type { RequestHandler } from './$types';

const DB_CLIENT = DatabaseClient.getInstance();

export const PATCH: RequestHandler = async ({ cookies, request }) => {
	console.log("Got new staff update request");
	const sessionId = cookies.get('SESSION_ID');

	if (sessionId === null) {
		return new Response(null, { status: 400, statusText: 'Bad Request' });
	}

	const session = await DB_CLIENT.prismaClient.sessions.findUnique({
		where: {
			id: sessionId
		}
	});

	if (session === null) {
		return new Response(null, { status: 500, statusText: "Internal Server Error"});
	}

	const user = await DB_CLIENT.prismaClient.user.findUnique({
		where: {
			id: session.sessionFor
		}
	});

	if (user === null) {
		return new Response(null, { status: 401, statusText: "Unauthorized"});
	}

	if (user.position !== "HR Officer") {
		return new Response(null, { status: 403, statusText: "Forbidden"});
	}

	const formData = await request.formData();
	const id = formData.get('id');

	if (id === null) {
		return new Response(null, { status: 400, statusText: 'Bad Request' });
	}

	formData.delete('id');

	const updatePromise = DB_CLIENT.prismaClient.user.update({
		where: {
			id: id.toString()
		},
		data: formData
	});

	return await updatePromise
		.catch(() => new Response(null, { status: 500, statusText: 'Internal Server Error' }))
		.then(() => new Response(null, { status: 200, statusText: 'Ok' }));
};
