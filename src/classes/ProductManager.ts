import { IProducts, IProductFunctions } from "../interfaces";
import { Product } from "../types";
import { awaitFunctions } from "../functions";
import fs from "fs";

class ProductManager implements IProductFunctions {
    private products: Product[];
    private path: string;
    constructor(path: string, products: Product[]) {
        this.path = path;
        this.products = products;
    }
    getPath() {
        return this.path;
    }
    async getProducts() {
        let res: Product[] = [];
        res = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        return res;
    }
    async addProduct(prod: IProducts) {
        let result: boolean = true;
        if (this.products.length === 0) {
            prod.id = 1;
        } else {
            let newId: number =
                this.products[this.products.length - 1]?.id ?? 0;
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
    async getProductById(id: number) {
        let res: Product[] = [];
        res = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        const findId: Product = res.find((obj) => obj?.id === id);
        return findId;
    }
    async updateProduct(id: number, field: Product) {
        let readFile: Product[] = [];
        let products: Product[] = await this.getProducts();
        // todo: check type??
        const newArr = products.map((obj) => {
            if (obj?.id === id) {
                return {
                    title: field?.title,
                    description: field?.description,
                    price: field?.price,
                    thumbnail: field?.thumbnail,
                    code: field?.code,
                    stock: field?.stock,
                    id: id,
                };
            }
            return obj;
        });
        await fs.promises.writeFile(this.path, JSON.stringify(newArr, null, 2));
        readFile = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        return readFile;
    }
    async deleteProduct(id: number) {
        let readFile: Product[] = [];
        readFile = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        let arrayFilter: Product[] = readFile.filter((p) => p?.id !== id);
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(arrayFilter, null, 2)
        );
        readFile = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        return readFile;
    }
}

export const newProduct = new ProductManager("products.txt", []);
// awaitFunctions();
