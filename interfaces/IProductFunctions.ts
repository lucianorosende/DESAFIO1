import { Product } from "../types";
import { IProducts } from "./";

export interface IProductFunctions {
    getPath(): string;
    getProducts(): Promise<Product[]>;
    addProduct(prod: IProducts): Promise<boolean>;
    getProductById(id: number): Promise<Product>;
    updateProduct(id: number, field: Product): Promise<Product[]>;
    deleteProduct(id: number): Promise<Product[]>;
}
