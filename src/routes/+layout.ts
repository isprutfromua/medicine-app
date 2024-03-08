import type { Load } from '@sveltejs/kit';

import { getProducts, getStores } from '$lib/database';

export const load: Load = async ({ url }) => {
	const { pathname } = url;
	try {
		const [storesRes, productsRes] = await Promise.all([getStores(), getProducts()]);

		if (storesRes.error) {
			throw new Error(`Error: ${storesRes.error.code}`);
		}

		if (productsRes.error) {
			throw new Error(`Error: ${productsRes.error.code}`);
		}

		const stores = storesRes.data;
		const products = productsRes.data;

		return { products, stores, pathname };
	} catch (error) {
		console.error(error);

		return { error: 'Unable to fetch data', pathname };
	}
};
