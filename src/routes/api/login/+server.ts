import { DatabaseClient } from "$lib/server/DatabaseClient";
import { LoginResponse } from "$lib/util/LoginResponse";
import type { RequestHandler } from "./$types";
import { v4 as uuidv4 } from "uuid";

const DB_CLIENT = DatabaseClient.getInstance();
const BAD_CREDENTIAL_RESPONSE = new Response(`${LoginResponse.BadEmailPWCombo}`, { status: 400, statusText: "Bad Request" });

// TODO: Implement PW hashing & checking
export const POST: RequestHandler = async ({ request, cookies }) => {
	const formData = await request.formData();
	const formEmail = formData.get("email");
	const formPassword = formData.get("password");

	if (formEmail === null || formPassword === null) {
		return BAD_CREDENTIAL_RESPONSE;
	}

	const email = formEmail.toString();
	const password = formPassword.toString();

	const userWithEmail = await DB_CLIENT.prismaClient.user.findFirst({
		where: {
			email: email,
		}
	});

	if (userWithEmail === null) {
		return BAD_CREDENTIAL_RESPONSE;
	}

	if (password !== "password") {
		return BAD_CREDENTIAL_RESPONSE;
	}

	cookies.set("SESSION_ID", uuidv4(), { path: "/" });
	return new Response();
};