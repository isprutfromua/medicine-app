import { writable } from 'svelte/store';

interface IUIState {
	menuVisible: boolean;
	filtersVisible: boolean;
}

export const ui = writable<IUIState>({
	menuVisible: false,
	filtersVisible: false
});

export const toggleMenu = () => {
	ui.update((state: IUIState) => {
		state.menuVisible = !state.menuVisible;

		return state;
	});
};

export const toggleFilters = () => {
	ui.update((state: IUIState) => {
		state.filtersVisible = !state.filtersVisible;

		return state;
	});
};
