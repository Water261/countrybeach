<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const salary = data.salary.toLocaleString('en-AU', {
		style: 'currency',
		currency: 'AUD',
		maximumFractionDigits: 0
	});
</script>

<svelte:head>
	<title>Dashboard - Country Beach</title>
</svelte:head>

<div class="flex px-40 py-5">
	<div class="flex flex-col">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-80 w-80 rounded-xl bg-gray-600 text-white"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
			/>
		</svg>
	</div>

	<div class="flex w-1/3 flex-col mx-10">
		<h2 class="text-2xl font-bold">Employee Details</h2>
		<ul class="flex flex-col">
			<div class="form-control">
				<label for="firstName" class="label">
					<span class="label-text">First Name</span>
				</label>
				<input
					id="firstName"
					type="text"
					class="input-bordered input input-disabled"
					disabled
					value={data.firstName}
				/>
			</div>
			<div class="form-control">
				<label for="lastName" class="label">
					<span class="label-text">Last Name</span>
				</label>
				<input
					id="lastName"
					type="text"
					class="input-bordered input input-disabled"
					disabled
					value={data.lastName}
				/>
			</div>
			<div class="form-control">
				<label for="email" class="label">
					<span class="label-text">Email Address</span>
				</label>
				<input
					id="email"
					type="text"
					class="input-bordered input input-disabled"
					disabled
					value={data.email}
				/>
			</div>
			<div class="form-control">
				<label for="position" class="label">
					<span class="label-text">Position</span>
				</label>
				<input
					id="position"
					type="text"
					class="input-bordered input input-disabled"
					disabled
					value={data.position}
				/>
			</div>
			<div class="form-control">
				<label for="salary" class="label">
					<span class="label-text">Salary</span>
				</label>
				<input
					id="salary"
					type="text"
					class="input-bordered input input-disabled"
					disabled
					value={salary}
				/>
			</div>
		</ul>
	</div>
	<div class="flex w-1/3 flex-col">
		<h2 class="text-2xl font-bold">Shop Information</h2>
		<div class="flex flex-col">
			<div class="form-control">
				<label for="shopName" class="label">
					<span class="label-text">Name</span>
				</label>
				<input
					id="shopName"
					type="text"
					class="input-bordered input input-disabled w-full"
					disabled
					value={data.shop.name}
				/>
			</div>
			<div class="form-control">
				<label for="address" class="label">
					<span class="label-text">Address</span>
				</label>
				<input
					id="address"
					type="text"
					class="input-bordered input input-disabled"
					disabled
					value={data.shop.address}
				/>
			</div>
			<div class="form-control">
				<label for="state" class="label">
					<span class="label-text">State</span>
				</label>
				<input
					id="state"
					type="text"
					class="input-bordered input input-disabled"
					disabled
					value={data.shop.state}
				/>
			</div>
			<div class="form-control">
				<label for="shopEmail" class="label">
					<span class="label-text">Email Address</span>
				</label>
				<input
					id="shopEmail"
					type="text"
					class="input-bordered input input-disabled"
					disabled
					value={data.shop.email}
				/>
			</div>
			<div class="form-control">
				<label for="phoneNos" class="label">
					<span class="label-text">Contact Numbers</span>
				</label>
				<input
					id="phoneNos"
					type="text"
					class="input-bordered input input-disabled"
					disabled
					value={data.shop.phoneNumbers}
				/>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	input:hover {
		cursor: default;
	}
</style>