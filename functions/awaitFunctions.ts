import { productAddition, checkProduct } from "./index";

export const awaitFunctions = async (): Promise<void> => {
    await productAddition();
    await checkProduct();
};
