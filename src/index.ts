import { IProducts } from "../interfaces/IProducts";
import { awaitFunctions } from "../functions";
import fs from "fs";

type Product = IProducts | undefined;

class ProductManager {
    products: Array<Product>;
    path: string;
    constructor(path: string, products: Array<Product>) {
        this.path = path;
        this.products = products;
    }
    async getProducts(): Promise<Product[]> {
        let res: Array<Product> = [];
        try {
            res = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } catch (e: any) {
            console.log(e);
        }
        return res;
    }
    async addProduct(prod: IProducts): Promise<boolean> {
        let result: boolean = true;
        prod.id = this.products.length;
        if (this.products.find((obj) => obj?.title === prod.title)) {
            result = false;
        } else {
            this.products.push(prod);
            try {
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(this.products, null, 2)
                );
            } catch (e: any) {
                console.log(e);
            }
        }
        return result;
    }
    async getProductById(id: number): Promise<Product> {
        let res: Array<Product> = [];
        try {
            res = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } catch (e: any) {
            console.log(e);
        }
        const findId = res.find((obj) => obj?.id === id);
        return findId;
    }
    async updateProduct(id: number, field: Product): Promise<Product[]> {
        let readFile: Array<Product> = [];
        let products = await this.getProducts();
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
        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(newArr, null, 2)
            );
            readFile = JSON.parse(
                await fs.promises.readFile(this.path, "utf-8")
            );
        } catch (e: any) {
            console.log(e);
        }

        return readFile;
    }
    async deleteProduct(id: number): Promise<Product[]> {
        let readFile: Array<Product> = [];
        try {
            readFile = JSON.parse(
                await fs.promises.readFile(this.path, "utf-8")
            );
            let arrayFilter = readFile.filter((p) => p?.id !== id);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(arrayFilter, null, 2)
            );
            readFile = JSON.parse(
                await fs.promises.readFile(this.path, "utf-8")
            );
        } catch (e: any) {
            console.log(e);
        }
        return readFile;
    }
}

export const newProduct = new ProductManager("products.txt", []);
awaitFunctions();
