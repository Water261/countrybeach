import { DbClient } from "../../hooks.server";

export async function isValidSession(sessionId: string) {
	const session = await DbClient.session.findFirst({
		where: {
			sessionId: sessionId,
			sessionExpires: {
				lt: Date.now()
			}
		}
	});

	if (session === null) {
		console.log('Session does not exist');
		return false;
	}

	return true;
}
