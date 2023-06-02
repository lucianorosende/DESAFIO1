import { ICartProduct } from "./ICartProduct";

export interface ICart {
    products: ICartProduct[];
    id?: number;
}
