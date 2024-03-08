<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	export let autocomplete: string = '';
	export let id: string;
	export let name: string;
	export let type: HTMLInputTypeAttribute = 'text';
	export let required: boolean = true;
	export let value: string = '';
	export let label: string = '';
</script>

<label class="block text-sm font-medium text-gray-700" for={id}>{label}</label>
<div class="mt-1">
	<input
		{autocomplete}
		class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		{id}
		{name}
		{...{ type }}
		bind:value
		{required}
	/>
</div>
