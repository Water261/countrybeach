export interface User {
	id: string;
	firstName: string;
	lastName: string;
	position: string;
	email: string;
	salary: number;
	shopId: string;
}

export interface Shop {
	id: string;
	name: string;
	address: string;
	state: string;
	email: string;
	phoneNos: string[];
}

export interface Session {
	id: string;
	sessionFor: string;
	sessionExpires: bigint;
}
