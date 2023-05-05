import { newProduct } from "../classes/ProductManager";

export const productDeletion = async (): Promise<void> => {
    console.log("DELETED ITEM OF PRODUCTS", await newProduct.deleteProduct(1));
};
