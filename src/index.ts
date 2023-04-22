import { IProducts } from "../interfaces/IProducts";
import { awaitFunctions } from "../functions";
import fs from "fs";

type Product = IProducts | undefined;

class ProductManager {
    products: Array<Product> = [];
    path: string;
    constructor(path: string) {
        this.path = path;
    }
    async getProducts(): Promise<Product[]> {
        let res = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        return res;
    }
    async addProduct(prod: IProducts): Promise<boolean> {
        let result = true;
        if (this.products.length === 0) {
            prod.id = 1;
        } else {
            let newId = this.products[this.products.length - 1]?.id ?? 0;
            prod.id = newId + 1;
        }

        if (this.products.find((obj) => obj?.title === prod.title)) {
            result = false;
        } else {
            this.products.push(prod);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, 2)
            );
        }
        return result;
    }
    async getProductById(id: number): Promise<Product> {
        let res = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        const findId = res.find((obj: Product) => obj?.id === id);
        return findId;
    }
}

export const newProduct = new ProductManager("products.txt");
awaitFunctions();
