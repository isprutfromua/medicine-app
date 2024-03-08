<script lang="ts">
	export let label: string;
</script>

<a href="/shop" class="b-continue_shopping">
	{label}
	<span aria-hidden="true"> →</span>
</a>

<style lang="postcss">
	.b-continue_shopping {
		@apply text-sm font-medium text-indigo-600 hover:text-indigo-500;
	}
</style>
