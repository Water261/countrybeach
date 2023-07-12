import { DatabaseClient } from '$lib/server/DatabaseClient';
import { schedule } from 'node-cron';
import { hash } from 'bcrypt';

async function setup() {
	// Initialise DB
	const dbClient = DatabaseClient.getInstance();

	const defaultPassword = await hash("password", 10);

	dbClient.prismaClient.user.updateMany({
		where: {
			password: undefined,
		},
		data: {
			password: defaultPassword
		}
	});

	// Schedule Session Cleanup
	schedule('30 * * * *', () => {
		dbClient
			.clearExpiredSessions()
			.catch((e) => console.error(e))
			.then(() => console.log('Successfully cleared invalid sessions'));
	});
}

await setup();
