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
    async updateProduct(id: number, field: Product): Promise<object> {
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
        let updateFile = await fs.promises.writeFile(
            this.path,
            JSON.stringify(newArr, null, 2)
        );
        let readUpdatedFile = JSON.parse(
            await fs.promises.readFile(this.path, "utf-8")
        );
        return readUpdatedFile;
    }
}

export const newProduct = new ProductManager("products.txt", []);
awaitFunctions();
