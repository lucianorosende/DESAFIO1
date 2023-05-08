import { Product } from "../types";
import { IProducts } from ".";

export interface IProductFunctions {
    getPath(): string;
    getProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    addProduct(prod: IProducts): Promise<boolean>;
    checkIfProductIsCorrect(prod: IProducts): boolean;
    updateProduct(id: number, field: Product): Promise<Product>;
    deleteProduct(id: number): Promise<boolean>;
}
