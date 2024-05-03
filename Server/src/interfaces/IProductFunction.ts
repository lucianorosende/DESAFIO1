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
        sort: string,
        title: string
    ): Promise<IProductPages>;
    getProductById(id: string): Promise<TProduct[]>;
    addProduct(prod: IProduct): Promise<IProduct>;
    updateProduct(id: string, field: IProduct): Promise<UpdateWriteOpResult>;
    deleteProductById(id: string): Promise<DeleteResult>;
    deleteAllProducts(): Promise<DeleteResult>;
}
