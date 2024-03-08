<script lang="ts">
	import Hamburger from '$lib/icons/Hamburger.svelte';
	import Cart from '$lib/icons/Cart.svelte';
	import { MobileFilters, HamburgerMenu } from '$lib/components';

	import { page } from '$app/stores';

	import { itemsInCart } from '$stores/cart';
	import { toggleMenu } from '$stores/ui';
	import type { IStore } from '$types/shop';
	import type { ILink } from '$types/navigation';

	const links: ILink[] = [
		{ path: '/shop', title: 'Shop' },
		{ path: '/orders', title: 'Order history' }
	];

	export let stores: IStore[] | null | undefined;
</script>

<div>
	<HamburgerMenu {links} />

	{#if stores?.length}
		<MobileFilters {stores} />
	{/if}

	<header class="relative bg-white">
		<nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="border-b border-gray-200">
				<div class="flex h-16 items-center">
					<button
						class="rounded-md bg-white p-2 text-gray-400 lg:hidden"
						type="button"
						on:click={() => toggleMenu()}
					>
						<span class="sr-only">Open menu</span>
						<Hamburger />
					</button>

					<div class="hidden lg:block lg:self-stretch">
						<div class="flex h-full space-x-8">
							{#each links as link}
								<a class="b-link" href={link.path} class:isActive={$page.url.pathname === link.path}
									>{link.title}</a
								>
							{/each}
						</div>
					</div>

					<div class="ml-auto flex items-center">
						<div class="ml-4 flow-root lg:ml-6">
							<a class="group -m-2 flex items-center p-2" href="/cart">
								<Cart />
								<span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
									>{$itemsInCart}</span
								>
								<span class="sr-only">items in cart, view bag</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
</div>
