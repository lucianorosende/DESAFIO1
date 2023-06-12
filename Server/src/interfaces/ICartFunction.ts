import { DeleteResult } from "mongodb";
import { TCart } from "../types";
import { ICartProduct } from ".";

export interface ICartFunction {
    getCarts(): Promise<TCart[]>;
    getCartById(cid: number): Promise<TCart[]>;
    addCart(): Promise<TCart>;
    addProductInCart(cID: number, pID: number): Promise<TCart[] | undefined>;
    updateProductsFromCart(cID: number, body: ICartProduct): Promise<TCart[]>;
    UpdateQuantityProduct(
        cID: number,
        pID: number,
        body: ICartProduct
    ): Promise<TCart[]>;
    deleteProductFromCart(
        cID: number,
        pID: number
    ): Promise<TCart[] | undefined>;
    deleteAllProductsFromCart(cID: number): Promise<TCart[]>;
    deleteAllCarts(): Promise<DeleteResult>;
}
