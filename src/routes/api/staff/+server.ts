import { hash } from 'bcrypt';
import type { RequestHandler } from './$types';
import { DbClient } from '../../../hooks.server';

export const PATCH: RequestHandler = async ({ cookies, request }) => {
	console.log('Got new staff update request');
	const sessionId = cookies.get('SESSION_ID');

	if (sessionId === undefined) {
		return new Response(null, { status: 400, statusText: 'Bad Request' });
	}

	const user = await DbClient.user.findFirst({
		where: {
			session: {
				sessionId
			}
		},
		select: {
			position: true
		}
	});

	if (user === null) {
		return new Response(null, { status: 401, statusText: 'Unauthorized' });
	}

	if (user.position !== 'HR Officer') {
		return new Response(null, { status: 403, statusText: 'Forbidden' });
	}

	const formData = await request.formData();
	const userId = formData.get('id')?.toString() ?? '';
	const firstName = formData.get('firstName')?.toString() ?? '';
	const lastName = formData.get('lastName')?.toString() ?? '';
	const email = formData.get('email')?.toString() ?? '';
	const position = formData.get('position')?.toString() ?? '';
	const salary = parseInt(formData.get('salary')?.toString() ?? '0');
	const shopId = formData.get('shopId')?.toString() ?? '';

	const updatePromise = DbClient.user.update({
		where: {
			userId
		},
		data: {
			firstName,
			lastName,
			email,
			position,
			salary,
			shopId
		}
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

	const user = await DbClient.user.findFirst({
		where: {
			session: {
				sessionId
			}
		},
		select: {
			position: true
		}
	});

	if (user === null) {
		return new Response(null, { status: 401, statusText: 'Unauthorized' });
	}

	if (user.position !== 'HR Officer') {
		return new Response(null, { status: 403, statusText: 'Forbidden' });
	}

	const formData = await request.formData();
	const firstName = formData.get('firstName')?.toString() ?? '';
	const lastName = formData.get('lastName')?.toString() ?? '';
	const email = formData.get('email')?.toString() ?? '';
	const position = formData.get('position')?.toString() ?? '';
	const salary = parseInt(formData.get('salary')?.toString() ?? '');
	const shopId = formData.get('shopId')?.toString() ?? '';

	let userId = '';

	do {
		const randomNum = Math.floor(Math.random() * 100000);
		const newUserId = `S${randomNum}`;

		userId = newUserId;
	} while ((await DbClient.user.findUnique({ where: { userId: userId } })) !== null);

	const password = await hash('password', 10);

	const createPromise = DbClient.user.create({
		data: {
			userId,
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
