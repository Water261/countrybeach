import { DatabaseClient } from '$lib/server/DatabaseClient';
import { hash } from 'bcrypt';
import type { RequestHandler } from './$types';

const DB_CLIENT = DatabaseClient.getInstance();

export const PATCH: RequestHandler = async ({ cookies, request }) => {
	console.log('Got new staff update request');
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
		return new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}

	const user = await DB_CLIENT.prismaClient.user.findUnique({
		where: {
			id: session.sessionFor
		}
	});

	if (user === null) {
		return new Response(null, { status: 401, statusText: 'Unauthorized' });
	}

	if (user.position !== 'HR Officer') {
		return new Response(null, { status: 403, statusText: 'Forbidden' });
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

export const POST: RequestHandler = async ({ cookies, request }) => {
	console.log('Got new staff create request');
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
		return new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}

	const user = await DB_CLIENT.prismaClient.user.findUnique({
		where: {
			id: session.sessionFor
		}
	});

	if (user === null) {
		return new Response(null, { status: 401, statusText: 'Unauthorized' });
	}

	if (user.position !== 'HR Officer') {
		return new Response(null, { status: 403, statusText: 'Forbidden' });
	}

	const formData = await request.formData();
	const firstName = formData.get('firstName');
	const lastName = formData.get('lastName');
	const email = formData.get('email');
	const position = formData.get('position');
	const salary = formData.get('salary');
	const shopId = formData.get('shopId');

	if (
		firstName === null ||
		lastName === null ||
		email === null ||
		position === null ||
		salary === null ||
		shopId === null
	) {
		return new Response(null, { status: 400, statusText: 'Bad Request' });
	}

	let nextUserId = '';

	do {
		const userIdNum = Math.floor(Math.random() * 100000);
		const userId = `S${userIdNum}`;

		nextUserId = userId;
	} while ((await DB_CLIENT.prismaClient.user.findUnique({ where: { id: nextUserId } })) !== null);

	const password = await hash('password', 10);

	const createPromise = DB_CLIENT.prismaClient.user.create({
		data: {
			id: nextUserId,
			firstName: firstName.toString(),
			lastName: lastName.toString(),
			email: email.toString(),
			password: password,
			position: position.toString(),
			salary: parseInt(salary.toString()),
			shopId: shopId.toString()
		}
	});

	return await createPromise
		.catch(() => new Response(null, { status: 500, statusText: 'Internal Server Error' }))
		.then(() => new Response(null, { status: 200, statusText: 'Ok' }));
};
