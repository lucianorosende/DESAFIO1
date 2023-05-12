import { TCart } from "../types";
import { ICart } from ".";

export interface ICartFunction {
    getCarts(): Promise<TCart[]>;
    getCartById(id: number): Promise<TCart>;
    addCart(cart: ICart): Promise<TCart[]>;
    addProductInCart(cID: number, pID: number): Promise<TCart>;
}
