import { DatabaseClient } from '$lib/server/DatabaseClient';
import { hash } from 'bcrypt';
import type { RequestHandler } from './$types';

const DB_CLIENT = DatabaseClient.getInstance();

export const PATCH: RequestHandler = async ({ cookies, request }) => {
	console.log('Got new staff update request');
	const sessionId = cookies.get('SESSION_ID');

	if (sessionId === undefined) {
		return new Response(null, { status: 400, statusText: 'Bad Request' });
	}

	const user = await DB_CLIENT.prismaClient.user.findFirst({
		where: {
			currentSessions: {
				id: sessionId
			}
		}
	});

	if (user === null) {
		return new Response(null, { status: 401, statusText: 'Unauthorized' });
	}

	if (user.position !== 'HR Officer') {
		return new Response(null, { status: 403, statusText: 'Forbidden' });
	}

	const formData = await request.formData();
	const id = formData.get('id')?.toString() ?? "";
	const firstName = formData.get('firstName')?.toString() ?? "";
	const lastName = formData.get('lastName')?.toString() ?? "";
	const email = formData.get('email')?.toString() ?? "";
	const position = formData.get('position')?.toString() ?? "";
	const salary = parseInt(formData.get('salary')?.toString() ?? "0");
	const shopId = formData.get('shopId')?.toString() ?? "";

	const updatePromise = DB_CLIENT.prismaClient.user.update({
		where: {
			id: id
		},
		data: {
			firstName,
			lastName,
			email,
			position,
			salary,
			shopId
		}
	})

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

	const user = await DB_CLIENT.prismaClient.user.findFirst({
		where: {
			currentSessions: {
				id: sessionId
			}
		}
	});

	if (user === null) {
		return new Response(null, { status: 401, statusText: 'Unauthorized' });
	}

	if (user.position !== 'HR Officer') {
		return new Response(null, { status: 403, statusText: 'Forbidden' });
	}

	const formData = await request.formData();
	const firstName = formData.get('firstName')?.toString() ?? "";
	const lastName = formData.get('lastName')?.toString() ?? "";
	const email = formData.get('email')?.toString() ?? "";
	const position = formData.get('position')?.toString() ?? "";
	const salary = parseInt(formData.get('salary')?.toString() ?? "");
	const shopId = formData.get('shopId')?.toString() ?? "";

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
			firstName,
			lastName,
			email,
			position,
			salary,
			shopId,
			password
		}
	});

	return await createPromise
		.catch(() => new Response(null, { status: 500, statusText: 'Internal Server Error' }))
		.then(() => new Response(null, { status: 200, statusText: 'Ok' }));
};
