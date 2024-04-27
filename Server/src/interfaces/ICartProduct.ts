import { ObjectId } from "mongodb";
import { IProduct } from "./IProduct";

export interface ICartProduct {
    pID?: number;
    quantity: number;
    _id?: ObjectId & IProduct;
    subtotal?: number;
}
