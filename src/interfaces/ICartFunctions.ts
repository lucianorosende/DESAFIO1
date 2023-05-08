import { Cart } from "../types";
import { ICart } from ".";

export interface ICartFunctions {
    getCart(): Promise<Cart[]>;
    getCartById(id: number): Promise<Cart>;
    addCart(cart: ICart): Promise<void>;
}
