<script lang="ts">
	import { Loader } from '$lib/components';

	export let wait = false;
	export let label: string = 'Button';
</script>

<button class="b-button" disabled={wait} type="submit" class:disabled={wait}>
	{#if wait}
		<Loader />
	{:else}
		{label}
	{/if}
</button>

<style lang="postcss">
	.b-button {
		@apply w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3;
		@apply text-base font-medium text-white shadow-sm;
		@apply hover:bg-indigo-700;
		@apply focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50;
		@apply disabled:bg-gray-400;
	}
</style>
