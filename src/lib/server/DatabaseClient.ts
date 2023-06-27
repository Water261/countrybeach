import { PrismaClient } from "@prisma/client";

export class DatabaseClient {
	static instance: DatabaseClient;

	public prismaClient: PrismaClient;

	private constructor() {
		this.prismaClient = new PrismaClient();
	}

	static getInstance(): DatabaseClient {
		if (!DatabaseClient.instance) {
			DatabaseClient.instance = new DatabaseClient();
		}

		return DatabaseClient.instance;
	}

	// Clear expired sessions
	private _isRemovingInvalidSessions = false;

	public async clearExpiredSessions() {
		if (this._isRemovingInvalidSessions) {
			return;
		}

		this._isRemovingInvalidSessions = true;

		await this.prismaClient.sessions.deleteMany({
			where: {
				sessionExpires: {
					lt: BigInt(Date.now())
				}
			}
		});

		this._isRemovingInvalidSessions = false;
	}
}
