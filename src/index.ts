interface IProducts {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    code: string;
    stock: number;
    id: number;
}

type Product = IProducts | undefined;

class ProductManager {
    readonly products: Array<Product> = [];
    getProducts(): Array<Product> {
        return this.products;
    }
    addProduct(
        title: string,
        description: string,
        price: number,
        thumbnail: string,
        code: string,
        stock: number
    ): boolean {
        let result = true;
        const productObj = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: this.products.length + 1,
        };

        if (this.products.find((obj) => obj?.title === title)) {
            result = false;
        }
        this.products.push(productObj);
        return result;
    }
    getProductById(id: number): Product {
        const findId = this.products.find((obj) => obj?.id === id);
        return findId;
    }
}

const newProduct = new ProductManager();
newProduct.addProduct("asdd1", "asd", 1, "https://www.youtube.com/", "asd", 5);
newProduct.addProduct("asdd2", "asd", 1, "https://www.youtube.com/", "asd", 6);
if (
    newProduct.addProduct(
        "asdd3",
        "asd",
        1,
        "https://www.youtube.com/",
        "asd",
        8
    )
) {
    console.log("Product added successfully");
} else {
    console.log("Product Already Exists");
}
console.log(newProduct.getProducts());
let checkProduct = newProduct.getProductById(7);
if (checkProduct === undefined) {
    console.log("Product not found");
} else {
    console.log(checkProduct);
}
