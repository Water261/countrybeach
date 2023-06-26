import type { PrismaClient } from "@prisma/client";
import { DatabaseClient } from "./DatabaseClient";

export type Session = {
	id: string,
	sessionFor: string,
	sessionExpires: bigint,
}

const DB_CLIENT = DatabaseClient.getInstance();

export async function isValidSession(session: Session) {
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