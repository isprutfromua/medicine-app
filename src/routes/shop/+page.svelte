<script lang="ts">
	import type { IProduct, IStore, TSortingRule } from '$types/shop';
	import { fade } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';
	import { addToCart } from '$stores/cart';
	import { activeStoreID, setStoreID } from '$stores/store';

	import { Sort, ProductTile, FilterButton } from '$lib/components';
	import { addToWishlist, wishlist } from '$stores/wishlist';
	import { notify } from '$lib/shared/toasts';

	export let data;

	$: wishlistData = [] as number[];

	wishlist.subscribe((value) => {
		wishlistData = Array.from(value) as number[];
	});

	let products: IProduct[] | undefined | null = data.products;
	let stores: IStore[] | undefined | null = data.stores;
	let sortingRule: TSortingRule = 'low-to-high';

	const sortingFunc = (a: IProduct, b: IProduct) => {
		const aInWishlist = wishlistData.includes(a.id);
		const bInWishlist = wishlistData.includes(b.id);

		if (aInWishlist && !bInWishlist) {
			return -1;
		} else if (!aInWishlist && bInWishlist) {
			return 1;
		}

		switch (sortingRule) {
			case 'low-to-high':
				return a.price - b.price;
			case 'high-to-low':
				return b.price - a.price;
			case 'newest':
				return Date.parse(b.added) - Date.parse(a.added);
		}
	};

	const productFilter = ({ store_id }: IProduct) =>
		$activeStoreID ? store_id === $activeStoreID : true;

	$: productsList = $activeStoreID ? products?.filter(productFilter) : products || [];

	const sortBy = (rule: TSortingRule) => {
		sortingRule = rule;
		products = products?.sort(sortingFunc) ?? [];
		notify('Sorting applied');
	};
</script>

<main>
	{#if !stores && !products}
		<h1 class="b-title_1">Fetching data</h1>
	{:else}
		<div class="b-products_heading">
			<h1 class="b-title_1">Medicine</h1>
			<div class="flex items-center">
				<Sort on:sort={({ detail: rule }) => sortBy(rule)} {sortingRule} />

				<FilterButton />
			</div>
		</div>

		<section aria-labelledby="products-heading" class="pb-24 pt-6">
			<h2 class="sr-only" id="products-heading">Products</h2>

			<div class="b-stores_layout">
				{#if stores?.length}
					<form class="hidden lg:block">
						<h3 class="b-title_3 mb-6">Stores</h3>
						<ul class="b-store_list" role="list">
							{#each stores as store}
								<li class="b-link" class:isActive={store.id === $activeStoreID}>
									<button type="button" on:click={() => setStoreID(store.id)}>
										{store.name}
									</button>
								</li>
							{/each}
						</ul>
					</form>
				{/if}

				{#if productsList?.length}
					<div class="b-product_grid">
						{#each productsList as product (product.id)}
							<div in:fade={{ duration: 800, easing: sineIn }}>
								<ProductTile
									isInWishlist={wishlistData.includes(product.id)}
									on:add.click={({ detail: product }) => addToCart(product)}
									on:wishlist.click={({ detail: id }) => addToWishlist(id)}
									{product}
								/>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</section>
	{/if}
</main>

<svelte:head>
	<title>Shop the products</title>
	<meta content="Shop the products" name="description" />
</svelte:head>

<style lang="postcss">
	.b-product_grid {
		@apply grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8 lg:col-span-3;
	}

	.b-store_list {
		@apply space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900;
	}

	.b-products_heading {
		@apply flex items-baseline justify-between border-b border-gray-200 pb-6;
	}

	.b-stores_layout {
		@apply grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4;
	}
</style>
