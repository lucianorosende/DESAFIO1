import { productAddition, checkProduct, updateProduct } from "./index";

export const awaitFunctions = async (): Promise<void> => {
    await productAddition();
    await checkProduct();
    await updateProduct();
};
