import { newProduct } from "../src";

export const updateProduct = async (): Promise<void> => {
    console.log(
        "Updated array of products",
        await newProduct.updateProduct(2, {
            title: "testUpdate",
            description: "asd",
            price: 1,
            thumbnail: "https://www.youtube.com/",
            code: "asd",
            stock: 5,
        })
    );
};
