<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let quantity: number;

	const emit = createEventDispatcher();
	let currentVal = quantity;
</script>

<div>
	<label class="sr-only" for="quantity">Quantity</label>
	<select
		class="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
		id="quantity"
		name="quantity"
		bind:value={currentVal}
		on:change={() => emit('quantity.changed', currentVal)}
	>
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as value}
			<option selected={quantity === value} {value}>{value}</option>
		{/each}
	</select>
</div>
