import { isValidSession } from '$lib/server/isValidSession';
import { redirect, type Cookies } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { DatabaseClient } from '$lib/server/DatabaseClient';
import type { User } from '$lib/util/DbModel';

const DB_CLIENT = DatabaseClient.getInstance();

export const load: LayoutServerLoad = async ({ cookies }) => {
	console.log('Got new dashboard page request');
	const sessionId = cookies.get('SESSION_ID');

	if (sessionId === undefined) {
		throw redirectToLogin(cookies);
	}

	const validSession = await isValidSession(sessionId);

	if (!validSession) {
		console.log('Invalid session found, redirecting to login page');
		throw redirectToLogin(cookies);
	}

	const userSession = await DB_CLIENT.prismaClient.sessions.findUnique({
		where: {
			id: sessionId
		}
	});

	if (userSession === null) {
		console.log('Could not find session provided by client, redirecting client to login page');
		throw redirectToLogin(cookies);
	}

	const user = await DB_CLIENT.prismaClient.user.findUnique({
		where: {
			id: userSession.sessionFor
		}
	});

	if (user === null) {
		console.log('Could not find user, redirecting to login page');
		throw redirectToLogin(cookies);
	}

	const ownUser: User = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		position: user.position,
		email: user.email,
		salary: user.salary,
		shopId: user.shopId
	};

	return ownUser;
};

function redirectToLogin(cookies: Cookies) {
	cookies.delete('SESSION_ID');
	return redirect(303, '/');
}
