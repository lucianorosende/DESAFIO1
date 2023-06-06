import { IProduct, IProductFunction } from "../../interfaces";
import { TProduct } from "../../types";
import fs from "fs";

class ProductManager implements IProductFunction {
    #path: string;
    constructor(path: string) {
        this.#path = path;
    }
    getPath() {
        return this.#path;
    }
    async getProducts() {
        let res: TProduct[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        return res;
    }
    async getProductById(id: number) {
        let res: TProduct[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        const findId: TProduct = res.find((obj) => obj?.pID === id);
        return findId;
    }
    async addProduct(prod: IProduct) {
        let result: boolean = true;
        let readData = await this.getProducts();
        prod.status = true;
        if (readData.length === 0) {
            prod.pID = 1;
        } else {
            let newId: number = readData[readData.length - 1]?.pID ?? 0;
            prod.pID = newId + 1;
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
    async validateCodeRepetition(code: string) {
        let result: boolean = false;
        let prods = await this.getProducts();
        const product = prods.find((product) => product?.code == code);
        if (product) {
            result = true;
            return result;
        }
        return result;
    }
    async updateProduct(id: number, field: TProduct) {
        let products: TProduct[] = await this.getProducts();
        // todo: check type??
        const newArr = products.map((obj) => {
            if (obj?.pID === id) {
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
        let readFile: TProduct[] = [];
        const findData = await newProduct.getProductById(id);
        readFile = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        let arrayFilter: TProduct[] = readFile.filter((p) => p?.pID !== id);

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
    async deleteAllProducts() {
        await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2));
    }
}

export const newProduct = new ProductManager("src/JSON/products.json");
