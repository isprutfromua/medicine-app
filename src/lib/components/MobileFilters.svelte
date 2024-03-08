<script lang="ts">
	import { toggleFilters, ui } from '$stores/ui';
	import type { IStore } from '$types/shop';
	import { activeStoreID, setStoreID } from '$stores/store';

	export let stores: IStore[];
</script>

<div aria-modal="true" class="relative z-40" role="dialog" class:hidden={!$ui.filtersVisible}>
	<div class="fixed inset-0 bg-black bg-opacity-25"></div>

	<div class="fixed inset-0 z-40 flex">
		<div
			class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
		>
			<div class="flex items-center justify-between px-4">
				<h2 class="text-lg font-medium text-gray-900">Stores</h2>
				<button
					class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
					type="button"
					on:click={() => toggleFilters()}
				>
					<span class="sr-only">Close menu</span>
					<svg
						aria-hidden="true"
						class="h-6 w-6"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
					>
						<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
			</div>

			<form class="mt-4 border-t border-gray-200">
				<h3 class="sr-only">Stores</h3>
				<ul class="px-2 py-3 font-medium text-gray-400" role="list">
					{#each stores as store (store.id)}
						<li class:text-black={store.id === $activeStoreID}>
							<button class="block px-2 py-3" on:click={() => setStoreID(store.id)}
								>{store.name}</button
							>
						</li>
					{/each}
				</ul>
			</form>
		</div>
	</div>
</div>
