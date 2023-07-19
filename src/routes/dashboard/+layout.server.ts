import { isValidSession } from '$lib/server/isValidSession';
import { redirect, type Cookies } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { DbClient } from '../../hooks.server';

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

	const user = await DbClient.user.findFirst({
		where: {
			session: {
				sessionId
			}
		},
		include: {
			shop: true
		}
	});

	if (user === null) {
		console.log('Could not find user, redirecting to login page');
		throw redirectToLogin(cookies);
	}

	// Clear password before handing it back to the client
	user.password = "";

	return user;
};

function redirectToLogin(cookies: Cookies) {
	cookies.delete('SESSION_ID');
	return redirect(303, '/');
}
