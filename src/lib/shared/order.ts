// Function to place an order
import type { IOrder, ISHippingAddress } from '$types/order';
import { postOrder } from '$lib/database';
import type { PostgrestError } from '@supabase/supabase-js';
import { cart, cartTotal } from '$stores/cart';
import { userID } from '$stores/user';
import { get } from 'svelte/store';

export const placeOrder = async (order: IOrder): Promise<boolean | PostgrestError> => {
	try {
		const { data, error } = await postOrder(order);
		if (error) {
			throw error;
		}
		return true;
	} catch (error: unknown) {
		console.error('Error placing order:', (error as PostgrestError).message);
		return error as PostgrestError;
	}
};

interface IUserData {
	shippingAddress: ISHippingAddress;
	userEmail: string;
}

export const makeOrder = (data: IUserData): IOrder => ({
	customer_id: get(userID),
	order_date: new Date().toUTCString(),
	order_status: 'Created',
	order_total: get(cartTotal),
	shipping_address: data.shippingAddress,
	user_email: data.userEmail,
	products: get(cart)
});
