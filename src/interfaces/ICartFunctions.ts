import { Cart } from "../types";
import { ICart } from ".";

export interface ICartFunctions {
    getCartById(id: number): Promise<Cart>;
    addCart(cart: ICart): Promise<Cart[]>;
}
