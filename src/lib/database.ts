import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';
import type { IOrder, IOrderData } from '$types/order';
import { get } from 'svelte/store';
import { userID } from '$stores/user';

const config = {
	url: env.PUBLIC_SUPABASE_URL,
	key: env.PUBLIC_SUPABASE_KEY
};

const supabaseClient = createClient(config.url, config.key);

export async function getProducts() {
	const { data, error } = await supabaseClient.from('products').select('*');

	return { data, error };
}
export async function getStores() {
	const { data, error } = await supabaseClient.from('stores').select('*');

	return { data, error };
}

export async function postOrder(order: IOrder) {
	const { data, error } = await supabaseClient.from('orders').insert([order]).select();

	return { data, error };
}

export async function getOrders() {
	const { data, error } = await supabaseClient
		.from('orders')
		.select('*')
		.eq('customer_id', get(userID))
		.select();

	const ordersData = data as IOrderData[];

	return { ordersData, error };
}
