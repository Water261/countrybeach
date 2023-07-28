import { error } from '@sveltejs/kit';
import { DbClient } from '../../../hooks.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();

	let employees = null;

	if (parentData.position === 'Manager') {
		employees = await DbClient.user.findMany({
			where: {
				shopId: parentData.shopId
			},
			include: {
				shop: true,
			}
		});
	} else if (parentData.position === 'HR Officer') {
		employees = await DbClient.user.findMany({
			include: {
				shop: true,
			}
		});
	} else {
		throw error(403, "Forbidden");
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
