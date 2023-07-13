import { PrismaClient } from '@prisma/client';
import data from './user-seed.json' assert { type: 'json' };
import { hash } from 'bcrypt';

const client = new PrismaClient();

for (const user of data) {
	const defaultPassword = 'password';
	const saltRounds = 10;

	const hashedPw = await hash(defaultPassword, saltRounds);

	await client.user.create({
		data: { ...user, password: hashedPw }
	});
}

client.$disconnect();
