import { PrismaClient } from "@prisma/client";

export class DatabaseClient {
	static instance: DatabaseClient;

	public client: PrismaClient;

	private constructor() {
		this.client = new PrismaClient();
	}

	static getInstance(): DatabaseClient {
		if (!DatabaseClient.instance) {
			DatabaseClient.instance = new DatabaseClient();
		}

		return DatabaseClient.instance;
	}
}
