import { DatabaseClient } from "$lib/server/DatabaseClient";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const DB_CLIENT = DatabaseClient.getInstance();

export const load: PageServerLoad = async ({ parent }) => {
	const layoutData = await parent();

	const shopInfo = await DB_CLIENT.prismaClient.shop.findUnique({
		where: {
			id: layoutData.shopId
		}
	});

	if (shopInfo === null) {
		throw error(500);
	}

	return {
		user: layoutData,
		shop: shopInfo,
	};
};