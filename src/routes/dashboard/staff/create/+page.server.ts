import { DbClient } from "../../../../hooks.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const shops = await DbClient.shop.findMany();

	return {
		shops
	}
};
