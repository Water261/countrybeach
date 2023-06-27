import { isValidSession } from '$lib/server/isValidSession';
import { redirect, type Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('SESSION_ID');

	if (sessionId === undefined) {
		throw redirectToLogin(cookies);
	}

	const validSession = await isValidSession(sessionId);

	console.log(`Session ID ${sessionId} is ${validSession ? 'valid' : 'invalid'}`);

	if (!validSession) {
		throw redirectToLogin(cookies);
	}
};

function redirectToLogin(cookies: Cookies) {
	cookies.delete('SESSION_ID');
	return redirect(303, '/');
}

