import { IProducts } from "../interfaces/IProducts";
import { productAddition, checkProduct } from "../functions";

type Product = IProducts | undefined;

class ProductManager {
    readonly products: Array<Product> = [];
    getProducts(): Array<Product> {
        return this.products;
    }
    addProduct(prod: IProducts): boolean {
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
        }
        return result;
    }
    getProductById(id: number): Product {
        const findId = this.products.find((obj) => obj?.id === id);
        return findId;
    }
}

export const newProduct = new ProductManager();
productAddition();
checkProduct();
