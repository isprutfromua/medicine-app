<script lang="ts">
	import ArrowDown from '$lib/icons/ArrowDown.svelte';
	import { createEventDispatcher } from 'svelte';

	let sortHidden = true;
	export let sortingRule: string;
	const toggleSort = () => (sortHidden = !sortHidden);
	const emit = createEventDispatcher();
	let buttonClass = 'w-full hover:bg-gray-100 text-gray-500 block px-4 py-2 text-sm';
</script>

<div class="relative inline-block text-left">
	<div>
		<button
			aria-expanded="false"
			aria-haspopup="true"
			class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
			id="menu-button"
			type="button"
			on:click={() => toggleSort()}
		>
			Sort
			<ArrowDown />
		</button>
	</div>

	<div
		aria-labelledby="menu-button"
		aria-orientation="vertical"
		class="transform absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
		role="menu"
		tabindex="-1"
		class:hidden={sortHidden}
	>
		<div class="py-1" role="none">
			<button
				class={buttonClass}
				role="menuitem"
				class:isActive={sortingRule === 'newest'}
				on:click={() => emit('sort', 'newest')}
			>
				Newest
			</button>
			<button
				class={buttonClass}
				role="menuitem"
				class:isActive={sortingRule === 'low-to-high'}
				on:click={() => emit('sort', 'low-to-high')}
			>
				Price: Low to High
			</button>
			<button
				class={buttonClass}
				role="menuitem"
				class:isActive={sortingRule === 'high-to-low'}
				on:click={() => emit('sort', 'high-to-low')}
			>
				Price: High to Low
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.isActive {
		@apply text-black bg-gray-100;
	}
</style>
