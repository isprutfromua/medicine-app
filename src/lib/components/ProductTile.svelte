<script lang="ts">
	import { Image } from '$lib/components';
	import type { IProduct } from '$types/shop';
	import { createEventDispatcher } from 'svelte';

	export let product: IProduct;
	export let isInWishlist = false;
	const emit = createEventDispatcher();
</script>

{#if product.id}
	<div>
		<div class="relative">
			<div class="relative h-72 w-full overflow-hidden rounded-lg">
				<Image alt={product.name} height={500} src={product.image} width={500} />
			</div>
			<div class="relative mt-4">
				<h3 class="text-sm font-medium text-gray-900">{product.name}</h3>
				<p class="mt-1 text-sm text-gray-500 truncate">{product.description}</p>
			</div>
			<div
				class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4"
			>
				<div
					aria-hidden="true"
					class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
				></div>
				<p class="relative text-lg font-semibold text-white">${product.price}</p>
			</div>
		</div>
		<div class="flex mt-6">
			<button
				class="disabled:pointer-events-none disabled:bg-gray-400 flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
				disabled={product.inventory === 0}
				on:click={() => emit('add.click', product)}
			>
				Add<span class="sr-only">to bag</span>
			</button>

			<button
				class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
				type="button"
				on:click={() => emit('wishlist.click', product.id)}
			>
				<svg
					aria-hidden="true"
					class="h-6 w-6 flex-shrink-0"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					class:isActive={isInWishlist}
				>
					<path
						d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="sr-only">Add to favorites</span>
			</button>
		</div>
	</div>
{/if}

<style lang="postcss">
	.isActive {
		@apply fill-red-600 stroke-red-600;
	}
</style>
