import { newProduct } from "../src";

export const updateProduct = async (): Promise<void> => {
    await newProduct.updateProduct(0, {
        title: "testUpdate",
        description: "asd",
        price: 1,
        thumbnail: "https://www.youtube.com/",
        code: "asd",
        stock: 5,
    }),
        console.log(
            "Updated array of products",
            await newProduct.getProducts()
        );
};
