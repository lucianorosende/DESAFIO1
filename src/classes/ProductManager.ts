import { IProducts, IProductFunctions } from "../interfaces";
import { Product } from "../types";
import fs from "fs";

class ProductManager implements IProductFunctions {
    #products: Product[];
    #path: string;
    constructor(path: string, products: Product[]) {
        this.#path = path;
        this.#products = products;
    }
    getPath() {
        return this.#path;
    }
    async getProducts() {
        let res: Product[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        return res;
    }
    async getProductById(id: number) {
        let res: Product[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        const findId: Product = res.find((obj) => obj?.id === id);
        return findId;
    }
    async addProduct(prod: IProducts) {
        let result: boolean = true;
        let readData = await this.getProducts();
        prod.status = true;
        if (readData.length === 0) {
            prod.id = 1;
        } else {
            let newId: number = readData[readData.length - 1]?.id ?? 0;
            prod.id = newId + 1;
        }
        if (readData.find((obj) => obj?.title === prod.title)) {
            result = false;
        } else {
            readData.push(prod);
            await fs.promises.writeFile(
                this.#path,
                JSON.stringify(readData, null, 2)
            );
        }
        return result;
    }
    checkIfProductIsCorrect(prod: IProducts) {
        let result: boolean = true;
        if (
            !prod.title ||
            !prod.description ||
            !prod.price ||
            !prod.code ||
            !prod.stock ||
            !prod.status ||
            !prod.category
        ) {
            result = false;
        }
        return result;
    }
    async updateProduct(id: number, field: Product) {
        let products: Product[] = await this.getProducts();
        // todo: check type??
        const newArr = products.map((obj) => {
            if (obj?.id === id) {
                return {
                    title: field?.title,
                    description: field?.description,
                    price: field?.price,
                    thumbnails: field?.thumbnails,
                    code: field?.code,
                    stock: field?.stock,
                    status: field?.status,
                    category: field?.category,
                    id: id,
                };
            }
            return obj;
        });
        await fs.promises.writeFile(
            this.#path,
            JSON.stringify(newArr, null, 2)
        );
        return await this.getProductById(id);
    }
    async deleteProduct(id: number) {
        let result: boolean = true;
        let readFile: Product[] = [];
        const findData = await newProduct.getProductById(id);
        readFile = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        let arrayFilter: Product[] = readFile.filter((p) => p?.id !== id);

        await fs.promises.writeFile(
            this.#path,
            JSON.stringify(arrayFilter, null, 2)
        );
        if (findData !== undefined) {
            return result;
        } else {
            result = false;
        }
        return result;
    }
}

export const newProduct = new ProductManager("src/JSON/products.json", []);
