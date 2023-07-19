import { DatabaseClient } from "$lib/server/DatabaseClient";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const DB_CLIENT = DatabaseClient.getInstance();

export const load: PageServerLoad = async ({ params }) => {
	const employeeId = params.id;
	const employee = await DB_CLIENT.prismaClient.user.findUnique({
		where: {
			id: employeeId,
		}
	});

	if (employee === null) {
		throw error(404);
	}

	return employee;
};