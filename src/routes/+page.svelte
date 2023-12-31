<script lang="ts">
	import type { SvelteSubmitEvent } from '$lib/util/SvelteEvent';

	let loginForm: HTMLFormElement;
	let inputsDisabled = false;
	let errorMessage: string;
	let showPassword = false;

	async function onLoginSubmit(event: SvelteSubmitEvent) {
		event.preventDefault();

		inputsDisabled = true;

		const formData = new FormData(loginForm);

		console.log(formData);

		const loginResponse = await fetch('/api/login', {
			method: 'POST',
			body: formData
		});

		if (!loginResponse.ok) {
			// TODO: Handle unsuccessful logins
			errorMessage = 'Email or password is incorrect.';

			inputsDisabled = false;

			return;
		}

		window.location.assign('/dashboard');
	}

	async function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

<svelte:head>
	<title>Log In - Country Beach</title>
</svelte:head>

<!-- Inspiration: https://dribbble.com/shots/18890725-Log-in-page-Untitled-UI -->
<div id="loginWrapper" class="flex">
	<main class="flex h-screen w-1/2 flex-col bg-base-200 p-4">
		<h1 class="inline-flex text-4xl font-semibold">
			<span>Country</span>
			<span class="text-secondary">Beach</span>
		</h1>

		<form
			bind:this={loginForm}
			class="m-auto flex w-full max-w-lg flex-col items-center justify-center py-8"
			on:submit={onLoginSubmit}
		>
			<h2 class="pb-2 text-5xl font-bold">Welcome Back</h2>
			<p class="text-2xl">Please enter your details.</p>

			<!-- Email Input -->
			<div class="form-control w-full">
				<label for="email" class="label">
					<span class="label-text">Email Address</span>
				</label>
				<input
					type="email"
					name="email"
					id="email"
					class="input-bordered input w-full"
					disabled={inputsDisabled}
				/>
			</div>

			<!-- Password Input -->
			<div class="form-control w-full">
				<label for="password" class="label">
					<span class="label-text">Password</span>
					<span class="label-text-alt">
						<button
							type="button"
							class="link-hover link-secondary"
							on:click={() => togglePasswordVisibility()}
							>{showPassword ? 'Hide Password' : 'Show Password'}</button
						>
					</span>
				</label>
				<input
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
					class="input-bordered input w-full"
					disabled={inputsDisabled}
				/>
			</div>

			<div class="form-control py-4 text-center">
				<p class="text-error" bind:innerText={errorMessage} contenteditable="false" />
			</div>

			<div class="form-control w-full">
				<button type="submit" class="btn-secondary btn text-xl">Log In</button>
			</div>
		</form>
		<p>&copy; {new Date().getFullYear()} - Country Beach</p>
	</main>
</div>

<style lang="postcss">
	div#loginWrapper {
		background-image: url('$lib/img/login-img.svg');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	input:disabled {
		@apply bg-base-300;
	}
</style>
