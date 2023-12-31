import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { DbClient } from '../../../../../hooks.server';

export const load: PageServerLoad = async ({ params }) => {
	const employeeId = params.id;
	const employee = await DbClient.user.findUnique({
		where: {
			userId: employeeId
		},
		include: {
			shop: true,
		}
	});
	const shops = await DbClient.shop.findMany();

	if (employee === null) {
		throw error(404);
	}

	return {
		employee,
		shops
	};
};
