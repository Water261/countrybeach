import { PrismaClient } from '@prisma/client';
import data from './user-seed.json' assert { type: 'json' };
import { hash } from 'bcrypt';

const client = new PrismaClient();
const defaultPassword = await hash("password", 10);

for (const user of data) {
	await client.user.create({
		data: {...user, password: defaultPassword}
	});
}

client.$disconnect();
