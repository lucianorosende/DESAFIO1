interface IProducts {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    code: string;
    stock: number;
    id?: number;
}

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

const newProduct = new ProductManager();
const productAddition = (): void => {
    newProduct.addProduct({
        title: "asdd1",
        description: "asd",
        price: 1,
        thumbnail: "https://www.youtube.com/",
        code: "asd",
        stock: 5,
    });
    newProduct.addProduct({
        title: "asdd2",
        description: "asd",
        price: 1,
        thumbnail: "https://www.youtube.com/",
        code: "asd",
        stock: 5,
    });
    if (
        newProduct.addProduct({
            title: "asdd3",
            description: "asd",
            price: 1,
            thumbnail: "https://www.youtube.com/",
            code: "asd",
            stock: 5,
        })
    ) {
        console.log("Product added successfully");
    } else {
        console.log("Product Already Exists");
    }
    console.log(newProduct.getProducts());
};
const checkProduct = (): void => {
    let checker = newProduct.getProductById(5);
    if (checker === undefined) {
        console.log("Product not found");
    } else {
        console.log("we found this product: ", checker);
    }
};

productAddition();
checkProduct();
