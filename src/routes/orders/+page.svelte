<script lang="ts">
	import { getOrders } from '$lib/database';
	import { ContinueShopping, OrderItem } from '$lib/components';
</script>

<main>
	{#await getOrders()}
		<h1 class="b-title_1">Fetching orders</h1>
	{:then res}
		{#if res.ordersData.length}
			<div class="px-4 sm:px-0">
				<h1 class="b-title_1 pb-6">Order history</h1>
			</div>

			<section aria-labelledby="recent-heading">
				<h2 class="sr-only" id="recent-heading">Recent orders</h2>
				<div class="space-y-8">
					{#each res.ordersData as order (order.order_id)}
						<div class="b-order">
							<div class="b-order_info">
								<dl class="b-order_data">
									<div>
										<dt class="b-title_3">Order number</dt>
										<dd class="mt-1 text-gray-500">{order.order_id}</dd>
									</div>
									<div class="hidden sm:block">
										<dt class="b-title_3">Date placed</dt>
										<dd class="mt-1 text-gray-500">
											<time datetime={new Date(order.order_date).toLocaleDateString()}>
												{new Date(order.order_date).toLocaleDateString()}
											</time>
										</dd>
									</div>
									<div>
										<dt class="b-title_3">Total amount</dt>
										<dd class="mt-1 b-title_3">${order.order_total}</dd>
									</div>
								</dl>
							</div>

							<h4 class="sr-only">Items</h4>
							<ul class="divide-y divide-gray-200" role="list">
								{#each order.products as product}
									<OrderItem {product} />
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</section>
		{:else}
			<h1 class="b-title_2 my-20 text-center">You haven't bought anything yet</h1>
			<div class="mt-16 py-6 text-center">
				<ContinueShopping label="Start Shopping" />
			</div>
		{/if}
	{:catch error}
		<h1 class="b-title_1">Error while fetching data</h1>
		<pre>{error.message}</pre>
	{/await}
</main>

<svelte:head>
	<title>Order history</title>
	<meta content="Order history" name="description" />
</svelte:head>

<style lang="postcss">
	.b-order {
		@apply border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border;
	}

	.b-order_info {
		@apply flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6;
	}

	.b-order_data {
		@apply grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2;
	}
</style>
