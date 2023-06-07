import { TProduct } from "../types";
import { IProduct } from ".";
import { DeleteResult } from "mongodb";
import { UpdateWriteOpResult } from "mongoose";

export interface IProductFunction {
    getProducts(): Promise<TProduct[]>;
    getProductById(id: number): Promise<TProduct[]>;
    addProduct(prod: IProduct): Promise<IProduct>;
    updateProduct(id: number, field: IProduct): Promise<UpdateWriteOpResult>;
    deleteProductById(id: number): Promise<DeleteResult>;
    deleteAllProducts(): Promise<DeleteResult>;
}
