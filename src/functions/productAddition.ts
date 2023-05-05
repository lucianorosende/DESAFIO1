import { newProduct } from "../classes/ProductManager";
import fs from "fs";

export const productAddition = async (): Promise<void> => {
    if (!fs.existsSync(newProduct.getPath())) {
        await newProduct.addProduct({
            title: "asdd1",
            description: "asd",
            price: 1,
            thumbnail: "https://www.youtube.com/",
            code: "asd",
            stock: 5,
        });
        await newProduct.addProduct({
            title: "asdd2",
            description: "asd",
            price: 1,
            thumbnail: "https://www.youtube.com/",
            code: "asd",
            stock: 5,
        });
        await newProduct.addProduct({
            title: "asdd3",
            description: "asd",
            price: 1,
            thumbnail: "https://www.youtube.com/",
            code: "asd",
            stock: 5,
        });
        if (
            await newProduct.addProduct({
                title: "asdd4",
                description: "asd",
                price: 1,
                thumbnail: "https://www.youtube.com/",
                code: "asd",
                stock: 5,
            })
        ) {
            console.log("product added successfully");
        } else {
            console.log("product already exists");
        }
    }
    console.log("AVAILABLE PRODUCTS", await newProduct.getProducts());
};
