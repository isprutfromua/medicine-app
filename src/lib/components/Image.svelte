<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';

	export let src: string;
	export let alt = '';
	export let width: number | 'auto' = 'auto';
	export let height: number | 'auto' = 'auto';
	export let crop = 'fill';
	export let placeholder =
		'after:content-["medicine"] after:grid after:place-items-center after:text-7xl after:lg:text-4xl after:bg-white after:text-gray-400 after:absolute after:inset-0';
</script>

{#if src}
	<CldImage
		overlays={[
			{
				text: {
					color: 'black',
					fontFamily: 'Poppins',
					fontSize: 45,
					fontWeight: 'black',
					text: 'Medicine'
				},
				effects: [{ opacity: 45 }]
			}
		]}
		class={placeholder + ' h-full w-full object-cover object-center'}
		src={'eliftech-medicine/' + src}
		{alt}
		{crop}
		{height}
		{width}
	/>
{/if}
