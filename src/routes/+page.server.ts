import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { isValidSession } from "$lib/server/isValidSession";

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get("SESSION_ID") ?? "";

	if (await isValidSession(sessionId)) {
		redirect(303, "/dashboard");
	}

	cookies.delete("SESSION_ID");
};