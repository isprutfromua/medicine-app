import { writable } from 'svelte/store';

export const activeStoreID = writable<null | number>(null);

export const setStoreID = (id: number) => {
	activeStoreID.update(() => id);
};
