<svelte:head>
	<title>Log In - Country Beach</title>
</svelte:head>

<!-- Inspiration: https://dribbble.com/shots/18890725-Log-in-page-Untitled-UI -->
<div id="loginWrapper" class="flex">
	<main class="w-1/2 h-screen flex flex-col p-4 bg-base-200">
		<h1 class="text-4xl font-semibold">Country Beach</h1>

		<form class="w-full flex flex-col justify-center items-center py-8 max-w-lg m-auto">
			<h2 class="text-5xl font-bold pb-2">Welcome Back</h2>
			<p class="text-2xl">Please enter your details.</p>

			<!-- Email Input -->
			<div class="form-control w-full">
				<label for="email" class="label">
					<span class="label-text">Email Address</span>
				</label>
				<input type="email" name="email" id="email" class="input input-bordered w-full" />
			</div>

			<!-- Password Input -->
			<div class="form-control w-full">
				<label for="password" class="label">
					<span class="label-text">Password</span>
					<span class="label-text-alt">
						<button type="button" class="link-secondary link-hover">Forgot Password?</button>
					</span>
				</label>
				<input type="password" class="input input-bordered w-full" />
			</div>

			<div class="form-control text-center py-4">
				<p class="text-error invisible">&nbsp;</p>
			</div>

			<div class="form-control w-full">
				<button type="submit" class="btn btn-primary">Log In</button>
			</div>
		</form>
		<p>&copy; {new Date().getFullYear()} - Country Beach</p>
	</main>
</div>

<style lang="postcss">
	div#loginWrapper {
		background-image: url("$lib/img/login-img.svg");
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>