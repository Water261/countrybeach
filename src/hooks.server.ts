import { DatabaseClient } from '$lib/server/DatabaseClient';
import { schedule } from 'node-cron';

function setup() {
	// Initialise DB
	const dbClient = DatabaseClient.getInstance();

	// Schedule Session Cleanup
	schedule("30 * * * *", () => {
		dbClient.clearExpiredSessions()
			.catch((e) => console.error(e))
			.then(() => console.log("Successfully cleared invalid sessions"));
	});
}

setup();
