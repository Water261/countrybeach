import { PrismaClient } from '@prisma/client';
import userData from './user-seed.json' assert { type: 'json' };
import shopData from './shop-seed.json' assert { type: 'json' };
import { hash } from 'bcrypt';

const client = new PrismaClient();

for (const shop of shopData) {
	await client.shop.create({
		data: shop
	});
}

for (const user of userData) {
	const defaultPassword = 'password';
	const saltRounds = 10;

	const hashedPw = await hash(defaultPassword, saltRounds);

	await client.user.create({
		data: { ...user, password: hashedPw }
	});
}

client.$disconnect();
