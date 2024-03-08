<script lang="ts">
	import Close from '$lib/icons/Close.svelte';
	import type { ILink } from '$types/navigation';

	import { toggleMenu, ui } from '$stores/ui';
	import { page } from '$app/stores';

	export let links: ILink[];
</script>

<div aria-modal="true" class="relative z-40" role="dialog" class:hidden={!$ui.menuVisible}>
	<div class="fixed inset-0 bg-black bg-opacity-25"></div>
	<div class="fixed inset-0 z-40 flex">
		<div class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
			<div class="flex px-4 pb-2 pt-5 justify-end">
				<button
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-400"
					type="button"
					on:click={() => toggleMenu()}
				>
					<span class="sr-only">Close menu</span>
					<Close />
				</button>
			</div>
			<div class="space-y-6 px-4 py-6">
				{#each links as link}
					<div class="-m-2 block p-2">
						<a class="b-link" href={link.path} class:isActive={$page.url.pathname === link.path}
							>{link.title}</a
						>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
