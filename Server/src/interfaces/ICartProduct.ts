import { ObjectId } from "mongodb";

export interface ICartProduct {
    pID?: number;
    quantity: number;
    _id?: ObjectId;
}
