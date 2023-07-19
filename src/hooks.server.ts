import { PrismaClient } from '@prisma/client';
import { schedule } from 'node-cron';

export const DbClient = new PrismaClient();

schedule('30 * * * *', () => {
	DbClient.session.deleteMany({
		where: {
			sessionExpires: {
				lt: Date.now()
			}
		}
	})
});
