import { ICartProducts } from "./ICartProducts";

export interface ICart {
    id?: number;
    products: ICartProducts[];
}
