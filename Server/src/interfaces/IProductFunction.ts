import { TProduct } from "../types";
import { IProduct, IProductPages } from ".";
import { DeleteResult } from "mongodb";
import { UpdateWriteOpResult } from "mongoose";

export interface IProductFunction {
    getProducts(): Promise<TProduct[]>;
    getProductsQueries(
        category: string,
        stock: number,
        limit: string,
        pages: string,
        sort: string
    ): Promise<IProductPages>;
    getProductById(id: number): Promise<TProduct[]>;
    addProduct(prod: IProduct): Promise<IProduct>;
    updateProduct(id: number, field: IProduct): Promise<any>;
    deleteProductById(id: number): Promise<DeleteResult>;
    deleteAllProducts(): Promise<DeleteResult>;
}
