import { newProduct } from "../src";

export const productAddition = (): void => {
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
