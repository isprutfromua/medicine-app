<script lang="ts">
	import type { ICartProduct } from '$types/cart';
	import { addToCart } from '$stores/cart';
	import { Image } from '$lib/components';

	export let product: ICartProduct;

	$: total = Math.floor(product.price * product.quantity);
</script>

<li class="p-4 sm:p-6">
	<div class="flex items-center sm:items-start">
		<div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
			<Image alt={product.name} height={500} src={product.image} width={500} />
		</div>
		<div class="ml-6 flex-1 text-sm">
			<div class="font-medium text-gray-900 sm:flex sm:justify-between">
				<h5>{product.name}</h5>
				<p class="mt-2 sm:mt-0">${total}</p>
			</div>
			<p class="hidden text-gray-500 sm:mt-2 sm:block">{product.description}</p>
			<p class="hidden text-gray-500 sm:mt-2 sm:block">Quantity: {product.quantity}</p>
		</div>
	</div>

	<div class="mt-6 sm:flex sm:justify-between">
		<div
			class="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0"
		>
			<div class="flex flex-1 justify-center">
				<a class="whitespace-nowrap text-indigo-600 hover:text-indigo-500" href="/null">
					View product</a
				>
			</div>
			<div class="flex flex-1 justify-center pl-4">
				<button
					class="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
					on:click={() => addToCart(product)}
				>
					Buy again
				</button>
			</div>
		</div>
	</div>
</li>
