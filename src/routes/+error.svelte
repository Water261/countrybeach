<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.error?.message} - Country Beach</title>
</svelte:head>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center text-white">
		<div class="max-w-md">
			<h1 class="my-4 text-5xl font-bold">{$page.status} - {$page.error?.message}</h1>
			<button class="btn-primary btn" on:click={() => window.history.back()}>Go Back?</button>
		</div>
	</div>
</div>

<style lang="postcss">
	div.hero {
		background-image: url('$lib/img/login-img.svg');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
