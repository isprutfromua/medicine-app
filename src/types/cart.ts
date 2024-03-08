import type { IProduct } from '$types/shop';

export interface ICartProduct extends IProduct {
	quantity: number;
}
