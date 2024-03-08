import { writable } from 'svelte/store';
import { notify } from '$lib/shared/toasts';

export const wishlist = writable(new Set());
export const addToWishlist = (id: number) => {
	wishlist.update((set) => {
		const newSet = new Set(set);

		if (newSet.has(id)) {
			newSet.delete(id);
			notify('Item removed from wishlist');
		} else {
			newSet.add(id);
			notify('Item added to wishlist');
		}

		return newSet;
	});
};
