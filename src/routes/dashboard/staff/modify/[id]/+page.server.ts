import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { DbClient } from "../../../../../hooks.server";

export const load: PageServerLoad = async ({ params }) => {
	const employeeId = params.id;
	const employee = await DbClient.user.findUnique({
		where: {
			userId: employeeId,
		}
	});

	if (employee === null) {
		throw error(404);
	}

	return employee;
};