import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { isValidSession } from "$lib/server/isValidSession";

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get("SESSION_ID");

	if (sessionId !== undefined) {
		const validSession = await isValidSession(sessionId);

		if (validSession) {
			throw redirect(303, "/dashboard");
		} else {
			cookies.delete("SESSION_ID");
		}
	}
};