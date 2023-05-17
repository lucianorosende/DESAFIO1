import { ICartProduct } from "./ICartProduct";

export interface ICart {
    id?: number;
    products: ICartProduct[];
}
