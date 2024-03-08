<script lang="ts">
	import { Quantity, Image, RemoveFromCart } from '$lib/components';
	import type { ICartProduct } from '$types/cart';
	import { removeFromCart, updateQuantity } from '$stores/cart';

	export let product: ICartProduct;
</script>

<li class="flex px-4 py-6 sm:px-6">
	<div class="flex-shrink-0 w-28 rounded-md overflow-hidden">
		<Image alt={product.name} height={500} src={product.image} width={500} />
	</div>

	<div class="ml-6 flex flex-1 flex-col">
		<div class="flex">
			<div class="min-w-0 flex-1">
				<h4 class="text-sm">
					{product.name}
				</h4>
			</div>

			<div class="ml-4 flow-root flex-shrink-0">
				<RemoveFromCart on:click={() => removeFromCart(product.id)} />
			</div>
		</div>

		<div class="flex flex-1 items-end justify-between pt-2">
			<p class="mt-1 text-sm font-medium text-gray-900">${product.price}</p>

			<div class="ml-4">
				<Quantity
					quantity={product.quantity}
					on:quantity.changed={({ detail: quantity }) => updateQuantity(quantity, product.id)}
				/>
			</div>
		</div>
	</div>
</li>
