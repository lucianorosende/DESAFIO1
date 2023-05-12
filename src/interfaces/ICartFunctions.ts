import { Cart } from "../types";
import { ICart } from ".";

export interface ICartFunctions {
    getCarts(): Promise<Cart[]>;
    getCartById(id: number): Promise<Cart>;
    addCart(cart: ICart): Promise<Cart[]>;
    addProductInCart(cID: number, pID: number): Promise<Cart>;
}
