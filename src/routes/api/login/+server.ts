import { compare } from 'bcrypt';
import type { RequestHandler } from './$types';
import { DbClient } from '../../../hooks.server';

const SESSION_LENGTH = 12 * 60 * 60 * 1000; // Recommended session length is 12hrs (https://auth0.com/blog/balance-user-experience-and-security-to-retain-customers/)

export const POST: RequestHandler = async ({ request, cookies }) => {
	console.log('Got new login request');
	const formData = await request.formData();
	const email = formData.get('email')?.toString() ?? '';
	const password = formData.get('password')?.toString() ?? '';

	const user = await DbClient.user.findFirst({
		where: {
			email: email
		}
	});

	if (user === null) {
		console.log('Could not find specified user');
		return new Response(null, { status: 401, statusText: 'Unauthorized' });
	}

	const passwordMatches = await compare(password, user.password);
	if (!passwordMatches) {
		console.log('Client attempted to login using incorrect password');
		return new Response(null, { status: 401, statusText: 'Unauthorized' });
	}

	const sessionExpires = new Date(Date.now() + SESSION_LENGTH);

	return await DbClient.session
		.create({
			data: {
				sessionExpires: sessionExpires.getTime(),
				userId: user.userId
			},
			include: {
				user: true
			}
		})
		.catch((e) => {
			console.error(e);
			return null
		})
		.then((session) => {
			if (session === null) {
				return new Response(null, { status: 500, statusText: 'Internal Server Error' });
			}

			cookies.set('SESSION_ID', session.sessionId, { path: '/', expires: sessionExpires });
			return new Response(null, { status: 200, statusText: 'Ok' });
		});
};
