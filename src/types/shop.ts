export interface IProduct {
	id: number;
	image: string;
	name: string;
	price: number;
	inventory: number;
	description: string;
	store_id: number;
	added: string;
}

export interface IStore {
	id: number;
	name: string;
}

export type TSortingRule = 'high-to-low' | 'low-to-high' | 'newest';
