import { DeleteResult } from "mongodb";
import { TCart } from "../types";
import { ICartProduct } from ".";

export interface ICartFunction {
    getAll(): Promise<TCart[]>;
    getCartById(cid: string): Promise<TCart[]>;
    addCart(): Promise<number | undefined>;
    addProductInCart(
        cID: string,
        pID: string
    ): Promise<TCart[] | undefined | string>;
    updateProductsFromCart(cID: string, body: ICartProduct): Promise<TCart[]>;
    UpdateQuantityProduct(
        cid: string,
        pid: string,
        body: ICartProduct
    ): Promise<TCart[]>;
    deleteProductFromCart(
        cid: string,
        pid: string
    ): Promise<TCart[] | undefined>;
    deleteAllProductsFromCart(cID: string): Promise<TCart[]>;
    deleteAllCarts(): Promise<DeleteResult>;
}
