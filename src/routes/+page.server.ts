import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { DatabaseClient } from "$lib/server/DatabaseClient";
import { isValidSession, type Session } from "$lib/server/isValidSession";

const DB_CLIENT = DatabaseClient.getInstance();

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get("SESSION_ID");

	if (!sessionId) {
		return;
	}

	const session = await DB_CLIENT.prismaClient.sessions.findUnique({
		where: {
			id: sessionId
		}
	});

	if (!isValidSession(session as Session)) {
		cookies.delete("SESSION_ID");
		return;
	}

	throw redirect(303, "/dashboard");
};