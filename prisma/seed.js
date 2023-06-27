import { PrismaClient } from '@prisma/client';
import data from './user-seed.json' assert { type: 'json' };

const client = new PrismaClient();

for (const user of data) {
	await client.user.create({
		data: user
	});
}

client.$disconnect();
