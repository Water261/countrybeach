<script lang="ts">
	import { page } from '$app/stores';
	import type { SvelteClickEvent } from '$lib/util/SvelteEvent';
	import type { LayoutData } from './$types';

	async function logout(_: SvelteClickEvent) {
		await fetch('/api/logout', { method: 'POST' });

		window.location.assign('/');
	}

	export let data: LayoutData;
</script>

<div class="drawer lg:drawer-open">
	<input type="checkbox" id="drawer" class="drawer-toggle" />
	<div class="drawer-content p-4">
		<!-- TODO: Fix mobile nav -->
		<label for="drawer" class="btn-ghost btn lg:hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
				/>
			</svg>
		</label>
		<slot />
	</div>
	<div class="drawer-side bg-base-100 p-4 shadow">
		<label for="drawer" class="drawer-overlay" />
		<div class="flex h-full flex-col items-center justify-between">
			<div>
				<p class="inline-flex select-none text-2xl font-bold normal-case">
					<span>Country</span>
					<span class="text-secondary">Beach</span>
				</p>
				<div class="divider" />
				<div class="navlinks flex w-full flex-col">
					<a
						href="/dashboard"
						class={`btn w-full ${$page.url.pathname === '/dashboard' ? 'btn-active' : 'btn-ghost'}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="relative top-1 h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>
						My Info
					</a>
					{#if data.position === 'Manager' || data.position === 'HR Officer'}
						<a
							href="/dashboard/staff"
							class={`btn w-full ${
								$page.url.pathname === '/dashboard/staff' ? 'btn-active' : 'btn-ghost'
							}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="relative top-1 h-6 w-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
								/>
							</svg>
							My Staff
						</a>
					{/if}
				</div>
			</div>
			<button class="btn-ghost btn w-full text-lg" on:click={logout}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
					/>
				</svg>
				Log Out
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.navlinks * {
		@apply mb-2;
	}

	.btn:hover {
		@apply btn-secondary;
	}
</style>
