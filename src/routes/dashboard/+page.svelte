<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Dashboard - Country Beach</title>
</svelte:head>

<h1 class="text-5xl font-bold">{data.firstName} {data.lastName}</h1>
