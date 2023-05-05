import { newProduct } from "../classes/ProductManager";

export const updateProduct = async (): Promise<void> => {
    console.log(
        "UPDATED ARRAY OF PRODUCTS",
        await newProduct.updateProduct(1, {
            title: "testUpdate",
            description: "asd",
            price: 1,
            thumbnail: "https://www.youtube.com/",
            code: "asd",
            stock: 5,
        })
    );
};
