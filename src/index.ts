import { v4 as uuidv4 } from "uuid";

type Products = {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    code: string;
    stock: number;
    id: string;
};

class ProductManager {
    readonly products: Array<Products> = [];
    getProducts(): Array<Products> {
        return this.products;
    }
    addProduct(
        title: string,
        description: string,
        price: number,
        thumbnail: string,
        code: string,
        stock: number
    ): string {
        const newUUID = uuidv4();
        const productObj = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: newUUID,
        };

        if (!this.products.find((obj) => obj.title === title)) {
            this.products.push(productObj);
        }
        return "product already exists";
    }
    getProductByStock(stock: number): string | object {
        const findId = this.products.find((obj) => obj.stock === stock);
        return findId ?? "Product not found";
    }
}

const newProduct = new ProductManager();
newProduct.addProduct("asdd", "asd", 1, "https://www.youtube.com/", "asd", 5);
newProduct.addProduct("asdd", "asd", 1, "https://www.youtube.com/", "asd", 6);
newProduct.addProduct("asdd", "asd", 1, "https://www.youtube.com/", "asd", 7);
console.log(
    newProduct.addProduct(
        "asdd",
        "asd",
        1,
        "https://www.youtube.com/",
        "asd",
        7
    )
);
console.log(newProduct.getProducts());
console.log(newProduct.getProductByStock(8));
