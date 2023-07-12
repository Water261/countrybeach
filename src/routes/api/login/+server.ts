import { DatabaseClient } from '$lib/server/DatabaseClient';
import { LoginResponse } from '$lib/util/LoginResponse';
import { compare } from 'bcrypt';
import type { RequestHandler } from './$types';
import { v4 as uuidv4 } from 'uuid';

const DB_CLIENT = DatabaseClient.getInstance();
const BAD_CREDENTIAL_RESPONSE = new Response(`${LoginResponse.BadEmailPWCombo}`, {
	status: 401,
	statusText: 'Unauthorized'
});
const SESSION_LENGTH = 12 * 60 * 60 * 1000; // Recommended session length is 12hrs (https://auth0.com/blog/balance-user-experience-and-security-to-retain-customers/)

// TODO: Implement PW hashing & checking
export const POST: RequestHandler = async ({ request, cookies }) => {
	const formData = await request.formData();
	const formEmail = formData.get('email');
	const formPassword = formData.get('password');

	if (formEmail === null || formPassword === null) {
		return BAD_CREDENTIAL_RESPONSE;
	}

	const email = formEmail.toString();
	const password = formPassword.toString();

	const userWithEmail = await DB_CLIENT.prismaClient.user.findFirst({
		where: {
			email: email
		}
	});

	if (userWithEmail === null) {
		return BAD_CREDENTIAL_RESPONSE;
	}

	if (await compare(password, userWithEmail.password)) {
		return BAD_CREDENTIAL_RESPONSE;
	}

	const sessionExpires = new Date(Date.now() + SESSION_LENGTH);
	const sessionId = uuidv4();

	await DB_CLIENT.prismaClient.sessions.create({
		data: {
			id: sessionId,
			sessionFor: userWithEmail.id,
			sessionExpires: BigInt(sessionExpires.getTime())
		}
	});

	cookies.set('SESSION_ID', sessionId, { path: '/', expires: sessionExpires });
	return new Response();
};
