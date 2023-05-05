import { newProduct } from "../classes/ProductManager";

export const checkProduct = async (): Promise<void> => {
    let checker = await newProduct.getProductById(1);
    if (checker === undefined) {
        console.log("PRODUCT NOT FOUND");
    } else {
        console.log("WE FOUND THIS PRODUCT: ", checker);
    }
};
