import { newProduct } from "../src";

export const checkProduct = async (): Promise<void> => {
    let checker = await newProduct.getProductById(1);
    if (checker === undefined) {
        console.log("Product not found");
    } else {
        console.log("we found this product: ", checker);
    }
};
