import { derived, get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { ICartProduct } from '$types/cart';
import { storage } from '$lib/shared/storage';
import { notify } from '$lib/shared/toasts';

const initialCart = browser ? storage.getItem<ICartProduct[]>('cart', []) : [];

export const cart = writable<ICartProduct[]>(initialCart);

function findProductIndex(products: ICartProduct[], id: number) {
	return products.findIndex((product) => product.id === id);
}

export const addToCart = (product: ICartProduct) => {
	cart.update((products) => {
		const existingIndex = findProductIndex(products, product.id);
		if (existingIndex !== -1) {
			products[existingIndex].quantity += 1; // Increase quantity if product already exists in cart
		} else {
			products.push({ ...product, quantity: 1 }); // Add new product to cart with quantity 1
		}
		notify('Item added to cart');
		storage.setItem('cart', products);
		return products;
	});
};

export const removeFromCart = (id: number) => {
	cart.update((products: ICartProduct[]) => {
		const updatedCart = products.filter((product) => product.id !== id);
		storage.setItem('cart', updatedCart);
		notify('Item removed from cart');
		return updatedCart;
	});
};

export const removeAllFromCart = () => {
	cart.update(() => {
		storage.setItem('cart', []);
		return [];
	});
};

export const updateQuantity = (newQuantity: number, id: number) => {
	cart.update((products) => {
		const index = findProductIndex(products, id);

		if (index !== -1) {
			products[index].quantity = newQuantity;
			storage.setItem('cart', products);
		}

		notify('Item quantity updated');

		return products;
	});
};

export const itemsInCart = derived(cart, ($cart) => {
	return $cart.length;
});

export const cartSubTotal = derived(cart, ($cart) => {
	return Math.floor($cart.reduce((total, product) => total + product.quantity * product.price, 0));
});

export const cartShipping = 10;
export const cartTax = 5;

export const cartTotal = derived(cart, () => {
	return get(cartSubTotal) + cartTax + cartShipping;
});
