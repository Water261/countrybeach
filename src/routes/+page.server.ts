import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isValidSession } from '$lib/server/isValidSession';

export const load: PageServerLoad = async ({ cookies }) => {
	console.log('Got new login page request');
	const sessionId = cookies.get('SESSION_ID');

	if (sessionId !== undefined) {
		const validSession = await isValidSession(sessionId);

		if (validSession) {
			console.log('Valid session found, redirecting to dashboard');
			throw redirect(303, '/dashboard');
		} else {
			console.log('Invalid session found, informing client to delete cookie');
			cookies.delete('SESSION_ID');
		}
	}
};
