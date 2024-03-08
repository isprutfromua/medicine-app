<script lang="ts">
	import { Button, OrderSummary, Input, ContinueShopping, ProductCartTile } from '$lib/components';

	import { cart, removeAllFromCart } from '$stores/cart';
	import type { IOrder, ISHippingAddress } from '$types/order';
	import { goto } from '$app/navigation';
	import { makeOrder, placeOrder } from '$lib/shared/order';
	import { pause } from '$lib/shared/utils';
	import { notify } from '$lib/shared/toasts';

	const makeShippingAddress = (): ISHippingAddress => ({
		firstName,
		lastName,
		company,
		address,
		phone
	});

	const handleSubmit = async () => {
		wait = true;
		const shippingAddress = makeShippingAddress();
		const userData = {
			shippingAddress,
			userEmail
		};
		const order = makeOrder(userData);
		const res = await placeOrder(order);

		notify('Order processing started');
		await pause(3000);

		if (res && typeof res === 'boolean') {
			goto('/success');
			notify('Order placed!');
			removeAllFromCart();
		} else {
			notify('Error happened. Please try again later');
		}

		wait = false;
	};

	let userEmail: IOrder['user_email'];
	let firstName: ISHippingAddress['firstName'];
	let lastName: ISHippingAddress['lastName'];
	let company: ISHippingAddress['company'];
	let address: ISHippingAddress['address'];
	let phone: ISHippingAddress['phone'];

	let wait = false;
</script>

<main>
	{#if $cart.length}
		<h1 class="b-title_1 pb-6">Shopping cart</h1>
		<form
			class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
			on:submit|preventDefault={handleSubmit}
		>
			<div>
				<div>
					<h2 class="text-lg font-medium text-gray-900">Contact information</h2>
					<div class="mt-4">
						<Input
							autocomplete="email"
							id="email-address"
							name="email-address"
							type="email"
							label="Email Address"
							bind:value={userEmail}
						/>
					</div>
				</div>
				<div class="mt-10 border-t border-gray-200 pt-10">
					<h2 class="text-lg font-medium text-gray-900">Shipping information</h2>
					<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
						<div>
							<Input
								autocomplete="given-name"
								id="first-name"
								name="first-name"
								label="First name"
								bind:value={firstName}
							/>
						</div>
						<div>
							<Input
								autocomplete="family-name"
								id="last-name"
								name="last-name"
								label="Last name"
								bind:value={lastName}
							/>
						</div>
						<div class="sm:col-span-2">
							<Input id="company" name="company" label="Company" bind:value={company} />
						</div>
						<div class="sm:col-span-2">
							<Input
								autocomplete="street-address"
								id="address"
								name="address"
								label="Address"
								bind:value={address}
							/>
						</div>
						<div class="sm:col-span-2">
							<Input autocomplete="tel" id="phone" name="phone" label="Phone" bind:value={phone} />
						</div>
					</div>
				</div>
			</div>

			<div class="mt-10 lg:mt-0">
				<h2 class="text-lg font-medium text-gray-900">Order summary</h2>

				<div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
					<h3 class="sr-only">Items in your cart</h3>
					<ul class="divide-y divide-gray-200" role="list">
						{#each $cart as product (product.id)}
							<ProductCartTile {product} />
						{/each}
					</ul>

					<OrderSummary />

					<div class="border-t border-gray-200 px-4 py-6 sm:px-6">
						<Button label="Confirm order" {wait} />
					</div>
				</div>
			</div>
		</form>
	{:else}
		<h1 class="b-title_2 text-center my-20">Cart is empty</h1>
		<div class="mt-16 py-6 text-center">
			<ContinueShopping label="Continue Shopping" />
		</div>
	{/if}
</main>

<svelte:head>
	<title>Cart</title>
	<meta content="Cart page" name="description" />
</svelte:head>
