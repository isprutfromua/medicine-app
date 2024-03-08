import type { ICartProduct } from '$types/cart';

export type TOrderStatus = 'Created' | 'Processing' | 'Shipped' | 'Completed';

export interface ISHippingAddress {
	firstName: string;
	lastName: string;
	company: string;
	address: string;
	phone: string;
}

export interface IOrder {
	customer_id: number;
	order_date: string;
	order_status: TOrderStatus;
	order_total: number;
	shipping_address: ISHippingAddress;
	products: ICartProduct[];
	user_email: string;
}

export interface IOrderData extends IOrder {
	order_id: number;
}
