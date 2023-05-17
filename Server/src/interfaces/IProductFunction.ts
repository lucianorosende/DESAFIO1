import { TProduct } from "../types";
import { IProduct } from ".";

export interface IProductFunction {
    getPath(): string;
    getProducts(): Promise<TProduct[]>;
    getProductById(id: number): Promise<TProduct>;
    addProduct(prod: IProduct): Promise<boolean>;
    validateCodeRepetition(code: string): Promise<boolean>;
    updateProduct(id: number, field: IProduct): Promise<TProduct>;
    deleteProduct(id: number): Promise<boolean>;
    deleteAllProducts(): Promise<void>;
}
