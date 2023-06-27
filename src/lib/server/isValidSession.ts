import { DatabaseClient } from "./DatabaseClient";

const DB_CLIENT = DatabaseClient.getInstance();

export async function isValidSession(sessionId: string) {
	const session = await DB_CLIENT.prismaClient.sessions.findUnique({
		where: {
			id: sessionId
		}
	});

	if (session === null) {
		console.log("Session does not exist");
		return false;
	}

	const user = await DB_CLIENT.prismaClient.user.findUnique({
		where: {
			id: session.sessionFor
		}
	});

	if (user === null) {
		console.log("Session was created for non-existant user");
		return false;
	}

	const currentTime = BigInt(Date.now());

	// Current time is past expiry time
	if (currentTime >= session.sessionExpires) {
		console.log("Session has expired");
		return false;
	}

	return true;
}