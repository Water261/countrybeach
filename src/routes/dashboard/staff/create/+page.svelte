<script lang="ts">
	import type { SvelteSubmitEvent } from '$lib/util/SvelteEvent';

	let createUserForm: HTMLFormElement;
	let resultMessage = '';
	let resultSuccess = false;

	async function createUser(ev: SvelteSubmitEvent) {
		ev.preventDefault();

		const formData = new FormData(createUserForm);
		const firstName = formData.get('firstName')?.toString().toLowerCase() ?? '';
		const lastName = formData.get('lastName')?.toString().toLowerCase() ?? '';

		const firstNameArray = firstName.split('');

		const email = `${firstNameArray[0]}${lastName}@countrybeach.com.au`;

		formData.set('email', email);

		const saveChangesResponse = await fetch('/api/staff', {
			method: 'POST',
			body: formData
		});

		if (!saveChangesResponse.ok) {
			resultMessage = 'Failed to create user';
			resultSuccess = false;

			return;
		}

		resultMessage = 'Successfully created user';
		resultSuccess = true;
	}
</script>

<div class="flex justify-center px-40 py-5">
	<form class="mx-10 flex w-1/3 flex-col" on:submit={createUser} bind:this={createUserForm}>
		<h2 class="text-2xl font-bold">Employee Details</h2>
		<div class="form-control">
			<label for="firstName" class="label">
				<span class="label-text">First Name</span>
			</label>
			<input id="firstName" name="firstName" type="text" class="input-bordered input" required />
		</div>
		<div class="form-control">
			<label for="lastName" class="label">
				<span class="label-text">Last Name</span>
			</label>
			<input id="lastName" name="lastName" type="text" class="input-bordered input" required />
		</div>
		<div class="form-control">
			<label for="position" class="label">
				<span class="label-text">Position</span>
			</label>
			<input id="position" name="position" type="text" class="input-bordered input" required />
		</div>
		<div class="form-control">
			<label for="salary" class="label">
				<span class="label-text">Salary</span>
			</label>
			<input id="salary" name="salary" type="text" class="input-bordered input" required />
		</div>
		<div class="form-control">
			<label for="shopId" class="label">
				<span class="label-text">Shop Id</span>
			</label>
			<input id="shopId" name="shopId" type="text" class="input-bordered input" required />
		</div>
		<div class="form-control my-4">
			<button class="btn-secondary btn">Create User</button>
		</div>
		<div class="form-control">
			<p class={`${resultSuccess ? 'text-success' : 'text-error'} text-center`}>{resultMessage}</p>
		</div>
	</form>
</div>
