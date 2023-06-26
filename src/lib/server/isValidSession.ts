import { DatabaseClient } from "./DatabaseClient";

const DB_CLIENT = DatabaseClient.getInstance();

export async function isValidSession(sessionId: string) {
	const session = await DB_CLIENT.prismaClient.sessions.findUnique({
		where: {
			id: sessionId
		}
	});

	if (!session) {
		return false;
	}

	const user = await DB_CLIENT.prismaClient.user.findUnique({
		where: {
			id: session.sessionFor
		}
	});

	if (!user) {
		return false;
	}

	const currentTime = Date.now();

	if (currentTime > session.sessionExpires) {
		return false;
	}

	return true;
}