import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get("SESSION_ID");

	// TODO: Implement proper session checking
	if (sessionId) {
		throw redirect(303, "/dashboard");
	}
};