import { newProduct } from "../src";

export const checkProduct = (): void => {
    let checker = newProduct.getProductById(5);
    if (checker === undefined) {
        console.log("Product not found");
    } else {
        console.log("we found this product: ", checker);
    }
};
