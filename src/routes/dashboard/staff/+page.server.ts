import type { PageServerLoad } from "./$types";
import { DatabaseClient } from "$lib/server/DatabaseClient";

const DB_CLIENT = DatabaseClient.getInstance();

export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();

	let employees = null;
	
	if (parentData.position === "Manager") {
		employees = await DB_CLIENT.prismaClient.user.findMany({
			where: {
				shopId: parentData.shopId
			}
		});
	} else if (parentData.position === "HR Officer") {
		employees = await DB_CLIENT.prismaClient.user.findMany();
	}

	if (employees === null) {
		return {
			user: parentData,
			employees: [],
		};
	}
	
	return {
		user: parentData,
		employees: employees,
	};
};