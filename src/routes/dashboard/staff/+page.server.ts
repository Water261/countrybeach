import { DbClient } from '../../../hooks.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();

	let employees = null;

	if (parentData.position === 'Manager') {
		employees = await DbClient.user.findMany({
			where: {
				shopId: parentData.shopId
			}
		});
	} else if (parentData.position === 'HR Officer') {
		employees = await DbClient.user.findMany();
	}

	if (employees === null) {
		return {
			user: parentData,
			employees: []
		};
	}

	return {
		user: parentData,
		employees: employees
	};
};
