<script>
	import { toggleFilters } from '$stores/ui';
</script>

<button
	class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
	type="button"
	on:click={() => toggleFilters()}
>
	<span class="sr-only">Filters</span>
	<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
		<path
			clip-rule="evenodd"
			d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
			fill-rule="evenodd"
		/>
	</svg>
</button>
