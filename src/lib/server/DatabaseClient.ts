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
}
