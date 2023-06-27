import { DatabaseClient } from '$lib/server/DatabaseClient';
import { schedule } from 'node-cron';

function setup() {
	// Initialise DB
	const dbClient = DatabaseClient.getInstance();

	// Schedule Session Cleanup
	schedule("30 * * * *", () => {
		dbClient.clearExpiredSessions();
	});
}

setup();
