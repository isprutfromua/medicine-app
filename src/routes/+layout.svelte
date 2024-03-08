<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { fade } from 'svelte/transition';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	export let data;
	$: pathname = data.pathname;

	const fadeIn = { duration: 300, delay: 400 };
	const fadeOut = { duration: 300 };
</script>

<div class="bg-white">
	<SvelteToast />
	<Header stores={data.stores} />
	{#key pathname}
		<div class="b-layout" in:fade={fadeIn} out:fade={fadeOut}>
			<slot />
		</div>
	{/key}
</div>

<style lang="postcss">
	.b-layout {
		@apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24;
	}
</style>
