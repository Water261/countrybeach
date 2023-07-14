<script lang="ts">
	import type { SvelteSubmitEvent } from '$lib/util/SvelteEvent';
	import type { PageData } from './$types';

	export let data: PageData;

	let saveChangesForm: HTMLFormElement;
	let resultMessage = "";
	let resultSuccess = false;

	async function saveChanges(ev: SvelteSubmitEvent) {
		ev.preventDefault();

		const formData = new FormData(saveChangesForm);

		const saveChangesResponse = await fetch('/api/staff', {
			method: "PATCH",
			body: formData,
		});

		if (!saveChangesResponse.ok) {
			resultMessage = "Failed to save changes";
			resultSuccess = false;
		}

		resultMessage = "Successfully saved changes";
		resultSuccess = true;
	}
</script>

<div class="flex justify-center px-40 py-5">
	<form class="mx-10 flex w-1/3 flex-col" on:submit={saveChanges} bind:this={saveChangesForm}> 
		<h2 class="text-2xl font-bold">Employee Details</h2>
		<div class="form-control">
			<label for="firstName" class="label">
				<span class="label-text">First Name</span>
			</label>
			<input id="firstName" name="firstName" type="text" class="input-bordered input" value={data.firstName} />
		</div>
		<div class="form-control">
			<label for="lastName" class="label">
				<span class="label-text">Last Name</span>
			</label>
			<input id="lastName" name="lastName" type="text" class="input-bordered input" value={data.lastName} />
		</div>
		<div class="form-control">
			<label for="email" class="label">
				<span class="label-text">Email Address</span>
			</label>
			<input id="email" name="email" type="text" class="input-bordered input" value={data.email} />
		</div>
		<div class="form-control">
			<label for="position" class="label">
				<span class="label-text">Position</span>
			</label>
			<input id="position" name="position" type="text" class="input-bordered input" value={data.position} />
		</div>
		<div class="form-control">
			<label for="salary" class="label">
				<span class="label-text">Salary</span>
			</label>
			<input id="salary" name="salary" type="text" class="input-bordered input" value={data.salary} />
		</div>
		<div class="form-control">
			<label for="shopId" class="label">
				<span class="label-text">Shop Id</span>
			</label>
			<input id="shopId" name="shopId" type="text" class="input-bordered input" value={data.shopId} />
		</div>
		<div class="form-control my-4">
			<button class="btn-secondary btn">Save Changes</button>
		</div>
		<div class="form-control">
			<p class={`${resultSuccess ? 'text-success' : 'text-error'} text-center`}>{resultMessage}</p>
		</div>
	</form>
</div>
